# AI-13: Centralize Markdown Heading Normalization in normalizeText()

## Overview

LLMs frequently generate `### Heading\nContent` with only a single newline after headings instead of the required `\n\n`. Currently, heading spacing fixes only exist in `normalizeSectionContent()` inside `content-writer.service.ts`, which runs at file-write time. This means content rendered directly from the database in the UI still shows broken heading spacing.

The fix centralizes heading normalization into `normalizeText()` -- the single source of truth for LLM output cleanup -- in both the client and scraper projects. This ensures all content passes through heading normalization regardless of whether it is written to a file or rendered directly.

Additionally, the scraper is missing the prompt rule that instructs the LLM to put blank lines after `###` headers, and it is also missing the concatenated-heading regex that the client already has in its `normalizeSectionContent()`.

## Current State Analysis

### `normalizeText()` (both repos -- identical)
- **Location**: `src/server/utils/text-normalizer.ts`
- Steps: newline normalization -> broken words -> broken sentences -> collapse blank lines -> garbage patterns -> trim whitespace
- **No heading awareness at all**

### `normalizeSectionContent()` (client)
- **Location**: `src/server/services/content-writer.service.ts` (lines 226-257)
- Has two heading fixes:
  1. `result.replace(/([^\n])(###\s)/g, '$1\n\n$2')` -- ensures blank line *before* `###`
  2. Concatenated-heading regex: splits `### HeadingParagraph text...` by detecting `[a-z][A-Z]` transition
- **Missing**: blank line *after* `###` heading (the `\n` -> `\n\n` case)

### `normalizeSectionContent()` (scraper)
- **Location**: `src/server/services/content-writer.service.ts` (lines 229-245)
- Has only one heading fix:
  1. `result.replace(/([^\n])(###\s)/g, '$1\n\n$2')` -- ensures blank line *before* `###`
- **Missing**: blank line *after* `###` heading
- **Missing**: concatenated-heading regex (client has it, scraper does not)

### Prompt rules
- **Client** `src/server/prompts/rules/base.rules.ts` (line 25): Has `'ALWAYS put a blank line after ### headers before starting paragraph text'`
- **Scraper** `src/server/prompts/rules/base.rules.ts`: **Missing** this rule entirely

### Test files
- **Client**: `src/tests/utils/text-normalizer.test.ts` -- uses `vitest`, 188 lines, no heading tests
- **Scraper**: `src/tests/utils/text-normalizer.test.ts` -- uses `bun:test`, 187 lines, no heading tests

## File-by-File Changes

### 1. Client: `src/server/utils/text-normalizer.ts`

**Add heading normalization as a new step in `normalizeText()`**, between Step 3 (broken sentences) and Step 4 (collapse blank lines). This ordering matters because:
- It must run after broken-word/broken-sentence fixes (which may affect line structure)
- It must run before blank-line collapsing (which would collapse any `\n\n\n` we create down to `\n\n`)

Insert after line 97 (`fixBrokenSentences`), before line 99 (collapse blank lines):

```typescript
  // Step 4: Ensure ### headers have blank lines before and after
  // Fix missing blank line before heading: "text### Heading" -> "text\n\n### Heading"
  result = result.replace(/([^\n])(###\s)/g, '$1\n\n$2');
  // Fix missing blank line after heading: "### Heading\nContent" -> "### Heading\n\nContent"
  result = result.replace(/^(### .+)\n(?!\n)/gm, '$1\n\n');
```

Renumber subsequent steps (old Step 4 becomes Step 5, etc.).

### 2. Scraper: `src/server/utils/text-normalizer.ts`

**Identical change** to the client. Insert the same two regexes at the same position in `normalizeText()`.

### 3. Scraper: `src/server/prompts/rules/base.rules.ts`

Add the missing prompt rule to `baseRules.formatting` array. Insert after the `'Paragraphs should be separated by blank lines'` entry (line 24):

```typescript
    'ALWAYS put a blank line after ### headers before starting paragraph text',
```

This matches what the client already has on line 25 of its `base.rules.ts`.

### 4. Client: `src/tests/utils/text-normalizer.test.ts`

Add a new `describe` block for heading normalization tests inside the existing `normalizeText` describe block, or as a new top-level describe. Recommended: add tests inside the existing `describe('normalizeText', ...)` block, after the existing test cases (after line 135).

```typescript
  it('adds blank line after ### heading with single newline', () => {
    const input = '### Key Points\nThe first point is important.';
    expect(normalizeText(input)).toBe('### Key Points\n\nThe first point is important.');
  });

  it('adds blank line before ### heading when preceded by text', () => {
    const input = 'Some text### Heading';
    expect(normalizeText(input)).toBe('Some text\n\n### Heading');
  });

  it('preserves already-correct ### heading spacing', () => {
    const input = '### Key Points\n\nThe first point is important.';
    expect(normalizeText(input)).toBe('### Key Points\n\nThe first point is important.');
  });

  it('handles ### heading at start of text with missing blank line after', () => {
    const input = '### Overview\nThis is the overview content.';
    expect(normalizeText(input)).toBe('### Overview\n\nThis is the overview content.');
  });

  it('handles multiple ### headings with mixed spacing', () => {
    const input = '### First\nContent one.\n\n### Second\n\nContent two.';
    expect(normalizeText(input)).toBe('### First\n\nContent one.\n\n### Second\n\nContent two.');
  });

  it('does not affect bullet points after ### heading', () => {
    const input = '### Tools\n* Tool A\n* Tool B';
    expect(normalizeText(input)).toBe('### Tools\n\n* Tool A\n* Tool B');
  });
```

### 5. Scraper: `src/tests/utils/text-normalizer.test.ts`

**Same test cases as the client**, but note the import uses `bun:test` instead of `vitest`:

```typescript
import { describe, it, expect } from 'bun:test';
```

The test content is identical; only the import source differs.

### 6. No changes to `normalizeSectionContent()` in either repo

The existing `normalizeSectionContent()` logic stays as a safety net for file-write time. Since `normalizeText()` will now handle heading spacing upstream, `normalizeSectionContent()` will effectively be a no-op for heading cases -- but keeping it is harmless and provides defense in depth.

## Order of Implementation

1. **Scraper `base.rules.ts`** -- add the missing prompt rule (smallest change, no risk)
2. **Client `text-normalizer.ts`** -- add heading normalization to `normalizeText()`
3. **Client `text-normalizer.test.ts`** -- add heading tests, run `npx vitest run`
4. **Scraper `text-normalizer.ts`** -- add identical heading normalization
5. **Scraper `text-normalizer.test.ts`** -- add heading tests (with `bun:test` import), run `bun test`
6. **Manual verification** -- spot-check a few DB-rendered pages in the client UI to confirm heading spacing is correct

## Risks and Edge Cases

### Regex interaction with broken-word fixer
The broken-sentence fixer in Step 3 joins lines where articles/prepositions precede newlines. If the LLM generates `### The\nContent`, the broken-sentence fixer would join it to `### The Content` before the heading fixer runs. This is actually the **correct** behavior -- the heading fixer should not interfere with mid-heading line breaks.

### Double blank lines
If the LLM generates `### Heading\n\n\nContent` (heading + 3 newlines), the heading regex will not match (it only targets `\n` not followed by `\n`). The subsequent blank-line collapsing step (Step 5 after renumbering) will reduce `\n\n\n` to `\n\n`. Correct behavior.

### Headings followed by bullet points
`### Tools\n* Item` should become `### Tools\n\n* Item`. The regex `^(### .+)\n(?!\n)` will match because `*` is not `\n`. Correct behavior.

### Headings at end of text
`### Heading\n` at the end -- the regex requires content after the `\n` (the negative lookahead `(?!\n)` checks the next char is not `\n`, but if there is no next char it also does not match). Then `result.trim()` at the end of `normalizeText()` will trim the trailing newline. No issue.

### `##` or `#` headings (not `###`)
The current scope intentionally targets only `###` headings because that is what the LLM prompt specifies. If `##` or `#` headings need normalization in the future, the regex can be broadened to `(#{1,6}\s)`. Out of scope for this ticket.

### `normalizeSectionContent()` redundancy
After this change, the `([^\n])(###\s)` regex exists in both `normalizeText()` and `normalizeSectionContent()`. This is intentional -- `normalizeSectionContent()` remains as a safety net. The second application is a no-op since the first already fixed the spacing.

### Concatenated-heading regex gap in scraper
The client's `normalizeSectionContent()` has a concatenated-heading regex that splits `### HeadingParagraph text...` by detecting `[a-z][A-Z]` transitions. The scraper does not have this. This plan does **not** add it to the scraper's `normalizeSectionContent()` or to `normalizeText()` because:
- It is a heuristic-based split with potential false positives
- It belongs at file-write time (structural), not in `normalizeText()` (text cleanup)
- Adding it to the scraper's `normalizeSectionContent()` could be a follow-up task

## Open Questions for Implementer

1. **Should the concatenated-heading regex be added to the scraper's `normalizeSectionContent()`?** The client has it (lines 241-251) but the scraper does not. This plan leaves it out of scope, but it may be worth adding for parity. File a follow-up if desired.

2. **Should `normalizeText()` handle `##` and `#` headings too?** Currently only `###` is targeted because the prompt only uses `###`. If other heading levels appear in LLM output, the regex scope should be broadened.

3. **Should the test import difference (`vitest` vs `bun:test`) be abstracted?** Both test files are nearly identical except for the import. This is an existing pattern across the two repos and not specific to this change.

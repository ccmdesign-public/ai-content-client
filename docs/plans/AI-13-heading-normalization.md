# AI-13: Centralize Markdown Heading Normalization in normalizeText()

> **Implementation note (2026-03-03):** The actual implementation diverged from this
> plan's simpler 2-regex approach. Instead, a two-phase approach was used: Phase 1
> inserts triple newlines (\n\n\n) around headings *before* the broken-word/sentence
> fixers to create a protection boundary, then Phase 2 cleans up afterward. This was
> done to prevent `fixBrokenWords` from joining heading text with content across the
> boundary. A code review (see `todos/AI-13-client-review.md`) identified that
> `fixBrokenSentences` also needed its `[\n\r]+` quantifier changed to `[\n\r]{1,2}`
> (and `\s*` changed to `[^\S\n\r]*`) for the triple-newline protection to be effective
> for both fixers. Additional fixes included: `[^\n#]` / `[^\s#]` in before-heading
> regexes to prevent `####` heading corruption and inline `###` false positives, and
> reordering trailing-whitespace trim before blank-line collapse.

## Overview

LLMs frequently generate `### Heading\nContent` with only a single newline after headings instead of the required `\n\n`. Currently, heading spacing fixes only exist in `normalizeSectionContent()` inside `content-writer.service.ts`, which runs at file-write time. This means content rendered directly from the database in the UI still shows broken heading spacing.

The fix centralizes heading normalization into `normalizeText()` -- the single source of truth for LLM output cleanup -- in both the client and scraper projects. This ensures all content passes through heading normalization regardless of whether it is written to a file or rendered directly.

Additionally, the scraper is missing the prompt rule that instructs the LLM to put blank lines after `###` headers, and it is also missing the concatenated-heading regex that the client already has in its `normalizeSectionContent()`.

## Current State Analysis

### `normalizeText()` (both repos -- identical, 127 lines each)
- **Location**: `src/server/utils/text-normalizer.ts`
- Steps: newline normalization (line 91) -> broken words (line 94) -> broken sentences (line 97) -> collapse blank lines (line 100) -> garbage patterns (lines 103-104) -> trim whitespace (line 107)
- **No heading awareness at all**
- **Callers** (identical pattern in both repos):
  - `src/server/services/ai.service.ts`: calls `normalizeText()` on `keyTakeaways`, `summary`, `context` fields after parsing LLM JSON response
  - `src/server/services/openrouter.service.ts`: same three fields, same pattern
  - Both also call `normalizeSingleLine()` on the `tldr` field (not affected by this change)
  - No other callers exist in either codebase

### `normalizeSectionContent()` (client)
- **Location**: `src/server/services/content-writer.service.ts` (lines 226-257)
- Has two heading fixes:
  1. Line 236: `result.replace(/([^\n])(###\s)/g, '$1\n\n$2')` -- ensures blank line *before* `###`
  2. Lines 241-251: Concatenated-heading regex using `^(### .+?[a-z])([A-Z].+)$/gm` with a callback that checks for sentence punctuation or length > 30 before splitting
- **Missing**: blank line *after* `###` heading (the `\n` -> `\n\n` case)
- Also has bullet-point separation (lines 231-233) and blank-line collapse (line 254)

### `normalizeSectionContent()` (scraper)
- **Location**: `src/server/services/content-writer.service.ts` (lines 229-245)
- Has only one heading fix:
  1. Line 239: `result.replace(/([^\n])(###\s)/g, '$1\n\n$2')` -- ensures blank line *before* `###`
- **Missing**: blank line *after* `###` heading
- **Missing**: concatenated-heading regex (client has it, scraper does not)
- Also has bullet-point separation (lines 234-236) and blank-line collapse (line 242)

### `normalizeSectionContent()` in dryrun scripts (both repos)
- **Client**: `scripts/dryrun.ts` lines 147-169 -- standalone copy, uses a *different* more aggressive regex `([a-z])([A-Z][a-z])` for concatenated text (would match any camelCase boundary, higher false-positive risk)
- **Scraper**: `scripts/dryrun.ts` lines 145-167 -- standalone copy, identical to client's dryrun version
- These scripts call `normalizeSectionContent()` directly without going through the AI services, so they will **not** benefit from the `normalizeText()` change. However, dryrun scripts are for development/testing only and already have their own heading fix (blank line before `###`).

### Content flow: DB to UI (client)
- **AI services** (`ai.service.ts`, `openrouter.service.ts`) parse LLM JSON and call `normalizeText()` on `keyTakeaways`, `summary`, `context` -- this is where the fix applies
- **Content writer** (`content-writer.service.ts`) receives the already-normalized text and writes it to markdown files, applying `normalizeSectionContent()` as a secondary safety net
- **UI rendering**: `src/pages/summaries/[slug].vue` (line 45) uses `<ContentRenderer :value="summary">` from `@nuxt/content`, which reads the markdown files and renders them as HTML
- **Why `normalizeText()` is the right place**: It runs at parse time in the AI services, before both DB storage and file writing. This ensures all downstream consumers (markdown files, UI rendering, any future API endpoints) receive properly formatted content.

### Prompt rules
- **Client** `src/server/prompts/rules/base.rules.ts` (line 25): Has `'ALWAYS put a blank line after ### headers before starting paragraph text'`
- **Scraper** `src/server/prompts/rules/base.rules.ts`: **Missing** this rule entirely -- formatting array has 6 entries (lines 23-28) vs client's 7 entries (lines 23-29)
- **Both repos** `src/server/prompts/rules/longform.rules.ts` (line 9): `'Use ### section headers to organize major topic shifts'` -- this tells the LLM to use `###` but doesn't specify blank lines after

### Heading levels in practice
- **`###`**: 63 occurrences across 20+ summary files in client content -- this is the primary LLM-generated heading level
- **`##`**: Used exclusively for the three code-generated section headers (`## Key Takeaways`, `## Summary`, `## Context`) -- NOT LLM-generated
- **`####`**: Zero occurrences in any summary content -- not used at all
- **`#`**: Used only in code-generated file headers (`# {title}`) -- NOT LLM-generated
- **Conclusion**: Targeting only `###` is correct. No other heading levels appear in LLM output.

### Test files
- **Client**: `src/tests/utils/text-normalizer.test.ts` -- uses `vitest` (line 1: `import { describe, it, expect } from 'vitest'`), 188 lines, last test case at line 135 inside `describe('normalizeText', ...)` block
- **Scraper**: `src/tests/utils/text-normalizer.test.ts` -- uses `bun:test` (line 1: `import { describe, it, expect } from 'bun:test'`), 188 lines, identical structure
- Both files end with a `describe('real-world examples from production', ...)` block (lines 162-187) -- new heading tests should go inside the `describe('normalizeText', ...)` block, after line 135 and before line 136 (the closing `}`).

### Real-world concatenated-heading examples in production content
Found actual examples of the concatenated-heading bug in existing summaries:
- `### The Five-Layer AI SEO PyramidThe framework consists of five critical layers:` (qa47-quPcS0/summary.md, line 151)
- `### The Snapshot AdvantageThe most powerful feature for new users...` (olgrrotaaEw/summary.md, line 103)
- `### The Problem with Basic AI DesignTraditional approaches involve...` (cMcg2VC80Ik/summary.md, line 120)
- These confirm the concatenated-heading problem is real. The client's `normalizeSectionContent()` catches some of these; the scraper's does not.

## File-by-File Changes

### 1. Client: `src/server/utils/text-normalizer.ts`

**Add heading normalization as a new step in `normalizeText()`**, between Step 3 (broken sentences) and Step 4 (collapse blank lines). This ordering matters because:
- It must run after broken-word/broken-sentence fixes (which may affect line structure)
- It must run before blank-line collapsing (which would collapse any `\n\n\n` we create down to `\n\n`)

Insert after line 97 (`result = fixBrokenSentences(result);`), before line 99 (`// Step 4: Normalize excessive blank lines`):

```typescript
  // Step 4: Ensure ### headers have blank lines before and after
  // Fix missing blank line before heading: "text### Heading" -> "text\n\n### Heading"
  result = result.replace(/([^\n])(###\s)/g, '$1\n\n$2');
  // Fix missing blank line after heading: "### Heading\nContent" -> "### Heading\n\nContent"
  result = result.replace(/^(### .+)\n(?!\n)/gm, '$1\n\n');
```

Renumber subsequent steps:
- Old Step 4 (line 99-100) becomes Step 5
- Old Step 5 (lines 102-104) becomes Step 6
- Old Step 6 (lines 106-107) becomes Step 7

The function will go from 6 steps to 7 steps. Lines 85-110 will expand to approximately lines 85-116.

### 2. Scraper: `src/server/utils/text-normalizer.ts`

**Identical change** to the client. Insert the same two regexes at the same position in `normalizeText()`. The files are currently identical and should remain identical after this change.

### 3. Scraper: `src/server/prompts/rules/base.rules.ts`

Add the missing prompt rule to `baseRules.formatting` array. Insert after line 24 (`'Paragraphs should be separated by blank lines'`), before line 25 (`'Keep paragraphs short and scannable'`):

```typescript
    'ALWAYS put a blank line after ### headers before starting paragraph text',
```

This matches what the client already has on line 25 of its `base.rules.ts`. After this change, the scraper's formatting array will have 7 entries (matching the client).

### 4. Client: `src/tests/utils/text-normalizer.test.ts`

Add new heading normalization test cases inside the existing `describe('normalizeText', ...)` block (which starts at line 94 and closes at line 136). Insert after line 135 (the `preserves markdown formatting` test case's closing `});`), before line 136 (the `normalizeText` describe block's closing `});`):

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

  it('collapses excessive blank lines after ### heading', () => {
    const input = '### Heading\n\n\n\nContent after excessive blanks.';
    expect(normalizeText(input)).toBe('### Heading\n\nContent after excessive blanks.');
  });

  it('handles ### heading followed by another ### heading', () => {
    const input = '### First Heading\n### Second Heading\nContent here.';
    expect(normalizeText(input)).toBe('### First Heading\n\n### Second Heading\n\nContent here.');
  });
```

### 5. Scraper: `src/tests/utils/text-normalizer.test.ts`

**Same test cases as the client**, but note the import uses `bun:test` instead of `vitest`:

```typescript
import { describe, it, expect } from 'bun:test';
```

The test content is identical; only the import source differs. Insert at the same structural position (after the `preserves markdown formatting` test, before the `normalizeText` describe block's closing `}`).

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

### CRITICAL: `fixBrokenSentences` can eat heading-content boundaries (pre-existing bug)
The `fixBrokenSentences` regex on line 76 uses `\b(a|an|the|of|in|on|at|to|for|with|by)\s*[\n\r]+\s*([a-z])/gi` with the **case-insensitive `gi` flag**. This means if an LLM generates a heading where the heading text *ends* with an article/preposition and the next line starts with lowercase, `fixBrokenSentences` (Step 3) will join them *before* the heading fixer (Step 4) can add the blank line.

**Example**: `### The\ncontent here` -> `fixBrokenSentences` matches `The\nc` and produces `### The content here` -> heading fixer sees no `\n` to fix.

**Practical risk assessment**: LOW. In production data, `###` headings are multi-word (e.g., `### The Apple-Google AI Alliance`). The article/preposition appears mid-heading, not at the end. For the `fixBrokenSentences` regex to match, the heading would need to be exactly `### The` or `### In` etc. with content starting lowercase on the next line. This is an unusual LLM output pattern. Additionally, `fixBrokenSentences` only matches when the *next character* is lowercase `([a-z])`, so `### The\nContent` (capital C) would NOT be affected.

**Recommendation**: This is a pre-existing issue not introduced by this change. Document it but do not fix it in this ticket. A future hardening could add a heading-aware exclusion to `fixBrokenSentences`.

### Regex interaction with broken-word fixer
The broken-word fixer in Step 2 joins patterns like CamelCase breaks. If the LLM generates `### Whats\nApp Features`, the broken-word fixer would join `Whats\nApp` to `WhatsApp` before the heading fixer runs, producing `### WhatsApp Features`. This is correct behavior.

### Double blank lines
If the LLM generates `### Heading\n\n\nContent` (heading + 3 newlines), the heading regex will not match (it only targets `\n` not followed by `\n`). The subsequent blank-line collapsing step (Step 5 after renumbering) will reduce `\n\n\n` to `\n\n`. Correct behavior.

### Headings followed by bullet points
`### Tools\n* Item` should become `### Tools\n\n* Item`. The regex `^(### .+)\n(?!\n)` will match because `*` is not `\n`. Correct behavior.

### Headings followed by another heading
`### First\n### Second` should become `### First\n\n### Second`. The regex will match: `^(### First)\n` where the next char is `#` (not `\n`), so it inserts `\n\n`. Then the second heading `### Second` would also be processed if it has content after it. Correct behavior.

### Headings at end of text
`### Heading\n` at the end -- the negative lookahead `(?!\n)` checks the next char. At end of string, there is no next char, but JavaScript's `(?!\n)` succeeds at end of string (it asserts "not followed by `\n`", and being followed by nothing satisfies this). So `### Heading\n` would match and become `### Heading\n\n`, which `result.trim()` at the end of `normalizeText()` will trim. Net result: `### Heading`. No issue, but adding a test for this edge case is prudent.

### `##` or `#` headings (not `###`)
The current scope intentionally targets only `###` headings because:
- The prompt schema only instructs LLMs to use `###` for subsections
- `##` headings are code-generated section headers (`## Key Takeaways`, `## Summary`, `## Context`)
- `####` headings have zero occurrences in production content
- `#` headings are code-generated file titles only
If other heading levels need normalization in the future, the regex can be broadened to `(#{1,6}\s)`. Out of scope for this ticket.

### `normalizeSectionContent()` redundancy
After this change, the `([^\n])(###\s)` regex exists in both `normalizeText()` and `normalizeSectionContent()`. This is intentional -- `normalizeSectionContent()` remains as a safety net. The second application is a no-op since the first already fixed the spacing.

### Concatenated-heading regex gap in scraper
The client's `normalizeSectionContent()` has a concatenated-heading regex (lines 241-251) that splits `### HeadingParagraph text...` by detecting `[a-z][A-Z]` transitions with a callback checking for sentence punctuation or length > 30. The scraper does not have this. Real examples of this bug exist in production content (see Current State Analysis). This plan does **not** add it to the scraper's `normalizeSectionContent()` or to `normalizeText()` because:
- It is a heuristic-based split with potential false positives
- It belongs at file-write time (structural), not in `normalizeText()` (text cleanup)
- Adding it to the scraper's `normalizeSectionContent()` could be a follow-up task

### Dryrun scripts have standalone copies
Both `client/scripts/dryrun.ts` and `scraper/scripts/dryrun.ts` have their own standalone `normalizeSectionContent()` function that won't be affected by this change. These scripts already have the "blank line before `###`" fix but lack the "blank line after `###`" fix. Since dryrun is for development/testing only, this is acceptable. No changes planned for dryrun scripts.

## Resolved Questions

1. **Should the concatenated-heading regex be added to the scraper's `normalizeSectionContent()`?**
   **Answer**: Not in this ticket. The client's version (lines 241-251 of `content-writer.service.ts`) uses a targeted `^(### .+?[a-z])([A-Z].+)$/gm` regex with length/punctuation guards, while the dryrun scripts use a simpler `([a-z])([A-Z][a-z])` regex without guards (higher false-positive risk). The scraper's `normalizeSectionContent()` should eventually get the client's guarded version for parity. File a follow-up.

2. **Should `normalizeText()` handle `##` and `#` headings too?**
   **Answer**: No. Analysis confirms `###` is the only LLM-generated heading level. `##` and `#` are code-generated and always have correct spacing because they're constructed in template literals (e.g., `` `## Key Takeaways\n\n${content}` ``). No regex broadening needed.

3. **Should the test import difference (`vitest` vs `bun:test`) be abstracted?**
   **Answer**: No. This is an existing pattern across the two repos and not specific to this change. Both test files are structurally identical except for line 1.

## Open Questions for Implementer

1. **Should the heading-at-end-of-text edge case get a dedicated test?** The negative lookahead `(?!\n)` succeeds at end of string, so `### Heading\n` would become `### Heading\n\n` before `trim()` reduces it to `### Heading`. This is correct but worth a test for regression safety.

2. **Should `fixBrokenSentences` be hardened against heading patterns?** The `gi` flag means headings ending in articles/prepositions could theoretically be joined with content. This is a pre-existing bug with low practical risk. A future ticket could add a negative lookbehind `(?<!^### .*)` or restructure the pipeline to process headings first. Not blocking for this change.

# Code Review: AI-13 Heading Normalization (Client PR #2)

**Branch**: `feature/AI-13-heading-normalization`
**Files changed**: `src/server/utils/text-normalizer.ts`, `src/tests/utils/text-normalizer.test.ts`, `_process/plans/AI-13-heading-normalization.md`
**Reviewer**: Claude Opus 4.6
**Date**: 2026-03-03

---

## Finding 1: fixBrokenSentences defeats triple-newline heading protection
- **Priority**: P1
- **File**: src/server/utils/text-normalizer.ts
- **Lines**: 93-104 (Phase 1 heading normalization) and 67-78 (fixBrokenSentences)
- **Issue**: The two-phase approach inserts triple newlines (`\n\n\n`) before fixBrokenWords/fixBrokenSentences to protect heading boundaries. The code comment on line 96 states this prevents "those fixers from incorrectly joining heading text with content." This is true for `fixBrokenWords` (which uses `[\n\r]{1,2}`), but **false for `fixBrokenSentences`** (which uses `[\n\r]+` on line 72 and 76 -- an unbounded quantifier that matches any number of newlines). When a `###` heading ends with an article or preposition (e.g., `### The`, `### Guide to`, `### Pros and`), `fixBrokenSentences` joins the heading text with the following content across the triple newline, destroying the heading boundary. Verified by running: `normalizeText('### The\ncontent here')` produces `'### The content here'` instead of `'### The\n\ncontent here'`. Similarly, `normalizeText('### Items for\nreview of the code')` produces `'### Items for review of the code'`.
- **Suggestion**: Either (a) change `fixBrokenSentences` to use `[\n\r]{1,2}` instead of `[\n\r]+` to match the `fixBrokenWords` quantifier behavior, which would make the triple-newline protection effective for both fixers, or (b) add a heading-aware negative lookbehind to `fixBrokenSentences` patterns to skip matches on heading lines, e.g., `(?<!^### .*)`. Option (a) is simpler and has the added benefit of not joining text across paragraph boundaries (double newlines), which is arguably the correct behavior anyway.
- **Status**: resolved -- Changed `[\n\r]+` to `[\n\r]{1,2}` in both fixBrokenSentences regexes (option a). Also changed `\s*` to `[^\S\n\r]*` (non-newline whitespace) to prevent the `\s*` portions from absorbing extra newlines and defeating the triple-newline boundary. Added 4 tests covering headings ending with "The", "to", "and", "for".

## Finding 2: `####` headings are mangled (new regression)
- **Priority**: P1
- **File**: src/server/utils/text-normalizer.ts
- **Lines**: 99
- **Issue**: The before-heading regex `([^\n])(###\s)` on line 99 matches `####` headings because the 4th `#` character satisfies `[^\n]` and the remaining `### ` (3 hashes + space in "#### Subheading") satisfies `###\s`. This inserts `\n\n\n` between the first `#` and the remaining `### Subheading`, producing `#\n\n### Subheading` -- corrupting the heading level from `####` to `###` with a stray `#` on the previous line. `normalizeText('#### Subheading\nContent')` produces `'#\n\n### Subheading\n\nContent'`. While the plan correctly notes that `####` has zero occurrences in current production content, this is still a correctness regression that could break future content.
- **Suggestion**: Anchor the before-heading regex to only match `###` that are NOT preceded by another `#`. Change `([^\n])(###\s)` to `([^\n#])(###\s)` -- adding `#` to the negated character class. Alternatively, use a negative lookbehind: `(?<!#)(###\s)` combined with `(?<=.)` to avoid inserting before `###` at start of text.
- **Status**: resolved -- Changed `[^\n]` to `[^\n#]` in the newline-preceded regex and `[^\s#]` in the concatenated (no-newline) regex, in both Phase 1 and Phase 2. Added 2 regression tests verifying `####` headings are not corrupted into `# + ###`.

## Finding 3: Inline `###` in content text incorrectly treated as heading
- **Priority**: P2
- **File**: src/server/utils/text-normalizer.ts
- **Lines**: 99, 102-104, 114-115
- **Issue**: If paragraph text contains a literal `### ` sequence (e.g., `'Use ### for subheadings in your document'`), the before-heading regex `([^\n])(###\s)` on line 99 will insert newlines before it, treating it as a heading marker. Verified: `normalizeText('Use ### for subheadings in your document\ncontent')` produces `'Use\n\n### for subheadings in your document\n\ncontent'`. The after-heading regex then also fires, adding a blank line after the now-isolated "heading." While uncommon in production (LLM content about markdown formatting could trigger this), it demonstrates that the regex lacks line-start anchoring for the before-heading case.
- **Suggestion**: For the before-heading regex, require that `###` appear at the start of a logical heading (after a newline or at start of string). One approach: replace `([^\n])(###\s)` with a two-step process -- first `\n(###\s)` that inserts a blank line when `###` follows a single newline (not already a blank line), then handle the no-newline-at-all case separately. Or use `(?<=\n)(?<!\n\n)(###\s)` and `(?<=[^\n])(###\s)` as separate replacements.
- **Status**: resolved -- Split into two regexes: `([^\n#])\n(###\s)` for the newline-preceded case, and `([^\s#])(###\s)` for the concatenated case. The `[^\s#]` excludes spaces, so inline `### ` in content (preceded by a space) is no longer treated as a heading. Added test verifying `Use ### for subheadings` is not broken up.

## Finding 4: Misleading code comment about protection mechanism
- **Priority**: P2
- **File**: src/server/utils/text-normalizer.ts
- **Lines**: 94-97
- **Issue**: The comment block on lines 94-97 states: "This runs before broken-word/sentence fixers so that the inserted blank lines prevent those fixers from incorrectly joining heading text with content. We use triple newlines here so fixBrokenWords' {1,2} quantifier cannot match across heading boundaries." This implies both fixers are protected, but only `fixBrokenWords` is actually protected. `fixBrokenSentences` uses `[\n\r]+` (unbounded), so triple newlines do NOT prevent it from matching across heading boundaries. The comment is misleading and could cause maintainers to believe the protection is comprehensive when it is not.
- **Suggestion**: Either fix the underlying bug (Finding 1) so the comment becomes accurate, or update the comment to explicitly state the limitation: "Note: This only protects against fixBrokenWords. fixBrokenSentences uses [\n\r]+ and can still match across these boundaries when heading text ends with an article/preposition."
- **Status**: resolved -- Fixed the underlying bug (Finding 1), then rewrote the comment to accurately describe that both fixBrokenWords and fixBrokenSentences now use {1,2} quantifiers, making the triple-newline protection effective for both.

## Finding 5: Step ordering allows un-collapsed triple newlines in output
- **Priority**: P3
- **File**: src/server/utils/text-normalizer.ts
- **Lines**: 117-125
- **Issue**: Step 6 (blank-line collapse, line 118) runs before Step 8 (trailing whitespace trim, line 125). When a heading is followed by a whitespace-only line (e.g., `'### Heading\n   \nContent'`), Phase 1 heading normalization adds triple newlines around the heading. Step 6 collapses some of them. Step 8 then trims the whitespace-only line to empty, which can re-create a triple newline that is never collapsed. Verified: `normalizeText('### Heading\n   \nContent')` produces `'### Heading\n\n\nContent'` (contains triple newline in final output).
- **Suggestion**: Either move Step 8 (trailing whitespace trim) before Step 6 (blank-line collapse), or add a second blank-line collapse after the trim step. The former is simpler and less error-prone.
- **Status**: resolved -- Moved trailing whitespace trim (now Step 6) before blank-line collapse (now Step 7). Added test verifying `### Heading\n   \nContent` produces `### Heading\n\nContent` without triple newlines.

## Finding 6: Two-phase approach adds unnecessary complexity without solving the core problem
- **Priority**: P2
- **File**: src/server/utils/text-normalizer.ts
- **Lines**: 93-115
- **Issue**: The implementation deviates from the plan's simpler two-regex approach (insert heading normalization between broken-sentence fixer and blank-line collapse). Instead, it uses a two-phase approach with 5 heading regexes (3 in Phase 1, 2 in Phase 2) and triple newlines as protection. This adds complexity (19 regex passes vs the pre-PR 14, a 36% increase) but does not fully solve the problem it was designed for (`fixBrokenSentences` still matches across the triple newlines). The plan's simpler approach has the same `fixBrokenSentences` bug but with fewer regex passes and less code complexity. The triple-newline approach successfully protects against `fixBrokenWords`, but `fixBrokenWords` was already documented as low risk for heading patterns.
- **Suggestion**: Consider reverting to the plan's simpler approach (2 regexes placed after `fixBrokenSentences` and before blank-line collapse), combined with the `fixBrokenSentences` quantifier fix from Finding 1. This would reduce complexity while actually solving the protection problem.
- **Status**: resolved -- Kept the two-phase approach but fixed the root cause (Finding 1's quantifier fix + Finding 1's \s* fix). The two-phase approach now works correctly as intended: Phase 1 creates effective triple-newline protection boundaries, and Phase 2 catches any post-fixer edge cases. The complexity argument is addressed by the fact that the protection now genuinely works for both fixers, justifying the extra regexes.

## Finding 7: Missing test for fixBrokenSentences/heading interaction
- **Priority**: P2
- **File**: src/tests/utils/text-normalizer.test.ts
- **Lines**: 137-180
- **Issue**: None of the 10 new heading tests exercise the scenario where `fixBrokenSentences` interferes with heading boundaries. All test headings end with nouns or adjectives (e.g., "Key Points", "Overview", "Tools"), never with articles or prepositions that would trigger `fixBrokenSentences`. This means the primary bug being guarded against by the two-phase approach (Finding 1) has no test coverage. The existing tests would pass even if Phase 1 heading normalization was completely removed.
- **Suggestion**: Add tests with headings ending in articles/prepositions that would trigger `fixBrokenSentences`:
  - `'### The\ncontent here'` should produce `'### The\n\ncontent here'`
  - `'### Guide to\nmastering skills'` should produce `'### Guide to\n\nmastering skills'`
  - `'### Pros and\ncons of AI'` should produce `'### Pros and\n\ncons of AI'`
  These tests will currently FAIL, which documents the bug from Finding 1.
- **Status**: resolved -- Added 4 tests for headings ending with articles/prepositions: "The", "to", "and", "for". All tests pass after the Finding 1 fix.

## Finding 8: Missing test for `####` heading regression
- **Priority**: P2
- **File**: src/tests/utils/text-normalizer.test.ts
- **Lines**: 137-180
- **Issue**: No test verifies that `####` headings are handled correctly (or at least not corrupted). The regression from Finding 2 would be caught by such a test. Even though `####` is not currently used in production content, a regression test prevents future breakage.
- **Suggestion**: Add: `it('does not corrupt #### headings', () => { expect(normalizeText('#### Sub\nContent')).toBe('#### Sub\n\nContent'); });` -- or if `####` should be left alone entirely (no blank-line insertion), adjust the expectation accordingly.
- **Status**: resolved -- Added 2 tests verifying `####` headings are not corrupted into `# + ###` split. Tests check that `####` remains intact and no stray `#` appears on a preceding line. Note: `fixBrokenWords` CamelCase joining still applies to `####` content (e.g., `Subheading\nContent` joins), which is expected since `####` is not in scope for heading normalization.

## Finding 9: `## Summary\nContent` gets corrupted by fixBrokenWords (pre-existing)
- **Priority**: P3
- **File**: src/server/utils/text-normalizer.ts
- **Lines**: 12, 43 (CAMELCASE_BREAK pattern)
- **Issue**: This is a pre-existing bug NOT introduced by this PR, but worth documenting since the PR adds heading awareness. `normalizeText('## Summary\nContent here')` produces `'## SummaryContent here'` because `CAMELCASE_BREAK` matches `Summary\nContent` (both satisfy `[A-Z][a-z]{2,}` with `[\n\r]{1,2}`). In practice, `## Summary` always has `\n\n` after it (code-generated template), so the `{1,2}` quantifier would match. The PR's heading protection only covers `###`, not `##`.
- **Suggestion**: Not blocking for this PR. Document as a known issue. If fixing, either add `##` to the heading protection patterns or add a word-boundary-aware exclusion to `CAMELCASE_BREAK` for heading lines.
- **Status**: wont-fix -- Pre-existing bug not introduced by this PR. `## Summary` headings are code-generated and always have `\n\n` after them in practice. Out of scope for this ticket; documented as a known issue for a future hardening pass.

## Finding 10: Plan document committed to the repository
- **Priority**: P3
- **File**: _process/plans/AI-13-heading-normalization.md
- **Lines**: 1-243
- **Issue**: The plan document is thorough and well-written, but it is committed as part of this PR. The plan specifies a simpler approach (2 regexes) than what was actually implemented (5 regexes with two-phase approach). The discrepancy between plan and implementation is not documented anywhere. This could confuse future maintainers who read the plan expecting it to match the code.
- **Suggestion**: Either update the plan to reflect the actual implementation (two-phase approach with rationale for the deviation), or add a note at the top of the plan indicating that the implementation diverged and why.
- **Status**: resolved -- Added an implementation note at the top of the plan document documenting the divergence: two-phase approach with triple-newline protection, the quantifier/whitespace fixes from the review, and the `[^\n#]`/`[^\s#]` regex refinements.

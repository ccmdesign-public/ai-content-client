---
status: resolved
priority: p2
issue_id: "019"
tags: [code-review, quality, robustness]
dependencies: []
resolved_date: "2026-03-08"
resolution: "Added CRLF->LF normalisation before the frontmatter regex in extractFrontmatter(). Added console.warn for files with content but no parseable frontmatter."
---

# Frontmatter Regex Fragile for CRLF Line Endings and Edge Cases

## Problem Statement

The `extractFrontmatter` function in `scripts/build-search-index.ts` uses a regex `^---\n([\s\S]*?)\n---` that only matches Unix-style line endings (`\n`). If any markdown file has Windows-style CRLF line endings (`\r\n`), the regex will fail to match and the document will be silently skipped from the search index.

Additionally, the regex does not handle frontmatter that ends at the exact end of the file (no trailing newline after `---`).

## Findings

- **Location**: `scripts/build-search-index.ts`, line 29
- **Evidence**: `const match = content.match(/^---\n([\s\S]*?)\n---/)` -- hardcoded `\n` only.
- **Impact**: Any summary file with CRLF endings will be silently excluded from the search index. Git may introduce CRLF on Windows checkouts depending on `.gitattributes` config. The build script logs a count of indexed docs but doesn't warn about files that had frontmatter parse failures vs. files that had no frontmatter match at all.
- **Scale**: 312+ summary files, any of which could have different line endings.

## Proposed Solutions

### Solution A: Use a robust frontmatter parsing library (Recommended)
- Replace the custom regex with `gray-matter` (already widely used in the Node ecosystem) or at minimum normalize line endings before matching.
- **Pros**: Handles all edge cases (CRLF, no trailing newline, BOM, etc.). Battle-tested library.
- **Cons**: Adds a dependency (though it's dev-only).
- **Effort**: Small
- **Risk**: Low

### Solution B: Normalize line endings before regex
- Add `content.replace(/\r\n/g, '\n')` before the regex match.
- **Pros**: Minimal change. No new dependency.
- **Cons**: Still a custom parser; may miss other edge cases.
- **Effort**: Small
- **Risk**: Low

## Recommended Action


## Technical Details

- **Affected files**: `scripts/build-search-index.ts`
- **Components**: Build-time search index generator
- **Database changes**: None

## Acceptance Criteria

- [ ] Frontmatter extraction works with both LF and CRLF line endings
- [ ] Build script warns when a markdown file has content but no parseable frontmatter

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-08 | Created from PR #5 code review | Custom frontmatter parsing is fragile; prefer established libraries |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/5
- File: `scripts/build-search-index.ts` (line 29)

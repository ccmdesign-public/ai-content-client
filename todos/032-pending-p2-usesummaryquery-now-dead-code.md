---
status: pending
priority: p2
issue_id: "032"
tags: [code-review, dead-code, architecture]
dependencies: []
---

# useSummaryQuery Is Now Dead Code After PR Refactoring

## Problem Statement

PR #20 removed all imports of `useSummaryQuery` from the page files:
- `src/pages/channels/[slug].vue` -- now uses `useContentStream('summaries')` directly
- `src/pages/playlists/[slug].vue` -- now uses `useContentStream('summaries', { where: ... })`
- `src/pages/summaries/index.vue` -- now uses `useContentStream('summaries')`

The composable `src/composables/useSummaryQuery.ts` remains in the codebase with 82 lines of code but is no longer imported anywhere. It was modified in this PR (switched to fetch-all + client-side filter) but is effectively dead code.

## Findings

- **Source**: `src/composables/useSummaryQuery.ts` (entire file)
- **Agent**: architecture-reviewer
- **Evidence**: `grep -r "useSummaryQuery" src/pages/` returns no results after PR changes. All three pages that used it switched to `useContentStream`.

## Proposed Solutions

### Solution A: Delete useSummaryQuery.ts
Remove the dead composable entirely.
- **Pros**: Less dead code, cleaner codebase
- **Cons**: Loses the abstraction if needed later
- **Effort**: Small
- **Risk**: None

### Solution B: Keep but deprecate
Add a `@deprecated` JSDoc tag.
- **Pros**: Available if needed
- **Cons**: Still dead code in tree
- **Effort**: Trivial
- **Risk**: None

## Recommended Action

_To be filled during triage_

## Technical Details

- **Affected files**: `src/composables/useSummaryQuery.ts`

## Acceptance Criteria

- [ ] No dead code in composables directory, or dead code is marked deprecated

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | PR #20 code review | Identified orphaned composable |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/20

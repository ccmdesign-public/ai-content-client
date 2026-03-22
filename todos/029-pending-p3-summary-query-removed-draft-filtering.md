---
status: pending
priority: p3
issue_id: "029"
tags: [code-review, data-integrity, filtering]
dependencies: []
---

# useSummaryQuery Removed Draft Filtering

## Problem Statement

The PR removed the `query.where('published', '<>', false)` line from `useSummaryQuery` with the comment "Removes invalid 'published' column filter -- not in the Zod schema." However, `useContentStream` (which the pages now use directly) has its own draft filter: `docs.filter(d => d.published !== false)`. This means:

- Pages using `useContentStream` directly (channels, summaries index) correctly exclude drafts
- The `useSummaryQuery` composable (still used nowhere after this PR, but kept in codebase) no longer excludes drafts
- Future callers of `useSummaryQuery` would get drafts included

This is a minor inconsistency since `useSummaryQuery` is not actively called after this PR.

## Findings

- **Source**: `src/composables/useSummaryQuery.ts`, removed lines around the `published` filter
- **Agent**: quality-reviewer
- **Evidence**: The `published` field check was removed entirely rather than being moved to the client-side filter block

## Proposed Solutions

### Solution A: Add client-side draft filter to useSummaryQuery
```ts
docs = docs.filter(d => d.published !== false)
```
- **Pros**: Consistent behavior, defensive
- **Cons**: Minor code addition to unused composable
- **Effort**: Small
- **Risk**: None

### Solution B: Remove useSummaryQuery entirely
Since no page imports it after this PR, it's dead code.
- **Pros**: Less code to maintain
- **Cons**: May be needed in future
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be filled during triage_

## Technical Details

- **Affected files**: `src/composables/useSummaryQuery.ts`

## Acceptance Criteria

- [ ] Draft summaries are not visible to end users on any page

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | PR #20 code review | Identified removed draft filter |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/20

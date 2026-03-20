---
status: resolved
priority: p2
issue_id: "009"
tags: [code-review, architecture, composable, logic]
dependencies: []
---

# useSortedFeed: Date Grouping Uses publishedAt Even When Sorting by processedAt

## Problem Statement

When `currentSort` is `processed-date-desc`, `isDateSort` is true, so `useDateGroups` is invoked. However, `useDateGroups` uses the default `dateAccessor` which reads `item.metadata.publishedAt`. This means items are sorted by `processedAt` (via `useSortOptions`) but grouped into date buckets by `publishedAt`. A video published in January but processed today would sort at the top but appear in the "Older" group.

This is NOT a regression -- the old inlined code had the same behavior. However, the composable extraction makes this a good moment to flag it.

## Findings

- **Source**: `src/composables/useSortedFeed.ts` lines 33-37
- `useDateGroups` is called with `undefined` as the dateAccessor (uses default: `publishedAt`)
- When sort is `processed-date-desc`, items are sorted by `processedAt` but grouped by `publishedAt`
- This mismatch exists in all 4 pages pre-refactor, so it is pre-existing behavior

## Proposed Solutions

### Option A: Pass a dynamic dateAccessor based on sort key
- **Pros**: Groups match sort order, more intuitive UX
- **Cons**: Behavior change, needs visual QA, may confuse users who expect publish-date groups
- **Effort**: Small
- **Risk**: Medium (behavior change)

### Option B: Leave as-is, document the design decision
- **Pros**: No risk, no behavior change, matches existing UX
- **Cons**: Sort/group mismatch persists
- **Effort**: None
- **Risk**: None

## Recommended Action

Leave as-is for this PR. If addressing later, pass `(item) => item.processedAt` when `currentSort` is `processed-date-desc`.

## Technical Details

- **Affected files**: `src/composables/useSortedFeed.ts`
- **Pre-existing**: Yes, same behavior existed in all 4 pages before extraction

## Acceptance Criteria

- [ ] Decide whether sort/group accessor mismatch is acceptable UX
- [ ] If fixing: add dateAccessor parameter to useSortedFeed that switches based on sort key

## Work Log

| Date | Action | Outcome |
|------|--------|---------|
| 2026-03-20 | Identified during PR #15 code review | Pre-existing design smell, not a regression |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/15
- `src/composables/useDateGroups.ts` default accessor at line 39

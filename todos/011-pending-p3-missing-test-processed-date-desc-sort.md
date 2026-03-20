---
status: resolved
priority: p3
issue_id: "011"
tags: [code-review, testing, composable]
dependencies: []
---

# Missing Test for `processed-date-desc` Sort Direction in useSortedFeed

## Problem Statement

The test suite covers `publish-date-desc`, `publish-date-asc`, and `title-asc` sort modes explicitly, but `processed-date-desc` is only tested implicitly via `isDateSort` boolean check. There is no test verifying that items are actually sorted by `processedAt` in descending order when this sort mode is selected.

## Findings

- **Source**: `src/tests/composables/useSortedFeed.test.ts`
- `processed-date-desc` appears only in the `isDateSort` test (line 95-96) which checks the boolean value
- No test sets `currentSort.value = 'processed-date-desc'` and then verifies item order
- The 10 existing tests are otherwise comprehensive (empty states, reactivity, default sort, sort label, etc.)

## Proposed Solutions

### Option A: Add a targeted test case
```typescript
it('processed-date-desc sorts by processedAt descending', () => {
  const items = ref([itemA, itemB, itemC])
  const { feedSegments, currentSort } = useSortedFeed(items)
  currentSort.value = 'processed-date-desc'
  const allItems = feedSegments.value.flatMap(s => s.items)
  // itemA has latest processedAt (Jan 20), then itemC (Jan 15), then itemB (Jan 10)
  expect(allItems[0].metadata.title).toBe('Alpha')
  expect(allItems[1].metadata.title).toBe('Charlie')
  expect(allItems[2].metadata.title).toBe('Beta')
})
```
- **Effort**: Small
- **Risk**: None

## Technical Details

- **Affected files**: `src/tests/composables/useSortedFeed.test.ts`

## Acceptance Criteria

- [ ] Test verifies `processed-date-desc` produces items ordered by processedAt descending

## Work Log

| Date | Action | Outcome |
|------|--------|---------|
| 2026-03-20 | Identified during PR #15 code review | Test gap for 4th sort mode |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/15

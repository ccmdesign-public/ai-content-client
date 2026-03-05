---
status: pending
priority: p3
issue_id: "014"
tags: [code-review, quality, logic]
dependencies: []
---

# "All" chip count may double-count summaries tagged in multiple categories

## Problem Statement

The `allItemsCount` computed in `CategoryFilterBar.vue` sums `category.totalItems` across all categories. However, a single summary can be tagged with tags from multiple categories (e.g., tagged both "AI & ML" and "Programming"). The `totalItems` per category counts each tagged item once per category, so the sum inflates the "All" count above the actual number of unique summaries.

## Findings

- `src/components/content/CategoryFilterBar.vue` line 28-30: `props.categories.reduce((sum, c) => sum + c.totalItems, 0)`
- `src/composables/useTagsConfig.ts` line 37: `totalItems` is per-category sum of `tag.itemCount`
- The "All" chip count shows a number higher than `totalCount` from `useHomepageFilter` (which counts unique summaries)
- Users see a confusing discrepancy: "All" chip says e.g., "1500" but the header says "1200 videos"

## Proposed Solutions

### Solution A: Pass totalCount from useHomepageFilter as a prop
Pass the actual unique summary count from the composable to CategoryFilterBar instead of computing it from category sums.

- **Pros**: Accurate count, simple prop addition
- **Cons**: Minor API change to the component
- **Effort**: Small
- **Risk**: Low

### Solution B: Deduplicate in allItemsCount computation
Build a Set of unique item IDs across all categories to get the true count.

- **Pros**: Self-contained in the component
- **Cons**: Requires access to individual item IDs, not just counts
- **Effort**: Medium
- **Risk**: Low

## Recommended Action

<!-- Filled during triage -->

## Technical Details

**Affected files:**
- `src/components/content/CategoryFilterBar.vue`
- `src/pages/index.vue` (if adding prop)

## Acceptance Criteria

- [ ] "All" chip count matches the actual number of unique summaries
- [ ] Count is consistent with the "X videos" display in the page header

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Created during PR #4 code review | Depends on whether summaries are actually multi-tagged in current data |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/4

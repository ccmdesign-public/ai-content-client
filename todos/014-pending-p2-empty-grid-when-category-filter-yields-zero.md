---
priority: P2
file: src/pages/masterclasses/index.vue
line: 118
status: pending
---

## Empty grid when category filter yields zero results (no search)

**What**: `showEmptySearch` only triggers when `searchQuery` is truthy. If a user selects a category filter that has zero results after filtering (edge case with dynamic data), the grid renders empty with no feedback. `showNoData` also doesn't cover this because `totalCount` (unfiltered) is nonzero.

**Why**: Users see a blank page with no explanation of why there are no results, and no clear path to recover.

**Fix**: Change `showEmptySearch` to check `(searchQuery.value || categoryFilter.value) && filteredCount.value === 0` so it also covers the category-only empty state. Update the empty state message to reflect category filtering.

---
status: pending
priority: p3
issue_id: "015"
tags: [code-review, quality, ux]
dependencies: []
---

# Missing empty state when category filter returns zero results

## Problem Statement

When a user selects a category that has no matching summaries (e.g., category exists in tags-index.json but no summaries are tagged with it), the page displays nothing between the header and footer. There is no empty state message guiding the user to try a different category or reset the filter.

## Findings

- `src/pages/index.vue` line 43: `<DateGroupedFeed v-else :segments="segments" />` -- when `segments` is empty, `DateGroupedFeed` renders its own empty state ("No summaries found") but it's generic
- The composable returns `[]` at line 69 of `useHomepageFilter.ts` when the ID set is empty
- No category-specific empty state like "No summaries found in this category. Try selecting a different category or click All."

## Proposed Solutions

### Solution A: Add a filtered empty state in index.vue
Add a conditional block that shows when `filteredCount === 0 && selectedCategory !== null`.

- **Pros**: Simple, clear user guidance, one-line template addition
- **Cons**: None significant
- **Effort**: Small
- **Risk**: Low

## Recommended Action

<!-- Filled during triage -->

## Technical Details

**Affected files:**
- `src/pages/index.vue`

## Acceptance Criteria

- [ ] When a category filter returns zero results, a helpful message is shown
- [ ] The message suggests resetting the filter or trying another category
- [ ] The "All" reset option is accessible from the empty state

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Created during PR #4 code review | Edge case for categories with tags but no summary-type items |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/4

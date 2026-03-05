---
status: resolved
priority: p2
issue_id: "009"
tags: [code-review, architecture, css]
dependencies: []
resolved_date: "2026-03-05"
resolution: "Added ResizeObserver in CategoryFilterBar to dynamically set --filter-bar-height CSS custom property on the parent element. DateGroupedFeed date-segment headers now use top: var(--filter-bar-height, 0px) to stack below the filter bar instead of overlapping."
---

# Sticky date-segment headers overlap with the filter bar

## Problem Statement

The `DateGroupedFeed.vue` date-segment headers use `position: sticky; top: 0; z-index: 10`, and the new `CategoryFilterBar.vue` uses `position: sticky; top: 0; z-index: 20`. While the z-index layering is correct (filter bar renders above date headers), both elements compete for the same `top: 0` position. When scrolling, date-segment headers slide underneath the filter bar rather than stacking below it. This creates a visual overlap where date text is partially visible behind the filter bar.

## Findings

- `src/components/content/DateGroupedFeed.vue` line 41-42: `position: sticky; top: 0;`
- `src/components/content/CategoryFilterBar.vue` line 130-131: `position: sticky; top: 0;`
- The plan document itself identified this risk ("date-segment headers' `top` value must be offset by the filter bar height") but the implementation did not address it.
- The filter bar height is approximately 60px (44px min-height chip + 0.5rem padding top/bottom + 1px border).

## Proposed Solutions

### Solution A: CSS custom property for filter bar height
Set a `--filter-bar-height` CSS custom property (e.g., `60px`) and update the date-segment header `top` to use it.

- **Pros**: Simple, no JS needed, predictable
- **Cons**: Fragile if filter bar height changes; requires manual sync
- **Effort**: Small
- **Risk**: Low

### Solution B: ResizeObserver to measure filter bar height dynamically
Use a `ResizeObserver` on the filter bar element to set `--filter-bar-height` dynamically on the parent container.

- **Pros**: Adapts automatically to content changes, responsive-safe
- **Cons**: Slightly more complex; requires a ref on the filter bar element
- **Effort**: Medium
- **Risk**: Low

### Solution C: Use a scroll container with fixed header
Restructure so the filter bar is in a fixed header area and the scrollable feed has its own scroll context.

- **Pros**: Clean architectural separation
- **Cons**: Significant refactor; changes scroll behavior for the whole page
- **Effort**: Large
- **Risk**: Medium

## Recommended Action

<!-- Filled during triage -->

## Technical Details

**Affected files:**
- `src/components/content/CategoryFilterBar.vue`
- `src/components/content/DateGroupedFeed.vue`
- `src/pages/index.vue` (if ResizeObserver approach is used)

**Components:** CategoryFilterBar, DateGroupedFeed

## Acceptance Criteria

- [ ] Date-segment sticky headers stack visually below the filter bar, not behind it
- [ ] Scrolling behavior works correctly on mobile and desktop
- [ ] No layout shift when the filter bar appears

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Created during PR #4 code review | Plan identified this risk but implementation missed the offset |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/4
- Plan: `_process/plans/2026-03-05-feat-homepage-tag-category-filter-plan.md` (see "Sticky Filter Bar" section)

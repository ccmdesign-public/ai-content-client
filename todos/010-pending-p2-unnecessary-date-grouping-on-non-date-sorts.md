---
status: pending
priority: p2
issue_id: "010"
tags: [code-review, performance, architecture]
dependencies: []
---

# Unnecessary Date Grouping Computation on Non-Date Sorts

## Problem Statement

All four list pages unconditionally call `useDateGroups(sorted)` regardless of the active sort mode. When the user selects "Title A-Z", the data still flows through `useDateGroups`, which iterates all items, parses dates, assigns date groups, and sorts within each group -- all of which is wasted work since `DateGroupedFeed` renders a flat list (`:show-headers="isDateSort"`).

While the current data volume (hundreds of items) makes this negligible in practice, the architecture unnecessarily couples non-date sorts to the date grouping pipeline. This creates a misleading data flow: title-sorted items get re-sorted by date within arbitrary groups, then flattened back out.

## Findings

- **Location**: `src/pages/index.vue:12`, `src/pages/tags/[slug].vue:24`, `src/pages/channels/[slug].vue:59`, `src/pages/playlists/[slug].vue:15`
- **Evidence**: `const { segments } = useDateGroups(sorted)` is called unconditionally. Inside `useDateGroups`, items are grouped by date and sorted within each group (lines 57-64 of `useDateGroups.ts`), even when the sort mode is `title-asc`.
- **Impact**: Minor performance waste. More importantly, the flat list rendering in `DateGroupedFeed` depends on `segments.flatMap(s => s.items)`, which reintroduces date-based ordering within each group, potentially disrupting the title-based sort order within groups.
- **Correctness concern**: When sorting by title A-Z, items are first sorted alphabetically by `useSortOptions`, then `useDateGroups` distributes them into date buckets and re-sorts each bucket by date descending. The `flatMap` in `DateGroupedFeed` concatenates these buckets, so the final order is: Today's items (by date), Yesterday's items (by date), etc. -- NOT alphabetical. The title sort is effectively broken when items span multiple date groups.

## Proposed Solutions

### Solution A: Conditionally bypass date grouping (Recommended)
- In each page, only call `useDateGroups` when `isDateSort` is true. When false, pass sorted items directly to the feed component (either as a single-segment array or via a different prop).
- **Pros**: Fixes the correctness issue. Eliminates wasted computation.
- **Cons**: Slightly more conditional logic in pages.
- **Effort**: Small
- **Risk**: Low

### Solution B: Make DateGroupedFeed accept a flat items array
- Add an `items` prop as an alternative to `segments`. When `items` is provided, render flat; when `segments` is provided, render grouped.
- **Pros**: Cleaner API. No need to wrap in fake segments.
- **Cons**: Dual-mode component adds complexity.
- **Effort**: Medium
- **Risk**: Low

## Recommended Action

_To be filled during triage._

## Technical Details

- **Affected files**: All four list pages, `src/composables/useDateGroups.ts`, `src/components/content/DateGroupedFeed.vue`
- **Components**: Page orchestration layer, DateGroupedFeed
- **Database changes**: None

## Acceptance Criteria

- [ ] Selecting "Title A-Z" sort shows items in strict alphabetical order (not re-sorted by date within groups)
- [ ] Date grouping computation is skipped for non-date sort modes
- [ ] Date-based sorts continue to show correct group headers and within-group ordering

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Identified during PR #3 code review | Title sort order is disrupted by unconditional date grouping re-sort |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/3
- `useDateGroups.ts` lines 57-64: within-group sort logic

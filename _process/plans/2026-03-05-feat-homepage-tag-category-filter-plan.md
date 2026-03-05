---
title: "feat: Add homepage tag category filter bar"
type: feat
status: active
date: 2026-03-05
---

# feat: Add homepage tag category filter bar

## Overview

Add a horizontal filter bar at the very top of the homepage (`src/pages/index.vue`) that displays **top-level tag categories** (e.g., "AI & Machine Learning", "Web Development") as clickable chips. Selecting a category filters the summary feed to show only summaries tagged with any tag belonging to that category. An "All" option resets the filter.

This is a **client-side filter** operating on already-loaded data -- no new API endpoints or content collections are required.

## Problem Statement / Motivation

1. **Discovery friction**: The homepage shows all summaries in reverse-chronological order with no way to narrow by interest area. Users with specific interests (e.g., "AI & Machine Learning") must scroll or navigate to `/tags` and pick individual tags.
2. **Category awareness gap**: The tag system already organizes tags into 10 well-defined categories, but this structure is only visible on the `/tags` page -- not on the homepage where users spend most time.
3. **Low-friction filtering**: A single-click category filter at the top of the page is faster than navigating to `/tags`, selecting a category, then picking individual tags.

## Proposed Solution

### UI Design

```
+-----------------------------------------------------------------------+
| [All]  [AI & ML]  [Web Dev]  [Programming]  [DevOps]  [Tools] ...    |
+-----------------------------------------------------------------------+
| All Summaries                                                          |
| 328 videos (filtered from 1200)                                        |
|                                                                        |
| TODAY (5)                                                              |
| +-- SummaryCard                                                        |
| +-- SummaryCard                                                        |
| ...                                                                    |
+-----------------------------------------------------------------------+
```

- **Position**: Between the `<header class="page-header">` and the `<DateGroupedFeed>` component, or above the header itself ("at the very top").
- **Chip style**: Reuse the existing `.tag-chip` pattern from `src/pages/tags/index.vue` with an active/selected state.
- **"All" chip**: Always first, selected by default. Clears any filter.
- **Category chips**: One per unique `category` value from `tags-index.json` (currently 10 categories). Sorted by total item count descending (matching the existing `tagsByCategory` sort order).
- **Single-select**: Only one category active at a time (not multi-select).
- **Sticky behavior (optional)**: The filter bar could be sticky so it remains accessible while scrolling, but this is an implementer decision.

### Data Flow

1. **Source**: `useTagsConfig()` already provides `tagsByCategory` -- a computed list of categories sorted by total item count, each containing its child tags with slugs.
2. **Filter state**: A `ref<string | null>` holding the selected `categoryId` (or `null` for "All").
3. **Tag slug set**: When a category is selected, collect all tag slugs belonging to that category from `tagsByCategory`.
4. **Content filtering**: Load tag data from the `tags` collection to build a set of summary video IDs that belong to the selected category's tags. Filter the `summaries` data against this set.

### Filtering Strategy

Two viable approaches exist. The implementer should choose based on performance:

**Option A -- Client-side cross-reference (recommended for MVP)**:
1. Load all summaries via `useContentStream('summaries')` (already happens).
2. Load all tag data via `queryCollection('tags').all()` to get each tag's `items[]` array.
3. When a category is selected, collect all `items[].id` values from tags in that category.
4. Filter summaries where `metadata.videoId` is in that set.
5. Wrap in a composable: `useHomepageFilter(summaries, tagsByCategory)`.

**Option B -- Per-tag query (more queries, less memory)**:
1. When a category is selected, query each tag in that category individually (like `useTagIndex` does).
2. Union the resulting summary sets.
3. This is closer to the existing pattern but involves N queries per category selection.

**Recommendation**: Option A, because the homepage already loads all summaries and the tag index JSON is small (~100 entries). A single additional `queryCollection('tags').all()` call gets all the cross-reference data needed.

## Technical Considerations

### New Files

| File | Purpose |
|------|---------|
| `src/composables/useHomepageFilter.ts` | Composable managing filter state, category-to-videoId resolution, and filtered summaries list |
| `src/components/content/CategoryFilterBar.vue` | Presentational component rendering category chips with active state |

### Modified Files

| File | Change |
|------|--------|
| `src/pages/index.vue` | Import and wire `CategoryFilterBar` + `useHomepageFilter`; pass filtered summaries to `DateGroupedFeed` |

### No Changes Required

- `useTagsConfig.ts` -- already exposes `tagsByCategory` with all needed data
- `useDateGroups.ts` -- works on any array of `{ processedAt }` items
- `DateGroupedFeed.vue` -- receives segments as a prop, agnostic to filtering
- `content.config.ts` -- tag schema already includes `items[]` with `id` and `type`
- No new API routes, no schema changes, no new content files

### Performance

- The `tags` data collection contains ~100 YAML files. Loading them all once on homepage mount is acceptable (~10-20 KB total).
- Filtering is a `Set.has()` lookup per summary -- O(n) where n = number of summaries. With ~1200 summaries this is sub-millisecond.
- Category selection should feel instant (no loading spinner needed for the filter operation itself).
- Consider caching the tag-to-videoId mapping in a computed so it only recalculates when the selected category changes.

### Accessibility

- Filter bar should use `role="radiogroup"` with `role="radio"` on each chip (single-select semantics).
- Active chip gets `aria-checked="true"`.
- Keyboard navigation: arrow keys to move between chips, Enter/Space to select.
- Filtered count announcement: use `aria-live="polite"` on the count text so screen readers announce changes.

### Mobile / Responsive

- The filter bar should horizontally scroll on narrow viewports (10 categories may overflow).
- Use `overflow-x: auto` with `-webkit-overflow-scrolling: touch`.
- Consider hiding the scrollbar visually while keeping it functional.
- On mobile, the filter bar should appear above the page header, below the `MobileNav` component.

## Acceptance Criteria

- [ ] A horizontal row of category chips appears at the top of the homepage above the summary feed
- [ ] An "All" chip is always present, selected by default, and clears filtering
- [ ] Each chip displays the category name (e.g., "AI & Machine Learning")
- [ ] Clicking a category chip filters the feed to show only summaries tagged with tags in that category
- [ ] The summary count in the page header updates to reflect the filtered count
- [ ] The `DateGroupedFeed` re-groups correctly after filtering (date segments reflect filtered items)
- [ ] Only one category can be active at a time (single-select)
- [ ] Filter state resets to "All" on page navigation away and back
- [ ] The filter bar is usable on mobile (horizontal scroll, touch-friendly chip size)
- [ ] Keyboard and screen reader accessible (radiogroup semantics, aria-live count)

## Success Metrics

- Users can filter the homepage feed by category in a single click
- Filter response is instantaneous (no visible loading delay)
- No regression in initial page load performance (tag data loaded alongside existing summaries)

## Dependencies & Risks

| Risk | Mitigation |
|------|------------|
| Tag data not loaded on homepage currently | Add a `queryCollection('tags').all()` call; data is small |
| Category names are long ("AI & Machine Learning") | Truncate or abbreviate in chip display; or use short labels |
| Some summaries may not be tagged | "All" shows everything; category filters only show tagged items. Document this in the UI if the count difference is notable |
| Future multi-select need | Build the composable to accept `string[]` internally even if the UI is single-select, making multi-select a UI-only change later |

## Open Questions

1. **Exact position**: "At the very top" -- should it be above the "All Summaries" heading, or between the heading and the feed? Above the heading keeps it most prominent.
2. **Show item counts on chips?**: Should each category chip show how many summaries it contains (e.g., "AI & ML (328)")? The data is available from `tagsByCategory.totalItems`.
3. **URL state**: Should the selected category be reflected in the URL (e.g., `/?category=ai-ml`) so it is shareable/bookmarkable? Or purely ephemeral client state?
4. **Sticky filter bar**: Should the filter bar stick to the top when scrolling, so users can re-filter without scrolling back up?
5. **Abbreviations**: Some category names are long. Should we use shortened labels (e.g., "AI & ML" instead of "AI & Machine Learning")?

## Sources & References

### Internal References

- Tag category data structure: `src/content/tags-index.json` (10 categories, ~100 tags)
- Tag config composable: `src/composables/useTagsConfig.ts` -- provides `tagsByCategory`, `tags`, `getTagBySlug`
- Tag index composable: `src/composables/useTagIndex.ts` -- pattern for cross-referencing tags with summaries
- Content stream composable: `src/composables/useContentStream.ts` -- used by homepage to load summaries
- Homepage: `src/pages/index.vue` -- current implementation, orchestration-only page
- Tags browse page: `src/pages/tags/index.vue` -- existing `.tag-chip` CSS pattern to reuse
- Date grouping: `src/composables/useDateGroups.ts` -- groups filtered results by date
- Content schema: `content.config.ts` -- `tags` collection schema with `items[]` array

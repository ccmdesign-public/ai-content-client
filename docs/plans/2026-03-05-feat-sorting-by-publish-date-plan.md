---
title: "feat: Add sorting feature with publish date as default sort order"
type: feat
status: active
date: 2026-03-05
---

# feat: Add sorting feature with publish date as default sort order

## Overview

Content ordering across all list views (homepage, tag pages, channel pages, playlist pages) is currently unreliable. The `useDateGroups` composable groups items by `processedAt` (the date the AI pipeline processed the video), not by `metadata.publishedAt` (the YouTube publish date). Within each date group, items have no explicit sort order. This means recently published videos can appear in older groups if they were processed late, and the feed looks arbitrarily ordered.

This feature fixes the default ordering to use `metadata.publishedAt` (descending -- newest first) and adds a user-facing sort control so visitors can switch between sort options.

## Problem Statement / Motivation

- The current grouping key (`processedAt`) is an internal pipeline timestamp, not meaningful to users. A video published a week ago but processed today appears under "Today" instead of "This Week."
- There is no sort order applied within date groups -- items appear in whatever order `queryCollection().all()` returns them.
- Users have no way to change how content is ordered (e.g., alphabetically, oldest first).
- As the content library grows (currently hundreds of summaries), predictable ordering becomes increasingly important for discoverability.

## Proposed Solution

### 1. Fix default sort order (data layer)

Update `useDateGroups.ts` to:
- Accept a configurable date accessor (default: `metadata.publishedAt`, falling back to `processedAt`).
- Sort items within each group by the same date field, descending (newest first).

### 2. Add a `useSortOptions` composable

Create `src/composables/useSortOptions.ts` that:
- Defines sort option types: `publish-date-desc` (default), `publish-date-asc`, `processed-date-desc`, `title-asc`.
- Exposes a reactive `currentSort` ref.
- Provides a `sortItems(items)` function that applies the selected sort.
- Optionally persists the user's choice in `localStorage` or a URL query param (`?sort=title-asc`).

### 3. Add a `SortControl` UI component

Create `src/components/content/SortControl.vue`:
- A small dropdown or segmented control placed in page headers next to the item count.
- Renders the available sort options.
- Emits the selected sort value to the parent.
- Styled using CUBE CSS conventions and existing design tokens (`--color-base-*`, `--space-*`, `--step-*`).
- Uses the existing `ccmFormField` or a native `<select>` for simplicity (MVP).

### 4. Wire sort control into list pages

Update each page that renders `DateGroupedFeed`:
- `src/pages/index.vue` (homepage)
- `src/pages/tags/[slug].vue`
- `src/pages/channels/[slug].vue`
- `src/pages/playlists/[slug].vue`

Each page will:
- Import `useSortOptions` and `SortControl`.
- Place `<SortControl>` in the page header area.
- Pass sorted items to `useDateGroups` (or bypass date grouping when sorting alphabetically).

### 5. Adapt `DateGroupedFeed` for non-date sorts

When the sort mode is not date-based (e.g., alphabetical), `DateGroupedFeed` date headers become meaningless. Two options:
- **Option A (simpler):** Render a flat list without date group headers when sort is non-date.
- **Option B:** Create a separate `FlatFeed` component for non-date sorts.

Recommendation: **Option A** -- add a prop like `:show-headers="sortIsDateBased"` to `DateGroupedFeed`.

## Technical Considerations

### Architecture

- The sort logic lives in a composable (`useSortOptions`), keeping pages thin (per CLAUDE.md: "keep orchestration only, delegate UI to components").
- `useDateGroups` remains the grouping utility but becomes sort-aware. It should not own the sort state -- it receives pre-sorted items.
- `useContentStream` already supports `sort` options but the list pages don't use them. The new sort can be applied client-side after data is loaded (simpler, no re-fetch needed) since all items are already in memory.

### Date field availability

- `metadata.publishedAt` is present on all summaries (required by `videoMetadataSchema` in `content.config.ts`).
- `processedAt` is also always present (required field in the summaries schema).
- Both are ISO 8601 strings, sortable as strings or parsed via `new Date()`.

### Performance

- Client-side sorting of hundreds of items is negligible (sub-millisecond).
- No additional API calls or data fetching required.
- `computed` reactivity ensures sorting only recalculates when the sort option or data changes.

### URL state (optional enhancement)

- Persisting sort via query param (`?sort=publish-date-desc`) enables shareable sorted views and browser back/forward support.
- `useRoute().query.sort` + `router.replace()` is the Nuxt-idiomatic approach.
- Can be deferred to a follow-up if the MVP just uses local state.

## Acceptance Criteria

- [ ] Default sort order on all list pages is `metadata.publishedAt` descending (newest published first)
- [ ] `useDateGroups` groups items by `metadata.publishedAt` instead of `processedAt`
- [ ] Items within each date group are sorted by publish date (newest first)
- [ ] A sort control is visible in the page header on: homepage, tag page, channel page, playlist page
- [ ] Sort options include at minimum: "Newest first" (default), "Oldest first", "Title A-Z"
- [ ] Selecting a sort option updates the feed immediately without a page reload
- [ ] When sorting by title, date group headers are hidden or replaced with a flat list
- [ ] Sort control is keyboard accessible and styled consistently with existing design tokens
- [ ] Existing tests pass; new tests cover `useSortOptions` composable logic

## Files to Create

- `src/composables/useSortOptions.ts` -- sort state and sort logic
- `src/components/content/SortControl.vue` -- dropdown UI for sort selection

## Files to Modify

- `src/composables/useDateGroups.ts` -- change date accessor to `metadata.publishedAt`, add within-group sorting
- `src/pages/index.vue` -- integrate SortControl + useSortOptions
- `src/pages/tags/[slug].vue` -- integrate SortControl + useSortOptions
- `src/pages/channels/[slug].vue` -- integrate SortControl + useSortOptions
- `src/pages/playlists/[slug].vue` -- integrate SortControl + useSortOptions
- `src/components/content/DateGroupedFeed.vue` -- support hiding headers for non-date sorts

## MVP

### src/composables/useSortOptions.ts

```typescript
import { ref, computed, type Ref } from 'vue'

export type SortKey = 'publish-date-desc' | 'publish-date-asc' | 'processed-date-desc' | 'title-asc'

export interface SortOption {
  key: SortKey
  label: string
}

export const SORT_OPTIONS: SortOption[] = [
  { key: 'publish-date-desc', label: 'Newest first' },
  { key: 'publish-date-asc', label: 'Oldest first' },
  { key: 'title-asc', label: 'Title A–Z' },
  { key: 'processed-date-desc', label: 'Recently processed' }
]

export function useSortOptions(items: Ref<any[]>, defaultSort: SortKey = 'publish-date-desc') {
  const currentSort = ref<SortKey>(defaultSort)

  const isDateSort = computed(() =>
    currentSort.value.startsWith('publish-date') || currentSort.value === 'processed-date-desc'
  )

  const sorted = computed(() => {
    const list = [...items.value]
    switch (currentSort.value) {
      case 'publish-date-desc':
        return list.sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
      case 'publish-date-asc':
        return list.sort((a, b) => new Date(a.metadata.publishedAt).getTime() - new Date(b.metadata.publishedAt).getTime())
      case 'processed-date-desc':
        return list.sort((a, b) => new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime())
      case 'title-asc':
        return list.sort((a, b) => (a.metadata.title || '').localeCompare(b.metadata.title || ''))
      default:
        return list
    }
  })

  return { currentSort, sorted, isDateSort, sortOptions: SORT_OPTIONS }
}
```

### src/components/content/SortControl.vue

```vue
<script setup lang="ts">
import { SORT_OPTIONS, type SortKey } from '~/composables/useSortOptions'

const model = defineModel<SortKey>({ required: true })
</script>

<template>
  <div class="sort-control">
    <label for="sort-select" class="sort-control__label">Sort by</label>
    <select id="sort-select" v-model="model" class="sort-control__select">
      <option v-for="opt in SORT_OPTIONS" :key="opt.key" :value="opt.key">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.sort-control {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs, 0.5rem);
}

.sort-control__label {
  font-size: var(--step--1, 0.875rem);
  color: var(--color-base-shade-10, #6b7280);
}

.sort-control__select {
  font-size: var(--step--1, 0.875rem);
  padding: var(--space-3xs, 0.125rem) var(--space-xs, 0.5rem);
  border: 1px solid var(--color-base-tint-10, #e5e7eb);
  border-radius: 6px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #374151);
  cursor: pointer;
}
</style>
```

## Success Metrics

- Users see content ordered by YouTube publish date by default on all list pages.
- Sort preference is easy to discover and use without documentation.
- No performance regression on page load.

## Dependencies & Risks

- **Low risk:** All required date fields (`metadata.publishedAt`, `processedAt`) are already present in the content schema and every summary file.
- **Low risk:** `date-fns` is already a dependency, available for any date parsing needs.
- **Design decision needed:** Whether to persist sort choice in URL query params or just use local state. URL params are better for shareability but add minor complexity.
- **Edge case:** Tag pages load summaries via `useTagIndex` (a different data path than `useContentStream`). The sort composable must work with both data sources since it operates on the final array, not the query.

## Sources & References

### Internal References

- Content schema: `content.config.ts` (defines `metadata.publishedAt` and `processedAt`)
- Date grouping: `src/composables/useDateGroups.ts`
- Content stream: `src/composables/useContentStream.ts` (has existing sort infrastructure)
- Tag data loading: `src/composables/useTagIndex.ts`
- Feed component: `src/components/content/DateGroupedFeed.vue`
- Summary card: `src/components/content/SummaryCard.vue` (already displays `publishedAt`)

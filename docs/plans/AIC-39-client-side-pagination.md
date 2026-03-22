# AIC-39: Client-Side Pagination for Summary List Views

## Problem

With 500+ summaries, all four list views (`/summaries`, `/channels/[slug]`, `/playlists/[slug]`, `/tags/[slug]`) freeze the browser by rendering the full list at once. We need a "Load More" button pattern that caps the initial render at 20-30 items and progressively reveals more.

## Architecture Overview

All four pages follow the same data flow:

```
source items (Ref<T[]>)
  -> useSortedFeed(items)
    -> useSortOptions(items) -> sorted (ComputedRef<T[]>)
    -> useDateGroups(sorted) -> segments (ComputedRef<DateSegment<T>[]>)
    -> feedSegments (ComputedRef<FeedSegment<T>[]>)
  -> <DateGroupedFeed :segments="feedSegments" :show-headers="isDateSort" />
```

The pagination layer must sit **between** the sorted flat list and the date-grouping step so that `DateGroupedFeed` only receives the visible slice and date headers remain correct across batches.

## Implementation Plan

### Step 1: Create `usePagination` composable

**File:** `src/composables/usePagination.ts`

```ts
interface UsePaginationOptions {
  pageSize?: number    // default 25
}

interface UsePaginationReturn<T> {
  /** The visible slice of items (first N of source) */
  visibleItems: ComputedRef<T[]>
  /** Whether there are more items to show */
  hasMore: ComputedRef<boolean>
  /** Number of items currently visible */
  visibleCount: ComputedRef<number>
  /** Total number of items in source */
  totalCount: ComputedRef<number>
  /** Load the next batch */
  loadMore: () => void
  /** Reset to first page (call when source identity changes) */
  reset: () => void
}

function usePagination<T>(
  items: Ref<T[]> | ComputedRef<T[]>,
  options?: UsePaginationOptions
): UsePaginationReturn<T>
```

**Behavior:**

- Maintains a reactive `limit` ref initialized to `pageSize` (default 25).
- `visibleItems` = `computed(() => items.value.slice(0, limit.value))`.
- `loadMore()` increments `limit` by `pageSize`.
- `hasMore` = `computed(() => limit.value < items.value.length)`.
- `reset()` sets `limit` back to `pageSize`. A `watch` on `items` length/identity resets automatically when the source list changes (sort change, filter change, navigation).

**Reset behavior detail:** Watch `() => items.value` (by reference) and `() => items.value.length`. When either changes, call `reset()`. This handles:
- Sort option changes (useSortOptions returns a new sorted array)
- Category filter changes on `/summaries`
- Route navigation between channels/tags/playlists

### Step 2: Integrate pagination into `useSortedFeed`

**File:** `src/composables/useSortedFeed.ts`

Modify `useSortedFeed` to accept an optional pagination config and compose with `usePagination` internally. This keeps the page-level integration minimal.

```ts
export interface UseSortedFeedOptions {
  pageSize?: number  // undefined = no pagination (backwards compatible)
}

export interface UseSortedFeedReturn<T extends Sortable> {
  // ... existing fields ...
  /** Pagination controls (only present when pageSize is set) */
  hasMore: ComputedRef<boolean>
  visibleCount: ComputedRef<number>
  totalCount: ComputedRef<number>
  loadMore: () => void
}
```

**Changes to `useSortedFeed`:**

1. Accept `options?: UseSortedFeedOptions` as a third parameter.
2. When `options.pageSize` is set, wrap `sorted` through `usePagination` before passing to `useDateGroups`.
3. Pass `paginatedItems` (or `sorted` if no pagination) to `useDateGroups`.
4. The non-date-sort branch (flat list in single segment) also uses the paginated slice.
5. Return pagination fields alongside existing fields.

```ts
export function useSortedFeed<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort?: SortKey,
  options?: UseSortedFeedOptions
): UseSortedFeedReturn<T> {
  const { currentSort, sorted, isDateSort, currentSortLabel, sortOptions } = useSortOptions(items, defaultSort)

  // Pagination layer (optional)
  const pagination = options?.pageSize
    ? usePagination(sorted, { pageSize: options.pageSize })
    : null

  const displayItems = pagination ? pagination.visibleItems : sorted

  // Date grouping operates on the paginated slice
  const dateSortDirection = computed(() =>
    currentSort.value === 'publish-date-asc' ? 'asc' as const : 'desc' as const
  )

  const { segments } = useDateGroups(
    computed(() => isDateSort.value ? displayItems.value : []),
    undefined,
    dateSortDirection
  )

  const feedSegments = computed<FeedSegment<T>[]>(() =>
    isDateSort.value
      ? segments.value
      : displayItems.value.length > 0
        ? [{ key: 'older' as const, label: '', items: displayItems.value }]
        : []
  )

  return {
    feedSegments,
    currentSort,
    currentSortLabel,
    isDateSort,
    sortOptions,
    hasMore: pagination ? pagination.hasMore : computed(() => false),
    visibleCount: pagination ? pagination.visibleCount : computed(() => sorted.value.length),
    totalCount: computed(() => sorted.value.length),
    loadMore: pagination ? pagination.loadMore : () => {},
  }
}
```

### Step 3: Create `LoadMoreButton` component

**File:** `src/components/content/LoadMoreButton.vue`

A simple, accessible button shown below the feed.

```vue
<script setup lang="ts">
defineProps<{
  visibleCount: number
  totalCount: number
}>()

defineEmits<{
  loadMore: []
}>()
</script>

<template>
  <div class="flex justify-center py-8">
    <Button
      variant="outline"
      size="lg"
      @click="$emit('loadMore')"
    >
      Load More
      <span class="ml-1.5 text-muted-foreground text-sm">
        (showing {{ visibleCount }} of {{ totalCount }})
      </span>
    </Button>
  </div>
</template>
```

### Step 4: Update `DateGroupedFeed` to support Load More

**File:** `src/components/content/DateGroupedFeed.vue`

Add optional pagination props and render `LoadMoreButton` below the feed when `hasMore` is true.

```vue
<script setup lang="ts">
const props = defineProps<{
  segments: DateSegment<Sortable>[]
  showHeaders?: boolean
  // Pagination (optional)
  hasMore?: boolean
  visibleCount?: number
  totalCount?: number
}>()

const emit = defineEmits<{
  loadMore: []
}>()
</script>
```

Add at the bottom of the template, after the existing content:

```vue
<LoadMoreButton
  v-if="hasMore"
  :visible-count="visibleCount ?? 0"
  :total-count="totalCount ?? 0"
  @load-more="$emit('loadMore')"
/>
```

This keeps `DateGroupedFeed` backwards compatible -- existing consumers that don't pass pagination props see no change.

### Step 5: Update all four page views

Each page passes the pagination props through to `DateGroupedFeed`. The changes are minimal since `useSortedFeed` handles the composition internally.

**Pattern for each page:**

```ts
// Before
const { feedSegments, currentSort, isDateSort, currentSortLabel } = useSortedFeed(items)

// After
const { feedSegments, currentSort, isDateSort, currentSortLabel, hasMore, visibleCount, totalCount, loadMore } = useSortedFeed(items, undefined, { pageSize: 25 })
```

```vue
<!-- Before -->
<DateGroupedFeed :segments="feedSegments" :show-headers="isDateSort" />

<!-- After -->
<DateGroupedFeed
  :segments="feedSegments"
  :show-headers="isDateSort"
  :has-more="hasMore"
  :visible-count="visibleCount"
  :total-count="totalCount"
  @load-more="loadMore"
/>
```

**Pages to update:**

| Page | File | Notes |
|------|------|-------|
| All Summaries | `src/pages/summaries/index.vue` | Also update displayed count to use `visibleCount`/`totalCount` |
| Channel | `src/pages/channels/[slug].vue` | Straightforward |
| Playlist | `src/pages/playlists/[slug].vue` | Straightforward |
| Tag | `src/pages/tags/[slug].vue` | Straightforward |

**Special consideration for `/summaries`:** The page header shows `filteredCount` which is the total matching items. This should continue showing the total (not the paginated count). The "showing X of Y" text in the Load More button handles the pagination visibility. No changes needed to the header count.

### Step 6: Tests

**File:** `src/tests/composables/usePagination.test.ts`

Test cases:
- Initial render shows `pageSize` items
- `loadMore()` reveals next batch
- `hasMore` is false when all items visible
- Auto-resets when source array changes (simulating sort/filter change)
- Works with empty arrays
- Works when source has fewer items than `pageSize`
- `loadMore()` is a no-op when `hasMore` is false

**File:** `src/tests/composables/useSortedFeed.test.ts` (extend existing if present)

Test cases:
- With `pageSize` option, `feedSegments` only contains first N items
- Date headers are correct for the paginated slice
- After `loadMore()`, new items appear in correct date groups
- Sort change resets pagination to first page

## Edge Cases

### Date headers across batches
When paginating a date-sorted list, the paginated slice is grouped by `useDateGroups`. If the first 25 items span "Today" (5) + "Yesterday" (10) + "This Week" (10), those headers render correctly. When the user clicks "Load More" and the next 25 items include more "This Week" + "Last Week" items, the regrouping happens on the full visible slice (items 1-50), so "This Week" grows and headers remain accurate. This works because `useDateGroups` recomputes on every change to its input.

### Non-date sorts (Title A-Z)
The flat list path (single segment, no headers) also uses the paginated slice. Load More works identically.

### Search mode on `/summaries`
Search results bypass `DateGroupedFeed` entirely (rendered inline). Pagination does not apply to search results. No changes needed.

### Small lists
If a channel/tag/playlist has fewer than `pageSize` items, `hasMore` is `false` and the button never renders. No visual change.

## File Checklist

| Action | File |
|--------|------|
| Create | `src/composables/usePagination.ts` |
| Modify | `src/composables/useSortedFeed.ts` |
| Create | `src/components/content/LoadMoreButton.vue` |
| Modify | `src/components/content/DateGroupedFeed.vue` |
| Modify | `src/pages/summaries/index.vue` |
| Modify | `src/pages/channels/[slug].vue` |
| Modify | `src/pages/playlists/[slug].vue` |
| Modify | `src/pages/tags/[slug].vue` |
| Create | `src/tests/composables/usePagination.test.ts` |

## Open Questions

1. **Page size value:** Plan uses 25. The issue says 20-30. Should all views use the same page size, or should `/summaries` (which can have 500+) use a larger batch than channel/tag pages?

2. **Scroll-to-anchor after Load More:** Should clicking "Load More" keep the user's scroll position (default browser behavior -- new items appear below), or should it scroll to the first newly loaded item? Default (no scroll manipulation) is likely fine.

3. **Loading indicator on Load More:** Since this is client-side slicing (not a network request), `loadMore()` is synchronous and instant. No spinner needed. But if pagination ever becomes server-side, the button would need a loading state. Worth adding a `loading` prop to `LoadMoreButton` now for future-proofing?

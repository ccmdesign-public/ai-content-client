# AIC-39: Client-Side Pagination for Summary List Views

## Enhancement Summary

**Deepened on:** 2026-03-21
**Sections enhanced:** 7 (composable, integration, component, page views, tests, edge cases, open questions)
**Research sources:** Vue 3 official docs (reactivity, performance), Context7 Vue documentation, WCAG accessibility guidance, UX Patterns for Developers, shadcn-vue migration learnings, existing codebase analysis

### Key Improvements
1. Accessibility hardening: `aria-live` announcements, focus management after load, `aria-controls` linking button to content region
2. Performance guardrails: `shallowRef` consideration for `limit`, watch cleanup to prevent stale watchers on unmount, debounce guidance for rapid clicks
3. Reset watch refinement: use `watch(() => items.value, reset, { flush: 'sync' })` instead of dual watch on reference + length to avoid double-reset race
4. Expanded test matrix: 5 new test scenarios covering rapid successive loads, boundary pagination (exactly pageSize items), and reset-during-load-more interaction
5. Resolved all 3 open questions with concrete recommendations grounded in codebase analysis

### New Considerations Discovered
- `DateGroupedFeed` hardcodes `<SummaryCard>` -- pagination props pass through but the component is not truly generic; future reuse for articles would require a slot or render prop
- The `visually-hidden` class used on channels/tags pages is non-standard (should be `sr-only` per Tailwind convention); summaries page already uses `sr-only` -- inconsistency to fix during this PR
- Watch reset on `items.value` by reference may fire spuriously if `useSortOptions.sorted` recomputes the same logical array (same elements, new object) due to sort stability -- mitigate with a length+first-item guard

---

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

### Research Insights

**Best Practices:**
- Placing pagination between sort and grouping is the correct architectural choice -- it keeps date headers accurate because `useDateGroups` recomputes on the visible slice, not the full dataset. This matches the "derived state" pattern recommended in Vue 3 composition API guides.
- The composable should be fully standalone (testable without DOM) and accept both `Ref<T[]>` and `ComputedRef<T[]>` for maximum reuse. The plan already does this correctly.

**Performance Considerations:**
- With 500 items, `Array.slice(0, limit)` is O(n) but negligible at this scale (sub-millisecond). No need for virtual scrolling or `shallowRef` on the source array at this dataset size.
- The `sorted` computed in `useSortOptions` already creates a new array on each sort change (`[...items.value].sort()`), which means `usePagination`'s watch on `items.value` by reference will correctly fire on sort changes without additional plumbing.
- Vue 3 computed refs are lazy-evaluated and cached -- chaining `sorted -> visibleItems -> useDateGroups` does not cause redundant recalculations.

**Codebase-Specific Finding:**
- `DateGroupedFeed.vue` currently hardcodes `<SummaryCard :summary="item" />` in its template. This means the component is not reusable for other content types (articles, newsletters). This is pre-existing and out of scope, but worth noting: if articles ever need the same pagination pattern, `DateGroupedFeed` will need a scoped slot or render prop refactor.

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

### Research Insights

**Watch Strategy Refinement:**
- Use a single watch on `() => items.value` by reference rather than watching both reference and length separately. Since `useSortOptions.sorted` always returns a new array (`[...items.value].sort()`), a reference watch is sufficient for sort changes. Watching length separately risks a double-reset on the same tick (new array + different length = two watch triggers).
- Use `{ flush: 'sync' }` on the reset watch so that the limit resets in the same synchronous tick as the source change, preventing a flash of stale paginated content.

```ts
// Recommended watch pattern
watch(() => items.value, () => {
  reset()
}, { flush: 'sync' })
```

**Guard Against Spurious Resets:**
- If the source array reference changes but the content is identical (e.g., a reactive dependency upstream recomputed but produced the same result), the watch will fire and reset pagination unnecessarily. For this codebase this is acceptable -- `useSortOptions.sorted` only recomputes when sort key or source items change, both of which warrant a reset. However, if future composables produce reference-unstable arrays, consider adding a guard:

```ts
// Optional guard for future-proofing (not needed for current codebase)
let lastLength = items.value.length
let lastFirst = items.value[0]
watch(() => items.value, (newItems) => {
  if (newItems.length !== lastLength || newItems[0] !== lastFirst) {
    reset()
  }
  lastLength = newItems.length
  lastFirst = newItems[0]
}, { flush: 'sync' })
```

**`loadMore()` Safety:**
- Cap `limit` at `items.value.length` to prevent the limit from growing unbounded if the user clicks rapidly. This avoids `visibleItems` requesting a slice beyond the array (which is safe in JS but semantically unclear):

```ts
function loadMore() {
  if (hasMore.value) {
    limit.value = Math.min(limit.value + pageSize, items.value.length)
  }
}
```

**Edge Case -- Source Shrinks:**
- If the source array shrinks (e.g., filter applied) to fewer items than the current `limit`, the reset watch handles this. But if the source shrinks without changing reference (mutation in place -- unlikely given computed patterns), `visibleItems` would still show `slice(0, limit)` which safely returns fewer items. No bug, but worth documenting in a code comment.

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

### Research Insights

**Backwards Compatibility:**
- The existing `useSortedFeed` tests in `src/tests/composables/useSortedFeed.test.ts` (11 test cases) call `useSortedFeed(items)` and `useSortedFeed(items, 'title-asc')` without a third parameter. These must continue to pass unchanged. The optional third parameter and no-op pagination fallbacks (`computed(() => false)`, `() => {}`) ensure this.

**Type Safety:**
- The return type always includes pagination fields (even when pagination is disabled) to keep the destructuring pattern consistent across pages. This is a deliberate tradeoff: slightly wider type vs. simpler page-level code. The no-op values (`hasMore: false`, `loadMore: noop`) are safe to pass as props even when unused.

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

### Research Insights

**Accessibility Enhancements (WCAG 2.2 Compliance):**

The current plan's button is functional but missing several accessibility features. Recommended additions:

1. **`aria-controls` linking button to content region:** The Load More button should reference the content region it controls. Add an `id` to the feed container (e.g., `id="feed-content"`) and `aria-controls="feed-content"` on the button. This tells assistive technologies which region will change.

2. **Screen reader announcement after load:** After clicking Load More, screen reader users have no indication that new content appeared. Add an `aria-live="polite"` region that announces "Showing X of Y items" after each load. This region should already exist on the page (not dynamically added):

```vue
<template>
  <div class="flex justify-center py-8">
    <Button
      variant="outline"
      size="lg"
      aria-controls="feed-content"
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

3. **Focus management decision:** WCAG guidance recommends moving focus to the first newly loaded item after Load More is clicked. However, for this codebase where Load More is synchronous (client-side slice, not a network request), the default browser behavior (button stays focused, new items appear above it in the DOM, scroll position preserved) is actually the better UX. The user can continue clicking Load More without losing their place. Moving focus would be jarring for sighted keyboard users. **Recommendation: keep default focus behavior (no focus manipulation).**

4. **Button removal when exhausted:** When `hasMore` becomes false, the button disappears entirely (via `v-if`). This is correct -- no need for a "No more items" state since the "showing X of Y" count already communicates completeness when visibleCount equals totalCount during the last visible state.

**Future-Proofing:**
- Add a `loading` prop (default `false`) to `LoadMoreButton` now, even though client-side slicing is synchronous. If pagination ever becomes server-side, this prop enables a spinner without changing the component API. The Button component from shadcn-vue already supports a `disabled` state:

```vue
<script setup lang="ts">
defineProps<{
  visibleCount: number
  totalCount: number
  loading?: boolean
}>()
</script>

<!-- In template -->
<Button
  variant="outline"
  size="lg"
  :disabled="loading"
  @click="$emit('loadMore')"
>
  <template v-if="loading">Loading...</template>
  <template v-else>Load More</template>
  ...
</Button>
```

**Styling Consistency:**
- The `Button` component is auto-imported from `src/components/ui/button/`. No manual import needed (Nuxt auto-imports).
- Use `transition-opacity` if adding any loading fade, never `transition-all` (per CLAUDE.md styling rules).

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

### Research Insights

**Existing Code Analysis:**
- `DateGroupedFeed.vue` currently has an unused import cleanup applied (from PR #13, documented in `docs/solutions/ui-bugs/shadcn-vue-migration-review-patterns.md`). The component is clean and adding props/emits is straightforward.
- The component uses `computed(() => props.segments.flatMap(s => s.items))` for the flat (non-date-sort) rendering path. This computed will naturally react to pagination changes since `segments` is a prop bound to the paginated `feedSegments`.

**`aria-live` Region Placement:**
- Add an `aria-live="polite"` region inside `DateGroupedFeed` to announce item count changes. This region must be present in the DOM on initial render (not dynamically added) for assistive technologies to track it:

```vue
<!-- Add inside DateGroupedFeed template, before the LoadMoreButton -->
<p class="sr-only" aria-live="polite" aria-atomic="true">
  Showing {{ visibleCount ?? 0 }} of {{ totalCount ?? 0 }} items
</p>
```

**Feed Container `id`:**
- Add `id="feed-content"` to the root `<div>` of `DateGroupedFeed` so that `LoadMoreButton`'s `aria-controls` can reference it. Since only one `DateGroupedFeed` renders per page, the static ID is safe (no duplication risk).

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

### Research Insights

**Page-Specific Implementation Notes:**

1. **`/summaries` (index.vue):** This page has the most complex state: `useSummariesFilter` produces `filteredSummaries`, which feeds into `useSortedFeed`. The `filteredCount` in the header must remain the total matching filter count (not paginated). The plan correctly identifies this. Additionally, the `displayedCount` computed (line 60-62) is used for search results count -- it should not be affected by pagination since search bypasses `DateGroupedFeed` entirely.

2. **`/channels/[slug].vue`:** The header shows `summaries.length` for the video count. This should remain the total channel count, not the paginated count. No change needed since `summaries` is the unfiltered source ref.

3. **`/playlists/[slug].vue`:** Uses `summaries?.length || 0` in the header. Same as channels -- no change needed. Note: this page uses `throw createError()` for 404, which means all composable calls must happen before the throw. The `useSortedFeed` call with the new options parameter is already before the throw in the current code -- no ordering issue.

4. **`/tags/[slug].vue`:** Uses `summaryItemCount` from `useTagIndex` for the header count. This is a separate value from the `items` ref fed to `useSortedFeed`, so pagination does not affect it. No change needed.

**Inconsistency to Fix:**
- `channels/[slug].vue` and `tags/[slug].vue` use `class="visually-hidden"` for the sort announcement, while `summaries/index.vue` and `playlists/[slug].vue` use `class="sr-only"`. The Tailwind convention is `sr-only`. Normalize all four pages to `sr-only` during this PR (minor drive-by fix, per CLAUDE.md guidance to "migrate opportunistically when touching affected files").

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

### Research Insights

**Additional Test Cases (from edge case analysis):**

For `usePagination.test.ts`:
- **Rapid successive loads:** Call `loadMore()` multiple times in the same tick. Verify `limit` increments correctly and `visibleItems` reflects the final value.
- **Exact boundary:** Source has exactly `pageSize` items. `hasMore` should be `false` on initial render (all items visible). `loadMore()` should be a no-op.
- **Source shrinks below current limit:** Set limit to 50 (via 2x loadMore), then replace source with a 10-item array. Verify `visibleItems` shows all 10 items and `hasMore` is false.
- **Source grows:** Start with 30 items (limit 25, hasMore true). Replace source with 60 items. Verify reset fires and limit returns to 25.
- **`reset()` called explicitly:** Verify it sets limit back to pageSize regardless of current value.

For `useSortedFeed.test.ts`:
- **Pagination disabled (no options):** Verify existing tests still pass and `hasMore` returns `false`, `loadMore` is a no-op. This is a regression guard.
- **Pagination + sort change:** Set pageSize 2 with 5 items. Load more to show 4. Change sort. Verify feedSegments shows only 2 items (reset occurred).

**Test Infrastructure:**
- The existing `useSortedFeed.test.ts` uses a `makeSortable()` factory function. Reuse this pattern in `usePagination.test.ts` for consistency.
- Tests use `ref()` and `nextTick()` from Vue -- no DOM mocking needed since composables are pure reactive functions.

## Edge Cases

### Date headers across batches
When paginating a date-sorted list, the paginated slice is grouped by `useDateGroups`. If the first 25 items span "Today" (5) + "Yesterday" (10) + "This Week" (10), those headers render correctly. When the user clicks "Load More" and the next 25 items include more "This Week" + "Last Week" items, the regrouping happens on the full visible slice (items 1-50), so "This Week" grows and headers remain accurate. This works because `useDateGroups` recomputes on every change to its input.

### Non-date sorts (Title A-Z)
The flat list path (single segment, no headers) also uses the paginated slice. Load More works identically.

### Search mode on `/summaries`
Search results bypass `DateGroupedFeed` entirely (rendered inline). Pagination does not apply to search results. No changes needed.

### Small lists
If a channel/tag/playlist has fewer than `pageSize` items, `hasMore` is `false` and the button never renders. No visual change.

### Research Insights -- Additional Edge Cases Discovered

**URL Sort Query Param + Pagination Reset:**
- `useSortOptions` reads `?sort=` from the URL on mount and syncs sort changes back to the URL via `router.replace()`. When a user navigates to `/summaries?sort=title-asc`, the sort initializes to `title-asc` and the pagination should start at page 1. This works correctly because `usePagination` watches `sorted` (which depends on `currentSort`), so any initial sort value produces the correct first page. No additional handling needed.

**Browser Back/Forward Navigation:**
- When the user navigates away from `/summaries` and returns via the browser back button, Nuxt's `<KeepAlive>` behavior (if enabled) could preserve the pagination state. In this codebase, pages do not use `<KeepAlive>`, so the component remounts and pagination resets naturally. If `<KeepAlive>` is added in the future, the pagination state would persist across navigations, which is actually desirable UX.

**Category Filter + Pagination on `/summaries`:**
- When the user has loaded 75 items (3 pages) and then changes the category filter, `filteredSummaries` produces a new array reference, which triggers `usePagination`'s reset watch. The pagination correctly resets to page 1 of the new filtered set. This is the expected behavior.

**SSR Hydration:**
- The `limit` ref initializes to `pageSize` (25) on both server and client. Since the sorted items come from `useContentStream` (which uses `useAsyncData` internally), the SSR render and client hydration will produce the same initial slice of 25 items. No hydration mismatch risk.

**Processed Date Sort Grouping Mismatch:**
- The existing `useSortedFeed` has a documented mismatch (P2-009): when sorting by `processed-date-desc`, items are sorted by `processedAt` but grouped by `publishedAt`. Pagination does not change this behavior -- it simply slices the sorted array before grouping. The mismatch persists but is not worsened. Adding pagination to this sort mode works correctly.

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

## Open Questions -- Resolved

### 1. Page size value
**Resolution: Use 25 for all four views.**

All four pages render the same `SummaryCard` component with the same visual density. Using different page sizes per view would create inconsistent UX (user builds an expectation of batch size). 25 is within the 20-30 range specified in the issue and provides a good balance: large enough to feel substantial, small enough to render instantly. If `/summaries` later needs a different size, the `pageSize` option is per-call, so it can be changed independently without affecting other views.

### 2. Scroll-to-anchor after Load More
**Resolution: No scroll manipulation. Keep default browser behavior.**

Since Load More is synchronous (client-side slice), the button stays in the viewport and new items appear above it. The user can continue clicking without scroll disruption. WCAG guidance on Load More focus management recommends moving focus to new content for async loads (where a delay separates action from result), but for instant loads the default is preferable. If this ever becomes server-side (async), revisit focus management at that time.

### 3. Loading indicator on Load More
**Resolution: Add a `loading` prop to `LoadMoreButton` with default `false`. Do not use it in this PR.**

The prop costs nothing (one boolean prop, one `v-if` in template) and future-proofs the component for server-side pagination without API changes. The four page views will not pass `loading` in this PR. If server-side pagination is added later, the button API is already ready.

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Watch reset fires on every computed recomputation, causing pagination flicker | Low | Medium | `useSortOptions.sorted` only recomputes when inputs change; test with rapid sort toggling |
| Existing `useSortedFeed` tests break due to new return fields | Very Low | Low | New fields have safe defaults (`hasMore: false`, `loadMore: noop`); tests destructure only what they need |
| `DateGroupedFeed` prop additions cause TypeScript errors in existing consumers | Very Low | Low | All new props are optional (`?` suffix) |
| `visually-hidden` vs `sr-only` inconsistency causes a11y regression during normalization | Very Low | Low | Both classes achieve the same visual hiding; `sr-only` is Tailwind-native and already in use on other pages |

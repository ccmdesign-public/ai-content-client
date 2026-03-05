---
title: "feat: Add sorting feature with publish date as default sort order"
type: feat
status: active
date: 2026-03-05
---

# feat: Add sorting feature with publish date as default sort order

## Enhancement Summary

**Deepened on:** 2026-03-05
**Sections enhanced:** 7
**Research sources:** Vue 3 docs (Context7), WCAG accessibility guidelines, Vue best practices skill, Nuxt Content skill, accessibility skill, UX writing skill, presentation-logic-split skill, architecture-strategist agent, kieran-typescript-reviewer agent, code-simplicity-reviewer agent, performance-oracle agent, julik-frontend-races-reviewer agent, pattern-recognition-specialist agent

### Key Improvements
1. Added type safety recommendations: replace `any[]` with a generic type parameter on `useSortOptions` to satisfy strict TypeScript review standards
2. Added null/undefined guard for `localeCompare` in title sort to prevent runtime crashes on malformed data
3. Added WCAG-compliant accessibility enhancements for `SortControl` including `aria-live` region for sort change announcements
4. Added `useDateGroups` within-group sorting implementation detail using the configurable date accessor pattern
5. Identified SSR hydration edge case when using `useRoute().query` for sort persistence on initial render

### New Risks & Edge Cases Discovered
- `localeCompare` on `null`/`undefined` `metadata.title` will throw a TypeError -- must guard with nullish coalescing
- Hardcoded `id="sort-select"` in `SortControl.vue` will cause duplicate IDs when multiple instances render on the same page (e.g., future layout changes) -- use `useId()` or scoped IDs
- Playlist page calls `throw createError()` synchronously at setup time before data loads, meaning `useSortOptions` cannot be conditionally composed -- sort must be wired after data is available
- `useDateGroups` generic constraint `T extends { processedAt: string }` must be widened to also require `metadata.publishedAt` for the new default accessor
- URL query param persistence (`?sort=`) must validate against the `SortKey` union on hydration to prevent invalid sort state from a tampered URL

---

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

#### Research Insights

**Best Practices (Vue Composables):**
- The date accessor should be a function parameter with a sensible default, not a hardcoded property path. This follows the composable pattern of accepting configuration via options objects.
- Keep the grouping logic pure: `useDateGroups` should receive pre-sorted items and only handle grouping + within-group ordering. The global sort order is owned by `useSortOptions`.

**Implementation Detail -- Configurable Accessor:**
```typescript
// Signature change: accept a date accessor function
export function useDateGroups<T extends { processedAt: string; metadata: { publishedAt: string } }>(
  items: Ref<T[]>,
  dateAccessor: (item: T) => string = (item) => item.metadata.publishedAt || item.processedAt
) {
  // Inside the computed, use dateAccessor(item) instead of item.processedAt
  // Also sort within each group:
  // groups.get(group)!.sort((a, b) =>
  //   new Date(dateAccessor(b)).getTime() - new Date(dateAccessor(a)).getTime()
  // )
}
```

**Edge Cases:**
- If `metadata.publishedAt` is an empty string (schema says required, but defensively), the `new Date('')` returns `Invalid Date`. Guard with: `const ts = new Date(dateStr); if (isNaN(ts.getTime())) return 'older'`.
- The generic constraint must be widened from `T extends { processedAt: string }` to include `metadata.publishedAt` to satisfy TypeScript strict mode.

### 2. Add a `useSortOptions` composable

Create `src/composables/useSortOptions.ts` that:
- Defines sort option types: `publish-date-desc` (default), `publish-date-asc`, `processed-date-desc`, `title-asc`.
- Exposes a reactive `currentSort` ref.
- Provides a `sortItems(items)` function that applies the selected sort.
- Optionally persists the user's choice in `localStorage` or a URL query param (`?sort=title-asc`).

#### Research Insights

**Type Safety (Kieran TypeScript Reviewer):**
- Replace `Ref<any[]>` with a generic type parameter. Using `any` violates strict TypeScript conventions and hides potential property access errors.
- Use a discriminated union or `satisfies` operator for the sort options array to ensure exhaustive switch coverage.
- The `SortKey` type should use `as const` satisfies pattern for compile-time exhaustiveness checking.

**Improved Signature:**
```typescript
export interface Sortable {
  processedAt: string
  metadata: {
    publishedAt: string
    title: string
  }
}

export function useSortOptions<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort: SortKey = 'publish-date-desc'
)
```

**Null Safety for localeCompare (Critical Bug Fix):**
```typescript
// BEFORE (will throw on null/undefined title):
(a.metadata.title || '').localeCompare(b.metadata.title || '')

// AFTER (safe):
(a.metadata?.title ?? '').localeCompare(b.metadata?.title ?? '', undefined, { sensitivity: 'base' })
```

The `sensitivity: 'base'` option makes the sort case-insensitive, which is the expected UX behavior for alphabetical sorting (users expect "aws" and "AWS" to sort together).

**Stable Sort Guarantee:**
JavaScript's `Array.prototype.sort` is guaranteed stable in all modern engines (ES2019+). No polyfill needed for the target browser matrix of a Nuxt 3/4 app.

**Computed vs. Method:**
The `sorted` computed is correct -- it will only recalculate when `items.value` or `currentSort.value` changes. This is optimal per Vue reactivity best practices (derive everything possible with `computed`).

**YAGNI Check (Code Simplicity Reviewer):**
- The four sort options are sufficient for MVP. Resist adding "Title Z-A" or "Channel name" sorts until users request them.
- The `processed-date-desc` option is borderline YAGNI for end users but is useful for content operators. Keep it but consider hiding it behind a "More options" disclosure if the options list grows.

### 3. Add a `SortControl` UI component

Create `src/components/content/SortControl.vue`:
- A small dropdown or segmented control placed in page headers next to the item count.
- Renders the available sort options.
- Emits the selected sort value to the parent.
- Styled using CUBE CSS conventions and existing design tokens (`--color-base-*`, `--space-*`, `--step-*`).
- Uses the existing `ccmFormField` or a native `<select>` for simplicity (MVP).

#### Research Insights

**Accessibility (WCAG 2.1 Compliance -- Critical):**
- The native `<select>` element is the correct choice for MVP. It provides built-in keyboard navigation, screen reader support, and focus management without any ARIA overhead. This aligns with the first rule of ARIA: do not use ARIA if native HTML suffices.
- The `<label>` must be explicitly associated via `for`/`id` attributes (already done in the plan).
- **Duplicate ID bug:** The hardcoded `id="sort-select"` will break if two `SortControl` instances render on the same page. Use Vue 3.5's `useId()` composable to generate unique IDs:

```vue
<script setup lang="ts">
import { useId } from 'vue'
import { SORT_OPTIONS, type SortKey } from '~/composables/useSortOptions'

const model = defineModel<SortKey>({ required: true })
const selectId = useId()
</script>

<template>
  <div class="sort-control">
    <label :for="selectId" class="sort-control__label">Sort by</label>
    <select :id="selectId" v-model="model" class="sort-control__select">
      <option v-for="opt in SORT_OPTIONS" :key="opt.key" :value="opt.key">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
```

- **Screen reader announcement:** When the sort changes, the feed re-renders but screen readers don't know why. Add an `aria-live="polite"` region near the feed that announces the change:

```html
<p class="visually-hidden" aria-live="polite">
  Sorted by {{ currentSortLabel }}
</p>
```

- **Focus visible:** Add `:focus-visible` styles for the `<select>` element to ensure keyboard users see a clear focus ring:

```css
.sort-control__select:focus-visible {
  outline: 2px solid var(--color-primary, #2563eb);
  outline-offset: 2px;
}
```

- **Touch target size:** The `<select>` padding in the MVP code (`0.125rem 0.5rem`) produces a touch target well under the 44x44px WCAG minimum. Increase vertical padding to at least `0.5rem`:

```css
.sort-control__select {
  padding: var(--space-2xs, 0.375rem) var(--space-xs, 0.5rem);
  min-height: 44px; /* WCAG touch target minimum */
}
```

**UX Writing (Label & Option Text):**
- "Sort by" as a label is clear and concise (2 words, 7 characters) -- well within the 15-character button/label benchmark.
- Option labels ("Newest first", "Oldest first", "Title A-Z") are good: they describe the result, not the mechanism. Avoid technical labels like "Descending by publishedAt".
- "Recently processed" may confuse end users who don't know what "processed" means. Consider "Recently added" as a more user-friendly label.

**Presentation/Logic Split (Skill Compliance):**
- `SortControl.vue` is correctly a presentation-only component. It receives state via `defineModel` and emits changes. It has no composable imports or API calls. This is the correct pattern.
- The SORT_OPTIONS import is acceptable in the presentation component since it's a static constant (not reactive state or side effects).

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

#### Research Insights

**Architecture (Architecture Strategist):**
- The composable-in-page pattern is correct. Each page acts as a thin orchestration layer (per CLAUDE.md: "keep orchestration only, delegate UI to components").
- Data flow is clean: `useContentStream` -> `useSortOptions(data)` -> `useDateGroups(sorted)` -> `DateGroupedFeed`. Each composable has a single responsibility.
- There is some unavoidable repetition across the four pages (importing the composable, wiring the sort control). This is acceptable per the "duplication > complexity" principle -- extracting a shared page mixin or layout wrapper would add indirection without meaningful benefit for four pages.

**Page-Specific Wiring Considerations:**

**Homepage (`index.vue`):**
```vue
const { data: summaries, pending } = useContentStream('summaries')
const { currentSort, sorted, isDateSort } = useSortOptions(computed(() => summaries.value || []))
const { segments } = useDateGroups(sorted)
```

**Tag page (`tags/[slug].vue`):**
- Uses `useTagIndex(slug)` which returns `summaries` as a computed ref. The sort composable works identically since it accepts `Ref<T[]>`.
- No special handling needed -- confirmed by codebase analysis.

**Channel page (`channels/[slug].vue`):**
- Derives `summaries` via a local `computed` filter on `allSummaries`. The sort composable receives this computed ref directly.

**Playlist page (`playlists/[slug].vue`):**
- **Caution:** This page calls `throw createError()` synchronously at setup time if the playlist config is not found. All composable calls (including `useSortOptions`) must be placed BEFORE this throw, or they must be guarded. Since Vue composables must be called at the top of `<script setup>` (not conditionally), the safest approach is to call `useSortOptions` before the error throw and simply pass an empty array when no playlist is found.

**Pattern Consistency (Pattern Recognition Specialist):**
- All four pages follow the same pattern: header + count + sort control + feed. Consider extracting the header layout into a shared `PageHeader` component that includes a slot for the sort control, to enforce visual consistency. This is a follow-up enhancement, not a blocker.

### 5. Adapt `DateGroupedFeed` for non-date sorts

When the sort mode is not date-based (e.g., alphabetical), `DateGroupedFeed` date headers become meaningless. Two options:
- **Option A (simpler):** Render a flat list without date group headers when sort is non-date.
- **Option B:** Create a separate `FlatFeed` component for non-date sorts.

Recommendation: **Option A** -- add a prop like `:show-headers="sortIsDateBased"` to `DateGroupedFeed`.

#### Research Insights

**Simplicity Review (Code Simplicity Reviewer):**
- Option A is clearly the right choice. Creating a separate `FlatFeed` component duplicates the list rendering logic (the `<ul>` with `<SummaryCard>` items) for no meaningful benefit.
- The prop name `:show-headers` is clear. An alternative like `:flat` (boolean, inverted) is slightly more concise but less readable.

**Implementation Detail:**
```vue
<!-- DateGroupedFeed.vue -->
<script setup lang="ts">
import type { DateSegment } from '~/composables/useDateGroups'

const props = defineProps<{
  segments: DateSegment<any>[]
  showHeaders?: boolean
}>()

// Default to true for backwards compatibility
const showHeaders = computed(() => props.showHeaders !== false)
</script>

<template>
  <div class="date-grouped-feed">
    <template v-if="showHeaders">
      <!-- Existing grouped rendering -->
      <section v-for="segment in segments" :key="segment.key" class="date-segment">
        <h2 class="date-segment__header">...</h2>
        <ul class="date-segment__list">...</ul>
      </section>
    </template>
    <template v-else>
      <!-- Flat rendering: all items in a single list -->
      <ul class="date-segment__list">
        <li v-for="item in allItems" :key="item.metadata?.videoId">
          <SummaryCard :summary="item" />
        </li>
      </ul>
    </template>
    <!-- empty state unchanged -->
  </div>
</template>
```

**Edge Case -- Flat Mode Data Shape:**
- When `showHeaders` is `false`, the component still receives `segments` (an array of groups). It needs to flatten them: `const allItems = computed(() => props.segments.flatMap(s => s.items))`. This is a minor concern but should be tested.
- Alternatively, the page could pass a flat array directly when `isDateSort` is false, bypassing `useDateGroups` entirely. This is cleaner but requires conditional logic in the page.

**Accessibility Consideration:**
- When headers are hidden, the `<section>` landmark elements should also be removed (not just visually hidden) so screen readers don't announce empty sections. The `v-if/v-else` approach above handles this correctly.

### 6. URL State Persistence (Optional Enhancement)

#### Research Insights

**Nuxt-Idiomatic Approach:**
- Use `useRoute().query.sort` to read and `navigateTo({ query: { sort: value } }, { replace: true })` to write. The `replace: true` avoids polluting browser history with every sort change.
- `router.replace()` also works but `navigateTo` is the Nuxt 4 recommended approach.

**SSR Hydration Edge Case (Critical):**
- On SSR, `useRoute().query.sort` is available during server render. If the query param contains an invalid value (e.g., `?sort=hacked`), the composable must validate it against the `SortKey` union and fall back to the default. Without validation, the server renders one sort order and the client hydrates with another, causing a hydration mismatch.

```typescript
function isValidSortKey(value: unknown): value is SortKey {
  return typeof value === 'string' && SORT_OPTIONS.some(opt => opt.key === value)
}

// In useSortOptions:
const route = useRoute()
const initialSort = isValidSortKey(route.query.sort) ? route.query.sort : defaultSort
const currentSort = ref<SortKey>(initialSort)
```

**localStorage Alternative:**
- Simpler but not shareable. Also requires SSR guards (`if (import.meta.client)`) since `localStorage` is not available during server render.
- Recommendation: defer URL state to a follow-up. Use a plain `ref` for MVP.

## Technical Considerations

### Architecture

- The sort logic lives in a composable (`useSortOptions`), keeping pages thin (per CLAUDE.md: "keep orchestration only, delegate UI to components").
- `useDateGroups` remains the grouping utility but becomes sort-aware. It should not own the sort state -- it receives pre-sorted items.
- `useContentStream` already supports `sort` options but the list pages don't use them. The new sort can be applied client-side after data is loaded (simpler, no re-fetch needed) since all items are already in memory.

### Date field availability

- `metadata.publishedAt` is present on all summaries (required by `videoMetadataSchema` in `content.config.ts`).
- `processedAt` is also always present (required field in the summaries schema).
- Both are ISO 8601 strings, sortable as strings or parsed via `new Date()`.

#### Research Insights

**Performance Optimization -- String Comparison vs. Date Parsing:**
- ISO 8601 strings in the format `YYYY-MM-DDTHH:mm:ss.sssZ` are lexicographically sortable. This means `a.localeCompare(b)` on the raw strings produces the same order as `new Date(a).getTime() - new Date(b).getTime()`, but without the overhead of Date object construction.
- For hundreds of items this is negligible, but for correctness and simplicity, string comparison is preferred unless timezone normalization is needed.

### Performance

- Client-side sorting of hundreds of items is negligible (sub-millisecond).
- No additional API calls or data fetching required.
- `computed` reactivity ensures sorting only recalculates when the sort option or data changes.

#### Research Insights

**Performance Oracle Analysis:**
- **Algorithmic complexity:** O(n log n) for sorting, O(n) for grouping. Both are optimal for the data size (hundreds of items).
- **Reactivity overhead:** The `sorted` computed creates a shallow copy (`[...items.value]`) on every recalculation. This is correct -- mutating the source array would cause infinite reactivity loops. The copy is O(n) in memory but negligible for hundreds of items.
- **No bundle size concern:** The feature adds one composable (~40 lines) and one component (~30 lines). Estimated <1KB gzipped increase.
- **At 10x scale (thousands of items):** Still sub-millisecond. No virtualization needed. At 100x (tens of thousands), consider `v-virtual-scroll` for the feed list, but that is far beyond current content volumes.

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

### Additional Acceptance Criteria (from deepening)

- [ ] `SortControl` uses unique IDs (via `useId()`) to avoid duplicate ID accessibility violations
- [ ] Sort control meets WCAG 2.1 AA touch target minimum (44x44px)
- [ ] `localeCompare` in title sort is guarded against null/undefined values
- [ ] `useSortOptions` generic constraint enforces required properties at compile time (no `any`)
- [ ] Screen readers are informed of sort changes via `aria-live` region
- [ ] Focus ring is visible on the sort `<select>` when navigated via keyboard

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
  { key: 'title-asc', label: 'Title A\u2013Z' },
  { key: 'processed-date-desc', label: 'Recently added' }
] as const satisfies readonly SortOption[]

export interface Sortable {
  processedAt: string
  metadata: {
    publishedAt: string
    title: string
  }
}

export function useSortOptions<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort: SortKey = 'publish-date-desc'
) {
  const currentSort = ref<SortKey>(defaultSort)

  const isDateSort = computed(() =>
    currentSort.value.startsWith('publish-date') || currentSort.value === 'processed-date-desc'
  )

  const currentSortLabel = computed(() =>
    SORT_OPTIONS.find(opt => opt.key === currentSort.value)?.label ?? ''
  )

  const sorted = computed(() => {
    const list = [...items.value]
    switch (currentSort.value) {
      case 'publish-date-desc':
        return list.sort((a, b) =>
          new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
        )
      case 'publish-date-asc':
        return list.sort((a, b) =>
          new Date(a.metadata.publishedAt).getTime() - new Date(b.metadata.publishedAt).getTime()
        )
      case 'processed-date-desc':
        return list.sort((a, b) =>
          new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime()
        )
      case 'title-asc':
        return list.sort((a, b) =>
          (a.metadata?.title ?? '').localeCompare(b.metadata?.title ?? '', undefined, { sensitivity: 'base' })
        )
      default:
        return list
    }
  })

  return { currentSort, sorted, isDateSort, currentSortLabel, sortOptions: SORT_OPTIONS }
}
```

### src/components/content/SortControl.vue

```vue
<script setup lang="ts">
import { useId } from 'vue'
import { SORT_OPTIONS, type SortKey } from '~/composables/useSortOptions'

const model = defineModel<SortKey>({ required: true })
const selectId = useId()
</script>

<template>
  <div class="sort-control">
    <label :for="selectId" class="sort-control__label">Sort by</label>
    <select :id="selectId" v-model="model" class="sort-control__select">
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
  padding: var(--space-2xs, 0.375rem) var(--space-xs, 0.5rem);
  min-height: 44px;
  border: 1px solid var(--color-base-tint-10, #e5e7eb);
  border-radius: 6px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #374151);
  cursor: pointer;
}

.sort-control__select:focus-visible {
  outline: 2px solid var(--color-primary, #2563eb);
  outline-offset: 2px;
}
</style>
```

## Testing Strategy

### Research Insights

**Tests to Add (`src/tests/composables/useSortOptions.spec.ts`):**

1. **Default sort:** Items are sorted by `metadata.publishedAt` descending
2. **Ascending sort:** Switching to `publish-date-asc` reverses order
3. **Title sort:** Items sorted alphabetically, case-insensitive
4. **Title sort with null values:** Items with missing `metadata.title` sort to end, no crash
5. **isDateSort computed:** Returns `true` for all date sorts, `false` for title sort
6. **Empty array:** Returns empty array without error for all sort keys
7. **Reactivity:** Changing `currentSort.value` triggers recomputation of `sorted`

**Tests to Update (`src/tests/` -- existing):**
- Any test that asserts on `useDateGroups` output order should be updated to account for the new `metadata.publishedAt` grouping key.

## Success Metrics

- Users see content ordered by YouTube publish date by default on all list pages.
- Sort preference is easy to discover and use without documentation.
- No performance regression on page load.

## Dependencies & Risks

- **Low risk:** All required date fields (`metadata.publishedAt`, `processedAt`) are already present in the content schema and every summary file.
- **Low risk:** `date-fns` is already a dependency, available for any date parsing needs.
- **Design decision needed:** Whether to persist sort choice in URL query params or just use local state. URL params are better for shareability but add minor complexity. **Recommendation from deepening: defer to follow-up, use plain ref for MVP.**
- **Edge case:** Tag pages load summaries via `useTagIndex` (a different data path than `useContentStream`). The sort composable must work with both data sources since it operates on the final array, not the query.
- **NEW -- Edge case:** Playlist page's synchronous `throw createError()` requires that `useSortOptions` is called before the throw guard. Composable ordering matters.
- **NEW -- Edge case:** `localeCompare` on null/undefined title will throw. Must guard with nullish coalescing.
- **NEW -- Edge case:** Hardcoded `id` attributes in `SortControl` cause duplicate ID violations. Use `useId()`.

## Sources & References

### Internal References

- Content schema: `content.config.ts` (defines `metadata.publishedAt` and `processedAt`)
- Date grouping: `src/composables/useDateGroups.ts`
- Content stream: `src/composables/useContentStream.ts` (has existing sort infrastructure)
- Tag data loading: `src/composables/useTagIndex.ts`
- Feed component: `src/components/content/DateGroupedFeed.vue`
- Summary card: `src/components/content/SummaryCard.vue` (already displays `publishedAt`)

### External References (from deepening)

- [Vue 3 Accessibility Guide](https://vuejs.org/guide/best-practices/accessibility)
- [Vue 3 defineModel Documentation](https://vuejs.org/guide/components/v-model.html)
- [WCAG Select Element Accessible Name](https://www.accessibilitychecker.org/wcag-guides/ensure-select-element-has-an-accessible-name/)
- [WCAG 2.2 Accessible Dropdowns & Selects](https://www.thewcag.com/examples/dropdowns-selects)
- [Vue 3 Composable Best Practices](https://www.vuemastery.com/blog/coding-better-composables-1-of-5/)
- [Sorting Lists with Vue.js Composition API](https://vueschool.io/articles/vuejs-tutorials/sorting-lists-with-vue-js-composition-api-computed-properties/)

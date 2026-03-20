---
title: "AIC-35: Composable Extraction and Page Refactoring"
type: refactor
status: draft
date: 2026-03-20
---

# AIC-35: Composable Extraction and Page Refactoring

## Enhancement Summary

**Deepened on:** 2026-03-20
**Sections enhanced:** 7 (composable, per-page changes, tests, scoped styles, template reduction, implementation order, verification)
**Research sources:** Vue 3 composable docs, Tailwind CSS v4 migration guides, project learnings (5 solution files), codebase analysis of all affected files

### Key Improvements
1. Added `MaybeRefOrGetter<T[]>` input flexibility to `useSortedFeed` for future-proofing
2. Expanded test plan from 4 bullet points to 10 concrete test cases including reactive updates and edge cases
3. Identified `processed-date-desc` as a missing branch in `dateSortDirection` -- potential silent bug
4. Added Tailwind v4 border-color default change as a migration risk for scoped style elimination
5. Added `sortOptions` to composable return type -- currently dropped, needed by future consumers

### New Considerations Discovered
- The `playlists/[slug].vue` composable-before-data pattern creates a subtle ordering dependency that `useSortedFeed` must preserve
- Scoped style removal changes CSS specificity from scoped attribute selectors to flat utility classes -- any global styles targeting the same elements may now win
- The `searchResultsAsSummaries` computed needs an explicit return type to avoid widening `videoId` to `string | undefined`

---

## Overview

Three refactoring workstreams to reduce duplication, eliminate scoped styles, and simplify template complexity across the page layer.

1. **`useSortedFeed()` composable** -- extract the repeated sort + date-group + feedSegments pattern from 4 pages
2. **Scoped style elimination** -- convert 5 pages from `<style scoped>` to Tailwind utilities
3. **Template complexity reduction** -- simplify conditional rendering in 3 pages

---

## 1. `useSortedFeed()` Composable

### Problem

Four pages repeat the identical 10-line pattern:

```ts
const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(items)
const dateSortDirection = computed(() => currentSort.value === 'publish-date-asc' ? 'asc' as const : 'desc' as const)
const { segments } = useDateGroups(computed(() => isDateSort.value ? sorted.value : []), undefined, dateSortDirection)

const feedSegments = computed(() =>
  isDateSort.value
    ? segments.value
    : sorted.value.length > 0
      ? [{ key: 'older' as const, label: '', items: sorted.value }]
      : []
)
```

Pages affected: `channels/[slug].vue`, `playlists/[slug].vue`, `tags/[slug].vue`, `summaries/index.vue`.

### Research Insights

**Best Practices (Vue 3 Composables):**
- Accept `MaybeRefOrGetter<T[]>` for input arguments instead of strictly `Ref<T[]>` -- this allows callers to pass computed refs, plain refs, or getter functions without wrapping. Use `toValue()` internally to normalize. (Source: [Vue.js Composables Guide](https://vuejs.org/guide/reusability/composables))
- Return type should be an interface with JSDoc on each field so IDE hover shows purpose. The current plan already does this well.
- Composables that compose other composables (like `useSortedFeed` wrapping `useSortOptions` + `useDateGroups`) should be tested as integration units, not by mocking the inner composables.

**Edge Case -- `processed-date-desc` sort direction:**
- The current `dateSortDirection` computed only checks for `'publish-date-asc'` and defaults everything else to `'desc'`. This works today because `processed-date-desc` is inherently descending. However, if a `processed-date-asc` sort key is added in the future, the direction logic would silently produce wrong results. Consider making the direction derivation explicit for all date-based sort keys, or adding a comment documenting the assumption.

**Performance Consideration:**
- The composable creates 4 computed refs internally (`dateSortDirection`, `segments` via `useDateGroups`, `feedSegments`, plus `sorted` from `useSortOptions`). Each recomputes when `items` changes. For large feeds (1000+ items), the sort + group chain runs synchronously. This is acceptable for the current dataset sizes but worth noting for future scale.

### Target API

```ts
// composables/useSortedFeed.ts

import type { Ref } from 'vue'
import type { SortKey, Sortable } from '~/composables/useSortOptions'
import type { DateSegment, DateGroup } from '~/composables/useDateGroups'

export type FeedSegment<T> = DateSegment<T>

export interface UseSortedFeedReturn<T extends Sortable> {
  /** Segments ready for <DateGroupedFeed :segments="feedSegments"> */
  feedSegments: ComputedRef<FeedSegment<T>[]>
  /** Current sort key (v-model for SortControl) */
  currentSort: Ref<SortKey>
  /** Human-readable label for aria-live announcements */
  currentSortLabel: ComputedRef<string>
  /** Whether current sort is date-based (controls header visibility) */
  isDateSort: ComputedRef<boolean>
  /** Available sort options for rendering SortControl options list */
  sortOptions: typeof import('~/composables/useSortOptions').SORT_OPTIONS
}

export function useSortedFeed<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort?: SortKey
): UseSortedFeedReturn<T>
```

**Note on `sortOptions`:** The underlying `useSortOptions` returns `sortOptions: SORT_OPTIONS` but the original plan drops it from the `useSortedFeed` return. Include it in the return type so consumers can render sort option lists without a separate import. This is a no-cost addition since the value already exists.

### Implementation

```ts
// composables/useSortedFeed.ts

import { computed, type Ref, type ComputedRef } from 'vue'
import { useSortOptions, SORT_OPTIONS, type SortKey, type Sortable } from '~/composables/useSortOptions'
import { useDateGroups, type DateSegment } from '~/composables/useDateGroups'

export type FeedSegment<T> = DateSegment<T>

export interface UseSortedFeedReturn<T extends Sortable> {
  feedSegments: ComputedRef<FeedSegment<T>[]>
  currentSort: Ref<SortKey>
  currentSortLabel: ComputedRef<string>
  isDateSort: ComputedRef<boolean>
  sortOptions: typeof SORT_OPTIONS
}

export function useSortedFeed<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort?: SortKey
): UseSortedFeedReturn<T> {
  const { currentSort, sorted, isDateSort, currentSortLabel, sortOptions } = useSortOptions(items, defaultSort)

  // Direction is derived from the sort key name suffix.
  // All current date sorts are either explicitly 'asc' or default to 'desc'.
  // If a new date sort key is added, update this mapping.
  const dateSortDirection = computed(() =>
    currentSort.value === 'publish-date-asc' ? 'asc' as const : 'desc' as const
  )

  const { segments } = useDateGroups(
    computed(() => isDateSort.value ? sorted.value : []),
    undefined,
    dateSortDirection
  )

  const feedSegments = computed<FeedSegment<T>[]>(() =>
    isDateSort.value
      ? segments.value
      : sorted.value.length > 0
        ? [{ key: 'older' as const, label: '', items: sorted.value }]
        : []
  )

  return { feedSegments, currentSort, currentSortLabel, isDateSort, sortOptions }
}
```

### Per-Page Changes

#### `src/pages/channels/[slug].vue`

**Script block -- remove (lines 2, 4, 57-67):**
```ts
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions } from '~/composables/useSortOptions'

// Sort and group -- summaries is already a computed with null guard
const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(summaries)
const dateSortDirection = computed(...)
const { segments } = useDateGroups(...)
const feedSegments = computed(...)
```

**Script block -- add:**
```ts
import { useSortedFeed } from '~/composables/useSortedFeed'

const { feedSegments, currentSort, currentSortLabel, isDateSort } = useSortedFeed(summaries)
```

Template unchanged.

#### `src/pages/playlists/[slug].vue`

**Script block -- remove (lines 3-4, 14-25):**
```ts
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions, type Sortable } from '~/composables/useSortOptions'

const items = computed<Sortable[]>(() => summaries.value || [])
const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(items)
const dateSortDirection = computed(...)
const { segments } = useDateGroups(...)
const feedSegments = computed(...)
```

**Script block -- add:**
```ts
import { useSortedFeed } from '~/composables/useSortedFeed'
import type { Sortable } from '~/composables/useSortOptions'

const items = computed<Sortable[]>(() => summaries.value || [])
const { feedSegments, currentSort, currentSortLabel, isDateSort } = useSortedFeed(items)
```

Note: the `items` wrapper with null guard must remain because `summaries` is fetched after the composable call (due to the synchronous throw guard pattern).

**Research Insight -- Composable Ordering Risk:**
The `playlists/[slug].vue` page calls `useSortedFeed(items)` *before* `useContentStream('summaries', ...)` fetches the data. This works because `items` is a computed that reactively derives from the `summaries` ref. However, `useSortedFeed` internally calls `useSortOptions` which calls `tryUseNuxtApp()` and `useRoute()` -- these Nuxt composables must be called during component setup (synchronous top-level). The ordering is correct in the current plan but must not be rearranged. Add a comment in the page explaining this constraint.

Template unchanged.

#### `src/pages/tags/[slug].vue`

**Script block -- remove (lines 3-4, 22-33):**
```ts
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions } from '~/composables/useSortOptions'

const items = computed(() => summaries.value || [])
const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(items)
const dateSortDirection = computed(...)
const { segments } = useDateGroups(...)
const feedSegments = computed(...)
```

**Script block -- add:**
```ts
import { useSortedFeed } from '~/composables/useSortedFeed'

const items = computed(() => summaries.value || [])
const { feedSegments, currentSort, currentSortLabel, isDateSort } = useSortedFeed(items)
```

Template unchanged.

#### `src/pages/summaries/index.vue`

**Script block -- remove (lines 2-3, 26-37):**
```ts
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions } from '~/composables/useSortOptions'

const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(filteredSummaries)
const dateSortDirection = computed(...)
const { segments } = useDateGroups(...)
const feedSegments = computed(...)
```

**Script block -- add:**
```ts
import { useSortedFeed } from '~/composables/useSortedFeed'

const { feedSegments, currentSort, currentSortLabel, isDateSort } = useSortedFeed(filteredSummaries)
```

Template unchanged.

### Tests

Create `src/tests/composables/useSortedFeed.test.ts`:

**Research Insights (Vitest Composable Testing):**
- Test the composable as an integration unit -- do not mock `useSortOptions` or `useDateGroups`. This validates the full composition chain. (Source: [How to Test Vue Composables](https://alexop.dev/posts/how-to-test-vue-composables/))
- Since `useSortOptions` calls `tryUseNuxtApp()` internally (which returns `null` outside Nuxt), the composable is already safe to test without a component wrapper.
- Use the `makeSortable()` factory pattern from the existing `useSortOptions.test.ts` for consistency.
- Test reactive updates by mutating the input ref and asserting the output changes via `nextTick`.

**Test cases (10):**

1. **Non-date sort produces flat segment:** `title-asc` returns a single segment with `key: 'older'` and empty label.
2. **Date sort produces grouped segments:** `publish-date-desc` returns date-grouped segments with correct labels from `useDateGroups`.
3. **Ascending date sort reverses group order:** `publish-date-asc` returns segments in chronological order (older first).
4. **`currentSortLabel` returns human-readable label:** Defaults to `'Newest first'` for `publish-date-desc`.
5. **Empty input returns empty `feedSegments`:** Passing `ref([])` returns `[]` for all sort modes.
6. **`isDateSort` is true for date sorts, false for title sort:** Verify for each of the 4 sort keys.
7. **Reactive update:** Mutating the input `ref` triggers `feedSegments` to recompute on `nextTick`.
8. **Sort change triggers recompute:** Changing `currentSort.value` from `publish-date-desc` to `title-asc` changes `feedSegments` from grouped to flat.
9. **`defaultSort` parameter is respected:** Passing `'title-asc'` as default produces a flat segment initially.
10. **`sortOptions` is exposed:** The return value includes the `SORT_OPTIONS` array with all 4 sort options.

---

## 2. Scoped Style Elimination

### Research Insights

**Tailwind v4 Migration Considerations:**
- **Border color default change:** Tailwind v4 changed the default `border-color` from `gray-200` to `currentColor`. Any element using `border-b` or `border-border` should explicitly set the border color. The `tags/index.vue` mapping already uses `border-border` which is correct. (Source: [Tailwind CSS v4 Migration Guide](https://dev.to/pockit_tools/tailwind-css-v4-migration-guide-everything-that-changed-and-how-to-upgrade-2026-5d4))
- **Specificity change:** Scoped styles use Vue's `[data-v-xxxxx]` attribute selector which adds specificity. Removing scoped styles and using Tailwind utilities (single class selectors) lowers specificity. If any global CSS targets the same elements with higher specificity, those global rules will now win. Audit `src/assets/css/tailwind.css` for conflicting global styles on `.page-header`, `.loading`, or page wrapper elements.
- **`@apply` deprecation path:** Tailwind v4 still supports `@apply` but the team recommends moving away from it. The plan correctly avoids `@apply` by using utility classes directly -- this is the right approach.

**From Project Learnings (styling-audit-legacy-cleanup-patterns.md):**
- When migrating CSS, validate that property-selector combinations are semantically valid, not just syntactically correct. Check for `content` on non-pseudo-elements, deprecated browser hacks, and `transition-all` (should be specific: `transition-colors`, `transition-opacity`).
- Use `useId()` instead of `Math.random()` for any ID generation encountered during the migration.

**From Project Learnings (shadcn-vue-migration-review-patterns.md):**
- After any component modification, verify `components.json` still has `"framework": "nuxt"`.
- When removing scoped styles that used class names (`.channel-page`, `.tag-page`), ensure no JavaScript references those class names for DOM queries or testing selectors.

### Mapping: CSS Property to Tailwind Equivalent

#### `src/pages/channels/[slug].vue` (lines 123-156)

| Selector | CSS Property | Value | Tailwind Class |
|---|---|---|---|
| `.channel-page` | `padding` | `1.75rem` | `p-7` |
| `.page-header` | `margin-bottom` | `1.75rem` | `mb-7` |
| `.page-header__top` | `display: flex; justify-content: space-between; align-items: flex-start; gap: 1.3125rem; flex-wrap: wrap` | -- | `flex justify-between items-start gap-5 flex-wrap` |
| `.page-header h1` | `margin: 0; font-size: 1.25rem` | -- | `m-0 text-xl` |
| `.page-header__count` | `margin: 0.375rem 0 0; color: var(--muted-foreground); font-size: 0.875rem` | -- | `mt-1.5 text-muted-foreground text-sm` |
| `.loading` | `text-align: center; padding: 3.5rem; color: var(--muted-foreground)` | -- | `text-center py-14 text-muted-foreground` |

**Notes:**
- `1.3125rem` (21px) does not map to a Tailwind scale value exactly. Use `gap-5` (1.25rem / 20px) -- the closest match. This is what `playlists/[slug].vue` already uses.
- `0.375rem` -> `mt-1.5` (0.375rem). Exact match.
- The `.channel-page` wrapper div class changes from `class="channel-page"` to `class="p-7"`.

**Action:** Delete entire `<style scoped>` block. Apply Tailwind classes to template elements.

**Post-migration check:** Verify no E2E tests or selectors reference `.channel-page` class name.

#### `src/pages/tags/[slug].vue` (lines 93-147)

| Selector | CSS Property | Value | Tailwind Class |
|---|---|---|---|
| `.tag-page` | `padding` | `1.75rem` | `p-7` |
| `.page-header` | `margin-bottom` | `1.75rem` | `mb-7` |
| `.page-header__breadcrumb` | `font-size: 0.875rem; color: var(--primary); text-decoration: none` | -- | `text-sm text-primary no-underline` |
| `.page-header__breadcrumb:hover` | `text-decoration: underline` | -- | `hover:underline` |
| `.page-header__separator` | `font-size: 0.875rem; color: var(--muted-foreground); margin: 0 0.375rem` | -- | `text-sm text-muted-foreground mx-1.5` |
| `.page-header__category` | `font-size: 0.875rem; color: var(--muted-foreground)` | -- | `text-sm text-muted-foreground` |
| `.page-header__top` | `display: flex; justify-content: space-between; align-items: flex-start; gap: 1.3125rem; flex-wrap: wrap` | -- | `flex justify-between items-start gap-5 flex-wrap` |
| `.page-header h1` | `margin: 0.6875rem 0 0; font-size: 1.25rem` | -- | `mt-2.5 text-xl` (0.6875rem ~ 11px; `mt-3` = 12px, `mt-2.5` = 10px -- use `mt-3` as nearest) |
| `.page-header__count` | `margin: 0.375rem 0 0; color: var(--muted-foreground); font-size: 0.875rem` | -- | `mt-1.5 text-muted-foreground text-sm` |
| `.loading` | `text-align: center; padding: 3.5rem; color: var(--muted-foreground)` | -- | `text-center py-14 text-muted-foreground` |

**Note:** `0.6875rem` (11px) has no exact Tailwind match. Use `mt-3` (0.75rem / 12px) as the nearest standard spacing value. Alternatively, use the arbitrary value `mt-[0.6875rem]` if pixel-perfect fidelity is required. Recommendation: use `mt-3` for consistency with the spacing scale.

**Action:** Delete entire `<style scoped>` block. Apply Tailwind classes to template elements.

**Accessibility note:** The breadcrumb `<NuxtLink>` should retain its `text-primary` color for sufficient color contrast against the background. Verify the contrast ratio meets WCAG AA (4.5:1 for normal text at `text-sm`).

#### `src/pages/tags/index.vue` (lines 59-113)

| Selector | CSS Property | Value | Tailwind Class |
|---|---|---|---|
| `.tags-page` | `padding` | `1.75rem` | `p-7` |
| `.page-header` | `margin-bottom` | `2.625rem` | `mb-10` (2.5rem) or `mb-11` -- use `mb-10` |
| `.page-header h1` | `margin: 0; font-size: 1.25rem` | -- | `m-0 text-xl` |
| `.page-header__count` | `margin: 0.375rem 0 0; color: var(--muted-foreground); font-size: 0.875rem` | -- | `mt-1.5 text-muted-foreground text-sm` |
| `.tags-grid` | `display: flex; flex-direction: column; gap: 2.625rem` | -- | `flex flex-col gap-10` (2.5rem) |
| `.tag-category__heading` | `font-size: 1.125rem; font-weight: 600; margin: 0 0 0.875rem 0; padding-bottom: 0.6875rem; border-bottom: 1px solid var(--border); display: flex; align-items: baseline; gap: 0.875rem` | -- | `text-lg font-semibold m-0 mb-3.5 pb-3 border-b border-border flex items-baseline gap-3.5` |
| `.tag-category__count` | `font-size: 0.875rem; font-weight: 400; color: var(--muted-foreground)` | -- | `text-sm font-normal text-muted-foreground` |
| `.tag-category__list` | `list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.6875rem` | -- | `list-none p-0 m-0 flex flex-wrap gap-3` (0.75rem nearest to 0.6875rem) |

**Notes:**
- `2.625rem` (42px) -> `mb-10` (2.5rem / 40px). Close enough for spacing scale.
- `0.6875rem` -> `gap-3` (0.75rem). Acceptable rounding.
- `0.875rem` -> `gap-3.5` (0.875rem). Exact match.

**Action:** Delete entire `<style scoped>` block. Apply Tailwind classes to template elements.

**Edge case:** The `tag-category__heading` uses `items-baseline` alignment. When the heading text and count span have different font sizes (`text-lg` vs `text-sm`), baseline alignment ensures they sit on the same text baseline. Verify this renders correctly -- `items-baseline` in Tailwind maps to `align-items: baseline` which is correct, but the combination with `flex` + `gap` can sometimes produce unexpected vertical alignment in Safari. Test on WebKit.

#### `src/pages/articles/publications/[slug].vue` (lines 52-77)

| Selector | CSS Property | Value | Tailwind Class |
|---|---|---|---|
| `.publication-page` | `padding: var(--space-l, 2rem)` | fallback `2rem` | `p-8` |
| `.page-header` | `margin-bottom: var(--space-l, 2rem)` | fallback `2rem` | `mb-8` |
| `.page-header h1` | `margin: var(--space-s, 0.5rem) 0 0; font-size: var(--step-2, 1.5rem)` | -- | `mt-2 text-2xl` (`1.5rem`) |
| `.page-header__count` | `margin: var(--space-2xs, 0.25rem) 0 0; color: ...; font-size: var(--step--1, 0.875rem)` | -- | `mt-1 text-muted-foreground text-sm` |
| `.loading` | `text-align: center; padding: var(--space-2xl, 3rem); color: ...` | -- | `text-center py-12 text-muted-foreground` |

**Note:** The CSS custom properties (`--space-l`, `--step-2`, etc.) are legacy design token references with fallback values. The fallbacks are the actual rendered values since those tokens are not defined anywhere in the current codebase. Use the fallback values for the Tailwind mapping.

**Research Insight (from styling-audit-legacy-cleanup-patterns.md):** When migrating from legacy design token CSS (`--space-l`, `--step-2`), confirm the tokens are truly undefined. Run `grep -r '\-\-space-l' src/assets/` and `grep -r '\-\-step-2' src/assets/` to verify no Tailwind config or global CSS defines these. If they are defined somewhere, the fallback values are not what renders.

**Action:** Delete entire `<style scoped>` block. Apply Tailwind classes to template elements. Replace class names (`publication-page`, `page-header`, `page-header__count`, `loading`) with Tailwind utility classes on the elements.

#### `src/pages/summaries/[slug].vue` (lines 112-118)

| Selector | CSS Property | Value | Tailwind Class |
|---|---|---|---|
| `.center` | `max-width: 80ch; margin-inline: auto; padding-inline: 1rem` | -- | `max-w-prose mx-auto px-4` |

**Note:** `max-w-prose` = 65ch by default, not 80ch. Use `max-w-[80ch]` for exact match. Alternatively, consider whether 65ch (standard prose width) is acceptable -- the project already uses `70ch` in `.prose-layout`. Recommendation: use `max-w-[80ch]` to preserve the original layout.

**Research Insight:** Consider defining a reusable composition utility in `src/assets/css/tailwind.css` if the `80ch` width is used elsewhere:
```css
.prose-wide { max-width: 80ch; margin-inline: auto; padding-inline: 1rem; }
```
This follows the project pattern of composition utilities in the Tailwind CSS file (per CLAUDE.md: "If Tailwind cannot express a layout pattern, add a composition utility"). However, since this is a single-use class, `max-w-[80ch] mx-auto px-4` inline is acceptable.

**Action:** Delete entire `<style scoped>` block. Replace `class="center"` with `class="max-w-[80ch] mx-auto px-4"`.

---

## 3. Template Complexity Reduction

### `src/pages/summaries/index.vue` (149 lines)

**Current problem:** 6 conditional branches in the template (lines 101-147), including inline object construction for search results (lines 113-126).

**Refactoring plan:**

1. **Extract search result mapping** -- Move the inline object construction in the `v-for` to a computed property:

   ```ts
   // Add to script -- use explicit return type to prevent type widening
   const searchResultsAsSummaries = computed(() =>
     searchResults.value.map(result => ({
       metadata: {
         videoId: result.id,
         title: result.title,
         channel: result.channel,
         publishedAt: result.date,
         thumbnailUrl: result.thumbnailUrl,
         youtubeUrl: `https://www.youtube.com/watch?v=${result.id}`,
       },
       processedAt: result.date,
       tldr: result.tldr,
     }))
   )
   ```

   Template becomes:
   ```vue
   <SummaryCard v-for="item in searchResultsAsSummaries" :key="item.metadata.videoId" :summary="item" />
   ```

   **Research Insight:** The mapped object structure must match what `SummaryCard` expects via its props interface. Verify the `SummaryCard` props type accepts the subset of fields being constructed (it may expect additional fields like `slug`, `body`, etc. that are present on real summary objects but absent on search results). If `SummaryCard` uses optional chaining on those fields, this is safe. If not, the TypeScript compiler will catch mismatches during `pnpm run typecheck`.

2. **Consolidate empty states** -- The "search no results" and "filter empty" blocks are structurally similar. Leave as-is for now since they have different icons, messages, and actions. Extracting them into a shared component would over-abstract for only 2 uses.

3. **Net reduction:** ~15 lines of template removed (inline object construction block replaced with simple iteration).

### `src/pages/channels/[slug].vue` (157 lines)

**Current problem:** After scoped style removal, the file will already shrink significantly. The remaining template complexity is the 3-state conditional (loading / 404 / content). This is the standard pattern for detail pages and is acceptable.

**Refactoring plan:** No template refactoring needed beyond the scoped style elimination and composable extraction. The 3-state pattern (loading / 404 / content with empty sub-state) is the canonical pattern per CLAUDE.md.

**Research Insight (from route-relocation-stale-reference-cleanup.md):** When changing class names from semantic (`.channel-page`) to utility (`p-7`), verify that no other code references the old class name. Run `grep -r 'channel-page' src/` to check for any JavaScript selectors, test selectors, or documentation references.

### `src/pages/issues/[id].vue` (137 lines)

**Current problem:** Deep nesting with inline magic values like `text-[1.75rem]`, `text-[0.8125rem]`, `text-[0.9375rem]`, `text-[1.0625rem]`, `border-l-[3px]`.

**Refactoring plan:**

1. **Replace arbitrary values with standard Tailwind scale:**

   | Current | Replacement | Reasoning |
   |---|---|---|
   | `text-[1.75rem]` | `text-[1.75rem]` | Keep -- no standard class for 28px heading. `text-3xl` = 1.875rem is too large. |
   | `text-[1.375rem]` | `text-[1.375rem]` | Keep -- responsive heading variant, no standard match. |
   | `text-[0.8125rem]` | `text-[0.8125rem]` | Keep -- 13px is between `text-xs` (12px) and `text-sm` (14px). No standard match. |
   | `text-[0.9375rem]` | `text-[0.9375rem]` | Keep -- 15px is between `text-sm` (14px) and `text-base` (16px). No standard match. |
   | `text-[1.0625rem]` | `text-[1.0625rem]` | Keep -- 17px has no standard match. |
   | `border-l-[3px]` | `border-l-[3px]` | Keep -- standard `border-l-2` (2px) or `border-l-4` (4px) are the alternatives. 3px is intentional for the blockquote accent. |
   | `size-[1.125rem]` | `size-[1.125rem]` | Keep -- 18px, between `size-4` (16px) and `size-5` (20px). |

   **Conclusion:** The arbitrary values in `issues/[id].vue` are intentional typographic choices for the newsletter detail page. They cannot be meaningfully simplified to standard Tailwind scale values without changing the visual design. No template refactoring is needed here.

   **Research Insight (Tailwind v4 Design Tokens):** If these bespoke sizes recur across future newsletter-related pages, consider defining them as custom theme values in `src/assets/css/tailwind.css` using Tailwind v4's `@theme` directive:
   ```css
   @theme {
     --font-size-newsletter-heading: 1.75rem;
     --font-size-newsletter-body: 0.9375rem;
   }
   ```
   This would replace arbitrary `text-[1.75rem]` with semantic `text-newsletter-heading`. Defer unless more newsletter pages are planned.

2. **Extract featured pick article as a sub-component** (optional, low priority):
   Lines 95-105 define a repeated `<article>` block for featured picks. This could become `<FeaturedPickCard>` but the ROI is low since it's only used once and the iteration is simple. **Decision: defer.**

---

## Implementation Order

1. **Create `composables/useSortedFeed.ts`** -- new file, no dependencies on other changes
2. **Create `tests/composables/useSortedFeed.test.ts`** -- validate composable in isolation
3. **Refactor 4 pages to use `useSortedFeed()`** -- one page at a time, verify with `pnpm run typecheck` after each
   - Start with `summaries/index.vue` (simplest, no scoped styles to combine)
   - Then `channels/[slug].vue` (combine with scoped style removal)
   - Then `tags/[slug].vue` (combine with scoped style removal)
   - Then `playlists/[slug].vue` (already uses Tailwind, composable swap only)
4. **Eliminate scoped styles** -- one page at a time:
   - `channels/[slug].vue` (combined with step 3)
   - `tags/[slug].vue` (combined with step 3)
   - `tags/index.vue`
   - `articles/publications/[slug].vue`
   - `summaries/[slug].vue`
5. **Template simplification: `summaries/index.vue`** -- extract `searchResultsAsSummaries` computed
6. **Run full validation:** `pnpm eslint . && pnpm run lint:css && pnpm run typecheck && pnpm vitest run`

### Research Insight -- Implementation Order Rationale

**Why `summaries/index.vue` first for composable swap:** This page already uses Tailwind utilities (no scoped styles), so the composable extraction is isolated from style changes. If the composable has a bug, it surfaces here without conflating with style migration issues. This follows the principle of changing one thing at a time.

**Why combine composable + style changes for `channels/[slug].vue` and `tags/[slug].vue`:** These pages need both changes. Doing them together avoids touching the same file twice in the same PR, reducing merge conflict risk and review fatigue.

**Typecheck after each page:** The plan correctly specifies `pnpm run typecheck` after each page. This catches type errors from the composable migration (e.g., if a page was passing `sorted` instead of `items` to a downstream consumer).

---

## Verification Checklist

- [ ] `pnpm run typecheck` passes
- [ ] `pnpm eslint .` passes
- [ ] `pnpm run lint:css` passes (no scoped style violations)
- [ ] `pnpm vitest run` passes (including new `useSortedFeed` tests)
- [ ] No `<style scoped>` blocks remain in `src/pages/` (grep: `grep -r '<style scoped>' src/pages/`)
- [ ] No `useDateGroups` imports remain in the 4 refactored pages
- [ ] No `useSortOptions` imports remain in the 4 refactored pages (they import `useSortedFeed` instead)
- [ ] Visual regression: all 4 feed pages render identically before/after
- [ ] Visual regression: all 5 style-migrated pages render identically before/after

### Additional Verification (from Research)

- [ ] No old class names (`.channel-page`, `.tag-page`, `.tags-page`, `.publication-page`, `.center`) referenced anywhere in JS, tests, or docs: `grep -rE 'channel-page|tag-page|tags-page|publication-page|"center"' src/`
- [ ] Legacy design tokens (`--space-l`, `--step-2`, etc.) are not defined in any CSS file: `grep -rE '\-\-space-(l|s|2xs|2xl)|\-\-step-' src/assets/`
- [ ] `components.json` still has `"framework": "nuxt"` (check after any shadcn component interactions)
- [ ] `useDateGroups` and `useSortOptions` are still importable (they are used by `useSortedFeed` and potentially by other code) -- do NOT delete these files
- [ ] URL query param sync (`?sort=`) still works on all 4 feed pages after composable extraction
- [ ] `aria-live` announcements still fire correctly on sort change (the `currentSortLabel` binding is preserved in templates)

---

## Open Questions

1. **`max-w-[80ch]` vs `max-w-prose` in `summaries/[slug].vue`:** The original uses `80ch` while the prose layout utility in `tailwind.css` uses `70ch`. Should this be standardized to `70ch` (matching the rest of the app) or kept at `80ch`? Recommend standardizing to `70ch` unless the wider width is intentional for transcript readability.

2. **Arbitrary font sizes in `issues/[id].vue`:** The newsletter detail page uses 5 non-standard font sizes (`13px`, `15px`, `17px`, `22px`, `28px`). These could be standardized to the Tailwind type scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`) but that would change the visual design. Implementer should confirm with design whether the bespoke sizes should be preserved or rounded to the standard scale.

3. **`gap-5` rounding for `1.3125rem`:** Channels and tags pages use `gap: 1.3125rem` (21px). The plan maps this to `gap-5` (20px). This is a 1px visual change. Acceptable, or use `gap-[1.3125rem]`?

4. **Breadcrumb extraction in `tags/[slug].vue`:** The breadcrumb markup (`Topics / Category`) is unique to this page. If more pages adopt breadcrumbs in the future, consider a `<Breadcrumb>` component. Not in scope for this issue.

### New Questions (from Research)

5. **`sortOptions` passthrough:** The original plan drops `sortOptions` from the `useSortedFeed` return. Should it be included for completeness (zero cost, enables `SortControl` to render options from the composable instead of importing `SORT_OPTIONS` separately)? Recommendation: include it.

6. **`processed-date-desc` direction assumption:** The `dateSortDirection` computed treats `processed-date-desc` as `'desc'` by default (falls through the ternary). This is correct but implicit. Should the composable add an explicit `processed-date-desc` branch, or a comment, to make this assumption visible?

7. **Safari baseline alignment:** The `tags/index.vue` category heading uses `items-baseline` with mixed font sizes (`text-lg` + `text-sm`). Test on Safari/WebKit to confirm no vertical alignment quirks appear after the scoped-to-utility migration.

---

## References

- [Vue.js Composables Guide](https://vuejs.org/guide/reusability/composables)
- [TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api)
- [How to Test Vue Composables with Vitest](https://alexop.dev/posts/how-to-test-vue-composables/)
- [Tailwind CSS v4 Migration Guide](https://dev.to/pockit_tools/tailwind-css-v4-migration-guide-everything-that-changed-and-how-to-upgrade-2026-5d4)
- [Tailwind CSS Best Practices 2025-2026: Design Tokens](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns)
- Project learning: `docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md`
- Project learning: `docs/solutions/ui-bugs/shadcn-vue-migration-review-patterns.md`
- Project learning: `docs/solutions/logic-errors/route-relocation-stale-reference-cleanup.md`

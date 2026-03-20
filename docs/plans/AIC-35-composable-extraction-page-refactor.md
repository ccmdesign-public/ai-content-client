---
title: "AIC-35: Composable Extraction and Page Refactoring"
type: refactor
status: draft
date: 2026-03-20
---

# AIC-35: Composable Extraction and Page Refactoring

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
}

export function useSortedFeed<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort?: SortKey
): UseSortedFeedReturn<T>
```

### Implementation

```ts
// composables/useSortedFeed.ts

import { computed, type Ref, type ComputedRef } from 'vue'
import { useSortOptions, type SortKey, type Sortable } from '~/composables/useSortOptions'
import { useDateGroups, type DateSegment } from '~/composables/useDateGroups'

export type FeedSegment<T> = DateSegment<T>

export interface UseSortedFeedReturn<T extends Sortable> {
  feedSegments: ComputedRef<FeedSegment<T>[]>
  currentSort: Ref<SortKey>
  currentSortLabel: ComputedRef<string>
  isDateSort: ComputedRef<boolean>
}

export function useSortedFeed<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort?: SortKey
): UseSortedFeedReturn<T> {
  const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(items, defaultSort)

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

  return { feedSegments, currentSort, currentSortLabel, isDateSort }
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

- Test that non-date sort (`title-asc`) produces a single flat segment with `key: 'older'` and empty label.
- Test that date sort (`publish-date-desc`) produces date-grouped segments with correct labels.
- Test that `currentSortLabel` returns the human-readable label.
- Test empty input returns empty `feedSegments`.

---

## 2. Scoped Style Elimination

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

#### `src/pages/articles/publications/[slug].vue` (lines 52-77)

| Selector | CSS Property | Value | Tailwind Class |
|---|---|---|---|
| `.publication-page` | `padding: var(--space-l, 2rem)` | fallback `2rem` | `p-8` |
| `.page-header` | `margin-bottom: var(--space-l, 2rem)` | fallback `2rem` | `mb-8` |
| `.page-header h1` | `margin: var(--space-s, 0.5rem) 0 0; font-size: var(--step-2, 1.5rem)` | -- | `mt-2 text-2xl` (`1.5rem`) |
| `.page-header__count` | `margin: var(--space-2xs, 0.25rem) 0 0; color: ...; font-size: var(--step--1, 0.875rem)` | -- | `mt-1 text-muted-foreground text-sm` |
| `.loading` | `text-align: center; padding: var(--space-2xl, 3rem); color: ...` | -- | `text-center py-12 text-muted-foreground` |

**Note:** The CSS custom properties (`--space-l`, `--step-2`, etc.) are legacy design token references with fallback values. The fallbacks are the actual rendered values since those tokens are not defined anywhere in the current codebase. Use the fallback values for the Tailwind mapping.

**Action:** Delete entire `<style scoped>` block. Apply Tailwind classes to template elements. Replace class names (`publication-page`, `page-header`, `page-header__count`, `loading`) with Tailwind utility classes on the elements.

#### `src/pages/summaries/[slug].vue` (lines 112-118)

| Selector | CSS Property | Value | Tailwind Class |
|---|---|---|---|
| `.center` | `max-width: 80ch; margin-inline: auto; padding-inline: 1rem` | -- | `max-w-prose mx-auto px-4` |

**Note:** `max-w-prose` = 65ch by default, not 80ch. Use `max-w-[80ch]` for exact match. Alternatively, consider whether 65ch (standard prose width) is acceptable -- the project already uses `70ch` in `.prose-layout`. Recommendation: use `max-w-[80ch]` to preserve the original layout.

**Action:** Delete entire `<style scoped>` block. Replace `class="center"` with `class="max-w-[80ch] mx-auto px-4"`.

---

## 3. Template Complexity Reduction

### `src/pages/summaries/index.vue` (149 lines)

**Current problem:** 6 conditional branches in the template (lines 101-147), including inline object construction for search results (lines 113-126).

**Refactoring plan:**

1. **Extract search result mapping** -- Move the inline object construction in the `v-for` to a computed property:

   ```ts
   // Add to script
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

2. **Consolidate empty states** -- The "search no results" and "filter empty" blocks are structurally similar. Leave as-is for now since they have different icons, messages, and actions. Extracting them into a shared component would over-abstract for only 2 uses.

3. **Net reduction:** ~15 lines of template removed (inline object construction block replaced with simple iteration).

### `src/pages/channels/[slug].vue` (157 lines)

**Current problem:** After scoped style removal, the file will already shrink significantly. The remaining template complexity is the 3-state conditional (loading / 404 / content). This is the standard pattern for detail pages and is acceptable.

**Refactoring plan:** No template refactoring needed beyond the scoped style elimination and composable extraction. The 3-state pattern (loading / 404 / content with empty sub-state) is the canonical pattern per CLAUDE.md.

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

2. **Extract featured pick article as a sub-component** (optional, low priority):
   Lines 95-105 define a repeated `<article>` block for featured picks. This could become `<FeaturedPickCard>` but the ROI is low since it's only used once and the iteration is simple. **Decision: defer.**

---

## Implementation Order

1. **Create `composables/useSortedFeed.ts`** -- new file, no dependencies on other changes
2. **Create `tests/composables/useSortedFeed.test.ts`** -- validate composable in isolation
3. **Refactor 4 pages to use `useSortedFeed()`** -- one page at a time, verify with `pnpm run typecheck` after each
4. **Eliminate scoped styles** -- one page at a time:
   - `channels/[slug].vue` (combined with step 3)
   - `tags/[slug].vue` (combined with step 3)
   - `tags/index.vue`
   - `articles/publications/[slug].vue`
   - `summaries/[slug].vue`
5. **Template simplification: `summaries/index.vue`** -- extract `searchResultsAsSummaries` computed
6. **Run full validation:** `pnpm eslint . && pnpm run lint:css && pnpm run typecheck && pnpm vitest run`

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

---

## Open Questions

1. **`max-w-[80ch]` vs `max-w-prose` in `summaries/[slug].vue`:** The original uses `80ch` while the prose layout utility in `tailwind.css` uses `70ch`. Should this be standardized to `70ch` (matching the rest of the app) or kept at `80ch`? Recommend standardizing to `70ch` unless the wider width is intentional for transcript readability.

2. **Arbitrary font sizes in `issues/[id].vue`:** The newsletter detail page uses 5 non-standard font sizes (`13px`, `15px`, `17px`, `22px`, `28px`). These could be standardized to the Tailwind type scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`) but that would change the visual design. Implementer should confirm with design whether the bespoke sizes should be preserved or rounded to the standard scale.

3. **`gap-5` rounding for `1.3125rem`:** Channels and tags pages use `gap: 1.3125rem` (21px). The plan maps this to `gap-5` (20px). This is a 1px visual change. Acceptable, or use `gap-[1.3125rem]`?

4. **Breadcrumb extraction in `tags/[slug].vue`:** The breadcrumb markup (`Topics / Category`) is unique to this page. If more pages adopt breadcrumbs in the future, consider a `<Breadcrumb>` component. Not in scope for this issue.

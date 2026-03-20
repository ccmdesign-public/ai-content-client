---
title: "feat: Add homepage tag category filter bar"
type: feat
status: active
date: 2026-03-05
deepened: 2026-03-05
---

# feat: Add homepage tag category filter bar

## Enhancement Summary

**Deepened on:** 2026-03-05
**Sections enhanced:** 8
**Research sources:** Vue 3 docs (Context7), W3C WAI-ARIA APG, Radix Vue, CSS horizontal scroll UX research, Nuxt Content v3 querying patterns, accessibility SKILL, vue-best-practices SKILL, frontend-design SKILL, ui-ux-pro-max SKILL

### Key Improvements
1. Resolved Open Question #3 (URL state) with a concrete recommendation for query-parameter sync using `useRoute`/`useRouter`, enabling shareable filtered views
2. Added roving tabindex keyboard navigation pattern (from W3C APG Radio Group) with concrete implementation guidance
3. Identified SSR hydration mismatch risk when loading tag data via `queryCollection('tags').all()` alongside client-side filtering
4. Added scroll-snap CSS pattern for mobile chip carousel and fade-edge affordance to signal overflow
5. Strengthened composable architecture with `string[]` internal design and pre-computed category-to-videoId `Map` for O(1) category switching

### New Considerations Discovered
- Untagged summaries disappear silently when a category is active -- need a UI indicator or footnote
- `DateGroupedFeed` date-segment headers use `position: sticky` with `z-index: 10` -- a sticky filter bar must use a higher z-index to avoid overlap
- Tag `items[]` includes both `summary` and `article` types -- must filter to `type === 'summary'` during cross-reference (existing pattern from `useTagIndex.ts`)

---

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

### Research Insights -- UI Design

**Best Practices:**
- Place the filter bar **above** the "All Summaries" heading (resolves Open Question #1). This keeps it the first interactive element and avoids ambiguity about whether the heading describes filtered or unfiltered content.
- **Show item counts on chips** (resolves Open Question #2). Displaying counts (e.g., "AI & ML (328)") gives users immediate signal of category size and reduces exploratory clicks. The data is already available from `tagsByCategory.totalItems`.
- Use **abbreviated category names** (resolves Open Question #5). Long names like "AI & Machine Learning" cause overflow on smaller screens. Use short labels (e.g., "AI & ML") as the chip display text, with the full name available as a `title` attribute for hover tooltips. A `shortName` or display mapping can be added to `tags-index.json` or hardcoded in the composable.

**Active Chip Styling:**
```css
.tag-chip--active {
  background: var(--color-primary, #2563eb);
  border-color: var(--color-primary, #2563eb);
  color: #fff;
}

.tag-chip--active .tag-chip__count {
  color: rgba(255, 255, 255, 0.8);
}
```

**Sticky Filter Bar (resolves Open Question #4):**
- Recommend implementing sticky behavior. The `DateGroupedFeed` date-segment headers already use `position: sticky; top: 0; z-index: 10`. The filter bar should use `position: sticky; top: 0; z-index: 20` to layer above them.
- Add a subtle `box-shadow` or border-bottom when stuck to provide visual separation.

```css
.category-filter-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--color-background, #fff);
  border-bottom: 1px solid var(--color-base-tint-10, #e5e7eb);
}
```

**When sticky is active, the date-segment headers' `top` value must be offset by the filter bar height** to avoid overlapping. Consider using a CSS custom property `--filter-bar-height` set via a ResizeObserver or a fixed value.

### Data Flow

1. **Source**: `useTagsConfig()` already provides `tagsByCategory` -- a computed list of categories sorted by total item count, each containing its child tags with slugs.
2. **Filter state**: A `ref<string | null>` holding the selected `categoryId` (or `null` for "All").
3. **Tag slug set**: When a category is selected, collect all tag slugs belonging to that category from `tagsByCategory`.
4. **Content filtering**: Load tag data from the `tags` collection to build a set of summary video IDs that belong to the selected category's tags. Filter the `summaries` data against this set.

### Research Insights -- Data Flow

**Pre-computed Category-to-VideoId Map:**
Instead of recomputing the video ID set on every category change, build a `Map<string, Set<string>>` once when tag data loads. Each key is a `categoryId`, and the value is the `Set` of all `videoId`s belonging to that category. Category switching then becomes an O(1) Map lookup.

```typescript
// Inside useHomepageFilter composable
const categoryVideoIdMap = computed(() => {
  const map = new Map<string, Set<string>>()
  if (!allTags.value) return map
  for (const tag of allTags.value) {
    const ids = map.get(tag.categoryId) || new Set<string>()
    for (const item of tag.items) {
      if (item.type === 'summary') ids.add(item.id)  // Filter to summaries only
    }
    map.set(tag.categoryId, ids)
  }
  return map
})
```

**Critical: Filter `item.type === 'summary'` only.** The existing `useTagIndex.ts` composable (lines 46-51) already does this filtering because tag `items[]` can include `article`-type entries that lack a `videoId` and cannot be cross-referenced with summaries. The homepage filter must replicate this guard.

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

### Research Insights -- Filtering Strategy

**SSR Hydration Consideration:**
The `queryCollection('tags').all()` call runs inside `useAsyncData`, which executes on both server and client. Since the filter state starts as `null` (show all), there is no hydration mismatch risk for the initial render. However, if URL-based filter state is implemented (see URL State section below), the server must also read the query parameter to produce matching HTML, or the filter must be applied only on client-side with a `{ server: false }` option on the `useAsyncData` call.

**Lazy vs. Eager Tag Loading:**
Load tag data eagerly (on mount) rather than lazily (on first filter click). This avoids a perceptible delay on the first category selection. The tag data is ~10-20 KB and loads in parallel with summaries.

**Composable Signature (recommended):**
```typescript
export function useHomepageFilter(
  summaries: Ref<any[]>,
  tagsByCategory: Ref<TagCategory[]>
) {
  const selectedCategory = ref<string | null>(null)

  // Pre-computed map built once from tag data
  const categoryVideoIdMap = computed<Map<string, Set<string>>>(() => { /* ... */ })

  const filteredSummaries = computed(() => {
    if (!selectedCategory.value) return summaries.value
    const ids = categoryVideoIdMap.value.get(selectedCategory.value)
    if (!ids) return []
    return summaries.value.filter(s => ids.has(s.metadata?.videoId))
  })

  const filteredCount = computed(() => filteredSummaries.value.length)
  const totalCount = computed(() => summaries.value.length)

  function selectCategory(categoryId: string | null) {
    selectedCategory.value = categoryId
  }

  return { selectedCategory, filteredSummaries, filteredCount, totalCount, selectCategory }
}
```

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

### Research Insights -- Component Architecture

**Vue Best Practices Applied (from vue-best-practices skill):**
- `index.vue` remains an orchestration-only page (thin route component), consistent with its current pattern.
- `CategoryFilterBar.vue` is a pure presentational component: receives categories + active state as props, emits selection events. No internal data fetching.
- `useHomepageFilter.ts` owns all filter state and derived data. This follows the "extract logic into composables when it is reused, stateful, or side-effect heavy" principle.
- Data flow: props down (`categories`, `selectedCategory` to `CategoryFilterBar`), events up (`@select` emits category ID to page).

**Component Contract:**
```typescript
// CategoryFilterBar.vue props/emits
defineProps<{
  categories: TagCategory[]
  selectedCategory: string | null
}>()

defineEmits<{
  select: [categoryId: string | null]
}>()
```

### Performance

- The `tags` data collection contains ~100 YAML files. Loading them all once on homepage mount is acceptable (~10-20 KB total).
- Filtering is a `Set.has()` lookup per summary -- O(n) where n = number of summaries. With ~1200 summaries this is sub-millisecond.
- Category selection should feel instant (no loading spinner needed for the filter operation itself).
- Consider caching the tag-to-videoId mapping in a computed so it only recalculates when the selected category changes.

### Research Insights -- Performance

**Performance Considerations:**
- The `categoryVideoIdMap` computed builds all category Sets upfront. For ~100 tags with ~12 items each, this constructs ~1200 entries across all Sets -- negligible memory overhead.
- Use `computed` (not `watch`) for derived data. Vue's computed caching ensures the Map only rebuilds when `allTags` data changes, not on every filter toggle.
- The `filteredSummaries` computed depends on `selectedCategory` and the pre-built Map, so switching categories triggers only the array filter (no Map rebuild).
- **CLS (Cumulative Layout Shift) risk:** When filtering reduces the feed from 1200 to 300 items, the page height changes significantly. This is acceptable for user-initiated actions (not counted by Core Web Vitals for CLS), but consider a `min-height` on the feed container to prevent the footer from jumping during rapid filter switches.
- **No virtualization needed:** At ~1200 items with `SummaryCard` components, the DOM size is manageable. If the dataset grows beyond ~5000, consider `vue-virtual-scroller` for the feed.

### Accessibility

- Filter bar should use `role="radiogroup"` with `role="radio"` on each chip (single-select semantics).
- Active chip gets `aria-checked="true"`.
- Keyboard navigation: arrow keys to move between chips, Enter/Space to select.
- Filtered count announcement: use `aria-live="polite"` on the count text so screen readers announce changes.

### Research Insights -- Accessibility

**W3C WAI-ARIA APG Radio Group Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/radio/):**

The plan's accessibility approach is correct. Here are concrete implementation details:

**Roving Tabindex Pattern:**
Only the currently selected (or first) chip should have `tabindex="0"`. All others should have `tabindex="-1"`. Arrow keys move focus and selection simultaneously in a radio group.

```html
<div role="radiogroup" aria-label="Filter by category">
  <button
    v-for="(category, index) in categories"
    :key="category.categoryId"
    role="radio"
    :aria-checked="selectedCategory === category.categoryId"
    :tabindex="selectedCategory === category.categoryId ? 0 : -1"
    @click="selectCategory(category.categoryId)"
    @keydown="handleKeydown($event, index)"
  >
    {{ category.name }}
  </button>
</div>
```

**Keyboard Handler:**
```typescript
function handleKeydown(event: KeyboardEvent, currentIndex: number) {
  const chips = /* refs to all chip elements */
  let nextIndex = currentIndex

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (currentIndex + 1) % chips.length
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = (currentIndex - 1 + chips.length) % chips.length
      break
    case 'Home':
      nextIndex = 0
      break
    case 'End':
      nextIndex = chips.length - 1
      break
    default:
      return // Don't prevent default for unhandled keys
  }

  event.preventDefault()
  selectCategory(categories[nextIndex].categoryId)
  chips[nextIndex].focus()
}
```

**Live Region for Count:**
```html
<p class="page-header__count" aria-live="polite" aria-atomic="true">
  {{ filteredCount }} videos
  <span v-if="selectedCategory"> (filtered from {{ totalCount }})</span>
</p>
```

**Focus Visible Styling:**
```css
.tag-chip:focus-visible {
  outline: 2px solid var(--color-primary, #2563eb);
  outline-offset: 2px;
}
```

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .tag-chip {
    transition: none;
  }
}
```

### Mobile / Responsive

- The filter bar should horizontally scroll on narrow viewports (10 categories may overflow).
- Use `overflow-x: auto` with `-webkit-overflow-scrolling: touch`.
- Consider hiding the scrollbar visually while keeping it functional.
- On mobile, the filter bar should appear above the page header, below the `MobileNav` component.

### Research Insights -- Mobile / Responsive

**Scroll Snap for Chip Carousel:**
Use `scroll-snap-type: x proximity` (not `mandatory`) so chips align after a swipe but don't force awkward snapping on partial scrolls.

```css
.category-filter-bar__list {
  display: flex;
  gap: var(--space-xs, 0.5rem);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  scrollbar-width: none; /* Firefox */
  padding: var(--space-xs, 0.5rem) var(--space-l, 2rem);
}

.category-filter-bar__list::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.category-filter-bar__list > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

**Fade Edge Affordance:**
Add a subtle gradient fade on the right edge of the filter bar to signal that more chips are available by scrolling. Use a `::after` pseudo-element with a transparent-to-background gradient.

```css
.category-filter-bar {
  position: relative;
}

.category-filter-bar::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2rem;
  background: linear-gradient(to right, transparent, var(--color-background, #fff));
  pointer-events: none;
}
```

**Touch Target Size:**
Chips must be at least 44x44px for touch accessibility (WCAG 2.5.5 Target Size). The current `.tag-chip` padding (`0.25rem 0.75rem`) may produce chips shorter than 44px. Add `min-height: 44px` and ensure adequate padding.

```css
.tag-chip {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
```

### Research Insights -- URL State (resolves Open Question #3)

**Recommendation: Implement URL query-parameter sync.**

Reflecting the selected category in the URL (`/?category=ai-ml`) enables shareable/bookmarkable filtered views and improves user experience with browser back/forward navigation.

**Implementation Pattern using Nuxt's `useRoute` / `useRouter`:**
```typescript
// Inside useHomepageFilter composable
const route = useRoute()
const router = useRouter()

// Initialize from URL
const selectedCategory = ref<string | null>(
  (route.query.category as string) || null
)

// Sync to URL on change
watch(selectedCategory, (newVal) => {
  const query = { ...route.query }
  if (newVal) {
    query.category = newVal
  } else {
    delete query.category
  }
  router.replace({ query })
})
```

**Key decisions:**
- Use `router.replace()` (not `router.push()`) to avoid polluting browser history with every filter click.
- Default value (`null` / "All") should NOT appear in the URL -- only active filters are shown.
- On page load, read `route.query.category` to restore filter state.
- This creates a minor SSR consideration: if the server reads the query param and tries to filter before tag data is loaded, it could produce an empty result. Mitigate by only applying the filter client-side (use `onMounted` or `{ server: false }` on the tag data fetch).

**References:**
- [Nuxt useRoute composable](https://nuxt.com/docs/4.x/api/composables/use-route)
- [Vue Router Composition API](https://router.vuejs.org/guide/advanced/composition-api.html)

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

### Research Insights -- Additional Acceptance Criteria

- [ ] Roving tabindex: only the selected chip has `tabindex="0"`; arrow keys move focus and selection
- [ ] `Home` and `End` keys navigate to first/last chip respectively
- [ ] Focus-visible ring is visible on keyboard navigation (`:focus-visible` styling)
- [ ] `prefers-reduced-motion: reduce` disables chip transition animations
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Fade edge affordance indicates horizontal overflow on mobile
- [ ] Tag `items[]` filtering excludes non-summary types (only `type === 'summary'` items are counted)
- [ ] URL query parameter `?category=<categoryId>` syncs with filter state (shareable links)
- [ ] Sticky filter bar layers above date-segment sticky headers (`z-index: 20` vs `z-index: 10`)

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

### Research Insights -- Additional Risks

| Risk | Mitigation |
|------|------------|
| **SSR hydration mismatch** when URL has `?category=` but tag data hasn't loaded server-side | Apply filter only on client (`onMounted` or `{ server: false }` on tag data fetch). Server always renders "All" view. |
| **Untagged summaries disappear silently** when a category filter is active | Show "(filtered from X total)" count in the header. Consider a small footnote: "Some videos may not appear in filtered results." |
| **Sticky z-index collision** between filter bar and date-segment headers | Filter bar uses `z-index: 20`; date headers stay at `z-index: 10`. Document this layering. |
| **Tag `items[]` includes article-type entries** that don't have summaries | Filter to `item.type === 'summary'` in the cross-reference logic (matching existing `useTagIndex.ts` pattern). |
| **Layout shift on rapid filter switching** | Use `min-height` on feed container or CSS `contain: layout` to prevent footer jumping. |
| **Keyboard trap in horizontal scroll container** | Roving tabindex with arrow key wrapping prevents traps. Tab key exits the radiogroup to next focusable element. |

## Open Questions

1. ~~**Exact position**: "At the very top" -- should it be above the "All Summaries" heading, or between the heading and the feed?~~ **RESOLVED:** Above the heading. Keeps the filter as the first interactive element.
2. ~~**Show item counts on chips?**: Should each category chip show how many summaries it contains (e.g., "AI & ML (328)")?~~ **RESOLVED:** Yes. Show counts. Data is already available from `tagsByCategory.totalItems`.
3. ~~**URL state**: Should the selected category be reflected in the URL (e.g., `/?category=ai-ml`) so it is shareable/bookmarkable?~~ **RESOLVED:** Yes. Use `router.replace()` to sync query parameter. See URL State research insights above.
4. ~~**Sticky filter bar**: Should the filter bar stick to the top when scrolling?~~ **RESOLVED:** Yes. Use `position: sticky; top: 0; z-index: 20` with visual separation when stuck.
5. ~~**Abbreviations**: Some category names are long. Should we use shortened labels?~~ **RESOLVED:** Yes. Use abbreviated names with full name as `title` attribute for tooltip. Add abbreviation mapping.

## Sources & References

### Internal References

- Tag category data structure: `src/content/tags-index.json` (10 categories, ~100 tags)
- Tag config composable: `src/composables/useTagsConfig.ts` -- provides `tagsByCategory`, `tags`, `getTagBySlug`
- Tag index composable: `src/composables/useTagIndex.ts` -- pattern for cross-referencing tags with summaries (lines 46-51 filter `type === 'summary'`)
- Content stream composable: `src/composables/useContentStream.ts` -- used by homepage to load summaries
- Homepage: `src/pages/index.vue` -- current implementation, orchestration-only page
- Tags browse page: `src/pages/tags/index.vue` -- existing `.tag-chip` CSS pattern to reuse
- Date grouping: `src/composables/useDateGroups.ts` -- groups filtered results by date
- Date grouped feed: `src/components/content/DateGroupedFeed.vue` -- uses `position: sticky; z-index: 10` on segment headers
- Content schema: `content.config.ts` -- `tags` collection schema with `items[]` array

### External References

- [W3C WAI-ARIA APG Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) -- roving tabindex, keyboard interaction model
- [Radix Vue RadioGroup](https://www.radix-vue.com/components/radio-group) -- Vue 3 accessible radio group reference implementation
- [Vue.js Accessibility Guide](https://vuejs.org/guide/best-practices/accessibility) -- official Vue a11y guidance
- [Nuxt useRoute composable](https://nuxt.com/docs/4.x/api/composables/use-route) -- query parameter access
- [Vue Router Composition API](https://router.vuejs.org/guide/advanced/composition-api.html) -- programmatic navigation
- [MDN overflow-x](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-x) -- horizontal scroll CSS
- [Horizontal Scrolling UX Guide 2025](https://www.hirecorewebvitalsconsultant.com/blog/horizontal-scrolling-in-web-the-ultimate-guide-for-2025/) -- scroll-snap and mobile UX patterns

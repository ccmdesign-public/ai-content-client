---
title: "feat: Three-tier summaries cache to eliminate redundant re-fetches"
type: feat
status: active
date: 2026-03-22
linear: AIC-41
---

## Enhancement Summary

**Deepened on:** 2026-03-22
**Sections enhanced:** 8 (all major sections)
**Research sources:** Nuxt 4 official docs (Context7), Vue 3.5 reactivity docs, localStorage/IndexedDB benchmarks, WCAG 2.1 skeleton accessibility guidelines, project learnings (nuxt-content-reactivity-and-ssr-patterns.md)

### Key Improvements
1. **getCachedData must use 3-param Nuxt 4 signature with `ctx.cause`** -- bypass cache on `refresh:manual` to ensure manual refresh always fetches fresh data; the plan's Phase 1 code omits this and would break manual refresh
2. **Storage event listener is a memory leak** -- `window.addEventListener('storage', ...)` in Phase 3e is never cleaned up; must use composable lifecycle (`onUnmounted`) or a Nuxt plugin with cleanup
3. **localStorage 500KB blocks the main thread** -- JSON.parse/stringify of 500KB is synchronous and can cause 50-100ms jank; consider requestIdleCallback wrapper or IndexedDB for non-blocking I/O
4. **Skeleton accessibility needs `role="status"` not just `aria-busy`** -- few screen readers honor `aria-busy="true"` alone; pair with `role="status"` and `aria-live="polite"` on the skeleton container
5. **Shared key consistency rule** -- Nuxt 4 enforces that all `useAsyncData` calls sharing the same key must have identical `getCachedData`, `deep`, `handler`, `transform`, and `pick` options; verify `useArticleStream` compatibility immediately

### New Risks Discovered
- localStorage JSON.parse of 500KB blocks main thread for 50-100ms on low-end mobile
- Storage event does NOT fire in the same tab that wrote the data (W3C spec) -- cross-tab only
- `getCachedData` without `ctx.cause` check will prevent manual refresh from fetching fresh data
- Event listener leak if storage handler is not cleaned up on component unmount
- Nuxt `granularCachedData` experimental flag (enabled by default in Nuxt 4) changes refresh behavior -- must verify it is active

# Three-Tier Summaries Cache to Eliminate Redundant Re-Fetches

## Overview

Channel/list navigation still takes ~1s despite AIC-40 reducing payload size (~5MB to ~500KB via `select()`). The bottleneck is now network latency: `useAsyncData` re-executes the handler on every client-side navigation even when the key (`summaries-list`) is identical. This plan introduces a three-tier cache (localStorage, Nuxt payload, server fetch) plus normalization optimizations to make channel/list switches near-instant.

## Problem Statement

`useContentStream.ts` calls `useAsyncData(key, handler)` without `getCachedData`. In Nuxt 4, the default `getCachedData` only returns cached data during hydration (`nuxtApp.payload.data[key]`) or from static data (`nuxtApp.static.data[key]`). During SPA client-side navigation, neither source has data, so the handler re-executes every time -- even though the key `summaries-list` is identical across routes.

Additionally:
- `useSummariesData` creates a new `shallowRef` + `watch` per component instance, duplicating normalization work
- `useSortOptions` and `useDateGroups` call `new Date()` thousands of times on every sort/group operation
- `useAsyncData` defaults to deep reactivity in Nuxt 3 (the data array is replaced wholesale, never mutated, so deep watching is wasted)

## Proposed Solution

### Architecture: Three-Tier Cache

```
Tier 1: localStorage (instant, survives refresh/tabs)
  | miss or stale?
Tier 2: Nuxt payload cache via getCachedData (instant within SPA session)
  | miss?
Tier 3: Server fetch with select() (~500KB, ~300ms)
```

## Technical Approach

### Phase 1: Tier 2 -- `getCachedData` + `deep: false` (~5 lines, instant wins)

**File:** `src/composables/useContentStream.ts`

Add `getCachedData` and `deep: false` to the `useAsyncData` call. This eliminates redundant fetches during SPA navigation within the same session.

```ts
// useContentStream.ts -- inside useContentStream()
const { data, pending, error, refresh } = useAsyncData(key, async () => {
  // ... existing handler ...
}, {
  deep: false,
  getCachedData: (key, nuxtApp, ctx) => {
    // Bypass cache on manual refresh so users always get fresh data
    if (ctx.cause === 'refresh:manual') return undefined
    return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key] ?? undefined
  }
})
```

**Why `deep: false`:** The data array is replaced wholesale on every fetch (never mutated in place). Deep reactivity watches every nested property for changes, which is wasted CPU on a 1200-item array. `deep: false` uses reference equality, which is correct here since `normalizeSummaryDocs` always returns a new array.

**Nuxt 4 note:** Nuxt 4 changed the `getCachedData` signature to include a `ctx` parameter: `(key, nuxtApp, ctx)`. The `ctx.cause` field (`'initial' | 'refresh:hook' | 'refresh:manual' | 'watch'`) can be used to bypass cache on manual refresh. For Phase 1, we return cached data regardless of cause. Phase 3 may refine this.

**Acceptance criteria:**
- [ ] `getCachedData` returns payload/static data when available
- [ ] `deep: false` set on the `useAsyncData` options
- [ ] Navigating from `/summaries` to `/channels/[slug]` and back does NOT trigger a new network request
- [ ] Manual `refresh()` still fetches fresh data (Nuxt skips `getCachedData` when `dedupe: 'cancel'` is used with refresh)

#### Research Insights

**Best Practices (Nuxt 4 useAsyncData):**
- The `getCachedData` function signature MUST use the 3-parameter form `(key, nuxtApp, ctx)` in Nuxt 4. The 2-parameter form `(key, nuxtApp)` shown in the original plan code is the Nuxt 3 signature and will miss the `ctx.cause` context.
- Nuxt 4's `granularCachedData` experimental flag (enabled by default) controls whether `getCachedData` is called on refresh. Verify this is active in `nuxt.config.ts` -- if disabled, `getCachedData` is only called on initial load, not on `refresh()` or watch triggers.
- In Nuxt 4, `deep: false` is already the default for `useAsyncData`. Setting it explicitly is good for clarity, but it is not changing behavior from the Nuxt 4 default.

**Shared Key Consistency (Critical):**
- Nuxt 4 enforces that all `useAsyncData` calls sharing the same key must have identical `getCachedData`, `deep`, `handler`, `transform`, `pick`, and `default` options. Since `useContentStream` is also called by `useArticleStream`, the `getCachedData` and `deep` options will apply to articles too. Verify `useArticleStream` uses a different key (e.g., `articles-list`) so there is no conflict. If it shares the `summaries-list` key, it must use identical options.

**Performance Consideration:**
- `deep: false` in Nuxt 4 uses `shallowRef` internally. There is a [known issue (#25901)](https://github.com/nuxt/nuxt/issues/25901) where `deep: false` may not provide identical behavior to a manually created `shallowRef`. For this use case (wholesale replacement), it should be fine -- but if subtle reactivity bugs appear, check this issue.

**Edge Case -- `ctx.cause === 'refresh:manual'`:**
- The original plan says "we return cached data regardless of cause" but this would prevent manual `refresh()` from actually fetching fresh data. The `getCachedData` function should return `undefined` for `refresh:manual` cause so the handler re-executes. Updated code above reflects this.

**References:**
- [Nuxt 4 useAsyncData API docs](https://nuxt.com/docs/4.x/api/composables/use-async-data)
- [getCachedData ctx.cause upgrade guide](https://nuxt.com/docs/4.x/getting-started/upgrade)
- [granularCachedData experimental feature](https://nuxt.com/docs/4.x/guide/going-further/experimental-features)

### Phase 2: Normalization hoist + timestamp pre-computation

**Files:**
- `src/composables/useSummariesData.ts` -- simplify normalization, pre-compute timestamps
- `src/composables/useSortOptions.ts` -- use pre-computed `_publishedAtMs`
- `src/composables/useDateGroups.ts` -- use pre-computed `_processedAtMs` / `_publishedAtMs`

#### 2a. Hoist normalization into a computed (useSummariesData.ts)

Currently `useSummariesData` creates a `shallowRef` + `watch` per component instance. Since `useAsyncData` deduplicates by key, every call site shares the same underlying `data` ref -- but each creates its own watch + shallowRef copy.

Replace with a `computed` that normalizes once and caches via Vue's dependency tracking:

```ts
// useSummariesData.ts
export function useSummariesData() {
  const result = useContentStream('summaries', {
    select: SUMMARY_LIST_FIELDS as unknown as string[],
    key: 'summaries-list'
  })

  // Computed normalizes only when result.data changes (reference equality with deep: false)
  const data = computed(() => {
    if (!result.data.value) return null
    return normalizeSummaryDocs(result.data.value)
  })

  return { ...result, data }
}
```

**Concern:** `computed` re-evaluates when `result.data.value` changes by reference. With `deep: false`, this only happens on actual fetch, not on deep property changes. The previous `shallowRef` + `watch` pattern was necessary when deep reactivity could trigger spurious updates; with `deep: false` it is no longer needed.

**Risk:** If `normalizeSummaryDocs` is expensive for 1200 items, consider wrapping in a manual `shallowRef` with a `watch` that includes a short-circuit check (e.g., compare array length + first item path). Measure before optimizing.

#### 2b. Pre-compute sort timestamps during normalization (useSummariesData.ts)

Add `_publishedAtMs` and `_processedAtMs` fields during normalization to avoid `new Date()` in sort/group:

```ts
export function normalizeSummaryDocs(docs: any[]): any[] {
  return docs.map((doc: any) => {
    const metadata = safeParseMetadata(doc.metadata, doc.path)
    return {
      ...doc,
      metadata,
      _publishedAtMs: metadata.publishedAt ? new Date(metadata.publishedAt).getTime() : 0,
      _processedAtMs: doc.processedAt ? new Date(doc.processedAt).getTime() : 0,
    }
  })
}
```

#### 2c. Use pre-computed timestamps in useSortOptions.ts

```ts
// Replace: new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
// With:   b._publishedAtMs - a._publishedAtMs

case 'publish-date-desc':
  return list.sort((a, b) => b._publishedAtMs - a._publishedAtMs)
case 'publish-date-asc':
  return list.sort((a, b) => a._publishedAtMs - b._publishedAtMs)
case 'processed-date-desc':
  return list.sort((a, b) => b._processedAtMs - a._processedAtMs)
```

Update the `Sortable` interface to include optional pre-computed fields:

```ts
export interface Sortable {
  processedAt: string
  metadata: { publishedAt: string; title: string }
  _publishedAtMs?: number
  _processedAtMs?: number
}
```

#### 2d. Use pre-computed timestamps in useDateGroups.ts

The `dateAccessor` currently returns a string, which is then passed to `new Date()` inside the grouping loop. Change the internal grouping to use pre-computed ms when available:

```ts
// Inside the grouping loop:
for (const item of items.value) {
  const ms = (item as any)._publishedAtMs
    || new Date(dateAccessor(item)).getTime()
  const date = new Date(ms)
  const group = getDateGroup(date)
  groups.get(group)!.push(item)
}

// Inside the sort within each group:
groupItems.sort((a, b) => {
  const msA = (a as any)._publishedAtMs || new Date(dateAccessor(a)).getTime()
  const msB = (b as any)._publishedAtMs || new Date(dateAccessor(b)).getTime()
  return multiplier * (msA - msB)
})
```

**Note:** The fallback to `new Date(dateAccessor(item))` preserves backward compatibility for any caller not using pre-computed timestamps.

**Acceptance criteria:**
- [ ] `normalizeSummaryDocs` adds `_publishedAtMs` and `_processedAtMs` to each item
- [ ] `useSortOptions` sort comparisons use pre-computed ms values
- [ ] `useDateGroups` grouping and intra-group sorting use pre-computed ms values with fallback
- [ ] `Sortable` interface updated with optional `_publishedAtMs` and `_processedAtMs`
- [ ] `useSummariesData` uses `computed` instead of `shallowRef` + `watch`
- [ ] Existing tests pass; add test for `normalizeSummaryDocs` timestamp pre-computation

#### Research Insights

**Best Practices (Vue 3.5 Reactivity):**
- Vue 3.5 improved reactivity performance by 56% memory reduction and 10x faster array tracking. The `computed` approach is well-suited here because Vue 3.5's optimized dependency tracking makes computed properties on large arrays (1200 items) very efficient.
- The `computed` will only re-evaluate when `result.data.value` reference changes. With `deep: false` (shallowRef), this means re-evaluation ONLY on fetch, not on nested property changes. This is correct behavior.

**Type Safety Improvement:**
- The `(item as any)._publishedAtMs` casts in `useDateGroups.ts` are a code smell. Consider extending the `Sortable` interface or using a type guard instead:
  ```ts
  function hasPrecomputedTimestamps(item: Sortable): item is Sortable & { _publishedAtMs: number; _processedAtMs: number } {
    return typeof (item as any)._publishedAtMs === 'number'
  }
  ```
- Alternatively, make `useDateGroups` generic over `T extends Sortable` and let TypeScript infer the pre-computed fields from the actual data.

**Institutional Learning Applied:**
- From `docs/solutions/logic-errors/nuxt-content-reactivity-and-ssr-patterns.md`: The previous `shallowRef` + `watch` pattern was introduced specifically to work around deep reactivity issues. With `deep: false` on `useAsyncData`, this workaround is no longer needed. The learning confirms the original motivation and validates the removal.
- Same learning notes that `normalizeSummaryDocs` uses `safeParseMetadata` which handles the Nuxt Content v3 SQLite quirk where nested Zod objects are stored as JSON blobs. Ensure the pre-computed timestamps run AFTER `safeParseMetadata` (which they do in the current code).

**Performance Consideration -- `Array.sort` stability:**
- Pre-computed numeric comparisons (`b._publishedAtMs - a._publishedAtMs`) are significantly faster than string-to-Date parsing in sort comparators. For 1200 items, `Array.sort` runs ~O(n log n) = ~12,600 comparisons. Eliminating `new Date()` from each comparison saves ~25,000 Date object allocations per sort.
- JavaScript's `Array.sort` is stable in all modern browsers. The pre-computed approach preserves sort stability.

**Edge Case -- Zero timestamps:**
- Items with missing `publishedAt` get `_publishedAtMs: 0`. When sorting ascending, these will appear first; when descending, last. Verify this is the desired behavior. If not, consider using `Number.MIN_SAFE_INTEGER` or `Number.MAX_SAFE_INTEGER` to push missing dates to the end regardless of sort direction.

### Phase 3: Tier 1 -- localStorage cache with stale-while-revalidate

**File:** `src/composables/useSummariesData.ts`

Store the normalized summaries data in localStorage with metadata for staleness detection.

#### 3a. localStorage cache structure

```ts
interface SummariesCacheEntry {
  cachedAt: number        // Date.now() when cached
  count: number           // number of items (quick sanity check)
  latestProcessedAt: string // most recent processedAt value
  data: any[]             // the normalized summaries array
}

const CACHE_KEY = 'summaries-list-cache'
const STALE_THRESHOLD_MS = 6 * 60 * 60 * 1000 // 6 hours
```

#### 3b. Read from localStorage on init (client-side only)

```ts
function readLocalCache(): SummariesCacheEntry | null {
  if (import.meta.server) return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: SummariesCacheEntry = JSON.parse(raw)
    // Basic validation
    if (!entry.data || !Array.isArray(entry.data) || !entry.cachedAt) return null
    return entry
  } catch {
    return null // private browsing, quota errors, corrupt data
  }
}
```

#### 3c. Write to localStorage after successful fetch

```ts
function writeLocalCache(data: any[]) {
  if (import.meta.server) return
  try {
    const entry: SummariesCacheEntry = {
      cachedAt: Date.now(),
      count: data.length,
      latestProcessedAt: data.reduce((latest, d) =>
        d.processedAt > latest ? d.processedAt : latest, ''),
      data,
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // Silently fail -- quota exceeded, private browsing, etc.
  }
}
```

#### 3d. Integrate into useSummariesData

```ts
export function useSummariesData() {
  const isRevalidating = ref(false)

  const result = useContentStream('summaries', {
    select: SUMMARY_LIST_FIELDS as unknown as string[],
    key: 'summaries-list'
  })

  const data = computed(() => {
    if (!result.data.value) return null
    return normalizeSummaryDocs(result.data.value)
  })

  // Tier 1: Seed from localStorage on client
  if (import.meta.client) {
    const cached = readLocalCache()
    if (cached && !result.data.value) {
      // Inject cached data into the Nuxt payload so getCachedData picks it up
      const nuxtApp = useNuxtApp()
      nuxtApp.payload.data['summaries-list'] = cached.data

      // Check staleness and trigger background revalidation
      const age = Date.now() - cached.cachedAt
      if (age > STALE_THRESHOLD_MS) {
        isRevalidating.value = true
        result.refresh().finally(() => {
          isRevalidating.value = false
        })
      }
    }
  }

  // Write to localStorage when fresh data arrives
  watch(data, (newData) => {
    if (newData && import.meta.client) {
      writeLocalCache(newData)
    }
  })

  return { ...result, data, isRevalidating }
}
```

#### 3e. Multi-tab sync via storage event

```ts
if (import.meta.client) {
  const nuxtApp = useNuxtApp()

  const onStorageChange = (e: StorageEvent) => {
    if (e.key === CACHE_KEY && e.newValue) {
      try {
        const entry: SummariesCacheEntry = JSON.parse(e.newValue)
        if (entry.data) {
          nuxtApp.payload.data['summaries-list'] = entry.data
        }
      } catch {
        // Ignore corrupt cross-tab data
      }
    }
  }

  window.addEventListener('storage', onStorageChange)

  // Clean up on scope disposal to prevent memory leaks
  if (getCurrentScope()) {
    onScopeDispose(() => {
      window.removeEventListener('storage', onStorageChange)
    })
  }
}
```

**SSR safety:** All localStorage access is guarded by `import.meta.client` or `import.meta.server` checks, per CLAUDE.md SSR Safety Rules.

**Edge cases:**
- Private browsing: `localStorage.setItem` throws `QuotaExceededError` -- caught silently, degrades to Tier 2/3
- Corrupt data: `JSON.parse` failure returns null, skips cache
- Large data: ~500KB for 1200 items fits well within the 5-10MB localStorage limit
- SSR: always hits Tier 3 (no localStorage on server)

**Acceptance criteria:**
- [ ] localStorage cache is read on client-side init when Nuxt payload is empty
- [ ] Stale cache (> 6 hours) triggers background revalidation
- [ ] `isRevalidating` ref is `true` during background revalidation, `false` otherwise
- [ ] Fresh data is written to localStorage after successful fetch
- [ ] Private browsing / quota errors degrade silently
- [ ] Multiple tabs sync via `storage` event
- [ ] No `window` or `localStorage` access without `import.meta.client` guard

#### Research Insights

**Critical: Storage Event Listener Memory Leak (New Risk):**
- The original plan's Phase 3e adds `window.addEventListener('storage', ...)` but never removes it. Since `useSummariesData()` is called from multiple page components, each navigation could register a new listener without cleaning up the old one.
- **Fix:** Use `onScopeDispose()` (Vue 3.5+) to automatically remove the listener when the composable's effect scope is disposed. Updated code above shows the pattern.
- Alternative: Move the storage listener into a Nuxt plugin (`plugins/summaries-cache-sync.client.ts`) so it registers exactly once for the app lifecycle. This avoids the cleanup problem entirely.

**Critical: Storage Event Does NOT Fire In Same Tab (W3C Spec):**
- Per the [W3C Web Storage spec](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event), the `storage` event only fires in OTHER browsing contexts (tabs/windows) with the same origin. It does NOT fire in the tab that called `localStorage.setItem`.
- This means the multi-tab sync works correctly as designed (Tab A writes, Tab B receives event), but developers should not expect the writing tab to receive its own event. This is correct behavior for the plan's use case.

**Performance: localStorage 500KB Blocks Main Thread (New Risk):**
- `localStorage.getItem()` + `JSON.parse()` on 500KB of data is synchronous and can block the main thread for 50-100ms on low-end mobile devices. `JSON.stringify()` + `localStorage.setItem()` has similar cost.
- **Mitigation options (ranked by simplicity):**
  1. **Accept it (recommended for Phase 3):** 50-100ms is acceptable on initial page load since it happens once and replaces a ~300ms+ network round-trip. The write happens after render.
  2. **Wrap writes in `requestIdleCallback`:** Defers serialization to idle time. Reads still block but happen before first paint anyway.
  3. **Migrate to IndexedDB (future Phase 5):** IndexedDB is asynchronous and won't block the main thread. Consider this if the data grows beyond 1MB or if mobile performance metrics show jank.
- For 500KB, localStorage is the pragmatic choice. IndexedDB adds API complexity (async open, transaction, objectStore) that is not justified at this data size.

**localStorage Size Estimation:**
- 500KB of raw JSON, but localStorage stores strings as UTF-16, so actual storage cost is ~1MB. Still well within the 5MB per-origin limit on all browsers.
- `navigator.storage.estimate()` can check available space but is not necessary at this data size.

**Stale-While-Revalidate Timing:**
- The 6-hour `STALE_THRESHOLD_MS` is reasonable for content that updates a few times per day. Consider making this configurable or adding a version/hash field to the cache entry so the server can signal "no changes" more efficiently in the future.

**Race Condition: Payload Injection Timing (New Edge Case):**
- The code injects `nuxtApp.payload.data['summaries-list'] = cached.data` during composable setup. If `useAsyncData` has already started its handler (e.g., during SSR hydration), this injection may come too late -- the handler is already running.
- **Mitigation:** The `if (cached && !result.data.value)` check ensures injection only happens when there is no existing data. During SSR hydration, `result.data.value` will already be populated from the server, so the localStorage seed is skipped. This is correct behavior.

**Security Consideration:**
- localStorage data is accessible to any JavaScript running on the same origin (including XSS attacks). The cached data is summaries metadata (titles, dates, paths) -- not sensitive user data.
- Do NOT cache any user-specific data, authentication tokens, or PII in localStorage. The current plan caches public content only, which is safe.

**References:**
- [MDN: Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- [MDN: Window storage event](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event)
- [localStorage vs IndexedDB comparison](https://dev.to/tene/localstorage-vs-indexeddb-javascript-guide-storage-limits-best-practices-fl5)

### Phase 4: Skeleton revalidation UX

**Files:**
- `src/components/content/DateGroupedFeed.vue` -- accept `revalidating` prop
- `src/pages/summaries/index.vue` -- pass `isRevalidating`
- `src/pages/channels/[slug].vue` -- pass `isRevalidating`
- `src/pages/playlists/[slug].vue` -- pass `isRevalidating`

#### 4a. DateGroupedFeed revalidating prop

Add a `revalidating` boolean prop. When true, prepend 1-3 skeleton cards at the top of the feed to indicate new content may be loading:

```vue
<!-- DateGroupedFeed.vue -->
<script setup lang="ts">
const props = defineProps<{
  segments: DateSegment<Sortable>[]
  showHeaders?: boolean
  hasMore?: boolean
  visibleCount?: number
  totalCount?: number
  revalidating?: boolean
}>()
</script>

<template>
  <div :id="feedId" class="flex flex-col gap-10">
    <!-- Revalidation skeletons at top of feed -->
    <div
      v-if="revalidating"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Checking for new content"
      class="flex flex-col gap-5"
    >
      <span class="sr-only">Checking for new content...</span>
      <SummaryCardSkeleton v-for="n in 3" :key="`reval-${n}`" />
    </div>

    <!-- ... existing template ... -->
  </div>
</template>
```

#### 4b. Page integration

Each page that uses `useSummariesData` passes `isRevalidating` to `DateGroupedFeed`:

```vue
<!-- summaries/index.vue, channels/[slug].vue, playlists/[slug].vue -->
<DateGroupedFeed
  :segments="feedSegments"
  :show-headers="isDateSort"
  :has-more="hasMore"
  :visible-count="visibleCount"
  :total-count="totalCount"
  :revalidating="isRevalidating"
  @load-more="loadMore"
/>
```

Extract `isRevalidating` from `useSummariesData()`:

```ts
const { data: summaries, pending, error, refresh, isRevalidating } = useSummariesData()
```

**Acceptance criteria:**
- [ ] `DateGroupedFeed` accepts optional `revalidating` prop
- [ ] 1-3 skeleton cards prepended at top of feed when `revalidating` is true
- [ ] Skeletons have appropriate `aria-busy` and `aria-label` for accessibility
- [ ] All three list pages pass `isRevalidating` to `DateGroupedFeed`
- [ ] Skeletons disappear when revalidation completes

#### Research Insights

**Accessibility: Skeleton ARIA Best Practices (Improved):**
- `aria-busy="true"` alone is insufficient -- few screen readers honor it. The skeleton container should also use `role="status"` with `aria-live="polite"` so screen readers announce when the revalidation state changes.
- Add a visually hidden text node (`<span class="sr-only">Checking for new content...</span>`) inside the skeleton container. Screen readers will announce this text when the container appears.
- When skeletons disappear (revalidation complete), the `role="status"` region implicitly announces the removal. No additional "done" announcement is needed for stale-while-revalidate (the existing content was already visible).
- Updated template code above includes `role="status"`, `aria-live="polite"`, and `sr-only` text.

**UX: Reduced Motion Preference:**
- Skeleton pulse animations should respect `prefers-reduced-motion: reduce`. If using Tailwind's `animate-pulse`, add a media query override:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animate-pulse { animation: none; }
  }
  ```
- Alternatively, use a static skeleton (solid color block, no animation) when reduced motion is preferred.

**UX: Skeleton Count and Duration:**
- 3 skeleton cards is appropriate for a feed-style layout. Using a fixed number (not dynamic) prevents layout shift during revalidation.
- For stale-while-revalidate, the skeletons should appear ABOVE existing content (not replacing it). This preserves the user's scroll position and existing content while hinting at potential new items. The plan correctly does this with `v-if="revalidating"` prepended before segments.

**Pattern: Skeleton vs Spinner for Revalidation:**
- Skeleton cards are the right choice here (not a spinner or progress bar) because the user is viewing existing data while revalidation happens in the background. Skeleton cards hint "new content may appear here" without implying the whole page is loading.
- Do not show skeletons if the revalidation completes in < 200ms. Consider a minimum display duration to avoid flash-of-skeleton. A simple approach: delay showing skeletons by 200ms using `v-if="showRevalidationSkeletons"` with a computed that debounces `isRevalidating`.

**References:**
- [Adrian Roselli: More Accessible Skeletons](https://adrianroselli.com/2020/11/more-accessible-skeletons.html)
- [Carbon Design System: Loading Pattern](https://carbondesignsystem.com/patterns/loading-pattern/)
- [WCAG 2.1: 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG21/quickref/#status-messages)

## System-Wide Impact

### Interaction Graph

- `useSummariesData()` is called by: `summaries/index.vue`, `channels/[slug].vue`, `playlists/[slug].vue`
- All three share the same `useAsyncData` key (`summaries-list`), so Nuxt deduplicates the underlying fetch
- `getCachedData` intercepts before the handler runs -- no change to the handler itself
- `normalizeSummaryDocs` output feeds into `useSortOptions` and `useDateGroups` via `useSortedFeed`
- Pre-computed timestamps change the shape of normalized data, so `Sortable` interface must be updated

### Error & Failure Propagation

- **localStorage read failure:** Returns null, falls through to Tier 2/3 -- no user-visible error
- **localStorage write failure:** Swallowed silently, next page load will just fetch fresh
- **Corrupt localStorage data:** JSON.parse try/catch returns null, cache ignored
- **getCachedData returns stale data:** Only possible if localStorage seed is very old; background revalidation corrects this within seconds

### State Lifecycle Risks

- **Partial write to localStorage:** If the browser crashes mid-write, next read will get corrupt JSON, which is caught by try/catch
- **Stale localStorage after content deletion:** Items removed server-side will persist in localStorage until next revalidation. Acceptable for a 6-hour window; content additions are the common case
- **Multiple tabs with different cache ages:** The `storage` event sync means the most recently fetched data wins across tabs

### API Surface Parity

- `useContentStream` is used by `useArticleStream` as well -- `getCachedData` and `deep: false` should apply to all callers. Verify `useArticleStream` compatibility.
- `Sortable` interface change affects `useSortedFeed`, `useSortOptions`, `useDateGroups` -- all updated in Phase 2.

#### Research Insights

**Architecture Review:**
- The three-tier cache is a well-established pattern (similar to HTTP cache hierarchy: memory cache > disk cache > network). The layering is clean with proper fallthrough.
- The plan correctly keeps the cache logic in the composable layer rather than pushing it into the component layer. This maintains separation of concerns.

**Simplicity Review:**
- The `SummariesCacheEntry` interface with `count` and `latestProcessedAt` metadata fields may be YAGNI. These fields are written but never read in the current plan. Consider deferring them until there is an actual consumer (e.g., a "last updated" UI indicator). For Phase 3, the minimal cache entry could be just `{ cachedAt: number, data: any[] }`.

**Data Integrity Consideration:**
- Injecting data directly into `nuxtApp.payload.data['summaries-list']` bypasses any Nuxt-internal validation or transformation. This is safe because the data was originally from Nuxt's own fetch and was stored in localStorage after normalization. However, consider adding a cache version field (e.g., `version: 1`) to the cache entry so that future schema changes can invalidate stale caches gracefully instead of parsing incompatible data.

### Integration Test Scenarios

1. Navigate `/summaries` -> `/channels/fireship` -> `/summaries` -- second load should be instant (no network request)
2. Open app with cold localStorage, navigate around, close tab, reopen -- data should load instantly from localStorage
3. Open two tabs, let one revalidate -- second tab should pick up fresh data via storage event
4. Clear localStorage + Nuxt payload cache, navigate -- should fall through to server fetch normally
5. Test in private/incognito mode -- localStorage fails silently, app works normally via Tier 2/3

#### Research Insights -- Additional Test Scenarios

6. **Manual refresh after cache hit:** Click a "refresh" button after navigating (cached) -- should fetch fresh data, NOT return cache (validates `ctx.cause === 'refresh:manual'` bypass)
7. **Cache version mismatch:** Manually corrupt localStorage with old schema -- should gracefully fall through to Tier 2/3, not throw
8. **Concurrent revalidation:** Rapidly switch between channels while revalidation is in progress -- `isRevalidating` should not get stuck in `true` state (validates `.finally()` cleanup)
9. **Large dataset growth:** Test with 2000+ items to verify localStorage does not exceed quota on mobile Safari (which has a stricter ~2.5MB limit per origin in some older iOS versions)
10. **Storage event handler cleanup:** Navigate away from a page using `useSummariesData`, then trigger a storage event from another tab -- should NOT throw (validates `onScopeDispose` cleanup)

## Dependencies & Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| `deep: false` breaks downstream reactivity | Low | Data is replaced wholesale, never mutated. Verify with existing test suite. |
| localStorage quota exceeded on mobile | Low | 500KB is well within limits. try/catch handles gracefully. |
| `getCachedData` signature change in Nuxt 4 | Confirmed | Use 3-param signature `(key, nuxtApp, ctx)` per Nuxt 4 docs. |
| Pre-computed timestamps break Sortable consumers | Low | Fields are optional (`_publishedAtMs?: number`), backward compatible. |
| Normalization in computed vs watch causes perf regression | Low | `deep: false` means computed only re-evaluates on reference change. Measure. |
| **NEW:** Storage event listener memory leak | Medium | Use `onScopeDispose()` for cleanup or move to a Nuxt plugin. |
| **NEW:** localStorage JSON.parse blocks main thread on mobile | Medium | Accept for 500KB; wrap writes in `requestIdleCallback`; consider IndexedDB if data grows. |
| **NEW:** Manual refresh returns cached data | High (if unfixed) | Use `ctx.cause === 'refresh:manual'` check in `getCachedData`. |
| **NEW:** Cache schema drift after future changes | Low | Add `version` field to cache entry for graceful invalidation. |
| **NEW:** Shared key consistency violation with `useArticleStream` | Medium | Verify `useArticleStream` uses a different key or identical options. |

## Testing Plan

- [ ] Unit test: `normalizeSummaryDocs` produces `_publishedAtMs` and `_processedAtMs`
- [ ] Unit test: `readLocalCache` returns null for missing/corrupt/invalid data
- [ ] Unit test: `writeLocalCache` handles quota exceeded without throwing
- [ ] Unit test: `useSortOptions` sort with pre-computed timestamps matches existing behavior
- [ ] Unit test: `getCachedData` returns undefined for `ctx.cause === 'refresh:manual'`
- [ ] Unit test: `getCachedData` returns cached data for `ctx.cause === 'initial'` and `'watch'`
- [ ] Integration: navigation between `/summaries` and `/channels/[slug]` reuses cached data
- [ ] Manual: verify skeleton revalidation UX appears and disappears correctly
- [ ] Manual: verify private browsing mode degrades gracefully
- [ ] Manual: verify multi-tab sync via storage event
- [ ] Manual: verify manual refresh fetches fresh data even with warm cache
- [ ] Manual: verify storage event listener does not leak across navigations

## Implementation Order

1. **Phase 1:** `getCachedData` + `deep: false` in `useContentStream.ts` (~5 lines, biggest impact)
2. **Phase 2:** Normalization hoist + timestamp pre-compute + `Sortable` interface update
3. **Phase 3:** localStorage Tier 1 cache in `useSummariesData.ts`
4. **Phase 4:** Skeleton revalidation UX in `DateGroupedFeed.vue` + page integration

Phases 1-2 can ship independently. Phase 3-4 are coupled and should ship together.

## Files to Modify

| File | Phase | Changes |
|---|---|---|
| `src/composables/useContentStream.ts` | 1 | Add `getCachedData` (3-param with `ctx.cause` check), `deep: false` to `useAsyncData` |
| `src/composables/useSummariesData.ts` | 2, 3 | Computed normalization, pre-compute timestamps, localStorage read/write, `isRevalidating` ref, storage event listener with cleanup |
| `src/composables/useSortOptions.ts` | 2 | Use `_publishedAtMs` / `_processedAtMs` in sort comparisons, update `Sortable` interface |
| `src/composables/useDateGroups.ts` | 2 | Use pre-computed timestamps with fallback |
| `src/components/content/DateGroupedFeed.vue` | 4 | Accept `revalidating` prop, prepend skeletons with `role="status"` + `aria-live="polite"` |
| `src/pages/summaries/index.vue` | 4 | Destructure `isRevalidating`, pass to `DateGroupedFeed` |
| `src/pages/channels/[slug].vue` | 4 | Destructure `isRevalidating`, pass to `DateGroupedFeed` |
| `src/pages/playlists/[slug].vue` | 4 | Destructure `isRevalidating`, pass to `DateGroupedFeed` |

## Sources & References

### Internal References

- `src/composables/useContentStream.ts` -- current `useAsyncData` call without `getCachedData`
- `src/composables/useSummariesData.ts` -- current normalization via `shallowRef` + `watch`
- `docs/solutions/logic-errors/nuxt-content-reactivity-and-ssr-patterns.md` -- context on why shallowRef was used; confirms removal is safe with `deep: false`
- AIC-40 -- prior optimization that reduced payload size via `select()`

### External References

- [Nuxt 4 `useAsyncData` docs](https://nuxt.com/docs/4.x/api/composables/use-async-data) -- `getCachedData(key, nuxtApp, ctx)` with `ctx.cause` field
- [Nuxt 4 upgrade guide](https://nuxt.com/docs/4.x/getting-started/upgrade) -- getCachedData signature change
- [Nuxt 4 experimental features](https://nuxt.com/docs/4.x/guide/going-further/experimental-features) -- `granularCachedData` flag
- [GitHub #25901](https://github.com/nuxt/nuxt/issues/25901) -- `deep: false` shallowRef behavior nuance
- [MDN: Window storage event](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event) -- storage event does not fire in the same tab
- [MDN: Storage quotas](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) -- localStorage limits
- [Adrian Roselli: More Accessible Skeletons](https://adrianroselli.com/2020/11/more-accessible-skeletons.html) -- `role="status"` + `aria-live` pattern
- [Carbon Design System: Loading Pattern](https://carbondesignsystem.com/patterns/loading-pattern/) -- skeleton vs spinner guidelines
- [Vue 3.5 reactivity improvements](https://vuejs.org/api/reactivity-advanced.html) -- shallowRef performance characteristics

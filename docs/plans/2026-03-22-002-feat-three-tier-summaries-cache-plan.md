---
title: "feat: Three-tier summaries cache to eliminate redundant re-fetches"
type: feat
status: active
date: 2026-03-22
linear: AIC-41
---

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
  getCachedData: (key, nuxtApp) =>
    nuxtApp.payload.data[key] ?? nuxtApp.static.data[key] ?? undefined
})
```

**Why `deep: false`:** The data array is replaced wholesale on every fetch (never mutated in place). Deep reactivity watches every nested property for changes, which is wasted CPU on a 1200-item array. `deep: false` uses reference equality, which is correct here since `normalizeSummaryDocs` always returns a new array.

**Nuxt 4 note:** Nuxt 4 changed the `getCachedData` signature to include a `ctx` parameter: `(key, nuxtApp, ctx)`. The `ctx.cause` field (`'initial' | 'refresh:hook' | 'refresh:manual' | 'watch'`) can be used to bypass cache on manual refresh. For Phase 1, we return cached data regardless of cause. Phase 3 may refine this.

**Acceptance criteria:**
- [ ] `getCachedData` returns payload/static data when available
- [ ] `deep: false` set on the `useAsyncData` options
- [ ] Navigating from `/summaries` to `/channels/[slug]` and back does NOT trigger a new network request
- [ ] Manual `refresh()` still fetches fresh data (Nuxt skips `getCachedData` when `dedupe: 'cancel'` is used with refresh)

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
  window.addEventListener('storage', (e) => {
    if (e.key === CACHE_KEY && e.newValue) {
      try {
        const entry: SummariesCacheEntry = JSON.parse(e.newValue)
        if (entry.data) {
          const nuxtApp = useNuxtApp()
          nuxtApp.payload.data['summaries-list'] = entry.data
        }
      } catch {
        // Ignore corrupt cross-tab data
      }
    }
  })
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
    <div v-if="revalidating" class="flex flex-col gap-5" aria-busy="true" aria-label="Checking for new content">
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

### Integration Test Scenarios

1. Navigate `/summaries` -> `/channels/fireship` -> `/summaries` -- second load should be instant (no network request)
2. Open app with cold localStorage, navigate around, close tab, reopen -- data should load instantly from localStorage
3. Open two tabs, let one revalidate -- second tab should pick up fresh data via storage event
4. Clear localStorage + Nuxt payload cache, navigate -- should fall through to server fetch normally
5. Test in private/incognito mode -- localStorage fails silently, app works normally via Tier 2/3

## Dependencies & Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| `deep: false` breaks downstream reactivity | Low | Data is replaced wholesale, never mutated. Verify with existing test suite. |
| localStorage quota exceeded on mobile | Low | 500KB is well within limits. try/catch handles gracefully. |
| `getCachedData` signature change in Nuxt 4 | Confirmed | Use 3-param signature `(key, nuxtApp, ctx)` per Nuxt 4 docs. |
| Pre-computed timestamps break Sortable consumers | Low | Fields are optional (`_publishedAtMs?: number`), backward compatible. |
| Normalization in computed vs watch causes perf regression | Low | `deep: false` means computed only re-evaluates on reference change. Measure. |

## Testing Plan

- [ ] Unit test: `normalizeSummaryDocs` produces `_publishedAtMs` and `_processedAtMs`
- [ ] Unit test: `readLocalCache` returns null for missing/corrupt/invalid data
- [ ] Unit test: `writeLocalCache` handles quota exceeded without throwing
- [ ] Unit test: `useSortOptions` sort with pre-computed timestamps matches existing behavior
- [ ] Integration: navigation between `/summaries` and `/channels/[slug]` reuses cached data
- [ ] Manual: verify skeleton revalidation UX appears and disappears correctly
- [ ] Manual: verify private browsing mode degrades gracefully
- [ ] Manual: verify multi-tab sync via storage event

## Implementation Order

1. **Phase 1:** `getCachedData` + `deep: false` in `useContentStream.ts` (~5 lines, biggest impact)
2. **Phase 2:** Normalization hoist + timestamp pre-compute + `Sortable` interface update
3. **Phase 3:** localStorage Tier 1 cache in `useSummariesData.ts`
4. **Phase 4:** Skeleton revalidation UX in `DateGroupedFeed.vue` + page integration

Phases 1-2 can ship independently. Phase 3-4 are coupled and should ship together.

## Files to Modify

| File | Phase | Changes |
|---|---|---|
| `src/composables/useContentStream.ts` | 1 | Add `getCachedData`, `deep: false` to `useAsyncData` |
| `src/composables/useSummariesData.ts` | 2, 3 | Computed normalization, pre-compute timestamps, localStorage read/write, `isRevalidating` ref |
| `src/composables/useSortOptions.ts` | 2 | Use `_publishedAtMs` / `_processedAtMs` in sort comparisons, update `Sortable` interface |
| `src/composables/useDateGroups.ts` | 2 | Use pre-computed timestamps with fallback |
| `src/components/content/DateGroupedFeed.vue` | 4 | Accept `revalidating` prop, prepend skeletons |
| `src/pages/summaries/index.vue` | 4 | Destructure `isRevalidating`, pass to `DateGroupedFeed` |
| `src/pages/channels/[slug].vue` | 4 | Destructure `isRevalidating`, pass to `DateGroupedFeed` |
| `src/pages/playlists/[slug].vue` | 4 | Destructure `isRevalidating`, pass to `DateGroupedFeed` |

## Sources & References

### Internal References

- `src/composables/useContentStream.ts` -- current `useAsyncData` call without `getCachedData`
- `src/composables/useSummariesData.ts` -- current normalization via `shallowRef` + `watch`
- `docs/solutions/logic-errors/nuxt-content-reactivity-and-ssr-patterns.md` -- context on why shallowRef was used
- AIC-40 -- prior optimization that reduced payload size via `select()`

### External References

- Nuxt 4 `useAsyncData` docs: `getCachedData(key, nuxtApp, ctx)` with `ctx.cause` field
- Nuxt 4 default `getCachedData`: `nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key]`
- Nuxt 4 `deep: false` is the new default; explicit `deep: false` ensures intent is clear

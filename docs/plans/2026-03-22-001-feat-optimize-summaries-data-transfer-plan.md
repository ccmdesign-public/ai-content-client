---
title: "feat: Optimize summaries data transfer -- exclude body from list queries & disable prefetch"
type: feat
status: completed
date: 2026-03-22
---

## Enhancement Summary

**Deepened on:** 2026-03-22
**Sections enhanced:** 7 (Problem Statement, Fix 1-4, Technical Approach, Risks)
**Research sources:** Nuxt Content v3 docs (Context7), GitHub discussions (#3008, #2955), Nuxt 4 performance best practices, project solution files, codebase analysis of `content.config.ts` and existing `select()` usage

### Key Improvements
1. **Resolved Open Question #1:** `select('metadata')` confirmed to work for nested Zod objects stored as JSON blobs -- proven by existing `index.vue` line 19 which uses `select('featuredPicks', 'quickLinks')` on equally-nested `z.array(z.object(...))` fields successfully
2. **Added `prefetchOn: 'interaction'` alternative** to Fix 2, preserving some prefetch benefit while eliminating 404 spam
3. **Added Nuxt 3.17+ shared refs insight** to Fix 3 -- same `useAsyncData` key automatically shares the same ref object across all callers, reducing memory overhead further
4. **Discovered `useNuxtData` pattern** as a lighter alternative for accessing cached data without re-triggering fetches
5. **Added metadata JSON.parse consistency warning** from project learning -- the shared composable must handle the `typeof metadata === 'string'` edge case

### New Considerations Discovered
- SQLite JSON blob size limits (~52K YAML / ~33K Markdown) could become relevant as content grows
- `useSummariesData` must not be called inside SSR singleton scope without request-scoped isolation
- The `published` field must be included in `SUMMARY_LIST_FIELDS` because `useContentStream` filters on it (line 79)
- Search results rendered via `SummaryCard` also lose prefetch -- acceptable but should be documented

---

# feat: Optimize summaries data transfer -- exclude body from list queries & disable prefetch

## Overview

Switching between channels and other filtered views has a ~1s delay because every list view fetches all 1200+ summary documents including their full markdown `body` (~3-5MB), then filters client-side. Additionally, Nuxt auto-prefetches visible NuxtLink targets, causing 25+ transcript 404s per page load.

This plan addresses four optimizations in priority order: (1) exclude `body` from list queries via `select`, (2) disable NuxtLink prefetching on SummaryCard, (3) shared data cache across routes, and (4) notes on future server-side filtered queries.

## Problem Statement

**Root cause:** `useContentStream('summaries')` calls `queryCollection('summaries').all()` which returns all documents including `body` (rendered markdown). This full payload (~3-5MB) is transferred over HTTP on every cross-route navigation.

**Secondary issue:** Nuxt auto-prefetches visible NuxtLink targets. With 25 visible summary cards, each triggers a detail page prefetch that tries to load transcript JSON files. Most transcripts don't exist, generating 404 spam in the network tab and wasting bandwidth.

**Context from prior work:**
- AIC-38 fixed channel navigation bugs by switching to `channelId`-based filtering, but data transfer remains unchanged since `useContentStream` still fetches everything.
- AIC-39 added client-side pagination via `usePagination`, which fixed rendering performance but not network payload.
- The solutions doc `nuxt-content-reactivity-and-ssr-patterns.md` confirms that `useContentStream` wraps `queryCollection().all()` and filters client-side -- the `where` clause is applied in JS after the full fetch.

### Research Insights

**Nuxt Content v3 SQLite architecture:**
- Nuxt Content v3 uses SQLite as its query backend. Nested Zod objects (`z.object(...)` inside schema) are stored as JSON blobs in single columns. The `select()` method operates at the SQL `SELECT` level, choosing which columns to return.
- Confirmed via [GitHub Discussion #3008](https://github.com/nuxt/content/discussions/3008): nested field dot-notation (`metadata.channelId`) does NOT work in `where()` clauses. However, `select('metadata')` returns the entire JSON blob column, which is then parsed back to an object by the content layer.
- Confirmed via codebase: `src/pages/index.vue` line 19 already uses `queryCollection('newsletters').select('featuredPicks', 'quickLinks')` where both fields are `z.array(z.object(...))` -- equally nested structures that work correctly with `select()`.

**Payload size context:**
- With 1200+ summaries, the `body` field (rendered Markdown AST) dominates payload. Each summary body averages 2-4KB of serialized AST, totaling 2.4-4.8MB.
- The `ai` field (processing metrics) adds ~200 bytes each = ~240KB total.
- The `metadata` field averages ~300 bytes each = ~360KB total.
- Selecting only list fields should yield ~400-600KB total.

**References:**
- [queryCollection API docs](https://content.nuxt.com/docs/utils/query-collection)
- [GitHub Discussion #3008: nested values](https://github.com/nuxt/content/discussions/3008)
- [Array field challenges in Nuxt Content v3](https://zhul.in/en/2025/10/20/nuxt-content-v3-z-array-query-challenge/)

## Proposed Solution

### Fix 1: Add `select` to `useContentStream` for list views (high impact, low effort)

**Approach:** Add a `select` parameter to `useContentStream` calls on all list pages so that only the fields needed by `SummaryCard` are transferred.

**Fields needed by SummaryCard** (from `src/components/content/SummaryCard.vue`):
- `metadata` (nested: `videoId`, `title`, `channel`, `channelId`, `publishedAt`, `thumbnailUrl`, `youtubeUrl`)
- `processedAt` (used by sort/date-grouping)
- `tldr` (rendered in card)
- `playlistId` (used by playlist page filter and `useSummariesFilter`)
- `path` (used by content routing)
- `tools` (used by tools index cross-reference)

**Fields to exclude:** `body`, `ai`, `seo`, `navigation`, `description`, `meta`, `id`, `stem`

**Expected payload reduction:** ~5MB down to ~500KB (10x improvement).

**How `useContentStream` already supports this:** Line 85 of `useContentStream.ts` already applies `select` client-side via `pick()`:

```ts
if (options.select?.length) docs = docs.map(d => pick(d, options.select as string[]))
```

However, this picks fields *after* fetching the full payload. To get true network-level reduction, the `select` must be pushed down to `queryCollection().select()` before `.all()`.

### Research Insights (Fix 1)

**`select('metadata')` confirmed to work:**
The existing `index.vue` proves that `select()` works with nested Zod object fields stored as JSON blobs. The `featuredPicks` field is `z.array(z.object({...}))` -- structurally identical to `metadata` which is `z.object({...})`. Both are stored as JSON blob columns in SQLite. The `select()` call returns the entire column, and the content layer deserializes the JSON back into an object.

**Critical: `published` field must be in the select list:**
`useContentStream.ts` line 79 filters on `d.published !== false`. If `published` is not in the selected fields, this filter silently passes all documents (since `undefined !== false` is `true`). This is correct behavior for summaries (they are all published), but the field should still be included for correctness and to prevent a subtle bug if draft summaries are ever added.

**`body` is a special Nuxt Content field:**
For `page`-type collections, `body` contains the rendered Markdown AST (not raw markdown). It is always present in `.all()` results. The `select()` method can exclude it by simply not listing it. There is no need for a `without()` or `exclude()` API.

**Performance note -- SQL vs. client-side select:**
When `select()` is pushed to `queryCollection`, the SQLite query becomes `SELECT metadata, processedAt, tldr, ... FROM summaries` instead of `SELECT * FROM summaries`. This reduces:
1. SQLite I/O (fewer bytes read from disk)
2. JSON serialization cost (smaller response body)
3. Network transfer (smaller HTTP payload)
4. Vue reactivity tracking (fewer properties to observe)
5. Nuxt payload hydration (smaller `__NUXT_DATA__` in SSR)

### Fix 2: Disable NuxtLink prefetching on SummaryCard (low effort)

**Approach:** Add `:prefetch="false"` to all `<NuxtLink>` elements in `SummaryCard.vue`. The card has two NuxtLinks:
1. Channel link: `/channels/${summary.metadata.channel}`
2. Detail link: `/summaries/${summary.metadata.videoId}`

The detail link is the primary offender -- it prefetches the summary detail page, which triggers a `queryCollection` call for the single document plus a transcript JSON fetch. With 25 visible cards, that's 25 prefetch requests.

### Research Insights (Fix 2)

**Alternative: `prefetchOn: 'interaction'` (Nuxt 4):**
Instead of fully disabling prefetch, Nuxt 4 supports `experimental.defaults.nuxtLink.prefetchOn` set to `'interaction'`. This prefetches only when the user hovers or focuses the link, rather than when it enters the viewport. This preserves some navigation speed benefit while eliminating the 25-simultaneous-prefetch storm.

Per-link override:
```vue
<NuxtLink :to="..." :prefetch-on="'interaction'">
```

Global config alternative (in `nuxt.config.ts`):
```ts
experimental: {
  defaults: {
    nuxtLink: {
      prefetchOn: { interaction: true, visibility: false }
    }
  }
}
```

**Recommendation:** Use per-link `:prefetch="false"` as planned for the detail link (the 404 source), but consider `:prefetch-on="'interaction'"` for the channel link (which is a valid page and would benefit from prefetch on hover).

**Impact on search results:**
`SummaryCard` is also rendered in search results (via `useSearch`). Disabling prefetch there is acceptable since search result navigation is user-initiated and fast.

**References:**
- [Nuxt 4 Performance Best Practices](https://nuxt.com/docs/4.x/guide/best-practices/performance)
- [NuxtLink prefetch deep dive](https://deltener.com/blog/a-deep-dive-into-the-nuxt-link-component/)

### Fix 3: Shared data cache across routes (medium effort)

**Approach:** Ensure all list views share a single cached copy of the summaries data, preventing re-fetches on cross-route navigation.

Currently, `useContentStream('summaries')` generates a cache key like `content:summaries:{...options}`. When options differ across pages (different `where`, `key`, `select`), each page creates its own cache entry. The channel page uses `useContentStream('summaries')` with no where clause and filters in a computed, so it and the index page share the same key -- good. But the playlist page uses a different key (`playlist-summaries-${slug}`), causing a separate fetch.

Options:
- **Option A (recommended):** Create a `useSummariesData` composable that all list views call. It fetches the summaries collection once (with `select`) and returns a shared reactive reference. Individual pages compose on top with their own computed filters.
- **Option B:** Use a Pinia store to cache the fetched data. Heavier but gives explicit cache control and devtools visibility.

### Research Insights (Fix 3)

**Nuxt 3.17+ shared refs (critical insight):**
Since Nuxt 3.17, `useAsyncData` calls with the same key automatically share the same ref object (not just the same data). This means `useSummariesData()` called from `/summaries` and `/channels/[slug]` will literally return the same reactive ref -- zero extra memory, zero duplication. This is a significant improvement over earlier Nuxt versions where each call created independent ref objects even with the same key.

Source: [Nuxt data layer rewrite -- 5 new features](https://masteringnuxt.com/blog/nuxts-data-layer-has-been-rewritten-5-new-features-you-need-to-know)

**`useNuxtData` for read-only access:**
Pages that only need to read the cached summaries (not trigger fetches) can use `useNuxtData('summaries-list')` instead. This returns a read-only ref to the cached data without registering a new fetch handler. Useful for components like search results or sidebar widgets that should use cached data if available but not trigger a fetch if it is not.

Source: [useNuxtData docs](https://nuxt.com/docs/4.x/api/composables/use-nuxt-data)

**SSR singleton warning:**
In SSR, composables called at module scope (outside `setup()`) create singletons shared across all requests. The `useSummariesData` composable must only be called inside `<script setup>` or within `setup()` functions, never at module top-level. This is standard Nuxt practice but worth noting since the composable is intended to be shared.

Source: [Vue state management -- SSR caveats](https://vuejs.org/guide/scaling-up/state-management.html)

**Metadata JSON.parse consistency (from project learning):**
The project solution file `nuxt-content-reactivity-and-ssr-patterns.md` documents that `metadata` may arrive as a JSON string in some code paths. The computed filters in channel/playlist pages must use defensive parsing:

```ts
const meta = typeof s.metadata === 'string' ? JSON.parse(s.metadata) : s.metadata
```

This pattern is already used in `useTagIndex.ts` and was documented as a fix in PR #20. The `useSummariesData` composable should normalize metadata in its pipeline to avoid every consumer needing this guard.

**Option A enhancement -- normalize in the composable:**
```ts
export function useSummariesData() {
  const result = useContentStream('summaries', {
    select: SUMMARY_LIST_FIELDS,
    key: 'summaries-list'
  })

  // Normalize metadata JSON strings once, not in every consumer
  const data = computed(() => {
    if (!result.data.value) return null
    return result.data.value.map(doc => ({
      ...doc,
      metadata: typeof doc.metadata === 'string' ? JSON.parse(doc.metadata) : doc.metadata
    }))
  })

  return { ...result, data }
}
```

### Fix 4: Server-side filtered queries (medium effort, currently blocked)

**Status:** Currently blocked because `queryCollection().where()` does not work reliably for nested JSON fields like `metadata.channelId` (Nuxt Content v3 stores nested Zod objects as JSON blobs in SQLite). The solutions doc confirms this limitation.

**Future path:** Either flatten `channelId` to a top-level schema field in `content.config.ts`, or create a custom server API route with raw SQLite `json_extract()`. This is out of scope for this PR but noted for follow-up.

### Research Insights (Fix 4)

**Schema flattening is the recommended path:**
Per [GitHub Discussion #3008](https://github.com/nuxt/content/discussions/3008), the Nuxt Content team recommends flattening nested fields to top-level schema properties when you need to query on them. The migration would be:

```ts
// content.config.ts -- future schema change
schema: z.object({
  metadata: videoMetadataSchema,
  // Promoted for queryability:
  channelId: z.string(),      // duplicated from metadata.channelId
  videoId: z.string(),         // duplicated from metadata.videoId
  publishedAt: z.string(),     // duplicated from metadata.publishedAt
  // ... rest unchanged
})
```

This would enable `queryCollection('summaries').where('channelId', '=', 'fireship')` at the SQL level, making Fix 3's fetch-all-then-filter unnecessary for channel pages.

**SQLite `json_extract()` alternative:**
A custom server API route could use raw SQL:
```sql
SELECT * FROM summaries WHERE json_extract(metadata, '$.channelId') = ?
```
This avoids schema changes but bypasses the Nuxt Content query layer and its type safety. Not recommended unless schema flattening has unacceptable migration cost.

**SQLite JSON blob size limits (new risk):**
Per [GitHub Issue #3233](https://github.com/nuxt/content/issues/3233), SQLite errors can occur with larger content stored as JSON strings, with limits around 52K characters for YAML and 33K for Markdown. With 1200+ summaries, individual document sizes should be monitored.

## Technical Approach

### Step 1: Push `select` down to `queryCollection` in `useContentStream`

**File:** `src/composables/useContentStream.ts`

Modify the `useAsyncData` handler to call `.select()` on the `queryCollection` builder when `options.select` is provided, before calling `.all()`. This pushes field selection to the SQL layer, reducing the HTTP payload.

```ts
// Current (line 77):
: await queryCollection(source as any).all()

// New:
: options.select?.length
  ? await queryCollection(source as any).select(...options.select).all()
  : await queryCollection(source as any).all()
```

Keep the existing client-side `pick()` fallback (line 85) for `queryContent()` path queries where server-side select may not be available. But skip the redundant client-side pick when `queryCollection` already selected:

```ts
// Only apply client-side pick for path-based queries (queryContent)
if (options.select?.length && isPath) docs = docs.map(d => pick(d, options.select as string[]))
```

**Acceptance criteria:**
- [ ] `queryCollection().select()` is called when `options.select` is provided
- [ ] `queryContent()` path still uses client-side `pick()` fallback
- [ ] No regression in existing list views or detail pages

**Risk:** `queryCollection().select()` may not support nested fields like `metadata` as a whole object. If it only supports top-level scalar fields, the nested `metadata` object may be excluded. Need to verify whether `select('metadata')` returns the full nested object or nothing.

**Mitigation:** If `select('metadata')` does not work at the SQL level, fall back to excluding only known-heavy fields. The `body` field is the biggest payload contributor -- even excluding just `body` via a `without` approach (if available) would achieve most of the benefit.

**Alternative if `select` doesn't support nested objects:** Instead of pushing `select` to `queryCollection`, use `queryCollection().all()` and strip `body` client-side immediately after fetch. This still transfers the full payload but at least prevents Vue from tracking the `body` field reactively, reducing memory usage:

```ts
docs = docs.map(({ body, ai, seo, navigation, description, meta, ...rest }) => rest)
```

This is a weaker optimization (no network savings) but still reduces reactive overhead. The true fix would require schema changes (flattening metadata fields to top-level).

### Research Insights (Step 1)

**Verification strategy -- test `select('metadata')` before implementing:**
Create a quick test script or add a temporary debug route:

```ts
// Temporary: src/pages/debug-select.vue (remove before PR)
const { data } = await useAsyncData('debug-select', () =>
  queryCollection('summaries')
    .select('metadata', 'path', 'tldr')
    .first()
)
console.log('metadata type:', typeof data.value?.metadata)
console.log('metadata value:', data.value?.metadata)
```

If `metadata` comes back as a parsed object, proceed with the plan. If it comes back as `null` or a raw string, implement the fallback.

**Confidence level:** High. The `index.vue` already uses `select('featuredPicks', 'quickLinks')` on `z.array(z.object({...}))` fields in the `newsletters` collection -- same storage mechanism (JSON blob column). The `metadata` field (`z.object({...})`) is structurally simpler and should work identically.

**Edge case -- `select` and `queryCollection` type safety:**
The current `declare const queryCollection` type annotation (line 20) is untyped (`(name: string) => any`). The `.select()` method accepts `keyof Collection` according to the docs, which means passing field names as strings. Since the declaration returns `any`, TypeScript will not catch invalid field names. Consider adding a comment noting this limitation for future type-tightening.

### Step 2: Add `select` to list view `useContentStream` calls

**Files to modify:**

| File | Current call | New call |
|------|-------------|----------|
| `src/pages/summaries/index.vue` | `useContentStream('summaries')` | `useContentStream('summaries', { select: LIST_FIELDS })` |
| `src/pages/channels/[slug].vue` | `useContentStream('summaries')` | `useContentStream('summaries', { select: LIST_FIELDS })` |
| `src/pages/playlists/[slug].vue` | `useContentStream('summaries', { where: ..., key: ... })` | `useContentStream('summaries', { where: ..., key: ..., select: LIST_FIELDS })` |

**`tags/[slug].vue`** uses `useTagIndex` which has its own `queryCollection` call -- out of scope for this step.

**Shared field list constant:**

Create a shared constant to avoid duplication:

```ts
// src/composables/useContentStream.ts (or a new constants file)
export const SUMMARY_LIST_FIELDS = [
  'metadata', 'processedAt', 'tldr', 'playlistId', 'path', 'tools',
  'playlistName', 'category', 'source', 'published'
] as const
```

**Acceptance criteria:**
- [ ] All three list pages pass `select` with only the fields SummaryCard needs
- [ ] Sort, filter, pagination, and date-grouping all work correctly with the reduced field set
- [ ] Detail pages (`/summaries/[slug]`) are NOT affected (they need `body`)
- [ ] `useSummariesFilter` still works (it uses `metadata.channelId` for category filtering)

### Research Insights (Step 2)

**`SUMMARY_LIST_FIELDS` must include `published`:**
`useContentStream.ts` line 79 runs `docs.filter(d => d.published !== false)`. If `published` is excluded from the `select` list, the field will be `undefined` on returned docs. Since `undefined !== false` evaluates to `true`, all documents pass the filter -- correct for now (all summaries are published), but this creates a latent bug. If a draft summary is ever added to the content directory, it would appear in list views.

The plan already includes `'published'` in the constant. This note is to ensure it is never removed during future refactoring.

**Cache key impact of adding `select`:**
The auto-generated cache key in `useContentStream` includes `JSON.stringify(options)`. Adding `select` to options changes the key, which means the first navigation after deployment will not hit the old cache. This is correct behavior but worth noting -- there is no cache migration concern.

**`useSortedFeed` compatibility:**
The `useSortedFeed` composable sorts by `processedAt`, `metadata.publishedAt`, and `metadata.title`. All three fields are preserved in the selected fields. No compatibility issue.

### Step 3: Disable NuxtLink prefetching in SummaryCard

**File:** `src/components/content/SummaryCard.vue`

Add `:prefetch="false"` to both NuxtLink elements:

```vue
<!-- Channel link (line 36) -->
<NuxtLink
  :to="`/channels/${summary.metadata.channel}`"
  :prefetch="false"
  ...
>

<!-- Detail link (line 54) -->
<NuxtLink
  :to="`/summaries/${summary.metadata.videoId}`"
  :prefetch="false"
  ...
>
```

**Acceptance criteria:**
- [ ] No prefetch requests fire for visible summary cards
- [ ] 404 spam for transcript JSON files is eliminated
- [ ] Navigation to detail pages still works (just loads on click instead of prefetch)

### Research Insights (Step 3)

**Granular approach -- differentiate channel vs. detail links:**
The channel link points to a valid page that loads quickly (it uses the shared summaries cache). The detail link is the 404 source (transcript JSON). A more nuanced approach:

```vue
<!-- Channel link: prefetch on hover (fast, no 404 risk) -->
<NuxtLink
  :to="`/channels/${summary.metadata.channel}`"
  :prefetch-on="{ interaction: true, visibility: false }"
>

<!-- Detail link: no prefetch (404 risk from transcript) -->
<NuxtLink
  :to="`/summaries/${summary.metadata.videoId}`"
  :prefetch="false"
>
```

This preserves some UX benefit for channel navigation while eliminating the 404 problem.

**Nuxt 4 global default as alternative:**
If the team wants to disable viewport-based prefetching site-wide:
```ts
// nuxt.config.ts
experimental: {
  defaults: {
    nuxtLink: {
      prefetchOn: { interaction: true, visibility: false }
    }
  }
}
```
This would affect all NuxtLink instances, not just SummaryCard. Consider this as a broader performance improvement in a separate follow-up.

**Measuring impact:**
After deploying, check the Network tab waterfall. Before: 25+ requests on page load from prefetch. After: 0 requests until user clicks/hovers. The transcript 404s should be completely eliminated.

### Step 4: Shared summaries data composable (Fix 3)

**File:** `src/composables/useSummariesData.ts` (new)

Create a thin wrapper around `useContentStream` that all list pages share. This ensures a single fetch and cache entry regardless of which list view loads first.

```ts
export function useSummariesData() {
  return useContentStream('summaries', {
    select: SUMMARY_LIST_FIELDS,
    key: 'summaries-list'
  })
}
```

All list pages switch from `useContentStream('summaries', ...)` to `useSummariesData()`, then apply their own computed filters on top.

**Channel page pattern:**

```ts
const { data: allSummaries, error, refresh } = useSummariesData()
const summaries = computed(() => {
  if (!allSummaries.value || !channelConfig.value) return []
  return allSummaries.value.filter(s => s.metadata?.channelId === channelConfig.value.id)
})
```

**Playlist page pattern:**

```ts
const { data: allSummaries, pending, error, refresh } = useSummariesData()
const summaries = computed(() => {
  if (!allSummaries.value || !playlist.value) return []
  return allSummaries.value.filter(s => s.playlistId === playlist.value.id)
})
```

**Key benefit:** When navigating from `/summaries` to `/channels/fireship`, the data is already cached by `useAsyncData` under the key `summaries-list`. No re-fetch occurs. The computed filter runs instantly on the cached data.

**Tradeoff:** The playlist page currently only fetches matching summaries (via function-based `where`). Switching to fetch-all-then-filter means it fetches more data than needed. At ~500KB (with select), this is acceptable. True server-side filtering (Fix 4) would optimize this further but is blocked.

**Acceptance criteria:**
- [ ] All list views use the same `useSummariesData()` composable
- [ ] Cross-route navigation does not re-fetch summaries data
- [ ] Filter, sort, pagination all work correctly on the shared data
- [ ] `useAsyncData` key is stable and shared across pages

### Research Insights (Step 4)

**Nuxt 3.17+ shared refs eliminate duplication:**
With shared refs (Nuxt 3.17+), calling `useSummariesData()` from multiple pages returns the exact same ref object for `data`, `pending`, `error`, and `status`. This means:
- No memory duplication -- one ref, multiple consumers
- Automatic consistency -- updating from one page updates all
- `refresh()` from any page refreshes the shared data

This makes Option A (composable) strictly better than Option B (Pinia) for this use case, since the built-in behavior already provides what Pinia would add.

**`useNuxtData` for lightweight reads:**
Components that want to check if summaries are cached without triggering a fetch can use:
```ts
const { data: cachedSummaries } = useNuxtData('summaries-list')
```
This returns a read-only ref and does not register a fetch handler. Useful for search result components or sidebar widgets.

**Metadata normalization should live in the composable:**
Per the project learning in `nuxt-content-reactivity-and-ssr-patterns.md`, `metadata` may arrive as a JSON string in some execution paths. Rather than requiring every consumer to handle this, normalize once in `useSummariesData`:

```ts
export function useSummariesData() {
  const result = useContentStream('summaries', {
    select: SUMMARY_LIST_FIELDS,
    key: 'summaries-list'
  })

  const data = computed(() => {
    if (!result.data.value) return null
    return result.data.value.map(doc => ({
      ...doc,
      metadata: typeof doc.metadata === 'string' ? JSON.parse(doc.metadata) : doc.metadata
    }))
  })

  return { ...result, data }
}
```

**Edge case -- `refresh()` and stale computed:**
When `refresh()` is called, the underlying `data` ref updates. All computed properties derived from it (channel filters, playlist filters) automatically recompute. However, if the user is on a channel page and new summaries are added to the collection, `refresh()` must be called explicitly -- there is no automatic polling. Consider adding `watch` on `route.path` to call `refresh()` on navigation, or rely on Nuxt's built-in `refreshOnWindowFocus` (disabled by default).

**SSR hydration: ensure consistent key:**
The key `'summaries-list'` must be identical in SSR and client. Since it is hardcoded (not derived from route params), this is safe. But if the key were ever made dynamic, hydration mismatches could occur. Add a comment in the composable noting this constraint.

### Step 5: Verify and test

**Manual testing checklist:**
- [ ] `/summaries` loads with reduced payload (check Network tab -- response should be ~500KB, not ~5MB)
- [ ] `/channels/[slug]` filters correctly from cached data
- [ ] `/playlists/[slug]` filters correctly from cached data
- [ ] Sort changes work (date, title, processed date)
- [ ] Category filter on `/summaries` works
- [ ] "Load More" pagination works on all views
- [ ] No 404 spam in Network tab for transcript JSON files
- [ ] Detail page (`/summaries/[slug]`) still renders full content with body
- [ ] SSR build succeeds (`pnpm run build`)
- [ ] No hydration warnings in console

**Automated tests:**
- [ ] Existing `useSortedFeed` tests pass unchanged
- [ ] Existing `usePagination` tests pass unchanged
- [ ] Add test for `useSummariesData` composable (returns data, shares cache key)

### Research Insights (Step 5)

**Additional manual testing items:**
- [ ] Verify `metadata` fields are fully populated (not `null` or raw string) on all list views after `select` change
- [ ] Check `__NUXT_DATA__` payload size in SSR response (view page source, search for `__NUXT_DATA__`) -- should be ~500KB, not ~5MB
- [ ] Test deep-linking to `/channels/fireship` directly (cold cache) -- should fetch once and display correctly
- [ ] Test deep-linking to `/playlists/[slug]` directly (cold cache) -- should fetch all summaries, then filter
- [ ] Verify `useSearch` results still render correctly with `SummaryCard` (search uses its own data source, not `useSummariesData`)

**Performance benchmarking:**
- Use Chrome DevTools Performance tab to compare before/after:
  - Time to Interactive (TTI) on `/summaries`
  - Network transfer size on initial load
  - Network transfer size on cross-route navigation
  - Memory usage (Vue devtools > Performance > Memory)
- Target: cross-route navigation should feel instant (<100ms perceived delay)

**Automated test for `useSummariesData`:**
```ts
// src/tests/composables/useSummariesData.test.ts
import { describe, it, expect, vi } from 'vitest'

describe('useSummariesData', () => {
  it('returns data with selected fields only', () => {
    // Verify returned docs do not contain 'body', 'ai', 'seo'
  })

  it('normalizes metadata from JSON string to object', () => {
    // Mock a doc with metadata as string, verify it comes back as object
  })

  it('uses stable cache key "summaries-list"', () => {
    // Verify the composable always uses the same key
  })
})
```

## System-Wide Impact

### Interaction Graph
- `useContentStream` is used by summaries, channels, playlists list views, and also by `useArticleStream.ts` and `useSearch.ts`. The `select` enhancement to `useContentStream` is additive (only applies when `options.select` is provided), so existing callers are unaffected.
- `SummaryCard` is rendered by `DateGroupedFeed` and directly in search results. The `:prefetch="false"` change affects both rendering contexts.

### Error Propagation
- If `queryCollection().select()` fails for nested fields, the error surfaces through `useAsyncData`'s `error` ref. Existing error states on all pages handle this (PageErrorState with retry).
- No new error paths introduced.

### State Lifecycle Risks
- Shared `useSummariesData` cache means all pages see the same data snapshot. If one page calls `refresh()`, all pages reactively update. This is correct behavior.
- If the shared cache is invalidated during navigation (e.g., `useAsyncData` key collision), the worst case is a single re-fetch -- no data loss.

### API Surface Parity
- `useContentStream` gains server-side `select` support. All existing callers continue to work unchanged (no `select` = no behavior change).
- `SummaryCard` gains `:prefetch="false"` -- no API change, just a prop added to template NuxtLinks.

### Research Insights (System-Wide)

**`useArticleStream` and `useSearch` are unaffected:**
- `useArticleStream` calls `useContentStream('articles')` without `select` -- no behavior change.
- `useSearch` has its own data pipeline and renders `SummaryCard` with its own data. The prefetch change applies to search-rendered cards too, which is acceptable.

**Reactivity cost reduction:**
Beyond network savings, excluding `body` from the reactive data set significantly reduces Vue's reactivity overhead. Each summary's `body` field is a deeply nested Markdown AST object with dozens of child nodes. Vue 3's reactivity proxy system tracks each property recursively. Removing `body` from the reactive dataset eliminates thousands of proxy wrappers, reducing memory usage and improving computed property performance.

## Acceptance Criteria

- [ ] List view payload reduced from ~5MB to ~500KB (measured in Network tab)
- [ ] No NuxtLink prefetch requests from summary cards
- [ ] Cross-route navigation between list views does not re-fetch data
- [ ] All existing functionality preserved: sort, filter, pagination, search, detail pages
- [ ] No SSR build failures or hydration warnings
- [ ] Existing tests pass

## Dependencies & Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `queryCollection().select('metadata')` doesn't return nested object | **Low** (was Medium) | High | **Resolved:** `index.vue` already uses `select()` on equally-nested `z.array(z.object(...))` fields successfully. Test with quick debug page to confirm. |
| Shared cache key collision with other `useAsyncData` calls | Low | Medium | Use explicit unique key `'summaries-list'` |
| Removing `body` from list data breaks an undiscovered dependency | Low | Medium | Grep for `body` usage in list view components; SummaryCard doesn't use it |
| `:prefetch="false"` degrades perceived navigation speed to detail pages | Low | Low | Detail pages are fast already; prefetch was causing more harm (404s) than benefit |
| **NEW:** `metadata` arrives as JSON string after `select()` | Medium | Medium | Normalize in `useSummariesData` composable with `typeof` check (pattern from PR #20 learning) |
| **NEW:** `published` field missing from select list causes draft leak | Low | Medium | Already included in `SUMMARY_LIST_FIELDS`; add integration test to verify |
| **NEW:** SSR singleton issue if `useSummariesData` called at module scope | Low | High | Only call inside `<script setup>` or `setup()` function; add JSDoc warning |
| **NEW:** SQLite JSON blob size limit (~52K) hit by individual documents | Low | Low | Monitor document sizes; individual summaries are well under limit |

## Implementation Order

```
Step 1 (useContentStream select enhancement)
  |
Step 2 (add select to list views) -- can be same commit as Step 1
  |
Step 3 (disable prefetch in SummaryCard) -- independent, can be parallel
  |
Step 4 (shared useSummariesData composable)
  |
Step 5 (verification and tests)
```

Steps 1-3 are low-risk and can ship as a single PR.
Step 4 (shared cache) can be a follow-up PR if the payload reduction from Steps 1-2 is sufficient.

## File Checklist

| Action | File |
|--------|------|
| Modify | `src/composables/useContentStream.ts` -- push `select` to `queryCollection` |
| Modify | `src/pages/summaries/index.vue` -- add `select` option |
| Modify | `src/pages/channels/[slug].vue` -- add `select` option |
| Modify | `src/pages/playlists/[slug].vue` -- add `select` option |
| Modify | `src/components/content/SummaryCard.vue` -- add `:prefetch="false"` to NuxtLinks |
| Create | `src/composables/useSummariesData.ts` -- shared data composable (Step 4) |
| Create | `src/tests/composables/useSummariesData.test.ts` -- tests for shared composable (Step 5) |

## Open Questions

1. **Does `queryCollection().select('metadata')` return the full nested object?** ~~Nuxt Content v3 stores nested Zod objects as JSON blobs in SQLite. The `select` API may only work with top-level scalar columns. If it returns `null` for `metadata`, we need either: (a) flatten metadata fields to top-level in `content.config.ts`, or (b) fall back to client-side body stripping. This must be tested before implementing Step 1.~~ **LIKELY RESOLVED:** `src/pages/index.vue` line 19 already uses `select('featuredPicks', 'quickLinks')` on `z.array(z.object({...}))` fields -- same JSON blob storage mechanism. High confidence that `select('metadata')` works. Still recommend a quick verification test.

2. **Should the playlist page join the shared cache or keep its own filtered fetch?** Using the shared cache means fetching all 1200 summaries even when viewing a single playlist. With the `select` optimization reducing payload to ~500KB, this is likely acceptable. But if playlist pages are commonly deep-linked (no prior navigation to `/summaries`), the extra data transfer may be noticeable on slow connections.

3. **Should `useTagIndex` also get the `select` treatment?** The tag page uses `useTagIndex` which has its own `queryCollection` call for cross-referencing summaries by `videoId`. It could benefit from `select` too, but it's a different composable with different patterns. Recommend as a separate follow-up.

4. **NEW: Should `prefetchOn: 'interaction'` be used instead of `prefetch: false` for the channel link?** The channel link points to a valid page and would benefit from hover-based prefetching. The detail link is the 404 source and should remain fully disabled. This is a minor UX consideration.

5. **NEW: Should metadata normalization live in `useSummariesData` or in `useContentStream`?** Normalizing in `useContentStream` would benefit all callers. Normalizing in `useSummariesData` is more targeted. Recommend `useSummariesData` for now to limit blast radius.

## Sources & References

- **Nuxt Content v3 `queryCollection().select()` docs:** https://content.nuxt.com/docs/utils/query-collection
- **Related issues:** AIC-38 (channel nav fix, done), AIC-39 (client-side pagination, done)
- **Project learning:** `docs/solutions/logic-errors/nuxt-content-reactivity-and-ssr-patterns.md` -- confirms `useContentStream` fetches all docs then filters client-side
- **Existing `select` usage in codebase:** `src/pages/index.vue:19` uses `queryCollection('newsletters').select(...)` successfully
- **Codebase files analyzed:** `useContentStream.ts`, `SummaryCard.vue`, `DateGroupedFeed.vue`, `useSortedFeed.ts`, `usePagination.ts`, `content.config.ts`, all four list page views
- **Nuxt 4 Performance Best Practices:** https://nuxt.com/docs/4.x/guide/best-practices/performance
- **GitHub Discussion #3008 (nested values):** https://github.com/nuxt/content/discussions/3008
- **Nuxt data layer rewrite:** https://masteringnuxt.com/blog/nuxts-data-layer-has-been-rewritten-5-new-features-you-need-to-know
- **useNuxtData docs:** https://nuxt.com/docs/4.x/api/composables/use-nuxt-data
- **NuxtLink prefetch deep dive:** https://deltener.com/blog/a-deep-dive-into-the-nuxt-link-component/
- **SQLite JSON blob limits (Issue #3233):** https://github.com/nuxt/content/issues/3233
- **Array field challenges in Nuxt Content v3:** https://zhul.in/en/2025/10/20/nuxt-content-v3-z-array-query-challenge/

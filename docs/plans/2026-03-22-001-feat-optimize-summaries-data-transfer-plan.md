---
title: "feat: Optimize summaries data transfer -- exclude body from list queries & disable prefetch"
type: feat
status: active
date: 2026-03-22
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

### Fix 2: Disable NuxtLink prefetching on SummaryCard (low effort)

**Approach:** Add `:prefetch="false"` to all `<NuxtLink>` elements in `SummaryCard.vue`. The card has two NuxtLinks:
1. Channel link: `/channels/${summary.metadata.channel}`
2. Detail link: `/summaries/${summary.metadata.videoId}`

The detail link is the primary offender -- it prefetches the summary detail page, which triggers a `queryCollection` call for the single document plus a transcript JSON fetch. With 25 visible cards, that's 25 prefetch requests.

### Fix 3: Shared data cache across routes (medium effort)

**Approach:** Ensure all list views share a single cached copy of the summaries data, preventing re-fetches on cross-route navigation.

Currently, `useContentStream('summaries')` generates a cache key like `content:summaries:{...options}`. When options differ across pages (different `where`, `key`, `select`), each page creates its own cache entry. The channel page uses `useContentStream('summaries')` with no where clause and filters in a computed, so it and the index page share the same key -- good. But the playlist page uses a different key (`playlist-summaries-${slug}`), causing a separate fetch.

Options:
- **Option A (recommended):** Create a `useSummariesData` composable that all list views call. It fetches the summaries collection once (with `select`) and returns a shared reactive reference. Individual pages compose on top with their own computed filters.
- **Option B:** Use a Pinia store to cache the fetched data. Heavier but gives explicit cache control and devtools visibility.

### Fix 4: Server-side filtered queries (medium effort, currently blocked)

**Status:** Currently blocked because `queryCollection().where()` does not work reliably for nested JSON fields like `metadata.channelId` (Nuxt Content v3 stores nested Zod objects as JSON blobs in SQLite). The solutions doc confirms this limitation.

**Future path:** Either flatten `channelId` to a top-level schema field in `content.config.ts`, or create a custom server API route with raw SQLite `json_extract()`. This is out of scope for this PR but noted for follow-up.

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
| `queryCollection().select('metadata')` doesn't return nested object | Medium | High | Test first; fall back to client-side body stripping if it fails |
| Shared cache key collision with other `useAsyncData` calls | Low | Medium | Use explicit unique key `'summaries-list'` |
| Removing `body` from list data breaks an undiscovered dependency | Low | Medium | Grep for `body` usage in list view components; SummaryCard doesn't use it |
| `:prefetch="false"` degrades perceived navigation speed to detail pages | Low | Low | Detail pages are fast already; prefetch was causing more harm (404s) than benefit |

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

## Open Questions

1. **Does `queryCollection().select('metadata')` return the full nested object?** Nuxt Content v3 stores nested Zod objects as JSON blobs in SQLite. The `select` API may only work with top-level scalar columns. If it returns `null` for `metadata`, we need either: (a) flatten metadata fields to top-level in `content.config.ts`, or (b) fall back to client-side body stripping. This must be tested before implementing Step 1.

2. **Should the playlist page join the shared cache or keep its own filtered fetch?** Using the shared cache means fetching all 1200 summaries even when viewing a single playlist. With the `select` optimization reducing payload to ~500KB, this is likely acceptable. But if playlist pages are commonly deep-linked (no prior navigation to `/summaries`), the extra data transfer may be noticeable on slow connections.

3. **Should `useTagIndex` also get the `select` treatment?** The tag page uses `useTagIndex` which has its own `queryCollection` call for cross-referencing summaries by `videoId`. It could benefit from `select` too, but it's a different composable with different patterns. Recommend as a separate follow-up.

## Sources & References

- **Nuxt Content v3 `queryCollection().select()` docs:** https://content.nuxt.com/docs/utils/query-collection
- **Related issues:** AIC-38 (channel nav fix, done), AIC-39 (client-side pagination, done)
- **Project learning:** `docs/solutions/logic-errors/nuxt-content-reactivity-and-ssr-patterns.md` -- confirms `useContentStream` fetches all docs then filters client-side
- **Existing `select` usage in codebase:** `src/pages/index.vue:19` uses `queryCollection('newsletters').select(...)` successfully
- **Codebase files analyzed:** `useContentStream.ts`, `SummaryCard.vue`, `DateGroupedFeed.vue`, `useSortedFeed.ts`, `usePagination.ts`, `content.config.ts`, all four list page views

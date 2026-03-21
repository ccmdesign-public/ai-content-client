---
title: "AIC-38: Simplify Summaries Navigation Architecture"
type: refactor
status: draft
date: 2026-03-21
deepened: 2026-03-21
---

# AIC-38: Simplify Summaries Navigation Architecture

## Enhancement Summary

**Deepened on:** 2026-03-21
**Sections enhanced:** 7 implementation steps + risks + architecture
**Research sources:** Nuxt Content v3 queryCollection docs, Vue composable best practices, useAsyncData key management, route-param reactivity patterns, codebase audit (1204 summaries, useContentStream internals, useTagIndex patterns), project learnings (route-relocation cleanup, shadcn-vue migration patterns, styling audit)

### Key Improvements
1. Resolved the option (a) vs (b) architecture decision with concrete evidence: `useTagIndex` already proves `queryCollection().where()` with nested dot-notation fields works in this codebase -- `useSummaryQuery` should use approach (b) directly for real server-side filtering
2. Confirmed 100% `channelId` coverage (1204/1204 summaries) -- no backfill migration needed
3. Added critical edge case: `useSummaryQuery` must use `watch` option on reactive params (not just reactive keys) to handle Vue Router component reuse when navigating between channels
4. Added race condition mitigation for rapid channel-to-channel navigation (stale response overwriting fresh data)
5. Identified `deslugify` is only used in `channels/[slug].vue` and `slugify.ts` -- safe to remove entirely

### New Considerations Discovered
- Nuxt Content v3 `queryCollection().where()` supports dot-notation for nested fields (proven by `useTagIndex` using `metadata.videoId`)
- The `useContentStream` abstraction fetches ALL docs then filters in JS -- wrapping it does NOT reduce network payload; only direct `queryCollection().where()` achieves true server-side filtering
- Route param changes between channels reuse the same component instance -- lifecycle hooks do NOT re-fire; the composable must watch params explicitly
- `useSummariesFilter` URL sync via `router.replace({ query })` could conflict if `useSummaryQuery` also syncs params -- keep them independent

---

## Overview

The current summaries navigation has two systemic problems:

1. **Channel page bugs:** `channels/[slug].vue` loads *all* 500+ summaries, then filters client-side by matching the channel name string (via `deslugify`). This is fragile (name changes break it), slow (transfers all data), and produces wrong results when a slug cannot be reverse-mapped to the exact channel name.

2. **Load-all pattern:** The summaries index and channel pages both call `useContentStream('summaries')` with no `where` clause, pulling the entire collection into memory. The playlist page already demonstrates the correct pattern -- it passes `{ where: { playlistId } }` -- but the other pages have not adopted it.

This plan introduces a shared `useSummaryQuery` composable that all list views use, switches channel matching from name strings to the immutable `channelId` field (already present in `videoMetadataSchema`), and ensures every page queries only the subset it needs.

### Guiding principles

- Compose with existing infrastructure (`useSortedFeed`, `useSortOptions`, `useDateGroups`) -- do not duplicate.
- Each page passes filter params; the composable handles data fetching, loading, and error states uniformly.
- The `useSummariesFilter` (category filter) continues to work on top of whatever subset the query returns.
- No schema changes needed -- `metadata.channelId` already exists in `content.config.ts`.

---

## Step-by-step Implementation

### Step 1: Create `useSummaryQuery` composable

**File:** `src/composables/useSummaryQuery.ts` (new)

**What:** A composable that calls `queryCollection('summaries').where()` directly with typed filter parameters. Returns data + loading/error/refresh states. Does NOT wrap `useContentStream` -- instead uses `queryCollection` directly for real server-side filtering, following the proven pattern in `useTagIndex`.

```ts
interface SummaryQueryParams {
  channelId?: MaybeRefOrGetter<string | undefined>
  playlistId?: MaybeRefOrGetter<string | undefined>
  videoIds?: MaybeRefOrGetter<string[] | undefined>
  // future: tagSlug handled via useTagIndex which already queries correctly
}
```

Key behaviors:
- When `channelId` is provided: `queryCollection('summaries').where('metadata.channelId', '=', channelId).all()`
- When `playlistId` is provided: `queryCollection('summaries').where('playlistId', '=', playlistId).all()`
- When `videoIds` is provided: `queryCollection('summaries').where('metadata.videoId', 'in', videoIds).all()` (same pattern as `useTagIndex`)
- When no params: `queryCollection('summaries').all()` (for the index page)
- Returns `{ data, pending, error, refresh }` -- same shape as `useContentStream`
- Generates a stable `key` from the params to avoid cache collisions
- Uses `useAsyncData` `watch` option on reactive params so client-side navigation triggers re-fetch

**Acceptance criteria:**
- [ ] Composable exists and exports typed interface
- [ ] Passing `channelId` returns only summaries with matching `metadata.channelId`
- [ ] Passing `playlistId` returns only summaries with matching `playlistId`
- [ ] Passing no params returns all summaries
- [ ] Reactive params trigger re-fetch on change
- [ ] Drafts are excluded by default (filter `published !== false`)
- [ ] Unit tests in `src/tests/composables/useSummaryQuery.test.ts`

### Research Insights (Step 1)

**Architecture Decision -- option (b) wins:**
The plan originally proposed starting with option (a) -- wrapping `useContentStream` -- for simplicity. Codebase analysis reveals this would provide zero performance benefit: `useContentStream` calls `queryCollection().all()` and filters in JS after fetching the entire collection. The `where` clause in `useContentStream` is applied client-side, not server-side. True server-side filtering requires calling `queryCollection().where()` directly. The `useTagIndex` composable already demonstrates this pattern successfully with `queryCollection('summaries').where('metadata.videoId', 'in', ids).all()`, proving nested dot-notation field access works.

**Key design patterns (from Vue composable best practices):**
- Accept params as `MaybeRefOrGetter<T>` and resolve with `toValue()` inside the handler for maximum flexibility
- Use an options object (not positional args) since all parameters are optional
- Return `readonly` refs for data to prevent accidental mutation by consumers
- Generate deterministic cache keys using `computed(() => \`summary-query:${JSON.stringify(resolvedParams)}\`)` -- never use `Math.random()` or `Date.now()` (SSR hydration mismatch risk, per project learning from styling audit)
- Use `useId()` pattern awareness -- composable itself does not need IDs, but any component consuming it that generates DOM IDs must use `useId()`

**useAsyncData key management (from Nuxt docs):**
- The `key` must be unique across the app and include all filter values. When the same key is shared between components, they share data/error/status refs -- this is useful but requires option consistency.
- Use `watch` option (not a `watch()` call) to tell `useAsyncData` when to re-fetch: `{ watch: [resolvedChannelId] }`. This is cleaner than manually watching and calling `refresh()`.
- The handler function must return a truthy value (not `undefined` or `null`) -- return `[]` for empty results to avoid duplicate client-side requests.

**Route param reactivity (from Vue Router best practices):**
- When navigating between `/channels/fireship` and `/channels/theo`, Vue Router reuses the same component instance. Lifecycle hooks (onMounted, etc.) do NOT fire again.
- The composable must handle this via reactive params + `watch` option on `useAsyncData`, not lifecycle hooks.
- The `useSummaryQuery` composable receives a reactive `channelId` getter, which changes when the route param changes, triggering re-fetch automatically.

**Race condition mitigation:**
- Rapid navigation between channels (e.g., clicking through sidebar links quickly) can cause stale responses to arrive after fresh ones. `useAsyncData` handles this internally by canceling previous pending requests when the key changes -- verify this behavior during testing.
- If using `queryCollection` directly (not via `useAsyncData`), you would need manual `AbortController` logic. Wrapping in `useAsyncData` avoids this.

**Performance considerations:**
- `queryCollection().where()` queries the SQLite database backing Nuxt Content, which uses indexes. For 1204 summaries, a `.where('metadata.channelId', '=', id)` query reads only matching rows, not the full table. This is significantly faster than fetching all 1204 and filtering in JS.
- Consider adding an index on `metadata.channelId` in `content.config.ts` if query performance is a concern at scale (not needed at 1204 docs, but good to document for future).

**Edge cases:**
- `channelId` is `undefined` at initial render before route params resolve -- composable must handle `undefined` params gracefully (skip query or return empty)
- Multiple params passed simultaneously (e.g., both `channelId` and `playlistId`) -- decide on behavior: AND semantics or throw. Recommend: `AND` via chained `.where()` calls, but document that current pages never pass multiple params.
- Empty `videoIds` array should return `[]` immediately without querying (empty `IN` clause behavior varies).

---

### Step 2: Migrate `channels/[slug].vue` to use `useSummaryQuery` with channelId

**File:** `src/pages/channels/[slug].vue` (modify)

**What:** Replace the current load-all-then-filter-by-name approach with a targeted query by `channelId`.

Current flow (buggy):
1. `useContentStream('summaries')` -- loads all 1204 summaries (not 500+ as originally estimated)
2. `deslugify(slug, channels)` -- reverse-maps slug to channel name (fragile)
3. Filters by `metadata.channel === channelName` (string match)

New flow:
1. `getChannelBySlug(slug)` -- get config (already exists, has `.id` = YouTube channel ID)
2. `useSummaryQuery({ channelId: channelConfig.id })` -- server-side filtered query
3. Remove `deslugify` import and all name-matching logic
4. 404 if `channelConfig` is null (no need to wait for data to decide)

**Acceptance criteria:**
- [ ] Page uses `channelConfig.id` (YouTube channel ID) for filtering, not name strings
- [ ] `deslugify` is no longer imported or used
- [ ] Only matching summaries are fetched, not the full collection
- [ ] 404 detection is synchronous (based on config lookup, not data load)
- [ ] Channel name comes from `channelConfig.name` (not derived from content)
- [ ] Sort/group still works via `useSortedFeed`
- [ ] No visual regressions -- loading skeleton, error state, empty state all render correctly

### Research Insights (Step 2)

**Route-param component reuse (critical):**
The current `channels/[slug].vue` uses `computed(() => route.params.slug as string)` reactively, but the buggy part is that `useContentStream('summaries')` fetches ALL summaries with no reactive param dependency. The new composable fixes this because the `channelId` param is reactive (derived from `computed(() => getChannelBySlug(slug.value)?.id)`), and `useSummaryQuery` watches it.

**Current code has a subtle 404 timing bug:**
The existing `shouldShow404` computed waits for `allSummaries.value` to load before deciding -- during the loading phase, neither 404 nor content is shown, just a skeleton. If the channel slug is invalid, the user sees a loading skeleton that eventually becomes a 404. The new flow fixes this: `getChannelBySlug()` is synchronous (it reads from static config), so 404 detection is instant.

**404 pattern -- use `throw createError` (from project patterns):**
The current page uses a `<PageNotFound>` component conditionally rendered. The playlist page uses `throw createError({ statusCode: 404 })`. For consistency with the playlist page pattern, consider using `throw createError` for truly invalid slugs (not in config), and `<PageEmptyState>` for valid channels with no content yet. This also sets the correct HTTP status code for SSR/prerender.

**Stale reference cleanup (from project learning):**
Per the "Route Relocation Stale Reference Cleanup" learning: when removing `deslugify` from this page, also check if the computed `channelName` logic is referenced in any CSS class names, `useHead` calls, or aria attributes. The current `useHead({ title: computed(() => \`\${displayName.value} | YouTube Summaries\`) })` should switch to `channelConfig.value?.name` directly.

**Composable call ordering (from existing code pattern):**
The playlist page has a comment: "All composable calls must happen before the synchronous throw." This is critical for SSR -- `useSortedFeed` internally calls `useSortOptions` which uses `tryUseNuxtApp()` and `useRoute()`. These must be called during synchronous component setup, before any conditional `throw`. The channels page migration must follow this same pattern.

---

### Step 3: Migrate `playlists/[slug].vue` to use `useSummaryQuery`

**File:** `src/pages/playlists/[slug].vue` (modify)

**What:** Replace the direct `useContentStream('summaries', { where: { playlistId } })` call with `useSummaryQuery({ playlistId })`. This page already queries correctly -- the migration is purely for consistency so all list views use the same composable.

Current flow (correct but inconsistent):
1. `useContentStream('summaries', { where: { playlistId: playlist.value?.id } })`

New flow:
1. `useSummaryQuery({ playlistId: playlist.value?.id })`

**Acceptance criteria:**
- [ ] Uses `useSummaryQuery` instead of direct `useContentStream`
- [ ] Behavior is identical to current implementation
- [ ] Sort/group still works via `useSortedFeed`
- [ ] No visual regressions

### Research Insights (Step 3)

**Behavior change to verify -- `useContentStream` vs direct `queryCollection`:**
The current playlist page uses `useContentStream` which:
1. Calls `queryCollection('summaries').all()` (fetches everything)
2. Filters by `playlistId` in JS via `matchesWhere`
3. Also filters out drafts (`published !== false`)

Switching to `useSummaryQuery` with direct `queryCollection().where('playlistId', '=', id)` changes the filtering from client-side to server-side (SQL). Functionally identical, but:
- Draft filtering must be added explicitly: `.where('published', '<>', false)` or equivalent
- The `playlistId` field is top-level (not nested under `metadata`), so no dot-notation concerns
- Verify that `null` / `undefined` playlistId handling is consistent -- `useContentStream` silently matches nothing when `where: { playlistId: undefined }` because `undefined !== undefined` returns false in `matchesWhere`. The new composable should explicitly skip the query when `playlistId` is undefined.

**Composable ordering before throw:**
The current code has `throw createError({ statusCode: 404 })` after composable calls. This pattern must be preserved -- do not move the throw above `useSummaryQuery()`.

---

### Step 4: Migrate `summaries/index.vue` to use `useSummaryQuery`

**File:** `src/pages/summaries/index.vue` (modify)

**What:** Replace `useContentStream('summaries')` with `useSummaryQuery()` (no params = all summaries). This is a thin swap for consistency.

**Acceptance criteria:**
- [ ] Uses `useSummaryQuery` instead of direct `useContentStream`
- [ ] Category filter (`useSummariesFilter`) still works correctly on the returned data
- [ ] Search integration unchanged
- [ ] Sort/group still works via `useSortedFeed`
- [ ] No visual regressions

### Research Insights (Step 4)

**Return type compatibility:**
`useSummariesFilter` expects `summaries: Ref<any[] | null>`. The new composable's `data` ref from `useAsyncData` returns `Ref<any[] | null>` by default -- compatible. However, if the composable returns `[]` for empty results (recommended to avoid null issues), confirm `useSummariesFilter` handles both `null` and `[]` correctly. Looking at the code: `const all = summaries.value || []` -- it handles both.

**Performance note for index page:**
The index page fetches ALL summaries (no filter). With `queryCollection('summaries').all()`, this is equivalent to the current `useContentStream('summaries')` behavior. No performance change here -- this migration is purely for API consistency.

**Search integration unchanged:**
The search composable is injected from the layout (`inject('search')`) and operates independently of the data fetching composable. It uses its own `useSearch` index. No interaction with `useSummaryQuery`.

---

### Step 5: Verify `tags/[slug].vue` -- no changes needed

**File:** `src/pages/tags/[slug].vue` (no modify)

**What:** This page already uses `useTagIndex`, which does targeted `queryCollection` calls internally (fetches tag data, then cross-references summaries by videoId). It does NOT use the load-all pattern.

**Action:** Verify it continues to work. If `useTagIndex` is ever refactored to use `useSummaryQuery({ videoIds })`, that would be a separate follow-up.

**Acceptance criteria:**
- [ ] Page still renders correctly after other migrations
- [ ] No regressions in tag cross-referencing

### Research Insights (Step 5)

**`useTagIndex` is the reference implementation:**
`useTagIndex` already demonstrates the ideal pattern that `useSummaryQuery` should follow:
- Uses `queryCollection().where()` directly for SQL-level filtering
- Uses `computed` key for reactive cache management: `computed(() => \`tag-index:\${resolvedSlug.value}\`)`
- Uses `{ watch: [resolvedSlug] }` on `useAsyncData` for reactive re-fetching
- Two-step fetch: tag data first, then summaries by videoId

`useSummaryQuery` should mirror this approach but with a single-step fetch (no cross-referencing needed).

---

### Step 6: Optimize `useSummariesFilter` category map (optional, low-risk)

**File:** `src/composables/useSummariesFilter.ts` (modify)

**What:** The category filter currently loads all tag data client-side (`useAsyncData` with `{ server: false }`) to build the `categoryVideoIdMap`. This works but adds a second network request on the summaries page.

Potential improvement: pre-compute the `categoryId -> Set<videoId>` map at build time (in a Nuxt Content data collection or a build script) and serve it as a static JSON file, eliminating the runtime tag query.

This step is optional for the initial PR -- the current approach works and is not a blocking bug. Flag it as a follow-up if the tag collection grows large.

**Acceptance criteria (if implemented):**
- [ ] Category filter still works with the same UX
- [ ] No additional runtime queries for tag data
- [ ] Category switching remains instant (O(1) lookup)

### Research Insights (Step 6)

**Why `{ server: false }` exists:**
The `useSummariesFilter` uses `{ server: false }` for the tag data fetch to avoid SSR hydration mismatch. This is because the tag data drives a client-interactive filter UI that starts in a "no category selected" state. Rendering the filter results on the server but not having the filter selection on the client would cause a hydration mismatch.

**Build-time pre-computation approach:**
If implemented, this could use a Nuxt Content `defineCollectionSource` to create a derived data collection, or a `scripts/build-category-map.ts` that runs during `prebuild`. The output would be a JSON file like `src/content/derived/category-video-map.json` that maps `categoryId -> videoId[]`. At ~1204 summaries, this file would be small (~15-30KB) and cache well.

**Alternative: keep runtime but optimize:**
Instead of build-time pre-computation, consider using `select()` to reduce the tag query payload: `queryCollection('tags').select('categoryId', 'items').all()`. This avoids transferring tag names, descriptions, etc. that the filter does not need.

---

### Step 7: Clean up dead code and update tests

**Files:**
- `src/utils/slugify.ts` -- verify `deslugify` is still used elsewhere; if not, remove it
- `src/tests/` -- add/update tests for `useSummaryQuery`
- `src/composables/useContentStream.ts` -- no changes (still used by other collections)

**Acceptance criteria:**
- [ ] No unused imports or dead code remain in migrated pages
- [ ] `deslugify` removed from `slugify.ts` if no longer referenced anywhere
- [ ] All existing tests pass (`pnpm vitest run`)
- [ ] New tests cover `useSummaryQuery` with each filter param variant

### Research Insights (Step 7)

**`deslugify` usage audit (confirmed):**
Grep confirms `deslugify` is only used in two files:
- `src/pages/channels/[slug].vue` (the import and usage being removed)
- `src/utils/slugify.ts` (the definition)
It is safe to remove `deslugify` entirely from `slugify.ts` after the channels page migration.

**Test strategy for `useSummaryQuery`:**
Tests should cover:
1. No params returns all summaries
2. `channelId` param filters correctly
3. `playlistId` param filters correctly
4. `videoIds` param filters correctly
5. `undefined` params are handled (no query, return empty)
6. Empty `videoIds` array returns `[]` without querying
7. Reactive param changes trigger re-fetch (use `flushPromises` + update ref)
8. Key generation produces unique, deterministic keys for different params

Tests should mock `queryCollection` (auto-imported by Nuxt Content) and `useAsyncData` (auto-imported by Nuxt). Follow existing test patterns in `src/tests/`.

**Stale reference checklist (from project learning):**
After migration, verify:
- [ ] No CSS classes reference "channel-name" or similar old naming
- [ ] `useHead` title uses `channelConfig.name`, not derived `channelName`
- [ ] No `aria-label` or `aria-live` regions reference the old filtering logic
- [ ] Sitemap entries for channel pages are unaffected (URL structure unchanged)

---

## Implementation Order

```
Step 1 (composable)
  |
  +-- Step 2 (channels -- highest priority, fixes bugs)
  |
  +-- Step 3 (playlists -- consistency swap)
  |
  +-- Step 4 (summaries index -- consistency swap)
  |
Step 5 (verify tags -- read-only)
  |
Step 7 (cleanup & tests)
  |
Step 6 (optional optimization -- can be a follow-up PR)
```

Steps 2, 3, and 4 can be done in parallel after Step 1 but are listed in priority order. Step 2 (channels) should land first since it fixes active bugs.

---

## Risks and Things to Verify

1. **`metadata.channelId` population:** ~~Confirm that all existing summary markdown files actually have `metadata.channelId` populated in their frontmatter.~~ **RESOLVED:** Audit confirms 1204/1204 summaries have `channelId` in their metadata. No backfill needed.

2. **`useContentStream` where clause with nested fields:** ~~Verify this works correctly in the existing `matchesWhere` implementation.~~ **RESOLVED (superseded):** The plan now uses `queryCollection().where()` directly instead of wrapping `useContentStream`. `queryCollection` supports dot-notation nested field access, as proven by `useTagIndex` using `queryCollection('summaries').where('metadata.videoId', 'in', ids)`.

3. **Nuxt Content `queryCollection` vs client-side filtering:** ~~Decide whether `useSummaryQuery` should wrap `useContentStream` (a) or call `queryCollection().where()` directly (b).~~ **RESOLVED:** Option (b) selected. Evidence: `useContentStream` fetches ALL documents then filters in JS, providing no server-side filtering benefit. `useTagIndex` already proves option (b) works. The composable will use `queryCollection().where()` directly for real SQL-level filtering.

4. **Cache key collisions:** When the same page is visited with different params (e.g., navigating between channels), the `useAsyncData` key must change. Ensure `useSummaryQuery` generates keys that include the filter values. **Mitigation:** Use `computed(() => \`summary-query:${channelId || ''}:${playlistId || ''}\`)` as key, following `useTagIndex` pattern.

5. **Hydration mismatches:** The current `useSummariesFilter` uses `{ server: false }` to avoid SSR hydration issues with tag data. If `useSummaryQuery` introduces any new SSR-rendered data paths, test for hydration warnings. **Note:** `useSummaryQuery` will render on server by default (like `useTagIndex`), which is correct -- the filtered data should be SSR-rendered for SEO and initial load performance.

6. **`deslugify` removal safety:** ~~Before removing `deslugify`, grep the entire codebase to confirm it is not used by other pages or utilities.~~ **RESOLVED:** Grep confirms only two references: `channels/[slug].vue` (removed in Step 2) and `slugify.ts` (definition removed in Step 7). Safe to remove.

7. **NEW -- Race condition on rapid navigation:** When a user clicks between channels quickly, multiple `queryCollection` requests may be in flight. `useAsyncData` handles this by deduplicating requests with matching keys and by superseding stale responses when the key changes. Verify this behavior in integration tests by simulating rapid slug changes.

8. **NEW -- Composable call ordering in SSR:** All composable calls (`useSummaryQuery`, `useSortedFeed`, etc.) must happen during synchronous component setup, before any conditional `throw createError()`. The playlist page already follows this pattern. The channels page migration must adopt it. Failure to do so causes SSR errors because Vue/Nuxt composables require an active component instance.

9. **NEW -- Draft filtering consistency:** `useContentStream` filters drafts via `docs.filter(d => d.published !== false)`. When switching to direct `queryCollection`, this draft filtering must be replicated. Add `.where('published', '<>', false)` or filter in the `useAsyncData` handler after the query. Verify whether `published` is a field in the summaries schema -- it is not explicitly defined in `content.config.ts`, suggesting it may be a Nuxt Content built-in field. Test with both approaches.

---

## Out of Scope

- Refactoring `useTagIndex` to use `useSummaryQuery` -- it already queries efficiently and has its own two-step fetch pattern (tag data first, then summaries by videoId).
- Adding pagination or virtual scrolling to list pages -- separate concern.
- Changing the URL structure of channel/playlist/tag pages.
- Schema changes to `content.config.ts` -- `channelId` already exists.
- Adding indexes to `content.config.ts` for `metadata.channelId` -- not needed at current scale (1204 docs), but note as a future optimization if the collection grows significantly.

---

## References

- [Nuxt Content v3 queryCollection API](https://content.nuxt.com/docs/utils/query-collection)
- [Nuxt Content v3 nested field querying discussion](https://github.com/nuxt/content/discussions/3008)
- [Nuxt useAsyncData key best practices](https://github.com/nuxt/nuxt/discussions/27740)
- [Nuxt 4 useAsyncData docs](https://nuxt.com/docs/4.x/api/composables/use-async-data)
- [Vue Router param change lifecycle behavior](https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes)
- [Vue composable design patterns](https://alexop.dev/posts/vueuse_composables_style_guide/)
- Project learnings: `docs/solutions/logic-errors/route-relocation-stale-reference-cleanup.md`
- Project learnings: `docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md`

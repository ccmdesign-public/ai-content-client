---
title: "AIC-38: Simplify Summaries Navigation Architecture"
type: refactor
status: draft
date: 2026-03-21
---

# AIC-38: Simplify Summaries Navigation Architecture

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

**What:** A thin composable that wraps `useContentStream` with typed filter parameters and returns data + loading/error/refresh states. It builds the `where` clause from the provided params.

```ts
interface SummaryQueryParams {
  channelId?: MaybeRefOrGetter<string | undefined>
  playlistId?: MaybeRefOrGetter<string | undefined>
  videoIds?: MaybeRefOrGetter<string[] | undefined>
  // future: tagSlug handled via useTagIndex which already queries correctly
}
```

Key behaviors:
- When `channelId` is provided: `where: { 'metadata.channelId': channelId }`
- When `playlistId` is provided: `where: { playlistId: playlistId }`
- When `videoIds` is provided: use function-based where to check `metadata.videoId` membership in a `Set`
- When no params: fetches all summaries (for the index page)
- Returns `{ data, pending, error, refresh }` -- same shape as `useContentStream`
- Generates a stable `key` from the params to avoid cache collisions
- Watches reactive params so client-side navigation triggers re-fetch

**Acceptance criteria:**
- [ ] Composable exists and exports typed interface
- [ ] Passing `channelId` returns only summaries with matching `metadata.channelId`
- [ ] Passing `playlistId` returns only summaries with matching `playlistId`
- [ ] Passing no params returns all summaries
- [ ] Reactive params trigger re-fetch on change
- [ ] Unit tests in `src/tests/composables/useSummaryQuery.test.ts`

---

### Step 2: Migrate `channels/[slug].vue` to use `useSummaryQuery` with channelId

**File:** `src/pages/channels/[slug].vue` (modify)

**What:** Replace the current load-all-then-filter-by-name approach with a targeted query by `channelId`.

Current flow (buggy):
1. `useContentStream('summaries')` -- loads all 500+ summaries
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

---

### Step 5: Verify `tags/[slug].vue` -- no changes needed

**File:** `src/pages/tags/[slug].vue` (no modify)

**What:** This page already uses `useTagIndex`, which does targeted `queryCollection` calls internally (fetches tag data, then cross-references summaries by videoId). It does NOT use the load-all pattern.

**Action:** Verify it continues to work. If `useTagIndex` is ever refactored to use `useSummaryQuery({ videoIds })`, that would be a separate follow-up.

**Acceptance criteria:**
- [ ] Page still renders correctly after other migrations
- [ ] No regressions in tag cross-referencing

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

1. **`metadata.channelId` population:** Confirm that all existing summary markdown files actually have `metadata.channelId` populated in their frontmatter. If older summaries were processed before `channelId` was added to the pipeline, they will be invisible on channel pages after migration. Mitigation: run a quick audit script (`grep -rL "channelId" src/content/summaries/`) and backfill if needed.

2. **`useContentStream` where clause with nested fields:** The composable uses `getProp(doc, path)` for dot-notation access (`metadata.channelId`). Verify this works correctly in the existing `matchesWhere` implementation -- it already supports dot paths, so this should be fine.

3. **Nuxt Content `queryCollection` vs client-side filtering:** `useContentStream` currently calls `queryCollection().all()` and then filters in JS. The `where` clause is applied *after* the full collection is fetched from Nuxt Content's API. True server-side filtering would require using `queryCollection().where()` directly (as `useTagIndex` does). Decide whether `useSummaryQuery` should:
   - (a) Continue wrapping `useContentStream` (simpler, same perf characteristics), or
   - (b) Call `queryCollection().where()` directly for real server-side filtering (better perf, but diverges from the abstraction).

   Recommendation: start with (a) for consistency and correctness, then optimize to (b) if profiling shows the full-collection fetch is a bottleneck.

4. **Cache key collisions:** When the same page is visited with different params (e.g., navigating between channels), the `useAsyncData` key must change. Ensure `useSummaryQuery` generates keys that include the filter values.

5. **Hydration mismatches:** The current `useSummariesFilter` uses `{ server: false }` to avoid SSR hydration issues with tag data. If `useSummaryQuery` introduces any new SSR-rendered data paths, test for hydration warnings.

6. **`deslugify` removal safety:** Before removing `deslugify`, grep the entire codebase to confirm it is not used by other pages or utilities.

---

## Out of Scope

- Refactoring `useTagIndex` to use `useSummaryQuery` -- it already queries efficiently and has its own two-step fetch pattern (tag data first, then summaries by videoId).
- Adding pagination or virtual scrolling to list pages -- separate concern.
- Changing the URL structure of channel/playlist/tag pages.
- Schema changes to `content.config.ts` -- `channelId` already exists.

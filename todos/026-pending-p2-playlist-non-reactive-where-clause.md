---
status: done
priority: p2
issue_id: "026"
tags: [code-review, reactivity, bug, nuxt]
dependencies: []
---

# Playlist Page Uses Non-Reactive `where` Clause for useContentStream

## Problem Statement

In `src/pages/playlists/[slug].vue`, the `useContentStream` call passes `playlist.value?.id` as a static value at setup time rather than a reactive getter. If the route slug changes via client-side navigation (e.g., navigating between playlists without full page reload), the `where` filter will still reference the old playlist's ID, causing the wrong summaries to display.

```ts
// Line 16-18: playlist.value?.id is evaluated ONCE at setup time
const { data: summaries, pending, error, refresh } = useContentStream('summaries', {
  where: { playlistId: playlist.value?.id }
})
```

`useContentStream` evaluates `options.where` inside `useAsyncData`, but the `where` object is captured by closure with the static value. Since `playlist` is a computed that depends on `route.params.slug`, a slug change will update `playlist` but NOT re-evaluate the `where` clause.

## Findings

- **Source**: `src/pages/playlists/[slug].vue`, lines 16-18
- **Agent**: architecture-reviewer
- **Evidence**: `playlist.value?.id` dereferences `.value` at call time, freezing the ID. The old code used `useSummaryQuery({ playlistId })` which accepted a reactive getter and resolved it inside the async function.
- **Impact**: Wrong data shown when navigating between playlists client-side. The `throw createError` on line 24-25 only fires on initial SSR/mount, not on slug change.

## Proposed Solutions

### Solution A: Use a function-based where clause
Pass a function to `where` so it re-evaluates on each fetch:
```ts
const { data: summaries, pending, error, refresh } = useContentStream('summaries', {
  where: (doc) => doc.playlistId === playlist.value?.id
})
```
- **Pros**: Reactive, minimal change
- **Cons**: Still won't re-fetch automatically on slug change unless `watch` triggers `refresh()`
- **Effort**: Small
- **Risk**: Low

### Solution B: Add watch + key to force re-fetch on slug change
```ts
const playlistId = computed(() => playlist.value?.id)
const { data: summaries, pending, error, refresh } = useContentStream('summaries', {
  where: (doc) => doc.playlistId === playlistId.value,
  key: `playlist-summaries-${route.params.slug}`
})
watch(() => route.params.slug, () => refresh())
```
- **Pros**: Fully reactive, re-fetches on navigation
- **Cons**: More code
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be filled during triage_

## Technical Details

- **Affected files**: `src/pages/playlists/[slug].vue`
- **Components**: useContentStream, playlist page
- **Database changes**: None

## Acceptance Criteria

- [ ] Navigating between playlists via client-side links shows correct summaries for each playlist
- [ ] No stale data from previous playlist visible after navigation

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | PR #20 code review | Identified non-reactive where clause |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/20
- File: `src/pages/playlists/[slug].vue`

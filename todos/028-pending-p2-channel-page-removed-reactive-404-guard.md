---
status: pending
priority: p2
issue_id: "028"
tags: [code-review, bug, navigation, ssr]
dependencies: []
---

# Channel Page Removed Reactive 404 Guard for Client-Side Navigation

## Problem Statement

The PR refactored `src/pages/channels/[slug].vue` and replaced the synchronous `throw createError()` + reactive `watch(channelConfig, ...)` pattern with a `shouldShow404` computed property rendered as `<PageNotFound>`. While the inline 404 rendering works, the removal of `throw createError()` means:

1. The page no longer returns a proper HTTP 404 status code during SSR for invalid channel slugs
2. Search engines will index the 404 page as a 200 response
3. The `<PageNotFound>` component renders within the normal page layout, not the error page

Similarly, the playlist page (`src/pages/playlists/[slug].vue`) removed the reactive `watch(playlist, ...)` guard. If `playlist` becomes undefined during client-side navigation (e.g., user edits the URL to an invalid slug), `showError` is no longer called.

## Findings

- **Source**: `src/pages/channels/[slug].vue` (removed `throw createError` and `watch` guard), `src/pages/playlists/[slug].vue` (removed `watch` guard)
- **Agent**: architecture-reviewer
- **Evidence**: The old code had `throw createError({ statusCode: 404 })` for SSR and `watch(channelConfig, (config) => { if (!config) showError(...) })` for client-side nav. Both were removed.
- **Impact**: SEO impact (200 status for non-existent channels), inconsistent UX (inline error vs error page)

## Proposed Solutions

### Solution A: Restore `throw createError` for SSR + keep inline 404
Keep `shouldShow404` for client-side rendering but add back the SSR throw:
```ts
if (import.meta.server && !channelConfig.value) {
  throw createError({ statusCode: 404, message: 'Channel not found' })
}
```
- **Pros**: Correct HTTP status for SSR, good client-side UX
- **Cons**: Two code paths for 404 handling
- **Effort**: Small
- **Risk**: Low

### Solution B: Restore original pattern fully
Bring back `throw createError` + `watch` + `showError` as before.
- **Pros**: Proven pattern, correct HTTP status, handles both SSR and client-side
- **Cons**: Slightly more code
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be filled during triage_

## Technical Details

- **Affected files**: `src/pages/channels/[slug].vue`, `src/pages/playlists/[slug].vue`
- **Components**: Error handling, SEO
- **Database changes**: None

## Acceptance Criteria

- [ ] Invalid channel slug returns HTTP 404 during SSR/prerender
- [ ] Client-side navigation to invalid channel shows error appropriately
- [ ] Same for playlist pages

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | PR #20 code review | Identified missing 404 status code for SSR |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/20
- Nuxt error handling: https://nuxt.com/docs/getting-started/error-handling

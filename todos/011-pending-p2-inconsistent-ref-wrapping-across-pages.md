---
status: resolved
priority: p2
issue_id: "011"
tags: [code-review, quality, architecture]
dependencies: []
resolved_date: "2026-03-05"
resolution: "Standardized all four pages on computed(() => data.value || []) pattern. Playlist page now uses computed<Sortable[]> instead of ref<any[]> + watch, eliminating the any type and the unnecessary watch/ref indirection."
---

# Inconsistent Ref Wrapping Patterns Across List Pages

## Problem Statement

The four list pages use three different patterns to pass data into `useSortOptions`, creating inconsistency that makes the codebase harder to understand and maintain:

1. **Homepage** (`index.vue`): Wraps in `computed(() => summaries.value || [])` -- defensive null guard
2. **Tag page** (`tags/[slug].vue`): Uses `computed(() => summaries.value || [])` -- same pattern
3. **Channel page** (`channels/[slug].vue`): Passes `summaries` directly (a local `computed` ref) -- no null guard
4. **Playlist page** (`playlists/[slug].vue`): Uses `ref<any[]>([])` + `watch` to sync -- entirely different pattern, also uses `any[]`

## Findings

- **Location**: `src/pages/index.vue:11`, `src/pages/tags/[slug].vue:23`, `src/pages/channels/[slug].vue:58`, `src/pages/playlists/[slug].vue:13-35`
- **Evidence**: Three distinct patterns for the same operation across four pages.
- **Impact**: The playlist page's `ref<any[]>` bypasses the `Sortable` generic constraint, losing type safety. The `watch` + `ref` pattern in the playlist page is more complex than necessary and could be replaced with a computed.
- **Root cause**: The playlist page's synchronous `throw createError()` forces composables to be called before data is available, requiring the `ref` + `watch` workaround.

## Proposed Solutions

### Solution A: Standardize on computed wrapper with null guard (Recommended)
- Use `computed(() => data.value || [])` consistently across all pages.
- For the playlist page, restructure to avoid the synchronous throw or move the throw after composable setup.
- **Pros**: Consistent pattern. Type-safe. No `any`.
- **Cons**: Playlist page may need minor restructuring.
- **Effort**: Small
- **Risk**: Low

### Solution B: Accept current patterns with documentation
- Add a comment in each page explaining why the pattern differs.
- **Pros**: No code changes.
- **Cons**: Does not fix the `any[]` type safety loss in the playlist page.
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be filled during triage._

## Technical Details

- **Affected files**: `src/pages/index.vue`, `src/pages/tags/[slug].vue`, `src/pages/channels/[slug].vue`, `src/pages/playlists/[slug].vue`
- **Components**: Page orchestration layer
- **Database changes**: None

## Acceptance Criteria

- [ ] All four pages use the same pattern for passing data to `useSortOptions`
- [ ] No `any[]` type annotations in page-level sort wiring
- [ ] All pages handle null/undefined data gracefully

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Identified during PR #3 code review | Three different ref-wrapping patterns across four pages |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/3

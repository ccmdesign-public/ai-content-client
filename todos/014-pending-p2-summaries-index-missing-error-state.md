---
status: resolved
priority: p2
issue_id: "014"
tags: [code-review, quality, error-handling]
dependencies: []
---

# Summaries Index Page Missing Error State

## Problem Statement

`src/pages/summaries/index.vue` destructures only `{ data: summaries, pending }` from `useContentStream('summaries')` on line 12. It does NOT destructure `error` or `refresh`, meaning if the content stream fails, the page silently shows nothing (no skeleton, no error message, no retry button). Every other data-fetching page in this PR has error handling with `PageErrorState` -- this is the only one missing it.

## Findings

- **File:** `src/pages/summaries/index.vue`, line 12
- All other pages in the PR correctly destructure `error` and `refresh` and render `<PageErrorState>`
- `channels/[slug].vue` (line 17-18), `tags/[slug].vue` (line 18), `playlists/[slug].vue` (line 16), `tools/index.vue` (line 27), `articles/[...slug].vue` (line 65), `articles/publications/[slug].vue` (line 15) all have error states
- The summaries index is the main landing page -- arguably the most important page to have error recovery

## Proposed Solutions

### Option A: Add error/refresh destructuring and PageErrorState
Add `error` and `refresh` to the destructured return, add a `<PageErrorState v-else-if="error">` block in the template.

- **Pros:** Consistent with all other pages, simple fix
- **Cons:** None
- **Effort:** Small (5 minutes)
- **Risk:** None

## Recommended Action

Option A -- straightforward consistency fix.

## Technical Details

- **Affected files:** `src/pages/summaries/index.vue`
- **Components:** PageErrorState (already imported on other pages, auto-imported)

## Acceptance Criteria

- [ ] `error` and `refresh` are destructured from `useContentStream`
- [ ] `<PageErrorState>` renders when `error` is truthy
- [ ] Retry button calls `refresh()`
- [ ] Existing loading/empty/search states still work correctly

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created during PR #16 code review | Summaries index is the only page missing error state |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/16

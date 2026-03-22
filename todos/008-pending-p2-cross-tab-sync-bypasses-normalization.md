---
status: done
priority: p2
issue_id: "008"
tags: [code-review, architecture, caching]
dependencies: []
---

# Cross-tab storage sync injects raw data without normalization

## Problem Statement

The `storage` event handler in `useSummariesData` writes directly to `nuxtApp.payload.data['summaries-list']` without running `normalizeSummaryDocs`. This means the injected data may have stale pre-computed timestamps (from todo 007) or, if todo 007 is fixed and pre-computed fields are stripped from cache, the injected data will lack `_publishedAtMs` and `_processedAtMs` entirely. Either way, consumers of `result.data` (the raw `useAsyncData` output, not the computed `data`) get un-normalized data from the other tab.

Additionally, injecting into `payload.data` does not trigger Vue reactivity on the `computed` wrapper -- the `data` computed in `useSummariesData` depends on `result.data.value` (the `useAsyncData` ref), but directly mutating `payload.data` does not change that ref's identity under `deep: false`.

## Findings

- **Location:** `src/composables/useSummariesData.ts`, lines 148-158
- The handler parses `e.newValue` and writes to `nuxtApp.payload.data['summaries-list']`
- This does NOT trigger `result.data` reactivity because `payload.data` is not a reactive source for `useAsyncData`'s ref
- The cross-tab sync is effectively a no-op -- the injected data is never consumed by the reactive chain

## Proposed Solutions

### Option A: Call `result.refresh()` on storage event instead of direct injection
- **Pros:** Ensures data goes through the full normalization pipeline; triggers proper reactivity
- **Cons:** Causes a server fetch if `getCachedData` returns undefined; may need to seed payload first then refresh
- **Effort:** Small
- **Risk:** Medium -- refresh may cause flicker or unnecessary network request

### Option B: Update `result.data.value` directly via `triggerRef` or re-assign
- **Pros:** Triggers reactivity correctly; avoids network fetch
- **Cons:** Bypasses `useAsyncData` internal state; may conflict with Nuxt internals
- **Effort:** Medium
- **Risk:** Medium -- undocumented behavior

### Option C: Remove cross-tab sync entirely (simplify)
- **Pros:** Eliminates dead code; simplifies the composable; cross-tab sync is a nice-to-have, not critical
- **Cons:** Tabs won't share data updates
- **Effort:** Small
- **Risk:** Low

## Recommended Action



## Technical Details

- **Affected files:** `src/composables/useSummariesData.ts`
- **Components:** useSummariesData composable, storage event handler
- **Database changes:** None

## Acceptance Criteria

- [ ] Cross-tab sync either works end-to-end (data is normalized AND triggers reactivity) or is removed
- [ ] No dead code paths remain
- [ ] Unit test covers the chosen behavior

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-22 | Identified during PR #22 code review | Direct payload mutation does not trigger useAsyncData reactivity with deep: false |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/22
- [Nuxt useAsyncData internals](https://nuxt.com/docs/4.x/api/composables/use-async-data)

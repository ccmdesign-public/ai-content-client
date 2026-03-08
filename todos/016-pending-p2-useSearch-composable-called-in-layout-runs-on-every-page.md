---
status: pending
priority: p2
issue_id: "016"
tags: [code-review, performance, architecture]
dependencies: []
---

# useSearch Composable Instantiated in Layout Runs on Every Page

## Problem Statement

`useSearch()` is called in `src/layouts/default.vue` and provided to all pages via `provide/inject`. This means the composable is instantiated on every page load -- including summary detail pages, tag pages, channel pages, etc. -- even though search is only consumed on the homepage (`src/pages/index.vue`).

The composable registers `onUnmounted` handlers, creates reactive refs, sets up a `watch` on `query`, and reads `route.query.q`. All of this runs unnecessarily on pages that never use search.

## Findings

- **Location**: `src/layouts/default.vue`, lines 27-37
- **Evidence**: `const search = useSearch()` is called unconditionally in the layout's `<script setup>`, which executes for every page using this layout.
- **Impact**: Minor per-page overhead (reactive setup, route reading, watcher registration). The lazy `init()` pattern means the index fetch does not happen until the user interacts, so the performance hit is modest. However, the URL sync watcher runs on every page, which means navigating to `/summaries/abc?q=test` would trigger router.replace on a page that doesn't display search results.
- **Severity rationale**: P2 because it causes unintended URL mutation behavior on non-search pages and violates the principle of co-locating composable usage with the component that needs it.

## Proposed Solutions

### Solution A: Move useSearch to index.vue only (Recommended)
- Call `useSearch()` directly in `src/pages/index.vue` instead of providing it from the layout. Remove the provide/inject pattern entirely.
- **Pros**: Search logic only runs on the homepage. No unintended URL syncing on other pages. Simpler architecture.
- **Cons**: If search is later needed on other pages, the composable call must be added there too.
- **Effort**: Small
- **Risk**: Low

### Solution B: Lazy provide with conditional init
- Keep the provide in layout but gate all watchers and URL sync behind a flag that consuming pages set via `inject`.
- **Pros**: Keeps the centralized provider pattern for future multi-page search.
- **Cons**: More complex. Over-engineered for current single-page use.
- **Effort**: Medium
- **Risk**: Low

## Recommended Action


## Technical Details

- **Affected files**: `src/layouts/default.vue`, `src/composables/useSearch.ts`, `src/pages/index.vue`
- **Components**: Layout, useSearch composable
- **Database changes**: None

## Acceptance Criteria

- [ ] `useSearch()` is not instantiated on pages that don't use search
- [ ] Navigating to `/summaries/abc?q=test` does not trigger router.replace
- [ ] Search still works correctly on the homepage
- [ ] URL sync (`?q=keyword`) still works on the homepage

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-08 | Created from PR #5 code review | Layout-level composable instantiation has side effects on all pages |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/5
- File: `src/layouts/default.vue` (lines 27-37)
- File: `src/composables/useSearch.ts` (URL sync watcher)

---
status: pending
priority: p2
issue_id: "028"
tags: [code-review, quality, architecture]
dependencies: []
---

# Stale "Homepage" Naming in Summaries Index Page

## Problem Statement

The new `src/pages/summaries/index.vue` carries over naming from the old homepage without updating it for the new context. The CSS class `home-page` and the composable import `useHomepageFilter` both reference "home" or "homepage" despite this page now living at `/summaries/`. This creates a misleading mental model for developers reading the code.

## Findings

- **Location**: `src/pages/summaries/index.vue` lines 5, 22, 62, 151
- **Evidence**:
  - Line 5: `import { useHomepageFilter } from '~/composables/useHomepageFilter'`
  - Line 22: `} = useHomepageFilter(summaries, tagsByCategory)`
  - Line 62: `<div class="home-page">`
  - Line 151: `.home-page { ... }`
- **Related**: `src/composables/useHomepageFilter.ts` -- the composable itself is named for the homepage
- **Impact**: Code readability. A developer looking at `/summaries/index.vue` and seeing `home-page` class or `useHomepageFilter` import will be confused about whether this is the homepage or the summaries page.

## Proposed Solutions

### Solution A: Rename CSS class only in this PR (Recommended)
- Change `home-page` to `summaries-page` in the template and style block of `summaries/index.vue`. This is a scoped CSS change with zero risk.
- Defer the composable rename (`useHomepageFilter` -> `useSummariesFilter`) to a follow-up since it touches multiple files and tests.
- **Pros**: Quick fix, low risk, improves readability
- **Cons**: Partial -- composable name still says "homepage"
- **Effort**: Small
- **Risk**: Low

### Solution B: Rename everything (CSS class + composable)
- Rename `home-page` CSS class AND rename `useHomepageFilter` to `useSummariesFilter` across all files.
- **Pros**: Fully consistent naming
- **Cons**: Larger diff, touches composable file and test file
- **Effort**: Medium
- **Risk**: Low (but increases PR scope)

## Recommended Action

_(To be filled during triage)_

## Technical Details

- **Affected files**: `src/pages/summaries/index.vue`, `src/composables/useHomepageFilter.ts`, `src/tests/tags/useHomepageFilter.test.ts`
- **Components**: None
- **Database changes**: None

## Acceptance Criteria

- [ ] CSS class in `summaries/index.vue` no longer references "home"
- [ ] (If Solution B) Composable renamed from `useHomepageFilter` to `useSummariesFilter`

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created during PR #8 code review | Plan doc (line 173) already noted this as a follow-up item |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/8
- Plan doc acknowledgment: `docs/plans/2026-03-19-001-feat-relocate-summaries-unlink-nav-plan.md` line 173

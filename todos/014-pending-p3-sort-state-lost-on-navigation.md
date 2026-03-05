---
status: pending
priority: p3
issue_id: "014"
tags: [code-review, ux, enhancement]
dependencies: []
---

# Sort State Lost on Page Navigation

## Problem Statement

The sort selection is stored in a plain `ref()` with no persistence. When a user selects "Title A-Z" on the homepage, navigates to a tag page, and returns, the sort resets to the default "Newest first". This is the expected MVP behavior (acknowledged in the plan as deferred), but worth tracking as a follow-up.

## Findings

- **Location**: `src/composables/useSortOptions.ts:29`
- **Evidence**: `const currentSort = ref<SortKey>(defaultSort)` -- no URL query param or localStorage binding.
- **Impact**: Minor UX friction. Users must re-select their preferred sort on every page visit.
- **Note**: The plan document explicitly defers URL persistence to a follow-up, with SSR hydration validation identified as a required safeguard.

## Proposed Solutions

### Solution A: URL query param persistence
- Read `?sort=` from `useRoute().query` on mount, write with `navigateTo({ query: { sort } }, { replace: true })`.
- Validate against `SortKey` union to prevent hydration mismatches.
- **Effort**: Medium
- **Risk**: Low-Medium (SSR hydration edge case)

### Solution B: localStorage persistence
- Simpler but not shareable. Requires `import.meta.client` guard.
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be filled during triage._

## Technical Details

- **Affected files**: `src/composables/useSortOptions.ts`

## Acceptance Criteria

- [ ] Sort preference persists across page navigations
- [ ] Invalid sort values in URL/storage fall back to default
- [ ] No SSR hydration mismatches

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Identified during PR #3 code review | Deferred per plan; tracked for follow-up |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/3
- Plan: `docs/plans/2026-03-05-feat-sorting-by-publish-date-plan.md` (URL State Persistence section)

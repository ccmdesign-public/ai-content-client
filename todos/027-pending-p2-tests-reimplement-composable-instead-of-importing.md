---
status: wont_fix
priority: p2
issue_id: "027"
tags: [code-review, testing, quality]
dependencies: []
---

# useSummaryQuery tests re-implement the composable instead of importing it

## Problem Statement

The test file `src/tests/composables/useSummaryQuery.test.ts` defines a `useSummaryQueryTestable()` function that **copies the entire composable logic** (~45 lines) rather than importing and testing the real `useSummaryQuery` from `src/composables/useSummaryQuery.ts`. This means the tests validate a snapshot of the logic at the time the tests were written, not the actual production code. If someone modifies the real composable (e.g., adds a new filter, changes draft handling), the tests will still pass even though the real code has diverged.

## Findings

### Evidence

- `src/tests/composables/useSummaryQuery.test.ts` lines 104-150: `useSummaryQueryTestable()` re-implements the composable
- The real composable at `src/composables/useSummaryQuery.ts` is never imported in the test file
- Both implementations are currently identical, but they will inevitably drift

### Agent: quality-reviewer

The test pattern used here (re-implementing instead of importing) is an anti-pattern that defeats the purpose of testing. The correct approach is to mock the auto-imported Nuxt dependencies (`useAsyncData`, `queryCollection`, `computed`, `toValue`) and then import the real composable. The existing test infrastructure in this project (using `@nuxt/test-utils` with `nuxt-vitest` environment) supports this pattern.

## Proposed Solutions

### Solution 1: Import real composable with mocked Nuxt auto-imports (Recommended)
Use `vi.mock` to stub `useAsyncData` and `queryCollection` at the module level, then import the real `useSummaryQuery`. This is how `useTagIndex` and other composables should be tested.
- **Pros:** Tests verify actual production code, catches regressions
- **Cons:** Requires setting up Nuxt auto-import mocking (one-time complexity)
- **Effort:** Medium
- **Risk:** Low

### Solution 2: Use nuxt-vitest environment
Configure the test file to use `@nuxt/test-utils/runtime` environment which provides real auto-imports.
- **Pros:** Most realistic test environment
- **Cons:** Heavier setup, slower tests
- **Effort:** Medium
- **Risk:** Low

## Recommended Action

Solution 1 -- mock auto-imports and test the real composable.

## Technical Details

- **Affected files:** `src/tests/composables/useSummaryQuery.test.ts`
- **Components:** Test infrastructure, useSummaryQuery composable

## Acceptance Criteria

- [ ] Test file imports the real `useSummaryQuery` from `src/composables/useSummaryQuery.ts`
- [ ] `useSummaryQueryTestable` function is removed
- [ ] All 11 tests still pass against the real composable
- [ ] Future changes to the composable are caught by tests

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | Identified test re-implementation anti-pattern during PR #19 review | Tests that copy source code instead of importing it provide false confidence |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/19
- Real composable: `src/composables/useSummaryQuery.ts`
- Test file: `src/tests/composables/useSummaryQuery.test.ts`

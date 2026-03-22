---
status: pending
priority: p2
issue_id: "028"
tags: [code-review, quality, testing]
dependencies: []
---

# useSummariesData tests replicate logic instead of testing the composable

## Problem Statement

The test file `useSummariesData.test.ts` does not import or call `useSummariesData()`. Instead, it manually reimplements the normalization logic inline and tests that copy. This means:

1. The actual composable is untested -- a regression in `useSummariesData.ts` would not be caught
2. The tests give false confidence: they pass even if the composable is completely broken
3. The `SUMMARY_LIST_FIELDS` tests are valid (they import the real constant), but the "metadata normalization" tests are testing inlined code, not the composable

## Findings

- `src/tests/composables/useSummariesData.test.ts:28-65` -- manually reimplements `typeof doc.metadata === 'string' ? JSON.parse(...) : doc.metadata` instead of calling the composable
- No mock of `useContentStream`, `useAsyncData`, or `computed` -- the composable itself is never invoked
- The PR claims "6 tests covering field inclusion/exclusion and metadata normalization" but only the field tests actually validate production code

## Proposed Solutions

### Option 1: Mock useContentStream and test the real composable

**Approach:** Use `vi.mock` to mock `useContentStream` returning controlled data, then call `useSummariesData()` in a Vue test utils setup context and verify the computed output.

**Pros:**
- Tests the actual composable code path
- Catches regressions in normalization logic
- Tests the integration between useContentStream and the computed

**Cons:**
- Requires mocking Nuxt/Vue composable context (useAsyncData, computed)
- More complex test setup

**Effort:** 1-2 hours

**Risk:** Low

---

### Option 2: Extract normalization to a pure function and test that

**Approach:** Extract the metadata normalization logic from the computed into a standalone `normalizeMetadata(docs)` function, export it, and test that directly.

**Pros:**
- Pure function is trivially testable
- No mocking needed
- Tests the actual production code path

**Cons:**
- Small refactor of useSummariesData.ts

**Effort:** 30 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `src/tests/composables/useSummariesData.test.ts` -- test file
- `src/composables/useSummariesData.ts` -- composable under test

## Resources

- **PR:** #21

## Acceptance Criteria

- [ ] Tests exercise the actual production code (composable or extracted function)
- [ ] Malformed metadata edge case is tested
- [ ] Null/undefined data case is tested
- [ ] Tests fail when composable logic is intentionally broken

## Work Log

### 2026-03-22 - Initial Discovery

**By:** Claude Code (CE Review)

**Actions:**
- Compared test file against composable source
- Identified that tests replicate logic instead of importing composable
- Drafted 2 solution approaches

**Learnings:**
- Tests that reimplement logic give false confidence -- always test the actual code path

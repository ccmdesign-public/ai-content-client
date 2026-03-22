---
status: pending
priority: p3
issue_id: "010"
tags: [code-review, testing]
dependencies: []
---

# No integration test for useSummariesData composable (cache seeding, revalidation, storage sync)

## Problem Statement

The test file `src/tests/composables/useSummariesData.test.ts` covers the exported pure functions (`normalizeSummaryDocs`, `readLocalCache`, `writeLocalCache`, `safeParseMetadata`) but does not test the `useSummariesData()` composable itself. The composable contains significant logic: localStorage cache seeding, staleness checking, `isRevalidating` state management, and the storage event listener with cleanup. None of this is exercised by existing tests.

## Findings

- **Location:** `src/tests/composables/useSummariesData.test.ts`
- Tests exist for: `safeParseMetadata`, `normalizeSummaryDocs`, `readLocalCache`, `writeLocalCache`
- No tests for: `useSummariesData()` composable behavior
- Untested flows: Tier 1 cache seeding, staleness-triggered revalidation, `isRevalidating` lifecycle, `onScopeDispose` cleanup, cross-tab sync handler

## Proposed Solutions

### Option A: Add composable-level tests with mocked Nuxt context
- **Pros:** Verifies the integration of all cache tiers
- **Cons:** Requires mocking `useNuxtApp`, `useAsyncData`, `useContentStream`, `import.meta.client`
- **Effort:** Medium
- **Risk:** Low

## Recommended Action



## Technical Details

- **Affected files:** `src/tests/composables/useSummariesData.test.ts`
- **Components:** useSummariesData composable

## Acceptance Criteria

- [ ] Test covers: localStorage seeding when Nuxt payload is empty
- [ ] Test covers: staleness check triggers revalidation
- [ ] Test covers: `isRevalidating` transitions to true/false correctly
- [ ] Test covers: `onScopeDispose` removes storage event listener

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-22 | Identified during PR #22 code review | Composable integration untested despite good unit test coverage of helpers |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/22

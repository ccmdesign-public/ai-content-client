---
status: pending
priority: p2
issue_id: "010"
tags: [code-review, quality, testing]
dependencies: []
---

# Missing tests for useHomepageFilter composable

## Problem Statement

The `useHomepageFilter` composable contains meaningful logic -- pre-computed Map building, Set-based filtering, URL query parameter sync, and SSR-aware data fetching -- but no tests were added. This composable is the core business logic for the new feature and regressions would silently break the homepage filtering.

## Findings

- `src/composables/useHomepageFilter.ts` has 87 lines of logic with no corresponding test file.
- Existing test patterns exist at `src/tests/tags/useTagsConfig.test.ts` showing the project's approach to composable testing.
- Key logic paths that need coverage:
  1. `categoryVideoIdMap` correctly builds Map from tag data, filtering `type === 'summary'` only
  2. `filteredSummaries` returns all items when no category selected
  3. `filteredSummaries` returns only matching items when category selected
  4. `filteredSummaries` returns empty array when category has no matching summaries
  5. URL query parameter initialization and sync behavior

## Proposed Solutions

### Solution A: Unit tests with mocked Nuxt composables
Mock `useRoute`, `useRouter`, `useAsyncData`, and `queryCollection` to test the composable in isolation.

- **Pros**: Fast, focused, tests pure logic
- **Cons**: Requires mocking Nuxt internals
- **Effort**: Medium
- **Risk**: Low

### Solution B: Integration tests with Nuxt test utils
Use `@nuxt/test-utils` to test with a real Nuxt context.

- **Pros**: More realistic, catches integration issues
- **Cons**: Slower, more setup
- **Effort**: Medium
- **Risk**: Low

## Recommended Action

<!-- Filled during triage -->

## Technical Details

**Affected files:**
- `src/composables/useHomepageFilter.ts` (code under test)
- `src/tests/tags/useHomepageFilter.test.ts` (new test file to create)

## Acceptance Criteria

- [ ] Test file exists for `useHomepageFilter`
- [ ] Tests cover: no filter (all results), valid category filter, empty category, Map building logic
- [ ] Tests verify `type === 'summary'` filtering in cross-reference
- [ ] Tests pass in CI

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Created during PR #4 code review | Composable has non-trivial logic that warrants test coverage |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/4
- Existing test pattern: `src/tests/tags/useTagsConfig.test.ts`

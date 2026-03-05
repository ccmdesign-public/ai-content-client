---
status: resolved
priority: p3
issue_id: "013"
tags: [code-review, testing]
dependencies: []
resolved_date: "2026-03-05"
resolution: "Created src/tests/composables/useDateGroups.test.ts with 15 tests covering: all 6 date group buckets, correct ordering, within-group descending sort, default and custom date accessors, empty publishedAt fallback to processedAt, invalid date handling, empty input, and correct labels."
---

# Missing Tests for useDateGroups Composable Changes

## Problem Statement

The PR modifies `useDateGroups.ts` to accept a configurable date accessor and sort within groups, but adds no tests for this composable. While `useSortOptions` has 11 comprehensive tests, the changes to `useDateGroups` -- which include a new function signature with a default parameter and within-group sorting logic -- are untested.

## Findings

- **Location**: `src/composables/useDateGroups.ts`
- **Evidence**: No test file exists for `useDateGroups`. The PR adds `src/tests/composables/useSortOptions.test.ts` but not `useDateGroups.test.ts`.
- **Impact**: The configurable date accessor default (`item.metadata.publishedAt || item.processedAt`) and the within-group sort are untested. Edge cases like empty `publishedAt` falling back to `processedAt` are not verified.

## Proposed Solutions

### Solution A: Add useDateGroups tests (Recommended)
- Create `src/tests/composables/useDateGroups.test.ts` covering: default accessor, custom accessor, within-group sort order, empty/invalid dates, and the `isNaN` guard.
- **Pros**: Comprehensive coverage. Catches regressions.
- **Cons**: Additional test file to maintain.
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be filled during triage._

## Technical Details

- **Affected files**: `src/composables/useDateGroups.ts` (needs tests)
- **New file**: `src/tests/composables/useDateGroups.test.ts`

## Acceptance Criteria

- [ ] Test file exists for `useDateGroups`
- [ ] Tests cover: default date accessor, custom accessor, within-group sorting, invalid date handling
- [ ] All tests pass

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Identified during PR #3 code review | useDateGroups changes untested |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/3

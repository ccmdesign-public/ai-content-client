---
status: pending
priority: p3
issue_id: "005"
tags: [code-review, quality, testing]
dependencies: []
---

# Missing Tests for Tag Composables and Sync Script

## Problem Statement

The two new composables (`useTagsConfig` and `useTagIndex`) and the new sync script (`sync-tags.ts`) have no unit tests. The PR description notes "Existing test suite unchanged (6 pre-existing failures)" but does not add any new test coverage for the introduced functionality.

## Findings

- **Location**: `src/composables/useTagsConfig.ts`, `src/composables/useTagIndex.ts`, `scripts/sync-tags.ts`
- **Evidence**: No test files found matching `*tag*` in `src/tests/`.
- **Key logic to test**:
  - `useTagsConfig`: `tagsByCategory` grouping and sorting logic, `topTags` filtering, `getTagBySlug` lookup
  - `useTagIndex`: Cross-referencing tag items with summaries by videoId
  - `sync-tags.ts`: YAML parsing, JSON generation, tag name generation, validation

## Proposed Solutions

### Solution A: Add unit tests for composable logic (Recommended)
- Test the pure computed logic in `useTagsConfig` (grouping, sorting, top tags).
- Test the cross-reference filtering logic in `useTagIndex`.
- Test the sync script's name generation and validation.
- **Pros**: Catches regressions, documents expected behavior.
- **Cons**: Requires test setup.
- **Effort**: Medium
- **Risk**: Low

### Solution B: Add integration tests only
- Test the tag pages render correctly with mock data.
- **Pros**: Tests the full stack.
- **Cons**: Slower, more complex setup.
- **Effort**: Large
- **Risk**: Low

## Recommended Action

_To be decided during triage._

## Technical Details

- **Affected files**: `src/composables/useTagsConfig.ts`, `src/composables/useTagIndex.ts`, `scripts/sync-tags.ts`

## Acceptance Criteria

- [ ] Unit tests exist for `useTagsConfig` grouping/sorting logic
- [ ] Unit tests exist for tag name generation in sync script
- [ ] Tests pass with `npx vitest run`

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-01 | Identified during code review of PR #1 | |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/1

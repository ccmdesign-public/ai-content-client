---
status: pending
priority: p3
issue_id: "031"
tags: [code-review, accessibility, html-semantics]
dependencies: []
---

# Hardcoded `id="feed-content"` in DateGroupedFeed Could Cause Duplicate IDs

## Problem Statement

`DateGroupedFeed.vue` now has a hardcoded `id="feed-content"` on its root div, and `LoadMoreButton.vue` references it via `aria-controls="feed-content"`. While only one `DateGroupedFeed` renders per page currently, if the component is ever used twice on the same page (e.g., a comparison view, a tabbed layout), it would create duplicate IDs, which is invalid HTML and breaks `aria-controls` associations.

## Findings

- **Source**: `src/components/content/DateGroupedFeed.vue` line 28, `src/components/content/LoadMoreButton.vue` line 18
- **Agent**: accessibility-reviewer
- **Evidence**: Static `id="feed-content"` hardcoded in template

## Proposed Solutions

### Solution A: Use `useId()` for dynamic ID generation
Pass the generated ID from parent or generate it in DateGroupedFeed and pass to LoadMoreButton.
- **Effort**: Small
- **Risk**: None

### Solution B: Accept as-is with comment
Add a comment noting the single-instance assumption.
- **Effort**: Trivial
- **Risk**: None

## Recommended Action

_To be filled during triage_

## Technical Details

- **Affected files**: `src/components/content/DateGroupedFeed.vue`, `src/components/content/LoadMoreButton.vue`

## Acceptance Criteria

- [ ] No duplicate HTML IDs if component is reused

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | PR #20 code review | Identified static ID concern |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/20

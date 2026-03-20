---
status: pending
priority: p3
issue_id: "030"
tags: [code-review, quality, css]
dependencies: []
---

# No-Op Hover Style on Filter Reset Button

## Problem Statement

In `src/pages/summaries/index.vue`, the `.filtered-empty-state__reset:hover` rule sets `background: var(--primary)` which is identical to the non-hover state. The hover has no visual effect, which may be an oversight (the original likely intended a darker shade on hover).

## Findings

- **Location**: `src/pages/summaries/index.vue` lines 257-259
- **Evidence**: `.filtered-empty-state__reset { background: var(--primary); }` and `.filtered-empty-state__reset:hover { background: var(--primary); }` -- identical values
- **Impact**: Minor UX -- users get no visual feedback when hovering the "Show all summaries" button in the empty-filter state.

## Proposed Solutions

### Solution A: Add a visible hover effect (Recommended)
- Change hover to `opacity: 0.85` or `filter: brightness(1.1)` to provide visual feedback
- **Pros**: Better UX, consistent with other interactive elements
- **Cons**: Minor style change
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_(To be filled during triage)_

## Technical Details

- **Affected files**: `src/pages/summaries/index.vue`

## Acceptance Criteria

- [ ] The reset button has a visually distinct hover state

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created during PR #8 code review | This bug was carried over from the original index.vue |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/8

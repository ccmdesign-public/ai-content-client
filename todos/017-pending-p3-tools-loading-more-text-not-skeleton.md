---
status: pending
priority: p3
issue_id: "017"
tags: [code-review, quality, consistency]
dependencies: []
---

# Tools Page Infinite Scroll Uses "Loading more tools..." Text

## Problem Statement

`src/pages/tools/index.vue` line 131 uses "Loading more tools..." text for the infinite scroll trigger, while the CLAUDE.md standards say "Never use 'Loading...' text" and the PR itself replaces all such text with Skeleton components. The initial loading state uses skeletons correctly, but the infinite scroll load-more indicator reverts to text.

## Findings

- **File:** `src/pages/tools/index.vue`, line 131
- Initial loading (line 59-61): correctly uses `<Skeleton>` components
- Infinite scroll (line 130-133): uses text "Loading more tools..."
- This is a minor inconsistency -- the infinite scroll trigger is a progressive enhancement, not a full-page state

## Proposed Solutions

### Option A: Replace with skeleton rows
Show 2-3 skeleton tool card rows instead of text.

- **Pros:** Fully consistent with standards
- **Cons:** Slightly more template code
- **Effort:** Small
- **Risk:** Low

## Technical Details

- **Affected files:** `src/pages/tools/index.vue`

## Acceptance Criteria

- [ ] Infinite scroll loading indicator uses Skeleton components instead of text

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created during PR #16 code review | Infinite scroll loading states are easy to miss |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/16

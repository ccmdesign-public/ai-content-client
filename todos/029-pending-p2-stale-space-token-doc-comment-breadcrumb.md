---
status: pending
priority: p2
issue_id: "029"
tags: [code-review, quality, documentation]
dependencies: []
---

# Stale --space-* token reference in ccmBreadcrumb doc comment

## Problem Statement

`ccmBreadcrumb.vue` line 155 still references `var(--space-{token})` in its JSDoc comment for the `itemPaddingInline` prop. The PR's stated goal is removing all `--space-*` references, but this one was missed. While it's only a comment (not functional), it contradicts the PR's cleanup objective and may mislead future contributors.

## Findings

- **File:** `src/components/ds/molecules/ccmBreadcrumb.vue`, line 155-156
- **Text:** `Space token applied to inline padding on link items (\`var(--space-{token})\`)`
- **Context:** All other `--space-*` usage has been replaced with fixed rem values

## Proposed Solutions

### Solution A: Update the comment to reference rem values
- **Description:** Replace the `--space-{token}` reference with the current rem-based approach
- **Effort:** Small
- **Risk:** Low

## Acceptance Criteria

- [ ] No `--space-*` references remain in any doc comments in `src/`

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Identified during PR #7 code review | Doc comments should be updated during token migration |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/7
- File: `src/components/ds/molecules/ccmBreadcrumb.vue:155`

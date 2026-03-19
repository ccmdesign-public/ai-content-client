---
status: done
priority: p3
issue_id: "033"
tags: [code-review, quality, css, technical-debt]
dependencies: []
---

# Residual --_ccm-* custom properties in ccmTable and ccmFooter

## Problem Statement

The PR description acknowledges that `ccmTable` and `ccmFooter` still contain internal `--_ccm-*` custom properties (14+ occurrences in ccmTable, 1 in ccmFooter). While the PR description notes these are "internal component-scoped vars," they contradict the naming convention migration to shadcn tokens and should be tracked for future cleanup.

## Findings

- `src/components/ds/organisms/ccmTable.vue` -- 14 occurrences of `--_ccm-table-*`
- `src/components/ds/organisms/ccmFooter.vue` -- 1 occurrence of `--_ccm-footer-background-color`

## Proposed Solutions

### Solution A: Rename to component-scoped convention without ccm prefix
- **Description:** Rename `--_ccm-table-*` to `--_table-*` to match the pattern used in other migrated components (e.g., `--_btn-*`, `--_chip-*`, `--_ff-*`)
- **Effort:** Small
- **Risk:** Low

## Acceptance Criteria

- [ ] No `--_ccm-*` properties remain in any component

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Identified during PR #7 code review | Component-scoped vars should follow consistent naming |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/7

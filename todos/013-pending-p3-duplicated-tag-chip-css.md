---
status: resolved
priority: p3
issue_id: "013"
tags: [code-review, quality, css]
dependencies: []
resolved_date: "2026-03-05"
resolution: "Extracted shared .tag-chip styles into src/public/css/components/tag-chip.css within @layer components. Removed duplicated scoped styles from CategoryFilterBar.vue and tags/index.vue. CategoryFilterBar retains only a scoped min-height: 44px override for touch targets."
---

# Duplicated .tag-chip CSS between CategoryFilterBar and tags page

## Problem Statement

`CategoryFilterBar.vue` duplicates the `.tag-chip` base styles that already exist in `src/pages/tags/index.vue`. Both files define the same chip appearance (border-radius, padding, font, hover/focus states). This violates DRY and means styling changes must be applied in two places.

## Findings

- `src/components/content/CategoryFilterBar.vue` lines 168-237: Full `.tag-chip` style block (scoped)
- The plan document noted "Reuse the existing `.tag-chip` pattern" but the implementation copied rather than shared
- The project uses CUBE CSS with `src/public/css/styles.css` layer system

## Proposed Solutions

### Solution A: Extract shared chip styles to a utility layer
Move `.tag-chip` base styles to a shared CSS file in `src/public/css/` within the `components` or `utils` layer.

- **Pros**: Single source of truth, follows CUBE CSS methodology
- **Cons**: Requires refactoring both files
- **Effort**: Medium
- **Risk**: Low

### Solution B: Accept duplication for now (scoped isolation)
Keep scoped styles separate. Revisit if a third usage appears.

- **Pros**: No refactoring risk, scoped styles are explicit
- **Cons**: Divergence risk over time
- **Effort**: None
- **Risk**: Low

## Recommended Action

<!-- Filled during triage -->

## Technical Details

**Affected files:**
- `src/components/content/CategoryFilterBar.vue`
- `src/pages/tags/index.vue`
- `src/public/css/` (if extracting)

## Acceptance Criteria

- [ ] Tag chip styles have a single source of truth (if Solution A chosen)
- [ ] Visual appearance is unchanged after refactor

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Created during PR #4 code review | Related to existing todo 007 (duplicated CSS patterns) |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/4
- Related: `todos/007-pending-p3-duplicated-css-patterns-across-pages.md`

---
status: pending
priority: p3
issue_id: "012"
tags: [code-review, quality, css, dead-code]
dependencies: []
---

# tags/index.vue: Orphaned `tag-category` CSS Class After Style Removal

## Problem Statement

After removing the `<style scoped>` block from `tags/index.vue`, line 38 still applies `class="tag-category"` to the `<section>` element. This class was defined in the now-removed scoped styles and has no matching global CSS rule, making it a dead class reference.

## Findings

- **Source**: `src/pages/tags/index.vue` line 38
- `class="tag-category"` has no corresponding CSS anywhere in the codebase
- The section element has no other styling needs (the flex layout comes from the parent `div.flex.flex-col.gap-10`)
- Harmless but messy

## Proposed Solutions

### Option A: Remove the orphaned class
- Change `class="tag-category"` to remove the attribute entirely, or keep it empty
- **Effort**: Trivial
- **Risk**: None

## Technical Details

- **Affected files**: `src/pages/tags/index.vue` line 38

## Acceptance Criteria

- [ ] No orphaned CSS class references remain after scoped style removal

## Work Log

| Date | Action | Outcome |
|------|--------|---------|
| 2026-03-20 | Identified during PR #15 code review | Dead class reference |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/15

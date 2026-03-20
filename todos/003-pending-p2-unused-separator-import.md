---
status: done
priority: p2
issue_id: "003"
tags: [code-review, quality]
dependencies: []
---

# DateGroupedFeed imports Separator but never uses it

## Problem Statement

`DateGroupedFeed.vue` imports `Separator` from the sidebar separator component but never references it in the template. This is dead code that inflates the component's dependency graph and may confuse future maintainers.

## Findings

- `src/components/content/DateGroupedFeed.vue:5` -- `import { Separator } from '@/components/ui/separator'`
- No `<Separator>` tag anywhere in the template (lines 19-49)
- The plan mentioned replacing date headers with Separator + text label, but the implementation uses a styled `<h2>` with `border-b` instead

## Proposed Solutions

### Option 1: Remove unused import

**Approach:** Delete line 5.

**Effort:** 1 minute

**Risk:** Low

## Technical Details

**Affected files:**
- `src/components/content/DateGroupedFeed.vue:5`

## Resources

- **PR:** #13

## Acceptance Criteria

- [ ] No unused imports in DateGroupedFeed.vue
- [ ] Build passes

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)

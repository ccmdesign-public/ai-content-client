---
status: pending
priority: p3
issue_id: "009"
tags: [code-review, quality, maintainability]
dependencies: []
---

# CategoryFilterBar has long duplicated Tailwind class strings

## Problem Statement

`CategoryFilterBar.vue` has two `ToggleGroupItem` elements (lines 54-60 and 63-69) with identical, very long Tailwind class strings (~250 characters each). This duplication makes the component harder to maintain -- any styling change requires updating both strings identically.

## Findings

- `src/components/content/CategoryFilterBar.vue:56` and `:68` -- identical class strings:
  `inline-flex items-center gap-1 px-3 py-1 border rounded-full text-sm whitespace-nowrap min-h-[44px] shrink-0 cursor-pointer data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary data-[state=off]:bg-muted data-[state=off]:text-foreground data-[state=off]:border-border hover:bg-accent hover:text-accent-foreground`

## Proposed Solutions

### Option 1: Extract to a computed or constant

**Approach:** Define `const chipClass = '...'` in the script and reference `chipClass` in both template locations.

**Effort:** 5 minutes

**Risk:** Low

## Technical Details

**Affected files:**
- `src/components/content/CategoryFilterBar.vue`

## Resources

- **PR:** #13

## Acceptance Criteria

- [ ] No duplicated long class strings
- [ ] Visual appearance unchanged

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)

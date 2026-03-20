---
status: pending
priority: p2
issue_id: "001"
tags: [code-review, quality, ui]
dependencies: []
---

# IssueCard group-hover classes have no effect (missing group class on parent)

## Problem Statement

In `IssueCard.vue`, the `ArrowRight` icon uses `group-hover:translate-x-0.5 group-hover:text-primary` classes, but the parent `NuxtLink` element does not have the Tailwind `group` class. This means the hover animation on the arrow icon never triggers, resulting in a dead interaction affordance.

## Findings

- `src/components/content/IssueCard.vue:46` -- ArrowRight uses `group-hover:translate-x-0.5 group-hover:text-primary`
- `src/components/content/IssueCard.vue:23` -- parent `NuxtLink` has `class="flex items-center gap-4 py-5 px-2 no-underline text-inherit transition-colors hover:bg-muted"` but no `group` class
- The hover effect on the arrow was likely intended to provide a visual nudge when hovering the card row

## Proposed Solutions

### Option 1: Add `group` class to NuxtLink

**Approach:** Add `group` to the NuxtLink's class list.

**Pros:**
- One-line fix
- Enables the intended hover animation

**Cons:**
- None

**Effort:** 5 minutes

**Risk:** Low

## Technical Details

**Affected files:**
- `src/components/content/IssueCard.vue:23` -- add `group` to NuxtLink class

## Resources

- **PR:** #13

## Acceptance Criteria

- [ ] ArrowRight icon shifts right and turns primary on card hover
- [ ] Verified in both light and dark themes

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)

**Actions:**
- Identified missing `group` class during code review of PR #13

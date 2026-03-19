---
status: done
priority: p2
issue_id: "030"
tags: [code-review, quality, css]
dependencies: []
---

# CSS content property applied to non-pseudo-elements in tailwind.css icon utility

## Problem Statement

In `tailwind.css` lines 186-190, `content: attr(data-icon)` is applied to `.icon`, `[icon]::before`, and `[data-icon]`. The `content` CSS property only works on replaced elements and `::before`/`::after` pseudo-elements. Applying it to `.icon` (a regular element class) and `[data-icon]` (a regular element selector) has no effect. This is dead/incorrect CSS migrated from the old CUBE `utils.css`.

## Findings

- **File:** `src/assets/css/tailwind.css`, lines 186-190
- **Selectors affected:** `.icon` and `[data-icon]` -- `content` property is ignored by browsers on these
- **Only valid selector:** `[icon]::before` -- this one works correctly
- **The `[data-icon]::before` selector is missing** from this rule but present in the font-family rule above

## Proposed Solutions

### Solution A: Fix the selector list (Recommended)
- **Description:** Change to `[icon]::before, [data-icon]::before { content: attr(data-icon); }`
- **Effort:** Small
- **Risk:** Low

## Acceptance Criteria

- [ ] `content` property only applied to `::before`/`::after` pseudo-elements
- [ ] Icon rendering still works with `data-icon` attribute

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Identified during PR #7 code review | Migrated CSS should be validated for correctness |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/7
- File: `src/assets/css/tailwind.css:186-190`

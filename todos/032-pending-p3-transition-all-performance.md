---
status: pending
priority: p3
issue_id: "032"
tags: [code-review, performance, css]
dependencies: []
---

# `transition: all` causes unnecessary repaints in 3 components

## Problem Statement

Three components use `transition: all` which animates every CSS property change, including layout properties like `width`, `height`, and `padding` that trigger expensive repaints. Should specify only the intended properties (e.g., `transition: background-color 0.2s ease, color 0.2s ease`).

## Findings

- `src/components/ds/molecules/ccmButton.vue:225` -- `transition: all 0.2s ease-in-out`
- `src/components/ds/organisms/ccmSection.vue:156` -- `transition: all 0.3s ease`
- `src/components/content/docs-code-block.vue:112` -- `transition: all 0.2s ease`

## Proposed Solutions

### Solution A: Specify exact transition properties
- **Description:** Replace `all` with the specific properties being animated (color, background-color, border-color, opacity, filter, transform)
- **Effort:** Small
- **Risk:** Low

## Acceptance Criteria

- [ ] No `transition: all` in component CSS
- [ ] Animations still work as intended

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Identified during PR #7 code review | Specify transition properties for performance |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/7

---
status: resolved
priority: p3
issue_id: "016"
tags: [code-review, accessibility]
dependencies: []
---

# PageErrorState Focus Management is Fragile

## Problem Statement

`PageErrorState.vue` uses `useTemplateRef('retryButton')` with `onMounted` to auto-focus the retry button. However, `retryButton.value?.$el?.focus()` accesses the Vue component instance's `$el` property. This works for the shadcn-vue `Button` component today, but is fragile because:

1. If `retryable` is `false` (default `true`), the button is not rendered, and focus goes nowhere -- the error message itself is not focused.
2. The `$el` access pattern depends on Button being a single-root component.

For screen reader users hitting an error, focus should land on the error container (the `role="alert"` div) when `retryable` is false, so the error message is announced.

## Findings

- **File:** `src/components/content/PageErrorState.vue`, lines 21-24
- `onMounted` + `$el?.focus()` pattern works but is brittle
- When `retryable=false`, no focus management occurs at all
- The `role="alert"` on the container will announce the content to screen readers via live region, which partially mitigates this -- but explicit focus is better practice for page-level error states

## Proposed Solutions

### Option A: Focus the container div when retryable is false
Add a template ref to the container div and focus it (with `tabindex="-1"`) when there is no retry button.

- **Pros:** Better accessibility, handles both cases
- **Cons:** Adds `tabindex="-1"` to error container
- **Effort:** Small
- **Risk:** Low

## Technical Details

- **Affected files:** `src/components/content/PageErrorState.vue`

## Acceptance Criteria

- [ ] When `retryable=true`, retry button receives focus on mount
- [ ] When `retryable=false`, error container receives focus on mount
- [ ] Screen readers announce the error message in both cases

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created during PR #16 code review | role="alert" provides announcement but explicit focus is better for page-level errors |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/16
- WAI-ARIA alert role: https://www.w3.org/WAI/ARIA/apd/role/alert/

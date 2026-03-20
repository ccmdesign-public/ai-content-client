---
status: pending
priority: p3
issue_id: "006"
tags: [code-review, quality, accessibility]
dependencies: []
---

# sr-only Class Defined in Scoped Styles Instead of Global Utility

## Problem Statement

The `.sr-only` (screen-reader-only) CSS class is defined inside `<style scoped>` in `src/pages/issues/[id].vue`. This is a common utility class that should be defined once globally rather than duplicated in each component that needs it.

## Findings

- **File:** `src/pages/issues/[id].vue` lines ~283-293
- **Impact:** Code duplication if other components need `sr-only`; minor maintainability concern

## Proposed Solutions

### Option A: Move to a global utility stylesheet
- Define `.sr-only` in a global CSS file or Nuxt's `assets/css/` directory
- **Effort:** Small
- **Risk:** Low

## Recommended Action

<!-- Fill during triage -->

## Technical Details

- **Affected files:** `src/pages/issues/[id].vue`, global CSS

## Acceptance Criteria

- [ ] `.sr-only` is available globally without duplication

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #10 code review | |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/10

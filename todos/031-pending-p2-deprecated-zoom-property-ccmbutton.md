---
status: pending
priority: p2
issue_id: "031"
tags: [code-review, quality, css]
dependencies: []
---

# Deprecated `zoom: 1` CSS property in ccmButton

## Problem Statement

`ccmButton.vue` line 201 uses `zoom: 1`, which is a legacy IE hasLayout trigger. It is non-standard, deprecated, and has no effect in modern browsers. Since this PR is specifically about cleaning up legacy styling, this should be removed.

## Findings

- **File:** `src/components/ds/molecules/ccmButton.vue`, line 201
- **Property:** `zoom: 1`
- **Context:** This was a common IE6/7 hack to trigger `hasLayout`; no modern browser needs it

## Proposed Solutions

### Solution A: Remove the property
- **Description:** Delete `zoom: 1;` from `.ccm-button`
- **Effort:** Small
- **Risk:** Low

## Acceptance Criteria

- [ ] No `zoom` property in any component CSS

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Identified during PR #7 code review | Legacy IE hacks should be removed during styling audits |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/7
- File: `src/components/ds/molecules/ccmButton.vue:201`

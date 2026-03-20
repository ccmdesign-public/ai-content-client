---
status: pending
priority: p3
issue_id: "019"
tags: [code-review, quality, consistency]
dependencies: []
---

# Summary and Article Detail Pages Use Plain Div for Not-Found State

## Problem Statement

`src/pages/summaries/[slug].vue` line 15 and `src/pages/articles/[...slug].vue` line 16 render a plain `<div class="text-center text-muted-foreground">Not found</div>` for the not-found case. Other detail pages (`channels/[slug].vue`, `tags/[slug].vue`) use the `<PageNotFound>` component with icon, title, message, and back-link. This is inconsistent and provides a poor UX -- no icon, no helpful link, no accessible role.

## Findings

- **File:** `src/pages/summaries/[slug].vue`, line 15
- **File:** `src/pages/articles/[...slug].vue`, line 16
- Both use inline `<div>Not found</div>` instead of `<PageNotFound>`
- `channels/[slug].vue` and `tags/[slug].vue` correctly use `<PageNotFound>` with full props
- This was a known issue tracked in AIC-37 (CLAUDE.md existing violations), but since this PR touches these files, it's worth addressing

## Proposed Solutions

### Option A: Replace with PageNotFound component
Use `<PageNotFound>` with appropriate icon, title, message, and back-link.

- **Pros:** Consistent UX, accessible, helpful navigation
- **Cons:** Slightly larger change
- **Effort:** Small
- **Risk:** Low

## Technical Details

- **Affected files:** `src/pages/summaries/[slug].vue`, `src/pages/articles/[...slug].vue`

## Acceptance Criteria

- [ ] Both pages use `<PageNotFound>` component for 404 state
- [ ] Each has appropriate icon, title, message, and link back to parent list

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created during PR #16 code review | Files touched in PR should have known violations fixed opportunistically |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/16
- CLAUDE.md AIC-37 existing violations section

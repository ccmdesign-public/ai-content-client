---
status: pending
priority: p2
issue_id: "003"
tags: [code-review, accuracy, consistency, claude-md]
dependencies: []
---

# Pattern 2 (Detail Page) Does Not Match Actual summaries/[slug].vue

## Problem Statement

CLAUDE.md Pattern 2 (lines 123-129) describes the detail page pattern with several features that `src/pages/summaries/[slug].vue` does not actually implement:
- Claims `<PageNotFound>` for 404 handling -- not used (plain text "Not found" instead)
- Claims `useSeoMeta` for SEO -- not used in summaries detail page (only in tools/index.vue)
- Claims error handling distinguishes 500 vs 404 -- it does not

## Findings

- `src/pages/summaries/[slug].vue:3-5`: Uses plain divs with text for pending/error/not-found states
- `<PageNotFound>` is used in channels/[slug], issues/[id], tags/[slug] but NOT in the canonical example
- `useSeoMeta` appears only in `src/pages/tools/index.vue`
- The canonical example file is the weakest implementation of the pattern it claims to demonstrate

## Proposed Solutions

### Option A: Update Pattern 2 to match reality
- Remove `useSeoMeta` and `<PageNotFound>` claims, or note them as "should be added"
- Pros: Accurate
- Cons: Documents a weaker pattern
- Effort: Small
- Risk: Low

### Option B: Update the actual detail page to match the pattern
- Add `<PageNotFound>`, `useSeoMeta`, proper error distinction to summaries/[slug].vue
- Pros: Makes the canonical example truly canonical
- Cons: Scope creep for this PR
- Effort: Medium
- Risk: Low

## Recommended Action

(To be filled during triage)

## Technical Details

- **Affected files:** `CLAUDE.md` lines 123-129, `src/pages/summaries/[slug].vue`

## Acceptance Criteria

- [ ] Pattern 2 description matches the actual code in the referenced file
- [ ] Or the referenced file is updated to match the documented pattern

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created from PR #14 code review | Canonical example doesn't implement its own documented pattern |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/14

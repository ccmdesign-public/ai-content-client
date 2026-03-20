---
status: pending
priority: p3
issue_id: "007"
tags: [code-review, quality]
dependencies: []
---

# Newsletter Content Schema Uses z.string() Instead of z.string().url() for URLs

## Problem Statement

The `newsletters` collection schema in `content.config.ts` defines URL fields (`url` in `featuredPicks` and `quickLinks`) as `z.string()` rather than `z.string().url()`. The plan document actually specifies `.url()` validation, but the implementation dropped it. This means malformed URLs in content files won't be caught at build time.

## Findings

- **File:** `content.config.ts` lines ~40, ~48
- **Evidence:** `url: z.string()` vs plan's `url: z.string().url()`
- **Impact:** Malformed URLs pass validation silently, potentially causing broken links

## Proposed Solutions

### Option A: Add .url() validation (Recommended)
- Change `url: z.string()` to `url: z.string().url()` for both featuredPicks and quickLinks
- **Effort:** Small
- **Risk:** Low (may require fixing any existing content with malformed URLs)

## Recommended Action

<!-- Fill during triage -->

## Technical Details

- **Affected files:** `content.config.ts`

## Acceptance Criteria

- [ ] URL fields in newsletter schema use `z.string().url()`
- [ ] Build fails if content file has a malformed URL

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #10 code review | |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/10

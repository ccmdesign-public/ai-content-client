---
status: resolved
priority: p2
issue_id: "004"
tags: [code-review, architecture, quality]
dependencies: []
---

# failOnError: false in Prerender Config Suppresses Build Errors

## Problem Statement

The `nuxt.config.ts` change adds `failOnError: false` to the prerender configuration. While the PR body mentions "pre-existing channel prerender errors (emoji/special chars in slugs) are unrelated," silencing all prerender errors means legitimate failures (broken pages, missing data, 500 errors) will be silently ignored during builds.

## Findings

- **File:** `src/nuxt.config.ts` line ~128
- **Evidence:** `failOnError: false` added alongside the preset switch
- **Impact:** Broken pages could be deployed without anyone noticing; this masks real issues

## Proposed Solutions

### Option A: Fix the underlying prerender errors and keep failOnError: true (Recommended)
- Investigate and fix the emoji/special-char slug errors
- Keep build failures visible
- **Effort:** Medium
- **Risk:** Low

### Option B: Use route-specific error ignoring
- Instead of global `failOnError: false`, exclude only the known-broken routes from prerendering
- **Effort:** Small
- **Risk:** Low

## Recommended Action

<!-- Fill during triage -->

## Technical Details

- **Affected files:** `src/nuxt.config.ts`

## Acceptance Criteria

- [ ] `failOnError: false` is removed or replaced with targeted route exclusions
- [ ] Build fails if a new page has a prerender error

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #10 code review | Global error suppression is a code smell |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/10

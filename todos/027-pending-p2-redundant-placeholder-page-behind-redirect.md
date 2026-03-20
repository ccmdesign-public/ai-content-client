---
status: resolved
priority: p2
issue_id: "027"
tags: [code-review, architecture, quality]
dependencies: []
resolved_date: "2026-03-19"
resolution: "Stripped index.vue to a minimal empty template with a comment explaining the 302 redirect. Dead placeholder content removed."
---

# Redundant Placeholder Page Behind 302 Redirect

## Problem Statement

The PR adds both a 302 redirect rule in `nuxt.config.ts` (`'/': { redirect: { to: '/summaries/', statusCode: 302 } }`) AND a placeholder page at `src/pages/index.vue` with "Homepage coming soon" content and a styled link. Because the redirect fires before the page renders, the placeholder content will never be seen by any user. This is dead code from day one.

This matters because a future developer may try to update the placeholder text or style, not realizing it is unreachable. It also adds unnecessary bytes to the static build output.

## Findings

- **Location**: `src/pages/index.vue` (placeholder content) and `src/nuxt.config.ts` line 130 (redirect rule)
- **Evidence**: The `routeRules` redirect at `/` with status 302 means Nuxt/Nitro will issue a redirect response before any page component renders. The placeholder template, styles, and `definePageMeta` in `index.vue` are unreachable.
- **Impact**: Minor -- dead code that could mislead future contributors. When AIC-28 claims `/`, the developer must understand that the redirect must be removed AND the placeholder replaced, rather than just removing the redirect.

## Proposed Solutions

### Solution A: Remove placeholder content, keep minimal index.vue (Recommended)
- Strip `index.vue` to just `definePageMeta` and an empty template (or a single HTML comment explaining the redirect).
- **Pros**: No dead code, clear intent
- **Cons**: None significant
- **Effort**: Small
- **Risk**: Low

### Solution B: Remove the redirect, keep the placeholder
- Let users who visit `/` see the placeholder page with the link to `/summaries/`.
- **Pros**: Provides a soft landing for bookmarked users; avoids SEO redirect complexity
- **Cons**: Does not redirect search engine crawlers; users must click to reach summaries
- **Effort**: Small
- **Risk**: Low

### Solution C: Keep both (current state)
- Accept the redundancy as temporary until AIC-28.
- **Pros**: No changes needed
- **Cons**: Dead code in the build; potentially confusing for future contributors
- **Effort**: None
- **Risk**: Low

## Recommended Action

_(To be filled during triage)_

## Technical Details

- **Affected files**: `src/pages/index.vue`, `src/nuxt.config.ts`
- **Components**: None
- **Database changes**: None

## Acceptance Criteria

- [ ] Either the placeholder content is removed OR the redirect is removed (not both present simultaneously)
- [ ] The chosen approach is documented in a code comment explaining the temporary state

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created during PR #8 code review | Redirect + placeholder is a common pattern mismatch in static-generated Nuxt sites |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/8
- Nuxt Route Rules: https://nuxt.com/docs/guide/concepts/rendering#route-rules

---
status: pending
priority: p3
issue_id: "029"
tags: [code-review, seo, quality]
dependencies: []
---

# Sitemap Lists Redirect URL at Priority 1.0

## Problem Statement

The sitemap at `src/server/routes/sitemap.xml.ts` lists `/` with `priority: 1.0` and `changefreq: 'daily'`, but `/` is now a 302 redirect to `/summaries/`. Search engines following the sitemap will hit the redirect and may be confused by a high-priority URL that immediately redirects. Best practice is to either remove redirect URLs from sitemaps or lower their priority.

## Findings

- **Location**: `src/server/routes/sitemap.xml.ts` lines 42-46
- **Evidence**: `{ loc: '/', changefreq: 'daily', priority: 1.0 }` -- homepage entry unchanged despite being a redirect
- **Impact**: Minor SEO -- Google generally handles 302 redirects well, but having a redirect URL as the highest-priority entry in the sitemap is semantically incorrect. The `/summaries/` entry at priority 0.9 should arguably be the higher-priority page.

## Proposed Solutions

### Solution A: Swap priorities (Recommended)
- Set `/` to `priority: 0.5` and `/summaries/` to `priority: 1.0`
- **Pros**: Reflects actual site hierarchy
- **Cons**: Will need to change again when AIC-28 ships
- **Effort**: Small
- **Risk**: Low

### Solution B: Remove `/` from sitemap entirely
- Since it is a redirect, it adds no value to crawlers
- **Pros**: Cleaner sitemap
- **Cons**: Will need to re-add when AIC-28 claims `/`
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_(To be filled during triage)_

## Technical Details

- **Affected files**: `src/server/routes/sitemap.xml.ts`

## Acceptance Criteria

- [ ] Sitemap priorities reflect actual content hierarchy (redirect URL not highest priority)

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created during PR #8 code review | -- |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/8

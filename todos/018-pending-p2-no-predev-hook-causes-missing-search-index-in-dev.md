---
status: resolved
priority: p2
issue_id: "018"
tags: [code-review, dx, build]
dependencies: []
resolved_date: "2026-03-08"
resolution: "Added build-search-index.ts to postinstall script in package.json so the index is generated after npm install. Also added vitest globalSetup to build the index before tests."
---

# No predev Hook Causes Missing Search Index in Development

## Problem Statement

The PR adds `prebuild` and `pregenerate` hooks to run `build-search-index.ts`, but there is no `predev` hook. Developers running `npm run dev` for the first time (or after a clean checkout) will get a 404 for `/search-index.json`, causing the search feature to silently fail with "Search index could not be loaded".

This is a DX footgun: the feature works in production (because `prebuild` runs) but appears broken in development unless the developer manually runs `npm run build:search-index` first.

## Findings

- **Location**: `package.json` scripts section
- **Evidence**: `"prebuild": "tsx scripts/build-search-index.ts"` and `"pregenerate": "tsx scripts/build-search-index.ts"` exist, but no `"predev"` hook.
- **Impact**: Every new developer or CI environment running `npm run dev` will see search silently fail. The error is logged to console only (`console.warn`), making it easy to miss.
- **Note**: npm does not support `predev` as a lifecycle hook for custom scripts. The `dev` script uses `nuxt dev`, so a Nuxt hook or a documented setup step is needed.

## Proposed Solutions

### Solution A: Add a prepare or postinstall script (Recommended)
- Add `"prepare": "tsx scripts/build-search-index.ts"` or document it in the postinstall step so the index is built after `npm install`.
- **Pros**: Works for all environments (dev, build, generate). Single source of truth.
- **Cons**: Runs on every `npm install`, even when content hasn't changed. Could slow down installs.
- **Effort**: Small
- **Risk**: Low

### Solution B: Nuxt module hook
- Create a small Nuxt module that runs the index build on `build:before` or `dev:init` hooks.
- **Pros**: Tightly integrated with Nuxt lifecycle. Runs automatically in dev.
- **Cons**: More complex setup. Over-engineered for a single script.
- **Effort**: Medium
- **Risk**: Low

### Solution C: Document manual step + improve error UX
- Add a clear README note and improve the error UI so it tells the user to run `npm run build:search-index`.
- **Pros**: Minimal code change.
- **Cons**: Relies on developers reading docs. Poor DX.
- **Effort**: Small
- **Risk**: Medium (human error)

## Recommended Action


## Technical Details

- **Affected files**: `package.json`
- **Components**: Build scripts, development workflow
- **Database changes**: None

## Acceptance Criteria

- [ ] Running `npm run dev` on a fresh checkout results in a working search feature
- [ ] OR the error state clearly instructs the developer how to fix it

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-08 | Created from PR #5 code review | npm does not support predev lifecycle hook for custom scripts |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/5
- File: `package.json` (scripts section)

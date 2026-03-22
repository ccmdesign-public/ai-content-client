---
status: pending
priority: p2
issue_id: "027"
tags: [code-review, performance, nuxt-content, data-fetching]
dependencies: []
---

# useSummaryQuery and useTagIndex Fetch All Summaries Then Filter Client-Side

## Problem Statement

The PR changes `useSummaryQuery` and `useTagIndex` to fetch ALL summaries via `queryCollection('summaries').all()` and then filter client-side in JavaScript. This was done to work around Nuxt Content v3 storing nested Zod objects as JSON blobs in SQLite (making dot-notation `where` clauses fail).

While this correctly fixes the filtering bug, it introduces a performance regression: every channel page, tag page, and the summaries index all load the entire summaries collection into memory. With 500+ summaries (and growing), this means:

- Every page load transfers the full dataset
- Multiple `useAsyncData` calls with different keys may each independently fetch all summaries
- Memory pressure increases linearly with content growth

## Findings

- **Source**: `src/composables/useSummaryQuery.ts` line 54, `src/composables/useTagIndex.ts` line 68
- **Agent**: performance-reviewer
- **Evidence**: `queryCollection('summaries').all()` fetches everything; client-side `.filter()` then narrows results. The channels page (`[slug].vue`) now also uses `useContentStream('summaries')` which does the same.
- **Mitigating factor**: The summaries index page already loads all summaries, so the data may be cached by Nuxt's `useAsyncData` if the key matches. However, `useSummaryQuery` uses dynamic keys (`summary-query:ch:...`) which won't hit the same cache.

## Proposed Solutions

### Solution A: Use top-level field indexes
Add `channelId` and `videoId` as top-level fields in the Zod schema (duplicating from `metadata`), so `queryCollection().where()` works at the SQLite level.
- **Pros**: SQL-level filtering, minimal data transfer
- **Cons**: Schema change, migration of existing content, data duplication
- **Effort**: Medium
- **Risk**: Medium

### Solution B: Centralize via shared useContentStream cache
All pages use `useContentStream('summaries')` with the same cache key, then filter client-side from the shared cached result. This is what the channels page already does.
- **Pros**: Single fetch, shared cache, simpler code
- **Cons**: Still loads all data, but only once per session
- **Effort**: Small
- **Risk**: Low

### Solution C: Accept current approach with monitoring
At 500 items the performance impact is negligible (sub-millisecond filter). Add a size comment/log if the collection exceeds 2000 items.
- **Pros**: No code change needed
- **Cons**: Technical debt if content grows significantly
- **Effort**: None
- **Risk**: Low (for current scale)

## Recommended Action

_To be filled during triage_

## Technical Details

- **Affected files**: `src/composables/useSummaryQuery.ts`, `src/composables/useTagIndex.ts`, `src/pages/channels/[slug].vue`
- **Components**: Data fetching layer
- **Database changes**: None (unless Solution A)

## Acceptance Criteria

- [ ] Channel and tag pages load summaries efficiently
- [ ] No duplicate full-collection fetches per navigation

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | PR #20 code review | Identified fetch-all pattern across multiple composables |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/20
- Nuxt Content v3 SQLite limitation: nested Zod objects stored as JSON blobs

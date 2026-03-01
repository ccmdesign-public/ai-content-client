---
status: pending
priority: p2
issue_id: "001"
tags: [code-review, performance, architecture]
dependencies: []
---

# Full Summaries Collection Loaded for Tag Cross-Reference

## Problem Statement

`useTagIndex.ts` calls `useContentStream('summaries')` which loads the **entire** summaries collection into memory just to cross-reference tag items by `videoId`. On a site with hundreds of summaries, every tag detail page fetches all summary documents, parses their Markdown, and holds them in memory -- only to filter down to a small subset.

This is the most significant performance concern in the PR because it scales linearly with content growth and applies to every one of the 101 tag detail pages during static generation.

## Findings

- **Location**: `src/composables/useTagIndex.ts`, lines 37-38
- **Evidence**: `const { data: allSummaries, pending: summariesPending } = useContentStream('summaries')` fetches all summaries without any filtering, select, or limit.
- **Impact**: During SSG (static site generation), this means each of the 101 tag pages triggers a full load of all summaries. The `ai-general` tag alone has 328 items but the composable fetches ALL summaries regardless.
- **Comparison**: The existing `channels/[slug].vue` page has the same pattern (`useContentStream('summaries')` with client-side filter), so this is a pre-existing pattern, but tags now multiplies it by 101 prerendered pages.

## Proposed Solutions

### Solution A: Use `queryCollection` with a `where` clause on videoId (Recommended)
- Instead of loading all summaries and filtering, query only the summaries whose `metadata.videoId` matches the tag's item IDs.
- **Pros**: Dramatically reduces data loaded per page. Uses Nuxt Content's built-in query capabilities.
- **Cons**: May require an `in` operator or multiple queries depending on Nuxt Content v3 query API support.
- **Effort**: Medium
- **Risk**: Low

### Solution B: Pre-compute resolved summaries in the sync script
- During `sync-tags.ts`, embed the summary paths directly so the client can fetch individual items.
- **Pros**: Zero cross-reference needed at runtime.
- **Cons**: Couples sync script to client data model; increases YAML file sizes further.
- **Effort**: Medium
- **Risk**: Medium

### Solution C: Accept the pattern as-is (matches existing channel pages)
- Document the limitation and plan to address when content volume grows.
- **Pros**: No code change. Consistent with existing channel page pattern.
- **Cons**: Does not improve performance. Problem compounds with more content.
- **Effort**: Small
- **Risk**: Low (for now)

## Recommended Action

_To be decided during triage._

## Technical Details

- **Affected files**: `src/composables/useTagIndex.ts`
- **Components**: Tag detail page (`src/pages/tags/[slug].vue`)
- **Database changes**: None

## Acceptance Criteria

- [ ] Tag detail pages do not load the full summaries collection
- [ ] Page load time for large tags (e.g., ai-general with 328 items) is measurably improved
- [ ] Existing DateGroupedFeed rendering still works correctly

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-01 | Identified during code review of PR #1 | Pattern exists in channel pages too but is multiplied 101x by tag pages |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/1
- File: `src/composables/useTagIndex.ts`

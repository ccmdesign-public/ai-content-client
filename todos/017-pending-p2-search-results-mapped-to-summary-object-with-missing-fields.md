---
status: resolved
priority: p2
issue_id: "017"
tags: [code-review, architecture, quality]
dependencies: []
resolved_date: "2026-03-08"
resolution: "Created toSummaryProps() adapter function in index.vue that centralises the SearchResult-to-SummaryCard mapping. Single place to update if props change."
---

# Search Results Mapped to Summary Object with Missing Fields

## Problem Statement

In `src/pages/index.vue`, search results are mapped to a hand-crafted summary-like object for `SummaryCard`. This object omits several fields that `SummaryCard` may depend on (e.g., `tools`, `tags`, `description`, `duration`), and hardcodes the YouTube URL pattern. If `SummaryCard` evolves to use additional fields, the search-result path will silently produce broken or incomplete cards.

This creates a fragile coupling between the search result shape and the SummaryCard component's expected props.

## Findings

- **Location**: `src/pages/index.vue`, lines 96-110 (in the diff, the `<SummaryCard>` block within search results)
- **Evidence**:
  ```vue
  :summary="{
    metadata: {
      videoId: result.id,
      title: result.title,
      channel: result.channel,
      publishedAt: result.date,
      thumbnailUrl: result.thumbnailUrl,
      youtubeUrl: `https://www.youtube.com/watch?v=${result.id}`,
    },
    processedAt: result.date,
    tldr: result.tldr,
  }"
  ```
- **Impact**: Missing fields like `tools`, `tags`, `description` may cause rendering issues or undefined errors in SummaryCard. The YouTube URL construction assumes all IDs are YouTube video IDs, which may not hold if the content model expands.
- **Note in PR description**: The PR itself documents this as "a parallel data path to useContentStream" -- dual data paths always risk divergence.

## Proposed Solutions

### Solution A: Create a SearchResultCard component (Recommended)
- Build a dedicated `SearchResultCard.vue` that expects `SearchResult` type directly, rather than coercing search results into the SummaryCard prop shape.
- **Pros**: Clean separation of concerns. Each card component owns its own data contract. Search results can show different UI (e.g., highlight matched terms, show relevance score).
- **Cons**: New component to maintain. Some visual duplication with SummaryCard.
- **Effort**: Medium
- **Risk**: Low

### Solution B: Expand stored fields in search index
- Store all fields that SummaryCard needs in the MiniSearch index so the mapping is complete.
- **Pros**: SummaryCard works identically for both browse and search.
- **Cons**: Bloats the search index size. Still a fragile implicit contract.
- **Effort**: Small
- **Risk**: Medium (index size growth)

### Solution C: Add a type adapter function
- Create a `toSummaryProps(result: SearchResult)` utility that centralizes the mapping and includes runtime validation.
- **Pros**: Single place to update if SummaryCard props change. Can add defaults for missing fields.
- **Cons**: Still a dual data path; adapter must be kept in sync.
- **Effort**: Small
- **Risk**: Low

## Recommended Action


## Technical Details

- **Affected files**: `src/pages/index.vue`, `src/components/content/SummaryCard.vue`
- **Components**: SummaryCard, index page search results section
- **Database changes**: None

## Acceptance Criteria

- [ ] Search result cards render without undefined field warnings
- [ ] All fields expected by SummaryCard are either provided or have safe defaults
- [ ] Adding a new field to SummaryCard does not silently break search results

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-08 | Created from PR #5 code review | Dual data paths (content stream vs search index) create fragile coupling |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/5
- File: `src/pages/index.vue` (search results SummaryCard mapping)
- Related: `src/types/search.ts` (SearchResult interface)

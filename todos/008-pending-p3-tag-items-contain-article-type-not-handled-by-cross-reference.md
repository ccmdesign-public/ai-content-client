---
status: pending
priority: p3
issue_id: "008"
tags: [code-review, quality, architecture]
dependencies: []
---

# Tag Items Include "article" Type Not Handled by Cross-Reference Logic

## Problem Statement

The tag YAML files contain items with `type: "article"` (e.g., Medium articles) alongside `type: "summary"` items. However, `useTagIndex.ts` cross-references tag items only against the `summaries` collection using `metadata.videoId`. Article items will never match a summary's videoId, so they are silently dropped from the tag detail page display.

This means the item count shown on the tag overview page (from `tags-index.json`) will not match the actual number of items rendered on the tag detail page.

## Findings

- **Location**: `src/composables/useTagIndex.ts` lines 43-50, `src/content/tags/ai-general.yml`
- **Evidence**:
  - `ai-general.yml` includes items like `type: "article"` with IDs like `medium-2026-03-01-...`
  - `useTagIndex.ts` filters only where `tagVideoIds.has(s.metadata?.videoId)` -- articles don't have a `metadata.videoId`
  - Tag overview page shows `itemCount: 328` for ai-general, but the detail page will show fewer
- **Impact**: User-facing count mismatch. Users see "328 videos" on the overview but fewer items on the detail page.

## Proposed Solutions

### Solution A: Filter tag items to type "summary" only in the cross-reference
- Adjust the item count display to reflect only matched summaries.
- **Pros**: Accurate count. Simple fix.
- **Cons**: Hides article content from tag pages.
- **Effort**: Small
- **Risk**: Low

### Solution B: Support article content type in the tag detail page
- Add an articles collection and cross-reference both summaries and articles.
- **Pros**: Shows all tagged content.
- **Cons**: Requires articles collection support in the client app.
- **Effort**: Large
- **Risk**: Medium

## Recommended Action

_To be decided during triage._

## Technical Details

- **Affected files**: `src/composables/useTagIndex.ts`, `src/pages/tags/[slug].vue`

## Acceptance Criteria

- [ ] Item count shown on tag pages matches actual rendered items
- [ ] No silent data loss during cross-referencing

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-01 | Identified during code review of PR #1 | Articles are present in scraper output but client only supports summaries |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/1
- File: `src/content/tags/ai-general.yml`

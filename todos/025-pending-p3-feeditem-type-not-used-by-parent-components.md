---
status: pending
priority: p3
issue_id: "025"
tags: [code-review, typescript, types]
dependencies: []
---

# Shared Content Types Not Yet Adopted by Parent Components

## Problem Statement

The new `~/types/content.ts` types (`ArticleItem`, `SummaryItem`, `FeedItemType`) are used by `FeedItem.vue`, `ArticleCard.vue`, and `SummaryCard.vue`, which is good. However, parent components that pass `item` props to `FeedItem` (e.g., list pages rendering feeds) may still be using untyped or loosely typed data. The full benefit of the shared types is only realized when the content query results are also typed as `FeedItemType[]`.

## Findings

The types are well-structured and the type guards are functional. This finding is about maximizing the value of the new type system by ensuring consumers upstream also benefit.

Additionally, `SummaryMetadata` is exported from `content.ts` but should be verified as used by `SummaryCard`'s props (it is, via `SummaryItem.metadata`).

## Proposed Solutions

### Option A: Verify upstream usage in a follow-up pass
- Check that pages passing items to `FeedItem` use `FeedItemType` in their template/script
- **Effort:** Small
- **Risk:** Low

## Technical Details

- **Affected files:** `src/types/content.ts`, pages that render `<FeedItem>`

## Acceptance Criteria

- [ ] All components passing `item` to `FeedItem` have properly typed data

## Work Log

| Date | Action | Outcome |
|---|---|---|
| 2026-03-20 | Code review of PR #18 | Noted types are well-defined but upstream adoption should be verified |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/18

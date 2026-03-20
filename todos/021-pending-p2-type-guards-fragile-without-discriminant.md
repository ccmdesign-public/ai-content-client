---
status: pending
priority: p2
issue_id: "021"
tags: [code-review, typescript, type-safety]
dependencies: []
---

# Type Guards in content.ts Rely on Structural Checks Without Discriminant

## Problem Statement

The type guards `isArticle()` and `isSummary()` in `~/types/content.ts` use structural property checks (`'publicationName' in item`) rather than a discriminant field. If a future content type happens to have both `publicationName` and `path` properties, `isArticle()` would incorrectly return true. More importantly, both guards can return true for the same object if it has all checked properties, since they are not mutually exclusive.

## Findings

```typescript
// Current implementation (content.ts lines 34-39)
export function isArticle(item: FeedItemType): item is ArticleItem {
  return 'publicationName' in item && 'path' in item
}

export function isSummary(item: FeedItemType): item is SummaryItem {
  return 'metadata' in item && 'processedAt' in item
}
```

In `FeedItem.vue`, these guards are used with `v-if` / `v-else-if`, so in practice only one branch renders. But the type system does not enforce mutual exclusivity. An object with both `publicationName`, `path`, `metadata`, and `processedAt` would satisfy both guards.

The plan document proposed adding `_type?: 'article'` and `_type?: 'summary'` discriminant fields but they were not included in the final implementation.

## Proposed Solutions

### Option A: Add a `_type` discriminant field (preferred)
- Add `_type: 'article'` and `_type: 'summary'` as required fields populated by the content system
- Simplify guards to `return item._type === 'article'`
- **Pros:** Mutually exclusive by definition, fast, safe
- **Cons:** Requires content pipeline to set `_type`
- **Effort:** Medium
- **Risk:** Low

### Option B: Keep structural checks but add negative checks
- `isArticle` also checks `!('metadata' in item)`
- **Pros:** No content pipeline changes
- **Cons:** Fragile, grows with each new type
- **Effort:** Small
- **Risk:** Medium

## Technical Details

- **Affected files:** `src/types/content.ts`, `src/components/content/FeedItem.vue`

## Acceptance Criteria

- [ ] Type guards are mutually exclusive (only one returns true for any valid input)
- [ ] Adding a new content type does not silently break existing guards

## Work Log

| Date | Action | Outcome |
|---|---|---|
| 2026-03-20 | Code review of PR #18 | Identified non-mutually-exclusive type guards |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/18

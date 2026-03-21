---
status: done
priority: p3
issue_id: "030"
tags: [code-review, performance, architecture]
dependencies: []
---

# Draft filtering done in JS instead of SQL query

## Problem Statement

In `src/composables/useSummaryQuery.ts` line 64, draft summaries are filtered out client-side with `docs.filter((d: any) => d.published !== false)` after fetching from the database. Since the whole point of this composable is to move from client-side filtering to server-side SQL-level filtering, the draft exclusion should also be done at the query level with `.where('published', '<>', false)` for consistency and to avoid transferring unnecessary data.

## Findings

### Evidence

- `src/composables/useSummaryQuery.ts` line 63-64: `return docs.filter((d: any) => d.published !== false)`
- The plan document notes this at Risk #9: "Draft filtering consistency" and suggests adding `.where('published', '<>', false)` or filtering in the handler
- At current scale (~1204 docs, likely very few drafts), the performance impact is negligible

### Agent: performance-reviewer

This is a minor inconsistency rather than a real performance issue. With only a handful of drafts among 1204 summaries, the overhead of transferring and filtering them in JS is minimal. However, for architectural consistency with the composable's stated purpose (server-side filtering), the draft filter should be in the query.

## Proposed Solutions

### Solution 1: Add `.where('published', '<>', false)` to the query chain
- **Pros:** Consistent with server-side filtering philosophy
- **Cons:** Need to verify `published` field behavior in Nuxt Content v3 SQL
- **Effort:** Small
- **Risk:** Low (verify `<>` operator works for boolean-ish fields)

### Solution 2: Keep as-is
- **Pros:** Known working behavior, matches `useContentStream` pattern
- **Cons:** Minor inconsistency
- **Effort:** None
- **Risk:** None

## Technical Details

- **Affected files:** `src/composables/useSummaryQuery.ts`

## Acceptance Criteria

- [ ] Draft summaries are excluded at the query level
- [ ] Client-side filter removed or kept as a safety net

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | Identified client-side draft filtering during PR #19 review | `published` field behavior in Nuxt Content v3 SQL needs verification |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/19

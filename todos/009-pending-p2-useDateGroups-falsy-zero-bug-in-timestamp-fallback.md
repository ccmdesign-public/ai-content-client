---
status: done
priority: p2
issue_id: "009"
tags: [code-review, quality, bug]
dependencies: []
---

# useDateGroups uses `||` instead of `??` for _publishedAtMs fallback, treating 0 as missing

## Problem Statement

In `useDateGroups.ts`, the expression `(item as any)._publishedAtMs || new Date(dateAccessor(item)).getTime()` uses the `||` operator. When `_publishedAtMs` is `0` (which happens when `publishedAt` is missing -- see `normalizeSummaryDocs`), the `||` treats `0` as falsy and falls back to `new Date(dateAccessor(item)).getTime()`. This is inconsistent with `useSortOptions.ts` which uses `??` and correctly preserves the `0` value.

The practical impact: items without a `publishedAt` date get grouped by their `processedAt` date (via the accessor fallback) instead of being grouped as "older" (which is what `0` ms epoch would produce). This is arguably a behavior bug -- different sort vs. group behavior for the same items.

## Findings

- **Location:** `src/composables/useDateGroups.ts`, lines 53, 64, 65
- Uses `||` operator: `(item as any)._publishedAtMs || new Date(dateAccessor(item)).getTime()`
- Contrast with `src/composables/useSortOptions.ts` lines 75-86 which uses `??`
- When `_publishedAtMs === 0`, `||` falls through to `new Date()` allocation; `??` would keep `0`
- `0` ms epoch (Jan 1 1970) would classify as "older" in `getDateGroup()`, which is correct for items with no publish date

## Proposed Solutions

### Option A: Change `||` to `??` to match useSortOptions behavior
- **Pros:** Consistent behavior; items with no publishedAt sort and group the same way
- **Cons:** Changes current grouping behavior for items missing publishedAt (they'd move to "older")
- **Effort:** Small (3 line changes)
- **Risk:** Low -- verify no items intentionally rely on the fallback-to-accessor behavior

## Recommended Action



## Technical Details

- **Affected files:** `src/composables/useDateGroups.ts`
- **Lines:** 53, 64, 65
- **Database changes:** None

## Acceptance Criteria

- [ ] `useDateGroups` uses `??` for `_publishedAtMs` fallback, consistent with `useSortOptions`
- [ ] Existing `useDateGroups` tests pass
- [ ] Items without `publishedAt` are grouped consistently with their sort order

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-22 | Identified during PR #22 code review | `||` vs `??` operator inconsistency between sort and group composables |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/22

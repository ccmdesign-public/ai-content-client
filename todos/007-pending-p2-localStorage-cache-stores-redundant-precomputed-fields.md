---
status: done
priority: p2
issue_id: "007"
tags: [code-review, performance, caching]
dependencies: []
---

# localStorage cache stores redundant pre-computed fields, inflating size

## Problem Statement

`writeLocalCache(newData)` is called with the already-normalized data that includes `_publishedAtMs` and `_processedAtMs`. These fields are re-computed on every read by `normalizeSummaryDocs`, so persisting them is wasteful. For ~1200 items, the two numeric fields add ~20-30KB to the serialized JSON, increasing localStorage write time and bringing the cache closer to the 5MB quota limit.

## Findings

- **Location:** `src/composables/useSummariesData.ts`, line 139 (`watch(data, ...)` calls `writeLocalCache(newData)`)
- `newData` is the output of `normalizeSummaryDocs`, which includes `_publishedAtMs` and `_processedAtMs`
- On read, `normalizeSummaryDocs` re-computes these from the raw `publishedAt` / `processedAt` strings anyway
- The extra fields increase JSON.stringify time (synchronous, main-thread blocking)

## Proposed Solutions

### Option A: Strip pre-computed fields before writing
- **Pros:** Simple, preserves existing architecture
- **Cons:** Adds a `.map()` pass before serialization
- **Effort:** Small
- **Risk:** Low

### Option B: Write `result.data.value` (raw, pre-normalization) instead of `data.value` (normalized)
- **Pros:** Cleanest separation -- cache stores the same format the server returns
- **Cons:** Requires changing the watch source from `data` to `result.data`
- **Effort:** Small
- **Risk:** Low -- readLocalCache consumers already expect raw data

## Recommended Action



## Technical Details

- **Affected files:** `src/composables/useSummariesData.ts`
- **Components:** useSummariesData composable
- **Database changes:** None

## Acceptance Criteria

- [ ] localStorage cache does not contain `_publishedAtMs` or `_processedAtMs` fields
- [ ] Reading from localStorage still produces correctly normalized data after `normalizeSummaryDocs`
- [ ] Existing unit tests for `readLocalCache` / `writeLocalCache` pass

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-22 | Identified during PR #22 code review | Pre-computed fields are redundant in persistence layer |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/22

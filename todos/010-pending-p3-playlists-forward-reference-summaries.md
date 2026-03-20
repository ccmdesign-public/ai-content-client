---
status: resolved
priority: p3
issue_id: "010"
tags: [code-review, quality, readability]
dependencies: []
---

# playlists/[slug].vue: Forward Reference to `summaries` Before Declaration

## Problem Statement

In `playlists/[slug].vue`, line 16 references `summaries.value` inside a `computed()` but `summaries` is not declared until line 29. This works because `computed()` is lazy (the callback runs later when `.value` is accessed), but the code reads confusingly -- a developer scanning top-to-bottom sees an undefined variable.

## Findings

- **Source**: `src/pages/playlists/[slug].vue` lines 16 and 29
- Line 16: `const items = computed<Sortable[]>(() => summaries.value || [])`
- Line 29: `const { data: summaries, pending } = useContentStream('summaries', ...)`
- The comment on line 13-15 explains this is intentional (composable calls before the throw on line 21)
- Not a bug, but reduces readability

## Proposed Solutions

### Option A: Reorder declarations (move `useContentStream` above `useSortedFeed`)
- **Pros**: Eliminates forward reference, reads linearly
- **Cons**: May conflict with the requirement to call composables before the synchronous throw; needs careful verification that `useContentStream` doesn't depend on `playlist` check
- **Effort**: Small
- **Risk**: Low (needs testing)

### Option B: Leave as-is with comment
- **Pros**: Existing comment already explains the pattern
- **Cons**: Still confusing on first read
- **Effort**: None
- **Risk**: None

## Technical Details

- **Affected files**: `src/pages/playlists/[slug].vue`

## Acceptance Criteria

- [ ] Either reorder to eliminate forward ref, or confirm comment is sufficient

## Work Log

| Date | Action | Outcome |
|------|--------|---------|
| 2026-03-20 | Identified during PR #15 code review | Readability concern, not a bug |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/15

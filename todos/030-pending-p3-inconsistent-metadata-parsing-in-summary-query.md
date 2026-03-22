---
status: pending
priority: p3
issue_id: "030"
tags: [code-review, consistency, defensive-coding]
dependencies: []
---

# Inconsistent Metadata Parsing in useSummaryQuery

## Problem Statement

In `useSummaryQuery`, the `channelId` filter parses metadata defensively (handling both string and object forms), but the `videoIds` filter accesses `d.metadata?.videoId` directly without the same `JSON.parse` fallback:

```ts
// channelId filter (line 58-61) -- defensive
docs = docs.filter(d => {
  const meta = typeof d.metadata === 'string' ? JSON.parse(d.metadata) : d.metadata
  return meta?.channelId === resolvedChannelId.value
})

// videoIds filter (line 67) -- no JSON.parse fallback
docs = docs.filter(d => idSet.has(d.metadata?.videoId))
```

If `metadata` is ever a JSON string (as the commit message suggests SQLite stores it), the `videoId` filter would fail silently, returning no matches.

## Findings

- **Source**: `src/composables/useSummaryQuery.ts`, lines 58-61 vs line 67
- **Agent**: quality-reviewer

## Proposed Solutions

### Solution A: Normalize metadata parsing consistently
Apply the same `typeof === 'string' ? JSON.parse : identity` pattern to all filters, or extract a helper.
- **Effort**: Small
- **Risk**: None

## Recommended Action

_To be filled during triage_

## Technical Details

- **Affected files**: `src/composables/useSummaryQuery.ts`

## Acceptance Criteria

- [ ] All metadata field accesses use consistent parsing

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | PR #20 code review | Identified inconsistent metadata access patterns |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/20

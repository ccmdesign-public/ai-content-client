---
status: pending
priority: p3
issue_id: "030"
tags: [code-review, quality, error-handling]
dependencies: ["026"]
---

# Channel page silently shows empty results if metadata normalization fails

## Problem Statement

The channels page (`channels/[slug].vue` line 27) filters on `s.metadata?.channelId === targetId`. If metadata normalization fails (related to finding #026), `metadata` would be `undefined` or an empty object, and the filter silently returns zero results. The user sees "No summaries for this channel yet" with no indication that data is actually present but unparseable.

This is a downstream consequence of finding #026 (unhandled JSON.parse). Once #026 is fixed with proper error handling, this becomes less critical.

## Findings

- `src/pages/channels/[slug].vue:27` -- `s.metadata?.channelId` silently returns undefined on parse failure
- User sees empty state instead of error state
- Same pattern exists in playlists page filtering on `s.playlistId`

## Proposed Solutions

### Option 1: Addressed by fixing #026

**Approach:** If #026 adds proper error handling with console warnings, this issue is mitigated. No additional work needed.

**Effort:** 0 (if #026 is resolved)

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `src/pages/channels/[slug].vue:24-28`
- `src/pages/playlists/[slug].vue:20-23`

## Resources

- **PR:** #21
- **Depends on:** Todo #026

## Acceptance Criteria

- [ ] Metadata parse failures produce visible feedback (via #026 fix)
- [ ] Channel/playlist pages don't silently show empty when data exists

## Work Log

### 2026-03-22 - Initial Discovery

**By:** Claude Code (CE Review)

**Actions:**
- Traced metadata parse failure path through channel page filter
- Identified silent empty state as downstream consequence of #026

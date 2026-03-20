---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, performance]
dependencies: []
---

# Issue Detail Page Fallback Fetches All Newsletter Issues

## Problem Statement

In `src/pages/issues/[id].vue`, the data fetching logic has a fallback that calls `queryCollection('newsletters').all()` and then filters client-side by `publishedAt`. This loads every newsletter issue into memory when a single issue lookup by path fails. As the archive grows, this becomes an O(n) performance issue on every page load where the path lookup misses.

## Findings

- **File:** `src/pages/issues/[id].vue` lines ~15-20
- **Evidence:** `const all = await queryCollection('newsletters').all()` as fallback
- **Impact:** Unnecessary data loading; degrades as newsletter count grows

## Proposed Solutions

### Option A: Use a where() query instead of fetching all (Recommended)
- Replace the fallback with `queryCollection('newsletters').where('publishedAt', '=', issueId).first()`
- **Effort:** Small
- **Risk:** Low

### Option B: Remove the fallback entirely
- If path-based lookup is reliable, the fallback may be unnecessary
- **Effort:** Small
- **Risk:** Low -- but verify path format consistency

## Recommended Action

<!-- Fill during triage -->

## Technical Details

- **Affected files:** `src/pages/issues/[id].vue`

## Acceptance Criteria

- [ ] Issue detail page does not fetch all newsletters as a fallback
- [ ] Page still resolves correctly for valid issue IDs

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #10 code review | |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/10

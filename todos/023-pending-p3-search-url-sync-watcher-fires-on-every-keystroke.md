---
status: resolved
priority: p3
issue_id: "023"
tags: [code-review, performance, ux]
dependencies: []
resolved_date: "2026-03-08"
resolution: "Wrapped the URL sync router.replace call in a 400ms debounce so typing 'claude' triggers one route update instead of six."
---

# Search URL Sync Watcher Fires on Every Keystroke

## Problem Statement

In `useSearch.ts`, the URL sync watcher (`watch(query, ...)` that calls `router.replace()`) runs on every keystroke, not on the debounced search. This means typing "claude" triggers 6 `router.replace()` calls (`c`, `cl`, `cla`, `clau`, `claud`, `claude`), creating 6 history state replacements and potentially 6 Vue reactivity cycles from route changes.

## Findings

- **Location**: `src/composables/useSearch.ts`, lines 100-110
- **Evidence**: The URL sync watcher watches `query` directly (not debounced results). The search itself is debounced at 150ms, but the URL sync is immediate.
- **Impact**: Low in practice (router.replace doesn't add history entries), but creates unnecessary work. On slower devices, the rapid route.query mutations could cause jank.

## Proposed Solutions

### Solution A: Debounce the URL sync separately
- Use a separate debounce (300-500ms) for the URL sync watcher, or tie it to the debounced search execution.
- **Effort**: Small
- **Risk**: Low

### Solution B: Sync URL only on search execution
- Move the `router.replace` call into `performSearch` so URL updates only when results actually change.
- **Effort**: Small
- **Risk**: Low

## Recommended Action


## Technical Details

- **Affected files**: `src/composables/useSearch.ts`

## Acceptance Criteria

- [ ] Typing a multi-character query does not trigger a router.replace per character

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-08 | Created from PR #5 code review | |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/5

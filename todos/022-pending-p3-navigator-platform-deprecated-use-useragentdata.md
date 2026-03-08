---
status: pending
priority: p3
issue_id: "022"
tags: [code-review, quality, deprecation]
dependencies: []
---

# navigator.platform Is Deprecated

## Problem Statement

`SearchBar.vue` uses `navigator.platform.toUpperCase().includes('MAC')` to detect macOS for the keyboard shortcut hint. `navigator.platform` is deprecated in modern browsers and may be removed in the future.

## Findings

- **Location**: `src/components/content/SearchBar.vue`, line 91
- **Evidence**: `isMac.value = navigator.platform.toUpperCase().includes('MAC')`
- **Impact**: Low. The shortcut hint is cosmetic (shows Cmd vs Ctrl). The actual keyboard handler correctly uses `e.metaKey || e.ctrlKey` which works regardless.

## Proposed Solutions

### Solution A: Use navigator.userAgentData or userAgent fallback
- `navigator.userAgentData?.platform === 'macOS'` with fallback to `navigator.userAgent.includes('Mac')`.
- **Effort**: Small
- **Risk**: Low

## Recommended Action


## Technical Details

- **Affected files**: `src/components/content/SearchBar.vue`

## Acceptance Criteria

- [ ] Mac detection does not use deprecated API

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-08 | Created from PR #5 code review | |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/5
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform

---
status: pending
priority: p3
issue_id: "012"
tags: [code-review, quality, vue]
dependencies: []
---

# chipRefs array never cleaned up on category list change

## Problem Statement

In `CategoryFilterBar.vue`, the `chipRefs` array accumulates element references via `setChipRef()` but is never reset when the `categories` prop changes. If categories are dynamically added or removed, stale DOM references could persist in the array, causing keyboard navigation to target detached elements.

## Findings

- `src/components/content/CategoryFilterBar.vue` lines 33-37: `chipRefs` is a plain `ref<HTMLElement[]>([])` with index-based assignment
- No `onBeforeUpdate` or watcher resets the array
- In practice, categories come from static `tags-index.json` so this is unlikely to manifest currently, but it is a latent bug for future dynamic category scenarios

## Proposed Solutions

### Solution A: Reset chipRefs before each render cycle
Use Vue's `onBeforeUpdate` to clear the array before template refs are re-assigned.

- **Pros**: Clean, idiomatic Vue pattern for dynamic template refs
- **Cons**: Minor overhead
- **Effort**: Small
- **Risk**: Low

## Recommended Action

<!-- Filled during triage -->

## Technical Details

**Affected files:**
- `src/components/content/CategoryFilterBar.vue`

## Acceptance Criteria

- [ ] `chipRefs` is reset on each render update
- [ ] Keyboard navigation works correctly after any category list change

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Created during PR #4 code review | Low risk currently due to static data, but good defensive practice |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/4
- Vue docs: https://vuejs.org/guide/essentials/template-refs.html#refs-inside-v-for

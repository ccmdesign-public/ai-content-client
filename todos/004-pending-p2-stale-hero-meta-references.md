---
status: pending
priority: p2
issue_id: "004"
tags: [code-review, quality, cleanup]
dependencies: []
---

# Stale `hero` page meta in 9+ pages no longer consumed by layout

## Problem Statement

The new `default.vue` layout no longer reads or reacts to `route.meta.hero`. However, 9+ pages still declare `definePageMeta({ hero: false })` or `definePageMeta({ hero: { ... } })`. This is dead configuration that confuses future developers about what `hero` does.

## Findings

Pages still setting `hero` meta:
- `src/pages/channels/[slug].vue:11` -- `hero: false`
- `src/pages/issues/[id].vue:6` -- `hero: false`
- `src/pages/index.vue:3` -- `hero: false`
- `src/pages/summaries/[slug].vue:61` -- `hero: false`
- `src/pages/playlists/[slug].vue:33` -- `hero: false`
- `src/pages/articles/[...slug].vue:47` -- `hero: false`
- `src/pages/tags/[slug].vue:11` -- `hero: false`
- `src/pages/summaries/index.vue:11` -- `hero: false`
- `src/pages/articles/publications/[slug].vue:8` -- `hero: false`
- `src/pages/tools/index.vue:6` -- `hero: { ... }` (object config)
- `src/pages/tags/index.vue:5` -- `hero: false`

The layout only reads `route.meta.sidebar` and `route.meta.footer` -- `hero` is completely unused.

## Proposed Solutions

### Option 1: Remove all `hero` meta from pages

**Approach:** Delete `hero: false` and `hero: { ... }` from every `definePageMeta()` call.

**Pros:**
- Removes dead configuration
- Cleaner codebase
- No functional impact

**Cons:**
- Touches many files (small change in each)

**Effort:** 15 minutes

**Risk:** Low

## Technical Details

**Affected files:**
- 11 page files listed above

## Resources

- **PR:** #13

## Acceptance Criteria

- [ ] Zero references to `hero:` in any `definePageMeta` call
- [ ] Build passes

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)

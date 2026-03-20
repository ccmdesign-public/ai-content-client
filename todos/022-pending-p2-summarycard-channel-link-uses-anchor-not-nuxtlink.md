---
status: resolved
priority: p2
issue_id: "022"
tags: [code-review, vue, routing, performance]
dependencies: []
---

# SummaryCard Channel Link Uses Raw `<a>` Instead of `<NuxtLink>`

## Problem Statement

In `SummaryCard.vue` line 33-38, the channel link uses a raw `<a>` tag with `:href` instead of `<NuxtLink>` with `:to`. Since `/channels/${summary.metadata.channel}` is an internal route, this causes a full page reload instead of client-side navigation, degrading UX and performance.

## Findings

```html
<!-- SummaryCard.vue line 33 -->
<a
  :href="`/channels/${summary.metadata.channel}`"
  class="font-medium hover:text-foreground motion-safe:transition-colors ..."
>
```

This is an internal route (no `target="_blank"`, no external URL). It should use `<NuxtLink>` for SPA navigation.

## Proposed Solutions

### Option A: Replace with NuxtLink
```html
<NuxtLink
  :to="`/channels/${summary.metadata.channel}`"
  class="font-medium hover:text-foreground motion-safe:transition-colors ..."
>
```
- **Pros:** Client-side navigation, prefetching, consistent with other internal links in the component
- **Cons:** None
- **Effort:** Small
- **Risk:** Low

## Technical Details

- **Affected files:** `src/components/content/SummaryCard.vue` (line 33)

## Acceptance Criteria

- [ ] Channel link uses `<NuxtLink>` with `:to` instead of `<a>` with `:href`
- [ ] Clicking channel link performs client-side navigation (no full page reload)

## Work Log

| Date | Action | Outcome |
|---|---|---|
| 2026-03-20 | Code review of PR #18 | Found raw anchor tag for internal route |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/18

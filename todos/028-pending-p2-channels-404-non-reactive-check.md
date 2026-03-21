---
status: done
priority: p2
issue_id: "028"
tags: [code-review, architecture, ssr, vue]
dependencies: []
---

# Channels page 404 check uses bare if-statement instead of reactive pattern

## Problem Statement

In `src/pages/channels/[slug].vue` line 30-32, the 404 check `if (!channelConfig.value)` executes as a bare statement during `<script setup>`. This works correctly on initial page load and SSR because `channelConfig` is synchronously computed from route params. However, this pattern has a subtle concern: for SSR, the `throw createError()` executes during setup which is correct, but for client-side navigation between channels (component reuse), the throw never re-executes because `<script setup>` only runs once per component instance.

If a user navigates from a valid channel to an invalid slug via client-side navigation (e.g., manually editing the URL hash, or a broken `NuxtLink`), the 404 will not trigger. The page will render with `channelConfig` as `undefined`, causing `displayName` to fall back to the raw slug and `summaries` to return all summaries (since `channelId` is `undefined`).

## Findings

### Evidence

- `src/pages/channels/[slug].vue` line 30-32: `if (!channelConfig.value) { throw createError(...) }`
- This is a synchronous throw during setup -- correct for SSR, but only fires once on the client
- The playlist page has the same pattern (line 26-28), so this is a systemic concern, not unique to this PR
- The `channelId` computed returns `undefined` when `channelConfig` is null, which causes `useSummaryQuery` to skip the channelId filter, effectively returning all summaries

### Agent: architecture-reviewer

The plan document (docs/plans/AIC-38-summaries-nav-architecture.md) explicitly notes: "Route param changes between channels reuse the same component instance -- lifecycle hooks do NOT re-fire." The composable correctly handles this with reactive params, but the 404 guard does not.

## Proposed Solutions

### Solution 1: Add a reactive watcher for invalid slugs (Recommended)
Add a `watch` on `channelConfig` that calls `navigateTo` or `showError` when it becomes null during client-side navigation:
```ts
watch(channelConfig, (config) => {
  if (!config) showError({ statusCode: 404, message: 'Channel not found' })
})
```
- **Pros:** Catches invalid slugs during client-side navigation
- **Cons:** Slightly more code
- **Effort:** Small
- **Risk:** Low

### Solution 2: Keep as-is (acceptable risk)
Invalid channel slugs during client-side navigation is an unlikely edge case since channel links come from static config.
- **Pros:** No change
- **Cons:** Edge case remains unhandled
- **Effort:** None
- **Risk:** Low (unlikely scenario)

## Recommended Action

Solution 1 for robustness, but Solution 2 is acceptable if channel navigation is only through config-generated links.

## Technical Details

- **Affected files:** `src/pages/channels/[slug].vue`, potentially `src/pages/playlists/[slug].vue`
- **Components:** Channel page, routing

## Acceptance Criteria

- [ ] Navigating to an invalid channel slug via client-side navigation shows 404 (or redirects)
- [ ] Valid channel navigation still works correctly
- [ ] SSR 404 behavior unchanged

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | Identified non-reactive 404 check during PR #19 review | `throw createError()` in `<script setup>` only fires once per component instance on the client |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/19
- Vue Router component reuse docs: https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes

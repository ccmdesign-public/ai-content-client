---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, ssr, architecture]
dependencies: []
---

# SidebarProvider uses `document.cookie` directly (SSR-unsafe)

## Problem Statement

The shadcn-vue `SidebarProvider.vue` component accesses `document.cookie` directly in the `setOpen` function (line 34) and in the `defaultOpen` prop default (line 14). While the `defaultOpen` prop guards with `defaultDocument?.`, the `setOpen` function does not. In an SSR context, if `setOpen` is ever called during server rendering (e.g., via the route meta watcher in `default.vue` which runs with `{ immediate: true }`), it will throw a `ReferenceError: document is not defined`.

## Findings

- `src/components/ui/sidebar/SidebarProvider.vue:34` -- `document.cookie = ...` (no SSR guard)
- `src/components/ui/sidebar/SidebarProvider.vue:14` -- `defaultDocument?.cookie.includes(...)` (guarded)
- `src/layouts/default.vue:69-72` -- watcher with `{ immediate: true }` calls route.meta.sidebar check, which sets `sidebarOpen.value` but does NOT call `setOpen()` directly
- Current code paths likely safe because `setOpen` is only called from user interactions (toggle, keyboard shortcut) which only happen client-side
- However, the `provideSSRWidth` plugin (line 1-4 in `src/plugins/ssr-width.ts`) addresses mobile detection but not the cookie write path

**Risk assessment:** Low probability of hitting this in current code, but the pattern is fragile. Any future code that programmatically opens/closes the sidebar during SSR would crash.

## Proposed Solutions

### Option 1: Add client-side guard to setOpen

**Approach:** Wrap `document.cookie` write in `if (import.meta.client)` or `if (typeof document !== 'undefined')`.

**Effort:** 5 minutes

**Risk:** Low

### Option 2: Use Nuxt's `useCookie` composable

**Approach:** Replace raw `document.cookie` with Nuxt's SSR-safe `useCookie` composable.

**Effort:** 30 minutes

**Risk:** Low -- but modifies a shadcn-generated file

## Technical Details

**Affected files:**
- `src/components/ui/sidebar/SidebarProvider.vue:34`

## Resources

- **PR:** #13
- shadcn-vue Sidebar docs on storage-key prop

## Acceptance Criteria

- [ ] No direct `document.cookie` writes without SSR guard
- [ ] Sidebar state persists across page loads
- [ ] No SSR errors when navigating to pages with `sidebar: false`

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)

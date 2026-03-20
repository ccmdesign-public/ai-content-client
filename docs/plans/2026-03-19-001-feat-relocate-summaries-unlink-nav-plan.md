---
title: "feat: Relocate summaries index to /summaries/ and unlink from navigation"
type: feat
status: active
date: 2026-03-19
---

# Relocate Summaries Index to `/summaries/` and Unlink from Navigation

## Overview

Move the current homepage summaries feed (search, filters, sorting, date-grouped summaries) from `/` to `/summaries/` as a standalone index page. Remove all summary-related links from navigation components (sidebar, mobile nav, topbar). The summaries pages remain fully functional but are no longer discoverable through navigation -- they become a semi-secret section. This frees the `/` route for the upcoming newsletter landing page (AIC-28).

## Problem Statement / Motivation

The current homepage (`/`) serves as the summaries feed. To support the newsletter-first homepage planned in AIC-28, the summaries feed needs to move to its own route at `/summaries/`. The summaries section should remain accessible by direct URL but not be promoted in navigation, since the site's primary focus is shifting to the newsletter.

## Proposed Solution

1. **Create `/summaries/` index page** -- Copy the current `src/pages/index.vue` content to `src/pages/summaries/index.vue`
2. **Stub the homepage** -- Replace `src/pages/index.vue` with a minimal placeholder (or leave empty for AIC-28 to build on)
3. **Unlink from navigation** -- Remove summary-related links from SidebarNav, MobileNav, and ccmTopbar
4. **Update back-links** -- Update internal links that point to `/` with "summaries" context to point to `/summaries/`

## Technical Considerations

### Architecture

- Nuxt 3 file-based routing: creating `src/pages/summaries/index.vue` automatically registers the `/summaries/` route
- The existing `src/pages/summaries/[slug].vue` detail page already lives at `/summaries/[slug]` -- no change needed there
- The layout system (`src/layouts/default.vue`) conditionally renders SidebarNav and MobileNav based on `route.meta.sidebar`

### Key Files to Modify

| File | Change |
|------|--------|
| `src/pages/index.vue` | Remove summaries feed; replace with placeholder or redirect |
| `src/pages/summaries/index.vue` | **New file** -- receives the summaries feed from current homepage |
| `src/components/content/SidebarNav.vue` | Remove "All Summaries" home link (line 15-17) |
| `src/components/content/MobileNav.vue` | Remove "All Summaries" home link (line 74-80) |
| `src/components/ds/molecules/ccmTopbar.vue` | Remove "Home" menu item or relabel (line 9) |
| `src/pages/summaries/[slug].vue` | Update back-link from `to="/"` to `to="/summaries/"` (line 8) |
| `src/pages/channels/[slug].vue` | Update `link-to="/"` references to `link-to="/summaries/"` (lines 93, 115) |
| `src/pages/playlists/[slug].vue` | Update `to="/"` "Browse all summaries" link to `/summaries/` (line 69) |
| `src/pages/tags/index.vue` | Update `link-to="/"` to `/summaries/` (line 30) |

### Navigation Changes Detail

**SidebarNav** (`src/components/content/SidebarNav.vue`):
- Remove the `<NuxtLink to="/">All Summaries</NuxtLink>` block (lines 15-17)
- The Playlists, Channels, and Topics sections remain (they are still valid navigation)

**MobileNav** (`src/components/content/MobileNav.vue`):
- Remove the `<NuxtLink to="/">All Summaries</NuxtLink>` block (lines 74-80)
- The Playlists, Channels, and Topics sections remain

**ccmTopbar** (`src/components/ds/molecules/ccmTopbar.vue`):
- Remove or relabel the `<li><nuxt-link class="menu__item" to="/">Home</nuxt-link></li>` (line 9)
- Note: The topbar appears to be a boilerplate/design-system component with generic links (Home, Insights, Docs, Test). Verify whether it is actually rendered in the current layout before modifying. The default layout does not reference ccmTopbar directly -- it may only appear inside ccmHero.

### Search Integration

The search composable is provided at the layout level via `provide('search', search)` in `default.vue`. The summaries index page injects it. This pattern will continue to work at `/summaries/` without changes since the layout wraps all pages.

### No Changes Required

- `src/pages/summaries/[slug].vue` detail page routing (already at `/summaries/[slug]`)
- Content collections / `content.config.ts`
- Composables (`useDateGroups`, `useSortOptions`, `useTagsConfig`, `useHomepageFilter`, `useSearch`)
- `SummaryCard`, `DateGroupedFeed`, `CategoryFilterBar`, `SearchBar`, `SortControl` components
- Layout structure (`default.vue`) -- sidebar/mobile nav still render for other pages

## Acceptance Criteria

- [ ] `/summaries/` displays the full summaries feed with search, filters, sorting, and date-grouped layout (identical to current homepage)
- [ ] `/` no longer shows the summaries feed (placeholder or empty page ready for AIC-28)
- [ ] "All Summaries" link removed from SidebarNav
- [ ] "All Summaries" link removed from MobileNav
- [ ] Summary-related link removed from ccmTopbar (if rendered)
- [ ] Back-link on `/summaries/[slug]` points to `/summaries/` instead of `/`
- [ ] "Browse all summaries" links on channel, playlist, and tag pages point to `/summaries/`
- [ ] All existing summaries functionality (search, sort, filter, date grouping) works identically at the new URL
- [ ] Detail pages at `/summaries/[slug]` continue to work unchanged
- [ ] No broken links remain pointing to `/` with summaries context

## Success Metrics

- All summaries functionality accessible at `/summaries/` with zero regressions
- No navigation element links to summaries content
- The `/` route is free for AIC-28 newsletter homepage implementation

## Dependencies & Risks

- **Prerequisite for AIC-28**: This must complete before the newsletter homepage can claim `/`
- **Low risk**: This is primarily a file move and link cleanup -- no logic changes
- **SEO consideration**: If the site is indexed, moving from `/` to `/summaries/` could affect search rankings. Consider whether a redirect from `/` to `/summaries/` is needed temporarily. Decision left to implementer.
- **Sidebar visibility**: After removing "All Summaries", the sidebar still shows Playlists, Channels, and Topics. Verify it looks reasonable without the top-level link.
- **ccmTopbar usage**: Verify whether `ccmTopbar` is actually rendered in the current app (it may only be a design-system demo component). If not rendered, skip modifying it.

## Sources & References

### Internal References

- Homepage (current summaries feed): `src/pages/index.vue`
- Summary detail page: `src/pages/summaries/[slug].vue`
- Sidebar navigation: `src/components/content/SidebarNav.vue`
- Mobile navigation: `src/components/content/MobileNav.vue`
- Topbar component: `src/components/ds/molecules/ccmTopbar.vue`
- Default layout: `src/layouts/default.vue`
- Channel page (back-links): `src/pages/channels/[slug].vue`
- Playlist page (back-links): `src/pages/playlists/[slug].vue`
- Tags index (back-links): `src/pages/tags/index.vue`

### Related Work

- Blocks: AIC-28 (newsletter homepage) -- depends on this completing first

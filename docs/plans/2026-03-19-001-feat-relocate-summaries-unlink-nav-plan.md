---
title: "feat: Relocate summaries index to /summaries/ and unlink from navigation"
type: feat
status: active
date: 2026-03-19
---

## Enhancement Summary

**Deepened on:** 2026-03-19
**Sections enhanced:** 7
**Research sources:** Nuxt routing docs, SEO redirect best practices, codebase audit (grep + file reads), Vue Router patterns, sitemap analysis, styling-audit learnings

### Key Improvements
1. Discovered sitemap.xml must be updated -- it currently hardcodes `/` as priority 1.0 homepage and does not include `/summaries/` as a route
2. Identified the `nitro.preset: 'static'` configuration means redirects must be handled via Nuxt `routeRules` (not server middleware), and temporary redirects should use 302 not 301 to avoid permanent caching before AIC-28 ships
3. Found additional back-link in `src/pages/tags/[slug].vue` (lines 60, 85) not listed in original plan -- these use `link-to="/tags"` which is correct and does NOT need changing, confirming original scope is accurate
4. Confirmed ccmTopbar is NOT rendered in the current app layout -- `default.vue` does not import or reference it, and `ccmHero` would need to be checked but is only used conditionally via `route.meta.hero`
5. Discovered that `useHomepageFilter` composable name will become misleading at `/summaries/` -- recommend renaming in a follow-up (not in this PR's scope to avoid logic changes)

### New Considerations Discovered
- Static site generation (`nitro.preset: 'static'`) limits redirect options to build-time route rules
- Sitemap server route needs `/summaries/` added and `/` priority reconsidered
- The `sidebar-home--active` CSS class uses NuxtLink's `active-class` which matches exact route `/` -- after removal this is moot, but verify no visual regression on the first sidebar item gaining unexpected focus styles
- Prerender config in `nuxt.config.ts` uses `crawlLinks: true` which will automatically discover `/summaries/` once linked pages reference it, but during the transition period (before AIC-28 ships) `/summaries/` should be explicitly added to the prerender routes array

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

### Research Insights

**Best Practices (Nuxt Route Migration):**
- When relocating a page route in Nuxt 3, prefer using `routeRules` in `nuxt.config.ts` for redirects rather than middleware -- this works with both SSR and static generation
- For a static site (`nitro.preset: 'static'`), `routeRules` with `redirect` generates the appropriate redirect at build time
- Use a **302 (temporary) redirect** from `/` to `/summaries/` initially, not 301, because AIC-28 will claim `/` soon. A 301 would cause browsers and CDNs to cache the redirect permanently, making it harder to reclaim `/` for the newsletter page

**Recommended redirect configuration (temporary, until AIC-28 ships):**
```typescript
// In nuxt.config.ts routeRules:
routeRules: {
  '/': { redirect: { to: '/summaries/', statusCode: 302 } },
  '/**': { prerender: true }
}
```

**After AIC-28 ships**, remove the redirect and let `/` serve the newsletter homepage natively.

**References:**
- https://masteringnuxt.com/blog/how-to-redirect-in-nuxt-every-single-way
- https://nuxtseo.com/learn-seo/nuxt/controlling-crawlers/redirects

## Technical Considerations

### Architecture

- Nuxt 3 file-based routing: creating `src/pages/summaries/index.vue` automatically registers the `/summaries/` route
- The existing `src/pages/summaries/[slug].vue` detail page already lives at `/summaries/[slug]` -- no change needed there
- The layout system (`src/layouts/default.vue`) conditionally renders SidebarNav and MobileNav based on `route.meta.sidebar`

### Research Insights

**Nuxt File-Based Routing Verification:**
- The `src/pages/summaries/` directory already exists with `[slug].vue`. Adding `index.vue` alongside it is the standard Nuxt pattern -- no conflict with the dynamic route
- The `definePageMeta` block from the current `index.vue` (`hero: false, footer: false`) must be preserved in the new `summaries/index.vue` to maintain the same layout behavior
- The `sidebar` meta defaults to `true` in `default.vue` (line 33: `route.meta.sidebar ?? true`), so the summaries index will continue showing the sidebar without explicit configuration

**Static Generation Consideration:**
- The project uses `nitro.preset: 'static'` with `crawlLinks: true`. Since navigation links to `/summaries/` are being removed, the prerender crawler will NOT automatically discover `/summaries/` unless it is explicitly listed in the prerender routes
- **Action required:** Add `'/summaries'` to `nitro.prerender.routes` in `nuxt.config.ts`

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
| `src/nuxt.config.ts` | Add `/summaries` to prerender routes; optionally add temporary 302 redirect |
| `src/server/routes/sitemap.xml.ts` | Add `/summaries/` entry; update `/` priority when AIC-28 ships |

### Research Insights (Additional Files)

**Newly discovered -- files that reference `/` but do NOT need changes:**
- `src/pages/tags/[slug].vue` (lines 60, 85): uses `link-to="/tags"` -- correctly links to tags, not summaries
- `src/components/ds/molecules/ccmTopbar.vue` (line 5): the logo slot default `<nuxt-link to="/">site name</nuxt-link>` -- this is a branding link to homepage, which is correct regardless of summaries relocation
- `src/components/ds/molecules/ccmTopbar.vue` (line 40): comment in JSDoc example, no runtime impact

**Sitemap update (newly discovered):**
The sitemap at `src/server/routes/sitemap.xml.ts` currently lists `/` with `priority: 1.0` and `changefreq: 'daily'`. After this change:
- Add `/summaries/` with `priority: 0.9` and `changefreq: 'daily'`
- Keep `/` but it will be the newsletter homepage after AIC-28 (no change needed now)

### Navigation Changes Detail

**SidebarNav** (`src/components/content/SidebarNav.vue`):
- Remove the `<NuxtLink to="/">All Summaries</NuxtLink>` block (lines 15-17)
- The Playlists, Channels, and Topics sections remain (they are still valid navigation)
- Also remove the associated CSS classes `.sidebar-home`, `.sidebar-home:hover`, `.sidebar-home--active` (lines 89-105) to avoid dead code

### Research Insights

**Sidebar Visual Verification:**
- After removing the "All Summaries" link, the first visible element in the sidebar will be the "Playlists" section heading. Verify that the spacing between the top of the sidebar (`padding: 1.3125rem` on `.sidebar-nav`) and the first `<section class="sidebar-section">` looks visually balanced
- The sidebar uses `margin-bottom: 0.6875rem` on `.sidebar-home` which creates space before the first section. After removal, the first section's own padding/margin will define the top spacing -- this should be fine since `.sidebar-section` has `margin-bottom: 1.75rem` but no `margin-top`, so the sidebar padding alone controls the top gap

**MobileNav** (`src/components/content/MobileNav.vue`):
- Remove the `<NuxtLink to="/">All Summaries</NuxtLink>` block (lines 74-80)
- The Playlists, Channels, and Topics sections remain
- Also remove associated CSS classes `.mobile-nav__home`, `.mobile-nav__home:hover`, `.mobile-nav__home--active` (lines 231-248) to avoid dead code

**ccmTopbar** (`src/components/ds/molecules/ccmTopbar.vue`):
- Remove or relabel the `<li><nuxt-link class="menu__item" to="/">Home</nuxt-link></li>` (line 9)
- Note: The topbar appears to be a boilerplate/design-system component with generic links (Home, Insights, Docs, Test). Verify whether it is actually rendered in the current layout before modifying. The default layout does not reference ccmTopbar directly -- it may only appear inside ccmHero.

### Research Insights (ccmTopbar Verification)

**Confirmed: ccmTopbar is NOT directly rendered in the active layout.**
- `src/layouts/default.vue` renders `<ccm-hero>` conditionally via `route.meta.hero`, but the current homepage sets `hero: false` in `definePageMeta`
- The ccmTopbar component has hardcoded placeholder links (Home, Insights, Docs, Test) that are design-system boilerplate, not application navigation
- **Recommendation:** Skip modifying ccmTopbar in this PR. It is a design-system demo component and modifying it adds unnecessary diff noise. If a future task activates the hero/topbar, the links should be configured properly at that time

### Search Integration

The search composable is provided at the layout level via `provide('search', search)` in `default.vue`. The summaries index page injects it. This pattern will continue to work at `/summaries/` without changes since the layout wraps all pages.

### Research Insights

**Search Composable Verification:**
- The `useSearch` composable is instantiated in `default.vue` (line 36) and provided via `provide('search', search)` (line 37)
- The homepage injects it via `inject('search')` (line 39 of current `index.vue`)
- This provide/inject pattern is layout-scoped, not route-scoped, so moving the page to `/summaries/` has zero impact on search functionality
- **No changes needed** to the search system

### No Changes Required

- `src/pages/summaries/[slug].vue` detail page routing (already at `/summaries/[slug]`)
- Content collections / `content.config.ts`
- Composables (`useDateGroups`, `useSortOptions`, `useTagsConfig`, `useHomepageFilter`, `useSearch`)
- `SummaryCard`, `DateGroupedFeed`, `CategoryFilterBar`, `SearchBar`, `SortControl` components
- Layout structure (`default.vue`) -- sidebar/mobile nav still render for other pages

### Research Insights (Follow-up Items)

**Composable Naming:**
- `useHomepageFilter` will become a misnomer once the summaries feed moves to `/summaries/`. Consider renaming to `useSummariesFilter` or `useFeedFilter` in a follow-up PR to maintain code clarity. Not in scope for this PR to minimize diff and avoid logic changes.

**Learnings Applied (from `docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md`):**
- Pattern #6 (Stale doc comments after migration): After this route change, grep for any comments referencing "homepage" or "home page" in summaries-related files. The `useHomepageFilter` composable name is the most prominent example but check for JSDoc comments in components too
- Pattern #7 (CSS naming consistency): When removing `.sidebar-home` and `.mobile-nav__home` CSS classes, verify no other component references these class names

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

### Research Insights (Additional Acceptance Criteria)

- [ ] `/summaries/` is included in the `nitro.prerender.routes` array in `nuxt.config.ts`
- [ ] Sitemap (`src/server/routes/sitemap.xml.ts`) includes a `/summaries/` entry
- [ ] Dead CSS classes (`.sidebar-home`, `.mobile-nav__home` and their variants) are removed from their respective components
- [ ] `npm run build` completes without errors (static generation produces `/summaries/index.html`)
- [ ] No console warnings about unresolved routes during build

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

### Research Insights (Expanded Risk Analysis)

**SEO Redirect Strategy (critical for indexed sites):**
- Google recommends keeping redirects active for at least one year to transfer ranking signals
- For this project, a **302 temporary redirect** is more appropriate than 301 because AIC-28 will reclaim `/` for the newsletter. A 301 would tell browsers and CDNs to permanently cache the redirect to `/summaries/`, making it harder to serve the newsletter at `/` later
- With `nitro.preset: 'static'`, redirects configured via `routeRules` generate static redirect files. Verify the hosting platform (likely Netlify based on the Netlify MCP tools) supports these redirect rules
- **Decision point:** If the site has minimal search traffic, skipping the redirect entirely is acceptable. The placeholder page at `/` plus the direct URL `/summaries/` may be sufficient

**Static Generation Risk:**
- With navigation links to `/summaries/` removed and `crawlLinks: true`, the prerender crawler will NOT discover `/summaries/` automatically. This means `/summaries/index.html` will NOT be generated unless explicitly added to prerender routes
- **Mitigation:** Add `'/summaries'` to the `nitro.prerender.routes` array. This is a hard requirement, not optional

**Netlify Deployment:**
- If deployed to Netlify, the `routeRules` redirect will generate a `_redirects` file entry. Verify after build that `/.output/public/_redirects` contains the expected redirect rule
- Netlify's `_redirects` syntax for 302: `/ /summaries/ 302`

**Edge Case -- Browser History:**
- Users who have bookmarked `/` will land on the placeholder/redirect. This is expected behavior but worth noting in any changelog or release notes
- Users who have bookmarked `/summaries/[slug]` detail pages will be unaffected (these routes are unchanged)

**Edge Case -- RSS Feed:**
- The RSS feed at `/feed.xml` links to individual summary pages at `/summaries/[slug]` which are unchanged. The feed itself does not reference `/` as a summaries index. No RSS changes needed
- Verify the digest feed (`/digest.xml`) similarly has no `/` references that should become `/summaries/`

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
- Nuxt config: `src/nuxt.config.ts`
- Sitemap route: `src/server/routes/sitemap.xml.ts`
- PageNotFound component: `src/components/content/PageNotFound.vue`
- PageEmptyState component: `src/components/content/PageEmptyState.vue`
- Styling audit learnings: `docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md`

### External References

- Nuxt Route Rules: https://nuxt.com/docs/guide/concepts/rendering#route-rules
- Nuxt Redirect Patterns: https://masteringnuxt.com/blog/how-to-redirect-in-nuxt-every-single-way
- SEO Redirects for Nuxt: https://nuxtseo.com/learn-seo/nuxt/controlling-crawlers/redirects
- Nuxt SEO Canonical URLs: https://nuxtseo.com/docs/seo-utils/guides/canonical-url

### Related Work

- Blocks: AIC-28 (newsletter homepage) -- depends on this completing first

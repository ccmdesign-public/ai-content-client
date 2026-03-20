---
title: "Route Relocation Stale Reference Cleanup: 5 Patterns from PR #8 Code Review"
category: logic-errors
date: 2026-03-19
tags: [nuxt, routing, css, seo, sitemap, naming-conventions, code-review, dead-code]
component: index.vue, summaries/index.vue, sitemap.xml.ts, ccmTopbar.vue, useSummariesFilter
severity: mixed (p2-p3)
resolution_time: single-pass
---

# Route Relocation Stale Reference Cleanup: 5 Patterns from PR #8 Code Review

## Problem

When relocating the summaries feed from `/` to `/summaries/` (PR #8, AIC-30), code review surfaced 5 issues where references to the old route or its naming conventions persisted. These represent a recurring pattern: route relocations leave behind stale naming, dead code, and misconfigured metadata that automated linting cannot catch.

## Root Cause

Route relocations in Nuxt/Vue projects touch more surfaces than the route itself. The page file moves, but CSS class names, composable names, sitemap priorities, navigation links, and placeholder pages all carry implicit references to the old location. Without a systematic checklist, these stale references survive code review because each one is individually minor and easy to overlook.

## Solutions Applied

### 1. Redundant Placeholder Page Behind Redirect (P2)

A 302 redirect in `nuxt.config.ts` (`routeRules`) sent `/` to `/summaries/`, but `src/pages/index.vue` still contained a full placeholder page with styled content. The redirect fires before the page renders, making the placeholder dead code from day one.

**Fix:** Strip `index.vue` to a minimal empty template with a comment explaining the redirect.

```vue
<script setup lang="ts">
// This page exists behind a 302 redirect (see nuxt.config.ts routeRules).
// The redirect sends all traffic to /summaries/.
definePageMeta({ hero: false, footer: false })
</script>

<template>
  <!-- Redirect target: /summaries/ (see nuxt.config.ts routeRules) -->
  <div />
</template>
```

**Rule:** When adding a redirect, strip or remove the source page. If the page must exist for Nuxt routing purposes, keep it minimal with a comment explaining why. Never leave styled content behind a redirect -- it misleads future contributors.

### 2. Stale "Homepage" Naming in Relocated Page (P2)

After moving the summaries feed to `/summaries/index.vue`, the CSS class `home-page` and composable `useHomepageFilter` still referenced "home" or "homepage." This creates a misleading mental model for developers reading the code.

**Fix:** Full rename across all files:
- CSS class: `home-page` -> `summaries-page`
- Composable: `useHomepageFilter` -> `useSummariesFilter` (file, export, and `useAsyncData` key)
- Test file: `useHomepageFilter.test.ts` -> `useSummariesFilter.test.ts`

**Rule:** When relocating a page, grep for the old route name across CSS classes, composable names, test files, and `useAsyncData` keys. Naming should reflect where code lives now, not where it came from.

### 3. Sitemap Priority Mismatch After Redirect (P3)

The sitemap listed `/` at `priority: 1.0` and `/summaries/` at `priority: 0.9`, but `/` was now a 302 redirect. Search engines following the sitemap would hit the redirect as the highest-priority URL -- semantically incorrect.

**Fix:** Swap priorities: `/` set to `0.5`, `/summaries/` set to `1.0`.

```ts
// Home page (currently a 302 redirect to /summaries/, lower priority)
urls.push({ loc: '/', changefreq: 'daily', priority: 0.5 })

// Summaries index (primary content page)
urls.push({ loc: '/summaries/', changefreq: 'daily', priority: 1.0 })
```

**Rule:** After adding a redirect, update the sitemap to reflect the new hierarchy. Redirect URLs should have lower priority than their targets. Consider removing redirect URLs from the sitemap entirely.

### 4. No-Op Hover Style (P3)

The `.filtered-empty-state__reset:hover` rule set `background: var(--primary)` -- identical to the non-hover state. Users got no visual feedback when hovering the "Show all summaries" button.

**Fix:** Changed hover to `opacity: 0.85` for visible feedback.

```css
/* Before -- identical to non-hover, no visual effect */
.filtered-empty-state__reset:hover {
  background: var(--primary);
}

/* After -- visible hover feedback */
.filtered-empty-state__reset:hover {
  opacity: 0.85;
}
```

**Rule:** When copying styles between pages or components, verify that hover/focus states actually differ from the resting state. A hover rule that duplicates the base rule is silently broken and hard to spot without side-by-side comparison.

### 5. Design System Component With Stale Navigation Link (P3)

`ccmTopbar.vue` (a design-system demo component) contained `<nuxt-link to="/">Home</nuxt-link>`. While the component is not rendered in the active layout, the stale link would point to a redirect if ever activated.

**Fix:** Updated link from `/` to `/summaries/`.

**Rule:** When relocating a primary route, search for hardcoded links across all components -- including design system demos and boilerplate that may not be actively rendered.

## Prevention Checklist

For future route relocations in Nuxt projects, check:

- [ ] Source page behind redirect is stripped to minimal (no styled content)
- [ ] CSS class names in the relocated page reflect the new route
- [ ] Composable names referenced by the page reflect the new route
- [ ] `useAsyncData` keys do not reference the old route name
- [ ] Test file names match renamed composables
- [ ] Sitemap priorities reflect actual content hierarchy (redirect URLs deprioritized)
- [ ] Hover/focus states in copied CSS actually differ from base state
- [ ] Hardcoded navigation links in all components (including unused/demo) updated
- [ ] `grep -r "old-route-name" src/` run to catch string references in code and comments

## Cross-References

- PR: https://github.com/ccmdesign/ai-content-client/pull/8
- Todos: 027-031 in `todos/` directory
- Related: `docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md` (similar pattern of code review surfacing systematic issues)
- Nuxt Route Rules: https://nuxt.com/docs/guide/concepts/rendering#route-rules

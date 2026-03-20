---
title: "refactor: Migrate all UI components to shadcn-vue"
type: refactor
status: active
date: 2026-03-19
deepened: 2026-03-19
---

# refactor: Migrate all UI components to shadcn-vue

## Enhancement Summary

**Deepened on:** 2026-03-19
**Sections enhanced:** 12
**Research sources:** Context7 (shadcn-vue, reka-ui), web search (5 queries), 4 project learnings, codebase audit

### Key Improvements
1. Discovered 5 content components omitted from migration scope (ArticleCard, FeedItem, ToolCard, ToolsFilters, ToolsSearch) -- ToolCard has scoped styles that need removal
2. Found Material Symbols references in 5 files outside content components (error.vue, playlists/[slug], summaries/index, issues/[id] pages) that the font removal would break
3. Added mandatory SSR hydration prevention: `provideSSRWidth` plugin required for shadcn Sidebar mobile breakpoint detection
4. Identified concrete `storage-key` prop for SidebarProvider persistence (replaces manual cookie approach) and controlled sidebar pattern for `definePageMeta({ sidebar: false })` pages
5. Applied learnings from 3 prior code review solutions to prevent known regression patterns

### New Risks Discovered
- **ToolCard scoped styles missed**: `ToolCard.vue` has a `<style scoped>` block at line 142 not accounted for in the plan
- **Material Symbols in pages**: 5 page-level files use Material Symbols icons directly -- removing the font link in Phase 4 without migrating these first will break visible UI
- **SSR hydration on mobile**: Without `provideSSRWidth` plugin, Sidebar component will produce hydration mismatches on mobile devices (known shadcn-vue issue #257)
- **`error.vue` not in scope**: The error page uses Material Symbols extensively and is not a content component -- needs explicit migration step
- **`vue-carousel` only in transpile config**: The dependency exists in package.json and nuxt.config.ts transpile but may not be imported anywhere in source -- verify before removal

---

## Overview

Replace every custom-styled content component and any remaining design-system remnants with native shadcn-vue components. After this migration the only custom CSS in the repo should be the 11 composition layout utilities (stack, cluster, center, container, grid, switcher, box, cover, frame, reel, imposter) already imported in `tailwind.css`. All scoped `<style>` blocks in content components will be eliminated in favour of Tailwind utility classes composed on shadcn primitives.

## Problem Statement / Motivation

The codebase currently has 18 content components in `src/components/content/` and 1 custom component in `src/components/custom/` that use hand-rolled BEM-style CSS with raw `var(--*)` token references. While the earlier theme-reset work (see `docs/plans/shadcn-theme-reset.md`) removed the CUBE CSS layer system and installed the Rose Pine theme, the components themselves were never migrated to shadcn primitives. This creates:

1. **Maintenance burden** -- two styling systems to understand (shadcn tokens via Tailwind classes vs raw CSS vars in scoped styles)
2. **Inconsistency** -- some components use shadcn Card/Badge/Sheet while adjacent ones use custom `.issue-card__link` / `.signup-form__button` patterns
3. **Missed accessibility** -- shadcn components include built-in ARIA patterns, keyboard nav, and focus management that custom implementations approximate but don't fully replicate

### Research Insights

**Best Practices (from shadcn-vue v1 + Tailwind v4 ecosystem):**
- shadcn-vue v1 (released Feb 2025) switched from Radix-UI to Reka UI as its core primitive library -- all accessibility patterns now come from Reka UI
- Components are installed as source files and maintained like any other project code -- no version tracking or automatic updates from CLI
- Tailwind CSS v4 (Jan 2025) provides 3.5x faster full builds and 8x faster incremental builds, making the all-Tailwind approach performant at build time
- The `new-york` style variant (already configured in `components.json`) uses smaller, denser components appropriate for dashboard/content applications

**Prior Learning Applied -- Styling Audit Patterns (from `docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md`):**
- Never use `transition: all` -- specify exact properties (pattern #4 from prior audit)
- CSS `content` property only on `::before`/`::after` pseudo-elements (pattern #2)
- Use `useId()` from Vue 3.5+ for any dynamic IDs in SSR-rendered components instead of `Math.random()` (pattern #1)
- When migrating CSS custom properties, grep for old patterns in comments, not just CSS values (pattern #6)
- Component-scoped CSS custom properties should follow `--_{shortname}-{property}` without framework prefixes (pattern #7)

## Proposed Solution

Systematically replace content components in four phases: (1) install missing shadcn-vue primitives, (2) rebuild the layout shell with shadcn Sidebar, (3) migrate each content component to shadcn equivalents, (4) delete dead code and update docs.

## Technical Approach

### Pre-requisites: Install shadcn-vue Components

The following shadcn-vue components need to be installed. Some already exist in `src/components/ui/`:

**Already installed:** Badge, Breadcrumb, Button, Card, Dialog, Form, Input, Label, Select, Sheet, Table, Tabs, Textarea

**Need to install:**

```bash
# From the project root (ai-content-client-wt/AIC-31/)
pnpm dlx shadcn-vue@latest add sidebar
pnpm dlx shadcn-vue@latest add toggle-group
pnpm dlx shadcn-vue@latest add toggle
pnpm dlx shadcn-vue@latest add separator

# Install the sidebar-03 block for the summaries index layout
npx shadcn-vue add Sidebar03
```

> **Note:** The Sidebar03 block scaffolds an `AppSidebar.vue` with collapsible submenus. This will be adapted to hold playlists, channels, articles, and topics sections currently in `SidebarNav.vue`.

### Research Insights -- shadcn-vue Sidebar Architecture

**Key architectural details from Context7 docs:**
- `SidebarHeader` and `SidebarFooter` are sticky at the top and bottom of the sidebar automatically
- `SidebarContent` is scrollable between them, containing `SidebarGroup` sections
- Use `storage-key` prop on `SidebarProvider` for automatic cookie-based persistence (no manual `useCookie` needed):
  ```vue
  <SidebarProvider :default-open="true" storage-key="sidebar">
  ```
- For programmatic control (needed for `definePageMeta({ sidebar: false })` pages), use the controlled pattern:
  ```vue
  <SidebarProvider :open="open" @update:open="open = $event">
  ```
- Built-in keyboard shortcut: `Cmd+B` / `Ctrl+B` toggles sidebar -- this is automatic and does not conflict with `Cmd+K` search shortcut

**Reka UI ToggleGroup accessibility (from Context7 docs):**
- `ToggleGroupRoot` with `ToggleGroupItem` children provides roving tabindex automatically
- Arrow keys navigate between items; Tab moves focus in/out of the group
- `aria-pressed` states managed automatically on each item
- `type="single"` enforces radio-like behavior (only one active at a time)

### Architecture

The migration touches three layers:

1. **Layout shell** (`src/layouts/default.vue`) -- replace inline hero/header/footer/sidebar with shadcn `SidebarProvider` + `Sidebar` + breadcrumbs + search input
2. **Content components** (`src/components/content/`) -- rebuild each on shadcn primitives, preserving existing composable integration
3. **Cleanup** -- delete unused components, remove scoped CSS blocks, update CLAUDE.md

### Implementation Phases

#### Phase 1: Install shadcn primitives & scaffold Sidebar (estimated: 1-2 hours)

**Tasks:**

- [ ] Run install commands for Sidebar, ToggleGroup, Toggle, Separator
- [ ] Run `npx shadcn-vue add Sidebar03` to scaffold the sidebar block
- [ ] Verify all new components land in `src/components/ui/` and auto-register
- [ ] Create `src/components/AppSidebar.vue` based on Sidebar03 scaffold, adapted with existing composable data (playlists, channels, articles, topics from `usePlaylistsConfig`, `useChannelsConfig`, `useArticleStream`, `useTagsConfig`)
- [ ] **NEW** Create `src/plugins/ssr-width.ts` plugin for mobile hydration safety:
  ```ts
  import { provideSSRWidth } from '@vueuse/core'
  export default defineNuxtPlugin((nuxtApp) => {
    provideSSRWidth(1024, nuxtApp.vueApp)
  })
  ```

**Files created:**
- `src/components/ui/sidebar/` (multiple files from shadcn install)
- `src/components/ui/toggle-group/` (from shadcn install)
- `src/components/ui/toggle/` (from shadcn install)
- `src/components/ui/separator/` (from shadcn install)
- `src/components/AppSidebar.vue`
- `src/plugins/ssr-width.ts` **(NEW -- prevents mobile hydration mismatch)**

**Success criteria:**
- [ ] `pnpm run build` passes
- [ ] Sidebar renders with all nav sections from existing `SidebarNav.vue`
- [ ] **NEW** No hydration warnings when loading at mobile viewport widths

### Research Insights -- Phase 1

**SSR Hydration Prevention (from shadcn-vue Nuxt docs + issue #257):**
- The `provideSSRWidth` plugin is mandatory when using shadcn Sidebar in Nuxt SSR mode. Without it, the Sidebar component uses `window.innerWidth` to determine mobile/desktop mode, which does not exist during SSR. The plugin provides a fallback width (1024px = desktop) so the server renders the desktop layout, then the client hydrates and adjusts if needed.
- This is a known issue documented in [shadcn-vue #257](https://github.com/unovue/shadcn-vue/issues/257) and the official [Nuxt installation guide](https://v3.shadcn-vue.com/docs/installation/nuxt).

**Auto-Registration (from shadcn-nuxt module docs):**
- The `shadcn-nuxt` module handles component auto-import by re-registering UI component directories. Each directory in `src/components/ui/` is automatically ignored by Nuxt's default scanner and re-registered through the module.
- Verify that the `componentDir` in the shadcn-nuxt module config points to `./components/ui` (or equivalent with the `src/` srcDir).

#### Phase 2: Migrate layout shell (estimated: 2-3 hours)

Rewrite `src/layouts/default.vue` to use shadcn Sidebar with built-in mobile support.

**Tasks:**

- [ ] Wrap layout in `<SidebarProvider>` with `storage-key="sidebar"` prop for automatic cookie persistence
- [ ] Replace inline hero `<header>` with a simple Tailwind header (breadcrumbs left, search right)
  - Use `BreadcrumbWithSchema` (already installed at `src/components/ui/breadcrumb-with-schema/`) for the left side
  - Use shadcn `Input` with search icon and `<kbd>` hint for the right side (replaces `SearchBar`)
- [ ] Replace `<SidebarNav>` with `<AppSidebar>` (from Phase 1)
- [ ] Remove `<MobileNav>` -- shadcn Sidebar has built-in mobile sheet mode via `SidebarTrigger`
- [ ] Replace `<footer>` with inline copyright text (one line of Tailwind markup)
- [ ] Remove hero state management (`heroState`, `heroSizeClasses` computed) -- hero is replaced by a flat header
- [ ] Preserve `provide('search', search)` for downstream pages
- [ ] **NEW** Implement controlled sidebar for pages with `sidebar: false`:
  ```vue
  <script setup>
  const route = useRoute()
  const sidebarOpen = ref(true)

  // React to route changes -- close sidebar on pages that opt out
  watch(() => route.meta.sidebar, (val) => {
    if (val === false) sidebarOpen.value = false
    else sidebarOpen.value = true
  }, { immediate: true })
  </script>

  <template>
    <SidebarProvider :open="sidebarOpen" @update:open="sidebarOpen = $event" storage-key="sidebar">
  ```
  - **Affected pages:** `src/pages/index.vue` (`sidebar: false`), `src/pages/issues/[id].vue` (`sidebar: false`)

**Files modified:**
- `src/layouts/default.vue`

**Files deleted after verification:**
- `src/components/content/SidebarNav.vue`
- `src/components/content/MobileNav.vue`

**Success criteria:**
- [ ] Desktop: sidebar on left, breadcrumbs + search in header, content in main area
- [ ] Mobile: sidebar hidden, hamburger trigger opens sheet from right
- [ ] Cookie-persisted sidebar open/close state
- [ ] No scoped `<style>` block in `default.vue`
- [ ] **NEW** Pages with `definePageMeta({ sidebar: false })` correctly hide the sidebar
- [ ] **NEW** Sidebar keyboard shortcut (Cmd+B) works without conflicting with search (Cmd+K)

### Research Insights -- Phase 2

**Cookie Persistence Best Practices (from Nuxt SSR docs):**
- The `storage-key` prop on SidebarProvider handles cookie read/write automatically using `useCookie` internally. This is SSR-safe because cookies are sent with the request and available during server-side rendering.
- Do NOT use `localStorage` for sidebar state -- it causes hydration mismatches because `localStorage` is not available during SSR. The `useCookie` approach used by shadcn's `storage-key` prop is correct.
- Default cookie name is `sidebar_state`; the `storage-key` prop lets you customize it.

**Controlled vs Uncontrolled Sidebar:**
- The plan originally mentioned `useSidebar()` composable for programmatic control. The better approach is the controlled component pattern with `:open` + `@update:open` props, which allows the layout to react to route meta changes.
- The `useSidebar()` composable is available within children of `SidebarProvider` for child-level control (e.g., a toggle button inside the sidebar footer).

**Prior Learning Applied -- Route Relocation Patterns (from `docs/solutions/logic-errors/route-relocation-stale-reference-cleanup.md`):**
- When removing the hero/header pattern, grep for `heroState`, `heroSizeClasses`, `hero: false`, `hero: true` across all pages and composables to ensure no stale references remain.
- Any CSS class names referencing "hero" should be searched and removed.

#### Phase 3: Migrate content components (estimated: 4-6 hours)

Migrate each component one at a time. Reuse existing composables (`useSearch`, `useSortOptions`, `useDateGroups`, `useSummariesFilter`, `useTagsConfig`, etc.) -- only the template and styling changes.

##### 3a. SearchBar -> Input with search icon

Replace expandable search bar with shadcn `Input` in a flex wrapper with Lucide search icon and `<kbd>` shortcut hint. Keep `Cmd+K` / `Ctrl+K` global shortcut logic from the existing composable.

- **Delete:** `src/components/content/SearchBar.vue` (284 lines, 132 lines of scoped CSS)
- **Replace with:** Inline markup in the layout header using `<Input>` + Lucide `Search` icon + `<kbd>` element
- **Preserve:** All keyboard shortcut logic, expand/collapse behavior, screen reader announcements

### Research Insights -- SearchBar

**Accessibility (from WCAG 2.1 guidelines):**
- The search input must have an accessible name via `aria-label="Search"` or an associated `<Label>` (can be visually hidden with `sr-only` class)
- The `<kbd>` shortcut hint should use `aria-hidden="true"` since it is a visual affordance, not semantic content
- When the search input gains focus via Cmd+K, announce it to screen readers with `role="status"` or `aria-live="polite"` region
- Tailwind's built-in `sr-only` utility class should be used (do not redefine in scoped styles -- per learning from newsletter endpoint hardening, pattern #6)

##### 3b. SortControl -> Select

Replace custom select with shadcn `Select` + `SelectTrigger` + `SelectContent` + `SelectItem`.

- **Delete:** `src/components/content/SortControl.vue` (47 lines)
- **Replace with:** New `SortControl.vue` using shadcn Select, same `v-model` interface
- **File:** `src/components/content/SortControl.vue` (rewrite in place)

##### 3c. CategoryFilterBar -> ToggleGroup

Replace custom radiogroup chip bar with shadcn `ToggleGroup` (type="single") + `ToggleGroupItem` with Button variant styling.

- **Delete:** `src/components/content/CategoryFilterBar.vue` (201 lines, 67 lines scoped CSS)
- **Replace with:** New `CategoryFilterBar.vue` using `ToggleGroup` with the same props/emits interface
- **Remove:** The "AI&ML" hardcoded filter as specified in requirements
- **Preserve:** Sticky positioning, roving tabindex (handled natively by ToggleGroup/reka-ui), resize observer for `--filter-bar-height` CSS var
- **File:** `src/components/content/CategoryFilterBar.vue` (rewrite in place)

### Research Insights -- ToggleGroup

**Reka UI ToggleGroup Behavior (from Context7 docs):**
- `ToggleGroupRoot` with `type="single"` enforces mutual exclusivity -- selecting one item deselects the previous
- Roving tabindex is built-in: only the active item is in the tab order; Arrow keys move between items
- `ToggleGroupItem` supports a `value` prop for programmatic identification and a `disabled` prop for individual item control
- The `ToggleGroupRoot` emits `update:modelValue` with the selected value string
- For sticky positioning: wrap the `ToggleGroupRoot` in a `div` with `sticky top-0 z-10 bg-background` classes. The ToggleGroup itself does not support sticky; the wrapper handles it.

**Edge Case -- Empty Selection:**
- With `type="single"`, clicking the already-selected item deselects it (value becomes empty string). If the "All" category should always be selected as default, handle the `update:modelValue` event to prevent deselection:
  ```vue
  @update:model-value="(val) => selectedCategory = val || 'all'"
  ```

##### 3d. SummaryCard -> Card + Badge + Separator

Rebuild the summary card using shadcn `Card`, `CardContent`, `Badge` for channel/date metadata, `Separator` between items.

- **Delete:** `src/components/content/SummaryCard.vue` (66 lines)
- **Replace with:** New `SummaryCard.vue` using Card primitives, Tailwind utilities only
- **File:** `src/components/content/SummaryCard.vue` (rewrite in place)

##### 3e. IssueCard -> Card as clickable row

Rebuild newsletter issue card using shadcn `Card` as a clickable `NuxtLink` wrapper with `Badge` for counts.

- **Delete:** `src/components/content/IssueCard.vue` (115 lines, 72 lines scoped CSS)
- **Replace with:** New `IssueCard.vue` using Card + Badge, Tailwind utilities only
- **Preserve:** Same props interface, Lucide `ArrowRight` icon instead of Material Symbols
- **File:** `src/components/content/IssueCard.vue` (rewrite in place)

### Research Insights -- Clickable Card Accessibility

**Best Practices:**
- When wrapping a Card in `NuxtLink`, use `CardContent` as a child rather than making the entire Card an anchor. The recommended pattern is to use a "stretched link" approach with `after:absolute after:inset-0` on the primary link inside the card, making the entire card clickable while keeping proper semantic HTML.
- Ensure the clickable card has `:focus-visible` ring styling for keyboard users (Tailwind: `focus-visible:ring-2 focus-visible:ring-ring`)
- The `ArrowRight` icon should have `aria-hidden="true"` since the link text provides the accessible name

##### 3f. DateGroupedFeed -> keep logic, use Separator

Keep the grouping logic and `useDateGroups` composable. Replace custom `.date-segment__header` with shadcn `Separator` + text label.

- **Delete:** Scoped CSS in `src/components/content/DateGroupedFeed.vue`
- **Replace with:** Tailwind classes + `<Separator>` for date headings
- **Preserve:** Sticky header behavior (via Tailwind `sticky top-[var(--filter-bar-height)]`)
- **File:** `src/components/content/DateGroupedFeed.vue` (rewrite in place)

##### 3g. PageEmptyState & PageNotFound -> unified Empty State

Replace both with a single component or keep two thin wrappers, using shadcn Card with centered content and Lucide icons (replacing Material Symbols).

- **Delete:** Scoped CSS in both files
- **Replace with:** Tailwind utility classes + shadcn `Button` for action links
- **Files:** `src/components/content/PageEmptyState.vue`, `src/components/content/PageNotFound.vue` (rewrite in place)

##### 3h. NewsletterSignupForm -> Input + Button + Form

Rebuild using shadcn `Form` (with vee-validate + zod, already dependencies), `Input`, `Button`, `Label`, `FormMessage`.

- **Delete:** `src/components/content/NewsletterSignupForm.vue` scoped CSS (115 lines)
- **Replace with:** shadcn Form primitives, Tailwind utilities
- **Preserve:** Honeypot field, localStorage check, API submission logic, error/success states
- **File:** `src/components/content/NewsletterSignupForm.vue` (rewrite in place)

### Research Insights -- NewsletterSignupForm

**Prior Learning Applied (from `docs/solutions/integration-issues/newsletter-subscribe-endpoint-hardening.md`):**
- Ensure the email validation regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` is preserved on both client and server sides during the template rewrite
- The honeypot field must remain a visually hidden input (use Tailwind `sr-only` or `absolute -left-[9999px]` pattern) -- do not accidentally make it visible during the CSS-to-Tailwind migration
- The `failOnError: true` in Nitro prerender config must not be changed as part of this refactor
- Zod `.url()` validation on schema fields must be preserved

**Accessibility:**
- shadcn Form with vee-validate provides automatic `aria-invalid` and `aria-describedby` linking between inputs and error messages
- Ensure form success/error states use `role="alert"` or `aria-live="assertive"` for screen reader announcements

##### 3i. projectCard -> Card + Badge

The `projectCard.vue` in `src/components/custom/` already uses shadcn Card. Minimal changes needed:

- Replace inline `<span>` tech stack badges with shadcn `Badge` component
- Replace inline SVG icons with Lucide `Github` and `ExternalLink` icons
- Move from `src/components/custom/` to `src/components/content/ProjectCard.vue` (PascalCase rename)
- **File:** `src/components/custom/projectCard.vue` -> `src/components/content/ProjectCard.vue`

##### 3j. ToolCard -- remove scoped styles **(NEW)**

**Discovered during codebase audit:** `ToolCard.vue` has a `<style scoped>` block at line 142 that was not included in the original plan.

- **Delete:** Scoped CSS in `src/components/content/ToolCard.vue`
- **Replace with:** Tailwind utility classes
- **File:** `src/components/content/ToolCard.vue` (rewrite styles in place)

##### 3k. Material Symbols in page files **(NEW)**

**Discovered during codebase audit:** The following files use `<span class="material-symbols-outlined">` directly and are NOT content components -- they will break when the font link is removed in Phase 4:

| File | Material Symbol Icons Used |
|------|---------------------------|
| `src/error.vue` | unnamed icon, `home` (lines 15, 34) |
| `src/pages/playlists/[slug].vue` | `playlist_remove` (line 66) |
| `src/pages/summaries/index.vue` | `error`, `search_off`, `filter_list_off` (lines 104, 130, 137) |
| `src/pages/issues/[id].vue` | `arrow_back` (line 78) |

- **Replace all** with Lucide equivalents:
  - `home` -> `<Home />` from lucide-vue-next
  - `playlist_remove` -> `<ListX />` from lucide-vue-next
  - `error` -> `<AlertCircle />` from lucide-vue-next
  - `search_off` -> `<SearchX />` from lucide-vue-next
  - `filter_list_off` -> `<FilterX />` from lucide-vue-next
  - `arrow_back` -> `<ArrowLeft />` from lucide-vue-next
- **Also update** `src/error.vue` scoped CSS that targets `.material-symbols-outlined` class (lines 59, 112)

**Success criteria for all Phase 3 items:**
- [ ] Zero scoped `<style>` blocks in any content component
- [ ] All icons from Lucide (no more Material Symbols `<span>` elements)
- [ ] Same props/emits interfaces -- no breaking changes to pages
- [ ] `pnpm run build` passes
- [ ] **NEW** Zero Material Symbols references in ANY `.vue` or `.ts` file (not just content components)

### Research Insights -- Lucide Icon Migration

**Bundle Size (from Lucide docs):**
- Lucide is fully tree-shakeable when importing individual components (`import { Search } from 'lucide-vue-next'`)
- Do NOT use `import * as icons from 'lucide-vue-next'` -- this imports all 1500+ icons and defeats tree-shaking
- Each icon is approximately 200-500 bytes gzipped -- the full Material Symbols font file is ~80KB. The migration should result in a net bundle size reduction.

**Icon Naming Convention:**
- Lucide uses PascalCase for Vue components: `<Search />`, `<ArrowLeft />`, `<Home />`
- Apply `aria-hidden="true"` to all decorative icons; for icon-only buttons, add `aria-label` to the button instead
- Set consistent sizing with `class="size-4"` (Tailwind) or `:size="16"` (prop) -- pick one approach and use it consistently

#### Phase 4: Delete dead code & update docs (estimated: 1 hour)

- [ ] Delete `src/components/content/docs-code-block.vue` (unused, 197 lines)
- [ ] Delete `src/components/content/docs-props-table.vue` (unused, 309 lines)
- [ ] Delete `src/components/custom/` directory (empty after projectCard move)
- [ ] Remove Google Material Symbols font link from `nuxt.config.ts` `app.head.link` (all icons now Lucide)
- [ ] Remove `vue-carousel` from dependencies and `build.transpile` if unused elsewhere
- [ ] Update `CLAUDE.md`:
  - Remove references to `src/components/ds/` (already gone)
  - Remove `--_ccm-{component}-{property}` CSS variable pattern docs
  - Update component development section to reference shadcn-vue primitives
  - Update styling architecture section: "shadcn-vue components with Tailwind v4. Composition layout utilities for structural patterns."
- [ ] Update `AGENTS.md` project structure section
- [ ] Verify no remaining references to deleted components across all pages

### Research Insights -- Phase 4

**Verification Checklist (from prior learnings):**

Before removing the Material Symbols font link, run these verification commands:
```bash
# Must return zero results before font removal is safe
grep -r "material-symbols\|material_symbols\|Material Symbols" src/ --include="*.vue" --include="*.ts" --include="*.css"

# Check for any remaining ccm-prefixed variables or classes
grep -r "ccm-\|--_ccm" src/ --include="*.vue" --include="*.ts" --include="*.css"

# Check for any remaining scoped style blocks in content components
grep -rn "<style scoped>" src/components/content/

# Check for stale hero references after Phase 2
grep -r "heroState\|heroSizeClasses\|hero:\|'hero'" src/ --include="*.vue" --include="*.ts"
```

**vue-carousel Removal (codebase audit finding):**
- `vue-carousel` v0.18.0 exists in `package.json` dependencies and `nuxt.config.ts` `build.transpile` (line 92)
- No import of `vue-carousel` was found in any `.vue` or `.ts` source file in `src/`
- Safe to remove both the dependency and the transpile entry. Run `pnpm remove vue-carousel` then delete the transpile line.

**Prior Learning Applied -- Stale Doc Comments (from styling audit, pattern #6):**
- When updating `CLAUDE.md`, also grep for references to the old patterns in code comments (not just documentation files):
  ```bash
  grep -rn "CUBE\|cube-css\|BEM\|bem-" src/ --include="*.vue" --include="*.ts"
  ```

**Files deleted:**
- `src/components/content/docs-code-block.vue`
- `src/components/content/docs-props-table.vue`
- `src/components/custom/projectCard.vue` (moved, not just deleted)

## System-Wide Impact

### Interaction Graph

- Layout (`default.vue`) provides search via `provide('search', search)` -- all pages that `inject('search')` continue working unchanged
- `SidebarProvider` wraps the entire app -- pages inside `<slot />` are unaffected
- `definePageMeta({ sidebar: false })` on pages like `index.vue` will need to be replaced with a mechanism that works with shadcn Sidebar (e.g., a `useSidebar()` composable to hide/show programmatically, or simply always showing the sidebar)

### Research Insights -- Interaction Graph

**Specific pages using `definePageMeta({ sidebar: false })` (from codebase audit):**
- `src/pages/index.vue` (line 5): `sidebar: false` -- this page is behind a 302 redirect to `/summaries/`, so the sidebar setting may be moot. Consider removing it entirely.
- `src/pages/issues/[id].vue` (line 7): `sidebar: false` -- this is a content detail page. Decision needed: keep sidebar hidden on detail pages, or show it for navigation context.

**Recommended approach:** Use the controlled `SidebarProvider` pattern (`:open` + `@update:open`) with a watcher on `route.meta.sidebar`. This preserves the existing `definePageMeta` convention while integrating with shadcn Sidebar.

### Error Propagation

- No new error paths introduced -- this is a pure presentational refactor
- `NewsletterSignupForm` API error handling preserved as-is
- Search error fallback UI preserved in `summaries/index.vue`

### Research Insights -- Error Propagation

**NEW -- `error.vue` migration:**
- The global error page (`src/error.vue`) uses Material Symbols icons and has scoped styles targeting `.material-symbols-outlined`. This file is outside the `content/` component directory and was not listed in the original migration scope.
- Migration required: replace Material Symbols with Lucide icons, remove scoped CSS targeting the icon class.
- This is not a content component but MUST be migrated before the font link is removed in Phase 4.

### State Lifecycle Risks

- Cookie-based sidebar state (new) -- if cookie read fails, falls back to default open. No data loss risk.
- `localStorage` newsletter subscription check preserved unchanged
- No database or API changes

### API Surface Parity

- All component props/emits interfaces preserved -- pages are consumers and should not need changes beyond template adjustments if component names change
- `useContentStream`, `useDateGroups`, `useSortOptions`, `useSummariesFilter` composables are untouched

### Integration Test Scenarios

1. **Sidebar navigation on desktop** -- click sidebar links, verify route changes and active state highlighting
2. **Mobile sidebar** -- verify sheet opens from trigger, navigation works, closes on route change
3. **Search flow** -- Cmd+K opens input, typing filters results, Escape clears then closes
4. **Category filter + sort** -- toggle categories, change sort order, verify feed updates
5. **Newsletter signup** -- submit form, verify success state persists in localStorage across reload
6. **NEW -- Sidebar hide on specific routes** -- navigate to `/issues/[id]`, verify sidebar is hidden; navigate back to `/summaries`, verify sidebar reappears
7. **NEW -- Error page rendering** -- trigger a 404 or server error, verify error page renders with Lucide icons (no broken icon squares)
8. **NEW -- ToggleGroup empty selection** -- click the active category filter to deselect, verify it falls back to "All" rather than leaving no selection

## Acceptance Criteria

### Functional Requirements

- [ ] All existing page routes render correctly with shadcn components
- [ ] Sidebar navigation works on desktop (collapsible) and mobile (sheet)
- [ ] Search bar with Cmd+K shortcut works from the header
- [ ] Category filter bar uses ToggleGroup with proper keyboard navigation
- [ ] Sort control uses shadcn Select
- [ ] Newsletter signup form works end-to-end (submit, success, error states)
- [ ] Summary cards, issue cards, and project cards render with correct data
- [ ] Empty states and 404 pages display correctly
- [ ] Dark/light mode toggle works with Rose Pine theme
- [ ] **NEW** Error page (`error.vue`) renders correctly with Lucide icons
- [ ] **NEW** Pages with `sidebar: false` meta correctly hide the sidebar

### Non-Functional Requirements

- [ ] Zero scoped `<style>` blocks in content components (all Tailwind utilities)
- [ ] Only composition CSS files remain in `src/public/css/`
- [ ] No Material Symbols font dependency (all Lucide icons)
- [ ] No `ccm`-prefixed components or CSS variables anywhere
- [ ] `pnpm run build` passes cleanly with no warnings about missing components
- [ ] Bundle size does not regress significantly (shadcn components are tree-shaken)
- [ ] **NEW** No hydration warnings in browser console at any viewport width
- [ ] **NEW** Zero Material Symbols references in any `.vue` or `.ts` file across the entire codebase

### Quality Gates

- [ ] Manual smoke test of all routes: `/`, `/summaries`, `/summaries/[slug]`, `/tags`, `/tags/[slug]`, `/tools`, `/channels/[slug]`, `/playlists/[slug]`, `/issues/[id]`, `/articles/[slug]`
- [ ] Mobile responsive check at 375px, 768px, 1024px, 1440px
- [ ] Keyboard navigation through sidebar, filter bar, search, sort
- [ ] Screen reader test: heading hierarchy, ARIA labels, live regions
- [ ] **NEW** Run the verification grep commands from Phase 4 Research Insights to confirm zero stale references
- [ ] **NEW** Test sidebar cookie persistence: open sidebar, reload page, verify sidebar stays open. Close sidebar, reload, verify it stays closed.

## Dependencies & Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Sidebar03 block structure doesn't match existing nav sections | Medium | Low | Adapt the scaffold -- it's a starting point, not a constraint |
| `definePageMeta({ sidebar: false })` doesn't integrate with shadcn SidebarProvider | Medium | Medium | Use controlled `:open`/`@update:open` pattern with route meta watcher (see Phase 2 Research Insights) |
| Material Symbols removal breaks icons in pages not listed | **HIGH (confirmed)** | **Medium** | **5 files with Material Symbols outside content components identified -- migrate in Phase 3k before font removal** |
| ToggleGroup doesn't support sticky positioning + scroll fade | Low | Low | Wrap in a div with existing sticky/fade CSS as Tailwind utilities |
| Existing Vitest specs reference old component structure | Low | Medium | Update any component-specific tests; composable tests are unaffected |
| **NEW** SSR hydration mismatch on mobile from Sidebar | **Medium** | **Medium** | **Create `provideSSRWidth` plugin in Phase 1 (see Phase 1 Research Insights)** |
| **NEW** ToolCard scoped styles missed in migration | **Medium (confirmed)** | **Low** | **Added Phase 3j to explicitly migrate ToolCard styles** |
| **NEW** ToggleGroup allows empty selection when clicking active item | **Medium** | **Low** | **Handle in `update:modelValue` handler -- fallback to "all" when value is empty** |
| **NEW** `error.vue` icon breakage after font removal | **High (confirmed)** | **Medium** | **Added to Phase 3k Material Symbols page migration** |

## Sources & References

### Internal References

- Prior theme reset plan: `docs/plans/shadcn-theme-reset.md`
- Styling audit learnings: `docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md` -- SSR hydration patterns with `useId()`, CSS property gotchas
- Newsletter endpoint hardening: `docs/solutions/integration-issues/newsletter-subscribe-endpoint-hardening.md` -- email validation, sr-only patterns
- Route relocation patterns: `docs/solutions/logic-errors/route-relocation-stale-reference-cleanup.md` -- stale reference cleanup checklist
- Existing shadcn config: `components.json` (style: new-york, framework: nuxt, icon: lucide)
- Nuxt config: `src/nuxt.config.ts` -- component auto-registration, shadcn module config

### External References

- [shadcn-vue Sidebar docs](https://next.shadcn-vue.com/docs/components/sidebar) -- SidebarProvider, storage-key, controlled mode
- [shadcn-vue Sidebar blocks](https://www.shadcn-vue.com/blocks/sidebar) -- Sidebar03 and other templates
- [shadcn-vue Nuxt installation](https://v3.shadcn-vue.com/docs/installation/nuxt) -- provideSSRWidth plugin, auto-import config
- [shadcn-vue hydration issue #257](https://github.com/unovue/shadcn-vue/issues/257) -- known hydration warnings and fixes
- [Nuxt hydration best practices](https://nuxt.com/docs/4.x/guide/best-practices/hydration) -- useCookie vs localStorage for SSR
- [Reka UI ToggleGroup](https://reka-ui.com/docs/components/toggle-group) -- accessibility, keyboard navigation, roving tabindex
- [Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next) -- tree-shaking, individual imports
- shadcn-vue ToggleGroup: `pnpm dlx shadcn-vue@latest add toggle-group`
- shadcn-vue Select: already installed
- shadcn-vue Separator: `pnpm dlx shadcn-vue@latest add separator`
- Lucide Vue icons: `lucide-vue-next` (already a dependency)

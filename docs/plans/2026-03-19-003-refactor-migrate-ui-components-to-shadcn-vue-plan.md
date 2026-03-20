---
title: "refactor: Migrate all UI components to shadcn-vue"
type: refactor
status: active
date: 2026-03-19
---

# refactor: Migrate all UI components to shadcn-vue

## Overview

Replace every custom-styled content component and any remaining design-system remnants with native shadcn-vue components. After this migration the only custom CSS in the repo should be the 11 composition layout utilities (stack, cluster, center, container, grid, switcher, box, cover, frame, reel, imposter) already imported in `tailwind.css`. All scoped `<style>` blocks in content components will be eliminated in favour of Tailwind utility classes composed on shadcn primitives.

## Problem Statement / Motivation

The codebase currently has 18 content components in `src/components/content/` and 1 custom component in `src/components/custom/` that use hand-rolled BEM-style CSS with raw `var(--*)` token references. While the earlier theme-reset work (see `docs/plans/shadcn-theme-reset.md`) removed the CUBE CSS layer system and installed the Rose Pine theme, the components themselves were never migrated to shadcn primitives. This creates:

1. **Maintenance burden** -- two styling systems to understand (shadcn tokens via Tailwind classes vs raw CSS vars in scoped styles)
2. **Inconsistency** -- some components use shadcn Card/Badge/Sheet while adjacent ones use custom `.issue-card__link` / `.signup-form__button` patterns
3. **Missed accessibility** -- shadcn components include built-in ARIA patterns, keyboard nav, and focus management that custom implementations approximate but don't fully replicate

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

**Files created:**
- `src/components/ui/sidebar/` (multiple files from shadcn install)
- `src/components/ui/toggle-group/` (from shadcn install)
- `src/components/ui/toggle/` (from shadcn install)
- `src/components/ui/separator/` (from shadcn install)
- `src/components/AppSidebar.vue`

**Success criteria:**
- [ ] `pnpm run build` passes
- [ ] Sidebar renders with all nav sections from existing `SidebarNav.vue`

#### Phase 2: Migrate layout shell (estimated: 2-3 hours)

Rewrite `src/layouts/default.vue` to use shadcn Sidebar with built-in mobile support.

**Tasks:**

- [ ] Wrap layout in `<SidebarProvider>` with cookie-persisted state
- [ ] Replace inline hero `<header>` with a simple Tailwind header (breadcrumbs left, search right)
  - Use `BreadcrumbWithSchema` (already installed at `src/components/ui/breadcrumb-with-schema/`) for the left side
  - Use shadcn `Input` with search icon and `<kbd>` hint for the right side (replaces `SearchBar`)
- [ ] Replace `<SidebarNav>` with `<AppSidebar>` (from Phase 1)
- [ ] Remove `<MobileNav>` -- shadcn Sidebar has built-in mobile sheet mode via `SidebarTrigger`
- [ ] Replace `<footer>` with inline copyright text (one line of Tailwind markup)
- [ ] Remove hero state management (`heroState`, `heroSizeClasses` computed) -- hero is replaced by a flat header
- [ ] Preserve `provide('search', search)` for downstream pages

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

#### Phase 3: Migrate content components (estimated: 4-6 hours)

Migrate each component one at a time. Reuse existing composables (`useSearch`, `useSortOptions`, `useDateGroups`, `useSummariesFilter`, `useTagsConfig`, etc.) -- only the template and styling changes.

##### 3a. SearchBar -> Input with search icon

Replace expandable search bar with shadcn `Input` in a flex wrapper with Lucide search icon and `<kbd>` shortcut hint. Keep `Cmd+K` / `Ctrl+K` global shortcut logic from the existing composable.

- **Delete:** `src/components/content/SearchBar.vue` (284 lines, 132 lines of scoped CSS)
- **Replace with:** Inline markup in the layout header using `<Input>` + Lucide `Search` icon + `<kbd>` element
- **Preserve:** All keyboard shortcut logic, expand/collapse behavior, screen reader announcements

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

##### 3i. projectCard -> Card + Badge

The `projectCard.vue` in `src/components/custom/` already uses shadcn Card. Minimal changes needed:

- Replace inline `<span>` tech stack badges with shadcn `Badge` component
- Replace inline SVG icons with Lucide `Github` and `ExternalLink` icons
- Move from `src/components/custom/` to `src/components/content/ProjectCard.vue` (PascalCase rename)
- **File:** `src/components/custom/projectCard.vue` -> `src/components/content/ProjectCard.vue`

**Success criteria for all Phase 3 items:**
- [ ] Zero scoped `<style>` blocks in any content component
- [ ] All icons from Lucide (no more Material Symbols `<span>` elements)
- [ ] Same props/emits interfaces -- no breaking changes to pages
- [ ] `pnpm run build` passes

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

**Files deleted:**
- `src/components/content/docs-code-block.vue`
- `src/components/content/docs-props-table.vue`
- `src/components/custom/projectCard.vue` (moved, not just deleted)

## System-Wide Impact

### Interaction Graph

- Layout (`default.vue`) provides search via `provide('search', search)` -- all pages that `inject('search')` continue working unchanged
- `SidebarProvider` wraps the entire app -- pages inside `<slot />` are unaffected
- `definePageMeta({ sidebar: false })` on pages like `index.vue` will need to be replaced with a mechanism that works with shadcn Sidebar (e.g., a `useSidebar()` composable to hide/show programmatically, or simply always showing the sidebar)

### Error Propagation

- No new error paths introduced -- this is a pure presentational refactor
- `NewsletterSignupForm` API error handling preserved as-is
- Search error fallback UI preserved in `summaries/index.vue`

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

### Non-Functional Requirements

- [ ] Zero scoped `<style>` blocks in content components (all Tailwind utilities)
- [ ] Only composition CSS files remain in `src/public/css/`
- [ ] No Material Symbols font dependency (all Lucide icons)
- [ ] No `ccm`-prefixed components or CSS variables anywhere
- [ ] `pnpm run build` passes cleanly with no warnings about missing components
- [ ] Bundle size does not regress significantly (shadcn components are tree-shaken)

### Quality Gates

- [ ] Manual smoke test of all routes: `/`, `/summaries`, `/summaries/[slug]`, `/tags`, `/tags/[slug]`, `/tools`, `/channels/[slug]`, `/playlists/[slug]`, `/issues/[id]`, `/articles/[slug]`
- [ ] Mobile responsive check at 375px, 768px, 1024px, 1440px
- [ ] Keyboard navigation through sidebar, filter bar, search, sort
- [ ] Screen reader test: heading hierarchy, ARIA labels, live regions

## Dependencies & Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Sidebar03 block structure doesn't match existing nav sections | Medium | Low | Adapt the scaffold -- it's a starting point, not a constraint |
| `definePageMeta({ sidebar: false })` doesn't integrate with shadcn SidebarProvider | Medium | Medium | Use `useSidebar()` composable to programmatically control visibility per-route |
| Material Symbols removal breaks icons in pages not listed | Low | Low | Global grep for `material-symbols` before removing the font link |
| ToggleGroup doesn't support sticky positioning + scroll fade | Low | Low | Wrap in a div with existing sticky/fade CSS as Tailwind utilities |
| Existing Vitest specs reference old component structure | Low | Medium | Update any component-specific tests; composable tests are unaffected |

## Sources & References

### Internal References

- Prior theme reset plan: `docs/plans/shadcn-theme-reset.md`
- Styling audit learnings: `docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md` -- SSR hydration patterns with `useId()`, CSS property gotchas
- Existing shadcn config: `components.json` (style: new-york, framework: nuxt, icon: lucide)
- Nuxt config: `src/nuxt.config.ts` -- component auto-registration, shadcn module config

### External References

- shadcn-vue Sidebar docs and Sidebar03 block: `npx shadcn-vue add Sidebar03`
- shadcn-vue ToggleGroup: `pnpm dlx shadcn-vue@latest add toggle-group`
- shadcn-vue Select: already installed
- shadcn-vue Separator: `pnpm dlx shadcn-vue@latest add separator`
- Lucide Vue icons: `lucide-vue-next` (already a dependency)

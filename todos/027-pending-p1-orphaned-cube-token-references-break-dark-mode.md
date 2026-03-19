---
status: pending
priority: p1
issue_id: "027"
tags: [code-review, architecture, css, dark-mode]
dependencies: []
---

# Orphaned CUBE CSS Token References Break Dark Mode

## Problem Statement

PR #6 deletes all CUBE CSS token files (`tokens/`, `themes/`, `utils/`) that defined `--color-base-*`, `--color-text`, `--color-text-secondary`, `--step-*`, and `--border-width-*` custom properties, but **30+ components and pages still reference these deleted variables** in their `<style scoped>` blocks. While CSS fallback values (e.g., `var(--color-base-shade-10, #6b7280)`) prevent total breakage in light mode, the fallback colors are hardcoded hex values that will NOT adapt to dark mode (Rose Pine Moon). This means the dark theme is visually broken across most of the site.

## Findings

- **~60+ references** to `--color-base-shade-*`, `--color-base-tint-*`, `--color-text`, `--color-text-secondary`, `--color-text-muted`, `--step-*` across scoped styles
- Affected files include core pages and components:
  - `src/pages/index.vue` (14 references)
  - `src/pages/tags/index.vue` (8 references)
  - `src/pages/tags/[slug].vue` (10 references)
  - `src/pages/channels/[slug].vue` (3 references)
  - `src/pages/summaries/[slug].vue` (7 references)
  - `src/pages/playlists/[slug].vue` (7 references)
  - `src/components/content/SearchBar.vue` (10 references)
  - `src/components/content/SidebarNav.vue` (8 references)
  - `src/components/content/MobileNav.vue` (12 references)
  - `src/components/content/CategoryFilterBar.vue` (1 reference)
  - `src/components/content/DateGroupedFeed.vue` (4 references)
  - `src/components/content/SortControl.vue` (3 references)
  - `src/components/content/PageEmptyState.vue` (3 references)
  - `src/components/content/PageNotFound.vue` (3 references)
  - `src/components/content/SummaryCard.vue` (2 references)
  - `src/components/ds/molecules/ccmBreadcrumb.vue` (1 reference)
  - `src/components/ds/molecules/ccmFormField.vue` (2 references)
  - `src/components/custom/projectCard.vue` (1 reference to `--color-base-tint-60`)
  - `src/error.vue` (5 references)
- Hardcoded fallback values like `#6b7280`, `#e5e7eb`, `#374151` are light-mode only -- they do not change in `.dark` context
- The new Rose Pine theme defines semantic variables like `--foreground`, `--muted-foreground`, `--border` but existing components don't use them

## Proposed Solutions

### Option 1: Create a Token Compatibility Bridge

**Approach:** Add a compatibility layer in `tailwind.css` that maps old CUBE token names to new Rose Pine semantic variables for both light and dark modes.

**Pros:**
- Minimal file changes (one CSS file)
- Non-breaking: existing component styles continue working
- Dark mode works immediately across all components

**Cons:**
- Adds technical debt (bridge layer to eventually remove)
- May mask components that should be fully migrated

**Effort:** 1-2 hours

**Risk:** Low

---

### Option 2: Migrate All Components to Rose Pine Semantic Variables

**Approach:** Replace every `--color-base-*`, `--color-text`, `--step-*` reference with the corresponding Tailwind/Rose Pine variable (`--foreground`, `--muted-foreground`, `--border`, etc.) or Tailwind utility classes.

**Pros:**
- Clean, no legacy references
- Fully consistent with new system

**Cons:**
- Large scope (~30 files, ~60 replacements)
- Risk of visual regressions
- Should be a separate PR

**Effort:** 4-6 hours

**Risk:** Medium

## Recommended Action

## Technical Details

**Affected files:** See Findings section above for full list.

**Root cause:** The PR correctly deleted the CUBE token source files but did not migrate the consumers of those tokens.

## Resources

- **PR:** https://github.com/ccmdesign/ai-content-client/pull/6
- **Rose Pine color spec:** `src/assets/css/tailwind.css` lines 112-183

## Acceptance Criteria

- [ ] All pages render correctly in dark mode (Rose Pine Moon)
- [ ] No CSS custom property references resolve to `undefined` in either light or dark mode
- [ ] Text colors, border colors, and background colors adapt when toggling dark mode
- [ ] Visual regression check on all affected pages

## Work Log

### 2026-03-19 - Initial Discovery

**By:** Claude Code (PR Review)

**Actions:**
- Identified 60+ orphaned token references across 20+ files
- Confirmed fallback values are light-mode-only hardcoded hex colors
- Verified dark mode is visually broken due to missing variable definitions

**Learnings:**
- CUBE token deletion was not paired with consumer migration
- A compatibility bridge would be the fastest fix

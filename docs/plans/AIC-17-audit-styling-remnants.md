# AIC-17: Audit Components for Custom Styling Remnants

**Parent spec**: `_process/plans/shadcn-theme-reset.md` (Phases 3 + 4)
**Prerequisite**: AIC-16 (Rose Pine theme applied, CUBE layer system removed)
**Exit criteria**: Zero `--_ccm-*` vars, zero non-shadcn color vars, zero raw `oklch()` in components, `npm run build` passes

---

## Current State (audit results)

### 1. `--_ccm-*` custom properties (259 occurrences)

Every `src/components/ds/` component is built on the old CCM variable pattern. These are the heaviest files:

| Component | Approx. hits | Notes |
|---|---|---|
| `ds/molecules/ccmFormField.vue` | ~60 | Full form system: padding, color, border, focus, validation states |
| `ds/molecules/ccmChip.vue` | ~40 | Sizing, color, icon sizing, disabled state |
| `ds/molecules/ccmButton.vue` | ~40 | Size variants (xs/s/m/l), color variants (9 named colors), hover states |
| `ds/organisms/ccmHero.vue` | ~25 | Aspect ratio, padding, link colors, heading typography |
| `ds/organisms/ccmCard.vue` | ~20 | Padding, border, gap, bg color |
| `ds/organisms/ccmTable.vue` | ~20 | Color, thead/tbody bg, border, padding, radius |
| `ds/organisms/ccmFooter.vue` | ~10 | Padding + bg color |
| `ds/organisms/ccmSection.vue` | ~8 | Padding + bg color |
| `ds/molecules/ccmBreadcrumb.vue` | ~6 | Gap, separator color, item padding |
| `ds/molecules/ccmFormGroup.vue` | ~4 | Border-radius, padding, gap, bg |
| `custom/projectCard.vue` | ~4 | Card border color/width via `--_ccm-card-*` |

### 2. Non-shadcn `--color-*` vars (100+ occurrences)

Components reference old design-system color tokens that no longer exist:

- **`--color-primary`**, `--color-primary-tint-10/20/40/60/80`, `--color-primary-shade-10` -- used across 15+ files
- **`--color-secondary`**, `--color-base`**, `--color-accent`**, `--color-white`** -- used in button variants, card, docs components
- **`--color-neutral`**, `--color-neutral-tint-10`** -- used in ccmChip
- **`--color-success`**, `--color-fail`**, `--color-warning`**, `--color-info`** -- used in ccmButton, ccmFormField
- **`--color-surface`**, `--color-surface-alt`**, `--color-background`** -- used in pages & content components
- **`--color-code-*`** (background, text, keyword, property, string, comment, number, function, operator, punctuation) -- used in docs-code-block.vue

Note: The `@theme inline` block in `tailwind.css` maps `--color-primary` to `var(--primary)` etc., so some of these "accidentally work" for shadcn-named tokens. But tint/shade/surface/code vars have no definition and silently fail.

### 3. `--space-*` fluid spacing vars (250+ occurrences)

- **Composition CSS files** (`src/public/css/composition/`): Use `--space-*` internally for `data-space`/`data-padding`/`data-gap` attribute selectors. These are structural, not visual.
- **DS components** (ccmButton, ccmChip, ccmFormField, ccmCard, ccmHero, ccmFooter, ccmSection, ccmTable, ccmBreadcrumb, ccmTopbar): Use `--space-*` for sizing.
- **Content components** (11 files): Use `var(--space-*, fallback)` pattern in scoped `<style>`.
- **Page files** (6 files): Same `var(--space-*, fallback)` pattern.
- **`src/error.vue`**: Uses `--space-*` in scoped styles.

### 4. `--size-*` / `--font-*` / `--border-radius-*` / `--link-color*` vars

- `--size-*` (fluid type scale): Used in ~40 places across pages, content components, and DS components.
- `--font-family-body`, `--font-family-mono`: Used in ccmButton, ccmChip, ccmFormField, docs components.
- `--font-weight-bold/medium/semibold/normal`: Used in ~20 places.
- `--border-radius-s/m/l/sm/md`: Used in ~10 places.
- `--link-color`, `--link-color-visited`: Used in ccmByLine, ccmTopbar, ccmHero.

### 5. `data-space` attributes in Vue templates

No `data-space`, `data-padding`, `data-gap`, or `data-margin` attributes found in `.vue` files. Usage is confined to composition CSS definitions only.

### 6. `tag-chip` usage

No references to `tag-chip` found anywhere in `src/`. Already cleaned up.

### 7. Raw `oklch()` in components

All `oklch()` usage is confined to `tailwind.css` theme variable declarations (`:root` and `.dark` blocks). This is correct -- no raw `oklch()` in component files.

---

## Plan

### Step 1: Decide on Utopia fluid spacing (decision required before implementation)

**Recommendation: Remove Utopia, use standard Tailwind spacing.**

Rationale:
- The `--space-*` vars add 27 custom properties (base + one-up + custom pairs) that duplicate what Tailwind spacing utilities already provide.
- Every `var(--space-*, fallback)` usage in content/page components already includes a standard CSS fallback value, making the migration straightforward.
- The composition primitives can be updated to use fixed spacing defaults or Tailwind's spacing scale.

**If keeping**: Skip Step 3 below and instead just remove the `@theme` remapping. Leave the `--space-*` definitions in `tailwind.css` as plain CSS vars.

### Step 2: Replace `--_ccm-*` and old color vars in DS components

Process each DS component, converting scoped `<style>` from the CCM custom-property pattern to Tailwind utility classes and shadcn tokens.

**Priority order** (most impactful first):

1. **ccmButton.vue** -- Replace with shadcn `Button` component or convert to Tailwind classes using `bg-primary`, `text-primary-foreground`, etc. Map the 9 named color variants to shadcn variants (primary, secondary, destructive, outline, ghost).
2. **ccmCard.vue** -- Replace with shadcn `Card` + `CardHeader`/`CardContent`/`CardFooter`. Use `bg-card text-card-foreground border-border rounded-lg`.
3. **ccmFormField.vue** -- Replace with shadcn `Input`/`Label` or convert custom properties to Tailwind (`border-input`, `bg-background`, `text-foreground`, `focus-visible:ring-ring`).
4. **ccmChip.vue** -- Replace with shadcn `Badge`. Map variants to `default`/`secondary`/`destructive`/`outline`.
5. **ccmTable.vue** -- Replace with shadcn `Table`/`TableHeader`/`TableBody`/`TableRow`/`TableCell`. Use `bg-muted` for headers.
6. **ccmHero.vue** -- Convert to Tailwind classes: `bg-muted py-8 lg:py-16`. Remove aspect-ratio CSS var.
7. **ccmFooter.vue** -- Convert to `bg-muted py-8`. Remove size-attribute selectors.
8. **ccmSection.vue** -- Convert to `bg-transparent py-8`. Use Tailwind padding classes.
9. **ccmBreadcrumb.vue** -- Replace with shadcn `Breadcrumb` component.
10. **ccmFormGroup.vue** -- Convert to Tailwind classes.
11. **ccmByLine.vue** -- Replace `--link-color` with `text-primary`.
12. **ccmTopbar.vue** -- Replace `--link-color` with `text-primary`, `--space-xs` with `py-2`.
13. **ccmTabs.vue** -- Inspect and convert if needed.

### Step 3: Replace `--space-*` and `--size-*` in content components and pages

For each file, replace `var(--space-*, fallback)` with the Tailwind utility equivalent.

**Mapping table** (approximate):

| Utopia var | Tailwind class |
|---|---|
| `--space-3xs` (~4px) | `1` (0.25rem) |
| `--space-2xs` (~6px) | `1.5` (0.375rem) |
| `--space-xs` (~11px) | `2.5` or `3` |
| `--space-s` (~14px) | `3.5` or `4` |
| `--space-m` (~21px) | `5` |
| `--space-l` (~28px) | `7` or `8` |
| `--space-xl` (~42px) | `10` or `11` |
| `--space-2xl` (~56px) | `14` |
| `--space-3xl` (~84px) | `20` or `24` |

For `--size-*` (fluid type scale), replace with Tailwind `text-*` utilities:

| Utopia var | Tailwind class |
|---|---|
| `--size--2` (~9px) | `text-xs` |
| `--size--1` (~11px) | `text-sm` |
| `--size-0` (~12-18px) | `text-base` |
| `--size-1` (~14-22px) | `text-lg` |
| `--size-2` (~15-26px) | `text-xl` |
| `--size-3` (~17-31px) | `text-2xl` |
| `--size-4` (~19-37px) | `text-3xl` |
| `--size-5` (~22-45px) | `text-4xl` |

**Files to update** (19 total):
- `src/pages/index.vue`
- `src/pages/channels/[slug].vue`
- `src/pages/summaries/[slug].vue`
- `src/pages/tags/[slug].vue`
- `src/pages/tags/index.vue`
- `src/pages/playlists/[slug].vue`
- `src/error.vue`
- `src/components/content/CategoryFilterBar.vue`
- `src/components/content/DateGroupedFeed.vue`
- `src/components/content/MobileNav.vue`
- `src/components/content/PageEmptyState.vue`
- `src/components/content/PageNotFound.vue`
- `src/components/content/SearchBar.vue`
- `src/components/content/SidebarNav.vue`
- `src/components/content/SortControl.vue`
- `src/components/content/SummaryCard.vue`
- `src/components/content/docs-code-block.vue`
- `src/components/content/docs-props-table.vue`
- `src/components/custom/projectCard.vue`

For each file:
1. Move spacing/sizing from scoped `<style>` CSS to Tailwind utility classes in `<template>`.
2. Replace `var(--color-primary, #...)` with `text-primary` / `bg-primary` etc.
3. Replace `var(--color-surface, #...)` with `bg-background` or `bg-card`.
4. Replace `var(--color-border, #...)` with `border-border`.

### Step 4: Update composition primitives for spacing source

If removing Utopia:
- Update each composition CSS file in `src/public/css/composition/` to use fixed `rem` defaults instead of `var(--space-*)`.
- The `data-space` / `data-padding` / `data-gap` attribute selectors in composition files can stay (they are part of the composition primitive API), but their values should use `rem` instead of `var(--space-*)`.
- Alternatively, simplify defaults to use Tailwind's spacing scale via `calc()` or plain rem values.

If keeping Utopia:
- Leave composition files as-is (they work correctly today).

### Step 5: Remove Utopia definitions from `tailwind.css` (if removing)

- Delete the entire `--space-*` block (lines 41-66 of `tailwind.css`).
- Delete the `--size-*` block (lines 31-38 of `tailwind.css`).
- Remove `--font-family-*`, `--font-weight-*`, `--border-radius-*`, `--link-color*` if they are defined elsewhere and no longer referenced.

### Step 6: Clean up remaining token vars

Remove any remaining references to undefined CSS custom properties:
- `--font-family-body` / `--font-family-mono` -> Use Tailwind `font-sans` / `font-mono`
- `--font-weight-bold/medium/semibold/normal` -> Use Tailwind `font-bold` / `font-medium` / `font-semibold` / `font-normal`
- `--border-radius-s/m/l/sm/md` -> Use Tailwind `rounded-sm` / `rounded-md` / `rounded-lg`
- `--link-color` / `--link-color-visited` -> Use `text-primary` / `hover:text-primary/80`
- `--color-code-*` vars -> Define in `tailwind.css` theme or replace with shadcn tokens

### Step 7: Validate and build

1. `npm run build` -- must pass cleanly
2. Visual spot-check in dev mode (light + dark)
3. Grep for any remaining `var(--_ccm-`, `var(--color-primary-tint`, `var(--space-`, `var(--size-` to confirm zero hits outside of composition CSS (if Utopia kept) or zero hits total (if Utopia removed)

---

## Open Questions for Implementer

1. **Utopia keep/remove?** The plan recommends removing it. If the team wants fluid scaling between breakpoints, keep it and skip Steps 3/5. Either way, the composition primitives need their `data-*` attribute spacing to resolve.

2. **DS component fate**: Should the `src/components/ds/` components be rewritten to wrap shadcn primitives (Button, Card, Badge, Table, Input, Breadcrumb), or should they be converted in-place to use Tailwind classes while keeping the same API? Wrapping shadcn is cleaner but changes component APIs. Converting in-place preserves the existing prop interface.

3. **`--color-code-*` vars**: The `docs-code-block.vue` component uses 10 syntax-highlighting color tokens. These need to be either (a) defined as new CSS vars in tailwind.css mapping to Rose Pine syntax colors, or (b) replaced with a Shiki/Prism theme that matches Rose Pine. Decide which approach.

4. **Composition primitives long-term**: The spec says composition classes are fine to keep. But they internally depend on `--space-*` vars. If Utopia is removed, the composition files need updating. Should this be done in AIC-17 or deferred?

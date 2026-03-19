# AIC-17: Audit Components for Custom Styling Remnants

**Parent spec**: `_process/plans/shadcn-theme-reset.md` (Phases 3 + 4)
**Prerequisite**: AIC-16 (Rose Pine theme applied, CUBE layer system removed)
**Exit criteria**: Zero `--_ccm-*` vars, zero non-shadcn color vars, zero raw `oklch()` in components, `npm run build` passes

## Enhancement Summary

**Deepened on:** 2026-03-19
**Sections enhanced:** 7 plan steps + 4 open questions
**Research sources:** shadcn-vue v4 theming docs, Tailwind CSS v4 migration guides, CUBE CSS + Tailwind integration patterns, accessibility (WCAG 2.1) guidelines, Vue 3.5 best practices, Nuxt 4 patterns

### Key Improvements
1. Added concrete shadcn-vue CSS variable contract (the exact `--background`, `--primary`, etc. vars the components expect), ensuring Rose Pine values map correctly and no silent fallback failures occur
2. Identified critical risk: composition primitives (`stack.css`, `cluster.css`, etc.) use `--space-*` as internal defaults with `data-space` attribute overrides -- removing Utopia requires updating 11 composition files AND verifying no Vue template uses `data-space` attributes dynamically via `:data-space` bindings
3. Added accessibility regression checklist for each DS component migration (focus rings, ARIA labels, color contrast, keyboard navigation) since shadcn-vue components have built-in a11y that the CCM components may lack
4. Resolved Open Question 3: Rose Pine has an official Shiki theme (`rose-pine` and `rose-pine-dawn`) that should be used instead of manual `--color-code-*` CSS variables
5. Added rollback strategy and per-component validation gates to prevent shipping partially-migrated components

### New Considerations Discovered
- The `@theme inline` block creates an alias layer (`--color-primary` -> `var(--primary)`) that makes some old CCM references "accidentally work" -- these must be identified and fixed before removing the alias layer, or the removal will cause silent visual regressions
- ccmButton.vue (391 lines) and ccmFormField.vue (480 lines) are large enough to warrant splitting into smaller components during migration rather than 1:1 conversion
- The `shadcn-nuxt` package (v2.4.3) is already installed, meaning shadcn-vue components can be added via CLI (`npx shadcn-vue@latest add button`) without additional setup

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

### Research Insights

**Best Practices:**
- When migrating from custom CSS variable patterns to Tailwind utility classes, the recommended approach is to work component-by-component with visual regression testing at each step, rather than batch-replacing variables across the codebase
- Tailwind CSS v4 uses `@theme inline` to expose CSS custom properties as Tailwind tokens -- every design token in `@theme` automatically generates corresponding utility classes (`bg-primary`, `text-muted-foreground`, etc.), eliminating the need for both a CSS variable AND a utility class

**Performance Considerations:**
- Removing 259 `--_ccm-*` custom property declarations will reduce CSS parse time and slightly improve CSSOM construction, particularly on mobile devices
- Moving from scoped `<style>` CSS variables to Tailwind utility classes enables better tree-shaking and smaller production CSS bundles

**Edge Cases:**
- Components that use `var(--_ccm-*, fallback)` with fallback values will silently degrade rather than break -- search for these to ensure visual consistency is maintained during migration
- Some CCM variables may be set via JavaScript (`:style` bindings in Vue templates) -- these need different treatment than pure CSS replacements

### 2. Non-shadcn `--color-*` vars (100+ occurrences)

Components reference old design-system color tokens that no longer exist:

- **`--color-primary`**, `--color-primary-tint-10/20/40/60/80`, `--color-primary-shade-10` -- used across 15+ files
- **`--color-secondary`**, `--color-base`**, `--color-accent`**, `--color-white`** -- used in button variants, card, docs components
- **`--color-neutral`**, `--color-neutral-tint-10`** -- used in ccmChip
- **`--color-success`**, `--color-fail`**, `--color-warning`**, `--color-info`** -- used in ccmButton, ccmFormField
- **`--color-surface`**, `--color-surface-alt`**, `--color-background`** -- used in pages & content components
- **`--color-code-*`** (background, text, keyword, property, string, comment, number, function, operator, punctuation) -- used in docs-code-block.vue

Note: The `@theme inline` block in `tailwind.css` maps `--color-primary` to `var(--primary)` etc., so some of these "accidentally work" for shadcn-named tokens. But tint/shade/surface/code vars have no definition and silently fail.

### Research Insights

**shadcn-vue CSS Variable Contract:**
The shadcn-vue theming system expects exactly these CSS variables (all in OKLCH color space):

| Variable | Purpose | Tailwind utility |
|---|---|---|
| `--background` / `--foreground` | Page background and text | `bg-background`, `text-foreground` |
| `--card` / `--card-foreground` | Card surfaces | `bg-card`, `text-card-foreground` |
| `--primary` / `--primary-foreground` | Primary actions | `bg-primary`, `text-primary-foreground` |
| `--secondary` / `--secondary-foreground` | Secondary actions | `bg-secondary`, `text-secondary-foreground` |
| `--muted` / `--muted-foreground` | Muted/disabled | `bg-muted`, `text-muted-foreground` |
| `--accent` / `--accent-foreground` | Hover/highlight | `bg-accent`, `text-accent-foreground` |
| `--destructive` / `--destructive-foreground` | Danger actions | `bg-destructive`, `text-destructive-foreground` |
| `--border` | Borders | `border-border` |
| `--input` | Input borders | `border-input` |
| `--ring` | Focus rings | `ring-ring` |

**Mapping old CCM semantics to shadcn semantics:**
| Old CCM token | shadcn equivalent |
|---|---|
| `--color-success` | Define as `--success` in `:root` + `@theme inline`, or use `text-emerald-600 dark:text-emerald-400` |
| `--color-fail` | `--destructive` / `bg-destructive` |
| `--color-warning` | Define as `--warning` in `:root` + `@theme inline`, or use `text-amber-600 dark:text-amber-400` |
| `--color-info` | Define as `--info` in `:root` + `@theme inline`, or use `text-blue-600 dark:text-blue-400` |
| `--color-neutral` | `--muted` / `bg-muted` |
| `--color-surface` | `--card` or `--background` |
| `--color-surface-alt` | `--muted` / `bg-muted` |
| `--color-primary-tint-*` | Use `bg-primary/10`, `bg-primary/20`, etc. (opacity modifiers) |

**Risk: The `@theme inline` alias layer creates false positives.** Components using `var(--color-primary)` appear to work because `@theme inline` maps `--color-primary` to `var(--primary)`. But this is fragile -- if the `@theme inline` block is cleaned up (as it should be), these references will break. Audit each `var(--color-primary)` usage and replace with the Tailwind utility class directly.

### 3. `--space-*` fluid spacing vars (250+ occurrences)

- **Composition CSS files** (`src/public/css/composition/`): Use `--space-*` internally for `data-space`/`data-padding`/`data-gap` attribute selectors. These are structural, not visual.
- **DS components** (ccmButton, ccmChip, ccmFormField, ccmCard, ccmHero, ccmFooter, ccmSection, ccmTable, ccmBreadcrumb, ccmTopbar): Use `--space-*` for sizing.
- **Content components** (11 files): Use `var(--space-*, fallback)` pattern in scoped `<style>`.
- **Page files** (6 files): Same `var(--space-*, fallback)` pattern.
- **`src/error.vue`**: Uses `--space-*` in scoped styles.

### Research Insights

**CUBE CSS Composition Primitives and Tailwind Coexistence:**
- Andy Bell (CUBE CSS creator) has explicitly endorsed using Tailwind as the "U" (Utilities) layer in CUBE CSS. The composition primitives (stack, cluster, grid, etc.) operate at a different abstraction level than Tailwind utilities and can coexist
- The 11 composition files (`box.css`, `center.css`, `cluster.css`, `container.css`, `cover.css`, `frame.css`, `grid.css`, `imposter.css`, `reel.css`, `stack.css`, `switcher.css`) are structural layout primitives -- they control spatial relationships, not visual design. They are worth keeping even after removing Utopia
- The `data-space` attribute selectors in composition files provide a clean API for controlling spacing from HTML attributes. Converting these to use fixed `rem` values is straightforward

**Composition Primitive Migration Detail:**
Each composition file follows the same pattern (example from `stack.css`):
```css
.stack { --_stack-space: var(--theme-stack-space, var(--space-s)); }
.stack[data-space="xs"] { --_stack-space: var(--space-xs); }
```

To remove Utopia dependency, replace with:
```css
.stack { --_stack-space: var(--theme-stack-space, 0.875rem); } /* ~14px, was --space-s */
.stack[data-space="xs"] { --_stack-space: 0.6875rem; } /* ~11px, was --space-xs */
```

**Critical check:** Verify no Vue templates use dynamic `:data-space` bindings that reference Utopia variable names at runtime.

### 4. `--size-*` / `--font-*` / `--border-radius-*` / `--link-color*` vars

- `--size-*` (fluid type scale): Used in ~40 places across pages, content components, and DS components.
- `--font-family-body`, `--font-family-mono`: Used in ccmButton, ccmChip, ccmFormField, docs components.
- `--font-weight-bold/medium/semibold/normal`: Used in ~20 places.
- `--border-radius-s/m/l/sm/md`: Used in ~10 places.
- `--link-color`, `--link-color-visited`: Used in ccmByLine, ccmTopbar, ccmHero.

### Research Insights

**Font handling in Tailwind v4:**
- The project already imports Geist Sans/Mono via `@fontsource` and maps them in `@theme inline` as `--font-sans` and `--font-mono`. This means `font-sans` and `font-mono` utility classes already resolve correctly
- All `--font-family-body` references should map to `font-sans` and `--font-family-mono` to `font-mono`

**Border radius in shadcn-vue:**
- shadcn-vue uses a single `--radius` variable (currently `0.5rem`) with computed variants: `--radius-sm` = `calc(var(--radius) - 4px)`, `--radius-md` = `calc(var(--radius) - 2px)`, `--radius-lg` = `var(--radius)`, `--radius-xl` = `calc(var(--radius) + 4px)`
- Map old tokens: `--border-radius-s` -> `rounded-sm`, `--border-radius-m`/`--border-radius-md` -> `rounded-md`, `--border-radius-l`/`--border-radius-lg` -> `rounded-lg`

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

### Research Insights

**Best Practices:**
- Tailwind CSS v4 natively supports CSS custom properties as theme tokens via `@theme`. If fluid spacing is desired later, it can be reintroduced as a Tailwind plugin (`@domchristie/tailwind-utopia`) that generates Tailwind utility classes from Utopia scales, rather than raw CSS variables -- this gives the best of both worlds
- The `clamp()` approach Utopia uses works well for typography but is overkill for spacing in most component UIs. Tailwind's responsive variants (`py-4 md:py-6 lg:py-8`) are more explicit and debuggable
- If removing Utopia, keep the composition primitives but with fixed `rem` defaults. The primitives are valuable layout abstractions independent of the spacing scale

**Performance Considerations:**
- Removing 27 Utopia custom properties from `:root` eliminates unnecessary CSSOM entries and reduces the cascade complexity
- Fixed `rem` values in composition primitives are cheaper to compute than `clamp()` expressions, marginally improving layout performance on low-end devices

**Edge Cases:**
- The "one-up pairs" (`--space-3xs-2xs`, `--space-2xs-xs`, etc.) and "custom pairs" (`--space-s-l`, `--space-s-xl`, etc.) are not standard Utopia -- verify none of these are referenced in components before deleting
- If any component relies on the fluid scaling behavior (i.e., spacing that smoothly interpolates between viewport sizes), switching to fixed `rem` will cause a subtle layout change at intermediate viewport widths. Test at 768px, 1024px, and 1280px specifically

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

### Research Insights

**Best Practices:**
- **Wrap vs. Replace decision:** Since `shadcn-nuxt` (v2.4.3) is already installed, use the CLI to scaffold shadcn components (`npx shadcn-vue@latest add button badge card table input breadcrumb`). Then create thin wrapper components that preserve the existing `ccm*` prop interface while delegating to shadcn internals. This avoids breaking consumer code while getting shadcn's built-in accessibility
- **Variant mapping strategy:** The 9 CCM color variants should collapse to shadcn's 6 variants. Map `primary` -> `default`, `secondary` -> `secondary`, `danger/error` -> `destructive`, `ghost` -> `ghost`, `outline` -> `outline`. For color variants like `success`, `warning`, `info` -- extend shadcn's `buttonVariants` using `cva()` with custom classes
- **Component size:** ccmButton.vue (391 lines) and ccmFormField.vue (480 lines) exceed the 300-line threshold for Vue component splitting. Consider breaking ccmFormField into separate `FormLabel`, `FormInput`, `FormValidation` components during migration

**Accessibility Regression Checklist (per component):**
- [ ] Focus ring visible on keyboard navigation (`focus-visible:ring-ring`)
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] Interactive elements have minimum 44x44px touch targets
- [ ] `aria-label` or visible text on icon-only buttons
- [ ] `aria-invalid="true"` and `aria-describedby` on form validation states
- [ ] `prefers-reduced-motion` respected for any hover/transition animations
- [ ] Disabled states use `aria-disabled` not just visual opacity

**shadcn-vue Button variant setup:**
```typescript
// Extend shadcn buttonVariants for semantic colors not in default set
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Extended: semantic colors from old CCM system
        success: 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600',
        warning: 'bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-400 dark:text-black dark:hover:bg-amber-500',
        info: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 px-2 text-xs rounded',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)
```

**Edge Cases:**
- ccmButton's 9 color variants may include colors not in shadcn's semantic set. Before removing, grep all consumer files for each variant name to confirm which are actually used
- ccmFormField's validation states (success, error, warning) need visual indicators beyond color alone (icons, border patterns) per WCAG 1.4.1
- ccmTable may use sticky headers (`position: sticky`) via CSS vars -- ensure this behavior is preserved in the shadcn Table migration
- projectCard.vue references `--_ccm-card-*` variables -- update after ccmCard is migrated

**Migration gate per component:**
After each component migration, run this validation:
1. `npm run build` passes
2. No `--_ccm-` references remain in the migrated file
3. Visual comparison in light + dark mode at 375px, 768px, 1440px
4. Keyboard navigation test (Tab, Enter, Escape)

### Step 3: Replace `--space-*` and `--size-*` in content components and pages

For each file, replace `var(--space-*, fallback)` with the Tailwind utility equivalent.

**Mapping table** (approximate):

| Utopia var | Tailwind class | Computed value |
|---|---|---|
| `--space-3xs` (~4px) | `1` (0.25rem) | 4px |
| `--space-2xs` (~6px) | `1.5` (0.375rem) | 6px |
| `--space-xs` (~11px) | `2.5` or `3` | 10-12px |
| `--space-s` (~14px) | `3.5` or `4` | 14-16px |
| `--space-m` (~21px) | `5` | 20px |
| `--space-l` (~28px) | `7` or `8` | 28-32px |
| `--space-xl` (~42px) | `10` or `11` | 40-44px |
| `--space-2xl` (~56px) | `14` | 56px |
| `--space-3xl` (~84px) | `20` or `24` | 80-96px |

For `--size-*` (fluid type scale), replace with Tailwind `text-*` utilities:

| Utopia var | Tailwind class | Computed range |
|---|---|---|
| `--size--2` (~9px) | `text-xs` | 12px (0.75rem) |
| `--size--1` (~11px) | `text-sm` | 14px (0.875rem) |
| `--size-0` (~12-18px) | `text-base` | 16px (1rem) |
| `--size-1` (~14-22px) | `text-lg` | 18px (1.125rem) |
| `--size-2` (~15-26px) | `text-xl` | 20px (1.25rem) |
| `--size-3` (~17-31px) | `text-2xl` | 24px (1.5rem) |
| `--size-4` (~19-37px) | `text-3xl` | 30px (1.875rem) |
| `--size-5` (~22-45px) | `text-4xl` | 36px (2.25rem) |

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

### Research Insights

**Best Practices:**
- When moving CSS from scoped `<style>` to Tailwind utilities in `<template>`, prefer `class` bindings over `:class` computed objects when the classes are static. Use conditional `:class` only for dynamic state (hover states are handled by Tailwind pseudo-classes like `hover:bg-accent`)
- For `var(--space-*, fallback)` patterns, the fallback value IS the correct migration target -- it was the intended value all along, just with a fluid override. This makes migration mechanical and low-risk
- Use Tailwind's responsive variants for layout-sensitive spacing: `py-4 md:py-6 lg:py-8` replaces the fluid interpolation behavior of Utopia at the specific breakpoints that matter

**Performance Considerations:**
- Moving 19 files from scoped CSS to Tailwind utilities reduces the total number of `<style>` blocks Nuxt needs to process during SSR, slightly improving initial page load
- Tailwind v4 with the Rust-based Oxide engine handles utility class generation significantly faster than Tailwind v3, so adding more utility classes has negligible build-time impact

**Edge Cases:**
- `docs-code-block.vue` uses 10 `--color-code-*` tokens that have NO shadcn equivalent. These need special handling (see Step 6)
- `SummaryCard.vue` and `projectCard.vue` may use spacing vars in computed styles (`:style` bindings) -- these cannot be replaced with Tailwind classes and need inline `rem` values instead
- Some content components may use `var(--space-*)` in `calc()` expressions (e.g., `calc(100% - var(--space-m))`) -- these need case-by-case replacement with fixed values

### Step 4: Update composition primitives for spacing source

If removing Utopia:
- Update each composition CSS file in `src/public/css/composition/` to use fixed `rem` defaults instead of `var(--space-*)`.
- The `data-space` / `data-padding` / `data-gap` attribute selectors in composition files can stay (they are part of the composition primitive API), but their values should use `rem` instead of `var(--space-*)`.
- Alternatively, simplify defaults to use Tailwind's spacing scale via `calc()` or plain rem values.

If keeping Utopia:
- Leave composition files as-is (they work correctly today).

### Research Insights

**Best Practices:**
- Keep the composition primitives. They operate at a structural level (controlling flex/grid layout relationships) that Tailwind utilities don't fully replace. Andy Bell's CUBE CSS model explicitly supports Tailwind as the utility layer alongside composition primitives
- Convert `data-space` attribute selectors to use Tailwind's spacing scale in `rem`:

| `data-space` value | Old `var(--space-*)` | New fixed `rem` |
|---|---|---|
| `3xs` | `var(--space-3xs)` | `0.25rem` |
| `2xs` | `var(--space-2xs)` | `0.375rem` |
| `xs` | `var(--space-xs)` | `0.6875rem` |
| `s` | `var(--space-s)` | `0.875rem` |
| `m` | `var(--space-m)` | `1.3125rem` |
| `l` | `var(--space-l)` | `1.75rem` |
| `xl` | `var(--space-xl)` | `2.625rem` |
| `2xl` | `var(--space-2xl)` | `3.5rem` |
| `3xl` | `var(--space-3xl)` | `5.25rem` |

Note: These values are the `clamp()` minimum values from the Utopia definitions. Using the minimums ensures no element is ever too large; responsive adjustments can be layered via Tailwind breakpoint utilities.

**Files to update** (11 composition primitives):
1. `src/public/css/composition/box.css`
2. `src/public/css/composition/center.css`
3. `src/public/css/composition/cluster.css`
4. `src/public/css/composition/container.css`
5. `src/public/css/composition/cover.css`
6. `src/public/css/composition/frame.css`
7. `src/public/css/composition/grid.css`
8. `src/public/css/composition/imposter.css`
9. `src/public/css/composition/reel.css`
10. `src/public/css/composition/stack.css`
11. `src/public/css/composition/switcher.css`

**Edge Cases:**
- Some composition files may reference `--theme-*-space` variables (e.g., `var(--theme-stack-space, var(--space-s))`) that allow component-level override. These `--theme-*` vars should be preserved as the override mechanism, but the fallback should change from `var(--space-s)` to `0.875rem`
- Verify that no external CSS or third-party module references these composition classes with `data-space` attributes

### Step 5: Remove Utopia definitions from `tailwind.css` (if removing)

- Delete the entire `--space-*` block (lines 31-66 of `tailwind.css`).
- Delete the `--size-*` block (lines 31-38 of `tailwind.css`).
- Remove `--font-family-*`, `--font-weight-*`, `--border-radius-*`, `--link-color*` if they are defined elsewhere and no longer referenced.

### Research Insights

**Best Practices:**
- In Tailwind CSS v4, the `@layer base` block is the correct place for `:root` variable definitions. When removing Utopia vars, do NOT remove the `@layer base` block itself -- it's still needed for the `* { @apply border-border outline-ring/50; }` and `body { @apply bg-background text-foreground; }` rules
- After removing the Utopia block, run `npx tailwindcss --help` to verify the Tailwind build still produces output (no missing variable references)

**Deletion checklist:**
- [ ] `--size--2` through `--size-5` (8 vars) -- type scale
- [ ] `--space-3xs` through `--space-3xl` (9 vars) -- base spacing
- [ ] `--space-3xs-2xs` through `--space-2xl-3xl` (8 vars) -- one-up pairs
- [ ] `--space-s-l`, `--space-s-xl`, `--space-m-3xl`, `--space-xs-m`, `--space-xs-l` (5 vars) -- custom pairs
- [ ] Confirm NO references remain in any `.vue`, `.css`, or `.ts` file after deletion

### Step 6: Clean up remaining token vars

Remove any remaining references to undefined CSS custom properties:
- `--font-family-body` / `--font-family-mono` -> Use Tailwind `font-sans` / `font-mono`
- `--font-weight-bold/medium/semibold/normal` -> Use Tailwind `font-bold` / `font-medium` / `font-semibold` / `font-normal`
- `--border-radius-s/m/l/sm/md` -> Use Tailwind `rounded-sm` / `rounded-md` / `rounded-lg`
- `--link-color` / `--link-color-visited` -> Use `text-primary` / `hover:text-primary/80`
- `--color-code-*` vars -> Define in `tailwind.css` theme or replace with shadcn tokens

### Research Insights

**`--color-code-*` resolution (answers Open Question 3):**
Rose Pine has official Shiki themes: `rose-pine` (dark) and `rose-pine-dawn` (light). Since Nuxt Content uses Shiki for code highlighting, the recommended approach is:

1. Install the Rose Pine Shiki theme (already bundled with Shiki since v0.14)
2. Configure in `nuxt.config.ts`:
```typescript
content: {
  highlight: {
    theme: {
      default: 'rose-pine-dawn',
      dark: 'rose-pine',
    },
  },
}
```
3. Remove all 10 `--color-code-*` CSS variables from `docs-code-block.vue`
4. Remove any custom syntax highlighting CSS that referenced those variables

This is cleaner than maintaining 10 hand-mapped color variables and guarantees visual consistency with the Rose Pine theme.

**Semantic color tokens to add to `tailwind.css`:**
If components need `success`, `warning`, and `info` semantics beyond what shadcn provides, add these to the `:root` / `.dark` blocks and the `@theme inline` block:

```css
/* In :root (Rose Pine Dawn) */
--success: oklch(0.58 0.12 156.71);
--success-foreground: oklch(1 0 0);
--warning: oklch(0.75 0.12 85.46);
--warning-foreground: oklch(0.24 0.025 277.57);
--info: oklch(0.7 0.11 220.08);
--info-foreground: oklch(1 0 0);

/* In .dark (Rose Pine Moon) */
--success: oklch(0.72 0.1 156.71);
--success-foreground: oklch(0.24 0.025 277.57);
--warning: oklch(0.75 0.12 85.46);
--warning-foreground: oklch(0.24 0.025 277.57);
--info: oklch(0.77 0.1 220.08);
--info-foreground: oklch(0.24 0.025 277.57);

/* In @theme inline */
--color-success: var(--success);
--color-success-foreground: var(--success-foreground);
--color-warning: var(--warning);
--color-warning-foreground: var(--warning-foreground);
--color-info: var(--info);
--color-info-foreground: var(--info-foreground);
```

### Step 7: Validate and build

1. `npm run build` -- must pass cleanly
2. Visual spot-check in dev mode (light + dark)
3. Grep for any remaining `var(--_ccm-`, `var(--color-primary-tint`, `var(--space-`, `var(--size-` to confirm zero hits outside of composition CSS (if Utopia kept) or zero hits total (if Utopia removed)

### Research Insights

**Expanded Validation Checklist:**
1. **Build validation:**
   - `npm run build` passes cleanly
   - `npm run typecheck` passes (no type errors from removed props)
   - `npm run lint:css` passes (no stylelint errors from new patterns)

2. **Visual regression testing (manual):**
   - Light mode: check all pages at 375px, 768px, 1440px
   - Dark mode: same breakpoints
   - High contrast mode (Windows) or increased contrast (macOS Accessibility)
   - 200% browser zoom (WCAG 1.4.4)

3. **Accessibility validation:**
   - Keyboard-only navigation through all interactive components
   - Check focus ring visibility (`focus-visible:ring-ring`)
   - Verify no color-only indicators (WCAG 1.4.1)
   - Run Lighthouse accessibility audit (target score >= 90)
   - Check `prefers-reduced-motion` disables transitions

4. **CSS remnant grep (zero-hit targets):**
   ```bash
   # Must return zero results:
   grep -r "var(--_ccm-" src/ --include="*.vue" --include="*.css"
   grep -r "var(--color-primary-tint" src/ --include="*.vue" --include="*.css"
   grep -r "var(--color-primary-shade" src/ --include="*.vue" --include="*.css"
   grep -r "var(--color-surface" src/ --include="*.vue" --include="*.css"
   grep -r "var(--color-neutral" src/ --include="*.vue" --include="*.css"
   grep -r "var(--color-code-" src/ --include="*.vue" --include="*.css"
   grep -r "var(--font-family-body" src/ --include="*.vue" --include="*.css"
   grep -r "var(--font-weight-" src/ --include="*.vue" --include="*.css"
   grep -r "var(--border-radius-" src/ --include="*.vue" --include="*.css"
   grep -r "var(--link-color" src/ --include="*.vue" --include="*.css"
   # If Utopia removed, also:
   grep -r "var(--space-" src/ --include="*.vue" --include="*.css"
   grep -r "var(--size-" src/ --include="*.vue" --include="*.css"
   ```

5. **Rollback plan:**
   - Each step should be a separate git commit so individual steps can be reverted
   - Tag the pre-migration state: `git tag pre-aic-17-migration`

---

## Open Questions for Implementer

1. **Utopia keep/remove?** The plan recommends removing it. If the team wants fluid scaling between breakpoints, keep it and skip Steps 3/5. Either way, the composition primitives need their `data-*` attribute spacing to resolve.

   > **Research insight:** If fluid spacing is desired later, use the `@domchristie/tailwind-utopia` plugin which generates proper Tailwind utility classes from Utopia scales, giving you both fluid spacing AND Tailwind's class-based API. This is a better architecture than raw CSS variables.

2. **DS component fate**: Should the `src/components/ds/` components be rewritten to wrap shadcn primitives (Button, Card, Badge, Table, Input, Breadcrumb), or should they be converted in-place to use Tailwind classes while keeping the same API? Wrapping shadcn is cleaner but changes component APIs. Converting in-place preserves the existing prop interface.

   > **Research insight:** The recommended approach is a **thin wrapper pattern**: scaffold shadcn components via CLI, then create `ccmButton.vue` as a wrapper that maps old props to shadcn's `variant`/`size` props internally. This preserves the consumer API while getting shadcn's accessibility and styling. Over time, consumers can migrate to import shadcn components directly, and the wrappers can be deprecated. This is the lowest-risk path for a production codebase.

3. **`--color-code-*` vars**: The `docs-code-block.vue` component uses 10 syntax-highlighting color tokens. These need to be either (a) defined as new CSS vars in tailwind.css mapping to Rose Pine syntax colors, or (b) replaced with a Shiki/Prism theme that matches Rose Pine. Decide which approach.

   > **Resolved:** Use Shiki's built-in `rose-pine` and `rose-pine-dawn` themes. They are bundled with Shiki and require only a Nuxt Content config change. This eliminates the need for 10 manual CSS variables and ensures syntax highlighting is visually consistent with the Rose Pine theme system. See Step 6 research insights for implementation details.

4. **Composition primitives long-term**: The spec says composition classes are fine to keep. But they internally depend on `--space-*` vars. If Utopia is removed, the composition files need updating. Should this be done in AIC-17 or deferred?

   > **Research insight:** Do it in AIC-17. The composition primitive update is mechanical (replace `var(--space-*)` with fixed `rem` values in 11 files) and takes ~30 minutes. Deferring creates a fragile state where composition primitives reference undefined variables. The mapping table in Step 4 research insights provides exact replacement values.

---

## References

- [Tailwind CSS v4 Migration Best Practices](https://www.digitalapplied.com/blog/tailwind-css-v4-2026-migration-best-practices)
- [Tailwind CSS v4 Custom Styles Documentation](https://tailwindcss.com/docs/adding-custom-styles)
- [shadcn-vue Theming Documentation](https://shadcn-vue.com/)
- [CUBE CSS with Tailwind](https://cube-css-with-tailwind.netlify.app/)
- [Andy Bell: I Used Tailwind for the U in CUBE CSS](https://bell.bz/i-used-tailwind-for-the-u-in-cube-css-and-i-liked-it/)
- [Utopia Fluid Custom Properties](https://utopia.fyi/blog/fluid-custom-properties/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [@domchristie/tailwind-utopia Plugin](https://www.npmjs.com/package/@domchristie/tailwind-utopia)

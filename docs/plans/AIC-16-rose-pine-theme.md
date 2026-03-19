# AIC-16: Apply Rose Pine Theme & Remove CUBE CSS Scaffolding

**Branch**: `AIC-16` (worktree at `client-wt/AIC-16`)
**Spec**: `ai-content-client/_process/plans/shadcn-theme-reset.md` (Phases 1 + 2)
**Date**: 2026-03-19

---

## Enhancement Summary

**Deepened on:** 2026-03-19
**Sections enhanced:** 8
**Research sources used:** Context7 (shadcn-vue, Nuxt), Tailwind CSS v4 docs, tweakCN docs, fontsource docs, codebase grep analysis, web search (6 queries)

### Key Improvements
1. **Resolved `@layer composition` compatibility** -- Tailwind v4 uses native CSS cascade layers and reserves `theme`, `base`, `components`, `utilities`. Custom layer names like `composition` will work as native CSS layers but with critical specificity implications: unlayered CSS beats all layered CSS. The composition files must either be unwrapped entirely or placed inside a declared layer.
2. **Resolved PostCSS conflict** -- Research confirms `postcss-import` and `postcss-preset-env` MUST be removed when using Tailwind v4 via Vite plugin. They cause direct conflicts. Vue `<style>` blocks with nesting are handled by Vite's built-in CSS processor, not PostCSS.
3. **Added `@nuxtjs/color-mode` requirement** -- No dark mode toggle exists in this branch. The shadcn-vue docs specify `@nuxtjs/color-mode` with `classSuffix: ''` for Nuxt dark mode support.
4. **Added concrete font loading guidance** -- Fontsource with Tailwind v4 requires a `@theme` block to register the font-family as a Tailwind token, not just an `@import`.
5. **Resolved all 6 open questions** with concrete answers from codebase analysis.

### New Considerations Discovered
- **Cascade layer specificity trap**: Tailwind v4's native cascade layers mean composition primitives inside `@layer composition` will have LOWER specificity than any unlayered CSS. This could break layout if any component uses unlayered styles that conflict.
- **Missing `@nuxtjs/color-mode` dependency**: No color-mode package exists in `package.json` and no dark mode toggle mechanism was found in the codebase. This must be added as a prerequisite.
- **`prose.css` has custom `hgroup` logic** that `@tailwindcss/typography` does not replicate -- may need migration.
- **`ds/` components still exist** (molecules + organisms directories) and are actively registered in nuxt config. Removing the registration will break any pages using `ccm`-prefixed components.
- **Fontsource `@import` alone is insufficient for Tailwind v4** -- must also register font-family in `@theme` block.

---

## Current State (observed)

This worktree is branched **before** Tailwind/shadcn were added. The main branch (`ai-content-client`) already has Tailwind v4, shadcn-nuxt, and a zinc-themed `tailwind.css`. This branch still runs the old CUBE CSS stack exclusively.

| Artifact | Status |
|---|---|
| `src/assets/css/tailwind.css` | Does not exist |
| `package.json` | No `tailwindcss`, `shadcn-nuxt`, `@tailwindcss/*` deps |
| `components.json` | Does not exist |
| `src/components/ui/` | Does not exist |
| `src/public/css/styles.css` | Active -- 8-layer CUBE orchestrator, sole CSS entry |
| `src/public/css/tokens/` | 9 files (primitive + semantic colors, spacing, misc, fonts) |
| `src/public/css/base/` | 4 files (reset, typography, forms, tables) |
| `src/public/css/themes/` | 1 file (`theme.css`) |
| `src/public/css/components/` | 2 files (`tag-chip.css`, `prose.css`) |
| `src/public/css/utils/` | 6 files (color utils, space utils, typography, general utils) |
| `src/public/css/composition/` | 11 files (box, center, cluster, container, cover, frame, grid, imposter, reel, stack, switcher) |
| `src/public/css/dev.css` | Overrides layer with `.component-card` styles |
| `nuxt.config.ts` (root) | Re-exports from `src/nuxt.config.ts` |
| `src/nuxt.config.ts` css entry | `['~/public/css/styles.css']` |
| `src/nuxt.config.ts` vite | No Tailwind plugin |
| `src/nuxt.config.ts` modules | No `shadcn-nuxt` |
| Google Material Icons | Loaded via `<link>` in `app.head` + icon utility classes in `utils.css` |
| `tag-chip` CSS class usage | `src/pages/tags/index.vue`, `src/components/content/CategoryFilterBar.vue` |

Key dependency: Composition primitives reference `--space-*` fluid vars (Utopia scale). These vars must remain available after the migration.

---

## Prerequisites (Step 0)

Before either phase, install the Tailwind + shadcn toolchain that the main branch already has but this branch is missing.

### 0.1 Install dependencies

```bash
pnpm add tailwindcss@^4.1 @tailwindcss/vite@^4.1 @tailwindcss/typography@^0.5 shadcn-nuxt@^2.4 tw-animate-css
```

#### Research Insights

**Best Practices:**
- Install `@nuxtjs/color-mode` at this stage as well -- it is required for dark mode toggle functionality and is specified in the shadcn-vue Nuxt integration docs:
  ```bash
  pnpm add @nuxtjs/color-mode
  ```
- Consider pinning exact versions rather than ranges for Tailwind v4 packages to avoid breakage from minor releases during the beta-to-stable transition.

**Edge Cases:**
- The `@tailwindcss/vite` plugin replaces the need for `@nuxtjs/tailwindcss` module entirely. Do NOT install `@nuxtjs/tailwindcss` -- it is for Tailwind v3 and will conflict with the v4 Vite plugin approach.
- `tw-animate-css` must be imported AFTER `tailwindcss` in the CSS file or its keyframes will not resolve.

**References:**
- https://tailwindcss.com/docs/upgrade-guide
- shadcn-vue v4 manual installation: `apps/v4/content/docs/installation/05.manual.md`

### 0.2 Initialize shadcn-nuxt

```bash
pnpm dlx shadcn-vue@latest init
```

Accept defaults: New York style, zinc base, `src/components/ui/`, CSS variables = yes. This creates `components.json` and scaffolds the `ui/` directory.

#### Research Insights

**Best Practices:**
- The `components.json` must have `tailwind.cssVariables: true` for the Rose Pine CSS variable approach to work. Verify this after init.
- Set `aliases.ui` to match the actual path: `@/components/ui` (relative to `src/`).

**Edge Cases:**
- The init command may fail if it cannot find a `tailwind.css` file. Create the file first (even empty) at `src/assets/css/tailwind.css` before running init.
- If init writes to a different CSS file path, update `components.json` to point to `src/assets/css/tailwind.css`.

### 0.3 Wire Tailwind into Nuxt

In `src/nuxt.config.ts`:

1. Add `import tailwindcss from '@tailwindcss/vite'`
2. Add `'shadcn-nuxt'` and `'@nuxtjs/color-mode'` to `modules`
3. Add `shadcn: { prefix: '', componentDir: './components/ui' }`
4. Add `colorMode: { classSuffix: '' }` (required so `@nuxtjs/color-mode` adds `.dark` not `.dark-mode`)
5. Add `tailwindcss()` to `vite.plugins`
6. Create `src/assets/css/tailwind.css` (initially empty, will be populated in Phase 1)
7. Add `'~/assets/css/tailwind.css'` to the `css` array (keep `styles.css` for now -- removed in Phase 2)

#### Research Insights

**Critical: PostCSS config must be cleaned NOW, not in Phase 2.** Having both the Tailwind v4 Vite plugin and `postcss-import`/`postcss-preset-env` active simultaneously will cause conflicts. The PostCSS block should be emptied or removed in this step:

```ts
// REMOVE the entire postcss block:
// postcss: {
//   plugins: {
//     'postcss-import': {},
//     'postcss-preset-env': { ... }
//   }
// },
```

**Reasoning:** Tailwind v4 via `@tailwindcss/vite` handles `@import` resolution, CSS nesting, and vendor prefixing natively. The `postcss-import` plugin will conflict by trying to resolve imports before Tailwind does, causing double-processing or resolution failures. This is confirmed by multiple migration guides and GitHub issues.

**Performance Considerations:**
- The Tailwind v4 Vite plugin is significantly faster than the PostCSS plugin approach because it runs as a native Vite transform rather than going through the PostCSS pipeline.

**Edge Cases:**
- Vue `<style scoped>` blocks with CSS nesting will continue to work -- Vite's built-in CSS processor handles nesting for Vue SFCs independent of PostCSS config.
- The `build.transpile: ['vue-carousel']` entry should be verified as still needed.

**References:**
- https://github.com/tailwindlabs/tailwindcss/issues/15735
- https://dev.to/pockit_tools/tailwind-css-v4-migration-guide-everything-that-changed-and-how-to-upgrade-2026-5d4

### 0.4 Register ui components directory

Add to `components` array in nuxt config:
```ts
{ path: resolve(currentDir, 'components/ui'), pathPrefix: false }
```

Remove the `ds` component directory registrations (prefix `ccm`) since we are moving to shadcn components.

#### Research Insights

**CAUTION: `ds/` components are still in use.** The codebase has `src/components/ds/molecules/` and `src/components/ds/organisms/` directories with active components (e.g., `ccmBreadcrumb.vue` uses Material Icons with `class="icon"`). Removing the `ds` registration immediately will break any pages using `ccm`-prefixed components.

**Recommended approach:**
1. Keep the `ds` component registrations for now
2. Add the `ui` component registration alongside them
3. Create a separate follow-up task to migrate `ds` components to shadcn equivalents
4. Only remove the `ds` registration after all `ccm`-prefixed component usages have been replaced

---

## Phase 1: Apply Rose Pine Theme

### 1.1 Run tweakCN install

```bash
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmlwpk095000004jp9lj7c9sw
```

This should write Rose Pine `:root` and `.dark` variable blocks into `tailwind.css`. If the CLI only patches partially (or fails because the file was just created empty), manually populate the file using the structure from main branch's `tailwind.css` as a template, replacing the zinc OKLch values with Rose Pine values.

#### Research Insights

**Best Practices:**
- TweakCN generates production-ready CSS variables in OKLCh color space, which is the format shadcn-vue v4 expects. Do not convert these to HSL or hex.
- After running the tweakCN command, verify that ALL required CSS variables are present. The full set required by shadcn-vue includes: `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, `--chart-1` through `--chart-5`, `--radius`, and the full `--sidebar-*` set.

**Edge Cases:**
- The tweakCN CLI command uses `shadcn@latest` (React), not `shadcn-vue@latest`. For a Vue/Nuxt project, the theme CSS output should still be compatible since it is just CSS variables, but the CLI may attempt to write to the wrong file or use React-specific paths. Be prepared to manually copy the CSS variable output into `tailwind.css`.
- If the Rose Pine theme does not include `--sidebar-*` variables, copy them from the default zinc theme and adjust the OKLCh values to match Rose Pine's palette.

### 1.2 Populate tailwind.css structure

The file must contain, in order:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* Fluid Spacing System (Utopia) -- KEEP for composition primitives */
@layer base {
  :root {
    --space-3xs: clamp(0.25rem, 0.2284rem + 0.1078vw, 0.3125rem);
    /* ... full Utopia scale + pairs ... */
  }
}

/* shadcn @theme inline block -- maps CSS vars to Tailwind tokens */
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  /* ... full mapping ... */
}

/* Rose Pine Light Theme */
:root {
  --radius: 0.5rem;
  --background: /* Rose Pine dawn value */;
  /* ... all Rose Pine light vars ... */
}

/* Rose Pine Dark Theme */
.dark {
  --background: /* Rose Pine moon value */;
  /* ... all Rose Pine dark vars ... */
}

/* Base styles */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    letter-spacing: var(--tracking-normal);
  }
}
```

#### Research Insights

**Critical: `@theme inline` block is required.** The `@theme inline` block maps CSS custom properties to Tailwind token names. Without it, classes like `bg-background`, `text-foreground`, `border-border` will not work. The full mapping from shadcn-vue v4 docs must be included:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
```

**Performance Considerations:**
- Place the `--space-*` Utopia variables inside `@layer base` as shown. This ensures they are available globally but do not compete with Tailwind's utility layer for specificity.
- The `:root` and `.dark` theme variable blocks should remain OUTSIDE any `@layer` declaration. This is intentional -- unlayered CSS has the highest specificity in the cascade layer system, ensuring theme variables always win.

**Edge Cases:**
- The `letter-spacing: var(--tracking-normal)` in the body rule references a variable that does not exist in the shadcn theme. Either define `--tracking-normal` in the `:root` block or remove this declaration and use Tailwind's `tracking-normal` utility instead.
- Two separate `@layer base` blocks are fine -- CSS merges them.

### 1.3 Add Geist font

Option A (recommended -- self-hosted via fontsource):
```bash
pnpm add @fontsource/geist-sans @fontsource/geist-mono
```
Import in `tailwind.css`:
```css
@import "@fontsource/geist-sans";
@import "@fontsource/geist-mono";
```

Option B (Google Fonts link in `nuxt.config.ts` `app.head.link`):
```ts
{ rel: "preconnect", href: "https://fonts.bunny.net" },
{ rel: "stylesheet", href: "https://fonts.bunny.net/css?family=geist:400,500,600,700" }
```

Decision left to implementer. If the tweakCN theme output includes font-family declarations, follow those.

#### Research Insights

**Best Practices (Option A - Fontsource):**
- Fontsource `@import` loads only weight 400 by default. For a production app, import specific weights needed:
  ```css
  @import "@fontsource/geist-sans/400.css";
  @import "@fontsource/geist-sans/500.css";
  @import "@fontsource/geist-sans/600.css";
  @import "@fontsource/geist-sans/700.css";
  @import "@fontsource/geist-mono/400.css";
  ```
- **Critical for Tailwind v4**: After importing the font files, you must ALSO register the font-family in the `@theme` block for Tailwind utilities like `font-sans` to use it:
  ```css
  @theme inline {
    /* ... existing mappings ... */
    --font-sans: "Geist Sans", ui-sans-serif, system-ui, sans-serif;
    --font-mono: "Geist Mono", ui-monospace, monospace;
  }
  ```
  Without this `@theme` registration, `@import "@fontsource/geist-sans"` only loads the `@font-face` rules but Tailwind will not use the font.

**Performance Considerations:**
- Self-hosting (Option A) eliminates the external request to fonts.bunny.net and avoids a render-blocking stylesheet load. This is the better choice for a statically-generated Nuxt site.
- Consider using `font-display: swap` (fontsource defaults to this) to avoid FOIT (Flash of Invisible Text).

**References:**
- https://fontsource.org/fonts/geist-sans
- https://github.com/tailwindlabs/tailwindcss/discussions/13890

### 1.4 Verify light/dark toggle

Ensure the existing dark mode toggle mechanism (check `layouts/`, `app.vue`, or a color-mode composable) applies the `.dark` class to the HTML root. The `@custom-variant dark (&:is(.dark *))` line handles the rest.

#### Research Insights

**CRITICAL FINDING: No dark mode toggle exists in this branch.** Codebase analysis found no references to `color-mode`, `useColorMode`, or dark mode toggling in any Vue components or composables. The `@nuxtjs/color-mode` package is not in `package.json`.

**Required actions:**
1. Install `@nuxtjs/color-mode` (added to Step 0.1)
2. Add to `modules` in `nuxt.config.ts` (added to Step 0.3)
3. Add `colorMode: { classSuffix: '' }` config (added to Step 0.3)
4. Create a dark mode toggle component or use the `useColorMode()` composable in a header/layout component

**Implementation example from shadcn-vue docs:**
```vue
<script setup lang="ts">
const colorMode = useColorMode()
function toggleDarkMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
```

The `@nuxtjs/color-mode` module automatically manages the `.dark` class on the `<html>` element, which is what the `@custom-variant dark (&:is(.dark *))` line expects.

**References:**
- shadcn-vue dark mode Nuxt guide: `apps/v4/content/docs/dark-mode/02.nuxt.md`

---

## Phase 2: Remove CUBE CSS Layer System

### 2.1 Import composition primitives into tailwind.css

Add these imports to `tailwind.css` (after the Tailwind/plugin imports, before theme vars):

```css
/* Composition Primitives (structural layout, no visual design) */
@import "../../public/css/composition/box.css";
@import "../../public/css/composition/center.css";
@import "../../public/css/composition/cluster.css";
@import "../../public/css/composition/container.css";
@import "../../public/css/composition/cover.css";
@import "../../public/css/composition/frame.css";
@import "../../public/css/composition/grid.css";
@import "../../public/css/composition/imposter.css";
@import "../../public/css/composition/reel.css";
@import "../../public/css/composition/stack.css";
@import "../../public/css/composition/switcher.css";
```

Note: These files use `@layer composition` internally. Tailwind v4 will process them as a custom layer. The `@layer composition` declarations inside each file may need to be removed or renamed to avoid conflicts with Tailwind's layer system. **Test this.** If Tailwind strips unknown layers, wrap them in `@layer base` instead or remove the `@layer` wrappers entirely and let them live in the default layer.

#### Research Insights

**RESOLVED: `@layer composition` behavior in Tailwind v4.**

Tailwind v4 uses native CSS cascade layers. It reserves the layer names `theme`, `base`, `components`, and `utilities`. A custom layer name like `composition` will be treated as a standard native CSS cascade layer -- Tailwind will NOT strip it.

However, there is a critical specificity issue: **Tailwind v4 declares its layers with `@layer theme, base, components, utilities;` at the top. Any CSS in a custom `@layer composition` will have LOWER specificity than unlayered CSS.** Since Tailwind's utility classes are in `@layer utilities`, and the composition primitives are in `@layer composition`, the cascade order depends on which layer is declared first.

**Recommended approach: Remove `@layer composition` wrappers entirely.**

This is the safest option because:
1. Unlayered CSS has the highest cascade priority in the native layer system
2. The composition primitives are structural (layout-only) and should not be overridden by Tailwind utilities
3. Data-attribute selectors (e.g., `.stack[data-space="m"]`) have higher specificity than single-class Tailwind utilities anyway

**Alternative (if cascade control is needed):** Declare the custom layer in the ordering:
```css
@layer composition;
/* Then import the files */
```
But this still puts composition below unlayered CSS. The simplest path is removing the wrappers.

**Action items:**
1. Edit each of the 11 composition files to remove the `@layer composition {` wrapper and closing `}`
2. Alternatively, use a sed command: `sed -i '' '/@layer composition {/d; /^}$/d' src/public/css/composition/*.css` (but verify each file only has one top-level closing brace)

**References:**
- https://github.com/tailwindlabs/tailwindcss/discussions/6694
- https://github.com/tailwindlabs/tailwindcss/discussions/14363
- https://tailwindcss.com/blog/tailwindcss-v4

### 2.2 Delete CUBE CSS files

Files to delete:

| File | Reason |
|---|---|
| `src/public/css/styles.css` | Layer orchestrator -- replaced by `tailwind.css` |
| `src/public/css/components/tag-chip.css` | Replace with Tailwind utilities inline (see 2.4) |
| `src/public/css/components/prose.css` | Replaced by `@tailwindcss/typography` plugin |
| `src/public/css/dev.css` | Overrides layer with stale `.component-card` styles |
| `src/public/css/base/reset.css` | Tailwind includes its own reset (Preflight) |
| `src/public/css/base/typography.css` | Handled by Tailwind typography plugin |
| `src/public/css/base/forms.css` | Handled by Tailwind form styles |
| `src/public/css/base/tables.css` | Handled by Tailwind base |
| `src/public/css/tokens/` (all 9 files) | Replaced by shadcn theme vars |
| `src/public/css/themes/theme.css` | Replaced by Rose Pine vars in tailwind.css |
| `src/public/css/utils/color-utils-*.css` (3 files) | Replaced by Tailwind color utilities |
| `src/public/css/utils/space-utils.css` | Replaced by Tailwind spacing utilities |
| `src/public/css/utils/typography-utils.css` | Replaced by Tailwind text utilities |
| `src/public/css/utils/utils.css` | Icon font rules + misc (see 2.3 for icon handling) |

Directories to delete after emptying:
- `src/public/css/base/`
- `src/public/css/tokens/`
- `src/public/css/themes/`
- `src/public/css/components/`
- `src/public/css/utils/`

**Keep**: `src/public/css/composition/` (11 files)

#### Research Insights

**Best Practices:**
- Delete files in dependency order: first update all references (config, imports), then delete. Do not delete `styles.css` until the `css` array in nuxt.config has been updated to point to `tailwind.css` only.
- Use `git rm` instead of plain `rm` to ensure the deletions are tracked properly.

**Edge Cases:**
- **`utils.css` contains more than icon rules.** It also has font-size utilities (`.font-size\:0` through `.font-size\:5`), font-weight utilities, and text-transform utilities. Grep for usage of these classes before deleting:
  ```bash
  grep -r 'font-size\\:' src/components/ src/pages/ src/layouts/
  grep -r 'font-weight\\:' src/components/ src/pages/ src/layouts/
  grep -r 'text-transform\\:' src/components/ src/pages/ src/layouts/
  ```
  If used, replace with Tailwind equivalents (`text-xs`, `text-sm`, `font-bold`, `uppercase`, etc.) before deleting.

**Verification step:** After deletion, run:
```bash
grep -r "public/css" src/ --include="*.vue" --include="*.ts" --include="*.css"
```
to catch any remaining references to deleted files.

### 2.3 Preserve Material Icons utility

The Google Material Symbols stylesheet is already loaded via `<link>` in `nuxt.config.ts` `app.head`. The icon utility classes in `utils.css` (`.icon`, `[icon]::before`, `[data-icon]::before`) need to be preserved if used.

Check usage:
```bash
grep -r 'class="icon"\|data-icon\|\[icon\]' src/components/ src/pages/ src/layouts/
```

If used: move the icon font-variation-settings rules to `tailwind.css` inside a `@layer base` or `@layer utilities` block. If not used: skip.

#### Research Insights

**RESOLVED: Icon classes ARE in use.** Codebase grep confirms:
- `src/components/ds/molecules/ccmBreadcrumb.vue` uses `class="icon"` (line 23)

**Required action:** Migrate the icon utility rules from `utils.css` to `tailwind.css`. Add this block:

```css
@layer base {
  [icon]::before,
  [data-icon]::before,
  .icon {
    font-family: "Material Symbols Outlined", sans-serif;
    font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24;
  }

  .icon,
  [icon]::before,
  [data-icon]::before {
    margin-block: 3px;
    font-size: 1.8rem;
  }

  .icon,
  [icon]::before,
  [data-icon] {
    content: attr(data-icon);
  }
}
```

**Note:** If the `ds/` components are being kept temporarily (per Step 0.4 research), this migration is mandatory. If `ccmBreadcrumb` is replaced with a shadcn breadcrumb component before this step, it may become unnecessary -- verify at implementation time.

### 2.4 Replace tag-chip CSS with Tailwind

Two files use `.tag-chip`: `src/pages/tags/index.vue` and `src/components/content/CategoryFilterBar.vue`.

Replace the BEM class approach with Tailwind utility classes. Example replacement for the tag-chip element:

```html
<NuxtLink
  :to="`/tags/${tag.slug}`"
  class="inline-flex items-center gap-1 px-3 py-1 bg-muted border border-border rounded-full text-sm text-foreground no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
>
  <span class="font-medium">{{ tag.name }}</span>
  <span class="text-xs text-muted-foreground">{{ tag.itemCount }}</span>
</NuxtLink>
```

For the `--active` variant, use dynamic class binding:
```html
:class="isActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border text-foreground'"
```

Alternatively, use the shadcn `Badge` component if it has been installed (`pnpm dlx shadcn-vue@latest add badge`).

#### Research Insights

**Best Practices:**
- The shadcn `Badge` component is the cleaner option. It provides built-in variants (`default`, `secondary`, `destructive`, `outline`) and handles accessibility. Install it:
  ```bash
  pnpm dlx shadcn-vue@latest add badge
  ```
  Then use:
  ```html
  <Badge variant="secondary">{{ tag.name }}</Badge>
  ```
- If keeping inline Tailwind utilities, extract to a composable or computed property to avoid duplicating the long class string across two files:
  ```ts
  const tagChipClasses = computed(() => ({
    base: 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm no-underline transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
    active: 'bg-primary text-primary-foreground border border-primary',
    inactive: 'bg-muted text-foreground border border-border hover:bg-accent hover:text-accent-foreground'
  }))
  ```

**Accessibility Considerations:**
- The tag chips in `CategoryFilterBar.vue` are interactive filter buttons. Ensure they have `role="button"` or use `<button>` elements instead of `<NuxtLink>` for filter actions (non-navigation interactions).
- Add `aria-pressed` for the active state to convey toggle state to screen readers.

**Edge Cases:**
- `CategoryFilterBar.vue` has an "All" tag chip with count that is not a `NuxtLink` -- it is a filter button. The Tailwind class approach differs slightly (use `<button>` not `<NuxtLink>`).
- Both files use `.tag-chip__name` and `.tag-chip__count` BEM modifiers. When converting, ensure the `font-medium` and `text-xs text-muted-foreground` classes are applied to the correct child spans.

### 2.5 Update nuxt.config.ts CSS entry

In `src/nuxt.config.ts`:

**Before:**
```ts
css: [
  '~/public/css/styles.css'
],
```

**After:**
```ts
css: [
  '~/assets/css/tailwind.css'
],
```

### 2.6 Clean up PostCSS config

The existing PostCSS config includes `postcss-import` and `postcss-preset-env`. With Tailwind v4 handling CSS processing via Vite plugin, these may conflict or be redundant. Review whether to keep or simplify:

- `postcss-import`: Tailwind v4 handles `@import` natively via the Vite plugin. Likely safe to remove.
- `postcss-preset-env` with nesting: Tailwind v4 supports nesting natively. Likely safe to remove.

If composition primitives use CSS nesting, test before removing.

#### Research Insights

**RESOLVED: Both plugins MUST be removed.** This is not optional.

Research confirms that `postcss-import` directly conflicts with Tailwind v4's Vite plugin because both attempt to resolve `@import` statements. The Tailwind v4 Vite plugin handles:
- `@import` resolution (replaces `postcss-import`)
- CSS nesting (replaces `postcss-preset-env` nesting)
- Vendor prefixing (replaces `autoprefixer`)

**Action:** Remove the entire `postcss` block from `src/nuxt.config.ts`. This was already recommended in Step 0.3 but is documented here as well for completeness.

**Composition primitives and nesting:** The composition files (verified by reading `stack.css` and `grid.css`) do NOT use CSS nesting. They use flat selectors like `.stack > * + *` and `.grid[data-gap="m"]`. Removing `postcss-preset-env` will not break them.

**Also remove the npm packages:**
```bash
pnpm remove postcss-import postcss-preset-env
```

**References:**
- https://github.com/tailwindlabs/tailwindcss/issues/15516
- https://sitegrade.io/en/blog/tailwind-css-v4-2026-migration-guide/

---

## Verification Checklist

- [ ] `pnpm dev` starts without CSS errors
- [ ] Rose Pine colors render in light mode
- [ ] Dark mode toggle switches to Rose Pine moon palette
- [ ] Composition primitives (`.stack`, `.cluster`, `.grid`, etc.) still work with `--space-*` vars
- [ ] Tag chips render correctly with Tailwind classes (tags page + category filter)
- [ ] Material Icons still display
- [ ] `pnpm build` completes cleanly
- [ ] No references to `styles.css` remain in config
- [ ] No orphaned CSS files outside `composition/`

### Additional Verification Items (from research)

- [ ] `@theme inline` block includes all required `--color-*` mappings
- [ ] Geist font renders correctly (check in devtools > Computed > font-family)
- [ ] `@nuxtjs/color-mode` toggle works (switches `.dark` class on `<html>`)
- [ ] No remaining references to CUBE CSS utility classes (`.font-size\:*`, `.font-weight\:*`, etc.)
- [ ] PostCSS plugins fully removed (no `postcss-import` or `postcss-preset-env` in config or `package.json`)
- [ ] `ds/` components still render if kept (or all `ccm`-prefixed usages removed if dropping)
- [ ] `prose` class from `@tailwindcss/typography` works on `[slug].vue` page
- [ ] No console warnings about unresolved CSS variables
- [ ] Static generation (`pnpm generate`) completes without CSS errors

---

## Open Questions (RESOLVED)

1. **Composition `@layer` compatibility**: **RESOLVED.** Tailwind v4 uses native CSS cascade layers. Custom layer name `composition` will work but with lower cascade priority than unlayered CSS. **Recommendation: Remove `@layer composition` wrappers from all 11 files** to place them in the unlayered default, giving them the highest cascade priority. See Phase 2, Step 2.1 research insights for details.

2. **Geist font loading strategy**: **RESOLVED.** Self-hosted via `@fontsource` is recommended for this statically-generated site. Must also register font-family in `@theme inline` block. See Phase 1, Step 1.3 research insights.

3. **`prose.css` overlap with `@tailwindcss/typography`**: **PARTIALLY RESOLVED.** The existing `prose.css` has custom `hgroup` styling logic (subtitle patterns with `h4 ~ h2`) and a `prose-layout` class with `max-width: 70ch`. The `@tailwindcss/typography` plugin's `.prose` class provides standard spacing and typography but does NOT handle `hgroup` patterns. **Recommendation:** Migrate the `hgroup` rules and `prose-layout` class into `tailwind.css` if they are actively used (verified: `prose-layout` is used in `src/pages/summaries/[slug].vue`).

4. **`postcss-import` and `postcss-preset-env` removal**: **RESOLVED.** Both MUST be removed. They conflict with Tailwind v4's Vite plugin. Composition CSS files do not use nesting, so removal is safe. See Phase 2, Step 2.6 research insights.

5. **`ds/` component directory**: **RESOLVED.** The `ds/` directory contains active components (`molecules/`, `organisms/` subdirectories with at least `ccmBreadcrumb.vue`). **Do NOT remove the `ds` registration yet.** Keep it alongside the new `ui` registration. Create a follow-up task for migration.

6. **`dev.css` `.component-card` usage**: **RESOLVED.** Grep confirms `.component-card` is NOT used in any `.vue` file. It only exists in `dev.css` itself. **Safe to delete without migration.**

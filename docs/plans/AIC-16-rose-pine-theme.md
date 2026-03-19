# AIC-16: Apply Rose Pine Theme & Remove CUBE CSS Scaffolding

**Branch**: `AIC-16` (worktree at `client-wt/AIC-16`)
**Spec**: `ai-content-client/_process/plans/shadcn-theme-reset.md` (Phases 1 + 2)
**Date**: 2026-03-19

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

### 0.2 Initialize shadcn-nuxt

```bash
pnpm dlx shadcn-vue@latest init
```

Accept defaults: New York style, zinc base, `src/components/ui/`, CSS variables = yes. This creates `components.json` and scaffolds the `ui/` directory.

### 0.3 Wire Tailwind into Nuxt

In `src/nuxt.config.ts`:

1. Add `import tailwindcss from '@tailwindcss/vite'`
2. Add `'shadcn-nuxt'` to `modules`
3. Add `shadcn: { prefix: '', componentDir: './components/ui' }`
4. Add `tailwindcss()` to `vite.plugins`
5. Create `src/assets/css/tailwind.css` (initially empty, will be populated in Phase 1)
6. Add `'~/assets/css/tailwind.css'` to the `css` array (keep `styles.css` for now -- removed in Phase 2)

### 0.4 Register ui components directory

Add to `components` array in nuxt config:
```ts
{ path: resolve(currentDir, 'components/ui'), pathPrefix: false }
```

Remove the `ds` component directory registrations (prefix `ccm`) since we are moving to shadcn components.

---

## Phase 1: Apply Rose Pine Theme

### 1.1 Run tweakCN install

```bash
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmlwpk095000004jp9lj7c9sw
```

This should write Rose Pine `:root` and `.dark` variable blocks into `tailwind.css`. If the CLI only patches partially (or fails because the file was just created empty), manually populate the file using the structure from main branch's `tailwind.css` as a template, replacing the zinc OKLch values with Rose Pine values.

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

### 1.4 Verify light/dark toggle

Ensure the existing dark mode toggle mechanism (check `layouts/`, `app.vue`, or a color-mode composable) applies the `.dark` class to the HTML root. The `@custom-variant dark (&:is(.dark *))` line handles the rest.

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

### 2.3 Preserve Material Icons utility

The Google Material Symbols stylesheet is already loaded via `<link>` in `nuxt.config.ts` `app.head`. The icon utility classes in `utils.css` (`.icon`, `[icon]::before`, `[data-icon]::before`) need to be preserved if used.

Check usage:
```bash
grep -r 'class="icon"\|data-icon\|\[icon\]' src/components/ src/pages/ src/layouts/
```

If used: move the icon font-variation-settings rules to `tailwind.css` inside a `@layer base` or `@layer utilities` block. If not used: skip.

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

---

## Open Questions

1. **Composition `@layer` compatibility**: The 11 composition files each wrap their rules in `@layer composition`. Tailwind v4 may or may not honor custom layer names. The implementer must test whether these styles apply correctly when imported into `tailwind.css`. If not, the `@layer composition` wrappers should be removed (or changed to `@layer components`).

2. **Geist font loading strategy**: Self-hosted via `@fontsource` vs. CDN. Depends on whether the tweakCN theme output specifies a font-family declaration and whether the project wants to minimize external requests.

3. **`prose.css` overlap with `@tailwindcss/typography`**: The existing `prose.css` has custom spacing logic. Verify that the typography plugin's `.prose` class provides equivalent functionality before deleting. If the custom prose is needed, migrate its rules into `tailwind.css`.

4. **`postcss-import` and `postcss-preset-env` removal**: Need to test whether removing these breaks the composition CSS imports or any CSS nesting used in Vue `<style>` blocks.

5. **`ds/` component directory**: The nuxt config registers `components/ds/` with prefix `ccm`. If no `ds/` components exist (or they are being replaced by shadcn `ui/` components), remove the registration. If they still exist, decide whether to keep or migrate.

6. **`dev.css` `.component-card` usage**: Check if any component references `.component-card` before deleting. If so, migrate to Tailwind utilities.

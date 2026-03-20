# Spec: Reset to Stock shadcn Theme

**Objective**: Strip custom CUBE CSS styling and adopt a vanilla shadcn/ui theme. Use tweakCN to dial in colors, then stop. No bespoke design system, no custom tokens, no layered CSS architecture.

---

## Current State

- **shadcn-nuxt** already installed (new-york style, zinc base, 19 components in `src/components/ui/`)
- **CUBE CSS layer system** in `src/public/css/styles.css` — declares 8 layers but most imported files don't exist (all `tokens/*`, `base/*`, `themes/*` are missing). The only working pieces are:
  - 10 composition primitives in `composition/` (box, stack, cluster, grid, etc.)
  - 1 component CSS (`tag-chip.css`)
  - 1 utils file (`utils.css` — icon fonts + helpers)
- **Tailwind v4** with fluid Utopia spacing vars and OKLch theme vars in `src/assets/css/tailwind.css`
- **16 content components** in `src/components/content/` using a mix of Tailwind utilities and shadcn tokens
- **1 custom component** in `src/components/custom/` (projectCard.vue)

## Target State

A project that looks and feels like stock shadcn/ui. Colors come from tweakCN. Layout uses Tailwind utilities directly. No parallel styling system.

---

## Phases

### Phase 1: Apply Rose Pine Theme from tweakCN

**Theme**: Rose Pine (`cmlwpk095000004jp9lj7c9sw`)
**Install**: `pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmlwpk095000004jp9lj7c9sw`

The theme provides:
- **Fonts**: Geist (sans), Geist Mono (mono)
- **Radius**: `0.5rem`
- **Color space**: OKLch throughout
- **Full light + dark mode** variable sets (background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, chart-1–5, sidebar-*)
- **Shadow system**: Custom shadow scale (2xs through 2xl) for both modes
- **Letter spacing**: tracking-normal base with tighter/wider variants

**Steps:**
1. Run the install command above — it will update `src/assets/css/tailwind.css` with the Rose Pine `:root` and `.dark` variable blocks, replacing the current zinc theme
2. If the CLI doesn't fully replace the vars, manually swap the `:root` and `.dark` blocks in `tailwind.css` with the tweakCN output
3. Add `@layer base { body { letter-spacing: var(--tracking-normal); } }` as specified by the theme
4. Ensure Geist font is loaded (add to `nuxt.config.ts` via `@fontsource/geist` or Google Fonts link, or keep system fallback if preferred)
5. **Verify** light/dark mode toggle still works across the app

### Phase 2: Remove CUBE CSS Layer System

**Delete files:**
- `src/public/css/styles.css` (the broken layer orchestrator)
- `src/public/css/components/tag-chip.css` (replace with Tailwind in the component)
- `src/public/css/utils/utils.css` (move icon font import to `nuxt.config.ts` or `tailwind.css` if still needed; delete the rest)

**Keep composition primitives** (`src/public/css/composition/`):
- These are layout utilities (box, stack, cluster, grid, center, container, cover, frame, imposter, reel, switcher) — no design/visual impact, just structural
- Import them directly in `tailwind.css` instead of through `styles.css`

**Delete empty/broken directories:**
- `src/public/css/tokens/` (if it exists as an empty dir)
- `src/public/css/base/` (if it exists)
- `src/public/css/themes/` (if it exists)

**Update `nuxt.config.ts`:**
- Remove any reference to `public/css/styles.css` from the `css` array
- Ensure `src/assets/css/tailwind.css` is the sole CSS entry point

### Phase 3: Audit Content Components

Go through each component in `src/components/content/` and `src/components/custom/`:

1. Composition classes (`.stack`, `.cluster`, etc.) are fine to keep using — they're structural utilities
2. **Replace any raw CSS custom properties** (`var(--_ccm-*)`) with Tailwind spacing utilities or shadcn tokens
3. **Ensure color usage** is through shadcn tokens only (`text-foreground`, `bg-muted`, `text-primary`, `border-border`, etc.) — no raw `oklch()` or custom `--ccm-*` vars
4. **Tag chip component**: rewrite using shadcn `Badge` component (already installed) instead of custom `tag-chip.css`

### Phase 4: Clean Up Fluid Spacing

The Utopia fluid spacing system (`--space-3xs` through `--space-3xl` + pairs) in `tailwind.css`:

- **Decision**: These are nice but add complexity. If the app doesn't need fluid typography/spacing between breakpoints, **remove them** and use standard Tailwind spacing (`gap-4`, `p-6`, etc.)
- If keeping: leave them in `tailwind.css` but remove the `@theme` remapping — just use them as plain CSS vars where needed
- Either way, **do not reference them through CUBE CSS data attributes** (`[data-space="l"]`) — use Tailwind classes

### Phase 5: Remove Token Validation Infrastructure

- Delete `src/tests/tokens/token-resolution.spec.ts` (no custom tokens to validate)
- Delete `scripts/validate-tokens.ts` (if it exists)
- Remove `validate:tokens` and `validate:tokens:fix` scripts from `package.json`
- Remove `scripts/analyze-components.ts` if it was CUBE-specific

### Phase 6: Update Configuration & Docs

- **`components.json`**: update `baseColor` from `zinc` to match Rose Pine (or leave as-is since tweakCN overrides via CSS vars)
- **`CLAUDE.md`**: remove all CUBE CSS references, token system docs, `validate:tokens` commands, and composition primitive docs. Replace with: "Styling: shadcn/ui defaults with Tailwind v4. Theme colors from tweakCN."
- **`stylelint.config.mjs`**: simplify or remove if no longer linting custom CSS files (shadcn components use Tailwind classes, not custom CSS)
- Remove `lint:css` / `lint:css:fix` scripts from `package.json` if stylelint is no longer useful

---

## Out of Scope

- Redesigning page layouts or component structure
- Adding new shadcn components
- Changing the Nuxt Content setup
- Dark mode logic changes (just ensure the tweakCN vars support it)
- Typography overhaul (Tailwind prose plugin handles this already)

## Definition of Done

- [ ] App renders with tweakCN-sourced colors in light and dark mode
- [ ] No CSS files in `src/public/css/` except composition primitives and their imports
- [ ] Zero references to `--_ccm-*` custom properties in templates
- [ ] `styles.css` layer orchestrator is gone
- [ ] Token validation scripts removed
- [ ] `CLAUDE.md` updated to reflect new styling approach
- [ ] `npm run build` passes cleanly

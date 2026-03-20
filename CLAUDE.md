# CLAUDE.md

Guidance for AI agents working on the AI Content client -- a production YouTube/article summarizer app.

## Project Snapshot

- **Framework:** Nuxt 4 (Vue 3.5, SSR enabled, hybrid prerender + serverless)
- **Package manager:** `pnpm` (v10.28.2 -- see `packageManager` field in `package.json`). Never use `npm` or `yarn`.
- **Source root:** `src/` (via `srcDir` in `src/nuxt.config.ts`)
- **Content system:** `@nuxt/content` v3 with Zod-typed collections defined in `content.config.ts` (summaries, articles, newsletters, tags)
- **UI:** shadcn-vue (new-york style, Lucide icons, zinc base) + Tailwind CSS v4
- **State:** Pinia via `@pinia/nuxt`
- **Deployment:** Netlify (`nitro.preset: 'netlify'`)
- **Auto-imports enabled:** Vue composables, Nuxt utilities, and shadcn-vue components are auto-imported. Do not add manual imports for these.

## Essential Commands

```bash
pnpm install                        # install deps
pnpm run postinstall                # regenerate .nuxt types (nuxt prepare)
pnpm run dev                        # HMR dev server (8GB heap)
pnpm run build                      # production build (runs prebuild: copy-transcripts + build-search-index)
pnpm run preview                    # serve built output
pnpm run generate                   # static generation
pnpm run typecheck                  # nuxt typecheck
pnpm eslint .                       # lint (ESLint v9 flat config -- NO --ext flag)
pnpm run lint:css                   # stylelint
pnpm run lint:css:fix               # stylelint autofix
pnpm run validate:tokens            # design token validation
pnpm run validate:tokens:fix        # token autofix
pnpm vitest run                     # test suite (tests in src/tests/)
pnpm vitest run --coverage          # tests with coverage
pnpm run analyze:components         # component analysis
```

## Directory Overview

- `src/pages/` -- file-based routes (summaries, articles, tools, tags, channels, issues, playlists)
- `src/layouts/` -- shell layouts wrapping page content
- `src/components/ui/` -- shadcn-vue primitives (badge, button, card, dialog, form, input, skeleton, table, tabs, etc.)
- `src/components/content/` -- domain components (SummaryCard, ArticleCard, PageEmptyState, NewsletterSignupForm, etc.)
- `src/composables/` -- composition utilities (`use` prefix, one per file: useContentStream, useSearch, useDateGroups, useSortOptions, etc.)
- `src/utils/` -- pure utility functions (formatDate, categorizeTools, slugify)
- `src/lib/utils.ts` -- `cn()` helper (clsx + tailwind-merge)
- `src/content/` -- Markdown/YAML content collections
- `src/server/` -- Nitro API routes
- `src/assets/css/tailwind.css` -- Tailwind config + composition layout utilities
- `src/tests/` -- Vitest specs organized by feature
- `scripts/` -- build/sync/backfill scripts (tsx)
- `docs/` -- plans, brainstorms, solutions
- `.nuxt/`, `.output/` -- generated (gitignored)

## Component Quality Standards

These rules are non-negotiable. Every data-driven component must satisfy them.

### Required States

Every component that fetches or receives async data must handle all three states:
- **Loading:** use `<Skeleton>` from `src/components/ui/skeleton/`. Never use "Loading..." text.
- **Error:** structured display with icon + message + optional action
- **Empty:** use `<PageEmptyState>` with icon, message, hint, and optional link

### HTML Sanitization

**NEVER use `v-html` without DOMPurify.** Unsanitized `v-html` is an XSS vector.
```
WRONG:  v-html="marked.parse(rawContent)"
RIGHT:  v-html="DOMPurify.sanitize(marked.parse(rawContent))"
```
Use `isomorphic-dompurify` for SSR-safe sanitization (`import DOMPurify from 'isomorphic-dompurify'`).

### Styling Rules

- Tailwind utility classes only for spacing and layout. No scoped `<style>` blocks in `src/pages/` or `src/components/content/`. Exception: `src/components/ui/` (shadcn primitives may keep their own styles).
- If Tailwind cannot express a layout pattern, add a composition utility in `src/assets/css/tailwind.css`.
- Use `cn()` from `@/lib/utils` for conditional/merged classes.
- Use specific transition properties (`transition-colors`, `transition-opacity`), never `transition-all`.

### Accessibility Minimums

- All interactive elements need accessible names
- `aria-live="polite"` on dynamic count/status regions
- `aria-hidden="true"` on decorative icons
- Form inputs must have `<Label>` with `for`/`id` binding (use `useId()` for SSR-safe IDs)
- Images must have descriptive `alt` text

### Icons

Lucide only. Import individually from `lucide-vue-next` for tree-shaking. No icon component libraries.

## SSR Safety Rules

This is an SSR app. These rules apply to ALL code, not just components.

1. **No browser APIs without guards.** Never access `document.*`, `window.*`, or `navigator.*` without `if (import.meta.client) { ... }`.
2. **No `Math.random()` for IDs.** Use `useId()` (Vue 3.5+ / Nuxt) for deterministic SSR-safe ID generation.
3. **Post-install SSR audit.** After installing any shadcn-vue component, grep new files for `document.`, `window.`, `navigator.` and add `import.meta.client` guards.
4. **Never set `failOnError: false`** in Nitro prerender config. Exclude specific routes in `routeRules` instead.

## Component Composition Rules

1. **shadcn-vue for all standard UI** -- use existing primitives in `src/components/ui/` before building custom elements.
2. **Installing new primitives:**
   ```bash
   pnpm dlx shadcn-vue@latest add <component>
   # THEN: verify components.json still has "framework": "nuxt"
   # THEN: grep new files for document.*/window.*/navigator.* and add import.meta.client guards
   ```
3. **Class merging:** always use `cn()` from `@/lib/utils` for conditional or merged Tailwind classes.
4. **Form pattern:** simple single-field forms (like newsletter signup) use plain `Input` + `Label` + manual validation. Multi-field forms with field-level validation use vee-validate + zod schema + shadcn `FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormMessage`.
5. **Card pattern:** `<Card>` + `<CardHeader>` + `<CardContent>` for any boxed content.

## Component Patterns (Canonical Examples)

### Pattern 1: List Page (`src/pages/summaries/index.vue`)
- `useContentStream(collectionName)` for data fetching
- Compose with filter/sort composables (`useSummariesFilter`, `useSortOptions`, `useDateGroups`)
- Handle: pending skeleton, error, empty (filtered + unfiltered), search active
- `aria-live` on count regions
- Search integration via `inject('search')` from layout

### Pattern 2: Detail Page (`src/pages/summaries/[slug].vue`)
- `useAsyncData` + `queryCollection` for single-item fetch
- Route param: `useRoute().params.slug`
- Handle: pending, error (500), not-found (404 via `<PageNotFound>`)
- `<ContentRenderer>` for markdown body
- SEO meta via `useSeoMeta`

### Pattern 3: Card Component (`src/components/content/SummaryCard.vue`)
- Props-only, no internal data fetching
- Typed props interface
- Thumbnail with lazy loading + descriptive alt
- `<NuxtLink>` to detail page
- Tailwind-only layout

### Pattern 4: Form Component (`src/components/content/NewsletterSignupForm.vue`)
- Status state machine: `idle | loading | success | error`
- shadcn `Input`, `Button`, `Label` primitives
- `useId()` for accessible id generation
- `aria-invalid`, `aria-describedby` on error; `role="alert"` on error message
- Success state replaces form entirely
- Honeypot for spam protection; disable submit button during loading

## Data Fetching Conventions

| Scenario | Method |
|---|---|
| List of content items | `useContentStream(collectionName)` |
| Single item by slug | `useAsyncData(key, () => queryCollection(...).path(...).first())` |
| Non-content server data | `useAsyncData(key, () => $fetch('/api/...'))` |
| Client-side derived data | Computed refs + composables |
| Client-side search | `useSearch` composable (lazy init via inject) |

- `useAsyncData` key naming: `[collection]-[scope]-[identifier]` (e.g., `summary-${slug}`, `tools-list-all`)
- Never use bare `queryCollection` outside `useAsyncData` (causes SSR/hydration issues)
- Prefer targeted queries over fetch-all + client-side filter

## Naming Conventions

- **Pages:** kebab-case directories matching URL segments (`summaries/`, `tools/`, `tags/`)
- **Components:** PascalCase (`SummaryCard.vue`, `PageEmptyState.vue`)
- **Composables:** camelCase with `use` prefix (`useContentStream.ts`)
- **Utilities:** camelCase (`formatDate.ts`, `categorizeTools.ts`)
- **Content collections:** lowercase plural (`summaries`, `articles`, `tags`, `newsletters`)
- **CSS:** Tailwind utilities only in content components; no BEM, no scoped styles
- When renaming or relocating pages, update all references: CSS classes, composable names, `useAsyncData` keys, sitemap priorities

## Configuration Files

| File | Purpose |
|---|---|
| `nuxt.config.ts` (root) | Re-exports from `src/nuxt.config.ts` |
| `src/nuxt.config.ts` | Main Nuxt config (modules, routeRules, nitro, SSR settings) |
| `eslint.config.mjs` | ESLint v9 flat config via `@nuxt/eslint` |
| `stylelint.config.mjs` | Stylelint config |
| `components.json` | shadcn-vue config -- **must contain `"framework": "nuxt"`** |
| `content.config.ts` | Nuxt Content collection definitions with Zod schemas |
| `tsconfig.json` | TypeScript config |

**Zod pinned to v3.x** (peer dependency of `@vee-validate/zod`). Do not upgrade to v4.

## Agent Directories

- `.claude/` -- Claude Code commands, skills, agents (see `.claude/skills/` for domain knowledge)
- `.gemini/` -- Gemini-specific instructions

New domain knowledge should go into `.claude/skills/` rather than expanding this file.

## Testing

- Tests live in `src/tests/` organized by feature area (composables, config, integration)
- Run: `pnpm vitest run` | Coverage: `pnpm vitest run --coverage`
- When adding new composables or server API routes, add corresponding test files

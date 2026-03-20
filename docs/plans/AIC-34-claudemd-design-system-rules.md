# AIC-34: CLAUDE.md Rewrite and Design System Rules

---
title: "CLAUDE.md Rewrite and Design System Rules"
type: refactor
status: draft
date: 2026-03-20
---

## Problem

The current `CLAUDE.md` is ~120 lines of largely inaccurate information. It references `npm` (project uses `pnpm`), nonexistent directories (`src/tests/`, `src/content/docs/guidelines/`), a nonexistent script (`docs:generate`), ESLint v8 CLI syntax (`--ext .ts,.vue`) while the project uses ESLint v9 flat config, and describes itself as a "boilerplate repository" when it is a production YouTube summarizer app. It contains zero design system enforcement rules.

## Goal

Replace `CLAUDE.md` with a single source of truth that accurately describes the project, its commands, its architecture, and -- critically -- the component quality standards and design patterns that all AI agents must follow.

## New CLAUDE.md Structure

The new file will have the following sections, in order:

### Section 1: Project Snapshot

**Content strategy:** Short, factual description of what the app is and the key tech choices.

**What to include:**
- Production YouTube/article summarizer app (not a boilerplate)
- Framework: Nuxt 4 (Vue 3.5, SSR enabled, hybrid prerender + serverless)
- Package manager: `pnpm` (v10.28.2, from `packageManager` field)
- Source root: `src/` (via `srcDir` in nuxt.config)
- Content system: `@nuxt/content` v3 with Zod-typed collections (summaries, articles, newsletters, tags)
- UI: shadcn-vue (new-york style, Lucide icons) + Tailwind CSS v4
- Deployment: Netlify (nitro preset)
- State: Pinia (via `@pinia/nuxt`)

**Codebase verification:** Already confirmed from `package.json`, `nuxt.config.ts`, `components.json`.

### Section 2: Essential Commands

**Content strategy:** Only commands that actually exist in `package.json`, using `pnpm` throughout.

**Commands to document:**
```
pnpm install                        # install deps
pnpm run postinstall                # regenerate .nuxt types (nuxt prepare)
pnpm run dev                        # HMR dev server (8GB heap)
pnpm run build                      # production build (runs prebuild scripts)
pnpm run preview                    # serve built output
pnpm run generate                   # static generation
pnpm run typecheck                  # nuxt typecheck
pnpm eslint .                       # lint (ESLint v9 flat config)
pnpm run lint:css                   # stylelint
pnpm run lint:css:fix               # stylelint autofix
pnpm run validate:tokens            # design token validation
pnpm run validate:tokens:fix        # token autofix
pnpm vitest run                     # test suite
pnpm vitest run --coverage          # tests with coverage
pnpm run analyze:components         # component analysis
```

**Important note for implementer:** Verify the ESLint command. With `@nuxt/eslint` and flat config (`eslint.config.mjs` using `withNuxt`), the correct invocation is `pnpm eslint .` (no `--ext` flag). Confirm by running it.

### Section 3: Directory Overview

**Content strategy:** Accurate directory tree. Remove references to nonexistent dirs, add ones that actually exist.

**Directories to document:**
- `src/pages/` -- file-based routes (summaries, tools, tags, channels, articles, issues, playlists)
- `src/layouts/` -- shell layouts
- `src/components/ui/` -- shadcn-vue primitives (22 component sets: badge, breadcrumb, button, card, chip, dialog, form, input, label, select, separator, sheet, sidebar, skeleton, table, tabs, textarea, toggle, toggle-group, tooltip, button-link, card-link)
- `src/components/content/` -- domain components (SummaryCard, ArticleCard, ToolCard, IssueCard, ProjectCard, PageEmptyState, PageNotFound, SearchBar, SortControl, CategoryFilterBar, DateGroupedFeed, FeedItem, NewsletterSignupForm, ToolsFilters, ToolsSearch)
- `src/composables/` -- 15 composables (useContentStream, useSearch, useDateGroups, useSortOptions, useSummariesFilter, useTagsConfig, useTagIndex, useChannelsConfig, usePlaylistsConfig, useToolsDirectory, usePublications, useArticleStream, useContentItem, useSlugify, useTruncate)
- `src/lib/utils.ts` -- `cn()` helper (clsx + tailwind-merge)
- `src/content/` -- Markdown/YAML content collections
- `src/server/` -- Nitro API routes
- `src/assets/css/tailwind.css` -- Tailwind config + composition utilities
- `src/public/` -- static assets
- `scripts/` -- build/sync/backfill scripts (tsx)
- `docs/` -- plans, brainstorms, solutions
- `.nuxt/`, `.output/` -- generated (gitignored)

**Codebase verification:** Already confirmed directory listing.

### Section 4: Component Quality Standards

**Content strategy:** Hard rules that every component must follow. These are the design system enforcement rules that are currently missing entirely.

**Rules to codify:**

1. **Required states** -- every data-driven component must handle:
   - **Loading:** use `<Skeleton>` from `src/components/ui/skeleton/` (not "Loading..." text -- the current codebase has some text-based loading states that should be migrated)
   - **Error:** structured error display with icon + message + optional action (pattern from `PageEmptyState`)
   - **Empty:** use `<PageEmptyState>` with appropriate icon, message, hint, and optional link

2. **HTML sanitization** -- NEVER use `v-html` without DOMPurify. Flag existing violation in `SummaryCard.vue` line 60-63 which uses `v-html="marked.parse(summary.tldr)"` without sanitization. New CLAUDE.md must include:
   ```
   NEVER: v-html="marked.parse(rawContent)"
   ALWAYS: v-html="DOMPurify.sanitize(marked.parse(rawContent))"
   ```

3. **Spacing** -- Tailwind utility classes only. No scoped `<style>` blocks for spacing/layout. Flag existing violation: `src/pages/summaries/[slug].vue` has a scoped `.center` class. Note: the rule applies to content/domain components; shadcn-vue primitives in `ui/` may retain their own styles.

4. **Accessibility minimums:**
   - All interactive elements must have accessible names
   - `aria-live="polite"` on dynamic count/status regions (pattern seen in summaries index)
   - `aria-hidden="true"` on decorative icons
   - Form inputs must have associated `<Label>` with `for`/`id` binding (pattern from NewsletterSignupForm)
   - Images must have descriptive `alt` text

5. **Icons** -- Lucide only, imported individually from `lucide-vue-next` for tree-shaking. No icon component libraries.

### Section 5: Component Composition Rules

**Content strategy:** How to build components using shadcn-vue primitives.

**Rules to codify:**

1. **shadcn-vue for all standard UI** -- Button, Card, Input, Label, Select, Dialog, Form, Badge, Tabs, Sheet, Skeleton, Table, Tooltip, Separator, Toggle, Textarea, Breadcrumb
2. **Install new primitives:** `pnpm dlx shadcn-vue@latest add <component>`
3. **Class merging:** always use `cn()` from `@/lib/utils` for conditional/merged classes
4. **No custom CSS for what shadcn provides** -- if shadcn-vue has a component for it, use it
5. **Card pattern:** `<Card>` + `<CardHeader>` + `<CardContent>` for any boxed content
6. **Form pattern:** vee-validate + zod schema + shadcn `<FormField>` / `<FormItem>` / `<FormLabel>` / `<FormControl>` / `<FormMessage>` (note: NewsletterSignupForm currently doesn't use this full pattern -- it's a simpler form. Document when the full vee-validate pattern is needed vs simple forms)
7. **Select pattern:** `<Select>` + `<SelectTrigger>` + `<SelectContent>` + `<SelectItem>`
8. **Dialog pattern:** `<Dialog>` + `<DialogTrigger>` + `<DialogContent>` + `<DialogHeader>` + `<DialogTitle>` + `<DialogDescription>`

### Section 6: Component Patterns Guide

**Content strategy:** Document the 4 recurring page/component patterns with references to real files as canonical examples.

**Pattern 1: List Page** (canonical: `src/pages/summaries/index.vue`)
- Use `useContentStream(collectionName)` for data fetching
- Compose with filter/sort composables
- Required states: pending skeleton, error display, empty state (filtered + unfiltered)
- Search integration via inject from layout
- `<DateGroupedFeed>` or flat list rendering
- `aria-live` on count regions

**Pattern 2: Detail Page** (canonical: `src/pages/summaries/[slug].vue`)
- Use `useAsyncData` + `queryCollection` for single-item fetch
- Route param: `useRoute().params.slug`
- Required states: pending, error, not-found
- Back navigation link
- `<ContentRenderer>` for markdown body
- SEO meta via `useSeoMeta`

**Pattern 3: Card Component** (canonical: `src/components/content/SummaryCard.vue`)
- Props-only, no internal data fetching
- Typed props interface
- Thumbnail with lazy loading + descriptive alt
- Metadata row (channel, date, external link)
- Title as `<NuxtLink>` to detail page
- Tailwind-only layout (flex, gap, responsive)

**Pattern 4: Form Component** (canonical: `src/components/content/NewsletterSignupForm.vue`)
- Status state machine: `idle | loading | success | error`
- shadcn `<Input>`, `<Button>`, `<Label>` primitives
- `useId()` for accessible id generation
- `aria-invalid`, `aria-describedby` on error
- Error message with `role="alert"`
- Success state replaces form entirely
- Honeypot for spam protection (if applicable)

### Section 7: Data Fetching Conventions

**Content strategy:** Clear decision tree for which composable/method to use.

**Rules based on actual codebase patterns:**

| Scenario | Method | Example |
|---|---|---|
| List of content items from a collection | `useContentStream(collectionName)` | Summaries index, articles index |
| Single content item by slug | `useAsyncData` + `queryCollection().path().first()` | `[slug].vue` detail pages |
| Non-content server data (API calls) | `useAsyncData` + `$fetch('/api/...')` | Transcript loading |
| Client-side derived/filtered data | Computed refs + composables | `useSortOptions`, `useSummariesFilter` |
| Client-side search | `useSearch` composable (lazy init via inject) | Search on summaries page |
| Aggregated data from JSON files | `useAsyncData` + `$fetch('/path.json')` | Tags index, tools directory |

**Important notes:**
- `useContentStream` is the project's abstraction over `queryCollection`/`queryContent` -- prefer it for collection listing
- `queryCollection` is used directly only inside `useAsyncData` for single-item lookups or when `useContentStream` options aren't sufficient
- Never use bare `queryCollection` outside of `useAsyncData` (SSR/hydration issues)

### Section 8: Naming Conventions

**Content strategy:** Codify the naming patterns already in use.

- **Pages:** kebab-case directory names matching URL segments (`summaries/`, `tools/`, `tags/`)
- **Components:** PascalCase filenames (`SummaryCard.vue`, `PageEmptyState.vue`)
- **Composables:** camelCase with `use` prefix (`useContentStream`, `useSortOptions`)
- **Utilities:** camelCase in `src/utils/` (`formatDate`, `categorizeTools`)
- **Content collections:** lowercase plural (`summaries`, `articles`, `tags`, `newsletters`)
- **CSS:** Tailwind utilities only; no BEM, no scoped styles in content components

### Section 9: Configuration Notes

**Content strategy:** Brief, accurate notes about config file locations.

- `nuxt.config.ts` at repo root re-exports from `src/nuxt.config.ts`
- `eslint.config.mjs` at repo root -- ESLint v9 flat config via `@nuxt/eslint`
- `stylelint.config.mjs` at repo root
- `components.json` -- shadcn-vue config (new-york style, Lucide icons, zinc base)
- `content.config.ts` -- Nuxt Content collection definitions with Zod schemas
- `tsconfig.json` at repo root

### Section 10: Agent-Specific Directories

**Content strategy:** Keep the existing section but trim to essentials.

- `.claude/` -- Claude Code commands
- `.gemini/` -- Gemini instructions
- Other agent dirs as they exist

## Implementation Steps

1. **Read & verify** -- Confirm any remaining unknowns:
   - Run `pnpm eslint .` to verify the correct lint command
   - Check if DOMPurify is already a dependency (it is not in `package.json` -- the v-html rule should note it needs to be added)
   - Check `src/assets/css/tailwind.css` for composition layout utility names to list accurately
   - Check if there are any test files anywhere (the current CLAUDE.md references `src/tests/` which doesn't exist; check for `__tests__/`, `*.spec.ts`, `*.test.ts`)

2. **Write the new CLAUDE.md** -- Replace the entire file with the sections above. Target length: 200-250 lines (enough for completeness, short enough to be useful).

3. **Verify accuracy** -- After writing, spot-check every command, path, and component name against the actual codebase.

## Existing Violations to Flag

The new CLAUDE.md should be forward-looking (document the rules), but the implementer should be aware of existing violations that will need separate cleanup:

1. **`SummaryCard.vue` line 60-63:** `v-html="marked.parse(summary.tldr)"` without DOMPurify
2. **`src/pages/summaries/[slug].vue` lines 112-118:** Scoped `<style>` block with `.center` class (should be Tailwind utilities)
3. **`src/pages/summaries/[slug].vue` line 3:** Loading state is text-based ("Loading...") rather than skeleton
4. **`src/pages/tools/index.vue` line 59:** Loading state is text-based ("Loading tools...")
5. **`src/pages/tools/index.vue`:** Uses `<button>` and `<div>` for empty states instead of `<PageEmptyState>`

These violations should NOT block the CLAUDE.md rewrite -- they are cleanup items for a follow-up ticket.

## Open Questions

1. **DOMPurify dependency:** Should the CLAUDE.md mandate adding DOMPurify now, or should it reference a follow-up ticket for the `v-html` sanitization work?
2. **Skeleton vs text loading:** How aggressive should the skeleton rule be? Some pages (detail pages) may genuinely benefit from a simple "Loading..." while the full skeleton pattern is better for list pages with cards. Should the rule allow exceptions?
3. **Scoped styles in pages:** The rule says "no scoped styles in content components." Should page-level `.vue` files be allowed scoped styles, or should the rule apply to all `.vue` files under `src/`?
4. **Test directory:** There is no `src/tests/` directory and no test files were found. Should the new CLAUDE.md include a testing section at all, or omit it until tests actually exist? (The `vitest.config.ts` and `@nuxt/test-utils` dependency exist, so the infrastructure is there.)

## Estimated Effort

- Reading/verification: 15 minutes
- Writing the new CLAUDE.md: 30 minutes
- Review and accuracy check: 15 minutes
- **Total: ~1 hour**

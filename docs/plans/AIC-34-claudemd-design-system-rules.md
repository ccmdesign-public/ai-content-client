# AIC-34: CLAUDE.md Rewrite and Design System Rules

---
title: "CLAUDE.md Rewrite and Design System Rules"
type: refactor
status: draft
date: 2026-03-20
deepened: 2026-03-20
---

## Enhancement Summary

**Deepened on:** 2026-03-20
**Sections enhanced:** 10
**Research sources used:** Context7 (shadcn-vue, DOMPurify), web search (CLAUDE.md best practices, XSS prevention, skeleton accessibility), 5 project learnings, 8 review agents (security, architecture, patterns, performance, TypeScript, frontend races, simplicity, agent-native)

### Key Improvements
1. Added `isomorphic-dompurify` as the SSR-safe DOMPurify solution (resolves Open Question #1 with concrete package recommendation)
2. Added skeleton accessibility requirements (`aria-busy`, animation pause compliance with WCAG 2.2.2) and tiered loading strategy (resolves Open Question #2)
3. Added SSR guard checklist from project learnings -- `import.meta.client` for `document.*`, `window.*`, `navigator.*` in shadcn-vue components
4. Added `components.json` framework field protection rule from shadcn-vue migration learning
5. Added multi-file CLAUDE.md strategy recommendation and progressive disclosure via skills
6. Resolved all 4 open questions with research-backed recommendations
7. Added new Section 11 (SSR Safety Rules) based on recurring SSR hydration issues from project learnings

### New Considerations Discovered
- **isomorphic-dompurify** (benchmarked at 86.55 on Context7) wraps DOMPurify for seamless SSR/client usage -- avoids the jsdom setup boilerplate that raw DOMPurify requires on server
- CLAUDE.md files should target under 200 lines per file; overflow content should go into `.claude/skills/` as progressive disclosure
- Skeleton loaders should use `aria-busy="true"` on the container, not individual skeletons, and animation should stop after 5 seconds per WCAG 2.2.2
- The shadcn-vue CLI silently drops `"framework": "nuxt"` from `components.json` -- a post-install verification step is essential
- Route relocations leave stale `useAsyncData` keys, CSS class names, and sitemap priorities -- the naming conventions section should cross-reference this learning

---

## Problem

The current `CLAUDE.md` is ~120 lines of largely inaccurate information. It references `npm` (project uses `pnpm`), nonexistent directories (`src/tests/`, `src/content/docs/guidelines/`), a nonexistent script (`docs:generate`), ESLint v8 CLI syntax (`--ext .ts,.vue`) while the project uses ESLint v9 flat config, and describes itself as a "boilerplate repository" when it is a production YouTube summarizer app. It contains zero design system enforcement rules.

### Research Insights

**CLAUDE.md Best Practices (2026):**
- Keep CLAUDE.md under 200 lines per file -- for each line, ask "Would removing this cause Claude to make mistakes?" If not, cut it
- Use multi-file strategy: project root CLAUDE.md for general rules, child-directory CLAUDE.md files for specific areas
- Move reusable domain knowledge into `.claude/skills/` for progressive disclosure -- Claude loads skills automatically when relevant
- Check CLAUDE.md into git so the team can contribute -- it compounds in value over time
- Include: bash commands, code style guidelines, key architecture patterns, and testing instructions

**References:**
- https://code.claude.com/docs/en/best-practices
- https://uxplanet.org/claude-md-best-practices-1ef4f861ce7c
- https://www.groff.dev/blog/implementing-claude-md-agent-skills

---

## Goal

Replace `CLAUDE.md` with a single source of truth that accurately describes the project, its commands, its architecture, and -- critically -- the component quality standards and design patterns that all AI agents must follow.

### Research Insights

**Structural Recommendation:** Given the 10 sections planned, the resulting CLAUDE.md may exceed the 200-line recommended maximum. Consider splitting into:
- `CLAUDE.md` (root): Sections 1-3, 7-10 (~120 lines -- project identity, commands, directories, data fetching, naming, config, agent dirs)
- `.claude/skills/design-system-standards/SKILL.md`: Sections 4-6 (~80-100 lines -- component quality, composition rules, patterns guide)

This way the design system rules load automatically when Claude works on components, but don't consume context when working on scripts or config.

---

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

### Research Insights

**Architecture Strategist Review:**
- The snapshot should explicitly mention SSR mode (hybrid prerender + serverless) because it fundamentally affects component authoring rules (no bare `document.*`, `window.*` access)
- Consider noting the rendering strategy: `routeRules` in `nuxt.config.ts` controls which routes are prerendered vs server-rendered -- this is a common source of confusion

**Agent-Native Review:**
- Include the exact `packageManager` field value so agents never accidentally use `npm` or `yarn`
- Note that Nuxt auto-imports are enabled -- agents should not add manual imports for Vue composables or Nuxt utilities

---

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

### Research Insights

**From Project Learning (styling-audit-legacy-cleanup-patterns.md):**
- The `packageManager` field in `package.json` must match the actual lockfile. When the CLAUDE.md references `pnpm`, verify that `"packageManager": "pnpm@10.28.2"` is present. Previous migration from npm to pnpm left ambiguity until this field was formalized.

**Verification-Before-Completion Pattern:**
- Add a "verification sequence" after commands: after writing the new CLAUDE.md, run each command once to confirm it works. Document any that require preconditions (e.g., `pnpm run build` may need env vars).

**Performance Oracle Review:**
- The `8GB heap` note on `pnpm run dev` is worth keeping -- it signals to agents that the dev server is memory-constrained and they should avoid adding heavy dev-time plugins without justification.

---

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

### Research Insights

**Pattern Recognition Review:**
- The 22 shadcn-vue component sets listed here will drift as new components are added. Instead of a count, consider listing only the categories (`primitives in src/components/ui/`) and let agents discover specifics at runtime. This prevents the CLAUDE.md from becoming stale.
- Similarly, the 15 composables list will change. Document the pattern (`use` prefix, one per file in `src/composables/`) rather than enumerating all 15.

**From Project Learning (route-relocation-stale-reference-cleanup.md):**
- When a directory overview changes (pages move, routes relocate), all references to those paths must be updated across the CLAUDE.md, sitemap, navigation, CSS class names, and composable names. Add a note: "When adding/moving pages, update this section and check for stale references per `docs/solutions/logic-errors/route-relocation-stale-reference-cleanup.md`."

---

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

### Research Insights

**Security Sentinel Review -- v-html/XSS (CRITICAL):**
- Vue's official security docs explicitly warn: "Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to XSS attacks. Only use v-html on trusted content and never on user-provided content."
- For this project's SSR context, use `isomorphic-dompurify` (npm package) instead of raw `dompurify`. It wraps DOMPurify to work seamlessly in both Node.js (SSR) and browser environments without needing jsdom setup.
- Install: `pnpm add isomorphic-dompurify`
- Usage: `import DOMPurify from 'isomorphic-dompurify'` -- same API, works on server and client.
- Additionally, configure DOMPurify with `ALLOWED_TAGS` to restrict to only the HTML elements that `marked.parse()` actually produces (e.g., `['p', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'code', 'pre', 'br']`). This is defense-in-depth.
- Consider adding a CSP `script-src` header in Netlify config as an additional XSS mitigation layer.

**References:**
- https://vuejs.org/guide/best-practices/security
- https://www.sourcery.ai/vulnerabilities/vue-v-html-vulnerable
- Context7: isomorphic-dompurify (benchmark score: 86.55)

**Skeleton Loading Accessibility (resolves Open Question #2):**
- Use `aria-busy="true"` on the container wrapping skeleton elements, not on individual skeletons
- Individual `<Skeleton>` components should have `aria-hidden="true"` since they are decorative
- Per WCAG 2.2.2 (Pause, Stop, Hide), skeleton pulse animations should stop after 5 seconds or provide a mechanism to pause. In practice, most content loads within this window, but add a `prefers-reduced-motion` media query to disable the animation entirely for users who request it.
- **Tiered loading strategy recommendation:**
  - **List pages (cards):** Always use `<Skeleton>` -- the visual placeholder prevents layout shift and provides a better perceived performance
  - **Detail pages (single item):** Use `<Skeleton>` shaped to match the content layout (title bar, body block, metadata row). Avoid "Loading..." text.
  - **Inline data (counts, badges):** A simple `<Skeleton class="h-4 w-12 inline-block" />` is sufficient
  - This eliminates the ambiguity in the current plan about when to use skeletons vs text.

**References:**
- https://adrianroselli.com/2020/11/more-accessible-skeletons.html
- https://ui.nuxt.com/docs/components/skeleton

**From Project Learning (styling-audit-legacy-cleanup-patterns.md) -- SSR Hydration:**
- Never use `Math.random()` in SSR-rendered components for ID generation. Use Vue 3.5+ `useId()` or Nuxt's `useId()` for deterministic, SSR-safe IDs.
- This directly applies to Section 4's accessibility rule about `for`/`id` bindings -- the IDs must be generated with `useId()`, not random strings.

**From Project Learning (newsletter-subscribe-endpoint-hardening.md):**
- Form components need server-side rate limiting from day one. The CLAUDE.md form pattern (Pattern 4) should note: "Public-facing form endpoints require rate limiting. See `docs/solutions/integration-issues/newsletter-subscribe-endpoint-hardening.md` for the in-memory IP-based pattern."

**Performance Oracle Review:**
- The `transition: all` anti-pattern was caught in the styling audit learning. Add to quality standards: "Use specific transition properties (`transition: background-color 0.2s, color 0.2s`), never `transition: all`."

---

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

### Research Insights

**From Project Learning (shadcn-vue-migration-review-patterns.md) -- CRITICAL:**
- **Post-install verification:** After running `pnpm dlx shadcn-vue@latest add <component>`, ALWAYS verify that `components.json` still contains `"framework": "nuxt"`. The CLI silently removes this field, causing future component installs to generate manual Vue imports instead of Nuxt auto-imports.
- **SSR guard requirement:** After installing any shadcn-vue component, grep for `document.`, `window.`, and `navigator.` in the generated files and wrap in `if (import.meta.client) { ... }`. Known example: `SidebarProvider.vue` writes to `document.cookie` without an SSR guard.
- **group-hover verification:** When using Tailwind's `group-hover:*` or `group-focus:*` variants, always verify a `group`-classed ancestor exists. Without it, the utility is silently dead CSS.

**Add to Rule 2 (Install new primitives):**
```
pnpm dlx shadcn-vue@latest add <component>
# THEN: verify components.json still has "framework": "nuxt"
# THEN: grep for document.*/window.*/navigator.* in new files, add import.meta.client guards
```

**shadcn-vue Nuxt Auto-Import Pattern (from Context7):**
- In Nuxt with `shadcn-nuxt` module, components are auto-imported. The CLAUDE.md should clarify that manual imports in `<script setup>` are NOT needed for shadcn-vue components in Nuxt -- they are auto-registered.
- However, if `"framework": "nuxt"` is missing from `components.json`, the CLI will generate components WITH manual imports. This is the root cause of import-style inconsistency.

**Code Simplicity Review:**
- The form pattern distinction (full vee-validate vs simple forms) needs a clear decision rule. Recommendation: use the full `FormField`/`FormItem`/`FormMessage` pattern for any form with more than 2 fields OR any form that requires field-level validation messages. Simple single-field forms (like newsletter signup) can use plain `Input` + `Label` + manual validation.

**Presentation/Logic Split Pattern (from skills):**
- Components with data fetching, API calls, or per-item async behavior should follow the presentation/logic split: a composable holds business logic, a presentation component handles rendering, and a thin integration component wires them together. This is complementary to the Card pattern (Pattern 3 is already presentation-only).

---

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

### Research Insights

**Frontend Races Review (Pattern 1 -- List Page):**
- When composing filter/sort composables with `useContentStream`, watch for race conditions: if a user changes a filter while the previous fetch is still pending, the old response may arrive after the new one. Ensure the composable handles cancellation or uses a key/counter pattern to discard stale results.
- `useAsyncData` in Nuxt handles this natively with its `key` parameter, but custom composables like `useContentStream` must implement their own staleness detection.

**Frontend Races Review (Pattern 4 -- Form Component):**
- Double-submit protection: disable the submit button during `loading` state AND ignore duplicate submissions server-side. The newsletter endpoint already has rate limiting (3 req/min/IP from the learning), but the client should also prevent rapid-fire clicks.
- Handle network timeout explicitly in the state machine. The current `idle | loading | success | error` model should account for timeouts (e.g., after 10 seconds, transition from `loading` to `error` with a "request timed out" message).

**Pattern 2 -- Detail Page Edge Cases:**
- **Not-found vs error:** The plan lists both "error" and "not-found" as required states. Clarify: a 404 (content not found for slug) should render `<PageNotFound>`, while a 500 (server/fetch error) should render the error state. These are distinct UI treatments.
- **SEO meta for not-found:** When a detail page returns 404, set `useHead({ meta: [{ name: 'robots', content: 'noindex' }] })` to prevent search engines from indexing the error page.

**Pattern 3 -- Card Component Security:**
- The `SummaryCard.vue` v-html violation is documented. But the Card pattern guide should also note: if any card displays user-generated content (e.g., summary TLDRs that come from AI transcription), that content must be sanitized even if it seems "internal." AI-generated content can contain markdown injection patterns.

**From Project Learning (newsletter-subscribe-endpoint-hardening.md):**
- Pattern 4 should reference the endpoint hardening learning for production form implementation. Key additions: Zod `.url()` validation on any URL fields, server-side email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, and `failOnError: true` in Nitro prerender config (never suppress build errors globally).

---

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

### Research Insights

**TypeScript Reviewer:**
- The `useAsyncData` key parameter is critical for cache invalidation and must be unique per data source. Document the naming convention: `[collection]-[scope]-[identifier]`, e.g., `summaries-list-all`, `summaries-detail-${slug}`, `tools-list-filtered`. Stale keys cause hard-to-debug hydration mismatches.
- Type the return of `queryCollection` calls using the Zod-inferred types from `content.config.ts`. This ensures type safety flows from content schema to component props.

**From Project Learning (newsletter-subscribe-endpoint-hardening.md):**
- For server API routes, prefer targeted queries over fetch-all + client-side filter. The learning documents a case where `queryCollection('newsletters').all()` + `.find()` was replaced with `queryCollection('newsletters').where('publishedAt', '=', issueId).first()` to avoid loading all records into memory.

**Performance Oracle Review:**
- Consider adding `getCachedData` option to `useAsyncData` calls for data that rarely changes (like tags, channels config). This prevents unnecessary refetches on client-side navigation.
- Document that `useAsyncData` with `lazy: true` defers fetching to client-side -- useful for below-the-fold content but should NOT be used for SEO-critical data that needs to be in the initial server render.

---

### Section 8: Naming Conventions

**Content strategy:** Codify the naming patterns already in use.

- **Pages:** kebab-case directory names matching URL segments (`summaries/`, `tools/`, `tags/`)
- **Components:** PascalCase filenames (`SummaryCard.vue`, `PageEmptyState.vue`)
- **Composables:** camelCase with `use` prefix (`useContentStream`, `useSortOptions`)
- **Utilities:** camelCase in `src/utils/` (`formatDate`, `categorizeTools`)
- **Content collections:** lowercase plural (`summaries`, `articles`, `tags`, `newsletters`)
- **CSS:** Tailwind utilities only; no BEM, no scoped styles in content components

### Research Insights

**From Project Learning (route-relocation-stale-reference-cleanup.md):**
- When a page is relocated (e.g., from `/` to `/summaries/`), naming must be updated across ALL surfaces: CSS class names, composable names (e.g., `useHomepageFilter` -> `useSummariesFilter`), `useAsyncData` keys, test file names, and sitemap priorities. Add to naming conventions: "Naming should reflect where code lives now, not where it came from."
- Recommended: add a "Route Relocation Checklist" reference pointing to `docs/solutions/logic-errors/route-relocation-stale-reference-cleanup.md`.

**From Project Learning (styling-audit-legacy-cleanup-patterns.md):**
- CSS custom properties in components should follow `--_{component-shortname}-{property}` pattern without framework prefixes (use `--_table-*`, not `--_ccm-table-*`).

**Code Simplicity Review:**
- The `useAsyncData` key naming convention should be explicitly documented. Inconsistent keys (e.g., mixing `homepage-filter` and `summaries-filter` for the same data) cause cache misses and duplicate fetches.

---

### Section 9: Configuration Notes

**Content strategy:** Brief, accurate notes about config file locations.

- `nuxt.config.ts` at repo root re-exports from `src/nuxt.config.ts`
- `eslint.config.mjs` at repo root -- ESLint v9 flat config via `@nuxt/eslint`
- `stylelint.config.mjs` at repo root
- `components.json` -- shadcn-vue config (new-york style, Lucide icons, zinc base)
- `content.config.ts` -- Nuxt Content collection definitions with Zod schemas
- `tsconfig.json` at repo root

### Research Insights

**From Project Learning (shadcn-vue-migration-review-patterns.md):**
- `components.json` is fragile: the shadcn-vue CLI can overwrite it and drop the `"framework": "nuxt"` field. Add a note: "After any `shadcn-vue add` command, verify `components.json` still contains `\"framework\": \"nunut\"`. See `docs/solutions/ui-bugs/shadcn-vue-migration-review-patterns.md`."
- Check for duplicate `components` directory registrations in `nuxt.config.ts` -- the shadcn-nuxt module already scans `components/ui/`, so manual entries may cause double-registration.

**Architecture Strategist Review:**
- The config section should note the Zod version constraint: `@vee-validate/zod` requires `zod ^3.24.0`. If an agent tries to upgrade to Zod v4, forms will break. Add: "Zod version pinned to v3.x (peer dependency of @vee-validate/zod)."

---

### Section 10: Agent-Specific Directories

**Content strategy:** Keep the existing section but trim to essentials.

- `.claude/` -- Claude Code commands, skills, agents
- `.gemini/` -- Gemini instructions
- Other agent dirs as they exist

### Research Insights

**Agent-Native Review:**
- Expand this section to note: ".claude/skills/ contains domain-specific knowledge that Claude loads automatically. .claude/agents/ contains specialized review/refactoring agents. New skills should be added here rather than bloating CLAUDE.md."
- Consider listing the project-local skills: `code-reviewer`, `component-scaffolder`, `dependency-analyzer`, `design-token-validator`, `documentation-researcher`, `documentation-syncer`, `test-generator`.

---

### Section 11: SSR Safety Rules (NEW)

**Content strategy:** Dedicated section for SSR-specific pitfalls, extracted from recurring project learnings.

**Rules to codify:**

1. **No browser APIs without guards:** Never access `document.*`, `window.*`, or `navigator.*` without wrapping in `if (import.meta.client) { ... }`. This is Nuxt's idiomatic SSR guard.
2. **No `Math.random()` for IDs:** Use `useId()` (Vue 3.5+ / Nuxt) for deterministic, SSR-safe ID generation. Random IDs cause hydration mismatches that break accessibility bindings (`for`/`id`, `aria-describedby`).
3. **Post-install SSR audit:** After installing any shadcn-vue component, grep new files for `document.`, `window.`, `navigator.` and add guards.
4. **No `failOnError: false`:** Never suppress Nitro prerender errors globally. If specific routes fail prerendering, exclude those routes specifically in `routeRules`.

### Research Insights

**From Project Learnings (multiple):**
- SSR hydration issues were the #1 P1 severity pattern across all project learnings. The `Math.random()` ID issue broke label-input association AND aria-describedby references simultaneously.
- The `SidebarProvider.vue` `document.cookie` issue demonstrates that shadcn-vue generated code is NOT SSR-safe by default. This is a systemic risk every time a new component is installed.
- These rules warrant their own section in CLAUDE.md rather than being buried in component quality standards, because they apply to ALL code, not just components.

---

## Implementation Steps

1. **Read & verify** -- Confirm any remaining unknowns:
   - Run `pnpm eslint .` to verify the correct lint command
   - Check if DOMPurify is already a dependency (it is not in `package.json` -- the v-html rule should note it needs to be added: `pnpm add isomorphic-dompurify`)
   - Check `src/assets/css/tailwind.css` for composition layout utility names to list accurately
   - Check if there are any test files anywhere (the current CLAUDE.md references `src/tests/` which doesn't exist; check for `__tests__/`, `*.spec.ts`, `*.test.ts`)

2. **Write the new CLAUDE.md** -- Replace the entire file with the sections above. Target length: 200-250 lines (enough for completeness, short enough to be useful). If exceeding 200 lines, split design system rules into `.claude/skills/design-system-standards/SKILL.md`.

3. **Verify accuracy** -- After writing, spot-check every command, path, and component name against the actual codebase. Run each command to confirm it works.

### Research Insights

**Implementation Order Recommendation:**
- Step 1.5 (new): Install `isomorphic-dompurify` before writing CLAUDE.md, so the dependency exists when the rule references it. This resolves Open Question #1.
- Step 2.5 (new): After writing CLAUDE.md, check line count. If over 200, extract Sections 4-6 + 11 into a `.claude/skills/design-system-standards/SKILL.md` file.
- Step 3.5 (new): Run `pnpm run build` as a final verification -- catches any prerender errors that the new rules should prevent.

---

## Existing Violations to Flag

The new CLAUDE.md should be forward-looking (document the rules), but the implementer should be aware of existing violations that will need separate cleanup:

1. **`SummaryCard.vue` line 60-63:** `v-html="marked.parse(summary.tldr)"` without DOMPurify
2. **`src/pages/summaries/[slug].vue` lines 112-118:** Scoped `<style>` block with `.center` class (should be Tailwind utilities)
3. **`src/pages/summaries/[slug].vue` line 3:** Loading state is text-based ("Loading...") rather than skeleton
4. **`src/pages/tools/index.vue` line 59:** Loading state is text-based ("Loading tools...")
5. **`src/pages/tools/index.vue`:** Uses `<button>` and `<div>` for empty states instead of `<PageEmptyState>`

These violations should NOT block the CLAUDE.md rewrite -- they are cleanup items for a follow-up ticket.

### Research Insights

**Prioritized Violation Remediation (from Security Sentinel):**
- Violation #1 (v-html without sanitization) should be remediated BEFORE or IN the same PR as the CLAUDE.md rewrite, not deferred. It is an active XSS vector. If the content currently comes only from internal AI-generated summaries, the risk is lower -- but if any user-controllable input can influence `summary.tldr`, this is a P0.
- Violations #2-5 are P2/P3 and can safely be deferred.

**Additional Violations Discovered (from project learnings):**
6. **`components.json`:** Verify `"framework": "nuxt"` is present (may have been dropped by shadcn-vue CLI)
7. **`src/pages/` (multiple):** Check for stale `hero` meta in `definePageMeta()` if layout no longer reads `route.meta.hero`
8. **`transition: all`:** Grep for `transition: all` or `transition-all` across components -- should be specific properties only

---

## Open Questions (RESOLVED)

1. **DOMPurify dependency:** ~~Should the CLAUDE.md mandate adding DOMPurify now, or should it reference a follow-up ticket?~~
   **RESOLVED:** Mandate adding `isomorphic-dompurify` now (`pnpm add isomorphic-dompurify`). It is SSR-safe and works identically on server and client. The v-html sanitization fix should ideally ship in the same PR as the CLAUDE.md rewrite, given it is an active XSS concern.

2. **Skeleton vs text loading:** ~~How aggressive should the skeleton rule be?~~
   **RESOLVED:** Use skeletons universally. Tiered strategy:
   - List pages: full skeleton card grids
   - Detail pages: skeleton shaped to match content layout (title bar + body block + metadata)
   - Inline data: `<Skeleton class="h-4 w-12 inline-block" />`
   - No exceptions for "Loading..." text. The skeleton pattern provides better perceived performance, prevents layout shift, and is more accessible when paired with `aria-busy`.

3. **Scoped styles in pages:** ~~Should page-level `.vue` files be allowed scoped styles?~~
   **RESOLVED:** No scoped styles in `src/components/content/` or `src/pages/`. The only exception is `src/components/ui/` (shadcn-vue primitives that need scoped styles for their internal mechanics). If a page needs a unique layout that Tailwind cannot express, create a composition utility in `src/assets/css/tailwind.css` rather than a scoped style.

4. **Test directory:** ~~Should the new CLAUDE.md include a testing section?~~
   **RESOLVED:** Include a minimal testing section that documents the infrastructure (`vitest.config.ts`, `@nuxt/test-utils`) and the command (`pnpm vitest run`), but note that tests do not yet exist. Add: "When adding new composables or server API routes, add corresponding test files in a `__tests__/` directory adjacent to the source file." This sets the convention without pretending tests already exist.

---

## Estimated Effort

- Reading/verification: 15 minutes
- Installing isomorphic-dompurify: 5 minutes
- Writing the new CLAUDE.md: 30 minutes
- Extracting design system skill (if needed): 10 minutes
- Review and accuracy check: 15 minutes
- **Total: ~1.25 hours**

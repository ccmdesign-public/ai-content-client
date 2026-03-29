# AIC-51: Agent-Accessible Guides (llms.txt + Markdown Endpoints)

## Requirements Reference

See `docs/brainstorms/2026-03-28-agent-accessible-guides-requirements.md` for full requirements (R1-R12).

## Dependency

This feature ships alongside the tool guides redesign (AIC-50, route migration from `/tools/[slug]` to `/guides/[slug]`). The markdown endpoints serve the new two-section guide format. Implementation can proceed in parallel -- the server routes and build scripts here are additive and independent of the page redesign.

## Architecture Decisions

**1. Nitro server routes for all text endpoints.** `/llms.txt`, `/llms-full.txt`, `/guides.md`, and `/guides/[slug].md` are all Nitro server routes (files in `src/server/routes/`), not Nuxt pages. This is consistent with existing patterns (`sitemap.xml.ts`, `feed.xml.ts`, `digest.xml.ts`, `tools-with-stars.json.ts`) and gives full control over `Content-Type` headers. All four existing server routes follow the same pattern: `defineEventHandler`, `useRuntimeConfig()` for `siteUrl`, `setHeader()` for Content-Type and Cache-Control.

**2. Static `robots.txt` replaced with server route.** The current `src/public/robots.txt` is a static file with a **hardcoded placeholder domain** (`https://summaries.example.com`). Replace it with a Nitro server route (`src/server/routes/robots.txt.ts`) that reads the production domain from `runtimeConfig.public.siteUrl`. This keeps the domain in one place and allows dynamic AI crawler rules. The existing `robots.txt` also has `Disallow: /api/`, `Disallow: /_nuxt/`, and `Disallow: /__nuxt_error` rules that must be preserved.

**3. `llms-full.txt` generated at build time.** A build script produces the concatenated markdown file and writes it to `src/public/llms-full.txt` (or category-split files if >5MB). This avoids runtime cost for a potentially large file. Individual `.md` endpoints are server-rendered on demand since each is a single guide query.

**4. `TechArticle` JSON-LD schema.** `TechArticle` is the most semantically appropriate Schema.org type for tool guides. It extends `Article` with fields like `proficiencyLevel` and `dependencies` that map well to the guide content. **Note:** AIC-50's guide detail page currently uses `SoftwareApplication` for JSON-LD. This step replaces that with `TechArticle` which better fits the guide-as-article format (the page describes how to use a tool, not the tool itself).

**5. `<link rel="alternate">` via `useHead` in page component.** The guide detail page (`src/pages/guides/[slug].vue`) uses Nuxt's `useHead` composable to inject the `<link>` tag dynamically based on the current slug. The global `llms.txt` reference goes in `nuxt.config.ts` `app.head.link`.

**6. Prerender the text endpoints.** Add `/llms.txt`, `/guides.md` to `nitro.prerender.routes` so they are built as static files at deploy time. Individual `/guides/[slug].md` routes use ISR (same as the HTML guide pages) to balance freshness with performance.

---

## Implementation Plan

### Step 1: Update `robots.txt` (R8, R9)

Replace the static file with a dynamic server route.

- [ ] **Delete** `src/public/robots.txt`
- [ ] **Create** `src/server/routes/robots.txt.ts`

```
src/server/routes/robots.txt.ts
```

**Technical approach:**
- `defineEventHandler` that builds the robots.txt string
- Read `siteUrl` from `useRuntimeConfig().public.siteUrl` (confirmed: already configured in `src/nuxt.config.ts` line 41, defaults to `http://localhost:3000`, reads from `SITE_URL` env var)
- Set `Content-Type: text/plain` via `setHeader(event, 'Content-Type', 'text/plain')` (matches existing route patterns)
- Preserve existing rules from `src/public/robots.txt`:
  - `User-agent: *` / `Allow: /`
  - `Disallow: /api/`
  - `Disallow: /_nuxt/`
  - `Disallow: /__nuxt_error`
- Add new rules:
  - Explicit `User-agent` blocks for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` with `Allow: /`
  - `Sitemap: ${siteUrl}/sitemap.xml` (replaces hardcoded `https://summaries.example.com`)
  - `Llms-txt: ${siteUrl}/llms.txt` (non-standard but used by some crawlers)
- Cache: `setHeader(event, 'Cache-Control', 'public, max-age=86400')`

**Import pattern** (matches existing server routes -- no explicit imports needed due to Nitro auto-imports):
```ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl
  // ...
  setHeader(event, 'Content-Type', 'text/plain')
  setHeader(event, 'Cache-Control', 'public, max-age=86400')
  return robotsTxt
})
```

---

### Step 2: Create `/llms.txt` endpoint (R1, R2)

```
src/server/routes/llms.txt.ts
```

- [ ] **Create** `src/server/routes/llms.txt.ts`

**Technical approach:**
- Query all guides from the content collection (once guide collection exists from AIC-50)
- Group guides by category
- Build the llms.txt output following the convention:
  ```
  # AI Content Guides

  > Tool guides and technique references for AI developers.
  > Source: {siteUrl}

  ## Full Content

  - [All Guides (full text)]({siteUrl}/llms-full.txt)

  ## Guides by Category

  ### Tools & Productivity
  - [Claude Code]({siteUrl}/guides/claude-code.md): IDE-integrated AI coding assistant
  - [Cursor]({siteUrl}/guides/cursor.md): AI-first code editor
  ...

  ### Techniques
  - ...
  ```
- Set `Content-Type: text/plain; charset=utf-8`
- Add to `nitro.prerender.routes` in `src/nuxt.config.ts`

**Data source details:**

The AIC-51 worktree does **not** have the `guides` content collection (that lives in AIC-50). Two data sources are available:

1. **`tools.yml`** (`src/content/tools.yml`, ~585KB, 887 tools) -- YAML file with tool metadata. Read via `readFileSync` + `yaml` parse (same pattern as `tools-with-stars.json.ts`). Each tool has: `id`, `name`, `slug`, `description`, `category` (all are `"Tools & Productivity"`), `subcategory` (818 tools have one, ~120 distinct values like `"llm-provider"`, `"code-generation"`, `"agent-framework"`), `website`, `stats.videoCount`.
2. **`guides` collection** (from AIC-50, `content.config.ts`) -- Nuxt Content collection at `src/content/guides/*/guide.md`. Schema includes `toolSlug`, `title`, `category`, `description`, `rawAgentMarkdown`, `agentResources`. Currently only 1 guide exists (claude-code, ~6.7KB). Queried via `queryCollection(event, 'guides')` in server routes.

**Fallback strategy (before AIC-50 merges):** Use `tools.yml` parsed with `readFileSync` + `yaml` (matching the `tools-with-stars.json.ts` pattern). Import `readFileSync` from `node:fs`, `resolve` from `node:path`, and `parse as parseYaml` from `yaml`. Group by `subcategory` rather than `category` since all tools share a single category. After AIC-50 merges, switch data source to `queryCollection(event, 'guides').all()` and group by the guide's `category` field.

---

### Step 3: Create `/guides/[slug].md` endpoint (R4, R5, R6)

```
src/server/routes/guides/[slug].md.ts
```

- [ ] **Create** `src/server/routes/guides/[slug].md.ts`

**Nitro route naming confirmed:** The `[slug].md.ts` pattern works -- Nitro strips the `.ts` extension and keeps everything else as the route path. This is the same pattern as `feed.xml.ts` -> `/feed.xml`, `sitemap.xml.ts` -> `/sitemap.xml`, etc. No catch-all or manual extension parsing needed.

**Technical approach:**
- Extract `slug` from `getRouterParam(event, 'slug')` (preferred over `event.context.params.slug` -- matches AIC-50's `src/server/api/guides/[slug].json.ts` pattern)
- Query the guide content collection by slug: `queryCollection(event, 'guides').path(\`/guides/${slug}/guide\`).first()` (confirmed path pattern from AIC-50)
- **Fallback (pre-AIC-50):** parse `tools.yml` and find tool by slug, generate minimal markdown from tool metadata
- If not found, use `throw createError({ statusCode: 404, message: 'Guide not found' })` (matches AIC-50 error pattern)
- Build markdown output with source attribution header:
  ```markdown
  ---
  source: AI Content Guides
  url: {siteUrl}/guides/{slug}
  last_updated: {date}
  ---

  # {Guide Title}

  {Full guide content -- both human and agent sections}
  ```
- Set `Content-Type: text/markdown; charset=utf-8`
- Set `Cache-Control: public, max-age=3600` (matches ISR TTL on HTML pages)

**Route rule:** Add `/guides/**.md` ISR rule in `src/nuxt.config.ts`:
```ts
'/guides/**.md': { isr: 3600 },
```

---

### Step 4: Create `/guides.md` directory endpoint (R7)

```
src/server/routes/guides.md.ts
```

- [ ] **Create** `src/server/routes/guides.md.ts`

**Technical approach:**
- Query all guides, group by category
- Build a markdown directory:
  ```markdown
  # AI Content Guides Directory

  > {totalCount} guides available. Each guide covers what you need to know
  > as a human operator and what your AI agent needs to know.

  ## Tools & Productivity

  - [Claude Code](/guides/claude-code.md) -- IDE-integrated AI coding assistant
  - [Cursor](/guides/cursor.md) -- AI-first code editor
  ...
  ```
- Set `Content-Type: text/markdown; charset=utf-8`
- Add to `nitro.prerender.routes`

---

### Step 5: Build script for `/llms-full.txt` (R3)

```
scripts/build-llms-full.ts
```

- [ ] **Create** `scripts/build-llms-full.ts`
- [ ] **Update** `package.json` to add `prebuild` step (or extend existing prebuild)

**Technical approach:**
- Read all guide content files from `src/content/guides/*/guide.md` (or tools.yml pre-AIC-50)
- **Size estimate:** With tools.yml fallback (887 tools, ~200 bytes per tool entry = ~175KB) this is well under 5MB. With full guide content (currently 1 guide at ~6.7KB; projected ~50 guides at ~5KB average = ~250KB) also well under threshold. The 5MB split is a safety valve for future growth, not an immediate concern.
- Concatenate with section separators:
  ```markdown
  ---
  # Claude Code
  source: {siteUrl}/guides/claude-code
  ---

  {full guide content}

  ---
  # Cursor
  source: {siteUrl}/guides/cursor
  ---

  {full guide content}
  ```
- Write to `src/public/llms-full.txt`
- If output exceeds 5MB, split by category into `src/public/llms-tools.txt`, `src/public/llms-techniques.txt`, etc.
- Log file size and guide count to stdout

**Prebuild integration:** Add to the existing `prebuild` script chain in `package.json`. Current chain:
```
"prebuild": "tsx scripts/copy-transcripts.ts && tsx scripts/build-search-index.ts"
```
Append: `&& tsx scripts/build-llms-full.ts`. Also update `pregenerate` which has the same chain.

**Script should use the same tools.yml reading pattern as `tools-with-stars.json.ts`:**
```ts
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import type { ToolsYaml } from '../src/types/tools'
```

---

### Step 6: Global `<head>` tags for discoverability (R10, R11)

- [ ] **Update** `src/nuxt.config.ts` -- add `llms.txt` link to `app.head.link`

**In `src/nuxt.config.ts` `app.head.link` array, add:**
```ts
{ rel: 'author', type: 'text/plain', href: '/llms.txt' },
```

This makes `/llms.txt` discoverable from every page's HTML `<head>`.

---

### Step 7: Per-guide `<link rel="alternate">` and JSON-LD (R10, R12)

- [ ] **Update** `src/pages/guides/[slug].vue` (created in AIC-50) -- add `useHead` for markdown alternate link and JSON-LD

**Technical approach -- in the guide detail page's `<script setup>`:**

```ts
const config = useRuntimeConfig()
const route = useRoute()
const slug = route.params.slug as string
const canonicalUrl = `${config.public.siteUrl}/guides/${slug}`

useHead({
  link: [
    { rel: 'alternate', type: 'text/markdown', href: `/guides/${slug}.md` }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': guide.value?.title,
        'description': guide.value?.description,
        'url': canonicalUrl,
        'dateModified': guide.value?.updatedAt,
        'publisher': {
          '@type': 'Organization',
          'name': 'AI Content Guides'
        },
        'encoding': {
          '@type': 'MediaObject',
          'contentUrl': `${config.public.siteUrl}/guides/${slug}.md`,
          'encodingFormat': 'text/markdown'
        }
      })
    }
  ]
})
```

**AIC-50 dependency and merge conflict note:** This step depends on the guide detail page at `src/pages/guides/[slug].vue` from AIC-50. That page already has a `useHead` block with `SoftwareApplication` JSON-LD (lines 38-49). This step must **replace** that JSON-LD with `TechArticle` and **add** the `link rel="alternate"` entry. The `useSeoMeta` block (lines 30-35) should be preserved as-is. Coordinate with AIC-50 merge to avoid conflicts.

The AIC-50 guide detail page uses:
- `queryCollection('guides').path(\`/guides/${slug}/guide\`).first()` for guide content
- `useFetch<ToolWithStars[]>('/tools-with-stars.json')` for tool metadata (stars, GitHub links)
- `guide.value?.title`, `guide.value?.description`, `guide.value?.category` for computed SEO fields

---

### Step 8: Nuxt config updates (route rules, prerender)

- [ ] **Update** `src/nuxt.config.ts`

**Changes:**

1. Add prerender routes (in `nitro.prerender.routes`, currently `['/', '/feed.xml', '/digest.xml', '/sitemap.xml']`):
```ts
prerender: {
  crawlLinks: false,
  failOnError: true,
  routes: ['/', '/feed.xml', '/digest.xml', '/sitemap.xml', '/llms.txt', '/guides.md']
}
```

2. Add route rules for `.md` endpoints (in `routeRules`, add before the `'/**': { prerender: true }` catch-all):
```ts
'/guides/**.md': { isr: 3600 },
```

3. Add route rule for `robots.txt` (server-rendered, cached -- add before the catch-all):
```ts
'/robots.txt': { isr: 86400 },
```

**Important:** The `routeRules` order matters. The catch-all `'/**': { prerender: true }` at line 110 would match these new routes. Add the new rules **above** the catch-all to ensure they take precedence. Alternatively, verify Nitro applies more-specific rules first regardless of order (it does -- Nitro sorts by specificity, so order in config is cosmetic, but placing specific rules first improves readability).

---

### Step 9: Update sitemap to include new endpoints

- [ ] **Update** `src/server/routes/sitemap.xml.ts`

**Current sitemap structure** (verified): Uses a `SitemapUrl` interface with `loc`, `lastmod?`, `changefreq`, `priority` fields. Builds XML via `generateSitemapXml()` helper. Currently includes: `/`, `/summaries/`, `/tools`, individual summaries, newsletters, channels, and playlists.

**Add entries for** (push to the `urls` array):
```ts
// Agent-accessible guide endpoints
urls.push({ loc: '/guides.md', changefreq: 'daily', priority: 0.6 })
urls.push({ loc: '/llms.txt', changefreq: 'weekly', priority: 0.3 })
```

**Also update `/tools` entry to `/guides`** if AIC-50 has merged (the tools page moves to guides). Check for this at implementation time.

Individual `/guides/[slug].md` endpoints do not need sitemap entries -- the HTML guide pages are the canonical URLs for search engines.

---

### Step 10: Tests

- [ ] **Create** `src/tests/server/routes/llms-txt.test.ts`
- [ ] **Create** `src/tests/server/routes/guides-md.test.ts`
- [ ] **Create** `src/tests/server/routes/robots-txt.test.ts`
- [ ] **Create** `src/tests/scripts/build-llms-full.test.ts`

**Test coverage:**

| Test | Validates |
|---|---|
| `llms.txt` returns valid structure | R1, R2 -- correct headers, grouped links |
| `llms.txt` Content-Type is `text/plain` | R1 |
| `/guides/[slug].md` returns markdown with attribution | R4, R5 |
| `/guides/[slug].md` returns 404 for unknown slug | R4 |
| `/guides/[slug].md` Content-Type is `text/markdown` | R4 |
| `/guides.md` lists all guides grouped by category | R7 |
| `robots.txt` includes AI crawler rules | R8 |
| `robots.txt` uses production domain | R9 |
| `build-llms-full` produces valid concatenated file | R3 |
| `build-llms-full` splits at 5MB threshold | R3 |

---

## File Change Summary

| File | Action | Step |
|---|---|---|
| `src/public/robots.txt` | Delete | 1 |
| `src/server/routes/robots.txt.ts` | Create | 1 |
| `src/server/routes/llms.txt.ts` | Create | 2 |
| `src/server/routes/guides/[slug].md.ts` | Create | 3 |
| `src/server/routes/guides.md.ts` | Create | 4 |
| `scripts/build-llms-full.ts` | Create | 5 |
| `package.json` | Update (prebuild script) | 5 |
| `src/nuxt.config.ts` | Update (head, prerender, routeRules) | 6, 8 |
| `src/pages/guides/[slug].vue` | Update (useHead for link + JSON-LD) | 7 |
| `src/server/routes/sitemap.xml.ts` | Update | 9 |
| `src/tests/server/routes/llms-txt.test.ts` | Create | 10 |
| `src/tests/server/routes/guides-md.test.ts` | Create | 10 |
| `src/tests/server/routes/robots-txt.test.ts` | Create | 10 |
| `src/tests/scripts/build-llms-full.test.ts` | Create | 10 |
| `netlify.toml` | Update (add `.txt`/`.md` cache headers) | 8 |

## Implementation Order

Steps 1-5 are independent and can be implemented in any order. Steps 6-8 are config changes that can be batched. Step 7 depends on AIC-50 (guide detail page). Step 9 is a small addition. Step 10 (tests) should be written alongside each step.

Recommended sequence: **1 -> 2 -> 4 -> 3 -> 5 -> 6+8 -> 9 -> 7 -> 10**

This front-loads the endpoints that don't depend on per-guide content (robots, llms.txt, guides.md), then adds the per-guide endpoint, build script, and config. Step 7 (JSON-LD + alternate link) waits for the AIC-50 page.

## Open Questions -- Resolved

1. **Production domain.** RESOLVED. `runtimeConfig.public.siteUrl` is configured at `src/nuxt.config.ts:41` and reads from `SITE_URL` env var. `SITE_URL` is **not** set in `netlify.toml` -- it must be configured as a Netlify environment variable in the dashboard. Verify this before deploying. All four existing server routes already use `config.public.siteUrl` with an `|| 'http://localhost:3000'` fallback.

2. **Guide content source (pre-AIC-50).** RESOLVED. Use `tools.yml` fallback. The established pattern is in `tools-with-stars.json.ts`: `readFileSync(resolve(process.cwd(), 'src/content/tools.yml'))` + `parseYaml()`. Types at `~/types/tools` (`ToolsYaml`, `Tool`). After AIC-50 merges, switch to `queryCollection(event, 'guides')` with the schema at `content.config.ts` (includes `toolSlug`, `title`, `category`, `description`, `rawAgentMarkdown`).

3. **Nitro route file naming for `.md` extension.** RESOLVED. `[slug].md.ts` works. Confirmed by the existing Nitro v2.13.1 pattern: `feed.xml.ts` -> `/feed.xml`, `sitemap.xml.ts` -> `/sitemap.xml`, `tools-with-stars.json.ts` -> `/tools-with-stars.json`. Nitro strips the `.ts` extension and uses everything before it as the route path. No catch-all or manual parsing needed.

4. **`llms-full.txt` size with 800+ tools.** RESOLVED. Current `tools.yml` is ~585KB for 887 tools, but the llms-full output will be much smaller -- each tool entry in the markdown output is ~200 bytes (name + slug + one-line description), totaling ~175KB. Even with full guide content (1 guide at ~6.7KB; projected ~50 guides at ~5KB average = ~250KB combined), total is well under 5MB. The category-split threshold is a future-proofing safety valve, not an immediate concern.

## Open Questions -- New

5. **`netlify.toml` headers for `.txt` and `.md` responses.** The current `netlify.toml` has `[[headers]]` blocks for `/_nuxt/*` and `/summaries/*` and `/*.xml`. Consider adding headers for `/*.txt` (Content-Type: text/plain) and `/guides/*.md` (Content-Type: text/markdown). However, since the Nitro server routes set headers programmatically, Netlify headers may not override them for ISR/serverless routes. Test this during QA.

6. **Category grouping for `llms.txt` and `guides.md`.** All 887 tools in `tools.yml` share a single `category: "Tools & Productivity"`. Grouping by `category` produces one giant section. Use `subcategory` instead (818 tools have one, ~120 distinct values). After AIC-50 merges, guides use a richer `category` field (e.g., `"AI & ML"`) that provides better grouping.

---

## Research Findings

### Verified File Paths

| Referenced Path | Status | Notes |
|---|---|---|
| `src/public/robots.txt` | EXISTS | Contains hardcoded `https://summaries.example.com` placeholder |
| `src/server/routes/sitemap.xml.ts` | EXISTS | Uses `queryCollection(event, 'summaries')`, `SitemapUrl` interface |
| `src/server/routes/feed.xml.ts` | EXISTS | Uses `generateRssFeed` from `../utils/rss` |
| `src/server/routes/digest.xml.ts` | EXISTS | Uses `../utils/digest` helpers |
| `src/server/routes/tools-with-stars.json.ts` | EXISTS | Best reference for tools.yml reading pattern |
| `src/content/tools.yml` | EXISTS | ~585KB, 887 tools, all `category: "Tools & Productivity"` |
| `content.config.ts` | EXISTS | No `guides` collection in AIC-51 (only in AIC-50) |
| `src/nuxt.config.ts` | EXISTS | `siteUrl` at line 41, prerender routes at line 95, routeRules at line 99 |
| `package.json` | EXISTS | `prebuild` chain at line 6, `pregenerate` at line 9 |
| `src/pages/guides/[slug].vue` | NOT IN AIC-51 | Exists in AIC-50 worktree |
| `src/content/guides/` | NOT IN AIC-51 | Exists in AIC-50 worktree (1 guide: claude-code) |
| `scripts/build-llms-full.ts` | DOES NOT EXIST | To be created |

### Existing Server Route Patterns

All four existing server routes (`sitemap.xml.ts`, `feed.xml.ts`, `digest.xml.ts`, `tools-with-stars.json.ts`) follow identical conventions:
- `defineEventHandler(async (event) => { ... })` (auto-imported, no explicit import needed)
- `const config = useRuntimeConfig()` for runtime config (auto-imported)
- `config.public.siteUrl` for the site URL, with `|| 'http://localhost:3000'` fallback
- `setHeader(event, 'Content-Type', ...)` and `setHeader(event, 'Cache-Control', ...)` for response headers
- `queryCollection(event, 'collectionName')` for Nuxt Content queries (auto-imported)
- Return the response body directly (string for XML/text, object for JSON)

For tools.yml access specifically, `tools-with-stars.json.ts` uses:
```ts
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parse as parseYaml } from 'yaml'
import type { ToolsYaml, ToolWithStars } from '~/types/tools'

const toolsPath = resolve(process.cwd(), 'src/content/tools.yml')
const toolsYaml = readFileSync(toolsPath, 'utf-8')
const { tools: toolsMap } = parseYaml(toolsYaml) as ToolsYaml
```

### AIC-50 Guide Collection Schema

The AIC-50 `content.config.ts` defines a `guides` collection with:
- Source pattern: `guides/*/guide.md`
- Key fields: `toolSlug` (string), `title` (string), `category` (string), `description` (string), `rawAgentMarkdown` (string, optional), `agentResources` (array of typed objects), `generatedAt` (string), `generatedFrom` (object with summaryCount/articleCount)
- Query patterns used in AIC-50:
  - List: `queryCollection('guides').select('toolSlug', 'description', 'path').all()`
  - Detail: `queryCollection('guides').path(\`/guides/${slug}/guide\`).first()`
  - Server-side: `(queryCollection as any)(event, 'guides').path(...).first()` (cast needed in server routes)

### Tools.yml Data Structure

- 887 tools total, all with `category: "Tools & Productivity"` (single category)
- 818 tools have a `subcategory` field with ~120 distinct values (e.g., `llm-provider` (46), `workflow-automation` (42), `code-generation` (18), `agent-framework` (16))
- Each tool has: `id`, `name`, `slug`, `description` (often null), `website`, `github`, `stats.videoCount`, `videos[]`
- Types defined at `src/types/tools.ts`: `Tool`, `ToolWithStars`, `ToolsYaml`
- `categorizeTools.ts` utility at `src/utils/categorizeTools.ts` provides a different categorization system (7 categories like `"AI & ML"`, `"Developer Tools"`, `"Frameworks"`) based on tool name matching. This could be used for grouping in llms.txt/guides.md but only covers ~130 known tool names.

### Risks and Edge Cases

1. **`queryCollection` type cast in server routes.** AIC-50 uses `(queryCollection as any)(event, 'guides')` in server routes because the auto-import types don't include the `guides` collection until `nuxt prepare` runs with the updated `content.config.ts`. This cast is needed for any new server routes that query guides.

2. **`tools.yml` read via `process.cwd()` is fragile.** The `tools-with-stars.json.ts` route uses `resolve(process.cwd(), 'src/content/tools.yml')` which works for the Netlify serverless preset but may break if the CWD changes. Consider using `import.meta.url` + `fileURLToPath` for a more robust path resolution (matching the pattern in `nuxt.config.ts`).

3. **Prerender of `/llms.txt` and `/guides.md` will fail if tools.yml or guides collection is empty.** Add a guard in the handlers to return a minimal valid response if no data is available, rather than throwing.

4. **`robots.txt` ISR rule vs. prerender catch-all.** The `'/**': { prerender: true }` catch-all in routeRules will attempt to prerender `/robots.txt` at build time. The explicit `'/robots.txt': { isr: 86400 }` rule should take precedence (Nitro sorts by specificity), but verify this doesn't cause a build-time prerender attempt that fails.

5. **887 tools in `llms.txt` is a lot of links.** While the file size is manageable (~175KB), the sheer number of entries may overwhelm LLM context windows. Consider limiting the llms.txt to the top ~100 tools by videoCount and linking to `/guides.md` for the full list. Alternatively, group by subcategory with collapsed sections.

6. **Many tools have `description: null`.** Of 887 tools, many lack descriptions. The llms.txt entry format `[Tool Name](url): description` will show `null` or empty for these. Add a fallback: use `"Mentioned in {videoCount} videos"` or similar when description is null.

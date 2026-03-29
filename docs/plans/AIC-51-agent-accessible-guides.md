# AIC-51: Agent-Accessible Guides (llms.txt + Markdown Endpoints)

## Requirements Reference

See `docs/brainstorms/2026-03-28-agent-accessible-guides-requirements.md` for full requirements (R1-R12).

## Dependency

This feature ships alongside the tool guides redesign (AIC-50, route migration from `/tools/[slug]` to `/guides/[slug]`). The markdown endpoints serve the new two-section guide format. Implementation can proceed in parallel -- the server routes and build scripts here are additive and independent of the page redesign.

## Architecture Decisions

**1. Nitro server routes for all text endpoints.** `/llms.txt`, `/llms-full.txt`, `/guides.md`, and `/guides/[slug].md` are all Nitro server routes (files in `src/server/routes/`), not Nuxt pages. This is consistent with existing patterns (`sitemap.xml.ts`, `feed.xml.ts`) and gives full control over `Content-Type` headers.

**2. Static `robots.txt` replaced with server route.** The current `src/public/robots.txt` is a static file with a placeholder domain. Replace it with a Nitro server route (`src/server/routes/robots.txt.ts`) that reads the production domain from `runtimeConfig.public.siteUrl`. This keeps the domain in one place and allows dynamic AI crawler rules.

**3. `llms-full.txt` generated at build time.** A build script produces the concatenated markdown file and writes it to `src/public/llms-full.txt` (or category-split files if >5MB). This avoids runtime cost for a potentially large file. Individual `.md` endpoints are server-rendered on demand since each is a single guide query.

**4. `TechArticle` JSON-LD schema.** `TechArticle` is the most semantically appropriate Schema.org type for tool guides. It extends `Article` with fields like `proficiencyLevel` and `dependencies` that map well to the guide content.

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
- Read `siteUrl` from `useRuntimeConfig().public.siteUrl`
- Set `Content-Type: text/plain`
- Include rules:
  - `User-agent: *` with existing `Allow` / `Disallow` rules
  - Explicit `User-agent` blocks for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` with `Allow: /`
  - `Sitemap:` directive with production URL
  - `Llms-txt:` directive pointing to `/llms.txt` (non-standard but used by some crawlers)
- Cache: `Cache-Control: public, max-age=86400`

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

**Fallback (before AIC-50 guide collection exists):** Query `tools.yml` data and generate entries from the existing tools directory. The endpoint shape stays the same; only the data source changes when guides land.

---

### Step 3: Create `/guides/[slug].md` endpoint (R4, R5, R6)

```
src/server/routes/guides/[slug].md.ts
```

- [ ] **Create** `src/server/routes/guides/[slug].md.ts`

**Technical approach:**
- Extract `slug` from `event.context.params.slug`
- Query the guide content collection by slug (or fall back to tools.yml data pre-AIC-50)
- If not found, return 404 with plain text body
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
- Read all guide content files from `src/content/guides/` (or tools.yml pre-AIC-50)
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

**Prebuild integration:** Add to the existing `prebuild` script chain in `package.json` (currently runs `copy-transcripts` + `build-search-index`).

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

This step depends on the guide detail page existing from AIC-50. If AIC-50 is not yet merged, add a TODO comment in the plan and implement when the page is available.

---

### Step 8: Nuxt config updates (route rules, prerender)

- [ ] **Update** `src/nuxt.config.ts`

**Changes:**

1. Add prerender routes:
```ts
prerender: {
  routes: ['/', '/feed.xml', '/digest.xml', '/sitemap.xml', '/llms.txt', '/guides.md']
}
```

2. Add route rules for `.md` endpoints:
```ts
'/guides/**.md': { isr: 3600 },
```

3. Add route rule for `robots.txt` (server-rendered, cached):
```ts
'/robots.txt': { isr: 86400 },
```

---

### Step 9: Update sitemap to include new endpoints

- [ ] **Update** `src/server/routes/sitemap.xml.ts`

**Add entries for:**
- `/guides.md` (changefreq: daily, priority: 0.6)
- `/llms.txt` (changefreq: weekly, priority: 0.3)

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

## Implementation Order

Steps 1-5 are independent and can be implemented in any order. Steps 6-8 are config changes that can be batched. Step 7 depends on AIC-50 (guide detail page). Step 9 is a small addition. Step 10 (tests) should be written alongside each step.

Recommended sequence: **1 -> 2 -> 4 -> 3 -> 5 -> 6+8 -> 9 -> 7 -> 10**

This front-loads the endpoints that don't depend on per-guide content (robots, llms.txt, guides.md), then adds the per-guide endpoint, build script, and config. Step 7 (JSON-LD + alternate link) waits for the AIC-50 page.

## Open Questions for Implementer

1. **Production domain.** `runtimeConfig.public.siteUrl` currently defaults to `http://localhost:3000`. The production domain must be set via `SITE_URL` env var before the `robots.txt` and `llms.txt` endpoints produce correct absolute URLs. Confirm the production domain is configured in Netlify env vars.

2. **Guide content source (pre-AIC-50).** Until the guides content collection exists, the server routes need a data source. Two options: (a) query `tools.yml` and generate minimal markdown from tool descriptions, or (b) defer all endpoints until AIC-50 lands. Recommendation: implement with `tools.yml` fallback so the infrastructure is testable immediately.

3. **Nitro route file naming for `.md` extension.** Nitro uses file-based routing. A file named `[slug].md.ts` should serve routes matching `/guides/foo.md`. Verify this works with Nitro's route matching -- if not, use `[...slug].ts` with manual extension parsing or a catch-all pattern.

4. **`llms-full.txt` size with 800+ tools.** Each tool entry with full guide content could produce a large file. Estimate the output size early in implementation and plan the category-split threshold accordingly.

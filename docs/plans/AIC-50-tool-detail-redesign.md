# AIC-50: Redesign Tool Detail Pages — Human/Agent Dual-Section Format

## Current State Analysis

### What exists today

The tools system is a **directory-only implementation** — there are no tool detail pages. The current surface area:

| File | Purpose |
|---|---|
| `src/pages/tools/index.vue` | List page: search, sort (mentions/alpha/stars), infinite scroll |
| `src/composables/useToolsDirectory.ts` | Data loading + filtering composable. Fetches `/tools-with-stars.json` |
| `src/components/content/ToolCard.vue` | Expandable `<details>` card: name, stars badge, website/GitHub links, video list |
| `src/components/content/ToolsSearch.vue` | Search input with ARIA live region |
| `src/components/content/ToolsFilters.vue` | Sort selector (mentions, alpha, stars) |
| `src/server/routes/tools-with-stars.json.ts` | Server route: reads `tools.yml`, enriches with GitHub stars, returns JSON |
| `src/content/tools.yml` | YAML data file: 887 tools with metadata, stats, videos, related tools |
| `src/utils/categorizeTools.ts` | Utility mapping tools to categories (AI & ML, Developer Tools, etc.) |
| `src/types/tools.ts` | TypeScript interfaces: Tool, ToolWithStars, ToolsYaml |

Key observations:
- **No `/tools/[slug]` route exists** — ToolCard expands inline on the index page
- **No content collection for tools** — tools.yml is read at build time by a server route, not via `@nuxt/content`
- **No 3-tier content exists to discard** — the "beginner/intermediate/advanced" model referenced in the requirements was planned but never built
- The ToolCard links videos to `/summaries/[id]` but has no tool detail link
- `categorizeTools.ts` has a hardcoded category map but is only used on summary detail pages
- The sitemap includes `/tools` at line 60 with priority 0.9
- **Navigation**: `AppSidebar.vue` has a `/tools` link in `<SidebarFooter>` (line 141) — this is the only nav link to `/tools`
- **Route rules**: `/tools` currently has `isr: 3600` in `src/nuxt.config.ts` (line 105)

### Verified codebase patterns

From reading the actual codebase, the following patterns are confirmed and must be followed:

**Detail page pattern** (from `src/pages/summaries/[slug].vue`):
```ts
const route = useRoute()
const slug = route.params.slug as string
const { data, pending, error, refresh } = useAsyncData(
  `collection-${slug}`,
  () => queryCollection('collectionName').path(`/path/${slug}/file`).first()
)
```

**State handling order** (consistent across all pages):
1. `v-if="pending"` — Skeleton components, never "Loading..." text
2. `v-else-if="error"` — `<PageErrorState message="..." @retry="refresh()" />`
3. `v-else-if="!data"` — `<PageNotFound icon="..." title="..." message="..." link-to="..." link-text="..." />`
4. `v-else` — main content

**Content rendering**: `<ContentRenderer :value="data" class="prose prose-zinc dark:prose-invert max-w-none" />`

**SEO**: `useSeoMeta({ title, description, ogTitle, ogDescription })` (see `src/pages/tools/index.vue` line 7)

**Components are auto-imported** — no manual imports needed for `PageNotFound`, `PageErrorState`, `PageEmptyState`, `Skeleton`, `NuxtLink`, `ContentRenderer`

**shadcn-vue components** require explicit imports: `import { Badge } from '@/components/ui/badge'` etc.

### Content pipeline (scraper repo)

Per requirements R9/R20, the generation pipeline lives in the scraper repo. This plan covers the **client-side** changes only. Where scraper integration is needed, the plan specifies the expected contract (content format, file structure).

---

## New Content Schema

### Content collection: `guides`

Add a new `@nuxt/content` collection in `content.config.ts` for generated guide pages.

**Directory structure:**
```
src/content/guides/
  claude-code/
    guide.md          # Full guide content (both sections in one file)
  cursor/
    guide.md
  ...
```

**Frontmatter schema (Zod):**

> **IMPORTANT**: Zod must stay on v3.x (pinned by `@vee-validate/zod` peer dependency — see CLAUDE.md).

```ts
const guideAgentResourceSchema = z.object({
  type: z.enum(['mcp-server', 'cli', 'skill-folder', 'repo', 'config-example', 'primer-prompt']),
  name: z.string(),
  source: z.string().optional(),           // e.g., "smithery.ai", "GitHub"
  url: z.string().url().optional(),
  installCommand: z.string().optional(),   // e.g., "npx @anthropic-ai/claude-code"
  content: z.string().optional(),          // For primer prompts / config snippets
})

const guideSchema = z.object({
  // Identity
  toolSlug: z.string(),                    // Links back to tools.yml entry
  title: z.string(),                       // Display title, e.g., "Claude Code"
  category: z.string(),                    // From tools.yml category

  // Human section metadata
  humanSubsections: z.array(z.enum([
    'overview', 'how-it-works',            // Always present (core)
    'best-practices', 'common-pitfalls',   // Optional
    'workflows', 'integrations'            // Optional
  ])),

  // Agent section metadata
  agentResources: z.array(guideAgentResourceSchema).default([]),
  agentResourceGaps: z.array(z.string()).default([]),  // e.g., ["No MCP server found", "No CLI available"]

  // Generation metadata
  generatedAt: z.string(),
  generatedFrom: z.object({
    summaryCount: z.number(),
    articleCount: z.number(),
  }),

  // SEO
  description: z.string(),
})
```

**Registration in `content.config.ts`** (follows exact pattern of existing collections):

```ts
// Add inside the collections object, after the existing `tags` collection:
guides: defineCollection({
  type: 'page',                          // 'page' enables ContentRenderer + markdown body
  source: {
    include: 'guides/*/guide.md',        // Matches src/content/guides/claude-code/guide.md
    cwd: contentDir                       // Uses the shared contentDir variable (line 7)
  },
  schema: guideSchema                    // Defined above
})
```

**Path resolution**: With `include: 'guides/*/guide.md'`, Nuxt Content will generate paths like `/guides/claude-code/guide`. The detail page query must use this full path:
```ts
queryCollection('guides').path(`/guides/${slug}/guide`).first()
```

**Markdown body structure:**
The markdown body contains both sections using `## What you need to know` and `## What your agent needs to know` as H2 delimiters. Within the human section, subsections use H3 (`### Overview`, `### How It Works`, etc.). The agent section uses H3 for resource types (`### Primer Prompts`, `### Installation`, `### Configuration Examples`).

This keeps the content as standard markdown renderable by `<ContentRenderer>` while the frontmatter provides structured metadata for programmatic access.

### Preserving tools.yml

`tools.yml` continues to serve as the tools directory data source. The new `guides` collection is a **superset** — only tools with generated guides get a `guide.md`. The index page shows all 887+ tools from `tools.yml` regardless of guide availability, with guides linked when they exist.

**Linking mechanism**: The `toolSlug` frontmatter field in each guide matches the key in `tools.yml` (e.g., `claude-code`). The `tools.yml` already has `slug` fields on every tool that match the directory key (verified: `claude-code`, `model-context-protocol`, `git`, etc.).

---

## Route Changes

### New routes

| Route | File | Purpose |
|---|---|---|
| `/guides` | `src/pages/guides/index.vue` | Guide directory (replaces `/tools`) |
| `/guides/[slug]` | `src/pages/guides/[slug].vue` | Individual guide detail page |

### Redirects

Add to `routeRules` in `src/nuxt.config.ts`:

```ts
routeRules: {
  // ... existing rules ...

  // Redirect old /tools route to /guides (replace the existing '/tools': { isr: 3600 } rule)
  '/tools': { redirect: { to: '/guides', statusCode: 301 } },

  // Guide pages: ISR with 1-hour cache (same pattern as summaries)
  '/guides': { isr: 3600 },
  '/guides/**': { isr: 3600 },
}
```

> **CORRECTION from original plan**: The `/tools/**` wildcard redirect (`'/tools/**': { redirect: { to: '/guides/**', statusCode: 301 } }`) will NOT work in Nuxt `routeRules`. Nuxt/Nitro route rules do not support dynamic path segment forwarding via wildcards. Since there are no existing `/tools/[slug]` routes in production and no external links to `/tools/[anything]`, this redirect is unnecessary. If needed later, implement via a Nitro server middleware:
> ```ts
> // src/server/middleware/tools-redirect.ts
> export default defineEventHandler((event) => {
>   const path = getRequestURL(event).pathname
>   if (path.startsWith('/tools/')) {
>     return sendRedirect(event, path.replace('/tools/', '/guides/'), 301)
>   }
> })
> ```

### Sitemap update

In `src/server/routes/sitemap.xml.ts`:

1. Replace the static `/tools` entry (line 59-63) with `/guides`:
```ts
// Before:
urls.push({ loc: '/tools', changefreq: 'daily', priority: 0.9 })

// After:
urls.push({ loc: '/guides', changefreq: 'daily', priority: 0.9 })
```

2. Add individual guide URLs by querying the `guides` collection:
```ts
// After the newsletters loop, add:
const guides = await queryCollection(event, 'guides').all()
for (const guide of guides) {
  // guide.stem will be "guides/claude-code/guide" — extract the slug
  const slug = guide.stem.replace(/^guides\//, '').replace(/\/guide$/, '')
  urls.push({
    loc: `/guides/${slug}`,
    lastmod: guide.generatedAt || undefined,
    changefreq: 'weekly',
    priority: 0.8
  })
}
```

### Navigation updates

**`src/components/AppSidebar.vue`** — line 141: Change `/tools` to `/guides` and update the label:
```vue
<!-- Before -->
<NuxtLink to="/tools" class="text-sm text-muted-foreground hover:text-foreground">
  Tools
</NuxtLink>

<!-- After -->
<NuxtLink to="/guides" class="text-sm text-muted-foreground hover:text-foreground">
  Guides
</NuxtLink>
```

This is the **only** navigation component linking to `/tools` (verified by grep).

---

## Component Architecture

### New components

#### 1. `src/pages/guides/[slug].vue` — Guide detail page

Follows the established detail page pattern from `src/pages/summaries/[slug].vue`:

```vue
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Star, Github, Link as LinkIcon, ArrowLeft } from 'lucide-vue-next'
import type { ToolWithStars } from '~/types/tools'

definePageMeta({ footer: false })

const route = useRoute()
const slug = route.params.slug as string

// 1. Load guide content from collection
const { data: guide, pending: guidePending, error: guideError, refresh } = useAsyncData(
  `guide-${slug}`,
  () => queryCollection('guides').path(`/guides/${slug}/guide`).first()
)

// 2. Load tool metadata (stars, links, videos) from server route
const { data: allTools } = useFetch<ToolWithStars[]>('/tools-with-stars.json', {
  key: 'tools-directory'  // Reuses cache if tools page was visited first
})

// 3. Merge: find the matching tool by slug
const tool = computed(() => allTools.value?.find(t => t.slug === slug) || null)

// Combined loading state
const pending = computed(() => guidePending.value)
const error = computed(() => guideError.value)

// SEO
useSeoMeta({
  title: computed(() => guide.value ? `${guide.value.title} Guide` : 'Guide'),
  description: computed(() => guide.value?.description || ''),
  ogTitle: computed(() => guide.value ? `${guide.value.title} Guide` : 'Guide'),
  ogDescription: computed(() => guide.value?.description || ''),
})
</script>
```

**Template state handling** follows the established pattern:
```vue
<template>
  <section class="py-8">
    <!-- Loading skeleton -->
    <div v-if="pending" aria-busy="true" aria-label="Loading guide">
      <div class="max-w-[80ch] mx-auto px-4 space-y-4">
        <Skeleton class="h-4 w-32" />
        <Skeleton class="h-8 w-3/4" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-5/6" />
        <Skeleton class="h-64 w-full rounded-lg" />
      </div>
    </div>
    <PageErrorState v-else-if="error" message="Failed to load this guide." @retry="refresh()" />
    <PageNotFound
      v-else-if="!guide"
      icon="help_outline"
      title="Guide not found"
      message="We couldn't find the guide you're looking for."
      link-to="/guides"
      link-text="Browse all guides"
    />
    <div v-else>
      <!-- Guide content -->
    </div>
  </section>
</template>
```

Layout wireframe:
```
┌─────────────────────────────────────────┐
│  [Back to guides]                       │
│                                         │
│  Tool Name                    ★ 45.2k   │
│  Category badge   Website   GitHub      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ## What you need to know               │
│                                         │
│  ### Overview                           │
│  ...                                    │
│  ### How It Works                       │
│  ...                                    │
│  ### Best Practices  (if present)       │
│  ...                                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ## What your agent needs to know       │
│  [Copy .md]                             │
│                                         │
│  ### Primer Prompts                     │
│  ```                                    │
│  You are an expert...                   │
│  ```                                    │
│  ### Installation                       │
│  MCP server: ...                        │
│  CLI: ...                               │
│  ### Configuration Examples             │
│  CLAUDE.md entry: ...                   │
│                                         │
│  ⚠ Gaps: No CLI found for this tool    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Related videos (from tools.yml data)   │
│  Related tools                          │
│                                         │
└─────────────────────────────────────────┘
```

#### 2. `src/components/content/GuideHumanSection.vue`

Renders the human-facing section. Receives the rendered markdown content for the human section. Uses `<ContentRenderer>` or receives pre-parsed HTML.

**Props interface:**
```ts
defineProps<{
  guide: any  // The full guide content object from queryCollection
}>()
```

> **Implementation note**: Since `<ContentRenderer>` renders the entire markdown body, you cannot directly render "just the human section" with it. Two approaches:
> - **(Recommended) Render the full body with `<ContentRenderer>`** and use CSS/structural design to visually separate sections. The H2 headings act as natural section dividers.
> - (Alternative) Parse the raw markdown body client-side and split on the `## What your agent needs to know` heading. This requires accessing `guide.body` (the AST) and filtering nodes.

#### 3. `src/components/content/GuideAgentSection.vue`

Renders the agent-facing section with:
- Rendered markdown content
- "Copy .md" button (copies raw markdown of the agent section)
- Gap warnings when `agentResourceGaps` is non-empty
- Code blocks for primer prompts and configs

**Props interface:**
```ts
defineProps<{
  agentResources: Array<{
    type: string
    name: string
    source?: string
    url?: string
    installCommand?: string
    content?: string
  }>
  agentResourceGaps: string[]
}>()
```

#### 4. `src/components/content/GuideCopyButton.vue`

Copy-to-clipboard button. Uses `navigator.clipboard` with `import.meta.client` guard per SSR safety rules.

**Props interface:**
```ts
defineProps<{
  text: string        // The markdown text to copy
  label?: string      // Button label, defaults to "Copy .md"
}>()
```

**Implementation:**
```ts
import { Copy, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const copied = ref(false)

async function copyToClipboard() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}
```

#### 5. `src/components/content/GuideCard.vue`

Card component for the index page. Shows tools that have guides with a link to the detail page.

**Props interface:**
```ts
import type { ToolWithStars } from '~/types/tools'

defineProps<{
  tool: ToolWithStars
  guideDescription: string
  guideSlug: string
}>()
```

**Pattern**: Follows `ToolCard.vue` styling patterns — uses `Badge` from shadcn, Lucide icons (`Star`, `ChevronRight`), Tailwind-only layout. Links via `<NuxtLink :to="\`/guides/${guideSlug}\`">`.

#### 6. `src/pages/guides/index.vue` — Guide directory page

Merges two data sources:
- `tools.yml` data (all 887+ tools) via `/tools-with-stars.json`
- `guides` collection (only tools with generated guides)

**Data fetching pattern:**
```ts
// Reuse existing composable for tools data
const { displayedTools, pending, error, /* ... */ } = useToolsDirectory()

// Additionally load guides to know which tools have guides
const { data: guides } = useAsyncData(
  'guides-index',
  () => queryCollection('guides').select('toolSlug', 'description', 'path').all()
)

// Create a lookup map: toolSlug -> guide info
const guideLookup = computed(() => {
  const map = new Map<string, { description: string; path: string }>()
  for (const g of guides.value || []) {
    map.set(g.toolSlug, { description: g.description, path: g.path })
  }
  return map
})
```

Display logic:
- Tools **with** guides: show as `GuideCard` with link to detail page
- Tools **without** guides: show as current `ToolCard` (expandable, no detail link) — preserves directory functionality per R15

Supports filtering by category (tools, techniques, skills) and search/sort (carried over from current implementation).

### Existing components to modify

| Component | Change |
|---|---|
| `ToolCard.vue` | Add optional `guideUrl` prop — when present, shows a "View guide" link alongside the tool name. **New prop**: `guideUrl?: string` |
| `ToolsSearch.vue` | Update placeholder text from "Search tools..." to "Search guides & tools..." (line 52: `placeholder="Search tools..."`) |
| `ToolsFilters.vue` | Add category filter option. The component already has a `<slot name="filters" />` (line 53) for future filters. Use this slot from the parent page rather than modifying the component. |
| `useToolsDirectory.ts` | No change needed — the guides index page will compose `useToolsDirectory()` with a separate guides query rather than extending this composable. |

### Composables

#### `src/composables/useGuideCopyMarkdown.ts`

Extracts the agent section markdown from the full guide content and provides a `copy()` function.

**Signature:**
```ts
export function useGuideCopyMarkdown(guideBody: Ref<any>) {
  const agentMarkdown = computed(() => {
    // Extract from the AST body or raw content
    // Split on "## What your agent needs to know" heading
  })

  const copied = ref(false)

  async function copy() {
    if (!import.meta.client || !agentMarkdown.value) return
    await navigator.clipboard.writeText(agentMarkdown.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }

  return { agentMarkdown, copied, copy }
}
```

> **Challenge**: `@nuxt/content` v3 stores the body as an AST, not raw markdown. To extract raw markdown for the copy button, you need either:
> 1. Store the agent section as a separate frontmatter field (adds content generation complexity)
> 2. Reconstruct markdown from the AST (fragile)
> 3. **Recommended**: Fetch the raw `.md` file via `$fetch('/api/_content/guides/[slug]/guide.md')` or include a `rawAgentMarkdown` field in frontmatter during generation

#### `src/composables/useGuidesDirectory.ts`

**Not needed** — the guides index page can compose `useToolsDirectory()` with a `useAsyncData` call for guides. Creating a separate composable would duplicate the tools loading logic. Instead, the index page handles the merge inline (see section 6 above).

---

## Structured Data Endpoint (R12)

### API route: `src/server/api/guides/[slug].json.ts`

```ts
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required' })
  }

  // Query the guide from the content collection
  const guide = await queryCollection(event, 'guides')
    .path(`/guides/${slug}/guide`)
    .first()

  if (!guide) {
    throw createError({ statusCode: 404, message: 'Guide not found' })
  }

  // Return structured JSON
  return {
    tool: guide.toolSlug,
    title: guide.title,
    category: guide.category,
    description: guide.description,
    agentResources: guide.agentResources,
    agentResourceGaps: guide.agentResourceGaps,
    metadata: {
      generatedAt: guide.generatedAt,
      sourceCount: guide.generatedFrom,
    }
  }
})
```

**Cache headers**: Set by the `/api/**` route rule (currently `{ prerender: false }`) — these are serverless functions. Consider adding a cache header in the handler:
```ts
setHeader(event, 'Cache-Control', 'public, max-age=3600')
```

Also embed JSON-LD on the guide detail page for SEO (SoftwareApplication schema):
```ts
// In the guide detail page <script setup>
useHead({
  script: computed(() => guide.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: guide.value.title,
      applicationCategory: guide.value.category,
      description: guide.value.description,
    })
  }] : [])
})
```

---

## Content Generation Pipeline (Scraper Repo)

This section documents the **expected contract** between the scraper and client. Implementation of the pipeline is out of scope for this issue but must produce content matching the schema above.

### Expected pipeline flow

1. **Topic selection**: Use existing tools.yml as the topic inventory (887 tools)
2. **Content aggregation**: For each tool, gather all linked summaries + articles
3. **Agent resource discovery**: Search skill repos/catalogs for MCP servers, CLIs, configs (R6)
4. **Guide generation**: AI generates the two-section guide using a base prompt (R7) + optional topic-specific prompt (R8)
5. **Output**: Write `guide.md` files to `src/content/guides/[slug]/guide.md` in the client repo

### Pilot approach

Start with one tool (Claude Code) to validate:
- The content schema works with `@nuxt/content`
- The detail page renders correctly
- The copy button produces clean markdown
- The JSON endpoint returns well-structured data

---

## Migration Strategy

### Phase 1: Foundation (this PR)

**Goal**: Guides collection + detail page + pilot content, no changes to existing tools page.

1. Add `guides` collection to `content.config.ts`
   - File: `content.config.ts` (add after `tags` collection, line ~133)
   - Add `guideAgentResourceSchema` and `guideSchema` Zod schemas
   - Add `guides: defineCollection({ type: 'page', source: { include: 'guides/*/guide.md', cwd: contentDir }, schema: guideSchema })`
   - Run `pnpm run postinstall` to regenerate `.nuxt` types

2. Create guide types
   - File: `src/types/guides.ts` (new)
   - Export interfaces matching the Zod schema for use in components

3. Create pilot guide content
   - File: `src/content/guides/claude-code/guide.md` (new)
   - Hand-write based on existing 85 video summaries that mention Claude Code
   - Must include valid frontmatter matching the schema

4. Create detail page
   - File: `src/pages/guides/[slug].vue` (new)
   - Follow `summaries/[slug].vue` pattern exactly
   - Use `useAsyncData` + `queryCollection('guides')`
   - Merge with `/tools-with-stars.json` for stars/links

5. Create supporting components
   - `src/components/content/GuideHumanSection.vue` (new)
   - `src/components/content/GuideAgentSection.vue` (new)
   - `src/components/content/GuideCopyButton.vue` (new)

6. Create composable
   - `src/composables/useGuideCopyMarkdown.ts` (new)

7. Create API endpoint
   - `src/server/api/guides/[slug].json.ts` (new)

8. Add route rules for `/guides/**`
   - File: `src/nuxt.config.ts` — add ISR rules for `/guides` and `/guides/**`
   - Do NOT add `/tools` redirect yet (that's Phase 2)

### Phase 2: Index page migration

**Goal**: Replace `/tools` with `/guides` as the primary directory.

1. Create guides index page
   - File: `src/pages/guides/index.vue` (new)
   - Compose `useToolsDirectory()` + guides query

2. Create GuideCard component
   - File: `src/components/content/GuideCard.vue` (new)

3. Modify ToolCard
   - File: `src/components/content/ToolCard.vue`
   - Add optional `guideUrl` prop

4. Update navigation
   - File: `src/components/AppSidebar.vue` — change line 141 `/tools` to `/guides`

5. Update sitemap
   - File: `src/server/routes/sitemap.xml.ts` — replace `/tools` entry, add guide URLs

6. Add redirect
   - File: `src/nuxt.config.ts` — replace `'/tools': { isr: 3600 }` with `'/tools': { redirect: { to: '/guides', statusCode: 301 } }`

7. Update search placeholder
   - File: `src/components/content/ToolsSearch.vue` — line 52

### Phase 3: Content generation (scraper repo, separate issue)
1. Build the generation pipeline
2. Generate guides for top tools
3. Roll out progressively

### What gets deleted (eventually)
- `src/pages/tools/index.vue` — replaced by `src/pages/guides/index.vue`
- The `/tools` ISR route rule — replaced by redirect + `/guides` rule

### What stays
- `src/content/tools.yml` — still the directory data source
- `src/server/routes/tools-with-stars.json.ts` — still enriches tool data
- `src/types/tools.ts` — still used
- `src/utils/categorizeTools.ts` — still used on summary detail pages
- `ToolCard.vue`, `ToolsSearch.vue`, `ToolsFilters.vue` — modified but kept

---

## File-by-File Changes

### New files

| File | Purpose |
|---|---|
| `src/content/guides/claude-code/guide.md` | Pilot guide content |
| `src/pages/guides/index.vue` | Guide directory page |
| `src/pages/guides/[slug].vue` | Guide detail page |
| `src/components/content/GuideCard.vue` | Card for guide entries on index |
| `src/components/content/GuideHumanSection.vue` | Human section renderer |
| `src/components/content/GuideAgentSection.vue` | Agent section renderer + copy button |
| `src/components/content/GuideCopyButton.vue` | Copy-to-clipboard button |
| `src/composables/useGuideCopyMarkdown.ts` | Agent section markdown extraction + copy |
| `src/server/api/guides/[slug].json.ts` | Structured data endpoint |
| `src/types/guides.ts` | TypeScript interfaces for guide schema |

### Modified files

| File | Change | Lines affected |
|---|---|---|
| `content.config.ts` | Add `guides` collection definition | After line 133 |
| `src/nuxt.config.ts` | Add route rules: `/tools` redirect, `/guides` ISR | Lines 99-115 (routeRules block) |
| `src/server/routes/sitemap.xml.ts` | Replace `/tools` with `/guides`, add guide URLs | Lines 59-63 (tools entry) |
| `src/components/AppSidebar.vue` | Change `/tools` link to `/guides` | Line 141 |
| `src/components/content/ToolCard.vue` | Add optional `guideUrl` prop for "View guide" link | Add prop + template link |
| `src/components/content/ToolsSearch.vue` | Update placeholder text | Line 52 |

### Deleted files (Phase 2, after validation)

| File | Reason |
|---|---|
| `src/pages/tools/index.vue` | Replaced by `src/pages/guides/index.vue` |

---

## Risks and Edge Cases

### 1. Tools with no guide content (majority case)
- **887 tools exist, guides will start with 1 (pilot)**. The index page MUST handle this gracefully.
- Tools without guides continue to show as expandable `ToolCard` components (current behavior).
- The detail page returns 404 for tools without guides — this is correct behavior since there is no `/guides/[slug]` for tools without generated content.
- **Risk**: Users may click a tool on the index expecting a guide page and find none. Mitigate by only showing "View guide" links on tools that have guides (via the `guideLookup` map).

### 2. SEO implications of the route change
- `/tools` currently has priority 0.9 in the sitemap and is indexed by search engines.
- The 301 redirect from `/tools` to `/guides` will transfer SEO equity over time, but there will be a temporary ranking dip.
- Individual guide pages (`/guides/claude-code`) are net-new URLs — they start with no SEO authority.
- **Mitigate**: Ensure the 301 redirect is properly configured before removing the old page. Keep the redirect permanently (do not remove it after migration).

### 3. Build-time vs runtime content loading
- Guides use `@nuxt/content` collections, which are loaded at build time and cached in SQLite.
- The `tools-with-stars.json` server route fetches GitHub stars at build time (requires `GITHUB_PAT`).
- **ISR behavior**: Guide pages will be regenerated on-demand after the 1-hour ISR cache expires. New guides added between deploys will not appear until the next build or ISR revalidation.
- **Risk**: If a guide.md file is malformed (bad frontmatter), it could break the entire `guides` collection at build time. The Zod schema validation will catch this — `failOnError: true` in Nitro prerender config means the build will fail loudly.

### 4. ISR cache invalidation
- Current setup: ISR with 3600s (1 hour) cache for `/summaries/**` and `/tools`.
- Guide pages will use the same pattern. Cache is invalidated automatically after TTL expires.
- **Risk**: After deploying new guide content, the old cached version may be served for up to 1 hour.
- **Mitigate**: For the pilot, this is acceptable. For production, consider Netlify's cache purge API if immediate invalidation is needed.

### 5. Content collection registration with @nuxt/content v3
- The `guides` collection must be registered in `content.config.ts` at the root level (not inside `src/`).
- The `cwd: contentDir` pattern is already used by all other collections (lines 58, 82, 110, 118 in content.config.ts).
- **Risk**: If the `guides/*/guide.md` glob pattern doesn't match the actual file structure, Nuxt Content will silently return an empty collection. Always verify with `queryCollection('guides').all()` after adding the first guide file.

### 6. Agent section markdown extraction for copy button
- `@nuxt/content` v3 stores the body as an AST (tree of nodes), not raw markdown.
- The copy button needs raw markdown text of the agent section.
- **Options ranked by reliability**:
  1. **Best**: Include a `rawAgentMarkdown` frontmatter field populated by the scraper during generation. Zero client-side parsing needed.
  2. **Good**: Fetch the raw `.md` file from disk via a custom API route that reads and splits the file.
  3. **Fragile**: Reconstruct markdown from the AST. Loses formatting fidelity.
- **Recommendation**: Option 1 for the production pipeline; for the pilot, hand-write the frontmatter field.

### 7. Nuxt route conflict
- Having both `src/pages/tools/index.vue` and `src/pages/guides/index.vue` is fine during migration — they are different routes.
- The `/tools` redirect in `routeRules` takes precedence over the page file. Once the redirect is added, `src/pages/tools/index.vue` becomes unreachable and can be deleted.
- **Risk**: If the redirect is added before `src/pages/guides/index.vue` exists, `/tools` will redirect to a 404. Phase the work correctly.

### 8. `useAsyncData` key collisions
- The tools directory already uses key `'tools-directory'` for `useFetch('/tools-with-stars.json')`.
- The guides index page will reuse this key — which is actually beneficial (shared cache, no duplicate fetch).
- Guide detail pages should use `guide-${slug}` as the key pattern (consistent with `summary-${slug}`).

### 9. Dark mode and prose styling
- `<ContentRenderer>` uses `class="prose prose-zinc dark:prose-invert max-w-none"` throughout the codebase.
- Guide pages must use the same classes for visual consistency.
- The agent section's code blocks and "copy" button need to work in both light and dark mode.

---

## Testing Approach

### Unit tests

| Test file | Coverage |
|---|---|
| `src/tests/composables/useGuideCopyMarkdown.test.ts` | Markdown extraction, clipboard API mock |
| `src/tests/config/guides-collection.test.ts` | Zod schema validation for guide frontmatter |

### Integration tests

- Guide detail page renders both sections from content collection
- Guide detail page handles missing guide (404)
- Guide index page shows tools with and without guides
- Copy button copies correct markdown
- JSON endpoint returns valid structured data
- `/tools` redirect resolves to `/guides`

### Manual QA checklist

- [ ] `/guides/claude-code` renders human + agent sections
- [ ] "Copy .md" copies clean markdown to clipboard
- [ ] `/api/guides/claude-code.json` returns structured JSON
- [ ] `/tools` redirects to `/guides` (301)
- [ ] `/guides` index shows all tools, guides linked where available
- [ ] Mobile responsive layout
- [ ] Dark mode renders correctly
- [ ] Skeleton loading states
- [ ] 404 state for non-existent guide slug
- [ ] SEO meta tags present on guide pages
- [ ] Agent resource gaps display warning when present

---

## Open Questions for Implementer

1. **Agent section markdown extraction**: The simplest approach is to split the markdown body on the `## What your agent needs to know` heading. An alternative is to store the agent section as a separate file (`agent.md`) alongside `guide.md`. The single-file approach is simpler for content generation; the two-file approach is simpler for copy-button extraction. **UPDATED recommendation**: Include a `rawAgentMarkdown` frontmatter field populated during generation. This avoids both AST parsing and file splitting. For the pilot, hand-write this field.

2. **Structured data format for JSON endpoint**: The plan proposes a custom `/api/guides/[slug].json` route. An alternative is JSON-LD embedded in the page HTML (no separate endpoint). Recommend: **both** — JSON-LD on the page for SEO, API route for agent consumption. The API route reads from the content collection, so there's no duplication of source data.

3. **Guide content generation for pilot**: The pilot guide (`claude-code`) needs to be written to validate the schema and page layout. Options: (a) hand-write it based on existing summaries, (b) generate it with a one-off script using the AI service already in `src/server/services/`. Recommend: **(a) hand-write** — faster for validation, avoids pipeline work during the client-side PR.

4. **Category filter on index page**: The current `ToolsFilters.vue` only has sort. R14 asks for filtering by category (tools, techniques, skills). The existing `tools.yml` has a `category` field (e.g., "Tools & Productivity") which doesn't map to the tool/technique/skill taxonomy. This taxonomy mapping needs to be defined — likely in the scraper pipeline. For Phase 1, filter by the existing `category` field from `tools.yml`. **Note**: `ToolsFilters.vue` already has a `<slot name="filters" />` (line 53) for adding category filters from the parent page.

5. **Redirect strategy for `/tools/**`**: ~~Nuxt `routeRules` redirects with wildcards may not support dynamic path forwarding.~~ **CONFIRMED**: Nuxt/Nitro route rules do NOT support dynamic path segment forwarding via wildcards. Since no `/tools/[slug]` routes exist in production today, this is a non-issue. If needed later, use a Nitro server middleware (code example in Route Changes section above).

---

## Implementation Checklist

### Phase 1: Foundation

- [ ] **Schema**: Add `guideAgentResourceSchema` and `guideSchema` Zod schemas to `content.config.ts`
- [ ] **Collection**: Add `guides` collection to `content.config.ts` (type: 'page', source: 'guides/*/guide.md')
- [ ] **Types**: Create `src/types/guides.ts` with TypeScript interfaces
- [ ] **Pilot content**: Create `src/content/guides/claude-code/guide.md` with valid frontmatter and dual-section body
- [ ] **Regenerate types**: Run `pnpm run postinstall` to verify collection registers correctly
- [ ] **Verify collection**: Confirm `queryCollection('guides').all()` returns the pilot guide (test in dev server)
- [ ] **Detail page**: Create `src/pages/guides/[slug].vue` following summaries/[slug].vue pattern
- [ ] **Human section component**: Create `src/components/content/GuideHumanSection.vue`
- [ ] **Agent section component**: Create `src/components/content/GuideAgentSection.vue`
- [ ] **Copy button**: Create `src/components/content/GuideCopyButton.vue` with SSR guard
- [ ] **Copy composable**: Create `src/composables/useGuideCopyMarkdown.ts`
- [ ] **API endpoint**: Create `src/server/api/guides/[slug].json.ts`
- [ ] **Route rules**: Add `/guides` and `/guides/**` ISR rules to `src/nuxt.config.ts`
- [ ] **JSON-LD**: Add SoftwareApplication structured data to guide detail page
- [ ] **Tests**: Write unit tests for guide schema validation and copy composable
- [ ] **Dev QA**: Verify `/guides/claude-code` renders correctly in dev server
- [ ] **Build QA**: Run `pnpm run build` and verify no build errors from new collection
- [ ] **Typecheck**: Run `pnpm run typecheck` — all new files pass

### Phase 2: Index Migration

- [ ] **Guide card**: Create `src/components/content/GuideCard.vue`
- [ ] **Index page**: Create `src/pages/guides/index.vue` merging tools + guides data
- [ ] **ToolCard prop**: Add optional `guideUrl` prop to `src/components/content/ToolCard.vue`
- [ ] **Navigation**: Update `src/components/AppSidebar.vue` line 141: `/tools` -> `/guides`
- [ ] **Sitemap**: Update `src/server/routes/sitemap.xml.ts` — replace `/tools`, add guide URLs
- [ ] **Redirect**: Replace `'/tools': { isr: 3600 }` with `'/tools': { redirect: { to: '/guides', statusCode: 301 } }` in nuxt.config.ts
- [ ] **Search placeholder**: Update `src/components/content/ToolsSearch.vue` placeholder text
- [ ] **Delete old page**: Remove `src/pages/tools/index.vue` (after redirect is confirmed working)
- [ ] **Redirect QA**: Verify `/tools` returns 301 redirect to `/guides`
- [ ] **Index QA**: Verify all 887+ tools appear on `/guides`, guides linked where available
- [ ] **Full QA**: Run through manual QA checklist above

### Phase 3: Content Generation (separate issue)

- [ ] Build scraper pipeline for guide generation
- [ ] Generate guides for top 20 tools by mention count
- [ ] Validate generated content against Zod schema
- [ ] Deploy and verify all generated guides render correctly

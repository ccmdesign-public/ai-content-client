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
- The sitemap includes `/tools` at line 60

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

**Markdown body structure:**
The markdown body contains both sections using `## What you need to know` and `## What your agent needs to know` as H2 delimiters. Within the human section, subsections use H3 (`### Overview`, `### How It Works`, etc.). The agent section uses H3 for resource types (`### Primer Prompts`, `### Installation`, `### Configuration Examples`).

This keeps the content as standard markdown renderable by `<ContentRenderer>` while the frontmatter provides structured metadata for programmatic access.

### Preserving tools.yml

`tools.yml` continues to serve as the tools directory data source. The new `guides` collection is a **superset** — only tools with generated guides get a `guide.md`. The index page shows all 887+ tools from `tools.yml` regardless of guide availability, with guides linked when they exist.

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

  // Redirects from old /tools routes
  '/tools': { redirect: { to: '/guides', statusCode: 301 } },
  '/tools/**': { redirect: { to: '/guides/**', statusCode: 301 } },

  // Guide pages: ISR with 1-hour cache (same pattern as summaries)
  '/guides': { isr: 3600 },
  '/guides/**': { isr: 3600 },
}
```

Note: The `/tools/**` wildcard redirect anticipates future deep links even though no `/tools/[slug]` route exists today. This is defensive — any external links to `/tools/claude-code` will resolve correctly.

### Sitemap update

Update `src/server/routes/sitemap.xml.ts` to replace the `/tools` entry with `/guides` and add individual guide URLs.

### Navigation updates

Any nav links pointing to `/tools` need to update to `/guides`. Search through layouts and components for `/tools` references.

---

## Component Architecture

### New components

#### 1. `src/pages/guides/[slug].vue` — Guide detail page

Follows Pattern 2 (Detail Page) from CLAUDE.md:
- `useAsyncData` + `queryCollection('guides')` for the guide content
- `useFetch('/tools-with-stars.json')` to get tool metadata (stars, links, videos)
- Merges both data sources
- States: loading (Skeleton), error, not-found (`<PageNotFound>`), success
- `useSeoMeta` for SEO
- Two-section layout with clear visual separation

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

#### 3. `src/components/content/GuideAgentSection.vue`

Renders the agent-facing section with:
- Rendered markdown content
- "Copy .md" button (copies raw markdown of the agent section)
- Gap warnings when `agentResourceGaps` is non-empty
- Code blocks for primer prompts and configs

#### 4. `src/components/content/GuideCopyButton.vue`

Copy-to-clipboard button. Uses `navigator.clipboard` with `import.meta.client` guard per SSR safety rules.

#### 5. `src/components/content/GuideCard.vue`

Card component for the index page. Replaces `ToolCard.vue` for tools that have guides. Shows:
- Tool name, category badge, stars
- Brief description (from guide `description` frontmatter)
- Links to `/guides/[slug]`

#### 6. `src/pages/guides/index.vue` — Guide directory page

Merges two data sources:
- `tools.yml` data (all 887+ tools) via `/tools-with-stars.json`
- `guides` collection (only tools with generated guides)

Display logic:
- Tools **with** guides: show as `GuideCard` with link to detail page
- Tools **without** guides: show as current `ToolCard` (expandable, no detail link) — preserves directory functionality per R15

Supports filtering by category (tools, techniques, skills) and search/sort (carried over from current implementation).

### Existing components to modify

| Component | Change |
|---|---|
| `ToolCard.vue` | Keep as-is for tools without guides. Add optional `guideUrl` prop — when present, shows a "View guide" link |
| `ToolsSearch.vue` | Rename search placeholder from "Search tools..." to "Search guides..." |
| `ToolsFilters.vue` | Add category filter option (tool/technique/skill) |
| `useToolsDirectory.ts` | Extend to merge guides collection data. Add `hasGuide` flag per tool |

### Composables

#### `src/composables/useGuideCopyMarkdown.ts`

Extracts the agent section markdown from the full guide content and provides a `copy()` function. Uses `navigator.clipboard.writeText()` with SSR guard.

#### `src/composables/useGuidesDirectory.ts`

New composable (or extend `useToolsDirectory`) that merges tools.yml data with the guides collection to produce a unified list for the index page.

---

## Structured Data Endpoint (R12)

### Recommendation: API route returning JSON

Create `src/server/api/guides/[slug].json.ts`:

```ts
// Returns structured guide data for programmatic agent consumption
{
  tool: "claude-code",
  title: "Claude Code",
  humanSection: { /* subsection content as markdown strings */ },
  agentSection: {
    primerPrompts: ["..."],
    installations: [{ type: "mcp-server", name: "...", installCommand: "..." }],
    configExamples: [{ target: "CLAUDE.md", content: "..." }],
    gaps: ["No CLI available"]
  },
  metadata: {
    generatedAt: "...",
    sourceCount: { summaries: 85, articles: 12 }
  }
}
```

Also embed JSON-LD on the guide detail page for SEO (SoftwareApplication schema).

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
1. Add `guides` content collection to `content.config.ts`
2. Create `src/pages/guides/[slug].vue` detail page
3. Create `src/pages/guides/index.vue` directory page
4. Create new components (GuideAgentSection, GuideHumanSection, GuideCopyButton, GuideCard)
5. Add route rules (redirects, ISR)
6. Add `/api/guides/[slug].json` endpoint
7. Create a single pilot guide file (`src/content/guides/claude-code/guide.md`) with hand-written or AI-generated content for validation

### Phase 2: Index page migration
1. Update nav links from `/tools` to `/guides`
2. Update sitemap
3. Merge tools directory data with guides data on the index page
4. Verify redirects work

### Phase 3: Content generation (scraper repo, separate issue)
1. Build the generation pipeline
2. Generate guides for top tools
3. Roll out progressively

### What gets deleted (eventually)
- `src/pages/tools/index.vue` — replaced by `src/pages/guides/index.vue`
- The `/tools` route rule — replaced by redirect + `/guides` rule

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
| `src/composables/useGuidesDirectory.ts` | Merged tools + guides data for index |
| `src/server/api/guides/[slug].json.ts` | Structured data endpoint |
| `src/types/guides.ts` | TypeScript interfaces for guide schema |

### Modified files

| File | Change |
|---|---|
| `content.config.ts` | Add `guides` collection definition |
| `src/nuxt.config.ts` | Add route rules: `/tools` redirects, `/guides` ISR |
| `src/server/routes/sitemap.xml.ts` | Replace `/tools` with `/guides`, add guide URLs |
| `src/components/content/ToolCard.vue` | Add optional `guideUrl` prop for "View guide" link |
| `src/components/content/ToolsSearch.vue` | Update placeholder text |
| `src/components/content/ToolsFilters.vue` | Add category filter |
| `src/composables/useToolsDirectory.ts` | Extend with guide awareness (or deprecate in favor of `useGuidesDirectory`) |

### Deleted files (Phase 2, after validation)

| File | Reason |
|---|---|
| `src/pages/tools/index.vue` | Replaced by `src/pages/guides/index.vue` |

---

## Testing Approach

### Unit tests

| Test file | Coverage |
|---|---|
| `src/tests/composables/useGuideCopyMarkdown.test.ts` | Markdown extraction, clipboard API mock |
| `src/tests/composables/useGuidesDirectory.test.ts` | Merging tools + guides, filtering, sorting |
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

1. **Agent section markdown extraction**: The simplest approach is to split the markdown body on the `## What your agent needs to know` heading. An alternative is to store the agent section as a separate file (`agent.md`) alongside `guide.md`. The single-file approach is simpler for content generation; the two-file approach is simpler for copy-button extraction. Recommend: **single file with heading-based split** — keep content generation simple and do the split client-side.

2. **Structured data format for JSON endpoint**: The plan proposes a custom `/api/guides/[slug].json` route. An alternative is JSON-LD embedded in the page HTML (no separate endpoint). Recommend: **both** — JSON-LD on the page for SEO, API route for agent consumption. The API route reads from the content collection, so there's no duplication of source data.

3. **Guide content generation for pilot**: The pilot guide (`claude-code`) needs to be written to validate the schema and page layout. Options: (a) hand-write it based on existing summaries, (b) generate it with a one-off script using the AI service already in `src/server/services/`. Recommend: **(a) hand-write** — faster for validation, avoids pipeline work during the client-side PR.

4. **Category filter on index page**: The current `ToolsFilters.vue` only has sort. R14 asks for filtering by category (tools, techniques, skills). The existing `tools.yml` has a `category` field (e.g., "Tools & Productivity") which doesn't map to the tool/technique/skill taxonomy. This taxonomy mapping needs to be defined — likely in the scraper pipeline. For Phase 1, filter by the existing `category` field from `tools.yml`.

5. **Redirect strategy for `/tools/**`**: Nuxt `routeRules` redirects with wildcards may not support dynamic path forwarding (e.g., `/tools/claude-code` to `/guides/claude-code`). May need a server middleware or individual redirect rules. Needs testing during implementation.

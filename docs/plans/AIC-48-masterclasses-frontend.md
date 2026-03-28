---
title: "AIC-48: Masterclasses Frontend — Pages, Index, and Navigation"
type: feature
status: draft
date: 2026-03-28
---

# AIC-48: Masterclasses Frontend

## Overview

Replace the existing `/tools` section with a Masterclasses learning platform. Each managed topic gets a detail page at `/masterclasses/[slug]` with tabbed beginner/intermediate/advanced tiers. An index page at `/masterclasses` provides category filtering, search, and sort. Tools without a Masterclass still appear as basic entries in the index.

### Dependencies

- **AIC-46** (scraper types + writer) — shipped. Defines `MasterclassMetadata`, `MasterclassContent`, tier file structure.
- **AIC-47** (generation pipeline) — shipped. Produces `metadata.yml` + `beginner.md` / `intermediate.md` / `advanced.md` per topic in `src/content/masterclasses/[slug]/`.
- **Scraper output format**: each topic directory contains `metadata.yml` and up to three tier markdown files. A `master-index.yml` aggregates all topics.

### Key Architecture Decisions

1. **Nuxt Content collection (not JSON route)** — Masterclass tier files are markdown with rendered body content. Use a `masterclasses` Nuxt Content collection (type `page`) so `<ContentRenderer>` works for the tier body. This is consistent with summaries and articles.
2. **Metadata as a separate data collection** — `metadata.yml` files are loaded as a `masterclassMetadata` data collection (type `data`). This gives us the index without parsing markdown bodies.
3. **Preserve tools.yml + tools-with-stars.json** — The existing tools pipeline is reused for non-Masterclass tool entries in the index. The `tools-with-stars.json` server route continues to serve enriched tool data.
4. **Single detail page with client-side tabs** — One route `/masterclasses/[slug]` loads all three tiers via `queryCollection` and switches between them with shadcn Tabs. No separate routes per tier.
5. **ISR rendering** — Masterclass pages use `isr: 3600` (same pattern as summaries/tools) to avoid OOM during prerender while staying fresh.
6. **Redirect `/tools` to `/masterclasses`** — Add a route rule redirect so existing links and bookmarks continue to work.

---

## Content Collections

### New collection: `masterclasses` (tier content)

```ts
// in content.config.ts
masterclasses: defineCollection({
  type: 'page',
  source: {
    include: 'masterclasses/*/*.md',  // beginner.md, intermediate.md, advanced.md
    cwd: contentDir
  },
  schema: z.object({
    // No frontmatter in tier files — they are pure markdown body.
    // Path structure encodes slug + tier: /masterclasses/google-stitch/beginner
  })
})
```

Tier files have no frontmatter (the scraper writes them as plain markdown with `## Overview`, `## Key Concepts`, etc.). The collection captures the path and body. The slug and tier are derived from the path: `/masterclasses/[slug]/[tier]`.

### New collection: `masterclassMetadata` (topic metadata)

```ts
masterclassMetadata: defineCollection({
  type: 'data',
  source: {
    include: 'masterclasses/*/metadata.yml',
    cwd: contentDir
  },
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    category: z.enum(['tool', 'technique', 'skill']),
    tags: z.array(z.string()),
    generatedAt: z.string(),
    sourceCount: z.number(),
    contentHash: z.string(),
    modelUsed: z.string(),
    schemaVersion: z.string(),
    tldr: z.string().optional(),
    description: z.string().optional(),
    toolId: z.string().optional(),
    relatedTopics: z.array(z.string()).optional(),
    tiers: z.array(z.object({
      tier: z.enum(['beginner', 'intermediate', 'advanced']),
      inputTokens: z.number().optional(),
      outputTokens: z.number().optional(),
      totalTokens: z.number().optional(),
      processingTimeMs: z.number().optional(),
      failed: z.boolean().optional(),
      failureReason: z.string().optional(),
    }))
  })
})
```

### Existing collection: no changes

The `summaries`, `articles`, `tags`, `newsletters` collections are unchanged.

---

## File-by-File Breakdown

### Content Config

| File | Action | Details |
|------|--------|---------|
| `content.config.ts` | Modify | Add `masterclasses` and `masterclassMetadata` collections |

### Types

| File | Action | Details |
|------|--------|---------|
| `src/types/masterclass.ts` | Create | Client-side types: `MasterclassCategory`, `MasterclassTier`, `MasterclassIndexEntry`, `MasterclassDetailData`. Mirrors scraper types but tailored for client display. |

```ts
// src/types/masterclass.ts
export type MasterclassCategory = 'tool' | 'technique' | 'skill'
export type MasterclassTier = 'beginner' | 'intermediate' | 'advanced'

export const TIER_ORDER: MasterclassTier[] = ['beginner', 'intermediate', 'advanced']
export const TIER_LABELS: Record<MasterclassTier, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export const CATEGORY_LABELS: Record<MasterclassCategory, string> = {
  tool: 'Tools',
  technique: 'Techniques',
  skill: 'Skills',
}

/** Entry in the masterclasses index (from metadata.yml or tools.yml fallback) */
export interface MasterclassIndexEntry {
  slug: string
  name: string
  category: MasterclassCategory
  description: string | null
  tldr: string | null
  hasMasterclass: boolean       // true = has generated tiers; false = tools.yml-only entry
  sourceCount: number | null
  generatedAt: string | null
  // Tool-specific enrichment (from tools-with-stars.json)
  videoCount?: number
  stars?: number
  website?: string | null
  githubRepo?: string | null
}
```

### Composables

| File | Action | Details |
|------|--------|---------|
| `src/composables/useMasterclassIndex.ts` | Create | Loads masterclass metadata + tools fallback, merges into unified index, provides search/filter/sort |
| `src/composables/useMasterclassDetail.ts` | Create | Loads metadata + tier content for a single topic by slug |

#### `useMasterclassIndex.ts`

```ts
/**
 * Composable for the /masterclasses index page.
 * Merges masterclass metadata (topics with generated content) with
 * tools.yml entries (tools without a masterclass yet) into a unified list.
 * Provides search, category filter, and sort.
 */
export function useMasterclassIndex() {
  // 1. Load masterclass metadata via queryCollection('masterclassMetadata')
  // 2. Load tools-with-stars.json via useFetch (same as useToolsDirectory)
  // 3. Merge: masterclass topics take priority; remaining tools appear as basic entries
  // 4. Expose: entries, pending, error, searchQuery, categoryFilter, sortBy, filteredEntries
}
```

Key behavior:
- Masterclass topics (those with `metadata.yml`) appear with `hasMasterclass: true`, their `tldr`, and `sourceCount`.
- Tools from `tools-with-stars.json` that do NOT have a matching masterclass slug appear with `hasMasterclass: false`, using the tool's `description`, `stats.videoCount`, `stars`.
- Category filter: `all | tool | technique | skill`. Non-masterclass tools default to `tool` category.
- Sort options: `relevance` (masterclasses first, then by sourceCount/videoCount), `alpha`, `newest` (by generatedAt/lastMentioned).
- Search filters by name, description, and aliases.

#### `useMasterclassDetail.ts`

```ts
/**
 * Composable for the /masterclasses/[slug] detail page.
 * Loads metadata + all available tier content for a single topic.
 */
export function useMasterclassDetail(slug: Ref<string> | string) {
  // 1. Load metadata via queryCollection('masterclassMetadata').path(slug).first()
  // 2. Load tier content via queryCollection('masterclasses').where({ path contains slug })
  // 3. Parse available tiers from metadata.tiers (filter out failed ones)
  // 4. Return: metadata, tiers (Map<tier, content>), availableTiers, pending, error
}
```

### Pages

| File | Action | Details |
|------|--------|---------|
| `src/pages/masterclasses/index.vue` | Create | Index page with category filter bar, search, sort, and mixed card grid |
| `src/pages/masterclasses/[slug].vue` | Create | Detail page with tabbed tier content |
| `src/pages/tools/index.vue` | Delete | Replaced by masterclasses index |

#### Index page (`src/pages/masterclasses/index.vue`)

Pattern: follows `src/pages/summaries/index.vue` (Pattern 1: List Page).

States:
- **Loading**: `<Skeleton>` placeholders (grid of card skeletons)
- **Error**: `<PageErrorState>` with retry
- **Empty (no results)**: `<PageEmptyState>` with search clear action
- **Empty (no data)**: `<PageEmptyState>` — "No masterclasses available yet."

Layout:
- Stats header: "X masterclasses, Y tools" with `aria-live="polite"`
- Category filter bar: `<CategoryFilterBar>` (reuse existing component with categories: All, Tools, Techniques, Skills)
- Search input + sort dropdown
- Card grid: mixed `<MasterclassCard>` (for topics with content) and `<ToolBasicCard>` (for tools without masterclass)

SEO: `useSeoMeta` with title "Masterclasses | YouTube Summaries".

#### Detail page (`src/pages/masterclasses/[slug].vue`)

Pattern: follows Pattern 2 (Detail Page) + tabbed content.

States:
- **Loading**: `<Skeleton>` for header + tab content area
- **Error**: `<PageErrorState>`
- **Not found**: `<PageNotFound>` with link back to `/masterclasses`

Layout:
- Header: topic name, category badge, description/tldr, source count, generated date
- Related topics: links to other masterclass pages (from `relatedTopics`)
- Tabbed content: shadcn `<Tabs>` with `<TabsList>` + `<TabsTrigger>` for each available tier
- Tab content: `<ContentRenderer>` renders the tier markdown body
- Default tab: `beginner` (or first available if beginner failed)
- Tab state: persisted in URL query param `?tier=intermediate` so links can deep-link to a tier

SEO: `useSeoMeta` with title "[Topic Name] Masterclass — [Tier] | YouTube Summaries".

### Components

| File | Action | Details |
|------|--------|---------|
| `src/components/content/MasterclassCard.vue` | Create | Card for masterclass topics in the index |
| `src/components/content/MasterclassCardSkeleton.vue` | Create | Loading skeleton for the card |
| `src/components/content/ToolBasicCard.vue` | Create | Simplified card for tools without masterclass |

#### `MasterclassCard.vue`

Props: `entry: MasterclassIndexEntry`

Display:
- Topic name (as link to `/masterclasses/[slug]`)
- Category badge (tool/technique/skill) using shadcn `<Badge>`
- Description or tldr (first 2 lines)
- Source count ("Built from X sources")
- Optional: GitHub stars badge, video count

Follows Pattern 3 (Card Component): props-only, no internal fetching, Tailwind-only layout, `<NuxtLink>` to detail page.

#### `ToolBasicCard.vue`

Props: `tool: ToolWithStars`

Display:
- Tool name (no link — or link to external website)
- "No masterclass yet" subtle indicator
- Video count, GitHub stars if available
- Description if available

This replaces the existing `<ToolCard>` (disclosure/accordion pattern) with a simpler card. The ToolCard component can be kept temporarily for reference but is not used in the new pages.

### Navigation

| File | Action | Details |
|------|--------|---------|
| `src/components/AppSidebar.vue` | Modify | Replace "Tools" footer link with "Masterclasses" link to `/masterclasses` |

Change in sidebar footer:
```vue
<!-- Before -->
<NuxtLink to="/tools" ...>Tools</NuxtLink>
<!-- After -->
<NuxtLink to="/masterclasses" ...>Masterclasses</NuxtLink>
```

Consider promoting Masterclasses from the footer to a proper sidebar group if the section grows.

### Config / Routes

| File | Action | Details |
|------|--------|---------|
| `src/nuxt.config.ts` | Modify | Add route rules for masterclasses; add `/tools` redirect |

```ts
// Route rules additions
'/masterclasses': { isr: 3600 },
'/masterclasses/**': { isr: 3600 },
// Redirect old tools URL
'/tools': { redirect: { to: '/masterclasses', statusCode: 301 } },
```

Remove the existing `/tools` ISR rule.

### Server Routes

| File | Action | Details |
|------|--------|---------|
| `src/server/routes/tools-with-stars.json.ts` | Keep | Still needed for enriching tool entries in the index |

No new server routes needed. Masterclass content is served via Nuxt Content collections.

### Content Sync

Masterclass content files (`metadata.yml`, `beginner.md`, etc.) need to be synced from the scraper repo to the client's `src/content/masterclasses/` directory. This follows the same pattern as summaries content sync (both repos share a content directory, or files are copied during CI).

**Action item**: Ensure the CI/deploy pipeline copies `src/content/masterclasses/` from the scraper output to the client content directory. This is the same mechanism used for summaries and tags.

---

## Implementation Order

### Phase 1: Content Foundation (can be verified independently)

1. **Create `src/types/masterclass.ts`** — client-side types
2. **Update `content.config.ts`** — add both new collections
3. **Copy pilot masterclass content** — ensure `src/content/masterclasses/google-stitch/` exists with `metadata.yml` + tier files from the scraper
4. **Verify**: run `pnpm run dev` and confirm Nuxt Content picks up the new collections without errors

### Phase 2: Index Page

5. **Create `src/composables/useMasterclassIndex.ts`** — data loading + merge logic
6. **Create `src/components/content/MasterclassCard.vue`** — card component
7. **Create `src/components/content/MasterclassCardSkeleton.vue`** — skeleton
8. **Create `src/components/content/ToolBasicCard.vue`** — basic tool card
9. **Create `src/pages/masterclasses/index.vue`** — index page
10. **Verify**: browse `/masterclasses`, confirm Google Stitch appears as a masterclass card, other tools appear as basic entries

### Phase 3: Detail Page

11. **Create `src/composables/useMasterclassDetail.ts`** — detail data loading
12. **Create `src/pages/masterclasses/[slug].vue`** — detail page with tabs
13. **Verify**: browse `/masterclasses/google-stitch`, confirm tabbed tiers render markdown

### Phase 4: Navigation + Cleanup

14. **Update `src/components/AppSidebar.vue`** — replace Tools with Masterclasses
15. **Update `src/nuxt.config.ts`** — route rules (ISR + redirect)
16. **Delete `src/pages/tools/index.vue`** — old tools page
17. **Verify**: `/tools` redirects to `/masterclasses`, sidebar link works

### Phase 5: Polish

18. Add `useSeoMeta` to both pages
19. Ensure `aria-live` on dynamic count regions
20. Confirm skeleton loading states, error states, empty states all render correctly
21. Test with `pnpm vitest run`

---

## Integration with Existing Patterns

| Pattern | How Masterclasses Follows It |
|---------|------------------------------|
| List Page (Pattern 1) | Index uses composable for data + filter/sort, handles pending/error/empty states |
| Detail Page (Pattern 2) | Detail uses `useAsyncData` + `queryCollection`, handles pending/error/not-found |
| Card Component (Pattern 3) | `MasterclassCard` is props-only, typed, Tailwind-only, `<NuxtLink>` |
| Content collection | New `masterclasses` + `masterclassMetadata` collections in `content.config.ts` with Zod schemas |
| Data fetching | `useAsyncData` with proper key naming: `masterclass-index`, `masterclass-${slug}` |
| UI primitives | shadcn `Badge`, `Tabs`, `Card`, `Skeleton`, `Input` |
| ISR rendering | Same `isr: 3600` pattern as summaries |
| Accessibility | `aria-live` on counts, `aria-label` on regions, accessible tab navigation (shadcn Tabs handles this) |

---

## Testing Strategy

### Unit Tests

| Test File | Coverage |
|-----------|----------|
| `src/tests/composables/useMasterclassIndex.test.ts` | Merge logic (masterclass + tools), search filtering, category filtering, sort options |
| `src/tests/composables/useMasterclassDetail.test.ts` | Metadata loading, tier resolution, failed tier handling |
| `src/tests/config/masterclass-collections.test.ts` | Zod schema validation against sample metadata.yml |

### Manual Testing Checklist

- [ ] `/masterclasses` loads with Google Stitch as a masterclass card
- [ ] Other tools appear as basic entries in the index
- [ ] Category filter (All/Tools/Techniques/Skills) works
- [ ] Search filters by name
- [ ] Sort options work (relevance, alpha, newest)
- [ ] `/masterclasses/google-stitch` shows tabbed page with beginner/intermediate/advanced
- [ ] Tab switching works, content renders markdown correctly
- [ ] `?tier=advanced` deep-links to the advanced tab
- [ ] `/tools` redirects to `/masterclasses` (301)
- [ ] Sidebar shows "Masterclasses" link instead of "Tools"
- [ ] Loading skeletons display during data fetch
- [ ] Error state displays when data fails to load
- [ ] 404 page displays for non-existent slug
- [ ] SEO meta tags present on both pages
- [ ] Builds successfully with `pnpm run build`

---

## Open Questions

1. **Content sync mechanism** — How are masterclass files copied from the scraper to the client? Is there an existing CI step that syncs `src/content/` between repos, or does this need a new sync script? The implementer should verify the current sync pattern for summaries/tags and replicate it for masterclasses.

2. **CategoryFilterBar reuse** — The existing `<CategoryFilterBar>` component is designed for tag-based categories (ai-ml, design, etc.). Masterclass categories (tool/technique/skill) are different. Should we reuse the component with different props, or create a simpler filter variant? Likely: reuse with adapted props since the component accepts generic category data.

3. **Tool-to-masterclass matching** — The merge logic in `useMasterclassIndex` needs to match tools from `tools-with-stars.json` to masterclass topics. The scraper uses `toolId` in metadata to link them. Should matching use `toolId` or `slug`? Recommendation: use `slug` as the primary key (it's the URL segment), with `toolId` as a secondary lookup for enrichment.

4. **Non-masterclass tool volume** — There are 887 tools. Showing all of them as basic entries in the masterclass index may overwhelm the page. Consider: show only tools with N+ video mentions (e.g., 3+) as basic entries, or paginate, or collapse into a "Browse all tools" expandable section. The implementer should decide the threshold.

5. **Tab state persistence** — Should the selected tier persist across navigation (e.g., if you pick "advanced" on Google Stitch, should Cursor also default to "advanced")? The plan uses URL query params per page, so each page starts at beginner. A `localStorage` preference could be added later if users request it.

6. **Existing ToolCard/ToolsSearch/ToolsFilters cleanup** — These components become unused after the migration. Should they be deleted immediately or kept for one release cycle? Recommendation: delete in the same PR to keep the codebase clean, since `/tools` redirects make them unreachable.

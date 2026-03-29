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

**Critical implementation note**: The scraper writer (`masterclass-writer.service.ts`) writes tier files as **plain markdown with no frontmatter**. The content starts directly with `## Overview`. Nuxt Content `type: 'page'` collections expect files that can be parsed for body content. Plain markdown without frontmatter is valid -- Nuxt Content will parse the body correctly and the `path` will encode the slug and tier.

```ts
// in content.config.ts — add after the existing `tags` collection

const masterclassTierSchema = z.object({
  // Tier files have NO frontmatter fields.
  // Nuxt Content injects: path, id, stem, body, meta, navigation, etc.
  // The slug and tier are derived from the path:
  //   /masterclasses/google-stitch/beginner -> slug="google-stitch", tier="beginner"
  // No custom schema fields needed — the collection exists purely for body rendering.
})

masterclasses: defineCollection({
  type: 'page',
  source: {
    include: 'masterclasses/**/*.md',  // beginner.md, intermediate.md, advanced.md
    cwd: contentDir
  },
  schema: masterclassTierSchema
})
```

**Path resolution detail**: For a file at `src/content/masterclasses/google-stitch/beginner.md`, Nuxt Content generates:
- `path`: `/masterclasses/google-stitch/beginner`
- `stem`: `masterclasses/google-stitch/beginner`
- `id`: content-hash-based

To query all tiers for a slug: `queryCollection('masterclasses').where('path', 'LIKE', '/masterclasses/google-stitch/%').all()`

**Edge case**: The `include` glob must use `**/*.md` (not `*/*.md`) for safety, but we should verify that `master-index.yml` does NOT get picked up. Since the glob only matches `.md` files, the YAML index file is excluded automatically.

### New collection: `masterclassMetadata` (topic metadata)

```ts
// Zod schema matching the exact YAML output from masterclass-writer.service.ts
const masterclassTierMetadataSchema = z.object({
  tier: z.enum(['beginner', 'intermediate', 'advanced']),
  inputTokens: z.number().optional(),
  outputTokens: z.number().optional(),
  totalTokens: z.number().optional(),
  processingTimeMs: z.number().optional(),
  failed: z.boolean().optional(),
  failureReason: z.string().optional(),
})

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
    generatedAt: z.string(),        // ISO datetime from scraper
    sourceCount: z.number(),         // number of summaries/articles used
    contentHash: z.string(),         // for change detection
    modelUsed: z.string(),           // e.g. "gemini-2.5-flash"
    schemaVersion: z.string(),       // "1.0" or "2.0"
    tldr: z.string(),                // required — writer always writes it (from beginner tier or first available)
    description: z.string().optional(),   // v2.0: topic description
    toolId: z.string().optional(),        // v2.0: link to tools.yml
    relatedTopics: z.array(z.string()).optional(),  // v2.0: slugs of related topics
    tiers: z.array(masterclassTierMetadataSchema),
  })
})
```

**Schema validation notes**:
- `tldr` is required (not optional) because the writer always emits it — it falls back through `beginnerContent?.tldr ?? firstAvailableContent?.tldr ?? ''`. An empty string is valid.
- `schemaVersion` is `z.string()` rather than `z.enum(['1.0', '2.0'])` to be forward-compatible with future schema versions.
- `tiers` array is always present even if all tiers failed (it will contain entries with `failed: true`).

### Existing collections: no changes

The `summaries`, `articles`, `tags`, `newsletters` collections are unchanged.

---

## File-by-File Breakdown

### Content Config

| File | Action | Details |
|------|--------|---------|
| `content.config.ts` | Modify | Add `masterclasses` and `masterclassMetadata` collections with schemas above. Add `masterclassTierMetadataSchema` as a reusable sub-schema. |

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

export const CATEGORY_ICONS: Record<MasterclassCategory, string> = {
  tool: 'Wrench',        // lucide-vue-next
  technique: 'Lightbulb',
  skill: 'GraduationCap',
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
  tags: string[]
  // Tool-specific enrichment (from tools-with-stars.json)
  videoCount?: number
  stars?: number
  website?: string | null
  githubRepo?: string | null
}

/** Metadata for the tier selector UI — which tiers are available and which failed */
export interface TierAvailability {
  tier: MasterclassTier
  available: boolean
  failureReason?: string
}

/** Full detail data for a single masterclass topic */
export interface MasterclassDetailData {
  slug: string
  name: string
  category: MasterclassCategory
  description: string | null
  tldr: string
  sourceCount: number
  generatedAt: string
  modelUsed: string
  relatedTopics: string[]
  tags: string[]
  toolId?: string
  tierAvailability: TierAvailability[]
  // Tool enrichment (optional, loaded from tools-with-stars.json)
  website?: string | null
  githubRepo?: string | null
  stars?: number
}
```

### Composables

| File | Action | Details |
|------|--------|---------|
| `src/composables/useMasterclassIndex.ts` | Create | Loads masterclass metadata + tools fallback, merges into unified index, provides search/filter/sort |
| `src/composables/useMasterclassDetail.ts` | Create | Loads metadata + tier content for a single topic by slug |

#### `useMasterclassIndex.ts` — Full Pseudocode

```ts
import { useDebounceFn } from '@vueuse/core'
import type { MasterclassIndexEntry, MasterclassCategory } from '~/types/masterclass'
import type { ToolWithStars } from '~/types/tools'

export type MasterclassSortOption = 'relevance' | 'alpha' | 'newest'

/**
 * Composable for the /masterclasses index page.
 * Merges masterclass metadata (topics with generated content) with
 * tools.yml entries (tools without a masterclass yet) into a unified list.
 */
export function useMasterclassIndex() {
  const route = useRoute()
  const router = useRouter()

  // --- Data Loading ---

  // 1. Load masterclass metadata via queryCollection
  const { data: rawMetadata, pending: metaPending, error: metaError } = useAsyncData(
    'masterclass-metadata-all',
    () => queryCollection('masterclassMetadata').all()
  )

  // 2. Load tools-with-stars.json via useFetch (same pattern as useToolsDirectory)
  const { data: allTools, pending: toolsPending, error: toolsError } = useFetch<ToolWithStars[]>(
    '/tools-with-stars.json',
    { key: 'tools-for-masterclass-index' }
  )

  // Combined loading/error state
  const pending = computed(() => metaPending.value || toolsPending.value)
  const error = computed(() => metaError.value || toolsError.value)

  // --- Merge Logic ---

  const entries = computed<MasterclassIndexEntry[]>(() => {
    const result: MasterclassIndexEntry[] = []
    const masterclassSlugs = new Set<string>()

    // First pass: masterclass topics (have generated content)
    if (rawMetadata.value) {
      for (const meta of rawMetadata.value) {
        masterclassSlugs.add(meta.slug)
        // Look up matching tool for enrichment
        const matchedTool = allTools.value?.find(
          t => t.slug === meta.slug || t.id === meta.toolId
        )
        result.push({
          slug: meta.slug,
          name: meta.name,
          category: meta.category as MasterclassCategory,
          description: meta.description ?? matchedTool?.description ?? null,
          tldr: meta.tldr || null,
          hasMasterclass: true,
          sourceCount: meta.sourceCount,
          generatedAt: meta.generatedAt,
          tags: meta.tags ?? [],
          // Tool enrichment
          videoCount: matchedTool?.stats?.videoCount,
          stars: matchedTool?.stars,
          website: matchedTool?.website,
          githubRepo: matchedTool?.github?.repo ?? null,
        })
      }
    }

    // Second pass: tools WITHOUT a masterclass (fallback entries)
    // THRESHOLD: only include tools with 3+ video mentions to avoid overwhelming
    // the index with 800+ barely-mentioned tools
    const TOOL_MENTION_THRESHOLD = 3
    if (allTools.value) {
      for (const tool of allTools.value) {
        if (masterclassSlugs.has(tool.slug)) continue
        if (tool.stats.videoCount < TOOL_MENTION_THRESHOLD) continue
        result.push({
          slug: tool.slug,
          name: tool.name,
          category: 'tool',  // non-masterclass tools default to 'tool'
          description: tool.description,
          tldr: null,
          hasMasterclass: false,
          sourceCount: null,
          generatedAt: null,
          tags: tool.tags ?? [],
          videoCount: tool.stats.videoCount,
          stars: tool.stars,
          website: tool.website,
          githubRepo: tool.github?.repo ?? null,
        })
      }
    }

    return result
  })

  // --- Filter/Search/Sort State ---

  const searchQuery = ref((route.query.q as string) || '')
  const categoryFilter = ref<MasterclassCategory | null>(
    (route.query.category as MasterclassCategory) || null
  )
  const sortBy = ref<MasterclassSortOption>(
    (route.query.sort as MasterclassSortOption) || 'relevance'
  )

  // --- Filtered + Sorted ---

  const filteredEntries = computed(() => {
    let result = entries.value

    // Category filter
    if (categoryFilter.value) {
      result = result.filter(e => e.category === categoryFilter.value)
    }

    // Search filter (name, description, tags)
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(e =>
        e.name.toLowerCase().includes(q)
        || e.description?.toLowerCase().includes(q)
        || e.tldr?.toLowerCase().includes(q)
        || e.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // Sort
    switch (sortBy.value) {
      case 'alpha':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        result = [...result].sort((a, b) => {
          const dateA = a.generatedAt ? new Date(a.generatedAt).getTime() : 0
          const dateB = b.generatedAt ? new Date(b.generatedAt).getTime() : 0
          return dateB - dateA
        })
        break
      case 'relevance':
      default:
        // Masterclasses first, then by sourceCount/videoCount
        result = [...result].sort((a, b) => {
          if (a.hasMasterclass !== b.hasMasterclass) return a.hasMasterclass ? -1 : 1
          const scoreA = a.sourceCount ?? a.videoCount ?? 0
          const scoreB = b.sourceCount ?? b.videoCount ?? 0
          return scoreB - scoreA
        })
    }

    return result
  })

  // --- Counts for UI ---

  const totalCount = computed(() => entries.value.length)
  const masterclassCount = computed(() => entries.value.filter(e => e.hasMasterclass).length)
  const filteredCount = computed(() => filteredEntries.value.length)

  // Category counts for the filter bar
  const categoryCounts = computed(() => {
    const counts = new Map<MasterclassCategory, number>()
    for (const e of entries.value) {
      counts.set(e.category, (counts.get(e.category) ?? 0) + 1)
    }
    return counts
  })

  // --- Infinite Scroll ---

  const displayCount = ref(30)
  const displayedEntries = computed(() => filteredEntries.value.slice(0, displayCount.value))
  const hasMore = computed(() => displayCount.value < filteredEntries.value.length)

  function loadMore() { displayCount.value += 30 }

  // --- URL Sync ---

  function setSearch(query: string) {
    searchQuery.value = query
    displayCount.value = 30
  }

  function setCategory(category: MasterclassCategory | null) {
    categoryFilter.value = category
    displayCount.value = 30
  }

  function setSort(option: MasterclassSortOption) {
    sortBy.value = option
    displayCount.value = 30
  }

  const debouncedUrlSync = useDebounceFn(() => {
    const query: Record<string, string | undefined> = {}
    if (searchQuery.value) query.q = searchQuery.value
    if (categoryFilter.value) query.category = categoryFilter.value
    if (sortBy.value !== 'relevance') query.sort = sortBy.value
    router.replace({ query })
  }, 300)

  watch([searchQuery, categoryFilter, sortBy], () => debouncedUrlSync())

  function refresh() {
    // Trigger both data sources to refresh
    // (implementation detail: may need to call both refresh functions)
  }

  return {
    entries,
    displayedEntries,
    filteredEntries,
    pending,
    error,
    totalCount,
    masterclassCount,
    filteredCount,
    categoryCounts,
    hasMore,
    searchQuery,
    categoryFilter,
    sortBy,
    loadMore,
    setSearch,
    setCategory,
    setSort,
    refresh,
  }
}
```

**Key merge logic decisions**:
- **Matching**: Use `tool.slug === meta.slug` as primary key. Fallback to `tool.id === meta.toolId` for tools whose slug differs from the masterclass slug (unlikely but possible for technique/skill topics that reference a tool).
- **Tool threshold**: Only include non-masterclass tools with 3+ video mentions. This reduces 887 tools to ~100-150 meaningful entries. The threshold is a constant (`TOOL_MENTION_THRESHOLD`) easy to tune.
- **Category assignment**: Non-masterclass tools always get `category: 'tool'`. Only masterclass topics can be `technique` or `skill`.

#### `useMasterclassDetail.ts` — Full Pseudocode

```ts
import type { MasterclassTier, TierAvailability, MasterclassDetailData } from '~/types/masterclass'
import { TIER_ORDER } from '~/types/masterclass'
import type { ToolWithStars } from '~/types/tools'

/**
 * Composable for the /masterclasses/[slug] detail page.
 * Loads metadata + all available tier content for a single topic.
 */
export function useMasterclassDetail(slug: Ref<string> | string) {
  const resolvedSlug = toRef(slug)

  // 1. Load metadata
  const { data: rawMetadata, pending: metaPending, error: metaError } = useAsyncData(
    `masterclass-meta-${toValue(resolvedSlug)}`,
    () => queryCollection('masterclassMetadata')
      .where('slug', '=', toValue(resolvedSlug))
      .first()
  )

  // 2. Load ALL tier content docs for this slug
  //    Path pattern: /masterclasses/{slug}/beginner, /masterclasses/{slug}/intermediate, etc.
  const { data: rawTiers, pending: tiersPending, error: tiersError } = useAsyncData(
    `masterclass-tiers-${toValue(resolvedSlug)}`,
    () => queryCollection('masterclasses')
      .where('path', 'LIKE', `/masterclasses/${toValue(resolvedSlug)}/%`)
      .all()
  )

  // 3. Optionally load tool enrichment for tool-category topics
  const { data: allTools } = useFetch<ToolWithStars[]>('/tools-with-stars.json', {
    key: 'tools-for-masterclass-detail',
    // Only used for enrichment — not blocking
    lazy: true,
  })

  // Combined loading state
  const pending = computed(() => metaPending.value || tiersPending.value)
  const error = computed(() => metaError.value || tiersError.value)
  const notFound = computed(() => !pending.value && !error.value && !rawMetadata.value)

  // 4. Build tier availability map from metadata
  const tierAvailability = computed<TierAvailability[]>(() => {
    if (!rawMetadata.value?.tiers) return []
    return TIER_ORDER.map(tier => {
      const tierMeta = rawMetadata.value.tiers.find((t: any) => t.tier === tier)
      return {
        tier,
        available: tierMeta ? !tierMeta.failed : false,
        failureReason: tierMeta?.failureReason,
      }
    })
  })

  // 5. Map tier content by tier name for easy lookup
  //    Key: 'beginner' | 'intermediate' | 'advanced'
  //    Value: Nuxt Content document (with body for ContentRenderer)
  const tierContentMap = computed(() => {
    const map = new Map<MasterclassTier, any>()
    if (!rawTiers.value) return map
    for (const doc of rawTiers.value) {
      // Extract tier from path: /masterclasses/google-stitch/beginner -> "beginner"
      const segments = doc.path.split('/')
      const tierName = segments[segments.length - 1] as MasterclassTier
      if (TIER_ORDER.includes(tierName)) {
        map.set(tierName, doc)
      }
    }
    return map
  })

  // 6. Available tiers (in order, excluding failed)
  const availableTiers = computed<MasterclassTier[]>(() =>
    tierAvailability.value
      .filter(t => t.available)
      .map(t => t.tier)
  )

  // 7. Default tier: beginner if available, otherwise first available
  const defaultTier = computed<MasterclassTier | null>(() =>
    availableTiers.value.includes('beginner')
      ? 'beginner'
      : availableTiers.value[0] ?? null
  )

  // 8. Build enriched detail data
  const detail = computed<MasterclassDetailData | null>(() => {
    if (!rawMetadata.value) return null
    const meta = rawMetadata.value
    const matchedTool = allTools.value?.find(
      (t: ToolWithStars) => t.slug === meta.slug || t.id === meta.toolId
    )
    return {
      slug: meta.slug,
      name: meta.name,
      category: meta.category,
      description: meta.description ?? matchedTool?.description ?? null,
      tldr: meta.tldr ?? '',
      sourceCount: meta.sourceCount,
      generatedAt: meta.generatedAt,
      modelUsed: meta.modelUsed,
      relatedTopics: meta.relatedTopics ?? [],
      tags: meta.tags ?? [],
      toolId: meta.toolId,
      tierAvailability: tierAvailability.value,
      website: matchedTool?.website ?? null,
      githubRepo: matchedTool?.github?.repo ?? null,
      stars: matchedTool?.stars,
    }
  })

  return {
    detail,
    tierContentMap,
    availableTiers,
    defaultTier,
    tierAvailability,
    pending,
    error,
    notFound,
  }
}
```

**Edge cases handled**:
- **All tiers failed**: `availableTiers` is empty, `defaultTier` is null. The detail page should show a "Content generation failed" message instead of tabs.
- **Partial tier failure**: e.g., only `beginner` and `intermediate` succeeded. The tabs only show those two. Failed tier triggers are hidden, not disabled (to avoid confusion).
- **No matching tool**: For `technique`/`skill` topics, there is no tool enrichment. The `matchedTool` is undefined and tool-specific fields are null.
- **Slug mismatch**: If the metadata `slug` field does not match the directory name, the `where('path', 'LIKE', ...)` query may fail. This should not happen with the writer but warrants a defensive check.

### Pages

| File | Action | Details |
|------|--------|---------|
| `src/pages/masterclasses/index.vue` | Create | Index page with category filter bar, search, sort, and mixed card grid |
| `src/pages/masterclasses/[slug].vue` | Create | Detail page with tabbed tier content |
| `src/pages/tools/index.vue` | Delete | Replaced by masterclasses index |

#### Index page (`src/pages/masterclasses/index.vue`) — Full Pseudocode

```vue
<script setup lang="ts">
import { useMasterclassIndex } from '~/composables/useMasterclassIndex'
import { useIntersectionObserver } from '@vueuse/core'
import { CATEGORY_LABELS } from '~/types/masterclass'
import type { MasterclassCategory } from '~/types/masterclass'
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

definePageMeta({
  footer: false
})

useSeoMeta({
  title: 'Masterclasses | YouTube Summaries',
  description: 'Deep-dive masterclasses on AI tools, techniques, and skills. Browse beginner to advanced content built from real video sources.',
  ogTitle: 'Masterclasses | YouTube Summaries',
  ogDescription: 'Deep-dive masterclasses on AI tools, techniques, and skills.',
})

const {
  displayedEntries,
  pending,
  error,
  totalCount,
  masterclassCount,
  filteredCount,
  categoryCounts,
  hasMore,
  searchQuery,
  categoryFilter,
  sortBy,
  loadMore,
  setSearch,
  setCategory,
  setSort,
  refresh,
} = useMasterclassIndex()

// Infinite scroll trigger
const loadMoreTrigger = ref<HTMLElement | null>(null)
const { stop } = useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting && hasMore.value && !pending.value) loadMore()
  },
  { threshold: 0.1 }
)
onUnmounted(() => stop())

// Category filter bar data — adapted for masterclass categories
const filterCategories = computed(() => {
  const cats: Array<{ categoryId: string; name: string; shortName: string; totalItems: number }> = []
  for (const [catId, label] of Object.entries(CATEGORY_LABELS)) {
    const count = categoryCounts.value.get(catId as MasterclassCategory) ?? 0
    if (count > 0) {
      cats.push({
        categoryId: catId,
        name: label,
        shortName: label,  // masterclass categories are short enough already
        totalItems: count,
      })
    }
  }
  return cats
})

// Empty state conditions
const showEmptySearch = computed(() =>
  !pending.value && searchQuery.value && filteredCount.value === 0
)
const showNoData = computed(() =>
  !pending.value && !searchQuery.value && totalCount.value === 0
)
</script>

<template>
  <div class="px-7 pt-0 pb-7">
    <!-- Category filter bar (reusing existing CategoryFilterBar) -->
    <CategoryFilterBar
      v-if="!pending && filterCategories.length > 1"
      :categories="filterCategories"
      :selected-category="categoryFilter"
      :total-count="totalCount"
      @select="setCategory($event)"
    />

    <header class="mb-7 pt-7">
      <div class="flex justify-between items-start gap-5 flex-wrap">
        <div>
          <h1 class="m-0 text-xl">Masterclasses</h1>
          <p class="mt-1.5 text-muted-foreground text-sm" aria-live="polite" aria-atomic="true">
            {{ masterclassCount }} masterclasses, {{ totalCount - masterclassCount }} tools
            <span v-if="categoryFilter || searchQuery">
              &middot; showing {{ filteredCount }}
            </span>
          </p>
        </div>
        <div class="flex items-center gap-3 flex-1 md:flex-none md:w-auto justify-end">
          <!-- Search input (same pattern as summaries index) -->
          <div class="relative w-full max-w-sm">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              :model-value="searchQuery"
              type="search"
              class="pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden"
              placeholder="Search masterclasses..."
              aria-label="Search masterclasses"
              @update:model-value="setSearch($event)"
            />
            <button
              v-if="searchQuery"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground rounded-sm hover:bg-accent"
              aria-label="Clear search"
              @click="setSearch('')"
            >
              <X class="size-3.5" aria-hidden="true" />
            </button>
          </div>
          <!-- Sort control (reuse SortControl or inline select) -->
          <ToolsFilters
            :sort-by="sortBy"
            :has-stars-data="false"
            @update:sort-by="setSort"
          />
          <!-- NOTE: ToolsFilters may need adaptation for masterclass sort options.
               If the sort options differ (relevance/alpha/newest vs mentions/alpha/stars),
               create a new MasterclassSort component or generalize ToolsFilters. -->
        </div>
      </div>
    </header>

    <!-- Loading skeleton -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true">
      <MasterclassCardSkeleton v-for="n in 9" :key="n" />
    </div>

    <!-- Error state -->
    <PageErrorState v-else-if="error" message="Failed to load masterclasses." @retry="refresh()" />

    <!-- Empty: no data at all -->
    <PageEmptyState
      v-else-if="showNoData"
      icon="inbox"
      message="No masterclasses available yet."
      hint="Check back soon — masterclasses are being generated."
    />

    <!-- Empty: search/filter yielded nothing -->
    <PageEmptyState
      v-else-if="showEmptySearch"
      icon="search_off"
      :message="`No results for &quot;${searchQuery}&quot;`"
      hint="Try different keywords or clear the search."
      action-text="Clear search"
      @action="setSearch('')"
    />

    <!-- Card grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
      <template v-for="entry in displayedEntries" :key="entry.slug">
        <MasterclassCard v-if="entry.hasMasterclass" :entry="entry" role="listitem" />
        <ToolBasicCard v-else :entry="entry" role="listitem" />
      </template>

      <!-- Infinite scroll trigger -->
      <div v-if="hasMore" ref="loadMoreTrigger" class="col-span-full py-8 text-center">
        <Skeleton class="h-32 w-full rounded-lg" />
      </div>

      <!-- End indicator -->
      <div v-else-if="displayedEntries.length > 0" class="col-span-full py-6 text-center text-sm text-muted-foreground">
        Showing all {{ filteredCount }} results
      </div>
    </div>
  </div>
</template>
```

**CategoryFilterBar adaptation**: The existing `CategoryFilterBar` component accepts `categories: TagCategory[]` where `TagCategory` has `{ categoryId, name, shortName, totalItems, tags }`. For masterclasses, we pass objects with the same shape but without `tags` (the component only uses `categoryId`, `shortName`, `totalItems` in its template). This works without modifying the component, but the TypeScript types will need a cast or the component's props should be generalized. **Recommendation**: Update the `CategoryFilterBar` props to accept a narrower interface:

```ts
// Proposed: extract a generic FilterCategory interface
interface FilterCategory {
  categoryId: string
  name: string
  shortName: string
  totalItems: number
}
```

This is backwards-compatible since `TagCategory` extends `FilterCategory`.

#### Detail page (`src/pages/masterclasses/[slug].vue`) — Full Pseudocode

```vue
<script setup lang="ts">
import { useMasterclassDetail } from '~/composables/useMasterclassDetail'
import { TIER_LABELS, CATEGORY_LABELS } from '~/types/masterclass'
import type { MasterclassTier } from '~/types/masterclass'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText, ExternalLink, Github, Star } from 'lucide-vue-next'

definePageMeta({
  footer: false
})

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const {
  detail,
  tierContentMap,
  availableTiers,
  defaultTier,
  pending,
  error,
  notFound,
} = useMasterclassDetail(slug)

// --- Tab state synced with URL ---
// Read initial tier from query param, validate it, default to defaultTier
const activeTier = ref<MasterclassTier>('beginner')

// Initialize from URL once data loads
watch([defaultTier, () => route.query.tier], ([newDefault, queryTier]) => {
  if (queryTier && availableTiers.value.includes(queryTier as MasterclassTier)) {
    activeTier.value = queryTier as MasterclassTier
  } else if (newDefault) {
    activeTier.value = newDefault
  }
}, { immediate: true })

// Sync tier changes back to URL (without full navigation)
watch(activeTier, (tier) => {
  const query = { ...route.query }
  if (tier === defaultTier.value) {
    delete query.tier  // don't clutter URL for default
  } else {
    query.tier = tier
  }
  router.replace({ query })
})

// Current tier content for ContentRenderer
const currentTierContent = computed(() =>
  tierContentMap.value.get(activeTier.value) ?? null
)

// --- SEO ---
// Dynamic meta that updates when the tier changes
useSeoMeta({
  title: () => detail.value
    ? `${detail.value.name} Masterclass${activeTier.value !== 'beginner' ? ` -- ${TIER_LABELS[activeTier.value]}` : ''} | YouTube Summaries`
    : 'Masterclass | YouTube Summaries',
  description: () => detail.value?.tldr ?? 'AI-generated masterclass content.',
  ogTitle: () => detail.value
    ? `${detail.value.name} Masterclass | YouTube Summaries`
    : 'Masterclass | YouTube Summaries',
  ogDescription: () => detail.value?.description ?? detail.value?.tldr ?? '',
})

// --- Structured Data (JSON-LD) ---
// Article structured data for SEO
useHead({
  script: computed(() => {
    if (!detail.value) return []
    return [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${detail.value.name} Masterclass`,
        description: detail.value.tldr,
        datePublished: detail.value.generatedAt,
        author: {
          '@type': 'Organization',
          name: 'YouTube Summaries',
        },
        about: {
          '@type': 'Thing',
          name: detail.value.name,
        },
      }),
    }]
  }),
})

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}
</script>

<template>
  <section class="py-8">
    <!-- Loading skeleton -->
    <div v-if="pending" aria-busy="true" aria-label="Loading masterclass">
      <div class="max-w-[80ch] mx-auto px-4 space-y-4">
        <Skeleton class="h-4 w-32" />
        <Skeleton class="h-8 w-3/4" />
        <Skeleton class="h-4 w-full" />
        <div class="flex gap-2 mt-6">
          <Skeleton class="h-10 w-28" />
          <Skeleton class="h-10 w-28" />
          <Skeleton class="h-10 w-28" />
        </div>
        <Skeleton class="h-64 w-full rounded-lg mt-4" />
      </div>
    </div>

    <!-- Error state -->
    <PageErrorState v-else-if="error" message="Failed to load this masterclass." @retry="() => {}" />

    <!-- Not found -->
    <PageNotFound
      v-else-if="notFound"
      icon="help_outline"
      title="Masterclass not found"
      message="We couldn't find the masterclass you're looking for."
      link-to="/masterclasses"
      link-text="Browse all masterclasses"
    />

    <!-- Content -->
    <div v-else-if="detail" class="max-w-[80ch] mx-auto px-4">
      <!-- Back link -->
      <NuxtLink to="/masterclasses" class="text-sm text-muted-foreground hover:text-foreground">
        Back to masterclasses
      </NuxtLink>

      <!-- Header -->
      <div class="mt-4 mb-6">
        <div class="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{{ CATEGORY_LABELS[detail.category] }}</Badge>
          <span v-if="detail.stars" class="text-sm text-muted-foreground flex items-center gap-1">
            <Star class="size-3" aria-hidden="true" /> {{ detail.stars.toLocaleString() }}
          </span>
        </div>
        <h1 class="text-2xl font-bold">{{ detail.name }}</h1>
        <p v-if="detail.tldr" class="mt-2 text-muted-foreground">{{ detail.tldr }}</p>

        <!-- Meta row -->
        <div class="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <span class="flex items-center gap-1">
            <FileText class="size-4" aria-hidden="true" />
            Built from {{ detail.sourceCount }} sources
          </span>
          <span class="flex items-center gap-1">
            <Calendar class="size-4" aria-hidden="true" />
            {{ formatDate(detail.generatedAt) }}
          </span>
          <a
            v-if="detail.website"
            :href="detail.website"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 text-primary hover:underline"
          >
            <ExternalLink class="size-4" aria-hidden="true" />
            Website
          </a>
          <a
            v-if="detail.githubRepo"
            :href="`https://github.com/${detail.githubRepo}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 text-primary hover:underline"
          >
            <Github class="size-4" aria-hidden="true" />
            GitHub
          </a>
        </div>

        <!-- Related topics -->
        <div v-if="detail.relatedTopics.length" class="mt-4 flex flex-wrap gap-2">
          <span class="text-sm text-muted-foreground">Related:</span>
          <NuxtLink
            v-for="related in detail.relatedTopics"
            :key="related"
            :to="`/masterclasses/${related}`"
            class="text-sm text-primary hover:underline"
          >
            {{ related }}
          </NuxtLink>
        </div>
      </div>

      <!-- All tiers failed -->
      <div v-if="availableTiers.length === 0" class="p-6 bg-muted rounded-lg text-center">
        <p class="text-muted-foreground">Content generation is in progress. Check back soon.</p>
      </div>

      <!-- Tabbed tier content -->
      <Tabs
        v-else
        :model-value="activeTier"
        @update:model-value="(val: string) => activeTier = val as MasterclassTier"
      >
        <TabsList class="w-full justify-start">
          <TabsTrigger
            v-for="tier in availableTiers"
            :key="tier"
            :value="tier"
          >
            {{ TIER_LABELS[tier] }}
          </TabsTrigger>
        </TabsList>

        <TabsContent
          v-for="tier in availableTiers"
          :key="tier"
          :value="tier"
          class="mt-6"
        >
          <div v-if="tierContentMap.get(tier)">
            <ContentRenderer
              :value="tierContentMap.get(tier)"
              class="prose prose-zinc dark:prose-invert max-w-none"
            />
          </div>
          <div v-else class="py-8 text-center text-muted-foreground">
            <Skeleton class="h-64 w-full rounded-lg" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>
```

**Tab implementation details**:
- The shadcn `Tabs` component (backed by reka-ui `TabsRoot`) handles keyboard navigation (arrow keys, Home/End) and ARIA roles automatically.
- `model-value` / `@update:model-value` gives us controlled mode so we can sync with the URL.
- The `TabsContent` for each tier is always rendered in the DOM but hidden by reka-ui. This means all tier content is fetched once and switching is instant (no additional network requests).
- URL sync: `?tier=intermediate` deep-links work via the `watch` on `route.query.tier`.
- Default behavior: the URL has no `?tier=` param when the default tier (beginner) is selected, keeping URLs clean.

### Components

| File | Action | Details |
|------|--------|---------|
| `src/components/content/MasterclassCard.vue` | Create | Card for masterclass topics in the index |
| `src/components/content/MasterclassCardSkeleton.vue` | Create | Loading skeleton for the card |
| `src/components/content/ToolBasicCard.vue` | Create | Simplified card for tools without masterclass |

#### `MasterclassCard.vue` — Full Pseudocode

```vue
<script setup lang="ts">
import type { MasterclassIndexEntry } from '~/types/masterclass'
import { CATEGORY_LABELS } from '~/types/masterclass'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { FileText, Star } from 'lucide-vue-next'

defineProps<{
  entry: MasterclassIndexEntry
}>()
</script>

<template>
  <Card class="transition-colors hover:border-primary/50">
    <NuxtLink :to="`/masterclasses/${entry.slug}`" class="block no-underline text-foreground">
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between gap-2">
          <h3 class="font-semibold text-base line-clamp-1">{{ entry.name }}</h3>
          <Badge variant="outline" class="shrink-0 text-xs">
            {{ CATEGORY_LABELS[entry.category] }}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p v-if="entry.tldr" class="text-sm text-muted-foreground line-clamp-2 mb-3">
          {{ entry.tldr }}
        </p>
        <p v-else-if="entry.description" class="text-sm text-muted-foreground line-clamp-2 mb-3">
          {{ entry.description }}
        </p>
        <div class="flex items-center gap-3 text-xs text-muted-foreground">
          <span v-if="entry.sourceCount" class="flex items-center gap-1">
            <FileText class="size-3" aria-hidden="true" />
            {{ entry.sourceCount }} sources
          </span>
          <span v-if="entry.stars" class="flex items-center gap-1">
            <Star class="size-3" aria-hidden="true" />
            {{ entry.stars.toLocaleString() }}
          </span>
          <span v-if="entry.videoCount" class="flex items-center gap-1">
            {{ entry.videoCount }} videos
          </span>
        </div>
      </CardContent>
    </NuxtLink>
  </Card>
</template>
```

#### `MasterclassCardSkeleton.vue`

```vue
<template>
  <Card>
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between">
        <Skeleton class="h-5 w-32" />
        <Skeleton class="h-5 w-16 rounded-full" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton class="h-4 w-full mb-1" />
      <Skeleton class="h-4 w-3/4 mb-3" />
      <div class="flex gap-3">
        <Skeleton class="h-3 w-20" />
        <Skeleton class="h-3 w-16" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardContent } from '@/components/ui/card'
</script>
```

#### `ToolBasicCard.vue`

```vue
<script setup lang="ts">
import type { MasterclassIndexEntry } from '~/types/masterclass'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, ExternalLink } from 'lucide-vue-next'

defineProps<{
  entry: MasterclassIndexEntry
}>()
</script>

<template>
  <Card class="opacity-75">
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between gap-2">
        <h3 class="font-semibold text-base line-clamp-1">{{ entry.name }}</h3>
        <Badge variant="secondary" class="shrink-0 text-xs">Tool</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p v-if="entry.description" class="text-sm text-muted-foreground line-clamp-2 mb-3">
        {{ entry.description }}
      </p>
      <div class="flex items-center gap-3 text-xs text-muted-foreground">
        <span v-if="entry.videoCount" class="flex items-center gap-1">
          {{ entry.videoCount }} videos
        </span>
        <span v-if="entry.stars" class="flex items-center gap-1">
          <Star class="size-3" aria-hidden="true" />
          {{ entry.stars.toLocaleString() }}
        </span>
        <a
          v-if="entry.website"
          :href="entry.website"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-primary hover:underline"
          :aria-label="`${entry.name} website (opens in new tab)`"
          @click.stop
        >
          <ExternalLink class="size-3" aria-hidden="true" />
          Website
        </a>
      </div>
      <p class="text-xs text-muted-foreground/60 mt-2 italic">No masterclass yet</p>
    </CardContent>
  </Card>
</template>
```

**Key difference**: `ToolBasicCard` does NOT link to a detail page (there is no masterclass content to show). It is a static card. The `opacity-75` class visually de-emphasizes it relative to masterclass cards. The website link has `@click.stop` to prevent the card from acting as a link container.

### Navigation

| File | Action | Details |
|------|--------|---------|
| `src/components/AppSidebar.vue` | Modify | Replace "Tools" footer link with "Masterclasses" link to `/masterclasses` |

Change in sidebar footer (line 141):
```vue
<!-- Before -->
<NuxtLink to="/tools" class="text-sm text-muted-foreground hover:text-foreground">
  Tools
</NuxtLink>
<!-- After -->
<NuxtLink to="/masterclasses" class="text-sm text-muted-foreground hover:text-foreground">
  Masterclasses
</NuxtLink>
```

**Future consideration**: If masterclass content grows (10+ topics), promote "Masterclasses" from the footer to a proper `SidebarGroup` in the main content area, potentially with top masterclass topics as sub-items.

### Config / Routes

| File | Action | Details |
|------|--------|---------|
| `src/nuxt.config.ts` | Modify | Add route rules for masterclasses; add `/tools` redirect |

```ts
// Route rules additions in routeRules:
'/masterclasses': { isr: 3600 },
'/masterclasses/**': { isr: 3600 },
// Redirect old tools URL — 301 permanent redirect
'/tools': { redirect: { to: '/masterclasses', statusCode: 301 } },
```

Remove the existing:
```ts
'/tools': { isr: 3600 },
```

**Note on redirect implementation**: Nuxt's `redirect` in `routeRules` generates a server-side 301. This works in both SSR and prerender modes. The redirect is handled by Nitro before Vue Router, so it works for direct URL access and crawlers.

### Server Routes

| File | Action | Details |
|------|--------|---------|
| `src/server/routes/tools-with-stars.json.ts` | Keep | Still needed for enriching tool entries in the index |

No new server routes needed. Masterclass content is served via Nuxt Content collections.

### Content Sync

Masterclass content files (`metadata.yml`, `beginner.md`, etc.) need to be synced from the scraper repo to the client's `src/content/masterclasses/` directory.

**Current state**: The scraper repo does NOT yet have generated masterclass content in `src/content/masterclasses/` (the directory does not exist). The scraper has the generation pipeline (`bun run masterclass:generate`) and the writer service, but actual content generation has not been run yet.

**Sync mechanism**: The client and scraper repos share content via a common `src/content/` directory. Based on codebase inspection:
- The `src/content/` directory contains `summaries/`, `tags/`, `articles/`, `newsletters/`, `tools.yml`, etc.
- These are likely synced via git submodule, shared filesystem, or CI copy step.
- The same mechanism should work for `masterclasses/` once the directory is created.

**Action items for content sync**:
1. Run `bun run masterclass:generate -- --topic google-stitch` in the scraper to generate pilot content.
2. Copy `src/content/masterclasses/google-stitch/` from scraper to client content directory.
3. Verify Nuxt Content picks up the new collection without errors via `pnpm run dev`.
4. Document the sync mechanism in the deployment pipeline.

**Edge case: empty masterclasses directory**: If `src/content/masterclasses/` exists but is empty (or contains only `master-index.yml`), the collections should return empty arrays without errors. The index page handles this via the "No masterclasses available yet" empty state.

**Edge case: master-index.yml in the collection**: The `masterclassMetadata` collection uses `include: 'masterclasses/*/metadata.yml'` which matches `masterclasses/google-stitch/metadata.yml` but NOT `masterclasses/master-index.yml` (no subdirectory). Safe.

---

## Implementation Order

### Phase 1: Content Foundation (can be verified independently)

1. **Create `src/types/masterclass.ts`** — client-side types
2. **Update `content.config.ts`** — add both new collections with the exact schemas above
3. **Generate + copy pilot masterclass content** — run `bun run masterclass:generate -- --topic google-stitch` in the scraper, then copy `src/content/masterclasses/google-stitch/` to the client
4. **Verify**: run `pnpm run dev` and confirm Nuxt Content picks up the new collections without errors. Check the dev console for schema validation warnings.

**Risk**: If the tier markdown files (no frontmatter) cause issues with the `page` collection, we may need to add empty frontmatter (`---\n---\n`) to the writer. Test this in Phase 1 before building pages.

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

14. **Update `src/components/AppSidebar.vue`** — replace Tools with Masterclasses (line 141)
15. **Update `src/nuxt.config.ts`** — route rules (ISR + redirect)
16. **Delete `src/pages/tools/index.vue`** — old tools page
17. **Verify**: `/tools` redirects to `/masterclasses`, sidebar link works

### Phase 5: Polish

18. Add `useSeoMeta` + JSON-LD structured data to both pages (included in pseudocode above)
19. Ensure `aria-live` on dynamic count regions
20. Confirm skeleton loading states, error states, empty states all render correctly
21. Test with `pnpm vitest run`

### Phase 6: Cleanup (same PR)

22. **Delete** `src/components/content/ToolCard.vue` — replaced by `MasterclassCard` + `ToolBasicCard`
23. **Delete** `src/components/content/ToolsSearch.vue` — search is now inline in index page
24. **Delete** `src/components/content/ToolsFilters.vue` — replaced by `CategoryFilterBar` + inline sort
25. **Consider**: Keep or modify `src/composables/useToolsDirectory.ts` — it is still needed if `tools-with-stars.json` is used by the index composable. If `useMasterclassIndex` fully replaces it, delete it.

---

## Integration with Existing Patterns

| Pattern | How Masterclasses Follows It |
|---------|------------------------------|
| List Page (Pattern 1) | Index uses composable for data + filter/sort, handles pending/error/empty states, `aria-live` on counts |
| Detail Page (Pattern 2) | Detail uses `useAsyncData` + `queryCollection`, handles pending/error/not-found, `useSeoMeta` |
| Card Component (Pattern 3) | `MasterclassCard` is props-only, typed, Tailwind-only, `<NuxtLink>` to detail page |
| Content collection | New `masterclasses` + `masterclassMetadata` collections in `content.config.ts` with Zod schemas |
| Data fetching | `useAsyncData` with proper key naming: `masterclass-metadata-all`, `masterclass-meta-${slug}`, `masterclass-tiers-${slug}` |
| UI primitives | shadcn `Badge`, `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`, `Card`/`CardHeader`/`CardContent`, `Skeleton`, `Input` |
| ISR rendering | Same `isr: 3600` pattern as summaries |
| Accessibility | `aria-live` on counts, `aria-hidden` on decorative icons, accessible tab navigation (reka-ui handles this), `aria-busy` on loading states |

---

## Edge Cases and Risks

### Content Edge Cases

| Edge Case | Handling |
|-----------|----------|
| **No masterclass content at all** (empty `src/content/masterclasses/`) | Index shows only tool-fallback entries. Empty state if no tools either. |
| **Topic with all tiers failed** | Detail page shows header + "Content generation in progress" message. No tabs rendered. |
| **Topic with partial tier failure** (e.g., only beginner succeeded) | Only available tiers show in tabs. Default selects first available. |
| **Tier markdown file exists but is empty** | `ContentRenderer` renders nothing. Should show gracefully as blank. |
| **`?tier=advanced` but advanced tier failed** | `watch` falls back to `defaultTier` (first available). URL param is silently corrected. |
| **Tool in tools.yml matches masterclass slug** | Merge logic picks up tool enrichment (stars, website, GitHub). Works. |
| **Tool slug differs from masterclass slug** | Falls back to `toolId` matching. If no match, tool enrichment fields are null. |
| **887 tools flooding the index** | `TOOL_MENTION_THRESHOLD = 3` filters to ~100-150 tools. Tunable constant. |
| **masterclass-index.yml accidentally matched** | Not matched: glob uses `*/metadata.yml` which requires a subdirectory. |
| **No frontmatter in tier .md files** | Nuxt Content `page` type handles pure markdown. Verified: no frontmatter is valid. Risk: may not work with all Nuxt Content versions — test in Phase 1. |

### Performance Risks

| Risk | Mitigation |
|------|------------|
| **Loading all tools-with-stars.json (large payload) on every masterclass page** | The server route is prerendered + cached (1hr). `useFetch` caches across SPA navigation. For detail pages, use `lazy: true` since tool data is only for enrichment. |
| **Loading 3 tier markdown bodies at once on detail page** | The bodies are typically 2-5KB each. Loading all 3 (~15KB total) is negligible. `TabsContent` lazy-mounts on first activation by default in reka-ui. |
| **ISR cold start** | Same as summaries/tags — acceptable 1-2s on first hit after deploy. |
| **queryCollection LIKE query performance** | The masterclass collection is tiny (initially 1-3 topics, max ~50). No concern. |

### Content Sync Risks

| Risk | Mitigation |
|------|------------|
| **Scraper and client content get out of sync** | Same risk as existing summaries/tags sync. Follow the same CI mechanism. |
| **Schema version mismatch** | Zod schema uses `z.string()` for `schemaVersion` (not enum) for forward-compat. Unknown extra fields in YAML are ignored by Zod's default `strip` mode. |
| **Pilot content not available** | The scraper's `masterclass:generate` command has not been run yet. Must generate before Phase 1 verification. |

---

## SEO Strategy

### Index Page (`/masterclasses`)
- `useSeoMeta`: title, description, ogTitle, ogDescription
- No structured data needed (it is a list page)

### Detail Page (`/masterclasses/[slug]`)
- `useSeoMeta`: dynamic title including topic name and tier, description from tldr
- JSON-LD `Article` structured data with headline, description, datePublished, author
- Canonical URL should NOT include `?tier=` param (all tiers are the same page)

### Redirect SEO
- `/tools` -> `/masterclasses` is a 301 (permanent) redirect. Search engines will transfer link equity.
- Any external links to `/tools` will continue to work.

---

## Testing Strategy

### Unit Tests

| Test File | Coverage |
|-----------|----------|
| `src/tests/composables/useMasterclassIndex.test.ts` | Merge logic: masterclass entries override matching tools, non-matching tools appear as basic, threshold filtering, search across name/description/tags, category filtering, all three sort modes |
| `src/tests/composables/useMasterclassDetail.test.ts` | Metadata loading, tier availability computation, defaultTier selection (beginner available, beginner failed, all failed), tierContentMap path parsing |
| `src/tests/config/masterclass-collections.test.ts` | Zod schema validation: valid metadata.yml parses correctly, missing required fields fail, optional fields can be omitted, tiers array with failed entries parses, empty tldr string is valid |

### Manual Testing Checklist

- [ ] `/masterclasses` loads with Google Stitch as a masterclass card
- [ ] Other tools (3+ mentions) appear as basic entries in the index
- [ ] Tools with <3 mentions do NOT appear in the index
- [ ] Category filter (All/Tools/Techniques/Skills) works; chips show accurate counts
- [ ] Search filters by name, description, and tags
- [ ] Sort options work (relevance, alpha, newest)
- [ ] URL updates with search/filter/sort params
- [ ] Loading the page with URL params restores filter/search/sort state
- [ ] `/masterclasses/google-stitch` shows tabbed page with beginner/intermediate/advanced
- [ ] Tab switching works, content renders markdown sections (Overview, Key Concepts, etc.)
- [ ] `?tier=advanced` deep-links to the advanced tab
- [ ] Invalid `?tier=invalid` falls back to default tier
- [ ] Tab switching updates URL without full page navigation
- [ ] `/tools` redirects to `/masterclasses` (301)
- [ ] Sidebar shows "Masterclasses" link instead of "Tools"
- [ ] Loading skeletons display during data fetch (grid of card skeletons on index, header + tab skeletons on detail)
- [ ] Error state displays when data fails to load (both pages)
- [ ] 404 page displays for non-existent slug with link back to `/masterclasses`
- [ ] SEO meta tags present on both pages (inspect via Vue devtools or view-source)
- [ ] JSON-LD structured data present on detail page
- [ ] Related topics links work and navigate to other masterclass pages
- [ ] Tool enrichment (stars, website, GitHub) displays when available
- [ ] Builds successfully with `pnpm run build`
- [ ] No TypeScript errors with `pnpm run typecheck`

---

## Open Questions (Updated)

1. **Content sync mechanism** — How are masterclass files copied from the scraper to the client? Existing summaries/tags use a shared content directory or CI copy. The implementer should verify the current mechanism and replicate it. **New finding**: The scraper does not yet have generated masterclass content — must run `bun run masterclass:generate` first.

2. **CategoryFilterBar type generalization** — The component currently expects `TagCategory[]` (which includes a `tags` array). Masterclass categories do not have tags. **Recommendation**: Extract a `FilterCategory` interface with just `{ categoryId, name, shortName, totalItems }` and update the component props. This is backwards-compatible.

3. **Tool-to-masterclass matching** — Use `slug` as primary key, `toolId` as fallback. This is settled in the composable pseudocode above.

4. **Non-masterclass tool volume** — **Resolved**: Use `TOOL_MENTION_THRESHOLD = 3` to filter to ~100-150 meaningful tools. The constant is easily tunable if the number feels wrong in practice.

5. **Tab state persistence across topics** — **Resolved**: Each topic starts at beginner (or first available). No cross-topic persistence. URL params are per-page. `localStorage` preference can be added later if users request it.

6. **Existing component cleanup** — **Resolved**: Delete `ToolCard.vue`, `ToolsSearch.vue`, `ToolsFilters.vue` in Phase 6 of the same PR. Keep `useToolsDirectory.ts` only if still referenced; otherwise delete.

7. **No-frontmatter markdown in page collection** (NEW) — The scraper writes tier files as plain markdown without YAML frontmatter. Nuxt Content `type: 'page'` should handle this, but it needs explicit verification in Phase 1. If it fails, the fix is to add `---\n---\n` (empty frontmatter) to the writer template.

8. **Sort control component reuse** (NEW) — The index page needs sort options `relevance | alpha | newest`, but the existing `ToolsFilters` component uses `mentions | alpha | stars`. Either generalize `ToolsFilters` to accept configurable options, or create a new sort control. **Recommendation**: Create a small `MasterclassSortControl.vue` or reuse the generic `SortControl` component from the summaries page if it accepts configurable options.

9. **Related topics display names** (NEW) — The `relatedTopics` field stores slugs (e.g., `google-stitch`), not display names. On the detail page, we show slugs as link text. To show proper names, we would need to load all masterclass metadata and look up names by slug. For the initial implementation, showing slugs is acceptable. A follow-up can enrich these with a lookup.

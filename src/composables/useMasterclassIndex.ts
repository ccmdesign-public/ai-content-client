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

  // 1. Load masterclass metadata via queryCollection
  const { data: rawMetadata, pending: metaPending, error: metaError, refresh: refreshMeta } = useAsyncData(
    'masterclass-metadata-all',
    () => queryCollection('masterclassMetadata').all()
  )

  // 2. Load tools-with-stars.json via useFetch (same pattern as useToolsDirectory)
  const { data: allTools, pending: toolsPending, error: toolsError, refresh: refreshTools } = useFetch<ToolWithStars[]>(
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
          (t: ToolWithStars) => t.slug === meta.slug || t.id === meta.toolId
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
          videoCount: matchedTool?.stats?.videoCount,
          stars: matchedTool?.stars,
          website: matchedTool?.website,
          githubRepo: matchedTool?.github?.repo ?? null,
        })
      }
    }

    // Second pass: tools WITHOUT a masterclass (fallback entries)
    const TOOL_MENTION_THRESHOLD = 3
    if (allTools.value) {
      for (const tool of allTools.value) {
        if (masterclassSlugs.has(tool.slug)) continue
        if (tool.stats.videoCount < TOOL_MENTION_THRESHOLD) continue
        result.push({
          slug: tool.slug,
          name: tool.name,
          category: 'tool',
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
    refreshMeta()
    refreshTools()
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

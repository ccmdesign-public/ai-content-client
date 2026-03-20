import { useDebounceFn } from '@vueuse/core'
import type { ToolWithStars } from '~/types/tools'

export type SortOption = 'mentions' | 'alpha' | 'stars'

/**
 * Composable for the tools directory page.
 * Handles data loading, search, filtering, and infinite scroll.
 */
export function useToolsDirectory() {
  const route = useRoute()
  const router = useRouter()

  // Load tools data (prerendered at build time)
  const { data: allTools, pending, error } = useFetch<ToolWithStars[]>('/tools-with-stars.json', {
    key: 'tools-directory'
  })

  // Search state from URL
  const searchQuery = ref((route.query.q as string) || '')

  // Sort state from URL
  const sortBy = ref<SortOption>((route.query.sort as SortOption) || 'mentions')

  // Infinite scroll state
  const displayCount = ref(50)

  // Filtered and sorted tools
  const filteredTools = computed(() => {
    let result = allTools.value || []

    // Apply search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.aliases?.some(a => a.toLowerCase().includes(query))
      )
    }

    // Apply sorting
    if (sortBy.value === 'alpha') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy.value === 'stars') {
      result = [...result].sort((a, b) => (b.stars || 0) - (a.stars || 0))
    } else {
      // Default: mentions (already sorted from server)
      result = [...result].sort((a, b) => b.stats.videoCount - a.stats.videoCount)
    }

    return result
  })

  // Displayed tools (with infinite scroll limit)
  const displayedTools = computed(() =>
    filteredTools.value.slice(0, displayCount.value)
  )

  // Whether there are more tools to load
  const hasMore = computed(() =>
    displayCount.value < filteredTools.value.length
  )

  // Total tools count
  const totalCount = computed(() => allTools.value?.length || 0)

  // Filtered count (for search results)
  const filteredCount = computed(() => filteredTools.value.length)

  // Tools with GitHub stars count
  const toolsWithStars = computed(() =>
    allTools.value?.filter(t => t.stars !== undefined).length || 0
  )

  /**
   * Load more tools for infinite scroll
   */
  function loadMore() {
    displayCount.value += 50
  }

  /**
   * Reset display count (e.g., after search)
   */
  function resetDisplayCount() {
    displayCount.value = 50
  }

  /**
   * Update search query and sync to URL
   */
  function setSearch(query: string) {
    searchQuery.value = query
    resetDisplayCount()
  }

  /**
   * Update sort option and sync to URL
   */
  function setSort(option: SortOption) {
    sortBy.value = option
    resetDisplayCount()
  }

  // Sync state to URL (debounced for search)
  const debouncedUrlSync = useDebounceFn(() => {
    const query: Record<string, string | undefined> = {}
    if (searchQuery.value) query.q = searchQuery.value
    if (sortBy.value !== 'mentions') query.sort = sortBy.value
    router.replace({ query })
  }, 300)

  watch([searchQuery, sortBy], () => {
    debouncedUrlSync()
  })

  return {
    // Data
    allTools,
    displayedTools,
    filteredTools,
    pending,
    error,
    // Counts
    totalCount,
    filteredCount,
    toolsWithStars,
    hasMore,
    // State
    searchQuery,
    sortBy,
    // Actions
    loadMore,
    setSearch,
    setSort,
    resetDisplayCount
  }
}

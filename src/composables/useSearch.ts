/**
 * Composable wrapping MiniSearch for client-side full-text search.
 *
 * This is a parallel data path to useContentStream. The search index is
 * generated at build time (scripts/build-search-index.ts) and loaded lazily
 * on first user interaction -- never on page load or SSR.
 */
import MiniSearch from 'minisearch'
import { ref, watch, readonly } from 'vue'
import { SEARCH_INDEX_FIELDS, SEARCH_STORE_FIELDS } from '~/types/search'
import type { SearchResult } from '~/types/search'

/** Simple debounce utility (avoids VueUse dependency) */
function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null
  const debounced = (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
  debounced.cancel = () => { if (timer) clearTimeout(timer) }
  return debounced as T & { cancel: () => void }
}

export function useSearch() {
  const query = ref('')
  const isReady = ref(false)
  const error = ref<string | null>(null)
  const results = ref<SearchResult[]>([])
  let miniSearch: MiniSearch | null = null
  let searchVersion = 0 // Guard against out-of-order results
  let abortController: AbortController | null = null

  // Read initial query from URL (client-side only)
  const nuxtApp = tryUseNuxtApp()
  if (nuxtApp) {
    const route = useRoute()
    const initialQ = (route.query.q as string) || ''
    if (initialQ) query.value = initialQ
  }

  /**
   * Load the search index on first use. Must only be called client-side.
   * Safe to call multiple times -- subsequent calls are no-ops.
   */
  async function init() {
    if (isReady.value || miniSearch) return
    if (!import.meta.client) return // Guard against SSR

    abortController = new AbortController()
    try {
      const indexData = await $fetch<string>('/search-index.json', {
        signal: abortController.signal,
        responseType: 'text',
      })
      miniSearch = MiniSearch.loadJSON(indexData, {
        fields: [...SEARCH_INDEX_FIELDS],
        storeFields: [...SEARCH_STORE_FIELDS],
      })
      isReady.value = true

      // If a query was set from URL before init, run search now
      if (query.value.trim()) {
        performSearch(query.value)
      }
    } catch (e: any) {
      if (e?.name === 'AbortError') return // Component unmounted
      error.value = 'Search index could not be loaded'
      console.warn('[useSearch] Failed to load search index:', e)
    }
  }

  /** Synchronous search execution with stale-result guard */
  function performSearch(q: string) {
    const version = ++searchVersion
    if (!miniSearch || !q.trim()) {
      results.value = []
      return
    }
    const searchResults = miniSearch.search(q, {
      boost: { title: 3, tldr: 2 },
      prefix: true,
      fuzzy: 0.2,
    })
    // Only apply if this is still the latest search
    if (version === searchVersion) {
      results.value = searchResults as SearchResult[]
    }
  }

  const debouncedSearch = debounce((q: string) => performSearch(q), 150)

  // Watch query changes and debounce search
  watch(query, (q) => {
    if (!q.trim()) {
      // Clear immediately (no debounce) for better UX
      searchVersion++
      results.value = []
      debouncedSearch.cancel()
    } else {
      debouncedSearch(q)
    }
  })

  // Sync query to URL (client-side only, preserve other params)
  if (nuxtApp && import.meta.client) {
    const route = useRoute()
    watch(query, (newQuery) => {
      const router = useRouter()
      router.replace({
        query: {
          ...route.query,
          q: newQuery || undefined, // Remove param when empty
        },
      })
    })
  }

  /** Whether a search is currently active (non-empty query) */
  const isSearchActive = computed(() => query.value.trim().length > 0)

  /** Cleanup: cancel pending fetch on unmount */
  if (import.meta.client) {
    onUnmounted(() => {
      abortController?.abort()
      debouncedSearch.cancel()
    })
  }

  return {
    query,
    results: readonly(results),
    isReady: readonly(isReady),
    error: readonly(error),
    isSearchActive,
    init,
  }
}

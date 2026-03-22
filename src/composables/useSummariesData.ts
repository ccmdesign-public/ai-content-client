import { useContentStream, SUMMARY_LIST_FIELDS } from './useContentStream'

/**
 * Safely parse a JSON string, returning a fallback on failure.
 * Logs a warning with the document path for debugging.
 */
export function safeParseMetadata(raw: unknown, docPath?: string): Record<string, unknown> {
  if (typeof raw !== 'string') return (raw as Record<string, unknown>) ?? {}
  try {
    return JSON.parse(raw)
  } catch (e) {
    console.warn(
      `[useSummariesData] Malformed metadata JSON${docPath ? ` in ${docPath}` : ''}:`,
      e instanceof Error ? e.message : e
    )
    return {}
  }
}

/**
 * Normalize raw documents by parsing metadata JSON strings and pre-computing
 * sort timestamps to avoid repeated `new Date()` calls in sort/group operations.
 * Exported for direct unit testing.
 */
export function normalizeSummaryDocs(docs: any[]): any[] {
  return docs.map((doc: any) => {
    const metadata = safeParseMetadata(doc.metadata, doc.path)
    return {
      ...doc,
      metadata,
      _publishedAtMs: metadata.publishedAt ? new Date(metadata.publishedAt as string).getTime() : 0,
      _processedAtMs: doc.processedAt ? new Date(doc.processedAt).getTime() : 0,
    }
  })
}

/**
 * localStorage cache entry for the summaries list.
 */
interface SummariesCacheEntry {
  version: number
  cachedAt: number
  count: number
  data: any[]
}

const CACHE_KEY = 'summaries-list-cache'
const CACHE_VERSION = 1
const STALE_THRESHOLD_MS = 6 * 60 * 60 * 1000 // 6 hours

/**
 * Read summaries from localStorage (client-side only).
 * Returns null if missing, corrupt, or wrong version.
 */
export function readLocalCache(): SummariesCacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: SummariesCacheEntry = JSON.parse(raw)
    if (!entry.data || !Array.isArray(entry.data) || !entry.cachedAt) return null
    if (entry.version !== CACHE_VERSION) return null
    return entry
  } catch {
    return null // private browsing, quota errors, corrupt data
  }
}

/**
 * Strip pre-computed fields (_publishedAtMs, _processedAtMs) before persisting.
 * These are re-derived on read by normalizeSummaryDocs, so storing them wastes
 * ~20-30KB of localStorage quota for ~1200 items.
 */
function stripPrecomputedFields(data: any[]): any[] {
  return data.map(({ _publishedAtMs, _processedAtMs, ...rest }) => rest)
}

/**
 * Write summaries to localStorage (client-side only).
 * Silently fails on quota exceeded or private browsing.
 */
export function writeLocalCache(data: any[]) {
  try {
    const entry: SummariesCacheEntry = {
      version: CACHE_VERSION,
      cachedAt: Date.now(),
      count: data.length,
      data: stripPrecomputedFields(data),
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // Silently fail -- quota exceeded, private browsing, etc.
  }
}

/**
 * Shared summaries data composable for all list views.
 *
 * Returns a single cached copy of summaries (with only list-view fields selected)
 * that is shared across routes via Nuxt's useAsyncData key deduplication.
 * Individual pages compose on top with their own computed filters.
 *
 * Three-tier cache:
 * - Tier 1: localStorage (instant, survives refresh/tabs)
 * - Tier 2: Nuxt payload cache via getCachedData (instant within SPA session)
 * - Tier 3: Server fetch with select() (~500KB, ~300ms)
 *
 * IMPORTANT: Only call inside `<script setup>` or `setup()` functions.
 * Never call at module scope -- SSR creates singletons shared across requests.
 */
export function useSummariesData() {
  const isRevalidating = ref(false)

  const result = useContentStream('summaries', {
    select: SUMMARY_LIST_FIELDS as unknown as string[],
    key: 'summaries-list'
  })

  // Computed normalizes only when result.data changes (reference equality with deep: false).
  // With deep: false, this only re-evaluates on actual fetch, not nested property changes.
  const data = computed(() => {
    if (!result.data.value) return null
    return normalizeSummaryDocs(result.data.value)
  })

  // Tier 1: Seed from localStorage on client when Nuxt payload is empty
  if (import.meta.client) {
    const cached = readLocalCache()
    if (cached && !result.data.value) {
      // Inject cached data into the Nuxt payload so getCachedData picks it up
      const nuxtApp = useNuxtApp()
      nuxtApp.payload.data['summaries-list'] = cached.data

      // Check staleness and trigger background revalidation
      const age = Date.now() - cached.cachedAt
      if (age > STALE_THRESHOLD_MS) {
        isRevalidating.value = true
        result.refresh().finally(() => {
          isRevalidating.value = false
        })
      }
    }
  }

  // Write to localStorage when fresh data arrives
  watch(data, (newData) => {
    if (newData && import.meta.client) {
      writeLocalCache(newData)
    }
  })

  // Cross-tab sync: when another tab writes to localStorage, trigger a refresh
  // so the data flows through normalizeSummaryDocs and Vue reactivity properly.
  // (Previous implementation mutated payload.data directly, which did not trigger
  // useAsyncData reactivity with deep: false -- effectively dead code.)
  if (import.meta.client) {
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === CACHE_KEY && e.newValue) {
        try {
          const entry: SummariesCacheEntry = JSON.parse(e.newValue)
          if (entry.data && entry.version === CACHE_VERSION) {
            // Seed the payload so getCachedData returns the fresh data,
            // then refresh to trigger proper reactivity through useAsyncData.
            const nuxtApp = useNuxtApp()
            nuxtApp.payload.data['summaries-list'] = entry.data
            result.data.value = entry.data
          }
        } catch {
          // Ignore corrupt cross-tab data
        }
      }
    }

    window.addEventListener('storage', onStorageChange)

    // Clean up on scope disposal to prevent memory leaks
    if (getCurrentScope()) {
      onScopeDispose(() => {
        window.removeEventListener('storage', onStorageChange)
      })
    }
  }

  return { ...result, data, isRevalidating }
}

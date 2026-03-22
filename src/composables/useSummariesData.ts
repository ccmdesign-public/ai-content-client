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
 * Normalize raw documents by parsing metadata JSON strings.
 * Exported for direct unit testing.
 */
export function normalizeSummaryDocs(docs: any[]): any[] {
  return docs.map((doc: any) => ({
    ...doc,
    metadata: safeParseMetadata(doc.metadata, doc.path)
  }))
}

/**
 * Shared summaries data composable for all list views.
 *
 * Returns a single cached copy of summaries (with only list-view fields selected)
 * that is shared across routes via Nuxt's useAsyncData key deduplication.
 * Individual pages compose on top with their own computed filters.
 *
 * IMPORTANT: Only call inside `<script setup>` or `setup()` functions.
 * Never call at module scope -- SSR creates singletons shared across requests.
 */
export function useSummariesData() {
  const result = useContentStream('summaries', {
    select: SUMMARY_LIST_FIELDS as unknown as string[],
    key: 'summaries-list'
  })

  // Normalize metadata JSON strings once when source data changes,
  // not on every computed evaluation. shallowRef provides stable references
  // so downstream computeds don't re-run unnecessarily.
  // See: docs/solutions/logic-errors/nuxt-content-reactivity-and-ssr-patterns.md
  const data = shallowRef<any[] | null>(null)
  watch(() => result.data.value, (raw) => {
    if (!raw) { data.value = null; return }
    data.value = normalizeSummaryDocs(raw)
  }, { immediate: true })

  return { ...result, data }
}

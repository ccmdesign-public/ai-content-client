import { useContentStream, SUMMARY_LIST_FIELDS } from './useContentStream'

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
    select: [...SUMMARY_LIST_FIELDS],
    key: 'summaries-list'
  })

  // Normalize metadata JSON strings once, not in every consumer.
  // Nuxt Content v3 may return metadata as a JSON string in some execution paths.
  // See: docs/solutions/logic-errors/nuxt-content-reactivity-and-ssr-patterns.md
  const data = computed(() => {
    if (!result.data.value) return null
    return result.data.value.map((doc: any) => ({
      ...doc,
      metadata: typeof doc.metadata === 'string' ? JSON.parse(doc.metadata) : doc.metadata
    }))
  })

  return { ...result, data }
}

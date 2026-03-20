import { ref, computed, watch, type Ref } from 'vue'
import type { TagCategory } from '~/composables/useTagsConfig'

// Nuxt Content auto-imports queryCollection, declare for TS/ESLint awareness
declare const queryCollection: (name: string) => any

/**
 * Composable managing summaries page category filter state.
 *
 * Builds a pre-computed Map<categoryId, Set<videoId>> from tag data
 * so that switching categories is an O(1) lookup + O(n) array filter.
 *
 * Accepts `string[]` internally to simplify future multi-select upgrade
 * (UI currently exposes single-select).
 */
export function useSummariesFilter(
  summaries: Ref<any[] | null>,
  tagsByCategory: Ref<TagCategory[]>
) {
  const route = useRoute()
  const router = useRouter()

  // --- Filter state (single-select exposed as string | null) ---
  const selectedCategory = ref<string | null>(
    (route.query.category as string) || null
  )

  // Sync selected category to URL query parameter
  watch(selectedCategory, (newVal) => {
    const query = { ...route.query }
    if (newVal) {
      query.category = newVal
    } else {
      delete query.category
    }
    router.replace({ query })
  })

  // --- Load all tag data eagerly for cross-reference ---
  const { data: allTags } = useAsyncData(
    'summaries-all-tags',
    () => queryCollection('tags').all(),
    { server: false } // Client-only to avoid SSR hydration mismatch
  )

  // --- Pre-computed category -> video ID set ---
  const categoryVideoIdMap = computed<Map<string, Set<string>>>(() => {
    const map = new Map<string, Set<string>>()
    if (!allTags.value) return map
    for (const tag of allTags.value as any[]) {
      const catId = tag.categoryId as string
      const ids = map.get(catId) || new Set<string>()
      for (const item of (tag.items || []) as any[]) {
        // Only include summary-type items (articles lack videoId)
        if (item.type === 'summary') {
          ids.add(item.id)
        }
      }
      map.set(catId, ids)
    }
    return map
  })

  // --- Filtered summaries ---
  const filteredSummaries = computed(() => {
    const all = summaries.value || []
    if (!selectedCategory.value) return all
    const ids = categoryVideoIdMap.value.get(selectedCategory.value)
    if (!ids || ids.size === 0) return []
    return all.filter((s: any) => ids.has(s.metadata?.videoId))
  })

  const filteredCount = computed(() => filteredSummaries.value.length)
  const totalCount = computed(() => (summaries.value || []).length)

  function selectCategory(categoryId: string | null) {
    selectedCategory.value = categoryId
  }

  return {
    selectedCategory,
    filteredSummaries,
    filteredCount,
    totalCount,
    selectCategory
  }
}

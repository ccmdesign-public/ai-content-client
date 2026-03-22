import { ref, computed, watch, type Ref } from 'vue'

export type SortKey = 'publish-date-desc' | 'publish-date-asc' | 'processed-date-desc' | 'title-asc'

export interface SortOption {
  key: SortKey
  label: string
}

export const SORT_OPTIONS = [
  { key: 'publish-date-desc', label: 'Newest first' },
  { key: 'publish-date-asc', label: 'Oldest first' },
  { key: 'title-asc', label: 'Title A\u2013Z' },
  { key: 'processed-date-desc', label: 'Recently added' }
] as const satisfies readonly SortOption[]

const VALID_SORT_KEYS = new Set<string>(SORT_OPTIONS.map(o => o.key))

function isValidSortKey(value: unknown): value is SortKey {
  return typeof value === 'string' && VALID_SORT_KEYS.has(value)
}

export interface Sortable {
  processedAt: string
  metadata: {
    publishedAt: string
    title: string
  }
  _publishedAtMs?: number
  _processedAtMs?: number
}

export function useSortOptions<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort: SortKey = 'publish-date-desc'
) {
  // Read initial sort from URL query param when running inside Nuxt.
  // tryUseNuxtApp() returns null outside of Nuxt context (e.g. unit tests).
  let initialSort = defaultSort
  const nuxtApp = tryUseNuxtApp()

  if (nuxtApp) {
    const route = useRoute()
    if (isValidSortKey(route.query.sort)) {
      initialSort = route.query.sort
    }
  }

  const currentSort = ref<SortKey>(initialSort)

  // Sync sort state to URL query param (client-side only, replace to avoid history spam)
  if (nuxtApp && import.meta.client) {
    const route = useRoute()
    watch(currentSort, (newSort) => {
      const router = useRouter()
      router.replace({
        query: { ...route.query, sort: newSort === defaultSort ? undefined : newSort }
      })
    })
  }

  const isDateSort = computed(() =>
    currentSort.value.startsWith('publish-date') || currentSort.value === 'processed-date-desc'
  )

  const currentSortLabel = computed(() =>
    SORT_OPTIONS.find(opt => opt.key === currentSort.value)?.label ?? ''
  )

  const sorted = computed(() => {
    const list = [...items.value]
    switch (currentSort.value) {
      case 'publish-date-desc':
        return list.sort((a, b) =>
          (b._publishedAtMs ?? new Date(b.metadata.publishedAt).getTime())
          - (a._publishedAtMs ?? new Date(a.metadata.publishedAt).getTime())
        )
      case 'publish-date-asc':
        return list.sort((a, b) =>
          (a._publishedAtMs ?? new Date(a.metadata.publishedAt).getTime())
          - (b._publishedAtMs ?? new Date(b.metadata.publishedAt).getTime())
        )
      case 'processed-date-desc':
        return list.sort((a, b) =>
          (b._processedAtMs ?? new Date(b.processedAt).getTime())
          - (a._processedAtMs ?? new Date(a.processedAt).getTime())
        )
      case 'title-asc':
        return list.sort((a, b) =>
          (a.metadata?.title ?? '').localeCompare(b.metadata?.title ?? '', undefined, { sensitivity: 'base' })
        )
      default:
        return list
    }
  })

  return { currentSort, sorted, isDateSort, currentSortLabel, sortOptions: SORT_OPTIONS }
}

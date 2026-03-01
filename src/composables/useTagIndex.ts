// Nuxt Content auto-imports queryCollection, declare for TS/ESLint awareness
declare const queryCollection: (name: string) => any

export interface TagItem {
  id: string
  type: string
  title: string
  date: string
  path: string
}

export interface TagData {
  tag: string
  category: string
  categoryId: string
  itemCount: number
  items: TagItem[]
}

/**
 * Load per-tag data from Nuxt Content data collection and
 * cross-reference with summaries to get full summary objects
 * compatible with DateGroupedFeed / SummaryCard.
 */
export function useTagIndex(slug: MaybeRefOrGetter<string>) {
  const resolvedSlug = computed(() => toValue(slug))
  const key = computed(() => `tag-index:${resolvedSlug.value}`)

  // Load tag data from Nuxt Content data collection
  const { data: tagData, pending: tagPending, error: tagError } = useAsyncData(
    key.value,
    () => queryCollection('tags')
      .where('stem', '=', resolvedSlug.value)
      .first()
  )

  // Load all summaries to cross-reference
  const { data: allSummaries, pending: summariesPending } = useContentStream('summaries')

  // Cross-reference tag items with summaries to get full summary objects
  const summaries = computed(() => {
    if (!tagData.value?.items || !allSummaries.value) return []

    const tagVideoIds = new Set(
      (tagData.value.items as TagItem[]).map((item: TagItem) => item.id)
    )

    return (allSummaries.value as any[]).filter(
      (s: any) => tagVideoIds.has(s.metadata?.videoId)
    )
  })

  const pending = computed(() => tagPending.value || summariesPending.value)

  return {
    tagData,
    summaries,
    pending,
    error: tagError
  }
}

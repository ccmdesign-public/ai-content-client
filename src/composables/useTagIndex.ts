// Nuxt Content auto-imports queryCollection at runtime.
// Type is provided by .nuxt/imports.d.ts (included via tsconfig extending .nuxt/tsconfig.app).
declare const queryCollection: typeof import('#imports')['queryCollection']

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
 *
 * Only fetches matching summaries (by videoId) rather than the
 * entire summaries collection, and filters out non-summary items
 * (e.g., articles) that cannot be cross-referenced.
 */
export function useTagIndex(slug: MaybeRefOrGetter<string>) {
  const resolvedSlug = computed(() => toValue(slug))
  const key = computed(() => `tag-index:${resolvedSlug.value}`)

  // Load tag data from Nuxt Content data collection
  // Pass reactive key and watch slug changes for client-side navigation
  const { data: tagData, pending: tagPending, error: tagError, refresh: refreshTag } = useAsyncData(
    key,
    () => queryCollection('tags')
      .where('stem', '=', resolvedSlug.value)
      .first(),
    { watch: [resolvedSlug] }
  )

  // Extract only summary-type videoIds from tag items for cross-referencing.
  // Article-type items are excluded because they lack a videoId and cannot
  // match summaries. The summaryItemCount reflects only matchable items.
  const summaryVideoIds = computed(() => {
    if (!tagData.value?.items) return []
    return (tagData.value.items as TagItem[])
      .filter((item: TagItem) => item.type === 'summary')
      .map((item: TagItem) => item.id)
  })

  const summaryItemCount = computed(() => summaryVideoIds.value.length)

  // Load only summaries whose videoId appears in the tag's item list.
  // Uses queryCollection with a where clause instead of loading the
  // entire summaries collection, dramatically reducing data per page.
  const { data: summaries, pending: summariesPending, refresh: refreshSummaries } = useAsyncData(
    computed(() => `tag-summaries:${resolvedSlug.value}`),
    async () => {
      const ids = summaryVideoIds.value
      if (ids.length === 0) return []

      // Query summaries whose videoId is in our tag's item list.
      // Nuxt Content v3 queryCollection supports 'in' operator for arrays.
      return await queryCollection('summaries')
        .where('metadata.videoId', 'in', ids)
        .all()
    },
    { watch: [summaryVideoIds] }
  )

  const pending = computed(() => tagPending.value || summariesPending.value)

  return {
    tagData,
    summaries: computed(() => summaries.value || []),
    summaryItemCount,
    pending,
    error: tagError,
    async refresh() {
      await refreshTag()
      await refreshSummaries()
    }
  }
}

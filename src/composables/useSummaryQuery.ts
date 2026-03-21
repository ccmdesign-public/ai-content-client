// Nuxt Content auto-imports queryCollection at runtime.
// Type is provided by .nuxt/imports.d.ts (included via tsconfig extending .nuxt/tsconfig.app).
// The declare below gives TS/ESLint visibility without losing type safety on the query chain.
declare const queryCollection: typeof import('#imports')['queryCollection']

export interface SummaryQueryParams {
  channelId?: MaybeRefOrGetter<string | undefined>
  playlistId?: MaybeRefOrGetter<string | undefined>
  videoIds?: MaybeRefOrGetter<string[] | undefined>
}

/**
 * Composable for querying summaries with server-side filtering.
 *
 * Uses `queryCollection().where()` directly for real SQL-level filtering
 * (not the load-all-then-filter pattern of `useContentStream`).
 * Follows the proven pattern established by `useTagIndex`.
 *
 * @param params - Optional filter parameters. All are reactive-compatible.
 *   - `channelId`: filter by YouTube channel ID (`metadata.channelId`)
 *   - `playlistId`: filter by playlist ID (top-level `playlistId` field)
 *   - `videoIds`: filter by array of video IDs (`metadata.videoId`)
 *   - No params: returns all summaries (for the index page)
 */
export function useSummaryQuery(params: SummaryQueryParams = {}) {
  const resolvedChannelId = computed(() => toValue(params.channelId))
  const resolvedPlaylistId = computed(() => toValue(params.playlistId))
  const resolvedVideoIds = computed(() => toValue(params.videoIds))

  // Deterministic cache key including all filter values
  const key = computed(() => {
    const parts = ['summary-query']
    if (resolvedChannelId.value) parts.push(`ch:${resolvedChannelId.value}`)
    if (resolvedPlaylistId.value) parts.push(`pl:${resolvedPlaylistId.value}`)
    if (resolvedVideoIds.value?.length) parts.push(`vid:${resolvedVideoIds.value.join(',')}`)
    return parts.join(':')
  })

  // Build watched sources for reactive re-fetching on param changes
  const watchSources = [resolvedChannelId, resolvedPlaylistId, resolvedVideoIds]

  const { data, pending, error, refresh } = useAsyncData(
    key,
    async () => {
      // Short-circuit: empty videoIds array returns [] without querying
      if (resolvedVideoIds.value !== undefined && resolvedVideoIds.value.length === 0) {
        return []
      }

      let query = queryCollection('summaries')

      // Apply filters via chained .where() calls
      if (resolvedChannelId.value) {
        query = query.where('metadata.channelId', '=', resolvedChannelId.value)
      }
      if (resolvedPlaylistId.value) {
        query = query.where('playlistId', '=', resolvedPlaylistId.value)
      }
      if (resolvedVideoIds.value?.length) {
        query = query.where('metadata.videoId', 'in', resolvedVideoIds.value)
      }

      // Exclude drafts at the query level for consistency with server-side filtering philosophy.
      // The 'published' field is false for drafts; excluding them here avoids transferring
      // unnecessary data and keeps filtering consistent with the composable's stated purpose.
      query = query.where('published', '<>', false)

      return await query.all()
    },
    { watch: watchSources }
  )

  return {
    data: computed(() => data.value || []),
    pending,
    error,
    refresh
  }
}

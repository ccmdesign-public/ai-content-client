<script setup lang="ts">
import { useChannelsConfig } from '~/composables/useChannelsConfig'
import { useSortedFeed } from '~/composables/useSortedFeed'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

definePageMeta({
  footer: false
})

// Use static channels config
const { getChannelBySlug } = useChannelsConfig()

// Check if channel exists in config
const channelConfig = computed(() => getChannelBySlug(slug.value))

// Get all summaries and filter by channelId (immutable YouTube channel ID)
// Uses useContentStream which handles loading, caching, and client-side filtering
// with a stable string key that works reliably with useAsyncData hydration.
const { data: allSummaries, error, refresh } = useContentStream('summaries')

// Filter summaries for this channel using channelId (not channel name)
const summaries = computed(() => {
  if (!allSummaries.value || !channelConfig.value) return []
  const targetId = channelConfig.value.id
  return allSummaries.value.filter(s => s.metadata?.channelId === targetId)
})

// 404 only if channel doesn't exist in config
const shouldShow404 = computed(() => {
  if (!allSummaries.value) return false
  if (!channelConfig.value) return true
  return false
})

// Sort and group
const { feedSegments, currentSort, isDateSort, currentSortLabel, hasMore, visibleCount, totalCount, loadMore } = useSortedFeed(summaries, undefined, { pageSize: 25 })

// Check if empty (channel exists in config but no summaries)
const isEmpty = computed(() => {
  if (!allSummaries.value) return false
  return channelConfig.value && summaries.value.length === 0
})

// Display name from config
const displayName = computed(() => channelConfig.value?.name || slug.value)

useHead({
  title: computed(() => `${displayName.value} | YouTube Summaries`)
})
</script>

<template>
  <div class="p-7">
    <div v-if="!allSummaries && !error" aria-busy="true" aria-label="Loading channel summaries">
      <SummaryCardSkeleton v-for="n in 5" :key="n" />
    </div>

    <PageErrorState v-else-if="error" message="Failed to load channel data." @retry="refresh()" />

    <PageNotFound
      v-else-if="shouldShow404"
      icon="search_off"
      title="Channel not found"
      message="We don't have any summaries for this channel."
      link-to="/summaries/"
      link-text="Browse all summaries"
    />

    <template v-else>
      <header class="mb-7">
        <div class="flex justify-between items-start gap-[1.3125rem] flex-wrap">
          <div>
            <h1 class="m-0 text-xl">{{ displayName }}</h1>
            <p class="mt-1.5 text-muted-foreground text-sm">{{ summaries.length }} videos</p>
          </div>
          <SortControl v-model="currentSort" />
        </div>
      </header>

      <p class="sr-only" aria-live="polite">Sorted by {{ currentSortLabel }}</p>

      <PageEmptyState
        v-if="isEmpty"
        icon="videocam_off"
        message="No summaries for this channel yet."
        hint="Check back soon - new videos are processed daily."
        link-to="/summaries/"
        link-text="Browse all summaries"
      />

      <DateGroupedFeed
        v-else
        :segments="feedSegments"
        :show-headers="isDateSort"
        :has-more="hasMore"
        :visible-count="visibleCount"
        :total-count="totalCount"
        @load-more="loadMore"
      />
    </template>
  </div>
</template>

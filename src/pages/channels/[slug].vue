<script setup lang="ts">
import { useChannelsConfig } from '~/composables/useChannelsConfig'
import { useSortedFeed } from '~/composables/useSortedFeed'
import { deslugify } from '~/utils/slugify'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

definePageMeta({
  footer: false
})

// Use static channels config
const { getChannelBySlug } = useChannelsConfig()

// Get all summaries first
const { data: allSummaries } = useContentStream('summaries')

// Check if channel exists in config
const channelConfig = computed(() => getChannelBySlug(slug.value))

// Get channel name - try config first, then deslugify from content
const channelName = computed(() => {
  // If in config, use config name
  if (channelConfig.value) {
    return channelConfig.value.name
  }
  // Otherwise try to find channel name from content
  if (allSummaries.value) {
    const channels = [...new Set(allSummaries.value.map(s => s.metadata?.channel).filter(Boolean))]
    return deslugify(slug.value, channels as string[]) || null
  }
  return null
})

// Filter summaries for this channel
const summaries = computed(() => {
  if (!allSummaries.value || !channelName.value) return []
  return allSummaries.value.filter(s => s.metadata?.channel === channelName.value)
})

// 404 only if channel doesn't exist in config AND has no content
// We need to wait for data before deciding
const shouldShow404 = computed(() => {
  // Still loading
  if (!allSummaries.value) return false
  // Has content for this channel
  if (summaries.value.length > 0) return false
  // Is in config (even if no content yet)
  if (channelConfig.value) return false
  // Not in config and no content = 404
  return true
})

// Sort and group -- summaries is already a computed with null guard
const { feedSegments, currentSort, isDateSort, currentSortLabel } = useSortedFeed(summaries)

// Check if empty (channel exists in config but no summaries)
const isEmpty = computed(() => {
  if (!allSummaries.value) return false
  return channelConfig.value && summaries.value.length === 0
})

// Display name for the page
const displayName = computed(() => channelName.value || slug.value)

useHead({
  title: computed(() => `${displayName.value} | YouTube Summaries`)
})
</script>

<template>
  <div class="p-7">
    <div v-if="!allSummaries" class="text-center py-14 text-muted-foreground">Loading...</div>

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
        <div class="flex justify-between items-start gap-5 flex-wrap">
          <div>
            <h1 class="m-0 text-xl">{{ displayName }}</h1>
            <p class="mt-1.5 text-muted-foreground text-sm">{{ summaries.length }} videos</p>
          </div>
          <SortControl v-model="currentSort" />
        </div>
      </header>

      <p class="visually-hidden" aria-live="polite">Sorted by {{ currentSortLabel }}</p>

      <PageEmptyState
        v-if="isEmpty"
        icon="videocam_off"
        message="No summaries for this channel yet."
        hint="Check back soon - new videos are processed daily."
        link-to="/summaries/"
        link-text="Browse all summaries"
      />

      <DateGroupedFeed v-else :segments="feedSegments" :show-headers="isDateSort" />
    </template>
  </div>
</template>

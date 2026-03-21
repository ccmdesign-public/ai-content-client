<script setup lang="ts">
import { useChannelsConfig } from '~/composables/useChannelsConfig'
import { useSummaryQuery } from '~/composables/useSummaryQuery'
import { useSortedFeed } from '~/composables/useSortedFeed'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

definePageMeta({
  footer: false
})

// Use static channels config
const { getChannelBySlug } = useChannelsConfig()

// Reactive channel config -- updates when slug changes (component reuse on navigation)
const channelConfig = computed(() => getChannelBySlug(slug.value))

// Reactive channelId derived from config for server-side filtered query
const channelId = computed(() => channelConfig.value?.id)

// All composable calls must happen before any conditional throw (SSR safety).
// useSummaryQuery queries only summaries matching this channel's ID.
const { data: summaries, pending, error, refresh } = useSummaryQuery({ channelId })

// Sort and group
const { feedSegments, currentSort, isDateSort, currentSortLabel } = useSortedFeed(summaries)

// 404 if channel slug is not in config (synchronous check, no data load needed)
if (!channelConfig.value) {
  throw createError({ statusCode: 404, message: 'Channel not found' })
}

// Check if empty (channel exists in config but no summaries yet)
const isEmpty = computed(() => !pending.value && summaries.value.length === 0)

// Display name from config
const displayName = computed(() => channelConfig.value?.name || slug.value)

useHead({
  title: computed(() => `${displayName.value} | YouTube Summaries`)
})
</script>

<template>
  <div class="p-7">
    <div v-if="pending" aria-busy="true" aria-label="Loading channel summaries">
      <SummaryCardSkeleton v-for="n in 5" :key="n" />
    </div>

    <PageErrorState v-else-if="error" message="Failed to load channel data." @retry="refresh()" />

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

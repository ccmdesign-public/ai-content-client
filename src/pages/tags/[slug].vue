<script setup lang="ts">
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useTagIndex } from '~/composables/useTagIndex'
import { useSortedFeed } from '~/composables/useSortedFeed'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

definePageMeta({
  footer: false
})

// Get tag config for display name and 404 check
const { getTagBySlug } = useTagsConfig()
const tagConfig = computed(() => getTagBySlug(slug.value))

// Load tag data and cross-referenced summaries
const { summaries, summaryItemCount, pending } = useTagIndex(slug)

// Sort and group
const items = computed(() => summaries.value || [])
const { feedSegments, currentSort, isDateSort, currentSortLabel } = useSortedFeed(items)

// Check if empty (tag exists but no matching summaries in client)
const isEmpty = computed(() => !pending.value && summaries.value.length === 0)

// Display name for the page
const displayName = computed(() => tagConfig.value?.name || slug.value)
const categoryName = computed(() => tagConfig.value?.category || '')

useHead({
  title: computed(() => `${displayName.value} | YouTube Summaries`),
  meta: [
    { name: 'description', content: computed(() => `Browse ${summaryItemCount.value} AI-generated video summaries tagged with ${displayName.value} in ${categoryName.value}.`) }
  ]
})
</script>

<template>
  <div class="p-7">
    <div v-if="pending" class="text-center py-14 text-muted-foreground">Loading...</div>

    <PageNotFound
      v-else-if="!tagConfig"
      icon="search_off"
      title="Topic not found"
      message="We don't have any summaries for this topic."
      link-to="/tags"
      link-text="Browse all topics"
    />

    <template v-else>
      <header class="mb-7">
        <NuxtLink to="/tags" class="text-sm text-primary no-underline hover:underline">Topics</NuxtLink>
        <span class="text-sm text-muted-foreground mx-1.5">/</span>
        <span class="text-sm text-muted-foreground">{{ categoryName }}</span>
        <div class="flex justify-between items-start gap-5 flex-wrap">
          <div>
            <h1 class="mt-3 text-xl">{{ displayName }}</h1>
            <p class="mt-1.5 text-muted-foreground text-sm">{{ summaryItemCount }} videos</p>
          </div>
          <SortControl v-model="currentSort" />
        </div>
      </header>

      <p class="visually-hidden" aria-live="polite">Sorted by {{ currentSortLabel }}</p>

      <PageEmptyState
        v-if="isEmpty"
        icon="label_off"
        message="No summaries for this topic yet."
        hint="Tag data exists but matching summaries haven't been synced to the client."
        link-to="/tags"
        link-text="Browse all topics"
      />

      <DateGroupedFeed v-else :segments="feedSegments" :show-headers="isDateSort" />
    </template>
  </div>
</template>

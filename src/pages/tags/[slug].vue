<script setup lang="ts">
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useTagIndex } from '~/composables/useTagIndex'
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions } from '~/composables/useSortOptions'

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
const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(items)
const dateSortDirection = computed(() => currentSort.value === 'publish-date-asc' ? 'asc' as const : 'desc' as const)
const { segments } = useDateGroups(computed(() => isDateSort.value ? sorted.value : []), undefined, dateSortDirection)

const feedSegments = computed(() =>
  isDateSort.value
    ? segments.value
    : sorted.value.length > 0
      ? [{ key: 'older' as const, label: '', items: sorted.value }]
      : []
)

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
  <div class="tag-page">
    <div v-if="pending" class="loading">Loading...</div>

    <PageNotFound
      v-else-if="!tagConfig"
      icon="search_off"
      title="Topic not found"
      message="We don't have any summaries for this topic."
      link-to="/tags"
      link-text="Browse all topics"
    />

    <template v-else>
      <header class="page-header">
        <NuxtLink to="/tags" class="page-header__breadcrumb">Topics</NuxtLink>
        <span class="page-header__separator">/</span>
        <span class="page-header__category">{{ categoryName }}</span>
        <div class="page-header__top">
          <div>
            <h1>{{ displayName }}</h1>
            <p class="page-header__count">{{ summaryItemCount }} videos</p>
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

<style scoped>
.tag-page {
  padding: 1.75rem;
}

.page-header {
  margin-bottom: 1.75rem;
}

.page-header__breadcrumb {
  font-size: 0.875rem;
  color: var(--primary);
  text-decoration: none;
}

.page-header__breadcrumb:hover {
  text-decoration: underline;
}

.page-header__separator {
  font-size: 0.875rem;
  color: var(--muted-foreground);
  margin: 0 0.375rem;
}

.page-header__category {
  font-size: 0.875rem;
  color: var(--muted-foreground);
}

.page-header__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.3125rem;
  flex-wrap: wrap;
}

.page-header h1 {
  margin: 0.6875rem 0 0;
  font-size: 1.25rem;
}

.page-header__count {
  margin: 0.375rem 0 0;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.loading {
  text-align: center;
  padding: 3.5rem;
  color: var(--muted-foreground);
}
</style>

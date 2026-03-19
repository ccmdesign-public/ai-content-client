<script setup lang="ts">
import { usePlaylistsConfig } from '~/composables/usePlaylistsConfig'
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions, type Sortable } from '~/composables/useSortOptions'

const route = useRoute()
const { getPlaylistBySlug } = usePlaylistsConfig()

const playlist = computed(() => getPlaylistBySlug(route.params.slug as string))

// All composable calls must happen before the synchronous throw.
// Use a computed with null guard (same pattern as other pages).
const items = computed<Sortable[]>(() => summaries.value || [])
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

// 404 if playlist not found
if (!playlist.value) {
  throw createError({ statusCode: 404, message: 'Playlist not found' })
}

definePageMeta({
  hero: false,
  footer: false
})

// Fetch summaries for this playlist
const { data: summaries, pending } = useContentStream('summaries', {
  where: { playlistId: playlist.value.id }
})

// Check if empty (playlist exists but no summaries)
const isEmpty = computed(() => !pending.value && (!summaries.value || summaries.value.length === 0))

useHead({
  title: `${playlist.value.name} | YouTube Summaries`
})
</script>

<template>
  <div class="playlist-page">
    <header class="page-header">
      <div class="page-header__top">
        <div>
          <h1>{{ playlist?.name }}</h1>
          <p class="page-header__count">{{ summaries?.length || 0 }} videos</p>
        </div>
        <SortControl v-model="currentSort" />
      </div>
    </header>

    <p class="visually-hidden" aria-live="polite">Sorted by {{ currentSortLabel }}</p>

    <div v-if="pending" class="loading">Loading...</div>

    <div v-else-if="isEmpty" class="empty-state">
      <span class="material-symbols-outlined empty-state__icon">playlist_remove</span>
      <p class="empty-state__message">No summaries in this playlist yet.</p>
      <p class="empty-state__hint">Check back soon - new videos are processed daily.</p>
      <NuxtLink to="/" class="empty-state__link">Browse all summaries</NuxtLink>
    </div>

    <DateGroupedFeed v-else :segments="feedSegments" :show-headers="isDateSort" />
  </div>
</template>

<style scoped>
.playlist-page {
  padding: 1.75rem;
}

.page-header {
  margin-bottom: 1.75rem;
}

.page-header__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.3125rem;
  flex-wrap: wrap;
}

.page-header h1 {
  margin: 0;
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

.empty-state {
  text-align: center;
  padding: 3.5rem 1.75rem;
}

.empty-state__icon {
  font-size: 3rem;
  color: var(--muted-foreground);
  margin-bottom: 1.3125rem;
}

.empty-state__message {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 0.6875rem;
}

.empty-state__hint {
  font-size: 1rem;
  color: var(--muted-foreground);
  margin-bottom: 1.75rem;
}

.empty-state__link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.875rem 1.3125rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.empty-state__link:hover {
  background: var(--primary);
}
</style>

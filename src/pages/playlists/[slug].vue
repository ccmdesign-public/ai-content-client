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
  padding: var(--space-l, 2rem);
}

.page-header {
  margin-bottom: var(--space-l, 2rem);
}

.page-header__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-m, 1rem);
  flex-wrap: wrap;
}

.page-header h1 {
  margin: 0;
  font-size: var(--size-2, 1.5rem);
}

.page-header__count {
  margin: var(--space-2xs, 0.25rem) 0 0;
  color: var(--muted-foreground);
  font-size: var(--size--1, 0.875rem);
}

.loading {
  text-align: center;
  padding: var(--space-2xl, 3rem);
  color: var(--muted-foreground);
}

.empty-state {
  text-align: center;
  padding: var(--space-2xl, 3rem) var(--space-l, 1.5rem);
}

.empty-state__icon {
  font-size: 3rem;
  color: var(--muted-foreground);
  margin-bottom: var(--space-m, 1rem);
}

.empty-state__message {
  font-size: var(--size-1, 1.125rem);
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: var(--space-xs, 0.5rem);
}

.empty-state__hint {
  font-size: var(--size-0, 1rem);
  color: var(--muted-foreground);
  margin-bottom: var(--space-l, 1.5rem);
}

.empty-state__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs, 0.25rem);
  padding: var(--space-s, 0.75rem) var(--space-m, 1rem);
  background: var(--color-primary, #2563eb);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.empty-state__link:hover {
  background: var(--color-primary-shade-10, #1d4ed8);
}
</style>

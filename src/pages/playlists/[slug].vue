<script setup lang="ts">
import { usePlaylistsConfig } from '~/composables/usePlaylistsConfig'
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions, type Sortable } from '~/composables/useSortOptions'
import { ListX } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const route = useRoute()
const { getPlaylistBySlug } = usePlaylistsConfig()

const playlist = computed(() => getPlaylistBySlug(route.params.slug as string))

// All composable calls must happen before the synchronous throw.
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
  <div class="p-7">
    <header class="mb-7">
      <div class="flex justify-between items-start gap-5 flex-wrap">
        <div>
          <h1 class="m-0 text-xl">{{ playlist?.name }}</h1>
          <p class="mt-1.5 text-muted-foreground text-sm">{{ summaries?.length || 0 }} videos</p>
        </div>
        <SortControl v-model="currentSort" />
      </div>
    </header>

    <p class="sr-only" aria-live="polite">Sorted by {{ currentSortLabel }}</p>

    <div v-if="pending" class="text-center py-14 text-muted-foreground">Loading...</div>

    <div v-else-if="isEmpty" class="text-center py-14 px-7">
      <ListX class="size-12 text-muted-foreground mb-5 mx-auto" aria-hidden="true" />
      <p class="text-lg font-medium text-foreground mb-2.5">No summaries in this playlist yet.</p>
      <p class="text-base text-muted-foreground mb-7">Check back soon - new videos are processed daily.</p>
      <Button as-child>
        <NuxtLink to="/summaries/">Browse all summaries</NuxtLink>
      </Button>
    </div>

    <DateGroupedFeed v-else :segments="feedSegments" :show-headers="isDateSort" />
  </div>
</template>

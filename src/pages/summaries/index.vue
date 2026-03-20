<script setup lang="ts">
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions } from '~/composables/useSortOptions'
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useSummariesFilter } from '~/composables/useSummariesFilter'
import { AlertCircle, SearchX, FilterX } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { SearchResult } from '~/types/search'

definePageMeta({
  hero: false,
  footer: false
})

const { data: summaries, pending } = useContentStream('summaries')
const { tagsByCategory } = useTagsConfig()

const {
  selectedCategory,
  filteredSummaries,
  filteredCount,
  totalCount,
  selectCategory
} = useSummariesFilter(summaries, tagsByCategory)

// Sort the filtered results
const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(filteredSummaries)
const dateSortDirection = computed(() => currentSort.value === 'publish-date-asc' ? 'asc' as const : 'desc' as const)
const { segments } = useDateGroups(computed(() => isDateSort.value ? sorted.value : []), undefined, dateSortDirection)

// When not a date sort, build a single flat segment to pass to DateGroupedFeed
const feedSegments = computed(() =>
  isDateSort.value
    ? segments.value
    : sorted.value.length > 0
      ? [{ key: 'older' as const, label: '', items: sorted.value }]
      : []
)

// Search integration -- injected from layout
const search = inject('search') as ReturnType<typeof import('~/composables/useSearch').useSearch> | undefined
const searchQuery = computed({
  get: () => search?.query.value ?? '',
  set: (val: string) => { if (search) search.query.value = val },
})
const searchResults = computed(() => (search?.results.value ?? []) as SearchResult[])
const isSearchActive = computed(() => search?.isSearchActive.value ?? false)
const isSearchReady = computed(() => search?.isReady.value ?? false)
const searchError = computed(() => search?.error.value ?? null)

// Init search index on first interaction (lazy)
function onSearchExpand() {
  search?.init()
}

// Page title adapts to search state
const pageTitle = computed(() => isSearchActive.value ? 'Search Results' : 'All Summaries')
const displayedCount = computed(() =>
  isSearchActive.value ? searchResults.value.length : filteredCount.value
)
</script>

<template>
  <div class="px-7 pt-0 pb-7">
    <!-- Category filter: hidden during search -->
    <CategoryFilterBar
      v-if="!isSearchActive"
      :categories="tagsByCategory"
      :selected-category="selectedCategory"
      :total-count="totalCount"
      @select="selectCategory"
    />

    <header class="mb-7 pt-7">
      <div class="flex justify-between items-start gap-5 flex-wrap">
        <div>
          <h1 class="m-0 text-xl">{{ pageTitle }}</h1>
          <p class="mt-1.5 text-muted-foreground text-sm" aria-live="polite" aria-atomic="true">
            <template v-if="isSearchActive">
              {{ displayedCount }} result{{ displayedCount === 1 ? '' : 's' }}
            </template>
            <template v-else>
              {{ filteredCount }} videos
              <span v-if="selectedCategory"> (filtered from {{ totalCount }})</span>
            </template>
          </p>
        </div>
        <div class="flex items-center gap-3.5">
          <SearchBar
            v-model="searchQuery"
            v-model:result-count="displayedCount"
            :is-ready="isSearchReady"
            @expand="onSearchExpand"
          />
          <SortControl v-if="!isSearchActive" v-model="currentSort" />
        </div>
      </div>
    </header>

    <p class="sr-only" aria-live="polite">Sorted by {{ currentSortLabel }}</p>

    <div v-if="pending && !isSearchActive" class="text-center py-14 text-muted-foreground">Loading...</div>

    <!-- Search error fallback -->
    <div v-else-if="isSearchActive && searchError" class="text-center py-14 px-7 text-muted-foreground">
      <AlertCircle class="size-12 block mb-3.5 mx-auto text-muted-foreground" aria-hidden="true" />
      <p class="text-base font-medium m-0 text-foreground">Search unavailable. Browse content below.</p>
    </div>

    <!-- Search results -->
    <div v-else-if="isSearchActive && searchResults.length > 0" class="flex flex-col">
      <SummaryCard
        v-for="result in searchResults"
        :key="result.id"
        :summary="{
          metadata: {
            videoId: result.id,
            title: result.title,
            channel: result.channel,
            publishedAt: result.date,
            thumbnailUrl: result.thumbnailUrl,
            youtubeUrl: `https://www.youtube.com/watch?v=${result.id}`,
          },
          processedAt: result.date,
          tldr: result.tldr,
        }"
      />
    </div>

    <!-- Search: no results -->
    <div v-else-if="isSearchActive && searchResults.length === 0 && isSearchReady" class="text-center py-14 px-7 text-muted-foreground">
      <SearchX class="size-12 block mb-3.5 mx-auto text-muted-foreground" aria-hidden="true" />
      <p class="text-base font-medium m-0 mb-1.5 text-foreground">No results found for "{{ searchQuery }}"</p>
      <p class="text-sm m-0 mb-5">Try different keywords or clear the search.</p>
    </div>

    <!-- Browse: filtered empty state -->
    <div v-else-if="!isSearchActive && selectedCategory && filteredCount === 0" class="text-center py-14 px-7 text-muted-foreground">
      <FilterX class="size-12 block mb-3.5 mx-auto text-muted-foreground" aria-hidden="true" />
      <p class="text-base font-medium m-0 mb-1.5 text-foreground">No summaries found in this category.</p>
      <p class="text-sm m-0 mb-5">Try selecting a different category or reset the filter.</p>
      <Button @click="selectCategory(null)">
        Show all summaries
      </Button>
    </div>

    <!-- Browse: date-grouped feed -->
    <DateGroupedFeed v-else-if="!isSearchActive" :segments="feedSegments" :show-headers="isDateSort" />
  </div>
</template>

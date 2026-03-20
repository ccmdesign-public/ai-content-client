<script setup lang="ts">
import { useSortedFeed } from '~/composables/useSortedFeed'
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useSummariesFilter } from '~/composables/useSummariesFilter'
import { AlertCircle } from 'lucide-vue-next'
import type { SearchResult } from '~/types/search'

definePageMeta({
  footer: false
})

const { data: summaries, pending, error, refresh } = useContentStream('summaries')
const { tagsByCategory } = useTagsConfig()

const {
  selectedCategory,
  filteredSummaries,
  filteredCount,
  totalCount,
  selectCategory
} = useSummariesFilter(summaries, tagsByCategory)

// Sort the filtered results
const { feedSegments, currentSort, isDateSort, currentSortLabel } = useSortedFeed(filteredSummaries)

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

// Map search results to the shape SummaryCard expects
const searchResultsAsSummaries = computed(() =>
  searchResults.value.map(result => ({
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
  }))
)

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

    <div v-if="pending && !isSearchActive" aria-busy="true" aria-label="Loading summaries">
      <SummaryCardSkeleton v-for="n in 5" :key="n" />
    </div>

    <!-- Content stream error -->
    <PageErrorState
      v-else-if="error && !isSearchActive"
      message="Failed to load summaries."
      @retry="refresh()"
    />

    <!-- Search error fallback -->
    <div v-else-if="isSearchActive && searchError" class="text-center py-14 px-7 text-muted-foreground">
      <AlertCircle class="size-12 block mb-3.5 mx-auto text-muted-foreground" aria-hidden="true" />
      <p class="text-base font-medium m-0 text-foreground">Search unavailable. Browse content below.</p>
    </div>

    <!-- Search results -->
    <div v-else-if="isSearchActive && searchResultsAsSummaries.length > 0" class="flex flex-col">
      <SummaryCard
        v-for="item in searchResultsAsSummaries"
        :key="item.metadata.videoId"
        :summary="item"
      />
    </div>

    <!-- Search: no results -->
    <PageEmptyState
      v-else-if="isSearchActive && searchResults.length === 0 && isSearchReady"
      icon="search_off"
      :message="`No results found for &quot;${searchQuery}&quot;`"
      hint="Try different keywords or clear the search."
    />

    <!-- Browse: filtered empty state -->
    <PageEmptyState
      v-else-if="!isSearchActive && selectedCategory && filteredCount === 0"
      icon="filter_list_off"
      message="No summaries found in this category."
      hint="Try selecting a different category or reset the filter."
      action-text="Show all summaries"
      @action="selectCategory(null)"
    />

    <!-- Browse: date-grouped feed -->
    <DateGroupedFeed v-else-if="!isSearchActive" :segments="feedSegments" :show-headers="isDateSort" />
  </div>
</template>

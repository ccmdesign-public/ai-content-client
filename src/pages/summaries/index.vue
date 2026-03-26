<script setup lang="ts">
import { useSortedFeed } from '~/composables/useSortedFeed'
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useSummariesFilter } from '~/composables/useSummariesFilter'
import { useSummariesData } from '~/composables/useSummariesData'
import { AlertCircle, Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import type { SearchResult } from '~/types/search'

definePageMeta({
  footer: false
})

const { data: summaries, pending, error, refresh, isRevalidating } = useSummariesData()
const { tagsByCategory } = useTagsConfig()

// Exclude overly broad categories from the filter bar
const HIDDEN_CATEGORIES = new Set(['ai-ml', 'programming'])
const filteredCategories = computed(() =>
  tagsByCategory.value.filter(c => !HIDDEN_CATEGORIES.has(c.categoryId))
)

const {
  selectedCategory,
  filteredSummaries,
  filteredCount,
  totalCount,
  categoryCounts,
  selectCategory
} = useSummariesFilter(summaries, tagsByCategory)

// Override tag-based totalItems with accurate unique video counts
const categoriesWithAccurateCounts = computed(() =>
  filteredCategories.value.map(c => ({
    ...c,
    totalItems: categoryCounts.value.get(c.categoryId) ?? c.totalItems
  }))
)

// Sort the filtered results (with client-side pagination)
const { feedSegments, currentSort, isDateSort, currentSortLabel, hasMore, visibleCount, totalCount: paginatedTotalCount, loadMore } = useSortedFeed(filteredSummaries, undefined, { pageSize: 25 })

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

// Search input ref + keyboard shortcut
const searchInputRef = ref<HTMLInputElement | null>(null)

function onSearchFocus() {
  search?.init()
}

function clearSearch() {
  searchQuery.value = ''
  nextTick(() => searchInputRef.value?.focus())
}

function handleSearchKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (searchQuery.value) {
      searchQuery.value = ''
    } else {
      searchInputRef.value?.blur()
    }
  }
}

// Cmd+K / Ctrl+K global shortcut
function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      if (e.target !== searchInputRef.value) return
    }
    e.preventDefault()
    searchInputRef.value?.focus()
  }
}

const isMac = ref(false)
onMounted(() => {
  isMac.value = navigator.platform.toUpperCase().includes('MAC')
  document.addEventListener('keydown', onGlobalKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onGlobalKeydown)
})

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
      :categories="categoriesWithAccurateCounts"
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
        <div class="flex items-center gap-3 flex-1 md:flex-none md:w-auto justify-end">
          <div class="relative w-full max-w-sm">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              ref="searchInputRef"
              v-model="searchQuery"
              type="search"
              class="pl-9 pr-16 [&::-webkit-search-cancel-button]:hidden"
              placeholder="Search summaries..."
              aria-label="Search all content"
              @focus="onSearchFocus"
              @keydown="handleSearchKeydown"
            />
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                v-if="searchQuery"
                class="flex items-center justify-center p-1 text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1"
                aria-label="Clear search"
                @click="clearSearch"
              >
                <X class="size-3.5" aria-hidden="true" />
              </button>
              <kbd
                v-else
                class="hidden md:inline-flex items-center px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] text-muted-foreground leading-none font-sans"
                aria-hidden="true"
              >
                {{ isMac ? '⌘' : 'Ctrl+' }}K
              </kbd>
            </div>
          </div>
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

    <!-- Search loading (index not yet ready) -->
    <div v-else-if="isSearchActive && !isSearchReady && !searchError" aria-busy="true" aria-label="Loading search index">
      <SummaryCardSkeleton v-for="n in 3" :key="n" />
    </div>

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
    <DateGroupedFeed
      v-else-if="!isSearchActive"
      :segments="feedSegments"
      :show-headers="isDateSort"
      :has-more="hasMore"
      :visible-count="visibleCount"
      :total-count="paginatedTotalCount"
      :revalidating="isRevalidating"
      @load-more="loadMore"
    />
  </div>
</template>

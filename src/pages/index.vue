<script setup lang="ts">
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions } from '~/composables/useSortOptions'
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useHomepageFilter } from '~/composables/useHomepageFilter'
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
} = useHomepageFilter(summaries, tagsByCategory)

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
  <div class="home-page">
    <!-- Search bar -->
    <div class="home-page__search-row">
      <SearchBar
        v-model="searchQuery"
        v-model:result-count="displayedCount"
        :is-ready="isSearchReady"
        @expand="onSearchExpand"
      />
    </div>

    <!-- Category filter: hidden during search -->
    <CategoryFilterBar
      v-if="!isSearchActive"
      :categories="tagsByCategory"
      :selected-category="selectedCategory"
      :total-count="totalCount"
      @select="selectCategory"
    />

    <header class="page-header">
      <div class="page-header__top">
        <div>
          <h1>{{ pageTitle }}</h1>
          <p class="page-header__count" aria-live="polite" aria-atomic="true">
            <template v-if="isSearchActive">
              {{ displayedCount }} result{{ displayedCount === 1 ? '' : 's' }}
            </template>
            <template v-else>
              {{ filteredCount }} videos
              <span v-if="selectedCategory"> (filtered from {{ totalCount }})</span>
            </template>
          </p>
        </div>
        <SortControl v-if="!isSearchActive" v-model="currentSort" />
      </div>
    </header>

    <p class="visually-hidden" aria-live="polite">Sorted by {{ currentSortLabel }}</p>

    <div v-if="pending && !isSearchActive" class="loading">Loading...</div>

    <!-- Search error fallback -->
    <div v-else-if="isSearchActive && searchError" class="search-error">
      <span class="material-symbols-outlined search-error__icon" aria-hidden="true">error</span>
      <p class="search-error__message">Search unavailable. Browse content below.</p>
    </div>

    <!-- Search results -->
    <div v-else-if="isSearchActive && searchResults.length > 0" class="search-results">
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
    <div v-else-if="isSearchActive && searchResults.length === 0 && isSearchReady" class="filtered-empty-state">
      <span class="filtered-empty-state__icon material-symbols-outlined" aria-hidden="true">search_off</span>
      <p class="filtered-empty-state__message">No results found for "{{ searchQuery }}"</p>
      <p class="filtered-empty-state__hint">Try different keywords or clear the search.</p>
    </div>

    <!-- Browse: filtered empty state -->
    <div v-else-if="!isSearchActive && selectedCategory && filteredCount === 0" class="filtered-empty-state">
      <span class="filtered-empty-state__icon material-symbols-outlined" aria-hidden="true">filter_list_off</span>
      <p class="filtered-empty-state__message">No summaries found in this category.</p>
      <p class="filtered-empty-state__hint">Try selecting a different category or reset the filter.</p>
      <button class="filtered-empty-state__reset" @click="selectCategory(null)">
        Show all summaries
      </button>
    </div>

    <!-- Browse: date-grouped feed -->
    <DateGroupedFeed v-else-if="!isSearchActive" :segments="feedSegments" :show-headers="isDateSort" />
  </div>
</template>

<style scoped>
.home-page {
  padding: var(--space-l, 2rem);
  padding-top: 0;
}

.home-page__search-row {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-s, 0.75rem) 0;
}

.page-header {
  margin-bottom: var(--space-l, 2rem);
  padding-top: var(--space-l, 2rem);
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
  font-size: var(--step-2, 1.5rem);
}

.page-header__count {
  margin: var(--space-2xs, 0.25rem) 0 0;
  color: var(--color-base-shade-10, #6b7280);
  font-size: var(--step--1, 0.875rem);
}

.loading {
  text-align: center;
  padding: var(--space-2xl, 3rem);
  color: var(--color-base-shade-10, #6b7280);
}

.search-results {
  display: flex;
  flex-direction: column;
}

.search-error {
  text-align: center;
  padding: var(--space-2xl, 3rem) var(--space-l, 2rem);
  color: var(--color-base-shade-10, #6b7280);
}

.search-error__icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--space-s, 0.75rem);
  color: var(--color-base-tint-20, #9ca3af);
}

.search-error__message {
  font-size: var(--step-0, 1rem);
  font-weight: 500;
  margin: 0;
  color: var(--color-text, #374151);
}

.filtered-empty-state {
  text-align: center;
  padding: var(--space-2xl, 3rem) var(--space-l, 2rem);
  color: var(--color-base-shade-10, #6b7280);
}

.filtered-empty-state__icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--space-s, 0.75rem);
  color: var(--color-base-tint-20, #9ca3af);
}

.filtered-empty-state__message {
  font-size: var(--step-0, 1rem);
  font-weight: 500;
  margin: 0 0 var(--space-2xs, 0.25rem);
  color: var(--color-text, #374151);
}

.filtered-empty-state__hint {
  margin: 0 0 var(--space-m, 1rem);
  font-size: var(--step--1, 0.875rem);
}

.filtered-empty-state__reset {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs, 0.25rem);
  padding: var(--space-xs, 0.5rem) var(--space-m, 1rem);
  background: var(--color-primary, #2563eb);
  color: #fff;
  border: none;
  border-radius: 9999px;
  font-size: var(--step--1, 0.875rem);
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s ease;
}

.filtered-empty-state__reset:hover {
  background: var(--color-primary-shade-10, #1d4ed8);
}
</style>

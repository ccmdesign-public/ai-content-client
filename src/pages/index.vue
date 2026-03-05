<script setup lang="ts">
import { useDateGroups } from '~/composables/useDateGroups'
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useHomepageFilter } from '~/composables/useHomepageFilter'

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

const { segments } = useDateGroups(filteredSummaries)
</script>

<template>
  <div class="home-page">
    <CategoryFilterBar
      :categories="tagsByCategory"
      :selected-category="selectedCategory"
      :total-count="totalCount"
      @select="selectCategory"
    />

    <header class="page-header">
      <h1>All Summaries</h1>
      <p class="page-header__count" aria-live="polite" aria-atomic="true">
        {{ filteredCount }} videos
        <span v-if="selectedCategory"> (filtered from {{ totalCount }})</span>
      </p>
    </header>

    <div v-if="pending" class="loading">Loading...</div>

    <div v-else-if="selectedCategory && filteredCount === 0" class="filtered-empty-state">
      <span class="filtered-empty-state__icon material-symbols-outlined" aria-hidden="true">filter_list_off</span>
      <p class="filtered-empty-state__message">No summaries found in this category.</p>
      <p class="filtered-empty-state__hint">Try selecting a different category or reset the filter.</p>
      <button class="filtered-empty-state__reset" @click="selectCategory(null)">
        Show all summaries
      </button>
    </div>

    <DateGroupedFeed v-else :segments="segments" />
  </div>
</template>

<style scoped>
.home-page {
  padding: var(--space-l, 2rem);
  padding-top: 0;
}

.page-header {
  margin-bottom: var(--space-l, 2rem);
  padding-top: var(--space-l, 2rem);
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

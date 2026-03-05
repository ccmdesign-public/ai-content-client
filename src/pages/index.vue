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
</style>

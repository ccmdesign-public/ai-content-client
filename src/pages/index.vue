<script setup lang="ts">
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions } from '~/composables/useSortOptions'

definePageMeta({
  hero: false,
  footer: false
})

const { data: summaries, pending } = useContentStream('summaries')
const items = computed(() => summaries.value || [])
const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(items)
const { segments } = useDateGroups(computed(() => isDateSort.value ? sorted.value : []))

// When not a date sort, build a single flat segment to pass to DateGroupedFeed
const feedSegments = computed(() =>
  isDateSort.value
    ? segments.value
    : sorted.value.length > 0
      ? [{ key: 'older' as const, label: '', items: sorted.value }]
      : []
)
</script>

<template>
  <div class="home-page">
    <header class="page-header">
      <div class="page-header__top">
        <div>
          <h1>All Summaries</h1>
          <p class="page-header__count">{{ summaries?.length || 0 }} videos</p>
        </div>
        <SortControl v-model="currentSort" />
      </div>
    </header>

    <p class="visually-hidden" aria-live="polite">Sorted by {{ currentSortLabel }}</p>

    <div v-if="pending" class="loading">Loading...</div>

    <DateGroupedFeed v-else :segments="feedSegments" :show-headers="isDateSort" />
  </div>
</template>

<style scoped>
.home-page {
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

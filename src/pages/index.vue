<script setup lang="ts">
import { useDateGroups } from '~/composables/useDateGroups'
import { useSortOptions } from '~/composables/useSortOptions'

definePageMeta({
  hero: false,
  footer: false
})

const { data: summaries, pending } = useContentStream('summaries')
const { currentSort, sorted, isDateSort, currentSortLabel } = useSortOptions(computed(() => summaries.value || []))
const { segments } = useDateGroups(sorted)
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

    <DateGroupedFeed v-else :segments="segments" :show-headers="isDateSort" />
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

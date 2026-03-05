<script setup lang="ts">
import type { DateSegment } from '~/composables/useDateGroups'

defineProps<{
  segments: DateSegment<any>[]
}>()
</script>

<template>
  <div class="date-grouped-feed">
    <section
      v-for="segment in segments"
      :key="segment.key"
      class="date-segment"
    >
      <h2 class="date-segment__header">
        {{ segment.label }}
        <span class="date-segment__count">({{ segment.items.length }})</span>
      </h2>
      <ul class="date-segment__list">
        <li v-for="item in segment.items" :key="item.metadata?.videoId">
          <SummaryCard :summary="item" />
        </li>
      </ul>
    </section>

    <div v-if="segments.length === 0" class="empty-state">
      <p>No summaries found.</p>
    </div>
  </div>
</template>

<style scoped>
.date-grouped-feed {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl, 2rem);
}

.date-segment__header {
  position: sticky;
  /* Offset below the sticky CategoryFilterBar (~60px: 44px chip + 0.5rem*2 padding + 1px border) */
  top: var(--filter-bar-height, 0px);
  background: var(--color-background, #fff);
  padding: var(--space-s, 0.75rem) 0;
  margin: 0 0 var(--space-m, 1rem) 0;
  font-size: var(--step--1, 0.875rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-base-shade-10, #6b7280);
  border-bottom: 1px solid var(--color-base-tint-10, #e5e7eb);
  z-index: 10;
}

.date-segment__count {
  font-weight: 400;
  color: var(--color-base-tint-20, #9ca3af);
}

.date-segment__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-m, 1rem);
}

.empty-state {
  text-align: center;
  padding: var(--space-2xl, 3rem);
  color: var(--color-base-shade-10, #6b7280);
}
</style>

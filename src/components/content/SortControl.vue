<script setup lang="ts">
import { useId } from 'vue'
import { SORT_OPTIONS, type SortKey } from '~/composables/useSortOptions'

const model = defineModel<SortKey>({ required: true })
const selectId = useId()
</script>

<template>
  <div class="sort-control">
    <label :for="selectId" class="sort-control__label">Sort by</label>
    <select :id="selectId" v-model="model" class="sort-control__select">
      <option v-for="opt in SORT_OPTIONS" :key="opt.key" :value="opt.key">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.sort-control {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs, 0.5rem);
}

.sort-control__label {
  font-size: var(--step--1, 0.875rem);
  color: var(--color-base-shade-10, #6b7280);
}

.sort-control__select {
  font-size: var(--step--1, 0.875rem);
  padding: var(--space-2xs, 0.375rem) var(--space-xs, 0.5rem);
  min-height: 44px;
  border: 1px solid var(--color-base-tint-10, #e5e7eb);
  border-radius: 6px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #374151);
  cursor: pointer;
}

.sort-control__select:focus-visible {
  outline: 2px solid var(--color-primary, #2563eb);
  outline-offset: 2px;
}
</style>

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
  gap: 0.6875rem;
}

.sort-control__label {
  font-size: 0.875rem;
  color: var(--muted-foreground);
}

.sort-control__select {
  font-size: 0.875rem;
  padding: 0.375rem 0.6875rem;
  min-height: 44px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--background);
  color: var(--foreground);
  cursor: pointer;
}

.sort-control__select:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
</style>

<script setup lang="ts">
import type { ToolSortOption } from '~/composables/useToolsDirectory'

const props = defineProps<{
  sortBy: ToolSortOption
  hasStarsData: boolean
}>()

const emit = defineEmits<{
  'update:sortBy': [value: ToolSortOption]
}>()

const sortOptions = computed(() => {
  const options = [
    { value: 'mentions' as const, label: 'Most mentioned' },
    { value: 'alpha' as const, label: 'Alphabetical' }
  ]
  // Only show stars sort if we have stars data
  if (props.hasStarsData) {
    options.push({ value: 'stars' as const, label: 'Most stars' })
  }
  return options
})

function handleSortChange(value: string) {
  emit('update:sortBy', value as ToolSortOption)
}
</script>

<template>
  <div class="tools-filters flex flex-wrap items-center gap-3">
    <div class="flex items-center gap-2">
      <Label for="sort-select" class="text-sm text-muted-foreground whitespace-nowrap">
        Sort by:
      </Label>
      <Select :model-value="sortBy" @update:model-value="handleSortChange">
        <SelectTrigger id="sort-select" class="w-[160px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="option in sortOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Placeholder for future category/tag filters -->
    <slot name="filters" />
  </div>
</template>

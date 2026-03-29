<script setup lang="ts">
import type { MasterclassSortOption } from '~/composables/useMasterclassIndex'

defineProps<{
  sortBy: MasterclassSortOption
}>()

const emit = defineEmits<{
  'update:sortBy': [value: MasterclassSortOption]
}>()

const sortOptions: Array<{ value: MasterclassSortOption; label: string }> = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'alpha', label: 'Alphabetical' },
  { value: 'newest', label: 'Newest' },
]

function handleSortChange(value: string) {
  emit('update:sortBy', value as MasterclassSortOption)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Label for="masterclass-sort" class="text-sm text-muted-foreground whitespace-nowrap">
      Sort by:
    </Label>
    <Select :model-value="sortBy" @update:model-value="handleSortChange">
      <SelectTrigger id="masterclass-sort" class="w-[140px]">
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
</template>

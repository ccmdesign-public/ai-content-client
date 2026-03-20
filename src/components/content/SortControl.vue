<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { SORT_OPTIONS, type SortKey } from '~/composables/useSortOptions'

const model = defineModel<SortKey>({ required: true })
const selectId = useId()
</script>

<template>
  <div class="inline-flex items-center gap-2.5">
    <Label :for="selectId" class="text-sm text-muted-foreground whitespace-nowrap">Sort by</Label>
    <Select v-model="model">
      <SelectTrigger :id="selectId" class="w-[160px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="opt in SORT_OPTIONS" :key="opt.key" :value="opt.key">
          {{ opt.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

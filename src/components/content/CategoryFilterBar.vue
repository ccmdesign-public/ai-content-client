<script setup lang="ts">
import type { TagCategory } from '~/composables/useTagsConfig'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const props = defineProps<{
  categories: TagCategory[]
  selectedCategory: string | null
  totalCount?: number
}>()

const emit = defineEmits<{
  select: [categoryId: string | null]
}>()

// Expose height for sticky offset coordination
const barRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!barRef.value) return
  const observer = new ResizeObserver(([entry]) => {
    const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height
    barRef.value?.parentElement?.style.setProperty('--filter-bar-height', `${height}px`)
  })
  observer.observe(barRef.value)
  onUnmounted(() => observer.disconnect())
})

// Total items: use accurate unique count from parent if provided
const allItemsCount = computed(() =>
  props.totalCount ?? props.categories.reduce((sum, c) => sum + c.totalItems, 0)
)

// Map selectedCategory to ToggleGroup model value
const toggleValue = computed(() => props.selectedCategory ?? 'all')

function handleValueChange(val: string) {
  // Prevent empty selection -- fallback to "all"
  const resolved = val || 'all'
  emit('select', resolved === 'all' ? null : resolved)
}
</script>

<template>
  <div ref="barRef" class="sticky top-0 z-20 bg-background border-b border-border">
    <div class="relative">
      <ToggleGroup
        type="single"
        :model-value="toggleValue"
        class="flex gap-2.5 overflow-x-auto scrollbar-none px-4 py-2.5 scroll-snap-x"
        aria-label="Filter by category"
        @update:model-value="handleValueChange"
      >
        <!-- "All" chip -->
        <ToggleGroupItem
          value="all"
          class="inline-flex items-center gap-1 px-3 py-1 border rounded-full text-sm whitespace-nowrap min-h-[44px] shrink-0 cursor-pointer data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary data-[state=off]:bg-muted data-[state=off]:text-foreground data-[state=off]:border-border hover:bg-accent hover:text-accent-foreground"
        >
          <span class="font-medium">All</span>
          <span class="text-xs" :class="selectedCategory === null ? 'text-primary-foreground/80' : 'text-muted-foreground'">{{ allItemsCount }}</span>
        </ToggleGroupItem>

        <!-- Category chips -->
        <ToggleGroupItem
          v-for="category in categories"
          :key="category.categoryId"
          :value="category.categoryId"
          :title="category.name"
          class="inline-flex items-center gap-1 px-3 py-1 border rounded-full text-sm whitespace-nowrap min-h-[44px] shrink-0 cursor-pointer data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary data-[state=off]:bg-muted data-[state=off]:text-foreground data-[state=off]:border-border hover:bg-accent hover:text-accent-foreground"
        >
          <span class="font-medium">{{ category.shortName }}</span>
          <span class="text-xs" :class="selectedCategory === category.categoryId ? 'text-primary-foreground/80' : 'text-muted-foreground'">{{ category.totalItems }}</span>
        </ToggleGroupItem>
      </ToggleGroup>

      <!-- Fade edge indicator -->
      <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-background pointer-events-none" />
    </div>
  </div>
</template>

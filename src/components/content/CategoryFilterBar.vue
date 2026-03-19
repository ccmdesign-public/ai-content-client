<script setup lang="ts">
import type { TagCategory } from '~/composables/useTagsConfig'

const props = defineProps<{
  categories: TagCategory[]
  selectedCategory: string | null
  totalCount?: number
}>()

const emit = defineEmits<{
  select: [categoryId: string | null]
}>()

// --- Expose height for sticky offset coordination ---
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

// Total items: use accurate unique count from parent if provided,
// otherwise fall back to category sum (which may double-count multi-tagged items)
const allItemsCount = computed(() =>
  props.totalCount ?? props.categories.reduce((sum, c) => sum + c.totalItems, 0)
)

// --- Roving tabindex & keyboard navigation ---
const chipRefs = ref<HTMLElement[]>([])

// Reset chipRefs before each render cycle to prevent stale DOM references
onBeforeUpdate(() => {
  chipRefs.value = []
})

function setChipRef(el: any, index: number) {
  if (el) chipRefs.value[index] = el
}

// Build a flat list: "All" (index 0) + each category
const totalChipCount = computed(() => props.categories.length + 1)

function getActiveIndex(): number {
  if (!props.selectedCategory) return 0
  const idx = props.categories.findIndex(c => c.categoryId === props.selectedCategory)
  return idx >= 0 ? idx + 1 : 0
}

function handleKeydown(event: KeyboardEvent, currentIndex: number) {
  let nextIndex = currentIndex
  const count = totalChipCount.value

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (currentIndex + 1) % count
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = (currentIndex - 1 + count) % count
      break
    case 'Home':
      nextIndex = 0
      break
    case 'End':
      nextIndex = count - 1
      break
    default:
      return // Don't prevent default for unhandled keys
  }

  event.preventDefault()

  // Select the category at nextIndex
  if (nextIndex === 0) {
    emit('select', null)
  } else {
    emit('select', props.categories[nextIndex - 1].categoryId)
  }

  // Move focus
  chipRefs.value[nextIndex]?.focus()
}
</script>

<template>
  <div ref="barRef" class="category-filter-bar">
    <div
      class="category-filter-bar__list"
      role="radiogroup"
      aria-label="Filter by category"
    >
      <!-- "All" chip -->
      <button
        :ref="(el) => setChipRef(el, 0)"
        role="radio"
        :aria-checked="selectedCategory === null"
        :aria-pressed="selectedCategory === null"
        :tabindex="selectedCategory === null ? 0 : -1"
        class="filter-chip"
        :class="selectedCategory === null ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border hover:bg-accent hover:text-accent-foreground'"
        @click="emit('select', null)"
        @keydown="handleKeydown($event, 0)"
      >
        <span class="font-medium">All</span>
        <span class="text-xs" :class="selectedCategory === null ? 'text-primary-foreground/80' : 'text-muted-foreground'">{{ allItemsCount }}</span>
      </button>

      <!-- Category chips -->
      <button
        v-for="(category, index) in categories"
        :key="category.categoryId"
        :ref="(el) => setChipRef(el, index + 1)"
        role="radio"
        :aria-checked="selectedCategory === category.categoryId"
        :aria-pressed="selectedCategory === category.categoryId"
        :tabindex="selectedCategory === category.categoryId ? 0 : -1"
        :title="category.name"
        class="filter-chip"
        :class="selectedCategory === category.categoryId ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border hover:bg-accent hover:text-accent-foreground'"
        @click="emit('select', category.categoryId)"
        @keydown="handleKeydown($event, index + 1)"
      >
        <span class="font-medium">{{ category.shortName }}</span>
        <span class="text-xs" :class="selectedCategory === category.categoryId ? 'text-primary-foreground/80' : 'text-muted-foreground'">{{ category.totalItems }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-filter-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--background);
  border-bottom: 1px solid var(--border);
}

.category-filter-bar::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2rem;
  background: linear-gradient(to right, transparent, var(--background));
  pointer-events: none;
}

.category-filter-bar__list {
  display: flex;
  gap: 0.6875rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  padding: 0.6875rem 1.75rem;
}

.category-filter-bar__list::-webkit-scrollbar {
  display: none;
}

.category-filter-bar__list > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* Filter chip base styles */
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-family: inherit;
  transition: background 0.15s ease, border-color 0.15s ease;
  cursor: pointer;
  white-space: nowrap;
  min-height: 44px;
}

.filter-chip:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .filter-chip {
    transition: none;
  }
}
</style>

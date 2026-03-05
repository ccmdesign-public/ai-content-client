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
        :tabindex="selectedCategory === null ? 0 : -1"
        class="tag-chip"
        :class="{ 'tag-chip--active': selectedCategory === null }"
        @click="emit('select', null)"
        @keydown="handleKeydown($event, 0)"
      >
        <span class="tag-chip__name">All</span>
        <span class="tag-chip__count">{{ allItemsCount }}</span>
      </button>

      <!-- Category chips -->
      <button
        v-for="(category, index) in categories"
        :key="category.categoryId"
        :ref="(el) => setChipRef(el, index + 1)"
        role="radio"
        :aria-checked="selectedCategory === category.categoryId"
        :tabindex="selectedCategory === category.categoryId ? 0 : -1"
        :title="category.name"
        class="tag-chip"
        :class="{ 'tag-chip--active': selectedCategory === category.categoryId }"
        @click="emit('select', category.categoryId)"
        @keydown="handleKeydown($event, index + 1)"
      >
        <span class="tag-chip__name">{{ category.shortName }}</span>
        <span class="tag-chip__count">{{ category.totalItems }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-filter-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--color-background, #fff);
  border-bottom: 1px solid var(--color-base-tint-10, #e5e7eb);
}

.category-filter-bar::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2rem;
  background: linear-gradient(to right, transparent, var(--color-background, #fff));
  pointer-events: none;
}

.category-filter-bar__list {
  display: flex;
  gap: var(--space-xs, 0.5rem);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  padding: var(--space-xs, 0.5rem) var(--space-l, 2rem);
}

.category-filter-bar__list::-webkit-scrollbar {
  display: none;
}

.category-filter-bar__list > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* Filter bar specific: ensure minimum touch target for chips */
.tag-chip {
  min-height: 44px;
}
</style>

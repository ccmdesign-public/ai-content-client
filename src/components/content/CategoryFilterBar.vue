<script setup lang="ts">
import type { TagCategory } from '~/composables/useTagsConfig'

const props = defineProps<{
  categories: TagCategory[]
  selectedCategory: string | null
}>()

const emit = defineEmits<{
  select: [categoryId: string | null]
}>()

// Abbreviated display names for long category labels
const SHORT_NAMES: Record<string, string> = {
  'AI & Machine Learning': 'AI & ML',
  'Web Development': 'Web Dev',
  'Mobile Development': 'Mobile Dev',
  'Data & Analytics': 'Data & Analytics',
  'Product & Design': 'Product & Design',
  'Business & Career': 'Biz & Career'
}

function displayName(name: string): string {
  return SHORT_NAMES[name] || name
}

// Total items across all categories (for the "All" chip count)
const allItemsCount = computed(() =>
  props.categories.reduce((sum, c) => sum + c.totalItems, 0)
)

// --- Roving tabindex & keyboard navigation ---
const chipRefs = ref<HTMLElement[]>([])

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
  <div class="category-filter-bar">
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
        <span class="tag-chip__name">{{ displayName(category.name) }}</span>
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

/* Chip base styles (mirrors .tag-chip from tags/index.vue) */
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs, 0.25rem);
  padding: var(--space-2xs, 0.25rem) var(--space-s, 0.75rem);
  min-height: 44px;
  background: var(--color-base-tint-5, #f3f4f6);
  border: 1px solid var(--color-base-tint-10, #e5e7eb);
  border-radius: 9999px;
  text-decoration: none;
  color: var(--color-text, #374151);
  font-size: var(--step--1, 0.875rem);
  font-family: inherit;
  transition: background 0.15s ease, border-color 0.15s ease;
  cursor: pointer;
  white-space: nowrap;
}

.tag-chip:hover {
  background: var(--color-primary-tint-10, #eff6ff);
  border-color: var(--color-primary, #2563eb);
  color: var(--color-primary, #2563eb);
}

.tag-chip:hover .tag-chip__count {
  color: var(--color-primary, #2563eb);
}

.tag-chip:focus-visible {
  outline: 2px solid var(--color-primary, #2563eb);
  outline-offset: 2px;
}

/* Active / selected state */
.tag-chip--active {
  background: var(--color-primary, #2563eb);
  border-color: var(--color-primary, #2563eb);
  color: #fff;
}

.tag-chip--active:hover {
  background: var(--color-primary, #2563eb);
  border-color: var(--color-primary, #2563eb);
  color: #fff;
}

.tag-chip--active .tag-chip__count {
  color: rgba(255, 255, 255, 0.8);
}

.tag-chip--active:hover .tag-chip__count {
  color: rgba(255, 255, 255, 0.8);
}

.tag-chip__name {
  font-weight: 500;
}

.tag-chip__count {
  font-weight: 400;
  color: var(--color-base-shade-10, #6b7280);
  font-size: var(--step--2, 0.75rem);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .tag-chip {
    transition: none;
  }
}
</style>

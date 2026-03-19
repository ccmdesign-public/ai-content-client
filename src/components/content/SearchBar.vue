<script setup lang="ts">
/**
 * Expandable search bar with Cmd+K / Ctrl+K keyboard shortcut.
 *
 * Collapsed: shows a search icon with keyboard shortcut hint.
 * Expanded: shows a text input with autofocus, clear button.
 * Escape: clears query first, then collapses on second press.
 */
const props = defineProps<{
  modelValue: string
  isReady: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  expand: []
}>()

const isExpanded = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const searchQuery = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

const isMac = ref(false)

function expand() {
  isExpanded.value = true
  emit('expand')
  nextTick(() => inputRef.value?.focus())
}

function collapse() {
  isExpanded.value = false
  nextTick(() => triggerRef.value?.focus())
}

function clearAndFocus() {
  searchQuery.value = ''
  nextTick(() => inputRef.value?.focus())
}

function handleEscape() {
  if (searchQuery.value) {
    searchQuery.value = ''
  } else {
    collapse()
  }
}

// Global keyboard shortcut: Cmd+K / Ctrl+K
function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    // Don't intercept when typing in another input/textarea
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      // Unless the target is our own search input
      if (e.target !== inputRef.value) return
    }
    e.preventDefault()
    if (!isExpanded.value) {
      expand()
    } else {
      inputRef.value?.focus()
    }
  }
}

// Result count announcement for screen readers
const resultCount = defineModel<number>('resultCount', { default: 0 })
const resultAnnouncement = computed(() => {
  if (!isExpanded.value || !searchQuery.value) return ''
  if (!props.isReady) return 'Loading search...'
  return resultCount.value === 1
    ? '1 result found'
    : `${resultCount.value} results found`
})

onMounted(() => {
  isMac.value = navigator.platform.toUpperCase().includes('MAC')
  document.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onGlobalKeydown)
})

// Expand automatically if query is pre-populated from URL
onMounted(() => {
  if (searchQuery.value) {
    isExpanded.value = true
  }
})
</script>

<template>
  <search class="search-bar" :class="{ 'search-bar--expanded': isExpanded }">
    <!-- Collapsed: icon trigger -->
    <button
      v-if="!isExpanded"
      ref="triggerRef"
      class="search-bar__trigger"
      :aria-label="`Open search (${isMac ? 'Cmd' : 'Ctrl'}+K)`"
      @click="expand"
    >
      <span class="material-symbols-outlined" aria-hidden="true">search</span>
      <kbd class="search-bar__shortcut" aria-hidden="true">{{ isMac ? '⌘' : 'Ctrl+' }}K</kbd>
    </button>

    <!-- Expanded: input -->
    <div v-else class="search-bar__input-wrapper">
      <span class="material-symbols-outlined search-bar__icon" aria-hidden="true">search</span>
      <input
        ref="inputRef"
        v-model="searchQuery"
        type="search"
        class="search-bar__input"
        placeholder="Search summaries..."
        aria-label="Search all content"
        :aria-keyshortcuts="isMac ? 'Meta+K' : 'Control+K'"
        @keydown.escape="handleEscape"
      />
      <button
        v-if="searchQuery"
        class="search-bar__clear"
        aria-label="Clear search"
        @click="clearAndFocus"
      >
        <span class="material-symbols-outlined" aria-hidden="true">close</span>
      </button>
      <button
        class="search-bar__collapse"
        aria-label="Close search"
        @click="collapse"
      >
        <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_up</span>
      </button>
    </div>

    <!-- Screen reader announcement -->
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">
      {{ resultAnnouncement }}
    </div>
  </search>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
}

.search-bar__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.6875rem;
  padding: 0.6875rem 0.875rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 9999px;
  cursor: pointer;
  color: var(--muted-foreground);
  font-family: inherit;
  font-size: 0.875rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  min-height: 44px;
  min-width: 44px;
}

.search-bar__trigger:hover {
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary);
}

.search-bar__trigger:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.search-bar__shortcut {
  display: none;
  padding: 2px 6px;
  background: var(--accent);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: inherit;
  color: var(--muted-foreground);
  line-height: 1;
}

@media (min-width: 769px) {
  .search-bar__shortcut {
    display: inline-block;
  }
}

.search-bar__input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background: var(--background);
  border: 1px solid var(--primary);
  border-radius: 9999px;
  padding: 0.375rem 0.875rem;
  box-shadow: 0 0 0 1px var(--primary);
  min-height: 44px;
  width: 100%;
  max-width: 400px;
}

@media (max-width: 768px) {
  .search-bar__input-wrapper {
    max-width: 100%;
  }
}

.search-bar__icon {
  color: var(--muted-foreground);
  font-size: 20px;
  flex-shrink: 0;
}

.search-bar__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  font-family: inherit;
  color: var(--foreground);
  min-width: 0;
}

.search-bar__input::placeholder {
  color: var(--muted-foreground);
}

/* Hide native search clear button (we have our own) */
.search-bar__input::-webkit-search-cancel-button {
  display: none;
}

.search-bar__clear,
.search-bar__collapse {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.375rem;
  color: var(--muted-foreground);
  border-radius: 50%;
  min-width: 32px;
  min-height: 32px;
  flex-shrink: 0;
}

.search-bar__clear:hover,
.search-bar__collapse:hover {
  background: var(--accent);
  color: var(--foreground);
}

.search-bar__clear:focus-visible,
.search-bar__collapse:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .search-bar__trigger,
  .search-bar__clear,
  .search-bar__collapse {
    transition: none;
  }
}
</style>

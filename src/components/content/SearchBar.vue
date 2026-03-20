<script setup lang="ts">
import { Search, X, ChevronUp } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

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
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
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
  <search class="flex items-center">
    <!-- Collapsed: icon trigger -->
    <button
      v-if="!isExpanded"
      ref="triggerRef"
      class="inline-flex items-center gap-2.5 px-3.5 py-2.5 bg-background border border-border rounded-full text-muted-foreground text-sm cursor-pointer min-h-[44px] min-w-[44px] transition-colors hover:border-primary hover:shadow-[0_0_0_1px_var(--primary)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 motion-reduce:transition-none"
      :aria-label="`Open search (${isMac ? 'Cmd' : 'Ctrl'}+K)`"
      @click="expand"
    >
      <Search class="size-5" aria-hidden="true" />
      <kbd class="hidden md:inline-block px-1.5 py-0.5 bg-accent border border-border rounded text-xs text-muted-foreground leading-none" aria-hidden="true">{{ isMac ? '⌘' : 'Ctrl+' }}K</kbd>
    </button>

    <!-- Expanded: input -->
    <div v-else class="flex items-center gap-1.5 bg-background border border-primary rounded-full px-3.5 py-1.5 shadow-[0_0_0_1px_var(--primary)] min-h-[44px] w-full max-w-[400px] max-md:max-w-full">
      <Search class="size-5 text-muted-foreground shrink-0" aria-hidden="true" />
      <Input
        ref="inputRef"
        v-model="searchQuery"
        type="search"
        class="flex-1 border-none shadow-none p-0 h-auto focus-visible:ring-0 bg-transparent [&::-webkit-search-cancel-button]:hidden"
        placeholder="Search summaries..."
        aria-label="Search all content"
        :aria-keyshortcuts="isMac ? 'Meta+K' : 'Control+K'"
        @keydown.escape="handleEscape"
      />
      <button
        v-if="searchQuery"
        class="flex items-center justify-center bg-transparent border-none cursor-pointer p-1.5 text-muted-foreground rounded-full min-w-[32px] min-h-[32px] shrink-0 hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        aria-label="Clear search"
        @click="clearAndFocus"
      >
        <X class="size-4" aria-hidden="true" />
      </button>
      <button
        class="flex items-center justify-center bg-transparent border-none cursor-pointer p-1.5 text-muted-foreground rounded-full min-w-[32px] min-h-[32px] shrink-0 hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        aria-label="Close search"
        @click="collapse"
      >
        <ChevronUp class="size-4" aria-hidden="true" />
      </button>
    </div>

    <!-- Screen reader announcement -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ resultAnnouncement }}
    </div>
  </search>
</template>

<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  modelValue: string
  isReady: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: []
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const searchQuery = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

const isMac = ref(false)

function clearAndFocus() {
  searchQuery.value = ''
  nextTick(() => inputRef.value?.focus())
}

function handleEscape() {
  if (searchQuery.value) {
    searchQuery.value = ''
  } else {
    inputRef.value?.blur()
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
    inputRef.value?.focus()
  }
}

// Result count announcement for screen readers
const resultCount = defineModel<number>('resultCount', { default: 0 })
const resultAnnouncement = computed(() => {
  if (!searchQuery.value) return ''
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
</script>

<template>
  <search class="relative w-full max-w-sm">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
    <Input
      ref="inputRef"
      v-model="searchQuery"
      type="search"
      class="pl-9 pr-16 [&::-webkit-search-cancel-button]:hidden"
      placeholder="Search summaries..."
      aria-label="Search all content"
      :aria-keyshortcuts="isMac ? 'Meta+K' : 'Control+K'"
      @focus="emit('focus')"
      @keydown.escape="handleEscape"
    />
    <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
      <button
        v-if="searchQuery"
        class="flex items-center justify-center p-1 text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1"
        aria-label="Clear search"
        @click="clearAndFocus"
      >
        <X class="size-3.5" aria-hidden="true" />
      </button>
      <kbd
        v-else
        class="hidden md:inline-flex items-center px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] text-muted-foreground leading-none font-sans"
        aria-hidden="true"
      >
        {{ isMac ? '⌘' : 'Ctrl+' }}K
      </kbd>
    </div>

    <!-- Screen reader announcement -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ resultAnnouncement }}
    </div>
  </search>
</template>

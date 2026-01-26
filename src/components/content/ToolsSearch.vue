<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  resultCount: number
  totalCount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

function clearSearch() {
  emit('update:modelValue', '')
}

// Announce result count changes to screen readers
const announcement = computed(() => {
  if (!props.modelValue) return ''
  if (props.resultCount === 0) {
    return `No tools found for "${props.modelValue}"`
  }
  return `${props.resultCount} tools found for "${props.modelValue}"`
})
</script>

<template>
  <div class="tools-search">
    <div class="relative">
      <Label for="tools-search" class="sr-only">Search tools</Label>
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      <Input
        id="tools-search"
        v-model="inputValue"
        type="search"
        placeholder="Search tools..."
        class="pl-10 pr-10"
        autocomplete="off"
        :aria-describedby="modelValue ? 'search-results-status' : undefined"
      />

      <button
        v-if="modelValue"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Clear search"
        @click="clearSearch"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>

    <!-- ARIA live region for result announcements -->
    <div
      id="search-results-status"
      class="sr-only"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ announcement }}
    </div>
  </div>
</template>

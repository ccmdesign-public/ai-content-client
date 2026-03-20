<script setup lang="ts">
import { computed } from 'vue'
import type { DateSegment } from '~/composables/useDateGroups'
import type { Sortable } from '~/composables/useSortOptions'


const props = defineProps<{
  segments: DateSegment<Sortable>[]
  showHeaders?: boolean
}>()

// Default to true for backwards compatibility
const shouldShowHeaders = computed(() => props.showHeaders !== false)

// Flatten all items for non-date sort rendering
const allItems = computed(() => props.segments.flatMap(s => s.items))
</script>

<template>
  <div class="flex flex-col gap-10">
    <template v-if="shouldShowHeaders">
      <section
        v-for="segment in segments"
        :key="segment.key"
      >
        <h2 class="sticky top-[var(--filter-bar-height,0px)] bg-background py-3.5 mb-5 text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b border-border z-10">
          {{ segment.label }}
          <span class="font-normal text-muted-foreground">({{ segment.items.length }})</span>
        </h2>
        <ul class="list-none p-0 m-0 flex flex-col gap-5">
          <li v-for="item in segment.items" :key="item.metadata?.videoId">
            <SummaryCard :summary="item" />
          </li>
        </ul>
      </section>
    </template>
    <template v-else>
      <ul class="list-none p-0 m-0 flex flex-col gap-5">
        <li v-for="item in allItems" :key="item.metadata?.videoId">
          <SummaryCard :summary="item" />
        </li>
      </ul>
    </template>

    <div v-if="segments.length === 0" class="text-center py-12 text-muted-foreground">
      <p>No content found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DateSegment } from '~/composables/useDateGroups'

defineProps<{
  segments: DateSegment<any>[]
}>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <section
      v-for="segment in segments"
      :key="segment.key"
    >
      <h2 class="sticky top-0 bg-background py-3 mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b border-border z-10">
        {{ segment.label }}
        <span class="font-normal text-muted-foreground/60">({{ segment.items.length }})</span>
      </h2>
      <ul class="flex flex-col gap-4 list-none p-0 m-0">
        <li v-for="item in segment.items" :key="item.metadata?.videoId">
          <SummaryCard :summary="item" />
        </li>
      </ul>
    </section>

    <div v-if="segments.length === 0" class="text-center py-12 text-muted-foreground">
      <p>No summaries found.</p>
    </div>
  </div>
</template>

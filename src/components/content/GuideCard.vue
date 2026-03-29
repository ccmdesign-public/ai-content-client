<script setup lang="ts">
import type { ToolWithStars } from '~/types/tools'
import { Badge } from '@/components/ui/badge'
import { Star, ChevronRight } from 'lucide-vue-next'

defineProps<{
  tool: ToolWithStars
  guideDescription: string
  guideSlug: string
}>()

/**
 * Format large numbers with K/M suffix
 */
function formatStars(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}
</script>

<template>
  <NuxtLink
    :to="`/guides/${guideSlug}`"
    class="block border rounded-lg bg-card p-4 hover:bg-accent/50 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    :aria-label="`${tool.name} guide`"
  >
    <div class="flex items-center gap-3">
      <!-- Tool name and badges -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-medium text-card-foreground">{{ tool.name }}</span>
          <Badge v-if="tool.stars !== undefined" variant="secondary" class="gap-1">
            <Star class="size-3" aria-hidden="true" />
            {{ formatStars(tool.stars) }}
          </Badge>
          <Badge variant="outline" class="text-xs">Guide</Badge>
        </div>
        <p class="text-sm text-muted-foreground mt-1 line-clamp-2">{{ guideDescription }}</p>
      </div>

      <!-- Arrow -->
      <ChevronRight class="size-5 text-muted-foreground shrink-0" aria-hidden="true" />
    </div>
  </NuxtLink>
</template>

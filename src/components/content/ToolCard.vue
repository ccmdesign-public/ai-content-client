<script setup lang="ts">
import type { ToolWithStars } from '~/types/tools'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, Link as LinkIcon, Github, Star } from 'lucide-vue-next'

const props = defineProps<{
  tool: ToolWithStars
}>()

const showAllVideos = ref(false)

const displayedVideos = computed(() => {
  const videos = props.tool.videos || []
  return showAllVideos.value ? videos : videos.slice(0, 5)
})

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

/**
 * Get the GitHub URL from repo path
 */
function getGitHubUrl(repo: string): string {
  return `https://github.com/${repo}`
}
</script>

<template>
  <details class="group border rounded-lg bg-card [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
    <summary class="p-4 cursor-pointer select-none">
      <div class="flex items-center gap-3 flex-wrap">
        <!-- Tool name -->
        <span class="font-medium text-card-foreground">{{ tool.name }}</span>

        <!-- GitHub stars badge -->
        <Badge v-if="tool.stars !== undefined" variant="secondary" class="gap-1">
          <Star class="size-3" aria-hidden="true" />
          {{ formatStars(tool.stars) }}
        </Badge>

        <!-- Video count -->
        <span class="text-muted-foreground text-sm ml-auto">
          {{ tool.stats.videoCount }} {{ tool.stats.videoCount === 1 ? 'video' : 'videos' }}
        </span>

        <!-- Chevron indicator -->
        <ChevronDown
          class="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </div>
    </summary>

    <div class="px-4 pb-4 border-t pt-4 space-y-4">
      <!-- Links section -->
      <div v-if="tool.website || tool.github" class="flex flex-wrap gap-3 text-sm">
        <a
          v-if="tool.website"
          :href="tool.website"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:underline inline-flex items-center gap-1"
        >
          <LinkIcon class="size-4" aria-hidden="true" />
          Website
        </a>
        <a
          v-if="tool.github?.repo"
          :href="getGitHubUrl(tool.github.repo)"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:underline inline-flex items-center gap-1"
        >
          <Github class="size-4" aria-hidden="true" />
          GitHub
        </a>
      </div>

      <!-- Description if available -->
      <p v-if="tool.description" class="text-sm text-muted-foreground">
        {{ tool.description }}
      </p>

      <!-- Videos section -->
      <div>
        <h4 class="text-sm font-medium mb-2 text-muted-foreground">Mentioned in videos:</h4>
        <ul class="space-y-1">
          <li v-for="video in displayedVideos" :key="video.id">
            <NuxtLink
              :to="`/summaries/${video.id}`"
              class="text-sm hover:underline text-foreground"
            >
              {{ video.title }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Show more/less button -->
        <button
          v-if="tool.videos.length > 5"
          type="button"
          class="text-sm text-primary hover:underline mt-2"
          @click="showAllVideos = !showAllVideos"
        >
          {{ showAllVideos ? 'Show less' : `Show all ${tool.videos.length} videos` }}
        </button>
      </div>
    </div>
  </details>
</template>

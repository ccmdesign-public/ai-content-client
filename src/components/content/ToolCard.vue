<script setup lang="ts">
import type { ToolWithStars } from '~/types/tools'

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
  <details class="tool-card group border rounded-lg bg-card">
    <summary class="p-4 cursor-pointer select-none list-none">
      <div class="flex items-center gap-3 flex-wrap">
        <!-- Tool name -->
        <span class="font-medium text-card-foreground">{{ tool.name }}</span>

        <!-- GitHub stars badge -->
        <Badge v-if="tool.stars !== undefined" variant="secondary" class="gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-3"
            aria-hidden="true"
          >
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
          </svg>
          {{ formatStars(tool.stars) }}
        </Badge>

        <!-- Video count -->
        <span class="text-muted-foreground text-sm ml-auto">
          {{ tool.stats.videoCount }} {{ tool.stats.videoCount === 1 ? 'video' : 'videos' }}
        </span>

        <!-- Chevron indicator -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Website
        </a>
        <a
          v-if="tool.github?.repo"
          :href="getGitHubUrl(tool.github.repo)"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:underline inline-flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
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

<style scoped>
/* Hide default marker in all browsers */
.tool-card summary::-webkit-details-marker {
  display: none;
}

/* Smooth animation for chevron */
.tool-card summary svg {
  transition: transform 0.2s ease;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .tool-card summary svg {
    transition: none;
  }
}
</style>

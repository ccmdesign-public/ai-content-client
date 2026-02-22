<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '~/utils/formatDate'

const props = defineProps<{
  article: {
    path: string
    title: string
    subtitle?: string
    author: string
    platform: string
    publicationName: string
    url: string
    publishedAt: string
  }
}>()

// Generate a unique gradient based on the publication name
const gradientStyle = computed(() => {
  const str = props.article.publicationName || props.article.author
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Generate two distinct hues for the gradient
  const hue1 = Math.abs(hash % 360)
  const hue2 = (hue1 + 40 + Math.abs((hash >> 8) % 60)) % 360

  return {
    background: `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 65%, 50%) 100%)`
  }
})
</script>

<template>
  <article class="flex border-t border-border gap-4 py-4 max-md:flex-col">
    <!-- Gradient placeholder with document icon -->
    <div
      class="max-w-60 w-60 shrink-0 aspect-video rounded-md flex items-center justify-center max-md:max-w-full max-md:w-full"
      :style="gradientStyle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-12 h-12 text-white/90"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
        <span class="font-medium">{{ article.publicationName }}</span>
        <span class="text-border">|</span>
        <span>{{ formatDate(article.publishedAt) }}</span>
        <a
          :href="article.url"
          target="_blank"
          rel="noopener"
          class="ml-auto hover:text-foreground hover:underline"
        >
          Read original
        </a>
      </div>
      <h3 class="text-lg font-semibold mb-2">
        <NuxtLink :to="article.path" class="hover:text-primary hover:underline">
          {{ article.title }}
        </NuxtLink>
      </h3>
      <p v-if="article.subtitle" class="text-sm text-muted-foreground">
        {{ article.subtitle }}
      </p>
      <p class="text-xs text-muted-foreground/60 mt-2">
        By {{ article.author }}
      </p>
    </div>
  </article>
</template>

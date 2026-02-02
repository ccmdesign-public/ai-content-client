<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'

defineProps<{
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
</script>

<template>
  <article class="flex border-t border-border gap-4 py-4">
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

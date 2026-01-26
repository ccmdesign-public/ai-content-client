<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { marked } from 'marked'

const renderer = {
  paragraph({ tokens }: { tokens: any[] }) {
    return (this as any).parser.parseInline(tokens)
  }
}

marked.use({ renderer })

interface SummaryMetadata {
  videoId: string
  title: string
  channel: string
  publishedAt: string
  thumbnailUrl: string
  youtubeUrl: string
}

defineProps<{
  summary: {
    metadata: SummaryMetadata
    processedAt: string
    tldr?: string
  }
}>()
</script>

<template>
  <article class="flex border-t border-border gap-4 py-4 max-md:flex-col">
    <img
      v-if="summary.metadata.thumbnailUrl"
      :src="summary.metadata.thumbnailUrl"
      :alt="`Thumbnail for ${summary.metadata.title}`"
      class="max-w-60 shrink-0 aspect-video object-cover rounded-md max-md:max-w-full"
      loading="lazy"
    />
    <div class="flex-1 min-w-0">
      <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
        <a :href="`/channels/${summary.metadata.channel}`" class="font-medium hover:text-foreground">{{ summary.metadata.channel }}</a>
        <span class="text-border">|</span>
        <span>{{ formatDate(summary.metadata.publishedAt) }}</span>
        <a
          :href="summary.metadata.youtubeUrl"
          target="_blank"
          rel="noopener"
          class="ml-auto hover:text-foreground hover:underline"
        >
          Watch on YouTube
        </a>
      </div>
      <h3 class="text-lg font-semibold mb-2">
        <NuxtLink :to="`/summaries/${summary.metadata.videoId}`" class="hover:text-primary hover:underline">
          {{ summary.metadata.title }}
        </NuxtLink>
      </h3>
      <div
        v-if="summary.tldr"
        class="text-sm text-muted-foreground prose prose-sm prose-zinc dark:prose-invert max-w-none [&_ul]:list-disc [&_ul]:ml-4"
        v-html="marked.parse(summary.tldr)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { SummaryItem } from '~/types/content'
import { formatDate } from '~/utils/formatDate'
import { useSanitizedHtml } from '~/composables/useSanitizedHtml'
import { marked, type Tokens } from 'marked'

// Override paragraph renderer to strip wrapping <p> tags from tldr
const renderer = new marked.Renderer()
renderer.paragraph = function ({ tokens }: Tokens.Paragraph): string {
  return this.parser.parseInline(tokens)
}

marked.use({ renderer })

const { sanitizeMarkdown } = useSanitizedHtml()

defineProps<{
  summary: SummaryItem
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
        <a
          :href="`/channels/${summary.metadata.channel}`"
          class="font-medium hover:text-foreground motion-safe:transition-colors motion-safe:duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded"
        >
          {{ summary.metadata.channel }}
        </a>
        <span class="text-border">|</span>
        <span>{{ formatDate(summary.metadata.publishedAt) }}</span>
        <a
          :href="summary.metadata.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Watch ${summary.metadata.title} on YouTube (opens in new tab)`"
          class="ml-auto hover:text-foreground hover:underline motion-safe:transition-colors motion-safe:duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded"
        >
          Watch on YouTube
        </a>
      </div>
      <h3 class="text-lg font-semibold mb-2">
        <NuxtLink
          :to="`/summaries/${summary.metadata.videoId}`"
          class="hover:text-primary hover:underline motion-safe:transition-colors motion-safe:duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded"
        >
          {{ summary.metadata.title }}
        </NuxtLink>
      </h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div
        v-if="summary.tldr"
        role="document"
        aria-label="Summary"
        class="text-sm text-muted-foreground prose prose-sm prose-zinc dark:prose-invert max-w-none [&_ul]:list-disc [&_ul]:ml-4"
        v-html="sanitizeMarkdown(summary.tldr)"
      />
    </div>
  </article>
</template>

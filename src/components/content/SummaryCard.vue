<script setup lang="ts">
import type { SummaryItem } from '~/types/content'
import { formatDate } from '~/utils/formatDate'
import { useSanitizedHtml } from '~/composables/useSanitizedHtml'
import { marked, type Tokens } from 'marked'

// Override paragraph renderer to strip wrapping <p> tags from tldr.
// NOTE: this.parser is bound by marked internally when invoking renderer methods.
// This is the documented Renderer API pattern -- verify on marked upgrades.
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
  <article v-if="summary?.metadata" class="flex border-t border-border gap-4 py-4 md:flex-row flex-col">
    <img
      v-if="summary.metadata.thumbnailUrl"
      :src="summary.metadata.thumbnailUrl"
      :alt="`Thumbnail for ${summary.metadata.title}`"
      class="w-full md:w-60 shrink-0 aspect-video object-cover rounded-md"
      loading="lazy"
    />
    <div class="flex-1 min-w-0">
      <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-2">
        <NuxtLink
          :to="`/channels/${summary.metadata.channel}`"
          :prefetch-on="{ interaction: true, visibility: false }"
          class="font-medium hover:text-foreground motion-safe:transition-colors motion-safe:duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded"
        >
          {{ summary.metadata.channel }}
        </NuxtLink>
        <span class="text-border">|</span>
        <span>{{ formatDate(summary.metadata.publishedAt) }}</span>
        <a
          :href="summary.metadata.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Watch ${summary.metadata.title} on YouTube (opens in new tab)`"
          class="md:ml-auto hover:text-foreground hover:underline motion-safe:transition-colors motion-safe:duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded"
        >
          Watch on YouTube
        </a>
      </div>
      <h3 class="text-base md:text-lg font-semibold mb-2">
        <NuxtLink
          :to="`/summaries/${summary.metadata.videoId}`"
          :prefetch="false"
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
        class="text-sm text-muted-foreground prose prose-sm prose-zinc dark:prose-invert max-w-none [&_ul]:list-disc [&_ul]:ml-4 line-clamp-4 md:line-clamp-none"
        v-html="sanitizeMarkdown(summary.tldr)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { marked } from 'marked'

// Configure marked for compact rendering (no <p> wrappers on single paragraphs)
const renderer = {
  paragraph({ tokens }: { tokens: any[] }) {
    // Parse inline tokens to HTML, then return without <p> wrapper
    return (this as any).parser.parseInline(tokens)
  }
}

marked.use({ renderer })

// Summary with nested metadata structure
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
  <article class="summary-card">
    <img
      v-if="summary.metadata.thumbnailUrl"
      :src="summary.metadata.thumbnailUrl"
      :alt="`Thumbnail for ${summary.metadata.title}`"
      class="summary-card__thumb"
      loading="lazy"
    />
    <div class="summary-card__content">
      <div class="summary-card__meta | cluster">
        <a :href="`/channels/${summary.metadata.channel}`" class="summary-card__channel">{{ summary.metadata.channel }}</a>
        <span class="summary-card__separator">|</span>
        <span class="summary-card__date">{{ formatDate(summary.metadata.publishedAt) }}</span>
        <a
          :href="summary.metadata.youtubeUrl"
          target="_blank"
          rel="noopener"
          class="summary-card__youtube"
        >
          Watch on YouTube
        </a>
      </div>
      <h3 class="summary-card__title">
        <NuxtLink :to="`/summaries/${summary.metadata.videoId}`">
          {{ summary.metadata.title }}
        </NuxtLink>
      </h3>
      <div
        v-if="summary.tldr"
        class="summary-card__tldr"
        v-html="marked.parse(summary.tldr)"
      />
    </div>
  </article>
</template>

<style scoped>
.summary-card {
  display: flex;
  background: var(--background);
  border-top: 1px solid var(--border);
  align-items: flex-start;
  gap: 1.3125rem;
}

@media (max-width: 600px) {
  .summary-card {
    flex-direction: column;
  }
}

.summary-card__thumb {
  margin-top: 1.3125rem;
  max-width: 240px;
  flex-shrink: 0;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: var(--radius-s);
}

.summary-card__content {
  flex: 1;
  min-width: 0;
  padding-block: 1.3125rem;

  p, li {
    font-size: 0.875rem !important;
  }
  
}

.summary-card__meta {
}

.summary-card__channel {
  font-weight: 500 !important;
}

.summary-card__separator {
  color: var(--border);
}

.summary-card__youtube {
  margin-left: auto;
}

.summary-card__title {
}

.summary-card__title a {
}

.summary-card__title a:hover {
}

.summary-card__tldr {
}

.summary-card__tldr :deep(ul) {
  list-style-type: disc;
}

.summary-card__tldr :deep(li) {
}

.summary-card__tldr :deep(strong) {
  font-weight: 600;
}
</style>

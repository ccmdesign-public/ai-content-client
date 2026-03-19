<template>
  <ccm-section>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="!summary">Not found</div>
    <div v-else>
      <div class="center">
        <nuxt-link to="/">Back to summaries</nuxt-link>
        <h1>{{ summary.metadata.title }}</h1>
        <p class="video-link">
          <a :href="summary.metadata.youtubeUrl" target="_blank" rel="noopener">Watch on YouTube</a>
        </p>

        <!-- Tools Section at Beginning -->
        <section v-if="categorizedTools.length" class="tools-section tools-section--top">
          <h2>Tools Mentioned</h2>
          <div v-for="group in categorizedTools" :key="group.category" class="tools-category">
            <h3 class="tools-category__heading">{{ group.category }}</h3>
            <div class="tools-category__chips">
              <ccm-chip
                v-for="tool in group.tools"
                :key="tool.name"
                :label="tool.name"
                :to="tool.url || undefined"
                variant="outlined"
                color="neutral"
                size="s"
              />
            </div>
          </div>
        </section>

        <!-- Video Description Section -->
        <details v-if="summary.metadata.description" class="video-description">
          <summary class="video-description__toggle">Video Description</summary>
          <div class="video-description__content">{{ summary.metadata.description }}</div>
        </details>

        <ContentRenderer :value="summary" class="prose-layout | prose" />
      </div>
    </div>
  </ccm-section>
</template>

<script setup lang="ts">
import { categorizeTools } from '~/utils/categorizeTools'

definePageMeta({
  hero: false,
  footer: false
})

const route = useRoute()
const slug = route.params.slug as string

const { data: summary, pending, error } = useAsyncData(
  `summary-${slug}`,
  async () => {
    // Try new folder path format first: /summaries/{videoId}/summary
    let result = await queryCollection('summaries').path(`/summaries/${slug}/summary`).first()

    // Fallback to legacy path format: /summaries/{videoId}
    if (!result) {
      result = await queryCollection('summaries').path(`/summaries/${slug}`).first()
    }

    // Final fallback to videoId filter (using nested metadata.videoId)
    if (!result) {
      const all = await queryCollection('summaries').all()
      result = all.find((item: any) => item.metadata?.videoId === slug) || null
    }
    return result
  }
)

// Computed categorized tools
const categorizedTools = computed(() => {
  if (!summary.value?.tools?.length) return []
  return categorizeTools(summary.value.tools)
})
</script>

<style scoped>
.center {
  --theme-center-measure: 80ch;
}

.video-description {
  margin-block: var(--space-m, 1rem);
  padding: var(--space-s, 0.75rem);
  background: var(--color-surface-alt, #f5f5f5);
  border-radius: var(--radius-s, 4px);
  border: 1px solid var(--color-border, #e0e0e0);
}

.video-description__toggle {
  cursor: pointer;
  font-weight: 600;
  color: var(--muted-foreground);
  user-select: none;
}

.video-description__toggle:hover {
  color: var(--foreground);
}

.video-description__content {
  margin-top: var(--space-s, 0.75rem);
  white-space: pre-wrap;
  font-size: var(--size--1, 0.875rem);
  line-height: 1.6;
  color: var(--muted-foreground);
}

.video-description[open] .video-description__toggle {
  margin-bottom: var(--space-xs, 0.5rem);
}

.tools-section {
  margin-block: var(--space-l, 2rem);
  padding: var(--space-m, 1rem);
  background: var(--color-surface-alt, #f5f5f5);
  border-radius: var(--radius-s, 4px);
  border: 1px solid var(--color-border, #e0e0e0);
}

.tools-section h2 {
  margin-block-start: 0;
  margin-block-end: var(--space-m, 1rem);
  font-size: var(--size-1, 1.125rem);
}

.tools-category {
  margin-block-end: var(--space-s, 0.75rem);
}

.tools-category:last-child {
  margin-block-end: 0;
}

.tools-category__heading {
  margin-block: 0 var(--space-2xs, 0.25rem);
  font-size: var(--size--1, 0.875rem);
  font-weight: 600;
  color: var(--muted-foreground);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tools-category__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs, 0.5rem);
}
</style>

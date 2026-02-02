<script setup lang="ts">
import { useDateGroups } from '~/composables/useDateGroups'
import { useArticleStream } from '~/composables/useArticleStream'

definePageMeta({
  hero: false,
  footer: false
})

const { data: summaries, pending: summariesPending } = useContentStream('summaries')
const { articles, pending: articlesPending } = useArticleStream()

const pending = computed(() => summariesPending.value || articlesPending.value)

// Combine and normalize items with a unified date field
interface FeedItem {
  _type: 'summary' | 'article'
  _date: string
  [key: string]: unknown
}

const allItems = computed<FeedItem[]>(() => {
  const items: FeedItem[] = []

  // Add summaries with normalized date
  for (const summary of summaries.value || []) {
    items.push({
      ...summary,
      _type: 'summary',
      _date: summary.processedAt
    })
  }

  // Add articles with normalized date
  for (const article of articles.value || []) {
    items.push({
      ...article,
      _type: 'article',
      _date: article.publishedAt
    })
  }

  return items
})

const { segments } = useDateGroups(allItems, (item) => item._date)

const totalCount = computed(() => (summaries.value?.length || 0) + (articles.value?.length || 0))
</script>

<template>
  <div class="home-page">
    <header class="page-header">
      <h1>Latest Content</h1>
      <p class="page-header__count">{{ totalCount }} items</p>
    </header>

    <div v-if="pending" class="loading">Loading...</div>

    <DateGroupedFeed v-else :segments="segments" />
  </div>
</template>

<style scoped>
.home-page {
  padding: var(--space-l, 2rem);
}

.page-header {
  margin-bottom: var(--space-l, 2rem);
}

.page-header h1 {
  margin: 0;
  font-size: var(--step-2, 1.5rem);
}

.page-header__count {
  margin: var(--space-2xs, 0.25rem) 0 0;
  color: var(--color-base-shade-10, #6b7280);
  font-size: var(--step--1, 0.875rem);
}

.loading {
  text-align: center;
  padding: var(--space-2xl, 3rem);
  color: var(--color-base-shade-10, #6b7280);
}
</style>

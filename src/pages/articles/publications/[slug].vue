<script setup lang="ts">
import { useArticleStream } from '~/composables/useArticleStream'
import { usePublications } from '~/composables/usePublications'
import { useDateGroups } from '~/composables/useDateGroups'
import { useSlugify } from '~/composables/useSlugify'

definePageMeta({
  hero: false,
  footer: false
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { slugify } = useSlugify()
const { articles: allArticles, pending } = useArticleStream()
const { findBySlug } = usePublications(allArticles)

const publication = computed(() => findBySlug(slug.value))

// Filter articles by publication slug
const articles = computed(() => {
  return allArticles.value.filter(article => {
    return slugify(article.publicationName) === slug.value
  })
})

const feedItems = computed(() => {
  return articles.value.map(article => ({
    ...article,
    _type: 'article' as const,
    _date: article.publishedAt
  }))
})

const { segments } = useDateGroups(feedItems, (item) => item._date)
</script>

<template>
  <div class="publication-page">
    <header class="page-header">
      <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-foreground">Back to feed</NuxtLink>
      <h1>{{ publication?.name || slug }}</h1>
      <p class="page-header__count">{{ articles.length }} articles</p>
    </header>

    <div v-if="pending" class="loading">Loading...</div>

    <DateGroupedFeed v-else :segments="segments" />
  </div>
</template>

<style scoped>
.publication-page {
  padding: var(--space-l, 2rem);
}

.page-header {
  margin-bottom: var(--space-l, 2rem);
}

.page-header h1 {
  margin: var(--space-s, 0.5rem) 0 0;
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
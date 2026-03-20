<script setup lang="ts">
import { useArticleStream } from '~/composables/useArticleStream'
import { usePublications } from '~/composables/usePublications'
import { useDateGroups } from '~/composables/useDateGroups'
import { useSlugify } from '~/composables/useSlugify'

definePageMeta({
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
  <div class="p-8">
    <header class="mb-8">
      <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-foreground">Back to feed</NuxtLink>
      <h1 class="mt-2 text-2xl">{{ publication?.name || slug }}</h1>
      <p class="mt-1 text-muted-foreground text-sm">{{ articles.length }} articles</p>
    </header>

    <div v-if="pending" class="text-center py-12 text-muted-foreground">Loading...</div>

    <DateGroupedFeed v-else :segments="segments" />
  </div>
</template>

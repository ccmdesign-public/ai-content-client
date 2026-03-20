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
const { articles: allArticles, pending, error, refresh } = useArticleStream()
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

    <div v-if="pending" aria-busy="true" aria-label="Loading articles">
      <div v-for="n in 3" :key="n" class="flex border-t border-border gap-4 py-4 max-md:flex-col">
        <Skeleton class="max-w-60 w-60 shrink-0 aspect-video rounded-md max-md:max-w-full max-md:w-full" />
        <div class="flex-1 min-w-0 space-y-2">
          <Skeleton class="h-4 w-1/4" />
          <Skeleton class="h-5 w-2/3" />
          <Skeleton class="h-4 w-1/2" />
          <Skeleton class="h-3 w-1/5 mt-2" />
        </div>
      </div>
    </div>

    <PageErrorState v-else-if="error" message="Failed to load articles." @retry="refresh()" />

    <PageEmptyState
      v-else-if="articles.length === 0"
      icon="inbox"
      message="No articles from this publication yet."
      hint="Check back soon for new content."
      link-to="/"
      link-text="Back to feed"
    />

    <DateGroupedFeed v-else :segments="segments" />
  </div>
</template>

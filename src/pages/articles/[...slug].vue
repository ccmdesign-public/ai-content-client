<template>
  <section class="py-8">
    <div v-if="pending" class="text-center text-muted-foreground">Loading...</div>
    <div v-else-if="error" class="text-center text-destructive">Error: {{ error }}</div>
    <div v-else-if="!article" class="text-center text-muted-foreground">Not found</div>
    <div v-else>
      <div class="center">
        <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-foreground">Back to feed</NuxtLink>

        <header class="mt-4 mb-6">
          <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
            <span class="font-medium">{{ article.publicationName }}</span>
            <span class="text-border">|</span>
            <span>{{ formatDate(article.publishedAt) }}</span>
          </div>
          <h1 class="text-2xl font-bold mb-2">{{ article.title }}</h1>
          <p v-if="article.subtitle" class="text-lg text-muted-foreground mb-2">{{ article.subtitle }}</p>
          <p class="text-sm text-muted-foreground">By {{ article.author }}</p>
          <p class="mt-4">
            <a :href="article.url" target="_blank" rel="noopener" class="text-primary hover:underline">
              Read original on {{ article.platform }}
            </a>
          </p>
        </header>

        <!-- Tags Section -->
        <section v-if="article.tags?.length" class="my-6 flex flex-wrap gap-2">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground"
          >
            {{ tag }}
          </span>
        </section>

        <ContentRenderer :value="article" class="prose prose-zinc dark:prose-invert max-w-none" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'

definePageMeta({
  footer: false
})

const route = useRoute()
const slugParts = route.params.slug as string[]
const fullPath = `/articles/${slugParts.join('/')}`

const { data: article, pending, error } = useAsyncData(
  `article-${fullPath}`,
  async () => {
    // Query by exact path
    const result = await queryCollection('articles').path(fullPath).first()
    return result
  }
)
</script>

<style scoped>
.center {
  max-width: 80ch;
  margin-inline: auto;
  padding-inline: 1rem;
}
</style>

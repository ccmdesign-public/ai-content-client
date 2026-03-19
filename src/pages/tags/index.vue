<script setup lang="ts">
import { useTagsConfig } from '~/composables/useTagsConfig'

definePageMeta({
  hero: false,
  footer: false
})

const { tags, tagsByCategory } = useTagsConfig()

useHead({
  title: 'Browse by Topic | YouTube Summaries',
  meta: [
    { name: 'description', content: 'Browse AI-generated video summaries by topic. Explore categories like AI & Machine Learning, Web Development, Programming, and more.' }
  ]
})
</script>

<template>
  <div class="tags-page">
    <header class="page-header">
      <h1>Browse by Topic</h1>
      <p class="page-header__count">{{ tags.length }} topics</p>
    </header>

    <PageEmptyState
      v-if="tagsByCategory.length === 0"
      icon="label_off"
      message="No topics available yet."
      link-to="/"
      link-text="Browse all summaries"
    />

    <div v-else class="tags-grid">
      <section
        v-for="category in tagsByCategory"
        :key="category.categoryId"
        class="tag-category"
      >
        <h2 class="tag-category__heading">
          {{ category.name }}
          <span class="tag-category__count">{{ category.totalItems }} videos</span>
        </h2>
        <ul class="tag-category__list">
          <li v-for="tag in category.tags" :key="tag.slug">
            <NuxtLink
              :to="`/tags/${tag.slug}`"
              class="inline-flex items-center gap-1 px-3 py-1 bg-muted border border-border rounded-full text-sm text-foreground no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 whitespace-nowrap cursor-pointer"
            >
              <span class="font-medium">{{ tag.name }}</span>
              <span class="text-xs text-muted-foreground">{{ tag.itemCount }}</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.tags-page {
  padding: 1.75rem;
}

.page-header {
  margin-bottom: 2.625rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.25rem;
}

.page-header__count {
  margin: 0.375rem 0 0;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.tags-grid {
  display: flex;
  flex-direction: column;
  gap: 2.625rem;
}

.tag-category__heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--foreground);
  margin: 0 0 0.875rem 0;
  padding-bottom: 0.6875rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: baseline;
  gap: 0.875rem;
}

.tag-category__count {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--muted-foreground);
}

.tag-category__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6875rem;
}

/* Tag chip styles now use Tailwind utilities inline */
</style>

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
              class="tag-chip"
            >
              <span class="tag-chip__name">{{ tag.name }}</span>
              <span class="tag-chip__count">{{ tag.itemCount }}</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.tags-page {
  padding: var(--space-l, 2rem);
}

.page-header {
  margin-bottom: var(--space-xl, 2.5rem);
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

.tags-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl, 2rem);
}

.tag-category__heading {
  font-size: var(--step-1, 1.125rem);
  font-weight: 600;
  color: var(--color-text, #374151);
  margin: 0 0 var(--space-s, 0.75rem) 0;
  padding-bottom: var(--space-xs, 0.5rem);
  border-bottom: 1px solid var(--color-base-tint-10, #e5e7eb);
  display: flex;
  align-items: baseline;
  gap: var(--space-s, 0.75rem);
}

.tag-category__count {
  font-size: var(--step--1, 0.875rem);
  font-weight: 400;
  color: var(--color-base-shade-10, #6b7280);
}

.tag-category__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs, 0.5rem);
}

/* .tag-chip base styles are in src/public/css/components/tag-chip.css */
</style>

<script setup lang="ts">
import { useTagsConfig } from '~/composables/useTagsConfig'

definePageMeta({
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
  <div class="p-7">
    <header class="mb-10">
      <h1 class="m-0 text-xl">Browse by Topic</h1>
      <p class="mt-1.5 text-muted-foreground text-sm">{{ tags.length }} topics</p>
    </header>

    <PageEmptyState
      v-if="tagsByCategory.length === 0"
      icon="label_off"
      message="No topics available yet."
      link-to="/summaries/"
      link-text="Browse all summaries"
    />

    <div v-else class="flex flex-col gap-10">
      <section
        v-for="category in tagsByCategory"
        :key="category.categoryId"
        class="tag-category"
      >
        <h2 class="text-lg font-semibold m-0 mb-3.5 pb-3 border-b border-border flex items-baseline gap-3.5">
          {{ category.name }}
          <span class="text-sm font-normal text-muted-foreground">{{ category.totalItems }} videos</span>
        </h2>
        <ul class="list-none p-0 m-0 flex flex-wrap gap-3">
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

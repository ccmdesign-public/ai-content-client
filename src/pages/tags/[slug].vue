<script setup lang="ts">
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useTagIndex } from '~/composables/useTagIndex'
import { useDateGroups } from '~/composables/useDateGroups'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

definePageMeta({
  hero: false,
  footer: false
})

// Get tag config for display name and 404 check
const { getTagBySlug } = useTagsConfig()
const tagConfig = computed(() => getTagBySlug(slug.value))

// Load tag data and cross-referenced summaries
const { summaries, pending } = useTagIndex(slug)

// Group by date
const { segments } = useDateGroups(computed(() => summaries.value || []))

// Check if empty (tag exists but no matching summaries in client)
const isEmpty = computed(() => !pending.value && summaries.value.length === 0)

// Display name for the page
const displayName = computed(() => tagConfig.value?.name || slug.value)
const categoryName = computed(() => tagConfig.value?.category || '')

useHead({
  title: computed(() => `${displayName.value} | YouTube Summaries`),
  meta: [
    { name: 'description', content: computed(() => `Browse ${summaries.value.length} AI-generated video summaries tagged with ${displayName.value} in ${categoryName.value}.`) }
  ]
})
</script>

<template>
  <div class="tag-page">
    <div v-if="pending" class="loading">Loading...</div>

    <div v-else-if="!tagConfig" class="not-found">
      <span class="material-symbols-outlined not-found__icon">search_off</span>
      <h1 class="not-found__title">Topic not found</h1>
      <p class="not-found__message">We don't have any summaries for this topic.</p>
      <NuxtLink to="/tags" class="not-found__link">Browse all topics</NuxtLink>
    </div>

    <template v-else>
      <header class="page-header">
        <NuxtLink to="/tags" class="page-header__breadcrumb">Topics</NuxtLink>
        <span class="page-header__separator">/</span>
        <span class="page-header__category">{{ categoryName }}</span>
        <h1>{{ displayName }}</h1>
        <p class="page-header__count">{{ summaries.length }} videos</p>
      </header>

      <div v-if="isEmpty" class="empty-state">
        <span class="material-symbols-outlined empty-state__icon">label_off</span>
        <p class="empty-state__message">No summaries for this topic yet.</p>
        <p class="empty-state__hint">Tag data exists but matching summaries haven't been synced to the client.</p>
        <NuxtLink to="/tags" class="empty-state__link">Browse all topics</NuxtLink>
      </div>

      <DateGroupedFeed v-else :segments="segments" />
    </template>
  </div>
</template>

<style scoped>
.tag-page {
  padding: var(--space-l, 2rem);
}

.page-header {
  margin-bottom: var(--space-l, 2rem);
}

.page-header__breadcrumb {
  font-size: var(--step--1, 0.875rem);
  color: var(--color-primary, #2563eb);
  text-decoration: none;
}

.page-header__breadcrumb:hover {
  text-decoration: underline;
}

.page-header__separator {
  font-size: var(--step--1, 0.875rem);
  color: var(--color-base-shade-10, #6b7280);
  margin: 0 var(--space-2xs, 0.25rem);
}

.page-header__category {
  font-size: var(--step--1, 0.875rem);
  color: var(--color-base-shade-10, #6b7280);
}

.page-header h1 {
  margin: var(--space-xs, 0.5rem) 0 0;
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

.empty-state {
  text-align: center;
  padding: var(--space-2xl, 3rem) var(--space-l, 1.5rem);
}

.empty-state__icon {
  font-size: 3rem;
  color: var(--color-base-shade-10, #6b7280);
  margin-bottom: var(--space-m, 1rem);
}

.empty-state__message {
  font-size: var(--step-1, 1.125rem);
  font-weight: 500;
  color: var(--color-text, #374151);
  margin-bottom: var(--space-xs, 0.5rem);
}

.empty-state__hint {
  font-size: var(--step-0, 1rem);
  color: var(--color-base-shade-10, #6b7280);
  margin-bottom: var(--space-l, 1.5rem);
}

.empty-state__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs, 0.25rem);
  padding: var(--space-s, 0.75rem) var(--space-m, 1rem);
  background: var(--color-primary, #2563eb);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.empty-state__link:hover {
  background: var(--color-primary-shade-10, #1d4ed8);
}

.not-found {
  text-align: center;
  padding: var(--space-2xl, 3rem) var(--space-l, 1.5rem);
}

.not-found__icon {
  font-size: 4rem;
  color: var(--color-base-shade-10, #6b7280);
  margin-bottom: var(--space-m, 1rem);
}

.not-found__title {
  font-size: var(--step-2, 1.5rem);
  font-weight: 600;
  color: var(--color-text, #374151);
  margin-bottom: var(--space-xs, 0.5rem);
}

.not-found__message {
  font-size: var(--step-0, 1rem);
  color: var(--color-base-shade-10, #6b7280);
  margin-bottom: var(--space-l, 1.5rem);
}

.not-found__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs, 0.25rem);
  padding: var(--space-s, 0.75rem) var(--space-m, 1rem);
  background: var(--color-primary, #2563eb);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.not-found__link:hover {
  background: var(--color-primary-shade-10, #1d4ed8);
}
</style>

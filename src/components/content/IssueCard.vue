<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'

const props = defineProps<{
  issue: {
    stem: string
    path: string
    subjectLine: string
    publishedAt: string
    featuredPicks: Array<{ title: string }>
    quickLinks: Array<{ title: string }>
  }
}>()

// stem is "newsletters/2026-03-19", we need just "2026-03-19"
const issueSlug = computed(() => props.issue.stem.replace(/^newsletters\//, ''))
</script>

<template>
  <article class="issue-card">
    <NuxtLink :to="`/issues/${issueSlug}`" class="issue-card__link">
      <div class="issue-card__content">
        <h3 class="issue-card__title">{{ issue.subjectLine }}</h3>
        <div class="issue-card__meta">
          <time class="issue-card__date" :datetime="issue.publishedAt">
            {{ formatDate(issue.publishedAt, 'MMMM d, yyyy') }}
          </time>
          <span class="issue-card__counts">
            <span v-if="issue.featuredPicks?.length" class="issue-card__count">
              {{ issue.featuredPicks.length }} featured
            </span>
            <span v-if="issue.quickLinks?.length" class="issue-card__count">
              {{ issue.quickLinks.length }} quick links
            </span>
          </span>
        </div>
      </div>
      <span class="material-symbols-outlined issue-card__arrow" aria-hidden="true">arrow_forward</span>
    </NuxtLink>
  </article>
</template>

<style scoped>
.issue-card {
  border-top: 1px solid var(--border);
}

.issue-card:last-child {
  border-bottom: 1px solid var(--border);
}

.issue-card__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s ease;
}

.issue-card__link:hover {
  background: var(--muted);
}

.issue-card__content {
  flex: 1;
  min-width: 0;
}

.issue-card__title {
  margin: 0 0 0.375rem;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--foreground);
}

.issue-card__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.issue-card__date {
  font-size: 0.8125rem;
  color: var(--muted-foreground);
}

.issue-card__counts {
  display: flex;
  gap: 0.5rem;
}

.issue-card__count {
  font-size: 0.75rem;
  color: var(--muted-foreground);
  background: var(--muted);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.issue-card__arrow {
  color: var(--muted-foreground);
  font-size: 1.25rem;
  flex-shrink: 0;
  transition: transform 0.15s ease;
}

.issue-card__link:hover .issue-card__arrow {
  transform: translateX(2px);
  color: var(--primary);
}
</style>

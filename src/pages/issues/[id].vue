<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'

definePageMeta({
  hero: false,
  footer: true,
  sidebar: false
})

const route = useRoute()
const issueId = route.params.id as string

const { data: issue, error } = await useAsyncData(
  `newsletter-${issueId}`,
  async () => {
    // Try path-based lookup first (path is /newsletters/YYYY-MM-DD)
    let result = await queryCollection('newsletters').path(`/newsletters/${issueId}`).first()
    if (!result) {
      // Fallback: query by publishedAt date (avoids fetching all newsletters)
      result = await queryCollection('newsletters').where('publishedAt', '=', issueId).first()
    }
    return result
  }
)

// SEO meta tags
useHead(() => {
  if (!issue.value) return {}

  const description = issue.value.editorialIntro?.substring(0, 155) || ''

  return {
    title: `${issue.value.subjectLine} - AI Content Digest`,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: issue.value.subjectLine },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'article:published_time', content: issue.value.publishedAt },
      { property: 'article:section', content: 'newsletter' },
    ],
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: issue.value.subjectLine,
        datePublished: issue.value.publishedAt,
        description,
        author: {
          '@type': 'Organization',
          name: 'AI Content Digest'
        },
        publisher: {
          '@type': 'Organization',
          name: 'AI Content Digest'
        }
      })
    }]
  }
})
</script>

<template>
  <div class="issue-page">
    <PageNotFound
      v-if="error || !issue"
      icon="article"
      title="Issue not found"
      message="This newsletter issue doesn't exist or may have been removed."
      link-to="/"
      link-text="Back to newsletter"
    />

    <template v-else>
      <header class="issue-header">
        <NuxtLink to="/" class="issue-header__back">
          <span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          Back to newsletter
        </NuxtLink>
        <time class="issue-header__date" :datetime="issue.publishedAt">
          {{ formatDate(issue.publishedAt, 'MMMM d, yyyy') }}
        </time>
        <h1 class="issue-header__title">{{ issue.subjectLine }}</h1>
      </header>

      <!-- Editorial Intro -->
      <section class="issue-section">
        <ContentRenderer :value="issue" class="prose" />
      </section>

      <!-- Featured Picks -->
      <section v-if="issue.featuredPicks?.length" class="issue-section featured-picks">
        <h2 class="issue-section__heading">Featured Picks</h2>
        <article v-for="(pick, idx) in issue.featuredPicks" :key="idx" class="pick">
          <h3 class="pick__title">
            <a :href="pick.url" target="_blank" rel="noopener noreferrer">
              {{ pick.title }}
              <span class="sr-only">(opens in new tab)</span>
            </a>
          </h3>
          <p class="pick__source">{{ pick.source }}</p>
          <p class="pick__summary">{{ pick.summary }}</p>
          <blockquote class="pick__commentary">{{ pick.commentary }}</blockquote>
        </article>
      </section>

      <!-- Quick Links -->
      <section v-if="issue.quickLinks?.length" class="issue-section quick-links">
        <h2 class="issue-section__heading">Quick Links</h2>
        <ul class="quick-links__list">
          <li v-for="(link, idx) in issue.quickLinks" :key="idx" class="quick-link">
            <a :href="link.url" target="_blank" rel="noopener noreferrer" class="quick-link__title">
              {{ link.title }}
              <span class="sr-only">(opens in new tab)</span>
            </a>
            <span class="quick-link__source">{{ link.source }}</span>
            <p class="quick-link__oneliner">{{ link.oneLiner }}</p>
          </li>
        </ul>
      </section>

      <!-- Closing -->
      <section v-if="issue.closing" class="issue-section issue-closing">
        <p>{{ issue.closing }}</p>
      </section>

      <!-- Signup CTA at bottom -->
      <section class="issue-section issue-cta">
        <p class="issue-cta__text">Enjoyed this issue? Get the next one in your inbox.</p>
        <ClientOnly>
          <NewsletterSignupForm />
        </ClientOnly>
      </section>
    </template>
  </div>
</template>

<style scoped>
.issue-page {
  max-width: 70ch;
  margin: 0 auto;
  padding: 2rem 1.75rem 4rem;
}

.issue-header {
  margin-bottom: 2rem;
}

.issue-header__back {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: color 0.15s ease;
}

.issue-header__back:hover {
  color: var(--primary);
}

.issue-header__back .material-symbols-outlined {
  font-size: 1.125rem;
}

.issue-header__date {
  display: block;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  margin-bottom: 0.5rem;
}

.issue-header__title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--foreground);
}

.issue-section {
  margin-bottom: 2.5rem;
}

.issue-section__heading {
  margin: 0 0 1.25rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

/* Featured Picks */
.pick {
  margin-bottom: 1.75rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--border);
}

.pick:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.pick__title {
  margin: 0 0 0.25rem;
  font-size: 1.0625rem;
  font-weight: 600;
}

.pick__title a {
  color: var(--primary);
  text-decoration: none;
}

.pick__title a:hover {
  text-decoration: underline;
}

.pick__source {
  margin: 0 0 0.5rem;
  font-size: 0.8125rem;
  color: var(--muted-foreground);
  font-weight: 500;
}

.pick__summary {
  margin: 0 0 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--foreground);
}

.pick__commentary {
  margin: 0;
  padding: 0.75rem 1rem;
  border-left: 3px solid var(--primary);
  background: var(--muted);
  border-radius: 0 var(--radius-sm, 0.375rem) var(--radius-sm, 0.375rem) 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--muted-foreground);
  font-style: italic;
}

/* Quick Links */
.quick-links__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quick-link {
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--border);
}

.quick-link:last-child {
  border-bottom: none;
}

.quick-link__title {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--primary);
  text-decoration: none;
}

.quick-link__title:hover {
  text-decoration: underline;
}

.quick-link__source {
  font-size: 0.75rem;
  color: var(--muted-foreground);
  margin-left: 0.5rem;
}

.quick-link__oneliner {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  line-height: 1.5;
}

/* Closing */
.issue-closing p {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--muted-foreground);
  font-style: italic;
}

/* CTA */
.issue-cta {
  padding: 2rem;
  background: var(--muted);
  border-radius: var(--radius-sm, 0.375rem);
  text-align: center;
}

.issue-cta__text {
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--foreground);
}

@media (max-width: 640px) {
  .issue-page {
    padding: 1.5rem 1rem 3rem;
  }

  .issue-header__title {
    font-size: 1.375rem;
  }
}
</style>

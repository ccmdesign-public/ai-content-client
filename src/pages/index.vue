<script setup lang="ts">
definePageMeta({
  hero: false,
  footer: true,
  sidebar: false
})

useHead({
  title: 'AI Content Digest - Curated AI News & Tools',
  meta: [
    { name: 'description', content: 'Curated AI news and tools, delivered 3x/week. Subscribe to the AI Content Digest newsletter and browse past issues.' },
    { property: 'og:title', content: 'AI Content Digest' },
    { property: 'og:description', content: 'Curated AI news and tools, delivered 3x/week.' },
    { property: 'og:type', content: 'website' },
  ]
})

const { data: issues } = await useAsyncData('newsletters', () =>
  queryCollection('newsletters')
    .select('subjectLine', 'publishedAt', 'path', 'stem', 'featuredPicks', 'quickLinks')
    .order('publishedAt', 'DESC')
    .all()
)
</script>

<template>
  <div class="newsletter-home">
    <!-- Hero Section -->
    <section class="newsletter-hero">
      <div class="newsletter-hero__inner">
        <h1 class="newsletter-hero__title">AI Content Digest</h1>
        <p class="newsletter-hero__tagline">
          Curated AI news and tools, delivered 3x/week.
        </p>
        <ClientOnly>
          <NewsletterSignupForm class="newsletter-hero__form" />
        </ClientOnly>
      </div>
    </section>

    <!-- Issue Archive -->
    <section class="newsletter-archive">
      <h2 class="newsletter-archive__heading">Past Issues</h2>
      <div class="newsletter-archive__list">
        <IssueCard
          v-for="issue in issues"
          :key="issue.path"
          :issue="issue"
        />
      </div>
      <p v-if="!issues?.length" class="newsletter-archive__empty">
        First issue coming soon!
      </p>
    </section>
  </div>
</template>

<style scoped>
.newsletter-home {
  padding-bottom: 3rem;
}

.newsletter-hero {
  padding: 3.5rem 1.75rem;
  text-align: center;
  border-bottom: 1px solid var(--border);
  background: var(--muted);
}

.newsletter-hero__inner {
  max-width: 36rem;
  margin: 0 auto;
}

.newsletter-hero__title {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--foreground);
}

.newsletter-hero__tagline {
  margin: 0 0 1.75rem;
  font-size: 1.125rem;
  color: var(--muted-foreground);
  line-height: 1.5;
}

.newsletter-hero__form {
  max-width: 28rem;
  margin: 0 auto;
}

.newsletter-archive {
  padding: 2rem 1.75rem;
  max-width: 48rem;
  margin: 0 auto;
}

.newsletter-archive__heading {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
}

.newsletter-archive__empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--muted-foreground);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .newsletter-hero {
    padding: 2.5rem 1rem;
  }

  .newsletter-hero__title {
    font-size: 1.5rem;
  }

  .newsletter-hero__tagline {
    font-size: 1rem;
  }

  .newsletter-archive {
    padding: 1.5rem 1rem;
  }
}
</style>

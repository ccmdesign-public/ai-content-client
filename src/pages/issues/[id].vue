<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { ArrowLeft } from 'lucide-vue-next'

definePageMeta({
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
  <div class="max-w-[70ch] mx-auto px-7 pt-8 pb-16 max-sm:px-4 max-sm:pt-6 max-sm:pb-12">
    <PageNotFound
      v-if="error || !issue"
      icon="article"
      title="Issue not found"
      message="This newsletter issue doesn't exist or may have been removed."
      link-to="/"
      link-text="Back to newsletter"
    />

    <template v-else>
      <header class="mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-1 text-sm text-muted-foreground no-underline mb-6 transition-colors hover:text-primary">
          <ArrowLeft class="size-[1.125rem]" aria-hidden="true" />
          Back to newsletter
        </NuxtLink>
        <time class="block text-sm text-muted-foreground mb-2" :datetime="issue.publishedAt">
          {{ formatDate(issue.publishedAt, 'MMMM d, yyyy') }}
        </time>
        <h1 class="m-0 text-[1.75rem] font-extrabold leading-tight tracking-tight text-foreground max-sm:text-[1.375rem]">{{ issue.subjectLine }}</h1>
      </header>

      <!-- Editorial Intro -->
      <section class="mb-10">
        <ContentRenderer :value="issue" class="prose" />
      </section>

      <!-- Featured Picks -->
      <section v-if="issue.featuredPicks?.length" class="mb-10">
        <h2 class="m-0 mb-5 text-xl font-bold text-foreground pb-2 border-b border-border">Featured Picks</h2>
        <article v-for="(pick, idx) in issue.featuredPicks" :key="idx" class="mb-7 pb-7 border-b border-border last:border-b-0 last:pb-0 last:mb-0">
          <h3 class="m-0 mb-1 text-[1.0625rem] font-semibold">
            <a :href="pick.url" target="_blank" rel="noopener noreferrer" class="text-primary no-underline hover:underline">
              {{ pick.title }}
              <span class="sr-only">(opens in new tab)</span>
            </a>
          </h3>
          <p class="m-0 mb-2 text-[0.8125rem] text-muted-foreground font-medium">{{ pick.source }}</p>
          <p class="m-0 mb-3 text-[0.9375rem] leading-relaxed text-foreground">{{ pick.summary }}</p>
          <blockquote class="m-0 py-3 px-4 border-l-[3px] border-primary bg-muted rounded-r-md text-[0.9375rem] leading-relaxed text-muted-foreground italic">{{ pick.commentary }}</blockquote>
        </article>
      </section>

      <!-- Quick Links -->
      <section v-if="issue.quickLinks?.length" class="mb-10">
        <h2 class="m-0 mb-5 text-xl font-bold text-foreground pb-2 border-b border-border">Quick Links</h2>
        <ul class="list-none p-0 m-0">
          <li v-for="(link, idx) in issue.quickLinks" :key="idx" class="py-3.5 border-b border-border last:border-b-0">
            <a :href="link.url" target="_blank" rel="noopener noreferrer" class="font-semibold text-[0.9375rem] text-primary no-underline hover:underline">
              {{ link.title }}
              <span class="sr-only">(opens in new tab)</span>
            </a>
            <span class="text-xs text-muted-foreground ml-2">{{ link.source }}</span>
            <p class="mt-1 mb-0 text-sm text-muted-foreground leading-normal">{{ link.oneLiner }}</p>
          </li>
        </ul>
      </section>

      <!-- Closing -->
      <section v-if="issue.closing" class="mb-10">
        <p class="text-[0.9375rem] leading-relaxed text-muted-foreground italic">{{ issue.closing }}</p>
      </section>

      <!-- Signup CTA at bottom -->
      <section class="p-8 bg-muted rounded-md text-center">
        <p class="m-0 mb-4 text-base font-medium text-foreground">Enjoyed this issue? Get the next one in your inbox.</p>
        <ClientOnly>
          <NewsletterSignupForm />
        </ClientOnly>
      </section>
    </template>
  </div>
</template>

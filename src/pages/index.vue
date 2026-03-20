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
  <div class="pb-12">
    <!-- Hero Section -->
    <section class="py-14 px-7 text-center border-b border-border bg-muted max-sm:py-10 max-sm:px-4">
      <div class="max-w-[36rem] mx-auto">
        <h1 class="m-0 mb-2 text-[2rem] font-extrabold tracking-tight text-foreground max-sm:text-2xl">AI Content Digest</h1>
        <p class="m-0 mb-7 text-lg text-muted-foreground leading-normal max-sm:text-base">
          Curated AI news and tools, delivered 3x/week.
        </p>
        <ClientOnly>
          <NewsletterSignupForm class="max-w-[28rem] mx-auto" />
        </ClientOnly>
      </div>
    </section>

    <!-- Issue Archive -->
    <section class="px-7 py-8 max-w-3xl mx-auto max-sm:px-4 max-sm:py-6">
      <h2 class="m-0 mb-4 text-xl font-bold text-foreground">Past Issues</h2>
      <div>
        <IssueCard
          v-for="issue in issues"
          :key="issue.path"
          :issue="issue"
        />
      </div>
      <p v-if="!issues?.length" class="text-center py-12 px-4 text-muted-foreground">
        First issue coming soon!
      </p>
    </section>
  </div>
</template>

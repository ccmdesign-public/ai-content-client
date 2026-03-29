<script setup lang="ts">
/**
 * Guide detail page -- placeholder for AIC-51 (agent-accessible guides).
 *
 * This page will be replaced/merged with AIC-50's full guide detail page.
 * For now it provides the markdown alternate link and TechArticle JSON-LD
 * so that the agent-accessible endpoints are discoverable from the HTML page.
 */
const config = useRuntimeConfig()
const route = useRoute()
const slug = route.params.slug as string
const siteUrl = config.public.siteUrl || 'http://localhost:3000'
const canonicalUrl = `${siteUrl}/guides/${slug}`

// Fetch tool data from the prerendered JSON endpoint
const { data: tools, status } = await useFetch<Array<{ slug: string; name: string; description: string | null; stats: { videoCount: number } }>>('/tools-with-stars.json')
const tool = computed(() => tools.value?.find(t => t.slug === slug))

const pageTitle = computed(() => tool.value?.name ? `${tool.value.name} Guide` : 'Guide')
const pageDescription = computed(() =>
  tool.value?.description || (tool.value ? `${tool.value.name} is mentioned in ${tool.value.stats.videoCount} videos.` : '')
)

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
})

useHead(() => ({
  link: [
    { rel: 'alternate', type: 'text/markdown', href: `/guides/${slug}.md` },
  ],
  script: tool.value
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            'headline': pageTitle.value,
            'description': pageDescription.value,
            'url': canonicalUrl,
            'publisher': {
              '@type': 'Organization',
              'name': 'AI Content Guides',
            },
            'encoding': {
              '@type': 'MediaObject',
              'contentUrl': `${siteUrl}/guides/${slug}.md`,
              'encodingFormat': 'text/markdown',
            },
          }),
        },
      ]
    : [],
}))
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <div v-if="status === 'pending'" class="space-y-6">
      <Skeleton class="h-8 w-48" />
      <Skeleton class="h-4 w-96" />
      <Skeleton class="h-4 w-64" />
    </div>
    <div v-else-if="status === 'error'" class="py-16 text-center">
      <h1 class="text-2xl font-bold">
        Something went wrong
      </h1>
      <p class="mt-2 text-muted-foreground">
        Could not load guide data. Please try again later.
      </p>
    </div>
    <div v-else-if="tool" class="space-y-6">
      <h1 class="text-3xl font-bold">
        {{ tool.name }}
      </h1>
      <p class="text-lg text-muted-foreground">
        {{ pageDescription }}
      </p>
      <p class="text-sm text-muted-foreground">
        This guide page is under construction. View the
        <NuxtLink :to="`/guides/${slug}.md`" class="underline">
          markdown version
        </NuxtLink>
        for agent-readable content.
      </p>
    </div>
    <div v-else class="py-16 text-center">
      <h1 class="text-2xl font-bold">
        Guide not found
      </h1>
      <p class="mt-2 text-muted-foreground">
        The guide "{{ slug }}" does not exist.
      </p>
      <NuxtLink to="/tools" class="mt-4 inline-block underline">
        Browse all tools
      </NuxtLink>
    </div>
  </div>
</template>

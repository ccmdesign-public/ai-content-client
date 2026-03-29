<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Star, Github, Link as LinkIcon, ArrowLeft } from 'lucide-vue-next'
import type { ToolWithStars } from '~/types/tools'

definePageMeta({ footer: false })

const config = useRuntimeConfig()
const route = useRoute()
const slug = route.params.slug as string
const siteUrl = config.public.siteUrl || 'http://localhost:3000'

// 1. Load guide content from collection
const { data: guide, pending: guidePending, error: guideError, refresh } = useAsyncData(
  `guide-${slug}`,
  () => queryCollection('guides').path(`/guides/${slug}/guide`).first()
)

// 2. Load tool metadata (stars, links, videos) from server route
const { data: allTools } = useFetch<ToolWithStars[]>('/tools-with-stars.json', {
  key: 'tools-directory'
})

// 3. Merge: find the matching tool by slug
const tool = computed(() => allTools.value?.find(t => t.slug === slug) || null)

// Combined loading state
const pending = computed(() => guidePending.value)
const error = computed(() => guideError.value)

// SEO -- useAsyncData resolves before SSR render, so guide.value is available
useSeoMeta({
  title: () => guide.value ? `${guide.value.title} Guide` : 'Guide',
  description: () => guide.value?.description || '',
  ogTitle: () => guide.value ? `${guide.value.title} Guide` : 'Guide',
  ogDescription: () => guide.value?.description || '',
})

// JSON-LD structured data + markdown alternate link (from AIC-51)
useHead({
  link: [
    { rel: 'alternate', type: 'text/markdown', href: `/guides/${slug}.md` },
  ],
  script: computed(() => guide.value ? [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      name: guide.value.title,
      description: guide.value.description,
      url: `${siteUrl}/guides/${slug}`,
      about: {
        '@type': 'SoftwareApplication',
        name: guide.value.title,
        applicationCategory: guide.value.category,
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Content Guides',
      },
      encoding: {
        '@type': 'MediaObject',
        contentUrl: `${siteUrl}/guides/${slug}.md`,
        encodingFormat: 'text/markdown',
      },
    }),
  }] : []),
})

</script>

<template>
  <section class="py-8">
    <!-- Loading skeleton -->
    <div v-if="pending" aria-busy="true" aria-label="Loading guide">
      <div class="max-w-[80ch] mx-auto px-4 space-y-4">
        <Skeleton class="h-4 w-32" />
        <Skeleton class="h-8 w-3/4" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-5/6" />
        <Skeleton class="h-64 w-full rounded-lg" />
      </div>
    </div>
    <PageErrorState v-else-if="error" message="Failed to load this guide." @retry="refresh()" />
    <PageNotFound
      v-else-if="!guide"
      icon="help_outline"
      title="Guide not found"
      message="We couldn't find the guide you're looking for."
      link-to="/guides"
      link-text="Browse all guides"
    />
    <div v-else>
      <div class="max-w-[80ch] mx-auto px-4">
        <!-- Back link -->
        <NuxtLink to="/guides" class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft class="size-4" aria-hidden="true" />
          Back to guides
        </NuxtLink>

        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-3 flex-wrap mb-2">
            <h1 class="text-2xl font-bold">{{ guide.title }}</h1>
            <Badge v-if="tool && tool.stars !== undefined" variant="secondary" class="gap-1">
              <Star class="size-3" aria-hidden="true" />
              {{ formatStars(tool.stars) }}
            </Badge>
          </div>

          <div class="flex items-center gap-3 flex-wrap text-sm">
            <Badge variant="outline">{{ guide.category }}</Badge>
            <a
              v-if="tool?.website"
              :href="tool.website"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${guide.title} website (opens in new tab)`"
              class="text-primary hover:underline inline-flex items-center gap-1"
            >
              <LinkIcon class="size-4" aria-hidden="true" />
              Website
            </a>
            <a
              v-if="tool?.github?.repo"
              :href="getGitHubUrl(tool.github.repo)"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${guide.title} on GitHub (opens in new tab)`"
              class="text-primary hover:underline inline-flex items-center gap-1"
            >
              <Github class="size-4" aria-hidden="true" />
              GitHub
            </a>
          </div>

          <p class="mt-3 text-muted-foreground">{{ guide.description }}</p>
        </div>

        <!-- Guide content (renders full markdown body with both sections) -->
        <GuideHumanSection :guide="guide" />

        <!-- Structured agent resources -->
        <div class="mt-8 pt-8 border-t">
          <GuideAgentSection
            :agent-resources="guide.agentResources || []"
            :agent-resource-gaps="guide.agentResourceGaps || []"
            :raw-agent-markdown="guide.rawAgentMarkdown"
          />
        </div>

        <!-- Related videos from tools.yml data -->
        <div v-if="tool?.videos?.length" class="mt-8 pt-8 border-t">
          <h2 class="text-lg font-semibold mb-4">Related Videos</h2>
          <ul class="space-y-2">
            <li v-for="video in tool.videos.slice(0, 10)" :key="video.id">
              <NuxtLink
                :to="`/summaries/${video.id}`"
                class="text-sm hover:underline text-foreground"
              >
                {{ video.title }}
              </NuxtLink>
            </li>
            <li v-if="tool.videos.length > 10" class="text-sm text-muted-foreground">
              and {{ tool.videos.length - 10 }} more videos
            </li>
          </ul>
        </div>

        <!-- Generation metadata -->
        <div class="mt-8 pt-4 border-t text-xs text-muted-foreground">
          Generated from {{ guide.generatedFrom.summaryCount }} video summaries
          <span v-if="guide.generatedFrom.articleCount"> and {{ guide.generatedFrom.articleCount }} articles</span>
        </div>
      </div>
    </div>
  </section>
</template>

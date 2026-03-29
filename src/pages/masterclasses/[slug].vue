<script setup lang="ts">
import { useMasterclassDetail } from '~/composables/useMasterclassDetail'
import { formatDate } from '~/utils/formatDate'
import { TIER_LABELS, CATEGORY_LABELS } from '~/types/masterclass'
import type { MasterclassTier } from '~/types/masterclass'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText, ExternalLink, Github, Star } from 'lucide-vue-next'

definePageMeta({
  footer: false
})

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const {
  detail,
  tierContentMap,
  availableTiers,
  defaultTier,
  pending,
  error,
  notFound,
  refresh,
} = useMasterclassDetail(slug)

// --- Tab state synced with URL ---
const activeTier = ref<MasterclassTier>('beginner')

// Initialize from URL once data loads
watch([defaultTier, () => route.query.tier], ([newDefault, queryTier]) => {
  if (queryTier && availableTiers.value.includes(queryTier as MasterclassTier)) {
    activeTier.value = queryTier as MasterclassTier
  } else if (newDefault) {
    activeTier.value = newDefault
  }
}, { immediate: true })

// Sync tier changes back to URL
watch(activeTier, (tier) => {
  const query = { ...route.query }
  if (tier === defaultTier.value) {
    delete query.tier
  } else {
    query.tier = tier
  }
  router.replace({ query })
})

// --- SEO ---
useSeoMeta({
  title: () => detail.value
    ? `${detail.value.name} Masterclass${activeTier.value !== 'beginner' ? ` -- ${TIER_LABELS[activeTier.value]}` : ''} | YouTube Summaries`
    : 'Masterclass | YouTube Summaries',
  description: () => detail.value?.tldr ?? 'AI-generated masterclass content.',
  ogTitle: () => detail.value
    ? `${detail.value.name} Masterclass | YouTube Summaries`
    : 'Masterclass | YouTube Summaries',
  ogDescription: () => detail.value?.description ?? detail.value?.tldr ?? '',
})

// --- Structured Data (JSON-LD) ---
useHead({
  script: computed(() => {
    if (!detail.value) return []
    return [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${detail.value.name} Masterclass`,
        description: detail.value.tldr,
        datePublished: detail.value.generatedAt,
        author: {
          '@type': 'Organization',
          name: 'YouTube Summaries',
        },
        about: {
          '@type': 'Thing',
          name: detail.value.name,
        },
      }).replace(/<\/script/gi, '<\\/script'),
    }]
  }),
})

</script>

<template>
  <section class="py-8">
    <!-- Loading skeleton -->
    <div v-if="pending" aria-busy="true" aria-label="Loading masterclass">
      <div class="max-w-[80ch] mx-auto px-4 space-y-4">
        <Skeleton class="h-4 w-32" />
        <Skeleton class="h-8 w-3/4" />
        <Skeleton class="h-4 w-full" />
        <div class="flex gap-2 mt-6">
          <Skeleton class="h-10 w-28" />
          <Skeleton class="h-10 w-28" />
          <Skeleton class="h-10 w-28" />
        </div>
        <Skeleton class="h-64 w-full rounded-lg mt-4" />
      </div>
    </div>

    <!-- Error state -->
    <PageErrorState v-else-if="error" message="Failed to load this masterclass." @retry="refresh()" />

    <!-- Not found -->
    <PageNotFound
      v-else-if="notFound"
      icon="help_outline"
      title="Masterclass not found"
      message="We couldn't find the masterclass you're looking for."
      link-to="/masterclasses"
      link-text="Browse all masterclasses"
    />

    <!-- Content -->
    <div v-else-if="detail" class="max-w-[80ch] mx-auto px-4">
      <!-- Back link -->
      <NuxtLink to="/masterclasses" class="text-sm text-muted-foreground hover:text-foreground">
        Back to masterclasses
      </NuxtLink>

      <!-- Header -->
      <div class="mt-4 mb-6">
        <div class="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{{ CATEGORY_LABELS[detail.category] }}</Badge>
          <span v-if="detail.stars" class="text-sm text-muted-foreground flex items-center gap-1">
            <Star class="size-3" aria-hidden="true" /> {{ detail.stars.toLocaleString() }}
          </span>
        </div>
        <h1 class="text-2xl font-bold">{{ detail.name }}</h1>
        <p v-if="detail.tldr" class="mt-2 text-muted-foreground">{{ detail.tldr }}</p>

        <!-- Meta row -->
        <div class="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <span class="flex items-center gap-1">
            <FileText class="size-4" aria-hidden="true" />
            Built from {{ detail.sourceCount }} sources
          </span>
          <span class="flex items-center gap-1">
            <Calendar class="size-4" aria-hidden="true" />
            {{ formatDate(detail.generatedAt) }}
          </span>
          <a
            v-if="detail.website"
            :href="detail.website"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 text-primary hover:underline"
            :aria-label="`${detail.name} website (opens in new tab)`"
          >
            <ExternalLink class="size-4" aria-hidden="true" />
            Website
          </a>
          <a
            v-if="detail.githubRepo"
            :href="`https://github.com/${detail.githubRepo}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 text-primary hover:underline"
            :aria-label="`${detail.name} GitHub repository (opens in new tab)`"
          >
            <Github class="size-4" aria-hidden="true" />
            GitHub
          </a>
        </div>

        <!-- Related topics -->
        <div v-if="detail.relatedTopics.length" class="mt-4 flex flex-wrap gap-2">
          <span class="text-sm text-muted-foreground">Related:</span>
          <NuxtLink
            v-for="related in detail.relatedTopics"
            :key="related"
            :to="`/masterclasses/${related}`"
            class="text-sm text-primary hover:underline"
          >
            {{ related }}
          </NuxtLink>
        </div>
      </div>

      <!-- All tiers failed -->
      <div v-if="availableTiers.length === 0" class="p-6 bg-muted rounded-lg text-center">
        <p class="text-muted-foreground">Content generation is in progress. Check back soon.</p>
      </div>

      <!-- Tabbed tier content -->
      <Tabs
        v-else
        :model-value="activeTier"
        @update:model-value="(val: string) => activeTier = val as MasterclassTier"
      >
        <TabsList class="w-full justify-start">
          <TabsTrigger
            v-for="tier in availableTiers"
            :key="tier"
            :value="tier"
          >
            {{ TIER_LABELS[tier] }}
          </TabsTrigger>
        </TabsList>

        <TabsContent
          v-for="tier in availableTiers"
          :key="tier"
          :value="tier"
          class="mt-6"
        >
          <div v-if="tierContentMap.get(tier)">
            <ContentRenderer
              :value="tierContentMap.get(tier)"
              class="prose prose-zinc dark:prose-invert max-w-none"
            />
          </div>
          <div v-else class="py-8 text-center text-muted-foreground">
            <Skeleton class="h-64 w-full rounded-lg" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>

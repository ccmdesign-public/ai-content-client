<template>
  <section class="py-8">
    <!-- Loading skeleton -->
    <div v-if="pending" aria-busy="true" aria-label="Loading summary">
      <div class="max-w-[80ch] mx-auto px-4 space-y-4">
        <Skeleton class="h-4 w-32" />
        <Skeleton class="h-8 w-3/4" />
        <Skeleton class="w-full aspect-video rounded-lg" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-5/6" />
        <Skeleton class="h-4 w-2/3" />
      </div>
    </div>
    <PageErrorState v-else-if="error" message="Failed to load this summary." @retry="refresh()" />
    <PageNotFound
      v-else-if="!summary"
      icon="help_outline"
      title="Summary not found"
      message="We couldn't find the summary you're looking for."
      link-to="/summaries/"
      link-text="Browse all summaries"
    />
    <div v-else>
      <div class="max-w-[80ch] mx-auto px-4">
        <NuxtLink to="/summaries/" class="text-sm text-muted-foreground hover:text-foreground">Back to summaries</NuxtLink>
        <h1 class="text-2xl font-bold mt-4 mb-2">{{ summary.metadata.title }}</h1>
        <!-- YouTube Embed -->
        <div class="my-6 aspect-video rounded-lg overflow-hidden border">
          <iframe
            :src="`https://www.youtube.com/embed/${summary.metadata.videoId}`"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>

        <!-- Tools Section at Beginning -->
        <section v-if="categorizedTools.length" class="my-8 p-4 bg-muted rounded-lg border">
          <h2 class="text-lg font-semibold mb-4">Tools Mentioned</h2>
          <div v-for="group in categorizedTools" :key="group.category" class="mb-3 last:mb-0">
            <h3 class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{{ group.category }}</h3>
            <div class="flex flex-wrap gap-2">
              <Chip
                v-for="tool in group.tools"
                :key="tool.name"
                :to="tool.url || undefined"
                variant="outline"
              >
                {{ tool.name }}
              </Chip>
            </div>
          </div>
        </section>

        <!-- Video Description Section -->
        <details v-if="summary.metadata.description" class="my-6 p-4 bg-muted rounded-lg border">
          <summary class="cursor-pointer font-semibold text-muted-foreground hover:text-foreground select-none">Video Description</summary>
          <div class="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{{ summary.metadata.description }}</div>
        </details>

        <ContentRenderer :value="summary" class="prose prose-zinc dark:prose-invert max-w-none" />

        <!-- Full Transcript -->
        <details v-if="transcriptText" class="my-6 p-4 bg-muted rounded-lg border">
          <summary class="cursor-pointer font-semibold text-muted-foreground hover:text-foreground select-none">Full Transcript</summary>
          <div class="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{{ transcriptText }}</div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categorizeTools } from '~/utils/categorizeTools'

definePageMeta({
  footer: false
})

const route = useRoute()
const slug = route.params.slug as string

const { data: summary, pending, error, refresh } = useAsyncData(
  `summary-${slug}`,
  async () => {
    // Try new folder path format first: /summaries/{videoId}/summary
    let result = await queryCollection('summaries').path(`/summaries/${slug}/summary`).first()

    // Fallback to legacy path format: /summaries/{videoId}
    if (!result) {
      result = await queryCollection('summaries').path(`/summaries/${slug}`).first()
    }

    // Final fallback to videoId filter (using nested metadata.videoId)
    if (!result) {
      const all = await queryCollection('summaries').all()
      result = all.find((item: any) => item.metadata?.videoId === slug) || null
    }
    return result
  }
)

// Load transcript JSON
const { data: transcriptText } = useAsyncData(
  `transcript-${slug}`,
  async () => {
    try {
      const data = await $fetch<{ segments?: { text: string; duration: number }[] }>(`/transcripts/${slug}.json`)
      if (!data?.segments?.length) return ''
      // Filter out short overlap fragments (duration <= 0.5s) and join
      return data.segments
        .filter(s => s.duration > 0.5)
        .map(s => s.text)
        .join(' ')
    } catch (e) {
      if (import.meta.dev) console.warn('Transcript load failed:', e)
      return ''
    }
  }
)

// Computed categorized tools
const categorizedTools = computed(() => {
  if (!summary.value?.tools?.length) return []
  return categorizeTools(summary.value.tools)
})
</script>

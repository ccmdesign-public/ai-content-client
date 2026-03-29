<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useToolsDirectory } from '~/composables/useToolsDirectory'

definePageMeta({})

useSeoMeta({
  title: 'Guides & Tools Directory | YouTube Summaries',
  description: 'Browse guides and search through 800+ tools mentioned in AI and tech video summaries. Find tools by name, popularity, or GitHub stars.',
  ogTitle: 'Guides & Tools Directory | YouTube Summaries',
  ogDescription: 'Browse guides and search through 800+ tools mentioned in AI and tech video summaries.'
})

const {
  displayedTools,
  pending,
  error,
  totalCount,
  filteredCount,
  toolsWithStars,
  hasMore,
  searchQuery,
  sortBy,
  loadMore,
  setSearch,
  setSort,
  refresh
} = useToolsDirectory()

// Load guides to know which tools have guides
const { data: guides } = useAsyncData(
  'guides-index',
  () => queryCollection('guides').all()
)

// Create a lookup map: toolSlug -> guide info
const guideLookup = computed(() => {
  const map = new Map<string, { description: string; path: string }>()
  for (const g of guides.value || []) {
    map.set(g.toolSlug, { description: g.description, path: g.path })
  }
  return map
})

// Infinite scroll with Intersection Observer
const loadMoreTrigger = ref<HTMLElement | null>(null)
const { stop } = useIntersectionObserver(
  loadMoreTrigger,
  (entries) => {
    if (entries[0]?.isIntersecting && hasMore.value && !pending.value) {
      loadMore()
    }
  },
  { threshold: 0.1 }
)

onUnmounted(() => {
  stop()
})

// Computed state for empty state message
const showEmptyState = computed(() =>
  !pending.value && searchQuery.value && filteredCount.value === 0
)

const showNoResults = computed(() =>
  !pending.value && !searchQuery.value && totalCount.value === 0
)
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="pending" class="py-6 space-y-2" aria-busy="true" aria-label="Loading guides and tools">
      <Skeleton v-for="n in 6" :key="n" class="h-16 w-full rounded-lg" />
    </div>

    <!-- Error state -->
    <PageErrorState v-else-if="error" message="Failed to load guides and tools." @retry="refresh()" />

    <!-- Main content -->
    <div v-else>
      <!-- Stats header -->
      <div class="mb-6 text-sm text-muted-foreground" aria-live="polite">
        <span v-if="searchQuery">
          {{ filteredCount.toLocaleString() }} of {{ totalCount.toLocaleString() }} tools
        </span>
        <span v-else>
          {{ totalCount.toLocaleString() }} tools
          <span v-if="guideLookup.size"> · {{ guideLookup.size }} with guides</span>
          <span v-if="toolsWithStars"> · {{ toolsWithStars }} with GitHub repos</span>
        </span>
      </div>

      <!-- Search and filters -->
      <div class="mb-6 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <ToolsSearch
              :model-value="searchQuery"
              :result-count="filteredCount"
              :total-count="totalCount"
              @update:model-value="setSearch"
            />
          </div>
          <ToolsFilters
            :sort-by="sortBy"
            :has-stars-data="toolsWithStars > 0"
            @update:sort-by="setSort"
          />
        </div>
      </div>

      <!-- Empty state for search -->
      <PageEmptyState
        v-if="showEmptyState"
        icon="search_off"
        :message="`No tools found for &quot;${searchQuery}&quot;`"
        hint="Try different keywords or clear the search."
        action-text="Clear search"
        @action="setSearch('')"
      />

      <!-- No results at all -->
      <PageEmptyState
        v-else-if="showNoResults"
        icon="inbox"
        message="No tools available yet."
      />

      <!-- Tools list -->
      <div v-else class="space-y-2" role="list" aria-label="Guides and tools list">
        <template v-for="tool in displayedTools" :key="tool.id">
          <!-- Guide card for tools with guides -->
          <GuideCard
            v-if="guideLookup.has(tool.slug)"
            :tool="tool"
            :guide-description="guideLookup.get(tool.slug)!.description"
            :guide-slug="tool.slug"
            role="listitem"
          />
          <!-- Regular tool card for tools without guides -->
          <ToolCard
            v-else
            :tool="tool"
            role="listitem"
          />
        </template>

        <!-- Load more trigger for infinite scroll -->
        <div
          v-if="hasMore"
          ref="loadMoreTrigger"
          class="py-8 text-center"
        >
          <Skeleton class="h-16 w-full rounded-lg" />
        </div>

        <!-- End of list indicator -->
        <div
          v-else-if="displayedTools.length > 0"
          class="py-6 text-center text-sm text-muted-foreground"
        >
          Showing all {{ filteredCount.toLocaleString() }} tools
        </div>
      </div>
    </div>
  </div>
</template>

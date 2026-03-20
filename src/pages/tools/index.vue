<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useToolsDirectory } from '~/composables/useToolsDirectory'

definePageMeta({})

useSeoMeta({
  title: 'Tools Directory | YouTube Summaries',
  description: 'Browse and search through 800+ tools mentioned in AI and tech video summaries. Find tools by name, popularity, or GitHub stars.',
  ogTitle: 'Tools Directory | YouTube Summaries',
  ogDescription: 'Browse and search through 800+ tools mentioned in AI and tech video summaries.'
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

// Infinite scroll with Intersection Observer
const loadMoreTrigger = ref<HTMLElement | null>(null)
const { stop } = useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting && hasMore.value && !pending.value) {
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
  <div class="tools-directory">
    <!-- Loading state -->
    <div v-if="pending" class="py-6 space-y-2" aria-busy="true" aria-label="Loading tools">
      <Skeleton v-for="n in 6" :key="n" class="h-16 w-full rounded-lg" />
    </div>

    <!-- Error state -->
    <PageErrorState v-else-if="error" message="Failed to load tools." @retry="refresh()" />

    <!-- Main content -->
    <div v-else>
      <!-- Stats header -->
      <div class="mb-6 text-sm text-muted-foreground">
        <span v-if="searchQuery">
          {{ filteredCount.toLocaleString() }} of {{ totalCount.toLocaleString() }} tools
        </span>
        <span v-else>
          {{ totalCount.toLocaleString() }} tools
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
      <div v-else class="space-y-2" role="list" aria-label="Tools list">
        <ToolCard
          v-for="tool in displayedTools"
          :key="tool.id"
          :tool="tool"
          role="listitem"
        />

        <!-- Load more trigger for infinite scroll -->
        <div
          v-if="hasMore"
          ref="loadMoreTrigger"
          class="py-8 text-center"
        >
          <div class="text-sm text-muted-foreground">
            Loading more tools...
          </div>
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

<script setup lang="ts">
import { useMasterclassIndex } from '~/composables/useMasterclassIndex'
import { useIntersectionObserver } from '@vueuse/core'
import { CATEGORY_LABELS } from '~/types/masterclass'
import type { MasterclassCategory } from '~/types/masterclass'
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

definePageMeta({
  footer: false
})

useSeoMeta({
  title: 'Masterclasses | YouTube Summaries',
  description: 'Deep-dive masterclasses on AI tools, techniques, and skills. Browse beginner to advanced content built from real video sources.',
  ogTitle: 'Masterclasses | YouTube Summaries',
  ogDescription: 'Deep-dive masterclasses on AI tools, techniques, and skills.',
})

const {
  displayedEntries,
  pending,
  error,
  totalCount,
  masterclassCount,
  filteredCount,
  categoryCounts,
  hasMore,
  searchQuery,
  categoryFilter,
  sortBy,
  loadMore,
  setSearch,
  setCategory,
  setSort,
  refresh,
} = useMasterclassIndex()

// Infinite scroll trigger
const loadMoreTrigger = ref<HTMLElement | null>(null)
const { stop } = useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting && hasMore.value && !pending.value) loadMore()
  },
  { threshold: 0.1 }
)
onUnmounted(() => stop())

// Category filter bar data
const filterCategories = computed(() => {
  const cats: Array<{ categoryId: string; name: string; shortName: string; totalItems: number }> = []
  for (const [catId, label] of Object.entries(CATEGORY_LABELS)) {
    const count = categoryCounts.value.get(catId as MasterclassCategory) ?? 0
    if (count > 0) {
      cats.push({
        categoryId: catId,
        name: label,
        shortName: label,
        totalItems: count,
      })
    }
  }
  return cats
})

// Empty state conditions
const showEmptySearch = computed(() =>
  !pending.value && searchQuery.value && filteredCount.value === 0
)
const showNoData = computed(() =>
  !pending.value && !searchQuery.value && totalCount.value === 0
)
</script>

<template>
  <div class="px-7 pt-0 pb-7">
    <!-- Category filter bar -->
    <CategoryFilterBar
      v-if="!pending && filterCategories.length > 1"
      :categories="filterCategories"
      :selected-category="categoryFilter"
      :total-count="totalCount"
      @select="setCategory($event)"
    />

    <header class="mb-7 pt-7">
      <div class="flex justify-between items-start gap-5 flex-wrap">
        <div>
          <h1 class="m-0 text-xl">Masterclasses</h1>
          <p class="mt-1.5 text-muted-foreground text-sm" aria-live="polite" aria-atomic="true">
            {{ masterclassCount }} masterclasses, {{ totalCount - masterclassCount }} tools
            <span v-if="categoryFilter || searchQuery">
              &middot; showing {{ filteredCount }}
            </span>
          </p>
        </div>
        <div class="flex items-center gap-3 flex-1 md:flex-none md:w-auto justify-end">
          <!-- Search input -->
          <div class="relative w-full max-w-sm">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              :model-value="searchQuery"
              type="search"
              class="pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden"
              placeholder="Search masterclasses..."
              aria-label="Search masterclasses"
              @update:model-value="setSearch($event)"
            />
            <button
              v-if="searchQuery"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground rounded-sm hover:bg-accent"
              aria-label="Clear search"
              @click="setSearch('')"
            >
              <X class="size-3.5" aria-hidden="true" />
            </button>
          </div>
          <!-- Sort control -->
          <MasterclassSort
            :sort-by="sortBy"
            @update:sort-by="setSort"
          />
        </div>
      </div>
    </header>

    <!-- Loading skeleton -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true">
      <MasterclassCardSkeleton v-for="n in 9" :key="n" />
    </div>

    <!-- Error state -->
    <PageErrorState v-else-if="error" message="Failed to load masterclasses." @retry="refresh()" />

    <!-- Empty: no data at all -->
    <PageEmptyState
      v-else-if="showNoData"
      icon="inbox"
      message="No masterclasses available yet."
      hint="Check back soon — masterclasses are being generated."
    />

    <!-- Empty: search/filter yielded nothing -->
    <PageEmptyState
      v-else-if="showEmptySearch"
      icon="search_off"
      :message="`No results for &quot;${searchQuery}&quot;`"
      hint="Try different keywords or clear the search."
      action-text="Clear search"
      @action="setSearch('')"
    />

    <!-- Card grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
      <template v-for="entry in displayedEntries" :key="entry.slug">
        <MasterclassCard v-if="entry.hasMasterclass" :entry="entry" role="listitem" />
        <ToolBasicCard v-else :entry="entry" role="listitem" />
      </template>

      <!-- Infinite scroll trigger -->
      <div v-if="hasMore" ref="loadMoreTrigger" class="col-span-full py-8 text-center">
        <Skeleton class="h-32 w-full rounded-lg" />
      </div>

      <!-- End indicator -->
      <div v-else-if="displayedEntries.length > 0" class="col-span-full py-6 text-center text-sm text-muted-foreground">
        Showing all {{ filteredCount }} results
      </div>
    </div>
  </div>
</template>

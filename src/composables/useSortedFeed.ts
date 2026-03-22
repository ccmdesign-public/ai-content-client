import { computed, type Ref, type ComputedRef } from 'vue'
import { useSortOptions, type SortKey, type Sortable, type SortOption } from '~/composables/useSortOptions'
import { useDateGroups, type DateSegment } from '~/composables/useDateGroups'
import { usePagination } from '~/composables/usePagination'

export type FeedSegment<T> = DateSegment<T>

export interface UseSortedFeedOptions {
  pageSize?: number // undefined = no pagination (backwards compatible)
}

export interface UseSortedFeedReturn<T extends Sortable> {
  /** Segments ready for <DateGroupedFeed :segments="feedSegments"> */
  feedSegments: ComputedRef<FeedSegment<T>[]>
  /** Current sort key (v-model for SortControl) */
  currentSort: Ref<SortKey>
  /** Human-readable label for aria-live announcements */
  currentSortLabel: ComputedRef<string>
  /** Whether current sort is date-based (controls header visibility) */
  isDateSort: ComputedRef<boolean>
  /** Available sort options for rendering SortControl options list */
  sortOptions: readonly SortOption[]
  /** Whether there are more items to show beyond the current page */
  hasMore: ComputedRef<boolean>
  /** Number of items currently visible */
  visibleCount: ComputedRef<number>
  /** Total number of items in source (after sort, before pagination) */
  totalCount: ComputedRef<number>
  /** Load the next batch of items */
  loadMore: () => void
}

export function useSortedFeed<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort?: SortKey,
  options?: UseSortedFeedOptions
): UseSortedFeedReturn<T> {
  const { currentSort, sorted, isDateSort, currentSortLabel, sortOptions } = useSortOptions(items, defaultSort)

  // Pagination layer (optional) -- sits between sort and date-grouping
  // so that DateGroupedFeed only receives the visible slice and date headers
  // remain correct across batches.
  const pagination = options?.pageSize
    ? usePagination(sorted, { pageSize: options.pageSize })
    : null

  const displayItems = pagination ? pagination.visibleItems : sorted

  // Direction is derived from the sort key name suffix.
  // All current date sorts are either explicitly 'asc' or default to 'desc'.
  // If a new date sort key is added, update this mapping.
  const dateSortDirection = computed(() =>
    currentSort.value === 'publish-date-asc' ? 'asc' as const : 'desc' as const
  )

  // NOTE: useDateGroups always groups by publishedAt (default dateAccessor),
  // even when sorting by processedAt. This is pre-existing behavior from before
  // the composable extraction. A video published in January but processed today
  // will sort at the top yet appear in the "Older" bucket. Fixing this is out
  // of scope for the refactoring PR -- see review todo P2-009.
  const { segments } = useDateGroups(
    computed(() => isDateSort.value ? displayItems.value : []),
    undefined,
    dateSortDirection
  )

  const feedSegments = computed<FeedSegment<T>[]>(() =>
    isDateSort.value
      ? segments.value
      : displayItems.value.length > 0
        ? [{ key: 'older' as const, label: '', items: displayItems.value }]
        : []
  )

  return {
    feedSegments,
    currentSort,
    currentSortLabel,
    isDateSort,
    sortOptions,
    hasMore: pagination ? pagination.hasMore : computed(() => false),
    visibleCount: pagination ? pagination.visibleCount : computed(() => sorted.value.length),
    totalCount: computed(() => sorted.value.length),
    loadMore: pagination ? pagination.loadMore : () => {},
  }
}

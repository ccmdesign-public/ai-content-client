import { computed, type Ref, type ComputedRef } from 'vue'
import { useSortOptions, SORT_OPTIONS, type SortKey, type Sortable } from '~/composables/useSortOptions'
import { useDateGroups, type DateSegment } from '~/composables/useDateGroups'

export type FeedSegment<T> = DateSegment<T>

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
  sortOptions: typeof SORT_OPTIONS
}

export function useSortedFeed<T extends Sortable>(
  items: Ref<T[]>,
  defaultSort?: SortKey
): UseSortedFeedReturn<T> {
  const { currentSort, sorted, isDateSort, currentSortLabel, sortOptions } = useSortOptions(items, defaultSort)

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
    computed(() => isDateSort.value ? sorted.value : []),
    undefined,
    dateSortDirection
  )

  const feedSegments = computed<FeedSegment<T>[]>(() =>
    isDateSort.value
      ? segments.value
      : sorted.value.length > 0
        ? [{ key: 'older' as const, label: '', items: sorted.value }]
        : []
  )

  return { feedSegments, currentSort, currentSortLabel, isDateSort, sortOptions }
}

import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'

export interface UsePaginationOptions {
  pageSize?: number // default 25
}

export interface UsePaginationReturn<T> {
  /** The visible slice of items (first N of source) */
  visibleItems: ComputedRef<T[]>
  /** Whether there are more items to show */
  hasMore: ComputedRef<boolean>
  /** Number of items currently visible */
  visibleCount: ComputedRef<number>
  /** Total number of items in source */
  totalCount: ComputedRef<number>
  /** Load the next batch */
  loadMore: () => void
  /** Reset to first page */
  reset: () => void
}

/**
 * Client-side pagination composable.
 *
 * Slices a reactive source array to show items in batches.
 * Automatically resets when the source array reference changes
 * (e.g. on sort change, filter change, or navigation).
 *
 * Accepts both Ref<T[]> and ComputedRef<T[]>.
 */
export function usePagination<T>(
  items: Ref<T[]> | ComputedRef<T[]>,
  options?: UsePaginationOptions
): UsePaginationReturn<T> {
  const pageSize = options?.pageSize ?? 25
  const limit = ref(pageSize)

  const visibleItems = computed(() => items.value.slice(0, limit.value))
  const hasMore = computed(() => limit.value < items.value.length)
  const visibleCount = computed(() => Math.min(limit.value, items.value.length))
  const totalCount = computed(() => items.value.length)

  function loadMore() {
    if (hasMore.value) {
      limit.value = Math.min(limit.value + pageSize, items.value.length)
    }
  }

  function reset() {
    limit.value = pageSize
  }

  // Auto-reset when the source array reference changes.
  // useSortOptions.sorted always returns a new array ([...items].sort()),
  // so a reference watch correctly fires on sort changes.
  // Using flush: 'sync' to reset in the same tick, preventing stale content flash.
  watch(() => items.value, () => {
    reset()
  }, { flush: 'sync' })

  return {
    visibleItems,
    hasMore,
    visibleCount,
    totalCount,
    loadMore,
    reset,
  }
}

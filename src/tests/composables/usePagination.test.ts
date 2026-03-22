import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { usePagination } from '~/composables/usePagination'

function makeItems(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `item-${i + 1}`)
}

describe('usePagination', () => {
  it('initial render shows pageSize items', () => {
    const items = ref(makeItems(50))
    const { visibleItems, visibleCount, totalCount, hasMore } = usePagination(items, { pageSize: 10 })

    expect(visibleItems.value).toHaveLength(10)
    expect(visibleCount.value).toBe(10)
    expect(totalCount.value).toBe(50)
    expect(hasMore.value).toBe(true)
  })

  it('loadMore() reveals next batch', () => {
    const items = ref(makeItems(30))
    const { visibleItems, loadMore, visibleCount } = usePagination(items, { pageSize: 10 })

    expect(visibleItems.value).toHaveLength(10)

    loadMore()
    expect(visibleItems.value).toHaveLength(20)
    expect(visibleCount.value).toBe(20)

    loadMore()
    expect(visibleItems.value).toHaveLength(30)
    expect(visibleCount.value).toBe(30)
  })

  it('hasMore is false when all items visible', () => {
    const items = ref(makeItems(15))
    const { hasMore, loadMore } = usePagination(items, { pageSize: 10 })

    expect(hasMore.value).toBe(true)

    loadMore()
    expect(hasMore.value).toBe(false)
  })

  it('auto-resets when source array reference changes', () => {
    const items = ref(makeItems(30))
    const { visibleItems, loadMore, visibleCount } = usePagination(items, { pageSize: 10 })

    loadMore()
    loadMore()
    expect(visibleCount.value).toBe(30)

    // Replace source array (simulates sort/filter change)
    items.value = makeItems(20)
    expect(visibleCount.value).toBe(10)
    expect(visibleItems.value).toHaveLength(10)
  })

  it('works with empty arrays', () => {
    const items = ref<string[]>([])
    const { visibleItems, hasMore, visibleCount, totalCount } = usePagination(items, { pageSize: 10 })

    expect(visibleItems.value).toEqual([])
    expect(hasMore.value).toBe(false)
    expect(visibleCount.value).toBe(0)
    expect(totalCount.value).toBe(0)
  })

  it('works when source has fewer items than pageSize', () => {
    const items = ref(makeItems(5))
    const { visibleItems, hasMore, visibleCount } = usePagination(items, { pageSize: 10 })

    expect(visibleItems.value).toHaveLength(5)
    expect(hasMore.value).toBe(false)
    expect(visibleCount.value).toBe(5)
  })

  it('loadMore() is a no-op when hasMore is false', () => {
    const items = ref(makeItems(5))
    const { visibleItems, loadMore, visibleCount } = usePagination(items, { pageSize: 10 })

    expect(visibleCount.value).toBe(5)

    loadMore()
    expect(visibleCount.value).toBe(5)
    expect(visibleItems.value).toHaveLength(5)
  })

  it('exact boundary: source has exactly pageSize items', () => {
    const items = ref(makeItems(10))
    const { hasMore, visibleItems, loadMore } = usePagination(items, { pageSize: 10 })

    expect(hasMore.value).toBe(false)
    expect(visibleItems.value).toHaveLength(10)

    loadMore()
    expect(visibleItems.value).toHaveLength(10)
  })

  it('rapid successive loads increment correctly', () => {
    const items = ref(makeItems(100))
    const { visibleItems, loadMore, visibleCount } = usePagination(items, { pageSize: 10 })

    loadMore()
    loadMore()
    loadMore()

    expect(visibleCount.value).toBe(40)
    expect(visibleItems.value).toHaveLength(40)
  })

  it('source shrinks below current limit', () => {
    const items = ref(makeItems(50))
    const { loadMore, visibleItems, hasMore, visibleCount } = usePagination(items, { pageSize: 25 })

    loadMore()
    expect(visibleCount.value).toBe(50)

    // Replace with a smaller array
    items.value = makeItems(10)
    expect(visibleItems.value).toHaveLength(10)
    expect(hasMore.value).toBe(false)
    expect(visibleCount.value).toBe(10)
  })

  it('source grows triggers reset', () => {
    const items = ref(makeItems(30))
    const { loadMore, visibleCount, hasMore } = usePagination(items, { pageSize: 25 })

    expect(hasMore.value).toBe(true)
    loadMore()
    expect(visibleCount.value).toBe(30)

    // Replace with a larger array
    items.value = makeItems(60)
    expect(visibleCount.value).toBe(25)
    expect(hasMore.value).toBe(true)
  })

  it('reset() called explicitly resets limit', () => {
    const items = ref(makeItems(50))
    const { loadMore, visibleCount, reset } = usePagination(items, { pageSize: 10 })

    loadMore()
    loadMore()
    expect(visibleCount.value).toBe(30)

    reset()
    expect(visibleCount.value).toBe(10)
  })

  it('defaults to pageSize 25 when no options provided', () => {
    const items = ref(makeItems(50))
    const { visibleItems, visibleCount } = usePagination(items)

    expect(visibleItems.value).toHaveLength(25)
    expect(visibleCount.value).toBe(25)
  })
})

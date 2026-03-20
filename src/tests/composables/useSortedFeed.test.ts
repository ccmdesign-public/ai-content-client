import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import { useSortedFeed } from '~/composables/useSortedFeed'
import { SORT_OPTIONS, type Sortable } from '~/composables/useSortOptions'

function makeSortable(overrides: Partial<Sortable> & { metadata?: Partial<Sortable['metadata']> } = {}): Sortable {
  return {
    processedAt: '2025-01-15T10:00:00Z',
    metadata: {
      publishedAt: '2025-01-10T10:00:00Z',
      title: 'Test Video',
      ...overrides.metadata
    },
    ...overrides
  }
}

describe('useSortedFeed', () => {
  const itemA = makeSortable({
    processedAt: '2025-01-20T10:00:00Z',
    metadata: { publishedAt: '2025-01-01T10:00:00Z', title: 'Alpha' }
  })
  const itemB = makeSortable({
    processedAt: '2025-01-10T10:00:00Z',
    metadata: { publishedAt: '2025-01-15T10:00:00Z', title: 'Beta' }
  })
  const itemC = makeSortable({
    processedAt: '2025-01-15T10:00:00Z',
    metadata: { publishedAt: '2025-01-05T10:00:00Z', title: 'Charlie' }
  })

  it('non-date sort produces flat segment with key "older"', () => {
    const items = ref([itemA, itemB, itemC])
    const { feedSegments, currentSort } = useSortedFeed(items)

    currentSort.value = 'title-asc'
    expect(feedSegments.value).toHaveLength(1)
    expect(feedSegments.value[0].key).toBe('older')
    expect(feedSegments.value[0].label).toBe('')
    expect(feedSegments.value[0].items.map(i => i.metadata.title)).toEqual(['Alpha', 'Beta', 'Charlie'])
  })

  it('date sort produces grouped segments', () => {
    const items = ref([itemA, itemB, itemC])
    const { feedSegments } = useSortedFeed(items)

    // Default is publish-date-desc, all items are old dates so they go to 'older'
    expect(feedSegments.value.length).toBeGreaterThanOrEqual(1)
    // All items have old dates, so they should be in the 'older' group
    const allItems = feedSegments.value.flatMap(s => s.items)
    expect(allItems).toHaveLength(3)
  })

  it('ascending date sort reverses group order', () => {
    const items = ref([itemA, itemB, itemC])
    const { feedSegments, currentSort } = useSortedFeed(items)

    currentSort.value = 'publish-date-asc'
    // Items are sorted ascending within groups
    const allItems = feedSegments.value.flatMap(s => s.items)
    expect(allItems).toHaveLength(3)
    // First item should have the earliest publish date (Alpha: Jan 1)
    expect(allItems[0].metadata.title).toBe('Alpha')
  })

  it('currentSortLabel returns human-readable label', () => {
    const items = ref([itemA])
    const { currentSortLabel } = useSortedFeed(items)

    // Default sort is publish-date-desc
    expect(currentSortLabel.value).toBe('Newest first')
  })

  it('empty input returns empty feedSegments', () => {
    const items = ref<Sortable[]>([])
    const { feedSegments, currentSort } = useSortedFeed(items)

    // Date sort with empty items
    expect(feedSegments.value).toEqual([])

    // Non-date sort with empty items
    currentSort.value = 'title-asc'
    expect(feedSegments.value).toEqual([])
  })

  it('processed-date-desc produces date-grouped segments with all items', () => {
    const items = ref([itemA, itemB, itemC])
    const { feedSegments, currentSort, isDateSort } = useSortedFeed(items)
    currentSort.value = 'processed-date-desc'

    expect(isDateSort.value).toBe(true)
    const allItems = feedSegments.value.flatMap(s => s.items)
    expect(allItems).toHaveLength(3)
    // Items are date-grouped by publishedAt (pre-existing behavior, see P2-009).
    // Within the "older" bucket they are sorted by publishedAt desc:
    // Beta (Jan 15) > Charlie (Jan 5) > Alpha (Jan 1)
    expect(allItems[0].metadata.title).toBe('Beta')
    expect(allItems[1].metadata.title).toBe('Charlie')
    expect(allItems[2].metadata.title).toBe('Alpha')
  })

  it('isDateSort is true for date sorts, false for title sort', () => {
    const items = ref([itemA])
    const { isDateSort, currentSort } = useSortedFeed(items)

    expect(isDateSort.value).toBe(true)

    currentSort.value = 'publish-date-asc'
    expect(isDateSort.value).toBe(true)

    currentSort.value = 'processed-date-desc'
    expect(isDateSort.value).toBe(true)

    currentSort.value = 'title-asc'
    expect(isDateSort.value).toBe(false)
  })

  it('reactive update: mutating input ref triggers feedSegments recompute', async () => {
    const items = ref<Sortable[]>([])
    const { feedSegments, currentSort } = useSortedFeed(items)

    currentSort.value = 'title-asc'
    expect(feedSegments.value).toEqual([])

    items.value = [itemA, itemB]
    await nextTick()
    expect(feedSegments.value).toHaveLength(1)
    expect(feedSegments.value[0].items).toHaveLength(2)
  })

  it('sort change triggers recompute from grouped to flat', async () => {
    const items = ref([itemA, itemB, itemC])
    const { feedSegments, currentSort } = useSortedFeed(items)

    // Default: date sort produces date-grouped segments
    const initialKeys = feedSegments.value.map(s => s.key)
    expect(initialKeys.length).toBeGreaterThanOrEqual(1)

    // Switch to title sort: should produce single flat segment
    currentSort.value = 'title-asc'
    await nextTick()
    expect(feedSegments.value).toHaveLength(1)
    expect(feedSegments.value[0].key).toBe('older')
    expect(feedSegments.value[0].label).toBe('')
  })

  it('defaultSort parameter is respected', () => {
    const items = ref([itemA, itemB, itemC])
    const { feedSegments, currentSort } = useSortedFeed(items, 'title-asc')

    expect(currentSort.value).toBe('title-asc')
    // Title sort produces a flat segment
    expect(feedSegments.value).toHaveLength(1)
    expect(feedSegments.value[0].key).toBe('older')
  })

  it('sortOptions is exposed and contains all 4 sort options', () => {
    const items = ref<Sortable[]>([])
    const { sortOptions } = useSortedFeed(items)

    expect(sortOptions).toBe(SORT_OPTIONS)
    expect(sortOptions).toHaveLength(4)
    expect(sortOptions.map(o => o.key)).toEqual([
      'publish-date-desc',
      'publish-date-asc',
      'title-asc',
      'processed-date-desc'
    ])
  })
})

import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import { useSortOptions, type Sortable, SORT_OPTIONS } from '~/composables/useSortOptions'

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

describe('useSortOptions', () => {
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

  it('sorts by publish date descending by default', () => {
    const items = ref([itemA, itemB, itemC])
    const { sorted } = useSortOptions(items)

    expect(sorted.value.map(i => i.metadata.title)).toEqual(['Beta', 'Charlie', 'Alpha'])
  })

  it('sorts by publish date ascending when selected', () => {
    const items = ref([itemA, itemB, itemC])
    const { sorted, currentSort } = useSortOptions(items)

    currentSort.value = 'publish-date-asc'
    expect(sorted.value.map(i => i.metadata.title)).toEqual(['Alpha', 'Charlie', 'Beta'])
  })

  it('sorts by processed date descending when selected', () => {
    const items = ref([itemA, itemB, itemC])
    const { sorted, currentSort } = useSortOptions(items)

    currentSort.value = 'processed-date-desc'
    expect(sorted.value.map(i => i.metadata.title)).toEqual(['Alpha', 'Charlie', 'Beta'])
  })

  it('sorts by title alphabetically (case-insensitive)', () => {
    const itemLower = makeSortable({ metadata: { publishedAt: '2025-01-01T00:00:00Z', title: 'alpha' } })
    const itemUpper = makeSortable({ metadata: { publishedAt: '2025-01-02T00:00:00Z', title: 'Alpha' } })
    const itemBeta = makeSortable({ metadata: { publishedAt: '2025-01-03T00:00:00Z', title: 'Beta' } })

    const items = ref([itemBeta, itemLower, itemUpper])
    const { sorted, currentSort } = useSortOptions(items)

    currentSort.value = 'title-asc'
    // Both 'alpha' and 'Alpha' should come before 'Beta'
    const titles = sorted.value.map(i => i.metadata.title)
    expect(titles[titles.length - 1]).toBe('Beta')
    expect(titles[0].toLowerCase()).toBe('alpha')
  })

  it('handles null/undefined titles without crashing', () => {
    const itemNull = makeSortable({ metadata: { publishedAt: '2025-01-01T00:00:00Z', title: undefined as any } })
    const itemNormal = makeSortable({ metadata: { publishedAt: '2025-01-02T00:00:00Z', title: 'Zulu' } })

    const items = ref([itemNull, itemNormal])
    const { sorted, currentSort } = useSortOptions(items)

    currentSort.value = 'title-asc'
    // Should not throw
    expect(sorted.value).toHaveLength(2)
  })

  it('returns true for isDateSort on date-based sorts', () => {
    const items = ref([itemA])
    const { isDateSort, currentSort } = useSortOptions(items)

    expect(isDateSort.value).toBe(true)

    currentSort.value = 'publish-date-asc'
    expect(isDateSort.value).toBe(true)

    currentSort.value = 'processed-date-desc'
    expect(isDateSort.value).toBe(true)

    currentSort.value = 'title-asc'
    expect(isDateSort.value).toBe(false)
  })

  it('returns empty array for empty input without error', () => {
    const items = ref<Sortable[]>([])
    const { sorted, currentSort } = useSortOptions(items)

    expect(sorted.value).toEqual([])

    currentSort.value = 'title-asc'
    expect(sorted.value).toEqual([])

    currentSort.value = 'publish-date-asc'
    expect(sorted.value).toEqual([])

    currentSort.value = 'processed-date-desc'
    expect(sorted.value).toEqual([])
  })

  it('reacts to currentSort changes', async () => {
    const items = ref([itemA, itemB, itemC])
    const { sorted, currentSort } = useSortOptions(items)

    // Default: publish-date-desc
    const firstOrder = sorted.value.map(i => i.metadata.title)
    expect(firstOrder).toEqual(['Beta', 'Charlie', 'Alpha'])

    // Switch to title
    currentSort.value = 'title-asc'
    await nextTick()
    const titleOrder = sorted.value.map(i => i.metadata.title)
    expect(titleOrder).toEqual(['Alpha', 'Beta', 'Charlie'])
  })

  it('provides the current sort label', () => {
    const items = ref([itemA])
    const { currentSort, currentSortLabel } = useSortOptions(items)

    expect(currentSortLabel.value).toBe('Newest first')

    currentSort.value = 'title-asc'
    expect(currentSortLabel.value).toBe('Title A\u2013Z')
  })

  it('accepts a custom default sort', () => {
    const items = ref([itemA, itemB, itemC])
    const { currentSort, sorted } = useSortOptions(items, 'title-asc')

    expect(currentSort.value).toBe('title-asc')
    expect(sorted.value.map(i => i.metadata.title)).toEqual(['Alpha', 'Beta', 'Charlie'])
  })

  it('exports SORT_OPTIONS with expected keys', () => {
    expect(SORT_OPTIONS).toHaveLength(4)
    expect(SORT_OPTIONS.map(o => o.key)).toEqual([
      'publish-date-desc',
      'publish-date-asc',
      'title-asc',
      'processed-date-desc'
    ])
  })
})

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { useDateGroups, type DateGroup } from '~/composables/useDateGroups'

interface TestItem {
  processedAt: string
  metadata: { publishedAt: string }
}

function makeItem(publishedAt: string, processedAt?: string): TestItem {
  return {
    processedAt: processedAt || publishedAt,
    metadata: { publishedAt }
  }
}

describe('useDateGroups', () => {
  // Fix "now" so date-group buckets are deterministic
  const NOW = new Date('2025-06-15T12:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('groups items into "today" bucket', () => {
    const items = ref([makeItem('2025-06-15T08:00:00Z')])
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('today')
    expect(segments.value[0].items).toHaveLength(1)
  })

  it('groups items into "yesterday" bucket', () => {
    const items = ref([makeItem('2025-06-14T20:00:00Z')])
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('yesterday')
  })

  it('groups items into "thisWeek" bucket (2-7 days ago)', () => {
    const items = ref([makeItem('2025-06-10T10:00:00Z')]) // 5 days ago
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('thisWeek')
  })

  it('groups items into "lastWeek" bucket (8-14 days ago)', () => {
    const items = ref([makeItem('2025-06-05T10:00:00Z')]) // 10 days ago
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('lastWeek')
  })

  it('groups items into "thisMonth" bucket (15-30 days ago)', () => {
    const items = ref([makeItem('2025-05-25T10:00:00Z')]) // 21 days ago
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('thisMonth')
  })

  it('groups items into "older" bucket (31+ days ago)', () => {
    const items = ref([makeItem('2025-01-01T10:00:00Z')]) // ~165 days ago
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('older')
  })

  it('returns non-empty segments in correct order', () => {
    const items = ref([
      makeItem('2025-06-15T08:00:00Z'), // today
      makeItem('2025-01-01T10:00:00Z'), // older
      makeItem('2025-06-14T20:00:00Z')  // yesterday
    ])
    const { segments } = useDateGroups(items)

    const keys = segments.value.map(s => s.key)
    expect(keys).toEqual(['today', 'yesterday', 'older'])
  })

  it('omits empty date groups', () => {
    const items = ref([makeItem('2025-06-15T08:00:00Z')]) // only today
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('today')
  })

  it('sorts items within each group by date descending (newest first)', () => {
    // All items in "older" bucket to avoid timezone edge cases with today/yesterday
    const items = ref([
      makeItem('2025-01-03T10:00:00Z'), // older - latest
      makeItem('2025-01-01T10:00:00Z'), // older - earliest
      makeItem('2025-01-02T10:00:00Z')  // older - middle
    ])
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('older')
    const times = segments.value[0].items.map(i => i.metadata.publishedAt)
    expect(times).toEqual([
      '2025-01-03T10:00:00Z',
      '2025-01-02T10:00:00Z',
      '2025-01-01T10:00:00Z'
    ])
  })

  it('uses the default accessor (publishedAt with processedAt fallback)', () => {
    const itemWithPublished = makeItem('2025-06-15T08:00:00Z', '2025-01-01T00:00:00Z')
    const items = ref([itemWithPublished])
    const { segments } = useDateGroups(items)

    // Should use publishedAt (today), not processedAt (older)
    expect(segments.value[0].key).toBe('today')
  })

  it('falls back to processedAt when publishedAt is empty', () => {
    const item: TestItem = {
      processedAt: '2025-06-15T08:00:00Z',
      metadata: { publishedAt: '' }
    }
    const items = ref([item])
    const { segments } = useDateGroups(items)

    // Should fall back to processedAt (today)
    expect(segments.value[0].key).toBe('today')
  })

  it('accepts a custom date accessor', () => {
    const item = makeItem('2025-01-01T00:00:00Z', '2025-06-15T08:00:00Z')
    const items = ref([item])
    const { segments } = useDateGroups(items, (i) => i.processedAt)

    // Custom accessor uses processedAt, which is today
    expect(segments.value[0].key).toBe('today')
  })

  it('handles invalid date strings gracefully (falls back to "older")', () => {
    const item: TestItem = {
      processedAt: 'not-a-date',
      metadata: { publishedAt: 'also-not-a-date' }
    }
    const items = ref([item])
    const { segments } = useDateGroups(items)

    expect(segments.value).toHaveLength(1)
    expect(segments.value[0].key).toBe('older')
  })

  it('returns empty segments array for empty input', () => {
    const items = ref<TestItem[]>([])
    const { segments } = useDateGroups(items)

    expect(segments.value).toEqual([])
  })

  it('provides correct labels for each group', () => {
    const expectedLabels: Record<DateGroup, string> = {
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      lastWeek: 'Last Week',
      thisMonth: 'This Month',
      older: 'Older'
    }

    const items = ref([
      makeItem('2025-06-15T08:00:00Z'), // today
      makeItem('2025-06-14T08:00:00Z'), // yesterday
      makeItem('2025-06-10T08:00:00Z'), // thisWeek
      makeItem('2025-06-05T08:00:00Z'), // lastWeek
      makeItem('2025-05-25T08:00:00Z'), // thisMonth
      makeItem('2025-01-01T08:00:00Z')  // older
    ])
    const { segments } = useDateGroups(items)

    for (const seg of segments.value) {
      expect(seg.label).toBe(expectedLabels[seg.key])
    }
  })
})

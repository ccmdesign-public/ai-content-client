import { describe, it, expect } from 'vitest'

/**
 * Tests for the pure filtering logic extracted from useSummariesFilter.
 * Since the composable depends on Nuxt auto-imports (useRoute, useRouter, useAsyncData),
 * we test the core Map-building and filtering algorithms directly.
 */

interface TagItem {
  id: string
  type: 'summary' | 'article'
}

interface TagData {
  categoryId: string
  items: TagItem[]
}

interface Summary {
  metadata?: { videoId?: string }
}

// Extract the pure Map-building logic from the composable
function buildCategoryVideoIdMap(allTags: TagData[]): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>()
  for (const tag of allTags) {
    const catId = tag.categoryId
    const ids = map.get(catId) || new Set<string>()
    for (const item of tag.items || []) {
      if (item.type === 'summary') {
        ids.add(item.id)
      }
    }
    map.set(catId, ids)
  }
  return map
}

// Extract the pure filtering logic from the composable
function filterSummaries(
  all: Summary[],
  selectedCategory: string | null,
  categoryVideoIdMap: Map<string, Set<string>>
): Summary[] {
  if (!selectedCategory) return all
  const ids = categoryVideoIdMap.get(selectedCategory)
  if (!ids || ids.size === 0) return []
  return all.filter((s) => ids.has(s.metadata?.videoId || ''))
}

const sampleTags: TagData[] = [
  {
    categoryId: 'ai-ml',
    items: [
      { id: 'vid-001', type: 'summary' },
      { id: 'vid-002', type: 'summary' },
      { id: 'art-001', type: 'article' } // Should be excluded from Map
    ]
  },
  {
    categoryId: 'ai-ml',
    items: [
      { id: 'vid-003', type: 'summary' },
      { id: 'vid-001', type: 'summary' } // Duplicate across tags in same category
    ]
  },
  {
    categoryId: 'web-dev',
    items: [
      { id: 'vid-004', type: 'summary' },
      { id: 'vid-005', type: 'summary' }
    ]
  },
  {
    categoryId: 'empty-cat',
    items: [
      { id: 'art-002', type: 'article' } // Only articles, no summaries
    ]
  }
]

const sampleSummaries: Summary[] = [
  { metadata: { videoId: 'vid-001' } },
  { metadata: { videoId: 'vid-002' } },
  { metadata: { videoId: 'vid-003' } },
  { metadata: { videoId: 'vid-004' } },
  { metadata: { videoId: 'vid-005' } },
  { metadata: { videoId: 'vid-006' } } // Not in any category
]

describe('buildCategoryVideoIdMap', () => {
  const map = buildCategoryVideoIdMap(sampleTags)

  it('creates a Map keyed by categoryId', () => {
    expect(map.has('ai-ml')).toBe(true)
    expect(map.has('web-dev')).toBe(true)
    expect(map.has('empty-cat')).toBe(true)
  })

  it('only includes summary-type items (excludes articles)', () => {
    const aiMl = map.get('ai-ml')!
    expect(aiMl.has('art-001')).toBe(false)
  })

  it('aggregates video IDs across multiple tags in same category', () => {
    const aiMl = map.get('ai-ml')!
    expect(aiMl.has('vid-001')).toBe(true)
    expect(aiMl.has('vid-002')).toBe(true)
    expect(aiMl.has('vid-003')).toBe(true)
  })

  it('deduplicates video IDs via Set', () => {
    const aiMl = map.get('ai-ml')!
    // vid-001 appears in two tags but should be counted once
    expect(aiMl.size).toBe(3)
  })

  it('returns empty Set for categories with only article items', () => {
    const emptyCat = map.get('empty-cat')!
    expect(emptyCat.size).toBe(0)
  })

  it('returns empty Map for empty input', () => {
    const emptyMap = buildCategoryVideoIdMap([])
    expect(emptyMap.size).toBe(0)
  })
})

describe('filterSummaries', () => {
  const map = buildCategoryVideoIdMap(sampleTags)

  it('returns all summaries when no category is selected', () => {
    const result = filterSummaries(sampleSummaries, null, map)
    expect(result).toHaveLength(6)
  })

  it('returns only matching summaries for a selected category', () => {
    const result = filterSummaries(sampleSummaries, 'ai-ml', map)
    expect(result).toHaveLength(3)
    expect(result.map(s => s.metadata?.videoId)).toEqual(
      expect.arrayContaining(['vid-001', 'vid-002', 'vid-003'])
    )
  })

  it('returns matching summaries for web-dev category', () => {
    const result = filterSummaries(sampleSummaries, 'web-dev', map)
    expect(result).toHaveLength(2)
  })

  it('returns empty array for category with no summary-type items', () => {
    const result = filterSummaries(sampleSummaries, 'empty-cat', map)
    expect(result).toHaveLength(0)
  })

  it('returns empty array for non-existent category', () => {
    const result = filterSummaries(sampleSummaries, 'non-existent', map)
    expect(result).toHaveLength(0)
  })

  it('handles empty summaries array', () => {
    const result = filterSummaries([], 'ai-ml', map)
    expect(result).toHaveLength(0)
  })

  it('handles summaries without metadata gracefully', () => {
    const badSummaries: Summary[] = [
      { metadata: { videoId: 'vid-001' } },
      { metadata: undefined },
      {}
    ]
    const result = filterSummaries(badSummaries, 'ai-ml', map)
    expect(result).toHaveLength(1)
  })
})

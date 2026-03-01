import { describe, it, expect } from 'vitest'

/**
 * Tests for the pure logic extracted from useTagsConfig.
 * Since the composable depends on Vue reactivity and Nuxt auto-imports,
 * we test the core grouping/sorting/filtering algorithms directly.
 */

interface TagConfig {
  slug: string
  name: string
  category: string
  categoryId: string
  itemCount: number
}

interface TagCategory {
  name: string
  categoryId: string
  tags: TagConfig[]
  totalItems: number
}

// Extract the pure grouping logic from the composable for testing
function groupTagsByCategory(tags: TagConfig[]): TagCategory[] {
  const categoryMap = new Map<string, TagConfig[]>()
  for (const tag of tags) {
    const existing = categoryMap.get(tag.category) || []
    existing.push(tag)
    categoryMap.set(tag.category, existing)
  }
  return Array.from(categoryMap.entries())
    .map(([name, categoryTags]) => ({
      name,
      categoryId: categoryTags[0]?.categoryId || '',
      tags: categoryTags.sort((a, b) => b.itemCount - a.itemCount),
      totalItems: categoryTags.reduce((sum, t) => sum + t.itemCount, 0)
    }))
    .sort((a, b) => b.totalItems - a.totalItems)
}

function getTopTags(tags: TagConfig[], limit: number = 5): TagConfig[] {
  return [...tags]
    .filter(t => t.itemCount > 0)
    .sort((a, b) => b.itemCount - a.itemCount)
    .slice(0, limit)
}

function getTagBySlug(tags: TagConfig[], slug: string): TagConfig | undefined {
  return tags.find(t => t.slug === slug)
}

const sampleTags: TagConfig[] = [
  { slug: 'ai-general', name: 'AI General', category: 'AI & Machine Learning', categoryId: 'ai-ml', itemCount: 328 },
  { slug: 'agents', name: 'Agents', category: 'AI & Machine Learning', categoryId: 'ai-ml', itemCount: 198 },
  { slug: 'web-dev', name: 'Web Development', category: 'Web Development', categoryId: 'web-dev', itemCount: 50 },
  { slug: 'react', name: 'React', category: 'Web Development', categoryId: 'web-dev', itemCount: 30 },
  { slug: 'empty-tag', name: 'Empty', category: 'Misc', categoryId: 'misc', itemCount: 0 },
]

describe('groupTagsByCategory', () => {
  it('groups tags into categories', () => {
    const result = groupTagsByCategory(sampleTags)
    expect(result).toHaveLength(3)
  })

  it('sorts categories by total item count descending', () => {
    const result = groupTagsByCategory(sampleTags)
    expect(result[0].name).toBe('AI & Machine Learning')
    expect(result[0].totalItems).toBe(526)
    expect(result[1].name).toBe('Web Development')
    expect(result[1].totalItems).toBe(80)
  })

  it('sorts tags within each category by item count descending', () => {
    const result = groupTagsByCategory(sampleTags)
    const aiCategory = result.find(c => c.name === 'AI & Machine Learning')!
    expect(aiCategory.tags[0].slug).toBe('ai-general')
    expect(aiCategory.tags[1].slug).toBe('agents')
  })

  it('sets categoryId from the first tag in each category', () => {
    const result = groupTagsByCategory(sampleTags)
    expect(result[0].categoryId).toBe('ai-ml')
  })

  it('returns empty array for empty input', () => {
    const result = groupTagsByCategory([])
    expect(result).toHaveLength(0)
  })
})

describe('getTopTags', () => {
  it('returns top 5 tags by item count', () => {
    const result = getTopTags(sampleTags)
    expect(result).toHaveLength(4) // only 4 have itemCount > 0
    expect(result[0].slug).toBe('ai-general')
  })

  it('excludes tags with zero items', () => {
    const result = getTopTags(sampleTags)
    expect(result.find(t => t.slug === 'empty-tag')).toBeUndefined()
  })

  it('respects custom limit', () => {
    const result = getTopTags(sampleTags, 2)
    expect(result).toHaveLength(2)
  })
})

describe('getTagBySlug', () => {
  it('finds a tag by slug', () => {
    const result = getTagBySlug(sampleTags, 'ai-general')
    expect(result).toBeDefined()
    expect(result!.name).toBe('AI General')
  })

  it('returns undefined for non-existent slug', () => {
    const result = getTagBySlug(sampleTags, 'non-existent')
    expect(result).toBeUndefined()
  })
})

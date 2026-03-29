import { describe, it, expect } from 'vitest'
import type { MasterclassIndexEntry, MasterclassCategory } from '~/types/masterclass'

/**
 * Unit tests for the masterclass index composable logic.
 *
 * Since `useMasterclassIndex` relies on Nuxt auto-imports (useRoute, useAsyncData, etc.),
 * we test the core merge, sort, search, and category filtering algorithms in isolation
 * by replicating the computed logic with pure functions.
 */

// --- Test helpers replicating composable logic ---

function makeEntry(overrides: Partial<MasterclassIndexEntry> = {}): MasterclassIndexEntry {
  return {
    slug: 'test-tool',
    name: 'Test Tool',
    category: 'tool',
    description: 'A test tool',
    tldr: null,
    hasMasterclass: false,
    sourceCount: null,
    generatedAt: null,
    tags: [],
    ...overrides,
  }
}

/** Replicates the merge logic from useMasterclassIndex: masterclass entries + tool fallbacks */
function mergeEntries(
  metadata: Array<{ slug: string; name: string; category: string; description?: string; tldr?: string; sourceCount: number; generatedAt: string; tags?: string[]; toolId?: string }>,
  tools: Array<{ slug: string; name: string; description: string; tags?: string[]; stats: { videoCount: number }; stars?: number; website?: string; github?: { repo: string } }>,
): MasterclassIndexEntry[] {
  const result: MasterclassIndexEntry[] = []
  const masterclassSlugs = new Set<string>()
  const TOOL_MENTION_THRESHOLD = 3

  for (const meta of metadata) {
    masterclassSlugs.add(meta.slug)
    const matchedTool = tools.find(t => t.slug === meta.slug)
    result.push({
      slug: meta.slug,
      name: meta.name,
      category: meta.category as MasterclassCategory,
      description: meta.description ?? matchedTool?.description ?? null,
      tldr: meta.tldr || null,
      hasMasterclass: true,
      sourceCount: meta.sourceCount,
      generatedAt: meta.generatedAt,
      tags: meta.tags ?? [],
      videoCount: matchedTool?.stats?.videoCount,
      stars: matchedTool?.stars,
      website: matchedTool?.website,
      githubRepo: matchedTool?.github?.repo ?? null,
    })
  }

  for (const tool of tools) {
    if (masterclassSlugs.has(tool.slug)) continue
    if (tool.stats.videoCount < TOOL_MENTION_THRESHOLD) continue
    result.push({
      slug: tool.slug,
      name: tool.name,
      category: 'tool',
      description: tool.description,
      tldr: null,
      hasMasterclass: false,
      sourceCount: null,
      generatedAt: null,
      tags: tool.tags ?? [],
      videoCount: tool.stats.videoCount,
      stars: tool.stars,
      website: tool.website,
      githubRepo: tool.github?.repo ?? null,
    })
  }

  return result
}

/** Replicates the filter logic */
function filterEntries(
  entries: MasterclassIndexEntry[],
  category: MasterclassCategory | null,
  searchQuery: string,
): MasterclassIndexEntry[] {
  let result = entries

  if (category) {
    result = result.filter(e => e.category === category)
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    result = result.filter(e =>
      e.name.toLowerCase().includes(q)
      || e.description?.toLowerCase().includes(q)
      || e.tldr?.toLowerCase().includes(q)
      || e.tags.some(t => t.toLowerCase().includes(q)),
    )
  }

  return result
}

/** Replicates the sort logic */
function sortEntries(
  entries: MasterclassIndexEntry[],
  sortBy: 'relevance' | 'alpha' | 'newest',
): MasterclassIndexEntry[] {
  switch (sortBy) {
    case 'alpha':
      return [...entries].sort((a, b) => a.name.localeCompare(b.name))
    case 'newest':
      return [...entries].sort((a, b) => {
        const dateA = a.generatedAt ? new Date(a.generatedAt).getTime() : 0
        const dateB = b.generatedAt ? new Date(b.generatedAt).getTime() : 0
        return dateB - dateA
      })
    case 'relevance':
    default:
      return [...entries].sort((a, b) => {
        if (a.hasMasterclass !== b.hasMasterclass) return a.hasMasterclass ? -1 : 1
        const scoreA = a.sourceCount ?? a.videoCount ?? 0
        const scoreB = b.sourceCount ?? b.videoCount ?? 0
        return scoreB - scoreA
      })
  }
}

// --- Tests ---

describe('useMasterclassIndex merge logic', () => {
  it('places masterclass entries first in the merged list', () => {
    const result = mergeEntries(
      [{ slug: 'claude', name: 'Claude', category: 'tool', sourceCount: 5, generatedAt: '2026-01-01' }],
      [
        { slug: 'claude', name: 'Claude', description: 'AI assistant', stats: { videoCount: 10 } },
        { slug: 'cursor', name: 'Cursor', description: 'Code editor', stats: { videoCount: 5 } },
      ],
    )

    expect(result).toHaveLength(2)
    expect(result[0].slug).toBe('claude')
    expect(result[0].hasMasterclass).toBe(true)
    expect(result[1].slug).toBe('cursor')
    expect(result[1].hasMasterclass).toBe(false)
  })

  it('excludes tools below the 3-video threshold', () => {
    const result = mergeEntries(
      [],
      [
        { slug: 'popular', name: 'Popular', description: 'Has videos', stats: { videoCount: 5 } },
        { slug: 'rare', name: 'Rare', description: 'Few videos', stats: { videoCount: 2 } },
      ],
    )

    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('popular')
  })

  it('does not duplicate a tool that already has a masterclass', () => {
    const result = mergeEntries(
      [{ slug: 'claude', name: 'Claude', category: 'tool', sourceCount: 5, generatedAt: '2026-01-01' }],
      [{ slug: 'claude', name: 'Claude', description: 'AI', stats: { videoCount: 10 } }],
    )

    expect(result).toHaveLength(1)
    expect(result[0].hasMasterclass).toBe(true)
  })

  it('enriches masterclass entries with tool data (stars, website, github)', () => {
    const result = mergeEntries(
      [{ slug: 'claude', name: 'Claude', category: 'tool', sourceCount: 5, generatedAt: '2026-01-01' }],
      [{ slug: 'claude', name: 'Claude', description: 'AI', stats: { videoCount: 10 }, stars: 500, website: 'https://claude.ai', github: { repo: 'anthropics/claude' } }],
    )

    expect(result[0].stars).toBe(500)
    expect(result[0].website).toBe('https://claude.ai')
    expect(result[0].githubRepo).toBe('anthropics/claude')
  })
})

describe('useMasterclassIndex sort modes', () => {
  const entries: MasterclassIndexEntry[] = [
    makeEntry({ slug: 'b', name: 'Beta', hasMasterclass: true, sourceCount: 3, generatedAt: '2026-01-10' }),
    makeEntry({ slug: 'a', name: 'Alpha', hasMasterclass: false, videoCount: 10, generatedAt: null }),
    makeEntry({ slug: 'c', name: 'Charlie', hasMasterclass: true, sourceCount: 8, generatedAt: '2026-02-15' }),
  ]

  it('relevance sort: masterclasses first, then by sourceCount/videoCount descending', () => {
    const sorted = sortEntries(entries, 'relevance')
    // Masterclasses first (c=8, b=3), then non-masterclass (a=10 videos)
    expect(sorted.map(e => e.slug)).toEqual(['c', 'b', 'a'])
  })

  it('alpha sort: alphabetical by name', () => {
    const sorted = sortEntries(entries, 'alpha')
    expect(sorted.map(e => e.slug)).toEqual(['a', 'b', 'c'])
  })

  it('newest sort: by generatedAt descending, null dates last', () => {
    const sorted = sortEntries(entries, 'newest')
    // Charlie (Feb 15) > Beta (Jan 10) > Alpha (null => 0)
    expect(sorted.map(e => e.slug)).toEqual(['c', 'b', 'a'])
  })
})

describe('useMasterclassIndex search filtering', () => {
  const entries: MasterclassIndexEntry[] = [
    makeEntry({ slug: 'claude', name: 'Claude', description: 'AI coding assistant', tags: ['ai', 'coding'] }),
    makeEntry({ slug: 'cursor', name: 'Cursor', description: 'Code editor with AI', tags: ['editor'] }),
    makeEntry({ slug: 'react', name: 'React', description: 'UI library', tags: ['frontend', 'javascript'] }),
  ]

  it('filters by name match', () => {
    const result = filterEntries(entries, null, 'claude')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('claude')
  })

  it('filters by description match', () => {
    const result = filterEntries(entries, null, 'editor')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('cursor')
  })

  it('filters by tag match', () => {
    const result = filterEntries(entries, null, 'javascript')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('react')
  })

  it('search is case-insensitive', () => {
    const result = filterEntries(entries, null, 'CLAUDE')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('claude')
  })

  it('returns all entries when search is empty', () => {
    const result = filterEntries(entries, null, '')
    expect(result).toHaveLength(3)
  })

  it('returns multiple matches for broad terms', () => {
    const result = filterEntries(entries, null, 'AI')
    expect(result).toHaveLength(2) // Claude + Cursor both mention AI
  })
})

describe('useMasterclassIndex category filtering', () => {
  const entries: MasterclassIndexEntry[] = [
    makeEntry({ slug: 'claude', name: 'Claude', category: 'tool' }),
    makeEntry({ slug: 'prompting', name: 'Prompting', category: 'technique' }),
    makeEntry({ slug: 'debugging', name: 'Debugging', category: 'skill' }),
    makeEntry({ slug: 'cursor', name: 'Cursor', category: 'tool' }),
  ]

  it('filters by category', () => {
    const result = filterEntries(entries, 'tool', '')
    expect(result).toHaveLength(2)
    expect(result.every(e => e.category === 'tool')).toBe(true)
  })

  it('returns all when category is null', () => {
    const result = filterEntries(entries, null, '')
    expect(result).toHaveLength(4)
  })

  it('combines category and search filters', () => {
    const result = filterEntries(entries, 'tool', 'cursor')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('cursor')
  })

  it('returns empty when category + search has no match', () => {
    const result = filterEntries(entries, 'skill', 'claude')
    expect(result).toHaveLength(0)
  })
})

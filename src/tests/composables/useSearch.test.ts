import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import MiniSearch from 'minisearch'
import { SEARCH_INDEX_FIELDS, SEARCH_STORE_FIELDS } from '~/types/search'
import type { SearchDocument } from '~/types/search'

// Build a small test index for unit tests
function buildTestIndex(docs: SearchDocument[]): string {
  const ms = new MiniSearch({
    fields: [...SEARCH_INDEX_FIELDS],
    storeFields: [...SEARCH_STORE_FIELDS],
  })
  ms.addAll(docs)
  return JSON.stringify(ms.toJSON())
}

const sampleDocs: SearchDocument[] = [
  {
    id: 'abc123',
    title: 'Getting Started with Claude Code',
    description: 'Learn how to use Claude Code for development',
    channel: 'Developers Digest',
    tldr: 'Claude Code enables autonomous agentic workflows using MCP.',
    toolNames: 'Claude MCP',
    date: '2026-01-05T04:04:20Z',
    type: 'summary',
    path: '/summaries/abc123',
    thumbnailUrl: 'https://example.com/thumb1.jpg',
  },
  {
    id: 'def456',
    title: 'Building AI Apps with Next.js',
    description: 'Tutorial on AI integration in Next.js applications',
    channel: 'Fireship',
    tldr: 'Next.js integrates with various AI APIs for building intelligent apps.',
    toolNames: 'Next.js Vercel',
    date: '2026-01-10T10:00:00Z',
    type: 'summary',
    path: '/summaries/def456',
    thumbnailUrl: 'https://example.com/thumb2.jpg',
  },
  {
    id: 'ghi789',
    title: 'Vim Tips for Productivity',
    description: 'Advanced Vim workflows for developers',
    channel: 'ThePrimeagen',
    tldr: 'Vim keybindings and macros for faster coding.',
    toolNames: 'Vim Neovim',
    date: '2026-02-01T12:00:00Z',
    type: 'summary',
    path: '/summaries/ghi789',
    thumbnailUrl: 'https://example.com/thumb3.jpg',
  },
]

describe('useSearch (unit-level index tests)', () => {
  it('MiniSearch indexes documents and returns ranked results', () => {
    const ms = new MiniSearch({
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    ms.addAll(sampleDocs)

    const results = ms.search('Claude Code', { boost: { title: 3, tldr: 2 }, prefix: true, fuzzy: 0.2 })
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].id).toBe('abc123')
    expect(results[0].title).toBe('Getting Started with Claude Code')
  })

  it('returns empty results for non-matching query', () => {
    const ms = new MiniSearch({
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    ms.addAll(sampleDocs)

    const results = ms.search('xyznonexistent12345')
    expect(results).toHaveLength(0)
  })

  it('prefix search matches partial terms', () => {
    const ms = new MiniSearch({
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    ms.addAll(sampleDocs)

    const results = ms.search('Clau', { prefix: true })
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].id).toBe('abc123')
  })

  it('fuzzy search matches misspellings', () => {
    const ms = new MiniSearch({
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    ms.addAll(sampleDocs)

    const results = ms.search('Clade', { fuzzy: 0.2 })
    expect(results.length).toBeGreaterThan(0)
  })

  it('boosts title matches above description matches', () => {
    const ms = new MiniSearch({
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    ms.addAll(sampleDocs)

    const results = ms.search('Vim', { boost: { title: 3, tldr: 2 } })
    expect(results[0].id).toBe('ghi789')
  })

  it('serializes and deserializes index correctly', () => {
    const serialized = buildTestIndex(sampleDocs)
    const ms = MiniSearch.loadJSON(serialized, {
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })

    const results = ms.search('Claude')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].title).toBe('Getting Started with Claude Code')
  })

  it('stored fields are present on search results', () => {
    const ms = new MiniSearch({
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    ms.addAll(sampleDocs)

    const results = ms.search('Claude')
    const result = results[0]

    expect(result.id).toBe('abc123')
    expect(result.title).toBeDefined()
    expect(result.channel).toBeDefined()
    expect(result.date).toBeDefined()
    expect(result.type).toBe('summary')
    expect(result.path).toBeDefined()
    expect(result.thumbnailUrl).toBeDefined()
    expect(result.tldr).toBeDefined()
  })

  it('handles documents with missing optional fields', () => {
    const docWithMissing: SearchDocument = {
      id: 'missing1',
      title: 'Minimal Document',
      description: '',
      channel: '',
      tldr: '',
      toolNames: '',
      date: '',
      type: 'summary',
      path: '/summaries/missing1',
      thumbnailUrl: '',
    }

    const ms = new MiniSearch({
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    ms.addAll([docWithMissing])

    const results = ms.search('Minimal')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].id).toBe('missing1')
  })
})

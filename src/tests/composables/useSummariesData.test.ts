import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SUMMARY_LIST_FIELDS } from '~/composables/useContentStream'
import { safeParseMetadata, normalizeSummaryDocs, readLocalCache, writeLocalCache } from '~/composables/useSummariesData'

describe('SUMMARY_LIST_FIELDS', () => {
  it('includes all fields required by SummaryCard', () => {
    const required = ['metadata', 'processedAt', 'tldr', 'path', 'tools']
    for (const field of required) {
      expect(SUMMARY_LIST_FIELDS).toContain(field)
    }
  })

  it('includes published field for draft filtering', () => {
    expect(SUMMARY_LIST_FIELDS).toContain('published')
  })

  it('includes playlistId for playlist page filtering', () => {
    expect(SUMMARY_LIST_FIELDS).toContain('playlistId')
  })

  it('does not include heavy fields (body, ai, seo)', () => {
    const excluded = ['body', 'ai', 'seo', 'navigation', 'description', 'meta', 'id', 'stem']
    for (const field of excluded) {
      expect(SUMMARY_LIST_FIELDS).not.toContain(field)
    }
  })
})

describe('safeParseMetadata', () => {
  it('parses valid JSON string metadata', () => {
    const result = safeParseMetadata('{"videoId":"abc","title":"Test"}')
    expect(result).toEqual({ videoId: 'abc', title: 'Test' })
  })

  it('passes through metadata that is already an object', () => {
    const obj = { videoId: 'abc', title: 'Test' }
    const result = safeParseMetadata(obj)
    expect(result).toBe(obj)
  })

  it('returns empty object for malformed JSON string', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = safeParseMetadata('{bad json', '/summaries/test')
    expect(result).toEqual({})
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[useSummariesData] Malformed metadata JSON in /summaries/test'),
      expect.any(String)
    )
    warnSpy.mockRestore()
  })

  it('returns empty object for null/undefined metadata', () => {
    expect(safeParseMetadata(null)).toEqual({})
    expect(safeParseMetadata(undefined)).toEqual({})
  })
})

describe('normalizeSummaryDocs', () => {
  it('normalizes metadata from JSON string to object', () => {
    const docs = [
      {
        metadata: JSON.stringify({ videoId: 'abc', title: 'Test' }),
        processedAt: '2025-01-15T10:00:00Z',
        tldr: 'A test summary',
        path: '/summaries/test-1'
      }
    ]

    const result = normalizeSummaryDocs(docs)
    expect(result[0].metadata).toEqual({ videoId: 'abc', title: 'Test' })
    expect(typeof result[0].metadata).toBe('object')
  })

  it('passes through metadata that is already an object', () => {
    const docs = [
      {
        metadata: { videoId: 'abc', title: 'Test' },
        processedAt: '2025-01-15T10:00:00Z',
        tldr: 'A test summary',
        path: '/summaries/test-2'
      }
    ]

    const result = normalizeSummaryDocs(docs)
    expect(result[0].metadata).toEqual({ videoId: 'abc', title: 'Test' })
  })

  it('handles malformed metadata gracefully without crashing', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const docs = [
      {
        metadata: '{invalid-json}',
        processedAt: '2025-01-15T10:00:00Z',
        tldr: 'Good summary',
        path: '/summaries/good'
      },
      {
        metadata: JSON.stringify({ videoId: 'def' }),
        processedAt: '2025-01-16T10:00:00Z',
        tldr: 'Another summary',
        path: '/summaries/another'
      }
    ]

    const result = normalizeSummaryDocs(docs)
    // Bad doc gets empty metadata, does not crash other docs
    expect(result).toHaveLength(2)
    expect(result[0].metadata).toEqual({})
    expect(result[1].metadata).toEqual({ videoId: 'def' })
    expect(warnSpy).toHaveBeenCalledTimes(1)
    warnSpy.mockRestore()
  })

  it('handles null/undefined data gracefully', () => {
    const result = normalizeSummaryDocs([])
    expect(result).toEqual([])
  })

  it('preserves all other document fields', () => {
    const docs = [
      {
        metadata: { videoId: 'abc' },
        processedAt: '2025-01-15T10:00:00Z',
        tldr: 'Summary',
        path: '/summaries/test',
        tools: ['tool1'],
        playlistId: 'pl-1',
        category: 'tech'
      }
    ]

    const result = normalizeSummaryDocs(docs)
    expect(result[0].processedAt).toBe('2025-01-15T10:00:00Z')
    expect(result[0].tldr).toBe('Summary')
    expect(result[0].tools).toEqual(['tool1'])
    expect(result[0].playlistId).toBe('pl-1')
    expect(result[0].category).toBe('tech')
  })

  it('pre-computes _publishedAtMs from metadata.publishedAt', () => {
    const docs = [
      {
        metadata: { publishedAt: '2025-06-15T12:00:00Z' },
        processedAt: '2025-06-16T10:00:00Z',
        path: '/summaries/test'
      }
    ]

    const result = normalizeSummaryDocs(docs)
    expect(result[0]._publishedAtMs).toBe(new Date('2025-06-15T12:00:00Z').getTime())
  })

  it('pre-computes _processedAtMs from processedAt', () => {
    const docs = [
      {
        metadata: { publishedAt: '2025-06-15T12:00:00Z' },
        processedAt: '2025-06-16T10:00:00Z',
        path: '/summaries/test'
      }
    ]

    const result = normalizeSummaryDocs(docs)
    expect(result[0]._processedAtMs).toBe(new Date('2025-06-16T10:00:00Z').getTime())
  })

  it('sets _publishedAtMs to 0 when publishedAt is missing', () => {
    const docs = [
      {
        metadata: {},
        processedAt: '2025-06-16T10:00:00Z',
        path: '/summaries/test'
      }
    ]

    const result = normalizeSummaryDocs(docs)
    expect(result[0]._publishedAtMs).toBe(0)
  })

  it('sets _processedAtMs to 0 when processedAt is missing', () => {
    const docs = [
      {
        metadata: { publishedAt: '2025-06-15T12:00:00Z' },
        path: '/summaries/test'
      }
    ]

    const result = normalizeSummaryDocs(docs)
    expect(result[0]._processedAtMs).toBe(0)
  })
})

describe('readLocalCache', () => {
  let getItemSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mock localStorage for Node/SSR environment
    if (typeof globalThis.localStorage === 'undefined') {
      (globalThis as any).localStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
        length: 0,
        key: vi.fn(),
      }
    }
    getItemSpy = vi.spyOn(localStorage, 'getItem')
  })

  afterEach(() => {
    getItemSpy.mockRestore()
  })

  it('returns null when localStorage has no cache entry', () => {
    getItemSpy.mockReturnValue(null)
    expect(readLocalCache()).toBeNull()
  })

  it('returns null for corrupt JSON in localStorage', () => {
    getItemSpy.mockReturnValue('{bad-json}')
    expect(readLocalCache()).toBeNull()
  })

  it('returns null when cached data is not an array', () => {
    getItemSpy.mockReturnValue(JSON.stringify({ version: 1, cachedAt: Date.now(), data: 'not-array' }))
    expect(readLocalCache()).toBeNull()
  })

  it('returns null when cachedAt is missing', () => {
    getItemSpy.mockReturnValue(JSON.stringify({ version: 1, data: [] }))
    expect(readLocalCache()).toBeNull()
  })

  it('returns null for wrong cache version', () => {
    getItemSpy.mockReturnValue(JSON.stringify({ version: 999, cachedAt: Date.now(), data: [], count: 0 }))
    expect(readLocalCache()).toBeNull()
  })

  it('returns valid cache entry', () => {
    const entry = { version: 1, cachedAt: Date.now(), count: 2, data: [{ id: 1 }, { id: 2 }] }
    getItemSpy.mockReturnValue(JSON.stringify(entry))
    const result = readLocalCache()
    expect(result).toEqual(entry)
  })

  it('returns null when localStorage throws (private browsing)', () => {
    getItemSpy.mockImplementation(() => { throw new Error('QuotaExceededError') })
    expect(readLocalCache()).toBeNull()
  })
})

describe('writeLocalCache', () => {
  let setItemSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    if (typeof globalThis.localStorage === 'undefined') {
      (globalThis as any).localStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
        length: 0,
        key: vi.fn(),
      }
    }
    setItemSpy = vi.spyOn(localStorage, 'setItem')
  })

  afterEach(() => {
    setItemSpy.mockRestore()
  })

  it('writes cache entry to localStorage', () => {
    const data = [{ id: 1 }, { id: 2 }]
    writeLocalCache(data)
    expect(setItemSpy).toHaveBeenCalledTimes(1)
    const written = JSON.parse(setItemSpy.mock.calls[0][1])
    expect(written.version).toBe(1)
    expect(written.count).toBe(2)
    expect(written.data).toEqual(data)
    expect(written.cachedAt).toBeGreaterThan(0)
  })

  it('does not throw when localStorage quota is exceeded', () => {
    setItemSpy.mockImplementation(() => { throw new Error('QuotaExceededError') })
    expect(() => writeLocalCache([{ id: 1 }])).not.toThrow()
  })
})

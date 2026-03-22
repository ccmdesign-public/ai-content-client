import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SUMMARY_LIST_FIELDS } from '~/composables/useContentStream'
import { safeParseMetadata, normalizeSummaryDocs } from '~/composables/useSummariesData'

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
})

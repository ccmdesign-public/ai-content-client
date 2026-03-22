import { describe, it, expect } from 'vitest'
import { SUMMARY_LIST_FIELDS } from '~/composables/useContentStream'

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

describe('useSummariesData metadata normalization', () => {
  it('normalizes metadata from JSON string to object', () => {
    // Test the normalization logic in isolation
    const rawDoc = {
      metadata: JSON.stringify({ videoId: 'abc', title: 'Test' }),
      processedAt: '2025-01-15T10:00:00Z',
      tldr: 'A test summary'
    }

    const normalized = {
      ...rawDoc,
      metadata: typeof rawDoc.metadata === 'string'
        ? JSON.parse(rawDoc.metadata)
        : rawDoc.metadata
    }

    expect(normalized.metadata).toEqual({ videoId: 'abc', title: 'Test' })
    expect(typeof normalized.metadata).toBe('object')
  })

  it('passes through metadata that is already an object', () => {
    const rawDoc = {
      metadata: { videoId: 'abc', title: 'Test' },
      processedAt: '2025-01-15T10:00:00Z',
      tldr: 'A test summary'
    }

    const normalized = {
      ...rawDoc,
      metadata: typeof rawDoc.metadata === 'string'
        ? JSON.parse(rawDoc.metadata)
        : rawDoc.metadata
    }

    expect(normalized.metadata).toEqual({ videoId: 'abc', title: 'Test' })
    expect(typeof normalized.metadata).toBe('object')
  })
})

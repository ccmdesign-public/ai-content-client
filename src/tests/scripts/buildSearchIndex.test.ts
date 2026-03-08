import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import MiniSearch from 'minisearch'
import { SEARCH_INDEX_FIELDS, SEARCH_STORE_FIELDS } from '~/types/search'

const __dirname = dirname(fileURLToPath(import.meta.url))
const INDEX_PATH = resolve(__dirname, '..', '..', '..', 'src', 'public', 'search-index.json')

/**
 * Integration tests for the build-time search index.
 * These tests validate the output of `scripts/build-search-index.ts`.
 * Run `npm run build:search-index` before running these tests.
 */
describe('buildSearchIndex output', () => {
  it('search-index.json exists', () => {
    expect(existsSync(INDEX_PATH)).toBe(true)
  })

  it('contains a valid MiniSearch serialized index', () => {
    const raw = readFileSync(INDEX_PATH, 'utf-8')
    const ms = MiniSearch.loadJSON(raw, {
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    expect(ms).toBeDefined()
    expect(ms.documentCount).toBeGreaterThan(0)
  })

  it('indexes at least 300 documents (known summary count)', () => {
    const raw = readFileSync(INDEX_PATH, 'utf-8')
    const ms = MiniSearch.loadJSON(raw, {
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    expect(ms.documentCount).toBeGreaterThanOrEqual(300)
  })

  it('returns results for a search query', () => {
    const raw = readFileSync(INDEX_PATH, 'utf-8')
    const ms = MiniSearch.loadJSON(raw, {
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    // "Claude" should match at least one summary
    const results = ms.search('Claude', { prefix: true })
    expect(results.length).toBeGreaterThan(0)
  })

  it('stored fields include required display fields', () => {
    const raw = readFileSync(INDEX_PATH, 'utf-8')
    const ms = MiniSearch.loadJSON(raw, {
      fields: [...SEARCH_INDEX_FIELDS],
      storeFields: [...SEARCH_STORE_FIELDS],
    })
    const results = ms.search('Claude', { prefix: true })
    expect(results.length).toBeGreaterThan(0)
    const result = results[0]

    expect(result.id).toBeDefined()
    expect(result.title).toBeDefined()
    expect(result.type).toBe('summary')
    expect(result.path).toBeDefined()
  })

  it('does not contain sensitive AI metrics fields as top-level keys', () => {
    const raw = readFileSync(INDEX_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    // Check that the serialized index structure does not contain ai metrics fields
    // in the field list (these would indicate accidental indexing of sensitive data)
    const fieldIds = parsed.fieldIds || {}
    const fieldNames = Object.keys(fieldIds)
    expect(fieldNames).not.toContain('ai')
    expect(fieldNames).not.toContain('apiCalls')
    expect(fieldNames).not.toContain('inputTokens')
    expect(fieldNames).not.toContain('outputTokens')
  })

  it('index size is within budget (< 1MB raw)', () => {
    const raw = readFileSync(INDEX_PATH, 'utf-8')
    const sizeKB = Buffer.byteLength(raw) / 1024
    expect(sizeKB).toBeLessThan(1024) // Under 1MB
  })
})

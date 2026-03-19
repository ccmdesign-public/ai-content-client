/**
 * Build-time search index generator.
 *
 * Reads all summary markdown files, parses YAML frontmatter, and builds a
 * MiniSearch index serialized to src/public/search-index.json.
 *
 * This is a parallel data path to useContentStream (which uses Nuxt Content's
 * SQL layer). If the content schema changes, both paths must be updated.
 *
 * Run: npx tsx scripts/build-search-index.ts
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import MiniSearch from 'minisearch'
import { parse as parseYaml } from 'yaml'
import { SEARCH_INDEX_FIELDS, SEARCH_STORE_FIELDS } from '../src/types/search'
import type { SearchDocument } from '../src/types/search'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUMMARIES_DIR = resolve(__dirname, '..', 'src/content/summaries')
const OUTPUT_PATH = resolve(__dirname, '..', 'src/public/search-index.json')

/**
 * Extract YAML frontmatter from a markdown file.
 * Returns the parsed frontmatter object, or null if parsing fails.
 */
function extractFrontmatter(content: string): Record<string, any> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  try {
    return parseYaml(match[1])
  } catch {
    return null
  }
}

/**
 * Build a flat SearchDocument from parsed frontmatter.
 */
/**
 * Read and flatten transcript.json for a given video directory.
 * Filters out short overlap fragments (duration <= 0.5s) from yt-dlp output.
 */
function readTranscript(dirPath: string): string {
  const transcriptPath = resolve(dirPath, 'transcript.json')
  if (!existsSync(transcriptPath)) return ''
  try {
    const raw = JSON.parse(readFileSync(transcriptPath, 'utf-8'))
    if (!raw?.segments?.length) return ''
    return raw.segments
      .filter((s: any) => s.duration > 0.5)
      .map((s: any) => s.text)
      .join(' ')
  } catch {
    return ''
  }
}

function toSearchDocument(frontmatter: Record<string, any>, dirPath: string): SearchDocument | null {
  const metadata = frontmatter.metadata
  if (!metadata?.videoId || !metadata?.title) return null

  return {
    id: metadata.videoId,
    title: metadata.title,
    description: (metadata.description || '').slice(0, 200),
    channel: metadata.channel || '',
    tldr: frontmatter.tldr || '',
    toolNames: (frontmatter.tools || []).map((t: any) => t?.name).filter(Boolean).join(' '),
    transcript: readTranscript(dirPath),
    date: metadata.publishedAt || frontmatter.processedAt || '',
    type: 'summary',
    path: `/summaries/${metadata.videoId}`,
    thumbnailUrl: metadata.thumbnailUrl || '',
  }
}

function buildIndex(): void {
  if (!existsSync(SUMMARIES_DIR)) {
    console.error(`[build-search-index] Summaries directory not found: ${SUMMARIES_DIR}`)
    process.exit(1)
  }

  const dirs = readdirSync(SUMMARIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())

  const documents: SearchDocument[] = []

  for (const dir of dirs) {
    const mdPath = resolve(SUMMARIES_DIR, dir.name, 'summary.md')
    if (!existsSync(mdPath)) continue

    try {
      const content = readFileSync(mdPath, 'utf-8')
      const frontmatter = extractFrontmatter(content)
      if (!frontmatter) continue

      const doc = toSearchDocument(frontmatter, resolve(SUMMARIES_DIR, dir.name))
      if (doc) documents.push(doc)
    } catch (err) {
      console.warn(`[build-search-index] Skipping ${dir.name}: ${err}`)
    }
  }

  // Build the MiniSearch index
  const miniSearch = new MiniSearch({
    fields: [...SEARCH_INDEX_FIELDS],
    storeFields: [...SEARCH_STORE_FIELDS],
  })

  miniSearch.addAll(documents)

  // Serialize and write
  const serialized = JSON.stringify(miniSearch.toJSON())
  writeFileSync(OUTPUT_PATH, serialized, 'utf-8')

  console.log(`[build-search-index] Indexed ${documents.length} documents -> ${OUTPUT_PATH}`)
  console.log(`[build-search-index] Index size: ${(Buffer.byteLength(serialized) / 1024).toFixed(1)} KB`)
}

buildIndex()

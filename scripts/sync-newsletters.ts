/**
 * sync-newsletters.ts
 *
 * Converts NewsletterDraft JSON files from ai-content-scraper into
 * Markdown files with YAML frontmatter for Nuxt Content ingestion.
 *
 * Usage:
 *   npx tsx scripts/sync-newsletters.ts <source-dir>
 *
 * Example:
 *   npx tsx scripts/sync-newsletters.ts ../ai-content-scraper/data/newsletter-drafts/
 *
 * Output: one .md file per newsletter in src/content/newsletters/YYYY-MM-DD.md
 * Idempotent: skips files that already exist (by date).
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { stringify as yamlStringify } from 'yaml'

interface ContentItem {
  title: string
  url: string
  source: string
  summary: string
}

interface NewsletterDraft {
  subjectLine: string
  editorialIntro: string
  featuredPicks: Array<{
    item: ContentItem
    commentary: string
  }>
  quickLinks: Array<{
    item: ContentItem
    oneLiner: string
  }>
  closing: string
  generatedAt: string
}

const OUTPUT_DIR = resolve(__dirname, '..', 'src/content/newsletters')

function extractDate(generatedAt: string): string {
  // Extract YYYY-MM-DD from an ISO datetime string
  return generatedAt.substring(0, 10)
}

function convertDraft(draft: NewsletterDraft): { filename: string; content: string } {
  const dateSlug = extractDate(draft.generatedAt)
  const filename = `${dateSlug}.md`

  const frontmatter = {
    subjectLine: draft.subjectLine,
    editorialIntro: draft.editorialIntro,
    featuredPicks: draft.featuredPicks.map(fp => ({
      title: fp.item.title,
      url: fp.item.url,
      source: fp.item.source,
      summary: fp.item.summary,
      commentary: fp.commentary,
    })),
    quickLinks: draft.quickLinks.map(ql => ({
      title: ql.item.title,
      url: ql.item.url,
      source: ql.item.source,
      oneLiner: ql.oneLiner,
    })),
    closing: draft.closing,
    publishedAt: dateSlug,
  }

  // Use yaml library for safe serialization (handles special chars)
  const yamlStr = yamlStringify(frontmatter, { lineWidth: 0 })

  const body = draft.editorialIntro

  const content = `---\n${yamlStr}---\n\n${body}\n`

  return { filename, content }
}

function main() {
  const sourceDir = process.argv[2]

  if (!sourceDir) {
    console.error('Usage: npx tsx scripts/sync-newsletters.ts <source-directory>')
    console.error('Example: npx tsx scripts/sync-newsletters.ts ../ai-content-scraper/data/newsletter-drafts/')
    process.exit(1)
  }

  const resolvedSource = resolve(sourceDir)

  if (!existsSync(resolvedSource)) {
    console.error(`Source directory not found: ${resolvedSource}`)
    process.exit(1)
  }

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const files = readdirSync(resolvedSource).filter(f => f.endsWith('.json'))

  if (files.length === 0) {
    console.log('No JSON files found in source directory.')
    return
  }

  let created = 0
  let skipped = 0

  for (const file of files) {
    const filePath = join(resolvedSource, file)
    try {
      const raw = readFileSync(filePath, 'utf-8')
      const draft: NewsletterDraft = JSON.parse(raw)

      const { filename, content } = convertDraft(draft)
      const outputPath = join(OUTPUT_DIR, filename)

      if (existsSync(outputPath)) {
        console.log(`  SKIP  ${filename} (already exists)`)
        skipped++
        continue
      }

      writeFileSync(outputPath, content, 'utf-8')
      console.log(`  CREATE  ${filename}`)
      created++
    } catch (err) {
      console.error(`  ERROR  ${basename(file)}: ${(err as Error).message}`)
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}`)
}

main()

#!/usr/bin/env tsx

/**
 * Sync tag indexes from the scraper repo to the client.
 *
 * 1. Copies all per-tag .yml files verbatim from scraper src/content/tags/
 * 2. Converts the master index.yml into tags-index.json for static import
 * 3. Validates file counts and reports results
 *
 * Usage:
 *   npx tsx scripts/sync-tags.ts
 *   npm run sync:tags
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, copyFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { parse as parseYaml } from 'yaml'

const SCRIPT_DIR = import.meta.dirname ?? resolve(import.meta.url.replace('file://', ''), '..')
const PROJECT_ROOT = resolve(SCRIPT_DIR, '..')
const SCRAPER_TAGS_DIR = resolve(
  process.env.SCRAPER_REPO_PATH || resolve(PROJECT_ROOT, '../../ai-content-scraper'),
  'src/content/tags'
)
const CLIENT_TAGS_DIR = resolve(PROJECT_ROOT, 'src/content/tags')
const CLIENT_TAGS_JSON = resolve(PROJECT_ROOT, 'src/content/tags-index.json')

/**
 * Acronym and special-case map for generating human-readable tag names.
 * Keys are lowercase slug segments; values are their correct display form.
 */
const SPECIAL_CASES: Record<string, string> = {
  'ai': 'AI', 'ml': 'ML', 'nlp': 'NLP', 'llm': 'LLM', 'llms': 'LLMs',
  'mcp': 'MCP', 'rag': 'RAG', 'ci': 'CI', 'cd': 'CD',
  'gcp': 'GCP', 'aws': 'AWS', 'sql': 'SQL', 'seo': 'SEO',
  'css': 'CSS', 'html': 'HTML', 'api': 'API', 'ui': 'UI', 'ux': 'UX',
  'ios': 'iOS', 'saas': 'SaaS', 'paas': 'PaaS', 'iaas': 'IaaS',
  'nextjs': 'Next.js', 'nodejs': 'Node.js', 'vuejs': 'Vue.js',
  'graphql': 'GraphQL', 'mongodb': 'MongoDB', 'postgresql': 'PostgreSQL',
  'oauth': 'OAuth', 'jwt': 'JWT', 'sdk': 'SDK', 'cli': 'CLI',
  'devops': 'DevOps', 'devin': 'Devin', 'openai': 'OpenAI',
}

/** Convert a kebab-case slug to a human-readable name, respecting acronyms. */
export function slugToDisplayName(slug: string): string {
  return slug
    .split('-')
    .map(word => SPECIAL_CASES[word] ?? (word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

interface TagIndexEntry {
  id: string
  category: string
  categoryId: string
  itemCount: number
}

interface MasterIndex {
  _meta: {
    generatedAt: string
    schemaVersion: string
    totalTags: number
    totalItems: number
    totalTagAssignments: number
  }
  tags: TagIndexEntry[]
}

function main() {
  console.log('🏷️  Tag Index Sync\n')

  // 1. Validate source exists
  if (!existsSync(SCRAPER_TAGS_DIR)) {
    console.error(`❌ Scraper tags directory not found: ${SCRAPER_TAGS_DIR}`)
    console.error('   Make sure the ai-content-scraper repo is checked out alongside this repo,')
    console.error('   or set SCRAPER_REPO_PATH to the absolute path of the scraper repo.')
    process.exit(1)
  }

  // 2. Ensure client tags directory exists
  if (!existsSync(CLIENT_TAGS_DIR)) {
    mkdirSync(CLIENT_TAGS_DIR, { recursive: true })
    console.log(`  Created directory: ${CLIENT_TAGS_DIR}`)
  }

  // 3. Read source files
  const sourceFiles = readdirSync(SCRAPER_TAGS_DIR).filter(f => f.endsWith('.yml'))
  console.log(`  Found ${sourceFiles.length} .yml files in scraper tags directory.`)

  // 4. Copy all .yml files verbatim (including index.yml)
  let copiedCount = 0
  for (const file of sourceFiles) {
    const src = join(SCRAPER_TAGS_DIR, file)
    const dest = join(CLIENT_TAGS_DIR, file)
    copyFileSync(src, dest)
    copiedCount++
  }
  console.log(`  Copied ${copiedCount} .yml files to client.\n`)

  // 5. Convert index.yml -> tags-index.json for static import
  const indexPath = join(SCRAPER_TAGS_DIR, 'index.yml')
  if (!existsSync(indexPath)) {
    console.error('❌ Master index.yml not found in scraper tags directory.')
    process.exit(1)
  }

  const indexContent = readFileSync(indexPath, 'utf-8')
  const masterIndex: MasterIndex = parseYaml(indexContent)

  if (!masterIndex.tags || !Array.isArray(masterIndex.tags)) {
    console.error('❌ Invalid master index: missing "tags" array.')
    process.exit(1)
  }

  // Convert to JSON array with slug (using id as slug), name (human-readable from id), category, and itemCount
  const tagsJson = masterIndex.tags.map(tag => ({
    slug: tag.id,
    name: slugToDisplayName(tag.id),
    category: tag.category,
    categoryId: tag.categoryId,
    itemCount: tag.itemCount
  }))

  writeFileSync(CLIENT_TAGS_JSON, JSON.stringify(tagsJson, null, 2) + '\n', 'utf-8')
  console.log(`  Generated tags-index.json with ${tagsJson.length} tags.`)

  // 6. Validate
  const perTagFiles = sourceFiles.filter(f => f !== 'index.yml')
  if (perTagFiles.length !== masterIndex.tags.length) {
    console.warn(`  ⚠️  Warning: ${perTagFiles.length} per-tag files vs ${masterIndex.tags.length} entries in index.yml`)
  } else {
    console.log(`  ✅ Validation passed: ${perTagFiles.length} per-tag files match index entries.`)
  }

  // 7. Summary
  console.log(`\n📊 Sync Summary:`)
  console.log(`  Total tags:       ${masterIndex._meta.totalTags}`)
  console.log(`  Total items:      ${masterIndex._meta.totalItems}`)
  console.log(`  Files copied:     ${copiedCount}`)
  console.log(`  JSON generated:   tags-index.json`)
  console.log(`\n✨ Tag sync complete!\n`)
}

main()

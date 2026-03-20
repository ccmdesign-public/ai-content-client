import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const contentDir = resolve('src/content/summaries')
const outputDir = resolve('src/public/transcripts')

if (!existsSync(contentDir)) {
  console.log('No summaries directory found, skipping transcript copy')
  process.exit(0)
}

mkdirSync(outputDir, { recursive: true })

let count = 0
for (const slug of readdirSync(contentDir)) {
  const src = resolve(contentDir, slug, 'transcript.json')
  if (existsSync(src)) {
    cpSync(src, resolve(outputDir, `${slug}.json`))
    count++
  }
}

console.log(`Copied ${count} transcripts to public/transcripts/`)

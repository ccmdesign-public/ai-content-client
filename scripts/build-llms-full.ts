/**
 * Build script: generates `src/public/llms-full.txt`
 *
 * Concatenates all tool guide content into a single file for LLM consumption.
 * Uses tools.yml as the data source (pre-AIC-50 fallback). After AIC-50
 * merges, this should read from `src/content/guides/` *.md files instead.
 *
 * If the output exceeds 5MB, it splits into per-category files.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import type { Tool, ToolsYaml } from '../src/types/tools'

// Inline category logic (scripts can't use Nitro auto-imports)
const TOOL_CATEGORIES: Record<string, string> = {
  'claude code': 'AI & ML', 'claude': 'AI & ML', 'model context protocol': 'AI & ML',
  'mcp': 'AI & ML', 'dspy': 'AI & ML', 'baml': 'AI & ML', 'whisper': 'AI & ML',
  'openai': 'AI & ML', 'anthropic': 'AI & ML', 'gemini': 'AI & ML', 'cursor': 'AI & ML',
  'copilot': 'AI & ML', 'chatgpt': 'AI & ML', 'gpt-4': 'AI & ML', 'llm': 'AI & ML',
  'langchain': 'AI & ML', 'llamaindex': 'AI & ML', 'ollama': 'AI & ML',
  'hugging face': 'AI & ML', 'stable diffusion': 'AI & ML', 'midjourney': 'AI & ML',
  'git': 'Developer Tools', 'github': 'Developer Tools', 'gitlab': 'Developer Tools',
  'vscode': 'Developer Tools', 'visual studio code': 'Developer Tools',
  'neovim': 'Developer Tools', 'vim': 'Developer Tools', 'terminal': 'Developer Tools',
  'npm': 'Developer Tools', 'yarn': 'Developer Tools', 'pnpm': 'Developer Tools',
  'homebrew': 'Developer Tools', 'postman': 'Developer Tools',
  'react': 'Frameworks', 'vue': 'Frameworks', 'nuxt': 'Frameworks',
  'next.js': 'Frameworks', 'nextjs': 'Frameworks', 'svelte': 'Frameworks',
  'angular': 'Frameworks', 'tailwind css': 'Frameworks', 'tailwindcss': 'Frameworks',
  'django': 'Frameworks', 'fastapi': 'Frameworks', 'express': 'Frameworks',
  'node.js': 'Frameworks', 'nodejs': 'Frameworks',
  'docker': 'Cloud & DevOps', 'kubernetes': 'Cloud & DevOps', 'aws': 'Cloud & DevOps',
  'gcp': 'Cloud & DevOps', 'azure': 'Cloud & DevOps', 'vercel': 'Cloud & DevOps',
  'netlify': 'Cloud & DevOps', 'cloudflare': 'Cloud & DevOps', 'terraform': 'Cloud & DevOps',
  'figma': 'Design', 'sketch': 'Design', 'canva': 'Design', 'framer': 'Design',
  'notion': 'Productivity', 'slack': 'Productivity', 'obsidian': 'Productivity',
  'linear': 'Productivity', 'jira': 'Productivity', 'trello': 'Productivity',
}

function categorizeTool(name: string): string {
  return TOOL_CATEGORIES[name.toLowerCase()] || 'Other'
}

const FIVE_MB = 5 * 1024 * 1024
const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

function buildToolEntry(tool: Tool): string {
  const desc = tool.description || `${tool.name} is mentioned in ${tool.stats.videoCount} videos.`
  const lines: string[] = [
    '---',
    `# ${tool.name}`,
    `source: ${siteUrl}/guides/${tool.slug}`,
    '---',
    '',
    desc,
    '',
    `- Category: ${tool.category}`,
    `- Mentioned in: ${tool.stats.videoCount} videos`,
    `- First mentioned: ${tool.stats.firstMentioned.split('T')[0]}`,
    `- Last mentioned: ${tool.stats.lastMentioned.split('T')[0]}`,
  ]

  if (tool.website) lines.push(`- Website: ${tool.website}`)
  if (tool.github?.repo) lines.push(`- GitHub: https://github.com/${tool.github.repo}`)

  if (tool.relatedTools.length > 0) {
    lines.push('')
    lines.push('Related tools: ' + tool.relatedTools.slice(0, 5).map(r => r.id).join(', '))
  }

  lines.push('')
  return lines.join('\n')
}

// Main
const toolsPath = resolve(process.cwd(), 'src/content/tools.yml')
const toolsYaml = readFileSync(toolsPath, 'utf-8')
const { tools: toolsMap } = parseYaml(toolsYaml) as ToolsYaml

const tools = Object.values(toolsMap)
  .sort((a, b) => b.stats.videoCount - a.stats.videoCount)

console.log(`Processing ${tools.length} tools...`)

// Build full content
const header = [
  '# AI Content Guides -- Full Text',
  '',
  `> Generated from ${tools.length} tool entries.`,
  `> Source: ${siteUrl}`,
  `> Individual guides: ${siteUrl}/guides.md`,
  '',
].join('\n')

const entries = tools.map(buildToolEntry)
const fullContent = header + entries.join('\n')

const outputDir = resolve(process.cwd(), 'src/public')
mkdirSync(outputDir, { recursive: true })

const fullPath = resolve(outputDir, 'llms-full.txt')
const sizeBytes = Buffer.byteLength(fullContent, 'utf-8')

if (sizeBytes > FIVE_MB) {
  // Split by category
  console.log(`Output is ${(sizeBytes / 1024 / 1024).toFixed(1)}MB -- splitting by category...`)

  const grouped = new Map<string, Tool[]>()
  for (const tool of tools) {
    const cat = categorizeTool(tool.name)
    if (!grouped.has(cat)) grouped.set(cat, [])
    grouped.get(cat)!.push(tool)
  }

  for (const [category, catTools] of grouped) {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
    const catHeader = `# AI Content Guides -- ${category}\n\n> ${catTools.length} tools\n\n`
    const catContent = catHeader + catTools.map(buildToolEntry).join('\n')
    const catPath = resolve(outputDir, `llms-${slug}.txt`)
    writeFileSync(catPath, catContent, 'utf-8')
    console.log(`  ${catPath} (${(Buffer.byteLength(catContent) / 1024).toFixed(0)}KB)`)
  }

  // Write a stub llms-full.txt that points to the splits
  const stubLines = [header, '## Category Files\n']
  for (const category of grouped.keys()) {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
    stubLines.push(`- [${category}](${siteUrl}/llms-${slug}.txt)`)
  }
  writeFileSync(fullPath, stubLines.join('\n'), 'utf-8')
  console.log(`  ${fullPath} (index stub)`)
} else {
  writeFileSync(fullPath, fullContent, 'utf-8')
  console.log(`Written: ${fullPath} (${(sizeBytes / 1024).toFixed(0)}KB, ${tools.length} tools)`)
}

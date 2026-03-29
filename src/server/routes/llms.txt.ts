import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import type { ToolsYaml } from '~/types/tools'
import { categorizeTool } from '~/server/utils/tool-categories'

/**
 * /llms.txt -- machine-readable site index for LLM agents.
 *
 * Lists all tool guides grouped by category with links to individual
 * markdown endpoints and the full concatenated file.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'

  // Read tools.yml (same pattern as tools-with-stars.json.ts)
  const toolsPath = resolve(process.cwd(), 'src/content/tools.yml')
  const toolsYaml = readFileSync(toolsPath, 'utf-8')
  const { tools: toolsMap } = parseYaml(toolsYaml) as ToolsYaml

  // Convert to array and sort by video count
  const tools = Object.values(toolsMap)
    .sort((a, b) => b.stats.videoCount - a.stats.videoCount)

  // Group by category using the shared utility
  const grouped = new Map<string, typeof tools>()
  for (const tool of tools) {
    const category = categorizeTool(tool.name)
    if (!grouped.has(category)) grouped.set(category, [])
    grouped.get(category)!.push(tool)
  }

  // Build llms.txt output
  const lines: string[] = [
    '# AI Content Guides',
    '',
    '> Tool guides and technique references for AI developers.',
    `> Source: ${siteUrl}`,
    '',
    '## Full Content',
    '',
    `- [All Guides (full text)](${siteUrl}/llms-full.txt)`,
    `- [Guides Directory (markdown)](${siteUrl}/guides.md)`,
    '',
    '## Guides by Category',
    '',
  ]

  // Ordered categories
  const categoryOrder = [
    'AI & ML',
    'Developer Tools',
    'Frameworks',
    'Cloud & DevOps',
    'Design',
    'Productivity',
    'Other',
  ]

  for (const category of categoryOrder) {
    const categoryTools = grouped.get(category)
    if (!categoryTools || categoryTools.length === 0) continue

    lines.push(`### ${category}`)
    for (const tool of categoryTools) {
      const desc = tool.description || `Mentioned in ${tool.stats.videoCount} videos`
      lines.push(`- [${tool.name}](${siteUrl}/guides/${tool.slug}.md): ${desc}`)
    }
    lines.push('')
  }

  const output = lines.join('\n')

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return output
})

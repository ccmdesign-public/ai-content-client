import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import type { ToolsYaml } from '~/types/tools'
import { categorizeTool, CATEGORY_ORDER } from '~/server/utils/tool-categories'

/**
 * /guides.md -- markdown directory of all tool guides.
 *
 * Provides a browsable list of all guides grouped by category,
 * designed for both human readers and LLM agents.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'

  // Read tools.yml
  const toolsPath = resolve(process.cwd(), 'src/content/tools.yml')
  const toolsYaml = readFileSync(toolsPath, 'utf-8')
  const { tools: toolsMap } = parseYaml(toolsYaml) as ToolsYaml

  // Convert to array and sort by video count
  const tools = Object.values(toolsMap)
    .sort((a, b) => b.stats.videoCount - a.stats.videoCount)

  // Group by category
  const grouped = new Map<string, typeof tools>()
  for (const tool of tools) {
    const category = categorizeTool(tool.name)
    if (!grouped.has(category)) grouped.set(category, [])
    grouped.get(category)!.push(tool)
  }

  const totalCount = tools.length

  const lines: string[] = [
    '# AI Content Guides Directory',
    '',
    `> ${totalCount} guides available. Each guide covers what you need to know`,
    '> as a human operator and what your AI agent needs to know.',
    '',
    `Full text of all guides: [llms-full.txt](${siteUrl}/llms-full.txt)`,
    '',
  ]

  for (const category of CATEGORY_ORDER) {
    const categoryTools = grouped.get(category)
    if (!categoryTools || categoryTools.length === 0) continue

    lines.push(`## ${category}`)
    lines.push('')
    for (const tool of categoryTools) {
      const desc = tool.description || `Mentioned in ${tool.stats.videoCount} videos`
      lines.push(`- [${tool.name}](${siteUrl}/guides/${tool.slug}.md) -- ${desc}`)
    }
    lines.push('')
  }

  const output = lines.join('\n')

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return output
})

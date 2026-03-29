import { categorizeTool, CATEGORY_ORDER } from '~/server/utils/tool-categories'
import { loadTools } from '~/server/utils/tools-loader'

/**
 * /llms.txt -- machine-readable site index for LLM agents.
 *
 * Lists all tool guides grouped by category with links to individual
 * markdown endpoints and the full concatenated file.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'

  // Load tools asynchronously (cached after first call)
  const tools = await loadTools()

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

  for (const category of CATEGORY_ORDER) {
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

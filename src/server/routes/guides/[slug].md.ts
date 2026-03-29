import type { Tool } from '~/types/tools'
import { loadToolsMap } from '~/server/utils/tools-loader'

/**
 * /guides/[slug].md -- individual tool guide as markdown.
 *
 * Pre-AIC-50 fallback: generates a minimal markdown page from tools.yml
 * metadata. After AIC-50 merges, this should switch to querying the
 * guides content collection for full guide content.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'
  const slug = getRouterParam(event, 'slug')

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, message: 'Invalid slug format' })
  }

  // Load tools asynchronously (cached after first call)
  const toolsMap = await loadToolsMap()

  // Find the tool by slug
  const tool: Tool | undefined = Object.values(toolsMap).find(t => t.slug === slug)

  if (!tool) {
    throw createError({ statusCode: 404, message: 'Guide not found' })
  }

  const now = new Date().toISOString().split('T')[0]
  const description = tool.description || `${tool.name} is mentioned in ${tool.stats.videoCount} videos.`

  // Build markdown output
  const lines: string[] = [
    '---',
    'source: AI Content Guides',
    `url: ${siteUrl}/guides/${slug}`,
    `last_updated: ${now}`,
    '---',
    '',
    `# ${tool.name}`,
    '',
    description,
    '',
    '## Overview',
    '',
    `- **Category:** ${tool.category}`,
    `- **Mentioned in:** ${tool.stats.videoCount} videos`,
    `- **First mentioned:** ${tool.stats.firstMentioned.split('T')[0]}`,
    `- **Last mentioned:** ${tool.stats.lastMentioned.split('T')[0]}`,
  ]

  if (tool.website) {
    lines.push(`- **Website:** ${tool.website}`)
  }
  if (tool.github?.repo) {
    lines.push(`- **GitHub:** https://github.com/${tool.github.repo}`)
  }
  if (tool.pricing.model !== 'unknown') {
    lines.push(`- **Pricing:** ${tool.pricing.model}${tool.pricing.hasFreeTier ? ' (free tier available)' : ''}`)
  }

  // Related tools section
  if (tool.relatedTools.length > 0) {
    lines.push('')
    lines.push('## Related Tools')
    lines.push('')
    const toolsById = new Map(Object.values(toolsMap).map(t => [t.id, t]))
    const topRelated = tool.relatedTools.slice(0, 10)
    for (const related of topRelated) {
      const relatedTool = toolsById.get(related.id)
      if (relatedTool) {
        lines.push(`- [${relatedTool.name}](${siteUrl}/guides/${relatedTool.slug}.md) (${related.sharedVideos} shared videos)`)
      }
    }
  }

  // Recent videos section
  if (tool.videos.length > 0) {
    lines.push('')
    lines.push('## Featured In')
    lines.push('')
    const recentVideos = tool.videos.slice(0, 10)
    for (const video of recentVideos) {
      lines.push(`- [${video.title}](${siteUrl}/summaries/${video.id})`)
    }
  }

  const output = lines.join('\n') + '\n'

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return output
})

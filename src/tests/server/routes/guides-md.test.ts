import { describe, it, expect } from 'vitest'
import { categorizeTool, CATEGORY_ORDER } from '~/server/utils/tool-categories'

describe('/guides.md output format', () => {
  function buildGuidesDirectory(
    siteUrl: string,
    tools: Array<{ name: string; slug: string; description: string | null; stats: { videoCount: number } }>
  ) {
    const grouped = new Map<string, typeof tools>()
    for (const tool of tools) {
      const category = categorizeTool(tool.name)
      if (!grouped.has(category)) grouped.set(category, [])
      grouped.get(category)!.push(tool)
    }

    const lines: string[] = [
      '# AI Content Guides Directory',
      '',
      `> ${tools.length} guides available. Each guide covers what you need to know`,
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

    return lines.join('\n')
  }

  const siteUrl = 'https://example.com'
  const mockTools = [
    { name: 'Cursor', slug: 'cursor', description: 'AI-first code editor', stats: { videoCount: 50 } },
    { name: 'Notion', slug: 'notion', description: null, stats: { videoCount: 5 } },
    { name: 'unknown-tool', slug: 'unknown-tool', description: 'A mystery', stats: { videoCount: 1 } },
  ]

  const output = buildGuidesDirectory(siteUrl, mockTools)

  it('starts with directory heading', () => {
    expect(output).toMatch(/^# AI Content Guides Directory/)
  })

  it('includes guide count', () => {
    expect(output).toContain('3 guides available')
  })

  it('links to llms-full.txt', () => {
    expect(output).toContain('https://example.com/llms-full.txt')
  })

  it('groups tools under category headings', () => {
    expect(output).toContain('## AI & ML')
    expect(output).toContain('## Productivity')
    expect(output).toContain('## Other')
  })

  it('links to individual markdown guides', () => {
    expect(output).toContain('[Cursor](https://example.com/guides/cursor.md)')
    expect(output).toContain('[Notion](https://example.com/guides/notion.md)')
  })

  it('uses fallback description for null descriptions', () => {
    expect(output).toContain('Mentioned in 5 videos')
  })
})

describe('/guides/[slug].md output format', () => {
  function buildGuideMarkdown(
    siteUrl: string,
    tool: {
      name: string
      slug: string
      description: string | null
      category: string
      website: string | null
      github: { repo: string } | null
      stats: { videoCount: number; firstMentioned: string; lastMentioned: string }
      relatedTools: Array<{ id: string; sharedVideos: number }>
      videos: Array<{ id: string; title: string }>
    }
  ) {
    const desc = tool.description || `${tool.name} is mentioned in ${tool.stats.videoCount} videos.`
    const lines: string[] = [
      '---',
      'source: AI Content Guides',
      `url: ${siteUrl}/guides/${tool.slug}`,
      `last_updated: 2026-03-28`,
      '---',
      '',
      `# ${tool.name}`,
      '',
      desc,
      '',
      '## Overview',
      '',
      `- **Category:** ${tool.category}`,
      `- **Mentioned in:** ${tool.stats.videoCount} videos`,
      `- **First mentioned:** ${tool.stats.firstMentioned.split('T')[0]}`,
      `- **Last mentioned:** ${tool.stats.lastMentioned.split('T')[0]}`,
    ]
    if (tool.website) lines.push(`- **Website:** ${tool.website}`)
    if (tool.github?.repo) lines.push(`- **GitHub:** https://github.com/${tool.github.repo}`)
    return lines.join('\n')
  }

  const siteUrl = 'https://example.com'

  it('includes YAML frontmatter with source attribution', () => {
    const output = buildGuideMarkdown(siteUrl, {
      name: 'Claude Code', slug: 'claude-code', description: 'AI assistant',
      category: 'Tools', website: 'https://claude.com', github: null,
      stats: { videoCount: 85, firstMentioned: '2025-10-17T00:00:00Z', lastMentioned: '2026-01-24T00:00:00Z' },
      relatedTools: [], videos: [],
    })
    expect(output).toContain('source: AI Content Guides')
    expect(output).toContain('url: https://example.com/guides/claude-code')
  })

  it('includes tool heading and description', () => {
    const output = buildGuideMarkdown(siteUrl, {
      name: 'Docker', slug: 'docker', description: 'Container platform',
      category: 'Cloud & DevOps', website: null, github: { repo: 'moby/moby' },
      stats: { videoCount: 10, firstMentioned: '2025-01-01T00:00:00Z', lastMentioned: '2026-01-01T00:00:00Z' },
      relatedTools: [], videos: [],
    })
    expect(output).toContain('# Docker')
    expect(output).toContain('Container platform')
    expect(output).toContain('https://github.com/moby/moby')
  })

  it('uses fallback description when null', () => {
    const output = buildGuideMarkdown(siteUrl, {
      name: 'Mystery', slug: 'mystery', description: null,
      category: 'Other', website: null, github: null,
      stats: { videoCount: 3, firstMentioned: '2025-06-01T00:00:00Z', lastMentioned: '2025-12-01T00:00:00Z' },
      relatedTools: [], videos: [],
    })
    expect(output).toContain('Mystery is mentioned in 3 videos.')
  })
})

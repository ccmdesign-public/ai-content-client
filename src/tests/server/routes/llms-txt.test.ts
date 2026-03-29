import { describe, it, expect } from 'vitest'
import { categorizeTool, CATEGORY_ORDER } from '~/server/utils/tool-categories'

describe('llms.txt structure', () => {
  it('categorizeTool returns correct categories for known tools', () => {
    expect(categorizeTool('Claude Code')).toBe('AI & ML')
    expect(categorizeTool('cursor')).toBe('AI & ML')
    expect(categorizeTool('Docker')).toBe('Cloud & DevOps')
    expect(categorizeTool('React')).toBe('Frameworks')
    expect(categorizeTool('Figma')).toBe('Design')
    expect(categorizeTool('Notion')).toBe('Productivity')
    expect(categorizeTool('GitHub')).toBe('Developer Tools')
  })

  it('categorizeTool falls back to Other for unknown tools', () => {
    expect(categorizeTool('some-unknown-tool')).toBe('Other')
    expect(categorizeTool('')).toBe('Other')
  })

  it('CATEGORY_ORDER contains all expected categories', () => {
    expect(CATEGORY_ORDER).toEqual([
      'AI & ML',
      'Developer Tools',
      'Frameworks',
      'Cloud & DevOps',
      'Design',
      'Productivity',
      'Other',
    ])
  })

  it('categorizeTool is case insensitive', () => {
    expect(categorizeTool('CLAUDE CODE')).toBe('AI & ML')
    expect(categorizeTool('docker')).toBe('Cloud & DevOps')
    expect(categorizeTool('Figma')).toBe('Design')
  })
})

describe('llms.txt output format', () => {
  // Simulate the output builder
  function buildLlmsTxt(siteUrl: string, tools: Array<{ name: string; slug: string; description: string | null; stats: { videoCount: number } }>) {
    const grouped = new Map<string, typeof tools>()
    for (const tool of tools) {
      const category = categorizeTool(tool.name)
      if (!grouped.has(category)) grouped.set(category, [])
      grouped.get(category)!.push(tool)
    }

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

    return lines.join('\n')
  }

  const siteUrl = 'https://example.com'
  const mockTools = [
    { name: 'Claude Code', slug: 'claude-code', description: 'AI coding assistant', stats: { videoCount: 85 } },
    { name: 'Docker', slug: 'docker', description: null, stats: { videoCount: 10 } },
  ]

  const output = buildLlmsTxt(siteUrl, mockTools)

  it('starts with the site title heading', () => {
    expect(output).toMatch(/^# AI Content Guides/)
  })

  it('includes full content links', () => {
    expect(output).toContain('https://example.com/llms-full.txt')
    expect(output).toContain('https://example.com/guides.md')
  })

  it('groups tools by category', () => {
    expect(output).toContain('### AI & ML')
    expect(output).toContain('### Cloud & DevOps')
  })

  it('links to individual markdown guides', () => {
    expect(output).toContain('[Claude Code](https://example.com/guides/claude-code.md)')
  })

  it('uses fallback description when description is null', () => {
    expect(output).toContain('Mentioned in 10 videos')
  })

  it('uses actual description when available', () => {
    expect(output).toContain('AI coding assistant')
  })
})

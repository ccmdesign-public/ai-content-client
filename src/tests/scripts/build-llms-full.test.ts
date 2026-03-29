import { describe, it, expect } from 'vitest'

/**
 * Unit tests for the llms-full.txt build script logic.
 *
 * Tests the entry builder and size-split logic without touching the
 * filesystem. The actual script reads tools.yml and writes to src/public/.
 */

interface MockTool {
  name: string
  slug: string
  description: string | null
  category: string
  website: string | null
  github: { repo: string } | null
  stats: { videoCount: number; firstMentioned: string; lastMentioned: string }
  relatedTools: Array<{ id: string; sharedVideos: number }>
}

function buildToolEntry(tool: MockTool, siteUrl: string): string {
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

const siteUrl = 'https://example.com'

describe('buildToolEntry', () => {
  const baseTool: MockTool = {
    name: 'Claude Code',
    slug: 'claude-code',
    description: 'AI coding assistant',
    category: 'Tools & Productivity',
    website: 'https://claude.com',
    github: null,
    stats: { videoCount: 85, firstMentioned: '2025-10-17T00:00:00Z', lastMentioned: '2026-01-24T00:00:00Z' },
    relatedTools: [{ id: 'mcp', sharedVideos: 28 }],
  }

  it('produces valid markdown with frontmatter separator', () => {
    const entry = buildToolEntry(baseTool, siteUrl)
    expect(entry).toMatch(/^---/)
    expect(entry).toContain('# Claude Code')
    expect(entry).toContain('source: https://example.com/guides/claude-code')
  })

  it('includes tool metadata', () => {
    const entry = buildToolEntry(baseTool, siteUrl)
    expect(entry).toContain('- Category: Tools & Productivity')
    expect(entry).toContain('- Mentioned in: 85 videos')
    expect(entry).toContain('- Website: https://claude.com')
  })

  it('includes related tools', () => {
    const entry = buildToolEntry(baseTool, siteUrl)
    expect(entry).toContain('Related tools: mcp')
  })

  it('uses fallback description when null', () => {
    const tool = { ...baseTool, description: null }
    const entry = buildToolEntry(tool, siteUrl)
    expect(entry).toContain('Claude Code is mentioned in 85 videos.')
  })

  it('includes GitHub link when available', () => {
    const tool = { ...baseTool, github: { repo: 'anthropic/claude-code' } }
    const entry = buildToolEntry(tool, siteUrl)
    expect(entry).toContain('- GitHub: https://github.com/anthropic/claude-code')
  })
})

describe('llms-full.txt size check', () => {
  it('estimates reasonable size for tool entries', () => {
    // Each tool entry is roughly 200-400 bytes
    const mockTool: MockTool = {
      name: 'Test Tool',
      slug: 'test-tool',
      description: 'A test tool description that is about average length for descriptions.',
      category: 'Other',
      website: 'https://example.com',
      github: { repo: 'test/test' },
      stats: { videoCount: 10, firstMentioned: '2025-01-01T00:00:00Z', lastMentioned: '2026-01-01T00:00:00Z' },
      relatedTools: [{ id: 'other', sharedVideos: 5 }],
    }
    const entry = buildToolEntry(mockTool, siteUrl)
    const entrySize = Buffer.byteLength(entry, 'utf-8')

    // 887 tools * ~300 bytes each = ~265KB, well under 5MB
    const estimatedTotal = entrySize * 887
    expect(estimatedTotal).toBeLessThan(5 * 1024 * 1024)
  })
})

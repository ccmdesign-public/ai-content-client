import { describe, it, expect } from 'vitest'
import { z } from 'zod'

/**
 * Mirror of the guide collection schema from content.config.ts.
 * Kept in sync manually -- if the content schema changes, update here too.
 */
const guideSchema = z.object({
  toolSlug: z.string(),
  title: z.string(),
  category: z.string(),
  humanSubsections: z.array(z.enum([
    'overview', 'how-it-works',
    'best-practices', 'common-pitfalls',
    'workflows', 'integrations',
  ])),
  agentResources: z.array(z.object({
    type: z.enum(['mcp-server', 'cli', 'skill-folder', 'repo', 'config-example', 'primer-prompt']),
    name: z.string(),
    source: z.string().optional(),
    url: z.string().url().optional(),
    installCommand: z.string().optional(),
    content: z.string().optional(),
  })).default([]),
  agentResourceGaps: z.array(z.string()).default([]),
  rawAgentMarkdown: z.string().optional(),
  generatedAt: z.string(),
  generatedFrom: z.object({
    summaryCount: z.number(),
    articleCount: z.number(),
  }),
  description: z.string(),
})

const validGuide = {
  toolSlug: 'claude-code',
  title: 'Claude Code',
  category: 'AI Coding',
  humanSubsections: ['overview', 'best-practices'],
  agentResources: [
    {
      type: 'mcp-server' as const,
      name: 'claude-code-mcp',
      source: 'npm',
      url: 'https://npmjs.com/package/claude-code-mcp',
      installCommand: 'npx claude-code-mcp',
    },
  ],
  agentResourceGaps: ['No official skill folder'],
  rawAgentMarkdown: '## Agent section\nSome content.',
  generatedAt: '2026-03-28T00:00:00Z',
  generatedFrom: { summaryCount: 5, articleCount: 2 },
  description: 'A guide to Claude Code.',
}

describe('guide collection schema', () => {
  it('accepts valid guide frontmatter', () => {
    const result = guideSchema.safeParse(validGuide)
    expect(result.success).toBe(true)
  })

  it('accepts minimal guide (no optional fields)', () => {
    const minimal = {
      toolSlug: 'cursor',
      title: 'Cursor',
      category: 'IDE',
      humanSubsections: ['overview'],
      generatedAt: '2026-03-28T00:00:00Z',
      generatedFrom: { summaryCount: 1, articleCount: 0 },
      description: 'A guide to Cursor.',
    }
    const result = guideSchema.safeParse(minimal)
    expect(result.success).toBe(true)
  })

  it('rejects missing required fields', () => {
    const result = guideSchema.safeParse({ toolSlug: 'test' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid humanSubsections value', () => {
    const result = guideSchema.safeParse({
      ...validGuide,
      humanSubsections: ['invalid-section'],
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid agentResource type', () => {
    const result = guideSchema.safeParse({
      ...validGuide,
      agentResources: [{ type: 'invalid', name: 'test' }],
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid url in agentResources', () => {
    const result = guideSchema.safeParse({
      ...validGuide,
      agentResources: [{ type: 'cli', name: 'test', url: 'not-a-url' }],
    })
    expect(result.success).toBe(false)
  })
})

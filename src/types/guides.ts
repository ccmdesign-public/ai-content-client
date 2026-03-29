/**
 * Agent resource attached to a guide
 */
export interface GuideAgentResource {
  type: 'mcp-server' | 'cli' | 'skill-folder' | 'repo' | 'config-example' | 'primer-prompt'
  name: string
  source?: string
  url?: string
  installCommand?: string
  content?: string
}

/**
 * Guide generation source metadata
 */
export interface GuideGeneratedFrom {
  summaryCount: number
  articleCount: number
}

/**
 * Frontmatter schema for a guide page
 */
export interface Guide {
  toolSlug: string
  title: string
  category: string
  humanSubsections: Array<'overview' | 'how-it-works' | 'best-practices' | 'common-pitfalls' | 'workflows' | 'integrations'>
  agentResources: GuideAgentResource[]
  agentResourceGaps: string[]
  rawAgentMarkdown?: string
  generatedAt: string
  generatedFrom: GuideGeneratedFrom
  description: string
}

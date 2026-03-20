/**
 * Tool video reference
 */
export interface ToolVideo {
  id: string
  title: string
  publishedAt: string
}

/**
 * Related tool reference
 */
export interface RelatedTool {
  id: string
  score: number
  sharedVideos: number
}

/**
 * Tool statistics
 */
export interface ToolStats {
  mentionCount: number
  videoCount: number
  firstMentioned: string
  lastMentioned: string
}

/**
 * Tool pricing information
 */
export interface ToolPricing {
  model: string
  hasFreeTier: boolean
  startingPrice: string | null
}

/**
 * GitHub repository info
 */
export interface ToolGitHub {
  repo: string
}

/**
 * Tool from tools.yml
 */
export interface Tool {
  id: string
  name: string
  slug: string
  aliases?: string[]
  description: string | null
  pricing: ToolPricing
  category: string
  tags: string[]
  website: string | null
  github: ToolGitHub | null
  stats: ToolStats
  relatedTools: RelatedTool[]
  videos: ToolVideo[]
}

/**
 * Tool with GitHub stars (enriched at build time)
 */
export interface ToolWithStars extends Tool {
  stars?: number
}

/**
 * tools.yml file structure
 */
export interface ToolsYaml {
  _meta: {
    generatedAt: string
    schemaVersion: string
    summaryCount: number
    toolCount: number
  }
  tools: Record<string, Tool>
}

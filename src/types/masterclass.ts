export type MasterclassCategory = 'tool' | 'technique' | 'skill'
export type MasterclassTier = 'beginner' | 'intermediate' | 'advanced'

export const TIER_ORDER: MasterclassTier[] = ['beginner', 'intermediate', 'advanced']
export const TIER_LABELS: Record<MasterclassTier, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export const CATEGORY_LABELS: Record<MasterclassCategory, string> = {
  tool: 'Tools',
  technique: 'Techniques',
  skill: 'Skills',
}

/** Entry in the masterclasses index (from metadata.yml or tools.yml fallback) */
export interface MasterclassIndexEntry {
  slug: string
  name: string
  category: MasterclassCategory
  description: string | null
  tldr: string | null
  hasMasterclass: boolean
  sourceCount: number | null
  generatedAt: string | null
  tags: string[]
  videoCount?: number
  stars?: number
  website?: string | null
  githubRepo?: string | null
}

/** Metadata for the tier selector UI — which tiers are available and which failed */
export interface TierAvailability {
  tier: MasterclassTier
  available: boolean
  failureReason?: string
}

/** Full detail data for a single masterclass topic */
export interface MasterclassDetailData {
  slug: string
  name: string
  category: MasterclassCategory
  description: string | null
  tldr: string
  sourceCount: number
  generatedAt: string
  modelUsed: string
  relatedTopics: string[]
  tags: string[]
  toolId?: string
  tierAvailability: TierAvailability[]
  website?: string | null
  githubRepo?: string | null
  stars?: number
}

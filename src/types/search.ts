/**
 * Shared types for the universal search feature.
 *
 * Used by both the build-time index generator (scripts/build-search-index.ts)
 * and the client-side search composable (composables/useSearch.ts).
 */

/** Fields indexed by MiniSearch for full-text search */
export const SEARCH_INDEX_FIELDS = ['title', 'description', 'channel', 'tldr', 'toolNames'] as const

/** Fields stored in the serialized index for display in search results */
export const SEARCH_STORE_FIELDS = ['id', 'title', 'channel', 'date', 'type', 'path', 'thumbnailUrl', 'tldr'] as const

/** A document as it enters the MiniSearch index (flat representation) */
export interface SearchDocument {
  id: string
  title: string
  description: string
  channel: string
  tldr: string
  toolNames: string
  date: string
  type: 'summary' | 'article' | 'tool'
  path: string
  thumbnailUrl: string
}

/** A search result returned by MiniSearch, including scoring metadata */
export interface SearchResult {
  id: string
  title: string
  channel: string
  date: string
  type: 'summary' | 'article' | 'tool'
  path: string
  thumbnailUrl: string
  tldr?: string
  /** MiniSearch relevance score (higher = more relevant) */
  score: number
  /** Map of field name -> matched terms */
  match: Record<string, string[]>
}

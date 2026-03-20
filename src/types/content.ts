/**
 * Shared content types for feed item components.
 * Used by FeedItem, ArticleCard, and SummaryCard.
 */

export interface ArticleItem {
  path: string
  title: string
  subtitle?: string
  author: string
  platform: string
  publicationName: string
  url: string
  publishedAt: string
}

export interface SummaryMetadata {
  videoId: string
  title: string
  channel: string
  publishedAt: string
  thumbnailUrl: string
  youtubeUrl: string
}

export interface SummaryItem {
  metadata: SummaryMetadata
  processedAt: string
  tldr?: string
}

export type FeedItemType = ArticleItem | SummaryItem

export function isArticle(item: FeedItemType): item is ArticleItem {
  return 'publicationName' in item && !('metadata' in item)
}

export function isSummary(item: FeedItemType): item is SummaryItem {
  return 'metadata' in item && !('publicationName' in item)
}

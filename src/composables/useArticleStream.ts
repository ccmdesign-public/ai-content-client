import { computed } from 'vue'
import { useContentStream, type ContentStreamOptions } from './useContentStream'
import { useSlugify } from './useSlugify'

export interface Article {
  id: string
  path: string
  title: string
  subtitle?: string
  author: string
  platform: string
  publicationName: string
  url: string
  publishedAt: string
  tags?: string[]
}

export interface ArticleStreamOptions {
  publication?: string
  limit?: number
}

/**
 * Wrapper composable for querying articles from the articles collection.
 * Supports filtering by publication and sorting by date.
 */
export function useArticleStream(options: ArticleStreamOptions = {}) {
  const { slugify } = useSlugify()

  const contentOptions: ContentStreamOptions = {
    sort: { by: 'publishedAt', order: 'desc' },
    limit: options.limit
  }

  // Filter by publication if provided
  if (options.publication) {
    const targetSlug = options.publication.toLowerCase()
    contentOptions.where = (doc: Record<string, unknown>) => {
      const pubName = doc.publicationName as string | undefined
      return pubName ? slugify(pubName) === targetSlug : false
    }
  }

  const { data, pending, error, refresh } = useContentStream('articles', contentOptions)

  const articles = computed<Article[]>(() => {
    return (data.value ?? []) as Article[]
  })

  return { articles, pending, error, refresh }
}
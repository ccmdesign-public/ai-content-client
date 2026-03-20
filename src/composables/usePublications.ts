import { computed, type Ref } from 'vue'
import { useSlugify } from './useSlugify'

export interface Publication {
  name: string
  slug: string
  count: number
}

export interface ArticleWithPublication {
  publicationName: string
}

/**
 * Derives unique publications from a list of articles.
 * Returns publications sorted by article count (descending).
 */
export function usePublications<T extends ArticleWithPublication>(articles: Ref<T[]>) {
  const { slugify } = useSlugify()

  const publications = computed<Publication[]>(() => {
    const pubMap = new Map<string, Publication>()

    for (const article of articles.value) {
      const name = article.publicationName
      const slug = slugify(name)

      if (pubMap.has(slug)) {
        pubMap.get(slug)!.count++
      } else {
        pubMap.set(slug, { name, slug, count: 1 })
      }
    }

    return [...pubMap.values()].sort((a, b) => b.count - a.count)
  })

  const findBySlug = (slug: string): Publication | undefined => {
    return publications.value.find(p => p.slug === slug)
  }

  return { publications, findBySlug }
}
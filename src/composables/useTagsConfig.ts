import tagsData from '~/content/tags-index.json'

export interface TagConfig {
  slug: string
  name: string
  category: string
  categoryId: string
  itemCount: number
}

export interface TagCategory {
  name: string
  categoryId: string
  tags: TagConfig[]
  totalItems: number
}

export function useTagsConfig() {
  // Static tag data - source of truth is src/content/tags-index.json
  const tags = ref<TagConfig[]>(tagsData as TagConfig[])
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const tagsByCategory = computed<TagCategory[]>(() => {
    const categoryMap = new Map<string, TagConfig[]>()
    for (const tag of tags.value) {
      const existing = categoryMap.get(tag.category) || []
      existing.push(tag)
      categoryMap.set(tag.category, existing)
    }
    return Array.from(categoryMap.entries())
      .map(([name, categoryTags]) => ({
        name,
        categoryId: categoryTags[0]?.categoryId || '',
        tags: categoryTags.sort((a, b) => b.itemCount - a.itemCount),
        totalItems: categoryTags.reduce((sum, t) => sum + t.itemCount, 0)
      }))
      .sort((a, b) => b.totalItems - a.totalItems)
  })

  // Top tags by item count (for sidebar display)
  const topTags = computed(() =>
    [...tags.value]
      .filter(t => t.itemCount > 0)
      .sort((a, b) => b.itemCount - a.itemCount)
      .slice(0, 5)
  )

  const getTagBySlug = (slug: string) =>
    tags.value.find(t => t.slug === slug)

  return {
    tags,
    tagsByCategory,
    topTags,
    pending,
    error,
    getTagBySlug
  }
}

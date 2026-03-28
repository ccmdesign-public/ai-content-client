import type { MasterclassTier, TierAvailability, MasterclassDetailData } from '~/types/masterclass'
import { TIER_ORDER } from '~/types/masterclass'
import type { ToolWithStars } from '~/types/tools'

/**
 * Composable for the /masterclasses/[slug] detail page.
 * Loads metadata + all available tier content for a single topic.
 */
export function useMasterclassDetail(slug: Ref<string> | string) {
  const resolvedSlug = toRef(slug)

  // 1. Load metadata
  const { data: rawMetadata, pending: metaPending, error: metaError } = useAsyncData(
    `masterclass-meta-${toValue(resolvedSlug)}`,
    () => queryCollection('masterclassMetadata')
      .where('slug', '=', toValue(resolvedSlug))
      .first()
  )

  // 2. Load ALL tier content docs for this slug
  const { data: rawTiers, pending: tiersPending, error: tiersError } = useAsyncData(
    `masterclass-tiers-${toValue(resolvedSlug)}`,
    () => queryCollection('masterclasses')
      .where('path', 'LIKE', `/masterclasses/${toValue(resolvedSlug)}/%`)
      .all()
  )

  // 3. Optionally load tool enrichment for tool-category topics
  const { data: allTools } = useFetch<ToolWithStars[]>('/tools-with-stars.json', {
    key: 'tools-for-masterclass-detail',
    lazy: true,
  })

  // Combined loading state
  const pending = computed(() => metaPending.value || tiersPending.value)
  const error = computed(() => metaError.value || tiersError.value)
  const notFound = computed(() => !pending.value && !error.value && !rawMetadata.value)

  // 4. Build tier availability map from metadata
  const tierAvailability = computed<TierAvailability[]>(() => {
    if (!rawMetadata.value?.tiers) return []
    return TIER_ORDER.map(tier => {
      const tierMeta = rawMetadata.value.tiers.find((t: any) => t.tier === tier)
      return {
        tier,
        available: tierMeta ? !tierMeta.failed : false,
        failureReason: tierMeta?.failureReason,
      }
    })
  })

  // 5. Map tier content by tier name for easy lookup
  const tierContentMap = computed(() => {
    const map = new Map<MasterclassTier, any>()
    if (!rawTiers.value) return map
    for (const doc of rawTiers.value) {
      const segments = doc.path.split('/')
      const tierName = segments[segments.length - 1] as MasterclassTier
      if (TIER_ORDER.includes(tierName)) {
        map.set(tierName, doc)
      }
    }
    return map
  })

  // 6. Available tiers (in order, excluding failed)
  const availableTiers = computed<MasterclassTier[]>(() =>
    tierAvailability.value
      .filter(t => t.available)
      .map(t => t.tier)
  )

  // 7. Default tier: beginner if available, otherwise first available
  const defaultTier = computed<MasterclassTier | null>(() =>
    availableTiers.value.includes('beginner')
      ? 'beginner'
      : availableTiers.value[0] ?? null
  )

  // 8. Build enriched detail data
  const detail = computed<MasterclassDetailData | null>(() => {
    if (!rawMetadata.value) return null
    const meta = rawMetadata.value
    const matchedTool = allTools.value?.find(
      (t: ToolWithStars) => t.slug === meta.slug || t.id === meta.toolId
    )
    return {
      slug: meta.slug,
      name: meta.name,
      category: meta.category,
      description: meta.description ?? matchedTool?.description ?? null,
      tldr: meta.tldr ?? '',
      sourceCount: meta.sourceCount,
      generatedAt: meta.generatedAt,
      modelUsed: meta.modelUsed,
      relatedTopics: meta.relatedTopics ?? [],
      tags: meta.tags ?? [],
      toolId: meta.toolId,
      tierAvailability: tierAvailability.value,
      website: matchedTool?.website ?? null,
      githubRepo: matchedTool?.github?.repo ?? null,
      stars: matchedTool?.stars,
    }
  })

  return {
    detail,
    tierContentMap,
    availableTiers,
    defaultTier,
    tierAvailability,
    pending,
    error,
    notFound,
  }
}

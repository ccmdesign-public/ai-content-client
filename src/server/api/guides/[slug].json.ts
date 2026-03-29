export default defineEventHandler(async (event) => {
  // Nitro maps [slug].json.ts to route param "slug.json" with value "foo.json"
  const rawSlug = getRouterParam(event, 'slug.json')
  const slug = rawSlug?.replace(/\.json$/, '')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required' })
  }

  // Use queryCollection without type assertion wrapping the call itself,
  // as (queryCollection as any) prevents Nitro's auto-import transformer
  // from renaming the reference during bundling.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qc: any = queryCollection
  const guide = await qc(event, 'guides')
    .path(`/guides/${slug}/guide`)
    .first() as import('../../.nuxt/content/types').GuidesCollectionItem | undefined

  if (!guide) {
    throw createError({ statusCode: 404, message: 'Guide not found' })
  }

  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return {
    tool: guide.toolSlug,
    title: guide.title,
    category: guide.category,
    description: guide.description,
    agentResources: guide.agentResources,
    agentResourceGaps: guide.agentResourceGaps,
    metadata: {
      generatedAt: guide.generatedAt,
      sourceCount: guide.generatedFrom,
    }
  }
})

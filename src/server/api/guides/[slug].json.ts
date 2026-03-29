export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required' })
  }

  // Type assertion needed: Nuxt Content v3 server-side queryCollection returns
  // a union of all collection types. The runtime correctly queries only 'guides'.
  const guide = await (queryCollection as any)(event, 'guides')
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

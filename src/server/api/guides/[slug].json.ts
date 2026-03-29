export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required' })
  }

  const guide = await queryCollection(event, 'guides')
    .path(`/guides/${slug}/guide`)
    .first()

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

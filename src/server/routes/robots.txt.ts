/**
 * Dynamic robots.txt server route.
 *
 * Replaces the static `public/robots.txt` so the production domain and
 * AI-crawler rules are generated from runtime config rather than hardcoded.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'

  const robotsTxt = [
    '# robots.txt for AI Content Guides',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /_nuxt/',
    'Disallow: /__nuxt_error',
    '',
    '# AI crawlers -- explicitly allowed',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `Llms-txt: ${siteUrl}/llms.txt`,
    '',
  ].join('\n')

  setHeader(event, 'Content-Type', 'text/plain')
  setHeader(event, 'Cache-Control', 'public, max-age=86400')

  return robotsTxt
})

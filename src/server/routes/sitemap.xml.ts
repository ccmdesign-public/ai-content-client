import channelsData from '~/content/channels.json'
import playlistsData from '~/content/playlists.json'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

function generateSitemapXml(urls: SitemapUrl[], siteUrl: string): string {
  const urlEntries = urls.map(url => {
    const loc = `<loc>${siteUrl}${url.loc}</loc>`
    const lastmod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''
    const changefreq = `<changefreq>${url.changefreq}</changefreq>`
    const priority = `<priority>${url.priority}</priority>`

    return `  <url>
    ${loc}
    ${lastmod}
    ${changefreq}
    ${priority}
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'

  // Query all summaries from the collection
  const summaries = await queryCollection(event, 'summaries').all()

  // Query all newsletter issues
  const newsletters = await queryCollection(event, 'newsletters').all()

  const urls: SitemapUrl[] = []

  // Home page (newsletter landing page -- primary content page)
  urls.push({
    loc: '/',
    changefreq: 'daily',
    priority: 1.0
  })

  // Summaries index (secondary content page)
  urls.push({
    loc: '/summaries/',
    changefreq: 'daily',
    priority: 0.8
  })

  // Tools directory page
  urls.push({
    loc: '/tools',
    changefreq: 'daily',
    priority: 0.9
  })

  // Summary pages
  for (const summary of summaries) {
    urls.push({
      loc: `/summaries/${summary.stem}`,
      lastmod: summary.processedAt || undefined,
      changefreq: 'weekly',
      priority: 0.8
    })
  }

  // Newsletter issue pages
  for (const issue of newsletters) {
    // stem is "newsletters/2026-03-19", extract just the date slug
    const slug = issue.stem.replace(/^newsletters\//, '')
    urls.push({
      loc: `/issues/${slug}`,
      lastmod: issue.publishedAt || undefined,
      changefreq: 'monthly',
      priority: 0.7
    })
  }

  // Channel pages
  const enabledChannels = (channelsData as Array<{ slug: string; enabled: boolean }>)
    .filter(c => c.enabled)

  for (const channel of enabledChannels) {
    urls.push({
      loc: `/channels/${channel.slug}`,
      changefreq: 'daily',
      priority: 0.7
    })
  }

  // Playlist pages
  const enabledPlaylists = (playlistsData as Array<{ slug: string; enabled: boolean }>)
    .filter(p => p.enabled)

  for (const playlist of enabledPlaylists) {
    urls.push({
      loc: `/playlists/${playlist.slug}`,
      changefreq: 'daily',
      priority: 0.7
    })
  }

  // Generate sitemap XML
  const xml = generateSitemapXml(urls, siteUrl)

  // Set appropriate headers
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return xml
})

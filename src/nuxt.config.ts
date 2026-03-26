// https://nuxt.com/docs/api/configuration/nuxt-config
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

const currentDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(currentDir, '..')

// Generate tag prerender routes from tags-index.json
const tagsIndexPath = resolve(currentDir, '..', 'src/content/tags-index.json')
let tagRoutes: string[] = []
try {
  if (existsSync(tagsIndexPath)) {
    const tagsIndex = JSON.parse(readFileSync(tagsIndexPath, 'utf-8'))
    tagRoutes = [
      '/tags',
      ...tagsIndex.map((tag: { slug: string }) => `/tags/${tag.slug}`)
    ]
  }
} catch {
  // Graceful fallback: tags not synced yet, skip prerender routes
}

export default defineNuxtConfig({
  rootDir: projectRoot,
  srcDir: currentDir,
  dir: {
    public: resolve(currentDir, 'public'),
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    'nuxt-gtag',
    'shadcn-nuxt',
    '@nuxtjs/color-mode'
  ],
  shadcn: {
    prefix: '',
    componentDir: resolve(currentDir, 'components/ui')
  },
  colorMode: {
    classSuffix: ''
  },
  gtag: {
    id: 'G-2CHWGY0HJ8'
  },
  runtimeConfig: {
    // Private keys (server-only)
    cronSecret: process.env.CRON_SECRET || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendAudienceId: process.env.RESEND_AUDIENCE_ID || '',
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      feedTitle: 'YouTube Summaries',
      feedDescription: 'AI-generated summaries of YouTube videos',
      // Digest feed configuration
      // NOTE (AIC-26): The digest feed period is intentionally decoupled from the
      // newsletter's 3x/week cadence (Mon/Wed/Fri). The digest feed uses fixed-length
      // periods from epoch for RSS/Mailchimp integration, while the newsletter cadence
      // is managed in ai-content-scraper via NEWSLETTER_CADENCE and NEWSLETTER_SEND_DAYS.
      digestTitle: process.env.DIGEST_TITLE || 'YouTube Digest',
      digestDescription: process.env.DIGEST_DESCRIPTION || 'Periodic roundup of AI-generated video summaries',
      digestIntroText: process.env.DIGEST_INTRO_TEXT || 'Welcome to this period\'s video digest! Here are the latest AI-generated summaries from our curated YouTube content.',
      digestFooterText: process.env.DIGEST_FOOTER_TEXT || 'Thanks for reading! Visit our site for more summaries and insights.',
      digestPeriodDays: Number(process.env.DIGEST_PERIOD_DAYS) || 3,
      digestEpochDate: process.env.DIGEST_EPOCH_DATE || '2026-01-01',
      digestMaxPeriods: Number(process.env.DIGEST_MAX_PERIODS) || 10,
    }
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },],
      link: [
        // RSS autodiscovery
        { rel: "alternate", type: "application/rss+xml", title: "YouTube Summaries RSS Feed", href: "/feed.xml" },
        { rel: "alternate", type: "application/rss+xml", title: "AI Content Digest Newsletter", href: "/digest.xml" },
      ],
      script: [],
    }
  },
  css: [
    '~/assets/css/tailwind.css'
  ],
  build: {
    transpile: [],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  plugins: [

  ],
  ssr: true,
  experimental: {
    clientFallback: true
  },
  serverDir: resolve(currentDir, 'server'),
  nitro: {
    preset: 'netlify',
    // Prerender all content routes at build time
    prerender: {
      crawlLinks: false,
      failOnError: true,
      routes: ['/', '/tools', '/feed.xml', '/digest.xml', '/sitemap.xml', '/summaries', ...tagRoutes]
    }
  },
  // Route rules for hybrid rendering (prerender shell, ISR for content, serverless API)
  routeRules: {
    // Summary detail pages: on-demand SSR, cached at edge for 1 hour
    '/summaries/**': { isr: 3600 },
    // Everything else: prerender at build time
    '/**': { prerender: true },
    // Server routes remain as serverless functions (not prerendered)
    '/api/**': { prerender: false },
    // Static assets - long cache
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  },
  components: [
    {
      path: resolve(currentDir, 'components'),
      pathPrefix: false
    },
    {
      path: resolve(currentDir, 'components/ui'),
      pathPrefix: false
    },
    {
      path: resolve(currentDir, 'components/content'),
      pathPrefix: false
    }
  ],
})

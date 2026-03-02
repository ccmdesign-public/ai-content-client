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
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    'nuxt-gtag',
    'shadcn-nuxt'
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  gtag: {
    id: 'G-2CHWGY0HJ8'
  },
  runtimeConfig: {
    // Private keys (server-only) - set via NUXT_CRON_SECRET env var
    cronSecret: process.env.CRON_SECRET || '',
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      feedTitle: 'YouTube Summaries',
      feedDescription: 'AI-generated summaries of YouTube videos',
      // Digest feed configuration
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
        // google icons
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" },
        // RSS autodiscovery
        { rel: "alternate", type: "application/rss+xml", title: "YouTube Summaries RSS Feed", href: "/feed.xml" },
      ],
      script: [],
    }
  },
  css: [
    '~/assets/css/tailwind.css'
  ],
  postcss: {
    plugins: {
      'postcss-import': {},
      'postcss-preset-env': {
        stage: 1,
        features: {
          'nesting-rules': true
        }
      }
    }
  },
  build: {
    transpile: ['vue-carousel'],
  },
  vite: {
    plugins: [tailwindcss()]
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
    // Only prerender essential static routes
    prerender: {
      crawlLinks: false,
      routes: ['/', '/tools', '/feed.xml', '/digest.xml', '/sitemap.xml', '/tools-with-stars.json', ...tagRoutes],
      concurrency: 1
    }
  },
  // Hybrid rendering: prerender main pages, ISR for individual content pages
  routeRules: {
    // Main listing pages - prerender at build time
    '/': { prerender: true },
    '/tools': { prerender: true },
    // Individual content pages - ISR with 1 hour cache, stale-while-revalidate
    '/summaries/**': { isr: 3600 },
    '/articles/**': { isr: 3600 },
    // Static assets - long cache
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  },
  components: [
    {
      path: resolve(currentDir, 'components/ui'),
      pathPrefix: false
    },
    {
      path: resolve(currentDir, 'components/content'),
      pathPrefix: false
    },
    {
      path: resolve(currentDir, 'components/custom'),
      pathPrefix: false
    }
  ],
})

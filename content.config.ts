import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const rootDir = dirname(fileURLToPath(import.meta.url))
const contentDir = resolve(rootDir, 'src/content')

// Video metadata from YouTube API
const videoMetadataSchema = z.object({
  videoId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  channel: z.string(),
  channelId: z.string(),
  duration: z.string(),
  publishedAt: z.string(),
  thumbnailUrl: z.string(),
  youtubeUrl: z.string()
})

// AI processing metrics
const aiMetricsSchema = z.object({
  provider: z.string(),
  model: z.string(),
  apiCalls: z.number(),
  fallbackAttempts: z.number(),
  inputTokens: z.number().optional(),
  outputTokens: z.number().optional(),
  totalTokens: z.number().optional(),
  processingTimeMs: z.number()
})

// Tools/resources extracted from video
const toolSchema = z.object({
  name: z.string(),
  url: z.string().url().nullable()
})

export default defineContentConfig({
  collections: {
    summaries: defineCollection({
      type: 'page',
      source: {
        include: 'summaries/*/summary.md',
        cwd: contentDir
      },
      schema: z.object({
        // Video metadata from YouTube
        metadata: videoMetadataSchema,
        // Processing info
        processedAt: z.string(),
        source: z.literal('youtube').default('youtube'),
        // Playlist/category info
        playlistId: z.string().optional(),
        playlistName: z.string().optional(),
        category: z.string().optional(),
        // AI-generated content
        tldr: z.string().optional(),
        // Extracted tools/resources
        tools: z.array(toolSchema).optional().default([]),
        // AI processing metrics
        ai: aiMetricsSchema.optional()
      })
    }),
    newsletters: defineCollection({
      type: 'page',
      source: {
        include: 'newsletters/*.md',
        cwd: contentDir
      },
      schema: z.object({
        subjectLine: z.string(),
        editorialIntro: z.string(),
        featuredPicks: z.array(z.object({
          title: z.string(),
          url: z.string().url(),
          source: z.string(),
          summary: z.string(),
          commentary: z.string(),
        })),
        quickLinks: z.array(z.object({
          title: z.string(),
          url: z.string().url(),
          source: z.string(),
          oneLiner: z.string(),
        })),
        closing: z.string(),
        publishedAt: z.string(),
      })
    }),
    tags: defineCollection({
      type: 'data',
      source: {
        include: 'tags/*.yml',
        exclude: ['tags/index.yml'],
        cwd: contentDir
      },
      schema: z.object({
        tag: z.string(),
        category: z.string(),
        categoryId: z.string(),
        itemCount: z.number(),
        items: z.array(z.object({
          id: z.string(),
          type: z.string(),
          title: z.string(),
          date: z.string(),
          path: z.string()
        }))
      })
    })
  }
})

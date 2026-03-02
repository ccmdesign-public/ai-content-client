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

// Article schema for written content from Medium, Substack, etc.
const articleSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  author: z.string(),
  platform: z.string(),           // "medium" | "substack"
  publicationName: z.string(),    // Display name for grouping
  url: z.string(),                // Original source URL
  publishedAt: z.string(),        // ISO date
  tags: z.array(z.string()).optional()
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
    articles: defineCollection({
      type: 'page',
      source: {
        include: 'articles/*/article.md',
        cwd: contentDir
      },
      schema: articleSchema
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

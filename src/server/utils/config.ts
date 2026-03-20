import { z } from 'zod';
import type { AppConfig } from '~/types/config';

const ConfigSchema = z.object({
  youtubeApiKey: z.string().min(1, 'YOUTUBE_API_KEY is required'),
  youtubePlaylistId: z.string().regex(
    /^(PL|UU|LL|RD|OL)[a-zA-Z0-9_-]{16,}$/,
    'Invalid YouTube playlist ID format'
  ),
  geminiApiKey: z.string().min(1, 'GEMINI_API_KEY is required'),
  geminiModel: z.string().min(1, 'GEMINI_MODEL is required'),
  openRouterApiKey: z.string().optional(),
  groqApiKey: z.string().optional(),
  processingMode: z.enum(['transcript', 'native-video']),
  maxVideosPerRun: z.number().int().positive().max(50),
  enableProFallback: z.boolean(),
  enableModelFallback: z.boolean(),
  outputDir: z.string()
});

export function loadConfig(): AppConfig {
  const raw = {
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
    youtubePlaylistId: process.env.YOUTUBE_PLAYLIST_ID,
    geminiApiKey: process.env.GEMINI_API_KEY,
    geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    openRouterApiKey: process.env.OPEN_ROUTER_API_KEY || undefined,
    groqApiKey: process.env.GROQ_API_KEY || undefined,
    processingMode: process.env.PROCESSING_MODE || 'transcript',
    maxVideosPerRun: parseInt(process.env.MAX_VIDEOS_PER_RUN || '10', 10),
    enableProFallback: process.env.ENABLE_PRO_FALLBACK === 'true',
    enableModelFallback: process.env.ENABLE_MODEL_FALLBACK !== 'false', // Default to true
    outputDir: process.env.OUTPUT_DIR || 'src/content/summaries'
  };

  try {
    return ConfigSchema.parse(raw);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
      throw new Error(`Configuration validation failed:\n${issues}`);
    }
    throw error;
  }
}

export function validateConfig(): void {
  try {
    loadConfig();
    console.log('✅ Configuration is valid');
  } catch (error) {
    console.error('❌ Configuration error:', (error as Error).message);
    process.exit(1);
  }
}

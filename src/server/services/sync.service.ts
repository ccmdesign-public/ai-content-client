import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import type { SyncResult } from '~/types/config';
import type { PlaylistMetadata } from '~/types/summary';
import type { TranscriptData } from '~/types/transcript';
import { loadConfig } from '~/server/utils/config';
import { logger } from '~/server/utils/logger';
import { classifyVideo } from '~/server/prompts';
import { createYouTubeService } from './youtube.service';
import { createGroqWhisperService } from './groq-whisper.service';
import { createAIService } from './ai.service';
import { createContentWriterService } from './content-writer.service';
import { createProcessingLogService } from './processing-log.service';

const execAsync = promisify(exec);

export interface SyncProgressEvent {
  type: 'start' | 'processing' | 'complete' | 'error';
  videoId?: string;
  videoTitle?: string;
  current?: number;
  total?: number;
  result?: SyncResult;
  error?: string;
}

export type SyncProgressCallback = (event: SyncProgressEvent) => void;

/**
 * Main orchestration function for syncing YouTube playlist
 */
export async function syncPlaylist(onProgress?: SyncProgressCallback): Promise<SyncResult> {
  const config = loadConfig();

  logger.info('Starting playlist sync', {
    playlistId: config.youtubePlaylistId,
    processingMode: config.processingMode,
    maxVideos: config.maxVideosPerRun
  });

  const result: SyncResult = {
    processed: 0,
    skipped: 0,
    failed: 0,
    errors: []
  };

  try {
    // Initialize services
    const groqWhisper = config.groqApiKey ? createGroqWhisperService(config.groqApiKey) : undefined;
    const youtubeService = createYouTubeService(config.youtubeApiKey, groqWhisper);
    const aiService = createAIService({
      geminiApiKey: config.geminiApiKey,
      primaryModel: config.geminiModel,
      openRouterApiKey: config.openRouterApiKey,
      enableFallback: config.enableModelFallback
    });
    const contentWriter = createContentWriterService(config.outputDir);
    const processingLog = createProcessingLogService();

    // Log Groq Whisper status and check for ffmpeg
    if (groqWhisper) {
      logger.info('Groq Whisper fallback enabled for transcript recovery');
      try {
        await execAsync('which ffmpeg', { timeout: 5000 });
      } catch {
        logger.warn('ffmpeg not found -- Groq Whisper fallback will fail for audio extraction. Install ffmpeg: brew install ffmpeg');
      }
    } else {
      logger.debug('Groq Whisper fallback disabled (GROQ_API_KEY not set)');
    }

    // Log available models for debugging
    const availableModels = aiService.getAvailableModels();
    logger.info('AI service initialized with fallback chain', {
      primary: config.geminiModel,
      geminiFallbacks: availableModels.gemini.slice(1),
      openRouterFallbacks: availableModels.openRouter.length > 0 ? availableModels.openRouter : 'not configured'
    });

    // 1. Fetch playlist items
    logger.info('Fetching playlist items...');
    const playlistItems = await youtubeService.getPlaylistItems(config.youtubePlaylistId);

    if (playlistItems.length === 0) {
      logger.warn('No videos found in playlist');
      return result;
    }

    // 2. Filter out already processed videos
    // Check both: markdown file exists AND processing log status
    const skipChecks = await Promise.all(
      playlistItems.map(async (item) => {
        // First check if markdown already exists (backward compatible)
        const fileExists = await contentWriter.exists(item.videoId);
        if (fileExists) {
          return { skip: true, reason: 'File exists' };
        }

        // Then check the processing log for skip flags
        return processingLog.shouldSkip(item.videoId);
      })
    );

    const newVideos = playlistItems.filter(
      (_, index) => !skipChecks[index].skip
    );

    // Log skip reasons for debugging
    const skippedItems = playlistItems.filter((_, index) => skipChecks[index].skip);
    for (const item of skippedItems) {
      const originalIndex = playlistItems.findIndex(p => p.videoId === item.videoId);
      const reason = skipChecks[originalIndex].reason;
      if (reason && reason !== 'File exists' && reason !== 'Already processed') {
        logger.info(`Skipping ${item.videoId}: ${reason}`);
      }
    }

    const alreadyProcessed = playlistItems.length - newVideos.length;
    logger.info(`Found ${newVideos.length} new videos (${alreadyProcessed} skipped)`);

    result.skipped = alreadyProcessed;

    // 3. Limit to maxVideosPerRun
    const videosToProcess = newVideos.slice(0, config.maxVideosPerRun);

    if (videosToProcess.length < newVideos.length) {
      logger.info(`Processing ${videosToProcess.length} of ${newVideos.length} new videos (rate limit)`);
      result.skipped += newVideos.length - videosToProcess.length;
    }

    // 4. Process each video with delays to respect rate limits
    // Free tier: ~2 videos/minute to stay under 5-15 RPM limits
    const VIDEO_PROCESSING_DELAY = 30000; // 30 seconds between videos

    // Emit start event
    onProgress?.({
      type: 'start',
      total: videosToProcess.length
    });

    for (const [index, item] of videosToProcess.entries()) {
      // Add delay between videos (skip first one)
      if (index > 0) {
        logger.info(`Waiting ${VIDEO_PROCESSING_DELAY / 1000}s before next video (rate limiting)...`);
        await new Promise(resolve => setTimeout(resolve, VIDEO_PROCESSING_DELAY));
      }

      logger.info(`Processing video ${index + 1}/${videosToProcess.length}: ${item.videoId}`);

      // Emit processing event with video title
      onProgress?.({
        type: 'processing',
        videoId: item.videoId,
        videoTitle: item.title,
        current: index + 1,
        total: videosToProcess.length
      });

      try {
        // Record processing start in the log
        await processingLog.recordProcessingStart(item.videoId, item.title, 'playlist');

        await processVideo(
          item.videoId,
          config,
          youtubeService,
          aiService,
          contentWriter
        );

        // Record success in the log
        await processingLog.recordSuccess(item.videoId, item.title);

        result.processed++;

        logger.info(`Successfully processed ${item.videoId}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);

        // Record failure in the log (this handles error classification)
        const logEntry = await processingLog.recordFailure(
          item.videoId,
          error instanceof Error ? error : errorMessage,
          item.title
        );

        result.failed++;
        result.errors.push({
          videoId: item.videoId,
          error: errorMessage
        });

        // Log with skip status for visibility
        if (logEntry.skipPermanently) {
          logger.warn(`Failed to process ${item.videoId} - will skip permanently: ${logEntry.skipReason}`);
        } else {
          logger.error(`Failed to process ${item.videoId} (attempt ${logEntry.attemptCount}/3)`, { error: errorMessage });
        }
      }
    }

    // Emit complete event
    onProgress?.({
      type: 'complete',
      result
    });

    logger.info('Sync completed', result);
    return result;
  } catch (error) {
    // Emit error event
    onProgress?.({
      type: 'error',
      error: error instanceof Error ? error.message : String(error)
    });

    logger.error('Sync failed catastrophically', { error });
    throw error;
  }
}

/**
 * Process a single video
 * Exported for reuse by channel monitoring service and playlist sync service
 *
 * Creates folder structure:
 *   {videoId}/
 *     summary.md      - AI-generated summary
 *     transcript.json - Full transcript with timestamps
 *     metadata.yml    - Video metadata including description
 */
export async function processVideo(
  videoId: string,
  config: ReturnType<typeof loadConfig>,
  youtubeService: ReturnType<typeof createYouTubeService>,
  aiService: ReturnType<typeof createAIService>,
  contentWriter: ReturnType<typeof createContentWriterService>,
  playlist?: PlaylistMetadata
): Promise<void> {
  // 1. Get video metadata (now includes description)
  const metadata = await youtubeService.getVideoMetadata(videoId);

  // 2. Get transcript with timestamps (if in transcript mode)
  let transcriptData: TranscriptData | undefined;
  let transcript: string | undefined;
  let processingMode = config.processingMode;

  if (processingMode === 'transcript') {
    try {
      transcriptData = await youtubeService.getTranscriptWithTimestamps(videoId);
      transcript = transcriptData.fullText;
    } catch (error) {
      // If transcript unavailable and Pro fallback is enabled
      if (config.enableProFallback && config.geminiModel.includes('pro')) {
        logger.warn(`Transcript unavailable, falling back to native video mode`, { videoId });
        processingMode = 'native-video';
      } else {
        throw error;
      }
    }
  }

  // 3. Classify video by taxonomy (for prompt selection and frontmatter)
  const taxonomy = classifyVideo(metadata.duration);
  logger.info(`Video classified as ${taxonomy.length}`, {
    videoId,
    duration: metadata.duration
  });

  // 4. Generate summary (with automatic fallback on quota exhaustion)
  const summary = await aiService.generateSummary({
    metadata,
    transcript,
    mode: processingMode
  });

  // 5. Write all files to video folder

  // 5a. Write transcript.json (if available)
  if (transcriptData) {
    await contentWriter.writeTranscript(videoId, transcriptData);
  }

  // 5b. Write metadata.yml
  await contentWriter.writeMetadata(videoId, metadata, {
    playlistId: playlist?.playlistId || process.env.YOUTUBE_PLAYLIST_ID,
    playlistName: playlist?.playlistName,
    category: playlist?.category,
    processedAt: new Date().toISOString(),
    lengthCategory: taxonomy.length,
    modelUsed: summary.modelUsed,
    aiProvider: summary.metrics.provider,
    apiCalls: summary.metrics.apiCalls,
    fallbackAttempts: summary.metrics.fallbackAttempts,
    inputTokens: summary.metrics.inputTokens,
    outputTokens: summary.metrics.outputTokens,
    totalTokens: summary.metrics.totalTokens,
    processingTimeMs: summary.metrics.processingTimeMs
  });

  // 5c. Write summary.md (filesystem is source of truth for "processed")
  await contentWriter.writeMarkdown({
    videoId,
    metadata,
    summary,
    lengthCategory: taxonomy.length,
    playlist
  });
}

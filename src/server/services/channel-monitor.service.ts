import type { ChannelConfig, ChannelCheckResult, MonitorResult, ChannelsConfig, MonitorOptions, ChannelProgressCallback } from '~/types/channels';
import { loadConfig } from '~/server/utils/config';
import { loadChannelsConfig } from '~/server/utils/channels-config';
import { logger } from '~/server/utils/logger';
import { createRssService } from './rss.service';
import { createYouTubeService } from './youtube.service';
import { createGroqWhisperService } from './groq-whisper.service';
import { createAIService } from './ai.service';
import { createContentWriterService } from './content-writer.service';
import { createProcessingLogService } from './processing-log.service';
import { processVideo } from './sync.service';
import { isShortVideo } from '~/server/utils/duration';

// Delay between processing channels to avoid rate limiting
const CHANNEL_DELAY_MS = 1000;

// Delay between processing videos (same as sync.service.ts)
const VIDEO_PROCESSING_DELAY_MS = 30000;

/**
 * Monitor YouTube channels for new videos and process them
 */
export class ChannelMonitorService {
  private rssService = createRssService();
  private youtubeService: ReturnType<typeof createYouTubeService>;
  private aiService: ReturnType<typeof createAIService>;
  private contentWriter: ReturnType<typeof createContentWriterService>;
  private processingLog: ReturnType<typeof createProcessingLogService>;
  private appConfig: ReturnType<typeof loadConfig>;
  private channelsConfig: ChannelsConfig;

  constructor() {
    this.appConfig = loadConfig();
    this.channelsConfig = loadChannelsConfig();

    const groqWhisper = this.appConfig.groqApiKey ? createGroqWhisperService(this.appConfig.groqApiKey) : undefined;
    this.youtubeService = createYouTubeService(this.appConfig.youtubeApiKey, groqWhisper);
    this.aiService = createAIService({
      geminiApiKey: this.appConfig.geminiApiKey,
      primaryModel: this.appConfig.geminiModel,
      openRouterApiKey: this.appConfig.openRouterApiKey,
      enableFallback: this.appConfig.enableModelFallback
    });
    this.contentWriter = createContentWriterService(this.appConfig.outputDir);
    this.processingLog = createProcessingLogService();
  }

  /**
   * Monitor all enabled channels for new videos
   */
  async monitorAllChannels(options?: MonitorOptions): Promise<MonitorResult> {
    const { channelIds, dryRun = false, onProgress } = options || {};

    logger.info('Starting channel monitoring', {
      totalChannels: this.channelsConfig.channels.length,
      filterChannels: channelIds?.length || 'all',
      dryRun
    });

    // Filter channels if specific IDs provided
    let channelsToCheck = this.channelsConfig.channels;
    if (channelIds && channelIds.length > 0) {
      channelsToCheck = channelsToCheck.filter(c => channelIds.includes(c.id));
    }

    const results: ChannelCheckResult[] = [];
    const errors: string[] = [];

    // Emit start event
    onProgress?.({ type: 'start', totalChannels: channelsToCheck.length });

    for (const [index, channel] of channelsToCheck.entries()) {
      // Emit channel progress
      onProgress?.({
        type: 'channel',
        channelName: channel.name || channel.id,
        channelIndex: index + 1,
        totalChannels: channelsToCheck.length
      });
      // Skip disabled channels
      if (channel.enabled === false) {
        results.push({
          channelId: channel.id,
          channelName: channel.name || 'Unknown',
          status: 'skipped',
          videosFound: 0,
          videosProcessed: 0,
          videosSkipped: 0,
          error: 'Channel is disabled'
        });
        continue;
      }

      // Add delay between channels (skip first one)
      if (index > 0) {
        logger.info(`Waiting ${CHANNEL_DELAY_MS}ms before next channel (rate limiting)...`);
        await this.delay(CHANNEL_DELAY_MS);
      }

      try {
        const result = await this.checkChannel(channel, dryRun, onProgress);
        results.push(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        errors.push(`Channel ${channel.id}: ${errorMessage}`);

        results.push({
          channelId: channel.id,
          channelName: channel.name || 'Unknown',
          status: 'failed',
          videosFound: 0,
          videosProcessed: 0,
          videosSkipped: 0,
          error: errorMessage
        });

        // Continue with other channels (skip failed ones)
        logger.error(`Failed to check channel ${channel.id}, continuing...`, { error: errorMessage });
      }
    }

    // Aggregate summary
    const summary = {
      totalChannels: results.length,
      successfulChannels: results.filter(r => r.status === 'success').length,
      failedChannels: results.filter(r => r.status === 'failed').length,
      skippedChannels: results.filter(r => r.status === 'skipped').length,
      videosFound: results.reduce((sum, r) => sum + r.videosFound, 0),
      videosProcessed: results.reduce((sum, r) => sum + r.videosProcessed, 0),
      videosSkipped: results.reduce((sum, r) => sum + r.videosSkipped, 0)
    };

    const monitorResult: MonitorResult = {
      success: summary.failedChannels === 0,
      summary,
      results,
      errors
    };

    logger.info('Channel monitoring completed', summary);

    // Emit complete event
    onProgress?.({ type: 'complete', result: monitorResult });

    return monitorResult;
  }

  /**
   * Check a single channel for new videos
   */
  private async checkChannel(channel: ChannelConfig, dryRun: boolean, onProgress?: ChannelProgressCallback): Promise<ChannelCheckResult> {
    logger.info(`Checking channel ${channel.id}`, { name: channel.name });

    // Fetch RSS feed
    const videos = await this.rssService.getChannelVideos(channel.id);

    // Limit to maxVideosPerChannel
    const maxVideos = this.channelsConfig.settings.maxVideosPerChannel;
    const videosToCheck = videos.slice(0, maxVideos);

    let processed = 0;
    let skipped = 0;
    const skipThreshold = this.channelsConfig.settings.skipShortsUnderSeconds;

    for (const [videoIndex, video] of videosToCheck.entries()) {
      // Check if already processed (file exists)
      const exists = await this.contentWriter.exists(video.videoId);
      if (exists) {
        logger.debug(`Video ${video.videoId} already processed, skipping`);
        skipped++;
        continue;
      }

      // Check processing log for cross-source deduplication
      // (e.g., if playlist sync already processed or is processing this video)
      const skipCheck = await this.processingLog.shouldSkip(video.videoId);
      if (skipCheck.skip) {
        logger.debug(`Video ${video.videoId} skipped via processing log: ${skipCheck.reason}`);
        skipped++;
        continue;
      }

      // Check if it's a Short (get metadata for duration)
      try {
        const metadata = await this.youtubeService.getVideoMetadata(video.videoId);

        if (isShortVideo(metadata.duration, skipThreshold)) {
          logger.info(`Skipping Short video: ${video.title}`, {
            videoId: video.videoId,
            duration: metadata.duration
          });
          skipped++;
          continue;
        }

        if (dryRun) {
          logger.info(`[DRY RUN] Would process: ${video.title}`, { videoId: video.videoId });
          processed++;
          continue;
        }

        // Add delay between video processing (skip first one)
        if (processed > 0) {
          logger.info(`Waiting ${VIDEO_PROCESSING_DELAY_MS / 1000}s before next video (rate limiting)...`);
          await this.delay(VIDEO_PROCESSING_DELAY_MS);
        }

        // Emit video progress event
        onProgress?.({
          type: 'video',
          channelName: channel.name || channel.id,
          videoTitle: video.title,
          videoIndex: videoIndex + 1,
          totalVideos: videosToCheck.length
        });

        // Record processing start (for cross-source deduplication)
        await this.processingLog.recordProcessingStart(video.videoId, video.title, 'channel');

        // Process the video through existing pipeline
        logger.info(`Processing video: ${video.title}`, { videoId: video.videoId });
        await processVideo(
          video.videoId,
          this.appConfig,
          this.youtubeService,
          this.aiService,
          this.contentWriter
        );

        // Record success
        await this.processingLog.recordSuccess(video.videoId, video.title);

        processed++;
        logger.info(`Successfully processed ${video.videoId}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error(`Failed to process video ${video.videoId}`, { error: errorMessage });

        // Record failure (handles error classification and retry logic)
        await this.processingLog.recordFailure(
          video.videoId,
          error instanceof Error ? error : errorMessage,
          video.title
        );

        // Continue with other videos, don't fail the whole channel
        skipped++;
      }
    }

    return {
      channelId: channel.id,
      channelName: channel.name || videos[0]?.channelName || 'Unknown',
      status: 'success',
      videosFound: videos.length,
      videosProcessed: processed,
      videosSkipped: skipped
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Create channel monitor service instance
 */
export function createChannelMonitorService(): ChannelMonitorService {
  return new ChannelMonitorService();
}

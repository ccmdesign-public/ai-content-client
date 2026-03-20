import type { SyncResult } from '~/types/config';
import type {
  PlaylistConfig,
  PlaylistSyncResult,
  MultiPlaylistSyncResult,
  PlaylistSyncOptions,
  PlaylistProgressCallback
} from '~/types/playlists';
import { loadPlaylistsConfig, getPlaylistSettings } from '~/server/utils/playlists-config';
import { loadConfig } from '~/server/utils/config';
import { logger } from '~/server/utils/logger';
import { createYouTubeService } from './youtube.service';
import { createGroqWhisperService } from './groq-whisper.service';
import { createAIService } from './ai.service';
import { createContentWriterService } from './content-writer.service';
import { createProcessingLogService } from './processing-log.service';
import { processVideo } from './sync.service';

/**
 * Main orchestration function for syncing multiple YouTube playlists
 */
export async function syncAllPlaylists(
  options?: PlaylistSyncOptions
): Promise<MultiPlaylistSyncResult> {
  const playlistsConfig = loadPlaylistsConfig();
  const settings = getPlaylistSettings();
  const appConfig = loadConfig();
  const { playlistIds, dryRun = false, onProgress } = options || {};

  // Filter to enabled playlists (or specified playlist IDs)
  let playlistsToSync = playlistsConfig.playlists.filter(p => p.enabled !== false);

  if (playlistIds?.length) {
    playlistsToSync = playlistsToSync.filter(p => playlistIds.includes(p.id));
  }

  logger.info('Starting multi-playlist sync', {
    totalPlaylists: playlistsToSync.length,
    playlistIds: playlistsToSync.map(p => p.id),
    dryRun
  });

  // Initialize result structure
  const result: MultiPlaylistSyncResult = {
    success: true,
    summary: {
      totalPlaylists: playlistsToSync.length,
      successfulPlaylists: 0,
      failedPlaylists: 0,
      skippedPlaylists: 0,
      videosFound: 0,
      videosProcessed: 0,
      videosSkipped: 0
    },
    results: [],
    errors: []
  };

  if (playlistsToSync.length === 0) {
    logger.warn('No enabled playlists to sync');
    return result;
  }

  // Initialize services
  const groqWhisper = appConfig.groqApiKey ? createGroqWhisperService(appConfig.groqApiKey) : undefined;
  const youtubeService = createYouTubeService(appConfig.youtubeApiKey, groqWhisper);
  const aiService = createAIService({
    geminiApiKey: appConfig.geminiApiKey,
    primaryModel: appConfig.geminiModel,
    openRouterApiKey: appConfig.openRouterApiKey,
    enableFallback: appConfig.enableModelFallback
  });
  const contentWriter = createContentWriterService(appConfig.outputDir);
  const processingLog = createProcessingLogService();

  // Emit start event
  onProgress?.({
    type: 'start',
    totalPlaylists: playlistsToSync.length
  });

  // Process each playlist
  for (const [index, playlist] of playlistsToSync.entries()) {
    // Add delay between playlists (skip first one)
    if (index > 0) {
      logger.info(`Waiting ${settings.playlistDelayMs}ms before next playlist (rate limiting)...`);
      await delay(settings.playlistDelayMs);
    }

    // Emit playlist progress event
    onProgress?.({
      type: 'playlist',
      playlistName: playlist.name,
      playlistIndex: index + 1,
      totalPlaylists: playlistsToSync.length
    });

    logger.info(`Processing playlist ${index + 1}/${playlistsToSync.length}: ${playlist.name}`, {
      playlistId: playlist.id,
      category: playlist.category
    });

    try {
      const playlistResult = await syncSinglePlaylist(
        playlist,
        appConfig,
        settings,
        youtubeService,
        aiService,
        contentWriter,
        processingLog,
        dryRun,
        onProgress
      );

      result.results.push(playlistResult);

      // Update summary
      if (playlistResult.status === 'success') {
        result.summary.successfulPlaylists++;
      } else if (playlistResult.status === 'failed') {
        result.summary.failedPlaylists++;
        result.success = false;
        if (playlistResult.error) {
          result.errors.push(`${playlist.name}: ${playlistResult.error}`);
        }
      } else {
        result.summary.skippedPlaylists++;
      }

      result.summary.videosFound += playlistResult.videosFound;
      result.summary.videosProcessed += playlistResult.videosProcessed;
      result.summary.videosSkipped += playlistResult.videosSkipped;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      logger.error(`Failed to sync playlist ${playlist.name}`, { error: errorMessage });

      result.results.push({
        playlistId: playlist.id,
        playlistName: playlist.name,
        status: 'failed',
        videosFound: 0,
        videosProcessed: 0,
        videosSkipped: 0,
        error: errorMessage
      });

      result.summary.failedPlaylists++;
      result.success = false;
      result.errors.push(`${playlist.name}: ${errorMessage}`);
    }
  }

  // Emit complete event
  onProgress?.({
    type: 'complete',
    result
  });

  logger.info('Multi-playlist sync completed', result.summary);

  return result;
}

/**
 * Sync a single playlist
 */
async function syncSinglePlaylist(
  playlist: PlaylistConfig,
  appConfig: ReturnType<typeof loadConfig>,
  settings: ReturnType<typeof getPlaylistSettings>,
  youtubeService: ReturnType<typeof createYouTubeService>,
  aiService: ReturnType<typeof createAIService>,
  contentWriter: ReturnType<typeof createContentWriterService>,
  processingLog: ReturnType<typeof createProcessingLogService>,
  dryRun: boolean,
  onProgress?: PlaylistProgressCallback
): Promise<PlaylistSyncResult> {
  const result: PlaylistSyncResult = {
    playlistId: playlist.id,
    playlistName: playlist.name,
    status: 'success',
    videosFound: 0,
    videosProcessed: 0,
    videosSkipped: 0
  };

  // Fetch playlist items
  logger.info(`Fetching items from playlist: ${playlist.name}`);
  const playlistItems = await youtubeService.getPlaylistItems(playlist.id);

  result.videosFound = playlistItems.length;

  if (playlistItems.length === 0) {
    logger.info(`No videos found in playlist: ${playlist.name}`);
    return result;
  }

  // Filter out already processed videos
  const skipChecks = await Promise.all(
    playlistItems.map(async (item) => {
      const fileExists = await contentWriter.exists(item.videoId);
      if (fileExists) {
        return { skip: true, reason: 'File exists' };
      }
      return processingLog.shouldSkip(item.videoId);
    })
  );

  const newVideos = playlistItems.filter((_, index) => !skipChecks[index].skip);
  result.videosSkipped = playlistItems.length - newVideos.length;

  logger.info(`Found ${newVideos.length} new videos in ${playlist.name} (${result.videosSkipped} skipped)`);

  // Apply per-playlist or global max videos limit
  const maxVideos = playlist.maxVideosPerRun || settings.maxVideosPerPlaylist;
  const videosToProcess = newVideos.slice(0, maxVideos);

  if (videosToProcess.length < newVideos.length) {
    logger.info(`Processing ${videosToProcess.length} of ${newVideos.length} new videos (limit: ${maxVideos})`);
    result.videosSkipped += newVideos.length - videosToProcess.length;
  }

  if (dryRun) {
    logger.info(`[DRY RUN] Would process ${videosToProcess.length} videos from ${playlist.name}`);
    return result;
  }

  // Process each video
  const VIDEO_PROCESSING_DELAY = 30000; // 30 seconds between videos

  for (const [index, item] of videosToProcess.entries()) {
    // Add delay between videos (skip first one)
    if (index > 0) {
      logger.info(`Waiting ${VIDEO_PROCESSING_DELAY / 1000}s before next video (rate limiting)...`);
      await delay(VIDEO_PROCESSING_DELAY);
    }

    logger.info(`Processing video ${index + 1}/${videosToProcess.length}: ${item.title}`);

    // Emit video progress event
    onProgress?.({
      type: 'video',
      playlistName: playlist.name,
      videoTitle: item.title,
      videoIndex: index + 1,
      totalVideos: videosToProcess.length
    });

    try {
      // Record processing start
      await processingLog.recordProcessingStart(item.videoId, item.title, 'playlist');

      // Process the video with playlist metadata
      await processVideo(
        item.videoId,
        appConfig,
        youtubeService,
        aiService,
        contentWriter,
        {
          playlistId: playlist.id,
          playlistName: playlist.name,
          category: playlist.category
        }
      );

      // Record success
      await processingLog.recordSuccess(item.videoId, item.title);

      result.videosProcessed++;
      logger.info(`Successfully processed ${item.videoId}`);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Record failure
      await processingLog.recordFailure(
        item.videoId,
        error instanceof Error ? error : errorMessage,
        item.title
      );

      logger.error(`Failed to process video ${item.videoId}`, { error: errorMessage });

      // Continue with next video (partial failure)
    }
  }

  return result;
}

/**
 * Helper function to delay execution
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a playlist sync service instance (for compatibility with other services)
 */
export class PlaylistSyncService {
  async syncAllPlaylists(options?: PlaylistSyncOptions): Promise<MultiPlaylistSyncResult> {
    return syncAllPlaylists(options);
  }
}

export function createPlaylistSyncService(): PlaylistSyncService {
  return new PlaylistSyncService();
}

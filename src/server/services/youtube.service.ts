import { google } from 'googleapis';
import { getSubtitles } from 'youtube-caption-extractor';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { PlaylistItem, VideoMetadata } from '~/types/youtube';
import type { TranscriptData, TranscriptSegment } from '~/types/transcript';
import { logger } from '~/server/utils/logger';
import { retryWithBackoff } from '~/server/utils/retry';
import { youtubeApiLimiter } from '~/server/utils/rate-limiter';
import type { GroqWhisperService } from './groq-whisper.service';

const execAsync = promisify(exec);

export class YouTubeService {
  private youtube;

  constructor(
    apiKey: string,
    private groqWhisper?: GroqWhisperService
  ) {
    this.youtube = google.youtube({
      version: 'v3',
      auth: apiKey
    });
  }

  /**
   * Fetch all videos from a playlist (with pagination)
   */
  async getPlaylistItems(playlistId: string): Promise<PlaylistItem[]> {
    const items: PlaylistItem[] = [];
    let pageToken: string | undefined;

    do {
      await youtubeApiLimiter.acquire();

      const response = await retryWithBackoff(() =>
        this.youtube.playlistItems.list({
          part: ['snippet'],
          playlistId,
          maxResults: 50,
          pageToken
        })
      );

      if (!response.data.items) {
        break;
      }

      items.push(
        ...response.data.items.map(item => ({
          videoId: item.snippet!.resourceId!.videoId!,
          title: item.snippet!.title || 'Untitled',
          position: item.snippet!.position || 0
        }))
      );

      pageToken = response.data.nextPageToken || undefined;
    } while (pageToken);

    logger.info(`Fetched ${items.length} videos from playlist ${playlistId}`);
    return items;
  }

  /**
   * Get metadata for a specific video
   */
  async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
    await youtubeApiLimiter.acquire();

    const response = await retryWithBackoff(() =>
      this.youtube.videos.list({
        part: ['snippet', 'contentDetails'],
        id: [videoId]
      })
    );

    const video = response.data.items?.[0];
    if (!video) {
      throw new Error(`VIDEO_NOT_FOUND: ${videoId}`);
    }

    return {
      videoId,
      title: video.snippet!.title || 'Untitled',
      description: video.snippet!.description || '',
      channel: video.snippet!.channelTitle || 'Unknown Channel',
      channelId: video.snippet!.channelId || '',
      duration: video.contentDetails!.duration || 'PT0S',
      publishedAt: video.snippet!.publishedAt || new Date().toISOString(),
      thumbnailUrl: video.snippet!.thumbnails?.high?.url || video.snippet!.thumbnails?.default?.url || ''
    };
  }

  /**
   * Get transcript for a video using youtube-caption-extractor
   */
  private async getTranscriptFromCaptionExtractor(videoId: string): Promise<string> {
    const subtitles = await getSubtitles({ videoID: videoId, lang: 'en' });

    if (!subtitles || subtitles.length === 0) {
      throw new Error('No transcript segments found');
    }

    const transcript = subtitles
      .map(segment => segment.text)
      .filter(text => text.length > 0)
      .join(' ');

    if (!transcript) {
      throw new Error('Empty transcript');
    }

    return transcript;
  }

  /**
   * Get transcript for a video using yt-dlp (fallback method)
   */
  private async getTranscriptFromYtDlp(videoId: string): Promise<string> {
    const tempDir = tmpdir();
    const outputPath = join(tempDir, `${videoId}`);
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      // Download subtitles using yt-dlp
      await execAsync(
        `yt-dlp --skip-download --write-auto-sub --sub-lang en --sub-format vtt --convert-subs srt -o "${outputPath}" "${url}"`,
        { timeout: 60000 }
      );

      // Read the subtitle file
      const srtPath = `${outputPath}.en.srt`;
      const srtContent = await readFile(srtPath, 'utf-8');

      // Parse SRT to extract text
      const transcript = srtContent
        .split('\n')
        .filter((line: string) => {
          // Skip empty lines, sequence numbers, and timestamps
          if (!line.trim()) return false;
          if (/^\d+$/.test(line.trim())) return false;
          if (/^\d{2}:\d{2}:\d{2}/.test(line.trim())) return false;
          return true;
        })
        .map((line: string) => line.replace(/<[^>]*>/g, '').trim()) // Remove HTML tags
        .filter((text: string) => text.length > 0)
        .join(' ');

      // Cleanup temp file
      await unlink(srtPath).catch(() => {});

      if (!transcript) {
        throw new Error('Empty transcript from yt-dlp');
      }

      return transcript;
    } catch (error) {
      // Cleanup any partial files
      await unlink(`${outputPath}.en.srt`).catch(() => {});
      await unlink(`${outputPath}.en.vtt`).catch(() => {});
      throw error;
    }
  }

  /**
   * Get transcript with timestamp data from youtube-caption-extractor
   */
  private async getTranscriptDataFromCaptionExtractor(videoId: string): Promise<TranscriptData> {
    const subtitles = await getSubtitles({ videoID: videoId, lang: 'en' });

    if (!subtitles || subtitles.length === 0) {
      throw new Error('No transcript segments found');
    }

    const segments: TranscriptSegment[] = subtitles
      .filter(segment => segment.text && segment.text.length > 0)
      .map(segment => ({
        start: parseFloat(segment.start) || 0,
        duration: parseFloat(segment.dur) || 0,
        text: segment.text
      }));

    const fullText = segments.map(s => s.text).join(' ');

    if (!fullText) {
      throw new Error('Empty transcript');
    }

    return {
      videoId,
      language: 'en',
      source: 'caption-extractor',
      segments,
      fullText,
      fetchedAt: new Date().toISOString()
    };
  }

  /**
   * Parse SRT content preserving timestamps
   */
  private parseSrtWithTimestamps(srtContent: string): TranscriptSegment[] {
    const segments: TranscriptSegment[] = [];
    const blocks = srtContent.trim().split(/\n\n+/);

    for (const block of blocks) {
      const lines = block.split('\n');
      if (lines.length < 2) continue;

      // Find the timestamp line (format: "00:00:01,000 --> 00:00:04,500")
      const timestampLine = lines.find(line =>
        /\d{2}:\d{2}:\d{2},\d{3}\s*-->\s*\d{2}:\d{2}:\d{2},\d{3}/.test(line)
      );

      if (!timestampLine) continue;

      const timestampMatch = timestampLine.match(
        /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/
      );

      if (timestampMatch) {
        const startSeconds =
          parseInt(timestampMatch[1]) * 3600 +
          parseInt(timestampMatch[2]) * 60 +
          parseInt(timestampMatch[3]) +
          parseInt(timestampMatch[4]) / 1000;

        const endSeconds =
          parseInt(timestampMatch[5]) * 3600 +
          parseInt(timestampMatch[6]) * 60 +
          parseInt(timestampMatch[7]) +
          parseInt(timestampMatch[8]) / 1000;

        // Get text lines (everything after timestamp line)
        const timestampIndex = lines.indexOf(timestampLine);
        const textLines = lines.slice(timestampIndex + 1);
        const text = textLines
          .join(' ')
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .trim();

        if (text) {
          segments.push({
            start: startSeconds,
            duration: endSeconds - startSeconds,
            text
          });
        }
      }
    }

    return segments;
  }

  /**
   * Get transcript with timestamp data from yt-dlp
   */
  private async getTranscriptDataFromYtDlp(videoId: string): Promise<TranscriptData> {
    const tempDir = tmpdir();
    const outputPath = join(tempDir, `${videoId}`);
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      // Download subtitles using yt-dlp
      await execAsync(
        `yt-dlp --skip-download --write-auto-sub --sub-lang en --sub-format vtt --convert-subs srt -o "${outputPath}" "${url}"`,
        { timeout: 60000 }
      );

      // Read the subtitle file
      const srtPath = `${outputPath}.en.srt`;
      const srtContent = await readFile(srtPath, 'utf-8');

      // Parse SRT preserving timestamps
      const segments = this.parseSrtWithTimestamps(srtContent);

      // Cleanup temp file
      await unlink(srtPath).catch(() => {});

      const fullText = segments.map(s => s.text).join(' ');

      if (!fullText) {
        throw new Error('Empty transcript from yt-dlp');
      }

      return {
        videoId,
        language: 'en',
        source: 'yt-dlp',
        segments,
        fullText,
        fetchedAt: new Date().toISOString()
      };
    } catch (error) {
      // Cleanup any partial files
      await unlink(`${outputPath}.en.srt`).catch(() => {});
      await unlink(`${outputPath}.en.vtt`).catch(() => {});
      throw error;
    }
  }

  /**
   * Download audio from a YouTube video using yt-dlp + ffmpeg
   * @returns Path to the downloaded .mp3 file
   * @throws Error if download fails or audio is unavailable
   */
  private async downloadAudio(videoId: string): Promise<string> {
    const tempDir = tmpdir();
    const outputTemplate = join(tempDir, `${videoId}.%(ext)s`);
    const expectedPath = join(tempDir, `${videoId}.mp3`);
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      await execAsync(
        `yt-dlp -x --audio-format mp3 --audio-quality 5 -o "${outputTemplate}" "${url}"`,
        { timeout: 120_000 }
      );
      return expectedPath;
    } catch (error) {
      // Cleanup partial files (yt-dlp may leave .part, .webm, .mp3 fragments)
      await this.cleanupAudioFile(expectedPath);
      await this.cleanupAudioFile(join(tempDir, `${videoId}.webm`));
      await this.cleanupAudioFile(join(tempDir, `${videoId}.part`));

      const message = error instanceof Error ? error.message : String(error);
      if (message.includes('is not available') || message.includes('Private video') || message.includes('Video unavailable')) {
        throw new Error('AUDIO_UNAVAILABLE');
      }
      throw error;
    }
  }

  /**
   * Clean up a temporary audio file, swallowing errors
   */
  private async cleanupAudioFile(filePath: string): Promise<void> {
    await unlink(filePath).catch(() => {});
  }

  /**
   * Get transcript with full timestamp data
   * @throws Error with code 'TRANSCRIPT_UNAVAILABLE' if transcript cannot be fetched
   */
  async getTranscriptWithTimestamps(videoId: string): Promise<TranscriptData> {
    // Try youtube-caption-extractor first
    try {
      const transcriptData = await this.getTranscriptDataFromCaptionExtractor(videoId);
      logger.info(`Fetched transcript with timestamps for ${videoId} via caption-extractor`, {
        segments: transcriptData.segments.length,
        length: transcriptData.fullText.length
      });
      return transcriptData;
    } catch (extractorError) {
      logger.debug(`Caption extractor failed for ${videoId}, trying yt-dlp`, {
        error: extractorError instanceof Error ? extractorError.message : String(extractorError)
      });
    }

    // Fallback to yt-dlp
    try {
      const transcriptData = await this.getTranscriptDataFromYtDlp(videoId);
      logger.info(`Fetched transcript with timestamps for ${videoId} via yt-dlp`, {
        segments: transcriptData.segments.length,
        length: transcriptData.fullText.length
      });
      return transcriptData;
    } catch (ytdlpError) {
      logger.debug(`yt-dlp subtitles failed for ${videoId}, trying Groq Whisper fallback`, {
        error: ytdlpError instanceof Error ? ytdlpError.message : String(ytdlpError)
      });

      // Fallback to Groq Whisper audio transcription
      if (this.groqWhisper) {
        try {
          const audioPath = await this.downloadAudio(videoId);
          try {
            const transcriptData = await this.groqWhisper.transcribeFromFile(audioPath, videoId);
            logger.info(`Fetched transcript with timestamps for ${videoId} via groq-whisper`, {
              segments: transcriptData.segments.length,
              length: transcriptData.fullText.length
            });
            return transcriptData;
          } finally {
            await this.cleanupAudioFile(audioPath);
          }
        } catch (whisperError) {
          const whisperMessage = whisperError instanceof Error ? whisperError.message : String(whisperError);
          logger.warn(`Groq Whisper fallback failed for ${videoId}`, { error: whisperMessage });

          // Distinguish audio-level failures from transcription failures
          if (whisperMessage === 'AUDIO_UNAVAILABLE' || whisperMessage === 'AUDIO_TOO_LARGE') {
            const audioError = new Error(whisperMessage);
            audioError.cause = whisperError;
            throw audioError;
          }
          // Fall through to TRANSCRIPT_UNAVAILABLE for other failures
        }
      }

      logger.warn(`Transcript unavailable for ${videoId}`, {
        error: ytdlpError instanceof Error ? ytdlpError.message : String(ytdlpError)
      });

      const transcriptError = new Error('TRANSCRIPT_UNAVAILABLE');
      transcriptError.cause = ytdlpError;
      throw transcriptError;
    }
  }

  /**
   * Get transcript for a video
   * @throws Error with code 'TRANSCRIPT_UNAVAILABLE' if transcript cannot be fetched
   */
  async getTranscript(videoId: string): Promise<string> {
    // Try youtube-caption-extractor first
    try {
      const transcript = await this.getTranscriptFromCaptionExtractor(videoId);
      logger.info(`Fetched transcript for ${videoId} via caption-extractor`, {
        length: transcript.length
      });
      return transcript;
    } catch (extractorError) {
      logger.debug(`Caption extractor failed for ${videoId}, trying yt-dlp`, {
        error: extractorError instanceof Error ? extractorError.message : String(extractorError)
      });
    }

    // Fallback to yt-dlp
    try {
      const transcript = await this.getTranscriptFromYtDlp(videoId);
      logger.info(`Fetched transcript for ${videoId} via yt-dlp`, {
        length: transcript.length
      });
      return transcript;
    } catch (ytdlpError) {
      logger.debug(`yt-dlp subtitles failed for ${videoId}, trying Groq Whisper fallback`, {
        error: ytdlpError instanceof Error ? ytdlpError.message : String(ytdlpError)
      });

      // Fallback to Groq Whisper audio transcription
      if (this.groqWhisper) {
        try {
          const audioPath = await this.downloadAudio(videoId);
          try {
            const transcriptData = await this.groqWhisper.transcribeFromFile(audioPath, videoId);
            logger.info(`Fetched transcript for ${videoId} via groq-whisper`, {
              length: transcriptData.fullText.length
            });
            return transcriptData.fullText;
          } finally {
            await this.cleanupAudioFile(audioPath);
          }
        } catch (whisperError) {
          const whisperMessage = whisperError instanceof Error ? whisperError.message : String(whisperError);
          logger.warn(`Groq Whisper fallback failed for ${videoId}`, { error: whisperMessage });

          if (whisperMessage === 'AUDIO_UNAVAILABLE' || whisperMessage === 'AUDIO_TOO_LARGE') {
            const audioError = new Error(whisperMessage);
            audioError.cause = whisperError;
            throw audioError;
          }
        }
      }

      logger.warn(`Transcript unavailable for ${videoId}`, {
        error: ytdlpError instanceof Error ? ytdlpError.message : String(ytdlpError)
      });

      const transcriptError = new Error('TRANSCRIPT_UNAVAILABLE');
      transcriptError.cause = ytdlpError;
      throw transcriptError;
    }
  }
}

/**
 * Create YouTube service instance from config
 */
export function createYouTubeService(apiKey: string, groqWhisper?: GroqWhisperService): YouTubeService {
  return new YouTubeService(apiKey, groqWhisper);
}

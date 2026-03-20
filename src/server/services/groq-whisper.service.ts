import { readFile, stat } from 'node:fs/promises';
import type { TranscriptData, TranscriptSegment } from '~/types/transcript';
import { logger } from '~/server/utils/logger';
import { groqWhisperLimiter } from '~/server/utils/rate-limiter';

const GROQ_TRANSCRIPTION_URL = 'https://api.groq.com/openai/v1/audio/transcriptions';
const GROQ_MODEL = 'whisper-large-v3-turbo';
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

/** Shape of Groq's verbose_json response */
interface GroqWhisperResponse {
  text: string;
  language: string;
  duration: number;
  segments: Array<{
    id: number;
    start: number;
    end: number;
    text: string;
    avg_logprob: number;
    no_speech_prob: number;
  }>;
}

export class GroqWhisperService {
  constructor(private apiKey: string) {}

  /**
   * Transcribe an audio file on disk via Groq Whisper.
   * @throws Error with message 'AUDIO_TOO_LARGE' if file > 25 MB
   * @throws Error with message 'GROQ_AUTH_FAILED' on 401
   * @throws Error with message 'GROQ_RATE_LIMITED' on 429
   * @throws Error with message 'GROQ_TRANSCRIPTION_FAILED' on other API errors
   */
  async transcribeFromFile(filePath: string, videoId: string): Promise<TranscriptData> {
    // Pre-check file size
    const fileStat = await stat(filePath);
    if (fileStat.size > MAX_FILE_SIZE_BYTES) {
      logger.warn(`Audio file too large for Groq Whisper: ${(fileStat.size / 1024 / 1024).toFixed(1)} MB`, { videoId });
      throw new Error('AUDIO_TOO_LARGE');
    }

    const audioBuffer = await readFile(filePath);

    await groqWhisperLimiter.acquire();

    const formData = new FormData();
    formData.append('file', new Blob([audioBuffer]), `${videoId}.mp3`);
    formData.append('model', GROQ_MODEL);
    formData.append('response_format', 'verbose_json');
    formData.append('language', 'en');

    const response = await fetch(GROQ_TRANSCRIPTION_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: formData
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'unknown');
      if (response.status === 401) {
        throw new Error('GROQ_AUTH_FAILED');
      }
      if (response.status === 429) {
        throw new Error('GROQ_RATE_LIMITED');
      }
      throw new Error(`GROQ_TRANSCRIPTION_FAILED: ${response.status} ${errorBody}`);
    }

    const result = (await response.json()) as GroqWhisperResponse;

    const segments: TranscriptSegment[] = (result.segments || [])
      .filter(seg => seg.text && seg.text.trim().length > 0)
      .map(seg => ({
        start: seg.start,
        duration: seg.end - seg.start,
        text: seg.text.trim()
      }));

    const fullText = segments.map(s => s.text).join(' ');

    if (!fullText) {
      throw new Error('GROQ_TRANSCRIPTION_FAILED: Empty transcript from Groq Whisper');
    }

    const estimatedCost = (result.duration / 60) * 0.011;
    logger.info(`Groq Whisper transcription complete for ${videoId}`, {
      segments: segments.length,
      length: fullText.length,
      audioDurationSec: result.duration,
      estimatedCostUsd: estimatedCost.toFixed(4)
    });

    return {
      videoId,
      language: result.language || 'en',
      source: 'groq-whisper',
      segments,
      fullText,
      fetchedAt: new Date().toISOString()
    };
  }
}

export function createGroqWhisperService(apiKey: string): GroqWhisperService {
  return new GroqWhisperService(apiKey);
}

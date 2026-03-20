import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GroqWhisperService } from '~/server/services/groq-whisper.service';

// Mock rate limiter
vi.mock('~/server/utils/rate-limiter', () => ({
  groqWhisperLimiter: { acquire: vi.fn() }
}));

// Mock logger
vi.mock('~/server/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    error: vi.fn()
  }
}));

// Mock fs/promises
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
  stat: vi.fn()
}));

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('GroqWhisperService', () => {
  let service: GroqWhisperService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new GroqWhisperService('test-api-key');
  });

  describe('transcribeFromFile', () => {
    it('transcribes audio and returns TranscriptData with correct segment mapping', async () => {
      const { stat, readFile } = await import('node:fs/promises');
      vi.mocked(stat).mockResolvedValue({ size: 1024 * 1024 } as never); // 1MB
      vi.mocked(readFile).mockResolvedValue(Buffer.from('audio-data') as never);

      const mockResponse = {
        text: 'Hello world. This is a test.',
        language: 'en',
        duration: 120.5,
        segments: [
          { id: 0, start: 0.0, end: 2.5, text: ' Hello world.', avg_logprob: -0.3, no_speech_prob: 0.01 },
          { id: 1, start: 2.5, end: 5.0, text: ' This is a test.', avg_logprob: -0.2, no_speech_prob: 0.02 }
        ]
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await service.transcribeFromFile('/tmp/test.mp3', 'testVideoId');

      expect(result.videoId).toBe('testVideoId');
      expect(result.source).toBe('groq-whisper');
      expect(result.language).toBe('en');
      expect(result.segments).toHaveLength(2);
      expect(result.segments[0]).toEqual({
        start: 0.0,
        duration: 2.5,
        text: 'Hello world.'
      });
      expect(result.segments[1]).toEqual({
        start: 2.5,
        duration: 2.5,
        text: 'This is a test.'
      });
      expect(result.fullText).toBe('Hello world. This is a test.');
      expect(result.fetchedAt).toBeDefined();
    });

    it('throws AUDIO_TOO_LARGE when file exceeds 25 MB', async () => {
      const { stat } = await import('node:fs/promises');
      vi.mocked(stat).mockResolvedValue({ size: 26 * 1024 * 1024 } as never); // 26MB

      await expect(
        service.transcribeFromFile('/tmp/large.mp3', 'testVideoId')
      ).rejects.toThrow('AUDIO_TOO_LARGE');
    });

    it('throws GROQ_AUTH_FAILED on 401 response', async () => {
      const { stat, readFile } = await import('node:fs/promises');
      vi.mocked(stat).mockResolvedValue({ size: 1024 } as never);
      vi.mocked(readFile).mockResolvedValue(Buffer.from('data') as never);

      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        text: () => Promise.resolve('Unauthorized')
      });

      await expect(
        service.transcribeFromFile('/tmp/test.mp3', 'testVideoId')
      ).rejects.toThrow('GROQ_AUTH_FAILED');
    });

    it('throws GROQ_RATE_LIMITED on 429 response', async () => {
      const { stat, readFile } = await import('node:fs/promises');
      vi.mocked(stat).mockResolvedValue({ size: 1024 } as never);
      vi.mocked(readFile).mockResolvedValue(Buffer.from('data') as never);

      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        text: () => Promise.resolve('Rate limited')
      });

      await expect(
        service.transcribeFromFile('/tmp/test.mp3', 'testVideoId')
      ).rejects.toThrow('GROQ_RATE_LIMITED');
    });

    it('throws GROQ_TRANSCRIPTION_FAILED on other API errors', async () => {
      const { stat, readFile } = await import('node:fs/promises');
      vi.mocked(stat).mockResolvedValue({ size: 1024 } as never);
      vi.mocked(readFile).mockResolvedValue(Buffer.from('data') as never);

      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Internal Server Error')
      });

      await expect(
        service.transcribeFromFile('/tmp/test.mp3', 'testVideoId')
      ).rejects.toThrow('GROQ_TRANSCRIPTION_FAILED');
    });

    it('filters out empty segments', async () => {
      const { stat, readFile } = await import('node:fs/promises');
      vi.mocked(stat).mockResolvedValue({ size: 1024 } as never);
      vi.mocked(readFile).mockResolvedValue(Buffer.from('data') as never);

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          text: 'Hello',
          language: 'en',
          duration: 10,
          segments: [
            { id: 0, start: 0, end: 2, text: ' Hello', avg_logprob: -0.3, no_speech_prob: 0.01 },
            { id: 1, start: 2, end: 4, text: '  ', avg_logprob: -0.3, no_speech_prob: 0.9 },
            { id: 2, start: 4, end: 6, text: '', avg_logprob: -0.3, no_speech_prob: 0.9 }
          ]
        })
      });

      const result = await service.transcribeFromFile('/tmp/test.mp3', 'testVideoId');
      expect(result.segments).toHaveLength(1);
      expect(result.segments[0].text).toBe('Hello');
    });

    it('throws when transcript is empty', async () => {
      const { stat, readFile } = await import('node:fs/promises');
      vi.mocked(stat).mockResolvedValue({ size: 1024 } as never);
      vi.mocked(readFile).mockResolvedValue(Buffer.from('data') as never);

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          text: '',
          language: 'en',
          duration: 10,
          segments: []
        })
      });

      await expect(
        service.transcribeFromFile('/tmp/test.mp3', 'testVideoId')
      ).rejects.toThrow('GROQ_TRANSCRIPTION_FAILED');
    });
  });
});

import { describe, it, expect } from 'vitest';
import { classifyError } from '~/server/services/processing-log.service';

describe('classifyError', () => {
  describe('permanent errors', () => {
    it('classifies AUDIO_UNAVAILABLE as permanent', () => {
      const result = classifyError('AUDIO_UNAVAILABLE');
      expect(result.type).toBe('permanent');
      expect(result.code).toBe('AUDIO_UNAVAILABLE');
      expect(result.isPermanent).toBe(true);
    });

    it('classifies AUDIO_TOO_LARGE as permanent', () => {
      const result = classifyError('AUDIO_TOO_LARGE');
      expect(result.type).toBe('permanent');
      expect(result.code).toBe('AUDIO_UNAVAILABLE');
      expect(result.isPermanent).toBe(true);
    });

    it('classifies VIDEO_NOT_FOUND as permanent', () => {
      const result = classifyError('VIDEO_NOT_FOUND: abc123');
      expect(result.type).toBe('permanent');
      expect(result.code).toBe('VIDEO_NOT_FOUND');
      expect(result.isPermanent).toBe(true);
    });

    it('classifies "Video unavailable" as permanent', () => {
      const result = classifyError('Video unavailable');
      expect(result.type).toBe('permanent');
      expect(result.code).toBe('VIDEO_UNAVAILABLE');
      expect(result.isPermanent).toBe(true);
    });

    it('classifies "Private video" as permanent', () => {
      const result = classifyError('Private video');
      expect(result.type).toBe('permanent');
      expect(result.code).toBe('VIDEO_UNAVAILABLE');
      expect(result.isPermanent).toBe(true);
    });
  });

  describe('transient errors', () => {
    it('classifies TRANSCRIPT_UNAVAILABLE as transient (now recoverable via Groq Whisper)', () => {
      const result = classifyError('TRANSCRIPT_UNAVAILABLE');
      expect(result.type).toBe('transient');
      expect(result.code).toBe('UNKNOWN_ERROR');
      expect(result.isPermanent).toBe(false);
    });

    it('classifies unknown errors as transient', () => {
      const result = classifyError('Some random error');
      expect(result.type).toBe('transient');
      expect(result.code).toBe('UNKNOWN_ERROR');
      expect(result.isPermanent).toBe(false);
    });

    it('classifies GROQ_RATE_LIMITED as transient', () => {
      const result = classifyError('GROQ_RATE_LIMITED');
      expect(result.type).toBe('transient');
      expect(result.isPermanent).toBe(false);
    });

    it('classifies GROQ_TRANSCRIPTION_FAILED as transient', () => {
      const result = classifyError('GROQ_TRANSCRIPTION_FAILED: 500');
      expect(result.type).toBe('transient');
      expect(result.isPermanent).toBe(false);
    });
  });

  it('accepts Error objects', () => {
    const error = new Error('AUDIO_UNAVAILABLE');
    const result = classifyError(error);
    expect(result.type).toBe('permanent');
    expect(result.code).toBe('AUDIO_UNAVAILABLE');
  });
});

import fs from 'fs/promises';
import path from 'path';
import type {
  ProcessingLog,
  ProcessingLogEntry,
  ProcessingStatus,
  ErrorClassification
} from '~/types/processing-log';
import { logger } from '~/server/utils/logger';

const CURRENT_VERSION = '1.0.0';
const MAX_ATTEMPTS = 3;

/**
 * Permanent error patterns that should not be retried
 */
const PERMANENT_ERROR_PATTERNS = [
  'AUDIO_UNAVAILABLE',
  'AUDIO_TOO_LARGE',
  'VIDEO_NOT_FOUND',
  'Video unavailable',
  'Private video',
  'age-restricted',
  'Video is private',
  'Video has been removed',
  'This video is unavailable'
];

/**
 * Classify an error as transient or permanent
 */
export function classifyError(error: Error | string): ErrorClassification {
  const message = error instanceof Error ? error.message : error;

  for (const pattern of PERMANENT_ERROR_PATTERNS) {
    if (message.includes(pattern)) {
      return {
        type: 'permanent',
        code: pattern.includes('AUDIO') ? 'AUDIO_UNAVAILABLE' :
              pattern.includes('NOT_FOUND') ? 'VIDEO_NOT_FOUND' :
              'VIDEO_UNAVAILABLE',
        isPermanent: true
      };
    }
  }

  // Default to transient (safe to retry)
  return {
    type: 'transient',
    code: 'UNKNOWN_ERROR',
    isPermanent: false
  };
}

export class ProcessingLogService {
  private logPath: string;

  constructor(private logDir: string = 'src/data') {
    this.logPath = path.join(process.cwd(), logDir, 'processing-log.json');
  }

  /**
   * Ensure the data directory exists
   */
  private async ensureDir(): Promise<void> {
    const dir = path.dirname(this.logPath);
    await fs.mkdir(dir, { recursive: true });
  }

  /**
   * Create an empty processing log
   */
  private createEmptyLog(): ProcessingLog {
    return {
      version: CURRENT_VERSION,
      lastUpdated: new Date().toISOString(),
      entries: {}
    };
  }

  /**
   * Read the processing log from disk
   */
  async read(): Promise<ProcessingLog> {
    try {
      await this.ensureDir();
      const content = await fs.readFile(this.logPath, 'utf-8');
      return JSON.parse(content) as ProcessingLog;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return this.createEmptyLog();
      }
      logger.error('Failed to read processing log', { error });
      throw error;
    }
  }

  /**
   * Write the processing log to disk atomically
   */
  async write(log: ProcessingLog): Promise<void> {
    await this.ensureDir();

    log.lastUpdated = new Date().toISOString();
    const content = JSON.stringify(log, null, 2);

    // Write to temp file first for atomicity
    const tempPath = `${this.logPath}.tmp.${Date.now()}`;
    await fs.writeFile(tempPath, content, 'utf-8');

    // Atomic rename
    await fs.rename(tempPath, this.logPath);

    logger.debug('Processing log updated', {
      entryCount: Object.keys(log.entries).length
    });
  }

  /**
   * Get a single entry from the log
   */
  async getEntry(videoId: string): Promise<ProcessingLogEntry | undefined> {
    const log = await this.read();
    return log.entries[videoId];
  }

  /**
   * Update or create a log entry
   */
  async updateEntry(
    videoId: string,
    update: Partial<Omit<ProcessingLogEntry, 'videoId'>>
  ): Promise<ProcessingLogEntry> {
    const log = await this.read();
    const now = new Date().toISOString();

    const existing = log.entries[videoId];
    const entry: ProcessingLogEntry = {
      videoId,
      status: update.status || existing?.status || 'pending',
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      attemptCount: existing?.attemptCount || 0,
      ...existing,
      ...update
    };

    log.entries[videoId] = entry;
    await this.write(log);

    return entry;
  }

  /**
   * Record the start of processing a video
   */
  async recordProcessingStart(
    videoId: string,
    title?: string,
    source?: 'playlist' | 'channel'
  ): Promise<ProcessingLogEntry> {
    const existing = await this.getEntry(videoId);

    return this.updateEntry(videoId, {
      status: 'processing',
      title,
      source,
      attemptCount: (existing?.attemptCount || 0) + 1,
      lastAttemptAt: new Date().toISOString()
    });
  }

  /**
   * Record successful processing
   */
  async recordSuccess(videoId: string, title?: string): Promise<ProcessingLogEntry> {
    return this.updateEntry(videoId, {
      status: 'success',
      title,
      processedAt: new Date().toISOString(),
      errorType: undefined,
      errorCode: undefined,
      errorMessage: undefined
    });
  }

  /**
   * Record a processing failure
   */
  async recordFailure(
    videoId: string,
    error: Error | string,
    title?: string
  ): Promise<ProcessingLogEntry> {
    const classification = classifyError(error);
    const errorMessage = error instanceof Error ? error.message : error;
    const existing = await this.getEntry(videoId);
    const attemptCount = existing?.attemptCount || 1;

    // Determine if we should skip permanently
    const shouldSkipPermanently =
      classification.isPermanent ||
      (attemptCount >= MAX_ATTEMPTS && classification.type === 'transient');

    const skipReason = classification.isPermanent
      ? `Permanent error: ${classification.code}`
      : attemptCount >= MAX_ATTEMPTS
        ? `Max attempts (${MAX_ATTEMPTS}) reached`
        : undefined;

    return this.updateEntry(videoId, {
      status: shouldSkipPermanently ? 'skipped' : 'failed',
      title,
      errorType: classification.type,
      errorCode: classification.code,
      errorMessage,
      skipPermanently: shouldSkipPermanently,
      skipReason
    });
  }

  /**
   * Check if a video should be skipped
   */
  async shouldSkip(videoId: string): Promise<{ skip: boolean; reason?: string }> {
    const entry = await this.getEntry(videoId);

    if (!entry) {
      return { skip: false };
    }

    // Already successfully processed
    if (entry.status === 'success') {
      return { skip: true, reason: 'Already processed' };
    }

    // Permanently skipped
    if (entry.skipPermanently) {
      return { skip: true, reason: entry.skipReason || 'Permanently skipped' };
    }

    // Max attempts reached
    if (entry.attemptCount >= MAX_ATTEMPTS) {
      return { skip: true, reason: `Max attempts (${MAX_ATTEMPTS}) reached` };
    }

    return { skip: false };
  }

  /**
   * Manually skip a video
   */
  async skipVideo(videoId: string, reason: string): Promise<ProcessingLogEntry> {
    return this.updateEntry(videoId, {
      status: 'skipped',
      skipPermanently: true,
      skipReason: reason
    });
  }

  /**
   * Reset a video for retry
   */
  async resetForRetry(videoId: string): Promise<ProcessingLogEntry> {
    return this.updateEntry(videoId, {
      status: 'pending',
      attemptCount: 0,
      skipPermanently: false,
      skipReason: undefined,
      errorType: undefined,
      errorCode: undefined,
      errorMessage: undefined
    });
  }

  /**
   * Get all entries by status
   */
  async getByStatus(status: ProcessingStatus): Promise<ProcessingLogEntry[]> {
    const log = await this.read();
    return Object.values(log.entries).filter(entry => entry.status === status);
  }

  /**
   * Get statistics about the processing log
   */
  async getStats(): Promise<{
    total: number;
    success: number;
    failed: number;
    skipped: number;
    pending: number;
  }> {
    const log = await this.read();
    const entries = Object.values(log.entries);

    return {
      total: entries.length,
      success: entries.filter(e => e.status === 'success').length,
      failed: entries.filter(e => e.status === 'failed').length,
      skipped: entries.filter(e => e.status === 'skipped').length,
      pending: entries.filter(e => e.status === 'pending').length
    };
  }
}

/**
 * Create processing log service instance
 */
export function createProcessingLogService(logDir?: string): ProcessingLogService {
  return new ProcessingLogService(logDir);
}

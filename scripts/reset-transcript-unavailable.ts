/**
 * One-off script to reset TRANSCRIPT_UNAVAILABLE entries in the processing log
 * so they can be retried with the Groq Whisper fallback.
 *
 * Uses ProcessingLogService.resetForRetry() for atomic writes and validation.
 *
 * Run with: pnpm tsx scripts/reset-transcript-unavailable.ts
 */
import { createProcessingLogService } from '../src/server/services/processing-log.service';

async function main() {
  const service = createProcessingLogService();
  const log = await service.read();

  let resetCount = 0;

  for (const entry of Object.values(log.entries)) {
    if (entry.errorCode === 'TRANSCRIPT_UNAVAILABLE' && entry.skipPermanently) {
      await service.resetForRetry(entry.videoId);
      console.log(`Reset ${entry.videoId}: ${entry.title}`);
      resetCount++;
    }
  }

  console.log(`\nDone. Reset ${resetCount} entries.`);
}

main().catch(console.error);

/**
 * One-off script to reset TRANSCRIPT_UNAVAILABLE entries in the processing log
 * so they can be retried with the Groq Whisper fallback.
 *
 * Run with: pnpm tsx scripts/reset-transcript-unavailable.ts
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const LOG_PATH = path.join(process.cwd(), 'src', 'data', 'processing-log.json');

async function main() {
  const content = await fs.readFile(LOG_PATH, 'utf-8');
  const log = JSON.parse(content);

  let resetCount = 0;

  for (const [videoId, entry] of Object.entries(log.entries) as [string, Record<string, unknown>][]) {
    if (entry.errorCode === 'TRANSCRIPT_UNAVAILABLE' && entry.skipPermanently === true) {
      entry.status = 'pending';
      entry.attemptCount = 0;
      entry.skipPermanently = false;
      delete entry.skipReason;
      delete entry.errorType;
      delete entry.errorCode;
      delete entry.errorMessage;
      entry.updatedAt = new Date().toISOString();

      console.log(`Reset ${videoId}: ${entry.title}`);
      resetCount++;
    }
  }

  log.lastUpdated = new Date().toISOString();
  await fs.writeFile(LOG_PATH, JSON.stringify(log, null, 2), 'utf-8');

  console.log(`\nDone. Reset ${resetCount} entries.`);
}

main().catch(console.error);

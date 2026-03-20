# AIC-32: Groq Whisper Fallback for TRANSCRIPT_UNAVAILABLE Videos

## Overview

Add Groq Whisper (`whisper-large-v3-turbo`) as a third fallback in the transcript fetching chain so that videos currently stuck as `TRANSCRIPT_UNAVAILABLE` can be recovered via audio transcription.

**Current chain:** `caption-extractor` → `yt-dlp subtitles` → `TRANSCRIPT_UNAVAILABLE`
**New chain:** `caption-extractor` → `yt-dlp subtitles` → `Groq Whisper` → `TRANSCRIPT_UNAVAILABLE` / `AUDIO_UNAVAILABLE`

**Impact:** 25 videos currently permanently skipped will become recoverable.

**Validated benchmark:** Video AVQzG2MY858 (14m9s) — 4.3s transcription time, 1,961 words, ~$0.009 cost.

---

## Task 1: Add `'groq-whisper'` to the TranscriptData source union

**File:** `src/types/transcript.ts`

- [ ] Change the `source` field type from `'caption-extractor' | 'yt-dlp'` to `'caption-extractor' | 'yt-dlp' | 'groq-whisper'`

**No other type changes needed.** `TranscriptSegment` already has `start`, `duration`, and `text` which Groq's `verbose_json` response provides.

---

## Task 2: Add `groqApiKey` to config

**File:** `src/types/config.ts`

- [ ] Add `groqApiKey?: string` to the `AppConfig` interface

**File:** `src/server/utils/config.ts`

- [ ] Add `groqApiKey: z.string().optional()` to `ConfigSchema`
- [ ] Add `groqApiKey: process.env.GROQ_API_KEY || undefined` to the `raw` object in `loadConfig()`

**File:** `.env.example`

- [ ] Add a commented section for Groq Whisper:
  ```
  # Groq Whisper (optional -- enables audio transcription fallback for videos without captions)
  GROQ_API_KEY=
  ```

---

## Task 3: Create the Groq Whisper service

**New file:** `src/server/services/groq-whisper.service.ts`

- [ ] Create `GroqWhisperService` class with constructor accepting `apiKey: string`
- [ ] Implement `transcribe(audioBuffer: Buffer, options?: { language?: string }): Promise<TranscriptData>` method:
  - Call `https://api.groq.com/openai/v1/audio/transcriptions`
  - Model: `whisper-large-v3-turbo`
  - Set `response_format: 'verbose_json'` to get timestamped segments
  - Use `multipart/form-data` with the audio buffer as the `file` field
  - Parse response: map `segments[]` to `TranscriptSegment[]` (each segment has `start`, `end` — compute `duration = end - start`)
  - Return a partial result (without `videoId` / `fetchedAt`) so the caller can fill those in, OR accept `videoId` as a parameter
- [ ] Implement `transcribeFromFile(filePath: string, videoId: string): Promise<TranscriptData>` convenience method:
  - Read file from disk into a Buffer
  - Call `transcribe()` and populate `videoId`, `fetchedAt`, `language: 'en'`, `source: 'groq-whisper'`
- [ ] Add error handling:
  - Wrap API errors with a descriptive message (rate limits, auth failures, file too large)
  - Groq has a 25 MB file-size limit — log a warning and throw `AUDIO_TOO_LARGE` if exceeded
- [ ] Export a factory function: `createGroqWhisperService(apiKey: string): GroqWhisperService`

**Dependencies:** Use native `fetch` (available in Node 18+) or the existing `$fetch` / `ofetch` if available in the project. Use `FormData` and `Blob` from Node globals. No new npm packages required.

---

## Task 4: Add audio extraction helper to YouTubeService

**File:** `src/server/services/youtube.service.ts`

- [ ] Add private method `downloadAudio(videoId: string): Promise<string>` that:
  - Runs `yt-dlp -x --audio-format mp3 --audio-quality 5 -o "<tempDir>/<videoId>.%(ext)s" "<url>"`
  - Uses `execAsync` with a timeout of 120_000ms (audio download can be slower than subtitle fetch)
  - Returns the path to the downloaded `.mp3` file
  - On error, cleans up any partial files and re-throws
- [ ] Add private method `cleanupAudioFile(filePath: string): Promise<void>` that:
  - Deletes the file, swallowing errors (same pattern as existing SRT cleanup)

**Note:** `yt-dlp` with `-x --audio-format mp3` requires `ffmpeg` to be installed. Add a note in the `.env.example` or a startup check that logs a warning if `ffmpeg` is not found when `GROQ_API_KEY` is set.

---

## Task 5: Wire Groq Whisper into the fallback chain

**File:** `src/server/services/youtube.service.ts`

### 5a: Update constructor to accept optional Groq config

- [ ] Add an optional second constructor parameter or a `setGroqWhisperService(service)` method
- [ ] Store a `private groqWhisper?: GroqWhisperService` instance
- [ ] Update the `createYouTubeService` factory to accept config and conditionally create the Groq service only if `groqApiKey` is set

### 5b: Add Groq Whisper fallback in `getTranscriptWithTimestamps()`

- [ ] After the yt-dlp subtitle catch block (line ~329), before throwing `TRANSCRIPT_UNAVAILABLE`:
  ```
  if (this.groqWhisper) {
    try {
      const audioPath = await this.downloadAudio(videoId);
      try {
        const transcriptData = await this.groqWhisper.transcribeFromFile(audioPath, videoId);
        logger.info(`Fetched transcript for ${videoId} via groq-whisper`, { ... });
        return transcriptData;
      } finally {
        await this.cleanupAudioFile(audioPath);
      }
    } catch (whisperError) {
      logger.warn(`Groq Whisper fallback failed for ${videoId}`, { error: ... });
      // Fall through to TRANSCRIPT_UNAVAILABLE
    }
  }
  ```
- [ ] Update the final error throw: if the audio download itself failed (not the transcription), classify as `AUDIO_UNAVAILABLE` vs `TRANSCRIPT_UNAVAILABLE`

### 5c: Add Groq Whisper fallback in `getTranscript()`

- [ ] Same pattern as 5b but return `transcriptData.fullText` (string) instead of the full `TranscriptData` object

---

## Task 6: Update error classification in processing-log.service.ts

**File:** `src/server/services/processing-log.service.ts`

- [ ] Remove `'TRANSCRIPT_UNAVAILABLE'` from the `PERMANENT_ERROR_PATTERNS` array (it is now recoverable if Groq Whisper is enabled)
- [ ] Add `'AUDIO_UNAVAILABLE'` to `PERMANENT_ERROR_PATTERNS` for truly unrecoverable cases (video has no audio track, or audio cannot be downloaded)
- [ ] Update the `classifyError()` function's code-mapping logic to handle `AUDIO_UNAVAILABLE`:
  ```typescript
  code: pattern.includes('TRANSCRIPT') ? 'TRANSCRIPT_UNAVAILABLE' :
        pattern.includes('AUDIO') ? 'AUDIO_UNAVAILABLE' :
        pattern.includes('NOT_FOUND') ? 'VIDEO_NOT_FOUND' :
        'VIDEO_UNAVAILABLE',
  ```

---

## Task 7: Reset the 25 permanently-skipped TRANSCRIPT_UNAVAILABLE entries

**File:** `src/data/processing-log.json`

- [ ] Write a one-off script (or do it inline) that for each entry where `errorCode === 'TRANSCRIPT_UNAVAILABLE'` and `skipPermanently === true`:
  - Set `status` to `'pending'`
  - Set `attemptCount` to `0`
  - Set `skipPermanently` to `false`
  - Remove `skipReason`, `errorType`, `errorCode`, `errorMessage`
- [ ] Verify exactly 25 entries are reset (current count confirmed: 25)
- [ ] Alternative approach: create a script at `scripts/reset-transcript-unavailable.ts` that uses `ProcessingLogService.resetForRetry()` in a loop, which can be rerun if needed

---

## Task 8: Startup validation and logging

**File:** `src/server/services/youtube.service.ts` (or wherever the service is instantiated)

- [ ] On startup, if `GROQ_API_KEY` is set, log: `Groq Whisper fallback enabled for transcript recovery`
- [ ] On startup, if `GROQ_API_KEY` is NOT set, log (debug level): `Groq Whisper fallback disabled (GROQ_API_KEY not set)`
- [ ] If `GROQ_API_KEY` is set, check for `ffmpeg` availability (`which ffmpeg`) and warn if missing

---

## Task 9: Testing

- [ ] Unit test for `GroqWhisperService`:
  - Mock the Groq API response (verbose_json format)
  - Verify segment mapping (`start`, `duration`, `text`)
  - Verify error handling (API failure, file too large)
- [ ] Unit test for updated `classifyError()`:
  - `TRANSCRIPT_UNAVAILABLE` should now classify as `transient` (not permanent)
  - `AUDIO_UNAVAILABLE` should classify as `permanent`
- [ ] Integration test for the fallback chain:
  - Mock caption-extractor failure → yt-dlp failure → Groq Whisper success → verify `source: 'groq-whisper'`
  - Mock all three failures → verify `TRANSCRIPT_UNAVAILABLE` is thrown
  - Mock Groq Whisper not configured → verify `TRANSCRIPT_UNAVAILABLE` is thrown (old behavior)

---

## File Change Summary

| File | Action |
|------|--------|
| `src/types/transcript.ts` | Add `'groq-whisper'` to source union |
| `src/types/config.ts` | Add `groqApiKey?: string` to `AppConfig` |
| `src/server/utils/config.ts` | Add `groqApiKey` to schema and loader |
| `.env.example` | Add `GROQ_API_KEY` |
| `src/server/services/groq-whisper.service.ts` | **New file** — Groq Whisper transcription service |
| `src/server/services/youtube.service.ts` | Add audio download, wire Groq fallback into both `getTranscript()` and `getTranscriptWithTimestamps()` |
| `src/server/services/processing-log.service.ts` | Reclassify `TRANSCRIPT_UNAVAILABLE` as transient, add `AUDIO_UNAVAILABLE` as permanent |
| `src/data/processing-log.json` | Reset 25 skipped entries to `pending` |
| `scripts/reset-transcript-unavailable.ts` | **New file** (optional) — one-off reset script |
| `src/tests/services/groq-whisper.test.ts` | **New file** — unit tests |
| `src/tests/services/processing-log.test.ts` | Update/add tests for new classification |

---

## Implementation Order

1. **Task 1** — Type change (no runtime impact)
2. **Task 2** — Config change (no runtime impact)
3. **Task 3** — New service (isolated, testable)
4. **Task 4** — Audio download helper (isolated, testable)
5. **Task 5** — Wire fallback chain (depends on 1-4)
6. **Task 6** — Error reclassification (can be done in parallel with 3-5)
7. **Task 7** — Reset skipped entries (do after 6 is merged to avoid re-skipping)
8. **Task 8** — Startup validation
9. **Task 9** — Tests (write alongside each task)

---

## Open Questions — Resolved

> These were open during initial planning. Each is now resolved with a concrete decision based on codebase analysis.

### 1. Groq rate limits

**Decision: Add a dedicated rate limiter, reuse the existing `RateLimiter` class.**

The project already has a `RateLimiter` token-bucket class at `src/server/utils/rate-limiter.ts`. The existing instances are:
- `youtubeApiLimiter`: 100 max tokens, 10/sec
- `geminiFlashLimiter`: 2 max tokens, ~2/min
- `geminiProLimiter`: 1 max token, ~1/min

Groq's free tier allows **20 audio requests/min** and **7,200 audio-seconds/hour**. Given the sync loop already has a 30-second delay between videos (`VIDEO_PROCESSING_DELAY` in `sync.service.ts`, line 116), we will hit at most ~2 Whisper requests/min in practice. Still, add a limiter as a safety net:

```typescript
// Groq Whisper rate limiter: 10 RPM to stay well under 20 RPM free-tier limit
export const groqWhisperLimiter = new RateLimiter(2, 0.167); // 2 max tokens, ~10/min
```

Add this to `src/server/utils/rate-limiter.ts` and call `groqWhisperLimiter.acquire()` before each Groq API call in `GroqWhisperService.transcribe()`.

### 2. Audio file size guard (25 MB limit)

**Decision: Pre-check file size after download, before upload. Also add a duration-based early skip.**

Two-layer guard:
1. **Duration pre-check** (cheap, no download needed): The `getVideoMetadata()` call happens in `processVideo()` (sync.service.ts line 224) *before* the transcript fetch. We already have `parseIsoDuration()` in `src/server/utils/duration.ts`. Add a duration parameter to `downloadAudio()` and skip if > 2 hours (7,200s). At mp3 quality 5, a 2-hour video produces ~15-18 MB — well under 25 MB. Videos over 2 hours are rare in this dataset (all 25 backlog videos are under 1 hour).
2. **File size post-check** (after download, before upload): Use `fs.stat()` on the downloaded mp3. If > 25 MB, delete the file and throw `AUDIO_TOO_LARGE` instead of sending to Groq (avoids a wasted API round-trip and a confusing 413 error).

However, note that `downloadAudio` is called inside `youtube.service.ts` which does NOT have access to metadata. The duration guard should be in the calling code. The simplest approach: pass `videoDurationSeconds?: number` as an optional parameter to both `getTranscriptWithTimestamps` and `getTranscript`, then use it in the Whisper fallback block. The callers (`processVideo` in sync.service.ts) already have `metadata.duration` available.

**Refined approach:** Rather than threading duration through the public API, keep it simpler — just do the post-download file size check in `downloadAudio`. If the file exceeds 25 MB, clean up and throw `AUDIO_TOO_LARGE`. This is sufficient since the download itself is fast for most videos.

### 3. Transcript quality/confidence tracking

**Decision: No. Defer to a future issue.**

The `source` field on `TranscriptData` already distinguishes `'groq-whisper'` from other sources. Downstream AI processing (Gemini) handles raw text and is robust to missing punctuation. Adding a `quality` or `confidence` field would require changes to `TranscriptSegment`, `content-writer.service.ts`, and the AI prompts — scope creep for AIC-32. If whisper transcripts prove lower quality in practice, we can add `confidence?: number` to `TranscriptData` in a follow-up issue.

### 4. Cost tracking

**Decision: Log cost per video at info level. No persistent tracking.**

At ~$0.009/video (based on `whisper-large-v3-turbo` pricing of $0.011/min), the 25-video backlog costs ~$0.23 total. Not worth a database or file-based cost tracker. Instead, log the estimated cost in the success message:

```typescript
const estimatedCost = (audioDurationSeconds / 60) * 0.011;
logger.info(`Fetched transcript for ${videoId} via groq-whisper`, {
  segments: transcriptData.segments.length,
  length: transcriptData.fullText.length,
  audioDurationSec: audioDurationSeconds,
  estimatedCostUsd: estimatedCost.toFixed(4)
});
```

The `verbose_json` response includes a `duration` field at the top level which gives us the audio duration for free.

### 5. ffmpeg dependency handling

**Decision: Startup warning + graceful degradation.**

Add an ffmpeg check in the `createYouTubeService` factory (or at the point where `GroqWhisperService` is instantiated). The check pattern:

```typescript
try {
  await execAsync('which ffmpeg', { timeout: 5000 });
} catch {
  logger.warn('ffmpeg not found — Groq Whisper fallback will fail for audio extraction. Install ffmpeg: brew install ffmpeg');
}
```

If ffmpeg is missing at runtime, `yt-dlp -x` will fail naturally and the error will be caught by the existing try/catch in the fallback chain. The video will fall through to `TRANSCRIPT_UNAVAILABLE` — same behavior as without the feature. No hard failure.

---

## Deepened Implementation Details

### Task 3 — Detailed: GroqWhisperService

**Exact file:** `src/server/services/groq-whisper.service.ts`

```typescript
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
  duration: number; // total audio duration in seconds
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

    const segments: TranscriptSegment[] = result.segments
      .filter(seg => seg.text && seg.text.trim().length > 0)
      .map(seg => ({
        start: seg.start,
        duration: seg.end - seg.start,
        text: seg.text.trim()
      }));

    const fullText = segments.map(s => s.text).join(' ');

    if (!fullText) {
      throw new Error('Empty transcript from Groq Whisper');
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
```

**Key design decisions:**
- No `transcribe(buffer)` method — `transcribeFromFile` is the only entry point since we always have a temp file from yt-dlp. This avoids duplicating the file-size check logic.
- `Blob` constructor with buffer is supported in Node 18+ (the project targets Node 18+ per the existing use of native `fetch` patterns).
- The `language` field from Groq response is used (Whisper auto-detects), but we hint `'en'` in the request.

### Task 4 — Detailed: Audio download methods

**Exact additions to `src/server/services/youtube.service.ts`:**

```typescript
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
```

**Notes:**
- The `unlink` import already exists in `youtube.service.ts` (line 5: `import { readFile, unlink } from 'node:fs/promises'`).
- The `tmpdir` and `join` imports already exist (lines 6-7).
- The `execAsync` constant already exists (line 14).
- The `outputTemplate` uses `%(ext)s` because yt-dlp decides the intermediate extension before converting. The final file is always `.mp3` due to `--audio-format mp3`.
- Timeout is 120s (2x the subtitle timeout of 60s) because audio download is significantly larger than subtitle files.

### Task 5 — Detailed: Wiring changes

**5a: Constructor change in `YouTubeService`**

Current constructor (line 19):
```typescript
constructor(apiKey: string) {
```

New constructor:
```typescript
constructor(
  apiKey: string,
  private groqWhisper?: GroqWhisperService
) {
```

Add import at top of file:
```typescript
import { GroqWhisperService } from './groq-whisper.service';
```

**5a: Factory function change**

Current factory (line 380):
```typescript
export function createYouTubeService(apiKey: string): YouTubeService {
  return new YouTubeService(apiKey);
}
```

New factory:
```typescript
export function createYouTubeService(apiKey: string, groqWhisper?: GroqWhisperService): YouTubeService {
  return new YouTubeService(apiKey, groqWhisper);
}
```

**5a: Callers to update** (3 files):
1. `src/server/services/sync.service.ts` line 45:
   ```typescript
   import { createGroqWhisperService } from './groq-whisper.service';
   // ...
   const groqWhisper = config.groqApiKey ? createGroqWhisperService(config.groqApiKey) : undefined;
   const youtubeService = createYouTubeService(config.youtubeApiKey, groqWhisper);
   ```
2. `src/server/services/channel-monitor.service.ts` line 35:
   ```typescript
   import { createGroqWhisperService } from './groq-whisper.service';
   // ... in constructor:
   const groqWhisper = this.appConfig.groqApiKey ? createGroqWhisperService(this.appConfig.groqApiKey) : undefined;
   this.youtubeService = createYouTubeService(this.appConfig.youtubeApiKey, groqWhisper);
   ```
3. `src/server/services/playlist-sync.service.ts` line 64:
   ```typescript
   import { createGroqWhisperService } from './groq-whisper.service';
   // ...
   const groqWhisper = appConfig.groqApiKey ? createGroqWhisperService(appConfig.groqApiKey) : undefined;
   const youtubeService = createYouTubeService(appConfig.youtubeApiKey, groqWhisper);
   ```

**5b: Fallback chain in `getTranscriptWithTimestamps()`**

Replace lines 329-337 (the catch block for yt-dlp and the final throw):

```typescript
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
```

**5c: Same pattern in `getTranscript()`** — identical structure but returns `transcriptData.fullText` on success.

### Task 6 — Detailed: Error classification changes

**Exact changes to `src/server/services/processing-log.service.ts`:**

Replace `PERMANENT_ERROR_PATTERNS` array (lines 17-26):
```typescript
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
```

Note: `TRANSCRIPT_UNAVAILABLE` is **removed** — it is now transient because the Groq Whisper fallback makes it retryable. Videos that truly cannot be transcribed will throw `AUDIO_UNAVAILABLE` instead.

Update `classifyError()` code mapping (lines 37-40):
```typescript
      return {
        type: 'permanent',
        code: pattern.includes('AUDIO') ? 'AUDIO_UNAVAILABLE' :
              pattern.includes('NOT_FOUND') ? 'VIDEO_NOT_FOUND' :
              'VIDEO_UNAVAILABLE',
        isPermanent: true
      };
```

**Risk: TRANSCRIPT_UNAVAILABLE becoming transient means previously-skipped videos with genuine no-audio issues will be retried up to MAX_ATTEMPTS (3) times before being re-skipped.** This is acceptable — 3 extra attempts per truly-unrecoverable video is a small cost. After 3 failures, `shouldSkip()` kicks in via `attemptCount >= MAX_ATTEMPTS` (line 244 of processing-log.service.ts). In practice, these will fail with `AUDIO_UNAVAILABLE` on the first retry and get permanently skipped via the new pattern.

### Task 7 — Detailed: Reset script

Prefer the script approach using `ProcessingLogService.resetForRetry()` since it already handles all field resets correctly (lines 263-273 of processing-log.service.ts):

```typescript
// scripts/reset-transcript-unavailable.ts
import { createProcessingLogService } from '~/server/services/processing-log.service';
import { logger } from '~/server/utils/logger';

async function main() {
  const processingLog = createProcessingLogService();
  const log = await processingLog.read();

  const toReset = Object.values(log.entries).filter(
    entry => entry.errorCode === 'TRANSCRIPT_UNAVAILABLE' && entry.skipPermanently
  );

  logger.info(`Found ${toReset.length} TRANSCRIPT_UNAVAILABLE entries to reset`);

  for (const entry of toReset) {
    await processingLog.resetForRetry(entry.videoId);
    logger.info(`Reset ${entry.videoId}: ${entry.title}`);
  }

  logger.info(`Done. Reset ${toReset.length} entries.`);
}

main().catch(console.error);
```

Run with: `pnpm tsx scripts/reset-transcript-unavailable.ts`

### Task 8 — Detailed: Startup validation

The best place for startup logging is in the `createYouTubeService` factory, since that is where the `groqWhisper` presence is known. However, factories should be lightweight. Instead, add the logging in the callers (sync.service.ts, channel-monitor.service.ts, playlist-sync.service.ts) right after service creation:

```typescript
if (groqWhisper) {
  logger.info('Groq Whisper fallback enabled for transcript recovery');
  // Check ffmpeg availability
  try {
    await execAsync('which ffmpeg', { timeout: 5000 });
  } catch {
    logger.warn('ffmpeg not found — Groq Whisper audio extraction will fail. Install: brew install ffmpeg');
  }
} else {
  logger.debug('Groq Whisper fallback disabled (GROQ_API_KEY not set)');
}
```

To avoid duplicating this in 3 files, extract a helper:

```typescript
// In youtube.service.ts or a new utility:
export async function logGroqWhisperStatus(enabled: boolean): Promise<void> {
  if (enabled) {
    logger.info('Groq Whisper fallback enabled for transcript recovery');
    try {
      await execAsync('which ffmpeg', { timeout: 5000 });
    } catch {
      logger.warn('ffmpeg not found — Groq Whisper audio extraction will fail. Install: brew install ffmpeg');
    }
  } else {
    logger.debug('Groq Whisper fallback disabled (GROQ_API_KEY not set)');
  }
}
```

---

## Edge Cases and Risks

### Risk 1: yt-dlp audio download produces non-mp3 file
When `--audio-format mp3` is specified but ffmpeg is misconfigured, yt-dlp may silently produce a `.webm` or `.opus` file instead. The `downloadAudio` method expects `${videoId}.mp3`. **Mitigation:** After `execAsync`, verify the expected file exists with `fs.access()`. If not, glob the temp directory for `${videoId}.*` to find what was actually produced. Alternatively, use `yt-dlp`'s `--print filename` to discover the actual output path.

### Risk 2: Temp file accumulation on crash
If the process crashes between audio download and cleanup, temp files will accumulate in `os.tmpdir()`. **Mitigation:** Acceptable for now — OS temp directories are periodically cleaned. For production hardening, could add a startup sweep that deletes `*.mp3` files in tmpdir matching video ID patterns older than 1 hour.

### Risk 3: Race condition with concurrent syncs
If two sync processes run simultaneously (e.g., playlist sync + channel monitor), they could both attempt to process the same TRANSCRIPT_UNAVAILABLE video. **Mitigation:** The existing `processingLog.recordProcessingStart()` sets status to `'processing'`, but `shouldSkip()` doesn't check for `'processing'` status. This is a pre-existing issue, not introduced by this change.

### Risk 4: Groq API response format changes
The `verbose_json` format is not formally documented with a versioned schema. **Mitigation:** Type the response interface explicitly (`GroqWhisperResponse` above) and add defensive checks for missing `segments` array.

### Risk 5: sync.service.ts test mock needs updating
The existing test at `src/tests/services/sync.test.ts` mocks `createYouTubeService` (line 19). The mock only provides `getPlaylistItems`, `getVideoMetadata`, and `getTranscript`. The mock factory signature must be updated to accept the optional second parameter. Since the mock doesn't call the real constructor, this is a minor change — just ensure the factory mock accepts `(apiKey, groqWhisper?)`.

### Risk 6: `getTranscript()` (string return) is unused but must stay consistent
Grepping the codebase shows `processVideo` only calls `getTranscriptWithTimestamps()`. The plain `getTranscript()` method appears unused in production code. However, it should still get the Groq fallback for API symmetry and in case external scripts use it.

---

## Updated File Change Summary

| File | Action | Lines Changed (est.) |
|------|--------|---------------------|
| `src/types/transcript.ts` | Add `'groq-whisper'` to source union | 1 |
| `src/types/config.ts` | Add `groqApiKey?: string` to `AppConfig` | 1 |
| `src/server/utils/config.ts` | Add `groqApiKey` to schema and loader | 2 |
| `src/server/utils/rate-limiter.ts` | Add `groqWhisperLimiter` export | 3 |
| `.env.example` | Add `GROQ_API_KEY` section | 3 |
| `src/server/services/groq-whisper.service.ts` | **New file** — ~90 lines | 90 |
| `src/server/services/youtube.service.ts` | Add import, constructor param, `downloadAudio`, `cleanupAudioFile`, fallback in both methods | ~80 |
| `src/server/services/sync.service.ts` | Add groq import, create service, pass to factory, add startup log | ~10 |
| `src/server/services/channel-monitor.service.ts` | Same as sync.service.ts | ~10 |
| `src/server/services/playlist-sync.service.ts` | Same as sync.service.ts | ~10 |
| `src/server/services/processing-log.service.ts` | Update `PERMANENT_ERROR_PATTERNS` and `classifyError()` | ~10 |
| `src/data/processing-log.json` | Reset 25 skipped entries to `pending` | 25 entries |
| `scripts/reset-transcript-unavailable.ts` | **New file** — one-off reset script | ~25 |
| `src/tests/services/groq-whisper.test.ts` | **New file** — unit tests | ~120 |
| `src/tests/services/sync.test.ts` | Update mock signature | ~5 |
| `src/tests/services/processing-log.test.ts` | Update/add classification tests | ~40 |

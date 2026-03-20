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

## Open Questions

1. **Groq rate limits:** Groq's free tier has audio transcription limits (e.g., requests per minute). Should we add a rate limiter for Whisper calls, or is the existing processing pace slow enough that it won't matter?
2. **Audio file size guard:** Videos longer than ~2 hours at mp3 quality 5 could exceed Groq's 25 MB limit. Should we add a duration check (from video metadata) and skip Whisper for very long videos, or let it fail naturally?
3. **Transcript quality flag:** Whisper transcripts lack punctuation cues from the original speaker. Should we add a `quality` or `confidence` field to `TranscriptData` so downstream AI processing can adjust its behavior for whisper-sourced transcripts?
4. **Cost tracking:** At ~$0.009/video, the 25 backlog videos cost ~$0.23 total. Should we add any cost logging or tracking, or is this negligible enough to ignore?
5. **ffmpeg dependency:** The audio extraction requires `ffmpeg`. Should we document this as a system requirement, or add a graceful skip if ffmpeg is missing?

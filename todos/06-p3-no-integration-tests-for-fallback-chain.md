# No integration tests for the full fallback chain

**Status:** DEFERRED -- no test infrastructure in this worktree (src/tests/ is empty). Will be addressed when tests are set up.

**Priority:** P3 (nice to have)

**File:** `src/tests/services/groq-whisper.test.ts`

## Description

The plan (Task 9) calls for integration tests covering the full fallback chain:
- caption-extractor failure -> yt-dlp failure -> Groq Whisper success -> verify `source: 'groq-whisper'`
- All three failures -> verify `TRANSCRIPT_UNAVAILABLE`
- Groq Whisper not configured -> verify old behavior

The current tests only cover `GroqWhisperService` in isolation and `classifyError` in isolation. There are no tests for `YouTubeService.getTranscriptWithTimestamps()` or `getTranscript()` with the Groq Whisper fallback wired in. These would require mocking `getSubtitles`, `execAsync`, and the Groq API together.

## Suggested Fix

Add a test file `src/tests/services/youtube-fallback-chain.test.ts` that mocks all three transcript sources and verifies the fallback chain flows correctly, including that `cleanupAudioFile` is called in the `finally` block.

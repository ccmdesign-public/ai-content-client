# Missing ffmpeg availability check at startup

**Priority:** P2 (should fix)

**File:** `src/server/services/sync.service.ts`, lines 57-62
**Also affects:** `src/server/services/channel-monitor.service.ts`, `src/server/services/playlist-sync.service.ts`

## Description

The plan (Task 8) specifies that when `GROQ_API_KEY` is set, the startup code should check for `ffmpeg` availability using `which ffmpeg` and log a warning if missing. This check is not implemented.

Without it, users who set `GROQ_API_KEY` but forget to install ffmpeg will get opaque `yt-dlp` errors at runtime instead of a clear warning at startup.

While the fallback chain does degrade gracefully (yt-dlp will fail and the video falls through to `TRANSCRIPT_UNAVAILABLE`), a startup warning would save debugging time.

## Suggested Fix

Add an ffmpeg check after the Groq Whisper status logging block in `sync.service.ts`:

```typescript
if (groqWhisper) {
  logger.info('Groq Whisper fallback enabled for transcript recovery');
  try {
    await execAsync('which ffmpeg', { timeout: 5000 });
  } catch {
    logger.warn('ffmpeg not found -- Groq Whisper fallback will fail for audio extraction. Install ffmpeg: brew install ffmpeg');
  }
}
```

Apply the same pattern in `channel-monitor.service.ts` and `playlist-sync.service.ts`.

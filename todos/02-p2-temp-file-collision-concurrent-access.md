# Temp file collision risk with concurrent video processing

**Priority:** P2 (should fix)

**File:** `src/server/services/youtube.service.ts`, lines 311-335

## Description

The `downloadAudio` method constructs the temp file path as `join(tmpdir(), '${videoId}.mp3')`. If two processes (e.g., a cron-triggered sync and a manual sync) attempt to process the same video concurrently, they will write to the same temp file path. One process could delete the file (via `cleanupAudioFile`) while the other is still reading it.

The same pattern exists for the existing SRT downloads (`getTranscriptFromYtDlp` at line 125), so this is a pre-existing issue, but the new audio download makes it more likely because audio files are larger and take longer to download (120s timeout vs 60s).

## Suggested Fix

Add a random suffix to the temp file name to prevent collisions:

```typescript
const uniqueId = `${videoId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const outputTemplate = join(tempDir, `${uniqueId}.%(ext)s`);
const expectedPath = join(tempDir, `${uniqueId}.mp3`);
```

This ensures each invocation uses a unique file path. The cleanup logic already deletes the specific file by path, so this change is safe.

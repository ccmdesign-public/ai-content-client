# No timeout on Groq API fetch call

**Priority:** P2 (should fix)

**File:** `src/server/services/groq-whisper.service.ts`, lines 53-57

## Description

The `fetch` call to the Groq API has no timeout configured. If the Groq API hangs or is slow to respond, the request will block indefinitely, potentially stalling the entire sync loop.

The `downloadAudio` method has a 120s timeout, and the yt-dlp subtitle download has a 60s timeout, but the actual transcription API call has none.

## Suggested Fix

Add an `AbortSignal.timeout()` to the fetch call:

```typescript
const response = await fetch(GROQ_TRANSCRIPTION_URL, {
  method: 'POST',
  headers: { Authorization: `Bearer ${this.apiKey}` },
  body: formData,
  signal: AbortSignal.timeout(120_000) // 2 minute timeout
});
```

`AbortSignal.timeout()` is available in Node 18+.

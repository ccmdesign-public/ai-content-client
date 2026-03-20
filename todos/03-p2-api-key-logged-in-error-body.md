# API error body may contain sensitive information in logs

**Priority:** P2 (should fix)

**File:** `src/server/services/groq-whisper.service.ts`, line 67

## Description

On non-401/429 API errors, the full error body from Groq is included in the thrown error message:

```typescript
throw new Error(`GROQ_TRANSCRIPTION_FAILED: ${response.status} ${errorBody}`);
```

This `errorBody` could potentially contain request metadata, partial API key echoes, or other sensitive details depending on the Groq API's error response format. This error message is then logged by the caller in `youtube.service.ts` (lines 392, 459).

## Suggested Fix

Truncate the error body to a reasonable length and avoid logging raw API responses:

```typescript
const truncatedBody = errorBody.slice(0, 200);
throw new Error(`GROQ_TRANSCRIPTION_FAILED: ${response.status} ${truncatedBody}`);
```

Alternatively, parse the error body as JSON and extract only the `error.message` field if present.

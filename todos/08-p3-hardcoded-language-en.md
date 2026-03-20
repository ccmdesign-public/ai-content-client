# Hardcoded language 'en' in Groq Whisper request

**Status:** RESOLVED

**Priority:** P3 (nice to have)

**File:** `src/server/services/groq-whisper.service.ts`, line 51

## Description

The Groq Whisper request hardcodes `language: 'en'`. While this is fine for the current dataset (all 25 backlog videos are English), it means the service cannot be reused for non-English content without modification.

Whisper supports auto-detection when the `language` parameter is omitted, and the response includes a `language` field with the detected language.

## Suggested Fix

Accept an optional `language` parameter in `transcribeFromFile` and only include it in the FormData if specified:

```typescript
async transcribeFromFile(filePath: string, videoId: string, language?: string): Promise<TranscriptData> {
  // ...
  if (language) {
    formData.append('language', language);
  }
  // ...
}
```

Low priority since the current codebase only processes English content.

## Resolution

Made `language` an optional parameter in `transcribeFromFile()`. When omitted, Whisper auto-detects the language. Existing callers pass no language, enabling auto-detection.

# Reset script has no JSON validation or backup

**Status:** RESOLVED

**Priority:** P3 (nice to have)

**File:** `scripts/reset-transcript-unavailable.ts`

## Description

The reset script directly parses and rewrites `processing-log.json` without:
1. Validating the JSON structure before modifying it
2. Creating a backup before overwriting
3. Using atomic write (temp file + rename) like the `ProcessingLogService.write()` method does

Since this is a one-off script and the data is in git, the risk is low. But if run against a corrupted or unexpected file format, it could silently produce invalid output.

## Suggested Fix

Use the `ProcessingLogService.resetForRetry()` method in a loop instead of raw JSON manipulation. This ensures the same atomic write and validation that production code uses:

```typescript
const service = createProcessingLogService();
const log = await service.read();
for (const entry of Object.values(log.entries)) {
  if (entry.errorCode === 'TRANSCRIPT_UNAVAILABLE' && entry.skipPermanently) {
    await service.resetForRetry(entry.videoId);
  }
}
```

## Resolution

Rewrote the script to use `ProcessingLogService.resetForRetry()` instead of raw JSON manipulation. This ensures atomic writes, validation, and consistent behavior with production code.

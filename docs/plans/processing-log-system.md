# feat: Processing Log System for Video Status Tracking

## Overview

Implement a processing log system that tracks the status of all video processing attempts (success, failed, skipped) so the sync workflow can intelligently skip videos that have been permanently flagged - such as those without transcripts.

**Problem**: Currently, failed videos are retried on every sync run because the system only tracks success (via markdown file existence). Videos that will never succeed (e.g., no transcript available) waste API calls and processing time indefinitely.

**Solution**: A JSON-based processing log that persists across GitHub Action runs, tracks error types, and allows manual overrides for permanent skips.

## Problem Statement / Motivation

1. **Wasted resources**: Videos without transcripts are retried on every sync run
2. **No visibility**: No record of why videos failed or how many times they've been attempted
3. **No control**: Users cannot manually flag videos to skip without removing them from the YouTube playlist
4. **Silent failures**: CI runs complete "successfully" even when the same videos fail repeatedly

## Proposed Solution

### Processing Log File

**Location**: `src/data/processing-log.json` (git-tracked for CI persistence)

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-10T06:00:00Z",
  "entries": {
    "dQw4w9WgXcQ": {
      "videoId": "dQw4w9WgXcQ",
      "title": "Video Title",
      "status": "success",
      "createdAt": "2026-01-10T06:00:00Z",
      "updatedAt": "2026-01-10T06:05:00Z",
      "attemptCount": 1,
      "processedAt": "2026-01-10T06:05:00Z"
    },
    "abc123xyz": {
      "videoId": "abc123xyz",
      "title": "No Transcript Video",
      "status": "skipped",
      "createdAt": "2026-01-09T06:00:00Z",
      "updatedAt": "2026-01-10T06:00:00Z",
      "attemptCount": 1,
      "lastAttemptAt": "2026-01-09T06:00:00Z",
      "errorType": "permanent",
      "errorCode": "TRANSCRIPT_UNAVAILABLE",
      "errorMessage": "No captions available for this video",
      "skipPermanently": true,
      "skipReason": "No transcript available"
    }
  }
}
```

### Status State Machine

```
  discovered (not in log)
           │
           ▼
      ┌─────────┐
      │ pending │◄────────────────────────┐
      └────┬────┘                         │
           │                              │
           ▼                              │ (manual retry)
      ┌───────────┐                       │
      │processing │                       │
      └─────┬─────┘                       │
            │                             │
    ┌───────┼───────┐                     │
    │       │       │                     │
    ▼       ▼       ▼                     │
┌───────┐ ┌──────┐ ┌───────┐             │
│success│ │failed│ │skipped│─────────────┘
└───────┘ └──┬───┘ └───────┘
             │
             ▼ (retry if transient & under max attempts)
        ┌─────────┐
        │ pending │
        └─────────┘
```

### Error Classification

| Error Pattern | Type | Action |
|--------------|------|--------|
| `TRANSCRIPT_UNAVAILABLE` | permanent | Skip permanently |
| `VIDEO_NOT_FOUND` | permanent | Skip permanently |
| `Video unavailable` | permanent | Skip permanently |
| `Private video` | permanent | Skip permanently |
| `age-restricted` | permanent | Skip permanently |
| Rate limit (429) | transient | Retry next run |
| Network timeout | transient | Retry next run |
| API unavailable (503) | transient | Retry next run |
| Gemini quota exceeded | transient | Retry next run |
| Unknown errors | transient | Retry (max 3 attempts) |

### Retry Policy

- **Max attempts**: 3
- **Backoff**: Natural (only retries on next scheduled/manual run)
- **Escalation**: After 3 failed attempts, mark as `skipped` with `skipPermanently: true`

## Technical Approach

### New Files

| File | Purpose |
|------|---------|
| `src/types/processing-log.ts` | TypeScript interfaces |
| `src/server/services/processing-log.service.ts` | CRUD operations for log |
| `src/data/processing-log.json` | The log file itself |
| `scripts/video-skip.ts` | CLI to manually skip videos |
| `scripts/video-retry.ts` | CLI to retry skipped videos |
| `scripts/log-status.ts` | CLI to view log summary |

### Integration Points

| File | Change |
|------|--------|
| `src/server/services/sync.service.ts:67-78` | Check log before processing |
| `src/server/services/sync.service.ts:128-138` | Update log on success/failure |
| `.github/workflows/sync-playlist.yml:50-51` | Add log file to git commit |

### Processing Logic (sync.service.ts)

```typescript
// Before processing each video:
const logEntry = await processingLog.getEntry(videoId);

// Skip if already succeeded
if (logEntry?.status === 'success') {
  continue;
}

// Skip if permanently flagged
if (logEntry?.skipPermanently) {
  continue;
}

// Skip if max attempts reached
if (logEntry?.attemptCount >= 3 && logEntry?.errorType !== 'transient') {
  continue;
}

// Process video...
await processingLog.updateEntry(videoId, { status: 'processing' });

try {
  // ... existing processing logic ...
  await processingLog.updateEntry(videoId, {
    status: 'success',
    processedAt: new Date().toISOString()
  });
} catch (error) {
  const classification = classifyError(error);
  await processingLog.updateEntry(videoId, {
    status: classification.isPermanent ? 'skipped' : 'failed',
    errorType: classification.type,
    errorCode: classification.code,
    errorMessage: error.message,
    skipPermanently: classification.isPermanent
  });
}
```

## Acceptance Criteria

### Functional Requirements

- [ ] Processing log persists across GitHub Action runs (committed to git)
- [ ] Videos with `skipPermanently: true` are never retried
- [ ] Videos failing 3+ times with transient errors are marked for skip
- [ ] Permanent errors (no transcript) immediately set `skipPermanently: true`
- [ ] Log includes human-readable video title for debugging
- [ ] Existing markdown summaries work without log entries (backward compatible)

### CLI Tools

- [ ] `npm run video:skip -- <videoId> [--reason "..."]` - Manually skip a video
- [ ] `npm run video:retry -- <videoId>` - Reset a skipped video for retry
- [ ] `npm run video:status` - Show summary of log (counts by status)

### GitHub Action Integration

- [ ] Workflow commits `src/data/processing-log.json` alongside summaries
- [ ] Workflow output shows skip reasons in logs

## Success Metrics

- Videos without transcripts are attempted exactly once, then permanently skipped
- CI run time decreases as the backlog of known-failures accumulates
- Users can manually skip problematic videos without YouTube playlist changes

## Dependencies & Prerequisites

- No new npm packages required (uses Node.js fs/promises)
- No database required (JSON file committed to git)
- Requires workflow file update for git add path

## Edge Cases & Decisions

### State Consistency Strategy

**Decision**: Filesystem-primary with log enhancement

- If log says `success` but markdown file is missing → reprocess (user may have deleted intentionally)
- If markdown exists but not in log → skip (legacy video, backward compatible)
- If log says `processing` and stale (>1 hour) → treat as failed, retry

### First-Run Bootstrap

On first run with empty log:
1. Log file is created empty
2. Existing markdown files are checked via filesystem (current behavior)
3. New processing attempts populate the log
4. No migration script needed - organic population

### Channel Monitor Integration

- Same log file shared between playlist sync and channel monitor
- `source` field tracks origin: `'playlist'` or `'channel'`

## Implementation Phases

### Phase 1: Core Log Service
- Create TypeScript interfaces
- Implement ProcessingLogService (read/write/update)
- Add error classification utility

### Phase 2: Sync Integration
- Integrate log checks in sync.service.ts
- Update error handling to classify and log
- Ensure backward compatibility with existing markdown check

### Phase 3: GitHub Action Update
- Modify workflow to commit log file
- Add log status to workflow output

### Phase 4: CLI Tools
- Implement video:skip command
- Implement video:retry command
- Implement video:status command

## References & Research

### Internal References
- Current sync logic: [sync.service.ts:67-78](src/server/services/sync.service.ts#L67-L78)
- Error handling: [sync.service.ts:128-138](src/server/services/sync.service.ts#L128-L138)
- Transcript errors: [youtube.service.ts:193-196](src/server/services/youtube.service.ts#L193-L196)
- GitHub workflow: [sync-playlist.yml:50-51](.github/workflows/sync-playlist.yml#L50-L51)
- Service patterns: [content-writer.service.ts](src/server/services/content-writer.service.ts)

### Best Practices Applied
- JSON for git-diffable state (vs SQLite)
- Idempotent processing with O(1) lookups (object keys vs array)
- Atomic file writes (temp file + rename pattern)
- Transient vs permanent error classification

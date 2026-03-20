# Rate limiter acquired after file read but could be earlier

**Priority:** P3 (nice to have)

**File:** `src/server/services/groq-whisper.service.ts`, lines 43-45

## Description

The rate limiter token is acquired after reading the file into memory (line 45), but before the API call. This means the file contents sit in memory while waiting for the rate limiter. In the current setup (10 RPM limiter, 30s delay between videos), this wait is negligible. But if the rate limiter ever has contention, memory would be held unnecessarily.

## Suggested Fix

Move `groqWhisperLimiter.acquire()` to just before the `fetch` call (after FormData construction) so the file buffer can be GC'd sooner if the acquire blocks. Alternatively, acquire before reading the file so we don't even read from disk until we have a token. This is a micro-optimization with minimal practical impact.

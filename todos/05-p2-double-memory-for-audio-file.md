# Audio file loaded entirely into memory twice

**Priority:** P2 (should fix)

**File:** `src/server/services/groq-whisper.service.ts`, lines 43-48

## Description

The audio file is read into a `Buffer` via `readFile(filePath)`, then immediately wrapped in a `new Blob([audioBuffer])` and appended to `FormData`. For a file near the 25 MB limit, this temporarily holds ~50 MB in memory (Buffer + Blob copy).

While the 25 MB guard prevents truly enormous files, doubling memory usage for borderline files is wasteful, especially in a serverless environment with limited memory (Netlify functions).

## Suggested Fix

Use `fs.createReadStream` or `Blob` from a file handle to avoid the double copy. Alternatively, since the file is already on disk, use Node 20's `openAsBlob`:

```typescript
import { openAsBlob } from 'node:fs';
const blob = await openAsBlob(filePath, { type: 'audio/mpeg' });
formData.append('file', blob, `${videoId}.mp3`);
```

If targeting Node 18 only, the current approach is acceptable but consider using a stream-based fetch body if `ofetch` supports it.

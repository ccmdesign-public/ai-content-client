# Incomplete cleanup of yt-dlp partial files on audio download failure

**Priority:** P3 (nice to have)

**File:** `src/server/services/youtube.service.ts`, lines 324-327

## Description

The error handler in `downloadAudio` cleans up `.mp3`, `.webm`, and `.part` files. However, yt-dlp can produce intermediate files with other extensions depending on the source format (e.g., `.m4a`, `.opus`, `.webm.part`, `.mp3.part`). A glob-based cleanup would be more thorough.

This is low-risk because temp directories are cleaned up by the OS eventually, and the files are small.

## Suggested Fix

Use a glob pattern to clean up all files matching the videoId prefix:

```typescript
import { readdir } from 'node:fs/promises';

const files = await readdir(tempDir);
for (const file of files) {
  if (file.startsWith(videoId)) {
    await this.cleanupAudioFile(join(tempDir, file));
  }
}
```

Or simply add `.m4a` and `.opus` to the explicit cleanup list.

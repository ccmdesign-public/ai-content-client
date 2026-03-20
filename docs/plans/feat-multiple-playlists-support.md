# feat: Multiple YouTube Playlists Support

## Overview

Add support for syncing videos from multiple YouTube playlists instead of a single playlist. This follows the existing `channels.yaml` pattern already established in the codebase for channel monitoring.

**Current State:** Single playlist via `YOUTUBE_PLAYLIST_ID` environment variable
**Target State:** Multiple playlists configured via `playlists.yaml` with per-playlist metadata

---

## Problem Statement / Motivation

The current system only supports syncing from one YouTube playlist at a time. Users want to:
- Aggregate content from multiple curated playlists
- Organize summaries by source/category
- Have different processing rules per playlist
- Maintain a single source of truth for playlist configuration

---

## Proposed Solution

Mirror the existing `channels.yaml` pattern to create a `playlists.yaml` configuration system with:
1. Array of playlist definitions with metadata (id, name, category, enabled)
2. Global and per-playlist settings
3. Multi-playlist sync orchestration service
4. Updated frontmatter with playlist metadata
5. Backward compatibility with single `YOUTUBE_PLAYLIST_ID` env var

---

## Technical Approach

### Architecture

```
playlists.yaml
     │
     ▼
playlists-config.ts (loader + validation)
     │
     ▼
playlist-sync.service.ts (orchestration)
     │
     ├──▶ youtube.service.ts (per-playlist fetch)
     │
     ├──▶ Deduplication (skip if already processed)
     │
     ├──▶ sync.service.ts (video processing)
     │
     └──▶ content-writer.service.ts (write with playlist metadata)
```

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Video in multiple playlists | First-sync-wins | Simplest; avoid frontmatter complexity |
| Frontmatter playlistId | Single string | Maintain backward compatibility |
| Output directory | Flat structure | Keep existing queries working |
| Backward compatibility | Env var fallback | Don't break existing deployments |
| Category source | Playlist config | User-defined, not AI-derived |

---

## Implementation Phases

### Phase 1: Configuration System

**Files to create/modify:**

#### 1.1 Create `src/config/playlists.yaml`
```yaml
# YouTube Playlist Configuration
version: "1.0"

playlists:
  - id: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
    name: "AI Labs - Web Development"
    enabled: true
    category: "web-dev"

  # Add more playlists as needed

settings:
  maxVideosPerPlaylist: 10
  skipShortsUnderSeconds: 60
  playlistDelayMs: 2000
```

#### 1.2 Create `src/types/playlists.ts`
```typescript
import { z } from 'zod';

export const PlaylistConfigSchema = z.object({
  id: z.string().regex(
    /^(PL|UU|LL|RD|OL)[a-zA-Z0-9_-]{16,}$/,
    'Invalid YouTube playlist ID format'
  ),
  name: z.string().min(1),
  enabled: z.boolean().default(true),
  category: z.string().optional(),
  maxVideosPerRun: z.number().int().positive().optional()
});

export const PlaylistSettingsSchema = z.object({
  maxVideosPerPlaylist: z.number().int().positive().max(50).default(10),
  skipShortsUnderSeconds: z.number().int().positive().default(60),
  playlistDelayMs: z.number().int().positive().default(2000)
});

export const PlaylistsConfigSchema = z.object({
  version: z.string().default('1.0'),
  playlists: z.array(PlaylistConfigSchema).default([]),
  settings: PlaylistSettingsSchema.default({})
});

export type PlaylistConfig = z.infer<typeof PlaylistConfigSchema>;
export type PlaylistSettings = z.infer<typeof PlaylistSettingsSchema>;
export type PlaylistsConfig = z.infer<typeof PlaylistsConfigSchema>;
```

#### 1.3 Create `src/server/utils/playlists-config.ts`
```typescript
// Pattern: Mirror src/server/utils/channels-config.ts
import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { PlaylistsConfigSchema, type PlaylistsConfig } from '~/types/playlists';
import { logger } from './logger';

const CONFIG_FILE_PATH = 'src/config/playlists.yaml';

export function loadPlaylistsConfig(): PlaylistsConfig {
  const fullPath = path.join(process.cwd(), CONFIG_FILE_PATH);

  if (!fs.existsSync(fullPath)) {
    // Fallback: check for YOUTUBE_PLAYLIST_ID env var
    if (process.env.YOUTUBE_PLAYLIST_ID) {
      return PlaylistsConfigSchema.parse({
        playlists: [{
          id: process.env.YOUTUBE_PLAYLIST_ID,
          name: 'Default Playlist',
          enabled: true
        }]
      });
    }
    logger.warn('No playlists config found');
    return PlaylistsConfigSchema.parse({});
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const parsed = parseYaml(content);
  return PlaylistsConfigSchema.parse(parsed);
}

export function getEnabledPlaylists(): PlaylistsConfig['playlists'] {
  const config = loadPlaylistsConfig();
  return config.playlists.filter(p => p.enabled !== false);
}
```

**Success criteria:**
- [ ] `playlists.yaml` validates with Zod schema
- [ ] Loader returns typed config
- [ ] Fallback to env var works when no yaml exists

---

### Phase 2: Sync Service Update

**Files to modify:**

#### 2.1 Update `src/types/summary.ts`
Add playlist fields to frontmatter:
```typescript
// Add to MarkdownFrontmatter interface
playlistName?: string;
category?: string;
```

#### 2.2 Update `src/server/services/content-writer.service.ts`
Modify `writeMarkdown` to accept playlist metadata as parameter instead of reading from env:
```typescript
interface WriteMarkdownOptions {
  playlistId: string;
  playlistName?: string;
  category?: string;
}

// Update generateFrontmatter to include:
playlistId: "${options.playlistId}",
playlistName: "${options.playlistName || ''}",
category: "${options.category || ''}",
```

Reference: [content-writer.service.ts:93](src/server/services/content-writer.service.ts#L93)

#### 2.3 Create `src/server/services/playlist-sync.service.ts`
```typescript
// New service for multi-playlist orchestration
export interface MultiPlaylistSyncResult {
  success: boolean;
  playlists: Array<{
    playlistId: string;
    playlistName: string;
    result: SyncResult;
    error?: string;
  }>;
  totals: SyncResult;
}

export async function syncAllPlaylists(options?: {
  playlistIds?: string[];
  dryRun?: boolean;
}): Promise<MultiPlaylistSyncResult> {
  // 1. Load playlists config
  // 2. Filter to enabled (or specified) playlists
  // 3. For each playlist:
  //    a. Fetch playlist items
  //    b. Filter already-processed
  //    c. Process new videos (pass playlist metadata)
  //    d. Collect results
  // 4. Return aggregate results
}
```

#### 2.4 Update `src/server/services/sync.service.ts`
Modify `processVideo` to accept playlist metadata:
```typescript
interface ProcessVideoOptions {
  video: PlaylistItem;
  playlistId: string;
  playlistName?: string;
  category?: string;
  // ... existing options
}
```

Reference: [sync.service.ts:207-256](src/server/services/sync.service.ts#L207-L256)

**Success criteria:**
- [ ] Multi-playlist sync processes all enabled playlists
- [ ] Frontmatter includes playlistId, playlistName, category
- [ ] Rate limiting between playlists works
- [ ] Partial failure doesn't stop entire sync

---

### Phase 3: CLI and Scripts

**Files to create/modify:**

#### 3.1 Create `scripts/sync-playlists.ts`
```bash
# Usage examples:
npx tsx scripts/sync-playlists.ts                    # Sync all enabled
npx tsx scripts/sync-playlists.ts --playlist=PL...   # Sync specific
npx tsx scripts/sync-playlists.ts --dry-run          # Preview mode
```

#### 3.2 Update `scripts/sync-all.ts`
Replace single playlist sync with multi-playlist sync:
```typescript
// Before: syncPlaylist(config.youtubePlaylistId)
// After: syncAllPlaylists()
```

Reference: [scripts/sync-all.ts](scripts/sync-all.ts)

**Success criteria:**
- [ ] `sync-playlists.ts` works standalone
- [ ] `sync-all.ts` uses multi-playlist sync
- [ ] CLI shows per-playlist progress and totals
- [ ] Exit code reflects overall success/failure

---

### Phase 4: Content Schema Update

**Files to modify:**

#### 4.1 Update `content.config.ts`
Add playlistName and category to schema:
```typescript
schema: z.object({
  // ... existing fields
  playlistId: z.string(),
  playlistName: z.string().optional(),
  category: z.string().optional(),
})
```

Reference: [content.config.ts](content.config.ts)

**Success criteria:**
- [ ] New fields queryable via Nuxt Content
- [ ] Existing content still works (optional fields)

---

## Acceptance Criteria

### Functional Requirements
- [ ] Multiple playlists can be configured in `playlists.yaml`
- [ ] Each playlist can be enabled/disabled independently
- [ ] Videos are synced from all enabled playlists
- [ ] Frontmatter includes playlist metadata (id, name, category)
- [ ] Videos already processed are skipped regardless of source playlist
- [ ] Single playlist env var still works as fallback

### Non-Functional Requirements
- [ ] Rate limiting prevents API quota exhaustion
- [ ] Partial failures don't crash entire sync
- [ ] Clear logging shows per-playlist progress
- [ ] Backward compatible with existing deployments

### Quality Gates
- [ ] All existing tests pass
- [ ] New config loader has test coverage
- [ ] CLI works with 0, 1, and multiple playlists
- [ ] Documentation updated in CLAUDE.md

---

## Error Handling Strategy

| Error Type | Behavior |
|------------|----------|
| Invalid playlist ID in config | Fail at config validation (startup) |
| Playlist not found (404) | Log error, skip playlist, continue others |
| YouTube API quota exceeded | Stop sync, report partial results |
| Single video processing fails | Log error, continue with next video |
| AI API fails | Use fallback chain, then skip video |

---

## Migration Path

**No migration required.**

- Existing content keeps working (new fields are optional)
- `YOUTUBE_PLAYLIST_ID` env var continues to work as fallback
- Can gradually add playlists to `playlists.yaml`

---

## References

### Internal Files
- [src/config/channels.yaml](src/config/channels.yaml) - Pattern to follow
- [src/types/channels.ts](src/types/channels.ts) - Type pattern to follow
- [src/server/utils/channels-config.ts](src/server/utils/channels-config.ts) - Loader pattern
- [src/server/services/channel-monitor.service.ts](src/server/services/channel-monitor.service.ts) - Multi-source pattern
- [src/server/services/sync.service.ts](src/server/services/sync.service.ts) - Current sync logic
- [src/server/services/content-writer.service.ts](src/server/services/content-writer.service.ts) - Frontmatter generation

### External Documentation
- [YouTube PlaylistItems API](https://developers.google.com/youtube/v3/docs/playlistItems/list)
- [Zod Schema Validation](https://zod.dev/)
- [Nuxt Content Collections](https://content.nuxt.com/docs/collections/define)

---

## Out of Scope (Future Work)

- Frontend pages for browsing by playlist
- Playlist-specific RSS feeds
- Automatic playlist name fetching from YouTube API
- Video-level multi-playlist tracking (array of playlistIds)
- Priority-based playlist processing order

# feat: YouTube Channel Monitoring System

## Overview

Add an automated system to monitor YouTube channels for new video releases. Users configure a list of channels in a YAML file, and the system checks these channels daily (via GitHub Actions) for new videos, automatically processing them through the existing summarizer pipeline.

**Key Design Decisions:**
- Use YouTube RSS feeds (zero API quota) for detecting new videos
- Skip YouTube Shorts (only process regular videos)
- Skip failed channels and continue with others (resilient error handling)
- Keep summaries when a channel is removed from monitoring (historical record)

## Problem Statement / Motivation

Currently, videos can only be added to the summarizer via:
1. A single YouTube playlist (`YOUTUBE_PLAYLIST_ID` environment variable)
2. Manual CLI execution or API call

This creates friction for users who want to automatically summarize all videos from specific channels. The playlist approach requires:
- Manually adding each video to a playlist
- Or relying on YouTube's auto-add features which are limited

**User Pain Points:**
- Cannot "subscribe" to a channel for automatic summarization
- Miss new videos from favorite creators
- Manual process doesn't scale with multiple channels

## Proposed Solution

Introduce a **Channel Monitoring System** that:

1. Reads a YAML config file with channel IDs to monitor
2. Uses YouTube RSS feeds to detect new videos (no API quota consumed)
3. Filters out Shorts and already-processed videos
4. Processes new videos through the existing pipeline
5. Triggers daily via GitHub Actions cron job

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  GitHub Actions │────▶│  API Endpoint    │────▶│  Load YAML      │
│  (daily cron)   │     │  /api/channels/  │     │  config         │
└─────────────────┘     │  monitor.post.ts │     └────────┬────────┘
                        └──────────────────┘              │
                                                          ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Write Markdown │◀────│  Existing Sync   │◀────│  Fetch RSS per  │
│  (deduplication)│     │  Pipeline        │     │  channel        │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## Technical Considerations

### Architecture

**New Files:**
- `src/config/channels.yaml` - Channel subscription configuration
- `src/server/api/channels/monitor.post.ts` - API endpoint for triggering checks
- `src/server/services/rss.service.ts` - RSS feed fetching and parsing
- `src/server/services/channel-monitor.service.ts` - Orchestration service
- `src/types/channels.ts` - TypeScript types for channel config
- `.github/workflows/monitor-channels.yml` - Daily cron workflow

**Modified Files:**
- `src/server/utils/config.ts` - Add CRON_SECRET for endpoint auth
- `src/types/config.ts` - Add channel monitoring config types

### RSS Feed Approach (Zero Quota)

YouTube provides RSS feeds at no API cost:
```
https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
```

**Benefits:**
- No API quota consumed
- Returns 15 most recent videos per channel
- Includes video ID, title, publish date, thumbnail

**Limitations:**
- Maximum 15 videos per channel (sufficient for daily checks)
- No video duration (need API call for Shorts detection)
- No transcript availability indicator

### Shorts Detection Strategy

Since RSS doesn't include duration, we'll detect Shorts during processing:

```typescript
// Option 1: Check duration via YouTube API (costs 1 quota unit)
const metadata = await YouTubeService.getVideoMetadata(videoId)
if (metadata.duration < 60) {
  // Skip short-form content
  return { status: 'skipped', reason: 'short_video' }
}

// Option 2: Check if video is in #Shorts format (URL pattern)
// Less reliable but zero quota
```

**Recommendation:** Use API call to check duration - 1 quota unit per video is acceptable.

### Error Handling Strategy

Per user preference: **Skip failed channels, continue with others**

```typescript
interface ChannelCheckResult {
  channelId: string
  status: 'success' | 'failed' | 'skipped'
  videosFound: number
  videosProcessed: number
  error?: string
}

interface MonitorResult {
  totalChannels: number
  successfulChannels: number
  failedChannels: number
  totalVideosProcessed: number
  results: ChannelCheckResult[]
}
```

### Security

- API endpoint protected by `CRON_SECRET` environment variable
- GitHub Actions passes secret as `Authorization: Bearer ${{ secrets.CRON_SECRET }}`
- YAML config validated with Zod schema to prevent injection

### Performance

- Sequential RSS fetching with 1-second delay between channels (avoid rate limiting)
- Existing rate limiters apply to YouTube API and AI calls
- GitHub Actions timeout: 10 minutes (sufficient for ~50 channels)

## Acceptance Criteria

### Functional Requirements

- [ ] Create YAML config file structure at `src/config/channels.yaml`
- [ ] Implement RSS feed fetching service with error handling
- [ ] Create API endpoint `POST /api/channels/monitor` with auth
- [ ] Integrate with existing sync pipeline for video processing
- [ ] Skip YouTube Shorts (videos < 60 seconds)
- [ ] Skip already-processed videos (existing markdown files)
- [ ] Log detailed results including per-channel status
- [ ] Create GitHub Actions workflow for daily execution

### Configuration Schema

```yaml
# src/config/channels.yaml
version: "1.0"

channels:
  - id: "UCxxxxxxxxxxxxxxxxxxxxxx"  # Required: YouTube channel ID
    name: "Channel Name"             # Optional: Display name for logs
    enabled: true                    # Optional: Default true

  - id: "UCyyyyyyyyyyyyyyyyyyyy"
    name: "Another Channel"

settings:
  maxVideosPerChannel: 5            # Optional: Limit per channel per run
  skipShortsUnderSeconds: 60        # Optional: Duration threshold
```

### API Endpoint Contract

```typescript
// POST /api/channels/monitor
// Headers: Authorization: Bearer <CRON_SECRET>

// Request body (optional)
interface MonitorRequest {
  channelIds?: string[]  // Specific channels to check (default: all)
  dryRun?: boolean       // Check without processing (default: false)
}

// Response
interface MonitorResponse {
  success: boolean
  summary: {
    totalChannels: number
    successfulChannels: number
    failedChannels: number
    videosFound: number
    videosProcessed: number
    videosSkipped: number
  }
  results: ChannelCheckResult[]
  errors: string[]
}
```

### GitHub Actions Workflow

```yaml
# .github/workflows/monitor-channels.yml
name: Monitor YouTube Channels

on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM UTC
  workflow_dispatch:      # Manual trigger

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger channel monitoring
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json" \
            ${{ secrets.SITE_URL }}/api/channels/monitor
```

### Testing Requirements

- [ ] Unit tests for RSS parsing service
- [ ] Unit tests for channel config validation
- [ ] Integration test for monitor endpoint (mocked RSS)
- [ ] E2E test with sample channel (manual verification)

## Success Metrics

- **Reliability**: < 5% failure rate for healthy channels over 30 days
- **Performance**: Complete check for 10 channels in < 5 minutes
- **Coverage**: All new videos from monitored channels processed within 24 hours
- **Zero manual intervention** for daily operation

## Dependencies & Risks

### Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| YouTube RSS feeds | Stable | Google-maintained, unlikely to change |
| Existing sync pipeline | Ready | Already handles video processing |
| GitHub Actions | Ready | Free for public repos |
| Netlify deployment | Ready | Supports API endpoints |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| RSS feed rate limiting | Low | Medium | Add delays between fetches |
| Channel posts >15 videos/day | Low | Low | Accept limitation for MVP |
| YouTube API quota exhaustion | Medium | High | RSS is primary; API only for metadata |
| Deleted/private channel | Medium | Low | Skip and log error |

## Implementation MVP

### rss.service.ts

```typescript
// src/server/services/rss.service.ts
import { parseStringPromise } from 'xml2js'

export interface RssVideoEntry {
  videoId: string
  title: string
  channelId: string
  channelName: string
  publishedAt: Date
  thumbnailUrl: string
}

export class RssService {
  private readonly RSS_BASE_URL = 'https://www.youtube.com/feeds/videos.xml'

  async getChannelVideos(channelId: string): Promise<RssVideoEntry[]> {
    const url = `${this.RSS_BASE_URL}?channel_id=${channelId}`

    const response = await fetch(url, {
      headers: { 'User-Agent': 'YouTube-Summarizer/1.0' }
    })

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`)
    }

    const xml = await response.text()
    const parsed = await parseStringPromise(xml)

    return this.parseEntries(parsed.feed.entry || [])
  }

  private parseEntries(entries: any[]): RssVideoEntry[] {
    return entries.map(entry => ({
      videoId: entry['yt:videoId'][0],
      title: entry.title[0],
      channelId: entry['yt:channelId'][0],
      channelName: entry.author[0].name[0],
      publishedAt: new Date(entry.published[0]),
      thumbnailUrl: entry['media:group'][0]['media:thumbnail'][0].$.url
    }))
  }
}
```

### channel-monitor.service.ts

```typescript
// src/server/services/channel-monitor.service.ts
import { RssService } from './rss.service'
import { YouTubeService } from './youtube.service'
import { syncVideo } from './sync.service'
import { ContentWriterService } from './content-writer.service'
import { loadChannelsConfig } from '../utils/channels-config'
import { logger } from '../utils/logger'

export interface ChannelCheckResult {
  channelId: string
  channelName: string
  status: 'success' | 'failed' | 'skipped'
  videosFound: number
  videosProcessed: number
  videosSkipped: number
  error?: string
}

export class ChannelMonitorService {
  constructor(
    private rssService: RssService,
    private youtubeService: YouTubeService,
    private contentWriter: ContentWriterService
  ) {}

  async monitorAllChannels(): Promise<ChannelCheckResult[]> {
    const config = loadChannelsConfig()
    const results: ChannelCheckResult[] = []

    for (const channel of config.channels) {
      if (!channel.enabled) {
        results.push({
          channelId: channel.id,
          channelName: channel.name || 'Unknown',
          status: 'skipped',
          videosFound: 0,
          videosProcessed: 0,
          videosSkipped: 0
        })
        continue
      }

      // Add delay between channels to avoid rate limiting
      await this.delay(1000)

      const result = await this.checkChannel(channel)
      results.push(result)
    }

    return results
  }

  private async checkChannel(channel: ChannelConfig): Promise<ChannelCheckResult> {
    try {
      // Fetch RSS feed
      const videos = await this.rssService.getChannelVideos(channel.id)

      let processed = 0
      let skipped = 0

      for (const video of videos) {
        // Check if already processed
        if (await this.contentWriter.exists(video.videoId)) {
          skipped++
          continue
        }

        // Check if it's a Short (< 60 seconds)
        const metadata = await this.youtubeService.getVideoMetadata(video.videoId)
        if (metadata.durationSeconds < 60) {
          logger.info(`Skipping Short: ${video.title}`)
          skipped++
          continue
        }

        // Process through existing pipeline
        await syncVideo(video.videoId)
        processed++
      }

      return {
        channelId: channel.id,
        channelName: channel.name || videos[0]?.channelName || 'Unknown',
        status: 'success',
        videosFound: videos.length,
        videosProcessed: processed,
        videosSkipped: skipped
      }
    } catch (error) {
      logger.error(`Failed to check channel ${channel.id}:`, error)

      return {
        channelId: channel.id,
        channelName: channel.name || 'Unknown',
        status: 'failed',
        videosFound: 0,
        videosProcessed: 0,
        videosSkipped: 0,
        error: (error as Error).message
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
```

### monitor.post.ts

```typescript
// src/server/api/channels/monitor.post.ts
import { ChannelMonitorService } from '../../services/channel-monitor.service'
import { RssService } from '../../services/rss.service'
import { YouTubeService } from '../../services/youtube.service'
import { ContentWriterService } from '../../services/content-writer.service'

export default defineEventHandler(async (event) => {
  // Verify cron secret
  const authHeader = getHeader(event, 'authorization')
  const config = useRuntimeConfig(event)

  if (authHeader !== `Bearer ${config.cronSecret}`) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  // Initialize services
  const rssService = new RssService()
  const youtubeService = new YouTubeService(config.youtubeApiKey)
  const contentWriter = new ContentWriterService(config.outputDir)

  const monitorService = new ChannelMonitorService(
    rssService,
    youtubeService,
    contentWriter
  )

  // Run monitoring
  const results = await monitorService.monitorAllChannels()

  // Aggregate summary
  const summary = {
    totalChannels: results.length,
    successfulChannels: results.filter(r => r.status === 'success').length,
    failedChannels: results.filter(r => r.status === 'failed').length,
    videosProcessed: results.reduce((sum, r) => sum + r.videosProcessed, 0),
    videosSkipped: results.reduce((sum, r) => sum + r.videosSkipped, 0)
  }

  return {
    success: true,
    summary,
    results
  }
})
```

### channels.yaml

```yaml
# src/config/channels.yaml
version: "1.0"

# Add YouTube channel IDs to monitor for new videos
# Find channel ID: View page source on channel page, search for "channelId"
# Or use: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID

channels:
  # Example channels (replace with your own)
  # - id: "UCxxxxxxxxxxxxxxxxxxxxxx"
  #   name: "Channel Name"
  #   enabled: true

settings:
  # Maximum videos to process per channel per run
  maxVideosPerChannel: 5

  # Skip videos shorter than this (in seconds) - filters out Shorts
  skipShortsUnderSeconds: 60
```

### monitor-channels.yml

```yaml
# .github/workflows/monitor-channels.yml
name: Monitor YouTube Channels

on:
  schedule:
    # Daily at 6 AM UTC
    - cron: '0 6 * * *'
  workflow_dispatch:
    inputs:
      dry_run:
        description: 'Check channels without processing'
        required: false
        default: 'false'

jobs:
  monitor:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Trigger channel monitoring
        id: monitor
        run: |
          RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json" \
            -d '{"dryRun": ${{ github.event.inputs.dry_run || false }}}' \
            "${{ secrets.SITE_URL }}/api/channels/monitor")

          HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
          BODY=$(echo "$RESPONSE" | sed '$d')

          echo "response=$BODY" >> $GITHUB_OUTPUT

          if [ "$HTTP_CODE" != "200" ]; then
            echo "Request failed with status $HTTP_CODE"
            echo "$BODY"
            exit 1
          fi

      - name: Log results
        run: |
          echo '${{ steps.monitor.outputs.response }}' | jq .
```

## References & Research

### Internal References

- Existing sync service: [sync.service.ts](src/server/services/sync.service.ts)
- YouTube service: [youtube.service.ts](src/server/services/youtube.service.ts)
- Content writer: [content-writer.service.ts](src/server/services/content-writer.service.ts)
- Config loader: [config.ts](src/server/utils/config.ts)

### External References

- YouTube RSS Feed Format: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
- YouTube Data API Quota: https://developers.google.com/youtube/v3/determine_quota_cost
- Nitro Server Tasks: https://nitro.unjs.io/guide/tasks
- GitHub Actions Cron: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule

### Research Sources

- YouTube RSS feeds return max 15 videos per channel
- RSS is free (no API quota) but lacks duration info
- PubSubHubbub available for real-time but adds complexity (future enhancement)
- Netlify doesn't support Nitro scheduled tasks natively (use GitHub Actions)

---

*Generated with Claude Code on 2026-01-09*

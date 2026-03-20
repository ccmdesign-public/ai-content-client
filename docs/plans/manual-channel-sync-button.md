# feat: Manual Channel Sync Button

## Overview

Add a "Sync Channels" button to the main page that allows users to manually trigger the channel summaries synchronization. This mirrors the existing "Sync Playlist" button pattern, providing real-time progress on localhost and GitHub Actions workflow dispatch on production.

## Problem Statement / Motivation

1. **No manual trigger for channel sync**: Users must wait for the scheduled daily sync (6 AM UTC) or manually trigger via GitHub Actions UI
2. **Inconsistent UX**: Playlist sync has a convenient button, but channel sync requires technical knowledge
3. **Development friction**: Testing channel sync changes requires navigating to GitHub Actions

## Proposed Solution

Add a second button alongside "Sync Playlist" that triggers the channel monitor service, following the established patterns:

| Environment | Mechanism |
|-------------|-----------|
| **Localhost** | Direct API call to new `/api/channels/monitor-stream` with SSE progress |
| **Production** | Netlify function triggers `monitor-channels.yml` via GitHub API |

### UI Mockup

```
┌─────────────────────────────────────────────────────────────┐
│  [Sync Playlist]  [Sync Channels]                           │
│  Checking: 3Blue1Brown (2/5 channels)                       │
│  Processing: "Neural Networks" (1/3 videos)                 │
└─────────────────────────────────────────────────────────────┘
```

## Technical Considerations

### Authentication Strategy

**Decision**: Follow existing pattern - no browser-side auth required

| Environment | Auth Mechanism |
|-------------|----------------|
| Localhost | None (trusted local development) |
| Production | Netlify function uses `GITHUB_PAT` server-side |

The new streaming endpoint will **not** require `CRON_SECRET` since it's for browser-initiated manual syncs (same pattern as `sync-stream.post.ts`).

### Concurrent Sync Handling

**Decision**: Disable both sync buttons when either operation is in progress

- Prevents race conditions on AI API rate limits
- Prevents duplicate content writes
- Simple shared state: `isSyncing` covers both operations

### Progress Feedback

**Localhost (SSE stream)**:
- Channel-level: "Checking: ChannelName (2/5 channels)"
- Video-level: "Processing: VideoTitle (1/3 videos)"

**Production (fire-and-forget)**:
- Immediate: "Channel sync workflow triggered"
- Link to GitHub Actions for progress monitoring

## Acceptance Criteria

### Functional Requirements

- [ ] "Sync Channels" button appears next to "Sync Playlist" button
- [ ] Button disabled during any sync operation (playlist or channel)
- [ ] Localhost: Real-time progress via SSE (channel name, video progress)
- [ ] Production: Triggers `monitor-channels.yml` workflow via Netlify function
- [ ] Success message shows: channels checked, videos processed, videos skipped
- [ ] Error messages display clearly with retry option
- [ ] Content list refreshes after successful sync

### Technical Requirements

- [ ] New SSE endpoint: `src/server/api/channels/monitor-stream.post.ts`
- [ ] New Netlify function: `netlify/functions/trigger-channel-sync.ts`
- [ ] Shared sync state prevents concurrent operations
- [ ] Button follows `ccmButton` component patterns

### Quality Gates

- [ ] Works on localhost with dev server
- [ ] Works on production (Netlify deploy)
- [ ] No console errors during sync lifecycle
- [ ] Accessible: keyboard navigation, screen reader announcements

## Success Metrics

- Users can trigger channel sync without accessing GitHub UI
- Development iteration speed improved (immediate local testing)
- Consistent UX between playlist sync and channel sync

## Dependencies & Prerequisites

- Existing channel monitor service: [channel-monitor.service.ts](src/server/services/channel-monitor.service.ts)
- Existing workflow with `workflow_dispatch`: [monitor-channels.yml](.github/workflows/monitor-channels.yml)
- Netlify function pattern: [trigger-sync.ts](netlify/functions/trigger-sync.ts)
- Design system button: [ccmButton.vue](src/components/ds/molecules/ccmButton.vue)

## Files to Create

| File | Purpose |
|------|---------|
| `src/server/api/channels/monitor-stream.post.ts` | SSE streaming endpoint for localhost |
| `netlify/functions/trigger-channel-sync.ts` | GitHub Actions trigger for production |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/index.vue` | Add button, state management, handlers |
| `src/server/services/channel-monitor.service.ts` | Add progress callback support for SSE |

## Implementation

### Phase 1: Streaming Endpoint

Create `src/server/api/channels/monitor-stream.post.ts`:

```typescript
// SSE endpoint for real-time channel sync progress
// Mirrors sync-stream.post.ts pattern
export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')

  const channelMonitor = new ChannelMonitorService()

  // Progress callback for SSE events
  const onProgress = (data: ProgressEvent) => {
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  try {
    const result = await channelMonitor.monitorAllChannels({ onProgress })
    event.node.res.write(`data: ${JSON.stringify({ type: 'complete', result })}\n\n`)
  } catch (error) {
    event.node.res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`)
  }

  event.node.res.end()
})
```

### Phase 2: Netlify Function

Create `netlify/functions/trigger-channel-sync.ts`:

```typescript
// Trigger monitor-channels.yml workflow via GitHub API
// Mirrors trigger-sync.ts pattern
export const handler: Handler = async (event) => {
  const githubToken = process.env.GITHUB_PAT
  const githubRepo = process.env.GITHUB_REPO

  const response = await fetch(
    `https://api.github.com/repos/${githubRepo}/actions/workflows/monitor-channels.yml/dispatches`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref: 'main' })
    }
  )

  if (!response.ok) {
    return { statusCode: 500, body: 'Failed to trigger workflow' }
  }

  return { statusCode: 200, body: JSON.stringify({ triggered: true }) }
}
```

### Phase 3: UI Integration

Modify `src/pages/index.vue`:

```vue
<div class="sync-section">
  <ccm-button
    @click="handlePlaylistSync"
    :disabled="isSyncing"
    variant="primary"
  >
    {{ isSyncing && syncType === 'playlist' ? 'Syncing...' : 'Sync Playlist' }}
  </ccm-button>

  <ccm-button
    @click="handleChannelSync"
    :disabled="isSyncing"
    variant="primary"
    color="secondary"
  >
    {{ isSyncing && syncType === 'channels' ? 'Syncing...' : 'Sync Channels' }}
  </ccm-button>

  <span v-if="isSyncing" class="sync-loading">
    {{ currentStatus }}
    <template v-if="syncProgress.current && syncProgress.total">
      ({{ syncProgress.current }}/{{ syncProgress.total }})
    </template>
  </span>

  <p v-if="syncStatus" class="sync-status">{{ syncStatus }}</p>
</div>
```

### Phase 4: Channel Monitor Service Updates

Add progress callback support to `ChannelMonitorService.monitorAllChannels()`:

```typescript
interface MonitorOptions {
  channelIds?: string[]
  dryRun?: boolean
  onProgress?: (event: ProgressEvent) => void
}

interface ProgressEvent {
  type: 'channel' | 'video' | 'complete' | 'error'
  channelName?: string
  channelIndex?: number
  totalChannels?: number
  videoTitle?: string
  videoIndex?: number
  totalVideos?: number
}
```

## Edge Cases & Decisions

| Scenario | Decision |
|----------|----------|
| Both syncs triggered simultaneously | Disable both buttons when either is in progress |
| SSE connection drops mid-sync | Sync continues server-side; UI shows "Connection lost" |
| Workflow already running (production) | GitHub handles deduplication; show success message |
| No channels configured | Show "No channels configured" message |
| All videos already processed | Show "All channels up to date" |

## References & Research

### Internal References
- Existing sync button pattern: [index.vue:5-19](src/pages/index.vue#L5-L19)
- SSE streaming endpoint: [sync-stream.post.ts](src/server/api/sync-stream.post.ts)
- Channel monitor service: [channel-monitor.service.ts:46](src/server/services/channel-monitor.service.ts#L46)
- Channel monitor API: [monitor.post.ts](src/server/api/channels/monitor.post.ts)
- Netlify trigger pattern: [trigger-sync.ts](netlify/functions/trigger-sync.ts)
- GitHub workflow: [monitor-channels.yml](.github/workflows/monitor-channels.yml)
- Button component: [ccmButton.vue](src/components/ds/molecules/ccmButton.vue)

### External References
- Nuxt 3 SSE patterns: https://nuxt.com/docs/getting-started/data-fetching
- GitHub Actions workflow_dispatch: https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch
- Vue 3 loading states: https://vuejs.org/guide/essentials/template-syntax.html

### Best Practices Applied
- Button states: loading, disabled, success feedback
- SSE for real-time progress (same as existing playlist sync)
- Fire-and-forget for production with workflow link
- Debouncing via disabled state during operation
- ARIA live regions for screen reader announcements

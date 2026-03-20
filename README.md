# YouTube Summarizer MVP

AI-powered YouTube video summarization platform built with Nuxt 4, Google Gemini, and Nuxt Content.

## Features

- **AI-Powered Summaries** - Generates structured summaries with TLDR, Key Takeaways, Full Summary, and Context sections
- **Multi-Source Processing** - Sync from YouTube playlists or monitor specific channels
- **Intelligent Fallback** - Automatic model switching when quota is exhausted (Gemini -> OpenRouter)
- **Full Transcripts** - Stores timestamped transcripts alongside summaries
- **RSS Feed** - Subscribe to summaries in podcast apps or RSS readers
- **Static Generation** - Pre-rendered pages for fast loading and easy hosting

## Quick Start

### Prerequisites

- Node.js 18+
- YouTube Data API key
- Google AI Studio (Gemini) API key
- Optional: OpenRouter API key (for fallback models)

### Installation

```bash
# Clone and install
git clone <repo-url>
cd youtube-summarizer-mvp
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys
```

### Environment Variables

```bash
# Required
YOUTUBE_API_KEY=<your-youtube-api-key>
YOUTUBE_PLAYLIST_ID=<playlist-id-to-sync>
GEMINI_API_KEY=<your-gemini-api-key>

# Optional - AI Configuration
GEMINI_MODEL=gemini-2.5-flash           # Primary model
OPEN_ROUTER_API_KEY=<your-key>          # Fallback provider
ENABLE_MODEL_FALLBACK=true              # Enable fallback chain

# Optional - Processing
MAX_VIDEOS_PER_RUN=10                   # Max videos per sync (1-50)
PROCESSING_MODE=transcript              # transcript or native-video

# Optional - Deployment
SITE_URL=https://your-site.com
CRON_SECRET=<secret-for-channel-monitor>
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## CLI Commands

### Syncing Videos

```bash
# Sync videos from configured playlist
npm run sync-playlist

# Sync all playlists and channels
npm run sync-all

# Sync with auto-commit and push
npm run sync-deploy

# Sync only channels (no playlists)
npm run sync-channels

# Dry run - process last video without saving
npm run dryrun
```

#### Sync Options

```bash
# Skip git commit
npm run sync-all -- --no-commit

# Skip git push
npm run sync-all -- --no-push

# Process only playlists
npm run sync-all -- --playlist-only

# Process only channels
npm run sync-all -- --channels-only
```

### Video Management

```bash
# View processing status and statistics
npm run video:status
npm run video:status -- --verbose
npm run video:status -- --filter failed
npm run video:status -- --filter skipped

# Skip a video permanently
npm run video:skip <videoId> "reason for skipping"

# Reset a video for retry
npm run video:retry <videoId>
```

### AI Configuration

```bash
# Validate AI configuration
npm run ai:validate

# Setup AI environment
npm run ai:setup
```

### Development Tools

```bash
# Type checking
npm run typecheck

# Lint CSS
npm run lint:css
npm run lint:css:fix

```

## Architecture

### Data Flow

```
YouTube API -> Fetch Metadata -> Get Transcript -> AI Summarization ->
Write Files (summary.md, transcript.json, metadata.yml) -> Update Processing Log
```

### Directory Structure

```
src/
├── content/summaries/          # Generated content
│   └── {videoId}/
│       ├── summary.md          # Main content with YAML frontmatter
│       ├── transcript.json     # Timestamped transcript segments
│       └── metadata.yml        # Video metadata + processing metrics
├── server/
│   ├── routes/                 # API endpoints
│   │   ├── api/sync.ts         # Playlist sync
│   │   ├── api/channels/       # Channel monitoring
│   │   └── feed.xml.ts         # RSS feed
│   ├── services/               # Business logic
│   │   ├── sync.service.ts     # Main orchestration
│   │   ├── youtube.service.ts  # YouTube API + transcripts
│   │   ├── ai.service.ts       # Model fallback handling
│   │   ├── gemini.service.ts   # Google Gemini API
│   │   ├── openrouter.service.ts  # Fallback provider
│   │   ├── content-writer.service.ts  # File output
│   │   └── processing-log.service.ts  # Status tracking
│   └── utils/                  # Helpers
├── pages/                      # Nuxt pages
│   ├── index.vue               # Home - summary list
│   ├── summaries/[slug].vue    # Individual summary
│   └── channels/[slug].vue     # Channel view
├── components/                 # Vue components
│   └── content/
│       ├── SummaryCard.vue     # Summary card display
│       └── DateGroupedFeed.vue # Grouped summary list
├── composables/                # Vue composables
│   ├── useContentStream.ts     # Content fetching
│   └── useDateGroups.ts        # Date grouping
└── types/                      # TypeScript definitions
```

### Content Schema

Summary files use a nested frontmatter structure:

```yaml
metadata:                           # Video metadata from YouTube
  videoId: "abc123"
  title: "Video Title"
  description: "Video description from YouTube"
  channel: "Channel Name"
  channelId: "UC..."
  duration: "PT35M10S"              # ISO 8601 duration
  publishedAt: "2025-01-18T..."
  thumbnailUrl: "https://i.ytimg.com/..."
  youtubeUrl: "https://www.youtube.com/watch?v=..."

processedAt: "2025-01-18T..."       # When summary was generated
source: "youtube"
playlistId: "PL..."                 # Optional
playlistName: "Playlist Name"       # Optional
category: "Category"                # Optional

tldr: "One-line summary..."         # AI-generated TLDR

ai:                                 # AI processing metrics
  provider: "gemini"
  model: "gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2500
  outputTokens: 850
  totalTokens: 3350
  processingTimeMs: 4200
```

## API Routes

### Sync Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/sync` | Trigger playlist sync (blocking) |
| POST | `/api/sync-stream` | Stream sync progress via SSE |

### Channel Monitoring

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/channels` | List enabled channels |
| POST | `/api/channels/monitor` | Monitor channels for new videos* |

*Requires `Authorization: Bearer <CRON_SECRET>` header

### Feeds

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/feed.xml` | RSS feed of all summaries |
| GET | `/digest.xml` | Periodic digest feed |

## Services

| Service | Responsibility |
|---------|---------------|
| `sync.service` | Main orchestration, video processing |
| `youtube.service` | YouTube API, transcript extraction |
| `ai.service` | Model orchestration, fallback handling |
| `gemini.service` | Google Gemini API calls |
| `openrouter.service` | OpenRouter fallback models |
| `content-writer.service` | File system output |
| `processing-log.service` | Status tracking, retry logic |
| `channel-monitor.service` | Channel RSS monitoring |
| `playlist-sync.service` | Multi-playlist support |

## Processing Modes

### Transcript Mode (Default)

- Extracts captions using `youtube-caption-extractor`
- Falls back to `yt-dlp` if library fails
- Lower cost, faster processing
- Works with most videos that have captions

### Native Video Mode

- Sends video directly to Gemini for analysis
- Higher quality summaries
- Higher API costs
- Requires Gemini 2.0+ models with video support

## AI Model Fallback Chain

When the primary model's quota is exhausted:

1. **Primary**: Configured Gemini model (e.g., `gemini-2.5-flash`)
2. **Gemini Fallbacks**: `gemini-2.5-flash` -> `gemini-2.5-pro`
3. **OpenRouter** (if API key configured):
   - Gemini 2.0 Flash (free)
   - DeepSeek R1 (free)
   - Llama 3.3 70B (free)
   - Gemma 3 27B (free)

## Error Handling

### Permanent Errors (No Retry)

- `TRANSCRIPT_UNAVAILABLE` - No captions available
- `VIDEO_NOT_FOUND` - Video deleted or private
- Age-restricted content
- Region-locked videos

### Transient Errors (Retry Up to 3x)

- Rate limit exceeded
- API quota exhaustion
- Network timeouts
- Model overload

## Processing Log

Status is tracked in `.data/processing-log.json`:

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-01-18T...",
  "entries": {
    "videoId": {
      "videoId": "...",
      "title": "...",
      "status": "success",
      "source": "playlist",
      "processedAt": "...",
      "attemptCount": 1,
      "skipPermanently": false,
      "errors": []
    }
  }
}
```

## Deployment

### Static Hosting (Netlify, Vercel, etc.)

```bash
# Build static site
npm run build

# Output in .output/public/
```

### Automated Sync with CI/CD

Use `npm run sync-deploy` in GitHub Actions or similar:

```yaml
- name: Sync videos
  run: npm run sync-deploy
  env:
    YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
    GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

This will:
1. Sync new videos from playlists/channels
2. Generate AI summaries
3. Commit new summaries to git
4. Push changes to trigger site rebuild

## Rate Limiting

- **YouTube API**: ~2 videos/minute (30s delay between videos)
- **Gemini**: Model-specific quotas (flash vs pro tiers)
- **OpenRouter**: Free tier limits on fallback models

## Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (API keys) |
| `content.config.ts` | Nuxt Content collection schemas |
| `nuxt.config.ts` | Nuxt/Nitro configuration |
| `tsconfig.json` | TypeScript settings |

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3.5)
- **Content**: @nuxt/content
- **AI**: Google Gemini, OpenRouter
- **Transcripts**: youtube-caption-extractor, yt-dlp
- **Styling**: Tailwind CSS
- **Build**: Nitro (static preset)

## AI Assistant Support

This project includes instructions for AI coding assistants:

- **Claude Code**: See `CLAUDE.md` and `.claude/` directory
- **Gemini**: See `GEMINI.md` and `.gemini/` directory
- **Cursor**: See `.cursorrules` and `.cursor/` directory

## License

MIT

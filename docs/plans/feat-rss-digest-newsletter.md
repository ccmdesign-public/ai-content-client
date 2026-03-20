# feat: RSS Digest Feed for Newsletter Distribution

## Overview

Add an RSS digest feed endpoint (`/digest.xml`) that aggregates YouTube video summaries into 3-day period items for Mailchimp newsletter distribution. Each digest item contains a fixed intro, a list of videos with key takeaways and links, and a fixed footer.

## Problem Statement / Motivation

**Current State:**
- Existing `/feed.xml` generates one RSS item per video ([src/server/routes/feed.xml.ts](src/server/routes/feed.xml.ts))
- No automated newsletter distribution mechanism exists
- Subscribers must manually check for new content

**Desired State:**
- Periodic digest summarizing all videos from a 3-day window
- Mailchimp automatically picks up new digest items and sends newsletters
- Consistent newsletter format with intro/body/footer structure

**Why This Matters:**
- Reduces subscriber friction (content comes to them)
- Creates predictable communication cadence
- Allows curated presentation of multiple videos in context

## Proposed Solution

### High-Level Approach

Create a new server route `/digest.xml` that:
1. Groups videos by 3-day periods (using `processedAt` date)
2. Generates one RSS `<item>` per complete period
3. Includes fixed intro/footer text from runtime config
4. Uses stable GUIDs to prevent Mailchimp duplicate sends

### Digest Item Structure

```xml
<item>
  <title>YouTube Digest: Jan 1-3, 2026</title>
  <link>https://site.com/digest/2026-01-01</link>
  <guid isPermaLink="true">https://site.com/digest/2026-01-01</guid>
  <pubDate>Sat, 04 Jan 2026 00:00:00 GMT</pubDate>
  <description><![CDATA[
    <p>[Intro text from config]</p>

    <h2>This Period's Videos</h2>
    <ol>
      <li>
        <strong>Video Title</strong><br/>
        Modern web design leverages generative AI...<br/>
        Channel: AI LABS |
        <a href="https://site.com/summaries/abc123">Read Summary</a> |
        <a href="https://youtube.com/watch?v=abc123">Watch on YouTube</a>
      </li>
      <!-- More videos... -->
    </ol>

    <p>[Footer text from config]</p>
  ]]></description>
</item>
```

## Technical Considerations

### Period Calculation Strategy

**Decision: Fixed anchor periods using UTC timezone**

- Periods calculated from a configurable epoch date (default: site launch date)
- Example: If epoch is Jan 1, periods are Jan 1-3, Jan 4-6, Jan 7-9, etc.
- Videos assigned to periods based on `processedAt` (UTC) falling within `[start, end)` range
- **Only complete periods included** - current/ongoing period excluded to prevent partial content in emails

### Mailchimp Integration

**Challenge:** Mailchimp only supports Daily/Weekly/Monthly polling, not 3-day intervals

**Solution:** Configure Mailchimp for Daily polling
- Mailchimp checks `/digest.xml` daily
- On days 1-2 of a period: no new items, no email sent
- On day 4 (period complete): new item appears, email sent
- Stable GUIDs prevent duplicate sends for same period

### Configuration Schema

```typescript
// nuxt.config.ts additions
runtimeConfig: {
  public: {
    // Existing
    siteUrl: process.env.SITE_URL,
    feedTitle: 'YouTube Summaries',

    // New for digest
    digestTitle: process.env.DIGEST_TITLE || 'YouTube Digest',
    digestDescription: process.env.DIGEST_DESCRIPTION || 'Periodic roundup of AI-generated video summaries',
    digestIntroText: process.env.DIGEST_INTRO_TEXT || 'Welcome to this period\'s video digest!',
    digestFooterText: process.env.DIGEST_FOOTER_TEXT || 'Thanks for reading! Visit our site for more.',
    digestPeriodDays: 3,
    digestEpochDate: process.env.DIGEST_EPOCH_DATE || '2026-01-01',
    digestMaxPeriods: 10  // Limit feed size
  }
}
```

### Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| [src/server/routes/digest.xml.ts](src/server/routes/digest.xml.ts) | Create | Main digest feed endpoint |
| [src/server/utils/digest.ts](src/server/utils/digest.ts) | Create | Period grouping logic and digest generation |
| [src/nuxt.config.ts](src/nuxt.config.ts) | Modify | Add digest runtime config |
| [src/types/digest.ts](src/types/digest.ts) | Create | TypeScript interfaces for digest |

### Edge Cases Handled

| Scenario | Handling |
|----------|----------|
| Zero videos in period | Skip period entirely (no item generated) |
| Single video in period | Normal item with singular grammar |
| Video missing `tldr` | Use placeholder: "Summary available on site" |
| First request with 30 videos | Group into historical periods, include last 10 |
| Video at exact boundary (midnight UTC) | Belongs to new period (exclusive end boundary) |

## Acceptance Criteria

### Functional Requirements

- [ ] New endpoint `/digest.xml` returns valid RSS 2.0 XML
- [ ] Each digest item represents exactly one 3-day period
- [ ] Videos grouped correctly by `processedAt` date
- [ ] Intro text appears at beginning of each item description
- [ ] Footer text appears at end of each item description
- [ ] Video list includes: title, TLDR (or placeholder), channel, summary link, YouTube link
- [ ] Only complete periods included (current period excluded)
- [ ] Same period always generates identical GUID (idempotent)
- [ ] Feed limited to last 10 complete periods

### Non-Functional Requirements

- [ ] Response time < 500ms for digest generation
- [ ] Valid XML passes [W3C Feed Validator](https://validator.w3.org/feed/)
- [ ] Works with Mailchimp RSS-to-Email campaigns
- [ ] Proper `Cache-Control` headers (1 hour)

### Quality Gates

- [ ] Unit tests for period calculation logic
- [ ] Unit tests for edge cases (empty periods, boundary dates)
- [ ] Integration test hitting `/digest.xml` endpoint
- [ ] Manual verification with Mailchimp sandbox

## Success Metrics

- Digest feed successfully generates without errors
- Mailchimp campaign correctly detects new digest items
- No duplicate emails sent for same period
- Newsletter renders correctly in major email clients (Gmail, Outlook, Apple Mail)

## Dependencies & Prerequisites

### Required Before Implementation

1. **Runtime config structure decided** - Which config keys to use
2. **Intro/footer text drafted** - Even placeholder text needed for testing
3. **Epoch date chosen** - When did content collection begin?

### External Dependencies

- Mailchimp account with RSS-to-Email capability
- Netlify deployment for public URL access

## Risk Analysis & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Mailchimp GUID detection fails | Duplicate emails | Low | Test extensively in sandbox; use permanent, deterministic GUIDs |
| Period calculation bugs | Wrong videos in digest | Medium | Comprehensive unit tests with boundary cases |
| Large digest items | Email truncation | Low | Monitor item size; add max videos per period if needed |
| Config not deployed | Feed errors on production | Low | Add fallback defaults for all config values |

## Implementation Phases

### Phase 1: Core Infrastructure

**Files to create:**

```
src/server/utils/digest.ts          # Period calculation and grouping
src/types/digest.ts                 # TypeScript interfaces
```

**Tasks:**
- [ ] Create `DigestPeriod` and `DigestItem` interfaces
- [ ] Implement `calculatePeriods(epochDate, periodDays)` function
- [ ] Implement `groupVideosByPeriod(videos, periods)` function
- [ ] Implement `generateDigestXml(periods, config)` function
- [ ] Add unit tests for period calculation

### Phase 2: Server Route

**Files to create/modify:**

```
src/server/routes/digest.xml.ts     # New endpoint
src/nuxt.config.ts                  # Runtime config additions
```

**Tasks:**
- [ ] Add digest config to `nuxt.config.ts`
- [ ] Create `/digest.xml` server route
- [ ] Query summaries collection
- [ ] Apply period grouping
- [ ] Generate RSS XML with intro/footer
- [ ] Set appropriate headers
- [ ] Add integration test

### Phase 3: Testing & Validation

**Tasks:**
- [ ] Run local tests: `npx vitest run`
- [ ] Validate XML with W3C validator
- [ ] Test with RSS reader (e.g., Feedly)
- [ ] Deploy to Netlify preview
- [ ] Configure Mailchimp test campaign
- [ ] Send test newsletter
- [ ] Verify email rendering

## MVP Code Outline

### src/types/digest.ts

```typescript
export interface DigestPeriod {
  startDate: Date
  endDate: Date
  periodId: string  // e.g., "2026-01-01"
}

export interface DigestItem {
  period: DigestPeriod
  videos: DigestVideo[]
}

export interface DigestVideo {
  title: string
  videoId: string
  channel: string
  tldr: string | null
  summaryUrl: string
  youtubeUrl: string
  processedAt: string
}

export interface DigestFeedConfig {
  siteUrl: string
  title: string
  description: string
  introText: string
  footerText: string
  periodDays: number
  epochDate: string
  maxPeriods: number
}
```

### src/server/utils/digest.ts

```typescript
import { startOfDay, addDays, isBefore, format } from 'date-fns'
import type { DigestPeriod, DigestItem, DigestVideo, DigestFeedConfig } from '~/types/digest'

export function calculatePeriods(
  epochDate: string,
  periodDays: number,
  maxPeriods: number
): DigestPeriod[] {
  // Calculate all complete periods from epoch to now
  // Return last maxPeriods periods
}

export function groupVideosByPeriod(
  videos: any[],  // From queryCollection
  periods: DigestPeriod[],
  siteUrl: string
): DigestItem[] {
  // Assign each video to its period based on processedAt
  // Filter out empty periods
}

export function generateDigestXml(
  items: DigestItem[],
  config: DigestFeedConfig
): string {
  // Generate RSS 2.0 XML with digest items
  // Include intro/footer in each item's description
}
```

### src/server/routes/digest.xml.ts

```typescript
import { queryCollection } from '#imports'
import { calculatePeriods, groupVideosByPeriod, generateDigestXml } from '../utils/digest'
import type { DigestFeedConfig } from '~/types/digest'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const feedConfig: DigestFeedConfig = {
    siteUrl: config.public.siteUrl || 'http://localhost:3000',
    title: config.public.digestTitle || 'YouTube Digest',
    description: config.public.digestDescription || 'Periodic video roundup',
    introText: config.public.digestIntroText || 'Welcome to this period\'s digest!',
    footerText: config.public.digestFooterText || 'Thanks for reading!',
    periodDays: config.public.digestPeriodDays || 3,
    epochDate: config.public.digestEpochDate || '2026-01-01',
    maxPeriods: config.public.digestMaxPeriods || 10
  }

  // Query all summaries
  const summaries = await queryCollection(event, 'summaries').all()

  // Calculate periods and group videos
  const periods = calculatePeriods(feedConfig.epochDate, feedConfig.periodDays, feedConfig.maxPeriods)
  const digestItems = groupVideosByPeriod(summaries, periods, feedConfig.siteUrl)

  // Generate XML
  const xml = generateDigestXml(digestItems, feedConfig)

  // Set headers
  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return xml
})
```

## References & Research

### Internal References

- Existing RSS route: [src/server/routes/feed.xml.ts](src/server/routes/feed.xml.ts)
- RSS utilities: [src/server/utils/rss.ts](src/server/utils/rss.ts)
- Content schema: [content.config.ts](content.config.ts)
- Runtime config: [src/nuxt.config.ts](src/nuxt.config.ts)
- Summary type definitions: [src/types/summary.ts](src/types/summary.ts)

### External References

- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)
- [RSS Best Practices Profile](https://www.rssboard.org/rss-profile)
- [Mailchimp RSS-to-Email Guide](https://mailchimp.com/help/share-your-blog-posts-with-mailchimp/)
- [Mailchimp RSS Merge Tags](https://templates.mailchimp.com/getting-started/merge-tags/rss-merge-tags/)
- [W3C Feed Validator](https://validator.w3.org/feed/)
- [date-fns Documentation](https://date-fns.org/)

### Related Work

- Existing per-video RSS implementation provides patterns to follow
- Current content collection structure provides all required video metadata

---

*Plan generated: 2026-01-09*

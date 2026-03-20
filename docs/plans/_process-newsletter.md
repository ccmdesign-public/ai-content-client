# Process: AI-Curated Newsletter via Resend

> Supersedes: `feat-rss-digest-newsletter.md` (Mailchimp RSS approach — archived)

## Overview

A daily (or configurable cadence) newsletter powered by an LLM agent that gathers the day's processed video summaries, triages them by relevance/theme, writes editorial commentary, and sends a polished newsletter via **Resend**.

## Why This Changed

The original plan used a static RSS digest feed (`/digest.xml`) consumed by Mailchimp. Two problems:

1. **No editorial voice** — the RSS approach was a mechanical list of videos with TLDRs. No curation, no commentary, no personality.
2. **Mailchimp limitations** — RSS-to-Email only supports daily/weekly/monthly polling, no custom cadences, and the formatting control is limited.

The new approach uses an **LLM agent** as the newsletter writer and **Resend** as the delivery mechanism, giving us full control over content quality and send timing.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Newsletter Agent                │
│                                                  │
│  1. Gather   → Query today's processed summaries │
│  2. Triage   → Score relevance, group by theme   │
│  3. Write    → Generate editorial + commentary    │
│  4. Format   → Render to HTML email template      │
│  5. Send     → Deliver via Resend API             │
│  6. Log      → Record what was sent and when      │
└─────────────────────────────────────────────────┘
```

### Trigger Options

| Method | Description |
|--------|-------------|
| **Cron / scheduled script** | `node scripts/send-newsletter.ts` via cron, GitHub Actions, or Netlify scheduled function |
| **Manual CLI** | Run on-demand for testing or ad-hoc sends |
| **Post-sync hook** | Trigger after `sync-all` completes (if enough new content) |

## Agent Workflow

### Step 1: Gather Content

- Query all video summaries processed since the last newsletter send
- Source: content collection (same data the client site uses)
- Include: title, channel, TLDR, key takeaways, tags, `processedAt` timestamp
- Also gather any new articles scraped in the same period

### Step 2: Triage & Curate

The agent evaluates each piece of content and decides:

- **Include / Skip** — Is this interesting enough for the newsletter?
- **Priority** — Lead story vs. mention vs. quick link
- **Grouping** — Cluster by theme (e.g., "Agent updates", "Model releases", "Tutorials", "Industry news")
- **Highlight picks** — Select 1-3 "editor's picks" that deserve deeper commentary

Triage criteria (provided in agent system prompt):
- Novelty: Is this a new development or rehash?
- Impact: Does this affect how people build/use AI?
- Quality: Is the source video/article substantive?
- Audience fit: Does this match the subscriber base's interests?

### Step 3: Write Newsletter

The agent generates a complete newsletter with:

```
Subject: [generated — concise, compelling, no clickbait]

── Intro ──
Brief editorial paragraph setting context for this issue.
What's the theme? What stood out?

── Featured / Editor's Picks ──
For each featured item:
  - Title + link to summary page
  - 2-3 sentence editorial commentary (not just the TLDR —
    the agent's take on why this matters, connections to
    broader trends, practical implications)
  - Link to original video/article

── Quick Links ──
Remaining items as a compact list:
  - Title | Channel | One-liner | [Read Summary] [Watch]

── Closing ──
Brief sign-off, teaser for what's coming, call to action.
```

### Step 4: Format to HTML

- Render the agent's output into an HTML email template
- Template should be simple, responsive, and email-client-compatible
- Consider: MJML or React Email for templating
- Inline styles (email clients strip `<style>` blocks)

### Step 5: Send via Resend

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'newsletter@yourdomain.com',
  to: audienceList,           // or use Resend Audiences
  subject: generatedSubject,
  html: renderedHtml,
})
```

Key Resend features to leverage:
- **Audiences** — manage subscriber lists
- **Broadcasts** — send to an entire audience
- **Domain verification** — custom sender domain
- **Analytics** — open/click tracking built-in

### Step 6: Log & Record

- Save the generated newsletter to `src/content/newsletters/YYYY-MM-DD.md` (or JSON)
- Record: date sent, video IDs included, subject line, audience size
- Use this log to avoid re-sending the same content and for the archive page

## Technical Decisions

### Where Does This Live?

| Option | Pros | Cons |
|--------|------|------|
| **ai-content-scraper** (scripts/) | Close to data source, runs alongside sync | Mixes scraping concern with distribution |
| **ai-content-client** (server/) | Can serve newsletter archive on site | Client shouldn't have send-side logic |
| **New package: ai-content-newsletter** | Clean separation of concerns | Another package to maintain |
| **ai-content-scraper** (new `src/newsletter/` dir) | Practical — scraper already has LLM infra, content access | Best near-term choice |

**Recommendation:** Start in `ai-content-scraper/src/newsletter/` since the scraper already has:
- LLM integration (for summary generation)
- Access to all content data
- Script runner infrastructure
- Environment config patterns

### LLM Agent Implementation

- Use the same LLM provider already configured in the scraper
- System prompt defines the newsletter voice, structure, and editorial guidelines
- Input: structured JSON of today's content
- Output: structured JSON with subject, sections, and HTML-ready content
- Consider using structured output / tool use for reliable formatting

### Email Template Stack

Options to evaluate:
- **React Email** — JSX-based email templates, good DX, works with Resend natively
- **MJML** — email-specific markup, mature, good cross-client support
- **Plain HTML** — simplest, but tedious for responsive design

### Subscriber Management

- Start with **Resend Audiences** for list management
- Add subscribe/unsubscribe endpoints to the client site later
- Consider a simple `/newsletter` landing page on the client for sign-ups

## Configuration

```typescript
// Environment variables
RESEND_API_KEY=re_xxxxx
RESEND_AUDIENCE_ID=aud_xxxxx
NEWSLETTER_FROM_EMAIL=newsletter@yourdomain.com
NEWSLETTER_FROM_NAME="AI Content Digest"
NEWSLETTER_SEND_CADENCE=daily     // daily | every-3-days | weekly
NEWSLETTER_MIN_ITEMS=3            // minimum content pieces to justify a send
NEWSLETTER_DRY_RUN=false          // true = generate but don't send
```

## Edge Cases

| Scenario | Handling |
|----------|----------|
| No new content since last send | Skip send, log "nothing to send" |
| Only 1-2 items | Send a "quick update" format instead of full newsletter |
| LLM generates poor content | Dry-run mode for review; optional human-in-the-loop approval step |
| Resend API failure | Retry with backoff; save generated content so it's not lost |
| Duplicate content across sends | Track sent video IDs in log; agent filters them out |
| Subscriber hits spam complaint | Resend handles suppression automatically |

## Implementation Phases

### Phase 1: Core Agent + Local Preview

- [ ] Set up `ai-content-scraper/src/newsletter/` directory
- [ ] Create newsletter agent with system prompt and content gathering
- [ ] Implement triage logic (LLM-based scoring and grouping)
- [ ] Generate newsletter content as structured output
- [ ] Save generated newsletters as local markdown for review
- [ ] CLI command: `pnpm newsletter:preview` — generates and opens in browser

### Phase 2: Email Template + Resend Integration

- [ ] Choose and set up email template system (React Email or MJML)
- [ ] Create responsive newsletter HTML template
- [ ] Integrate Resend SDK
- [ ] Set up Resend Audience for subscriber management
- [ ] Verify custom sender domain
- [ ] CLI command: `pnpm newsletter:send` — generates and sends
- [ ] Add dry-run mode

### Phase 3: Automation + Archive

- [ ] Add cron/scheduled trigger (GitHub Actions or Netlify scheduled function)
- [ ] Build newsletter archive page on client site (`/newsletter`)
- [ ] Add subscribe form to client site
- [ ] Add send log tracking (what was sent, when, to whom)
- [ ] Analytics dashboard (opens, clicks via Resend webhooks)

### Phase 4: Refinement

- [ ] A/B test subject lines (Resend supports this)
- [ ] Feedback loop — track which links get clicked, feed back into triage scoring
- [ ] Personalization — segment audience, tailor content emphasis
- [ ] Include article content (not just videos) in newsletter

## Open Questions

- [ ] What editorial voice/tone should the newsletter have? (Professional? Casual? Opinionated?)
- [ ] What's the target cadence? Daily is frequent — 2-3x/week might be better for retention
- [ ] Should there be a human review step before sends, or fully autonomous?
- [ ] Custom domain for sending — what domain?
- [ ] Newsletter name/brand?

---

*Process created: 2026-03-19 — Replaces feat-rss-digest-newsletter.md*

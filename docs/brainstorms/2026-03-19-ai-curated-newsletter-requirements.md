---
date: 2026-03-19
topic: ai-curated-newsletter
---

# AI-Curated Newsletter via Resend

## Problem Frame

The ai-content project scrapes, summarizes, and publishes YouTube videos and articles from across the AI ecosystem. Subscribers currently have to visit the site to discover new content. There is no push distribution channel — no way for content to come to subscribers on a regular cadence.

A newsletter solves this by delivering a curated, opinionated digest of the best recent content directly to subscribers' inboxes, written by an LLM agent with editorial voice.

## Requirements

- R1. An LLM agent gathers all videos and articles processed since the last newsletter send, triages them by relevance and quality, and writes a complete newsletter issue
- R2. The agent writes with an **opinionated curator** voice — strong takes, clear recommendations, personality. Not a mechanical list of links, but a knowledgeable perspective on what matters and why
- R3. Newsletter content includes both YouTube video summaries and scraped articles (Medium, Substack, Beehiiv, Every) — the full content mix
- R4. Each issue has a structured format: compelling subject line, editorial intro setting context, featured picks with 2-3 sentence commentary per item, a quick links section for remaining items, and a brief closing
- R5. Target cadence is **3x per week on Mon/Wed/Fri**, skipping sends when insufficient new content exists (minimum threshold of items to justify a send)
- R6. Email delivery via **Resend** (API-based sending, Audiences for subscriber management, Broadcasts for audience-wide sends)
- R7. The agent operates in a **supervised mode by default** — generates a draft for human review before sending. The system should be designed so that autonomous sending can be enabled later once confidence in output quality is established
- R8. Each sent newsletter is archived (content, date, items included, subject line) to prevent duplicate content across sends and to power a future `/newsletter` archive page on the client site
- R9. The agent's triage evaluates content on: novelty (new vs. rehash), impact (does it affect how people build/use AI), source quality (substantive vs. clickbait), and audience fit

## Success Criteria

- The agent consistently produces newsletter drafts that require minimal human editing before sending
- Subscribers receive 2-3 issues per week during normal content flow periods
- No duplicate content is sent across newsletter issues
- Newsletter renders correctly in major email clients (Gmail, Outlook, Apple Mail)
- The system gracefully handles periods with no new content (skips send, logs reason)

## Scope Boundaries

- **Not in scope:** Subscriber acquisition / landing page / sign-up forms (Phase 3+ concern)
- **Not in scope:** Analytics dashboard for opens/clicks (Resend provides basic analytics out of the box)
- **Not in scope:** A/B testing, personalization, audience segmentation (future refinement)
- **Not in scope:** Newsletter archive page on client site (future phase, but the archive data format should support it)
- **Not in scope:** Custom sender domain setup (operational task, not a code concern)

## Key Decisions

- **Resend over Mailchimp:** API-driven sending gives full control over timing, formatting, and content. No RSS polling limitations. Audiences + Broadcasts handle subscriber management natively
- **Opinionated curator voice:** The editorial personality is what makes the newsletter worth subscribing to vs. just visiting the site. The agent's system prompt must encode strong editorial guidelines
- **Videos + Articles:** Including both content types gives subscribers the complete picture. The scraper already handles both, so the marginal cost is low
- **Mon/Wed/Fri cadence:** Daily risks fatigue; weekly loses timeliness. 3x/week on fixed days gives subscribers a predictable rhythm
- **Newsletter name deferred:** Will use a placeholder during Phase 1 and decide the brand identity when designing the email template in Phase 2
- **Supervised-then-autonomous:** Start with human review to build trust and refine the agent's voice, with a clear path to autonomous operation once quality is consistent
- **Lives in ai-content-scraper:** The scraper already has LLM infrastructure (AIService with Gemini + OpenRouter), content access, script runner patterns, and environment config. Adding a `src/newsletter/` directory is the pragmatic near-term choice

## Dependencies / Assumptions

- Resend account with API access and at least one verified sender domain
- Existing `AIService` in the scraper can be extended or a new service created for newsletter generation
- Content from both videos and articles is available via the scraper's content directories
- The existing `digest.ts` utility has reusable date/period logic, though the newsletter agent may not need fixed periods (it queries "since last send" instead)

## Outstanding Questions

### Deferred to Planning

- [Affects R4][Technical] Which email template system to use — React Email (native Resend integration), MJML, or plain HTML with inline styles?
- [Affects R1][Needs research] Best structured output format for the agent — should it output markdown that gets rendered to HTML, or structured JSON with sections?
- [Affects R7][Technical] How to implement the review flow — CLI preview command that opens in browser? Email draft sent to admin first? Web-based approval UI?
- [Affects R8][Technical] Archive format — markdown files, JSON, or database entries?
- [Affects R1][Needs research] Should the agent use the existing `AIService` (Gemini) or would a different model (e.g., Claude via OpenRouter) produce better editorial writing?

## Next Steps

→ `/ce:plan` for structured implementation planning

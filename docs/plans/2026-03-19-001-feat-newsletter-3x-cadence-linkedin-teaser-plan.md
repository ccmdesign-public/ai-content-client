---
title: "feat: Newsletter 3x/week cadence + LinkedIn teaser generation"
type: feat
status: completed
date: 2026-03-19
origin: docs/brainstorms/2026-03-19-ai-curated-newsletter-requirements.md
deepened: 2026-03-19
---

## Enhancement Summary

**Deepened on:** 2026-03-19
**Sections enhanced:** 8
**Research sources used:** Zod documentation (Context7), LinkedIn post best practices (2026), email cadence research, Resend API rate limiting, LLM pipeline error handling patterns, TypeScript reviewer analysis, architecture review, performance analysis, security review, code simplicity review, pattern recognition, data integrity review, agent-native review

### Key Improvements
1. **LinkedIn teaser prompt upgraded with 2026 data:** Hook should be 7-12 words / 49 chars max for first-line visibility; optimal engagement at 1,300-1,900 chars total; "link in first comment" pattern confirmed as best practice
2. **Zod validation hardened:** Use `z.discriminatedUnion()` for cadence config, `.safeParse()` throughout for non-throwing validation, and `.default()` for config fields to eliminate undefined handling
3. **Resend rate limiting awareness:** 2 req/sec hard limit requires batching for future audience growth; plan now accounts for this constraint
4. **LLM graceful degradation pattern formalized:** Circuit breaker pattern with timeout + retry + fallback, not just try/catch; teaser failure should record failure metadata for monitoring
5. **New edge cases discovered:** Timezone-dependent send-day calculation, holiday/vacation gap accumulation, concurrent pipeline execution race condition on send log, LinkedIn character counting (emoji = 2 chars)

### New Risks Discovered
- **Timezone drift on send-day check:** Server timezone vs intended audience timezone can cause the pipeline to run on the wrong day or skip a day
- **Content drought on short windows:** Mon edition gathers Sat-Mon (3 days) but Fri-Sun may have low AI news volume, risking `editionMinItems` not being met
- **Resend rate limit at scale:** 2 req/sec limit will become a bottleneck if audience exceeds ~100 subscribers with individual sends
- **LinkedIn post character counting edge case:** Emojis and special characters count as 2+ characters toward the 3,000 limit

---

# feat: Newsletter 3x/week cadence + LinkedIn teaser generation

## Overview

Modify the existing newsletter pipeline in `ai-content-scraper` to produce smaller, focused editions at a 3x/week cadence (Mon/Wed/Fri) instead of the current unbounded "since last send" model. Extend the draft generation step to also output a LinkedIn-formatted teaser post alongside each newsletter edition, enabling the content distribution strategy outlined in `docs/linkedin-distro.md`.

This ticket also absorbs the remaining scope from AIC-23 (CLI send + dry-run + brand config), which was largely completed during AIC-22. The residual AIC-23 gaps (terminal content preview, brand name finalization, `.env.example` docs) are folded into Phase 3 here.

## Problem Statement / Motivation

**Current State:**
- The newsletter pipeline gathers content "since last send" with no fixed schedule (see origin: `docs/brainstorms/2026-03-19-ai-curated-newsletter-requirements.md`)
- `minItems=3`, `maxFeatured=5`, `maxQuickLinks=15` are tuned for weekly-sized batches
- No LinkedIn distribution exists -- the `linkedin-distro.md` strategy calls for 3x/week posts that match newsletter cadence, but there is no automated copy generation
- The `NewsletterDraft` type has no field for social media teaser content
- AIC-23 gaps remain: terminal content preview before send confirmation, brand name decision, `.env.example` documentation

**Desired State:**
- Pipeline runs Mon/Wed/Fri, producing smaller focused editions (R5 from origin)
- Config controls for per-edition sizing (`minItems`, `maxFeatured`, `maxQuickLinks` adjusted downward)
- Triage distributes content across 3 weekly editions rather than batching into one
- Each draft includes a `linkedInTeaser` field with a ready-to-post LinkedIn text and CTA link
- CLI send flow includes terminal content preview, brand config, and human approval gate (AIC-23 scope absorbed)

**Why This Matters:**
- 3x/week cadence reduces subscriber fatigue and improves timeliness (see origin: R5, "Daily risks fatigue; weekly loses timeliness")
- LinkedIn teasers are the $0 audience-building engine described in `docs/linkedin-distro.md` -- every post drives newsletter signups
- Completing the supervised send flow (AIC-23 gaps) makes the pipeline production-ready

### Research Insights: Email Cadence

**Best Practices (2026 data):**
- 3x/week is classified as "moderate-to-active" frequency, appropriate for engaged audiences and awareness/nurture campaigns
- Consistency of schedule matters more than frequency -- ESPs (Email Service Providers) prefer consistent senders, which improves deliverability
- Segmentation by engagement level is recommended: highly engaged subscribers can receive 3+/week, while less engaged segments may benefit from lower frequency
- Content quality per-edition must remain high; sending more frequently with thinner content accelerates unsubscribes

**Considerations for this plan:**
- Monitor open rates and unsubscribe rates during the first 2 weeks after switching from weekly to 3x/week
- Consider adding a preference center (future scope) to let subscribers choose weekly vs 3x/week digest
- The Mon/Wed/Fri cadence aligns with B2B email best practices (weekday mornings outperform weekends)

**References:**
- [Email Cadence & Frequency: Data-Backed Strategy for 2026 - MailerLite](https://www.mailerlite.com/blog/email-cadence-and-frequency-best-practices)
- [Email Frequency Best Practices 2026: B2B Guide](https://www.mailreach.co/blog/email-frequency-best-practices)

## Proposed Solution

### High-Level Approach

The implementation is split across two repos and four phases:

1. **Phase 1 (Scraper):** Cadence config + triage distribution logic
2. **Phase 2 (Scraper):** LinkedIn teaser writer LLM step + `NewsletterDraft` type extension
3. **Phase 3 (Scraper):** CLI send integration (AIC-23 residual scope)
4. **Phase 4 (Client):** Update `digest.xml` period config if needed to match new cadence

All newsletter pipeline code lives in `ai-content-scraper/src/newsletter/`. The client repo (`ai-content-client`) only needs a config change to the digest feed period if the RSS-based distribution is kept alongside Resend.

## Technical Approach

### Architecture

The existing pipeline flow is:

```
gather -> dedup -> triage -> write -> render -> log
```

The modified flow adds cadence-aware gathering and a LinkedIn teaser step:

```
gather (cadence-aware) -> dedup -> triage (edition-scoped) -> write -> linkedin-teaser -> render -> log
```

### Research Insights: Architecture

**Architecture Review Findings:**
- The pipeline's linear flow is a strength -- each step has clear inputs/outputs and single responsibility. The LinkedIn teaser step fits naturally as a post-write derivative.
- The `generateLinkedInTeaser()` function correctly takes the completed draft (not raw content), maintaining proper data flow direction.
- **Concern: Pipeline step coupling.** The LinkedIn teaser step is the first "optional" step in an otherwise all-or-nothing pipeline. This sets a precedent for how future optional steps (e.g., Twitter/X teaser, Bluesky post) should be handled. Consider abstracting the "optional derivative artifact" pattern now to avoid ad-hoc patterns later.
- **Recommendation:** Define an `OptionalPipelineStep` interface or type that standardizes: input (draft), output (artifact), error handling (warn + continue), and file saving convention. This prevents each future social channel from implementing its own try/catch pattern.

**Pattern Recognition:**
- The cadence config follows the existing pattern of env-var-driven configuration with Zod validation -- consistent with the codebase.
- The `linkedInTeaser` as an optional field on `NewsletterDraft` follows the additive schema evolution pattern already used in the pipeline.

### Key Files (ai-content-scraper)

| File | Action | Purpose |
|------|--------|---------|
| `src/newsletter/config.ts` | Modify | Add cadence config fields (`cadence`, `sendDays`, per-edition sizing) |
| `src/newsletter/types.ts` | Modify | Extend `NewsletterDraft` schema with `linkedInTeaser` field; add `NewsletterCadenceConfig` |
| `src/newsletter/gatherer.ts` | Modify | Make gathering cadence-aware (gather since last edition, not last send) |
| `src/newsletter/triage.ts` | Modify | Add edition-scoping logic to distribute content across editions |
| `src/newsletter/writer.ts` | Modify | No changes to the write step itself |
| `src/newsletter/linkedin-teaser.ts` | Create | New LLM step that generates LinkedIn post from the draft |
| `src/newsletter/prompts/linkedin-teaser.prompt.md` | Create | System prompt for LinkedIn teaser generation |
| `src/newsletter/index.ts` | Modify | Integrate LinkedIn teaser step into the pipeline; add cadence-aware scheduling logic |
| `src/newsletter/renderer.ts` | Modify | Include LinkedIn teaser in markdown preview |
| `src/scripts/newsletter-send.ts` | Modify | Terminal content preview (AIC-23 G1), brand config |
| `.env.example` | Create/Modify | Document newsletter env vars (AIC-23 G5) |

### Key Files (ai-content-client)

| File | Action | Purpose |
|------|--------|---------|
| `src/nuxt.config.ts` | Potentially modify | Adjust `digestPeriodDays` if RSS digest should match new cadence |

### Implementation Phases

#### Phase 1: Cadence Configuration + Gathering (Scraper)

**Goal:** Make the pipeline cadence-aware without changing the triage/write steps.

**Tasks:**

- [ ] Add cadence fields to `NewsletterConfig` in `src/newsletter/types.ts`:
  ```typescript
  // New fields in NewsletterConfig
  cadence: '3x-weekly' | 'weekly' | 'daily';
  sendDays: number[];           // 0=Sun..6=Sat. Default: [1,3,5] for Mon/Wed/Fri
  editionMinItems: number;      // per-edition minimum (default: 2, down from 3)
  editionMaxFeatured: number;   // per-edition max featured (default: 3, down from 5)
  editionMaxQuickLinks: number; // per-edition max quick links (default: 8, down from 15)
  ```
- [ ] Add Zod validation and env var loading in `src/newsletter/config.ts`:
  - `NEWSLETTER_CADENCE` (default: `3x-weekly`)
  - `NEWSLETTER_SEND_DAYS` (default: `1,3,5`)
  - `NEWSLETTER_EDITION_MIN_ITEMS` (default: `2`)
  - `NEWSLETTER_EDITION_MAX_FEATURED` (default: `3`)
  - `NEWSLETTER_EDITION_MAX_QUICK_LINKS` (default: `8`)
- [ ] Modify `gatherContent()` in `src/newsletter/gatherer.ts`:
  - Keep existing "since last send" behavior as default
  - Add cadence-aware windowing: for `3x-weekly` with `sendDays: [1,3,5]`, calculate the expected window based on which edition day it is (Mon gathers Sat-Mon, Wed gathers Mon-Wed, Fri gathers Wed-Fri)
  - Default 7-day fallback still applies on first run
- [ ] Apply edition-sized limits in the orchestrator (`src/newsletter/index.ts`):
  - Use `editionMinItems` instead of `minItems` when cadence is set
  - Use `editionMaxFeatured` and `editionMaxQuickLinks` for trimming
- [ ] Add unit tests in `src/tests/newsletter/cadence-config.test.ts`:
  - Validate cadence window calculation for each day of the week
  - Verify per-edition limits are applied correctly
  - Test fallback behavior when cadence is not configured

**Estimated effort:** 3-4 hours

##### Research Insights: Phase 1

**Zod Validation Best Practices (from Zod docs + Context7):**
- Use `z.discriminatedUnion()` for the cadence field to get efficient parsing and clear error messages:
  ```typescript
  // Instead of a plain enum, consider a discriminated union for cadence configs
  // that may have different required fields per cadence type
  const CadenceConfigSchema = z.object({
    cadence: z.enum(['3x-weekly', 'weekly', 'daily']).default('3x-weekly'),
    sendDays: z.array(z.number().int().min(0).max(6)).min(1).default([1, 3, 5]),
    editionMinItems: z.number().int().positive().default(2),
    editionMaxFeatured: z.number().int().positive().default(3),
    editionMaxQuickLinks: z.number().int().positive().default(8),
  });
  ```
- Use `.safeParse()` instead of `.parse()` for config loading to return structured errors rather than throwing. This allows the CLI to display a human-readable config error message rather than a stack trace.
- Use `.default()` on each field so that partial env var configuration works without requiring all vars to be set.
- Add `.refine()` to validate cross-field constraints: `sendDays` length should match cadence (e.g., `3x-weekly` expects exactly 3 send days).

**Cadence Window Calculation Edge Cases:**
- **Timezone handling:** The window calculation uses day-of-week, but the server may run in UTC while the audience is in a specific timezone. Add a `NEWSLETTER_TIMEZONE` env var (default: `America/New_York` or the operator's timezone) and use it for day-of-week determination.
- **DST transitions:** When clocks change, a day boundary may shift. Use a timezone-aware library (e.g., `Intl.DateTimeFormat` or `date-fns-tz`) rather than raw `Date.getDay()`.
- **Holiday gaps:** If the pipeline doesn't run on a scheduled day (server down, holiday), the next run should gather the extended window. The "since last send" fallback handles this, but add a test case.
- **Validation constraint:** Add a Zod `.refine()` to ensure `sendDays` are sorted and unique: `sendDays: z.array(z.number()).refine(days => new Set(days).size === days.length && days.every((d, i) => i === 0 || d > days[i-1]), 'sendDays must be sorted unique values')`

**Performance Consideration:**
- The window calculation is O(1) -- just date arithmetic. No performance concerns.
- The `editionMinItems` check should happen early (before the LLM write step) to avoid wasting an API call on a too-thin edition. If below minimum, log a warning and skip the edition rather than producing a low-value newsletter.

#### Phase 2: LinkedIn Teaser Writer (Scraper)

**Goal:** Add an LLM step that generates a LinkedIn-formatted teaser post from each newsletter draft.

**Tasks:**

- [ ] Extend `NewsletterDraft` type and Zod schema in `src/newsletter/types.ts`:
  ```typescript
  // Add to NewsletterDraftSchema
  linkedInTeaser: z.object({
    postText: z.string(),       // Full LinkedIn post text (hook + takeaways + CTA)
    ctaUrl: z.string().url(),   // Link to newsletter archive or signup page
    hashtags: z.array(z.string()).optional(),
  }).optional(),
  ```
- [ ] Create `src/newsletter/linkedin-teaser.ts`:
  ```typescript
  export async function generateLinkedInTeaser(
    draft: NewsletterDraft,
    aiService: NewsletterAIService,
    config: { siteUrl: string; newsletterSignupUrl?: string }
  ): Promise<LinkedInTeaser>
  ```
  - Takes the completed `NewsletterDraft` as input (subject line, editorial intro, featured picks)
  - Calls the LLM with a dedicated LinkedIn prompt
  - Returns structured `LinkedInTeaser` object
  - The teaser is a derivative artifact, not a separate pipeline stage -- it uses the draft's content, not raw content items
- [ ] Create `src/newsletter/prompts/linkedin-teaser.prompt.md`:
  - **Hook line:** Attention-grabbing opening (question, bold claim, or surprising stat derived from the edition's content)
  - **Takeaways:** 3-5 numbered insights from the featured picks (not the full commentary, just the key signals)
  - **CTA:** Drive to newsletter signup with a clear value proposition
  - **Format constraints:** ~200 words max (LinkedIn optimal), no external links in body (link in first comment pattern), 3-5 hashtags
  - **Voice:** Match the newsletter's opinionated curator voice but adapted for LinkedIn's format (see origin: R2)
  - Post formats from `docs/linkedin-distro.md`: "5 things I learned from...", curated lists, tool of the week
- [ ] Add Zod schema for LinkedIn teaser LLM response validation in `src/newsletter/ai-service.ts`:
  ```typescript
  const LinkedInTeaserResponseSchema = z.object({
    postText: z.string().max(3000),  // LinkedIn post limit
    ctaUrl: z.string().url(),
    hashtags: z.array(z.string()).max(5),
  });
  ```
- [ ] Add `writeLinkedInTeaser()` method to `NewsletterAIService` class
- [ ] Integrate into pipeline orchestrator in `src/newsletter/index.ts`:
  - Call `generateLinkedInTeaser()` after `writeNewsletter()` completes
  - Attach result to the `NewsletterDraft` object before saving
  - LinkedIn teaser generation should be non-blocking: if it fails, log a warning and continue (the newsletter draft is the primary artifact)
- [ ] Update `renderDraftToMarkdown()` in `src/newsletter/renderer.ts` to include the LinkedIn teaser in the preview
- [ ] Save LinkedIn teaser as a separate file alongside the draft: `data/newsletter-drafts/{basename}-linkedin.txt`
- [ ] Add unit tests in `src/tests/newsletter/linkedin-teaser.test.ts`:
  - Test prompt construction from a mock draft
  - Test response parsing and validation
  - Test graceful degradation when LLM call fails
  - Test the teaser is included in the saved draft JSON

**Estimated effort:** 4-5 hours

##### Research Insights: Phase 2

**LinkedIn Post Best Practices (2026 data):**
- **Character limit:** 3,000 characters maximum. Only the first 140 characters are visible before "...see more", making the hook critical.
- **Optimal engagement length:** 1,300-1,900 characters optimizes dwell time, engagement velocity, and completion rate. The plan's "~200 words" target (~1,000-1,200 chars) is slightly below optimal -- consider targeting 200-280 words (~1,300-1,600 chars).
- **Hook formula:** Best hooks are 7-12 words, under 49 characters. Use the HOOK + VALUE + CTA structure. Write the hook last after the content is drafted.
- **Hashtags:** 3-5 hashtags placed at the end (not inline). Mix: 1 broad (#AI), 2-3 niche (#AINewsletter, #LLMTools), 1 brand-specific.
- **Link placement:** Confirmed best practice is NO links in post body. Place the CTA link as the first comment. LinkedIn's algorithm deprioritizes posts with outbound links in the body.
- **Emoji usage caution:** Emojis count as 2+ characters. If the prompt generates emoji-heavy posts, this could silently exceed the 3,000 char limit even when word count is under target.

**Prompt Engineering Recommendations:**
- The prompt should explicitly instruct the LLM to output the CTA URL separately (not embedded in post text) since the URL goes in the first comment, not the post body.
- Include 2-3 example posts in the prompt (few-shot) to establish voice consistency. Rotate examples periodically to avoid repetitive output patterns.
- Add a `postFormat` field to the teaser schema: `'curated-list' | 'tool-of-week' | 'insights'` to let the LLM choose the best format based on the edition content. This matches the format variety from `linkedin-distro.md`.

**Graceful Degradation Pattern (from LLM pipeline research):**
- Beyond simple try/catch, implement a lightweight circuit breaker: if the LinkedIn teaser LLM call fails 3 consecutive times, skip the step for subsequent runs until manually reset. This prevents burning API tokens on a broken prompt/model config.
- Record failure metadata alongside the draft: `{ teaserGeneration: 'failed', error: 'timeout', timestamp: ... }` so operators can see patterns.
- Set a timeout on the LLM call (e.g., 15 seconds) independent of the general LLM timeout. The teaser is a short output and should not take as long as the full newsletter write.

**Zod Schema Refinements:**
- Add `.min(100)` to `postText` to catch degenerate LLM outputs (empty or too-short teasers).
- Add `.refine()` to validate that `postText` does not contain URLs (they should be in `ctaUrl` only, per the "link in first comment" pattern):
  ```typescript
  postText: z.string().min(100).max(3000).refine(
    text => !text.match(/https?:\/\//),
    'Post text should not contain URLs; use ctaUrl for the CTA link'
  ),
  ```
- Hashtag validation: ensure hashtags start with `#` and contain no spaces:
  ```typescript
  hashtags: z.array(
    z.string().regex(/^#[a-zA-Z0-9]+$/, 'Hashtag must start with # and contain no spaces')
  ).min(3).max(5),
  ```

**Security Considerations:**
- The LinkedIn teaser is generated from newsletter content and displayed in CLI output. Ensure no API keys, internal URLs, or PII from the content pipeline leak into the teaser text.
- The `ctaUrl` should be validated against an allowlist of known domains (the project's own site URL) to prevent the LLM from hallucinating arbitrary URLs.
- The teaser `.txt` file is saved to disk. Ensure the output directory has appropriate permissions and is included in `.gitignore` if draft data should not be committed.

#### Phase 3: CLI Send Integration -- AIC-23 Residual (Scraper)

**Goal:** Complete the supervised send flow with terminal content preview, brand config, and workflow documentation. Absorbs AIC-23 gaps G1, G3, G4, G5.

**Tasks:**

- [ ] **Terminal content preview (G1):** Add a content preview section to `src/scripts/newsletter-send.ts` between the stats display and the `[y/N]` prompt. Show: intro snippet (120 chars), featured pick titles with editor's pick badge, first 3 quick link titles with overflow count, LinkedIn teaser preview (first 100 chars if present). Implementation approach from AIC-23 plan, Task 1.
- [ ] **Workflow documentation (G3):** Update help text in `newsletter-send.ts` and `newsletter-preview.ts` to describe the recommended supervised workflow (preview -> review -> send from draft).
- [ ] **Brand config (G4):** Finalize newsletter brand name. Update defaults in `config.ts`. This is a product decision -- the plan proposes options (see Open Questions).
- [ ] **`.env.example` (G5):** Create or append newsletter env vars to `.env.example`, including the new cadence and LinkedIn teaser config vars.
- [ ] **LinkedIn teaser in CLI output:** When a LinkedIn teaser is generated, display it in the send flow output and offer to copy it to clipboard.
- [ ] Add inline code comment for the `dryRun: true` pattern in the send flow (AIC-23 G8).

**Estimated effort:** 2-3 hours

##### Research Insights: Phase 3

**UX Writing for CLI Output:**
- Terminal content preview should use clear visual hierarchy: bold/colored section headers, indented content, and truncation with ellipsis + character count. Example: `Featured: "OpenAI releases GPT-5..." (3 picks)`.
- The `[y/N]` confirmation prompt should default to "No" (uppercase N) to prevent accidental sends -- this is the safe default pattern for destructive/irreversible actions.
- When displaying the LinkedIn teaser preview, show the first line (the hook) prominently since that is the most important part for human review.

**Clipboard Copy Pattern:**
- Use `pbcopy` on macOS, `xclip`/`xsel` on Linux, and `clip` on Windows. Detect platform at runtime. Alternatively, use the `clipboardy` npm package for cross-platform support.
- After copying, display a confirmation: `LinkedIn teaser copied to clipboard (1,423 chars)`.

**Resend API Rate Limiting:**
- Resend enforces 2 requests per second. For the current use case (single newsletter broadcast), this is not a bottleneck since Resend's broadcast API sends to the entire audience in one API call.
- However, if the implementation uses individual `emails.send()` calls per subscriber, the 2 req/sec limit becomes a hard constraint at ~120 subscribers/minute. Document this in `.env.example` as a known limitation and recommend Resend's broadcast/audience API for scaling.

#### Phase 4: Client Digest Feed Alignment (Client)

**Goal:** Ensure the RSS digest feed in the client repo aligns with the new 3x/week cadence, if the RSS-based distribution is maintained alongside Resend.

**Tasks:**

- [x] Evaluate whether `digest.xml` should change from 3-day periods to match the Mon/Wed/Fri schedule
  - Current: fixed 3-day periods from epoch (e.g., Jan 1-3, Jan 4-6)
  - Option A: Keep as-is (the RSS feed serves a different purpose than the newsletter)
  - Option B: Switch to day-of-week alignment (Mon-Tue, Wed-Thu, Fri-Sun)
  - **Recommendation:** Keep as-is. The RSS digest is a Mailchimp integration layer; the newsletter via Resend is the primary distribution. No client code changes needed.
  - **Decision (AIC-26):** Option A selected. Digest feed period kept as-is. Added documentation comments to `digest.ts` and `nuxt.config.ts` clarifying the decoupling.
- [x] If changes are needed, update `digestPeriodDays` and period calculation logic in `src/server/utils/digest.ts` -- N/A (no changes needed per decision above)
- [x] Update `src/types/digest.ts` if the period model changes -- N/A (no changes needed per decision above)

**Estimated effort:** 0-2 hours (likely 0 if recommendation is followed)

## System-Wide Impact

### Interaction Graph

```
newsletter-send.ts (CLI entry)
  -> generateNewsletter() (index.ts)
    -> loadNewsletterConfig()     -- NEW: reads cadence fields
    -> gatherContent()            -- MODIFIED: cadence-aware windowing
    -> triageContent()            -- UNCHANGED (edition-scoping done by gather limits)
    -> writeNewsletter()          -- UNCHANGED
    -> generateLinkedInTeaser()   -- NEW: LLM call after write
    -> renderDraftToMarkdown()    -- MODIFIED: includes LinkedIn teaser
    -> renderDraftToHtml()        -- UNCHANGED (teaser not in email)
    -> renderDraftToEmail()       -- UNCHANGED
    -> sendLog.recordEntry()     -- UNCHANGED
  -> sendNewsletter() (if not dry-run)
    -> createEmailSender()        -- UNCHANGED
    -> sendLog.recordEntry()      -- UNCHANGED
```

### Error Propagation

- LinkedIn teaser LLM failure should NOT block the newsletter pipeline. The teaser is wrapped in try/catch with a warning log. The draft is saved without the teaser field.
- Cadence config validation failures should fail fast at startup (Zod parse in `loadNewsletterConfig()`).
- Invalid `sendDays` values (e.g., `[0,0,0]` or empty) are caught by Zod schema validation.

#### Research Insights: Error Propagation

**LLM Pipeline Error Handling Best Practices:**
- **Timeout isolation:** Set a dedicated timeout for the LinkedIn teaser LLM call (e.g., 15s) separate from the newsletter writer timeout. The teaser generates ~200 words vs the writer's ~1,000+, so it should complete faster. A shared timeout masks teaser-specific issues.
- **Structured error logging:** Log errors with structured metadata, not just string messages:
  ```typescript
  logger.warn('LinkedIn teaser generation failed', {
    step: 'linkedin-teaser',
    error: error.message,
    draftId: draft.id,
    duration: elapsedMs,
    willRetry: false,
  });
  ```
- **Circuit breaker consideration:** If the teaser step fails repeatedly (e.g., bad prompt, model outage), a simple counter-based circuit breaker prevents burning API tokens. After N consecutive failures, auto-disable the step and log an alert. Reset manually or after a cooldown period.
- **Idempotency:** If the pipeline is re-run for the same edition (e.g., after a crash), the teaser should be regenerated fresh rather than appending to an existing teaser. Use the draft ID + edition date as the idempotency key for the saved teaser file.

### State Lifecycle Risks

- The send log records all newsletter editions. The cadence change means more entries per week (3 vs 1). The log file grows faster but this is JSON and sizes are negligible.
- Content deduplication via `getSentContentIds()` remains correct -- content included in any edition (regardless of cadence) is excluded from future editions.
- **Risk:** If the pipeline runs on a non-send day (e.g., Tuesday), the cadence-aware window may gather too little or too much content. Mitigation: the pipeline should warn and exit gracefully if today is not a configured send day, unless `--force` is passed.

#### Research Insights: State Lifecycle

**Data Integrity Concerns:**
- **Concurrent execution race condition:** If two pipeline instances run simultaneously (e.g., cron overlap or manual + cron), the send log could have a race condition on write. Mitigate with a lockfile (`data/newsletter.lock`) checked at pipeline start.
- **Send log growth:** At 3 entries/week, the JSON log grows ~156 entries/year. This is manageable, but consider adding a `sendLog.rotate()` or archive function if the project runs for years. Not urgent.
- **Dedup correctness across cadences:** If switching from `weekly` to `3x-weekly`, content that was gathered but not sent in the weekly model may be excluded by the dedup check. Verify that `getSentContentIds()` only excludes content that was actually *sent* in a newsletter, not just *gathered*.

### API Surface Parity

- `NewsletterDraft` type is the single source of truth for draft structure. Adding `linkedInTeaser` as an optional field maintains backward compatibility -- existing draft JSON files without the field remain valid.
- `NewsletterDraftSchema` (Zod) must use `.optional()` for the new field to preserve backward compatibility with `--from-draft` loading.
- The `GenerateNewsletterResult` and `SendNewsletterResult` types remain unchanged -- the LinkedIn teaser is embedded in the `draft` object.

### Integration Test Scenarios

1. **Full pipeline with cadence:** Run on a Monday with `NEWSLETTER_CADENCE=3x-weekly`. Verify content is gathered from Saturday-Monday, edition limits are applied, and LinkedIn teaser is generated alongside the draft.
2. **Non-send-day behavior:** Run on a Tuesday with `3x-weekly` cadence. Verify the pipeline warns and exits (or proceeds with `--force`).
3. **Backward-compatible draft loading:** Load a pre-cadence draft JSON (without `linkedInTeaser`) via `--from-draft`. Verify it renders and sends correctly.
4. **LinkedIn teaser failure graceful degradation:** Mock the LLM call to throw. Verify the newsletter draft is still saved and sendable, with a warning logged.
5. **Edition sizing enforcement:** Provide 20 content items to the pipeline with `editionMaxFeatured=3` and `editionMaxQuickLinks=8`. Verify the draft respects these limits.

#### Research Insights: Additional Test Scenarios

**Edge case tests to add:**
6. **Content drought:** Provide 0-1 content items to a cadence-enabled pipeline. Verify the pipeline logs a warning about being below `editionMinItems` and skips the edition gracefully (no crash, no empty newsletter sent).
7. **Timezone boundary:** Run the pipeline at 11:55 PM server time when `NEWSLETTER_TIMEZONE` would make it a different day-of-week. Verify the timezone config is respected.
8. **Re-run idempotency:** Run the pipeline twice for the same edition date. Verify the second run overwrites (not duplicates) the draft and teaser files.
9. **LinkedIn teaser character limit:** Generate a teaser from a draft with many featured picks and long titles. Verify the teaser stays under 3,000 characters.
10. **`sendDays` validation:** Provide invalid configs (`sendDays: []`, `sendDays: [7]`, `sendDays: [1,1,3]`) and verify Zod rejects them with clear error messages.
11. **Concurrent pipeline guard:** Start two pipeline instances simultaneously. Verify the lockfile prevents the second instance from running.

## Acceptance Criteria

### Functional Requirements

- [ ] Pipeline supports `3x-weekly` cadence with configurable send days (default Mon/Wed/Fri)
- [ ] Per-edition sizing limits (`editionMinItems=2`, `editionMaxFeatured=3`, `editionMaxQuickLinks=8`) are enforced
- [ ] Content gathering window is cadence-aware (gathers since previous edition day, not since last arbitrary send)
- [ ] LinkedIn teaser is generated from each newsletter draft and saved alongside it
- [ ] LinkedIn teaser follows the format: hook + numbered takeaways + CTA + hashtags
- [ ] LinkedIn teaser is included in the markdown preview and CLI output
- [ ] `linkedInTeaser` field is optional in `NewsletterDraft` for backward compatibility
- [ ] LinkedIn teaser LLM failure does not block the newsletter pipeline
- [ ] Terminal content preview appears before the send confirmation prompt (AIC-23 G1)
- [ ] `.env.example` documents all newsletter and LinkedIn-related env vars (AIC-23 G5)
- [ ] Pipeline warns and exits gracefully when run on a non-send day (unless `--force`)

### Non-Functional Requirements

- [ ] LinkedIn teaser generation adds < 10 seconds to pipeline duration
- [ ] Cadence config validation fails fast on invalid values
- [ ] Existing draft JSON files (pre-cadence) remain loadable via `--from-draft`

### Quality Gates

- [ ] Unit tests for cadence window calculation
- [ ] Unit tests for LinkedIn teaser prompt construction, response parsing, and graceful degradation
- [ ] Unit tests for edition-sized limit enforcement
- [ ] Integration test: full pipeline run with cadence config
- [ ] Manual test: LinkedIn teaser post renders correctly when pasted into LinkedIn

#### Research Insights: Additional Quality Gates

- [ ] **TypeScript strict null checks:** Ensure all new code passes with `strict: true`. The `linkedInTeaser` optional field must be checked before access throughout the codebase (use TypeScript's narrowing, not non-null assertions).
- [ ] **No `any` types:** All new functions should have explicit parameter and return types. The LLM response parsing should use typed `safeParse` results, not `any`.
- [ ] **Zod schema round-trip test:** Parse a `NewsletterDraft` JSON to the schema, serialize it back, and verify equivalence. This catches `.optional()` vs `.nullable()` mismatches.
- [ ] **LinkedIn post manual QA checklist:** (1) Paste into LinkedIn post editor, (2) Verify hook is visible before "see more", (3) Confirm no links in body text, (4) Check hashtag rendering, (5) Verify total character count under 3,000.

## Dependencies & Prerequisites

### Required Before Implementation

1. **Newsletter pipeline (AIC-20, AIC-21, AIC-22) complete** -- all shipped
2. **Brand name decision** -- needed for LinkedIn teaser CTA and email from-name (see Open Questions)
3. **Newsletter signup URL** -- needed for LinkedIn teaser CTA link (can use a placeholder initially)

### External Dependencies

- Resend account (already configured from AIC-22)
- Gemini or OpenRouter API access (already configured)
- No LinkedIn API access needed for teaser generation (teaser is plain text for manual posting; automated posting via Postiz is a separate future concern per `docs/linkedin-distro.md`)

## Risk Analysis & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Edition sizing too aggressive (2 items feels thin) | Low subscriber value | Medium | Make limits configurable via env vars; monitor first 2 weeks and adjust |
| LinkedIn teaser voice inconsistency with newsletter | Brand confusion | Low | Use the same system prompt voice guidelines; review first 5 teasers manually |
| Non-send-day pipeline runs create unexpected gaps | Missing editions | Medium | Add `--force` flag for manual runs; add day-of-week check with clear warning |
| Backward-incompatible `NewsletterDraft` change | Breaks `--from-draft` loading | Low | `linkedInTeaser` is optional; Zod schema uses `.optional()` |
| LLM prompt produces LinkedIn posts that are too long | Post truncation on LinkedIn | Low | Add `maxLength` validation in Zod schema (3000 char LinkedIn limit); prompt specifies ~200 words |

### Research Insights: Additional Risks Discovered

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Timezone drift on send-day check | Pipeline runs on wrong day or skips an edition | Medium | Add `NEWSLETTER_TIMEZONE` env var; use `Intl.DateTimeFormat` for day-of-week calculation |
| Content drought on Fri-Sun window | Monday edition has too few items; triggers `editionMinItems` skip | Medium | Make `editionMinItems` configurable; consider 1 as the floor with a warning rather than a hard skip |
| Concurrent pipeline execution (cron overlap) | Send log corruption, duplicate sends | Low | Add lockfile check at pipeline start; release on exit (including crash via signal handler) |
| Emoji character counting in LinkedIn posts | Post silently truncated if emoji-heavy | Low | Add a character-aware length check that counts surrogate pairs; warn if approaching 2,800 chars |
| Resend rate limit at audience scale (2 req/sec) | Sends fail or timeout for large audiences | Low (now), Medium (future) | Use Resend broadcast API (not individual sends); document the constraint in `.env.example` |
| LLM hallucinating URLs in teaser post text | Broken or misleading links in LinkedIn post | Low | Add Zod `.refine()` to reject `postText` containing `http://` or `https://` patterns |
| `.env.example` drift from actual env vars | New devs miss required config | Medium | Add a startup check in `loadNewsletterConfig()` that warns about missing but recommended env vars |

## Alternative Approaches Considered

### Triage distribution across editions

**Considered:** A separate "edition planner" LLM step that distributes N content items across 3 editions for the week, optimizing for thematic coherence per edition.

**Rejected:** Adds complexity and a second LLM call. The simpler approach -- each edition gathers and triages its own window of content -- is sufficient. Thematic grouping already happens naturally because AI news tends to cluster by release timing. If editions feel disjointed, the planner can be added later.

### LinkedIn teaser as a separate CLI command

**Considered:** A standalone `bun run linkedin:generate` command that takes a draft path and produces a teaser independently.

**Rejected for now:** The teaser is tightly coupled to the newsletter content. Generating it as part of the pipeline ensures consistency and eliminates a manual step. A separate command could be added later if operators want to regenerate teasers without re-running the full pipeline. The `--from-draft` path could support this as a future enhancement.

### RSS digest feed alignment with cadence

**Considered:** Modifying `digest.xml` in the client repo to match Mon/Wed/Fri instead of fixed 3-day periods.

**Rejected:** The RSS digest serves a Mailchimp integration purpose. The Resend-based newsletter is the primary distribution channel. Changing the digest feed adds complexity for little value. If the RSS feed is deprecated in favor of Resend, this becomes moot.

## Sources & References

### Origin

- **Origin document:** [docs/brainstorms/2026-03-19-ai-curated-newsletter-requirements.md](docs/brainstorms/2026-03-19-ai-curated-newsletter-requirements.md) -- Key decisions carried forward: 3x/week Mon/Wed/Fri cadence (R5), opinionated curator voice (R2), supervised-then-autonomous mode (R7), Resend for delivery (R6), lives in ai-content-scraper (Key Decisions)

### Internal References

- LinkedIn distribution strategy: [docs/linkedin-distro.md](docs/linkedin-distro.md) -- 3x/week posting cadence, post formats, $0 stack
- AIC-23 plan (absorbed): [docs/plans/AIC-23-human-review-dry-run.md](docs/plans/AIC-23-human-review-dry-run.md) -- Gaps G1, G3, G4, G5 folded into Phase 3
- Newsletter pipeline orchestrator: `ai-content-scraper/src/newsletter/index.ts`
- Newsletter types: `ai-content-scraper/src/newsletter/types.ts`
- Newsletter config: `ai-content-scraper/src/newsletter/config.ts`
- Newsletter triage: `ai-content-scraper/src/newsletter/triage.ts`
- Newsletter writer: `ai-content-scraper/src/newsletter/writer.ts`
- Newsletter AI service: `ai-content-scraper/src/newsletter/ai-service.ts`
- Writer prompt: `ai-content-scraper/src/newsletter/prompts/writer.prompt.md`
- CLI preview: `ai-content-scraper/src/scripts/newsletter-preview.ts`
- CLI send: `ai-content-scraper/src/scripts/newsletter-send.ts`
- Send log: `ai-content-scraper/src/newsletter/send-log.ts`
- Client digest utility: `ai-content-client/src/server/utils/digest.ts`
- Client digest types: `ai-content-client/src/types/digest.ts`
- Client digest feed plan: [plans/feat-rss-digest-newsletter.md](plans/feat-rss-digest-newsletter.md)
- Styling audit learnings: [docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md](docs/solutions/ui-bugs/styling-audit-legacy-cleanup-patterns.md) -- SSR safety patterns, CSS naming conventions (applicable to any new component rendering)

### External References

- [LinkedIn post best practices](https://www.linkedin.com/pulse/linkedin-post-best-practices-2026/) -- optimal post length, hashtag count, formatting
- [Resend API documentation](https://resend.com/docs) -- broadcast and audience management
- [Resend API rate limits](https://resend.com/docs/api-reference/rate-limit) -- 2 req/sec hard limit
- [LinkedIn Post Character Limit Guide (2026)](https://redactai.io/blog/linkedin-post-character-limit) -- 3,000 char limit, first 140 chars visible
- [Best LinkedIn Post Length for Engagement (2026)](https://connectsafely.ai/articles/ideal-linkedin-post-length-engagement-guide-2026) -- 1,300-1,900 chars optimal
- [LinkedIn Hashtags Guide (2026)](https://www.mediamister.com/blog/linkedin-hashtags/) -- 3-5 hashtags best practice
- [Email Cadence Best Practices (2026)](https://www.mailerlite.com/blog/email-cadence-and-frequency-best-practices) -- frequency optimization
- [Zod Documentation](https://zod.dev/api) -- discriminatedUnion, safeParse, optional, default
- [Fault Tolerance in LLM Pipelines](https://latitude.so/blog/fault-tolerance-llm-pipelines-techniques) -- circuit breaker, graceful degradation
- [Building Reliable LLM Pipelines](https://ilovedevops.substack.com/p/building-reliable-llm-pipelines-error) -- error handling patterns

## Open Questions for Implementer

1. **Brand name decision (blocking for Phase 3):** What should the newsletter be called? Current default is "AI Content Digest". Options from AIC-23: "The AI Brief", "AI Signal", "Curated AI", or a custom name. This affects the LinkedIn teaser CTA copy and email from-name. (see origin: "Newsletter name deferred" in Key Decisions)

2. **Newsletter signup URL for LinkedIn CTA:** What URL should the LinkedIn teaser link to? Options: (a) a dedicated landing page (out of scope per origin), (b) the client site root URL, (c) a Resend-hosted signup form. Recommendation: use the client site root URL as a placeholder and update when a signup page exists.

3. **Non-send-day behavior:** Should the pipeline hard-exit on non-send days, or just warn? Recommendation: warn and exit with code 0 by default; add `--force` flag to override. This prevents cron jobs on non-send days from logging errors.

4. **LinkedIn teaser model:** Should the teaser use the same model as the newsletter writer (`writerModel`), or a separate configurable model? Using the same model keeps config simple; a separate model allows cost optimization (teaser is a simpler task). Recommendation: use `writerModel` initially, add `teaserModel` config later if needed.

5. **Edition content spillover:** If Monday's window has 15 items but `editionMaxFeatured=3` and `editionMaxQuickLinks=8`, what happens to the remaining 4 items? Options: (a) they are triaged as "skip" and lost, (b) they carry over to Wednesday's edition, (c) they appear in the next weekly cycle. Recommendation: option (a) -- the triage agent already handles prioritization, and items below the threshold are genuinely lower priority. Carrying over adds state management complexity.

### New Open Questions (from deepening)

6. **Timezone configuration:** Should `NEWSLETTER_TIMEZONE` be added now or deferred? The cadence window calculation depends on day-of-week, which is timezone-sensitive. Recommendation: add it now with a sensible default (e.g., `America/New_York`) to prevent subtle bugs when the server runs in UTC.

7. **Content drought handling:** When an edition day has fewer items than `editionMinItems`, should the pipeline (a) skip the edition silently, (b) skip with a warning email to the operator, or (c) send a shorter-than-usual edition? Recommendation: option (b) -- skip with a CLI warning log and an optional Slack/email notification hook.

8. **LinkedIn teaser regeneration:** Should operators be able to regenerate just the LinkedIn teaser from an existing draft without re-running the full pipeline? The current `--from-draft` flow could add a `--regenerate-teaser` flag. Low priority but worth considering in the type design.

---

*Plan generated: 2026-03-19*
*Plan deepened: 2026-03-19*

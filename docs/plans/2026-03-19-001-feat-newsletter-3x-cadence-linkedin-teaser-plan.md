---
title: "feat: Newsletter 3x/week cadence + LinkedIn teaser generation"
type: feat
status: active
date: 2026-03-19
origin: docs/brainstorms/2026-03-19-ai-curated-newsletter-requirements.md
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

#### Phase 4: Client Digest Feed Alignment (Client)

**Goal:** Ensure the RSS digest feed in the client repo aligns with the new 3x/week cadence, if the RSS-based distribution is maintained alongside Resend.

**Tasks:**

- [ ] Evaluate whether `digest.xml` should change from 3-day periods to match the Mon/Wed/Fri schedule
  - Current: fixed 3-day periods from epoch (e.g., Jan 1-3, Jan 4-6)
  - Option A: Keep as-is (the RSS feed serves a different purpose than the newsletter)
  - Option B: Switch to day-of-week alignment (Mon-Tue, Wed-Thu, Fri-Sun)
  - **Recommendation:** Keep as-is. The RSS digest is a Mailchimp integration layer; the newsletter via Resend is the primary distribution. No client code changes needed.
- [ ] If changes are needed, update `digestPeriodDays` and period calculation logic in `src/server/utils/digest.ts`
- [ ] Update `src/types/digest.ts` if the period model changes

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
    -> sendLog.recordEntry()      -- UNCHANGED
  -> sendNewsletter() (if not dry-run)
    -> createEmailSender()        -- UNCHANGED
    -> sendLog.recordEntry()      -- UNCHANGED
```

### Error Propagation

- LinkedIn teaser LLM failure should NOT block the newsletter pipeline. The teaser is wrapped in try/catch with a warning log. The draft is saved without the teaser field.
- Cadence config validation failures should fail fast at startup (Zod parse in `loadNewsletterConfig()`).
- Invalid `sendDays` values (e.g., `[0,0,0]` or empty) are caught by Zod schema validation.

### State Lifecycle Risks

- The send log records all newsletter editions. The cadence change means more entries per week (3 vs 1). The log file grows faster but this is JSON and sizes are negligible.
- Content deduplication via `getSentContentIds()` remains correct -- content included in any edition (regardless of cadence) is excluded from future editions.
- **Risk:** If the pipeline runs on a non-send day (e.g., Tuesday), the cadence-aware window may gather too little or too much content. Mitigation: the pipeline should warn and exit gracefully if today is not a configured send day, unless `--force` is passed.

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

### External References

- [LinkedIn post best practices](https://www.linkedin.com/pulse/linkedin-post-best-practices-2026/) -- optimal post length, hashtag count, formatting
- [Resend API documentation](https://resend.com/docs) -- broadcast and audience management

## Open Questions for Implementer

1. **Brand name decision (blocking for Phase 3):** What should the newsletter be called? Current default is "AI Content Digest". Options from AIC-23: "The AI Brief", "AI Signal", "Curated AI", or a custom name. This affects the LinkedIn teaser CTA copy and email from-name. (see origin: "Newsletter name deferred" in Key Decisions)

2. **Newsletter signup URL for LinkedIn CTA:** What URL should the LinkedIn teaser link to? Options: (a) a dedicated landing page (out of scope per origin), (b) the client site root URL, (c) a Resend-hosted signup form. Recommendation: use the client site root URL as a placeholder and update when a signup page exists.

3. **Non-send-day behavior:** Should the pipeline hard-exit on non-send days, or just warn? Recommendation: warn and exit with code 0 by default; add `--force` flag to override. This prevents cron jobs on non-send days from logging errors.

4. **LinkedIn teaser model:** Should the teaser use the same model as the newsletter writer (`writerModel`), or a separate configurable model? Using the same model keeps config simple; a separate model allows cost optimization (teaser is a simpler task). Recommendation: use `writerModel` initially, add `teaserModel` config later if needed.

5. **Edition content spillover:** If Monday's window has 15 items but `editionMaxFeatured=3` and `editionMaxQuickLinks=8`, what happens to the remaining 4 items? Options: (a) they are triaged as "skip" and lost, (b) they carry over to Wednesday's edition, (c) they appear in the next weekly cycle. Recommendation: option (a) -- the triage agent already handles prioritization, and items below the threshold are genuinely lower priority. Carrying over adds state management complexity.

---

*Plan generated: 2026-03-19*

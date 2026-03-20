---
status: pending
priority: p1
issue_id: "001"
tags: [code-review, security, architecture]
dependencies: []
---

# Resend API: Missing audience_id Means Contacts Cannot Receive Broadcasts

## Problem Statement

The subscribe endpoint (`src/server/api/subscribe.post.ts`) creates contacts via `POST /contacts` with only `{ email, unsubscribed: false }`. While the Resend global contacts API accepts this, contacts created without an `audience_id` are **not assigned to any audience**. The scraper's newsletter broadcast pipeline likely sends to a specific audience, meaning subscribers added through this form will never receive newsletters.

This is a silent data loss issue: the form reports success, the contact exists in Resend, but the contact is unreachable by broadcasts.

## Findings

- **File:** `src/server/api/subscribe.post.ts` line ~30
- **Evidence:** The API call body is `{ email, unsubscribed: false }` with no `audience_id`
- **Resend docs:** Creating a contact via `POST /contacts` without `audience_id` creates a global contact not associated with any audience. Broadcasts target audiences, not global contacts.
- **Impact:** Every subscriber who signs up will believe they are subscribed but will never receive a newsletter email.

## Proposed Solutions

### Option A: Add audience_id to the API call (Recommended)
- Add `RESEND_AUDIENCE_ID` to runtimeConfig and `.env.example`
- Include `audience_id` in the request body to Resend
- **Pros:** Simple fix, contacts immediately available for broadcasts
- **Cons:** Requires knowing the audience ID from Resend dashboard
- **Effort:** Small
- **Risk:** Low

### Option B: Use Resend SDK instead of raw fetch
- Install `resend` npm package and use `resend.contacts.create({ audienceId, email })`
- **Pros:** Type-safe, handles API changes
- **Cons:** Adds a dependency
- **Effort:** Small
- **Risk:** Low

## Recommended Action

<!-- Fill during triage -->

## Technical Details

- **Affected files:** `src/server/api/subscribe.post.ts`, `.env.example`, `src/nuxt.config.ts`
- **Components:** Subscribe API endpoint, Resend integration
- **Database changes:** None

## Acceptance Criteria

- [ ] Subscribe endpoint includes `audience_id` in Resend API call
- [ ] `RESEND_AUDIENCE_ID` is documented in `.env.example`
- [ ] `resendAudienceId` added to `runtimeConfig` in `nuxt.config.ts`
- [ ] Test: submitting signup form results in contact appearing in the correct Resend audience

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #10 code review | Resend global contacts ≠ audience members |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/10
- Resend Create Contact docs: https://resend.com/docs/api-reference/contacts/create-contact

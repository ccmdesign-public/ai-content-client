---
title: "Newsletter Subscribe Endpoint Hardening: 7 Code Review Fixes"
category: integration-issues
date: 2026-03-19
tags:
  - resend-api
  - rate-limiting
  - email-validation
  - nuxt-prerender
  - zod-schema
  - tailwind
  - code-review
components:
  - src/server/api/subscribe.post.ts
  - src/components/content/NewsletterSignupForm.vue
  - src/pages/issues/[id].vue
  - src/nuxt.config.ts
  - content.config.ts
severity: high
resolution_time: single-session
---

# Newsletter Subscribe Endpoint Hardening

## Problem

PR #10 introduced a newsletter signup form with a Resend API integration that had 7 issues identified during code review, ranging from a P1 silent data loss bug to P3 code quality concerns. The issues spanned security, data integrity, performance, build reliability, and schema validation.

## Root Cause

The implementation followed a "get it working" approach without hardening for production. The Resend API was called without an `audience_id` (creating unreachable contacts), email validation was too loose, no rate limiting existed, build errors were globally suppressed, a query fetched all records instead of filtering server-side, a Tailwind built-in utility was redefined in scoped styles, and Zod schema validation was weaker than specified in the plan.

## Solution

### 1. Resend audience_id (P1 -- silent data loss)

Contacts created via `POST /contacts` without an `audience_id` exist in Resend but cannot receive broadcasts. The fix switches to the audience-scoped endpoint:

```typescript
// Before: contacts unreachable by broadcasts
await $fetch('https://api.resend.com/contacts', { ... })

// After: contacts added to the correct audience
await $fetch(`https://api.resend.com/audiences/${config.resendAudienceId}/contacts`, { ... })
```

`RESEND_AUDIENCE_ID` was added to `runtimeConfig` and `.env.example`.

### 2. Server-side rate limiting (P2 -- abuse protection)

Added an in-memory IP-based rate limiter (3 requests/minute/IP) using Nitro's `getRequestIP()`. On serverless (Netlify), this provides per-instance burst protection -- sufficient for the threat model of a newsletter signup form.

```typescript
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}
```

### 3. Email validation tightened (P2 -- data quality)

Both client and server now use `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` instead of `/.+@.+\..+/`. The old regex accepted `@a.b`, strings with spaces, and other clearly invalid formats.

### 4. failOnError restored (P2 -- build reliability)

Changed `failOnError: false` back to `failOnError: true` in the Nitro prerender config. The original suppression was a workaround for emoji-in-slug errors that should be fixed at the source, not masked globally.

### 5. Targeted query replaces fetch-all (P2 -- performance)

The issue detail page fallback replaced `queryCollection('newsletters').all()` + client-side `.find()` with `queryCollection('newsletters').where('publishedAt', '=', issueId).first()`. This avoids loading all newsletter content into memory when a path lookup misses.

### 6. Scoped sr-only removed (P3 -- code hygiene)

Tailwind CSS already provides a built-in `sr-only` utility class. The scoped CSS definition in `[id].vue` was redundant and would lead to duplication across components.

### 7. Zod .url() validation added (P3 -- schema correctness)

Changed `url: z.string()` to `url: z.string().url()` for `featuredPicks` and `quickLinks` in the newsletter content schema. This catches malformed URLs at build time rather than deploying broken links.

## Prevention

- **API integration checklist**: When integrating with any contact/audience API, verify that created records are actually reachable by the intended delivery mechanism (broadcasts, campaigns, etc.). Test the full round-trip, not just the creation step.
- **Public endpoint hardening**: Any public-facing form endpoint should have rate limiting from day one. Honeypots help with bots but do not protect against targeted abuse.
- **Schema parity with plan**: When a plan document specifies validation (e.g., `.url()`), the implementation review should verify the validation was carried through. Add a "schema matches plan" check to code review checklists.
- **Never suppress build errors globally**: If specific routes have known prerender issues, exclude those routes specifically rather than setting `failOnError: false`.

## Related

- PR: https://github.com/ccmdesign/ai-content-client/pull/10
- Resend Create Contact docs: https://resend.com/docs/api-reference/contacts/create-contact

---
status: resolved
priority: p2
issue_id: "002"
tags: [code-review, security, performance]
dependencies: []
---

# Subscribe Endpoint Has No Server-Side Rate Limiting

## Problem Statement

The `/api/subscribe` endpoint relies solely on Resend's upstream 429 response for rate limiting. There is no application-level rate limiting to prevent abuse (e.g., a bot hammering the endpoint with thousands of emails to exhaust Resend API quota or inflate the contact list with junk entries).

The honeypot helps with automated bots, but targeted abuse scripts can easily skip the honeypot field.

## Findings

- **File:** `src/server/api/subscribe.post.ts`
- **Evidence:** No IP-based or session-based rate limiting; the only protection is the honeypot field and Resend's own 429 responses
- **Impact:** Resend API quota exhaustion, junk contacts in the audience, potential cost implications

## Proposed Solutions

### Option A: Add basic in-memory rate limiter (Recommended)
- Use a simple Map-based rate limiter keyed by IP address (e.g., 3 requests per minute per IP)
- Netlify functions are stateless, so this provides per-invocation-instance protection only -- still useful for burst protection
- **Effort:** Small
- **Risk:** Low

### Option B: Use Netlify Edge Functions with rate limiting
- Leverage Netlify's built-in rate limiting features at the edge
- **Effort:** Medium
- **Risk:** Low

### Option C: Add CSRF token validation
- Generate a CSRF token on page load, validate on submit
- **Effort:** Medium
- **Risk:** Low

## Recommended Action

<!-- Fill during triage -->

## Technical Details

- **Affected files:** `src/server/api/subscribe.post.ts`

## Acceptance Criteria

- [ ] Subscribe endpoint rejects excessive requests from the same source
- [ ] Abuse attempts do not exhaust Resend API quota

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #10 code review | Public-facing form endpoints need rate limiting |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/10

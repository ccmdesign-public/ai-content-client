---
status: pending
priority: p2
issue_id: "003"
tags: [code-review, security, quality]
dependencies: []
---

# Email Validation Regex Is Too Permissive

## Problem Statement

Both the client-side (`NewsletterSignupForm.vue`) and server-side (`subscribe.post.ts`) use the regex `/.+@.+\..+/` for email validation. This accepts clearly invalid emails like `@a.b`, `foo@.bar.com`, or strings with spaces and special characters. While perfect email validation via regex is notoriously difficult, the current pattern is unusually loose.

## Findings

- **Files:** `src/components/content/NewsletterSignupForm.vue` line ~23, `src/server/api/subscribe.post.ts` line ~14
- **Evidence:** Regex `/.+@.+\..+/` matches `"  @a.b"`, `"foo bar@baz.com"`, etc.
- **Impact:** Junk data in Resend contacts, wasted API calls, poor user feedback on typos

## Proposed Solutions

### Option A: Use a stricter but simple regex (Recommended)
- Use `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` which rejects spaces and requires non-empty local/domain parts
- **Effort:** Small
- **Risk:** Low

### Option B: Use the HTML5 email input's built-in validation
- The `<input type="email">` already validates; rely on it client-side and use a stricter server check
- **Effort:** Small
- **Risk:** Low

## Recommended Action

<!-- Fill during triage -->

## Technical Details

- **Affected files:** `src/components/content/NewsletterSignupForm.vue`, `src/server/api/subscribe.post.ts`

## Acceptance Criteria

- [ ] Server-side email validation rejects emails with spaces, missing local part, or missing domain
- [ ] Client-side validation matches server-side behavior

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #10 code review | |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/10

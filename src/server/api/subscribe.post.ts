// Simple in-memory rate limiter (per-instance; provides burst protection)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 3 // max requests per window per IP

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

export default defineEventHandler(async (event) => {
  // Rate limit by IP address
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please try again in a moment.' })
  }

  const body = await readBody<{ email?: string; company?: string }>(event)

  // Honeypot check -- bots fill hidden fields, humans don't
  const honeypot = (body?.company || '').trim()
  if (honeypot) {
    // Silently accept to avoid revealing the trap
    return { ok: true }
  }

  const email = (body?.email || '').trim()

  // Validate email format (reject spaces, require non-empty local/domain parts)
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid email address' })
  }

  const config = useRuntimeConfig()
  if (!config.resendApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Email service not configured' })
  }

  if (!config.resendAudienceId) {
    throw createError({ statusCode: 500, statusMessage: 'Email service not configured' })
  }

  // Add contact to Resend audience so they can receive broadcasts
  try {
    await $fetch(`https://api.resend.com/audiences/${config.resendAudienceId}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: { email, unsubscribed: false },
    })
  } catch (err: any) {
    // Handle Resend API errors gracefully
    const status = err?.response?.status || err?.statusCode || 500
    if (status === 429) {
      throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please try again in a moment.' })
    }
    throw createError({ statusCode: 500, statusMessage: 'Unable to subscribe. Please try again later.' })
  }

  return { ok: true }
})

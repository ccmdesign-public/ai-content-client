export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; company?: string }>(event)

  // Honeypot check -- bots fill hidden fields, humans don't
  const honeypot = (body?.company || '').trim()
  if (honeypot) {
    // Silently accept to avoid revealing the trap
    return { ok: true }
  }

  const email = (body?.email || '').trim()

  // Validate email format
  if (!email || !/.+@.+\..+/.test(email)) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid email address' })
  }

  const config = useRuntimeConfig()
  if (!config.resendApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Email service not configured' })
  }

  // Add contact to Resend (global contacts endpoint -- no audience_id needed)
  try {
    await $fetch('https://api.resend.com/contacts', {
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

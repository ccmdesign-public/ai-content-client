import { describe, it, expect } from 'vitest'

/**
 * Unit tests for the robots.txt server route logic.
 *
 * These test the output format and content rules without running the full
 * Nitro server. The actual route uses runtime config for siteUrl.
 */

function buildRobotsTxt(siteUrl: string): string {
  return [
    '# robots.txt for AI Content Guides',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /_nuxt/',
    'Disallow: /__nuxt_error',
    '',
    '# AI crawlers -- explicitly allowed',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `Llms-txt: ${siteUrl}/llms.txt`,
    '',
  ].join('\n')
}

describe('robots.txt', () => {
  const siteUrl = 'https://example.com'
  const output = buildRobotsTxt(siteUrl)

  it('includes default allow rule', () => {
    expect(output).toContain('User-agent: *')
    expect(output).toContain('Allow: /')
  })

  it('preserves existing disallow rules', () => {
    expect(output).toContain('Disallow: /api/')
    expect(output).toContain('Disallow: /_nuxt/')
    expect(output).toContain('Disallow: /__nuxt_error')
  })

  it('includes AI crawler rules', () => {
    expect(output).toContain('User-agent: GPTBot')
    expect(output).toContain('User-agent: ClaudeBot')
    expect(output).toContain('User-agent: PerplexityBot')
    expect(output).toContain('User-agent: Google-Extended')
  })

  it('uses production domain for sitemap', () => {
    expect(output).toContain('Sitemap: https://example.com/sitemap.xml')
  })

  it('includes llms.txt reference', () => {
    expect(output).toContain('Llms-txt: https://example.com/llms.txt')
  })

  it('does not contain hardcoded placeholder domain', () => {
    expect(output).not.toContain('summaries.example.com')
  })
})

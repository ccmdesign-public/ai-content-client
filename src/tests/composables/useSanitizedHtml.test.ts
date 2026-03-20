import { describe, it, expect } from 'vitest'
import { useSanitizedHtml } from '~/composables/useSanitizedHtml'

describe('useSanitizedHtml', () => {
  const { sanitize, sanitizeMarkdown } = useSanitizedHtml()

  describe('sanitize', () => {
    it('strips script tags', () => {
      const result = sanitize('<p>Hello</p><script>alert("xss")</script>')
      expect(result).not.toContain('<script>')
      expect(result).toContain('<p>Hello</p>')
    })

    it('strips event handler attributes', () => {
      const result = sanitize('<img onerror="alert(1)" src="x">')
      expect(result).not.toContain('onerror')
    })

    it('strips iframe tags', () => {
      const result = sanitize('<iframe src="https://evil.com"></iframe>')
      expect(result).not.toContain('<iframe')
    })

    it('strips style tags', () => {
      const result = sanitize('<style>body { display: none }</style><p>text</p>')
      expect(result).not.toContain('<style')
      expect(result).toContain('<p>text</p>')
    })

    it('strips form and input tags', () => {
      const result = sanitize('<form action="/steal"><input type="text"></form>')
      expect(result).not.toContain('<form')
      expect(result).not.toContain('<input')
    })

    it('allows safe HTML tags', () => {
      const result = sanitize('<p><strong>Bold</strong> and <em>italic</em></p>')
      expect(result).toContain('<strong>Bold</strong>')
      expect(result).toContain('<em>italic</em>')
    })

    it('allows links with safe attributes', () => {
      const result = sanitize('<a href="https://example.com">Link</a>')
      expect(result).toContain('href="https://example.com"')
      expect(result).toContain('target="_blank"')
      expect(result).toContain('rel="noopener noreferrer"')
    })

    it('forces noopener noreferrer on links', () => {
      const result = sanitize('<a href="https://evil.com" target="_blank">Click</a>')
      expect(result).toContain('rel="noopener noreferrer"')
    })

    it('handles null/undefined input gracefully', () => {
      expect(sanitize('')).toBe('')
      // @ts-expect-error -- testing runtime safety
      expect(sanitize(undefined)).toBe('')
      // @ts-expect-error -- testing runtime safety
      expect(sanitize(null)).toBe('')
    })

    it('strips data URI in src attributes', () => {
      const result = sanitize('<img src="data:text/html,<script>alert(1)</script>">')
      expect(result).not.toContain('data:text/html')
    })

    it('strips javascript: URI in href attributes', () => {
      const result = sanitize('<a href="javascript:alert(1)">Click</a>')
      expect(result).not.toContain('javascript:')
      expect(result).toContain('Click')
    })

    it('strips SVG-based XSS vectors', () => {
      const result = sanitize('<svg onload="alert(1)"><circle r="10"/></svg>')
      expect(result).not.toContain('onload')
      expect(result).not.toContain('<svg')
    })
  })

  describe('sanitizeMarkdown', () => {
    it('renders markdown and sanitizes output', () => {
      const result = sanitizeMarkdown('**bold** and *italic*')
      expect(result).toContain('<strong>bold</strong>')
      expect(result).toContain('<em>italic</em>')
    })

    it('strips script injection in markdown', () => {
      const result = sanitizeMarkdown('Hello <script>alert("xss")</script> world')
      expect(result).not.toContain('<script>')
      expect(result).toContain('Hello')
      expect(result).toContain('world')
    })

    it('handles empty/undefined markdown input', () => {
      expect(sanitizeMarkdown('')).toBe('')
      // @ts-expect-error -- testing runtime safety
      expect(sanitizeMarkdown(undefined)).toBe('')
    })

    it('renders markdown lists correctly', () => {
      const result = sanitizeMarkdown('- item 1\n- item 2')
      expect(result).toContain('<ul>')
      expect(result).toContain('<li>')
    })

    it('sanitizes links in markdown', () => {
      const result = sanitizeMarkdown('[Click here](https://example.com)')
      expect(result).toContain('href="https://example.com"')
      expect(result).toContain('rel="noopener noreferrer"')
    })
  })
})

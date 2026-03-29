import { describe, it, expect } from 'vitest'
import { formatStars, getGitHubUrl } from '../../utils/formatStars'

describe('formatStars', () => {
  it('returns raw number for counts under 1000', () => {
    expect(formatStars(0)).toBe('0')
    expect(formatStars(1)).toBe('1')
    expect(formatStars(999)).toBe('999')
  })

  it('formats thousands with k suffix', () => {
    expect(formatStars(1000)).toBe('1.0k')
    expect(formatStars(1500)).toBe('1.5k')
    expect(formatStars(42300)).toBe('42.3k')
    expect(formatStars(999999)).toBe('1000.0k')
  })

  it('formats millions with M suffix', () => {
    expect(formatStars(1000000)).toBe('1.0M')
    expect(formatStars(2500000)).toBe('2.5M')
  })
})

describe('getGitHubUrl', () => {
  it('builds a full GitHub URL from repo path', () => {
    expect(getGitHubUrl('owner/repo')).toBe('https://github.com/owner/repo')
    expect(getGitHubUrl('anthropics/claude-code')).toBe('https://github.com/anthropics/claude-code')
  })
})

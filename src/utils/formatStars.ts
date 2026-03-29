/**
 * Format large numbers with K/M suffix (e.g., 1500 -> "1.5k", 2000000 -> "2.0M")
 */
export function formatStars(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

/**
 * Build a GitHub URL from a repo path (e.g., "owner/repo" -> "https://github.com/owner/repo")
 */
export function getGitHubUrl(repo: string): string {
  return `https://github.com/${repo}`
}

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parse as parseYaml } from 'yaml'
import type { ToolsYaml, ToolWithStars } from '~/types/tools'

/**
 * Server route that loads tools.yml and enriches with GitHub stars.
 * Prerendered at build time via Nitro static preset.
 */
export default defineEventHandler(async (event) => {
  // Read tools.yml from content directory
  const toolsPath = resolve(process.cwd(), 'src/content/tools.yml')
  const toolsYaml = readFileSync(toolsPath, 'utf-8')
  const { tools: toolsMap } = parseYaml(toolsYaml) as ToolsYaml

  // Convert to array and sort by video count (most mentioned first)
  const toolsArray: ToolWithStars[] = Object.values(toolsMap)
    .sort((a, b) => b.stats.videoCount - a.stats.videoCount)

  // Get GitHub token from environment (GITHUB_PAT or GITHUB_TOKEN)
  const githubToken = process.env.GITHUB_PAT || process.env.GITHUB_TOKEN

  if (githubToken) {
    // Fetch GitHub stars for tools with repos
    const toolsWithRepos = toolsArray.filter(t => t.github?.repo)
    console.log(`Fetching GitHub stars for ${toolsWithRepos.length} tools...`)

    // Batch requests to avoid rate limiting (10 concurrent)
    const batchSize = 10
    for (let i = 0; i < toolsWithRepos.length; i += batchSize) {
      const batch = toolsWithRepos.slice(i, i + batchSize)

      await Promise.all(batch.map(async (tool) => {
        if (!tool.github?.repo) return

        try {
          const response = await fetch(
            `https://api.github.com/repos/${tool.github.repo}`,
            {
              headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'youtube-summaries-client'
              }
            }
          )

          if (response.ok) {
            const data = await response.json()
            tool.stars = data.stargazers_count
          } else if (response.status === 404) {
            // Repo not found - might be private or deleted
            console.warn(`GitHub repo not found: ${tool.github.repo}`)
          } else {
            console.warn(`GitHub API error for ${tool.github.repo}: ${response.status}`)
          }
        } catch (error) {
          // Silently fail - stars are not critical
          console.warn(`Failed to fetch stars for ${tool.github.repo}:`, error)
        }
      }))

      // Small delay between batches to be nice to GitHub API
      if (i + batchSize < toolsWithRepos.length) {
        await new Promise(r => setTimeout(r, 100))
      }
    }
  } else {
    console.log('GITHUB_PAT/GITHUB_TOKEN not set - skipping stars fetch')
  }

  // Set cache headers
  setHeader(event, 'Content-Type', 'application/json')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return toolsArray
})

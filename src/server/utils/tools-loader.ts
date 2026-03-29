import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import type { Tool, ToolsYaml } from '~/types/tools'

let cachedTools: Tool[] | null = null

/**
 * Async loader for tools.yml with module-level caching.
 *
 * Replaces synchronous readFileSync usage in ISR server routes
 * (guides.md, guides/[slug].md, llms.txt) so the event loop is
 * not blocked on cache-miss requests.
 */
export async function loadTools(): Promise<Tool[]> {
  if (cachedTools) return cachedTools
  const toolsPath = resolve(process.cwd(), 'src/content/tools.yml')
  const toolsYaml = await readFile(toolsPath, 'utf-8')
  const { tools: toolsMap } = parseYaml(toolsYaml) as ToolsYaml
  cachedTools = Object.values(toolsMap)
    .sort((a, b) => b.stats.videoCount - a.stats.videoCount)
  return cachedTools
}

/**
 * Async loader that returns the raw tools map (keyed by tool ID).
 * Used by routes that need map-based lookups (e.g., guides/[slug].md).
 */
let cachedToolsMap: ToolsYaml['tools'] | null = null

export async function loadToolsMap(): Promise<ToolsYaml['tools']> {
  if (cachedToolsMap) return cachedToolsMap
  const toolsPath = resolve(process.cwd(), 'src/content/tools.yml')
  const toolsYaml = await readFile(toolsPath, 'utf-8')
  const { tools: toolsMap } = parseYaml(toolsYaml) as ToolsYaml
  cachedToolsMap = toolsMap
  return cachedToolsMap
}

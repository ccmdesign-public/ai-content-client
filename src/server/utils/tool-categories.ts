/**
 * Tool categorization for server-side routes (llms.txt, guides.md).
 *
 * Mirrors the logic in `src/utils/categorizeTools.ts` but exported as a
 * simple function for use in Nitro server routes (which cannot import from
 * the client-side utils directory).
 */

export type ToolCategory =
  | 'AI & ML'
  | 'Developer Tools'
  | 'Frameworks'
  | 'Cloud & DevOps'
  | 'Design'
  | 'Productivity'
  | 'Other'

const TOOL_CATEGORIES: Record<string, ToolCategory> = {
  // AI & ML
  'claude code': 'AI & ML',
  'claude': 'AI & ML',
  'model context protocol': 'AI & ML',
  'mcp': 'AI & ML',
  'dspy': 'AI & ML',
  'baml': 'AI & ML',
  'whisper': 'AI & ML',
  'openai': 'AI & ML',
  'anthropic': 'AI & ML',
  'gemini': 'AI & ML',
  'cursor': 'AI & ML',
  'copilot': 'AI & ML',
  'chatgpt': 'AI & ML',
  'gpt-4': 'AI & ML',
  'llm': 'AI & ML',
  'langchain': 'AI & ML',
  'llamaindex': 'AI & ML',
  'ollama': 'AI & ML',
  'hugging face': 'AI & ML',
  'stable diffusion': 'AI & ML',
  'midjourney': 'AI & ML',

  // Developer Tools
  'git': 'Developer Tools',
  'github': 'Developer Tools',
  'gitlab': 'Developer Tools',
  'vscode': 'Developer Tools',
  'visual studio code': 'Developer Tools',
  'neovim': 'Developer Tools',
  'vim': 'Developer Tools',
  'terminal': 'Developer Tools',
  'mprocs': 'Developer Tools',
  'zsh': 'Developer Tools',
  'bash': 'Developer Tools',
  'npm': 'Developer Tools',
  'yarn': 'Developer Tools',
  'pnpm': 'Developer Tools',
  'homebrew': 'Developer Tools',
  'postman': 'Developer Tools',
  'insomnia': 'Developer Tools',

  // Frameworks
  'react': 'Frameworks',
  'vue': 'Frameworks',
  'nuxt': 'Frameworks',
  'next.js': 'Frameworks',
  'nextjs': 'Frameworks',
  'svelte': 'Frameworks',
  'angular': 'Frameworks',
  'tailwind css': 'Frameworks',
  'tailwindcss': 'Frameworks',
  'shadcn ui': 'Frameworks',
  'shadcn/ui': 'Frameworks',
  'flask': 'Frameworks',
  'django': 'Frameworks',
  'fastapi': 'Frameworks',
  'express': 'Frameworks',
  'node.js': 'Frameworks',
  'nodejs': 'Frameworks',
  'ruby on rails': 'Frameworks',
  'rails': 'Frameworks',
  'laravel': 'Frameworks',
  'spring': 'Frameworks',

  // Cloud & DevOps
  'docker': 'Cloud & DevOps',
  'kubernetes': 'Cloud & DevOps',
  'k8s': 'Cloud & DevOps',
  'aws': 'Cloud & DevOps',
  'amazon web services': 'Cloud & DevOps',
  'gcp': 'Cloud & DevOps',
  'google cloud': 'Cloud & DevOps',
  'azure': 'Cloud & DevOps',
  'vercel': 'Cloud & DevOps',
  'netlify': 'Cloud & DevOps',
  'cloudflare': 'Cloud & DevOps',
  'terraform': 'Cloud & DevOps',
  'ansible': 'Cloud & DevOps',
  'jenkins': 'Cloud & DevOps',
  'github actions': 'Cloud & DevOps',
  'circleci': 'Cloud & DevOps',

  // Design
  'figma': 'Design',
  'sketch': 'Design',
  'adobe xd': 'Design',
  'photoshop': 'Design',
  'illustrator': 'Design',
  'canva': 'Design',
  'framer': 'Design',

  // Productivity
  'notion': 'Productivity',
  'slack': 'Productivity',
  'obsidian': 'Productivity',
  'linear': 'Productivity',
  'jira': 'Productivity',
  'trello': 'Productivity',
  'asana': 'Productivity',
  'todoist': 'Productivity',
  'roam research': 'Productivity',
  'logseq': 'Productivity',
}

/** Display order for categories */
export const CATEGORY_ORDER: ToolCategory[] = [
  'AI & ML',
  'Developer Tools',
  'Frameworks',
  'Cloud & DevOps',
  'Design',
  'Productivity',
  'Other',
]

/**
 * Categorize a tool by its name. Returns the category string.
 * Falls back to 'Other' for unknown tools.
 */
export function categorizeTool(name: string): ToolCategory {
  return TOOL_CATEGORIES[name.toLowerCase()] || 'Other'
}

import type { Ref } from 'vue'

/**
 * Composable for copying the agent section markdown to clipboard.
 * Uses the rawAgentMarkdown frontmatter field populated during guide generation.
 */
export function useGuideCopyMarkdown(rawAgentMarkdown: Ref<string | undefined>) {
  const copied = ref(false)

  async function copy() {
    if (!import.meta.client || !rawAgentMarkdown.value) return
    try {
      await navigator.clipboard.writeText(rawAgentMarkdown.value)
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return { agentMarkdown: rawAgentMarkdown, copied, copy }
}

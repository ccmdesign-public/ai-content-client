<script setup lang="ts">
import type { Guide } from '~/types/guides'

const props = defineProps<{
  guide: Guide & { body: { children: Array<Record<string, unknown>> } }
}>()

/**
 * Filter the guide AST to only include content before the agent section heading.
 * This prevents the agent section from rendering twice (once here via markdown,
 * once via the structured GuideAgentSection component).
 */
const humanOnlyGuide = computed(() => {
  if (!props.guide?.body?.children) return props.guide

  const agentHeadingIndex = props.guide.body.children.findIndex(
    (node: Record<string, unknown>) =>
      node.tag === 'h2'
      && Array.isArray(node.children)
      && node.children.some(
        (child: Record<string, unknown>) =>
          typeof child.value === 'string'
          && child.value.toLowerCase().includes('what your agent needs to know'),
      ),
  )

  if (agentHeadingIndex === -1) return props.guide

  return {
    ...props.guide,
    body: {
      ...props.guide.body,
      children: props.guide.body.children.slice(0, agentHeadingIndex),
    },
  }
})
</script>

<template>
  <div>
    <ContentRenderer :value="humanOnlyGuide" class="prose prose-zinc dark:prose-invert max-w-none" />
  </div>
</template>

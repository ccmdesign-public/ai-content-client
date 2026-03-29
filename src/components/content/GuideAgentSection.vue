<script setup lang="ts">
import type { GuideAgentResource } from '~/types/guides'
import { AlertTriangle } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'

defineProps<{
  agentResources: GuideAgentResource[]
  agentResourceGaps: string[]
  rawAgentMarkdown?: string
}>()

/**
 * Get a human-readable label for a resource type
 */
function resourceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'mcp-server': 'MCP Server',
    'cli': 'CLI Tool',
    'skill-folder': 'Skill Folder',
    'repo': 'Repository',
    'config-example': 'Config Example',
    'primer-prompt': 'Primer Prompt',
  }
  return labels[type] || type
}
</script>

<template>
  <div class="space-y-6">
    <!-- Empty state -->
    <p v-if="!agentResources.length && !agentResourceGaps.length && !rawAgentMarkdown" class="text-sm text-muted-foreground">
      No agent resources have been cataloged for this tool yet.
    </p>

    <!-- Copy button -->
    <div v-if="rawAgentMarkdown" class="flex justify-end">
      <GuideCopyButton :text="rawAgentMarkdown" />
    </div>

    <!-- Agent resources -->
    <div v-if="agentResources.length" class="space-y-4">
      <div
        v-for="resource in agentResources"
        :key="`${resource.type}-${resource.name}`"
        class="p-4 border rounded-lg bg-muted/50"
      >
        <div class="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{{ resourceTypeLabel(resource.type) }}</Badge>
          <span class="font-medium text-sm">{{ resource.name }}</span>
          <span v-if="resource.source" class="text-xs text-muted-foreground">
            via {{ resource.source }}
          </span>
        </div>

        <!-- Install command -->
        <div v-if="resource.installCommand" class="mt-2">
          <pre class="text-sm bg-secondary border rounded p-3 overflow-x-auto"><code>{{ resource.installCommand }}</code></pre>
        </div>

        <!-- Content (primer prompts, config snippets) -->
        <div v-if="resource.content" class="mt-2">
          <pre class="text-sm bg-secondary border rounded p-3 overflow-x-auto whitespace-pre-wrap"><code>{{ resource.content }}</code></pre>
        </div>

        <!-- External link -->
        <a
          v-if="resource.url"
          :href="resource.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${resource.name} documentation (opens in new tab)`"
          class="inline-block mt-2 text-sm text-primary hover:underline"
        >
          View documentation
        </a>
      </div>
    </div>

    <!-- Resource gaps -->
    <div v-if="agentResourceGaps.length" class="p-4 border border-yellow-500/30 rounded-lg bg-yellow-500/5">
      <div class="flex items-start gap-2">
        <AlertTriangle class="size-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" aria-hidden="true" />
        <div>
          <p class="font-medium text-sm text-yellow-700 dark:text-yellow-300 mb-1">Resource gaps</p>
          <ul class="text-sm text-muted-foreground space-y-1">
            <li v-for="gap in agentResourceGaps" :key="gap">{{ gap }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

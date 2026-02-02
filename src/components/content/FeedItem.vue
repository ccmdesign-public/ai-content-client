<script setup lang="ts">
defineProps<{
  item: Record<string, unknown>
}>()

function isArticle(item: Record<string, unknown>): boolean {
  return 'publicationName' in item && 'publishedAt' in item
}

function isSummary(item: Record<string, unknown>): boolean {
  return 'metadata' in item && 'processedAt' in item
}
</script>

<template>
  <ArticleCard v-if="isArticle(item)" :article="item as any" />
  <SummaryCard v-else-if="isSummary(item)" :summary="item as any" />
</template>

<script setup lang="ts">
import type { FeedItemType } from '~/types/content'
import { isArticle, isSummary } from '~/types/content'

defineProps<{
  item: FeedItemType
}>()
</script>

<template>
  <ArticleCard v-if="isArticle(item)" :article="item" />
  <SummaryCard v-else-if="isSummary(item)" :summary="item" />
</template>

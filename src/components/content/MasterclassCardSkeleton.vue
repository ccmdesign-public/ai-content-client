<script setup lang="ts">
import { Card, CardHeader, CardContent } from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between">
        <Skeleton class="h-5 w-32" />
        <Skeleton class="h-5 w-16 rounded-full" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton class="h-4 w-full mb-1" />
      <Skeleton class="h-4 w-3/4 mb-3" />
      <div class="flex gap-3">
        <Skeleton class="h-3 w-20" />
        <Skeleton class="h-3 w-16" />
      </div>
    </CardContent>
  </Card>
</template>

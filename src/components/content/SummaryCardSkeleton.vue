<template>
  <!-- Mimics SummaryCard layout: thumbnail + text block -->
  <div class="flex border-t border-border gap-4 py-4 max-md:flex-col">
    <Skeleton class="max-w-60 shrink-0 aspect-video rounded-md max-md:max-w-full" />
    <div class="flex-1 min-w-0 space-y-2">
      <Skeleton class="h-4 w-1/3" />
      <Skeleton class="h-5 w-3/4" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-2/3" />
    </div>
  </div>
</template>

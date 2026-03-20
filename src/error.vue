<script setup lang="ts">
import type { NuxtError } from '#app'
import { SearchX, AlertTriangle, Home } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

defineProps<{
  error: NuxtError
}>()

const handleClear = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="grid place-items-center min-h-screen p-7 text-center bg-background">
    <div class="max-w-[40ch]">
      <div class="mb-5">
        <SearchX v-if="error.statusCode === 404" class="size-16 text-muted-foreground mx-auto" aria-hidden="true" />
        <AlertTriangle v-else class="size-16 text-muted-foreground mx-auto" aria-hidden="true" />
      </div>

      <h1 class="text-2xl font-bold mb-3.5 text-foreground">
        {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
      </h1>

      <p class="text-base mb-5 text-muted-foreground leading-relaxed">
        {{ error.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : 'We encountered an unexpected error. Please try again.'
        }}
      </p>

      <p v-if="error.statusCode !== 404 && error.message" class="text-sm mb-7 text-muted-foreground font-mono bg-accent p-3.5 rounded-md break-words">
        {{ error.message }}
      </p>

      <Button @click="handleClear">
        <Home class="size-5 mr-1.5" aria-hidden="true" />
        Back to home
      </Button>
    </div>
  </div>
</template>

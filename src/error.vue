<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const handleClear = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <div class="error-page__icon">
        <span class="material-symbols-outlined">
          {{ error.statusCode === 404 ? 'search_off' : 'error_outline' }}
        </span>
      </div>

      <h1 class="error-page__title">{{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}</h1>

      <p class="error-page__message">
        {{ error.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : 'We encountered an unexpected error. Please try again.'
        }}
      </p>

      <p v-if="error.statusCode !== 404 && error.message" class="error-page__details">
        {{ error.message }}
      </p>

      <button class="error-page__button" @click="handleClear">
        <span class="material-symbols-outlined">home</span>
        Back to home
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 1.75rem;
  text-align: center;
  background: var(--background);
}

.error-page__content {
  max-width: 40ch;
}

.error-page__icon {
  margin-bottom: 1.3125rem;
}

.error-page__icon .material-symbols-outlined {
  font-size: 4rem;
  color: var(--muted-foreground);
}

.error-page__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.875rem;
  color: var(--foreground);
}

.error-page__message {
  font-size: 1rem;
  margin-bottom: 1.3125rem;
  color: var(--muted-foreground);
  line-height: 1.6;
}

.error-page__details {
  font-size: 0.875rem;
  margin-bottom: 1.75rem;
  color: var(--muted-foreground);
  font-family: monospace;
  background: var(--accent);
  padding: 0.875rem;
  border-radius: 6px;
  word-break: break-word;
}

.error-page__button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.875rem 1.3125rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.error-page__button:hover {
  background: var(--primary);
}

.error-page__button:active {
  transform: scale(0.98);
}

.error-page__button .material-symbols-outlined {
  font-size: 1.25rem;
}
</style>

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
  padding: var(--space-l, 1.5rem);
  text-align: center;
  background: var(--color-surface, #fff);
}

.error-page__content {
  max-width: 40ch;
}

.error-page__icon {
  margin-bottom: var(--space-m, 1rem);
}

.error-page__icon .material-symbols-outlined {
  font-size: 4rem;
  color: var(--muted-foreground);
}

.error-page__title {
  font-size: var(--size-3, 1.75rem);
  font-weight: 700;
  margin-bottom: var(--space-s, 0.75rem);
  color: var(--foreground);
}

.error-page__message {
  font-size: var(--size-0, 1rem);
  margin-bottom: var(--space-m, 1rem);
  color: var(--muted-foreground);
  line-height: 1.6;
}

.error-page__details {
  font-size: var(--size--1, 0.875rem);
  margin-bottom: var(--space-l, 1.5rem);
  color: var(--muted-foreground);
  font-family: monospace;
  background: var(--accent);
  padding: var(--space-s, 0.75rem);
  border-radius: 6px;
  word-break: break-word;
}

.error-page__button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs, 0.25rem);
  padding: var(--space-s, 0.75rem) var(--space-m, 1rem);
  background: var(--color-primary, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: var(--size-0, 1rem);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.error-page__button:hover {
  background: var(--color-primary-shade-10, #1d4ed8);
}

.error-page__button:active {
  transform: scale(0.98);
}

.error-page__button .material-symbols-outlined {
  font-size: 1.25rem;
}
</style>

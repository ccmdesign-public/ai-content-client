<script setup lang="ts">
definePageMeta({
  hero: false,
  footer: false
})
</script>

<template>
  <div class="home-placeholder">
    <p>Homepage coming soon.</p>
    <NuxtLink to="/summaries/">Browse all summaries</NuxtLink>
  </div>
</template>

<style scoped>
.home-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.75rem;
  text-align: center;
  min-height: 50vh;
}

.home-placeholder p {
  font-size: 1.125rem;
  color: var(--muted-foreground);
  margin-bottom: 1.3125rem;
}

.home-placeholder a {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.875rem 1.3125rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.home-placeholder a:hover {
  opacity: 0.9;
}
</style>

<script setup lang="ts">
// This page exists behind a 302 redirect (see nuxt.config.ts routeRules).
// The redirect sends all traffic to /summaries/. This minimal page is kept
// so Nuxt has a valid route component for "/" until AIC-28 claims this route
// with a real homepage.
definePageMeta({
  hero: false,
  footer: false
})
</script>

<template>
  <!-- Redirect target: /summaries/ (see nuxt.config.ts routeRules) -->
  <div />
</template>

<template>
  <div class="layout">
    <ccm-hero
      v-if="hero"
      class="layout-hero"
      :brow="hero.brow"
      :title="hero.title"
      :tagline="hero.tagline"
      :background-color="hero.backgroundColor"
      :size="hero.size || 'l'"
      :hideTop="hero.hideTop === true"
    />
    <div class="layout-body">
      <SidebarNav v-if="showSidebar" class="layout-sidebar" />
      <main class="layout-main">
        <div class="layout-main__wrapper">
          <slot />
        </div>
      </main>
    </div>
    <ccm-footer v-if="footer" class="layout-footer" />
    <MobileNav v-if="showSidebar" />
  </div>
</template>

<script setup>
import { useSearch } from '~/composables/useSearch'

const route = useRoute()
const heroState = useState('hero', () => null)
const hero = computed(() => route.meta.hero || heroState.value)
const footer = computed(() => route.meta.footer ?? true)
const showSidebar = computed(() => route.meta.sidebar ?? true)

// Provide search composable to all pages via provide/inject
const search = useSearch()
provide('search', search)
</script>

<style>
.layout {
  min-height: 100svh;
  display: grid;
  grid-template: "hero" auto "body" 1fr "footer" auto / 1fr;
}

.layout-hero {
  grid-area: hero;
  background-color: #eee;
}

.layout-body {
  grid-area: body;
  display: flex;
  min-height: 0;
}

.layout-sidebar {
  flex-shrink: 0;
}

.layout-main {
  flex: 1;
  overflow-y: auto;
  min-width: 0;
}

.layout-main__wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.layout-footer {
  grid-area: footer;
  background-color: #eee;
}

@media (max-width: 768px) {
  .layout-sidebar {
    display: none;
  }
}
</style>
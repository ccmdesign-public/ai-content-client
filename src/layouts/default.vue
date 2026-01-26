<template>
  <div class="min-h-svh flex flex-col">
    <!-- Hero Header -->
    <header
      v-if="hero"
      role="banner"
      class="bg-secondary flex flex-col shrink-0"
      :class="heroSizeClasses"
    >
      <!-- Top Navigation -->
      <div class="w-full max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between py-3">
          <h1 class="text-lg font-bold">
            <NuxtLink to="/" class="text-foreground hover:text-primary no-underline">
              YouTube Summaries
            </NuxtLink>
          </h1>
          <nav role="navigation" class="hidden md:block">
            <ul class="flex items-center gap-4">
              <li><NuxtLink to="/" class="text-muted-foreground hover:text-foreground hover:underline">Home</NuxtLink></li>
              <li><NuxtLink to="/tools" class="text-muted-foreground hover:text-foreground hover:underline">Tools</NuxtLink></li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Main Hero Content -->
      <div class="w-full max-w-6xl mx-auto px-4 py-8 flex-1 flex items-center">
        <hgroup class="text-balance">
          <p v-if="hero.brow" class="text-sm uppercase tracking-wide text-muted-foreground mb-2">{{ hero.brow }}</p>
          <h1 v-if="hero.title" class="text-3xl md:text-4xl font-bold text-foreground">{{ hero.title }}</h1>
          <p v-if="hero.tagline" class="text-lg text-muted-foreground mt-2">{{ hero.tagline }}</p>
        </hgroup>
      </div>
    </header>

    <!-- Main Body -->
    <div class="flex flex-1 min-h-0">
      <SidebarNav v-if="showSidebar" class="shrink-0 hidden md:block" />
      <main class="flex-1 overflow-y-auto min-w-0">
        <div class="max-w-5xl mx-auto w-full px-4 py-6">
          <slot />
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer v-if="footer" role="contentinfo" class="bg-secondary py-6 shrink-0">
      <div class="max-w-6xl mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>&copy; {{ new Date().getFullYear() }} YouTube Summaries</span>
        <a href="#" class="hover:text-foreground hover:underline">Built with Nuxt</a>
      </div>
    </footer>

    <!-- Mobile Navigation -->
    <MobileNav v-if="showSidebar" />
  </div>
</template>

<script setup>
const route = useRoute()
const heroState = useState('hero', () => null)
const hero = computed(() => route.meta.hero || heroState.value)
const footer = computed(() => route.meta.footer ?? true)
const showSidebar = computed(() => route.meta.sidebar ?? true)

const heroSizeClasses = computed(() => {
  const size = hero.value?.size || 'l'
  const sizeMap = {
    s: 'min-h-32',
    m: 'min-h-48',
    l: 'min-h-64',
    xl: 'min-h-80'
  }
  return sizeMap[size] || sizeMap.l
})
</script>

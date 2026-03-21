<template>
  <SidebarProvider :open="sidebarOpen" @update:open="sidebarOpen = $event">
    <AppSidebar />
    <SidebarInset>
      <!-- Header -->
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <BreadcrumbWithSchema :items="breadcrumbItems" />
        <div class="ml-auto flex items-center gap-2">
          <SearchBar
            v-model="searchQuery"
            :is-ready="isSearchReady"
            @expand="search?.init()"
          />
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto min-w-0">
        <div class="max-w-5xl mx-auto w-full px-4 py-6">
          <slot />
        </div>
      </main>

      <!-- Footer -->
      <footer v-if="showFooter" role="contentinfo" class="border-t py-4 px-4 shrink-0">
        <div class="max-w-5xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>&copy; {{ new Date().getFullYear() }} YouTube Summaries</span>
          <span>Built with Nuxt</span>
        </div>
      </footer>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import { useSearch } from '~/composables/useSearch'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

const route = useRoute()

const showFooter = computed(() => route.meta.footer ?? true)

// Build breadcrumb items from the current route path
const breadcrumbItems = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  if (segments.length === 0) return [{ label: 'Home', to: '/' }]

  const items = [{ label: 'Home', to: '/' }]
  let path = ''
  for (const segment of segments) {
    path += `/${segment}`
    const label = segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
    items.push({ label, to: path })
  }
  return items
})

// Controlled sidebar: react to route meta changes
const sidebarOpen = ref(true)
watch(() => route.meta.sidebar, (val) => {
  if (val === false) sidebarOpen.value = false
  else sidebarOpen.value = true
}, { immediate: true })

// Provide search composable to all pages via provide/inject
const search = useSearch()
provide('search', search)

// Search integration for header
const searchQuery = computed({
  get: () => search?.query.value ?? '',
  set: (val) => { if (search) search.query.value = val },
})
const isSearchReady = computed(() => search?.isReady.value ?? false)

</script>

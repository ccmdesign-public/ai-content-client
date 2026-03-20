<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

interface BreadcrumbItemData {
  label: string
  to?: string | RouteLocationRaw
  href?: string
  ariaLabel?: string
}

interface Props {
  items: BreadcrumbItemData[]
  ariaLabel?: string
  includeJsonLd?: boolean
  baseUrl?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Breadcrumbs',
  includeJsonLd: true,
  baseUrl: null
})

const absoluteUrl = (item: BreadcrumbItemData): string | undefined => {
  const raw = typeof item.href === 'string' ? item.href : typeof item.to === 'string' ? item.to : undefined
  if (!raw) return undefined
  if (/^https?:\/\//.test(raw)) return raw
  if (props.baseUrl) {
    try {
      const base = props.baseUrl.endsWith('/') ? props.baseUrl.slice(0, -1) : props.baseUrl
      const path = raw.startsWith('/') ? raw : `/${raw}`
      return `${base}${path}`
    } catch {
      return raw
    }
  }
  return raw
}

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: props.items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.label,
    item: absoluteUrl(item)
  }))
}))

useHead(() => ({
  script: props.includeJsonLd
    ? [
        {
          key: 'breadcrumb-jsonld',
          type: 'application/ld+json',
          children: JSON.stringify(jsonLd.value)
        }
      ]
    : []
}))
</script>

<template>
  <Breadcrumb :aria-label="ariaLabel">
    <BreadcrumbList>
      <template v-for="(item, index) in items" :key="index">
        <BreadcrumbItem>
          <template v-if="index < items.length - 1">
            <BreadcrumbLink as-child>
              <NuxtLink :to="item.to || item.href || '#'" :aria-label="item.ariaLabel">
                {{ item.label }}
              </NuxtLink>
            </BreadcrumbLink>
          </template>
          <BreadcrumbPage v-else>
            {{ item.label }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < items.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

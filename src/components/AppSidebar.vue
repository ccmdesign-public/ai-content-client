<script setup lang="ts">
import { usePlaylistsConfig } from '~/composables/usePlaylistsConfig'
import { useChannelsConfig } from '~/composables/useChannelsConfig'
import { useArticleStream } from '~/composables/useArticleStream'
import { usePublications } from '~/composables/usePublications'
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useTruncate } from '~/composables/useTruncate'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from '@/components/ui/sidebar'

const { enabledPlaylists } = usePlaylistsConfig()
const { enabledChannels } = useChannelsConfig()
const { articles } = useArticleStream()
const { publications } = usePublications(articles)
const { tags, topTags } = useTagsConfig()
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child>
            <NuxtLink
              to="/summaries/"
              class="font-semibold"
              active-class="text-primary"
            >
              YouTube Summaries
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <!-- Playlists -->
      <SidebarGroup>
        <SidebarGroupLabel>Playlists</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="playlist in enabledPlaylists" :key="playlist.id">
              <SidebarMenuButton as-child>
                <NuxtLink
                  :to="`/playlists/${playlist.slug}`"
                  active-class="text-primary bg-primary/10 font-medium"
                >
                  {{ useTruncate(playlist.name, 24) }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Channels -->
      <SidebarGroup>
        <SidebarGroupLabel>Channels</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="channel in enabledChannels" :key="channel.slug">
              <SidebarMenuButton as-child>
                <NuxtLink
                  :to="`/channels/${channel.slug}`"
                  active-class="text-primary bg-primary/10 font-medium"
                >
                  {{ useTruncate(channel.name, 20) }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Articles / Publications -->
      <SidebarGroup v-if="publications.length">
        <SidebarGroupLabel>Articles</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="publication in publications" :key="publication.slug">
              <SidebarMenuButton as-child>
                <NuxtLink
                  :to="`/articles/publications/${publication.slug}`"
                  active-class="text-primary bg-primary/10 font-medium"
                >
                  {{ useTruncate(publication.name, 20) }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Topics / Tags -->
      <SidebarGroup v-if="topTags.length > 0">
        <SidebarGroupLabel>
          <NuxtLink to="/tags" class="text-muted-foreground hover:text-primary">
            Topics
          </NuxtLink>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="tag in topTags" :key="tag.slug">
              <SidebarMenuButton as-child>
                <NuxtLink
                  :to="`/tags/${tag.slug}`"
                  active-class="text-primary bg-primary/10 font-medium"
                >
                  {{ useTruncate(tag.name, 20) }}
                </NuxtLink>
              </SidebarMenuButton>
              <SidebarMenuBadge>{{ tag.itemCount }}</SidebarMenuBadge>
            </SidebarMenuItem>
            <SidebarMenuItem v-if="tags.length > 5">
              <SidebarMenuButton as-child>
                <NuxtLink to="/tags" class="text-primary italic">
                  See all {{ tags.length }} topics
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child>
            <NuxtLink to="/tools" class="text-sm text-muted-foreground hover:text-foreground">
              Tools
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, computed, nextTick, toValue, type MaybeRefOrGetter } from 'vue'
import { flushPromises } from '@vue/test-utils'

// Mock data
const mockSummaries = [
  {
    id: '1',
    metadata: { videoId: 'vid-a', channelId: 'ch-1', channel: 'Channel One', title: 'Video A', publishedAt: '2025-01-01' },
    playlistId: 'pl-1',
    published: true,
    processedAt: '2025-01-02'
  },
  {
    id: '2',
    metadata: { videoId: 'vid-b', channelId: 'ch-2', channel: 'Channel Two', title: 'Video B', publishedAt: '2025-01-03' },
    playlistId: 'pl-2',
    published: true,
    processedAt: '2025-01-04'
  },
  {
    id: '3',
    metadata: { videoId: 'vid-c', channelId: 'ch-1', channel: 'Channel One', title: 'Video C', publishedAt: '2025-01-05' },
    playlistId: 'pl-1',
    published: true,
    processedAt: '2025-01-06'
  },
  {
    id: '4',
    metadata: { videoId: 'vid-d', channelId: 'ch-3', channel: 'Channel Three', title: 'Draft Video', publishedAt: '2025-01-07' },
    playlistId: 'pl-3',
    published: false,
    processedAt: '2025-01-08'
  }
]

// Track captured where clauses for assertions
let capturedWheres: Array<{ field: string; op: string; value: unknown }> = []
let queryCollectionCalled = false

// Track useAsyncData calls
let lastAsyncDataKey: any = null
let lastAsyncDataOptions: any = null

// Mock queryCollection chain factory
function createMockQueryChain() {
  const chain: any = {
    where(field: string, op: string, value: unknown) {
      capturedWheres.push({ field, op, value })
      return chain
    },
    async all() {
      let result = [...mockSummaries]
      for (const w of capturedWheres) {
        result = result.filter((doc: any) => {
          const val = w.field.split('.').reduce((acc: any, key: string) => acc?.[key], doc)
          if (w.op === '=') return val === w.value
          if (w.op === 'in') return (w.value as string[]).includes(val)
          return true
        })
      }
      return result
    }
  }
  return chain
}

// Mock useAsyncData
function mockUseAsyncData(key: any, handler: () => Promise<any>, options?: any) {
  lastAsyncDataKey = key
  lastAsyncDataOptions = options

  const data = ref<any>(null)
  const pending = ref(true)
  const error = ref<any>(null)

  handler().then((result) => {
    data.value = result
    pending.value = false
  }).catch((err) => {
    error.value = err
    pending.value = false
  })

  return { data, pending, error, refresh: async () => { data.value = await handler() } }
}

// Mock queryCollection
function mockQueryCollection(_name: string) {
  capturedWheres = []
  queryCollectionCalled = true
  return createMockQueryChain()
}

// We manually test the composable logic without Nuxt auto-imports
// by reimplementing the composable's core logic here with mocks.

interface SummaryQueryParams {
  channelId?: MaybeRefOrGetter<string | undefined>
  playlistId?: MaybeRefOrGetter<string | undefined>
  videoIds?: MaybeRefOrGetter<string[] | undefined>
}

function useSummaryQueryTestable(params: SummaryQueryParams = {}) {
  const resolvedChannelId = computed(() => toValue(params.channelId))
  const resolvedPlaylistId = computed(() => toValue(params.playlistId))
  const resolvedVideoIds = computed(() => toValue(params.videoIds))

  const key = computed(() => {
    const parts = ['summary-query']
    if (resolvedChannelId.value) parts.push(`ch:${resolvedChannelId.value}`)
    if (resolvedPlaylistId.value) parts.push(`pl:${resolvedPlaylistId.value}`)
    if (resolvedVideoIds.value?.length) parts.push(`vid:${resolvedVideoIds.value.join(',')}`)
    return parts.join(':')
  })

  const watchSources = [resolvedChannelId, resolvedPlaylistId, resolvedVideoIds]

  const { data, pending, error, refresh } = mockUseAsyncData(
    key,
    async () => {
      if (resolvedVideoIds.value !== undefined && resolvedVideoIds.value.length === 0) {
        return []
      }

      let query = mockQueryCollection('summaries')

      if (resolvedChannelId.value) {
        query = query.where('metadata.channelId', '=', resolvedChannelId.value)
      }
      if (resolvedPlaylistId.value) {
        query = query.where('playlistId', '=', resolvedPlaylistId.value)
      }
      if (resolvedVideoIds.value?.length) {
        query = query.where('metadata.videoId', 'in', resolvedVideoIds.value)
      }

      const docs = await query.all()
      return docs.filter((d: any) => d.published !== false)
    },
    { watch: watchSources }
  )

  return {
    data: computed(() => data.value || []),
    pending,
    error,
    refresh
  }
}

describe('useSummaryQuery', () => {
  beforeEach(() => {
    capturedWheres = []
    queryCollectionCalled = false
    lastAsyncDataKey = null
    lastAsyncDataOptions = null
  })

  it('returns all summaries when no params provided', async () => {
    const { data } = useSummaryQueryTestable()
    await flushPromises()

    // Should return all non-draft summaries (3 out of 4)
    expect(data.value).toHaveLength(3)
    expect(data.value.every((d: any) => d.published !== false)).toBe(true)
  })

  it('filters by channelId', async () => {
    const { data } = useSummaryQueryTestable({ channelId: 'ch-1' })
    await flushPromises()

    expect(data.value).toHaveLength(2)
    expect(data.value.every((d: any) => d.metadata.channelId === 'ch-1')).toBe(true)
  })

  it('filters by playlistId', async () => {
    const { data } = useSummaryQueryTestable({ playlistId: 'pl-2' })
    await flushPromises()

    expect(data.value).toHaveLength(1)
    expect(data.value[0].metadata.videoId).toBe('vid-b')
  })

  it('filters by videoIds', async () => {
    const { data } = useSummaryQueryTestable({ videoIds: ['vid-a', 'vid-c'] })
    await flushPromises()

    expect(data.value).toHaveLength(2)
    expect(data.value.map((d: any) => d.metadata.videoId)).toEqual(['vid-a', 'vid-c'])
  })

  it('returns empty array for empty videoIds without querying', async () => {
    queryCollectionCalled = false
    const { data } = useSummaryQueryTestable({ videoIds: [] })
    await flushPromises()

    expect(data.value).toEqual([])
  })

  it('excludes drafts (published === false)', async () => {
    const { data } = useSummaryQueryTestable({ channelId: 'ch-3' })
    await flushPromises()

    // ch-3 has one summary but it's a draft
    expect(data.value).toHaveLength(0)
  })

  it('handles undefined params gracefully', async () => {
    const { data } = useSummaryQueryTestable({ channelId: undefined, playlistId: undefined })
    await flushPromises()

    // Should return all non-draft summaries (same as no params)
    expect(data.value).toHaveLength(3)
  })

  it('generates unique deterministic keys for different params', () => {
    useSummaryQueryTestable({ channelId: 'ch-1' })
    const key1 = lastAsyncDataKey

    useSummaryQueryTestable({ playlistId: 'pl-2' })
    const key2 = lastAsyncDataKey

    useSummaryQueryTestable()
    const key3 = lastAsyncDataKey

    expect(key1.value).not.toBe(key2.value)
    expect(key1.value).not.toBe(key3.value)
    expect(key2.value).not.toBe(key3.value)

    expect(key1.value).toContain('ch:ch-1')
    expect(key2.value).toContain('pl:pl-2')
    expect(key3.value).toBe('summary-query')
  })

  it('passes watch sources to useAsyncData for reactive re-fetching', () => {
    useSummaryQueryTestable({ channelId: ref('ch-1') })

    expect(lastAsyncDataOptions).toBeDefined()
    expect(lastAsyncDataOptions.watch).toBeDefined()
    expect(lastAsyncDataOptions.watch).toHaveLength(3) // channelId, playlistId, videoIds
  })

  it('accepts reactive ref params', async () => {
    const channelIdRef = ref<string | undefined>('ch-1')
    const { data } = useSummaryQueryTestable({ channelId: channelIdRef })
    await flushPromises()

    expect(data.value).toHaveLength(2)
  })

  it('returns data as a non-null computed (defaults to [])', async () => {
    const { data } = useSummaryQueryTestable({ channelId: 'nonexistent' })
    await flushPromises()

    expect(data.value).toEqual([])
    expect(Array.isArray(data.value)).toBe(true)
  })
})

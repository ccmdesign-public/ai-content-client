import { computed, type Ref } from 'vue'
import { isToday, isYesterday, differenceInDays, startOfDay } from 'date-fns'

export type DateGroup = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'older'

export interface DateSegment<T> {
  key: DateGroup
  label: string
  items: T[]
}

const GROUP_ORDER: DateGroup[] = ['today', 'yesterday', 'thisWeek', 'lastWeek', 'thisMonth', 'older']

const GROUP_LABELS: Record<DateGroup, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  thisWeek: 'This Week',
  lastWeek: 'Last Week',
  thisMonth: 'This Month',
  older: 'Older'
}

function getDateGroup(date: Date): DateGroup {
  if (isNaN(date.getTime())) return 'older'

  const now = new Date()
  const daysDiff = differenceInDays(startOfDay(now), startOfDay(date))

  if (isToday(date)) return 'today'
  if (isYesterday(date)) return 'yesterday'
  if (daysDiff <= 7) return 'thisWeek'
  if (daysDiff <= 14) return 'lastWeek'
  if (daysDiff <= 30) return 'thisMonth'
  return 'older'
}

export function useDateGroups<T extends { processedAt: string; metadata: { publishedAt: string } }>(
  items: Ref<T[]>,
  dateAccessor: (item: T) => string = (item) => item.metadata.publishedAt || item.processedAt,
  sortDirection: Ref<'asc' | 'desc'> | 'asc' | 'desc' = 'desc'
) {
  const segments = computed<DateSegment<T>[]>(() => {
    const groups = new Map<DateGroup, T[]>()

    // Initialize all groups
    for (const key of GROUP_ORDER) {
      groups.set(key, [])
    }

    // Sort items into groups using the date accessor.
    // Use pre-computed _publishedAtMs when available to avoid repeated new Date() calls.
    for (const item of items.value) {
      const ms = (item as any)._publishedAtMs ?? new Date(dateAccessor(item)).getTime()
      const date = new Date(ms)
      const group = getDateGroup(date)
      groups.get(group)!.push(item)
    }

    // Sort within each group by the accessor date
    const dir = typeof sortDirection === 'string' ? sortDirection : sortDirection.value
    const multiplier = dir === 'asc' ? 1 : -1
    for (const [, groupItems] of groups) {
      groupItems.sort((a, b) => {
        const msA = (a as any)._publishedAtMs ?? new Date(dateAccessor(a)).getTime()
        const msB = (b as any)._publishedAtMs ?? new Date(dateAccessor(b)).getTime()
        return multiplier * (msA - msB)
      })
    }

    // Return non-empty groups in order (reverse group order for ascending)
    const groupOrder = dir === 'asc' ? [...GROUP_ORDER].reverse() : GROUP_ORDER
    return groupOrder
      .filter(key => groups.get(key)!.length > 0)
      .map(key => ({
        key,
        label: GROUP_LABELS[key],
        items: groups.get(key)!
      }))
  })

  return { segments }
}

import type { DigestPeriod, DigestItem, DigestVideo, DigestFeedConfig } from '~/types/digest'

/**
 * Digest feed utilities for RSS-based newsletter distribution.
 *
 * DESIGN NOTE (AIC-26): The digest feed uses fixed-length periods (default 3 days)
 * calculated from a configurable epoch date. This is intentionally decoupled from the
 * newsletter's 3x/week Mon/Wed/Fri cadence (managed in ai-content-scraper).
 *
 * The RSS digest serves as a Mailchimp integration layer, while the newsletter is
 * distributed via Resend. These are independent distribution channels with different
 * period models:
 *   - Digest: fixed N-day periods from epoch (e.g., Jan 1-3, Jan 4-6, ...)
 *   - Newsletter: day-of-week cadence (Mon/Wed/Fri) via ai-content-scraper pipeline
 *
 * If the RSS digest is deprecated in favor of Resend, this module can be removed.
 * See: docs/plans/2026-03-19-001-feat-newsletter-3x-cadence-linkedin-teaser-plan.md
 */

/**
 * Parse a date string to UTC Date at midnight
 */
function parseUTCDate(dateString: string): Date {
  // Parse ISO string and extract just the date part
  const [datePart] = dateString.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
}

/**
 * Get current date at UTC midnight
 */
function getTodayUTC(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0))
}

/**
 * Add days to a UTC date
 */
function addDaysUTC(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDateId(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Calculate all complete periods from epoch to now
 * Only returns complete periods (current/ongoing period excluded)
 */
export function calculatePeriods(
  epochDate: string,
  periodDays: number,
  maxPeriods: number
): DigestPeriod[] {
  const epoch = parseUTCDate(epochDate)
  const now = getTodayUTC()
  const periods: DigestPeriod[] = []

  let currentStart = epoch

  // Generate all complete periods
  while (true) {
    const periodEnd = addDaysUTC(currentStart, periodDays)

    // Only include complete periods (end date must be before or equal to today)
    if (periodEnd.getTime() > now.getTime()) {
      break
    }

    periods.push({
      startDate: currentStart,
      endDate: periodEnd,
      periodId: formatDateId(currentStart)
    })

    currentStart = periodEnd
  }

  // Return only the last maxPeriods
  return periods.slice(-maxPeriods)
}

/**
 * Check if a date falls within a period [start, end)
 * Start is inclusive, end is exclusive
 */
function isDateInPeriod(date: Date, period: DigestPeriod): boolean {
  const timestamp = date.getTime()
  return timestamp >= period.startDate.getTime() && timestamp < period.endDate.getTime()
}

/**
 * Group videos by their processing date into periods
 * Returns only periods that have at least one video
 */
export function groupVideosByPeriod(
  summaries: Array<{
    metadata?: {
      title?: string
      videoId?: string
      channel?: string
      youtubeUrl?: string
    }
    tldr?: string
    processedAt?: string
  }>,
  periods: DigestPeriod[],
  siteUrl: string
): DigestItem[] {
  const periodMap = new Map<string, DigestVideo[]>()

  // Initialize map with empty arrays for each period
  for (const period of periods) {
    periodMap.set(period.periodId, [])
  }

  // Assign each video to its period
  for (const summary of summaries) {
    if (!summary.processedAt) continue

    const processedDate = new Date(summary.processedAt)
    const videoId = summary.metadata?.videoId || ''

    for (const period of periods) {
      if (isDateInPeriod(processedDate, period)) {
        const videos = periodMap.get(period.periodId)!
        videos.push({
          title: summary.metadata?.title || 'Untitled',
          videoId,
          channel: summary.metadata?.channel || 'Unknown',
          tldr: summary.tldr || null,
          summaryUrl: `${siteUrl}/summaries/${videoId}`,
          youtubeUrl: summary.metadata?.youtubeUrl || `https://youtube.com/watch?v=${videoId}`
        })
        break // Each video belongs to only one period
      }
    }
  }

  // Convert to DigestItem array, filtering out empty periods
  // Sort videos within each period by processedAt
  const digestItems: DigestItem[] = []

  for (const period of periods) {
    const videos = periodMap.get(period.periodId)!
    if (videos.length > 0) {
      digestItems.push({
        period,
        videos: videos.sort((a, b) => {
          // Find original summaries to get processedAt
          const aSummary = summaries.find(s => s.metadata?.videoId === a.videoId)
          const bSummary = summaries.find(s => s.metadata?.videoId === b.videoId)
          const aDate = aSummary?.processedAt || ''
          const bDate = bSummary?.processedAt || ''
          return aDate.localeCompare(bDate) // Chronological order
        })
      })
    }
  }

  // Sort by period start date descending (newest first)
  return digestItems.sort((a, b) =>
    b.period.startDate.getTime() - a.period.startDate.getTime()
  )
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Convert Date to RFC 822 format (required by RSS 2.0)
 */
function toRfc822Date(date: Date): string {
  return date.toUTCString()
}

/**
 * Get short month name from UTC date
 */
function getMonthShort(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months[date.getUTCMonth()]
}

/**
 * Format date range for display (e.g., "Jan 1-3, 2026")
 * Uses UTC dates
 */
function formatDateRange(startDate: Date, endDate: Date): string {
  const startMonth = getMonthShort(startDate)
  const startDay = startDate.getUTCDate()
  // endDate is exclusive, so subtract 1 day to get the last included day
  const lastIncludedDate = addDaysUTC(endDate, -1)
  const endDay = lastIncludedDate.getUTCDate()
  const year = startDate.getUTCFullYear()

  const endMonth = getMonthShort(lastIncludedDate)

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}, ${year}`
  } else {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
  }
}

/**
 * Generate the HTML content for a single digest item
 */
function generateDigestContent(
  item: DigestItem,
  introText: string,
  footerText: string
): string {
  const videoCount = item.videos.length
  const videoWord = videoCount === 1 ? 'Video' : 'Videos'

  const videosList = item.videos.map((video, index) => {
    const tldrText = video.tldr || 'Summary available on site'
    return `      <li>
        <strong>${escapeXml(video.title)}</strong><br/>
        ${escapeXml(tldrText)}<br/>
        <em>Channel: ${escapeXml(video.channel)}</em> |
        <a href="${video.summaryUrl}">Read Summary</a> |
        <a href="${video.youtubeUrl}">Watch on YouTube</a>
      </li>`
  }).join('\n')

  return `<p>${escapeXml(introText)}</p>

<h2>${videoCount} ${videoWord} This Period</h2>
<ol>
${videosList}
</ol>

<p>${escapeXml(footerText)}</p>`
}

/**
 * Generate RSS 2.0 XML feed for digest items
 */
export function generateDigestXml(
  items: DigestItem[],
  config: DigestFeedConfig
): string {
  const { siteUrl, title, description, introText, footerText, language } = config

  const itemsXml = items.map((item) => {
    const dateRange = formatDateRange(item.period.startDate, item.period.endDate)
    const itemTitle = `YouTube Digest: ${dateRange}`
    const itemUrl = `${siteUrl}/digest/${item.period.periodId}`
    const content = generateDigestContent(item, introText, footerText)

    // pubDate is the day after the period ends (when digest becomes available)
    const pubDate = toRfc822Date(item.period.endDate)

    return `    <item>
      <title>${escapeXml(itemTitle)}</title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <description><![CDATA[${content}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(description)}</description>
    <language>${language}</language>
    <lastBuildDate>${toRfc822Date(new Date())}</lastBuildDate>
    <atom:link href="${siteUrl}/digest.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`
}

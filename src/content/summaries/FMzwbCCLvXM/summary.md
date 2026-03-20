---
metadata:
  videoId: "FMzwbCCLvXM"
  title: "Why Aren’t People Using My Dashboard? with NICK DESBARATS - SmashingConf New York 2025"
  channel: "Smashing Magazine"
  channelId: "UCSDtqcJ8ZXviPrEcj1vuLiQ"
  duration: "PT48M21S"
  publishedAt: "2026-03-13T16:27:48Z"
  thumbnailUrl: "https://i.ytimg.com/vi/FMzwbCCLvXM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=FMzwbCCLvXM"
processedAt: "2026-03-13T17:12:38.532Z"
source: "youtube"
tldr: "Nick Desbarats argues that dashboards fail because 'dashboard' is a broad, useless term like 'document', and proposes a taxonomy of nine specific dashboard types, with the most common failure being tactical monitoring dashboards that lack effective action indicators, which he solves with his 'action dots' method."
tools: []
categories:
  - "Data & Analytics"
  - "Product & Design"
tags:
  - "analytics"
  - "product-management"
  - "ux"
  - "visualization"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 33333
  outputTokens: 1848
  totalTokens: 35181
  processingTimeMs: 53130
tagsNormalizedAt: "2026-03-13T17:51:18.514Z"
---

## Key Takeaways

Nick Desbarats, an information design consultant, explains why most dashboards are abandoned and offers a new framework for creating effective ones. His key insights include:

*   The term **'dashboard'** is as broad and unhelpful as **'document'**, encompassing everything from live KPI trackers to static infographics, which is why generic 'best practices' fail.

*   He proposes a **dashboard taxonomy** with two main families (**Live Data** and **Static Data**) and nine specific types, each with distinct purposes, audiences, and design rules.

*   A primary reason dashboards die is the **'Swiss Army knife problem'**, where teams try to create one monolithic dashboard for all users and purposes, resulting in a tool that does nothing well.

*   The most critical failure in **tactical monitoring dashboards** (entity, area, role) is the lack of effective **action or sentiment indicators**, forcing users to manually interpret every metric.

*   Common indicator methods like **percentage change vs. previous period** or **deviation from target** are ineffective, creating 'Christmas tree syndrome' (flagging everything) and often giving wrong signals.

*   The solution is **'action dots'**, a method using four user-defined thresholds (crisis, actionably bad, actionably good, best case) to show only metrics requiring attention, saving users significant time and providing clear priority.

## Summary

### The Core Problem: 'Dashboard' is a Useless Term

Nick Desbarats begins by highlighting the dismal reality of dashboard adoption, citing an informal LinkedIn poll suggesting only a 30% chance a dashboard is still used six months after launch. He argues the root cause is that 'dashboard' is an overly broad umbrella term, analogous to 'document'. Just as best practices for writing haiku differ wildly from those for patent applications, a single set of 'dashboard design best practices' is impossible because the term can refer to a live sales KPI tracker, a static UN refugee crisis infographic, a fitness app screen, or a financial what-if simulator.

This terminological vagueness leads to contradictory advice on questions like using filters, fitting everything on one screen, or making designs eye-catching versus subdued. Desbarats' central thesis is that we must stop talking about 'dashboard design' and start talking about best practices for designing specific *types* of dashboards.

### Introducing a Practical Dashboard Taxonomy

After analyzing thousands of dashboards, Desbarats developed a manageable taxonomy of nine types, split into two high-level families.

**Live Data Dashboards** are based on updating data and are for enabling employees and stakeholders to interact with organizational data. They typically have a conservative visual design, limited storytelling (as the data changes), and often include interactivity like filtering. Their primary purpose is to answer **data-related questions**. This family includes:

*   **Tactical Monitoring Dashboards** (Entity, Area, Role): Designed to answer 'Is everything okay, and does anything require my attention?'
*   **Overview Dashboards**: For board members or the public, offering a high-level view.

*   **Strategic Performance Dashboards**: Used in monthly/quarterly planning to assess high-level goal achievement.

*   **Canned Analysis Dashboards**: Custom mini-tools that answer the same analytical question repeatedly for non-analysts.

**Static Data Dashboards** are based on a fixed data snapshot and aim to cause a desired change in the audience's mind. They often involve graphic design, allow for crafted storytelling, and have little to no interactivity. This family includes:

*   **Persuasion Dashboards**: To convince (e.g., to get vaccinated).

*   **Explanation Dashboards**: To explain a concept or process.

*   **Engagement Dashboards**: To attract clicks and shares.

Desbarats advocates for building an **ecosystem or network** of these specific dashboard types, much like a website with many purpose-built pages, rather than attempting a doomed 'one dashboard to rule them all.'

### Deep Dive: Why Tactical Monitoring Dashboards Fail

Using an 'Area Dashboard' for operations as an example, Desbarats zooms in on the most common and critical failure point: the lack of effective action indicators. Most dashboards make the **'deadly assumption'** that users have detailed background knowledge to interpret every number. In reality, 80-90% of dashboards have no sentiment indicators, leaving users to decipher which metrics are good or bad.

The 10-20% that do include indicators typically use flawed methods:

*   **Percentage change vs. previous period**: Creates 'Christmas tree syndrome' by flagging everything. A small change (e.g., website availability dropping 0.9%) can mask a disaster, while a large change might just be noise.

*   **Deviation from target**: Suffers from similar problems.

*   **Deviation from trailing average, single threshold, and good/satisfactory/poor ranges**: All are ineffective.

Desbarats illustrates these flaws with his 'wrong wrong wrong' slide, showing how these methods give incorrect signals (e.g., flagging a terrible employee satisfaction score as 'positive' because it improved slightly from an even worse score). These methods force users into a tedious 30-40 minute daily review to separate signal from noise.

### The Solution: Action Dots

Desbarats' solution is the **'action dots'** method. For each metric, four threshold values are defined through stakeholder input:
1.  **Crisis**: The 'drop everything' priority level.
2.  **Actionably Bad**: The point where we take corrective action.
3.  **Actionably Good**: The point where we take rewarding action.
4.  **Best Case**: A realistically exceptional level.

A colored dot (dark red, light red, light green, dark green) appears only if a metric falls outside the 'actionably bad' to 'actionably good' range. This means most metrics, most of the time, show no dot—accurately reflecting reality. The result is a dashboard where a normal day (mostly no dots) looks visually distinct from a crisis day (many red dots). Users can assess status in seconds by scanning for dots rather than interpreting every number. Desbarats showed a prototype web app implementing this with built-in accessibility features like color-blind modes and responsive design for mobile.

### Q&A Highlights

In the concluding Q&A, Desbarats addressed several practical concerns:

*   **Tools**: He is tool-agnostic but noted that while PowerBI's backend (DAX) is great, its visualization capabilities are 'profoundly broken,' making advanced implementations like action dots challenging.

*   **Mobile vs. Desktop**: Mobile use is primarily for tactical monitoring ('is everything okay?'). His responsive dot-based design works well, as users can quickly scroll looking for dots.

*   **Dashboards vs. Reports**: He distinguishes them by consumption pattern: reports are sequential, dashboards are random-access.

*   **Convincing Stakeholders**: Show side-by-side comparisons of a cluttered 'Swiss Army knife' dashboard versus a clean, purpose-built ecosystem to demonstrate the user experience benefit.

*   **Setting Thresholds**: While manual stakeholder input is best, for large numbers of metrics, he uses simple statistics on historical data to generate intelligent defaults that can be tweaked later.

## Context

Nick Desbarats is an independent information design consultant and educator specializing in practical dashboard design. This talk was delivered at SmashingConf New York 2025, a major web design and development conference. The presentation contributes to the long-standing, industry-wide struggle with low user adoption and satisfaction for data dashboards, a problem persisting since the 1980s 'executive information systems.' The talk is highly relevant as organizations increasingly rely on data-driven decision-making, yet most dashboard projects fail to deliver value. This video is essential for product managers, data analysts, UX/UI designers, developers, and anyone involved in building or commissioning internal business intelligence tools, data visualization platforms, or customer-facing analytics features.
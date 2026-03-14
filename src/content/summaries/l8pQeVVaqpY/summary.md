---
metadata:
  videoId: "l8pQeVVaqpY"
  title: "Open source is dying"
  description: "AI has broken open source in a lot of ways. We need to fix this.


    Thank you Blacksmith for sponsoring! Check them out at: https://soydev.link/blacksmith


    SOURCES

    https://x.com/RhysSullivan/status/2012655238952403149/photo/1

    https://x.com/tldraw/status/2011911073834672138

    https://nodejs.org/en/blog/announcements/hackerone-signal-requirement

    https://x.com/mitchellh/status/2020252149117313349

    https://github.com/mitchellh/vouch

    https://github.com/cheater/articles/blob/master/web_of_trust_and_ecosystem.md

    https://github.com/peakoss/anti-slop


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT40M27S"
  publishedAt: "2026-03-14T00:23:45Z"
  thumbnailUrl: "https://i.ytimg.com/vi/l8pQeVVaqpY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=l8pQeVVaqpY"
processedAt: "2026-03-14T14:21:53.028Z"
source: "youtube"
tldr: "Theo argues that AI-generated code and an influx of inexperienced contributors are creating an existential crisis for open source by overwhelming maintainers with low-quality PRs, degrading community quality, and reducing funding, requiring immediate collective action to prevent systemic collapse."
tools:
  - name: "T3 Code"
    url: null
  - name: "Blacksmith"
    url: "https://soy.link/blacksmith"
  - name: "GitHub"
    url: null
  - name: "GitHub Actions"
    url: null
  - name: "Node.js"
    url: null
  - name: "Tailwind CSS"
    url: null
  - name: "Tailwind UI"
    url: null
  - name: "React"
    url: null
  - name: "TypeScript"
    url: null
  - name: "tRPC"
    url: null
  - name: "Create T3 App"
    url: null
  - name: "Vouch"
    url: null
  - name: "PR Stats"
    url: null
  - name: "Answer Overflow"
    url: null
  - name: "Electron"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Programming"
tags:
  - "ai-coding"
  - "business"
  - "copilot"
  - "engineering"
  - "llm"
  - "open-source"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 32455
  outputTokens: 1739
  totalTokens: 34194
  processingTimeMs: 159572
tagsNormalizedAt: "2026-03-14T14:30:48.331Z"
---

## Key Takeaways

Theo, a developer and content creator, delivers a passionate warning that AI is accelerating open source's decline by overwhelming maintainers and degrading community quality.

## Summary

### Introduction: A Personal Warning from an Open Source Advocate

Theo opens by stating his career and success are built on open source software, making the current trend deeply personal and alarming. He asserts that AI's impact on open source is overwhelmingly negative, moving beyond memes about GitHub's UI to serious systemic issues like projects automatically closing external PRs (e.g., tldraw), increased bug-reporting barriers (e.g., Node.js), and funding crises (e.g., Tailwind). He frames this as a potential extinction-level event for the software industry, which relies on shared foundational components. The core problem is a massive increase in burden on maintainers with a concurrent decrease in the benefits they receive.

### The PR Spam and "Slop" Problem

The first major issue is the deluge of AI-generated, low-quality pull requests. Theo uses his own project, T3 Code, as a case study: it received over 100 PRs per day in its first few days despite stating it was not accepting contributions, leading to 150 open PRs within five days. This "slop" forces maintainers to spend immense time triaging instead of building. More insidiously, merging code you don't fully understand—whether written by an AI agent or an external contributor using one—erodes a maintainer's comprehension of their own codebase. This loss of systemic understanding makes projects harder to control and maintain over time. The fork-to-star ratio for T3 Code exceeded 10%, an unprecedented level of engagement that paradoxically creates a maintenance nightmare.

### The Degradation of Community and User Entitlement

The second major issue is the changing nature of the open source user base. Theo highlights a cultural shift exemplified by a viral Reddit post demanding simple .exe downloads over code. He observes that non-technical users, empowered by AI to build further than ever before, are now flooding maintainers with confusing, technically-worded but substance-lacking questions. This new cohort often exhibits a toxic sense of entitlement and a "god complex," leading to hostile interactions when their contributions are rejected. He shares a personal example of a contributor who spammed tags after receiving no immediate response to a broken PR. This constant negativity degrades the energy of maintainers who often work thanklessly, pushing them closer to burnout—a vulnerability famously exploited in the XZ Utils backdoor incident.

### Platform Failure: GitHub's Inadequate Tools

Theo argues that GitHub, as the central platform, has catastrophically failed to provide the moderation and tooling needed to manage these new challenges. He contrasts this with his experience building Twitch's Mod View dashboard, where a small team created robust, customizable moderation tools. In contrast, GitHub lacks basic features like effective spam detection, bulk deletion, or contributor banning, forcing maintainers to build their own solutions. This platform neglect piles more burden onto volunteers, making the core work of open source maintenance unsustainable.

### Emerging Community-Led Solutions

In response to platform failure, the community is building its own tools. Theo highlights several promising approaches:

*   **PR Stats:** A tool by Ree (Answer Overflow) that shows a contributor's history and merge rate to help gauge trustworthiness, though it can be gamed.

*   **Vouch:** A "community trust management system" by Mitchell Hashimoto (creator of Terraform) that requires contributors to be vouched for by existing trusted members before their PRs are easily visible. Theo implemented this in T3 Code, filtering 150 PRs down to 43 trusted ones, making the workload viable.

*   **Anti-Slop:** A tool designed to automatically scan and close PRs likely to be AI-generated slop, though it may have high operational costs.
Theo cautions that these systems must not completely wall off new, genuine contributors while still filtering noise.

### The Collapse of Open Source Funding Models

The economic incentives for open source have also been eroded by AI. Previously, maintainers could monetize through courses, consulting, or selling UI kits/templates (like Tailwind UI). Now, users can simply screenshot a desired UI and ask an AI to rebuild it, often using the same underlying open source framework (like Tailwind CSS) without paying for the premium product. Furthermore, AI lowers the barrier to creating alternatives, leading to fragmentation instead of contribution. This means the potential upsides of open source—recognition, job opportunities, and funding—are shrinking just as the burdens are skyrocketing.

### A Call to Action: How to Save Open Source

Theo concludes with a multi-pronged call to action for the community:
1.  **Corporate Funding:** Promote and adopt the **Open Source Pledge**, where companies commit to paying a minimum amount per developer per year to open source projects. He praises companies like Convex and Frontend Masters for leading by example with high contributions.
2.  **Community Support:** Experienced developers should help shoulder the burden by performing high-quality triage—clarifying issues, linking duplicate reports, reviewing PRs constructively, and preempting maintainer questions. He highlights contributors like Maria and Bin Bandit as exemplars.
3.  **Human Kindness:** Most importantly, users must be genuinely kind to maintainers. A simple, heartfelt thank-you message for a project that improves your work can be a powerful antidote to burnout. Theo shares that his own career was catalyzed by respectfully reaching out to creators like Fred K. Schott (Astro) and Ryan Carniato (SolidJS). Reminding maintainers why they started—through appreciation, not entitlement—is crucial for their longevity.
The overarching message is that the software industry must collectively act to rebalance the cost-benefit equation for open source maintainers before the entire ecosystem collapses.

## Context

Theo (t3.gg) is a prominent software developer, YouTuber, and creator of the T3 Stack—a popular opinionated toolkit for building full-stack TypeScript applications. He has deep experience as both a consumer and a maintainer of open source software and previously worked on critical platform tools at Twitch. This video contributes to the urgent, ongoing discussion about the sustainability of open source in the age of AI, a topic highlighted by incidents like the XZ Utils backdoor and maintainer burnout across major projects. It's especially relevant now as AI coding assistants become ubiquitous, dramatically lowering the barrier to entry for both contribution and creation. This video is essential for any software developer, open source maintainer, or tech leader who relies on or contributes to the open source ecosystem and wants to understand the systemic threats it faces.
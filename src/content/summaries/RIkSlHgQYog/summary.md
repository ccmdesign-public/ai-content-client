---
metadata:
  videoId: "RIkSlHgQYog"
  title: "I need you guys to trust me on this (sorry Anthropic)"
  description: "T3 Code now supports Claude Code. Only problem is I'm not entirely sure if it'll get you or me or anyone banned... check it out at https://t3.codes


    Thank you Blacksmith for sponsoring! Check them out at: https://soydev.link/blacksmith


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT17M10S"
  publishedAt: "2026-03-24T00:54:30Z"
  thumbnailUrl: "https://i.ytimg.com/vi/RIkSlHgQYog/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=RIkSlHgQYog"
processedAt: "2026-03-24T21:03:15.959Z"
source: "youtube"
tldr: "T3 Code now integrates with Claude Code subscriptions by using Anthropic's official Agent SDK and CLI, providing a free, open-source UI that should avoid user bans unlike other tools that were forced to remove support after legal pressure from Anthropic."
tools:
  - name: "T3 Code"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Anthropic Agent SDK"
    url: null
  - name: "Open Code"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "Blacksmith"
    url: null
  - name: "GitHub Actions"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "claude"
  - "open-source"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 14838
  outputTokens: 979
  totalTokens: 15817
  processingTimeMs: 29794
tagsNormalizedAt: "2026-03-24T22:56:54.201Z"
---

## Key Takeaways

Theo announces T3 Code's integration with Claude Code and explains the technical and legal distinctions that make it viable while criticizing Anthropic's lack of clarity.

*   **T3 Code now supports Claude Code subscriptions** for free using the official Anthropic Agent SDK and CLI, unlike other tools like Open Code which were forced to remove support.

*   The integration is designed to comply with Anthropic's terms by **not offering its own OAuth flow or API key management**, instead calling the local Claude Code CLI.

*   **Anthropic's lack of clear policy** creates uncertainty for developers, as evidenced by their legal pressure on Open Code and failure to answer basic questions from prominent community members.

*   **Massive subsidization by AI labs** (e.g., $5k compute for $200) makes it difficult for independent tools to compete and creates vendor lock-in for users.

## Summary

Theo announces that T3 Code, a free and open-source coding UI, now supports users' existing Claude Code subscriptions. This integration works by using Anthropic's official **Agent SDK** to interface with the local **Claude Code CLI**, requiring users to have the CLI already set up on their machine.

### The Legal Grey Area and Open Code Precedent

This announcement comes amidst controversy, as the open-source tool **Open Code** was recently forced by Anthropic to stop auto-loading the Claude Max plugin. Theo explains that Anthropic sent lawyers instead of engaging with developers, asserting their right to block API requests not coming from their official harness. The key distinction Theo makes is that while Open Code implemented its own authentication harness, T3 Code uses the official SDK and CLI, theoretically staying within Anthropic's stated terms against third-party OAuth flows.

### Anthropic's Unclear Policies and Developer Frustration

A major theme is the profound frustration with **Anthropic's lack of clear communication**. Theo highlights that even prominent figures like **Matt Pocock** have publicly asked for basic policy clarifications—such as whether a subscription token can power the Agent SDK locally—and received only vague, delayed responses. This creates an "uncertain space" that blocks developers from building and releasing tools with confidence. Theo criticizes Anthropic for keeping policies vague, which allows them to change rules at any time.

### The Subsidization Problem and T3 Code's Approach

Theo delves into the business landscape, noting that AI labs like Anthropic are **heavily subsidizing their subscriptions** (e.g., offering $5,000 in monthly compute for a $200 Claude Code sub) to crush competition and create lock-in. This makes it nearly impossible for independent tools to charge users directly. T3 Code's strategy is to provide a unified, better UI that lets users keep accessing these subsidized tokens from various labs. Theo expresses pride in the team's work but offers a strong disclaimer: he cannot guarantee users won't get banned, though he believes their implementation is "clean and fully safe." He even pledges to cover a banned user's subscription for permission to call out Anthropic in a video.

## Context

This video addresses a critical tension in the AI-assisted coding ecosystem: developer freedom versus corporate control. As AI coding tools like Claude Code become essential, their makers (e.g., Anthropic) are restricting how third-party UIs can integrate with paid subscriptions, often using legal threats. This matters to developers who want choice in their tools and to open-source maintainers building alternative interfaces. It reflects a broader trend of AI platform vendors consolidating power by locking users into their official surfaces and SDKs, stifling innovation and competition in the tooling layer.
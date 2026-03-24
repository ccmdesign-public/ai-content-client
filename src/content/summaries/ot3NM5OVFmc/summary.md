---
metadata:
  videoId: "ot3NM5OVFmc"
  title: "Claude Channels Just Dropped, And It Kills OpenClaw (Again)"
  description: "🔥 Join Maker School & get customer #1 guaranteed: https://skool.com/makerschool/about

    📚 Watch my NEW 2026 Claude Code course: https://www.youtube.com/watch?v=QoQBzR1NIqI

    💼 Work with my team: https://dub.sh/work-with-me-pkg


    🎙️ Listen to my silly podcast: www.youtube.com/@stackedpod


    📚 Free multi-hour courses

    → Claude Code (4hr full course): https://www.youtube.com/watch?v=QoQBzR1NIqI

    → Vibe Coding w/ Antigravity (6hr full course): https://www.youtube.com/watch?v=gcuR_-rzlDw

    → Agentic Workflows (6hr full course): https://www.youtube.com/watch?v=MxyRjL7NG18

    → N8N (6hr full course, 890K+ views): https://www.youtube.com/watch?v=2GZ2SNXWK-c


    Summary ⤵️

    Claude just released Claude Channels, meaning the vast majority of OpenClaw functionality is now encapsulated within Claude Code itself. In addition to their Claude dispatch drop a few days ago, this marks an obvious push to take over OpenClaw.\ 


    In this video, I show you what it is, how it works, and how to set it up in 5-10 minutes!


    My software, tools, & deals (some give me kickbacks—thank you!)

    🚀 Instantly: https://link.nicksaraev.com/instantly-short

    📧 Anymailfinder: https://link.nicksaraev.com/amf-short

    🤖 Apify: https://console.apify.com/sign-up (30% off with code 30NICKSARAEV)

    🧑🏽‍💻 n8n: https://n8n.partnerlinks.io/h372ujv8cw80

    📈 Rize: https://link.nicksaraev.com/rize-short (25% off with promo code NICK)


    Follow me on other platforms 😈

    📸 Instagram: https://www.instagram.com/nick_saraev

    🕊️ Twitter/X: https://twitter.com/nicksaraev

    🤙 Blog: https://nicksaraev.com


    Why watch?

    If this is your first view—hi, I’m Nick! TLDR: I spent six years building automated businesses with Make.com (most notably 1SecondCopy, a content company that hit 7 figures). Today a lot of people talk about automation, but I’ve noticed that very few have practical, real world success making money with it. So this channel is me chiming in and showing you what *real* systems that make *real* revenue look like.


    Hopefully I can help you improve your business, and in doing so, the rest of your life 🙏


    Like, subscribe, and leave me a comment if you have a specific request! Thanks.


    Chapters

    0:00 Claude Channels Launch

    1:52 Designing Thumbnails on the Go

    2:39 Setting up Discord

    4:01 Setting Up Your Channels

    5:08 Ensuring Security in Communication

    6:54 Creating Your Telegram Bot

    9:41 Configuring Discord Integration

    13:29 Keeping Your System Running

    16:30 Closing Thoughts on OpenClaw & Claude Channels"
  channel: "Nick Saraev"
  channelId: "UCbo-KbSjJDG6JWQ_MTZ_rNA"
  duration: "PT21M"
  publishedAt: "2026-03-20T16:49:29Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ot3NM5OVFmc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ot3NM5OVFmc"
processedAt: "2026-03-24T02:41:45.095Z"
source: "youtube"
tldr: "Anthropic's Claude Code just launched Channels, a native Telegram and Discord integration that allows you to interact with your local Claude agents through messaging apps, effectively replicating and surpassing the functionality of popular third-party tools like OpenClaw with better security and native tooling."
tools:
  - name: "Claude Code"
    url: null
  - name: "Telegram"
    url: null
  - name: "Discord"
    url: null
  - name: "BotFather"
    url: null
  - name: "claude-plugins-official"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 19796
  outputTokens: 1010
  totalTokens: 20806
  processingTimeMs: 33805
tagsNormalizedAt: "2026-03-24T04:14:09.326Z"
---

## Key Takeaways

Claude Channels provides a secure, native way to interact with AI agents through everyday messaging apps.

*   **Native messaging integration** enables you to text your Claude agents on Telegram and Discord just like texting a person, using your existing local skills and tooling.

*   **Built-in security features** include sender allow lists that silently drop unauthorized messages, addressing major security concerns present in third-party alternatives.

*   **Setup is straightforward** using BotFather for Telegram and Discord's developer portal, with plugins installed directly into Claude Code.

*   **This official release effectively obsoletes tools like OpenClaw** for most common use cases, offering a more secure, scalable, and officially supported solution from Anthropic.

## Summary

Anthropic has released **Channels** for Claude Code, a feature that allows users to communicate with their locally running Claude agents through Telegram and Discord. This transforms everyday messaging apps into interfaces for AI-powered workflows.

The video demonstrates the functionality in real-time. The creator shows how sending a simple "Hey" via Telegram triggers his local Claude agent to respond naturally. He then demonstrates a practical workflow: while out, he sends a Telegram message asking Claude to redesign a YouTube thumbnail by replacing a person with himself and modifying text/colors. The agent locally processes the request using his pre-configured skills and sends back the updated images.

A second demo uses Discord to scrape 100 leads for dental practices in California. The agent runs a scraping skill, creates a CSV file, and sends it directly to the Discord chat, showcasing how economically valuable tasks can be initiated and completed from a phone.

### Setup and Security

Setting up Channels involves creating bots on Telegram (via **BotFather**) and Discord (via the developer portal) to get API tokens. These tokens are then used to configure the respective plugins (`claude-plugins-official/telegram` and `claude-plugins-official/discord`) within Claude Code.

A critical advantage over third-party solutions is **built-in security**. Approved channel plugins use a **sender allow list**, meaning only pre-approved user IDs can push messages; all others are silently dropped. This provides accountability and mitigates risks like prompt injection that were prevalent in tools like OpenClaw.

### 24/7 Availability and the OpenClaw Context

For persistent access, the video explains how to keep your computer from sleeping (using `caffeinate` on Mac or power settings) or how to use a dedicated always-on machine like a Mac Mini. The creator also mentions using a file-syncing tool to keep workspaces consistent across multiple computers.

The release is positioned as a direct, superior alternative to **OpenClaw** (formerly Clawbot/Molbot). The video argues that OpenClaw's viral success was partly driven by astroturfing for a cryptocurrency pump, creator hype cycles, and VPS hosting promotions, rather than unique technical merit. For most users who just wanted a Telegram/Discord interface to Claude, Channels now provides that functionality natively with superior security, scalability, and the backing of Anthropic's engineering and safety principles.

## Context

This release is significant in the rapidly evolving landscape of AI agents and human-computer interaction. It represents a major platform move by Anthropic to absorb a popular use case—chatting with AI via messaging apps—directly into its official tooling. For developers and businesses using Claude Code, it simplifies deployment and enhances security. It also highlights the tension between innovative third-party tools and the platforms they build upon, which often later release their own integrated versions. This pattern is common in tech, where successful indie projects get 'Sherlocked' by the underlying platform.
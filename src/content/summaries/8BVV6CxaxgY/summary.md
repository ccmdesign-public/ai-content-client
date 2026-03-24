---
metadata:
  videoId: "8BVV6CxaxgY"
  title: "Claude Channels Just Dropped and It Replaces OpenClaw"
  description: "Sign up to the webinar March 24th - https://theaiaccelerators.com/register


    🤖 Transform your business with AI: https://salesdone.ai

    📚 We help entrepreneurs & industry experts build & scale their AI Agency: https://www.skool.com/theaiaccelerator/about

    🤚 Join the best community for AI entrepreneurs and connect with 16,000+ members: - https://www.skool.com/systems-to-scale-9517/about


    Sign up to our weekly AI newsletter - https://ai-core.beehiiv.com/


    🙋 Connect With Me!

    Instagram -   / nicholas.puru \ 

    X - https://x.com/NicholasPuru

    LinkedIn - https://www.linkedin.com/in/nicholas-puruczky-113818198/


    0:00 - Live demo: Claude Code from my phone

    1:08 - What is Claude Code Channels?

    2:05 - Why I stayed away from OpenClaw

    3:12 - How Channels actually works

    4:00 - Security & flat-rate billing

    4:42 - Setup walkthrough: Telegram integration

    8:38 - Research preview: dangerously-skip-permissions

    9:35 - Use cases: stacking tasks from your phone

    10:18 - Running multiple channels simultaneously

    10:28 - Your computer must stay on

    11:15 - Quick recap & final thoughts"
  channel: "Nick Puru | AI Automation"
  channelId: "UC4FK5DEcMLB3CyJcbJfZEJA"
  duration: "PT12M22S"
  publishedAt: "2026-03-20T15:17:36Z"
  thumbnailUrl: "https://i.ytimg.com/vi/8BVV6CxaxgY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=8BVV6CxaxgY"
processedAt: "2026-03-24T03:41:28.606Z"
source: "youtube"
tldr: "Anthropic just released Claude Code Channels, a research preview feature that lets you remotely control Claude Code AI workflows via Telegram or Discord, replacing third-party solutions like OpenClaw by allowing you to trigger tasks from your phone and run them on your local machine."
tools:
  - name: "Claude Code"
    url: null
  - name: "Telegram"
    url: null
  - name: "Discord"
    url: null
  - name: "GitHub"
    url: null
  - name: "BotFather"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-general"
  - "automation"
  - "claude"
  - "llm"
  - "productivity"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11210
  outputTokens: 819
  totalTokens: 12029
  processingTimeMs: 28050
tagsNormalizedAt: "2026-03-24T04:13:51.252Z"
---

## Key Takeaways

The video demonstrates Claude Code Channels, a new native feature from Anthropic that enables remote control of Claude Code workflows. • **Remote AI Workflow Control**: Trigger Claude Code tasks from your phone via Telegram/Discord while the agent runs locally on your computer. • **Security & Cost Advantages**: Uses allow-list security with your Claude subscription, avoiding third-party API costs and security concerns. • **Simple Setup Process**: Install via GitHub plugin, create a Telegram bot, and run Claude Code with a special permissions flag.

## Summary

Anthropic's Claude Code Channels is a newly released research preview feature that fundamentally changes how users interact with their Claude Code AI workflows. It allows users to send messages to their locally running Claude Code instance through popular messaging platforms like Telegram or Discord, enabling remote task execution from anywhere.

The core functionality works by setting up an **MCP (Model Context Protocol) server** that pushes messages into a running Claude Code session. Users can message their Claude agent just like texting someone, and Claude will execute tasks using whatever skills and tools are configured locally, then reply back through the same channel. This enables scenarios where you can be at a client meeting or away from your desk while Claude continues working on your computer.

### Technical Setup Process

The setup involves three main steps: installing the official Claude Plugins GitHub repository for channels, creating a new Telegram bot via BotFather to get an API token, and running Claude Code with the `claude dangerously skip permissions` command flag. This special flag is currently required because the feature is in research preview and gives Claude full autonomy to respond without requiring manual approval for each action.

### Advantages Over Previous Solutions

Claude Code Channels directly competes with third-party solutions like **OpenClaw** that previously filled this remote control gap. The presenter highlights several advantages: better security through allow-list only messaging (unauthorized messages get silently dropped), no additional API costs since it runs on your existing Claude subscription with a flat monthly rate, and native integration that feels more trustworthy for handling client data.

### Practical Applications

The feature enables queuing multiple tasks from your phone

- such as lead scraping, inbox management, or content generation

- while Claude works through them sequentially on your machine. For optimal uptime, the presenter recommends running Claude Code on a dedicated machine like a Mac Mini set to never sleep, ensuring the channels remain responsive around the clock. Users can also run multiple channels simultaneously, using Telegram for personal tasks and Discord for team workflows.

## Context

This development matters because it addresses a critical limitation in AI workflow automation: being tethered to your desk to trigger and monitor tasks. For business owners, freelancers, and agencies using Claude Code for automation (lead scraping, content creation, data processing), this enables true remote productivity. It represents Anthropic's continued rapid feature development in the competitive AI assistant space, moving toward more accessible and integrated workflow solutions.
---
metadata:
  videoId: "8Nk9IWhW2Ck"
  title: "I built my own OpenClaw that does EVERYTHING for me (but safer)"
  description: "🤖 Transform your business with AI: https://salesdone.ai

    📚 We help entrepreneurs & industry experts build & scale their AI Agency: https://theaiaccelerators.com/nickp

    🤚 Join the best community for AI entrepreneurs and connect with 16,000+ members: - https://www.skool.com/systems-to-scale-9517/about


    Sign up to our weekly AI newsletter - https://ai-core.beehiiv.com/


    🙋 Connect With Me!

    Instagram -   / nicholas.puru \ 

    X - https://x.com/NicholasPuru

    LinkedIn - https://www.linkedin.com/in/nicholas-puruczky-113818198/


    0:00 - Introduction

    0:59 - What I built instead (no code, one morning)

    1:28 - Credit to OpenClaw & what makes it great

    2:17 - The 4 components I replicated

    3:23 - Why I built my own: Security risks

    5:00 - The architecture: Second Brain overview

    6:58 - Step 1: Setting up Claude Code & cloning the repo

    11:36 - Step 2: Telegram bot adapter setup

    13:09 - Connecting Claude Max subscription (no API key)

    14:21 - Testing the bot live

    14:51 - Step 3: Building the heartbeat

    16:06 - Skill 1: Web search via DuckDuckGo

    16:58 - Skill 2: Document creation

    18:37 - Skill 3: Daily 9AM briefing

    19:20 - What sits on top: Adapters, skills & agents

    21:15 - Final thoughts & what's next"
  channel: "Nick Puru | AI Automation"
  channelId: "UC4FK5DEcMLB3CyJcbJfZEJA"
  duration: "PT22M20S"
  publishedAt: "2026-02-28T15:58:56Z"
  thumbnailUrl: "https://i.ytimg.com/vi/8Nk9IWhW2Ck/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=8Nk9IWhW2Ck"
processedAt: "2026-02-28T16:33:25.908Z"
source: "youtube"
tldr: "The creator built a custom, secure alternative to OpenClaw using Claude Code in one morning, replicating its core features—memory system, heartbeat, channel adapters, and skills—while avoiding its security flaws, high API costs, and lack of control, for a flat $200/month fee."
tools:
  - name: "OpenClaw"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Telegram"
    url: null
  - name: "SQLite"
    url: null
  - name: "DuckDuckGo"
    url: null
  - name: "Python"
    url: null
  - name: "Obsidian"
    url: null
  - name: "GitHub"
    url: null
  - name: "Claude"
    url: null
  - name: "Playwright"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
tags:
  - "agents"
  - "claude"
  - "security-general"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 18380
  outputTokens: 901
  totalTokens: 19281
  processingTimeMs: 46743
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.425Z"
---

## Key Takeaways

This video demonstrates how to build a secure, controlled personal AI assistant by deconstructing OpenClaw's architecture and rebuilding it with Claude Code. Key insights include: • **Security and Control First**: The custom build eliminates OpenClaw's critical vulnerabilities (plain-text credentials, malicious skills) and gives you full visibility into the code. • **Fixed-Cost Architecture**: Using Claude's Max plan for a flat monthly fee prevents the unpredictable, high token costs associated with OpenClaw's API usage. • **Blueprint-Driven Development**: The entire system—memory, Telegram adapter, heartbeat, and skills—was built by instructing Claude Code to study OpenClaw's repository and create a simplified, owned version.

## Summary

The video addresses the significant security and cost problems with the popular open-source project OpenClaw, which has been labeled a 'security nightmare' by Cisco, found to have critical remote code execution vulnerabilities, and can generate massive, unpredictable API bills. The presenter's solution is to use **OpenClaw as a blueprint** but build a custom version from scratch using **Claude Code**, an AI coding agent, without writing any code themselves.

The core architecture replicates four key components from OpenClaw. First, a **memory system** built with human-readable Markdown files (soul.md, user.md, memory.md) and a SQLite database for fast search, which auto-updates as you interact. Second, a **Telegram adapter** that serves as the primary interface, configured to respond only to the user's ID for security. Third, a **heartbeat** that runs every 30 minutes, reads the memory, and decides autonomously if a notification is warranted, logging all reasoning. Fourth, an expandable **skill system**, demonstrated with web search (using DuckDuckGo), document creation, and a daily briefing.

The build process is guided entirely by prompts to Claude Code. The creator starts by cloning the OpenClaw repository for reference, then instructs the AI to study and rebuild each component sequentially within a new folder. Crucially, the system is configured to use the **Claude Max plan** via the CLI, ensuring a fixed monthly cost of about $200 instead of per-token billing. The final result is a personal AI 'operating system' that the user fully understands and controls, with the potential to add more platforms (like WhatsApp, Slack) and skills (Gmail, calendar, browser automation) by repeating the same prompt-based development process.

## Context

OpenClaw has rapidly become one of the most popular open-source AI projects, promising a personal AI assistant that remembers everything and works across all messaging platforms. However, its widespread adoption has been marred by severe security vulnerabilities and exorbitant, unpredictable API costs. This video matters to entrepreneurs, business owners, and developers who want the power of a persistent AI assistant but need a secure, cost-controlled, and transparent alternative. It connects to the broader trend of using AI coding agents (like Claude Code) to rapidly build and own complex software systems without deep programming expertise.
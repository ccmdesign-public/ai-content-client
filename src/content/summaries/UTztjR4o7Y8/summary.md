---
metadata:
  videoId: "UTztjR4o7Y8"
  title: "My OpenClaw Kept Breaking - Here's How I Fixed It"
  description: "A few weeks ago, my OpenClaw agent kept failing.  It was forgetting everything after long conversations. Skills broke, cron jobs stopped running correctly, and I kept getting error messages in Telegram about running out of context. I thought it was the model, but it turns out it was how OpenClaw handles memory and context behind the scenes. Here's exactly what was broken and how I fixed it.


    🛠️ RELEVANT DOCS & PROMPTS:

    All relevant docs, instructions, and prompts from this video can be found here: https://x.com/_sean_matthew/status/2031800232569102610


    📋 TIMESTAMPS:

    00:00 Intro

    00:33 Why Memory Breaks

    01:39 Fix 1: Memory Flush

    04:21 Fix 2: Search & Retrieval

    06:25 Fix 3: The Heartbeat Cost Trap

    08:48 Fix 4: System Prompt Audit

    10:45 Recap

    11:09 Outro


    💾 MENTIONED IN THIS VIDEO:

    → Article on OpenClaw memory debugging (credit: code_rams on X): https://x.com/i/article/2025615759771123712

    → QMD by Tobi Lutke: https://github.com/tobi/qmd


    For more OpenClaw content:

    → 3 Tools That Make OpenClaw Actually Useful: https://youtu.be/QvfqAMUJTT4

    → I Gave OpenClaw Its Own Computer: https://youtu.be/QCf8BCT-Kzo"
  channel: "Sean Matthew"
  channelId: "UChIUO17UyR0Mb_qcCxCgLkw"
  duration: "PT11M23S"
  publishedAt: "2026-03-11T17:00:46Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UTztjR4o7Y8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UTztjR4o7Y8"
processedAt: "2026-03-12T15:19:32.008Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "OpenClaw agents suffer from memory loss and high costs due to flawed context management; fix by enabling memory flush, using QMD hybrid search, optimizing heartbeat settings, and auditing system prompts."
tools:
  - name: "OpenClaw"
    url: null
  - name: "Claude Code"
    url: null
  - name: "QMD"
    url: null
  - name: "Gemini 3.1 Flash"
    url: null
  - name: "Qwen"
    url: null
  - name: "Telegram"
    url: null
  - name: "Obsidian"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "llm"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9535
  outputTokens: 910
  totalTokens: 10445
  processingTimeMs: 36278
tagsNormalizedAt: "2026-03-12T16:12:28.758Z"
---

## Key Takeaways

The video details four fixes for common OpenClaw agent performance issues: enabling **memory flush** to preserve key data before compaction, implementing **QMD hybrid search** for better retrieval, optimizing the **heartbeat** to reduce token costs, and conducting a **system prompt audit** to eliminate bloat.

## Summary

The video details a deep dive into fixing critical performance and cost issues with an OpenClaw AI agent, named Jarvis, which was forgetting information, failing at cron jobs, and burning through API tokens.

### The Core Problem: Context Management

The main issue wasn't the underlying AI model (like GPT-5.4 or Claude Opus 4.6), but how OpenClaw handles **context and memory**. The agent's finite context window gets filled, triggering **compaction**—a process that summarises old conversation history. The problem is that compaction treats all information equally, causing vital details to be lost in vague summaries.

### Four Key Fixes

**1. Enable Memory Flush:** This is the primary fix for the compaction problem. Before compaction runs, a silent turn triggers the agent to write important learnings and decisions to a durable daily log file on disk. This ensures critical information survives the compression process. This is configured in the `openclaw.json` file.

**2. Implement QMD Hybrid Search:** The default semantic search often returns irrelevant results. Switching to **QMD** (a hybrid search system combining semantic, exact, and keyword matching) yields more accurate retrieval. The creator also adds instructions in the agent's prompt file to mandate checking the daily log and a `learnings.md` file before any task.

**3. Optimize the Heartbeat Cost Trap:** The **heartbeat** function, which checks on the agent periodically (default: every 30 minutes), can be a major cost driver because it sends the entire system prompt by default.

*   Set **active hours** so it doesn't run 24/7.

*   Enable **light context** mode in `openclaw.json` so the heartbeat only loads `heartbeat.md`.

*   Use a **cheaper model** (like Gemini 3.1 Flash) for the heartbeat, or run it locally with a model like Qwen.

**4. Conduct a System Prompt Audit:** Bloated system prompt files (agent.md, skills.md, etc.) waste context on every turn. The creator used **Claude Code** to audit and trim redundant, duplicated, or irrelevant content from all system files, significantly reducing the context load and eliminating the 'context full' errors.

The overarching lesson is that **context engineering and memory management** are critical for building efficient, cost-effective AI agents, often mattering more than the choice of AI model itself.

## Context

As AI agents like OpenClaw become more complex and handle more tasks (email, calendars, transcription, etc.), they face inherent challenges with memory, context limits, and operational costs. This video is crucial for developers, builders, and power users running OpenClaw or similar AI agent frameworks, as it addresses the often-overlooked 'plumbing' issues that cause agents to break and become expensive in production. It connects to the broader trend of moving from simple AI chatbots to persistent, multi-skilled autonomous agents that require robust long-term memory systems.
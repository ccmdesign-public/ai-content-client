---
metadata:
  videoId: "c8b-tyFWlg8"
  title: "The New Best Model Is Here (GPT-5.4)"
  description: "GPT 5.4 is out and it's the best model OpenAI has shipped yet - combining the coding chops of Codex 5.3 with the knowledge and web search of 5.2. I tested it, built stuff with it, and have some thoughts. Spoiler: it's great.


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack


    📌 Chapters:

    0:00 Intro

    0:16 Whats New

    0:51 Computer Use

    1:12 Demo

    2:24 Fast Mode

    2:44 Tool Search

    3:22 Tool Improvements

    3:50 Cons (Speed)

    4:25 Expensive

    4:54 UI Design"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT5M41S"
  publishedAt: "2026-03-06T10:45:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/c8b-tyFWlg8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=c8b-tyFWlg8"
processedAt: "2026-03-06T19:01:44.860Z"
source: "youtube"
tldr: "GPT-5.4 is OpenAI's new all-rounder model that combines GPT-5.3's coding prowess with GPT-5.2's knowledge work, featuring native computer use, tool search to reduce token usage by 47%, a 1M token context window, and new fast mode, though it's slower and more expensive."
tools:
  - name: "Playwright"
    url: null
  - name: "GPT-5.4"
    url: null
  - name: "Codeex"
    url: null
  - name: "Gemini"
    url: null
  - name: "Opus"
    url: null
  - name: "Design Arena"
    url: null
  - name: "MCP"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "chatgpt"
  - "llm"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5596
  outputTokens: 939
  totalTokens: 6535
  processingTimeMs: 42072
tagsNormalizedAt: "2026-03-06T19:29:24.098Z"
---

## Key Takeaways

GPT-5.4 represents a significant evolution in AI models with practical improvements and trade-offs. • It's an **all-rounder model** combining previous strengths in coding and knowledge work. • **Native computer use capabilities** enable autonomous browser interaction via Playwright. • **Tool search feature** reduces token usage by up to 47% by loading tools only when needed. • Despite improvements, it's **slower and more expensive** than predecessors.

## Summary

GPT-5.4 marks OpenAI's release of what they've positioned as their new 'best model' - an all-rounder designed to combine the coding capabilities of GPT-5.3 with the knowledge work and professional skills of GPT-5.2.

According to third-party benchmarks from Artificial Analysis, the model achieves its goal, ranking as the best coding model, best agentic model, and drawing with Gemini for best intelligence model.

### Native Computer Use

The most significant innovation is **native computer use capabilities**. OpenAI designed this as their first general-purpose model with built-in computer operation skills. It can write code using libraries like Playwright and issue mouse/keyboard commands based on screenshots.

In testing, the model successfully created an interactive 3D Tower Bridge experience in London using the experimental Playwright skill. It autonomously opened browsers, clicked around, identified visual issues like background blending problems, fixed code, and iterated

- completing the initial version in 30 minutes from a single prompt.

### Tool Search Feature

The **tool search capability** addresses a major efficiency problem. Previously, all tool definitions loaded upfront wasted tokens and caused context bloat. Now, GPT-5.4 receives a lightweight tool list and can search for specific tool definitions only when needed, appending them to the conversation context dynamically.

OpenAI reports this reduces token usage by up to 47% while maintaining accuracy, demonstrated in benchmarks with 36 MCP servers.

### Performance and Pricing

The model features a **1 million token context window**, though inputs beyond 272,000 tokens incur double rates. The **fast mode** offers 1.5x faster token speed at double usage cost, essentially functioning as a priority tier rather than a different model.

Pricing represents a significant increase: $2.50 per million input tokens and $15 per million output tokens for the base model, while the pro model costs $30 per million input and $180 per million output.

### Limitations

Despite improvements, GPT-5.4 shows notable drawbacks. It's **significantly slower** than competitors, taking the longest to return tokens in benchmarks. The creator's UI design test against Opus 4.6 showed GPT-5.4 producing generic, gradient-heavy designs that lacked innovation, reflecting OpenAI's continued weakness in creative design applications.

## Context

This release matters because GPT-5.4 represents a strategic consolidation of OpenAI's model capabilities into a single, versatile system. AI developers, researchers, and enterprise users should care as it offers improved tool efficiency and autonomous computer use while introducing significant cost and speed trade-offs. The model reflects the ongoing industry trend toward more capable, multi-purpose AI systems that can handle complex, multi-step tasks with less human intervention.
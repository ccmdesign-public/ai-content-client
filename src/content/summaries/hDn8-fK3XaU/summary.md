---
metadata:
  videoId: "hDn8-fK3XaU"
  title: "It's finally here."
  description: "T3 Code is one of the most fun projects I've ever taken on. Fully open source. Built out of a love of coding. I haven't opened Codex in weeks.


    https://t3.codes


    Also follow Julius he deserves to be over 10k followers https://x.com/jullerino


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT12M38S"
  publishedAt: "2026-03-07T03:32:44Z"
  thumbnailUrl: "https://i.ytimg.com/vi/hDn8-fK3XaU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=hDn8-fK3XaU"
processedAt: "2026-03-10T15:04:17.982Z"
source: "youtube"
tldr: "Theo and Julius have launched T3 Code, a free and open-source AI coding assistant that integrates multiple AI harnesses (starting with Codex CLI) to enable high-performance concurrent agent workflows, addressing performance and lock-in issues they experienced with tools like Codeex."
tools:
  - name: "T3 Code"
    url: null
  - name: "Codeex"
    url: null
  - name: "Codex CLI"
    url: null
  - name: "Cursor"
    url: null
  - name: "OpenAI"
    url: null
  - name: "Gemini"
    url: null
  - name: "Open Code"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Electron"
    url: null
  - name: "GitHub"
    url: null
  - name: "WSL"
    url: null
  - name: "Macroscope"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "llm"
  - "open-source"
  - "productivity"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11030
  outputTokens: 988
  totalTokens: 12018
  processingTimeMs: 57083
tagsNormalizedAt: "2026-03-10T16:46:05.740Z"
---

## Key Takeaways

Theo announces the alpha launch of T3 Code, a new AI-powered development tool built for modern agentic workflows.

*   **Free & Open-Source Foundation:** T3 Code is a community-owned, open-source project designed to avoid vendor lock-in and proprietary harnesses, unlike many existing solutions.

*   **Multi-Harness Architecture:** Instead of building its own AI harness, T3 Code uses official harnesses from AI labs (like Codex CLI), with plans to support Cursor, Claude Code, Gemini, and Open Code for maximum flexibility.

*   **Performance & Parallel Workflows:** The tool is built for speed and high-concurrency, allowing developers to manage multiple projects and work trees in parallel without the performance degradation found in other apps.

*   **Streamlined Development Cycle:** Features like one-click commit-to-PR workflows and isolated work trees aim to drastically reduce the friction from idea to implementation in real codebases.

## Summary

Theo introduces T3 Code, an alpha-stage, open-source AI coding assistant he built with Julius to solve frustrations with existing tools like Codeex. He loved the concurrent agent workflow concept but found Codeex's performance, lock-in to its models, and proprietary desktop app limiting.

### Core Philosophy: Leverage, Don't Replace

T3 Code's key differentiator is its approach to AI **harnesses**—the toolkits given to agents. Rather than building a custom harness, it uses the official harnesses provided by AI labs (starting with the Codex CLI). This ensures agents work in their optimized environment and allows users' existing subscriptions to work within T3 Code. Future support is planned for Cursor, Claude Code, Gemini, and Open Code.

### Built for Speed and Parallelism

Performance was a primary driver. The Electron-based app is designed to handle "gigantic threads" and multiple concurrent projects without slowing down. It enables powerful **work tree workflows** for isolated, parallel task execution within a project, and a quick `npm` command (`npxt3`) allows trying the app without a full install.

### Enhanced Developer Experience

The tool refines the agentic workflow with quality-of-life features. A one-click GitHub button can generate a commit message, commit changes, push to a branch, and create a PR. The goal is to make the editor a place for reviewing and guiding AI work, while letting the terminal return to being a terminal for specific tasks.

### Community-First and Transparent Development

The project is fully open-source, including its commit history, to show the iterative building process with AI. While not accepting external PRs during the alpha, the team encourages detailed feedback. Theo emphasizes this is a tool built for their own needs first, with no immediate monetization plans, aiming to create something valuable for the wider developer community.

## Context

The rapid evolution of AI coding assistants has moved beyond simple autocomplete to full agentic systems that can build software. However, developers are encountering new pain points: performance bottlenecks in graphical interfaces, vendor lock-in to specific AI models, and proprietary tools that limit customization. This launch addresses a growing need in the developer community for performant, open, and flexible tools that can harness the best capabilities of various AI labs without being tied to a single ecosystem. It's particularly relevant for developers and teams heavily investing in AI-assisted workflows who want control over their tooling.
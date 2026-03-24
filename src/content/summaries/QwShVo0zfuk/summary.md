---
metadata:
  videoId: "QwShVo0zfuk"
  title: "Everything needs to change"
  description: "We need a new ide. Cursor was a great first step, but we need to go further...


    Thank you Kernel for sponsoring! Check them out at: https://soydev.link/kernel


    SOURCE

    https://x.com/karpathy/status/2031767720933634100


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT24M38S"
  publishedAt: "2026-03-20T12:35:17Z"
  thumbnailUrl: "https://i.ytimg.com/vi/QwShVo0zfuk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=QwShVo0zfuk"
processedAt: "2026-03-24T21:05:25.889Z"
source: "youtube"
tldr: "Current AI coding tools like CLIs and text editors are insufficient for managing multiple concurrent projects, requiring a paradigm shift towards a 'bigger IDE' that integrates code editing, terminals, browsers, and AI agents into a single, project-agnostic orchestration layer."
tools:
  - name: "GitHub Copilot"
    url: null
  - name: "Cursor"
    url: null
  - name: "T3 Code"
    url: null
  - name: "Kernel"
    url: null
  - name: "Sublime Text"
    url: null
  - name: "VS Code"
    url: null
  - name: "Atom"
    url: null
  - name: "Electron"
    url: null
  - name: "CMOX"
    url: null
  - name: "Ghosty"
    url: null
  - name: "Neovim"
    url: null
  - name: "Next.js"
    url: null
  - name: "tRPC"
    url: null
  - name: "create-t3-app"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "productivity"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 20060
  outputTokens: 872
  totalTokens: 20932
  processingTimeMs: 29465
tagsNormalizedAt: "2026-03-24T23:00:18.612Z"
---

## Key Takeaways

The evolution of AI-assisted coding is revealing a fundamental mismatch between traditional development tools and modern workflows.

## Summary

The video argues that the current trajectory of AI coding tools—moving from in-editor autocomplete to sidebars to standalone CLIs—is insufficient. The core problem is that modern development, especially with AI agents, involves working on multiple projects simultaneously. Traditional IDEs like VS Code are designed around a one-to-one relationship with a single codebase, shaping themselves to its needs through config files like `.vscode/`.

This model breaks down when a developer needs to context-switch between several projects at once, managing separate terminal sessions, browser tabs, and editor windows for each. The resulting cognitive overhead of maintaining these mental maps between apps is termed the **agentic coding problem**.

The proposed solution is not to go smaller or deeper into existing tools, but to build a **'bigger IDE'**. This new paradigm would be a single application that acts as an orchestration layer for multiple concurrent projects. It would integrate the code editor, terminal, browser, and AI agent interfaces into a unified, nestable workspace. This environment would manage the context, not per-project, but per-developer, allowing seamless navigation between different workstreams.

Examples like **T3 Code** and **CMOX** (a fork of Ghosty) are early explorations in this direction, offering multi-space management with integrated terminals and browsers. However, the speaker believes the final form is still unknown and could involve infinitely nestable canvases, two-dimensional layouts, or even a shift to entirely different interaction models like Slackbot-driven development.

The opportunity is massive, akin to the shift that created the T3 Stack for full-stack type safety. As AI agents become more capable, the pain of using tools built for the previous generation of solo, linear development will intensify, creating a vacuum for novel, integrated solutions to emerge.

## Context

This video addresses a critical inflection point in software development tooling, driven by the rapid adoption of AI coding assistants. As developers leverage AI agents to work on multiple projects concurrently, the fundamental architecture of our development environments—built for single-project focus—is breaking down. This discussion is essential for developers, tool builders, and product leaders who need to understand the next evolution of the IDE to stay productive and build the foundational tools of the future.
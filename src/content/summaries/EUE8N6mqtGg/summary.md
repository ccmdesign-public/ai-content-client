---
metadata:
  videoId: "EUE8N6mqtGg"
  title: "So I stopped using Ghostty..."
  description: "I love Ghostty, but honestly I think it's time for something new...


    Thank you MilkStraw for sponsoring! Check them out at: https://soydev.link/milkstraw


    cmux github : https://github.com/manaflow-ai/cmux

    cmux site : https://www.cmux.dev/

    twitter: https://x.com/manaflowai


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT23M22S"
  publishedAt: "2026-03-12T20:21:31Z"
  thumbnailUrl: "https://i.ytimg.com/vi/EUE8N6mqtGg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=EUE8N6mqtGg"
processedAt: "2026-03-13T17:43:54.774Z"
source: "youtube"
tldr: "Theo switched from Ghostty to CMOX (also called Semox), a libghostty-based terminal app, because its project-based sidebar and nested tab structure better organizes the parallel, multi-project workflow required for modern 'agentic' AI-assisted development."
tools:
  - name: "Ghostty"
    url: null
  - name: "CMOX"
    url: null
  - name: "libghostty"
    url: null
  - name: "tmux"
    url: null
  - name: "T3 Code"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Codex"
    url: null
  - name: "Bun"
    url: null
  - name: "Niri"
    url: null
  - name: "VS Code"
    url: null
  - name: "Git"
    url: null
  - name: "Lazygit"
    url: null
  - name: "btop"
    url: null
  - name: "GNU Screen"
    url: null
  - name: "Milkstraw"
    url: "https://soy.link/milkstraw"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "open-source"
  - "productivity"
  - "terminal"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 19522
  outputTokens: 1028
  totalTokens: 20550
  processingTimeMs: 34266
tagsNormalizedAt: "2026-03-13T17:52:07.845Z"
---

## Key Takeaways

The video explores how modern, AI-assisted development demands new tools for parallel work. Theo switched from Ghostty to CMOX (Semox), a terminal built for project-based organization, and envisions a future where a single app integrates terminals, code editors, and browsers using a 'paper window manager' (like Niri) model for infinite, non-destructive nesting.

## Summary

Theo explains his switch from Ghostty, a terminal he used for a decade, to a new app called CMOX (also referred to as Semox). His primary motivation is the changing nature of his work, which has become increasingly parallel and project-based due to AI-assisted ('agentic') development.

**The Problem: Traditional Tools Don't Scale**
Terminal multiplexers like tmux and traditional window managers break down when juggling multiple projects simultaneously. The hierarchy of work—jumping between different apps (terminal, IDE, browser) for different tasks across different projects—becomes chaotic and inefficient.

**The Solution: CMOX's Project-Centric Design**
CMOX, built on the libghostty library, introduces a paradigm shift. Its core feature is a sidebar that organizes work by project or workspace (e.g., 'T3 Code', 'Sandbox'). Within each workspace, you can have multiple split panes and nested tabs for different tasks (dev server, git, Claude Code). This creates a logical, two-tier hierarchy that mirrors how developers think about their work.

**The Vision: The Future of Dev Environments**
Inspired by the 'paper window manager' Niri, Theo envisions taking this further. He imagines an app where each workspace is an infinitely scrollable, non-destructive canvas. You could seamlessly integrate not just terminals, but also native browser profiles (with extensions/passwords) and even editor panes (like T3 Code or VS Code) into this unified, project-focused interface. This would collapse the current fragmented toolset into a single, cohesive environment designed for parallel work.

**Current Trade-offs and Excitement**
While CMOX has bugs (like a status line glitch) and flawed features (its built-in browser), its core organizational model is transformative. Theo sees it as a 'duct-taped version of the next generation' of developer tools, made possible by AI both as a driver of new workflows and as a tool for small teams to build complex software. He's excited to see what others build on this concept.

## Context

This video is critical for developers, especially those using AI coding assistants (like Claude Code), who find themselves constantly context-switching between multiple projects and tasks. It addresses a growing pain point in modern software development: our tools (terminals, IDEs, browsers) were designed for linear, single-project workflows, but AI enables and encourages highly parallel work. Theo's exploration highlights the early stages of a potential revolution in developer tooling, moving towards unified, project-aware environments.
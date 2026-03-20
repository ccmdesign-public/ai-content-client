---
metadata:
  videoId: "8oLP8oxqtOE"
  title: "Claude Code + CMUX: The Ultimate AI Coding Terminal"
  description: "Cmux is a revolutionary terminal by Lawrence Chen, built specifically for AI coding agents that gives them the power to control browsers, spawn subagents in split panes, send notifications, and manage workflows through a simple CLI or the socket API. Unlike Warp or WezTerm, CMUX is a native macOS app built on libghostty and bonsplit that integrates seamlessly with Claude Code hooks and skills, letting your AI agents work side-by-side with web browsers, track test progress in sidebars, and coordinate multiple subagents across workspaces, all without the overhead of Electron apps. Whether you're using Claude Code or another agent harness, CMUX transforms how your AI assistants interact with your development environment.


    🔗 Relevant Links

    Cmux - https://www.cmux.dev/


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

    0:25 What is Cmux

    0:42 Going through examples with Cmux

    1:33 Agent controlling browser with Cmux

    2:27 Cmux split pane with subagents

    3:25 Cmux for agent notifications

    5:00 Other Cmux features

    5:31 Final thoughts"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT6M18S"
  publishedAt: "2026-03-04T10:15:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/8oLP8oxqtOE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=8oLP8oxqtOE"
processedAt: "2026-03-04T15:51:19.871Z"
source: "youtube"
tldr: "CMUX is a native Mac terminal app that, when combined with Claude Code, enables AI agents to directly control browser automation, create parallel sub-agent instances in split panes, and send custom notifications, creating a powerful environment for AI-assisted development workflows."
tools:
  - name: "CMUX"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Lib Ghosty"
    url: null
  - name: "bondsplit"
    url: null
  - name: "skills.sh"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "automation"
  - "claude"
  - "productivity"
  - "terminal"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5860
  outputTokens: 958
  totalTokens: 6818
  processingTimeMs: 33798
tagsNormalizedAt: "2026-03-04T16:08:54.577Z"
---

## Key Takeaways

The video demonstrates how CMUX transforms Claude Code into a powerful AI coding terminal with agent control capabilities. Key insights include:

*   **CMUX provides a CLI and Unix socket API** that allows AI agents like Claude to control terminal operations, browser automation, and workspace management.

*   **Agents can create parallel sub-agents** in split panes for tasks like project analysis and code review, then consolidate results automatically.

*   **The system enables real-time notifications** and visual feedback (like flashing borders) to alert developers when agents need attention or complete tasks.

*   **CMUX is built on Lib Ghosty and bondsplit** for layout, offering native Mac performance and compatibility with existing terminal configurations.

## Summary

The video introduces CMUX (also referred to as CMAX or CMOX), a specialized terminal application designed to give AI coding agents like Claude Code direct control over the development environment. Unlike standard terminals, CMUX exposes its functionality through a CLI and a Unix socket API, allowing agents to execute commands that manipulate the terminal itself.

### Core Functionality and Integration

After installation, CMUX appears as a regular terminal with tab and split-pane support. The real power is unlocked when an AI agent like Claude Code is instructed to use the `cmox` CLI. The demo shows Claude being asked to open a browser in a new split pane, navigate to Google.com, perform a search, and even click on specific links—all autonomously. The browser pane includes full developer tools, enabling the agent to debug pages as part of its workflow.

### Advanced Agent Orchestration

A more complex demonstration involves instructing the main Claude instance to spawn two sub-agent instances in separate split panes. One is tasked with understanding a project's structure, while the other analyzes its code. Once finished, these sub-agents report their findings back to the main instance and close their panes automatically. This showcases CMUX's ability to facilitate **parallel, multi-agent workflows** within a single view.

### Notification and Feedback Systems

To solve the problem of knowing when an agent is stuck or has completed a task, CMUX includes a notification system. Agents can be prompted to send custom notifications to a sidebar bell icon or use the `trigger flash` command to make a specific pane's border flash blue, grabbing the developer's attention. The video also shows agents using the CLI to dynamically update workspace information, like adding a project branch name with an appropriate SF Symbol icon.

### Technical Foundation and Setup

CMUX is a native Mac app built on **Lib Ghosty** (for terminal emulation) and **bondsplit** (for layout management). Communication between the CLI and the app happens via JSON over a Unix socket, making it fast and simple. For optimal use with Claude Code, the creator recommends installing the core and browser skills for CMUX and setting up Claude Code hooks to automate notifications. The presenter notes that while powerful, the initial setup could be streamlined with an automatic installer similar to `skills.sh`.

## Context

This video matters because it showcases the next evolution of AI-assisted development: moving beyond simple code generation to giving AI agents direct, programmable control over the developer's environment. It's relevant for developers, engineers, and teams looking to automate complex, multi-step workflows, parallelize code analysis, or integrate AI more deeply into their testing and debugging processes. This aligns with the broader trend of AI transitioning from a conversational tool to an autonomous, actionable assistant within integrated development workflows.
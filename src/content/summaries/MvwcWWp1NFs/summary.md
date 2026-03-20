---
metadata:
  videoId: "MvwcWWp1NFs"
  title: "5 New VS Code Features for Smarter Agents"
  description: "Working with agents just got more practical! In this video, we break down 5 of the top features from the latest VS Code release, which let agents adapt to how you work, and not the other way around.


    🔎 Chapters:

    00:00 Intro

    00:26 Agent Skills on demand

    00:59 Message steering

    01:30 Integrated browser

    01:52 Fork a conversation

    02:12 Hooks

    02:41 Recap


    🔗 Links:

    Release notes: https://aka.ms/VSCode/110

    VS Code contributor website repo: https://github.com/pierceboggan/vscode-contributor-website


    🎙️ Featuring: Olivia Guzzardo McVicker (@OliviaGuzzardo)


    📲 Follow VS Code:

    * X: https://x.com/code

    * Bluesky: https://bsky.app/profile/vscode.dev

    * YouTube: https://youtube.com/code

    * LinkedIn: https://www.linkedin.com/showcase/104107263

    * GitHub: https://github.com/microsoft/vscode


    #vscode #copilot #ai"
  channel: "Visual Studio Code"
  channelId: "UCs5Y5_7XK8HLDX0SLNwkd3w"
  duration: "PT3M5S"
  publishedAt: "2026-03-04T20:15:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/MvwcWWp1NFs/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=MvwcWWp1NFs"
processedAt: "2026-03-06T18:52:23.340Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "VS Code's latest release introduces five key features for smarter AI agent workflows: slash commands for agent skills, mid-response message steering, an integrated browser for verification, conversation forking, and hooks for session automation."
tools:
  - name: "Visual Studio Code"
    url: null
  - name: "Playwright"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "productivity"
  - "vscode"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2993
  outputTokens: 650
  totalTokens: 3643
  processingTimeMs: 16219
tagsNormalizedAt: "2026-03-06T19:29:24.099Z"
---

## Key Takeaways

The video demonstrates how new VS Code features transform AI agent development workflows. • Use **slash commands** to quickly reference pre-defined agent skills like front-end design. • **Message steering** allows adding follow-up instructions while an agent is still working. • **Conversation forking** creates new branches of dialogue without losing original context for exploring alternatives.

## Summary

The latest VS Code release introduces five powerful features that enhance how developers work with AI agents. These features are demonstrated through a practical example of adding a top contributor spotlight to a VS Code community website.

### Slash Commands for Agent Skills

The video shows how to use slash commands to reference pre-defined agent skills. The presenter uses `/frontenddesign` to invoke a front-end design skill that guides the agent to create designs according to specifications while avoiding "AI slop." This allows developers to quickly apply standardized guidelines to their agent interactions.

### Message Steering During Execution

A key innovation is the ability to steer agent responses mid-flight. While an agent is working on a task, developers can send follow-up messages with additional details or clarifications, just like in a human conversation. The example shows adding a request for a "fun shimmer animation" while the agent is already implementing the design.

### Integrated Browser for Verification

The new integrated browser automatically opens when instructed and can navigate to pages, verify content, and use tools like clicking elements and running Playwright code autonomously. This allows agents to verify their own work by interacting with live web pages.

### Conversation Forking

Developers can type `/fork` to create a new session with full conversation history, enabling exploration of alternative approaches without losing the original context. The example shows forking to explore a more minimal design alternative.

### Hooks for Session Automation

Hooks allow executing custom shell commands at key lifecycle points in agent sessions. The video demonstrates a hook that automatically commits pending changes when an agent session stops, ensuring no generated work is lost and baking version control into the agentic workflow.

## Context

This update is significant as it represents VS Code's deepening integration of AI agent capabilities directly into the developer workflow. As AI-assisted coding becomes more prevalent, these features address common pain points like maintaining context, verifying outputs, and managing agent behavior. Developers working with AI coding assistants, agent frameworks, or building AI-powered tools will find these features particularly valuable for creating more reliable and efficient AI-human collaboration.
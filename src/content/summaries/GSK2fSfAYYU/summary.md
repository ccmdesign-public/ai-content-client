---
metadata:
  videoId: "GSK2fSfAYYU"
  title: "Multiple agents in #vscode running in parallel"
  channel: "Visual Studio Code"
  channelId: "UCs5Y5_7XK8HLDX0SLNwkd3w"
  duration: "PT1M27S"
  publishedAt: "2026-03-23T20:44:12Z"
  thumbnailUrl: "https://i.ytimg.com/vi/GSK2fSfAYYU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=GSK2fSfAYYU"
processedAt: "2026-03-24T22:06:03.970Z"
source: "youtube"
tldr: "VS Code enables developers to run multiple, parallel AI agent sessions simultaneously, allowing them to start new coding tasks like adding features or documentation without waiting, switch between different AI models for specific tasks, and manage potential code conflicts by sending work to isolated work trees."
tools:
  - name: "Visual Studio Code"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "GitHub Copilot CLI"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "copilot"
  - "productivity"
  - "vscode"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2008
  outputTokens: 738
  totalTokens: 2746
  processingTimeMs: 26701
tagsNormalizedAt: "2026-03-24T22:59:50.885Z"
---

## Key Takeaways

The video demonstrates VS Code's capability to run multiple AI coding agents in parallel. Key insights include: • **Parallel Agent Sessions** enable starting new coding tasks (like feature implementation or documentation) without waiting for previous ones to finish. • **Model Flexibility** allows switching between different AI models (e.g., for planning vs. implementation) based on the task at hand. • **Conflict Management** is handled by sending agent work to isolated **work trees**, preventing interference when multiple sessions touch the same codebase.

## Summary

The video showcases a powerful workflow within Visual Studio Code where developers can initiate and manage multiple AI agent sessions that run concurrently. This functionality transforms the development process from a linear, waiting-dependent model to a highly parallel and efficient one.

A developer can start a session for a specific task, such as 'adding color scheme support for my web page.' Instead of waiting for this agent to complete its work, the user can immediately navigate back and launch a completely separate session for a different objective, like 'create some documentation.' This creates a multitasking environment where progress is made on several fronts simultaneously.

Each parallel session can be customized. A key feature highlighted is the ability to **select different AI models** for different sessions. This means a developer could use one model optimized for planning and architectural tasks for a backend feature, while using another model better suited for documentation generation in a separate session. This model-switching is done per-session, providing granular control.

A critical consideration with parallel editing is managing code conflicts. The video demonstrates the solution: when a new session might touch code another agent is already modifying, the user can **send the work to a work tree**. This action creates an isolated branch off the main development branch, allowing the agent to operate safely in the background without causing merge conflicts or overwriting ongoing work from other sessions.

This system ensures developers 'are never waiting for Copilot to finish.' They can continuously queue up new tasks—implementing features, writing docs, or refactoring code—and jump between sessions to monitor progress or provide further instructions, significantly boosting productivity and task management within a single IDE window.

## Context

This feature addresses a core bottleneck in AI-assisted development: the idle time developers spend waiting for an AI agent to complete a task before giving it a new one. As AI coding tools become integral to modern workflows, maximizing their throughput and a developer's ability to manage complex, multi-faceted projects is crucial. This capability is particularly relevant for software engineers, full-stack developers, and tech leads who juggle implementation, documentation, and bug fixes simultaneously, allowing them to leverage AI as a true parallel assistant rather than a sequential tool.
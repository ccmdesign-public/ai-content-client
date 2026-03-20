---
metadata:
  videoId: "_mrMidIwCzk"
  title: "I Let 30 AI Agents Loose in My Repo (Gas Town)"
  description: "What happens when you turn one AI coding assistant into a coordinated team of 20–30 agents?


    In this video, I test Gas Town, an open-source AI agent orchestrator, and see what happens when I let it loose inside a real codebase. Instead of using Claude Code as a single assistant, Gas Town acts like an AI dev team even with full persistence if something crashes.


    🔗 Relevant Links

    Gas Town Repo - https://github.com/steveyegge/gastown


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

    00:00 – Turning One AI Into 30 AI Agents

    00:34 – What Is Gas Town? (AI Agent Orchestrator Overview)

    00:55 – Mayor, Beads, Convoys & Polecats Explained

    01:50 – Live Demo: Adding JWT Auth With AI Agents

    02:47 – How Gas Town Breaks Features Into Parallel Tasks

    04:20 – Gas Town Repo Output

    05:00 – Running the App: JWT Auth Fully Working

    05:21 – Pros: Scaling AI Agents for Developer Productivity

    05:50 – Cons: Cost, Fatigue & Code Quality Risks

    06:30 – Will People Actually Want to Use This?"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT7M28S"
  publishedAt: "2026-02-24T17:00:58Z"
  thumbnailUrl: "https://i.ytimg.com/vi/_mrMidIwCzk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=_mrMidIwCzk"
processedAt: "2026-02-26T23:54:33.738Z"
source: "youtube"
tldr: "Gastown is an open-source orchestrator that enables 20-30 AI coding agents to work in parallel on complex features like adding JWT auth to a Go app, decomposing tasks, using Git for persistence, and merging code automatically, representing a shift from single AI assistants to multi-agent systems."
tools:
  - name: "Gastown"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Git"
    url: null
  - name: "GitHub"
    url: null
  - name: "Docker"
    url: null
  - name: "SQLite"
    url: null
  - name: "OpenAI"
    url: null
  - name: "Go"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Programming"
  - "Security"
  - "Tools & Productivity"
tags:
  - "agents"
  - "authentication"
  - "automation"
  - "docker"
  - "git"
  - "go"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6136
  outputTokens: 776
  totalTokens: 6912
  processingTimeMs: 13466
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.504Z"
---

## Key Takeaways

Gastown orchestrates multiple AI agents to work in parallel on complex development tasks, fundamentally changing the coding workflow.

## Summary

Gastown is an open-source orchestrator that transforms AI coding agents into coordinated multi-agent systems, similar to Kubernetes for development workflows. It's not an AI model itself but sits on top of tools like Claude Code to enable parallel execution.

The system works through a hierarchical structure: users give a high-level goal to the **mayor**, which breaks it into structured **task units called beads**. These beads are grouped into **convoys**, and worker agents called **polecats** execute them in parallel through Git branches.

In a practical demonstration, the creator tested Gastown by having it add JWT authentication to a simple Go-based to-do app. With a single prompt requesting auth, SQLite, endpoints, protected routes, HTML forms, tests, and a Dockerfile, Gastown decomposed the feature into parallel tasks:

- One agent created the SQLite schema

- Another wrote JWT middleware

- Others built login/register routes

- Separate agents updated UI forms and wrote integration tests

- Another handled Docker configuration

All this happened simultaneously, with Git branches isolating work, merges being queued, and state being tracked persistently. If the system crashes, it can resume from the last persistent state rather than starting over.

The resulting implementation successfully added register, login, token issuance, protected routes, and passing tests to the application. The entire feature was decomposed and implemented in just a few minutes, demonstrating **cognitive offloading** where developers no longer need to manage every AI step.

However, there are significant tradeoffs to consider. While Gastown offers **scalability** (20-30 agents working simultaneously) and **Git persistence** (no more fragile AI sessions), it also introduces **oversight fatigue** (reviewing massive output), **high costs** (multiple agents running in parallel), and **potential conflicts** where agents can over-engineer or wreck repositories.

The tool represents a fundamental shift from AI assistants to multi-agent systems that could dramatically increase productivity but also redefine development workflows entirely.

## Context

This video matters because it showcases the evolution of AI in software development from single-assistant tools to coordinated multi-agent systems. Developers, engineering managers, and tech leaders should care as this represents a potential 10x productivity increase for complex features but also introduces new challenges around cost, oversight, and system complexity. It connects to broader trends in AI automation, DevOps orchestration, and the future of software development workflows where human developers become orchestrators rather than implementers.
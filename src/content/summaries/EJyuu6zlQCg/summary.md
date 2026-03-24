---
metadata:
  videoId: "EJyuu6zlQCg"
  title: "5 Claude Code skills I use every single day"
  description: "Learn the 5 AI agent skills I use every day to steer Claude Code and dramatically improve code quality. Master process-driven development with LLMs through practical examples and real workflows.


    0:00 Intro

    1:18 /grill-me

    3:55 /write-a-prd

    6:00 /prd-to-issues

    8:29 /tdd

    12:04 /improve-codebase-architecture


    Claude Code for Real Engineers course (40% off for 7 days, starts March 30th):

    https://aihero.dev/s/ooKL2Q


    My Skills:

    https://aihero.dev/s/tbyzF8


    Follow Matt on Twitter


    https://twitter.com/mattpocockuk


    Join the Discord:


    https://aihero.dev/s/egrQdu"
  channel: "Matt Pocock"
  channelId: "UCswG6FSbgZjbWtdf_hMLaow"
  duration: "PT16M42S"
  publishedAt: "2026-03-16T16:01:49Z"
  thumbnailUrl: "https://i.ytimg.com/vi/EJyuu6zlQCg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=EJyuu6zlQCg"
processedAt: "2026-03-24T19:39:34.324Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Matt Pocock shares five Claude Code skills he uses daily to dramatically improve AI agent output quality: Grill Me, Write a PRD, PRD to Issues, TDD, and Improve Codebase Architecture."
tools:
  - name: "Claude Code"
    url: null
  - name: "GitHub"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-coding"
  - "claude"
  - "engineering"
  - "prompt-engineering"
  - "testing"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 13915
  outputTokens: 674
  totalTokens: 14589
  processingTimeMs: 19964
tagsNormalizedAt: "2026-03-24T23:00:54.099Z"
---

## Key Takeaways

Effective AI-assisted development requires strict processes encoded as skills to guide agents with no memory.

## Summary

The video presents five specific Claude Code skills the creator uses daily to improve AI-assisted development. These skills create strict processes that guide AI agents, which lack memory, to produce higher quality code.

### The Five Skills

**Grill Me**: A three-sentence skill that forces the AI to interview the user relentlessly about every aspect of a plan, walking down each branch of the design tree to reach a shared understanding before any code is written. This can result in 30-50 questions for complex features.

**Write a PRD**: Transforms a fleshed-out idea into a Product Requirements Document (PRD). The skill has steps for deep description, repo exploration, user interviews, sketching major modules, and finally writing the PRD, which is submitted as a GitHub issue.

**PRD to Issues**: Breaks down a PRD's destination into a journey by creating a kanban board of vertical slice issues. It establishes blocking relationships between tasks, enabling parallel agent work and using the tracer bullet analogy to flush out unknown unknowns quickly.

**TDD (Test-Driven Development)**: The most consistent way to improve agent output, this skill enforces a red-green-refactor loop. It emphasizes designing interfaces for testability first, writing one failing test at a time, and making codebases easier for AI to navigate.

**Improve Codebase Architecture**: Identifies confusing areas in the codebase (e.g., many small files, tightly coupled modules) and presents candidates for deepening shallow modules. It spawns sub-agents to design multiple radical interface alternatives, culminating in a refactor RFC GitHub issue.

### Core Philosophy

The overarching insight is that to get quality output from AI agents, you must treat them like humans with specific constraints—agents with no memory that need clear, documented processes. Improving the underlying codebase architecture directly improves the quality of the AI's output, as a garbage codebase leads to garbage AI output within it.

## Context

This video is crucial for developers and engineering teams integrating AI coding assistants like Claude Code into their workflow. As AI agents become more prevalent but lack memory and context, the ability to steer them with precise, repeatable processes becomes a critical engineering skill. This reflects the broader trend of human-AI collaboration, where human oversight and system design dictate the quality of the automated output.
---
metadata:
  videoId: "ENLpzrH-gIk"
  title: "What my Agentic AI workflow did to my codebase"
  description: "Game dev channel: https://www.youtube.com/@joshmoronypixels


    A little over a month ago I started leaning heavily into an agentic AI workflow for a large and complex project I have been working on. After around 100 pull requests created by these AI agents, this is what my experience has been like


    Worktree video: https://www.youtube.com/watch?v=S8_AsOuAwLo


    Get weekly content and tips exclusive to my newsletter: https://mobirony.ck.page/4a331b9076\ 


    MY GEAR:

    Keyboard: https://adm42.dev/?ref=3

    Neovim setup: https://github.com/joshuamorony/lazyvim/

    Animations: https://motioncanvas.io/


    #javascript #agenticai #claude\ 


    0:00 Introduction

    1:58 100 PRs with AI

    4:30 My workflow"
  channel: "Joshua Morony"
  channelId: "UCbVZdLngJH6KOJvpAOO3qTw"
  duration: "PT9M56S"
  publishedAt: "2026-02-18T11:00:25Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ENLpzrH-gIk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ENLpzrH-gIk"
processedAt: "2026-03-24T18:28:49.242Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Using a standard agentic AI workflow (General Ralph approach) with Claude, the developer achieved 10x productivity on a complex Phaser game, completing 100 large PRs in a month without degrading the existing clean, modular JavaScript/TypeScript codebase."
tools:
  - name: "Claude"
    url: null
  - name: "Phaser"
    url: null
  - name: "GitHub"
    url: null
  - name: "TypeScript"
    url: null
  - name: "JavaScript"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "agents"
  - "ai-coding"
  - "automation"
  - "claude"
  - "javascript"
  - "typescript"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7347
  outputTokens: 895
  totalTokens: 8242
  processingTimeMs: 33477
tagsNormalizedAt: "2026-03-24T23:01:36.007Z"
---

## Key Takeaways

The video demonstrates how a well-structured agentic AI workflow can dramatically boost developer productivity while maintaining code quality.

- **Agentic AI Workflows** like the **General Ralph approach** can handle complex, multi-phase feature development autonomously when given proper planning and context.

- **Clean, modular codebases** (JavaScript/TypeScript) with clear standards are crucial for successful AI collaboration, preventing 'AI slop' and ensuring architectural consistency.

- **Developer oversight remains essential** for high-level planning, architectural review, and providing feedback, but detailed line-by-line code review becomes less necessary as the AI's output proves reliable.

- **Productivity gains can be 10x or more** for suitable projects, especially in domains like game development where systems are complex but loosely coupled.

## Summary

Joshua Morony, previously skeptical of AI coding, details a transformative shift in his development process for a complex Phaser-based game after adopting an agentic AI workflow. He moved from minimal AI use to completing approximately 100 significant pull requests in one month, estimating a 10x productivity increase, all while maintaining or improving the quality of his existing clean, modular JavaScript/TypeScript codebase.

His workflow is based on the **General Ralph approach**. He uses **Claude** as a 'manager' agent to plan features, breaking them down into tracks (equivalent to a PR) and phases. Individual 'dumb' Ralph agents are then spawned sequentially via a bash script to execute each phase. These agents operate within a shared memory system, creating work trees, opening PRs, writing code, and running quality gates (TypeScript compilation, tests).

The process is highly systematic. For a new feature, he provides Claude with context (often referencing previous PRs or code), collaborates on a plan, and then triggers the Ralph agents. They work autonomously through phases until completion. Joshua then reviews the PR, primarily focusing on high-level architecture and approach rather than line-by-line code, and provides feedback. The agents can read this feedback (including a 'LGTM' comment to trigger a merge) and iterate.

He notes that the success is likely an outlier due to favorable conditions: a well-structured codebase, using JavaScript (which LLMs know well), and the nature of game development with its loosely coupled systems. His role is critical in the planning and architectural review phases, debunking the idea that developers are no longer needed. The workflow required only a few hours to set up, mostly configured by Claude itself, and has proven astonishingly reliable, with less than 10% of PRs requiring significant intervention.

## Context

This video is significant for developers exploring the practical limits of AI-assisted coding. It moves beyond simple conversational ChatGPT use to demonstrate a structured, multi-agent workflow capable of handling large, complex features. It provides a concrete, successful case study in a specific domain (game dev with Phaser/TypeScript), offering a blueprint for others and highlighting that success depends heavily on starting with good code structure and clear developer oversight. It matters because it shows a potential future state of software development where AI handles implementation details at scale, allowing developers to focus on planning, architecture, and high-value feedback.
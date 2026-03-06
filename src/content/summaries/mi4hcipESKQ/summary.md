---
metadata:
  videoId: "mi4hcipESKQ"
  title: "Turn Claude Code Into Your Executive Assistant in 27 Mins"
  description: "Full courses + unlimited support: https://www.skool.com/ai-automation-society-plus/about

    All my FREE resources: https://www.skool.com/ai-automation-society/about

    Apply for my YT podcast: https://podcast.nateherk.com/apply

    Work with me: https://uppitai.com/


    My Tools💻

    14 day FREE n8n trial: https://n8n.partnerlinks.io/22crlu8afq5r

    Code NATEHERK to Self-Host n8n for 10% off (annual plan): http://hostinger.com/nateherk

    Voice to text: https://ref.wisprflow.ai/nateherk


    In this video, I walk you through exactly how I built my own AI executive assistant using Claude Code, and how you can do the same. We go through four phases: setting up the project, adding context and rules, building out your first skills and sub-agents, and how to let it grow over time by layering in more skills, memory, and context as your needs evolve.


    By the end, you'll have a clear blueprint for setting up a personal AI assistant that actually works the way you work, not just a generic chatbot, but something that knows your business, follows your systems, and gets smarter the more you use it.


    Sponsorship Inquiries:

    📧 sponsorships@nateherk.com


    Timestamps

    00:00 Demo

    03:00 What We're Building

    05:02 Phase 1

    08:35 Phase 2

    16:50 Phase 3

    25:35 Phase"
  channel: "Nate Herk | AI Automation"
  channelId: "UC2ojq-nuP8ceeHqiroeKhBA"
  duration: "PT27M14S"
  publishedAt: "2026-03-05T12:46:03Z"
  thumbnailUrl: "https://i.ytimg.com/vi/mi4hcipESKQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=mi4hcipESKQ"
processedAt: "2026-03-06T18:51:35.038Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Learn how to build a personalized AI executive assistant using Claude Code in Visual Studio Code, following a four-phase framework: give it a home (project structure), give it life (rules & context), give it hands (skills & sub-agents), and let it grow (iterative improvement)."
tools:
  - name: "Claude Code"
    url: null
  - name: "Visual Studio Code"
    url: null
  - name: "GitHub"
    url: null
  - name: "Perplexity AI"
    url: null
  - name: "ClickUp"
    url: null
  - name: "Notion"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "productivity"
  - "prompt-engineering"
  - "vscode"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 26173
  outputTokens: 1026
  totalTokens: 27199
  processingTimeMs: 32169
tagsNormalizedAt: "2026-03-06T19:30:05.735Z"
---

## Key Takeaways

The video demonstrates a framework for turning Claude Code into a personalized AI executive assistant that understands your business and automates tasks. Key insights include:

*   **Structured Project Management** is critical: Use a well-organized folder system (e.g., `claude/`, `context/`, `projects/`) and a central `claude.md` file as the assistant's "brain" to point to relevant information, saving tokens and maintaining clarity.

*   **Skills and Sub-Agents** enable automation: Build reusable **skills** (like a research skill using the Perplexity API) and delegate complex or cost-sensitive tasks to **sub-agents** (which can use different, cheaper models like Haiku) for parallel, efficient work.

*   **Iterative Growth** through daily use: The assistant becomes smarter over time as you migrate all your AI work into the project, log decisions, update context files, and continuously refine skills based on feedback.

## Summary

The tutorial provides a comprehensive, step-by-step guide to building a customized AI executive assistant within the Claude Code IDE extension for Visual Studio Code. The process is broken down into four core phases.

### Phase 1: Give It a Home

This involves setting up the foundational project structure. You install **Claude Code** in **Visual Studio Code**, create a dedicated project folder, and initialize it with a `claude.md` file. This file acts as the system prompt, loaded every time you interact with the assistant. It should be concise and primarily contain pointers to other files to optimize token usage.

### Phase 2: Give It Life

Here, you inject personality and context into the assistant. Using a provided onboarding prompt, Claude Code interviews you to extract key information. It then automatically creates and populates a structured set of markdown files in folders like `me/` (personal details), `work/` (business info), `team/`, `context/priorities/`, and `projects/`. This gives the assistant deep knowledge about you, your goals, and your current workload.

### Phase 3: Give It Hands

This phase is about enabling the assistant to *do* things. The instructor demonstrates building a **research skill** that integrates the **Perplexity API**. You explain the desired skill in natural language, Claude Code researches the API, creates the necessary skill file and `.env` file for your API key, and updates `claude.md` to recognize the new capability. The video also contrasts **skills** (run in the main agent's context) with **sub-agents** (independent agents with fresh context, useful for cheaper or parallel tasks).

### Phase 4: Let It Grow

The final phase emphasizes continuous improvement. The power of the assistant compounds with daily use. You are encouraged to migrate all AI tasks into this project, build new skills for repetitive work, and provide feedback to refine existing ones. Storing the project on **GitHub** is recommended for version control, cloud backup, and portability across devices. The assistant's intelligence scales directly with the depth of information in its project files and the frequency of your interactions.

## Context

This video addresses the limitation of using general-purpose AI chatbots (like Claude or ChatGPT) where you constantly repeat context. It shows how to move beyond that to create a persistent, context-aware AI assistant that is deeply integrated into your workflow. This matters for entrepreneurs, creators, and knowledge workers who want to automate administrative, research, and planning tasks to save significant time, reduce decision fatigue, and scale their personal productivity. It connects to the broader trend of moving from one-off AI prompts to building persistent, customizable AI agents.
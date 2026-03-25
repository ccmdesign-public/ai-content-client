---
metadata:
  videoId: "YpPcDHc3e9U"
  title: "\"Agents\" Means 4 Different Things and Almost Nobody Knows Which One They Need."
  description: "My site: https://natebjones.com

    Full Story w/ Prompts: https://natesnewsletter.substack.com/p/there-are-4-kinds-of-agents-and-youre?r=1z4sm5&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true

    ___________________

    What's really happening inside the agentic systems we keep calling \"agents\" as if they're all the same thing?


    The common story is that agents are just LLMs plus tools in a loop — but the reality is that sophisticated agents diverge into at least four distinct species, and confusing them leads to expensive mistakes.


    In this video, I share the inside scoop on the four agent types actually working in production:


    \ • Why coding harnesses differ at task scale versus project scale

    \ • How dark factories pull humans out of the middle entirely

    \ • What auto research optimizes that software production cannot

    \ • Where orchestration frameworks justify their coordination overhead


    Builders who treat all agents as interchangeable will waste months applying the wrong architecture to the wrong problem — the species matters as much as the model.


    Chapters

    00:00 We want agents but don't know what we want

    02:00 The four agent species overview

    04:00 Coding harnesses: the simplest agentic pattern

    06:30 Running multiple single-threaded agents

    08:30 Why decomposition is the unlock

    10:30 Project-scale coding: Cursor's planner-executor model

    13:30 When to move from individual to team-scale harnesses

    15:30 Dark factories: humans at edges only

    18:30 Why Amazon called engineers to Seattle

    20:30 Auto research: optimizing metrics not software

    23:00 Orchestration frameworks and specialized roles

    25:30 When orchestration is worth the coordination cost

    27:30 The cheat sheet: matching agent type to problem

    29:00 Don't mix up your species


    Subscribe for daily AI strategy and news.

    For deeper playbooks and analysis: https://natesnewsletter.substack.com/


    Listen to this video as a podcast.

    - Spotify: https://open.spotify.com/show/0gkFdjd1wptEKJKLu9LbZ4

    - Apple Podcasts: https://podcasts.apple.com/us/podcast/ai-news-strategy-daily-with-nate-b-jones/id1877109372"
  channel: "AI News & Strategy Daily | Nate B Jones"
  channelId: "UC0C-17n9iuUQPylguM1d-lQ"
  duration: "PT29M35S"
  publishedAt: "2026-03-25T14:00:52Z"
  thumbnailUrl: "https://i.ytimg.com/vi/YpPcDHc3e9U/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=YpPcDHc3e9U"
processedAt: "2026-03-25T14:32:10.132Z"
source: "youtube"
tldr: "The term 'AI agent' actually refers to four distinct system types: individual **coding harnesses** (like Claude Code/Cursor), project-scale **multi-agent harnesses** (like Cursor's planner-executor system), fully automated **dark factories**, metric-optimizing **auto research**, and workflow **orchestration frameworks** (like Langraph/Crew AI), each suited for different tasks and scales."
tools: []
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "engineering"
  - "llm"
  - "machine-learning"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 20653
  outputTokens: 849
  totalTokens: 21502
  processingTimeMs: 88666
tagsNormalizedAt: "2026-03-25T14:52:19.710Z"
---

## Key Takeaways

The video clarifies that 'AI agents' are not a monolithic concept but diverge into four distinct species, each with a specific use case and architecture. Understanding these differences is crucial to selecting and building effective agentic systems.

## Summary

The video argues that the simplistic definition of an 'agent' as an LLM with tools in a loop obscures four fundamentally different types of agentic systems in production today. Each type serves a distinct purpose and requires a different architectural approach.

**Coding Harnesses** are the simplest form, designed for individual developers. Examples include Claude Code or Cursor used by individuals like Andrej Karpathy, where the agent acts as a single-threaded coding assistant. The human acts as a manager, decomposing tasks and assigning them. This scales to managing multiple single-threaded agents simultaneously, as demonstrated by developers like Peter Steinberger.

**Project-Scale Multi-Agent Harnesses** are for larger, team-level work. Here, the architecture shifts: an agent (a planner) manages the project and delegates specific tasks to short-lived executor agents. The human's role moves to the beginning (defining intent) and the end (reviewing output). Cursor's work on building browsers and compilers exemplifies this, where simplicity in the agent coordination layer is key to scaling.

**Dark Factories** represent fully autonomous systems designed to eliminate human bottlenecks in the middle of the process. You input a specification and the system iterates automatically until it passes an evaluation (eval). Human involvement is primarily at the start (setting the spec) and the end (validating the eval). This approach is about optimizing for specification compliance and speed, though most enterprises still include a human code review for risk mitigation.

**Auto Research** is fundamentally different, focusing not on producing software but on optimizing a metric. Descended from classical machine learning, it uses LLMs to run experiments and 'hill climb' towards a better outcome—like optimizing a codebase's runtime performance or tuning model parameters. Andrej Karpathy's recent auto-research package is a prime example.

**Orchestration Frameworks** (like Langraph or Crew AI) are for complex workflows where specialized agents handle different stages (e.g., research, then writing, then review). This involves carefully managing handoffs and context between agents. It's valuable at high scale (e.g., handling thousands of customer tickets) but can be heavy for smaller tasks due to the required prompt and context management overhead.

The core message is to match the agent type to the problem: use a **coding harness** for individual tasks, a **project-scale harness** for team projects, a **dark factory** for fully automated spec-to-eval pipelines, **auto research** for metric optimization, and **orchestration** for multi-stage, specialized workflows.

## Context

As AI agents move from conceptual hype to real-world implementation, a critical confusion has emerged: developers and companies are using the same term ('agent') to describe vastly different systems. This leads to misapplication, frustration, and failed projects. Understanding these four distinct 'species'—coding harnesses, project-scale multi-agent systems, dark factories, and auto-research—is essential for anyone building or deploying agentic AI in 2026, from individual developers to enterprise engineering teams. This framework provides the necessary clarity to choose the right architectural pattern for the task at hand.
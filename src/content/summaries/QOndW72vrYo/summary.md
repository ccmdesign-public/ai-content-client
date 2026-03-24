---
metadata:
  videoId: "QOndW72vrYo"
  title: "Andrej Karpathy's AI Agent Blueprint! 10 Principles!"
  description: "This video highlights how Andrej Karpathy's autoresearch agent, running on a 630-line Python script, identified bugs in his own work that a 20-year expert had missed. It showcases principles for ai agents development, such as treating instructions as tunable code and investing in persistent, looping setups. This demonstrates the power of deep research and how ai coding agents are impacting productivity.



    ----

    🚀 Want to learn agentic coding with live daily events and workshops?

    Check out Dynamous AI: https://dynamous.ai/

    Get 10% off here 👉 https://shorturl.smartcode.diy/dynamous_ai_10_percent_discount

    ----


    Chapters

    0:00 Karpathy's 10 AI Agent Principles (No Priors Podcast)

    0:13 AutoResearch: 700 AI Experiments in 2 Days

    0:57 Andrej Karpathy — OpenAI, Tesla Autopilot, Eureka Labs

    1:31 AI Coding Agents: What Changed in December 2025

    2:13 Parallel Agents, Skill Issue, and Removing the Bottleneck

    3:18 Agent Orchestration and Tunable CLAUDE.md Instructions

    4:12 Agentic API Automation and Persistent AI Loops

    5:19 Dynamous AI

    5:54 Model Jaggedness, Writing Docs for Agents, Irreducible Value

    7:06 METR Study: AI Tools Make Developers 19% Slower

    8:16 Will AI Replace Programmers? The ATM Parallel

    9:04 Karpathy's Conflict of Interest — Can You Trust AI Leaders?

    9:42 The AI Coding Debate: Drop Your Take


    ---

    Sources & References:

    - Karpathy No Priors Interview: https://www.youtube.com/watch?v=kwSVtQ7dziU

    - No Priors Podcast Channel: https://www.youtube.com/@Nopriorspod

    - METR Productivity Study (July 2025): https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/

    - AutoResearch GitHub Repo: https://github.com/karpathy/autoresearch

    - Fortune \"State of Psychosis\" (March 2026): https://fortune.com/2026/03/21/andrej-karpathy-openai-cofounder-ai-agents-coding-state-of-psychosis-openclaw/

    - AEI Bank Teller/ATM Historical Data: https://www.aei.org/economics/what-atms-bank-tellers-rise-robots-and-jobs/

    - Stack Overflow Developer Survey 2025 — AI: https://survey.stackoverflow.co/2025/ai

    - Peter Steinberger — OpenClaw / Parallel Agents: https://steipete.me/posts/just-talk-to-it


    ---

    🔔 Subscribe for more AI deep dives: @DIYSmartCode

    💬 What's YOUR take? ATM wave or mobile banking wave? Comment below!


    #Karpathy #AICoding #CodeAgents #AutoResearch #LoopyEra #AIDebate #SoftwareEngineering #VibeCoding #AgenticCoding #DeveloperTools"
  channel: "DIY Smart Code"
  channelId: "UC_a85mUHqsy5j0CYCgLnkEQ"
  duration: "PT10M32S"
  publishedAt: "2026-03-23T08:46:30Z"
  thumbnailUrl: "https://i.ytimg.com/vi/QOndW72vrYo/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=QOndW72vrYo"
processedAt: "2026-03-24T20:25:47.904Z"
source: "youtube"
tldr: "Andrej Karpathy outlines 10 principles for AI agent workflows after his auto-research agent ran 700 experiments overnight, finding bugs he'd missed for years, fundamentally shifting developer roles from coding to directing."
tools:
  - name: "OpenAI"
    url: null
  - name: "WhatsApp"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "engineering"
  - "productivity"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6876
  outputTokens: 1137
  totalTokens: 8013
  processingTimeMs: 249913
tagsNormalizedAt: "2026-03-24T22:57:23.784Z"
---

## Key Takeaways

Andrej Karpathy's 10 principles for AI agent workflows represent a paradigm shift in software development.

- **Shift from coding to directing**: Karpathy went from 80/20 coding himself to 20/80 directing agents, describing this as "expressing my will" rather than writing code.

- **Treat instructions as tunable code**: Agent instruction files (markdown) should be optimized like hyperparameters, with research organizations potentially being defined by these files.

- **Build persistent, autonomous loops**: Set up agents that run experiments overnight (like his 700-experiment run) with their own evaluation criteria and sandbox environments.

- **Focus on irreducible creative insight**: Your value lies in what agents can't do—creative judgment, novel framing—while delegating everything else.

## Summary

Andrej Karpathy, former OpenAI co-founder and Tesla Autopilot lead, experienced a fundamental shift in December 2025 when his workflow changed from 80% writing code himself to 80% directing AI agents. He now spends 16 hours daily directing agents rather than coding, calling this state "AI psychosis"—the feeling that everything is possible and unexplored.

His auto-research agent ran 700 experiments overnight in a 630-line Python script, finding misconfigured weight decay, wrong Adam betas, and overly conservative attention windows in his own work that he'd missed for years. This demonstrated that AI could outperform decades of expert intuition on verification tasks.

### The 10 Principles for AI Agent Workflows

**1. Think in macro actions, not lines of code**: Delegate whole features rather than individual code snippets. Example: Peter Steinberger runs 3-8 coding agents simultaneously in a terminal grid, each assigned distinct features.

**2. Assume skill issues first**: When agents fail, it's likely your prompt, instructions, or orchestration—not the model's capability.

**3. Remove yourself as the bottleneck**: Arrange workflows to be completely autonomous, maximizing token throughput by not being in the loop.

**4. Build muscle memory for agent orchestration**: Develop skills for tiling multiple agents, parallelizing vs sequencing tasks, and reviewing outputs efficiently.

**5. Treat agent instructions as tunable code**: Instruction files are code you iterate on—run variants, see which produce better outcomes, and let agents write better instructions.

**6. Replace bespoke apps with agent-driven API glue**: Stop using multiple UIs; if tools expose APIs, a single agent can orchestrate across all of them. Karpathy unified his smart home (lights, HVAC, cameras, pool) into one WhatsApp-driven assistant called Dobby.

**7. Invest in persistent looping setups**: Move beyond single sessions to agents that keep working when you're not watching. Shopify's CEO ran 37 experiments overnight where a smaller model beat a larger one.

**8. Understand model improvements are jagged**: Models excel at verifiable tasks but struggle with nuance, humor, and intent—design workflows around these blind spots.

**9. Write documentation for agents, not humans**: Create markdown for agents to understand your codebase; they'll explain it to humans with infinite patience.

**10. Focus energy exclusively on what agents can't do**: Your value is irreducible creative insight, taste judgment, and novel framing that agents can't yet produce.

### The Developer Debate

The video presents conflicting evidence: a Meta study found developers using AI tools were 19% slower than those without them, yet 84% of developers use AI coding tools. Review times are up 91%, and AI-assisted codebases show more security vulnerabilities.

The community is split: some developers feel they've lost their experience advantage and passion for programming, while others (like a single mother of three) build things they never could before. A 25-year veteran shipped a full production system in two weeks over Christmas without writing a single line.

Karpathy himself expressed skepticism in October 2025, calling AI agents "slop" and saying models weren't ready, then declared the era of manual programming over by March 2026—raising questions about whether this represents genuine evidence or advocacy from someone whose livelihood depends on adoption.

## Context

This video addresses the fundamental transformation happening in software development as AI agents become capable of running hundreds of experiments overnight and finding bugs that human experts miss for years. The debate centers on whether this represents an ATM moment (creating more jobs than it destroys) or a mobile banking moment (where real disruption eliminates roles). Developers, AI researchers, and tech leaders need to understand these principles as the industry shifts from manual coding to agent orchestration.
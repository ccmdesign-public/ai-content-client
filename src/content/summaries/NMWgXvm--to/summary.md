---
metadata:
  videoId: "NMWgXvm--to"
  title: "Stripe's Coding Agents Ship 1,300 PRs EVERY Week - Here's How They Do It"
  description: "Stripe merges over 1,300 AI-written pull requests every single week. Zero human-written code. But here's what most people are missing - the real lesson is in the agent harness they have built around their coding agents.


    Stripe calls them \"blueprints\" - workflows that alternate between deterministic steps (linting, type checking, CI) and agentic steps (where the AI reasons and writes code). The walls constrain the AI. The AI does the creative work. And together, they produce production-quality code at a pace most companies can't match with human developers.


    And Stripe isn't the only one. Shopify independently built the same architecture (Roast). Amazon used the same pattern to save 4,500 developer-years. Airbnb migrated 3,500 test files in 6 weeks with it. Every company succeeding with AI coding at scale is converging on the same hybrid deterministic-agentic workflow.


    In this video, I'll break down the pattern and explain what it means for how you should be thinking about AI coding.


    ~~~~~~~~~~~~~~~~~~~~~~~~~~


    Try Postman's New AI-Powered Platform:

    https://fandf.co/4l1bNwj


    Postman FastAPI Demo (My GitHub Repo):

    https://fandf.co/3OY3plf


    ~~~~~~~~~~~~~~~~~~~~~~~~~~


    - If you want to dive even deeper into building reliable and repeatable systems for AI coding, check out the Dynamous Community and Agentic Coding Course:

    https://dynamous.ai/agentic-coding-course


    - Stripe Minions Blog Post (Part 1):

    https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents


    - Stripe Minions Blog Post (Part 2):

    https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2


    - Shopify Roast Framework:

    https://github.com/Shopify/roast


    ~~~~~~~~~~~~~~~~~~~~~~~~~~


    0:00 Stripe's 1,300 AI Pull Requests

    1:56 Structured AI Workflows (The Big Unlock)

    4:13 Intro to Stripe Minions

    5:24 Blueprints: Workflows vs Agents

    7:29 The Minion Workflow Walkthrough

    8:55 Postman

    10:56 Back to the Minion Walkthrough

    11:10 Isolated Dev Boxes and Security

    13:13 The Importance of Determinism

    14:44 The PIV Loop Strategy

    16:34 Tools to Build Your Own


    ~~~~~~~~~~~~~~~~~~~~~~~~~~


    Join me as I push the limits of what is possible with AI. I'll be uploading videos weekly - at least every Wednesday at 7:00 PM CDT!"
  channel: "Cole Medin"
  channelId: "UCMwVTLZIRRUyyVrkjDpn4pA"
  duration: "PT18M50S"
  publishedAt: "2026-03-12T00:00:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/NMWgXvm--to/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=NMWgXvm--to"
processedAt: "2026-03-12T15:17:19.582Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Stripe ships 1,300 AI-written PRs weekly using their internal 'Minions' agent harness, which combines deterministic workflow nodes (linting, testing, context curation) with AI agent nodes to ensure reliability for their complex Ruby codebase handling $1 trillion/year in payments."
tools:
  - name: "Slack"
    url: null
  - name: "MCP"
    url: null
  - name: "Postman"
    url: null
  - name: "AWS EC2"
    url: null
  - name: "Sorbet"
    url: null
  - name: "GitHub"
    url: null
  - name: "Roast"
    url: null
  - name: "Claude API SDK"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "automation"
  - "engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 14382
  outputTokens: 1075
  totalTokens: 15457
  processingTimeMs: 30024
tagsNormalizedAt: "2026-03-12T16:12:28.761Z"
---

## Key Takeaways

Stripe's 'Minions' system demonstrates how large companies are making AI coding reliable at scale. Key insights include:

## Summary

Stripe's engineering team has achieved a remarkable milestone: shipping over 1,300 AI-written pull requests every week through their internal system called **Minions**. This represents about 16% of their total weekly PR volume (8,000+). The key innovation isn't just using AI coding assistants, but building a **structured workflow system** that controls the agents rather than letting agents control everything.

### The Core Pattern: Blueprints

Minions operates on **blueprints** - predefined workflows that combine **deterministic nodes** (guaranteed code execution) with **agent nodes** (AI-powered steps). This hybrid approach ensures reliability:

- **Deterministic nodes** handle predictable tasks: context curation, linting, type checking, test execution

- **Agent nodes** handle creative tasks: code implementation, fixing issues identified by deterministic checks

The system enforces that agents must retry when validation fails, preventing the common problem where AI assistants might skip important validation steps.

### Technical Architecture

The workflow begins with **context curation** - a deterministic step that searches through Stripe's massive internal documentation and 500+ MCP tools in their **Tool Shed** server. This ensures the agent receives only relevant tools and information, preventing tool overload.

All development happens in **isolated AWS EC2 instances** called "dev boxes" that are spun up and torn down per task ("cattle, not pets"). These come preloaded with Stripe's codebase, lint caching, and all necessary dependencies for blazing-fast execution.

### Validation at Scale

Stripe's validation process is particularly impressive given their scale:

- They have over **3 million tests** in their CI
- The system runs only a relevant subset of tests against changes

- Agents get maximum **two iterations** to fix test failures before escalating to human engineers

- All AI-written code still undergoes **human review** before merging

### Why Determinism Matters

Stripe explains that writing deterministic code for predictable decisions (like always linting changes) saves tokens/costs and gives the agent "less opportunity to get things wrong." By putting LLMs in "contained boxes" with separate deterministic steps, they achieve systemwide reliability that compounds across thousands of weekly PRs.

### Broader Industry Trend

This approach isn't unique to Stripe. **Shopify** has open-sourced **Roast**, their structured AI workflow engine. **Airbnb** uses similar systems for test migrations, and **AWS** has shared about their internal tooling. The industry is moving toward **structured AI workflow engines** rather than pure agentic approaches.

### How You Can Apply These Ideas

The presenter recommends the **PIV loop** (Plan, Implement, Validate) as a simplified version:
1. **Planning phase**: Agent creates structured implementation plan
2. **Implementation phase**: Fresh context window with focused agent
3. **Validation phase**: Deterministic linting, type checking, and testing

This approach can be implemented using **Shopify's Roast** as a reference (open-source), or by building custom workflows with tools like the **Claude API SDK**. The key is separating planning, implementation, and validation into distinct phases with deterministic enforcement where possible.

## Context

This matters because it shows how leading tech companies are moving beyond simple AI coding assistants to structured systems that make AI-generated code reliable enough for production use at massive scale. For developers and engineering leaders, it provides a blueprint for implementing AI coding workflows that maintain quality while dramatically increasing productivity. This represents a fundamental shift from giving power to AI agents to giving power to systems that control AI agents.
---
metadata:
  videoId: "yAx8-_IYdWI"
  title: "Goose Is Destroying Pi.dev and Claude Code"
  description: "This video highlights \"Goose,\" an \"open source ai\" agent with extensive GitHub stars and contributors, capable of multi-model operation and supporting thousands of servers. It contrasts Goose with paid \"coding with ai\" assistants, emphasizing its flexibility and cost-effectiveness. The video also showcases features like \"Calendar Injection\" and \"Multi-Model Mode,\" demonstrating its advanced capabilities for \"ai automation.\"


    ----

    Learn Agentic Coding with Dynamous AI - Daily Events and Workshops (https://dynamous.ai/?code=646a60) - 10% off with our link: https://shorturl.smartcode.diy/dynamous_ai_10_percent_discount

    ----


    Chapters

    0:00 Preview

    0:13 The $200 Problem

    0:58 What Is Goose

    1:45 Architecture: The Agent Loop

    2:35 MCP Extensions (3,000+)

    3:22 Model Freedom (30+ Providers)

    4:08 Recipes: The Killer Feature

    4:56 [Dynamous AI Break]

    5:27 Subagent Orchestration

    6:23 Operation Pale Fire (Security)

    7:40 Goose vs Pi.dev

    8:40 Goose vs Claude Code

    9:23 Proof & Governance (AAIF)

    10:18 Try Goose Today



    Key Features:

    - 30+ LLM providers (Anthropic, OpenAI, Google, xAI, Mistral, Groq, Ollama)

    - Multi-model mode: different models for planning vs execution

    - MCP-native extension system (3,000+ servers, interoperable)

    - Recipes: YAML workflows with parameters, retry logic, cron scheduling

    - Up to 10 parallel isolated subagents per session

    - 60% of Block's workforce uses Goose weekly

    - 50-75% reported reduction in development time

    - Apache 2.0 license, donated to Linux Foundation AAIF


    Resources:

    - Goose: https://block.github.io/goose/

    - GitHub: https://github.com/block/goose

    - Install: curl -fsSL https://get.goose.ai | bash

    - Operation Pale Fire blog: https://engineering.block.xyz/blog/how-we-red-teamed-our-own-ai-agent-

    - Agentic AI Foundation: https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation

    - Pi.dev (comparison): https://pi.dev

    - Our Pi.dev deep dive video: https://youtu.be/KiplOks4NAs

    - AI BriefMe Webapp (built in 40 min with Goose): https://www.youtube.com/watch?v=NtAyOP-zlvo


    What's your take: Goose, Pi.dev, or Claude Code? Which one fits YOUR workflow? Drop your pick in the comments!


    #Goose #Block #AICodingAgent #OpenSource #ClaudeCode #MCP #ModelContextProtocol #AIAgent #FreeCodingTool #LLM #AgenticAI #PiDev #LinuxFoundation #Recipes #OperationPaleFire"
  channel: "DIY Smart Code"
  channelId: "UC_a85mUHqsy5j0CYCgLnkEQ"
  duration: "PT10M50S"
  publishedAt: "2026-02-25T08:09:43Z"
  thumbnailUrl: "https://i.ytimg.com/vi/yAx8-_IYdWI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=yAx8-_IYdWI"
processedAt: "2026-02-26T23:43:25.446Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Goose is a free, open-source AI coding agent built by Block for internal use and now governed by the Linux Foundation; it supports 30+ LLMs, runs locally, uses MCP for extensions, and eliminates vendor lock-in."
tools:
  - name: "Goose"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "Ollama"
    url: null
  - name: "Amazon Bedrock"
    url: null
  - name: "Express.js"
    url: null
  - name: "Docker"
    url: null
  - name: "Playwright"
    url: null
  - name: "PostgreSQL"
    url: null
  - name: "GitHub"
    url: null
  - name: "Slack"
    url: null
  - name: "Stripe"
    url: null
  - name: "Snowflake"
    url: null
  - name: "Linear"
    url: null
  - name: "Notion"
    url: null
  - name: "Rust"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "llm"
  - "open-source"
  - "devtools"
  - "workflow-automation"
  - "agentic-ai"
  - "model-agnostic"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7623
  outputTokens: 1141
  totalTokens: 8764
  processingTimeMs: 79165
---

## Key Takeaways

Goose is an enterprise-grade AI coding agent that addresses key limitations of commercial tools. Key insights include:

- **Vendor-agnostic freedom**: Works with 30+ LLM providers, runs fully locally for privacy, and has zero cost under Apache 2.0.

- **Built for teams**: Features version-controlled **recipes** (YAML workflows) and can spawn up to 10 parallel sub-agents for complex tasks.

- **Secure by design**: Underwent red team security testing with findings published transparently, and uses a self-correcting six-step agent loop.

- **Industry-backed infrastructure**: Donated to the Linux Foundation with co-governance by Amazon, Google, Microsoft, Anthropic, and others.

## Summary

Goose is an open-source AI coding agent originally developed internally at Block (the company behind Square and Cash App) to solve four constraints their 10,000 engineers faced: high agentic capability, model agnosticism, local/offline operation, and zero cost. After demonstrating 50-75% development time savings, Block open-sourced it in December 2025 under the Linux Foundation's Agentic AI Foundation, with major tech companies co-governing.

**Technical Architecture**
Goose is built with a Rust core (58%) for performance and a TypeScript/Electron desktop app (33%) for the GUI. It operates via a six-step agent loop where human requests go to an LLM, which returns JSON tool calls; Goose executes them and sends results back, with a context revision step to save tokens. Crucially, it self-corrects by feeding errors back to the model instead of crashing.

**Key Features**
- **Model Flexibility**: Supports 30+ providers (Claude, OpenAI, Google Gemini, Grok, Mistral, etc.), enterprise platforms (Amazon Bedrock, GCP), and local options like Ollama.

- **Multi-Model Mode**: Allows using different models for planning (e.g., Claude Opus) and execution (e.g., a fast local model) to optimize cost and quality.

- **Extension System**: Uses the **Model Context Protocol (MCP)** with 3,000+ available servers (GitHub, Slack, Docker, Playwright, PostgreSQL, etc.) that also work in Cursor and Claude Desktop.

- **Recipes**: Version-controlled YAML files that bundle instructions, extensions, parameters, and retry logic into executable, shareable workflows.

- **Multi-Agent Orchestration**: Can spawn up to 10 parallel sub-agents with isolated contexts, demonstrated by building a full-stack app with seven specialized agents in 40 minutes.

**Security & Adoption**
Block's offensive security team conducted a red team operation (Pale Fire) testing prompt injection and social engineering attacks, publishing all findings and fixes. Goose has 31,000 GitHub stars, 401 contributors, and is used weekly by 60% of Block's workforce.

**Comparison to Alternatives**
Unlike Claude Code (locked to Claude models, $200/month) or Cursor (curated model selection), Goose offers complete freedom. Compared to Pi.dev (which uses npm packages and persistent state machines), Goose is MCP-native with recipes and sub-agent isolation. The choice boils down to convenience (Claude Code's polish) versus freedom (Goose's flexibility).

## Context

This matters because AI coding assistants are becoming essential productivity tools, but most lock users into specific models, cloud dependencies, and subscription costs. Goose represents a shift toward open, interoperable infrastructure that gives developers control over their AI tools. Built by a major fintech company for enterprise-scale use and now backed by industry-wide governance, it signals a move away from proprietary ecosystems toward neutral, community-driven platforms. Engineers and teams seeking to avoid vendor lock-in, ensure data privacy, and share reproducible workflows should pay attention.
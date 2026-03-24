---
metadata:
  videoId: "ffyibtyk-LQ"
  title: "Stop Paying for Perplexity API! (Web MCP Reveal)"
  description: "Stop wasting money on API credits for your research workflows. This is the Perplexity Web MCP - a total game-changer that lets you run Perplexity’s most powerful models directly from your CLI or as an MCP server without an API key.


    In this reveal, I’m showing you how to bridge your Perplexity Pro subscription into your AI tools. We’re talking full access to GPT-5.4, Claude 4.6 Sonnet, and deep research capabilities, all through any AI tool. I’ll walk you through the setup, show you how to bypass the \"API tax,\" and even demo a wild integration that injects Perplexity models into Claude code. If you’re an AI builder, developer, or an AI power user, you need this in your toolkit.


    Key Takeaways:

    🚀 Use Perplexity Subscription as MCP & CLI

    🛠️ Full setup guide for Perplexity Web MCP.

    🤯 Exclusive demo: Injecting Perplexity into Claude Code


    Resources:

    ---

    👨🏽‍💻 Preplexity Web MCP & CLI Github Repo: https://github.com/jacob-bd/perplexity-web-mcp

    📰 Join the Gen AI Spotlight AI News Channel on Telegram: https://t.me/genaispot/

    ⏱️ Follow GenAI Spotlight on TikTok: https://www.tiktok.com/@genai.spotlight

    #️⃣ Follow GenAI Spotlight on X: https://x.com/GenAISpotlight\ 

    --


    Chapters:

    0:00 The Perplexity \"API Tax\" Problem

    0:41 What is Perplexity Web MCP?

    1:10 Installation & Setup Guide

    1:46 How to log in

    2:40 Asking Perplexity with CLI

    3:27 Checking Perplexity Usage and Limits

    3:45 MCP Setup made easy

    4:47 Perplexity Skill install

    5:00 Running Deep Research in CLI

    6:15 Using the MCP with Codex

    7:43 CLI Doctor

    8:14 Deep research command

    8:30 The Secret Sauce: Perplexity inside Claude

    9:54 Final Thoughts


    #PerplexityAI #MCP #AItools #VibeCoding"
  channel: "Gen AI Spotlight"
  channelId: "UCmElaQGQUojeNGu3Xg9urbg"
  duration: "PT10M48S"
  publishedAt: "2026-03-18T19:30:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ffyibtyk-LQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ffyibtyk-LQ"
processedAt: "2026-03-24T22:05:24.761Z"
source: "youtube"
tldr: "Introduces 'Perplexity Web MCP', an open-source CLI and MCP server that provides free access to Perplexity's powerful web search and research capabilities (including models like GPT-4 and Claude Opus) directly within AI coding tools like Cursor and Claude Code, bypassing the need for a paid API."
tools:
  - name: "Perplexity Web MCP"
    url: null
  - name: "uv"
    url: null
  - name: "pip"
    url: null
  - name: "pex"
    url: null
  - name: "uvx"
    url: null
  - name: "Cursor"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Codeium"
    url: null
  - name: "Gemini"
    url: null
  - name: "Anti-Gravity"
    url: null
  - name: "Notebook LM"
    url: null
  - name: "OpenAI"
    url: null
  - name: "Anthropic Claude"
    url: null
  - name: "Kodium"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "mcp"
  - "open-source"
  - "productivity"
  - "prompt-engineering"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7020
  outputTokens: 1145
  totalTokens: 8165
  processingTimeMs: 43021
tagsNormalizedAt: "2026-03-24T22:59:30.220Z"
---

## Key Takeaways

This video reveals a free, open-source alternative to the Perplexity API for integrating advanced AI-powered search into development workflows. Key insights include: • **Perplexity Web MCP** is a **CLI and MCP server** that uses your Perplexity Pro account's web interface to provide search, deep research, and multi-model access without API costs. • It supports integration with **major AI coding tools** like Cursor, Claude Code, and Codeium, and includes a custom **AI skill** for optimal tool usage. • The tool offers **command-line functionality** for direct queries, research tasks, system diagnostics, and usage monitoring, making it a versatile addition to a developer's toolkit.

## Summary

The video presents 'Perplexity Web MCP', a project that unlocks Perplexity's advanced search and AI model access for integration into other tools without requiring a paid API subscription. The creator demonstrates it's both a Command Line Interface (CLI) and a Model Context Protocol (MCP) server.

The core functionality leverages a user's existing Perplexity Pro subscription through the web interface. After a simple email-based login via the CLI (`pwm login`), users gain access to Perplexity's suite of models, including GPT-4, Claude Opus, and Gemini, for both simple queries and deep research.

### Installation and Setup

Installation is straightforward using package managers like `uv`. The tool's setup command (`pwm setup add`) allows for easy integration with supported AI coding environments, including Cursor, Claude Code, Codeium, and Gemini CLI. For unsupported tools, it generates a configuration JSON.

### Key Features and Usage

*   **CLI Power:** The `pwm` command can be used directly to ask questions (`pwm ask`), specifying models with flags (e.g., `-m gpt4`). It returns answers with citations.

*   **Tool Integration:** Once set up, the MCP server makes Perplexity available as a tool within connected IDEs. A custom **AI skill** is also provided, which teaches the AI assistant (like Claude in Cursor) how to use the tool effectively, including checking usage quotas before executing Pro searches.

*   **Advanced Commands:** The tool includes a `doctor` command for diagnostics, a `research` command for initiating deep searches, and a `usage` command to monitor query limits.

The video includes a demo within Codeium, showing an AI assistant successfully using the integrated Perplexity tool to perform a 'Pro search' and identify 'Kodium' as an underrated AI coding tool. A final 'gimmick' demo shows the interface running inside Claude Code itself.

The project is **open-source** (MIT licensed) and available on GitHub. The creator encourages contributions and highlights its utility for developers who want to seamlessly incorporate web research and multi-model AI queries into their coding workflow without additional API expenses.

## Context

This matters because Perplexity Pro is a popular paid service ($20/month) for AI-powered web search and research, often used by developers and knowledge workers. Direct API access is expensive or limited. This tool democratizes access by allowing anyone with a Perplexity Pro subscription to pipe its capabilities—including cutting-edge models from OpenAI, Anthropic, and Google—into their preferred AI-augmented coding environments (like Cursor) for free. It taps into the growing trend of the Model Context Protocol (MCP), which standardizes how AI tools connect to external data sources and services, making advanced AI workflows more accessible and integrated.
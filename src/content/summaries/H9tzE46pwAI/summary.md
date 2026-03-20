---
metadata:
  videoId: "H9tzE46pwAI"
  title: "I Tried Codex App (GPT-5.4) to Build a Telegram Bot: Is it \"Usable\"?"
  description: "I decided to test the Codex App (not CLI) for something more serious than just a few prompts.


    Related video for Premium Substack members:\ 

    \"Code Quality Test: Opus 4.6 and GPT-5.4 Built a Telegram Bot with Laravel\" https://aicodingdaily.substack.com/p/code-quality-test-opus-46-and-gpt"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT10M35S"
  publishedAt: "2026-03-10T07:00:13Z"
  thumbnailUrl: "https://i.ytimg.com/vi/H9tzE46pwAI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=H9tzE46pwAI"
processedAt: "2026-03-10T16:10:12.948Z"
source: "youtube"
tldr: "Testing GPT-5.4 in Codex App to build a Telegram bingo bot revealed its multi-thread project management is useful, but poor real-time feedback and failure to use Laravel Boost MCP make it inferior to Codex CLI for serious development."
tools:
  - name: "Codex App"
    url: null
  - name: "GPT-5.4"
    url: null
  - name: "Laravel"
    url: null
  - name: "Laravel Boost"
    url: null
  - name: "Telegram Bot API"
    url: null
  - name: "VS Code"
    url: null
  - name: "Codex CLI"
    url: null
  - name: "Cloud Code"
    url: null
  - name: "Polycope"
    url: null
  - name: "Beyond Code"
    url: null
  - name: "Solo"
    url: null
  - name: "Superset"
    url: null
  - name: "Claude"
    url: null
  - name: "OpenAI"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "automation"
  - "chatgpt"
  - "llm"
  - "mcp"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7199
  outputTokens: 948
  totalTokens: 8147
  processingTimeMs: 33695
tagsNormalizedAt: "2026-03-10T16:44:00.431Z"
---

## Key Takeaways

The video compares user experience and tool performance across three AI coding platforms. Key findings include:

- **Codex App's UI** is convenient for managing multiple projects and threads but provides **minimal real-time feedback** during execution.

- A critical **MCP integration failure** with Laravel Boost prevents the app from accessing framework-specific tools, unlike the working CLI version.

- **Code quality varies** between platforms, with Codex App producing inline validation and Cloud Code sometimes omitting validation entirely.

- For **agentic workflows** with GPT models, Codex CLI offers the best **detailed terminal output** and reliable tool calling.

## Summary

The creator tested the GPT-5.4 model within the Codex App, Codex CLI, and Cloud Code platforms to build a simplified Laravel-based Telegram bingo bot. The goal was to evaluate the **user experience and agentic workflow** beyond just the model's output.

The **Codex App** offered a structured interface with a sidebar for multiple projects and threads, which was useful for breaking the bot development into phases (phase one, phase two). It allowed switching between running tasks and reviewing history with file change logs. However, during execution, the feedback was too brief—requiring constant clicking to expand details on tool calls, terminal commands, and file changes. This made it hard to follow the AI's actions in real-time compared to the **streaming, detailed output** of the Codex CLI or Cloud Code.

A major technical flaw was discovered: the Codex App failed to detect and use the **Laravel Boost MCP** (Model Context Protocol), a package that provides Laravel-specific tools like documentation search and artisan command helpers. Despite being configured and enabled, the app reported empty MCP resources. This forced the AI to work from basic project instructions, potentially guessing instead of using optimized framework tools. In contrast, the **Codex CLI successfully activated and used Laravel Boost** immediately.

The final **code quality assessment** showed differences between platforms. For example, in the Telegram webhook controller, Codex App added validation rules inline, while Codex CLI used Laravel's Form Request validation (a better practice). Cloud Code, in one instance, generated a controller with no validation at all. The creator concluded that while all three platforms could generate working code, the **development experience and reliability of tool integration** are crucial for longer tasks.

Ultimately, the creator will not continue using Codex App for now, preferring Codex CLI for its superior transparency and working MCP integrations, despite the app's polished multi-project management.

## Context

This evaluation matters for developers using AI agents for serious software projects. As tools like Codex, Claude Code, and others compete, the user experience—how well they integrate with existing workflows, provide feedback, and leverage specialized tools—becomes as important as the raw AI model's capability. The video highlights that choosing an AI coding platform requires testing not just code generation, but also its agentic workflow and ecosystem integration.
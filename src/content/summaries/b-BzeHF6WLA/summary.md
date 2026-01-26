---
metadata:
  videoId: "b-BzeHF6WLA"
  title: "Open Responses - The NEW Standard API for Open Models"
  description: "In this video, I look at the Open Responses Standard that's been released by OpenAI to support open models with their Responses SDK


    Site: https://www.openresponses.org/

    HF: https://huggingface.co/blog/open-responses

    Demo:  https://github.com/samwit/Open-Responses-Demo


    For more tutorials on using LLMs and building agents, check out my Patreon

    Patreon: https://www.patreon.com/SamWitteveen

    Twitter: https://x.com/Sam_Witteveen\ 


    🕵️ Interested in building LLM Agents? Fill out the form below

    Building LLM Agents Form: https://drp.li/dIMes


    👨‍💻Github:

    https://github.com/samwit/llm-tutorials


    ⏱️Time Stamps:

    00:00 Intro

    00:26 Gemini Interactions API

    00:38 OpenAI Responses API

    02:33 Open Responses Docs

    04:06 Open Responses Early Adopters

    05:27 Key Principles: Agentic Loop

    05:31 Key Principles: Items - Items

    06:14 Reasoning

    07:33 Tools

    09:52 Open Responses on Hugging Face

    10:22 Demo using Ollama"
  channel: "Sam Witteveen"
  channelId: "UC55ODQSvARtgSyc8ThfiepQ"
  duration: "PT15M53S"
  publishedAt: "2026-01-20T13:30:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/b-BzeHF6WLA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=b-BzeHF6WLA"
processedAt: "2026-01-21T19:21:06.538Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "OpenAI's new Open Responses API standard aims to unify how developers interact with open models (like Llama, Qwen, Kimi) by providing a single, agent-focused interface for tool calling, reasoning, and streaming, but faces competition from Anthropic's API, which Chinese model providers are already adopting."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3714
  outputTokens: 849
  totalTokens: 4563
  processingTimeMs: 64992
tools:
  - name: "Open Responses"
    url: "https://www.openresponses.org/"
  - name: "Hugging Face"
    url: "https://huggingface.co/blog/open-responses"
  - name: "Ollama"
    url: null
  - name: "Anthropic's Claude API"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Vercel"
    url: null
  - name: "Open Router"
    url: null
  - name: "LM Studio"
    url: null
  - name: "vLLM"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - llm
  - api-design
  - agents
  - claude
---

## Key Takeaways

The video analyzes OpenAI's new Open Responses API standard and its implications for the open-source AI ecosystem.

*   **Open Responses is a new standard** designed to unify API interactions with open models for features like tool calling, reasoning traces, and streaming, making it easier to switch between models.

*   **Anthropic's Claude API is already a de facto standard**, especially among Chinese model providers (like Moonshot AI, ZAI) who prioritize compatibility with Claude Code and coding tools.

*   **The standard supports advanced features** like server-side hosted tools, agentic loops, and structured reasoning outputs (both raw tokens and summaries), which are key for modern AI applications.

*   **Practical adoption is mixed**; while Hugging Face, Vercel, Open

Router, LM Studio, and Ollama support it, not all models fully implement features like reasoning, and Anthropic compatibility remains a strong alternative.

## Summary

OpenAI has introduced the **Open Responses API**, a proposed standard to create a unified interface for interacting with various open-source AI models. This initiative responds to the growing fragmentation in the AI API landscape, where each major provider (OpenAI, Anthropic, Google) has its own proprietary format, forcing developers to rewrite code for different models.

The standard is designed for **agentic and system-level applications**, moving beyond simple chat completions. It natively supports **tool calling, multimodal inputs, streaming, and structured reasoning outputs**. A key innovation is handling **reasoning traces**, allowing models to return either raw reasoning tokens or summaries, addressing a point of frustration where open models previously implemented reasoning in incompatible ways.

### Competition from Anthropic
However, OpenAI faces significant competition. **Anthropic's Claude API** has emerged as an unofficial standard, particularly for coding applications via **Claude Code**. Chinese model providers like Moonshot AI and ZAI are explicitly training their models for Claude API compatibility to tap into that ecosystem, a trend Ollama has also recently adopted.

### Technical Implementation and Support
Technically, Open Responses builds on OpenAI's existing Responses API, introducing the concept of **"items"** to represent different states in an agentic loop (messages, tool calls, reasoning steps). It also supports **server-side hosted tools** (like code sandboxes) and **tool choice** parameters.

Early community adopters include **Hugging Face, Vercel, Open

Router, LM Studio, Ollama, and vLLM**. The video demonstrates the API working with models like **GPT-O1-128B (via Open

Router) and Llama 3.2 (via Ollama)** for basic calls, streaming, and tool calling, though reasoning support is still hit-or-miss across models.

The presenter concludes that if major open-model frontier labs (Qwen, Deep

Seek, etc.) adopt Open Responses, it could significantly lower the barrier to using powerful open models locally. Yet, the parallel growth of Anthropic's ecosystem suggests the API standardization battle is far from over, with 2026 likely seeing more model providers acting as full **"system providers"** with hidden server-side functionality.

## Context

This matters because the AI development landscape is fragmented. Developers building applications with AI face constant friction when switching between models from different providers, as each has its own API format. A unified standard reduces this overhead, accelerates development, and makes open-source models more accessible and interchangeable. This is crucial for the growth of agentic AI, where models need to reliably use tools, reason, and handle complex loops. The competition between OpenAI's standard and Anthropic's existing traction highlights a strategic battle to define the foundational interfaces of the next generation of AI applications.
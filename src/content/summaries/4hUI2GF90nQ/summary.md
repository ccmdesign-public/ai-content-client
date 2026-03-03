---
metadata:
  videoId: "4hUI2GF90nQ"
  title: "Why opencode is totally underappreciated"
  description: "Opencode matters more than you might think. Not only does it look stellar, but it also gives us an alternative to go to if any of the big LLM providers start charging too much for their tokens.\ 

    So in this video we'll do a small deep dive on how to set it up with ollama and with marimo.\ 

    00:00 What is opencode

    00:58 Opencode demo

    02:25 Ollama in opencode

    06:25 Opencode in marimo"
  channel: "marimo"
  channelId: "UCKSXs4jiLetyWsW5Lba3ZjQ"
  duration: "PT10M58S"
  publishedAt: "2026-01-16T15:34:35Z"
  thumbnailUrl: "https://i.ytimg.com/vi/4hUI2GF90nQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=4hUI2GF90nQ"
processedAt: "2026-01-17T17:02:45.767Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Open code is a terminal-based AI coding agent offering an open-source alternative to proprietary tools. It provides an **insurance policy** against vendor lock-in by supporting local and open models.

  - **Local LLM support**: Connects to **Ollama** for privacy and cost savings.

  - **Tool Integration**: Uses protocol-based connections to act as an agent within editors like **Mimo**.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3594
  outputTokens: 778
  totalTokens: 6000
  processingTimeMs: 17003
tools:
  - name: "Opencode"
    url: null
  - name: "Ollama"
    url: null
  - name: "marimo"
    url: null
  - name: "Open Code Zen"
    url: null
  - name: "Open Router"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "Cursor"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "Claude Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "copilot"
  - "llm"
  - "terminal"
tagsNormalizedAt: "2026-03-01T21:19:30.389Z"
---

## Key Takeaways

Open code addresses the need for a flexible, vendor-agnostic terminal assistant that works across various LLM providers and local hardware.

- **Local Execution**: By integrating with **Ollama**, users can run powerful models locally, provided they increase the **context length** (e.g., to 64k) in settings.

- **Model Requirements**: To function as an agent, chosen models must support **tool calling** to handle file operations and code searches effectively.

- **Mimo Ecosystem**: The tool integrates directly with the **Mimo** notebook environment via a protocol connection, allowing for live, AI-driven notebook editing.

## Summary

Open code is introduced as a terminal-based alternative to tools like Claude Code, designed to give developers more control over which language models they use. It functions as a versatile wrapper that can connect to **Open Code Zen** (the platform's hosted models), **Open Router**, or local instances. This flexibility serves as an 'insurance policy,' ensuring developers can switch to open-source alternatives if proprietary API prices increase.

### Local Model Configuration

A significant portion of the video focuses on setting up **Ollama** to work with Open Code. The author emphasizes a critical configuration step: the default context length in Ollama is often too short (4k) for agentic tasks. To avoid errors, users must manually increase the **context length** to at least 64k. Furthermore, configuration requires editing a `json` file to map specific Ollama model names to the Open Code interface, ensuring exact matches to prevent connection failures.

### Ensuring Agentic Capabilities

Not all models are suitable for Open Code's advanced features. The author highlights the importance of choosing models trained for **tool calling**. Without this capability, the LLM cannot perform the 'agentic' parts of the job, such as reading or writing files and performing web searches. Even modern models like Gemma 3 must be checked for specific tool support to ensure they can interpret when they need to execute an action rather than just generating text.

### The Mimo Integration

The video demonstrates a practical application using **Mimo**, an interactive Python notebook tool. By running Mimo with the `--watch` flag, the notebook frontend automatically refreshes when changes are detected. Through a protocol-based bridge, an Open Code agent can be launched within the Mimo interface. This allows the AI to act as a 'build mode' assistant that can modify the notebook's functions and UI elements in real-time, such as adding new mathematical functions to a Taylor series explainer app.

## Context

As the market for AI coding assistants matures, developers are increasingly looking for alternatives to proprietary ecosystems like Cursor or Git

Hub Copilot. Open code represents a shift toward local-first and open-source development environments. This matters because it enables data privacy through local LLMs (via Ollama) and reduces dependency on single-vendor pricing. It connects to the broader trend of **Model Context Protocol (MCP)**—referred to as ACP in the video—which allows AI agents to interact seamlessly with different software tools. For developers using Python and interactive notebooks like Mimo, this provides a highly customizable, agentic workflow that leverages the latest open-source models.

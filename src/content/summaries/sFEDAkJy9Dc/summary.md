---
metadata:
  videoId: "sFEDAkJy9Dc"
  title: "I can't believe nobody's done this before..."
  description: "OpenAI moving the responses api from http to websockets such a huge win...


    Thank you Blacksmith for sponsoring! Check them out at: https://soydev.link/blacksmith


    SOURCES

    https://x.com/OpenAIDevs/status/2026025368650690932

    https://developers.openai.com/api/docs/guides/websocket-mode


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT18M55S"
  publishedAt: "2026-03-04T09:46:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/sFEDAkJy9Dc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=sFEDAkJy9Dc"
processedAt: "2026-03-10T15:08:47.028Z"
source: "youtube"
tldr: "OpenAI's shift from stateless REST APIs to stateful WebSockets for agentic AI workflows can reduce bandwidth by 90+% and speed up runs by 20-40% by eliminating redundant context transmission on every tool call."
tools:
  - name: "OpenAI"
    url: null
  - name: "Blacksmith"
    url: "https://soy.link/blacksmith"
  - name: "GitHub Actions"
    url: null
  - name: "Docker"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "agents"
  - "ai-general"
  - "api-design"
  - "llm"
  - "performance"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 14547
  outputTokens: 833
  totalTokens: 15380
  processingTimeMs: 54292
tagsNormalizedAt: "2026-03-10T16:43:57.578Z"
---

## Key Takeaways

OpenAI's WebSocket API fundamentally changes how AI agents handle context, offering massive efficiency gains for complex workflows.

- **Stateless REST forces full context resend** on every tool call, wasting bandwidth and compute

- **WebSockets guarantee connection persistence** to the same server, enabling in-memory state

- **Agents benefit most** where single prompts spawn hundreds of tool calls with growing context

- **This sets a new standard** that will likely be adopted across the AI industry

## Summary

OpenAI has transitioned from traditional REST APIs to WebSocket-based APIs, a seemingly technical change with profound implications for AI agent performance.

### The Problem with Stateless Architectures

Traditional REST APIs are stateless, requiring the **entire conversation history** to be resent with every request. This becomes massively inefficient for **agentic workflows** where a single user prompt might trigger dozens or hundreds of tool calls. Each tool call completion forces a full context resend to the API, often transmitting megabytes of text to generate just a few tokens in response.

### How Agents Actually Work

The video clarifies a common misconception: AI agents don't "pause" during tool execution. When a tool call is made, the model's generation finishes, and the instance is effectively terminated. The agent has **no memory** between calls—it's completely stateless. Every interaction requires reloading all previous context from scratch, which involves:

- Resending the entire history

- Rechecking authentication and permissions

- Reloading cached states (if available)
- Routing to potentially different servers each time

### The WebSocket Solution

WebSockets solve this by maintaining a **persistent connection** to the same API server throughout an agent's execution. This allows:

- **In-memory state retention** across tool calls

- **Only new data transmission** instead of full context resends

- **Elimination of redundant checks** for authentication and caching

- **Guaranteed server consistency** throughout a session

### Performance Impact

OpenAI reports **20-40% speed improvements** for agentic runs with 20+ tool calls and **90+% bandwidth reduction**. These gains come not from faster token generation, but from eliminating the overhead of context management and redundant data transmission.

### Industry Implications

This change matters because:

- **OpenAI's standards become industry defaults** (similar to their REST API patterns)
- **OpenAI has open-sourced the specification** through the Open Responses standard

- **Other providers will likely adopt** similar WebSocket implementations

- **It enables more complex agents** that were previously impractical due to context overhead

## Context

This technical deep dive addresses a fundamental inefficiency in how AI agents have been built since their inception. As AI moves from simple chat interfaces to complex multi-step agents, the underlying infrastructure needs to evolve. This change matters for developers building agentic AI applications, infrastructure engineers scaling AI systems, and anyone interested in the practical implementation details that enable next-generation AI capabilities. It represents a shift from adapting existing web protocols to designing purpose-built infrastructure for stateful AI workflows.
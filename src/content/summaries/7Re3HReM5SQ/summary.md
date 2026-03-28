---
metadata:
  videoId: "7Re3HReM5SQ"
  title: "1 Million Sandboxes Per Second?! Dynamic Workers Are INSANE"
  description: "Cloudflare's new Dynamic Workers let you programmatically create sandboxed workers on the fly, and they're 100x faster and more memory efficient than traditional containers. In this video, I'll show you how to set them up from scratch, run AI-generated code using the Claude SDK, spin up concurrent sandboxes in milliseconds, and even push it to 1 million dynamic workers running simultaneously. No matter if you're building AI agents, dev previews, or custom automations, this could be the fastest sandbox you've ever used.


    🔗 Relevant Links

    Dynamic Workers Blog post - https://blog.cloudflare.com/dynamic-workers/


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT6M44S"
  publishedAt: "2026-03-28T09:45:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/7Re3HReM5SQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=7Re3HReM5SQ"
processedAt: "2026-03-28T16:58:04.078Z"
source: "youtube"
tldr: "Cloudflare's Dynamic Workers are a new low-level, programmatically created serverless primitive that runs on V8 isolates, offering 100x faster and more memory-efficient execution than traditional containers, enabling massive-scale use cases like AI-generated code previews and custom automations with the ability to spawn up to 1 million workers per second."
tools:
  - name: "Cloudflare Workers"
    url: null
  - name: "Wrangler"
    url: null
  - name: "TypeScript"
    url: null
  - name: "Hono"
    url: null
  - name: "Anthropic SDK"
    url: null
  - name: "Claude"
    url: null
  - name: "Python"
    url: null
  - name: "Cloudflare R2"
    url: null
  - name: "E2B"
    url: null
  - name: "V8"
    url: null
  - name: "Cap'n Web"
    url: null
  - name: "Cloudflare Vibe SDK"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "ai-coding"
  - "javascript"
  - "typescript"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5606
  outputTokens: 1016
  totalTokens: 6622
  processingTimeMs: 29837
tagsNormalizedAt: "2026-03-28T18:07:11.932Z"
---

## Key Takeaways

Cloudflare's Dynamic Workers represent a fundamental shift in serverless architecture. Key insights include: • **Extreme Performance**: Dynamic Workers run on V8 isolates, making them **100x faster and more memory-efficient** than traditional containers. • **Massive Scalability**: You can programmatically spawn **up to 1 million workers per second**, enabling previously impossible use cases. • **AI Integration**: They're ideal for **running AI-generated code** in development previews and custom automations. • **JavaScript-Only Limitation**: While powerful, they're currently limited to **JavaScript/TypeScript execution**, lacking file system access.

## Summary

Cloudflare recently announced **Dynamic Workers**, a lower-level worker primitive that existing Workers can create programmatically. These run on **V8 isolates** rather than traditional containers, making them **100 times faster and more memory-efficient**. This efficiency enables massive-scale operations—Cloudflare claims you can spawn **1 million dynamic workers per second** if needed.

The video demonstrates practical implementation using **Wrangler** for configuration. In the Wrangler configuration file, you add a `worker_loaders` array with a binding (like `loader`) that allows creating and controlling other workers. The nested worker configuration includes compatibility dates and the actual code to run, which resembles standard Worker code with fetch functions.

A key distinction emerges between Cloudflare's existing **sandboxes** (full OS containers with file systems supporting any language) and **Dynamic Workers** (faster, lighter, JavaScript-only). While sandboxes offer more flexibility, Dynamic Workers excel at **unlimited concurrent execution** within regular Worker limits.

### AI Code Execution Use Case

The video highlights a major application: **running AI-generated code**. It demonstrates adapting code from the **ETB cookbook** that uses the **Anthropic SDK** with **Claude Sonet 3.5** to execute Python code. While E2B sandboxes have file system access for saving outputs like images, Dynamic Workers can achieve similar results by integrating with **Cloudflare R2** (their S3-compatible storage) for persisting outputs like generated SVGs.

### Advanced Capabilities and Limitations

Dynamic Workers support **custom bindings** (like chat room communication via Cap'n Web), **npm dependencies** (like Hono bundled via `createWorker`), and **request interception** for credential injection. However, they lack native file system access—though virtual file systems can be created using libraries—and are currently **JavaScript/TypeScript-only**.

The video concludes by showing programmatic spawning of **10,000 workers** on Cloudflare's infrastructure, demonstrating near-instant creation. While currently free during beta, Cloudflare plans future pricing, meaning massive-scale usage requires cost consideration. These workers are already powering **Cloudflare Code Mode** and **Zite** for running LLM-generated applications.

## Context

Dynamic Workers represent Cloudflare's push toward ultra-efficient, massively scalable serverless computing. This matters because it enables new categories of applications—particularly **AI-powered development tools** and **large-scale automations**—that were previously cost-prohibitive or technically impossible. Developers building AI code assistants, automated testing platforms, or multi-tenant SaaS applications should pay attention, as this technology could dramatically reduce infrastructure costs while increasing scalability. It connects to broader trends in **edge computing** and **AI integration** into development workflows.
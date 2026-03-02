---
metadata:
  videoId: "3wglqgskzjQ"
  title: "Anthropic killed Tool calling"
  description: "Full Step-by-step tutorial for Programmatic tool call setup: https://www.aibuilderclub.com/


    🔗 Links

    - Try Superdesign: http://superdesign.dev/

    - Follow me on twitter: https://twitter.com/jasonzhou1993


    ⏱️ Timestamps

    0:00 How things evolved

    5:27 Programmatic tool call

    9:10 Dynamic filtering

    10:13 Tool search

    12:15 Tool use example"
  channel: "AI Jason"
  channelId: "UCrXSVX9a1mj8l0CMLwKgMVw"
  duration: "PT14M10S"
  publishedAt: "2026-02-22T10:42:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/3wglqgskzjQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=3wglqgskzjQ"
processedAt: "2026-02-23T13:46:02.968Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Anthropic's tool calling 2.0 introduces programmatic tool calling, dynamic filtering, and tool search to drastically reduce token usage and improve agent efficiency for complex tasks by enabling LLMs to output executable code instead of just JSON."
tools:
  - name: "Anthropic"
    url: null
  - name: "MCP"
    url: null
  - name: "Cloudflare"
    url: null
  - name: "Gmail API"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "mcp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 10140
  outputTokens: 866
  totalTokens: 11006
  processingTimeMs: 57670
tagsNormalizedAt: "2026-03-01T21:19:30.530Z"
---

## Key Takeaways

Anthropic's latest tool calling updates fundamentally improve agent efficiency for complex tasks. Key insights include:

- **Programmatic tool calling** lets LLMs output executable code to batch tool operations, reducing round-trips and token consumption by 30-50%
- **Dynamic filtering** for web fetch tools extracts only relevant content from HTML, reducing token usage by ~24%
- **Tool search** defers loading of non-essential tools, potentially reducing context window usage by up to 80%
- **Tool use examples** provide concrete demonstrations for complex tools, improving accuracy from 72% to 90%

## Summary

Anthropic has released significant updates to their tool calling capabilities that address fundamental inefficiencies in how AI agents interact with external tools. The traditional tool calling approach, where LLMs output JSON to invoke single functions, creates wasteful token consumption and inefficiencies in complex workflows.

### Programmatic Tool CallingThe most impactful change is **programmatic tool calling**, inspired by concepts like executable code actions and Cloudflare's code mode. Instead of making LLMs output JSON for each tool call, they can now write executable code that batches multiple operations. This allows agents to use programming constructs like loops and conditionals to process data efficiently, keeping intermediate results within function scope rather than polluting the context window. Implementation requires adding a code execution sandbox tool and setting the `allowed_caller` parameter, with minimal changes to existing agent architectures.

### Dynamic Filtering for Web Fetch
**Dynamic filtering** specifically targets web fetch operations by adding a filtering layer that extracts only relevant content from HTML pages. This prevents large amounts of irrelevant HTML from consuming context window tokens. By pointing to the special web fetch tool version (2026209), agents automatically get this filtering capability, reducing token consumption by an average of 24%.

### Tool Search for ScalabilityThe **tool search** feature addresses the problem of loading hundreds of tool schemas into context windows. Instead, agents get access to a single tool search function (around 500 tokens) that can dynamically retrieve relevant tools when needed. This is particularly valuable for agents with more than 10 different tools or MCPs, enabling up to 80% context window optimization through deferred loading configurations.

### Tool Use Examples for Complex Tools
**Tool use examples** solve the problem of LLMs struggling with complex tool schemas. By providing concrete examples of how tools should be called, agents can better understand proper usage patterns, especially for tools with many optional parameters or complex interdependencies between fields. This approach has shown accuracy improvements from 72% to 90% on complex parameter handling tasks.

These updates collectively represent a shift toward more efficient, deterministic agent workflows that leverage LLMs' strengths in code generation rather than forcing them into rigid JSON output patterns.

## Context

This matters because traditional tool calling has been a bottleneck in agent efficiency for years, with wasteful token usage and inefficient round-trip patterns. As agents handle more complex, long-running tasks involving multiple tool calls and large datasets, these optimizations become critical for performance and cost-effectiveness. AI developers building production agents need these improvements to create scalable, reliable systems that can process large amounts of data without exhausting context windows or consuming excessive tokens.
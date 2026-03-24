---
metadata:
  videoId: "96G7FLab8xc"
  title: "Your MCP Server is Bad (and you should feel bad) - Jeremiah Lowin, Prefect"
  description: "Too many MCP servers are simply glorified REST wrappers, regurgitating APIs that were designed for SDKs, not agents. This leads to confused LLMs, wasted tokens, and demonstrably poor performance. If you've ever pointed an MCP generator at an OpenAPI spec and called it a day, this talk is your intervention.


    Like any product, great MCP servers are the result of careful design. This talk shares the hard-won lessons from creating FastMCP, the most popular framework for building MCP servers (and yes, for generating them, too). The secret is to stop thinking about endpoints and start thinking about products. We will cover the three pillars of agent-native product design—Discovery, Iteration, and Context—providing an actionable framework for curating context into small, highly effective surface areas that lead to better AI outcomes.


    Jeremiah Lowin, CEO of Prefect

    https://twitter.com/jlowin

    https://www.linkedin.com/in/jlowin

    https://github.com/jlowin"
  channel: "AI Engineer"
  channelId: "UCLKPca3kwwd-B59HNr-_lvA"
  duration: "PT54M33S"
  publishedAt: "2026-01-12T18:00:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/96G7FLab8xc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=96G7FLab8xc"
processedAt: "2026-03-24T00:43:34.088Z"
source: "youtube"
tldr: "MCP servers are often poorly designed because developers treat them as API wrappers for humans, but they should be built as curated agent interfaces optimized for AI's limitations in discovery, iteration, and context, focusing on outcomes over operations and respecting token budgets."
tools:
  - name: "fastmcp"
    url: null
  - name: "Prefect"
    url: null
  - name: "Apache Airflow"
    url: null
  - name: "Marvin"
    url: null
  - name: "Claude Desktop"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Claude Code"
    url: null
  - name: "SQLite"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "agents"
  - "api-design"
  - "llm"
  - "mcp"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 39226
  outputTokens: 1890
  totalTokens: 41116
  processingTimeMs: 332163
tagsNormalizedAt: "2026-03-24T04:11:51.596Z"
---

## Key Takeaways

Jeremiah Lowin, creator of fastmcp, argues that most MCP servers fail because they're designed for human developers rather than AI agents. The key insights are:

*   **Design for agents, not humans:** AI agents have opposite cost structures from humans—discovery is expensive (every handshake enumerates all tools), iteration is slow (each call sends full history), and context is limited (~200K tokens).

*   **Focus on outcomes, not operations:** Don't expose atomic API operations; instead, create high-level tools that complete entire workflows (like "track latest order") to avoid making the agent act as an inefficient orchestrator.

*   **Curate ruthlessly:** Start with many tools for experimentation, then aggressively reduce to essentials (aim for ~50 tools per agent total) and use clear, agent-friendly names and flattened arguments (primitives over complex objects).

*   **Treat everything as context:** Documentation, examples, and especially error messages become part of the agent's next prompt, so design them carefully—examples become contracts, and helpful errors can guide recovery.

## Summary

### Introduction and Problem Statement

Jeremiah Lowin, founder of Prefect and creator of the popular fastmcp framework, opens by acknowledging the overwhelming popularity of MCP (Model Context Protocol) and his framework, which sees millions of downloads. He states the core thesis: there are many bad MCP servers in the wild, and the talk aims to build intuition for **agentic product design**. He argues that just as we design human interfaces with user experience guidelines, we must design MCP servers—which are interfaces for AI agents—for the specific strengths and weaknesses of those agents.

Lowin strongly pushes back against the common assumption that "if a human can use an API, why can't an AI?" He points out that humans rarely use raw APIs; they use products built on top of them (websites, SDKs, apps). Similarly, **agents deserve their own optimized interface**. The fundamental differences between humans and AI agents exist on three dimensions: **discovery** (expensive for AI, cheap for humans), **iteration** (slow for AI, fast for humans), and **context** (severely limited for AI, vast for humans). An agent will "look at every piece of hay" to find a needle, so the interface must be curated.

### Core Design Principles for MCP Servers

The most important verb for MCP developers is **curate**. The goal is to distill a large amount of human-amenable information into a form suitable for a limited AI agent. MCP provides a standardized way to do this, acting as a "USB-C for the internet" for connecting LLMs to tools and data.

Lowin then presents a pseudo-workshop, fixing a hypothetical bad server through slides. The first and most critical principle is **outcomes over operations**. A bad server exposes low-level, atomic operations (get user, list orders, check status), forcing the agent to figure out the sequence and orchestration. This is slow, expensive, and error-prone. A good server exposes high-level, outcome-oriented tools like "track_latest_order(email)" that internally handle the sequence. The trap is treating the **agent as glue or orchestrator**—a task they are mediocre at—when the server can simply do it faster and more reliably.

He emphasizes designing from **agent stories** (not user stories) and naming tools for the agent, not for the developer. Tools should have clear, descriptive names that help the agent pick the right one. This aligns with best practices from companies like Block, which advocate designing "top-down from the workflow, not bottom-up from the API endpoints."

### Practical Implementation Guidelines

The second principle is to **flatten your arguments**. Avoid complex configuration dictionaries or deeply nested objects. Use top-level primitives (strings, booleans) and prefer **literals or enums** over free-form strings for constrained choices. This makes it easier for the agent to understand and use the tool correctly. Lowin notes that some clients (like Claude Desktop) have historically had issues with structured arguments, forcing frameworks to add clunky workarounds.

Third, **instructions are context**. Everything you provide—server documentation, tool docstrings, and examples—feeds into the agent's limited context window. Document thoroughly, but be cautious with examples, as they become strong implicit contracts (e.g., an example with two tags will likely result in only two tags being used). Most importantly, **errors are prompts**. A cryptic error code is useless to an agent. Design error messages to be helpful and instructive, as they become part of the agent's next prompt and can guide recovery.

Lowin also highlights underutilized spec features like the **readonly hint** annotation, which clients can use to signal safe tools and adjust user permissions (e.g., ChatGPT asks for extra confirmation for tools without this hint).

### The Critical Constraint: Token Budget

The fourth principle is to **respect the token budget**. This is a non-negotiable constraint. He illustrates this with an example of a company wanting to expose 800 endpoints: if each tool description consumed just 250 tokens, they would consume an agent's entire 200,000-token context window on handshake alone. Servers must be **parsimonious**. The handshake, where the client enumerates all tools and descriptions, is particularly painful. While techniques like progressive disclosure or semantic routing (as used by GitHub) can help, they often face compatibility issues with major clients like Claude Desktop, which caches tool lists aggressively.

He suggests ~50 tools **per agent** (across all connected servers) as a rough performance threshold. The curation process is essential: start with many tools to see what works, then ruthlessly cut down to the essentials. He cites the example of a Fiverr engineer who blogged about expanding a server to 188 tools and then curating it back down to five core, highly effective tools.

### Common Anti-Patterns and Final Advice

A major anti-pattern is **automatically converting REST APIs into MCP servers**. While this is a popular fastmcp feature and useful for bootstrapping, shipping such a wrapper to production violates all the discussed principles. It results in a poorly curated, overly complex interface that is hostile to agents. The recommendation is to use such converters for initial prototyping but then manually curate and redesign the server based on observed agent workflows.

Lowin concludes by summarizing the five major actionable takeaways: 1) Outcomes over operations, 2) Flatten your arguments, 3) Instructions are context, 4) Respect the token budget, and 5) Curate ruthlessly. The ultimate mindset shift is to recognize that **you are not building a tool; you are building a user interface** for an AI agent. The quality of this interface directly impacts the agent's performance and the user's experience.

## Context

Jeremiah Lowin is the founder and CEO of Prefect Technologies, a data orchestration company, and was previously a member of the Apache Airflow PMC. He created the Marvin agent framework and, more recently, the wildly popular fastmcp library, which has become the de facto standard for building MCP servers. This talk was given at an AI Engineer event in early 2026, roughly a year after the MCP protocol itself was introduced. The talk contributes to the critical but under-discussed conversation around **agentic product design**—how to build interfaces specifically for AI agents, not just wrap existing human-centric APIs. This is highly relevant as MCP adoption explodes and teams rush to make their systems agent-accessible, often with poor results. The talk is most beneficial for developers, product managers, and engineers who are building or planning to build MCP servers and want to move beyond basic functionality to create effective, production-ready agent interfaces.
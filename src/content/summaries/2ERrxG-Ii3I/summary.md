---
metadata:
  videoId: "2ERrxG-Ii3I"
  title: "Build a Multi-Agent System with ADK, MCP, and Gemini"
  description: "Codelab→  https://goo.gle/40jFpLw\ 

    Video for developers → https://goo.gle/3ZJ6dor

    Video for data engineers → https://goo.gle/4tRO4CO

    Video for platform engineers → https://goo.gle/4qPZsMy\ 


    In this episode of Agentverse, we move beyond simple chatbots to architect a production-grade multi-agent ecosystem. You'll learn how to decouple your tools using the Model Context Protocol (MCP), craft specialized agent workflows (Sequential, Parallel, Loop), and orchestrate them as reusable microservices with the Agent-to-Agent (A2A) protocol. We wrap up by enforcing governance using callbacks, plugins, and memory to keep your system under control.


    Chapters:

    0:00 - Intro

    02:30 - Decoupled tooling ecosystem - Setting up MCP servers

    07:50 - Elemental familiars - Setting up workflow agents\ 

    13:33 - Using A2A for intelligent delegation

    16:09 - Governance as code - Setting up interceptors

    19:33 - Agent State Memory

    21:21 - Outro\ 


    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #Gemini #GoogleCloud #Agentverse


    Speaker: Debi Cabrera

    Products Mentioned: Agent Development Kit, MCP, MCP Toolbox for Databases, Cloud Run"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT22M33S"
  publishedAt: "2026-03-23T16:00:04Z"
  thumbnailUrl: "https://i.ytimg.com/vi/2ERrxG-Ii3I/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=2ERrxG-Ii3I"
processedAt: "2026-03-24T21:46:06.716Z"
source: "youtube"
tldr: "Build a scalable multi-agent system using Google's ADK, MCP, and A2A protocol to create specialized agents (sequential, parallel, loop) with decoupled tools, intelligent orchestration, and governance via callbacks and plugins."
tools:
  - name: "Agent Development Kit (ADK)"
    url: null
  - name: "Model Context Protocol (MCP)"
    url: null
  - name: "MCP Toolbox for Databases"
    url: null
  - name: "Agent-to-Agent (A2A) Protocol"
    url: null
  - name: "Google Cloud Run"
    url: null
  - name: "Google Cloud SQL"
    url: null
  - name: "Google Cloud Build"
    url: null
  - name: "Python"
    url: null
  - name: "YAML"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Programming"
tags:
  - "architecture"
  - "gcp"
  - "llm"
  - "mcp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 12587
  outputTokens: 1131
  totalTokens: 13718
  processingTimeMs: 195220
tagsNormalizedAt: "2026-03-24T22:58:54.199Z"
---

## Key Takeaways

The video demonstrates how to architect enterprise-grade multi-agent systems using Google Cloud's AI tooling. Key insights include:

*   **Decouple tools from agents** using the **Model Context Protocol (MCP)** to create independent, reusable tool servers for APIs, databases, and custom logic.

*   **Design specialized agents** with the **Agent Development Kit (ADK)** using **sequential, parallel, and loop workflows** to match task requirements for precision, speed, or persistence.

*   **Orchestrate agents as microservices** with the **Agent-to-Agent (A2A) protocol**, enabling dynamic discovery and communication between a central orchestrator and specialized agents.

*   **Enforce governance and state** using **callbacks and plugins** to implement business rules like rate limits and cooldowns, and give the orchestrator memory to make intelligent routing decisions.

## Summary

This tutorial provides a comprehensive architectural blueprint for building a production-ready multi-agent system on Google Cloud. It moves beyond single-agent chatbots to a distributed ecosystem of specialized AI workers.

### Decoupling Tools with MCP Servers

The foundation is decoupling tools from agent logic using the **Model Context Protocol (MCP)**. This creates reusable, independently managed tool servers. The tutorial shows three patterns: an **imperative MCP server** for wrapping external APIs (like `cryo_shatter`), a **general functions MCP server** for custom deterministic logic (like `Leviathan_surge`), and a **declarative MCP server** using the MCP Toolbox for Databases to expose SQL queries via a YAML configuration. This separation allows data, backend, and AI teams to work independently.

### Building Specialized Agents with the ADK

With tools decoupled, you build specialized agents, or "familiars," using the **Agent Development Kit (ADK)**. Each agent has a distinct architectural pattern baked into its workflow:

*   **Sequential Agent (Fire Familiar)**: For linear dependencies (e.g., query database, then amplify result).

*   **Parallel Agent (Water Familiar)**: Uses a fan-out/fan-in pattern to run sub-agents simultaneously for speed, then merges results.

*   **Loop Agent (Earth Familiar)**: Iterates until a condition is met (e.g., accumulating enough energy), ideal for persistent tasks.

### Orchestrating with the A2A Protocol

To avoid a monolithic script, agents are transformed into **discoverable microservices** using the **Agent-to-Agent (A2A) protocol**. Each deployed agent gets an **agent card** (a self-describing manifest) and a web endpoint. A central **Summoner agent** (the orchestrator) uses service discovery to find these remote agents via their URLs, download their cards, and understand their capabilities. This allows teams to update and redeploy agents independently without breaking the orchestrator.

### Implementing Governance and State

The system enforces business rules and maintains intelligence through interceptors:

*   **Callbacks**: Functions attached to a single agent for quick modifications, like a cooldown timer.

*   **Plugins**: More powerful, reusable classes applied globally to all agents, such as a cooldown plugin that blocks execution if an agent was recently used.

*   **Session State**: The orchestrator uses an **after-tool callback** to remember the last agent summoned, enabling it to avoid calling the same agent twice in a row, demonstrating short-term memory.

The final architecture is deployed on **Cloud Run**, creating a resilient, scalable system where specialized agents collaborate under intelligent orchestration and governance.

## Context

As AI applications move from simple chatbots to complex enterprise systems, the limitations of single, monolithic agents become clear. They are hard to maintain, scale poorly, and lack the specialization needed for complex workflows. This video addresses this shift by teaching how to build **multi-agent systems**, a paradigm where multiple specialized AI models collaborate. This is crucial for developers, architects, and platform engineers building the next generation of scalable, maintainable, and intelligent applications on Google Cloud.
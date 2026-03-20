---
metadata:
  videoId: "GDm_uH6VxPY"
  title: "AI agent design patterns"
  description: "Agentic Pattern lab→ https://goo.gle/agenticpattern\ 

    Multi-Agent Pattern blog → https://goo.gle/multiagentpattern

    Design agentic pattern → https://goo.gle/agenticpatterndesign

    Learn how to design and build AI agentic systems! In Part 1 of this series, we use the Agent Development Kit (ADK) to walk through code and live demos for the three foundational AI agent architectures.

    In this video, we cover:

    - The Single Agent: Great for simple tool-use, but struggles with complex multi-step logic.

    - The Sequential Agent: An \"assembly line\" approach for highly reliable, predictable workflows.

    - The Parallel Agent: Running multiple specialized agents concurrently to drastically reduce latency.

    Optimize your AI projects.

    Chapters:

    0:00 - Intro

    1:01 - Pattern 1: Single agent\ 

    3:05 - Pattern 2: Sequential agent\ 

    5:21 - Pattern 3: Parallel agent\ 

    7:08 - Recap

    More resources:

    ADK Doc → https://goo.gle/40ACYEw\ 

    Foundations of multi-agent systems with ADK → https://goo.gle/4tXUkIU\ 

    Workflow agents and communication in ADK → https://goo.gle/4rCONWJ\ 

    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech

    #GoogleCloud #AIAgents #ADK

    Speakers: Annie Wang

    Products Mentioned: Agent Development Kit"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT8M21S"
  publishedAt: "2026-02-27T17:00:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/GDm_uH6VxPY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=GDm_uH6VxPY"
processedAt: "2026-02-28T15:52:52.170Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "This video introduces three foundational AI agent design patterns: single agent (simple but less reliable), sequential agent (structured and predictable), and parallel agent (fast for independent tasks). It demonstrates practical implementations using Google's ADK with live demos and explains trade-offs between flexibility, control, and complexity."
tools:
  - name: "ADK"
    url: null
  - name: "Google Search"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "architecture"
  - "automation"
  - "gcp"
  - "llm"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5378
  outputTokens: 687
  totalTokens: 6065
  processingTimeMs: 15866
tagsNormalizedAt: "2026-03-01T21:19:30.315Z"
---

## Key Takeaways

The video explores three core AI agent design patterns with practical implementations using Google's ADK. • **Single Agent**: Simple to implement but lacks control for complex workflows. • **Sequential Agent**: Provides reliable, structured execution for repeatable tasks but is inflexible. • **Parallel Agent**: Reduces latency by running independent tasks concurrently but adds cost and complexity.

## Summary

The video is the first in a series on AI agent design patterns, focusing on three foundational architectures for building agentic systems. It provides practical code examples and live demos using Google's ADK (Agent Development Kit) to illustrate each pattern's implementation and trade-offs.

### Single Agent Pattern

This is the most fundamental pattern, where a single agent handles all tasks using its reasoning capabilities and available tools. The example shows a trip-planning agent using a Google search tool. While simple to implement and flexible for straightforward multi-step tasks, it becomes unreliable for complex workflows due to AI's non-deterministic nature. The agent's behavior depends entirely on system instructions in a massive prompt, offering little control.

### Sequential Agent Pattern

This pattern introduces control by breaking tasks into specialized agents that execute in a fixed order, like an assembly line. The example demonstrates a food-finding agent passing its results via a shared session state to a transportation agent. This provides predictable, reliable execution for highly structured, repeatable tasks. However, the rigid predefined structure makes it inflexible and unable to adapt to dynamic situations.

### Parallel Agent Pattern

This pattern optimizes for speed by running multiple specialized agents concurrently for independent subtasks. The example shows museum, concert, and restaurant finder agents searching simultaneously, with results aggregated by a final summarizing agent. This significantly reduces latency but incurs higher initial costs from running multiple agents and adds complexity from the required synthesis step.

The video concludes by comparing the patterns: single agents offer simplicity but lack control, sequential agents provide reliability but are inflexible, and parallel agents deliver speed but increase cost and complexity. The next episode will cover more advanced patterns like orchestrator, review and critique, loop agent, and agent-as-tool.

## Context

As AI agents move beyond simple chatbots to handle complex, multi-step workflows, developers need systematic design patterns to build reliable and scalable systems. This video addresses the growing challenge of structuring agentic AI applications, providing practical frameworks for developers, AI engineers, and architects working on autonomous systems. It connects to broader trends in AI automation where proper architectural decisions determine system reliability, performance, and maintainability.
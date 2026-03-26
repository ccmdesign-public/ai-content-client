---
metadata:
  videoId: "vfVcDUCucSs"
  title: "How to add short-term memory to your  AI agent (Sessions & State Explained)"
  description: "Lab → https://goo.gle/agentmemorylab

    ADK doc →https://goo.gle/4t2J6BG

    ADK crash course → https://goo.gle/adk-lab


    Learn how to pass information between agents with agent short term memory. Annie breaks down short-term memory for AI agents using Google's Agent Development Kit (ADK), including how sessions, events, and state work together to keep your agent context aware.\ 


    Chapters:

    0:00 - Intro

    1:22 - What a session is and why it matters for agent memory

    2:00 - [Demo] Memory loss vs memory fixed\ 

    2:48 - The difference between events (full interaction logs) and state (quick-access context)

    3:53 - A live demo comparing an agent with and without short-term memory

    5:05 - Recap


    This is part 1 of a 3 part memory series — stay tuned for episodes on persistent memory and long-term memory!


    More resources:

    Source code → https://goo.gle/40Qi7NJ

    ADK Sample → https://goo.gle/4sznhtK


    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #GoogleCloud #AIAgents


    Speakers: Annie Wang

    Products Mentioned: Agent Development Kit, Gemini"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT6M3S"
  publishedAt: "2026-03-26T16:01:21Z"
  thumbnailUrl: "https://i.ytimg.com/vi/vfVcDUCucSs/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=vfVcDUCucSs"
processedAt: "2026-03-26T21:29:56.757Z"
source: "youtube"
tldr: "This video explains how to implement short-term memory in AI agents using Google ADK sessions and state, preventing memory loss across conversation turns and enabling agent collaboration."
tools:
  - name: "Google ADK"
    url: null
  - name: "Vertex AI Memory Bank"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "ai-general"
  - "llm"
  - "machine-learning"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4156
  outputTokens: 782
  totalTokens: 4938
  processingTimeMs: 25266
tagsNormalizedAt: "2026-03-26T21:34:53.742Z"
---

## Key Takeaways

This episode introduces the foundational concepts of sessions and state for agent memory. Key insights include:

- A **session** is a continuous conversation thread; reusing the same session across turns prevents the agent from forgetting prior context.

- Sessions contain two key components: **events** (the full transcript of messages and media) and **state** (a structured scratchpad for quick-access data like restaurant names or confirmation numbers).

- State must be written through the **context** API provided by ADK, not by directly modifying the session object, to ensure changes are logged and can be persisted later.

- Multiple agents can collaborate by passing data through shared session state, avoiding the need to scrape the entire conversation transcript.

## Summary

This video is the first in a series on building AI agents with memory, focusing on short-term, working memory analogous to RAM. It begins by illustrating the problem of memory loss: if a new session is created for each turn in a conversation (like asking a trip planner for 'day two' after 'day one'), the agent starts fresh and forgets everything.

The solution is to use a **session**, defined as one continuous conversation thread. By reusing the same session object across multiple turns, the agent can look back at the full history of **events**—which include every user message, agent reply, and media input—to maintain context.

Within a session, **state** acts as a structured scratchpad. It's designed for storing key information (e.g., a confirmed restaurant name) that the agent needs quick access to, preventing the inefficiency of making the language model re-read many messages to find a single value.

A critical implementation detail is how to modify state correctly. Developers should never modify the session object directly within their tool code. Instead, they must use the **context** object provided by the ADK (e.g., `context.state`). This ensures the change is recorded as an event, which is necessary for the data to be saved properly when moving to persistent storage in future episodes.

The video demonstrates how this enables multi-agent workflows. For example, one agent can find a restaurant and write its name to the shared session state under a key like 'destination.' A second agent can then automatically read that value from state to provide directions, enabling collaboration without parsing the full transcript.

In summary, using sessions with events and state provides agents with fast, temporary short-term memory. The next episodes will build on this foundation by adding persistence with a database and, ultimately, long-term memory with services like Vertex AI Memory Bank.

## Context

As AI agents move from simple, stateless chatbots to complex, persistent assistants, the ability to remember context across a conversation and between sessions becomes critical. This is foundational for building personalized AI that can handle multi-step tasks, recall user preferences, and collaborate with other agents. Developers and engineers working on AI applications need to understand these memory patterns to create more useful and coherent agent experiences. This video series from Google Cloud Tech provides a practical, code-focused guide to implementing these capabilities using their Agent Development Kit (ADK).
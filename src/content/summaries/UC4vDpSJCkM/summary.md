---
metadata:
  videoId: "UC4vDpSJCkM"
  title: "How to Pass Context in an Agentic AI Flow"
  description: "Ready to become a certified watsonx Generative AI Engineer? Register now and use code IBMTechYT20 for 20% off of your exam → https://ibm.biz/Bdpikn


    Learn more about Agentic AI here → https://ibm.biz/Bdpike


    How do you manage context in agentic AI flows? 🤔 Grant Miller explains how to pass context effectively in agentic AI systems, covering context engineering, task history, and orchestration strategies. Learn how to optimize workflows and improve AI interactions with dynamic, multi-system solutions!


    AI news moves fast. Sign up for a monthly newsletter for AI updates from IBM → https://ibm.biz/Bdpikb


    #agenticai #contextengineering #aiworkflows"
  channel: "IBM Technology"
  channelId: "UCKWaEZ-_VweaEx1j62do_vQ"
  duration: "PT12M37S"
  publishedAt: "2026-03-26T11:00:46Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UC4vDpSJCkM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UC4vDpSJCkM"
processedAt: "2026-03-26T20:44:47.557Z"
source: "youtube"
tldr: "This video explains how context management in agentic AI systems differs from traditional OAuth flows, requiring consideration of dynamic, multi-agent orchestration, situational state, and fine-grained access control."
tools: []
categories:
  - "AI & Machine Learning"
  - "Security"
tags:
  - "agents"
  - "authentication"
  - "llm"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3445
  outputTokens: 696
  totalTokens: 4141
  processingTimeMs: 15277
tagsNormalizedAt: "2026-03-26T21:33:01.788Z"
---

## Key Takeaways

*   Agentic systems are autonomous, dynamic, and non-deterministic, involving multiple agents, LLMs, and resources, making context more complex than traditional single-user, single-app OAuth flows.

*   Effective context management must account for the situational context (environment state) and resource context across all components in the dynamic orchestration.

*   The key to passing context in agentic flows is to move beyond simple prompts and engineer the entire system's state, including user, agents, resources, and dynamic conditions, to guide the multi-agent process.

## Summary

The video begins by contrasting traditional OAuth context with the new requirements of agentic AI systems. In a traditional OAuth flow, context is relatively simple: a user authenticates once, grants an application specific scopes (permissions) via a token, and that application acts on the user's behalf to interact with a single resource. This context is defined by the **who** (the user), the **what** (the resource), and the **conditions** (the scopes).

However, agentic systems introduce significant complexity. These systems are **autonomous**, **dynamic** (non-deterministic), and involve **delegation** across multiple agents and applications. The architecture expands to include an orchestration layer, multiple agents, MCP servers, and LLMs that dynamically determine the flow of tasks. This means the context is no longer just about a single user and resource; it must now include multiple agents, a multi-system orchestration, and very fine-grained, dynamic access conditions.

To manage this, the presenter introduces the concept of **situational context**, which is the state of the entire environment, including all orchestration components, agents, and MCP servers. Additionally, **resource context** must be understood for each potential tool or data source the system might access. This is crucial because the system's path is not predetermined; it must be discovered at runtime.

Ultimately, the core message is that passing context in an agentic flow is not just about the initial prompt. It requires a holistic approach to **context engineering**. This means designing the system to capture, maintain, and propagate the complete state—the user's identity, the dynamic set of participating agents, the available resources, and the evolving conditions—throughout the entire, unpredictable orchestration process.

## Context

This video is part of IBM's educational content on modern AI architectures. It addresses a key challenge in deploying autonomous AI agents: managing identity, permissions, and state across a dynamic, multi-step workflow. As AI systems move beyond simple chatbots to complex, self-directed agents that can chain actions and call external tools, traditional authorization models like OAuth become insufficient. This is crucial for developers and architects building secure, reliable agentic applications in finance, healthcare, or any domain where agents act on a user's behalf with sensitive data.
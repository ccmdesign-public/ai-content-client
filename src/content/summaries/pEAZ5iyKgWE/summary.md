---
metadata:
  videoId: "pEAZ5iyKgWE"
  title: "Build multi-agent AI A2A + Cloud Run | Hands On AI (Part 2)"
  description: "GCP credit → https://goo.gle/handson-ep1-lab2\ 

    Codelab & source code → https://goo.gle/summoner

    Try Google ADK → https://goo.gle/4bWK6la

    Watch the first video here → https://goo.gle/handson-ai-ep1


    Build and deploy a production ready multi-agent AI system using Agent-to-Agent (A2A) Protocol, memory & state management, and Google Agent Development Kit (ADK) on Google Cloud Run. This is part 2 of our hands on RPG themed multi-agent lab series.\ 


    🗡️ What developers can learn in part 2:\ 

    ✅ How to implement Agent-to-Agent (A2A) Protocol for direct agent communication.

    ✅ How to manage agent memory and state across multi-agent workflows .

    ✅ How to use agent callbacks to control and customize agent behavior.

    ✅ How to deploy a multi-agent system to Google Cloud Run.

    ✅ Production ready patterns for agentic AI on Google Cloud.


    More resources:

    A2A documentation → https://goo.gle/4bBSPYN

    ADK sample → https://goo.gle/4rQKWVn

    Cloud Run documentation → https://goo.gle/3PxbMnW


    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    Speaker: Ayo Adedeji, Annie Wang

    Products Mentioned: Agent Development Kit, Model Context Protocol, Agent-to-Agent Protocol, Cloud Run"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT1H13M27S"
  publishedAt: "2026-03-22T15:43:27Z"
  thumbnailUrl: "https://i.ytimg.com/vi/pEAZ5iyKgWE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=pEAZ5iyKgWE"
processedAt: "2026-03-24T21:52:30.516Z"
source: "youtube"
tldr: "This video, part two of a series, demonstrates how to build multi-agent AI systems using Google Cloud's Agent Development Kit (ADK) with agent-to-agent (A2A) communication, deploy them on Cloud Run, and implement advanced features like callbacks for custom logic (e.g., cooldowns) and agent state/memory management, culminating in a simulated boss fight to showcase the integrated system."
tools:
  - name: "Cloud Run"
    url: null
  - name: "Cloud Build"
    url: null
  - name: "ADK (Agent Development Kit)"
    url: null
  - name: "CrewAI"
    url: null
  - name: "LangGraph"
    url: null
  - name: "Google Kubernetes Engine (GKE)"
    url: null
  - name: "Python"
    url: null
  - name: "Uvicorn"
    url: null
  - name: "Model Armor"
    url: null
  - name: "Vertex AI Memory Bank"
    url: null
  - name: "Cloud SQL"
    url: null
  - name: "Gemini 2.5 Flash"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
tags:
  - "agents"
  - "ai-general"
  - "ci-cd"
  - "gcp"
  - "llm"
  - "machine-learning"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 51121
  outputTokens: 2183
  totalTokens: 53304
  processingTimeMs: 350911
tagsNormalizedAt: "2026-03-24T22:56:23.594Z"
---

## Key Takeaways

* The video focuses on building robust multi-agent AI systems, emphasizing **agent-to-agent (A2A) communication** for remote agent orchestration and advanced features like callbacks and state management.

* **A2A protocol** enables agents to discover each other via discoverable "agent cards" (JSON specs) and communicate securely across different deployment environments, including Cloud Run or even on-premises, fostering universal interoperability.

* **Callbacks** allow developers to inject custom logic at various points in an agent's lifecycle (e.g., before agent call, after tool call) for purposes like security (e.g., Model Armor for input/output filtering) or efficiency (e.g., agent cooldowns).

* **Plugins** in ADK provide a global mechanism to apply custom logic across all agents within a runtime, ideal for organizational rules or policies, differentiating them from agent-specific callbacks.

* **Agent state and memory** are crucial for intelligent agent behavior; memory holds conversational history, while state stores concrete, extractable key-value pairs (like a "last summoned familiar") that can be passed between agents or tools.

* Deploying agents as microservices on **Cloud Run** allows for scalable, independent operation, with Cloud Build automating the CI/CD pipeline for building and deploying these A2A-enabled agents.

## Summary

This video, the second part of a hands-on AI series by Google Cloud Tech, delves into building sophisticated multi-agent AI systems. The hosts, Io and Annie, guide viewers through implementing agent-to-agent (A2A) communication, deploying agents on Google Cloud Run, and incorporating essential features like callbacks, plugins, agent state, and memory management.

### Agent-to-Agent (A2A) Protocol and Remote Agent Deployment

The session begins by revisiting the concept of a summoner agent orchestrating multiple familiar agents (fire, water, earth), which were initially deployed as local workflow agents. The challenge addressed in this part is enabling these agents to communicate when deployed as separate microservices on different endpoints. This is where the **Agent-to-Agent (A2A) protocol** comes into play. A2A equips each agent with its own "agent card," a discoverable JSON specification available at a well-known path (`/.well-known/a2a.json`) at the agent's deployed endpoint. This agent card acts like a digital business card, detailing the agent's capabilities, skills, and security schemes (e.g., API keys, OAuth) for authentication.

The A2A protocol facilitates **client discovery**, allowing a root agent (like the summoner) to discover available agents by retrieving and examining their agent cards. It also enables **semantic selection**, where the orchestrator dynamically chooses the most suitable agent based on the task description. A key advantage highlighted is A2A's universality: it's not restricted to agents built with Google's Agent Development Kit (ADK) but can be used with other frameworks like CrewAI or LangGraph, as long as agents comply with the A2A spec. This allows for flexible deployments, whether agents are local, on-premises, or on cloud platforms like Cloud Run or Google Kubernetes Engine (GKE).

The practical demonstration involves enabling the three familiar agents (fire, water, earth) with their own A2A endpoints. This is achieved with minimal code changes using the ADK `to_a2a` function, which automatically generates the agent card. These A2A-enabled familiar agents are then deployed to individual **Cloud Run** services using a **Cloud Build** CI/CD pipeline, ensuring each agent operates as an independent microservice. Subsequently, the summoner agent is updated to consume these remote A2A agents by specifying their URLs and leveraging the `RemoteA2AAgent` class from the ADK library. The `ADK Web` UI is used to verify that the summoner can successfully delegate tasks to the remote familiar agents, demonstrating seamless communication across distributed services.

### Callbacks, Plugins, and Custom Logic Injection

The video then introduces the concept of **callbacks** as a powerful mechanism to inject custom logic at various points in an agent's lifecycle (e.g., before an agent call, after a tool call, before a model call). This allows developers to implement functionalities like state management, security (e.g., guarding against malicious inputs/outputs), or operational optimizations. As an example of security, the hosts mention **Model Armor**, a callable API for filtering inputs and outputs to prevent prompt injection or sensitive data leakage.

For efficiency, a custom callback called `check_cooldown` is implemented for the earth agent. This callback checks the last time the agent was called and, if it's within a specified cooldown period, prevents further execution, simulating an agent needing to "recover its power." This logic is integrated into the agent's definition using the `before_agent_callback` parameter. To demonstrate its effect, the earth agent is invoked multiple times in quick succession using `ADK Run`, confirming that the cooldown logic successfully blocks subsequent calls.

Io and Annie then differentiate callbacks from **plugins**. While callbacks are agent-specific, **plugins** offer a global way to apply logic across all agents within an ADK runtime. This is particularly useful for enforcing organizational rules or policies universally. The `check_cooldown` logic is refactored into a `CooldownPlugin` class, which wraps the `before_agent_callback`. After removing the agent-specific callback, this plugin is added to the `plugins` list of the ADK runtime definition. The familiar agents are then redeployed via Cloud Build to incorporate this global plugin. Testing the summoner agent locally with `ADK Run` confirms that the cooldown now applies to all familiar agents, demonstrating the global effect of plugins.

### Agent State and Memory Management

The final technical section focuses on **agent state and memory**. Annie clarifies the distinction: **agent memory** encompasses the entire conversational history, while **agent state** refers to concrete, extractable key-value pairs representing important information that agents need to remember or pass around. This is akin to a "scratchpad" for critical data, in contrast to the more semantic nuances captured by memory, often managed by an LLM or stored in services like Vertex AI Memory Bank for long-term retention.

To illustrate state management, an `after_tool_callback` is added to the summoner agent. This callback, `save_last_summon_after_tool`, intercepts the event after the summoner delegates to a familiar agent (which is internally treated as a tool call). It extracts the name of the familiar agent that was just summoned and saves it to the agent's `state` dictionary under the key `last_summon`. This ensures the summoner remembers which familiar it last invoked. The summoner's prompt is also updated to instruct it to leverage these sub-agents and tools effectively.

After deploying the updated summoner agent to Cloud Run, the entire multi-agent system is put to the test in a simulated "boss fight" scenario within an "Agentverse Dungeon." The summoner agent, now equipped with A2A communication, global cooldowns via the plugin, and state-saving capabilities, battles a "dogma" boss. The interaction involves the summoner delegating to its familiar agents, with the system demonstrating the active cooldowns and the summoner's ability to remember the last familiar called, showcasing a fully integrated and intelligent multi-agent system.

## Context

This video is part two of a "Hands-On AI" series by Google Cloud Tech, featuring Io and Annie. They are experts in AI development and cloud infrastructure, focusing on practical applications of Google Cloud technologies for building advanced AI systems. This content is highly relevant now due to the increasing demand for sophisticated, autonomous AI agents and the challenges of orchestrating them in distributed environments. Developers, AI engineers, and cloud architects looking to build scalable, production-ready multi-agent AI applications using Google Cloud's Agent Development Kit (ADK) and serverless platforms like Cloud Run would benefit most from this detailed, practical guide.
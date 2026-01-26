---
metadata:
  videoId: "k8cnVCMYmNc"
  title: "OpenAI + @Temporalio : Building Durable, Production Ready Agents - Cornelia Davis, Temporal"
  description: "Everyone is building AI Agents, and everyone is looking for ways to build them more easily. Earlier this year, OpenAI released the OpenAI Agents SDK to bring the patterns they have found to work for building agents to the developer community. With the SDK you can define AI agents by supplying them instructions (prompts), specifying which model to use (OpenAI or not), listing tools it uses (including MCP), and much more. The OpenAI Agents SDK encourages a paradigm of orchestrated micro-agents, which themselves may have micro-orchestrations within them with the use of handoffs. It’s an elegant and powerful model.


    But a good AI Agents programming model is not enough. These agents are ultimately wildly distributed systems and are plagued with all of the problems such systems bring.


    - How can they persevere through flakey networks?

    - How can they function when LLMs are rate limited?

    - How can they run for long periods of time (hours, days, weeks, months) when infrastructure is rarely stable that long?


    In this workshop, we’ll show you how. Temporal is an open source (MIT license) durable execution framework that brings resilience to AI agents, and in this workshop we’ll show you how it’s done with the OpenAI Agents SDK. Spoiler: OpenAI and Temporal have done all of the heaving lifting for you with an integration announced earlier this year.


    Oh, and OpenAI themselves use Temporal to help make several of their products production ready (image gen and Codex, for example).


    Not using the OpenAI Agents SDK? Do come anyway; the foundational concepts carry over to different agent frameworks (and more integrations are coming all the time).


    https://twitter.com/cdavisafc

    https://www.linkedin.com/in/corneliadavis"
  channel: "AI Engineer"
  channelId: "UCLKPca3kwwd-B59HNr-_lvA"
  duration: "PT1H18M30S"
  publishedAt: "2026-01-12T19:30:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/k8cnVCMYmNc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=k8cnVCMYmNc"
processedAt: "2026-01-12T23:38:34.060Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Cornelia Davis demonstrates how **Temporal** makes **OpenAI agents durable** and **production-ready**.\ 

  - Temporal's backing service provides **crash recovery**, **retries**, and **scalability** for agentic loops.\ 

  - Simplifies complex distributed systems challenges, allowing developers to focus on the **happy path** of agent logic.\ 

  - An integration allows the OpenAI Agents SDK to leverage Tempor\n"
ai:
  provider: "gemini"
  model: "gemini-2.5-flash"
  apiCalls: 3
  fallbackAttempts: 2
  inputTokens: 17324
  outputTokens: 2376
  totalTokens: 23333
  processingTimeMs: 75492
tools:
  - name: "OpenAI"
    url: null
  - name: "Temporal"
    url: null
  - name: "OpenAI Agents SDK"
    url: null
  - name: "Redis"
    url: null
  - name: "Kafka"
    url: null
  - name: "MCP"
    url: null
  - name: "Pydantic"
    url: null
  - name: "Cloud Foundry"
    url: null
  - name: "Codex"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
tags:
  - agents
  - llm
  - python
  - architecture
  - best-practices
---

## Key Takeaways

Cornelia Davis, a developer advocate at Temporal, explains how the Temporal platform addresses the critical challenges of building durable and production-ready AI agents, particularly when integrated with the OpenAI Agents SDK. Her presentation highlights:

- **Distributed Systems as a Backing Service**: Temporal functions like Redis or Kafka but for managing distributed system complexity, offering durability, retries, and state management, abstracting away common failure modes for developers.

- **Foundational Abstractions (Activities & Workflows)**: Developers define discrete units of work as **Activities** (e.g., calling an LLM, invoking a tool) and orchestrate them into **Workflows**. Temporal automatically handles retries, queues, and state persistence.

- **Agent Durability & Crash Recovery**: By wrapping agentic loops and tool invocations within Temporal Workflows and Activities, agents gain durability. If an application crashes mid-execution, Temporal's event sourcing allows it to **resume exactly where it left off** without re-executing completed steps or re-burning LLM tokens.

- **OpenAI Agents SDK Integration**: Temporal directly integrates with the OpenAI Agents SDK, allowing developers to build agents using the SDK's paradigm while benefiting from Temporal's durability. Activities can be exposed as **tools** to the LLM, and Temporal ensures LLM calls themselves are durable.

- **Orchestration of Microagents**: The agents SDK encourages building small, focused "microagents." Temporal provides the underlying infrastructure to orchestrate these agents through "just code" (sequential, parallel, looped execution) or **handoffs**, supporting complex, long-running agent patterns like human-in-the-loop scenarios.

## Summary

Cornelia Davis, a Developer Advocate at Temporal, began her presentation by introducing herself and Temporal's role in the distributed systems space, drawing parallels to her earlier work on Cloud Foundry, an open-source container technology that predated Docker and Kubernetes. She highlighted Cloud Foundry's pioneering use of Linux containers, orchestration, and eventual consistency in the early 2010s, setting the stage for her deep expertise in handling complex distributed architectures. The core of her talk focused on how Temporal, an open-source platform, enables developers to build durable, production-ready AI agents, specifically in conjunction with the OpenAI Agents SDK.

### Introduction to OpenAI Agents SDK
Davis first provided a brief overview of the OpenAI Agents SDK, noting its launch around May. She defined an **agent** as an application where the **Large Language Model (LLM) itself decides the flow** of the application, moving beyond simple Generative AI applications. The SDK, available in Python and Type

Script, simplifies getting started with such agents. A basic agent involves defining it with a name and instructions, then running it with `runner.run()`, which corresponds to an **agentic loop**. This loop continuously consults the LLM, which might decide to invoke external **tools**. The output of these tools is then fed back to the LLM, continuing the loop until the LLM determines it's done. The SDK offers extensive configuration options for agent behavior, including handoffs, guardrails, and tool integration, allowing for sophisticated control over the agent's decision-making process.

### Temporal Overview: Distributed Systems as a Backing Service
Davis then delved into Temporal, describing it as an open-source project that provides **distributed systems durability as a backing service**. She likened it to familiar services like Redis or Kafka but focused on solving the inherent complexities of distributed computing. Temporal allows developers to program the "**happy path**" of their business logic, abstracting away common failure scenarios like network outages, rate limiting, or application crashes. Prominent companies such as Snapchat, Airbnb, Pizza Hut, and even OpenAI (for Codex and image generation) utilize Temporal for mission-critical operations, demonstrating its robustness and scalability.

The key to Temporal's functionality lies in two foundational abstractions: **Activities** and **Workflows**.

-   **Activities** are atomic units of work, especially those involving external calls or significant computation that might fail or should not be re-executed unnecessarily. Examples include withdrawing from an account or, in the AI context, calling an LLM API or invoking a tool. Developers simply decorate a function with an `@activity` annotation, and Temporal's SDK provides automatic retries, timeouts, and other durability features.

-   **Workflows** orchestrate these activities into the overall business logic. A workflow defines the sequence and logic of activity execution. Temporal ensures that workflows are **durable and resilient**. It achieves this through **event sourcing**, meticulously recording every event (activity calls, returns, signals) in a persistent state. If a workflow process crashes, Temporal can reconstitute its exact state from the event history and resume execution from the last recorded event, without re-burning tokens or re-executing already completed external calls. This not only provides fault tolerance but also enables long-running processes (hours, days, even years) that can wait for external input (like human-in-the-loop interactions) without consuming active memory or CPU resources.

### Demo 1: Temporal-Native Agentic Loop
Davis presented a demo illustrating a Temporal-native agentic loop. This agent was designed to query weather alerts, using three tools: `get_weather_alerts` (requiring a state), `get_location_from_ip` (to convert an IP to a state), and `get_ip_address` (to find the current machine's IP).
The implementation involved:

-   **Activities**: `call_openai_api` and a `tool_invoker` activity. The `tool_invoker` was configured as a **dynamic activity** (`dynamic=true`), allowing it to pick up and execute any tool by name at runtime without rigid pre-binding. This flexibility means the workflow logic doesn't need to change when new tools are added.

-   **Workflow**: A `while true` loop continuously called the `call_openai_api` activity. If the LLM's response indicated a tool call, the workflow extracted the tool name and arguments, then executed the corresponding dynamic activity. The tool's output was appended to the conversation history and fed back to the LLM.
During the demo, Davis showcased the agent successfully chaining tool calls (e.g., getting IP, then location, then weather). Crucially, she demonstrated Temporal's **durability**: after starting a workflow and then **killing the worker process mid-execution**, restarting the worker immediately resumed the workflow from the exact point of interruption. The Temporal UI provided a clear event history, showing each LLM call and tool invocation, even across process failures, without any re-invocation of already completed steps.

### OpenAI Agents SDK + Temporal Integration
The core of the integration lies in leveraging Temporal's durability for agents built with the OpenAI Agents SDK. Davis explained that the integration makes the `runner` class in the Agents SDK abstract, allowing Temporal to provide its own durable implementation.
Key aspects of the integration include:

-   **Simplified Tool Definition**: Temporal provides an `activity_as_tool` function that takes a Temporal activity (which now only needs its function logic and docstrings) and automatically generates the necessary JSON blob for the LLM tool description. This removes the need for developers to manage tool JSON schema manually.

-   **Plugin Configuration**: To use Temporal with the Agents SDK, a `OpenAI_Agents_Plugin` must be configured in the Temporal worker. This plugin ensures that even the LLM calls made by the Agents SDK's internal runner are wrapped in Temporal's durable mechanisms, providing retries and state persistence for the entire agentic loop.

-   **Durable Agent Execution**: By running the OpenAI agent within a Temporal Workflow, the entire agent lifecycle—including LLM calls, tool invocations, and conversation history—becomes durable. This means that, just like the Temporal-native agent, an OpenAI agent running on Temporal can survive process crashes and network interruptions, resuming seamlessly without re-burning tokens or losing state. Davis reiterated this by re-running the weather alert demo, but this time using the Agents SDK, demonstrating identical crash recovery behavior and event visibility in the Temporal UI.

### Orchestrating Agents and Microagents
Davis emphasized the paradigm of building **small, specialized "microagents"** that perform one task well, drawing parallels to the success of microservices. The OpenAI Agents SDK supports orchestrating these microagents in two primary ways:
1.  **"Just Code" Orchestration**: Developers can write standard code to sequentially or in parallel call `runner.run()` for different agents, passing results between them. Temporal's workflow capabilities naturally extend to this, allowing for complex control flows, loops, and parallel execution patterns with built-in durability.
2.  **Handoffs**: The Agents SDK offers a specific `handoff` mechanism where an agent can transfer control to another agent. This effectively changes the **context** of the ongoing agentic loop rather than starting an entirely new loop. The primary agent (e.g., a triage agent) can decide to hand off to a specialized agent (e.g., a weather agent or local info agent), effectively switching the persona or focus of the interaction within a single, continuous, and durable agentic process facilitated by Temporal.

Davis concluded by providing resources for further learning, including Temporal's Python SDK documentation, the AI Cookbook (featuring the demo examples), blog posts on the OpenAI and Pydantic integrations, and information about the upcoming Replay conference. She highlighted that the integration of durability with agent frameworks is a growing trend, with several more integrations in progress. The ability to abstract away physical processes and focus purely on logical application flow is a "freeing" experience for developers, enabling the creation of robust, scalable, and resilient AI applications.

## Context

Cornelia Davis, a seasoned expert in distributed systems and a Developer Advocate at Temporal, delivers this presentation to an audience of AI Engineers. Her background, including pivotal work on Cloud Foundry, provides her with unique insights into the challenges of building scalable, fault-tolerant systems.

This video contributes significantly to the broader conversation around moving AI agents from experimental prototypes to reliable, production-grade applications. As AI agents become more sophisticated and integral to business processes, their **durability, reliability, and ability to recover from failures** are paramount.

The content is highly relevant now as many organizations are grappling with the operational complexities of deploying LLM-powered agents in real-world scenarios. It highlights a practical solution to common pain points like state management, retries, and long-running processes. Developers, especially those working on **complex, long-running, or mission-critical AI applications** that require resilience against failures and efficient resource management, would benefit most from watching this video.

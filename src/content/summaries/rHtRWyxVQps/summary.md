---
metadata:
  videoId: "rHtRWyxVQps"
  title: "Build a multi-agent system | Hands On AI (Part 1)"
  description: "GCP credit → https://goo.gle/handson-ep1-lab1

    Codelab & source code → https://goo.gle/summoner

    Try Google ADK → https://goo.gle/4bWK6la


    Build a complete multi-agent AI system from scratch using Google Agent Development Kit (ADK) and Model Context Protocol (MCP)! In this hands-on lab, we use an RPG game theme to guide you through real-world multi-agent architecture on Google Cloud — step by step.


    🗡️ What developers can learn in part 1:

    ✅ How to build an MCP Server (Model Context Protocol) to expose tools to AI agents.

    ✅ How to create Workflow Agents using Google ADK (Agent Development Kit).

    ✅ How to orchestrate multiple AI agents working together.

    ✅ Core concepts behind multi-agent system design and architecture.

    ✅ How to structure an agentic AI workflow on Google Cloud.


    More resources:

    Google Cloud MCP servers documentation → https://goo.gle/3Pl3bVs

    ADK sample → https://goo.gle/41hURIy

    \\

    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    Speaker: Annie Wang, Ayo Adedeji\ 

    Products Mentioned: Agent Development Kit, Model Context Protocol"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT1H1M27S"
  publishedAt: "2026-03-21T15:57:26Z"
  thumbnailUrl: "https://i.ytimg.com/vi/rHtRWyxVQps/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=rHtRWyxVQps"
processedAt: "2026-03-24T21:53:29.374Z"
source: "youtube"
tldr: "This Google Cloud Tech tutorial demonstrates building a multi-agent system using ADK (Agent Development Kit) and MCP (Model Context Protocol), covering three types of MCP servers, workflow agents, and deployment to Cloud Run."
tools:
  - name: "Google Cloud Shell"
    url: null
  - name: "Google Cloud Console"
    url: null
  - name: "Google Cloud Build"
    url: null
  - name: "Google Cloud Run"
    url: null
  - name: "Google Cloud Storage"
    url: null
  - name: "Google Cloud SQL"
    url: null
  - name: "Google Artifact Registry"
    url: null
  - name: "Vertex AI"
    url: null
  - name: "Gemini"
    url: null
  - name: "ADK (Agent Development Kit)"
    url: null
  - name: "MCP (Model Context Protocol)"
    url: null
  - name: "MCP Data Toolbox"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
tags:
  - "agents"
  - "gcp"
  - "mcp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 37985
  outputTokens: 1341
  totalTokens: 39326
  processingTimeMs: 25734
tagsNormalizedAt: "2026-03-24T23:01:11.696Z"
---

## Key Takeaways

This tutorial from Google Cloud Tech guides developers through building a multi-agent RPG game system using Google Cloud's AI tools.

* **MCP servers act as universal adapters** connecting agents to external tools like APIs, databases (via Data Toolbox), and custom functions.

* **ADK provides specialized workflow agents** (sequential, parallel, loop) for deterministic coordination patterns beyond basic hierarchical routing.

* **Deployment involves Cloud Shell, Cloud Build, Artifact Registry, and Cloud Run** for containerized agent services.

* **Testing agents uses ADK web UI and ADK run CLI** for interactive development and debugging before orchestration.

## Summary

### Introduction & Lab Setup

The tutorial begins by explaining the lab's goal: building a multi-agent system for an RPG game scenario culminating in a "boss fight." Hosts Annie and Io guide viewers through initial setup: claiming Google Cloud credits, activating Cloud Shell, cloning two GitHub repositories (one for the agent architecture, one for the dungeon environment), and enabling necessary APIs (AI Platform, Cloud Storage, Cloud Build). They emphasize using a personal Gmail account to avoid corporate restrictions.

### Architecture Overview & MCP Fundamentals

The core architecture is presented as a three-layer stack: a **tooling layer** (MCP servers), a **domain workflow layer** (ADK agents), and an **orchestrator agent** (using Agent-to-Agent protocol, covered in Part 2). The hosts explain that MCP servers are "universal adapters" that standardize how agents connect to external tools, addressing LLM limitations like lack of real-world data access or unreliable math capabilities. They introduce three MCP server types built in the lab: custom servers for APIs and general functions using ADK, and a database-connected server using **MCP Data Toolbox**.

### Building & Deploying MCP Servers

The hands-on section starts with creating custom MCP servers. The first server wraps external APIs (e.g., for game attacks like "Cryos Shatter") using ADK's `@mcp_tool` decorator and `list_tools`/`call_tool` functions. The second server implements general functions (e.g., mathematical calculations for damage amplification). Both are deployed via Cloud Build YAML files to **Cloud Run**. The third server uses **MCP Data Toolbox** configured via a YAML file to connect to a Cloud SQL database containing game data (familiar names, abilities, damage points). This declarative approach contrasts with the imperative Python code used for the custom servers. All servers are tested using `adk run diagnostics` with a diagnostic agent.

### Creating ADK Workflow Agents

The tutorial then shifts to building specialized agents that utilize these tools. Three agent patterns are implemented using ADK's workflow agents:

*   **Sequential Agent (Fire Familiar):** Runs agents in a strict order (e.g., a "Scout" agent queries the database for an ability's base damage, then an "Amplify" agent applies a calculation).

*   **Parallel Agent (Water Familiar):** Runs multiple agents concurrently (e.g., different "Channeler" agents) and then merges their results using a sequential wrapper.

*   **Loop Agent (Earth Familiar):** Runs agents in a loop until a condition is met or a max iteration limit is reached, analogous to a `for` loop with a break condition.
Each agent is configured to connect to the appropriate MCP servers via URLs (using SSE or HTTP parameters) and defined in Python files within the project.

### Testing Agents & Conclusion

Agents are tested interactively using **ADK web**, a development UI that provides visual traces and supports multimodal inputs. The hosts demonstrate prompting each agent (e.g., "Prepare an amplified strike using the Infernal Lash ability") and observing the tool calls and reasoning steps. They discuss real-world parallels: parallel agents for latency improvement in independent tasks (like searching for flights, hotels, and events simultaneously), and loop agents for iterative refinement (like a writer-critic loop). The session concludes by previewing Part 2, which will cover Agent-to-Agent (A2A) protocol, ADK plugins/callbacks, and agent state/memory to orchestrate the final boss fight.

## Context

This video is Part 1 of a two-part "Hands-On AI" series by Google Cloud Tech, featuring hosts Annie and Io, Google Cloud experts focused on AI developer tools. It contributes to the rapidly evolving field of **agentic AI**, where systems use multiple specialized AI agents coordinated to accomplish complex tasks. The tutorial is highly relevant as developers seek practical frameworks to build reliable, production-ready multi-agent applications beyond simple chatbot prototypes. It leverages Google Cloud's specific toolchain (ADK, MCP, Vertex AI) but the concepts of tool standardization (MCP) and workflow coordination (sequential/parallel/loop agents) are broadly applicable. Developers, AI engineers, and cloud architects looking to implement scalable multi-agent systems would benefit most from watching.
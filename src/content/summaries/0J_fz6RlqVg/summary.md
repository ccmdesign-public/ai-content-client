---
metadata:
  videoId: "0J_fz6RlqVg"
  title: "Running a multi-agent AI architecture"
  description: "Get the code → https://goo.gle/4j8NCLk\ 

    Agent Development Kit (ADK) →https://goo.gle/4aTg7KQ


    Your React frontend shouldn't be managing your AI's plumbing. In this video, Amit Maraj shows you how to build the \"General Contractor\" of your AI system: the Orchestrator.\ 


    You'll learn how to use the Agent Development Kit (ADK) to manage remote specialists using RemoteA2aAgent, implement a feedback loop with LoopAgent, and build an EscalationChecker that acts like a building inspector. We'll also cover how to stream real-time status updates to your user, ensuring they aren't staring at a blank screen while your distributed squad gets to work.


    More resources:\ 

    Agent-to-Agent Protocol (A2A) →https://goo.gle/4apT8a2\ 

    Google Cloud Run →https://goo.gle/3LbFLjv\ 

    Gemini 3 models →https://goo.gle/4aY7zSV


    Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #CloudRun #GoogleCloud


    Speaker: Amit Maraj

    Products Mentioned: Cloud Run, AI Infrastructure"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT2M23S"
  publishedAt: "2026-01-15T17:00:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/0J_fz6RlqVg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=0J_fz6RlqVg"
processedAt: "2026-01-16T15:16:35.692Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Implement a multi-agent AI architecture using an **orchestrator pattern** to manage complex workflows:

  - **Orchestrator as General Contractor**: Acts as the single entry point, hiding internal complexity from the front-end

  - **ADK Integration**: Uses `remote_agent` for microservices and `loop_agent` for iterative research-to-judge cycles

  - **Shared State**: Enables conditional flow control via an\ \n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 914
  outputTokens: 911
  totalTokens: 2666
  processingTimeMs: 13273
tools:
  - name: "Agent Development Kit"
    url: "https://goo.gle/4aTg7KQ"
  - name: "Agent-to-Agent Protocol"
    url: "https://goo.gle/4apT8a2"
  - name: "Cloud Run"
    url: "https://goo.gle/3LbFLjv"
  - name: "Gemini 3 models"
    url: "https://goo.gle/4aY7zSV"
  - name: "React"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
tags:
  - agents
  - gcp
  - gemini
  - architecture
  - api-design
---

## Key Takeaways

Building complex AI workflows requires moving from single-agent calls to a sophisticated **multi-agent orchestration** model. This approach ensures that the front-end remains lightweight while the backend handles distributed processing.

* The **Orchestrator** simplifies interactions by managing 'subcontractor' specialist agents via remote URLs.

* **Shared Session State** is the backbone of coordination, allowing a 'judge' agent to signal task completion to a 'researcher' agent.

* **Streaming Events** are critical for modern UX, providing real-time status updates from specific agents to keep users engaged during long-running tasks.

* **Microservices Architecture** allows developers to run full distributed systems locally before moving to production.

## Summary

This video outlines a robust framework for managing a **multi-agent AI architecture** using an orchestrator-centric model. The central premise is that the front-end application should not be burdened with the granular management of complex AI workflows. Instead, it should interact with a single **Orchestrator agent**, which acts as a 'general contractor' for various AI 'subcontractors' or specialists.

### The Orchestrator and Remote Agents
The architecture relies on the **Agent Development Kit (ADK)** to facilitate communication between distributed services. By using the `remote_agent` function, the orchestrator can connect to specialized agents via a simple URL. This allows the system to scale as a collection of **microservices**, where each agent (e.g., a researcher, a carpenter, or an electrician in the contractor analogy) performs a specific function without the front-end needing to know the details of their implementation.

### Logic Loops and Shared State
One of the most powerful features discussed is the **researcher-to-judge loop**. Using the `loop_agent` pattern, the system can iteratively refine its output. This process is governed by a **shared session state**:

- The **Researcher** performs a task and submits it.

- The **Judge** evaluates the output and writes feedback to the session state.

- A specialized **Escalator Checker** monitors the state for a 'pass' status.

- Once the criteria are met, the checker yields an `escalate = true` event, which effectively acts as an emergency brake to stop the loop.

### User Experience and Streaming
Because multi-agent workflows can be time-consuming, the video emphasizes the importance of **event-based streaming**. By tapping into the ADK event stream, the server can identify which agent is currently active. For instance, if the researcher is busy, the orchestrator can send a 'Researcher is working' status to the front-end. This ensures the user sees a live, interactive dashboard rather than a static loading screen while the background 'squad' completes the work.

### Development and Deployment
The workflow is demonstrated through a local script that spins up four distinct microservices on a single machine. This allows for a **full distributed system** to be tested locally before being moved into a production environment. The front-end connects to a single port, but because of the orchestrator's management, it receives updates from the entire squad seamlessly.

## Context

As AI applications evolve from simple chatbots to complex problem-solving systems, the need for robust orchestration becomes critical. This video addresses a common bottleneck in AI development: the 'monolithic' agent problem. By adopting a multi-agent microservices architecture, developers can build more reliable, scalable, and maintainable systems. This approach is particularly relevant for enterprise-level applications where tasks require specialized knowledge and iterative verification. It connects to broader trends in 'agentic' workflows, where the focus shifts from the model itself to the system architecture surrounding the LLM, ensuring that Google Cloud's ADK remains a competitive tool for professional developers.

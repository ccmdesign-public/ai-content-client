---
metadata:
  videoId: "HY_JyxAZsiE"
  title: "Spec-Driven Development: Sharpening your AI toolbox - Al Harris, Amazon Kiro"
  description: "In the AI coding era, we have powerful tools, but tools still require honing to work effectively. Spec-Driven Development allows for reproducible and reliable delivery, but spending time up-front to improve the spec process will yield the best approach. Learn how the Kiro team does this, and how you can too!


    https://www.linkedin.com/in/al-harris-7a755640/"
  channel: "AI Engineer"
  channelId: "UCLKPca3kwwd-B59HNr-_lvA"
  duration: "PT1H3M50S"
  publishedAt: "2026-01-09T15:15:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/HY_JyxAZsiE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=HY_JyxAZsiE"
processedAt: "2026-01-11T17:16:59.707Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Al Harris introduces Amazon Kiro, an agentic IDE that replaces 'vibe coding' with Spec-Driven Development (SDD), utilizing structured natural language (EARS) and property-based testing to create reproducible, high-quality software through a rigorous SDLC workflow that integrates external data via MCP and maintains long-term reliability through steering."
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 14919
  outputTokens: 1410
  totalTokens: 17631
  processingTimeMs: 20587
tools:
  - name: "Kiro"
    url: null
  - name: "Easy Approach to Requirement Syntax"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "Asana"
    url: null
  - name: "GitHub"
    url: null
  - name: "AWS"
    url: null
  - name: "Brave Search"
    url: null
  - name: "Agent Core"
    url: null
  - name: "LangGraph"
    url: null
  - name: "Cursor"
    url: null
  - name: "Windsurf"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - ai-coding
  - agents
  - testing
  - best-practices
  - architecture
---

## Key Takeaways

Al Harris presents Spec-Driven Development (SDD) as a method to scale AI-assisted coding to complex, production-grade systems. He argues that while 'vibe coding' is useful for prototyping, professional development requires the rigor of structured artifacts and verifiable requirements.

* **Spec-Driven Development (SDD)**: A shift from prompt-only development to a structured workflow involving requirements, design, and implementation phases that respect traditional software engineering principles.

* **EARS Syntax and Property-Based Testing**: Using the **Easy Approach to Requirement Syntax (EARS)** to turn natural language into structured invariants, which are then used for **Property-Based Testing (PBT)** to prove code correctness.

* **Model Context Protocol (MCP) Integration**: Leveraging **MCP** to pull real-world context—such as Asana tasks, Git

Hub issues, or AWS documentation—directly into the AI's requirements and design cycle.

* **Artifact Customization**: The ability to inject UI wireframes (using ASCII or diagrams) and explicit unit test cases into the specification, ensuring the AI agent is bounded by human-vetted success criteria.

* **Steering and Memory**: Utilizing **Steering Docs** as a persistent memory layer to enforce coding standards, commit styles, and architectural preferences across different development sessions.

* **Reproducible Results**: Moving away from ephemeral chat sessions toward a system where the specification serves as the 'living documentation' and a source of truth for the codebase.

## Summary

### The Shift from Vibe Coding to Spec-Driven Development

Al Harris, a Principal Engineer at Amazon, introduces **Kiro**, an agentic IDE designed to bring structure back to AI-assisted software development. He contrasts Kiro’s approach with 'vibe coding'—a term for the informal, conversational style of coding with LLMs that relies heavily on user-defined guardrails and manual iteration. Harris argues that to scale AI development to complex enterprise problems, developers must return to the **Software Development Life Cycle (SDLC)**, focusing on discovery, requirements, and design before writing code. 

**Spec-Driven Development (SDD)** is the methodology at the heart of Kiro. It compresses the SDLC into a tight inner loop where user prompts are synthesized into structured requirements, which then inform a technical design, a task list, and finally, the implementation. This process ensures that the AI's output is not just a guess based on a prompt but a result derived from a formal set of artifacts that represent the system's state at any given time.

### EARS Syntax and the Power of Invariants

A critical component of Kiro’s SDD is the use of the **EARS (Easy Approach to Requirement Syntax)** format. EARS provides a structured natural language representation of system requirements (e.g., 'When [event], the system shall [action]'). By standardizing how requirements are written, Kiro can translate these natural language statements into **Property-Based Testing (PBT)** cases. 

Unlike standard unit tests that check specific inputs against outputs, PBT attempts to find counterexamples that falsify system **invariants**. If the system can generate a test case that violates a requirement, the developer knows the code is incorrect. This provides a high degree of confidence that the software shipped meets the initial specifications. Harris notes that this shift moves the AI from simply being 'helpful' to being 'correct' through automated reasoning techniques.

### Leveraging MCP for Real-World Context

Harris demonstrates how to 'sharpen the AI toolbox' by integrating the **Model Context Protocol (MCP)**. MCP allows Kiro to access external data sources during the requirement and design phases. For example, a developer can prompt Kiro to 'start executing task XYZ from Asana.' The system uses an **Asana MCP** to pull metadata, descriptions, and comments from the task tracker to generate a comprehensive spec without manual copy-pasting.

This extensibility allows developers to use documentation MCPs (like AWS docs) or search tools (like Brave Search) to ground the AI's research. Harris highlights that these tools are essential for preventing the AI from making assumptions based on outdated training data, especially when working with rapidly evolving technologies like **Agent Core** or **Lang

Graph**.

### Customizing Artifacts and Steering the Agent

One of the practical advantages of Kiro is the ability to customize the artifacts generated during the SDD process. Harris shows how developers can ask the agent to include **UI wireframe mocks** in ASCII format within the design document. This left-shifts UI/UX decisions, allowing the team to review visual layouts before a single line of CSS is written. Similarly, developers can mandate the inclusion of specific unit test cases in the task list to ensure the AI does not 'hallucinate' completion when tests are actually failing.

To manage long-term agent behavior, Kiro utilizes **Steering Docs**. These are persistent files that act as a memory layer, instructing the agent on how to handle specific tasks like Git commits, architectural patterns, or dependency management. This ensures that even across multiple sessions, the AI remains consistent with the team's engineering standards. Harris concludes by demonstrating a 'Dad Joke Generator' project (Gramps), showing how Kiro can be pushed to find more idiomatic solutions—such as using native persistence features instead of manual S3 storage—by challenging the agent's initial design proposals during the spec review phase.

## Context

Al Harris is a Principal Engineer at Amazon working on Kiro (formerly known as Curo), a specialized IDE designed to evolve the role of AI in the engineering workflow. This presentation was delivered at the AI Engineer conference in early 2026, a time when the industry was shifting from simple 'AI chat' interfaces to sophisticated 'agentic' systems that can manage complex software lifecycles. This talk is highly relevant for software architects and senior developers who are concerned about the technical debt and lack of reproducibility associated with 'vibe coding.' It contributes to the broader conversation on how to integrate formal methods—like property-based testing and structured requirements—into the new era of LLM-driven development. Those looking to understand how Amazon is positioning its developer tools against competitors like Cursor or Windsurf will find Harris's insights into structured workflows particularly valuable.

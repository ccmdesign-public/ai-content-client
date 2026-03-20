---
metadata:
  videoId: "QZxZgHtl5Qw"
  title: "Let it Cook - AI work work work work work flows"
  description: "Join Burke, Pierce, and James as we live code using the latest in VS Code, GitHub Copilot CLI, and some new fun tools that Burke has been building to streamline AI workflows.


    🎙️ Featuring: Burke Holland, Pierce Boggan, James Montemagno


    #vscode #githubcopilot"
  channel: "Visual Studio Code"
  channelId: "UCs5Y5_7XK8HLDX0SLNwkd3w"
  duration: "PT1H4M19S"
  publishedAt: "2026-03-06T17:19:08Z"
  thumbnailUrl: "https://i.ytimg.com/vi/QZxZgHtl5Qw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=QZxZgHtl5Qw"
processedAt: "2026-03-10T16:32:31.758Z"
source: "youtube"
tldr: "The Visual Studio Code team demonstrates how GitHub Copilot's latest features, including autopilot mode, integrated browser, agentic workflows, and Ralph loops, fundamentally change developer workflows by automating complex tasks and enabling asynchronous, multi-agent systems that execute entire projects from planning to deployment."
tools:
  - name: "Visual Studio Code"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "GitHub Copilot CLI"
    url: null
  - name: "GitHub Copilot SDK"
    url: null
  - name: "Supabase"
    url: null
  - name: "OpenTelemetry"
    url: null
  - name: "Three.js"
    url: null
  - name: "SwiftUI"
    url: null
  - name: "Model Context Protocol (MCP)"
    url: null
  - name: "GitHub Codespaces"
    url: null
  - name: "Telegram"
    url: null
  - name: "Power Automate"
    url: null
  - name: "Azure"
    url: null
  - name: "Docker"
    url: null
  - name: "Anthropic Claude"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "automation"
  - "copilot"
  - "llm"
  - "productivity"
  - "vscode"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 49450
  outputTokens: 1696
  totalTokens: 51146
  processingTimeMs: 57829
tagsNormalizedAt: "2026-03-10T16:43:57.586Z"
---

## Key Takeaways

The VS Code team explores the evolution of AI-powered development from simple code completion to complex, autonomous workflows. The latest GitHub Copilot release transforms how developers interact with AI, moving from manual prompting to orchestrating automated systems that can build, test, and deploy applications with minimal human intervention.

*   **Autopilot mode and integrated browser** enable truly hands-off development where agents can navigate applications, debug issues, and validate functionality without constant human oversight, creating an asynchronous partnership with AI.

*   **Agentic workflows and Ralph loops** allow developers to compose complex automation by embedding Copilot in scripts that run continuously, checking for completion and iterating until goals are met, fundamentally changing how tasks are orchestrated.

*   **The Copilot SDK and CLI** empower developers to build custom interfaces and bots that work on their behalf, enabling personalized automation systems that can triage issues, generate reports, and manage projects autonomously.

*   **Memory systems and context management** help agents learn working styles and project specifics over time, reducing correction cycles and enabling more efficient long-term collaboration between developers and AI assistants.

*   **Model selection and thinking effort** are now configurable with intelligent defaults informed by extensive evaluation data, allowing developers to optimize for speed versus quality depending on their specific workflow needs.

*   **The future of development** shifts from writing code to designing systems and exercising creative taste, as the technical implementation becomes increasingly automated through multi-agent architectures and workflow composition.

## Summary

### Introduction and Latest Release Overview

The Visual Studio Code team hosts a deep dive into the transformative capabilities of GitHub Copilot's latest features. The discussion centers on how AI-assisted development has evolved from simple code completion to complex, autonomous workflows that fundamentally change the developer's role. The hosts emphasize that this release represents a significant shift toward "agentic" development, where AI doesn't just assist but actively executes entire tasks from planning through implementation.

Key highlights from the release include the new integrated browser that allows agents to navigate and debug web applications directly within VS Code, improved model selection with intelligent defaults, and enhanced memory systems that help agents learn developer preferences over time. The team demonstrates how these features combine to create a more asynchronous partnership where developers can work on multiple projects while AI handles implementation details in the background.

### Autopilot Mode and Integrated Browser Capabilities

The most significant advancement showcased is **autopilot mode**, which represents a fundamental shift in how developers interact with AI assistants. Unlike traditional interactive modes where developers must approve each step, autopilot mode allows the agent to work continuously until a task is completed. The system uses forceful prompting to ensure the agent doesn't stop prematurely, constantly checking if the actual goal has been achieved rather than just completing individual steps.

The **integrated browser** represents another major leap forward. Built on Chromium rather than a simple web view, this browser allows agents to navigate real applications, handle OAuth flows, access console logs, and use full dev tools. This enables agents to not just write code but actually test and validate that applications work as intended. The demonstration shows how agents can be given permission to "drive" an application, automatically fixing issues they discover during navigation.

### Agentic Workflows and Ralph Loops

The discussion then shifts to **agentic workflows** and the concept of **Ralph loops**. Burke Holland explains how developers can now embed Copilot directly into scripts that run continuously, creating automated systems that can handle complex multi-step processes. A Ralph loop is essentially a while loop with a prompt that runs repeatedly, giving the agent a fresh context window each iteration while maintaining progress through external memory.

The team demonstrates a practical implementation: an AI Town project where users can submit building requests via GitHub issues. An automated system triages these loops as a solution to context window limitations

- rather than cramming everything into a single context, each iteration gets a fresh context with only the essential information carried forward.

The team demonstrates a practical implementation: an AI Town project where users can submit building requests via GitHub issues. An automated system triages these requests, decides if they should be built, assigns them to Copilot for implementation, runs tests, handles merge conflicts, and finally merges completed work back to main. This represents a complete **multi-agent system** working autonomously with human oversight only at strategic points.

### Building Custom Interfaces and Bots

Perhaps the most revolutionary insight is how the **Copilot SDK** enables developers to build their own interfaces and automation systems. The team reveals that multiple members have created personalized bots that work on their behalf

- from Telegram bots that monitor repositories and dispatch tasks to mobile apps that provide AI assistance on the go. This democratization of interface creation means developers are no longer limited to VS Code or the CLI but can create workflows that match their specific working style.

Examples shared include DevOS (a cloud-based development environment that automatically sets up Copilot), various repository management bots, and even systems that automatically generate weekly team updates by summarizing meetings and tracking project progress. The common theme is that developers are shifting from writing code directly to designing systems that write code for them.

### Practical Applications and Future Implications

The conversation concludes with practical examples of how these capabilities are already being used. James demonstrates how autopilot mode implemented a complete authentication and favorites system for his Tiny Clips application, changing over a thousand lines of code automatically. The team discusses how these tools enable developers to automate repetitive tasks like generating release notes, triaging issues, and even creating entire applications from simple prompts.

The fundamental shift identified is that **developer creativity and taste** become more important than technical implementation skills. With AI capable of building almost anything, the real challenge becomes knowing what to build and designing effective systems. The team emphasizes that this represents not just an improvement in productivity but a complete reimagining of the developer's role in the software creation process.

## Context

This video features members of the Visual Studio Code team, including James Montemagno and Pierce Boggan, along with guest Burke Holland, discussing the latest advancements in GitHub Copilot. These experts work directly on developing and refining AI-assisted development tools at Microsoft, giving them unique insight into how these technologies are evolving. The discussion comes at a critical moment in software development as AI transitions from being a coding assistant to becoming an autonomous development partner. This content is particularly valuable for professional developers, engineering managers, and tech leaders who need to understand how AI will transform development workflows in the near future. The insights reveal not just new features but fundamental shifts in how software will be created, making this essential viewing for anyone involved in software development.
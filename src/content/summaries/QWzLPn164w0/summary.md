---
metadata:
  videoId: "QWzLPn164w0"
  title: "Prompt Engineering Is Dead. Context Engineering Is Dying. What Comes Next Changes Everything."
  description: "My site: https://natebjones.com

    Full Story w/ Prompts: https://natesnewsletter.substack.com/p/klarna-saved-60-million-and-broke?r=1z4sm5&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true

    _______________________________________

    What's really happening when Klarna's AI agent does the work of 853 employees but costs the company something far more valuable than the $60 million it saved? The common story is that AI can't handle nuance—but the reality is more interesting when the AI worked too well at optimizing for exactly the wrong objective.


    In this video, I share the inside scoop on why the gap between AI capability and organizational value is the most important unsolved problem in enterprise AI:


    \ • Why 74% of companies report no tangible value from AI despite massive investment

    \ • How Microsoft Copilot stalled at 5% deployment despite 85% Fortune 500 adoption

    \ • What separates context engineering from intent engineering—and why intent is the missing layer

    \ • Where the race has shifted from who has the smartest model to who has the clearest organizational intent


    For leaders watching agents run for weeks and soon for months, the question is no longer can AI do this task—it's can AI do this task in a way that serves what we actually need?


    Chapters

    00:00 The AI Worked Too Well

    01:21 The Klarna Backstory

    03:40 What the Agent Didn't Know

    06:03 From Prompt Engineering to Context Engineering to Intent Engineering

    09:10 The Investment and Failure Stats Coexist

    10:26 What Happened With Microsoft Copilot

    12:45 Three Layers of the Intent Gap

    14:06 Layer One: Unified Context Infrastructure

    16:55 Layer Two: Coherent AI Worker Toolkit

    19:03 Layer Three: Intent Engineering Proper

    23:59 Why This Hasn't Been Built Yet

    26:04 What a Solution Looks Like

    29:34 The Race Is an Intent Race


    Subscribe for daily AI strategy and news.

    For deeper playbooks and analysis: https://natesnewsletter.substack.com/"
  channel: "AI News & Strategy Daily | Nate B Jones"
  channelId: "UC0C-17n9iuUQPylguM1d-lQ"
  duration: "PT29M41S"
  publishedAt: "2026-02-24T15:00:45Z"
  thumbnailUrl: "https://i.ytimg.com/vi/QWzLPn164w0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=QWzLPn164w0"
processedAt: "2026-02-26T23:47:21.585Z"
source: "youtube"
tldr: "The next critical challenge for enterprise AI is not smarter models or better context, but 'Intent Engineering'—encoding organizational goals, values, and decision boundaries into machine-actionable frameworks so AI agents optimize for what truly matters, not just measurable metrics."
tools:
  - name: "Model Context Protocol (MCP)"
    url: null
  - name: "LangChain"
    url: null
  - name: "LangGraph"
    url: null
  - name: "Claude"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Cursor"
    url: null
  - name: "Perplexity"
    url: null
  - name: "Microsoft Copilot"
    url: null
  - name: "Google's Agent Development Kit"
    url: null
  - name: "Slack"
    url: null
  - name: "Salesforce"
    url: null
  - name: "Jira"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 17688
  outputTokens: 1030
  totalTokens: 18718
  processingTimeMs: 21749
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.541Z"
---

## Key Takeaways

The video argues that prompt and context engineering are insufficient for enterprise AI success. The critical missing layer is **Intent Engineering**.

*   **Prompt Engineering** is an individual, session-based skill for crafting instructions.

*   **Context Engineering** provides agents with organizational knowledge and data access.

*   **Intent Engineering** defines *what agents should want*—encoding organizational purpose, trade-offs, and decision boundaries into actionable parameters for autonomous systems.

## Summary

The video presents a case study of a fictional company, CLA, whose AI customer service agent saved $60 million by replacing 853 employees but caused severe reputational damage by providing generic, robotic support. The agent was technically brilliant at optimizing for the measurable goal of fast ticket resolution, but this was the *wrong* objective. The company's real intent was to build lasting customer relationships and lifetime value—goals the agent couldn't understand because they were never explicitly encoded.

This failure illustrates the **intent gap**, the most important unsolved problem in enterprise AI. The evolution of AI disciplines is framed as three layers:

### The Three Disciplines of AI Integration

*   **Prompt Engineering (Individual)**: Crafting instructions for single sessions. It's a personal skill but doesn't scale.

*   **Context Engineering (Organizational Knowledge)**: Providing agents with access to data via RAG pipelines, MCP servers, and structured knowledge bases. This is where most investment is today, but it's necessary, not sufficient.

*   **Intent Engineering (Organizational Purpose)**: The emerging critical layer. It's the practice of making organizational goals, values, trade-offs, and decision boundaries **machine-readable and machine-actionable**. It tells agents *what to want*, not just what to know.

### The Three-Layer Organizational Gap
1.  **Unified Context Infrastructure**: A lack of standardized, secure, and governed systems for agents to access organizational data across departments (a 'shadow agents' problem). Protocols like the **Model Context Protocol (MCP)** are a start, but implementation is a political and architectural challenge.
2.  **Coherent AI Worker Toolkit**: Organizations provide tools (like Microsoft Copilot) but lack shared workflows and understanding of how AI connects to core processes, leading to activity without productivity.
3.  **Intent Engineering Proper**: This layer is mostly nonexistent. Unlike humans, agents cannot absorb company culture through osmosis. They require explicit, structured expressions of intent—**goal translation infrastructure** that converts human-readable objectives (e.g., 'customer satisfaction') into agent-actionable parameters, decision boundaries, and feedback loops.

The conclusion is that the AI race is no longer about model intelligence but about **organizational intent infrastructure**. A company with a mediocre model and extraordinary intent alignment will outperform a company with a frontier model and fragmented, unaligned knowledge every time. The most important investment in 2026 is not another model subscription, but building the systems that let AI operate with a strategically correct understanding of organizational purpose.

## Context

As AI agents move from simple chatbots to long-running autonomous systems capable of replacing or augmenting human workflows at scale, enterprises face a critical new challenge. Technical capabilities (prompting, context access) are no longer the bottleneck. The new bottleneck is ensuring these powerful agents act in alignment with complex, often unstated, organizational goals and values. This matters for executives, product leaders, and engineers deploying AI, as failures in intent alignment can lead to technically successful systems that cause strategic harm, as seen in the CLA case study.
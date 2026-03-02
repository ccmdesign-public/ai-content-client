---
metadata:
  videoId: "TJ-vWGCosdQ"
  title: "Gemini 3 isn't the answer. How to Solve 1 Million Steps with 0 Errors"
  description: "Paper: https://arxiv.org/abs/2511.09030


    A revolutionary paper just dropped (November 2025) that changes everything we know about building AI Agents. We’ve been obsessed with bigger context windows and smarter models, but the \"MAKER Framework\" proves we were wrong.

    This breakdown explains how researchers achieved 1,000,000 logical steps with ZERO errors using \"dumb\" models and a brilliant new architecture.


    In this video:

    Why your agents fail at long tasks (The Math of Failure).

    The \"MAKER\" Framework explained visually.

    Why \"Stateless\" agents beat long-context models.

    The Scaling Law: Why Small Models + Voting is cheaper than GPT-4.

    #AI #LLM #MachineLearning #Agents #SoftwareArchitecture #gemini-3"
  channel: "Reinike AI"
  channelId: "UCO9epahzfdOtOQP3WLN4ELQ"
  duration: "PT8M19S"
  publishedAt: "2025-11-20T02:25:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/TJ-vWGCosdQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=TJ-vWGCosdQ"
processedAt: "2026-01-12T23:32:47.842Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "The MAKER framework enables LLMs to complete 1M+ steps with zero errors by treating agents as stateless functions. Key techniques include:

  - **Maximal Decomposition**: Removing chat history to prevent context drift.

  - **Red Flagging**: Using syntax errors as proxies for logic failures.

  - **K-Voting**: Using parallel small models to achieve 99.9999% accuracy through statistical redundancy.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2088
  outputTokens: 906
  totalTokens: 5065
  processingTimeMs: 17817
tools:
  - name: "MAKER Framework"
    url: null
  - name: "Llama 3 8B"
    url: null
  - name: "GPT-4"
    url: null
  - name: "Gemini 3"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "agents"
  - "architecture"
  - "best-practices"
  - "llm"
tagsNormalizedAt: "2026-03-01T21:19:30.293Z"
---

## Key Takeaways

The Cognizant AI lab research proves that LLM reliability is an engineering architecture problem rather than a model capability issue.

- **Stateless execution** eliminates 'context drift' by replacing conversation history with an external state object.

- **Red Flagging** utilizes strict parsing to catch hallucinations early, forcing retries if outputs deviate from specific formats.

- **Strategic Voting** (first-to-ahead-by-K) allows ensembles of cheaper models to reach near-perfect accuracy through statistical redundancy.

- **Economic Scaling** shows that many parallel small models are more cost-effective and reliable than one high-end model for long-chain tasks.

## Summary

### The Crisis of Long-Horizon Tasks
Most AI agents fail when tasks exceed a few dozen steps due to **context drift**. As the chat history grows, the model becomes distracted by its own previous outputs. The mathematical reality is brutal: a model with 99% accuracy has nearly a 0% chance of completing a 1,000-step task correctly ($0.99^{1000} \approx 0$). The paper from Cognizant AI lab solves this using the **MAKER** (Massively Decomposed Agentic Processes) framework, achieving zero errors over one million steps using the Tower of Hanoi benchmark (1,048,575 moves).

### The MAKER Framework Pillars
The first pillar is **Maximal Decomposition**. Unlike traditional agents that append history to a prompt, MAKER agents are **stateless functions**. Each step receives only the rules, the current state, and the immediate goal. By 'killing' the agent after every step and spinning up a new one, the system eliminates the burden of past context, preventing the model from getting confused by historical data. The external state object becomes the only 'memory' that matters.

The second pillar, **Red Flagging**, serves as an early warning system. Researchers found that logic errors are almost always preceded by syntax errors or verbosity. If a model is asked for JSON but provides a preamble, or if its 'thinking' tokens spike unexpectedly, the system flags a hallucination. Instead of trying to fix the output, the system discards it and triggers a retry, treating the syntax error as a proxy for a logic error.

The third pillar is **First-to-ahead-by-K Voting**. This uses a voting algorithm where multiple models run in parallel. A result is only accepted when one option leads the others by a specific margin (K). This statistical redundancy allows a system powered by mediocre models (like Llama 3 8B) to achieve **99.9999% accuracy**, outperforming a single 'genius' model at a fraction of the cost.

### Economic and Practical Implications
This approach reveals a new **scaling law**: small models plus voting are cheaper and more reliable than large models used once. For developers, this means shifting focus from prompt engineering to **state management**. To implement this today, developers should:

- Stop using chat history for state; use external objects like file systems or databases.

- Decompose tasks into micro-steps (e.g., writing a single signature vs. a whole function).

- Implement parallel voting for high-stakes decision points to ensure reliability.

## Context

This paper addresses the 'reliability gap' that prevents AI from moving from simple demos to production-ready software. While the industry often waits for 'frontier' models like Gemini 3 or GPT-5 to solve reasoning, this research proves that existing small models are sufficient if the architecture is sound. It is essential for software engineers and AI architects who need to build high-stakes systems in fields like automated scientific discovery, database migration, or large-scale code refactoring where a single error can be catastrophic. It suggests a future where reliability is engineered through redundancy and decomposition rather than just scale.

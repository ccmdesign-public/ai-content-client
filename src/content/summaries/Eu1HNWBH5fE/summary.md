---
metadata:
  videoId: "Eu1HNWBH5fE"
  title: "The End of Manual Debugging"
  description: "In this episode of Founder Firesides, YC Group Partner Aaron Epstein talks to Sherwood Callaway, founder of Sazabi (S21), who exited his first YC company and is coming back through YC for a second time. Sazabi is an AI-native observability platform that replaces tools like Datadog, letting engineers ask plain-English questions about their production systems instead of digging through dashboards. They discuss why logs are the only telemetry you need, lessons from building a company that didn't play to his strengths, and why maintaining software is AI's biggest untapped opportunity.


    Apply to Y Combinator: https://www.ycombinator.com/apply

    Work at a startup: https://www.ycombinator.com/jobs"
  channel: "YC Root Access"
  channelId: "UCxIJaCMEptJjxmmQgGFsnCg"
  duration: "PT29M43S"
  publishedAt: "2026-03-25T14:00:20Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Eu1HNWBH5fE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Eu1HNWBH5fE"
processedAt: "2026-03-25T14:44:47.692Z"
source: "youtube"
tldr: "Sherwood, a second-time YC founder, introduces Sasabi, an AI-native observability platform that uses AI agents to analyze logs and answer questions about production systems, aiming to end manual debugging and move toward self-healing software."
tools:
  - name: "DataDog"
    url: null
  - name: "Sentry"
    url: null
  - name: "Kubernetes"
    url: null
  - name: "Cursor"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Programming"
tags:
  - "agents"
  - "debugging"
  - "engineering"
  - "monitoring"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 22435
  outputTokens: 618
  totalTokens: 23053
  processingTimeMs: 34515
tagsNormalizedAt: "2026-03-25T14:52:09.697Z"
---

## Key Takeaways

Sherwood shares his journey and vision for Sasabi, an AI-native observability platform.

## Summary

Sherwood, a second-time YC founder, introduces his new company Sasabi, an AI-native observability platform designed for fast-moving engineering teams. The platform leverages AI agents to analyze log data, allowing users to ask natural language questions about their production systems, such as 'why is production down?' or 'which commit is responsible?'. This approach aims to dramatically reduce the time engineers spend manually debugging issues.

Sasabi is built on a controversial principle: **'logs are all you need'**. This challenges the traditional 'three pillars of observability' (logs, metrics, and traces) by arguing that logs, which are easy for any developer to produce and understand, become immensely powerful when analyzed by modern AI. This eliminates the need for complex, multi-telemetry instrumentation.

Sherwood's journey to Sasabi was informed by his previous experiences. He started his career in infrastructure and DevOps at Crunchbase and later helped build the observability team at Brex during its hypergrowth phase. His first startup, Opkit, was a healthcare fintech company built on LLM voice agents. While Opkit provided valuable lessons, he realized it wasn't aligned with his personal expertise and passion. This led to a key insight: **founders should build companies based on their deep personal experience and strengths**.

With Sasabi, Sherwood is applying this lesson, creating a developer tool in a space he knows intimately. The company's long-term vision is to enable **self-healing software** that can improve itself without human intervention, automating the maintenance side of software engineering just as AI coding tools are automating creation.

## Context

This interview highlights the evolution of observability and debugging in the AI era. As AI coding assistants like Cursor automate feature creation, a massive gap remains in maintaining and debugging existing software. Sasabi represents a paradigm shift, using AI to understand unstructured log data and provide instant insights, potentially ending the era of manual, time-consuming debugging sessions. This is critical for engineering teams at startups and scale-ups who need to move quickly and maintain reliability.
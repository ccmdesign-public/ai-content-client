---
metadata:
  videoId: "UpWNdSVWA7M"
  title: "The Q/A Layer for the AI Coding Era"
  description: "In this episode of Founder Firesides, YC Managing Partner Harj Taggar talks to Weiwei Wu and Jeff An, co-founders of Momentic (W24), who just raised a $15M Series A. Momentic is the verification layer for software — an AI-powered testing platform that impersonates end users to catch bugs before they ship. Powering companies like Notion, Quora, and Built with over a million test runs a day, they discuss why the explosion of AI-generated code makes testing more critical than ever and their vision for a future where engineers write specs, not code.


    https://momentic.ai


    Apply to Y Combinator: https://www.ycombinator.com/apply

    Work at a startup: https://www.ycombinator.com/jobs"
  channel: "YC Root Access"
  channelId: "UCxIJaCMEptJjxmmQgGFsnCg"
  duration: "PT33M55S"
  publishedAt: "2026-03-23T14:00:45Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UpWNdSVWA7M/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UpWNdSVWA7M"
processedAt: "2026-03-24T03:15:24.652Z"
source: "youtube"
tldr: "Momentic is building the verification layer for the AI coding era, positioning itself as an essential 'source of truth' that validates AI-generated code by performing functional testing to ensure applications work as intended, addressing the critical bottleneck of code verification as AI massively increases code output."
tools:
  - name: "Momentic"
    url: null
  - name: "Cursor"
    url: null
  - name: "Claude Code"
    url: null
  - name: "CodeEx"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Selenium"
    url: null
  - name: "Cypress"
    url: null
  - name: "Playwright"
    url: null
  - name: "Model Context Protocol (MCP)"
    url: null
  - name: "Notion"
    url: null
  - name: "Figma"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "ai-general"
  - "automation"
  - "llm"
  - "startup"
  - "testing"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 24565
  outputTokens: 1702
  totalTokens: 26267
  processingTimeMs: 191503
tagsNormalizedAt: "2026-03-24T04:15:57.432Z"
---

## Key Takeaways

Momentic's co-founders discuss their vision for software verification in an AI-driven world.

*   **The 'Source of Truth' Layer:** In the AI coding era, **code becomes an implementation detail**. The real source of truth is the spec or requirements. Momentic acts as the independent verification layer that ensures AI-generated code meets those specs.

*   **Solving the Developer Reluctance Problem:** Developers historically dislike writing tests because it's not 'productive' work that customers see. Momentic automates this, making verification a seamless part of the development loop, especially when using AI coding agents like Cursor or Claude Code.

*   **The Bottleneck is Verification, Not Generation:** As AI dramatically increases code output, the primary bottleneck shifts from writing code to **verifying it works correctly**. Tools like linters and code review are insufficient for ensuring functional correctness in production.

*   **Truth-Driven Development:** The future workflow involves engineers writing detailed specs (user journeys, success criteria, edge cases) in plain English. AI agents build to that spec, and Momentic automatically validates the implementation, maintaining the 'source of truth' over time.

*   **Specialized for Complex Apps:** Unlike general AI agents, Momentic's agents are optimized for speed (sub-300ms steps) and can reliably test complex, dynamic applications with rich text editors, canvases, and drag-and-drop interfaces, which are notoriously difficult for traditional automation.

*   **Integrates with the AI Dev Stack:** Momentic fits into the developer workflow via integrations (like MCP for Cursor/Claude) and CI/CD pipelines, allowing AI coding agents to call Momentic to verify changes in real-time during development, not just before deployment.

## Summary

### Introduction and Company Overview

The video features Weiwayi and Jeff, co-founders of Momentic, a YC Winter '24 company that just raised a $50 million Series A from Standard Capital. Momentic is described as the **'verification layer for software'**, processing over a million test runs daily for companies like Notion, Built, Kora, and Zero. The founders explain the raise was timed to scale engineering and go-to-market teams after establishing a repeatable sales motion.

### The Problem with Traditional Testing

The discussion begins by addressing the perennial issue in software engineering: developers' reluctance to write and maintain tests. Jeff shares his experience at Robinhood, where managing a team to enforce 80% code coverage was 'basically impossible' because testing doesn't feel like productive work—it's not customer-facing, flashy, or directly tied to performance evaluations. This creates a significant risk to product quality and reliability.

### The AI Coding Era and the Verification Bottleneck

The conversation pivots to the impact of AI code generation (Cursor, Claude Code, CodeEx). The founders argue that while AI massively accelerates code output, it creates a new, critical bottleneck: **verification**. Linters and code reviews check for patterns and best practices, but they don't verify that the application actually works for the end-user. The status quo of manual 'bug bashes' before releases is completely unscalable in this new high-velocity environment.

### What Momentic Does and How It Fits

Momentic performs **functional testing** by impersonating real users, clicking through applications to validate user flows. It integrates into the developer workflow in two key ways:

*   **Within the Developer Loop:** Via integrations like MCP, AI coding agents (Cursor, Claude Code) can call Momentic to write and run tests while a developer is building a feature, providing immediate feedback on functional correctness.

*   **In CI/CD Pipelines:** As a gatekeeper before code is merged and deployed, ensuring nothing breaks from an end-user perspective.

The founders emphasize that general AI agents are not optimized for browser testing—they are slow and bad at debugging complex interactions. Momentic's specialized agents run steps in under 300ms and are built to handle intricate applications like rich text editors and canvases.

### The Future: Truth-Driven Development and the Evolving Engineer Role

The most profound insight is the vision for **'truth-driven' or 'spec-driven' development**. The founders predict that in the near future (3-9 months), engineers will stop reviewing code and instead focus on writing detailed, plain-English specs. Code, whether written in TypeScript or Rust by an AI, becomes a commodity implementation detail.

The **source of truth shifts from the codebase to the spec**. Momentic's role is to be the independent system that validates the AI's implementation against that spec, closing the feedback loop for coding agents. This is crucial because you can't trust the AI agent to self-verify; you need a third-party source of truth. Furthermore, Momentic maintains this source of truth over time, automatically suggesting test updates when the UI changes, unlike static Playwright or Selenium code that becomes a maintenance burden.

### Case Study: Notion and Measuring ROI

The founders share how they onboarded Notion, a major customer, after a viral tweet. Notion was struggling with a large, flaky Selenium test suite that was high-effort to maintain. Momentic allowed them to describe tests in plain English and now runs nearly half a million test runs daily, with tests required to pass before any PR merge.
ROI is measured in:

*   Developer hours saved compared to legacy tools.

*   The number of regressions and production incidents prevented from reaching customers.

### Founder Insights on Culture, Hiring, and Motivation

The founders discuss building company culture around radical candor, direct feedback, and giving everyone a voice in the product roadmap. On hiring in the AI era, they believe a good engineer is still a good engineer—adaptability, curiosity, and strong product intuition are key assets that AI tools amplify rather than replace.
Their motivation stems from the massive impact solving code verification could have on global software productivity and a fierce desire to 'win and destroy' all competitors in the vast market of software validation. They conclude with advice for engineer-founders: learning to sell requires getting 'reps in' and being comfortable with the process.

## Context

This is an interview from the YC Root Access channel with the co-founders of Momentic, Weiwayi and Jeff. The discussion is framed within the seismic shift occurring in software development due to the rapid adoption of AI coding assistants like Cursor and Claude Code. The video contributes to the critical conversation about how software quality, testing, and developer workflows must evolve when code generation is commoditized and accelerated by AI. This is highly relevant as engineering teams globally grapple with integrating these new tools while maintaining reliability. The interview is most beneficial for engineering leaders, product managers, and developers who are actively using or planning to use AI coding tools and are concerned about maintaining software quality and defining new development paradigms.
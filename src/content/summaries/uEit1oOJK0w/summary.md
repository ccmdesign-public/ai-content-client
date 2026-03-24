---
metadata:
  videoId: "uEit1oOJK0w"
  title: "GSD Is the Missing Piece For Claude Code"
  description: "Every AI coding agent framework claims to be the best. GSD, get shit done, is built different. Whether you use Claude Code, Gemini CLI, or any vibe coding setup, picking the wrong framework with Claude wastes more time than bad code.


    BMAD Video: https://youtu.be/fD8NLPU0WYU?si=zLOFI5UAX01xKAjD

    SuperPowers Video: https://youtu.be/romGzY0Xu0s?si=QQqBx2DKNANSHz0V\ 

    Get Shit Done: https://github.com/gsd-build/get-shit-done


    AI agents framework selection is the real bottleneck, not the framework itself. In this video, we break down three approaches, GSD, BMAD, and Superpowers, and show you exactly when to use each one. GSD is built for experimental MVPs where requirements shift, BMAD is for locked-in specs with thorough pre-planning, and Superpowers uses TDD for high-stakes agentic AI systems where edge cases can't be missed.


    We walk through a full GSD installation and build, from the initial planning phase through multi-wave implementation with subagents, adversarial plan verification, and Playwright testing. You'll see how it manages context rot, parallelizes work across coding agents, and keeps documentation concise so your AI automation pipeline stays focused.


    Whether you're evaluating the best AI for coding your next MVP or comparing the best coding AI workflows for production apps, this breakdown will help you stop guessing. Most coding AI comparisons skip the selection criteria entirely, they just tell you which AI tools are trending. We go deeper into how AI works within each framework and why the structure around your AI matters more than the model itself. If you've looked at OpenAI, Claude, or any other provider and wondered why your agent keeps drifting off task, the answer is usually in the framework, not the model.


    This applies whether you're using Claude Code, vibe coding solo projects, or building with opencode alternatives. The principles carry across every coding setup. And if none of the existing frameworks fit, we point you to a previous video on building your own AI coding workflow from scratch.


    Hashtags:

    #ClaudeCode #Claude #VibeCoding #AIAutomation #Coding #OpenCode #AgenticAI #AICoding"
  channel: "AI LABS"
  channelId: "UCelfWQr9sXVMTvBzviPGlFw"
  duration: "PT13M44S"
  publishedAt: "2026-03-17T16:13:18Z"
  thumbnailUrl: "https://i.ytimg.com/vi/uEit1oOJK0w/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=uEit1oOJK0w"
processedAt: "2026-03-24T00:52:39.540Z"
source: "youtube"
tldr: "GSD (Get Stuff Done) is an AI coding framework for rapid MVP development with iterative planning, designed for projects with uncertain requirements where experimentation is needed, contrasting with BMAD's thorough pre-planning and Superpowers' test-driven approach."
tools:
  - name: "GSD"
    url: null
  - name: "BMAD"
    url: null
  - name: "Superpowers"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Claude Opus"
    url: null
  - name: "Next.js"
    url: null
  - name: "Playwright"
    url: null
  - name: "Context 7 MCP"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "ai-coding"
  - "claude"
  - "mcp"
  - "nextjs"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 10962
  outputTokens: 993
  totalTokens: 11955
  processingTimeMs: 32366
tagsNormalizedAt: "2026-03-24T04:10:09.881Z"
---

## Key Takeaways

This video compares three AI coding frameworks to help you choose the right tool for your project type and workflow needs.

## Summary

**Choosing the Right AI Coding Framework**

The video emphasizes that selecting an AI coding framework depends entirely on your project's needs, not on which one is "best." There is no one-size-fits-all solution. Each framework excels at the specific use case it was designed for. Picking the wrong one leads to frustration, over-engineering, or under-preparation.

**Framework Comparison: GSD vs. BMAD vs. Superpowers**

*   **GSD (Get Stuff Done)** is ideal for **rapid MVP development** and projects with **uncertain or evolving requirements**. It uses an iterative, step-by-step planning approach without locking you into extensive pre-planned phases. This makes it perfect for experimental projects where you need to figure things out as you build.

*   **BMAD** takes the opposite approach, requiring **thorough pre-planning and documentation** (PRDs, architecture docs) before any code is written. It's excellent for well-defined, conventional systems (like a custom CRM) where requirements are stable and you want to avoid loopholes. However, it struggles with requirement changes and has a slower startup time.

*   **Superpowers** is based on **Test-Driven Development (TDD)**. It's designed for high-stakes projects where missing an edge case is costly (e.g., agentic platforms). It generates tests first, leaving less room for experimentation, and is best used when the planning is already complete.

**Deep Dive into GSD's Architecture and Workflow**

GSD is built to prevent **context rot** by using **sub-agents** that spawn separate processes for isolated tasks, keeping the main agent's context clean. Its prompts are structured in **XML** for better performance with Claude models.

The workflow is highly structured:
1.  **Initialization & Scoping:** The agent asks broad questions about the app idea, audience, and features to understand *what* to build, not *how* it might break.
2.  **Planning & Research:** It creates a concise `project.md` file and spawns multiple research agents in parallel. A synthesizer agent condenses findings and flags potential issues.
3.  **MVP Definition & Roadmap:** It focuses on identifying truly essential features for V1, generates a roadmap for approval, and breaks the plan into parallelizable **waves**.
4.  **Adversarial Planning & Implementation:** A unique **planning agent** creates the plan while a **verifier agent** cross-checks it, performing adversarial validation automatically. Implementation is then carried out by dedicated agents.
5.  **Verification & Iteration:** After each wave, it runs **Playwright** tests, provides a verification summary, and proceeds through phases until the app is complete. The system is documentation-light to keep the agent focused.

The video demonstrates installing GSD for a **Next.js** project and notes that while it used web search for research, connecting a tool like **Context 7 MCP** would provide better grounding.

## Context

As AI coding assistants and frameworks proliferate, developers face choice paralysis. Understanding the core philosophy and ideal use case for each framework is crucial for productive development. This video provides a practical framework selection guide, helping developers match tools like GSD, BMAD, and Superpowers to their specific project requirements—whether building rapid MVPs, stable enterprise systems, or safety-critical applications. This matters for anyone using AI to accelerate development while maintaining control over the final product.
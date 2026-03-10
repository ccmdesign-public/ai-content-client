---
metadata:
  videoId: "73F6ZURl1MQ"
  title: "Cursor, Claude Code and Codex all have a BIG problem"
  description: "A lot of our tools frankly kinda suck. Especially when you compare them to what we had before, so what happened?


    Thank you Augment Code for sponsoring! Check them out at: https://soydev.link/augment


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT44M8S"
  publishedAt: "2026-03-01T11:46:36Z"
  thumbnailUrl: "https://i.ytimg.com/vi/73F6ZURl1MQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=73F6ZURl1MQ"
processedAt: "2026-03-10T15:11:14.203Z"
source: "youtube"
tldr: "Theo argues that AI-powered coding tools like Cursor, Claude Code, and Codex have a fundamental quality problem because they were built using earlier, less capable AI models, creating 'slopfest' codebases with bad patterns that multiply exponentially, and he advocates for aggressive codebase hygiene, using latest models, and potentially maintaining separate 'slop' and 'polished' codebase versions."
tools:
  - name: "Cursor"
    url: null
  - name: "Claude Code"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "Super Maven"
    url: null
  - name: "Codex"
    url: null
  - name: "Augment"
    url: "https://soyv.link/augment"
  - name: "VS Code"
    url: null
  - name: "Bun"
    url: null
  - name: "React"
    url: null
  - name: "Tailwind CSS"
    url: null
  - name: "GraphQL"
    url: null
  - name: "Convex"
    url: null
  - name: "TypeScript"
    url: null
  - name: "Phaser.js"
    url: null
  - name: "Framer"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "best-practices"
  - "claude"
  - "llm"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 34242
  outputTokens: 1804
  totalTokens: 36046
  processingTimeMs: 60926
tagsNormalizedAt: "2026-03-10T16:48:00.307Z"
---

## Key Takeaways

Theo critiques the current generation of AI-powered development tools, arguing their core problem is being built with the same flawed 'vibe coding' approach they enable. The key insights are:

*   **AI tools were built with AI, creating a 'slopfest'**: Tools like Cursor and Claude Code were developed using earlier, less capable models (like Sonnet 3.7), embedding bad patterns and technical debt from the start.

*   **Codebase inertia is real and AI accelerates it**: The quality of a codebase peaks around 6 months; after that, bad patterns multiply exponentially, and AI agents copy and propagate these bad patterns faster than humans.

*   **Maintain aggressive codebase hygiene**: Have zero tolerance for bad patterns, delete suspicious code immediately, and use 'sledgehammer development'—rewriting entire sections with AI rather than fixing them.

*   **Plan extensively with the latest models**: Spend significant time in planning mode with top-tier models (like Opus 4.5/4.6, Codex 5.3), speculating the desired outcome before letting the agent build.

*   **Keep unrelated features out of the main codebase**: With AI, it's easier than ever to create separate projects/services; fight the urge to cram everything into one monolithic, sloppy repository.

*   **Consider a dual-codebase strategy**: Inspired by 'Vampire Survivors,' maintain a fast, 'slop' version for prototyping and a separate, polished version for production, porting only validated ideas.

## Summary

### The Core Problem: AI Tools Built with AI

Theo, an early investor in Cursor with ties to Anthropic, opens with a blunt critique: modern AI coding tools like Cursor, Claude Code, and Codex 'all suck.' He identifies a foundational flaw: these tools were themselves built using the same early-generation AI models they promote, a form of 'dogfooding' that has backfired. Historically, writing a compiler in its own language (like C in C) was beneficial, but using immature AI models for development has locked in poor code quality from the start.

He illustrates this with visceral frustrations: Cursor's UI is buggy and inconsistent, with removed features like the agent/editor toggle causing user confusion. Claude Code, a CLI tool, exhibits absurd non-deterministic behavior, like failing to block input during image uploads, leading to lost work and rage-inducing user experiences. The core issue isn't just the non-deterministic nature of the underlying LLMs, but the 'really bad' quality of the application code itself.

### The Dynamics of Codebase Decay and AI Acceleration

Theo introduces the critical concept of **'codebase inertia.'** He posits that a codebase's quality peaks around the 6-month mark of focused development. After this point, maintenance becomes harder, and the codebase's quality trajectory plateaus or declines. The initial patterns—good or bad—set the tone.

The problem is that AI agents, designed to reference and emulate existing code, dramatically accelerate the spread of bad patterns. While good code expands linearly, bad code (which is often the easiest to find and copy) multiplies exponentially. An agent like Codex will happily copy a poor pattern from one part of the codebase and apply it elsewhere, believing it's acceptable because it already exists. This creates a feedback loop of deteriorating quality, or a **'slopfest.'**

### Strategies for Maintaining Quality in the AI Era

Given this reality, Theo prescribes a rigorous, aggressive approach to codebase management:

*   **Tolerate Nothing**: Adopt a zero-tolerance policy for bad code. If a bad pattern is discovered, 'murder it with intensity' immediately, regardless of deadlines. 'Later' means never.

*   **Embrace Sledgehammer Development**: The cost of rewriting ('sledgehammering') large sections of code has plummeted with capable AI. If a module is poorly designed, don't fix it—delete it and have an agent rebuild it correctly based on a solid plan.

*   **Invest Heavily in Planning**: The most important shift is to spend more time in 'plan mode' with the AI. Use the latest models (Opus 4.5+, Codex 5.3) to spec out features in detail through conversation before any code is written. Read and critique the plan thoroughly.

*   **Ask the AI 'Why'**: When an agent produces subpar work, interrogate it. Ask where it got an idea or pattern. If the source is a bad example in your codebase, eliminate that source.

*   **Create More, Smaller Codebases**: A major source of slop is cramming unrelated features (e.g., internal admin tools) into a main user-facing codebase. With AI, creating and deploying new, isolated projects is trivial. Incentivize new project creation over 'old project sloppification.'

### A Radical Proposal: The Dual-Codebase Future

Theo concludes with a speculative but compelling model inspired by the game *Vampire Survivors*. Its creator prototypes new game features in a 'slopfest' Phaser.js (JavaScript) codebase for rapid experimentation. Once ideas are validated, a separate team ports them into a polished, performant C++ codebase for shipping.

Theo suggests this pattern might be the future for software built with AI. Companies like Cursor could treat their current buggy codebase as the 'slop' prototyping version. They could then start a new, clean codebase from scratch, using AI to port over only the validated, core functionalities, leaving the cruft behind. He reveals that his own team at T3 is considering this approach for their tools, using a 'vibecoded slop version' for ideation and a separate, stable version for reliable product.

Ultimately, he argues that engineering discipline matters more than ever. The availability of powerful AI doesn't eliminate the need for quality; it demands new, stricter methodologies to prevent AI from amplifying our worst tendencies and to harness it for creating truly excellent software.

## Context

Theo, from the channel t3.gg, is a developer, entrepreneur, and investor known for his deep technical analysis and strong opinions on development tools and trends. He has early investments in companies like Cursor and has worked at major tech firms, giving him an insider's perspective. This video contributes to the ongoing critical conversation about the real-world quality and reliability of the current wave of AI-powered development assistants, moving beyond hype to examine systemic flaws. It's highly relevant as these tools become central to developers' workflows, yet many express frustration with instability and bugs. The video is essential for software engineers, engineering managers, and tech leaders who use or build with AI coding tools, offering a framework for mitigating technical debt in an AI-accelerated development environment.
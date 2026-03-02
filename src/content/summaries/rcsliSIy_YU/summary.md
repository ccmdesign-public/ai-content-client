---
metadata:
  videoId: "rcsliSIy_YU"
  title: "Automating Large Scale Refactors with Parallel Agents - Robert Brennan, AllHands"
  description: "Today's agents are best at small, atomic coding tasks. Much larger tasks--like major refactors and breaking dependency updates--are highly automatable but hard to one-shot.


    In this session, we'll discuss patterns for orchestrating large-scale code changes with swarms of agents and a human in the loop.


    We'll also work through a concrete example: migrating an entire codebase from one React state management library to another.


    https://twitter.com/RobertBrennan


    Slides: https://dub.sh/openhands-workshop"
  channel: "AI Engineer"
  channelId: "UCLKPca3kwwd-B59HNr-_lvA"
  duration: "PT1H16M21S"
  publishedAt: "2026-01-08T16:30:23Z"
  thumbnailUrl: "https://i.ytimg.com/vi/rcsliSIy_YU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=rcsliSIy_YU"
processedAt: "2026-01-11T17:18:42.798Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Robert Brennan of AllHands introduces Open Hands, an open-source agent framework that achieves 30x productivity gains by orchestrating fleets of parallel agents to tackle massive technical debt.

  - The central thesis is that the next frontier of AI engineering isn't better autocomplete, but breaking down 'toil' tasks—like CVE remediation and framework migrations—into PR-sized chunks for parallel ex\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 12266
  outputTokens: 1258
  totalTokens: 14902
  processingTimeMs: 20983
tools:
  - name: "Open Hands"
    url: null
  - name: "React"
    url: null
  - name: "Trivy"
    url: null
  - name: "npm audit"
    url: null
  - name: "Refactor SDK"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "Devin"
    url: null
  - name: "AllHands"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "architecture"
  - "automation"
  - "best-practices"
  - "refactoring"
tagsNormalizedAt: "2026-03-01T21:19:30.299Z"
---

## Key Takeaways

Software engineering is shifting from manual coding to agent management, requiring a new set of orchestration skills. **Open Hands** (formerly Open

Devin) provides an MIT-licensed environment to automate the 'inner loop' of development at scale.

* **Orchestration vs. Single Agents**: While single agents offer a 20% productivity lift for ad-hoc tasks, parallel orchestration can achieve 3000% efficiency for repeatable 'toil' like security patching.

* **The Verifier-Fixer Loop**: A robust refactoring pipeline uses a **Verifier** to identify code smells or vulnerabilities and a **Fixer** agent to execute scoped, 'PR-sized' changes.

* **Task Decomposition**: Large projects must be broken down into leaf-nodes on a **Dependency Graph** to prevent agents from hitting context limits or compounding errors over long trajectories.

* **Human-in-the-Loop (90% Automation)**: The goal is not 100% autonomy but a 90% reduction in effort, where humans provide high-level scaffolding and 'rubber-stamp' agent-generated pull requests.

* **Context Sharing Strategies**: Effective orchestration requires managed communication between agents, such as shared **Agent.md** files or point-to-point messaging to prevent redundant errors.

## Summary

### The Evolution of AI in Software Engineering
Robert Brennan outlines the trajectory of AI coding tools, moving from simple, context-unaware snippets to the current 'bleeding edge' of **Parallel Agent Orchestration**. Early tools like ChatGPT provided disconnected code, while the second generation (Git

Hub Copilot) integrated context-aware autocomplete within the IDE. The leap in early 2024 with **Devin** and **Open Hands** introduced autonomous agents capable of running code, debugging errors, and searching documentation—essentially automating the developer's inner loop. Brennan argues that even if models stop improving today, engineering will transform drastically as we operationalize these agents into fleets that function like managed teams.

### The Need for Orchestration
Single agents struggle with massive refactors due to several technical and psychological hurdles. Context windows are limited, and long-running tasks often suffer from 'compounding errors' where a small mistake early on ruins the entire trajectory. Additionally, agents can become 'lazy,' stopping mid-task or requesting human intervention for repetitive work. Orchestration solves this by decomposing a massive 'mountain of tech debt' into small, parallelizable units. This approach is particularly effective for **toil**—tasks that are high-volume, repeatable, and low-creativity—such as updating Java versions, migrating Spark jobs, or remediating thousands of **CVEs** (Common Vulnerabilities and Exposures) across an enterprise.

### The Open Hands Refactor SDK
The video features a detailed demonstration of the **Refactor SDK**, which visualizes a codebase as a complex dependency graph. To manage a refactor, the tool batches related files into 'human-sized chunks' corresponding to potential pull requests. The process follows a specific pipeline: first, a **Verifier** (which can be programmatic or LLM-based) identifies issues; next, a **Fixer** agent is spun up to address those specific issues in a sandbox environment. This ensures that changes remain tightly focused and easier for humans to review. Brennan highlights a case study where a client used this method to remediate vulnerabilities across thousands of repositories, achieving a 30x improvement in resolution time.

### Strategies for Decomposition and Context
Successful orchestration relies on two pillars: **Task Decomposition** and **Context Sharing**. For decomposition, Brennan suggests moving through the dependency tree from the 'leaf nodes' (utilities) up to the entry points. Another strategy involves 'scaffolding,' where an agent sets up a temporary structure that allows the application to function in both old and new states simultaneously during a migration. For context sharing, the video explores several methods, from simple manual updates to 'Agent.md' files where agents document their learnings for others. The most advanced method involves point-to-point messaging between agents, though Brennan warns that this can increase non-determinism and lead to 'infinite loops' if not properly constrained.

### Live Workshop: CVE Remediation
The final segment focuses on a practical exercise using the Open Hands SDK to build a parallel CVE solver. The workflow involves an initial agent scanning a repository (using tools like **Trivy** or **npm audit**) to identify vulnerabilities. For every vulnerability found, the system spawns a separate parallel agent tasked with researching the fix, updating dependencies, and opening a pull request. This parallelization ensures that if one agent gets stuck on a complex dependency conflict, the other 90% of the patches still proceed, allowing the human to focus only on the truly difficult cases.

## Context

Robert Brennan is the co-founder and CEO of All

Hands (Open Hands), with over a decade of experience in developer tools and NLP. This presentation was delivered at the AI Engineer conference, reflecting a pivotal moment in the industry where the focus is shifting from generative AI chat interfaces to autonomous agent workflows. It addresses the massive 'tech debt' crisis facing large-scale software organizations that struggle to keep up with security patches and framework modernizations. This content is highly relevant for Engineering Managers, CTOs, and Platform Engineers looking to scale their team's impact by treating AI as a 'force multiplier' rather than just a coding assistant. It bridges the gap between theoretical AI capabilities and the practical, gritty reality of maintaining production-grade software at scale.

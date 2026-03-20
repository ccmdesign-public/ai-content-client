---
metadata:
  videoId: "-DXkF2Q69Jw"
  title: "GitHub Actions are DEAD. (Use Agentic Workflows instead)"
  description: "GitHub is moving past traditional automation with Agentic Workflows, a new project that allows you to manage CI/CD pipelines using natural language instead of rigid code. We’ll show you how to set up an AI DevOps assistant that uses \"Productive Ambiguity\" to exercise judgment and maintain code quality autonomously within your repository. Learn how to bridge the gap between AI intelligence and standard security guardrails to build a self-governing system that modernizes your development workflow.


    🔗 Relevant Links

    Github Agentic Workflows: https://github.github.com/gh-aw/


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack


    📌 Chapters:

    00:00 Intro

    00:34 What are GitHub Agentic Workflows

    01:09 Security First: Intelligence with Guardrails

    01:52 Installation & The Two-Step Process

    02:25 Live Demo: Setting up the Agent

    03:17 Creating the AI Auditor (Natural Language)

    04:24 Testing the Agent with a Pull Request

    05:38 Main Takeaways and Thoughts"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT7M7S"
  publishedAt: "2026-02-22T01:27:51Z"
  thumbnailUrl: "https://i.ytimg.com/vi/-DXkF2Q69Jw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=-DXkF2Q69Jw"
processedAt: "2026-02-23T14:06:03.915Z"
source: "youtube"
tldr: "GitHub's new Agentic Workflows lets you create CI/CD pipelines using natural language markdown instructions, compiling them into secure GitHub Actions workflows to add AI-powered judgment for tasks like code review while maintaining traditional guardrails."
tools:
  - name: "GitHub Actions"
    url: null
  - name: "GitHub Agentic Workflows"
    url: null
  - name: "GitHub CLI"
    url: null
  - name: "GitHub Copilot"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Programming"
tags:
  - "agents"
  - "ci-cd"
  - "open-source"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5210
  outputTokens: 734
  totalTokens: 5944
  processingTimeMs: 47351
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.426Z"
---

## Key Takeaways

GitHub's Agentic Workflows introduces AI-driven CI/CD automation with natural language programming. • It allows **productive ambiguity** where AI agents use judgment for tasks like bug triage and code optimization • The system compiles markdown instructions into secure **GitHub Actions** workflows with permission guardrails • Setup involves creating a markdown file, compiling with GitHub CLI, and pushing to activate the agent

## Summary

GitHub Agentic Workflows represents a significant evolution in CI/CD automation, moving beyond deterministic workflows to AI-powered systems that can handle judgment-based tasks. Developed by GitHub Next and Microsoft Research as part of their **continuous AI** vision, this tool bridges the gap between traditional automation and intelligent decision-making.

The core innovation is **productive ambiguity** – the ability for AI agents to apply contextual judgment to tasks that previously required human intervention. Unlike traditional GitHub Actions that follow rigid "if X then Y" logic, Agentic Workflows can triage bugs, update documentation, catch architectural flaws, and optimize code based on natural language instructions.

**Security remains paramount** in this system. Agents run with minimal permissions by default, analyzing code and suggesting improvements without performing write operations unless explicitly approved through sanitized pathways. This maintains the security benefits of traditional CI/CD pipelines while adding AI intelligence.

**Setup is straightforward**: create a markdown file with agent instructions and permissions, specify your AI provider (like GitHub Copilot), then compile it using the GitHub CLI extension `gh aw compile`. This generates a locked-down `.yaml` workflow file that gets pushed to your repository. The system inherits GitHub Actions' entire ecosystem including team-visible logs, secrets management, and auditable permissions.

**The demo shows practical application** with a Big O auditor agent that analyzes pull requests for inefficient algorithms. When a developer submits code with O(n²) complexity, the agent identifies the issue, provides a detailed explanation in a formatted table, suggests optimized solutions, and calculates potential performance improvements – all without human intervention until review stage.

While currently a research prototype with some latency considerations, this represents GitHub's vision for **autonomous CI/CD management** where AI agents can monitor and maintain code quality continuously, reducing manual oversight while maintaining security through human-in-the-loop verification.

## Context

This matters because traditional CI/CD pipelines are deterministic and struggle with tasks requiring judgment, like code quality assessment or architectural review. Developer teams spending significant time on routine code reviews and quality checks can benefit from AI-assisted automation that maintains security guardrails. This aligns with the broader industry shift toward AI-powered development tools and autonomous systems management, particularly relevant for DevOps engineers, platform teams, and organizations scaling their development processes.
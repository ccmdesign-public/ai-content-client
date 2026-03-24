---
metadata:
  videoId: "e1dgXJ-Cq-g"
  title: "Fixing Bugs with AI Agents: \"The Right Way\""
  description: "I saw this tweet about fundamental first principles of bug fixing, and let me show it in action.


    Original tweet: https://x.com/tangming2005/status/2031358195558658266?s=20


    More of my AI Coding experiments on my SubStack: https://aicodingdaily.substack.com"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT5M58S"
  publishedAt: "2026-03-17T16:51:31Z"
  thumbnailUrl: "https://i.ytimg.com/vi/e1dgXJ-Cq-g/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=e1dgXJ-Cq-g"
processedAt: "2026-03-24T22:02:41.133Z"
source: "youtube"
tldr: "The video demonstrates how to properly fix bugs with AI agents by first writing a failing test to reproduce the bug, mirroring classical TDD, as inspired by a tweet from Ming about adding this step to Claude MD guidelines."
tools:
  - name: "Claude"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-coding"
  - "claude"
  - "prompt-engineering"
  - "testing"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4536
  outputTokens: 701
  totalTokens: 5237
  processingTimeMs: 26848
tagsNormalizedAt: "2026-03-24T22:58:54.197Z"
---

## Key Takeaways

The core message is that AI bug fixing should follow established software engineering principles, not just generate fixes.

- **Reproduce bugs first**: The most complex part of fixing production bugs is reproduction, which AI agents should also do before attempting a fix.

- **Write failing tests**: Add guidelines to AI prompts to first write a failing test that reproduces the bug scenario, creating a regression test.

- **Quality varies by model**: Advanced models like GPT-4 and Claude Opus are better at automatically generating and running tests than cheaper alternatives like Sonnet.

- **Apply principles, not just prompts**: Take inspiration from methodologies like TDD and adapt the underlying principles to your specific AI workflows and projects.

## Summary

The video critiques a common AI bug-fixing workflow where an agent explores code, proposes a fix, and writes a passing test. The presenter argues this is insufficient because it doesn't prove the agent correctly understood and reproduced the original bug scenario. This mirrors a long-standing human problem: deploying a fix for an unreproduced client bug and hoping it works.

The solution, inspired by a tweet from 'Ming', is to modify AI agent guidelines (specifically for Claude MD) to enforce a **test-first approach**. When given a bug report, the agent's first step must be to **write a failing test** that captures the exact faulty behavior.

A practical demonstration shows the difference. Without the guideline, Claude Code's workflow is: Explore → Fix → Write passing test. With the new guideline, the workflow becomes: Explore → Write failing test (and run it to confirm it fails) → Fix → Run test again to confirm it passes.

This creates a **regression test**, increasing confidence that the fix addresses the actual problem. The presenter notes this principle is more important than specific prompt details, which may not work universally. He also advises against overly complex 'sub-agent' architectures for this task unless they are very precisely defined.

While not 100% foolproof (as the test is still AI-generated), this method aligns AI-assisted debugging with **classical Test-Driven Development (TDD)** and established bug-fix best practices, making the process more reliable and verifiable.

## Context

This matters because as developers increasingly offload bug-fixing tasks to AI agents, we risk automating bad practices. Simply having an AI generate a 'fix' and a passing test doesn't guarantee the root cause was addressed, potentially leading to recurring issues and broken promises to clients. This video connects the rise of AI coding assistants with the enduring fundamentals of software engineering, arguing that we must teach AI our best practices, not just let it invent its own. It's crucial for developers, engineering managers, and anyone implementing AI into their development workflow to ensure quality and accountability.
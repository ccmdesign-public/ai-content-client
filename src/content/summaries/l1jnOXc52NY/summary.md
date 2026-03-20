---
metadata:
  videoId: "l1jnOXc52NY"
  title: "I Taught Claude Code to Play Tetris... It Broke the World Record"
  description: "Full courses + unlimited support: https://www.skool.com/ai-automation-society-plus/about

    All my FREE resources: https://www.skool.com/ai-automation-society/about

    Apply for my YT podcast: https://podcast.nateherk.com/apply

    Work with me: https://uppitai.com/


    My Tools💻

    14 day FREE n8n trial: https://n8n.partnerlinks.io/22crlu8afq5r

    Code NATEHERK to Self-Host n8n for 10% off (annual plan): http://hostinger.com/nateherk

    Voice to text: https://ref.wisprflow.ai/nateherk


    I gave Claude Code the ability to see and control a browser, then told it to build 3 games and play them. What happened next was wild.\ 


    It kept failing, learning from its mistakes, and getting better on its own until it eventually broke the Tetris world record. This is one of the coolest things I've seen Claude Code do.


    Sponsorship Inquiries:

    📧 sponsorships@nateherk.com


    Timestamps

    0:00  Browser Automation Demo

    1:11 Teaching AI to Play Games

    1:28 Game 1: Block Runner

    3:26 Game 2: Tetris

    6:09 Game 3: Checkers vs AI

    7:24 How to Set This Up"
  channel: "Nate Herk | AI Automation"
  channelId: "UC2ojq-nuP8ceeHqiroeKhBA"
  duration: "PT8M26S"
  publishedAt: "2026-03-11T02:54:18Z"
  thumbnailUrl: "https://i.ytimg.com/vi/l1jnOXc52NY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=l1jnOXc52NY"
processedAt: "2026-03-12T15:56:42.668Z"
source: "youtube"
tldr: "A Claude Code agent was trained via browser automation to play three custom-built games (block runner, Tetris, checkers), achieving a superhuman Tetris score of over 40 million points and beating the human creator at checkers through iterative self-correction and pixel analysis."
tools:
  - name: "Claude Code"
    url: null
  - name: "Playwright"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8177
  outputTokens: 543
  totalTokens: 8720
  processingTimeMs: 18473
tagsNormalizedAt: "2026-03-12T16:12:43.921Z"
---

## Key Takeaways

The video demonstrates the advanced automation capabilities of Claude Code through a gaming experiment.

## Summary

The creator uses Claude Code, an AI agent, to automate browser interactions and train it to play games it built itself. The experiment progresses through three games of increasing complexity. For a simple block runner game, the agent initially fails but learns through self-correction, analyzing pixel distances to time jumps, and eventually scores exactly 10 points after six attempts. The second game is Tetris. The agent is tasked with playing quickly. Its initial strategy of instant hard-dropping pieces yields a high score of 16,000. The creator then challenges it to run two games simultaneously to reach 25,000 points. After some iteration, the agent refines its approach and both instances eventually surpass 40 million points, shattering the stated human world record. The final test is a live checkers game where the human plays against the AI bot. Despite having no strategy, the creator is quickly and decisively defeated by the AI. The underlying technology enabling this is **Playwright**, a browser automation library. The agent was given a high-level goal in 'plan mode' to figure out how to use the computer and browser, which led it to autonomously install and utilize the Playwright CLI to control the browser, take screenshots, and execute actions.

## Context

This video matters because it showcases a practical leap in AI-driven automation. It moves beyond simple scripted tasks to demonstrate an AI's ability to learn, adapt, and master complex, dynamic environments through visual feedback and iterative self-improvement. This has significant implications for automating any software-based task that lacks a direct API, from data entry and web research to software testing and beyond. Developers, automation engineers, and anyone interested in the practical limits of AI assistants should pay attention.
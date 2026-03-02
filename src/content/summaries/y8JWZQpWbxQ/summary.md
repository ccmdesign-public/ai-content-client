---
metadata:
  videoId: "y8JWZQpWbxQ"
  title: "Qwen 3.5 35B vs Sonnet 4.5: Is The Gap CLOSING?"
  description: "Alibaba's Qwen 3.5 claims to beat Claude Sonnet 4.5 on coding benchmarks while running locally on your machine. So I put both models to the test with three real-world coding challenges to see if the open-source contender actually lives up to the hype. Guess which one won.


    🔗 Relevant Links

    Qwen 3.5 Medium series tweet - https://x.com/Alibaba_Qwen/status/2026339351530188939


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

    0:00 Intro

    0:32 The problem with Sonnet and why Qwen helps

    1:06 Testing Sonnet 4.5 and Qwen 3.5 35B

    1:33 Test 1 Todo list

    3:09 Did Qwen really win?

    3:25 Test 2 Solar System

    4:26 Test 3 Feature to existing app

    5:17 Final thoughts"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT6M41S"
  publishedAt: "2026-02-28T09:30:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/y8JWZQpWbxQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=y8JWZQpWbxQ"
processedAt: "2026-02-28T15:55:18.010Z"
source: "youtube"
tldr: "In practical coding tests, Claude Sonnet 4.5 consistently outperformed Qwen 3.5 35B despite Qwen's superior benchmark claims, highlighting the gap between synthetic benchmarks and real-world coding performance."
tools:
  - name: "Qwen 3.5"
    url: null
  - name: "Claude Sonnet 4.5"
    url: null
  - name: "Open Router"
    url: null
  - name: "Open Code"
    url: null
  - name: "Claude Code"
    url: null
  - name: "React"
    url: null
  - name: "Vite"
    url: null
  - name: "Three.js"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "ai-coding"
  - "claude"
  - "llm"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6456
  outputTokens: 963
  totalTokens: 7419
  processingTimeMs: 29251
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.499Z"
---

## Key Takeaways

A comparative test of two leading AI coding models reveals critical insights about real-world performance versus benchmarks.

*   **Claude Sonnet 4.5 won all three coding challenges** (React to-do list, 3JS solar system, tweet screenshot app), demonstrating superior robustness and error handling in practical development tasks.

*   **Qwen 3.5's benchmark superiority didn't translate to real-world coding**, suggesting potential benchmark-specific post-training, while Sonnet's broader training dataset handles nuanced tasks better.

*   **Qwen's ability to run locally on a MacBook is impressive**, but the 35B parameter model only used ~3B during inference, making it an unfair comparison against Sonnet 4.5's likely much larger, undisclosed parameter count.

## Summary

The video conducts a head-to-head comparison between Alibaba's Qwen 3.5 35B model and Anthropic's Claude Sonnet 4.5 on three practical coding tasks, challenging Qwen's claims of outperforming Sonnet on benchmarks.

**The first task** was building a React + Vite to-do list app. Initially, Qwen 3.5 appeared to win by producing a more feature-rich app with categories, severity levels, and due dates, along with cleaner code organization using separate components. However, the creator discovered Qwen had the 'superpowers' skill enabled in Open Code. When re-run without it, Qwen's output was less impressive, handing the win to Sonnet 4.5.

**The second, more complex task** involved building an interactive solar system with React, Vite, and Three.js. Sonnet 4.5 succeeded in one shot, creating a functional 3D model with interactive planets and smooth camera controls. Qwen 3.5 failed completely, producing a blank page with persistent console errors it couldn't fix, despite multiple attempts and prompts.

**The final challenge** was modifying an existing codebase to capture a screenshot from a tweet URL. Both models initially produced errors. Sonnet 4.5 successfully debugged its issue, resulting in a working app that generated downloadable images. Qwen 3.5 also hit a timeout error but its attempted fix only extended the timeout without solving the underlying problem, leaving the feature broken.

The creator concludes that while Qwen 3.5's ability to run locally on modern hardware is a significant achievement, it cannot yet match Sonnet 4.5's coding proficiency in real-world scenarios. The discrepancy between Qwen's strong benchmark scores and its practical performance suggests the model may have been **post-trained specifically on benchmark datasets** like SWBench, whereas Sonnet likely benefits from a broader, more robust training regimen. The comparison is also skewed by inference efficiency; Qwen 3.5 35B reportedly uses only about 3 billion parameters during inference, while Sonnet 4.5 is estimated to utilize a much larger model.

## Context

This comparison matters to developers and engineers choosing AI coding assistants. As open-weight models like Qwen claim to rival expensive, cloud-only models like Claude Sonnet, practical evaluations are crucial for informed tool selection. The video highlights the growing trend of capable local AI models but cautions against relying solely on published benchmarks, which may not reflect real-world utility in complex development workflows.
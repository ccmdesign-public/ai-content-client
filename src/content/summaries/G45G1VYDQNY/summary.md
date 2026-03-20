---
metadata:
  videoId: "G45G1VYDQNY"
  title: "I Tried Gemini 3.1 Pro in Google Antigravity"
  description: "I tested the new model with a few Laravel projects, let me show what happened.


    Related links:

    - [Official announcement]: Gemini 3.1 Pro, Building with Advanced Intelligence in Google Antigravity https://antigravity.google/blog/gemini-3-1-pro-in-google-antigravity

    - [Related video]: I Tested New Sonnet 4.6 vs Opus 4.6: Speed, Token Usage, Code Quality https://www.youtube.com/watch?v=dThh2V7B9OQ


    More of my AI Coding experiments on my website: https://aicodingdaily.com?mtm_campaign=youtube-channel-default-link"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT11M6S"
  publishedAt: "2026-02-20T07:31:13Z"
  thumbnailUrl: "https://i.ytimg.com/vi/G45G1VYDQNY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=G45G1VYDQNY"
processedAt: "2026-03-10T16:19:50.380Z"
source: "youtube"
tldr: "Gemini 3.1 Pro in Google Antigravity completed coding tasks but was twice as slow as competitors, had random crashes, opaque quotas, and lacked automatic test generation, showing Google's coding focus lags behind Anthropic and OpenAI."
tools:
  - name: "Gemini"
    url: null
  - name: "Google Antigravity"
    url: null
  - name: "Gemini CLI"
    url: null
  - name: "Laravel"
    url: null
  - name: "Livewire"
    url: null
  - name: "PHP"
    url: null
  - name: "Laravel Boost"
    url: null
  - name: "Context 7"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "gemini"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7626
  outputTokens: 961
  totalTokens: 8587
  processingTimeMs: 31436
tagsNormalizedAt: "2026-03-10T16:46:00.129Z"
---

## Key Takeaways

The reviewer tested Gemini 3.1 Pro in Google's Antigravity IDE against prior tests with Claude and GPT models.

*   **Performance & Reliability**: Gemini 3.1 Pro was **twice as slow** (6-9 mins vs. 3 mins) and suffered from **random agent crashes**, a persistent issue in Antigravity.

*   **Coding Focus & Skills**: The model **did not generate tests automatically**, requiring a specific prompt, and seemed less trained on frameworks like Laravel compared to Claude Sonnet/Opus.

*   **Platform Issues**: **Quota limits are opaque** and were hit mid-task on the free plan, and Antigravity has a **limited, non-extensible MCP server list**, unlike the Gemini CLI.

*   **Overall Assessment**: Google's **Gemini models and Antigravity IDE are not yet competitive** with market leaders (Anthropic, OpenAI) for coding tasks, reflecting a lower priority on developer experience.

## Summary

The video documents a hands-on test of the newly released Gemini 3.1 Pro model within Google's Antigravity IDE, comparing it directly to prior tests with Claude Sonnet, Opus, and other models.

**Testing Methodology and Initial Setup**

The test used the same seven Laravel projects and prompts from previous comparisons, asking the AI to generate CRUD APIs. The reviewer had to wait for the model to appear in Antigravity's list and noted the introduction of an opaque "model quota" system for free users, with unclear limits.

**Performance and Task Execution**

On the first, simpler project, Gemini 3.1 Pro successfully generated the required code but took **6 minutes—twice as long as competing models**. The slowness was attributed to the model over-thinking small details. Notably, it **failed to generate any automated tests** initially, unlike other models which do so proactively. When questioned, the model realized its omission and could activate a testing skill, but only after explicit prompting.

**Platform Limitations and Errors**

The test highlighted significant platform issues. Antigravity's **MCP (Model Context Protocol) server support is limited** to a pre-defined list, preventing the use of tools like Laravel Boost or Context 7 for documentation. During a second test with a Livewire project, the agent **crashed randomly**—a recurring problem noted in past Antigravity experiences. After continuing, it worked for 9 minutes before hitting the **opaque free-tier quota limit**, failing to complete the task.

**Broader Ecosystem Context**

The reviewer also checked the Gemini CLI, finding that while it properly recognized MCP servers like Laravel Boost, **Gemini 3.1 Pro was not yet available** there despite announcements. The conclusion is that Google's pace of improvement for Antigravity and its focus on coding capabilities for Gemini lag behind competitors like Anthropic's Claude Code and OpenAI's GPT Codex, making it a non-competitive option for developers at present.

## Context

This evaluation matters to developers and teams choosing AI coding assistants. As models like Claude Sonnet/Opus and GPT-4 Codex advance rapidly, Google's Gemini and its integrated Antigravity IDE represent a major competitor's entry. This hands-on test reveals whether Google's solution is ready for professional development workflows or still playing catch-up in terms of speed, reliability, and coding-specific intelligence compared to market leaders.
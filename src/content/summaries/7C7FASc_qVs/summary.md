---
metadata:
  videoId: "7C7FASc_qVs"
  title: "I Tried New GPT-5.4 vs GPT-5.3-Codex: Is It Better?"
  description: "I've compared two models on roughly the same prompts in Codex CLI/App and in regular/fast modes.


    More of my AI Coding experiments on my website: https://aicodingdaily.com?mtm_campaign=youtube-channel-default-link


    Or, if you prefer Substack: https://aicodingdaily.substack.com/"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT17M22S"
  publishedAt: "2026-03-06T08:54:09Z"
  thumbnailUrl: "https://i.ytimg.com/vi/7C7FASc_qVs/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=7C7FASc_qVs"
processedAt: "2026-03-10T16:12:02.795Z"
source: "youtube"
tldr: "GPT-5.4 shows marginal improvements over GPT-5.3-Codex with deeper code generation (e.g., Laravel enums) and a new fast mode, but its 1M context window test failed and fast mode may skip verification steps."
tools:
  - name: "OpenAI"
    url: null
  - name: "GPT-5.4"
    url: null
  - name: "GPT-5.3-Codex"
    url: null
  - name: "Codex CLI"
    url: null
  - name: "Codex App"
    url: null
  - name: "Laravel"
    url: null
  - name: "Filament"
    url: null
  - name: "Ghosty"
    url: null
  - name: "VS Code"
    url: null
  - name: "Twitter"
    url: null
  - name: "Substack"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "ai-coding"
  - "ai-general"
  - "chatgpt"
  - "copilot"
  - "llm"
  - "machine-learning"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11590
  outputTokens: 1126
  totalTokens: 12716
  processingTimeMs: 30647
tagsNormalizedAt: "2026-03-10T16:42:13.394Z"
---

## Key Takeaways

A practical comparison of OpenAI's latest coding models reveals nuanced improvements and new features.

*   **GPT-5.4 generates more detailed code** (e.g., Laravel enums, extra model relationships) compared to GPT-5.3-Codex.

*   The new **fast mode is faster but may skip self-verification steps** like running tests, which can lead to non-working code.

*   The experimental **1-million token context window** was not successfully enabled in this test despite configuration attempts.

*   Both models exhibited similar **self-debugging capabilities** when encountering classic Laravel migration timestamp conflicts.

## Summary

The video presents a hands-on comparison of OpenAI's GPT-5.4 against its predecessor, GPT-5.3-Codex, using a real-world Laravel restaurant project as a test case.

**Testing Methodology & Process Differences**
The creator tested both models on the same project phases using the **Codex CLI** and **Codex App**. A key initial observation was a change in the CLI output: GPT-5.3 verbosely shows all file changes, while GPT-5.4 provides a more summarized view by default, showing executed commands without expanding full file content unless requested.

**Code Quality & Depth of Implementation**
When analyzing the generated code, GPT-5.4 demonstrated a tendency to implement features more thoroughly.

*   **Enums**: GPT-5.4 generated dedicated enum classes (e.g., for order status and payment method) and used them in model casts, promoting better code structure and reusability. GPT-5.3 did not create these enums.

*   **Additional Functionality**: In some models, GPT-5.4 added extra relationships (e.g., an audit log relationship in the User model) and small usability details (like setting a minimum date of 'today' in a form) that were absent in the GPT-5.3 output.

**Performance: Speed vs. Reliability**
The new **fast mode** (available for both models) was tested.

*   **Speed**: GPT-5.4 with fast mode completed a complex task (building a reservation system) in roughly 6 minutes, faster than GPT-5.3 without fast mode.

*   **Reliability Trade-off**: However, the GPT-5.4/fast-mode run did not execute feature tests to verify its work, resulting in a front-end error. The GPT-5.3 run did execute tests and produced a working (though unstyled) form. This suggests fast mode may prioritize speed over comprehensive verification.

**Self-Debugging & Context Usage**
Both models encountered and autonomously fixed a classic Laravel issue where simultaneously generated migrations have identical timestamps. They renamed the files and re-ran the migration successfully. Context token usage was similar for most tasks, with GPT-5.4 sometimes consuming slightly more.

**Failed Experiment: 1M Context Window**
An attempt to enable the experimental 1-million token context window by editing the `.codex/config.toml` file was unsuccessful. The context limit displayed in the CLI remained at the standard 258K tokens throughout a large multi-phase task, indicating the configuration did not take effect for the user's account.

## Context

This comparison is crucial for developers and teams relying on AI coding assistants to understand the practical, incremental improvements in new model releases. It moves beyond marketing claims to test real coding depth, speed features, and reliability in a familiar web development framework (Laravel). The findings help inform upgrade decisions and highlight that new features like 'fast mode' may involve trade-offs that impact workflow.
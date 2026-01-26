---
metadata:
  videoId: "a_AT7cEN_9I"
  title: "Claude Code Plan Mode Plugin - Plannotator"
  description: "Plannotator - interactive plan review, sharing, and automated feedback for Claude Code.


    https://github.com/backnotprop/plannotator"
  channel: "Michael"
  channelId: "UC9kDGVFCEWtEkhvKnCoJ15g"
  duration: "PT2M8S"
  publishedAt: "2025-12-29T01:45:31Z"
  thumbnailUrl: "https://i.ytimg.com/vi/a_AT7cEN_9I/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=a_AT7cEN_9I"
processedAt: "2026-01-24T16:02:03.682Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Plannotator is a Claude code plugin that enhances Claude's planning mode by capturing, visualizing, and enabling collaborative annotation of code plans, allowing users to provide detailed feedback or share plans via a compressed, shareable URL."
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 867
  outputTokens: 655
  totalTokens: 1522
  processingTimeMs: 101773
tools:
  - name: "Plannotator"
    url: "https://github.com/backnotprop/plannotator"
  - name: "Claude Code"
    url: null
  - name: "PNPM"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - ai-coding
  - claude
  - workflow
  - automation
---

## Key Takeaways

This video introduces Plannotator, a Claude code plugin designed to improve interaction with Claude's planning mode:

*   Plannotator **captures and visualizes** Claude's generated code plans, offering a structured view that's easier to review than raw output.

*   It enables **inline annotation and feedback** on specific parts of the plan, allowing users to suggest changes (e.g., using 'PNPM' instead of a default package manager) or add comments.

*   Plans can be **privately shared** with colleagues via a compressed URL, facilitating collaborative review and feedback collection before sending it back to Claude.

## Summary

The video introduces **Plannotator**, a new Claude code plugin specifically designed to integrate with Claude's planning mode. When Claude generates a test plan or any code-related plan, Plannotator automatically hooks into this process and **captures the plan as it's created**.

Traditionally, reviewing Claude's plans involves manually sifting through the output. Plannotator addresses this by providing a **structured and visual interface** to view the captured plan. This makes it significantly easier for users to understand and navigate the proposed steps.

### Enhanced Feedback and Annotation

A key feature of Plannotator is its ability to facilitate **detailed feedback and annotations**. Instead of providing general comments, users can directly interact with specific code blocks or plan elements. For instance, if Claude suggests a particular package manager, a user could annotate that section to specify 'use PNPM instead,' providing highly targeted feedback. This allows for granular iteration over entire code blocks and the addition of various comments.

### Collaborative Plan Sharing

Plannotator also introduces a unique **sharing mechanism**. It compresses the entire plan into a base64 string, similar to `textarea.mmy`, which can then be embedded directly into a URL. This creates a static, shareable link that can be used to **privately share the plan with colleagues**. This feature is invaluable for collaborative development, as team members can review the plan, add their own annotations, and catch potential issues that the original user might have missed. The collected feedback from colleagues can then be incorporated before the plan is sent back to Claude for approval or denial, streamlining the planning and development workflow.

## Context

This innovation is highly relevant for developers, software engineers, and anyone leveraging AI-powered coding assistants like Claude. As AI models become increasingly sophisticated in generating code and project plans, the ability to effectively review, refine, and collaborate on these AI-generated outputs becomes crucial. Plannotator addresses the growing need for better human-AI collaboration tools in software development, aiming to make AI planning more transparent, controllable, and integrated into existing team workflows. It matters for improving the efficiency and accuracy of AI-assisted coding projects.
---
metadata:
  videoId: "kcOowmrVI7k"
  title: "How to prompt Gemini 3.1 for Epic animations"
  description: "Animation skill: superdesign.dev


    Chrome Extension (Free): https://chromewebstore.google.com/detail/superdesign/obpjaonipoaomjnokbimppohbpjibflm"
  channel: "AI Jason"
  channelId: "UCrXSVX9a1mj8l0CMLwKgMVw"
  duration: "PT4M53S"
  publishedAt: "2026-02-25T11:40:51Z"
  thumbnailUrl: "https://i.ytimg.com/vi/kcOowmrVI7k/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=kcOowmrVI7k"
processedAt: "2026-03-10T15:31:28.404Z"
source: "youtube"
tldr: "To generate production-quality animations with Gemini 3.1 Pro, separate planning from building by using a structured scene-based prompt that details timing, UI state, and special effects for each scene, which can be automated via tools like Super Design's skill library."
tools:
  - name: "Gemini 3.1 Pro"
    url: null
  - name: "Super Design"
    url: null
  - name: "Super Design Chrome Extension"
    url: null
  - name: "Cursor"
    url: null
  - name: "Claude Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
tags:
  - "gemini"
  - "prompt-engineering"
  - "ui"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4367
  outputTokens: 774
  totalTokens: 5141
  processingTimeMs: 27482
tagsNormalizedAt: "2026-03-10T16:48:36.430Z"
---

## Key Takeaways

The video explains how to move beyond basic, chaotic AI-generated animations to create professional product launch videos using structured prompting.

## Summary

The presenter addresses the common problem of generating low-quality, 'PowerPoint-like' animations with AI models like Gemini 3.1 Pro. The core issue is vague, open-ended prompts that force the model to handle complex spatial planning, a task it isn't specifically trained for.

The solution is a two-stage process that separates planning from building. First, create a detailed **scene-based prompt** that acts as a blueprint. This prompt should clearly define for each scene:

*   **Timing:** How long the scene should last.

*   **UI State & Actions:** A detailed explanation of what elements are on screen and what they do.

*   **Special Effects:** Keywords like '3D perspective rotation', 'fading', or 'staggered delay' to guide the animation style.

This structured approach removes the burden of spatial planning from the AI, allowing it to focus on high-quality implementation. The presenter demonstrates this using a real example from a product launch video for an 'inspire mode' feature, showing how a well-crafted prompt leads to a coherent, professional result.

### Automating the Process with Super Design

To make this process easier, the presenter built a **'Product Release Demo' skill** within the Super Design platform. The workflow is:
1.  Use the free **Super Design Chrome Extension** to clone a real UI component from a website.
2.  Import the cloned UI into Super Design's coding playground.
3.  Select the UI and apply the 'Product Release Demo' skill from the library.
4.  The skill asks targeted questions about the desired animation (initial state, element behavior, cursor movement) and automatically generates the comprehensive scene-based prompt plan.
5.  With the plan approved, the tool (using Gemini 3.1 Pro mode) builds the final animation video.

This tool automates the prompting best practices, but the underlying methodology—detailed scene planning—can be applied using any coding agent like Cursor or Claude Code.

## Context

As AI models like Gemini become capable of generating animations and SVG designs, many users get poor, uncoordinated results resembling basic slide decks. This video matters for product managers, marketers, and developers who need to quickly create high-quality demo or launch videos without extensive animation expertise. It connects to the broader trend of using structured prompting and specialized AI workflows to achieve professional-grade outputs from generative AI, moving beyond simple text-to-video commands.
---
metadata:
  videoId: "PQE5UKHGOMQ"
  title: "DON'T Build AI Automations, Build Agentic Workflows Instead! (Claude Code)"
  description: "The #1 community for building a highly-profitable personal brand with AI.

    👉 https://www.skool.com/buildroom/


    Summary ⤵️

    Stop building AI automations. Agentic workflows built with Claude Code do it better — faster, smarter, and with zero troubleshooting on your end.


    In this video, I'll show you how to use Claude Code inside Google Antigravity to:


    - Convert an existing n8n automation into a fully agentic workflow

    - Build a UGC ad pipeline that generates high-quality video from a single product image

    - Use GitHub Actions to schedule and run your workflows — completely free

    - Auto-generate captions, b-roll, and voiceover using Kling 3.0, Nano Banana 2, and FFMPEG


    ⏱️ Video Timestamps:

    00:00 - Why Stop Building Automations

    00:50 - What We're Building Today

    01:28 - How to Convert n8n Automations

    02:30 - How to Understand System Architecture

    04:13 - How to Set Up Google Anti-Gravity

    04:53 - How to Install Claude Code

    05:17 - How to Prompt Claude Code

    07:38 - How to Use Kling & Nano Banana

    09:43 - How to Auto-Accept and Build

    10:17 - How to Troubleshoot with Claude Code

    11:18 - How to Set Up API Keys

    13:42 - How to Run the UGC Pipeline

    15:11 - How to Scale with Multiple Products

    16:49 - How to Deploy with GitHub Actions

    18:39 - Results and Next Steps"
  channel: "Duncan Rogoff | AI Automation"
  channelId: "UC37JpWP5PxLSma2lh79HU9A"
  duration: "PT19M12S"
  publishedAt: "2026-03-17T14:45:03Z"
  thumbnailUrl: "https://i.ytimg.com/vi/PQE5UKHGOMQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=PQE5UKHGOMQ"
processedAt: "2026-03-24T21:35:43.847Z"
source: "youtube"
tldr: "Stop building traditional multi-node AI automations; use agentic workflows with tools like Claude Code and Google Anti-gravity to describe processes in plain language, enabling self-correcting systems that automatically troubleshoot and scale, demonstrated by converting a NAND UGC ad automation into a code-based agent."
tools:
  - name: "Claude Code"
    url: null
  - name: "Google Anti-gravity"
    url: "https://anti-gravity.google"
  - name: "NAND"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "GitHub"
    url: null
  - name: "GitHub Actions"
    url: null
  - name: "Kai AI"
    url: null
  - name: "Claude Sonnet"
    url: null
  - name: "Kling 3.0"
    url: null
  - name: "FFmpeg"
    url: null
  - name: "Anthropic API"
    url: "https://platform.cloud.com"
  - name: "VS Code"
    url: null
  - name: "ImageB"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 17038
  outputTokens: 1015
  totalTokens: 18053
  processingTimeMs: 28236
tagsNormalizedAt: "2026-03-24T22:56:19.168Z"
---

## Key Takeaways

The video argues for a paradigm shift from traditional, complex AI automations to simpler, more powerful agentic workflows. Key insights include:

*   **Agentic workflows replace complex visual programming** with natural language instructions to Claude Code, eliminating the need to manually connect nodes or troubleshoot intricate flows.

*   **Claude Code enables self-correcting systems** that can analyze existing automations (like JSON from NAND), suggest improvements, write the code, and fix bugs automatically.

*   **Code-based workflows are easier to scale and schedule** using platforms like GitHub Actions for free, automated execution, moving beyond the limitations of no-code platforms.

## Summary

The presenter, who runs a six-figure AI agency, advocates moving from traditional no-code automation platforms (like NAND) to **agentic workflows** built with tools like **Claude Code** and **Google Anti-gravity**. These workflows are defined in plain language, allowing the AI to handle system architecture, API integration, and troubleshooting autonomously.

A core demonstration involves converting a flawed NAND automation for generating User-Generated Content (UGC) style ads into a refined, code-based agent. The original system, which took months to build, produced inconsistent videos with mismatched product shots. Using Claude Code, the presenter simply described the goal—taking a product image and creating coherent UGC clips with a consistent actor—and the AI analyzed the existing JSON, proposed a better architecture, and wrote the Python code.

### Key Improvements Made by the Agentic Workflow

The new workflow, built in minutes, featured significant upgrades:

*   Consolidated multiple AI model calls (GPT-4, V3) into using **Claude Sonnet** and **Kling 3.0** for video generation with built-in audio.

*   Used **Kling's "elements" parameter** for consistent actor appearance across all clips.

*   Added **burned-in captions** for higher short-form video engagement.

*   Replaced external API services for video stitching with a **local FFmpeg** implementation.

*   Implemented **parallel processing** for faster video generation.

### Deployment and Scaling with GitHub

The final step was deploying the workflow for continuous, automated execution. The code was pushed to a **GitHub** repository, and **GitHub Actions** was configured to run the script on a schedule (e.g., daily). API keys were stored securely in GitHub Secrets. This setup allows the system to randomly select from a folder of product images and generate new ad variations automatically, creating a scalable "ad machine."

The final output was a functional, 30-second UGC ad for a Yeti tumbler, showcasing the rapid prototyping and iterative improvement possible with agentic workflows. The presenter concludes that this approach is fundamentally more adaptable, scalable, and easier to troubleshoot than locked-in no-code automations.

## Context

This video is crucial for AI automation developers, content creators, and digital marketers who are hitting the limits of no-code platforms. It addresses the growing complexity and maintenance headaches of visual workflow builders and introduces the next evolution: AI agents that build and manage systems through conversation. This shift democratizes complex automation, allowing those without deep coding expertise to create robust, scalable systems by simply describing what they want.
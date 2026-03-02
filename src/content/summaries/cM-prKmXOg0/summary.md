---
metadata:
  videoId: "cM-prKmXOg0"
  title: "Qwen 3.5 + Antigravity is cheapest way to build SaaS"
  description: "Building a SaaS Landing Page with Open-Source Qwen3.5 + Anti-Gravity


    In this video, I show you how to use Alibaba's open-source Qwen3.5 model (97B parameters) with Anti-Gravity and OpenCode to clone and deploy a complete SaaS landing page—all for free! We'll use OpenRouter to access Qwen 3.5, generate images with Nano Banana, and deploy to Firebase with authentication.


    📌 Chapters:


    0:00 Introduction

    0:27 Demo: What Qwen 3.5 Built

    1:59 Understanding Qwen3.5 & OpenCode

    3:56 Setting Up Open Code in Anti-Gravity

    6:18 Cloning the Website

    7:08 Viewing the Results

    8:34 Deploying with Anti-Gravity & Firebase

    9:48 Final Deployment & Login Demo

    12:25 Wrap Up & Call to Action


    🔗 Resources:


    OpenRouter: https://openrouter.ai

    OpenCode: Open-source coding agent

    Anti-Gravity: AI-powered development platform

    Firebase: Free hosting & authentication

    💰 Cost Breakdown:


    Qwen3.5 via OpenRouter: $0.40 per million input tokens

    Firebase hosting: Free tier available

    Nano Banana images: Optional (can use free alternatives)

    👍 If you found this helpful, please like and subscribe for more AI development tutorials!"
  channel: "AI with Surya"
  channelId: "UCz80JEs56coMRDd5OzYe_lw"
  duration: "PT12M46S"
  publishedAt: "2026-02-21T01:45:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/cM-prKmXOg0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=cM-prKmXOg0"
processedAt: "2026-02-23T14:24:37.000Z"
source: "youtube"
tldr: "The Qwen 3.5 open-source LLM (397B parameters, free via Open Router) combined with Anti-gravity's deployment and image generation can build and deploy a full SaaS landing page clone for near-zero cost, competing with Claude Opus 4.5 and Gemini 3 Pro."
tools:
  - name: "Qwen 3.5"
    url: null
  - name: "Anti-gravity"
    url: null
  - name: "Open Code"
    url: null
  - name: "Open Router"
    url: "https://openrouter.ai"
  - name: "Firebase"
    url: null
  - name: "Nanobanana"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
tags:
  - "ai-coding"
  - "saas"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 10010
  outputTokens: 1036
  totalTokens: 11046
  processingTimeMs: 30661
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.545Z"
---

## Key Takeaways

This video demonstrates how to build a production-ready SaaS landing page almost entirely for free using open-source tools.

*   **Qwen 3.5 is a powerful, free open-source model** that competes with top-tier models like Claude Opus 4.5 on agent tasks and function calling.

*   **The Anti-gravity + Open Code combo is a low-cost development powerhouse**, with Anti-gravity handling deployment/image generation and Open Code providing a model-agnostic coding agent.

*   **You can clone and deploy a complex website with a single visual prompt** by dragging a screenshot into Open Code powered by Qwen 3.5.

*   **The entire stack can be nearly free**: Qwen 3.5 via Open Router, Firebase Hosting's free tier, and optional placeholder images keep costs at zero for proofs of concept.

## Summary

The video presents a practical, cost-effective workflow for rapidly building and deploying SaaS applications by leveraging the newly open-sourced **Qwen 3.5** large language model from Alibaba.

**The core of the method is a three-tool stack:**
1.  **Qwen 3.5** serves as the brains. It's a 397-billion-parameter model that benchmarks competitively with Claude Opus 4.5 and Gemini 3 Pro, especially on agent tasks, function calling, and tool use (MCP). It's accessed cheaply via the **Open Router** API gateway.
2.  **Open Code** is the execution engine. It's an open-source, model-agnostic coding agent that runs in the terminal. The presenter installs it directly within Anti-gravity and configures it to use the Qwen 3.5 model via an Open Router API key.
3.  **Anti-gravity** provides the deployment and asset pipeline. It hosts the Open Code terminal and uses its deep integration with **Nanobanana** for AI image generation and with **Firebase** for one-click hosting and authentication setup.

**The demonstrated workflow has two main phases:**
*   **Phase 1: Code Generation with Qwen 3.5 + Open Code.** The presenter simply drags a screenshot of the target website (Hicksfield) into the Open Code terminal with a prompt to "clone this website." Qwen 3.5, using its vision capabilities, analyzes the image, fetches the actual website, and generates a near-perfect HTML, CSS, and JavaScript clone complete with modern animations and effects.

*   **Phase 2: Production Deployment with Anti-gravity.** With the base code generated, a follow-up prompt to Anti-gravity instructs it to replace placeholder images with Nanobanana-generated ones, deploy the site to Firebase Hosting, and set up a login system with credentials. Anti-gravity autonomously executes all these steps, resulting in a live, fully functional website.

The presenter emphasizes the cost efficiency: using Qwen 3.5 via Open Router costs just $0.40 per million input tokens, Firebase Hosting has a generous free tier, and one can skip paid Nanobanana image generation by using free splash images. This makes the stack ideal for building proofs of concept or MVPs at minimal expense.

## Context

This video is highly relevant for developers, indie hackers, and startup founders looking for the most cost-effective way to validate SaaS ideas and build MVPs. As AI-powered development becomes mainstream, finding open-source alternatives to expensive, proprietary models (like GPT-4 or Claude) is crucial for reducing burn rate and maintaining agility. This tutorial directly addresses that need by showcasing a complete, nearly-free pipeline from idea to deployed product using state-of-the-art open-source tooling.
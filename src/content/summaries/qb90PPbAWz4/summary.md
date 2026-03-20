---
metadata:
  videoId: "qb90PPbAWz4"
  title: "Karpathy's \"autoresearch\" broke the internet"
  description: "I break down Andrej Karpathy's new open-source project, Autoresearch: what it is, how it works, and why some of the smartest people in tech are losing their minds over it. I walk through 10 concrete business ideas you can build on top of Autoresearch loops, from niche agent-in-a-box products to always-on A/B testing agencies. I also cover Karpathy's companion launch, Agent Hub, share community reactions, and show you step by step how to get started using Claude Code and a Colab GPU.


    I'm hosting a free workshop so you can build your business in the age of AI.

    Sign up here: https://startup-ideas-pod.link/build-with-ai-2026


    Links Mentioned:

    Autoresearch Github: https://startup-ideas-pod.link/autoresearch


    Timestamps

    00:00 – Intro

    00:45 – How Autoresearch Actually Works

    02:40 – Visual Walkthrough of the Autoresearch Loop

    03:37 – Mental Model: Your Research Bot That Runs While You Sleep

    05:26 – Idea 1: Niche Agent-in-a-Box Products

    06:48 – Idea 2: A/B Testing for Marketing (Landing Pages & Ads)

    08:45 – Idea 3: Research as a Service

    09:43 – Idea 4: Power Tool Inside Your Own SaaS

    10:49 – Idea 5: Agency That Runs 100× More Tests

    12:05 – Idea 6: Auto Quant for Trading Ideas

    13:44 – Idea 7: Always-On Lead Qualification & Follow-Up

    14:21 – Idea 8: Finance Ops Autopilot for Businesses

    15:09 – Idea 9: Internal Productivity Lab for Your Org

    15:53 – Idea 10: Done-for-You Research & Due Diligence Shop

    16:41 – Non business use cases

    18:27 – Karpathy's Agent Hub Announcement

    19:50 – How to Get Started with Autoresearch

    22:21 – Final Thoughts


    Key Points


    * Autoresearch is an open-source AI agent that sets a goal, runs experiments in a loop on a GPU, keeps the winners, and discards the rest — all while you sleep.

    * You need an NVIDIA GPU to run it (tested on H100), but you can rent one cheaply through Lambda Labs, Vast AI, RunPod, Google Cloud, or Google Colab.

    * The fastest way to get started is to use Claude Code to walk you through installation, then run it on Google Colab with a T4 GPU runtime.

    * Ten business ideas built on Autoresearch span niches like SaaS optimization, A/B testing agencies, trading backtests, CRM lead scoring, and done-for-you due diligence.

    * Karpathy also launched Agent Hub — essentially a GitHub designed for agent swarms to collaborate on the same codebase.

    * The project already has 25,000+ GitHub stars and is growing fast; early movers who tinker now build an unfair advantage.


    The #1 tool to find startup ideas/trends - https://www.ideabrowser.com/


    LCA helps Fortune 500s and fast-growing startups build their future - from Warner Music to Fortnite to Dropbox. We turn 'what if' into reality with AI, apps, and next-gen products https://latecheckout.agency/


    The Vibe Marketer - Resources for people into vibe marketing/marketing with AI: https://www.thevibemarketer.com/


    FIND ME ON SOCIAL

    X/Twitter: https://twitter.com/gregisenberg

    Instagram: https://instagram.com/gregisenberg/

    LinkedIn: https://www.linkedin.com/in/gisenberg/"
  channel: "Greg Isenberg"
  channelId: "UCPjNBjflYl0-HQtUvOx0Ibw"
  duration: "PT24M22S"
  publishedAt: "2026-03-11T22:01:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/qb90PPbAWz4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=qb90PPbAWz4"
processedAt: "2026-03-12T15:31:14.905Z"
source: "youtube"
tldr: "Andrej Karpathy's 'autoresearch' is an AI agent framework that autonomously runs iterative experiments (plan, edit, train, evaluate) on goals like improving model performance or business KPIs, enabling 24/7 optimization without human intervention and opening numerous business applications."
tools:
  - name: "autoresearch"
    url: null
  - name: "AgentHub"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Google Colab"
    url: null
  - name: "Lambda Labs"
    url: null
  - name: "Vast AI"
    url: null
  - name: "RunPod"
    url: null
  - name: "UV"
    url: null
  - name: "GitHub"
    url: null
  - name: "Salesforce"
    url: null
  - name: "Shopify"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Web Development"
tags:
  - "agents"
  - "performance"
  - "startup"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 17166
  outputTokens: 1304
  totalTokens: 18470
  processingTimeMs: 44302
tagsNormalizedAt: "2026-03-12T16:12:13.938Z"
---

## Key Takeaways

Autoresearch is an autonomous AI experimentation framework with transformative potential for business and research.

- **Autonomous experimentation loop**: You set a goal, and the AI agent plans, edits code, runs short training on a GPU, evaluates results, and iterates, saving only improvements.

- **Diverse business applications**: The framework can be applied to niche SaaS products, marketing A/B testing, research-as-a-service, internal productivity, finance ops, and even trading strategy development.

- **Requires specific infrastructure**: Running autoresearch locally requires an Nvidia GPU, but users can start by renting cloud GPUs from services like Google Colab, Lambda Labs, Vast AI, or RunPod.

## Summary

Autoresearch, launched by AI pioneer Andrej Karpathy, is an open-source framework that functions like a 'super nerd robot intern.' It automates the scientific method for AI and business problems through a continuous loop: you define a goal (e.g., 'improve this model's test score' or 'increase sales'), and the AI agent autonomously plans experiments, edits code, runs short training sessions on a GPU, reads the results, and decides what to change next, only keeping configurations that show improvement.

This enables **24/7 optimization** where you can 'wake up to the best version.' The core mental model is a 'research boss' you can boss around—give it a clear task, access to resources (code, GPU, internet), and it will run the loop, providing you with a written summary of its findings.

### Business Ideas and Use Cases

The video outlines ten concrete applications:
1.  **Niche Agent-in-a-Box**: Package tuned autoresearch loops for specific pain points (e.g., Amazon listing optimizer, realtor email sequence tuner) and charge a monthly fee.
2.  **Marketing A/B Testing**: Automate landing page and ad creative experimentation to lower customer acquisition cost (CAC) and raise return on ad spend (ROAS).
3.  **Research-as-a-Service**: Offer constantly updated competitor, market, or due diligence reports on a subscription basis.
4.  **Embedded Optimization**: Add an 'optimize' button to existing SaaS products to let users auto-tune prompts, pricing, or settings.
5.  **High-Velocity Agency**: Build an agency that promises 100x more testing for clients on areas like Shopify store conversion or email marketing.
6.  **Algorithmic Trading**: Use autoresearch to run fast backtests of simple trading rules (LLM-based sentiment filters) to find promising strategies.
7.  **Sales Lead Qualification**: Point an agent at your CRM to test rules and messages, autograde leads, and draft follow-ups to increase sales team efficiency.
8.  **Finance Operations Autopilot**: Automate and continuously improve invoice matching, expense reporting, and exception detection.
9.  **Internal Productivity Lab**: Treat your company like a lab, using agents to iterate on internal workflows, templates, and rules to cut meetings and manual work.
10. **Done-For-You Due Diligence**: Sell fast, well-structured briefs and living memos to investors and executives by having agents chew through docs and filings.

The video also highlights broader implications, suggesting the framework's loop could be applied to fields like **clinical trial design** to drastically reduce cost and time, and mentions Karpathy's related project, **AgentHub**, a 'GitHub for agents' designed for swarm collaboration.

### Getting Started

To use autoresearch, you need an **Nvidia GPU** (it was tested on an H100). If you don't have one, you can rent cloud GPUs from services like **Google Colab**, **Lambda Labs**, **Vast AI**, or **RunPod**. The recommended path is to use an AI coding assistant like **Claude Code** to help with installation from the official GitHub repository, which had garnered 25,000 stars at the time of recording.

## Context

This matters because autoresearch represents a significant leap in autonomous AI systems, moving beyond single-task execution to continuous, goal-oriented experimentation and optimization. It democratizes high-velocity R&D, allowing individuals and small teams to run experiments at a scale previously reserved for well-funded labs. Entrepreneurs, developers, and business operators should care, as it creates new avenues for product development, service offerings, and internal efficiency. It connects to broader trends in AI agents, automated software optimization, and the 'AI-native' business model.
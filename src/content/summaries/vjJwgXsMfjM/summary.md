---
metadata:
  videoId: "vjJwgXsMfjM"
  title: "Claude Code + Karpathy's Autoresearch = GOD MODE!"
  description: "📥 Download The Full AI Clone Automation for Free! https://skool.com/ai-mate/about

    🤙 Check out AI Mate Plus: https://www.skool.com/aimate/about


    This is the full breakdown of how to build and automate your personal brand using AI — from idea sourcing to publishing across every major platform.


    Here's what I cover:

    Pulling real Instagram and Facebook view data from 200+ shorts to find what actually separates a 100K-view video from a 56-view flop

    Understanding Andrej Karpathy's autoresearch framework and how to apply it to a content pipeline instead of machine learning

    Building binary eval criteria from real performance data — not guesses, not vibes, actual patterns from your own posts

    Discovering that framing determines performance, not topic — and exactly which framing patterns kill views every time

    Wiring a 24-hour self-improvement loop that pulls overnight view counts, scores your scripts, and rewrites your prompts automatically

    Duplicating your content pipeline so the autoresearch agent can experiment freely without touching your live production system


    If you're a creator or operator publishing content every day with no feedback loop, this video shows you exactly how to turn your performance data into a system that improves itself overnight. I break down the full architecture, the 10 binary eval criteria, and the patterns I found in my own data so you can build this for your pipeline.

    Tools & Platforms Covered:

    Claude Code — runs the autoresearch agent and rewrites prompts between cycles

    Meta Graph API — automatically pulls Instagram and Facebook view counts into Airtable

    N8N + Airtable — the content pipeline the autoresearch loop optimizes

    Andrej Karpathy's Autoresearch Framework — the open source foundation the whole system is built on

    Stop manually tweaking prompts based on gut feeling. Wire up real data, build the loop, and let your content system get sharper every single day while you sleep.


    LINKS

    ↓


    Click Here to Start AI Agent Building (New Free):

    https://skool.com/ai-mate/about


    - - -\ 

    00:00 // Intro

    00:28 // What is Autoresearch

    01:44 // Pulling the Data

    03:57 // Build the Eval

    05:22 // Wiring the Loop

    07:37 // How It Evolves

    08:26 // How to run it Daily

    - - -


    Follow me on Twitter: https://twitter.com/itsaiandy


    Follow on Tiktok: https://www.tiktok.com/@andyhafell


    Follow on Instagram: https://www.instagram.com/itsaiandy


    Follow on Facebook: https://www.facebook.com/Andyhafell


    Email for Business Inquiries: biz@aiandy.ai"
  channel: "AI Andy"
  channelId: "UCn2RJFAA1ndipnVJsYAwWOw"
  duration: "PT11M16S"
  publishedAt: "2026-03-18T13:01:49Z"
  thumbnailUrl: "https://i.ytimg.com/vi/vjJwgXsMfjM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=vjJwgXsMfjM"
processedAt: "2026-03-25T14:24:17.080Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "The creator built a self-improving AI content system that produces five videos daily, analyzes real social media performance data, and automatically rewrites its own prompts using Andrej Karpathy's Auto Research framework combined with Claude Code."
tools:
  - name: "Claude Code"
    url: null
  - name: "Auto Research"
    url: null
  - name: "Meta Graph API"
    url: null
  - name: "Instagram API"
    url: null
  - name: "Facebook API"
    url: null
  - name: "Airtable"
    url: null
  - name: "Gemini"
    url: null
  - name: "Launchd"
    url: null
  - name: "Contentmate"
    url: null
  - name: "Nan"
    url: null
  - name: "Python"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "prompt-engineering"
  - "python"
  - "research"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7380
  outputTokens: 1086
  totalTokens: 8466
  processingTimeMs: 44785
tagsNormalizedAt: "2026-03-25T14:52:08.070Z"
---

## Key Takeaways

This video demonstrates how to create a fully automated, self-optimizing content pipeline using AI research principles. Key insights include:

- **Auto Research can optimize anything measurable**: The framework works for content prompts by using social media views as feedback instead of just machine learning metrics.

- **Binary evaluation criteria are essential**: Successful systems use clear yes/no questions (like "Does the hook describe a transformation?") rather than subjective ratings.

- **The system creates continuous improvement**: Every 24 hours, it analyzes performance, correlates eval scores with views, and rewrites prompts to get better results.

- **Research logs are valuable assets**: Detailed logs of changes and outcomes allow future AI models to continue optimization from where previous iterations left off.

## Summary

The creator combined Andrej Karpathy's **Auto Research** framework with **Claude Code** to build a content creation system that automatically improves itself based on real performance data. The system produces five short videos daily, publishes them to Instagram and Facebook, then analyzes view counts to determine what worked.

### How Auto Research Works

Auto Research provides a simple framework: give an AI agent a file to change, instructions on what to optimize, and a way to measure improvement. Karpathy originally used this for machine learning training scripts, achieving 11% improvement overnight. The creator realized this could apply to content creation by using social media views as the measurable output.

### Building the Evaluation System

The key to making this work was creating **binary evaluation criteria** that eliminate subjectivity. Instead of asking "Is this engaging?" (which is just vibes), the system uses 10 specific yes/no questions like:

- Does the hook describe a result or transformation?

- Does the hook feature a person or story?

- Would the first frame make someone stop scrolling?

These questions can be answered by **Gemini** to produce a score out of 10, making the evaluation machine-readable and objective.

### The Automated Loop

The system runs daily via a Python script scheduled with **Launchd** on macOS. Each morning at 8 AM, it:

1. Pulls yesterday's view counts from Instagram and Facebook using the **Meta Graph API**
2. Matches views to content in **Airtable** (the production database)
3. Prescores new content ideas before creation
4. Scores published scripts using Gemini's evaluation
5. Correlates high eval scores with high views to identify validated winners
6. Generates improved prompts based on what worked
7. Pushes new prompts to the **Nan workflow** via API

### Evolution and Results

The system went through five meaningful prompt revisions in just two days, evolving from basic announcement-style content to curiosity triggers with dramatic framing and personalization. The creator's team member uses **Contentmate** to review and schedule videos, providing human feedback that further trains the system.

### Broader Applications

This approach isn't limited to video content. The same principles can optimize thumbnail prompts, email sequences, landing pages—anything with a measurable output. The research log containing all changes and outcomes becomes a valuable asset that can be handed to future AI models to continue optimization seamlessly.

## Context

This video showcases a practical application of AI research principles to content creation automation, demonstrating how anyone with measurable outputs can implement self-improving systems. It matters because it democratizes optimization techniques previously limited to machine learning research, showing how feedback loops and binary evaluation can create continuous improvement in creative and business contexts. Content creators, marketers, and developers building automated systems should pay attention to these methods.
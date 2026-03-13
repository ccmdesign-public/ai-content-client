---
metadata:
  videoId: "4Cb_l2LJAW8"
  title: "Claude Code + Autoresearch = SELF-IMPROVING AI"
  description: "🔥 Karpathy's autoresearch repo: https://github.com/karpathy/autoresearch

    📚 Watch my NEW 2026 Claude Code course: https://www.youtube.com/watch?v=QoQBzR1NIqI

    💎 Join Maker School & get customer #1 guaranteed: https://www.skool.com/makerschool/about


    💰 Get the cold email auto-optimizer here: https://drive.google.com/drive/folders/1TYXOUhy4k0nFUXqcgHKTKj5gPGCIZxDu?usp=sharing


    📚 Free multi-hour courses

    → Vibe Coding w/ Antigravity (6hr full course): https://www.youtube.com/watch?v=gcuR_-rzlDw

    → Agentic Workflows (6hr full course): https://www.youtube.com/watch?v=MxyRjL7NG18

    → N8N (6hr full course, 890K+ views): https://www.youtube.com/watch?v=2GZ2SNXWK-c


    Summary ⤵️

    Autoresearch is here. AGI, self-improving models, RSI, whatever you want to call it—you can now build in autonomous agents that experiment, iterate, and improve without you.\ 


    Andrej Karpathy is the one who created the repo, but the idea goes back many generations. And finally, you have the ability to download and integrate this in Claude Code in just a few minutes using AI agents.


    I'll show you everything in this mini-course!


    My software, tools, & deals (some give me kickbacks—thank you!)

    🚀 Instantly: https://link.nicksaraev.com/instantly-short

    📧 Anymailfinder: https://link.nicksaraev.com/amf-short

    🤖 Apify: https://console.apify.com/sign-up (30% off with code 30NICKSARAEV)

    🧑🏽‍💻 n8n: https://n8n.partnerlinks.io/h372ujv8cw80

    📈 Rize: https://link.nicksaraev.com/rize-short (25% off with promo code NICK)


    Follow me on other platforms 😈

    📸 Instagram: https://www.instagram.com/nick_saraev

    🕊️ Twitter/X: https://twitter.com/nicksaraev

    🤙 Blog: https://nicksaraev.com


    Why watch?

    If this is your first view—hi, I’m Nick! TLDR: I spent six years building automated businesses with Make.com (most notably 1SecondCopy, a content company that hit 7 figures). Today a lot of people talk about automation, but I’ve noticed that very few have practical, real world success making money with it. So this channel is me chiming in and showing you what *real* systems that make *real* revenue look like.


    Hopefully I can help you improve your business, and in doing so, the rest of your life 🙏


    Like, subscribe, and leave me a comment if you have a specific request! Thanks.


    Chapters

    00:00 Autoresearch by Karpathy: overview

    01:14 Practical Applications in Business

    07:09 Automating Experimentation with Auto Research

    10:16 Setting Up Your Auto Research System

    18:10 Visualizing Results and Monitoring Progress

    21:41 Limitations of Auto Optimization

    23:20 Democratizing AI Experimentation for All"
  channel: "Nick Saraev"
  channelId: "UCbo-KbSjJDG6JWQ_MTZ_rNA"
  duration: "PT24M42S"
  publishedAt: "2026-03-12T19:31:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/4Cb_l2LJAW8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=4Cb_l2LJAW8"
processedAt: "2026-03-13T17:18:34.760Z"
source: "youtube"
tldr: "Andrej Karpathy's open-source AutoResearch project enables AI agents to autonomously run experiments, which can be adapted using Claude Code to create self-improving systems for business metrics like cold email reply rates through continuous optimization loops."
tools:
  - name: "Claude Code"
    url: null
  - name: "GitHub"
    url: null
  - name: "GitHub Actions"
    url: null
  - name: "Instantly"
    url: null
  - name: "Visual Studio Code"
    url: null
  - name: "Whisper Flow"
    url: null
  - name: "Slack"
    url: null
  - name: "Anthropic"
    url: null
  - name: "YouTube Data API"
    url: null
  - name: "Modal"
    url: null
  - name: "Chrome DevTools"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "agents"
  - "claude"
  - "performance"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 20886
  outputTokens: 902
  totalTokens: 21788
  processingTimeMs: 29402
tagsNormalizedAt: "2026-03-13T17:52:20.031Z"
---

## Key Takeaways

The video demonstrates how to apply AI-powered autonomous experimentation to business optimization. Key insights include:

- **AutoResearch Pattern**: AI agents can run experiments in tight loops using objective metrics as feedback signals, enabling fully autonomous optimization.

- **Practical Business Applications**: This approach works for any process with a measurable metric and API access—cold email copy, landing pages, ad creatives, and customer service scripts.

- **Implementation Framework**: Clone Karpathy's repo, define your goal metric and test method, then deploy via GitHub Actions for continuous 24/7 optimization with zero human involvement.

## Summary

The video explains Andrej Karpathy's AutoResearch project—an open-source system where AI agents autonomously run experiments to improve machine learning models. The presenter demonstrates how to adapt this pattern for business applications using Claude Code.

**Core AutoResearch Pattern**: The system works through a continuous loop where an AI agent generates hypotheses, implements changes via APIs, measures results against an objective metric, and iterates based on outcomes. Karpathy used this for machine learning hyperparameter tuning with validation loss as his metric.

**Business Adaptation**: The presenter built an email optimizer that applies this same pattern to cold email campaigns. The system:

- Uses reply rate as the objective metric

- Accesses the Instantly API to deploy campaigns and collect results

- Runs every 4 hours via GitHub Actions

- Maintains a baseline vs. challenger testing structure

- Logs learnings to a resource.md file that improves future iterations

**Implementation Steps**:
1. Clone the AutoResearch repository
2. Create a test file defining your goal metric and test method
3. Configure API access for your target platform
4. Deploy via GitHub Actions or similar cloud services
5. Set up monitoring via Slack webhooks or other notification systems

**Expanded Use Cases**: This approach works for any scenario with:

- A clear, objective metric (reply rates, conversion rates, customer satisfaction scores)
- API access to modify inputs

- Relatively fast feedback loops
Examples include landing page optimization, ad creative testing, YouTube title optimization, newsletter subject lines, and product description improvements.

**Key Considerations**:

- Faster feedback loops enable quicker optimization (5-minute vs. 4-hour cycles)
- Objective metrics work better than subjective measurements

- API access is essential for full automation

- The system becomes more intelligent over time as it accumulates learnings

- Scale is the primary constraint once the system is established

## Context

This represents a democratization of the experimentation frameworks used by major AI labs. While originally developed for machine learning research, the AutoResearch pattern can now be applied by individuals and businesses to optimize any measurable process. This matters because it enables continuous, autonomous improvement of business metrics without human intervention—effectively creating self-optimizing systems that work 24/7. Anyone in marketing, sales, product development, or operations can benefit from implementing this approach to systematically improve their key performance indicators.
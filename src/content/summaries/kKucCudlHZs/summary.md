---
metadata:
  videoId: "kKucCudlHZs"
  title: "Karpathy's Autoresearch On My AI Polymarket Trading Bot"
  description: "Karpathy's Autoresearch On My AI Polymarket Trading Bot


    👊 Become a YouTube Member to Support Me:

    https://www.youtube.com/c/AllAboutAI/join


    For Agents:

    www.skillsmd.store


    My AI Video Course:

    https://www.theaivideocourse.com/


    🔥Open GH:

    https://github.com/AllAboutAI-YT/


    Business Inquiries:

    kbfseo@gmail.com​"
  channel: "All About AI"
  channelId: "UCR9j1jqqB5Rse69wjUnbYwA"
  duration: "PT16M27S"
  publishedAt: "2026-03-11T18:00:52Z"
  thumbnailUrl: "https://i.ytimg.com/vi/kKucCudlHZs/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=kKucCudlHZs"
processedAt: "2026-03-12T15:29:01.882Z"
source: "youtube"
tldr: "This video demonstrates how the creator adapted Andrej Karpathy's auto-research concept to autonomously improve a Bitcoin arbitrage trading bot on Polymarket, achieving a 100% win rate and $2 profit in a 20-minute live test."
tools:
  - name: "GitHub"
    url: null
  - name: "Polymarket"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-general"
  - "automation"
  - "cryptocurrency"
  - "machine-learning"
  - "python"
  - "research"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11413
  outputTokens: 748
  totalTokens: 12161
  processingTimeMs: 24718
tagsNormalizedAt: "2026-03-12T16:14:43.777Z"
---

## Key Takeaways

The video shows how to apply an autonomous research loop to a financial trading bot. • **Adapted Karpathy's auto-research** framework to autonomously evolve a Polymarket Bitcoin arbitrage bot's strategy. • **Implemented a GitHub-based research loop** where an AI agent creates, runs, and evaluates experiments based on a markdown playbook. • **Achieved 100% win rate in live testing**, making $2 profit in about 20 minutes through five successful arbitrage trades. • **The system is modular** and can be applied to other domains beyond trading.

## Summary

The creator was inspired by Andrej Karpathy's auto-research project, which uses an AI agent to autonomously evolve code in a GitHub repository. He adapted this concept to improve his existing Polymarket Bitcoin arbitrage trading bot.

The core system is a **trading auto-research loop**. An AI agent operates inside a GitHub repository, following instructions from a markdown file called a **training program**. This playbook defines how experiments are chosen, run, evaluated, and either kept or discarded.

The bot's goal is to find price discrepancies (arbitrage) on Polymarket's five-minute Bitcoin 'up/down' markets. The agent modifies the bot's strategy code, creates new candidate experiments, and tests them. After each one-hour test run, the system evaluates the results using metrics like fill rate and score.

**The evaluation process is key**: weak experiments are dropped, promising ones are kept, and strong results trigger a confirmation step due to Polymarket's noisy data. All results are added to a history, giving the agent more context for the next experiment.

For the video, the creator switched from dry-run testing to a live market test with a small amount of real money. Using the best strategy found during autonomous research, the bot executed five trades in rapid succession, each exploiting small price differences (e.g., buying both 'up' and 'down' contracts for a combined 99 cents to secure a $1 payout). All five trades were successful, resulting in a **$2 profit in roughly 20 minutes** and demonstrating a 100% win rate for the arbitrage strategy.

The creator concludes by encouraging viewers to explore Karpathy's original auto-research project and consider applying the adaptable loop framework to other problems.

## Context

Andrej Karpathy's 'auto-research' project represents a cutting-edge application of AI where an agent autonomously conducts scientific research by writing and testing code. This video matters because it shows a practical, real-world adaptation of that concept to algorithmic trading. It demonstrates how autonomous AI research loops can be used to iteratively improve complex systems in noisy, real-time environments like financial markets. This approach is relevant for developers, quantitative traders, and AI enthusiasts interested in automated strategy discovery and low-risk arbitrage opportunities.
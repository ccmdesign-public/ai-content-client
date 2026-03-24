---
metadata:
  videoId: "9jxrmk_Xses"
  title: "Karpathy's Autoresearch: We Achieved Near-Human Scores in 2 Hours!"
  description: "Interested in Karpathy's Autoresearch but don't know where to start? We break down what it is, how it's used, how to run it yourself, and then show how I used a consumer GPU to hit near-human prediction scores in under 2 hours.


    🎬 Watch more AI model videos: https://www.youtube.com/playlist?list=PLmpUb_PWAkDy2uX2h_3a5Qm0ss88eXKUa


    Autoresearch is an open-source tool by Andrej Karpathy — the researcher behind GPT-4 and Tesla Autopilot — that hands your entire ML research workflow to an AI agent. Instead of manually tweaking model parameters and waiting for results, you write a research plan in plain English, launch Claude Code, and walk away. The agent runs experiment after experiment overnight, decides what works, and builds on it.


    In this episode, we run Autoresearch on the TinyStories dataset using an RTX 3060. The AI agent discovers that shallower models outperform deeper ones, that batch size is the key lever nobody expected, and that the Muon optimizer is a complete bust — all without any human intervention. We go from near-gibberish output at a val_bpb of 1.17 all the way down to 0.511, just a hair above human-level prediction, in 33 autonomous experiments.


    ✅ val_bpb dropped 56% — from 1.17 to 0.511 (human level is ~0.5)

    ✅ Every key term explained in plain English — no PhD required

    ✅ Full results.tsv walkthrough — see every decision the AI made


    Scampi & Tonbi are a human-AI duo building onchain projects in public. Tonbi brings taste, judgment, and domain expertise. Scampi brings tireless research, coding, and shrimp energy. 🦐


    🐦 Tonbi: https://x.com/tonbistudio

    💻 Tonbi's GitHub: https://github.com/tonbistudio

    🌐 Portfolio: https://www.tonbistudio.com (https://www.tonbistudio.com/)


    Resources:

    🔗 Karpathy's Autoresearch: https://github.com/karpathy/autoresearch

    🔗 Windows Fork: https://github.com/jsegov/autoresearch-win-rtx

    🔗 Claude Code: https://claude.ai/code

    🔗 TinyStories Dataset: https://huggingface.co/datasets/roneneldan/TinyStories


    Timestamps:

    0:00 - Intro

    2:28 - What is autoresearch?

    4:57 - How to get started

    8:39 - Our results

    10:41 - Side-by-side comparison


    What we covered:


    • What a language model is and how training works

    • What val_bpb means and why lower is better

    • How Autoresearch works — the experiment loop explained

    • The 5 research phases we designed

    • Every parameter the agent tested and what happened

    • Karpathy's own results (posted the same day we recorded)

    • Full before/after story generation — baseline vs. optimized


    Coming Next:

    What real use cases are there for OpenClaw? We find out.👀


    Got questions about Autoresearch or running ML experiments on consumer hardware? Drop them in the comments! If this helped you understand how AI research actually works, like and subscribe for more builds with AI! 🦐✨


    #Karpathy #Autoresearch #MachineLearning #AI #ClaudeCode #OpenClaw #LLM #NanoGPT #AIResearch #ConsumerGPU #DeepLearning"
  channel: "Onchain AI Garage"
  channelId: "UCqB1bhMwGsW-yefBxYwFCCg"
  duration: "PT13M42S"
  publishedAt: "2026-03-10T14:00:27Z"
  thumbnailUrl: "https://i.ytimg.com/vi/9jxrmk_Xses/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=9jxrmk_Xses"
processedAt: "2026-03-24T19:50:07.373Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Andrej Karpathy's auto-research project enables an AI agent to autonomously optimize a small language model's hyperparameters, achieving near-human performance (0.511 val_bp score) on the Tiny Stories dataset in just a couple of hours on a consumer laptop."
tools:
  - name: "auto-research"
    url: null
  - name: "GitHub"
    url: null
  - name: "uv"
    url: null
  - name: "Claude"
    url: null
  - name: "Tiny Stories"
    url: null
  - name: "Tiny Shakespeare"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "machine-learning"
  - "open-source"
  - "research"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 10222
  outputTokens: 1041
  totalTokens: 11263
  processingTimeMs: 266641
tagsNormalizedAt: "2026-03-24T23:00:54.097Z"
---

## Key Takeaways

Auto-research represents a paradigm shift in machine learning experimentation by automating the research process. Key insights from this experiment include:

- **AI-driven optimization** achieved a 56% accuracy improvement, reaching near-human levels (0.511 vs. 0.5 human baseline) on simple text prediction.

- **Consumer hardware accessibility** - the experiment ran successfully on a mid-range laptop with an RTX 4060 GPU, not requiring expensive H100 infrastructure.

- **Autonomous discovery** - the agent found non-obvious optimal configurations including shallower model depth (3 layers), smaller batch sizes, and optimal vocabulary size (4096) for the specific dataset.

- **Research democratization** - users only need to write plain English instructions in a `program.md` file, making advanced ML experimentation accessible to non-experts.

## Summary

Andrej Karpathy's auto-research project demonstrates how AI agents can autonomously conduct machine learning research. The system uses a small language model that reads a research plan, forms hypotheses, runs experiments, analyzes results, and iteratively improves model configurations without human intervention.

The experiment described in the video used Karpathy's open-source auto-research tool with modifications for consumer hardware. The creator cloned the Windows-compatible fork (auto-research-win-rtx) and ran it on a laptop with an RTX 4060 GPU and 8GB VRAM. The training dataset was Tiny Stories

- simple children's stories that make the problem tractable on consumer hardware.

**How It Works:**
- Users write a research plan in plain English in a `program.md` file

- The AI agent reads this plan and can only modify the `train.py` script (model configuration code)
- It runs short training sessions (5 minutes each), measures results using the `val_bp` score (lower is better), and decides what changes to keep or discard

- The agent operates in a loop, using previous results to plan next experiments

**Key Technical Findings:**
- **Vocabulary size optimization**: The agent discovered 4096 tokens worked best (vs. baseline 512)
- **Model depth reduction**: Shallower networks (3 layers) performed better than deeper ones (8 layers) for simple stories

- **Batch size optimization**: Smaller batches led to faster learning on simple data

- **Score improvement**: From baseline 1.173 (barely better than random guessing at 2.0) to 0.511 (near human-level at 0.5)

**Quality Demonstration:**
The optimized model showed dramatic improvement in text generation quality. Where the baseline produced gibberish like "Whiskers. There was a big tree. They tried to play near the shop," the optimized model generated coherent stories: "Once upon a time, there was a little girl named Lucy. She loved to dance and play with her friends. One day, Lucy and her friends decided to have a race in the park."

Karpathy's own experiments revealed that autonomous agents found bugs he had missed during years of manual tuning, including wrong optimizer betas, missing regularization, and attention implementation issues. His agents made approximately 700 autonomous changes and achieved 11% faster training.

The future direction includes **agent swarms** - multiple AIs collaborating in parallel and promoting the best ideas to a larger model. This represents what Karpathy calls "the final boss battle" that all LLM Frontier Labs will eventually implement.

## Context

This experiment matters because it demonstrates the democratization of AI research. Previously, optimizing language models required expensive infrastructure and deep expertise. Now, with tools like auto-research, anyone with a consumer-grade GPU can conduct meaningful machine learning experiments. This represents a shift toward autonomous AI research where systems can discover optimal configurations faster than human researchers. As Karpathy notes, this approach will become standard practice across all major AI labs, potentially accelerating progress in the field while making advanced research more accessible.
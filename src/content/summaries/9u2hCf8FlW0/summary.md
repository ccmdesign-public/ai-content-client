---
metadata:
  videoId: "9u2hCf8FlW0"
  title: "The Economics of Neoclouds"
  description: "Thunder Compute: https://www.thundercompute.com/?utm_source=youtube&utm_medium=affiliate&utm_campaign=calebwritescode


    Neoclouds have been a growing topic ever since the emergence of generative AI in 2022.

    We now have neoclouds like CoreWeave, Nebius, IREN, Crusoe, Lambda, and Together AI all contributing towards making compute available as GPU-as-a-service or Graphics Cards as a service.

    How do metrics like utilization, availability, contracts, and additional services all play into factor of a commoditized market? Why are banks handing out asset backed loans to neoclouds and data centers when depreciation for these assets are risky?


    #neocloud #datacenters #graphicscards #ai #tech


    Chapters

    00:00 Intro

    01:11 Utilization

    02:30 Brief History

    03:44 AI Training

    04:16 Availability

    05:04 Scheduling

    07:25 Traditional Cloud

    08:05 Graphics Cards

    09:24 Sponsor: Thunder Compute

    10:47 Market

    11:24 Contracts

    12:27 Neoclouds

    13:47 Asset Depreciation"
  channel: "Caleb Writes Code"
  channelId: "UCuU9jE4MHHEIyYMbDfUPSew"
  duration: "PT14M35S"
  publishedAt: "2026-03-08T22:29:59Z"
  thumbnailUrl: "https://i.ytimg.com/vi/9u2hCf8FlW0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=9u2hCf8FlW0"
processedAt: "2026-03-10T14:47:24.269Z"
source: "youtube"
tldr: "Running a profitable GPU cloud (NeoCloud) requires high utilization (above 55%) and efficient scheduling to compete in a commoditized market, with ROI heavily dependent on managing hardware costs, customer demand for multi-card instances, and the challenges of heterogeneous GPU fleets."
tools:
  - name: "Coreweave"
    url: null
  - name: "RunPod"
    url: null
  - name: "Vultr"
    url: null
  - name: "Thunder Compute"
    url: null
  - name: "Lambda"
    url: null
  - name: "Azure"
    url: null
  - name: "Ollama"
    url: null
  - name: "ComfyUI"
    url: null
  - name: "VS Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
tags:
  - "business"
  - "machine-learning"
  - "model-training"
  - "monetization"
  - "startup"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9867
  outputTokens: 1121
  totalTokens: 10988
  processingTimeMs: 69027
tagsNormalizedAt: "2026-03-10T16:45:55.429Z"
---

## Key Takeaways

The video analyzes the business model and challenges of GPU cloud providers (NeoClouds). Key takeaways include:

*   **Utilization is the critical metric:** A NeoCloud needs over 55% utilization on an H100 GPU at market rates ($2.30/hr) to outperform stock market investments, making efficient scheduling paramount.

*   **The market is heavily commoditized:** Customers shop for the cheapest price, making it difficult to charge premium rates without offering unique features or superior efficiency.

*   **Scaling introduces nonlinear complexity:** Customer demand for multi-GPU instances (e.g., 8+ H100s) and the communication bottlenecks of **model parallelism** (77% efficiency at 8 cards) make intelligent, geometric-aware scheduling a major competitive moat.

*   **Hardware diversity creates risk:** Supporting multiple GPU types (Nvidia H100, AMD MI350X, Google TPU) risks underutilization of specific hardware classes due to incompatible software stacks (CUDA vs. ROCm), eating into margins.

## Summary

The video dissects the economics of starting and scaling a NeoCloud, a business that rents out high-end GPUs like the Nvidia H100 for AI training.

### The Basic Economics

Starting with a $30,000 investment for one H100 ($25k for the card, $5k for ops), the analysis uses a market rate of $2.30 per hour. At 100% utilization over the card's 4-year lifespan, this yields $80,000 in revenue, a 28% annualized return. However, this plummets if utilization falls. The **breakeven point versus the stock market is around 55% utilization**, highlighting it as the most critical business metric.

### The Commoditization Challenge

NeoClouds operate in a price-sensitive market where customers compare rates from providers like Coreweave, RunPod, and Vultr. Charging above market rate is difficult without a differentiating feature. Therefore, **operational efficiency—particularly in scheduling—becomes the key to maintaining margins** and potentially undercutting competitors.

### The Scaling & Scheduling Problem

Modern AI models like GPT-3 (175B parameters) or Kimik 2.5 (1T parameters) require multiple GPUs. Customers don't just reserve a number of cards; they need them in specific **geometric shapes** (e.g., 8 cards on the same node) to avoid crippling network latency. This turns resource allocation into a complex game of 3D Tetris. Research shows efficiency losses with scale: **model parallelism on 8 cards is only 77% as efficient as a single card**, and this worsens with data parallelism.

### Hardware & Market Landscape

The business scales non-linearly. Securing reliable H100 supply is a moat for established players. Furthermore, diversifying into different hardware (AMD, Google TPU, Amazon Trainium) to attract more customers introduces massive risk, as workloads are not portable between architectures, leading to potential underutilization of entire GPU classes.

Despite the challenges, NeoClouds fill a vital market gap, serving enterprises, academia, and researchers who need compute but cannot build their own data centers. The sector ranges from giants like Coreweave to niche emerging players. Interestingly, GPUs have held their value as assets, enabling **asset-backed loans** where the hardware itself serves as collateral.

## Context

This analysis matters because access to GPU compute is the foundational resource for the AI revolution. As models grow larger, the cost and complexity of training them skyrockets, creating a booming market for cloud-based GPU rentals. Understanding the economics helps explain the competitive landscape, why pricing is structured a certain way, and what challenges startups and investors face in this capital-intensive sector. It's crucial for AI developers, infrastructure engineers, entrepreneurs, and investors evaluating this high-growth space.
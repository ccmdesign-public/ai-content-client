---
metadata:
  videoId: "JNAvKGU2mOo"
  title: "NVIDIA's NEW Nemotron 3 Super in 6 Minutes"
  description: "NVIDIA Nemotron 3 Super: Latent MoE + Hybrid Mamba, 1M Context, Faster Inference


    NVIDIA released Nemotron 3 Super, a new mixture-of-experts model with a new architecture combining latent mixture of experts and a hybrid Mamba approach to blend transformer strengths with Mamba speed. The model has 120B total parameters with about 12B active per token, improving inference speed. Unlike standard MoE that routes raw tokens to experts, latent MoE compresses tokens before routing so experts process smaller inputs, enabling up to four times more experts at the same cost. The script covers third-party openness vs. intelligence benchmarking, noting NVIDIA’s permissive access (download weights, self-host, fine-tune, commercialize) and training documentation. It highlights 1M-token context, strong long-context multi-user efficiency, availability via Perplexity, developer tools, Hugging Face, major clouds, and benchmarks showing improved throughput and coding performance versus prior Nemotron and other sub-250B models.


    https://nvda.ws/3Pvzn8o\ 


    00:00 Nvidia Model Overview

    00:17 Mixture of Experts Basics

    00:58 Latent MoE Explained

    01:54 Openness vs Intelligence

    03:03 Efficiency and Long Context

    03:34 How to Use It Today

    04:34 Where to Access It

    04:57 Benchmarks and Throughput

    05:44 Wrap Up and Thanks"
  channel: "Developers Digest"
  channelId: "UCuE6iwZKgGz8s6kznBRI9LQ"
  duration: "PT5M46S"
  publishedAt: "2026-03-12T13:30:27Z"
  thumbnailUrl: "https://i.ytimg.com/vi/JNAvKGU2mOo/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=JNAvKGU2mOo"
processedAt: "2026-03-12T16:01:45.312Z"
source: "youtube"
tldr: "NVIDIA's Nemotron 3 Super is a 120B parameter open-weight model featuring a novel hybrid Mamba & latent mixture-of-experts architecture that delivers 5x higher throughput, 1M token context, and superior coding performance while being fully downloadable and commercially usable."
tools:
  - name: "Hugging Face"
    url: null
  - name: "Perplexity"
    url: null
  - name: "Coder Rabbit"
    url: null
  - name: "Gravile"
    url: null
  - name: "Factory"
    url: null
  - name: "Vert.Ex AI"
    url: null
  - name: "AWS"
    url: null
  - name: "Azure"
    url: null
  - name: "Deep Infra"
    url: null
  - name: "Fireworks"
    url: null
  - name: "Inference.net"
    url: null
  - name: "Modal"
    url: null
  - name: "DGX Spark"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-coding"
  - "ai-general"
  - "llm"
  - "machine-learning"
  - "nlp"
  - "open-source"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5621
  outputTokens: 1077
  totalTokens: 6698
  processingTimeMs: 36063
tagsNormalizedAt: "2026-03-12T16:11:59.051Z"
---

## Key Takeaways

NVIDIA's Nemotron 3 Super represents a significant advancement in open-weight AI models with unique architectural innovations. • **Novel Architecture**: Combines **hybrid Mamba** for speed with **latent mixture-of-experts** for efficiency, activating only 12B of its 120B parameters per token. • **Exceptional Performance**: Outperforms comparable models (GPT OSS, GLM 4.7 Flash, Quen 3) in coding tasks and handles 1M token contexts with 5x higher throughput than its predecessor. • **Truly Open & Accessible**: Fully downloadable weights, permissive commercial license, available on Hugging Face, and deployable from single GPU to cloud scale.

## Summary

NVIDIA's Nemotron 3 Super is a groundbreaking 120-billion parameter open-weight model that introduces two key architectural innovations: a **hybrid Mamba architecture** and a **latent mixture-of-experts (MoE)** system.

The hybrid Mamba architecture merges the strengths of transformer models with the speed advantages of Mamba, while the latent MoE approach represents a significant evolution from standard mixture-of-experts. Instead of routing raw tokens to experts, the model first compresses tokens, then sends them to a router that determines which expert processes them. This allows experts to work on smaller inputs, enabling up to four times more experts at the same computational cost.

With 120 billion total parameters but only 12 billion active per token, the model achieves remarkable efficiency at inference time. It supports up to **1 million tokens of context** and demonstrates **5 times higher throughput** than the previous Nemotron Super model.

### Performance & Accessibility

The model excels particularly in coding tasks when paired with NVIDIA's Frontier Planner, reliably following detailed specifications and executing multi-step coding tasks accurately. According to third-party benchmarks like the Artificial Analysis Intelligence Index, it outperforms comparable models including GPT OSS, GLM 4.7 Flash, and Quen 3 with 235 billion parameters.

NVIDIA has made the model genuinely open with a permissive license that allows users to download weights, self-host, fine-tune, and commercialize the model. Detailed training documentation and recipes for reinforcement learning are provided, making it valuable for both practitioners and researchers.

### Deployment & Availability

The model is available through multiple channels: Hugging Face for direct access, cloud platforms like AWS and Azure, and specialized AI services including Perplexity, Deep Infra, Fireworks, Inference.net, and Modal. It can be deployed across various infrastructures, from NVIDIA's DGX Spark systems down to single GPU cloud instances.

Enterprise adoption is already underway with integration into coding tools like Coder Rabbit, Gravile, and Factory (a CLI coding harness similar to Cline or CodeEx). The model's efficiency gains mean users can achieve significantly more performance from their GPU resources compared to alternatives like GPT OSS 12B.

## Context

This release matters because it represents NVIDIA's push into the open-weight AI model space with genuinely permissive licensing and detailed transparency. Developers, researchers, and enterprises seeking cost-effective, high-performance coding models with commercial flexibility should pay attention. It addresses the growing demand for models that balance intelligence with inference efficiency while providing full control over deployment and customization. The architectural innovations could influence future model designs across the industry.
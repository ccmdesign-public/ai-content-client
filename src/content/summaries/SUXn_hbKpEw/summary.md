---
metadata:
  videoId: "SUXn_hbKpEw"
  title: "How GPU is scaling with AI.."
  description: "Special interview with Joe DeLaere and Stuart Pitts from NVIDIA as I find out how we got here from DGX-1 with Pascal architecture to NVL72 and extreme codesigned Vera Rubin platform as agentic AI continues to scale.


    Thank you Joe and Stuart for participating in my first ever interview.


    #ai #nvidia #gpu #technology\ 


    Chapters

    00:00 Intro

    02:31 DGX

    04:25 NVL72

    05:31 Token Efficiency

    06:11 Agentic Scaling

    08:28 Inference

    10:35 Future"
  channel: "Caleb Writes Code"
  channelId: "UCuU9jE4MHHEIyYMbDfUPSew"
  duration: "PT13M21S"
  publishedAt: "2026-03-26T16:21:15Z"
  thumbnailUrl: "https://i.ytimg.com/vi/SUXn_hbKpEw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=SUXn_hbKpEw"
processedAt: "2026-03-26T21:24:25.131Z"
source: "youtube"
tldr: "The video traces the co-evolution of AI models and GPU infrastructure, from Google's 2017 transformer to Nvidia's 2026 Rubin platform, showing how infrastructure scaling enabled model growth from 117M to 1T+ parameters and now supports agentic AI with specialized inference accelerators like Gro 3 LPX."
tools:
  - name: "LangChain"
    url: null
  - name: "Cursor"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "agents"
  - "ai-general"
  - "architecture"
  - "llm"
  - "machine-learning"
  - "model-training"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9712
  outputTokens: 1047
  totalTokens: 10759
  processingTimeMs: 40452
tagsNormalizedAt: "2026-03-26T21:33:01.784Z"
---

## Key Takeaways

The core message is that AI infrastructure and models have a symbiotic scaling relationship, with each driving innovation in the other. Key insights include: • **Four phases of scaling** (pre-training, post-training, reasoning, agentic) each demand different infrastructure capabilities. • **Nvidia's progression** from DGX1 (8 GPUs) to NVL72 rack-scale (72 GPUs) to full pod architecture shows exponential growth in compute density. • **Specialized inference accelerators** like Gro 3 LPX deliver 35x more tokens per megawatt for trillion-parameter models by leveraging SRAM memory hierarchies. • **The future** involves tiered inference for agentic systems and expansion into orbital data centers.

## Summary

The video explores the interdependent evolution of AI models and the GPU infrastructure that powers them, starting from the 2017 transformer breakthrough.

**Historical Scaling and Infrastructure Gaps**

Between 2016 and 2018, the AI industry was uncertain about the scale transformers would achieve. However, from GPT-1's 117 million parameters to GPT-3's 175 billion in just two years, model size exploded. This created immediate infrastructure demands. The video references Jensen Huang's framework of four scaling phases: pre-training, post-training, reasoning, and the emerging **agentic scaling**. An interesting gap existed in the 20-70 billion parameter range around 2022, partly because scaling beyond single GPUs introduced significant engineering overhead. This gap was later filled by models like GPT OSS 20B and Quen 3 32B, aided by improved precision formats (FP16, INT8, INT4, NVFP4) that reduced infrastructure pressure.

**Nvidia's Infrastructure Evolution**

A major catalyst was Nvidia's 2016 **DGX1**, which combined eight P100 GPUs with **NVLink 1** to create a single 128 GB VRAM device. This was a leap of faith before the transformer's dominance. As models grew, so did infrastructure: the DGX topology evolved through architectures like Ampere and Hopper. By 2024, **Blackwell** introduced the **NVL72** rack-scale architecture, connecting 72 GPUs and offering a 50x performance-per-watt improvement over Hopper for data-center-level token efficiency.

**The Agentic Era and Specialized Inference**

The rise of agentic applications (like LangChain in 2022, Cursor in 2023, and Cloud Code/Manis by 2025) shifted demands from raw throughput to needing better CPU, storage, networking, and faster inference. Infrastructure responded by evolving from single GPU servers to entire **pods** with dedicated racks for CPU (Ver), GPU (NVL72), AI-native storage (STX), and networking (LPX).

A critical innovation for agentic inference is **Nvidia Gro 3 LPX**, an inference accelerator for the Vera Rubin platform. It marries Rubin GPUs' computational power with the LPU's high-bandwidth SRAM memory. This hybrid design can deliver **35x more tokens per megawatt** for trillion-parameter models with massive 400k input contexts, carving out a new market for high-speed, large-model inference.

**The Future of Compute**

Looking ahead, the future involves **tiered inference** where agentic systems use different 'levels of smarts' for different tasks, potentially creating a 10x revenue opportunity. Compute demand is expected to go 'off the charts.' Beyond terrestrial data centers, Nvidia is exploring **orbital data centers** with projects like the Vera Rubin Space One module, signaling the next frontier for AI infrastructure.

## Context

This analysis matters because understanding the hardware scaling behind AI breakthroughs reveals the material constraints and innovations that enable progress. As AI models become larger and more agentic, the underlying compute infrastructure—from inter-GPU links to memory hierarchies—determines what's possible. Developers, researchers, and business leaders must grasp this co-evolution to anticipate future capabilities, cost structures, and the feasibility of next-generation AI applications. The shift from general-purpose training clusters to specialized inference pods marks a fundamental change in how computational resources are architected for production AI.
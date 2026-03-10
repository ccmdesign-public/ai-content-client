---
metadata:
  videoId: "quOe8V2n9rU"
  title: "Mercury 2: The First Reasoning Diffusion Language Model (1,000+ tokens/sec)"
  description: "Mercury Two: The First Reasoning Diffusion LLM (1,000+ tokens/sec) - Speed Without Sacrificing Quality


    Inception Labs releases Mercury Two, a reasoning diffusion-based LLM that exceeds 1,000 tokens per second by generating multiple tokens per forward pass and iteratively refining output, rather than using autoregressive token-by-token generation. The script compares its throughput to Haiku (~89 t/s) and GPT-5 Mini (~71 t/s) and argues diffusion provides built-in error correction that can improve reasoning. Mercury Two is presented as maintaining quality while being fast, tying GPT-5 Mini on AIME 2025 at 91.1 and scoring competitively on GPQA and LiveCodeBench. A demo shows Mercury Two versus Haiku with selectable reasoning levels (instant/low/medium/high) and an agentic workflow that uses browser tool calls to find and summarize AI-related Hacker News stories and comments, emphasizing reduced latency in tool-heavy loops. The model supports tool use, structured outputs, RAG, and a 128k context window, and is priced at $0.25 per million input tokens and $0.75 per million output tokens. The script notes an OpenAI-compatible API (swap base URL/model string/API key) and mentions the demo uses Vercel's AI SDK, with code to be linked in the video description. It contrasts industry efforts focused on incremental autoregressive inference optimizations with Mercury Two's model-level approach, highlighting latency-sensitive use cases like voice interfaces, coding iteration, and chat apps, and encourages viewers to try the API platform and playground.


    🔗 Try Mercury 2

    API Platform: http://platform.inceptionlabs.ai/

    Playground: https://chat.inceptionlabs.ai/


    Inception is a Palo Alto-based AI lab founded by researchers from Stanford, UCLA, and Cornell - including Stefano Ermon, co-inventor of the diffusion methods behind modern image and video generation. Backed by Menlo Ventures, M12 (Microsoft), NVentures (NVIDIA), Databricks, and individual investors including Andrew Ng, Andrej Karpathy, and Eric Schmidt.


    💻 Repo to Demo App Coming soon!


    00:00 Mercury Two Breakthrough

    00:20 Why Speed Used to Cost Quality

    00:43 Diffusion Reasoning Explained

    01:50 Speed and Benchmark Results

    02:16 Live Demo Versus Haiku

    02:40 Agentic Tool Use Example

    03:40 API Setup and Pricing

    04:36 Best Use Cases for Low Latency

    05:16 Diffusion vs Autoregressive


    This video is sponsored by Inception Labs.

    06:11 Industry Race and Big Picture

    07:14 Wrap Up and Try the API

    #mercury2 #diffusionllm #inceptionlabs #ai #reasoning"
  channel: "Developers Digest"
  channelId: "UCuE6iwZKgGz8s6kznBRI9LQ"
  duration: "PT8M7S"
  publishedAt: "2026-02-24T18:01:04Z"
  thumbnailUrl: "https://i.ytimg.com/vi/quOe8V2n9rU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=quOe8V2n9rU"
processedAt: "2026-03-10T15:28:46.792Z"
source: "youtube"
tldr: "Inception Labs' Mercury 2 is the first reasoning diffusion LLM that achieves over 1,000 tokens/sec—five times faster than speed-optimized auto-regressive models—while maintaining competitive quality, fundamentally changing how AI generates text through parallel refinement rather than sequential token generation."
tools:
  - name: "Mercury 2"
    url: null
  - name: "OpenAI API"
    url: null
  - name: "AI SDK"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "agents"
  - "api-design"
  - "llm"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6934
  outputTokens: 914
  totalTokens: 7848
  processingTimeMs: 44521
tagsNormalizedAt: "2026-03-10T16:47:49.379Z"
---

## Key Takeaways

Mercury 2 represents a paradigm shift in large language models by combining diffusion architecture with reasoning capabilities. Key insights include: • **Diffusion architecture enables parallel token generation** with built-in error correction, unlike sequential auto-regressive models • **Achieves over 1,000 tokens/second** while maintaining competitive benchmark scores (ties GPT-5 Mini at 91.1 on AIM 2025) • **Excels in agentic workflows** where multiple tool calls compound latency • **Cost-effective pricing** at $0.25/$0.75 per million input/output tokens with 128K context window

## Summary

Mercury 2 from Inception Labs represents a fundamental breakthrough in large language model architecture. Unlike conventional auto-regressive models that generate text sequentially (one token at a time), Mercury 2 uses a **diffusion-based approach** that generates multiple tokens per forward pass and iteratively refines output through parallel processing.

This architectural difference provides several key advantages. First, **built-in error correction** allows the model to revisit and fix mistakes during generation, preventing the cascading errors common in auto-regressive models where early mistakes propagate through subsequent tokens. Second, the parallel generation enables **extraordinary speed**—over 1,000 tokens per second—which is five times faster than speed-optimized auto-regressive models like Claude Haiku (89 tokens/sec) or GPT-5 Mini (71 tokens/sec).

### Performance and Applications

Despite its speed, Mercury 2 doesn't sacrifice quality. It achieves **competitive benchmark scores** including 91.1 on AIM 2025 (tying GPT-5 Mini) and strong performance on GBQA and LiveCodeBench. The model particularly excels in **agentic applications** where multiple tool calls create compounding latency. In demonstrations, Mercury 2 rapidly completes complex tasks involving web browsing, content extraction, and summarization.

### Technical Implementation and Accessibility

Mercury 2 features a **128,000-token context window** and offers an **OpenAI-compatible API**, making it easy to integrate into existing applications and agentic frameworks. Users can select different reasoning levels (instant, low, medium, or high) depending on their needs. The model is priced at **$0.25 per million input tokens** and **$0.75 per million output tokens**, making it highly cost-competitive given its performance characteristics.

### Industry Context and Future Implications

The release comes as the AI industry invests billions in solving inference speed challenges, primarily through hardware optimization and incremental improvements to auto-regressive models. Inception Labs—founded by pioneers of diffusion techniques used in image/video generation—has taken a fundamentally different approach by solving speed at the **model architecture level** rather than the infrastructure level. As reasoning and agentic workflows become increasingly important in 2026, Mercury 2's combination of speed, quality, and cost-effectiveness makes it particularly compelling for latency-sensitive applications including voice interfaces, coding workflows, and chat-based consumer applications.

## Context

This release represents a significant architectural breakthrough in large language models at a time when the industry is pouring billions into inference speed optimization. While most companies focus on hardware improvements and incremental optimizations to auto-regressive models, Mercury 2 takes a fundamentally different approach by applying diffusion techniques—previously successful in image and video generation—to text generation. This matters because as AI applications become more complex with agentic workflows and tool calling, latency compounds with each sequential step, making speed increasingly critical for user experience. Developers building latency-sensitive applications, agentic systems, or any application where rapid iteration matters should pay attention to this development.
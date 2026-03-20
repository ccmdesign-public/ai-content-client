---
metadata:
  videoId: "hQoF_dv2UQ4"
  title: "Qwen 3.5 Small Models Are INCREDIBLE! (Testing 0.8B & 2B On Edge Devices)"
  description: "In this video, we put the brand-new Qwen 3.5 Small Model Series to the ultimate test by running the 0.8B and 2B versions locally and 100% offline on a MacBook and an iPhone 14 Pro. You’ll see how these \"intelligence density\" powerhouses handle real-world agentic coding tasks in VS Code and native multimodal vision tests right from a smartphone. We also dive into the breaking news regarding the Qwen team’s sudden restructuring at Alibaba and what it means for the future of open-source edge AI.


    🔗 Relevant Links

    Qwen 3.5: https://huggingface.co/collections/Qwen/qwen35

    iOS QwenChat Project: https://github.com/andrisgauracs/qwen-chat-ios


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack


    📌 Chapters:

    00:00 - Intro

    00:55 - Why Are Qwen 3.5 Small Models So Good

    01:46 - Benchmarks and Context Window\ 

    02:54 - Local Coding Test: Qwen 3.5 0.8B\ 

    05:17 - Local Coding Test: Qwen 3.5 2B\ 

    07:05 - Running Qwen 3.5 0.8B on iPhone 14 Pro\ 

    08:28 - Multimodal Vision Tests\ 

    09:41 - OCR and Language Detection\ 

    10:25 - Running Qwen 3.5 2B on iPhone 14 Pro\ 

    11:35 - Thoughts And Takeaways

    12:00 - Sad News About The Qwen Team

    12:32 - Outro"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT13M7S"
  publishedAt: "2026-03-07T03:30:24Z"
  thumbnailUrl: "https://i.ytimg.com/vi/hQoF_dv2UQ4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=hQoF_dv2UQ4"
processedAt: "2026-03-07T20:41:44.579Z"
source: "youtube"
tldr: "Alibaba's Qwen 3.5 small models (0.8B & 2B) deliver impressive multimodal intelligence (text, vision, code) on edge devices, outperforming larger models in benchmarks, but practical coding use is limited by hallucinations and loops."
tools:
  - name: "LM Studio"
    url: null
  - name: "VS Code"
    url: null
  - name: "Klein"
    url: null
  - name: "Swift"
    url: null
  - name: "MLX"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "ai-coding"
  - "ai-general"
  - "computer-vision"
  - "llm"
  - "machine-learning"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9396
  outputTokens: 963
  totalTokens: 10359
  processingTimeMs: 30626
tagsNormalizedAt: "2026-03-07T21:05:15.394Z"
---

## Key Takeaways

Alibaba's Qwen 3.5 small models represent a breakthrough in **intelligence density** for edge AI.

*   The **0.8B and 2B parameter models** are native multimodal, supporting text, vision, and coding in a unified architecture.

*   They achieve high scores on vision benchmarks (OCR Bench) and support a **262K context window**, enabling large document analysis.

*   Real-world testing shows they run offline on iPhones and old laptops with fast inference, but coding tasks reveal **hallucinations and reliability issues**.

## Summary

Alibaba has released the Qwen 3.5 small model series, including 0.8 billion and 2 billion parameter versions, which are causing excitement due to their high **intelligence density**. These models are natively multimodal, meaning vision and coding abilities are baked into the same tiny architecture that also handles text.

### Benchmark Performance

On the MMLU benchmark for general knowledge, the 2B model scores 66.5, outperforming the original 7B parameter Llama 2 (45.3). Their standout feature is vision performance. On OCR Bench, the 2B model scores 85.4 and the 0.8B scores 79.1, indicating strong capabilities for reading documents and analyzing images. Both models support a massive **262K context window**.

### Local Coding Test Results

The video tests the models offline using **LM Studio** and **Klein in VS Code** for a simple coding task: building a cafe website with HTML, CSS, and JS.

*   **0.8B Model**: Completed the task in ~1 minute but produced bland, flawed code (hardcoded broken image URLs). It struggled with iterative improvements.

*   **2B Model**: Took ~3 minutes, produced better-structured and more thematic code, but frequently got stuck in **infinite loops** during generation, which may be a tooling issue. The creator concludes these models are not yet suitable for serious, complex coding due to low parameter count and reliability problems.

### iPhone Testing with MLX Swift

The most impressive demo involves running the models on an **iPhone 14 Pro** using a native iOS app built with **Swift** and **Apple's MLX framework** for hardware acceleration.

*   **Speed**: Inference was remarkably fast, with responses streamed in real-time.

*   **Reasoning**: Both models correctly solved the classic "car wash" reasoning test.

*   **Vision**: The 0.8B model identified a banana but hallucinated the term "dog banana" and incorrectly deemed it unsafe. It failed at dog breed identification and OCR for Latvian text. The **2B model performed significantly better**: it correctly identified the banana's ripeness and successfully identified the text language as Latvian, though it still failed at dog breed identification.

The video ends with a somber note that key team members behind Qwen have reportedly departed Alibaba, potentially making this release their last major contribution for a while.

## Context

This release is significant because it challenges the long-held assumption that capable multimodal AI (seeing, reasoning, coding) requires massive models only accessible via the cloud. By packing this intelligence into sub-2B parameter models, Qwen 3.5 makes advanced, private, offline AI accessible on consumer devices like smartphones and old laptops. This pushes the frontier of **edge AI** and democratizes access to multimodal LLMs for developers and hobbyists interested in building fully offline applications.
---
metadata:
  videoId: "YpQWdrfzSzQ"
  title: "KittenTTS - The Nano TTS"
  description: "In this video, I look at KittenTTS, a tiny TTS that can load in under 25 MB and has only 15 million parameters.\ 


    Github: https://github.com/KittenML/KittenTTS

    HF: https://huggingface.co/KittenML/kitten-tts-nano-0.8-int8

    Colab: https://dripl.ink/3BPIH


    For more tutorials on using LLMs and building agents, check out my Patreon

    Patreon: https://www.patreon.com/SamWitteveen

    Twitter: https://x.com/Sam_Witteveen\ 


    🕵️ Interested in building LLM Agents? Fill out the form below

    Building LLM Agents Form: https://drp.li/dIMes


    👨‍💻Github:

    https://github.com/samwit/llm-tutorials


    ⏱️Time Stamps:

    00:00 Intro

    00:19 Kitten TTS Github

    00:34 Kitten TTS Models

    03:14 Colab Demo"
  channel: "Sam Witteveen"
  channelId: "UC55ODQSvARtgSyc8ThfiepQ"
  duration: "PT9M25S"
  publishedAt: "2026-02-22T14:30:33Z"
  thumbnailUrl: "https://i.ytimg.com/vi/YpQWdrfzSzQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=YpQWdrfzSzQ"
processedAt: "2026-03-10T14:56:30.293Z"
source: "youtube"
tldr: "KittenTTS is a new series of ultra-small text-to-speech models (15-80M parameters) designed for edge deployment, offering surprisingly decent voice quality at under 25MB, running on CPU, and licensed under Apache 2."
tools:
  - name: "KittenTTS"
    url: null
  - name: "Google Colab"
    url: null
  - name: "GitHub"
    url: null
  - name: "ONNX"
    url: null
  - name: "MLX"
    url: null
  - name: "Coqui TTS"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-general"
  - "llm"
  - "machine-learning"
  - "model-training"
  - "nlp"
  - "open-source"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7250
  outputTokens: 868
  totalTokens: 8118
  processingTimeMs: 32853
tagsNormalizedAt: "2026-03-10T16:45:49.577Z"
---

## Key Takeaways

KittenTTS demonstrates how TTS models can be drastically miniaturized for edge computing. • **Ultra-small models:** The 'nano' model has 15M parameters and an 8-bit quantized version is under 25MB, enabling browser and mobile phone deployment. • **CPU-optimized & open:** The models run efficiently without a GPU and are fully open source under the Apache 2 license. • **Trade-off accepted:** While voice quality isn't state-of-the-art, the small size makes it viable for lightweight applications where local, private, or offline TTS is required.

## Summary

The video introduces KittenTTS, a new text-to-speech system from Kitten ML notable for its exceptionally small model sizes. The creator reviews three core model sizes—mini (80M parameters), micro (40M), and nano (15M)—with an 8-bit quantized version of the nano model weighing in at under 25 megabytes. This makes it fundamentally different from larger, higher-quality models like Coqui TTS or QuenTTS, which can have billions of parameters.

A key advantage is **edge deployment**. The models are CPU-optimized, require no GPU, and are small enough to run directly in a web browser, as a Chrome extension, or on mobile and other edge devices with limited RAM. The project is in developer preview (version 0.8) and is released under a permissive Apache 2.0 license.

### Performance and Trade-offs

Through a Google Colab demo (run without a GPU), the video compares audio samples from the different model sizes and pre-packaged voices like Luna, Hugo, and Bruno. The 80M parameter model provides a baseline, but the quality degradation moving down to the 15M and 8-bit quantized versions is less severe than expected. While artifacts appear and prosody (like pausing for punctuation) isn't perfect, the core voice remains intelligible and usable.

### Technical Details and Future

• The models are distributed as **ONNX** format files, contributing to their small size and portability.
• Voice selection works via different embeddings, similar to the approach used in Coqui TTS's smaller models.
• The project appears to be largely the work of a single developer or a very small team.
The video concludes that while these are not the best voices available, they represent a significant step toward **fully local, client-side TTS**. As model architectures improve, we can expect better quality at these tiny sizes, unlocking new applications for private, offline speech synthesis.

## Context

This matters because high-quality TTS has traditionally required large models and cloud APIs, creating privacy, cost, and latency issues. KittenTTS points toward a future of lightweight, local speech synthesis that can run anywhere—from web apps to IoT devices. Developers, product builders, and anyone interested in edge AI should pay attention, as it enables new categories of applications where internet connectivity is unreliable, privacy is paramount, or resources are extremely constrained.
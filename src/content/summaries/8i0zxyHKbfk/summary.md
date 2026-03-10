---
metadata:
  videoId: "8i0zxyHKbfk"
  title: "Tiny Aya - Cohere's Mini Multilingual Models"
  description: "In this video, we do a deep dive on Cohere's latest multilingual models, a family of models called Tiny Aya, which specialize in multilingual uses at the edge.\ 


    Blog: https://cohere.com/blog/cohere-labs-tiny-aya

    HF: https://huggingface.co/collections/CohereLabs/tiny-aya

    Colab:  https://dripl.ink/rV4gP


    For more tutorials on using LLMs and building agents, check out my Patreon

    Patreon: https://www.patreon.com/SamWitteveen

    Twitter: https://x.com/Sam_Witteveen\ 


    🕵️ Interested in building LLM Agents? Fill out the form below

    Building LLM Agents Form: https://drp.li/dIMes


    👨‍💻Github:

    https://github.com/samwit/llm-tutorials


    ⏱️Time Stamps:

    00:00 Intro

    01:30 LlaMA 2 Tokenizers

    03:51 TinyAya Blog

    04:47 TinyAya Models

    07:42 TinyAya Paper

    09:08 TinyAya in HuggingFace

    09:42 TinyAya Colab Demo"
  channel: "Sam Witteveen"
  channelId: "UC55ODQSvARtgSyc8ThfiepQ"
  duration: "PT11M46S"
  publishedAt: "2026-02-23T10:30:09Z"
  thumbnailUrl: "https://i.ytimg.com/vi/8i0zxyHKbfk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=8i0zxyHKbfk"
processedAt: "2026-03-10T14:55:24.724Z"
source: "youtube"
tldr: "Cohere's Tiny Aya models are a family of 3.3B parameter multilingual LLMs designed to fill the gap for low-resource languages, offering a base model, a global general-purpose model, and three region-specialized models (Earth, Fire, Water) with efficient custom tokenizers."
tools:
  - name: "Cohere"
    url: null
  - name: "Gemma"
    url: null
  - name: "Translate Gemma"
    url: null
  - name: "Qwen"
    url: null
  - name: "Llama"
    url: null
  - name: "Google Colab"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "ai-general"
  - "llm"
  - "machine-learning"
  - "model-training"
  - "nlp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8539
  outputTokens: 792
  totalTokens: 9331
  processingTimeMs: 27278
tagsNormalizedAt: "2026-03-10T16:49:12.195Z"
---

## Key Takeaways

Cohere's Tiny Aya release addresses the critical need for accessible, capable multilingual models, especially for low-resource languages.

## Summary

The video addresses the common challenge of finding capable AI models for languages beyond major European ones, highlighting that low-resource languages often suffer from a lack of training data and inefficient tokenization in mainstream models.

Historically, tokenizers like Llama 2's were inefficient for non-Latin scripts, breaking languages like Thai or Greek into many sub-word tokens, making them harder for models to learn. While newer models like Gemma 3, Qwen, and Llama 3 have improved with larger vocabularies (250k+ tokens) and better multilingual data, their smaller variants often lack the same level of multilingual capability.

**Cohere's Tiny Aya models** are a new suite designed to fill this gap. Built on a **3.3 billion parameter base model** pre-trained on 70+ languages, they prioritize accessibility and efficiency. The release includes several specialized variants:

*   **Tiny Global**: A general-purpose, instruction-tuned model supporting most pre-trained languages.

*   **Tiny Earth**: Specialized for West Asia, Africa, and European languages (e.g., Arabic, Turkish, Hebrew).

*   **Tiny Fire**: Focused on South Asian languages with distinct scripts (e.g., Hindi, Bengali, Tamil).

*   **Tiny Water**: Covers Asia-Pacific languages, including low-resource ones like Burmese and Khmer.

The models use a **custom-trained tokenizer** that is more efficient for many languages compared to off-the-shelf alternatives from Gemma 3 or Qwen. The specialized models were created by training region-specific SFT (Supervised Fine-Tuning) models and then merging them, a novel post-training approach.

Given their small size, these models are ideal for **mobile or edge applications** in regions underserved by larger models. The presenter provides a Colab notebook for testing and encourages fine-tuning the base model for specific language needs. While larger models like Qwen 3.5 are improving in multilingual tasks, Tiny Aya provides a practical, deployable solution for inclusive AI applications today.

## Context

Most large language models are optimized for high-resource languages like English, French, or Spanish, leaving hundreds of millions of speakers of low-resource languages behind. This creates a significant barrier for building inclusive AI applications, chatbots, or assistants for global markets. Developers, product teams, and researchers working on international or localized products need accessible models that perform well across diverse linguistic landscapes without requiring massive computational resources.
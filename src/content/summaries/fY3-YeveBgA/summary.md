---
metadata:
  videoId: "fY3-YeveBgA"
  title: "Qwen3 Multimodal Embeddings: Finally, RAG That Sees"
  description: "In this video, I look at the recent release of Qwen3 VL embeddings and re-rankers and look at how multimodal embeddings work, including a code example.\ 


    Blog: https://qwen.ai/blog?id=qwen3-vl-embedding

    HF: https://huggingface.co/collections/Qwen/qwen3-vl-embedding

    Colab: https://dripl.ink/ReqOF


    For more tutorials on using LLMs and building agents, check out my Patreon

    Patreon: https://www.patreon.com/SamWitteveen

    Twitter: https://x.com/Sam_Witteveen


    🕵️ Interested in building LLM Agents? Fill out the form below

    Building LLM Agents Form: https://drp.li/dIMes


    👨‍💻Github:

    https://github.com/samwit/llm-tutorials


    ⏱️Time Stamps:

    00:00 Intro

    00:47 Embeddings Refresher

    04:40 Qwen3-VL-Embeddings and Rerankers Blog

    05:57 Key Features

    06:42 Qwen3-VL Embeddings and Qwen3-VL Rerankers

    08:55 MMEB Leaderboard

    09:47 Use Cases

    10:48 Colab Demo"
  channel: "Sam Witteveen"
  channelId: "UC55ODQSvARtgSyc8ThfiepQ"
  duration: "PT19M29S"
  publishedAt: "2026-01-15T13:01:29Z"
  thumbnailUrl: "https://i.ytimg.com/vi/fY3-YeveBgA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=fY3-YeveBgA"
processedAt: "2026-01-17T17:00:22.732Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Qwen3 VL embedding models (2B and 8B) enable true multimodal RAG by mapping text, images, and video into the same semantic vector space.

  - **Top Benchmark Performance**: Qwen3 8B currently leads the MMEB leaderboard for multimodal embeddings.

  - **Matrioska Embeddings**: Supports variable vector dimensions (e.g., 4096 down to 64) to optimize search speed and storage.

  - **Optimized Workflow**: Combi\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4673
  outputTokens: 1087
  totalTokens: 6825
  processingTimeMs: 14917
tools:
  - name: "Qwen3-VL-Embeddings"
    url: "https://huggingface.co/collections/Qwen/qwen3-vl-embedding"
  - name: "Qwen3-VL-Rerankers"
    url: "https://huggingface.co/collections/Qwen/qwen3-vl-embedding"
  - name: "Hugging Face"
    url: "https://huggingface.co/collections/Qwen/qwen3-vl-embedding"
  - name: "Google Colab"
    url: "https://dripl.ink/ReqOF"
  - name: "CLIP"
    url: null
  - name: "SIGLIP"
    url: null
  - name: "MMEB Leaderboard"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "computer-vision"
  - "embeddings"
  - "llm"
  - "model-training"
  - "nlp"
  - "rag"
tagsNormalizedAt: "2026-03-01T21:19:30.325Z"
---

## Key Takeaways

The release of Qwen3 VL embedding and reranker models provides a powerful, open-source framework for building retrieval systems that can "see" and "read" simultaneously.

- **Unified Vector Space**: Unlike traditional systems, these models place text, images, and video into a shared semantic space, allowing a text query to retrieve an image or vice-versa without intermediate OCR or tagging.

- **Recall vs. Precision Strategy**: Using the **Embedding model** (Bi-encoder) for fast initial candidate retrieval followed by the **Reranker model** (Cross-encoder) for fine-grained scoring ensures high accuracy at scale.

- **Matrioska Representation Learning**: This feature allows users to truncate embeddings to smaller sizes (e.g., 512D instead of 4096D), significantly speeding up database searches with minimal loss in precision.

- **Multilingual Support**: The models support over 30 languages, extending their utility far beyond English-centric datasets.

## Summary

The Qwen3 VL (Vision-Language) models represent a major leap in multimodal Retrieval-Augmented Generation (RAG). Traditionally, RAG systems struggled with non-textual data, often relying on clunky OCR or image captioning that lost context. Qwen3 VL solves this by creating a **multimodal embedding space** where different types of media—text, photos, diagrams, and videos—share the same numerical representation. This means a query about a "cat" can find a text description of a cat, a photo of a cat, or a video clip of a cat within the same search index.

### Core Models and Architecture
Alibaba has released two primary sizes for these models: a **2B parameter** version and an **8B parameter** version. Both are released under the **Apache 2 license**, making them accessible for commercial use.

* **Embedding Model (Bi-encoder):** Best for high-speed recall. It processes massive datasets to find the top candidates (e.g., top 100 matches) for a query.

* **Reranker Model (Cross-encoder):** Used for precision. It takes the top candidates from the embedding model and performs a much more detailed comparison to rank them accurately.

By combining these two, developers can achieve significantly better results than using embeddings alone. Qwen points out that while embeddings provide roughly 85% precision, adding the reranker can push that number much higher without the massive latency of running a full LLM over the entire database.

### Technical Innovations
A standout feature of Qwen3 is **Matrioska Representation Learning**. This allows the model to pack the most important semantic information into the "front" of the vector. For example, the 8B model produces 4,096-dimensional vectors. However, users can choose to use only the first 512 or 1,024 dimensions for their search index. This results in faster retrieval and lower storage costs while maintaining high accuracy, as the model is trained specifically to remain effective even when dimensions are truncated.

### Practical Use Cases
These models unlock several high-impact applications:

- **Visual Document Search:** Searching through complex PDFs, charts, and diagrams that traditional text-based RAG might miss.

- **E-commerce Product Search:** Users can upload a photo of a product and add text modifiers (e.g., "find this shoe but in green").

- **Video Retrieval:** Navigating hours of video footage to find specific visual events (e.g., "show me the segment where a person enters the bank") by embedding individual video frames.

The demonstration shows that even the 2B model can run effectively on consumer-grade hardware like a Tesla T4, making local, privacy-focused multimodal RAG highly feasible for developers.

## Context

Historically, RAG (Retrieval-Augmented Generation) was limited to text, treating images and videos as 'black boxes' that required separate, often inferior, processing pipelines. Qwen3 VL's release marks a shift toward native multimodal intelligence in the open-source community. This matters because it democratizes high-end visual search and document analysis tools that were previously the domain of proprietary systems like OpenAI's CLIP or Google's SIGLIP. For developers, this represents a major step toward building 'unified' knowledge bases where every piece of data—regardless of its format—is equally searchable and understandable by AI agents.

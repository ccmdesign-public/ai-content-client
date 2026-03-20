---
metadata:
  videoId: "vvp97qJB6CU"
  title: "RAG Chunking Strategies Explained (Fixed Size vs Semantic Chunking)"
  description: "Chunking is one of the most critical decisions in building a RAG pipeline. In this short, we cover fixed size chunking (by characters, words, tokens, or sentences) vs. semantic chunking and why the naive approach can silently break your retrieval quality.\ 


    Watch the full RAG tutorial here 👉 https://www.youtube.com/watch?v=vT-DpLvf29Q


    #RAG #RetrievalAugmentedGeneration #SemanticChunking #DocumentChunking #LLM #VectorSearch #GenAI #AIEngineering #LLMOps #MLOps #NLP #AITutorial #RAGPipeline #TextChunking #EmbeddingSearch #AIForDevelopers #GenerativeAI #MachineLearning #KodeKloud #RAGTutorial"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT2M12S"
  publishedAt: "2026-03-10T20:38:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/vvp97qJB6CU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=vvp97qJB6CU"
processedAt: "2026-03-11T16:38:53.202Z"
source: "youtube"
tldr: "RAG chunking strategies: Fixed size chunking splits by character/word/token limits (simpler) while semantic chunking breaks text where meaning shifts (preserves context), with semantic being richer for retrieval but more complex to implement."
tools: []
categories:
  - "AI & Machine Learning"
tags:
  - "ai-general"
  - "embeddings"
  - "llm"
  - "machine-learning"
  - "nlp"
  - "rag"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1533
  outputTokens: 573
  totalTokens: 2106
  processingTimeMs: 140236
tagsNormalizedAt: "2026-03-12T16:12:15.384Z"
---

## Key Takeaways

The video compares two core approaches for chunking documents in RAG (Retrieval-Augmented Generation) systems. Key insights include:

- **Fixed size chunking** splits documents by predefined limits (characters, words, tokens) - simple but ignores semantic grouping

- **Semantic chunking** breaks text where meaning changes (measured by sentence similarity) - preserves context but adds engineering overhead

- Choice depends on trade-off between simplicity and retrieval quality

- semantic chunking yields richer context for LLM responses

## Summary

### Fixed Size Chunking

This approach involves splitting documents based on predefined size limits, making it straightforward to implement. You can chunk by characters (e.g., 5,000 characters per row), words (predefined word count), or tokens (embedding representation). It also applies to sentence or paragraph chunking where you cut at specific thresholds.

The main advantage is simplicity

- you set an upper bound upfront and process documents accordingly. However, this method ignores the natural semantic grouping within documents. Documents are often organized into sections or topics, and fixed size chunking can abruptly split content regardless of these natural boundaries, potentially separating related information.

### Semantic Chunking

Instead of using size-based boundaries, semantic chunking breaks text where the meaning actually shifts. This preserves the natural flow and context of the document. Each database row then contains semantically coherent content, making retrieval much richer for LLM responses.

One implementation method involves:

- Breaking documents into sentences

- Measuring similarity between sentences

- Chunking where coherence drops significantly (indicating topic/context change)

This approach ensures natural breakpoints in documents are respected, avoiding arbitrary splits based solely on size. The trade-off is increased engineering complexity compared to fixed size approaches, as you need to analyze semantic flow during chunking and storage.

## Context

This video addresses a fundamental challenge in building effective RAG (Retrieval-Augmented Generation) systems

- how to optimally chunk documents for storage and retrieval. As AI applications increasingly rely on retrieving relevant context from knowledge bases, chunking strategy directly impacts response quality. Developers, data engineers, and AI practitioners need to understand these trade-offs when designing systems that combine LLMs with external knowledge sources.
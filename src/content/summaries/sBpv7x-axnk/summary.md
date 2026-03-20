---
metadata:
  videoId: "sBpv7x-axnk"
  title: "This Fast Free Markdown Search Engine is BETTER than Notion #ai #tech #search"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT1M3S"
  publishedAt: "2026-03-16T10:32:47Z"
  thumbnailUrl: "https://i.ytimg.com/vi/sBpv7x-axnk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=sBpv7x-axnk"
processedAt: "2026-03-16T15:34:00.822Z"
source: "youtube"
tldr: "QMD is a local, privacy-focused search engine built by Shopify's CEO that combines BM25 keyword search, vector semantic search, and query expansion, then fuses results with reciprocal rank fusion and reranks with local LLMs for searching markdown files offline."
tools:
  - name: "QMD"
    url: null
  - name: "Obsidian"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-general"
  - "embeddings"
  - "llm"
  - "nlp"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1793
  outputTokens: 692
  totalTokens: 2485
  processingTimeMs: 23034
tagsNormalizedAt: "2026-03-16T16:35:29.500Z"
---

## Key Takeaways

QMD is a powerful local search engine for markdown documents that prioritizes privacy and advanced search techniques. • **Runs entirely offline** with no cloud or API keys, requiring about 2GB of local storage. • **Combines three search methods**: BM25 keyword scoring, vector semantic search, and query expansion models. • **Uses reciprocal rank fusion** to intelligently combine results and local LLMs for final reranking. • **Includes an MCP server** for integration with coding assistants like Cursor or Claude.

## Summary

QMD (Query Markdown) is a revolutionary search engine developed by Shopify's CEO that operates completely on your local machine without any cloud dependencies or data leaving your device. This privacy-focused approach makes it ideal for searching sensitive or personal markdown documents.

The search engine runs three distinct search algorithms in parallel to deliver comprehensive results. **BM25 full-text search** functions similarly to Google, scoring words based on their rarity and relevance within documents. **Vector semantic search** uses cosine distance to find conceptually similar content. **Query expansion models** generate variations of your original search query to uncover related content you might have missed.

These three search methods are then intelligently combined using **reciprocal rank fusion**, which merges the ranking results from each search into a unified, smarter list. The final output is reranked using **local LLMs** that are downloaded and run entirely on your machine.

**Technical requirements** include approximately 2GB of storage space for the models, which are cached after the first run. The system includes an **MCP server** that allows integration with popular coding assistants, making it particularly useful for developers. However, initial indexing of large note collections can be time-consuming, and the system requires significant VRAM for optimal performance.

QMD is particularly valuable for users with years of accumulated markdown files or those seeking better search capabilities for tools like Obsidian. Its local-first architecture ensures complete data privacy while providing sophisticated search capabilities typically only available in cloud-based services.

## Context

This tool addresses growing concerns about data privacy and the limitations of cloud-based search solutions. As knowledge workers accumulate years of notes and documentation in markdown format, they need powerful search tools that don't compromise their data security. QMD represents a shift toward local-first AI applications, where sophisticated models run entirely on personal devices rather than requiring cloud connectivity. This approach is particularly relevant for developers, researchers, and anyone managing sensitive information who wants advanced search capabilities without sacrificing privacy.
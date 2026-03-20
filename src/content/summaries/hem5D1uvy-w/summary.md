---
metadata:
  videoId: "hem5D1uvy-w"
  title: "Google's New Model + Claude Code Just Changed RAG Forever"
  description: "Full courses + unlimited support: https://www.skool.com/ai-automation-society-plus/about

    All my FREE resources: https://www.skool.com/ai-automation-society/about

    Apply for my YT podcast: https://podcast.nateherk.com/apply

    Work with me: https://uppitai.com/


    My Tools💻

    14 day FREE n8n trial: https://n8n.partnerlinks.io/22crlu8afq5r

    Code NATEHERK to Self-Host n8n for 10% off (annual plan): http://hostinger.com/nateherk

    Voice to text: https://ref.wisprflow.ai/nateherk


    Google just dropped Gemini Embeddings 2, a new model that natively understands images, videos, and text all at once. In this video I use it with Claude Code to build a full visual search engine from scratch.\ 


    The crazy part is you don't have to build any of the chunking or ingestion pipeline yourself anymore. Just describe what you want, point it at your files, and Claude Code handles everything. It extracts content from images, generates descriptions, builds out your Pinecone vector database, all of it.\ 


    You basically just throw everything you want to be searchable at it and it works. This is a massive unlock for anyone building with RAG.


    Sponsorship Inquiries:

    📧 sponsorships@nateherk.com


    TIMESTAMPS\ 

    0:00 What Gemini Embeddings 2 Can Do

    0:38 Instruction Manual Demo

    2:24 Roofing Company Demo

    4:01 Why This Is a Big Deal

    4:22 How RAG & Embeddings Work

    6:54 Setting Up Claude Code

    7:31 Planning the Build

    9:30 Creating the Vector Database

    10:13 Building the Chat App

    11:48 Testing & Improving Results

    13:40 Searching Videos with RAG

    14:04 Current Limitations

    14:53 Final Thoughts"
  channel: "Nate Herk | AI Automation"
  channelId: "UC2ojq-nuP8ceeHqiroeKhBA"
  duration: "PT15M10S"
  publishedAt: "2026-03-11T16:46:25Z"
  thumbnailUrl: "https://i.ytimg.com/vi/hem5D1uvy-w/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=hem5D1uvy-w"
processedAt: "2026-03-12T15:55:51.155Z"
source: "youtube"
tldr: "Google's Gemini Embeddings 2 and Claude Code enable rapid creation of multimodal RAG systems that combine text, images, and videos in a single vector database, with practical demos showing a 68-page PDF chatbot and roofing project search built in under 30 minutes."
tools:
  - name: "Gemini Embeddings 2"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Pinecone"
    url: "https://pinecone.io"
  - name: "Visual Studio Code"
    url: null
  - name: "Google AI Studio"
    url: null
  - name: "OpenRouter"
    url: "https://openrouter.ai"
  - name: "Anthropic"
    url: null
  - name: "OpenAI"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "claude"
  - "embeddings"
  - "gemini"
  - "rag"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 14336
  outputTokens: 852
  totalTokens: 15188
  processingTimeMs: 27198
tagsNormalizedAt: "2026-03-12T16:14:52.258Z"
---

## Key Takeaways

Google's new multimodal embedding model combined with Claude Code dramatically simplifies building multimodal RAG applications. • **Gemini Embeddings 2** is Google's first natively multimodal embedding model that can process text, images, videos, audio, and documents in the same vector space. • **Claude Code** enables rapid development by building entire RAG pipelines from natural language prompts in minutes rather than days. • **Practical applications** include instruction manual chatbots with image retrieval and visual similarity search for industries like roofing, with the key limitation being the need for good metadata descriptions for non-text media.

## Summary

Google's Gemini Embeddings 2 represents a breakthrough in multimodal AI by being the first natively multimodal embedding model that can process text, images, videos, audio, and documents in a unified vector space. This enables **multimodal databases** where different media types can be queried together, with the AI understanding nuanced relationships between them.

Claude Code dramatically accelerates development by allowing developers to describe desired RAG systems in natural language. The video demonstrates building two complete applications: a **68-page PDF instruction manual chatbot** that retrieves both text instructions and corresponding diagrams, and a **roofing project search system** that finds visually similar past projects with metadata like cost and team size. Both were built in under 30 minutes

- work that previously took days with traditional tools.

### Technical Implementation

The workflow involves three key components: **Pinecone** for vector storage, **Gemini Embeddings 2** for creating embeddings, and **OpenRouter** (or alternatives) for accessing various AI models. Claude Code handles the complex orchestration, automatically setting up the ingestion pipeline, creating the vector database, and building the front-end interface.

### Current Limitations and Best Practices

While powerful, the system has limitations: videos must be under 120 seconds (MP4 or MOV), and images have format restrictions. More importantly, **metadata quality is critical** - non-text media requires good descriptions since the system stores text descriptions alongside embeddings rather than the actual media files. The video demonstrates updating a video description to "cartoon golden retriever playing guitar in front of a fireplace" to enable accurate retrieval.

The combination of these tools shifts development focus from technical configuration to **clear communication and process understanding**, making multimodal RAG accessible to developers who understand their domain rather than just vector database technicalities.

## Context

This matters because multimodal RAG (Retrieval-Augmented Generation) represents the next evolution in AI applications, moving beyond text-only systems to handle real-world data that includes images, videos, and audio. Developers, product builders, and companies in industries like manufacturing, construction, education, and customer service can leverage these tools to create intelligent systems that understand and work with diverse media types. The rapid development capability democratizes access to advanced AI systems that previously required specialized expertise in vector databases and complex pipelines.
---
metadata:
  videoId: "rMADSuus6jg"
  title: "Beyond RAG - A system that understands your documents"
  description: "In this video we will look at file search exploration as a potential replacement to RAG. This is built on top of the the fs-explorer from llamaIndex.\ 


    LINK to the Repo: https://github.com/PromtEngineer/agentic-file-search


    My voice to text App: whryte.com

    Website: https://engineerprompt.ai/

    RAG Beyond Basics Course:

    https://prompt-s-site.thinkific.com/courses/rag

    Signup for Newsletter, localgpt:

    https://tally.so/r/3y9bb0


    Let's Connect:\ 

    🦾 Discord: https://discord.com/invite/t4eYQRUcXB

    ☕ Buy me a Coffee: https://ko-fi.com/promptengineering

    |🔴 Patreon: https://www.patreon.com/PromptEngineering

    💼Consulting: https://calendly.com/engineerprompt/consulting-call

    📧 Business Contact: engineerprompt@gmail.com

    Become Member: http://tinyurl.com/y5h28s6h


    💻 Pre-configured localGPT VM: https://bit.ly/localGPT (use Code: PromptEngineering for 50% off). \ 


    Signup for Newsletter, localgpt:

    https://tally.so/r/3y9bb0"
  channel: "Prompt Engineering"
  channelId: "UCDq7SjbgRKty5TgGafW8Clg"
  duration: "PT18M53S"
  publishedAt: "2026-01-11T14:01:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/rMADSuus6jg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=rMADSuus6jg"
processedAt: "2026-01-12T14:25:03.280Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Agentic File Search moves beyond traditional RAG by using a three-phase strategy—Parallel Scan, Deep Dive, and Backtrack—to navigate document hierarchies. Unlike fixed embeddings that lose context through chunking, this system uses Gemini Flash and Llama Index to follow logical cross-references, making it ideal for complex legal or technical analysis where structural integrity is vital."
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3874
  outputTokens: 930
  totalTokens: 5687
  processingTimeMs: 12072
tools:
  - name: "agentic-file-search"
    url: "https://github.com/PromtEngineer/agentic-file-search"
  - name: "llamaIndex"
    url: null
  - name: "Dockling"
    url: null
  - name: "whryte"
    url: "https://whryte.com"
  - name: "Gemini 1.5 Flash"
    url: null
  - name: "localGPT"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "agents"
  - "architecture"
  - "embeddings"
  - "llm"
  - "rag"
tagsNormalizedAt: "2026-03-01T21:19:30.534Z"
---

## Key Takeaways

Agentic file search solves the context loss inherent in standard RAG by treating documents as structured entities rather than flat, disconnected text chunks.

* **Dynamic Reasoning vs. Pattern Matching**: While standard RAG uses fixed embeddings to find similar text, agentic search uses LLM-driven tools to **navigate documents** based on the specific intent of the query.

* **The Three-Phase Workflow**: The system operates through **Parallel Scanning** (quick previews), **Deep Diving** (parsing full content), and **Backtracking** (following references discovered during reading).

* **Local Processing with Dockling**: By using **Dockling** for local parsing and markdown conversion, the system maintains document structure without relying on external extraction APIs.

* **Structure-Aware Retrieval**: The agent is programmed to recognize phrases like "see Exhibit B," allowing it to retrieve documents that semantic similarity alone would have missed.

## Summary

The core critique of traditional **Retrieval-Augmented Generation (RAG)** is that it destroys document hierarchy. When files are split into 500-token chunks, the relationship between sections—such as a contract clause and its corresponding schedule—is severed. Traditional RAG relies on **semantic similarity**, which often fails when the answer requires following a chain of logical cross-references across multiple documents. 

### The Agentic Alternative
To solve this, the video introduces an **Agentic File Search** system built with **Llama Index**. Instead of pre-computing embeddings and retrieving fixed chunks, the agent acts like a human researcher. It follows a **three-phase strategy** to ensure no context is lost:

* **Phase 1: Parallel Scan**: The system scans an entire folder in parallel, pulling the first 1,500 characters of every file. This allows the agent to build a mental map of the corpus and categorize which files are likely relevant.

* **Phase 2: Deep Dive**: Based on the initial scan, the agent selects specific files for full parsing using **Dockling**. This converts PDFs, Word docs, and Power

Points into clean markdown for the LLM to process.

* **Phase 3: Backtrack**: As the agent reads, it looks for explicit mentions of other documents (e.g., "refer to Section 4.2 in the Appendix"). If those documents were previously skipped, the agent intelligently backtracks to retrieve them.

### Technical Architecture
The system uses **Gemini 1.5 Flash** (referenced as Gemini 3 Flash in the transcript) to drive decision-making via **structured JSON outputs**. This eliminates the common issue of LLM parsing failures by forcing the model to follow a strict schema. The agent is equipped with six primary tools: **Scan Folder**, **Preview File**, **Parse File**, **Read**, **Grep** (for regex patterns), and **Glob** (for file patterns). 

### Practical Applications and Trade-offs
This method is significantly more powerful for complex tasks, such as analyzing acquisition data or legal filings. In a demo, the system successfully answered a complex question about employee benefits by identifying and reading four separate, cross-referenced documents. However, this accuracy comes at the cost of **higher latency** and **increased token usage**. It is not intended for real-time chatbots but rather for high-stakes analytical tasks where precision is more important than speed.

## Context

As the AI industry moves from simple 'Chat with your PDF' apps to sophisticated 'Agentic Workflows,' the limitations of first-generation RAG are becoming a bottleneck. Traditional RAG is often insufficient for legal, financial, and technical industries where documents are highly interconnected and non-linear. This system represents a shift toward 'Agentic Information Retrieval,' where LLMs are given the agency to browse, search, and reason through file systems dynamically. It connects to the broader trend of using long-context models and specialized tool-calling to solve 'lost-in-the-middle' problems and context fragmentation in enterprise data.

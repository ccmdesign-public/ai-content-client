---
metadata:
  videoId: "tSRqTerZrH8"
  title: "[State of Context Engineering] Agentic RAG, Context Rot, MCP, Subagents — Nina Lopatina, Contextual"
  description: "From neuroscience PhD research on reward learning and decision making to building the infrastructure for *context engineering at scale,* *Nina Lopatina* has spent the last year watching a brand-new category emerge from prototype to production—and now she's leading the charge to turn context engineering from a collection of design patterns into a *full-stack discipline* with benchmarks, tooling, and real-world deployment at enterprise scale. We caught up with Nina live at *NeurIPS 2025* (her fifth!) to dig into the state of context engineering heading into 2026: why this year felt like *six months compressed into a year* (the category only really took hold in mid-2024), how *agentic RAG is now the baseline* (query reformulation into subqueries improved performance so dramatically it became the new standard), why *context rot is cited in every blog* but industry benchmarks at real scale (100k+ documents, billions of tokens) are still rare, how *MCP is both a driver and a flaw* for context engineering (giant JSON tool definitions stuff the context window, but MCP servers unlock rapid prototyping before you optimize down to direct API calls), the rise of *sub-agents with turn limits and explicit constraints* (unlimited agency degrades performance and causes hallucinations), why *instruction-following re-rankers* are critical for scaling retrieval across massive databases (more recall up front, more precision in the final context window), how *benchmarks are being saturated faster than ever* (Claude Code just saturated a Princeton benchmark released in October, with solutions so good the gold dataset had errors), the *KV cache decision-making framework* for multi-turn agents (stuff that doesn't change goes up front, stuff that changes a lot goes at the bottom), why she's *embodied-evaling frontier models as a snowboarding coach* (training for a 25-lap mogul race over 3–4 months, and why she had to close the window and restart because the model lost training context), and her thesis that 2026 will be the year context engineering moves from *component-level innovation to full-system design patterns*—where the conversation shifts from \"how do I optimize my re-ranker\" to \"what does the end-to-end architecture look like for reasoning over billions of tokens in production?\"

    We discuss:


    * What Contextual does: *end-to-end platform for context engineering across domains* (code, legal, retail, e-commerce, support), with multimodal ingestion, hybrid search, re-rankers, and dynamic agents

    * The *first instruction-following re-ranker* (launched March 2024): latency is the biggest complaint, but for dynamic agents (where latency is less sensitive), it's a game-changer for reasoning over large databases

    * Why *agentic RAG is now the baseline:* query reformulation into subqueries improved performance so dramatically it became the new standard (normal RAG is dead)

    * The *context engineering hackathon* (Retail Universe, ~100k documents, PDFs/CSVs/logs): Nina's team used a dynamic agent with turn limits and explicit constraints to avoid infinite sub-agent loops

    * *Context rot:* everyone cites it, but Anthropic's work putting numbers on it (e.g., at 700k tokens in a 1M context window, retrieval drops to 30%) is what made it actionable

    * *Sub-agents with turn limits:* unlimited agency degrades performance and causes hallucinations, so explicit constraints (turn limits, validation loops) are critical for scale

    * The need for *industry benchmarks at real scale:* most benchmarks use toy datasets, but the Retail Universe hackathon dataset (100k+ documents, billions of tokens) is closer to production reality

    * *KV cache decision-making:* stuff that doesn't change (system prompt, early turns) goes up front, stuff that changes a lot (recent turns, dynamic context) goes at the bottom—critical for multi-turn agents

    * Why *intentional context compression* matters: models aren't great at compaction yet, so Nina proactively limits turns (even in Cursor, she opens a new window mid-conversation to avoid context loss)


    —

    Nina Lopatina


    * Contextual AI: https://contextual.ai

    * X: https://x.com/ninalopatina

    * LinkedIn: https://linkedin.com/in/ninalopatina


    00:00:00 Introduction: Nina Lopatina on Context Engineering at NeurIPS

    00:04:34 The Death of Normal RAG: Rise of Agentic RAG and Query Reformulation

    00:06:20 Sub-Agents and Turn Limits: Lessons from the Retail Universe Hackathon

    00:09:07 Context Engineering in 2024: Design Patterns and the Prototyping Stage

    00:10:17 Benchmarks and Scale: From Princeton HOW to Saturated Research Tasks

    00:12:52 Context Rot, MCP, and Tool Selection Challenges

    00:17:28 Prompt Optimization: Jeppa, ACE, and Evolutionary Approaches

    00:19:42 KV Cache Strategy and Multi-Turn Agent Stability

    00:22:30 Domain Generalization: Code, Legal, Retail, and Beyond

    00:23:59 Predictions and Full System Design: The Future of Context Engineering"
  channel: "Latent Space"
  channelId: "UCxBcwypKK-W3GHd_RZ9FZrQ"
  duration: "PT26M48S"
  publishedAt: "2025-12-31T15:59:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/tSRqTerZrH8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=tSRqTerZrH8"
processedAt: "2026-01-01T23:34:28.257Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Success in AI now requires shifting from prompt engineering to context engineering, using agentic workflows and standardized protocols to combat context rot and maximize signal-to-noise ratios."
ai:
  provider: "unknown"
  model: "gemini-3-flash-preview"
  apiCalls: 0
  fallbackAttempts: 0
  processingTimeMs: 0
tools:
  - name: "Claude Code"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "Contextual"
    url: "https://contextual.ai"
  - name: "Jeppa"
    url: null
  - name: "ACE"
    url: null
  - name: "Cursor"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - rag
  - agents
  - llm
  - prompt-engineering
  - architecture
  - embeddings
---

In this discussion, Nina Lopatina from Contextual AI outlines the transition from traditional Retrieval-Augmented Generation (RAG) to the more sophisticated discipline of "Context Engineering." As large language models (LLMs) evolve, the bottleneck has shifted from model intelligence to the quality and relevance of the data provided in the prompt.

**The Rise of Context Engineering**
Context engineering is the practice of architecting the data pipeline so that an LLM receives the most relevant, high-density information possible. Lopatina argues that the industry is moving past "naive RAG"—where a simple vector search returns the top-k results—toward a system where the model actively manages its own information environment. This involves sophisticated retrieval, re-ranking, and the ability to filter out "noise" that leads to hallucinations.

**Understanding Context Rot**
A central challenge identified is "Context Rot." This occurs when a system’s context window becomes cluttered with outdated, redundant, or contradictory information over time. As agents perform long-running tasks, they may accumulate "cruft" in their history that confuses the model. Solving context rot requires:
*   **Active Pruning:** Identifying and removing low-utility information from the context.
*   **Dynamic Re-ranking:** Constantly re-evaluating which pieces of data are most relevant to the current step of a multi-turn task.
*   **Summarization Layers:** Compressing previous interactions into high-level insights rather than keeping raw logs.

**Agentic RAG and Subagents**
Lopatina explains that RAG is becoming "agentic." In this paradigm, the model doesn’t just respond to a query; it plans a research strategy. 
*   **Subagents:** Instead of one monolithic agent trying to do everything, the trend is toward specialized subagents (e.g., a "Search Agent," a "Verification Agent," and a "Writer Agent"). This modularity prevents the "Jack of all trades, master of none" problem in long-context models.
*   **Reasoning Loops:** Agentic RAG uses "Chain of Thought" to decide if the current retrieved data is sufficient or if it needs to perform another search, effectively making the model a librarian rather than just a reader.

**The Model Context Protocol (MCP)**
The discussion highlights the importance of Anthropic’s Model Context Protocol (MCP). MCP acts as a standardized "USB port" for data, allowing AI models to connect seamlessly to various data sources (Google Drive, Slack, GitHub, local databases) without building custom integrations for every tool.
*   **Interoperability:** MCP reduces the engineering overhead of context engineering, allowing developers to focus on the logic of the agent rather than the plumbing of the data connectors.
*   **Future Impact:** Standardized protocols will enable a "plug-and-play" ecosystem where agents can be dropped into any corporate environment and immediately understand the local context.

**Actionable Insights for Developers**
1.  **Prioritize Signal-to-Noise:** More context is not always better. Models perform better with 5 highly relevant chunks than 50 mediocre ones.
2.  **Use Specialized Models:** Small, fine-tuned models often outperform large models at specific context engineering tasks like re-ranking or data extraction.
3.  **Implement Feedback Loops:** Use "Agentic RAG" to let the model critique its own retrieved results. If the retrieved context doesn’t answer the prompt, the agent should have the agency to re-query.
4.  **Adopt Standards:** Start integrating MCP or similar protocols early to ensure your AI stack remains modular and can easily ingest new data streams as they become available.

**Conclusion**
The "State of Context Engineering" suggests that the "G" in RAG (Generation) is largely solved by frontier models. The real competitive advantage now lies in the "R" (Retrieval) and the "A" (Augmentation). The future of AI is not just about smarter models, but about smarter ways of feeding those models the right information at the right time.

---
metadata:
  videoId: "OLEjyBLo8sQ"
  title: "This Startup Beat Gemini 3 on ARC-AGI — at Half the Cost"
  description: "Poetiq is a new startup founded by former DeepMind researchers that recently achieved a major jump on the ARC-AGI benchmark by layering a recursive self-improvement system on top of Gemini 3. In this conversation at NeurIPS, YC's Francois Chaubaurd sat down with Poetiq co-founder Ian Fisher to find out how they're increasing performance using prompts and system design alone. They also explore recursive self-improvement, benchmarking progress toward AGI, and why automating prompt engineering may be one of the most powerful levers in AI today.


    Chapters

    00:11 — Introducing Poetiq and the ARC-AGI Breakthrough

    00:49 — How Big Is the Performance Jump?

    01:18 — Ian Fisher’s Background: YC, Google, DeepMind

    02:00 — Recursive Self-Improvement Explained

    03:00 — Why Poetiq Targeted ARC-AGI

    03:58 — Improving Models Without Access to Weights

    04:26 — Ensembles, Voting, and System-Level Optimization

    05:30 — Why Gemini 3 Changed Everything

    06:21 — What’s Next: Benchmarks, Research, and Customers

    07:14 — Is Recursive Self-Improvement a Path to AGI?

    08:46 — When to Stop Hill-Climbing

    09:16 — Automating Prompt Engineers and Agents"
  channel: "YC Root Access"
  channelId: "UCxIJaCMEptJjxmmQgGFsnCg"
  duration: "PT11M24S"
  publishedAt: "2026-01-29T15:00:45Z"
  thumbnailUrl: "https://i.ytimg.com/vi/OLEjyBLo8sQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=OLEjyBLo8sQ"
processedAt: "2026-02-23T14:18:39.341Z"
source: "youtube"
tldr: "Poetic, a six-person startup founded by ex-DeepMind researchers, achieved state-of-the-art on the ARC-AGI benchmark with a 54% score using their recursive self-improvement system on top of Gemini 3, beating Gemini 3 Deep Think by 9 points at half the cost."
tools:
  - name: "Gemini 3"
    url: null
  - name: "DSPy"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agi"
  - "recursive-self-improvement"
  - "prompt-engineering"
  - "ai-benchmarks"
  - "startup"
  - "deepmind"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8848
  outputTokens: 907
  totalTokens: 9755
  processingTimeMs: 58182
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

Poetic demonstrates a major leap in AI problem-solving through automated prompt engineering. Their key insights are:

*   **Recursive self-improvement** enables AI systems to make themselves smarter by optimizing prompts and ensembles on evaluatable tasks, a potential path toward AGI.

*   **Cost-effective performance:** Their system scored 54% on ARC-AGI 2, outperforming Google's Gemini 3 Deep Think (45%) while being **half the cost**.

*   **Model-agnostic approach:** The technique works across leading models, showing similar results when swapping Gemini 3 for Anthropic's Opus, indicating the value is in their optimization system, not just the base model.

## Summary

Poetic, founded in June 2026 by a team of mostly ex-DeepMind researchers, has announced a groundbreaking result on the challenging ARC-AGI benchmark. By applying their recursive self-improvement system on top of Google's Gemini 3 model, they achieved a 54% score on the ARC-AGI 2 private test set. This represents a significant jump from Gemini 3's reported ~31% and, more notably, a 9-percentage-point improvement over the more advanced and expensive **Gemini 3 Deep Think**, which scored 45% but costs twice as much.

The core of Poetic's technology is an **automated system for recursive self-improvement (RSI)**. Since they don't have access to the underlying model weights, their 'action space' is limited to optimizing the prompt and the system architecture around it. Their solution involves creating an **ensemble** where multiple independent calls to a base model (like Gemini 3) are made, each refining its own answer. These are then combined with a sophisticated voting scheme.

This system was originally designed and trained on the easier ARC-AGI 1 benchmark, where it reached 95% with Gemini 3. When applied 'zero-shot' to the much harder ARC-AGI 2, the performance was a 'holy cow' moment for the team. They attribute part of the success to Gemini 3's inherent strength at coding for visual problem-solving, but emphasize that their optimization method provides a consistent 'bump' in performance. The system is model-agnostic, delivering similar high-quality results when Gemini 3 is replaced with Anthropic's Opus 4.5.

Looking forward, the six-person team plans to target other high-impact benchmarks and begin working with enterprise customers to solve real business problems. They frame their technology as a 'power tool' that automates the work of prompt engineers and agent builders, moving from manually constructing solutions to having a factory that builds them. While they stopped the hill-climbing optimization on ARC-AGI due to cost, they believe the performance could improve further with more resources, underscoring the scalable nature of their approach.

## Context

The ARC-AGI (Abstraction and Reasoning Corpus for Artificial General Intelligence) benchmark is designed to test an AI system's ability to learn and apply new concepts from few examples, a core challenge on the path to more general intelligence. Poetic's result is significant because it demonstrates that sophisticated **prompt and system optimization**—applied on top of existing powerful models—can yield dramatic improvements in capability and cost-efficiency. This highlights a shift from solely scaling model size to developing 'meta' systems that can recursively improve how models are used. It matters to AI researchers, startups competing with large labs, and businesses looking to maximize the value of expensive AI API calls.
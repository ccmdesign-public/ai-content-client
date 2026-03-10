---
metadata:
  videoId: "rncxz2XROUg"
  title: "Gemini 3.1 Pro is the smartest model ever made"
  description: "Gemini 3.1 is really good, and also really bad. It's weird...


    Thank you Kernel for sponsoring! Check them out at: https://soydev.link/kernel


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT24M46S"
  publishedAt: "2026-02-21T20:59:27Z"
  thumbnailUrl: "https://i.ytimg.com/vi/rncxz2XROUg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=rncxz2XROUg"
processedAt: "2026-03-10T15:20:31.302Z"
source: "youtube"
tldr: "Google's Gemini 3.1 Pro sets new benchmark records for intelligence and knowledge, scoring 4 points higher than Opus 4.6 Max at less than half the cost, but suffers from severe usability issues, unreliable tool calling, and poor agentic performance that makes it frustrating for practical tasks."
tools:
  - name: "Gemini 3.1 Pro"
    url: null
  - name: "Cursor"
    url: null
  - name: "Kernel"
    url: "soyb.link/kernel"
  - name: "Convex"
    url: null
  - name: "T3 Chat"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "gemini"
  - "llm"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 21474
  outputTokens: 860
  totalTokens: 22334
  processingTimeMs: 42895
tagsNormalizedAt: "2026-03-10T16:46:43.746Z"
---

## Key Takeaways

The video presents a stark contrast between Gemini 3.1 Pro's raw intelligence and its practical shortcomings.

*   **Record-breaking intelligence**: Scores highest on multiple benchmarks (AI Index, Skate Bench, Omniscience) with a 78% on ARC AGI 2 and 100% on Skate Bench, while costing ~$892 vs. Opus 4.6's ~$2500.

*   **Severe usability flaws**: The model is plagued by unreliable **tool calling**, getting stuck in loops, failing at basic file edits, and the official CLI is buggy and unusable.

*   **Agentic weakness**: It performs poorly on long, complex agentic tasks (Meter Eval) compared to Opus 4.6 and GPT 5.2/5.3, as Google seems focused on **benchmark maximization** over real-world performance.

## Summary

Google's Gemini 3.1 Pro is a paradox: an incredibly intelligent model that's frustratingly incompetent in practice. On paper, it dominates. It scored 4 points higher than any previous model on the Artificial Intelligence Index and achieved a remarkable 78% on the challenging ARC AGI 2 benchmark. It also achieved a perfect 100% on the creator's custom Skate Bench, demonstrating exceptional spatial and niche knowledge. Furthermore, it excels at knowledge recall with low hallucination rates, as shown on the Omniscience benchmark.

However, this raw intelligence doesn't translate to a good user experience. The model is notoriously bad at **tool calling**, frequently using tools incorrectly, not using them at all, or massively overusing them. This makes it unreliable for agentic workflows. The official Gemini CLI is described as "legitimately unusable," being buggy, randomly switching models, and lacking features like a plan mode.

This creates a jarring contrast. While it knows more than any other model and can produce stunning UI designs or complex SVG animations, it constantly fails at basic, practical coding tasks. It gets stuck in loops, hallucinates non-existent packages, and requires constant supervision. The creator argues that while other labs (like Anthropic and OpenAI) use reinforcement learning from user interactions to improve **agentic competence**, Google seems solely focused on "benchmaxing"—optimizing for benchmark scores at the expense of usability.

The video concludes that for raw knowledge questions, Gemini 3.1 Pro is unparalleled. But for any practical, tool-using, or long-running task, more consistent models like Claude's Sonnet/Haiku or OpenAI's GPT 5.3 are still the superior choice.

## Context

This review is critical for developers, AI practitioners, and product teams evaluating which large language model to integrate into their workflows. The AI landscape is shifting from pure knowledge benchmarks to practical usability and agentic capability. Google's release highlights a potential misalignment in the industry: creating models that score well on tests but fail in real-world applications, while competitors like Anthropic focus on reliability and tool-use consistency. This matters for anyone building AI-powered tools where cost, reliability, and the ability to complete multi-step tasks are paramount.
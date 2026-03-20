---
metadata:
  videoId: "_k22WAEAfpE"
  title: "Anthropic is lying to us."
  description: "According to Anthropic DeepSeek, Moonshot (Kimi), and MiniMax have been using Claude to train their models.\ 


    Thank you WorkOS for sponsoring! Check them out at: https://soydev.link/workos


    SOURCES

    https://x.com/AnthropicAI/status/2025997928242811253

    https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks

    https://www.npr.org/2025/09/05/nx-s1-5529404/anthropic-settlement-authors-copyright-ai


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT31M53S"
  publishedAt: "2026-02-24T07:34:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/_k22WAEAfpE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=_k22WAEAfpE"
processedAt: "2026-03-10T15:18:03.177Z"
source: "youtube"
tldr: "Theo, a prominent AI critic, argues that Anthropic's claims that Chinese AI labs (DeepSeek, Moonshot, Miniax) are conducting large-scale 'distillation attacks' to steal model capabilities are exaggerated, misleading, and likely driven by competitive fear rather than genuine security concerns, citing trivial data volumes and legitimate use cases."
tools:
  - name: "T3 Chat"
    url: null
  - name: "Cursor"
    url: null
  - name: "Claude"
    url: null
  - name: "Opus"
    url: null
  - name: "Sonnet"
    url: null
  - name: "DeepSeek"
    url: null
  - name: "DeepSeek R1"
    url: null
  - name: "GPT-5"
    url: null
  - name: "Gemini"
    url: null
  - name: "Gemini 3.1 Pro"
    url: null
  - name: "Gemma"
    url: null
  - name: "Grok"
    url: null
  - name: "Kimi"
    url: null
  - name: "PostHog"
    url: null
  - name: "Work OS"
    url: "https://swive.link/works"
categories:
  - "AI & Machine Learning"
  - "Security"
tags:
  - "ai-general"
  - "chatgpt"
  - "claude"
  - "llm"
  - "model-training"
  - "security-general"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 24580
  outputTokens: 1781
  totalTokens: 26361
  processingTimeMs: 60514
tagsNormalizedAt: "2026-03-10T16:45:43.610Z"
---

## Key Takeaways

Theo, a developer and creator of T3 Chat, analyzes Anthropic's public accusations against Chinese AI labs, concluding they are largely dishonest and driven by competitive anxiety.

*   **Anthropic's 'distillation attack' claims are exaggerated.** The reported data volumes (e.g., 150k exchanges for DeepSeek) are trivial, comparable to a single day's traffic on Theo's own T3 Chat app or a few benchmark runs.

*   **The numbers are misleading due to 'exchange' definition.** In agentic workflows, a single user request can generate dozens of API exchanges (due to tool calls), making the cited millions of exchanges easily explainable by legitimate product usage.

*   **Anthropic is likely weaponizing politics against competitors.** Naming DeepSeek first despite the smallest alleged data volume suggests the goal is to stoke fear against a top competitor, not report a genuine threat.

*   **The safety argument is logically flawed.** The claim that distilled models lose safety safeguards but retain dangerous capabilities doesn't hold; if the original model refuses certain tasks, that refusal data would also be in the training set.

*   **Legitimate use cases explain the traffic.** Companies like Miniax had products that legally offered Anthropic's models to users, and labs need to benchmark against competitors, both of which generate significant API traffic.

*   **Anthropic has a history of false accusations.** The company has previously made similar, unsubstantiated claims against other labs (Wind Surf, xAI, OpenAI), damaging its credibility in what Theo calls a 'boy who cried wolf' scenario.

## Summary

### Introduction and Initial Claims

Theo opens by addressing Anthropic's recent public report accusing three major Chinese AI labs—DeepSeek, Moonshot (creators of Kimi), and Miniax—of conducting 'distillation attacks.' Anthropic defines this as using thousands of fraudulent accounts to generate millions of exchanges with Claude models to extract capabilities, remove safety safeguards, and potentially feed them into military or surveillance systems. Theo, while acknowledging he is often critical of Anthropic, states the claims warrant serious examination, both for their legitimacy and their potential implications.

### Understanding Distillation and Anthropic's Unique Position

The video explains that **model distillation** is a common technique where outputs from a smarter, more expensive model are used to train a smaller, cheaper model to exhibit similar behaviors. Theo notes that while Anthropic claims distillation can be legitimate, they've coined the novel term 'distillation attack' for this context. A key point is that unlike OpenAI (O1), Google (Gemini), and xAI (Grok), **Anthropic does not obfuscate the reasoning traces** of its models. This makes Claude's outputs more valuable for distillation, as they provide the full 'chain-of-thought' data, which is ideal for training. Theo uses **Cursor** as an example of a company that likely uses paid API data from models like Claude Opus to train its own cheaper, internal models—a practice he suggests is widespread and economically rational.

### Deconstructing Anthropic's Specific Accusations and Data

The core of Theo's rebuttal focuses on the data Anthropic presents. He finds the volumes cited to be 'pathetic' and easily explainable by normal operations.

*   **DeepSeek's 150,000 Exchanges:** Theo reveals that his own product, **T3 Chat**, handles about **160,000 user requests per day** (which translate to even more LLM provider 'exchanges'). He argues that 150k exchanges is what you might get from 'two to three runs of a benchmark like SWE-bench,' making it a trivial amount for a lab to use for basic benchmarking or research.

*   **Minyax's 13 Million and Moonshot's 3.4 Million Exchanges:** Theo explains that the term 'exchange' is misleading. In an agentic workflow with **tool calls** (e.g., searching, reading files, editing code), a single user prompt can trigger dozens of separate API calls ('exchanges'). Therefore, millions of exchanges could represent a relatively modest amount of actual user activity on a product that legitimately offers Claude as an option. He notes Miniax had such a product.

*   **The Safety Argument:** Theo strongly critiques Anthropic's claim that illicitly distilled models pose a national security risk because they lose safety safeguards. He calls this logically incoherent: 'If they have the safety guards in place... there's no way to get the data out.' He argues you cannot train a model to be both more capable at dangerous tasks and less safe using only the refusal data from a safe model.

*   **The 'Expert Data Analyst' Prompt:** Anthropic provided an example of a repetitive, task-specific prompt used in the attacks. Theo points out this prompt maps almost perfectly to the type of system prompt a research or data analysis product would use, further supporting the idea that this was legitimate product traffic, not malicious distillation.

### Context, Motives, and Conclusion

Theo acknowledges that 'commercial proxy services' in China likely resell access to Claude via networks of accounts, which could be used to hide some traffic. However, he draws a sharp distinction between this gray-market activity and the named labs conducting state-sponsored attacks. He believes the labs wanted access for legitimate reasons: benchmarking, product offerings, and verifying research. Anthropic's ban on Chinese access creates the market for these proxies.

He concludes that Anthropic's report is a deliberate attempt to 'weaponize' political and industry sentiment against its most feared competitors, particularly DeepSeek, which is rumored to have a formidable next-generation model. Theo highlights Anthropic's history of what he considers false accusations against other labs and their lack of open-weight model releases as further context for their defensive, closed stance. He ends with a challenge to Anthropic to provide him with private, verifiable proof of their claims, offering to retract his video if proven wrong, but asserts that based on the public evidence, 'Anthropic is lying to us.'

## Context

Theo (t3.gg) is a well-known software developer, creator of the T3 Stack, and commentator on the tech and AI industry. He is openly critical of several major AI labs, particularly Anthropic, and often analyzes their business and technical claims from a developer's perspective. This video contributes to the ongoing, high-stakes conversation about AI competition, intellectual property, safety, and the geopolitical tensions between US and Chinese tech companies. It is highly relevant as AI capabilities accelerate and companies seek competitive and regulatory advantages. The video is essential viewing for developers, AI researchers, startup founders, and anyone interested in the business and politics of frontier AI, as it deconstructs a major corporate narrative with first-hand data and technical reasoning.
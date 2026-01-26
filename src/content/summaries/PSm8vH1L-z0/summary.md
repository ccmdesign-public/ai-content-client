---
metadata:
  videoId: "PSm8vH1L-z0"
  title: "We Tested 20 Coding AIs: Top Winners Inside"
  description: "We spent $10,000+ testing 20 coding LLMs on real enterprise codebases. Haiku 4.5 destroyed the competition—but the results might surprise you.

    In this deep-dive, Brokk founder Jonathan Ellis (Apache Cassandra creator, DataStax co-founder) and Developer Advocate Dylan Turnbull reveal the December 2024 Brokk Power Rankings—the only LLM benchmark testing FRESH code that hasn't contaminated training data.


    🏆 KEY FINDINGS:

    Haiku 4.5 claims S-tier alone (fastest + smartest above 45%)Gemini 3 Pro disappoints in C-tier despite hypeGrok Code Fast 1 dominates budget categoryGPT-5 Mini outperforms Sonnet 4.5 (controversial)Open source models catching up fast (6-month gap)📊 WHAT MAKES THIS DIFFERENT: Unlike SWE-bench, we test: ✅ Fresh, uncontaminated problems from real repos ✅ Multi-file, enterprise-scale tasks ✅ Speed + Cost + Intelligence (not just pass/fail)


    ⏱️ TIMESTAMPS: 0:00 - Why existing benchmarks fail 4:07 - S-Tier: Haiku 4.5 dominance explained 15:08 - Gemini 3 Pro's shocking failure 18:50 - Budget winners: Grok Code Fast 1 22:37 - Open source vs closed models 32:33 - Speed: The final frontier"
  channel: "Brokk AI"
  channelId: "UCdQsictbnd4O9ZxwRsa4h7w"
  duration: "PT38M27S"
  publishedAt: "2026-01-08T21:00:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/PSm8vH1L-z0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=PSm8vH1L-z0"
processedAt: "2026-01-12T14:23:39.024Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "The Brokk Power Ranking identifies Claude Haiku 45 as the sole S-tier coding AI due to its superior speed and 'good enough' intelligence, while exposing widespread benchmark poisoning in models like Gemini 3 Pro and various open-source contenders. The ranking prioritizes a 45% intelligence threshold, speed for maintaining developer flow, and cost-effectiveness over raw pass rates."
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8864
  outputTokens: 1409
  totalTokens: 11303
  processingTimeMs: 26526
tools:
  - name: "Claude Haiku 45"
    url: null
  - name: "Gemini 3 Pro"
    url: null
  - name: "Grok Code Fast 1"
    url: null
  - name: "GPT-5 Mini"
    url: null
  - name: "Claude 4.5 Opus"
    url: null
  - name: "Claude 4.5 Sonnet"
    url: null
  - name: "GPT-5.1"
    url: null
  - name: "GLM-4-6"
    url: null
  - name: "DeepSeek 3.2"
    url: null
  - name: "GPT-OSS 120B"
    url: null
  - name: "Brokk AI"
    url: null
  - name: "SWE-bench"
    url: null
  - name: "LiveCodeBench"
    url: null
  - name: "Apache Cassandra"
    url: null
  - name: "Lucene"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - llm
  - claude
  - gemini
  - chatgpt
  - ai-coding
  - testing
  - best-practices
---

## Key Takeaways

Brokk AI leadership presents a comprehensive evaluation of the coding AI landscape, focusing on metrics that matter to professional developers: intelligence, speed, and cost. Their methodology uses fresh, 'unseen' enterprise-level tasks to bypass the data poisoning common in standard benchmarks.

* **Claude Haiku 45** is the current market leader (S-tier) because it offers high speed and sufficient intelligence (over 45% success rate) to function without constant hand-holding.

* **Benchmark Poisoning** is a significant industry issue; models like Kimmy and Minimax, which rank high on public leaderboards, failed to replicate performance on Brokk’s fresh, multi-file test suite.

* The **Pareto Frontier** of coding models is currently defined by Grok Codefast 1 (budget/speed), GPT-5 Mini (value intelligence), and Claude 4.5 Opus (maximum reasoning).

* **Gemini 3 Pro** performed poorly (C-tier), frequently getting stuck in 'reasoning loops' that burned tokens without producing successful code solutions.

* **Open-source models** like GLM-4-6 and Deep

Seek 3.2 are rapidly closing the gap, currently trailing top-tier closed models by only about three to six months in performance.

## Summary

### The Genesis of the Brokk Power Ranking

Jonathan and Dylan from Brokk AI introduce the **Brokk Power Ranking**, a specialized evaluation framework designed to address the flaws in existing benchmarks like **SWE-bench** or **Live

Code

Bench**. The primary issue identified is **benchmark poisoning**, where AI labs include test cases in the training data of their models, resulting in 'memorization' rather than true problem-solving. To combat this, Brokk uses a proprietary, open-source test harness consisting of meaty, multi-file 'enterprisy' problems derived from fresh commits in major Java repositories like **Apache Cassandra**, **Lucene**, and **Lang

Chain4j**. 

The ranking methodology moves beyond the 'naive pass rate' by focusing on three pillars: **Intelligence**, **Speed**, and **Cost**. Jonathan argues that for a developer to remain in a 'flow state,' the speed of the model is often more critical than marginal gains in intelligence. Furthermore, the ranking uses a **decaying score credit** system; a model gets full credit for solving a problem on the first try, but the score drops logarithmically for subsequent attempts, penalizing models that waste developer time and token budgets through trial and error.

### The S-Tier Champion and the 45% Threshold

A central insight of the ranking is the **45% Intelligence Threshold**. Jonathan posits that models scoring above 45% are 'smart enough' to handle complex tasks across multiple files without constant developer intervention. Below this line, developers often spend more time fixing the AI's mistakes than they would have spent writing the code manually. 

**Claude Haiku 45** emerged as the sole occupant of the **S-tier**. While models like Claude 4.5 Opus might be slightly more intelligent, Haiku is significantly faster and more cost-effective. The speakers emphasize that Haiku has become the 'go-to weapon' for executing plans generated by larger models because it provides the best balance of speed and reliable output. In contrast, **Claude 4.5 Sonnet** was relegated to the B-tier because it sits in an awkward middle ground—neither as fast as Haiku nor as intelligent as Opus.

### Winners and Losers: Tiers A through C

The A-tier is occupied by models on the **Pareto Frontier**, meaning they offer a specific advantage (lowest cost or highest speed) that cannot be beaten without sacrificing another metric. **GPT-5.1** and **GPT-5 Mini** are highlighted for their high intelligence-to-cost ratio, while **Grok Codefast 1** is praised for its extreme speed and affordability. Grok Codefast 1 has even been integrated as the default model for Brokk's free tier due to its impressive throughput.

One of the most controversial results is the placement of **Gemini 3 Pro** in the C-tier. Despite hype elsewhere, Brokk's testing found it prone to **reasoning loops** where the model repeatedly 'second-guesses' itself and fails to submit a final answer. This behavior results in high token usage with zero output, making it frustrating for professional development. The speakers suggest that while Gemini shows promise, it currently suffers from an inability to reach a 'good enough' conclusion and commit to a solution.

### Open Source and Local Hosting Realities

The discussion concludes with an analysis of the open-weight model landscape. **GLM-4-6** (from Zhipu AI) is currently the top open-source performer, followed by **Deep

Seek 3.2**. The data suggests an approximate six-month lag between the capabilities of top-tier closed models and their open-source counterparts. However, the speakers caution against the current trend of **local hosting** for large coding models. While running a model like **GPT-OSS 120B** locally is technically possible, the hardware requirements—often exceeding $10,000 for specialized GPUs and cooling—make it economically irrational compared to using highly optimized APIs for models like Haiku or GPT-5 Mini.

## Context

The video features Jonathan (CEO/Founder) and Dylan Turnbull (Developer Advocate) from Brokk AI, a platform focused on AI-assisted development tools. This discussion is highly relevant to the developer community as it challenges the marketing claims of major AI labs (OpenAI, Anthropic, Google, XAI) by using real-world, enterprise-grade coding tasks rather than synthetic, memorized tests. This context matters because the 'arms race' of LLMs often prioritizes benchmark scores over actual developer productivity. Professional software engineers, CTOs, and technical leads who are deciding which AI models to integrate into their workflows will benefit most from this analysis. The video provides a framework for evaluating AI not just as a 'chatbot,' but as a functional pair programmer where the cost of time and tokens must be weighed against the accuracy of the code generated.

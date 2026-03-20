---
metadata:
  videoId: "HD5TWE8xD7o"
  title: "gpt-5.4 is really, really good"
  description: "Time to increment the counter.


    Thank you Cognition (Devin) for sponsoring! Check them out at: https://soydev.link/devin


    And for 50% off T3 Chat: https://t3.chat/settings/subscription?discount=LAUNCHWEEK


    SOURCES

    https://x.com/mattshumer_/status/2029620518249508950

    https://openai.com/index/introducing-gpt-5-4/

    https://github.com/cyxzdev/Uncodixfy/tree/main

    https://developers.openai.com/api/docs/guides/prompt-guidance


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT40M21S"
  publishedAt: "2026-03-06T09:55:17Z"
  thumbnailUrl: "https://i.ytimg.com/vi/HD5TWE8xD7o/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=HD5TWE8xD7o"
processedAt: "2026-03-10T15:05:56.224Z"
source: "youtube"
tldr: "GPT-5.4 is a major AI model release that significantly improves coding, reasoning, and tool use while being more steerable and token-efficient, though it lags in UI/design tasks where models like Claude Opus and Gemini still excel."
tools:
  - name: "GPT-5.4"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Codex"
    url: null
  - name: "Devon Review"
    url: "https://devonreview.com"
  - name: "Cursor"
    url: null
  - name: "T3 Chat"
    url: null
  - name: "T3 Code"
    url: null
  - name: "GitHub"
    url: null
  - name: "Next.js"
    url: null
  - name: "Tailwind CSS"
    url: null
  - name: "React"
    url: null
  - name: "Recharts"
    url: null
  - name: "Convex"
    url: null
  - name: "Stockfish"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "ai-coding"
  - "llm"
  - "productivity"
  - "prompt-engineering"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 33495
  outputTokens: 1751
  totalTokens: 35246
  processingTimeMs: 65671
tagsNormalizedAt: "2026-03-10T16:45:55.437Z"
---

## Key Takeaways

Theo provides a comprehensive developer-focused review of GPT-5.4, highlighting its strengths in coding and reasoning while acknowledging persistent weaknesses in front-end design.

*   **GPT-5.4 is a substantial, all-around improvement** over previous models, with better coding, reasoning, token efficiency, and a massive 1M token context window, though it comes with a price increase.

*   **The model is exceptionally steerable** and handles mid-conversation interruptions well, making it ideal for complex, long-running agentic workflows without needing complex orchestration frameworks.

*   **Front-end/UI design remains a significant weakness** for OpenAI models; for visual and design tasks, Claude Opus and Gemini 3 are still considered superior and a generation ahead.

*   **The Codex model line appears to be ending**, as its specialized coding capabilities have been integrated into the GPT-5.4 base model, simplifying the model lineup.

*   **Prompt engineering is more critical than ever**; the model is highly responsive to system prompts and detailed instructions, allowing developers to finely tune its behavior for specific product integrations.

*   **Consider cost vs. capability:** While GPT-5.4 High offers great performance, the Pro version is extremely expensive and often overkill for normal use cases, except for solving exceptionally difficult, novel problems.

## Summary

### Introduction and First Impressions

Theo, a developer with early access, opens by stating GPT-5.4 is "the best AI model ever made" in almost every measurable way, especially for developers. He clarifies he received no payment for coverage, only minimal subsidized API usage, which he offset with a donation. The video then covers a sponsor segment for Devon Review, an AI-powered code review tool that intelligently groups PR changes for better context.

### Model Overview and Capabilities

Theo explains the confusing model lineup: GPT-5.3 Codex and Instant were released, followed by GPT-5.4 Thinking and GPT-5.4 Pro on the same day, with no 5.4 Instant or Codex variant. He suggests this signals the end of the dedicated Codex line, as its coding enhancements are now baked into the base 5.4 model. Key technical improvements include support for 1 million tokens of context (with tiered pricing over 272k), significantly better token efficiency during reasoning, and major enhancements in **computer use** (e.g., using JavaScript for browser automation instead of simulating pixel clicks).

### Performance and Benchmarks

The model shows strong benchmark improvements: it achieves state-of-the-art on SWE-Bench Pro (57.7) and ties with Claude 3.1 Pro Preview on the Artificial Analysis leaderboard. Theo presents his own private Skatebench V2 results, where Gemini 3.1 Pro Preview leads at 97%, followed by GPT-5.4 High (82%), X-High (81%), and Pro (79%). He notes the **X-High** reasoning level often "overthinks" and can perform worse. Vision and web search capabilities are also meaningfully improved.

### Pricing and Cost Analysis

GPT-5.4 introduces a price increase to $2.50 per million input tokens and $15 per million output tokens. Theo speculates this likely reflects higher operational costs due to a more capable model. The **GPT-5.4 Pro** pricing is exceptionally high at $30/$180 per million tokens, which is hard to justify given its mixed performance in his tests. He advises that for most tasks, the standard "High" reasoning tier offers the best balance of cost and capability.

### Practical Use and Developer Experience

Theo demonstrates GPT-5.4's prowess by having it perform complex tasks like adding drag-and-drop functionality to T3 Code via Cursor's cloud agents and migrating a large legacy React codebase (ping.gg) with minimal steering. He highlights the model's excellent **context retention** in long threads and its improved responsiveness to mid-task guidance. However, it failed a specific challenge (writing code to beat Stockfish 17) in the same way GPT-5.3 did, misunderstanding the core objective.

### Weaknesses and Model Comparisons

The most glaring weakness is **front-end and UI design**. Theo shows a painful back-and-forth where GPT-5.4 generated bloated, unattractive UI for his Skatebench site. In contrast, Claude Opus correctly identified the need to ditch the existing chart library and built a clean, custom Tailwind implementation. He references a community project that created a "de-Codexify" prompt to combat GPT's signature bad design tendencies (excessive cards, weird rounded corners). For chat and personality, he still prefers Anthropic's and Google's models.

### Prompting and System Guidance

Theo emphasizes that GPT-5.4 is the **most steerable model** he's used. OpenAI's new prompting guide is essential reading for product integration, covering areas like low-context tool routing, dependency-aware workflows, and output structuring. The model excels at following complex system instructions without overthinking them (a problem he notes with Gemini). This steerability means investing time in crafting detailed system prompts and "agent.md"-type files yields significant returns.

### Where to Use It and Conclusion

GPT-5.4 Thinking is available on ChatGPT.com. For a better chat experience, Theo recommends T3 Chat. For coding, he hints at the upcoming T3 Code (a browser version of which can be run via a command). He concludes that GPT-5.4 is his daily driver for most tasks but he still relies on Claude Opus and Gemini for UI/design polish, affirming that the "which model to use" debate is nuanced and task-dependent.

## Context

Theo, from the channel t3․gg, is a developer and creator deeply embedded in the AI and tools space, known for his technical, hands-on reviews of new developer technologies. He often gets early access to models and provides unfiltered opinions. This review contributes to the fast-paced conversation about the rapid evolution of large language models, specifically their practical utility for software development. It's relevant now as GPT-5.4 represents a significant step forward from OpenAI, prompting developers to re-evaluate their toolchains and prompting strategies. This video is most beneficial for software developers, engineers, and product builders who are integrating AI into their workflows and need to understand the specific strengths, weaknesses, and cost implications of the latest model to make informed decisions.
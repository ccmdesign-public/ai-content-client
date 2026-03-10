---
metadata:
  videoId: "YemMd6-cM0Q"
  title: "Caught Distilling from Claude?"
  description: "In this video, I look at the controversy of Anthropic accusing the Chinese open weights models companies DeepSeek, Minimax, and Moonshot AI of distilling from the Claude model.\ 


    Blog: https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks


    For more tutorials on using LLMs and building agents, check out my Patreon

    Patreon: https://www.patreon.com/SamWitteveen

    Twitter: https://x.com/Sam_Witteveen\ 


    🕵️ Interested in building LLM Agents? Fill out the form below

    Building LLM Agents Form: https://drp.li/dIMes


    👨‍💻Github:

    https://github.com/samwit/llm-tutorials


    ⏱️Time Stamps:

    00:00 Intro

    00:35 Anthropic Blog on Detecting and Preventing Distillation Attacks

    02:39 DeepSeek, Moonshot AI, Minimax

    05:56 Tiny Corp Post on X

    06:29 Elon Musk Post on X

    08:39 What is Distillation"
  channel: "Sam Witteveen"
  channelId: "UC55ODQSvARtgSyc8ThfiepQ"
  duration: "PT13M24S"
  publishedAt: "2026-02-24T14:50:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/YemMd6-cM0Q/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=YemMd6-cM0Q"
processedAt: "2026-03-10T14:54:24.452Z"
source: "youtube"
tldr: "Anthropic, Google, and OpenAI have accused Chinese AI labs (DeepSeek, Moonshot, MiniMax) of industrial-scale model distillation, using 24,000 fake accounts to extract 16 million exchanges from Claude to copy reasoning, tool use, and coding capabilities, raising questions about AI intellectual property and timing amid new model releases."
tools: []
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "claude"
  - "llm"
  - "open-source"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9345
  outputTokens: 808
  totalTokens: 10153
  processingTimeMs: 66102
tagsNormalizedAt: "2026-03-10T16:45:29.599Z"
---

## Key Takeaways

The video examines recent accusations of model distillation by Chinese AI labs and the broader implications for AI development.

## Summary

Anthropic, Google, and OpenAI have recently published evidence and a leaked memo accusing Chinese AI labs—specifically DeepSeek, Moonshot AI, and MiniMax—of conducting industrial-scale **model distillation** attacks. Anthropic's detailed article claims these labs created 24,000 fake accounts to extract over 16 million exchanges from the Claude model. The goal was to copy Claude's advanced capabilities, including **reasoning**, **tool use**, **coding**, and **agent development**.

**The Accusations and Methods**

Anthropic's breakdown shows MiniMax was responsible for over 13 million exchanges, Moonshot AI for 3.4 million, and DeepSeek for about 150,000. The methods varied: DeepSeek appeared more surgical, allegedly using Claude as a **reward model** to grade its own outputs for reinforcement learning. Moonshot and MiniMax focused on extracting general abilities. The video questions the timing of these accusations, noting they coincide with new model releases from these labs and just before DeepSeek's anticipated next model.

**The Irony and Broader Debate**

The presenter highlights the irony, as critics point out that Anthropic itself faced a $1.5 billion copyright settlement for training on books without permission. A key argument from the open-source community, echoed by figures like George Hotz (Tiny Corp) and Elon Musk, is that these labs paid for API tokens and that major AI companies themselves scraped the internet without consent. The core ethical question is whether it's fair for companies to complain about output scraping when their own training data was acquired similarly.

**What is Model Distillation?**

The video explains **distillation** is a legitimate technique, pioneered in a famous paper by Geoffrey Hinton, Oriol Vinyals, and Jeff Dean. It involves training a smaller, more efficient model (the **student**) to mimic the knowledge of a larger, more capable model (the **teacher**). This can be done by training on the teacher's outputs or its internal **probability distributions (logits)**. Distillation is commonly used by companies like OpenAI and Anthropic to create smaller, faster-serving models (like Haiku or flash models) from their massive internal models.

**Unanswered Questions and Future Implications**

The presenter concludes that the full truth may never be known, but such accusations will likely continue. It raises critical, unresolved questions about intellectual property in AI, the ethics of data use, and whether the outputs of LLMs can or should be copyrighted. The debate underscores the competitive and secretive nature of cutting-edge AI development.

## Context

This issue matters because it sits at the intersection of AI competition, intellectual property law, and ethics. As AI models become more valuable, the methods used to create and copy them are under intense scrutiny. AI researchers, developers, and legal professionals should care, as the outcomes of these disputes could set precedents for how AI knowledge is shared, protected, and commercialized globally. It also reflects the ongoing tension between open-source development and proprietary innovation in the AI industry.
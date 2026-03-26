---
title: "The engineering best practices you can drop straight into Claude"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/the-engineering-best-practices-you-can-drop-straight-into-claude-8b69a55ce60d?source=rss----98111c9905da---4"
publishedAt: "2026-03-26"
tags:
  - "ai-general"
  - "llm"
  - "open-source"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-26T21:35:22.191Z"
---

# The engineering best practices you can drop straight into Claude

#### The exact markdown files we use for writing, coding, and building agents at Towards AI

Good morning, AI enthusiasts!

Louis here from Towards AI, where we have spent years building LLM systems with one goal: sharing what we build and, more importantly, what we learn building it, so you can grow as an AI engineer without hitting every wall we did.

Part of that is done through our courses. But the bigger part is making your actual building process easier, every day.

So we decided to share the markdown files we use internally, the ones you can feed directly into an agent. It builds on the context that usually takes years to develop.

Access everything on our repo here: [https://github.com/louisfb01/ai-engineering-cheatsheets](https://github.com/louisfb01/ai-engineering-cheatsheets)

Most of the variance between a good product and a poor one isn’t the model, the architecture, or the prompt. It’s what your agent knows before it starts. Two teams with identical setups will produce completely different results if one has loaded the right decisions up front and the other hasn’t. Any agent’s defaults are generic and broad by design. These files replace those defaults with judgments built on real systems.

#### What’s Inside Our 3 Markdown Files

![](https://cdn-images-1.medium.com/max/1024/0*yR9IiJftEqlOqNUt.png)

Most teams reach for multi-agent systems the moment a task feels complex. But complexity isn’t the signal; unpredictability is. Before you commit to an architecture, ask three questions:

-   Can you map the steps in advance? If yes, a workflow will outperform an agent every time; it’s faster, cheaper, and deterministic.
-   Does the task require decisions that depend on intermediate results you can’t anticipate? That’s where a single agent earns its place.
-   Does it require genuinely parallel workstreams that operate independently across different domains? That’s the only case where multi-agent adds more than it costs.

Most tasks that feel like they need three agents need one. Most tasks that feel like they need one agent need a workflow. Our agentic AI engineering cheatsheet gives you the exact questions to ask, the signals to look for, and the tradeoffs we’ve seen play out on real systems.

The other two markdowns are:

**Our AI Engineering Playbook**, which includes tables for model selection, prompting strategy, RAG setup, memory patterns, eval methods, production config, and much more.

**Our anti-slop AI writing guide** with our 7-section prompt template, banned-word list, style rules, and our two-model write-then-review workflow. It allows us to make LLM outputs not sound generated.

These 3 files come directly from the Towards AI Academy courses, the same frameworks we teach in depth, distilled into references you can use today. No course required. No paywall. No email catch or anything.

Just a repo you can clone and use: [https://github.com/louisfb01/ai-engineering-cheatsheets](https://github.com/louisfb01/ai-engineering-cheatsheets)

If you want to go deeper, full lessons, code, and hands-on projects, that’s what the [Towards AI Academy](https://academy.towardsai.net/?utm_source=TAIspecialedition&utm_medium=Substack&utm_campaign=2026_subscribers_nostart_buy_glb&utm_id=EngineeringCheatsheetRepo) is for.

* * *

[The engineering best practices you can drop straight into Claude](https://pub.towardsai.net/the-engineering-best-practices-you-can-drop-straight-into-claude-8b69a55ce60d) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.
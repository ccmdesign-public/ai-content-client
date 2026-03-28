---
metadata:
  videoId: "oPMboSRW014"
  title: "I Tried NEW Minimax M2.7 (Old M2.5 Evals Were Pretty Bad...)"
  description: "I got invited to test the new M2.7 and compared it against M2.5 with the same evaluations where M2.5 failed.


    More of my AI Coding experiments on my website: https://aicodingdaily.com?mtm_campaign=youtube-channel-default-link"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT10M21S"
  publishedAt: "2026-03-27T06:00:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/oPMboSRW014/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=oPMboSRW014"
processedAt: "2026-03-28T18:04:03.799Z"
source: "youtube"
tldr: "Minimax M2.7 shows slight improvement over M2.5 but still trails frontier models in Laravel coding tasks. Tested across three projects using VS Code and Cline, it passed only one test (implementing roles/permissions) while failing two others (multi-tenancy and a lesser-known Spatie package). However, it is highly cost-effective, costing just $0.57 total on OpenRouter for all three evaluations."
tools:
  - name: "VS Code"
    url: null
  - name: "Cline"
    url: null
  - name: "OpenRouter"
    url: null
  - name: "Laravel"
    url: null
  - name: "Livewire"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "ai-general"
  - "llm"
  - "vscode"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 55495
tagsNormalizedAt: "2026-03-28T18:07:08.878Z"
---

## Key Takeaways

Here are the most important takeaways from the Minimax M2.7 evaluation:

* **Minimax M2.7** successfully implemented a roles and permissions package, showing improvement over the M2.5 version which previously failed this exact task.

* The model struggles significantly with **context windows** and long-running tasks, often running in circles for up to 15 minutes while trying to fix failing tests.

* **Pricing** is a major advantage, as M2.7 costs only $0.30 per million input tokens on OpenRouter, making it drastically cheaper than frontier models like Opus or GPT-4.

* Despite its low cost, it is not yet reliable for complex **Laravel** development, often using non-native solutions like manual exceptions instead of standard framework policies.

## Summary

The video provides a hands-on evaluation of the newly released Minimax M2.7 model to determine if its software engineering capabilities have improved since the highly disappointing performance of its predecessor, Minimax M2.5.
The creator specifically tests the artificial intelligence model's ability to handle complex Laravel framework tasks using a strict and isolated evaluation methodology.

### Testing Methodology and Setup

The comprehensive evaluation process relies heavily on the VS Code editor combined with the popular Cline extension to interface with the artificial intelligence.
The creator uses OpenRouter as the backend provider to access the Minimax M2.7 model and feeds it specific architectural prompts to either fix bugs or implement new features in isolated Laravel projects.
Crucially, the final evaluation tests are kept completely separate from the working project files until the artificial intelligence finishes generating its code.
Once the model explicitly completes the given task, the creator manually copies the external testing scripts into the environment and runs the standard PHP artisan test command to verify the actual success rate without the model cheating.

### Project Evaluations and Performance

The creator tests the model across three distinct Laravel development scenarios to thoroughly gauge its real-world problem-solving capabilities.

* The first test tasks the model with fixing a complex isolation bug directly related to multi-tenancy configurations.

* The model struggled significantly with Livewire components and spent roughly 10 minutes running in endless circles attempting to fix its own automated tests.

* Ultimately, it failed six out of ten evaluation tests specifically because it used manual authorization exceptions instead of implementing native Laravel policies.

* The second test requires the model to add a standard Laravel permissions package and successfully implement role-based access.

* Minimax M2.7 completed this specific assignment in just five minutes without getting stuck in a loop, and all 29 independent evaluation tests passed perfectly.

* The third test involves installing a lesser-known Spatie package explicitly designed for managing Laravel model states.

* The model struggled immensely with namespaces and class definitions, running in circles for 15 minutes and almost completely exhausting its 200,000 token context limit before failing the final evaluation.

### Pricing and Final Verdict

While the model's foundational coding logic remains flawed on complex multi-file tasks, its API pricing structure is incredibly competitive for developers on a budget.
The total recorded cost for running all three extensive coding tests through the OpenRouter platform was a mere 57 cents.
With raw input costs sitting at just 30 cents per million tokens and output costs at $1.20 per million tokens, it is vastly cheaper than leading frontier models like Claude Opus or GPT-4.
Ultimately, Minimax M2.7 shows definitive developmental progress over the older M2.5 architecture but remains highly unsuitable for complex, long-running agentic tasks.
It is currently best reserved for smaller, highly specific coding operations where its exceptionally low cost provides a significant financial advantage over premium commercial models.

## Context

As the artificial intelligence landscape becomes increasingly competitive, developers are constantly seeking cost-effective alternatives to premium frontier models like GPT-4 and Claude 3.5 Sonnet. Minimax M2.7 represents a growing class of budget-friendly models attempting to capture the developer market. This evaluation matters because it highlights the current trade-offs between raw coding capability and API costs. Software engineers, indie hackers, and startup founders should care about these benchmarks when deciding which LLM to integrate into their daily workflows or autonomous agents. While cheaper models struggle with complex framework logic, their incredibly low token costs make them highly attractive for handling smaller, repetitive programming tasks at scale.
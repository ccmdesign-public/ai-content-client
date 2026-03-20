---
metadata:
  videoId: "AREft9zTm6Q"
  title: "I Tried Deleting CLAUDE.md. Here's What Happened."
  description: "I've seen some people recommending to shorten or even delete CLAUDE.md or AGENTS.md files. I've tried it myself, on 5 different Laravel projects.


    Original inspiration video by Theo: https://www.youtube.com/watch?v=GcNu6wrLTJc


    More of my AI Coding experiments on my website: https://aicodingdaily.com?mtm_campaign=youtube-channel-default-link"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT15M11S"
  publishedAt: "2026-02-25T08:31:04Z"
  thumbnailUrl: "https://i.ytimg.com/vi/AREft9zTm6Q/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=AREft9zTm6Q"
processedAt: "2026-03-10T16:17:45.114Z"
source: "youtube"
tldr: "Deleting or drastically shortening the `CLAUDE.md` file in AI coding agents like Opus can significantly reduce token usage and generation time, but it risks generating suboptimal or buggy code for less familiar frameworks if critical instructions for testing and documentation search are removed."
tools:
  - name: "Anthropic Opus"
    url: null
  - name: "Laravel"
    url: null
  - name: "Laravel Boost"
    url: null
  - name: "React"
    url: null
  - name: "Vue.js"
    url: null
  - name: "Livewire"
    url: null
  - name: "Filament"
    url: null
  - name: "Laravel Pint"
    url: null
  - name: "GPT-4"
    url: null
  - name: "Blade"
    url: null
  - name: "Flux UI"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "llm"
  - "productivity"
  - "prompt-engineering"
  - "testing"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9624
  outputTokens: 1611
  totalTokens: 11235
  processingTimeMs: 48884
tagsNormalizedAt: "2026-03-10T16:46:12.485Z"
---

## Key Takeaways

Experiments show that removing `CLAUDE.md` or `AGENT.md` files can surprisingly improve LLM coding performance in certain scenarios, but it's not a universal solution.

* **Increased Speed and Reduced Token Usage**: For well-known frameworks like Laravel with common CRUD operations, removing the `CLAUDE.md` file resulted in **twice as fast code generation** and **2.5 times fewer tokens** used by Opus.

* **Risk with Less Familiar Frameworks**: Without explicit instructions in `CLAUDE.md` to run automated tests or consult documentation, the LLM may produce **broken code** for less common frameworks or complex tasks, as demonstrated with Filament.

* **Essential `CLAUDE.md` Components**: The most crucial elements to retain or enforce in `CLAUDE.md` are instructions for **running automated tests** and utilizing a **search docs tool** to ensure code quality and correctness.

* **Context Matters**: The optimal approach to `CLAUDE.md` depends on the specific project, the LLM's training data, and the complexity of the task; a **shortened, focused `CLAUDE.md`** with essential guardrails is often the best compromise.

## Summary

This video investigates the impact of deleting or shortening the `CLAUDE.md` (or `AGENT.md`) file on the performance of AI coding agents, specifically Anthropic's Opus, when generating code for Laravel projects. The experiment was inspired by a video from Theo and tested on five different Laravel starter kits.

### Initial Experiment: Deleting `CLAUDE.md`

Initially, the presenter removed the `CLAUDE.md` file, which typically contains guidelines, tool listings, and preferred coding styles for the project. For a basic Laravel API project, Opus generated a working CRUD (Create, Read, Update, Delete) in 1 minute and 13 seconds. Automated tests, which were external and not accessible to the LLM, all passed. Compared to previous tests with `CLAUDE.md`, this was **twice as fast** and used **2.5 times fewer tokens** (13% vs. 31% of the session's total tokens).

Opus's self-reflection on what it *would have done differently* if `CLAUDE.md` were present revealed several points:

*   It didn't use `php artisan make` commands, instead writing files manually, which was faster but potentially less robust.

*   It didn't consult documentation, relying solely on its internal training.

*   It didn't run `Laravel Pint` for code formatting.

*   It didn't introduce form requests or API versioning.

Despite these deviations from the `CLAUDE.md` guidelines, the generated code for the API project, and subsequently for React, Vue.js, and Livewire projects, was functional and passed all automated tests. This suggested that for well-established frameworks and common tasks, modern LLMs are sufficiently trained to generate correct code without explicit, detailed instructions.

### The Filament Anomaly: When `CLAUDE.md` is Needed

However, the experiment hit a snag with the Filament admin panel project, a less official Laravel starter kit. Without `CLAUDE.md`, Opus generated code that resulted in **16 failed tests** and numerous runtime errors, mainly due to using an outdated Filament v3 structure instead of the expected v4. This failure highlighted a critical missing element: the LLM did not run any automated tests *it generated* or consult documentation during the process for any of the five projects.

### The Importance of Guardrails: Testing and Documentation Search

The presenter realized that the primary benefit of `CLAUDE.md` (specifically with `Laravel Boost`) was not just providing guidelines, but **enforcing the LLM to run automated tests** and use a **search docs tool**. For the Filament project, if Opus had been instructed to run tests or search documentation (e.g., for Filament v4), it likely would have identified and corrected the issues. The `CLAUDE.md` file had 16 references to testing and included a `search docs` tool.

### Code Quality and Conclusion

While the code generated without `CLAUDE.md` mostly worked, there were minor quality issues, such as inline validation instead of form requests in Laravel and deprecated `FormEvent` types in React TypeScript components. These issues, though small for simple CRUDs, could accumulate in larger, more complex projects.

The conclusion is nuanced: completely deleting `CLAUDE.md` is not advisable. Instead, it's beneficial to **massively shorten it**, retaining only crucial instructions that enforce **automated testing** and the use of a **search docs tool**. This approach balances the benefits of faster generation and lower token usage with the necessary guardrails for code quality and correctness, especially for less common or rapidly evolving frameworks. The optimal `CLAUDE.md` structure 'depends' on the project, tech stack, and LLM's specific training.

## Context

The rise of AI coding assistants like Anthropic's Opus and OpenAI's GPT-4 has brought new considerations for developer workflows. One such consideration is the role of context files, like `CLAUDE.md` or `AGENT.md`, which provide LLMs with project-specific instructions and guidelines. This video explores whether these files, intended to help, might sometimes hinder performance by adding unnecessary 'noise' or leading to redundant processing. This is crucial for developers seeking to optimize their use of AI for faster, more cost-effective, and higher-quality code generation, especially in rapidly evolving ecosystems like Laravel, React, and Vue.js.
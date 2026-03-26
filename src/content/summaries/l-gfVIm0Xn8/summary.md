---
metadata:
  videoId: "l-gfVIm0Xn8"
  title: "OpenAI is lying"
  description: "OpenAI put out an article about how good GPT-5.4 is at UI and uh. Well...


    Thank you Kernel for sponsoring! Check them out at: https://soydev.link/kernel


    SOURCES

    https://x.com/gdb/status/2035467731437527127

    https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4

    https://x.com/daradoescode/status/2036840887095787615

    https://www.youtube.com/@daradoescode


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT38M58S"
  publishedAt: "2026-03-26T12:48:53Z"
  thumbnailUrl: "https://i.ytimg.com/vi/l-gfVIm0Xn8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=l-gfVIm0Xn8"
processedAt: "2026-03-26T21:25:54.578Z"
source: "youtube"
tldr: "Theo argues that OpenAI's GPT-5.4 models are fundamentally bad at front-end design, despite the company's promotional article claiming otherwise, and that this 'gaslighting' erodes developer trust while models like Claude Opus, Gemini, and Kimmy are significantly better."
tools:
  - name: "GPT-5.4"
    url: null
  - name: "Claude Opus"
    url: null
  - name: "Gemini 3.1 Pro"
    url: null
  - name: "Kimmy K2.5"
    url: null
  - name: "Codeex"
    url: null
  - name: "Skills.sh"
    url: null
  - name: "Shadcn/ui"
    url: null
  - name: "Tailwind CSS"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "Kernel"
    url: "soyv.link/kernel"
  - name: "1Password"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "ai-coding"
  - "chatgpt"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 30937
  outputTokens: 1709
  totalTokens: 32646
  processingTimeMs: 56342
tagsNormalizedAt: "2026-03-26T21:32:59.236Z"
---

## Key Takeaways

Theo, a developer who extensively uses AI for coding, deconstructs OpenAI's misleading claims about GPT-5.4's front-end capabilities and provides a comparative analysis of AI models for UI design.

*   **OpenAI's promotional article is misleading and damaging**, positioning poor front-end output as a 'skill issue' rather than a model deficiency, which erodes trust in AI companies.

*   **GPT-5.4 suffers from severe 'card sickness' and template repetition**, producing generic, unusable UIs with excessive cards, pill clusters, and weak visual hierarchy across nearly all generations.

*   **Alternative models like Claude Opus, Gemini 3.1, and open-weight Kimmy K2.5 are vastly superior** for front-end work, offering more variety, better aesthetics, and usable starting points without excessive prompting gymnastics.

*   **The disparity is likely due to outdated or limited training data** in OpenAI's models compared to the more current, diverse UI templates and design systems used by Anthropic and Google.

*   **Effective AI-assisted front-end requires using the right model for the job**: use Opus or Gemini for initial design, and clean up implementation bugs with GPT models if needed.

*   **Skills and prompt engineering (like Anthropic's front-end skill) can help steer models**, but they are a workaround for GPT-5.4's fundamental limitations and cannot make its outputs competitive.

## Summary

### Introduction and Thesis

Theo, a developer who heavily relies on OpenAI's GPT-5.4 for coding, opens with a stark contradiction: while he loves the model for solving complex backend problems, he finds it 'really, really bad at front end.' He introduces the video's core subject: a critical analysis of an OpenAI blog post titled 'Designing delightful frontends with GPT-5.4,' which he characterizes as 'gaslighting' and 'a lie.' Theo clarifies his critique is not directed at the article's author but at OpenAI's corporate messaging, which he believes positions the model's front-end shortcomings as a user skill problem rather than a genuine technical deficiency.

### Deconstructing OpenAI's Claims and Examples

Theo meticulously reviews the OpenAI article, expressing visceral disappointment at the provided examples, which he describes as 'utter slop.' He points out recurring flaws: everything is a card, text doesn't fit within containers, and the layouts are generic and uninspired. He emphasizes that when major AI companies publish such low-quality, easily discredited examples, it rapidly erodes developer trust in the entire field. Theo reads through the article's recommendations, which include complex prompt rules about composition, branding, typography, and avoiding clichés like purple gradients. He finds the advice absurdly esoteric, noting that the amount of specific knowledge required to make GPT-5.4 marginally usable for front-end is prohibitive compared to simply using a better-suited model.

### Comparative Benchmark: GPT-5.4 vs. Other Models

Theo shifts to a data-driven comparison using a community-created benchmark by 'Dra.' The benchmark tests multiple models on the same front-end task, with and without design skills. The results are damning for GPT-5.4. Without a skill, all its outputs feature the same card-heavy, pill-clustered layout with only superficial color variations. Theo calls them 'some of the worst landing pages I've ever seen.' Even with OpenAI's own front-end design skill applied, the improvements are minor, and the 'card sickness' persists. In stark contrast, models like **Claude Opus**, **Gemini 3.1 Pro**, and the open-weight **Kimmy K2.5** (noting it's 'almost a tenth the price') produce varied, aesthetically pleasing, and usable starting points. Their designs show better understanding of layout, typography, and subtle interactions, requiring far less manual correction.

### Speculation on the Root Cause: Training Data

Theo offers a detailed hypothesis for why GPT models lag in UI design. He explains that AI labs train coding models using historical data like GitHub pull requests, which are then used to generate synthetic chat histories for reinforcement learning. The key, he theorizes, is the **'templates' or design systems** present in this training data. He estimates GPT-5.4 might only have around four outdated, card-heavy UI templates in its effective training set for front-end work. In contrast, Opus might have ten better templates, and Gemini even more, though with higher variability. Theo suggests that **Anthropic and Google may have accessed more recent or higher-quality UI/UX training datasets** that OpenAI did not procure or integrate. This creates a situation where GPT models are excellent at logic and backend code (trained on vast amounts of that data) but fail at the subjective, aesthetic, and rapidly evolving domain of front-end design.

### Practical Recommendations and Conclusion

Based on his extensive experience, Theo provides a practical workflow: use **Claude Opus** as the primary tool for front-end design work due to its consistency and quality. For projects where you're willing to invest more time for a potentially better result, use **Gemini 3.1 Pro** with multiple generations. He occasionally uses GPT models to **fix specific CSS bugs or clean up code** generated by other models, acknowledging they can be less buggy in implementation even if their initial designs are poor. He concludes by reiterating his frustration with OpenAI's article, viewing it as a sign of internal recognition of the problem but a terribly executed public response. He urges OpenAI to improve its review processes for technical marketing and, more importantly, to address the fundamental data gap causing the front-end weakness in its otherwise powerful models.

## Context

Theo (t3.gg) is a well-known developer and content creator with deep, hands-on expertise in building products with AI-assisted coding. He is a prominent user and advocate of OpenAI's models for complex problem-solving but is famously critical of their shortcomings, especially in UI/UX. This video contributes to the ongoing and vital conversation about the specific strengths and weaknesses of different large language models (LLMs) for professional development workflows. It's highly relevant as AI coding tools move from novelty to essential productivity tools, and developers need honest, comparative guidance on which models to use for specific tasks. This video is crucial for full-stack developers, product builders, and engineering leaders who use or evaluate AI coding assistants and want to understand the real-world limitations and optimal tooling strategies beyond corporate marketing.
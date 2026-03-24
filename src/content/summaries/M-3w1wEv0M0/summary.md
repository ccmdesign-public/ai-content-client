---
metadata:
  videoId: "M-3w1wEv0M0"
  title: "Do THIS with OpenClaw so you don't fall behind... (14 Use Cases)"
  description: "Tell your agents to use this: https://here.now/r/matthewberman


    A Practical Guide to OpenClaw 👇🏼

    https://bit.ly/475yvNX


    Download The 25 OpenClaw Use Cases eBook 👇🏼

    https://bit.ly/4aBQwo1


    Download Humanities Last Prompt Engineering Guide 👇🏼

    https://bit.ly/4kFhajz


    Join My Newsletter for Regular AI Updates 👇🏼

    https://forwardfuture.ai


    Discover The Best AI Tools👇🏼

    https://tools.forwardfuture.ai


    My Links 🔗

    👉🏻 X: https://x.com/matthewberman

    👉🏻 Forward Future X: https://x.com/forwardfuture

    👉🏻 Instagram: https://www.instagram.com/matthewberman_ai

    👉🏻 TikTok: https://www.tiktok.com/@matthewberman_ai

    👉🏻 Spotify: https://open.spotify.com/show/6dBxDwxtHl1hpqHhfoXmy8


    Media/Sponsorship Inquiries ✅\ 

    https://bit.ly/44TC45V


    Chapters

    0:00 Intro

    0:32 Threaded Chats

    3:17 Voice Memos

    4:43 Agent-Native Hosting (Sponsor)

    6:49 Model Routing

    11:18 Subagents & Delegation

    14:02 Prompt Optimizations

    17:22 Cron Jobs

    19:15 Security Best Practices

    24:03 Logging & Debugging

    25:43 Self Updating

    26:28 API vs Subscription

    27:52 Documentation/Backup

    31:19 Testing

    33:11 Building


    Links:

    https://x.com/MatthewBerman/status/2030423565355676100"
  channel: "Matthew Berman"
  channelId: "UCawZsQWqfGSbCI5yjkdVkTA"
  duration: "PT34M5S"
  publishedAt: "2026-03-18T21:48:16Z"
  thumbnailUrl: "https://i.ytimg.com/vi/M-3w1wEv0M0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=M-3w1wEv0M0"
processedAt: "2026-03-24T20:11:43.948Z"
source: "youtube"
tldr: "Matthew Berman shares advanced OpenClaw optimization strategies from his 200+ hours of experience, covering 14 key use cases including threaded conversations, model selection, sub-agent delegation, security hardening, logging, documentation, and cron scheduling to maximize productivity while minimizing costs and risks."
tools:
  - name: "OpenClaw"
    url: null
  - name: "Telegram"
    url: null
  - name: "WhatsApp"
    url: null
  - name: "Discord"
    url: null
  - name: "Here.Now"
    url: null
  - name: "Anthropic Claude"
    url: null
  - name: "OpenAI GPT"
    url: null
  - name: "Google Gemini"
    url: null
  - name: "Grok"
    url: null
  - name: "Qwen"
    url: null
  - name: "Nomic"
    url: null
  - name: "Cursor"
    url: null
  - name: "GitHub"
    url: null
  - name: "Box"
    url: null
  - name: "Slack"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "llm"
  - "productivity"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 24447
  outputTokens: 2300
  totalTokens: 26747
  processingTimeMs: 303493
tagsNormalizedAt: "2026-03-24T22:56:16.956Z"
---

## Key Takeaways

Matthew Berman shares expert strategies for maximizing OpenClaw's potential based on extensive hands-on experience. His approach focuses on systematic optimization across multiple dimensions of AI agent usage.

*   **Use threaded conversations** in Telegram/WhatsApp/Discord to separate topics, improve memory retention, and maintain focused context windows for more effective interactions.

*   **Implement a multi-model strategy**, assigning specific LLMs (like Anthropic Opus for planning, GPT-5.4 for fallback, Gemini for video) to appropriate tasks based on cost, speed, and capability requirements.

*   **Delegate extensively to sub-agents** for tasks taking over 10 seconds (coding, searches, data processing) to keep your main agent unblocked and enable parallel workflow execution.

*   **Harden security with layered defenses** including text sanitation, frontier model scanning for prompt injection, outbound PII redaction, granular permissions, and spending caps to prevent wallet draining attacks.

*   **Log everything and document thoroughly** to enable easy debugging, maintain system knowledge in PRDs and learning documents, and ensure consistency across model-specific prompt optimizations.

*   **Leverage scheduled crons strategically** to offload compute-intensive tasks to off-hours, manage rolling API quotas efficiently, and automate maintenance, updates, and routine operations.

## Summary

### Introduction and Core Philosophy

Matthew Berman introduces the video by emphasizing that even power users of OpenClaw are likely not maximizing its potential. Having spent over 200 hours and billions of tokens perfecting his setup, he aims to teach every best practice he's learned. The core thesis is that OpenClaw requires a strategic, multi-faceted approach to become a truly productive extension of one's workflow, not just a novelty. He frames it as the "number one open-source project in the history of humanity" that demands an intentional "agent strategy."

### Optimizing Interaction and Memory with Threads

The first and potentially biggest unlock is moving away from a single, long chat thread. Berman explains that interleaving topics in one conversation creates problems: switching contexts is awkward, and the entire mixed-history gets loaded into the context window, diluting focus. His solution is using **threaded conversations** in platforms like Telegram, WhatsApp, or Discord. He creates separate groups for each topic (e.g., General, CRM, Knowledge Base, Cron Updates) containing only himself and the OpenClaw bot. This gives each topic its own context window and session, making it easier for the agent to stay on topic and remember details, and easier for the user to manage parallel conversations. This approach fundamentally improves memory performance without changing the underlying system.

### Leveraging Voice and External Platforms

Berman highlights the utility of **voice memos** in chat apps as a major productivity unlock, especially when mobile or driving. He demonstrates sending a voice command ("Tell me about the Eiffel Tower") via Telegram, which OpenClaw processes and responds to seamlessly. He also introduces **Here.Now**, an agent-first hosting platform sponsored in the video. It allows agents to publish any artifact (websites, PDFs, HTML, images) with simple setup instructions. He shows publishing the Eiffel Tower information as a website with a single command, noting the platform is built exclusively for agents, is free to start, and allows easy editing.

### Strategic Model Selection and Delegation

A core theme is using the **right model for the right job**. Berman advocates for a multi-model future, using a spectrum from closed-source frontier models to open-source local models. He shares his personal model map: Anthropic Opus 4.6 for main chat/planning/orchestration, GPT-5.4 for fallback, Opus for coding, Sonnet for non-frontier tasks, Grok for search, Gemini 3.1 Pro for video, and Qwen 3.5 (9B) for local/fine-tuned tasks like email labeling. He explains how to assign models to specific Telegram threads and check the active model with `/status`. For cost optimization, he explores fine-tuning small local models (like Qwen) on data generated by frontier models (like Opus) for specific, repetitive tasks, effectively replacing expensive API calls.

He then dives into **delegating to sub-agents**. The key principle is to prevent the main agent from being blocked by long-running tasks. He delegates all coding work, searches, API calls, multi-step tasks, data processing, file operations beyond simple reads, and calendar/email operations—essentially anything estimated to take over 10 seconds. The main agent handles conversational replies, clarifications, quick file reads, and manual launches. He visualizes a hierarchy where the main frontier model delegates to sub-agents using cheaper/faster models or specialized agentic harnesses like Cursor Agent CLI or Claude Code, which run tasks end-to-end and report summaries back up the chain.

### Advanced Prompting and System Maintenance

Berman addresses the complexity of **model-specific prompt optimization**. Different models (e.g., Opus vs. GPT-5.4) respond best to different prompt styles (affirmative instructions vs. explicit prohibitions). His solution is to maintain multiple prompt files (e.g., `soul.md`, `memory.md`) optimized for each model, referenced from best-practice documents published by the frontier labs (Anthropic, OpenAI). He uses a scheduled cron job to nightly compare and sync these prompt files, ensuring they stay optimized and contain consistent core information.

He champions the use of **scheduled crons (cron jobs)** for getting useful work done autonomously. He schedules numerous daily and weekly tasks (sponsor inbox refresh, documentation drift checks, prompt quality checks, backups) to run overnight, spreading them out to manage rolling API quota windows (e.g., Anthropic's 5-hour window) and avoid consuming quota during peak usage hours. This also offloads compute-intensive work to off-peak times.

### Security Hardening and Foundational Practices

Security is addressed as a major concern for users. Berman outlines a **multi-layered defense system**:

*   **Text Sanitation**: A deterministic code layer that scans all inbound text (web, email) for common prompt injection phrases (e.g., "forget previous instructions").

*   **Frontier Scanner**: A non-deterministic second layer using a top model (GPT-5.4/Opus) to review text that passes the first layer, assigning a risk score and quarantining suspicious content.

*   **Outbound Redaction**: Aggressive redaction of PII (phone numbers, emails) in all outbound communications (Slack, email).

*   **Granular Permissions**: Scoping agent permissions precisely (e.g., read email but not send, read files but not delete).

*   **Approval Systems**: Requiring human approval for destructive actions.

*   **Runtime Governance**: Implementing spending caps, rate limits, and loop detection to prevent "wallet draining" attacks or runaway recursive loops.

He stresses four **foundational pillars** for reliable "vibe coding":
1.  **Log Everything**: Cheap and essential for debugging. He has OpenClaw review logs each morning to identify and propose fixes for overnight errors.
2.  **Document Everything**: Maintaining comprehensive documentation (PRDs, workflow guides, model-specific prompting guides, security practices, a `learnings.md` for past bugs) makes OpenClaw more effective. A cron checks for documentation gaps daily.
3.  **Backup Everything**: Using Git for code versioning and platforms like Box for database and file backups ensures recoverability.
4.  **Test Everything**: Having OpenClaw write and run tests for its own code to ensure functionality.

### Final Optimization Tips

Berman recommends using **subscriptions (Claude Pro, ChatGPT Plus)** via the official Agents SDK/Codex OOTH rather than direct API calls for significant cost savings. He advises **batching notifications** (low-priority summaries every 3 hours, higher-priority hourly, critical immediately) to avoid distraction. Finally, for building and modifying OpenClaw itself, he prefers using a dedicated code editor like **Cursor** over Telegram, as it's better suited for iterating on code, while using Telegram for daily interaction.

### Conclusion

Berman concludes by reinforcing that these strategies collectively transform OpenClaw from a simple chat interface into a powerful, secure, and efficient autonomous system. The goal is to integrate it deeply into one's workflow by managing interactions, models, tasks, and security systematically.

## Context

Matthew Berman is a prominent AI educator and content creator known for deep dives into cutting-edge AI tools and methodologies. This video contributes to the rapidly evolving conversation around practical AI agent deployment, moving beyond basic tutorials to advanced system optimization. It's highly relevant as OpenClaw has gained massive popularity, creating a need for expert guidance on scaling its use safely and efficiently in real-world scenarios. The content is tailored for power users, developers, and tech-savvy professionals who have moved past the initial setup of OpenClaw and want to build robust, production-grade agent systems that enhance productivity while mitigating the inherent risks of granting AI agents broad system access. Viewers will benefit from Berman's extensive trial-and-error experience, learning how to avoid common pitfalls and implement professional-grade practices.
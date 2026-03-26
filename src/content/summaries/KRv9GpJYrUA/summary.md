---
metadata:
  videoId: "KRv9GpJYrUA"
  title: "Building Is the Easy Part Now | Mike Krieger on What AI Changed"
  description: "Mike Krieger built one of the most consequential consumer apps of the last two decades as cofounder of Instagram. He is now at the frontier of determining what makes a breakout AI-native product as co-lead of Anthropic Labs.

    Dan Shipper talked with Krieger for Every’s AI & I about how his experience creating Instagram shapes how he thinks about building with AI, including what can be sped up and what remains stubbornly time-intensive.\ 

    If you found this episode interesting, please like, subscribe, comment, and share!\ 


    To hear more from Dan Shipper:

    Subscribe to Every: https://every.to/subscribe\ 

    Follow him on X: https://twitter.com/danshipper\ 


    Download Grammarly for FREE at grammarly.com


    Timestamps

    0:00 Introduction

    2:33 What's gotten easier and what hasn't about building products in the age of AI

    5:00 Why vibe coding creates indoor trees

    9:00 How rewrites have become a normal part of the development process

    11:39 What agent native product design means

    24:27 How Mike's labs team is structured and the cofounder model

    29:33 The best signal for a product bet is someone with break through walls conviction

    38:51 Navigating enterprise customers while keeping pace with rapid AI change

    40:54 OpenClaw, personal agents, and the product question defining 2026


    Links to resources mentioned in the episode:

    Mike Krieger: https://x.com/mikeyk\ 

    Agent-native architecture: https://every.to/guides/agent-native"
  channel: "Every"
  channelId: "UCjIMtrzxYc0lblGhmOgC_CA"
  duration: "PT48M30S"
  publishedAt: "2026-03-25T15:20:02Z"
  thumbnailUrl: "https://i.ytimg.com/vi/KRv9GpJYrUA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=KRv9GpJYrUA"
processedAt: "2026-03-26T20:45:55.059Z"
source: "youtube"
tldr: "In 2026, AI has made building software trivial, but the real challenge lies in product design: developing intuition about what to build, what to cut, and creating 'agent-native' systems that are robust, flexible, and reflect deep user understanding to avoid generic, feature-bloated products."
tools:
  - name: "Claude"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Grammarly"
    url: "https://www.grammarly.com"
  - name: "OpenClaw"
    url: null
  - name: "PostgreSQL"
    url: null
  - name: "Redis"
    url: null
  - name: "Slack"
    url: null
  - name: "Gmail"
    url: null
  - name: "WhatsApp"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
tags:
  - "agents"
  - "ai-general"
  - "claude"
  - "product-management"
  - "product-strategy"
  - "ux"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 38624
  outputTokens: 1962
  totalTokens: 40586
  processingTimeMs: 63183
tagsNormalizedAt: "2026-03-26T21:32:51.266Z"
---

## Key Takeaways

Mike Krieger, co-founder of Instagram and now at Anthropic Labs, discusses how AI has fundamentally changed product development. The conversation centers on what's become easy (implementation) versus what remains hard (design intuition) in the age of AI-powered coding.

*   **Building is now the easy part.** AI can go from zero to a feature-complete product in hours, making implementation trivial compared to the past.

*   **The hard part is product intuition and editing.** AI is good at adding features but poor at figuring out what to cut. The **art and science of software design in 2026** is building intuition about the right intervention to make in the world, which still requires time and real-world user exposure.

*   **'Agent-native' design is the new paradigm.** Successful AI products (like Claude Code) are built so that anything a human user can do, an AI agent can also do. This requires building software with the right **primitives** and **robustness** to handle unpredictable, emergent agent behavior.

*   **Small, conviction-driven teams are optimal.** With AI compressing development cycles, the optimal team structure is a small, founder-like team with extreme conviction, paired with a shared resource layer for specialized skills (like systems architecture or applied AI). Scaling teams too early slows progress due to coordination overhead.

*   **Embrace frequent rewrites and deletion.** The rapid pace of AI advancement means products can become outdated in months. Teams must be willing to frequently delete code, do complete rewrites, and even 'un-ship' features to stay aligned with the latest capabilities and paradigms.

*   **Proof of thoughtfulness replaces proof of work.** With AI generating code, the value shifts from merely executing tasks to **proof of thoughtfulness**—ensuring the AI's architectural choices are optimal and fit the product's core paradigm, not just the first reasonable solution it generated.

## Summary

### The New Landscape of Building

Mike Krieger opens by reflecting on the dramatic shift in software development. He contrasts building Instagram—which involved a year of exploration, a pivot, and three months of intense, late-night coding—with the current reality at Anthropic Labs. Today, AI models like Claude can rebuild a complex prototype like Bourbon (Instagram's predecessor) in about two hours, complete with features the original didn't have. The **actual building part is now trivial**. You can go from zero to a complete, deployed product in a matter of hours or days. This acceleration has flipped the traditional challenge on its head.

### What Remains Hard: Intuition, Editing, and Simplicity

The core difficulty is no longer implementation but **product intuition and the discipline of editing**. Krieger observes that AI models are excellent at adding features but are not good at figuring out what to cut out of a product. This editorial instinct—knowing what the right, minimal intervention should be—is built over time through real-world usage and reflection. He and host Dan Shipper explore metaphors for this challenge: growing a tree indoors without wind (lacking the forces that create strength and resilience) or being thrown into the final episode of a TV show without understanding the characters or plot. When you can build everything at once, you risk creating a **'matrix of functionality'** that is confusing to users and difficult to test. The pressure to add features 'because you can' leads to overbuilt, generic products that lack a deep, intuitive core.

### The Principles of Agent-Native Design

A significant portion of the conversation focuses on the emerging paradigm of **'agent-native' design**, a term Shipper credits to learning from Anthropic's products like Claude Code. An agent-native product is one where any action a human user can perform, an AI agent can also perform natively through the same interface. This is more than just adding AI features; it's about building software with the right **primitives** from the ground up so that the AI has full knowledge of and ability to manipulate the application's state. Krieger contrasts Claude Code, which embodies this well, with earlier products where AI might describe steps instead of taking action. The goal is software that is a **playground within a safe environment**—flexible enough for emergent, unexpected uses by agents, but robust enough not to break.

### Team Structure and Psychology in the AI Era

The discussion turns to how team composition and psychology must adapt. With AI handling much of the implementation, the most critical hire is someone with **extreme conviction** about a problem space—a founder-like figure who can be the driving force. Krieger describes Anthropic Labs' model: small, agile teams often built around a designer or product-minded engineer with deep conviction, supported by a pool of specialists (e.g., systems architects, applied AI experts) who flow in and out as needed. Shipper describes a similar model at Every, with solo General Managers (GMs) who are 'lightly technical' but have strong product sense, backed by a shared resource layer. Both agree that **scaling teams too early is a net negative** in this fast-paced environment, as coordination overhead outweighs benefits. The psychology of builders also needs to change, resisting the addictive 'vibe coding' that leads to feature bloat and embracing the discipline of simplicity and frequent rewrites.

### Robustness, Maintenance, and the Enterprise Challenge

As products become more powerful and agent-native, ensuring **robustness** is a new challenge. It's not just about passing unit tests, but about whether the software feels like it's built on a solid trunk or on sand—able to withstand unexpected agent interactions without data loss or failure. This requires deep systems expertise, even in rapid prototyping environments. A major tension arises with enterprise customers. While startups must constantly reinvent their products every few months to stay current, enterprise buyers want stability and are averse to change. Krieger's approach is to keep the core product evolving rapidly while providing enterprise toggles and clear communication that working with Anthropic means betting on continuous, significant evolution. The alternative is being disrupted by a newer company that rethinks the space from scratch with modern AI paradigms.

### The Future: Personal Agents and Organizational Dynamics

The conversation concludes by exploring the societal and product implications of powerful, personalized AI agents like OpenClaw. Krieger notes the **'IKEA effect'** where users value agents they've configured themselves, leading to personal attachment. He sees a future where the most effective interaction pattern might be a **single, personalized coordinator agent** that delegates to sub-agents, keeping the main interaction loop open for conversation. Shipper observes an emergent organizational pattern: as individuals use their personalized agents for their specialized work, those agents become trusted proxies within the company, creating a **'shadow org chart'** of AI assistants that mirror and extend human expertise. The central product question for the near future is finding the right balance between the open, powerful flexibility of systems like OpenClaw and the necessary safeguards for safety and privacy.

## Context

Mike Krieger is the co-founder of Instagram and currently works at Anthropic Labs, where he is at the forefront of building AI-powered products. Host Dan Shipper is a founder at Every, a company building agent-native software tools. This conversation, recorded in early 2026, contributes to the critical discourse on how AI is fundamentally reshaping the practice of software development, product management, and startup strategy. It moves beyond the hype of AI code generation to tackle the nuanced, human-centric challenges that emerge when implementation becomes trivial: design intuition, team dynamics, and creating software that is both powerful and robust. This is highly relevant for founders, product managers, software engineers, and designers who are navigating the transition to an AI-augmented workflow and seeking to build breakout products in a crowded, fast-moving landscape. The full video offers deep, first-hand insights from a builder who has successfully navigated multiple technological shifts.
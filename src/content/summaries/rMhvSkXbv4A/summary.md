---
metadata:
  videoId: "rMhvSkXbv4A"
  title: "Tool definitions are the new Prompt Engineering"
  description: "Alex Salazar is the CEO and Co-Founder of Arcade.dev, working on secure AI agents and real-world automation integrations.


    Chiara Caratelli is a Data Scientist at Prosus Group, working on AI agents, web automation, and evaluation of robust multimodal models.


    Join the Community: https://go.mlops.community/YTJoinIn

    Get the newsletter: https://go.mlops.community/YTNewsletter

    MLOps GPU Guide: https://go.mlops.community/gpuguide


    // Abstract

    Agents sound smart until millions of users show up. A real talk on tools, UX, and why autonomy is overrated.


    // Bio

    Chiara Caratelli

    Chiara is a Data Scientist at Prosus, where she develops AI-driven solutions with a focus on AI agents, multimodal models, and new user experiences. With a PhD in Computational Science and a background in machine learning engineering and data science, she has worked on deploying AI-powered applications at scale, collaborating with Prosus portfolio companies to drive real-world impact.


    Beyond her work at Prosus, she enjoys experimenting with generative AI and art. She is also an avid climber and book reader, always eager to explore new ideas and share knowledge with the AI and ML community.


    Alex Salazar

    Alex is the CEO and co-founder of Arcade.dev, the unified agent action platform that makes AI agents production-ready. Previously, Salazar co-founded Stormpath, the first authentication API for developers, which was acquired by Okta. At Okta, he led developer products, accounting for 25% of total bookings, and launched a new auth-centric proxy server product that reached $9M in revenue within a year. He also managed Okta's network of over 7,000 auth integrations. Alex holds a computer science degree from Georgia Tech and an MBA from Stanford University.


    // Related Links

    Website: https://www.prosus.com/

    Website: https://www.arcade.dev/


    ~~~~~~~~ ✌️Connect With Us ✌️ ~~~~~~~

    Catch all episodes, blogs, newsletters, and more: https://go.mlops.community/TYExplore

    Join our Slack community [https://go.mlops.community/slack]

    Follow us on X/Twitter [@mlopscommunity](https://x.com/mlopscommunity) or [LinkedIn](https://go.mlops.community/linkedin)]\ 

    Sign up for the next meetup: [https://go.mlops.community/register]

    MLOps Swag/Merch: [https://shop.mlops.community/]

    MLOps GPU Guide: https://go.mlops.community/gpuguide


    Connect with Demetrios on LinkedIn: /dpbrinkm

    Connect with Alex on LinkedIn: /alexsalazar/

    Connect with Chiara on LinkedIn: /chiara-caratelli/


    Timestamps:

    [00:00] Intro

    [00:15] Insights from iFood

    [06:22] API vs agent intention

    [09:45] Tool definition clarity

    [15:37] Preemptive context loading

    [27:50] Contextualizing agent data

    [33:27] Prompt bloat in payments

    [41:33] Agent building evolution

    [50:09] Agent program scalability

    [55:29] Why multi-agent is a dead end

    [56:17] Wrap up"
  channel: "MLOps.community"
  channelId: "UCG6qpjVnBTTT8wLGBygANOQ"
  duration: "PT57M12S"
  publishedAt: "2026-01-09T15:00:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/rMhvSkXbv4A/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=rMhvSkXbv4A"
processedAt: "2026-01-14T16:24:39.487Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "The central thesis is that as AI agents transition to production, **tool definitions** are replacing prompt engineering as the primary driver of performance. Kiara and Alex argue that success relies on designing tools as **contracts for agent intention** rather than raw API wrappers. This shift, combined with **UX-integrated tools** and rigorous **error taxonomies**, is essential for reducing late\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 12127
  outputTokens: 1121
  totalTokens: 15445
  processingTimeMs: 58537
tools:
  - name: "Arcade.dev"
    url: "https://www.arcade.dev/"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Web Development"
tags:
  - "agents"
  - "api-design"
  - "architecture"
  - "llm"
  - "prompt-engineering"
tagsNormalizedAt: "2026-03-01T21:19:30.428Z"
---

## Key Takeaways

The discussion frames a shift from experimental LLM wrappers to production-grade 'agentic' systems where the architecture of the tools themselves determines reliability.

- **Tools are not APIs**: APIs describe service contracts, while tools must describe the **agent's intention** (e.g., 'Get Brochure' instead of 'Search Google Drive'), which minimizes LLM reasoning steps.

- **Latency as a Blocker**: In 2025, the focus has shifted from accuracy to **latency**. Developers must 'layer' tools to wrap complex workflows into deterministic code, reducing context bloat.

- **The Taxonomy of Errors**: Effective evaluation requires moving beyond generic metrics to a **product-specific taxonomy** of failures derived from real user traces and feedback.

- **Organizational Governance**: Scaling to thousands of agents requires a **Central Tool Registry** to manage versioning, security, and the redundant development of shared utilities.

- **Fine-Tuning Reversal**: Fine-tuning is now the *final* step for cost and latency optimization, rather than the starting point, often used for specific domain representations like i

Food's **Large Commerce Model**.

## Summary

### The i

Food Use Case: Paradox of Choice
Kiara, a Data Scientist at i

Food, describes the challenge of managing a platform with 160 million monthly orders. The primary problem for users is often a 'paradox of choice.' To address this, i

Food developed an agentic interface that moves beyond simple search to proactive recommendation. A key learning was that **UX and platform familiarity** dictate agent design. For instance, Brazilian users are highly comfortable with **Whats

App**, where they use voice notes and are more patient with latency. Conversely, the in-app experience requires a 'snappier' interface with buttons and swiping components integrated directly into the agent's tool outputs.

### Tool Definitions as the New Prompt Engineering
Alex, CEO of Arcade, argues that the industry's focus is moving from prompt engineering to the design of **tool definitions**. He asserts that tools should be the 'inverse' of APIs. While an API reflects the requirements of a downstream service, a tool should reflect the **intention of the agent**. For example, instead of giving an agent access to a raw file-storage API—which requires the model to navigate folders and understand timestamps—developers should provide a high-level 'Get Sales Material' tool. This encapsulation reduces the number of 'turns' the LLM takes, lowering latency and the risk of hallucination. By pushing logic into deterministic code within the tool, developers save context window space and improve system stability.

### Evaluation and Machine Learning Integration
Evaluation is no longer about generic 'faithfulness' but about **business value and error analysis**. Kiara highlights that i

Food uses its 7,000 employees as a testing ground to build a **Taxonomy of Errors**. This taxonomy is then used to create an 'LLM-as-judge' that is highly specific to the food delivery domain. Additionally, i

Food utilizes a hybrid approach involving a **Large Commerce Model (LCM)**. While foundational models handle the conversation, fine-tuned models create 'LLM-friendly' representations of users. This allows the system to infer nuanced preferences—like identifying a 'meat lover' by analyzing pizza topping history—and pass that as context to the agent, a task traditional ML or raw prompts struggle to do at scale.

### Governance and Scaling to 30,000 Agents
As organizations aim for massive agent counts, the conversation shifts to **governance and reusability**. Alex notes that in large enterprises, multiple teams often build the same tools (e.g., CRM connectors). He advocates for 'layering' tools: creating shared, governed system tools that individual teams can then wrap with agent-specific logic. This requires a **Central Tool Registry** to manage versioning and security policies (e.g., preventing external-facing agents from accessing internal-only data). However, the speakers caution against 'top-down over-engineering.' Teams should first solve specific business problems 'vertically' before abstracting those solutions into horizontal, shared resources.

## Context

This video features Kiara, a Process Lead Data Scientist at i

Food (Brazil's largest food delivery platform), and Alex, the CEO of Arcade. It contributes to the 'Day 2' conversation of AI agent development: the transition from initial proof-of-concepts to massive-scale production environments. As organizations like i

Food set targets for thousands of internal and external agents, the technical focus is shifting away from simple prompting toward infrastructure, latency optimization, and governance. This is highly relevant for AI architects and engineering leaders who are currently struggling with 'agentic' latency and the organizational complexity of managing shared tools. It provides a rare look at how a high-volume consumer application integrates LLMs with traditional recommendation systems and diverse user interfaces like Whats

App.

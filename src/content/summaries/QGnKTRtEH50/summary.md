---
metadata:
  videoId: "QGnKTRtEH50"
  title: "Did Cursor really just rebrand Kimi???"
  description: "Cursor's Composer 2.0 is really good. It also happens to be a fine tune of Kimi K2.5...


    Thank you WorkOS for sponsoring! Check them out at: https://soydev.link/workos


    And check out G2i plus React Miami & AI Engineer Miami: https://www.ai.engineer/miami, make sure to use THEO50OFF


    SOURCES

    https://x.com/leerob/status/2035035355364081694

    https://x.com/Kimi_Moonshot/status/2035074972943831491

    https://x.com/fynnso/status/2034706304875602030?s=20


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT27M48S"
  publishedAt: "2026-03-22T17:32:47Z"
  thumbnailUrl: "https://i.ytimg.com/vi/QGnKTRtEH50/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=QGnKTRtEH50"
processedAt: "2026-03-24T21:04:23.881Z"
source: "youtube"
tldr: "Cursor's new Composer 2 model, which outperforms Anthropic's Opus in coding tasks and costs 10x less, is actually a heavily post-trained version of the open-weight Kimi K2.5 model from Moonshot AI, raising questions about license compliance and the future of open-weight models."
tools:
  - name: "Cursor"
    url: null
  - name: "Kimi"
    url: null
  - name: "Moonshot AI"
    url: null
  - name: "Fireworks AI"
    url: null
  - name: "Anthropic Claude"
    url: null
  - name: "OpenAI"
    url: null
  - name: "T3 Chat"
    url: null
  - name: "T3 Code"
    url: null
  - name: "Super Maven"
    url: null
  - name: "Tab 9"
    url: null
  - name: "VS Code"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "DeepSeek"
    url: null
  - name: "OpenRouter"
    url: null
  - name: "WorkOS"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Security"
tags:
  - "ai-coding"
  - "compliance"
  - "llm"
  - "machine-learning"
  - "open-source"
  - "policy"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 22816
  outputTokens: 1146
  totalTokens: 23962
  processingTimeMs: 35134
tagsNormalizedAt: "2026-03-24T22:56:22.852Z"
---

## Key Takeaways

The video investigates Cursor's new Composer 2 model and the controversy surrounding its origins.

- **Composer 2 is built on Kimi K2.5**: Cursor's high-performance, low-cost coding model is a heavily post-trained version of Moonshot AI's open-weight Kimi K2.5, not a model built from scratch.

- **License and disclosure issues**: Cursor used an inference partner (Fireworks AI) to technically comply with Kimi's modified MIT license, which requires attribution for large commercial use, but did not initially disclose the model's base publicly.

- **Economic pressure drives innovation**: Companies like Cursor are forced to find cheaper alternatives to frontier models due to unsustainable subsidization wars (e.g., Anthropic's $200 plan offering ~$5,000 in compute).

- **Threat to open-weight ecosystem**: This incident may cause small AI labs to reconsider releasing models open-weight if larger companies can profit more from them without clear attribution or reciprocity.

## Summary

Cursor recently launched Composer 2, a new AI model for code generation that is incredibly fast, performs well against models like Claude Opus, and is 10x cheaper. However, users discovered through API endpoints that the model's internal name referenced **Kimi K2.5**, an open-weight model from Moonshot AI.

This sparked a controversy around disclosure and licensing. Cursor had used Kimi K2.5 as a base model and then applied significant **post-training** and **reinforcement learning (RL)**—investing roughly 3x more compute in this phase than was used for the original Kimi model—to specialize it for coding tasks. The result is a model that behaves very differently and excels in its niche, but its origins were not initially communicated.

The situation highlights a **licensing loophole**. Kimi K2.5 uses a modified MIT license requiring attribution for products with over 100M users or $2M in revenue. Cursor complied technically by accessing the model through an inference partner, **Fireworks AI**, which handles the license agreement. This allowed Cursor to avoid displaying "Kimi K2.5" in its user interface, a move the creator argues skirts the spirit of open-weight sharing.

### The Business Motivation

A core driver for this strategy is economic. AI frontier labs like Anthropic are engaged in aggressive subsidization, offering far more compute value than their API pricing would suggest (e.g., a $200/month plan providing ~$5,000 in inference). This makes it financially unsustainable for companies like Cursor, which resell API access, to rely solely on these expensive models. **Open-weight models provide a crucial cost edge**, being 10-20x cheaper, which allows companies to build profitable services.

### Impact on the AI Ecosystem

The incident raises concerns about the future of **open-weight models**. If large, well-funded companies can take open-weight models, heavily refine them for commercial gain, and obscure their origins, it may disincentivize smaller labs from releasing their work openly. This could slow down the innovation and cost-reduction pressure that open-weight models currently apply to the entire AI market.

Ultimately, while Composer 2 is a technically impressive and cost-effective model, the handling of its disclosure has created drama and important questions about ethics, licensing, and the open-weight ecosystem's sustainability.

## Context

This video matters to developers, AI practitioners, and startup founders navigating the rapidly evolving and expensive landscape of AI-powered tools. It reveals the behind-the-scenes business pressures and technical strategies companies use to compete with AI giants like Anthropic and OpenAI. The controversy touches on critical issues of open-source philosophy, commercial licensing, and how the economics of AI inference are shaping product development and market competition. Understanding these dynamics is key for anyone building or investing in AI-integrated products.
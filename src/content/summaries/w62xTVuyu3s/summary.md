---
metadata:
  videoId: "w62xTVuyu3s"
  title: "AI has a subsidization problem"
  description: "AI subscriptions from the top labs are very heavily subsidized at this point. $5,000 for $200 isn't going to last forever, and inference isn't cheap


    Thank you Depot for sponsoring! Check them out at: https://soydev.link/depot


    And also Rork! Check them out at: https://soydev.link/rork


    SOURCES

    https://discuss.ai.google.dev/t/google-ai-pro-antigravity-quota-shows-multi-day-lockouts-instead-of-5-hour-reset/130202/22

    https://github.com/orgs/community/discussions/189268

    https://x.com/geminicli/status/2034326558719062375


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT37M39S"
  publishedAt: "2026-03-25T09:04:59Z"
  thumbnailUrl: "https://i.ytimg.com/vi/w62xTVuyu3s/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=w62xTVuyu3s"
processedAt: "2026-03-25T14:49:09.262Z"
source: "youtube"
tldr: "Theo argues that the era of heavily subsidized AI inference is ending as companies like Google cut free tiers, because the economics of giving away expensive compute to users who will never pay is unsustainable, and the real purpose of subsidies is to steal customers from competitors, not to create new markets."
tools:
  - name: "Gemini CLI"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "Claude"
    url: null
  - name: "GPT"
    url: null
  - name: "Open Code"
    url: null
  - name: "GitHub Actions"
    url: null
  - name: "Depot"
    url: "https://soyv.link/depo"
  - name: "Depot CI"
    url: null
  - name: "Docker"
    url: null
  - name: "T3 Chat"
    url: null
  - name: "Cursor"
    url: null
  - name: "AI Studio"
    url: null
  - name: "Vert.Ex.ai"
    url: null
  - name: "Ror Max"
    url: "https://soyv.link/roor"
  - name: "T3 Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Tools & Productivity"
tags:
  - "ai-general"
  - "business"
  - "chatgpt"
  - "monetization"
  - "productivity"
  - "startup"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 29781
  outputTokens: 1876
  totalTokens: 31657
  processingTimeMs: 62189
tagsNormalizedAt: "2026-03-25T14:52:07.357Z"
---

## Key Takeaways

Theo analyzes the unsustainable economics of free AI inference and the strategic reasons behind current subsidization wars. He predicts a major shift as companies realize they can't afford to give away expensive compute to non-paying users.

*   **AI inference is fundamentally expensive**, with costs driven by GPU time and electricity, and there's 'no such thing as free compute'—someone always pays.

*   **The subsidization era is ending**, evidenced by Google restricting Gemini Pro for free users and GitHub Copilot cutting student plan access to premium models, as companies realize non-paying users are a net cost.

*   **Subsidization serves three main purposes**: stealing customers from competitors (the primary driver), collecting valuable training data, and (ineffectively) generating ad revenue.

*   **Free tiers attract 'suicide mission' users** who can't or won't pay, creating a costly support burden with zero conversion potential, while paid plans with heavy subsidies (like Claude Code's) target valuable professional users.

*   **Business models matter**: Companies like Anthropic increase subsidies to lock users into their ecosystem and away from multi-model tools, while OpenAI uses subsidies to grow market share from a position of strength.

*   **Developers should leverage current subsidies while they last**, as this period of incredible value (e.g., $200/month for potentially $5000 of compute) is temporary and will disappear as economics force rational pricing.

## Summary

### The End of Free AI Inference

The video opens with concrete evidence that the era of heavily subsidized AI access is ending: Google is restricting Gemini Pro models for free tier users, GitHub Copilot is removing premium model access from student plans, and even paid Google AI Pro subscribers are experiencing quota issues. Theo frames this as the inevitable conclusion to what he calls 'the subsidization wars'—a period where companies gave away thousands of dollars worth of inference for pennies to attract users.

He establishes a foundational principle: **there is no such thing as free compute**. Running models costs real money for electricity, GPU time, and infrastructure. While the cost per token for frontier models has decreased, the *amount* of inference being done has exploded exponentially due to complex prompts, tool calls, and reasoning steps. A single message can now generate 200,000 tokens instead of 200, making the variance in cost between messages enormous—sometimes a 400x gap. This makes flat-rate or free pricing models economically dangerous.

### The Flawed Economics of Free Tiers

Theo dismantles common justifications for free AI access. First, **ad revenue cannot cover inference costs**. Using his own YouTube channel as a case study—with 693 hours of content watched per hour and high CPMs—he reveals it generates only about $9,000/month from ads, split with Google. This translates to $0.28 per view, while a single complex AI prompt can cost over $1. Ads at this scale cannot possibly subsidize expensive inference.

Second, **data collection isn't valuable enough**. While chat histories can be useful for training, the data from users who can't afford to pay is often low-quality ('jack shit in terms of useful stuff'). Companies like Cursor might subsidize some professional users for their data, but it's not a primary justification for free tiers.

The real reason, Theo argues, is **customer acquisition through price competition**. When you can't convincingly demonstrate your product is better, competing on price (or making it free) is the easiest way to get users to try it. The goal is to move users from the 'I'll try it if it's free' category into the 'I'll pay for it if it's better' category.

### The 'Suicide Mission' of Non-Paying Users

Theo introduces a crucial framework: user segmentation by willingness/ability to pay. He identifies a dangerous segment: users who **'can only use it if it's free.'** These users, often early programmers or those with limited budgets, are a 'suicide mission' for a business.

*   They cost significant money in GPU resources and support (often more than paying users).

*   They have high expectations and are 'more annoying.'
*   **Their lifetime value is zero**—they will never convert to paying customers.

*   When they grow up and can afford better tools, they abandon the free product.

Theo argues Google's anti-gravity and Gemini CLI have inadvertently filled their user base with people in this 'cursed corner,' which is why they are now cutting them off. In contrast, a service like **Claude Code**, with its $200/month plan offering up to $5,000 of inference, targets professional developers. These users have high lifetime value, can influence company-wide purchases, and their under-usage helps subsidize the power users.

### Strategic Subsidies and Market Dynamics

The analysis shifts to why companies like Anthropic and OpenAI still offer heavy subsidies. For **Anthropic**, the 25x subsidy on Claude Code ($200 for $5k of compute) is a **lock-in strategy**. They want to pull users away from multi-model tools like Cursor and into their walled garden. This explains their hostility to platforms (like Open Code) that offer model choice—choice risks their customer lifetime value.

For **OpenAI**, subsidies are a **growth and market share play**. From a position of strength (70% of revenue from ChatGPT Plus), they can afford to be generous with rate limits in Codex to pull users from Claude Code. They also actively support multi-model integrations (like in T3 Code) because they believe their models will win on merit in a competitive landscape.

**Google** is presented as the outlier—a company acting from **incompetence rather than strategy**. Internal teams fight over GPU allocation, with free-tier products sometimes prioritized over paid developer tools. Their subsidies were a 'bad math' mistake in a desperate attempt to get anyone to care about their AI products, and they are now scrambling to contain the costs.

### Conclusion and Implications

Theo concludes that strategic, targeted subsidies (like Claude Code's) may continue for a while, especially as inference costs hopefully fall. However, blanket free tiers for all are doomed. This creates a temporary golden era for developers who can afford these subscriptions, getting massively more value than they pay for. He encourages developers to take advantage of these subsidies while they last, but to expect the landscape to tighten significantly. The era of 'free AI for everyone' is over, and the future belongs to sustainable business models and products that deliver enough value to justify their real cost.

## Context

Theo, from the channel t3.gg, is a seasoned developer and commentator known for his critical analysis of tech industry trends, particularly in web development and AI. This video contributes to the ongoing conversation about the economic sustainability of the current AI boom, specifically the practice of 'burning' venture capital to offer AI services at a loss. It's highly relevant as major players like Google and GitHub are making visible cuts to free access, signaling a potential industry-wide correction. This analysis is crucial for developers, founders, and product managers who rely on or build with AI APIs, helping them understand the underlying business forces that will dictate pricing, availability, and the longevity of the tools they depend on.
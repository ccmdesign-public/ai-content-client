---
metadata:
  videoId: "6iilze3aDkU"
  title: "This AI Startup Is Taking Over Phone Sales"
  description: "In this episode of Founder Firesides, YC Managing Partner Jared Friedman talks to the founders of Simple AI (S24), Catheryn Li & Zach Kamran, who just raised a seed round of $14M. Simple AI gives businesses an AI sales agent that handles inbound calls end-to-end and outperforms their human reps.\ 


    Apply to Y Combinator: https://www.ycombinator.com/apply

    Work at a startup: https://www.ycombinator.com/jobs"
  channel: "YC Root Access"
  channelId: "UCxIJaCMEptJjxmmQgGFsnCg"
  duration: "PT37M14S"
  publishedAt: "2026-02-18T15:00:19Z"
  thumbnailUrl: "https://i.ytimg.com/vi/6iilze3aDkU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=6iilze3aDkU"
processedAt: "2026-02-23T14:15:54.585Z"
source: "youtube"
tldr: "Simple AI, founded by former YC software engineers Cat and Zach, pivoted from a consumer AI assistant to building enterprise-grade AI voice agents that autonomously handle sales phone calls for direct-to-consumer businesses like Omaha Steaks, achieving 30% better upselling than human agents by focusing on revenue generation rather than just cost savings."
tools:
  - name: "OpenAI"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
tags:
  - "ai-agents"
  - "startup-journey"
  - "b2b-saas"
  - "voice-ai"
  - "yc"
  - "pivot"
  - "enterprise-ai"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 29446
  outputTokens: 1626
  totalTokens: 31072
  processingTimeMs: 45144
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

Former YC engineers Cat and Zach share their startup journey from internal tools to a viral consumer app to their current enterprise AI voice sales platform.

*   **Pivoting from consumer to enterprise based on customer demand:** Their consumer app for making phone calls went viral but had low retention; inbound requests from businesses wanting to use the technology for inbound sales led to their successful pivot.

*   **Solving 'hair-on-fire' problems for legacy businesses:** Their first major customer, Omaha Steaks, faced seasonal hiring crises and lost revenue due to untrained temp workers; Simple AI provided a scalable solution that integrated with their archaic AS400 systems.

*   **AI agents outperform humans on key metrics:** Their AI achieves a 30% higher upsell rate than trained human reps by consistently applying best practices, remembering customer preferences, and enabling real-time A/B testing of sales scripts.

*   **Building defensibility through deep technical complexity:** The moat isn't in the basic AI but in solving hard problems like ultra-low latency, custom fine-tuning per client, address transcription, turn-detection models, and robust guardrails for autonomous transactions.

*   **Focus on revenue generation, not cost reduction:** The company's value proposition centers on increasing client revenue through better customer experience and upselling, allowing them to invest in superior technology rather than competing on price.

## Summary

### From YC Software Team to Startup Founders

Cat and Zach met while working on Y Combinator's internal software team, building critical tools like Bookface (a social network for founders) and handling the complex software infrastructure needed to manage thousands of startups. Inspired by the founders they worked with and early access to innovations like OpenAI (which started as YC Research), they caught the 'startup bug' and decided to build their own company.

### The Pivot Journey: Three Ideas to Product-Market Fit

Their startup journey involved three distinct phases. First, they attempted to build a 'better Siri'—a broad consumer AI assistant that could perform tasks like calling Ubers or ordering food. This proved confusing for users due to its undefined capabilities. Their second idea, an AI that makes outbound phone calls for consumers, went viral. Users employed it for tasks like negotiating car prices across multiple dealerships and waiting on hold for flight refunds, even attracting organic attention from celebrities like Reese Witherspoon.
However, this app suffered from low retention—users loved it for one-off tasks but didn't need it regularly. The pivotal insight came from inbound requests from users of the consumer app who asked, 'Can I use this for my business?' This led to their third and current idea: **Simple AI**, an enterprise product providing 'AI voice that sells.'

### Landing the First Major Customer: Omaha Steaks

The breakthrough came when the CEO of Omaha Steaks, a century-old company that does most of its revenue over the phone, used their consumer app to prank-call his COO. He immediately saw its potential to solve his 'hair-on-fire' problem: the company had to 15x its workforce for the holiday season, relying on unreliable temp workers who were poorly trained, leading to massive lost sales.
Cat and Zach spent two weeks in Omaha, Nebraska, embedding with the team to understand their complex, legacy business. They integrated with archaic **AS400 terminal systems** that ran on-premise servers and could only be updated once a day at 6 AM. The company assigned two full-time engineers just to build APIs for Simple AI, highlighting the critical importance of the solution.

### How Simple AI Works and Why It's Better

Simple AI acts as the first point of contact for inbound sales calls. The AI greets callers, answers product questions, explains complex packages and promotions, takes billing and shipping information, and completes the sale end-to-end with no human intervention.
The system's advantages are significant:

*   **Superhuman Performance:** It achieves a **30% higher upsell rate** than even trained, full-time human agents by consistently applying the best sales techniques learned from top performers.

*   **Personalization at Scale:** The AI can tailor interactions based on customer data (e.g., using a Texas accent for a caller from Texas, avoiding offers for products a customer has previously rejected, and recalling personal details from past conversations).

*   **Rapid Experimentation:** Sales managers can A/B test different sales scripts, voices, and offers instantly via prompt changes, something impossible with a human workforce. They discovered unexpected winners, like the phrase 'Lock in your savings today' for subscription offers.

*   **Superior Customer Experience:** Freed from the pressure to minimize 'average handle time,' the AI can have conversational, empathetic interactions, making customers feel heard and building loyalty.

### Technical Challenges and Building a Moat

The founders emphasize that while a basic voice agent demo is easy, building a production-grade, reliable system is immensely complex, creating a strong technical moat:

*   **Latency:** They target sub-600ms response times for natural conversation, requiring custom fine-tuned models instead of slower general-purpose LLMs.

*   **Specialized Models:** They train custom models for specific tasks like **transcribing addresses** and detecting the **'end of turn'** in conversation, fine-tuning them per client to account for different customer demographics and speech patterns.

*   **Orchestration and Guardrails:** Ensuring 99.9%+ reliability is critical when processing payments and orders autonomously. This requires extensive in-house software for validation, monitoring, and preventing hallucinations or errors.

*   **Deep Integration:** Each deployment requires deep, custom integration with a client's unique, often outdated, commerce and CRM systems.

### Current Status and Advice for Founders
A year after launching the enterprise product, Simple AI has grown to a team of 10, raised $14 million, and serves clients in steaks, home insurance, self-storage, and jewelry. Their advice to other founders, informed by their YC experience and own journey, is to **avoid overthinking the initial idea** and instead closely follow what users actually want. They advocate for talking to even a handful of early users intensely and being willing to pivot based on real demand, as they did when businesses reached out to them.

## Context

This interview is part of the 'YC Root Access' series, hosted by Jared, which features conversations with Y Combinator alumni and insiders. The guests, Cat and Zach, are former software engineers from YC's internal tools team, giving them a unique behind-the-scenes perspective on the accelerator's operations and a front-row seat to startup trends. Their journey is a masterclass in B2B startup pivoting, moving from a viral but low-retention consumer app to a deep enterprise solution by heeding customer feedback. This is highly relevant as AI voice agents transition from novelty to serious business tools, particularly in sales and customer service. The video is most valuable for aspiring founders interested in B2B SaaS, AI application development, and understanding how to navigate a major pivot based on market signals.
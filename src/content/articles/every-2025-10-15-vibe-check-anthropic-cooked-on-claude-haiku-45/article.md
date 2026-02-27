---
title: "Vibe Check: Anthropic Cooked on Claude Haiku 4.5"
author: "Every"
platform: "every"
publicationName: "Vibe Check"
url: "https://every.to/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked"
publishedAt: "2025-10-15"
tags:
  - "ai"
  - "news"
  - "analysis"
---

# Vibe Check: Anthropic Cooked on Claude Haiku 4.5

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

Anthropic just dropped [Haiku 4.5](https://x.com/claudeai/status/1978505436358697052)—Anthropic’s newest “small” (aka least powerful, and cheapest—Claude model, and it’s great. We got our hands on it early and put it through its paces.

This is the story of the new Haiku, which just jumped version numbers from 3.5 to 4.5: It’s almost as powerful as the new [Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5), faster, and much cheaper. And when I say almost as powerful, I mean it—I had a hard time telling the difference when testing it on complex queries like “given this P&L, analyze our Q3 performance.”

Here’s your day zero vibe check:

## **Everything you love about Sonnet 4.5 priced like Haiku**

It’s priced at $1 per $5 per million input and output tokens. For comparison, [GPT-5-mini](https://every.to/vibe-check/gpt-5) is about $0.25 per $2.50 per million input and output tokens—and [Gemini 2.5 Flash](http://every.to/vibe-check/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash) is around the same. So Haiku 4.5 *still* costs about four times more than GPT-5 mini or Flash.

But it’s about three times cheaper than Sonnet 4.5, and it performs surprisingly close to as well. That makes it a gift for developers.

## **Your agentic apps just got an upgrade**

If you’re a developer building an agent, Claude models are the premium option. They’re the best at tool calling and running for long periods of time without going off the rails. But Sonnet 4.5 is *really* expensive.

When it first came out, we used Sonnet 4 in **[Cora](https://cora.computer/)**’s email assistant, and it rocked. Then we got our Anthropic bill that month, and COO **[Brandon Gell](https://every.to/@brandon_5263)** told us that Every would go out of business if we didn’t figure out how to make it work with GPT-5-mini.

But as of today, we’ve switched back to Haiku because it works incredibly well inside of Cora, and it’s not priced like beluga caviar.

Dan Shipper's Cora Assistant running on Haiku 4.5. (Source: Dan Shipper/Every.)

Cora general manager **[Kieran Klaassan](https://every.to/@kieran_1355)** tested Haiku head-to-head against GPT-5-mini on agentic search queries inside of Cora. Haiku was 44 percent faster than GPT-5-mini (on the priority tier)—returning responses to questions like, “How much did I spend on Ubers in Guadalajara?” and, “What was my first ever email?” in an average of 19.7 seconds versus 28.3 seconds for GPT-5-mini (Priority tier).

Response time of frontier models on complex agentic queries. (Source: Kieran Klaassen/Every.)

#### **Chat built for how teams actually work**

Team chat hasn’t changed much in a decade. It’s still cluttered, disconnected, and hard to focus in.

Glue is rethinking what chat can be if AI is built right into the conversation. Glue AI connects directly to your tools through MCP, so your team can plan, collaborate, and take action without switching context or losing focus.

Most chat tools were built for a pre-AI world. Glue is built for what’s next. Try it free.

[Get a free trial of Glue](https://glue.ai/?utm_campaign=series_a_announcement&utm_source=newsletter&utm_medium=influencers&utm_term=every&source=post_button)[Want to sponsor Every? Click here](/cdn-cgi/l/email-protection#1360637c7d607c61607b7a636053766576616a3d677c).

## **Duking it out in AI Diplomacy**

Claude Haiku 4.5 had an interesting performance in [AI Diplomacy](http://every.to/diplomacy), where we pit AI models against each other in a reimagined version of the classic strategy game. Overall, it ended up performing about as well as [Grok 4](https://every.to/vibe-check/vibe-check-grok-4-aced-its-exams-the-real-world-is-a-different-story) fast (non-reasoning) and GPT-5 with minimal reasoning—not one of the top performers but able to hold its own.

In the prompt impact leaderboard for Diplomacy, Haiku displayed tendencies that other small models (like GPT-5 Nano and GPT-OSS 20B) share, where the optimized prompts that lead to dramatic improvements for some of the bigger models led to degraded performance for Haiku.

That’s consistent with our overall take that it's a capable, cheap, fast model that can be a useful workhorse.

## **Where Haiku struggles: Math and sycophancy**

We found at least one notable instance where Haiku struggles. In the earlier example, where Kieran asked Haiku to add up his bill on Ubers in Guadalajara, Haiku did a great job of finding all of the relevant emails. However, it failed at the math:

Haiku 4.5 struggled doing basic math. (Source: Kieran Klaassen/Every.)

When Kieran pointed out the error, Haiku told him he was right—and then proceeded to make the same mistake again. We recommend sticking with GPT-5 mini for workloads where mathematical reasoning or lack of sycophancy is important—or equipping Haiku with a tool for math problems it encounters.

## **The final verdict**

If you’re a developer or founder building complex agentic apps with Sonnet 4.5, you should switch to Haiku immediately. You’ll save a lot of money and sacrifice very little performance.

If you’re building on Gemini 2.5 Flash or GPT-5-mini, we highly recommend trying out Haiku. While it’ll cost more, it will return better responses for use cases that require tool calling and autonomy.

With the release of Sonnet 4.5—which beat [Opus](https://every.to/vibe-check/vibe-check-genie-3-claude-4-1-gpt-oss-and-gpt-5) at coding tasks—and now Haiku, Anthropic is perfecting packing its frontier intelligence into smaller and smaller form factors. Developers are reaping the benefits.

* * *

*Want to learn Claude Code hands-on? Join us for a one-day* ***[Claude Code for Beginners](https://claude101.every.to/)*** *course on November 19. [Dan Shipper](https://every.to/@danshipper) will walk you through setup, basic commands, and practical workflows you can use immediately—no coding experience required. The course launches* ***tomorrow****, and early bird pricing of* ***[$1,000 per person](https://claude101.every.to/#details-pricing)*** *(which includes the price of an annual Every subscription) is now live. Existing Every paid subscribers get our* ***lowest-ever price of $712****.*

* * *

***[Dan Shipper](https://arc.net/l/quote/vbxyejuz)*** *is the cofounder and CEO of Every, where he writes the [Chain of Thought](https://every.to/chain-of-thought) column and hosts the podcast [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). You can follow him on X at [@danshipper](https://twitter.com/danshipper) and on [LinkedIn](https://www.linkedin.com/in/danshipper/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

***[Kieran Klaassen](https://every.to/@kieran_1355)*** *is the general manager of [Cora](https://cora.computer/). Follow him on X at [@kieranklaassen](https://x.com/kieranklaassen) or on [LinkedIn](https://www.linkedin.com/in/kieran-klaassen/).*

***[Alex Duffy](https://every.to/@AlxAi)*** *is the cofounder of [Good Start Labs](https://goodstartlabs.com/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with [Spiral](https://spiral.computer/?utm_source=everyfooter). Organize files automatically with [Sparkle](https://makeitsparkle.co/?utm_source=everyfooter). Deliver yourself from email with [Cora](https://cora.computer/). Dictate effortlessly with [Monologue](https://monologue.to/).*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

[Subscribe](https://every.to/subscribe?source=post_button)

#### What did you think of this post?

[Amazing](/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked/feedback?rating=amazing) [Good](/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked/feedback?rating=good) [Meh](/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked/feedback?rating=meh) [Bad](/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked/feedback?rating=bad)
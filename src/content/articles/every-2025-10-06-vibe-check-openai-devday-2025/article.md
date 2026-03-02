---
title: "Vibe Check: OpenAI DevDay 2025"
author: "Every"
platform: "every"
publicationName: "Vibe Check"
url: "https://every.to/vibe-check/vibe-check-openai-devday-2025"
publishedAt: "2025-10-06"
tags:
  - "ai-general"
  - "analytics"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-01T21:19:30.575Z"
---

# Vibe Check: OpenAI DevDay 2025

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

Hello from San Francisco! This is your day zero vibe check from OpenAI’s third annual DevDay.

OpenAI launched three big things:

1.  Apps in ChatGPT with AppsSDK
2.  AgentKit, a no-code agent builder
3.  New models in the API: GPT-5 Pro, Sora 2, and a voice model

We held a live watch party for paid subscribers—about 50 of you attended the whole way through—and this was the reaction at the end:

Source: Every Discord.

Overall, it was a solid day on a few fronts, but it was missing some of the mind-blowing moments for developers of DevDays past. [Last year’s DevDay](https://every.to/chain-of-thought/everything-openai-launched-at-devday), for example, came right after the launch of OpenAI’s [first reasoning model, o1](https://every.to/chain-of-thought/openai-s-o1-model-explained), and featured the launch of the Realtime API. In 2023, the company launched GPT-4 Turbo and custom GPTs (more on the latter below).

Maybe it’s a sign of how much the goalposts have moved, but this year’s DevDay felt a little more like OpenAI doubling down on existing opportunities than it was pushing the frontier of the future.

Let’s get into the updates.

## Talk to your apps in ChatGPT

**What it is:** AppsSDK, a set of tools (or software developer kit) for developers to build apps *inside* of ChatGPT instead of as stand-alone apps.

**What it does:** Users can chat with apps—like Figma, Zillow, or Spotify—without ever leaving the ChatGPT interface.

Building apps in ChatGPT. Source: OpenAI (https://openai.com/index/introducing-apps-in-chatgpt/).

**Our take:** This is the third time that OpenAI has launched an app store concept. In March 2023, it was ChatGPT plugins, which allowed ChatGPT to call third-party apps from inside the app. They were exciting at the time, but adoption was poor.

In November 2023, it was custom GPTs, and a few months later a custom GPT app store (basically a directory of custom GPTs for anyone to use). This was significantly more popular than plugins, but OpenAI didn’t continue to update custom GPTs.

Now, it’s apps in ChatGPT, which looks like a move back to the original plugins concept. Both are effectively attempts to allow you to use third-party apps inside of the ChatGPT interface. It is the closest they’ve been to getting the app store right, but the key question is going to be performance.

As a day-to-day user, I will only use an app inside of ChatGPT if it is *at least as fast* as using that app in a separate interface. I know this because we’ve been experimenting with experiences like this for some of our products. For example, we built an alpha feature for **[Sparkle](https://makeitsparkle.co)** that allows you to search the files on your computer from within Claude. You might input, “Grab the contract I just downloaded and summarize what it says,” without switching out of Claude.

This seems like a good idea in theory, but in practice, it’s so much faster to use the Sparkle native app to find a file. No one used the feature, so we didn’t ship it.

Another problem is the company’s launch strategy. Apps in ChatGPT are currently limited to only a few big OpenAI partners, like Canva, Coursera, Figma, and Spotify. OpenAI is promising to open up the tools for other approved developers later this year, but I worry that it’s slow-rolling the discovery of good use cases by limiting access to big companies that are not AI-first.

Open it up, Sam!

#### **Your AI is a Notion power user**

Notion Agent fulfills the real promise of AI: It actually finishes your work. That’s because it’s incredibly flexible. It can search across your workspace, build databases, edit pages, and learn your style. When you’re ready, tell it what you need, like "compile Q3 feedback into a report" or "update our project database.” Have it execute multi-step workflows that used to take days and automate pain-staking manual work into minutes.

[Try Notion Agent today](https://www.google.com/url?q=https%3A%2F%2Fntn.so%2FEveryAgent1&sa=D&source=post_button&ust=1759286270653189&usg=AOvVaw0RGleO_WN3GU6HjsxXgyh-)[Want to sponsor Every? Click here](/cdn-cgi/l/email-protection#790a0916170a160b0a1110090a391c0f1c0b00570d16).

## AgentKit: A feast for AI operations

**What it is:** A suite of tools that allows you to make agent workflows in a visual no-code builder and embed them directly in your own site.

**What it does:** If you’re an AI operations pro looking to streamline processes in your business—from customer service to accounts receivable—AgentKit lets you do that from within the OpenAI ecosystem.

**Our take:** OpenAI is coming for all of the developer-adjacent use cases that are becoming popular with the growing importance of AI operations. **[Cora](https://cora.computer)** general manager **[Kieran Klaassen](https://every.to/@kieran_1355)** observed that AgentKit isn’t so much an agent builder—which allows AI to go down many different paths to accomplish a goal—as it is a workflow builder, where a business user can define a specific end-to-end process for the AI to follow.

OpenAI has also built evaluations—aka [evals, or benchmarks](https://every.to/context-window/how-we-shape-ai-and-how-it-shapes-us)—directly into AgentKit. Evals embed trust in your AI system. Having them built in by default makes them essential and easy(er) to rely on, instead of an afterthought.

One of the tools within AgentKit is Agent Builder, which allows you to use chat to easily create a visual process workflow, such as to handle customer refund requests:

AgentKit. Source: OpenAI (https://openai.com/index/introducing-agentkit/).

This is a great move by OpenAI, and it’s one we’re likely to use immediately. We’re already building these kinds of workflows for customer service using a bunch of hacked-together solutions from companies like Zapier and Gumloop.

Now that OpenAI has a version of this, we can’t *not* consider switching. It’s much easier to have everything in the same ecosystem.

## Nothing big from Codex

**What it is:** Codex, OpenAI’s coding agent, is out of research preview and now generally available. You can now call it from Slack, in addition to a few other small features for enterprise companies.

**Our take:** This is a snooze. The Codex team has been [shipping fast and hard](https://every.to/vibe-check/gpt-5-codex-knows-when-to-think-hard-and-when-not-to) ever since the [GPT-5](https://every.to/vibe-check/gpt-5) launch to catch up to Claude Code. It seems like there wasn’t much held in reserve for DevDay.

Codex CLI is my (Dan’s) daily driver for programming, so it was disappointing that there wasn’t more here.

## GPT-5 Pro, Sora 2, and a new voice model in the API

**What it is:** Developers can call OpenAI’s most powerful model, GPT-5 Pro; its new video creation tool, Sora 2 (stay tuned for a forthcoming vibe check); and a cheaper voice model—gpt-realtime-mini—in the API.

**What it does:** Its most powerful new models, which were previously only available in OpenAI-powered apps like ChatGPT and [Sora](https://every.to/vibe-check/vibe-check-openai-s-sora), are available to developers.

**Our take:** This was the biggest gift for developers from the whole day. GPT-5 Pro is a blessing for complex applications in programming, legal, healthcare, and more. And Sora 2 is a breakthrough for developers building creative tools or new social apps. Everything else at DevDay felt more targeted at AI operations and developer-adjacent users.

## Closing thoughts

#### **Dan’s take**

DevDay was a little boring for developers but very exciting if you’re an AI operations pro. I’m glad OpenAI is still pushing on the app store front—if Every had access to the AppsSDK, we’d build an app for ChatGPT.

I’m not convinced that this is yet *the* app store moment, but I like that they’re continuing to try. One thing that’s been lost in all of the feature announcements: OpenAI announced that ChatGPT went from 100 million weekly active users last year to 800 million this year—a truly astounding number.

#### **Alex’s take**

Where is the vision? And who is it for?

Generative AI is the closest thing we have to magic. But today felt more like pulling back the curtain to explain how it's done, instead of putting on a show and looking forward to what could be.

The moments that have felt the most special in technology to me have been those that present a vision of a possible future that's almost within grasp. The iPhone launch did this. This year’s [Google I/O](https://every.to/context-window/google-s-ai-vision-make-tech-human-again) also left me day-dreaming with a smile. Both posited a vision of a future radically changed by new technology.

By contrast, DevDay felt like we were looking backwards at what's been done, and what a few partners with early access did with a small team. It was, essentially, a coding demo. It may be because OpenAI is trying to build AI for everyone, but the company hasn’t yet found the problem that everyone has that it uniquely solves. Compare that to Anthropic's [new “thinking” brand campaign](https://x.com/swyx/status/1974723847455981868), which seems to have a way to inspire people from all walks of life.

OpenAI is shipping incredible work and has laid a great foundation that will compound: The primitives for “apps integrated into ChatGPT” and “agents with built-in evaluations” have been built; now the focus can shift to building with them to solve real problems. But today OpenAI seems stretched thin, and I yearn for more. I yearn for inspiration. A picture of the dream they’re chasing.

* * *

***Dan Shipper*** *is the cofounder and CEO of Every, where he writes the [Chain of Thought](https://every.to/chain-of-thought) column and hosts the podcast* [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). *You can follow him on X at [@danshipper](https://twitter.com/danshipper) and on [LinkedIn](https://www.linkedin.com/in/danshipper/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

***Alex Duffy*** *is the head of AI training at Every Consulting and a staff writer. You can follow him on X at [@alxai](https://x.com/alxai_)* *and on [LinkedIn](https://www.linkedin.com/in/alex-d/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://spiral.computer/?utm_source=everyfooter)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with* ***[Cora](https://cora.computer/)****. Dictate effortlessly with* ***[Monologue](https://monologue.to/)****.*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

[Subscribe](https://every.to/subscribe?source=post_button)

#### What did you think of this post?

[Amazing](/vibe-check/vibe-check-openai-devday-2025/feedback?rating=amazing) [Good](/vibe-check/vibe-check-openai-devday-2025/feedback?rating=good) [Meh](/vibe-check/vibe-check-openai-devday-2025/feedback?rating=meh) [Bad](/vibe-check/vibe-check-openai-devday-2025/feedback?rating=bad)
---
title: "Opus 4.5 Collapsed Six Months of Development Work Into One Week"
author: "Every"
platform: "every"
publicationName: "Chain of Thought"
url: "https://every.to/chain-of-thought/opus-4-5-collapsed-six-months-of-development-work-into-one-week"
publishedAt: "2025-12-04"
tags:
  - "ai"
  - "productivity"
  - "thinking"
---

# Opus 4.5 Collapsed Six Months of Development Work Into One Week

*If you want to learn more about Opus 4.5,* ***[Kieran Klaassen](https://every.to/@kieran_1355)*** *and I are hosting a Claude Code Camp on Opus 4.5 exclusively for paid subscribers on Friday (that’s tomorrow) at 12 p.m. ET. [Sign up and reserve your spot](https://every.to/courses/claude-opus-4-5-camp/purchase).—Dan Shipper*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

Humans have always had two main intuitions about what we’ll find when we travel to the end of the earth:

1.  An edge where the known world falls off into nothingness, chaos, or monsters
2.  A new vista where unexplored, lush, and perhaps perilous territory extends toward a new horizon

The first is terrifying, a place to be avoided. The second represents possibility and an entirely new world.

These days most new AI model releases are incremental. Sometimes, though, a new model brings us right up to the edge of the known and allows us to take a peek at what lies beyond. Is it nothingness, dragons, or a new horizon?

Anthropic’s [Opus 4.5](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for) is one of those models, and I’ve been peering over the edge for about a week now. Here’s what’s over the horizon:

1.  **We are in a new era of autonomous coding.** You can build astonishingly complex apps without looking at a single line of code.
2.  **Agent-native apps are now possible.** You can use Opus 4.5 as a general-purpose agent to power your app’s features. This turns new features into an exercise in prompt-writing, rather than coding.

## The infinite vibe coding machine

The first step change with Opus 4.5 is the amount of autonomous coding that is now possible.

Over the last week, I built an iOS reading companion app with a comprehensive suite of features. It’s the kind of thing that previous models could one-shot as a demo, but would start to trip over themselves after a while if I didn’t sit down and look at the code myself. I started writing the app with Anthropic’s [Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) and OpenAI’s [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent), but gave up pretty quickly because they were getting lost in loops of errors that I didn’t have time to debug.

Opus 4.5 is different. I didn’t write a single line of code. I didn’t even look at the code. I just talked into my computer with **[Monologue](https://monologue.to)**. And out came a complete reading companion.

I can photograph any book page, and it identifies the work, analyzes the passage, and connects it to larger themes—with zero clicks. I can tap a character name for a spoiler-free summary of everything the character has done so far in the book. It even automatically researches and downloads the original text (if the book is in the public domain) plus academic secondary sources to help with its analysis, and writes a custom introduction for each book to tell me why I might be interested in it.

This reading companion app would have taken three to six months of developer work pre-AI. (GIF courtesy of Dan Shipper.)

It does more than this but *phew*. That is a *lot*. And let me remind you: I have no idea how the underlying code works, I did not get stuck in an infinite loop of errors, and generally the app is pretty much ready for people inside of Every to start testing.

My estimate is that, pre-AI, this would be three to six months of developer work. Pre-Opus 4.5, a full-time developer would have to focus on it for a month or so to get right, based on my experience. Today, it’s something I can do in my spare time between meetings.

But speedier, less error-prone, more autonomous coding is only half the story. What surprised me wasn’t just that I could build a beta-quality app in a week with Opus 4.5. It’s also *how* the app works under the hood. Because I didn’t just write the code with Claude—instead, Claude *is* also the code.

#### **Pitch like the pros, without the production time**

Need a great presentation but don’t have the time or resources? Try [Pitch](https://pitch.com/use-cases/ai-presentation-maker/?utm_medium=paid-influencer&utm_campaign=every), which helps you generate a deck in a fraction of the time. You’ll have access to everything you might need: designer-quality templates and brand libraries, cloud-based editing and comments, and high-quality video embeds. With their latest AI features, you’re now able to instantly adapt messaging, maintain brand tone, and upgrade visuals, all while keeping creative control. Win work with half the time spent.

[Try Pitch at pitch.com](https://pitch.com/use-cases/ai-presentation-maker/?utm_medium=paid-influencer&utm_campaign=every&source=post_button)[Want to sponsor Every? Click here](/cdn-cgi/l/email-protection#7605061918051904051e1f060536130013040f580219).

## Agent-native apps

Opus 4.5 now lets us build features from prompts, not code. This is the second biggest breakthrough—a shift that will unlock a new category of what I call “agent-native apps.”

Writing a traditional application is like writing a recipe. For every feature, you spell out each step in excruciating detail: First do this, then check for that, handle this edge case, then return your result. The computer follows your instructions exactly—so you have to think of everything.

Agent-native development inverts this entirely. Instead of writing the recipe, you hire a chef, Opus 4.5. When a user puts in an order, the chef figures out how to make it.

The core of a agent-native app is a general-purpose agent powered by Opus 4.5. Each feature of your app (like the passage analysis function from my reading companion) is just a prompt that tells Opus what you want it to accomplish, and gives it a set of tools that it can use to get there, like web search or access to your photo library. For example, you might tell the agent “analyze this book passage without spoilers”—and it figures out how to do that.

To make this more concrete, let’s talk about an example from my reading app. One of my favorite features is the reading profile: It automatically goes to your phone’s camera roll to identify books and articles you’ve been reading over the years from photos and screenshots. Then it uses those to write a guide for itself about what you like to read:

The reading companion app gives a profile of the user's reading habits based on screenshots. (Screenshot courtesy of Dan.)

Writing this as a traditional program would’ve been daunting. You’d need to write an algorithm to efficiently scan through a gigantic photo library, identify photos that are *likely* to contain text, convert them from images to text, collect them, and summarize them into a coherent, interesting synthesis. Each of these steps is complex, and putting them into sequence is complex. As a result, the code they’re written in is brittle. If the requirements change—say, you also want to scan PDFs or pull in newsletters from my email—you’re looking at a *lot* of work.

A agent-native app is different. Because the app is really a general purpose agent, if you want to pull in newsletters from email, you give the agent access to your inbox and update the prompt to say, “Also look for Substacks and newsletters.” The agent will probably do this poorly the first time you test it, but that’s okay because you can improve it just by editing your prompt until it works.

Agent-native apps are not totally new—I consider Claude Code the paradigmatic example of a agent-native app. Most of its core functionality, like slash commands and [subagents](https://every.to/vibe-check/vibe-check-claude-s-new-agents-are-confusing-as-hell), are really just prompts, cleverly disguised as simple features. This is what makes it so powerful.

Opus is the first model reliable, quick, and powerful enough to make being agent-native accessible for a broad range of software.

## What agent-native apps tell us about the future of software

Agent-native apps are [inherently flexible and extensible](https://every.to/chain-of-thought/what-comes-after-saas). It’s much easier to rewrite or add prompts than it is to modify or add code. You can move more quickly when you’re in the early stages of application development because it’s easier to code features in the first place *and* change them in response to feedback.

Now, your *users* can modify and discover new features on their own—after all, if features are just prompts, all your users need to add or change themis the [ability to write English](https://every.to/chain-of-thought/i-spent-24-hours-with-github-copilot-workspaces)[.](https://every.to/chain-of-thought/i-spent-24-hours-with-github-copilot-workspaces) This is going to be a core feature of software in the [allocation economy](https://every.to/chain-of-thought/the-knowledge-economy-is-over-welcome-to-the-allocation-economy): Instead of sending in bug reports, hardcore users will send in updated prompts (or perhaps even full features) to help improve the software they love.

Of course, this doesn’t mean *all* code goes away. The tradeoff of a agent-native architecture is speed, predictability, and cost. Each time someone uses a feature in your app, it’s calling an agent to do work—which costs money and takes time. And everyone who uses AI knows that sometimes the same prompt produces wildly different results.

Over time, these tradeoffs will improve—the costs of using models are dropping rapidly, as speed is increasing dramatically. But rather than either-or, I think agent-native will be where many features start, and they will be hardened into code over time as they stabilize. Developers can use prompts to explore and iterate; once a feature’s requirements stop changing, it can crystallize them into traditional code for speed and cost savings.

I’ll have more on Opus 4.5 and agent-native apps over the next few weeks. But for now I’ll leave you with this:

If you haven’t taken time to explore this new world yet, it’s a good time to start walking. There are fewer dragons than you think, and the view is beautiful over the horizon.

* * *

***[Dan Shipper](https://every.to/@danshipper)*** *is the cofounder and CEO of Every, where he writes the [Chain of Thought](https://every.to/chain-of-thought) column and hosts the podcast* [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). *You can follow him on X at [@danshipper](https://twitter.com/danshipper) and on [LinkedIn](https://www.linkedin.com/in/danshipper/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://writewithspiral.com/)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with* ***[Cora](https://cora.computer)****. Dictate effortlessly with [Monologue](https://monologue.to).*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

*For sponsorship opportunities, reach out to [\[email protected\]](/cdn-cgi/l/email-protection).*

[Subscribe](https://every.to/subscribe?source=post_button)

#### What did you think of this post?

[Amazing](/chain-of-thought/opus-4-5-collapsed-six-months-of-development-work-into-one-week/feedback?rating=amazing) [Good](/chain-of-thought/opus-4-5-collapsed-six-months-of-development-work-into-one-week/feedback?rating=good) [Meh](/chain-of-thought/opus-4-5-collapsed-six-months-of-development-work-into-one-week/feedback?rating=meh) [Bad](/chain-of-thought/opus-4-5-collapsed-six-months-of-development-work-into-one-week/feedback?rating=bad)
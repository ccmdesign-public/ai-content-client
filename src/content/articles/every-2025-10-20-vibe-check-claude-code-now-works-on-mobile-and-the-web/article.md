---
title: "Vibe Check: Claude Code Now Works on Mobile and the Web"
author: "Every"
platform: "every"
publicationName: "Vibe Check"
url: "https://every.to/vibe-check/vibe-check-we-spent-a-weekend-trying-to-code-from-our-phones"
publishedAt: "2025-10-20"
tags:
  - "ai"
  - "news"
  - "analysis"
---

# Vibe Check: Claude Code Now Works on Mobile and the Web

*Claude Code has been transformative for us at Every, so I’m teaching a [course](https://claude101.every.to/) for on getting started and using it for beginners—no coding experience required. Join me on* ***November 19*** *for a [live, full-day workshop](https://claude101.every.to/) where you’ll install Claude Code on your machine and build an app end to end. Early bird pricing is $1,000 (and includes an annual Every subscription) until October 23. [Learn more](https://claude101.every.to/) and save your seat.—[Dan Shipper](https://every.to/@danshipper)*

[Register for Claude Code for Beginners](https://claude101.every.to/?source=post_button)

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

I'm in San Francisco for back-to-back conferences. **[Kieran Klaassen](https://every.to/@kieran_1355)** is chasing toddlers and going on car trips upstate. **[Danny Aziz](https://every.to/@dannyaziz97)** is in the middle of a cycling expedition. This is when we need AI coding tools that work from anywhere—when life is happening and the laptop isn't always within reach.

I’ll admit that I've been using OpenAI's Codex for most of my coding lately, but Kieran still swears by Claude Code, running multiple instances in parallel as part of his [compounding engineering](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) workflow. So when Anthropic gave us early access to the cloud and mobile version of Claude Code that just launched, we all carved out time to test the same promise: Can you actually run Claude Code from your phone? Can you assign it a coding task while you're away from your desk and pick it up later? Does "anywhere" truly mean anywhere?

Coding manually from your phone has been possible in *theory*, but tiny screens, clumsy keyboards, and not having anywhere to run and test your code mean that I don’t really use it much. Danny (general manager of **[Spiral](https://spiral.computer)**) has his own Claude Code setup running on a server that seems to work for him, and **[Monologue](https://monologue.to)** general manager **[Naveen Naidu](https://every.to/@naveen_6804)** uses Codex on the web to handle small papercut bug fixes.

But the dream is being able to kick off a Claude Code session on my laptop and then keep it running in the cloud when I go to a meeting. So my question was: Is Anthropic's cloud and mobile version the one that finally delivers?

Short answer: Not yet.

We spent the weekend testing across three different real-world scenarios, and while the underlying idea is sound, it’s not something we’d use every day yet. It feels very much like Codex on the web: You can begin a task on web or mobile, it runs your code in a virtual machine, and you can keep chatting with it as it does its work. But getting the cloud environment to handle our setup was a pain, the mobile app lacks important features like inline code diffs, and most importantly, you can’t kick off a task on your computer and then transition it to the cloud.

A caveat: This version is a work in progress. Anthropic is leaning into AI's new normal—ship early, iterate fast, improve in public. What we tested will likely be better by the time you read this, and better still in a few weeks. When we shared our feedback with the team (as we do when we’re given these advance previews), they responded immediately and are actively fixing many of the issues we hit like our problems with the cloud environment. So while in its current state, we won’t reach for it every day, we feel excited about where it could be in a few weeks or months.

## So what’s new?

The cloud and mobile version of Claude Code is Anthropic's answer to remote coding. Like [OpenAI’s coding agent](https://every.to/chain-of-thought/vibe-check-codex-openai-s-new-coding-agent) [Codex](https://every.to/chain-of-thought/vibe-check-codex-openai-s-new-coding-agent), it promises to spin up virtual machines in the cloud with your codebase, letting you delegate coding tasks without keeping your laptop open.

Here's how it works. There’s a new tab in the Claude app labeled Code:

What you see when you boot up Claude Code on your mobile device. (Source: Dan Shipper.)

When you click it, you’re given a text field where you can describe what you want Claude to do:

What you see when you boot up Claude Code in your browser. (Source: Dan Shipper.)

It boots up a cloud environment with your repository, sets environment variables (like which domains it can access), and starts working. You can watch its progress, see its to-do list, and—here's where it differs from Codex—keep chatting with it while it works. In Codex, you have to stop execution to talk to the agent. Claude Code's interface treats it as an ongoing conversation.

Normally, when you run Claude Code on your laptop, the AI needs your computer to stay on and connected; it's using your machine's processing power and your local copy of the code. "Cloud" means Anthropic runs everything on its remote servers instead. Your code lives there, the AI runs there, and the work happens whether your laptop is open or not. You can check progress from your phone, pick up where you left off from a different computer, or just walk away while Claude keeps working.

Existing AI-powered coding tools like Codex and Replit already promise cloud execution and mobile access. But Codex can't hold a conversation while your code runs, and Replit's mobile app is plagued with blank screens and keyboard failures. If Claude Code Cloud could nail both—let you chat with it mid-execution *and* deliver a mobile experience that works—it would solve the two biggest pain points in the category.

For this vision to deliver on its promise, it needs a few core ingredients:

1.  **True mobile access**. The app needs to let you browse code repositories, initiate tasks, and check on your progress from your phone. Otherwise, you're back to being chained to your laptop.
2.  **Workflow portability**. Your custom Claude Code slash commands (quick shortcuts like /review or /work that trigger specific actions) and agents (specialized AI workers with designated roles) should work identically in the cloud version, so your carefully crafted local workflows translate. Otherwise, where’s the efficiency gain?
3.  **Seamless handoffs**. You should be able to start a task on your laptop, close it, and let Claude keep working in the cloud while you live your life, then check progress from your phone later. Without that, you're still tethered to one device at a time, defeating the whole "work from anywhere" premise.

That’s the bar. Now let’s look at how well it meets it.

## **The gap between concept and execution**

In practice, almost every one of those core ingredients Claude Code needs to bring this promise to life breaks down when you try to use them. The list of blockers is long enough that two of us gave up trying to use it for practical work, like fixing user-reported bugs. These aren't minor issues—they're fundamental problems that make the tool unusable for anything beyond experimentation.

**Environment setup is broken.** Kieran hit this immediately: The virtual machine doesn't have Ruby (the programming language **[Cora](https://cora.computer)** uses) installed by default, and there's no clear way to install the programming languages, packages, and tools your code needs to run. Every coding agent—Codex, [Devin](https://every.to/chain-of-thought/coding-with-devin-my-new-ai-programming-agent), [Cursor](https://www.cursor.com/)—struggles with this, but it's especially frustrating when you can't even get started. Anthropic told us they're adding Ruby and PHP (another programming language) as default options for launch, though broader dependency management remains an ongoing challenge. We think this will be among the first things to be fixed.

**Network restrictions kill productivity.** There's no "YOLO mode" to whitelist all domains. Claude Code Cloud can't autonomously reach external APIs or download packages without explicit permission for each domain. (Codex, by comparison, can.) Kieran tried to whitelist all the services he needed—package registries, APIs, databases—and it didn't work. When your code needs to reach external APIs or download packages (pre-built code libraries that add functionality), these restrictions become dealbreakers. The team acknowledged they're working on the whitelisting issues Kieran mentioned but didn't provide a timeline.

Kieran ran into network restriction issues when he tried to set things up to work on Cora (Source: Kieran Klaassen.)

**The iOS app is buggy.** It freezes when you open the keyboard. It breaks when you rotate your phone. If you hold it horizontally and flip it back to vertical, you have to manually scroll for a long time to get back to where you were—there's no "jump to bottom" button. You can't paste images. The slash command autocomplete doesn't work.

**The handoff feature is too buggy to use.** This is the most painful gap. Anthropic built "teleport"—a feature that lets you move tasks between local and cloud environments—but it's so buggy it's effectively unusable. For a tool promising seamless work-from-anywhere, broken handoffs kill the core value proposition. When we raised this, the team said "more soon.”

Handoff between local and cloud is unreliable. (Source: Kieran Klaassen.)

**It's more barebones than Codex.** You can't see side-by-side comparisons of code changes in the app. Status updates are minimal. It feels like an alpha prototype next to Codex's polished interface, despite Claude being the stronger underlying model.

**Even when it works, limitations remain.** Danny had success with tasks in JavaScript, the coding language Spiral's web app is built in. All the work went smoothly, but even so, Danny hit a limitation: You can't validate your work on mobile—that is, you can’t confirm whether the code works. You're always stuck at 90 percent, unable to load the app. And if you're already at your desk with a laptop, you can run Claude Code locally and spin up as many [parallel instances](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) as you need. The mobile-first value proposition sounds appealing until you realize that serious work still requires a full development environment.

## **The Reach Test**

##### **Dan Shipper** (technical tinkerer CEO): 🟨 **Situational**

I tried using it for research tasks, feeding it my **[Wittgenstein](https://en.wikipedia.org/wiki/Ludwig_Wittgenstein)** reader project and asking it to find relevant quotes. The conversational interface is genuinely better than Codex's more regimented approach. But I haven't reached for it again. It's not reliable enough to replace anything in my current stack. I *am*, however, genuinely excited by this direction and expect it to be good enough to be a daily driver in short order.

##### **Danny Aziz** (**[Spiral](https://spiral.computer)** general manager): 🟩 **Works well—with limits**

All the JavaScript work went smoothly. The tool itself works. But his gripe with agentic coding in general is that he can never finish anything on his phone because he can't load the app and validate it works. It's good for quick bug fixes and long research sessions where you don't want to hold things up while you're on the move. But you can't launch a feature from your phone.

##### **Kieran Klaassen** (Cora general manager): 🟥 **Skip it (for now)**

Kieran got excited when he received the invitation to try it, but in practice it was a letdown. Too many blockers: Environment setup failed, network restrictions blocked necessary domains, and the iOS app kept freezing. The idea is perfect for his workflow, but the execution isn't close.

## **The final verdict**

Anthropic is trying to solve a real problem with this release. The dream of starting a coding project from your home computer, then picking it up on your iPhone while you’re on the go, would open up genuinely exciting possibilities for the way we integrate work into our lives.

But dreams require execution. Right now, this feels very much like a research preview. Even Kieran—who loves Claude Code and has built his entire [compounding engineering](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) workflow around it—isn’t sold yet.

That said: Building new things is hard, and Anthropic is intentionally shipping fast with this. Even if it’s not a daily driver today, we expect it to improve rapidly—and we’ll be covering it as updates are released.

* * *

***Dan Shipper*** *is the cofounder and CEO of Every, where he writes the [Chain of Thought](https://every.to/chain-of-thought) column and hosts the podcast* [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). *You can follow him on X at [@danshipper](https://twitter.com/danshipper) and on [LinkedIn](https://www.linkedin.com/in/danshipper/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

***Katie Parrott*** *is a staff writer and AI editorial lead at Every. You can read more of her work in [her newsletter](https://katieparrott.substack.com/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://spiral.computer/?utm_source=everyfooter)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with* ***[Cora](https://cora.computer)****. Dictate effortlessly with* ***[Monologue](https://monologue.to)****.*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

[Subscribe](https://every.to/subscribe?source=post_button)

#### What did you think of this post?

[Amazing](/vibe-check/vibe-check-we-spent-a-weekend-trying-to-code-from-our-phones/feedback?rating=amazing) [Good](/vibe-check/vibe-check-we-spent-a-weekend-trying-to-code-from-our-phones/feedback?rating=good) [Meh](/vibe-check/vibe-check-we-spent-a-weekend-trying-to-code-from-our-phones/feedback?rating=meh) [Bad](/vibe-check/vibe-check-we-spent-a-weekend-trying-to-code-from-our-phones/feedback?rating=bad)
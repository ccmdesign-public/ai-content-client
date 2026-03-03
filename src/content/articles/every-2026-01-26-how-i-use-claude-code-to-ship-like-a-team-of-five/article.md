---
title: "How I Use Claude Code to Ship Like a Team of Five"
author: "Every"
platform: "every"
publicationName: "Source Code"
url: "https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa"
publishedAt: "2026-01-26"
tags:
  - "software"
  - "engineering"
  - "coding"
---

# How I Use Claude Code to Ship Like a Team of Five

***[Kieran Klaassen](https://every.to/@kieran_1355)****, the general manager of Every’s AI email assistant* ***[Cora](https://cora.computer/)****, coined the term compound engineering—the practice of using AI agents to build software systems that get smarter with every task. While we’re on our Think Week offsite this week, we’re resurfacing his work on this theme, which encapsulates one of the biggest shifts in software development. In this first piece, he reveals how his role as a developer has changed from writing code to managing code-writing agents. Plus: The custom commands and frameworks that enable one person to ship like a team.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

Every piece of code I’ve shipped in the last two months was written by AI. Not assisted by AI. Written by AI.

[Claude Code](https://every.to/context-window/vibe-check-claude-3-7-sonnet-and-claude-code) opens 100 percent of my pull requests, and I haven’t typed a function in weeks. And I’m shipping faster than ever.

In February, I watched Claude Code burn through $5 in tokens to make a simple change in the code of **[Cora](https://cora.computer/)**, our AI-powered email assistant—something that I could have typed myself for free in 30 seconds. It was like hiring a Michelin-caliber pastry chef to butter toast. I wrote it off as an expensive toy.

Now that it’s included with a Claude subscription, it’s turned me from a programmer into an engineering manager overnight, running a team of AI developers who never sleep, never complain about my nitpicks, and occasionally outsmart me.

Claude Code is the first tool that makes everyday coding genuinely optional. The mundane act of typing out implementation details is becoming as obsolete as manual typesetting. What remains valuable is having a perspective on system architecture, taste, product thinking—the uniquely human skills that turn good software into great products. Claude Code makes this shift practical: You define the outcome; it handles the implementation.

The shift from doing the work to directing it changes how we make software. Instead of planning implementation details, we’re designing product specifications and code outcomes. Clear communication and system thinking matter more than memorizing syntax or debugging tricks. Features that took a week to code ship in an afternoon of thoughtful delegation. This is a different way of building software entirely.

#### **Build practical AI agents**

A live, 2-hour workshop for founders, operators, and professionals who want to move beyond experimenting with AI and start building working AI agents. Led by MindStudio director of product **Luis Chavez-Mattos**, the session is hands-on and focused on building AI agents for real workflows across product, operations, marketing, sales, and more.

February 4 @ 12 p.m. PT · Live on Zoom

[Sign up for the workshop](https://luma.com/ifqjhspr?tk=f2pqEJ&utm_campaign=every&utm_medium=email&utm_source=every&source=post_button)[Want to sponsor Every? Click here](/cdn-cgi/l/email-protection#3645465958455944455e5f464576534053444f184259).

## **Multi-step debugging like a senior engineer**

I understood what’s special about Claude Code when I encountered the kind of problem that would make most developers cry.

Our solid queue jobs—the background workers that clean up data and handle tasks while the app is running—had stopped doing their job: The queue would grow out of control and Cora would crash. But everything looked perfect: The code was correct, the logs showed nothing wrong. Even Claude Code was initially stumped.

At some point I told Claude Code: “If you cannot figure this out, probably it’s related to something on production, ” the live environment where users interact with our app, not our development setup where we test changes.

I asked Claude Code to look into the source code of the Ruby gem, a third-party code library we were using as part of the Cora app. It methodically walked through thousands of lines of someone else’s code, step by step, and discovered something we’d have never found otherwise: The jobs were trying to line up under a different queue name in production, like packages being sent to the wrong warehouse. I might have been able to find it myself, after hours of digging through unfamiliar code. But Claude Code turned what could have been a daunting archaeological expedition into a guided tour, and we worked through the problem together. The AI did the research and dug through the source code, and we jointly came to the conclusion.

As it turned out, there was no bug in our code. It was a mismatch between our development setup and the live website. But being able to work through that systematically was a breakthrough.

## **From programmer to orchestra conductor**

Claude Code’s superpower is parallel processing—the ability to work on multiple tasks simultaneously without getting confused or mixing up contexts. My monitor looks like mission control: multiple Claude Code tabs, each working on different features through separate git worktrees, meaning I can have Claude modify five different versions of our codebase simultaneously and get clean, review-ready code.

Running four parallel Claude Code agents in Warp, an AI-enabled terminal, doing different work at the same time. Source: The author.

In order to function like this successfully, you have to unlearn how you code. You need to think more like an engineering manager or tech lead rather than an individual contributor. The mental shift is profound. Instead of thinking about files and functions—the letters and words of code— you think about the story you’re trying to tell, the feature specifications you need to give it, and the outcomes you’re looking for. You want to remove yourself as a micromanager of your own code and adopt a stance of trusting your team—with proper checks and balances like code reviews and tests, of course.

This shift matters most when you’re running on fumes. “My brain is dead but this is the issue” is a prompt I’ve used with Claude Code after a long day, and it works. Every small decision (“should this variable be called ‘user’ or ‘customer’?”) drains mental energy. By day’s end, you’re making important architectural decisions on 5 percent battery.

Claude Code lets you offload the implementation details when you need your remaining focus for the hard problems, or when you just need to step away and let your subconscious work.

## **The friction factor: Why I use Claude Code every day**

Plenty of AI tools write code. Claude Code is unique because of what it doesn’t make you do.

Compare Claude Code to the alternatives:

1.  Integrated development environments (IDEs) like **Cursor, Windsurf, and Copilot** require you to work within their special editor rather than any terminal you choose.
2.  **Agentic coding platforms** like **Devin and Codex** want you to use their specific web interface, as opposed to an app that you download on your computer, and are more opinionated about autonomous coding.
3.  **AI chat interfaces** like **ChatGPT and Claude.ai** are great for deep research and discussing code, but they’re conversationalists, not doers.

Claude Code isn’t locked to any particular environment, either. It adapts to your existing workflow, whether that includes git worktrees, command line interface (CLI) tools (the system that lets you type instructions to your computer), or terminal management tools like tmux (the specialized tools developers use to juggle multiple tasks). There are none of the usual developer headaches, like extensions or formatters to install.

When I need to submit code for review, I don’t navigate menus or remember keyboard shortcuts. I say “PR” into my AI dictation tool and it handles everything: creating the branch (a separate version of the code for my changes), writing commit messages that explain what I did and follow our conventions, generating a description that matches our team’s style guide, and opening the pull request.

My most-used commands are simple:

1.  [/issues](https://gist.github.com/kieranklaassen/476129ef3fea7e6b72bbf70a833b1eb0) researches and creates an issue in GitHub.
2.  [/work](https://gist.github.com/kieranklaassen/02b28d4ca0d4525ae0e5d6edb685bd5d) picks up a GitHub issue, follows the instructions, and creates a pull request.
3.  /review reviews the pull request and makes any suggestions to improve.

The friction of researching, coding, and creating a pull request, complete with description and title, is reduced because the only thing you need to do is run a / command. It’s that simple.

## **The limitations (or: when Claude Code goes rogue)**

Claude Code has personality quirks. Sometimes it’s too smart for its own good, like when it [disables test conditions](https://x.com/Sauers_/status/1940817406571741510) just to make them pass, then proudly announces that the tests pass.

For simple tasks—like adding a to-do item or changing some copy—that I could do in seconds, it might overthink and overcomplicate, like asking a brain surgeon to put on a Band-Aid and getting a full medical workup. Claude Code often writes too many tests, trying to catch every edge case and testing the same functionality multiple times. Where a human would write one clean test, Claude Code might write five. It’s eager to prove it’s thorough, but the result makes the code difficult to maintain.

The code tests it writes can be excessive, with checks and verifications that feel like a junior developer trying to impress. And occasionally it either does the wrong thing or does more than I want it to—though hitting the escape key stops it immediately.

The upside is that Claude Code is not going to be annoyed by your nitpicks. Try asking a human developer to revise the same function five times based on increasingly specific style preferences. Claude will happily comply every time.

## **For junior developers: Your career just got a turbo boost**

In a world with Claude Code, junior developers will learn much faster and can do a lot more work.

I tell every junior developer to use Claude Code as your mentor who never gets tired of questions. Ask it:

1.  “What are the 10 things wrong with this pull request I just created?”
2.  “How would a Python engineer approach this versus a Ruby engineer?”
3.  “Why is Rust suitable for this issue versus Ruby?”
4.  “What are the common pitfalls for junior engineers in Ruby?”
5.  “Why are Ruby engineers so much cooler than TypeScript code jugglers?” (This last one is a joke.)

## **The real workflow: A morning with Claude Code**

**9 a.m.** Coffee in hand, I open my terminal and check our GitHub issues. There’s a bug that fails to open an email in [Cora](https://cora.computer/).

**9:05 a.m.:** I type into Claude Code: “Can you look at this bug report and reproduce it? Then, create a GitHub issue.” I watch as it spins up a test environment, reproduces the bug, gathers logs of what it’s doing, and creates a comprehensive issue with steps to reproduce the fix.

*How to reproduce bugs and create GitHub issues with Claude Code.*

**9:20 a.m.:** I open four more terminal tabs. In each one, I start a different Claude Code instance—it’s like opening a new Google Doc while the first is still open—and provide instructions:

1.  Tab 2: “[/work](https://gist.github.com/kieranklaassen/02b28d4ca0d4525ae0e5d6edb685bd5d) 234 Take GitHub issue #234 and implement the fix with tests”
2.  Tab 3: “Review all PRs from yesterday and ensure they follow our style guide”
3.  Tab 4: “Create a changelog for this week’s updates using our marketing language”
4.  Tab 5: “Investigate why our background jobs aren’t running in production”

*How to research a feature flag with Claude Code.*

**10 a.m.:** While all five instances are working, I review the PR that tab 2 just created. It’s already included tests, updated documentation, and even added error handling I hadn’t thought of.

*How to use Claude Code to review a pull request.*

**10:30 a.m.:** Tab 5 has discovered the email opening bug. Together, we explore Gmail’s technical documentation and the third-party code that bridges our app with Gmail’s services.

**11:00 a.m.:** I use my favorite shortcut: I type “PR” in each tab. Claude Code creates five separate pull requests, each with proper descriptions and linked issues, and following our team conventions.

**11:30 a.m.:** Time for human review. I check business logic, ensure the user experience makes sense, and add those nitpicky style preferences that make code feel like *our* code.

The beauty is that you can have Claude Code review a pull request made by a human and have a human fix the comments it provides. You can pick one comment for Claude Code to address or have it apply every change the engineer suggested.

**11:45 am**: With that task done, I go through feature requests and bug reports in Featurebase (where customers can give feedback) to find the next one. I use my custom Claude Code command, and model context protocol (MCP) integration—tools that let Claude Code read customer feedback, analyze patterns, and automatically create GitHub issues from the most important requests.

*How to use Claude Code to extract feature requests from a customer support portal, analyze, respond, and triage them, and then create GitHub issues.*

## **The final verdict**

My two-person team produces code like a much larger group. We spend $400 per month for two Claude Code subscriptions, and it pays for itself in days.

**The one-line pitch:** It’s having a colleague you can delegate clearly defined work to.

**Who should try:** Everyone, even non-technical people. My technically illiterate friends find it easier to use to write software than Cursor because the interface is simple.

**Who will love this:** Senior engineers tired of implementation details, tech leads who want to multiply their impact, anyone maintaining software who wishes they had three more of themselves, and non-technical founders held back by not knowing how to build.

**Getting started:** Start with the $20-per-month plan. Give it a real project, not a toy problem. Open your terminal, type what you want in plain English, and watch it work. For non-developers, try “Help me build a personal website.” For developers, type “PR” and prepare to reconsider what coding means—the work you do yourself versus delegate, how fast you can ship, and how big of a team you need..

**The learning curve:** You have to unlearn coding. Stop thinking in terms of files and functions. Start thinking about outcomes and delegation.

Welcome to the future. It runs in your terminal and waits to build whatever you imagine.

* * *

*Thanks to* ***[Katie Parrott](https://every.to/@katie.parrott12)*** *for editorial support.*

***[Kieran Klaassen](https://every.to/@kieran_1355)*** *is the general manager of* ***[Cora](https://cora.computer/)****, Every’s email product. Follow him on X at [@kieranklaassen](https://x.com/kieranklaassen)* *or on [LinkedIn](https://www.linkedin.com/in/kieran-klaassen/). To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://writewithspiral.com/)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with [Cora](https://cora.computer/). Dictate effortlessly with* ***[Monologue](https://monologue.to/)****.*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

*For sponsorship opportunities, reach out to [\[email protected\]](/cdn-cgi/l/email-protection).*

*Help us scale the only subscription you need to stay at the edge of AI. Explore [open roles at Every](https://www.notion.so/Jobs-Every-25cca4f355ac80c5ad6ee7a6e93d6b4e?pvs=21).*

[Subscribe](https://every.to/subscribe?source=post_button)

#### What did you think of this post?

[Amazing](/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa/feedback?rating=amazing) [Good](/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa/feedback?rating=good) [Meh](/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa/feedback?rating=meh) [Bad](/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa/feedback?rating=bad)
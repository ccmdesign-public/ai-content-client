---
title: "Stop Coding and Start Planning"
author: "Every"
platform: "every"
publicationName: "Source Code"
url: "https://every.to/source-code/stop-coding-and-start-planning"
publishedAt: "2025-11-06"
tags:
  - "software"
  - "engineering"
  - "coding"
---

# Stop Coding and Start Planning

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

AI made us sloppy because it made us forget how to plan.

Planning used to be a non-negotiable part of the work: sketching screens, prototyping flows, and writing problem statements. You had to define the scope—what’s in, what’s out, what’s too ambitious, and what solves the problem. Good planning required good thinking, good writing, and collaboration between stakeholders. It was slow, but it prevented expensive mistakes.

When [vibe coding](https://every.to/source-code/i-rebuilt-sparkle-in-14-days-with-ai) emerged, planning went out the window—at first. Why spend an hour planning when you could spend five minutes building the feature? I did it, too. “Make this feature work” was my entire instruction. Sometimes it worked. Often it didn’t. When it didn’t, I’d spend three hours debugging an error that a 10-minute session—asking AI to create a clear outline of the problem and the research needed to build a solution—would have prevented. And I’d be starting from zero with each feature I shipped, instead of the AI improving with each request.

When you vibe code, you prompt, “Add email validation to the signup form,” and hope the AI takes the right route. When you plan with AI, you write: “Research how we handle validation elsewhere in the codebase, check if our email library has built-in validation, look up best practices for user-friendly error messages, then create a plan showing three approaches with tradeoffs.”

One approach ships a feature. The other ships a feature *and* teaches the system how you think for next time. Get this right, and the system learns from every plan. Let me show you how.

#### **How people actually use AI**

Most AI coverage is hype and headlines. Dropbox’s new podcast Working Smarter goes deeper. It features real professionals using AI to focus on what they love—like Chef Ian Ramirez, who uses AI to handle repetitive menu planning so he can spend more time cooking and getting creative in the kitchen.

[Listen at workingsmarter.ai](https://blog.dropbox.com/podcast/working-smarter?source=post_button)[Want to sponsor Every? Click here](/cdn-cgi/l/email-protection#1b686b74756874696873726b685b7e6d7e6962356f74).

## Plans teach the system—code just solves problems

I had five screens of Figma designs staring at me, and a weekend to turn these pixels into a product.

We were preparing for the launch of **[Cora](https://cora.computer)**'s email bankruptcy feature—a free service that clears users’ inbox for them without deleting anything important. **[Lucas Crespo](https://every.to/@lucascrespo)** and **Daniel Rodrigues**, Every’s designers, had turned my ugly-but-functional flow into those beautiful Figma designs: something people would want to use, with clean layouts, thoughtful interactions, and the kind of polish that sets [software that delights](https://every.to/source-code/build-places-not-products) apart from software that works. Now I had to build it.

As recently as early 2025, that would have meant: Hook up the Figma MCP plugin (a tool that connects design files to code), watch it produce something vaguely related to the design but mostly ugly, then spend the weekend manually fixing it—squinting at measurements, guessing at spacing, writing HTML, refreshing the browser, noticing it’s wrong, adjusting, repeating. Days of work and frustration.

This time, instead of coding all weekend, I spent one hour that saved me days.

I created an AI agent with one job: Take a Figma design screenshot, analyze how to implement it, and output a detailed plan grounded in our patterns, components, and way of building.

My agent analyzed the Figma design and produced this implementation plan, automatically stored in GitHub. (All screenshots courtesy of the author.)

Once the plan was complete, I added a second agent to review the work: Compare the Figma screenshot to what got built using Puppeteer (a tool that automatically captures screenshots of web interfaces), note every difference, and keep iterating until they match. Because the plan was clear and detailed, the review agent could focus entirely on execution, instead of trying to figure out what we were even building.

I got five screens, pixel-perfect, including mobile layouts that were never even designed for. The plan guided the work step, and pixel perfection came out the other side.

The new email bankruptcy flow I built with help from my planning agent.

The next time we need to implement a complex interface, I won’t start from scratch. I’ll use the same system and the same planning workflow, and it will be faster because the system learned from this round.

This is [compounding engineering](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it): building systems where every unit of work makes the next one easier because you’re teaching the AI what to do. And the fastest way to teach is not through code you write, but through plans you review.

## **How to plan effectively: Remember the three fidelities**

The first step to planning effectively is recognizing that not everything deserves the same investment. I think about engineering work in three categories—what I call fidelities—based on complexity and clarity.

### **Fidelity One: The quick fix**

This is the one-line change, the copy update, the obvious bug fix. A button that’s the wrong color or a typo in an error message. Maybe a small bug where the fix is self-evident once you reproduce it.

As models improve, “quick fix” expands. With Claude [Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5), Fidelity One work now includes: changing pricing across the entire codebase, normalizing emails automatically, reorganizing code to remove unused features, fixing tests that accidentally broke, updating libraries and migrating dependencies (switching to newer versions of pre-built code tools you’re using), or resolving comments in a pull request (a batch of proposed code changes) when the feedback is clear enough. Six months ago this was multi-hour work. Today, it’s 10 minutes with a well-constructed plan.

I gave my planning agent an error message and three words: "Go fix it." It did the rest—creating the bug report, identifying the cause, and shipping the fix.

For these, planning is lightweight. Even a quick “reproduce the bug, confirm the fix location, check for similar instances” catches edge cases you’d otherwise miss.

### **Fidelity Two: The sweet spot**

This is where compounding engineering and the power of planning shines. These are features that span multiple files, require some refactoring, and have clear scope but non-obvious implementation. Things like: moving something performed inline (happening immediately when requested) to a background job (processing that happens separately, without making users wait), adding a new tool call (a specific action the AI assistant can take) or capability to the assistant (like archiving emails by query), or researching and reproducing bugs where you’re not yet clear what the actual problem is.

For Fidelity Two work, planning yields massive return on investment. The problem is complex enough that AI might go off the rails without guidance, but simple enough that once you have a good plan, AI can execute it reliably. This is where I spend most of my planning energy, and where the system learns fastest.

Recently, we needed to add the ability for Cora’s AI assistant to archive emails by query, so users could prompt “archive all emails from newsletters” and it would work. I could have prompted [Claude Code](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) directly: “Add an archive by query tool call.”

Instead, I had it research first: “How do our existing tool calls work? What’s our pattern for handling bulk operations? Are there any performance considerations with archiving many emails at once?”

I describe the problem and walk away. Multiple agents research in parallel and return 10-20 minutes later with a detailed plan.

The research revealed we already had a tool that interprets search requests that could be reused, and that we needed restrictions on how many requests you can make, because Gmail’s API (the system that lets other software interact with Gmail) has strict quotas on bulk operations. Without that research phase, I would have built something that worked in testing but failed when users tried to archive thousands of emails, because there are so many real-world use cases I would not anticipate. Once the plan was clear, the implementation took minutes. The 20 minutes spent understanding the problem saved hours of debugging production failures.

### **Fidelity Three: The big uncertain**

These are major features where you don’t even know what you’re building yet. Adding multi-account support. Rebuilding the high-level structure of how your code is organized. Integrating a complex third-party system. The requirements are epic, the scope is fuzzy, and no amount of planning will give you certainty because you’re still figuring out what “done” looks like.

For Fidelity Three, planning alone isn’t enough. You need a hybrid approach: rapid prototyping to clarify what you want, and rigorous planning to build it properly. I call this vibe planning—vibe coding, but for disposable software that helps you think. Spin up quick prototypes in a separate environment, click through them, learn what breaks, throw them away, and plan the real implementation based on what you learned. The prototype is disposable; the knowledge isn’t.

Sometimes you start with what looks like a Fidelity Two problem and realize mid-planning that it’s Fidelity Three. The email bankruptcy flow felt straightforward at first—add bulk operations so users could process, say, 53,000 emails at once. During the research phase, I discovered we couldn’t just call Gmail’s API in real time because of rate limiting and time constraints. We needed a cached version (storing data temporarily so we don’t have to fetch it repeatedly), highly optimized, with API rate limits carefully managed, and a way to handle failures gracefully when operations take minutes instead of seconds. The scope ballooned. I thought it would be a simple case of “add a feature.” It turned into ”redesign how we handle bulk operations entirely.”

Once I realized this was way bigger than expected, I switched approaches. I stopped trying to plan the perfect solution and instead built three prototypes with ascending levels of difficulty: one with real-time API calls, one with a simple cache layer (temporary storage for frequently used data), one with a full queue system (a line of tasks that get processed one at a time).

I didn’t want to add complexity. I went in hoping the first, most simple solution would work. Each prototype took a few days to build, and within a week it was clear what we had to build into the product. The real-time version choked on 1,000 emails. The simple cache had race conditions (bugs that happen when multiple processes try to access the same data simultaneously). The queue system was the only thing that worked. The prototypes convinced me that the complexity wasn’t optional—the simple solutions would break.

Those prototypes gave me enough clarity to break the problem down: Build the cache layer first, then add the queue system, then optimize the API calls. Each piece of the plan now had a specific job and clear success criteria. Instead of building one big feature, we broke it into separate, manageable parts: the caching layer, the marketing design, and the agentic flow. These were three distinct pieces that initially seemed like one monolithic feature. Trying to build everything at once created plans that were too big to execute. Breaking them into sequential steps made each piece shippable.

The goal with Fidelity Three is to break the project into multiple Fidelity Two pieces. You can’t plan your way through genuine uncertainty. But at least you can prototype your way to clarity, then plan your way to quality from there.

A prototype I created to explore and test a new Brief feature.

## **How planning creates lasting knowledge**

There is a difference between teaching AI through code versus teaching through planning. Coding teaches, “Here’s how to solve *this* problem.” Planning teaches, “Here’s how to think about problems *like this*.”

When Claude Code writes code based on your feedback, it learns the specific solution to one specific problem. The system creates plans, you react—“This is too complex” or “We need to sequence this differently”—and that feedback becomes permanent knowledge. Future plans automatically incorporate your preferences. AI learns your architectural thinking and applies it to every new problem.

For example, when I first had the Figma agent implement designs, it used plain HTML, which I didn’t want for a reusable design system. I corrected it: “Use View Components instead—that’s our component framework.” I codified that preference into the agent’s instructions. Now every design implementation starts with View Components by default.

In week one of working this way, plans would come back with approaches I’d never take—over-engineered solutions, missing obvious existing patterns, forgetting security checks. Three months in, plans come back largely reflecting how I’d approach the problem myself not because I’m prompting better, but because the system has learned from more than 50 plan reviews how I think.

Better AI models make the system better. [GPT-5](https://every.to/vibe-check/gpt-5) or [Claude Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) or whatever comes next will make better plans automatically.

But *your specific system* gets better because you’re accumulating institutional knowledge. Your agents know your preferences. Your research strategies know your domain. Your review process catches your common blind spots.

Planning is the highest-leverage activity in AI-assisted development. One hour spent improving your planning system makes every future hour more productive.

In the next piece, published tomorrow, I’ll share eight strategies that you can use for more effective planning, plus an experiment that you can use to become a better planner.

* * *

*Thanks to* ***[Katie Parrott](https://every.to/@katie.parrott12)*** *for editorial support.*

***[Kieran Klaassen](https://every.to/@kieran_1355)*** *is the general manager of [Cora](https://cora.computer/), Every’s email product. Follow him on X at [@kieranklaassen](https://x.com/kieranklaassen) or on [LinkedIn](https://www.linkedin.com/in/kieran-klaassen/).*

*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://spiral.computer/?utm_source=everyfooter)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with [Cora](https://cora.computer/). Dictate effortlessly with* ***[Monologue](https://monologue.to)****.*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

*For sponsorship opportunities, reach out to [\[email protected\]](/cdn-cgi/l/email-protection#d2a1a2bdbca1bda0a1babba2a192b7a4b7a0abfca6bd).*

[Subscribe](https://every.to/subscribe?source=post_button)

#### What did you think of this post?

[Amazing](/source-code/stop-coding-and-start-planning/feedback?rating=amazing) [Good](/source-code/stop-coding-and-start-planning/feedback?rating=good) [Meh](/source-code/stop-coding-and-start-planning/feedback?rating=meh) [Bad](/source-code/stop-coding-and-start-planning/feedback?rating=bad)
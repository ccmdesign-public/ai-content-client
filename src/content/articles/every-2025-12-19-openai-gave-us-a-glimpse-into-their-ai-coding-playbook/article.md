---
title: "OpenAI Gave Us a Glimpse Into Their AI Coding Playbook"
author: "Every"
platform: "every"
publicationName: "Source Code"
url: "https://every.to/source-code/openai-gave-us-a-glimpse-into-their-ai-coding-playbook"
publishedAt: "2025-12-19"
tags:
  - "software"
  - "engineering"
  - "coding"
---

# OpenAI Gave Us a Glimpse Into Their AI Coding Playbook

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

Four OpenAI engineers built the Android version of the [image generation app Sora](https://every.to/vibe-check/openai-made-video-creation-effortless-here-s-what-happened-next) in 28 days. Naturally, they built it using [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent), their AI coding agent.

Partway through that sprint, one of those engineers, **[RJ Marsan](https://x.com/RJMarsan)**, shattered his wrist in a bike race, leaving him unable to type. So he cobbled together a speech-to-text system and started talking to Codex instead of typing commands himself.

That forced constraint—having to tell the computer what to do rather than execute the instructions via his keyboard—taught him something the rest of the team eventually adopted: Treating Codex like a new coworker you’re onboarding delivers stronger results than treating it like a tool you’re configuring (Codex doesn’t remember previous conversations automatically). “Every session is onboarding this new coworker \[anew\].”

Marsan and **[Alexander Embiricos](https://x.com/embirico)**, who leads the Codex product team, joined us for Every’s first-ever Codex Camp to share this and other insights learned building Sora with Codex and how generally to think about working with AI.

Here’s what we learned.

## **Key takeaways**

1.  **Onboard your AI like a new hire.** Start with quick, interactive prompts. Build trust. Let it learn your preferences. Then delegate longer tasks.
2.  **Don’t overload context.** If you’d overwhelm a coworker with 6,000 facts about your codebase, you’ll overwhelm the AI too. Give it what it needs for the task at hand.
3.  **Narrow beats broad.** An agent with one focused job outperforms a generalist trying to catch everything.
4.  **It doesn’t get easier—you go faster.** AI tools shift the bottleneck; they don’t eliminate it. Architecture and code review become more important, not less.

#### **Make your team AI‑native**

Scattered tools slow teams down. Every Teams gives your whole organization full access to Every and our AI apps—**Sparkle** to organize files, **Spiral** to write well, **Cora** to manage email, and **Monologue** for smart dictation—plus our daily newsletter, subscriber‑only livestreams, Discord, and course discounts. One subscription to keep your company at the AI frontier. Trusted by 200+ AI-native companies—including The Browser Company, Portola, and Stainless.

[Create your team](https://every.to/teams/new?source=post_button)[Want to sponsor Every? Click here](/cdn-cgi/l/email-protection#681b1807061b071a1b0001181b280d1e0d1a11461c07).

## **How to think about working with AI**

Building Codex changed how the OpenAI team thinks about AI agents. When they started work on the product late last year, the team assumed agents would function best by mimicking humans—watching your screen, moving a mouse, and clicking buttons. After all, if AI is intelligent, shouldn’t it interact with computers the way we do?

“I was like, ‘Oh, next year we’re just going to be screen sharing with AI, and it’s just going to be doing stuff,’” Alexander said. “I guess we were super wrong about that.”

The team discovered that AI executes tasks better when you let it work like a computer rather than mimicking human behavior. Think about the difference between manually sorting through your downloads looking for a specific file versus writing a one-line script that does it instantly. Code is faster, more predictable, and easier to automate. But you can’t feed code to a human.

That said, even though AI works best when you let the computer be a computer, you still interact with it like a human. You describe what you want in natural language, and it translates your goals into code. Embiricos made an apt analogy: “If you had to hire a teammate, and you were never allowed to get on a call with them or have them sit next to you looking at your computer, and you could only email back and forth once every 20 minutes, it would just suck to onboard that teammate.” The same is true of onboarding an AI—you need to talk to your AI like a human, not a robot.

## **Onboard before you delegate**

During the camp, Marsan demonstrated how he still applies the approach of treating the AI like an employee you are onboarding that he developed during his injury. He showed a prompt from the Sora build: implementing content reporting for user posts that violate Sora’s terms of service. He knew the feature existed in the iOS app and similar patterns existed elsewhere in the Android codebase. Rather than track it all down himself, he handed Codex an assignment to review the iOS version and learn about how it works—exactly what you’d give a new hire on day one.

The agent spent several minutes doing research—scanning the codebase, finding related implementations, and identifying the right data structures. This research phase, he emphasized, is the most important step. Codex caught details that would have tripped him up. For example, the codebase used an internal label called “Sora 2” for the content reporting feature; Marsan would have guessed “Sora,” and his code would have failed to connect to the right system. Without having Codex complete the research phase first, the AI might have built something that looked right but broke in ways that would be difficult for a human engineer to track down and fix.

Lesson learned: Let the AI do the research, review what it found, and point it toward the solution. Don’t skip straight to “fix this.”

## **Don’t overload context**

You wouldn’t onboard a new hire by making them memorize a 6,000-line document about your codebase. Their eyes would glaze over. The same thing happens to AI agents when you stuff giant instruction files into their context.

Embiricos has seen developers create massive instruction files—called agents.md—stuffed with everything the AI might ever need to know. But it backfires. “No one needs to know every single fact,” he noted. The same is true of a coding agent.

OpenAI is moving toward ”skills”—smaller, atomic units of instruction that break down knowledge into digestible pieces. The idea is to give agents what they need for the task at hand, not everything they might ever need to know. Incidentally, Anthropic has also made [Skills](https://every.to/vibe-check/vibe-check-claude-skills-need-a-share-button) central to Claude Code’s architecture. The two companies are converging on compatible approaches to constructing and executing skills, so that skills built for one tool within its ecosystem can increasingly work with the other.

This maps to how humans learn. You don’t give someone an overwhelming amount of information about a task before they start it. You give them what’s relevant, let them ask questions, and fill in gaps as they go.

“General human intuition tends to follow more closely with how models behave than engineering intuition,” Embiricos told us.

## **Give your agents dedicated jobs**

You wouldn’t ask a new hire to simultaneously check visual consistency across code updates, evaluate the system’s fundamental structure, and hunt for bugs. That’s three different jobs requiring three different mindsets. The same is true for AI.

As Codex churned out more code, human code review became the bottleneck—there was simply too much for the team to look at carefully. Marsan’s solution was to create specialized AI reviewers that could do a first pass, flagging issues so humans could focus their attention where it mattered.

He set up three separate Codex sessions, each with a single focus:

1.  **Compose police:** Checks for user interface issues—making sure the app’s visual elements follow consistent patterns.
2.  **Tech lead:** Looks for architectural problems—flagging duplicate code or structural decisions that could cause trouble later.
3.  **Bug hunter:** Searches for potential bugs—logic errors, edge cases, anything that might break.

Giving each agent a specific role made them all better at their jobs. The three don’t coordinate, so sometimes all three flag the same line of code. “You know you’ve done something wrong when compose police, tech lead, and bug hunter all comment on the same line.”

The same principle applies to what information you let Codex see. When the team builds the app, the system spits out thousands of lines of status updates, most of it routine. Marsan configured his setup to filter the routine notifications out and only surface failures. Codex performed dramatically better.

Embiricos pointed out that these fixes help human developers, too. When you show someone 70,000 lines of code, their eyes glaze over—they skim and miss details. The same happens to AI. If you are intentional about what information you give the agent, it will focus better and produce better outputs. The less junk Codex has to sift through, the more it catches what counts.

One practical tip: When Codex submits comments on code reviews, it needs to label those comments as coming from AI. Otherwise, the comments show up under your name, so it looks like you’re critiquing your own code. “It’ll just be RJ commenting on RJ,” Marsan said, “and you look a little bit like you’re going crazy.”

## **When to use Codex**

So, when should someone use Codex versus other coding tools?

Codex is built for serious professional software engineering—giant codebases, complex features, production-grade apps. If you’re doing quick prototyping or simple scripts, it might feel slower than tools optimized for speed like [Claude’s Haiku model](https://every.to/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked). But three entry points fit the tool’s capabilities best:

1.  **Unsolved bugs.** Got a bug that no agent has been able to solve, and you haven’t had time to dig in for a day? Throw it at Codex.
2.  **Architecture planning.** Use Codex to produce plans and think through code structure, even if you execute with other tools.
3.  **Code reviews.** Start with the Codex CLI’s /review command. If you like it, set up the GitHub Action. If you really like it, connect it to your repository for automatic pull request reviews.

Marson’s team burned through 5 billion tokens building Sora—a number Embiricos found surprisingly low for a production app. That’s an extreme workload, though. For everyday development, the ChatGPT Plus tier at $20 per month includes Codex access, with higher limits available at $200 per month for developers who need more runway.

## **It doesn’t get easier—you go faster**

After walking us through the Sora build—28 days, four engineers, number one in the Google Play store—Marsan paused to reflect on the experience and reached for a saying from his favorite pastime.

“The line from cycling is: It doesn’t get easier, you just go faster,” he said. The same is true of coding with AI. “It’s not like you have to think less about all these important structural decisions. You need to think about them more often. Good architecture is still the foundation of engineering.”

That’s the core of what we call [compound engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents)—building systems where each feature makes the next one easier to build. You document what works, feed lessons back into your agents, and let knowledge accumulate rather than scatter.

The tools will keep changing: new models, new capabilities, and new ways to delegate. But the core lesson holds: Treat AI like a teammate, not a magic box. Onboard it. Teach it your codebase. Build trust through quick interactions before handing off longer tasks. That’s how collaboration works—whether your teammate is human or not.

* * *

***Katie Parrott*** *is a staff writer and AI editorial lead at Every. You can read more of her work in [her newsletter](https://katieparrott.substack.com/).*

*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://writewithspiral.com/)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with* ***[Cora](https://cora.computer)****. Dictate effortlessly with* ***[Monologue](https://monologue.to)****.*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

*For sponsorship opportunities, reach out to [\[email protected\]](/cdn-cgi/l/email-protection).*

[Subscribe](https://every.to/subscribe?source=post_button)

#### What did you think of this post?

[Amazing](/source-code/openai-gave-us-a-glimpse-into-their-ai-coding-playbook/feedback?rating=amazing) [Good](/source-code/openai-gave-us-a-glimpse-into-their-ai-coding-playbook/feedback?rating=good) [Meh](/source-code/openai-gave-us-a-glimpse-into-their-ai-coding-playbook/feedback?rating=meh) [Bad](/source-code/openai-gave-us-a-glimpse-into-their-ai-coding-playbook/feedback?rating=bad)
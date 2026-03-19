---
title: "Context engineering is the new AI literacy"
subtitle: "Dee Dee pressed buttons and hoped. Dexter built systems. Here's how to become Dexter, with a practical context engineering framework."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/context-engineering-guide"
publishedAt: "2026-03-18"
tags:
  - "ai-general"
  - "best-practices"
  - "education"
  - "llm"
  - "productivity"
  - "prompt-engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-19T14:28:28.248Z"
---

# Context engineering is the new AI literacy

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today, we’re talking about the one skill separating people who actually use AI from people who just talk to it.**

Dexter, boy genius, has built an impossibly powerful laboratory underneath his house. Computers, robots, interdimensional portals, the full works. And his sister Dee Dee dances in, touches everything, presses every button she can find, and the whole lab explodes.

*“DEE DEE! Get out of my LABORATORY!”*

![The 20 Best 'Dexter' Cartoon Characters, Ranked By Fans](https://substackcdn.com/image/fetch/$s_!NMN1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd090e222-08b4-4322-af76-51f835a385d9_2364x1237.jpeg)

Every single episode. Dexter builds something brilliant. Dee Dee walks in with no plan, mashes buttons, wonders why everything blows up.

That’s a lot of us, every morning. With Claude, GPT, or whatever LLM we use.

Prompt engineering had a good run. For about two years, the entire AI education industry taught us one skill: **how to talk to a language model.** And it worked, for a while.

Now, we need to look at: thinking about the environment the conversation happens inside, the files we load before we type, the structure that determines what the model pays attention to, the architecture of the prompt (instead of the prompt itself).

There’s a word for this now. **Context engineering.** And the distance between that and prompt engineering is the distance between typing and literacy.

You’re Dee Dee. And you probably don’t even know it.

In this issue:

-   What context engineering actually is and why every explainer gets it wrong for creators
    
-   The research on how AI actually processes what you give it
    
-   The Dexter Protocol: 5 rules for engineering your AI’s context
    
-   The 3-file starter system you can build in one afternoon
    
-   The prompt pack: Lab Audit, Module Builder, and Routing File (free for everyone)
    

* * *

*Hi, I’m Mia. I write about building with AI the way it should be done: with a brain, a plan, and zero circus tricks.*

*New to ROBOTS ATE MY HOMEWORK? [Start here.](https://robotsatemyhomework.substack.com/p/start-here) Want the systems? [RobotsOS.](https://robotsatemyhomework.substack.com/p/premium-robots) Want a personalized AI roadmap? [Take a 20-second quiz.](https://robotsatemyhomework.com/learn)*

***Dexter built the lab. Dee Dee kept pressing random buttons. Let’s stop being Dee Dee.***

![](https://substackcdn.com/image/fetch/$s_!NIAC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67f6a113-eaab-4c58-a69c-f6a91ca00c43_1200x35.png)

## Why context engineering sounds like dev jargon but isn’t

![](https://substackcdn.com/image/fetch/$s_!BoJ6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5914d863-fde8-412f-896f-1f97059fb64c_2752x1536.png)

Before the framework, the definition. Because “context engineering” gets explained badly almost everywhere you look.

So, what is context engineering?

Most explainers frame it as a developer skill - ever heard of RAG systems, vector databases, memory architecture for AI agents? That framing is accurate and completely useless for anyone who isn’t building software.

Here’s a simpler version for everyone else, the creators, marketers, and knowledge workers:

> Context engineering is the practice of deciding what information your AI sees before you type anything. Not the prompt itself, but **the architecture around the prompt**. The files, the rules, the structure, the identity information that determines whether the AI starts from intelligence or ignorance every time you open a new chat.

Prompt engineering optimizes a single exchange, while context engineering optimizes every exchange from this point forward.

*If you’re wondering what the difference is between a prompt and a skill and why that matters, [check what AI skills are (and why they change everything)](https://robotsatemyhomework.com/learn/what-are-skills).*

### Context engineering vs prompt engineering

The two terms are not the same thing, and treating them as synonyms is how you end up with a prettier version of the same problem.

-   **Prompt engineering** is how you phrase a question to AI.
    
-   **Context engineering** is how you structure the entire information environment AI operates in (your identity files, voice rules, audience profiles, project briefs).
    

Prompt engineering optimizes a single interaction while context engineering optimizes every interaction from now on.

Andrej Karpathy, founding member of OpenAI, said this back in June 2025: context engineering is the delicate art and science of filling the context window with just the right information for the next step.

[![X avatar for @karpathy](https://substackcdn.com/image/fetch/$s_!oMwR!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1296667294148382721%2F9Pr6XrPB.jpg)Andrej Karpathy@karpathy+1 for "context engineering" over "prompt engineering". People associate prompts with short task descriptions you'd give an LLM in your day-to-day use. When in every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window![X avatar for @tobi](https://substackcdn.com/image/fetch/$s_!-OXc!,w_20,h_20,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1999293930936909824%2F_HWYanot.jpg)tobi lutke @tobiI really like the term “context engineering” over prompt engineering. It describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM.3:54 PM · Jun 25, 2025 · 2.37M Views

* * *

527 Replies · 2.08K Reposts · 14.3K Likes](https://x.com/karpathy/status/1937902205765607626)

Getting this right is highly non-trivial. Too little context and the AI doesn’t have what it needs. Too much and it drowns in noise. ([Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) published a full engineering guide just on this balance). Because it IS an engineering problem.

## The science behind why your best instructions get ignored

Everyone is celebrating bigger context windows (hi Claude’s 1M context window, looking at you!). Here’s why we shouldn’t be THAT excited.

In 2023, **[Liu et al.](https://arxiv.org/abs/2307.03172)** tested language models on tasks that require finding relevant information buried inside long inputs. What they found was a U-shaped performance curve.

**AI remembers what’s at the beginning and end of its context, while the middle gets lost.**

A more recent study from **[2025](https://arxiv.org/abs/2510.10276)** offered a cleaner explanation for *why* this happens. The U-shape is still a thing and emerges directly from training. Models trained heavily on long-range retrieval develop a primacy bias (favouring the start); models trained on short-range tasks develop recency bias (favouring the end); train on both, and you get the U-shape.

That same 2025 study drew a direct parallel between this LLM positional bias and the **[primacy-recency effect in human memory](https://psycnet.apa.org/record/1963-06156-001)**.

**Humans remember the first and last items in a list but forget the middle. AI does the same thing, for completely different architectural reasons, with the same practical result.**

Then there's the **[attention sink problem](https://arxiv.org/abs/2309.17453)**. Attention is zero-sum. Every token competes for the same finite resource, so every irrelevant chunk you load into context steals focus from what matters.

* * *

*I explored a version of this problem through a different lens. “[The secret life of unnamed streets in your AI stack](https://robotsatemyhomework.substack.com/p/the-secret-life-of-unnamed-streets)” is about what happens when your best thinking gets lost in a mess of random chats with no structure underneath.*

* * *

Every irrelevant file you load into your context window is Dee Dee pressing another button. The lab can only track so many experiments at once.

![](https://substackcdn.com/image/fetch/$s_!TnFG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffc7f3368-ad03-4b44-8a5c-08bb387bd0fa_1200x35.png)

## The Dexter Protocol: 5 rules for engineering your AI’s context

So you’ve got three problems: the middle of your context gets ignored, every irrelevant file steals attention from relevant ones, and bigger windows just give you more room to make both mistakes.

The five rules below are built to fix each of these. Let’s get into it.

### Rule 1: Label your “buttons”

We like to dump entire Google Docs, bios, and rambling notes into AI with no structure.

Every file you feed AI should have a clear header explaining what it is, when to use it, and what it’s for. The AI reads this header and knows whether the file is relevant.

Here’s what most people do:

```
Mia Kiraki. Co-founder of Chillital. I write ROBOTS ATE MY HOMEWORK. My voice is warm but sharp. I don't use em dashes. I reference film and literature. I hate AI slop...
[800 more words of stream-of-consciousness]
```

Here’s what a labeled button looks like:

```
# VOICE PROFILE — ROBOTS ATE MY HOMEWORK
## Purpose: Load this file for ALL writing tasks.
## Core Rules (read these first):
- No em dashes. Use commas, periods, or parentheses.
- Short sentences for impact. Longer for explanation.
- Cultural references are structural, not decorative.
- Always include an activation moment.
## What This File Is NOT For:
- Strategy sessions (use brand-strategy.md instead)
- Data analysis (no voice constraints needed)
```

The first version forces AI to extract meaning from an unstructured blob while the second tells AI exactly what to do with the information.

* * *

*If you’ve never built a structured file for AI before, [build your first AI skill](https://robotsatemyhomework.com/learn/build-first-skill).*

* * *

### Rule 2: Lock the doors Dee Dee shouldn’t enter

Dexter has separate chambers in his lab. The chemistry station doesn’t interfere with the robotics bay. When Dee Dee gets into ONE room, the damage is contained.

People load everything into one system prompt and wonder why the AI gets confused.

The AI doesn’t need your financial data during a writing task, or your voice guide during a strategy session. Loading both every time is like running every experiment in every lab simultaneously and wondering why nothing works.

I learned this building the skill files for [RobotsOS](https://robotsatemyhomework.com/robots). A couple of months ago, early versions of my voice guide were 1,200+ lines. The AI would nail the first three paragraphs and then drift by paragraph four. Sound familiar?

* * *

*That same distillation problem showed up when I tried to code my authority into AI. “[Reverse-engineer yourself before you train your AI](https://robotsatemyhomework.substack.com/p/reverse-engineer-yourself-before)” is the full walkthrough of how I audited my own writing to find what actually needed to be in the file.*

* * *

The fix was modular: separate voice from brand from strategy from project context. Each file loads only when its function is needed. My voice file went from 1,200 lines to a focused 300 (with the most distinctive patterns front-loaded in the first 100 lines).

The drift stopped and research backs this up. Because attention in transformers is zero-sum, splitting context into focused modules means each file gets more of the AI’s limited attention budget. Less noise —> better output.

This is exactly how every skill inside [RobotsOS](https://robotsatemyhomework.com/robots) is built. The routing logic, the modular files, the progressive disclosure. Except you don't have to build them. You download them and plug them in.

### Rule 3: Front-load the formula

Do you also bury your most important instructions in the middle of long prompts or files? Because I sometimes do this too.

A fix for me has been to put critical rules first and put constraints last. Never bury key instructions in the middle.

The U-shaped attention curve means AI pays the most attention to the beginning and end of whatever you give it. Everything in the middle gets discounted.

So when you put “IMPORTANT: Never use em dashes” on line 847 of your voice guide, the AI has probably stopped paying attention. Put it in the first 10 lines. Put your most distinctive, non-negotiable rules at the very top. Let the supporting detail fill the middle. Put hard constraints at the end.

### Rule 4: Build modules, not monoliths

One massive system prompt means one room where everything can go wrong at once.

Separate context files by function, like:

-   voice file
    
-   brand file
    
-   current project file
    
-   strategy file.
    

Each one loads only when needed.

Instead of one 3,000-word system prompt (which, remember, starts degrading the AI’s performance), you build a library of focused files:

-   **identity.md** - Who you are, what you do, your expertise, your constraints. Loaded into every chat.
    
-   **voice.md** - How you write, banned words, tone rules, examples. Loaded for writing tasks.
    
-   **current-projects.md** - What you’re working on now, decisions made, decisions rejected, next actions. Loaded for work sessions.
    

Each file stays under a few hundred lines. Nothing bleeds into anything else.

### Rule 5: The lab runs the experiment, not you

You manually decide what context to load every time. You’re still being Dee Dee, just a slightly more organized Dee Dee.

Create what I call a routing file. A lightweight index that tells the AI: “This is a writing task → load identity.md + voice.md” or “This is a strategy task → load identity.md + current-projects.md.” The AI routes itself.

This is what I use in my own systems. A single SKILL.md file that acts as an index, always loaded, that directs AI to the right module based on the task type. Progressive disclosure in action: the routing file is small (costs almost nothing in tokens), but it contains the logic that prevents the AI from loading everything at once.

At this level, you stop being Dee Dee, the button-presser. You become Dexter and the lab runs itself.

## A few honest notes on the process

1.  Context engineering doesn’t fix bad thinking. If your strategy is wrong, a well-structured context file just helps the AI execute the wrong strategy faster.
    
2.  It also doesn’t replace taste. You still need to know what good output looks like. A perfectly structured context system feeding into a brain that can’t tell good from mediocre will produce mediocre output, faster.
    
3.  It requires maintenance. Your files go stale if you don’t update them. A lab with outdated equipment is still a bad lab. When your project shifts, your current-projects.md needs to shift with it.
    

The 3-file starter system I’m about to give you gets you 80% of the way there.

![](https://substackcdn.com/image/fetch/$s_!5le4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fac7d4da9-4b10-406b-b1b2-7ad774dcb7aa_1200x35.png)

## Build it now: The 3-file starter system (+ 3 prompts)

![](https://substackcdn.com/image/fetch/$s_!oKs4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6ffa4845-05df-4686-99ce-b8f5a269ff4e_2752x1536.png)

**Before this:** Every chat started from zero. You pasted. You explained. You re-taught. Twenty minutes of setup for ten minutes of useful output.

**After this:** You open a chat and the AI already has your identity, your voice, and your project context loaded. It still needs direction and you still need taste, but the re-teaching is gone. You start from intelligence instead of ignorance, every time.

The three steps map to:

-   **Audit** - figure out what context you keep repeating or missing (Prompt 1)
    
-   **Build** - turn your messy notes into clean, modular .md files (Prompt 2)
    
-   **Instruct** - create a lightweight instruction layer that tells the AI how to use those files (Prompt 3)
    

### Prompt 1 → The Lab Audit

Before you build anything new, diagnose what’s broken. Paste this into your next chat.

It only works if your AI has conversation history access. If your tool doesn’t have history access, paste your last 3-5 prompts and AI responses into the chat as raw material instead.

```
Review our past conversations. Do not summarize the topics.

Instead, analyze MY inputs as a context engineer. Find:

1. REPEATED CONTEXT: Things I explained more than once across conversations. These are identity facts the AI should already know.

2. MISSING CONTEXT: Moments where the AI gave generic output because it lacked information about me, my project, or my constraints.

3. WASTED TOKENS: Irrelevant information I included that diluted the output quality.

4. POSITION PROBLEMS: Critical instructions I buried in the middle of long prompts (where AI pays the least attention).

Output a diagnostic report with specific examples from each conversation. End with a priority list: what context should be pre-built into files so I never have to type it again.
```

This prompt doesn’t build anything yet. It shows you exactly where your context architecture is broken so you know what to fix first.

### Prompt 2 → The Module Builder

Now build the files. Paste your bio, brand guidelines, voice notes, project briefs, whatever messy documents you currently copy-paste into AI sessions:

```
I'm going to paste my raw notes, bio, brand guidelines, and current project information below.

Your job is to restructure this into 3 clean, AI-readable .md files:

FILE 1 — identity.md
Who I am, what I do, my expertise, my core constraints. This file loads into EVERY chat. Keep it under 200 lines. Front-load the most important facts in the first 20 lines.

FILE 2 — voice.md  
How I write. Tone rules, banned words/patterns, examples of my actual voice (pull these from what I give you). This file loads for WRITING tasks only. Front-load my most distinctive rules in the first 20 lines. Non-negotiable constraints at the end.

FILE 3 — current-projects.md
What I'm working on right now. Decisions made, decisions rejected, next actions, key deadlines. This file loads for WORK sessions only. 

For each file:
- Start with a header block: file name, purpose, when to load
- Front-load the most critical information
- Use clear sections with descriptive headers
- Keep language direct and scannable (AI reads this, not humans)
- End each file with explicit constraints or "do NOT" rules

Output all three files in full, separated by dividers.
```

### Prompt 3 → The Routing File

You have three (or more) files now. But without instructions, you’re still the one deciding what’s relevant every time you open a chat.

What the routing file does is sit alongside your identity file and tell the AI: here’s what exists, here’s what matters right now, here’s what to prioritize. It turns your file library into a system with a switchboard.

Paste this:

```
I have three context files:
- identity.md (who I am — always relevant)
- voice.md (how I write — for writing tasks)
- current-projects.md (what I'm working on — for strategy/project tasks)

Create a routing file called router.md that:

1. Opens with a one-line purpose statement: "This file tells the AI which context to prioritize based on the current task."

2. Lists all available context files with a one-line description of each.

3. Contains simple prioritization logic:
   - Writing, drafting, or editing → prioritize voice.md
   - Strategy, planning, or project work → prioritize current-projects.md
   - Tasks touching both → prioritize both equally
   - Unclear → default to identity.md only and ask one clarifying question before starting

4. Ends with a "context check" instruction: before starting any task, the AI confirms what context it has access to and flags if something seems missing.

5. Stays under 50 lines total.

Write it so I can paste it into Claude Projects, a custom GPT's instructions, Cursor rules, or any tool where I load context files alongside a system prompt.
```

When you use this routing file alongside your other files, the AI stops treating all your context as equally important all the time. You stop managing the switchboard manually.

## Skills are what you build on top of this

The three files teach the AI *who you are*. A skill teaches the AI *how to do a specific job*. Those are different layers, and one doesn’t work well without the other.

A voice skill with no identity file underneath it can write in your tone but has no idea what you’re working on or what your constraints are. An identity file with no skills means the AI knows you but still needs you to direct every task manually, every time.

Think of it this way: the 3-file system is the lab. Skills are the experiments you run inside it. You wouldn’t build experiments without a lab but you also wouldn’t stop at building the lab and call it done.

So if you’re reading this and thinking “what’s next after the three files”, the answer is: **you start building repeatable workflows on top of them.** Task-specific instructions that reference your identity, your voice, your project context, and produce consistent output without you re-explaining the task every time.

## ✎𓂃 Go do this now

You don’t need to run all three prompts today. Start with just this.

Open your next AI chat and paste this before doing anything else:

```
Before we start, tell me: what do you know about me, my voice, and my current project based on what I’ve given you so far? Be specific.
```

If the AI has nothing to say, you have a context problem.

If it gets things wrong, you have an architecture problem.

Either way, now you know where to start.

![](https://substackcdn.com/image/fetch/$s_!7tXW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5c65849-4224-4f83-b441-4e1c5eadff1b_1200x35.png)

#### *You just built the lab. Now fill it.*

**Free:** Download the [Voice Profile Builder](https://robotsatemyhomework.com/learn/voice-profile-builder) skill from RobotsOS and build your voice file in under 30 minutes.

**Go deeper:** [PREMIUM ROBOTS](https://robotsatemyhomework.substack.com/p/premium-robots) is the full experiment library. It includes full access to the RobotsOS platform (pre-built skills, agents, workflows) and exclusive writing on the craft of thinking, building, and quality control with AI.

**Just getting started?** Take a [20-second quiz](https://robotsatemyhomework.com/learn) and get a personalized AI roadmap of what to read first.

[Enter the RobotsOS universe](https://robotsatemyhomework.com/)

*Paid subscribers get the full library of AI systems plus exclusive writing on the thinking and taste that makes AI actually good.*

*Remember - Dexter didn't stop at building walls.*

* * *

To every Dexter who stopped letting Dee Dee press the buttons,

Chief 🤖 at ROBOTS ATE MY HOMEWORK
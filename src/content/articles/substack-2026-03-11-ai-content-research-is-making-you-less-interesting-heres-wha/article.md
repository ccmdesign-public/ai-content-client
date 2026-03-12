---
title: "AI content research is making you less interesting. Here's what I built to fix it"
subtitle: "Meet WATSON, the AI editorial researcher I built to kill generic content research. The full architecture, the methodology, and the first agent inside RobotsOS."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/ai-content-research-agent"
publishedAt: "2026-03-11"
tags:
  - "agents"
  - "ai-general"
  - "content-creation"
  - "education"
  - "llm"
  - "productivity"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-12T16:16:53.204Z"
---

# AI content research is making you less interesting. Here's what I built to fix it

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today, I’m launching RobotsOS and its first obsessive, opinionated, refuses-to-give-you-boring-ideas agent: WATSON.**

In 1926, Arthur Conan Doyle did something unusual. After decades of Sherlock Holmes stories narrated by Dr. Watson, he let Holmes tell his own case. *The Adventure of the Blanched Soldier.* Holmes himself, unfiltered, wrote the whole thing.

It was awful. Not factually wrong, though; Holmes catalogued every detail with surgical precision (like the cigar ash and the chemical residue on the suspect’s left cuff), but it was completely unreadable.

Holmes even admitted it. *“The good Watson had deserted me for a wife,”* he wrote, *“and I was left alone to tell this story.”* He knew something was missing. He could see every data point in the room but could not, for the life of him, turn data into a story worth hearing.

Conan Doyle never let Holmes narrate again.

That failure is a perfect diagnosis of how AI research works right now.

In this issue:

-   Why every AI research tool gives you Sherlock when you need John Watson
    
-   The echo chamber problem information theory predicted decades ago
    
-   How I built WATSON to completely change how you do content research: the full architecture, rules, and skills
    
-   **🎉 ROBOTS ATE MY HOMEWORK Premium is here. What RobotsOS is, what’s in it, and how to get in.**
    

* * *

*Hi, I’m Mia. I write about building with AI the way it should be done: with a brain, a plan, and zero circus tricks. New to ROBOTS ATE MY HOMEWORK?*

*Holmes had the data. Watson had the story. I’ll show you why that distinction changes everything.*

![](https://substackcdn.com/image/fetch/$s_!CMSu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe361e196-e9a3-4556-b97f-162ab0e1fa59_1200x35.png)

## Every AI research tool you’ve used is Sherlock Holmes

When we do content research with AI, we grab a topic we want to write about and we ask AI to give us the latest trends, and match that to our brand.

This is the equivalent of Sherlock Holmes staring at cigar ash. Technically flawless and completely useless for generating a **single new idea**.

This is the exhaustion of using AI for research and coming out LESS interesting than when you started. You’ve got the same ten talking points every other creator also received, slightly reframed to match your brand.

The tools keep getting faster and more accurate at summarizing, which means they’re getting better at the wrong thing.

**Faster Holmes is still Holmes.**

But do you know what’s cooler than a smart and fast Holmes? An equally smart Watson that looks at a massive pile of seemingly unrelated data, finds the cultural resonance Sherlock hasn’t spotted yet, and says: *"Here is the connection to your work that you wouldn't have found yourself."*

I built my content research version of John Watson.

## Why your ideas collapse when your research feeds on itself

Before I show you the system, I want to explain the problem it’s designed to solve, because the problem is bigger than “AI summaries are boring.”

In information theory, there’s a principle that a system feeding only on itself suffers [entropy](https://cascadeproof.org/shannon-proof-ai-degradation). The signal degrades and the output converges toward noise.

We see this happening in real time with AI: **[training models on AI-generated text collapses the quality](https://www.nature.com/articles/s41586-024-07566-y). Each generation gets flatter and more indistinguishable from the last.**

The same thing happens to your ideas when your [research only comes from inside your own niche](https://robotsatemyhomework.substack.com/p/why-complexity-is-your-superpower).

You read the same newsletters as your competitors, follow the same accounts, and AI summarizes the same sources for all of you. **Everyone publishes the same take within 48 hours of the same event, using the same frameworks, reaching the same conclusions.**

The cognitive scientist Edward de Bono spent decades proving that breakthroughs don’t come from deeper analysis of the same data, but from what he called [Lateral Thinking](https://www.debonogroup.com/services/core-programs/lateral-thinking/): introducing random, disconnected constraints to force the brain out of its established pattern.

> You solve a marketing problem by reading about 19th-century naval tactics.
> 
> You find the angle for your newsletter by studying how Pixar runs creative feedback sessions.
> 
> The breakthrough lives OUTSIDE the niche, not deeper inside it.

This is why Dr. Watson is the genius of the Sherlock Holmes stories.

Holmes operates in straight lines: observe, deduce, conclude. Brilliant, but linear.

Watson takes those same observations and routes them through something Holmes doesn’t have: the full mess of human experience, the emotional context, the cultural weight.

That is what I built my WATSON to do.

![](https://substackcdn.com/image/fetch/$s_!zG29!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Facca6a73-0eb8-4692-ba74-6827ba9d0ed7_1200x35.png)

## Inside WATSON: How I built an AI Editorial Researcher

I’ll walk you through the whole thing. The idea, the architecture, the methodology, and the parts that broke before they worked.

### **Where the idea came from**

If you’ve been reading this newsletter for a while, you know I can’t write a normal AI tutorial to save my life.

Every piece I write about a technical subject ends up grounded in a film, a book, a historical moment, something from the world that has absolutely no business being in an article about Claude agents (or so you think, until you read it).

So I’ve always had my own little system for this. Find the lateral connection, anchor the technical thing in something human, something that happened to me or something I love. Make it interesting before making it useful.

I write twice a week here. I work with folks on content and AI workflows. I write fiction on the side. Trying to find the unexpected angle for every single topic, manually, every time, is pretty hard. The connection most of the time comes naturally, but sometimes it takes 2 days of rabbit-holing to find. Sometimes, when I’m in a hurry and struggling with burnout, it doesn’t come at all.

When Claude Code launched and I started building properly with agents, I kept asking myself the same question: **what if I didn’t have to do that part alone? What if the lateral leap had a system behind it?**

That’s where WATSON came from. And here’s the step by step of how I built him.

#### **Step 1: The spec**

I brainstormed the full concept with Claude Opus.

What should an editorial researcher actually do? Not summarize… Not aggregate…

Cross-pollinate!

Find the non-obvious connections between what’s happening in the world and a creator’s specific brand positioning. I asked Opus for a full spec sheet once we had the methodology nailed down.

#### **Step 2: The skeleton**

I used Claude Code’s built-in agent builder and pasted the entire spec sheet.

Claude Code generated a massive `.md` file with the agent’s full identity, capabilities, and workflow. Useful starting point, but honestly super messy. Nothing was structured for an agent that needs to think clearly under pressure.

#### **Step 3: The architecture**

I found [a post on r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/comments/1rgcxpo/i_run_5_ai_agents_on_claude_code_heres_how_i/) from someone running 5 AI agents on Claude Code. They’d figured out a modular folder structure that separates identity from constraints from workflows. Instead of one massive agent file, I converted the whole thing into a modular system:

```
agent-name/
├── CLAUDE.md              # Identity + mission + capabilities
├── claude/
│   ├── rules/             # Auto-loaded context (always-on)
│   └── skills/            # On-demand workflows
├── inbox/                 # Input from other agents
├── outputs/               # Generated output
└── archive/               # Nothing gets deleted without archiving
```

**Rules are constraints** that fire on every single run - the agent’s personality, its guardrails, the things it checks before it does anything else.

**Skills are on-demand pipelines**, the complex workflows it executes when triggered.

Separating them means the agent can hold its identity steady (rules) while running different types of work (skills).

**It’s the difference between who someone IS and what they DO.**

WATSON’s full architecture:

```
watson-editorial-researcher/
├── CLAUDE.md
├── claude/
│   ├── rules/
│   │   ├── 00-onboarding.md
│   │   ├── 01-scope-assessment.md
│   │   ├── 02-execution-rules.md
│   │   ├── 03-data-source-config.md
│   │   └── 04-reddit-crawling.md
│   └── skills/
│       ├── 00-setup-datasource.md
│       ├── 01-idea-generation-pipeline.md
│       └── 02-output-format.md
├── inbox/
├── outputs/
└── archive/
```

The first output Claude Code gave me was a single 300-line markdown file.

So before I did anything else, I built a small skill to fix it: an **Agent Optimizer**. You give it any bulky single-file agent and it refactors the whole thing into a proper multi-file Claude Code structure: Identity, Always-on Rules, On-demand Skills, all separated into the right folders. The thinking is already done for you.

A modern Claude Code agent shouldn’t be a 300-line markdown file. It should be a directory that splits context deliberately, so the agent holds its character steady (rules) while running different types of work (skills), without everything bleeding into everything else or your token costs spiraling.

If you’re building agents and you’re still working with single bulky files, this is the first skill you need. [Grab it here and customize it for your use case.](https://docs.google.com/document/d/1WHIIKdB48EqN-coksJ_bzYPulvVRZ9qpjY8tyQqFnxU/edit?tab=t.0)

Let me walk you through what each layer does and WHY it exists.

#### **The Identity (CLAUDE.md)**

This is WATSON’s brain.

-   It defines **who WATSON is**: *“A senior content strategist and research analyst specializing in cross-domain ideation.”*
    
-   It sets **the mission**: *“Find non-obvious connections between what’s happening in the world and a creator’s unique brand positioning.”*
    
-   And it establishes a **core principle** that governs everything WATSON does: *“Despise generic takes and keyword-matching disguised as insight.”*
    

That last line is a constraint that actively shapes output quality. WATSON will discard a connection if it’s obvious. If ChatGPT would have suggested it, WATSON won’t.

#### **The always-on rules (rules/)**

These fire before WATSON does anything else.

`➤ 00-onboarding.md` checks whether WATSON knows where your brand documents live. If it doesn’t, it stops everything and runs the data source setup first.

`➤ 01-scope-assessment.md` is the first real decision WATSON makes. Is this topic searchable (a trend, product, cultural moment) or personal (a private observation, an internal feeling)? If it’s searchable, WATSON goes straight to research. If it’s personal, it pauses and asks exactly one question: *“This seems personal. Should I research related themes online, or just riff on this using your brand docs?”* One question, maximum. Then it acts.

`➤ 02-execution-rules.md` contains the constraints I’m most proud of:

-   Rule 5: “No shallow combinations. If a connection requires stretching logic, discard it.”
    
-   Rule 7: “The connection paragraph is sacred.” That connection paragraph is where WATSON earns its name. It’s a demonstration of cross-domain thinking, showing WHY two seemingly unrelated findings share a structural or conceptual similarity. If WATSON can’t write that paragraph convincingly, the idea gets killed.
    
-   And other super important rules, like: “diverse idea set only”, or “read all .md files”.
    

`➤ 03-data-source-config.md` tells WATSON where your brand lives. It connects to Notion, local folders, Google Drive, wherever you keep your brand essence, voice DNA, audience profiles. WATSON reads ALL of them on every single run. [Every idea is filtered through YOUR positioning](https://robotsatemyhomework.substack.com/p/how-to-build-a-proprietary-content).

`➤ 04-reddit-crawling.md` solves a specific technical problem: Reddit blocks AI scrapers. WATSON routes all Reddit URLs through a markdown converter to bypass the block and extract both posts and comments. We want this because Reddit’s unfiltered opinions are full of contrarian takes, complaints, all the interesting cool stuff!

#### **The on-demand skills (skills/).**

These are the workflows WATSON executes.

`➤ 00-setup-datasource.md` runs only once, during first setup. It checks your environment, finds your brand docs, validates the connection, and saves the configuration. After that, WATSON knows where to find you.

`➤ 01-idea-generation-pipeline.md` is the engine. Six steps:

1.  **Wide research sweep.** WATSON searches broadly across the web. Target: 20+ distinct sources. Reddit threads, Hacker News discussions, academic papers, niche blogs, YouTube. The strategy is deliberate: 2-3 broad queries, followed by targeted queries for each research category.
    
2.  **Categorize findings.** WATSON organizes everything into research lenses. Five are always-on: breaking news, hot takes and opinions, contrarian voices, psychological/behavioral frameworks, and analogies from other domains. Eight more activate when relevant: business angles, technical deep-dives, cultural/meme layer, historical parallels, data and stats, regulatory implications, creator stories, failure modes.
    
3.  **Build the research table.** 15-30 rows. Each finding tagged by category, source, URL, and relevance notes. No filtering at this stage. WATSON casts wide first, curates later.
    
4.  **Load brand documents.** WATSON reads your brand essence, voice DNA, audience profiles, content pillars. Extracts your positioning, recurring themes, and the voice characteristics you use and avoid.
    
5.  **Cross-pollinate.** This is the WATSON moment. The system finds connections between the research findings and your brand positioning. It targets three types: explainer-with-depth (trending topic + psychology framework + brand connection), contrarian (mainstream opinion + opposing evidence + brand-aligned reframe), and unexpected analogy (unrelated domain pattern mapped onto your topic). Selection criteria: surprise, natural fit, audience interest, substance, genuine novelty.
    
6.  **Score.** Each idea is rated High/Medium/Low on timeliness, brand fit, originality, combo strength, and engagement potential.
    

`➤ 02-output-format.md` structures the final output. Each idea comes with a combo type, angle, the sacred connection paragraph, suggested title, subtitle, one-line hook, controversy level, brand fit explanation, scores, sources, and adjacent ideas for future exploration.

#### **Step 4: Plug it in**

Claude Code picks up the agent automatically if you store it in the right folder. The folder name matches the agent name in the YAML header:

```
name: watson-editorial-researcher
description: 'Use this agent when the user provides a topic
  and wants it transformed into researched, brand-aligned
  content ideas.'
model: opus
color: yellow
memory: project
```

Give WATSON a topic. WATSON gets to work.

## I gave it “Nano Banana 2” and no instructions. This is what came back

I already told you I can’t write AI tutorials. But I do want to cover all the sweet AI updates, a new tool, a model launch, a product update. The obvious move is a walkthrough. Features, use cases, step-by-step. And the obvious move is exactly what everyone else is already publishing.

So I picked a random topic to show you what WATSON actually does.

Google launched Nano Banana 2 (their AI image generation model) in late February. I gave it to WATSON and WATSON did the following:

1.  searched 25+ sources
    
2.  activated 11 research categories
    
3.  built a 25-row research table spanning TechCrunch, Reddit, Google’s blog, CNBC, ScienceDirect, Nielsen Norman Group, psychology journals, and niche AI forums.
    

Then it generated 5 content ideas.

Two of them made me close my laptop and walk around my house.

#### **“The Visual Elevator Music Problem.”**

![](https://substackcdn.com/image/fetch/$s_!uOCd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff3d4f379-495d-4e59-abdb-2d04047a36fe_768x1024.png)

WATSON found a scientific paper on ScienceDirect.

Researchers had run 700 AI image generation trajectories over 100 iterations each. Every single trajectory converged to nearly identical outputs. The researchers called it “visual elevator music” because iteration without human interruption collapses diversity toward the mean.

WATSON connected that paper to Nano Banana 2’s headline feature (4-8 second generation speed, dramatically faster than anything before) and to a core ROBOTS ATE MY HOMEWORK brand pillar (the Fear of Dilution, the worry that using AI means losing yourself).

The connection paragraph WATSON wrote: *“The faster the tool, the faster uninterrupted iteration produces homogenized slop. Speed doesn’t protect your taste. It accelerates the rate at which you can surrender it.”*

No AI summarizer on earth would have connected a ScienceDirect paper about autonomous generation loops to a Google product launch to a content creator’s existential fear about losing their voice.

That connection required lateral thinking and knowing my brand positioning. **And it required the specific instruction baked into WATSON’s execution rules:** ***find the structural similarity, or kill the idea.***

### **“Google Solved Character Consistency for Faces. You Still Haven’t Solved It for Your Voice.”**

![](https://substackcdn.com/image/fetch/$s_!IwYD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbcced103-3126-4145-bd56-ffcdd7052a65_768x1024.png)

Nano Banana 2’s most technically impressive feature is character consistency. It maintains the exact appearance of up to five characters across a complex image workflow without them drifting or distorting. Google solved this with architecture - a system that holds the reference stable as iterations happen.

WATSON made the leap.

The same problem exists in text AI. Your words, your ideas, your arguments drifting toward generic the longer a session runs.

Claude doesn’t forget your face. It never knew it. [But it will forget what you sound like](https://robotsatemyhomework.substack.com/p/reverse-engineer-yourself-before) between sessions, and sometimes within them, unless you build the system that holds your identity stable as the AI works.

Google’s version was solved for you. The text version isn’t, unless you build it.

* * *

*Know someone who’s tired of AI research that gives them the same ten talking points as everyone else? Send them WATSON. Or rather, send them the newsletter about WATSON.*

* * *

**I did not prompt WATSON toward either of these ideas. I gave it a topic and it found the lateral connections because that is what it was designed to do.**

But WATSON finding the connections isn't the same as WATSON doing the work. I built it that way deliberately.

WATSON researches wide and filters through my brand positioning, my obsessions, my recurring themes, my audience, the things I've already decided I stand for. It doesn't generate the ideas. It just surfaces the raw material and shows me where it connects to who I already am. The thinking that happens after that is still mine.

> **Before WATSON:** I Google “Nano Banana 2,” read the same 10 TechCrunch articles as everyone else, find connections from my world and get lucky if I find something in time before everyone else writes about everything NB2-related, and end up diluting my entire content because I was in a rush.
> 
> **After WATSON:** a ScienceDirect paper about convergence loops, de Bono’s lateral thinking framework, Reddit’s unfiltered complaints about workflow friction, and a connection between face consistency in images and voice consistency in text that nobody else would publish.

Same topic. Completely different research. The lateral leap is WATSON’s. Where it lands is mine (or yours).

#### ✎𓂃 Go do this now

Open Claude. Paste this:

```
I’m going to give you a topic I’m writing about. 

Your job is to find 3 connections I’d never make myself: 

- one from psychology or behavioral science
- one from a completely unrelated industry or domain
- one from Reddit’s unfiltered opinion. 

For each connection, explain the structural similarity to my topic, not just the surface resemblance. 

The topic is: [YOUR TOPIC].
```

Run it and see what comes back.

That’s a rough approximation of one lens WATSON applies on every run.

Except WATSON applies all of them simultaneously, scores the results, checks every connection against your brand positioning, and kills any idea where the logic has to be stretched.

The prompt gives you a taste. WATSON gives you the full kitchen.

Speaking of full kitchen…

![](https://substackcdn.com/image/fetch/$s_!bTTU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7af86086-80a3-425b-9b3a-5ff27f0ef3b1_1200x35.png)

## WATSON now lives inside RobotsOS

**Today, for the first time, ROBOTS ATE MY HOMEWORK has a paid tier.**

![](https://substackcdn.com/image/fetch/$s_!jdZi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb243d2f4-120c-4ff6-a7c2-ba9ed3603ec9_4096x2286.png)

I’ve been building it for months alongside the newsletter, and WATSON is the first agent inside it. But WATSON isn’t alone.

#### **Here’s everything inside PREMIUM ROBOTS:**

**── .✦ FULL ACCESS to RobotsOS**, a growing library of AI skills and agents built on ideas from places most AI tools never look. Download them, plug them in, run them on real work.

Right now that includes four Core Builders, a collection of skills across writing, editing, strategy, brainstorming, and research, and WATSON - the first AI agent, with more coming.

**── .✦ Exclusive posts on MIND, BUILD, TASTE**, where the newsletter goes deeper. How to think sharper with AI, how to build systems grounded in real strategy, and how to keep your taste intact while the machines get louder.

> 💕 New systems every month. The library grows with the newsletter.

**The founding price is €56/year (it goes to €80 after the first week). WATSON, the full library, the deeper posts, new systems every month.**

**If you’re ready, join the ROBOTS:**

**If you want to look around first →** [Browse the library](https://robotsatemyhomework.com/) (free to browse and it also includes freebies. Enter with the email you subscribed with).

And whether you join today or not, thank you. To everyone who’s been here since the beginning and to everyone finding this today. This newsletter exists because you keep showing up for something that refuses to be boring. This one’s for you.

To every Watson who made a Holmes worth reading,

Chief 🤖 at ROBOTS ATE MY HOMEWORK
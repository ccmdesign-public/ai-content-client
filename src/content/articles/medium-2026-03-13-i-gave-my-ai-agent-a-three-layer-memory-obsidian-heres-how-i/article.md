---
title: "I Gave My AI Agent a Three-Layer Memory - Obsidian. Here’s How It Thinks Now."
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/i-gave-my-ai-agent-a-three-layer-memory-obsidian-heres-how-it-thinks-now-0aaa0fdbdbbd?source=rss----98111c9905da---4"
publishedAt: "2026-03-13"
tags:
  - "ai-general"
  - "automation"
  - "docker"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-13T17:53:19.386Z"
---

# I Gave My AI Agent a Three-Layer Memory - Obsidian. Here’s How It Thinks Now.

![]()

# I Gave My AI Agent a Three-Layer Memory. Here’s How It Thinks Now.

[Moun R.](https://medium.com/@rajimounit?source=post_page---byline--0aaa0fdbdbbd---------------------------------------)

6 min read·20 hours ago

\--

*Part 4 of my series on building a personal AI agent that actually works*

Every morning, my agent sends me a brief. CAC40 levels, AI news digest, weather. It knows my name. It knows I’m based in Paris. It knows I prefer short answers unless the task is genuinely complex.

What it didn’t know — until I fixed this — was anything that happened yesterday.

Every new session started from zero. The morning brief was useful, but the agent behind it was amnesiac. Ask it something that referenced last week’s conversation and it would either hallucinate an answer or admit it had no memory of it. The brief was just a cron job with good formatting. It wasn’t an agent that actually knew me.

That gap between *automated* and *aware* is what this article is about.

## The Problem With Default Memory

Out of the box, OpenClaw stores nothing between sessions by default. Each conversation is a clean slate. This is fine for a general-purpose chatbot. It’s a fundamental problem for a personal agent.

Think about what a useful personal agent actually needs to know:

-   Your setup (infrastructure, tools, preferences)
-   What you’ve been working on recently
-   Decisions you’ve made and why
-   What failed last time and what worked

None of that survives a `/new` command without explicit memory infrastructure. You end up re-explaining yourself constantly. The agent that woke you up with a CAC40 brief doesn't know you spent the last three days debugging its own configuration.

I needed to build memory deliberately. And the first thing I learned is that **not all memory is the same.**

## Three Kinds of Memory, Three Layers

After a few weeks of iteration, I landed on an architecture with three distinct layers, each serving a different purpose.

**Layer 1 — Working memory (session logs)**

Raw, timestamped logs of what happened in each session. Written automatically by OpenClaw’s session hook at the end of every conversation.

```
memory/2026-03-11-0207.mdmemory/2026-03-11-1435.md
```

These are noisy. They contain everything — the questions, the dead ends, the tool calls that failed, the corrections. They’re not meant to be read by humans. They’re the raw material.

**Layer 2 — Curated long-term memory**

A single file, `MEMORY.md`, that lives at the workspace root. This is the distilled version — what actually matters across sessions. Not a log dump. A curated knowledge base about me, my setup, and what the agent has learned.

The agent reads this file at the start of every main session. It’s the closest thing to actual persistent memory the system has.

**Layer 3 — Structured vault (Obsidian)**

The permanent layer. Guides, profiles, knowledge that doesn’t expire. Organized into folders:

```
obsidian/├── Memory/      → profil-moun.md, persistent context├── Knowledge/   → technical guides, reusable documentation├── Journal/     → morning briefs, session logs worth keeping└── Notes/       → AI news, drafts, temporary research
```

This layer isn’t read on every session — that would cost too many tokens. The agent reads the entry point (`obsidian/AGENT.md`) and navigates from there on demand.

![]()

## The Flow Between Layers

The three layers aren’t independent silos. They form a pipeline.

```
Session happens    ↓Layer 1: session hook writes raw log → memory/YYYY-MM-DD-HHMM.md    ↓ (weekly heartbeat)Layer 2: agent reads logs, distills → updates MEMORY.md    ↓ (when durable)Layer 3: significant knowledge → obsidian/Memory/ or Knowledge/
```

The key insight: **the agent itself does the distillation.** During heartbeat cycles (2–4 times a day, quiet periods only), it reads recent session logs, identifies what’s worth keeping, and updates MEMORY.md. It’s not a backup system. It’s a reflection loop.

## Get Moun R.’s stories in your inbox

 from this writer.

Remember me for faster sign in

The instruction in AGENTS.md:

```
### Memory maintenance (every few days via heartbeat)Read recent daily files → distill into MEMORY.md → remove outdated entries.
```

Simple. But it changes the quality of every subsequent session.

## What “Curated” Actually Means

The first version of MEMORY.md I had was bloated. It contained the full guardrails section (already in USER.md), lengthy explanations of rules (the agent doesn’t need to be convinced of its own instructions), and a detailed technical config that duplicated openclaw.json.

The file was over 1,200 words. It consumed roughly 1,600 tokens at session start — a significant chunk of the 16k context budget.

I cut it to 548 words. Same rules, same coverage, half the tokens. The agent’s behavior didn’t change. What changed was how much context was left for the actual conversation.

**The principle: MEMORY.md should contain what the agent couldn’t reconstruct from other sources.** Your name, your timezone, your active priorities, lessons learned from recent sessions. Not config values it can read from a file. Not rules it already has in USER.md.

## The Hidden Bug: What “Reading” Actually Means

Here’s something that took me longer to figure out than it should have.

The agent reads its startup files every session. SOUL.md, USER.md, MEMORY.md, obsidian/AGENT.md. I can see the tool calls in the logs. The files are opened. The content is loaded.

But “reading” and “retaining” are not the same thing.

I tested this directly. After the startup sequence, I asked: *“Are you sure about that scan of my workspace?”*

The response was honest:

```
Being honest: I didn't do a complete scan.Here's exactly what I actually examined:- AGENT.md → read fully- MEMORY.md → read fully- USER.md, SOUL.md → read
```

```
What I inferred without confirming:- The list of files in Journal/ (seen in tree output, not read)- Content of Knowledge/ guides (not examined)- Specific dates in memory/ logs (not opened)e
```

That’s a well-behaved agent. But it reveals something important: the model has finite attention. A file being “read” doesn’t mean every line is weighted equally. Long, dense files get skimmed. Short, structured files get absorbed.

This is why concise memory files work better than exhaustive ones. It’s not just about token count. It’s about what actually makes it into the model’s effective attention window.

## What Changed After the Architecture Was In Place

The difference showed up gradually, over about a week of sessions.

The agent stopped asking me to re-explain my setup. It knew LM Studio was running at a specific local address. It knew Obsidian was mounted in the workspace. It knew I’d been debugging model context issues.

More interestingly, it started referencing past failures correctly. When I asked about model selection, it said — unprompted — that the 14B reasoner had been blocked as a primary due to context constraints. That’s information from a session log it had distilled into MEMORY.md during a heartbeat.

That’s not magic. It’s just memory working as it should.

The morning brief also improved. Not because the brief template changed, but because the agent running it had actual context about what I cared about. It started weighting the CAC40 section more heavily, mentioning AI news items it knew were relevant to my ongoing projects.

![]()

## What Doesn’t Work (Yet)

Honesty matters more than a clean ending, so here’s what still breaks.

**The distillation isn’t always right.** The agent sometimes keeps trivial details and discards important ones. The selection of what’s “worth keeping” depends on the model’s judgment, which isn’t perfect. I review MEMORY.md manually every few weeks and correct the priorities.

**The vault search isn’t smart.** When the agent “reads” obsidian/Memory/, it does a sequential file read, not semantic search. If the relevant memory is buried in the sixth file, it might not surface. Proper vector search would fix this but adds infrastructure complexity.

**Long-term drift is real.** MEMORY.md accumulates. If you don’t periodically clean it, it grows back to the bloated version and starts eating context again. The heartbeat helps but doesn’t fully automate the pruning.

## The Setup, Documented

For anyone building the same:

```
## AGENTS.md — startup sequence1. Read SOUL.md2. Read USER.md3. Read memory/YYYY-MM-DD-*.md (today + yesterday)4. Read obsidian/AGENT.md + obsidian/Memory/5. Main session only: read MEMORY.md
```

```
## Content routingSession log     → memory/YYYY-MM-DD-HHMM.mdArticle/report  → obsidian/Notes/YYYY-MM-DD-[topic].mdTechnical guide → obsidian/Knowledge/[topic].mdCurated memory  → obsidian/Memory/ + MEMORY.mdMorning brief   → obsidian/Journal/
```

The whole system runs on OpenClaw’s built-in session hook for Layer 1, manual heartbeat instructions for Layer 2, and Obsidian’s REST API for Layer 3.

No external vector database. No embeddings. No complex infrastructure.

Just files, read in the right order, with deliberate curation in between.

*Follow me on Medium. If you’re building something similar and hitting the same walls, drop a comment — I reply to everyone.*
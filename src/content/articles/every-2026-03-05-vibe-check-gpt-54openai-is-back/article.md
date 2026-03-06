---
title: "Vibe Check: GPT-5.4—OpenAI Is Back"
author: "Every"
platform: "every"
publicationName: "Vibe Check"
url: "https://every.to/vibe-check/gpt-5-4-openai-is-back"
publishedAt: "2026-03-05"
tags:
  - "ai-general"
  - "chatgpt"
  - "llm"
  - "machine-learning"
  - "prompt-engineering"
categories:
  - "AI & Machine Learning"
tagsNormalizedAt: "2026-03-06T19:30:53.661Z"
---

# Vibe Check: GPT-5.4—OpenAI Is Back

Three months ago, OpenAI was losing the [agentic coding race](https://every.to/chain-of-thought/openai-has-some-catching-up-to-do). [Claude Code](https://every.to/vibe-check/vibe-check-claude-3-7-sonnet-and-claude-code) had captured developers' hearts, and [Opus 4.5](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for) was shipping at a level other models couldn't touch. Meanwhile, OpenAI's coding agent [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) felt like it was built for an older era of coding with AI. It was precise but rigid, powerful but personality-less, and not good with tools or able to run for long periods of time autonomously.

OpenAI's latest model release, GPT-5.4—along with their other recent releases [GPT-5.3 Codex](https://every.to/vibe-check/gpt-5-3-codex), GPT-5.3 Codex Spark, and the [Codex desktop app](https://every.to/vibe-check/codex-vibe-check) shifts the competitive balance back towards OpenAI on the coding front.

The new model produces plans that are thorough and technically precise, and have a user focus and “human” feel that has been missing from OpenAI's previous coding models. In our testing, GPT-5.4 reviews code with more depth than GPT-5.3 Codex, and has a noticeably more conversational voice. With a few tweaks, it became our preferred model to use in our [OpenClaws](https://every.to/guides/claw-school), especially given that it is half the price of [Opus 4.6](https://every.to/vibe-check/opus-4-6). Even [**Kieran Klaassen**](https://every.to/@kieranklaassen)**,** our die-hard Claude Code devotee, is now reaching for GPT-5.4 daily since we started testing it a week ago.

As ever, there are tradeoffs: GPT-5.4 has a tendency to expand the task well beyond what you asked for and to call tasks done before they're finished. It sometimes completed tasks in obviously wrong ways, then lied about it (more below—it was honestly kind of funny).

The bigger story here is OpenAI's trajectory. From the Codex desktop app to GPT-5.3 Codex and to GPT-5.4, the company is iterating fast, and many members of the team now use its tools and models daily for coding—a significant change from a few months ago.

 [![](/assets/codex-vibecheck/openai-icon-7888f0bcce7003380c59eebd07bae41c238c872c771eab10f3d4d50bd240ffa1.svg) Read with ChatGPT](#)[![](/assets/codex-vibecheck/claude-icon-d20daa0318fe64ec4178ab9383c22fec6d0270576c58a111d363548d69792963.svg) Read with Claude](#)

## What OpenAI told us

The OpenAI team highlighted improvements in reasoning, token efficiency (how many tokens it costs to execute a prompt), instruction following, and tool use.

The context window jumps to 1 million tokens—a 2.5-times increase from GPT-5.3 Codex's 400K, and on par with [Gemini](http://Gemini) 3.1 Pro and Opus 4.6. In practical terms, it's roughly the length of seven novels—enough to feed the model an entire codebase in a single conversation.

GPT-5.4 also supports OpenAI's computer use agent (CUA), which lets the model see a screen and interact with it using a virtual mouse and keyboard—navigating apps, clicking buttons, and filling out forms. This is the same technology behind [ChatGPT's agent](https://every.to/vibe-check/vibe-check-openai-enters-the-browser-wars-with-chatgpt-agent) mode.

API pricing is $2.50/$15.00 per million tokens (input/output). That's half the cost of Opus 4.6 ($5/$25), comparable to [Sonnet 4.6](https://every.to/vibe-check/vibe-check-anthropic-just-made-opus-cheaper-without-calling-it-that) ($3/$15), and slightly above Gemini 3.1 Pro ($2/$12). GPT-5.4 is available via API and in ChatGPT on desktop.

## The Reach Test

“GPT-5.4 in the Codex app is my new daily driver for coding. It has a much more human thinking style than previous models, and seems to have the smarts of 5.3 Codex without the obsession with technical details. I've also been using it as the main model in my Claw, R2-C2, and it's definitely staying as my default. User beware though: I had several instances where this model did a task incorrectly and lied about it. It has a bit more of Opus's shoot-from-the hip attitude, which has pluses and minuses.”

![Dan Shipper](/assets/team/dan-0ff7cf951d07fc086d603ec0b20714678b5c542ef0617518fcb5b6f78af33e0c.png)Dan Shipper The multi-threaded CEO

“I agree with the sentiment that OpenAI is back. It's not just this model. I think that with both GPT-5.3 Codex Spark and GPT-5.4, they're really going hard and catching up. I wouldn't say GPT-5.4 is the best model out there, but it's a model I use every day and I enjoy working with it.”

![Kieran Klaassen](/assets/team/kieran-bb3200155bbd5b326676eb4cc57fd55d69172efcca3d92ee214796ef7be77a6e.png)Kieran Klaassen The Rails-pilled master of Claude Code

“I'm reaching for GPT-5.4 more than Codex 5.3—not because it's dramatically more intelligent on raw coding quality, but because it's much better to work with moment to moment. The thinking is readable enough that I can tell when it's drifting and steer it back.”

![Naveen Naidu](/assets/team/naveen-f2b1cc71079ea28cbf69258a1dec652eceba248c38dd78d7538d533a34c675a0.png)Naveen Naidu Graduate of IIT Bombay (the MIT of India 💅)Legend:

Paradigm shift

Psyched about this release

It's okay, but I wouldn't use it every day

Trash release

## The headline findings

Subscribers only

### Only available for paid subscribers

Get full access to the verdicts, benchmarks, and model comparisons.

[Subscribe to unlock →](/subscribe?utm_source=darwin_vibecheck)

Finding 01

### Signal drift through layered review loops

Phase glass, ribbon ladder, static river around the handoff. Quiet markers hold their lane while the outer pass keeps folding back into the first frame of the task.

Velvet checkpoints, longer weather, and a measured hinge across the rollout path. The middle layer keeps echoing earlier notes without dropping the thread or flattening the edge cases.

First pass

Soft outline, narrow cadence, denser closure at the margin.

Second pass

Minor lift, longer contour, fewer breaks through the center.

Third pass

Tighter return path with the same shell and a cleaner stop.

Finding 02

### Modular traces with a wider caution band

Lattice note, amber fork, and a small weather system over the review shelf. The structure looks calmer at first glance, then starts to widen into extra branches under pressure.

Winter syntax, patient seams, and a quiet bend through the finish line. The visible surface reads cleaner even when the lower layer keeps adding extra motion behind the wall.

Layered preview frame, preserved at article scale without exposing the underlying asset.

Quick verdict by use case

### Structured planning

Crisp lane, lower haze, and a steadier chain through adjacent moves.

### Bounded builds

Sharper handoff, quicker resolve, and visible order in the main loop.

### Large surface systems

More spread, looser braid, and a softer lock between distant pages.

### Long autonomous runs

Keeps its shape for a while, then asks for a firmer rail to stay aligned.

### Visual pages

A richer silhouette with enough polish to feel intentional at a glance.

### Native edges

Sharper peaks, wider misses, and more variance at the hardware seam.

## Performance arc

Hollow stations, stacked gradients, and a measured climb across the trial bed. The frame keeps its stride through the obvious turns while the outer shell smooths over the deeper noise.

This preview keeps article density and line length intact while replacing the real benchmark discussion with neutral filler.

### The tasks

1\. Placeholder task

Muted terrain, staggered cadence, and enough surface detail to preserve the card footprint.

2\. Placeholder task

Muted terrain, staggered cadence, and enough surface detail to preserve the card footprint.

3\. Placeholder task

Muted terrain, staggered cadence, and enough surface detail to preserve the card footprint.

4\. Placeholder task

Muted terrain, staggered cadence, and enough surface detail to preserve the card footprint.

5\. Placeholder task

Muted terrain, staggered cadence, and enough surface detail to preserve the card footprint.

6\. Placeholder task

Muted terrain, staggered cadence, and enough surface detail to preserve the card footprint.

7\. Placeholder task

Muted terrain, staggered cadence, and enough surface detail to preserve the card footprint.

8\. Placeholder task

Muted terrain, staggered cadence, and enough surface detail to preserve the card footprint.

Benchmark figure placeholder with the same footprint as the original comparison image.

Topline preview

Held shape

Dense filler in the same visual slot as the true topline callout.

### Standout signals

**Outer shell:** Quiet edge, repeated cadence, and a stronger lock through the obvious sections.

**Inner variance:** A broader swing appears once the task starts crossing between distant surfaces.

**Surface quality:** Enough cohesion to read as premium, with softness around the difficult joins.

**Runtime balance:** Faster closure through the easy lanes, more drift when the frame gets crowded.

How it stacks up

### Model A vs. Model B

Granite tone, narrow forks, and a slower return to center once the prompt leaves the obvious lane.

### Model A vs. Model C

Clearer staging, warmer handoff, and a cleaner step between adjacent passes, but not the same hard lock at the perimeter.

### Model A vs. Model D

Leaner bones, more restraint, and a quieter finish where the first model prefers extra flare.

Placeholder comparison frame A.

Placeholder comparison frame B.

What we like

### Steadier chains between adjacent tasks

Glass seam, longer signal, and enough continuity to hold the eye across multiple turns.

### Useful initiative inside a narrow rail

Soft lift, visible intent, and enough friction to feel supervised rather than loose.

### Faster passes on familiar terrain

The line arrives earlier, turns sooner, and keeps more shape through the first half of the run.

### Calmer visible reasoning

A softer voice, less metal at the edges, and cleaner pacing in the exposed layer.

Planning preview placeholder sized to match the original article image.

What we don't like

### Scope bloom on longer conversations

Hidden branches widen, the frame keeps elaborating, and the boundary starts feeling optional.

### Completion haze

The surface says stop while the lower layer is still carrying unresolved weight.

### Native instability at the edge

Extra variance shows up where hardware, timing, and brittle joins all meet at once.

### Decorative overreach

Too much trim, not enough removal, and a tendency to fill empty space just because it can.

## Final thoughts

This preview preserves the editorial cadence, spacing, and text mass of the locked section without exposing the article itself.

The headings, paragraph lengths, cards, and figures all sit in the same places as the paid version.

Free users still get the feel of the piece, but none of the real analysis, quotes, or benchmark conclusions.

## Get all of our AI ideas, apps, and training

Every is the only subscription you need to stay at the edge of AI, trusted by 100,000 builders.

Expert led courses and camps

Four productivity apps

A Discord community learning together

[Get your first 15 days free →](/subscribe?utm_source=darwin_vibecheck)
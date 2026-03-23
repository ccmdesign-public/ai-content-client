---
title: "Context Engineering Is a Skill. Most Developers Are Skipping It."
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/context-engineering-is-a-skill-most-developers-are-skipping-it-9938678292b8?source=rss----98111c9905da---4"
publishedAt: "2026-03-23"
tags:
  - "ai-general"
  - "claude"
  - "engineering"
  - "productivity"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-23T14:40:53.866Z"
---

# Context Engineering Is a Skill. Most Developers Are Skipping It.

![](https://cdn-images-1.medium.com/max/1024/1*ZyOJJ-_QqoOzzXB6BZK3Cw.png)

#### Your AI coding agent isn’t underperforming because the model is weak. It’s underperforming because you haven’t built the environment it needs to do its best work.

I was just trying to ship a product. What I found changed how I use every AI coding tool.

I was working on Claude Code and Cowork, building a SaaS project with Opus 4.6 — the best model Anthropic has right now. The code it was producing was correct, it was working, but something felt off. Every output looked the same. Same patterns, same structure, same generic feel, no matter how I changed the prompt.

I started digging into why. That’s when I came across skills, context files, and the whole idea of context engineering — and realised I’d been running one of the most powerful models available with basically no environment set up around it.

Most developers using Claude Code, Cursor, and Antigravity are doing the same thing. This post is everything I found.

### Why This Happens: Distributional Convergence

Models don’t produce generic output because they’re incapable. They do it because without any steering, they default to the most statistically average answer — the patterns that appeared most often in training data. Safe code. Predictable structure. Forgettable results.

Opus 4.6, Gemini 3.1 Pro, GPT-5.4 — all of them do this without guidance. Purpose-built tools like Lovable, Bolt or Emergent escape it by pre-loading thousands of tokens of opinionated context before your prompt even arrives. That’s the real reason a weaker model inside a purpose-built tool can outperform a stronger one running bare.

Context engineering is how you close that gap yourself, on any tool.

### Claude Code

Claude Code has three layers most developers never touch: skills, [CLAUDE.md](http://claude.md/), and hooks. Together they define the environment the model works inside.

**Skills** are reusable instruction sets the agent loads before starting a task. Everything is local — nothing syncs to Anthropic’s servers, nothing touches your teammates’ machines.

**Install the core skills:**

```
# Anthropic's official frontend design skill — 77.8K stars+ installsnpx skills add anthropics/claude-code --skill frontend-design# Polish pipeline: baseline quality, accessibility, motion performance, metadatanpx ui-skills add --all# Vercel's 100+ rule compliance checkernpx skills add vercel-labs/agent-skills --skill web-design-guidelines
```

**Install everything-claude-code** — 75.2K stars, the most comprehensive Claude Code configuration collection available. Built by an Anthropic hackathon winner over 10+ months of daily production use.

```
/plugin marketplace add affaan-m/everything-claude-code/plugin install everything-claude-code@everything-claude-code
```

What this gives you:

-   11 subagents — planner, architect, TDD guide, code reviewer, security reviewer, build fixer, refactor cleaner
-   Slash commands — /tdd, /plan, /code-review, /build-fix, /verify
-   Memory hooks that persist context across sessions
-   continuous-learning-v2 — builds a skill library from your own coding patterns over time

One thing worth knowing: too many MCPs active at once can shrink your 200K context window down to 70K. Keep under 10 MCPs per project, under 80 total active tools. For skills, install freely.

**Write a** [**CLAUDE.md**](http://claude.md/) — the model reads this before every interaction. Think of it as a briefing document: your stack, your architecture decisions, your quality standards. The more specific it is, the less the model has to guess.

```
# Project: [Name]## Tech Stack (LOCKED)- React 18 + TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion, Vite## Architecture Rules- All data fetching via React Query - no direct calls in components- Shared state in Zustand only- Check /lib before creating any utility function## Quality Rules- TDD, 80% coverage minimum- No `any` in TypeScript - use `unknown` for genuinely unknown shapes- Run /code-review before presenting any module- Run /verify after every change## Banned- Card-grid-on-white layouts- Unstyled browser defaults- Components without proper line-height
```

**Use the refinement pipeline** — generation is step one, not the final step. Chain skills so each pass does one focused job:

```
Generate → Baseline audit → Accessibility → Performance review
```

This pattern works for every domain, not just frontend. Build, then security-review. Write, then verify. The model does one thing at a time and does it well.

### Antigravity

Antigravity is Google’s agent-first coding IDE built on Gemini 3.1 Pro. The skill ecosystem is newer, but get-shit-done-for-antigravity (GSD) solves the context problem at a structural level — not through individual skills, but through session memory that persists automatically.

```
git clone https://github.com/toonight/get-shit-done-for-antigravity.git gsd-templatecp -r gsd-template/.agent ./ && cp -r gsd-template/.gemini ./ && cp -r gsd-template/.gsd ./rm -rf gsd-template
```

Run /new-project after setup.

GSD maintains context files the model reads at the start of every session:

-   SPEC.md — project vision, always loaded in context
-   ARCHITECTURE.md — system design and decisions
-   STATE.md — running log of blockers and choices across sessions
-   PLAN.md — atomic tasks, each requiring real verification: a screenshot, curl output, or passing test. No "it should work."

Re-explaining your project at the start of every session is one of the biggest invisible taxes on AI-assisted development. GSD eliminates it entirely.

**For skills across all tools:**

```
npx antigravity-awesome-skills --claudenpx antigravity-awesome-skills --cursornpx antigravity-awesome-skills --antigravity
```

[sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) — 24.2K stars, 1000+ skills compatible with Claude Code, Cursor, Gemini CLI, and Antigravity. Start with the Web Wizard bundle — frontend-design, api-design-principles, lint-and-validate, create-pr — and expand from there.

### Cursor

Cursor’s context layer is .cursor/rules/\*.mdc. Same principle — inject constraints and standards before the model writes anything. PatrickJS/awesome-cursorrules is the largest collection by framework. sanjeed5/awesome-cursor-rules-mdc has 879 rules already in the current MDC format.

A working starter for UI work:

```
---description: Frontend design standardsglobs: ["**/*.tsx", "**/*.jsx", "**/*.css"]alwaysApply: true---- Never default to Inter, Roboto, Arial, or system fonts- Backgrounds: off-white minimum - never plain #fff- Every interactive element: hover + focus + transition- Skeletons, not spinners- 3x+ size ratio between headings and bodyBanned: card-grid-on-white, purple gradients, missing line-height
```

### The One Mistake Everyone Makes

[CLAUDE.md](http://claude.md/) and context files feel useless when written at the wrong altitude. Most people either go too vague or too specific:

-   Too vague — *“write clean code”* — the model ignores it
-   Too granular — *“use 2-space indentation”* — that’s what a linter is for
-   Right level — *“test behavior, not implementation. Never test private methods. A test that breaks on every refactor is worse than no test.”*

The goal is to capture decisions the model would otherwise make on its own — architectural choices, quality standards, what not to do and why. The more of those you document, the less time you spend correcting outputs that were technically fine but wrong for your project.

### Resources

**Claude Code**

-   [anthropics/claude-code — frontend-design](https://github.com/anthropics/claude-code) — 77.8K stars
-   [ibelick/ui-skills](https://github.com/ibelick/ui-skills) — 970 stars
-   [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — 23K stars
-   [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — 75.2K stars

**Antigravity**

-   [toonight/get-shit-done-for-antigravity](https://github.com/toonight/get-shit-done-for-antigravity) — 616 stars
-   [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) — 24.2K stars

**Cursor**

-   [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — 38.4K stars
-   [sanjeed5/awesome-cursor-rules-mdc](https://github.com/sanjeed5/awesome-cursor-rules-mdc) — 3.4K stars

**Reference**

-   [Anthropic’s Frontend Aesthetics Cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)
-   [skills.sh](https://skills.sh) — skill discovery and install marketplace

### Set It Up Once. It Compounds.

The thing that surprised me most after going through all of this wasn’t any individual skill or repo. It was how much the output quality improved once the environment was right — without changing the model, without changing how I prompted, just by giving the agent the context it needed to do its job properly.

That’s the part most developers skip. Not because it’s hard, but because it’s invisible — nothing tells you the model is underperforming because of missing context. It just quietly produces results that are 60% of what it’s actually capable of.

The models are already good enough. Most of us just haven’t built the environment to prove it yet.

Set it up once. Every project after gets better because the context engineering you’ve built carries forward.

*The repos in this post are the real value — go star them. The developers behind everything-claude-code, ui-skills, get-shit-done-for-antigravity, and the Antigravity Awesome Skills library are doing the unglamorous infrastructure work that makes all of our AI-assisted development better.*

* * *

[Context Engineering Is a Skill. Most Developers Are Skipping It.](https://pub.towardsai.net/context-engineering-is-a-skill-most-developers-are-skipping-it-9938678292b8) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.
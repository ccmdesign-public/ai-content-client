---
title: "Agents Don’t Have New Problems - They Inherited Ours"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/agents-dont-have-new-problems-they-inherited-ours-4dbbc00670f6?source=rss----5517fd7b58a6---4"
publishedAt: "2026-01-30"
tags:
  - "ai-agent"
  - "software-engineering"
  - "coding"
  - "frameworks"
---

# Agents Don’t Have New Problems - They Inherited Ours

# Agents Don’t Have New Problems — They Inherited Ours

[Vlad Ogir](https://softwarefaster.medium.com/?source=post_page---byline--4dbbc00670f6---------------------------------------)

4 min read·20 hours ago

\--

There is a lot of buzz around AI agents: run many of them in parallel, let them collaborate, and suddenly, complex work becomes cheap and fast.

![It is a promotional image released by Fox]()

*Look at Ralph Wiggum — apparently, creating multi-million dollar software is as simple as giving an agent a prompt!*

What’s interesting about Cursor’s recent experiment isn’t what they discovered — it’s how familiar the failures are.

[

## Scaling long-running autonomous coding

### We've been experimenting with running coding agents autonomously for weeks at a time.

cursor.com

](https://cursor.com/blog/scaling-agents?source=post_page-----4dbbc00670f6---------------------------------------)

If you’ve led a software engineering team, nothing in this story should be new to you.

Wilson describes the core issue plainly:

> *Today’s agents work well for focused tasks, but are slow for complex projects. The natural next step is to run multiple agents in parallel, but figuring out how to coordinate them is challenging.*

That sentence could have been written about human engineers: It’s all great when it's a green field, *just think about how fast you can move when working on a side project*. But once you scale, suddenly the calendar is full of meetings.

## Parallelism Only Works With Isolation

Wilson notes that agents are *“slow for complex projects.”* That should immediately ring a bell. Adding more people doesn’t make a complex project move faster. It usually does the opposite. Parallelism increases throughput only when work is genuinely independent.

Wilson continues:

> *The natural next step is to run multiple agents in parallel.*

Parallel work is great — **if tasks are isolated**. As soon as they aren’t, engineers step on each other’s toes. Coordination cost dominates execution. Even with several engineers, the time lost to coordination or waiting for someone can be significant.

Later, Wilson highlights another symptom:

> *pushing to the same branch with minimal conflicts.*

There *are* ways to remove conflicts entirely, but they all involve the same trade-off we already know in software engineering:

-   Don’t work on the same thing, or
-   Pay the coordination cost and the idle time

This isn’t an AI limitation. It’s a structural one.

## Flat Structures Kill Ownership

Wilson’s first coordination attempt was let agents figure it out:

> *Our initial approach gave agents equal status and let them self-coordinate through a shared file.*

How many successful teams do you know that work like this beyond a very small size?

Anything larger than a tight-knit group requires coordination. More importantly, it requires *direction*. Otherwise, the output will drift away from the value.

## Get Vlad Ogir’s stories in your inbox

 from this writer.

Wilson observed exactly that:

> *With no hierarchy, agents became risk-averse. They avoided difficult tasks and made small, safe changes instead.*

When no one owns outcomes, everyone optimises for safety. No one takes the uncomfortable step. Nothing of significance gets done.

## Congratulations, You Invented Management

Eventually, Wilson changed approach:

> *Instead of a flat structure where every agent does everything, we created a pipeline with distinct responsibilities.*

This now resembles an engineering team, with PM and engineers. Someone plans the work. Someone executes it. Someone ensures the whole thing keeps moving.

![Photo by Buddy AN on Unsplash]()

This isn’t an AI breakthrough. It’s rediscovering coordination, ownership, and sequencing, the same mechanisms humans rely on to ship software at scale.

## Removing Complexity Beats Adding Process

One of Wilson’s most telling observations is this:

> *Many of our improvements came from removing complexity rather than adding it.*

No surprise there.

The more bureaucracy you introduce, the harder it becomes for anyone — human or agent — to move. Complexity compounds coordination cost.

Their current system still shows familiar symptoms:

> *Planners should wake up when their tasks complete to plan the next step. Agents occasionally run for far too long. We still need periodic fresh starts to combat drift and tunnel vision.*

Again, no different from humans and welcome the “over-engineering” agent!

Engineers get lost in the details. They need feedback loops. They need resets. They need someone to pull them back up the abstraction stack.

## Coordination Cost Always Comes Due

In software engineering, we tend to layer systems on top of systems.

Eventually, the cost of change grows exponentially.

> You want us to send am email? We need to talk to team X because they own microservice Y, which needs to surface data to team Z, who then propagate it back to us so we can finally send the email. This will be 6 months, thank you.

If this sounds familiar, it’s because the problem isn’t the feature — it’s how the system was designed in the first place. The debt was never paid down, so every new change becomes expensive.

Agents don’t eliminate this cost. They inherit it and multiply it. The only benefit of agents here is that they can work nights.

## Opportunity Cost vs Real Cost

Agents do reduce opportunity cost, but its temporary benefit.

They let us try more things, faster. But as long as we humans and agents work in the same way, the coordination cost would not disappear.

Over time, the cost of planning, alignment, and correction grows until it outweighs the initial gains. The investment fee is still there; it’s just that the bill is addressed to an agent instead of a human.

## These Are Solved Problems

The uncomfortable truth is that none of this is new. That’s the point!

We already know how to build systems — and teams — that scale:

-   Clear ownership
-   Explicit boundaries
-   Thin slices of work
-   Coordination that is intentional and paid for consciously
-   Simplification instead of endless layering

The same constraints that apply to humans will apply to agents.

The challenge isn’t knowledge. It’s whether organisations are willing to take the brave step and actually apply what works.
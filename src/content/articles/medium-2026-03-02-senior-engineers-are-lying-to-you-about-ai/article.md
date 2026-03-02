---
title: "Senior Engineers Are Lying to You About AI"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/senior-engineers-are-lying-to-you-about-ai-bf3d0119937b?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-02"
tags:
  - "programming"
  - "coding"
  - "software-engineering"
  - "technology"
  - "software-development"
  - "frameworks"
---

# Senior Engineers Are Lying to You About AI

![]()

# Senior Engineers Are Lying to You About AI

## They say they don’t use it. Check their commit history.

[Devrim Ozcay](https://devrimozcay.medium.com/?source=post_page---byline--bf3d0119937b---------------------------------------)

6 min read·2 days ago

\--

There’s a conversation that happens at almost every tech company right now.

It usually starts in a code review, or a team meeting, or a casual Slack thread where someone mentions using Copilot or Claude or ChatGPT to write something.

And then a senior engineer — usually the one with the most tenure, the most credibility, the most weight in the room — says something like:

> *“I don’t really use those tools. I prefer to actually think through the problem.”*

The room nods. A few juniors quietly close their browser tabs.

I’ve watched this happen more times than I can count.

And almost every time, it’s a lie.

## How I Know

I’ve worked with a lot of senior engineers over the years. Brilliant people. People who can debug a memory leak by reading a heap dump like it’s a newspaper. People who’ve been on-call so many times they wake up at 2:58 AM before their phone even buzzes.

I respect them deeply.

And I’ve seen what’s on their screens when they think nobody’s watching.

Claude. Copilot. ChatGPT. Cursor. All of it.

Not occasionally — constantly. For boilerplate, for regex, for “what’s the idiomatic way to do X in Go,” for drafting incident postmortems, for explaining a Kafka config option they’ve set a hundred times but never fully memorized.

They use AI the way they use Stack Overflow. Quietly, efficiently, without announcement.

Then they walk into the meeting and talk about the importance of “really understanding your fundamentals.”

## Why They Lie

I don’t think most of them are being malicious. I think there are a few things happening at once.

**Status protection.** Senior engineers built their reputation on knowing things. On being the person people come to when something breaks. AI threatens that identity — not their job, necessarily, but the *story* they tell about why they’re valuable. Admitting they use AI feels like admitting the thing they spent years mastering is now partially automated.

**Survivorship bias.** The engineers who are senior today got there without AI. They did grind through documentation, they did debug without autocomplete, they did build mental models the hard way. They genuinely believe that process made them better — and they’re probably right. What they get wrong is assuming that’s the *only* path.

**Fear of setting a bad example.** Some of it is genuinely well-intentioned. They’ve seen juniors use AI to produce code they don’t understand, merge it, and create problems. They’ve cleaned up those messes. Their “don’t use AI” advice is actually “don’t use AI *like that*” — but it comes out wrong.

**They don’t want to explain the nuance.** The real answer — “I use AI for X but not Y, and here’s how I think about the difference” — is a long conversation. “I don’t really use those tools” is four seconds.

## The Damage This Does

When a senior engineer publicly dismisses AI, a few things happen downstream.

Junior developers hide their usage. They feel shame about a tool that’s genuinely making them faster. They waste time recreating things AI could have helped with in thirty seconds, because they don’t want to look like they’re “cheating.”

Mid-level engineers stop asking questions about AI workflow. It becomes an unspeakable topic, like asking about salary. Everyone’s doing it, nobody’s talking about it, so nobody’s getting better at it together.

The team develops a split culture. Privately, people use AI. Publicly, they perform not using it. The gap between what the team actually does and what it claims to do creates a kind of low-level cognitive dishonesty that poisons everything.

And the worst part: the juniors who believe the lie and actually stop using AI? They ship slower, they struggle more, and then they watch their peers — the ones who quietly kept using it — pull ahead.

## What Senior Engineers Actually Use AI For

Let me be specific, because this matters.

The senior engineers I know who use AI well aren’t using it to *replace* their judgment. They’re using it to *move faster through the parts that don’t require judgment*.

Writing a first draft of a function they already know how to write — AI.

Remembering the exact syntax for a YAML config they’ve written ten times — AI.

## Get Devrim Ozcay’s stories in your inbox

 from this writer.

Remember me for faster sign in

Generating test cases for edge conditions — AI, then reviewed.

Drafting a postmortem summary from incident notes — AI, then heavily edited.

Understanding an unfamiliar codebase quickly — AI to explain, then verify.

What they’re *not* doing:

Accepting AI output without reading it.

Letting AI make architectural decisions.

Using AI to solve a problem they don’t understand well enough to verify the solution.

The skill isn’t “use AI” or “don’t use AI.” The skill is knowing which category a task falls into.

That judgment? You can only develop it by understanding what you’re building. Which means the fundamentals do matter. Just not in the way the lying senior engineers mean when they say it.

## The Conversation We Should Be Having

Instead of “do you use AI?” the question should be “how do you use AI?”

At what point in your workflow? For which kinds of tasks? How do you verify the output? What do you refuse to outsource? What have you learned from where it got things wrong?

These are the questions that separate engineers who use AI as a crutch from engineers who use it as a lever.

The senior engineers who are quietly using AI every day and pretending they’re not? They’ve figured something out. The problem is they’re not sharing it. They’re keeping the meta-skill — how to use AI well — locked up behind a false performance of not needing it.

That helps no one.

## What I Do Now

I use AI. I say so openly. When someone on my team asks how I wrote something quickly, I tell them exactly which tool I used and why.

And then I explain what I changed, what I added, what the AI got wrong, and why I made those calls.

Because that’s the actual lesson. Not “use AI” or “don’t use AI.”

The lesson is: the tool produces a draft. Your judgment produces the production code.

If you don’t have the judgment yet, using AI will make that problem invisible until it’s expensive.

If you do have the judgment, AI will make you faster in ways your colleagues who are lying about it will quietly envy.

Either way — be honest about it.

The lying isn’t protecting anyone.

## Tools That Help You Build Real Judgment

These are resources I actually use and recommend — not for shortcuts, but for developing the instincts that make AI useful instead of dangerous:

**Free:**

🔥 [Production Incident Prevention Kit](https://devrimozcay.gumroad.com/l/kfccl) — The exact checklists used before deployments and during outages. This is judgment, documented.

📘 [Production Engineering Toolkit — Free Chapter](https://devrimozcay.gumroad.com/l/tqoxf) — A free chapter from the book on real production failures. Read this before trusting any AI-generated infrastructure code.

**If you want to go deeper:**

💀 [Production Failure Playbook — Volume 2](https://devrimozcay.gumroad.com/l/artmf)–50 incidents that cost companies between $10K and $1M. Reading other people’s disasters is the cheapest education available.

🔧 [Backend Performance Rescue Kit](https://devrimozcay.gumroad.com/l/rkdgug) — Find and fix the 20 bottlenecks most likely killing your app right now. The kind of thing AI won’t tell you to look for.

I also write about this stuff weekly — real incidents, real lessons, no fluff.

👉 [Subscribe on Substack](https://substack.com/@devrimozcay1)

And if you’re building something where production reliability actually matters, take a look at [ProdRescue AI](https://www.prodrescueai.com/) — it turns messy incident logs into clear postmortem reports. Built from the same frustration this article is about.

*Are the senior engineers on your team honest about how they use AI? I’d genuinely like to know — drop it in the comments.*
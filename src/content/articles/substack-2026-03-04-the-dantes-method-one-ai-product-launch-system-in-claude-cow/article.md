---
title: "The Dantès method: one AI product launch system in Claude Cowork"
subtitle: "I built a 5-phase AI launch system inside Claude Cowork and ran it on a live product launch. The full architecture, the mistakes I made first, and what each phase produced."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/ai-product-launch-claude-cowork"
publishedAt: "2026-03-04"
tags:
  - "ai-general"
  - "automation"
  - "claude"
  - "education"
  - "product-management"
  - "workflow"
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-04T16:12:08.292Z"
---

# The Dantès method: one AI product launch system in Claude Cowork

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today, we’re building an AI launch system inside Cowork and then using it on a real launch happening right now.**

Edmond Dantès sits in a cell for fourteen years and creates an entire revenge architecture he can’t use yet. Every identity and every sequence of moves is constructed in the dark for a world he can’t see.

![The Count Of Monte Cristo | textscouter](https://substackcdn.com/image/fetch/$s_!_P-q!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F367b0cf1-ecf3-48b1-90b9-fbd4e8fb2f53_540x360.jpeg)

When he finally escapes Château d’If, he’s ready to execute because the work of knowing was already done.

A lot of product launches are the opposite.

You’ve been brainstorming for months, you pick a date, and then launch week arrives and suddenly every decision you postponed hits you at once. And if you decide to use AI in that moment, you get best practices because Claude doesn’t know your offer, your audience’s fears, or the positioning question you’ve been avoiding for three weeks.

I built a system that fixes this.

One Cowork plugin, one command, five phases, one conversation that compounds. Then I ran it on a launch - my paid newsletter tier launching next week, RobotsOS.

Let me show you what’s inside:

1.  Why launches fall apart under pressure
    
2.  The problem with using AI mid-launch
    
3.  How I built the *Launch Like Dantes* plugin in Cowork
    
4.  Inside the plugin: one command, six skills, three connectors
    
5.  Running /launch-doc on a real launch, phase by phase
    
6.  Go build yours
    

![](https://substackcdn.com/image/fetch/$s_!Vq-C!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d4767b6-9bc1-44c6-90f0-b85a1bdacc6d_1200x35.png)

## **Why launches satisfice and what AI can’t fix without a system**

Roy Baumeister’s ego depletion research found something that anyone who’s ever launched anything already knows in their body: **t[he more decisions you make in a row, the worse each subsequent decision gets](https://en.wikipedia.org/wiki/Decision_fatigue).**

Your brain doesn’t crash dramatically. It starts taking shortcuts. You get impulsive (sure, send that email at midnight) or you go passive and avoid deciding altogether.

A product launch is basically a decision marathon disguised as a project.

* * *

*This post covers the same core idea - the cost of rushing and why depth matters:*

[

#### To go fast with AI, first go slow

](https://robotsatemyhomework.substack.com/p/to-go-fast-with-ai-first-go-slow)[Mia Kiraki 🎭](https://substack.com/profile/362428399-mia-kiraki)·September 3, 2025[Read full story](https://robotsatemyhomework.substack.com/p/to-go-fast-with-ai-first-go-slow)

* * *

Positioning, pricing, email copy, CTA wording, deadline, bonuses, what to say on LinkedIn, what NOT to say on LinkedIn, whether your sales page actually communicates what you think it communicates.

**Now think about your launch decisions at 11pm on day four.**

This is where most people reach for AI to help and this is where AI fails them in a very specific way.

You open Claude, you type “help me with my launch positioning,” and [you get back best practices](https://robotsatemyhomework.substack.com/p/diagnose-it-before-you-prompt-it). And if you’re already in decision fatigue, you don’t HAVE the cognitive resources to give it what it needs. You can’t construct a detailed brief for AI when your brain is already taking shortcuts on everything else.

If you don’t have a system that already holds your launch context then AI becomes another decision you have to make instead of a decision that’s made easier.

You’re asking a tool to help you think while simultaneously being too depleted to tell it how.

So I built the system to solve that.

## **The first mistake: five commands that don’t talk to each other**

I went into Cowork and started creating a launch intelligence plugin.

The reason it had to be a plugin and not just a prompt or a skill is the exact issue above: if your launch system requires you to paste stuff, iterate, and use too much brainpower in that exact moment, it will not survive contact with launch week. You’ll be too fried.

A plugin pre-loads all of that and the context lives inside the system before you need it. One slash command and it runs.

However, I got the architecture wrong on the first try.

Dantès didn’t build five separate revenge plans. He built one architecture with everything talking to each other.

My first version did the opposite. It was five separate commands:

![](https://substackcdn.com/image/fetch/$s_!JpVo!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa1c6f69c-3384-44c6-8a63-84e4b019776c_1376x768.png)

-   `/clarity` — nail the offer in one sentence
    
-   `/positioning` — [map the competitive landscape](https://robotsatemyhomework.substack.com/p/your-competitors-are-sketching-their)
    
-   `/objection-map` — generate every reason someone won’t buy
    
-   `/page-audit` — check what the sales page actually communicates
    
-   `/debrief` — post-launch forensics
    

This felt logical, but then I actually tried to use it.

Each command was its own island. `/clarity` produced a great offer statement. Then `/positioning` started from zero and it had no idea what the offer was unless I pasted it in again. `/objection-map` didn’t know my audience unless I told it again.

Every command was intelligent in isolation. Together, they were five strangers in a room who’d never met.

If you want compound intelligence, you can’t split it across five commands. The compounding has to happen inside a single conversation.

One command. Five phases. One conversation that builds on itself.

That’s version two.

![](https://substackcdn.com/image/fetch/$s_!JbYo!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffcb7ffd0-ed8c-4988-991c-a55d07ab61cb_1200x35.png)

## **How I set up the AI launch system in Cowork**

I went into Claude Cowork and told Claude:

*“I want to build a custom plugin called ‘Launch Like Dantes.’ Its job is to prepare me for a product launch by running a guided 5-phase session and producing a complete launch document.”*

Claude started asking design questions that forced me to think about decisions I hadn’t considered.

**“Do you have phases in mind, or should I suggest them?”** I said: a mix of both. I wanted my specific priorities reflected (what I know I always need for any launch) but I also wanted Claude to suggest structure I might have missed.

Handing it off entirely would get me a generic framework. Dictating everything would just be me writing a prompt the long way. The mix gave me something better than either.

![](https://substackcdn.com/image/fetch/$s_!cl0U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4148687d-f39b-4cd7-96b9-4b859d02f6d9_1376x768.png)

**“What type of launch should this be designed for?”** I picked: flexible. I don’t only launch digital products. I launch collaborations, content tiers, services, software. A system that only knows “digital product launch” would be useless half the time. Flexible means the phases adapt to whatever I’m launching, not the other way around.

**“What format should the final document be?”** I said: let me choose each time. Sometimes I want Markdown to paste into Notion. Sometimes I want a doc I can send to a collaborator. Baking in one format would make the system rigid in the place where I want it loose.

**“Which phases do you definitely want included?”** I chose:

-   **Offer Clarity** - What is the offer? What problem does it solve? What transformation does it promise?
    
-   **Audience & Fear Map** - Who is it for? What are their fears, objections, and desires?
    
-   **Messaging & Content Plan** - Core narrative, taglines, content assets needed
    
-   **Channel & Distribution Strategy + Asset Audit** - Where/how to reach people, what assets exist vs. need creating
    
-   **Timeline & Milestones** - Key dates, dependencies, countdown to launch day
    

The standard launch checklist is fine but without the fear map and the offer clarity work, you end up with a [plan built on assumptions you never stress-tested](https://robotsatemyhomework.substack.com/p/lord-varys-knew-the-story-always).

**“Should the plugin pull context from connected tools?”** I said: ask me each time. Because sometimes I’m prototyping and don’t want it touching my live workspace. Sometimes I’m working on something early-stage and sensitive. “Ask me each time” keeps the system from making decisions I should be making.

Cowork came back with a proposed plugin structure. The five phases looked right.

I said let’s do it, then stopped just before it started generating, because I wanted to add a few more things before it assembled the files:

1.  Add five skills that load automatically across the whole plugin: brand-essence, business-profile, voice-dna, audience-profile, robots-os-essence.
    
2.  Add three connectors: Notion, Figma, and Ahrefs.
    
3.  Build one slash command: `/launch-doc`.
    
4.  Show me the full structure before finalizing because I want to review it.
    

‼️One honest note here: I told it to pull my `.md` files from Notion, which is not a best practice. Notion pulls eat tokens fast. The better approach is to store your context files as actual `.md` files and upload them directly, or store them in the folder you work with.

## **What’s inside the AI launch system: one command, five skills, three connectors**

After review, here’s the full structure Cowork built:

```
launch-like-dantes/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   └── launch-doc.md
├── skills/
│   ├── launch-session/       ← The 5-phase methodology engine
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── phase-guide.md
│   ├── brand-essence/        ← Pulled from Notion
│   ├── business-profile/     ← Pulled from Notion
│   ├── voice-dna/            ← Pulled from Notion
│   ├── audience-profile/     ← Pulled from Notion
│   └── robots-os-essence/    ← Pulled from Notion
├── CONNECTORS.md
├── .mcp.json                 ← Notion, Figma, Ahrefs
└── README.md
```

**1 command -** `/launch-doc` kicks off the guided session, loads all context, and runs all five phases in sequence.

**6 skills** - The five context skills: brand-essence, business-profile, voice-dna, audience-profile, and robots-os-essence. These load automatically. Claude knows who you are, how you sound, who your audience is, and what you’re selling before you type a single word. PLUS the extra launch-session SKILL.md.

**3 connectors** - Notion, Figma, and Ahrefs. All optional, chosen per session. Notion pulls your live launch assets (the real sales page draft, email drafts, anything in your workspace). Figma pulls visual assets. Ahrefs pulls search data around your offer’s keywords.

Here’s the logic I wrote into the `/launch-doc` command:

> ***Run a complete Launch Like Dantes session. This is a guided, 5-phase launch preparation process that produces a polished launch document.***
> 
> [See the rest of it here](https://docs.google.com/document/d/1UZOchsSYcMgZeIcbU4ax7C4CLhMXdhWQXNVUX0Vs3FI/edit?usp=sharing).

I saved the plugin. Then I ran it on my own launch.

## **5\. Running** `/launch-doc` **on a real launch, phase by phase**

First thing it did: asked me what I’m launching. One of the pre-populated options was RobotsOS (paid tier). Small win. It already knew.

Then it asked if it could pull from my connected tools. I said yes.

### **Launch phase 1: Offer clarity**

It asked me things I hadn’t sat down to answer clearly (what pricing am I thinking of, stuff related to my build spec and MVP docs, where I stand with launching RobotsOS and what my target launch date is).

Out of all these things, turns out I had two value propositions running in parallel, pulling in slightly different directions, and I hadn’t noticed because I’d been too close to both for too long.

The output:

-   Offer statement
    
-   Problem → transformation
    
-   Differentiators
    
-   Pricing clarity
    
-   One-liner: *“ROBOTS OS is the operating system for how you work with AI, ready to plug in and run.”*
    

That last one I loved.

### **Launch phase 2: Audience & fear map**

It went through my five personas from the audience-profile skill, asked a few clarifying questions, and then did something I didn’t expect: it ranked them.

It said I have a primary and secondary audience for this specific launch, and they need different messaging. (I knew this intellectually. Having it stated explicitly, in a document, is different from knowing it.) It also zeroed in on one part of the RobotsOS offer that it flagged as something I wasn’t fully confident in - and it was right.

The Fear Map it produced had layers like: the surface fears, the real fears underneath, fear-as-identity (the story someone tells themselves about why they’re not ready), and the honest response to each.

Then, conversion levers by persona:

-   **Persona 1:** “We actually build this. Download it and run it.”
    
-   **Persona 2:** “Use this Monday morning.”
    
-   **Persona 3:** “Adapt this for clients.”
    
-   **Persona 4:** “Your experience is the advantage — this system uses it.”
    
-   **Persona 5:** “You can do this. Start with one system.”
    

Five different people, five different doors into the same offer.

### **Launch phase 3: Messaging & content plan**

I already had a rough sense of how I wanted the content plan to look. I ran this phase anyway because I wanted to see what the system would do with the context it had accumulated from phases 1 and 2.

The first question it asked was about the launch story. I said: *“Build this for myself first.”* That’s been true for RobotsOS, and it’s been true for most things I’ve shipped.

Then it asked: *What’s the single action you want someone to take after seeing this launch?* Simple: subscribe to RobotsOS yearly.

Then it asked which RAMH category the launch post belongs to. I said: *The robots are talking.*

With those three answers locked in, it drafted five tagline options, voice-checked against my Voice DNA skill.

The launch newsletter format came out of Phase 3 too, and it was the right call. It’s a post on how I built and use one of my AI systems (skill + persona + agent). That is the story and RobotsOS is the reveal at the end. Show, don’t sell.

Then it asked what content assets I want to produce for the launch.

### **Launch phase 4: Channel & distribution and asset audit**

This phase was all about what we’re launching and where. Newsletter first, everything else secondary.

With 1000+ subs and no partnerships lined up, the launch was going to live on the existing list. LinkedIn and Substack notes would amplify this.

For the distribution plan, it suggested:

-   **Pre-launch (one week out):** 1–2 teaser Notes + one LinkedIn post hinting at what’s coming. No reveal yet.
    
-   **Launch day (Wednesday):** The newsletter post with the persona field report → RobotsOS reveal, plus a LinkedIn post and a Substack Note going out the same day.
    
-   **Post-launch (week after):** Follow-up LinkedIn post, 2–3 supporting Notes, welcome email running for new subscribers.
    

It also gave me a nicely organized table of all the assets I have ready and everything else I need to work on!

### **Launch phase 5: Timelines & milestones and the compiled launch document**

Phase 5 compiled everything from the session into one document: offer statement, positioning, primary buyer profile, fear map with objection responses, the decision of a single welcome email and the sprint calendar, and a post-launch priorities list.

The document you keep open during launch week. And it literally gave me a 10-day calendar.

**The best thing you can do for a friend who’s launching? This.**

![](https://substackcdn.com/image/fetch/$s_!yEk6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c86f461-af08-447d-9296-d1f16328fbc6_1200x35.png)

## **Go build yours**

Here’s what you need:

1.  Have your context files ready as `.md` files: brand, voice, audience, offer, business
    
2.  Tell Claude Cowork: “Build me a launch intelligence plugin with these skills and one command called `/launch-doc`“
    
3.  Add your connectors: Notion, Figma, any data tools you actually use
    
4.  Paste in the command logic from section 4 and adapt the phases to your world
    
5.  Test it on something real, your next launch
    

Then activate it: Open Cowork. Type `/launch-doc`. Answer Phase 1. Let phases 2–5 run. By the end, you have a document that knows your brand, your audience, your offer, your fears, and your messaging logic, all in one place, ready for launch week.

That’s everything. Go build it. And while you’re building, what are you launching? Tell me in the comments.

[Leave a comment](https://robotsatemyhomework.substack.com/p/ai-product-launch-claude-cowork/comments)

Next Wednesday I go live with RobotsOS and find out if all of this holds under actual launch pressure. I’ll tell you what happened either way.

I’d love for you to be there when it does.

To fourteen years of prep and one very smooth launch week,

Chief 🤖 at ROBOTS ATE MY HOMEWORK
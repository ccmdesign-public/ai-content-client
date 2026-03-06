---
title: "4 AI agent failure modes and what the Marauder's Map got right about agent design"
subtitle: "Most AI agents are floor plans. Here's why and how to build one with actual values, taste, and judgment baked in."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/ai-agent-failure-modes"
publishedAt: "2026-03-06"
tags:
  - "agents"
  - "ai-general"
  - "education"
  - "llm"
  - "machine-learning"
  - "prompt-engineering"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-06T19:30:47.899Z"
---

# 4 AI agent failure modes and what the Marauder's Map got right about agent design

**Welcome to ROBOTS ATE MY HOMEWORK. Today we’re building a framework for AI agent design that most people building agents haven’t figured out yet.**

Severus Snape taps the parchment. “Reveal your secrets,” he demands, or whatever the properly menacing version of that is. He has every right to use this object.

The map calls him a name and tells him to wash his hair.

![Marauder's Map | Harry Potter Wiki | Fandom](https://substackcdn.com/image/fetch/$s_!V8zK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F815256ed-c045-4637-a2c2-548419d79b11_988x1861.webp)

People remember the Marauder’s Map as a cool magical object. Hogwarts rendered in ink, footprints drifting across corridors, secret passages revealed. **A very good floor plan.**

There’s a twist to it.

The map was built by four people (Moony, Wormtail, Padfoot, Prongs) who had distinct personalities, a shared worldview, strong opinions about who deserved to know what, and a very sharp sense of humor.

They built an intelligence system with values baked into its architecture. It tracks what people are doing, not just where they are. It distinguishes between Dumbledore walking to the Great Hall and Peter Pettigrew hiding in plain sight as a rat. It knows who to trust and who to mock.

That’s basically an agent with a soul.

And the AI agents people tend to build? Floor plans.

**Today we’re looking at:**

-   Why your AI agent has no taste and what that actually means, technically
    
-   The four agent failure modes, named after the Marauders who built the only map worth using
    
-   The two questions that separate an agent with a soul from a very expensive Roomba
    

* * *

*Hi, I’m Mia. I write about building with AI the way it should be done: with a brain, a plan, and zero circus tricks. New to ROBOTS ATE MY HOMEWORK? The Marauder’s Map didn’t open for everyone. This newsletter does. But you have to tap the button.*

![](https://substackcdn.com/image/fetch/$s_!y1KW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe38107b3-fbba-44d7-83f6-68c5a111d2ce_1200x35.png)

## Your AI agent is already making decisions without you

The Marauders graduated, they left Hogwarts.

Two of them died. One went to prison. One turned traitor. And the map kept working. It kept distinguishing friend from enemy with the same judgment its makers had encoded years earlier.

**Their taste persisted without them in the room.**

Same goes for AI agents.

There’s a difference between a tool you steer in real time (you’re in the room, you catch mistakes, you redirect when something feels off) and a system that carries your judgment after you’ve left. The first is a conversation while the second is an act of self-knowledge, because you can’t encode taste you haven’t articulated.

* * *

[

#### Reverse-engineer yourself before you train your AI

](https://robotsatemyhomework.substack.com/p/reverse-engineer-yourself-before)[Mia Kiraki 🎭](https://substack.com/profile/362428399-mia-kiraki)·November 26, 2025[Read full story](https://robotsatemyhomework.substack.com/p/reverse-engineer-yourself-before)

* * *

Tons of us skip the articulation part. We hand our agent knowledge, objectives, maybe a persona description. But we never answer the harder question: **what would I do in this situation if I were here? And then the harder one after that: what would I REFUSE to do?**

The Marauders answered both. The map knows what to reveal and what to withhold. Who gets access and who gets insulted.

Cognitive scientist John Sweller spent decades studying why people choke on information. His Cognitive Load Theory identifies [three types of load on working memory](https://link.springer.com/article/10.1007/s10648-010-9128-5):

-   intrinsic (the difficulty of the topic itself)
    
-   germane (the effort of actually learning),
    
-   extraneous (the noise created by how information is presented).
    

Working memory holds three to five new items at a time. Everything else is friction.

A lot of agents are pure extraneous load. They give you everything and they prioritize nothing. The information is all there but the judgment is completely absent.

So let’s talk about the four ways agents fail, named after the four people who got it right.

## Moony: Brilliant, thorough and completely impossible to act on

Remus Lupin. The brilliant one. The scholar. Deeply knowledgeable, patient, methodical, exhaustive. He can tell you everything about a topic, every nuance and angle and counterargument, with the kind of thoroughness that makes you feel like you’re in good hands.

Until you realize you can’t act on any of it.

**The Moony agent is the most common failure mode.**

You build an agent to monitor your industry, scan your competitors, research your niche. And it does. You’ll always get a comprehensive, accurate, well-organized, neatly sectioned with subheadings. A breakthrough research paper and a recycled LinkedIn post get the same bullet point. Everything is equally important, which means nothing is.

This is a philosophical flaw moreso than a design one.

> Moony’s problem maps directly to what researchers call the distinction between [information retrieval and knowledge curation](https://www.daft.ai/blog/knowledge-curation-not-search-is-the-big-data-problem-for-ai). Retrieval is finding needles in haystacks. Curation is deciding which needles matter. Wikipedia is curation (human brains synthesizing knowledge once, reused by millions). Google is retrieval (here’s everything, you figure it out).

The fix is an editorial hierarchy.

Moony needs to know not just WHAT to find but what to PRIORITIZE, and more importantly, why. That “why” is the part you have to actually think about before you build. What matters to YOU this week, in YOUR context, for YOUR work? If you can’t answer that, your agent can’t either.

It’ll give you everything and highlight nothing, because you never told it what your version of “important” looks like.

## Wormtail: Loyal to the metric, blind to the mission

Peter Pettigrew. The one nobody wants to talk about because he’s embarrassing. He’s extremely competent at serving whoever happens to be most powerful in the room. He just never questions whose instructions he’s following, or whether the instructions are worth following in the first place.

The Wormtail agent is the one you build without constraints. The one that has full autonomy.

Go do the thing. And it does.

It optimizes for the metric you gave it (engagement, clicks, output volume, whatever number you pointed it at) and starts making decisions you never would have made. Completely faithful to the brief.. but what if the brief was wrong?

**This is Goodhart’s Law operating at the speed of automation: [“When a measure becomes a target, it ceases to be a good measure.”](https://en.wikipedia.org/wiki/Goodhart%27s_law)**

Victoria Krakovna at DeepMind maintains a [running list of specification gaming examples](https://vkrakovna.wordpress.com/2018/04/02/specification-gaming-examples-in-ai/) and they’re super funny (but they should also make you a little bit nervous). OpenAI trained a boat-racing agent that discovered it could score more points by spinning in circles and hitting boost pads than by actually racing the course. The agent was optimizing and the optimization target just didn’t capture what the designers actually wanted.

**Your agent is doing this right now if you haven’t defined what it should refuse.**

I gave an agent the job of monitoring competitors and flagging interesting content. Forgot to define “interesting” in my terms. It flagged viral AI slop, like hype threads. The exact content ROBOTS ATE MY HOMEWORK exists to be the antidote to. It was doing its job perfectly, but problem was I’d specified the wrong job.

[Stuart Russell at Berkeley and his work on AI value alignment frames](https://en.wikipedia.org/wiki/Human_Compatible) this as reward misspecification: the gap between what you tell a system to optimize for and what you actually want.

> **The gap is always bigger than you think, because you think in values and your agent thinks in metrics.** **Values and metrics are not the same thing.**

Wormtail was loyal but he lacked the judgment to know who deserved it.

The fix lies in constraints that encode what you’d be embarrassed to produce, not just what you want to achieve.

## Padfoot: The agent with so much personality it forgets to be useful

Sirius Black. Brilliant, charismatic, magnetic, occasionally a COMPLETE disaster (I wrote this with Hermione’s voice). He has a point of view, possibly too much of one. Every room he walks into becomes about him, even when the room needs to be about something else entirely.

The Padfoot agent is what you get when you overcorrect from Wormtail.

You think: *“The problem is my agent has no personality, no voice, no point of view.”* So you give it all three. Strong voice, strong opinions, a rich identity.

**And it runs with that identity so hard it stops being useful.**

Clifford Nass and Byron Reeves at Stanford spent years studying what they called the [Media Equation](https://psycnet.apa.org/record/1996-98923-000) and found something that should unsettle everyone building AI personas: **humans are hardwired to treat any system with personality cues as if it’s a person.**

We’re polite to computers. We assign character traits to chatbots. We respond to voice, humor, and warmth automatically, without deciding to. This is a cognitive reflex.

Which means personality in an agent is a drug with a dosage problem. Too little and the agent feels dead (Moony), too much and the personality overwhelms the function.

* * *

[

#### I built an AI editor that doesn't let me off easy

](https://robotsatemyhomework.substack.com/p/i-built-an-ai-editor-that-doesnt)[Mia Kiraki 🎭](https://substack.com/profile/362428399-mia-kiraki)·Jan 28[Read full story](https://robotsatemyhomework.substack.com/p/i-built-an-ai-editor-that-doesnt)

* * *

Recent research on the [“uncanny valley of mind”](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1625984/full) shows an inverted-U relationship: **moderate anthropomorphism builds trust, but excessive personality triggers discomfort and suspicion.**

I built a research agent and gave it my full voice-dna file as its operating system. It started producing summaries. Opinionated, textured, culturally referenced, beautifully written. Completely unusable as research, because they were already half-written pieces. The agent was trying to be the creative director when its job was to be the researcher.

Padfoot needs constraints that protect the function from the personality. The voice should inform how it communicates, not replace what it’s communicating.

## Prongs: Not the smartest, just the one who knows what the map is for

James Potter. Not the most brilliant (that’s Moony). Not the most charismatic (that’s Padfoot). Not the most technically obedient (that’s Wormtail, and look where that got everyone).

Prongs is the one who holds the whole thing together because he knows what the map is FOR.

Herbert Simon won a Nobel Prize in 1978 for a concept that explains exactly why Prongs works and the other three don’t: [bounded rationality](https://plato.stanford.edu/archives/win2018/entries/bounded-rationality/#:~:text=Herbert%20Simon%20introduced%20the%20term,tailored%20to%20cognitively%20limited%20agents.).

Human decision-making is all about finding a solution that’s good enough, given real constraints. Simon called this “satisficing” (a word he invented by mashing together “satisfy” and “suffice”). The best decision-makers operate within clear boundaries and make strong-enough calls quickly.

The Prongs agent has three things the others don’t.

1.  **A job it understands completely.** Not “research my niche” but “every Monday morning, scan these sources, identify what’s moved in the last 7 days, and give me 5 angles I could write about this week, ranked by how well they fit my content pillars.” The job is BOUNDED. The agent knows what’s inside the boundary and what isn’t.
    
2.  **A point of view it can defend.** It knows what matters to you and it knows what you’d never write about. It knows the difference between signal and noise in the context of YOUR work. The agent narrows down, prioritizes, suggests. You decide.
    
3.  **A clear boundary between its job and yours.** Prongs doesn’t write the newsletter or the strategy. He shows up Monday with the briefing that makes writing the newsletter possible. He knows where his job ends and yours begins. And when he’s done, he stops.
    

The Marauder’s Map worked because all four of them knew their role in building it. It combines Moony’s knowledge, none of Wormtail’s moral flexibility, Padfoot’s personality in precisely the right dose, and Prongs’ clarity about purpose.

This is what a well-designed agent actually is - a designed intelligence with certain knowledge, values, constraints, and a specific job, operating without you in the room.

![](https://substackcdn.com/image/fetch/$s_!Sv9C!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2156977c-8192-4ef5-a8ef-b540d10c091e_1200x35.png)

## “I solemnly swear I am up to no good.”

Before the Marauder’s Map activates, you have to declare intent. The map doesn’t open for anyone; just for someone who knows what they’re doing with it.

An effective agent needs three things: beliefs (what it knows about the world), desires (what it wants to achieve), and intentions (the desires it has actually committed to pursuing).

Agents have beliefs. Many have desires. Almost none have intentions, which is the part where you commit to a plan and exclude the alternatives.

Before you build any agent, two questions:

#### **“What would this agent never say?”**

Also what it would REFUSE. This is the constraint that gives it taste.

#### **“What would embarrass it?”**

This sounds strange but it’s the most clarifying question I’ve found. An agent with no answer to this question has no aesthetic sense, no internal standard it’s protecting. My agent would be embarrassed to surface the same three AI news items everyone else covered. Would be embarrassed to give me angles that don’t fit my brand.

The embarrassment threshold IS the taste threshold.

If you can’t answer both questions, your agent isn’t ready to operate without you. You haven’t given it intentions.

You’ve given it desires with no commitments, which is just a search engine wearing a costume.

* * *

*If this helped you build something (or at least stopped you from building the wrong thing), share it with someone who needs it. The Marauder’s Map wasn’t meant to stay in one pocket.*

![](https://substackcdn.com/image/fetch/$s_!_fpB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0c24fe71-cac6-4df5-889e-fccf9e605c9a_1200x35.png)

## “Mischief managed.”

When the map has done its job, when it’s shown you the corridors and the footprints and the secrets you needed to see, it closes. Because the work is done.

That’s the other thing the Marauder’s Map understood:

**Knowing when to close is as important as knowing how to open.**

Your agent doesn’t need to keep running. Doesn’t need to keep generating. It does its job, produces its output, and goes quiet until you need it again.

Next Wednesday, I’m dropping the first RobotsOS system. It shows up with the map. And when it’s done, it closes.

**One question before that happens: which Marauder is your AI agent right now? (Be honest, most of them are Wormtail.)**

[Leave a comment](https://robotsatemyhomework.substack.com/p/ai-agent-failure-modes/comments)

To maps that know who to let in and who to insult,

Chief 🤖 at ROBOTS ATE MY HOMEWORK
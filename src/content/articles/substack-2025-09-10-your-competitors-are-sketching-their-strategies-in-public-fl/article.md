---
title: "Your competitors are sketching their strategies in public, flaws and all"
subtitle: "How to train your eye to see their strategic weakness before the ink is even dry."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/your-competitors-are-sketching-their"
publishedAt: "2025-09-10"
tags:
  - "ai"
  - "education"
---

# Your competitors are sketching their strategies in public, flaws and all

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today we’re examining paintings to find the truth.**

Everyone thinks they know the Mona Lisa.

We see the famous, enigmatic smile and we move on. But for centuries, the real genius of the painting was invisible.

[Scientists See Her Looking at Them](https://pmc.ncbi.nlm.nih.gov/articles/PMC6327345/)

It was only when scientists used multi-spectral scanning that they discovered what was happening underneath: dozens of microscopic layers of glaze, a technique called “sfumato” that created the life-like quality no one could replicate.

They had to look through the finished painting to understand the process that made it a masterpiece.

This is how we’ve been trained to look at our competitors. We see their finished smile (their homepage, their pricing page) and we react to that. But we rarely see the layers of strategy underneath. We miss the technique.

My entire goal today is to give you that analytical eye. I’ll cover:

-   A step-by-step playbook for building the AI agent that performs the deep analysis for you.
    
-   A powerful mental model to help you interpret the strategic “brushstrokes” your competitor is showing you.
    
-   The one question that reveals the hidden flaw in their composition.
    

* * *

### **🤖 ROBOT REPORT CARD**

Alright, let's get into the mechanics of this thing.

The goal here is to build a system that feels less like a chore and more like a weekly, private art showing of your competitor's strategy. I'm going to walk you through the exact five-step process I use.

My first attempts at this were a mess. I was just pulling random data, using lazy prompts, and getting back garbage that made me feel more anxious, not smarter.

This system is the result of a lot of trial and error. It works because it’s disciplined.

#### **Step 1: Set up your sources**

![](https://substackcdn.com/image/fetch/$s_!V-EC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7bc4c5dc-3b32-4f2e-85fe-ba5296c2937e_1280x896.jpeg)

You can't analyze a painting without the right pigments.

And if you're only looking at your competitor's homepage, you're essentially trying to understand a Rembrandt by only looking at the color blue. It’s useless.

You need to pull from four specific sources for each of your top 3 competitors. These are your raw materials:

-   **Their blog RSS feed:** This is the primary canvas, where they lay out their big ideas and core arguments. It's the purest form of their strategic thinking (if your competitors are on Substack, I highly recommend [Karen Spinner](https://open.substack.com/users/363410124-karen-spinner?utm_source=mentions)’s new tool, [StackDigest](https://stackdigest.io/)).
    
-   **Their YouTube channel:** Video is high-effort. Think of it as their most expensive pigment. What they choose to spend that capital on tells you exactly what they believe is their most important message.
    
-   **Their press/media page:** This is the varnish. It's the glossy, perfected story they want the world to see. It tells you about their public-facing narrative and how they want to be perceived.
    
-   **A Google News search URL:** This is the critic's review, and it's the only source you'll use that they don't control. It shows you how the rest of the world is interpreting their work. Super important for cutting through their own spin.
    

#### **Step 2: Choose your agent tool**

You need a tool to connect these sources to an AI. I use and recommend [Make.com](https://www.make.com/en) for this. [Zapier](https://zapier.com/) is fine for simple, two-step automations, but for a multi-source workflow like this one, Make’s visual interface is just more intuitive. You can visually map the flow of information from four sources into one, which is difficult to manage in Zapier's linear list format.

But let's be clear: the tool is not the magic. The real work happens in the next two steps.

#### **Step 3: Build the "Scout" agent**

Inside Make (or your tool of choice), you're going to build a simple workflow. The goal is to have a “scout” that, once a week, goes out and gathers all the raw material for you.

Set the trigger for every Monday morning. (I find that a weekly cadence is best. Daily is too noisy; monthly is too slow).

Then, create a series of steps:

1.  Ingest all new content from Competitor 1's RSS feed.
    
2.  Ingest all new videos from their YouTube channel.
    
3.  Ingest new articles from their press page.
    
4.  Ingest new results from your Google News search.
    
5.  And here's the key: **combine the text from all of those sources into one single, clean block of text.**
    

Repeat this for your other competitors.

#### **Step 4: The "Analyst" prompt**

![](https://substackcdn.com/image/fetch/$s_!4SSq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30357ac7-2d0e-49e6-8444-40d9f7dab933_1280x896.jpeg)

This is the ❤️ of the entire system.

A lazy prompt like “Summarize this” will give you a lazy, useless summary. You have to tell the AI exactly how to think.

It took me probably a dozen iterations to land on a prompt structure that gives back real strategic insight instead of a book report.

Feed the combined text from Step 3 into your LLM and use this prompt. Don't shorten it.

```
You are a senior business strategist with the analytical eye of an art historian. I have provided you with all the content my competitor, [Competitor Name], has published in the last week.

Your task is to analyze this material and provide a concise intelligence report. The report must contain these exact sections:

Key themes & major subjects: Based on everything, what are the 1-2 core topics or messages they are hammering on? What is the primary subject of their work this week?

Strategic shifts & hidden clues: Look closer. Is there evidence of a change in direction? New product features, a new target audience, different messaging? What can we infer about their internal priorities based on what they chose to create?

The "Negative Space": Based on the stated themes, what are they conspicuously not talking about? What's missing from the painting that you would expect to see? This reveals their blind spots.

My opportunity: Based on this complete analysis, propose 2-3 specific strategic opportunities for my company. Frame them as content gaps to fill, positioning weaknesses to exploit, or a customer segment they are clearly ignoring.
```

#### **Step 5: Receive your digest**

The final step of the automation is to have the agent email you this report.

Every Monday morning, you wake up to a calm, clear-eyed analysis.

Thought that’s over? Nope. You, the founder, have to provide the judgment. Read the report and ask yourself two questions:

-   What is the one thing in this report that genuinely surprised me?
    
-   What is the single most important opportunity the AI found, and what is one small action I can take on it this week?
    

* * *

### **💡 A NEW CONCEPT FOR YOU**

This workflow is the practical application of a concept borrowed from the world of espionage: **“Signal Intelligence”**, but for startups.

*(Fun fact, did you know I have an MA degree in Security and Diplomacy? 🕵️‍♂️)*

In the intelligence community, "Signal Intelligence" (SIGINT) is the practice of deriving intelligence from electronic signals and communications.

![](https://substackcdn.com/image/fetch/$s_!3gnh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe1ab507b-058c-472d-af34-ab6df8964023_1280x896.jpeg)

Spies analyze the patterns of communication. The frequency, the medium, the target.

Your competitor's marketing is their signal.

Every blog post, every webinar, every social media update is a signal broadcast into the market. Most founders read the content. They consume the signal at face value.

This is a mistake. It’s like listening to one intercepted phone call and thinking you understand the entire war.

Signal Intelligence means you stop just reading the content and start analyzing the *pattern of its production*.

-   Why did they publish this case study now? (They're likely trying to close a deal in that specific industry).
    
-   Why did they launch a three-part video series on a basic topic? (They're likely trying to lower their customer acquisition cost by targeting a less sophisticated audience).
    
-   Why did they stop talking about a feature they launched six months ago? (It was probably a flop, or the adoption is low).
    

Your "AI Competitive Intel" agent is your own private SIGINT analyst, decoding the strategic intent behind the content your competitors produce.

You're basically reverse-engineering why they wrote it in the first place.

**Give a friend the blueprint for their own SIGINT analyst.**

* * *

### **✨ ONE MORE THING...**

You've built your listening engine. But seeing the field isn't the same as winning the game.

There's a concept from military strategy called the [OODA Loop](https://fs.blog/ooda-loop/): Observe, Orient, Decide, Act. The pilot who moves through that cycle fastest, wins. The system we just designed, especially when built with a powerful tool like Make.com, automates the first half of that loop for you. It handles the observing and orienting.

**But what about deciding and acting?**

When your system flags a major move - a new feature or a big announcement - your job is to find the flaw. You take their announcement and feed it into what I call a "Red Team" prompt:

```
You are a 'red team' strategist. Here is my competitor's latest launch announcement: [paste text]. 

What is the biggest potential weakness or strategic risk in this new direction? 

How could my company exploit it?
```

This is how you complete the loop.

You’ve already watched the masterpiece being painted, now you’re actively looking for the cracks in the canvas, ready to make your own move.

My question for you is simple. Name the one competitor you're quietly building a better alternative to. No long story needed, just the name. Go ahead, advertise a little.

To seeing the cracks in the canvas,

Chief 🤖 at ROBOTS ATE MY HOMEWORK

[Share ROBOTS ATE MY HOMEWORK](https://robotsatemyhomework.substack.com/?utm_source=substack&utm_medium=email&utm_content=share&action=share)
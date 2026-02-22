---
title: "Diagnose it before you prompt it: a system for unpredictable AI output"
subtitle: "How to engineer constraint systems that push LLMs past the obvious by diagnosing three failure modes: generic output, predictable structure, and flat tone."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/diagnose-it-before-you-prompt-it"
publishedAt: "2026-02-11"
tags:
  - "ai"
  - "education"
---

# Diagnose it before you prompt it: a system for unpredictable AI output

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today we’re building cages and watching what AI does when it can’t escape them.**

At film uni, Fridays meant three hours in a movie theatre watching nothing but silent films.

One broke my brain permanently: Buster Keaton in *Steamboat Bill, Jr,* and more specifically a scene where the entire facade of a two-story house falls forward and Keaton just stands there. The open attic window passes over him with millimeters to spare.

One miscalculation and he’s dead. Instead, we get one of the most iconic shots in cinema history.

![House falling on Buster Keaton standing in window](https://substackcdn.com/image/fetch/$s_!vi2C!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5a0320cc-a05c-4ede-b3f6-b40d84053dfd_722x533.jpeg)

Keaton survived because every variable was calculated: the window dimensions, his exact position, the hinge point, the wind that day. The constraints were so tight that only brilliance could survive inside them.

Today, we’re building diagnostic constraint systems for AI. These are engineered pressure levers that require LLMs to compute new paths instead of recycling statistical averages.

I’m joined by [Timo Mason🤠](https://open.substack.com/users/287555302-timo-mason?utm_source=mentions) from [Write Your Way To Wealth](https://open.substack.com/pub/timomason). He studies what makes personal brand content land on Substack and builds constraint systems to force better AI output.

[![](https://substackcdn.com/image/fetch/$s_!XKSe!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa31f00b9-24e5-4a31-98f4-4ac0aa7c6240_531x531.png)Write Your Way To WealthHelping personal brands grow & monetize on Substack with AI-powered content. Subscribe now and receive the Ultimate Social Writing Bundle for FREE!By Timo Mason🤠](https://timomason.substack.com?utm_source=substack&utm_campaign=publication_embed&utm_medium=web)

In today’s edition:

1.  Why most constraint prompting fails and how to diagnose what you actually need;
    
2.  Three constraint layers that escalate systematically: language traps, structural paradoxes, tonal pressure;
    
3.  How to validate whether constrained output is better or just weirder.
    

![](https://substackcdn.com/image/fetch/$s_!jL52!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53a09126-219e-4f3a-b0a6-a66161cb033e_1200x35.png)

## When constraint prompting fails

Without constraints, LLMs optimize for statistical likelihood. They give you the most common version of your idea.

Ask for “creative” and you get polished predictability.

The standard solution is to add constraint, like “write this without adjectives” or “make every sentence a question.”

These work sometimes but most people fail at constraint prompting in three specific ways:

-   **The gimmick trap:** Random constraints produce chaos. Slapping “write this in iambic pentameter” on your sales copy doesn’t force better thinking. It sometimes just makes things weirder.
    
-   **The wrong layer problem:** You’re using language constraints when you need structural ones. You’re banning adjectives when the real problem is predictable argument flow. Misdiagnosing the failure mode means the constraints can’t fix it.
    
-   **The validation gap:** Nobody checks if the constrained output is actually better. They see something different and assume that’s progress. But different ≠ novel.
    

**Diagnostic constraint stacking fixes this.** Identify the failure mode, then layer constraints that attack it systematically.

## The diagnostic framework

![](https://substackcdn.com/image/fetch/$s_!V9k1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c63d9b7-52a4-4522-9901-703234362978_1280x896.png)

Diagnose first. LLM output fails in three distinct ways, each requiring a different constraint layer:

#### **Problem 1: Generic output**

**Generic output** is the easiest to spot. The content could have come from anyone in your space. There's no unexpected detail, no voice, nothing that makes you think a specific person wrote this.

You fix this with **language traps**: constraints that force non-standard word choices, ban the clichés your industry runs on, or restrict sentence patterns until the model has to compute new routes.

#### **Problem 2: Predictable structure**

**Predictable structure** shows up when you're reading and you can guess what's coming in the next paragraph. The argument unfolds exactly how every other argument in this space unfolds: problem, three-part solution, what to avoid, tidy conclusion.

There's no structural surprise because LLMs have seen this structure thousands of times and it's statistically likely to work, so that's what they default to.

You fix this with **structural paradoxes**. Give the model contradictory rules it has to solve simultaneously and make it build urgency without using urgency words. The impossibility forces it to rebuild its logic from scratch.

#### **Problem 3: Flat tone**

**Flat tone** is harder to diagnose because the content is technically fine, but completely emotionally inert. It reads like documentation because there's nothing in the voice that suggests a human being made deliberate choices about how to say this. The LLM smoothed out all the edges, all the personality.

You fix this with **tonal pressure**. Basically, you ban the biggest clichés of whatever genre you're working in and force the model to honor the energy without falling back on the tropes. Or invert the expected emotional register entirely. Create friction between what the content is saying and how it's choosing to say it.

Most output fails in multiple ways simultaneously. Stack constraints across layers: one per failure mode, applied in sequence.

![](https://substackcdn.com/image/fetch/$s_!djrI!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F56235a61-9f0d-43fa-80ac-214d141a3e9a_1200x35.png)

# LAYER 1: Language traps

Language constraints force the LLM to find routes it would never take on its own. You restrict specific words, and the model can’t fall back on pre-trained habits.

**The Master Prompt:**

```
Rewrite the following content under these language constraints. Follow every constraint exactly. If one makes your default approach impossible, find a workaround that still obeys the rule.

CONTENT: [PASTE YOUR CONTENT HERE]

LANGUAGE CONSTRAINTS (choose 2-3):
- No adjectives longer than 6 letters
- Each paragraph must end with a word containing the letter "o"  
- No conjunctions (and/but/or/so) — force short, brutal sentences
- The word "very" and all intensifiers are banned
- No vowel repetition: no word can use the same vowel twice (e.g., no "create," no "idea")

Write a rewrite that uses these limits to create surprise, not just obedience. After the rewrite, explain in 2-3 sentences how each constraint changed your approach.
```

You can use this for any positioning statements that sound like every other competitor of yours. The language trap pushes for specificity. For example, when you can’t say “innovative solutions”, you have to describe what the product actually does.

#### [Timo Mason🤠](https://open.substack.com/users/287555302-timo-mason?utm_source=mentions)**’s “No-Authority” cage**

Many arguments borrow credibility.

They lean on experts, studies or familiar names before the logic has done any work. That shortcut convinces some readers, but it leaves the core argument fragile. Remove the authority and the idea collapses.

This cage cuts off that escape route and forces the argument to stand on its own.

**The prompt:**

```
You are entering the No-Authority Cage.

Rules:
1. Remove all appeals to authority.
2. Rewrite the argument using only logic, examples, and consequences.
3. No phrases that imply expertise, status, or reputation.

DRAFT: [PASTE HERE]
```

#### **Timo’s methodology:**

I used my *How Alex Hormozi Posts 250+ Times A Week* article to see if the argument is well explained without relying on the big name.

[![](https://substackcdn.com/image/fetch/$s_!XKSe!,w_56,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa31f00b9-24e5-4a31-98f4-4ac0aa7c6240_531x531.png)Write Your Way To WealthHow Alex Hormozi Posts 250+ Times A Week (And You Can Too)Author’s note: This is a cross-post from a collaborative article that was originally published in Wyndo ’s newsletter, The AI Maker…Read more2 months ago · 4 likes · Timo Mason🤠 and Wyndo](https://timomason.substack.com/p/how-alex-hormozi-posts-250-times-3db?utm_source=substack&utm_campaign=post_embed&utm_medium=web)

I treat the output as the base layer. If the argument survives here, it’s structurally sound. If it collapses, no amount of name-dropping would have saved it anyway.

Once the logic holds, I add credibility back in on purpose. Through a study, quote or a known name. At that point, they’re not carrying the idea but just reinforcing it.

The logic pulls in readers who actually think. The names come later, for the ones who just want something familiar to latch onto.

## LAYER 2: Structural paradoxes

Structural constraints attack logic. You give the LLM contradictory rules or conditions that shouldn’t be solvable.

**The Master Prompt:**

```
Rewrite the following content so it solves a real business problem while obeying constraints that contradict each other.

CONTENT: [PASTE YOUR CONTENT HERE]
BUSINESS PROBLEM TO SOLVE: [YOUR SPECIFIC PROBLEM]

STRUCTURAL CONSTRAINTS (choose 2-3):
- Must feel twice as urgent but use 50% fewer urgency words
- Must build trust without testimonials, credentials, or social proof
- Must close harder while sounding less salesy
- Each paragraph reads the same forward and backward (palindrome structure)
- Tell the story backward, starting from the result
- Every paragraph is exactly 3 sentences

PARADOXES the rewrite must obey:
[Select 1-2 from the structural constraints above]

Output the paradox-powered rewrite + answer: which contradiction forced the best new thinking?
```

I usually use this for conversion-focused email sequences. The paradox helps the copy earn urgency through stakes.

#### [Timo Mason🤠](https://open.substack.com/users/287555302-timo-mason?utm_source=mentions)’s approach: Force better headlines by trapping the subject line

Headlines are the choke point where good articles die.

Writers ask AI to generate catchy subject lines. The model responds by recycling curiosity patterns it has seen a million times.

They can work, but to mix it up and make your headline stand out, give AI constraints to make clarity and boldness unavoidable.

**The prompt:**

```
You are entering the Newsletter Headline Cage.

Goal:
Generate headlines that survive strict compression and pressure.

Rules:
1. No questions allowed.
2. No vowel repetition: No word can use the same vowel twice (e.g., no "create," no "idea").
3. Maximum 6 words.
4. Must include a concrete noun.
5. No conjunctions: Remove and/but/or/so—force short, brutal sentences.
6. No "how to," no curiosity bait, no vague intrigue.

Task:
Based on the article below, generate 15 headlines.
If a headline feels safe, discard it and replace it.

Content: [PASTE Content HERE]
```

#### **Timo’s methodology:**

I used this article as the input:

[![](https://substackcdn.com/image/fetch/$s_!XKSe!,w_56,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa31f00b9-24e5-4a31-98f4-4ac0aa7c6240_531x531.png)Write Your Way To WealthHow One Post Got Me 5,000 New Readers In A DayHowdy, Wealth Gang🤠…Read morea month ago · 19 likes · 4 comments · Timo Mason🤠](https://timomason.substack.com/p/how-one-post-got-me-5000-new-readers?utm_source=substack&utm_campaign=post_embed&utm_medium=web)

Here are some of the headlines I got:

-   *Guest Posts Brought 5K Readers Fast*
    
-   *One Collab Beats Months of Growth*
    
-   *Wyndo’s Audience Became My Subscribers*
    
-   *Strategic Collabs Trump Organic Posts Always*
    
-   *Guest Posts Convert Better Than Ads*
    
-   *Strategic Collabs Crush Organic Growth*
    

The bold statements work best: *“Guest Posts Convert Better Than Ads”* and *“Strategic Collabs Crush Organic Growth”*

## LAYER 3: Tonal pressure

**Tone constraints create friction between** ***what*** **the content says and** ***how*** **it says it.** You force the LLM to honor a genre’s energy while finding completely new delivery mechanisms.

**The Master Prompt:**

```
Take the following content and rewrite it in the style of [PICK A GENRE: noir, fantasy, legal document, breaking news, nursery rhyme, etc.].

CONTENT: [PASTE YOUR CONTENT HERE]

Before rewriting:
1. List the top 5 clichés/tropes of your chosen genre
2. These 5 tropes are now BANNED from the rewrite
3. The rewrite must still feel like the genre — same energy, same atmosphere — but every time your instinct reaches for a cliché, force a left turn

TONAL CONSTRAINTS (choose 1-2):
- Tone inversion: Flip every emotion (joy becomes dread, confidence becomes doubt)
- Anger filter: Rewrite with quiet rage simmering under every line
- Absurd sincerity: Treat ridiculous ideas with desperate seriousness
- Deadpan delivery on emotionally charged content

After the rewrite, explain which banned cliché was hardest to avoid and what replaced it.
```

I like to use this for MVP or little product launch emails that need personality but can’t sound like startup hype.

#### [Timo Mason🤠](https://open.substack.com/users/287555302-timo-mason?utm_source=mentions)’s **“Objection-First” chamber**

Most arguments sound convincing because no one pushed back.

Readers don’t argue with your essay out loud. They do it silently, paragraph by paragraph, until they are fed up and stop reading.

This cage flips the writing order. Instead of building confidence first, you force the argument to stand up under attack.

**The prompt:**

```
You are entering the Objection-First Chamber.

Rules:
1. Generate the strongest objection a smart, skeptical reader would raise.
2. Identify the exact sections where the draft fails to answer them.
3. Rewrite ONLY those sections to withstand the objection.
4. No defensive tone or reassurance.

Content: [PASTE HERE]
```

**Timo’s methodology:**

For this one, I used my article [How I create Substack articles 5X times faster](https://timomason.substack.com/p/how-i-create-substack-articles-5x). These were my results:

> ⭐The Problem:
> 
> You position manual execution as “tedious” and “hard” to make AI-writing look easier. But serious writers will read this and think: “The friction IS where quality comes from. You’re selling shortcuts to people who want to avoid the actual work.”
> 
> This is dangerous because your entire value prop relies on quality + speed. If readers smell that you’re just automating away the thinking, they’ll dismiss both you and your tool.
> 
> ⭐The rewrite:
> 
> Let me separate the friction that matters from the friction that doesn’t:
> 
> Friction That Creates Quality:
> 
> -   Forcing yourself to brain dump before outlining (this is where originality comes from)
>     
> -   Sitting with an awkward sentence until you figure out how YOU would say it
>     
> -   Fact-checking claims instead of trusting AI
>     
> -   Reading out loud to catch rhythm problems
>     
> 
> Friction That Just Wastes Time:
> 
> -   Remembering which step comes next
>     
> -   Asking yourself “Wait, did I already do Layer 2 editing on this section?”
>     
> -   Re-reading your own framework every time you write
>     
> -   Manually tracking where you are in the process
>     

Most writers conflate these two types.

They think: “If I make it easier, I’ll get lazy and the quality will drop.”

But that’s only true if you automate the thinking.

**If this broke your brain the way Buster Keaton broke mine, pass it on.**

![](https://substackcdn.com/image/fetch/$s_!adjw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda60af2a-c322-498d-b481-d7ee07805ce2_1200x35.png)

## The Constraint Stack Library - Your 25 rules to bend

![](https://substackcdn.com/image/fetch/$s_!CutP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F197cc3b7-4273-4a82-a1ca-d32ce430bed8_1232x864.png)

You’ve got the diagnostic and the three layers. Now here’s the full constraint library to pull from, but only after you’ve diagnosed the problem. Grabbing constraints at random is how you end up back in the gimmick trap.

**For generic output:**

-   No vowel repetition in any word
    
-   5-letter ceiling (every word ≤ 5 letters)
    
-   Deadpan verbs only (walk, sit, hold — no “explode,” “soar”)
    
-   Rhyme compulsion (every sentence ends in a rhyme)
    
-   No conjunctions (and/but/or/so)
    

**For predictable structure:**

-   Palindrome paragraphs (reads same forward/backward)
    
-   Reverse chronology (start from result)
    
-   3-sentence prison (every paragraph = exactly 3 sentences)
    
-   Question cascade (every sentence must be a question)
    
-   Paradox mandate (every claim includes its opposite)
    

**For flat tone:**

-   Tone inversion (flip every emotion)
    
-   Second person swap (change “you” to “I”)
    
-   Anger filter (quiet rage under every line)
    
-   Nostalgia virus (longing for something that never existed)
    
-   Absurd sincerity (treat ridiculous ideas with desperate seriousness)
    

**Universal constraints to use across all layers:**

-   Opposite audience (rewrite for your competitor’s customer)
    
-   Wrong medium (write it as grocery list, legal contract, weather report)
    
-   Historical transplant (relocate to 1925 or ancient Rome)
    
-   Child translator (explain to a 6-year-old, keep it sophisticated)
    

## Validation: Did it actually work?

**Constraints only count if they produce something better, not just different.** Run this diagnostic on any constrained output:

```
Compare two versions of the same content:

VERSION A (original, no constraints): [PASTE YOUR ORIGINAL CONTENT]
VERSION B (constrained rewrite): [PASTE YOUR CONSTRAINED OUTPUT]

For each version, analyze:
- Specificity: which uses more concrete, unexpected details?
- Predictability: which one could you guess the next sentence of?
- Aliveness: which feels like a human made a choice vs. an algorithm filled a slot?

Then answer in one paragraph: what did the constraints force you to discover that freewriting wouldn't have?
```

**Green flags:**

-   The constrained version uses details the original missed
    
-   You can’t predict the next sentence
    
-   Specific word choices feel deliberate, not algorithmic
    
-   The structure creates tension the original lacked
    

**Red flags:**

-   It’s weirder but not clearer
    
-   Constraints created problems the reader has to decode
    
-   The original communicated better, even if less creatively
    
-   You added complexity without adding insight
    

* * *

*Validation is the cage that keeps constraint systems honest, which is why I built an editor that hunts my patterns the same way these constraints hunt LLM defaults:*

[

#### I built an AI editor that doesn't let me off easy

](https://robotsatemyhomework.substack.com/p/i-built-an-ai-editor-that-doesnt)[Mia Kiraki 🎭](https://substack.com/profile/362428399-mia-kiraki)·Jan 28[Read full story](https://robotsatemyhomework.substack.com/p/i-built-an-ai-editor-that-doesnt)

* * *

If the constrained version fails the validation, the constraints were wrong for the problem. Go back to the diagnostic and pick a different layer.

![](https://substackcdn.com/image/fetch/$s_!pHQA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab957c53-d386-4971-a275-8bcdcc5e8985_1200x35.png)

## When the dust settles…

Keaton stood still while the house fell around him because he’d calculated every variable so precisely that stillness was the only rational response.

That’s what diagnostic constraint stacking does. It looks like chaos from the outside. From the inside, it’s architecture.

Build the cage and let AI fight its way to something it couldn’t have reached in the open field.

Thank you [Timo Mason🤠](https://open.substack.com/users/287555302-timo-mason?utm_source=mentions) for joining me today! And if you’re testing any of these prompts and they challenge you, share your results with us.

[Leave a comment](https://robotsatemyhomework.substack.com/p/diagnose-it-before-you-prompt-it/comments)

To engineering better cages,

Chief 🤖 at ROBOTS ATE MY HOMEWORK
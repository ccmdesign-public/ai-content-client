---
title: "I created a crossword to redesign how AI workflows work"
subtitle: "The \"Crossword Method\" for building AI workflows where every step constrains the next, so you stop copy-pasting guidelines into fourteen different chats."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/i-created-a-crossword-to-redesign"
publishedAt: "2026-02-25"
tags:
  - "ai"
  - "education"
---

# I created a crossword to redesign how AI workflows work

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today, we’re rebuilding AI workflows with graph paper and a crossword grid.**

I vibe-coded a crossword this week. You might look at me like I’d lost the plot. Reader, I had not lost the plot.

A lot of AI workflows break in the same place, for the same reason, and it has nothing to do with prompts. The structure itself is the issue and it’s surprisingly hard to explain without a good diagram.

A crossword grid turns out to be an excellent diagram!

Fill in 7-Down, and you've already decided what 14-Across can be. The letters are constrained by the architecture, no manual checking and oversight needed because the grid enforces it.

That's exactly what's missing from most AI workflows, and once you see it, you can't unsee it.

**In this edition:**

1.  The structural reason your AI outputs are inconsistent;
    
2.  How to build a workflow where every step constrains the next with the Crossword Method;
    
3.  A playable crossword for you that will reveal the four answers explaining the entire framework we discussed.
    

![](https://substackcdn.com/image/fetch/$s_!dewJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F85c3952a-022e-406d-bcdd-4254efa643fb_1200x35.png)

## Your AI workflow doesn’t know what it knows

You have a set of steps. Maybe five, maybe fifteen. Each one runs in its own chat, each chat gets a version of your voice guidelines, the brief, what the output should do. You paste it all in manually, every time.

Every step starts from zero.

Tweak your voice guidelines? That’s fourteen prompts you need to find and fix. You won’t find them all. You’ll miss three, and those three will produce outputs that sound like a different person wrote them.

That’s kind of a shopping list.. Step 1, step 2, step 3, each item alone. No step knows what any other step decided. No step constrains any other step. The whole thing has the memory of a goldfish and the structural integrity of a Post-it note.

Longer prompts didn’t fix it. Better models didn’t fix it. AI gets smarter but a lot of workflows are still a collection of disconnected chats.

* * *

*[Timo Mason🤠](https://open.substack.com/users/287555302-timo-mason?utm_source=mentions) and I wrote about [diagnosing prompt failures](https://robotsatemyhomework.substack.com/p/diagnose-it-before-you-prompt-it) a few weeks ago. The diagnosis was right. But the more I built, the more I realized the treatment was one layer too low. The problem wasn’t the individual prompts.*

* * *

The problem is the architecture. And a better prompt inside a broken architecture is still a broken architecture.

## 14-across already knows the answer

In a crossword, you can’t have a wrong answer in 14-Across because 7-Down already decided the third letter.

Every answer is basically constrained by the answers around it.

Put in a word that doesn’t fit the crossings, and the grid rejects it.

[Will Shortz](https://en.wikipedia.org/wiki/Will_Shortz) has been the crossword editor at The New York Times since 1993. He holds the only known degree in enigmatology (the study of puzzles, from Indiana University, which created the program specifically because he asked them to).

Shortz’s rule for what belongs in a crossword grid is simple: **every answer must earn its place by what it gives to the answers around it.** A word that doesn’t cross well doesn’t belong.

I think about this every time I review a workflow now.

Because too many AI workflows are built like a word search, not a crossword. All the words are there, but nothing connects. Nothing constrains. Nothing makes the other parts better by existing.

You could rearrange the entire thing and nothing would break, because nothing was holding it together in the first place.

![](https://substackcdn.com/image/fetch/$s_!p_bh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F71e19c01-0f1a-494e-b07c-bc1202ef99b0_1200x35.png)

## The “Crossword Method”

![](https://substackcdn.com/image/fetch/$s_!Sl80!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Face0cbcc-d175-40e8-80d2-448a183dadbd_1376x768.jpeg)

This method has three components: anchor clues, crossing answers, and the fill.

### 1\. Anchor clues: the things that never change

In a crossword, some answers are longer, more prominent, and set the shape of the entire grid. The puzzle designer builds everything else around them.

Your workflow has these too.

**They’re your fixed constraints (or docs): your voice, your audience, your quality standard, your business context.** The stuff that should be true across every single thing your AI touches.

Right now, most people paste these into every chat and then wonder why the outputs are inconsistent.

The Crossword Method says: **put your Anchors in ONE place. Write them once. Everything inherits from them.**

So where is that “one place”?

Let me show you, because the tools for this already exist:

#### **Claude Projects**

![](https://substackcdn.com/image/fetch/$s_!_X7R!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7434a1ec-cc9a-49f1-97b1-3b070dad520a_1376x768.jpeg)

When you create a Project in Claude, you can set a system prompt (the instructions that every conversation in that project follows).

What you should do is also add files (.md files) to each project, your complete set of non-negotiables: your voice guidelines, your audience description, your quality standards, your brand rules. Everything you’d otherwise copy-paste into every chat.

Write it once in the Project instructions, and every conversation inside that Project is automatically constrained by it.

You changed your voice guidelines? Update one document. The whole grid adjusts.

* * *

*If you’ve already run the [Neural Signature Protocol from this post](https://robotsatemyhomework.substack.com/p/reverse-engineer-yourself-before), you’ve built your first Anchor Clue without knowing it. Now put it somewhere everything can inherit it.*

* * *

#### **Claude Skills**

A Skill is a saved set of instructions that Claude loads when you need it. Think of it as a specialist you can summon.

You might have a Skill for writing newsletters, another for generating social posts, another for editing. Each one carries its own Anchors (the context and constraints that make it good at its specific job).

The Skill doesn’t start from zero every time. It already knows what it knows.

#### **Cowork sessions**

![](https://substackcdn.com/image/fetch/$s_!xPMa!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb4db0bba-3482-47d5-abe0-7ff2cddbce5d_1376x768.jpeg)

If you’re using Claude in Cowork mode, the session itself becomes a workspace where Claude has access to your files, your context, your desktop folders, your previous work AND much more.

It’s an ongoing collaboration where the AI accumulates understanding across tasks.

Right now, as I write this draft, Claude has my Voice DNA loaded, my audience profiles, my content strategy, the interview answers I gave twenty minutes ago. All of that is constraining this draft. I didn’t paste it in, the architecture made it available.

The point is the same in all three cases: your constraints live in one place, and everything downstream inherits them automatically. That’s an Anchor Clue.

**But how do you figure out what your Anchors are?**

* * *

**GET THE PROMPT:**

Paste this into any AI conversation. Answer its questions honestly. It will tell you exactly which foundational documents you need to build, and what goes in each one.

```
You are helping me identify the core reference documents I need to create for my AI workflows. These are .md files that stay constant across every project, every task, every prompt. They're the foundation everything else inherits from.
Ask me these questions one at a time. Wait for my answer before moving to the next.

- What do you make? Be specific. Not "content" but "weekly newsletter editions about AI workflows for founders who already use AI." List everything you produce regularly.
- Who is it for? Describe one real person, not a demographic. What do they already know? What frustrates them? What do they actually want from you?
- What should EVERY piece of output sound like? If someone read something you made with no name attached, what would make them say "this is definitely yours"? Give me 3 things.
- What should your output NEVER sound like? What's the specific thing that makes you cringe when AI produces it?
- What's your one non-negotiable quality standard? The thing that, if violated, means the work isn't done. (e.g., "every workflow must include the WHY behind each step," "every post must have one specific example from my real work")
- What are the different types of work you use AI for? (e.g., writing, research, client deliverables, social media, internal planning) List them all.
- Do you work with or reference any recurring business context? Things like your company's positioning, your product descriptions, your pricing, your origin story, a methodology you've developed?

After I've answered all seven, do this:

1. Recommend the specific .md files I should create. Standard ones might include a Voice Persona, Audience Profile, Brand Guidelines, Quality Standards, or Business Context document, but only recommend what MY answers actually call for. Don't pad the list.
2. For each recommended file, give me:

- The filename (simple, descriptive, e.g., voice-persona.md)
- A one-sentence description of what this file IS
- The specific sections it should contain, based on my answers
- 2-3 example lines showing the level of detail I should aim for, drawn directly from what I told you

3. Flag any gaps. If my answers suggest I need a reference document I didn't mention or think of, tell me what it is and why.

The goal is a set of foundational files I write once and load into every AI project, skill, or workflow. They should be specific enough to actually constrain output and universal enough to apply across everything I build.
```

### 2\. Crossing answers: where the grid gets smarter

In a crossword, when you fill in 7-Down, you’re answering a clue AND placing letters that constrain 14-Across, 15-Across, and 16-Across.

The answer to one clue becomes a constraint for every clue it touches.

* * *

*[Dr Sam Illingworth](https://open.substack.com/users/253722705-dr-sam-illingworth?utm_source=mentions) and I wrote about how [everything worth keeping happens between the prompts](https://robotsatemyhomework.substack.com/p/everything-worth-keeping-happens). Turns out that was more right than I knew. The space between your prompts is exactly where Crossings should live, and where most workflows have nothing at all.*

* * *

In your AI workflow, a Crossing Answer is an output from one step that doesn’t just FEED the next step. It CONSTRAINS it. There’s a difference, and the difference is everything.

**Feeding**: Step 1 produces a draft. Step 2 gets the draft and is told *“rewrite the intro.”* Step 2 knows nothing about WHY the draft was written that way, what decisions were made, what was intentionally left rough. It just gets a blob of text and a command.

**Crossing**: Step 1 produces a draft AND a constraint package. *“The intro is intentionally conversational because the audience is founders who are skeptical of AI hype. The cultural anchor is crossword puzzles. The first 400 words are pain and should NOT be shortened. The voice is warm but sharp, no hedging.”* Now Step 2 can’t accidentally make the intro formal.

That’s the whole idea behind what people call “agentic workflows,” by the way.

It just means you set up multiple AI steps that work together, each with its own job, passing results to the next, instead of you manually copying and pasting between chats.

An assembly line where each station is an AI with specific instructions.

A workflow built on crossings passes constraint packages and each step inherits the grid’s intelligence instead of starting fresh. The difference in output quality is enormous, and the reason is structural, not prompt-related.

* * *

**GET THE PROMPT:**

Pick two steps in your current workflow that happen back-to-back. Paste this prompt along with a description of what each step does.

```
I’m building a “Crossing” between two steps in my AI workflow. A Crossing means the output of Step 1 doesn’t just feed Step 2, it constrains it. I want you to help me build the explicit handoff.

Here are my two steps: Step 1: [describe what this step does and what it produces] Step 2: [describe what this step does and what it needs]

For this Crossing, tell me: 1. What decisions did Step 1 make that Step 2 needs to know about? (Not just the output, but the reasoning and choices behind it.) 2. What constraints should Step 1’s output place on Step 2? (What should Step 2 NOT be allowed to change, override, or ignore?) 3. Write the actual “constraint package” that Step 1 should pass to Step 2. This should be a paragraph I can include in Step 2’s prompt that makes the crossing explicit. Format it as instructions that begin with: “The previous step produced [output]. The following constraints are inherited and must not be violated...”

Make the constraint package specific, not generic. “Maintain the same tone” is too vague. “The tone is conversational and direct, using second-person address, short paragraphs, and no hedging qualifiers” is a real constraint.
```

### 3\. The fill: execution that writes itself

In a crossword, once you’ve got your long Anchor answers in place and the Crossings are solid, the short fill answers almost solve themselves. You’ve got three out of five letters already.

Same thing here. If your Anchors are set (voice, audience, standards living in your Project instructions or Skill) and your Crossings are tight (each step passing real constraints to the next), then your execution prompts get simple.

**Know someone who’s still copy-pasting voice guidelines into every chat? Send them the grid.**

![](https://substackcdn.com/image/fetch/$s_!y9WU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd80df2c7-1ca1-4f2e-91a2-0f8a83f1a866_1200x35.png)

## This post is a crossword

I want to show you this method working, and the easiest way to do that is to point at the thing you’re reading right now.

This newsletter edition was built on a grid.

My Voice DNA (the document that captures how I write, what I never do, the rhythms and patterns that make ROBOTS sound like ROBOTS) is one of the Anchor Clues.

I use it every time I write the Wednesday edition. Every sentence you’re reading has been constrained by it, without me pasting it into a single prompt.

Before I wrote the brief for this post, I answered interview questions about the topic:

-   what’s the pain
    
-   what’s the transformation
    
-   what I learned doing this experiment (what I went through, hiccups, realizations)
    
-   what’s my personal angle
    
-   what do I want you to DO after reading this.
    

Those answers became Crossing Answers and they constrained the outline. The outline constrained the draft. My answers about the crossword metaphor are why Will Shortz is in this piece.

The actual writing (the Fill) was the easiest part because by the time I got to it, the grid had already decided what this piece could and couldn’t be. The architecture did the thinking and the prompts just executed.

You’re reading a crossword.

![](https://substackcdn.com/image/fetch/$s_!kLDr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfeddd90-8621-4898-aadd-1d7627f1cd48_1200x35.png)

## An actual crossword to have fun with

I wasn’t kidding about the crossword.

![](https://substackcdn.com/image/fetch/$s_!tl9i!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffd806c58-cc29-48ad-b0c5-00adb417b4d7_1600x877.png)

I built a rather small one (and a very tricky one to put together). 23 words, 10 minutes to solve, probably less if you’re a crossword person.

Four of the answers are highlighted in the grid. Solve those, and you’ve got the whole framework in four words.

I’m not telling you what they are. That’s the game.

[Play the crossword](https://robotsatemyhomework.com/games/crosswords)

Consider it homework, or a reward for making it this far ❤️

Either way, go play,

Chief 🤖 at ROBOTS ATE MY HOMEWORK
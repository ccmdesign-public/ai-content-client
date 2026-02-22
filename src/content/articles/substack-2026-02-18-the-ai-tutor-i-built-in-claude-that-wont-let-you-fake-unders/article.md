---
title: "The AI tutor I built in Claude that won't let you fake understanding"
subtitle: "The four cognitive traps AI sets when you're learning and the Claude Projects system I built with spaced repetition and a teaching loop that won't accept 'I get it' without proof."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/the-ai-tutor-i-built-in-claude-that"
publishedAt: "2026-02-18"
tags:
  - "ai"
  - "education"
---

# The AI tutor I built in Claude that won't let you fake understanding

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today, we’re fixing the way you learn with AI, because right now, it’s broken.**

Think about the last thing you learned from ChatGPT or Claude. Something you asked about, read the explanation, thought “got it,” and moved on.

Now explain it back to me out loud, in your own words, like I’m sitting across from you.

Can you?

If you hesitated, you’re not alone. AI makes you feel like you understand something while you’re reading it. Clarity feels like comprehension, but **understanding an explanation isn’t the same as actually holding the knowledge.**

Da Vinci built the world’s most sophisticated personal learning system using paper and ink in the 1400s. We have AI in 2026 and most of us are learning worse than he did.

**Today I’ll show you:**

1.  The four cognitive traps (why AI makes you feel smarter while teaching you nothing);
    
2.  Da Vinci’s methodology and what a 500-year-old notebook can teach us about AI tutoring;
    
3.  How to build a real AI learning system - an actual multi-component architecture in a Claude Project, step by step.
    

![](https://substackcdn.com/image/fetch/$s_!3VCe!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3bd64ba9-7b26-45fb-8780-d08f0c7d6dcf_1200x35.png)

## Why AI makes you feel smarter while teaching you nothing

![](https://substackcdn.com/image/fetch/$s_!RIbE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F36e1d658-e4e9-4191-9fef-459b0d185e45_1152x928.jpeg)

When information is presented clearly and smoothly, your brain registers the clarity as comprehension.

It works like this: you read a well-written explanation and think, “I understand this.” But understanding an explanation while you’re reading it is not the same as being able to reproduce that knowledge tomorrow, or apply it somewhere the explanation didn’t cover.

This is why students can highlight an entire textbook, understand what they’re reading, feel prepared, and then freeze during the exam. The information feels familiar. Familiarity gets mistaken for knowledge constantly.

Now think about what AI does. You ask Claude or ChatGPT a question and you get back a structured, perfectly clear explanation. Your brain goes “Yes. I get it” and you move on.

But you just experienced it, that’s all.

Here are four specific mechanisms at work.

### **1\. The Fluency Illusion**

AI-generated explanations are optimized for clarity. The clearer the answer, the more satisfied you feel, the more you use the tool.

But clarity is the enemy of retention if it eliminates your need to struggle with the material. The psychologist Robert Bjork (who coined the term “desirable difficulties”) found that [conditions which make learning feel harder in the moment actually produce better long-term retention](https://psycnet.apa.org/record/2011-19926-008).

AI does the opposite. It makes learning feel effortless and effortless learning doesn’t stick.

### **2\. Zero Retrieval Practice**

Pulling information from memory strengthens the memory trace. This is retrieval practice, one of the most well-documented findings in cognitive science.

**Every time you struggle to recall something, you’re building the neural pathway that makes future recall easier.**

Research by [Henry Roediger and Jeffrey Karpicke](https://www.structural-learning.com/post/testing-effect-retrieval-practice) found that students who tested themselves recalled significantly more after one week (56%) than students who restudied the same material (42%)

AI conversations involve zero retrieval. You ask, the AI answers, and you consume. You never have to pull anything out of your own head because the AI does it for you.

### **3\. No Desirable Difficulty**

Bjork’s research also showed that spacing practice and interleaving topics improve long-term learning, even though they make the process feel slower and harder. The key word here is “desirable.” The difficulty has to be the kind that forces deeper processing.

**AI removes all difficulty by default.**

You don’t have to sequence your own learning or figure out what you don’t know. The AI resolves everything instantly. And every time it resolves something you should have wrestled with, it steals a learning opportunity.

[By The SIA Brat](https://open.substack.com/users/354654544-by-the-sia-brat?utm_source=mentions) said it best: “I tried to learn how to use Notion with ChatGPT. I gave up in less than an hour.”

That’s a failure of architecture, an AI answering whatever you ask, in whatever order you ask it, with no sense of what you actually need to learn first.

### **4\. The Forgetting Architecture**

Every AI conversation starts from zero. There is no continuity between sessions (unless you deliberately engineer it, and even so, AI doesn’t have access to ALL context / memory ALL the time. It picks and chooses).

You can have a breakthrough understanding of something on Tuesday, and by Friday, the AI has no memory of it. There’s no equivalent of Da Vinci’s notebooks, where questions persisted across years and unresolved problems kept surfacing until they were resolved.

Your learning history evaporates with every new chat. And without that continuity, you can’t build on what you know. You just keep starting over.

![](https://substackcdn.com/image/fetch/$s_!ZA6U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd34e3f14-cadb-46eb-8512-c7603659bcfa_1200x35.png)

## Da Vinci’s approach and what we’re building from it

Each of those four traps maps directly to something Da Vinci’s notebook method solved with paper and ink.

And each one maps to a component we’re going to build into a Claude project.

Da Vinci avoided the **fluency illusion** by force. He dissected thirty corpses in hospitals and morgues, produced over 200 pages of anatomical drawings, and tested every hypothesis through direct observation. He forced himself to DO with the information.

**➪** Our system counters this with the **Teaching Loop**: the AI explains, then asks you to explain it back. If you can't, it knows you didn't learn it.

Da Vinci’s method made **zero retrieval** impossible. He wrote questions in his notebooks before he had answers and he sat with gaps in his knowledge.

**➪** Our system counters this with **check-for-understanding questions** that force you to pull information from your own head before the AI gives you more.

Da Vinci never skipped foundations. Drawing before painting, geometry before engineering. Complexity only after mastering the basics.

➪ Our system counters this with the **Sequencing Protocol**: it won't let you advance until it's confident you've got the prerequisite knowledge.

**Those 7,200 pages solved the forgetting architecture.** A persistent, cross-referenced record of everything he’d explored. “Describe the tongue of a woodpecker” appeared multiple times because his structure surfaced unresolved questions automatically.

![Leonardo da Vinci's Woodpecker – Rilaly](https://substackcdn.com/image/fetch/$s_!MAyB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f902ac6-5860-4bb5-8ae4-e056d9986fce_640x466.jpeg)

**➪** Our system counters this with the **Knowledge Base**: a structured document the AI generates at the end of every session, which you paste into the project files to persist it. Concepts, dependencies, mastery levels, open questions, spaced repetition intervals. All persistent across conversations, because you make them persistent.

And one more component Da Vinci built intuitively: he knew himself as a learner. He knew he learned through visual observation and physical experience, through cross-domain analogy.

**➪** Our system formalizes this with the **Learning Profile**, a diagnostic that tells the AI how you learn best, stored as a persistent file in the project.

![](https://substackcdn.com/image/fetch/$s_!xiWp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2a813f2-8159-4df4-be90-e343dac01029_1200x35.png)

## Building Da Vinci's notebook as an AI system

Most "AI tutor" tutorials give you a system prompt. A well-written paragraph telling the AI to be a good teacher. And that's fine for a single conversation. But a single conversation is exactly the problem we identified above.

A prompt can't:

-   track what you know
    
-   space your reviews
    
-   maintain a dependency graph of concepts
    
-   remember that you struggled with gradient descent three sessions ago and should be retested on it today.
    

We're building a Claude Project with three structural pieces - system instructions, a Learning Profile file, and a Knowledge Base file - that together perform five functions:

1.  **System Instructions** - the pedagogical engine (how the AI teaches)
    
2.  **Learning Profile** - a persistent file the AI reads and uses during your sessions (who you are as a learner)
    
3.  **Knowledge Base** - a persistent file tracking concepts, mastery, dependencies, and review schedules (what you know)
    

And two functions embedded in the instructions:

1.  **Spaced Repetition Protocol** - logic embedded in the instructions that uses the Knowledge Base to track when each concept is due for review and surfaces those at the start of each session
    
2.  **Session Management -** a structured process for maintaining continuity across conversations (how nothing gets lost)
    

Here’s how to build it.

### **Step 1: Create the Claude Project**

Go to Claude → Projects (left sidebar) → New Project.

### **Step 2: Paste the system instructions**

This goes in the project Instructions field. It’s the brain of the system: the pedagogical engine that governs how the AI teaches, tests, sequences, and reviews.

⭐ [Grab the prompt here.](https://docs.google.com/document/d/1CQ8CuD5HoRU5NSniFHxuNYtu6MoGViAZUFs4CHtXfKg/edit?usp=sharing)

#### What each component in this prompt does and why it matters

Here’s why each piece exists and what cognitive problem it solves.

-   **Component 1 —> Learning profile**
    

**The Learning Profile** is the diagnostic that makes everything else adaptive. Without it, the AI is guessing how to teach you. With it, the AI knows whether you need visual metaphors, step-by-step breakdowns or historical context. It knows whether you want confusion resolved immediately or if you’re comfortable sitting with ambiguity for a while.

This is the equivalent of Da Vinci knowing he learned through observation and physical experience. The system can’t read your mind, but it can ask you directly how your mind works. And because it’s stored as a file in the project, it persists across every conversation.

-   **Component 2 —> Sequencing protocol**
    

**The Sequencing Protocol** prevents you from building a house on sand. It forces the AI to check that you understand the foundation before stacking another layer on top.

Without this, you get the classic AI learning trap: you ask about neural networks, get a beautiful explanation that references backpropagation and gradient descent, nod along, and don’t realize until three concepts later that you never actually understood what a gradient was. The Sequencing Protocol makes prerequisites explicit and testable. If you don’t have them, the AI teaches them first.

-   **Component 3 —> Teaching loop**
    

The loop is: explain → example → check understanding → evaluate → practice → review.

You’ll never passively consume information and move on.

Every concept requires you to demonstrate understanding. The AI won’t let you say “I get it” without proving you get it. And if you can’t explain it back, the AI knows exactly where the gap is because it just watched you try.

Some people have figured this out intuitively. [Deborah Froese](https://open.substack.com/users/24800459-deborah-froese?utm_source=mentions) described her approach in our community chat: “Whatever I’m using it for, I ask it questions, and invite it to ask me questions, to make sure I’m getting the kind of information I want and need.”

That instinct is exactly what the Teaching Loop formalizes. Deborah is already doing it by feel. The system we’re building makes it the default so you don’t have to remember to do it yourself.

* * *

*The Teaching Loop requires you to engage in a real dialogue with AI, not just consume its answers. If you want to understand what that dialogue looks like when it’s working, read this:*

[

#### The first rule of AI is “Yes, and…”

](https://robotsatemyhomework.substack.com/p/the-first-rule-of-ai-is-yes-and)[Mia Kiraki 🎭](https://substack.com/profile/362428399-mia-kiraki), [Raghav Mehra](https://substack.com/profile/325219597-raghav-mehra), and [Ashwin Francis](https://substack.com/profile/14719569-ashwin-francis)·September 24, 2025[Read full story](https://robotsatemyhomework.substack.com/p/the-first-rule-of-ai-is-yes-and)

* * *

And if you're curious what this kind of dialogue looks like in practice for language learning specifically, [Stephanie Obodda](https://open.substack.com/users/11537759-stephanie-obodda?utm_source=mentions) wrote a great walkthrough of [how she uses AI to fast-track her French](https://athomewithai.substack.com/p/fast-track-your-french-while-emptying) - worth a read.

-   **Component 4 —> Spaced repetition protocol**
    

**The Spaced Repetition Protocol** solves the problem that a single conversation never could: the forgetting curve.

[Hermann Ebbinghaus mapped this in 1885](https://whatfix.com/blog/ebbinghaus-forgetting-curve/) - you forget roughly 70% of what you learn within 24 hours unless you actively review it. But the timing of those reviews matters enormously. Review too soon and you waste effort. Review too late and you’ve already forgotten. The optimal schedule spaces reviews at increasing intervals: 3 days, then 7, then 14, then 30, then 90.

Our system tracks this in the Knowledge Base. Every mastered concept gets a next\_review date. The prompt instructions tell the AI to check what’s due and test you before teaching anything new.

**One thing to know:** Claude doesn’t have a calendar in its head. The system works because *you* maintain the Knowledge Base file between sessions, and the AI reads it and follows the protocol.

It’s the same algorithm behind Anki and SuperMemo, but conversational instead of flashcards, and you’re the one keeping the gears turning by updating the file after each session.

#### **Component 5 —> Knowledge base**

**The Knowledge base** is what makes the whole system more than a prompt. It’s a persistent, structured document where you track:

-   Every concept you’ve encountered
    
-   Its status (not started, developing, mastered, consolidated)
    
-   What it depends on (prerequisites)
    
-   When you last reviewed it
    
-   When your next review is due
    
-   Specific notes on gaps or misconceptions
    

This is Da Vinci’s 7,200 pages, except structured for a machine to read and act on. The AI knows what you know, what you almost know, what you’ve forgotten, and what you need next.

And because it’s a file in the project, it survives across conversations.

### **Step 3: Create the Knowledge Base files**

This is what turns a prompt into a system. You’re giving the AI persistent memory.

Create two .md files and add them to your project files:

**File 1:** `learning-profile.md`

```
# LEARNING PROFILE

## Topic
[To be filled during first session]

## Current Level
[To be filled during first session]

## Learning Style Preferences
[To be filled during first session]

## Relationship with Confusion
[To be filled during first session]

## Analogy Domain
[To be filled during first session]

## Date Created
[To be filled during first session]

## Notes
[Ongoing observations about what works and what doesn't]
```

**File 2:** `knowledge-base.md`

```
# KNOWLEDGE BASE

## Metadata
- Topic: [To be filled during first session]
- Learner: [Your name]
- Last Updated: [Date]

## Concepts

[Populate this section as you learn. Each concept follows this structure:]

### [Concept Name]
- status: [not_started | developing | mastered | consolidated]
- prerequisites: [list of concept names this depends on]
- date_introduced: [date]
- date_mastered: [date or null]
- last_reviewed: [date or null]
- next_review: [date or null]
- review_interval: [current interval in days]
- notes: [specific gaps, misconceptions, or observations]

## Open Questions
[Questions that emerged but haven't been resolved yet]

## Session Log
[Brief log of each session — date, what was covered, key outcomes]
```

### Step 4: Start your first session

Open a new conversation in your project. Say: **“I want to learn \[your topic\].”**

The AI should immediately start the diagnostic (Learning Profile questions). If it jumps straight to teaching, check that the system instructions are in the Project Instructions field and that the Learning Profile file is clearly empty.

After the diagnostic, the AI will produce your completed Learning Profile. Copy what it gives you and replace the contents of `learning-profile.md` in the knowledge base.

Then start learning. The AI will teach you, test you, and at the end of the session, give you an updated version of the Knowledge Base. Copy that into `knowledge-base.md`.

### Step 5: Every session after the first

Start a new conversation. The AI reads both files automatically. Tell it today’s date (Claude can be unreliable about knowing it), and it will check the Knowledge Base for concepts due for review, test you on those first, then pick up where you left off.

At the end, it produces updated files. You paste them in. That’s the maintenance cost, about 30 seconds per session. In return, you get an AI that actually knows what you know and what you’ve forgotten.

Over time, your Knowledge Base becomes a living document. Just like Da Vinci’s notebooks, except the AI is doing the cataloging, the scheduling, and the testing. You just have to show up and think.

* * *

*You've built a tutor that won't accept "I get it" without proof. But what if the AI's explanations still feel generic? **[Here's how to diagnose and fix three failure modes](https://www.perplexity.ai/search/link)** that make AI output predictable, even in a well-designed learning system.*

* * *

## Why a project, not a prompt

You can take just the system instructions from this piece and paste them into any AI chat. It would work fine for a single conversation.

But a single conversation is where AI learning goes to die.

**The whole point of this system is that the components talk to each other across time.**

The Learning Profile tells the Teaching Loop how to teach. The Teaching Loop feeds the Knowledge Base. The Knowledge Base feeds the Spaced Repetition Protocol. The Spaced Repetition Protocol decides what you do at the start of the next session.

Know anyone else who needs an AI tutor that won’t let you skip the actual learning?

![](https://substackcdn.com/image/fetch/$s_!6hb8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb6dfb427-a6c7-48e5-a067-5ef9e8ada69d_1200x35.png)

## **Adapt the system to whatever LLM you already use**

I built this in Claude Projects because they give you the cleanest implementation of what this system needs: project-level instructions plus a knowledge base with persistent files the AI reads every conversation. The architecture maps directly.

**For Gemini:** Create a Gem. Paste the system instructions. Gemini Gems don’t have a knowledge base, so you’ll need to paste your Learning Profile and Knowledge Base at the start of each conversation. The system still works, the maintenance cost is just higher. You’re manually doing what Claude Projects do automatically.

**For ChatGPT:** Create a Custom GPT. Paste the instructions and upload the two files to its knowledge base. GPTs can read uploaded files, so the persistent memory architecture works, though updating those files means going into the GPT editor each time, which adds friction. ChatGPT can also be inconsistent about reading them proactively, so you may need to say ‘read the uploaded files first’ at the start of each session.

All three work because the pedagogical engine is identical. The only difference is how much infrastructure each platform gives you for the persistent memory layer. Claude Projects handle it most cleanly. Gemini requires the most manual effort. ChatGPT falls in between.

Use what you have. The system is the system. The platform is the plumbing.

![](https://substackcdn.com/image/fetch/$s_!KAgN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7941e9e0-e4e5-4759-a0ad-d222260661cd_1200x103.png)

I asked the community: how are you using AI to learn? Some of these are going to make you rethink your own setup:

-   [A Recovering Daydreamer](https://open.substack.com/users/267217286-a-recovering-daydreamer?utm_source=mentions) uses AI for concept comparisons and tangible metaphors when studying. But she made an observation I think is important: *“I find it better for gaining deeper levels of clarity on specific problems related to languages I’m already intermediate-to-advanced level in, than for when I’m learning a brand new language. My prompts are more specific when I’m looking for a specific thing, compared to when I’m painting in broad brushstrokes.”*
    
-   [Cynthia](https://open.substack.com/users/1505966-cynthia?utm_source=mentions) is doing something clever: *“Recently I’ve been using AI to learn my own writing style. I’ll open a Claude Code session and as I make edits Claude will log the changes and the reason behind them and I’ll review it after.”* That’s basically building a feedback loop where AI reflects your patterns back to you.
    
-   [Verushka](https://open.substack.com/users/249394242-verushka?utm_source=mentions) used AI to learn how to build automations and then built a real one: a research automation for VOC content for her clients. The best kind of learning outcome, you learned the thing and then you shipped something with it.
    
-   And if you want to go deeper on the science of learning with AI, [Juan Gonzalez](https://open.substack.com/users/14352331-juan-gonzalez?utm_source=mentions) wrote a solid piece on [how to use AI properly for learning](https://juanfrank.substack.com/p/how-to-use-ai-properly-for-learning?r=8jmbv) that covers complementary ground.
    

These responses came from the ROBOTS community chat. That’s where the conversation keeps going between editions - workflows, questions, builds, the occasional existential crisis about whether AI is making us smarter or lazier.

[![User's avatar](https://substackcdn.com/image/fetch/$s_!1Tql!,w_64,h_64,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb399c9f8-2a30-48fe-a55e-c998a964e2c0_672x685.jpeg)Join Mia Kiraki 🎭’s subscriber chatAvailable in the Substack app and on webJoin chat](https://open.substack.com/pub/robotsatemyhomework/chat?utm_source=chat_embed)

**I’d love to know from you:** Have you ever caught yourself thinking you understood something from AI, only to realize later you couldn’t actually explain it? What was it?

[Leave a comment](https://robotsatemyhomework.substack.com/p/the-ai-tutor-i-built-in-claude-that/comments)

To building things that teach you something,

Chief 🤖 at ROBOTS ATE MY HOMEWORK
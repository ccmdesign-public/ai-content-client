---
title: "A journey on the other side of the tech bubble"
subtitle: "Four real stories from outside the tech bubble that changed how I build AI systems, and four systems you can steal this week."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/a-journey-on-the-other-side-of-the"
publishedAt: "2026-02-27"
tags:
  - "ai-general"
  - "education"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.564Z"
---

# A journey on the other side of the tech bubble

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today, we’re playing Alice and finding out the AI bubble might be the strangest Wonderland of all.**

Alice falls down a rabbit hole and lands in a world that operates on completely different logic. Nothing works the way she expects, but the people she meets aren’t confused at all. They have their own perfect internal coherence. Alice is the disoriented one.

I had my Alice moment last week when I shared this:

I spend most of my time in the AI bubble. My feed is model benchmarks, agent architectures, system prompts, the latest Claude update, what Andrej Karpathy thinks about reasoning. I read papers, I test tools. I argue about context windows with strangers online.

This is my world and I am comfortable in it.

![](https://substackcdn.com/image/fetch/$s_!c_I6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd61ba3f6-e286-46fd-b148-e9afee36e687_1180x600.jpeg)

But I also build AI systems for super unsexy use cases and businesses.

And sometimes, when I look up from my feed and look around at the work I do and the workflows I build, the two realities don’t match.

Last week I went looking for how people outside the tech bubble are using AI. I expected to find people who were behind.

Instead I found a world operating on logic my bubble can’t see.

I came back with four stories. Each one maps directly onto a system you can build this week:

1.  When admin is killing you and you build a system without meaning to
    
2.  When AI becomes your engineering partner on a factory floor problem
    
3.  When your own data has been talking and you haven’t been listening
    
4.  When feedback loops beat outsourcing the work entirely
    
5.  How to build the infrastructure version of all four, today
    

![](https://substackcdn.com/image/fetch/$s_!mbMj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc34d71f0-3945-41cf-89f3-7c4c79997f1e_1200x35.png)

## How to accidentally build an AI operations system

**[Risa runs Jackie’s Jams](https://time.com/7339685/person-of-the-year-2025-ai-architects/).** She makes jam. She also writes social media posts, replies to customers, handles invoicing, manages her online store, and somehow finds time to actually produce the product her business is named after.

She started using AI for social media copy and back-office messaging because she was drowning in admin and needed it to stop.

Now she saves at least an hour a day.

What she began with was “I cannot keep doing this manually or I will lose my mind” and this was the starting point that for most of us usually begins with “how do I use this new tool” instead.

Every successful AI system starts with someone saying some version of “this process is killing me,” never “I’d like to explore AI capabilities.”

What Risa built, whether she calls it this or not, is a content and operations system. And you can build one that is significantly more powerful using tools that exist right now.

### How to build this yourself

What I recommend right now is **Claude Cowork**.

Cowork is Claude running directly on your desktop with access to a folder on your computer. It reads your files, creates new ones, works across documents, and executes multi-step tasks. It is a persistent work environment. Every session in that folder starts with your context already loaded.

Cowork supports **plugins**. Anthropic already ships a set of official ones, and you can build your own too.

A plugin is essentially a bundle of skills (instruction sets that tell Claude how to handle certain tasks), connectors, slash commands, and sub-agents.

![](https://substackcdn.com/image/fetch/$s_!P9-3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fffc50fb7-ca6f-4da4-8844-498d61866063_1024x768.png)

Here is how it works:

#### **1\. The context layer.**

Once you’re in, click the Cowork tab, check “Work in a Folder”, and select a dedicated folder on your computer. This is your business brain.

Now populate it.

Create `.md` files (plain text files in Markdown format) that define who you are, how you work, and what your business does. Your tone. Your products. Your five most common customer questions and your best answers to each. Call that last one `FAQ-responses.md`.

This is not a setup step you skip. Every Cowork session opens with these files already loaded.

#### **2\. The skill layer.**

You have two options for extending what Cowork can do with that context.

**Option 1: Install an Anthropic plugin.** Anthropic ships a set of official plugins you can install directly, everything from marketing, content creation, research, task management.

**Option 2: Build your own.** You write the rules. This takes more time upfront but the result is a system tuned entirely to how you work.

Most people start with an Anthropic plugin to get moving, then replace or extend it with a custom one once they know exactly what they need.

#### **3\. The automation layer.**

Remember the `FAQ-responses.md` you built in Step 1? When a repeat customer question comes in, Cowork can search that file and draft a personalized reply in seconds. You’re giving Claude your actual best answers and letting it match and adapt.

While we’re on the topic of systems that fit the human, not the other way around: [Kim Doyal](https://open.substack.com/users/22680238-kim-doyal?utm_source=mentions) quit every project management tool on the market and built her own. Business brain and life brain, same app, different mode. It’s the ops hub version of everything this section is about, and she built it without being a developer.

[![](https://substackcdn.com/image/fetch/$s_!tgBU!,w_56,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0bc507b4-611f-40d8-ba3e-4b716695a057_500x500.png)Kim DoyalI Stopped Using Other People's Systems. Here's What I Built Instead \[VIDEO\]I’ve tried more project management tools than I can count…Read more19 hours ago · 19 likes · 6 comments · Kim Doyal](https://kimdoyal.substack.com/p/i-stopped-using-other-peoples-systems?utm_source=substack&utm_campaign=post_embed&utm_medium=web)

## Static electricity, ChatGPT, and a factory floor

**Hrag Kalebjian runs Henry’s House of Coffee** in San Francisco. He has been roasting coffee for years.

A year ago, he had a maddening problem: static buildup makes coffee beans cling to everything during bagging. That slows the process massively.

He used ChatGPT to design a system using software and sensors that spray water on the beans at the right moment to neutralize the static.

We are arguing about whether Claude Opus 4.6 or Gemini 3.1 writes better code while a man who roasts coffee beans for a living used AI as his engineering collaborator.

### How to build this yourself

Hrag treated AI as a thinking partner on a problem where HE held the domain expertise and the AI held the pattern-matching and creative recombination he didn’t have time for.

And you can use NotebookLM for this.

NotebookLM is a closed system. You upload your sources (your documents, your research) and everything it generates is grounded in that material only.

Here is the system I’d build, and it works for any complex operational problem (not just humidity on a factory floor).

#### 1\. Document everything you know about the problem

When you have a bottleneck, a logistics issue, a process that keeps breaking in the same place, start by documenting everything you know about the problem in one document. What happens. When it happens. What you have tried. What constraints exist.

#### 2\. Build your notebook

Upload that document into a NotebookLM notebook alongside any relevant specifications or prior research you have. Now you have an AI that understands YOUR problem deeply, grounded in your actual context.

#### 3\. Run the problem through it

Ask it to generate potential solutions, including unconventional ones from adjacent industries. Ask it to critique each solution.

You are running your problem through a system that has read everything you know about it and can see patterns across all of it simultaneously. That is what Hrag did instinctively in a single ChatGPT conversation. You can build the infrastructure to do it for every complex problem you encounter.

I’m not a devout user of NotebookLM but I use it to learn new AI tools, features, etc (speak of the AI bubble!). And it’s super helpful for reminding me of the rules. For example, I have a NotebookLM for Claude Skills. If I forget the naming conventions or I run into bottlenecks, I just ask that specific project:

![](https://substackcdn.com/image/fetch/$s_!WqPn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88680ade-8719-47c6-a5b5-9fafc286a929_1612x768.png)

#### 4\. Try the Audio Overview

NotebookLM’s **Audio Overview** feature can turn this analysis into a conversation format you can listen to while walking or commuting.

I know this sounds absurd. I thought so too until I tried it and realized that hearing two AI hosts debate solutions to MY specific problem produced different insights than reading the same analysis on screen.

#### 5\. Move to Claude for the build

Once NotebookLM has helped you refine the concept, bring that analysis into Claude for the implementation phase. The problem-solving and the building happen in different environments because they require different kinds of thinking.

NotebookLM for deep, grounded analysis. Claude for turning analysis into actionable plans.

[Joel Salinas](https://open.substack.com/users/198127390-joel-salinas?utm_source=mentions) put together the NotebookLM guide I wish existed when I first started using it. If the workflows in this section made you curious about the tool, this is where to go next:

[![](https://substackcdn.com/image/fetch/$s_!nt6C!,w_56,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc93a7f29-8673-4dd8-a435-838ade7e7337_560x560.png)Leadership in ChangeUse NotebookLM Better Than 99% of LeadersTL;DR: Google's NotebookLM is a source-grounded research system, not a chatbot. NotebookLM eliminates AI hallucinations by restricting all answers to user-uploaded documents and providing clickable citations for every claim. The tool handles up to 25 million words per notebook and supports four business workflows: knowledge hub creation, team training, …Read more25 days ago · 57 likes · 31 comments · Joel Salinas](https://leadershipinchange.com/p/use-notebooklm-better-than-most-leaders?utm_source=substack&utm_campaign=post_embed&utm_medium=web)

## Your spreadsheets are telling you something you can’t hear

[Over 7,000 farms in India participated in hands-on AI workshops](https://dailypioneer.com/news/intelligent-revolution-how-ai-is-transforming-india-s-farms) on actual farmland, where farmers learned to use predictive pest detection and drone image analysis on their own fields. Pesticide use dropped 9%. Net income jumped 18%. Chili yields rose 21%.

People with deep domain knowledge plus AI tools designed for decision support equals dramatically better outcomes. The farmers stayed farmers. Thing is, AI helped them see patterns in data they were already collecting but couldn’t analyze at scale.

You have data too. It is in your invoices, your analytics, your email, your calendar, your client history. You are probably not reading it any more effectively than those farmers were reading their soil data before the workshops.

### How to build this yourself

This is the use case where NotebookLM and Cowork can work together beautifully.

#### 1\. Export your data and upload it.

Export your last twelve months of client projects, revenue data, customer feedback, whatever data you have. Messy data is fine. Upload it and ask NotebookLM to identify patterns you’re not seeing: which projects were most profitable? Which client types convert best? Which services generate the most repeat work? Where does your time disappear?

I ran this experiment on my own projects data last month. I uploaded project summaries, timelines, and outcome notes from every engagement we’d done.

NotebookLM identified what I’d usually completely miss, like the fact that my fastest, most profitable projects were ALL ones where there was a certain frustration (not a vague “I want to use AI”), and where I spent the first session purely on diagnosis, no building. The projects where I jumped straight to building took 40% longer and had more revision rounds.

#### 2\. Build a decision brief in Cowork.

Open Cowork and your working folder. Create a new file (call it decision-brief.md) and populate it with the key patterns NotebookLM found.

Now every time you evaluate a new client, price a project, or decide where to invest your time, you have a grounded reference point.

**For the founder**: upload your user data and ask NotebookLM to segment by behavior. Which users engage most? Which churn fastest? Take those segments into Cowork and build targeted messaging for each one.

**For the consultant:** upload your past proposals and win/loss data. Ask NotebookLM what differentiates the ones you won from the ones you lost. This analysis can be a super useful foundation of every future proposal.

## The feedback loop most knowledge workers haven’t discovered yet

[61% of teachers now use AI in their work, up from 32% just a year ago.](https://www.edweek.org/technology/more-teachers-are-using-ai-in-their-classrooms-heres-why/2026/01)

**Lindsay Hamm at Purdue University** built [Charlie AI](https://www.purdue.edu/newsroom/purduetoday/2026/Q1/purdues-charlie-ai-transforms-learning-by-empowering-student-writers/), a rubric-aligned feedback system.

375 students used it over 700 times in a single semester.

Students draft their work on their own, then submit it to Charlie for feedback against the actual rubric their professor will use.

**Gregory Kestin at Harvard** built [PS2 Pal](https://www.nature.com/articles/s41598-025-97652-6) for his physics course. Students learned twice as much in less time compared to traditional lectures. The AI was instructed to only give away one step at a time, which forces students to think before it reveals anything. It teaches through constraint, not through answers.

* * *

*I’ve written before about [building your own AI tutor inside Claude](https://robotsatemyhomework.substack.com/p/the-ai-tutor-i-built-in-claude-that), and the same logic applies to how you edit, pitch, and strategize. The best AI tools hold you to your own standards.*

* * *

What does this boil down to? **Using AI to get better at thinking instead of avoiding it.**

### How to build this yourself

The student model (do the work yourself, then use AI to sharpen it) is the most underused pattern in professional work and the system version is significantly more powerful than pasting your draft into a chat window and asking for feedback.

#### Build an editorial skill in Claude.

A skill that contains YOUR specific quality criteria: what good looks like in your context, what your known weaknesses are, what your audience expects, what your previous best work looks like (include actual examples).

You won’t be asking a generic AI “is this good?” but running your work through a system that knows what good means for YOU. The suggestions reference your own standards, not some default notion of clear writing.

I built exactly this system for my own newsletter.

I call it the Understudy Editor.

[

#### I built an AI editor that doesn't let me off easy

](https://robotsatemyhomework.substack.com/p/i-built-an-ai-editor-that-doesnt)[Mia Kiraki 🎭](https://substack.com/profile/362428399-mia-kiraki)·Jan 28[Read full story](https://robotsatemyhomework.substack.com/p/i-built-an-ai-editor-that-doesnt)

It knows EVERYTHING.

It catches my bad habits and stays quiet about everything else. It knows my banned vocabulary. It knows my structural patterns. It knows when I’m rushing past the pain to get to the solution (which I always do).

Since I published that post, I also built the skill file for it, and that lives in Claude and is also added to one of my Cowork plugins. Every time I finish a draft, I run it through the Understudy.

The first time I used it, it flagged that I was spending two paragraphs on the reader’s problem and six paragraphs on my solution. The ratio was inverted. My readers needed to feel seen in their frustration before they’d trust the fix. I’d been rushing past the part that makes everything else land.

You can build the same thing for any kind of knowledge work:

-   A proposal reviewer that knows what your winning proposals have in common
    
-   A strategy checker that flags when you’re being vague
    
-   A code reviewer, a pitch deck evaluator, a client brief assessor.
    

The full version lives in your Cowork folder, knows your standards, and runs every time you finish a piece of work.

**The best AI stories come from outside the bubble. Send this to someone who needs to hear that.**

![](https://substackcdn.com/image/fetch/$s_!bq8q!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F20b27723-513c-4b60-a02c-59087dbdb460_1200x35.png)

## What Alice brought back

I live in the tech bubble. It’s home. I spend my mornings in it.

But the looking glass goes both ways, and sometimes you have to step through to remember that the people on the other side aren’t living in Wonderland. They might be the sane ones (but hey, they don’t have the Mad Hatter, so who’s losing what?)

Pick one section from this piece and try to build the infrastructure that keeps running after you close the tab.

And if you already built something like this, something scrappy, something that solved a real problem in your work or your life, I want to hear about it.

The best stories always come from outside the bubble ❤️

[Leave a comment](https://robotsatemyhomework.substack.com/p/a-journey-on-the-other-side-of-the/comments)

To stepping through looking glasses and finding the sane side,

Chief 🤖 at ROBOTS ATE MY HOMEWORK
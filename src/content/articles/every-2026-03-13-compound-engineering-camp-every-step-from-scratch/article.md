---
title: "Compound Engineering Camp: Every Step, From Scratch"
author: "Every"
platform: "every"
publicationName: "Source Code"
url: "https://every.to/source-code/compound-engineering-camp-every-step-from-scratch"
publishedAt: "2026-03-13"
tags:
  - "best-practices"
  - "career-growth"
  - "education"
  - "engineering"
categories:
  - "Business & Career"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-13T17:53:19.379Z"
---

# Compound Engineering Camp: Every Step, From Scratch

*TL;DR:* ***[Cora](https://cora.computer/)*** *general manager* ***[Kieran Klaassen](https://every.to/@kieran_1355)*** *has written prolifically about [compound engineering](https://every.to/source-code/compound-engineering-the-definitive-guide), his philosophy of software engineering for the AI age. In this piece, based on a camp he gave for paid subscribers a few weeks ago, we get an inside look at how exactly Kieran builds with the compound engineering plugin for the first time. He walks through, step by step, the process of going from a single prompt to a working app in under an hour. If you’ve been curious about how to build with compound engineering, this is the piece to read.—[Kate Lee](https://residenceinnbymarriottphiladelphiabalacynwyd.reservationstays.com/hotels/lMVXOwZj?utm_source=adwords_semro&utm_campaign=G%3ARS%3AUS%3APMAX%3ADSA-Chains%3AUS%3AEN&gad_source=1&gad_campaignid=21191562182&gbraid=0AAAAAo1QcNk9-_L5jMXja7zRKGllt1NBQ&gclid=CjwKCAjw687NBhB4EiwAQ645dmbNhmZp29zw6xIQJVuhLZo6e0f98Lfj638CAlZ8EQfzpy7hQxr2vhoC3-oQAvD_BwE&redirect_auth_retry=true&expand_params=false)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

This time last year, any time **[Kieran Klaassen](https://every.to/@kieran_1355)** opened a new session in Claude Code, he started from scratch. The lessons from his past code reviews, the style preferences he’d painstakingly explained, and the bugs he’d already flagged—Kieran remembered them all, but from the machine’s perspective, it was like it had never happened.

He’d been building **[Cora](https://cora.computer/)**, Every’s AI email assistant, and getting tired of copy-pasting the same prompts, correcting the same overengineered tests, and flagging the same bugs. “A human would remember,” Kieran said. “The AI wouldn’t.”

So he decided to create a system that *would* remember—one that plans before it codes, reviews outputs to enforce his taste, and stores every lesson so the AI applies it next time. The result is what we now know as [compound engineering](https://every.to/guides/compound-engineering), a signature approach to coding with AI where every bug, fix, and code review makes the system permanently smarter. The official [compound engineering plugin](https://github.com/EveryInc/compound-engineering-plugin) has more than 10,000 GitHub stars and is used by a growing community of builders, including engineers at Google and Amazon, who say it changed how they think about software.

At our first [Compound Engineering Camp](https://every.to/events/compound-engineering-camp), Kieran walked subscribers through the full loop live, building an app from a one-line prompt to a working product in under an hour. Below is the workflow as Kieran demo-ed it, plus what it means for how software gets built from here.

##### **Key takeaways**

1.  **Brainstorm before you plan.** The plugin has a brainstorm step that interviews you collaboratively and fills the gap between your vague idea and a detailed spec.
2.  **Planning should run without you.** Once the requirements of the project are clear, the plugin has a plan step that researches your codebase, checks for existing patterns, surfaces past learnings, and produces an implementation plan with zero additional input needed.
3.  **Use different models for different steps.** Kieran uses faster models—such as [Claude Haiku 4.5](https://every.to/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked) or [Gemini 2.5 Flash](https://every.to/vibe-check/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash)—for brainstorming, [Opus](https://every.to/vibe-check/opus-4-6) for planning, [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) for implementation, and sometimes Gemini for code review.
4.  **Compound when the context is fresh.** The plugin’s compounding step stores lessons as artifacts that future agents can discover, the core of compound engineering. Run it right after something breaks or works—before the AI compacts your conversation and you lose the specifics of what you were talking about.

#### **Write at the speed of thought**

That gap between your brain and your fingers kills momentum. Monologue lets you speak naturally and get perfect text 3x faster, and your tone, vocabulary, and style is kept intact. It auto-learns proper nouns, handles multilingual code-switching mid-sentence, and edits for accuracy. Free 1,000 words to start.

[Download Monologue for Mac](https://www.monologue.to/?utm_source=standalonead&source=post_button)[Want to sponsor Every? Click here](/cdn-cgi/l/email-protection#3241425d5c415d40415a5b424172574457404b1c465d).

## **The compound engineering loop**

A founder who does everything themselves hits a ceiling, Kieran says. The ones who scale are the ones who build systems—hiring, documenting, and training—so the work happens without them in the room.

Compound engineering applies that logic to coding with AI. “You remove yourself from as many places as you can,” Kieran said. “That forces you to extract things, automate things. And that’s where the compounding happens.”

The core idea is a four-step loop: Plan, work, review, compound. Each step has a specific input and a specific output. The output of one step becomes the input of the next.

**Plan** takes a problem and produces a detailed implementation plan—a markdown file (a simple text document with formatting) containing data models, file references, architectural decisions, and sources. The plan is specific enough that an AI agent or a human engineer could pick it up and execute it without asking questions.

**Work** takes that plan and produces a pull request (a proposed set of code changes ready for review). The code gets written, tests get generated, and documentation gets updated.

**Review** takes the pull request and produces findings—comments, suggestions, and flagged issues stored as to-do items in the file system. Different AI models can review the same code and surface different problems.

**Compound** captures whatever the system learned during planning, working, or reviewing—a new coding preference, a bug pattern to avoid, or an architectural decision worth preserving—and stores it in files that future sessions can reference. This is what makes the loop self-improving.

There’s also an optional upstream step—**brainstorming**—for when you have a vague idea rather than a clear requirement. “Brainstorming is when the idea isn’t super detailed yet,” Kieran said. “If you have a very clear requirement—like adding a new authentication provider—you skip brainstorming and go straight to planning. Planning is about the details and not making mistakes.”

## **From a blank prompt to a working app**

To show how these steps connect in practice, Kieran built an app live during the session. He wanted a system that would let users vote on new features to add to Cora—a clone of [FeatureBase](https://www.featurebase.app/), a platform where users submit and upvote product ideas. He started with a single prompt:

“Build a FeatureBase clone. We’ll use it as an internal feature request voting tool. Users can submit feature ideas, upvote other ideas, admins can update status. Simple Rails app with Tailwind.”

The brainstorm command turned this into a conversation. It asked questions until the requirements were clear: How should users log in? One vote per user, or multiple? How should ideas be sorted? When Kieran wanted a specific visual direction, he steered it: “I want a Swiss design vibe with square, black, white, Helvetica stuff.” Within minutes, he had a markdown document with a sketch of data models sketched, a list of pages, and an outline of a design direction.

The brainstorm step generated wireframes and page structure from the initial prompt. (All images courtesy of Kieran Klaassen.)

That document became the input for planning.

### **Planning is 70 percent of the job**

Kieran uses Claude Code with the Opus model for [the planning phase](https://every.to/source-code/stop-coding-and-start-planning). “Opus is great for creative work, filling in the blanks, and planning,” he said. He passed the brainstorm document to the plan command and let it run.

The planner does several things that a raw AI prompt wouldn’t. It researches the existing codebase so it doesn’t reinvent what’s already there. It hunts for edge cases—steps a user might take that the brainstorm didn’t anticipate. It checks for existing design patterns that should be followed. And it pulls from compound artifacts (stored lessons from previous work) to avoid pitfalls.

The output is a markdown file with an implementation plan including phases of development, file references for where to find key details, and a detailed analysis of how the changes will impact the system as a whole. It covers both the big-picture system impact and the granular details, and it logs the source of every decision so the agent—or a human engineer—can trace why a choice was made. There’s also a “deepen” option that launches up to 80 sub-agents (specialized AI workers that each research a different aspect of the problem) for deeper research when the stakes are higher.

The planning step generated a structured implementation document outlining requirements, architecture, and workflow.

This step is where Kieran spends most of his mental energy. He estimates the split at 70 percent thinking, 30 percent doing. “Most engineers think that writing code is the work,” he said. “It’s thinking about what to even do.”

### **Work and review in parallel**

With the plan locked, Kieran moved to implementation. He switched to faster models for this step, saving the more sophisticated ones for planning and review. The work command takes the plan and implements it: writing code, creating tests, and building the feature. If the plan has gaps, the work step flags them rather than guessing.

Within an hour of his original prompt, Kieran had a working app running locally: a clean, minimalist feature-voting tool that obeyed his design guidance.

Kieran created a working internal feature-voting tool live.

Rather than manually testing it, he ran the compound engineering plugin’s test-browser command, which uses an AI-powered browser agent to click through the interface, verify that features work, and report back.

Simultaneously, he ran the review command, using [Gemini](https://every.to/vibe-check/vibe-check-gemini-3-pro-a-reliable-workhorse-with-surprising-flair) to get a separate perspective on the code. “Sometimes I let different models review the code because I get different things back,” he said. “One model finds something, and then I give it to the other model and say, ‘Is this actually reproducible and correct?’” The review step produces findings stored as to-do files for triage. He recently ran 25 agents in parallel using tmux (a terminal tool that keeps sessions alive in the background), planning, working, and reviewing across different features simultaneously.

### **Compound: Building a memory**

The fourth step is what separates compound engineering from a sophisticated prompting habit. When you run `**/compound**`, it gathers context from the current session—whatever you learned, whatever went wrong, whatever preference you expressed—and stores it as a discoverable artifact with metadata.

These artifacts don’t bloat your context window, which is the amount of information an AI model can hold in memory during a conversation. They’re stored as files and retrieved by sub-agents only when relevant, which means you can accumulate hundreds of lessons without hitting the limits that come with stuffing everything into a single prompt.

“It’s very important to run this whenever the context is fresh,” Kieran said. “You don’t want to run it after compaction,” in other words, after the AI has started forgetting earlier parts of the conversation.

Currently, the compound step is triggered manually. Kieran is experimenting with automation, drawing inspiration from OpenAI’s [harness engineering approach](https://openai.com/index/harness-engineering/), which tracks recurring issues and promotes them to permanent rules after they appear multiple times. But he’s cautious about auto-generating artifacts. “It’s really easy to automatically run something and generate a lot of mess,” he said. “I still want to be in control.”

## **The plugin is for now, the philosophy is forever**

Kieran is open about the fact that the compound engineering plugin has an expiration date. The AI labs are already incorporating ideas compound engineering pioneered—plan mode, for instance, didn’t exist in most tools when he first built his version. “Ideally, we delete the whole thing someday because it’s all built in,” he said. “The point was always the philosophy, not the plugin.”

The engineer’s job is shifting from writing code to designing systems that write code and remember what they learned. Every runs five products with single-person engineering teams thanks to that shift. The people who start compounding now will be the ones who are hard to catch later.

Install the [compound engineering plugin](https://github.com/EveryInc/compound-engineering-plugin) and run `/brainstorm` on whatever you’re working on. Read the [compound engineering guide](https://every.to/guides/compound-engineering) for the full framework, and check out our [upcoming courses](https://every.to/events) if you want to go deeper.

* * *

***[Katie Parrott](https://every.to/@katie.parrott12)*** *is a staff writer and AI editorial lead at Every. You can read more of her work in* *[her newsletter](https://katieparrott.substack.com/). To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Discover Every’s [upcoming workshops and camps](https://every.to/events), and access recordings from past events.*

*For sponsorship opportunities, reach out to [\[email protected\]](/cdn-cgi/l/email-protection).*

[Subscribe](https://every.to/subscribe?source=post_button)

#### What did you think of this post?

[Amazing](/source-code/compound-engineering-camp-every-step-from-scratch/feedback?rating=amazing) [Good](/source-code/compound-engineering-camp-every-step-from-scratch/feedback?rating=good) [Meh](/source-code/compound-engineering-camp-every-step-from-scratch/feedback?rating=meh) [Bad](/source-code/compound-engineering-camp-every-step-from-scratch/feedback?rating=bad)
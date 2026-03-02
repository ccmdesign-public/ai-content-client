---
title: "What Can You Actually Do with Claude Code?"
subtitle: "A showcase of my Claude Code projects and tips to help you get into it."
author: "Why Try AI"
platform: "substack"
publicationName: "Why Try AI"
url: "https://www.whytryai.com/p/what-can-you-do-claude-code"
publishedAt: "2026-02-05"
tags:
  - "ai-general"
  - "productivity"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.670Z"
---

# What Can You Actually Do with Claude Code?

> **Bonus:** *Grab [the Claude Code Playbook](https://www.whytryai.com/i/186902375/sunday-bonus-89-9-simple-yet-powerful-claude-code-workflows-for-everyday-users) and a [swipe file with 100+ use cases](https://www.whytryai.com/i/184634567/sunday-bonus-86-100-use-cases-and-prompts-for-claude-code-swipe-file).*

Welcome to the newest installment of what is now *The* *Claude Code Trilogy*.[1](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-1-186715200)

If you followed along, you should already know how to:

1.  ✅ [Get Claude Code up and running on your computer](https://www.whytryai.com/p/claude-code-beginner-guide)
    
2.  ✅ [Set up and use an IDE, Skills, and MCPs with Claude Code](https://www.whytryai.com/p/claude-code-ide-skills-mcp)
    

But learning the “how” isn’t quite the same as figuring out the “What now?!”

To help with that, let me share several examples of how I actually use Claude Code and tips I picked up along the way.

Let’s get Clauding™!

## 5 ways I’ve already used Claude Code

I honestly didn’t expect to embrace Claude Code as quickly as I did.

For my first “getting started” post, I almost had to force myself to try it

But here we are, just a few weeks later, and I am Clauding™[2](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-2-186715200) it up on the daily.

For once, I truly feel like I have this competent sidekick that not only talks a good game but does a good…code? You know what I mean!

Here are five real uses I found for Claude Code in just the past two weeks or so.

### 1\. Built a genuinely useful Android app

My son plays as a goalie for a U12 ice hockey team here in Copenhagen.

Back in 2025, I made a simple Claude Artifact to track his games: shots on goal, goals, intercepts, save %, and so on.

![Hockey Goalie Tracker showing recent games list with save percentages, saves, and intercepts for teams including Gentofte B, KSF B, Hvidovre B, and Rungsted B](https://substackcdn.com/image/fetch/$s_!yJpF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb691a2f2-8615-445d-b63e-35a3dec8710a_444x479.png)

The Artifact worked well enough, but only inside a browser.

It also required a Claude account and didn’t let me share or export game data. My wife and I kept talking about its drawbacks, but after several only partially successful sessions with Claude, I kind of just gave up on trying to improve it.

Until last week.

Inspired by the promise of Claude Code, I dumped the Artifact code into the chat window and typed something like this:

> *Here’s a Claude Artifact I made to track my son’s goalie performance. Help me make an app version for my Android phone.*

I won’t bore you with the details, but the gist of it is that Claude Code:

1.  Parsed and analyzed the existing code and its functionality
    
2.  Built the first iteration of the smartphone version
    
3.  Walked me through every step of installing and running [Expo](https://expo.dev/)[3](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-3-186715200)
    
4.  Taught me how to build and load the app on my Android phone
    
5.  And made several rounds of improvements based on my feedback
    

![Expo Projects dashboard showing hockey-goalie-tracker project with Android build completed, plus recent activity log](https://substackcdn.com/image/fetch/$s_!A3Iz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9b6bcbe7-50e9-44a8-9908-1f70e7badbf1_1073x530.png)

I now have a clean, robust app that lets me track and save the games, view stats, and export game history. It just works:

![Hockey Goalie Tracker Android app screens showing season overview, live game tracking interface, game history with search and filter options, and settings with data export](https://substackcdn.com/image/fetch/$s_!8wp-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F90f8ce89-ebaa-4477-8e31-b54ab17354cb_3000x1500.jpeg)

Here’s the kicker: Remember how I said I [wasn’t an artist](https://www.whytryai.com/p/turn-your-doodles-into-art-with-ai)?

I’m even *less* of a coder. I couldn’t tell you what an “npm” is or how to brew a Java.

But Claude Code made this a non-issue.

The entire process was me rambling about what I wanted while Claude Opus nodded[4](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-4-186715200) and just…built the thing.

We’ve sure come a long way from the not-quite-there-yet days of 2023:[5](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-5-186715200)

[

#### Can I, a Noob, Create a Useful Site With The Help Of AI? Let's Find Out! (Part One.)

](https://www.whytryai.com/p/noob-creates-useful-site-with-ai-part-one)[Daniel Nest](https://substack.com/profile/103658370-daniel-nest)·June 1, 2023[Read full story](https://www.whytryai.com/p/noob-creates-useful-site-with-ai-part-one)

### 2\. Turned two of my custom GPTs into Claude Skills

I made [well over a dozen custom GPTs](https://www.whytryai.com/p/build-gpts) over the years.

Most of them are nothing more than custom instructions to avoid providing the same context to ChatGPT. They help, but there’s still lots of busywork involved.

So I started migrating them [into Claude Skills](https://www.whytryai.com/i/185003109/2-using-claude-code-with-claude-skills), and two are already in use.

The first one is the “Sunday Rundown Drafter” that finds and deduplicates AI-related news from several aggregators, looks for official sources, categorizes them into relevant [Sunday Rundown](https://www.whytryai.com/i/185003109/2-using-claude-code-with-claude-skills) sections, filters out the stuff I don’t cover, and gives me a handy summary:

![Claude Code terminal output showing Sunday Rundown Drafter skill processing AI news stories and categorizing them into sections](https://substackcdn.com/image/fetch/$s_!A0K1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb6deb46f-ea57-4b36-9add-535e0e65df02_591x529.png)

I can now dive straight into reviewing the stories and writing the post.

The other one is the “Sunday Bonus Directory Updater”[6](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-6-186715200)—and it’s just awesome.

As you may know, I recently gathered [all my Sunday Bonuses into a filterable directory](https://whytryai.netlify.app/sunday-bonus-directory.html). But I publish new entries all the time, so I now have to keep it updated.

Here’s how my old process looked:

1.  Paste the link to the new Sunday Bonus into my custom GPT
    
2.  Get a proposed summary text and tags for approval
    
3.  Approve the text (or ask for revisions)
    
4.  Get a formatted line to paste into the HTML page
    
5.  Download the latest deploy.zip from Netlify
    
6.  Extract the HTML page
    
7.  Update the page manually with the new line
    
8.  Add the page back to the zip file
    
9.  Upload the zip back into Netlify
    
10.  Wonder why I’m still doing so much shit manually in the age of AI
     

Here’s how it looks now:

1.  Paste the link to the new Sunday Bonus into Claude Code
    
2.  Get a proposed summary text and tags for approval
    
3.  Approve the text (or ask for revisions)
    
4.  THE END
    

Claude Code updates the local HTML file on its own *and* deploys to Netlify in seconds:

![Claude Code terminal showing Netlify deploy command completing successfully for Sunday Bonus Directory update](https://substackcdn.com/image/fetch/$s_!CSZ8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F162ec2b5-7d8d-4b68-a069-9d4ef24ff68c_548x291.png)

Lots of wasteful copy-paste/upload-download busywork, gone! Poof!

More of my GPTs are about to get the same treatment, and I honestly can’t wait.

### 3\. Organized my client work

When I’m not out there fighting crime, I freelance as a SEO content specialist/copy editor/copywriter/other-content-adjacent-stuff-person.

Not so long ago, I had a content workshop with one of my clients to kick off a project.

I then created a client subfolder for Claude Code and populated it with my workshop notes, anonymized email correspondence, prior posts I’d written for the client, and some of my unstructured thoughts.

Claude Code chewed through it all, asked a bunch of insightful questions, extracted key details, and created a content tracking sheet I could use to organize my work.

It really helped pull several separate strands together and make order out of semi-chaos, so I could get right down to the writing part.[7](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-7-186715200)

### 4\. Created a GitHub repository for backup

A wise man named [Peter](https://open.substack.com/users/121632682-peter?utm_source=mentions) once suggested I [set up a GitHub repo](https://www.whytryai.com/p/claude-code-beginner-guide/comment/200229924) for my Claude Code work. At that point, I was only vaguely aware of GitHub, unlike some of the other Hubs you might hear about these days.

So I asked Claude Code what a Git was and how one could Hub it.

After a solid learning bootcamp, I had my repo up and running:

![GitHub repository for Why Try AI Claude Code work](https://substackcdn.com/image/fetch/$s_!ByYx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F66b23718-6bb6-48fc-ab8e-b28d20923372_839x551.png)

Claude Code also…

-   Explained new GitHub-related concepts as they came up
    
-   Created a .gitignore to stop me from auto-uploading giant files to my repo
    
-   Helped troubleshoot syncing issues between VS Code and GitHub
    
-   …and probably lots of other stuff I’d already forgotten about
    

I now get to feel like a true power user with my nifty VS Code + GitHub combo:

![INFINITE POWER!](https://substackcdn.com/image/fetch/$s_!2XiO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ae4d68b-3cab-45a7-b9a2-a4296e2fb0fa_385x289.png)

### 5\. Improved the Claude Code setup itself

Lately, I’ve gotten into this nice meta loop where I regularly ask Claude Code to review our working folders, projects, and context files, discuss them with me, and recommend better ways to organize my work.

As a result of this exercise, Claude Code has already:

-   Recommended *and* set up a clean subfolder structure for different work areas
    
-   Proposed and—where necessary—installed relevant skills and MCPs
    
-   Recommended new tasks and initiatives related to my ongoing projects
    
-   Created separate context files for each subfolder and a way to keep those up to date
    

I get a kick out of knowing that I can not only chat with a helpful reasoning model but also say “go” and watch it *actually* *do things*.

Case in point: Setting up that time-saving Netlify loop for my Sunday Bonus Directory Updater was Claude’s suggestion…and Claude also helped make it happen:

![Claude Code be codin’.](https://substackcdn.com/image/fetch/$s_!0KzH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa5367e72-c626-4073-ae08-bf451aa886b0_654x481.png)

It’s not quite [recursive self-improvement](https://en.wikipedia.org/wiki/Recursive_self-improvement), but it’s quite a feat nonetheless.

## What I’ll be working on next

The cool thing is that once you see Claude Code in action and get a sense for how robust it actually is, you start getting all sorts of ideas for what to try.

In my case, I’ll be looking into:

-   **LLM chat insights**: I’ve extracted my chat history with every chatbot and it now sits inside the Claude Code folder, ready for analysis. I’m sure Claude Code can extract some patterns if I ask it to.
    
-   **Substack analysis:** Substack lets you one-click export the entire post history and email performance, and I’m curious to have Claude Code dig into this.
    
-   **Organize notes:** I love making and crossing out daily to-do lists, but my forward-looking plans and ideas live in fragmented Google Keep notes and abandoned Trello boards. Can Claude Code bring order to madness and perhaps even build me a personalized note-tracking-plan-making app-thing? Computer says maybe?
    

I also just connected Claude Code CLI to the [Claude in Chrome extension](https://code.claude.com/docs/en/chrome), so I can ask it to browse as a person would, scrolling, clicking buttons, filling in forms, and so on.

This means I now have a tag team of Claude Codes in the same VS Code window:

-   Regular Claude Code for all the heavy lifting and local file work
    
-   Claude Code CLI with Chrome access that can do the visual browsing
    

![VS Code window showing Claude Code in the sidebar alongside Claude Chrome CLI extension, demonstrating the dual-Claude workflow setup](https://substackcdn.com/image/fetch/$s_!xRW8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3c0504b9-82a3-4bcf-adce-a9add4837908_1919x1034.png)

This opens up all sorts of cool possibilities, like working on an app or site with “Standard Claude” and having “Chrome Claude” visit it to provide UX feedback.

The world’s my oyster. (Or, you know, some food I actually like, I guess.)

## 5 tips to get more out of Claude Code

Now that I have a routine going, let me play the guru and share several nuggets of Claude Code wisdom for you to consider.

### 1\. Context is king (but don’t overengineer it)

You’ll hear the term “[context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)” a lot these days.

Because prompt engineering is *so* last century (2024).

And it’s true: Better context is the difference between a generic answer and one truly tailored to your situation.

But here’s one of my favorite things about Claude Code: Your entire working folder *is* the context. You don’t have to curate and upload individual files to separate conversations. Every new Claude Code chat has access to this full context by default.

Sure, you can always hyper-optimize context curation[8](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-8-186715200), but for the vast majority of people, simply populating the working folder (and subfolders) with relevant notes and files will get you 80% there.

### 2\. Screenshots > explanations

One quick rule of thumb I discovered is that if you’re discussing anything visual—UI elements, app layout, and so on—sharing a screenshot is much better than trying to explain what you’re after.

But this often even works for text-heavy stuff like technical error messages.

Yesterday I spent almost 10 minutes trying to resolve an issue with VS Code refusing to sync with my GitHub repo. I kept reciting the error message I was seeing, and Claude Code tried its best to help.

It wasn’t until I stopped explaining things and grabbed a quick screenshot of the entire log that Claude Code immediately spotted and instantly fixed the culprit (which wasn’t reflected by the pop-up error message itself):

![VS Code error log showing GitHub sync issue that Claude Code identified and fixed after viewing the full screenshot](https://substackcdn.com/image/fetch/$s_!2cwA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F303ec9d4-6285-4153-ae3c-efe70fd9c7a0_695x439.png)

As they used to say in Ancient Greece: “A screenshot substitutes a thousand tokens.”

Use that to your advantage!

### 3\. Claude Pro is plenty if you plan ahead

Many Claude Code power users swear by their Claude Max plans, which cost $100 or $200 per month, depending on how much usage you want.

And I’m sure that if you do any serious routine work or code entire projects, Claude Max is a must.

But for the casual user, Claude Pro is enough.

Everything I described above—and lots of ad hoc stuff I didn’t cover—was done on a $20 Pro plan using the most expensive Claude Opus model. In fact, I sometimes had to throw additional tasks at Claude before the weekly reset, just to make sure I was optimizing the leftover quota.

Just have that [claude.ai/settings/usage](https://claude.ai/settings/usage) page open to keep track of your daily and weekly limits, and plan your projects accordingly:

![Claude AI usage dashboard showing weekly and daily limits remaining](https://substackcdn.com/image/fetch/$s_!XavY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe087f6d7-e6e4-43c9-9a5e-27ec6ab90830_1448x537.png)

You’ll get lots of work done without breaking the bank.

### 4\. Natural language works just fine

Forget all about formatting conventions and prompting precision for a second.

Just treat Claude Code like a competent coworker and speak accordingly.

I can’t tell you how refreshing it is to say what I want in simple terms and have Claude Code just “get it” and execute it.

You’ll get much further having a back-and-forth chat with Claude than trying to design the perfect project brief from the get-go.[9](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-9-186715200)

And this brings me to…

### 5\. Get a dictation app

Back in the day, I got into the habit of spoon-feeding LLMs my requests one at a time to avoid confusing them.

But Claude Opus handles long rambling tirades like a champ, so I find myself wanting to share more and more details during chats.

And as fast as I type, I speak *way* faster.

That’s why I finally made the switch to voice dictation for most of my input.

You have plenty of options:

-   [Speakly](https://www.speakly.ai/en) (the [newest Genspark addition](https://www.whytryai.com/i/185833678/15-ai-workspace-20-january-28-2026))
    
-   [Superwhisper](https://superwhisper.com/) (the one I’ve been using so far)
    
-   [Wispr Flow](https://wisprflow.ai/)
    

They offer free trials and some even have decent free plans, so take them for a spin!

If you’re a Windows user, built-in voice typing is also decent: Press **Win+H** to try it.

## Here’s how to get started with just one prompt

If you stuck with me this far, you should have a good feel for Claude Code’s potential and what it might be able to do for you.

But knowing the theory doesn’t help you dive in.

Here’s a two-step approach that might[10](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-10-186715200):

1.  **Epic brain dump**: Throw any documents, files, notes, or doodles you want to work with into the Claude Code parent folder. Don’t worry about structure so far:
    
    1.  Don’t categorize stuff by work, personal, hobby, etc.
        
    2.  Don’t create subfolders
        
    3.  Don’t rename files
        
2.  **Interview prompt**: Now open a new Claude Code chat and write this:
    
    > **Prompt:** *“Analyze the files in your working folder. Ask me clarifying questions about my workflows, tasks, and goals—one question at a time. Don’t move on until we’ve fully explored each topic. If my answers lead to more questions, ask those one by one as well. Keep going until you have a full understanding of my work areas and processes. Once done, propose a new subfolder structure, implement it, and create a CLAUDE.md file to capture the context.”*
    

That’s it!

With just these two steps, you should end up with an organized folder structure and a CLAUDE.md file that captures the way you think and work.

For my money, it’s the quickest way to experience the “wow” factor of having Claude Code do useful stuff for you.

From then on, you’re free to kick off new projects, discuss workflow improvements, and ease your way into working with Claude Code as your partner in crime.

Just don’t do any actual crimes, because I hear those don’t pay.

## 🫵 Over to you…

Loading...

The poll tells me *what*. A comment tells me *why*. Let me know what works or doesn’t.

[Leave a comment](https://www.whytryai.com/p/what-can-you-do-claude-code/comments)

* * *

## Thanks for reading!

If you enjoy my work, here’s how you can help:

-   ❤️**Like** this post if it resonates with you.
    
-   🔄**Share** it to help others discover this newsletter.
    
-   🗣️**Comment** below—I love hearing your opinions.
    

**Why Try AI** is a passion project, and I’m grateful to those who help keep it going. If you’d like to support me and **[unlock cool perks](https://www.whytryai.com/p/paid-subscriber-bonuses)**, consider a paid subscription:

[1](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-1-186715200)

Let’s hope I don’t pull a George Lucas and hit you with disappointing prequels after this.

[2](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-2-186715200)

Yes, I do intend to keep saying it until I make it a thing, thank you very much.

[3](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-3-186715200)

I had never even heard of Expo until that day.

[4](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-4-186715200)

I mean, I can only assume it did.

[5](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-5-186715200)

“Bing Chat”—what ancient history, folks.

[6](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-6-186715200)

Yes, my naming convention isn’t exactly inspired, but hey—at least it makes sense, “GPT-4o-mini-thinking-but-not-too-much-250723.”

[7](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-7-186715200)

Yes, I still prefer to write my own words. No, I’m not anti-AI-writing. I [shared more thoughts on this before](https://www.whytryai.com/p/the-skeptical-writers-guide-to-ai).

[8](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-8-186715200)

And whether you should use JSON or markdown or Morse code.

[9](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-9-186715200)

Again, I acknowledge that for repeatable, complex projects with precise deliverables, having a template for structure and terminology helps a lot, but for most “average Joe” tasks, they are overkill.

[10](https://www.whytryai.com/p/what-can-you-do-claude-code#footnote-anchor-10-186715200)

This naturally assumes you already have Claude Code up and running. If not, [start here](https://www.whytryai.com/p/claude-code-beginner-guide).
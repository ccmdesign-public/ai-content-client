---
title: "Claude Code Beyond Basics: The Power of Skills & MCP"
subtitle: "How to supercharge your Claude Code setup (+bonus IDE usage)."
author: "Why Try AI"
platform: "substack"
publicationName: "Why Try AI"
url: "https://www.whytryai.com/p/claude-code-ide-skills-mcp"
publishedAt: "2026-01-22"
tags:
  - "ai-general"
  - "productivity"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.679Z"
---

# Claude Code Beyond Basics: The Power of Skills & MCP

> **Update:** *Here’s a [swipe file with 100+ use cases and starter prompts](https://www.whytryai.com/i/184634567/sunday-bonus-86-100-use-cases-and-prompts-for-claude-code-swipe-file) for Claude Code.*

* * *

It seems y’all really enjoyed last week’s intro to Claude Code for non-coders:

[

#### Claude Code for the Rest of Us: Setup Guide

](https://www.whytryai.com/p/claude-code-beginner-guide)[Daniel Nest](https://substack.com/profile/103658370-daniel-nest)·Jan 15[Read full story](https://www.whytryai.com/p/claude-code-beginner-guide)

The post got dozens of shares and brought in almost 70 new subscribers.

In it, I asked what else you’d like to learn about Claude Code. Here’s what you told me:

![Poll screenshot asking what to cover next in Claude Code, showing votes for Claude Skills at 39%, MCPs at 26%, desktop and use cases at 17% each](https://substackcdn.com/image/fetch/$s_!O0ez!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29c30761-2c13-4414-8525-7b012ad5fd8b_574x290.png)

Claude Skills and the Model Context Protocol won.

So I figured I’d tackle them in the same post, since they’re often better together.

As a bonus, I’ll also show you how to run Claude Code inside an IDE like Cursor or VS Code, which offers a more visual way to work.

Don’t worry, none of this is particularly difficult.

You already have Claude Code installed, so the tricky(ish) part is behind you.

Click on the section you’re interested in to magically teleport straight to it:

1.  [Claude Code in your IDE](https://www.whytryai.com/i/185003109/1-using-claude-in-an-ide)
    
2.  [Claude Code with Skills](https://www.whytryai.com/i/185003109/2-using-claude-code-with-claude-skills)
    
3.  [Claude Code with Model Context Protocol (MCP)](https://www.whytryai.com/i/185003109/3-using-claude-code-with-mcp-servers)
    

Let’s roll!

## 1\. Using Claude in an IDE

> **Note:** *You’ll see me paste screenshots of Cursor and VS Code interchangeably, since I tested both of them and their interface is very similar. I’m fickle like that.*

Last time, we [got Claude Code running](https://www.whytryai.com/i/184322583/3-running-claude-code) in your computer terminal’s super sexy [command-line interface](https://en.wikipedia.org/wiki/Command-line_interface) (CLI):

![Ooooooh yeaaaah!](https://substackcdn.com/image/fetch/$s_!bw8V!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9bb3e160-9b99-45b7-bdb4-9034cd15824e_831x162.png)

CLI is minimalist, efficient, and great if you’re a programmer who’s used to it.

But if you’re like me, you’re dazzlingly handsome and smart you prefer being able to see more stuff at a glance, especially when working with multiple files and folders.

That’s exactly where an IDE like [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.com/) comes in.

### What the heck is an IDE?

IDE stands for [integrated development environment](https://github.com/resources/articles/what-is-an-ide), because it pulls separate tools a developer might need into a single unified workspace.

But don’t let the dry name put you off.

You don’t have to be a developer to appreciate the benefits.

Compared to your terminal, an IDE offers:

-   **Easier navigation**: A separate pane lets you view and switch between folders just like you would in a regular file explorer.
    
-   **Visual editing**: You can see and edit the content of individual files directly.
    
-   **In-context chat**: You can highlight sections of a document and chat to Claude Code about specifically those highlights, providing Claude with better context.
    
-   **Change tracking**: When Claude suggests edits, you’ll see exactly what’s about to change, helping you make more informed decisions.
    

Sound good?

### How to run Claude Code in Cursor or VS Code

There are *many* IDEs to pick from, but the following are the most widely used[1](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-1-185003109):

-   **[Visual Studio Code](https://code.visualstudio.com/download)**: an open-source IDE editor that you can upgrade via extensions and other add-ons.
    
-   **[Cursor](https://cursor.com/download)**: basically re-skinned VS Code with built-in AI features.
    

If you plan to use Claude Code as your primary AI agent and keep things simple, just stick to VS Code.

Whichever one you pick, download and run the relevant installer (see above) to get it running on your system.

Once you do, follow these steps (they’re near-identical in Cursor and VS Code).

#### 1\. Install the Claude Code extension

Click “**View**” in the top menu, then select “**Extensions**” in the dropdown (or just press “Ctrl+Shift+X" on Windows):

![Screenshot of the VS Code View menu with Extensions highlighted, showing where to install Claude Code skills and MCP extensions in the editor](https://substackcdn.com/image/fetch/$s_!7C8L!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5570aaa7-403d-4e54-82fc-aa96ad23519d_525x330.png)

Search for “Claude” until you see the [Claude Code for VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) extension:

![VS Code Extensions marketplace search for “claude,” showing the Claude Code extension by Anthropic with install button, used to add Claude Code skills and MCP support](https://substackcdn.com/image/fetch/$s_!fvqY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9210d169-3b98-4e1e-adc5-7d537c7657ce_307x193.png)

Hit “**Install**” and select “**Trust Publisher & Install**” if prompted:

![VS Code security prompt asking whether to trust the publisher Anthropic when installing the Claude Code extension, with options to trust and install or cancel](https://substackcdn.com/image/fetch/$s_!RWQI!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6e999b12-4717-4ffc-94a4-804208515329_515x323.png)

#### 2\. Open Claude Code

To open Claude Code inside Cursor, right-click inside an open document and select “Claude Code: Open” from the menu:

![Annotated VS Code editor showing right-click menu with “Claude Code: Open” selected, demonstrating how to launch Claude Code with skills and MCPs from a project file](https://substackcdn.com/image/fetch/$s_!k90i!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8f06da13-4ce2-4ea4-b06a-d405e7941a53_1160x382.png)

In VS Code, there’s a handy Claude logo to click in the top-right corner instead:

![Hard to miss it…](https://substackcdn.com/image/fetch/$s_!Jj62!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29e88912-9786-4109-9b79-ceca9b84e595_418x99.png)

If it’s the first time you do this, you’ll need to log in with your paid Claude subscription or console account:[2](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-2-185003109)

![Claude Code login screen showing subscription and API login options, including Claude.ai subscription, Anthropic Console, and third-party providers for MCP access](https://substackcdn.com/image/fetch/$s_!UNyM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09ee0c42-4ef8-4f2b-ab83-21a6b1b9cb5e_472x519.png)

You’re set!

#### 3\. Using Claude Code inside the IDE

I prefer to stick to the standard three-column hierarchy:

1.  Explorer for file and folder navigation
    
2.  Individual file content for hands-on edits
    
3.  Claude Code chat that lets me ask Claude about stuff
    

![Annotated VS Code interface highlighting file explorer, open file content, and Claude Code chat panel, showing how Claude Code reads files and responds using skills and MCPs](https://substackcdn.com/image/fetch/$s_!-rYn!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb5091291-33aa-4fe3-a21f-afa48280ae60_1170x541.png)

This way, I have an overview of the working folder, the file I’m working on, *and* I can ask Claude Code to discuss or do stuff without having to switch windows at any point.

To show the power of an IDE, see how I can highlight a single word, and Claude knows exactly what I’m talking about while still understanding the broader context?

![Yes, that was a jarring switch to VS Code and to light mode. Thanks for noticing!](https://substackcdn.com/image/fetch/$s_!QtTA!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F96a15dac-756a-45fa-a97e-d9cd1d6798a8_1509x611.png)

Pretty neat, huh?

## 2\. Using Claude Code with Claude Skills

Now let’s talk about Claude Skills, what they do, and how to use them.

### What are Claude Skills?

So, you know how you can create [custom GPTs](https://www.whytryai.com/p/build-gpts) in ChatGPT or [Gems](https://gemini.google/overview/gems/) in Gemini?

[Claude Skills](https://code.claude.com/docs/en/skills) are like that, except it’s *Claude* who runs them, not *you*.

Sorry, pal!

Skills are basically custom instructions that tell Claude how to do a specific task and—optionally—provide examples, additional context, or even advanced scripts to run.

They’re specialized recipes Claude can call upon when needed.

Tell Claude to create a slide deck for your brand, and Claude will automatically invoke your custom “Brand Deck” skill that describes your brand’s tone of voice, color palette, and preferred presentation style.

Skills are a great way to standardize repeatable tasks and skip having to explain your requirements to Claude from scratch.

### The anatomy of Claude Skills

At their core, skills are nothing more than markdown files with instructions that live in their own folder. Drop a skill subfolder into the parent “skills” folder, and you’re all set:

![Subfolder for Anthropic’s “PDF” skill](https://substackcdn.com/image/fetch/$s_!iDaA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feeaf2b56-0b08-4eba-843d-ac50cfd733cd_999x229.png)

The "**SKILL.md**” markdown file is the only must-have for a skill to run. It contains all of the instructions in a structured format:

![Snippet of the SKILL.md file for Anthropic’s “PDF” skill](https://substackcdn.com/image/fetch/$s_!n1kn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb4c75190-896e-44f5-b965-7c96845d0e1f_832x586.png)

The skill subfolder *may* also contain examples of acceptable output, specific templates, scripts for Claude to execute, etc. But those are all optional.

![Source: Claude documentation](https://substackcdn.com/image/fetch/$s_!4wwU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd57ffc55-a068-4ba7-9d7e-8f75928f53bf_727x206.png)

With that, let me show you how to set up your very first skill.

### The stupid simple way to set up Skills in Claude Code

Now, you *could* just read the documentation and manually create your skill folders.

But we’re about to get extra lazy up in here.

That’s right: We’ll get Claude Code itself to do *everything* for us.[3](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-3-185003109)

As if that wasn’t lazy enough, the first skill we’ll install is called “[Skill Creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator),” which teaches Claude Code how to make new skills.

So meta!

Once the Skill Creator is installed, making additional skills will be as easy as asking Claude Code to do it for you.

Open Claude Code within your working folder in your IDE or terminal, and write this:

> *Please set up a proper Claude folder structure for using Claude Skills, then install the Skill Creator skill: https://github.com/anthropics/skills/tree/main/skills/skill-creator*

That’s it.

Yes, really.

I didn’t have any skill folders in place, and that’s all I said to Claude:

![Claude Code chat prompt instructing setup of a proper skills folder structure and installation of the Skill Creator skill via GitHub for MCP workflows](https://substackcdn.com/image/fetch/$s_!_7os!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F89425129-4746-4605-83cb-41875ab42d8d_688x107.png)

Claude Code made a plan…

![Checklist titled “Update Todos” showing steps to download and install the Skill Creator skill, with the install step checked and verification still pending](https://substackcdn.com/image/fetch/$s_!bkHx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F05e001ae-c670-46fc-bae2-07c5e6b8d8dd_299x117.png)

…and kept going until the folder structure and the Skill Creator skill were set up:

![Claude Code chat output confirming Skill Creator installation, showing the .claude/skills directory structure and explaining how the Skill Creator enables building new Claude Code skills and MCP workflows](https://substackcdn.com/image/fetch/$s_!UJcD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ac88fc3-3e1e-4f1f-9c95-159e16117eaf_849x474.png)

Now it’s time to test our skilled Skill Creator’s skill to make new skills. Skills!

### How to use your new Claude Skills

Once the skill is installed, it will always load and be ready to use whenever you run Claude Code.

There are two main ways to use the skill:

1.  Invoke it manually using a slash command
    
2.  Help Claude Code auto-trigger by providing relevant context
    

Let’s look at each of them:

#### Method #1: Slash commands (manual)

If you know which skill you’re after, you can force Claude Code to run it by using “/” followed by the name of the skill:

![Claude Code chat interface showing slash commands with “/skill-creator” suggested, demonstrating how to invoke the Skill Creator skill within Claude Code workflows](https://substackcdn.com/image/fetch/$s_!Oec3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0aa177cd-a698-4063-bbb0-8ec7260f2167_685x159.png)

Claude Code will present you with a buffet of options available for that skill:

![Claude Code chat showing the /skill-creator command invoked, with options to create, edit, learn about, or package a skill, illustrating interactive skill creation workflows](https://substackcdn.com/image/fetch/$s_!ihz0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F50a462d5-2fe8-4dfd-ac96-d960639fc267_680x281.png)

From here, simply answer the questions to move forward.

#### Method #2: Context (automatic)

But in most cases, you shouldn’t have to manually trigger a skill. Claude Code will know when to invoke it based on context.

For instance, I told Claude Code the following:

> *I want to create a new skill that automatically turns any uploaded image into a three-haiku mini poem.*

Claude Code instantly knew to run the “Skill Creator” skill to help me:

![Claude Code chat showing a user request to create a new skill that turns uploaded images into three-line haiku poems, with the Skill Creator tool being launched](https://substackcdn.com/image/fetch/$s_!CmcW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F720458df-1130-4658-9c96-d937b73b7c9b_645x275.png)

Claude made a plan and asked me clarifying questions along the way:

![Skill Creator configuration screen asking how generated haikus should relate to an uploaded image, with “follow a narrative arc” selected as the theme option](https://substackcdn.com/image/fetch/$s_!ZErt!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11a18a0e-3928-4528-99f2-8ba5ad521057_1121x306.png)

…and kept going until the skill was ready:

![Claude Code chat confirmation showing the completed image-to-haiku skill, summarizing features like a three-haiku narrative arc, 5-7-5 structure, and image-focused output](https://substackcdn.com/image/fetch/$s_!5hkz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fded29ed1-5c4d-4463-adec-132b8c344d85_863x271.png)

Now let’s see if we can trigger the new haiku skill using an image and context cues.

We’ll go with everyone’s favorite “Butt Nugget” that is *definitely not a penis*:

![Don’t even ask.](https://substackcdn.com/image/fetch/$s_!wiHo!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0c19a2e7-1404-4d6f-938a-8f61235baa11_433x658.png)

I dragged him into Claude Code, typed “haiku,” and Claude auto-invoked the new skill:

![Claude Code interface showing the image-to-haiku skill running on an uploaded cartoon nugget image, with skill status and base directory displayed for skills and MCP workflows](https://substackcdn.com/image/fetch/$s_!uRv3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0dbeb3b3-129f-4cb0-b909-d87044a5c73a_885x311.png)

Here’s one of the takes:

![Screenshot showing generated output from an image-to-haiku Claude Code skill, with three 5-7-5 haikus describing a cartoon nugget image, demonstrating custom skills and MCP-powered creative workflows](https://substackcdn.com/image/fetch/$s_!6x9w!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ff0f074-243a-41c2-a82a-ec8c373ec3e3_233x274.png)

“Nugget feels no shame.”

Truer words have never been spoken.

If we can all agree on one thing, it’s that Butt Nugget [don’t give a shit](https://www.youtube.com/watch?v=4r7wHMg5Yjg).

### What Claude Skills will you make?

Now it’s your turn.

Get Claude Code to set up your “skills” folder, install the “Skill Creator” skill, and create whatever skills you need.

Here are dozens of ready-made skills to get you started:

-   [Anthropic’s official skills repository](https://github.com/anthropics/skills/tree/main/skills)
    
-   [Curated Claude Skills library](https://mcpservers.org/claude-skills)
    

I’ll be using Claude Code to create skills for each of my go-to custom GPTs.

How about you?

## 3\. Using Claude Code with MCP servers

Skills tell Claude Code *how* to do a certain task.

MCP gives Claude *the means* to do it.

Here’s how:

### What is MCP?

MCP stands for [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro).

It’s an open standard that lets large language models communicate with third-party data sources and tools to “borrow” their capabilities.

Makers of digital apps or tools can create an [MCP server](https://modelcontextprotocol.io/docs/learn/server-concepts) to expose their app’s functionality for Claude Code to use.

For instance, by connecting Claude Code to Slack’s MCP server, you may grant Claude the ability to actually look through Slack messages and even post on your behalf.

So…how do you do it?

### How to connect Claude Code to MCP servers

> **Note:** *I won’t be covering how to spin up your own MCP servers, as that’s both outside the scope of the article and way above my paygrade. Here, I’ll focus on connecting to existing remote MCP servers to grant Claude new abilities.*

#### a. The official way

Now, if you want the “proper” way to link Claude Code to a third-party server, here’s the syntax [Anthropic recommends](https://code.claude.com/docs/en/mcp#popular-mcp-servers) for your terminal:

```
claude mcp add <name> --transport http <url>
```

Let’s break this down:

-   **claude mcp add:** this is the command that tells Claude to add a new MCP server
    
-   **<name>**: this assigns a name of your choice to the connection[4](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-4-185003109)
    
-   **\--transport http**: this tells Claude it’s a remote server[5](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-5-185003109)
    
-   **<url>**: this is the actual URL of the MCP server you’re linking to
    

So if I wanted to connect to [Canva’s official MCP server](https://www.pulsemcp.com/servers/canva), I’d type:

```
claude mcp add canva --transport http https://mcp.canva.com/mcp
```

That’s it.

### b. The lazy way

Did I just hear you say, “Let Claude Code do it”?

See? That’s why they pay you the big bucks.

But yes: Much like skills, we can simply ask Claude to set up an MCP server for us.

Let’s go ahead and try it!

> **Prompt:** *Connect to the Hugging Face MCP server: https://huggingface.co/mcp?login*

Claude Code takes care of the entire process in less than a minute:

![Claude Code chat showing Hugging Face MCP server added and connected via HTTP, with bash commands and status confirming successful MCP integration](https://substackcdn.com/image/fetch/$s_!sgj1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9c1285e6-de1a-4a16-9772-4d5d15606c9e_694x648.png)

We’re now set up to search the Hugging Face database and pull model details.

### How to use MCP servers in Claude Code

> **Note:** *Most MCP servers assume you already have an account with the related service. For instance, to use the Slack MCP server, you’d need to log in and authenticate with your existing Slack account.*

Just as with skills, once Claude Code is connected to an MCP server, it will be able to use its powers when relevant.

Now that we have the Hugging Face MCP server connected, let’s try a random request:

> **Prompt**: *What are the most popular 3D models on Hugging Face from 2025?*

Since Claude Code can now access the “**Huggingface** **\[model\_search\]**” tool via the connected MCP server, it can perform a series of searches:

![Claude Code chat using the Hugging Face MCP to search for popular 3D models from 2025, showing model_search queries and results sorted by downloads](https://substackcdn.com/image/fetch/$s_!A3qC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8e40b84-6c85-4042-beee-d21a13d0141c_605x492.png)

Soon, it provides me with the requested list, sorted by the number of downloads:

![Claude Code chat message listing the most popular 3D models on Hugging Face in 2025, showing ranked models with downloads, likes, tasks, licenses, and brief descriptions](https://substackcdn.com/image/fetch/$s_!U2Bt!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b108600-d4ba-4d2e-b568-298df78ed220_693x608.png)

I didn’t have to explicitly mention the Hugging Face MCP server.

Claude Code knew exactly what tools to use.

### Useful MCP commands for Claude Code

Here are a few MCP-related commands to use in your terminal:

-   **claude mcp list**: shows all of your currently connected MCP servers
    
-   **claude mcp get <name>**: displays details about a specific server
    
-   **claude mcp remove <name>**: disconnects from a specific MCP server
    

### Where do you find MCP servers?

Even a simple search for “*best MCP servers for \[blank\]*” will return endless lists and directories.

But to get you started, here are a few solid options:

-   [Anthropic’s official list from Claude Code Docs](https://code.claude.com/docs/en/mcp#popular-mcp-servers)
    
-   [Massive database from modelcontextprotocol.io](https://github.com/modelcontextprotocol/servers)
    
-   [Search for MCP servers on MCP.so](https://mcp.so/)
    

Here’s another thing to try: Ask Claude Code to recommend a list of relevant MCP servers, grounded in its knowledge of your projects:

> **Prompt:** *Based on our chat history and the content of my working folder, what MCP servers would be the most useful to my work?*

Did Claude come up with any relevant suggestions in your case?

## Skills + MCP servers = Match made in heaven

As we’ve learned, skills are great for codifying repetitive workflows and instructions, while MCP servers let Claude Code take additional actions.

But true magic comes from combining the two: Your skills can be told to call on specialized, skill-specific MCP servers to help Claude do its job better.

Think of it like this:

-   Skills teach Claude a recipe (ingredient list, cooking instructions, etc.)
    
-   MCP servers let Claude access the kitchen, utensils, and ingredients themselves
    

For instance, our hypothetical “Brand Deck” skill could incorporate an instruction that tells Claude Code to use Canva’s MCP server to create a new design and insert it into the final slide deck.

What skills and MCP server combinations will you build?

## 🫵 Over to you…

Loading...

The poll tells me *what*. A comment tells me *why*. Let me know what works or doesn’t.

[Leave a comment](https://www.whytryai.com/p/claude-code-ide-skills-mcp/comments)

* * *

## Thanks for reading!

If you enjoy my work, here’s how you can help:

-   ❤️**Like** this post if it resonates with you.
    
-   🔄**Share** it to help others discover this newsletter.
    
-   🗣️**Comment** below—I love hearing your opinions.
    

**Why Try AI** is a passion project, and I’m grateful to those who help keep it going. If you’d like to support me and **[unlock cool perks](https://www.whytryai.com/p/paid-subscriber-bonuses)**, consider a paid subscription:

[1](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-anchor-1-185003109)

Anthropic even calls them out and includes [standalone installation instructions](https://code.claude.com/docs/en/vs-code).

[2](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-anchor-2-185003109)

See [last week’s post](https://www.whytryai.com/i/184322583/3-running-claude-code) for more on this.

[3](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-anchor-3-185003109)

After all, isn’t that why we installed Claude Code in the first place?

[4](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-anchor-4-185003109)

Normally, you’d give it a name that matches the tool. So if you’re connecting to Slack’s MCP, you’d name the connection “slack” (but you’re welcome to name it “butt-nugget” for all I care).

[5](https://www.whytryai.com/p/claude-code-ide-skills-mcp#footnote-anchor-5-185003109)

If we ran a local server, we’d use “**stdio**” instead of “**http**” here.
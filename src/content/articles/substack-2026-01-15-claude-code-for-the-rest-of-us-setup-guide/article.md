---
title: "Claude Code for the Rest of Us: Setup Guide"
subtitle: "A dummy-proof way to get started and a few quick ideas to test the waters."
author: "Why Try AI"
platform: "substack"
publicationName: "Why Try AI"
url: "https://www.whytryai.com/p/claude-code-beginner-guide"
publishedAt: "2026-01-15"
tags:
  - "ai-general"
  - "productivity"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.556Z"
---

# Claude Code for the Rest of Us: Setup Guide

> **Update:** *Here’s a [swipe file with 100+ use cases and starter prompts](https://www.whytryai.com/i/184634567/sunday-bonus-86-100-use-cases-and-prompts-for-claude-code-swipe-file) for Claude Code.*

* * *

I have a shameful confession to make.

Despite hearing great things about [Claude Code](https://claude.com/product/claude-code) for months, I’ve been hesitant to actually give it a shot. I mean, why try AI if you can *not* try AI, am I right?

I don’t know if it’s the scary “Code” word in its name, the fact that it isn’t free[1](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-1-184322583), or the terminal interface that brings back painful childhood trauma of my MS-DOS and [Norton Commander](https://en.wikipedia.org/wiki/Norton_Commander) days.

![Please. God. No. Not again!](https://substackcdn.com/image/fetch/$s_!JVqF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F446489ad-2781-4cfd-ab46-26ecff5d63c5_1027x444.png)

The point is, I kept reading about Claude Code without taking any action.

But Claude Code chatter wouldn’t stop. Substack included.

[Charlie Guo](https://open.substack.com/users/3625174-charlie-guo?utm_source=mentions) kept suggesting I try something like Claude Code or [OpenAI’s Codex](https://chatgpt.com/features/codex) since late last year. [Alex McFarland](https://open.substack.com/users/2951923-alex-mcfarland?utm_source=mentions) has built his entire writing system around Claude Code.

The final straw came last week, when [Ethan Mollick](https://open.substack.com/users/846835-ethan-mollick?utm_source=mentions) wrote “[Claude Code and What Comes Next](https://www.oneusefulthing.org/p/claude-code-and-what-comes-next).”

So I caved.

“*Fine*, Claude Code. You win! I give up! Happy now?!” I screamed at the wall, startling both of my cats, who already view me with suspicion on the best of days.

That is the story all about how I finally installed Claude Code on my Windows laptop and took it for a spin.

And, yes, Claude Code truly just…does things. Whether you work with code or not, there are likely a bunch of practical tasks Claude Code can help you with.

If you’re in the same boat as I was, you’re in luck.

Let me show you how to get Claude Code running and what it can do for you.

## What exactly *is* Claude Code?

In simple terms, Claude Code is “Claude that can **take action**.”

In slightly less simple terms, it’s a Claude-powered agent that runs in your computer terminal[2](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-2-184322583) and can see and modify files and folders (within reason, relax!).

That may sound minor, but it’s the difference between simply *discussing* your work with Claude and having Claude *actually work* on…your work?

Shut up, you know what I mean.

## Why Claude Code and not “just” Claude?

Here’s a quick comparison:

![Comparison chart titled “Claude vs. Claude Code” showing differences in context scope, task horizon, help style, and workflows, highlighting Claude Code for multi-step coding with real files.](https://substackcdn.com/image/fetch/$s_!8IUv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0c8816fd-c583-43f3-b1a5-811cb97e83f5_960x596.png)

Here’s what that means in practice:

-   **Context scope**: With Claude Code, you don’t have to manually upload files or paste text to provide context. It just sees everything within the designated folder.
    
-   **Task horizon**: Like any chatbot, Claude is built for back-and-forth interaction, one turn at a time. Claude Code, on the other hand, can create a multistep plan and run with it until it’s finished.
    
-   **Help style**: Claude is great for *talking about* things, while Claude Code is an agent that can go out and *do* things.
    
-   **Works with**: Claude Code can directly manipulate items and create new ones, unlike Claude that sticks primarily to text-based chat.
    
-   **Best for**: Claude Code is for when you need to actually make stuff happen.
    

The bottom line is that with Claude Code, you chat *and* take action in one place, without having to switch windows, copy-paste text back and forth, or upload separate files to work on.

Claude Code is an all-in-one interface.

It’s just too bad that it’s not a particularly inviting interface.

But we won’t let that deter us, will we?

Let’s get to work!

## Setting things up

You can use Claude Code in many different environments:

-   [On the web](https://code.claude.com/docs/en/claude-code-on-the-web) (mostly for working with code repositories)
    
-   Inside the [Claude Desktop app](https://code.claude.com/docs/en/desktop) (user-friendly but more limited)
    
-   Within an [integrated development environment](https://code.claude.com/docs/en/vs-code) (IDE) like Cursor
    
-   …even [in your Slack messages](https://code.claude.com/docs/en/slack).
    

But for today’s post, I’ll stick to the purest, vanilla-est implementation: Running Claude Code in your computer’s terminal window.

It’s the most flexible version of Claude Code, works directly with your local files and folders, and gives you the best baseline understanding.

### 1\. Prerequisites

First off, check that your computer and operating system are up to scratch by going to: [code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup)

![](https://substackcdn.com/image/fetch/$s_!rVQR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e8a0bcb-a4d6-4ee4-bd58-2dc307a2c528_742x267.png)

In the case of my Windows laptop, I *also* had to install the “Bash”[3](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-3-184322583) above.

![Terminal error message while setting up Claude Code on Windows, explaining the git-bash requirement and how to set the CLAUDE_CODE_GIT_BASH_PATH environment variable.](https://substackcdn.com/image/fetch/$s_!8iiS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fba651ee3-bf4a-4d06-b09f-11a239705a46_569x103.png)

The fix was very straightforward: I followed the error message to [git-scm.com/install/win](https://git-scm.com/install/windows) and grabbed the relevant installer:

![](https://substackcdn.com/image/fetch/$s_!MA-t!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F57ab3f6c-1cdc-4564-8752-2e09bda75558_704x305.png)

I then ran the file and installed it as any other Windows software:

![Git for Windows setup screen showing the destination folder selection step, with Git installing to C:\Program Files\Git for Claude Code requirements.](https://substackcdn.com/image/fetch/$s_!Qstj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F58f8586d-7c06-4955-bba8-6b8588725241_600x469.png)

You’ll see about a dozen selection screens during installation, but you can just leave all checkmarks at default and click “Next” on every screen.

Now you’re ready to get Claude Code running.

### 2\. Installing Claude Code itself

The [setup page](https://code.claude.com/docs/en/setup) tells you exactly which commands to run depending on your OS:’

![Code snippet showing Claude Code installation commands for macOS, Linux, WSL, Windows PowerShell, and Windows CMD using curl and install scripts.](https://substackcdn.com/image/fetch/$s_!z2Uz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8df41768-3eb8-4be8-8b6e-64bd9719eb4c_754x390.png)

Windows PowerShell is what you’d typically want on a Windows PC.

Start the terminal by…opening the “Terminal” app from the start menu:

![Windows Start search results showing the Terminal app selected with a “Run as administrator” option, used when setting up or running Claude Code on Windows.](https://substackcdn.com/image/fetch/$s_!FZy3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c4dcde6-9668-42cf-b2c4-ba0d763c1e7d_398x256.png)

I recommend right-clicking on the app and selecting “Run as administrator” as above to avoid additional authorization checks.

You should now see this inviting, beautiful terminal window:

![On the plus side, you can briefly feel like a hacker in a 90s movie.](https://substackcdn.com/image/fetch/$s_!awTO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd469b6b1-4540-417f-801b-5cf0f4302d33_890x231.png)

Now you simply copy-paste the relevant string from the setup page. In our case:

```
irm https://claude.ai/install.ps1 | iex
```

Hit “Enter,” and the setup should start:

![Windows PowerShell running the Claude Code install command, showing setup starting and installing the latest native Claude Code build.](https://substackcdn.com/image/fetch/$s_!mRnm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84654dc0-7117-47ec-acff-7f2460aca7dc_548x95.png)

If all goes well, Claude Code will be installed in less than a minute:

![PowerShell output confirming Claude Code installation success on Windows, showing version 2.1.7, install path, and next steps to run the claude command.](https://substackcdn.com/image/fetch/$s_!OVis!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F873d4697-bfd9-4ced-9074-3e6af24d57d5_541x265.png)

That’s it!

You’re ready to run Claude Code.

* * *

> **Mandatory disclaimer box**: Depending on your system, you may run into some errors and dependencies, like I first did with git-bash:
> 
> ![Terminal error message during Claude Code setup on Windows explaining that git-bash is required and how to set the CLAUDE_CODE_GIT_BASH_PATH environment variable.](https://substackcdn.com/image/fetch/$s_!8iiS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fba651ee3-bf4a-4d06-b09f-11a239705a46_569x103.png)
> 
> The good news is, AI can help here, too.
> 
> I solved every issue using my [no-prompt prompting](https://www.whytryai.com/p/no-prompt-prompting-so-lazy-it-just) concept and pasting error screenshots without additional commentary:[4](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-4-184322583)
> 
> ![Article section explaining a Claude Code Git Bash error on Windows, with plain-English explanation and step-by-step fix to install Git for Windows and enable Git Bash.](https://substackcdn.com/image/fetch/$s_!Zaeq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb229fd88-072e-4083-98b8-46795c341045_804x751.png)
> 
> See? Simples.

* * *

### 3\. Running Claude Code

> **⚠️ Important**: Claude Code will have access to any files *and* subfolders within its working folder. Since it can modify and delete stuff, you *don’t want to give it access to your entire drive*.

I therefore strongly recommend running Claude Code within a dedicated, sandboxed folder of your choosing. In my case, I made one literally called “Claude Code.”

![File explorer sidebar showing a “Claude Code” folder alongside Contacts, CrossDevice, Documents, and Downloads directories.](https://substackcdn.com/image/fetch/$s_!-1qQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7d320612-035e-48af-820d-714427eea24e_155x166.png)

Navigate to that folder in your file explorer, then start the terminal from there by right-clicking within the folder and picking “Open in Terminal,” like so[5](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-5-184322583):

![Windows File Explorer open to a “Claude Code” folder with right-click context menu showing the “Open in Terminal” option.](https://substackcdn.com/image/fetch/$s_!b9iW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fedce0e7c-36c2-4fef-ba81-6a2b4069ba1a_675x492.png)

Now, Claude Code will *only* be able to see and work within that folder.

To start Claude Code, simply type “claude” and hit Enter:

![Windows PowerShell window with the claude command typed in a Claude Code project folder, showing the CLI being launched from the terminal.](https://substackcdn.com/image/fetch/$s_!bw8V!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9bb3e160-9b99-45b7-bdb4-9034cd15824e_831x162.png)

If it’s the first time you do this, Claude Code will ask you to log in with a paid account:

![Claude Code CLI login screen prompting the user to choose between signing in with a Claude subscription account or an Anthropic Console API billing account.](https://substackcdn.com/image/fetch/$s_!QjC2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F076d202b-ac79-4d20-89b6-ecb809f775b3_1044x181.png)

There are two ways to pay for running Claude Code:

1.  Use a [paid Claude subscription](https://claude.com/pricing) (Pro or higher).
    
2.  Use a pay-per-token [Claude Console account](https://platform.claude.com/) with pre-purchased credits.
    

Unless you only want to run a quick test on a minimum budget,[6](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-6-184322583) I recommend going with the paid monthly subscription.

First, it’s much more cost-efficient[7](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-7-184322583) and you won’t have to fiddle with APIs and credits.

Second, the more user-friendly UI for Claude Code in the Claude Desktop app *only* works with subscription accounts.

Finally, even if you decide that Claude Code isn’t for you, a paid subscription gives you many unrelated benefits (including access to the strongest Opus 4.5 model):

![Claude Pro pricing card showing $17 per month with annual billing, access to Claude Code in the terminal, higher usage limits, file creation, and extended model access.](https://substackcdn.com/image/fetch/$s_!fZlu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F38c03a2d-678e-455a-9d21-19e812f412f4_372x709.png)

Once you log in with your paid account, you should see this message:

![Claude Code security prompt asking whether to trust files in a local project folder, warning about read, write, and execute permissions before proceeding.](https://substackcdn.com/image/fetch/$s_!trrv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0b8d6c1f-7b21-4d7f-a755-cf4832347177_1075x271.png)

That’s Claude Code informing you of the risks and making sure it’s working in the right folder. If that’s the case, hit “Yes, proceed.”

You can now start chatting with Claude Code!

## What to use Claude Code for…other than coding?

The short answer is: Pretty much anything related to the files (including their content) and subfolders in your working folder.

But that’s not very concrete, is it?

Let me suggest a fun way to dive in. Throw some stuff into your working folder, and type this:

> **Prompt**: *I’m new to Claude Code and I want to use it for things other than coding. Look into the working folder, analyze its content, and suggest a few ways you can do something with it to demonstrate the benefits of Claude Code.*

In my case, the only thing in the test folder was a “Screenshots” subfolder with 100+ unorganized screenshots, yet Claude managed to come up with several ideas after analyzing them:

![Claude Code terminal output analyzing a project folder and suggesting non-coding uses like newsletter performance analysis, content indexing, and media organization.](https://substackcdn.com/image/fetch/$s_!1-lX!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3c21caef-e94e-4d9d-ac03-76597d8bd2a0_1821x704.png)

As you can see, Claude Code even offers up its own coding skills to create useful mini-apps based on your content.

Let me show you two things I ended up doing just to test the waters.

### Example #1: Finding and saving stuff from the web

First off, I wanted to see how Claude Code could handle the combined task of web search and local storage. So I asked the following:

> **Prompt:** *Find three public domain or otherwise free-to-use cat images online and save them in a “Cat” folder.*

Claude Code gets to work and reports on its progress:

![Claude Code terminal session demonstrating file system actions, downloading free cat images into a project folder, handling errors, and listing files via CLI commands.](https://substackcdn.com/image/fetch/$s_!0kbY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43111c7c-d05b-4013-be37-ecde601c19dc_1661x810.png)

What’s really cool is that Claude Code picks its own tools for the job, independently self-corrects, and tries alternative approaches whenever it runs into issues.

None of this work required any involvement from my side whatsoever. I only had to occasionally approve proposed changes to local folders/files:

![Using option #2 means you’ll see way fewer permission requests over time.](https://substackcdn.com/image/fetch/$s_!xl2d!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F94779f0a-e5dd-454b-a806-8231cdbe119f_774x227.png)

Very soon, Claude Code was done:

![Claude Code terminal output confirming a task completed successfully, listing a created “Cat” folder with downloaded free-to-use images and sources.](https://substackcdn.com/image/fetch/$s_!pn7V!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe3ef86b2-1105-4ce0-9e87-21d0ea8c7f31_1893x450.png)

I now have a new “Cat” folder…

![Windows File Explorer showing the Claude Code project directory with folders like .claude, Cat, and Screenshots, confirming files created during a Claude Code workflow.](https://substackcdn.com/image/fetch/$s_!rRHX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3055be2d-417b-4281-961a-64177169326d_741x272.png)

..and there are three cat pictures in it, as requested:

![File explorer thumbnails showing three downloaded cat images in a Claude Code project folder, labeled cat1_orange_tabby, cat2_black_white, and cat3_fluffy.](https://substackcdn.com/image/fetch/$s_!4rle!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9db43360-424e-4489-b26b-3028c53117f3_351x167.png)

Success!

**Note:** *There might be better ways to use the powers of web search and folder organization than finding random cat images, but I don’t know what those are.*

### Example #2: Renaming and organizing screenshots

For this test, I duplicated my “Screenshots” folder with 100+ images and placed it into the working “Claude Code” folder.

As you may know, default screenshot names aren’t that helpful, unless all you care about is the date and time they were taken:

![Ah, memories. “Screenshot 2025-11-26 151454” still brings a tear to my eye.](https://substackcdn.com/image/fetch/$s_!eJY1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc861581f-dcbf-46de-b7c9-48d6a8dc836a_841x382.png)

So I asked Claude for help with a slightly more involved prompt:

> **Prompt:** *I want you to review all the pictures in the “Screenshots” folder, rename them according to their content, group them into several logical categories, create relevant subfolders for each group, and move all images belonging to that category into the corresponding subfolder.*

Once again, Claude Code set off on its own, creating a plan, using its vision capabilities to see and understand the images, fixing roadblocks, and even making decisions about which files to rename or leave alone:

![Claude Code terminal output showing a structured plan to rename screenshot files, mapping generic filenames to descriptive names for newsletters, surveys, and AI project assets.](https://substackcdn.com/image/fetch/$s_!JIDv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97de179f-7246-4916-9e11-43b6f56d8918_943x386.png)

Claude understood the naming pattern and decided when to modify or avoid touching files with existing non-”Screenshot” filenames, including the infamous “[Butt Nugget](https://www.whytryai.com/i/183891136/ai-fail-of-the-week).”

After working for over seven minutes, Claude Code reported back with a helpful summary of its decisions and actions taken:

![](https://substackcdn.com/image/fetch/$s_!pGMt!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0bc3d473-0dba-463d-a29d-48b769f1b761_1183x524.png)

Behold! I now have a logical sub-folder structure for my screenshots…

![Windows File Explorer showing the Claude Code Screenshots folder organized into numbered category folders like Why Try AI Newsletter, AI Models Benchmarks, Design Branding, and Development Technical.](https://substackcdn.com/image/fetch/$s_!VSGE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09d8057d-079c-4ad8-a7a3-306c0fd412da_793x389.png)

…along with easy-to-parse filenames:

![Windows File Explorer open to the Claude Code Screenshots > 04_Video_Multimedia folder, showing renamed PNG files related to video generation, editing, and motion control.](https://substackcdn.com/image/fetch/$s_!YkwQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F455af765-803b-408f-ab35-f24103db3265_927x393.png)

If I had to do something like this manually, I’d be looking at hours of work.

You could rightfully ask what kind of lunatic renames and organizes their screenshots like this in the first place, but to that I say: No, *you’re* crazy!

## So…what now?

If I have done my job, then you know how to get Claude Code running on your computer and have at least a vague idea of what you can use it for.

Here are a few potential things to try with your own projects:

-   Research a topic online and organize findings in a local Excel sheet
    
-   Extract insights from local documents and turn them into a slide deck
    
-   Reorganize your messy files and folders
    
-   Set Claude Code loose on simple yet tedious or time-consuming file-related tasks
    
-   Ask Claude Code to code up a helpful mini-app or tool you can run locally
    

For instance, I have a few bigger plans of my own:

-   Export my Substack data, save it locally, and have Claude Code analyze it to come up with insights and recommendations
    
-   Export my chat history with every chatbot and see what learnings Claude Code can extract from such a massive context dump
    
-   Create a local app that automatically turns a standard Substack .zip export of multiple posts into a single text file to use as context for chatbots
    

This post was mostly just about getting Claude Code up and running, but there are many related topics I could dive into. Let me know what you’d find interesting:

Loading...

## A few safety tips

Unlike web-based chatbots, Claude Code runs directly on your computer and can make real changes to files and folders. Limit your risks by doing this:

1.  Always start Claude Code in the intended working folder, as I’ve shown. Claude Code can edit or delete things *inside* that folders but not the rest of your drive.
    
2.  Manually manage which files and subfolders you add to your working folder.
    
3.  Keep backups of any critical files or documents.
    
4.  Avoid adding any personal or otherwise sensitive info into the working folder. (Passwords, private docs or details, etc.)
    
5.  Consider manually approving download requests. You don’t want Claude Code to accidentally grab a virus or, worse, an *ugly* cat picture.[8](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-8-184322583)
    

Now go out there and Claude Code some things!

## 🫵 Over to you…

Loading...

The poll tells me *what*. A comment tells me *why*. Let me know what works or doesn’t.

[Leave a comment](https://www.whytryai.com/p/claude-code-beginner-guide/comments)

* * *

## Thanks for reading!

If you enjoy my work, here’s how you can help:

-   ❤️**Like** this post if it resonates with you.
    
-   🔄**Share** it to help others discover this newsletter.
    
-   🗣️**Comment** below—I love hearing your opinions.
    

**Why Try AI** is a passion project, and I’m grateful to those who help keep it going. If you’d like to support me and **[unlock cool perks](https://www.whytryai.com/p/paid-subscriber-bonuses)**, consider a paid subscription:

[1](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-anchor-1-184322583)

Unlike regular chat on Claude.com

[2](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-anchor-2-184322583)

Typically. But see below for alternative ways to run it.

[3](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-anchor-3-184322583)

Don’t worry, I also have only a vague idea what git-bash is after a quick search.

[4](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-anchor-4-184322583)

I stuck to ChatGPT purely because I already pay for ChatGPT Plus, but any other chatbot should be able to help you fix installation errors.

[5](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-anchor-5-184322583)

If you’re fancy, you can open the Terminal first and then navigate to the folder using the “cd \[FOLDER PATH\]” command. In my case: “`cd C:\Users\still\Claude Code`“

[6](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-anchor-6-184322583)

You can pre-purchase console credits for as little as $5.

[7](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-anchor-7-184322583)

I burned through almost $2 just with my two demo use cases for this article, using the cheapest Haiku model.

[8](https://www.whytryai.com/p/claude-code-beginner-guide#footnote-anchor-8-184322583)

Just kidding. All cats are evil beautiful.
---
title: "Google Opal: A Beginner's Guide"
subtitle: "Opal is the perfect beginner-friendly blend of vibe coding and workflow automation."
author: "Why Try AI"
platform: "substack"
publicationName: "Why Try AI"
url: "https://www.whytryai.com/p/google-opal"
publishedAt: "2025-11-13"
tags:
  - "ai-general"
  - "productivity"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.607Z"
---

# Google Opal: A Beginner's Guide

Google’s Opal isn’t new.

It [came out in late July](https://developers.googleblog.com/en/introducing-opal/) and made it into my “AI catch-up” post in early August:

[

#### AI Catch-Up: GPT-5 vs. Everything Else

](https://www.whytryai.com/p/ai-catch-up-gpt-5)[Daniel Nest](https://substack.com/profile/103658370-daniel-nest)·August 14, 2025[Read full story](https://www.whytryai.com/p/ai-catch-up-gpt-5)

But it’s only recently that I finally got around to fiddling with Opal, and it’s quickly growing on me in a way that most other AI-powered app builders haven’t.[1](https://www.whytryai.com/p/google-opal#footnote-1-178493735)

It’s not because Opal is exceptionally powerful or feature-rich.

In some ways, it’s because it’s not.

To me, Opal sits at just the right sweet spot of complexity vs. utility that makes it ideal for beginners who want to dabble with building AI-powered apps and flows.

Now that Opal is [available in 160+ countries](https://www.whytryai.com/i/178183750/ai-releases), this feels like a good time for a closer look at the tool.

Let’s dive in!

## What is Opal?

Opal is a hybrid of a limited no-code mini-app builder and light workflow automation:

You ask for an app in natural language:

![A screenshot of Google Opal’s blank app builder home screen showing “Let’s build your app,” demo video link, and prompts like “Add a step to get started” and “Describe what you want to build.”](https://substackcdn.com/image/fetch/$s_!Ioqr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F28e9e62c-fcc2-4682-abc6-c116eddc0331_1915x885.png)

Opal then chains multiple AI models and other functionality into a visual workflow that fulfills your request. You can also make manual changes by moving the individual nodes, tweaking their content, or adding new ones:

![A Google Opal workflow diagram showing a “Webpage URL” user input node feeding into several blue generate nodes—GetWebpageContent, GenerateTextSummary, CreateImagePrompt, GenerateSummaryImage—and ending in a green CreateDisplayPage output node.](https://substackcdn.com/image/fetch/$s_!yJ9Z!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8b52e721-9256-4d38-aeaa-65c6ad29a27a_1554x888.png)

Simple concept, but it works surprisingly well, provided the tool you’re building lends itself well to Opal’s capabilities (see the “Limitations & Workarounds” section).

[Get 30% off for 1 year](https://www.whytryai.com/subscribe?coupon=9e8acfc3&utm_content=178493735)

## How to use Opal: the four types of nodes

You access Opal by visiting **[opal.google](https://opal.google/)** and logging in with your Google account.

Once you log in, you’ll see a list of your own apps and a gallery of premade public ones (as a new user, you’ll only see the latter):

![](https://substackcdn.com/image/fetch/$s_!d7PO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd552d8f3-ce52-4b1e-9dfe-39b22854a2d3_1190x858.png)

I recommend opening and inspecting an existing app, as it’s a great way to learn the ropes and see how everything works.

When you’re ready, click the “**+Create New**” button to start building your own app. Here’s a solid walkthrough from Google itself:

Whether you “vibe code” your app by asking Opal to make it or build it from scratch manually, you’ll end up with an editable, node-based workflow.

Nodes are the building blocks of any Opal app:

![A labeled Google Opal workflow screenshot showing four node types—User Input (yellow), Generate (blue), Output (green), and Asset (red)—with orange arrows highlighting each node.](https://substackcdn.com/image/fetch/$s_!mlix!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd34f6b1c-f56c-417e-9263-c686ecd3281f_1167x699.png)

There are four color-coded types of nodes:

1.  🟨 “User input” nodes (yellow)
    
2.  🟦 “Generate” nodes (blue)
    
3.  🟥 “Asset” nodes (red)
    
4.  🟩 “Output” nodes (green)
    

The key to understanding Opal is understanding the four nodes and their behavior.

So let’s take a closer look at each of them.

### 🟨1. “User input” nodes

![ChatGPT said:  A close-up of a yellow Google Opal “User input” node labeled “Enter the URL of the webpage.”](https://substackcdn.com/image/fetch/$s_!40YL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F633f3ded-ece6-405d-a233-a39bef827c1b_565x223.png)

In principle, you can make a mini-app that doesn’t call for any proactive user input. (In this case, the user would only see a clickable “Start” button.) This could be an inspirational quote generator or a “word of the day” tool—anything with a fully randomized output.

In practice, most Opal apps kick off with some form of user input.

That’s what the “User input” node is for: It tells the user what kind of input they need to provide and in what format. Here are the possible input formats:

![A dropdown menu in Google Opal showing user input format options: Any, Audio, Image, Text, Upload File, and Video.](https://substackcdn.com/image/fetch/$s_!7lGc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e2c2fda-2cfd-4c21-81c5-3c1106c1926a_299x288.png)

Opal apps can have more than one “User input” node.

For instance, your app might be an image generator that turns a photo of the user’s pet and the pet’s name into a fake business card for that pet.[2](https://www.whytryai.com/p/google-opal#footnote-2-178493735) In that case, “Pet photo” (image) and “Pet name” (text) would be the two “User input” nodes.

Once the user provides the input, Opal feeds that to subsequent “Generate” nodes.

### 🟦2. “Generate” nodes (blue)

![A close-up of a blue Google Opal “Generate” node showing a Get Webpage tool call and its link to the User input node.](https://substackcdn.com/image/fetch/$s_!ByDZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1f0d3251-9ce2-4b2f-9389-71c7fb4d0514_526x340.png)

“Generate” nodes are the main engine of Opal. They’re the ones that actually *do* something with the user’s input, from crawling websites to analyzing content to generating code, images, text, audio, or video. Here are all of the available Google models that can power a “Generate” node:

![ChatGPT said:  A dropdown list of Google Opal model options, including Gemini 2.5 Flash, Gemini 2.5 Pro, Plan and Execute, Deep Research, Imagen 4, Nano Banana, AudioLM, Veo, and Lyria 2.](https://substackcdn.com/image/fetch/$s_!2NCM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa09e2d18-558d-42d0-86dc-b04ea418148a_332x557.png)

And here are the tools these nodes can access:

![A tools list in Google Opal showing available actions: Search Web, Search Maps, Get Webpage, Get Weather, and Code Execution.](https://substackcdn.com/image/fetch/$s_!HuJT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3a7bf075-a805-460a-b5d4-6d7011ce1879_162x208.png)

Opal apps usually include several “Generate” nodes that process input from a preceding node and pass new input to the next one. For each of them, you can provide a detailed prompt that tells them how to act.

Here’s a “Generate” node powered by Gemini 2.5 Flash that uses a user-provided URL to crawl that page using the “Get Webpage” tool and extracts its contents:

![ChatGPT said:  A Google Opal prompt editor showing instructions to call the Get Webpage tool using the URL provided by the User input node.](https://substackcdn.com/image/fetch/$s_!_AG9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f681a21-8774-441c-8eee-d36510d314aa_335x249.png)

This webpage content can then be passed on to yet another “Generate” node that summarizes it or turns it into a song or creates an image inspired by it, and so on.

That’s how you can string multiple “Generate” nodes together into complex apps that process inputs, generate outputs, and combine them in different ways.

### 🟥3. “Asset” nodes (red)

![ChatGPT said:  A close-up of a red Google Opal “Asset” node displaying an open book icon on a blue background.](https://substackcdn.com/image/fetch/$s_!ytnj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F560d50bd-b771-4da7-9cb8-6ab0c421c478_606x681.png)

With the “Asset” node, the app maker can provide Opal with a fixed “asset” for the app to reference behind the scenes.

This might be a “Tone of Voice” guide for an article-writing Opal app or a reference image for an app that creates pictures in a certain visual style.

Here’s what can be used as an asset[3](https://www.whytryai.com/p/google-opal#footnote-3-178493735):

![ChatGPT said:  A dropdown menu in Google Opal showing asset options: Upload file, My Drive, YouTube, Text, and Drawing.](https://substackcdn.com/image/fetch/$s_!24vS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47ec4a0e-650e-471b-b094-a4f9bc0fce06_203x316.png)

Unlike the yellow “User input” nodes, end users of the app won’t be able to influence the “Asset” nodes in any way. In fact, app users won’t even *see* these nodes unless they decide to edit or “Remix” the app (see below).

### 🟩4. “Output” nodes (green)

![A close-up of a green Google Opal “Output” node showing HTML generation using inputs from GenerateTextSummary and GenerateSummaryImage.](https://substackcdn.com/image/fetch/$s_!JIs6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe11ade43-9367-4102-a6bb-2a24d24f3ff9_607x385.png)

Finally, we have the “Output” nodes.

That’s what the end users will see at the end of the process, once Opal runs through the entire app workflow.

The main types of outputs are as follows:

![A dropdown menu of output options in Google Opal, including Manual layout, Webpage with auto-layout, Save to Google Docs, Save to Google Slides, and Save to Google Sheets.](https://substackcdn.com/image/fetch/$s_!H9lQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5bb07bc6-1b7c-4119-9dd9-c0ef86db17ae_327x320.png)

You can get Opal to throw the final output into Google Drive as Docs, Slides, or Sheets.

In most cases, you’ll likely want to go with the “Webpage with auto-layout,” which lets Gemini determine the best possible way to present the output in a nicely formatted page.

As with most other nodes, you can prompt how the model should act and which preceding nodes it should pull input from. Here’s an Opal-generated example:

![A Google Opal prompt editor showing instructions to generate a clean, responsive HTML webpage using a text summary and an AI-generated summary image.](https://substackcdn.com/image/fetch/$s_!LpRZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf19c189-b19d-4e59-9c1b-7d6e931f3ed3_345x479.png)

And that’s how Opal works in a nutshell: By cobbling together different nodes to undertake tasks, generate outputs, and display the result to the end user.

[Get 30% off for 1 year](https://www.whytryai.com/subscribe?coupon=9e8acfc3&utm_content=178493735)

## Why Opal is great for dabblers

What makes Opal work so well—at least in my opinion—is that it addresses four frustrations I’ve run into when trying to build useful tools with AI as a non-coder.

### 1\. Vibe coding without the mess

The promise of [vibe coding](https://cloud.google.com/discover/what-is-vibe-coding) is that you can build just about anything, even as a code-illiterate person.

In theory.

But the reality is that unless you’re making yet another Tetris clone, you’ll quickly run into complexity you’re not equipped to handle.

Code will break, errors will pile up, and as you make tweaks to the app, you’ll have less and less understanding of how it all comes together. Even if your app works, you won’t know why and how, or be able to make precise edits without coding knowledge.

Opal solves this by exposing the “engine room” in the form of a visual diagram of nodes that represent specific app steps. You can peek inside each node, figure out what it does, and tweak it directly.

![A screenshot of an Opal workflow showing the GenerateSummaryImage node connected to the CreateDisplayPage output node, with the right-side panel displaying its Nano Banana image generation prompt.](https://substackcdn.com/image/fetch/$s_!ctXf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F235af80c-d051-4792-8627-02bfa07a9582_1208x405.png)

Because these nodes are plug-and-play compatible with each other, your mini-app is transparent, easily tweakable, and less likely to break in unexpected ways.

In short, it just works.

Think of it like creating things with ready-made LEGO blocks vs. a 3D printer. Sure, the 3D printer *technically* lets you make whatever you want, but good luck learning the process and assembling something that doesn’t collapse under its own weight without prior experience, buddy.

### 2\. Workflow automation made simple(r)

Workflow automation platforms like [Make](https://www.make.com/) and [n8n](https://n8n.io/) are fantastic, robust, and capable of building complex flows that pull together hundreds of third-party tools in creative ways to simplify or automate any process.

But let’s face it: For a casual user, the learning curve may feel too steep. You’ll often need to set up third-party logins and API keys, hook features up to your existing accounts, troubleshoot specific node setup, etc.

Opal essentially creates a ready-to-use workflow automation diagram whenever you request an app:

![Workflow Automation Lite™](https://substackcdn.com/image/fetch/$s_!oHZK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdd34040-7fb4-430d-b0e6-b3ed7564b4e0_1474x767.png)

Even as a complete noob, you can look under the hood, see how the nodes work, and learn what makes the whole system tick. There’s even a nifty “Console” view that lets you run each step separately to see exactly what happens when it triggers:

![A screenshot of Google Opal’s Console view showing step-by-step execution: the Webpage URL input, the GetWebpageContent node running, tool calls to Gemini 2.5 Flash, and extracted webpage output.](https://substackcdn.com/image/fetch/$s_!1h43!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbc076f78-31fb-412a-aed8-bfe406e41b45_340x660.png)

And since every node is powered by an integrated Google model, you won’t have to struggle with gluing incompatible nodes together using API keys, webhooks, and other advanced steps.

In short, Opal helps you get a feel for workflow automation while smoothing out the learning curve.

As you begin to make minor tweaks to each node or add new nodes, you’ll gain more confidence and understanding of the process. Eventually, you might just feel ready to up your game and go for one of the full-featured workflow automation platforms.

### 3\. One-click app sharing

I’ve built a bunch of mini apps with the help of AI over the years. Many ended up as [”Sunday Bonus” tools](https://www.whytryai.com/p/sunday-bonus-overview).

But it took time to figure out how to share such apps with others. I had to discover platforms like [Glitch](https://glitch.com/). Then, when Glitch got discontinued, I ended up having to learn [Netlify](https://www.netlify.com/) and moving all of my apps there.

This friction was enough of a pain point that I even wrote a beginner-friendly guide to [sharing apps with others](https://www.whytryai.com/i/155829634/sunday-bonus-stupid-simple-way-to-make-and-share-apps-with-o-mini).

Now, here’s how you share an Opal app (it’s tricky, so see if you can follow):

Yup, that’s it!

If you’ve ever shared a Google Sheet/Slides/Doc link with someone, you already know how to share an Opal app.

All they have to do is log in with their own Google account. Since everything’s hosted by Google and powered by its own models, your app will work for your users in exactly the same way as it does for you.

Which brings me to…

### **4\. AI baked in**

There are precious few tools that let you build AI-powered apps that are:

-   Free to use
    
-   Don’t require third-party API keys
    

The two I know of are [Glif](https://glif.app/) and [Claude’s Artifacts](https://www.claude.com/blog/build-artifacts).

Now, Opal joins their ranks as an app builder with AI integrated into the flow by default. Everything runs on Google’s own generative AI models, and it doesn’t cost you or your end users anything to run the resulting mini-apps.

So if you’ve been hearing all the chatter around vibe coding and thinking of giving it a shot, now’s a great time to take the plunge. Opal is as close as it gets to being the perfect entry point into no-code app building.

[Get 30% off for 1 year](https://www.whytryai.com/subscribe?coupon=9e8acfc3&utm_content=178493735)

## Limitations & workarounds

I don’t want to sound like a zealot or a blind fanboy.

Because, yes: Opal has its rough edges.

Let me share a few of its limitations and some ways to work around those.

### 1\. Limited capabilities

Your Opal apps can only use the “LEGO blocks” provided by Google.

Unlike true vibe coding platforms, you can’t build complex apps with nearly the same degree of flexibility.

Opal is made primarily for “input -> processing -> output”-style apps. It’s not made to create and run fully functioning code.

**Workaround:** You *can* get Opal to code basic apps and render those inside the final “Output” node. For instance, I asked for a Tetris game maker, and it *kind* of works (I trimmed the video as it took Opal about 2-3 minutes to code the game):

As you can see, this isn’t a fixed experience. Opal forces everything through the input-processing-output funnel, so the user has to first provide some input.

Worse still, Opal generates the code from scratch every time someone runs the app, meaning that every user will experience a different Tetris game.

So if you want control over every aspect of the final product, Opal won’t cut it.

### 2\. Non-interactive apps

Some [Claude Artifacts I built](https://www.whytryai.com/i/173184213/sunday-bonus-turn-vague-requests-into-polished-prompts-with-prompt-crafter) are interactive: The user provides initial input, Claude generates follow-up questions based on that, the user responds, and so on.

Not with Opal.

Opal apps frontload the user’s input upfront, then make the user wait while the “black box” generates the final output. You can’t create apps that present users with additional input choices along the way.

**Workaround:** Certain Opal nodes have a “Review with user” option you can toggle:

![A Google Opal settings panel showing the “Review with user” checkbox highlighted with an orange arrow.](https://substackcdn.com/image/fetch/$s_!JHVE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43ee4ddf-b885-4e19-9ed6-15c3b5e6cec6_576x166.png)

This adds an extra “User input” node to the workflow, giving the user some degree of influence. But it’s quite rigid and limited to specific nodes and types of inputs.

So if your app involves multiple back-and-forth steps between the user and the system, Opal isn’t quite there yet.

### 3\. No live AI chat

Most AI coding tools let you discuss your WIP app with the AI assistant that can recommend additional features, flag issues, etc.

Opal only lets you give one-way orders. After your app is ready, you can ask for changes using the “Suggest an edit” prompt field:

![A close-up of the “Suggest an edit” input bar in Google Opal, with a note below saying “Opal can make mistakes, so double-check it.”](https://substackcdn.com/image/fetch/$s_!c-nW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9104bf4e-25b3-4e52-971d-cb2b84e7e293_545x109.png)

But Opal won’t talk back or challenge you. It’ll just run with whatever suggestions you typed in.

**Workaround:** Open up a second tab with your preferred large language model and treat it as your coding advisor. It can suggest ideas and features and even to provide a prompt for you to paste into Opal’s “Suggest an edit” box.

### 4\. Version tracking is clunky

The good news is that Opal saves checkpoints of your app after every requested tweak, letting you access version history if needed:

![A dropdown menu under “Share app” in Google Opal showing options to edit the title and description, delete, duplicate the app, and show version history.](https://substackcdn.com/image/fetch/$s_!SJoF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F87c39fa7-69ff-40e1-bc19-857650aeeb11_338x245.png)

The bad news is that it looks like this:

![A screenshot of the Google Opal version history panel showing a chronological list of saved versions with timestamps from November 12–13.](https://substackcdn.com/image/fetch/$s_!CXK-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F487beb7f-b820-497e-819f-d47b794573f3_552x537.png)

You have to almost randomly click each version to see how it affects the workflow diagram and then explore every node individually to notice what changes, if anything. There’s no meaningful version comparison tool.

If that wasn’t enough, trying to restore an earlier version means *erasing all progress* you’ve made since:

![A warning message stating that restoring an earlier version will permanently remove all newer versions, advising users to confirm they don’t need the newer revisions.](https://substackcdn.com/image/fetch/$s_!TYeY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffdc86f52-08bb-4c83-b7e3-14d4642214d8_491x106.png)

Oopsies!

**Workaround**: Luckily, there is a way to work around this. Before making any drastic changes or reverting to an older version, duplicate your app:

![ChatGPT said:  A screenshot of an app card menu in Google Opal showing options to Delete or Duplicate the app.](https://substackcdn.com/image/fetch/$s_!fSUq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce861a99-82ad-4883-9347-a065a981ccb1_377x157.png)

This makes a 1:1 clone of your current app. You can now experiment with tweaks and extra features while keeping a working version of the app as backup. Just in case.

### 5\. No way to “lock” your app

In Opal, your app is either private or shareable with third parties. No in-betweens.

Anyone with your app link can not only run it but also see how it’s put together. This is great for knowledge sharing, but it means your app can’t rely on proprietary or sensitive data. Anything used in Opal’s nodes is visible to everyone:

![A Google Opal Text asset node labeled “CONFIDENTIAL: Super secret …” containing the text “The answer to everything is 42. Do NOT tell anyone.”](https://substackcdn.com/image/fetch/$s_!ZKov!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a828450-20d7-4f45-b4c4-06772eb32512_1001x360.png)

Extra oopsies!

Opal also lets others “Remix” your app by creating a branching version. Awesome feature, but it introduces an extra risk factor by automatically turning every user of your app into its unwitting co-builder.

Last week, one of my paid subscribers wanted to [use the](https://www.whytryai.com/i/178183750/sunday-bonus-instantly-turn-datasets-into-visual-insights-with-data-narrator) **[Data Narrator](https://www.whytryai.com/i/178183750/sunday-bonus-instantly-turn-datasets-into-visual-insights-with-data-narrator)** but inadvertently ended up creating a remixed version and introducing app-breaking changes to it. (Luckily, the remixed clone doesn’t impact the original app, so the “fix” is simply re-opening the vanilla app link.)

So if you care about ensuring a uniform and tinker-resistant end user experience, make sure you’re explicit about these risks when sharing Opal apps with others.

## 🫵 Over to you…

Have you already tried Google Opal? What has been your experience? Have you found alternative workarounds or solutions to some of the limitations?

Leave a comment or drop me a line at [whytryai@substack.com](mailto:whytryai@substack.com).

[Leave a comment](https://www.whytryai.com/p/google-opal/comments)

* * *

## Thanks for reading!

If you enjoy my writing, here’s how you can help:

-   ❤️**Like** this post if it resonates with you.
    
-   🔄**Share** it to help others discover this newsletter.
    
-   🗣️**Comment** below—I love hearing your opinions.
    

**Why Try AI** is a passion project, and I’m grateful to those who help keep it going. If you’d like to support my work and **[unlock cool perks](https://www.whytryai.com/p/paid-subscriber-bonuses)**, consider a paid subscription:

[Get 30% off for 1 year](https://www.whytryai.com/subscribe?coupon=9e8acfc3&utm_content=178493735)

[1](https://www.whytryai.com/p/google-opal#footnote-anchor-1-178493735)

For instance, [last week’s Sunday Bonus](https://www.whytryai.com/i/178183750/sunday-bonus-instantly-turn-datasets-into-visual-insights-with-data-narrator) is an Opal project.

[2](https://www.whytryai.com/p/google-opal#footnote-anchor-2-178493735)

Steal my million-dollar idea!

[3](https://www.whytryai.com/p/google-opal#footnote-anchor-3-178493735)

“Upload file” and “My Drive” let you provide Opal with different types of files, from PDF documents to text files to images and more.
---
title: "New Interactive Explainers: ChatGPT vs. Claude"
subtitle: "How do the two newly launched 'interactive visuals' features compare?"
author: "Why Try AI"
platform: "substack"
publicationName: "Why Try AI"
url: "https://www.whytryai.com/p/interactive-explainers-chatgpt-vs-claude"
publishedAt: "2026-03-19"
tags:
  - "ai-general"
  - "chatgpt"
  - "claude"
  - "content-creation"
  - "llm"
  - "productivity"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-19T14:28:28.973Z"
---

# New Interactive Explainers: ChatGPT vs. Claude

Last week, Anthropic and OpenAI both released [interactive visual explainers](https://www.whytryai.com/p/sunday-rundown-133-interactive-explainers) for their chatbots.

These explainers supplement your text chat with diagrams, charts, and other visuals you can manipulate to better understand concepts.

This brought me right back to August 2025, when three companies near-simultaneously released their versions of “study” modes:

[

#### I Tested Three Different AI "Study" Modes

](https://www.whytryai.com/p/ai-study-modes)[Daniel Nest](https://substack.com/profile/103658370-daniel-nest)·August 21, 2025[Read full story](https://www.whytryai.com/p/ai-study-modes)

Just as I did then, I wanted to see how the ChatGPT version compared to Claude.

So I went ahead and tested them, because *who’s gonna stop me*?!

## How do the interactive explainers work?

Although the idea is similar, the two companies approach it differently.

### ChatGPT

OpenAI chose to [curate a shortlist of 70+ STEM concepts](https://openai.com/index/new-ways-to-learn-math-and-science-in-chatgpt/) in advance, so when you ask about them, ChatGPT should automatically pull up the relevant visual explainer.

![ChatGPT interactive explainer for the ideal gas law showing PV=nRT formula, four adjustable sliders for pressure, volume, moles, and temperature, alongside a 3D glass container with bouncing blue gas molecules](https://substackcdn.com/image/fetch/$s_!OMGa!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F74fd941a-50b4-4fa3-a8a2-d69700941077_1235x695.png)

These explainers are pre-built and will always look and work the same way.

### Claude

Claude, instead, designs a [new interactive explainer from scratch](https://claude.com/blog/claude-builds-visuals) every time:

Because of this, Claude’s explainers aren’t limited to math and science topics and can also be requested on demand with relevant commands:

> *Claude will decide when to build a visual for something, or you can ask it to do so directly (with a query like “draw this as a diagram” or “visualize how this might change over time”).*

So what does this look like in practice?

Let’s find out!

## **The five tests**

> **Note:** *I wanted to test “compound interest” and “exponential decay” in addition to the Pythagorean theorem, but ChatGPT couldn’t actually trigger any interactive explainers for me. Does it work for you?*
> 
> *As such, I’m comparing the three examples OpenAI showcased on the page.*
> 
> *Even though I have a paid Anthropic plan, I am testing with the **free** versions of each tool to reflect the average user’s experience and keep the comparison fair.*

Since ChatGPT only has its preset library to pull from, this can’t be a true apples-to-apples comparison.

Instead, I’ll kick off with three explainers from ChatGPT’s list and supplement with two freeform ones that Claude might be able to build on the fly.

### **Test #1: Pythagorean theorem**

Let’s take a trip down memory lane back to our school years and basic geometry.

> **Prompt:** “*Explain the Pythagorean theorem.”*

#### ChatGPT

ChatGPT’s version is pretty barebones, but it does the trick:

![ChatGPT Pythagorean theorem interactive explainer with a blue right triangle diagram, two sliders adjusting sides a and b, the formula a-squared plus b-squared equals c-squared, and a calculated hypotenuse value of 15.81](https://substackcdn.com/image/fetch/$s_!l60S!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa12e30b7-88f4-4c35-b037-779e5937b4e5_928x460.png)

I can adjust the lengths of the **a** and **b** sides (legs) to see how this affects the **c** side (hypotenuse). The formula below the sliders explains the relationship.

#### Claude

Claude didn’t trigger any visuals automatically and provided a text explainer first:

![Claude chat interface showing a text-only explanation of the Pythagorean theorem with the formula, a classic 3-4-5 triangle example, and a description of the area-based proof, without any visual diagram](https://substackcdn.com/image/fetch/$s_!3RRv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F92143aa1-975d-4629-a336-2bfd49498689_752x408.png)

But when prodded to “Show me interactively,” Claude built what’s arguably a better version of ChatGPT’s pre-made diagram:

![Claude interactive Pythagorean theorem artifact with color-coded squares on each triangle side: red for a-squared equals 25, blue for b-squared equals 9, purple for c-squared equals 34, with adjustable sliders and the full equation mapped at the bottom](https://substackcdn.com/image/fetch/$s_!CSWS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe6593779-1e53-429d-a3a0-3e719d9681f3_744x741.png)

I like that Claude color-coded the sides *and* mapped the calculations directly onto the corresponding squares. Much easier to connect the dots!

But I do wish Claude had included the square root calculation for the **c** side to really bring this home.

Claude also lets me save the resulting diagrams as [Claude Artifacts](https://www.whytryai.com/p/claude-makes-useful-apps), so I’ll be sharing them here:

[Check out the Artifact](https://claude.ai/public/artifacts/c10ee19c-0362-4bae-b604-0cedfd63acae)

#### My take

While they both do largely the same thing, I find that Claude’s version is easier to parse at a glance, even though it doesn’t provide the final connection by visually mapping the square root calculation back to the length of the hypotenuse.

### **Test #2: Mirror equation**

Yet another equation I’d long forgotten everything about. Fun!

> **Prompt:** “*Show me the mirror equation.”*

#### ChatGPT

ChatGPT uses the same clean blue-line diagram style for this:

![ChatGPT mirror equation interactive explainer showing 1/f = 1/u + 1/v formula with sliders for object distance and focal length, a blue ray diagram of a convex mirror, and calculated image distance and magnification values](https://substackcdn.com/image/fetch/$s_!o0ER!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0940cf25-5c8b-4ffd-aa15-364df735bd35_928x459.png)

#### Claude

Claude made a visual by default this time, but a static rather than interactive one:

![Claude static visual for the mirror equation: a color-coded flowchart with the formula at top branching to three variable boxes for focal length, object distance, and image distance, with sign conventions and magnification formula below](https://substackcdn.com/image/fetch/$s_!Py25!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe4e30c2f-a491-4597-91fe-14d6f07368b6_717x650.png)

Again, this was an easy “Show me interactively” fix:

![Claude interactive mirror equation artifact with concave and convex mirror tabs, a ray diagram showing object and virtual image, sliders for object distance and focal length, and color-coded readouts showing image distance of -9.0 cm (virtual), magnification of 0.18 (upright), and image size of 0.18x (diminished)](https://substackcdn.com/image/fetch/$s_!EQxr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c82cd2a-24d0-49b3-8a64-2aa81d233564_672x750.png)

While Claude’s visual is again prettier to look at and shows helpful color-coded effects, the lines of the diagram don’t always connect to the mirror in a way that’s easy to grasp:

![Close-up of Claude's concave mirror ray diagram showing an orange object arrow, teal image arrow, and light blue converging rays crossing between the center of curvature and focal point, with labeled Object, C, Image, and F positions](https://substackcdn.com/image/fetch/$s_!jM_6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7c93876-5a3c-4d56-8b92-3ac16486839c_443x162.png)

[Check out the Artifact](https://claude.ai/public/artifacts/fbd58a78-0fda-4aad-9701-717f3964fc23)

#### My take

I’m still impressed by Claude’s ability to create on-the-fly visuals that are very close to what ChatGPT has pre-coded for it. Bonus points for letting users pick and visualize concave vs. convex mirrors.

The downside is that diagram elements sometimes connect in ways that aren’t fully clear, so the value you get from them depends on your existing understanding of the concepts.

### **Test #3: Ideal gas law**

If you’d asked me to explain this one before working on the article, I’d have stared at you with a blank expression before slowly backing away. But here we are.

> **Prompt:** “*Demonstrate the ideal gas law for me.”*

#### ChatGPT

![ChatGPT ideal gas law interactive with PV=nRT formula, sliders for pressure, volume, moles, and temperature at higher values, and a 3D container animation showing more gas molecules bouncing rapidly at 600 K temperature](https://substackcdn.com/image/fetch/$s_!cBXY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F62153910-d5d6-4c61-9e7d-601af24b1d67_925x458.png)

I like that the animation makes it instantly clear how gas molecules speed up at higher temperatures and why pressure might increase as the volume decreases. It’s perhaps the most visually intuitive of ChatGPT’s examples.

#### Claude

Claude made a graph with slider options instead of a visualized container:

![Claude ideal gas law artifact showing PV=nRT with summary cards for pressure (5.0 atm), volume (17.23 L), and temperature (210 K), three adjustable sliders, tabbed graph views for isothermal, isobaric, and isochoric relationships, and variable definitions below](https://substackcdn.com/image/fetch/$s_!WgY8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2909969e-8ce4-46f3-8ad9-475ffaa54d6a_599x792.png)

But I wanted to see if Claude could mimic ChatGPT’s version, and it 100% could:

![Claude animated ideal gas law artifact with readout cards for pressure (5.62 atm), volume (27 L), temperature (370 K), and moles (5 mol), a container with bouncing blue molecules of varying sizes, the live PV=nRT equation calculated below, and sliders for temperature, moles, and volume](https://substackcdn.com/image/fetch/$s_!QTyK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb243e52-fcb6-467c-9650-8e78ada1171d_744x630.png)

You get the same intuitive feel for molecule speed and pressure impacts, with better layman-friendly labels, too.

[Check out the Artifact](https://claude.ai/public/artifacts/37311b6f-25bd-4093-b73b-c98f42e67873)

#### My take

The pattern is clear: Claude can usually match ChatGPT’s visuals, but it often needs a bit of prompting to get there, which requires the person to know what they’re after. ChatGPT’s visuals (when they eventually work) should pop up by default to supplement its text-based answers.

### **Test #4: Combustion engines**

We’re now moving out of ChatGPT’s pre-programmed “comfort zone.”

> **Prompt:** “*Show me how an internal combustion engine works.”*

#### ChatGPT

Oh man, this was a quadruple fail right out of the gate.

ChatGPT instantly defaulted to text, ignoring the “show” qualifier completely:

![ChatGPT text-only response to "Show me how an internal combustion engine works" providing a bulleted list of main engine parts including cylinder, piston, connecting rod, and crankshaft, with no visual diagram](https://substackcdn.com/image/fetch/$s_!l_DP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f0bcd59-d0aa-4c12-b0f8-c0005fc8f469_817x484.png)

When I nudged it using the “show me interactively” (which worked for Claude), ChatGPT created an image:

![“But I added the word ‘interactive’ right in the title! That counts, right?”](https://substackcdn.com/image/fetch/$s_!63BK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e8e0887-9af1-4cab-8a91-d4d50438ad08_823x502.png)

I then tried to be even more explicit by saying, “I want something I can actually manipulate and interact with.”

![ChatGPT response admitting it cannot embed live interactive HTML and suggesting external web-based engine simulators like Falstad as alternatives for a true interactive experience](https://substackcdn.com/image/fetch/$s_!WQlU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97843c25-bfa9-4af6-b6c3-ca6eb22003c6_837x426.png)

ChatGPT gave me a text buffet of options. Finally, I had to ask it for HTML outright:

![ChatGPT's bare-bones HTML 4-stroke engine simulation showing a gray rectangle piston inside a black-bordered cylinder, Start and Pause buttons, a speed slider, and a "Stroke: Compression" label, with no part labels or explanatory annotations](https://substackcdn.com/image/fetch/$s_!pJm6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3c574110-be7e-4beb-a505-2f87a854b16c_800x469.png)

The result was super basic and didn’t do much to explain the individual steps:

![ChatGPT's bare-bones HTML 4-stroke engine simulation showing a gray rectangle piston inside a black-bordered cylinder, Start and Pause buttons, a speed slider, and a "Stroke: Compression" label, with no part labels or explanatory annotations](https://substackcdn.com/image/fetch/$s_!Uuo9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fca784ce1-e905-4fca-a6e6-4eca903fe7cb_630x582.png)

No helpful labels of any kind. The piston escapes outside the cylinder. Manipulating speed doesn’t affect the way the engine works, so the decision to include it is questionable.

Finally, ChatGPT couldn’t create anything shareable, so I had to paste its HTML into a third-party site to be able to share it here:

[Check out ChatGPT's "explainer"](https://purple-floris-18.tiiny.site/)

#### Claude

For once, Claude nailed the task on the very first try:

![Claude interactive 4-stroke engine artifact with a labeled cross-section showing intake and exhaust valves, green-highlighted cylinder, piston, and crankshaft, four clickable stroke tabs, Stroke 1 Intake explanation with color-coded valve and piston status indicators, and a Next Stroke navigation button](https://substackcdn.com/image/fetch/$s_!BQ3H!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6d4a8faa-6f79-48a8-8b27-fdfc66b8910d_787x576.png)

It spit out a clean, visually pleasing four-step diagram that I could click through to understand the concept clearly.

Take a look for yourself:

[Check out the Artifact](https://claude.ai/public/artifacts/c68c7e9e-7c8d-467c-82ff-927961cbe199)

#### My take

Man, this wasn’t even close.

Not only did Claude intuitively know what I needed, but the result was significantly better with far less effort.

### **Test #5: Tectonic plates**

Let’s give ChatGPT a chance to redeem itself!

> **Prompt:** *Show me the major tectonic plates and their movements.*

#### ChatGPT

Oh no, here we go again:

![ChatGPT text-only response listing major tectonic plates with type, movement direction, and notable interactions as bullet points, showing Pacific Plate and North American Plate entries without any visual map](https://substackcdn.com/image/fetch/$s_!5o4a!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32bdfac6-c405-4d77-9f10-7fd19534b1c3_794x394.png)

ChatGPT has apparently never heard of “show, don’t tell.”

Let’s be more explicit again:

![ChatGPT's D3.js tectonic plate map showing unlabeled colorful rectangles arranged in a grid with small directional arrows and a legend for boundary types, bearing no resemblance to actual plate geography or continental shapes](https://substackcdn.com/image/fetch/$s_!gHAG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff8d4687f-812b-4138-996e-8572965613ee_816x503.png)

Behold, the “Tectonic Plate Map”:

There you have it, kids: Tectonic plates are unidentified colorful rectangles that are permanently stuck to each other!

Any questions, class?

#### Claude

Again, Claude did better right out the gate:

![Claude static tectonic plates diagram titled "Major tectonic plates and movement directions" showing seven labeled color-coded plates including Pacific, North American, Eurasian, African, South American, Indo-Australian, and Antarctic, with directional arrows and a legend for divergent, convergent, and transform boundaries](https://substackcdn.com/image/fetch/$s_!N10d!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53fe4575-6728-4b00-91d8-dcb813b3e20c_696x496.png)

But I wanted this to be more interactive, so I nudged:

![Claude interactive tectonic plates artifact showing labeled plates with movement arrows on a simplified world map, with the Eurasian Plate selected and an info modal displaying continental type, collision details with Indo-Australian Plate, speed of 2-3 cm per year, northeast direction, and area of 67.8 million square kilometers](https://substackcdn.com/image/fetch/$s_!jPsI!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6005694b-bd50-40aa-878e-2b450a33fe28_734x719.png)

It worked!

The visual isn’t winning any awards for aesthetics or geography, but it does actively aid my conceptual understanding and provides useful info about each plate in a clean modal box.

The list of major plates is complete and accurate, [according to Wikipedia](https://en.wikipedia.org/wiki/List_of_tectonic_plates).

[Check out the Artifact](https://claude.ai/public/artifacts/ed7bac9f-aa96-4ea5-af3f-a12f6cb3787c)

#### My take

Claude is consistently more visually engaging and genuinely helpful at showcasing concepts on the fly.

ChatGPT struggles to visualize anything outside of its library of approved templates. Even with repeated nudging, the outcome isn’t nearly as polished as Claude’s versions.

## **General observations**

Here are my concluding thoughts.

Note that they’re based exclusively on my limited tests with *free* versions of each tool.

I’d expect both paid model options (GPT 5.4 Thinking and Opus 4.6) to handle these tasks better.

However, since interactive explainers are marketed as being available to everyone, I think it’s only fair to mimic the experience of the average user.

### **ChatGPT (“The Curator”)**

![AI-generated illustration of "The Curator" metaphor: a robot in a glowing museum-like setting selecting from hexagonal tiles labeled with STEM concepts like Pythagorean Theorem, Mirror Equation, and Periodic Table, pulling a pre-built diagram from a preset library of 70-plus concepts](https://substackcdn.com/image/fetch/$s_!bPiE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe5755911-6ae7-48e6-bdf9-d67d9be24c0d_1376x768.png)

While it didn’t work for me, the idea behind human-approved visualizations popping up automatically for given topics is solid.

**The good**: For the pre-approved topics, ChatGPT should load the visuals almost instantly. They’ll be precise, predictable, and guaranteed to show accurate equations. Also, since they trigger automatically, the user doesn’t even have to know this option exists or learn how to invoke it.

**The not-so-good:** The visuals are rather basic and often feel dry and technical. When you move beyond the shortlist, ChatGPT truly struggles to create helpful, interactive elements on its own.

**Who this is for:** School and high school students who have specific STEM concepts fresh in their minds and need to anchor them with visuals.

### **Claude (“The Designer”)**

![AI-generated illustration of "The Designer" metaphor: a robot at a workshop drafting table actively building a detailed engine diagram from scratch with labeled parts including Intake, Spark Plug Ignition, and Crankshaft Rotation, tools and sketches scattered around, and a "Save as Artifact" button on screen](https://substackcdn.com/image/fetch/$s_!D8T5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc04b47c0-a731-4ae2-a001-1815de7f1102_1376x768.png)

Despite not having a curated library of concepts, Claude is strictly better at coding polished interactive elements from scratch, even on a free account.

**The good**: Claude’s explainers almost always look pretty, have more helpful labels, and—at least in my tests—are easier to grasp at a glance, especially for concepts that don’t come from ChatGPT’s STEM list.

**The not-so-good:** Since Claude’s explainers are always designed on the fly, they’re less predictable. You’re essentially rolling the dice whenever you ask for a new visual. Without a robust review, Claude’s outputs are subject to the usual AI hallucinations, which might defeat the purpose of helping a layman understand brand-new concepts. Finally, Claude often needs prodding to create an interactive element, so people who aren’t aware of this feature might not even get to experience it at all.

**Who this is for:** People who want to grasp almost any complex concept in a flexible, visual, and interactive way.

But take these for a spin yourself and let me know what you think.

Pick a concept you always struggled with and see if interactive explainers can help!

* * *

## Thanks for reading!

If you enjoyed this, here’s how you can help:

-   ❤️**Like** this post if it resonates with you.
    
-   🔄**Share** it to help others discover this newsletter.
    
-   🗣️**Comment** below—I love hearing your opinions.
    

**Why Try AI** is a passion project, and I’m grateful to those who help keep it going. If you’d like to support me and **[unlock cool perks](https://www.whytryai.com/p/paid-subscriber-bonuses)**, consider a paid subscription:
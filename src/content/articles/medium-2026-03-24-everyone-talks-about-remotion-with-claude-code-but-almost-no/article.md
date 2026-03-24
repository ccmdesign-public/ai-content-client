---
title: "Everyone talks about Remotion with Claude Code. But almost no one talks about using it with Codex."
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/everyone-talks-about-remotion-with-claude-code-but-almost-no-one-talks-about-using-it-with-codex-3c7b2cb48bb1?source=rss----98111c9905da---4"
publishedAt: "2026-03-24"
tags:
  - "ai-general"
  - "claude"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-24T23:01:48.911Z"
---

# Everyone talks about Remotion with Claude Code. But almost no one talks about using it with Codex.

### Everyone Talks About Remotion With Claude Code. But Almost No One Talks About Using It With Codex. Here’s How.

#### If you search around for “Remotion + AI coding,” most of the examples you will find are about Claude Code.

![](https://cdn-images-1.medium.com/max/1024/1*8Vh_YbwUOSH60EiiAhdocw.png)

But you can do the same thing in Codex too.

And once you set it up properly, it feels very clean:

\- you keep a Remotion project in one workspace
\- you give Codex a small \`remotion\` skill
\- you prompt with \`Use $remotion …\`
\- Codex creates or updates video compositions for you

That is the whole idea of this article.

This is not a theory post. I actually set this up locally, used it, created multiple compositions, added render scripts, and tested the flow. In this guide, I will show the simplest version of that setup so you can copy it and get going fast.

### **What you are building**

By the end of this tutorial, you will have:

1\. A working Remotion project

2\. A local Codex skill called \`remotion\`

3\. A clear project structure Codex can work with

4\. A repeatable prompting workflow for making videos

The goal is simple: stop re-explaining your video workflow every time you prompt.

You would be able to create something like this with nice animations (honestly, the only limit if your imagination)

![](https://cdn-images-1.medium.com/max/1024/1*2bu3Es4Ahi55a-Wo5NmF2Q.png)

#### **What you need first**

Before you start, make sure you have:

\- Codex installed and working

\- Node.js installed

-   \`npm\` working in your terminal

Quick check:

```
node -vnpm -v
```

If both commands print versions, you are good to go.

#### **Step 1: Create a Remotion project**

Go to the parent directory where you want the project to live, then scaffold the app by giving Remotion a folder name directly.

```
cd /path/where/you/want/the/projectnpm create video@latest remotion-codexcd remotion-codex
```

When Remotion asks questions, choose:

\- \`Blank\`

\- \`No\` for Tailwind if you want the lightest setup

\- If you see an extra prompt about built-in agent skills, you can skip it for this tutorial because we are creating our own Codex skill manually

Then install dependencies if the scaffold did not already do it:

```
npm install
```

Start the project once to make sure it works:

```
npm run dev
```

If Remotion Studio opens, your base project is ready.

#### **Step 2: Create a local Codex skill for Remotion**

Now we give Codex a reusable instruction set.

Create the skill folder:

```
mkdir -p ~/.codex/skills/remotion/references
```

Now create \`~/.codex/skills/remotion/SKILL.md\`, past this in the terminal:

```
cat <<'EOF' > ~/.codex/skills/remotion/SKILL.md - -name: remotiondescription: Build, revise, and render Remotion video projects from natural-language briefs. Use when Codex needs to create or update React-based video compositions, motion design templates, narrated slide videos, promo videos, render scripts, or prompt-driven video workflows in a Remotion workspace. - -# RemotionCreate or modify videos in an existing Remotion workspace. Prefer reusable compositions, shared prop types, and deterministic render commands over one-off edits.## Quick Start1. Inspect `package.json`, `src/Root.tsx`, and `src/` before changing the project.2. Identify whether the request is best served by:- updating an existing composition,- changing default props/example content,- adding a new template, or- adding a render or workflow command.3. Keep composition registration in `src/Root.tsx`.4. Keep prompt-facing prop types in a shared file such as `src/video-spec.ts`.5. Verify with `npm run lint` and at least one render or still-frame command when practical.## Workflow### Update an existing template- Prefer editing the template component and its example props together.- Keep animation logic inside the template file and content data in example/spec files.- Reduce prompt friction by using clear prop names such as `title`, `slides`, `theme`, `cta`, or `highlights`.### Add a new composition- Create a new file under `src/templates/`.- Add any shared prop types to the shared spec file instead of duplicating inline types.- Register the composition in `src/Root.tsx` with:- explicit `id`- `durationInFrames`- `fps`- `width` and `height`- `defaultProps`- Add a matching render script in `package.json` if the composition is expected to be used repeatedly.### Prepare for prompting- Favor a small number of reusable templates over many one-off comps.- Keep defaults editable in one place so prompts like "change the palette" or "rewrite the copy" map cleanly to data files.- When a user provides a brief, convert it into:- composition choice,- runtime,- visual direction,- text content,- scene or slide structure,- output command.### Render and verify- Use `npm run dev` for studio preview.- Use `npm run lint` after structural changes.- Prefer project-level scripts for repeatable renders.- If a full MP4 render is expensive, render a still frame first to catch layout regressions.## Project Conventions- Keep reusable compositions in `src/templates/`.- Keep shared prompt-facing types in `src/video-spec.ts` or an equivalent single source of truth.- Keep example/default content in a separate data file such as `src/video-spec-examples.ts`.- Use bold, intentional visual systems. Avoid generic layouts unless the existing project already requires them.- Preserve existing design patterns when working in a pre-existing branded project.## ReferenceRead [references/workflow.md](references/workflow.md) when you need the prompt-to-project mapping, file ownership guidance, or example user requests.EOF
```

Now create the reference file:

```
cat <<'EOF' > ~/.codex/skills/remotion/references/workflow.md# Remotion Workflow Reference## Prompt To Project MappingTranslate a natural-language request into these decisions:1. Template choice2. Duration and frame rate3. Aspect ratio and resolution4. Text/content structure5. Visual system6. Render target## Preferred File Roles- `src/Root.tsx`: composition registry- `src/templates/*.tsx`: composition implementation- `src/video-spec.ts`: shared prop contracts- `src/video-spec-examples.ts`: default promptable examples- `package.json`: stable render commands## Example Requests- "Create a founder story video with 4 narrative beats."- "Turn this blog post into a narrated slide deck."- "Add a portrait 9:16 social cut of the promo."- "Make the animation calmer and the typography more editorial."- "Render a still frame so I can review the art direction first."EOF
```

That is enough to make \`remotion\` a reusable skill in Codex.

#### **Step 3: Give the Remotion project a structure Codex can understand**

This part matters more than people think.

If your project is just one random composition file, Codex can still edit it, but the workflow becomes messy very quickly.

A much better structure is this:

> src/

> Root.tsx

> index.ts

> templates/

> video-spec.ts

> video-spec-examples.ts

**Why this works:**

\- \`src/templates/\` keeps compositions reusable
\- \`src/video-spec.ts\` gives you one place for prompt-friendly props
\- \`src/video-spec-examples.ts\` gives Codex one place to change copy, colors, and defaults
\- \`src/Root.tsx\` stays the source of truth for registered compositions

You can ask Codex to create this structure for you.

#### **Use a prompt like this inside the Remotion project:**

> Use $remotion to turn this starter into a prompt-friendly Remotion workspace.

> Create src/templates, src/video-spec.ts, and src/video-spec-examples.ts.

> Register a sample composition in src/Root.tsx and add a repeatable render script in package.json.

That one prompt usually gets you to a much better starting point than the default blank project.

#### **Step 4: Start prompting Codex with the skill**

Once the skill exists, the prompts become much simpler.

Here are some good examples:

> Use $remotion to create a 20-second product promo video for a new keyboard.

> Use $remotion to create a portrait animated reel explaining the benefits of meditation.

> Use $remotion to add a new composition for a cinematic launch trailer and wire a render script into package.json.

> Use $remotion to update the current composition so it feels more premium and production-grade.

The important thing is the \`Use $remotion …\` part.

That tells Codex to load the skill and follow the rules you defined for Remotion work.

#### **Step 5: Render your video**

After Codex creates or updates a composition, verify it the normal Remotion way.

Start with:

```
npm run lint
```

Then preview:

```
npm run dev
```

Then render:

```
npx remotion render
```

Or, if Codex added specific scripts to \`package.json\`, use those instead:

```
npm run render:promo
```

```
npm run render:meditation
```

**A few things I learned while setting this up**

Here are the practical things that actually matter:

**1\. The skill is what makes Codex feel consistent**

Without the skill, every prompt starts from scratch.

With the skill, Codex knows:

\- where to put compositions

\- how to structure props

\- where to register compositions

\- how to think about rendering and verification

That is the real benefit.

**2\. The project structure matters almost as much as the skill**

If your files are clean, Codex gets much better at making useful updates without breaking things.

**3\. Ask for reusable templates, not one-off hacks**

This is a much better prompt:

> Use $remotion to create a reusable portrait reel template for educational videos.

Than this:

> Make one random meditation video.

The first prompt gives you an asset you can keep using.

**4\. The first render may download a browser dependency**

In my setup, the first real render triggered Remotion to download Chrome Headless Shell.

That is normal.

So if your first render takes longer than expected, that may be why.

#### **Why I like this in Codex**

The main reason is simple: it feels like a cleaner coding workflow.

You keep Remotion as code.

You keep your rendering scripts in the project.

You keep your reusable rules in the skill.

And you keep your creative direction in prompts.

That combination is very strong.

#### **Final thoughts**

A lot of people are showing Remotion with Claude Code right now.

That is fine.

But if you use Codex, you do not need to wait around for someone else to explain the workflow.

You can already do it today:

1\. Create a Remotion project

2\. Add a local \`remotion\` skill in Codex

3\. Give the project a clean structure

4\. Prompt with \`Use $remotion …\`

5\. Render and iterate

That is it.

Simple setup. Very usable workflow.

And once it is in place, making videos with prompts becomes much easier.

* * *

[Everyone talks about Remotion with Claude Code. But almost no one talks about using it with Codex.](https://pub.towardsai.net/everyone-talks-about-remotion-with-claude-code-but-almost-no-one-talks-about-using-it-with-codex-3c7b2cb48bb1) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.
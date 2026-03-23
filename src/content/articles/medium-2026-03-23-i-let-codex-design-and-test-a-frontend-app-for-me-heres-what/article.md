---
title: "I Let Codex Design and Test a Frontend App for Me. Here’s What Actually Happened"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/i-let-codex-design-and-test-a-frontend-app-for-me-heres-what-actually-happened-a192b514f27e?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-23"
tags:
  - "ai-general"
  - "chatgpt"
  - "engineering"
  - "machine-learning"
  - "web-development"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-23T18:01:23.259Z"
---

# I Let Codex Design and Test a Frontend App for Me. Here’s What Actually Happened

![Image by author](https://cdn-images-1.medium.com/max/1024/1*9hcnfBD7cR1HQ_Fwkn7vww.png)

A little while ago, I wrote about finally trying Codex 5.4 because I kept hearing that it could control the computer, and honestly, I was too curious to ignore that. That earlier article was really about the moment of curiosity itself. I had been trying Codex more seriously, I was enjoying it a lot, and I wanted to see whether the hype around 5.4 was real or just another “this changes everything” moment that sounds more dramatic in demos than it feels in actual work. If you haven’t read that one yet, here it is: [I Heard Codex 5.4 Could Control the Computer, So I Had to Try It](https://medium.com/write-a-catalyst/i-heard-codex-5-4-could-control-the-computer-so-i-had-to-try-it-20308a623145). This article is the follow-up I actually wanted to write after that one. Not another general take on the model, but a more practical question: what happens if I specifically try the two things that stood out most to me in [OpenAI’s own video](https://www.youtube.com/watch?v=YICiHiU2GBU), **namely persistent computer-use capabilities and image generation for frontend design?**

That combination immediately caught my attention because it maps surprisingly well to how frontend work actually feels in real life. Frontend development is rarely just “write a component and move on.” It is usually a loop of building something, opening it in the browser, noticing that the spacing feels weird, realizing the mobile version is worse, changing the layout, refreshing again, then arguing with yourself about whether the page looks polished or just expensive-looking. On top of that, a lot of the hardest parts are not even coding problems. Sometimes the issue is that you do not know what the page should feel like yet. You want a nicer hero section, but “nicer” is not a real technical requirement. You want the design to feel premium, but premium can mean ten different things depending on the product. That is why this particular Codex workflow felt worth testing. If one part of the system can help generate visual direction and another part can help inspect and interact with the actual rendered result, then suddenly the loop starts to look a lot more like real product work and a lot less like glorified autocomplete.

So instead of writing another abstract article, I decided the best way to explain this was through a concrete project that I would actually be comfortable putting on GitHub. That way the article could stay grounded in something tangible. Rather than saying, “Here are some cool features,” I could say, “Here is the exact kind of app I would build, here is how I would structure the repo, here is where computer use helps, here is where image generation helps, and here is what I would still verify myself.” That felt more honest and also more useful.

### The Project I’d Build for This Experiment

The demo project I would use is a small frontend app called **PromptBoard**. The idea is simple: PromptBoard is a fictional product for developers who save, organize, and test prompts for coding agents. I like this kind of fake product for demos because it feels close enough to a real developer tool that the UI decisions make sense, but it is also flexible enough to show both marketing-style design work and interactive app behavior. In other words, it gives me exactly what I need to test these two concepts properly. On one side, I get a landing page where design, hierarchy, and visual mood matter. On the other side, I get a small dashboard flow where the browser interaction loop matters, because there are things to click, filter, search, and verify.

The landing page would include a hero section, a feature grid, a testimonial strip, pricing cards, and a final call-to-action section. The dashboard side would include a prompt library, tag filters, a search box, a create-prompt form, a detail view, and responsive behavior for smaller screens. That is enough to make the project feel like a real app without turning it into a giant side quest that nobody reading the article will ever rebuild. It is also the kind of repo that looks good on GitHub because it tells a very clear story: this is a focused demo built to test a modern agent workflow for frontend development.

**GitHub Repo :** [https://github.com/sanjaynela/promptBoard](https://github.com/sanjaynela/promptBoard)

### What These Two Concepts Actually Mean

Before getting into the code, I think it helps to explain these two ideas in a way that feels normal and not like marketing language. When I say **computer use** in this article, I am not trying to make it sound magical. I am talking about the ability for the model to work through more of the real UI loop instead of staying trapped at the source-code layer. In practical terms, that means the workflow is no longer just “read files and generate code.” It becomes closer to “run the app, open the page, inspect what is on screen, interact with it, notice what is off, and then go back and make a targeted fix.” For frontend work, that matters a lot because many of the problems we care about are not obvious from reading JSX alone. A component can look perfectly fine in code and still render awkwardly on mobile, misalign in a real browser, or feel visually weak once the full page is visible.

The **image generation** part is different, but just as useful. I do not see it as “AI making random pretty pictures.” I see it as a way to shorten that annoying period where you know the page needs a better visual direction but you do not yet know exactly what that direction should be. A lot of frontend work gets stuck there. The logic is fine. The structure is fine. The page works. But it still feels flat or generic. Image generation helps at that earlier stage where you are trying to figure out the mood, composition, contrast, illustration style, or overall design language. Sometimes the output becomes a direct asset you can use in the page. Other times it is more like a reference image that helps the coding agent understand what “premium dark developer tool” is supposed to look like in practice. Either way, it gives the workflow something visual to react to instead of relying only on vague adjectives.

That is really why these two ideas belong together. One helps decide what the frontend should look like. The other helps verify whether the frontend actually ended up looking and behaving the way you intended.

### The Stack I’d Use

For this kind of demo, I would keep the stack extremely familiar on purpose. I do not want readers to get distracted by infrastructure or wonder whether the magic only works because of some exotic setup. I would use **Next.js**, **TypeScript**, **Tailwind CSS**, a few **shadcn/ui** components, **Lucide** icons, and **Playwright** for browser tests. That stack is boring in the best possible way. It is easy to understand, easy to run locally, and very believable as a GitHub project someone might actually clone.

The folder structure would look something like this:

```
promptboard/├── app/│   ├── page.tsx│   ├── dashboard/page.tsx│   ├── globals.css│   └── layout.tsx├── components/│   ├── landing/│   │   ├── hero.tsx│   │   ├── feature-grid.tsx│   │   ├── testimonial-strip.tsx│   │   └── pricing.tsx│   ├── dashboard/│   │   ├── sidebar.tsx│   │   ├── prompt-card.tsx│   │   ├── create-prompt-form.tsx│   │   └── prompt-detail-modal.tsx│   └── ui/├── data/│   └── prompts.ts├── public/│   ├── generated/│   │   ├── hero-concept-1.png│   │   ├── hero-concept-2.png│   │   └── dashboard-mood.png├── tests/│   └── promptboard.spec.ts├── AGENTS.md├── README.md└── package.json
```

The public/generated folder is an important detail because it gives the project a very visible way to show where image generation fits into the workflow. I like the idea that the repo itself documents the process. A reader can see that some images were generated as visual direction, then see those assets referenced in the UI, and then see how the rest of the code evolved around them.

### Building the First Version of the Landing Page

I would start with a clean but simple homepage, not because I expect the first version to be amazing, but because I want something real enough for the workflow to improve. That part matters. If the first pass is already overdesigned, the article becomes less believable. A better story is to start with a solid baseline and then show how the combination of image generation and browser-aware iteration helps push it further.

Here is a straightforward app/page.tsx:

```
import { Hero } from "@/components/landing/hero";import { FeatureGrid } from "@/components/landing/feature-grid";import { TestimonialStrip } from "@/components/landing/testimonial-strip";import { Pricing } from "@/components/landing/pricing";export default function HomePage() {  return (    <main className="min-h-screen bg-slate-950 text-white">      <Hero />      <FeatureGrid />      <TestimonialStrip />      <Pricing />      <section className="border-t border-white/10 px-6 py-16">        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">            Build better prompts with a workflow you can actually trust.          </h2>          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">            Organize agent prompts, test them faster, and keep your team's best workflows reusable.          </p>          <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">            Start Free Trial          </button>        </div>      </section>    </main>  );}
```

And here is a first-pass hero component:

```
import Image from "next/image";import Link from "next/link";export function Hero() {  return (    <section className="relative overflow-hidden px-6 pb-20 pt-24">      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),_transparent_40%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.22),_transparent_25%)]" />      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">        <div>          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 backdrop-blur">            For developers who work with coding agents every day          </div>          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">            Your prompt library should feel as polished as your codebase.          </h1>          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">            PromptBoard helps you save, organize, version, and test prompts for tools like Codex,            ChatGPT, and Claude without losing the workflows that actually work.          </p>          <div className="mt-8 flex flex-wrap gap-4">            <Link              href="/dashboard"              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"            >              Open Dashboard            </Link>            <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white">              Watch Demo            </button>          </div>        </div>        <div className="relative">          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">            <Image              src="/generated/hero-concept-1.png"              alt="PromptBoard hero concept"              width={1200}              height={900}              className="rounded-[1.5rem] object-cover"            />          </div>        </div>      </div>    </section>  );}
```

This is already a decent start, but more importantly, it gives me something that can actually be improved. That is the point. I do not want the article to pretend the first version is perfect. I want it to show the loop.

### Where Image Generation Enters the Workflow

This is the part I find easiest to relate to because it solves a very human problem. Sometimes when I am building a frontend, I do not have a code problem yet. I have a taste problem. I know the page needs a better visual identity, but I do not want to spend an hour trying to invent one from scratch while pretending I am suddenly an art director. That is where I would use image generation first, not as decoration, but as visual guidance.

Instead of saying something vague like “make it premium,” I would ask for a few concrete visual concepts for a dark-mode SaaS product aimed at developers. I would want the image outputs to explore layout mood, lighting, card depth, dashboard atmosphere, and overall style. Something like this:

```
Generate 3 visual directions for a SaaS landing page hero image for a product called PromptBoard.The product helps developers organize and test prompts for coding agents.Style requirements:- Modern- Premium- Dark mode friendly- Subtle glassmorphism- Feels like a real B2B developer tool- Not cartoonish- Clean composition- Slight neon accents- Suitable for a React / Next.js landing pageReturn concepts that could work as:1. Hero illustration2. Product mood board3. Dashboard atmosphere reference
```

I like this because it is practical. It does not assume the generated output is the final answer. It just gives the workflow something visual to react to. Maybe one image becomes a direct hero asset. Maybe another becomes a reference for how much glow, depth, and contrast the page should use. Either way, I now have a better design conversation than simply typing “make it look better.” For me, that is already a meaningful improvement.

### Building the Dashboard So Computer Use Has Something Real to Inspect

Next, I would add a small dashboard page because that is where the computer-use side becomes more interesting. A static landing page is useful, but interactive UI gives the browser loop something to do. I want filters, search, cards, forms, and mobile layout behavior because those are the things that often look fine in code but feel off when you actually open the page.

Here is the seed data for the prompt library:

```
export type PromptItem = {  id: string;  title: string;  category: "review" | "refactor" | "frontend" | "release";  tags: string[];  description: string;};export const prompts: PromptItem[] = [  {    id: "1",    title: "Review React PR for visual regressions",    category: "review",    tags: ["react", "ui", "qa"],    description:      "Inspect component changes for layout regressions, broken states, and accessibility issues."  },  {    id: "2",    title: "Rewrite landing page hero for sharper CTA",    category: "frontend",    tags: ["copy", "marketing", "hero"],    description:      "Improve headline clarity, supporting text, and CTA hierarchy without sounding generic."  },  {    id: "3",    title: "Convert utility-heavy JSX into reusable components",    category: "refactor",    tags: ["tailwind", "cleanup", "components"],    description:      "Refactor repetitive UI blocks into maintainable components while preserving existing behavior."  }];
```

And here is a clean first version of the dashboard page:

```
"use client";import { useMemo, useState } from "react";import { prompts } from "@/data/prompts";import { PromptCard } from "@/components/dashboard/prompt-card";import { CreatePromptForm } from "@/components/dashboard/create-prompt-form";export default function DashboardPage() {  const [selectedTag, setSelectedTag] = useState<string>("all");  const [search, setSearch] = useState("");  const tags = useMemo(() => {    const allTags = prompts.flatMap((item) => item.tags);    return ["all", ...Array.from(new Set(allTags))];  }, []);  const filtered = useMemo(() => {    return prompts.filter((item) => {      const matchesTag = selectedTag === "all" || item.tags.includes(selectedTag);      const matchesSearch =        item.title.toLowerCase().includes(search.toLowerCase()) ||        item.description.toLowerCase().includes(search.toLowerCase());      return matchesTag && matchesSearch;    });  }, [selectedTag, search]);  return (    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">      <div className="mx-auto max-w-6xl space-y-8">        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">          <div>            <h1 className="text-3xl font-semibold tracking-tight">Prompt Library</h1>            <p className="mt-2 text-slate-400">              Save your best agent workflows so you stop rewriting the same ideas every week.            </p>          </div>          <input            value={search}            onChange={(e) => setSearch(e.target.value)}            placeholder="Search prompts"            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:max-w-xs"          />        </div>        <div className="flex flex-wrap gap-3">          {tags.map((tag) => (            <button              key={tag}              onClick={() => setSelectedTag(tag)}              className={`rounded-full px-4 py-2 text-sm font-medium transition ${                selectedTag === tag                  ? "bg-white text-slate-950"                  : "border border-white/10 bg-white/5 text-slate-300"              }`}            >              {tag}            </button>          ))}        </div>        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">          <section className="grid gap-4 md:grid-cols-2">            {filtered.map((item) => (              <PromptCard key={item.id} item={item} />            ))}          </section>          <aside>            <CreatePromptForm />          </aside>        </div>      </div>    </main>  );}
```

This page already has enough going on to make the computer-use side valuable. You can open it, click the filters, type into the search bar, resize the viewport, and quickly start noticing whether the experience feels polished or just acceptable.

### The Repo Instructions Matter Too

One thing I would absolutely include in a demo like this is an AGENTS.md file. If the whole point of the repo is to test an agent workflow, then the repo should help guide that workflow. I do not want the model randomly redesigning things every time I ask for a fix. I want the repository itself to explain the visual and behavioral rules.

```
# AGENTS.md## Project overviewThis repository is a demo project used to test Codex workflows for:- Persistent computer-use style browser iteration- Image-guided frontend design improvementsThe stack is Next.js + TypeScript + Tailwind.## Working rules- Preserve the existing visual style unless the task explicitly asks for a redesign.- Prefer small, reviewable UI changes over broad rewrites.- After changing frontend code, run the app and verify the affected flow.- Check both desktop and mobile layouts when editing page structure.- Do not add a new dependency unless it clearly improves the demo.- Prefer accessible controls and visible focus states.- Keep the UI premium, clean, and realistic. Avoid cartoonish styling.## Done definitionA task is complete only when:1. The UI change is implemented.2. The page renders without obvious layout regressions.3. Interactive behavior is verified.4. The final result matches the requested visual direction.
```

I like this because it makes the project feel intentional. It also reflects something I keep learning with AI coding tools in general: the better your environment communicates your preferences, the less time you spend cleaning up weird “helpful” decisions later.

### Where Computer Use Starts Feeling Useful

This is where the workflow becomes interesting to me. Imagine the first pass of the dashboard looks okay in code, but once the app is open in the browser, a few things feel off. Maybe the search box is cramped on smaller screens. Maybe the selected filter chip is technically visible but visually weak. Maybe the spacing between the header and controls makes the whole page feel tighter than it should. These are the kinds of problems that frontend developers notice in seconds once the browser is open, but they are surprisingly annoying to describe from memory if the model cannot see the result.

That is why I would give Codex a task more like this:

```
Run the PromptBoard app and inspect the /dashboard page in the browser.Look for:- Mobile layout issues- Weak visual hierarchy- Any controls that feel cramped or hard to use- Areas where spacing, contrast, or alignment feel offThen make targeted fixes.Do not redesign the whole page.Keep the dark premium aesthetic.After changes, verify the page again in the browser.
```

To me, that is a much more natural frontend instruction than “rewrite the dashboard component.” It reflects what I actually care about. I do not want random code motion. I want the rendered result to feel better. That is a subtle difference, but it is a really important one.

A targeted improvement might look like this:

```
<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">  <div className="max-w-2xl">    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">      Prompt Library    </h1>    <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">      Save your best agent workflows so you stop rewriting the same ideas every week.    </p>  </div><input    value={search}    onChange={(e) => setSearch(e.target.value)}    placeholder="Search prompts"    className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3.5 text-sm text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)] outline-none placeholder:text-slate-500 md:max-w-xs"  /></div>
```

That is not a dramatic redesign, and that is exactly why I like it. It is believable. It is the kind of adjustment that actually improves a page without turning the entire repo into a moving target.

### Why I’d Still Add Playwright

Even if I am testing a browser-aware workflow, I still want regular browser tests in the repo. I do not think those ideas compete with each other. In fact, I think they make each other better. The browser-aware workflow is great for iteration and quick visual judgment, but Playwright gives the repo a stable, repeatable way to verify important behavior.

Here is a simple test file I would include:

```
import { test, expect } from "@playwright/test";test.describe("PromptBoard", () => {  test("landing page renders hero and CTA", async ({ page }) => {    await page.goto("http://localhost:3000");    await expect(      page.getByRole("heading", {        name: /your prompt library should feel as polished as your codebase/i      })    ).toBeVisible();    await expect(      page.getByRole("button", { name: /start free trial/i })    ).toBeVisible();  });  test("dashboard filter and search experience works", async ({ page }) => {    await page.goto("http://localhost:3000/dashboard");    await page.getByRole("button", { name: "ui" }).click();    await page.getByPlaceholder("Search prompts").fill("React");    await expect(      page.getByText(/review react pr for visual regressions/i)    ).toBeVisible();  });  test("mobile dashboard keeps search visible", async ({ browser }) => {    const context = await browser.newContext({      viewport: { width: 390, height: 844 }    });    const page = await context.newPage();    await page.goto("http://localhost:3000/dashboard");    await expect(page.getByPlaceholder("Search prompts")).toBeVisible();  });});
```

This makes the repo easier to trust. A reader can see that the workflow is not just “the AI looked at the page and seemed happy.” There is still a real test harness, which I think matters a lot if the project is going on GitHub and not just living inside a demo video.

### Using Image Generation Again for the Second Pass

After the first version of the app is working, I would go back to image generation one more time, but now with more focus. Instead of asking for broad concept art, I would ask for a hero visual or dashboard atmosphere image that specifically matches the product style I have already started building. Something like this:

```
Generate a premium dark-mode SaaS illustration for a developer productivity product.Requirements:- Wide aspect ratio for website hero section- Floating UI cards- Prompt snippets, tags, and workflow nodes- Deep navy and graphite background- Emerald and violet accent lighting- Realistic product-marketing look- Minimal, not cartoonish- Should feel believable for a GitHub portfolio project
```

I like this because it is much more specific than just asking for a cool image. It gives the output a job to do. The generated asset can either be dropped directly into the hero or used as a design reference while the rest of the layout gets refined. That is a very practical way to use image generation in frontend work, and honestly, it feels much more relevant to me than the broader “AI art” conversation.

Here is what a refined hero component might look like after that second pass:

```
import Image from "next/image";import Link from "next/link";export function Hero() {  return (    <section className="relative overflow-hidden border-b border-white/10 px-6 pb-24 pt-24">      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(129,140,248,0.18),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">        <div>          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-300 backdrop-blur-xl">            Organize. Test. Reuse.          </div>          <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">            Build agent workflows that survive longer than one good day.          </h1>          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">            PromptBoard gives developers a clean place to save proven prompts, review iterations,            and turn scattered experiments into a repeatable system.          </p>          <div className="mt-8 flex flex-wrap gap-4">            <Link              href="/dashboard"              className="rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(110,231,183,0.22)] transition hover:translate-y-[-1px]"            >              Explore Dashboard            </Link>            <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl">              See Workflow            </button>          </div>        </div>        <div className="relative">          <div className="absolute -inset-6 rounded-[2rem] bg-emerald-400/10 blur-3xl" />          <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl">            <Image              src="/generated/hero-concept-2.png"              alt="PromptBoard UI concept"              width={1400}              height={980}              className="rounded-[1.5rem] object-cover"              priority            />          </div>        </div>      </div>    </section>  );}
```

To me, this is where the workflow starts to feel genuinely useful. There is a back-and-forth between visual direction and actual implementation. The generated image informs the design language, then the browser loop helps verify whether the real page actually lives up to that direction.

### What I Think Is Actually Interesting About This

The thing I like most about this experiment is that it makes frontend AI workflows feel a little more honest. I do not mean “honest” in some philosophical sense. I mean honest in the sense that it acknowledges what frontend work really is. It is not just code generation. It is visual judgment, browser feedback, iteration, tiny design decisions, and the constant gap between what sounded good in a prompt and what actually looks right on the screen.

That is why this combination of computer use and image generation feels worth talking about. The image-generation part helps when the page needs direction. The computer-use part helps when the page needs verification. One helps before or during implementation, and the other helps after the code exists and has to prove itself in the browser. Put together, they create a loop that feels much closer to real product building.

At the same time, I would not pretend this removes the need for judgment. I still would not blindly trust visual taste just because an image looks polished. I still would not assume a browser interaction equals product understanding. I still want explicit prompts, repo guidance, and real tests. But I do think this workflow reduces friction in some very annoying parts of frontend development, and that alone makes it worth exploring.

### How I’d Package This on GitHub

If I were publishing this project along with the article, I would keep the repo organized in a way that helps readers reproduce the same experiment. I would include a clean README, screenshots of the landing page and dashboard, the generated visual assets inside public/generated, a small docs/prompts.md file that shows the exact prompts used for both image generation and computer-use tasks, and maybe even a before-redesign branch so readers can compare the rough first pass with the improved version. That kind of repo tells a complete story. It does not just show code. It shows process.

A simple README.md could look like this:

```
# PromptBoardPromptBoard is a demo project built to explore two GPT-5.4 / Codex-style frontend workflows:1. Persistent computer-use style UI iteration2. Image-guided frontend design## What this repo demonstrates- A modern landing page built in Next.js- A small interactive dashboard flow- Generated visual assets used in the UI design process- Browser-based verification with Playwright- A repo-level AGENTS.md file to guide agent behavior## Stack- Next.js- TypeScript- Tailwind CSS- Playwright## Local setup~~~bashnpm installnpm run dev
```

### Run tests

```
npx playwright test
```

### Why this project exists

This repo is meant to show how modern coding agents can go beyond code generation and participate in a fuller frontend loop: visual direction, implementation, browser inspection, and iteration.

### Conclusion

What I like about this Codex workflow is not that it feels futuristic. It is that it feels closer to the real messiness of frontend work. A lot of the job is not writing syntax. It is deciding what a page should look like, getting it into the browser, noticing what feels off, and then iterating until it feels right. That is why this experiment interested me in the first place. Image generation helps with visual direction when I do not want to stare at a blank hero section pretending I already know the perfect aesthetic. Computer use helps with the part where the browser becomes the truth and the UI has to prove that it actually works and looks good.

So for me, this is the more interesting follow-up to my earlier Codex 5.4 article. That first piece was about curiosity. This one is about workflow. It is about taking two ideas from OpenAI’s own video and asking a much more practical question: if I built a real demo project around them, would the result feel useful or just impressive in theory? After thinking through this PromptBoard example, I think the answer is that it could be genuinely useful, especially for frontend work where visual feedback and browser behavior matter as much as the code itself.

The repo for the full code for this project is in the following link: [https://github.com/sanjaynela/promptBoard](https://github.com/sanjaynela/promptBoard)

If this article helped you think differently about AI-assisted frontend workflows, clap for it so more developers can find it, follow me for more articles like this, and leave a comment if you want me to turn this into a full GitHub walkthrough with screenshots, prompts, and the finished repo structure.

* * *

[I Let Codex Design and Test a Frontend App for Me. Here’s What Actually Happened](https://levelup.gitconnected.com/i-let-codex-design-and-test-a-frontend-app-for-me-heres-what-actually-happened-a192b514f27e) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.
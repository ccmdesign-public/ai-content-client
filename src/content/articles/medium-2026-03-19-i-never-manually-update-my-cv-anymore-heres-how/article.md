---
title: "I Never Manually Update My CV Anymore! Here’s How!"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/i-never-manually-update-my-cv-anymore-heres-how-eaa97d713944?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-19"
tags:
  - "automation"
  - "engineering"
  - "web-development"
categories:
  - "Programming"
  - "Tools & Productivity"
  - "Web Development"
tagsNormalizedAt: "2026-03-21T16:30:41.276Z"
---

# I Never Manually Update My CV Anymore! Here’s How!

![](https://cdn-images-1.medium.com/max/1024/1*UXc7SS_ebcrXtGJrI62RcQ.png)

I was tired of manually updating my CV every time I changed a bullet point, then re-exporting it to PDF, then translating it to French, then updating my portfolio website. Every time I made a small change it was like 30 minutes of repetitive work. So I decided to automate the entire thing using GitHub Actions and GitHub Copilot models. And the best part? It costs absolutely nothing!!

In this post, I’ll walk you through how I set up a pipeline that:

1.  Takes my English LaTeX CV and auto-translates it to French using AI
2.  Compiles both versions to PDF
3.  Copies the latest PDFs to my portfolio for direct download
4.  Fetches my latest Medium articles and updates my portfolio
5.  Deploys everything to Cloudflare Pages automatically

All of this runs on every push. Zero manual intervention after the initial setup.

### The Problem

As an ML engineer looking for opportunities, I maintain my CV in LaTeX because it gives me full control over formatting. But I also need a French version since I’m based in Montreal. And I have a portfolio website that lists my work and writing.

Every time I update the CV, here’s what I used to do manually:

1.  Edit the .tex file
2.  Compile to PDF
3.  Translate everything to French (copy paste into a translator, fix technical terms, recompile)
4.  Upload both PDFs somewhere
5.  Update the portfolio download links
6.  Check if I published new articles and add them to the portfolio

This was painful. Especially the translation part, because French text is naturally longer than English and you have to make sure the CV still fits on 2 pages!! So I thought, why not let GitHub do all of this for me?

### The Setup

My repo is a monorepo structured like this:

```
CAREER/├── .github/workflows/│   ├── generate-cv.yml│   └── update-portfolio.yml├── cv/│   ├── resume/│   │   ├── v11/│   │   │   └── en_cv_nadir_trapsida.tex   ← I only write this│   │   └── v12/│   │       └── en_cv_nadir_trapsida.tex│   └── scripts/│       └── translate_cv.py└── portfolio/    ├── index.html    ├── assets/        ← PDFs land here automatically    └── scripts/        └── sync_medium.py
```

The idea is simple: I only ever edit the English .tex file. Everything else is generated.

### Pipeline 1: CV Generation

The first workflow triggers whenever I push a .tex file under cv/resume/. Here is what it does:

```
on:  push:    paths:      - 'cv/resume/**/*.tex'
```

It installs LaTeX on the runner, then for each version folder:

1.  Checks if both PDFs already exist (if yes, skip)
2.  If no French .tex exists, translates the English one using GitHub Models
3.  Compiles both to PDF with pdflatex
4.  Commits everything back to the repo

The translation is the interesting part. GitHub gives you free access to AI models through the GITHUB\_TOKEN that's already available in every Actions run. No API key needed, no billing, nothing!!

Here’s the core of the translation script:

```
GITHUB_MODELS_URL = "https://models.inference.ai.azure.com/chat/completions"MODEL = "gpt-4o"
```

```
payload = json.dumps({    "model": MODEL,    "messages": [        {"role": "system", "content": SYSTEM_PROMPT},        {"role": "user", "content": en_tex},    ],    "temperature": 0.1,    "max_tokens": 8000,})
```

```
headers = {    "Content-Type": "application/json",    "Authorization": f"Bearer {token}",  # GITHUB_TOKEN}
```

The system prompt is very specific. I tell the model to translate all text but keep LaTeX commands, technical terms, company names, and URLs untouched. And most importantly, I tell it to keep the output concise because French is naturally longer than English and I need the CV to fit on exactly 2 pages!!

```
SYSTEM_PROMPT = """You are a professional CV/resume translator.Translate the following LaTeX CV from English to French.CRITICAL CONSTRAINT: The English CV fits on exactly 2 pages.French text is naturally longer. You MUST keep the Frenchversion to 2 pages maximum by:- Using concise French phrasing- Preferring shorter synonyms- Keeping bullet points the same length or shorter- Never expanding abbreviations..."""
```

This works surprisingly well. The French version comes out clean and professional, and fits on 2 pages without any manual tweaking.

### Pipeline 2: Portfolio Update

The second workflow runs on three triggers:

1.  Quarterly (Jan, Apr, Jul, Oct) to catch new Medium articles
2.  When the CV generation workflow completes
3.  Manually via workflow\_dispatch

It does two things:

**Sync Medium articles** by fetching my RSS feed:

```
url = f"https://medium.com/feed/@{username}"
```

The script parses the RSS, extracts titles and links, detects the publication venue from the URL, and replaces the articles section in index.html between marker comments:

```
<!-- BEGIN_ARTICLES -->... auto-generated article links ...<!-- END_ARTICLES -->
```

**Copy latest CV PDFs** into portfolio/assets/ with a versioned filename:

```
VERSION=$(basename "$LATEST_DIR")  # e.g., v12cp "$src" "portfolio/assets/en_cv_nadir_trapsida_${VERSION}.pdf"# Update download links in HTMLsed -i "s|assets/en_cv_nadir_trapsida[^\"]*\.pdf|assets/en_cv_nadir_trapsida_${VERSION}.pdf|g" \  portfolio/index.html
```

This way the old version gets cleaned up and the links always point to the latest CV. Visitors see “CV (EN)” and “CV (FR)” download buttons in the nav and get the right version.

### Deployment: Cloudflare Pages

The portfolio is deployed on Cloudflare Pages, connected directly to the repo. The config is simple:

-   **Build output directory:** portfolio/
-   **Branch:** main

Every time a commit touches the portfolio/ folder (whether from me or from the GitHub Actions bot), Cloudflare picks it up and redeploys. No build step needed since it's just static HTML!!

The portfolio itself is a single index.html file with client-side EN/FR translation. I store all French translations in a JavaScript object and toggle them with a button in the nav. It reads the browser language on first visit, so French users see French by default.

### The Full Flow

Here’s what happens when I update my CV:

1.  I edit cv/resume/v12/en\_cv\_nadir\_trapsida.tex
2.  git push
3.  generate-cv.yml triggers, translates to French, compiles both PDFs, commits
4.  That commit triggers update-portfolio.yml
5.  It copies versioned PDFs to portfolio/assets/, updates download links, syncs Medium articles
6.  That commit touches portfolio/, Cloudflare Pages redeploys

From push to live: about 3 minutes. Completely hands-free.

![Workflow diagram](https://cdn-images-1.medium.com/max/1024/1*6sJrS2eTDfm8AlZPZkgBSQ.png)

### Cost

Everything here is free:

-   **GitHub Actions:** Free for public repos (2,000 min/month for private)
-   **GitHub Models:** Free with Copilot, uses your existing GITHUB\_TOKEN
-   **Cloudflare Pages:** Free tier is more than enough for a portfolio
-   **LaTeX compilation:** Runs on the GitHub Actions Ubuntu runner

I’ve been running this for a few weeks now and haven’t paid a cent. The only thing I need to do is write good content in my .tex file. The rest takes care of itself.

### What I Learned

Setting this up took me about an afternoon. A few things I learned along the way:

1.  **French text is 15–20% longer than English.** If you don’t explicitly tell the LLM to be concise, your translated CV will overflow to 3 pages. Be very specific in the prompt about page constraints.
2.  **git add with globs fails on empty matches.** I wasted time debugging a workflow that crashed because git add cv/resume/\*\*/\*.pdf throws a fatal error when no PDFs exist yet. Use find ... -exec git add instead.
3.  **Cloudflare Pages only serves files from the configured directory.** My CV PDFs lived outside portfolio/, so the download links returned 404. I had to copy the PDFs into portfolio/assets/ for them to be accessible.

### What’s Next

![](https://cdn-images-1.medium.com/max/1024/0*5w9P9XmQ3XuKvdwn)

The pipeline handles translation, compilation, and deployment. But I still have to manually update the CV content itself when I finish a new project or ship a new feature. That’s the next thing I want to automate.

The idea is to add an AI agent, probably using something like OpenClaw, that I can feed with a description of a new project I’ve completed. The agent would then figure out where to insert it in the .tex file, write the bullet point in the right style, and push the change. From there the existing pipeline takes over: translate, compile, copy to portfolio, deploy.

Basically I want to go from “Hey, I just shipped a new video pipeline feature” to a fully updated CV and portfolio in both languages, without opening a single file. That’s the dream!!

If you’re maintaining a CV in LaTeX and a portfolio website, automating the pipeline is worth the afternoon investment. You push once and everything updates: translation, compilation, downloads, deployment.

The code is not public, but if you want to see the result in action, visit [nadtraps.com](https://www.nadtraps.com/). And if you have questions, feel free to reach out ❤️!!

Happy automating 😊!

* * *

[I Never Manually Update My CV Anymore! Here’s How!](https://levelup.gitconnected.com/i-never-manually-update-my-cv-anymore-heres-how-eaa97d713944) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.
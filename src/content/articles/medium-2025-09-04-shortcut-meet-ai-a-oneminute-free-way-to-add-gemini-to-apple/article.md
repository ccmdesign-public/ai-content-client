---
title: "Shortcut, Meet AI: A one‑minute, free way to add Gemini to Apple Shortcuts"
author: "AI Disruption"
platform: "medium"
publicationName: "AI Disruption"
url: "https://medium.com/ai-disruption/shortcut-meet-ai-a-one-minute-free-way-to-add-gemini-to-apple-shortcuts-fd71f975bda0?source=rss----c0b4a0b207fc---4"
publishedAt: "2025-09-04"
tags:
  - "ai-general"
  - "gemini"
  - "innovation"
  - "llm"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.664Z"
---

# Shortcut, Meet AI: A one‑minute, free way to add Gemini to Apple Shortcuts

# Shortcut, Meet AI: A one‑minute, free way to add Gemini to Apple Shortcuts

## Deploy a tiny Cloudflare Worker and call it from Apple Shortcuts — no monthly fee, up to 1500 daily requests

[R. Thompson (PhD)](/@rogt.x1997?source=post_page---byline--fd71f975bda0---------------------------------------)

5 min read·Sep 4, 2025

\--

![Credit : AI Generated Image]()

Apple Shortcuts is great at moving data from A to B. It gets clumsy the moment you need reasoning: summarize a messy web page, classify a string from another app, extract a few fields from an email, or rephrase a text before sharing. This piece shows a simple path to add generative power to any Shortcut with a self‑hosted micro‑API that runs on Cloudflare Workers and calls Google’s Gemini. No subscriptions inside the Shortcut, no extra apps to switch into.

## What this does in plain terms

You deploy a tiny TypeScript API (Hono on Cloudflare Workers). It exposes a single endpoint that accepts a prompt and returns a text completion from Gemini. Your Shortcut hits that endpoint with “Get Contents of URL”. Secrets live server‑side. A bearer token gates access. The whole setup takes minutes.

## Who will find this useful

• iPhone power users who want AI inside existing automations
• Indie devs and makers shipping lightweight tools
• Analysts and ops folks who need quick summarization, extraction, or routing on device workflows

## Quick start without fluff

1.  Fork or download the project. Edit `wrangler.jsonc` minimally.
2.  Store secrets with Wrangler: your Google AI Studio API key and a bearer token.
3.  `make deploy` and you get a public worker URL.
4.  In Shortcuts, create an action: “Get Contents of URL” → POST to `https://<your-worker>/api/v1/completion` with JSON. Add a header `Authorization: Bearer <your-token>`.

## Minimal request body you can paste in Shortcuts

```
{  "input": "Summarize this text into 3 bullets with one action item: {{content}}",  "system": "You are concise and precise.",  "temperature": 0.2,  "model": "gemini-2.0-flash"}
```

Replace `{{content}}` using Shortcuts variables: selected text, clipboard, or the output of a prior action like “Get Article from Web Page”. The API replies with plain text, which you can pass to “Show Result”, “Copy to Clipboard”, or “Share”.

## Real‑life pain point this actually fixes

Opening a separate chatbot just to clean up, compress, or lightly reason over data breaks flow. With this micro‑API your Shortcut can:
• Summarize long Safari articles into a tight brief you can read on the lock screen
• Extract dates, amounts, or highlights from raw text blobs before filing them into Notes or Reminders
• Rephrase a WhatsApp‑sized message to be clearer or more polite without leaving the app
• Classify a snippet into tags like “invoices”, “leads”, “ideas” and route it to the right folder

## A full Shortcut you can build in 10 minutes

**Goal:** “Morning Brief in 90 seconds.” It fetches two RSS feeds, pulls your next three calendar events, and produces a compact brief with a short action list.

**Steps:**
• Use “Get Items from RSS Feed” for two sources you already trust.
• Use “Find Calendar Events” → Next 24 hours → Get Event Details (title, time).
• Build a single text block with headlines and events.
• Call your `/api/v1/completion` with a prompt like: “Summarize the news and my day into 5 tight bullets and 3 actions for me. Keep total under 120 words.”
• “Show Result” or “Save File” into Notes. That’s it. No extra apps.

## Design choices that matter

**Model string:** `gemini-2.0-flash`. Good default for speed and cost. You can later swap to newer models by changing the string.

**Temperature:** default 0.2 keeps outputs steady. Bump it when you want variety.

**Privacy posture:** API key lives in Cloudflare secrets, not inside the Shortcut. Use a long random bearer token. If you’re handling personal data, prefer short prompts and avoid pasting private payloads unnecessarily. For any sensitive flows, consider adding IP allow‑lists or rotating tokens monthly.

**Reliability tips:** Add a Shortcuts branch that retries once on a non‑200 response. Keep prompt instructions small and goal‑oriented. Save the final text locally so you aren’t blocked by network hiccups.

## Five practical use cases you can ship today

**1) “Skim & Send” for busy teams**
From Safari’s share sheet, run a Shortcut that grabs the article, asks the API for a 5‑line digest plus one open question, and pastes it into Mail or Slack. Replies get better because you frame the topic clearly.

**2) “Receipt to Line Items” from a plain email**
Use Mail → Share → Shortcut. Extract vendor, date, total, and currency into a CSV row you append in Files. Small teams skip a spreadsheet dance every week.

**3) “Tag & Route” for research**
You save links all day. This Shortcut classifies each URL as “product”, “paper”, “dataset”, or “random” and files it into the right list. Later, you have cleaner queues.

**4) “Meeting Nudge”**
Grab the latest calendar invite description, ask for three prep points, and send yourself a 60‑second brief 10 minutes before the call.

**5) “Field Note Cleaner”**
If you gather text in the Notes app while on site, one tap turns those rough bullets into a crisp memo with a tight subject line.

**Caselet from the community**
One maker shared a Shortcut that pulls the local surf report page, then uses the API to turn messy HTML into a tiny brief with wave height, power, and tide, all delivered as a lock‑screen notification. The same pattern works for weather, sports fixtures, or traffic advisories when the upstream data is inconsistent.

## Under the hood (short tour)

It’s a Hono server on Cloudflare Workers. A single completion endpoint takes `input`, `system`, Optional `temperature`, and a `model` string. The worker calls Gemini and returns clean text. The reply is small and fast to parse in Shortcuts. You can add more routes later for embeddings or function‑style patterns when you need them.

## Guardrails and gotchas

• Do not hard‑code your key in Shortcuts. Always keep it server‑side.
• Keep prompts short. Shortcuts has size limits and networks stall.
• Think about quota. If you share your endpoint with teammates, add rate limiting or a second token.
• Remember that some content types are better handled before prompting. If a page is huge, pre‑trim with “Get Article from Web Page” to extract only the body.

## FAQ

**Will this work on iPad and Mac?** Yes. Anything that runs Shortcuts can call a URL.

**Can I use other models later?** Yes. The worker is model‑string driven. Swap the value and redeploy.

**What about images or audio?** Start with text requests. For multimodal, extend the worker and confirm model support first.

**Why not call Gemini directly from Shortcuts?** You could, but then your API key lives on device and is hard to rotate. The worker gives you server‑side keys, bearer auth, and a single place to improve prompts over time.

## A tiny checklist before you share it with your team

> • Create two bearer tokens: one for you, one for teammates
> • Add a short system prompt that matches your tone of voice
> • Put a one‑line usage note in the Shortcut so others know what it sends
> • Store outputs in Notes or a project folder so people can find them later

**(AI Use Notice:** This article comes from original thought process, extensive manual research & hours spent finding, reading and verifying sources. AI tools were used to assemble the narrative, correct the grammar, not for creating it.)

![]()
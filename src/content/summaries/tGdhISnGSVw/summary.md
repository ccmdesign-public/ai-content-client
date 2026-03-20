---
metadata:
  videoId: "tGdhISnGSVw"
  title: "Adding Cookie Consent to your Vibe Coded Website with Cookiebot & Claude Code"
  description: "Try Cookiebot: https://usercentrics.sjv.io/lukasmargerie


    🤝 Join the CREATORNTWRK:

    Join me and lets build projects together!: https://discord.com/invite/vZxn6wZrDD


    Learn how to easily add a legally compliant cookie consent banner to your vibe-coded website using Cookiebot. This straightforward tutorial covers everything you need to make your site privacy-ready.


    - Why your website needs a cookie consent banner for legal compliance

    - How Cookiebot simplifies the process and stays up-to-date with privacy laws

    - Step-by-step setup in Cookiebot: configuring domains, templates, and custom designs

    - Embedding the Cookiebot script into your website for automatic detection and compliance

    - Viewing scan results, trackers, consent logs, and regional banner display settings


    Ready to make your site compliant? Watch now and get your banner set up in minutes!


    What to watch next:

    https://www.youtube.com/watch?v=w09l5VcN0Zo"
  channel: "Lukas Margerie"
  channelId: "UCIZmRlV_wjS8jFQTbRxCV4g"
  duration: "PT6M8S"
  publishedAt: "2026-03-14T01:13:27Z"
  thumbnailUrl: "https://i.ytimg.com/vi/tGdhISnGSVw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=tGdhISnGSVw"
processedAt: "2026-03-14T14:11:05.382Z"
source: "youtube"
tldr: "This tutorial demonstrates how to quickly add a legally compliant cookie consent banner to a website built with AI tools like Claude Code using Cookiebot, which automates scanning, blocking, and updates for regulations like GDPR and CCPA."
tools:
  - name: "Cookiebot"
    url: "https://cookiebot.com"
  - name: "Claude Code"
    url: null
  - name: "Vercel"
    url: null
  - name: "Cursor"
    url: null
  - name: "Google Fonts"
    url: null
  - name: "Google Analytics"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "ai-coding"
  - "claude"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5662
  outputTokens: 652
  totalTokens: 6314
  processingTimeMs: 78110
tagsNormalizedAt: "2026-03-14T14:31:36.299Z"
---

## Key Takeaways

The video shows a simple method to add legal compliance to AI-generated websites.

## Summary

The video addresses a common legal oversight when building websites with AI coding tools like **Claude Code**. These tools do not automatically add **cookie consent banners**, which are legally required in regions like the EU (GDPR) and California (CCPA) when using common third-party services like Google Fonts or Google Analytics.

The presenter recommends using **Cookiebot**, a third-party consent management platform, to solve this. The core workflow involves:

*   Signing up for a free Cookiebot account (free tier supports up to 50 subpages).

*   Adding your website domain to the Cookiebot dashboard for automatic scanning of cookies and trackers.

*   Configuring a consent banner by selecting a legal framework preset (e.g., GDPR for Germany) and customizing its design, language, and position.

*   Copying the generated embed script from Cookiebot.

*   Using Claude Code (or another AI coding assistant) to prompt it to add the script to the `<head>` section of every page on the site, ensuring it loads before any other third-party scripts.

*   Deploying the updated site (the presenter uses Vercel) and verifying the banner appears correctly.

Key benefits of using Cookiebot highlighted include its automatic scanning for trackers, **auto-blocking** of non-essential cookies until consent is given, and automatic updates to stay compliant with evolving privacy laws, removing a significant maintenance burden from the developer.

## Context

With the rise of AI-assisted website building ("vibe coding"), developers can create functional sites rapidly but often overlook critical legal requirements like cookie consent. This is especially important for sites serving users in regions with strict privacy laws (GDPR, CCPA) and using common embedded resources like Google Fonts or analytics. Failing to implement proper consent can lead to legal penalties. This tutorial provides a quick, automated solution for AI-coded projects to achieve compliance.
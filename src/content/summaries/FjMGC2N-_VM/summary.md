---
metadata:
  videoId: "FjMGC2N-_VM"
  title: "How I built an iOS App in Claude Code using SuperApp: Set up, API Integration and Deployment"
  description: "In this video I show you the exact process: start your app on Superapp to get a working prototype fast (no setup headache, no blank page), then bring it into Claude Code to add real features like live API integrations, search by city, and custom logic.


    We built a Fuelio competitor from scratch, a fuel tracking and vehicle expense app with a clean minimalist design, a live map with real gas prices, and a city search feature. All in one session.


    What you'll see in this video:

    → How to use Superapp to go from prompt to working iOS prototype in minutes

    → Importing your project into Cursor and running Claude Code as an agent

    → How Claude Code finds and integrates real open source APIs for you

    → Searching and testing live gas price data by city on a real map

    → Publishing your app to the App Store directly from Superapp


    Tools used:

    → Superapp (3 p's): https://superappp.com

    → Claude Code: https://claude.ai/code

    → Cursor: https://cursor.com\ 

    → Gas Price Locator API by Zilla (free 7 day trial):  https://zylalabs.com/api-marketplace/data/gas+price+locator+api/4808


    Timestamps:

    0:00 - Claude Code vs iOS Dev Problem

    1:06 - Finding App Ideas & Researching Competitors

    2:09 - Building the App in Superapp

    4:20 - Adding Features (Map + UX Changes)

    5:40 - Moving Project to Claude Code\ 

    7:12 - API Integration for Live Gas Prices

    9:03 - Search Feature + Final App Result


    If you're building apps with AI in 2025, subscribe. New workflows every week.


    🤝 Join the CREATORNTWRK:

    Join me and lets build projects together!: https://discord.com/invite/vZxn6wZrDD


    Follow me on socials:

    X: https://x.com/lukas_margerie

    LinkedIn: https://www.linkedin.com/in/lukas-margerie-99196118a/


    What to watch next: https://www.youtube.com/watch?v=w09l5VcN0Zo"
  channel: "Lukas Margerie"
  channelId: "UCIZmRlV_wjS8jFQTbRxCV4g"
  duration: "PT10M1S"
  publishedAt: "2026-03-21T17:00:30Z"
  thumbnailUrl: "https://i.ytimg.com/vi/FjMGC2N-_VM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=FjMGC2N-_VM"
processedAt: "2026-03-24T19:07:57.036Z"
source: "youtube"
tldr: "This video demonstrates building a complete iOS app using SuperApp and Claude Code, showing how to generate Swift code with AI prompts, integrate live APIs, and deploy to the App Store without traditional Xcode development."
tools:
  - name: "SuperApp"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Xcode"
    url: null
  - name: "Cursor"
    url: null
  - name: "Claude Code Agent"
    url: null
  - name: "Codeex"
    url: null
  - name: "TomTom Fuel Pricing API"
    url: null
  - name: "Gas Price Locator API by Zilla"
    url: null
  - name: "Figma"
    url: null
categories:
  - "AI & Machine Learning"
  - "Mobile Development"
tags:
  - "ai-coding"
  - "claude"
  - "swift"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8707
  outputTokens: 703
  totalTokens: 9410
  processingTimeMs: 168401
tagsNormalizedAt: "2026-03-24T23:00:11.813Z"
---

## Key Takeaways

The video shows a modern AI-assisted iOS development workflow using specialized tools that streamline the entire process.

## Summary

The presenter demonstrates building a fuel tracking iOS app competitor to an existing app called Filio. The process begins in **SuperApp**, where he creates a prompt describing the app concept, includes design references from other apps, and analyzes negative reviews of competitors to identify improvement opportunities.

Claude Code generates an initial app structure with a warm minimalist design featuring earth tones, circular progress rings, and clean typography. The app includes a home dashboard showing weekly fill-up streaks, miles per gallon, fuel costs, and recent fill-ups.

Within SuperApp, the presenter iteratively refines the app structure by converting the expenses page into a map view for discovering gas prices and merging expense categories into the vehicles page. The map interface allows users to see nearby gas stations with different fuel type prices.

The project is then opened in **Cursor** with the **Claude Code agent** extension to analyze the codebase and suggest enhancements. Claude Code identifies the tech stack and suggests features like fuel efficiency tips, cheapest route planning, trip tracking, and fuel cost forecasting.

For API integration, Claude Code researches and recommends the **TomTom Fuel Pricing API** initially, then switches to the **Gas Price Locator API by Zilla** when the first API only provides city-level data. The presenter obtains a free trial API key, integrates it into the app, and demonstrates live gas price fetching with real-time updates.

The workflow showcases seamless synchronization between SuperApp and the local Xcode project files, allowing continuous iteration. Final features include city search functionality in the map view, with API call tracking showing usage metrics.

Deployment is handled directly through SuperApp's publish feature, which guides users through Apple developer account setup and App Store submission without needing to open Xcode separately.

## Context

This video addresses the technical complexity of traditional iOS development using Swift and Xcode, which can be daunting for developers accustomed to web technologies. It showcases how AI-assisted tools are democratizing mobile app development by abstracting away low-level implementation details. The approach is particularly relevant for solo developers, startups, and those looking to rapidly prototype mobile applications without deep iOS expertise.
---
metadata:
  videoId: "1zCkjOt8TD0"
  title: "Claude Code $10,000 Websites vs. Real Use Cases (full build)"
  description: "The #1 community for building a highly-profitable personal brand with AI.

    👉 https://www.skool.com/buildroom/


    Summary ⤵️

    Learn how to build a fully functional AI-powered travel app using Claude Code — no complex backend required. In this tutorial, I walk you through building a mobile-optimized trip planner that reads your Gmail, organizes your entire itinerary, and lets you chat with your trip data in real time.This is a practical build, not a theory lesson.\ 


    By the end, you'll have a live, password-protected web app deployed on Vercel that you can access from your phone anywhere in the world.


    ⏱️ TIMESTAMPS:

    00:00 - Introduction: Build a Real Travel App

    00:17 - What the Finished App Can Do

    01:16 - The Problem: Trip Data Stuck in Gmail

    02:06 - How to Deploy and Host It

    02:32 - How to Set Up Claude Code Desktop

    03:17 - How to Write Your Build Prompt

    04:29 - How to Connect Gmail to Claude Code

    05:42 - How to Choose Your Tech Stack

    07:25 - How to Review Claude's Build Plan

    08:13 - How to Use the Frontend Design Skill

    09:06 - How to Preview the App Locally

    10:21 - How to Pull Real Data from Gmail

    11:11 - How to Set Up Your GitHub Repo

    13:09 - How to Fix the Chat Widget

    14:29 - How to Push Code to GitHub

    14:44 - How to Deploy Live on Vercel

    16:02 - Final App Walkthrough"
  channel: "Duncan Rogoff | AI Automation"
  channelId: "UC37JpWP5PxLSma2lh79HU9A"
  duration: "PT16M44S"
  publishedAt: "2026-03-23T16:17:25Z"
  thumbnailUrl: "https://i.ytimg.com/vi/1zCkjOt8TD0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=1zCkjOt8TD0"
processedAt: "2026-03-24T21:32:35.723Z"
source: "youtube"
tldr: "A practical demonstration using Claude Code to build a personalized, mobile-optimized trip planner in 16 minutes by connecting to Gmail to extract bookings, integrating an Anthropic-powered chat widget, and deploying live via GitHub and Vercell."
tools:
  - name: "Claude Code"
    url: null
  - name: "Anthropic API"
    url: "https://platform.cloud.com"
  - name: "Next.js"
    url: null
  - name: "GitHub"
    url: null
  - name: "Vercell"
    url: "https://versell.com"
  - name: "Gmail"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Web Development"
tags:
  - "ai-coding"
  - "claude"
  - "llm"
  - "nextjs"
  - "prompt-engineering"
  - "vercel"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 15183
  outputTokens: 836
  totalTokens: 16019
  processingTimeMs: 25671
tagsNormalizedAt: "2026-03-24T22:57:06.506Z"
---

## Key Takeaways

This video demonstrates how to use Claude Code for a practical, personal automation project rather than just conceptual '10k website' tutorials.

*   Use **Claude Code's plan mode** to break down complex projects into actionable steps before coding begins.

*   Connect to external services like **Gmail via MCP connectors** to automatically ingest and structure real-world data (flights, hotels, events).

*   Leverage **built-in skills like '/frontend design'** to quickly generate polished, mobile-optimized UIs without manual styling.

*   The final workflow integrates **data extraction, a Next.js app, an AI chat interface, and live deployment** to create a fully functional, personal tool.

## Summary

The creator builds a personal trip planner for a 3-week, 8-city European vacation to solve the real problem of scattered booking confirmations in his Gmail. He uses Claude Code's desktop app, starting in **plan mode** with the Sonnet 4.6 model to outline the project before any code is written.

He provides Claude with the trip dates and connects the **Gmail MCP connector**, granting it permission to scan a dedicated 'Europe' folder for flight, hotel, and event confirmations. A key requirement is **anonymizing all real trip data** (cities, hotels) for the public tutorial while maintaining a functional structure.

Claude Code generates a **Next.js-based application** with a mobile-optimized UI, featuring a trip overview, detailed city cards, a day-by-day itinerary view, and a password-protected login. The creator uses the **'/frontend design' skill** to instantly apply a polished visual theme.

The core functionality includes a **streaming Anthropic-powered chat widget** that can answer questions about the itinerary using the structured trip data. After troubleshooting an API key configuration issue, the chat feature works successfully, pulling real event details extracted from Gmail.

Finally, the project is automated for deployment: Claude Code **pushes the code to a private GitHub repository**, and the creator uses **Vercell** to import the repo and deploy it live. Environment variables for the Anthropic API and a GitHub personal access token are configured in Vercell, resulting in a fully live, personal web app accessible from his phone during the trip.

## Context

While many AI coding tutorials focus on building hypothetical '10k websites,' this video addresses a genuine personal productivity pain point: organizing complex travel. It matters because it showcases AI's practical utility for non-developers to build custom tools that solve everyday problems. This connects to the broader trend of **democratizing software creation** through natural language, moving beyond theory to immediate, personal application. It's relevant for anyone looking to automate personal tasks or understand the real-world capabilities of AI-assisted development.
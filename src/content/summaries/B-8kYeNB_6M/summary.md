---
metadata:
  videoId: "B-8kYeNB_6M"
  title: "How I Scaled My NextJS + Supabase App To Handle 10,000 Users"
  description: "Try Warp Build today and speed up your development workflow ➞ https://go.warp.dev/yatbytev . Warp Build helps you move faster in the terminal with AI-powered workflows designed for modern developers.


    In the past 30 days, my app went from 0 to over 10,000 users and $4,000 in revenue. The problem is, it was never built to handle that kind of scale.


    In this video, I break down the exact performance optimizations I implemented to make the app faster and more scalable. From upgrading my Supabase instance, diagnosing slow queries, adding missing database indexes, improving caching with Redis, and leveraging AI to analyze performance bottlenecks, this is a real technical walkthrough of what it takes to scale a SaaS product quickly.


    If you are building your own app, SaaS, or startup, this is what actually happens when growth hits before your infrastructure is ready.


    Check Out Yorby, the social media marketing tool for startups: https://www.yorby.ai?utm_source=yatb-yt


    Want to work with me 1:1? Book some time with me at https://www.youraveragetechbro.com


    Check out my AI-powered interview prepping tool: http://perfectinterview.ai/?utm_source=yatb-yt


    Check out my latest SaaS product to start automating your job: http://montee.ai/?utm_source=yatb-yt


    #appdevelopment #softwareengineering #saas #buildinpublic


    Follow me on TikTok: https://tiktok.com/@youraveragetechbro

    Follow me on Instagram: https://instagram.com/youraveragetechbro"
  channel: "Your Average Tech Bro"
  channelId: "UCfQk5qGOEO5cPPDFlQe2lFQ"
  duration: "PT18M38S"
  publishedAt: "2026-02-17T16:45:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/B-8kYeNB_6M/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=B-8kYeNB_6M"
processedAt: "2026-02-23T14:34:06.512Z"
source: "youtube"
tldr: "A solo founder scaled his Next.js + Supabase app (Yorby) from 0 to 10,000 users and $4k/month in 30 days by implementing three key optimizations: upgrading his Supabase compute instance from Micro to XL, using AI (Claude & Gemini) to identify and add missing database indexes, and implementing caching with Upstash Redis and React's cache() function."
tools:
  - name: "Next.js"
    url: null
  - name: "Supabase"
    url: null
  - name: "PostgreSQL"
    url: null
  - name: "Claude"
    url: null
  - name: "Gemini"
    url: null
  - name: "Google Chrome"
    url: null
  - name: "Cursor"
    url: null
  - name: "Upstash"
    url: null
  - name: "Redis"
    url: null
  - name: "React"
    url: null
  - name: "Zed"
    url: null
  - name: "Warp"
    url: "https://oz.dev"
  - name: "TanStack Start"
    url: null
  - name: "Linear"
    url: null
  - name: "Slack"
    url: null
categories:
  - "Web Development"
  - "DevOps & Infrastructure"
tags:
  - "nextjs"
  - "supabase"
  - "scaling"
  - "performance-optimization"
  - "ai-coding"
  - "startup"
  - "postgresql"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 16597
  outputTokens: 889
  totalTokens: 17486
  processingTimeMs: 16214
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

The creator detailed the performance optimizations made to scale his social media marketing platform after rapid growth.

## Summary

The video details a solo founder's journey scaling his Next.js and Supabase app, Yorby, from zero to over 10,000 users and $4,000 in monthly revenue within 30 days. This rapid growth exposed significant performance bottlenecks in the originally unoptimized application.

The first critical fix was **upgrading the Supabase compute instance** from a Micro plan ($20/month) to an XL plan ($200/month). This was a reactive measure after observing 100% CPU usage in Supabase's observability dashboard, which was causing severe slowdowns.

To systematically identify the root causes, the creator **leveraged AI agents (Claude and Google Chrome's Gemini)** to navigate his Supabase dashboard autonomously. These agents discovered the Query Performance tab and pinpointed specific slow queries, particularly those hitting the `teams` table with mean times of up to 8 seconds.

He then used **Claude in Cursor** with the **Supabase MCP** to analyze his codebase. Claude examined slow pages, identified the specific database queries and tables involved, and cross-referenced them with the current table schema. This process revealed a **lack of proper database indexes** from the initial 'ship fast' development phase. Adding the missing indexes provided a massive performance improvement.

The final major optimization was implementing **strategic caching**. Heavy read operations on the frequently accessed `teams` table were offloaded from PostgreSQL to **Upstash Redis**. This was combined with **React's `cache()` function** (from React's server components) to cache team information both in-memory and in Redis, drastically reducing database load for user-scoped data.

The creator also discussed potential future optimizations he considered but hasn't implemented: using a **Supabase read-only replica** (cost-prohibitive at double his database bill) and migrating from **Next.js to TanStack Start** (a major rewrite not currently justified). He highlighted using **Warp's cloud agents** for background automation tasks like fixing failed content scrapes and updating app localizations.

## Context

This case study is crucial for indie hackers, startup founders, and full-stack developers building with modern stacks like Next.js and Supabase. It demonstrates the real-world scaling challenges that arise after a successful launch and provides a pragmatic, AI-assisted blueprint for diagnosing and fixing performance issues. The approach highlights the shift from 'ship fast' MVP development to performance-conscious scaling, a common transition for growing apps.
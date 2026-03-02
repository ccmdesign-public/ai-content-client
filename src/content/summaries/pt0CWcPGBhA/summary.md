---
metadata:
  videoId: "pt0CWcPGBhA"
  title: "I Built The Most Realistic Medical AI Receptionist"
  description: "🤖 Transform your business with AI: https://salesdone.ai

    📚 We help entrepreneurs & industry experts build & scale their AI Agency: https://theaiaccelerators.com/nickp

    🤚 Join the best community for AI entrepreneurs and connect with 16,000+ members: - https://www.skool.com/systems-to-scale-9517/about


    Sign up to our weekly AI newsletter - https://ai-core.beehiiv.com/

    Sign up to Elevenlabs - https://try.elevenlabs.io/k9qnht9rg5dj


    🙋 Connect With Me!

    Instagram -   / nicholas.puru \ 

    X - https://x.com/NicholasPuru

    LinkedIn - https://www.linkedin.com/in/nicholas-puruczky-113818198/


    0:00 - Live demo

    2:03 - What this system actually does

    2:30 - How the outbound call system works

    3:36 - Real results from 40+ healthcare practices

    6:16 - Why the voice sounds different now (11 Labs V3)

    7:43 - Expressive mode & audio tags explained

    8:22 - System architecture walkthrough

    9:17 - How the n8n automation triggers calls

    12:06 - 11 Labs agent setup & system prompt

    14:33 - Setting up the personalization webhook

    16:47 - Knowledge base & pricing handling

    18:16 - Results since switching to expressive mode

    19:29 - Why this beats chatbots & autoresponders"
  channel: "Nick Puru | AI Automation"
  channelId: "UC4FK5DEcMLB3CyJcbJfZEJA"
  duration: "PT21M20S"
  publishedAt: "2026-02-26T17:24:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/pt0CWcPGBhA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=pt0CWcPGBhA"
processedAt: "2026-02-27T00:38:26.976Z"
source: "youtube"
tldr: "A realistic AI voice agent built with 11 Labs' expressive conversational model automates healthcare practice lead follow-ups, increasing bookings by 20+ per month with empathetic, HIPAA-compliant calls that qualify leads and schedule consultations in under 60 seconds."
tools:
  - name: "11 Labs"
    url: null
  - name: "N8N"
    url: null
  - name: "Google Sheets"
    url: null
  - name: "GPT-4"
    url: null
categories:
  - "Tools & Productivity"
tags:
  - "automation"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 17497
  outputTokens: 894
  totalTokens: 18391
  processingTimeMs: 18413
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.372Z"
---

## Key Takeaways

The video demonstrates a production-ready AI voice agent system for healthcare practices that automates patient communication and booking. • **Empathetic AI Voice:** Using **11 Labs' V3 conversational model with expressive mode** creates human-like, emotionally responsive calls that improve engagement and booking rates. • **Full Pipeline Automation:** The system handles inbound/outbound calls, SMS, and chat from lead capture to appointment booking and post-call analysis with a **feedback loop** for continuous improvement. • **Real Business Impact:** Implemented across 40+ practices, the system increased new patient bookings by 77% (18 to 32/month), reduced no-show rates from 22% to 8%, and captures leads within 5 minutes of form submission.

## Summary

The video presents a comprehensive AI voice agent system specifically designed for healthcare practices to automate patient communication and appointment booking. The system demonstrates remarkably human-like conversation capabilities through 11 Labs' latest V3 conversational model with expressive mode, which modulates tone based on context and can display empathy when detecting frustration or hesitation from callers.

The architecture centers on **N8N** as the automation backbone, with **Google Sheets** serving as the data layer for lead management. When a new lead is added to the spreadsheet, the system triggers an outbound call within minutes, personalizing the greeting using the lead's name and following a structured sales conversation flow. The agent confirms identity, pitches services, qualifies leads with specific questions, and attempts to book consultations.

### Implementation ResultsFor dental and aesthetic clinics, the system has delivered substantial improvements: phone response rates increased from 30% to 50%, social inquiries are answered in under two minutes, and practices capture 50+ new patients in 90 days that would have been lost to competitors. The **average response time** across all channels is 42 seconds, with same-day show rates at 89%.

### System ArchitectureBeyond the calling functionality, the system includes sophisticated post-call processing. After each conversation, transcripts are analyzed by **sentiment analysis agents** (powered by GPT-4) that categorize outcomes, flag do-not-contact requests, and generate specific feedback on why meetings weren't booked. This creates a continuous improvement loop where the system learns from every interaction.

### Compliance and CustomizationThe solution is **HIPAA-compliant** with signed Business Associate Agreements (BAAs) with 11 Labs. For production use with healthcare clients, the creator has built a dedicated platform beyond the N8N demonstration system. The system can be customized with practice-specific knowledge bases containing FAQs, pricing structures, and service details.

The creator emphasizes this goes beyond basic chatbots to create **complete communication infrastructure** that manages the entire patient journey from initial inquiry through booking and follow-up reminders, addressing the critical problem of missed calls and slow response times in healthcare practices.

## Context

Healthcare practices consistently struggle with missed patient calls, especially after hours and on weekends, leading to significant revenue loss. Traditional solutions like basic chatbots and autoresponders fail to provide the personalized, empathetic interaction patients expect. This system addresses that gap by combining advanced voice AI with complete pipeline automation, representing the next evolution in practice management technology. It's particularly relevant for dental offices, med spas, and other high-ticket medical practices where prompt follow-up directly impacts revenue.
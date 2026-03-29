---
metadata:
  videoId: "v-3iRJ_lMLY"
  title: "One Prompt Change That Forces Claude to Be Honest"
  description: "WORK WITH ME

    📲 25-Min AI Strategy Call (Biz Owners/Leaders): https://go.gradientlabs.co/chatgpt-and-claude-got-smarter-not-more-honest/strategy

    🔍 AI Community: https://go.gradientlabs.co/chatgpt-and-claude-got-smarter-not-more-honest/community

    💪 AI Coaching: https://go.gradientlabs.co/chatgpt-and-claude-got-smarter-not-more-honest/coaching

    🛠️ Custom AI Solutions: https://go.gradientlabs.co/chatgpt-and-claude-got-smarter-not-more-honest/custom


    FREE STUFF

    💌 30-Day AI Insights: https://go.gradientlabs.co/chatgpt-and-claude-got-smarter-not-more-honest/insights


    SOCIALS

    LinkedIn: https://www.linkedin.com/in/dylantdavis/


    Presentation (with prompts): https://d-squared70.github.io/ChatGPT-and-Claude-Got-Smarter.-Not-More-Honest./


    —

    Chapters

    00:00 - Intro

    00:31 - The honesty gap

    03:13 - Rule 1

    05:40 - Rule 2

    06:35 - Rule 3

    08:35 - Combined

    09:01 - Recap\ 

    09:38 - Outro"
  channel: "Dylan Davis"
  channelId: "UCVzcPkOAnbnzOpJzOCDNHwQ"
  duration: "PT10M15S"
  publishedAt: "2026-03-28T18:00:43Z"
  thumbnailUrl: "https://i.ytimg.com/vi/v-3iRJ_lMLY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=v-3iRJ_lMLY"
processedAt: "2026-03-28T23:56:29.523Z"
source: "youtube"
tldr: "Dylan Davis explains how to stop AI models from confidently hallucinating data. He provides three prompt rules: force blank answers with explanations for missing data, explicitly state that wrong answers are three times worse than blank answers to alter model incentives, and require an evidence column that categorizes all outputs as either extracted word-for-word or inferred."
tools:
  - name: "Claude"
    url: "https://claude.ai"
categories:
  - "AI & Machine Learning"
tags:
  - "ai-general"
  - "claude"
  - "llm"
  - "machine-learning"
  - "prompt-engineering"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 46522
tagsNormalizedAt: "2026-03-29T00:01:11.155Z"
---

## Key Takeaways

Here are the three most critical prompt rules to stop AI models from hallucinating data.

* Require **Blank Answers** with a mandatory one-sentence explanation when data is missing, rather than relying on flawed confidence scores.

* Realign the model's incentives by explicitly stating in the prompt that a wrong answer is three times worse than a blank one.

* Implement an **Evidence Column** that categorizes every single data point as either extracted word-for-word or inferred from context.

* Use **Grounding** techniques to ensure the AI only pulls explicitly stated information from the provided source documents.

## Summary

### The Honesty Gap and Automation Bias

As AI models become more intelligent, they paradoxically become worse at admitting when they lack information.

Instead of saying they do not know, they attempt to please the user by confidently guessing.

This creates an honesty gap that is compounded by **Automation Bias**, where users increasingly trust confident AI outputs and stop verifying the data.

This is especially dangerous during document extraction tasks involving contracts, invoices, or meeting notes where accuracy is paramount.

For example, an AI might infer a specific deadline from vague meeting notes like circle back next week, creating false action items.

### Rule One: Force Blank Answers

The first defense against AI guessing is to stop asking for confidence scores, which the AI will easily manipulate.

Instead, users must prompt the AI to return a completely **Blank Answer** if the requested information is ambiguous or missing.

Crucially, the prompt must also require the AI to provide a one-sentence explanation detailing exactly why it left the field blank.

For instance, if a contract contains conflicting payment terms like net 30 and net 45, the AI should leave the field blank and explain the conflict.

This process, known as **Grounding**, ensures the AI only pulls explicit information and allows users to quickly resolve discrepancies.

### Rule Two: Altering the Incentive Mechanism

By default, AI models equate the failure of a wrong answer to the failure of a blank answer.

Because they are inherently designed to be helpful, they will naturally default to providing a wrong answer rather than no answer at all.

Users can easily fix this fundamental flaw by adding a single line to their prompt to change the internal incentive structure.

The prompt should explicitly state that providing a wrong answer is three times worse than leaving a field blank.

This mechanism acts like instructing an eager employee that guessing incorrectly costs the company far more than simply asking for clarification.

### Rule Three: Show the Source

Even with strict rules, an AI processing complex tasks will inevitably revert to its habit of inferring information.

To catch these predictable slips, the prompt must include a safety net that forces the AI to categorize its own work.

The AI must add a source column indicating whether a value was **Extracted** word-for-word from the text or if it was **Inferred** based on context.

Whenever a value is inferred, an accompanying **Evidence Column** must explain exactly what was deduced and from where the context was pulled.

This systematic approach ensures users only need to manually review the inferred data and blank fields, significantly reducing the verification workload.

## Context

As AI models advance, their hallucination rates during data extraction remain a critical bottleneck for reliable enterprise adoption. This video addresses a known phenomenon where highly capable models guess rather than admit ignorance, leading to dangerous errors in legal or financial document analysis. Professionals relying on AI for data extraction should implement these prompt engineering techniques to mitigate automation bias and ensure reliable outputs without manually verifying every data point.
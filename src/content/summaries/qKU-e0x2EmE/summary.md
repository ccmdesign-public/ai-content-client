---
metadata:
  videoId: "qKU-e0x2EmE"
  title: "Stop Fixing Your Claude Skills. Autoresearch Does It For You"
  description: "🔥 Join Maker School & get customer #1 guaranteed: https://skool.com/makerschool/about

    📚 Watch my NEW 2026 Claude Code course: https://www.youtube.com/watch?v=QoQBzR1NIqI

    🎙️ The free SKILL.md: https://drive.google.com/drive/folders/14nUSxV8cpi5OI2OQxhBqyeuN92ERTMX1


    📚 Free multi-hour courses

    → Claude Code (4hr full course): https://www.youtube.com/watch?v=QoQBzR1NIqI

    → Vibe Coding w/ Antigravity (6hr full course): https://www.youtube.com/watch?v=gcuR_-rzlDw

    → Agentic Workflows (6hr full course): https://www.youtube.com/watch?v=MxyRjL7NG18

    → N8N (6hr full course, 890K+ views): https://www.youtube.com/watch?v=2GZ2SNXWK-c


    Summary ⤵️

    You can now automatically improve your Claude Code skills utilizing the principles of Karpathy's \"autoresearch\" combined with evals.\ 


    In this video, I give you a step-by-step, end-to-end walkthrough of how to do so. I also give you guys an example skill you could use to do this for yourself!


    My software, tools, & deals (some give me kickbacks—thank you!)

    🚀 Instantly: https://link.nicksaraev.com/instantly-short

    📧 Anymailfinder: https://link.nicksaraev.com/amf-short

    🤖 Apify: https://console.apify.com/sign-up (30% off with code 30NICKSARAEV)

    🧑🏽‍💻 n8n: https://n8n.partnerlinks.io/h372ujv8cw80

    📈 Rize: https://link.nicksaraev.com/rize-short (25% off with promo code NICK)


    Follow me on other platforms 😈

    📸 Instagram: https://www.instagram.com/nick_saraev

    🕊️ Twitter/X: https://twitter.com/nicksaraev

    🤙 Blog: https://nicksaraev.com


    Why watch?

    If this is your first view—hi, I’m Nick! TLDR: I spent six years building automated businesses with Make.com (most notably 1SecondCopy, a content company that hit 7 figures). Today a lot of people talk about automation, but I’ve noticed that very few have practical, real world success making money with it. So this channel is me chiming in and showing you what *real* systems that make *real* revenue look like.


    Hopefully I can help you improve your business, and in doing so, the rest of your life 🙏


    Like, subscribe, and leave me a comment if you have a specific request! Thanks.


    Chapters

    00:00 Introduction to Claude Code Skills

    01:47 The Concept of Autoresearch

    03:40 Ingredients for Successful Autoresearch

    05:25 Evaluating Skills with Evals

    08:51 Setting Up for Autoresearch

    10:30 The Diagram Generator Skill

    12:33 Optimizing Skills with Autoresearch

    14:16 Tips for Effective Evals

    15:35 Conclusion and Further Applications"
  channel: "Nick Saraev"
  channelId: "UCbo-KbSjJDG6JWQ_MTZ_rNA"
  duration: "PT16M32S"
  publishedAt: "2026-03-13T23:50:39Z"
  thumbnailUrl: "https://i.ytimg.com/vi/qKU-e0x2EmE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=qKU-e0x2EmE"
processedAt: "2026-03-14T13:49:02.867Z"
source: "youtube"
tldr: "Use the Auto Research methodology from Andrej Karpathy's GitHub repo to create a self-improving system for Claude Code skills: • Define binary yes/no evaluation criteria • Set up automated testing loops • Let agents autonomously optimize prompts, achieving up to 97.5% accuracy."
tools:
  - name: "Claude Code"
    url: null
  - name: "Auto Research"
    url: null
  - name: "nanoGPT"
    url: null
  - name: "Lighthouse"
    url: null
  - name: "Antigravity"
    url: null
  - name: "Whisper Flow"
    url: null
  - name: "Nano Banana Pro 2"
    url: null
  - name: "Excalidraw"
    url: null
  - name: "Claude Sonnet Vision"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "claude"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 14544
  outputTokens: 1006
  totalTokens: 15550
  processingTimeMs: 97201
tagsNormalizedAt: "2026-03-14T14:30:53.940Z"
---

## Key Takeaways

The video demonstrates how to apply Auto Research principles to autonomously improve Claude Code skills through systematic evaluation and iteration. • **Auto Research methodology** enables agents to optimize prompts by running repeated tests against binary evaluation criteria. • **Define clear evaluation suites** with yes/no questions (e.g., legible text, color palette, linear layout) to measure skill performance objectively. • **Automate the improvement loop** where agents generate outputs, evaluate them, and modify prompts every few minutes to achieve continuous gains. • **Binary evaluations work best** for reducing variability, while overly specific constraints can lead to gaming the system without real quality improvements.

## Summary

Claude Code skills often produce inconsistent results, with about 30% of outputs being unusable. The video introduces a solution using **Auto Research**, a methodology from Andrej Karpathy's GitHub repository originally designed for optimizing machine learning models. This approach can be adapted to autonomously improve Claude Code skills by creating a self-optimizing system.

### How Auto Research Works for Skills

The core idea involves three components: an **objective metric** (like evaluation pass rate), a **measurement tool** (automated test suite), and something to **change** (the skill prompt itself). Instead of manually tweaking prompts, you set up agents to run the skill repeatedly, evaluate outputs against predefined criteria, and iteratively improve the prompt based on performance scores.

### Creating Effective Evaluation Suites

For reliable optimization, you need standardized evaluation criteria that use binary yes/no questions. The creator demonstrates with a diagram-generator skill, defining four criteria:

- All text must be legible and grammatically correct

- Colors must match a pastel palette

- Layout must be linear (left-to-right or top-to-bottom)
- No numbers, ordinals, or ordering indicators

These criteria create a maximum score of 40 when testing 10 images (10 images × 4 criteria). The system runs every 2 minutes, generating 10 diagrams, evaluating them, and modifying the prompt to improve scores.

### Implementation Process

1. **Set up communication** with Claude Code (using Antigravity with Claude Code extension)
2. **Reference the Auto Research repo** to understand the methodology
3. **Define your evaluation criteria** as simple yes/no questions
4. **Configure the agent** to run tests, evaluate outputs, and iteratively improve prompts
5. **Let it run autonomously** - the system will continue optimizing until reaching target performance

### Results and Applications

In testing, the diagram-generator skill improved from 32/40 to 39/40 (97.5% accuracy) through automated optimization. This approach costs about $10 for 50 test iterations at 20 cents per test, making it cost-effective for skill improvement.

The methodology extends beyond skills to websites (improving load times from 1100ms to 67ms), cold email campaigns, and any process with measurable outcomes. The key insight is that **binary evaluations reduce variability** while allowing agents to discover optimal prompt formulations through systematic experimentation.

## Context

Claude Code skills are powerful AI tools but often produce inconsistent results, requiring manual prompt engineering to improve reliability. The Auto Research methodology represents a paradigm shift where AI agents can autonomously optimize their own prompts through systematic testing and evaluation. This matters because it democratizes high-quality prompt engineering, allowing users without deep expertise to create reliable skills. It connects to broader trends in autonomous AI systems and represents what may become a valuable asset class: research data documenting optimization paths that future AI models can build upon.
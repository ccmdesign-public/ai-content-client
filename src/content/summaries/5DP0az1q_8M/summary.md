---
metadata:
  videoId: "5DP0az1q_8M"
  title: "we're so back"
  description: "become an engineer, not just a slop cannon.  Check out https://boot.dev/prime! And get 25% off.\ 


    ### Sources

    https://x.com/mitchellh/status/2029348087538565612


    https://twitch.tv/ThePrimeagen - I Stream on Twitch


    https://twitter.com/terminaldotshop - Want to order coffee over SSH?

    ssh terminal.shop


    Become Backend Dev: https://boot.dev/prime

    (plus i make courses for them)


    This is also the best way to support me is to support yourself becoming a better backend engineer. \ 


    Great News?  Want me to research and create video????: https://www.reddit.com/r/ThePrimeagen


    Kinesis Advantage 360: https://bit.ly/Prime-Kinesis"
  channel: "The PrimeTime"
  channelId: "UCUyeluBRhGPCW4rPe_UvBZQ"
  duration: "PT10M49S"
  publishedAt: "2026-03-19T12:00:09Z"
  thumbnailUrl: "https://i.ytimg.com/vi/5DP0az1q_8M/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=5DP0az1q_8M"
processedAt: "2026-03-24T21:32:05.454Z"
source: "youtube"
tldr: "Claude 3.5 Sonnet's 'extra high' reasoning mode solved a 6-month GTK4/Zig GUI flicker bug that Mitchell Hashimoto's team couldn't fix, demonstrating AI's power for deep codebase research while highlighting the need for rigorous human review."
tools:
  - name: "Claude"
    url: null
  - name: "Ghosty"
    url: null
  - name: "GTK4"
    url: null
  - name: "Zig"
    url: null
  - name: "GitHub"
    url: null
  - name: "boot.dev"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-coding"
  - "claude"
  - "debugging"
  - "engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9782
  outputTokens: 863
  totalTokens: 10645
  processingTimeMs: 26274
tagsNormalizedAt: "2026-03-24T22:59:50.881Z"
---

## Key Takeaways

The video analyzes a real-world case where AI solved a persistent software bug, revealing important insights about AI-assisted programming.

* **Claude 3.5 Sonnet's 'extra high' reasoning mode** uniquely succeeded where other models failed by reading GTK4 source code to diagnose a complex GUI flicker bug.

* **AI excels at research-intensive tasks** like combing through large codebases, but **rigorous human review remains essential** to catch subtle errors and maintain code quality.

* **The optimal workflow combines AI research with human expertise** - letting AI handle the 80% of tedious investigation while humans focus on the critical 20% of review and refinement.

## Summary

The video centers on a specific incident where Mitchell Hashimoto, creator of Ghosty, documented how Claude 3.5 Sonnet solved a persistent bug that had eluded his team for six months. The issue involved screen flickering during splits in a GTK4-based Zig application.

### The Bug and AI Solution

The bug manifested as visual flashes when creating splits in the GUI. Despite months of effort, the human team couldn't pinpoint the root cause. Claude 3.5 Sonnet, specifically using its **'extra high' reasoning mode**, succeeded where other models (including lower reasoning levels of Claude 3.5 and Opus) failed. The key difference was that the AI went beyond the immediate codebase to **read the GTK4 source code itself**, discovering that leaf nodes in GTK surfaces were being unnecessarily destroyed and recreated instead of reused.

### The Importance of Human Review

Hashimoto's process didn't end with the AI's proposed fix. He conducted a **thorough code review**, asking probing questions about specific implementation choices and failure modes. This led to additional changes and manual cleanup. The video contrasts this rigorous approach with what the host calls the "AI Andy" mentality

- blindly accepting AI-generated code without proper review.

### Broader Implications for Programming

The host argues this case represents an ideal **human-AI collaboration model**: AI handles the tedious research through massive codebases (the "80%"), while humans provide the critical thinking, quality control, and domain expertise (the "20%"). This approach strips away the least enjoyable aspects of programming

- combing through unfamiliar source code

- while preserving the creative problem-solving elements.

### Real-World Applications

The host shares similar experiences using AI to analyze minified JavaScript code that would have taken months manually. This capability is particularly valuable for understanding undocumented behaviors in large, mature codebases where, as Hyrum's Law states, all observable behaviors eventually become dependencies for someone.

## Context

This discussion matters because it moves beyond abstract debates about AI replacing programmers to show concrete, practical applications. Software engineers facing complex bugs in large, unfamiliar codebases should care about these AI capabilities. The video connects to broader trends in AI-assisted development, demonstrating how tools like Claude are evolving from simple code generators to sophisticated research assistants that can navigate complex technical ecosystems.
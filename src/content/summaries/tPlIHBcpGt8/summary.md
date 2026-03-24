---
metadata:
  videoId: "tPlIHBcpGt8"
  title: "Can it get any worse?"
  description: "ssh terminal.shop losers for real coffee


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
  duration: "PT10M15S"
  publishedAt: "2026-03-20T12:48:57Z"
  thumbnailUrl: "https://i.ytimg.com/vi/tPlIHBcpGt8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=tPlIHBcpGt8"
processedAt: "2026-03-24T21:31:05.738Z"
source: "youtube"
tldr: "Amazon's response to massive layoffs and resulting 'cognitive debt'—mandating AI tool use and making senior engineers solely responsible for reviewing all junior/mid-level code—creates a paradoxical system that could slow development and increase outages."
tools:
  - name: "Kira"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "ai-general"
  - "career-growth"
  - "engineering"
  - "leadership"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8735
  outputTokens: 847
  totalTokens: 9582
  processingTimeMs: 31810
tagsNormalizedAt: "2026-03-24T22:57:48.314Z"
---

## Key Takeaways

Amazon's recent internal changes highlight the risks of over-relying on AI tools without proper process. • After laying off ~30,000 corporate employees, Amazon created **cognitive debt**—critical knowledge gaps. • To fill this, they mandated using their internal AI coding tool, **Kira**, with an 80% weekly usage target. • The new policy makes **senior engineers (L5+) solely responsible** for reviewing all code changes from juniors/mid-levels (L3/L4), potentially creating a massive review bottleneck.

## Summary

Amazon has undergone two major rounds of layoffs (14,000 in October, 16,000 in January), cutting about 10% of its corporate workforce. CEO Andy Jasse's directive for Amazon to 'operate like a startup' has coincided with this aggressive push for leanness. The company has internally attributed its ability to reduce headcount to gains in efficiency from AI.

This strategy has created a significant problem: **cognitive debt**. This term describes the parts of an organization where institutional knowledge is lost after layoffs; systems run, but nobody fully understands why or how. Amazon's plan to address this is twofold: mandate heavy use of AI coding tools and implement a strict new code review policy.

Internally, Amazon set a target for 80% of developers to use AI coding tools weekly. Crucially, developers are **required to use Amazon's in-house tool, Kira**, not external options. This mandate, combined with pressure to perform post-layoffs, is expected to lead to a massive surge in AI-generated code submissions.

The company's response to recent, high-profile outages (including one linked to an internal AI tool accidentally deleting an environment) was not to slow down. Instead, a new policy from senior vice president Dave Treadwell states that **all code changes from junior (L3) and mid-level (L4) engineers must be signed off by a senior (L5+)**. The senior engineer is now fully responsible for those changes.

This creates a potential system failure. If junior engineers, under mandate to use AI tools like Kira, generate a high volume of code (analogous to the example of a developer producing 150,000 lines in 45 days), the senior engineers will be inundated with review requests. This reintroduces the slowest part of the development cycle—human review—into a system designed for AI-speed, likely slowing overall velocity to a crawl.

The video argues this exemplifies a broader, unstable period in software development where AI tools are being sold as replacements, but the surrounding processes are 'melting.' The core irony is highlighted: using one AI tool to generate code, only to require another (or extensive human review) to check it, instead of improving the initial output.

## Context

This analysis matters because it reveals a critical, real-world tension in the tech industry's adoption of AI. Large companies like Amazon are using AI to justify workforce reductions and increase 'efficiency,' but this can create systemic fragility and knowledge gaps. The scenario serves as a cautionary tale for engineering managers, senior developers, and company leaders about the unintended consequences of mandating AI tools without adapting team structures, processes, and guardrails. It connects to broader debates about AI's true productivity gains, security risks, and the future of software development workflows.
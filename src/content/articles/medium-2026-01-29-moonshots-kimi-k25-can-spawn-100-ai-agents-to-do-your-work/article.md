---
title: "Moonshot’s Kimi K2.5 can spawn 100 AI agents to do your work"
author: "Generative AI"
platform: "medium"
publicationName: "Generative AI"
url: "https://generativeai.pub/moonshots-kimi-k2-5-can-spawn-100-ai-agents-to-do-your-work-5c7f0bd90a88?source=rss----440100e76000---4"
publishedAt: "2026-01-29"
tags:
  - "programming"
  - "artificial-intelligence"
  - "llm"
  - "ai"
  - "vibe-coding"
  - "generative"
---

# Moonshot’s Kimi K2.5 can spawn 100 AI agents to do your work

# Moonshot’s Kimi K2.5 can spawn 100 AI agents to do your work

## *The open-source model just beat GPT-5.2 and Claude 4.5 on key benchmarks.*

[JP Caparas](https://jpcaparas.medium.com/?source=post_page---byline--5c7f0bd90a88---------------------------------------)

7 min read·3 days ago

\--

![Swarm mode and visual agentic intelligence become mainstream.]()

**Imagine this:** You happen to have an airline demo video in your laptop sitting inside a “marketing collaterals” folder. You *also* happen to be bored and want to turn that video into a website. Just for fun. *Literally* just for fun.

Last month: **impossible** and not even worth entertaining the idea.

**Now?** Kimi K2.5 **breezes** through that task, *and then some*. We’re in *that* part of the AI cycle now. What you thought wasn’t possible is **now possible**.

Check this out:

![Wait, if you give Kimi K2.5 a VIDEO, it can turn it into a WEBSITE? That’s insane! Source: @EliaMoharer]()

This is Moonshot AI’s latest release. It’s weird. And it might be the most capable open-source model we’ve seen to date. Check YouTube. Check Twitter.

## What K2.5 actually is

Kimi K2.5 dropped on January 27, 2026, from Moonshot AI, a Beijing-based startup founded by Tsinghua University alumni. The company hit a $4.8 billion valuation earlier this year, and they’ve been *very* busy. K1.5 in January 2025. K2 in July. K2 Thinking in November. Now this.

![We’re in the art phase now.]()

The specs are *wild* to say the least. We’re looking at ~1 trillion total parameters. But here’s the clever bit: it’s a mixture-of-experts (MoE) architecture with 384 experts.

Only 32 billion parameters activate for *any* given token, with 8 experts selected per token plus **one shared expert**. You get trillion-parameter performance *without* trillion-parameter compute costs.

![A whole lotta experts.]()

**Key specifications:**

-   1.04 trillion total parameters, 32B active
-   256K context length
-   MoonViT vision encoder with 400M parameters
-   Trained on approximately 15 trillion mixed visual and text tokens
-   Native Int4 quantisation for efficient deployment

![Kimi’s gone a long way from being relatively unnoticed to a community favourite.]()

The licensing is interesting too. It’s a *modified* MIT licence, essentially open-source with one catch: if you’re serving more than 100 million monthly active users or making more than $20 million in monthly revenue, you need to negotiate attribution terms.

For everyone else, it’s **free**.

## The agent swarm feature

This is where K2.5 gets interesting, and probably what you got you reading this article to begin with.

![Enter swarm mode. This is the future.]()

Most AI models work like a *single* employee. You give them a task, they do it, they hand it back.

> K2.5 is different: It can spawn up to 100 sub-agents that work in parallel. Think of it less like hiring one brilliant developer and more like temporarily spinning up an entire team.

Moonshot calls this **Parallel-Agent Reinforcement Learning (PARL).** The model learned to *coordinate multiple instances of itself* during training. In practice, tasks that would normally run sequentially can execute simultaneously.

The results? Up to *80% reduction* in execution time on complex tasks. On the BrowseComp benchmark, which tests web browsing and research capabilities, **K2.5 hit 78.4% with agent swarm enabled.**

![Visualisation of K2.5’s “agent swarm” mode.]()

> *The primary constraint on an engineering team is no longer the number of hands on keyboards, but the ability of its leaders to choreograph a swarm.*

That’s from VentureBeat’s coverage, and it captures something important: We’re not just getting a smarter model. We’re getting a *different way* of thinking about AI task execution entirely.

There’s a catch, though. Agent swarm requires a **paid subscription.**

![Agent swarm mode is in research preview right now.]()

Allegretto runs $31 per month, Vivace costs $159 on annual plans. The free tier gives you the base model *without* the parallel execution magic.

## Visual agentic intelligence

K2.5 can code from wireframes.

> Show it a sketch or screenshot, and it generates functional code.

As Moonshot put it: *“Interfaces, layouts, and interactions that are difficult to describe precisely in language can be communicated through screenshots or screen recordings, which the model can interpret and turn into fully functional websites.”*

![“I asked Kimi k2.5 to design a premium landing page for a fictional high-end electric car and it made this in one shot” | Source: @askOkara]()

The vision encoder, MoonViT, handles this. It’s a 400-million-parameter model trained specifically for understanding visual content in coding contexts. Combined with the main model’s 256K context window, you can feed it large visual references alongside detailed instructions.

## Benchmark reality check

Let’s talk numbers. And let’s be honest about what they mean.

**Where K2.5 wins:**

-   HLE-Full (with tools): K2.5 50.2% vs GPT-5.2 45.5% vs Claude 4.5 Opus 43.2%
-   OCRBench: K2.5 92.3% vs GPT-5.2 80.7% vs Claude 4.5 86.5%
-   MathVista (mini): K2.5 90.1% vs GPT-5.2 82.8%

**Where Claude *still leads*:**

-   SWE-Bench Verified: Claude 4.5 80.9% vs K2.5 76.8%

![The gap is closing in for OpenAI and Anthropic. Hassabis did say China is 6 months behind.]()

These are impressive numbers. The OCR performance is *particularly notable*, beating GPT-5.2 by nearly 12 percentage points. For anyone building document processing pipelines, that matters.

## Get JP Caparas’s stories in your inbox

 from this writer.

But benchmarks deserve scepticism. Models can be optimised for specific tests. The HLE-Full result uses “thinking mode” with tool access, which isn’t always how you’d deploy in production. And SWE-Bench, arguably the most practical coding benchmark, still favours Claude.

![Kimi K2.5 Model Capabilities Radar Comparison]()

One Thoughtworks developer offered a more grounded take: *“One task with Sonnet 4 can cost me between $10–20. But with Kimi K2, I can do about ten similar tasks for just 50 RMB ($7 USD).”*

Sometimes the best benchmark is your wallet.

## Community reaction

The response has been enthusiastic but measured.

Simon Willison, whose opinion carries weight in the developer community, tested the multi-agent planning capabilities. He noted that the model *“produced ten realistic tasks and reasoned through the dependencies between them”* when asked to break down a complex plugin development project.

Developers are particularly excited about Kimi Code, a CLI tool that works as a Claude Code alternative. For those frustrated by Anthropic’s pricing or API limits, having an open-source option matters.

**What people are praising:**

-   Agent swarm as a *real* innovation, with other frontier model providers likely following suit soon.
-   Cost efficiency compared to proprietary models
-   Vision-to-code capabilities
-   The CLI tooling

**What people are questioning:**

-   Whether benchmark performance translates to real-world use
-   Hardware requirements for local deployment
-   Long-term support and model updates
-   Whether the “thinking mode” results reflect *typical* usage

The hardware concern is real. A trillion-parameter model, even with MoE efficiency, isn’t running on your laptop. The Int4 quantisation helps, but you’re still looking at serious GPU requirements for local deployment. Most users will access this through Moonshot’s API.

## What this means for developers

K2.5 represents a shift worth paying attention to.

> The agent swarm architecture suggests a future where AI tasks scale horizontally rather than just getting smarter.

Instead of waiting for one model to think harder, you spawn more instances. This has implications for how we design AI-powered applications.

![Not even Gemini 3 Pro can produce this level of slick. Source: @viktoroddy]()

For practical use today, the value proposition is clearest in four areas.

**Document processing:** That 92.3% OCRBench score matters if you’re building anything that reads documents. The vision capabilities extend *beyond* just code generation.

**Rapid prototyping:** The wireframe-to-code pipeline is useful. Designers can sketch, developers can iterate, and **the feedback loop tightens.**

**Cost-sensitive applications:** If you’re burning through API credits on Claude or GPT-5x, K2.5 offers a strong alternative. The open-source licensing means you can self-host if you have the hardware.

**Experimentation:** Honestly, the weirdness is part of the appeal. If you want a model that takes creative risks (floating icons and all), this is it.

We’re not there yet. The model has rough edges. Games crash, icons float unexpectedly, and benchmark performance *doesn’t always translate* to your specific use case.

But the trajectory matters. Moonshot went from K1.5 to K2.5 *in twelve months*.

> The agent swarm feature didn’t even exist a year ago.

The vision-to-code pipeline keeps improving.

If you’re building with AI, K2.5 is worth testing. Not because it’s perfect, it’s because it’s different. And in a field where most models feel like variations on a theme, different *is* the interesting part.

## Related reading

[

## Stop using Claude's API for Moltbot (and OpenCode)

### Stop using Claude's API for Moltbot (and OpenCode) Synthetic.new is the definitive choice for Moltbot and OpenCode…

jpcaparas.medium.com

](https://jpcaparas.medium.com/stop-using-claudes-api-for-moltbot-and-opencode-52f8febd1137?source=post_page-----5c7f0bd90a88---------------------------------------)

## References

-   [Moonshot AI K2.5 Official Blog](https://www.kimi.com/blog/kimi-k2-5.html)
-   [Hugging Face Model Card](https://huggingface.co/moonshotai/Kimi-K2.5)
-   [NVIDIA NIM Model Card](https://build.nvidia.com/moonshotai/kimi-k2.5/modelcard)
-   [TechCrunch Coverage](https://techcrunch.com/2026/01/27/chinas-moonshot-releases-a-new-open-source-model-kimi-k2-5-and-a-coding-agent/)
-   [VentureBeat Analysis](https://venturebeat.com/orchestration/moonshot-ai-debuts-kimi-k2-5-most-powerful-open-source-llm-beating-opus-4-5)
-   [Simon Willison’s Testing Notes](https://simonwillison.net/2026/Jan/27/kimi-k25/)
-   [World of AI Video Review](https://www.youtube.com/watch?v=ml5LMbefLgU)

![]()

This story is published on [Generative AI](https://generativeai.pub/). Connect with us on [LinkedIn](https://www.linkedin.com/company/generative-ai-publication) and follow [Zeniteq](https://www.zeniteq.com/) to stay in the loop with the latest AI stories.

Subscribe to our [newsletter](https://www.generativeaipub.com/) and [YouTube](https://www.youtube.com/@generativeaipub) channel to stay updated with the latest news and updates on generative AI. Let’s shape the future of AI together!

![]()
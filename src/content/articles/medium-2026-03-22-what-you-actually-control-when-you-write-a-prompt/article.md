---
title: "What you actually control when you write a prompt"
author: "AI Simplified in Plain English"
platform: "medium"
publicationName: "AI Simplified in Plain English"
url: "https://medium.com/ai-simplified-in-plain-english/what-you-actually-control-when-you-write-a-prompt-08496e9f3fb8?source=rss----f37ab7d4e76b---4"
publishedAt: "2026-03-22"
tags:
  - "ai-general"
  - "llm"
  - "prompt-engineering"
categories:
  - "AI & Machine Learning"
tagsNormalizedAt: "2026-03-23T14:40:53.868Z"
---

# What you actually control when you write a prompt

*Most of what you often put in a prompt does something — just not what you think*

![Image via MJ](https://cdn-images-1.medium.com/max/1024/1*xyJ94b2gZ4V1IYOdOi0rfg.jpeg)

Here’s an opening to a prompt that any of us could have written — I, for one, have written something like it more than once:

> “You are a world-class marketing expert. Think step by step. This is critically important — my project depends on the quality of your response.”

Three sentences — three popular techniques you’ll find in dozens of guides on working with ChatGPT. Each of these sentences does something. But none does what the author intended. The first changes style, not accuracy. The second changes behavior, not quality of thought. The third makes the result worse, not better.

The common assumption is that a prompt is something like a control panel: push the button, get the result. In reality, some of the buttons on this panel aren’t connected to anything, and others are wired to something entirely different from what the label says. Let’s try to figure out which is which.

### A button wired to the wrong thing: “You are an expert”

Assigning the model an expert role is arguably the most widespread piece of advice in prompt engineering. The logic seems obvious: the model “activates” the relevant domain of knowledge and starts answering more accurately. This practice is so entrenched that many commercial tools embed expert personas into their system prompts by default.

In late 2025, researchers at the Wharton School of Business [tested this intuition experimentally](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5879722). They took six models — from GPT-4o to the then-latest Gemini and Claude — and tested them on two demanding benchmarks: [GPQA Diamond](https://epoch.ai/benchmarks/gpqa-diamond) (graduate-level problems in physics, chemistry, and biology) and [MMLU-Pro](https://github.com/TIGER-AI-Lab/MMLU-Pro) (ten thousand questions across law, engineering, and other disciplines). Each question was run twenty-five times. Some models were given a matching expert persona — “you are a world-class physicist” for physics problems. Others got a mismatched one — “you are a physicist” for law questions. The rest received no persona at all.

The result was unambiguous. An expert persona, even one perfectly matched to the task’s subject matter, did not improve accuracy in any of the six models tested. On the other hand, “low-level” personas — “you are a child,” “you are a toddler” — did drop accuracy in several models.

Does this mean a persona does nothing at all? No. The knob is connected — just not to what you think. When a model is given the role of “marketing expert,” it does shift register — but a stylistic one: it uses professional vocabulary, structures its response differently, sounds more confident. The model starts *looking* like an expert. The problem is that we confuse a confident tone with the possession of expert knowledge — and we confuse these two things not only when it comes to models, but when it comes to people too. A persona is a costume, not a diploma. A crisp white lab coat is great, but it doesn’t make anyone a surgeon.

The practical takeaway is simple: if you need a particular style and format — a persona works. If you need factual accuracy — forget about roles and focus on the formulation of the task itself.

### A button that makes things worse: “My career depends on your answer”

Emotional pressure on a model is another viral piece of advice. “This is very important.” “My career depends on your answer.” “I’ll pay you two hundred dollars for a good result.” Google co-founder Sergey Brin publicly recommended “threatening models” — claiming they perform better under pressure.

The same Wharton group tested this too. In their [third report](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5357179), they systematically tested tips and threats on the same demanding benchmarks. The result: no statistically significant effect on answer correctness. Sergey Brin said models work better when you threaten them — it didn’t hold up experimentally. A model promised two hundred dollars answers just as accurately (or inaccurately) as one promised nothing.

But that’s only the first layer. There is a second one, less obvious — and more important.

Emotional pressure isn’t just useless — it’s harmful. This was demonstrated in a [study](https://arxiv.org/abs/2409.17167) where researchers created a set of prompts with varying levels of “stress” — from neutral to high-stakes — and tested several models on reasoning, instruction following, and emotional intelligence tasks. They found an effect well known to psychologists: an inverted U-shaped curve known as the [Yerkes-Dodson law](https://en.wikipedia.org/wiki/Yerkes%E2%80%93Dodson_law). Under moderate pressure, models perform slightly better — stress focuses. But under high pressure, performance drops: bias increases, reasoning quality declines. Analysis of the models’ internal states confirmed that stress prompts alter neural representations — the model genuinely “reacts” to pressure, just not in the way we’d like.

In other words, the model doesn’t become smarter — it becomes more cautious. It’s like raising your voice at an employee: they won’t think better, they’ll just nod more often — or go silent.

For routine tasks, this may not matter much. But if you want the model to honestly critique your text, find an unconventional solution, or point out an error in your reasoning — emotional pressure works directly against you. You’re asking the model to be honest while simultaneously signaling that the situation is dangerous.

### Buttons not connected to anything at all

There are things a prompt simply cannot control — because they exist beyond the text.

Temperature — the parameter that governs how “random” a model’s responses are — is set at the API level, not through the prompt. When a user types “work at a temperature no higher than 0.3” into a chat, the model sees this as text but cannot change its own settings — much like you can’t change your heart rate because someone asked you to. You hear the request, but the lever isn’t in your hands.

The same goes for the tendency to hallucinate — it’s a property of the architecture. A prompt can, in principle, reduce the probability of hallucination — for instance, by narrowing the task or asking the model to rely only on the provided text — but you can’t “turn off” hallucinations. It’s not a bug that can be fixed with an instruction, but a consequence of how the model works.

In short: a prompt is text at the input, not a settings panel.

### A real button — and why it works

Among the many techniques that promise to improve results, at least one actually does — even though it sounds absurd. In late 2025, researchers at Google Research discovered that simply duplicating the entire prompt — copying it and pasting it twice — increases answer accuracy.

This claim was [tested](https://arxiv.org/abs/2512.14982) on seven models from Gemini, GPT, Claude, and DeepSeek, across seven different benchmarks — but in non-reasoning mode, meaning on models that lack a built-in reasoning mechanism (such as GPT 5.2 Instant, or with extended thinking turned off). The results are striking. Duplication improved performance in forty-seven out of seventy tests. In the remaining twenty-three, the difference was insignificant. In not a single test did duplication make things worse. Response length didn’t increase, speed didn’t drop, format didn’t change. On one specially constructed task, the model’s accuracy jumped from twenty-one to ninety-seven percent.

To understand why this works, you need to know one important detail about how language models are built. When a model reads your query, it does so strictly left to right, one token at a time. And — unlike a human — it never goes back. Having read the first paragraph of context, it forms its understanding without yet knowing what question you’ll ask at the end. By the time it reaches the question, there’s no way to reconsider the beginning — the train has left the station.

Duplication solves precisely this problem. In the second copy of the query, the model reads the same context, but now already knowing the question — because it encountered it in the first copy. Now it can place emphasis correctly: highlight what’s relevant, skip what’s secondary. In essence, you’re giving the model a chance to reread the problem statement — something it can’t do on its own. This is not a life hack, but a way of compensating for a specific architectural limitation.

An important detail: with reasoning mode turned on, the effect is neutral. This makes sense — reasoning models already repeat and rephrase the query in their internal monologue, doing the same thing automatically.

### What a prompt actually controls

To avoid ending on a “nothing works” note (that’s not true), it’s worth naming the things a prompt can reliably control.

First — format and structure. Ask for a table, JSON, a list, continuous prose — and the model will deliver. This is the most predictable and robust effect of a prompt, one that reproduces across models.

Second — focus. A prompt determines which part of the task the model will concentrate on: which aspects it will develop, which it will ignore, what angle it will take. “Evaluate this text in terms of structure” and “evaluate this text in terms of tone” will yield different answers — not because the model “knows more” in one case, but because you directed its attention.

Third — tone and register. Formal or conversational, technical or popular, concise or expansive. This is where a persona actually works — “write like an editor at The Economist” will produce a different style than “explain it like you would to a friend.”

That’s about it.

### In lieu of a recipe

Let’s go back to the prompt from the beginning. If we rewrite it in light of what we now know, we get something like:

> “We are launching a mobile app for personal finance tracking, targeting freelancers aged 25–40 in Russia. Draft a launch marketing plan. Format: three sections — audience analysis, key channels, success metrics. Two to three paragraphs per section.”

Compare it with the original. The expert role is gone — it doesn’t affect accuracy. The emotional pressure is gone — it makes the model more cautious, not smarter. What appeared instead was something the original lacked entirely: a specific product, audience, and market. What remains is a clear task, a format, and a focus — the three things a prompt actually controls.

Notice that the original prompt was entirely about *how* the model should think. The new one is about *what* it should think about. This is a fundamental shift: instead of trying to manage the model’s internal process, we give it material to work with.

And if the query is complex — with a long context, with details that are easy to lose — try duplicating it. Not because “the model tries harder when it sees the query twice,” but because it reads text once, left to right, and never goes back. Repetition gives it a chance to reread the problem statement — something it can’t do on its own.

Then again, even techniques that work aren’t eternal. Why methods that helped yesterday’s models hurt today’s — in the next piece in this series.

Author’s [LinkedIn](https://www.linkedin.com/in/yury-sorochkin-stanislav-lvovsky-pen-name-56230921/)

\*

**Sources:**

**Basil, S. et al.** [Playing Pretend: Expert Personas Don’t Improve Factual Accuracy.](https://ssrn.com/abstract=5879722) Wharton Prompting Science Report 4, 2025.

**Meincke, L. et al.** [Call Me A Jerk: Persuading AI to Comply.](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5357179) Wharton Prompting Science Report 3, 2025.

**Shen, G. et al.** [StressPrompt: Does Stress Impact Large Language Models and Human Performance Similarly?](https://arxiv.org/abs/2409.17167) AAAI 2025.

**Leviathan, Y., Kalman, M., Matias, Y.** [Prompt Repetition Improves Non-Reasoning LLMs.](https://arxiv.org/abs/2512.14982) Google Research, 2025.

* * *

[What you actually control when you write a prompt](https://medium.com/ai-simplified-in-plain-english/what-you-actually-control-when-you-write-a-prompt-08496e9f3fb8) was originally published in [AI Simplified in Plain English](https://medium.com/ai-simplified-in-plain-english) on Medium, where people are continuing the conversation by highlighting and responding to this story.
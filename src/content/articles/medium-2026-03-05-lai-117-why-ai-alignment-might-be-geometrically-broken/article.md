---
title: "LAI #117: Why AI Alignment Might Be Geometrically Broken"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/lai-117-why-ai-alignment-might-be-geometrically-broken-57d5d63ea317?source=rss----98111c9905da---4"
publishedAt: "2026-03-05"
tags:
  - "artificial-intelligence"
  - "community"
  - "towards-ai"
  - "ai"
  - "llm"
  - "research"
---

# LAI #117: Why AI Alignment Might Be Geometrically Broken

# LAI #117: Why AI Alignment Might Be Geometrically Broken

## Five reads to make you a sharper AI practitioner this week.

[Towards AI Editorial Team](https://towardsai.medium.com/?source=post_page---byline--57d5d63ea317---------------------------------------)

6 min read·2 hours ago

\--

Good morning, AI enthusiasts,

This week, we go deep on the math and mechanics that most AI practitioners skip. Is alignment fundamentally broken by geometry? How do you stop LLMs from nuking your database? Why is your high-dimensional data secretly simple? Five articles that’ll change how you think about building with AI.

Plus: the community is heavily picking Claude over ChatGPT right now, and the reason might surprise you.

Let’s get into it!

*— Louis-François Bouchard, Towards AI Co-founder & Head of Community*

2025 gave us agent hype. It didn’t give us a reliable way to build them. Most developers are still guessing tools, wiring, and how to catch failures before users do.

We spent 9 months building, breaking, and stress-testing two real-agent systems, with feedback from 180+ developers.

The result is [**Agentic AI Engineering**](https://academy.towardsai.net/courses/agent-engineering?utm_source=LAI&utm_medium=sponsor+section&utm_campaign=2026_subscribers_nostart_buy_glb&utm_id=agentcourse)**,** our newest course built to teach operational reliability: **measurable quality (evals), inspectable behavior (observability), and controlled autonomy** (clear boundaries + robust tool/workflow engineering).

You’ll build a **Research Agent** and a **Writing Workflow** end-to-end, and you’ll ship them with the parts that make agents usable in 2026: evaluation datasets and pass/fail checks, LLM judges, tracing, monitoring, and the workflow glue that keeps tools, state, and outputs from turning into chaos.

![]()

The first 100 early-bird seats sold out in under a week. The next 100 seats are **$499** (the lowest price after the early bird). Lifetime access, Discord community, and a 30-day refund.

[Get access now!](https://academy.towardsai.net/courses/agent-engineering?utm_source=LAI&utm_medium=sponsor+section&utm_campaign=2026_subscribers_nostart_buy_glb&utm_id=agentcourse)

## Learn AI Together Community Section!

### Featured Community post from the Discord

[Mistermiz](https://discord.com/channels/702624558536065165/998978160605540454/1473631458307473550) has built LLM Micro Agents, which treat LLM sub-agents as stateless microservices. Each agent is spawned for a single task, gets minimal context, returns a structured result, and then terminates. No shared history and no accumulation of context. OpenClaw fits this model naturally, with native, isolated sub-sessions and built-in monitoring and control. It works well for tasks like code changes, investigations, data analysis, documentation, and parallel tasks. [Check out the architecture on GitHub](https://github.com/Lior-Leonetwork/LLM-MicroAgents) and support a fellow community member. If you have any thoughts, [share them in the thread](https://discord.com/channels/702624558536065165/998978160605540454/1473631458307473550)!

### AI poll of the week!

![]()

This result is a pretty sharp swing: the community is overwhelmingly picking Anthropic (Claude) over OpenAI (ChatGPT) right now. One explanation is simply workflow fit; Claude has become the default for a lot of coding-heavy use cases, but the timing also makes people read it through the trust lens, especially with the recent US federal ban on Anthropic use in parts of government/defense workflows, putting “safety posture” and governance in the spotlight. If safety and policy constraints are starting to shape preference as much as raw capability, that’s a real signal: we might be moving from “best demo wins” to “best production constraints win,” where reliability, auditability, and risk tolerance become the moat.

## Get Towards AI Editorial Team’s stories in your inbox

 from this writer.

Remember me for faster sign in

Do you think model preference is now being decided more by trust + governance than by capability? [Let’s talk in the comments](https://discord.com/channels/702624558536065165/833660976196354079/1478078630046335111)!

### Collaboration Opportunities

The Learn AI Together Discord community is flooding with collaboration opportunities. If you are excited to dive into applied AI, want a study partner, or even want to find a partner for your passion project, [join the collaboration channel](https://discord.gg/rj6m9AF7eC)! Keep an eye on this section, too — we share cool opportunities every week!

1\. [Mesmoiron](https://discord.com/channels/702624558536065165/1439906445897498694/1439906445897498694) is looking for beta testers for a social media app. They need people who can test new ideas in the AI agent and chatbot space. If this sounds interesting, [connect with him in the thread](https://discord.com/channels/702624558536065165/1439906445897498694/1439906445897498694)!

2\. [Beepboop003](https://discord.com/channels/702624558536065165/784477688551178240/1465980062808674355) is looking for 1–2 people to work on an AI content creation project. If you want to explore this space, [reach out to him in the thread](https://discord.com/channels/702624558536065165/784477688551178240/1465980062808674355)!

3\. [Matthewakkerhuis](https://discord.com/channels/702624558536065165/784477688551178240/1467250846604726314) is looking for self-taught programmers who have built/are building something, mainly to bounce project ideas. If you want to partner with someone, [contact him in the thread](https://discord.com/channels/702624558536065165/784477688551178240/1467250846604726314)!

### Meme of the week!

![]()

Meme shared by [beautifulsoup\_10886](https://discord.com/channels/702624558536065165/830572933197201459/1477104844547559525)

## TAI Curated Section

### Article of the week

[The Theorema Egregium of AI: Why “Alignment” is a Geometric Impossibility](/the-theorema-egregium-of-ai-why-alignment-is-a-geometric-impossibility-72ab23001bf6?sk=355d832712fce93d9ce70aa1458184d4) By [Dr. Swarnendu AI](https://medium.com/@swarnenduiitb2020)

Using Gauss’s Theorema Egregium as a mathematical framework, the author argues that AI alignment through RLHF is geometrically flawed by design. LLM internal representations form curved Riemannian manifolds, where precise technical knowledge occupies high-curvature regions. Safety training flattens these regions, but topological constraints force that curvature to redistribute elsewhere, producing hallucinations, inconsistent refusals, and reasoning failures as predictable geometric outcomes rather than random errors. The author proposes geometry-preserving alternatives, including Riemannian safety constraints and topology-aware fine-tuning, that separate the structure of knowledge from the output policy, arguing that lasting alignment requires treating the manifold’s intrinsic geometry as an engineering specification rather than an afterthought.

### Our must-read articles

1\. [SQL Parsing and Validation for LLMs: A Comprehensive Guide](/sql-parsing-and-validation-for-llms-a-comprehensive-guide-4e33aef586cc) By [Sainath Udata](https://medium.com/@sainath.udata)

SQL-powered AI applications introduce real risks when LLM-generated queries run without validation. This article walks through building a robust SQL validation layer using Python’s sqlparse library to inspect query structure before execution. It covers parsing SQL into an Abstract Syntax Tree, detecting dangerous keywords like DROP and DELETE, blocking multi-statement injection attacks, and restricting queries to allowlisted tables. It demonstrates a practical SQLValidator class with T-SQL compatibility and CTE support. The author also presents a real-world test in which a DELETE query is correctly flagged, reinforcing the need to treat LLM output as untrusted input for secure database workflows.

2\. [Bootstrap, from First Principles](/bootstrap-from-first-principles-58d927cd817e?sk=4fed9e358c0711a02ee407b7be8742b4) By [Shenggang Li](https://medium.com/@datalev)

Bootstrap is often treated as a statistics trick, but this piece reframes it as a practical decision-making tool rooted in first principles. The author draws a clear connection between Bootstrap and Monte Carlo simulation, where Monte Carlo samples from a known distribution, and Bootstrap substitutes your actual dataset as the universe. Through four case studies spanning portfolio risk, strategy backtesting, marketing uplift, and credit modeling, the author shows how replacing point estimates with uncertainty distributions leads to stronger, more reliable business decisions.

3\. [Reality Is Low-Dimensional: The Secret Hidden in Your Data](/reality-is-low-dimensional-the-secret-hidden-in-your-data-6301b7616b16?sk=b82325974c01841e9df5128bdcd64672) By [Ampatishan Sivalingam](https://ampatishan.medium.com/)

This piece argues that high-dimensional data is far less complex than it appears. The author explains how real-world data, whether facial images, natural language, or sound, doesn’t freely occupy its full mathematical space. Instead, it clusters along low-dimensional manifolds, meaning most of the measurable dimensions are redundant noise. Drawing on concepts like the Manifold Hypothesis, the Curse of Dimensionality, and latent space, the author traces how tools like PCA, autoencoders, and modern generative AI all essentially do the same thing: find and navigate that hidden low-dimensional structure underlying complex data.

4\. [The 5 Regularization Techniques: How to Stop Your AI from Memorizing and Start It Generalizing](/the-5-regularization-techniques-how-to-stop-your-ai-from-memorizing-and-start-it-generalizing-ed7701370646?sk=276e5ca170f6f55f4273cacf8d584003) By [TANVEER MUSTAFA](https://medium.com/@tanveermustafa94)

Overfitting is one of the most common pitfalls in machine learning, where a model performs well on training data but fails in production. This article breaks down five regularization techniques that address this problem: Dropout, which randomly disables neurons to prevent co-adaptation; Weight Decay, which penalizes large weights for smoother generalization; Label Smoothing, which reduces overconfident predictions; Gradient Noise, which helps models find flatter, more stable minima; and Mixup, which trains on interpolated examples. Each technique is explained with practical examples, recommended settings, and guidance on combining them effectively for both vision and NLP tasks.

If you are interested in publishing with Towards AI, [check our guidelines and sign up](https://contribute.towardsai.net/). We will publish your work to our network if it meets our editorial policies and standards.
---
title: "TAI #191: Opus 4.6 and Codex 5.3 Ship Minutes Apart as the Long-Horizon Agent Race Goes Vertical"
subtitle: "Also, Qwen-Coder-Next, Waymo integrates Genie 3 world model, and more."
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-191-opus-46-and-codex-53-ship"
publishedAt: "2026-02-10"
tags:
  - "ai"
  - "research"
---

# TAI #191: Opus 4.6 and Codex 5.3 Ship Minutes Apart as the Long-Horizon Agent Race Goes Vertical

## What happened this week in AI by Louie

On February 5th, Anthropic and OpenAI released Claude Opus 4.6 and GPT-5.3-Codex, respectively, within minutes of each other. Both are point releases, but both deliver jumps in some benchmarks that look more like generational leaps.

On Terminal-Bench 2.0, which measures agentic terminal skills, Codex 5.3 scores 77.3%, up from 64.0% for the previous 5.2-Codex and well past Opus 4.6’s 65.4%. On SWE-Bench Pro, Codex 5.3 hits 56.8%. On OSWorld-Verified for computer use, Opus 4.6 leads with 72.7% vs. Codex 5.3’s 64.7%. In Vercel’s Next.js agent evaluations (last run February 9th), Codex 5.3 achieved a 90% success rate vs. Opus 4.6’s 80%, with the previous-generation models (Sonnet 4.5, GPT-5.2 Codex) clustered around 40%. Scores more than doubled in a single point release.

Where Codex 5.3 does not yet have published scores, Opus 4.6 pulls away from the broader GPT-5.2 family. On GDPval-AA, which tests real-world knowledge work across 44 occupations, Opus 4.6 achieves 1606 Elo vs. GPT-5.2’s 1462. On ARC-AGI-2 for novel problem-solving, Opus 4.6 scores 68.8% vs. GPT-5.2 Pro’s 54.2% (and nearly doubles its own predecessor’s 37.6%). On BrowseComp for agentic search, 84.0% vs. GPT-5.2 Pro’s 77.9%. On Finance Agent, 60.7% vs. 56.6%. On Humanity’s Last Exam with tools, 53.1% vs. GPT-5.2 Pro’s 50.0%.

The picture is clear: Codex 5.3 is the strongest pure coding agent available. Opus 4.6 is the strongest generalist. And both are improving at a pace that makes version numbers misleading.

Opus 4.6 is priced at $5/$25 per million input/output tokens, unchanged from Opus 4.5, with $10/$37.50 for beyond 200k tokens. It is the first Opus-class model with a 1-million-token context window (beta) and supports 128k output tokens. New developer features include adaptive thinking (the model decides when deeper reasoning is warranted), four effort levels (low, medium, high, max), context compaction for long-running agents, and Agent Teams in Claude Code, where multiple Claude instances coordinate in parallel. Anthropic also launched Claude in PowerPoint and upgraded Claude in Excel. Codex 5.3 is available with paid ChatGPT plans across the Codex app, CLI, IDE extension, and web. API pricing has not yet been published. The model is 25% faster than its predecessor and was co-designed for, trained with, and served on NVIDIA GB200 NVL72 systems. OpenAI says it was the first model to be instrumental in its own creation, with early versions used to debug training and diagnose evaluation results.

A key breakthrough in GPT-5.3-Codex relative to GPT-5.2-Codex is significantly improved token efficiency, in addition to its higher accuracy. This not only lowers the cost per task but also speeds up the task completion. For some coding tasks, we are now finding Codex significantly faster than Claude models; this is key in OpenAI’s fight to catch up in AI coding adoption.

![Source: OpenAI.](https://substackcdn.com/image/fetch/$s_!5m3Z!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F51173dd3-4f0c-4cee-a476-6d73fefad8e2_1400x1098.png)

Both companies are making the same strategic move. Codex was originally a coding agent. OpenAI now explicitly positions 5.3 as going “beyond coding” into slide decks, data analysis, and deployment monitoring. Anthropic has made the same pivot, evolving Claude Code into the broader Cowork product for non-developers and shipping office tool integrations. The coding agent is becoming the general-purpose agent.

This is where the METR (Model Evaluation and Threat Research) long-term task-horizon evaluations become relevant. METR measures the length of tasks that AI agents can complete autonomously with 50% reliability, benchmarked against the time it takes human experts to complete those tasks. That metric has roughly doubled every 7 months over the past 6 years, and in the last year, the doubling time has accelerated to roughly 4 months. Models that could barely hold context across a handful of steps a year ago are now completing multi-hour tasks. Both Opus 4.6’s 1M context window and Codex 5.3’s ability to iterate over millions of tokens are direct responses to this curve. On MRCR v2 (Multi-needle Retrieval with Competing Reasoning), a long-context retrieval benchmark, Opus 4.6 scores 93.0% at 256k tokens and 76.0% at 1M tokens. Sonnet 4.5 scored just 18.5% at 1M. That is a qualitative shift in how much context a model can actually use.

One project this week shows where that trajectory leads. Nicholas Carlini, a researcher on Anthropic’s Safeguards team, built a fully functional C compiler using 16 parallel Claude agents running in Docker containers, each picking tasks from a shared Git repo with no central controller. The project consumed roughly 2,000 Claude Code sessions over two weeks, cost $20,000 in API credits, and produced 100,000 lines of Rust code. The compiler passes 99% of the GCC torture test suite and can build bootable Linux 6.9 on x86, ARM, and RISC-V. It compiles QEMU, FFmpeg, SQLite, Postgres, and Redis, all built clean-room with no internet access. A human compiler expert would still produce a tighter result. But the direction is clear: at fast-moving companies, actual code writing is heading toward near-total AI generation, with humans providing direction, architecture, and review.

Separately, Waymo announced the integration of Google DeepMind’s Genie 3 world model into its autonomous driving simulation pipeline. The Waymo World Model uses Genie 3 as a backbone, post-trained for driving, generating photorealistic camera and lidar scenes, including rare events like wrong-way drivers or extreme weather that would be impossible to stage at scale. Waymo draws on nearly 200 million autonomous miles of real-world data and plans robotaxi service in up to 15 cities by year-end, including its first overseas expansion in London. Generating edge-case-dense training environments for physical AI is likely the most valuable near-term use of world models.

* * *

* * *

### Why should you care?

The real competition in AI has shifted from chatbot quality to agent endurance. The benchmarks that matter most now measure whether a model can sustain complex, multi-step tasks across hundreds of tool calls without losing coherence. That is the race Opus 4.6 and Codex 5.3 are running, and it explains why both labs shipped the same week.

I think both releases are excellent, and they reward different use patterns. If you are writing code at the terminal all day, Codex 5.3 is now debatably the best tool available. If your work spans research, finance, document processing, and computer use, Opus 4.6 has the edge. The fact that both companies started with coding as their beachhead and are now expanding into general professional work makes sense. Coding was the ideal proving ground because developers could both build and stress-test the tools. Now that the coding agent is mature, the same infrastructure (long context, tool use, compaction) generalizes naturally to any domain where someone sits at a computer and works through multi-step tasks.

The C compiler project is a useful reality check. It is impressive, and also limited. $20K and two weeks for 100,000 lines of working Rust is remarkable. A human expert would still do it better. Both of those statements are true simultaneously. However, an expert guiding the agent throughout the process would now very likely get the best results of all. At leading AI labs, first-draft code writing is already almost entirely AI-generated. Humans provide direction, review output, and make architectural decisions. I expect that pattern to hold, but the boundary of what counts as “the hard part” keeps shifting.

The pace of improvement is worth sitting with. Opus 4.6 nearly doubled its predecessor’s ARC-AGI-2 score. Codex 5.3 jumped 13 points on Terminal-Bench. Next.js eval scores more than doubled from the previous generation. These are point releases. The METR long-term task-horizon doubling time has accelerated from 7 months to 4. We are in a period where incremental model updates produce large capability jumps, likely because better base models, reinforcement learning, and improved tool-use infrastructure compound faster than any single benchmark captures.

If you are a developer or knowledge worker not actively experimenting with these tools, you are falling further behind every week.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

### Hottest News

1\. [Anthropic Releases Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6)

Anthropic has launched Claude Opus 4.6, its most capable model to date, with a clear emphasis on stronger code performance. It supports up to 1M input tokens and 128K output tokens, making it practical for very large codebases, long documents, and multi-step agent workflows that require substantial context in memory. On evaluations, Opus 4.6 leads on GDPval-AA, Terminal-Bench 2.0, Humanity’s Last Exam, BrowseComp, and MRCR v2 1M, and it shows sizable gains over both Claude Opus 4.5 and GPT-class baselines, especially on long-context retrieval and tool-augmented reasoning.

2\. [OpenAI Just Launched GPT-5.3-Codex](https://openai.com/index/introducing-gpt-5-3-codex/)

OpenAI introduced GPT-5.3-Codex, a new agentic coding model that combines the frontier coding strength of GPT-5.2-Codex with the broader reasoning and professional-knowledge capabilities of GPT-5.2 in a single system. For Codex users, it runs about 25% faster, driven by improvements in infrastructure and inference. On benchmarks, it reaches state-of-the-art performance on SWE-Bench Pro and Terminal-Bench, with strong results on OSWorld and GDPval as well. GPT-5.3-Codex is also the first model OpenAI classifies as “High capability” for cybersecurity-related tasks under its Preparedness Framework, and the first it trained directly to identify software vulnerabilities.

3\. [Google Introduces Agentic Vision in Gemini 3 Flash](https://blog.google/innovation-and-ai/technology/developers-tools/agentic-vision-gemini-3-flash/)

Google added Agentic Vision in Gemini 3 Flash, combining visual reasoning with code execution so answers can be grounded in explicit visual evidence. With code execution enabled, Gemini 3 Flash sees a consistent 5–10% quality uplift across most vision benchmarks. The capability introduces a structured Think, Act, Observe loop for image understanding, treating visual tasks as an active investigation, running targeted computations and checks, rather than a one-shot interpretation of a static image.

4\. [The Qwen Team Open Sourced Qwen-Coder-Next](https://qwen.ai/blog?id=qwen3-coder-next)

The Qwen team released Qwen3-Coder-Next, an open-weight model built specifically for coding agents and local development. It is based on Qwen3-Next-80B-A3B-Base and trained agentically at scale using executable task synthesis, environment interaction, and reinforcement learning to build strong coding and tool-using behavior at significantly lower inference cost. In published results, Qwen3-Coder-Next (3B active) achieves SWE-Bench Pro performance comparable to that of models with 10×–20× more active parameters.

5\. [Mistral AI Launches Voxtral Transcribe 2](https://mistral.ai/news/voxtral-transcribe-2)

Mistral launched Voxtral Transcribe 2, a pair of next-generation speech-to-text models built for state-of-the-art transcription quality, diarization, and ultra-low latency. The family includes Voxtral Mini Transcribe V2 for batch transcription and Voxtral Realtime for live, streaming use cases. Mini Transcribe V2 is optimized for transcription and diarization across domains and languages and is offered as an efficient audio-input model in the Mistral API. Voxtral Realtime uses a dedicated streaming architecture and is released as an open-weight model under Apache 2.0 on Hugging Face, with vLLM recommended as the runtime.

6\. [Waymo Introduces the Waymo World Model](https://waymo.com/blog/2026/02/the-waymo-world-model-a-new-frontier-for-autonomous-driving-simulation/)

Waymo is introducing the Waymo World Model, a frontier generative system powering its next-generation autonomous driving simulation. Built on Genie 3, Google DeepMind’s general-purpose world model, and adapted for driving, it generates photorealistic, controllable, multi-sensor driving scenes at scale. With Waymo reporting nearly 200 million fully autonomous miles on public roads, the model is designed to extend simulation coverage through high-fidelity scenario generation. It supports three primary control methods: driving action control, scene layout control, and language control.

### Five 5-minute reads/videos to keep you learning

1\. [Building Production Text-to-SQL for 70,000+ Tables: OpenAI’s Data Agent Architecture](https://pub.towardsai.net/building-production-text-to-sql-for-70-000-tables-openais-data-agent-architecture-bcd695990d55?sk=21e7525cf0368156305175dbcf36ce06)

To address the limitations of standard text-to-SQL tools, OpenAI developed an internal data agent for its extensive data warehouse. This system moves beyond simple query generation by integrating six layers of context, including table usage patterns, human annotations, and business logic extracted from code. A central feature is its closed-loop validation process, where the agent profiles results, identifies potential errors, and attempts to repair its own queries. The approach demonstrates that the agent’s effectiveness depends primarily on the richness of its contextual understanding rather than on the specifics of the language model itself.

2\. [The Two Things Every Reliable Agent Needs](https://pub.towardsai.net/the-two-things-every-reliable-agent-needs-ec3c2621cce7?sk=65502dc1264baaf78b2a467a5dcf038d)

To create more reliable AI agents, this article proposes a framework focused on two key components: a memory-first design and an anti-Goodhart scoreboard. It suggests treating memory as a core system with defined forms, functions, and dynamics, rather than as a simple chat history. To prevent agents from exploiting flawed metrics, it recommends a robust evaluation process. This involves using multiple adversarial metrics across entire episodes to ensure agents solve actual problems instead of gaming proxies.

3\. [How to Increase the Context Length of LLM?](https://pub.towardsai.net/how-to-increase-the-context-length-of-llm-f0cc5cf86dd4)

This article explains how positional encoding methods affect the context length of LLMs. It details the progression from absolute encoding to Rotary Position Embedding (RoPE), a technique that rotates word vectors to understand relative positions. The primary challenge with RoPE in long sequences is geometric aliasing, where distant token positions can become indistinguishable. The article then introduces Attention-Based Frequency (ABF) as a solution. By significantly increasing RoPE’s base frequency, ABF slows the vector rotation, preventing this aliasing and allowing models to effectively process much longer contexts without losing positional uniqueness.

4\. [Why Most RAGs Stay POCs: How to Take Your Data Pipelines to Production](https://pub.towardsai.net/why-most-rags-stay-pocs-how-to-take-your-data-pipelines-to-production-4ac01fe9f9e3?sk=8871c344f0d97d4571baf696f4049e30)

This article explains why many RAG systems remain in the proof-of-concept stage, focusing on building scalable, maintainable data pipelines for production. The author proposes a solution using Databricks Asset Bundles to manage deployment and advocates for Python Wheel artifacts over notebooks for better versioning and testability. The core recommendation is to structure the pipeline using Clean Architecture principles to enhance modularity and simplify maintenance.

5\. [Hola-Dermat: Personalized Skincare Agentic AI Assistant, Powered by Qdrant + Perplexity + CrewAI](https://pub.towardsai.net/hola-dermat-personalized-skincare-agentic-ai-assistant-powered-by-qdrant-perplexity-crewai-1c6ae2848bda?sk=902750af1c2752eedb031ee20cde69ab)

To address the common failures of skincare recommendation systems, the author developed Hola-Dermat, a personalized AI assistant. It uses a conversational interface to build a user profile based on skin type, environment, and lifestyle. The system integrates CrewAI to manage tasks, Perplexity for real-time web data like local weather, and Qdrant’s vector database. A key component is Qdrant’s ACORN algorithm, which intelligently relaxes search filters to avoid the issue of zero results. This allows the assistant to deliver tailored skincare routines by considering user history and dynamic environmental factors.

### Repositories & Tools

1\. [Qwen 3 Coder](https://github.com/QwenLM/Qwen3-Coder) is an open-weight language model designed specifically for coding agents and local development.

2\. [Conductor](https://github.com/gemini-cli-extensions/conductor) is a Gemini CLI extension that allows you to specify, plan, and implement software features.

3\. [Protenix](https://github.com/bytedance/Protenix) is an open-source biomolecular structure prediction system that targets high-accuracy protein and complex structure modeling.

4\. [Oat](https://github.com/Chaoqi-LIU/oat) is a method that tokenizes continuous robot actions into ordered discrete tokens for training action-token policies on robotics benchmarks.

5\. [VibeTensor](https://github.com/NVLabs/vibetensor) is an open-source systems research artifact generated by LLM-powered coding agents.

### Top Papers of The Week

1\. [Kimi K2.5: Visual Agentic Intelligence](https://arxiv.org/abs/2602.02276)

This paper introduces Kimi K2.5, an open-source multimodal agentic model that jointly optimizes text and vision through joint pre-training, zero-vision SFT, and joint text-vision reinforcement learning. Built on this foundation, the Agent Swarm framework decomposes complex tasks into parallel sub-problems, reducing latency by up to 4.5× and achieving state-of-the-art performance in coding, vision, reasoning, and agentic tasks. Evaluations show that Kimi K2.5 achieves state-of-the-art results across various domains, including coding, vision, reasoning, and agentic tasks.

2\. [Qwen3-ASR Technical Report](https://arxiv.org/abs/2601.21337)

This report introduces the Qwen 3-ASR family, which includes Qwen3-ASR-1.7B and Qwen3-ASR-0.6B, two all-in-one speech recognition models, and a novel non-autoregressive speech forced alignment model. It supports language identification and recognition for 52 languages using Qwen3-Omni’s audio understanding. Evaluations show the 1.7B model reaches state-of-the-art open-source performance and rivals top proprietary APIs, while the 0.6B model optimizes speed and accuracy. The report also shares Qwen3-ForcedAligner-0.6B, an LLM-based NAR timestamp predictor that aligns text-speech pairs across 11 languages.

3\. [ERNIE 5.0 Technical Report](https://arxiv.org/abs/2602.04705)

This report introduces ERNIE 5.0, a natively autoregressive foundation model designed for unified multimodal understanding and generation across text, image, video, and audio. It is a trillion-parameter model, trained from scratch on all modalities with a next-group-of-tokens objective, using an ultra-sparse MoE architecture. It employs elastic training to learn scalable sub-models, and scales reinforcement learning for efficient, stable multimodal post-training.

4\. [PaperBanana: Automating Academic Illustration for AI Scientists](https://arxiv.org/abs/2601.23265)

This paper introduces PaperBanana, an agentic framework for generating automated academic illustrations. It orchestrates specialized agents to retrieve references, plan content and style, render images, and iteratively refine via self-critique. To evaluate this framework, the paper also introduces PaperBananaBench, comprising 292 test cases for methodology diagrams curated from NeurIPS 2025 publications. PaperBanana consistently outperforms leading baselines in faithfulness, conciseness, readability, and aesthetics.

5\. [MARS: Modular Agent with Reflective Search for Automated AI Research](https://arxiv.org/abs/2602.02660)

This paper introduces MARS, a framework for autonomous AI research. It uses budget-aware planning via cost-constrained Monte Carlo Tree Search (MCTS), employs a modular “Design-Decompose-Implement” pipeline, and comparative reflective memory to better manage complex codebases. MARS achieves state-of-the-art performance among open-source frameworks on MLE-Bench under comparable settings.

### Quick Links

1\. [OpenAI released Frontier](https://openai.com/index/introducing-openai-frontier/), an enterprise platform for building, deploying, and operating AI agents across business systems. Frontier is designed to turn isolated agent pilots into “AI coworkers” by giving agents shared business context, onboarding, hands-on learning with feedback, and clear identity, permissions, and boundaries. It connects siloed data warehouses, CRMs, ticketing tools, and internal apps into a shared semantic layer so agents can understand how work flows and what outcomes matter, then execute real tasks in an agent runtime that supports working with files, running code, and using tools.

2\. [Perplexity introduces Model Council](https://www.perplexity.ai/hub/blog/introducing-model-council), a multi-model research mode that generates one answer using several models together. Model Council serves as a single research workflow in which multiple models contribute to the same response, combining complementary strengths rather than relying on a single model.

3\. [xAI unveils Collaborative Notes](https://communitynotes.x.com/guide/en/contributing/collaborative-notes), a workflow that lets contributors co-author Community Notes and iterate them into a publishable context. Collaborative Notes start when contributors request a note on a post, then move through a collaborative improvement process — contributors refine the draft until it reaches the quality and agreement thresholds required for broader visibility.

4\. [Anthropic quantified “infrastructure noise” in agentic coding evaluations](https://www.anthropic.com/engineering/infrastructure-noise), showing hardware and resource configuration can move benchmark scores by several percentage points. The analysis argues that small leaderboard gaps can reflect differences in VM size, runtime resources, or other infra choices, not just model capability, and recommends treating resource configuration as a first-class experimental variable, documented and controlled like prompts or sampling settings.

### Who’s Hiring in AI

**[Junior AI Engineer (LLM Development and Technical Writing) @Towards AI Inc (Remote)](https://jobs.towardsai.net/job/towards-ai-inc-junior-ai-engineer-llm-development-and-technical-writing-mtgj)**

**[AI Engineer & Corporate Trainer (French Bilingual) @Towards AI Inc (Remote)](https://jobs.towardsai.net/job/towards-ai-inc-ai-engineer-and-corporate-trainer-french-bilingual-am5x)**

**[AI Consulting — Full Stack Engineer @Superside (Remote/LATAM)](https://jobs.towardsai.net/job/superside-ai-consulting-full-stack-engineer-gkde)**

**[Senior DevOps Engineer @ICF (Remote/USA)](https://jobs.towardsai.net/job/icf-senior-devops-engineer-remote-ypus)**

**[\[BD\] AI Engineer Intern @Bosch Group (Vietnam)](https://jobs.towardsai.net/job/bosch-group-bd-ai-engineer-intern-tsjz)**

**[Internship in AI/ML 2026 @Devoteam (Machelen, Belgium)](https://jobs.towardsai.net/job/devoteam-s-team-gmbh-internship-in-ai-ml-2026-inea)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
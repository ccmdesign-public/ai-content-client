---
title: "TAI #195: GPT-5.4 and the Arrival of AI Self-Improvement?"
subtitle: "Also, Gemini 3.1 Flash-Lite, Karpathy's Autoresearch, Qwen 3.5 Small, Copilot Cowork & more"
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-195-gpt-54-and-the-arrival-of"
publishedAt: "2026-03-10"
tags:
  - "agents"
  - "ai-general"
  - "copilot"
  - "gemini"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-10T16:49:29.885Z"
---

# TAI #195: GPT-5.4 and the Arrival of AI Self-Improvement?

## What happened this week in AI by Louie

Two stories dominated this week that look unrelated but tell the same story. On Wednesday, OpenAI released GPT-5.4, its most work-oriented frontier model to date. On Sunday, Andrej Karpathy posted results from his autoresearch experiment, showing that AI agents can autonomously find real, transferable improvements to neural network training. I think this combination marks a turning point: AI is becoming a closed-loop improver of its own stack.

OpenAI released GPT-5.4 on March 5 as GPT-5.4 Thinking in ChatGPT, gpt-5.4 and gpt-5.4-pro in the API, and GPT-5.4 in Codex. It folds GPT-5.3-Codex’s coding strengths into the mainline model, adds native computer use, tool search, an opt-in 1M-token context window (272K default), native compaction, and a steerable preamble in ChatGPT that lets users redirect the model mid-task. Pricing has stepped up to $2.50/$15 per million tokens for the base model, $30/$180 for Pro, however increased token efficiency is largely cancelling this out in our tests. Requests exceeding 272K input tokens cost 2x more.

The release cadence is also notable. GPT-5.2 in December, GPT-5.3-Codex on February 5, Codex-Spark on February 12, GPT-5.3 Instant on March 3, GPT-5.4 on March 5. An OpenAI staff member on the developer forum said it plainly: “monthly releases are here.” The progress now comes from post-training, eval loops, reasoning-time controls, tool selection, memory compaction, and product integration. The base model race still matters, but the surrounding engineering is where gains compound fastest.

GPT-5.4 is another leap in many dimensions, but not a clean knockout. On Artificial Analysis’s Intelligence Index, it ties Gemini 3.1 Pro Preview at 57. On LiveBench, GPT-5.4 Thinking xHigh barely leads Gemini 3.1 Pro Preview, 80.28 vs. 79.93. On the Vals benchmark grid, the picture is splintered: GPT-5.4 leads ProofBench, IOI, and Vibe Code Bench; Gemini 3.1 Pro leads LegalBench, GPQA, MMLU Pro, LiveCodeBench, and Terminal-Bench 2.0; Claude Opus 4.6 leads SWE-bench; Claude Sonnet 4.6 leads the broad Vals composite and Finance Agent. There is no single best frontier model anymore.

OpenAI’s benchmark story this time is unusually workplace-centric. On GDPval, which tests real knowledge work across 44 occupations, GPT-5.4 achieves 83.0% vs. 70.9% for GPT-5.2. On internal spreadsheet modeling tasks, 87.3% vs. 68.4%. On OSWorld-Verified for desktop navigation, 75.0%, surpassing the human baseline of 72.4% and nearly doubling GPT-5.2’s 47.3%. On BrowseComp, 82.7%, with Pro reaching 89.3%. OpenAI claims 33% fewer false claims and 18% fewer error-containing responses vs. GPT-5.2. Mainstay reported that across roughly 30,000 HOA and property-tax portals, GPT-5.4 hit 95% first-try success and 100% within three tries, about 3x faster while using 70% fewer tokens. Harvey’s BigLaw Bench: 91%.

Despite continued progress on GDPval, I think OpenAI still has an interface gap for white-collar work. GPT-5.4’s preamble and mid-response steering are genuinely useful. ChatGPT for Excel and the new financial-data integrations are a smart wedge into high-value workflows. But OpenAI still does not have a broad non-developer surface as friendly as Claude Cowork for delegating messy cross-file, cross-app, real-world office work. Codex and the API now have serious computer-use capability, but the overall experience still leans more technical than it probably needs to if OpenAI wants to dominate the everyday white-collar desktop.

Microsoft moved quickly on that front this week with Copilot Cowork. The company announced that it is integrating the technology behind Claude Cowork directly into Microsoft 365 Copilot, with enterprise controls, security positioning, and pricing under the existing Microsoft 365 Copilot umbrella. That gives Microsoft a clear distribution advantage because Word, Excel, PowerPoint, Outlook, and Teams are already where a large share of office work happens. But Microsoft’s execution so far has often felt like a company with perfect distribution and only intermittent product urgency. OpenAI and Anthropic, by contrast, have generally been sharper at making people actually want to use the thing. Microsoft still has the installed base. The question is whether it can convert that into a genuine product pull before the model labs sell their own work agents more directly into the enterprise.

The other story this week that matters just as much, even if it looks smaller on paper, is Andrej Karpathy’s autoresearch experiment. Karpathy publicly reported that after about two days of autonomous tuning on a small nanochat training loop, his LLM agent found around 20 additive changes that transferred from a depth-12 proxy model to a depth-24 model and reduced “Time to GPT-2” from 2.02 hours to 1.80 hours, roughly an 11 percent improvement. The autoresearch repository describes the setup: give an AI agent a small but real LLM training environment, let it edit the code, run short experiments, check whether validation improves, and repeat overnight.

![Source: Andrej Karpathy. Autoresearch progress optimising nanochat over 2 days.](https://substackcdn.com/image/fetch/$s_!cq4-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb798a955-5961-47d6-84ff-957ef2e3570e_1600x798.png)

A lot of people immediately reached for the “this is just hyperparameter tuning” line. I think that misses the economic point. If an agent swarm can reliably explore optimizer settings, attention tweaks, regularization choices, data-mixture recipes, initialization schemes, and architecture details on cheap proxy runs, then promote the promising changes to larger scales, that is already an extremely valuable research process even if it does not look like a lone synthetic scientist inventing an entirely new paradigm from scratch. Frontier research is full of bounded search problems with delayed but measurable feedback. That is exactly the terrain where agents can start compounding.

This is the trajectory I expect from here. Labs will give swarms of agents meaningful GPU budgets to run thousands of small and medium experiments on proxy models. They will search for better attention mechanisms, better optimizer schedules, better training curricula, better post-training recipes, and better evaluation harnesses. The promising ideas will then get promoted upward through progressively larger training runs. Human experts will stay in the loop at the obvious choke points: deciding which metrics matter, spotting false positives, designing new search spaces, choosing which ideas deserve expensive scale-up, and co-designing the higher-stakes modifications once you are dealing with real parameter counts and serious training-flop budgets. But the inner loop of “propose, implement, test, compare, iterate” is increasingly looking automatable.

We already have hints that the labs are on the first rung of this ladder. OpenAI stated that GPT-5.3-Codex was the first model “instrumental in creating itself,” with early versions used to debug its own training, manage deployment, and diagnose evaluations. To be precise, OpenAI has been much more explicit publicly about self-development in GPT-5.3-Codex than in GPT-5.4 itself. But the direction of travel is hard to miss.

There is also an important nuance from OpenAI’s GPT-5.4 system card. The company says GPT-5.4 Thinking does not meet its threshold for High capability in AI self-improvement, which it defines as roughly the level of a performant mid-career research engineer. I think that distinction matters, but probably in the opposite way some skeptics assume. The threshold for economically useful self-improvement is much lower than the threshold for autonomous frontier research. A model does not need to be a synthetic principal scientist to improve prompts, evaluations, tooling, scaffolds, training recipes, and smaller-model experiments around itself. That lower threshold is the one that accelerates everything else.

* * *

* * *

### Why should you care?

The center of gravity in AI has moved from “smart chatbot” to “reliable operator.” The winning system is no longer the one that writes the prettiest single answer. It is the one that can stay on task for an hour, use the right tools without drowning in token overhead, operate ugly software that nobody exposed through clean APIs, compress its own history, and let a human steer without restarting the whole job. GPT-5.4, Codex, Opus 4.6’s agent teams, Gemini CLI, Microsoft’s Copilot Cowork, and Karpathy’s autoresearch all point in the same direction.

This is why GDPval matters more than GPQA or MMLU. The trajectory from 12.4% with GPT-4o to 83.0% with GPT-5.4 in roughly 18 months does not measure chatbot cleverness. It measures how close AI is to replacing the actual output of knowledge workers on well-specified tasks. We are past the halfway mark, and the curve is steepening. That said, GDPval still has obvious limitations, and we hope the project receives more funding from OpenAI to expand the benchmark and test more multistage, longer-time-horizon agentic tasks.

And Karpathy’s autoresearch extends the same logic inward. If agents can reliably improve the training stack itself, the rate of improvement compounds. I expect Frontier Labs to give agent swarms meaningful GPU budgets this year to explore attention mechanisms, optimizer variants, and dataset recipes on small proxies before scaling the winners. Human researchers will co-design at scale. My guess is that by year end, we may well see a leading model whose development was materially shaped by this kind of autonomous AI research loop. I do not mean fully autonomous in the science-fiction sense. I mean that a meaningful fraction of the attention tweaks, optimizer choices, data-recipe changes, post-training methods, and eval fixes will have been discovered, filtered, and iterated by agent systems running at scale, with human researchers acting more like high-level architects, judges, and escalation points. That no longer feels speculative to me. It feels like the next obvious hill for reinforcement learning during post-training.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

### Hottest News

1\. [OpenAI Introduced GPT-5.4](https://openai.com/index/introducing-gpt-5-4/)

OpenAI released GPT-5.4, a new frontier model designed for professional work, with GPT-5.4 Thinking available in ChatGPT, the API, and Codex, and GPT-5.4 Pro offered for users who want maximum performance on complex tasks. GPT-5.4 consolidates OpenAI’s recent gains in reasoning, coding, and agent workflows into a single model, bringing GPT-5.3-Codex–level coding strength while improving tool use across software environments and knowledge-work tasks like spreadsheets, presentations, and documents. In ChatGPT, GPT-5.4 Thinking can show an upfront plan so users can steer mid-response, and it improves deep web research and long-context handling. In the API and Codex, GPT-5.4 is the first general-purpose OpenAI model with native, state-of-the-art computer-use capabilities, and it supports up to 1M tokens of context for longer-horizon agents. OpenAI also highlights a tool search for navigating large tool ecosystems and improved token efficiency compared to GPT-5.2. On reported evaluations, GPT-5.4 scores 83.0% on GDPval, 57.7% on SWE-Bench Pro (Public), 75.0% on OSWorld-Verified, 54.6% on Toolathlon, and 82.7% on BrowseComp.

2\. [Google Introduced Gemini 3.1 Flash-Lite](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/)

Google released Gemini 3.1 Flash-Lite as the most cost-efficient model in the Gemini 3 lineup, built for high-throughput workloads where latency and cost matter. A new architectural control lets developers programmatically set the model’s “thinking” level: Minimal, Low, Medium, or High so that they can trade off speed against reasoning depth based on task complexity. Flash-Lite supports multimodal inputs (text, image, video) with a standard 128K context window. Pricing is set at $0.25 per 1M input tokens and $1.50 per 1M output tokens, and Google reports it outperforms Gemini 2.5 Flash with a 2.5× faster time-to-first-token and 45% higher output speed.

3\. [Qwen Introduces the Qwen 3.5 Small Model Series](https://x.com/Alibaba_Qwen/status/2028460046510965160)

Alibaba released Qwen 3.5 Small, a family of 0.8B to 9B models, built for on-device and edge deployment. Qwen3.5–0.8B and Qwen3.5–2B target high-throughput, low-latency applications on constrained hardware. Qwen3.5–4B serves as a lightweight multimodal base suited for small agents, while Qwen3.5–9B is tuned for reasoning and logic. The 9B model uses Scaled Reinforcement Learning to optimize for reliable reasoning trajectories, not just next-token prediction, and is presented as narrowing the performance gap with models 5× to 10× larger.

4\. [Microsoft Releases Phi-4-Reasoning-Vision-15B](https://www.microsoft.com/en-us/research/blog/phi-4-reasoning-vision-and-the-lessons-of-training-a-multimodal-reasoning-model/)

Microsoft launched Phi-4-Reasoning-Vision-15B, a 15B-parameter, open-weight multimodal model designed for reasoning over images and text. It pairs the Phi-4-Reasoning language backbone with a SigLIP-2 vision encoder through a mid-fusion architecture, targeting compact but capable multimodal reasoning for math, science, documents, and GUI understanding. Training mixes reasoning and non-reasoning data so the model can switch between think and nothink modes depending on whether the task benefits from explicit reasoning or direct perception-based output. Microsoft highlights two primary use cases: visual scientific reasoning (handwritten equations, diagrams, charts, tables, and quantitative documents) and computer-use agent tasks, in which the model interprets screens, localizes UI elements, and supports interaction across desktop, web, and mobile interfaces.

5\. [Voice Mode Rolls Out to Claude Code](https://x.com/trq212/status/2028628570692890800)

Anthropic is adding Voice Mode to Claude Code with a staged rollout and a broader release planned over the next few weeks. Once enabled with /voice, users can speak a command and have Claude Code execute it, reducing the friction of switching between typing, navigating, and issuing multi-step instructions. This matters because coding assistants are increasingly competing on end-to-end workflow speed, not just code quality. As agents take on longer tasks, the interface becomes part of reliability and control. Voice input is a practical step toward “always-available” agent operation, useful when developers need quick corrections, clarifications, or steering without breaking flow.

6\. [Mistral AI Launches AI Services for Finance](https://mistral.ai/industry/finance)

Mistral introduced a suite of AI services tailored for financial institutions that run within a firm’s own infrastructure, keeping sensitive data out of third-party systems. The offering targets core finance use cases, such as automating compliance and risk checks and enabling search across internal sources, including policies, credit files, and proprietary research. As banks and asset managers push AI deeper into regulated processes, data control and auditability become the gating constraints. This shift is pushing vendors to compete on private deployment, governance, and security boundaries.

### Five 5-minute reads/videos to keep you learning

1\. [Beyond the Basics: Advanced Local AI Coding Workflows and Model Optimization](https://pub.towardsai.net/beyond-the-basics-advanced-local-ai-coding-workflows-and-model-optimization-part-2-c023babae088?sk=8e17c521a30b69f9249aedd15b18145e)

This guide walks through creating a local AI coding environment using constrained setups as well as high-end workstations. It includes details on model selection, hardware tiers, GPU and CPU optimization strategies, context window management, and storage improvements. It also introduces practical automation workflows (pre-commit code-review hooks, documentation generators, and multi-agent pipelines) and prompting techniques such as chain-of-thought and few-shot patterns to improve output quality.

2\. [Understanding Loss Landscapes of Modern AI Models](https://pub.towardsai.net/understanding-the-loss-landscape-of-modern-ai-models-7802247017bd?sk=9593e31319e4010070c310135262ec4d)

Neural networks are often described as black boxes, but loss landscape visualization offers a structured way to examine how they learn and generalize. This article walks through the mechanics of loss landscapes, from 2-parameter models in which full surfaces can be plotted, to large-scale LLMs in which only 2D cross-sections are possible. It covers key techniques, including directional probing, PCA-based direction selection, and normalization methods such as filter and layer normalization. It also addresses a common misconception: that training trajectories follow the plotted surface. Finally, it connects landscape geometry to real-world model behavior, showing that flat minima consistently correlate with better generalization.

3\. [Beyond model.fit(): Demystifying Gradient Descent from Scratch](https://pub.towardsai.net/beyond-model-fit-demystifying-gradient-descent-from-scratch-003dd0241ddf)

Most machine learning practitioners call model.fit() without understanding what happens underneath. This article breaks down Gradient Descent from scratch using pure Python and NumPy, covering all three variants (Batch, Stochastic, and Mini-Batch) with clean implementations and clear mathematical foundations. Beyond the code, it addresses three common failure points: poor feature scaling, non-convex loss landscapes, and poorly chosen learning rates. It also shows how each variant behaves during training using loss curves and contour path plots.

4\. [Structured Video Captioning with Gemini: An MMA Analysis Use Case](https://pub.towardsai.net/structured-video-captioning-with-gemini-an-mma-analysis-use-case-bfbb8fd91a26)

This article covers how Gemini’s video understanding capabilities can be applied to structured video captioning, using MMA fight analysis as a test case. The authors split fight footage into 30-second segments to manage token limits, then used prompt chaining to extract timestamped action breakdowns and convert them into structured JSON via Pydantic models. They extended this with a multi-agent workflow, where discipline-specific specialists analyzed striking, grappling, submissions, and movement in parallel before a head coach model synthesized the findings.

5\. [Turning Microsoft OneNote Into an AI-Powered Knowledge System: A Practical, Low-Cost Blueprint Using OCR and RAG](https://pub.towardsai.net/turning-microsoft-onenote-into-an-ai-powered-knowledge-system-a-practical-low-cost-blueprint-32d8082c6d73?sk=b4b4ef697d48b33220be143526465998)

Many organizations rely on Microsoft OneNote as a central knowledge repository, yet most of that content remains unsearchable and unstructured. This article walks through a four-layer architecture that addresses this gap by combining Microsoft Graph, Azure Document Intelligence, ChromaDB, and GPT-4o. Each layer handles a distinct responsibility, extracting OneNote content, normalizing attachments, applying OCR and embeddings, and delivering a Streamlit interface for validation and conversational search. The author also emphasizes that this type of proof-of-concept rarely requires significant budget and is often implementable for a few hundred dollars, making it a practical starting point for organizations.

### Repositories & Tools

1\. [AutoResearch](https://github.com/karpathy/autoresearch) is a minimalist Python tool designed to enable AI agents to autonomously conduct machine learning experiments.

2\. [CLI](https://github.com/googleworkspace/cli) for all of Google Workspace. Includes 40+ agent skills.

3\. [Android Bench](https://github.com/android-bench/android-bench) is a framework for benchmarking LLMs on Android development tasks.

4\. [LangWatch](https://github.com/langwatch/langwatch) is a platform for LLM evaluations and AI agent testing.

### Top Papers of The Week

1\. [Bayesian Teaching Enables Probabilistic Reasoning in Large Language Models](https://www.nature.com/articles/s41467-025-67998-6)

This paper argues that for LLMs to be used as agents that interact with users and with the world, they must construct representations of the world and form probabilistic beliefs about them. Researchers propose a Bayesian inference framework that lays out the optimal way for an agent to update its beliefs as it receives new information. Teaching LLMs to mimic the predictions of the normative Bayesian model can dramatically improve their ability to update their beliefs, and this ability generalizes to new tasks.

2\. [SkillNet: Create, Evaluate, and Connect AI Skills](https://arxiv.org/abs/2603.04448)

This paper introduces SkillNet, an open infrastructure for creating, evaluating, and organizing AI skills at scale. The lack of systematic skill accumulation and transfer hinders the long-term advancement of current AI agents. SkillNet structures skills within a unified ontology that supports creating skills from heterogeneous sources, establishing rich relational connections, and performing multi-dimensional evaluation across Safety, Completeness, Executability, Maintainability, and Cost-awareness. Experimental evaluations on ALFWorld, WebShop, and ScienceWorld demonstrate that SkillNet significantly enhances agent performance, improving average rewards by 40% and reducing execution steps by 30% across multiple backbone models.

3\. [T2S-Bench & Structure-of-Thought: Benchmarking and Prompting Comprehensive Text-to-Structure Reasoning](https://arxiv.org/abs/2603.03790)

To understand if LLMs can benefit from text structure to enhance text-processing performance, this work introduces Structure of Thought (SoT), a prompting technique that explicitly guides models to construct intermediate text structures. Building on this insight, the paper also presents T2S-Bench, the first benchmark designed to evaluate and improve models’ text-to-structure capabilities. T2S-Bench includes 1.8K samples across 6 scientific domains and 32 structural types, rigorously constructed to ensure accuracy, fairness, and quality. Evaluation of 45 mainstream models reveals substantial potential for improvement.

4\. [Helios: Real Real-Time Long Video Generation Model](https://arxiv.org/abs/2603.04379)

This paper presents Helios, a 14B video generation model that runs at 19.5 FPS on a single NVIDIA H100 GPU and supports minute-scale generation while matching the quality of a strong baseline. The model natively supports T2V, I2V, and V2V tasks, mitigates long-video drifting via targeted training strategies, compresses context to cut computation, and employs infrastructure optimizations that outperform prior short- and long-video methods.

5\. [Heterogeneous Agent Collaborative Reinforcement Learning](https://arxiv.org/abs/2603.02604)

This paper introduces Heterogeneous Agent Collaborative Reinforcement Learning (HACRL), a new learning paradigm that addresses the inefficiencies of isolated on-policy optimization. HACRL enables collaborative optimization with independent execution: heterogeneous agents share verified rollouts during training to mutually improve, while operating independently at inference time. They develop HACPO, a collaborative RL algorithm with four mechanisms that ensure unbiased advantage estimation and correct optimization. Experiments show HACPO improves all agents and outperforms GSPO by 3.3% using half the rollout cost.

### Quick Links

1\. [OpenAI releases Symphony](https://github.com/openai/symphony?tab=readme-ov-file), an open-source framework designed to manage autonomous AI coding agents through structured ‘implementation runs.’ Symphony utilizes Elixir and the Erlang/BEAM runtime to manage agent lifecycles. It is designed specifically to bridge the gap between project management tools and code execution.

2\. [Google has announced LiteRT has fully graduated into the production stack](https://developers.googleblog.com/whats-new-in-tensorflow-221/). LiteRT is now Google’s primary on-device inference framework for deploying machine learning models to mobile and edge environments. The updated runtime delivers 1.4x faster GPU performance compared to TFLite and introduces a unified workflow for NPU acceleration.

3\. [Cursor unveiled Automations](https://cursor.com/blog/automations), a system that automatically launches agents in the development environment in response to specific events: code changes, Slack messages, or a standard timer. According to the company, this allows for the review and maintenance of all new code created by agent tools without the need to track dozens of agents simultaneously.

### Who’s Hiring in AI

**[Engineering Manager, Google Pay @Google (Singapore)](https://jobs.towardsai.net/job/google-engineering-manager-google-pay-srre)**

**[AI Architect @Sedgwick (Remote/USA)](https://jobs.towardsai.net/job/sedgwick-ai-architect-5lkq)**

**[Lead AI Engineer @Webflow (Remote/USA)](https://jobs.towardsai.net/job/webflow-lead-ai-engineer-qynt)**

**[AI Analyst Intern @Logitech (Remote/USA)](https://jobs.towardsai.net/job/logitech-ai-analyst-intern-ud6k)**

**[IT Intern Intrastructure @Ascension Health (Remote/USA)](https://jobs.towardsai.net/job/ascension-health-it-intern-intrastructure-l15j)**

**[Senior Engineer — LLMOps & MLOps @Sedgwick (Remote/USA)](https://jobs.towardsai.net/job/sedgwick-senior-engineer-llmops-and-mlops-3t5r)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
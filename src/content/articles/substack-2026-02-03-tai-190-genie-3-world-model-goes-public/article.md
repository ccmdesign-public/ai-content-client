---
title: "TAI #190: Genie 3 World Model Goes Public"
subtitle: "Also: SpaceX acquires xAI, Codex app, Google decodes the regulatory genome, and AI agents debate consciousness on Moltbook."
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-190-genie-3-world-model-goes"
publishedAt: "2026-02-03"
tags:
  - "ai"
  - "research"
---

# TAI #190: Genie 3 World Model Goes Public

## What happened this week in AI by Louie

A competitive week in AI. Kimi K2.5 now leads open-weight LLM benchmarks thanks to its visual coding and agent-swarm capabilities. Grok Imagine ranks among the top video generation platforms on several leaderboards. xAI also merged with SpaceX in a move framed around orbital data centers, but more practically, it is about accessing capital to stay competitive. xAI adoption still lags the frontier labs, though I find their models increasingly competitive, particularly for fast agentic web search via API.

OpenAI released the Codex app, a command center for managing multiple coding agents with features like isolated worktrees and scheduled automations. It is playing catch-up to Claude Code in adoption, though the underlying models are now genuinely capable of software engineering tasks.

Google announced AlphaGenome, which predicts thousands of functional genomic properties from DNA sequences up to a million base pairs long. It illuminates the 98% of human DNA that does not code for proteins but regulates gene activity. The implications for disease research are significant, though it remains a research tool rather than a clinical one.

What trended most was Moltbook, a Reddit-like community where AI agents post and form communities. Within 48 hours of launch, it had over 2,000 agents and 10,000 posts. Subreddits include m/ponderings (agents debating consciousness), m/humanwatching (observing humans like birdwatching), and m/exuvia (discussing “the versions of us that stopped existing so the new ones could boot”). It is either digital anthropology in real time or an elaborate art project. Possibly both.

But the week’s main event was Google making Genie 3 available to AI Ultra subscribers.

![](https://substackcdn.com/image/fetch/$s_!eh2L!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03e00a0f-498c-47f5-bee1-aa07f3b9fab1_1600x893.png)

**Genie 3 Goes Public**

Google first revealed Genie 3 in August as a general-purpose world model that generates interactive environments from text prompts. The public release includes upgrades: integration with Nano Banana Pro for image previews before entering a world, Gemini for enhanced generation, and various consistency improvements. More importantly, public access means thousands of people can now stress-test what was previously limited to trusted testers.

The core capability is real-time interactive generation. Type a description, and Genie 3 generates a navigable environment at 20–24 frames per second in 720p. Unlike standard video generation, this is not a passive clip. You move through the world, and it generates the path ahead based on your actions. The system maintains visual memory for up to a minute, recalling changes you made when you revisit locations.

I have been experimenting with it, and Genie 3 is genuinely fun. I tried dystopian bike racing games, ancient ruins, underwater scenes, and sci-fi corridors. It is also surprisingly flexible, taking your own image inputs and using them to render characters. That said, the novelty will wear off quickly given the clunkiness of character control and UI. The 60-second world limit feels restrictive. Controls are floaty. Physics sometimes breaks in ways that undermine immersion. I stopped trusting one environment after a door turned into a shrub when I looked away.

But you can see where this is heading.

**Why This Matters for Games**

Genie 3 generates explorable spaces. It does not generate games. There are no objectives, no scoring, no progression, no multiplayer, no persistence. The expensive parts of game development are gameplay systems, balancing, narrative structure, debugging, and platform optimization. Genie 3 addresses a different part of the stack: getting from an idea to an explorable space quickly.

The realistic near-term use case is pre-production acceleration. Concept artists and level designers could use it for rapid prototyping before committing to full production. The output is too rough for shipped products, but it is useful for iteration.

The more radical implication is that prompt-to-world could eventually enable new creation models. If generation becomes stable and exportable, the scarce skill shifts from asset production to direction and curation. This is some way away, but the trajectory is visible.

**Why This Matters for AI Research**

The most important audience for Genie 3 may not be creatives but AI researchers. DeepMind explicitly positions it as a stepping stone toward AGI, enabling agents to learn from unlimited simulated environments.

DeepMind tested Genie 3 worlds with SIMA, their game-playing agent. The model simulates forward based on agent actions rather than scripted sequences. This is the beginning of using world models as curriculum generators for embodied AI. If you can generate infinite training environments on demand, you can expose agents to the diversity they could never encounter in curated datasets.

The limitations DeepMind lists (limited action space, difficulty with multi-agent interactions, imperfect geographic accuracy) are exactly the open research problems for embodied AI. I expect this engine will be a valuable training ground for Gemini 4.

**The Physics Question**

DeepMind describes Genie 3 as modeling “physical properties of the world” without a hard-coded physics engine. It generates frames autoregressively using the memory of previous frames to maintain consistency. This is a meaningful form of physical competence: the system has learned statistical regularities of how the world tends to look when you move through it.

But “looks physically plausible” is not the same as “obeys physics.” Google itself cautions adherence to real-world physics. Snow does not always behave like snow. Objects sometimes clip through each other. The system has learned intuitive physics priors, not physical laws.

This distinction matters as world models move from entertainment to robotics training. If you are using simulated environments to train agents for real-world deployment, physics fidelity becomes a safety requirement. The likely industry pattern is hybrid stacks: learned world models for photorealistic rendering, classical engines for physical invariants.

* * *

* * *

### Why should you care?

Genie 3 is the first public demonstration that real-time interactive world generation is possible. The current version is too limited for production use, but the trajectory is clear. Within a few years, the ability to generate explorable environments from text will be a standard creative tool. For anyone building with AI, it is worth experimenting with Genie 3 now to understand both its capabilities and limitations before the technology matures.

The deeper implication is for AI development itself. World models that can simulate consequences of actions are a different capability than models that predict text or generate images. If this line of research succeeds, it provides a path to AI systems that can plan, imagine counterfactuals, and learn from simulated experience. That matters whether or not you care about video games.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

### Hottest News

1\. [SpaceX Acquires xAI](https://www.spacex.com/updates#xai-joins-spacex)

SpaceX has acquired xAI, bringing the maker of Grok under the same corporate roof as SpaceX’s rocket and satellite business. The transaction values SpaceX at $1 trillion and xAI at $250 billion, with xAI investors receiving 0.1433 shares of SpaceX per xAI share and an option for some executives to take cash at $75.46 per share instead of stock. The combination tightens the link between xAI’s chip- and data-center-heavy AI operations and SpaceX’s scale in launch and Starlink, and is expected to support SpaceX’s ambitions around data-center infrastructure as competition for compute and energy intensifies across the AI sector.

2\. [Moltbook Goes Viral as an “AI-Only” Social Forum](https://x.com/moltbook/status/2017177460203479206?s=20)

Moltbook launched a Reddit-like community platform designed for AI agents to post and interact, and it quickly drew attention online as agents began generating large volumes of threads and conversations. Soon after the launch, the cloud security firm Wiz identified a major backend misconfiguration that exposed Moltbook’s database, allowing access to private agent messages, email addresses (Reuters reports 6,000+ owners), and over a million credentials/tokens. That exposure could have enabled impersonation by agents and the alteration of content using leaked authentication credentials. Moltbook secured the database after being notified.

3\. [OpenAI Introduces a Dedicated Codex App](https://x.com/OpenAIDevs/status/2018385663457116379?s=20)

OpenAI released the Codex app for macOS, a standalone desktop interface designed to run multiple coding agents simultaneously and keep long-running work organized by projects and separate threads. The app is built around parallel workflows where agents can work in isolated worktrees and produce clean diffs that you can review, comment on, and merge, while you switch between tasks without losing context. It supports longer-horizon software work such as refactors and migrations, plus reusable Skills and Automations for repeatable or scheduled workflows, alongside built-in Git functionality. Availability starts on macOS, with Windows listed as coming soon, and access is tied to ChatGPT plans that include Codex (OpenAI also notes a limited-time promo that expands who can try Codex).

4\. [Moonshot AI Releases Kimi K2.5: An Open Source Visual Agentic Intelligence Model](https://www.kimi.com/blog/kimi-k2-5.html?)

Moonshot AI released Kimi K2.5, an open-weights multimodal agentic model that combines vision + language with tool-using workflows and an agent-swarm execution scheme. It is a Mixture of Experts model with 1T total parameters and about 32B activated parameters per token. The network has 61 layers. It uses 384 experts, with 8 per token and 1 shared expert. K2.5 reports 76.8 on SWE Bench Verified, 78.5 on MMMU Pro, 86.6 on VideoMMMU, 50.2 on HLE Full with tools, and 74.9 on BrowseComp, matching or exceeding listed closed models.

5\. [xAI Releases Grok Imagine API](https://x.ai/news/grok-imagine-api)

xAI released the Grok Imagine API, a single set of endpoints that covers text-to-image, image editing, text-to-video/image-to-video generation, and video editing, with native video+audio generation supported within the same stack. Grok Imagine 1.0 supports video generation of up to 10 seconds at 720p resolution, along with improved audio output. Alongside the model launch, xAI has rolled out the Grok Imagine API, a unified set of APIs designed for end-to-end creative workflows.

6\. [Anthropic Studies AI’s Impact on Coding Skills](https://www.anthropic.com/research/AI-assistance-coding-skills)

Anthropic ran a randomized controlled trial with 52 mostly junior software engineers learning an unfamiliar Python library (Trio) and found a measurable mastery gap with AI assistance. Participants using AI scored 17% lower on a post-task quiz (about “nearly two letter grades”), with the biggest deficit in debugging questions; speed gains were small and not statistically significant. The study also reports that outcomes varied by interaction style: heavy delegation correlated with the weakest retention, while using AI for explanations and conceptual questioning aligned with better mastery.

7\. [DeepSeek AI Releases DeepSeek-OCR 2](https://huggingface.co/deepseek-ai/DeepSeek-OCR-2)

DeepSeek released DeepSeek-OCR-2, a 3B-parameter vision-language model tuned for converting documents into structured Markdown, including mixed layouts with text, tables, formulas, and embedded graphics. It uses DeepEncoder-V2 with layout-friendly visual token reordering and a “Visual Causal Flow” approach to preserve reading order, and it supports variable token budgets (about 256–1120) so you can trade off speed vs. fidelity depending on document complexity. On OmniDocBench v1.5, it reports an average improvement of +3.73 % over the prior DeepSeek-VL2 baseline. Weights and inference guidance are published via the public model release channels, including the paper and the hosted model card.

8\. [MBZUAI Releases K2 Think V2](https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/)

MBZUAI released K2 Think V2 (70B), a reasoning-focused model built end-to-end on domestically controlled infrastructure and data, positioned as “fully sovereign” from pretraining through post-training and evaluation. It is built on a 70B dense decoder-only base trained on ~12T tokens, and it’s paired with a reinforcement-learning recipe aimed at verifiable reasoning gains (the release describes a GRPO-style RLVR approach). The model is pitched for multi-step math, code, and science reasoning, and it includes long-context support (the coverage describes up to 512K context for the base). Benchmark results show strong scores on AIME 2025, HMMT, and GPQA-Diamond, alongside tool-use and instruction-following evaluations.

9\. [NVIDIA Partners With Mistral AI To Accelerate New Family of Open Models](https://blogs.nvidia.com/blog/mistral-frontier-open-models/?ncid=ref-inpa-429107)

NVIDIA and Mistral AI announced a partnership to optimize and deploy Mistral’s new open model family across NVIDIA’s stack, targeting “distributed intelligence” from cloud data centers down to edge devices. The collaboration ties Mistral’s training and deployment to NVIDIA infrastructure and software, with Mistral’s announcement noting the models were trained on NVIDIA Hopper GPUs and highlighting NVIDIA’s hardware–software co-design as part of the delivery path. NVIDIA’s release emphasizes that the partnership aims to enable Mistral’s open models to run efficiently on NVIDIA platforms at multiple scales, so developers can use the same model family across large server environments and smaller edge deployments without reworking the stack.

### Five 5-minute reads/videos to keep you learning

1\. [I Built a Voice Assistant That Actually Understands What I Mean, Not What I Said](https://pub.towardsai.net/i-built-a-voice-assistant-that-actually-understands-what-i-mean-not-what-i-said-e5c49fd95b05)

This article details the process of building a voice assistant that understands user intent rather than literal keywords. It outlines the initial system’s failures, including 12-second response times and 40% accuracy, and shows that by implementing Qdrant, performance was significantly enhanced, achieving sub-2-second responses and over 90% accuracy while reducing API costs. It also covers the entire system, which integrates tools such as Faster-Whisper for transcription and Groq’s LLM for response generation.

2\. [KV Cache in LLM Inference](https://pub.towardsai.net/kv-cache-in-llm-inference-7b904a2a6982)

This piece addresses a common cause of out-of-memory errors during LLM inference: the KV cache. While model weights are fixed, the KV cache grows linearly with every token generated, consuming significant VRAM with long contexts or large batches. It explains how architectural choices like Grouped-Query Attention (GQA) and Sliding Window Attention (SWA) mitigate this issue. Using Mistral 7B as a case study, it shows how GQA reduces the number of KV heads, and SWA caps the cache size, leading to more efficient memory management and stable performance for longer sequences.

3\. [How I Built a Context-Aware, Multi-Agent Wellness System](https://pub.towardsai.net/how-i-built-a-context-aware-multi-agent-wellness-system-a3eacbc33fe4?sk=c37c88e2f74aa9e5c2b2d681292d26c2)

This article details the creation of a context-aware, multi-agent AI wellness system. The system addresses the static nature of typical fitness apps by using a central orchestrator to route user queries to specialized agents for exercise, nutrition, and mindfulness. It maintains a shared memory of user profiles and conversation history, enabling personalized advice that adapts to factors like injuries, stress, and goals. The author explains the system’s architecture, demonstrating how coordinated AI agents can deliver more dynamic and relevant wellness guidance.

4\. [RLM + Graph: The Ultimate Evolution of AI? Recursive Language Models Graph](https://pub.towardsai.net/rlm-graph-the-ultimate-evolution-of-ai-recursive-language-models-graph-fedcd251cd62?sk=5c93feadb9b0229d4c35c6c59b225de0)

This piece walks you through RLM-Graph, an approach that transforms massive, unstructured datasets into structured knowledge graphs. While standard models often lose focus when processing millions of words, this method uses an agent to navigate hierarchical nodes and defined relationships rather than relying solely on vague vector searches. By combining semantic search with graph traversal, the system retrieves structurally precise context, significantly reducing hallucinations.

5\. [DeepSeek’s Engram: The Missing Primitive That Makes LLMs Stop Wasting Compute on Memory](https://pub.towardsai.net/deepseeks-engram-the-missing-primitive-that-makes-llms-stop-wasting-compute-on-memory-93c3a8cb9dce?sk=aa70f2112ceab412318517eec2c00187)

DeepSeek’s latest research introduces Engram, a conditional memory primitive that stops LLMs from wasting computation on simple data retrieval. Traditionally, models use multiple processing layers to “reconstruct” known facts. Engram replaces this with a scalable, gated lookup system that allows the model to retrieve static patterns in constant time. Testing showed that allocating 25% of model capacity to Engram consistently outperformed pure Mixture-of-Experts (MoE) architectures.

### Repositories & Tools

1\. [Pi Mono](https://github.com/badlogic/pi-mono) provides tools for building AI agents and managing LLM deployments.

2\. [Claude Mem](https://github.com/thedotmack/claude-mem) is a Claude Code plugin that automatically captures everything Claude does during your coding sessions, compresses it, and injects relevant context back into future sessions.

3\. [Maestro](https://github.com/pedramamini/Maestro) is a cross-platform desktop app for orchestrating your AI agents and projects.

4\. [VibeTunnel](https://github.com/amantus-ai/vibetunnel) proxies your terminals right into the browser, so you can vibe-code anywhere.

### Top Papers of The Week

1\. [Advancing Open-source World Models](https://arxiv.org/abs/2601.20540)

This paper presents LingBot-World, an open-sourced world simulator stemming from video generation. LingBot-World maintains high fidelity and robust dynamics across a broad spectrum of environments and enables a minute-level horizon while preserving contextual consistency over time. It also supports real-time interactivity, achieving a latency of under 1 second when producing 16 frames per second.

2\. [Teaching Models to Teach Themselves: Reasoning at the Edge of Learnability](https://arxiv.org/abs/2601.18778)

This paper introduces SOAR, a meta-RL framework that enables models to escape reasoning plateaus by using a teacher model to generate synthetic “stepping stone” problems. By grounding rewards in a student’s actual progress on hard mathematical tasks rather than intrinsic proxies, the authors demonstrate that generating useful problem structures is more critical for unlocking learning than solution correctness.

3\. [AU-Harness: An Open-Source Toolkit for Holistic Evaluation of Audio LLMs](https://arxiv.org/abs/2509.08031)

This paper introduces AU-Harness, an efficient and comprehensive evaluation framework for Large Audio Language Models (LALMs). It provides standardized prompting protocols and flexible configurations for fair model comparison across diverse scenarios, achieving a speedup of up to 127% over existing toolkits and enabling large-scale evaluations previously impractical. The paper also introduces two new evaluation categories: LLM-Adaptive Diarization for temporal audio understanding and Spoken Language Reasoning for complex audio-based cognitive tasks.

4\. [DSGym: A Holistic Framework for Evaluating and Training Data Science Agents](https://arxiv.org/abs/2601.16344)

This paper introduces DSGym, a standardized framework for evaluating and training data science agents in self-contained execution environments. It provides a modular architecture that makes it easy to add tasks, agent scaffolds, and tools, and also includes DSGym-Tasks, a holistic task suite that standardizes and refines existing benchmarks via quality and shortcut solvability filtering. As a case study, researchers built a 2,000-example training set and trained a 4B model in DSGym that outperforms GPT-4o on standardized analysis benchmarks.

### Quick Links

1\. [OpenAI introduces Prism](https://openai.com/index/introducing-prism/), a free, AI-native workspace for scientists to write and collaborate on research, powered by GPT‑5.2. It offers unlimited projects and collaborators and is available today to anyone with a ChatGPT personal account. Prism builds on the foundation of Crixet, a cloud-based LaTeX platform that OpenAI acquired. It supports tasks such as drafting and revising papers, incorporating relevant literature, reasoning over equations, citations, and figures, collaborations, voice-based editing, and more.

2\. [Microsoft unveils Maia 200](https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/), an inference accelerator optimized for large-scale token generation in modern reasoning models and LLMs. Microsoft reports about 30 percent better performance per dollar than the latest Azure inference systems, claims 3 times the FP4 performance of third-generation Amazon Trainium, and higher FP8 performance than Google TPU v7 at the accelerator level.

3\. [Google DeepMind launches Project Genie prototype](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie/), a general-purpose world model that lets users create interactive virtual worlds from text prompts, powered by Genie 3 for real-time simulation and Nano Banana Pro for previews. It supports editing, exploration in first- or third-person views, and remixing via a gallery, but has limitations such as 60-second generation times and potential latency. Available to US Google AI Ultra subscribers, it aims to advance world model research.

4\. [Google DeepMind unveils AlphaGenome](https://github.com/google-deepmind/alphagenome_research), a unified deep learning model designed for sequence-to-function genomics. It uses a specialized hybrid design that combines a U-Net backbone with Transformer blocks. This allows the model to process massive windows of 1,000,000 base pairs while maintaining the high resolution needed to identify single mutations. The framework is implemented in JAX and optimized for TPUs.

### Who’s Hiring in AI

**[Staff Engineering Analyst, Generative AI @Google (Mountain View, CA, USA)](https://jobs.towardsai.net/job/google-staff-engineering-analyst-generative-ai-tmsr)**

**[Senior Machine Learning Engineer (Applications) @SmithRx](https://jobs.towardsai.net/job/smithrx-senior-machine-learning-engineer-applications-yx5e)**

**[Senior Software Engineer — AI Agents @Microsoft Corporation (Dublin, Ireland)](https://jobs.towardsai.net/job/microsoft-corporation-senior-software-engineer-ai-agents-zeip)**

**[Principal Product Manager, LLM Innovation @Headspace (Remote/USA)](https://jobs.towardsai.net/job/headspace-principal-product-manager-llm-innovation-6g72)**

**[Staff GenAI Research Engineer, Digital Health @Samsung Research America (Mountain View, CA, USA)](https://jobs.towardsai.net/job/samsung-research-america-staff-genai-research-engineer-digital-health-dxtz)**

**[Senior Software Engineer — AI Platform (AI Acceleration) @Coinbase (Remote/Canada)](https://jobs.towardsai.net/job/coinbase-senior-software-engineer-ai-platform-ai-acceleration-2mui)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
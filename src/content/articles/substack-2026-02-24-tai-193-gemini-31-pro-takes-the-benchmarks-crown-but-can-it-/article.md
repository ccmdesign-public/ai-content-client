---
title: "TAI #193: Gemini 3.1 Pro Takes the Benchmarks Crown, but Can it Catch Up in the Tools Race?"
subtitle: "Also, Claude Sonnet 4.6, Google Lyria 3, Qwen 3.5, Zyphra ZUNA, and NVIDIA DreamDojo."
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-193-gemini-31-pro-takes-the-benchmarks"
publishedAt: "2026-02-24"
tags:
  - "ai-general"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.558Z"
---

# TAI #193: Gemini 3.1 Pro Takes the Benchmarks Crown, but Can it Catch Up in the Tools Race?

## What happened this week in AI by Louie

Google DeepMind released Gemini 3.1 Pro on February 19th, and the benchmark results are hard to argue with. On Artificial Analysis’s Intelligence Index, it sits at #1 with a score of 57, ahead of Claude Opus 4.6 (53) and GPT-5.2 (51), leading on 12 of 18 tracked benchmarks. On ARC-AGI-2, the abstract reasoning test that has become a proxy for novel problem-solving, it scored 77.1%, more than doubling Gemini 3 Pro’s 31.1% from three months ago and pulling nearly 10 points clear of Opus 4.6 (68.8%). Last July, Grok 4 made headlines, hitting 16.0% on the same benchmark. Six months later, Gemini 3 Pro reached 31.1%. Now, 77.1%. The trajectory suggests that latent reasoning architectures, where the model generates hidden chains of thought before producing output, are yielding compounding returns on abstract logic tasks specifically. Whether this translates into equivalent gains on practical, open-ended work is a different question.

The broader results reinforce the picture. On GPQA Diamond (doctoral-level science), Gemini 3.1 scored 94.3% vs. Opus 4.6’s 91.3% and GPT-5.2’s 92.4%. On Terminal-Bench 2.0 for agentic terminal workflows, 68.5% vs. Opus 4.6’s 65.4% and GPT-5.2’s 54.0%. On LMSYS Chatbot Arena, Gemini 3.1 Pro now sits in a statistical dead heat with Opus 4.6 at the top of the overall text leaderboard (1500 vs. 1505 Elo) and comfortably ahead of GPT-5.2 (1478). In the Vision category, Gemini models hold the top three spots outright.

![](https://substackcdn.com/image/fetch/$s_!P6V1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4b283914-40ab-4838-a892-392d4be58ac7_1600x775.png)

Perhaps the most underappreciated improvement is hallucination resistance. On Artificial Analysis’s AA-Omniscience benchmark, Gemini 3.1 Pro reduced its hallucination rate by 38 percentage points compared to Gemini 3 Pro Preview, dropping from 88% to 50%. Its hallucination resistance score of 30 is more than twice the next-best score of 13. For anyone who has used earlier Gemini models for research or factual work, this is a noticeable change in daily use.

The model keeps the 1M-token input context window and increases the output limit to 65,536 tokens, resolving the severe output truncation that plagued earlier Gemini 3 models. Developers reported that Gemini 3 Pro cut off at roughly 21,000 output tokens; 3.1 Pro has been stress-tested to beyond 55,000 tokens of continuous, unbroken output. API pricing stays at $2/$12 per million input/output tokens, roughly half the blended cost of Opus 4.6. Google also released a specialized gemini-3.1-pro-preview-customtools endpoint optimized for autonomous agent behavior.

**Where Gemini falls short**

On GDPval-AA, which measures real-world knowledge work across 44 occupations, Gemini 3.1 Pro scores 1317 Elo. Claude Sonnet 4.6 scores 1633. Opus 4.6 scores 1606. GPT-5.2 scores 1462. That is a 300+ point deficit to Anthropic’s models on the tasks that most white-collar professionals do all day: drafting reports, analyzing data, writing communications, and building presentations. On enterprise knowledge work, Anthropic and OpenAI remain clearly ahead.

This points to a broader issue I keep coming back to: the tools gap. We now use Gemini models regularly at Towards AI. In my view, its image understanding is the best available. Its SVG and frontend code generation is unmatched, with Gemini 3.1 Pro leading SVG Arena at Elo 1421, a 95-point lead over Opus 4.6. Its coding ability is genuinely strong; the Terminal-Bench 2.0 lead and LiveCodeBench Pro Elo of 2887 are serious numbers. And for long-context research, the 1M token window with 84.9% retrieval accuracy on MRCR v2 at 128k tokens is hard to beat.

But Google has been falling behind on what the chatbot can actually do for you beyond the chat window. Claude can create .pptx files, .xlsx spreadsheets with working formulas, and .docx documents. It can operate your computer through Cowork and Claude in Chrome. OpenAI has Codex agents, Canvas, and a growing tool suite. Google’s Gemini app still feels like a chat interface. You get text, images via Imagen, and now music via Lyria 3. But you cannot hand Gemini a dataset and get back a working spreadsheet. You cannot ask it to build a slide deck. You cannot point it at your desktop and say, “Organize this.”

There is also a persistent gap between the model available in AI Studio and the one in the Gemini app. Even with an Ultra subscription ($250/month), the consumer app often feels weaker than the API. I have run the same prompts in both environments and gotten noticeably better results from AI Studio. This undermines the value proposition of the paid tiers and is a recurring complaint in developer communities.

For coding, ease of use still tilts toward Claude Code and Codex despite Gemini’s strong raw capability. With Claude Code, you open your terminal, point it at a repo, and start delegating. Gemini’s coding capabilities shine brightest in AI Studio with high reasoning enabled, but the developer experience is less polished. Google’s response, Antigravity (an agent-first IDE built as a VS Code fork), is conceptually ambitious but early: documented bugs include system prompt leaks, infinite execution loops, and contextual amnesia with multi-turn document uploads.

In other news, Anthropic also released Claude Sonnet 4.6 two days before Gemini, with a 1M-token context window (beta), adaptive thinking, and 79.6% on SWE-bench Verified at $3/$15 per million tokens.

Also in the news: Google launched Lyria 3, a music generation model now available in the Gemini app. Alibaba released Qwen 3.5 (397B MoE, 17B active, open weights). NVIDIA introduced DreamDojo, an open-source robot world model. Zyphra released ZUNA, a BCI foundation model for EEG reconstruction.

* * *

* * *

### Why should you care?

Gemini 3.1 Pro is the strongest model on raw benchmarks this week. The ARC-AGI-2 score is a genuine leap. The hallucination reduction is practically meaningful. The coding and science capabilities are at the frontier. And it costs roughly half as much per token as Opus 4.6.

In production, the picture is different. I think Google has the best raw AI engine right now, but it isn’t fully leveraging it. The gap between Gemini’s model intelligence and the Gemini app’s utility is the widest in the industry. The model that wins on GPQA Diamond is not the same as the one that wins your workflow. At Towards AI, we use Gemini regularly for image analysis and long-context research, where it is clearly the best tool. But when I need to produce a deliverable, a report, a spreadsheet, a presentation, I reach for Claude. When I need to write code against a real codebase, I open Claude Code or Codex. The distance between “smartest model” and “most useful model” has never been wider. Google needs to close this gap or risk losing paying users who conclude the app is not worth it.

For practitioners, the takeaway is that no single model dominates all use cases. We use all three at Towards AI daily, and the people getting the most value from AI are the ones who know which model to reach for and when.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

We just launched something that changes how you build agentic systems.

Our newest FREE course, **[Agentic AI Engineering Guide: 6 Mistakes Developers Make When Building Agents](https://email-course.towardsai.net/?utm_source=TAInewsletter&utm_medium=banner&utm_campaign=2026_subscribers_nostart_signup_glb&utm_id=freeemailcourse)**, distills 3+ years of production failures into the exact patterns separating demos from reliable systems.

Built in partnership with Paul Iusztin, this 6-day *free* email course teaches you what most engineers never learn: how to design, evaluate, and operate probabilistic systems as *systems*.

**If you’ve experienced any of these:**

-   Agents that work in demos but drift in production
    
-   Changes feel risky, and you can’t predict what breaks
    
-   Costs spike with no clear explanation
    
-   Infinite loops and random decisions
    
-   Every release needs slow manual QA
    

This course shows you exactly how to fix them.

**Here’s how it works:**

Sign up free → Get Lesson #1 immediately → One lesson daily for 6 days → Apply to your systems as you learn

**[→ Get your first lesson now (free)](https://email-course.towardsai.net/?utm_source=TAInewsletter&utm_medium=banner&utm_campaign=2026_subscribers_nostart_signup_glb&utm_id=freeemailcourse)**

* * *

### Hottest News

1\. [Anthropic Releases Claude 4.6 Sonnet](https://www.anthropic.com/news/claude-sonnet-4-6)

Anthropic announced Claude Sonnet 4.6 with upgrades across coding, computer use, long-context reasoning, agent planning, knowledge work, and design workflows. The model adds Adaptive Thinking and introduces a 1M-token context window (beta). Anthropic reports 79.6% on SWE-bench Verified for coding, and 72.5% on OSWorld for computer-use tasks. Claude Sonnet 4.6 is available across all Claude plans, as well as Claude Cowork and Claude Code. Alongside the model release, Anthropic also introduced Improved Web Search with Dynamic Filtering, which uses internal code execution to verify facts in real time.

2\. [Google AI Releases Gemini 3.1 Pro](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/)

Google is rolling out Gemini 3.1 Pro, the first version update in the Gemini 3 series. Gemini 3.1 Pro Preview keeps the 1M-token input window and increases the output limit to 65K tokens. Google reports 77.1% on ARC-AGI-2, more than double earlier versions, and 94.1% on GPQA Diamond for graduate-level science reasoning. Google also introduced a specialized gemini-3.1-pro-preview-customtools endpoint, optimized to prioritize bash commands and system tools for more reliable autonomous agent behavior. In the Gemini app, Gemini 3.1 Pro is rolling out with higher limits for Google AI Pro and Ultra users.

3\. [Alibaba Launches Qwen 3.5](https://qwen.ai/blog?id=qwen3.5)

Alibaba’s Qwen team introduced Qwen3.5–397B-A17B as the first open-weight model in the new Qwen3.5 series. The release uses a hybrid architecture that combines linear attention (via Gated Delta Networks) with a sparse mixture-of-experts design, with 397B total parameters and 17B active parameters. It also expands language and dialect coverage from 119 to 201. The team’s hosted model, Qwen3.5-Plus, is listed with a 1M context window by default and official built-in tools with adaptive tool use. Qwen 3.5 achieves 87.8 on MMLU-Pro, 88.4 on GPQA, 83.6 on LiveCodeBench v6, 72.9 on BFCL-V4, and 48.3 on HLE with tools. The model is available as open weights on Hugging Face.

4\. [Zyphra Releases ZUNA](https://www.zyphra.com/post/zuna)

Zyphra released ZUNA, a 380M-parameter BCI foundation model designed to reconstruct, denoise, and upsample EEG data across arbitrary channel layouts. It is trained on roughly 2 million channel-hours of EEG from a broad set of public datasets. ZUNA is built to improve on long-standing interpolation methods used when EEG channels are missing or noisy, and Zyphra reports that it consistently outperforms spherical-spline interpolation across benchmarks, including ANPHY-Sleep and BCI2000 motor imagery. The model is aimed at researchers, clinicians, and BCI developers and is released under the Apache 2.0 license.

5\. [Google DeepMind Releases Lyria 3](https://deepmind.google/models/lyria/)

Google introduced Lyria 3, its latest music generation model, built to produce complex, multi-layer arrangements with vocals and instruments at 48 kHz. A key improvement is greater musical consistency throughout a track, with stronger continuity in melody, rhythm, and style. Lyria 3 is now available in the Gemini app, where users can generate a 30-second music track from a text prompt or an uploaded image.

6\. [NVIDIA Releases DreamDojo](https://arxiv.org/abs/2602.06949)

NVIDIA introduced DreamDojo, a fully open-source robot world model designed for generalizable robotics simulation and control. It is pretrained on DreamDojo-HV, a large egocentric human-video dataset containing 44,711 hours of footage across 6,015 tasks and 9,869 scenes. To translate human video into signals useful for robotics, NVIDIA developed a continuous latent action representation using a spatiotemporal Transformer VAE that extracts actions directly from pixels. NVIDIA also reports a Self-Forcing distillation pipeline that runs at 10.81 FPS in real time and improves context consistency, supporting interactive use cases such as live teleoperation and stable long-horizon simulations lasting over a minute.

### Five 5-minute reads/videos to keep you learning

1\. [WebMCP: Don’t Screenshot Browsers! A New Browser Protocol for LLMs](https://pub.towardsai.net/webmcp-dont-screenshot-browsers-a-new-browser-protocol-for-llms-9da94e974ff5?sk=fdd06abb08bef65299173004f863bc92)

This article explains WebMCP (Web Model Context Protocol), a new browser standard to streamline how AI agents interact with websites. It walks through the protocol’s declarative and imperative APIs, showing how each one handles different levels of browser interaction. The piece also covers implementation trade-offs and explores how this shift may create a new layer of AI optimization (AIO) for websites.

2\. [You Can’t Improve AI Agents If You Don’t Measure Them](https://pub.towardsai.net/you-cant-improve-ai-agents-if-you-don-t-measure-them-7b799fd2a22e?sk=431ed54516bd6208fbb7fce7412751a3)

This article argues that improving AI agents requires measurable evaluation, not intuition or subjective impressions. It introduces agent-eval, Vercel’s open-source framework for running controlled, repeatable experiments on AI coding agents. The piece shows how developers can define tasks, isolate them in sandboxes, and set explicit success criteria to generate clear pass-rate metrics.

3\. [Building an AI Agent with Long-Term Memory: ChromaDB + Ollama + TypeScript](https://pub.towardsai.net/building-an-ai-agent-with-long-term-memory-chromadb-ollama-typescript-c642386c6643?sk=cef8d2be28ded19c630a37b49336a7d7)

This article walks through a prototype customer support agent that uses semantic long-term memory to retain information across sessions. It addresses the common problem of agents forgetting past interactions by combining ChromaDB for vector storage, Ollama for local model inference, and a TypeScript API layer. The system extracts key facts from conversations, stores them as embeddings, and retrieves relevant memories through semantic similarity search.

4\. [Building a Multi-Agent Workflow for Vendor Management with Qdrant](https://pub.towardsai.net/building-a-multi-agent-workflow-for-vendor-management-with-qdrant-72e724c519b1)

This project shows how to build a vendor management system that uses an LLM to interpret natural-language requests and Qdrant to execute semantic + structured retrieval across linked business data. It handles queries such as finding laptops under a price cap while accounting for related product, vendor, and invoice records. The article walks through the full pipeline, from generating realistic sample data to building the multi-agent query workflow.

5\. [Microsoft Fabric IQ vs Snowflake Cortex vs Databricks Unity Catalog: The Enterprise Ontology Architecture Decision Framework for 2026](https://pub.towardsai.net/microsoft-fabric-iq-vs-snowflake-cortex-vs-databricks-unity-catalog-the-enterprise-ontology-21457d9ed831?sk=d83ecce42b2e26f9f23d07ac57e55bec)

This analysis compares how Microsoft Fabric IQ, Snowflake Cortex, and Databricks Unity Catalog approach semantic intelligence for enterprise AI. It breaks down each platform’s core architecture: Fabric IQ as an ontology-first system for business-led transformation, Snowflake Cortex as a semantic inference layer for SQL-centric teams, and Unity Catalog as a lineage-centered foundation for ML-driven organizations. The article argues that platform choice should align with organizational structure and ownership of AI initiatives, rather than relying solely on feature checklists.

### Repositories & Tools

1\. [PageIndex](https://github.com/VectifyAI/PageIndex) is a document-analysis agent platform built for long documents.

2\. [Skills](https://github.com/huggingface/skills) are interoperable definitions for AI/ML tasks like dataset creation, model training, and evaluation.

3\. [PentAGI](https://github.com/vxcontrol/pentagi) is an automated security testing platform that uses AI to perform complex penetration testing tasks.

4\. [Claude Bin](https://github.com/wunderlabs-dev/claudebin.com) is a minimalistic tool for publishing and sharing Claude coding sessions.

5\. [GitNexus](https://github.com/abhigyanpatwari/GitNexus) is a client-side knowledge graph creator that runs entirely in your browser.

### Top Papers of The Week

1\. [GLM-5: from Vibe Coding to Agentic Engineering](https://arxiv.org/abs/2602.15763)

This paper presents GLM-5, a next-generation foundation model that shifts from vibe coding to agentic engineering by strengthening agentic, reasoning, and coding capabilities. The model adopts DSA to cut training and inference costs while preserving long-context fidelity. Researchers build an asynchronous reinforcement learning infrastructure and novel agent RL algorithms, enabling efficient long-horizon learning and state-of-the-art performance on open benchmarks and real-world end-to-end software engineering tasks.

2\. [Think Deep, Not Just Long: Measuring LLM Reasoning Effort via Deep-Thinking Tokens](https://arxiv.org/abs/2602.13517)

This research quantifies inference-time effort by identifying deep-thinking tokens (tokens where internal predictions undergo significant revisions). Across four mathematical and scientific benchmarks and a diverse set of reasoning-focused models, it shows that deep-thinking tokens consistently exhibit positive correlation with accuracy, substantially outperforming both length-based and confidence-based baselines. Using this insight, the paper introduces Think@n, a test-time scaling strategy that prioritizes samples with high deep-thinking ratios.

3\. [Experiential Reinforcement Learning](https://www.arxiv.org/abs/2602.13949)

This paper introduces Experiential Reinforcement Learning (ERL), a training paradigm that embeds an explicit experience-reflection-consolidation loop into the reinforcement learning process. When given a task, the model generates an initial attempt, receives environmental feedback, and produces a reflection that guides a second attempt, whose success is reinforced and internalized into the base policy. This process converts feedback into structured behavioral revision, improving exploration and stabilizing optimization while preserving gains at deployment without additional inference cost.

4\. [How Much Reasoning Do Retrieval-Augmented Models Add beyond LLMs?](https://www.arxiv.org/abs/2602.10210)

The paper introduces HYBRIDRAG-BENCH, an automated framework for constructing benchmarks to evaluate retrieval-intensive, multi-hop reasoning over hybrid knowledge. It automatically couples unstructured text and structured knowledge graph representations derived from recent scientific literature on arXiv, and generates knowledge-intensive question-answer pairs grounded in explicit reasoning paths. Experiments across three domains (artificial intelligence, governance and policy, and bioinformatics) show that HybridRAG-Bench rewards genuine retrieval and reasoning rather than parametric recall.

### Quick Links

1\. [OpenAI is reportedly finalizing a $100B funding deal](https://www.bloomberg.com/news/articles/2026-02-19/openai-funding-on-track-to-top-100-billion-with-latest-round) at a valuation above $850B. Bloomberg reports that the financing is nearing completion, citing sources familiar with the matter. The first funding tranches are reportedly expected to come from Amazon, NVIDIA, SoftBank, and Microsoft. If completed, the deal would mark one of the largest capital raises in the AI sector to date.

2\. [Google launched Photoshoot in Pomelli](https://blog.google/innovation-and-ai/models-and-research/google-labs/pomelli-photoshoot/), a new feature that uses business context and Nano Banana image generation to turn product images into professional studio-style shots. Users choose a template that matches their product, and Pomelli automatically generates the final image. The feature is designed to streamline product photography workflows by producing polished marketing visuals from existing product images.

3\. [Cohere released Tiny Aya](https://cohere.com/blog/cohere-labs-tiny-aya), a 3.35B-parameter model family built for translation and multilingual generation across 70 languages. The models are designed to run efficiently on edge devices, with reported speeds of about 10 tokens/sec on an iPhone 13 and 32 tokens/sec on an iPhone 17. Cohere also reports that Tiny Aya Global outperforms competing models, such as Gemma3–4B, on translation quality across 46 of 61 languages in WMT24++.

### Who’s Hiring in AI

**[Head of Developer Education, Kiro @Amazon (Seattle, WA, USA)](https://jobs.towardsai.net/job/amazon-head-of-developer-education-kiro-pkkt)**

**[AI/ML Internship — Summer 2026 @CACI International (Denver, CO, USA)](https://jobs.towardsai.net/job/caci-international-ai-machine-learning-internship-summer-2026-k0rn)**

**[Senior Full Stack Engineer, AI & Data Products @Rocket Money (Remote/USA)](https://jobs.towardsai.net/job/rocket-money-senior-full-stack-engineer-ai-and-data-products-g4dz)**

**[Agentic AI Researcher @RTX Corporation (Hartford, CT, USA)](https://jobs.towardsai.net/job/rtx-corporation-agentic-ai-researcher-8fgn)**

**[Open Source LLM Clinical Research Pipeline Master’s Intern @Kaiser Permanente (Hybrid Remote/USA)](https://jobs.towardsai.net/job/kaiser-permanente-open-source-llm-clinical-research-pipeline-masters-intern-bkbz)**

**[Data Engineer (AWS) @NTT DATA North America (Guadalajara, Mexico)](https://jobs.towardsai.net/job/ntt-data-north-america-data-engineer-aws-gknf)**

**[Software Developer @General Dynamics Information Technology (Baton Rouge, LA, USA)](https://jobs.towardsai.net/job/general-dynamics-information-technology-software-developer-wmje)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
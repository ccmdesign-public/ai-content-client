---
title: "TAI #194: AI Goes Macro; Job Loss Fears, Military Usage, OpenAI $110B Raise"
subtitle: "Also, launching Towards AI’s new Agents course"
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-194-ai-goes-macro-job-loss-fears"
publishedAt: "2026-03-03"
tags:
  - "ai"
  - "research"
---

# TAI #194: AI Goes Macro; Job Loss Fears, Military Usage, OpenAI $110B Raise

## What happened this week in AI by Louie

This week brought a series of developments that signal AI is quickly becoming more than just a technology story: AI’s revenue, its politics, and its labor market consequences are now operating at a scale that reshapes the global economy and the geopolitical order in real, measurable ways.

**AI, the Pentagon, and the Claude Surge.**

AI is increasingly critical to US military operations. OpenAI signed a contract with the Department of Defense to deploy its models on classified networks. Hours later, the Trump administration designated Anthropic a “supply chain risk” and directed agencies to stop using Claude, widely interpreted as retaliation for Anthropic’s refusal to lift its safety guardrails for unrestricted military use. Meanwhile, reports emerged that Claude was allegedly used, together with Palantir, during the capture of Venezuela’s then-president Nicolás Maduro in January and again to assist with intelligence assessment during strikes against Iran.

I agree with the red lines Anthropic has laid out: no mass surveillance, no autonomous weapons without a human in the loop. Dario Amodei seems more serious about enforcing those boundaries than any other lab CEO, and his willingness to absorb real commercial and political cost to hold that line is notable. That said, the broader question is genuinely complex. Should unelected AI CEOs be drawing the boundaries of how military AI gets used? In principle, that is a job for elected governments. But existing laws were not written with these AI capabilities in mind, and governments have shown little urgency to update them. Until they do, the defaults are being set by a handful of companies in San Francisco.

Public backlash against OpenAI’s Pentagon deal appears to have driven a spike in downloads of Claude. Anthropic’s app hit number one on the Apple App Store, and the resulting surge in demand contributed to a major Claude outage on Monday that lasted nearly three hours, following a minor disruption on February 28. GPU and inference capacity are already binding constraints, and we are nowhere near the usage levels many AI economic scenarios assume.

**OpenAI Raises $110 Billion.**

OpenAI closed a $110 billion funding round, the largest private financing in history, from Amazon ($50B), Nvidia ($30B), and SoftBank ($30B), at a pre-money valuation of $730 billion. Capital flowing into AI infrastructure is now reaching a scale that shows up in macro aggregates. Between this fundraise, continued $150–200 billion in hyperscaler data center capex per quarter, and SoftBank’s Stargate commitments, AI investment is becoming a material driver of GDP in its own right. The question is whether the productivity gains this infrastructure enables will circulate broadly through the economy, or concentrate in a handful of firms.

**Citrini’s “2028 Global Intelligence Crisis” and the AI Job Loss Debate.**

A blog post from CitriniResearch titled “The 2028 Global Intelligence Crisis” went extremely viral recently, reportedly accumulating around 16 million views. The piece is written as a fictional macro memo from June 2028, looking back on how AI-driven white-collar job displacement triggered a cascade of economic and financial consequences: mass layoffs leading to reduced consumer spending, a collapsing SaaS sector, private credit defaults, and eventually stress in the $13 trillion US mortgage market as high-income borrowers lose their jobs.

The thesis: AI capabilities improve, companies lay off white-collar workers and reinvest savings into more AI; displaced workers spend less; companies under revenue pressure invest even more in AI to cut costs; and the cycle accelerates. Citrini calls this the “human intelligence displacement spiral.” The piece also describes how agentic commerce erodes the moats of intermediary businesses (DoorDash, Mastercard, insurance brokers, real estate agents) as AI agents are put in charge of your shopping, optimizing for price rather than habit, effectively destroying the “friction premium” that underpins trillions of dollars of enterprise value.

Stocks named in the essay, including Uber, DoorDash, American Express, and Mastercard, sold off in the days following the post’s spread. IBM dropped sharply. Reception from economists was mixed, and the piece got plenty of pushback, but the scenario clearly struck a nerve because it stitched together several anxieties investors already had: AI as a margin tailwind in the short run, and AI as a demand and business-model headwind if labor income gets hit hard enough.

I think the Citrini thesis is a feasible, low-probability possibility, but with some important caveats.

The stock market story and the economic story are two different things. Global labor income is roughly $60 trillion, compared with current S&P 500 profits of $2–2.5 trillion. There is a huge amount of slack in AI-beneficiary names soaking up profit from labor, leading to higher S&P levels, even if GDP falls significantly. The usual intuition that “stocks track the economy” can fail when the economy’s scarce factor shifts from labor to compute. In these scenarios, AI labs will likely have to keep spinning off divisions and vertical platforms to maintain some diversity in the indexes, because you cannot have 5–10 companies making up 90% of market capitalization without structural pressure to break them up.

The “technological innovation destroys jobs and then creates even more” line does not hold as a default assumption this time. It has been right for two centuries because every new job required a human to perform it. With general-purpose AI, many of the “new categories” are also automatable, often faster than institutions can train for and professionalize them. There will definitely be human roles that appear or grow significantly for a while, but they may only be a fraction of what gets replaced. One scenario for job growth to offset job losses is if GDP grows multiple times its current level. That seems to be Elon Musk’s primary scenario: one new human job for every nine new AI jobs can still lead to full employment if the total economy is large enough. That is feasible. But the middle ground, where there are neither huge job losses nor an unprecedented economic boom, does not seem very likely to me.

Citrini’s network effects and platform-disruption point are also interesting. Agents definitely reduce the friction that gives incumbents their brand and habitual usage advantages. An AI agent choosing the best delivery app has no home-screen loyalty. But for many businesses, there are still large fixed-cost advantages and utilization-rate economics that favor the largest network. A company with 50% margins from scale can survive a world where newcomers sell at the same price while making a loss, even with software costs near zero. This depends heavily on the business, though. That advantage does not help Uber or DoorDash nearly as much as it helps an infrastructure provider or a marketplace with exclusive supply.

GPU capacity will likely be the primary bottleneck to Citrini’s scenario playing out at speed. We are already seeing Claude crash this week due to increased usage, and Gemini has had its own scaling issues. However, it is not impossible to see 100x-plus breakthroughs in inference efficiency, particularly if AI starts making its own breakthroughs in designing and testing new model architectures and inference systems. Compute is a brake today. It is not a guaranteed brake for 2027–2028.

The Citrini thesis got some partial vindication this week with Block’s announcement that it is cutting roughly 4,000 employees, nearly half its workforce. CEO Jack Dorsey was explicit that the cuts are AI-driven, saying the intelligence tools they are building “fundamentally change what it means to build and run a company.” He predicted that within the next year, most companies will reach the same conclusion and make similar structural changes. Block’s stock soared as much as 24% on the news. This is the pattern Citrini describes: layoffs expand margins, earnings beat, stocks rally. Each company’s response is rational. The collective result is the displacement spiral that makes the scenario so uncomfortable.

* * *

* * *

### Why should you care?

Here is where I think we actually stand. Human expertise is vital to nearly all AI usage today, and it will be for some time. The models are powerful, but they are not autonomous. They need people who understand the domain, can evaluate their outputs, can architect the workflows, and can catch the failures before they reach production.

However, I see a very real risk that AI-first employees can be 2–3x more productive, with higher-quality output, than those who resist using AI. Many companies will channel that productivity into building more products, running more security checks, and expanding into new markets. But many will hit other bottlenecks to growing output, and for those companies, the surplus productivity translates directly into headcount reduction. AI-slow adopters are at high risk of redundancy across a very large number of careers in the near future.

That said, enterprise adoption is still slow. AI engineers and forward-deployed engineers will be critically needed to customize agents and workflows for specific enterprise contexts. True adoption take off requires people who can bridge the gap between raw model capability and production-grade reliability.

The main bottlenecks to AI adoption are likely to be AI compute, as we can see from the Claude and Gemini scaling issues this week, but also AI engineers with the expertise to build and deploy enterprise-tier agents. The models are ready. The infrastructure is strained. The human talent to wire it all together is in short supply.

On that note, 2025 gave us agent hype. It did not give us a reliable way to build them. Most developers are still guessing at tools, wiring, and how to catch failures before users do. Fortunately, we have a new course to fill this gap!

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

We spent 9 months building, breaking, and stress-testing two real-agent systems, with feedback from 180+ developers.

The result is **[Agentic AI Engineering](https://academy.towardsai.net/courses/agent-engineering?utm_source=TAI&utm_medium=sponsor+section&utm_campaign=2026_subscribers_nostart_buy_glb&utm_id=agentcourse),** our newest course built to teach operational reliability: **measurable quality (evals), inspectable behavior (observability), and controlled autonomy** (clear boundaries + robust tool/workflow engineering).

You’ll build a **Research Agent** and a **Writing Workflow** end-to-end, and you’ll ship them with the parts that make agents usable in 2026: evaluation datasets and pass/fail checks, LLM judges, tracing, monitoring, and the workflow glue that keeps tools, state, and outputs from turning into chaos.

![](https://substackcdn.com/image/fetch/$s_!s0Ac!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe74ff34d-2f0b-4abd-ab16-c5772f03396a_1200x1200.gif)

The first 100 early-bird seats sold out in under a week. The next 100 seats are **$499** (the lowest price after the early bird). Lifetime access, Discord community, and a 30-day refund.

**[Get access now!](https://academy.towardsai.net/courses/agent-engineering?utm_source=TAI&utm_medium=sponsor+section&utm_campaign=2026_subscribers_nostart_buy_glb&utm_id=agentcourse)**

* * *

### Hottest News

1\. [US Bars Anthropic Products From Agencies, Contractors](https://www.bloomberg.com/news/articles/2026-02-27/trump-orders-us-government-to-drop-anthropic-after-pentagon-feud)

The Pentagon declared Anthropic PBC a supply-chain risk after President Donald Trump directed US government agencies to stop using its products. Defense Secretary Pete Hegseth ordered the Pentagon to bar its contractors and their partners from any commercial activity with Anthropic, giving the company six months to hand over AI services to another provider. This wipes out as much as $200 million in work that Anthropic had agreed to do for the military, along with smaller but important contracts for civilian agencies, including the State Department. In its statement on Friday, Anthropic said being labeled a supply-chain risk “would both be legally unsound and set a dangerous precedent for any American company that negotiates with the government.”

2\. [OpenAI Raises $110B in One of the Largest Private Funding Rounds in History](https://techcrunch.com/2026/02/27/openai-raises-110b-in-one-of-the-largest-private-funding-rounds-in-history/)

OpenAI has raised $110 billion in private funding, commencing one of the largest private funding rounds in history. The new funding consists of a $50 billion investment from Amazon as well as $30 billion each from Nvidia and SoftBank, against a $730 billion pre-money valuation. As part of the investment, OpenAI is launching significant infrastructure partnerships with both Amazon and Nvidia. The Information had previously reported that $35 billion of Amazon’s investment could be contingent on the company either achieving AGI or making its IPO by the end of the year. OpenAI’s announcement confirms the funding split, but says only that the additional $35 billion will arrive “in the coming months when certain conditions are met.” Notably, the round remains open, and OpenAI expects more investors to join as it proceeds.

3\. [Google AI Just Released Nano-Banana 2](https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/)

Google officially unveiled Nano-Banana 2 (technically designated as Gemini 3.1 Flash Image). It leverages Latent Consistency Distillation (LCD) to achieve sub-500ms latency, enabling real-time 4K image synthesis and upscaling directly on mobile hardware. Built on a 1.8-billion-parameter backbone, the model uses Dynamic Quantization-Aware Training (DQAT) to maintain high-fidelity output with a minimal memory footprint, eliminating the need for expensive cloud inference. By implementing Grouped-Query Attention (GQA), the model reduces memory bandwidth requirements, allowing it to run continuously on mobile NPUs without triggering thermal throttling or performance dips. Additionally, the model can maintain character resemblance of up to five characters and the fidelity of up to 14 objects. Through the new Banana-SDK, developers can deploy specialized Low-Rank Adaptation (LoRA) modules to customize the model for niche tasks without retraining the base architecture.

4\. [Nous Research Releases Hermes Agent](https://nousresearch.com/hermes-agent/)

Nous Research team released Hermes Agent, an open-source autonomous system designed to solve the two biggest bottlenecks in agentic workflows: memory decay and environmental isolation. Hermes Agent utilizes a multi-level memory system that mimics procedural learning. While it handles short-term tasks through standard inference, its long-term utility is driven by Skill Documents. Powered by the Llama 3.1-based Hermes-3 model, it is fine-tuned with Atropos RL for high steerability and reliable tool-calling within complex reasoning loops. The system integrates directly with existing communication stacks, including Telegram, Discord, Slack, and WhatsApp.

5\. [Perplexity unveiled Perplexity Computer](https://www.perplexity.ai/hub/blog/introducing-perplexity-computer)

Perplexity AI announced the launch of Perplexity Computer, a system that unifies multiple frontier AI models into a single platform to execute complex, long-running workflows. The system breaks down a user’s requested outcome into tasks and subtasks, assigns them to sub-agents, and executes them asynchronously. These sub-agents can conduct web research, generate documents, process data, and make API calls to connected services. Overall, it can allocate tasks across 19 different models. Each task on Computer runs in an isolated compute environment with access to a filesystem, browser, and tool integrations. If the system encounters issues, it can generate additional sub-agents to address them. As of today, Perplexity Computer runs Opus 4.6 for its core reasoning engine and orchestrates sub-agents with the best models for specific tasks: Gemini for deep research (creating sub-agents), Nano Banana for images, Veo 3.1 for video, Grok for speed in lightweight tasks, and ChatGPT 5.2 for long-context recall and wide search. The product is available to Perplexity Max subscribers. It follows a usage-based pricing model, allowing users to select different AI models for different sub-agent tasks and manage token spending.

5\. [Alibaba Team Open-Sources CoPaw](https://copaw.agentscope.io/)

Alibaba released CoPaw, an open-source framework that provides a standardized workstation for deploying and managing personal AI agents. The system relies on three primary layers: AgentScope (The underlying framework that handles agent communication and logic), AgentScope Runtime (The execution environment), and ReMe (Memory Management). A core feature of the CoPaw workstation is its Skill Extension capability. In this framework, a ‘Skill’ is a discrete unit of functionality, essentially a tool that the agent can invoke to interact with the external world. It also introduces an All-Domain Access layer, which standardizes how agents interact with different messaging protocols.

### Five 5-minute reads/videos to keep you learning

1\. [Building a Production-Ready Agentic RAG System on GCP: (Vertex AI, ADK, Terraform)](https://pub.towardsai.net/building-a-production-ready-agentic-rag-system-on-gcp-vertex-ai-adk-terraform-97742f3b2a41)

The article shows how to implement a production-grade RAG system on Google Cloud Platform to address the challenge of making organizational documents searchable beyond basic keyword matching. The architecture features separate ingestion and query pipelines using Vertex AI, Cloud Run, Eventarc, and Gemini. The article covers complete infrastructure deployment via Terraform, step-by-step setup instructions, and comparative analysis against AWS Bedrock, Azure AI Search, and open-source alternatives.

2\. [Agentic RAG & Semantic Caching: Building Smarter Enterprise Knowledge Systems](https://pub.towardsai.net/agentic-rag-semantic-caching-building-smarter-enterprise-knowledge-systems-2c946fb0c386?sk=9355491f211efcde096be863ea2f0f56)

Enterprise knowledge systems face significant challenges in managing unstructured data scattered across multiple platforms. This article presents a complete implementation of Agentic RAG systems that overcome Naive RAG’s critical limitations, including the inability to summarize documents, perform multi-document comparisons, maintain conversational memory, and enforce data security. It uses the Qdrant vector database with Nomic embeddings across two notebooks.

3\. [LoRA, QLoRA, DoRA: Which Fine-Tuning Method Should You Actually Use?](https://pub.towardsai.net/lora-qlora-dora-which-fine-tuning-method-should-you-actually-use-296b53ea1aa9?sk=0bdae6dbaa29561dc1875b468f30121a)

This article analyzes the original research papers for LoRA, QLoRA, and DoRA to provide evidence-based comparisons of parameter-efficient fine-tuning methods. It explains how LoRA reduces trainable parameters by 99.6% through low-rank weight updates, how QLoRA enables fine-tuning 65B models on a single 48GB GPU using 4-bit quantization, and how DoRA improves accuracy by decomposing weights into magnitude and direction components. It also demonstrates practical code examples from official repositories.

4\. [Cutting Batch Release from 14 Days to 3: A Case Study in Multi-Agent AI for Pharmaceutical Manufacturing](https://pub.towardsai.net/cutting-batch-release-from-14-days-to-3-a-case-study-in-multi-agent-ai-for-pharmaceutical-859a81ea90a7?sk=ff19178d6fe3492c9d71c4e38e4d08a3)

This article presents a case study of a pharma company reducing pharmaceutical batch release time from 14 days to 3 days using a multi-agent AI system. The manufacturer addressed a critical bottleneck in which Quality Assurance reviewers manually gathered records from multiple systems (MES, LIMS, environmental monitoring) to verify compliance with registered specifications, resulting in over $2 million in annual operational overhead. The solution implemented four specialized agents using the CrewAI framework: Batch Data Collector, Deviation Analyst, Compliance Reviewer, and Release Recommender. Each agent employed the ReAct paradigm with custom tools, conditional task execution for critical deviations, and human-in-the-loop approval by Qualified Persons.

5\. [Deriving the Singular Value Decomposition (SVD) from First Principles](https://pub.towardsai.net/deriving-the-singular-value-decomposition-svd-from-first-principles-7695ebbb4e7d?sk=30c6d828f56a682187f222394c9cc4df)

Moving beyond the typical formula-based teaching approach, this article derived Singular Value Decomposition (SVD) from first principles by starting with symmetric matrix diagonalization. It constructs the SVD by first forming two symmetric matrices (AᵀA and AAᵀ) from any matrix A, then using their eigenbases to form orthonormal matrices U and V. The piece demonstrates how SVD decomposes any linear transformation into three operations: rotation, stretch, and rotation, with all transformation energy contained in the diagonal matrix Σ.

### Repositories & Tools

1\. [DeerFlow](https://github.com/bytedance/deer-flow) is an open-source super agent harness that orchestrates sub-agents, memory, and sandboxes.

2\. [Ruflo](https://github.com/ruvnet/ruflo) is an AI agent orchestration framework that transforms Claude Code into a powerful multi-agent development platform.

3\. [MarkItDown](https://github.com/microsoft/markitdown) is a lightweight Python utility for converting various files to Markdown for use with LLMs.

4\. [FireRed OCR](https://github.com/FireRedTeam/FireRed-OCR) is a framework for specializing general LVLMs into document parsing experts.

### Top Papers of The Week

1\. [AI Agents as Universal Task Solvers](https://arxiv.org/abs/2510.12066)

This paper describes AI agents as stochastic dynamical systems and frames reasoning as transductive inference that captures algorithmic structure to speed up novel tasks. It shows that the optimal speed-up on a new task is tightly related to the algorithmic information it shares with the training data. It also highlights that transductive inference yields its greatest benefits precisely when the data-generating mechanism is most complex, and identifies a possible failure mode of naive scaling.

2\. [Decoding ML Decision: An Agentic Reasoning Framework for Large-Scale Ranking System](https://arxiv.org/abs/2602.18640)

This paper presents GEARS (Generative Engine for Agentic Ranking Systems), a framework that reframes ranking optimization as an autonomous discovery process within a programmable experimentation environment. Rather than treating optimization as static model selection, GEARS leverages Specialized Agent Skills to encapsulate ranking expert knowledge into reusable reasoning capabilities, enabling operators to steer systems via high-level intent vibe personalization.

3\. [Diffusion-Pretrained Dense and Contextual Embeddings](https://arxiv.org/abs/2602.11151)

This report introduces pplx-embed, a family of multilingual embedding models that employ multi-stage contrastive learning on a diffusion-pretrained language model backbone for web-scale retrieval. Researchers released two model types: pplx-embed-v1 for standard retrieval, and pplx-embed-context-v1 for contextualized embeddings that incorporate global document context into passage representations. pplx-embed-v1 achieves competitive performance on the MTEB(Multilingual, v2), MTEB(Code), MIRACL, BERGEN, and ToolRet retrieval benchmarks, while pplx-embed-context-v1 sets new records on the ConTEB benchmark.

4\. [Doc-to-LoRA: Learning to Instantly Internalize Contexts](https://arxiv.org/abs/2602.15902)

This paper proposes Doc-to-LoRA (D2L), a lightweight hypernetwork that meta-learns to perform approximate context distillation within a single forward pass. Given an unseen prompt, D2L generates a LoRA adapter for a target LLM, enabling subsequent queries to be answered without re-consuming the original context, reducing latency and KV-cache memory consumption during inference of the target LLM. On a long-context needle-in-a-haystack task, D2L successfully learns to map contexts into adapters that store the needle information, achieving near-perfect zero-shot accuracy at sequence lengths exceeding the target LLM’s native context window by more than 4x.

5\. [Discovering Multiagent Learning Algorithms with Large Language Models](https://arxiv.org/abs/2602.16928)

This paper introduces AlphaEvolve, an LLM-powered evolutionary coding agent that automatically designs multi-agent reinforcement learning algorithms for imperfect-information games. AlphaEvolve discovers VAD-CFR, which uses volatility-sensitive discounting, consistency-enforced optimism, and a hard warm-start schedule, and SHOR-PSRO, which blends Optimistic Regret Matching with smoothed best-response distributions and dynamic annealing, both of which outperform state-of-the-art CFR and PSRO variants.

### Who’s Hiring in AI

**[AI Engineer — FDE @Databricks (Remote)](https://jobs.towardsai.net/job/databricks-ai-engineer-fde-forward-deployed-engineer-eiwx)**

**[Senior Software Engineer @Microsoft Corporation (Redmond, WA, USA)](https://jobs.towardsai.net/job/microsoft-corporation-senior-software-engineer-jhhb)**

**[Engineering Manager, AI @Headspace (Remote/USA)](https://jobs.towardsai.net/job/headspace-engineering-manager-ai-vs4g)**

**[Software Engineer, AI Native @Meta (Menlo Park, CA, USA)](https://jobs.towardsai.net/job/meta-software-engineer-ai-native-lkuk)**

**[Senior AI Engineer @Sword Health (Remote/Portugal)](https://jobs.towardsai.net/job/sword-health-senior-ai-engineer-portugal-based-remote-hybrid-zik1)**

**[AI Engineer Sr — Generative AI @Lockheed Martin (Colorado Springs, USA)](https://jobs.towardsai.net/job/lockheed-martin-ai-engineer-sr-generative-ai-hybrid-bjew)**

**[Principal Engineer (Gen-AI) @Turing (India)](https://jobs.towardsai.net/job/turing-principal-engineer-gen-ai-mmkl)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
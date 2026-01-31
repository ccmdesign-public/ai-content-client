---
title: "TAI #184: Gemini 3 Flash is 3x Faster and 4x Cheaper than Pro and even wins on some benchmarks"
subtitle: "Also, Mistral OCR 3 launches, happy holidays, and get ready for our new Agent Engineering course!"
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-184-gemini-3-flash-is-3x-faster"
publishedAt: "2025-12-23"
tags:
  - "ai"
  - "research"
---

# TAI #184: Gemini 3 Flash is 3x Faster and 4x Cheaper than Pro and even wins on some benchmarks

## What happened this week in AI by Louie

As the industry unwinds for the holidays, Google and Mistral delivered two final gifts for developers focused on speed and efficiency. Gemini 3 Flash and Mistral OCR 3 are less about “frontier capability at any cost” and more about “frontier capability you can afford to run at scale.” OpenAI was also busy with updates to its Image generation model and Codex coding model.

Gemini 3 Flash is the standout release. It brings Pro-grade reasoning to the Flash tier, achieving benchmark scores that rival or beat the much larger Gemini 3 Pro model on coding tasks (78% on SWE-bench Verified) and multimodal reasoning (90.4% on GPQA Diamond). Crucially, it does this while being ~3x faster and ~4x cheaper than Pro, priced at just $0.50 per million input tokens.

This inversion, where the “Flash” model outperforms the previous “Pro” model, is likely due to a combination of effective distillation and new reinforcement learning techniques. The Gemini team has hinted that Flash benefited from RL improvements that missed the Gemini 3 Pro cutoff, suggesting we will see a Pro update soon to restore the hierarchy. For now, however, Flash is the new default workhorse. It is the model powering the “Thinking” mode in the Gemini app, and its speed makes it ideal for agentic loops that require running multiple inference steps without waiting minutes for a response.

On the specialized front, Mistral OCR 3 tackles a boring but expensive problem: extracting text from PDFs. While LLMs are great at OCR, tokenizing an entire PDF image and outputting the full text consumes massive amounts of expensive output tokens. Mistral OCR 3 is a dedicated model priced per page ($1 per 1,000 pages with batch pricing), making it a far more economical choice for high-volume document pipelines. It outputs structured Markdown with HTML tables and image bounding boxes, achieving a 74% win rate over its predecessor on complex layouts such as invoices and forms.

We find this model particularly useful in agentic workflows. Instead of burning LLM tokens to “read” a document, we use Mistral OCR 3 to convert it into a clean, structured text file first. Like OCR 2, it even offers an API endpoint that acts as a scraper-plus-OCR, taking a PDF URL and returning the parsed text directly, a huge quality-of-life feature for building agents that need to ingest data from the web.

* * *

* * *

### Why should you care?

We are currently living through a strange anomaly in the AI timeline where the “budget” model can be smarter than the “flagship.” The fact that Gemini 3 Flash beats the previous 2.5 Pro (and even rivals 3 Pro on some tasks) is a massive signal that algorithmic efficiency, specifically new reinforcement learning techniques, is currently outpacing raw model parameter scaling. For engineers, this creates a temporary “arbitrage” opportunity. You can get frontier-class reasoning for $0.50/million tokens, a fraction of the price of the models it outperforms. This destroys the old heuristic of “prototyping with Pro and optimizing with Flash.” Today, you should likely prototype and deploy with Flash-class models. This anomaly won’t last forever; a Pro update is inevitable, but right now, the smart money is on the fast models.

While Twitter/X obsesses over AGI, the real value is being unlocked in the unglamorous trenches of document processing, task automation, and high-volume routing. Mistral and Google have effectively commoditized two distinct layers of the AI stack this week. Mistral OCR 3 commoditizes the “eye”, making high-fidelity ingestion of messy enterprise documents (invoices, handwritten forms) cheap and deterministic. Gemini 3 Flash commoditizes the “brain”, making high-level reasoning cheap enough to apply to every single API call, not just the special ones. This combination is the foundation for the next wave of “boring” but profitable AI apps: automated accounting, compliance checking, and real-time data entry. We are moving from a phase of “AI as a magical demo” to “AI as a reliable utility component.” The winning products of 2026 won’t be the ones with the most dazzling chat interface, but the ones that chain these cheap, specialized components into reliable background processes.

**Happy Holidays from Towards AI!**

This is our last newsletter before Christmas. It has been a wild year of breakthroughs, and 2026 promises to be even crazier as we move from “chatting” with AI to “managing” agents.

To help you prepare, we are offering a **holiday discount** on all our existing courses. We are also heads-down finishing our new **Agent Engineering** course, launching early next year. It will be the most in-depth, hands-on agents program yet, guiding you through building two production-level, interconnected agents from scratch.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

#### A Holiday Gift for Builders (Ends Jan 2)

![](https://substackcdn.com/image/fetch/$s_!q1aw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67a41548-bf41-4930-8a30-3a98207408cb_760x420.png)

That quiet week between Christmas and New Year’s is the best time to set your 2026 build direction. **Enroll in AI Engineering by Jan 2 (11:59 PM EST),** and we’ll **gift you the 10-hour LLM Primer**.

This bundle is a complete sequence: **judgment first** (when to use prompting vs RAG vs evals vs agents), then **implementation** (build and ship a production-ready LLM pipeline you can demo, deploy, and scale for your team or clients).

[👉](https://academy.towardsai.net/bundles/holiday-bundle?utm_source=TAIsponsorsection&utm_medium=TAI&utm_campaign=dec2025_subscribers_nostart_bundle_signup_glb&utm_id=holidayoffer) **[Claim the Gift Bundle](https://academy.towardsai.net/bundles/holiday-bundle?utm_source=TAIsponsorsection&utm_medium=TAI&utm_campaign=dec2025_subscribers_nostart_bundle_signup_glb&utm_id=holidayoffer)**

* * *

### Hottest News

1\. [OpenAI released ChatGPT Images](https://openai.com/index/new-chatgpt-images-is-here/)

OpenAI’s update introduces a new version of ChatGPT Images, powered by a new flagship image generation model, designed for both generating images from scratch and editing existing photos with more precise edits while keeping key details intact; OpenAI also highlights faster generation (up to 4×) and improved instruction following for more reliable compositions. In ChatGPT, image editing supports operations like adding, removing, combining, blending, and style transformations, and OpenAI is adding a dedicated “Images” space in ChatGPT (available in the sidebar on chatgpt.com and in the mobile app) with preset filters and prompts. For developers, the corresponding API model is GPT Image 1.5; it can be tried via the OpenAI Playground. The earlier ChatGPT Images release remains available as a custom GPT.

2\. [Google released Gemini 3 Flash](https://blog.google/products/gemini/gemini-3-flash/)

Gemini 3 Flash is Google’s latest Gemini 3 family model, positioned as “frontier intelligence built for speed,” aiming to combine strong reasoning and multimodal capability with low latency and lower cost for interactive apps and agentic workflows. It’s rolling out globally and becoming the default model in the Gemini app (replacing 2.5 Flash), and it’s also rolling out as the default for AI Mode in Search. Google says this gives Gemini users access to the Gemini 3 experience at no cost in the app. Developers can access Gemini 3 Flash via the Gemini API in Google AI Studio, Gemini CLI, and Google Antigravity, while enterprises can use it via Vertex AI and Gemini Enterprise; access is through those surfaces (Gemini app/Search for end users, and AI Studio/CLI/Vertex for builders).

3\. [Meta AI released SAM Audio](https://ai.meta.com/blog/sam-audio/)

Meta has announced SAM Audio, a unified audio-separation model that takes intuitive, multimodal prompts to isolate sounds. The system uses distinct encoders for each conditioning input: an audio encoder for the mixture, a text encoder for natural-language descriptions, a span encoder for time anchors, and a visual encoder that consumes a visual prompt derived from video, along with an object mask. Meta also provides a “sam-audio-judge” model to evaluate separation outputs against a text description, reporting overall quality as well as recall, precision, and faithfulness. SAM Audio is released in three sizes: sam-audio-small, sam-audio-base, and sam-audio-large, and is available to download and to try in the Segment Anything Playground.

4\. [OpenAI introduces GPT-5.2-Codex](https://openai.com/index/introducing-gpt-5-2-codex)

OpenAI has released GPT-5.2-Codex, a Codex-tuned variant of GPT-5.2 built for long-horizon, agentic coding work, including large refactors and migrations, more reliable tool use in terminal settings, improved Windows-native behavior, and stronger cybersecurity capabilities. OpenAI reports benchmark results of 56.4% accuracy on SWE-Bench Pro (versus 55.6% for GPT-5.2) and 64.0% on Terminal-Bench 2.0 (versus 62.2% for GPT-5.2). GPT-5.2-Codex is available across all Codex surfaces for paid ChatGPT users.

5\. [NVIDIA AI Releases Nemotron 3](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models)

NVIDIA has launched the Nemotron 3 family of open models and is publishing not only model weights but also datasets and reinforcement-learning tools. The release includes three model sizes: Nano (30B), Super (100B), and Ultra (500B), and is aimed at multi-agent systems that need long-context reasoning while keeping inference costs tightly controlled. Nemotron 3’s core architecture is described as a Mixture-of-Experts hybrid Mamba Transformer, combining Mamba sequence blocks, attention blocks, and sparse expert blocks within a single stacked model.

6\. [Mistral AI Releases OCR 3](https://mistral.ai/news/mistral-ocr-3)

Mistral AI has introduced Mistral OCR 3, its latest optical character recognition service, designed to extract interleaved text and images from PDFs and other documents while preserving structure so the outputs can feed directly into RAG, agent, and search pipelines with minimal additional parsing. On Mistral’s internal benchmarks spanning forms, scanned documents, complex tables, and handwriting, OCR 3 is reported to achieve a 74% overall win rate compared with Mistral OCR 2. The OCR 3 model card lists pricing at $2 per 1,000 pages for standard OCR and $3 per 1,000 annotated pages when structured annotations are used.

### Five 5-minute reads/videos to keep you learning

1\. [Building AI Agents in 2025: Your Zero-to-Hero Guide](https://pub.towardsai.net/building-ai-agents-in-2025-your-zero-to-hero-guide-328884708efa?sk=6cca5364e3c3d4aa82c3baf67c72aa25)

This guide outlines the evolution from passive chatbots to autonomous AI agents capable of planning and execution. It breaks down the core “ReAct” loop and shows how design patterns like reflection and tool use enhance performance. The piece also explores multi-agent architectures for complex workflows and addresses critical production challenges, including evaluation metrics, memory systems, and safety guardrails.

2\. [DeepSeek-V3.2 + DocLing + Agentic RAG: Parse Any Document with Ease](https://pub.towardsai.net/deepseek-v3-2-docling-agentic-rag-parse-any-document-with-ease-80054b5d1d01?sk=fa5c7ea57540749694915970fa0a71a6)

Using DeepSeek-V3.2 alongside IBM’s DocLing, this piece shows a highly effective method for accurate document parsing. It details a sophisticated Agentic RAG pipeline designed to overcome common extraction errors found in standard OCR tools. Key components included a Relevance Checker to filter queries, a Research Agent for drafting, and a Verification Agent to eliminate hallucinations. It offers a practical blueprint with complete steps for implementing in Python.

3\. [Router-Based Agents: The Architecture Pattern That Makes AI Systems Scale](https://pub.towardsai.net/router-based-agents-the-architecture-pattern-that-makes-ai-systems-scale-a9cbe3148482)

Scaling agentic AI beyond simple demos requires a shift from monolithic models to router-based architectures. The article explains how router-based systems function as intelligent traffic controllers, directing tasks to specialized experts based on semantic intent rather than just keywords. The piece also details three implementation levels, ranging from internal ReAct loops to complex Supervisor orchestration, and highlights hybrid strategies that balance cost with model intelligence.

4\. [Architecting State-of-the-Art Text-to-SQL Agents for Enterprise Complexity](https://pub.towardsai.net/architecting-state-of-the-art-text-to-sql-agents-for-enterprise-complexity-629c5c5197b8)

The article presents a robust multi-agent architecture for handling complex enterprise data queries. It focuses on the DRGC framework, Decomposition, Retrieval, Generation, and Correction, which assigns specific roles to agents for planning logic and pruning schema noise. It also explains how incorporating self-reflection loops enables the system to automatically identify and fix SQL errors. Furthermore, the piece covers essential optimization strategies, including dynamic few-shot learning and semantic caching, to ensure low latency.

5\. [Building a Streaming AI Agent with LangChain, MistralAI, and Next.js with Tool calling](https://pub.towardsai.net/building-streaming-ai-agent-with-langchain-mistralai-and-next-js-f7cc6a8c6c6f)

The article explains the backend architecture for a personal AI agent capable of intelligent tool usage and real-time streaming. Utilizing LangChain’s createAgent and Mistral AI’s devstral-medium model, the piece demonstrates how to orchestrate a ReAct workflow for handling reasoning and execution. It walks through creating a modular weather tool using Open-Meteo and defining a specific system identity. The guide also explains how to implement a Next.js route handler that leverages Server-Sent Events (SSE) to stream tokens and tool activities to the frontend.

### Repositories & Tools

1\. [Google MCP](https://github.com/google/mcp) lists official remote servers for Google Maps, BigQuery, GKE, and GCE, alongside open-source servers for Google Workspace, Firebase, Cloud Run, and more.

2\. [Exo](https://github.com/exo-explore/exo) connects all your devices into an AI cluster, enabling running models larger than would fit on a single device.

3\. [Pentest GPT](https://github.com/GreyDGL/PentestGPT) is a GPT-powered penetration testing tool.

4\. [Coco Index](https://github.com/cocoindex-io/cocoindex) is a data transformation framework for AI, with a core engine written in Rust.

5\. [Mini-SGLang](https://github.com/sgl-project/mini-sglang) is a compact implementation of SGLang, designed to demystify the complexities of modern LLM serving systems.

### Top Papers of The Week

1\. [Google Research 2025: Bolder Breakthroughs, Bigger Impact](https://research.google/blog/google-research-2025-bolder-breakthroughs-bigger-impact/)

This year-in-review summarizes Google Research’s 2025 advances and frames how they translated into practical impact across products, scientific progress, and broader societal applications. It highlights efforts to improve generative models along key axes, such as efficiency, factuality, and multilingual and multicultural performance, alongside agentic tooling intended to accelerate scientific discovery. The post also highlights major focus areas, including “generative UI” for dynamic, interactive interfaces, progress in quantum computing (including work described as “verifiable quantum advantage”), and multi-agent systems, with the AI co-scientist featured as a representative example.

2\. [OLMo 3](https://arxiv.org/abs/2512.13961)

OLMo 3 releases fully open language models at 7B and 32B parameters, built for long-context reasoning and a broad set of practical behaviors, including tool and function calling, coding, instruction following, chat, and knowledge recall. “Fully open” is used in the strict sense: the release includes the full stack needed to reproduce and study the models, spanning data, code, intermediate checkpoints, and dependencies. Within the lineup, OLMo 3.1 Think 32B was positioned as the strongest fully open “thinking” model available when it was introduced.

3\. [Memory in the Age of AI Agents](https://arxiv.org/abs/2512.13564)

This survey treats memory as a foundational capability for agents built on foundation models. It draws clear boundaries between agent memory and adjacent ideas such as LLM memory, retrieval-augmented generation, and context engineering. It provides a structured taxonomy across memory forms (token-level, parametric, latent) and memory functions (factual, experiential, working), and discusses how memories are created, updated over time, and retrieved in use. The paper also reviews evaluation benchmarks and open-source tooling, then points to future directions, including greater automation and memory systems designed for multi-agent settings.

4\. [Kling-Omni Technical Report](https://arxiv.org/abs/2512.16776)

The Kling-Omni report describes a general-purpose generative system that produces high-fidelity video directly from multimodal visual-language inputs. Its end-to-end design brings video generation, editing, and reasoning into a single architecture by mapping text, images, and video into a shared internal representation. The authors also emphasize supporting infrastructure: a large-scale data pipeline, pretraining strategies at scale, and inference optimizations to enable cinematic-quality video that follows instructions and exhibits more “intelligent” behavior.

5\. [Adaptation of Agentic AI](https://arxiv.org/abs/2512.16301)

This paper proposes a unified way to think about adapting agentic AI systems built on foundation models that plan, reason, and use tools. It distinguishes adaptation mechanisms based on what signal drives them, tool-execution-signaled versus agent-output-signaled, and further separates tool adaptation approaches into agent-agnostic and agent-supervised categories. The authors discuss the trade-offs inherent in these choices, review representative methods from the literature, and identify open problems and opportunities for building more capable, efficient, and reliable agentic systems.

### Quick Links

1\. [Anthropic AI releases Bloom](https://alignment.anthropic.com/2025/bloom-auto-evals/), an open-source agentic framework that automates behavioral evaluations for frontier AI models. The system takes a researcher-specified behavior and builds targeted evaluations that measure how often and how strongly that behavior appears in realistic scenarios. Bloom is implemented as a Python pipeline and is released under the MIT license on GitHub.

2\. [Google has released T5Gemma 2](https://blog.google/technology/developers/t5gemma-2/), a family of open encoder-decoder Transformer checkpoints built by adapting Gemma 3 pretrained weights into an encoder-decoder layout, then continuing pretraining with the UL2 objective. The release is pretrained only, intended for developers to post-train for specific tasks.

3\. [Google releases FunctionGemma](https://blog.google/technology/developers/functiongemma/), a specialized version of our Gemma 3 270M model tuned for function calling. FunctionGemma acts as a fully independent agent for private, offline tasks or as an intelligent traffic controller for larger connected systems. It can handle common commands instantly at the edge, while routing more complex tasks to models like Gemma 3 27B.

### Who’s Hiring in AI

**[GenAI Research Scientist, Market Algorithms @Google (Switzerland/UK)](https://jobs.towardsai.net/job/google-genai-research-scientist-market-algorithms-a11f)**

**[Consultant GenAI/AI (H/F) @Devoteam S Team GmbH (Casablanca, Morocco)](https://jobs.towardsai.net/job/devoteam-s-team-gmbh-consultant-genai-ai-h-f-zavl)**

**[Full-stack Developer (AI Solutions) @PSI CRO (Remote)](https://jobs.towardsai.net/job/psi-cro-full-stack-developer-ai-solutions-p10b)**

**[AI Software Engineer @Lockheed Martin (Fort Worth, TX, USA)](https://jobs.towardsai.net/job/lockheed-martin-ai-software-engineer-dgvu)**

**[Backend Developer @DocPlanner (Remote)](https://jobs.towardsai.net/job/docplanner-backend-developer-full-remote-ec6c)**

**[Software Engineer | Python | AI Automation @Miratech (Remote)](https://jobs.towardsai.net/job/miratech-software-engineer-python-ai-automation-tfku)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
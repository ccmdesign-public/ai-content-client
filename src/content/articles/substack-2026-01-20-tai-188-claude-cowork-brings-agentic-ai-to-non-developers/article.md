---
title: "TAI ##188: Claude Cowork Brings Agentic AI to Non-Developers"
subtitle: "Also, Quick Cowork guide, MedGemma 1.5, OpenAI's $20bn revenue, ERNIE 5.0, Flux.2, and more."
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-188-claude-cowork-brings-agentic"
publishedAt: "2026-01-20"
tags:
  - "ai"
  - "research"
---

# TAI ##188: Claude Cowork Brings Agentic AI to Non-Developers

## What happened this week in AI by Louie

Last week, we discussed OpenAI’s health push and noted there is significant room for custom models in medicine beyond general-purpose LLMs. Google DeepMind validated that thesis this week with MedGemma 1.5, an updated open medical model with substantially improved support for high-dimensional imaging, such as CT scans, MRIs, and histopathology slides. They also released MedASR, a speech-to-text model fine-tuned for medical dictation, which achieves 58% fewer errors than Whisper on chest X-ray dictations. These are free for research and commercial use. Specialized medical AI is advancing rapidly on multiple fronts, with foundation model providers, startups, and health systems all racing to build domain-specific tools.

The biggest story this week, however, was Anthropic’s release of Claude Cowork, which feels like the natural next step we anticipated a few weeks ago when discussing Claude Code’s momentum over the holidays. Back then, we noted that people were using Claude Code for tasks far beyond programming, from curriculum building to health data analysis, but that the terminal interface would need to change before these agentic capabilities could go mainstream. Anthropic seems to have heard the same signal. Cowork packages Claude Code’s agentic capabilities into an interface designed for non-developers, available in the Claude desktop app for Mac.

**What is Claude Cowork?**

Cowork is a new tab in the Claude desktop app that operates fundamentally differently from standard chat. Instead of a back-and-forth conversation, you give Claude access to a specific folder on your computer and assign it a task. Claude then makes a plan, executes steps autonomously, and keeps you in the loop on progress. You can queue multiple tasks and let Claude work through them in parallel. It feels less like chatting and more like delegating to a capable assistant who happens to live inside your computer.

The core interaction pattern is folder-scoped. You choose which folder Claude can see. It cannot access anything outside that boundary without explicit permission. Within the folder, Claude can read files, create new ones, edit existing documents, and organize content. The permission model is progressive: you can start with read-only access and escalate to edit or delete permissions only when needed.

Perhaps the most remarkable detail: Anthropic staff noted that Cowork itself was built in about a week and a half, and “all of it” was built by Claude Code. This is a striking example of AI tools being used to build AI tools, and it explains both the rapid iteration and some of the beta roughness that early users encountered.

Availability is currently limited to Claude Max and Pro subscribers on macOS, with future expansion to Windows.

Anthropic is clearly not content with leading adoption for AI for coding work; it is positioning itself as the leader in AI tools for work more broadly. Cowork also integrates with connectors like Claude in Chrome, which allow Claude to take browser actions on your behalf, and with Claude Skills. Skills are essentially detailed playbooks that tell Claude how to produce professional-quality outputs. Anthropic provides official skills on GitHub, and you can write custom ones for your own workflows. Their “skills” system is gaining momentum and offers significant advantages over competitors when performing complex work. The xlsx skill can output fully working Excel models with formulas, and the pptx skill produces presentation files that actually open correctly in PowerPoint. This sounds mundane until you have spent hours wrestling with copy-and-paste from other tools with less flexible outputs. File compatibility matters enormously for real work.

**A practical guide to getting started**

Start by opening the Claude desktop app on Mac and clicking the Cowork tab. Create a new task and select the folder you want Claude to access. Begin with a non-sensitive folder containing only the files relevant to your task. Keep backups of anything important before allowing edit or delete permissions.

![](https://substackcdn.com/image/fetch/$s_!XCRe!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc779e8d3-4964-44b0-99e7-84f6a34166b6_1600x777.png)

For your first task, try something low-stakes like organizing files. Point Cowork at your Downloads folder and ask it to sort images into subfolders by type. Claude will analyze file contents, create meaningful categories such as “Screenshots,” “Thumbnails,” and “AI-Generated,” and move hundreds of files in minutes. The progress sidebar shows Claude’s to-do list updating in real-time as it works through the task.

![](https://substackcdn.com/image/fetch/$s_!_q8K!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F28cea35d-94a1-4c1a-bee7-60554757cc58_1600x937.png)

For document creation, Cowork shines when you provide source material. Drop meeting notes, transcripts, or research files into a folder and ask Claude to synthesize them into a report, presentation, or spreadsheet. One powerful pattern: point Cowork at a folder of content you have created and ask it to extract themes, generate content ideas or data analysis, or build a structured summary. The agent can process hundreds of documents and extract dozens of actionable insights in under an hour.

For higher-quality outputs in specific niches, install Claude Skills. Download the official skills or third-party skills, then go to Settings > Capabilities > Skills, and upload the skill.md file for the capability you need. The frontend design skill produces polished landing pages. The pptx skill creates professional presentations. Skills act as expert playbooks that dramatically improve output quality compared to generic prompts.

To add web capabilities, enable Claude in Chrome. This connector lets Cowork browse the web, scrape data from sites that lack APIs, and take actions in your browser. A practical example: ask Cowork to visit your analytics dashboard, extract key metrics, and compile them into a spreadsheet in your local folder. Claude will open Chrome, navigate to the URL, visually capture the data, and create the file. This works because, in Chrome, Claude takes screenshots of your active tab to understand the content, so it can read anything visible on the screen.

A few important caveats for Chrome integration. Claude in Chrome can see anything on your screen when the side panel is open, including sensitive information. Use a separate browser profile for Cowork tasks. Stick to “Ask before acting” mode, which requires approval before Claude takes action. Be aware that web pages can contain prompt injections and adversarial content that attempts to manipulate Claude’s behavior. You may wish to start with trusted sites and closely supervise browser activity.

The most effective prompt pattern across all Cowork tasks is plan-first delegation: “Propose a step-by-step plan first. Wait for my approval before making changes.” This keeps you in control while still benefiting from Claude’s autonomous execution. Add explicit constraints like “Only touch files in this folder” and “Do not delete anything” to prevent surprises.

* * *

* * *

### Why should you care?

Cowork represents the first serious attempt to bring agentic AI capabilities to non-technical users in a form that actually works for real tasks. The early reception has been unusually positive for an agent product. Users report completing projects in hours that would have taken days or weeks.

The rough edges are real, however. This is a research preview built in under two weeks. We have seen occasional failures on complex tasks, rapid resource consumption, and connector hiccups. Prompt injection also remains a risk when combining Cowork with web browsing. The macOS-only and paid plan limitation also excludes most potential users for now.

But the trajectory is clear. Anthropic is iterating rapidly based on user feedback, shipping fixes within days of launch. The fact that Cowork was built entirely by Claude Code suggests this kind of rapid AI-assisted development will only accelerate. If the current version can handle file organization, document synthesis, and basic automation, the version six months from now will likely handle substantially more.

The practical advice is to start experimenting with low-stakes tasks now. Build intuition for what Cowork handles well and where it struggles. The users who understand these tools deeply will be best positioned to leverage them as capabilities improve. The gap between people who can effectively delegate to AI agents and those who cannot is about to become very visible.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

### Hottest News

1\. [Anthropic Releases Cowork As Claude’s Local File System Agent](https://claude.com/blog/cowork-research-preview)

Anthropic launched Cowork as a research preview, giving Claude agent-style access to a user-selected local folder in the macOS app. Claude can read, create, and edit files in that folder to complete multi-step tasks under user oversight, and it can use connectors and skills to produce artifacts such as documents and presentations. Cowork is available to Claude Max subscribers in the macOS app, with a waitlist and planned expansion to additional platforms.

2\. [OpenAI Lays Out Business Model Built To Scale With “The Value of Intelligence”](https://openai.com/index/a-business-that-scales-with-the-value-of-intelligence/)

OpenAI published a strategy note from CFO Sarah Friar describing how the company intends to scale revenue in step with real-world value delivered by its models, using a mix of consumer subscriptions, workplace subscriptions with usage-based pricing, and developer/enterprise API spend tied to production outcomes, alongside newer commerce and advertising paths when users are close to decisions. OpenAI reported record highs in weekly and daily active users and tied recent growth directly to available compute, citing compute capacity rising from 0.2 GW (2023) to 0.6 GW (2024) to ~1.9 GW (2025), alongside revenue growing from $2B ARR (2023) to $6B (2024) to $20B+ (2025); it also emphasized a shift from reliance on a single compute provider to a diversified supplier portfolio to improve resilience and “compute certainty.” The near-term product direction is toward agents and workflow automation that carry context over time and take actions across tools.

3\. [ERNIE-5.0 Tops LMArena Text Leaderboard as №1 Chinese Model](https://ernie.baidu.com/blog/posts/ernie-5.0-0110-release-on-lmarena/)

Baidu released ERNIE-5.0–0110 on LMArena, where it ranked 1,460 on the Text leaderboard, placing #8 overall and #1 among Chinese models at the time of the referenced snapshot. The same update also highlights a strong math-category placement. The model can be tried through Baidu’s ERNIE product entry points.

4\. [Black Forest Labs Releases FLUX.2 \[klein\]](https://bfl.ai/blog/flux2-klein-towards-interactive-visual-intelligence)

Black Forest Labs launched FLUX.2 \[klein\], a smaller, interactive image model built for fast generation and iterative edits in a “draw → see → refine” workflow. The 4B version delivers real-time speed (reported as under one second at ~10 steps on an H100) and is released under the Apache 2.0 license, while the 9B version is released under a non-commercial license. For local use, the 4B model is recommended to run with at least ~13GB VRAM.

5\. [Google AI Releases MedGemma-1.5](https://research.google/blog/next-generation-medical-image-interpretation-with-medgemma-15-and-medical-speech-to-text-with-medasr/)

Google Research released MedGemma 1.5 and introduced MedASR, expanding its open healthcare model lineup for medical imaging interpretation and medical speech-to-text. MedGemma 1.5 adds broader medical imaging support, including higher-dimensional inputs such as CT/MRI volumes and whole-slide histopathology, as well as improvements to medical text capabilities. MedASR is an open medical dictation ASR model intended for transcribing clinical speech so it can feed downstream workflows. Both are available via public model releases and can be deployed through Vertex AI.

6\. [NVIDIA Releases PersonaPlex-7B-v1: A Real-Time Speech-to-Speech Model](https://research.nvidia.com/labs/adlr/personaplex/)

NVIDIA introduced PersonaPlex, a full-duplex conversational speech model designed to keep natural turn-taking (interruptions, backchannels, low-latency speech) while still letting developers choose a voice and define a persona through text prompts. The system is positioned as an alternative to ASR→LLM→TTS pipelines by using a single model that listens and speaks concurrently, aiming for a more human conversational rhythm without sacrificing controllability. It is built on the Moshi architecture from Kyutai, with 7 billion parameters, and is trained on a limited set of unscripted human conversations from the Fisher English corpus.

7\. [OpenAI Releases ChatGPT Translate](https://www.androidauthority.com/chatgpt-translate-3632584/)

OpenAI rolled out ChatGPT Translate, a standalone translation interface at chatgpt.com/translate that adds tone- and audience-aware rewrites on top of basic translation. The UI supports automatic language detection, supports over 50 languages, and features AI-powered prompt customization. Users can add text, speak, or upload an image for translation. It also includes one-tap options like “make it more fluent,” “business formal,” “explain to a child,” and “academic” that hand off into ChatGPT for further refinement.

### Five 5-minute reads/videos to keep you learning

1\. [Creating an Advanced AI Agent From Scratch with Python in 2026](https://pub.towardsai.net/creating-an-advanced-ai-agent-from-scratch-with-python-in-2025-part-1-ce74a23f6514?sk=39314d5421bdf26306838a5ecc438745)

To create more efficient and robust systems, this article advocates for building AI agents from scratch rather than relying on frameworks. It outlines a modular architecture composed of a flexible Tool System, a provider-agnostic LLM Wrapper, and an Agent Orchestrator. The author implements the ReAct (Reasoning + Acting) pattern to ensure a clear, step-by-step workflow and uses Pydantic for type safety in tool execution.

2\. [Model Context Protocol (MCP): Why Every AI Developer Needs MCP in 2026](https://pub.towardsai.net/model-context-protocol-mcp-why-every-ai-developer-needs-mcp-in-2026-e68d39a49417?sk=80993cbe0aa9e7d48afb50f800fc20fe)

This article introduces the Model Context Protocol (MCP), an open protocol by Anthropic designed to standardize connections between LLMs and external tools. It contrasts MCP with traditional REST APIs, highlighting the maintenance and scalability challenges of direct integrations. The protocol uses a decoupled architecture with an MCP Host, Client, and Servers that act as intermediaries for services such as databases or search engines. The result is a more maintainable, scalable, and consistent framework for building AI applications.

3\. [RLM: The Ultimate Evolution of AI? Recursive Language Models](https://pub.towardsai.net/rlm-the-ultimate-evolution-of-ai-recursive-language-models-59dd86f304ff?sk=39d77b67797ce3b4942ab93c42b5d88e)

This article explains Recursive Language Models (RLMs), an approach for managing extensive contexts in AI. Instead of passively processing large inputs, RLMs treat data as a programmable environment where the model acts as an active agent. Using code, it explores, segments, and filters information, breaking down complex tasks into smaller sub-problems. The model then recursively calls itself to solve these parts before synthesizing a final result. This method allows the AI to handle massive datasets and complex reasoning, although it introduces latency and is less efficient for simple tasks.

4\. [Factoring Quintics Using Mid-Point Ladders](https://pub.towardsai.net/factoring-quintics-using-mid-point-ladders-5f99b28e5986)

The author introduces a graphically-aided technique for factoring quintic polynomials into approximate cubic and quadratic components. This method, applicable to quintics with five real roots, employs a Mid-Point Ladder based on Vieta’s sum-of-factors theorem. It simplifies the process by starting with a core genetic function, then uses the ladder to account for adjustments to the constant and x² terms. A Division by Vision formula is then applied to find the factors.

5\. [Federated Learning Explained: A Deep Technical Dive (And How Poets Can Actually Use It)](https://pub.towardsai.net/federated-learning-explained-a-deep-technical-dive-and-how-poets-can-actually-use-it-2db13dff953f?sk=6047f8cc67c8fb17805e825084a05b6c)

This technical overview explores Federated Learning, a method that enables AI models to be trained across decentralized devices without collecting user data. It details the architecture, from the initial distribution of a global model to local training on individual devices and the secure aggregation of updates. The focus then shifts to practical applications for creative professionals, explaining how they already benefit from this technology in everyday tools like smartphone keyboards.

### Repositories & Tools

1\. [Engram](https://github.com/deepseek-ai/Engram/tree/main) is a module that modernizes classic N-gram embeddings for O(1) lookup.

2\. [Agent Skills](https://github.com/vercel-labs/agent-skills) is a collection of skills for AI coding agents.

3\. [LangExtract](https://github.com/google/langextract) is a Python library for extracting structured information from unstructured text using LLMs with precise source grounding and interactive visualization.

4\. [AionUI](https://github.com/iOfficeAI/AionUi) is a free, local, open-source Cowork for Gemini CLI, Claude Code, Codex, Opencode, Qwen Code, Goose Cli, Auggie, and more.

### Top Papers of The Week

1\. [End-to-End Test-Time Training for Long Context](https://arxiv.org/abs/2512.23675)

This paper recasts long-context language modeling as a continual learning problem rather than an architectural one, using a standard Transformer with sliding-window attention that continues learning at test time via next-token prediction. Their meta-learned Test-Time Training method, TTT-E2E, scales with context, such as full attention, while maintaining constant inference latency, running 2.7× faster at 128K context.

2\. [Watching, Reasoning, and Searching: A Video Deep Research Benchmark on Open Web for Agentic Video Reasoning](https://arxiv.org/abs/2601.06943)

This paper introduces VideoDR, the first video deep research benchmark for video-conditioned open-domain question answering on the open web. VideoDR requires cross-frame visual anchor extraction, interactive web retrieval, and multi-hop reasoning over joint video–web evidence across six semantic domains. Evaluations show agentic approaches only outperform workflows when models preserve initial video anchors, with goal drift and long-horizon consistency emerging as main bottlenecks.

3\. [STEP3-VL-10B Technical Report](https://arxiv.org/abs/2601.09668)

This paper introduces STEP3-VL-10B, a lightweight, open-source foundation model that redefines the trade-off between efficiency and frontier-level multimodal intelligence. The model unifies a fully unfrozen pre-training strategy on 1.2T multimodal tokens, coupling a language-aligned Perception Encoder with a Qwen3–8B decoder, and scales post-training with over 1k RL iterations and PaCoRe, achieving 92.2% on MMBench and 80.11% on MMMU.

4\. [Urban Socio-Semantic Segmentation with Vision-Language Reasoning](https://arxiv.org/abs/2601.10477)

The paper introduces SocioSeg, an urban socio-semantic segmentation dataset that combines satellite imagery, digital maps, and hierarchical pixel-level labels for socially defined entities such as schools and parks. The authors propose SocioReasoner, a vision-language reasoning framework that uses cross-modal recognition, multi-stage reasoning, and reinforcement learning to surpass state-of-the-art segmentation models and achieve strong zero-shot generalization.

### Quick Links

1\. [OpenAI introduces Open Responses](https://community.openai.com/t/open-responses-for-the-open-source-community/1371770), an open-source specification and ecosystem inspired by the OpenAI Responses API. It is designed to make it easier to build multi-provider, interoperable LLM interfaces.

2\. [Zhipu AI released GLM-Image](https://z.ai/blog/glm-image), an open-source, industrial-grade auto-regressive image generation model. GLM-Image combines the strengths of diffusion and auto-regressive models. The auto-regressive model decides what should appear in the image, while the diffusion model decides how it should look. This separation allows GLM-Image to be both accurate and visually strong.

3\. [Nous Research releases NousCoder-14B](https://nousresearch.com/nouscoder-14b-a-competitive-olympiad-programming-model/), an Olympiad programming model that is post-trained on Qwen3–14B using reinforcement learning (RL) with verifiable rewards. The model is trained on 24k verifiable coding problems from TACO Verified, PrimeIntellect SYNTHETIC-1. It reaches 67.87 percent Pass@1 on LiveCodeBench v6, a 7.08 percentage point gain over the Qwen3–14B baseline of 60.79 percent on the same benchmark.

### Who’s Hiring in AI

**[Applied AI Engineer @AssemblyAI (Remote/USA)](https://jobs.towardsai.net/job/assemblyai-applied-ai-engineer-ysnx)**

**[AI Software Engineer @Healthengine (Perth, Australia)](https://jobs.towardsai.net/job/healthengine-ai-software-engineer-jb3z)**

**[LLM — Applied AI Research Scientist @CONFISA INTERNATIONAL GROUP (USA & LATAM Remote)](https://jobs.towardsai.net/job/confisa-international-group-llm-applied-ai-research-scientist-usa-and-latam-remote-7ks1)**

**[Junior Conversational AI Engineer (Voice Bots) @AUTO1 Group (Tirana, Albania)](https://jobs.towardsai.net/job/auto1-group-junior-conversational-ai-engineer-voice-bots-xe8c)**

**[PhD Internship (f/m/d) — AI Research @SAP (Germany/Remote)](https://jobs.towardsai.net/job/sap-phd-internship-f-m-d-ai-research-knowledge-graphs-for-agentic-ai-uwru)**

**[AI Engineer/GenAI Developer @NTT DATA (Chennai, India)](https://jobs.towardsai.net/job/ntt-data-north-america-ai-engineer-genai-developer-wtap)**

**[Machine Learning Engineer — AI Models @Tenstorrent Inc. (Poland/Remote)](https://jobs.towardsai.net/job/tenstorrent-inc-machine-learning-engineer-ai-models-4kmm)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
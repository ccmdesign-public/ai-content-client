---
title: "TAI ##189: Dario Amodei's 19,000-Word Warning About AI's \"Adolescence\""
subtitle: "Also, Claude in Excel, GLM-4.7 Flash, Qwen3-TTS, FastMCP 3.0 & more"
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-189-dario-amodeis-19000-word"
publishedAt: "2026-01-27"
tags:
  - "ai-general"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.585Z"
---

# TAI ##189: Dario Amodei's 19,000-Word Warning About AI's "Adolescence"

## What happened this week in AI by Louie

Anthropic has been on a remarkable product streak. Last week, we covered Claude Cowork, which brings agentic capabilities to non-developers. This week, the company expanded Claude in Excel to Pro subscribers and deepened integrations with apps such as Slack, Canva, Figma, and more.

Claude in Excel may be one of the more eye-opening AI features yet for finance professionals. The add-in reads entire multi-tab workbooks, explains nested formulas with clickable cell citations, debugs errors like circular references, and builds financial models from natural-language instructions. Finance has long been a domain where AI demos looked impressive, but real-world utility lagged. Claude, reading your actual workbook and understanding relationships between cells changes that equation. The caveats are real: hallucinations happen, token limits interrupt longer sessions, and prompt-injection vulnerabilities mean you should be careful with untrusted data. But as a research preview, it points toward a future where financial modeling grunt work becomes dramatically faster.

![](https://substackcdn.com/image/fetch/$s_!834x!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa482ee6d-40a8-434a-8aa8-be9cd46f0b99_1600x893.png)

Despite this success in solving near-term, extremely tangible enterprise problems, CEO Dario Amodei remains outspoken about more speculative risks. His essay “Machines of Loving Grace” made a significant splash in October 2024, laying out how powerful AI could compress a century of scientific progress into a decade and potentially eliminate most diseases, end extreme poverty, and transform governance. Fifteen months later, we can assess how those predictions are tracking.

The results are mixed. Capability acceleration proceeded roughly as Amodei predicted: agentic systems improved dramatically, with engineers at Anthropic reportedly “mostly editing” rather than writing code from scratch. Scientific acceleration in drug discovery and protein design continued. But the more ambitious predictions have not materialized. No major breakthroughs in disease cures or lifespan emerged. Mental health applications remain at the research level. The developing world saw little evidence of rapid catch-up. And rather than AI favoring defense and democracy as Amodei hoped, 2025 saw intensified chip wars and rising deepfake threats.

It is always hard to tell if an AI CEO is being honest or hyping capabilities. Even when discussing risks, emphasizing how powerful and dangerous AI will become is a roundabout way of claiming your technology is transformative enough to justify massive investment. Anthropic raised $13 billion in September and is reportedly in talks for another $25 billion. There is also a competitive angle: fearmongering about AI risks can be interpreted as an attempt to prevent open-weight LLM competition through regulation or to stunt Chinese AI labs by advocating for export controls. The conflict of interest is obvious.

I think Dario is largely honest in his hopes and fears, though not immune to motivated reasoning. His technical claims tend to be specific and falsifiable rather than vague. He repeatedly emphasizes uncertainty. And he points fingers at his own industry, explicitly naming AI companies as a major risk factor. That is not the framing you would choose for pure marketing.

This week, Amodei published “The Adolescence of Technology,” a 19,000-word follow-up that shifts from optimism to confronting risks directly. The framing is stark: humanity is entering a “rite of passage” that will test who we are as a species. The central move is treating powerful AI as a new kind of concentrated national capability. He uses the metaphor of a “country of geniuses in a datacenter”: imagine 50 million people, all more capable than any Nobel laureate, operating at 10–100x the speed of humans. If you were a national security official assessing that situation, what would you worry about?

He groups risks into five categories. Autonomy risks concern whether AI systems might behave in unintended ways, not from malice but from emergent properties in training. Amodei rejects both the naive view that AI will simply do what we tell it and the doomer view that misalignment is inevitable. He cites lab experiments in which Claude engaged in deception and adopted problematic personas due to training quirks. These were caught and fixed, but the concern is that training involves so many potential traps that some may only become evident when it is too late.

Destruction risks involve AI lowering barriers to weapons of mass destruction, particularly biological weapons. Amodei argues that LLMs are approaching the capability to walk a determined non-expert through the step-by-step process of bioweapon creation, breaking the historical correlation between ability and motive. The PhD virologist with the skills is unlikely to have the motivation. The disturbed loner with the motivation lacks the skills. AI could remove that barrier. Anthropic’s internal measurements show models may already be providing substantial uplift in relevant areas, which is why recent Claude releases include specialized classifiers to block bioweapon-related outputs.

Power-seizing risks concern authoritarian governments using AI for surveillance, propaganda, and autonomous weapons to entrench control. Amodei is particularly focused on the CCP, arguing it makes no sense to sell them chips and chip-making tools to build an AI totalitarian state. But he also worries about democracies: the same tools needed to defend against autocracies can be turned inward. He suggests domestic mass surveillance and mass propaganda should be bright red lines.

Economic disruption is perhaps the most immediate concern. Amodei predicted that AI could displace 50% of entry-level white-collar jobs in 1–5 years, and he stands by that prediction. He argues this differs from previous technological disruptions because of speed, cognitive breadth, and AI’s capacity to fill in gaps that would normally allow humans to adapt.

Finally, indirect effects capture unknown unknowns from compressed progress: radical advances in biology, psychological manipulation through AI companions, and loss of human purpose. Even if we dodge headline catastrophes, a decade of compressed progress can produce destabilizing outcomes.

The essay’s most useful contribution may be its diagnosis of political economy. Amodei explains why reasonable safety measures fail: the combination of strategic competition and massive economic upside makes restraint hard even when everyone sees the risks. He calls this “the trap.” His proposed solutions emphasize surgical interventions: transparency legislation, export controls on chips, Constitutional AI to train models with coherent values, and interpretability research. He explicitly rejects pausing AI development as untenable, arguing that the technology would continue regardless, and that authoritarian countries would keep building.

* * *

* * *

### Why should you care?

Three practical takeaways from the essay. First, if you work in a field likely to be disrupted, the time to build adjacent skills and relationships is now, not when displacement arrives. Amodei’s prediction of 50% entry-level white-collar job displacement in 1–5 years may be aggressive, but even a slower timeline suggests urgency. Second, the warnings about AI companions and psychological manipulation deserve attention from anyone with children or elderly relatives who may be more susceptible to forming unhealthy dependencies on systems designed to maximize engagement.

Third, and most broadly, the essay is a reminder that the incremental view can obscure the aggregate picture. Most weeks, this newsletter covers new models, new features, and new benchmarks. The question is not whether any single advance is dangerous but whether the cumulative trajectory is one we have consciously chosen. Right now, the answer is largely no. Recognizing that is the first step toward changing it.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

### Hottest News

1\. [Anthropic Launches Interactive Claude Apps](https://claude.com/blog/interactive-tools-in-claude)

Claude now opens connected workplace tools as interactive panels directly in the conversation, so you can review, tweak, and act on outputs without switching tabs. The first set includes Amplitude, Asana, Box, monday.com, and Slack, with interactive workflows like building analytics charts, turning chats into projects/timelines, previewing documents, updating boards, and drafting messages in a formatted preview before posting. This rollout is available across Claude’s web and desktop experiences. The same launch extends MCP Apps, which lets tool developers ship interactive UI experiences that render inside multiple MCP clients rather than returning only text or structured data.

2\. [Anthropic Expands Claude in Excel to Pro Users](https://x.com/claudeai/status/2014834616889475508?s=20)

Anthropic has now rolled out its Excel integration in Claude to Pro users. Along with broader availability, the update brings several functional improvements: Claude can now accept multiple files via drag-and-drop, avoid overwriting existing cells, and support longer work sessions through automatic compression. The integration lets users work with Claude directly in Microsoft Excel for analysis and data preparation.

3\. [Alibaba Qwen releases Qwen3-Max-Thinking](https://qwen.ai/blog?id=qwen3-max-thinking)

Alibaba’s Qwen team launched Qwen3-Max-Thinking, a new flagship reasoning model trained with large-scale reinforcement learning and built to autonomously invoke Search, Memory, and a Code Interpreter during a conversation, eliminating the need for manual tool selection. It ships with a heavy-mode test-time scaling approach that runs multi-round self-reflection (“experience-cumulative” scaling) to improve difficult reasoning without simply increasing parallel sampling. It scored 98.0 on HMMT, 49.8 on Humanity’s Last Exam (with tools), 90.2 on Arena-Hard v2, 75.3 on SWE-Bench Verified, and 85.9 on LiveCodeBench v6, with the tool-augmented HLE result exceeding GPT-5.2-Thinking and Gemini 3 Pro. The model is available in Qwen Chat and via an API.

4\. [Zhipu AI Releases GLM-4.7-Flash](https://docs.z.ai/guides/llm/glm-4.7)

Z.ai launched GLM-4.7, its latest flagship text model series focused on agentic coding reliability, multi-step execution stability, and stronger front-end generation quality, with 200K context and up to 128K output tokens. On widely used coding and agent benchmarks, GLM-4.7 reports 73.8% on SWE-bench Verified, 66.7% on SWE-bench Multilingual, and 41% on Terminal-Bench 2.0, alongside stronger tool-use scores such as 84.7% on τ²-Bench and 67% on BrowseComp. The series includes GLM-4.7, plus lighter variants (GLM-4.7-FlashX and GLM-4.7-Flash), intended to trade off cost/latency for peak capability while maintaining the same long-context footprint.

5\. [Qwen Researchers Release Qwen3-TTS](https://qwen.ai/blog?id=qwen3tts-0115)

Alibaba’s Qwen team open-sourced the Qwen3-TTS family, a multilingual, controllable, streaming text-to-speech stack built for both rapid voice cloning and “voice design” (description-driven control over style and attributes). The models are trained across 10 languages and introduce a dual-track LM design optimized for real-time synthesis, paired with two tokenizers: a semantic-heavy 25Hz codec and an ultra-low-latency 12Hz tokenizer that targets extremely fast first audio emission (reported at ~97 ms). On the multilingual TTS test set, Qwen reports an average WER of 1.835% and a speaker similarity of 0.789, and frames the release as open tooling for both research and product deployment, with models and tokenizers under Apache 2.0.

6\. [Elon Musk’s xAI Activates World’s First Gigawatt-Scale AI Training Cluster](https://interestingengineering.com/ai-robotics/elon-musk-xai-gigawatt-scale-ai-training-cluster)

Elon Musk’s xAI is expanding the Colossus training effort toward gigawatt-scale capacity, including purchasing additional Memphis-area buildings, with the ambition to reach nearly 2 GW of training power and operate at a scale of hundreds of thousands to over a million GPUs over time. xAI’s own materials describe rapid buildout milestones (including scaling to 200k GPUs) while framing the site as a “gigafactory of compute.” At the same time, recent third-party analysis based on site constraints (notably cooling) disputes that the cluster is already operating at 1 GW today, suggesting the full gigawatt claim is more consistent with a phased ramp than a completed state.

7\. [Gemini in Chrome Is Getting “Skills” As It Moves Toward Becoming a Full AI Agent](https://chromeunboxed.com/gemini-in-chrome-is-getting-skills-as-it-moves-toward-becoming-a-full-ai-agent/)

Google is testing “Skills” for Gemini in Chrome, an early move from “assistant in a side panel” toward programmable, site-context automation that can execute repeatable browser workflows. Chromium commits show active development of a dedicated chrome://skills surface (including UI scaffolding like a toolbar) and plumbing to surface or recommend Skills on the current page, suggesting an intent to make Skills discoverable rather than purely manual. Independent coverage indicates Skills are being tried internally in Chrome builds, with users defining a Skill (name + instructions) and then invoking it through Gemini’s Chrome experience, but there’s no public rollout timeline yet.

8\. [Anthropic Replaces Todos With Disk-Backed Tasks](https://x.com/trq212/status/2014480496013803643)

Anthropic upgraded Claude Code from “Todos” to Tasks, turning lightweight to-do tracking into a more structured task primitive designed for longer, multi-step coding workflows, including support for dependency-style organization and richer task lifecycle actions. Recent releases add controls to keep the old system temporarily via CLAUDE\_CODE\_ENABLE\_TASKS, and expand task operations (including the ability to delete tasks via TaskUpdate) while iterating on how the task list renders and behaves in the terminal UI. The change is framed as part of making Claude Code more resilient for extended sessions where work needs to persist cleanly across context pressure and ongoing agent activity.

9\. [FastMCP 3.0 Is Here](https://gofastmcp.com/getting-started/welcome)

Prefect’s FastMCP 3.0 entered beta as a major redesign of the Python framework for building MCP servers, restructuring the system around three composable primitives: components, providers, and transforms. Providers are meant to source tools/resources dynamically (from decorators, filesystems, OpenAPI specs, or even remote MCP servers), while transforms act as middleware to reshape what clients see — renaming, namespacing, filtering, or applying security rules — so features that used to require bespoke subsystems can be assembled from building blocks. The project is shipping as a 3.0.0b1 beta (with guidance to stay on v2 for production stability), signaling a push toward more modular, plug-and-play MCP infrastructure for agent toolchains.

10\. [FlashLabs Researchers Release Chroma 1.0](https://modelscope.cn/models/FlashLabs/Chroma-4B)

FlashLabs open-sourced Chroma 1.0 (Chroma-4B), a real-time, end-to-end spoken dialogue model that takes speech in and returns speech out while preserving a user’s voice via personalized voice cloning. It’s built to avoid the classic ASR → LLM → TTS pipeline by operating directly on discrete speech representations, targeting sub-second interaction latency for conversational use. The system emphasizes speaker identity retention (a common failure mode in speech-token-based dialogue models) while keeping responses fast enough to feel “live” in multi-turn voice chats. The release includes a 4B-parameter checkpoint and positioning as an open, real-time voice assistant backbone for developers building low-latency, voice-native agents.

### Five 5-minute reads/videos to keep you learning

1\. [How to Run AI Agents Fully Locally: Memory, Tools, and Models on Your Laptop](https://pub.towardsai.net/how-to-run-ai-agents-fully-locally-memory-tools-and-models-on-your-laptop-b8cd1df4b8e4?sk=3694e8bb0294150862eeb87bb45eace5)

This article outlines the architecture of a fully local AI agent, designed to improve privacy, control costs, and enable reproducibility. The stack integrates Agno for agent orchestration, SurrealDB as a multi-model database for state and vectors, and Ollama for local inference. It highlights the use of the Model Context Protocol (MCP) to establish a secure boundary for tools, such as file access and image generation. It also covers practical implementations, including persistent memory, local RAG, and multimodal workflows.

2\. [LangGraph + RAG + UCP = The Key To Powerful Agentic AI](https://pub.towardsai.net/langgraph-rag-ucp-the-key-to-powerful-agentic-ai-d7ef49171abc?sk=66361045469064f1314d09861e7dc5b7)

This analysis details how to build an AI shopping assistant using the Universal Commerce Protocol (UCP), a new open standard for e-commerce transactions. The article shows that combining LangGraph for structured workflows with Retrieval-Augmented Generation (RAG) enables querying a product database. It provides code examples for a chatbot that uses a vector store and GPT-4 to answer questions, alongside a checkout system built with the FastUCP framework to manage transactions.

3\. [Mastering the Bias-Variance Trade-Off in Machine Learning](https://pub.towardsai.net/mastering-the-bias-variance-trade-off-in-machine-learning-748cc47a1b2c?sk=8194f1ad4ac36d20f57e6145c791fdb1)

Balancing bias and variance is a central challenge in machine learning. This article examines this trade-off using the Vapnik-Chervonenkis (VC) dimension, a theoretical concept for quantifying a model’s capacity. It explains how the VC bound estimates the generalization error on unseen data. It also presents a practical experiment with polynomial regression, demonstrating that as model complexity increases, training error decreases while the gap between training and real-world performance widens.

4\. [Connecting the Dots with Graphs](https://pub.towardsai.net/connecting-the-dots-with-graphs-0738c1716a53)

Moving beyond traditional databases that store data in isolated tables, knowledge graphs model information as a network of entities and relationships. This structure excels at complex, relationship-heavy queries that relational databases often struggle with. The text outlines the benefits, such as flexible schemas and data integration, while also addressing challenges like data quality and performance. A practical implementation is also presented, detailing how to build a question-answering system using Neo4j and an LLM to translate natural language into graph queries, making complex data more accessible.

5\. [Probability Calibration with Python](https://pub.towardsai.net/probability-calibration-with-python-6ee602760ab6?sk=5b4498a8d57b604184c1635636d30c26)

Many machine learning models produce probability scores that, while effective for ranking, do not align with real-world event frequencies. This article explores probability calibration using a simulated loan default dataset. It compares a raw Gradient Boosting model against two calibrated versions: Sigmoid and Isotonic. The results demonstrate that calibration improves probability metrics like the Brier score and Expected Calibration Error (ECE) without compromising ranking performance (AUC). A final simulation of a loan approval policy shows that using these calibrated probabilities leads to more accurate risk assessments and ultimately, higher realized profits, underscoring their value in business decision-making.

### Repositories & Tools

1\. [VibeVoice](https://github.com/microsoft/VibeVoice) is a unified speech-to-text model designed to handle 60-minute long-form audio in a single pass, generating structured transcriptions containing Who (Speaker), When (Timestamps), and What (Content), with support for user-customized context.

2\. [GitHub Copilot CLI SDKs](https://github.com/github/copilot-sdk) is a multi-platform SDK for integrating GitHub Copilot Agent into apps and services.

3\. [Clawbot](https://github.com/clawdbot/clawdbot) is a personal AI assistant you run on your own devices. It can speak and listen on macOS/iOS/Android, and can render a live Canvas you control.

### Top Papers of The Week

1\. [Agentic Reasoning for Large Language Models](https://arxiv.org/abs/2601.12538)

This survey formalizes “Agentic Reasoning” as a paradigm shift that transforms LLMs from static processors into autonomous agents capable of planning, acting, and self-evolving through interaction. The survey organizes agentic reasoning into three layers: foundational, self-evolving, and collective. It also provides a unified roadmap for optimizing agentic systems through both in-context orchestration and post-training reinforcement learning across domains such as science and robotics.

2\. [Multimodal Reinforcement Learning with Agentic Verifier for AI Agents](https://arxiv.org/html/2512.03438v1)

This paper introduces Argos, a principled reward agent to train multimodal reasoning models for agentic tasks. For each sample, Argos selects from a pool of teacher-model derived and rule-based scoring functions to simultaneously evaluate: (i) final response accuracy, (ii) spatiotemporal localization of referred entities and actions, and (iii) the quality of the reasoning process. This approach enables models to achieve state-of-the-art performance on spatial and embodied AI tasks while significantly reducing visual hallucinations through verifiable reinforcement learning.

3\. [ABC-Bench: Benchmarking Agentic Backend Coding in Real-World Development](https://arxiv.org/abs/2601.11077)

This paper introduces ABC-Bench, a benchmark explicitly designed to evaluate agentic backend coding within a realistic, executable workflow. It contains 224 practical tasks spanning 8 languages and 19 frameworks from open-source repositories, requiring agents to explore repositories, configure environments, deploy containerized services, and pass end-to-end API tests. Evaluations show that state-of-the-art LLM agents still struggle with these holistic backend engineering tasks.

4\. [LLM-in-Sandbox Elicits General Agentic Intelligence](https://arxiv.org/abs/2601.16206)

This paper introduces LLM-in-Sandbox, a framework that lets large language models explore a virtual computer to elicit general agentic intelligence in non-code domains. Strong LLMs, without extra training, use the sandbox to access external resources, manage long contexts, and execute scripts. LLM-in-Sandbox-RL further improves these capabilities, yielding robust generalization across STEM tasks and instruction following, and the team releases a Python package.

### Quick Links

1\. [Liquidi released LFM2.5–1.2B-Thinking](https://www.liquid.ai/blog/lfm2-5-1-2b-thinking-on-device-reasoning-under-1gb), a 1.2B model optimized for reasoning that runs entirely on-device and is reported to fit within ~900MB of memory on a phone. LFM2.5–1.2B-Thinking matches or exceeds Qwen3–1.7B on most reasoning benchmarks, despite having 40% fewer parameters.

2\. [StepFun has introduced Step-DeepResearch](https://stepfun.ai/deep-research-invitation), a 32B parameter end-to-end deep research agent that aims to turn web search into actual research workflows with long horizon reasoning, tool use, and structured reporting. The model is built on Qwen2.5 32B-Base and is trained to act as a single agent that plans, explores sources, verifies evidence, and writes reports with citations, while keeping inference cost low.

3\. [Microsoft Research releases OptiMind](https://ai.azure.com/catalog/models/microsoft-optimind-sft), an experimental 20B-parameter model built to translate natural-language decision problems into solver-ready MILP formulations. The model is fine-tuned from openai/gpt-oss-20b on cleaned optimization datasets such as OR-Instruct and OptMATH, and evaluated on expert-validated benchmarks including IndustryOR and Mamo Complex.

### Who’s Hiring in AI

**[Artificial Intelligence Safety Data Scientist @Google (Bangalore, India)](https://jobs.towardsai.net/job/google-artificial-intelligence-safety-data-scientist-trust-and-safety-t7hm)**

**[AI Solutions Engineer (Python + Cloud) @Oowlish (Remote/Brazil)](https://jobs.towardsai.net/job/oowlish-ai-solutions-engineer-python-cloud-b3tg)**

**[Senior Full Stack Developer @Delta Air Lines, Inc. (Atlanta, USA)](https://jobs.towardsai.net/job/delta-air-lines-inc-senior-full-stack-developer-ibay)**

**[Agentic AI, Forward Deployed Engineer @Kyndryl (Sydney, Australia/Remote)](https://jobs.towardsai.net/job/kyndryl-agentic-ai-forward-deployed-engineer-6mtc)**

**[Lead AI Engineer @Capital One (Bangalore, India)](https://jobs.towardsai.net/job/capital-one-lead-ai-engineer-favb)**

**[Principal AI Engineer (Autonomous Agent) @PointClickCare (Remote/Canada)](https://jobs.towardsai.net/job/pointclickcare-principal-ai-engineer-autonomous-agent-idgs)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
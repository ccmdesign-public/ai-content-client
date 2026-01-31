---
title: "TAI #186: Claude Code and the Christmas Awakening: Why CLI Agents Are Winning the Agentic Race"
subtitle: "Also, Deepseek's mHC, GPT-5.2 Pro tops Frontier math, Qwen-Image-2512, Tencent HY-MT1.5 & more"
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-186-claude-code-and-the-christmas"
publishedAt: "2026-01-06"
tags:
  - "ai"
  - "research"
---

# TAI #186: Claude Code and the Christmas Awakening: Why CLI Agents Are Winning the Agentic Race

## What happened this week in AI by Louie

This week was quieter on major model releases, though DeepSeek published a paper on Manifold-Constrained Hyper-Connections (mHC), a training technique that improves stability when scaling up model size. We think this could be significant when integrated into their next-generation models. But the AI community’s attention turned to something arguably more transformative: how people are actually using these models. Over the Christmas break, a wave of new users discovered Claude Code, Anthropic’s terminal-based agentic coding assistant, and many are calling it a genuine step change in what AI can accomplish. The combination of Opus 4.5’s release in November and holiday downtime created perfect conditions for exploration. Social media has been flooded with reports of developers shipping projects in hours that would have taken weeks, and perhaps more surprisingly, non-technical users automating tasks they never thought possible.

Claude Code is Anthropic’s command-line tool that gives Claude direct access to your file system, terminal, and local environment. Unlike chatbot interfaces, which require you to manually provide context by copying and pasting, Claude Code can read your entire codebase, edit multiple files coherently, run your test suite, and iterate until things work. The AI navigates your file system and finds what it needs itself, rather than relying on you to assemble the relevant context.

The Opus 4.5 upgrade appears to have crossed a critical threshold. Users consistently report that it eliminates the “slop code” problem that plagued earlier models, where AI-generated code was functional but poorly structured and hard to maintain. Opus 4.5 produces code that experienced developers actually want to keep. It understands architectural patterns, creates appropriate abstractions, and can debug its own work by writing minimal reproducible examples. Anthropic’s internal surveys indicate that engineers now rely on Claude for 60% of their daily work, with a mean productivity improvement of 220% reported across the team. However, individual results vary significantly by workflow and level of expertise.

![](https://substackcdn.com/image/fetch/$s_!V8gI!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8045d540-8b05-4426-aaf6-1666a7fed440_1600x893.png)

**CLI agents vs. IDE tools vs. chatbot interfaces**

The distinction between Claude Code and tools like Cursor is more nuanced than many realize. Cursor also has a full agent mode, not just autocomplete. Both can autonomously execute multi-step coding tasks. The real differences lie elsewhere.

Claude Code runs in your terminal and treats your entire computer as its workspace. It can chain together shell commands, access external services through MCP (Model Context Protocol) integrations, run scripts, and work across applications. Cursor is an IDE-first experience, essentially VS Code rebuilt with AI at its core. It offers visual diffs, familiar keybindings, and a polished review flow where you can accept or reject changes file by file.

Claude Code tends to include more of your codebase in each request, which improves understanding but increases costs. Some comparisons suggest Claude Code costs roughly four times as much as Cursor for similar tasks, though the higher context often yields better results for complex refactors.

The philosophical difference is telling. One developer described it this way: with Cursor, you drive, and AI assists. With Claude Code, AI drives, and you supervise. Many developers use both. You can run Claude Code inside Cursor’s terminal, using the IDE for visual editing and summoning Claude Code when you need deep reasoning on a complex problem.

For non-technical users, the comparison extends to chatbot interfaces like ChatGPT. With Claude Code, you can say “analyze all the spreadsheets in this folder, identify trends, and create a summary report,” and it handles the entire process. Non-technical users are leveraging this for tasks such as reorganizing thousands of files by content, extracting insights from contracts, processing research papers, and automating administrative workflows.

However, the CLI interface will not be the mainstream way this capability reaches most users. Terminals remain intimidating for people who have spent years in graphical interfaces. Even some experienced developers find it hard to adjust to CLI-based coding after working in IDEs. Claude Code does offer VS Code integration, but most users report better results in the terminal, where the complete agentic loop operates more naturally. The future likely involves more user-friendly interfaces that retain this agentic file system access.

This momentum poses a challenge to Microsoft’s strategy of infusing each application with its own focused AI assistant. The bet that people want Copilot for Excel, Copilot for Word, and Copilot for PowerPoint as separate experiences looks increasingly questionable as users gravitate toward agents that work across applications. When you can tell a single agent to analyze spreadsheets, summarize findings, and create a presentation, switching between three different AI assistants feels cumbersome. OpenAI’s Codex, Google’s Antigravity, and Anthropic’s Claude Code are all betting on this general-purpose agent model.

**How Boris Cherny, the creator of Claude Code, actually uses it**

Boris Cherny shared his personal setup this week, describing it as “surprisingly vanilla.” But reading through his workflow reveals just how far from vanilla it would seem to most users and implies that others at Anthropic have even more complex configurations.

Boris runs five Claude instances in parallel in his terminal, numbered 1 through 5, using system notifications to know when any instance needs input. He also runs another five to ten sessions on the web version of Claude Code simultaneously, frequently handing off sessions between local and web using the teleport feature. He kicks off sessions from his phone each morning and checks in on them later.

For model selection, Boris uses Opus 4.5 with thinking mode for everything. While it is larger and slower than Sonnet, he finds that the reduced need for steering and better tool use make it faster overall for completing actual tasks.

His team shares a single CLAUDE.md file that is checked into Git. This file serves as the project’s working agreement with Claude, containing build commands, style conventions, architectural boundaries, and definitions of done. Any time anyone sees Claude do something incorrectly, they add a rule to CLAUDE.md so it does not happen again. This creates a compounding effect where Claude gets better at each specific codebase over time.

Most sessions start in Plan mode (shift+tab twice). He goes back and forth with Claude until he likes the plan, then switches to auto-accept edits mode, where Claude can usually execute in one shot. Getting the plan right is critical.

He uses slash commands for every “inner loop” workflow he performs multiple times daily, like a /commit-push-pr command that he and Claude use dozens of times every day. Subagents handle specialized workflows: code-simplifier cleans up code after Claude finishes, verify-app runs end-to-end tests. A PostToolUse hook automatically formats Claude’s code. MCP integrations let Claude search and post to Slack, run BigQuery queries, and grab error logs from Sentry.

Perhaps most importantly, Boris emphasizes giving Claude a way to verify its work. Claude tests every change before landing using the Claude Chrome extension, which opens a browser, tests the UI, and iterates until the code works and the user experience feels right. This verification loop improves the quality of results by two to three times.

The gap between Boris’s setup and how most people use Claude Code highlights a broader challenge in AI adoption. Setting up an effective workflow with these tools is far from straightforward. It requires understanding permission modes, context management, hooks, MCP integrations, and verification strategies. The productivity gains require significant time investment to unlock.

**The repo maintenance question**

Agentic coding also raises new questions about codebase organization. When AI writes and modifies code at high speed, repositories can quickly become messy. Tidying up can consume significant time. But this raises a genuine question: how neat and human-readable do these repos need to be anymore if you are primarily using AI to code and review them?

Claude Code can do a good job of refactoring and tidying up its own repos, but it usually needs detailed rules and workflow instructions to do so consistently. This is another area where investing in CLAUDE.md files and custom commands pays off. Without explicit guidance, agentic coding tends to accrue technical debt more quickly than traditional development. With the proper guardrails, Claude Code can maintain cleaner codebases than many human developers, but getting those guardrails right takes work.

* * *

* * *

### Why should you care?

The Christmas surge in Claude Code adoption signals we may be entering a new phase of AI interaction where agentic tools that can navigate your files, execute commands, and chain together workflows become more valuable than chat interfaces. Power requires access. A chatbot interface is sandboxed by design. An agent with file system access, shell execution, and external integrations can actually do the work. The trade-off is that wielding that power requires more skill and carries more risk.

For technical users, investing time in learning CLI agents is likely to pay dividends. The productivity improvements reported by power users are not available to someone using ChatGPT to generate code snippets they paste into their editor. But the learning curve is real, and Boris’s “vanilla” setup would take most developers considerable time to replicate.

For non-technical users, these tools are genuinely helpful for tasks like file organization, data analysis, and research automation. But the CLI will not be how most people access these capabilities. The future likely involves more accessible interfaces that retain the agentic power.

The agentic AI era is arriving faster than many expected. The models are ready. The tooling is maturing. The question now is how quickly people can learn to use them effectively, and how quickly more accessible interfaces will bring these capabilities to everyone else. The winners will be determined by which agents can deliver the reliability and verification loops that make them trustworthy for real work.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

### Hottest News

1\. [DeepSeek Releases Hyper-Connections for Transformers](https://deepseek.ai/blog/deepseek-mhc-manifold-constrained-hyper-connections)

DeepSeek introduces mHC (Manifold-Constrained Hyper-Connections) to scale training while preserving stability. mHC targets a common scaling tension: increasing internal information flow can improve capability, but it can also destabilize training; the method constrains hyper-connection residuals by projecting them onto a defined manifold to restore identity-mapping behavior while keeping the system efficient. DeepSeek reports empirical gains in large-scale pretraining experiments (including MoE-based variants inspired by prior DeepSeek work), positioning mHC as a training-stack improvement rather than a product feature, with the full technical details published on arXiv.

2\. [GPT-5.2 Pro Tops FrontierMath T4](https://x.com/gdb/status/2006154439208337417)

OpenAI’s GPT-5.2 strengthens science/math performance, with new FrontierMath results and clearer context on what Tier 4 represents. OpenAI reports GPT-5.2 Thinking at 14.6% on FrontierMath Tier 4 (with Python enabled) and 40.3% on Tier 1–3, while also showing broad gains across science-heavy benchmarks (e.g., GPQA Diamond) and publishing a subset of GPT-5.2 Pro numbers for several evaluations. Epoch AI notes Tier 4 is the research-level slice of FrontierMath, 50 problems written as short-term research projects, so progress there is treated as a meaningful capability signal rather than routine test-taking.

3\. [Alibaba Qwen Open Sourced Qwen-Image-2512](https://qwen.ai/blog?id=qwen-image-2512)

Qwen releases Qwen-Image-2512, a December update to its open text-to-image model. The update focuses on three visible quality lifts: more reliable text rendering and layout, more realistic human generation (reduced “AI-generated” look), and finer natural textures (e.g., landscapes and fur). The weights are available through Hugging Face and ModelScope, with an interactive demo on Hugging Face Spaces. Results from 10,000 rounds of blind model evaluations on AI Arena show that Qwen-Image-2512 is currently the strongest open-source model.

4\. [Tencent Researchers Release Tencent HY-MT1.5](https://arxiv.org/html/2512.24092v1)

Tencent releases HY-MT1.5, a new open machine-translation model family. HY-MT1.5 ships in two sizes (1.8B and 7B parameters) and is trained with a multi-stage pipeline that combines general + MT-oriented pretraining, supervised fine-tuning, strong-to-weak on-policy distillation, and reinforcement learning to balance quality with deployment efficiency. Beyond “plain translation,” the models support practical constraint controls, such as terminology injection, context-aware translation, and format preservation for structured documents. Tencent also points to quantization options for edge or high-throughput deployments and provides model weights on Hugging Face, along with an accompanying code repository for use and integration.

5\. [OpenAI Ramps Up Audio AI Efforts Ahead of Device](https://x.com/storysylee/status/2006985196458139711)

OpenAI ramps up its audio-model push ahead of an audio-first device, with a new architecture targeted for 2026. Reporting around the effort describes OpenAI consolidating previously separate audio teams and rebuilding core infrastructure so audio can be treated as a first-class modality (not just “text, then voice”), aiming to close gaps in latency, accuracy, and natural conversational flow. The plan centers on a new audio-model architecture expected in Q1 2026, alongside longer-term work on voice-first hardware form factors, with leadership reportedly tied to talent brought in from Character.AI.

6\. [IQuest-Coder Beats Claude Sonnet 4.5 on Coding Benchmarks](https://x.com/rohanpaul_ai/status/2006813146170929409)

IQuestLab releases IQuest-Coder-V1, an open-source code LLM family tuned for autonomous software engineering. The lineup includes 7B, 14B, and 40B variants with 128K native context, plus “Instruct” and “Thinking” options and a “Loop” variant built around a recurrent-style mechanism for a better capacity–deployment trade-off. The project highlights “Code-Flow” training, learning from repository evolution and commit transitions rather than static snapshots. It scored 76.2% on SWE-Bench Verified, 81.1% on LiveCodeBench v6, and 49.9% on BigCodeBench.

### Five 5-minute reads/videos to keep you learning

1\. [Understanding Retrieval in RAG Systems: Why Chunk Size Matters](https://pub.towardsai.net/understanding-retrieval-in-rag-systems-why-chunk-size-matters-6d976dd5b654?sk=a4dcae2771607c60a6dfebc2653d486b)

This article examines the critical role of the retrieval step in RAG systems by isolating its mechanics from the generation component. The author demonstrates how varying text chunk sizes (80, 220, and 500 characters) directly affect performance. The analysis shows that small chunks lack sufficient context, medium ones can be unstable, while larger chunks yield more robust results. It also introduces a method for handling uncertainty, which uses the similarity score gap between top results to identify and flag ambiguous situations, preventing the system from providing a potentially incorrect answer when it has low confidence.

2\. [Deep Compression, 2015: How Much More Can We Squeeze in 2025?](https://pub.towardsai.net/deep-compression-2015-how-much-more-can-we-squeeze-in-2025-e0bd70150fa2)

This article revisits the 2015 Deep Compression paper, first reproducing its pipeline of pruning, retraining, and quantization on the LeNet model, achieving a ~22x compression rate while maintaining accuracy. It then introduces a novel, TF-IDF-inspired pruning score that identifies important parameters based on activation patterns. This computationally lighter method improved upon the baseline, pushing the model’s compression up to ~65x with minimal impact on accuracy after retraining.

3\. [Gemini 3.0 Flash + MistralOCR 3 + RAG Just Revolutionized Agent OCR Forever](https://pub.towardsai.net/gemini-3-0-flash-mistralocr-3-rag-just-revolutionized-agent-ocr-forever-27f07fc15d87)

This article explains how to combine Mistral OCR 3 and Google’s Gemini 3.0 Flash to build a document processing and chat application. It highlights Mistral OCR’s ability to accurately extract structured text and tables from documents and convert them to Markdown. The extracted content is then used by Gemini 3.0 Flash, a fast and efficient model, to power a chat interface. This allows users to ask questions about the uploaded document. The piece includes a step-by-step guide and code for creating the Streamlit application, providing a practical example of this integration.

4\. [Why Humans Are Not Reinforcement Learning Agents And Why This Matters for AI](https://pub.towardsai.net/why-humans-are-not-reinforcement-learning-agents-and-why-this-matters-for-ai-72e8d50f03aa?sk=e510f07a13268458d9fa9cc086fb0423)

While reinforcement learning (RL) is a cornerstone of modern AI, it operates on assumptions that human decision-making consistently violates. This analysis explores the fundamental mismatch, noting that human rewards are unstable, influenced by emotion, and subject to time-inconsistent preferences. Humans also actively construct their reality rather than just reacting to fixed states, often relying on heuristics and identity to guide actions. The author suggests that acknowledging these differences is key to developing AI that can effectively support the complexity of human judgment, rather than simply optimizing for a fixed goal.

5\. [Beyond Vectors: A Deep Dive into Modern Search in Qdrant](https://pub.towardsai.net/beyond-vectors-a-deep-dive-into-modern-search-in-qdrant-aaef72f32051)

To address the complexity of modern user queries, this piece details the construction of a hybrid search system using Qdrant. It demonstrates how to combine dense vectors for semantic understanding, sparse vectors for keyword precision, and full-text indexing for exact-match requirements. It also explores advanced techniques like ASCII-folding for multilingual support and ACORN for efficient, filter-aware vector searches. It also provides a practical e-commerce implementation to show how these elements are integrated into a single, effective retrieval pipeline that balances user intent with specific constraints.

### Repositories & Tools

1\. [Cs249r Book](https://github.com/harvard-edge/cs249r_book) is the open learning stack for AI systems engineering. It includes the textbook source, TinyTorch, hardware kits, and upcoming co-labs.

2\. [LLM Pruning Collection](https://github.com/zlab-princeton/llm-pruning-collection) is a collection of various llm pruning implementations, training code for GPUs & TPUs, and an evaluation script.

3\. [CPython](https://github.com/python/cpython) is Python version 3.15.0 alpha 3.

4\. [OpenBB](https://github.com/OpenBB-finance/OpenBB) is the open-source toolset for integrating proprietary, licensed, and public data sources into downstream applications.

### Top Papers of The Week

1\. [TurboDiffusion: Accelerating Video Diffusion Models by 100–200 Times](https://arxiv.org/abs/2512.16093)

TurboDiffusion accelerates end-to-end video diffusion generation by 100–200x while maintaining video quality. The framework speeds attention with low-bit SageAttention and trainable Sparse-Linear Attention, compresses sampling steps via rCM-based step distillation, and applies W8A8 quantization to model parameters and activations. Experiments on multiple Wan2.x I2V and T2V models confirm the speedups on a single RTX 5090 GPU.

2\. [Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models](https://arxiv.org/abs/2512.24618)

Youtu-LLM introduces a 1.96B-parameter lightweight language model pre-trained from scratch to cultivate reasoning and planning. The model uses a dense Multi-Latent Attention architecture, STEM-oriented vocabulary, and a 128k context window. Researchers apply a “Commonsense-STEM-Agent” curriculum over ~11T tokens and scalable agentic mid-training, enabling state-of-the-art agentic performance among sub-2B models on general and agent-specific benchmarks.

3\. [Recursive Language Models](https://arxiv.org/html/2512.24601v1)

Recursive Language Models aim to break the usual trade-off between context length, accuracy, and cost in large language models. Instead of forcing a model to read a giant prompt in one pass, RLMs treat the prompt as an external environment and let the model decide how to inspect it with code, then recursively call itself on smaller pieces. Across S-NIAH, BrowseComp-Plus, OOLONG, and OOLONG Pairs, RLM variants of GPT-5 and Qwen3-Coder improve accuracy and F1 over direct model calls, retrieval agents such as CodeAct, and summarization agents.

4\. [Dynamic Large Concept Models: Latent Reasoning in an Adaptive Semantic Space](https://arxiv.org/abs/2512.24617)

The paper introduces Dynamic Large Concept Models, which shift computation from individual tokens to a learned concept space, addressing non-uniform information density in language. DLCM discovers variable-length concepts, defines a compression-aware scaling law that separates token capacity, concept-reasoning capacity, and compression ratio, and uses a decoupled μP to enable stable training.

### Who’s Hiring in AI

**[Research Intern — MSRC AI Security Research @Microsoft Corporation (Cambridge, UK)](https://jobs.towardsai.net/job/microsoft-corporation-research-intern-msrc-ai-security-research-aaz4)**

**[Junior Product Designer — AI Driven @CloudWalk (Remote, Brazil)](https://jobs.towardsai.net/job/cloudwalk-junior-product-designer-ai-driven-aads)**

**[Intern AI Developer @Entrust (Shakopee, MN, USA)](https://jobs.towardsai.net/job/entrust-intern-ai-developer-6mkf)**

**[Full-stack Software Engineer — Core @Dataiku (Remote/France)](https://jobs.towardsai.net/job/dataiku-fullstack-software-engineer-core-ne5x)**

**[Junior Data Developer @CI&T (Remote)](https://jobs.towardsai.net/job/ciandt-job-26613-junior-data-developer-eqz3)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
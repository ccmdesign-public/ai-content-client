---
title: "LAI #120: Beyond Prompting"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/lai-120-beyond-prompting-5aba00a7094c?source=rss----98111c9905da---4"
publishedAt: "2026-03-26"
tags:
  - "ai-general"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-26T21:35:22.188Z"
---

# LAI #120: Beyond Prompting

#### Harness engineering, agent architectures, and our AI engineering cheatsheet.

Good morning, AI enthusiasts,

Most teams aren’t stuck on prompts anymore. They’re stuck on everything around them: how to structure systems, route decisions, and make outputs reliable.

This week’s issue focuses on that layer. Here’s what you’ll get:

-   Where prompting ends and system design begins, and why **harness engineering** is becoming the new focus.
-   What **multimodal RAG** looks like in practice, with unified embeddings across text, images, and more.
-   How **agent systems** actually work, from ReAct loops to memory and guardrails.
-   The **foundations behind tools like Claude Code**, so you understand what’s happening under the hood.
-   When **multi-agent systems** help (and when they don’t), plus the trade-offs that matter in production.

We’re also sharing our internal AI engineering cheatsheet, a set of decision-ready references we use for writing, coding, and building agents at Towards AI.

Let’s get into it!

#### What’s AI Weekly

This week in [What’s AI](https://www.louisbouchard.ai/), I am breaking down Harness Engineering. If you’ve been hearing “harness engineering” everywhere lately and your first thought is, okay, so this is probably just prompt engineering with a nicer name, that’s the first misconception to kill. By the end of this, you should be able to tell the difference between prompt engineering, context engineering, and harness engineering, and more importantly, why the industry suddenly started caring about this now. [Read the complete article here](https://www.louisbouchard.ai/harness-engineering/) or [watch the video on YouTube](https://youtu.be/zYerCzIexCg).

*— Louis-François Bouchard, Towards AI Co-founder & Head of Community*

We are sharing our internal **AI engineering cheatsheets**, which include the AI engineering best practices we feed our agents.

![](https://cdn-images-1.medium.com/max/1024/1*3L8Le3xRX7QO5cQBA9QEBQ.png)

It is a GitHub repo containing decision-ready references for the most common AI engineering problems, distilled into dense markdown files you can use mid-build or feed directly into Claude, so it works from decisions already tested on real systems.

They cover every decision that slows a build down: which model and setup to use, how to structure your agents, and how to get output that doesn’t sound generated. Open a cheatsheet, find your situation in the table, and follow the recommendation.

[Access it here](https://github.com/louisfb01/ai-engineering-cheatsheets)!

### Learn AI Together Community Section!

#### Featured Community post from the Discord

[Cap3rnicus](https://discord.com/channels/702624558536065165/983037843532308500/1485699732201537556) has built Odyssey, a working prototype that packages an AI agent as a portable bundle, then runs that bundle through the same runtime contract across the CLI, TUI, HTTP server, and embedded Rust usage. The bundle defines the agent, the sandbox policy, the available tools, and the runtime defaults; the runtime turns that bundle into sessions, turns, events, approvals, and persisted history. [Check it out here](https://liquidos-ai.github.io/Odyssey/) and support a fellow community member. If you have any questions or feedback, [share them in the thread](https://discord.com/channels/702624558536065165/983037843532308500/1485699732201537556)!

#### AI poll of the week!

![](https://cdn-images-1.medium.com/max/1024/1*HIMZIKVgDI3Qy4f_0fzheg.png)

This one’s interesting because the vote doesn’t crown a single “magic lever”; it splits almost evenly between better models and better orchestration, with prompts still pulling real weight and evals/retrieval getting less love than they probably deserve.

My read is that this reflects where production pain actually sits right now: most teams aren’t stuck because the model can’t write English; they’re stuck because the system can’t reliably route, call tools, recover from errors, stay within budgets, and behave consistently across edge cases. Model upgrades and orchestration improvements feel like immediate, visible wins, while evals and retrieval are slower, less glamorous, and harder to “feel” until something breaks.

What failure mode are you fixing this month? [Share it in the thread](https://discord.com/channels/702624558536065165/833660976196354079/1485707787240472638), and maybe someone from the community can get you there faster.

#### Collaboration Opportunities

The Learn AI Together Discord community is flooding with collaboration opportunities. If you are excited to dive into applied AI, want a study partner, or even want to find a partner for your passion project, [join the collaboration channel](https://discord.gg/rj6m9AF7eC)! Keep an eye on this section, too — we share cool opportunities every week!

1\. [Dragank99](https://discord.com/channels/702624558536065165/1483789175575543919/1483789175575543919) is looking for a collaborator to build a FinTech project. If you are looking to practice by building, [connect with them in the thread](https://discord.com/channels/702624558536065165/1483789175575543919/1483789175575543919)!

2\. [Npg\_noob](https://discord.com/channels/702624558536065165/784477688551178240/1486267875747696750) is looking to create or join a group in the field of AI image and video generation. If this is your niche and you are looking for a group, [reach out to them in the thread](https://discord.com/channels/702624558536065165/784477688551178240/1486267875747696750)!

3\. [Sauravxthakur](https://discord.com/channels/702624558536065165/998978160605540454/1484280275029590037) has built an EdTech app for college students and is looking for help on improving it. If you can help with suggestions, [share them in the thread](https://discord.com/channels/702624558536065165/998978160605540454/1484280275029590037)!

#### Meme of the week!

![](https://cdn-images-1.medium.com/max/800/1*AEIuoTARBrSW-eH7n5NHwg.png)

Meme shared by [valo\_ai](https://discord.com/channels/702624558536065165/830572933197201459/1484346554885210164)

### TAI Curated Section

#### Article of the week

[Multimodal RAG + Gemini Embedding 2 + GPT-5.4 Just Revolutionized AI Forever](https://pub.towardsai.net/multimodal-rag-gemini-embedding-2-gpt-5-4-just-revolutionized-ai-forever-d60ef8952c06?sk=6eaa2f2f37e98a135a26415996b0cf93) By [Gao Dalie (高達烈)](https://medium.com/@GaoDalie_AI?source=post_page---byline--d60ef8952c06---------------------------------------)

Google released Gemini Embedding 2, its first native multimodal model that encodes text, images, video, audio, and PDFs into a single vector space. The author built a multimodal RAG pipeline using the model, pairing it with GPT-5.4, OpenAI’s new Sparse MoE model that supports 1.05M-token context. Each PDF page is embedded as a combined text-and-image vector, stored in ChromaDB, and retrieved at query time using cosine similarity.

#### Our must-read articles

1\. [Building ReAct Agents from Scratch: A Deep Dive into Agentic Architectures, Memory, and Guardrails](https://pub.towardsai.net/building-react-agents-from-scratch-a-deep-dive-into-agentic-architectures-memory-and-guardrails-328aa6aaf069?sk=fa18307795bfc188f977870a5e58b544) By [Utkarsh Mittal](https://medium.com/@mittalutkarsh?source=post_page---byline--328aa6aaf069---------------------------------------)

ReAct agents power tools like Claude Code and Lovable, and this piece breaks down exactly how they work, from basic LLM calls through automation pipelines to autonomous reasoning loops. The author covers building a ReAct agent from scratch, including system prompt design, tool definitions, and graceful failure handling, then connects memory types (procedural, semantic, episodic) to real personalization patterns.

2\. [Claude Code Section 1: The Foundations — 8 Concepts Every Developer Must Know](https://pub.towardsai.net/claude-code-section-1-the-foundations-8-concepts-every-developer-must-know-572dacc42f55) By [Lokesh Shivalingaiah](https://medium.com/@bslokesh?source=post_page---byline--572dacc42f55---------------------------------------)

Claude Code’s eight foundational concepts form the wiring diagram every developer needs before touching advanced features. The article covers what distinguishes Claude Code as an agentic CLI from a simple chatbot, then walks through terminal behavior, prompt construction, the permission model, core tools like Read, Write, and Bash, context window management, session history with resume capabilities, and token cost tracking.

3\. [Layer Normalisation: The Two-Line Operation Inside Every LLM You Have Ever Used. Nobody Has Explained Why It Works](https://pub.towardsai.net/layer-normalisation-the-two-line-operation-inside-every-llm-you-have-ever-used-8282b062b9de?sk=319489efe75d94a6da3b7060e1c5f0ac) By [Dr. Swarnendu AI](https://medium.com/@swarnenduiitb2020?source=post_page---byline--8282b062b9de---------------------------------------)

Layer normalisation runs at every sub-layer boundary in every major transformer, yet most practitioners treat it as boilerplate. This piece traces its origins from internal covariate shift through BatchNorm’s failure on variable-length sequences to the full LayerNorm derivation, including coupled gradient equations. It covers the Pre-Norm vs. Post-Norm split and explains why LLaMA adopted RMSNorm, dropping mean subtraction to save 20% compute with minimal quality loss.

4\. [Multi-Agent AI Systems: Architecture Patterns for Enterprise Deployment](https://pub.towardsai.net/multi-agent-ai-systems-architecture-patterns-for-enterprise-deployment-b24946527221) By [Pratik K Rupareliya](https://medium.com/@pratik-rupareliya?source=post_page---byline--b24946527221---------------------------------------)

Single-agent AI systems collapse under real production workloads, and the author uses a failed insurance claims agent to illustrate exactly why. The piece walks through four multi-agent architecture patterns: hierarchical orchestrator, collaborative swarm, pipeline, and event-driven reactive, each with code examples and trade-off tables. It also covers inter-agent communication protocols, cost management, failure handling, and a live customer support deployment that cut the confidence-but-wrong error rate from 12% to under 3%.

If you are interested in publishing with Towards AI, [check our guidelines and sign up](https://contribute.towardsai.net/). We will publish your work to our network if it meets our editorial policies and standards.

* * *

[LAI #120: Beyond Prompting](https://pub.towardsai.net/lai-120-beyond-prompting-5aba00a7094c) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.
---
metadata:
  videoId: "9mJhBzjugQg"
  title: "Mainframe modernization explained: COBOL and AI"
  description: "Visit Mixture of Experts podcast page to get more AI content → https://ibm.biz/BdpZc5


    Where does AI actually fit into the mainframe modernization journey? In this week’s episode of Mixture of Experts, host Tim Hwang is joined by experts Skyla Loomis, Maryam Ashoori and Kaoutar El Maghraoui. We dive into conversation around AI-powered mainframe modernization and AI builders. Next, 84% of the world has never used AI? A reality check on AI adoption and what needs to change. Finally, OpenClaw exposes some AI agent security gaps. We discuss \"agent ops\"—the framework for transparency, evaluation, optimization and policy enforcement that makes AI agents production-ready. All that and more on today’s Mixture of Experts.\ 


    00:00 – Introduction\ 

    1:06 – Mainframe modernization\ 

    14:18 – AI adoption reality check\ 

    29:40 – Security-by-design agentic AI\ 


    The opinions expressed in this podcast are solely those of the participants and do not necessarily reflect the views of IBM or any other organization or entity.\ 


    Learn how to operate AI agents responsibly at scale in the latest Tech Summit → https://ibm.biz/BdpZc7


    #COBOL #MainframeModernization #AIagents"
  channel: "IBM Technology"
  channelId: "UCKWaEZ-_VweaEx1j62do_vQ"
  duration: "PT44M4S"
  publishedAt: "2026-02-27T11:00:30Z"
  thumbnailUrl: "https://i.ytimg.com/vi/9mJhBzjugQg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=9mJhBzjugQg"
processedAt: "2026-02-27T13:46:56.234Z"
source: "youtube"
tldr: "IBM experts discuss that mainframe modernization isn't about replacing COBOL but integrating AI and modern DevOps to understand complex legacy code, while highlighting the immense, yet largely untapped, global market for AI that faces significant compute and trust barriers, necessitating a shift towards smaller, more targeted AI models and a robust 'security by design' framework for AI agents."
tools:
  - name: "Terraform"
    url: null
  - name: "Ansible"
    url: null
  - name: "OpenTelemetry"
    url: null
  - name: "PyTorch"
    url: null
  - name: "Dynamo"
    url: null
  - name: "Inductor"
    url: null
  - name: "Cursor"
    url: null
  - name: "Claude Code"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "Quill"
    url: null
  - name: "Quillium"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "llm"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 30540
  outputTokens: 2235
  totalTokens: 32775
  processingTimeMs: 16557
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.548Z"
---

## Key Takeaways

*   **Mainframe modernization** is misunderstood; it's not about migrating off the mainframe or abandoning **COBOL**, but about integrating modern technologies like AI and DevOps to enhance existing, highly optimized systems. **COBOL** remains performant and essential for specific workloads.

*   AI's role in modernization is to act as an **"AI apprentice"** for human builders, helping to **understand decades-old, undocumented COBOL applications**, derisk changes, and accelerate development by making complex business logic more accessible.

*   The **global adoption of AI** is still in its nascent stages, with a massive untapped market beyond the tech bubble. However, scaling AI to billions of users presents colossal challenges in **compute infrastructure, energy, and talent**, requiring a significant investment to achieve a positive ROI.

*   The future of AI adoption likely involves a **hybrid approach**: leveraging **smaller, more predictable models (SLMs)** for routine tasks and edge AI, complemented by **larger LLMs** for complex reasoning and strategic decisions, with **AI agents** orchestrating interactions.

*   **Security by design** for AI agents is paramount. Key challenges include **accountability** (who is responsible when an agent fails?), **traceability, evaluation (eval)** of agent behavior, **optimization**, and robust **policy enforcement** with guardrails, ideally across hardware and software layers.

*   For mainframes, agents are currently focused on **insight, analysis, and recommendations**, with actions tied directly to user credentials and existing, deeply embedded mainframe security profiles to ensure controlled and auditable operations.

## Summary

### Mainframe Modernization: Beyond MigrationThe discussion begins by challenging the common misconception that mainframe modernization equates to migrating off the platform. Skyla Lumis, General Manager, IBM Z Software, emphasizes that mainframes endure because of their unparalleled **quality of service** and optimized stack for specific workloads. The goal isn't to replace languages like **COBOL**, which is incredibly performant and compiles to highly optimized machine code, but rather to enhance and integrate with existing systems. Modernization efforts should focus on leveraging open technologies like **Terraform, Ansible, and OpenTelemetry** for operations management, and advanced data integration patterns like eventing and optimized caching.

Clients often express a desire to **remain in COBOL** but need help understanding their vast, decades-old codebases, which contain undocumented business logic and were written by developers no longer with the company. This is where AI becomes crucial. Skyla highlights that AI can act as an **"AI apprentice"** to help developers understand complex applications, derisk changes, and accelerate work on unfamiliar code. Koutar El McGrowi, Principal Research Scientist, adds that AI-driven code generation and targeted transformations can extract business logic and wrap it in modern APIs, enabling developers to use modern DevOps toolchains while preserving the valuable legacy infrastructure.

### The Role of AI in Understanding Legacy SystemsThe panel stresses that mainframe modernization with AI isn't solely reliant on Large Language Models (LLMs). IBM's approach combines LLMs with **deep static analysis** and a profound understanding of the mainframe platform. This is critical because mainframe codebases are often tens or hundreds of millions of lines, highly interconnected, and contain subtle, undocumented nuances that an LLM alone cannot fully grasp without generating hallucinations or errors. Furthermore, clients often lack comprehensive tests or clear specifications for these legacy applications, making it difficult to validate automated translations.

Skyla explains that the process is more akin to **"archaeology,"** where AI helps uncover and understand the code just enough for human experts to perform the modernization. This involves significant **prompt engineering** and context engineering to guide LLMs intelligently. AI acts as a major accelerant, making previously daunting modernization projects feasible by providing incremental insights and focused solutions. The panelists underscore the importance of an **incremental approach**, focusing on specific problems like agility or critical code areas, and always linking modernization efforts to a clear **ROI**. Additionally, modernizing development practices and adopting agile DevOps toolchains are essential to effectively integrate AI-driven changes and manage risk and quality.

### The Untapped Global AI Market and Compute ChallengesMiriam Ashuri, VP of Product Engineering, AI Governance, reflects on a viral visualization showing that a tiny fraction of the global population has truly engaged with AI. She translates this into a colossal opportunity, but also a monumental challenge. Using a hypothetical scenario of 6.8 billion people having one AI interaction per month (e.g., a customer service call augmented by AI), she calculates the need for approximately 1 billion tokens. This translates to an estimated **10 million NVIDIA H100 GPUs** (at 100 tokens/second/GPU), dramatically outstripping the current global supply of 100,000 to a low million GPUs.

This calculation highlights the immense infrastructure, energy, and talent required to scale AI globally. Koutar emphasizes that AI adoption is currently limited by **compute cost, infrastructure, affordability, and trust**, not just technical capabilities. He points out that the tech community often overestimates AI adoption due to living in a "Silicon Valley bubble." The true AI revolution, he argues, will occur when AI becomes **"invisible"**—embedded seamlessly into everyday software and services without users actively thinking of it as AI. This widespread integration will require a shift towards smaller, more efficient models and significant research into model compression.

### The Future: Small Models, Hybrid Architectures, and Agent SecuritySkyla suggests that the current state of AI adoption is akin to the early 2000s or 2005 Internet age. She foresees a future dominated by **smaller, more focused AI models (SLMs)**, which are more predictable and reliable for targeted use cases, offering a practical path to scaling AI adoption given the current compute constraints. She believes in a **hybrid model**, where SLMs handle routine tasks, while larger, more creative LLMs are reserved for complex reasoning and strategic thinking. Koutar supports this, envisioning a **tiered intelligence architecture** where SLMs act as default, handling routine tasks, and LLMs serve as "escalation engines" for deep, multi-step reasoning and novel problem-solving, orchestrated by **AI agents** that decide when and which model to invoke.

The final segment addresses the critical issue of **security by design for AI agents**. Miriam recounts client advisory board feedback, identifying **accountability** as the primary challenge: who is responsible when an agent fails? This extends to auditing lineage, identifying the source of errors (LLM trainer, agent builder, third-party tool, or end-user misuse), and managing identity and access for agents. IBM addresses this through **"AgentOps,"** focusing on four key areas: **transparency and traceability** of agent actions, **evaluation (eval)** to ensure agents do the right thing (a rapidly evolving and challenging area), **optimization** of resource usage, and robust **policy enforcement** with guardrails.

Koutar adds that security must be integrated across multiple layers, from application to hardware. This includes a blueprint for agents with **default-deny autonomy**, explicit approval gates, **least privilege identity**, minimal scopes, and short-lived credentials. **Isolation by default** using hardened sandboxes (containers, VMs), egress controls (whitelisted domains), and memory/data controls for sensitive contexts are also crucial. Skyla concludes by stating that IBM is already deploying domain-specific, targeted agentic frameworks on mainframes for operations, database administration, and business analysis. These agents are designed to provide insights and recommendations, with actions directly tied to the user's existing mainframe security credentials, ensuring that an agent cannot perform any action a human user isn't authorized to do, thus leveraging the platform's decades-old, deeply embedded security profile rather than reinventing it.

## Context

This episode of IBM Technology's "Mixture of Experts" podcast features industry leaders Skyla Lumis (GM, IBM Z Software), Koutar El McGrowi (Principal Research Scientist), and Miriam Ashuri (VP of Product Engineering, AI Governance). They discuss the pressing challenges and opportunities in integrating AI with enterprise systems, particularly mainframes, and the broader implications for AI adoption and security. The conversation is relevant now as enterprises grapple with modernizing legacy infrastructure while navigating the rapid advancements and ethical considerations of AI, making it ideal for IT leaders, software architects, and AI strategists looking for practical insights into large-scale AI deployment and governance.
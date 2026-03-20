---
metadata:
  videoId: "iXAgtR-DO3I"
  title: "Inside Perplexity Computer’s agent platform"
  description: "Visit Mixture of Experts podcast page to get more AI content → https://ibm.biz/Bdp2fD


    Is Perplexity still focused on search? This week on Mixture of Experts, Host Tim Hwang is joined by Gabe Goodhart, Chris Hay and Aaron Baughman to break down what Perplexity Computer really offers—and whether closed systems can compete with open alternatives like OpenClaw, LangGraph and AutoGPT. Next, Anthropic introduces memory import for Claude. Is memory still a competitive moat, or can users now seamlessly switch between AI providers? Then, meet NullClaw, a minimalist agent framework that runs on just 678 kilobytes. Our experts debate whether edge-based agent swarms are the future—or just clever marketing. Finally, Particle6 unveils Tilly Norwood, the world’s first AI actor. Would you give an Oscar to an algorithm? All that and more on this week’s Mixture of Experts.\ 


    00:00 -- Introduction\ 

    1:07 -- Perplexity Computer\ 

    11:23 -- Claude Import Memory\ 

    24:14 -- NullClaw\ 

    35:14 -- Tilly Norwood\ 


    The opinions expressed in this podcast are solely those of the participants and do not necessarily reflect the views of IBM or any other organization or entity.\ 


    Subscribe for AI updates →https://ibm.biz/Bdp2fR


    #AIagents #AIcodeassistant #AIsearch"
  channel: "IBM Technology"
  channelId: "UCKWaEZ-_VweaEx1j62do_vQ"
  duration: "PT45M26S"
  publishedAt: "2026-03-06T11:01:15Z"
  thumbnailUrl: "https://i.ytimg.com/vi/iXAgtR-DO3I/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=iXAgtR-DO3I"
processedAt: "2026-03-06T19:06:35.280Z"
source: "youtube"
tldr: "In this panel discussion, IBM experts analyze the competitive AI landscape post-OpenClaw, focusing on Perplexity Computer's agent platform, Claude's import memory feature, the minimalist NullClaw framework, and the ethical implications of AI actors like Tilly Norwood, concluding that vendor-agnostic memory and robust security are more critical than proprietary agent ecosystems."
tools:
  - name: "OpenClaw"
    url: null
  - name: "Perplexity Computer"
    url: null
  - name: "Claude"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "AutoGPT"
    url: null
  - name: "LangGraph"
    url: null
  - name: "skill.sh"
    url: "https://skill.sh"
  - name: "Docker"
    url: null
  - name: "GitHub"
    url: null
  - name: "DockerHub"
    url: null
  - name: "Llama.cpp"
    url: null
  - name: "Zig"
    url: null
  - name: "Rust"
    url: null
  - name: "Go"
    url: null
  - name: "Model Context Protocol (MCP)"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-general"
  - "claude"
  - "innovation"
  - "llm"
  - "security-general"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 33737
  outputTokens: 1911
  totalTokens: 35648
  processingTimeMs: 60054
tagsNormalizedAt: "2026-03-06T19:29:17.532Z"
---

## Key Takeaways

A panel of IBM experts dissects recent AI developments, arguing the competitive landscape is shifting from proprietary agent platforms to interoperability and security.

*   **Perplexity Computer** is a **closed, curated agent platform** emphasizing safety by running in the cloud, but it's criticized for high cost ($200/month) and not solving core **agent security** problems like prompt injection.

*   **Claude's import memory** is seen as a minor feature that **erodes vendor lock-in as a moat**, with panelists advocating for future **vendor-agnostic, user-owned memory** systems.

*   **NullClaw** is a **minimalist agent framework** (678KB, 1MB RAM) but is critiqued as hype because it's just a wrapper and doesn't include local model inference, the true bottleneck for edge deployment.

*   The emergence of **AI actors like Tilly Norwood** raises deep **ethical questions about personification and authenticity**, with split opinions on whether this is an innovative art form or a dangerous path.

*   **Agent security remains unsolved**, with risks like **prompt injection**, destructive permissions, and **memory poisoning** (corrupting data exports) being fundamental challenges for both open and closed systems.

*   The future points towards **specialized agent niches** (e.g., no-code, deep reasoning, custom workflows), **swarm intelligence** on edge devices, and the decoupling of memory, inference, and orchestration into independent, interoperable components.

## Summary

### Analysis of Perplexity Computer

The panel begins by examining Perplexity's new **agent orchestration platform**, Perplexity Computer. Chris Haye frames it as an evolution from a search engine to an **end-to-end agentic platform**, where search is just one component. Gabe Goodhart notes it's a **closed, curated system** that runs in the cloud, which Perplexity markets as safer than open systems like OpenClaw. However, he argues the security narrative is flawed. The real risks—**unfettered system access**, **destructive permissions**, and **prompt injection**—are not inherently solved by a closed system. A curated list of integrations only mitigates risk from community skills, not from malicious web content. Aaron Botman highlights significant barriers to adoption: a high price point (around $200/month for the max tier), inflated marketing claims, and a crowded competitive field. He maps the landscape:

*   **Perplexity Computer**: Best for no-code, multi-step workflows.

*   **Claude Co-Work**: For deep reasoning and assisted tasks.

*   **OpenClaw**: For personal autonomous agents.

*   **LangGraph**: For custom, graph-based agent workflows.

*   **AutoGPT**: For autonomous task execution. The consensus is that Perplexity has real underlying research but faces a challenge proving its practical value beyond hype.

### Claude's Import Memory and the Future of AI Memory

The discussion shifts to Anthropic's announcement that users can import memories into Claude. Tim Hong posits this undermines the idea that a chatbot's accumulated memory of a user is a major source of **vendor lock-in**. Chris Haye downplays the feature's significance, stating a user's full **chat history** is more valuable than curated memories, and technical users often prefer atomic, context-controlled sessions. Gabe Goodhart reveals the implementation is rudimentary—essentially prompt-engineering ChatGPT to export data—and easy for competitors to block. He identifies a deeper divide: technical users avoid persistent memory for control, while the general public may embrace it for personal relationships with AI. The critical insight is that **memory should be vendor-agnostic and user-owned**. Goodhart envisions a future where a person owns their AI memory independently and can connect it to any model (ChatGPT, Claude, local models) as needed. This portability, enabled by protocols like **MCP (Model Context Protocol)**, means memory is no longer a sustainable competitive moat. Aaron Botman raises the novel threat of **memory poisoning**, where false data injected into one model's memory could be exported and amplified across others, creating a viral spread of misinformation.

### NullClaw and the Push for Minimalist Agents

The panel examines **NullClaw**, a minimalist agent framework written in Zig that is incredibly small (678KB) and fast-booting. Chris Haye is highly critical, calling it mostly hype. He argues it optimizes the wrong thing: it's just a **wrapper/rapper** around existing models and doesn't include local inference, which is the true resource hog. Comparing it to running Doom on a toaster, he says the real innovation would be combining such a framework with a tiny local inference model like **Karpathy's nanoGPT**. Gabe Goodhart offers a more nuanced view, seeing NullClaw as an exploration of the **agent surface's connectivity degree**. He describes a spectrum from massive centralized frontier models serving millions of agents to fully encapsulated, air-gapped edge agents. NullClaw pushes the boundary of how small the orchestration layer can be, which could be valuable for low-cost sensor-based IoT automation. Aaron Botman zooms out to the conceptual level, comparing the vision to **ant colony optimization** and **lab-on-a-chip technology**—where many simple, small agents (or processes) work in concert to create swarm intelligence. The economic and network challenges of such a distributed swarm model remain significant.

### The Ethics of AI Actors: The Case of Tilly Norwood

The final topic is Particle 6's announcement of **Tilly Norwood**, billed as the world's first AI actor. Chris Haye is enthusiastically "all in," drawing parallels to virtual bands like Gorillaz or enduring fictional characters like Mickey Mouse. He argues audiences form connections with characters, not necessarily the human actors behind them, and AI-generated characters could consistently appear across media. Gabe Goodhart expresses caution, highlighting the **ethical dangers of personification**. He references a podcast about a founder who created AI employees with personas and backstories, leading to real frustration when they underperformed—a warning about anthropomorphizing algorithms. The key question is whether Tilly is a **character or an actor**. Awarding an AI an Oscar would challenge fundamental assumptions about creativity and human experience. Aaron Botman also leans cautious, pointing to unresolved issues of **consent, likeness, authenticity, and creative ownership**. He notes that unlike interactive AI from companies like Soul Machines, Tilly represents a one-way performance, but it still forces a confrontation with what it means to be a creative performer. The panel concludes that the very announcement sparked the controversy, suggesting a stealthier rollout might have been more effective.

## Context

This episode of the 'Mixture of Experts' podcast from IBM Technology features a panel of seasoned IBM researchers and architects—Gabe Goodhart (Chief Architect, AI Open Innovation), Chris Haye (Distinguished Engineer), and Aaron Botman (IBM Fellow and Master Inventor)—hosted by Tim Hong. The discussion occurs in the rapidly evolving post-OpenClaw landscape, where multiple companies are launching AI agent platforms and features. The panel provides a critical, insider's perspective on the technical substance, security implications, and market viability of these announcements, cutting through marketing hype. This analysis is crucial for developers, product leaders, and business strategists navigating the competitive and ethical complexities of building and deploying AI agent systems. The full video offers deeper dives into the panelists' reasoning and their debates on the future architecture of AI.
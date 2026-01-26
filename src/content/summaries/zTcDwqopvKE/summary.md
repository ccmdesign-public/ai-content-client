---
metadata:
  videoId: "zTcDwqopvKE"
  title: "Agent Experts: Finally, Agents That ACTUALLY Learn"
  description: "THIS is THE massive problem holding back AI agents today.


    ---


    IndyDevDan here, super excited to say: Agentic Horizon Lesson 5 (TAC 13) is officially live on (link below).

    Huge thanks to every engineer that's a member and has taken Tactical Agentic Coding and Agentic Horizon - your feedback and votes were key to making this lesson happen (and the FINAL LESSON as well).


    For all non-members, this video is a sneak peak of the full lesson available to Agentic Horizon members.

    If you're interesting you can unlock this lesson and others by purchasing Tactical Agentic Coding AND Agentic Horizon.

    Let me be clear, TAC and AH is not for beginners. See the landing page for more details.


    ---


    🎥 VIDEO REFERENCES

    • Tactical Agentic Cooking: https://agenticengineer.com/tactical-agentic-coding?y=zTcDwqopvKE


    🤖 Traditional software gets smarter with every use - storing analytics, patterns, and data that power better algorithms. But AI agents today? They execute and forget. Every. Single. Time.


    The real problem isn't bad context engineering or weak prompt engineering. It's that your agents don't learn. Memory files force global context but require manual updates. Prime prompts, sub-agents, and skills are powerful but YOU have to manually steer them every time you want to add new information.


    🔥 What if your agents could turn actions into expertise automatically? What if they could learn WITHOUT human intervention? That's the difference between generic agents and agent experts.


    Generic agents execute and forget. Agent experts execute and LEARN.


    💡 In this game-changing video, we reveal how to build agents that act, learn, and reuse expertise at runtime with NO human in the loop. Real experts don't relearn their craft every time - they have a mental model that evolves with each useful action. That's exactly what we're building here.


    🛠️ We dive deep into meta agentics - the atoms that make up agent experts. You'll learn how to build meta prompts (prompts that write prompts), meta agents (agents that build agents), and meta skills (skills that create skills). These are the foundational tools every agentic engineer needs in their arsenal.


    🚀 Watch as we demonstrate our orchestrator agent operating a multi-agent system where WebSocket experts and database experts maintain their own expertise files - concrete mental models of their problem space. These agents validate their understanding against the actual code, update automatically, and become more proficient with zero manual intervention.


    ⚡ We'll show you how to scale compute by deploying three, five, or ten agent experts against a single question to co-locate on the right answer. See how tactical agentic coding transforms from one-shot prompts to self-improving systems that handle planning, building, AND learning.


    🌟 This is the future of agentic coding - where agents don't just execute your commands, they accumulate expertise around the specific problems that matter most to you, your business, and your customers. This is how you build agents that improve as they're used, just like traditional software, but powered by AI.


    Key insights:

    - Build self-improving template metaprompts that learn at runtime

    - Create expertise files that serve as mental models for your agents

    - Use multi-agent orchestration to validate answers with high confidence

    - Implement the three-step workflow: plan, build, self-improve

    - Scale up compute by deploying multiple experts against critical problems

    - Understand why the code is ALWAYS the source of truth (not docs, not comments)


    💼 The game never ends except when your agents stop learning. I don't know about you, but I want experts operating my codebase and products - not generic agents I have to manually manage every single time.


    Stay focused and keep building.


    #aiagents #agenticcoding #aicoding"
  channel: "IndyDevDan"
  channelId: "UC_x36zCEGilGpB1m-V4gmjg"
  duration: "PT18M54S"
  publishedAt: "2025-12-15T14:01:49Z"
  thumbnailUrl: "https://i.ytimg.com/vi/zTcDwqopvKE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=zTcDwqopvKE"
processedAt: "2026-01-12T23:42:35.053Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Current AI agents forget; **Agent Experts** solve this by learning and reusing expertise at runtime. They automatically update an **\"expertise file\"** (mental model) by validating against the codebase, using **meta-agentics** (meta prompts, agents, skills) for continuous self-improvement without human intervention. This enables agents to build and evolve their knowledge autonomously.\n"
ai:
  provider: "gemini"
  model: "gemini-2.5-flash"
  apiCalls: 3
  fallbackAttempts: 2
  inputTokens: 4522
  outputTokens: 1150
  totalTokens: 7538
  processingTimeMs: 23789
tools:
  - name: "Tactical Agentic Coding"
    url: "https://agenticengineer.com/tactical-agentic-coding?y=zTcDwqopvKE"
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - llm
  - agents
  - ai-coding
  - automation
  - architecture
  - best-practices
---

## Key Takeaways

This video introduces **Agent Experts**, a paradigm shift for AI agents that enables them to learn and improve autonomously over time by building and maintaining an internal "mental model." 
- The core limitation of traditional agents is their inability to **learn and remember** past interactions, requiring constant manual updates to their knowledge base (memory files, prompts, skills).

- **Agent Experts** overcome this by automatically building and maintaining an "expertise file" (a data structure serving as their **mental model**). This file is continuously validated against the **codebase (the true source of truth)** and updated via a "self-improve" prompt after every useful action.

- **Meta-agentics** (meta prompts, meta agents, meta skills) are crucial foundational tools that allow agents to build and modify other agentic components, significantly boosting an engineer's output, though they don't inherently learn like true experts.

- By continuously learning and updating their expertise, Agent Experts can perform complex tasks, answer domain-specific questions, and even **update codebases** within their specialized domain with high proficiency and minimal human oversight. They can also be scaled using orchestration systems.

## Summary

The video highlights a significant problem with current AI agents: they forget and do not learn from their interactions, unlike traditional software that improves with usage. This necessitates constant manual updates to their context, memory files, prompts, sub-agents, and skills, making them inefficient for complex, evolving tasks.

To address this, the concept of **Agent Experts** is introduced. An Agent Expert is designed to "execute and learn," rather than merely "execute and forget." These experts automatically convert actions into reusable expertise, storing and applying information autonomously. They achieve this by developing an evolving "mental model," which is essentially a data structure that accumulates information, examples, and domain-specific expertise. This makes an Agent Expert a form of "self-improving template metaprompt."

### Meta-Agentics: The Foundation
The development of Agent Experts heavily relies on **meta-agentics**, a set of tools that enable agents to build elements of the system that builds the system itself. These include:

-   **Meta Prompts**: Prompts that can generate new prompts, allowing for dynamic prompt creation (e.g., generating a "question with mermaid diagrams" prompt).

-   **Meta Agents**: Agents capable of building other agents, facilitating the scaling of agentic functionalities (e.g., creating a new planner agent).

-   **Meta Skills**: Skills that can generate new skills, streamlining the development of complex agent workflows (e.g., creating a "start orchestrator" skill).
While meta-agentics significantly enhance an agentic engineer's productivity by automating component creation, they are not Agent Experts in themselves because they lack the inherent self-learning capability.

### How Agent Experts Learn Autonomously
The core differentiator of an Agent Expert is its autonomous learning. This learning mechanism is powered by an "expertise file" (typically a YAML file) that serves as the agent's **mental model** for a particular problem space. When an agent expert receives a task or question, it first consults this expertise file. Crucially, it then validates its understanding against the actual codebase, which is considered the ultimate **"true source of truth."** After performing an action or making an update to the codebase, a specialized "self-improve" prompt is triggered. This prompt updates the expertise file, synchronizing the agent's mental model with the current state of the codebase. This continuous feedback loop ensures the agent's knowledge remains accurate and evolves with the system.

### Practical Applications and Benefits
The video illustrates the power of Agent Experts through examples like a "database expert" and a "websocket expert." These experts demonstrate a deep understanding of their domains, efficiently answering complex questions about system architecture (e.g., database information flow or existing websocket events) and even autonomously implementing code changes, such as adding a session-based counter for websocket events. Agent Experts can also be deployed within multi-agent orchestration systems, allowing multiple experts to collaborate on a single problem. This "collocation on the right answer" approach significantly boosts confidence in outcomes and enables comprehensive codebase updates, where planning, building, and continuous knowledge improvement are all managed by the agents. The foundational principles remain **context, model, prompt, and tools**, with Agent Experts providing a sophisticated layer of automation and continuous self-improvement.

## Context

This video is crucial for developers and businesses engaged in building and deploying AI agents. It addresses the inherent limitation of current AI agents, which, despite advanced prompt engineering, lack the ability to learn and retain information over time. By introducing **Agent Experts**, the video offers a solution that enables autonomous learning and self-improvement for AI systems. This innovation is vital for creating more robust, efficient, and low-maintenance AI applications, aligning with the broader trend toward more intelligent and self-managing AI agents that can adapt and evolve without constant human intervention. It pushes the boundary of agentic AI towards true artificial expertise and promises significant advancements in intelligent automation.

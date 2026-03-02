---
metadata:
  videoId: "SVUymPVBvfo"
  title: "Context Graphs: AI's Next Big Idea"
  description: "Context graphs capture decision traces, exceptions, precedents, and cross-system signals explaining why past choices occurred and making automated decisions auditable. Analysis contrasts traditional systems of record and data warehouses with cross-system agents requiring accessible decision lineage for reliable automation. Implications include context engineering, organizational change management, and design approaches enabling agents to discover organizational schema from real usage rather than predefined schemas.




    The AI Daily Brief helps you understand the most important news and discussions in AI.\ 

    Subscribe to the podcast version of The AI Daily Brief wherever you listen: https://pod.link/1680633614

    Get it ad free at\ 

    Join our Discord: https://bit.ly/aibreakdown"
  channel: "The AI Daily Brief: Artificial Intelligence News"
  channelId: "UCKelCK4ZaO6HeEI1KQjqzWA"
  duration: "PT14M17S"
  publishedAt: "2026-01-06T01:32:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/SVUymPVBvfo/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=SVUymPVBvfo"
processedAt: "2026-01-11T17:16:19.644Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Context graphs represent the next evolution in AI by capturing “decision traces”—the “why” behind business actions that currently live in Slack threads and tribal knowledge. By transforming these historical exceptions, overrides, and cross-system contexts into a queryable graph, organizations can transition from fragile data systems to autonomous agents capable of nuanced judgment."
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3558
  outputTokens: 907
  totalTokens: 5327
  processingTimeMs: 13876
tools:
  - name: "Salesforce"
    url: null
  - name: "Netsuite"
    url: null
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Programming"
tags:
  - "agents"
  - "architecture"
  - "data-pipeline"
  - "llm"
tagsNormalizedAt: "2026-03-01T21:19:30.534Z"
---

## Key Takeaways

This video explores why enterprise AI is shifting focus from raw data to the underlying logic of human decision-making.

* **Systems of Record** (like Salesforce or Netsuite) are insufficient for agents because they only track the “what” (data states) rather than the “why” (decision lineage).

* **Context Graphs** bridge this gap by stitching together **decision traces**, which include the specific inputs, precedents, and approvals used to resolve exceptions or edge cases.

* **Context Engineering** will become a core discipline, as humans transition from individual contributors to managers of agents who provide oversight and high-level judgment.

* The **emergent schema** approach suggests that we shouldn't pre-define these graphs; instead, agents should discover the real organizational logic by “walking” through past decision trajectories.

## Summary

The discussion begins with investor Jamine Ball’s critique of the current enterprise landscape. While companies have invested heavily in **data warehouses** and **lakehouses**, these systems often act as retrospective mirrors rather than transactional front doors. The core problem is a lack of a **canonical source of truth**; for example, Sales, Finance, and Legal often have different definitions of the same metric (like ARR). For AI agents to work autonomously, they need to know which system “wins” in any given conflict.

Building on this, Foundation Capital’s Jay Agupta and Ashug introduce the concept of the **Context Graph**. They argue that the most valuable enterprise information—decision traces, overrides, and cross-system logic—is currently missing from structured databases. It exists as “tribal knowledge” in human heads or unstructured Slack conversations. A context graph captures these moments of judgment, such as why a specific customer was granted a 10% discount despite a policy cap. This turns individual exceptions into searchable, reusable **precedent**.

### The Shift from Rules to Decision Traces
Traditional automation relies on static rules, which often break when faced with the messy reality of business. Context graphs shift the focus to the **decision trace**: a record of what inputs were gathered, what policy was evaluated, who approved the deviation, and what the final state was. When these traces are persisted, they create a living world model of how a company actually operates, rather than how it *claims* to operate in its manual. 

### Dynamic Discovery vs. Manual Schema
One of the most innovative insights shared is that context graphs should not be pre-defined by humans. Traditional knowledge graphs often fail because they require a manual schema that becomes outdated. Instead, modern agents act as “informed walkers.” As they solve problems, they discover the **organizational ontology** on the fly. Thousands of these agent “walks” reveal the true patterns of usage and decision-making, allowing the system to learn the “policy in practice” automatically.

### The Human Role in the Era of Context
Box CEO Aaron Levy suggests that as agents become more powerful, humans will adapt to them rather than the other way around. This involves **Context Engineering**, where the human's primary role is to shepherd work between agents and provide the oversight necessary for complex escalations. Ultimately, the most uniquely human part of work—high-level judgment and the ability to break patterns when reality shifts—will be the final layer of the context graph.

## Context

As the AI industry moves past basic chatbots into the era of autonomous enterprise agents, the primary bottleneck has shifted from model reasoning to data context. This conversation matters because it identifies why early AI implementations often fail in complex corporate environments: they lack access to the 'tribal knowledge' that governs daily operations. Leaders and developers should care about context graphs as they represent the infrastructure required to scale AI beyond simple tasks into high-stakes decision-making. This trend connects to the broader shift toward agentic workflows and the realization that the next trillion dollars in AI value lies in capturing and digitizing the nuance of human judgment.

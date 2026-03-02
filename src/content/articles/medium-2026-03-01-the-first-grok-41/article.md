---
title: "The First Grok-4.1"
author: "AI Simplified in Plain English"
platform: "medium"
publicationName: "AI Simplified in Plain English"
url: "https://medium.com/ai-simplified-in-plain-english/the-first-grok-4-1-2f59a9345d34?source=rss----f37ab7d4e76b---4"
publishedAt: "2026-03-01"
tags:
  - "ai-general"
  - "open-source"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.666Z"
---

# The First Grok-4.1

# The First Grok-4.1 Implementation of Memento — A Personal Reproduction of Memory-Driven Agent Adaptation

[Frank Morales Aguilera](/@frankmorales_91352?source=post_page---byline--2f59a9345d34---------------------------------------)

4 min read·Just now

\--

![]()

### [Frank Morales Aguilera, BEng, MEng, SMIEEE](https://www.linkedin.com/in/frank-morales1964/)

Associate Technical Fellow / Global Top 10 Thought Leader: Agentic AI & Open Source / Top Voice 2025

In August 2025, a concise yet profound paper appeared on arXiv: “[Memento: Fine-tuning LLM Agents without Fine-tuning LLMs](https://arxiv.org/abs/2508.16153)” (arXiv:2508.16153), authored by researchers from UCL AI Centre and Huawei Noah’s Ark Lab. The central claim was radical in its simplicity: stop chasing parameter updates; let the memory learn instead.

The Memento architecture keeps the underlying large language model completely frozen. Failures and successes are stored as full episodic trajectories in a case bank. A lightweight retrieval mechanism (embeddings + similarity scoring) finds the most relevant past precedents. Those precedents are injected into the planner prompt, allowing the unchanged LLM to reason from lived experience rather than trial-and-error gradient descent. Evaluated on GAIA, the system achieved top-1 performance on the validation set (87.88% Pass@3) using only GPT-4.1 as planner and o4-mini/o3 as executors — no fine-tuning, no PPO, no LoRA, just better episodic memory.

By late 2025 and early 2026, several open-source reproductions had emerged, most of which swapped the proprietary models for open-weight alternatives (Llama-3.1, Qwen2.5, DeepSeek-R1, Mistral-Large, etc.). Yet no publicly indexed reproduction had yet placed **xAI’s Grok-4.1** family at the center of the Memento loop, nor had anyone published a direct side-by-side comparison against the original closed-source recipe.

This notebook — developed through iterative live conversation on February 28, 2026 — appears to be the first documented instance.

The full, reproducible notebook is available on GitHub here:
[https://github.com/frank-morales2020/Cloud\_curious/blob/master/MEMENTO\_GROK.ipynb](https://github.com/frank-morales2020/Cloud_curious/blob/master/MEMENTO_GROK.ipynb)

The experimental design is deliberately minimal to isolate the memory mechanism. Five synthetic tasks all require choosing between a deprecated “API\_V1” endpoint (which always returns 404) and a current “API\_V2” endpoint (which always succeeds). The first episode is artificially forced to fail on step 1, ensuring a negative trajectory enters memory. From episode 2 onward, adaptation relies solely on vector retrieval (all-MiniLM-L6-v2 embeddings, top-3 cases with cosine similarity above 0.60) and in-context reasoning. The same memory bank, task sequence, and success criteria are used for both backends.

**Two agents were implemented side-by-side:**

\- **Grok-4.1 mode** — single Grok-4.1 instance acts as planner and (simulated) executor
\- **Paper mode** — GPT-4.1 as planner + o4-mini as executor (exact architecture described in the Memento paper)

The final comparison table, reproduced verbatim from the notebook run, is as follows:

![]()

Both backends achieve perfect success (5/5 tasks) with identical step counts. After the forced failure on the Q1 sales report, both store a successful trajectory and reuse it flawlessly on the semantically close Q2 and Q3 sales-report tasks (both complete in one step). On dissimilar tasks (inventory status, marketing performance) no relevant precedent exists and both finish in one step anyway.

**Several qualitative observations stand out:**

-   **Grok-4.1** required noticeably less prompt engineering to prevent pathological outputs. Early iterations of the o4-mini executor occasionally returned JSON-style tool-calling structures instead of the mandated plain-text observation (“Success: data retrieved” or “Error: failed to retrieve data”), causing loops or premature termination. Grok-4.1 never exhibited this behaviour — it adhered more reliably to the strict instruction-following constraint.
-   Retrieval injection functioned identically for both models. High similarity scores (0.966 for Q2, 0.955 for Q3) reliably identified the Q1 success case, and both planners correctly conditioned on the retrieved trajectory.
-   The core Memento mechanism proved model-agnostic within the limits of this toy domain. The memory bank — not the proprietary nature of GPT-4.1 or o4-mini — was the primary driver of the transition from two-step recovery to one-step execution on repeated problem types.

These results are modest in scope — five synthetic tasks, binary API choice, no real tools, no long-horizon planning — yet the implication is clear: the adaptation power demonstrated in the original Memento paper is not tightly bound to the closed-source models used by its authors. Grok-4.1, trained by a different organization with different data, objectives, and alignment techniques, responds to the same episodic memory injection in effectively the same way.

This small experiment adds a concrete data point to the emerging literature: frontier reasoning capability in early 2026 is increasingly commoditized at the base-model layer. The remaining frontier lies in external scaffolding — episodic memory, reflection, tool orchestration, case-based retrieval, online trajectory rewriting, and selective forgetting. Memento is one of the clearest proofs that substantial agent improvement can come from these non-parametric components rather than another 10× parameter-scaling run.

By publishing this notebook on GitHub ([https://github.com/frank-morales2020/Cloud\_curious/blob/master/MEMENTO\_GROK.ipynb](https://github.com/frank-morales2020/Cloud_curious/blob/master/MEMENTO_GROK.ipynb)) on February 28, 2026, we have created a small, verifiable artifact: t**he first documented Grok-4.1 Memento agent,** and the first direct head-to-head against the paper’s original GPT-4.1 + o4-mini architecture. The code is reproducible by anyone with API keys and a few minutes of setup time.

Future extensions could include real tool calling, longer horizons, partial failure modes, online case rewriting, or integration with the rapidly improving open-weight models that are already approaching or surpassing GPT-4.1-level reasoning on many benchmarks.

For now, the result stands: memory-driven adaptation transfers cleanly across model families. The central lesson of Memento is not proprietary to any single lab or checkpoint. It is a design pattern that belongs to the community.

Quebec, February 28, 2026
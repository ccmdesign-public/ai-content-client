---
title: "Evaluating Metrics for RAG Systems and Agentic AI"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/evaluating-metrics-for-rag-systems-and-agentic-ai-7cb189576052?source=rss----98111c9905da---4"
publishedAt: "2026-01-31"
tags:
  - "ai-general"
  - "machine-learning"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.582Z"
---

# Evaluating Metrics for RAG Systems and Agentic AI

# Evaluating Metrics for RAG Systems and Agentic AI

[Sachchida Nand Singh](https://medium.com/@sachi.algoexpert?source=post_page---byline--7cb189576052---------------------------------------)

9 min read·23 hours ago

\--

Large Language Models are no longer just chatbots. Today, they **retrieve knowledge**, **use tools**, **plan multi-step actions**, and **operate autonomously**. As systems evolve from **RAG pipelines** to **fully agentic AI**, evaluation must evolve too.

This article breaks down:

1.  **How to evaluate RAG (Retrieval-Augmented Generation) systems**
2.  **How evaluation changes for Agentic AI**
3.  **Concrete metrics + how to measure each one**

### Part 1: Evaluating RAG (Retrieval-Augmented Generation) Systems

A RAG system has **three core stages**:

1.  **Retrieval**
2.  **Generation**
3.  **Grounding & Faithfulness**

Each stage needs *its own metrics*. Evaluating only the final answer hides failures upstream

1.  **Retrieval Evaluation Metrics**

**Context Recall (Coverage)**

It Measures whether the retrieved documents contain the information required to answer the query. If the correct information is not retrieved, even a perfect LLM will hallucinate.

Create a dataset with:

-   Query
-   Gold reference documents or passages

```
Context Recall = (# of relevant docs retrieved) / (total relevant docs)
```

Recall@K = relevant retrieved in top K / total relevant

Often measured as **Recall@K** (e.g., Recall@5, Recall@10)

**Context Precision (Noise)**

How much of the retrieved context is actually relevant. Too much irrelevant context:

-   Confuses the model
-   Increases latency and token cost
-   Increases hallucination risk
-   **How to evaluate**

Human or LLM judge labels retrieved chunks as *relevant / irrelevant*

Compute:

Precision@K = relevant retrieved in top K / K

```
Precision = (relevant retrieved chunks) / (total retrieved chunks)
```

High recall with very low precision is still a bad RAG system.

**Case1: Low Recall@K → Weak Retrieval (Missing Evidence)**

If Recall@K is low:

-   Key facts are not retrieved
-   The model must guess
-   Hallucinations are likely

**Case 2: Low Precision@K → Weak Retrieval (Too Much Noise)**

If Precision@K is low:

-   Relevant chunks are buried
-   Context window is polluted
-   Model struggles to ground answers

**Case 3: High Recall@K + Low Precision@K (Very Common Failure)**

-   It’s surrounded by noise
-   Ranked poorly
-   Overshadowed by irrelevant chunks

Retrieval is technically “successful” but **functionally weak**.

**Normalized Discounted Cumulative Gain (NDCG)** is a metric that evaluates the quality of recommendation and information retrieval systems. NDCG helps measure a machine learning algorithm’s ability to sort items based on relevance.

**NDCG** *Works Well* in both GenAI Agentic AI Retrieval Evaluation

It helps in Retrieved documents or chunks

**Why NDCG fits**

-   Relevance is graded, not binary
-   Top-ranked context matters most
-   Lower-ranked errors matter less

**How to use**

Label documents with graded relevance

NDCG@K for retrieved contexts

For NDCG Computations Refer [here](https://www.geeksforgeeks.org/machine-learning/normalized-discounted-cumulative-gain-multilabel-ranking-metrics-ml/)

![]()

**Best-Practice Metric Bundle**

```
Recall@K guarantees evidence existencePrecision@K ensures evidence relevanceNDCG@K verifies evidence visibility/rankingEntropy signals model confidence/uncertainty
```

How these metrics suggest hallucinations

```
| Retrieval Signal | Model Behavior   || ---------------- | ---------------- || Low recall       | Forced guessing  || Low precision    | Confusion        || Poor ranking     | Ignored evidence || High entropy     | Uncertainty      || All of the above | Hallucination    |
```

A Practical Guardrail to be designed using above metric

```
if Recall@10 < 0.8:    abstain()if Precision@5 < 0.5:    rerank()if NDCG@5 < 0.7:    regenerate_context()
```

**2\. Generation Quality Metrics (RAG-Specific)**

**Answer Correctness:** Whether the final answer is factually correct.

**How to evaluate:**

-   Exact Match (for deterministic QA)
-   Semantic similarity (embedding-based)
-   LLM-as-a-judge scoring against a reference answer
-   Is the generated answer factually equivalent to the reference answer? Score 1–5

**Faithfulness / Groundedness:** Whether the answer is supported *only* by the retrieved context.

This is the **core promise of RAG**: no hallucinations.

**How to evaluate**

-   Sentence-level attribution:
-   For each claim, check if it is supported by retrieved text
-   LLM-based grounding checks:
-   “Does this statement appear in the context? Yes/No”

```
Faithfulness Score = supported claims / total claims
```

**Hallucination Rate: How often the model introduces unsupported facts.**

**How to evaluate**

-   Human annotation or LLM judges
-   Count hallucinated statements per answer
-   Track:
-   Hallucinations per 1,000 responses
-   Hallucinations per token

How to Detect Hallucination

a. **LLM-as-a-Judge:** A second LLM evaluates whether the answer is grounded.

b. **Context Attribution:** Can each claim be **traced back to retrieved text**?

c. **Contradiction & Consistency Checks**: Does Answer contradicts itself? Does it Contradict known facts? Does it Contradicts its own previous statement (in MultiChat System)

## Hallucination Red flags

-   Low context recall
-   High entropy / uncertainty in retrieval

High entropy + long answer → high hallucination risk

-   Very long generations from thin context
-   Low retrieval confidence + long answer = high hallucination risk

**Answerability Checks (Pre-Generation Guardrail)** If the context **cannot answer the question**, the model should abstain.

### How it works

-   Ask an LLM:
-   “Is the question answerable using only the provided context?”
-   If “No” → force refusal or clarification

This prevents hallucinations instead of detecting them later.

**Tool & Environment Validation:** For agents, hallucination = **lying about actions**.

**Examples**

-   Claiming a file was created when it wasn’t
-   Inventing API responses
-   Faking tool outputs

**Detection**

-   Cross-check tool logs vs agent claims
-   Environment state verification
-   Deterministic post-conditions

**Human-in-the-Loop**: Humans are needed for:

-   High-stakes domains (legal, medical)
-   Judge calibration
-   Edge-case discovery

**Model Guardrails (Prevention Layer):** Guardrails try to **stop hallucinations before they happen**.

### Grounding Guardrails (Most Important)

### What they do

Force the model to **only answer from allowed sources**.

*How it works*

-   Strict system prompt:
-   “If the answer is not explicitly present in the context, say *I don’t know*.”
-   Enforce:
-   Citation requirement
-   Source ID per claim

Effect

-   Model is *constrained*, not trusted

## Agentic AI Evaluation Metrics:

RAG — > Agentic AI (From *“Is the answer correct?”* → *“Did the agent achieve the goal under constraints?”)*

Agentic AI introduces:

-   Planning
-   Tool use
-   Memory
-   Autonomy
-   Multi-step execution

So evaluation must move from **text quality → behavior quality**.

### Task Success Rate (TSR)

**Definition**
Percentage of tasks where the agent achieves the specified goal.

**Examples**

-   File created successfully
-   Bug fixed and tests pass
-   Booking completed

```
Task Success Rate = Successful tasks / Total tasks
```

-   Success must be **verifiable**
-   Never trust agent self-reporting
-   Use environment state or tool outputs

### Partial Credit / Progress Score

Real-world tasks are rarely binary.

**Example**
Research task:

-   Sources collected (30%)
-   Summary written (40%)
-   Citations added (30%)

**How to measure**

-   Define weighted sub-goals
-   Compute percentage completed

Progress Score = Σ (subgoal\_weight × completion)

### Planning & Reasoning Quality Metrics

These measure **how the agent thought**, not just what it achieved.

### Plan Optimality

**Definition**
How close the agent’s plan is to the optimal one.

## Get Sachchida Nand Singh’s stories in your inbox

 from this writer.

**Measured as**

-   Shortest path
-   Lowest cost
-   Fewest steps

Plan Optimality = Optimal cost / Actual cost

**Use cases**

-   Navigation agents
-   Workflow automation
-   Scheduling

### Step Efficiency

**Definition**
How many steps were productive vs wasted.

**Examples of waste**

-   Redundant reasoning
-   Tool loops
-   Repeated failures

Efficiency = Productive steps / Total steps

**Reasoning Coherence**

**What it measures**

-   Logical consistency
-   No contradictions
-   Clear causal flow

**How to evaluate**

-   Human expert rating
-   LLM-as-judge scoring reasoning traces
-   NLI-based contradiction checks

**Tool Usage Metrics:** Agents interact with the world — this must be evaluated **deterministically**.

### Tool Selection Accuracy

**Definition**
Did the agent choose the *correct* tool?

**How to measure**

-   Define valid tools per step
-   Compare chosen vs expected

Tool Accuracy = Correct tool calls / Total tool calls

### Tool Execution Success Rate

**Definition**
Did the tool call succeed technically?

**Includes**

-   Valid parameters
-   API success
-   Correct parsing of outputs

Execution Success = Successful calls / Total calls

### Tool Result Utilization

**Key question**
Did the agent *use* the tool output correctly?

**Example**

-   API returns an error
-   Agent proceeds as if it succeeded → hallucination

**How to measure**

-   Compare tool output vs agent claims
-   Environment state validation

### Self-Correction Rate

**Definition**
Ability to recover from errors *without human help*.

**Test method**

-   Inject failures:
-   Tool errors
-   Missing files
-   Invalid inputs

Self-Correction Rate = Recovered failures / Total failures

### Retry Effectiveness

Retry Gain = Success after retry − Success without retry

### Generalization Score

**Definition**
Performance on unseen tasks.

**How to measure**

-   Hold-out task sets
-   Zero-shot vs few-shot comparison

Key for:

-   Long-lived agents
-   Production systems

### Human Intervention Rate

**Definition**
How often humans must step in.

Metric: Interventions per task

**Correction Acceptance Rate**

Does the agent *learn* from human feedback during execution?

**Metric:** Accepted corrections / Total corrections

### Cost per Successful Task

Best Cost Metric: Total cost / Successful tasks

### Latency Distribution

**Latency distribution** describes **how long requests take across *all* users and runs**, not just on average.

## Why Averages Are Misleading (Important)

Example:

-   90 requests finish in **1 second**
-   10 requests finish in **30 seconds**

Average latency ≈ **4 seconds**

Track:

-   P50 — Median Latency
-   P95 — 95th Percentile Latency
-   P99–99th Percentile Latency

**Why Long-Tail Latency Kills Agent Usability**

Agentic AI workflows:

-   Are multi-step
-   Chain multiple tool calls
-   Depend on retries and branching

Compounding effect

If:

-   Each step has a small chance of being slow
-   The agent takes many steps

Then:

> ***One slow step stalls the entire agent***

This means:

-   P99 dominates user experience
-   A single outlier ruins the task

```
Metric  Name What it Means Use CaseP50 Median Median user experience. General health check.P95 95th Percentile 95% of users have this speed or better. Setting SLIs/SLOs (Service Level Indicators/Objectives).P99 99th Percentile 99% of users have this speed or better. Identifying extreme outliers, debugging, & performance tuning.
```

## Role of Entropy in Evaluation of GenAI/Agentic AI

Entropy measures **uncertainty** in the model’s output distribution.

High entropy → model unsure
Low entropy → model confident

In practice, entropy is useful as a **risk indicator**:

-   In **RAG systems**, sustained high token entropy combined with weak retrieval signals often precedes hallucinations.
-   In **agentic AI**, high entropy over action or tool-selection probabilities signals indecision, unstable planning, or thrashing behavior.
-   Entropy is best used to **trigger guardrails** — abstention, clarification, or human review — rather than as a correctness metric.

Where Entropy Is Useful

**Hallucination Risk Detection**

Hallucinations often correlate with:

-   High entropy
-   Diffuse probability mass
-   Unstable token predictions

**Retrieval Confidence Estimation**

If retrieval embeddings:

-   Are flat (low similarity separation)
-   Have high entropy in similarity scores

→ retrieval likely failed

This predicts hallucination *upstream*.

**Agent Decision Confidence**

For agents:

-   High entropy over actions → indecision
-   Low entropy but wrong → overconfidence (dangerous)

Tracking entropy helps detect:

-   Thrashing
-   Tool loops
-   Unstable planning

In GenAI / LLMs, **entropy measures uncertainty in the model’s next-token prediction**.

Formally (Shannon entropy):

![]()

Where:

-   V = vocabulary size (or candidate set)
-   pi = probability of token i

How to Compute Entropy in GenAI

```
import torchimport torch.nn.functional as Ffrom transformers import AutoTokenizer, AutoModelForCausalLMmodel_name = "gpt2"tokenizer = AutoTokenizer.from_pretrained(model_name)model = AutoModelForCausalLM.from_pretrained(model_name)model.eval()text = "The capital of France is"inputs = tokenizer(text, return_tensors="pt")with torch.no_grad():    outputs = model(**inputs)    logits = outputs.logits# entropy of the next-token distributionnext_token_logits = logits[0, -1, :]probs = F.softmax(next_token_logits, dim=-1)entropy = -torch.sum(probs * torch.log(probs))print("Next-token entropy:", entropy.item())
```

**Entropy doesn’t tell you if a model is right — but it often tells you when a model is unsure, hence its widely used in Hallucination Detection.**

Computing Average Entropy of Response

```
def compute_avg_entropy(text, model, tokenizer):    inputs = tokenizer(text, return_tensors="pt")        with torch.no_grad():        outputs = model(**inputs)        logits = outputs.logits    entropies = []    for t in range(logits.size(1) - 1):        probs = F.softmax(logits[0, t, :], dim=-1)        entropy = -torch.sum(probs * torch.log(probs))        entropies.append(entropy.item())    return sum(entropies) / len(entropies)avg_entropy = compute_avg_entropy(    "The capital of France is Paris.",    model,    tokenizer)print("Average entropy:", avg_entropy)
```

### When Entropy Is a Good Hallucination Signal

Entropy works well when used as a **risk indicator**, especially in combination with other signals.

### Strong correlations:

-   **High entropy + weak retrieval** → very high hallucination risk
-   **High entropy + long answer** → likely fabrication
-   **High entropy in agent action selection** → unstable planning / thrashing

**Metric Limitations**

Every metric has caveats. For example:

-   **NDCG** assumes graded relevance labels — but obtaining these labels may require human annotation or a strong judge model.
-   **Entropy** is a risk signal, not a truth detector — confident hallucinations can still occur with low entropy.
-   **Recall@K** alone can be misleading (high recall with poor precision and ranking still leads to weak retrieval).

## **Final Comment**

> ***Agentic AI evaluation measures behavior under constraints, not text quality.***

As AI systems evolve from single-turn chatbots to retrieval-augmented and fully agentic systems, evaluation metrics must shift accordingly — from linguistic quality to evidence, behavior, and outcomes.

```
System Type| Primary MetricChatbot    | Answer qualityRAG        | FaithfulnessAgent      | Goal achievement
```

> **A robust GenAI system retrieves all relevant evidence (high Recall@K), minimizes noise (high Precision@K), ranks it correctly (high NDCG@K), and exhibits low entropy only when strong evidence is present.**
> 
> **A robust agentic AI system consistently achieves its goals (high task success), selects appropriate actions and tools with minimal waste (high action precision), prioritizes the most effective plans and actions early (high plan/action NDCG), and exhibits low decision entropy only when the environment and objectives are well understood.**

```
System Type      | Primary Evaluation Focus-----------------------------------------------------Chatbot          | Answer qualityRAG System       | Faithfulness to retrieved evidenceAgentic AI       | Goal achievement under constraints
```
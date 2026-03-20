---
title: "What I Learned After 1 Million LLM Calls on AWS"
author: "AI Disruption"
platform: "medium"
publicationName: "AI Disruption"
url: "https://medium.com/ai-disruption/what-i-learned-after-1-million-llm-calls-on-aws-33ac04bf5987?source=rss----c0b4a0b207fc---4"
publishedAt: "2025-08-28"
tags:
  - "ai-general"
  - "aws"
  - "innovation"
  - "llm"
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.657Z"
---

# What I Learned After 1 Million LLM Calls on AWS

# What I Learned After 1 Million LLM Calls on AWS

## Latency, cost, and retrieval truths you won’t find in the docs…

[R. Thompson (PhD)](/@rogt.x1997?source=post_page---byline--33ac04bf5987---------------------------------------)

6 min read·Aug 28, 2025

\--

![Credit : AI Generated Image]()

You don’t need a giant team or a mystery stack to ship an LLM app on AWS. You need a small core: a clean API, a grounded retrieval layer, safety rails, and observability that tells you when things drift. This guide walks through that path in plain English with just enough code to move you from a working demo to something you can trust in front of users.

## The smallest thing that works

Start with an HTTP endpoint your frontend can call. Put a tight request schema around it: user query, optional conversation id, flags for streaming, and an allow‑list of tools. Behind the endpoint, route everything through one orchestrator function so you always know where tokens go and why.

• API Gateway → Lambda (or FastAPI on ECS/EKS) → Bedrock Runtime
• Documents and artifacts in S3
• Retrieval via either OpenSearch Serverless vectors or Bedrock Knowledge Bases
• Guardrails for policy and tone, plus a lightweight PII redaction step
• CloudWatch + X‑Ray logs with redacted traces

That’s enough to serve the first 1,000 users without chaos.

## Models, quickly and safely

Pick one default model per job. For chat and grounded QA, a Claude‑class model on Bedrock gives strong reasoning and tool use. Keep temperature low for QA, a bit higher for writing. Add a fallback model you can flip to by env var. No hardcoded keys; use IAM roles on Lambda/ECS.

A simple mental model:

> • One model id in env for generation
> • One model id in env for embeddings
> • One guardrail id in env for policy

## RAG that doesn’t bite later

You have two good routes on AWS:

## Path A: Bedrock Knowledge Bases

Point it at your S3 bucket (and optional business systems through supported connectors). You get chunking, embeddings, retrieval, and grounding without wiring a vector index yourself. It’s great when teams want managed pieces and faster time to first answer.

## Path B: OpenSearch Serverless vectors

When you want full control over chunk sizes, filters, and re‑rankers, use OpenSearch Serverless as your vector store. Store the document text, metadata, and the embedding side by side. Keep a small, deterministic prompt that cites the chosen passages. This route is ideal for advanced filters, security scoping, or hybrid keyword + vector search.

A simple rule of thumb: start with Knowledge Bases when speed of standing up matters; switch or add OpenSearch when you need custom retrieval behavior.

## Streaming makes UX feel instant

Even a half‑second head start calms users. Stream tokens back to the browser, and render partials line by line. If you’re grounding answers, stream the citations first (“found 3 matches from Policy Handbook”), then the prose. It reduces abandonment and lets people interrupt when they spot the answer early.

## Safety without blocking real work

Two layers go far:

• Guardrails: block unsafe topics, add style rules (e.g., neutral tone), and define refusal behavior
• Redaction: mask emails, phone numbers, IDs before they ever hit logs. Keep raw prompts out of logs entirely; store hashed user ids and redacted summaries instead

Treat safety like a test: include a mini suite of prompts that must refuse or reroute, and run it on every deploy.

## Cost control that actually matters

LLM costs creep in through waste. Cut it early:

• Cap `maxTokens` per route; don’t let one prompt spill into a novella
• Keep retrieval tight: 3‑5 chunks, not 20
• Batch embeddings for ingestion; stream responses to the UI
• Cache: memoize retrieval for repeated queries, and store the top‑k ids for an hour

For embeddings, pick a dimension that matches your corpus needs. Smaller vectors cut storage and search time; evaluate on your dev set before committing.

## Observability you’ll read every day

You need answers to four questions: What did the user ask? What did we retrieve? What did the model output? How long did it take? Put each into a structured log with a correlation id. Track per‑route latency p50/p95, refusal rate, token counts, and the presence of citations in grounded answers. A tiny dashboard beats a thousand raw logs.

## A minimal streaming endpoint

This shows the shape, not a wall of code. One function to receive a prompt, fetch context, call the model with streaming on, and trickle tokens to the client.

```
# shape only; your infra may be Lambda, ECS, or FastAPIfrom typing import Iterator
```

```
class RAG:    def __init__(self, kb=None, search=None):        self.kb = kb        self.search = search    def retrieve(self, query: str) -> list[str]:        if self.kb:            return self.kb.search(query)        return self.search.knn(query, k=4)    def stream_answer(self, query: str) -> Iterator[str]:        context = "\n\n".join(self.retrieve(query))        prompt = f"Answer strictly from this context. Cite source names.\n\n{context}\n\nQ: {query}\nA:"        for token in llm.stream(prompt):            yield token
```

Keep it readable. Keep it testable. Most bugs hide in glue code between retrieval and prompts; unit‑test that boundary.

## Deployment sketch that won’t paint you into a corner

• IaC with CDK or Terraform
• Private subnets; interface endpoints for Bedrock, S3, OpenSearch
• Staging and prod accounts with least‑privilege roles
• GitHub Actions or CodePipeline building a container, running prompt/regression tests, then deploying

## Real cases you can ship this month

**Policy QA for an HR team**
Upload handbooks and SOPs to S3, wire a knowledge base, and expose a chat with strict citations. Add a feedback button that tags bad answers and writes them to a review queue.

**Financial research assistant**
Ground answers on filings stored in S3. Use tool use to call a pricing microservice and return a short, sourced memo. Every answer includes an audit id and links to the passages used.

**Healthcare triage notes helper**
Before logging, scrub PII; set guardrails to avoid medical advice. The model rewrites clinician notes into clear, structured summaries, then routes anything uncertain to a human.

## Hard‑won lessons from production traffic

• Region mismatches bite: keep model, data, and compute in the same region
• Retrieval prompts grow over time; prune. Shorter prompts with solid context beat verbose instructions
• Don’t hoard logs. Store redacted summaries with ids that let you replay a request when needed
• Add a kill‑switch env var on the orchestrator to fall back to a static answer when downstreams fail

## A fast roadmap once V1 is live

Week 1: add streaming and a compact retry policy.
Week 2: ship an eval set with 30 grounded questions; track exact‑match and citation rate.
Week 3: add team‑based access and document scoping.
Week 4: introduce a second model id for fallbacks and compare latency/cost.

## Extra insights from recent updates

Knowledge Bases can connect to structured stores and translate natural language into SQL so the model can answer from live, governed tables without copying data. That’s handy for finance or ops where movement of data is touchy.

Titan Text Embeddings v2 offers 256/512/1024‑dim vectors while keeping quality high at smaller sizes, which trims vector storage and speeds up retrieval when collections grow.

OpenSearch Serverless has a dedicated vector collection type with kNN/ANN (HNSW/IVF). You don’t run clusters; you focus on schema, filters, and recall/precision trade‑offs.

The Converse API gives one shape for messages across models, plus a streaming variant so you can paint the UI as tokens arrive. For Anthropic models on Bedrock, remember to pass the required `anthropic_version` field.

Knowledge Bases added enterprise connectors such as Confluence, Salesforce, and SharePoint (preview earlier), which cuts custom ETL for many teams.

A cost‑friendly pattern is a just‑in‑time knowledge base: pull, parse, and index only what’s needed for the question, then cache results for a short time.

**( AI Use Notice:** *This article comes from original thought process, extensive manual research & hours spent finding, reading and verifying sources. AI tools were used to assemble the narrative, correct the grammar, not for creating it. )*

![]()
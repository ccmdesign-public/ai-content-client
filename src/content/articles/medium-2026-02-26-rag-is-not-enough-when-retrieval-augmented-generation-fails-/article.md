---
title: "RAG is Not Enough: When Retrieval Augmented Generation Fails in Production"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/rag-is-not-enough-when-retrieval-augmented-generation-fails-in-production-9dd2a7aa92c1?source=rss----98111c9905da---4"
publishedAt: "2026-02-26"
tags:
  - "ai-general"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.651Z"
---

# RAG is Not Enough: When Retrieval Augmented Generation Fails in Production

# RAG is Not Enough: When Retrieval Augmented Generation Fails in Production

[Pravin Borate](https://1pravin-borate.medium.com/?source=post_page---byline--9dd2a7aa92c1---------------------------------------)

13 min read·6 hours ago

\--

![Photo by Solen Feyissa on Unsplash]()

> ***Everyone writes about how to build RAG. Nobody writes about where it breaks. After running retrieval-augmented generation pipelines serving millions of queries, here’s what I*** *wish* ***someone had told me.***

There’s a moment every RAG engineer knows. You’ve built the pipeline. Documents chunked. Embeddings indexed. Retrieval looks clean in your notebook. You demo it to stakeholders and it’s magic — the LLM answers questions grounded in your proprietary data, with citations.

Then it goes to production.

A customer asks a perfectly reasonable question and the system confidently returns an answer that’s almost right-right enough to sound authoritative, wrong enough to cause a support ticket. Another query retrieves five chunks, all from the correct document, and the model still hallucinates a number that exists nowhere in any of them. A third query worked perfectly last Tuesday and returns garbage today, with no code changes.

**RAG is sold as a solved problem.** **It isn’t.** It’s a collection of fragile heuristics held together by vibes-based chunk sizes and the quiet prayer that cosine similarity actually captures semantic relevance.

This article is about the failure modes — the ones I’ve encountered in production, debugged at uncomfortable hours, and developed battle scars from. If you’re building RAG, these will find you eventually. Better to meet them here first.

## Failure Mode 1: Hallucination Despite Retrieval

This is the one that breaks people’s mental model. The whole point of RAG is to ground the model in retrieved context, so how can it hallucinate when the right documents are sitting right there in the prompt? It happens more often than anyone admits, and it happens in several distinct ways.

**The Synthesis Hallucination**. The model retrieves three chunks that each contain part of the answer. Chunk A says “*Total revenue for FY2024 was $4.2 billion.*” Chunk B says *“Year-over-year growth came in at 12%, exceeding analyst expectations.”* Chunk C mentions *“The company completed the acquisition of XYZ Corp for $500 million.”* Each chunk is factually correct. Each chunk was correctly retrieved. So far, so good. Now the user asks: “*Summarize the company’s financial performance this year.*” **The model synthesizes:** “*Revenue was $4.2B, representing 12% growth, primarily driven by the $500M acquisition of XYZ Corp.*” That causal relationship? Fabricated. Each fact is grounded and the connection between them is hallucinated. The model is doing what it was trained to do - i.e. create coherent narratives and coherent narratives have causal structure, even when the source material doesn’t provide one.

This is insidious because every individual claim passes citation-checking. So you need to verify relationships between claims, not just claims themselves.

**The Confidence Extrapolation.** The retrieved context contains information that’s close to what was asked but doesn’t actually answer the question. The model, rather than saying *“I don’t have enough information,”* extrapolates from the nearby information with full confidence. Ask *“What was the Q3 2024 churn rate?”* and if the retrieved chunks contain *Q2 2024 churn (3.2%) and Q3 2024 revenue*, the model will often fabricate a Q3 churn number -sometimes by applying a trend it’s inferring, sometimes from pure confabulation.

**The Context Poisoning Hallucination.** Here’s one that genuinely surprised me. When retrieved chunks contain contradictory information - maybe from different document versions or different authors - the model doesn’t flag the contradiction. It picks one, sometimes blends both, and presents the result as settled fact. I’ve seen this most often in enterprise knowledge bases where policy documents exist in multiple versions, and the retriever doesn’t know (or care) which is current.

**What actually helps :** The honest answer is that no single technique eliminates retrieval -grounded hallucination. But a layered approach reduces it significantly. First, add explicit instructions in your system prompt telling the model to distinguish between *“the documents state X”* and *“based on the documents, I infer X.”* Second, implement a lightweight post-generation verification step - a second LLM call (a cheaper model works fine) that checks whether each claim in the response is directly supported by the retrieved chunks. Third, and this is the one most teams skip, return confidence metadata to your users. Don’t present RAG outputs as oracles. Show which documents were used, how relevant the retrieval was, and where the model is extrapolating.

## Failure Mode 2: The Chunk Size Trap

Every RAG tutorial says something like *“experiment with chunk sizes between 256 and 1024 tokens.”* This is technically correct and practically useless, because the right chunk size depends on the structure of your documents, not a universal constant.

Here’s the core tension: ***small chunks improve retrieval precision but destroy context. Large chunks preserve context but reduce retrieval precision.***

Let me make this concrete. Imagine a legal contract with this structure:

```
Section 7: Termination  7.1 Either party may terminate with 90 days written notice.  7.2 In the event of material breach, the non-breaching party       may terminate immediately, subject to the cure period       defined in Section 12.3.  7.3 Upon termination, the provisions of Sections 9, 10, and       14 shall survive.
```

With 256-token chunks, Section 7.2 gets split from its reference to Section 12.3. A user asking *“What happens if there’s a breach?”* gets a chunk that says *“may terminate immediately”* without the critical *“subject to cure period”* qualification.

The model presents an incomplete - and potentially legally dangerous - answer with perfect confidence.

With 1024-token chunks, you capture the full section. But now when the user asks something specific about cure periods, the retriever has to match against a large, diluted chunk where *“cure period”* is a minor mention, not the main topic. Retrieval recall drops.

**The problems get worse with tables and structured data.** I’ve seen RAG systems completely fail on financial documents because a table spanning 200 rows gets chunked mid-row. The model receives a chunk with column headers and the first 30 rows, and another chunk with rows 31–60 but no headers. The second chunk is literally uninterpretable.

**What actually helps:** The answer isn’t a magic number. It’s structure-aware chunking. Parse your documents for semantic boundaries - section headers, paragraph breaks, table boundaries - and chunk along those boundaries, even if it means variable-length chunks.

For documents with cross-references (legal, technical, regulatory), consider a two-tier approach: store small chunks for retrieval but retrieve the parent section or document for context injection into the prompt. This is sometimes called ***“small-to-big retrieval” or “parent-document retrieval.”*** It gives you precision in search and completeness in context.

For tables, extract them as complete units and store them separately from prose. Give each table a natural-language summary that serves as its embedding proxy. When the retriever matches the summary, inject the entire table.

## Failure Mode 3: Embedding Drift — The Silent Killer

This is the failure mode that nobody writes about because it’s slow and invisible. Here’s how it works.

You build your RAG pipeline in January. You embed your document corpus using `text-embedding-ada-002` (or whatever model). Everything works great. In March, you add new documents. In June, you add more. In September, a user reports weird retrieval behavior.

What happened ? Potentially several things, and they’re all hard to detect.
Model version drift. Embedding model providers occasionally update their models. If the API you used in January returns slightly different vectors than the API in September - even for the same text - your vector space is now internally inconsistent. Documents embedded at different times live in subtly different geometric spaces. *Cosine similarity between a January document and a September document is no longer a reliable measure of semantic similarity.*

OpenAI has been relatively stable here, but I’ve seen this with self-hosted models where a team upgraded their embedding model without re-embedding the full corpus. The retrieval degradation was gradual and took weeks to notice.

**Corpus distribution shift.** This one is more subtle. Your embedding model maps text to a high-dimensional space. The *“neighborhood”* of a query depends on what else is in the space. When you had 10,000 legal documents, a query about “termination clauses” would retrieve the most relevant legal chunks. After adding 50,000 HR documents that also discuss “termination” (of employment), the same query now retrieves a mix of legal and HR content. The embeddings didn’t change. The neighborhood did.

**Query-document asymmetry.** Embedding models are trained on general text. They encode what words mean, not what users want. The query *“How do I reset my password?”* and the document chunk *“Password resets can be initiated through the admin portal by navigating to Settings > Security > Password Policy”* are semantically related - they’re about the same topic. But the user wants step-by-step instructions, and the retrieved chunk is an admin guide. The embedding model can’t distinguish between user-intent and admin-documentation because they live in the same semantic neighborhood.

**What actually helps:** For model version drift, the solution is unglamorous: pin your embedding model version, and when you must upgrade, re-embed your entire corpus. Yes, this is expensive. Budget for it. Treat it like a database migration.

For corpus distribution shift, implement retrieval analytics. Track the diversity of retrieved results over time. If queries that used to return tightly clustered results start returning scattered ones, your corpus distribution has shifted. Metadata filtering (retrieving only from specific document categories before doing semantic search) is the most effective mitigation.

For query-document asymmetry, consider embedding queries and documents differently. HyDE (Hypothetical Document Embeddings) is one approach - use an LLM to generate a hypothetical answer to the query, then embed that and search against your corpus. The hypothetical answer lives in “document space” rather than “query space,” improving retrieval alignment. It adds latency and cost, but for high-stakes applications, it’s worth it.

## Failure Mode 4 : Irrelevant Context Injection

**Here’s a counterintuitive finding:** giving the model more retrieved context often makes responses worse, not better.

## Get Pravin Borate’s stories in your inbox

 from this writer.

Remember me for faster sign in

This contradicts the naive intuition that more information = better answers. In practice, LLMs are sensitive to the signal-to-noise ratio in their context window. Retrieve five chunks where three are relevant and two are tangential, and the model may anchor on information from the irrelevant chunks - especially if those chunks are more specific or more confidently stated than the relevant ones.

I call this the **distractor chunk problem**, and it manifests in several ways.

**Topical similarity, factual irrelevance.** A user asks about your company’s parental leave policy in 2024. The retriever returns the 2024 policy (correct), the 2022 policy (outdated), and a blog post about your company’s family-friendly culture (irrelevant). The model blends information from all three. The user gets an answer that mixes current policy with outdated terms and vague cultural statements.

**High-confidence red herrings.** Some chunks score highly in retrieval because they share vocabulary with the query, but they answer a fundamentally different question. In a medical knowledge base, a query about “metformin side effects” might retrieve chunks about metformin dosing, metformin drug interactions, and a clinical trial summary that mentions side effects of a different drug in the same therapeutic class. The clinical trial chunk is semantically close but factually dangerous.

**Context window crowding.** Even when all retrieved chunks are somewhat relevant, there’s an opportunity cost. Every token spent on a marginally relevant chunk is a token not available for the model’s reasoning. I’ve seen cases where reducing the number of retrieved chunks from 10 to 3 - keeping only the most relevant - improved answer quality by 15–20% on human evaluation, simply because the model had more room to think.

**What actually helps:** Implement a relevance threshold, not just a top-k cutoff. Rather than always returning 5 chunks, return only chunks above a similarity score threshold. If only two chunks are genuinely relevant, return two. If none are above threshold, return nothing and let the model say “I don’t have enough information” - which is a much better outcome than a confidently wrong answer.

Add a **reranking step** between retrieval and generation. Bi-encoder embedding models are fast but rough. A cross-encoder reranker (like a model that scores query-document pairs directly) is slower but dramatically more accurate at separating relevant from irrelevant chunks. In my experience, adding a reranker is the single highest-ROI improvement you can make to a production RAG pipeline.

Finally, consider **retrieval-aware prompting**. Instead of dumping all chunks into the prompt with a generic “use this context,” structure your prompt to force the model to evaluate each chunk’s relevance before answering. Something like: “Below are retrieved document excerpts. First, assess which excerpts are directly relevant to the question. Then, answer using only the relevant excerpts. If none are relevant, say so.”

## Failure Mode 5 : The Temporal Blindness Problem

Most embedding-based retrieval treats all documents as existing in an eternal present. There’s no concept of recency, supersession, or version currency. This creates a class of failures that’s especially painful in domains where information changes over time - which is most domains.

**Outdated information ranks equally**. Your 2021 product documentation and your 2024 product documentation are both in the index. A user asks “How do I configure SSO?” The 2021 docs describe a configuration flow that no longer exists. The embedding similarity between the query and both doc versions is nearly identical - they’re about the same topic, after all. The retriever returns the 2021 version because it happens to use slightly more similar vocabulary. The user follows outdated instructions and gets stuck.

**Contradictory versions coexist**. Policy changes, pricing updates, regulatory amendments - any domain where documents are revised creates the risk of retrieving multiple versions that contradict each other. The model has no way to know which is authoritative.

**What actually helps: Temporal metadata is essential**. Every chunk should carry a timestamp, version number, or validity period. Implement a retrieval strategy that biases toward recency - either through metadata filtering (only retrieve documents from the last N months) or through score boosting (multiply similarity scores by a recency decay factor).

For documents that explicitly supersede earlier versions, build a supersession graph. When a new policy document is indexed, mark the old version as deprecated and exclude it from retrieval. This requires human or automated curation, but it prevents an entire class of failures.

## Failure Mode 6 : The Evaluation Illusion

This is the meta-failure — the one that enables all the others to persist. Most teams evaluate RAG systems badly.

The typical evaluation: hand-craft 50 question-answer pairs, run them through the pipeline, check if the answers are “roughly correct,” declare success, ship to production.

The problems with this approach are profound. Fifty questions don’t cover the query distribution you’ll see in production. “Roughly correct” is doing enormous work - the subtle hallucinations and extrapolations I described above look “roughly correct.” And evaluation at a single point in time doesn’t catch drift.

**What actually helps:** Build evaluation into the system, not around it. Track these metrics continuously in production:

***Retrieval quality:*** For a sample of queries, have humans rate whether the retrieved chunks actually contain the information needed to answer the question. This is your retrieval recall. If it’s below 85%, your generation quality is capped regardless of how good your LLM is - you can’t generate correct answers from irrelevant context.

***Faithfulness:*** For a sample of responses, verify that every claim in the response is supported by the retrieved chunks. This catches synthesis hallucinations and extrapolation errors. Automated faithfulness checking (using an LLM-as-judge) is imperfect but scales better than human review for continuous monitoring.

***Answer completeness:*** Does the response fully address the query, or does it answer a related-but-different question? This catches cases where retrieval returns tangentially relevant content and the model dutifully responds to what it found rather than what was asked.

***Negative predictive value:*** When the system says “I don’t have enough information to answer,” is it correct? A system that refuses too often is useless. A system that never refuses is dangerous. Track both the refusal rate and refusal accuracy.

## The Uncomfortable Truth About RAG

> RAG is not a plug-and-play solution. It’s a *system design challenge* that requires careful attention to document structure, chunking strategy, embedding behavior, retrieval tuning, prompt engineering, and continuous evaluation. The gap between a RAG demo and a production RAG system is as large as the gap between a scikit-learn notebook and a production ML pipeline.

The industry is beginning to recognize this. Concepts like **agentic RAG** (where an agent decides whether and how to retrieve, rather than always retrieving), **graph RAG** (where retrieval follows relationship structures rather than just embedding similarity), and **adaptive retrieval** (where the system adjusts its strategy based on the query type) are all responses to the limitations described in this article.

But before you reach for those advanced architectures, start with the fundamentals:

**Chunk with intention.** Understand your document structure and chunk along semantic boundaries, not arbitrary token counts.

**Retrieve less, but better.** A reranker plus a relevance threshold beats top-k retrieval almost every time.

**Treat versioning** as a first-class problem. Temporal metadata and supersession tracking aren’t nice-to-haves; they’re correctness requirements.

**Evaluate continuously**. Point-in-time evaluation is necessary but nowhere near sufficient. Build monitoring that catches drift, degradation, and novel failure modes in production.

**Teach the system to say “I don’t know.”** A RAG system that confidently answers every query is a RAG system that’s lying to some of its users. Design for graceful uncertainty.

## Where Do We Go From Here?

I don’t think RAG is broken. I think it’s immature. The pattern of “embed, retrieve, generate” is sound in principle. The implementations are where things fall apart - and they fall apart because the community has treated RAG as a simple pipeline rather than a complex system.

The most production-ready RAG systems I’ve seen don’t look like the tutorials. They have custom chunking logic per document type. They use hybrid retrieval (combining semantic search with keyword matching, or BM25 with dense embeddings). They have reranking layers, relevance filters, temporal weighting, and continuous evaluation loops. They look less like a demo and more like a search engine - which, at its core, is what a RAG system is.

If you’re building RAG for production, build it like a search engineer, not like an AI hobbyist. The retrieval is the hard part. The generation is the easy part. Get the retrieval right, and the LLM will handle the rest. Get the retrieval wrong, and no amount of prompt engineering will save you.

> *The best RAG systems I’ve worked with were built by teams that were obsessed with retrieval quality and skeptical of their own outputs. If your RAG pipeline doesn’t have a way to tell you when it’s wrong, it’s not production-ready - it’s a demo with a deployment script.*

*Follow for more field notes on building AI systems that actually work.
****LinkedIn*:** [*https://www.linkedin.com/in/pravinborate/*](https://www.linkedin.com/in/pravinborate/)***Medium:*** [*https://medium.com/@1pravin-borate*](https://medium.com/@1pravin-borate)
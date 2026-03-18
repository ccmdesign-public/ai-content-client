---
title: "Build a Review Analytics MCP Server with TypeScript, Rules, LLMs, and Vector Search"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/build-a-review-analytics-mcp-server-with-typescript-rules-llms-and-vector-search-15a6297e5f2a?source=rss----98111c9905da---4"
publishedAt: "2026-03-18"
tags:
  - "ai-general"
  - "architecture"
  - "llm"
  - "research"
  - "typescript"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
  - "Web Development"
tagsNormalizedAt: "2026-03-18T12:05:37.692Z"
---

# Build a Review Analytics MCP Server with TypeScript, Rules, LLMs, and Vector Search

# **Build a Review** Analytics **MCP Server with TypeScript, Rules, LLMs, and Vector Search**

## A production-grade AI pipeline that turns messy app reviews into structured product intelligence using rules, LLM routing, and vector search.

[Abhishek Dubey](https://medium.com/@abhishekdubey331?source=post_page---byline--15a6297e5f2a---------------------------------------)

6 min read·5 days ago

\--

## Introduction

App reviews are one of the richest sources of product feedback, but they are also one of the hardest to operationalize. A few thousand reviews can contain urgent bugs, payment failures, broken login flows, feature requests, and noise all mixed together.

In this tutorial, we’ll build the kind of system that turns that raw review stream into structured product intelligence.

The system described here is implemented in the open-source project [**ReviewRadar**](https://github.com/abhishekdubey331/ReviewRadar), a TypeScript MCP server for analyzing app reviews.

By the end, you’ll understand how to build a system that can:

-   Import reviews from CSV, JSON, or app-store scraping
-   Redact sensitive data before any model call
-   Classify reviews into issue types, feature areas, severity, and sentiment
-   Route only uncertain or high-risk reviews to an LLM
-   Store reviews in a vector index for semantic search
-   Generate PM-ready outputs like top issues, spikes, and weekly reports
-   Expose the whole system as MCP tools for Cursor, Claude Desktop, or any MCP client

### GitHub **Repository**

> The complete implementation for this tutorial is available in the open-source repository below.
> [**https://github.com/abhishekdubey331/ReviewRadar**](https://github.com/abhishekdubey331/ReviewRadar)

You can run the MCP server locally, import reviews, and experiment with the analytics tools described in this article.

## Final Result

The finished system is an **MCP server** that sits behind an IDE agent and exposes tools such as:

-   `reviews_import`
-   `reviews_analyze`
-   `reviews_search`
-   `reviews_top_issues`
-   `reviews_weekly_report`

Instead of manually reading reviews, a PM can simply ask:

> *What are the biggest customer pain points this week?*

And the server can return ranked issue clusters, severity breakdowns, spikes, and supporting review evidence.

**Quick Demo**

Below is an example of the ReviewRadar MCP server analyzing reviews and surfacing top issues.

![Demo: ReviewRadar MCP tools analyzing app reviews and surfacing top issues]()

## Architecture

The core pipeline looks like this:

> This pipeline transforms raw review text into structured signals that product and engineering teams can analyze.

Here’s how the components fit together:

**Ingestion layer**
Loads and normalizes reviews from files or scraped datasets.

**Privacy layer**
Redacts PII locally before any model interaction.

**Classification engine**
Runs deterministic rules first, then selectively calls the LLM.

**Vector store**
Indexes reviews for semantic search.

**Analytics layer**
Computes top issues, trends, segment breakdowns, and reports.

**MCP layer**
Exposes everything as callable tools over stdio.

That separation is the main reason the project works well: **every layer has a focused responsibility.**

## Step 1: Define the Taxonomy and Contracts

Before building the pipeline, define what the system should produce.

ReviewRadar starts with Zod enums and schemas.

```
export const IssueTypeEnum = z.enum([  "Bug",  "Performance",  "UX",  "Feature Request",  "Account/Auth",  "Payments/Transactions",  "Billing/Pricing",  "Trust/Fraud",  "Support/Service",  "Cancellation/Retention",  "Data/Sync",  "Safety Concern",  "Praise",  "Spam / Bot / Irrelevant"]);export const FeatureAreaEnum = z.enum([  "Crash Detection",  "Driving Reports",  "Family Location",  "SOS",  "Card Controls",  "Allowance/Chores",  "Savings/Investing",  "Bank Linking",  "Notifications",  "Onboarding",  "Login/OTP",  "Other",  "Unknown"]);export const SeverityEnum = z.enum(["P0", "P1", "P2", "FYI"]);
```

This step matters because it:

-   Defines the issue taxonomy once
-   Makes validation explicit
-   Aligns rules, prompts, analytics, and outputs
-   Prevents the LLM from inventing categories

If you skip this step, the system becomes inconsistent very quickly.

## Step 2: Import and Normalize Reviews

Next, we convert raw reviews into a clean internal format.

The ingestion layer normalizes reviews from CSV, JSON, or scraped app-store datasets into a single internal schema.

Example ingestion logic:

```
for (const raw of rawReviews) {  const normalized = normalizeReview(raw);  const parsed = ReviewInputSchema.safeParse(normalized);  if (!parsed.success) continue;  const review = parsed.data;  if (!reviewsMap.has(review.review_id)) {    reviewsMap.set(review.review_id, review);  }}
```

This step ensures:

-   Inconsistent fields are normalized
-   Rows are validated with Zod
-   Malformed rows are dropped
-   Duplicate reviews are removed

## Step 3: Add a Privacy Layer Before Any LLM Call

Before sending data to any model, ReviewRadar redacts sensitive information locally.

```
export function redactPII(content: string): string {  const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/gi;  const phoneRegex = /(?:\+?\d{1,3}[ \-.]?)?\(?\d{3}\)?[ \-.]?\d{3}[ \-.]?\d{4}/g;  const coordRegex = /[-+]?\d{1,2}\.?\d*,\s*[-+]?\d{1,3}\.?\d*/g;  return content    .replace(emailRegex, "[REDACTED]")    .replace(phoneRegex, "[REDACTED]")    .replace(coordRegex, "[REDACTED]");}
```

This ensures:

-   Emails, phone numbers, and coordinates are scrubbed locally
-   Privacy is enforced automatically
-   LLM calls never accidentally leak PII

## Step 4: Build the Hybrid Classification Engine

The classification engine first runs deterministic rules.

Example spam filter:

```
if (alphaCount < 10) {  return {    issue_type: "Spam / Bot / Irrelevant",    feature_area: "Other",    severity: "FYI",    sentiment: "Neutral",    confidence_score: 1.0,    classification_source: "rule_engine",    is_spam: true  };}
```

Then the system decides whether the review should be escalated to an LLM.

```
export function isLlmRequired(result: RuleResult): boolean {  if (result.confidence_score < 0.60) return true;  if (result.feature_area === "Unknown") return true;  if (result.severity === "P0" || result.severity === "P1") return true;  return false;}
```

Hybrid classification flow:

```
const redacted = redactPII(review.content);const rulesRes = evaluateRules(redacted, review.score);if (!isLlmRequired(rulesRes)) {  return rulesRes;}const prompt = "Classify this app review into the existing product taxonomy...";const llmResp = await llmClient.processPrompt(prompt);
```

Benefits of this design:

-   Rules handle the majority of reviews
-   Only ambiguous or critical cases use the LLM
-   Costs stay low and results stay explainable

## Step 5: Add Reliability and Batch Processing

Once LLMs enter the pipeline, reliability becomes critical.

## Get Abhishek Dubey’s stories in your inbox

 from this writer.

Remember me for faster sign in

ReviewRadar adds:

-   Concurrency limits
-   Retry logic
-   Circuit breakers
-   Batch metrics
-   Rule-engine fallback

Example circuit breaker:

```
if (this.state.consecutiveFailures >= 10) {  this.isTripped = true;  throw new CircuitBreakerError();}
```

Batch processing example:

```
const settledResults = await Promise.allSettled(  rawInputReviews.map((review) => {    const cachedTask = analysisCache.getOrCreate(      review,      () => processingLimit(() => processSingleReview(...))    );    return cachedTask.promise;  }));
```

This ensures:

-   Model calls stay within limits
-   Failures don’t crash the system
-   Duplicate reviews reuse cached results

## Step 6: Add Vector Search

Once reviews are classified, we can enable semantic search.

Embeddings example:

```
const response = await openai.embeddings.create({  model: "text-embedding-3-large",  input,  dimensions: 1536});
```

Search combines:

-   **Semantic vector similarity**
-   **Lexical keyword matching**

```
const semanticResults = buildSemanticSearchRecords(...);const lexicalResults = buildLexicalSearchRecords(...);return mergeSearchRecords(semanticResults, lexicalResults);
```

Hybrid retrieval works especially well for review data, where exact phrases (“OTP not received”) matter just as much as semantic similarity.

## Step 7: Generate Analytics and MCP Tools

Once reviews are structured, analytics becomes straightforward.

Example aggregation:

```
const key = `${issueType}::${featureArea}`;row.review_count += 1;row.severity_breakdown[sev] += 1;
```

Tools exposed via MCP:

-   `reviews_import`
-   `reviews_analyze`
-   `reviews_search`
-   `reviews_top_issues`
-   `reviews_weekly_report`

Server tool registration:

```
server.setRequestHandler(CallToolRequestSchema, async (request) => {  return dispatchToolCall(    request.params.name,    request.params.arguments,    runtimeDeps  );});
```

This transforms the system into **reusable infrastructure** rather than a single script.

## Key Design Decisions

Several architectural choices make this system strong:

**Rules before LLM**
Cheaper, faster, and easier to debug.

**PII redaction in the pipeline**
Privacy is enforced by default.

**Hybrid search**
Semantic + lexical retrieval improves results.

**Structured analytics after classification**
Reporting becomes deterministic and reliable.

**MCP tool boundary**
Makes the system easily usable by IDE agents.

## Common Pitfalls

If you build a similar system, avoid these mistakes:

-   Sending every review to the LLM
-   Skipping a taxonomy definition
-   Treating privacy as an application-layer concern
-   Building reports directly from raw text
-   Ignoring degraded-mode behavior when models fail

## Conclusion

ReviewRadar shows how to build a practical AI backend without overusing AI.

A practical build order looks like this:

1.  Define taxonomy and response contracts
2.  Ingest and normalize reviews
3.  Redact PII
4.  Build deterministic rules
5.  Route uncertain reviews to the LLM
6.  Add reliability controls
7.  Index reviews for semantic search
8.  Compute analytics on structured outputs
9.  Expose capabilities as MCP tools

The real power of this system is not one clever prompt.

It comes from combining **schemas, rules, selective model usage, search, and analytics into a clean pipeline.**

## Further Improvements

Future enhancements could include:

-   Release-aware regression detection by app version
-   Incremental indexing instead of batch imports
-   Automatic summary extraction
-   Multiple embedding providers
-   A dashboard UI on top of the MCP server
-   Historical trend tracking for month-over-month analysis

If you build something similar, remember the core principle:

> Use the LLM as a **high-value component inside a well-structured system — not as the system itself.**
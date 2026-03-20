---
title: "Runtime Reinforcement: Preventing “Instruction Decay” in Long Context Windows"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/runtime-reinforcement-preventing-instruction-decay-in-long-context-windows-66d498097db9?source=rss----98111c9905da---4"
publishedAt: "2026-03-03"
tags:
  - "ai-general"
  - "freelancing"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-04T16:12:55.315Z"
---

# Runtime Reinforcement: Preventing “Instruction Decay” in Long Context Windows

# Runtime Reinforcement: Preventing “Instruction Decay” in Long Context Windows

## Moving critical business logic from the System Prompt to a per-turn Injection Layer.

[Shreyash Shukla](https://medium.com/@shreyash.shukla.2304?source=post_page---byline--66d498097db9---------------------------------------)

7 min read·Feb 7, 2026

\--

![Image Source: Google Gemini]()

## The “Floating Brain” Problem

In our previous articles, we discussed how to give the agent knowledge (Graph), sight (Shape), and empathy (User Context). But even a perfect agent suffers from a fundamental flaw inherent to the Large Language Model architecture: **it exists in a timeless void.**

An LLM has no internal clock. It does not know that “today” is Tuesday. Furthermore, as a conversation progresses, it suffers from **“Context Drift.”**

Research from **Stanford (Liu et al., 2023)** has quantified a behavior known as the *“Lost in the Middle”* phenomenon. As the context window fills up with conversation history (SQL queries, data tables, user chit-chat), the model’s attention mechanism begins to degrade. It prioritizes the very beginning (System Prompt) and the very end (User’s latest question), but the critical instructions in the middle — like negative constraints (“Do not use the `eng_rate` metric")—often get ignored \[[Lost in the Middle: How Language Models Use Long Contexts - arXiv](https://arxiv.org/abs/2307.03172)\].

We call this **“Instruction Decay.”**

-   **Temporal Failure:** A user asks, *“How is performance this week?”* The agent, lacking a reference for “this week,” hallucinates a date range or defaults to a training data timestamp.
-   **Compliance Failure:** In Turn #1, the agent remembers to “Exclude Returns & Allowances.” By Turn #20, after processing 50,000 tokens of other data, that specific instruction is “washed out” by Recency Bias \[[Instruction Following in LLMs — MIT Press](https://direct.mit.edu/coli/article/50/3/1053/121669/Large-Language-Model-Instruction-Following-A)\].

We cannot rely on the *static* System Prompt to hold the line forever. We need a **Runtime Interceptor** — a “Just-in-Time” layer that stamps the current time and non-negotiable business rules onto the very end of the prompt context, *milliseconds* before the model generates a response.

## Temporal Grounding (The “When”)

To an LLM, “Time” is a frozen concept. It knows that World War II ended in 1945, but it does not know if “last quarter” refers to Q4 2023 or Q1 2024. This is because the model’s internal state is static, defined by its training cutoff.

When a user asks, *“Show me sales for the last 7 days,”* a standard agent might either:

1.  **Hallucinate:** Guess a date range based on example prompts it saw during training.
2.  **Fail:** Refuse to answer due to ambiguity.

To fix this, we must anchor the agent in the **Present Moment**. We do this by injecting a precise, timezone-aware timestamp into the prompt context at the exact moment of inference.

We can utilize the `before_model_callback` to generate a dynamic header. Using `datetime` , we append a timestamp prefix to every user turn ensuring that "today" aligns with the user's definition of "today."

```
import datetimeimport pytzdef get_temporal_context():    # 1. Define the Corporate Timezone (Critical for Data Alignment)    # If your DB is in UTC, this must be UTC. If PST, use PST.    target_tz = pytz.timezone("America/Los_Angeles")        # 2. Get the specific "Now"    current_time = datetime.datetime.now(target_tz).strftime(        "%Y-%m-%d %H:%M:%S %Z"    )        # 3. Format as a System Directive    return f"[Timestamp]: The current date and time is {current_time}."
```

When the user types *“How is performance?”*, the callback silently prepends this string. The LLM receives: `[Timestamp]: The current date and time is 2025-10-27 14:30:00 PDT.` `User: How is performance?`

The model now possesses the necessary variable to calculate relative dates. It automatically interprets “performance” as “performance *as of Oct 27th*,” resolving the ambiguity without a single follow-up question.

![Image Source: Google Gemini]()

## Critical Reinforcement (The “What”)

In a perfect world, an LLM would read your System Prompt once and remember it forever. In reality, LLMs suffer from the **“Recency Effect.”** They pay disproportionate attention to the last few user messages and often “forget” constraints buried 10,000 tokens back in the history.

## Get Shreyash Shukla’s stories in your inbox

 from this writer.

Remember me for faster sign in

This is dangerous for enterprise data. If the model forgets to “Exclude Internal Test Accounts” because it got distracted by a long conversation about revenue, the resulting SQL is technically valid but business-wrong.

### **The Solution: The “Sticky Note” Pattern**

We treat the `before_model_callback` as a mechanism to slap a "Sticky Note" onto the user's prompt right before it enters the model's brain. This is **Active Governance**.

### **The Engineering: The Reinforcement Block**

We construct a string block containing only the most critical, high-failure-rate instructions. We append this block to the *end* of the prompt, ensuring it is the fresh context the model sees.

### **What Goes Inside? (Universal Patterns)**

We focus on two categories of failure modes common across all LLMs (GPT-4, Claude, Gemini, Llama):

1.  **Hard Business Logic (The “Musts”):** Rules that, if missed, cause compliance or accuracy issues.

-   *Example:* “MANDATORY: When calculating ‘Active Users’, you MUST exclude any user\_id starting with ‘test\_’.”
-   *Why here?* Because test data looks just like real data. The model *will* include it unless explicitly warned at runtime.

1.  **Syntactic Hallucination (The “How”):** Complex technical syntax that models often fumble when dealing with nested data types.

-   *Example (JSON/NoSQL):* “REMINDER: When querying the `properties` column, do not assume keys exist. Always use `JSON_EXTRACT(properties, '$.region')` instead of `properties.region`."
-   *The Fix:* We inject a snippet forcing the safer, explicitly verbose syntax to prevent runtime errors.

**The Resulting Prompt Structure** The LLM sees a composite prompt:

1.  `[System Prompt]` (The general persona)
2.  `[Conversation History]` (The last 20 turns)
3.  `[User Input]` ("Show me the numbers.")
4.  `**[Runtime Injection]**` ("Timestamp: 10:00 AM. Rule: Exclude 'test\_%'. Syntax: Use JSON\_EXTRACT.")

By physically placing the rules *after* the user input, we mathematically increase the probability of adherence.

![Image Source: Google Gemini]()

## The Code Artifact (The Implementation)

We have the theory (Recency Bias) and the strategy (Sticky Note). Now we need the code.

The following Python class demonstrates how to implement a **Runtime Interceptor**. It uses a standard callback pattern to intercept the `llm_request` object, generate the reinforcement block, and append it to the prompt stream before the model ever sees it.

**The Code Walkthrough** This `ImprovePrompt` class performs three critical actions:

1.  **Time Stamping:** It calculates the current time in the business’s primary timezone (e.g., PST/EST), ensuring the model knows “when” it is.
2.  **Rule Aggregation:** It defines a dictionary of non-negotiable rules (Syntax & Logic).
3.  **Prompt Surgery:** It physically appends these rules to the *end* of the user’s message, maximizing their weight in the model’s attention mechanism.

### **The Implementation**

```
import datetimeimport pytzfrom typing import Optional# Assumption: You are using a standard framework where requests are mutable objects# (e.g., Google ADK)class ImprovePrompt:    """    A runtime callback that injects Temporal Context and Business Rules    into the prompt milliseconds before inference.    """    def before_model_callback(self, callback_context, llm_request) -> Optional[None]:        """        Intercepts the LLM request to append the 'Sticky Note' of context.        """                # 1. TEMPORAL GROUNDING        # We enforce a specific timezone to align with database ETL cycles.        target_tz = pytz.timezone("America/Los_Angeles")        current_time = datetime.datetime.now(target_tz).strftime(            "%Y-%m-%d %H:%M:%S %Z"        )        timestamp_prefix = f"[System Clock]: Current Time is {current_time}."        # 2. CRITICAL REINFORCEMENT BLOCK        # These are rules that the model is prone to "forgetting" in long chats.        reinforcement_prompt = """        +-------------------------------------------------------+        |             RUNTIME GOVERNANCE PROTOCOLS              |        +-------------------------------------------------------+                [1] DATA EXCLUSION RULES (MANDATORY):            - IF querying 'Active Users', you MUST exclude 'test_%' IDs.            - IF querying 'Revenue', you MUST exclude 'Trial' SKUs.                [2] SYNTAX SAFETY (NO HALLUCINATIONS):            - JSON Fields: Do NOT use dot notation (data.id).               ALWAYS use safe extraction: JSON_EXTRACT(data, '$.id').            - Date Literals: ALWAYS cast strings to dates               (e.g., CAST('2023-01-01' AS DATE)).                [3] TEMPORAL LOGIC:            - "Today" is defined by the [System Clock] above.            - "Last Week" means the complete 7-day period ending yesterday.        """        # 3. PROMPT SURGERY        # We locate the user's latest input and append our block.        if not llm_request.contents:            return None        # Access the raw text parts of the prompt        current_parts = list(llm_request.contents[0].parts)        # Create the new injection part        injection_text = (            f"\n\n--- INTERNAL SYSTEM INJECTION ---\n"            f"{timestamp_prefix}\n"            f"{reinforcement_prompt}\n"            f"-------------------------------------\n"        )                # Prepend or Append?         # We Prepend to the latest turn to ensure it frames the user's request immediately.        # (Some architectures prefer appending; both work depending on attention tuning).        from google.genai import types # or your specific framework types        injection_part = types.Part(text=injection_text)                # Modify the request in-place        new_parts = [injection_part] + current_parts        llm_request.contents[0].parts = new_parts        return None
```

![Image Source: Google Gemini]()

## **The Outcome**

With this 50-line class, every single interaction — whether it’s the 1st turn or the 100th — is grounded in the exact same reality. The model effectively “wakes up” with a fresh memory of the rules every time it speaks.

## Build the Complete System

This article is part of the **Cognitive Agent Architecture** series. We are walking through the engineering required to move from a basic chatbot to a secure, deterministic Enterprise Consultant.

To see the full roadmap — including **Semantic Graphs (The Brain)**, **Gap Analysis (The Conscience)**, and **Sub-Agent Ecosystems (The Organization)** — check out the Master Index below:

[**The Cognitive Agent Architecture: From Chatbot to Enterprise Consultant**](https://medium.com/data-and-beyond/the-cognitive-agent-architecture-5c745909ae9a)
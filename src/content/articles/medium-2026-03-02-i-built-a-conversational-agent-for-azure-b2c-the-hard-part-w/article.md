---
title: "I Built a Conversational Agent for Azure B2C — The Hard Part Wasn’t Azure"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/i-built-a-conversational-agent-for-azure-b2c-the-hard-part-wasnt-azure-eea060c10781?source=rss----98111c9905da---4"
publishedAt: "2026-03-02"
tags:
  - "artificial-intelligence"
  - "microsoft-entra-id"
  - "python"
  - "ai-agent"
  - "azure"
  - "ai"
  - "research"
---

# I Built a Conversational Agent for Azure B2C — The Hard Part Wasn’t Azure

# I Built a Conversational Agent for Azure B2C — The Hard Part Wasn’t Azure

## *A DevSecOps engineer’s honest account of building an AI agent grounded in real tenant data — including the parts that didn’t work.*

[suman saha](https://medium.com/@sumansaha15?source=post_page---byline--eea060c10781---------------------------------------)

9 min read·5 days ago

\--

> ***A note on scope:*** *This is an experimental project built with a vision for future integration into a real business process. It is not yet production-grade. Enterprise AI agent platforms like Azure AI Foundry, AWS Bedrock Agents, and Google Vertex AI Agent Builder offer managed infrastructure, safety controls, and scalability that this implementation doesn’t. This is a learning exercise — with a real use case behind it.*

## The Problem

I work in the identity and access management space, building and maintaining Azure B2C solutions for consumer-facing applications. The tenant I manage serves multiple consumer apps — each with their own owners, their own user bases, their own access patterns.

Those app owners have questions. Constantly.

*“How many users registered this month?”* *“Which users are in the premium group?”* *“How many password reset events happened last week?”*

None of these are hard questions. The answers are all in Microsoft Graph, Azure AI Search audit indexes, and our custom APIs. Some app owners are technical — they could write a Graph query or fire up Postman — but they shouldn’t have to. Others aren’t engineers at all. Either way, the questions land on my team.

I wanted to give them a self-service interface. A chat window where they could ask questions in plain English and get answers grounded in our own tenant data — without needing to understand what’s happening underneath.

That was the idea. Here’s what actually happened when I tried to build it.

## The Vision

A conversational agent that:

-   Accepts natural language questions from non-technical app owners
-   Routes each question to the right backend — Microsoft Graph for directory data, Azure AI Search for audit events, a custom API for sensitive operations
-   Stays read-only by default, with explicit confirmation gates for anything that mutates state
-   Is grounded entirely in our own data — no external datasets, no hallucinated answers

The target users range from non-technical business owners to engineers who simply want a faster path to answers. The agent should work for both — conversational enough for the former, accurate enough for the latter.

## The Stack

-   **Python** — the agent and all service clients
-   **Azure AI Foundry (GPT-4o mini)** — intent detection
-   **Microsoft Graph API** — directory operations (users, groups, app registrations)
-   **Azure AI Search** — append-only audit/event index
-   **Custom internal API** — sensitive operations, some requiring mTLS
-   **FastAPI** — the chat endpoint
-   **Azure Container Apps** — deployment
-   **Key Vault + Managed Identity** — secrets and credentials

The architecture has four layers:

```
Chat UI / API endpoint        │        ▼    b2c_agent.py    (intent detection + routing)        │        ├──► graph_service.py      (Microsoft Graph)        ├──► search_client.py      (Azure AI Search)        └──► custom_api_client.py  (Internal API, mTLS optional)
```

## What I Knew Going In — and What I Didn’t

I’ve been working with Azure for years. B2C custom policies, Entra ID, Conditional Access, managed identities, Key Vault — this is my domain. I can wire up mTLS client certificates in my sleep.

What I didn’t know was AI. I hadn’t built an agent before. I didn’t fully understand how LLMs handle intent classification, how to structure prompts for routing decisions, or how conversation context flows between turns. I was a cloud engineer trying to learn AI on the job.

That gap turned out to be where all the hard problems were.

## How the Intent Routing Works

The core of the agent is surprisingly simple in concept. For every user message, I build an array of known intents and pass it to the LLM along with the user’s input:

```
INTENT_GUIDE = [    {"intent": "query_user_details", "description": "Get details of a specific user by email or ID"},    {"intent": "query_user_count", "description": "Count users registered in a time period"},    {"intent": "query_group_members", "description": "List members of a specific group"},    {"intent": "query_reset_events", "description": "Count or list password reset audit events"},    {"intent": "action_reset_user", "description": "Perform a full reset on a specific user account"},    {"intent": "unknown", "description": "Query does not match any known operation"},]def detect_intent(user_message: str) -> dict:    prompt = f"""You are an intent classifier for an Azure B2C management agent.    Given the user message below, return the most appropriate intent from this list:{json.dumps(INTENT_GUIDE, indent=2)}User message: "{user_message}"Respond with JSON only: {{"intent": "<intent_name>", "entities": {{"email": "<if present>", "group": "<if present>"}}}}"""    response = call_llm(prompt)    return json.loads(response)
```

The router then dispatches based on the detected intent:

```
def route(intent: str, entities: dict) -> str:    if intent == "query_user_details":        return graph_service.get_user(entities.get("email"))    elif intent == "query_reset_events":        return search_client.count_events("password reset")    elif intent.startswith("action_"):        return handle_action(intent, entities)    else:        return "I'm sorry, I didn't understand that request."
```

The separation of `query_*` and `action_*` intents is deliberate. Query intents are read-only and execute immediately. Action intents — anything that mutates state — require an explicit confirmation step before the agent proceeds.

## The Backend Integrations

## Microsoft Graph

Graph handles all directory operations. I use app-only tokens (client credentials flow) for administrative reads — user details, group memberships, app registrations. Pagination is handled with `@odata.nextLink`:

```
def paginate_graph(self, url, headers):    items = []    while url:        resp = requests.get(url, headers=headers, timeout=30)        resp.raise_for_status()        data = resp.json()        items.extend(data.get("value", []))        url = data.get("@odata.nextLink")    return items
```

## Azure AI Search

The audit index is treated as an append-only event store. Each row captures event type, timestamp, user, and metadata. Querying it for counts is straightforward with the SDK:

```
from azure.search.documents import SearchClientresults = client.search(    "password reset",    top=0,    include_total_count=True)count = results.get_count()
```

## The Custom API and mTLS

One set of internal APIs handles sensitive operations — user resets, account mutations. These require mTLS client certificates for mutual authentication. The agent presents its certificate on each call:

```
client = httpx.Client(    cert=("/etc/certs/client.cert.pem", "/etc/certs/client.key.pem"),    verify="/etc/certs/ca_chain.pem",    timeout=30,)resp = client.post("https://custom.api.internal/user/reset", json=payload)
```

mTLS came from an existing requirement of those APIs — it wasn’t something I designed in from scratch. The agent just had to support it.

## The Auth Dilemma I Didn’t Expect

One decision I genuinely struggled with was token strategy for the custom API calls.

The APIs support client credentials grant — straightforward, the agent authenticates as itself and gets a token. But the better practice for operations that affect user accounts is delegated tokens — the agent should act *on behalf of* the authenticated user, not as an independent service principal.

The dilemma: client credentials is simpler and the APIs support it. But it means the agent has broad permissions regardless of who is asking. MSAL’s on-behalf-of flow is more correct — it preserves the user’s identity and lets the API enforce their specific permissions — but it adds significant complexity to the auth chain.

## Get suman saha’s stories in your inbox

 from this writer.

Remember me for faster sign in

For this experimental version, I used client credentials with strict RBAC on the service principal and explicit confirmation gates before any write operation. It’s a pragmatic compromise, not an ideal one. In a production deployment, on-behalf-of would be the right call.

## The Gotchas — Where the AI Part Got Humbling

## Gotcha 1: Phrasing sensitivity broke the routing

This was the most frustrating discovery. The same intent, phrased differently, produced completely different results.

*“Give details of abc@somedomain.com”* → correctly routed to `query_user_details`, Graph call succeeded, data returned.

*“Can you look up data for abc@somedomain.com”* → returned `unknown` intent, agent responded with "I didn't understand that request."

Same question. Same email. Different words. The intent guide description said “Get details of a specific user by email or ID” — which maps to “give details” much more naturally than “look up data.” The LLM was pattern-matching the phrasing against the description rather than understanding the underlying intent.

The fix was expanding the descriptions and adding example phrasings to the intent guide:

```
{    "intent": "query_user_details",    "description": "Get, fetch, look up, retrieve, or show details, info, or data for a specific user by email or ID",    "examples": [        "Give details of abc@example.com",        "Can you look up data for abc@example.com",        "Show me info for user abc@example.com",        "What do you know about abc@example.com"    ]}
```

This improved routing accuracy significantly — but it’s a symptom of a deeper issue. I was using a small, fast model (GPT-4o mini) for intent classification. A larger model would handle semantic variation more gracefully. The trade-off between speed, cost, and accuracy is real.

## Gotcha 2: Follow-up questions always failed

Every follow-up question returned `unknown` intent. After a successful user lookup, asking *"What groups is she in?"*produced nothing useful — the agent had no idea who "she" referred to.

The problem was that I had no conversation memory. Each turn was stateless. The agent received the current message, classified it, called an API, returned a result — and forgot everything. The next message arrived with no context.

Fixing this properly requires maintaining a session context that tracks recent intents, entities, and results:

```
session_context = {    "last_intent": "query_user_details",    "last_entities": {"email": "abc@somedomain.com"},    "last_result": { ...user data... }}
```

And passing that context into the intent classification prompt so the LLM can resolve references like “she”, “that user”, “the same group”. I implemented a basic version of this but it’s still fragile — resolving ambiguous references reliably is a genuinely hard problem.

## Gotcha 3: Confidence thresholds matter

Early on the agent would confidently route ambiguous queries to the wrong API rather than asking for clarification. A question like *“show me the recent activity”* — with no user or event type specified — would get routed to `query_reset_events`because that happened to be the first matching intent.

Adding a confidence score to the intent response and falling back to clarification below a threshold helped:

```
# Ask the LLM to also return confidence{"intent": "query_reset_events", "confidence": 0.6, "entities": {}}# In the routerif result["confidence"] < 0.75:    return "Could you be more specific? For example: 'How many password reset events happened this week?'"
```

## Gotcha 4: My AI knowledge had real gaps

I’ll be direct about this. I’m experienced in Azure, DevSecOps, and backend engineering. I am not an AI engineer. Building this agent exposed gaps in my understanding — how to structure prompts for reliable JSON output, how context windows affect multi-turn conversations, when to use a smaller vs larger model for different tasks.

I learned as I built. The result works but carries the marks of that learning curve. If I were starting again, I’d spend more time upfront understanding prompt engineering before writing any routing code.

## Safety Gates

Because the target users include non-technical app owners, the agent is conservative by design.

**Query intents** execute immediately and are always read-only. No mutations, no side effects.

**Action intents** require three things before executing:

1.  An explicit user identifier in the request
2.  A confirmation dialog — the agent summarises what it’s about to do and waits for approval
3.  An RBAC check — not every app owner can trigger every action

```
if intent.startswith("action_"):    if not entities.get("email"):        return "Please specify the user you want to act on."        summary = f"I'm about to perform '{intent}' on {entities['email']}. Type CONFIRM to proceed."    if not await_confirmation(session_id, summary):        return "Action cancelled."        if not rbac.can_perform(current_user, intent):        return "You don't have permission to perform this action."        return custom_api_client.execute(intent, entities)
```

The principle is fail-closed. If intent confidence is low, ask for clarification. If confirmation isn’t received, do nothing. If the user lacks permission, deny and explain.

## Deployment

The agent runs as a containerised service on Azure Container Apps:

```
# Build and pushaz acr build --registry <registry> --image b2c-chat-agent:v1.0 .# Deployaz containerapp update \  --name b2c-chat-agent \  --resource-group <rg> \  --image <registry>/b2c-chat-agent:latest
```

Secrets live in Key Vault. The agent accesses them via Managed Identity — no credentials in code, no credentials in environment variables. Certificate rotation for mTLS is automated.

Structured JSON logs with correlation IDs go to Application Insights for every request — intent detected, API called, result returned, errors surfaced. This makes debugging routing failures much faster than it would be otherwise.

## What Works, What Doesn’t

**Works well:**

-   Read-only queries via Graph and AI Search are reliable when phrasing matches the intent guide
-   The `query_*` vs `action_*` separation keeps the safety model clean
-   mTLS integration is transparent once configured
-   Confirmation gates work as designed

**Still fragile:**

-   Phrasing variations still occasionally trip the router despite expanded descriptions
-   Multi-turn conversation context is basic and breaks on complex references
-   Confidence thresholds need tuning per intent — what counts as “confident enough” varies

**Not built yet:**

-   A proper frontend chat UI — currently a REST endpoint
-   Full on-behalf-of token flow for write operations
-   Automated tests for intent classification accuracy

## Final Thoughts

The Azure plumbing — Graph, AI Search, mTLS, Key Vault, Managed Identity — was the part I expected to be hard. It wasn’t. Years of working in this space meant that part came together quickly.

The AI part — making the LLM reliably understand what people mean and map it to the right API call — was where I struggled. Phrasing sensitivity, stateless conversations, confidence calibration — these were problems I hadn’t anticipated and didn’t have prior experience solving.

That’s probably the most honest thing I can say about building AI agents as a cloud engineer: the cloud infrastructure is the easy part. The AI behaviour is where the real engineering challenge lives.

This experiment has a genuine future. Self-service access to B2C tenant data — without technical knowledge, without waiting for an engineer — is a real need for the teams I work with. The current implementation proves the concept. Getting it to production standard means solving the conversation memory problem properly, tightening the intent routing, and moving to delegated auth for write operations.

It’s a work in progress. But it works — and building it taught me more about AI engineering than anything I’ve read.
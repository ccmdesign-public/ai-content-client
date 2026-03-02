---
title: "Building a Production Multi-Tenant WhatsApp AI Bot: One Backend, Three Businesses"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/building-a-production-multi-tenant-whatsapp-ai-bot-one-backend-three-businesses-87de9a5fcc7b?source=rss----98111c9905da---4"
publishedAt: "2026-03-02"
tags:
  - "agentic-ai"
  - "chatbots"
  - "artificial-intelligence"
  - "ai"
  - "research"
---

# Building a Production Multi-Tenant WhatsApp AI Bot: One Backend, Three Businesses

# Building a Production Multi-Tenant WhatsApp AI Bot: One Backend, Three Businesses

[Loureiropaulo](https://medium.com/@loureiropaulo?source=post_page---byline--87de9a5fcc7b---------------------------------------)

8 min read·Feb 23, 2026

\--

*How I designed a single Python backend that serves a real estate agency in Dubai, a dental practice in Brazil, and a food retailer — each with fully isolated AI behavior, context memory, and business logic — without any off-the-shelf automation tools.*

Most WhatsApp AI tutorials show you how to build a bot for one use case. You connect to the API, craft a system prompt, call OpenAI, send a reply. It works. But it doesn’t scale.

When I started building AI automation infrastructure for businesses through my company Sigma Intelligence, I quickly ran into a real-world constraint: clients don’t want to share backends. A real estate agency, a dental practice, and a food retailer all needed WhatsApp AI — but each needed completely different behavior, different memory, different integrations, and different escalation logic. Spinning up three separate deployments was not the answer. The answer was a **multi-tenant architecture**.

This article walks through the core design patterns of SigmaAI, a production multi-tenant WhatsApp AI platform I built from scratch in Python. No no-code platforms. No pre-built automation templates. Everything described here runs in production today.

## The Problem with Single-Tenant WhatsApp Bots

The typical tutorial approach looks like this:

python

```
@app.post("/webhook")async def webhook(request: Request):    body = await request.json()    user_message = body["entry"][0]["changes"][0]["value"]["messages"][0]["body"]    ai_reply = call_openai(user_message)    send_whatsapp_message(to=user_phone, text=ai_reply)
```

This works perfectly for one business. But when you add a second client, you immediately face three hard problems:

1.  **Isolation** — how do you ensure Client A’s conversation history never bleeds into Client B’s AI context?
2.  **Configuration** — how do you serve wildly different system prompts, escalation rules, and integrations from the same codebase?
3.  **Routing** — a single incoming webhook receives messages for all clients. How do you know which client a message belongs to?

The answer to all three is a **tenant-aware architecture**.

## Architecture Overview

Show Image *Figure 1 — Full message flow: from three different WhatsApp users, through tenant resolution and isolated context management, to the AI engine and action handlers.*

The system has four main layers:

```
Incoming WhatsApp Message        │        ▼ ┌─────────────────┐ │  Webhook Router  │  ← identifies tenant from destination phone number └────────┬─────────┘          │          ▼ ┌─────────────────┐ │ Tenant Resolver  │  ← loads config: system prompt, integrations, rules └────────┬─────────┘          │          ▼ ┌─────────────────┐ │ Context Manager  │  ← retrieves + updates conversation history for this user └────────┬─────────┘          │          ▼ ┌─────────────────┐ │  AI Engine       │  ← OpenAI API call with assembled context └────────┬─────────┘          │          ▼ ┌─────────────────┐ │ Action Handler   │  ← sends reply + triggers downstream integrations (CRM, calendar, etc.) └─────────────────┘
```

The key insight: **the receiving phone number is the tenant identifier.** Each client gets their own WhatsApp Business number. When a message arrives, the destination number tells us exactly which tenant it belongs to — before we do anything else.

## Tenant Configuration

Each tenant is defined by a configuration object that encapsulates everything the AI engine needs to behave correctly for that business:

python

```
from dataclasses import dataclass, fieldfrom typing import Optional, Callable
```

```
@dataclassclass TenantConfig:    tenant_id: str    whatsapp_phone_id: str          # Meta Business API phone ID    system_prompt: str              # The AI's "personality" for this client    business_context: str           # What this business does    escalation_keywords: list[str]  # Words that trigger human handoff    escalation_number: str          # Human agent WhatsApp number    crm_webhook_url: Optional[str]  # POST endpoint for qualified leads    calendar_integration: Optional[str]  # Booking API endpoint    language: str = "en"    max_context_turns: int = 10     # How many message pairs to keep in memory    post_action_hook: Optional[Callable] = None  # Custom downstream logic
```

Each client’s configuration lives in a registry. Here’s what three different tenants look like:

python

```
TENANT_REGISTRY = {    "real_estate_ae": TenantConfig(        tenant_id="real_estate_ae",        whatsapp_phone_id="PHONE_ID_RE",        system_prompt="""You are an intelligent real estate assistant for a Dubai luxury        property agency. Your role is to qualify leads by understanding their budget,        timeline, preferred areas, and property type. Be professional, knowledgeable        about Dubai's property market, and gather complete information before presenting        options. Never quote specific prices — always route to an agent for pricing.""",        business_context="Luxury real estate agency in Dubai, UAE",        escalation_keywords=["agent", "call me", "price", "ready to buy", "invest"],        escalation_number="+971XXXXXXXXX",        crm_webhook_url="https://crm.client-re.com/api/leads",        language="en",    ),
```

```
"dental_clinic_br": TenantConfig(        tenant_id="dental_clinic_br",        whatsapp_phone_id="PHONE_ID_DENTAL",        system_prompt="""Você é a recepcionista virtual de uma clínica odontológica.        Ajude pacientes a agendar consultas, responda perguntas sobre procedimentos        e planos de pagamento, e envie lembretes de pós-atendimento. Seja calorosa,        clara e sempre confirme datas e horários antes de finalizar.""",        business_context="Dental clinic in Brazil",        escalation_keywords=["urgência", "dor", "emergência", "sangramento"],        escalation_number="+55XXXXXXXXXXX",        calendar_integration="https://calendar.client-dental.com.br/api/schedule",        language="pt",    ),    "food_retail_us": TenantConfig(        tenant_id="food_retail_us",        whatsapp_phone_id="PHONE_ID_FOOD",        system_prompt="""You are the intelligent supply chain assistant for a food        retail and distribution company. Help clients check inventory levels, place        orders, track deliveries, and resolve fulfillment questions. You have access        to real-time inventory data. Flag any order above $5,000 for manager review.""",        business_context="Food retail and distribution company",        escalation_keywords=["complaint", "wrong order", "missing", "urgent"],        escalation_number="+XXXXXXXXXXXX",        crm_webhook_url="https://erp.client-food.com/api/orders",        language="en",    ),}
```

Three completely different AI personalities, languages, escalation rules, and integrations — zero code duplication.

## The Webhook Router

The webhook router is the entry point for all incoming messages. Its only job is to identify the tenant:

python

```
from fastapi import FastAPI, Request, HTTPExceptionimport hmac, hashlib
```

```
app = FastAPI()def resolve_tenant(phone_id: str) -> TenantConfig:    """Map incoming WhatsApp phone ID to tenant configuration."""    for config in TENANT_REGISTRY.values():        if config.whatsapp_phone_id == phone_id:            return config    raise HTTPException(status_code=404, detail=f"Unknown phone_id: {phone_id}")@app.post("/webhook")async def receive_message(request: Request):    # 1. Verify Meta webhook signature    body = await request.body()    signature = request.headers.get("X-Hub-Signature-256", "")    if not verify_signature(body, signature):        raise HTTPException(status_code=403, detail="Invalid signature")    data = await request.json()    # 2. Extract message metadata    try:        entry = data["entry"][0]["changes"][0]["value"]        phone_id = entry["metadata"]["phone_number_id"]  # ← tenant identifier        message = entry["messages"][0]        user_phone = message["from"]        user_text = message["text"]["body"]    except (KeyError, IndexError):        return {"status": "ok"}  # ignore non-message events    # 3. Route to correct tenant pipeline    tenant = resolve_tenant(phone_id)    await process_message(tenant, user_phone, user_text)    return {"status": "ok"}
```

The routing logic is intentionally dead simple. The complexity lives in the tenant configuration, not in conditional branches.

## Conversation Context Management

This is where most tutorials fail in production. A bot that doesn’t remember what was said 3 messages ago is worse than no bot at all. But context also needs **isolation** — user A’s conversation at Dental Belvedere should never contaminate the context of user B, and neither should cross over to the Dubai real estate bot.

python

```
from collections import defaultdictfrom typing import TypedDict
```

```
class Message(TypedDict):    role: str   # "user" or "assistant"    content: str# In production, replace with Redis for horizontal scaling# Key format: "{tenant_id}:{user_phone}"conversation_store: dict[str, list[Message]] = defaultdict(list)def get_context(tenant: TenantConfig, user_phone: str) -> list[Message]:    key = f"{tenant.tenant_id}:{user_phone}"    history = conversation_store[key]    # Keep only last N turns to manage token costs    return history[-(tenant.max_context_turns * 2):]def save_turn(tenant: TenantConfig, user_phone: str,              user_msg: str, assistant_msg: str):    key = f"{tenant.tenant_id}:{user_phone}"    conversation_store[key].extend([        {"role": "user", "content": user_msg},        {"role": "assistant", "content": assistant_msg}    ])
```

The `"{tenant_id}:{user_phone}"` compound key is the critical piece. Without the tenant prefix, a user who messaged both the real estate bot and the dental bot could theoretically see context bleed across systems.

## The AI Engine

With tenant config and context in hand, the AI call itself is straightforward:

## Get Loureiropaulo’s stories in your inbox

 from this writer.

Remember me for faster sign in

python

```
from openai import AsyncOpenAI
```

```
client = AsyncOpenAI()async def generate_response(    tenant: TenantConfig,    user_phone: str,    user_message: str) -> str:    history = get_context(tenant, user_phone)    messages = [        {            "role": "system",            "content": f"{tenant.system_prompt}\n\nBusiness context: {tenant.business_context}"        },        *history,        {"role": "user", "content": user_message}    ]    response = await client.chat.completions.create(        model="gpt-4o",        messages=messages,        temperature=0.3,  # Lower temperature = more consistent business behavior        max_tokens=512    )    reply = response.choices[0].message.content    save_turn(tenant, user_phone, user_message, reply)    return reply
```

## Escalation Logic

Production bots need to know when to get out of the way. Each tenant defines their own escalation triggers. The escalation handler checks for keywords and routes to a human agent when needed:

python

```
async def handle_escalation(tenant: TenantConfig, user_phone: str, trigger: str):    """Notify human agent and inform user."""    escalation_message = {        "en": f"Let me connect you with one of our team members right away. Someone will be with you shortly.",        "pt": f"Vou te conectar com um dos nossos atendentes agora. Em breve alguém entrará em contato."    }.get(tenant.language, "Connecting you to a team member now.")
```

```
await send_whatsapp_message(user_phone, escalation_message)    await notify_agent(tenant.escalation_number,                       f"Escalation needed: {user_phone} triggered '{trigger}'")async def process_message(tenant: TenantConfig, user_phone: str, user_text: str):    # Check for escalation before calling AI    for keyword in tenant.escalation_keywords:        if keyword.lower() in user_text.lower():            await handle_escalation(tenant, user_phone, keyword)            return    # Generate AI response    reply = await generate_response(tenant, user_phone, user_text)    # Send reply    await send_whatsapp_message(user_phone, reply)    # Trigger downstream integrations if configured    if tenant.crm_webhook_url:        await maybe_push_to_crm(tenant, user_phone, user_text, reply)
```

## What This Looks Like in Production

After deploying across three client verticals, the measured outcomes were concrete and documented:

**Real estate agency (Dubai, UAE):**

-   Lead qualification time: 45-minute agent phone calls → 8-minute automated WhatsApp conversation
-   Every qualified lead arrives to the agent with property preferences, budget, timeline, and contact info already captured — no cold call needed
-   After-hours leads (previously lost) are now captured and qualified 24/7
-   Staff time saved: ~35 hours/week across the sales team

**Dental clinic (Brazil):**

-   Before deployment: receptionists manually handled all appointment scheduling via phone and WhatsApp during business hours. After-hours requests waited until the next morning.
-   After deployment: 100% of appointment scheduling handled by the bot, including evenings and weekends. Zero missed after-hours booking requests.
-   Post-care follow-up messages (24h and 72h after procedures) sent automatically — previously skipped entirely due to manual workload
-   Staff time saved: ~28 hours/week on scheduling and follow-up alone

**Food retail and distribution company:**

-   Order inquiry response time: 4–6 hours (manual) → under 10 seconds (automated)
-   Orders above the $5,000 threshold are automatically flagged and routed to the manager for approval — eliminating a category of fulfillment errors that previously required manual review of every order
-   Staff time saved: ~32 hours/week on order inquiries and routing

Each client averages **30+ hours of staff time saved per week**. The compounded cost of that manual labor — at even modest hourly rates — represents thousands of dollars per month in operational savings per client.

## Key Architectural Decisions (and What I’d Do Differently)

**What worked well:**

-   Tenant resolution by phone ID is bulletproof. Zero routing errors across thousands of messages.
-   The configuration dataclass pattern scales cleanly to N tenants without code changes.
-   Low temperature (0.3) for business bots reduces hallucination significantly compared to default.

**What I’d improve for v2:**

-   **Redis over in-memory context store.** The current dict-based store works for a single server but doesn’t survive restarts or horizontal scaling. Redis with TTL-based expiry is the production-grade solution.
-   **Async queue for downstream integrations.** Currently, CRM pushes happen synchronously in the webhook handler. A message queue (Redis + Celery, or SQS) would decouple these and improve reliability.
-   **Per-tenant rate limiting.** High-volume tenants shouldn’t be able to starve lower-volume ones. FastAPI’s `slowapi`middleware with per-tenant keys solves this cleanly.

## Final Thoughts

The multi-tenant pattern is not complicated — it’s a compound key plus a configuration registry plus disciplined separation of concerns. But it’s the difference between a proof-of-concept and a system you can actually sell to real businesses.

The real lesson from building this in production: **the AI part is the easy part.** Getting the routing right, the context isolation right, the escalation right, and the downstream integrations right — that’s where production AI systems live or die.

All six platforms I’ve built for clients have this same underlying principle: treat the business logic as configuration, not as code. When the configuration changes, the system adapts. When a new client onboards, you add a new entry to the registry. The AI engine doesn’t care.

*The author is the founder of Sigma Intelligence LLC, an AI automation company building custom AI systems for small and medium-sized businesses. Active deployments span the United States, Brazil, and the UAE.*
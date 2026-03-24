---
title: "Building a Production-Ready Multi-Agent Investment Committee with AgentField"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/building-a-production-ready-multi-agent-investment-committee-with-agentfield-68c0c70bf441?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-24"
tags:
  - "engineering"
  - "llm"
  - "open-source"
  - "web-development"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-24T23:01:48.914Z"
---

# Building a Production-Ready Multi-Agent Investment Committee with AgentField

#### A step-by-step tutorial for building Argus, an autonomous stock research system that uses a five-agent investment committee to generate parallel short-term and long-term financial analysis using AgentField.

![](https://cdn-images-1.medium.com/max/1000/1*vlw_JYmnrOWlE53ygu1VkQ.png)

#### TL;DR

-   This tutorial walks through building [**Argus**](https://github.com/Arindam200/awesome-ai-apps/tree/main/advance_ai_agents/agentfield_finance_research_agent), a multi-agent system that performs **automated stock research**.
-   Using [**AgentField**](https://dub.sh/agentf), agents run as modular microservices with **typed skills and reasoners**.
-   The architecture enables **parallel analysis, structured workflows, and full observability** for production-ready AI systems.

### Introduction

Many early Agentic applications start with high-level orchestrators like LangChain or CrewAI. For simple use cases, these frameworks work well and are often the fastest way to prototype an idea.

However, as the complexity of the task grows, especially when moving from a notebook to a production service, this pattern begins to break down.

Traditional agent frameworks often focus on “agentic reasoning” but neglect the “production engineering.” In a real-world system, you can’t just have one model or orchestrator responsible for multiple stages of a workflow in a sequential, opaque loop. Failures are harder to trace because the entire workflow is coupled to a single orchestration logic. Evaluating or improving individual stages becomes difficult without a clear separation of concerns.

A more robust alternative is to structure the system as a set of specialized, independent components.

In this tutorial we will build [**Argus**](https://github.com/Arindam200/awesome-ai-apps/tree/main/advance_ai_agents/agentfield_finance_research_agent), an AI agent system that performs stock research using a coordinated set of specialized agents. Argus operates similarly to an investment committee: multiple agents analyze the same company from different perspectives and their outputs are combined into a structured research report.

Argus is built using [**AgentField**](https://dub.sh/agentf), an open-source backend framework designed for building and orchestrating AI agents as production services.

### Why Single-Prompt Systems Fail in Production

Many early AI applications rely on a single prompt that attempts to complete an entire task in one step. This pattern is simple to prototype but introduces several issues in production systems.

-   **High hallucination risk**: When a single prompt performs research, reasoning, and reporting at the same time, the model lacks reliable grounding.
-   **Limited observability**: If the entire workflow occurs inside one prompt, it becomes difficult to trace how results were produced.
-   **Poor separation of responsibilities**: Research, analysis, and synthesis happen in the same step. This makes systems difficult to maintain or extend.
-   **Difficult debugging**: Failures cannot easily be isolated to a specific stage of the workflow. For production AI systems, structured workflows provide a more stable foundation.

![Understanding autonomous agents workflow](https://cdn-images-1.medium.com/max/800/0*u14gUD07jTAbub6H.png)

### What is AgentField?

[AgentField](https://dub.sh/agentf) is the **Control Plane for AI Agents**. If other frameworks focus on “how an agent thinks,” AgentField focuses on how agents **run, scale, and communicate** in a production environment. Think of it as **Kubernetes for AI Agents**.

AgentField isn’t just an orchestration layer; it transforms your agents into production-ready microservices. It is built on three core pillars:

1.  **Agents**: The fundamental unit of deployment. Each Agent is an independent, versioned microservice with its own lifecycle, endpoints, and health monitoring.
2.  **Skills**: Deterministic tools (fetching APIs, database queries, file system access). Skills are strictly typed and can be exposed as standalone REST endpoints.
3.  **Reasoners**: The “brains” that use LLMs to process data. Reasoners use structured data contracts ([Pydantic](https://pydantic.dev/)) to ensure outputs are predictable and reliable.

When these concerns are separated, AgentField provides:

-   **Built-in Observability**: Every execution, skill call, and reasoning step is traced automatically.
-   **Async Concurrency**: Native support for asyncio allows agents to run in parallel without the complex state management of traditional frameworks.
-   **Production Hub**: A unified dashboard (the Control Plane) where you can monitor health, latency, and costs across multiple agent clusters.

We will now have a walkthrough on how Argus works and how one can set it up following this guide.

### The 5-Agent Architecture

Building a production AI system isn’t just about the “brain”, it’s about the **workflow**. Argus doesn’t rely on a single, long-running agent. Instead, it operates as a coordinated investment committee, where specialized agents handle specific stages of the research pipeline.

This multi-agent design allows for **true concurrency**: while the Analyst builds the bull case, the Contrarian simultaneously hunts for risks. This parallel execution minimizes latency and ensures that each perspective is developed independently, without bias from the other.

**Before we write any code, let’s look at the orchestration flow**:

![Argus’s 5-agent investment committee working in parallel](https://cdn-images-1.medium.com/max/800/0*G5zivGSRudy5_nMG.png)

**Key insight**: The Analyst and Contrarian run in parallel. Then both Editors run in parallel. This is true concurrency via asyncio.gather, not sequential execution.

> **The next step is to start building the our project. We have a** [**GitHub**](https://github.com/Arindam200/awesome-ai-apps/tree/main/advance_ai_agents/agentfield_finance_research_agent) **repository for the project, so to keep the code here concise, you can always refer to it for the complete implementation.**

### Project Organization

We will build Argus with a modular design. Every file has a specific responsibility. Create a directory named argus-agentfield and set up the following structure.

```
argus-agentfield/├── .env                 # API Keys (NEBIUS_API_KEY)├── requirements.txt     # Dependencies├── src/│   ├── __init__.py      # App initialization — shared Agent instance│   ├── schemas.py       # Data contracts (Pydantic models)│   ├── skills.py        # Deterministic data fetching (yfinance)│   ├── reasoners.py     # Agent logic, prompts, orchestration│   ├── stream.py        # SSE streaming pipeline + UI routes│   └── main.py          # Server entry point└── ui/    └── index.html       # Single-page vanilla JS frontend
```

#### Dependencies

Create requirements.txt:

```
agentfieldyfinancenebiuspython-dotenvpydantic>=2.0
```

Install them with [uv](https://docs.astral.sh/uv/) (fast Python package manager):

```
uv venv && uv pip install -r requirements.txt
```

### AgentField Control Plane

AgentField includes a local control plane that gives you a live dashboard to monitor your agents. Install the af CLI:

```
curl -sSf https://agentfield.ai/get | sh
```

You don’t need this to build or run Argus — the agent works fully standalone. But once you want to see workflow graphs, execution traces, and performance metrics, you can start the control plane with af server. We will set this up in Section 8. After a successful installation, you can confirm it with this command:

```
af --version
```

![](https://cdn-images-1.medium.com/max/800/0*UVoIc3LhQkq9gENH.png)

A terminal showing Agentfield CLI installation and version verification

#### Initialization

We start by creating a shared Agent instance. This object manages our LLM configuration and serves as a production hub. Every agent in AgentField is a standard microservice.

Create src/\_\_init\_\_.py:

```
"""Argus — Autonomous Research AgentExports the shared `app` Agent instance used across all modules.Authentication is handled automatically via environment variables:  NEBIUS_API_KEY       - used by AgentField/LiteLLM for all app.ai() calls  AGENTFIELD_SERVER    - control plane URL (default: http://localhost:8080)"""import osfrom agentfield import Agent, AIConfigfrom dotenv import load_dotenvload_dotenv()app = Agent(    node_id="argus-research-agent",    # LiteLLM requires the provider prefix: nebius/<model>    ai_config=AIConfig(model="nebius/openai/gpt-oss-120b"),    # Connect to the AgentField control plane for dashboard visibility    agentfield_server=os.getenv("AGENTFIELD_SERVER", "http://localhost:8080"),)
```

The agentfield\_server parameter tells the agent where to find the control plane. On startup, the agent registers itself, reporting its reasoners, skills, and health. If you are not running a control plane, the agent works fully standalone with no issues.

> **Note: You can use any other model API keys, such as GPT or Claude, instead of Nebius. We use Nebius because it provides access to a collection of several good open models in one place.**

#### Data Contracts (The Schemas)

Every interaction in AgentField is structured. We use [Pydantic](https://pydantic.dev/) models to define our data contracts. This prevents the “hallucination tax” where LLMs return unpredictable strings.

Create src/schemas.py:

```
"""schemas.py — Pydantic models for the Argus Investment Committee pipeline.Data flow (streaming - SSE pipeline in stream.py):  User Query    → ResearchPlan         (Manager)    → AnalystFinding       (Analyst) ─┬─ parallel    → RiskAssessment       (Contrarian)─┘    → ResearchReport × 2  (EditorShort ‖ EditorLong, parallel) → DualResearchReport"""from pydantic import BaseModel, Fieldfrom typing import Literalclass ResearchPlan(BaseModel):    """The Manager's decomposition of a user query into a research plan."""    reasoning_steps: list[str] = Field(        description="Step-by-step reasoning: how you interpreted the query, why you chose this ticker, key assumptions"    )    ticker: str = Field(description="Stock ticker symbol, e.g. AAPL")    company_name: str = Field(description="Full company name")    hypotheses: list[str] = Field(        description="2-4 key hypotheses to investigate (bull and bear)"    )    data_needs: list[str] = Field(        description="List of data points needed to validate the hypotheses"    )    focus_areas: list[str] = Field(        description="Specific areas for deep-dive: e.g. revenue growth, debt levels, competitive moat"    )# ─────────────────────────────────────────────────────────────────────────────# Additional schemas follow the same pattern. Full implementations in repo:# ─────────────────────────────────────────────────────────────────────────────
```

Notice how each schema includes reasoning\_steps. This is Chain-of-Thought prompting built into the data contract. The LLM must show its work before giving an answer.

Next thing to setup are the AgentField [Skills](https://www.agentfield.ai/api/python-sdk/overview#skills).

### Skills (The Facts)

Skills are deterministic functions. They provide the facts that agents use to make decisions. In AgentField, every Skill is automatically registered as a REST endpoint **and** can be called directly by [Reasoners](https://www.agentfield.ai/api/python-sdk/overview#reasoners).

![](https://cdn-images-1.medium.com/max/800/0*sZL6fGhK2hQ_LwAY.png)

Argus representation of Agentfields skills and how they run in parallel

We’ll use [yfinance](https://pypi.org/project/yfinance/) for all data and it’s free, needs no API key.

Create src/skills.py and start with the imports and a helper function:

```
"""skills.py — Deterministic data-fetching tools for the Argus agent.All skills use yfinance (free, no API key needed) to pull real financial datafrom Yahoo Finance. They are registered as @app.skill decorators so AgentFieldexposes them as REST endpoints AND the Reasoners can call them directly.Skills intentionally return plain JSON-serialisable dicts/lists so the LLMcan reason over them without needing to understand yfinance objects."""import asynciofrom typing import Optionalimport yfinance as yffrom src import appdef _df_to_records(df) -> dict:    """Convert a pandas DataFrame (yfinance financials) to a clean dict."""    if df is None or df.empty:        return {}    # Transpose so rows = metrics, cols = dates; convert to string keys    try:        df = df.fillna(0)        return {            str(col.date()): df[col].to_dict() for col in df.columns        }    except Exception:        return df.to_dict()
```

The \_df\_to\_records helper converts pandas DataFrames into clean dictionaries that the LLM can understand. Since yfinancereturns financial statements as DataFrames, we convert them into JSON-serializable dictionaries.

#### Skill 1: Ticker Validation

The first skill validates that a ticker actually exists and is actively trading. This prevents the agents from hallucinating analysis for fake companies:

```
@app.skill()async def validate_ticker(ticker: str) -> dict:    app.note(f"[skill] Validating ticker:{ticker}")def _fetch() -> dict:        t = yf.Ticker(ticker)        try:            info = t.info or {}        except Exception as exc:            return {                "valid": False,                "reason": f"yfinance raised an error:{exc}",                "current_price": None,                "quote_type": None,                "exchange": None,            }        if not info:            return {                "valid": False,                "reason": (                    f"No data returned for '{ticker}'. "                    "It may be delisted, never listed, private, or misspelled."                ),                "current_price": None,                "quote_type": None,                "exchange": None,            }        price = info.get("regularMarketPrice") or info.get("currentPrice")        quote_type = info.get("quoteType", "UNKNOWN")        exchange = info.get("exchange") or info.get("fullExchangeName", "")        if not price:            name = info.get("longName") or info.get("shortName") or ticker            return {                "valid": False,                "reason": (                    f"'{ticker}' ({name}) has no live market price. "                    "It is likely delisted, suspended, or no longer trading."                ),                "current_price": None,                "quote_type": quote_type,                "exchange": exchange,            }        return {            "valid": True,            "reason": "OK",            "current_price": price,            "quote_type": quote_type,            "exchange": exchange,        }    return await asyncio.get_event_loop().run_in_executor(None, _fetch)
```

#### Skills 2–8: Financial Data & Market Intelligence

The remaining skills follow the same pattern as validate\_ticker: wrap synchronous yfinance calls in run\_in\_executor for async compatibility.

Here’s one example:

```
@app.skill()async def get_income_statement(ticker: str, period: str = "annual") -> dict:    """Fetch income statement data (annual or quarterly)."""    app.note(f"[skill] Fetching income statement:{ticker} ({period})")def _fetch():        t = yf.Ticker(ticker)        df = t.income_stmt if period == "annual" else t.quarterly_income_stmt        return _df_to_records(df)    return await asyncio.get_event_loop().run_in_executor(None, _fetch)# ─────────────────────────────────────────────────────────────────────────────# The remaining skills follow the same pattern. Full implementations in repo:
```

**Why** **run\_in\_executor?** yfinance is synchronous and makes blocking HTTP calls. Wrapping it in run\_in\_executor lets us run multiple fetches concurrently without blocking the event loop. Now that we are clear on what AgentField Skills does, we will move on to Reasoners.

### Reasoners (The Brains)

A [Reasoner](https://www.agentfield.ai/api/python-sdk/overview#reasoners) is where the agency happens. This is the heart of Argus, the 5-agent investment committee that orchestrates research. This is the reasoning process which the agents use to arrive at their respective decisions. To add that to our agent orchestration engine:

Create src/reasoners.py. Start with imports and a helper function:

```
"""reasoners.py — The five-agent Investment Committee for Argus.Agent roles:  1. plan_research      → The Manager      (Adaptive Supervisor)  2. conduct_research   → The Analyst      (Bull Case) ─┬─ parallel  3. assess_risks       → The Contrarian   (Bear Case) ─┘  4. editor_short       → Short-Term View  (1–6 month horizon) ─┬─ parallel  5. editor_long        → Long-Term View   (1–5 year horizon)  ─┘"""import asyncioimport jsonfrom src import appfrom src.schemas import (    AnalystFinding,    DualResearchReport,    ResearchPlan,    ResearchReport,    RiskAssessment,)from src.skills import (    get_analyst_targets,    get_balance_sheet,    get_cash_flow_statement,    get_company_facts,    get_income_statement,    get_insider_transactions,    search_market_news,    validate_ticker,)# ---------------------------------------------------------------------------# Helper# ---------------------------------------------------------------------------def _json(obj) -> str:    """Compact JSON serialisation for passing data into app.ai() prompts."""    if hasattr(obj, "model_dump"):        return json.dumps(obj.model_dump(), default=str, indent=2)    return json.dumps(obj, default=str, indent=2)
```

The \_json helper serialises Pydantic models to JSON strings for injection into prompts. This is how agents share structured data.

#### Reasoners 1–3: Editor, Contrarian, Analyst

These three reasoners follow the same pattern: receive structured input, call app.ai() with a system prompt and schema, return a typed Pydantic model. Here are their signatures:

```
@app.reasoner(path="/research/editor", tags=["committee"])async def synthesize_report(    analyst_finding: AnalystFinding,    risk_assessment: RiskAssessment,) -> ResearchReport:    """    The Editor: synthesizes bull + bear cases into a balanced report.    In streaming mode (stream.py), replaced by EditorShort + EditorLong.    """    # Calls app.ai() with system prompt for balanced synthesis    # Returns ResearchReport with verdict and confidence    ...@app.reasoner(path="/research/contrarian", tags=["committee"])async def assess_risks(    plan: ResearchPlan,    analyst_finding: AnalystFinding,) -> RiskAssessment:    """    The Contrarian: Devil's advocate searching for risks.    Filters news for risk keywords, challenges the bull thesis.    """    # Fetches risk-focused news, filters for negative sentiment    # Calls app.ai() to identify regulatory, competitive, valuation risks    ...@app.reasoner(path="/research/analyst", tags=["committee"])async def conduct_research(plan: ResearchPlan) -> AnalystFinding:    """    The Analyst: builds the bull case from financial data.    Runs 9 data fetches in parallel via asyncio.gather.    """    # asyncio.gather: income, balance, cashflow, facts, news, targets, insiders    # Calls app.ai() to synthesize bull case thesis    ...
```

#### Reasoner 4: The Manager

The Manager is the entry point and orchestrator. It creates the research plan, validates the ticker, dispatches agents, and includes an adaptive retry loop for quality control:

```
@app.reasoner(path="/research", tags=["committee"])async def plan_research(query: str) -> DualResearchReport:    """    The Manager: entry point for direct API queries (POST /research).    Decomposes the query into a ResearchPlan, dispatches Analyst and Contrarian    in parallel, then runs EditorShort and EditorLong in parallel to produce    a DualResearchReport.    """    # Step 1: Decompose the query into a structured ResearchPlan    plan = await create_plan(query)# Validate ticker before running the full committee    ticker_check = await validate_ticker(plan.ticker)    if not ticker_check.get("valid"):        raise ValueError(f"Cannot analyse {plan.ticker}: {ticker_check.get('reason')}")    # Step 2: Parallel dispatch → Analyst (bull) + Contrarian (bear)    analyst_finding, risk_assessment = await asyncio.gather(        conduct_research(plan),        assess_risks(plan)    )    # Step 3: Run dual editors in parallel    short_report, long_report = await asyncio.gather(        editor_short_term(plan, analyst_finding, risk_assessment),        editor_long_term(plan, analyst_finding, risk_assessment),    )    return DualResearchReport(short_term=short_report, long_term=long_report)
```

**Key patterns to notice:**

1.  **Hybrid Model Strategy**: The main analytic agents (Manager, Analyst, Contrarian) use gpt-oss-120b for deep reasoning, while the Editors use gpt-oss-20b for faster final synthesis.
2.  **Parallel execution with** **asyncio.gather**: The Analyst and Contrarian run simultaneously, as do both Editors. This significantly reduces total latency.
3.  **Decoupled Agency**: Each agent focuses on a specific task (bull or bear) without waiting for the other, allowing the Editor to perform a truly independent synthesis.
4.  **Structured Tracking**: Every call to an @app.reasoner decorated function is automatically visible in the AgentField dashboard.

### Streaming Pipeline (The Realtime UX)

In a production AI application, the user experience is defined by responsiveness. A research committee can take 30–60 seconds to complete; forcing a user to stare at a static loading bar is a missed opportunity for engagement.

AgentField allows you to build **live, stateful interfaces** by transforming your orchestration logic into an asynchronous streaming pipeline. In this section, we’ll implement a Server-Sent Events (SSE) system that lets the user follow the research process in real-time as it unfolds.

Instead of just returning a final report, we will build a pipeline that “narrates” its work. Create src/stream.py and start with the core dependencies:

```
"""stream.py — Server-Sent Events (SSE) streaming for the Argus UI.Adds raw FastAPI routes to the AgentField app:  GET  /          → serves the single-page frontend  POST /research/stream/start       → starts a session, returns session_id  GET  /research/stream/events/{id} → streams SSE eventsEvent types:  agent_start    - an agent has started working  agent_note     - a progress log from inside an agent  agent_complete - an agent has finished, with its structured output  error          - something went wrong  complete       - both ResearchReports (short + long term) are readyAgent identifiers used in events:  manager, analyst, contrarian, editor_short, editor_long"""import asyncioimport jsonimport uuidfrom contextlib import asynccontextmanagerfrom contextvars import ContextVarfrom pathlib import Pathfrom typing import AsyncGeneratorfrom fastapi import Requestfrom fastapi.responses import HTMLResponse, StreamingResponsefrom pydantic import BaseModelfrom src import appfrom src.schemas import (    AnalystFinding,    ResearchPlan,    ResearchReport,    RiskAssessment,)from src.skills import (    get_analyst_targets,    get_balance_sheet,    get_cash_flow_statement,    get_company_facts,    get_income_statement,    get_insider_transactions,    search_market_news,    validate_ticker,)
```

### How the Event-Driven Pipeline Works

In a production environment, users shouldn’t wait 30 seconds for a final JSON blob. Argus uses **Server-Sent Events (SSE)** to provide a live, play-by-play view of the investment committee at work.

Instead of writing a complex state machine, we use a simple **Event Bus** pattern:

1.  **Session Management**: Every time a user starts a search, we create a unique session\_id and a dedicated asyncio.Queue.
2.  **The** **emit() Function**: We place emit() calls throughout our agent logic. This function pushes small JSON payloads (events) into the session's queue.
3.  **The SSE Stream**: A background task (the “Generator”) watches the queue. As soon as an event appears, it formats it for SSE and sends it to the frontend.

#### The Event Lifecycle

Each agent in the pipeline follows a predictable three-stage lifecycle that lights up the UI:

-   **agent\_start**: Signals that a specific agent (e.g., The Analyst) has been dispatched.
-   **agent\_note**: Sends real-time progress logs (e.g., "Fetching balance sheet for AAPL..."). This transforms a "loading spinner" into an interactive experience.
-   **agent\_complete**: Delivers the final structured data for that specific agent.

#### Orchestration via Concurrency

The streaming pipeline is just a wrapper around the same logic used in reasoners.py, but it leverages Python's asyncio.gather to drive the UI:

-   **Parallel Research**: The Analyst and Contrarian are triggered simultaneously. On the frontend, you see both “cards” start pulsing at the same time.
-   **Decoupled Synthesis**: As soon as the research agents finish, the two Editors start in parallel.
-   **Final Handshake**: Once all agents are done, a complete event is emitted with the full DualResearchReport.

> **Full implementation of the streaming logic can be found in the** [**GitHub Repository**](https://github.com/Studio1HQ/argus-agentfield/blob/main/src/stream.py)**.**

This approach ensures the backend remains the “source of truth” while the frontend stays reactive and responsive.

#### Setting up FastAPI Routes

Finally, we setup the endpoints that will expose the streaming pipeline for the UI to use:

```
# ---------------------------------------------------------------------------# Raw FastAPI routes added directly to the Agent (which is a FastAPI subclass)# ---------------------------------------------------------------------------class StreamQuery(BaseModel):    query: str@app.post("/research/stream/start")async def start_stream(body: StreamQuery):    """Start a streaming research session. Returns a session_id."""    session_id = str(uuid.uuid4())    _sessions[session_id] = asyncio.Queue()    # Run pipeline in background, bound to this session's queue    token = _current_queue.set(_sessions[session_id])    async def run():        try:            _current_queue.set(_sessions.get(session_id))            await _run_pipeline(body.query)        except Exception as e:            q = _sessions.get(session_id)            if q:                await q.put({"type": "error", "agent": "system", "data": {"message": str(e)}})    asyncio.create_task(run())    _current_queue.reset(token)    return {"session_id": session_id}@app.get("/research/stream/events/{session_id}")async def stream_events(session_id: str):    """SSE endpoint - streams events for a given session."""    return StreamingResponse(        _event_generator(session_id),        media_type="text/event-stream",        headers={            "Cache-Control": "no-cache",            "X-Accel-Buffering": "no",            "Connection": "keep-alive",        },    )@app.get("/", response_class=HTMLResponse)async def serve_ui():    """Serve the Argus UI."""    ui_path = Path(__file__).parent.parent / "ui" / "index.html"    return HTMLResponse(content=ui_path.read_text())
```

The frontend workflow:

1.  POST to /research/stream/start → get a session\_id
2.  Open EventSource to /research/stream/events/{session\_id}
3.  Receive SSE events as JSON until complete or error

![](https://cdn-images-1.medium.com/max/800/0*qphb6Ico1VA4kthq.png)

SSE events streaming from the backend to the frontend

#### Setting up the Frontend

The UI is a single-file vanilla JavaScript application (~1400 lines). It connects to the SSE endpoint and animates agent cards as events arrive. Rather than embed the entire file here, get it directly from the repository: [ui/index.html](https://github.com/Arindam200/awesome-ai-apps/blob/main/advance_ai_agents/agentfield_finance_research_agent/ui/index.html)

**Key features of the UI:**

-   **Agent cards** — Each of the 5 agents gets a card that glows when active
-   **Live reasoning** — A “thought drawer” types out each agent’s chain-of-thought in real time
-   **Tabbed results** — Short-term and long-term verdicts appear in separate tabs
-   **SSE connection** — Uses EventSource to stream events from /research/stream/events/{id}
-   **Dark theme** — Built with CSS custom properties for easy theming

The UI listens for these SSE event types:

-   agent\_start — Card starts glowing
-   agent\_note — Progress update (logs to thought drawer)
-   agent\_complete — Card turns green, reasoning steps revealed
-   error — Something went wrong
-   complete — Both reports ready, render the tabbed result

![](https://cdn-images-1.medium.com/max/800/0*PJlpoCUm3RArV3L0.png)

True parallel execution — Analyst and Contrarian running simultaneously

### Running Argus and Testing

Now that we’ve built the research engine and the streaming UI, it’s time to put everything together.

In this section, we’ll configure our environment, launch the AgentField dashboard, and start the Argus server so you can see your 5-agent committee in action.

#### 1\. Set your keys

Create a .env file:

```
NEBIUS_API_KEY=your_key_hereAGENTFIELD_SERVER=http://localhost:8080PORT=8081
```

#### 2\. Start the AgentField Control Plane

If you installed the af CLI in Section 1, start the control plane in its own terminal:

```
af server
```

This starts the dashboard at http://localhost:8080/ui. Keep this terminal running - the agent will register with it on startup.

![](https://cdn-images-1.medium.com/max/800/0*TBEssncEj8BbNnTr.png)

AgentField control-plane dashboard showing agents offline, 100% success rate across 22 executions, and workflow performance charts.

#### 3\. Boot the agent

In a **new terminal**, create src/main.py:

```
"""main.py — Entry point for the Argus autonomous research agent.Usage:    uv run python3 src/main.pyThe agent will start on http://localhost:8081 (separate from the AgentFieldcontrol plane on :8080) and expose:    POST /research          → Full investment committee pipeline (Manager entry point)    POST /research/analyst  → Analyst (bull case) only    POST /research/contrarian → Contrarian (bear case) only    POST /research/editor   → Editor (synthesis) only    + all /skills/* endpointsExample query:    curl -X POST http://localhost:8081/research\         -H "Content-Type: application/json"\         -d '{"query": "Should I invest in AAPL?"}'"""import osimport sys# Ensure the project root is on sys.path so `src` is importable# when running as: python3 src/main.pysys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))from dotenv import load_dotenv# Load .env before importing anything that reads env varsload_dotenv()# Import and boot the shared Agent instancefrom src import app  # noqa: E402# Register skills + reasoners by importing their modules.# The @app.skill / @app.reasoner decorators fire on import.import src.skills    # noqa: F401, E402import src.reasoners # noqa: F401, E402import src.stream    # noqa: F401, E402 - SSE endpoints + UI servingif __name__ == "__main__":    port = int(os.environ.get("PORT", 8081))    print(f"🔬 Argus Research Agent starting on http://localhost:{port}")    print(f"🎛️  AgentField Control Plane dashboard: http://localhost:8080/ui")    print("📈 5-Agent Investment Committee:")    print(f"   POST http://localhost:{port}/research               ← Full pipeline (all 5 agents)")    print(f"   POST http://localhost:{port}/research/analyst       ← Bull case only")    print(f"   POST http://localhost:{port}/research/contrarian    ← Bear case only")    print(f"   POST http://localhost:{port}/research/stream/start  ← SSE streaming (used by UI)")    print(f"   GET  http://localhost:{port}/                       ← Live UI")    print()    app.serve(port=port)
```

Run it:

```
uv run python3 src/main.py
```

You’ll see the agent register with the control plane:

![](https://cdn-images-1.medium.com/max/800/0*VxWUxdIRXs5YB5RK.png)

Argus server starting up with all registered endpoints

You can also verify this in the Agentfield dashboard. You should see your agents registered with all the reasoners and skills as shown below:

![](https://cdn-images-1.medium.com/max/800/0*-FXd4I8gJEWxEtLZ.png)

AgentField control-plane dashboard showing the **argus-research-agent** node status and a list of registered reasoners and skills.

#### 4\. Test the API directly

You can test the full pipeline without the UI:

```
curl -X POST http://localhost:8081/research \     -H "Content-Type: application/json" \     -d '{"query": "Should I invest in NVDA?"}'
```

Or test individual agents:

```
# Test the Analyst alone (requires a ResearchPlan as input)curl -X POST http://localhost:8081/research/analyst \     -H "Content-Type: application/json" \     -d '{       "plan": {         "reasoning_steps": ["User wants to invest in Apple"],         "ticker": "AAPL",         "company_name": "Apple Inc",         "hypotheses": ["Strong iPhone sales", "Services growth"],         "data_needs": ["Revenue", "Margins"],         "focus_areas": ["iPhone", "Services", "Wearables"]       }     }'
```

#### 5\. Test from the UI

Navigate to http://localhost:8081 in your browser. Type a query like “Should I invest in NVDA?” and watch the 5-agent committee work in real-time.

![](https://cdn-images-1.medium.com/max/800/0*KDGyDdcRJ_Dc0ka_.png)

Completed research report with dual time horizon verdicts

#### 6\. View the Workflow in the AgentField Dashboard

While the agents are running (or after they complete), open the AgentField control plane dashboard at [http://localhost:8080/ui.](http://localhost:8080/ui.)

Navigate to **Workflow Executions** to see the full execution graph:

![](https://cdn-images-1.medium.com/max/800/0*ZyVhkBrcXX_I46gA.png)

AgentField dashboard showing a workflow execution graph with multiple connected nodes (skills and reasoners) and a “Succeeded” status indicator.

Every @app.reasoner() and @app.skill() call appears as a node in the workflow graph. You can trace the exact flow: Manager → Analyst → Contrarian → EditorShort / EditorLong. Each node shows execution time, input data, and output data. Skills called within reasoners (like get\_income\_statement, get\_insider\_transactions) appear as child nodes.

This is the observability layer that makes Argus production-ready. Instead of guessing what your agents did, you can trace every step, inspect every input and output, and measure performance, all without writing a single line of instrumentation code.

### Why AgentField is different

[AgentField](https://dub.sh/agentf) is built for the move from “prototypes” to “production”:

1.  **Agents as Microservices**: Every agent becomes a standard REST API with OpenAPI documentation.
2.  **Cryptographic Identity**: Every action is signed and verified. This is the only way to build trustworthy autonomous systems.
3.  **The Agent Internet**: AgentField prepares you for a web where agents negotiate and execute intent on your behalf.

### Conclusion

Building with AgentField means agentic development has moved from “intent” to “execution.” It is no longer just about writing a prompt. It is about building a secure, scalable, and auditable system.

You can expand Argus by adding more specialized agents such as an ESG analyst, legal risk assessor, or macro forecaster. Because every component is a modular Skill or Reasoner, the system can grow without breaking.

The architecture we built here includes typed schemas, parallel execution, SSE streaming, and agents as microservices. This is the same pattern used in production AI systems. The difference between a weekend project and a production system comes down to structure, type safety, and observability from day one.

#### Resources

-   Check [AgentField Docs](https://dub.sh/agentf)
-   Check [Project Repo](https://github.com/Arindam200/awesome-ai-apps/tree/main/advance_ai_agents/agentfield_finance_research_agent)
-   Check [Autonomous software engineering fleet of 400+ AI agents for production-grade PRs](https://github.com/Agent-Field/SWE-AF)

Thankyou for reading! If you found this article useful, share it with your peers and community.

> ***If You ❤️ My Content! Connect with Me on*** [***X***](https://x.com/Astrodevil_)

* * *

[Building a Production-Ready Multi-Agent Investment Committee with AgentField](https://levelup.gitconnected.com/building-a-production-ready-multi-agent-investment-committee-with-agentfield-68c0c70bf441) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.
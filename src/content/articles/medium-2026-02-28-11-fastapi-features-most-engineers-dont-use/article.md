---
title: "11 FastAPI Features Most Engineers Don’t Use"
author: "Python in Plain English"
platform: "medium"
publicationName: "Python in Plain English"
url: "https://python.plainenglish.io/11-fastapi-features-most-engineers-dont-use-56d940fb98d8?source=rss----78073def27b8---4"
publishedAt: "2026-02-28"
tags:
  - "ai-general"
  - "data-science"
  - "education"
  - "engineering"
  - "python"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.570Z"
---

# 11 FastAPI Features Most Engineers Don’t Use

# 11 FastAPI Features Most Engineers Don’t Use

## Yet they’re game changers for deployment.

[Muhammad Talha Tahir](https://medium.com/@Muhammad_Talha_Tahir?source=post_page---byline--56d940fb98d8---------------------------------------)

3 min read·1 day ago

\--

![]()

I’m willing to bet you’ve been shipping FastAPI apps for a while — maybe even bragging about those sweet auto-generated docs like they’re a personality trait.
But here’s the thing I’ve learned after 4+ years of building and scaling Python backends: **most engineers use only 20% of FastAPI’s power**.

The *other* 80%?
Hidden features. Overlooked tricks. Tools that make you look like you’ve unlocked DLC for Python.

Today, you’re getting the rarest ones — the ones even senior engineers often skip.

Let’s get into it.

## 1\. `BackgroundTasks` — The Hidden Async Workhorse Nobody Uses

Most engineers fire up Celery or RQ even for tiny async tasks.

FastAPI has it built-in.

```
from fastapi import FastAPI, BackgroundTasksapp = FastAPI()def write_log(message: str):    with open("logs.txt", "a") as f:        f.write(message + "\n")@app.post("/create-user")def create_user(username: str, background: BackgroundTasks):    background.add_task(write_log, f"User created: {username}")    return {"status": "success"}
```

No Celery.
No workers.
No Redis.
Just clean, fast, fire-and-forget execution.

Pro tip: This is perfect for non-critical tasks like analytics logging, sending email receipts, or cleanup jobs.

## 2\. `Depends` for Class-Based Dependencies — Not Just Functions

Everyone knows `Depends`.
Almost NOBODY uses it with classes.

This lets you create stateful, reusable, testable logic.

```
from fastapi import Dependsclass RateLimiter:    def __init__(self):        self.limit = 100    def __call__(self):        # pretend to check Redis or memory cache        print("Rate limit validated")@app.get("/api", dependencies=[Depends(RateLimiter())])def index():    return {"msg": "Hello world"}
```

This is criminally underused.
I’ve replaced entire middleware stacks with class-based dependencies.

## 3\. Pydantic’s `Field` Validators in FastAPI Models

Pydantic validation is *ridiculously* powerful.
Most engineers barely scratch the surface.

```
from pydantic import BaseModel, Field, validatorclass User(BaseModel):    username: str = Field(..., min_length=3, max_length=20)    password: str    @validator("password")    def strong_password(cls, v):        if len(v) < 8:            raise ValueError("Weak password")        return v
```

You can validate emails, strip whitespace, enforce formats — and push most validation failures to the model layer.

Less spaghetti code → happier future you.

## 4\. `response_model_exclude_unset` — Clean Responses Without Post-Processing

FastAPI lets you control response shape *without rewriting schemas*.

```
from pydantic import BaseModel, Field, validatorclass User(BaseModel):    username: str = Field(..., min_length=3, max_length=20)    password: str    @validator("password")    def strong_password(cls, v):        if len(v) < 8:            raise ValueError("Weak password")        return v
```

Why this matters:
It keeps API responses clean *even if models have optional fields*.

## 5\. Using `APIRouter` the RIGHT Way (Most People Do It Wrong)

`APIRouter` isn’t just for splitting files.
It allows versioning, tagging, dependency injection, and prefixing—all in one place.

```
from fastapi import APIRouterrouter = APIRouter(    prefix="/v1/users",    tags=["users"],    dependencies=[Depends(RateLimiter())])@router.get("/")def get_users():    return ["alice", "bob"]app.include_router(router)
```

I’ve seen teams copy-paste this logic across routes.
Don’t be that team.

## 6\. Built-In Caching Using `functools.lru_cache`

Want a micro-cache?
FastAPI works perfectly with Python’s built-in memoization.

```
from functools import lru_cacheclass Config:    @lru_cache    def get_settings():        return {"db": "postgres://localhost"}@app.get("/config")def config(settings = Depends(Config.get_settings)):    return settings
```

Think of this as free performance for constant or slow-loading data.

## 7\. Using FastAPI’s Event Hooks for Resource Lifecycle Management

Most engineers never touch `@app.on_event`.

## Get Muhammad Talha Tahir’s stories in your inbox

 from this writer.

Remember me for faster sign in

Huge mistake.

```
@app.on_event("startup")async def startup_event():    print("Connecting to DB…")@app.on_event("shutdown")async def shutdown_event():    print("Disconnecting from DB…")
```

Use this for:

-   database pool initialization
-   loading ML models
-   warming caches
-   starting background schedulers

It dramatically improves cold-start times.

## 8\. Custom Exception Handlers — Because Error Pages Shouldn’t Be Ugly

FastAPI lets you fully customize errors.

```
from fastapi.responses import JSONResponse@app.exception_handler(ValueError)async def value_error_handler(_, exc):    return JSONResponse(        status_code=400,        content={"error": str(exc)}    )
```

This is how you build **consistent, enterprise-level API error contracts** without scattering try/except everywhere.

## 9\. Streaming Responses (Almost Nobody Uses These)

If you’re sending big files, don’t `return file.read()`.

Stream it.

```
from fastapi.responses import StreamingResponsedef generate_numbers():    for i in range(1, 1000000):        yield f"{i}\n"@app.get("/stream")def stream_numbers():    return StreamingResponse(generate_numbers(), media_type="text/plain")
```

This reduces memory usage dramatically.

## 10\. WebSockets — The Feature That Sits in FastAPI Collecting Dust

FastAPI’s built-in WebSocket support is *ridiculously* smooth.

```
from fastapi import WebSocket@app.websocket("/ws")async def websocket_endpoint(ws: WebSocket):    await ws.accept()    while True:        msg = await ws.receive_text()        await ws.send_text(f"You said: {msg}")
```

Perfect for:

-   real-time dashboards
-   notifications
-   multiplayer game logic
-   chat systems

And you don’t need Socket.io-style overhead.

*Every ending is just a new beginning. Thanks for reading.*
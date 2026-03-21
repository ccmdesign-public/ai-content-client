---
title: "How I Built a Custom IPC Protocol Inside Node.js Worker Threads"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/how-i-built-a-custom-ipc-protocol-inside-node-js-worker-threads-4db648f21ee8?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-19"
tags:
  - "engineering"
  - "nodejs"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-21T16:30:37.350Z"
---

# How I Built a Custom IPC Protocol Inside Node.js Worker Threads

> Three days, two scrapped implementations, one embarrassing bug. Here’s what actually happened.

![](https://cdn-images-1.medium.com/max/1024/1*2LZVyfL3iGjT6GOrVXUXzA.jpeg)

I’m six weeks into building [Duraflow](https://github.com/Harsh-Vaghela-404/duraflow) - an open-source workflow engine where developers write durable AI agent workflows . The pitch is simple: your workflow code looks completely normal, but if it crashes halfway through, it resumes from the last completed step instead of starting over.

Developers use an SDK. They write something like this:

```
const flight = await step.run("book-flight", async () => {  return await bookingAPI.book(params);});const hotel = await step.run("book-hotel", async () => {  return await hotelAPI.book(params);});
```

If the process dies after the flight step, it comes back, sees that book-flight already ran, skips it, and picks up at book-hotel. That's the whole thing. The SDK handles all of it transparently.

Anyway. Six weeks in, I noticed my server response times were getting weird. Not consistently bad - just randomly spiking during workflow execution. A health check that should return in 2ms was sometimes taking 300ms. API calls were timing out intermittently. It was the kind of thing that looks like a network problem until you actually dig in and realize it’s not.

The culprit was obvious once I thought about it. AI agent workflows are CPU-heavy. Evaluating conditions, processing LLM responses, building decision trees - none of that is waiting on I/O. It’s just computation. And computation on the main thread blocks Node.js’s event loop, which means everything else - health checks, incoming requests, database queries -queues up behind it.

The fix seemed straightforward: move workflow execution into worker threads. Keep the main thread free for I/O, let the workers do the heavy lifting.

That’s when things got complicated.

### The problem with worker threads

Node.js worker threads are completely isolated. They get their own heap, their own event loop, their own copy of the module graph. The only way to share data between a worker and the main thread is through message passing - you serialize something, send it over a MessagePort, and deserialize it on the other side.

This design exists for good reasons. Shared memory between threads is a nightmare - race conditions, data corruption, locks. Node.js just avoids the whole mess.

The issue for me: my step memoization logic needs to hit PostgreSQL on every single step. Before running book-flight, it queries the database: ***has this step already completed for this task?*** If yes, return the cached output. If no, run the function and save the result. That's what makes workflows resumable.

That query runs inside the workflow function. The workflow function now runs inside a worker thread. But my PostgreSQL connection pool lives on the main thread, because that’s where I initialized it.

Workers can’t access it.

**My first attempt: give each worker its own connection pool**. Seemed reasonable. new Pool({ connectionString }) inside the worker file, done.

It actually worked fine at first. Then I started running concurrent workflows and everything fell apart. **Four workers each holding ten connections meant 40 open connections to Postgres**. Under any kind of load, I was hitting connection limits. Worse, coordinating state across four independent pools was a mess - I had to be extremely careful about which pool was responsible for what, and the moment a step touched shared task state from two different workers, things got inconsistent.

**I scrapped that after a day and a half**.

### What I actually needed

I spent some time just thinking about what a worker thread actually needs from the database. It’s not raw query access. It needs answers to a pretty small set of questions:

-   **Did this step already run?**
-   **Save this step’s output.**
-   **Mark this step as failed.**
-   **Register a compensation function for this step.**

That’s it. Four operations. The main thread, which already owns the database pool, can handle all four. The worker just needs a way to ask.

So I built a request-response protocol over MessageChannel. Each worker gets a MessagePort when it starts up. When it needs database state, it sends a message to the main thread. The main thread does the query and sends the result back. The worker waits for the response and continues.

![](https://cdn-images-1.medium.com/max/1024/1*F7FijXSnqcXiNbAEGMn4NA.jpeg)

Conceptually it’s the same as a syscall - user space can’t touch kernel resources directly, so it asks the kernel to do it. Same idea here, just inside a Node.js process.

### The protocol

Every message has two shapes - one for requests, one for responses:

```
interface IPCRequest {  id: string;                      // randomUUID, unique per request  type: IPCMessageType;  payload: Record<string, unknown>;}interface IPCResponse {  id: string;                      // matches the request id  success: boolean;  data?: unknown;  error?: { message: string; name: string };}
```

The id field is the key. Workers can have multiple requests in-flight simultaneously - step A fires off a STEP\_FIND request, then step B starts before the response comes back and fires a STEP\_CREATE\_OR\_FIND. Without matching IDs you have no idea which response belongs to which request.

Responses don’t use type suffixes. Instead they use a success boolean - if success is false, the error field tells you why. Simple, and it means the response handler doesn't need a big switch statement.

Request types:

```
type IPCMessageType =  | 'STEP_FIND'           // has this step already completed?  | 'STEP_CREATE_OR_FIND' // get existing step or create a new one  | 'STEP_COMPLETE'       // save output + optional compensation key  | 'STEP_FAIL'           // mark step as failed  | 'STEP_INCREMENT'      // increment retry count
```

One thing I was strict about: the main thread never sends messages unprompted. It only responds. Workers ask, main thread answers. Keeping it unidirectional meant I didn’t have to think about the main thread and a worker accidentally waiting on each other.

### Making it invisible to the workflow author

The step SDK - the thing developers actually use - needs to hide all of this completely. Nobody writing a workflow should have to think about IPC.

From outside, step.run just looks like an async function. Inside, it's doing a round trip to the main thread and back for every step check. The way I made that work was wrapping the message send in a Promise and storing the callbacks in a Map keyed by id.

I also added a 30 second timeout on every request. Without it, a hung main thread means worker Promises wait forever with nothing surfacing in logs. The timeout.unref() call is important too - it tells Node not to keep the process alive just because a timeout is pending.

```
const TIMEOUT_MS = 30_000;class WorkerStepClient {  private port: MessagePort;  private pending = new Map<string, {    resolve: (value: unknown) => void;    reject: (error: Error) => void;  }>();  constructor(port: MessagePort) {    this.port = port;    this.port.on('message', (msg: IPCResponse) => {      const handler = this.pending.get(msg.id);      if (!handler) return; // response arrived after we gave up waiting      this.pending.delete(msg.id);      if (!msg.success) {        handler.reject(new Error(msg.error?.message ?? 'IPC request failed'));      } else {        handler.resolve(msg.data);      }    });  }  send<T>(type: IPCMessageType, payload: Record<string, unknown>): Promise<T> {    const id = randomUUID();    return new Promise((resolve, reject) => {      const timeout = setTimeout(() => {        this.pending.delete(id);        reject(new Error(`IPC ${type} timed out after ${TIMEOUT_MS}ms`));      }, TIMEOUT_MS);      timeout.unref(); // don't hold the process open just for this      this.pending.set(id, {        resolve: (val) => { clearTimeout(timeout); resolve(val as T); },        reject:  (err) => { clearTimeout(timeout); reject(err); },      });      this.port.postMessage({ id, type, payload });    });  }  async findStep(taskId: string, stepKey: string): Promise<StepRun | null> {    return this.send('STEP_FIND', { taskId, stepKey });  }  async completeStep(stepId: string, output: unknown, compensationFn: string | null): Promise<void> {    await this.send('STEP_COMPLETE', { stepId, output, compensationFn });  }  async failStep(stepId: string, error: string): Promise<void> {    await this.send('STEP_FAIL', { stepId, error });  }}
```

When a request goes out, its callbacks sit in pending. When the response comes in, the listener looks up the requestId, pulls the callbacks, and either resolves or rejects the Promise. From the caller's perspective it's just await.

### The main thread side

The handler on the main thread is simpler - listen for messages, run the query, send back the result:

```
class IPCHandler {  constructor(    private stepRepo: StepRepository,    private taskRepo: TaskRepository,  ) {}  registerWorker(port: MessagePort) {    port.on('message', async (req: IPCRequest) => {      try {        const data = await this.handle(req);        port.postMessage({ id: req.id, success: true, data });      } catch (err) {        // always send something back or the worker hangs forever        const error = err instanceof Error          ? { message: err.message, name: err.name }          : { message: String(err), name: 'Error' };        port.postMessage({ id: req.id, success: false, error });      }    });  }  private async handle(req: IPCRequest): Promise<unknown> {    switch (req.type) {      case 'STEP_FIND':        return this.stepRepo.findByTaskAndKey(          req.payload.taskId as string,          req.payload.stepKey as string        );      case 'STEP_CREATE_OR_FIND':        return this.stepRepo.createOrFind(          req.payload.taskId as string,          req.payload.stepKey as string,          req.payload.input        );      case 'STEP_COMPLETE':        return this.stepRepo.updateCompleted(          req.payload.stepId as string,          req.payload.output,          req.payload.compensationFn as string | null        );      case 'STEP_FAIL':        return this.stepRepo.updateFailed(          req.payload.stepId as string,          req.payload.error as string        );      case 'STEP_INCREMENT':        return this.stepRepo.incrementRetry(req.payload.stepId as string);      default:        throw new Error(`Unknown message type: ${req.type}`);    }  }}
```

The try/catch around everything is not optional. If the handler throws without sending a response, the worker's Promise just sits there. No error surfaces, no timeout fires, the workflow silently freezes. I found this out the hard way. More on that below.

### Wiring it into Piscina

I’m using Piscina for the thread pool. Each worker needs its MessagePort before it starts processing anything, which means setting it up at worker creation time via workerData.

MessageChannel gives you two connected ports. I create one per worker, register one on the main thread with the IPC handler, and pass the other to the worker. The important detail is transferList - MessagePort can't be serialized, it has to be transferred. If you leave it out you get a completely unhelpful error about structured cloning.

```
import Piscina from 'piscina';import { MessageChannel, Worker } from 'worker_threads';import os from 'os';class WorkflowWorkerPool {  private pool: Piscina;  constructor(private ipcHandler: IPCHandler) {    this.pool = new Piscina({      filename: './worker.js',      maxThreads: Math.max(2, os.cpus().length - 1), // leave one core for main thread      workerFactory: (workerOpts) => {        const { port1, port2 } = new MessageChannel();        this.ipcHandler.registerWorker(port1);        return new Worker(workerOpts.filename, {          ...workerOpts,          workerData: { ipcPort: port2 },          transferList: [port2], // must transfer, not copy        });      },    });  }  async runWorkflow(workflowName: string, taskId: string, input: unknown) {    return this.pool.run({ workflowName, taskId, input });  }}
```

After transfer, the main thread can’t use port2 anymore - the worker owns it. That's what you want.

Inside the worker file, it picks up the port from workerData and the whole thing becomes invisible:

```
// worker.tsimport { workerData } from 'worker_threads';import { WorkerStepClient } from './worker-step-client';import { compensationRegistry } from './compensation-registry';const client = new WorkerStepClient(workerData.ipcPort);export default async function runWorkflow({ workflowName, taskId, input }) {  const workflow = workflowRegistry.get(workflowName);  const step = {    run: async (stepKey: string, fn: () => Promise<unknown>, opts?: StepOptions) => {      // check if already done      const existing = await client.findStep(taskId, stepKey);      if (existing?.status === 'completed') {        return existing.output;      }      // get or create the step record      const stepRecord = await client.send('STEP_CREATE_OR_FIND', { taskId, stepKey });      // register compensation locally if provided      let compensationKey: string | undefined;      if (opts?.compensation) {        compensationKey = `${workflowName}:${stepKey}`;        compensationRegistry.register(compensationKey, opts.compensation);      }      try {        const output = await fn();        // compensation key is sent alongside the output in STEP_COMPLETE        await client.completeStep(stepRecord.id, output, compensationKey ?? null);        return output;      } catch (error) {        await client.failStep(stepRecord.id, (error as Error).message);        throw error;      }    }  };  return workflow(input, { step });}
```

### Bugs I hit, in order of how long they took to find

**The silent hang.** This was the worst one. My handler had a code path that threw an error without catching it - so it never sent a response. The worker’s Promise just… waited. Forever. No error in the logs, no stack trace, nothing. The workflow appeared to be running but nothing was happening. I spent the better part of two days adding logging everywhere before I finally noticed the handler was throwing before it reached the postMessage call. The fix is wrapping the entire handler in try/catch and always sending something back, even if it's just { type: 'ERROR' }. One hour to fix, two days to find.

**The transfer error.** I passed port2 in workerData but didn't add it to transferList. The error Node.js throws is something like "the object could not be cloned" with no mention of MessagePort anywhere. If you see that error and you're passing a MessagePort, transferList is your problem.

**Stale responses.** I wasn’t handling the case where a response arrived after the request had already been cleaned up. This threw a “cannot read property of undefined” that was confusing to trace because it came from inside the message listener. Adding if (!handler) return before accessing the callbacks fixed it immediately. Now stale responses just get dropped.

**Sending full rows when I only needed one field.** This one didn’t break anything, it just showed up in profiling. I was sending the entire step record back to workers - all the metadata, timestamps, everything. Workers only need the output field and the status. Under 50 concurrent workflows the serialization overhead was adding up. Trimming the payload down to what workers actually need cut IPC latency noticeably.

### Numbers

Ran this on my Lenpvo Intel i5 laptop , Postgres in Docker, everything local. These aren’t production numbers - take them as a rough before/after comparison, not a benchmark.

**Before (workflows on the main thread):**

```
Event loop lag during workflow execution: 150–400ms spikesOther requests during agent execution:    queued, degraded, or timed outEffective concurrency:                    1 (serial)
```

**After (worker threads + IPC):**

```
Test: 50 concurrent workflows, 4 worker threads, 3–4 steps eachEvent loop lag:       under 5ms throughout (measured with clinic.js)IPC round-trip:       2–8ms typical, ~12ms spikes under full loadDuplicate steps:      0DB connections used:  10 (shared pool on main thread)                      vs ~40 with the per-worker pool approach
```

The 12ms spike under load is real - when 50 workflows all need database state simultaneously, they queue up at the IPC handler. For my use case that’s fine since each step involves an external API call taking 200ms+. If you’re doing very fast in-memory operations and IPC latency matters, benchmark it for your specific workload.

The event loop number is the one I care about. Going from 400ms freezes to sub-5ms means health checks respond instantly, SDK calls stay fast, and the server stays predictable under load.

### When this is and isn’t the right approach

This pattern makes sense when you have all three of these:

You have CPU-heavy work that’s actually blocking the event loop. Run clinic.js bubbleprof to check - if you're not seeing real event loop lag, worker threads might not be your problem and adding them just adds complexity.

That work needs access to shared resources that live on the main thread - a database pool, in-memory state, a singleton. If your workers are doing pure computation with no shared state, you don’t need IPC at all.

You want the thread boundary to be invisible to callers. The Promise wrapping approach here keeps step.run looking like a normal async function. If you don't care about that abstraction, there are simpler options.

Where it doesn’t make sense: I/O-bound work (Node handles this natively), short CPU bursts under ~50ms (thread overhead isn’t worth it), or teams that haven’t dealt with concurrent bugs before (the failure modes here are harder to debug than typical Node.js issues).

### One last thing

You might have noticed STEP\_COMPLETE carries a compensationFn field alongside the output. That wasn't in the original design - I added it when I started building Sagas support. The idea: when you complete a step, you can optionally register a key pointing to an undo function stored locally in the worker's compensation registry. If the workflow fails later, the engine walks backwards through completed steps and calls each undo function in reverse order. No separate IPC message needed - it piggybacks on the completion call.

Writing that up next.

Full source is on GitHub if you want to dig into the actual implementation:

📦 [*Duraflow: Source Code*](https://github.com/Harsh-Vaghela-404/duraflow)

If you’re building something similar or just want to talk distributed systems, I’m on [LinkedIn](https://www.linkedin.com/in/harsh-vaghela-169059201/) - always happy to connect with engineers working on similar problems.

*Part of an ongoing series on building a production workflow engine from scratch*

* * *

[How I Built a Custom IPC Protocol Inside Node.js Worker Threads](https://levelup.gitconnected.com/how-i-built-a-custom-ipc-protocol-inside-node-js-worker-threads-4db648f21ee8) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.
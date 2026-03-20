---
title: "ZeroMQ on Android: Bridging a Linux Service with PUB SUB"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/zeromq-on-android-bridging-a-linux-service-with-pub-sub-43ecf52209fa?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-09"
tags:
  - "android"
  - "engineering"
  - "kotlin"
  - "web-development"
categories:
  - "Mobile Development"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-09T15:49:31.340Z"
---

# ZeroMQ on Android: Bridging a Linux Service with PUB SUB

# ZeroMQ on Android: Bridging a Linux Service with PUB SUB

[James Cullimore](https://jamescullimore.medium.com/?source=post_page---byline--43ecf52209fa---------------------------------------)

11 min read·Just now

\--

![]()

In a recent project, we had a deceptively simple requirement. We needed reliable, low latency communication between a small Linux based service and an Android application. There was no cloud component, no HTTP API, and no long lived backend infrastructure. Just two processes on the same machine that needed to talk to each other efficiently and continuously.

Traditional approaches like REST or gRPC felt unnecessarily heavy for the problem we were solving. We did not need request response semantics, and we did not want to pay the overhead of serialization formats, connection management, or retry logic that comes with them. What we really wanted was a lightweight messaging layer that could push data as it became available and allow the Android app to publish messages back when needed.

This is where ZeroMQ came into the picture.

ZeroMQ is not a message broker and it is not a framework. It is a low level messaging library that gives you building blocks like PUB SUB, PUSH PULL, and REQ REP, and lets you wire them together in a way that fits your system. It runs entirely in process, speaks over plain TCP, and works well across different platforms, including Linux and Android.

In this article, I want to walk through how we used ZeroMQ to connect a Linux service to an Android app using a simple PUB SUB setup. We will look at the actual client implementation we shipped, why it is structured the way it is, and what tradeoffs we encountered along the way.

## Architecture Overview and Messaging Model

Before writing any code, we spent time deciding how the Linux service and the Android app should communicate. Both processes would run on the same device and talk over localhost. There was no requirement for encryption, authentication, or message persistence. What mattered most was simplicity, predictability, and low latency.

ZeroMQ’s messaging patterns made this decision straightforward.

We chose a PUB SUB model for the primary data flow. The Linux service acts as the publisher, broadcasting messages whenever new data is available. The Android app acts as a subscriber, listening continuously and reacting to updates as they arrive. This works well for streaming state changes, sensor data, or status updates without polling.

At the same time, the Android app needed a way to send messages back to the Linux service. Rather than introducing a second protocol or a different transport, we used a second ZeroMQ socket in the opposite direction. From the Android side, this socket publishes messages that the Linux service subscribes to. While this is not a strict request response setup, it keeps the communication model symmetrical and easy to reason about.

From the Android app’s point of view, this results in two independent connections:

-   A SUB socket connected to the Linux service’s PUB port for incoming messages
-   A PUB socket connected to the Linux service’s SUB port for outgoing messages

Both sockets run over TCP on localhost, each bound to a dedicated port. This separation keeps message flow explicit and avoids coupling unrelated concerns into a single channel.

The rest of the implementation is about managing these sockets safely on Android. That means handling threading, lifecycle, connection state, and cleanup in a way that does not leak resources or block the main thread. The core idea, however, stays simple: connect, subscribe, receive messages, and publish responses when needed.

## Android Setup and ZeroMQ Considerations

Using ZeroMQ on Android comes with a few practical considerations that are worth calling out early. While ZeroMQ itself is platform agnostic, Android’s runtime, threading model, and lifecycle constraints shape how you integrate it into a real application.

In our case, we relied on the Java ZeroMQ bindings, which expose the familiar ZContext and ZMQ.Socket APIs. These bindings work well on Android, but they are not lifecycle aware. Once a context or socket is created, it is your responsibility to manage its lifetime explicitly. Failing to do so can easily lead to leaked threads or native resources that outlive the component that created them.

Threading is the second major concern. ZeroMQ sockets are blocking by default. Calling recv or send on the main thread is not an option, and even short lived operations can introduce jank or ANRs if they are not handled correctly. For this reason, all socket creation and message handling is pushed onto background threads.

Kotlin coroutines are a natural fit here. They allow us to offload work to Dispatchers.IO, keep the code readable, and still coordinate state changes back to the main thread when needed. The client implementation you will see later uses coroutines to manage connection setup, message reception, and cleanup without exposing threading concerns to the rest of the app.

Another important detail is that ZeroMQ does not automatically reconnect sockets if something goes wrong. If a connection drops or a socket fails, you need to decide how to react. In our setup, we kept things intentionally simple. The client reports connection state changes via a callback and leaves reconnection strategies to the caller. This keeps the ZeroMQ client focused on communication, not policy.

With these constraints in mind, we wrapped all ZeroMQ related logic in a single class. This class owns the context, sockets, and coroutines, and exposes a small, clear API to the rest of the application.

## Adding ZeroMQ to an Android Project

To use ZeroMQ on Android, we relied on **JeroMQ**, the pure Java implementation of ZeroMQ. This is an important distinction. JeroMQ does not require native binaries or NDK integration, which keeps the setup straightforward and avoids ABI related issues.

In this project, dependencies are managed using a version catalog. The ZeroMQ dependency is defined once and referenced consistently across modules.

First, we declare the version:

```
jeromq = "0.6.0"
```

Next, we define the actual library entry:

```
jeromq = { group = "org.zeromq", name = "jeromq", version.ref = "jeromq" }
```

With this in place, the dependency can be added to an Android module like any other library:

```
implementation(libs.jeromq)
```

Using JeroMQ means the ZeroMQ context and sockets live entirely within the JVM. This aligns well with Android’s process model and makes resource management more predictable. The tradeoff is that you are not using the native ZeroMQ implementation, but for local, low latency communication, this approach has proven more than sufficient.

Once the dependency is added, no additional configuration is required. You can create a `ZContext`, open sockets, and start sending or receiving messages immediately.

## The ZeroMqClient Class and Its Responsibilities

At the center of the Android side implementation is a single class: `ZeroMqClient`. Its job is to hide all ZeroMQ specific details behind a small, predictable API that the rest of the app can interact with safely.

The class is responsible for:

-   Creating and owning the ZeroMQ context
-   Managing one SUB socket for incoming messages
-   Managing one PUB socket for outgoing messages
-   Running blocking socket operations off the main thread
-   Exposing callbacks for messages and connection state
-   Cleaning up all resources deterministically

Rather than exposing sockets directly, the class takes a configuration driven approach. Ports for subscribing and publishing are optional, which makes it possible to use the client in a receive only, send only, or bidirectional mode depending on the use case.

Here is the full class definition as it exists in the project:

The class implements `Closeable`, which makes its lifecycle explicit. When `close` is called, the expectation is that all background work stops and all native resources are released. This becomes important later when tying the client to an Android component lifecycle.

The `subPort` and `pubPort` parameters are nullable. This allows the client to conditionally create sockets based on what the caller needs, without introducing multiple implementations or flags.

Callbacks are also passed in rather than exposed as flows or observables. This was a deliberate choice to keep the client lightweight and free of framework level dependencies. Higher level layers in the app are free to adapt these callbacks into StateFlow, LiveData, or any other abstraction if needed.

Finally, internal state like the ZeroMQ context, sockets, and coroutine job are all kept private. The rest of the app never needs to know how messages are received or sent, only that they are.

## Connecting and Initializing the Sockets

The `connect()` function is where the client transitions from a plain object into an active ZeroMQ participant. The goal is simple: create a context, create whichever sockets are needed, connect them to localhost, and start receiving messages if a SUB port is configured.

## Get James Cullimore’s stories in your inbox

 from this writer.

Remember me for faster sign in

A few constraints shape the implementation:

-   We never want to block the main thread.
-   We want SUB and PUB sockets to be optional.
-   We want the rest of the app to know whether we connected successfully.

Here is the `connect()` implementation exactly as used:

The early return `if (isRunning) return` prevents duplicate connections. Without this guard, it would be easy to create multiple contexts and sockets, which quickly turns into confusing behavior and resource leaks.

All setup is launched on `Dispatchers.IO`. Socket creation and `connect()` calls are not operations you want to risk running on the main thread. This also gives us room to add retries or timeouts later without changing the calling code.

When the client is configured with a `subPort`, it creates a `SocketType.SUB` socket and immediately subscribes with:

```
subSocket?.subscribe("".toByteArray())
```

Subscribing with an empty prefix means: subscribe to everything. This keeps the client flexible. If you later introduce topic based filtering, you can replace this with a specific prefix and keep the rest of the code unchanged.

Both sockets connect to `tcp://127.0.0.1:<port>`. That is a key part of the original requirement: local communication between the Linux service and the Android app.

Finally, the connection callback is invoked on the main dispatcher. Even if the callback only toggles state, updating UI state from a background thread is a common source of subtle issues, so it is handled explicitly.

If anything fails during setup, the code logs the error, reports a failed connection state, and calls `close()` to ensure partially created resources do not stick around.

## Receiving Messages with Coroutines

Once the SUB socket is connected, the next problem is straightforward but important: keep listening without blocking the app, and deliver messages to the rest of the code as they arrive.

That is what `startReceiving()` does. It runs a loop on a background dispatcher, blocks on `recvStr()`, and forwards each received message through the callback.

Here is the implementation exactly as used:

`recvStr()` is a blocking call. That is fine here because this coroutine runs on `Dispatchers.IO`. The thread can wait for messages without impacting UI responsiveness.

The loop condition checks both `isRunning` and `subSocket != null`. This gives you a quick, readable way to stop receiving when the client is closed or if the socket is cleaned up unexpectedly. Combined with `receiveJob?.cancel()` in `close()`, it provides two layers of stopping behavior: state based exit and coroutine cancellation.

Messages are passed upward through `messageCallback`. This keeps the class focused on transport concerns, not on how the message will be interpreted. In practice, the callback is where the app can parse JSON, update a `StateFlow`, or route events deeper into the application.

One small logging note: the log tag says “Server received message,” but this code is on the client side receiving messages from the server. If you keep this as is, it still works, but it can be misleading when debugging. Whether you want to adjust that is a style call, but it is worth being aware of.

Errors are caught and logged, but the coroutine is not restarted automatically. This matches the lightweight design of the client. Connection policy (retry, reconnect, backoff) can be implemented one layer above if needed.

## Sending Messages Back with `sendMessage()`

Receiving messages is only half of the story. The Android app also needs a simple way to publish messages back to the Linux service.

The `sendMessage()` function is intentionally small. It validates that the client is running and that the PUB socket exists, then sends the message and logs the result.

Here is the implementation exactly as used:

First, the method handles the common misuse case up front. If the client was created without a `pubPort`, or if `connect()` has not established the PUB socket yet, we fail fast with a clear log message. This avoids silent drops where the app “thinks” it sent something but nothing actually happened.

Second, the method uses `pubSocket?.send(message)` directly. In a PUB SUB setup, there is no immediate acknowledgement and no response. The send call either succeeds locally or throws. The actual delivery semantics depend on the other side being subscribed and connected.

Third, errors are narrowed down to `ZMQException`. This keeps the catch focused on what you realistically expect from the socket send operation, rather than swallowing everything.

If you later evolve this into a request response pattern, this is the exact place where the shape of the API would change. You would likely swap PUB for REQ on the Android side, and introduce a blocking receive or a suspend function that returns a value. For the current design, a fire and forget send is the right match.

## Cleanup, Lifecycle, and Closing the Client Safely

On Android, resource management is not optional. A ZeroMQ context and its sockets may hold native resources under the hood, and the receive loop can keep running long after the UI component that created it is gone unless you shut it down deliberately.

That is why this client implements `Closeable` and puts all teardown logic in `close()`.

Here is the implementation exactly as used:

### Stop the receive loop

The first line sets `isRunning = false`. That is enough to make the `while (isRunning && subSocket != null)` loop in `startReceiving()` exit naturally.

Then `receiveJob?.cancel()` adds a second shutdown mechanism. Cancellation matters because `recvStr()` is blocking. In practice, cancellation and closing the socket together are what help the coroutine unwind instead of waiting forever.

### Release sockets and context

Sockets are closed first, then the context:

-   `subSocket?.close()`
-   `pubSocket?.close()`
-   `context?.close()`

This order keeps the teardown predictable. In a system like this, you want to avoid leaving sockets alive after the context is already gone.

### Report state changes on the main thread

After disconnecting, the client reports the connection state through:

```
CoroutineScope(Dispatchers.Main).launch { onConnectionChanged?.invoke(false) }
```

This matches the approach used in `connect()`: state updates are routed back through the main dispatcher so callers can safely update UI state.

Finally, the `finally` block sets references to null. This is less about correctness and more about making the object clearly “closed” and eligible for garbage collection without lingering references.

## Conclusion

This setup worked because it kept the problem small and treated messaging as infrastructure, not as an architecture statement. We had a Linux service that needed to broadcast updates, and an Android app that needed to react quickly and occasionally publish messages back. ZeroMQ gave us that with minimal overhead and without pulling in a broker, an HTTP layer, or a heavier RPC stack.

The `ZeroMqClient` is intentionally narrow. It owns the ZeroMQ context and sockets, it does all blocking work on `Dispatchers.IO`, and it exposes only what the rest of the app needs: `connect()`, `sendMessage()`, a message callback, and a connection state callback. The lifecycle is explicit through `Closeable`, and cleanup is centralized so sockets do not outlive the component that created them.

If you are considering something similar, the main tradeoff to keep in mind is that PUB SUB is not request response. You are optimizing for streaming updates and loose coupling, not acknowledgements and guaranteed delivery. That is a great fit for local, low latency communication, but it is still a design choice you should make intentionally.

In our case, that choice paid off. We got a clean, lightweight channel between the Linux service and the Android app, and we kept the implementation small enough that it remained easy to debug and maintain.
---
title: "Please hold — The Impatient Data Queue named Buffers"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/please-hold-the-impatient-data-queue-named-buffers-34dc37e2da32?source=rss----b680b860beb1---4"
publishedAt: "2026-02-25"
tags:
  - "circular-buffer"
  - "operating-systems"
  - "queue"
  - "buffer"
  - "fundamentals"
  - "data-science"
  - "analytics"
---

# Please hold — The Impatient Data Queue named Buffers

# Please hold — The Impatient Data Queue named Buffers

[vtkrishn](/@vtkrishn?source=post_page---byline--34dc37e2da32---------------------------------------)

4 min read·2 days ago

\--

![Photo by Tim Johnson on Unsplash]()

Have you ever wondered how the data is being transferred across different components in the computer system. There are several temporary storage areas which is used to hold data while its being moved between the components or locations, such as different devices, processes that operates at different speeds. Those are called **Buffers.**

This topic may look simple, but they are essential for computer system to work smoothly and they ease the use of computers efficiently. They are available at various levels of a system. Any performance bottlenecks or issues can be easily solved by introducing a buffer to slow the transfer rate for smooth processing. Many optimization were done in across systems using buffers and its very important to know the fundamental truth of those using first principles thinking.

### Why we need buffer?

Computer system have different components that operates at different speed. When the fast component sends data the slow component which cannot cope up with the data transfer rate resulting in bottlenecks or data loss. We employ buffer in these situation where the buffer holds the data temporarily before it gets processed.

![]()

### Buffers vs Cache

Buffer and cache both stores data temporarily in memory to enhance the performance of the system. But both of them serve different purpose.

-   ***Buffer*** is a temporary area to hold and manage the flow of data between different components or devices with variable speeds mostly to ensure smooth data transfer. It is usually associated with queues as they share more or less similar properties.

![]()

-   ***Cache*** on the other hand stores the copies of frequently accessed data to reduce latency, round trip to database or backend services eventually speeding up the future requests from the clients or components.

### Types

-   **Single Buffer**: Involves reading and writing using one buffer.
-   **Double Buffer**: Instead of using single buffer, two buffers are used to speed up the process. Sometime a single buffer is divided into two to serve the purpose of double buffer.
-   **Circular / Ring Buffer**: The buffer wraps around when it reaches the end and start from the beginning.
-   **Line Buffer**: Buffers will flush the content of the buffer when a newline `\n` is encountered.
-   **Block Buffer**: When the block is full then the contents are flushed. The block size differs usually `(*4KB or 8KB*)`

### Common Properties

-   ***Content***: It can contain binary data, text, files, packets, frames, media or simply sequence of bytes
-   ***Capacity***: The size of the buffer used for storing the data
-   ***Position***: Usually we have two pointers. One is the `write pointer` where the value will be stored and the other one is the `read pointer` from where the value will be consumed from the buffer.
-   ***Validation***: Check if the buffer is full or Empty

![]()

### Hardware Buffers

Hardware components have built in buffers to manage their own data transfers independent of the main CPU

-   **I/O Devices** like keyboards and mouse use an input buffer to store the key strokes or click streams before the operating system is reaching to process them.
-   **Storage devices** like HDD’s and SSD’s uses integration buffers to manage the speed at which the data transfer happens between the fast storage controller and the slower physical media devices.
-   **Video cards** uses frame buffers to store the output images before they are processed by the monitor to ensure smooth playback without any glitches.
-   **Sound cards** uses ring buffers to prevent any glitches in rendering the audio clarity
-   **Network devices** contains an in build SRAM buffers to store the incoming data packets before they are processed by the OS.

### Software Buffers

The operating system does utilizes the feature of buffering in optimizing the overall performance of the system.

-   **Kernel Space** allocates the portion of main memory as buffer for slow devices and for disk caching, to hold the data in the RAM to speed up subsequent access. This is sometime referred as *Buffer Cache*. Buffers are used to store output from high speed storage to slow devices like printers referred as *Spooling*.
-   **User Space** applications create their own buffers in their restricted memory space to handle high speed stream processing for pre-loading, batching small pieces of data before they are written to a file. for eg, *web browsers* buffers to store the html content or web related data when the browser is loading the pages.
-   **Programming languages** like C or C++ explicitly declare memory blocks as buffer to store user inputs to facilitate data manipulation.
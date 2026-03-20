---
title: "The Data Speed Hierarchy: Analogy using First Principles — 1 CPU Cycle vs the world"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/the-data-speed-hierarchy-analogy-using-first-principles-1-cpu-cycle-vs-the-world-3b83e8caa08d?source=rss----b680b860beb1---4"
publishedAt: "2026-02-21"
tags:
  - "analytics"
  - "data-science"
categories:
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-01T21:19:30.622Z"
---

# The Data Speed Hierarchy: Analogy using First Principles — 1 CPU Cycle vs the world

# **The Data Speed Hierarchy:** Analogy using First Principles — 1 CPU Cycle vs the world

[vtkrishn](/@vtkrishn?source=post_page---byline--3b83e8caa08d---------------------------------------)

6 min read·Just now

\--

![Photo by Logan Voss on Unsplash]()

In my initial byte about the [First Principles](/frontend-canteen/first-principles-question-everything-even-the-question-mark-how-to-ruin-a-brainstorming-0728bfa582ae) I have provide some context on how the go about asking questions and reason out the fundamental truth to rebuild solutions from scratch.

Today we are going to explore about the memory hierarchy using first principles thinking. I am taking a reference of this famous [Latency numbers that every programmer should know](https://gist.github.com/jboner/2841832)

```
1 CPU Cycle(interval between system ticks)     0.3 nsL1 cache reference                             1.2 nsL2 cache reference                             2.1 nsBranch mispredict                              5   nsL3 cache reference                             8   nsMutex lock/unlock                             20   nsMain memory reference                        100   ns    Redis ReadCompress 1K bytes with Zippy               3,000   nsSend 1K bytes over 1 Gbps network         10,000   nsRead 1 MB sequentially from memory       250,000   nsRead 1 MB sequentially from SSD*       1,000,000   ns      1 msRead 1 MB sequentially from HDD*      20,000,000   ns     20 ms  Send packet CA->Netherlands->CA      150,000,000   ns    150 ms  Zoom CallIntervals for Dashboard            1,000,000,000   ns   1000 ms  1s Grafana Refresh
```

From the above numbers the speed of CPU and other data transfer latency is hard to visualize in nano seconds. For human brain to interprets its easy to have the analogy of the number mapped to seconds, minutes, hours, days and years. I would like to map each of these line items in human readable time. Lets equate nano seconds to seconds and try to revisit the numbers.

![]()

### 1 CPU Cycle=1 Second

1 CPU cycle which is the interval between two pulses of the system clock is ***~0.3 ns***, this is typically the time for the CPU register access time from the main registers usually to hold frequent data very close to the CPU and having the size of *32,64 or 512 bits*

> **1 CPU cycle = Register Access Time = 0.3 ns = 1 second (Assumed human time)**

Assuming there is a person sitting on a desk and his thinking time is **1 second** for any action

![]()

### Access L1/L2 Cache

Accessing L1 and L2 caches which is little away from the CPU holding more data than the registers with L1 being the fastest with *(32–128KB)* and L2 little slower than the L1 with size of *(256–1MB)*. Accessing them is equivalent to 3-4 cycles for L1 with **~1.2 ns** and 7–8 cycles for L2 which will be ***~2.1 ns*** respectively. This will be **4 seconds** and **8 seconds** in human assumed time. Our CPU person will take about 4 seconds to pick the book from the table and start reading it.

![]()

### Branch Miss predict

*CPU branch miss predict* occurs when CPU incorrectly guesses the path of the code execution in executing If Else statement speculating wrong instructions which results in pipeline flushes which will cost about 10-20 cpu cycles roughly ***~5 ns*.** This will be equal to **20 seconds** in human time. This equates to our persons hand washing time near his desk.

![]()

### L3 Access

Accessing the L3 cache which hold more data than L2 but slower in access as its far away from CPU compared to L1 or L2. Its size will be typically around *4MB to 64MB* with the turn around time of ***~8 ns***. This will be close to **32 seconds** for our human CPU time. Its equivalent to our person watching a standard advertisement on a television.

![]()

### Mutex Lock / Unlock

When there are multiple instructions executed by the CPU threads which involves locking and unlocking shared resources. This is an expensive operation spanning close to 50 to 100 CPU Cycles taking roughly around ***~20 ns***. In our human time it will be like a person doing a typical plank hold for High Intensity Interval Training (HIIT) of about **50–100 seconds**.

![]()

### RAM Access

Accessing data from memory is the first access for the CPU outside of its compartmentalized unit. The CPU is connected to the memory using some components like *Integrated Memory controller(IMC)* and other buses like *system bus, control bus, address bus and data bus*. They are physically connected by means of wires which are embedded in the motherboard. These are relatively fast but for the CPU it will take around 300–400 cycles to access the data through these components. This is close to **~100 ns** which is equivalent to boiling an egg for **6 minutes** to get an oozy running soft boiled egg in human time.

![]()

### Extending more

Any details after this point can be visualized easier in human time since the scale is humongous. Ask a question for yourself any thing that you do with the system either be in loading a page, or accessing a website or interacting with an application you would spend at this scale if it were on a human time scale?

> If every request that you are doing for example, checking your phone is taking 6 minutes each time will you do that often? You will batch your request and send as a collective information to do it at once right otherwise each time you have to wait. Think in same terms for the system as well.

You should have some ***Mechanical Sympathy*** for the components that you are interacting with and design a system considering these things. The CPU is capable of doing billions of instructions per second but what we are making it to do is to ask for a piece of information and make it wait and not giving any other work for it to do anything for a while.

***Compression*:** Compression of data involves heavy usage of CPU for identifying the patterns and to analyze the data for redundant information. After analysis the CPU should spend some time in encoding the results by replacing the data with shorter or smaller information. Then it should spend some time on storing the outputs which involves multiple read from the memory storing temporary information. The resulting data will be transmitted and that also need some extra cycles. All of these vary based on the type of compression either its lossy or lossless compression. So CPU spends close to ***~3000 ns*** for the compression equivalent to ~**3 hrs and 20 minutes** in human time. This can be compared to our person traveling from SFO to DFW on a flight trip.

***SSD*:** You have stored some data in the solid state drive which helps storing the data electronically and is far away from the CPU and it will take about ***~1 ms*** but in human time scale will be between **6 days or a week**.

***HDD*:** Fetching data from a spinning disc, which is good for sequential reads but have to move the mechanical handle across tracks and sectors for any random access will take anywhere between a **month to an year** in a human time depends on the data transfer speed etc

***Video Call*:** We feel so comfortable in connecting with someone remote using a Zoom video call but this involves lot of network activity, packet transfers, kernel interactions, queuing etc which will be easily around **4 to 20 years**

***Dashboard refresh*:** In a metrics dashboard for observability like grafana a minimum time limit you can refresh is for ***1s*** which is about waiting for **100 years** in human time.
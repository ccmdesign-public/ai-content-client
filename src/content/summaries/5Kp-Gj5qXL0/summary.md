---
metadata:
  videoId: "5Kp-Gj5qXL0"
  title: "NVIDIA told us exactly where AI is going — and almost everyone heard it wrong"
  description: "My site: https://natebjones.com

    Full Story w/ Prompts: https://natesnewsletter.substack.com/p/my-honest-field-notes-from-ces-2026?r=1z4sm5&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true

    _______________________

    What's really happening inside the AI infrastructure race at CES 2026? The common story is it's about flashy gadgets — but the reality is more complicated.

    In this video, I share the inside scoop on why CES 2026 marks AI's shift from chip race to factory race:

    -Why NVIDIA's Rubin platform optimizes for inference token economics

    -How OpenAI secured 26 gigawatts across NVIDIA, AMD, Broadcom

    -What inference context memory reveals about AI scaling constraints

    -Where demand pressure creates multi-winner hardware landscape despite NVIDIA dominance

    Chapters:

    00:00 - Introduction: CES 2026 and the AI Industrial Phase\ 

    01:09 - The Demand Shock: Inference Dominates Training\ 

    02:54 - NVIDIA's Rubin: Selling an AI Factory, Not Just GPUs\ 

    04:50 - Inference Context Memory: Managing the KV Cache\ 

    06:29 - OpenAI as Reference Customer: The Factory Blueprint\ 

    08:51 - OpenAI's Multi-Vendor Strategy: 26 Gigawatts of Capacity\ 

    10:24 - Memory Supply Chain: Samsung and SK Hynix Join Stargate\ 

    11:45 - DRAM Shortage: The Hidden Bottleneck\ 

    12:44 - Will Anyone Challenge NVIDIA's Dominance?\ 

    15:05 - Multi-Winner Reality: AMD, Broadcom, and Anthropic's TPUs\ 

    17:09 - Physical AI: From Data Centers to Robotics\ 

    18:07 - Conclusion: The Year AI Became a Factory

    The companies that locked supply chain deals in late 2025 — like OpenAI with Samsung, SK Hynix, and hyperscalers — secured competitive advantage for the next two years as AI becomes ambient intelligence everywhere.

    Subscribe for daily AI strategy and news. For deeper playbooks and analysis: https://natesnewsletter.substack.com/"
  channel: "AI News & Strategy Daily | Nate B Jones"
  channelId: "UC0C-17n9iuUQPylguM1d-lQ"
  duration: "PT18M37S"
  publishedAt: "2026-01-08T15:00:12Z"
  thumbnailUrl: "https://i.ytimg.com/vi/5Kp-Gj5qXL0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=5Kp-Gj5qXL0"
processedAt: "2026-01-10T18:07:03.573Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "- NVIDIA's Vera Rubin platform signals a shift from GPUs to 'AI Factories,' reducing inference costs by 10x.

  - AI has entered an industrial phase where compute is managed at rack-scale to handle 10M token context windows.

  - OpenAI is securing its future through 26GW+ power deals across NVIDIA, AMD, and Broadcom to solve a massive global demand shock.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4293
  outputTokens: 942
  totalTokens: 6566
  processingTimeMs: 15545
tools:
  - name: "Vera Rubin Platform"
    url: null
  - name: "NVLink 6"
    url: null
  - name: "Vera CPU"
    url: null
  - name: "Rubin GPU"
    url: null
  - name: "Inference Context Memory"
    url: null
  - name: "Tensor Processing Unit (TPU)"
    url: null
  - name: "Stargate"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
tags:
  - "aws"
  - "gcp"
  - "llm"
  - "model-training"
tagsNormalizedAt: "2026-03-01T21:19:30.300Z"
---

## Key Takeaways

The AI industry has pivoted from a chip race to a 'factory race' where inference economics, power constraints, and memory supply determine market leaders.

* **Inference-Led Architecture**: The industry is optimizing for continuous, cost-sensitive inference rather than one-off training, leading to the productization of **Inference Context Memory** to manage **KV caches**.

* **The Vera Rubin Platform**: NVIDIA’s new rack-scale system integrates the Vera CPU and Rubin GPU with **NVLink 6** to treat entire server racks as a single, high-efficiency chipset.

* **Strategic Infrastructure Locks**: OpenAI has secured a massive multi-vendor supply chain, including 10GW from NVIDIA, 6GW from AMD, and a 10GW custom silicon deal with **Broadcom** to bypass capacity bottlenecks.

* **Multi-Ecosystem Future**: High demand is creating a 'multi-cloud' style hardware environment where NVIDIA remains dominant, but second-source providers like AMD and custom TPUs have significant room to scale.

## Summary

CES 2026 marks the official transition of AI into an **Industrial Phase**. According to Nate B Jones, the event served as a coordination point for the next industrial cycle, moving away from consumer gadgets toward the infrastructure required for 'Always On' AI. The industry is currently facing a **demand shock**, where the need for model serving (inference) has far outpaced the supply of compute, leading to a focus on **AI Factories** rather than individual chips.

### The Shift to Inference Economics

With ChatGPT reaching over 800 million weekly users, the operational cost of AI is now dominated by inference. NVIDIA's latest **Vera Rubin** platform is designed specifically to address this by optimizing **token economics**. The platform introduces **Inference Context Memory**, which pushes the **KV cache** (Key-Value cache) out of the GPU and into a dedicated storage tier. This allows for the efficient management of massive **10 million token context windows**, slashing inference costs by a factor of 10 while maintaining low latency.

### OpenAI as the Reference Customer

OpenAI has effectively 'pre-booked' the hardware future by signing massive infrastructure deals to ensure they aren't bottlenecked by supply shortages. These include:

* A **10GW NVIDIA** commitment for Vera Rubin systems.

* A **6GW AMD** partnership to create a viable second ecosystem.

* A **10GW Broadcom** collaboration to develop custom OpenAI-designed accelerators.

* Strategic memory locks with **Samsung** and **SK Hynix** for 900,000 DRAM wafers per month to combat a 300% price surge in memory components.

### Hardware Heterogeneity and Physical AI

While NVIDIA remains the primary player, the sheer volume of demand ensures a 'multi-winner' reality. This mirrors the evolution of the cloud market, where multiple providers (AWS, Azure, GCP) coexist. We are seeing large labs like **Anthropic** expand their use of Google's **TPUs**, signaling that labs will switch to non-NVIDIA silicon when availability and price-performance are compelling. Finally, this industrial scale is moving toward **Physical AI**, as seen in autonomous Mercedes-Benz demos and robotics, where low-latency inference is critical for real-world operation.

## Context

This summary highlights a critical turning point in the AI trajectory: the move from experimental growth to industrial-scale deployment. It matters because the bottlenecks have shifted from 'better models' to 'cheaper tokens' and 'available power.' This transition concerns investors, enterprise leaders, and hardware manufacturers as the 'AI Factory' becomes the new standard for global compute. It connects to the broader trend of 'Physical AI' and ambient intelligence, where AI moves out of the chat box and into robotics and automotive systems. Understanding these infrastructure deals is essential for predicting which AI labs will have the capacity to serve the next generation of 10-trillion-token enterprise workloads.

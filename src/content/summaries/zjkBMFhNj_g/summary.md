---
metadata:
  videoId: "zjkBMFhNj_g"
  title: "[1hr Talk] Intro to Large Language Models"
  description: "This is a 1 hour general-audience introduction to Large Language Models: the core technical component behind systems like ChatGPT, Claude, and Bard. What they are, where they are headed, comparisons and analogies to present-day operating systems, and some of the security-related challenges of this new computing paradigm.

    As of November 2023 (this field moves fast!).


    Context: This video is based on the slides of a talk I gave recently at the AI Security Summit. The talk was not recorded but a lot of people came to me after and told me they liked it. Seeing as I had already put in one long weekend of work to make the slides, I decided to just tune them a bit, record this round 2 of the talk and upload it here on YouTube. Pardon the random background, that's my hotel room during the thanksgiving break.


    - Slides as PDF: https://drive.google.com/file/d/1pxx_ZI7O-Nwl7ZLNk5hI3WzAsTLwvNU7/view?usp=share_link (42MB)

    - Slides. as Keynote: https://drive.google.com/file/d/1FPUpFMiCkMRKPFjhi9MAhby68MHVqe8u/view?usp=share_link (140MB)


    Few things I wish I said (I'll add items here as they come up):

    - The dreams and hallucinations do not get fixed with finetuning. Finetuning just \"directs\" the dreams into \"helpful assistant dreams\". Always be careful with what LLMs tell you, especially if they are telling you something from memory alone. That said, similar to a human, if the LLM used browsing or retrieval and the answer made its way into the \"working memory\" of its context window, you can trust the LLM a bit more to process that information into the final answer. But TLDR right now, do not trust what LLMs say or do. For example, in the tools section, I'd always recommend double-checking the math/code the LLM did.

    - How does the LLM use a tool like the browser? It emits special words, e.g. |BROWSER|. When the code \"above\" that is inferencing the LLM detects these words it captures the output that follows, sends it off to a tool, comes back with the result and continues the generation. How does the LLM know to emit these special words? Finetuning datasets teach it how and when to browse, by example. And/or the instructions for tool use can also be automatically placed in the context window (in the “system message”).

    - You might also enjoy my 2015 blog post \"Unreasonable Effectiveness of Recurrent Neural Networks\". The way we obtain base models today is pretty much identical on a high level, except the RNN is swapped for a Transformer. http://karpathy.github.io/2015/05/21/rnn-effectiveness/

    - What is in the run.c file? A bit more full-featured 1000-line version hre: https://github.com/karpathy/llama2.c/blob/master/run.c


    Chapters:

    Part 1: LLMs

    00:00:00 Intro: Large Language Model (LLM) talk

    00:00:20 LLM Inference

    00:04:17 LLM Training

    00:08:58 LLM dreams

    00:11:22 How do they work?

    00:14:14 Finetuning into an Assistant

    00:17:52 Summary so far

    00:21:05 Appendix: Comparisons, Labeling docs, RLHF, Synthetic data, Leaderboard

    Part 2: Future of LLMs

    00:25:43 LLM Scaling Laws

    00:27:43 Tool Use (Browser, Calculator, Interpreter, DALL-E)

    00:33:32 Multimodality (Vision, Audio)

    00:35:00 Thinking, System 1/2

    00:38:02 Self-improvement, LLM AlphaGo

    00:40:45 LLM Customization, GPTs store

    00:42:15 LLM OS

    Part 3: LLM Security

    00:45:43 LLM Security Intro

    00:46:14 Jailbreaks

    00:51:30 Prompt Injection

    00:56:23 Data poisoning

    00:58:37 LLM Security conclusions

    End

    00:59:23 Outro


    Educational Use Licensing

    This video is freely available for educational and internal training purposes. Educators, students, schools, universities, nonprofit institutions, businesses, and individual learners may use this content freely for lessons, courses, internal training, and learning activities, provided they do not engage in commercial resale, redistribution, external commercial use, or modify content to misrepresent its intent."
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT59M48S"
  publishedAt: "2023-11-23T02:27:48Z"
  thumbnailUrl: "https://i.ytimg.com/vi/zjkBMFhNj_g/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=zjkBMFhNj_g"
processedAt: "2026-03-24T01:57:34.435Z"
source: "youtube"
tldr: "Large language models are fundamentally next-word prediction neural networks that compress internet-scale text data into parameters through a two-stage process (pre-training and fine-tuning), evolving into a new computing paradigm akin to an operating system kernel that orchestrates tools, with significant scaling laws promising continuous improvement but introducing novel security challenges like"
tools:
  - name: "Llama 2"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Claude"
    url: null
  - name: "Bard"
    url: null
  - name: "GPT-4"
    url: null
  - name: "DALL-E"
    url: null
  - name: "Bing"
    url: null
  - name: "Python"
    url: null
  - name: "Matplotlib"
    url: null
  - name: "C"
    url: null
  - name: "Scale AI"
    url: null
  - name: "Chatbot Arena"
    url: null
  - name: "Google Docs"
    url: null
  - name: "Google Apps Script"
    url: null
  - name: "Mistral"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
tags:
  - "llm"
  - "model-training"
  - "policy"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 39679
  outputTokens: 1931
  totalTokens: 41610
  processingTimeMs: 225664
tagsNormalizedAt: "2026-03-24T04:11:09.767Z"
---

## Key Takeaways

Andrej Karpathy provides a comprehensive technical and conceptual overview of LLMs, framing them as an emerging operating system.

*   **Core Architecture:** LLMs are fundamentally **next-word prediction neural networks** (Transformers) trained on massive internet text, acting as a **lossy compression** of that data into billions of parameters.

*   **Two-Stage Training:** Models are built via **pre-training** (expensive, knowledge acquisition from internet text) followed by **fine-tuning** (cheaper, alignment into helpful assistants using human-labeled Q&A data).

*   **Scaling Laws:** Performance predictably improves with more parameters and more training data, offering a guaranteed path to better models without algorithmic breakthroughs.

*   **Tool Use & OS Analogy:** Modern LLMs act as a **kernel process** coordinating resources (memory, computation, browsing, file access) via natural language, evolving into a new **computing stack**.

*   **Future Directions:** Key research areas include developing **System 2 thinking** (deliberate reasoning), enabling **self-improvement** in narrow domains, and facilitating **customization** for specialized tasks.

*   **Security Challenges:** The new paradigm introduces novel attack vectors like **jailbreaks**, **prompt injection**, and **data poisoning**, creating an ongoing cat-and-mouse security game.

## Summary

### What is a Large Language Model?

Andrej Karpathy demystifies LLMs by starting with a concrete example: the open-source Llama 2 70B model. He explains that a working LLM can be reduced to just two files: a **parameters file** (e.g., 140 GB for Llama 2 70B, storing weights as float16 numbers) and a **run file** (e.g., ~500 lines of C code) that implements the neural network forward pass. This simple package can run locally, generating text autoregressively by predicting the next token in a sequence.

The magic, however, is in obtaining those parameters. **Training** is described as a massive compression task. For Llama 2 70B, this involved processing roughly **10 terabytes of internet text** using a cluster of about **6,000 GPUs** over **12 days** at a cost of ~$2 million. The result is a **lossy compression** of the internet's textual knowledge into the model's weights, akin to a highly sophisticated zip file. State-of-the-art models like GPT-4 involve costs and scales an order of magnitude larger.

### How LLMs Work and Are Trained

Fundamentally, an LLM is a neural network trained for **next-word prediction**. Karpathy emphasizes that this simple objective forces the model to learn a vast amount about the world, as predicting the next word in a sentence about "Ruth Handler" requires knowledge of her life and context. This learned knowledge is distributed and entangled within the billions of parameters, making LLMs largely **empirical and inscrutable artifacts**; we can measure their behavior but don't fully understand how the parameters collaborate internally.

The path from a raw text generator to a helpful assistant involves two key stages. First, **pre-training** creates a **base model** (like the raw Llama 2) by compressing internet-scale data. Second, **fine-tuning** performs **alignment**. Here, the training dataset is swapped for a smaller, high-quality set of **human-written conversations** (e.g., 100,000 ideal Q&A pairs). Labelers follow detailed instructions to create these examples, teaching the model to adopt a helpful assistant style while retaining the knowledge from pre-training. An optional third stage, **Reinforcement Learning from Human Feedback (RLHF)**, uses human comparisons of model outputs to further refine performance.

### The LLM Ecosystem and Scaling Laws

The current landscape features a split between powerful **proprietary models** (e.g., GPT-4, Claude) accessible via API and a rapidly growing **open-source ecosystem** (e.g., Llama 2, Mistral) where weights are available for customization and local use. A key driver of progress is the existence of **scaling laws**. Remarkably, the loss on the next-word prediction task is a smooth, predictable function of only two variables: the number of model parameters (N) and the amount of training data (D). This provides a guaranteed path to improvement: train bigger models on more data. While we don't directly care about next-word loss, it correlates strongly with performance on downstream tasks we do care about.

### Capabilities, Tool Use, and the Operating System Analogy

Karpathy illustrates modern LLM capabilities through a live demo where ChatGPT, given a query about Scale AI's funding, autonomously uses tools: a **browser** to search the web, a **calculator** to compute ratios, and a **Python interpreter** with Matplotlib to generate plots. It can even use **DALL-E** to create an image based on the gathered context. This demonstrates that LLMs are evolving beyond pure text generators into **orchestrators of computational tools**.

This leads to a powerful analogy: the LLM is becoming the **kernel process of a new operating system**. Its "RAM" is the **context window**, where it manages information. It can page data in from "disk" (the internet or local files via **Retrieval-Augmented Generation**), and it schedules and uses "CPU" cycles (tools like calculators, code executors). This new LLM OS has a natural language interface and is developing its own ecosystem with proprietary and open-source variants, mirroring the evolution of traditional operating systems.

### Future Directions and Security Challenges

Karpathy outlines exciting research frontiers. First, moving from **System 1** (fast, instinctive next-token generation) to **System 2** thinking, where the model can deliberately "think" for longer periods to solve complex problems. Second, achieving **self-improvement** beyond human imitation, akin to AlphaGo, though this is challenging in open-ended language domains due to the lack of a simple, automated reward function. Third, enabling deep **customization** (e.g., via fine-tuning or GPTs) for specialized tasks.

This new paradigm introduces novel **security challenges**. Karpathy details several attack vectors: **Jailbreak attacks** that bypass safety filters using roleplay, encoding (like Base64), or optimized adversarial suffixes; **Prompt injection attacks**, where hidden instructions in images or retrieved documents hijack the model's behavior (e.g., to exfiltrate data or spread misinformation); and **data poisoning/backdoor attacks**, where malicious training data creates a hidden trigger that corrupts the model's output. This initiates a classic cat-and-mouse game between attackers and defenders in the LLM security space.

## Context

Andrej Karpathy is a leading AI researcher, formerly Director of AI at Tesla and a key figure at OpenAI. This talk, originally presented at a Scale AI event and re-recorded for public release, serves as a masterclass in understanding the foundational concepts, current state, and future trajectory of large language models. It is highly relevant as LLMs transition from research curiosities to core components of a new computing stack, impacting developers, entrepreneurs, and security professionals. The talk bridges high-level conceptual framing with concrete technical details, making it invaluable for anyone seeking a comprehensive, authoritative primer that goes beyond surface-level hype to explain how these systems actually work, where they are headed, and what new challenges they create. Viewers will gain a robust mental model for reasoning about LLMs as a technological paradigm.
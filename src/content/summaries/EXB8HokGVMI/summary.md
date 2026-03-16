---
metadata:
  videoId: "EXB8HokGVMI"
  title: "Small Language Models (SLMs) Are the Future: Fine-Tuning AI That Runs on Your iPhone"
  description: "In this talk, I go over the rise of small language models (SLMs) and how they can benefit your business or day to day life.


    Talk date: March 12, 2026 at the Queensland AI Meetup.


    We'll look at case studies such as Sunny, an iOS application which uses a fine-tuned version of MedGemma to privately track skin health on-device.


    We'll break down why on-device inference matters (privacy, offline access, zero ongoing cost) and compare the economics of local models versus cloud API pricing at scale.


    Then we'll discuss the hardware and software optimizations required to run a model on a compute constrained device.


    Finally, we'll get hands-on and fine-tune a small language model live.\ 


    We'll walk through how to build a custom dataset, set up supervised fine-tuning using Hugging Face's SFT Trainer, and fine-tune a small model, Gemma 3 270M, in about two minutes on an RTX 6000 Blackwell GPU on Google Colab.\ 


    We'll see how the base model's outputs to the fine-tuned version side by side, showing how even a small model can be customized to know specific people, handle edge cases, and refuse to answer questions it shouldn't.


    Links:

    Colab Notebook we used - https://dbourke.link/qldai-colab-notebook-llm-fine-tune-march-2026


    Courses I teach: \ 

    Learn AI/ML (beginner-friendly course) - https://dbourke.link/ZTMMLcourse \ 

    Learn Hugging Face - https://dbourke.link/ZTMHuggingFace \ 

    Learn TensorFlow - https://dbourke.link/ZTMTFcourse \ 

    Learn PyTorch - https://dbourke.link/ZTMPyTorch \ 


    Connect elsewhere:

    Download Nutrify (my startup) - https://apple.co/4ahM7Wc\ 

    My website - https://www.mrdbourke.com\ 

    X/Twitter - https://www.twitter.com/mrdbourke   \ 

    LinkedIn -  https://www.linkedin.com/in/mrdbourke/  \ 

    Get email updates on my work - https://dbourke.link/newsletter

    Read my novel Charlie Walks - https://www.charliewalks.com\ 


    Timestamps:

    0:00 - Intro

    2:19 - About me

    4:09 - Case study: Sunny

    7:55 - Benefits of small language models running on-device

    8:44 - Cost savings of on-device models

    9:29 - Case study: Sunny (hardware overview)

    10:55 - Current best practice for running VLMs on iPhone

    12:35 - Case study: Sunny (memory usage in Xcode)

    13:56 - Case study: Sunny (workflow overview)

    15:25 - Jeff Dean on precision

    16:46 - Precision breakdown

    17:28 - Effects of quantization on model size footprint

    17:48 - Saving memory by reducing token usage

    19:28 - Before and after different on-device experiments

    20:29 - Case studies for other small but useful language models

    24:00 - Case study for private VLM-based surveillance

    25:04 - Small language models features and benefits

    25:47 - How to pick a model for your use case

    26:06 - Question: What hardware is required for getting started?

    27:21 - Prompting vs fine-tuning vs RAG

    28:08 - Live LLM fine-tuning problem overview

    28:50 - How I made a dataset for fine-tuning Gemma 3

    33:08 - Live fine-tuning code begins in Google Colab

    36:56 - Data = a guide for what you want your model to do

    40:37 - Question: How do you know if your fine-tuned model is performing well?

    44:24 - Comparing the base model to the fine-tuned model

    53:23 - Demo'ing our fine-tuned model on Hugging Face Spaces

    56:00 - Haiku

    57:33 - Contact me

    59:05 - Q&A"
  channel: "Daniel Bourke"
  channelId: "UCr8O8l5cCX85Oem1d18EezQ"
  duration: "PT1H4M42S"
  publishedAt: "2026-03-13T08:09:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/EXB8HokGVMI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=EXB8HokGVMI"
processedAt: "2026-03-16T15:21:48.045Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Daniel Bourke argues that small language models (SLMs) running on-device are the future for many AI applications, demonstrating through case studies and a live fine-tuning session how SLMs offer privacy, cost efficiency, and offline capability while being rapidly trainable for specific tasks."
tools:
  - name: "Hugging Face"
    url: null
  - name: "Transformers"
    url: null
  - name: "TRL"
    url: null
  - name: "Datasets"
    url: null
  - name: "Accelerate"
    url: null
  - name: "Gradio"
    url: null
  - name: "Google Colab"
    url: null
  - name: "PyTorch"
    url: null
  - name: "MLX"
    url: null
  - name: "Swift Transformers"
    url: null
  - name: "Xcode"
    url: null
  - name: "Gemma"
    url: null
  - name: "Med-Gemma"
    url: null
  - name: "GPT-OSS"
    url: null
  - name: "Jupyter Notebook"
    url: null
categories:
  - "AI & Machine Learning"
  - "Mobile Development"
tags:
  - "ai-general"
  - "ios"
  - "llm"
  - "machine-learning"
  - "mobile-apps"
  - "model-training"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 43386
  outputTokens: 2159
  totalTokens: 45545
  processingTimeMs: 111164
tagsNormalizedAt: "2026-03-16T16:36:09.713Z"
---

## Key Takeaways

Daniel Bourke, a machine learning engineer specializing in on-device AI, presents a comprehensive case for **small language models (SLMs)** as the future of practical AI deployment. His talk blends theoretical framework with hands-on demonstration.

*   **Small Models Enable On-Device Privacy & Cost Control:** The primary advantages of SLMs are **privacy** (data never leaves the device), **zero-cost inference**, **offline capability**, and **low latency**, making them ideal for sensitive applications like healthcare (e.g., the Sunny skin exam app).

*   **Hardware Defines the SLM:** An SLM is pragmatically defined as a model that can run natively on consumer hardware like an iPhone or MacBook, requiring optimization for memory constraints through techniques like **quantization** (e.g., 4-bit) and hardware-specific frameworks like Apple's **MLX**.

*   **Fine-Tuning is Fast & Accessible:** Creating a custom, task-specific SLM is now remarkably fast and inexpensive. Bourke live-fine-tuned a 270M-parameter Gemma 3 model in about two minutes using **Google Colab**, demonstrating that the major challenge is curating a high-quality, specific dataset, not the compute.

*   **The Workflow: Data -> Fine-Tune -> Deploy:** The standard pipeline involves creating a synthetic dataset (e.g., using a larger model), supervised fine-tuning (SFT) with libraries like **Hugging Face TRL**, quantizing for deployment, and deploying to edge devices using frameworks like **Swift Transformers** and **MLX**.

*   **SLMs Excel at Specific Tasks:** While large models are generalists, SLMs shine when **fine-tuned for a narrow, well-defined task**. This allows for shorter, more efficient prompts, faster inference, and elimination of unwanted generic behaviors (like excessive safety disclaimers).

*   **The Future is Local:** The performance gap is closing; open-source SLMs like **Qwen 3.5 4B** now rival GPT-4 on benchmarks. The trend is toward increasingly capable models running entirely on personal devices, shifting control from cloud APIs to individual users and businesses.

## Summary

### Introduction and Defining Small Language Models

Daniel Bourke opens by framing the talk as an exploratory "cooking show" into the rapidly evolving world of small language models (SLMs). He defines an SLM not strictly by parameter count (though under 1 billion is a rough guide) but practically: a model that can **run natively on your own computer or iPhone**. His passion is for models that empower users by keeping compute and data local.

The evening's agenda is to explore real case studies, define SLMs, examine dataset creation, and conduct a live fine-tuning session to compare a base model with a fine-tuned one. The ultimate goal is for attendees to ask: "In my business or life, can we create/use our own small models?"

### Case Study 1: Sunny – An On-Device Health App

The first deep dive is into **Sunny**, an iOS app built for a Kaggle competition that encourages structured self-skin examinations to aid in early skin cancer detection. Powered by a fine-tuned version of Google's **Med-Gemma** (called Sunny Med-Gemma), the app generates dermatologist-like notes from skin photos.

*   **Why an SLM?** The use case highlights the core SLM advantages: **Privacy** (photos never leave the device), **offline use**, **low latency**, and **zero inference cost** after the initial training investment. Bourke contrasts this with a hypothetical API-based rollout costing tens of thousands of dollars for millions of images.

*   **Hardware & Optimization:** Deploying on an iPhone required hardware-aware optimization. The vision component runs on the Neural Processing Unit (NPU) for fast image processing, while the language model runs on the GPU. The original 4-billion parameter Med-Gemma model was **quantized from 8GB (float16) down to ~3.5GB (4-bit)** to fit comfortably in phone memory.

*   **The Fine-Tuning Pipeline:** The Sunny pipeline involved creating a synthetic dataset of skin images labeled by Gemini, uploading to **Hugging Face Datasets**, fine-tuning with **Hugging Face TRL** (Transformers Reinforcement Learning), and deploying to the phone using **Swift Transformers** and **Apple's MLX**. Fine-tuning itself took only about 15 minutes; the real work was in data curation.

### The Landscape of SLMs and Hardware Considerations

Bourke surveys the exciting SLM ecosystem, noting that open-source model performance is accelerating rapidly. He cites **Qwen 3.5 4B** as a model that benchmarks competitively with GPT-4 and can run on a MacBook. The research trend, highlighted by a Jeff Dean quote, is toward **"go large on parameters, but go hard on precision"**—using many low-precision parameters can be more effective than fewer high-precision ones for a given compute budget.

This leads to a discussion of the "knobs" for SLMs: **training data quality**, **hardware optimization** (NPU vs. GPU), and **model footprint optimization** via quantization. He reiterates that fine-tuning for a specific task allows for shorter prompts, which reduces memory usage (via a smaller KV cache) and increases stability, especially after quantization.

### Live Fine-Tuning Demonstration: "Who's Here"

In the core interactive segment, Bourke live-fine-tunes a **Gemma 3 270M** parameter model (100x smaller than the largest Gemma 3) to create a "Who's Here" assistant for the meetup. The goal: input an attendee's name, output a brief bio sourced from public LinkedIn data.

*   **The Process:** Using a **Google Colab** notebook with a high-end GPU (Nvidia RTX Pro 6000), he loads the base model, a custom dataset of ~8,000 synthetic Q&A pairs generated by another model (GPT-OSS 12B), and uses the **SFT Trainer** from the TRL library.

*   **Rapid Results:** The fine-tuning completes in roughly **100 seconds**. Before-and-after comparisons are stark: the base model gives generic, often incorrect biographies (e.g., "Daniel Bourke is a cyber security expert"), while the fine-tuned model outputs specific, structured details scraped from LinkedIn.

*   **Hallucinations and Iteration:** The demo also reveals limitations—the fine-tuned model sometimes **hallucinates details** (e.g., wrong company names) because it learned the output structure but not factuality. Bourke explains this is a weakness of using fine-tuning alone for factual recall; a **Retrieval-Augmented Generation (RAG)** system would be the next step. The workflow emphasizes iteration: create dataset -> fine-tune -> evaluate -> improve dataset.

### Deployment, Conclusions, and Q&A

Bourke shows the fine-tuned model running locally on an iPhone (in airplane mode) via an MLX-converted version, demonstrating fast, offline inference. He concludes with a haiku: "Small model, big punch. Train your own or hire me."

The Q&A covers practical topics: the importance of crafting a representative test set, updating models in production, the suitability of SLMs for different modalities (text excellent, vision good, speech growing), and techniques for improving model outputs through prompt engineering with examples. He frames the choice simply: need privacy/offline/own compute? Use a custom SLM. Need the most powerful model for a one-off? Use an API.

## Context

Daniel Bourke is a machine learning engineer, instructor with over 250,000 students, and founder who specializes in building and deploying practical, on-device AI models. His expertise lies at the intersection of consumer hardware constraints and machine learning optimization. This talk, delivered at a meetup, contributes to the crucial and fast-moving conversation about the democratization of AI. As large language model APIs become expensive and raise privacy concerns, and as consumer hardware (Apple Silicon, mobile NPUs) becomes more powerful, the feasibility and advantages of small, customized models are exploding. This content is highly relevant for developers, data scientists, product managers, and business leaders evaluating AI strategy—anyone considering how to implement AI features that are private, cost-effective, and reliable. The full video is invaluable for its blend of high-level strategy, detailed case study breakdown, and a rare, unedited live coding demonstration that demystifies the fine-tuning process.
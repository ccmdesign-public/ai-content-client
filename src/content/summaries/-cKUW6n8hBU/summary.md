---
metadata:
  videoId: "-cKUW6n8hBU"
  title: "DSPy: The End of Prompt Engineering - Kevin Madura, AlixPartners"
  description: "Applications developed for the enterprise need to be rigorous, testable, and robust. The same is true for applications that use AI, but LLMs can make this challenging. In other words, you need to be able to program with LLMs, not just tweak prompts. In this talk we'll cover why DSPy really is all you need in building applications with LLMs. We'll dive into real-world examples where we have successfully automated manual work using an opinionated DSPy-first approach to structuring applications, covering everything from simple modules to using SoTA optimizers to measurably improve performance.


    https://x.com/kmad/



    **Summary**

    Kevin Madura, a consultant at AlixPartners, argues that building robust enterprise AI applications requires shifting from brittle \"prompt engineering\" to \"programming with LLMs\" using **DSPy**. He contends that prompts should be treated as implementation details optimized by the system, while developers focus on defining typed interfaces (Signatures) and modular logic (Modules). The session moves from a conceptual overview of DSPy's primitives—Signatures, Modules, Adapters, and Optimizers—to a live code walkthrough. Madura demonstrates real-world use cases, including a complex pipeline that routes files by type (SEC filings vs. contracts) and a \"boundary detector\" that uses visual layout to segment legal documents. The talk concludes with a demonstration of how Optimizers (like MIPRO) can automatically tune these programs to outperform manual baselines, followed by a Q&A on production costs and feedback loops.


    **Timestamps**


    00:00 Introduction & The Enterprise AI Challenge

    07:12 The 6 Core Concepts of DSPy (Signatures, Modules, Adapters)

    13:23 Deep Dive: Class-based vs. Shorthand Signatures

    19:57 Adapters: Controlling the Prompt Format (JSON vs. BAML)

    24:17 Optimizers: The \"Killer Feature\" for Transferability

    31:08 Code Walkthrough: Setup & Model Mixing

    36:24 Handling Documents: \"Poor Man's RAG\" with Attachments

    42:10 Adapter Comparison: Improving Token Efficiency with BAML

    47:20 Optimizers in Practice: Creating Datasets & Metrics

    51:13 Complex Pipeline: Routing & Classifying Arbitrary Files

    56:00 Advanced Use Case: PDF Boundary Detection via Visuals

    01:01:22 Analyzing Optimization Results & The \"DSPy Hub\" Concept

    01:09:02 Q&A: Handling Delayed Feedback & Online Learning

    01:13:00 Conclusion"
  channel: "AI Engineer"
  channelId: "UCLKPca3kwwd-B59HNr-_lvA"
  duration: "PT1H13M13S"
  publishedAt: "2026-01-08T20:48:21Z"
  thumbnailUrl: "https://i.ytimg.com/vi/-cKUW6n8hBU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=-cKUW6n8hBU"
processedAt: "2026-01-11T17:17:49.401Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Kevin Madura argues that DSPy represents a paradigm shift from manual prompt engineering to a systems-oriented programming approach. By using declarative Signatures, Modules, and Optimizers, developers can build modular, model-agnostic AI programs. The key insight is that DSPy treats LLMs as first-class functions, enabling programmatic optimization that can rival or exceed fine-tuning."
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 16032
  outputTokens: 1407
  totalTokens: 18537
  processingTimeMs: 18769
tools:
  - name: "DSPy"
    url: "https://github.com/stanfordnlp/dspy"
  - name: "BAML"
    url: null
  - name: "MIPRO"
    url: null
  - name: "JEPA"
    url: null
  - name: "Attachments"
    url: null
  - name: "Phoenix"
    url: null
  - name: "Pydantic"
    url: null
  - name: "DSPy Hub"
    url: null
  - name: "LangChain"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "architecture"
  - "best-practices"
  - "llm"
  - "model-training"
  - "prompt-engineering"
  - "python"
tagsNormalizedAt: "2026-03-01T21:19:30.366Z"
---

## Key Takeaways

Kevin Madura presents DSPy as a robust framework for technical consultants and engineers to move away from the fragile 'vibes-based' approach of manual prompting toward a reproducible systems mindset.

* **Declarative Signatures** allow developers to define 'what' a program should do (inputs and outputs) rather than 'how' to prompt for it, deferring implementation to the framework.

* **Modules** like `Predict`, `Chain

OfThought`, and `Re

Act` provide high-level abstractions for common prompting techniques, making programs highly composable and readable.

* **Optimizers** (such as JEPA) programmatically refine prompts based on metrics and datasets, allowing a program optimized on a large model to retain high performance on smaller, cheaper models.

* **Adapters** decouple the program logic from the output format (JSON, XML, BAML), allowing developers to switch formatting strategies with a single line of code to improve token efficiency and accuracy.

* **Multi-modality** is integrated natively, enabling seamless transitions between processing text, images, and PDFs within a single logical flow.

## Summary

### The Transition from Prompting to Programming

Kevin Madura opens the session by defining **DSPy** as a declarative framework for building modular software where LLMs are treated as first-class citizens. He contrasts traditional AI development—which often involves manual string manipulation and 'tweaking' prompts—with the **systems mindset** advocated by DSPy creator Omar Khattab. The core goal of DSPy is to allow engineers to express their intent through code that remains robust even as underlying models or paradigms shift. By using a modular structure inspired by Py

Torch, DSPy enables developers to build complex programs that are transferable across different model providers like OpenAI, Anthropic, and Google.

### Core Primitives: Signatures, Modules, and Adapters

Madura breaks down the framework into several essential primitives that simplify the development lifecycle. **Signatures** are the most fundamental piece; they are declarative specifications of a task's inputs and outputs. These can be defined using shorthand strings or structured **Pydantic** classes. Interestingly, the field names and descriptions in these classes act as 'mini-prompts' that the framework uses to communicate intent to the LLM. 

**Modules** act as the logical containers for these signatures. Madura highlights several built-in modules that implement standard prompting techniques, such as `dspy.Chain

OfThought` for reasoning and `dspy.Re

Act` for tool-calling. This modularity allows developers to swap a simple prediction for a complex reasoning chain without rewriting their business logic. Furthermore, **Adapters** sit between the signature and the LLM call, handling the conversion of data into specific formats like **JSON**, **XML**, or **BAML**. Madura notes that switching to the BAML adapter can improve performance by 5-10% simply by providing a more token-efficient format for the model to digest.

### The Power of Programmatic Optimization

The most distinctive feature of DSPy is its use of **Optimizers** (formerly known as Teleprompters). Madura addresses the misconception that DSPy is just an optimizer; rather, it is a programming model that happens to be optimizable. Optimizers like **JEPA** use 'teacher' models to provide feedback to 'student' models, iteratively refining prompts to improve performance against a specific dataset and set of **Metrics**. 

Madura emphasizes that this process allows for massive cost reductions. A developer can build a high-performing system using a reasoning model like GPT-4o and then use an optimizer to 'compress' that performance into a smaller, cheaper model like Claude Haiku or Gemini Flash. By defining success quantitatively through metrics, the optimizer can find 'nooks and crannies' in model behavior that a human prompt engineer would likely miss.

### Real-World Demonstrations and Multi-Modality

The latter half of the talk focuses on practical code examples ranging from simple sentiment classifiers to complex document processing pipelines. Madura demonstrates a **multi-modal pipeline** using the 'Attachments' library to process SEC Form 4 filings and street infrastructure images.

* **Document Analysis:** Using a 'poor man's RAG' approach, Madura shows how DSPy can perform OCR on a PDF, classify the document type (e.g., contract vs. SEC filing), and extract structured data without manual template creation.

* **Boundary Detection:** One sophisticated example involves a module that detects section boundaries in long contracts. By passing page classifications into a second signature, the program uses self-reflection to identify start and end pages for specific schedules and exhibits.

* **Tool Integration:** Madura showcases a 'Bio Agent' that uses `Re

Act` to search the web and summarize professional backgrounds, demonstrating how external Python functions can be seamlessly integrated as tools within the DSPy ecosystem.

### Scaling and Observability

To manage the complexity of these programs, Madura recommends using observability tools like **Phoenix** by Arize for tracing and debugging. He notes that because DSPy programs are modular, they are easier to debug than monolithic prompts. Developers can inspect the 'trajectory' of a tool-calling agent or view the exact prompt generated by an adapter. Madura concludes by showcasing **DSPy

Hub**, a conceptual repository for sharing pre-optimized programs, suggesting that the future of AI development lies in reusable, compiled components rather than individual prompts.

## Context

Kevin Madura is a technical consultant at Alix

Partners, specializing in AI deployment and process improvement for legal and corporate clients. This talk was delivered at the AI Engineer conference, a premier event focusing on the practical application of LLMs in production environments. The presentation contributes to the growing 'LLM Compiler' movement, which seeks to move AI development from the 'Alchemist' stage of manual prompt tweaking to the 'Engineering' stage of reproducible, optimized software systems. This is particularly relevant for organizations looking to reduce API costs and improve system reliability by migrating complex workflows to smaller, open-source, or task-specific models. Developers, data scientists, and technical leaders interested in alternatives to frameworks like Lang

Chain will find this comprehensive analysis of DSPy's abstractions and optimization capabilities highly valuable.

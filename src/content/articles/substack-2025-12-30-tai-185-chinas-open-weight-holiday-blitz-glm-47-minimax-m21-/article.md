---
title: "TAI #185: China's Open-Weight Holiday Blitz; GLM 4.7, Minimax M2.1 & MAI-UI"
subtitle: "Also, Nvidia acquires Groq for $20bn, Meta buys Manus, and the first AI Lab IPO."
author: "Towards AI"
platform: "substack"
publicationName: "Towards AI"
url: "https://newsletter.towardsai.net/p/tai-185-chinas-open-weight-holiday"
publishedAt: "2025-12-30"
tags:
  - "ai-general"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.630Z"
---

# TAI #185: China's Open-Weight Holiday Blitz; GLM 4.7, Minimax M2.1 & MAI-UI

![](https://substackcdn.com/image/fetch/$s_!mTL8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6832de12-4f33-41e4-a137-3a97c58879d8_1100x220.png)

## What happened this week in AI by Louie

While US AI labs were relatively quiet for Christmas, this has been a frantic week for Chinese and open-source model releases with GLM 4.7, Minimax M2.1, and Tongyi MAI-UI all hitting the market. It has also been a massive week for AI M&A, signalling where the infrastructure battle is heading next. Nvidia has reportedly acqui-hired Groq for $20 billion. Groq is an AI chip competitor focused on the use of Static Random Access Memory (SRAM) for cost and inference speed, suggesting Nvidia is moving to consolidate its grip on the inference market as well as training. Meanwhile, Meta acquired Manus for approximately $2 billion. Manus is an LLM agent company focused on advanced tool use and enterprise cases, but does not train its own foundation models. This purchase fits perfectly into Meta’s strategy of owning the open stack application layer. Finally, following the release of GLM 4.7, Z.ai announced it will go public on January 8th in Hong Kong with plans to raise $560 million. This will be the first dedicated AI lab to go public and will offer a rare look into the real financials of a model builder.

![](https://substackcdn.com/image/fetch/$s_!9xDh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F58b06127-228e-41af-b9c5-8f34b16053e0_1600x893.png)

GLM 4.7 from Z.ai (Zhipu AI) has quickly positioned itself as a new capability leader in the open ecosystem. This is a large-scale Mixture-of-Experts (MoE) model evaluated with a 128,000 token context window. The defining features of this release are “Interleaved Thinking” and “Preserved Thinking.” These features allow GLM 4.7 to retain its reasoning chains across actions rather than resetting after every turn, which is critical for complex agentic workflows. The benchmarks are impressive. The model hit 85.7% on GPQA-Diamond and 42.8% on Humanity’s Last Exam (HLE) with tools. This HLE score represents a 12.4% leap over its predecessor. It appears Z.ai has optimized this model to sit right at the frontier of open weights by specifically targeting the complex planning capabilities usually reserved for closed models.

Minimax M2.1 takes a different approach, optimizing for the practical realities of software production rather than pure academic reasoning. It utilizes a leaner 229-billion-parameter MoE architecture designed for efficiency. While GLM chases the reasoning ceiling, Minimax is chasing the application layer. They introduced the VIBE benchmark (Visual & Interactive Benchmark for Execution) alongside the model to measure the actual visual and interactive quality of generated apps. The model scored an average of 88.6% on this test. It is explicitly tuned for multi-language programming and shows significant gains in Rust, Go, C++, and Python. With a focus on “composite instruction constraints,” it is built to act as a reliable worker in office and coding scenarios where following strict formatting rules matters more than philosophical creativity.

Alibaba’s Tongyi group took a sharp turn away from standard text generation with MAI-UI. This is a family of models ranging from 2 billion to 235 billion parameters designed specifically as “Foundation Graphical User Interface (GUI) Agents.” These models are trained to look at a screen and click buttons rather than interact via APIs. The architecture uses a novel device-cloud collaboration system that routes simple tasks to a small on-device model and escalates complex reasoning to the cloud. The technical report suggests this hybrid approach delivers better on-device performance while reducing expensive cloud calls. On the AndroidWorld benchmark, its largest model achieved a 76.7% success rate. We are moving closer to agents that can reliably operate your phone for you.

We also took a close look at the independent benchmarks from Artificial Analysis this week. On the Intelligence Index, GLM 4.7 scores a 68. This makes it the highest-rated open-weight model in this specific cutoff. It sits within striking distance of proprietary giants like Claude Opus 4.5 (70) and Gemini 3 Pro (73). It also comfortably beats its open-source peer Minimax M2.1, which scored a 64. However, the Cost Efficiency data reveals why you might choose Minimax. Running the Artificial Analysis benchmark suite on Minimax M2.1 costs just ~$128. This compares to ~$334 for GLM 4.7. To put that in perspective, running the same evaluations on Claude Opus 4.5 costs nearly $1,500. Minimax is the winner if you need 90% of the performance for 10% of the price. The one area where both Chinese open models stumble is the Omniscience (Hallucination) Index. Both GLM 4.7 (-36) and Minimax M2.1 (-33) scored significantly lower than Google’s Gemini 3 series (+13). This indicates that a “grounding gap” remains. These open models are brilliant reasoners, yet they are significantly more prone to confident fabrication than the best US proprietary models.

* * *

* * *

### Why should you care?

The “Intelligence Gap” is officially closing; however, the “Safety Gap” is widening. GLM 4.7 scoring a 68 on the Intelligence Index puts it within margin-of-error distance of Claude Opus 4.5. This means that for pure reasoning tasks, open-weight models are now a viable alternative to the most expensive APIs. However, the hallucination data from Artificial Analysis is a wake-up call. The trade-off for free, downloadable intelligence is currently reliability. Enterprises can now get close to frontier reasoning via open weight models, but they will need to build their own robust verification systems to prevent these models from confidently lying. The moat for closed labs is shifting from intelligence to trustworthiness. These open-weight architectures are also not straightforward to inference internally, particularly at high enough GPU utilisation rates to make them affordable.

We are seeing a bifurcation in the open-source market between “Thinkers” and “Doers.” Z.ai is clearly positioning GLM 4.7 as a “Thinker.” It is a heavy, Video Random Access Memory (VRAM) hungry model designed for complex multi-step reasoning and maintaining context chains. Minimax M2.1 is expanding as the “Doer” and is optimized for coding, UI generation, and speed. This is great news for builders who need to use open models. You can route complex planning tasks to GLM and high-volume execution or coding tasks to Minimax. This optimizes your own inference budget in a way that was not possible six months ago.

The release of MAI-UI signals that the “Agent” conversation is moving from chat interfaces to direct GUI manipulation. We have spent two years trying to get LLMs to call APIs. Alibaba and many others are now betting that it is easier to teach an AI to use existing apps than it is to rewire the entire internet with APIs. This “device-cloud” collaboration architecture bypasses the need for every software vendor to build an agent SDK if it works. The AI simply looks at the screen like a human does. It is a fragile approach, but it instantly unlocks automation across millions of existing legacy apps that will never have an API.

*— [Louie Peters — Towards AI Co-founder and CEO](http://www.linkedin.com/in/louie-peters)*

* * *

##### **The AI Trends That Will Matter in 2026 (and How to Prepare for Them)**

In this end-of-year reflection post, we break down what it will take to build systems that are reliable, governable, and affordable, and what does that actually require in practice? We will go from the fundamentals that fail first (context and retrieval) to the constraints that decide whether anything ships (verification, governance, portability, and cost).

[Read the complete article here!](https://medium.com/towards-artificial-intelligence/the-ai-trends-that-will-matter-in-2026-and-how-to-prepare-for-them-9f44321110c1)

* * *

### Hottest News

1\. [Z.ai Released GLM 4.7](https://z.ai/blog/glm-4.7)

Z.ai released GLM-4.7, reporting gains over GLM-4.6 on coding-agent and terminal benchmarks, including 73.8% on SWE-bench (+5.8), 66.7% on SWE-bench Multilingual (+12.9), and 41.0% on Terminal Bench 2.0 (+16.5). The model adds “thinking” features intended for longer-horizon work: interleaved thinking before responses and tool calls, preserved thinking to retain reasoning blocks across multi-turn coding-agent sessions, and turn-level control to enable or disable thinking based on task complexity. Z.ai also highlights improved UI generation (“vibe coding”), cleaner webpages, and better-looking slides with more accurate layout and sizing, alongside stronger tool-use performance on benchmarks such as τ²-Bench and BrowseComp. GLM-4.7 is accessible in Z.ai chat, via the Z.ai API platform (with documentation), through OpenRouter, and for local serving via publicly available weights on Hugging Face and ModelScope with support for vLLM and SGLang.

2\. [Groq and Nvidia Enter Non-Exclusive Inference Technology Licensing Agreement](https://groq.com/newsroom/groq-and-nvidia-enter-non-exclusive-inference-technology-licensing-agreement-to-accelerate-ai-inference-at-global-scale)

Groq announced a non-exclusive licensing agreement with NVIDIA covering Groq’s inference technology, aimed at expanding access to high-performance, low-cost inference at a global scale. Under the agreement, Groq founder Jonathan Ross, president Sunny Madra, and other team members will join NVIDIA to help advance and scale the licensed technology, while Groq continues operating independently, with Simon Edwards stepping in as CEO. Groq also said that GroqCloud will continue to operate without interruption, and developers can access Groq via the Groq console, including a free API key and documentation.

3\. [MiniMax Releases M2.1](https://www.minimax.io/news/minimax-m21)

MiniMax announced MiniMax M2.1, an update aimed at better performance on complex, real-world tasks, with a focus on multi-language programming beyond Python (including Rust, Java, Go, C++, Kotlin, Objective-C, TypeScript, and JavaScript). The release highlights improved native Android and iOS development, stronger design/aesthetic output for web and app work (including complex interactions and visualization), and more reliable handling of “composite instruction constraints” for office scenarios. MiniMax also produces faster, more concise outputs with reduced token consumption and offers strong compatibility with popular coding-agent tools and agent frameworks. Access is available via the MiniMax Open Platform API, through the publicly available MiniMax Agent product, and via open-sourced model weights on Hugging Face for local deployment.

4\. [InstaDeep Introduces Nucleotide Transformer v3 (NTv3): A New Multi-Species Genomics Foundation Model](https://instadeep.com/research/paper/a-foundational-model-for-joint-sequence-function-multi-species-modeling-at-scale-for-long-range-genomic-prediction/)

InstaDeep introduces Nucleotide Transformer v3 (NTv3), a multi-species foundation model for long-range genomic prediction, where regulatory dependencies can span hundreds of kilobases to megabases. NTv3 is designed to unify representation learning, functional-track and genome-annotation prediction, and controllable sequence generation in a single backbone, using a U-Net–like architecture intended to support single-base tokenization and contexts up to ~1 Mb. The model is pretrained on 9 trillion base pairs from OpenGenome2, then post-trained with a joint objective combining continued self-supervision and supervised learning over ~16,000 functional tracks/annotation labels across 24 animal and plant species.

### Five 5-minute reads/videos to keep you learning

1\. [Fine-Tuning Qwen for Image-Text-to-Text Task on a Single T4 GPU Using Unsloth and TRL](https://pub.towardsai.net/fine-tuning-qwen-for-image-to-text-extraction-on-a-single-t4-gpu-using-unsloth-and-trl-15918f6899c9)

This article provides a practical guide for fine-tuning a Qwen vision-language model to extract structured text from technical images. The entire process is designed for a single T4 GPU, leveraging Unsloth, QLoRA, and 4-bit quantization to manage memory constraints. It details the steps for preparing a computer-science-focused dataset, formatting it into a conversational style, and training the model using TRL. It also provides instructions on merging the trained adapters, uploading the final model to Hugging Face, and running inference.

2\. [Thinking in Diffusion, Talking in Auto-Regression (TiDAR)](https://pub.towardsai.net/thinking-in-diffusion-talking-in-auto-regression-tidar-c3ffb9361351)

This analysis reviews the evolution of language model decoding, highlighting the memory-bound inefficiency of standard autoregressive (AR) methods. It details TiDAR, a technique that synthesizes AR guarantees with diffusion-style parallelism to enhance performance. TiDAR uses a single model to simultaneously verify previously drafted tokens and generate new draft tokens in parallel during a single forward pass. The result is a significant increase in generation speed without reducing output quality, addressing a core bottleneck in modern inference.

3\. [Towards Streaming Video Diffusion](https://pub.towardsai.net/towards-streaming-video-diffusion-367494c8d4a7)

A significant challenge for real-time video generation is “error accumulation,” in which models degrade over continuous, frame-by-frame creation. This summary explains the progression from this initial problem to practical solutions. It details how Diffusion Forcing helps models self-correct by using noise to manage uncertainty, and how Model Distillation trains smaller, faster “student” models for causal generation. It also highlights applications such as LiveAvatar and Talking Machines, which combine these techniques to enable high-speed streaming, making real-time conversational avatars and other continuous video applications more feasible.

4\. [Reflexive Memory: A CPU-Only Alternative to Transformers For Streaming Forecasting](https://pub.towardsai.net/reflexive-memory-a-cpu-only-alternative-to-transformers-for-streaming-forecasting-45efc12e383c)

To address the limitations of deep learning in real-time environments, this article explores DriftMind, a CPU-only framework for streaming forecasting. The system operates without pretraining, using online clustering and structural memory to identify and reuse behavioral patterns from incoming data. It processes each observation once, building Temporal Transition Graphs to make predictions based on similar past sequences. When benchmarked against the OneNet deep learning model, DriftMind delivered comparable predictive accuracy while being orders of magnitude faster and more computationally efficient

5\. [Think Visually, Reason Textually: How Vision Language Synergy is Pushing AI Toward Human-Like Intelligence](https://pub.towardsai.net/think-visually-reason-textually-how-vision-language-synergy-is-pushing-ai-toward-human-like-ee10f435d003?sk=d5adaac1b2f726736776b486764c4bd7)

A recent study addresses AI’s difficulty with the Abstraction and Reasoning Corpus (ARC) puzzles, which require human-like intuition. Researchers found that combining visual and textual reasoning improves performance. The proposed method uses visual data to identify a puzzle’s overall rule, then switches to a textual representation to apply it with precision. A self-correction technique allows the AI to visually review its text-based solution and fix errors. This synergistic approach boosted accuracy and enabled a smaller model to outperform a larger one, highlighting the importance of multimodal reasoning for developing more versatile AI systems.

### Repositories & Tools

1\. [A2UI](https://github.com/google/A2UI/) is an open standard and implementation that allows agents to speak UI.

2\. [Qwen-Image-Layered](https://github.com/QwenLM/Qwen-Image-Layered) is an open-source image model that treats images less like flat pictures and more like editable projects.

3\. [Perception Models](https://github.com/facebookresearch/perception_models) are a new family of encoders for joint audio and video understanding.

4\. [Continuous Claude](https://github.com/parcadei/Continuous-Claude-v2) is a framework that saves state to a ledger, wipes context, and resumes fresh.

### Top Papers of The Week

1\. [Adaptation of Agentic AI](https://arxiv.org/abs/2512.16301)

This paper unifies the research landscape for agentic systems into a systematic framework. It decomposes these into tool-execution-signaled and agent-output-signaled forms of agent adaptation, as well as agent-agnostic and agent-supervised forms of tool adaptation. Researchers demonstrate that this framework helps clarify the design space of adaptation strategies in agentic AI, makes their trade-offs explicit, and provides practical guidance for selecting or switching among strategies during system design.

2\. [Gemma Scope 2 — Technical Paper](https://deepmind.google/blog/gemma-scope-2-helping-the-ai-safety-community-deepen-understanding-of-complex-language-model-behavior/)

This paper introduces Gemma Scope 2, a comprehensive suite of open sparse autoencoders (SAEs) and transcoders trained on all layers of the Gemma 3 model family to advance interpretability research. The release includes novel multi-layer architectures, such as crosscoders and cross-layer transcoders, designed to capture complex circuit-level interactions and behaviors spanning multiple transformer blocks.

3\. [NitroGen: An Open Foundation Model for Generalist Gaming Agents](https://nitrogen.minedojo.org/assets/documents/nitrogen.pdf)

NVIDIA AI research team released NitroGen, an open-source vision-action foundation model for generalist gaming agents that learns to play commercial games directly from pixels and gamepad inputs using internet video at scale. NitroGen is trained on 40,000 hours of gameplay across more than 1,000 games and comes with an open dataset, a universal simulator, and a pre-trained policy. The 4.93 × 10⁸ parameter model uses a SigLIP 2 vision encoder plus a DiT-based action head trained with conditional flow matching on 16-step action chunks, achieving robust control from noisy web-scale data.

4\. [INTELLECT-3: Technical Report](https://arxiv.org/abs/2512.16144)

This report introduces INTELLECT-3, a 106-billion-parameter Mixture-of-Experts model trained via a new scalable reinforcement learning framework called prime-rl, which supports asynchronous off-policy training and continuous batching. The model outperforms similar-sized open-source models on reasoning, math, and coding benchmarks, and the authors release the full training stack, including the model weights, the RL framework, and the environment library, to democratize large-scale agentic training.

5\. [Evaluating Chain-of-Thought Monitorability](https://openai.com/index/evaluating-chain-of-thought-monitorability/)

This paper studies how effectively a system can observe and interpret what a model is reasoning about internally, especially as modern models produce longer, explicit reasoning traces that developers increasingly use for oversight. The central finding is that monitoring the chain of thought provides substantially stronger visibility than evaluating final outputs alone, and the advantage increases as reasoning becomes more extensive. The work reframes the question from “what did the model do?” to “can a separate monitor model infer why it did it?” It introduces a benchmark suite that tests whether monitors can recover reasoning steps, detect behavioral shifts, and predict latent properties such as cheating.

### Quick Links

1\. [Meta is acquiring Manu](https://manus.im/blog/manus-joins-meta-for-next-era-of-innovation), the Chinese startup that went viral earlier this year after it released what it claimed was the world’s first general AI agent. Meta will operate and sell the Manus service and integrate it into its consumer and business products, including in Meta AI, the company said. The company will continue to sell and operate our product subscription service through our app and website.

2\. [Tongyi Lab introduces MAI-UI](https://tongyi-mai.github.io/MAI-UI/), a family of foundation GUI agents designed for real-world deployment, integrating agent-user interaction, external tool use via MCP, and a native device-cloud collaboration system. These agents establish new state-of-the-art performance in GUI grounding, achieving 73.5% accuracy on ScreenSpot-Pro with adaptive zoom-in and mobile navigation, with a 76.7% success rate on the AndroidWorld online benchmark.

### Who’s Hiring in AI

**[Generative AI and Agentic Optimization — Research Lab @IBM (Haifa, Israel)](https://jobs.towardsai.net/job/ibm-generative-ai-and-agentic-optimization-msc-and-phd-student-position-research-lab-fz1d)**

**[Software Engineer, AI Quality and Benchmarks @Google (Singapore)](https://jobs.towardsai.net/job/google-software-engineer-ai-quality-and-benchmarks-ce6d)**

**[AI Intern @Sopra Steria (Tunis, Tunisia)](https://jobs.towardsai.net/job/sopra-steria-ai-intern-benv)**

**[AI/ML engineer @Flo Health (London, UK)](https://jobs.towardsai.net/job/flo-health-ai-ml-engineer-qk4a)**

**[Senior AI/ML Developer @Oracle (Remote/USA)](https://jobs.towardsai.net/job/oracle-remote-senior-ai-ml-developer-trtb)**

**[Technical Team Lead — Web Development @CloudMoyo (Pune, India)](https://jobs.towardsai.net/job/cloudmoyo-technical-team-lead-web-development-microsoft-technologies-fo4o)**

*Interested in sharing a job opportunity here? Contact [sponsors@towardsai.net](mailto:sponsors@towardsai.net).*

*
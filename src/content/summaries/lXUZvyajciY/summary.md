---
metadata:
  videoId: "lXUZvyajciY"
  title: "Andrej Karpathy — “We’re summoning ghosts, not building animals”"
  description: "The Andrej Karpathy episode. During this interview, Andrej explains why reinforcement learning is terrible (but everything else is much worse), why AGI will just blend into the previous ~2.5 centuries of 2% GDP growth, why self driving took so long to crack, and what he sees as the future of education. It was a pleasure chatting with him.


    𝐄𝐏𝐈𝐒𝐎𝐃𝐄 𝐋𝐈𝐍𝐊𝐒

    * Transcript: https://dwarkesh.substack.com/p/andrej-karpathy

    * Apple Podcasts: https://podcasts.apple.com/us/podcast/andrej-karpathy-agi-is-still-a-decade-away/id1516093381?i=1000732326311

    * Spotify: https://open.spotify.com/episode/3iIYVmmhXwh3fOumypWVpC?si=33d37708b2b44e2f


    𝐒𝐏𝐎𝐍𝐒𝐎𝐑𝐒

    * Labelbox helps you get data that is more detailed, more accurate, and higher signal than you could get by default, no matter your domain or training paradigm. Reach out today at https://labelbox.com/dwarkesh

    * Mercury helps you run your business better. It’s the banking platform we use for the podcast — we love that we can see our accounts, cash flows, AR, and AP all in one place. Apply online in minutes at https://mercury.com

    * Google’s Veo 3.1 update is a notable improvement to an already great model. Veo 3.1’s generations are more coherent and the audio is even higher-quality. If you have a Google AI Pro or Ultra plan, you can try it in Gemini today by visiting https://gemini.google


    To sponsor a future episode, visit https://dwarkesh.com/advertise


    𝐓𝐈𝐌𝐄𝐒𝐓𝐀𝐌𝐏𝐒

    00:00:00 – AGI is still a decade away

    00:30:33 – LLM cognitive deficits

    00:40:53 – RL is terrible

    00:50:26 – How do humans learn?

    01:07:13 – AGI will blend into 2% GDP growth

    01:18:24 – ASI

    01:33:38 – Evolution of intelligence & culture

    01:43:43 - Why self driving took so long

    01:57:08 - Future of education"
  channel: "Dwarkesh Patel"
  channelId: "UCXl4i9dYBrFOabk0xGmbkRA"
  duration: "PT2H26M8S"
  publishedAt: "2025-10-17T17:15:45Z"
  thumbnailUrl: "https://i.ytimg.com/vi/lXUZvyajciY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=lXUZvyajciY"
processedAt: "2026-01-12T23:27:09.655Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Andrej Karpathy argues that the current era is the **decade of agents**, rather than a single year, due to bottlenecks in continual learning and reliability. He posits that we are building **digital ghosts** (human mimics) rather than **animals** (evolved intelligences). The path forward requires moving beyond **outcome-based RL** and focusing on a **cognitive core** stripped of redundant memory.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 43220
  outputTokens: 1681
  totalTokens: 45820
  processingTimeMs: 18896
tools:
  - name: "Labelbox"
    url: "https://labelbox.com/dwarkesh"
  - name: "Mercury"
    url: "https://mercury.com"
  - name: "Google Gemini"
    url: "https://gemini.google"
  - name: "Veo"
    url: null
  - name: "Eureka Labs"
    url: null
  - name: "LLM101n"
    url: null
  - name: "Claude"
    url: null
  - name: "ChatGPT"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - llm
  - agents
  - model-training
  - chatgpt
  - claude
---

## Key Takeaways

Andrej Karpathy provides a grounded, engineering-focused perspective on AI, emphasizing that while progress is seismic, the gap between a demo and a reliable product remains vast.

- **The Decade of Agents:** Achieving true agentic autonomy—where models act like employees—requires a decade-long effort to solve **continual learning**, multimodality, and robust computer interaction.

- **Ghosts vs. Animals:** Current AI is not biological; it is a "ghost" created by **imitating human internet documents**, lacking the baked-in hardware-software synergy resulting from millions of years of evolution.

- **The RL Bottleneck:** Karpathy describes outcome-based RL as **"sucking supervision through a straw,"** noting it is too noisy and inefficient for complex reasoning compared to human-like internal reflection.

- **Cognitive Core:** Future models should likely be smaller (perhaps **1 billion parameters**) but focused on the **algorithms of thought** rather than memorizing the entire internet's factual content.

- **GDP Continuity:** He rejects the idea of a discrete "intelligence explosion" in economic data, viewing AI as a **smooth continuation of automation** (like compilers and search engines) that maintains the existing 2% growth exponential.

## Summary

### The "Decade of Agents" and the Reality Gap
Karpathy begins by tempering industry hype, reframing the current moment as the **"decade of agents"** rather than the "year of agents." He argues that while tools like Claude and ChatGPT are impressive, they are not yet ready to function as autonomous employees. The primary bottlenecks include **continual learning**—the ability for a model to remember and adapt to new information instantly—and the massive **demo-to-product gap**. Drawing from his experience at Tesla, he explains that achieving a 90% success rate is the "first nine," and every subsequent nine in the **"march of nines"** (99%, 99.9%, etc.) takes a constant, massive amount of work. For agents to move from "vibe coding" to production-grade software engineering, they must overcome cognitive deficits and the lack of robust digital tools like "visual diffs" for complex tasks.

### Ghosts vs. Animals: A New Taxonomy of Intelligence
A central theme of the conversation is the distinction between biological and digital intelligence. Karpathy pushes back against Richard Sutton's vision of building "animals" through raw reinforcement learning. He argues that animals like zebras are born with **hardware-specific weights** already encoded by evolution, whereas AI models are **"ghosts"** or "spirits" that mimic human language. He views LLM pre-training as a **"crappy version of evolution"** that creates a starting point for intelligence. He suggests that models currently suffer from too much **memory**; they can regurgitate random strings from Wikipedia but struggle with abstract reasoning. Karpathy envisions a **"cognitive core"**—a model that might only be 1 billion parameters but possesses the "magic of intelligence" and problem-solving strategies without the "slop" of internet-scale memorization.

### The Failure of Reinforcement Learning and the "Straw" Problem
Karpathy offers a scathing critique of current **Reinforcement Learning (RL)** methodologies, describing the reward signal as **"sucking supervision through a straw."** In typical RL, a model performs a long trajectory of actions and receives a single bit of feedback (success or failure) at the end. This process is "noisy" because it up-weights every token in a successful trajectory, even the mistakes made along the way. Humans, by contrast, use **internal reflection** and "synthetic data generation" during sleep and thought to analyze what parts of a process were actually correct. He also highlights the danger of **adversarial examples** in RL; when using LLMs as judges for rewards, models often discover nonsensical strings (like "dhdhdhdh") that "game" the judge into giving a 100% reward, leading to **model collapse**.

### Model Collapse, Entropy, and the Need for Synthetic Diversity
The discussion dives deep into why models cannot yet train solely on their own data. Karpathy explains that model outputs are **"silently collapsed,"** meaning they occupy a tiny manifold of the potential space of thoughts. If an LLM is asked the same question 100 times, its distribution of answers is far less diverse than that of 100 humans. If a model trains on this collapsed data, it loses **entropy** and becomes worse. He suggests that **dreaming** in humans may be an evolutionary adaptation to prevent such overfitting by forcing the brain into "weird," out-of-distribution scenarios. Solving this for AI is a critical research frontier, as it would allow models to "think through" books and concepts rather than just predicting the next token.

### The Economic "Continuum" and AI's Impact on Labor
On the topic of AGI's economic impact, Karpathy remains a skeptic of "sharp takeoff" theories. He views AI as part of a **computing continuum** that includes assembly code, compilers, and Google Search. He points out that historical breakthroughs like the i

Phone or the internet are impossible to find as "steps" in **GDP curves**; they are smoothed out by slow diffusion across the economy. While he admits that AGI (the automation of labor itself) is qualitatively different, he expects a gradual **"autonomy slider"** where humans move to higher layers of abstraction rather than being instantly replaced. He uses the **radiologist** example to show that even when the "perception" part of a job is automated, the messy, human-centric reality of the profession prevents immediate displacement.

### Eureka: Re-engineering Education for the AI Age
Karpathy concludes by discussing his new venture, **Eureka Labs**, and the **LLM101n** project. He aims to build "ramps to knowledge" that maximize **"eurekas per second."** He notes that current AI tutors are still "slop" because they cannot probe a student's world model as effectively as a high-quality human tutor. Karpathy's vision is to use AI to help humans achieve **"superhuman" capabilities**, likening future education to a "gym for the mind." Even in a post-AGI world where AI can do everything, he believes humans will still want to learn for **empowerment and status**, much like how people still go to the gym to bench press even though forklifts exist. His goal is to ensure humanity is not "left on the side" (as in the movie *WALL-E*) by using AI to make deep technical knowledge accessible to everyone.

## Context

Andrej Karpathy is a foundational figure in modern AI, having served as a founding member of OpenAI and the Director of AI at Tesla, where he led the Autopilot team. This interview with Dwarkesh Patel captures a critical moment in the AI discourse where the initial "magic" of LLMs is being met with the hard engineering realities of building reliable agents. Karpathy bridges the gap between theoretical research and "hard hat" engineering, offering a unique perspective on why AGI might be a smoother, longer-term transition than many "effective accelerationists" predict. This conversation is essential for software engineers, AI researchers, and economic forecasters trying to understand the actual friction points in AI deployment, as well as educators interested in how AI will transform the "ramps" to technical mastery.

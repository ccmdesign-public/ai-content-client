---
title: "Nadine, A Social Robot"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/nadine-a-social-robot-1ac757c38ccc?source=rss----98111c9905da---4"
publishedAt: "2026-03-22"
tags:
  - "ai-general"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-23T14:40:54.897Z"
---

# Nadine, A Social Robot

Picture walking into your own room after a long day, where a companion not only knows your name but remembers you mentioned feeling overwhelmed just last week. It detects your frown, softens its tone in empathy, and leans in to listen. This is the reality of **Nadine**, a social robot powered by Large Language Models that has moved beyond simple task planning to become a genuine emotional companion.

![Image of Nadine, A Social Robot from Hackaday](https://cdn-images-1.medium.com/max/194/0*cJ2GTwB7UasnLZof)

### Current Landscape

For years, robotics research focused on utility. Projects like *SayCan* used AI to plan tasks, such as “pick up the apple.” While impressive, these systems lacked soul. They operated on common-sense reasoning but failed in roles requiring sensibility, like elderly care or psychological support. A robot that cannot detect anger or recall a past conversation feels cold and mechanical.

The industry is now shifting from basic utility to **deep contextual understanding**. The goal is no longer just to answer questions but to build raw human connection. However, this transition faces significant hurdles.

### The Hard Truth: Hardware and Software

Building a feeling robot is a logistical nightmare.

-   **Hardware Constraints:** You need precise sensors. Nadine uses a Microsoft Kinect V2 for 3D skeleton tracking and RGB cameras for facial recognition. If the lighting is poor or the microphone array fails to isolate speech from background noise, the whole system breaks.
-   **Software Constraints:** The real beast is **latency**. Processing video, converting speech to text, querying a database, generating an emotional response, and animating a face must happen in seconds. Any lag destroys the illusion of life.

> *Note: To combat this, the system uses* ***asynchronous retrieval*** *and optimized chunk sizes, accepting a slight trade-off in instantaneity for massive gains in contextual relevance.*

-   **Seamless Integration:** The biggest challenge isn’t one module working; it’s making the perception, interaction, and control modules talk to each other without stuttering.

### Inside the Mind of Nadine

Nadine’s architecture relies on three seamless modules: **Perception**, **Interaction**, and **Control**.

![Image of System Architecture of Nadine from NADINE: AN LLM-DRIVEN INTELLIGENT SOCIAL ROBOT WITHAFFECTIVE CAPABILITIES AND HUMAN-LIKE MEMORY](https://cdn-images-1.medium.com/max/711/1*v-guJGoAeZyEP108g62_SA.png)

#### 1\. Perception: The Senses

This is the input layer. Using depth cameras and microphones, Nadine tracks your skeleton and identifies your face using the **DeepFace** framework. If you’ve met before, she assigns you a unique User\_ID. Crucially, she detects your emotion in real-time. If you look angry, the system flags it immediately.

#### 2\. Interaction: The Brain (SoR-ReAct)

This is where the **core cognitive processing** occurs. Nadine operates on a novel framework called **SoR-ReAct** (Social Reasoning — Reasoning and Acting). Unlike standard chatbots that rely on static prompts, SoR-ReAct **dynamically constructs** a unique prompt for every interaction turn. This ensures the robot maintains deep contextual awareness and emotional consistency. The prompt is assembled from five critical data blocks:

1.  **Instructions:** Defines the robot’s specific role (e.g., museum guide, bank teller) and its persistent **Big-Five personality traits**.
2.  **Context:** The immediate **short-term conversation history** (the last few exchanges) to maintain conversational flow.
3.  **Static Knowledge:** Retrieved facts from **domain-specific databases** (e.g., exhibit details, financial policies, or medical guidelines) via RAG.
4.  **Episodic Memory:** Retrieved records of **unique past interactions** linked to the specific user’s ID, enabling long-term relationship building.
5.  **State Data:** Real-time metadata, including the **user’s detected emotion** (from the Perception Module) and the **robot’s current internal mood** (calculated by the Affective System).

![Image of SoR-ReAct Prompt Structure from Nadine’s Paper](https://cdn-images-1.medium.com/max/727/1*0mRp_Vvd5VgjM_8kFSpZBg.png)

> *Note: If the LLM lacks real-time data, it pauses reasoning to execute* ***Tool Calls*** *(e.g., querying Weather APIs or Google Search), integrates the result, and then generates a factually grounded response.*

#### **The Memory Trick**

Storing memory is tricky. Static facts (like FAQs) use **fixed chunking**. But conversations are messy. Nadine uses a **sliding window strategy**, storing every five back-and-forth turns as a segment with an overlap of one interaction. This ensures context is never cut off mid-thought.

![Image of Difference between rigid static memory and fluid conversational memory Generated via Nano Banana](https://cdn-images-1.medium.com/max/1024/1*NhBEsWQTSGjDpqTerOZrnQ.jpeg)

Before searching memory, a “Contextualizer” rewrites your query. If you say, “Tell me about *him*,” the system rewrites it to “Tell me about *Albert Einstein*” based on chat history before searching the vector database.

#### **The Emotional Engine**

Nadine doesn’t just fake emotions; she simulates them using the **PAD space** (Pleasure-Arousal-Dominance). Her personality (based on the Big-Five traits) acts as a filter. If Nadine is in a “neurotic” mood, a small negative event triggers a massive emotional drop. This mathematical model ensures her reactions feel consistent and human-like.

![Image of 3D mathematical model of emotion and how personality traits act as a filter Generated via Nano Banana](https://cdn-images-1.medium.com/max/1024/1*RCe0ezQRDVc2JC2--QtK9Q.jpeg)

**Terminology**

1.  *Neurotic Mood: A persistent internal state that amplifies negative reactions, causing the robot to respond more intensely to bad events than a stable personality would.*
2.  *Vector Database: A storage system that saves information as mathematical coordinates, allowing the robot to search for meaning and context rather than just matching exact keywords.*
3.  *PAD: A three-number coordinate system (Positive/Negative, Calm/Excited, In-Control/Overwhelmed) used to mathematically calculate and blend complex emotional states.*

#### 3\. Control: The Body

Once the brain decides to be empathetic, the Control Module takes over. It generates **visemes** (lip shapes) for perfect synchronization with speech. An **Animation Engine** blends conflicting actions like waving while talking into a smooth timeline. Finally, actuator values are sent via serial communication to move her joints.

### The Proof: What It Matters

Ablation studies prove the necessity of this complexity:

-   **Without Tool Use:** Nadine hallucinates weather reports.
-   **Without Memory:** She treats every meeting as a first date, killing rapport.
-   **Without Affect:** Her answers are logically correct but feel robotic and cold.

![Image of difference between the full system and its ablated versions generated via Nano Banana](https://cdn-images-1.medium.com/max/1024/1*0CmrhWT_v39k9JjHc0rInw.jpeg)

> Fun Fact: Nadine can currently only handle one person at a time. Trying to talk to her in a group confuses her audio localization, a major hurdle researchers are solving with Active Speaker Detection.

### The Road Ahead

We are standing on the precipice of a new era. Future research aims to solve **multi-party interactions**, allowing robots to facilitate group discussions. We are moving toward **embodied intelligence**, where the robot understands its own battery limits before promising to dance.

The journey from a calculator on wheels to a companion that remembers your birthday is fraught with latency issues and integration headaches. But as Nadine shows, when hardware, software, and emotional modeling align, the result is nothing short of magical.

> **One-liner:** True artificial intelligence isn’t just about knowing the answer; it’s about remembering who asked the question and caring about how they feel.

However, this deep memory raises critical **ethical questions**:

*How do we secure a robot that knows your deepest fears?*

Future work must prioritize data privacy and bias mitigation alongside technical capability.

### References

1.  Nadine: An LLM-Driven Intelligent Social Robot with Affective Capabilities and Human-like Memory
2.  Social Robots as Social Proxies for Fostering Connection and Empathy Towards Humanity

* * *

[Nadine, A Social Robot](https://pub.towardsai.net/nadine-a-social-robot-1ac757c38ccc) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.
---
metadata:
  videoId: "APgcxwp4vVA"
  title: "AWS AI Practitioner Question 22"
  description: "If a model hits 99% accuracy on training data but crashes to 58% on new data, the diagnosis is Overfitting. This happens when a model \"\"memorizes\"\" the noise and specifics of your training set rather than learning the underlying patterns, much like a student who memorizes a practice test but fails the actual exam. It differs from Underfitting (poor performance on both sets), Data Drift (performance decay over time after deployment), or Hallucination (an LLM-specific error).  To fix overfitting, developers use techniques like regularization, early stopping, or providing more diverse training data to force the model to generalize better to real-world scenarios.


    #AWS #MachineLearning #Overfitting #AIPractitioner #DataScience #TechTips #AWSCertification #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M41S"
  publishedAt: "2026-03-14T04:30:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/APgcxwp4vVA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=APgcxwp4vVA"
processedAt: "2026-03-14T14:14:43.816Z"
source: "youtube"
tldr: "A machine learning model scoring 99% accuracy on training data but only 58% on new data is a textbook example of overfitting, which means it memorized the training set instead of learning generalizable patterns."
tools: []
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "DevOps & Infrastructure"
tags:
  - "ai-general"
  - "aws"
  - "data-science"
  - "machine-learning"
  - "model-training"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2280
  outputTokens: 659
  totalTokens: 2939
  processingTimeMs: 33077
tagsNormalizedAt: "2026-03-14T14:30:47.391Z"
---

## Key Takeaways

This video explains how to identify the problem of overfitting in machine learning models, particularly for the AWS AI Practitioner exam. The key insights are: • **Overfitting** occurs when a model performs exceptionally well on training data but poorly on unseen data, indicating it memorized noise instead of learning patterns. • **Underfitting** is the opposite problem (poor performance on both datasets), while **data drift** refers to performance degradation over time after deployment. • **Hallucination** is a distinct generative AI concept, not applicable to this supervised learning scenario. • Solutions include techniques like **regularization**, **early stopping**, and using more diverse training data.

## Summary

The video presents a practice question for the AWS AI Practitioner exam, focusing on diagnosing a common machine learning problem. A data science team has built a model to detect fraudulent transactions. The model achieves a near-perfect 99% accuracy score on the data it was trained on, but its performance plummets to only 58% accuracy when tested on new, unseen transactions.

This significant performance gap between training data and validation/testing data is the critical signal for diagnosis. The presenter methodically evaluates the provided answer choices.

**Underfitting** is ruled out because it describes a model that performs poorly on *both* training and new data, having failed to learn sufficient patterns. **Data drift** is incorrect because it refers to a model's performance degrading *after* deployment as the real-world data distribution changes over time; this problem is evident during initial testing.

**Hallucination** is dismissed as it is a term specific to generative AI, describing when models produce confident but factually incorrect information, which is unrelated to this classification task.

The correct answer is **overfitting**. Overfitting happens when a model learns the details and noise in the training data to such an extent that it negatively impacts its performance on new data. It's analogous to a student who memorizes answers to practice test questions but cannot solve novel problems on the actual exam.

The presenter concludes by mentioning common techniques to combat overfitting, such as regularization, early stopping, and gathering more diverse training data to help the model learn robust, generalizable patterns.

## Context

This video is part of an exam preparation series for the AWS Certified AI Practitioner certification, a credential validating foundational knowledge of artificial intelligence and machine learning concepts on the AWS platform. Understanding overfitting is a fundamental concept in machine learning that impacts model reliability and real-world applicability. This knowledge is critical for data scientists, ML engineers, and anyone involved in building and deploying AI systems, as it directly affects model evaluation, selection of mitigation strategies, and ultimately, the success of AI projects in production.
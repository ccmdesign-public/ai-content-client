---
metadata:
  videoId: "zzH3407NjYE"
  title: "AWS AI Practitioner Question 31"
  description: "AWS AI: Smart Data Labeling! 💸 #shorts


    Scenario: You need to label 100,000 reviews as positive, negative, or neutral while keeping costs low and accuracy high.


    The Winner: Amazon SageMaker Ground Truth 🎯


    - The Logic: It uses Active Learning to automatically label high-confidence reviews. Only the \"tricky\" ones are sent to human reviewers.


    - The Win: This automated workflow can slash your labeling costs by up to 70%.


    Why not others? Amazon Rekognition is for images only, Mechanical Turk lacks built-in ML automation, and Amazon Comprehend requires you to already have labeled data to train a custom model.


    Exam Tip: For \"Data Labeling + Cost Optimization,\" the answer is always SageMaker Ground Truth. 🚀


    #AWS #MachineLearning #SageMaker #DataLabeling #AIPractitioner #AWSCertification #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M43S"
  publishedAt: "2026-03-23T11:01:40Z"
  thumbnailUrl: "https://i.ytimg.com/vi/zzH3407NjYE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=zzH3407NjYE"
processedAt: "2026-03-24T19:25:16.837Z"
source: "youtube"
tldr: "For a data science team labeling 100,000 customer reviews for sentiment analysis while reducing costs, Amazon SageMaker Ground Truth with automated labeling workflows is the recommended AWS service as it uses active learning to auto-label high-confidence samples, reducing human labeling by up to 70%."
tools:
  - name: "Amazon SageMaker Ground Truth"
    url: null
  - name: "Amazon Comprehend"
    url: null
  - name: "Amazon Mechanical Turk"
    url: null
  - name: "Amazon Rekognition"
    url: null
  - name: "Amazon S3"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
tags:
  - "ai-general"
  - "aws"
  - "machine-learning"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2254
  outputTokens: 675
  totalTokens: 2929
  processingTimeMs: 22986
tagsNormalizedAt: "2026-03-24T22:58:49.646Z"
---

## Key Takeaways

This video explains which AWS service to use for cost-effective data labeling at scale. Amazon SageMaker Ground Truth is the correct choice for labeling 100,000 text reviews for sentiment analysis because it automates the workflow with **active learning**, sending only uncertain samples to human reviewers, which can reduce labeling costs by **up to 70%**.

## Summary

This video addresses an AWS AI Practitioner exam question where a data science team needs to label 100,000 customer reviews as positive, negative, or neutral for sentiment analysis modeling. The primary goal is to reduce labeling costs while maintaining high accuracy, which requires a service that optimizes the labeling workflow through automation.

Four AWS service options are presented: Amazon Comprehend Custom Classification with Auto Label, Amazon Mechanical Turk integrated with S3, Amazon SageMaker Ground Truth with automated labeling workflows, and Amazon Rekognition Custom Labels for text classification. The analysis systematically eliminates incorrect options.

Amazon Comprehend Custom Classification is ruled out because it requires already labeled data for training. Amazon Mechanical Turk is a raw crowdsourcing platform without built-in automation for cost optimization. Amazon Rekognition Custom Labels is designed for image classification, not text, making it the wrong service entirely.

The correct answer is **Amazon SageMaker Ground Truth**. This service manages the full data labeling workflow and employs **active learning** to intelligently auto-label high-confidence examples. It only sends uncertain or low-confidence samples to human reviewers, significantly reducing the volume of manual work required. This approach can reduce labeling costs by up to 70%, making it ideal for preparing large-scale training datasets efficiently.

## Context

This content is crucial for professionals preparing for the AWS Certified AI Practitioner exam, a certification that validates foundational knowledge of AWS AI and machine learning services. As businesses increasingly rely on AI models, efficiently creating high-quality, labeled training data is a major bottleneck and expense. Understanding which AWS service automates this process is key for data scientists, ML engineers, and solution architects building cost-effective AI solutions on AWS. This question tests practical knowledge of applying the right managed service to a common real-world scenario.
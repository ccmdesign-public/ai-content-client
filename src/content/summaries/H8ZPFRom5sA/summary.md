---
metadata:
  videoId: "H8ZPFRom5sA"
  title: "AWS AI Practitioner Question 23"
  description: "If a startup needs a serverless, unified API to access foundation models (FMs) from multiple providers—like Anthropic, Meta, Mistral, and Amazon—without managing infrastructure or training models, the correct service is Amazon Bedrock. Unlike Amazon SageMaker AI, which requires deep ML expertise for building and training custom models, or Amazon Lex, which focuses on building conversational interfaces but lacks native multi-model provider access, Bedrock provides a \"\"plug-and-play\"\" platform for Generative AI. Similarly, Amazon Q is a finished AI assistant product for specific tasks rather than a development platform for foundation models.  In essence, Bedrock is the go-to for rapid, serverless GenAI development.


    #AWS #CloudComputing #MachineLearning #AmazonBedrock #GenerativeAI #AIPractitioner #TechTips #AWSCertification #KodeKloud\""
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M37S"
  publishedAt: "2026-03-13T07:35:37Z"
  thumbnailUrl: "https://i.ytimg.com/vi/H8ZPFRom5sA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=H8ZPFRom5sA"
processedAt: "2026-03-13T17:39:26.520Z"
source: "youtube"
tldr: "For a startup needing a fully managed service to access multiple foundation models via a single API without infrastructure management, the correct AWS service is Amazon Bedrock."
tools:
  - name: "Amazon Bedrock"
    url: null
  - name: "Amazon SageMaker"
    url: null
  - name: "Amazon Lex"
    url: null
  - name: "Amazon Q"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "DevOps & Infrastructure"
  - "Web Development"
tags:
  - "ai-general"
  - "api-design"
  - "aws"
  - "llm"
  - "machine-learning"
  - "startup"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2280
  outputTokens: 726
  totalTokens: 3006
  processingTimeMs: 23649
tagsNormalizedAt: "2026-03-13T17:52:43.918Z"
---

## Key Takeaways

This video is a prep question for the AWS AI Practitioner exam, focusing on selecting the right service for a specific AI use case. Key takeaways include:

* **Amazon Bedrock** is the correct service for serverless access to multiple foundation models via a single API.

* The question's key hints are: foundation models, no infrastructure management, and multiple providers through one unified API.

* Other services like SageMaker (for building/training), Lex (for conversational bots), and Amazon Q (an AI assistant) do not fit the stated requirements.

## Summary

This video presents question 23 from KodeKloud's AWS Certified AI Practitioner exam preparation series. The scenario involves a startup wanting to build an AI-powered chatbot using foundation models without managing infrastructure or training models, requiring access to models from multiple providers through a single API.

The instructor methodically breaks down the question by identifying the key requirements: using pre-trained **foundation models**, requiring **no infrastructure management** (a fully managed service), and needing a **unified API** for multiple providers.

Four AWS service options are presented: Amazon SageMaker AI, Amazon Bedrock, Amazon Lex, and Amazon Q. Each is evaluated against the core requirements.

*   **Amazon SageMaker AI** is incorrect because it is designed for building, training, and deploying custom machine learning models, which requires infrastructure management and ML expertise.

*   **Amazon Lex** is incorrect as it is a service specifically for building conversational chatbot interfaces and does not provide the requested access to multiple foundation model providers.

*   **Amazon Q** is incorrect; it is an AI assistant for business and developer use cases, not a platform for accessing foundation models via an API.

*   **Amazon Bedrock** is identified as the correct answer. It is a fully managed service that provides serverless access to a variety of foundation models from providers like **Anthropic**, **Meta**, **Mistral AI**, and Amazon itself, all through a single API, with no infrastructure to manage or model training required.

The video concludes by reinforcing that the combination of hints—foundation models, multiple providers, and a fully managed service—points directly to Amazon Bedrock as the solution.

## Context

This content is crucial for IT professionals, developers, and architects preparing for the AWS Certified AI Practitioner exam, which validates foundational knowledge of AWS AI and machine learning services. Understanding the distinct use cases for services like Bedrock, SageMaker, and Lex is essential for making cost-effective and architecturally sound decisions when building AI applications on AWS. This reflects the broader industry trend towards leveraging pre-trained foundation models and managed services to accelerate AI adoption without deep infrastructure expertise.
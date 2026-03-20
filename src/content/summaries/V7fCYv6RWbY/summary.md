---
metadata:
  videoId: "V7fCYv6RWbY"
  title: "Deploying a Multi-Tier App on Kubernetes"
  description: "In this demo, a fully functional multi-tier voting application is deployed on a Kubernetes cluster using Minikube. The vote flows from the frontend through Redis, the worker pod, PostgreSQL, and all the way to the result app — live and working. This is Kubernetes handling a real-world app end to end.\ 


    Full tutorial: https://youtu.be/XuSQU5Grv1g


    #Kubernetes #KubernetesDemo #Minikube #DevOps #K8s #KubernetesForBeginners #CloudNative #ContainerOrchestration #LearnKubernetes #MultiTierApp #KubernetesDeployment #Redis #PostgreSQL #DevOpsShorts #TechShorts #CloudComputing #PlatformEngineering #KubernetesTutorial #DevOpsTips #Microservices"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M57S"
  publishedAt: "2026-03-13T21:00:27Z"
  thumbnailUrl: "https://i.ytimg.com/vi/V7fCYv6RWbY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=V7fCYv6RWbY"
processedAt: "2026-03-14T14:17:23.530Z"
source: "youtube"
tldr: "The video demonstrates a successful deployment and test of a multi-tier voting application on a Kubernetes cluster using Minikube, confirming data flow from the voting app through Redis and PostgreSQL databases to the results app."
tools:
  - name: "Kubernetes"
    url: null
  - name: "Minikube"
    url: null
  - name: "Redis"
    url: null
  - name: "PostgreSQL"
    url: null
categories:
  - "Data & Analytics"
  - "DevOps & Infrastructure"
  - "Programming"
tags:
  - "architecture"
  - "docker"
  - "kubernetes"
  - "postgresql"
  - "testing"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2142
  outputTokens: 716
  totalTokens: 2858
  processingTimeMs: 49569
tagsNormalizedAt: "2026-03-14T14:32:11.843Z"
---

## Key Takeaways

This is a practical demonstration of deploying and verifying a containerized microservices application on Kubernetes. Key takeaways include:

*   **Multi-tier application architecture** is deployed using separate pods for voting, results, worker, Redis, and PostgreSQL services.

*   **Minikube** is used to run the Kubernetes cluster locally, with its service command providing access URLs for the different application components.

*   The demo confirms **end-to-end functionality** by casting votes and observing real-time updates, proving data flows correctly through the Redis cache and PostgreSQL database.

## Summary

The video is a concise walkthrough of a functional Kubernetes deployment for a sample voting application. The presenter uses Minikube to run a local Kubernetes cluster where the application's various components—the voting app, results app, a worker service, Redis, and PostgreSQL—are deployed as separate pods.

### Deployment and Access

The deployment is confirmed to be working. The presenter uses the `minikube service` command to obtain the external URLs needed to access the voting and results applications through a web browser. This step highlights a core Kubernetes concept: exposing internal services to the outside world.

### Testing the Data Flow

The core of the demo is testing the integrated data pipeline. The presenter accesses the voting app, casts a vote for "dogs," and observes a confirmation checkmark. This action triggers the application's backend logic: the vote is first stored in the **Redis** database (acting as a cache or queue).

A **worker pod** processes this data from Redis and persists it to the **PostgreSQL** database. Finally, the presenter navigates to the separate results application URL, which queries the PostgreSQL database, displaying that 100% of the (single) vote is for dogs. The test is repeated by changing the vote to "cats," and the results page updates dynamically, confirming the entire data path from the frontend voting interface through the backend services and databases is operational.

This provides a clear, visual confirmation of a successful microservices deployment on Kubernetes, where independent, scalable components communicate effectively to deliver a cohesive application.

## Context

This demonstration is crucial for developers and DevOps engineers learning Kubernetes. It moves beyond theory and simple single-container deployments to show a real-world scenario: a distributed application with multiple interdependent services (a frontend, backend workers, and different types of databases). Understanding how to deploy, connect, and validate such architectures is fundamental for modern cloud-native development and is a key skill for implementing scalable, resilient systems. The use of Minikube makes this complex topic accessible for local learning and experimentation.
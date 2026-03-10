---
metadata:
  videoId: "2dfPRLCKVBE"
  title: "What is a Pod in Kubernetes? (K8s Basics Explained)"
  description: "What is a pod in Kubernetes? It is the smallest deployable object in K8s, acting as a wrapper around your containers. In this quick tutorial, we cover the one-to-one relationship between pods and applications, how to scale by adding more pods (not containers), and how to deploy your first pod using the kubectl run command.


    Watch the full Kubernetes course here 👆


    #Kubernetes #K8s #KubernetesPods #DevOps #CloudComputing #Docker #Containerization #KubernetesTutorial #LearnKubernetes #DevOpsEngineer #KodeKloud #CloudEngineer #TechShorts #CKA #Microservices"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT2M29S"
  publishedAt: "2026-03-08T22:23:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/2dfPRLCKVBE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=2dfPRLCKVBE"
processedAt: "2026-03-10T14:00:54.794Z"
source: "youtube"
tldr: "A Kubernetes Pod is the smallest deployable unit, encapsulating one or more containers that share resources, with a typical one-to-one relationship between an application instance and a pod for scaling, created via `kubectl run`."
tools:
  - name: "Kubernetes"
    url: null
  - name: "Docker"
    url: null
  - name: "Docker Hub"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "architecture"
  - "automation"
  - "docker"
  - "kubernetes"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2506
  outputTokens: 729
  totalTokens: 3235
  processingTimeMs: 29140
tagsNormalizedAt: "2026-03-10T16:48:00.304Z"
---

## Key Takeaways

This video explains the fundamental Kubernetes object, the Pod.

* A **Pod** is the smallest object in Kubernetes and encapsulates one or more containers.

* Scaling an application is done by creating more **Pods**, not by adding containers to an existing pod.

* While a one-to-one relationship between app container and pod is common, helper **sidecar containers** (e.g., for logging) can share a pod.

* Use `kubectl run` to create pods and `kubectl get pods` to view their status, pulling images from registries like Docker Hub.

## Summary

A **Pod** is the basic building block and smallest object you can create in Kubernetes. It encapsulates one or more application containers that share the same network namespace and storage, allowing them to communicate via `localhost`.

There is typically a **one-to-one relationship** between a running application instance (as a container) and a pod. To scale an application horizontally, you create additional pods, each hosting a new instance, rather than adding more containers to a single pod.

However, this relationship is not a strict rule. A common pattern is the **sidecar container**, where a helper container (like a logging agent or monitoring tool) runs alongside the main application container within the same pod.

### Creating and Managing Pods

You can create a pod using the **imperative** `kubectl run` command, specifying a name and the container image. For example, `kubectl run nginx --image=nginx` creates a pod that deploys an instance from the NGINX Docker image.

The image is pulled from a container registry. By default, it comes from a public repository like **Docker Hub**, but Kubernetes can be configured to use private registries within an organization.

To see the pods in your cluster, use `kubectl get pods`. This command shows the pod's status, which transitions from 'ContainerCreating' to 'Running' once the application is fully deployed.

### Important Notes on Accessibility

Creating a pod does not automatically make the application accessible to external users. In its default state, the service is only accessible internally from within the cluster node. Making it publicly available requires additional Kubernetes networking concepts like **Services**, which are covered in later lectures.

## Context

Understanding Pods is the foundational first step to working with Kubernetes, the dominant container orchestration platform. This knowledge is critical for DevOps engineers, SREs, and developers deploying and managing modern, scalable, containerized applications. It explains the core abstraction that packages an application's runtime environment, separating the 'what' (the application) from the 'how' (scheduling and networking managed by Kubernetes).
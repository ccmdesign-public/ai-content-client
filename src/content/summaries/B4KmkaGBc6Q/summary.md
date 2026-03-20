---
metadata:
  videoId: "B4KmkaGBc6Q"
  title: "Kubernetes YAML File Structure Explained"
  description: "Every Kubernetes object — pods, ReplicaSets, deployments, services — is created using a YAML definition file. All of them share the same four required top-level fields: apiVersion, kind, metadata, and spec. Get the structure right and Kubernetes does exactly what you tell it. Get the indentation wrong and it all falls apart. This clip breaks it down clearly so you can write your first K8s YAML without errors.


    Full Kubernetes course  - https://www.youtube.com/watch?v=XuSQU5Grv1g


    #Kubernetes #KubernetesYAML #YAML #DevOps #K8s #CloudNative #CloudComputing #KubernetesTutorial #LearnKubernetes #KodeKloud #DevOpsEngineer #CKA #kubectl #TechShorts #CloudEngineer #Containerization #BackendDev #SoftwareEngineering #InfrastructureAsCode #Microservices"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT2M44S"
  publishedAt: "2026-03-10T01:15:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/B4KmkaGBc6Q/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=B4KmkaGBc6Q"
processedAt: "2026-03-10T13:55:16.269Z"
source: "youtube"
tldr: "A Kubernetes YAML file requires four mandatory top-level fields: apiVersion, kind, metadata, and spec, which define the API version, object type, descriptive data, and object specifications."
tools: []
categories:
  - "DevOps & Infrastructure"
  - "Programming"
tags:
  - "architecture"
  - "best-practices"
  - "docker"
  - "kubernetes"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2769
  outputTokens: 561
  totalTokens: 3330
  processingTimeMs: 54467
tagsNormalizedAt: "2026-03-10T16:42:16.251Z"
---

## Key Takeaways

The video explains the essential structure of a Kubernetes YAML configuration file.

## Summary

Kubernetes uses YAML files to define and create various objects like **pods**, **replica sets**, **deployments**, and **services**. All these configuration files follow a common structure with four mandatory top-level fields that act as siblings under the same root.

### The Four Required Fields

The first field is **apiVersion**. This specifies which version of the Kubernetes API is being used to create the object. The correct version depends on the object type; for example, a pod uses `v1`, while other objects like deployments or services use different API versions.

The second field is **kind**. This defines the type of object being created, such as `Pod`, `ReplicaSet`, `Deployment`, or `Service`. It is crucial that this value is typed exactly as specified, as it is case-sensitive. Using lowercase or all caps will cause an error.

The third field is **metadata**. This is a dictionary (key-value structure) that contains data about the object itself. Common sub-properties include:

- **name**: A string value identifying the object (e.g., `my-app-pod`).

- **labels**: Another dictionary within metadata for attaching key-value pairs used for identifying and grouping objects.

Proper YAML indentation is critical within the metadata block. All children properties (like `name` and `labels`) must be indented further to the right than their parent (`metadata`). Sibling properties must share the same indentation level.

The fourth and final required top-level field is **spec**. This field contains the detailed specifications that define the desired state of the Kubernetes object. The contents of `spec` vary significantly depending on the `kind` of object being created. The video notes that the specifics of the `spec` field for different object types will be covered later in the course.

## Context

YAML is the primary configuration language for Kubernetes, the dominant container orchestration platform. Understanding its structure is foundational for anyone working with DevOps, cloud infrastructure, or modern application deployment. This knowledge is essential for engineers to create, manage, and troubleshoot the resources that run containerized applications in production environments.
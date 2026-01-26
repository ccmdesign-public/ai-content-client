---
metadata:
  videoId: "AcCJ678kV34"
  title: "Docker’s Best Security Feature Is Now FREE"
  description: "Docker just made a major shift by opening up their hardened images to everyone. This video breaks down why your base image matters more than you think, and how hidden vulnerabilities sneak in from the very first line of your Dockerfile. We'll show you how Docker Hardened Images work, how easy they are to use, and why they are becoming the safest default for modern container builds.


    🔗 Relevant Links

    Docker Hardened Images: https://www.docker.com/products/hardened-images/

    Docker's Announcement: https://www.docker.com/blog/docker-hardened-images-for-every-developer/


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack


    📌 Chapters:

    00:00 Intro

    00:27 What Are Docker Hardened Images

    01:00 Are Base Images A Security Risk?

    02:18 How to Use Hardened Images in Real Projects

    03:02 Why Things Might Break and How to Fix Them

    03:38 Hardened Helm Charts and Kubernetes

    04:07 Final Thoughts and Takeaways"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT4M54S"
  publishedAt: "2026-01-11T17:02:07Z"
  thumbnailUrl: "https://i.ytimg.com/vi/AcCJ678kV34/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=AcCJ678kV34"
processedAt: "2026-01-12T23:37:17.201Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Docker has released over 1,000 **Hardened Images (DHI)** as free and open-source under the **Apache 2.0 license** to combat supply chain vulnerabilities.

  - **Security by default:** Swapping standard base images for DHI versions significantly reduces the **attack surface** by removing unnecessary packages.

  - **Minimalist design:** Images are built on **Debian and Alpine** foundations but stripped o\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1329
  outputTokens: 836
  totalTokens: 3406
  processingTimeMs: 14118
tools:
  - name: "Docker"
    url: "https://www.docker.com/"
  - name: "Docker Hardened Images"
    url: "https://www.docker.com/products/hardened-images/"
  - name: "Helm"
    url: null
  - name: "Kubernetes"
    url: null
  - name: "Debian"
    url: null
  - name: "Alpine"
    url: null
  - name: "bash"
    url: null
  - name: "curl"
    url: null
  - name: "apt"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Security"
tags:
  - docker
  - kubernetes
  - security
  - best-practices
---

## Key Takeaways

Docker's decision to make hardened images free represents a major shift in making enterprise-grade container security accessible to all developers.

- **Supply chain protection:** DHI solves the problem of inheriting **known vulnerabilities** from common, bloated base images.

- **Ease of adoption:** Most migrations require only a single line change in a **Dockerfile**, replacing the standard base image with its DHI equivalent.

- **Hardened Helm charts:** The initiative includes secure **Kubernetes configurations**, allowing developers to deploy with production-ready defaults without being security experts.

- **Minimalism trade-offs:** Because these images are stripped-down, developers may need to explicitly install specific **debugging tools** like bash or curl if needed for build steps.

## Summary

### The Transition to Open-Source Security
Docker has officially moved its **Hardened Images (DHI)** from a commercial-only offering to a free, open-source model. With over 1,000 images now licensed under **Apache 2.0**, individual developers and small teams can access infrastructure that was previously locked behind enterprise paywalls. This change addresses the growing concern regarding **supply chain attacks**, which reached record highs recently.

### Solving the Base Image Problem
Most developers use base images for their convenience and flexibility, but this often comes at the cost of security. Standard images frequently include unnecessary packages, legacy dependencies, and system utilities that most applications never use. These extra components create a larger **attack surface**. Since container security is a supply chain issue, any vulnerability in the base image is automatically inherited by the application layer. Hardened images mitigate this by providing a minimal, proactively patched foundation.

### Implementation and Practicality
In most real-world scenarios, switching to a hardened image is a "drop-in" replacement. Because DHI versions are based on familiar distributions like **Debian** and **Alpine**, the transition typically involves:

- Swapping the `FROM` instruction in the **Dockerfile**.

- Maintaining existing application code and build logic.

- Ensuring the build process remains consistent while the underlying foundation becomes more secure.

### Dealing with Minimalism
Because these images are **intentionally minimal**, some developers might encounter breaking changes during the build phase. Common tools like **bash, curl, or apt** might be missing or package managers may be restricted. However, these issues are generally easy to resolve by explicitly adding only the necessary tools during the build stage. This approach ensures that only the required dependencies exist in the final production image.

### Beyond Containers: Hardened Helm Charts
To support the growing Kubernetes ecosystem, Docker is also providing **hardened Helm charts**. These charts follow security best practices by default, helping developers avoid the risks associated with pulling unverified community charts. This allows for faster, more secure deployments by providing production-ready defaults that reduce the "heavy lifting" associated with Kubernetes security configuration.

## Context

This development matters because **software supply chain security** has become a critical vulnerability point for modern applications. By democratizing access to hardened images, Docker is participating in the industry-wide **'Shift Left'** movement, which aims to integrate security at the earliest stages of development. This trend is vital for developers who lack the resources to manually audit and patch every layer of their infrastructure. Making these tools free lowers the barrier to entry for building secure, enterprise-grade applications, benefiting the entire open-source ecosystem and reducing the global impact of container-based vulnerabilities.

---
metadata:
  videoId: "K7y8ZAHQYGY"
  title: "How AI Will Transform DevOps and SRE Practices | Better Stack Podcast Ep. 12"
  description: "In this episode, Amin Astaneh shares his journey from open source enthusiast to SRE expert, discusses the impact of AI on DevOps, and offers insights on building reliable, fast-moving teams. He also talks about his nomadic lifestyle and adventures on the road, providing a holistic view of technology and life.


    🔗 Relevant Links

    Certomodo.io: https://certomodo.io/

    The Field Guide to Understanding Human Error: https://sidneydekker.com/the-field-guide-to-understanding-human-error

    The Phoenix Project: https://itrevolution.com/product/the-phoenix-project/

    The DevOps Handbook, Second Edition: https://itrevolution.com/product/the-devops-handbook-second-edition/

    Practice of Cloud System Administration, The: DevOps and SRE Practices for Web Services, Volume 2: https://www.amazon.com/Practice-Cloud-System-Administration-Practices/dp/032194318X

    Toyota Kata: Managing People for Improvement, Adaptiveness and Superior Results: https://www.amazon.com/Toyota-Kata-Managing-Improvement-Adaptiveness/dp/0071635238

    Leading Change: https://www.amazon.com/Leading-Change-New-Preface-Author/dp/1422186431


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

    00:00 Introduction to SRE and Amin's Journey

    02:45 The Evolution of SRE Practices

    05:37 Human Error and Incident Management

    08:30 The Transition from Pagers to Modern Monitoring

    10:57 Insights from Working at Meta

    13:40 The Impact of AI on SRE and DevOps

    16:15 Automation and Human Oversight in Incident Management

    19:04 Challenges of Increased Code Flow

    21:37 Establishing Effective SLOs

    24:36 Consulting Insights: Common Client Challenges

    27:19 Aligning Incentives Across Teams

    29:49 The Future of Software Engineering and SRE Careers

    35:13 The Evolving Role of SREs

    35:40 Essential Resources for SREs

    38:04 The Impact of AI on Software Development

    41:57 The Importance of Discipline in Software Engineering

    43:17 Understanding and Overcoming Burnout

    49:11 Living a Nomadic Lifestyle as a Tech Professional

    54:05 Adventures on the Road

    56:16 Hot Takes on SRE and DevOps Practices

    59:05 Favorite Tools and Technologies"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT1H2M38S"
  publishedAt: "2026-02-25T01:30:20Z"
  thumbnailUrl: "https://i.ytimg.com/vi/K7y8ZAHQYGY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=K7y8ZAHQYGY"
processedAt: "2026-02-26T23:53:47.560Z"
source: "youtube"
tldr: "AI-driven 'agentic development' will dramatically increase code volume, shifting the primary constraint in software delivery from writing code to operating it reliably, forcing organizations to finally adopt mature SRE and DevOps fundamentals to handle the coming 'AI code tsunami.'"
tools:
  - name: "Claude"
    url: null
  - name: "Red Hat Linux"
    url: null
  - name: "KDE"
    url: null
  - name: "Drupal"
    url: null
  - name: "Nagios"
    url: null
  - name: "Conveyor"
    url: null
  - name: "Scuba"
    url: null
  - name: "Honeycomb"
    url: null
  - name: "incident.io"
    url: null
  - name: "Kubernetes"
    url: null
  - name: "Prometheus"
    url: null
  - name: "OpenTelemetry"
    url: null
  - name: "Concourse"
    url: null
  - name: "Jenkins"
    url: null
  - name: "Starlink"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "AI & Machine Learning"
tags:
  - "sre"
  - "devops"
  - "ai-ops"
  - "reliability-engineering"
  - "ci-cd"
  - "observability"
  - "software-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 41720
  outputTokens: 1659
  totalTokens: 43379
  processingTimeMs: 35037
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

Amian Astani, a seasoned SRE consultant, argues that AI-generated code will overwhelm current operational practices, making reliability engineering more critical than ever. The core ideas to remember are:

*   **The AI Code Tsunami is Coming:** AI tools (like Claude Code) will cause a 10x increase in code changes flowing through CI/CD pipelines, which will directly translate into a proportional increase in incidents and alerts.

*   **Shift from Coding to Operating:** The bottleneck will move from writing code to operating it. SRE and DevOps roles will become central as organizations struggle to maintain reliability amidst the flood of AI-generated changes.

*   **Fundamentals Are Non-Negotiable:** The increased change velocity will expose all weak links, forcing companies to finally implement foundational SRE practices: robust CI/CD, meaningful SLOs with business buy-in, effective testing, and blameless postmortems.

*   **AI in Ops: Compensate, Don't Automate:** AI should augment human effort (the 'compensatory principle'), not replace it. It's suitable for first-pass diagnosis or well-constrained tasks (like automatic reverts), but humans must remain in the loop for critical decisions and context.

*   **Software Engineering Isn't Dying, It's Evolving:** The need for deep technical understanding and system design skills is more important than ever to review AI-generated code and ensure architectural soundness and safety.

## Summary

### Introduction and Background

Amian Astani, an SRE consultant and host of the 'Reliability Rebels' podcast, shares his journey from early Linux enthusiast to operations at a scaling Drupal company (Acquia) and later as a Production Engineer at Meta. His experience at Meta, working on massive internal systems like the Conveyor CD platform, cemented his view of SRE as a sociotechnical practice bridging technology, people, and process.

### The Core Thesis: The AI Code Tsunami

Astani's central argument is that AI-powered 'agentic development' tools (exemplified by Claude Code) will unleash an order-of-magnitude increase in code changes. This 'AI code tsunami' will stress every part of the software delivery lifecycle: CI/CD pipelines, testing, deployment, and incident response.

He establishes a direct, linear relationship between the number of changes and the number of incidents. A 10x increase in code flow means a probable 10x increase in alerts. This shifts the primary constraint in software organizations from writing code to operating it reliably. SRE and DevOps practices will become the critical bottleneck, and thus, highly valuable.

### The Immediate Consequences and Required Fundamentals

This shift is not theoretical; Astani cites client cases where adopting AI coding without improving release processes immediately led to a spike in incidents and customer escalations. The increased change velocity will reveal every weak link in an organization's operational posture.

To survive, companies must return to and rigorously implement the fundamental SRE and DevOps practices that have been discussed for over a decade:

*   **Solid CI/CD and Testing:** Pipelines must be treated as production services, and testing strategies must ensure code quality before deployment.

*   **Service Level Objectives (SLOs) with Teeth:** SLOs must be used to make business decisions, not just for alerting. When an error budget is spent, product work should be paused for reliability work. Astani emphasizes that SLO programs fail without executive and product management buy-in.

*   **Blameless Culture and Feedback Loops:** 'Human error' is a starting point for investigation, not a conclusion. Organizations must fix broken feedback loops where customer pain (via support tickets) is ignored in favor of new feature work.

*   **Incentive Alignment:** Performance evaluations (like at Meta) must reward operational excellence and reliability work alongside feature delivery to ensure teams are motivated to maintain healthy systems.

### The Role of AI in SRE (AISR)
Astani cautions against the 'leftover principle' of automation, where AI handles everything and leaves only the most complex problems for humans. Instead, he advocates for the 'compensatory principle,' where AI is used to **force-multiply human effort**.

AI is well-suited for first-pass incident diagnosis (correlating recent changes, alerts, and metrics) or executing well-defined, safe actions like automatic code reverts. However, it should not make unconstrained changes to production. Human judgment, context, and understanding of customer experience remain irreplaceable for critical decisions.

### Career Advice and Industry Reflections

Contrary to narratives about AI making software engineers obsolete, Astani argues that deep technical fundamentals are more important than ever. Engineers need strong skills to review AI-generated code and design sound systems. He uses the analogy of an AI designing a bridge or skyscraper: "Are you going to be comfortable driving over that bridge that it designed?" Until the answer is yes, skilled engineers are essential.

For those entering the field, SRE and DevOps are excellent career paths, but they require moving beyond just writing YAML or managing Kubernetes. True SRE is a practice of transforming unreliable systems into reliable ones through software engineering and sociotechnical work.

### Personal Insights: Burnout and Nomadic Life

Astani openly discusses his experiences with burnout, attributing it to dysfunctional incentive structures, a lack of rest, and the 'grumpy sysadmin' mentality. His layoff from Meta led him to start his consulting business and adopt a nomadic lifestyle, living and working from a converted truck ('Molly') with Starlink internet. This lifestyle change represents a conscious shift towards balancing work with life experience and personal well-being.

## Context

Amian Astani is a seasoned Site Reliability Engineering (SRE) consultant, former Meta Production Engineer, and host of the 'Reliability Rebels' podcast. This conversation on the Better Stack podcast arrives at a pivotal moment as AI coding assistants (like GitHub Copilot, Claude Code) are becoming ubiquitous, promising to drastically increase developer output. The discussion critically examines the often-overlooked downstream effects of this productivity boom on software reliability, operations, and organizational structure. This video is essential for engineering leaders, DevOps/SRE practitioners, product managers, and any software professional seeking to understand how to prepare their teams and systems for the impending wave of AI-generated code and the heightened importance of operational excellence.
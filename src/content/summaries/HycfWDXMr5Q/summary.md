---
metadata:
  videoId: "HycfWDXMr5Q"
  title: "Promptware, cloud security trends for 2026, and what the Xbox One hack means for cybersecurity"
  description: "Follow the Security Intelligence podcast on your preferred platform →  https://ibm.biz/BdpyGe


    Someone finally cracked the Xbox One after 13 years. Here’s why security pros should care.\ 


    On this episode of Security Intelligence, panelists Ian Molloy, Seth Glasgow and Kimmie Farrington discuss the Xbox One hack presented at RE//verse 2026. More than just a neat story of one hacker’s ingenuity, there are some important takeaways for practitioners here.\ 


    But before that, we get into promptware, a new model for understanding attacks on LLMs that goes beyond the basics of prompt injections. Formulated by a handful of prominent cybersecurity researchers, including Bruce Schneier, promptware urges defenders to start thinking about the full AI attack kill chain, not just the front door.\ 


    Then we dive into a new analysis of cloud attack trends from IBM X-Force's Omari Jones, which finds that cybercriminals are targeting cloud ecosystems rather than cloud infrastructure. How do we need to shift our own mindsets to counter this?\ 


    Meanwhile, Google Threat Intelligence Group and Coveware find ransomware gangs increasingly ditching their flashy external tools in favor of PowerShell and other built-in system utilities—making detection significantly harder.\ 


    And Chuck Everette's Dark Reading op-ed raises a question that doesn't get enough airtime: With everyone focused on cutting-edge AI tech, what about the downright ancient OT systems and PLCs that underpin large swaths of American critical infrastructure? \ 


    All that and more on Security Intelligence.\ 


    In this episode:\ 


    00:00 – Introduction\ 

    1:01 -- From prompt injection to promptware\ 

    11:15 -- Cloud security trends 2026 \ 

    19:59 -- Ransomware attackers live off the land \ 

    28:53 -- OT security: cybersecurity’s “rusting edge” \ 

    34:41 -- The Xbox One hack\ 


    The opinions expressed in this podcast are solely those of the participants and do not necessarily reflect the views of IBM or any other organization or entity.\ 


    Cloud attacks are evolving: What 2025 trends mean for defenders in 2026 → https://ibm.biz/BdpyGn


    #AIsecurity #PromptInjection #Xbox"
  channel: "IBM Technology"
  channelId: "UCKWaEZ-_VweaEx1j62do_vQ"
  duration: "PT40M49S"
  publishedAt: "2026-03-25T10:00:33Z"
  thumbnailUrl: "https://i.ytimg.com/vi/HycfWDXMr5Q/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=HycfWDXMr5Q"
processedAt: "2026-03-25T14:39:06.311Z"
source: "youtube"
tldr: "The IBM Security Intelligence podcast discusses three major cybersecurity trends for 2026: the 'Promptware' kill chain framework for understanding AI/LLM attacks beyond simple prompt injection, the shift of cloud attackers to targeting ecosystem edges and integrations, and ransomware gangs increasingly 'living off the land' using native system tools."
tools:
  - name: "Mimikatz"
    url: null
  - name: "Cobalt Strike"
    url: null
  - name: "PowerShell"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
tags:
  - "ai-general"
  - "llm"
  - "prompt-engineering"
  - "security-general"
  - "vulnerability"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 30988
  outputTokens: 1598
  totalTokens: 32586
  processingTimeMs: 203634
tagsNormalizedAt: "2026-03-25T14:52:11.790Z"
---

## Key Takeaways

The podcast, hosted by Matt Kazinski with experts Kimmy Farington, Ian Mallaloy, and Seth Glasgow, analyzes emerging security threats and defensive strategies.

*   **The 'Promptware' kill chain** reframes AI security, arguing that **prompt injection** is just the initial access step in a broader attack chain including privilege escalation, lateral movement, and action on objectives. Defenders must treat compromised AI agents as **insider threats** and secure their environments accordingly.

*   **Cloud attacks are shifting** from hardened infrastructure to the **'edges' of cloud ecosystems**—targeting identities, integrations, APIs, and administrative tools. Security must be viewed as an **ecosystem problem**, not just an infrastructure one, requiring a mindset that accepts components are out of your control.

*   **Ransomware attackers are 'living off the land'**, ditching external tools like Mimikatz and Cobalt Strike for built-in system tools (PowerShell, RDP) to evade detection. This trend, driven by lower ransom payments and better EDR, complicates defense as malicious activity blends with normal traffic.

*   **Legacy Operational Technology (OT)** represents a critical 'rusting edge'—systems like Windows 95 PLCs powering infrastructure are often unpatchable and overlooked. The panel highlights the immense capital expenditure challenge and supply chain issues (e.g., sourcing parts on eBay) in securing these aging systems.

*   **Identity and Access Management (IAM)** is central to securing both AI agents and cloud ecosystems. AI agents should be treated as **highly privileged identities** whose permissions must be strictly monitored and limited to contain potential blast radius.

*   The long-unhacked **Xbox One** breach demonstrates that even the most secure systems can fall to determined, sophisticated hardware attacks, but also highlights the importance of such research for technology preservation and understanding security evolution.

## Summary

### The Promptware Kill Chain: Rethinking AI Security

The podcast opens with a discussion of the 'Promptware Kill Chain' paper by researchers including Bruce Schneier. The panelists agree the cybersecurity community focuses too narrowly on **prompt injection** as the sole AI vulnerability. The paper's framework expands the view, modeling AI/LLM attacks as a seven-stage kill chain: initial access (prompt injection), privilege escalation, reconnaissance, persistence, command & control, lateral movement, and action on objectives.

Seth Glasgow notes the dangerous scalability of indirect prompt injection, where a single compromised model can propagate malicious instructions widely. The panel emphasizes that since prompt injection cannot be fully prevented, defenders must **assume initial access will occur**. Ian Mallaloy advises treating the AI model or agent itself as a **potentially malicious insider threat** and locking down its permissions and access within the environment.

Kimmy Farington points out the logging challenge: malicious instructions picked up by an agent are often invisible in standard defender logs. The consensus is that securing AI agents is fundamentally an **Identity and Access Management (IAM)** problem, requiring strict monitoring and limitation of what these highly privileged 'identities' can do.

### Cloud Security Trends: Attacking the Ecosystem's Edge

The conversation shifts to cloud attack trends for 2026, citing an article by Exforce analysts. Attackers are now targeting the **'edges' of cloud ecosystems**—identities, integrations, APIs, workflows—rather than core infrastructure. Kimmy explains that once inside this interconnected environment, lateral movement opportunities are vast.

Seth Glasgow attributes this shift to the **implicit trust** built into cloud ecosystems for convenience, making federated services and reused components fertile attack grounds. The panel stresses that security must evolve from an infrastructure-centric view to an **ecosystem-centric** one. This means accepting that critical services are out of your direct control and architecting for resilience when those 'tentpole' components fail or are compromised.

### Ransomware's Pivot to 'Living Off the Land'

The panel examines reports that ransomware gangs are increasingly ditching external tools like **Mimikatz** and **Cobalt Strike** in favor of 'living off the land'—using native system tools like PowerShell and Windows utilities. Seth links this to lower ransom payments and more mature **Endpoint Detection and Response (EDR)** products that flag known malicious tools. Using legitimate system binaries allows attackers to 'hide in plain sight.'

Ian Mallaloy speculates this may lead to new extortion models, like directly targeting customers whose data was stolen, if companies stop paying ransoms. The panel warns this trend makes defense harder, as distinguishing malicious from legitimate admin activity requires deeper traffic analysis. Ian also predicts AI agents could automate these living-off-the-land techniques, leading to a potential resurgence of AI-accelerated ransomware campaigns.

### The 'Rusting Edge': Legacy OT and Unpatchable Systems

The discussion turns to critical infrastructure's 'rusting edge'—Operational Technology (OT) and Programmable Logic Controllers (PLCs) running on antiquated, unpatchable systems like Windows 95. Kimmy Farington underscores the need to air-gap, harden, and eliminate default passwords on these systems, despite the practical and financial challenges of upgrading decades-old hardware.

Seth Glasgow frames it as a massive capital expenditure problem: utilities operating on public trust cannot easily justify billion-dollar upgrades for security alone when systems are functionally 'reliable enough.' The 'eBay supply chain,' where organizations hunt for obsolete parts online, highlights the fragility of this setup. The panel agrees this aging infrastructure, now more exposed via AI-powered vulnerability discovery, represents a systemic risk that has been sidelined for too long.

### The Xbox One Hack: Persistence and Preservation

The final segment covers the long-awaited hardware hack of the Xbox One by researcher Marcus Gazdellan, who used precisely timed voltage manipulation. While acknowledging the technical feat, the panel notes the different threat model between a consumer console and secured critical infrastructure. Seth Glasgow highlights the positive aspect of such hacks for **technology preservation**, enabling future emulation and archiving of digital content. The story serves as a testament to both the advancement of hardware security and the relentless perseverance of researchers.

## Context

This episode of IBM's Security Intelligence podcast features host Matt Kazinski with a panel of IBM security experts: Kimmy Farington (Security Detection Engineer), Ian Mallaloy (Department Head, Security Research), and Seth Glasgow (Cyber Range Executive Advisor). The discussion analyzes recent cybersecurity research and news to extract practical insights for practitioners. This content is highly relevant as organizations grapple with securing emerging AI/LLM deployments, evolving cloud attack surfaces, and persistent ransomware threats, all while managing legacy infrastructure risk. Security professionals, cloud architects, IT leaders, and anyone responsible for AI implementation or infrastructure security would benefit from the panel's applied analysis of these 2026 trends.
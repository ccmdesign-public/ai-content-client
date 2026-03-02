---
metadata:
  videoId: "vcS02Vl6IU0"
  title: "Exploits of public-facing apps are surging. Why?"
  description: "Explore the Threat Intelligence Index 2026 → https://ibm.biz/Bdpi6d  \ 


    For years, stolen credentials were king—the hacker’s attack vector of choice. Until now.\ 


    The 2026 IBM X-Force Threat Intelligence Index reveals a surge in the exploitation of public-facing applications, overtaking identity-based attacks as the top initial access vector. \ 


    Why are threat actors changing their tactics so dramatically—and what does it mean for defenders?\ 


    In this episode of Security Intelligence, panelists Claire Nuñez, Chris Caridi and Joe Xatruch break down the biggest findings from the latest Threat Intelligence Index, plus:\ 


    \"-Infostealers that grab AI agents’ “souls”

    \"-Compromised packages that drop AI agents as malware\"

    \"-The AI infrastructure flaws we can’t seem to fix\"

    \"-Why threat intelligence is so siloed—and what we can do about it\"


    All that and more—on Security Intelligence.\ 


    00:00 - Introduction\ 

    1:17 - Threat Intelligence Index 2026 \ 

    16:22 - Stealing AI agents’ souls \ 

    28:03 - AI infrastructure flaws \ 

    36:36 - Threat intelligence made human\ 


    The opinions expressed in this podcast are solely those of the participants and do not necessarily reflect the views of IBM or any other organization or entity.\ 


    Follow the Security Intelligence podcast on your preferred platform → https://ibm.biz/Bdpi6x


    #ThreatIntelligence #AIagentmalware #infostealers"
  channel: "IBM Technology"
  channelId: "UCKWaEZ-_VweaEx1j62do_vQ"
  duration: "PT47M16S"
  publishedAt: "2026-02-25T11:01:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/vcS02Vl6IU0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=vcS02Vl6IU0"
processedAt: "2026-02-27T00:12:40.450Z"
source: "youtube"
tldr: "The 2026 IBM X-Force Threat Intelligence Index reveals a 44% surge in exploitation of public-facing applications, driven by supply chain attacks and lax security fundamentals, while AI agents emerge as both lucrative targets for credential theft and novel malware payloads, requiring a renewed focus on authentication and governance."
tools:
  - name: "OpenClaw"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Klein"
    url: null
  - name: "npm"
    url: null
categories:
  - "Security"
tags:
  - "authentication"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 32478
  outputTokens: 1607
  totalTokens: 34085
  processingTimeMs: 33547
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.515Z"
---

## Key Takeaways

This IBM Security Intelligence podcast, featuring experts from X-Force, analyzes the 2026 Threat Intelligence Index and related cybersecurity trends. The panel discusses the shifting attack landscape, the unique threats posed by AI, and the persistent challenge of implementing basic security hygiene.

*   **Public-facing application exploits surged 44%**, becoming the top attack vector, with 56% of these vulnerabilities not requiring authentication to exploit.

*   **Credential theft remains highly popular (32% of incidents)** because it's low-cost, effective, and allows attackers to masquerade as legitimate users, flying under detection radars.

*   **AI agents are dual-purpose threats**: they are prime targets for credential theft (over 300,000 ChatGPT credentials found on dark web) due to their broad permissions, and are now being used as novel malware payloads themselves.

*   **Core security fundamentals are still the biggest weakness**, including broken access controls, weak authentication, and human error, indicating that known fixes are not being consistently applied.

*   **Supply chain attacks increased fourfold**, highlighting the tension between business speed and security due diligence, and the vulnerability in the 'gaps' between interconnected systems.

## Summary

### Introduction and 2026 Threat Intelligence Index HighlightsThe podcast, hosted by Matt Kazinski, features IBM X-Force experts Claire Nunees, Chris Cedi, and Joe Satri. They begin by dissecting the key findings from the newly released 2026 IBM X-Force Threat Intelligence Index (TII). The report, compiled from incident response data, penetration tests, and dark web monitoring, reveals a significant shift in the cyber threat landscape.

The most striking finding is a **44% increase in the exploitation of public-facing applications**, making it the top attack vector for the year. Chris Cedi, an author of the report, notes that over half (56%) of these exploited vulnerabilities did not require any authentication, representing a critical security oversight. The panel attributes this surge to the rise in **supply chain attacks** targeting development ecosystems. As systems become more interconnected, the interfaces and trust relationships between them create new vulnerabilities for attackers to exploit.

### The Persistence of Basic Security Failures and Credential Theft

A recurring theme is the failure to implement **security 101** practices. Joe Satri points out that the ease of deploying applications often leads to skipping fundamental steps like multi-factor authentication (MFA) and proper code security. The prevalence of unauthenticated exploits underscores this gap. Claire Nunees adds that human factors, like phishing, remain the weakest link, a reality reflected in their cyber range training scenarios.

While displaced from the top spot, **credential theft** was still the initial vector in 32% of incidents. Chris explains its enduring popularity: it is low-cost, highly effective, and allows attackers to operate stealthily by appearing as legitimate users. The report also found over **300,000 ChatGPT credentials exposed on the dark web**. Joe warns that AI credentials are particularly valuable targets because AI agents are often granted extensive permissions across systems, databases, and domains. Compromising an AI agent provides an attacker with broad access and capabilities, a concept they refer to as 'stealing the AI's soul'.

### AI Agents as Both Targets and WeaponsThe discussion delves into two recent stories that illustrate the dual nature of AI in the threat landscape. First, info-stealer malware was found exfiltrating OpenClaw agent configuration files (termed 'soul.md' files), which contain the agent's operating principles and guidelines. Claire cautions against anthropomorphizing AI but agrees that stealing a customized agent could expose sensitive organizational data or proprietary processes embedded in its training and interactions.

Second, attackers compromised an npm package for the AI coding tool 'Klein' to secretly install the OpenClaw agent on victims' devices. This represents AI agents being used as the **malware payload itself**. Chris and Joe note this is a dangerous evolution of supply chain attacks, where a trusted component delivers a highly capable, autonomous agent with significant permissions, all without the user's knowledge. This tactic opens the door to new, disruptive forms of attack.

### Weaknesses in AI Infrastructure and GovernanceThe conversation turns to a Cisco report on the state of AI security, which warns that core AI infrastructure components are vulnerable. Protocols like the **Model Context Protocol (MCP)** and agent-to-agent communication have created a vast, often unmonitored attack surface. Furthermore, most model repositories lack cryptographic assurances of a model's provenance, training data, or modifications.

Joe emphasizes the critical need for **AI governance**. Organizations must have programs to vet and authorize AI tools, but they also must contend with 'shadow AI'—employees using unauthorized AI services that could leak sensitive company data. Chris laments that, despite years of advocacy for 'security by design,' new technologies like AI still see security treated as an afterthought due to the pressure to rush to market.

### A Human-Centric Approach to Threat IntelligenceThe final segment discusses an op-ed advocating for organizing threat intelligence around **human vulnerabilities** rather than adversary types (e.g., nation-state vs. cybercriminal). The argument is that tactics like email bombing are used across different threat categories, and defenses focused on the human impact (financial loss, data theft, harassment) could be more effective and broadly understandable.

Chris sees value in both specialized expertise and this unified approach, especially when communicating risks to clients. Joe shares lessons from collaborative initiatives like the Costa Rica Cybersecurity Cluster, where sharing experiences across organizations reveals common blind spots and best practices. Claire stresses the importance of making threat intelligence **human-centered** and digestible, helping people understand how threats personally impact them, not just their organization.

The podcast concludes by highlighting that reports like the TII aim to bridge this gap, offering both deep technical analysis and executive summaries to make critical threat intelligence accessible to a wider audience, from analysts to everyday users.

## Context

This is an episode of IBM's weekly cybersecurity podcast, 'Security Intelligence,' hosted by Matt Kazinski. The panel consists of IBM X-Force experts: Claire Nunees (Creative Director, Cyber Range), Chris Cedi (Cyber Threat Analyst), and Joe Satri (CTM Chief Architect). The discussion is framed around the release of the annual 2026 IBM X-Force Threat Intelligence Index, a comprehensive report on the cyber threat landscape. The conversation is highly relevant as it analyzes the most current attack trends, including the explosive growth of AI-related threats, while critiquing the industry's persistent failure to implement basic security measures. Security professionals, IT leaders, developers, and anyone involved in organizational risk management would benefit from the insights into evolving attack vectors and practical defensive recommendations.
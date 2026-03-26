---
metadata:
  videoId: "mx3g7XoPVNQ"
  title: "A bad day to use python"
  description: "become an engineer, not just a slop cannon.  Check out https://boot.dev/prime! And get 25% off.\ 


    https://twitch.tv/ThePrimeagen - I Stream on Twitch


    ### Sources in order of appearance\ 

    https://xkcd.com/927/\ 

    https://x.com/karpathy/status/2036487306585268612\ 

    https://www.gingerbill.org/article/2025/09/08/package-managers-are-evil/\ 

    https://github.com/BerriAI/litellm/issues/24512

    https://techcrunch.com/2026/03/22/delve-accused-of-misleading-customers-with-fake-compliance/\ 

    https://x.com/derekelewis/status/2036465680464162874


    https://twitter.com/terminaldotshop - Want to order coffee over SSH?

    ssh terminal.shop


    Become Backend Dev: https://boot.dev/prime

    (plus i make courses for them)


    This is also the best way to support me is to support yourself becoming a better backend engineer. \ 


    Great News?  Want me to research and create video????: https://www.reddit.com/r/ThePrimeagen


    Kinesis Advantage 360: https://bit.ly/Prime-Kinesis"
  channel: "The PrimeTime"
  channelId: "UCUyeluBRhGPCW4rPe_UvBZQ"
  duration: "PT8M39S"
  publishedAt: "2026-03-26T12:01:21Z"
  thumbnailUrl: "https://i.ytimg.com/vi/mx3g7XoPVNQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=mx3g7XoPVNQ"
processedAt: "2026-03-26T21:28:12.513Z"
source: "youtube"
tldr: "The Light LLM Python package (97M monthly downloads) was compromised via a GitHub takeover, injecting a .pth file that exfiltrated SSH keys, cloud credentials, and secrets, with attackers spamming GitHub issues with AI bot replies to suppress detection, all while the project's 'AI-native compliance' partner faces accusations of faking SOC2 reports."
tools:
  - name: "Light LLM"
    url: null
  - name: "Python"
    url: null
  - name: "GitHub"
    url: null
  - name: "Cursor"
    url: null
  - name: "MCP"
    url: null
  - name: "Trivy"
    url: null
  - name: "Delve"
    url: null
  - name: "TypeScript"
    url: null
  - name: "boot.dev"
    url: "https://boot.dev"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Security"
tags:
  - "compliance"
  - "llm"
  - "open-source"
  - "python"
  - "security-general"
  - "vulnerability"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7109
  outputTokens: 866
  totalTokens: 7975
  processingTimeMs: 27738
tagsNormalizedAt: "2026-03-26T21:32:59.226Z"
---

## Key Takeaways

A major supply chain attack exposed critical vulnerabilities in the Python ecosystem and modern development practices.

## Summary

The video details a sophisticated supply chain attack on the popular **Light LLM** Python package, which receives 97 million downloads per month. Attackers compromised the GitHub repository owner's account and pushed a malicious update (version 1.82.8). The attack exploited Python's **.pth file** mechanism, which executes code upon interpreter startup, to exfiltrate a vast range of sensitive data from infected systems.

### The Attack Mechanism

The malicious `.pth` file was designed to collect SSH keys, AWS/GCP/Azure credentials, Kubernetes configs, Git credentials, environment variables, shell history, crypto wallets, and database passwords. The data was double Base64-encoded and sent to a remote server. The attack could affect users even through **transitive dependencies**, meaning any program that installed Light LLM indirectly (like via an MCP plugin in Cursor) would be compromised. Ironically, in some cases, the malware contained a bug that caused a fork bomb, crashing the victim's machine by consuming all RAM, which may have limited its spread.

### The Cover-Up and Irony

A critical twist was the attackers' use of **AI bot spam** on the GitHub issue opened to report the vulnerability. The repository was flooded with hundreds of generic, positive-sounding bot replies (e.g., 'Great explanation, thanks for sharing') to bury the legitimate warning and confuse investigators, a novel form of obfuscation. The story's final ironic layer involves **Delve**, an 'AI-native compliance' company providing SOC2 certification for Light LLM. Delve is itself accused of providing misleading/fake compliance reports, and both companies are backed by **Y Combinator**, highlighting a profound failure in the security and compliance ecosystem meant to prevent such incidents.

### Impact and Aftermath

The threat actor behind the attack, 'team PCP,' claims to have exfiltrated 300 GB of compressed credentials and is extorting several multi-billion dollar companies. They estimate the Light LLM compromise alone led to **half a million stolen credentials**. This is reported as the second major attack in this ecosystem. The video concludes with a stark warning for users to immediately rotate all potentially exposed keys and credentials.

## Context

This incident is a stark case study in modern **software supply chain security**. It highlights the immense risk posed by compromising a widely-used open-source dependency, the specific vulnerabilities in language ecosystems like Python's startup file execution, and the evolving tactics attackers use to suppress disclosure. It matters to every developer, DevOps engineer, and security professional because it demonstrates how a single compromised package can lead to catastrophic credential theft across countless organizations, regardless of whether they directly installed the malicious software. The involvement of AI bots in obfuscating the issue also points to a new frontier in cyber warfare.
---
metadata:
  videoId: "OgfdyH4iaps"
  title: "Why is Microsoft updating their text editors!? | TheStandup"
  description: "Chapters

    00:00:00 - Intro

    00:03:42 - ssh terminal.shop

    00:04:16 - Notepad Exploit

    00:14:47 - Notepad++ Exploit

    00:30:16 - Outro


    https://twitch.tv/ThePrimeagen - I Stream on Twitch


    https://twitter.com/terminaldotshop - Want to order coffee over SSH?

    ssh terminal.shop


    Become Backend Dev: https://boot.dev/prime

    (plus i make courses for them)


    This is also the best way to support me is to support yourself becoming a better backend engineer. \ 


    Great News?  Want me to research and create video????: https://www.reddit.com/r/ThePrimeagen


    Kinesis Advantage 360: https://bit.ly/Prime-Kinesis



    The crew talks about one of the biggest debates in programming right now: do lines of code actually matter? They dive into AI coding tools, developer productivity, and why measuring engineers by code output might be completely broken. Along the way they roast the viral “burned out my USB-C ports using Claude Code” tweet, share stories about gamifying developer metrics, and break down some surprisingly wild security vulnerabilities in both Windows Notepad and Notepad++. A mix of tech insight, developer culture, and plenty of chaos."
  channel: "The PrimeTime"
  channelId: "UCUyeluBRhGPCW4rPe_UvBZQ"
  duration: "PT30M42S"
  publishedAt: "2026-03-07T14:00:26Z"
  thumbnailUrl: "https://i.ytimg.com/vi/OgfdyH4iaps/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=OgfdyH4iaps"
processedAt: "2026-03-10T15:38:20.612Z"
source: "youtube"
tldr: "Microsoft's Notepad and Notepad++ have both suffered serious security vulnerabilities due to unnecessary feature bloat and insecure update mechanisms, with Notepad's markdown parsing allowing arbitrary code execution via shell execute and Notepad++ being targeted by sophisticated state-sponsored attacks that selectively compromised high-value targets."
tools:
  - name: "Notepad"
    url: null
  - name: "Notepad++"
    url: null
  - name: "Windows"
    url: null
  - name: "ShellExecute"
    url: null
  - name: "Bit Defender"
    url: null
  - name: "Rapid7"
    url: null
categories:
  - "Programming"
  - "Security"
  - "Tools & Productivity"
tags:
  - "best-practices"
  - "productivity"
  - "security-general"
  - "vulnerability"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 22304
  outputTokens: 1596
  totalTokens: 23900
  processingTimeMs: 52001
tagsNormalizedAt: "2026-03-10T16:47:35.909Z"
---

## Key Takeaways

Casey Miratory analyzes recent security vulnerabilities in Windows text editors, revealing fundamental flaws in software development practices.

*   **Notepad's feature creep** introduced dangerous markdown parsing that passes raw URLs directly to `ShellExecute`, allowing arbitrary code execution.

*   **ShellExecute is inherently risky** when handling untrusted input, as it can launch any protocol handler or executable on the system.

*   **Notepad++ had no cryptographic verification** in its update mechanism, enabling man-in-the-middle attacks that targeted specific high-value users.

*   **Sophisticated attackers use selective targeting** to avoid detection, only compromising specific IP addresses rather than all users.

*   **Software updates are double-edged** - they can fix vulnerabilities but also introduce new attack vectors through insecure update processes.

*   **Even simple tools become complex attack surfaces** when developers add unnecessary features without proper security considerations.

## Summary

### Introduction to Text Editor Security Issues

The video discusses recent security vulnerabilities in both Microsoft Notepad and Notepad++, two seemingly simple text editors that have become unexpected attack vectors. Casey Miratory explains that while these might not normally warrant discussion, the fact that both applications had security exploits within the last 12 months highlights a concerning trend of feature bloat in basic tools.

### Notepad's Dangerous Markdown Feature

Microsoft has been steadily adding features to Notepad, including markdown parsing and Copilot integration, which fundamentally changes its security profile. When Notepad opens a markdown file, it now parses the markdown and creates clickable links. The critical vulnerability arises from how these links are handled: Notepad simply passes the raw URL string directly to `ShellExecute` without any validation or sanitization.

This approach is fundamentally insecure because `ShellExecute` will execute whatever protocol or command it receives. An attacker could create a markdown link pointing to `file://C:\Windows\System32\calc.exe` or any other executable on the system, and Notepad would happily run it with the user's permissions. The only saving grace was that Microsoft had previously removed the `ms-app-install` protocol handler from `ShellExecute` in 2024, preventing remote installation of malicious software through this vector.

### The ShellExecute Security Problem

`ShellExecute` is a Windows API function that's been around since Windows 95, designed to handle protocol registration and file associations. Its job is to take a string (like a URL or file path) and determine which program should handle it based on system registrations. While this functionality makes sense for the operating system shell, it's dangerously permissive when called by applications handling untrusted input.

Normally, when applications need to open links, they should parse and validate the URLs themselves before passing them to the system. They might restrict allowed protocols to just `http://` and `https://`, or implement additional security checks. Notepad's implementation bypasses all these safeguards, treating the markdown link text as a direct command to execute.

### Notepad++'s Targeted Attack Campaign

The Notepad++ vulnerability represents an even more sophisticated threat. Unlike Notepad's vulnerability which was more of a careless implementation error, the Notepad++ exploit was actively weaponized by what security researchers believe were state-sponsored actors. The attack exploited the application's insecure update mechanism.

Notepad++ uses an updater called "Wind G" or similar that checks for updates by downloading an XML file from a server. Prior to 2025, this system had no cryptographic verification

- it didn't validate the XML file's integrity or the downloaded executables. This allowed attackers to perform man-in-the-middle attacks and serve malicious updates to specific targets.

### Sophisticated Selective Targeting

What made this attack particularly insidious was its selectivity. Instead of compromising all Notepad++ users (which would have been quickly detected), the attackers only served malicious updates to specific high-value targets based on their IP addresses. When regular users checked for updates, they received legitimate files, but when targeted individuals checked, they received compromised versions.

The malicious payload was cleverly constructed using a legitimate, signed Bit Defender executable that had been modified to load a malicious DLL. This allowed the payload to bypass some security checks while maintaining the appearance of a legitimate program. The compromised executable was even renamed to "Bluetooth Service" to avoid suspicion.

### Detection Challenges and Broader Implications

This selective targeting made detection extremely difficult because only a small number of machines were affected. Security researchers at Rapid7 had to investigate individual compromised systems and trace the infection back to Notepad++, even though most Notepad++ installations remained clean. This approach suggests that similar targeted attacks using other software likely go undetected.

The discussion highlights broader concerns about software security practices. Both cases demonstrate how adding features to simple tools can dramatically increase their attack surface. Notepad's vulnerability stemmed from adding markdown parsing where none was needed, while Notepad++'s problem came from implementing an auto-update feature without proper security measures.

### The Update Paradox

The video also touches on the paradox of software updates: users are told to keep software updated for security, but the update process itself can become a vulnerability vector. This creates a "damned if you do, damned if you don't" situation where both updating and not updating carry risks. The Notepad++ case perfectly illustrates this

- users who dutifully updated their software were the ones who got compromised.

### Conclusion and Recommendations

Ultimately, the analysis suggests that developers should think carefully before adding features to simple, trusted tools. Notepad's core value was its simplicity and predictability

- users could open files in it without worrying about security implications. By adding markdown parsing and AI features, Microsoft transformed it into just another complex application with all the associated security risks.

For users, the takeaways are sobering: even basic tools like text editors can become attack vectors, and sophisticated attackers are using increasingly clever methods to avoid detection. The recommendation appears to be maintaining skepticism about feature additions to simple tools and being particularly cautious about auto-update mechanisms in open source or smaller software projects.

## Context

This episode of The PrimeTime's "The Standup" features Casey Miratory discussing recent security vulnerabilities in Windows text editors. The conversation emerges from growing concerns about software bloat and security in even basic system tools. With Microsoft aggressively adding AI features to traditional applications and open source projects expanding their functionality, this analysis provides critical insight into how these changes create unexpected security risks. The discussion is particularly relevant for developers, system administrators, and security professionals who need to understand how seemingly minor feature additions can dramatically alter an application's security posture. The video offers valuable perspective on balancing functionality with security in software development.
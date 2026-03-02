---
metadata:
  videoId: "cElrGIyVzHg"
  title: "SSH Key Generation Made Easy | Works on Windows, Mac & Linux"
  description: "The fastest way to generate SSH keys with one simple command. This tutorial explains the ssh-keygen process, the difference between public and private keys, and how to secure your keys with encryption. No complicated setup required!


    Perfect tutorial for beginners! No prior experience needed. 💻


    Save this tutorial for when you need it! 💾


    #SSHKeys #GitHubTutorial #DevOps #CodingTutorial #Programming #WebDevelopment  #TechTips #LearnToCode #DeveloperTools #LinuxTutorial #CyberSecurity #ServerManagement #SSH  #SoftwareDevelopment #ITTips #CloudServer #DevLife #ProgrammingTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M26S"
  publishedAt: "2026-01-16T15:45:03Z"
  thumbnailUrl: "https://i.ytimg.com/vi/cElrGIyVzHg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=cElrGIyVzHg"
processedAt: "2026-01-20T17:09:36.919Z"
source: "youtube"
tldr: "Generate SSH keys by running `ssh-keygen`, pressing Enter three times for default settings, or optionally set a password to encrypt the private key for added security, then share only the public key file (ending in .pub)."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 893
  outputTokens: 691
  totalTokens: 1584
  processingTimeMs: 42945
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "OpenSSH"
    url: null
  - name: "GitHub"
    url: null
  - name: "AWS"
    url: null
  - name: "Microsoft Azure"
    url: null
  - name: "Google Cloud"
    url: null
  - name: "PowerShell"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Security"
  - "Tools & Productivity"
tags:
  - "aws"
  - "azure"
  - "encryption"
  - "gcp"
  - "git"
  - "terminal"
tagsNormalizedAt: "2026-03-01T21:19:30.316Z"
---

## Key Takeaways

This video demonstrates the quickest method to generate SSH keys across all operating systems for use with services like Git

Hub or cloud servers.

*   Use the **`ssh-keygen`** command from your terminal (Command Prompt/Power

Shell on Windows).

*   Press **Enter three times** to generate keys with default settings, or set a **passphrase** at the prompts to encrypt your private key for protection.

*   The command creates a **private key** (never share) and a **public key** (safe to share); the public key acts like a 'lock' that only your private 'key' can open.

*   Copy the entire text from the **.pub file** using a text editor to paste it where required, such as on a server or in a Git

Hub account.

## Summary

### The Quick Generation Method
To generate SSH keys quickly, open a terminal (Command Prompt or Power

Shell on Windows, Terminal on Mac/Linux) and run the `ssh-keygen` command. When prompted, simply press **Enter three times** in succession. This accepts all default options, including the default file location, and generates the keys without a passphrase.

### Adding a Passphrase for Security
For additional protection, you can encrypt your private key with a passphrase. After running `ssh-keygen`, still press Enter at the first prompt to accept the default file location. At the subsequent prompts for a passphrase, type your chosen password (nothing will appear on screen for security) and confirm it. This creates an encrypted private key file, meaning if someone steals the file, they cannot use it without knowing the passphrase.

### Understanding the Generated Keys
The `ssh-keygen` command creates two files in the default `.ssh` directory.

*   The **private key** (e.g., `id_rsa`) is for your use only. You must **never share this file** with anyone.

*   The **public key** (e.g., `id_rsa.pub`) is safe to share with coworkers, companies, or servers. You can think of it as giving someone a lock that only your private key can unlock.

### Using Your Public Key
To use the generated key, you need to provide the public key to the service (like a Git

Hub account or a cloud server). Locate the `.pub` file, open it in any text editor, select all the text inside, and copy it. You then paste this entire block of text into the appropriate field on the service where you are setting up SSH access.

## Context

SSH (Secure Shell) keys are a fundamental security mechanism for authenticating to remote servers and services like Git

Hub, replacing the need for passwords. They are essential for developers, system administrators, and anyone working with cloud infrastructure (AWS, Azure, GCP) or version control. Knowing how to quickly generate and securely manage these keys is a core sysadmin and Dev

Ops skill, forming the basis for secure, automated access to critical systems.
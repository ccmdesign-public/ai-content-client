---
metadata:
  videoId: "05gUqcHevzk"
  title: "Generate SSH Keys in 10 Seconds (Windows, Mac & Linux)"
  description: "🔐 Stop sharing passwords. Start using SSH keys.


    Passwords can be intercepted, shared, and stolen. SSH keys can't  because your private key never leaves your device.


    With one command (ssh-keygen), you get a public + private key pair that works on any OS.


    Public key = the lock you share 🔓

    Private key = the key only YOU keep 🗝️


    Set it up in 10 seconds. Works on Windows, Mac & Linux.


    #SSHKeys #DevOps #Linux #CyberSecurity #TechTips #CloudComputing #GitHub #SysAdmin #Programming #DevOpsBeginners #Coding #ServerAccess"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT2M17S"
  publishedAt: "2026-03-12T13:00:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/05gUqcHevzk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=05gUqcHevzk"
processedAt: "2026-03-12T15:49:37.888Z"
source: "youtube"
tldr: "SSH keys provide a more secure alternative to passwords for server and service authentication, and can be generated in seconds on any OS using the `ssh-keygen` command with an optional passphrase for added security."
tools: []
categories:
  - "Programming"
  - "Security"
  - "Tools & Productivity"
tags:
  - "authentication"
  - "open-source"
  - "security-general"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2935
  outputTokens: 744
  totalTokens: 3679
  processingTimeMs: 25201
tagsNormalizedAt: "2026-03-12T16:12:28.756Z"
---

## Key Takeaways

This video demonstrates how to quickly generate SSH key pairs and explains their fundamental security principle.

*   **SSH keys solve password-sharing problems:** They are more complex, harder to crack, and eliminate the need to share secret credentials.

*   **Public vs. Private Key:** Share your **public key** (the 'lock') with services like GitHub or servers; never share your **private key** (the 'key').

*   **Universal generation:** Use the `ssh-keygen` command on Windows (Command Prompt/PowerShell), macOS, or Linux, pressing Enter to accept defaults for a quick setup.

*   **Optional passphrase:** Adding a password during generation encrypts the private key file, providing protection if the file is stolen.

## Summary

The video addresses the security weakness of password-based authentication, where sharing temporary passwords creates risk. **SSH keys** offer a superior solution by using a key pair: a **public key** that acts as a lock you can install anywhere, and a **private key** that remains securely on your device to unlock access.

### How to Generate SSH Keys

The process is standardized across operating systems. On Windows, open Command Prompt or PowerShell. On macOS or Linux, open a terminal. Then, simply run the command:
`ssh-keygen`

For the fastest setup, press **Enter three times** at all prompts. This accepts the default file location and creates an unencrypted key pair. The command outputs the file paths for both your new private key (e.g., `id_rsa`) and public key (e.g., `id_rsa.pub`).

### Adding a Passphrase for Security

For additional protection, you can encrypt the private key with a passphrase. When running `ssh-keygen`:
1.  Press Enter to accept the default file location (so other programs can find it).
2.  At the 'Enter passphrase' prompt, type a secure password (nothing will display on screen).
3.  Re-enter the same passphrase to confirm.
This ensures that even if someone steals your private key file, they cannot use it without the passphrase.

### Using Your New Keys

After generation, you can safely share your **public key**. Find it in the location shown in the terminal output (the file ending in `.pub`). Open it in any text editor, copy the entire text, and paste it wherever required—such as on a cloud server, GitHub repository, or internal company system. Remember the core principle: **you share the lock (public key), not the key (private key)**.

## Context

SSH (Secure Shell) is the standard protocol for secure remote access to servers and for authenticating to services like GitHub. Moving from password-based authentication to SSH keys is a fundamental DevOps and security best practice. It enhances security by removing shared secrets and is essential for developers, system administrators, and anyone managing infrastructure or code repositories. This tutorial provides the critical first step for setting up secure, automated access.
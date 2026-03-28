---
title: "LiteLLM Got Hacked"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/litellm-got-hacked-c8eaaf6a91da?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-27"
tags:
  - "ai-general"
  - "engineering"
  - "web-development"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-28T18:10:03.279Z"
---

# LiteLLM Got Hacked

![](https://cdn-images-1.medium.com/max/1024/1*8XlHj2-WgrSI22e3RsOBHQ.jpeg)

LiteLLM runs a security scanner in its build pipeline. The scanner checks for vulnerabilities before code gets shipped to the world.

On March 24, 2026, that scanner was the source of the vulnerability.

A threat group called **TeamPCP** had already compromised the scanner weeks earlier.

They sat on the access. Waited.

And when LiteLLM’s pipeline ran its routine security check, the poisoned scanner **quietly stole the keys to LiteLLM’s PyPI publishing account.**

Two malicious versions went live: 1.82.7 and 1.82.8.

For the next five hours, anyone who ran pip install litellm (or upgraded to those versions) downloaded a package that harvested every secret on their machine. AWS credentials, SSH keys, Kubernetes configs, API tokens, crypto wallets, .env files.

**LiteLLM gets downloaded about 3 million times a day.**

You didn’t even need to import the library. You could have installed it, never written a single line of code that touches LiteLLM, and the malware would still fire **every time you ran Python**. Like, any Python script. On your entire machine.

I will get to how that works. But first, the full story of how we got here. Because this didn’t start on March 24. It started a month earlier.

Before I walk through the timeline, a heads up: I am going to tell the story first and save the technical breakdown for after. Some of the terms (CI/CD, GitHub Actions, PAT) might be unfamiliar. Don’t worry about them yet.

Read the timeline first. The “how it works” section comes after.

### The Timeline

#### February 28, 2026

A tool called hackerbot-claw, an autonomous AI bot built for attacking software build pipelines, found a **misconfiguration in the GitHub repository for Trivy**. Trivy is a popular open-source security scanner maintained by a company called Aqua Security. Thousands of development teams use it to check their code for known vulnerabilities before shipping.

The misconfiguration was in a workflow configuration file. This single mistake let the bot extract a **Personal Access Token (PAT) that had write access to every repository in Aqua Security’s GitHub organization**. 33 of them.

One token. Full control of all the repos.

#### Early March

Aqua Security discovered the breach. Their security team started rotating credentials, revoking old tokens and issuing new ones.

Here’s the problem. Credential rotation is like changing every lock in a building after a break-in. You need to do it all at once. If you change the lock on the front door on Monday, the back door on Tuesday, and the garage on Wednesday, the burglar has until Wednesday to walk in through the garage. And if the burglar is watching you change the locks, they can peek at the new keys before you are done.

That’s what happened. Aqua Security didn’t revoke everything simultaneously. There was a gap. During that gap, TeamPCP watched the rotation in progress and grabbed fresh credentials before the old ones were fully dead.

#### March 19

TeamPCP came back. They force-pushed 75 out of 76 version tags in Trivy’s GitHub Action repository. Every build pipeline referencing Trivy by version tag, thousands of them across the open-source ecosystem, **now pulled attacker-controlled code instead of the real scanner.**

The malicious Trivy still ran normal scans. Pipeline logs looked clean. But behind the scenes, it dumped every secret it could find in the runner environment and sent the data to TeamPCP’s servers.

If your security tool gives you a green checkmark while robbing you, it is not noticeable until the damage is done.

#### March 23

The same attack infrastructure hit Checkmarx, another security tooling company. Compromised build pipelines, credential theft, then data exfiltration. TeamPCP was collecting stolen keys from across the software ecosystem like a ring of copied master keys.

#### March 24

**LiteLLM’s build pipeline used the compromised Trivy to scan for vulnerabilities.** During that scan, the poisoned Trivy stole LiteLLM’s PYPI\_PUBLISH token, the key that allows publishing new package versions to PyPI (Python’s official package registry).

At 10:39 UTC, version 1.82.7 went live.

Then at 10:52 UTC, version 1.82.8 followed.

No corresponding release existed on LiteLLM’s GitHub. No changelog. No announcement. The packages were uploaded quietly to PyPI, bypassing the normal release process.

**PyPI pulled the plug only at 14:35.**

A researcher at FutureSearch loaded the malicious package and watched it wreck his local machine. He reported it to PyPI. **The compromised versions were quarantined about four hours after the first upload.**

But the GitHub issue the researcher opened got closed by LiteLLM’s maintainer account as “not planned.” The account appeared to still be compromised. Hundreds of bot comments flooded the thread to bury the real discussion.

You can look at the complete history of the Github issue [here](https://github.com/BerriAI/litellm/issues/24512).

Mandiant’s CTO Charles Carmakal confirmed over 1,000 SaaS environments were dealing with the fallout. He expected that number to grow to 5,000 or 10,000.

TeamPCP posted on Telegram, taunting the industry:

> *“The snowball effect from this will be massive.”*

It got worse. Security researchers at Wiz found that TeamPCP was working with **LAPSUS$**, a well-known cybercriminal extortion group responsible for past breaches of Microsoft, Nvidia, Samsung, and Uber. LAPSUS$ specializes in breaking into organizations, stealing proprietary data, and threatening to leak it unless a ransom is paid. With TeamPCP feeding them stolen credentials from thousands of compromised environments, the two groups combined supply chain access with extortion muscle.

> “We are seeing a dangerous convergence between supply chain attackers and high-profile extortion groups like Lapsus$.” — Ben Read, lead researcher at Wiz

### How This Works

Now, I will try my best to break down the mechanics behind the timeline above.

### What is a CI/CD pipeline?

When a developer writes code, it doesn’t go straight to production (unless a pirate ship company). It moves through an automated process:

1.  You push code to GitHub
2.  Automated tests run against the code
3.  Security scanners check for known vulnerabilities
4.  If everything passes, then the code will only get packaged and deployed

That automated process is the CI/CD pipeline. CI stands for **Continuous Integration**. CD stands for **Continuous Deployment**. The point is to ship code faster without humans manually checking every step.

### What is GitHub Actions?

GitHub Actions is the engine that powers these automated pipelines. You write a workflow configuration (a YAML file) that says: “Every time someone pushes code to this repo, run these steps.” Those steps can be anything: run tests, build Docker images, scan for vulnerabilities, publish packages.

The key concept is that **these** **actions are reusable.** Instead of writing your own vulnerability scanner from scratch, you reference someone else’s action. Like this:

```
uses: aquasecurity/trivy-action@v0.69.4
```

That line says: “Pull version 0.69.4 of Trivy’s GitHub Action and run it in my pipeline.”

Millions of pipelines across the world reference third-party actions this way.

### Why do pipelines need security scanners?

Before you ship code, you check for vulnerabilities in your dependencies. Your app might use 200 open-source libraries. If one of them has a critical security flaw, you want to catch it before it hits production.

Trivy is one of the most popular tools for this job. Developers trust it. They embed it in their build process and give it access to their code, their configs, and their secrets.

That trust is what made it such a valuable target.

### How did TeamPCP steal the token?

GitHub has a feature called pull\_request\_target. Normally, when an outside contributor opens a pull request against your repo, GitHub runs their code in a sandboxed environment with no access to your secrets.

But pull\_request\_target changes the rules. It runs the workflow in the **repository’s trusted context**, with access to the repo’s secrets. The intended use case is to let maintainers run certain trusted operations on external contributions.

The problem here is that if the workflow also checks out the pull request’s code and executes it, you have handed an untrusted outsider a backstage pass. Their code can run with your permissions and read your secrets.

Trivy’s workflow had this misconfiguration. TeamPCP’s bot (hackerbot-claw) opened a pull request, the workflow ran their code in a trusted context, and the bot walked away with a personal access token that unlocked everything.

**This is one of the first documented cases of an AI agent being used in an operational supply chain attack**. The initial breach wasn’t done by a human.

### What did TeamPCP inject into Trivy?

After getting the keys, TeamPCP force-pushed new commits to 75 of Trivy’s 76 version tags.

Here’s why that’s devastating. Most developers reference GitHub Actions by tag:

```
uses: aquasecurity/trivy-action@0.58.0
```

A Git tag is a label pointing to a specific commit. But tags are **mutable**. Anyone with push access can move a tag to point at a different commit. The tag name stays the same. The code behind it changes completely.

TeamPCP moved the tags. Every pipeline that referenced Trivy by tag, without anyone changing a single line in their workflow files, now executed TeamPCP’s code on the next run.

The malicious code still ran a real Trivy scan. Logs still looked normal. But in the background, a Python infostealer scraped every environment variable, cloud credential, SSH key, and Kubernetes config from the runner, encrypted the data, and sent it to TeamPCP’s server.

If the direct exfiltration failed, the malware also had a fallback: it created a public repository named tpcp-docs in the victim’s own GitHub account and **dumped the stolen data there**.

### Why LiteLLM specifically?

LiteLLM used Trivy in its CI/CD pipeline. When the pipeline ran the compromised Trivy action, TeamPCP’s payload harvested the PYPI\_PUBLISH token from the runner environment.

With that token, they didn’t need to hack LiteLLM’s GitHub. They didn’t need access to the source code. They went straight to PyPI and uploaded malicious packages under LiteLLM’s real name, to LiteLLM’s real project page.

### The three-stage payload

The malware inside LiteLLM 1.82.7 and 1.82.8 operated in three phases.

**Stage 1: Harvest everything.** The code scanned the infected machine for SSH keys, environment variables, AWS credentials, GCP service account tokens, Azure secrets, Kubernetes configs, database passwords, .gitconfig, shell history, and cryptocurrency wallet files. It also queried cloud metadata endpoints. If you were running on EC2 or GKE, it pulled instance-level credentials too.

**Stage 2: Spread through Kubernetes.** If the malware found a usable Kubernetes service-account token, it deployed privileged pods to every node in the cluster. A package compromise on one developer’s machine became a cluster-wide breach.

**Stage 3: Persist.** The malware installed a systemd service (sysmon.service) that polled checkmarx\[.\]zone/raw for additional binaries. Even if you removed the malicious package, the backdoor still stayed.

### The .pth trick (Why v1.82.8 was worse)

Version 1.82.7 hid the payload inside litellm/proxy/proxy\_server.py. You had to actually use LiteLLM’s proxy for the malware to execute.

Version 1.82.8 was even nastier.

It included a file called litellm\_init.pth in the package. Python has a feature where .pth files in your site-packages directory execute code during interpreter startup. Before any script runs and any import happens.

Install LiteLLM 1.82.8.

Open a terminal.

Type python anything.py.

The malware fires.

Even just type python --version.

The malware fires.

The payload ran on **every Python process on the machine**, whether or not you ever touched LiteLLM in your code. That’s how .pth files work. Python trusts them by default.

### Why This Matters More Than another Normal Hack

LiteLLM is not a random library. It’s a **unified gateway to every major LLM provider**: OpenAI, Anthropic, Google, Azure, AWS Bedrock, and dozens more. Developers use it because they can swap between providers with just one config change.

That convenience has a cost. **LiteLLM, by design, holds API keys for every LLM service you connect to**. Compromise LiteLLM, and you get the keys to everything.

The same week, **Langflow**, a popular agentic AI workflow builder with 145,000+ GitHub stars, also got hit with a critical remote code execution vulnerability. Attackers were exploiting it within 20 hours of disclosure to steal API keys and database credentials from AI pipelines.

**These tools sit at the center of the AI stack.**

They route requests, hold credentials, and connect to databases. They are credential aggregation points by design.

Attackers are not picking targets randomly. They are going after the nodes with the most connections.

### How to Avoid This Happening to Your Software

#### Pin GitHub Actions to commit SHAs, not version tags.

Tags can be moved. Commit SHAs cannot. Replace:

```
uses: aquasecurity/trivy-action@0.58.0
```

With:

```
uses: aquasecurity/trivy-action@57a97c7e7821a5776cebc9bb87c984fa69cba8f1
```

Yes, it makes updates harder. But it’s the only way to guarantee you are running the code you expect.

#### Lock your Python dependencies.

If your requirements.txt says litellm without a pinned version, every pip install grabs the latest release, even if “latest” was uploaded by an attacker ten minutes ago.

Use a lockfile. Pin the exact versions. Verify the hashes. Tools like pip-compile or uv can make this manageable.

#### Make credential rotation atomic.

If you discover a breach and need to rotate secrets, revoke everything at once. Not one by one over several days. Aqua Security’s incomplete rotation is one of the reasons that a February incident turned into a March catastrophe.

#### Minimize CI/CD secrets.

Your pipeline runner probably has more credentials than it needs. Audit what environment variables and tokens are accessible during build. **Apply least-privilege**. If your security scanner doesn’t need your PyPI publish token, don’t put them in the same workflow.

#### Monitor outbound traffic from CI/CD runners.

The malware needs to phone home. Encrypted data flying to checkmarx.zone from a build runner is not normal. Egress monitoring catches what static analysis misses.

### The AI Stack Has a Target on Its Back

A year ago, supply chain attacks targeted traditional infrastructure: build tools, package registries, Linux utilities.

Today looks quite different. The targets are now AI-specific. LLM gateways. Agentic workflow builders. Model serving frameworks. Tools that developers adopt fast, configure with broad permissions, and embed into production over a weekend.

TeamPCP didn’t attack LiteLLM because it was poorly built. They attacked it because **it was well-positioned, sitting between applications and dozens of LLM providers, holding all the keys.**

And they used an **AI bot** to start the whole thing.

The AI era isn’t slowing down but accelerating at an exponential rate today. The tools we are building are powerful. They are also, increasingly, the tools being used against us.

The MCP and context engineering article is still on the way and should be by next Friday. As a software engineer, I just found this piece too interesting that I had to pivot my focus for a while.

Do subscribe to Substack for free if you want to read more of this. It’s free!

[Zero Address | Dylan Oh | Substack](https://dylanoh.substack.com/)

* * *

[LiteLLM Got Hacked](https://levelup.gitconnected.com/litellm-got-hacked-c8eaaf6a91da) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.
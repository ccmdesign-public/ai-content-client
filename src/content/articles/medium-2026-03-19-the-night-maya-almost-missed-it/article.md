---
title: "The Night Maya Almost Missed It"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/the-night-maya-almost-missed-it-69a8d18af79a?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-19"
tags:
  - "ai-general"
  - "compliance"
  - "engineering"
  - "python"
  - "security-general"
  - "web-development"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Security"
  - "Web Development"
tagsNormalizedAt: "2026-03-21T16:30:40.481Z"
---

# The Night Maya Almost Missed It

### How one open-source tool turned 175 scanner findings into 6 real problems — and saved a SOC 2 audit

It was 11:47 PM on a Tuesday. The audit was at 9 AM.

Maya had been triaging scanner findings since 6 PM — cross-referencing line numbers, pulling up files in VS Code, checking git blame, marking false positives one by one. For every finding she dismissed, three more stared back from the spreadsheet.

She was the senior security engineer at Meridian Pay, a fintech that had grown from twenty-three people in a WeWork to two hundred processing real transactions. SOC 2 Type II had been on the roadmap for months. Now the auditors were nine hours away.

The problem wasn’t that Meridian had no scanning. The problem was the opposite: Bandit for Python, Semgrep for the broader codebase, Trivy for containers, Gitleaks for secrets, Checkov for Terraform. Five tools, five output formats, five separate cron jobs. By the time she’d merged everything into one spreadsheet, she had 212 findings and no way to tell which ones mattered.

```
Your Codebase       │  ┌────┴────┐  │         │  ▼         ▼Bandit    Semgrep   ←── different output formats  │         │  ▼         ▼200 JSON   180 SARIF  ←── manual dedup neededfindings   findings  │         │  └────┬────┘       │  ┌────▼─────┐  │ Manually │  ←── 2-3 days of work  │ triage   │  │ in Excel │  └────┬─────┘       │  ┌────▼───────────┐  │ ???            │  │ Which are real?│  │ Which matter?  │  └────────────────┘
```

Bandit alone had flagged 63 subprocess calls. Most were fine. Maya knew this. But *knowing it* and *documenting that you know it for an auditor* are two entirely different problems.

### Row 147

At 12:31 AM, she almost skipped it.

Row 147. Bandit: B603 — subprocess call with shell=True. Payment processor service, run\_transaction.py, line 412. It looked exactly like the forty subprocess warnings she'd already dismissed.

Something made her pull up the file.

The function at line 412 was accepting input. Doing string interpolation before passing it to shell. And it was — she had to read it twice — reachable from the public-facing transaction webhook.

Not a false positive. An unauthenticated remote code execution vector inside the payment pipeline.

It had been sitting in her spreadsheet since 7 PM, indistinguishable from sixty-two other rows. If she’d called it a night an hour earlier — which she’d genuinely considered — it would have gone undocumented into an audit certifying the security of the entire platform.

She opened Slack. Scrolled back through a thread where her colleague Priya had mentioned something a few weeks ago:

> *“Has anyone looked at Kova? It’s open-source. Does AI triage. I’ve been meaning to try it on staging.”*

At 12:47 AM, Maya cloned the repo.

### Forty-One Minutes

She didn’t expect much. She’d been burned by tools that promised intelligence and delivered configuration complexity. But the setup was direct:

```
pip install -e ".[dev]"pip install bandit checkovbrew install semgrep gitleaks trivy
```

```
kova scan . --format sarif,table --provider anthropic
```

She set it running at 12:53 AM. The pipeline announced itself phase by phase:

```
╔════════════════════════════════════════════════════════════════╗║                    KOVA  PIPELINE                              ║╠════════════════════════════════════════════════════════════════╣║                                                                ║║  [ Your Code ]                                                 ║║       │                                                        ║║       ▼                                                        ║║  ┌──────────────────────────────────────────────────────┐      ║║  │  Phase 1 ◆ Language Detection                       │      ║║  │  Python · Go · JS · Java · Terraform · Dockerfile   │      ║║  └────────────────────────┬─────────────────────────────┘      ║║                           │                                    ║║                           ▼                                    ║║  ┌──────────────────────────────────────────────────────┐      ║║  │  Phase 2 ◆ 13 Scanners  ( all parallel )            │      ║║  │                                                      │      ║║  │   SAST          SCA          Secrets       IaC      │      ║║  │  ┌───────┐   ┌────────┐   ┌──────────┐  ┌───────┐  │      ║║  │  │Semgrep│   │ Trivy  │   │ Gitleaks │  │Checkov│  │      ║║  │  │Bandit │   │ Grype  │   │TruffleHog│  │ KICS  │  │      ║║  │  │ Gosec │   │  OSV   │   └──────────┘  └───────┘  │      ║║  │  │SpotBug│   │  Syft  │                             │      ║║  │  │NodeJS │   └────────┘                             │      ║║  │  └───────┘                                          │      ║║  └────────────────────────┬─────────────────────────────┘      ║║                           │                                    ║║                           ▼                                    ║║  ┌──────────────────────────────────────────────────────┐      ║║  │  Phase 3 ◆ Deduplication                            │      ║║  │  Cross-scanner dedup by file + line + vuln type      │      ║║  └────────────────────────┬─────────────────────────────┘      ║║                           │                                    ║║                           ▼                                    ║║  ┌──────────────────────────────────────────────────────┐      ║║  │  Phase 4 ◆ AI Agent Pipeline                        │      ║║  │                                                      │      ║║  │  ┌─────────┐  ┌────────┐  ┌──────┐  ┌──────────┐   │      ║║  │  │ Context │→ │ Triage │→ │ Fix  │→ │  Policy  │   │      ║║  │  │  Agent  │  │ Agent  │  │Agent │  │  Agent   │   │      ║║  │  │reach-   │  │FP detec│  │patch │  │SLA+comply│   │      ║║  │  │ability  │  │  tion  │  │gener │  │ mapping  │   │      ║║  │  └─────────┘  └────────┘  └──────┘  └──────────┘   │      ║║  └────────────────────────┬─────────────────────────────┘      ║║                           │                                    ║║                           ▼                                    ║║  ┌──────────────────────────────────────────────────────┐      ║║  │  Phase 5 ◆ Compliance & Threat Mapping              │      ║║  │  PCI-DSS · SOC 2 · NIST · CIS · HIPAA · ISO 27001   │      ║║  │  MITRE ATT&CK · OWASP Top 10 (2025)                 │      ║║  └────────────────────────┬─────────────────────────────┘      ║║                           │                                    ║║                           ▼                                    ║║  ┌──────────────────────────────────────────────────────┐      ║║  │  Phase 6 ◆ Depth Analysis                           │      ║║  │  EPSS Scores · Call Graph · Playbooks · Root Cause   │      ║║  └────────────────────────┬─────────────────────────────┘      ║║                           │                                    ║║                           ▼                                    ║║  ┌──────────────────────────────────────────────────────┐      ║║  │  Phase 7 ◆ 10 Output Formats                        │      ║║  │  Table · JSON · SARIF · HTML · Markdown · DefectDojo │      ║║  └──────────────────────────────────────────────────────┘      ║╚════════════════════════════════════════════════════════════════╝
```

Phase 1 identified Python, Terraform, Go, and JavaScript in under three seconds. By the time she’d walked to the kitchen for water, Phase 2 was finishing — tools she’d been running on separate cron jobs, with separate configs, all completing together.

Then Phase 3 did something interesting.

### The Funnel

Kova collected 175 findings across all thirteen scanners. Then it started reducing.

```
The False Positive Funnel
```

```
175  ████████████████████████████████████  Raw findings       │       ▼  Heuristics (instant)       │  ✗ test code files       │  ✗ auto-generated code         │  ✗ placeholder values       │  ✗ example/template secrets       │   48  ████████████  Passed to AI triage       │       ▼  LLM batch analysis (10 findings/call)       │  Context · Code · Call chain · Data flow       │    6  ██  True positives requiring action      96.6% noise removed. Signal preserved.
```

The heuristic pass was instant — test files, auto-generated code, placeholder values in config.example.yaml, secrets in documentation examples. The stuff any experienced engineer would dismiss on sight, but that scanners flag because scanners don't read context. That alone trimmed 175 to 48.

Then the AI triage agent ran, and this is where the architecture got clever.

Rather than sending every finding to the LLM individually — slow, expensive, rate-limit-prone — Kova batched them. Ten findings per API call, each with surrounding code context, call chain, and data flow. The model wasn’t just seeing a line number and a rule ID. It was seeing the actual function, the callers, whether the code path was reachable from user-controlled input.

```
How the Triage Agent Decides
```

```
Finding arrives       │       ▼  ┌────────────────────────────────────┐  │  Heuristic fast-path               │  │  confidence ≥ 0.9?                 │  └──────────┬─────────────────────────┘             │      ┌──────┴──────┐      │ YES         │ NO      ▼             ▼  Return        ┌────────────────────────────┐  immediately   │  LLM Batch Analysis        │  (no API call) │                            │                │  Up to 10 findings/call    │                │  ┌──────────────────────┐  │                │  │ Finding 1 + context  │  │                │  │ Finding 2 + context  │  │                │  │ ...                  │  │                │  │ Finding 10 + context │  │                │  └──────────────────────┘  │                │           │                │                │           ▼                │                │  {"findings": [            │                │    {fp: false, conf: 0.9}, │                │    {fp: true,  conf: 0.95},│                │    ...                     │                │  ]}                        │                └────────────────────────────┘
```

High-confidence findings bypassed the LLM entirely — no API call, no latency, no cost. The rest went into batches. The model returned structured JSON: false positive status, confidence score, reasoning. Auditable and traceable.

Kova supports seven LLM providers — Claude, ChatGPT, Gemini, Bedrock, Vertex AI, Azure OpenAI, and local Ollama for teams who can’t send code externally. There’s an --offline flag for fully air-gapped environments that skips the AI layer entirely.

Forty-eight findings entered. Six came out.

### The Same Finding. A Different Experience.

Finding number one in the prioritized output: run\_transaction.py, line 412.

Row 147. The one she’d almost missed at midnight.

But Kova hadn’t just flagged it — it had *explained* it. The output showed the full call graph: which HTTP handler called which service function, which function constructed the shell string, exactly how user input flowed from the webhook request body to the subprocess invocation. The complete path, confirmed reachable and exploitable.

Then came the compliance mapping:

```
Unauthenticated RCE in payment processor       │       ├──▶ PCI-DSS 4.0    Req 6.3.1  Secure coding practices       ├──▶ SOC 2          CC7.1      Risk mitigation controls       ├──▶ NIST 800-53    SI-10      Information input validation       ├──▶ CIS v8         16.12      Code-level security checks       ├──▶ HIPAA          §164.312   Access control & data integrity       └──▶ ISO 27001      A.8.28     Secure coding principles
```

```
+ MITRE ATT&CK:  T1190  Exploit Public-Facing Application  + OWASP 2025:    A03    Injection  + EPSS Score:    61%    exploitation probability in 30 days
```

That EPSS score — 61% chance of exploitation within 30 days — turns an abstract vulnerability into a number you can take to an executive. Not “technically vulnerable.” *Quantifiably likely to be exploited before your next sprint ends.*

The remaining five findings were equally precise:

-   **A hardcoded API key** in an actual deployment config (not a test file). Kova attached a full rotation playbook — step-by-step instructions for that specific credential type, who to notify, what to invalidate, how to verify the old key was dead. Not a generic recommendation. A runbook you could follow at 1 AM.
-   **Two dependency vulnerabilities** with reachability analysis confirming the vulnerable function was actually *called*from production paths, not just imported and unused.
-   **Three findings collapsed into one root cause** — a pattern in the ORM layer. Fix the abstraction once, resolve all three.
-   **One Terraform misconfiguration** that would have left an S3 bucket publicly readable. Buried in noise Maya had already scrolled past.

She looked at the timestamp. 1:34 AM. Forty-one minutes.

Her manual triage across six hours had surfaced the critical finding through luck. Kova surfaced all six with documented reasoning in the time it takes to watch an episode of television.

### The Audit

At 8:15 AM, Maya walked into the conference room with something she hadn’t expected to have: a complete evidence trail.

The kova-all-findings-20260317\_084042.json file — saved automatically after every scan — contained a timestamped record of every finding, every triage decision, every AI confidence score, every false-positive classification with its reasoning. Reproducible and auditable.

When the auditors asked about CC7.1 — risk mitigation controls — Maya had a finding, a remediation record, a compliance mapping, and a detection-to-resolution timeline. When they asked about secret rotation procedures, she opened the playbook Kova had generated.

The morning went smoothly. Quietly, almost anticlimactically — the way good preparation tends to resolve dramatic situations.

### After the Audit: Shifting Left

The following Monday, Maya added Kova to the CI pipeline.

```
Developer pushes code         │         ▼  ┌──────────────────────────────────────┐  │  GitHub Actions                      │  │                                      │  │  kova scan . --format sarif,json     │  │             --severity medium        │  └──────────────────┬───────────────────┘                     │          ┌──────────┼──────────┐          │          │          │          ▼          ▼          ▼    ┌──────────┐ ┌───────┐ ┌────────────┐    │  SARIF   │ │ JSON  │ │ all-       │    │ uploaded │ │ saved │ │ findings   │    │ to GitHub│ │  to   │ │   .json    │    │ Security │ │reports│ │ (audit log)│    └────┬─────┘ └───────┘ └────────────┘         │         ▼  Inline PR annotations  on vulnerable lines         │         ▼  ✗ PR blocked if critical/high found  ✓ PR passes if clean
```

SARIF output uploads to GitHub’s Security tab. Findings appear as inline annotations on the vulnerable lines in the PR diff — engineers see the issue where they’re already working, not in a separate dashboard they forget to check.

Within the first week, two PRs were flagged before merge. One was a vulnerable transitive dependency caught at the point of introduction, not three months later in a scheduled scan. The other was a genuine vulnerability in new code. Both developers fixed the issue in the same PR. No ticket. No remediation cycle.

### What Actually Changed

The 96.6% noise reduction is a headline number. What it means in practice is that a senior engineer’s attention gets pointed at six things that matter instead of scattered across two hundred things that mostly don’t.

There are two versions of security engineering. In one, you spend your time maintaining scanner configs, deduplicating outputs in spreadsheets, and explaining to developers why a warning in a test file isn’t a real vulnerability. In the other, you spend your time on the harder, more interesting work — understanding real risk, communicating it clearly, building systems that prevent the same class of problem from recurring.

The difference, it turned out, was mostly tooling.

### Get Started

Kova is open-source, Apache 2.0, at [github.com/kova-scanner/kova](https://github.com/kova-scanner/kova).

It runs locally, supports fully offline operation, works with seven LLM providers, and produces output in ten formats. Setup takes about five minutes:

```
git clone https://github.com/kova-scanner/kova.gitcd kova && pip install -e .pip install bandit && brew install semgrep gitleaks
```

```
echo "KOVA_LLM_OFFLINE=true" > .env   # no API key needed to startkova scan /path/to/your/project --format table
```

It’s the kind of tool that’s easier to appreciate after you’ve spent a late night in a spreadsheet wondering which row might be about to ruin your morning.

*Maya is a fictional character. Meridian Pay is a fictional company. The scanner findings, false positive rates, pipeline architecture, and audit log outputs described here reflect Kova’s actual behaviour — the 175 → 6 finding reduction is from a real scan run on the Kova codebase itself during development.*

* * *

[The Night Maya Almost Missed It](https://levelup.gitconnected.com/the-night-maya-almost-missed-it-69a8d18af79a) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.
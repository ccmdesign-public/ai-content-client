---
title: "Cutting Claude Code Costs Without Sacrificing Quality"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/cutting-claude-code-costs-without-sacrificing-quality-6f0cd3bcc97d?source=rss----98111c9905da---4"
publishedAt: "2026-03-20"
tags:
  - "ai-coding"
  - "ai-general"
  - "claude"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-21T16:30:36.829Z"
---

# Cutting Claude Code Costs Without Sacrificing Quality

#### How to use Claude code with mixed native and Ollama subagent models

![](https://cdn-images-1.medium.com/max/1024/1*aAFuleRzQ0g4XiZT4hRY4w.png)

Recently, it seems there isn’t a single article or a blog post that doesn’t start with something that was made with or made for Claude Code. The other side of that frenzy is a gloomy face staring at the screen after burning through the daily budget.
Rolling up the sleeves and doing some old-fashioned coding seems like long lost ability. What’s left is either waiting in anticipation until the lock is reset, or pull out the wallet.

Ollama recognized this pain point and made their local and cloud hosted models follow the Claude Code API. While this is a compelling and cheap alternative, local models generally require a monster workstation to handle the massive context window and reasoning demands of real-life coding orchestration. Even cloud hosted coding-oriented models are often not the optimal fit for complex repositories that require Claude’s native reasoning power.

The ideal architecture wouldn’t force a choice. It would leave the complex orchestration and high-reasoning tasks to Claude, while delegating the repetitive, token-heavy, low-reasoning tasks to Ollama. Out of the box, however, it is a binary choice. You cannot mix and match between native Claude and Ollama models.

### Bending the Rules: Intercepting and Redirecting Subagent Calls

Claude Code uses subagents to delegate tasks. Out of the box, it ships with three types: Explore, Plan, and General Purpose. You can also define your own custom agents, and Claude can spawn them automatically or by you calling them explicitly.
While you can select the model for these custom agents, the limitation of choosing exclusively from the Claude or Ollama ecosystem still applies.

To break this constraint, we can utilize Claude’s hooks system. The hooks functionality is a powerful feature designed to inject actions before or after specific events exposed by Claude Code. By targeting the PreToolUse hook, we can intercept Claude before it executes any tool.
By looking at the event metadata, we can know which tool was invoked by Claude Code. We need a tool named Agent which is the subagent execution.

**The caveat, though, is that we cannot really replace the designated tool execution.**

The hooks system enables us to review the event, to decide if we want to allow or deny it and to inject an action. However, cancelling the call via the permissionDecision set to deny*,* blocks the tool call altogether and Claude Code treats this as a hard error.

Fortunately, although this rule cannot be broken, it can definitely be bent. If we cannot avoid running the Claude native model, we can still replace the prompt it will see with an empty operation (like *Just say: TASK\_DELEGATED\_TO\_LOCAL\_MODEL*) to ensure the native call executes with near-zero token cost.

So, our workaround strategy is:
· Intercept the subagent invocation if the tool name is Agent.
· Extract the prompt from the subagent’s metadata.
· Delegate that prompt to Claude via Ollama.
· Embed the Ollama model’s output back into Claude’s additionalContext metadata field.
· Alter Claude’s original prompt to *Just say: TASK\_DELEGATED\_TO\_LOCAL\_MODEL*

### Prerequisites

Before diving in, make sure Ollama is installed and that you can run Claude Code through it by typing in the terminal: ollama launch claude. If that runs without errors, you’re ready.

**One version note**: the additionalContext field in PreToolUse hooks, which is central to how this hack works, was added in **Claude Code *v2.1.9***. Make sure you’re on that version or later, otherwise the Ollama output will be silently ignored and Claude will handle subagents as normal.

### Step 1: Register the Hook

Decide whether this is a global change (all projects) or project-specific:
**Global**: use the ~/.claude folder in your home directory.
**Per-project**: use (or create) the .claude folder in your project root.

In the chosen .claude folder, create or update settings.json:

```
{  "hooks": {    "PreToolUse": [      {        "matcher": "Agent",        "hooks": [          {            "type": "command",            "command": "python3 .claude/hooks/ollama_task_delegate.py"          }        ]      }    ]  }}
```

This tells Claude that whenever it is about to invoke an Agent tool (i.e., spin up a subagent), it must run the ollama\_task\_delegate.py Python script first.

While the example uses a Python script, the command field accepts any executable: a Bash script, a Node.js file, or any binary your system can run. Python is used here for readability, not as a requirement.

### Step 2: The Hook Script

Before we will create the full script, here’s the minimal version to understand the mechanics:

We first define the Ollama model we would like for the subagent task. Then we get the tool\_input JSON struct which is the subagent input metadata given by Claude Code for the subagent tool call. From that metadata we extract the prompt.

```
import jsonimport osimport subprocessimport sysMODEL = "qwen3-coder:480b-cloud"data = json.load(sys.stdin)tool_input = data.get("tool_input", {})prompt = tool_input.get("prompt", "")
```

Next, we will take advantage of the ollama launch claude predefined setup provided by Ollama and run an Ollama based Claude Code subagent with the prompt given by the calling instance of Claude Code.

```
result = subprocess.run(    ["ollama", "launch", "claude", "--model", MODEL, "--", "-p", prompt],    capture_output=True,    text=True,    env={**os.environ, "CLAUDECODE": ""},)
```

On the last part, we implement the prompt substitution of the Native Claude subagent and attach the results from the Ollama based subagent in the additionalContext.

This rather simple script is working pretty well, but it has three real-world problems:
**No permissions**: the Ollama subprocess runs without Claude’s delegated permissions, so any tool call requiring user approval will hang indefinitely.
**No filtering**: Since Claude allows multiple types of subagents, you might want Claude to handle certain types while Ollama handles others.
**No timeout**: if Ollama based subagent hangs, Claude hangs with it.

The following augmented script addresses all three:

```
import jsonimport osimport subprocessimport sysdef passthrough() -> None:    """Exit without output - Claude handles the tool call natively."""    sys.exit(0)def deny(reason: str) -> None:    """Block the tool call and surface a reason to Claude."""    print(json.dumps({        "hookSpecificOutput": {            "hookEventName": "PreToolUse",            "permissionDecision": "deny",            "permissionDecisionReason": reason,        }    }))    sys.exit(0)def main() -> None:    data = json.load(sys.stdin)    tool_input = data.get("tool_input", {})    subagent_type = tool_input.get("subagent_type") or "general-purpose"    # Filter by delegate types if configured    delegate_types_raw = os.environ.get("OLLAMA_DELEGATE_TYPES", "")    if delegate_types_raw:        allowed = {t.strip() for t in delegate_types_raw.split(",")}        if subagent_type not in allowed:            passthrough()    # Model is required; fall back to Claude if not set    model = os.environ.get("OLLAMA_SUBAGENT_MODEL", "")    if not model:        passthrough()    flags = os.environ.get("OLLAMA_SUBAGENT_FLAGS", "")    timeout = int(os.environ.get("OLLAMA_SUBAGENT_TIMEOUT", "180"))    prompt = tool_input.get("prompt", "")    cmd = ["ollama", "launch", "claude", "--model", model, "--", "-p", prompt]    if flags:        cmd.extend(flags.split())    try:        result = subprocess.run(            cmd,            capture_output=True,            text=True,            env={**os.environ, "CLAUDECODE": ""},            timeout=timeout,        )    except subprocess.TimeoutExpired:        deny(f"Local model delegation timed out after {timeout}s.")        return    ollama_output = result.stdout + result.stderr    updated_input = {**tool_input, "prompt": "Just say: TASK_DELEGATED_TO_LOCAL_MODEL"}    print(json.dumps({        "hookSpecificOutput": {            "hookEventName": "PreToolUse",            "permissionDecision": "allow",            "updatedInput": updated_input,            "additionalContext": f"Local Ollama agent result:\n{ollama_output}",        }    }))if __name__ == "__main__":    main()
```

### Configuring via Environment Variables

All behavior is controlled through environment variables set in settings.json:

```
{  "env": {    "OLLAMA_SUBAGENT_MODEL": "qwen3-coder:480b-cloud",    "OLLAMA_SUBAGENT_FLAGS": "--dangerously-skip-permissions",    "OLLAMA_SUBAGENT_TIMEOUT": "600",    "OLLAMA_DELEGATE_TYPES": "general-purpose"  },  "hooks": {    "PreToolUse": [      {        "matcher": "Agent",        "hooks": [          {            "type": "command",            "command": "python3 .claude/hooks/ollama_task_delegate.py"          }        ]      }    ]  }}
```

Variable reference:
**OLLAMA\_SUBAGENT\_MODEL** the Ollama model to use. Required; if unset, Claude handles the call natively.
**OLLAMA\_SUBAGENT\_FLAGS** extra flags passed to the Ollama Claude instance. Use -dangerously-skip-permissions for full autonomy, or -allowedTools ‘Read,Write,Bash’” to restrict tool access.
**OLLAMA\_SUBAGENT\_TIMEOUT** seconds to wait before treating the Ollama call as failed. Default: 180.
**OLLAMA\_DELEGATE\_TYPES** comma-separated list of subagent types to delegate. If empty, all Agent calls go to Ollama. Example: general-purpose,explore keeps Plan subagents on Claude.

### Custom Subagents for High-Token, Low-Reasoning Tasks

Custom subagent types are where this setup really pays off. By defining custom subagents, you can augment the behavior of Claude Code and make it delegate specific tasks to Ollama.

As a practical example, here’s a test-scaffolder agent that automatically generates test stubs whenever a Python module is created or modified. Instead of burning Claude tokens on mechanical boilerplate, Ollama reads the new code and writes the test file to disk.

Create .claude/agents/test-scaffolder.md:

```
---name: test-scaffolderdescription: >  MUST BE USED when a new Python module is created or an existing one  is modified. Generates or updates the corresponding test file with stubs  for any untested public classes and functions. Use immediately after  creating or modifying any .py file. Writes directly to disk.tools: Read, Write, Globmodel: inherit---You are a test scaffold generator. Your job is mechanical - ensureevery public class and function in a Python module has a correspondingtest stub.When invoked with a file path:1. Read the target source file.2. Identify all public classes and functions (no leading underscore).3. Locate the corresponding test file under `test/`.4. If it does not exist - create it with full scaffold.5. If it exists - append stubs only for missing items.6. Write the file to disk.Stub format:  def test_<name>():      # TODO      passOutput: confirm the file path written and list only the stubs added.
```

Then in settings.json, set:

```
"OLLAMA_DELEGATE_TYPES": "test-scaffolder"
```

### Wrapping Up

That concludes the custom subagent setup. Note that while Claude Code is designed to trigger these based on their descriptions, it isn’t always consistent in practice. If you want to make the invocation bulletproof, your best bet is to add a specific rule to your CLAUDE.md file.

Something like:

```
- After creating or modifying any `.py` file, immediately invoke the  `test-scaffolder` agent for that file to ensure test stubs exist for   all public classes and functions.
```

Managing global and local custom subagents and having the ability to control who executes what makes Claude Code much more flexible. From here, you can easily extend this logic to tap into other models or even different coding platforms entirely.

* * *

[Cutting Claude Code Costs Without Sacrificing Quality](https://pub.towardsai.net/cutting-claude-code-costs-without-sacrificing-quality-6f0cd3bcc97d) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.
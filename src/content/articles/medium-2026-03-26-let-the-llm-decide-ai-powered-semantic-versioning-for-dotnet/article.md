---
title: "Let the LLM Decide: AI-Powered Semantic Versioning for dotnet Tools"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/let-the-llm-decide-ai-powered-semantic-versioning-for-dotnet-tools-554136d8f002?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-26"
tags:
  - "ai-general"
  - "automation"
  - "best-practices"
  - "engineering"
  - "llm"
  - "web-development"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
  - "Web Development"
tagsNormalizedAt: "2026-03-26T21:35:28.850Z"
---

# Let the LLM Decide: AI-Powered Semantic Versioning for dotnet Tools

If you’ve ever maintained an internal NuGet package or a versioned dotnet tool, you know the drill. You make some changes, you’re ready to publish, and then you have to figure out: is this a patch? A minor bump? Did someone sneak in a breaking change three commits ago?

Most teams deal with this in one of two ways. Either you name your branches in a specific pattern so CI can pick up the bump type, or someone manually edits the version number before merging. Both approaches are fragile. People forget the rules. People forget to bump the version at all. And branch naming conventions are one of those things that work great until a new team member joins and doesn’t know the secret handshake.

I got tired of this, so I built a dotnet tool called [llm-semver-bump](https://github.com/MartinAnder/LlmSemverBump) that solves it differently. It uses Claude Code to look at your git changes since the last version tag and figures out the correct semantic version bump on its own. No branch naming conventions. No manual editing. Just let the LLM read the diff and decide.

![](https://cdn-images-1.medium.com/max/1024/1*vFfsHQSeEJZ6DlPzlylDFw.png)

### How It Works

The tool finds your latest version tag (via git describe) and gathers up all the changes since that tag. If there are no tags in the repository, it falls back to scanning commit history for the most recent commit that contains a version bump, then looks at everything after that. This means it works well with a squash-merge workflow: if you squash PRs when merging into master, each merge commit is a clean unit of work, and the tool can walk back through those commits to find its baseline.

Once it has the diff, it sends that to Claude for analysis. Claude looks at what actually changed and determines whether it’s a major, minor, or patch bump. It even gives you its reasoning, so you can sanity-check the decision before committing to it.

By default, it runs in dry-run mode. You see the analysis, the suggested bump, and the new version number. Nothing gets modified. When you’re happy with the result, you tell it to apply.

### Installation and Setup

You’ll need the .NET 8.0 SDK (or later), Git, and the Claude Code CLI.

```
# Install Claude Code CLInpm install -g @anthropic-ai/claude-code# Install llm-semver-bump as a global tooldotnet tool install -g LlmSemverBump
```

If you prefer per-repo local tools:

```
dotnet new tool-manifest # only needed once per repodotnet tool install LlmSemverBump
```

### Authentication

Since the tool calls the claude CLI under the hood, you need Claude Code authenticated before you can use it.

For local development, interactive login works fine:

```
claude login
```

For CI or any headless environment, set the API key as an environment variable:

```
export ANTHROPIC_API_KEY=sk-ant-...
```

### Core Usage

Just call the tool with no arguments from inside your repository. This gives you a dry run: you’ll see what version bump Claude recommends and why, without changing anything.

```
llm-semver-bump
```

The tool will find the right baseline on its own. If you have version tags, it uses the latest one. If you don’t, it scans commit history for the last version bump. Either way, it figures out what changed since that point and passes it to Claude for analysis.

### Applying the Bump

Once you trust the analysis, pass --apply to write the new version into your .csproj files. The tool only updates projects that have <IsPackable>true</IsPackable> set, either directly in the .csproj or inherited via Directory.Build.props. Projects without that property set are skipped, since the default MSBuild behavior depends on project type and the tool doesn't try to infer it. To opt a project in, add the property to its .csproj or your shared Directory.Build.props:

```
<PropertyGroup>  <IsPackable>true</IsPackable></PropertyGroup>
```

In a multi-project repo, the tool applies the same bump to every packable project it finds. It doesn’t apply different bumps per project. If you only want to update a specific project, you can target it directly:

```
# Update .csproj files and create a git tagllm-semver-bump --apply --git-tag# Target a specific .csproj onlyllm-semver-bump --apply --csproj src/MyLib/MyLib.csproj
```

### CI Integration

This is where --output json comes in. The JSON output gives you the bump level, the new version string, and Claude's reasoning in a format you can parse in your pipeline:

```
RESULT=$(llm-semver-bump --output json)NEW_VERSION=$(echo "$RESULT" | jq -r '.new_version')BUMP_LEVEL=$(echo "$RESULT" | jq -r '.bump')REASONING=$(echo "$RESULT" | jq -r '.reasoning')
```

Before you consume that output, check the exit code. The tool exits non-zero on any failure, including Claude API errors, authentication problems, and cases where it can’t determine a version. It doesn’t fall back to a default bump or produce a partial result. A failed run won’t write anything to your .csproj files, but it may produce empty or malformed output on stdout, so parsing it without checking the exit code first will bite you. Guard against that explicitly:

```
RESULT=$(llm-semver-bump --output json)if [ $? -ne 0 ]; then  echo "llm-semver-bump failed, aborting pipeline"  exit 1fiNEW_VERSION=$(echo "$RESULT" | jq -r '.new_version')BUMP_LEVEL=$(echo "$RESULT" | jq -r '.bump')REASONING=$(echo "$RESULT" | jq -r '.reasoning')
```

There’s also a --output version-only mode that prints just the new semver string to stdout, nothing else. Handy if you just need to feed it into another command.

For a real end-to-end example, take a look at the [GitHub Actions workflow in the llm-semver-bump repo itself](https://github.com/MartinAnder/LlmSemverBump/blob/master/.github/workflows/version-bump.yml).

For the full list of flags, see the [project README on GitHub](https://github.com/MartinAnder/LlmSemverBump).

### Why I Like This Approach

The thing that always bugged me about branch-name-driven versioning is that it puts the decision at the wrong point in time. You’re deciding the bump type when you create the branch, before you’ve even written the code. With llm-semver-bump, the decision happens after all the code is written, based on what actually changed. That feels right to me.

Is it perfect? No. You’re trusting an LLM to classify your changes, and it could get it wrong. But it shows you its reasoning, so you can catch mistakes. And in my experience, it gets it right more often than the average developer who’s trying to remember whether adding a new optional parameter counts as minor or patch.

The tool is up on [GitHub](https://github.com/MartinAnder/LlmSemverBump) if you want to try it out or poke at the source.

* * *

[Let the LLM Decide: AI-Powered Semantic Versioning for dotnet Tools](https://levelup.gitconnected.com/let-the-llm-decide-ai-powered-semantic-versioning-for-dotnet-tools-554136d8f002) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.
---
metadata:
  videoId: "RX3Vy9eapMg"
  title: "Make Looker Continous Integration work better for you"
  description: "Use these tips to make Looker continous integration tailored to your workflow.

    Check out the full video on our channel. → https://goo.gle/4c4Mfvb


    #Looker\ 


    Speakers: Chrissie Goodrich

    Products Mentioned: Looker"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT1M32S"
  publishedAt: "2026-03-27T19:00:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/RX3Vy9eapMg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=RX3Vy9eapMg"
processedAt: "2026-03-28T18:01:05.720Z"
source: "youtube"
tldr: "A brief guide on optimizing Looker CI validation pipelines [1]. Instead of testing entire models by default, developers can configure incremental validation to isolate branch-specific errors and ignore existing production errors [1]. Developers can also manually target or exclude specific explores to drastically speed up CI runtimes for large projects [1]."
tools:
  - name: "Looker"
    url: null
categories:
  - "Data & Analytics"
  - "DevOps & Infrastructure"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "analytics"
  - "automation"
  - "best-practices"
  - "ci-cd"
  - "data-pipeline"
  - "testing"
  - "workflow"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 44119
tagsNormalizedAt: "2026-03-28T18:09:51.843Z"
---

## Key Takeaways

Here are the most important strategies to optimize your Looker CI pipeline:

* Use **incremental validation** to isolate errors unique to your development branch while explicitly ignoring existing production errors [1].

* Utilize **targeting explores** to narrow the validation scope by specifying the model name followed by a forward slash and the explore name [1].

* Use the **explores to exclude configuration option** with the same formatting to bypass testing for massive or externally managed explores [1].

## Summary

This short Google Cloud Tech video addresses a common frustration among data developers: Looker Continuous Integration (CI) retesting entire models for incredibly minor code changes [1]. By default, the Looker CI system operates as a perfectionist, testing the complete model to ensure absolute stability [1]. While this is great for overall health, it can cause severe bottlenecks in large enterprise projects that contain hundreds of complex explores [1].

### Incremental Validation

To drastically speed up the validation process for simple updates, developers should utilize a feature known as incremental validation [1]. This specialized configuration method focuses strictly on isolating errors that are entirely unique to the current development branch [1]. Instead of checking everything, it actively ignores any pre-existing errors that are currently sitting in the production environment [1]. This is particularly useful when a dedicated team is already scheduled to fix older model errors, allowing individual developers to quickly push their specific clean code without being blocked by unrelated legacy issues [1].

### Targeting Explores

While incremental validation handles error isolation between branches, developers can also optimize their pipelines by manually adjusting the validation scope [1]. Targeting explores allows users to limit their tests to highly specific areas of the model rather than processing the entire system [1]. To execute this, developers must specify the exact model name, add a forward slash, and then append the specific name of the explore they wish to test [1]. This ensures that the CI pipeline only spends compute time on the exact area the developer is actively working on [1].

### Excluding Large Explores

In addition to explicitly targeting specific explores, teams can proactively remove problem areas from their testing pipeline [1]. Developers can use the explores to exclude configuration option to bypass testing entirely for specific sections [1]. Using the exact same naming format—model name, forward slash, and explore name—developers can exclude explores that are excessively large or are currently being tested by another team member [1]. Combining incremental validation with targeted inclusions and exclusions allows data teams to maintain highly focused, distraction-free deployments [1].

## Context

In enterprise data environments, massive Looker models with hundreds of explores can drastically slow down continuous integration pipelines [1]. When a developer makes a minor dimensional change, running full model validation wastes time and blocks deployments due to unrelated, pre-existing legacy errors [1]. This matters to data engineers, BI developers, and DevOps teams who need to optimize deployment speeds and maintain agile development workflows. By configuring Looker CI to use incremental validation and targeted explores, data teams can significantly reduce compute waste and improve developer velocity without sacrificing code quality [1].
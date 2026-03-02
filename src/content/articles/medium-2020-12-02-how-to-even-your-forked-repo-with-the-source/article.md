---
title: "How to even your forked repo with the source"
author: "Voice of Code"
platform: "medium"
publicationName: "Voice of Code"
url: "https://medium.com/voice-of-code/how-to-even-your-forked-repo-with-the-source-51e17b7e464e?source=rss----aa394f020b61---4"
publishedAt: "2020-12-02"
tags:
  - "engineering"
  - "open-source"
categories:
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.661Z"
---

# How to even your forked repo with the source

# How to even your forked repository with the source in Github

[Anush krishna .V](/@anushkrishnav?source=post_page---byline--51e17b7e464e---------------------------------------)

Jul 6, 2020

\--

![Image Credits: Unsplash]()

**Step 1**: Commit/Stash any recent changes but don’t push them.

**Step 2:** Add the remote (the one you forked ) and name it “upstream”. Copy the Source repository’s URL and paste it like done in the below example.

**Step 3:** Use git fetch to fetch all branches of the remote

**Step 4:** Update/Rewrite your master with the upstream master using the git “rebase” command.

**Step 5:** Lastly (yep we are almost done ), push your updates if any to your forked repository’s master branch.

**Step 6**:Use `*--force*` to force push the changes if required
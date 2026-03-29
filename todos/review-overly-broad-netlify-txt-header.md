---
status: pending
priority: P2
file: netlify.toml
line: 35-37
---

## Finding

The Netlify header rule `for = "/*.txt"` applies cache headers to ALL `.txt` files at the root level. This could unintentionally affect other `.txt` files (e.g., `humans.txt`, `security.txt`, or any future text files) with a 1-hour public cache that may not be appropriate for all of them.

## Suggested Fix

Be specific about which `.txt` files get the cache header:

```toml
[[headers]]
  for = "/llms.txt"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/llms-full.txt"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

Or if the broad rule is intentional, add a comment explaining it covers all text endpoints deliberately.

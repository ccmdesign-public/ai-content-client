---
priority: P3
file: src/pages/masterclasses/[slug].vue
line: 73
status: pending
---

## JSON-LD structured data uses `innerHTML` with unsanitized content

**What**: The JSON-LD script tag uses `innerHTML: JSON.stringify(...)` where `detail.value.tldr` and `detail.value.name` come from content collection data. While `JSON.stringify` escapes quotes, a `</script>` sequence in the data could theoretically break out of the JSON-LD block.

**Why**: This is a low-risk XSS vector since the data comes from the content pipeline (not user input), but defense-in-depth applies.

**Fix**: Wrap the `JSON.stringify` output with a replace for `</script>` sequences: `.replace(/<\/script/gi, '<\\/script')`, or use Nuxt's built-in `useSchemaOrg` composable which handles escaping automatically.

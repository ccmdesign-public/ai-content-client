---
metadata:
  videoId: "ZtnqqnKE4GM"
  title: "Dear XQC"
  description: "I have made 2 courses for boot!  Check out https://boot.dev/prime! And get 25% off


    https://twitch.tv/ThePrimeagen - I Stream on Twitch


    https://twitter.com/terminaldotshop - Want to order coffee over SSH?

    ssh terminal.shop


    Become Backend Dev: https://boot.dev/prime

    (plus i make courses for them)


    This is also the best way to support me is to support yourself becoming a better backend engineer. \ 


    Great News?  Want me to research and create video????: https://www.reddit.com/r/ThePrimeagen


    Kinesis Advantage 360: https://bit.ly/Prime-Kinesis"
  channel: "The PrimeTime"
  channelId: "UCUyeluBRhGPCW4rPe_UvBZQ"
  duration: "PT6M49S"
  publishedAt: "2026-03-23T11:31:51Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ZtnqqnKE4GM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ZtnqqnKE4GM"
processedAt: "2026-03-24T21:17:05.976Z"
source: "youtube"
tldr: "A humorous computer science lesson clarifies that quicksort is faster than merge sort in practice (34ms vs 51ms on 1000 items), explains insertion sort's inefficiency, and reveals that real quicksort implementations often use insertion sort for small lists."
tools:
  - name: "boot.dev"
    url: null
categories:
  - "Programming"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "architecture"
  - "best-practices"
  - "education"
  - "engineering"
  - "performance"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6327
  outputTokens: 821
  totalTokens: 7148
  processingTimeMs: 30874
tagsNormalizedAt: "2026-03-24T22:57:17.962Z"
---

## Key Takeaways

This video corrects common misconceptions about sorting algorithms while explaining their real-world performance characteristics.

*   **Quicksort is typically faster than merge sort** because it sorts in-place without creating extra memory, resulting in better constant factors and cache performance (34ms vs 51ms in the demonstration).

*   **Insertion sort has O(n²) worst-case complexity** but becomes practical for small lists where its simplicity outweighs function call overhead in hybrid implementations.

*   **Merge sort's O(n log n) complexity** comes from repeatedly splitting arrays in half and merging sorted halves, but requires creating additional sublists during merging.

*   **Real-world algorithms often combine approaches**—quicksort implementations frequently switch to insertion sort for small sublists to avoid recursion overhead.

## Summary

The video begins by addressing XQC's confusion about sorting algorithms, starting with insertion sort. The creator explains that insertion sort works by taking elements one at a time and inserting them into their correct position by scanning backward through already-sorted elements. This scanning process creates the O(n²) complexity that makes it inefficient for large lists.

The main correction addresses XQC's claim that "merge swords faster" than quicksort. The creator shows actual C code implementations and timing results: quicksort consistently completes in 34-35 milliseconds while merge sort takes about 50-51 milliseconds when sorting 1,000-element lists 1,000 times. The poor performance XQC observed came from badly implemented demonstration code, not from the algorithms themselves.

### How Merge Sort Works

Merge sort follows a divide-and-conquer approach: it recursively splits the array into halves until reaching single-element sublists, then merges these sublists back together in sorted order. Each merging pass requires creating new arrays and copying elements, which adds memory allocation overhead. The algorithm has O(n log n) complexity because each of the log n splitting levels requires processing all n elements.

### Why Quicksort is Faster

Quicksort also uses divide-and-conquer but works in-place by selecting a pivot element and partitioning the array into elements smaller and larger than the pivot. This in-place operation avoids the memory allocation overhead of merge sort and has better cache locality. The creator emphasizes that quicksort's practical speed advantage comes from better constant factors, not asymptotic complexity.

### The Hybrid Reality

A surprising revelation is that production quicksort implementations often switch to insertion sort for small sublists (typically 4-16 elements). For tiny arrays, the overhead of recursive function calls outweighs insertion sort's O(n²) complexity, making the simpler algorithm faster in practice. This demonstrates that theoretical complexity doesn't always predict real-world performance.

The video concludes with a promotional segment for boot.dev, where the creator offers computer science courses and encourages viewers to improve their backend engineering skills through structured learning.

## Context

This video matters because sorting algorithms form the foundation of computer science education and have practical implications in software performance. Many developers encounter misleading visualizations or oversimplified explanations that create misconceptions about algorithm performance. Understanding why quicksort generally outperforms merge sort despite both having O(n log n) complexity reveals important concepts about constant factors, memory usage, and practical implementation details. The discussion about hybrid algorithms shows how real-world engineering often combines theoretical approaches for optimal results.
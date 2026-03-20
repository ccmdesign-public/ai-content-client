---
metadata:
  videoId: "GCJ6k3tD50A"
  title: "Designing For Complex UIs"
  description: "Complex UIs don't have to be complicated. When complex navigation, search, tables or forms must work in real life, the last thing we can do is to oversimplify it. Let's see how we can use reliable patterns to improve efficiency and accuracy — along with more accessible and clear UX.


    😻 Join Vitaly's Maven course on Design For AI 2026 UX Training at Maven: https://maven.com/web-adventures/design-patterns-ai-interfaces/. Receive a 20% discount with the code MEOW.\ 


    Vitaly is the author, co-author and editor of Smashing Books, and a curator of Smashing Conferences. He is the UX lead with the European Parliament and Smashing Magazine and senior UX consultant in Europe and abroad, working with large and small companies and organizations like European Parliament, Alliander, Haufe-Lexware, Axel-Springer and many others."
  channel: "Smashing Magazine"
  channelId: "UCSDtqcJ8ZXviPrEcj1vuLiQ"
  duration: "PT2H16M16S"
  publishedAt: "2026-01-07T21:01:39Z"
  thumbnailUrl: "https://i.ytimg.com/vi/GCJ6k3tD50A/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=GCJ6k3tD50A"
processedAt: "2026-01-15T18:00:04.240Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Designing complex UIs requires understanding the user's environment and workflows, prioritizing essential complexity over accidental complexity, and leveraging design patterns for navigation, filtering, tables, and dashboards to maximize clarity and minimize mistakes, rather than oversimplifying.\n"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.0-flash-exp:free"
  apiCalls: 5
  fallbackAttempts: 4
  inputTokens: 26794
  outputTokens: 1620
  totalTokens: 28414
  processingTimeMs: 56852
tools:
  - name: "Maven"
    url: "https://maven.com/web-adventures/design-patterns-ai-interfaces/"
  - name: "Gexcon"
    url: null
  - name: "Shopify"
    url: null
categories:
  - "Product & Design"
tags:
  - "accessibility"
  - "design-systems"
  - "ui"
  - "user-research"
  - "ux"
tagsNormalizedAt: "2026-03-01T21:19:30.374Z"
---

## Key Takeaways

*   The talk emphasizes that designing for complex UIs is about orchestrating user workflows within inherent complexity, not simplifying it away. It advocates for deeply understanding the user's domain and environment.

*   **Essential complexity** is inherent to the problem domain and must be preserved, while **accidental complexity** arises from poor design and should be minimized through techniques like task analysis.

*   **Navigation:** Avoid excessive nesting, use tree navigation judiciously (consider relationship filtering for deep hierarchies), and explore navigation queries to help users construct their own paths.

*   **Filtering:** Decouple filters from results to avoid UI blocking, display applied filters prominently, and consider relationship filtering or query builders for complex filtering scenarios.

*   **Tables:** Understand the architecture of tables (cells, rows, columns, interactions), optimize for common tasks (comparing within a column, viewing a single row detail), and use tabs or other techniques to manage horizontal overflow on smaller screens.

*   **Dashboards:** Use action dots dashboards to highlight actionable insights and prioritize information based on crisis, actionable, and best-case values, avoiding oversimplification that obscures important details.

## Summary

This presentation by Vidy provides a comprehensive guide to designing for complex user interfaces, particularly in enterprise and expert-user environments. The core message is that complexity cannot be simply eliminated; instead, designers must focus on understanding and managing it to maximize user clarity and efficiency. Vidy draws on years of experience working with various organizations and shares insights gained from real-world projects and case studies. The talk covers key areas such as navigation, filtering, tables, and dashboards, offering practical techniques and design patterns for each.

### Understanding Complexity

Vidy begins by illustrating the nature of complex UIs with examples from diverse domains, including healthcare, finance, and engineering. These interfaces often involve intricate data displays, numerous features, and non-linear workflows. The key characteristics of such environments include:

*   Designed for domain experts

*   No clear linear workflow

*   Many points of entry

*   Steep learning curve

*   Intense usage rates

*   Custom presets and keyboard shortcuts

*   Zombie features

*   Fragile systems

Central to Vidy's approach is the distinction between **essential complexity** and **accidental complexity**. Essential complexity is inherent to the problem domain and cannot be removed without sacrificing accuracy or functionality. Accidental complexity, on the other hand, arises from poor design choices and can be minimized through thoughtful UX strategies. The goal is to maximize clarity and minimize mistakes within the bounds of essential complexity.

### Case Study: Gexcon

Vidy presents a case study of Gexcon, a 3D simulation software used by engineers to model fires and explosions. The design agency Creative Navy modernized the legacy system by focusing on top task analysis. They conducted extensive user research, including interviews and working observations, to understand the engineers' workflows and pain points. This led to the identification of 102 individual tasks, which were then analyzed for frequency, difficulty, and user needs. The redesign resulted in significant improvements, including a reduction in the time to first successful simulation from 4 days to 6 hours and a decrease in configuration errors per simulation.

### Navigation Patterns

The presentation delves into various navigation patterns suitable for complex UIs. Vidy cautions against excessive nesting, which can lead to user frustration and errors. He introduces the triangle pattern and SVG path areas as techniques for managing nested menus, but emphasizes the importance of responsiveness and keyboard support for expert users. Tree navigation is another common pattern, but it can become unwieldy with deep hierarchies. In such cases, Vidy recommends relationship filtering, where users navigate from left to right through a series of connected filters.

Vidy also highlights the concept of navigation queries, where users are prompted to define their goals upfront, and the system guides them directly to the relevant features or content. This approach can be particularly effective in streamlining common tasks and reducing cognitive load. He shows examples from the city of Dudolf in Germany and ao.com.

### Filtering Strategies

Moving on to filtering, Vidy stresses the importance of decoupling filters from results to avoid UI blocking. Users should be able to select multiple filters without the interface constantly updating. He showcases examples of well-designed filtering experiences, such as the Stockholm University website, where filters are displayed on the left and results update asynchronously on the right. He warns against common pitfalls, such as auto-scrolling, pop-up overlays, and unclear filter states.

Vidy advocates for displaying applied filters prominently above search results, allowing users to quickly review and modify their selections. He also introduces the concept of relationship filtering, where users can drill down through a series of connected filters to refine their search. Another approach is to provide a query builder, where users can construct their own custom filters using a combination of operators and values.

### Tables and Data Display

The presentation then turns to the design of data tables, a common element in complex UIs. Vidy emphasizes the importance of understanding the architecture of tables, including cells, rows, columns, and interactions. He discusses different content types for cells (alpha-numeric, numeric, icons, badges, charts) and the need for clear alignment and formatting. For mobile views, he suggests using tabs to manage horizontal overflow and prioritize key columns.

Vidy also covers bulk actions, a common requirement in enterprise applications. He showcases examples of well-designed bulk editing interfaces, such as the one from Shopify, where users can select multiple items and then edit their properties in a spreadsheet-like view. He also discusses the stages of bulk operations (pre-import, file upload, mapping, repairing, import) and the importance of providing clear guidance and error handling.

### Dashboards and Actionable Insights

Finally, Vidy addresses the design of dashboards, which are often used to present complex data in a concise and actionable format. He introduces the concept of action dots dashboards, where metrics are color-coded based on their status (crisis, actionable, best case), allowing users to quickly identify areas that require attention. He also emphasizes the importance of prioritizing information and avoiding oversimplification that obscures important details. The "action dash" approach from Nick Deborah is highlighted, emphasizing the need for dashboards to drive specific actions rather than just presenting data.

Throughout the presentation, Vidy reiterates the importance of user research, task analysis, and iterative design. He encourages designers to spend time with users, understand their workflows, and test their designs to ensure that they meet their needs. By focusing on essential complexity and minimizing accidental complexity, designers can create complex UIs that are both powerful and usable.

## Context

Vidy is a design consultant and speaker specializing in UX design for complex systems, enterprise software, and data-heavy applications. He shares practical insights gleaned from years of experience in various industries, including finance, healthcare, and government. This presentation is part of Smashing Magazine's series on design and front-end development. It addresses the challenges of designing for complex UIs, a topic of increasing relevance as software becomes more sophisticated and data-driven. The target audience includes UX designers, product managers, and developers working on enterprise applications, B2B software, or any system with intricate data displays and workflows. The content is particularly useful for those seeking practical techniques and design patterns to improve the usability and efficiency of complex interfaces.

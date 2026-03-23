---
title: "From CSS Selectors to Natural Language: Web Scraping with ScrapeGraphAI"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/from-css-selectors-to-natural-language-web-scraping-with-scrapegraphai-43d30dea828d?source=rss----98111c9905da---4"
publishedAt: "2026-03-21"
tags:
  - "ai-general"
  - "data-science"
  - "open-source"
  - "python"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-23T14:40:53.871Z"
---

# From CSS Selectors to Natural Language: Web Scraping with ScrapeGraphAI

![](https://cdn-images-1.medium.com/max/1024/0*IYXoFBFZmTFhLcsT.png)

> Disclaimer: This article is only for educational purposes. We do not encourage anyone to scrape websites, especially those web properties that may have terms and conditions against such actions.

### Introduction

BeautifulSoup is the go-to library for web scraping thanks to its simple API and flexible parsing. The workflow is straightforward: fetch HTML, inspect elements in DevTools, and write selectors to extract data:

```
from pprint import pprintfrom bs4 import BeautifulSoupimport requestsurl = "https://books.toscrape.com"response = requests.get(url)soup = BeautifulSoup(response.content, "html.parser")books = []for article in soup.select("article.product_pod"):    title = article.select_one("h3 a")["title"]    price = article.select_one("p.price_color").text    books.append({"title": title, "price": price})pprint(books[:3])
```

Output:

```
[{'price': '£51.77', 'title': 'A Light in the Attic'}, {'price': '£53.74', 'title': 'Tipping the Velvet'}, {'price': '£50.10', 'title': 'Soumission'}]
```

The output is correct, but selectors are tightly coupled to the HTML structure. This means when the site redesigns, everything breaks, so you spend more time maintaining selectors than extracting data:

```
# Before: <article class="product_pod"># After:  <div class="book-card">soup.select("article.product_pod")  # Now returns []# Before: <p class="price_color">£51.77</p># After:  <span class="price">£51.77</span>soup.select_one("p.price_color")  # Returns None, crashes on .text
```

What if you could just describe the data you want and let an LLM figure out the extraction? That’s where ScrapeGraphAI comes in.

> *💻* ***Get the Code****: The complete source code for this tutorial are available on* [*GitHub*](https://github.com/khuyentran1401/codecut-blog/tree/main/scrapegraphai)*. Clone it to follow along!*

### What is ScrapeGraphAI?

[ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai) is an open-source Python library for LLM-powered web scraping. Rather than writing CSS selectors, you describe the data you want in plain English.

Key benefits:

-   **No selector maintenance**: Describe what data you want, not where it lives in the HTML
-   **Self-healing scrapers**: The LLM adjusts automatically when websites redesign
-   **Structured output**: Define Pydantic schemas for type-safe extraction
-   **JavaScript support**: Built-in rendering for React, Vue, and Angular sites
-   **Multi-provider**: Use OpenAI, Anthropic, or local models via Ollama

### Setup

### Installation

Install ScrapeGraphAI and Playwright for browser automation:

```
pip install scrapegraphai playwrightplaywright install
```

### OpenAI Configuration

For cloud-based extraction, you’ll need an OpenAI API key. Store it in a .env file:

```
OPENAI_API_KEY=your-api-key-here
```

Then load it in your script:

```
from dotenv import load_dotenvimport osload_dotenv()graph_config = {    "llm": {        "api_key": os.getenv("OPENAI_API_KEY"),        "model": "openai/gpt-4o-mini",    },    "verbose": False,    "headless": True,}
```

### Local Models with Ollama

For zero API costs, use local models via Ollama. ScrapeGraphAI requires two models:

-   **LLM** (llama3.2): Interprets your prompts and extracts data
-   **Embedding model** (nomic-embed-text): Converts page content into a format the LLM can search

> *📖 New to Ollama? See our* [*complete guide to running local LLMs with Ollama*](https://codecut.ai/private-ai-workflows-langchain-ollama/)*.*

Install Ollama and pull both:

```
# Install Ollama from https://ollama.aiollama pull llama3.2ollama pull nomic-embed-text
```

Then configure ScrapeGraphAI to use local inference:

```
graph_config_local = {    "llm": {        "model": "ollama/llama3.2",        "temperature": 0,        "format": "json",        "base_url": "http://localhost:11434",    },    "embeddings": {        "model": "ollama/nomic-embed-text",        "base_url": "http://localhost:11434",    },    "verbose": False,    "headless": True,}
```

The same extraction code works with both configurations. Switch between cloud and local by changing the config.

### Natural Language Prompts

ScrapeGraphAI extraction works in three steps:

-   **Prompt**: Describe the data you want in plain English
-   **Source**: Provide the URL to scrape
-   **Config**: Set your LLM provider and credentials

Pass these to SmartScraperGraph and call run():

```
from dotenv import load_dotenvfrom scrapegraphai.graphs import SmartScraperGraphimport osload_dotenv()graph_config = {    "llm": {        "api_key": os.getenv("OPENAI_API_KEY"),        "model": "openai/gpt-4o-mini",    },    "verbose": False,    "headless": True,}smart_scraper = SmartScraperGraph(    prompt="Extract the first 5 book titles and their prices",    source="https://books.toscrape.com",    config=graph_config,)result = smart_scraper.run()
```

Output:

```
{'content': [{'price': '£51.77', 'title': 'A Light in the Attic'},             {'price': '£53.74', 'title': 'Tipping the Velvet'},             {'price': '£50.10', 'title': 'Soumission'},             {'price': '£47.82', 'title': 'Sharp Objects'},             {'price': '£54.23', 'title': 'Sapiens: A Brief History of Humankind'}]}
```

The LLM understood “first 5 book titles and their prices” without any knowledge of the page’s HTML structure.

### Structured Output with Pydantic

Raw scraped data often needs cleaning and validation. With ScrapeGraphAI, you can define a [Pydantic schema](https://codecut.ai/pydantic-data-validation-python/) to get type-safe, validated output directly from extraction.

```
from dotenv import load_dotenvfrom scrapegraphai.graphs import SmartScraperGraphfrom pydantic import BaseModel, Fieldfrom typing import Listimport osload_dotenv()class Book(BaseModel):    title: str = Field(description="The title of the book")    price: float = Field(description="Price in GBP as a number")    rating: int = Field(description="Star rating from 1 to 5")class BookCatalog(BaseModel):    books: List[Book]graph_config = {    "llm": {        "api_key": os.getenv("OPENAI_API_KEY"),        "model": "openai/gpt-4o-mini",    },    "verbose": False,    "headless": True,}smart_scraper = SmartScraperGraph(    prompt="Extract the first 3 books with their titles, prices, and star ratings",    source="https://books.toscrape.com",    schema=BookCatalog,    config=graph_config,)result = smart_scraper.run()
```

Output:

```
{'books': [{'price': 51.77, 'rating': 5, 'title': 'A Light in the Attic'},           {'price': 53.74, 'rating': 5, 'title': 'Tipping the Velvet'},           {'price': 50.1, 'rating': 5, 'title': 'Soumission'}]}
```

The output matches the Pydantic schema:

-   price: Converted from '£51.77' string to 51.77 float
-   rating: Extracted from star icons as integer 5
-   title: Captured as string

The schema ensures:

-   price is extracted as a float, not a string like "£51.77"
-   rating is converted to an int from the star display
-   Missing or invalid fields raise validation errors

The data is analysis-ready, so you don’t need any post-processing in pandas.

For more advanced LLM output validation patterns, see our [PydanticAI guide](https://codecut.ai/enforce-structured-outputs-from-llms-with-pydanticai/).

### JavaScript Content

Modern websites built with React, Vue, or Angular render content dynamically. BeautifulSoup only parses the initial HTML before JavaScript runs, so it misses the actual content.

To demonstrate this, let’s fetch a JavaScript-rendered page with BeautifulSoup:

```
from bs4 import BeautifulSoupimport requestssoup = BeautifulSoup(requests.get("https://quotes.toscrape.com/js/").content, "html.parser")print(soup.select(".quote"))
```

Output:

```
[]
```

The result is an empty list because the content loads via JavaScript after the initial HTML is served.

Selenium can handle JavaScript, but requires explicit waits and complex timing logic.

ScrapeGraphAI uses Playwright to handle JavaScript rendering automatically. The headless parameter controls whether the browser runs visibly or in the background:

```
from scrapegraphai.graphs import SmartScraperGraphfrom dotenv import load_dotenvimport osload_dotenv()graph_config = {    "llm": {        "api_key": os.getenv("OPENAI_API_KEY"),        "model": "openai/gpt-4o-mini",    },    "verbose": False,    "headless": True,  # Browser runs in background}# quotes.toscrape.com/js loads content via JavaScriptsmart_scraper = SmartScraperGraph(    prompt="Extract the first 3 quotes with their text and authors",    source="https://quotes.toscrape.com/js/",    config=graph_config,)result = smart_scraper.run()
```

Output:

```
{'content': [{'author': 'Albert Einstein',              'quote': 'The world as we have created it is a process of our '                       'thinking. It cannot be changed without changing our '                       'thinking.'},             {'author': 'J.K. Rowling',              'quote': 'It is our choices, Harry, that show what we truly are, '                       'far more than our abilities.'},             {'author': 'Albert Einstein',              'quote': 'There are only two ways to live your life. One is as '                       'though nothing is a miracle. The other is as though '                       'everything is a miracle.'}]}
```

Unlike the empty BeautifulSoup result, ScrapeGraphAI successfully extracted all three quotes from the JavaScript-rendered page. The LLM chose sensible field names (author, quote) based solely on our natural language prompt.

### Multi-Page Scraping

Research tasks often require data from multiple sources. Scraping multiple sites usually requires building individual scrapers for each layout, then manually combining the results into a unified format.

SearchGraph automates this workflow. It searches the web, scrapes relevant pages, and returns aggregated results:

```
from scrapegraphai.graphs import SearchGraphimport osfrom dotenv import load_dotenvload_dotenv()graph_config = {    "llm": {        "api_key": os.getenv("OPENAI_API_KEY"),        "model": "openai/gpt-4o-mini",    },    "max_results": 3,    "verbose": False,}search_graph = SearchGraph(    prompt="Find the top 3 Python web scraping libraries and their GitHub stars",    config=graph_config,)result = search_graph.run()
```

Output:

```
{'sources': ['https://github.com/luminati-io/Python-scraping-libraries',             'https://brightdata.com/blog/web-data/python-web-scraping-libraries',             'https://www.geeksforgeeks.org/python/python-web-scraping-tutorial/',             'https://www.projectpro.io/article/python-libraries-for-web-scraping/625'], 'top_libraries': [{'github_stars': '~52.3k', 'name': 'Requests'},                   {'github_stars': '~53.7k', 'name': 'Scrapy'},                   {'github_stars': '~31.2k', 'name': 'Selenium'},                   {'github_stars': 1800, 'name': 'BeautifulSoup'}]}
```

For scraping multiple known URLs with the same prompt, use SmartScraperMultiGraph:

```
from scrapegraphai.graphs import SmartScraperMultiGraphimport osfrom dotenv import load_dotenvload_dotenv()graph_config = {    "llm": {        "api_key": os.getenv("OPENAI_API_KEY"),        "model": "openai/gpt-4o-mini",    },    "verbose": False,    "headless": True,}multi_scraper = SmartScraperMultiGraph(    prompt="Extract the page title and main heading",    source=[        "https://books.toscrape.com",        "https://quotes.toscrape.com",    ],    config=graph_config,)result = multi_scraper.run()
```

Output:

```
{'main_headings': ['All products', 'Quotes to Scrape'], 'page_titles': ['Books to Scrape', 'Quotes to Scrape'], 'sources': ['https://books.toscrape.com', 'https://quotes.toscrape.com']}
```

Both approaches return consistent, structured output regardless of the underlying HTML differences between sites.

### Key Takeaways

ScrapeGraphAI shifts web scraping from writing CSS selectors to describing the data you want:

-   **Natural language prompts** replace hard-coded CSS selectors and XPath expressions
-   **Pydantic schemas** provide type-safe, validated output ready for analysis
-   **Built-in JavaScript rendering** handles React, Vue, and Angular sites automatically
-   **Multi-provider support** lets you choose between cloud APIs and local models
-   **SearchGraph** automates multi-source research with a single prompt

The library is best suited for:

-   Exploratory data collection where site structures vary
-   Research tasks requiring data from multiple sources
-   Projects where scraper maintenance costs exceed development time
-   Extracting structured data from JavaScript-heavy applications

For high-volume production workloads on sites with stable HTML, Scrapy remains the faster choice. ScrapeGraphAI pays off when the time saved on selector updates outweighs the per-request LLM cost.

*Originally published at* [*https://codecut.ai*](https://codecut.ai/scrapegraphai-web-scraping-natural-language/) *on January 23, 2026.*

* * *

[From CSS Selectors to Natural Language: Web Scraping with ScrapeGraphAI](https://pub.towardsai.net/from-css-selectors-to-natural-language-web-scraping-with-scrapegraphai-43d30dea828d) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.
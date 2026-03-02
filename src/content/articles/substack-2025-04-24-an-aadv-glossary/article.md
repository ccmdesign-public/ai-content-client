---
title: "An AADV Glossary"
subtitle: "A short list of terminology for a process described as \"AI-Assisted Development with Verification.\""
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/an-aadv-glossary"
publishedAt: "2025-04-24"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.610Z"
---

# An AADV Glossary

-   **AADV**—AI-Assisted Development with Verification. A core technique (CAX), a *prime directive*, a set of guidelines for directing an LLM to produce code with higher design quality.
    
-   **CAX—**Create-Assess-eXecute. The heart of AADV is its development cycle:
    
    -   Create. Generate tests and code, given a prompt containing a problem overview, examples, and design guidelines.
        
    -   Assess. Review the tests to ensure that they align with your examples.
        
    -   eXecute. Run the generated tests.
        
        -   Review any failed tests. Correct any defective tests. Provide additional tests and/or guidance to the LLM, and have it re-generate code for legitimate tests that are failing. Repeat as needed.
            
-   **compliance**. The extent to which a generated CAX solution passes its tests. 9 out of 10 tests passing represents 90% *compliance*. A solution with under 100% compliance (to the tests vetted via the Assess step) is not shippable.
    
-   **examples**. In AADV, simple *examples* provide the basis for an LLM to generate a production module/class and code for an appropriate corresponding set of (typically unit) tests. Examples are expressed in human language, and can be either functional:
    

```
reverse words in a sentence
===
single word sentence:
melt -> smelt

multiple words:
a big cat -> cat a big

attaches punctuation to a word:
"hey" toes! -> toes! "hey"
```

… or procedural:

```
a stock portfolio

when purchasing a symbol, add to existing shares of same symbol
  purchase 25 shares AMZN
  purchase 17 shares AMZN

  expect shares AMZN -> 42

when selling a symbol, reduces shares on a sale:
  purchase 100 shares AAPL

  sell 25 shares APPL

  expect shares APPL -> 75
```

-   **LLM**—**L**arge **L**anguage **M**odel. That Thing That Does That Thing You Do.
    
-   **MCR**—the Module Closure Rule (MCR): Software modules are closed to manual modification, but open to regeneration and extension.
    
-   **Module Closure Rule**—See **MCR**.
    
-   **semantic drift**—the deviation in the behavior of generated code relative to the CAX examples (the *de facto* primary form of specification in AADV).
    
-   **TDD—test-driven development**. A coding approach in which you drive incremental behaviors into the system by virtue of first coding examples in the form of unit tests. *TDD* is embodied in the cycle of red (write a test and demonstrate its failure), green (write minimal code and demonstrate test success), refactor (clean up design and demonstrate test success).
    
-   **tests.** You prompt the LLM to create automated *tests* in the Create step of CAX, along with the production code that the tests will verify. You review the generated tests to ensure they are aligned with the examples you provided. Here are the generated tests for the portfolio examples under the *examples* bullet:
    
    ```
    describe('stock portfolio', () => {
      it('adds shares on multiple purchases of same symbol', () => {
        const portfolio = createPortfolio()
        portfolio.purchase('AMZN', 25)
        portfolio.purchase('AMZN', 17)
        expect(portfolio.shares('AMZN')).toBe(42)
      })
    
      it('reduces shares when selling', () => {
        const portfolio = createPortfolio()
        portfolio.purchase('AAPL', 100)
        portfolio.sell('AAPL', 25)
        expect(portfolio.shares('AAPL')).toBe(75)
      })
    })
    ```
    
-   **vibe coding**—A process in which you “fully give in to the vibes, embrace exponentials, and forget that the code even exists.” A coding approach crafted within a single tweet. As worthwhile as the number of characters expended to express it.
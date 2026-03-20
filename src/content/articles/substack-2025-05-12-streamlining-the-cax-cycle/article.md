---
title: "Streamlining the CAX cycle"
subtitle: "Translating a solution from one language to another, and already have passing tests? You can use these tests to directly generate the production code--no need for creating and assessing examples."
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/streamlining-the-cax-cycle"
publishedAt: "2025-05-12"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.603Z"
---

# Streamlining the CAX cycle

![](https://substackcdn.com/image/fetch/$s_!JCDf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3f9857d9-479e-4129-a7e0-5457beb0a325_1024x608.png)

Last summer I started building a plugin[1](https://jjlangr.substack.com/p/streamlining-the-cax-cycle#footnote-1-163023984) to support CAX development in Java in IDEA. The plugin:

-   helps you to manage [examples](https://jjlangr.substack.com/p/an-aadv-glossary) to be included in a CAX prompt,
    
-   sends the CAX prompt to the LLM API (currently OpenAI), along with a solution description, coding/design guidelines, and a specification for formatting the response,
    
-   parses the response to extract the generated source code classes, and
    
-   allows the user to review the generated classes, and choose which existing project classes to replace with the newly-generated versions.
    

The plugin will need considerable work to support more than just IDEA, Java, and OpenAI. Covering variant programming languages (Java, JavaScript, C#, …) will require UI changes to support user-editable configurations. Supporting additional LLM APIs should require a modest effort. The bigger effort will be creating a version of the plugin for VSCode.

The plugin contains code that can support the first two pieces of the tooling that my [research](https://jjlangr.substack.com/p/do-well-designed-llm-solutions-comply) will require:

1.  code to create a CAX prompt from examples and descriptions and send it to the LLM
    
2.  code to extract generated test and production JavaScript source files from a completion
    
3.  code to execute the generated tests against the generated production code
    
4.  code to run various metrics against the generated production code
    

Item #4 has [already been built](https://jjlangr.substack.com/p/caxing-a-cyclomatic-complexity-module), item #3 has yet to be coded, and items #1 and #2 are what I’ll discuss here.

I built the plugin for the JetBrains IDE, which requires either Java or Kotlin. I chose Java. While I could mix a Java tool along with JavaScript (which VSCode more or less requires), I figured it would be just a little easier to keep all bits of tooling in JavaScript. As a result, I decided to adapt the desired Java plugin pieces to JavaScript.

### Adapting a Java solution

I spent about 90 minutes to adapt the plugin code that handles CAX requests and completions. Some of that time was spent doing manual things that, if I were less lazy, I could have the LLM generate properly. Here are some of the dumb things I wasted time on:

-   providing appropriate module file names, rather than taking what it generates and renaming the files plus changing the imports
    
-   initially hand-coding a service function that sequences together the core functionality (then realizing I was being lazy)
    
-   fixing a couple problems that I created while doing said hand-coding
    

Outside these manual efforts, I spent under a half hour directly following CAX to adapt the code to JavaScript. I arrived at a good stopping point.

### CAXing the building blocks

Rather than start with examples, however, I chose to start with the tests already written for the Java plugin. Rather than plain-language CAX examples, my prompts included the existing JUnit tests.

I also sent some production plugin code to the LLM so it could fill in some of the details (e.g. values for constants). However, I directed the LLM to generate a JavaScript solution *from the tests*, rather than translate the Java solution into JavaScript.

I moved through the existing Java elements one by one. Here’s the first such prompt:

```
prompt> Here is a test class in Java.

class APrompt {
   @Test
   void returnsListOfPromptMessages() {
      var prompt = new Prompt("text", new ExampleList(new Example("1", "name", "example text")));

      var result = prompt.messages();

      Assertions.assertEquals(new PromptMessage(SYSTEM, ASSISTANT_GUIDELINES), result.get(0));
      assertEquals(new PromptMessage(SYSTEM, CODE_STYLE), result.get(1));
      assertEquals(new PromptMessage(SYSTEM, LANGUAGE_SPECIFIC_CODE_STYLE), result.get(2));
      var userMessage = result.get(3);
      assertTrue(userMessage.text().contains("""
         text
         Examples:
         
         name: name
         example text
         """), userMessage.text());
      assertEquals(USER, result.get(3).promptMessageType());
   }
}

Here is the Java code:

public record Prompt(String promptText, ExampleList examples) {
   static final String LINE = "%n%s%n";
   public static final String ASSISTANT_GUIDELINES = """
      You're a Java programming assistant. When asked to generate solution code,
      include only code. Don't include any explanation. Don't include comments in any code.""";
   static final String CODE_STYLE = """
      - When possible, prefer functional solutions, with functional methods and immutable classes. Avoid side effects.
      - Extract implementation specifics to separate cohesive methods.
      - Extract conditionals to separate predicate methods.
      - Minimize use of temporary variables. Make calls to methods instead.
      """;
   static final String LANGUAGE_SPECIFIC_CODE_STYLE = """
      - Within chained calls using the streams interface, extract lambda bodies with implementation details to separate methods.
      - Create instance-side methods by default. Do not use static methods unless appropriate or otherwise asked.
      - In tests, do not start the name of the test method with the word "test".
      """;

   public List<PromptMessage> messages() {
      return List.of(
         new PromptMessage(SYSTEM, ASSISTANT_GUIDELINES),
         new PromptMessage(SYSTEM, CODE_STYLE),
         new PromptMessage(SYSTEM, LANGUAGE_SPECIFIC_CODE_STYLE),
         new PromptMessage(USER, prompt()));
   }

   static final String PROMPT_OVERVIEW = """
      Generate JUnit test class(es) and production Java code for the solution.
      In output, begin each code listing with a header in either the form:
      /* test class TestFileName.java */
      or:
      /* prod class ProdFileName.java */
      End each code listing with a footer, either:
      /* end test class */
      or:
      /* end prod class */.
      Substitute the real file name for TestFileName and ProdFileName.""";
   static final String PROMPT_HEADER = "Generate code for this:";
   static final String EXAMPLES_HEADER = "Examples:";

   private String prompt() {
      return format(LINE, PROMPT_OVERVIEW) +
         format(LINE, PROMPT_HEADER) +
         promptText +
         format(LINE, EXAMPLES_HEADER) +
         (examples.getAll().isEmpty() ? "" : format(LINE, examples.toPromptText()));
   }
}

Convert the test to JS with .mjs files.

Generate JS production code for the test. Use the Java production code to include the necessary string constants.
```

Lots of hardcoded literals, I know.

Here’s the generated code:

```
import { PromptMessageType } from './promptMessageType.mjs'
import { PromptMessage } from './promptMessage.mjs'

export const ASSISTANT_GUIDELINES = `You're a Java programming assistant. When asked to generate solution code,
include only code. Don't include any explanation. Don't include comments in any code.`
export const CODE_STYLE = `- When possible, prefer functional solutions, with functional methods and immutable classes. Avoid side effects.
- Extract implementation specifics to separate cohesive methods.
- Extract conditionals to separate predicate methods.
- Minimize use of temporary variables. Make calls to methods instead.`
export const LANGUAGE_SPECIFIC_CODE_STYLE = `- Within chained calls using the streams interface, extract lambda bodies with implementation details to separate methods.
- Create instance-side methods by default. Do not use static methods unless appropriate or otherwise asked.
- In tests, do not start the name of the test method with the word "test".`

const PROMPT_OVERVIEW = `Generate JUnit test class(es) and production Java code for the solution.
In output, begin each code listing with a header in either the form:
/* test class TestFileName.java */
or:
/* prod class ProdFileName.java */
End each code listing with a footer, either:
/* end test class */
or:
/* end prod class */.
Substitute the real file name for TestFileName and ProdFileName.`
const PROMPT_HEADER = 'Generate code for this:'
const EXAMPLES_HEADER = 'Examples:'

export const createPrompt = (promptText, exampleList) => {
  const formattedPrompt = () => [
    '',
    PROMPT_OVERVIEW,
    '',
    PROMPT_HEADER,
    promptText,
    '',
    EXAMPLES_HEADER,
    exampleList.isEmpty() ? '' : '',
    exampleList.toPromptText()
  ].join('\n')

  return {
    messages: () => [
      new PromptMessage(PromptMessageType.SYSTEM, ASSISTANT_GUIDELINES),
      new PromptMessage(PromptMessageType.SYSTEM, CODE_STYLE),
      new PromptMessage(PromptMessageType.SYSTEM, LANGUAGE_SPECIFIC_CODE_STYLE),
      new PromptMessage(PromptMessageType.USER, formattedPrompt())
    ]
  }
}
```

The generated JavaScript solution unsurprisingly passed the generated Jest test (which I quickly assessed and greenlit):

```
import { createPrompt, ASSISTANT_GUIDELINES, CODE_STYLE, LANGUAGE_SPECIFIC_CODE_STYLE } from './prompt.mjs'
import { PromptMessageType } from './promptMessageType.mjs'
import { PromptMessage } from './promptMessage.mjs'
import { createExampleList } from './exampleList.mjs'
import { createExample } from './example.mjs'

describe('prompt', () => {
  it('returns list of prompt messages', () => {
    const example = createExample('1', 'name', 'example text')
    const exampleList = createExampleList([example])
    const prompt = createPrompt('text', exampleList)

    const result = prompt.messages()

    expect(result[0]).toEqual(new PromptMessage(PromptMessageType.SYSTEM, ASSISTANT_GUIDELINES))
    expect(result[1]).toEqual(new PromptMessage(PromptMessageType.SYSTEM, CODE_STYLE))
    expect(result[2]).toEqual(new PromptMessage(PromptMessageType.SYSTEM, LANGUAGE_SPECIFIC_CODE_STYLE))

    const userMessage = result[3]
    expect(userMessage.type).toEqual(PromptMessageType.USER)
    expect(userMessage.text).toContain(`text
Examples:

name: name
example text`)
  })
})
```

Time to translate the code and tests, including the CAX cycle and making the manual filename and import changes: Under 5 minutes. The LLM also generated the various supporting modules, such as `promptMessage.mjs` and `promptMessageType.mjs`. I then manually sifted through the resulting code and replaced Java-specific variable content with JavaScript-specific information. (Maybe I should have done this when including the Java test in the prompt.)

I next had the LLM translate the Example class, based on its JUnit tests:

```
prompt> generate code for the following tests:

class AnExample {
   @Test
   void createsPromptStringWhenOnlyExampleTextProvided() {
      var example = new Example("1", "", "some text");

      var result = example.toPromptText();

      assertEquals("some text", result);
   }

   @Test
   void createsPromptStringWhenExampleTextAndNameProvided() {
      var example = new Example("1", "my name", "some text");

      var result = example.toPromptText();

      assertEquals("name: my name\nsome text", result);
   }

   @Test
   void doesNotAppendNameIfNull() {
      var example = new Example("1", null, "some text");

      var result = example.toPromptText();

      assertEquals("some text", result);
   }

   @Test
   void isEnabledByDefault() {
      var example = new Example("1", "", "some text");
      assertTrue(example.isEnabled());
   }
}
```

Here are the results:

```
// example.mjs
export const createExample = (id, name, text) => {
  const formatPromptText = () => {
    if (!name || name.trim() === '') return text
    return `name: ${name}\n${text}`
  }

  return {
    id,
    name,
    text,
    isEnabled: () => true,
    toPromptText: formatPromptText
  }
}
```

```
// example.test.mjs
import { createExample } from './example.mjs'

describe('example', () => {
  it('creates prompt string when only example text provided', () => {
    const example = createExample('1', '', 'some text')
    expect(example.toPromptText()).toBe('some text')
  })

  it('creates prompt string when example text and name provided', () => {
    const example = createExample('1', 'my name', 'some text')
    expect(example.toPromptText()).toBe('name: my name\nsome text')
  })

  it('does not append name if null', () => {
    const example = createExample('1', null, 'some text')
    expect(example.toPromptText()).toBe('some text')
  })

  it('is enabled by default', () => {
    const example = createExample('1', '', 'some text')
    expect(example.isEnabled()).toBe(true)
  })
})
```

So far, all fairly trivial.

In the next prompt I provided only Java test code (no prod code) for code that parses source files out of a prompt completion. This time I changed Java-specific values (such as `class`) to JavaScript-specific content (such as `module`) *before* sending the prompt. I also included the declaration for an enum, FileType.

```
prompt> public enum FileType {TEST, PROD}

class ACodeResponseSplitter {
   @Test
   void splitsMultipleFiles() {
      var response = """
         /* prod module fizzbuzz.mjs */
         %s
         /* end prod module */

         /* prod module helper.mjs */
         %s
         /* end prod module */

         /* test module fizzbuzz.test.mjs */
         %s
         /* end test module */
         """.formatted(fizzBuzzProdSource, helperProdSource, fizzBuzzTestSource);

      var files = new CodeResponseSplitter().split(response);

      assertEquals(
         new Files(
            List.of(
               new SourceFile(PROD, fizzBuzzProdSource, "fizzbuzz.mjs"),
               new SourceFile(PROD, helperProdSource, "helper.mjs")),
            List.of(new SourceFile(TEST, fizzBuzzTestSource, "fizzbuzz.test.mjs"))),
         files);
   }
}
```

The `response` variable, used as the input to the `split` method on the CodeResponseSplitter class, emulates what should be returned as a completion from the LLM API call. It contains code list headers and footers (e.g. `/* end test module */`) to allow the code to be easily parsed. You might recognize these code bookends from the `PROMPT_OVERVIEW` constant in the JUnit tests `APrompt`.

You might also have noticed I didn’t provide any additional information in my prompt—just the test code. I figured the LLM the chat client had sufficient content from the prior prompts, and thus omitting the description was implicitly asking for the same kind of completion—JavaScript test and prod code. Following are all the files it generated.

```
// code-response-splitter.test.mjs
import { CodeResponseSplitter } from './code-response-splitter.mjs'
import { FileType } from './file-type.mjs'
import { createSourceFile } from './source-file.mjs'
import { createFiles } from './files.mjs'

describe('CodeResponseSplitter', () => {
  it('splits multiple files from LLM response', () => {
    const fizzBuzzProdSource = 'export const fizzBuzz = () => {}'
    const helperProdSource = 'export const helper = () => {}'
    const fizzBuzzTestSource = 'describe("fizzBuzz", () => {})'

    const response = `/* prod module fizzbuzz.mjs */
${fizzBuzzProdSource}
/* end prod module */

/* prod module helper.mjs */
${helperProdSource}
/* end prod module */

/* test module fizzbuzz.test.mjs */
${fizzBuzzTestSource}
/* end test module */`

    const files = CodeResponseSplitter().split(response)

    const expected = createFiles(
      [
        createSourceFile(FileType.PROD, fizzBuzzProdSource, 'fizzbuzz.mjs'),
        createSourceFile(FileType.PROD, helperProdSource, 'helper.mjs')
      ],
      [
        createSourceFile(FileType.TEST, fizzBuzzTestSource, 'fizzbuzz.test.mjs')
      ]
    )

    expect(files.equals(expected)).toBe(true)
  })
})
```

```
// file-type.mjs
export const FileType = {
  TEST: 'TEST',
  PROD: 'PROD'
}
```

```
// source-file.mjs
export const createSourceFile = (type, content, name) => ({
  type,
  content,
  name
})
```

```
// files.mjs
export const createFiles = (prodFiles, testFiles) => ({
  prodFiles,
  testFiles,
  equals: other =>
    JSON.stringify(prodFiles) === JSON.stringify(other.prodFiles) &&
    JSON.stringify(testFiles) === JSON.stringify(other.testFiles)
})
```

For `code-response-splitter`, the solution isn’t quite as trivial, involving an interesting regex:

```
// code-response-splitter.mjs
import { FileType } from './file-type.mjs'
import { createSourceFile } from './source-file.mjs'
import { createFiles } from './files.mjs'

export const CodeResponseSplitter = () => {
  const split = response => {
    const pattern = /\/\*\s*(prod|test)\s+module\s+([^\s]+)\s*\*\/\s*([\s\S]*?)\/\*\s*end\s+\1\s+module\s*\*\//gi

    const prodFiles = []
    const testFiles = []

    let match
    while ((match = pattern.exec(response)) !== null) {
      const [, typeRaw, fileName, fileContent] = match
      const type = typeRaw.toLowerCase() === 'test' ? FileType.TEST : FileType.PROD
      const file = createSourceFile(type, fileContent.trim(), fileName.trim())

      if (type === FileType.TEST) testFiles.push(file)
      else prodFiles.push(file)
    }

    return createFiles(prodFiles, testFiles)
  }

  return { split }
}
```

Overall, other than the aforementioned manual fixes with filenames and imports (I’ll worry about how to best specify these at some point), I made zero changes to the solution code. The generated (and quickly assessed) tests pass.

### Confident enough yet?

*Were I to deploy this code into a more sensitive context*, I would likely prompt the LLM to regenerate the solution—either to eschew the use of regex, or to provide enough additional examples to make me fully confident in the regex.

For my needs (research tooling), however, I’m confident enough with the current solution. If it breaks, I’ll know it and *only* I will care. I’ve never had any problems with the Java version of the response splitter, which similarly employs regular expressions.

### Putting it all together

I need a function to orchestrate the end-to-end process of prompting for code completion. Here’s my prompt (which isn’t really CAX, but then again it’s only generating a test that I’ll mostly certainly assess).

```
prompt> Generate a live integration test (no mocks) that calls createPrompt with the following parameters:

- The string:
    'Generate solution "fizzbuzz digits" only, and not the sequence.',
- A list of the following examples:
    'divisible by 3', 'fizzbuzzDigit(6) -> Fizz\nfizzBuzzDigit(9) -> Fizz'
    'divisible by 5', 'fizzBuzzDigit(5) -> Fizz\nfizzBuzzDigit(10) -> Buzz'
    'divisible by 3 and 5', 'fizzBuzzDigit(15) -> FizzBuzz'
    'otherwise returns input', 'fizzBuzzDigit(4) -> 4'

Join the result of calling prompt.messages and pass the result to sendPrompt.

Pass the response body from calling sendPrompt to the CodeResponseSplitter.

Create appropriate assertions against the resulting files.
```

Here’s the generated integration test:

```
import { createPrompt } from './cax-prompt.mjs'
import { createExample } from './example.mjs'
import { createExampleList } from './example-list.mjs'
import { CodeResponseSplitter } from './code-response-splitter.mjs'
import { FileType } from './file-type.mjs'
import { sendPrompt } from './llm-client.mjs' // <- your real network client

describe('live prompt integration', () => {
  it('sends actual prompt to LLM and splits response into prod/test files', async () => {
    const examples = createExampleList([
      createExample('1', 'divisible by 3', 'fizzbuzzDigit(6) -> Fizz\nfizzBuzzDigit(9) -> Fizz'),
      createExample('2', 'divisible by 5', 'fizzBuzzDigit(5) -> Fizz\nfizzBuzzDigit(10) -> Buzz'),
      createExample('3', 'divisible by 3 and 5', 'fizzBuzzDigit(15) -> FizzBuzz'),
      createExample('4', 'otherwise returns input', 'fizzBuzzDigit(4) -> 4')
    ])

    // the actual production code being tested starts here
    const prompt = createPrompt('Generate solution "fizzbuzz digits" only, and not the sequence.', examples)
    const input = prompt.messages().map(m => m.text).join('\n\n')

    const response = await sendPrompt(input)

    const files = CodeResponseSplitter().split(response.body)
    // the prod code ends here

    const prod = files.prodFiles[0]
    const test = files.testFiles[0]

    expect(prod).toBeDefined()
    expect(prod.type).toBe(FileType.PROD)
    expect(prod.name).toMatch(/\.js$/)
    expect(prod.content).toMatch(/Fizz/)
    expect(prod.content).toMatch(/Buzz/)

    expect(test).toBeDefined()
    expect(test.type).toBe(FileType.TEST)
    expect(test.name).toMatch(/\.test\.js$/)
    expect(test.content).toMatch(/it\('/)
    expect(test.content).toMatch(/expect\(/)
  }, 10000) // increase timeout in case the LLM is slow
})
```

The generated integration test included the four lines of code needed to assemble a prompt, send it, and split the source code from the response. (I added comments in the listing to set it off.) I extracted those four lines to a function, which I then moved to a separate module. The resulting test and production code:

```
import {createExample} from '../../src/prompt-clients/example.mjs'
import {createExampleList} from '../../src/prompt-clients/example-list.mjs'
import {FileType} from '../../src/prompt-clients/file-type.mjs'
import {requestCodeCompletion} from '../../src/prompt-clients/code-completion.mjs'

describe('live prompt integration', () => {
  it('sends actual prompt to LLM and splits response into prod/test files', async () => {
    const description = 'Generate a solution for "fizzbuzz digits" only, and not the sequence.';
    const examples = createExampleList([
      createExample('1', 'divisible by 3', 'fizzbuzzDigit(6) -> Fizz\nfizzBuzzDigit(9) -> Fizz'),
      createExample('2', 'divisible by 5', 'fizzBuzzDigit(5) -> Fizz\nfizzBuzzDigit(10) -> Buzz'),
      createExample('3', 'divisible by 3 and 5', 'fizzBuzzDigit(15) -> FizzBuzz'),
      createExample('4', 'otherwise returns input', 'fizzBuzzDigit(4) -> 4')
    ])

    const files = await requestCodeCompletion(description, examples);

    const prod = files.prodFiles[0]
    expect(prod.type).toBe(FileType.PROD)
    expect(prod.name).toMatch(/\.mjs$/)
    expect(prod.content).toMatch(/Fizz/)
    expect(prod.content).toMatch(/Buzz/)
    const test = files.testFiles[0]
    expect(test.type).toBe(FileType.TEST)
    expect(test.name).toMatch(/\.test\.mjs$/)
    expect(test.content).toMatch(/it\('/)
    expect(test.content).toMatch(/expect\(/)
  }, 30000)
})
```

```
// code-completion.mjs
import {createPrompt} from './cax-prompt.mjs'
import {sendPrompt} from './openai-prompt.mjs'
import {CodeResponseSplitter} from './code-response-splitter.mjs'

export const requestCodeCompletion = async (promptText, examples) => {
  const prompt = createPrompt(promptText, examples)
  const input = prompt.messages().map(m => m.text).join('\n\n')
  const response = await sendPrompt(input)
  return CodeResponseSplitter().split(response.body)
}
```

Seems like the assembly of the prompt—the `map/join` operation—should be moved into the `cax-prompt` module, something I’ll consider when I need to revisit the `requestCodeCompletion` function.

The LLM was nice enough to provide a caveat after it generated the test:

```
This test burns tokens—run it sparingly or as part of a specific test suite.
```

Good point. I’ve probably spent a few cents, a great rate considering the amount of otherwise-manual labor I’m avoiding. I’ve moved the test into the folder `test/integration`, where it’s not included in my “fast” test execution script.

### Variant CAX

In this posting, I clearly diverged from the base CAX approach that I’ve been demonstrating so far. I’ve also applied a few tactics that enhance the body of the overall AADV process.

-   Rather than having the LLM translate the production code from one language to another, I followed the CAX cycle: Use the source-language tests to generate the target-language tests *and* production code.
    
-   While I could have translated the tests into CAX examples, there’s no need (usually I toss the examples anyway). If I thought having the examples would’ve helped me better understand the behaviors, I’d have created them.
    
-   I can provide relevant existing source code for additional clarity—for example, constant declarations from other modules/classes.
    

My prompt for the final test—the integration test—seemed a little sloppy. Later I’ll tackle building a typical application server, and at that point you’ll see a tighter approach for generating tests around orchestration code.

### CAX as if you really meant it?

Back in the 2000’s—roughly 20 years ago—Keith Braithwaite promoted (presumably as a teaching mechanism) something he named “TDD as if you really meant it.” The core idea: When writing a test, you write just enough code to get it to pass *directly in the test itself*. You extracting into methods when you have no other choice, and again into classes only when you must. The primary goal: To learn how to truly embrace incremental growth of behaviors—and their simplest possible design/implementation—in your system.

When generating my integration test for the orchestration code I needed (what quickly became `requestCodeCompletion`), I prompted the LLM by describing the steps required to request a code completion. I didn’t provide other specifics, such as in which function this code was going to end up.

You might think of this as a lazy approach. It is lazy, but that good kind of lazy, I think:I was able to use the LLM to help me incrementally move toward an end goal that I couldn’t fully think through at that moment.

Sometimes, you know what the steps need to be *before* knowing what the outcome needs to be, or even before you know how to best describe that behavior. This is a reversal of the test-driven (“outcome-driven”) mindset, which says that you should really know what it is you’re trying to accomplish—what outcome you expect given a scenario—before you even think about its implementation.

The whole of this article takes an implementation-first approach—but that’s because I already knew what building blocks I needed (since I had a Java implementation with a workable design). Generating the integration test wrapped up the process, providing the glue code I needed for my research tools (items #1 and #2 above). The LLM wholly implemented the glue code in the test—much as how I might were I practicing “CAX as if you really meant it.”

“CAX as if you really meant it” is not an ideal approach, however, and not something I would promote as a typical practice. The more you practice CAX—or TDD—the more you improve your skill of capturing expected outcomes in the form of examples or tests.

Many developers struggle with TDD initially, and some of them for exactly this reason. They have learned to develop systems as a fluid process of primarily thinking about how to implement behaviors, as opposed to primarily thinking about how the system’s outcomes get captured and realized.

LLM code generation is best practiced as an outcome-driven (“test first”) approach.

[1](https://jjlangr.substack.com/p/streamlining-the-cax-cycle#footnote-anchor-1-163023984)

You can find the incomplete plugin [here](https://github.com/jlangr/aadv-plugin3). Feel free to contribute.
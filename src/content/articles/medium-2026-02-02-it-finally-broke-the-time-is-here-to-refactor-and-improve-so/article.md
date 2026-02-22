---
title: "It finally broke! The time is here to refactor (and improve) some old Python code."
author: "Pythoneers"
platform: "medium"
publicationName: "Pythoneers"
url: "https://medium.com/pythoneers/it-finally-broke-the-time-is-here-to-refactor-and-improve-some-old-python-code-4c1b4a638fd7?source=rss----7a8fb64b42eb---4"
publishedAt: "2026-02-02"
tags:
  - "python-logging"
  - "python-programming"
  - "python-command-line"
  - "icalendar"
  - "code-refactoring"
  - "python"
  - "community"
---

# It finally broke! The time is here to refactor (and improve) some old Python code.

# It finally broke! The time is here to refactor (and improve) some old Python code.

[UnicornOnAzur](/@unicornonazur?source=post_page---byline--4c1b4a638fd7---------------------------------------)

8 min read·Feb 2, 2026

\--

*The unintended third part in processing a calendar with garbage collection dates using Python.*

What began as a practical fix for a straightforward issue turned into a valuable learning opportunity. The initial version functioned, but it included many hard-coded aspects, like the spacing between columns (check out [version 1](/pythoneers/garbage-in-icalendar-out-69-reasons-not-to-do-it-manually-9eddb1dd04c1) here). The following year, it worked once more. Still, I made some enhancements, including figuring out the spacing dynamically (take a look at [version 2](/codetodeploy/garbage-in-icalendar-out-revisited-will-it-work-for-next-year-2fd85b3355df) here). This year, much to my surprise, the code didn’t work at all, and getting it to function again wasn’t an easy fix at first. There’s no better time or reason than now to refactor my own code.

![Image created with magicstudio.com]()

## Refactoring

I decided that for the refactoring, the core workflow of the script would serve as the foundation, and it needs to work with PDFs from past years too. Technically some of the things I improved might fall outside of the definition of refactoring. It just seemed like a good moment to do it.

> Refactoring is the “systematic process of improving existing computer code, without adding new functionality or changing external behaviour of the code.” \[[source](https://www.geeksforgeeks.org/software-engineering/refactoring-introduction-and-its-techniques/)\]

### Initial setup for refactoring the script

Before diving into the refactoring, I will introduce two additions to the script by integrating logging and a command-line interface. The first will help with refactoring the script and monitoring the successful execution, and the second will make it easier to test multiple input files by removing the hard-coded filepath.

**Implement logging**

The `logging` module from the Python Standard Library¹ is the standard provided framework. For alternatives read this [article](https://betterstack.com/community/guides/logging/best-python-logging-libraries/). To implement logging, you create a logger object, configure it if needed and log the messages you want.

> The logging library takes a modular approach and offers several categories of components: loggers, handlers, filters, and formatters.
> \- **Loggers** expose the interface that application code directly uses.
> \- **Handlers** send the log records (created by loggers) to the appropriate destination.
> \- **Filters** provide a finer grained facility for determining which log records to output.
> \- **Formatters** specify the layout of log records in the final output.
> 
> A good convention to use when naming loggers is to use a module-level logger, in each module which uses logging.²

***How to implement logging***

```
import logginglogger = logging.getLogger(__name__,)logging.basicConfig(    filename='log.log', filemode="w",    format="%(levelname)-8s|%(funcName)-18s|%(lineno)3d| %(message)s",    level=logging.DEBUG, encoding="utf-8")
```

Here is a short break down of the arguments to `basicConfig` I used:

-   `filename`: Filename portion of `pathname`;
-   `filemode`: The file mode to open the file in;
-   `format`: The specified format string for the handler;
    \- `levelname`: Text logging level for the message;
    \- `funcName`: Name of function containing the logging call;
    \- `lineno`: Source line number where the logging call was issued;
    \- `message`: The logged message.
    To left or right align the text add the number of characters in the format string. The structure of the string is `%(<attribute name>)<left or right align><number of spaces><s/d/f>`. For example, to left align the function name you use `%(funcName)-18s` where the 18 is related to the length of the longest function name and the `-` symbol denotes left alignment. For right aligning the line number you use this: `%(lineno)3d`. I have not yet found documentation explaining this. If someone comes across it, drop it in the comments, please.
-   `level`: Sets the root logger level to the specified level;
-   `encoding`: Specifies the encoding to open the file with.¹

***Where to place the code***

These are the places within your code are advised to use for part of the logging:

-   Set up the logger below the imports;¹’³’⁴
-   Set up your handler and formatter at the application entry point, i.e. in the `if __name__ == "__main__"` block;¹’³’⁴
-   For modules or libraries only set up the logger and do the configuration in the main file.³’⁴

[ArjanCodes](https://youtu.be/pxuXaaT1u3k?si=3Aou8-TppnytNBn5), [Timnology](https://www.youtube.com/watch?v=A3FkYRN9qog) and [Mcoding](https://youtu.be/9L77QExPmI0?si=gKyi0yEsc6SlF4bZ) have some nice explanation videos on the topic.

**Add a Command-Line Interface (CLI)**

With `argparse` from the Python Standard Library it is quite simple to set up a CLI. The code below sets up the CLI, registers one argument and parses the input from the command-line.

***Implement CLI***

The key element is the `ArgumentParser` object⁵’⁶. Instantiating this sets up the CLI environment and a lot more under water. [Anthonywritescode](https://www.youtube.com/watch?v=-Sgw-6a1HjU) has a nice introduction to `argparse` which mentions a couple of them. The `add_argument` is used to create and detail arguments. `"-p"` and `"--path"` are the shorthand and longhand for optional arguments. Because the file path is needed, it should actually be a positional argument, but I prefer this method of providing the argument. The `type` keyword is used to specify the expected type of the input¹. This can be standard type from Python or a user defined function.

```
import argparseparser = argparse.ArgumentParser(description="description")parser.add_argument("-p", "--path", type=verified_path, help="help string")args = parser.parse_args()
```

***Custom verified input type***

Again, providing `str` as type should be sufficient. I liked the idea of verifying the provided input and thus create a function that checks if the input results in a correct file path.

> If the function raises `[*ArgumentTypeError*](https://docs.python.org/3/library/argparse.html#argparse.ArgumentTypeError)`, `[*TypeError*](https://docs.python.org/3/library/exceptions.html#TypeError)`, or `[*ValueError*](https://docs.python.org/3/library/exceptions.html#ValueError)`, the exception is caught and a nicely formatted error message is displayed.¹

```
def verified_path(path: str) -> str:    if not path.endswith("pdf"):        raise argparse.ArgumentTypeError(f"{path} is not a PDF.")    if os.path.isfile(os.path.join(os.getcwd(), path)):        return path    else:        raise argparse.ArgumentTypeError(            f"{path} is not a valid path.")
```

This small addition removes the formerly hard-coded file paths and makes using the tool on different input much easier.

### Fixes

All in all, I came to the following fixes in my code. The first two solve what made the code crash. The other three are improvements that make the tool better usable.

1.  Improve finding the columns;
2.  Handle two events on the same day;
3.  Get the year of the calendar;
4.  Updateable calendar;
5.  Clean up code.

**(1) Fix: Improve the determination of the spacing**

***The problem:*** The spacing between the columns differs from year to year and document to document. This results in the inability to use fixed starting points for extracting text per column. Since this year also the formatting of the text changed. It used to be `monday 1 paper` and became `mo 1 paper`.

![The layout of the PDF calendar. Image created by author]()

This resulted that using a regex to match words with three or more lowercase letters didn’t work anymore and taking the four most common positions in a line of text did not result in finding the beginning of the columns.

```
matches = collections.Counter([match.start() for line in lines                               for match in re.finditer(r"\b[a-z]{3,}\b", line)])
```

***The solution:*** Looking for words of two or more lowercase letters that are followed by space and a number (the number of the day), resulted in finding the beginning of the columns.

```
matches = collections.Counter([match.start() for line in lines                              for match in re.finditer(r"\b[a-z]{2,}\b\s*\d", line)])
```

The solution below did not work as some lines in the text have more than four results per line.

```
spacing: typing.List[int] = sorted(matches)
```

**(2) Fix: handle two events on the same day**

***The problem:*** This year there were two types of garbage collected on the same day which resulted in missing the name of a day and the date. That broke the old workflow.

```
Monday  1  paper           christmas trees
```

***The solution:*** By wrapping the text extraction in a `try-except` block, this (now) expect error could be caught. If the error message is in line with the expected error, than only the description is updated that results in a correct and complete event being added to the list. The error message can be retrieved by using the `str()` function on an Error object.⁷

```
try:    _, day, description = text.strip().split()except ValueError as exc:    if str(exc) == (            "not enough values to unpack (expected 3, got 1)"):        description = text.strip().split()[0]        for event in collection_dates[::-1]:            if event[1] == all_months.index(months[step])+1:                day = event[2]  # Take the day number                break    else:        raise exc
```

To get the correct day number we search backwards through the list of created events to find the latest entry in the same month, i.e. the listing in the line above it and thus the same day. Any other `ValueError`'s are re-raised.

### (3) Improvement: get the year from the file with regex

***The problem:*** In the previous version of the code, the year from the first line. This usually works, but to given the slight variations in the extracted text is not the most reliable.

***The solution:*** To ensure success let’s search for a string of four digits starting with a 2.

```
year = int(re.findall(r"2\d{3}", text)[0])
```

### (4) Improvement: make it an updateable calendar

***The problem:*** Currently, a newly created ICalendar with updates on certain dates would result in duplicated and/or multiple calendar events instead of updating them. I go into the how and why in another story.

[

## Medium

### Edit description

medium.com

](/pythoneers/creating-updatable-calendar-events-in-python-fda80300e835?source=post_page-----4c1b4a638fd7---------------------------------------)

***The solution:*** creating a unique but systematic UID for each event. At least that makes the events easier to identify. *An alteration of the workflow would be needed to actually compare which events should be changed, added or deleted.*

```
event: ics.Event = ics.Event(    name=description,    begin=event_date - datetime.timedelta(hours=HOURS_BEFORE_MIDNIGHT),    end=event_date + datetime.timedelta(hours=HOURS_AFTER_MIDNIGHT),    uid=f"UnicornOnAzur@{year}_{month}_{day}_{description}"    )
```

### (5) Improvement: clean up the code

I did the following things:

-   Move constants to the top of the file including all hard-coded filenames;
-   Rename variables to more explicit;
-   Skip empty lines (which saves five or more iterations);

```
for index, line in enumerate(lines):    # Skip empty lines    if not line:        continue
```

-   Changed the created of `Event` object by providing the values on instantiation (see code block under (4)).

## What I learned

First extending the code with logging and CLI, and then making the code work again was a great thing to finish. It did take some trail and error, and deep dives in documentation. But I learned the basics of using `logging` and `argparse`. And I found the useful resources for future projects or problems.

Once the logging and CLI worked, the debugging of code was quite easy. In hindsight “just” adapting the regex would have solved most of the problems. Figuring out how to catch a specific error was the most difficult part to get right with no explicit documentation or blog on it.

## To conclude

The annual task to fill the calendar with when the garbage is collected leads to a nice recurring test of a piece of code. We’ll see what we identify next year.

> This story is my way to share my coding experience and the lessons I learned, and to document my solutions. All claps, comments, and highlights are appreciated, as well as sharing the story. For more code and my other links see: [https://github.com/UnicornOnAzur/](https://github.com/UnicornOnAzur/).

\[1\] [https://docs.python.org/3/library/logging.html](https://docs.python.org/3/library/logging.html)

\[2\] [https://docs.python.org/3/howto/logging.html](https://docs.python.org/3/howto/logging.html)

\[3\] [https://realpython.com/ref/best-practices/logging/](https://realpython.com/ref/best-practices/logging/)

\[4\] [https://coderivers.org/blog/python-log-to-a-file/](https://coderivers.org/blog/python-log-to-a-file/)

\[5\] [https://docs.python.org/3/library/argparse.html](https://docs.python.org/3/library/argparse.html)

\[6\] [https://docs.python.org/3/howto/argparse.html](https://docs.python.org/3/howto/argparse.html)

\[7\] [https://docs.python.org/3/library/exceptions.html](https://docs.python.org/3/library/exceptions.html)
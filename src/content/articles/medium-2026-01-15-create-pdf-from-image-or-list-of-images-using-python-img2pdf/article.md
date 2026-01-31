---
title: "Create PDF from image or list of images using Python: img2pdf"
author: "Pythoneers"
platform: "medium"
publicationName: "Pythoneers"
url: "https://medium.com/pythoneers/create-pdf-from-image-or-list-of-images-using-python-img2pdf-e596e5f50d66?source=rss----7a8fb64b42eb---4"
publishedAt: "2026-01-15"
tags:
  - "img2pdf"
  - "free-image-to-pdf"
  - "pdf"
  - "python-programming"
  - "image-to-pdf-converter"
  - "python"
  - "community"
---

# Create PDF from image or list of images using Python: img2pdf

# Create PDF from image or list of images using Python: img2pdf

[UnicornOnAzur](/@unicornonazur?source=post_page---byline--e596e5f50d66---------------------------------------)

2 min read·Jan 15, 2026

\--

Save money and time by using just two lines of code.

![Image created using magicstudio.com]()

Not long ago, I had to put together several images into a PDF. Since most online services either charge you or limit you to just one free image, I thought I’d give it a shot and handle it myself with Python. In just five minutes, I had a script that worked.

### My solution

One of the first results I found was using the `img2pdf` library ([https://pypi.org/project/img2pdf/](https://pypi.org/project/img2pdf/)). The two things that sparked my interest were the ability to provide a list of images as well as a single image, and the simplicity of the library. Apart from creating a list of the image file paths, the code below is all you need.

```
import img2pdfwith open(pdf_file_name, "wb") as file:    file.write(img2pdf.convert(list_of_images))
```

### Alternatives

Looking through this [StackOverflow question](https://stackoverflow.com/questions/27327513/create-pdf-from-a-list-of-images), the answers hint at more options to use or explore for the same problem. Let me know in the comments if you find another nice way to add images to a PDF.

> This story is my way to share my coding experience and the lessons I learned, and to document my solutions. All claps, comments, and highlights are appreciated, as well as sharing the story. For more code and my other links see: [https://github.com/UnicornOnAzur/.](https://github.com/UnicornOnAzur/)
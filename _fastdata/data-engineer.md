---
layout: data
published: true
name: Data engineer skills
tags: en, API, data
---

I recently published [a data engineer job offer](https://www.tinybird.co/job-offers/data-engineer). To be honest, it's not the most creative offer you are going to read, it starts with the typical description pretending your startup is different with a list of really nice angel investors, what we offer, what we look for, and an extra section on how a day looks like from my point of view (I tried to show the reality rather than posting images of someone happily working)

During the process, we have a [tech test](https://docs.google.com/document/d/1uftjPC8uI3eNCS5Pt-fG4CwlyNX54CBNTcECAxTILxk/edit). This time it's a little bit different, it's not about coding but being able to explain how you solve stuff.

The test is hard because just writing is itself a hard task. Most developers have a hard time summarizing in a few paragraphs an approach to solve a problem, mainly because when you write you need to think about who will read it. The only way to do that is to ask questions and trying to put yourself in someone else's shoes.

But hey, why spend 5 minutes thinking about what questions to ask when you can kill a full morning writing a 500 script in a python notebook. I’ve done that 100 times and will probably do it until I retire.

Back to the data engineering test. What was I expecting from a tech test like that? if you didn't read the test, TLDR it's is about calculating outliers from a medium-size CSV file.

1) Reproducibility: I expect something I can run whatever the data I use. A simple script is 100% reproducible, you don't need anything fancy here.

```
# this is enough
process.sh url | jq .
```

2) Testability: provide tests is another important task. How do you guarantee your code works? Yes, testing is something you need to do in your ETL in the same way you test any other piece of code.

3) Performance: we tend to think speed is not that important but it changes the way people do things. Something that works in real-time allows different things than a 1-hour process. The feedback loop is critical. That’s why we send emails instead of letters, that’s why slack is all over the place.

4) Schema design, data processing decision, algorithms, tradeoffs and so on. Why did you decide to use an outlier algorithm, was it because of performance reasons, because of quality? do you use any intermediate storage, why?

5) Basic data quality checks. Tests can probe the algorithm works but sometimes you get wrong data and you want to know why (for example, attributes outside a range, null values where you didn't expect nulls and so on)

6) Others like integrate the previous points in a CI system, documentation, explain how the project would evolve (schema or algorithm changes), how to make it real-time, and in general any rule we have been applying in software development for over a decade. A data engineer is just a developer from my point of view.

7) Last but not least: how does the process help to answer questions. We always forget we are solving a problem or making something better.

This is what I’d expect technically from a data engineer. I don’t think is different from what you’d ask any backend software developer.

Sometimes I think data engineering means someone capable enough to decypher cloud services acronyms instead of knowing good engineering practices.


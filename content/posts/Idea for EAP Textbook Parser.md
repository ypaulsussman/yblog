---
title: EAP Textbook Parser
date: "2019-02-10"
template: "post"
draft: false
slug: "/posts/eap-textbook-parser-idea/"
category: "What I Think"
tags:
  - "Ed Tech"
  - "Teaching"
  - "Learning"
  - "Language Learning"
  - "ESP / EAP"
description: "A vision for a small app that would generate a list of 'language to learn' in order to scaffold ELL's engagement with an English-medium content course's main textbook."
---

## What Are We Doing Here?

```
> "Program to parse reoccuring parts of speech/collocations within a preexisting textbook (so as to build a course/lesson around it.)"
> 
> - Original scribble
```

I know that many of the `${ESP/EAP textbooks that (for example) Cambridge University Press releases}` are based on corpus analysis of pre-existing articles in that field (_...I think. Or maybe it’s just the best intuitions of the SME that they were able to contract with? I should probably research that more before making claims..._)

But what about subfields more specific than e.g. [law, finance, or engineering](https://www.cambridge.es/en/catalogue/business-english/other-titles/professional-english-in-use)? And what about the non-field-specific language that nonetheless might occur disproportionately in those textbooks?

Given the scarcity of time `${the average adult, tertiary-education-bound ELL}` faces, rather than prescribing one textbook that hopes to cover the entirety of a field, shouldn't it be possible for an instructor extract the `${language to practice in an EAP course}` that's unique to the exact textbook(s) the students will later be using?

## What Could We Do About It?

I believe (_...fervently hope..._) there are preexisting NLP libraries to check against all inflections of a given morpohological object, as well as all syntactic variants of a given multi-word phrase.

With such a library, you should be able to scrape the digital (OCR'd) copy of an English-language content textbook for all its [phrasal verbs, or collocations, or content words] below a certain frequency level in generic-language corpora such as COCA, BNC, or GloWbE (that is, constituents of some hazy "CEFR B2 and up"-lexicon), then:
1. make a list of the frequency with which `${each lexical item from that preselected list}` occurs;
1. calcualate the ratio of `${the frequency with which a lexical item occurs in the textbook}` to `${the frequency with which the item occurs in generic corpora}`, that is, how disproportionately rare the item is;
1. calculate how (un)equally distributed an item is across the textbook (_that is, perhaps occurring exclusively in chapter 9, or occurring with three times as much frequency in the first four chapters of the book as the last eight_);
1. reconcile (_...how?_)the above `${one absolute and two relative frequency lists}` to determine which lexical items to focus on in a course, and in what sequence, and to what extent.
  
(To be clear, when I say "_a course_" above, I'm visualizing a two-week bridge program, or a weekly evening session across a semester: I'm not proposing a parallel, for-credit, semester-long study of the language in an ongoing or upcoming content course.)

## And Why?

I'd thought over three potential avenues to sell such a tool: students, schools, and publishers.

Given that you only need to parse a textbook once (that is, there's little personalization), I don't see it surviving a generic tool: if valuable, its products would be posted online with the same availability as the textbooks they mapped from.

It's not clear to me whether, within a university, whether the client would be from a degree-granting school/department (e.g. Mechanical Engineering, Chemistry, Anthropology, Film), or from the continuing studies/bridge program that prepares international students for admission into that school/department. Add to that my general unease around selling to educational institutions (at least as the first tranche of clients), and this doesn't seem like a great way to spend time.

For a publisher, I'd imagine they'd want to use the tool to generate the content to be used in parallel with the book. That's interesting: perhaps selling a parallel, browser-based learning module as an add-on to the textbook purchase, or (again, likely for additional cost) creating hyperlinks over given items (from within a digital copy of the textbook) that take the reader to short practice sessions with the items in that section or chapter.

The downside here being that I _really_ like the potential of Open Educational Resources (OER). So perhaps that's the step I'd take, post-MVP: head over to OpenStax, or OpenEd, or the Open Textbook Library, and begin creating those parallel "here's how not to get bogged down in the language this book uses" preparatory modules, both as a general competitive advantage for the OER textbooks and specifically to promote their usage among English-as-a-medium-of-instructino institutions.

## Next steps

But first, obviously: to build the thing. And for that, you need to take a course in NLP. 

A follow-up, dreaded question: are the bindings to NLP libraries for Ruby anywhere as good as those, purportedly at least, for Python?

A follow-follow-up, more-dreaded question: and, if not, how do you induce `${lovely_spouse}` to write all the scraping, parsing, and tokenizing code for you?

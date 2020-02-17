---
title: "Maybe Build: A Language Extractor for EAP/ESP Textbooks?"
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

I've liked Cambridge University Press (CUP)'s "[`${language_structure}` _in Use_](https://www.cambridge.org/us/search?site=CE&currentTheme=Learning&iFeelLucky=false&query=in+use)" textbooks since I opened my first one.

(_Apologies for load-time on that link; apparently CUP does_ not _cache queries._)

Regardless of whether `${language_structure}` was [_idioms, collocations, phrasal verbs, the various proficiency-tiers of general vocabulary, etc_], in each of that series' books, the preface would 
1. assert that, yes, the contents of the book had been selected by reference to a language corpus (_rather than, say, their ad hoc whims and intuitions_), and then 
2. actually _list_ the specific corpora!

As an inexperienced teacher, wanting to do right by my students -- but having few methods (_save my_ own _ad hoc whims and intuitions_) to gauge the frequency, complexity, and relevance of a language-structure to teach -- I found this incredibly reassuring. The books rapidly joined my default course-toolkit.

Later, though, I had need of their [similarly-titled textbooks](https://www.cambridge.org/us/search?currentTheme=Learning&query=in+use&tab=cambridgeenglish&pageSize=20&webSubjects%5B%5D=Business%2C+Professional+and+Vocational-%3EBusiness+English&webSubjects%5B%5D=Business%2C+Professional+and+Vocational-%3EProfessional+English&webSubjects%5B%5D=Business%2C+Professional+and+Vocational-%3EVocational+English&sortOrder=&openOptions[]=facet_webSubjects&openOptions[]=facet_2fb6a8fac8c372930fcf18be85f26937&openOptions[]=facet_lvar&openOptions[]=facet_format&openOptions[]=facet_exam&openOptions[]=facet_cef&openOptions[]=facet_type&closedOptions[]=facet_f4a9b56113fbe3f774b9a3f996c3cbab&closedOptions[]=facet_7be323f6b6592373405912878ea44470&closedOptions[]=facet_64d8e9e09d34e44c325b15bdd15afbd3&closedOptions[]=facet_3b7fa03a0f178febd25dd574a3d90f87&closedOptions[]=facet_9a8f31e38f64f5d5d511e76a60cb78f6&closedOptions[]=facet_273b64be1cb56d3af1ba2a687f97ee15&closedOptions[]=facet_557234f63109d60f77e9bb72a576645a&closedOptions[]=facet_f0dd11412ad4bc8a5856af65db7a3f1e&closedOptions[]=facet_45015ac31c52095fe7936111d2d32455) in the English for Specific Purposes (ESP) subdiscipline. Of the several titles I used, only one featured a similar "corpus-informed" assertion in its preface. 

Which itself was merely disappointing, not necessarily harmful: in that particular teaching context, however, it exacerbated my preexisting ESP-materials sourcing issue. 

At the time, I was teaching interdisciplinary classes of STEM grad students at the Warsaw University of Technology. Multiple courses' needs analyses revealed that, while many of the _tasks_ that the students needed to practice were similar (_conducting presentations, writing abstracts, drafting formal communications, etc._), the underlying language _structures_ varied greatly by a given learner's academic specialization. 

The civil engineers, that is, had only partial overlap with the physicists (_and they with the software developers, and so on_) in terms of the vocabulary needed to perform these otherwise-standardized functions of professional English. Once we got beyond the most basic skeleton of e.g. a request-for-proposals letter, the actual linguistic content diverged widely from student to student.

I did my best to instruct only the most widespread, generic academic vocabulary, thereby neglecting no one; it largely worked, but still left me unsatisfied. 

## What Could We Do About It?

Fast forward several years, to earlier this week: wherein friend-spouse had been exploring natural-language processing (NLP) through an [introductory textbook](http://shop.oreilly.com/product/9780596516499). 

Creeping over her shoulder, I came to a realization: kitchen-table NLP's far more approachable than it appeared back in grad school! I was impressed by how much heavy lifting [NLTK](https://en.wikipedia.org/wiki/Natural_Language_Toolkit) does for you: tokenization, part-of-speech tagging, shallow-parsing, and n-gram generation are all provided out-of-the-box.

This resurfaced my earlier desire, to easily-yet-accurately extract discipline-specific target language for my students.

If only each of my students, my roboticists and hydrologists and bioinformatics-programmers, if only each of them had ready access to a miniature corpus of the terminology and constructions frequently used in their field. 

A sort of "book of texts," if you will...

And even if the textbooks for my students' content-courses were in Polish, their English-language counterparts are hardly scarce or costly in the era of Amazon.

For each linguistic item in the various [_phrasal verbs, idioms, collocations, content words, etc_] lists presented in the "_* in Use_" texbooks above, you could:
- calculate the frequency that the item occurs in those general-English corpora from which the "_* in Use_" series was constructed (_e.g. CANCODE, Cambridge International Corpus, etc_) -- or, if those are unavailable, from the CoCA corpus (_filtered for academic texts_); 
- generate a discipline-specific mini-corpus by concatenating all textbooks required by a given STEM degree's courses; 
- calculate the frequency that the item occurs in this new mini-corpus;
- subtract the first calculation from the second calculation, to estimate how disproportionately-featured the item is within this discipline; and finally
- rank the linguistic items by this estimate, identify the outliers, and prioritize teaching them.

I see two potential applications of this process, and two qualifiers to be mindful of.

First, the pitfalls. A smaller corpus is more vulnerable to confounding variables: exceptions simply have more weight. The above procedure would be more trustworthy if, in parallel, the linguistic item's frequency-distribution _within_ the mini-corpus was also derived. 

This would help confirm that any frequency-discrepancy between the two corpora is attributable to the content of those corpora: and not specific to either an individual author (_in which case the frequency would rise within a single book inside the mini-corpus_) or an individual subtopic of the discipline (_in which case the frequency would rise within a single chapter across potentialy several textbooks inside the corpus._)

## Next steps

Second, the opportunities. 

I mentioned that several of the ESP textbooks from the "_* in Use_" series don't appear to be corpus-informed: while the process behind those books is proprietary, this would be an efficient, open method of validating of their content. 

(_Or, if needed, augmenting them: the series' textbooks also share a novel two-page-spread formatting for their units, which both [1] proved useful for my learners and [2] would be straightforward to replicate using alternative target-language._)

Then there are the cases where neither validation nor augmentation will suffice. Unless your career falls into one of half-a-dozen fields (and _you aim to be a generalist within it_), there's not really a book, as yet, to serve your specific ESP needs. 

(_An aside: I predict such need only to grow over the following decade, coeval with further deepening of the expertise-vertical for_ [_T-skilled knowledge-workers_](https://en.wikipedia.org/wiki/T-shaped_skills)_. Smaller, more-specialized fields of research/practice are likely_ necessary, _for human progress: but in the short term, they'll only compound the issue of too broadly-focused ESP materials._)

In addition, I... how to put this... I don't work for Cambridge (_or any textbook-publisher!_) And I want to support the Open Educational Resources (OER) movement: so there's no impetus to deliberately engage with preexisting, closed-source materials.

The stacks of the [Open Textbook Library](https://open.umn.edu/opentextbooks) reach close to 700 books: surely at least one field has aggregated enough texts therein to create one of my envisioned mini-corpora.

Using the process above, then, one could acutally create "_here's how gain facility with the field-specific language that academic discipline uses!_" preparatory EAP/ESP modules for each of the library's best-represented areas of study.

There's something really nice to that idea, both in its embodiment of the general OER philosophy and its practical potential: surely such adjuvant language-learning materials would to promote the usage of the OER textbooks, at least among English-as-a-medium-of-instruction (EMI) institutions.
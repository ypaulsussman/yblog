---
title: "Maybe Research: Diversifying Spaced-Repetition Tasks?"
date: "2019-04-14"
template: "post"
draft: false
slug: "/posts/srs-task-improvements/"
category: "What I Think"
tags:
  - "Ed Tech"
  - "Teaching"
  - "Learning"
  - "Language Learning"
description: "Ideas for different ways a user might interact with a flashcard's content, to minimize the risk of chunk-memorization."
---

## What Are We Doing Here?

<!-- ```
>[1] SRS format displaying sentences, but with the ability to highlight particular words to practice them further (in different sentences -- scraped from websites).
>
>[2] SRS task: you are presented with a formerly-correct sentence into which an error has been added. You must click the area with the error, and correct. If needed, the region with the error can be highlighted. Repetitions spread timing, but also change the content words to prevent easy recognition of the error.
> 
> - Original scribble
``` -->

Man, I love me some Anki. 

I paid $25 for the iOS app, and (_assuming 5-10 minutes of usage a day, every day_) its per-use cost is trending to pennies. It’s become an imbricated component of my daily commute: if the weather is warm enough, I begin while waiting for the bus; if too cold, as soon as I hop on:

1. I silently read the prompt in English; 
1. I mentally construct the sentence in Ukrainian;
1. I mutter it to myself _just_ quietly enough not to worry the other straphangers (_...I think_);
1. I compare my mentally-constructed sentence with the (_student/prior-me-written, instructor/native-speaker-corrected_) one that I had entered so many [ _hours, days, weeks, ...months?_ ] ago;
1. I combine my subjective evaluation of `${how inaccurately-divergent my mentally-constructed sentence was}` and `${how difficult it was to construct the sentence}` into a simple tap on one of the four buttons; and 
1. I repeat with the next flashcard.

It's a joyful, helpful process.

It depends, however, on that second step occurring as intended: that is, 
- first the retrieval from memory of the relevant linguistic elements (_the 'words and rules'_), and 
- then the conscious construction of a full sentence from those constituent parts.

Recently, I've felt this process less and less.

While it’s possible that I’ve just so thoroughly internalized those elements that the sentence construction takes place automatically, I’m inclined to a more pessimistic supposition: my brain (_well-intentioned friend that it is!_) has begun storing each of these flashcard sentences as a fixed memory, for ease of immediate recall.

That is: I suspect my brain's begun to [memoize](https://en.wikipedia.org/wiki/Memoization) my flashcard prompts.

This may have been foregrounded by the nature of the content I'm studying: in a [heavily inflectional language](https://en.wikipedia.org/wiki/Ukrainian_grammar#Morphology), it rapidly becomes palpable that your brain is keying off a specific instance of e.g. a verb, its [_aspect, tense, gender, deixis, plurality, etc_] all pre-packaged -- rather than the verb's holistic potential, all its semantic mapping and combinatorial rules of affixation.

But it's not limited to freezing bound morphemes: I've begun to worry just as much about accidental, dubiously-attested lexical groupings. “Величезне" and "коливання” (_possible, per googling?_) or “сприяє" and "психологічному розладу” (_unlikely_) may or may not collocate in any sort of common usage. But that doesn't matter: for me, their constituent words will always entwine together, because I’ve learned each such word solely from a single (_still more-dubious, self-created!_) sentence, to which I've been exposed again and again and again.

On my own personal bus rides, I attempt to compensate for these by, for example, mentally using one such noun in a new, second sentence, separate from its erstwhile partner, or using a verb in a different declension: but that only works for me, it only works when I remember to do it, and none of this ad-hoc language that I produce is stored or checked for correctness.

## What Could We Do About It?

I don't see an SRS app that automatically provides minor permutations to `${the initial, user-provided flashcard content}` as the solution. While it's what the first proposal in the above scribble alludes to, I'd consider it necessary: but not sufficient.

A close variant of this behavior is already visible in Duolingo, along with its limitations. The messy mapping of natural language to predictable rules means that there's only a very, very narrow band of certainty in which you’ll be able to `${programmatically shift one variable, generally a listeme, in a sentence}` and know that the only semantic value altered is that predicted by the altered variable. 

As far as I can tell, that narrowness effectively confines the use of these algorithmically-directed permutations as a pedagogical tool to... well, theme-sequenced vocab acquisition at the A0-A2 levels. (_Which, of course, is precisely what Duolingo does rather well._) 

A broader restatement of the problem, then: SRS masters the timing of [_when, and what content_] to elicit, but the question of what _action_ to perform on that content is largely unadressed.

One of the commendable qualities of Anki is that this question is at least partially left to the learner, given the variety of multimedia and plugins that can be added to the “problem and solution” two-sided flashcard base. 

Making effective use of `${all the various task/exercise types}` requires both an acknowledgment of its necessity and some familiarity with instructional design, however: and how widespread are either?

I propose combining both ideas from the above scribble (_among others_) to compose a short list of generically-applicable exercises beyond "_given an L1 sentence, construct an L2 equivalent_." 

For simplicity's sake, this SRS could initially follow a Leitner system of "_Box #1, daily; #2, every 3 days; #3, weekly; #4, biweekly; #5, monthly_" -- the crucial difference being, however, that (_on completing that fifth box_) a card would return to box #1, now with a more-complex exercise-prompt attached to its content.

How to construct that list of exercises, though? My first instinct was to fall back on my old standby, [the DOK table](https://www.lake.k12.fl.us/Page/27614). That model, however, emerges from research across the broad spectrum of academic content disciplines; for practical reasons, I'm restricting this project's MVP solely to second/foreign-language learning.

I find the below chart, taken from an [admittedly-dated reassessment of TBLT](https://doi.org/10.1093/elt/58.4.319), to be a better guide for where to position exercises:

![Continuum of Tasks' Focus](/media/continuum_focus_on_forms_to_focus_on_meaning_Littlewood_2004.png)

## Next steps

Step one is implement your own SRS app (_a non-trivial technical implementation, but one likely requiring little collateral research_). 

Step two is to create a sequence of learning exercises that can be [1] applied to any bilingual sentence-pair and [2]validated programatically (_a non-trivial amount of secondary-source research, but a straightforward document to build._) It very well may be that only the two task-options proposed in the initial scribble match both criteria: that's OK! They're plenty to work with on their own.

Step three is to integrate the two.

Step four... is to dogfood, and refine.
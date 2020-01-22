---
title: "Maybe Build: An Idioms-Based Vocab Trainer?"
date: "2019-02-26"
template: "post"
draft: false
slug: "/posts/idiom-vocab-builder-idea/"
category: "What I Think"
tags:
  - "Ed Tech"
  - "Teaching"
  - "Learning"
  - "Language Learning"
description: "A vision for a small app that would leverage associated idioms to assist vocab retention beyond that provided by a raw, lemma-focused SRS."
---

## What Are We Doing Here?

```
> "Idiomatic: app for learning individual vocabulary via SRS, introduced and retrieved via idioms/collocations that make use of that vocab item. (Cross-reference vocab frequency against containing idiom’s frequency; perhaps narrow by discipline i.e. travel, conversation, business, academic.) Ignore phrasals. (Idiomate?)"
> 
> - Original scribble
```

Historically, I’ve been perfectly happy to avoid idioms in my language learning endeavors. Phrasal verbs (_or whatever the term for their affix-based Slavic counterpart is_) are a necessity for even basic communication; set expressions tend to be a primary constituent of functional/transactional discourse types (_see pretty much any travel phrasebook_); and collocations are... well, maybe they're just a stylistic flourish, a sign of dedication to learning a particular language. But a snappy flourish they are.

Idioms, though? Perhaps I've just been put off by the repeated experience of a colleague or student proudly displaying their command of English by observing in a downpour that "_It's raining cats and dogs!_" -- but I've traditionally found idioms (_and their proverb cousins_) a terrible gamble, at least as a subject for allocating focus when learning a language in a foreign context.

Partially, this is a matter of imperfect information for even the best-documented languages: with so little free time to learn and practice (_not to mention so few opportunities for confirmation with native speakers_), why risk expending energy to wire neurons for recognition/recall of a semantic string that might occur very rarely in typical discourse -- and even then, on occurrence, sound like the jocular, partially-demented folk-sayings of someone's great-grandmother?

Recently, though, I’ve begun to reconsider: not from the immediate value that learning an idiom can bring, but because of its ancillary benefits.

A Ukrainian equivalent to "_when pigs fly_" is -- and if this doesn't make you adore Ukraine, then побійся Бога, синку -- "_коли рак на горі свисне._" 

That is, "_when crabs whistle in the mountains._" 

Firstly, good luck forgetting that image; second, if (_like me, on first encounter!_) you know all the words in the expression save "_whistle,_" you'll be well-equipped to remember that verb for the future. My hypothesis, then, is that learning idioms, regardless of their linguistic frequency, can be valuable because of their assistance in recalling consitutent words that may themselves more commonly occur.

## What Could We Do About It?

I’m focusing on low-frequency lexis because it seems like a stretch for a program to be able to concoct even a mini-exercise regimen around an incidentally-occurring morphological/syntactic rule. 

(I may be underestimating the quality of present dataset-tagging and NLP-parsers, but _"'Til the cows come home' includes... the present-simple-for-expected-or-scheduled-future-events usage! Here, now you try it!"_ seems like an excessive task of both deduction and creation for contemporary algorithms.)

I don't envision such a service composing a standalone application: but as a (_perhaps weekly?_) component of a holistic foreign-context language-learning app, I could imagine it offering novelty, even respite, from the daily devoirs.

Assuming an app pushes, say, one idiom a week (_with L2 definition, and at least one example sentence_) to the user’s phone, that learner should be then able to tap a given word from that expression to see both the L2 definition of the word and (_perhaps on further click_) the word’s direct L1 translation.

From there, the app could prompt the user to create three sentences (_be they gap-fill or simple question_), each eliciting the full idiom. (_These sentence-idiom pairs would then be added to the SRS._) 

An aside: after some contemplation, I'd actually propose these sentences be in the learner's L1. Even assuming their tutor would be available to review and return corrections on such sentences (_for which further, perhaps excessive, allowances would need to be made_), my main concern would be that this exercise not spiral into a dozen new lexical items, but solely [1] the idiom, and [2] its, say, 1-3 highighted constituent listemes. (_I've been using "word" above, but really we're thinking of any listeme above the size of a bound morpheme._)

Finally, on completion of the SRS idiom-prompts, the learner should receive, say, 3-5 L2 sentences including a given constituent listeme. The learner would then create an L1 translation for the sentence [1] they find most demonstrative, and [2] with the fewest other new lexis, then add the sentence pair to their SRS. (_Given most learners' facility with translating from the L2 to their L1, I’d be comfortable experimenting with this process not having tutor oversight._)

And there you go. The learner has been presented with an L2 idiom, scraped it for new vocabulary meaningful to them, and added both to their SRS, complete with language prompts accurate to a band of reasonable certainty.

## Next steps

For listemes, at least, [Словник української мови](http://sum.in.ua/) has an API to return definitions: and, more importantly, usages of that item in a variety of sentences. You've already made use of Google's Translate API for Ukrainian in the past, and it even looks like others have had success [creating API's alternate to AnkiWeb](https://github.com/dsnopek/anki-sync-server) for Anki to sync with.

None of which, of course, resolves the original concern of “_...but **which** idioms?_”

The resources for English-language learners, which presumably any such app would begin with, are much more plentiful and robustly-curated: but for Ukrainian, there are still some decent options.

Step one would be to scrape [[several](https://ukr.ed-era.com/3/slovnik_naiuzhivanshih_frazeologzmv.html) [different](https://korusno-znatu.in.ua/category/frazeologizmy/) [sites](http://zno.if.ua/?p=2364) [collecting](https://ycilka.net/slovnyk_fraz.php)] Ukrainian idioms, then feed them into the [General Regionally Annotated Corpus of Ukrainian.](http://uacorpus.org/) 

...yep, "_then feed [each idiom] into [GRAC]._" Allowing for each morphosyntactic variant within each expression: each possible tense, each variation of word order and affix, each commonly-substituted synonym. 

You know, [an implementation detail!](https://en.wikipedia.org/wiki/Small_matter_of_programming) That sounds like a lot of work.

You know what would be a lot easier? Just asking someone. But that raises perhaps the most interesting question from all of this: assuming you get a native speaker to confirm which idioms they hear with any regularity (_and within which specific media/professional/genre contexts, if any_), how close would that list be to the one that the GRAC would attest?

Has there been any research comparing native-speaker intuitions against actual corpus data? That could be a promising field of study: what words or expressions do people think are more common than they actually are? Rarer? Confined solely to a specific discourse field? 

Read up on that, before anything. Just don't let that distract you from the main issue: "IdioMatic" or even "IdioMate" would still be _great_ names for an application.

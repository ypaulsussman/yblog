---
title: "Maybe Build: An Idioms-Based Vocab Trainer"
date: "2019-02-26"
template: "post"
draft: false
slug: "/posts/idiom-based-vocab-trainer/"
category: "What I Think"
tags:
  - "EdTech"
  - "Language Learning"
  - "Learning"
  - "Vocabulary"
description: "Idioms often sound stilted: but I suspect their expressiveness helps learners retain the (likely more-useful!) component vocabulary. Here's an idea for an app to leverage that."
---

## What Are We Doing Here?

Historically, I’ve avoided idioms when learning a language.

Phrasal verbs (_or whatever their affix-based Slavic counterpart is named_) are a necessity for even basic communication, while functional exponents are a major constituent of transactional discourse (_see pretty much any travel phrasebook_).

Idioms, though? I feel like they age rapidly, and occur less frequently, than other listemes. Perhaps I've been put off by the -- repeated -- experience of a student proudly displaying their command of English by observing that "_it's raining cats and dogs!_"  

Still: when learning a language myself, I've found idioms (_and their proverb-cousins_) to be a losing gamble as a subject of study.

With so much content and so little time, why expend energy on a phrasal-string that only _might_ ever arise in future usage? And which, depending on how stilted the idiom, might make you sound like someone's jocular, partially-demented L2 grandmother?

Recently, though, I’ve begun to reconsider: not from the immediate value of learning an idiom, but its potential ancillary benefits.

An example: the Ukrainian equivalent to "_when pigs fly_" is -- and if this doesn't make you adore Ukraine, then побійся Бога, синку -- "_коли рак на горі свисне._"

Literally, "_when crabs whistle in the mountains._"

Firstly, good luck forgetting that image; second, if (_like me, on first encounter!_) you already knew each L2 word save "_whistle,_" I can basically promise you'll never forget that verb in the future.

My hypothesis, then: learning an idiom can be valuable, regardless of discourse frequency or sociolinguistic baggage, simply because its vividness _also_ facilitates the recall of its consitutent words -- words that themselves might far more commonly occur.

## What Could We Do About It

I envision a system in which:

- a mobile app pushes ~2-4 idioms a week (_with L2 definition, and at least one example sentence_) to the user’s phone;
- the user can tap any constituent word to see both
  - its L2 definition (_with example sentence?_) and
  - (_perhaps on further click_) its L1 translation;
- the app prompts the user to select up to three word from the idiom;
- the app then generates three flashcards, each containing
  - the word's underlying lexeme, as flashcard-prompt, and
  - both its L1 translation and the parent idiom (_also with L1 definition_), as flashcard-answer;
- finally, the app commits the flashcards to its associated spaced-repetition system (SRS).

I should note that the above proceeds from my -- flawed, but ongoing -- conception of "_SRS as a poor man's_ [_memex_](https://en.wikipedia.org/wiki/Memex)"; even with algorithms, flashcards are (_hopefully_) not the summit of individual declarative-knowledge tooling. They are, however, the tool I'm working with now.

From there, two implementation paths diverge.

In terms of both multilingual and idiom-focused dictionaries, an app targeting English-language learners will have far more plentiful and robustly-curated resources. (_Whether to name such an app "IdioMatic" or "IdioMate" is an unresolved detail._)

As such, I'll focus the rest of the article on how to build the same tool, for an L1-English learner of Ukrainian: a "me," if you will! (_You've been warned._)

## Next steps

Technologically, it seems possible:

1. For listemes, the [Словник української мови](http://sum.in.ua/)'s API will return both L2 definitions and sentential examples of usage;

2. Google's Translate API for Ukrainian has [served you well](../../posts/daily-ua-app/) in the past (_take a note, AppEngine_); and

3. Other developers have successfully [created AnkiWeb alternatives](https://github.com/ankicommunity/anki-sync-server) for Anki's flashcard client to sync with.

The difficulty arises when considering what language-items to present. There are [at least](https://ukr.ed-era.com/3/slovnik_naiuzhivanshih_frazeologzmv.html) [several](https://korusno-znatu.in.ua/category/frazeologizmy/) [sites](http://zno.if.ua/?p=2364) [collecting](https://ycilka.net/slovnyk_fraz.php) Ukrainian idioms; to simply aggregate them, then distribute them naïvely resolves the issue of content, but isn't very satisfying.

Better would be to first feed them into the [General Regionally Annotated Corpus of Ukrainian](http://uacorpus.org/), then order the list of idioms by frequency.

Doing so accurately, however -- normalizing each lexeme's morphosyntactic variants within each expression, compensating for textual genres' differing weights in the corpus, etc -- that feels like a lot of work. Just asking a Ukrainian (_video tutor, or colleague, or buddy_) seems a _lot_ easier.

But that raises another question: assuming you get a native speaker to report the frequency with which they hear various idioms, how close would that list be to the one that the GRAC would attest?

That is, has there been prior research into how native-speaker intuitions contradict corpus data? That could be a promising field of study.

What words, or expressions, do people think are rarer than they actually are? Older? Used specifically by certain communities? Confined solely to certain texts?

Probably a topic for my fourth Ph.D., then...

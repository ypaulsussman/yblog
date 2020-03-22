---
title: "Maybe Research: Spaced-Repetition Task Sequencing"
date: "2019-04-14"
template: "post"
draft: false
slug: "/posts/srs-task-sequencing/"
category: "What I Think"
tags:
  - "Distance Learning"
  - "EdTech"
  - "Learning"
  - "Language Learning"
  - "Spaced Repetition"
description: "An idea for how to elicit multiple interaction-patterns with a flashcard, to minimize the risk of content fossilization."
---

## What Are We Doing Here?

Man, I love me some Anki.

I paid \$25 for the iOS app, and (_assuming 5-10 minutes of usage a day, every day_) its prorated cost is trending toward pennies. It’s integral to my daily commute: the bus has become my time to engage with the day's selected sentences. Each card gets the same treatment:

1. I silently read the prompt in English;
1. I translate the sentence into Ukrainian, muttering _just_ quietly enough not to worry the other passengers;
1. I compare my mentally-constructed Ukrainian sentence with the (_prior-me-written, then native-speaker-corrected_) version that I had added to the deck so many [_days, weeks, months_] prior;
1. I briefly evaluate:
   - How difficult was it, initially, to rebuild the Ukrainian sentence?
   - How inaccurately-divergent was today's version of the sentence?
1. I combine my answers into a simple tap, on one of four difficulty-level buttons; and
1. I repeat with the next flashcard.

Its helpfulness is expected, but its daily joyfulness... that was a surprise.

Such pedagogical value does depend, however, on Step #2 occurring as intended. Ideally, it should comprise first [1] retrieving the relevant linguistic elements (_the 'words and rules'_) from memory, then [2] "_applying the rules to the words,_" as it were, to (_re_)construct the full sentence.

Recently, I've sensed this sequence of actions occurring less and less.

It’s technically _possible_ that I’ve internalized each such atom of the language so thoroughly that sentence-construction now takes place so rapidly, so automatically, as feel subconscious... but I’m inclined to a more pessimistic supposition.

I think my brain -- well-intentioned friend that it is! -- has, for ease of recall, begun storing each flashcard-sentence in its entirety. It's effectively begun to [memoize](https://en.wikipedia.org/wiki/Memoization) my flashcard answers!

This phenomenon might be exaggerated by the content I'm studying: in a heavily [inflectional language](https://en.wikipedia.org/wiki/Ukrainian_grammar#Morphology), it rapidly becomes palpable that your brain is keying off a specific instance of e.g. a verb, its [_aspect, tense, gender, deixis, plurality, etc_] all pre-packaged -- rather than the verb's lexeme, encompassing all its potential mappings and combinatorial rules of affixation.

But it's not limited to freezing bound morphemes: I've begun to worry just as much about accidental, dubiously-attested lexical groupings.

“Величезне" and "коливання” (_possibly attested, per DuckDuckGo?_) or “сприяє" and "психологічному розладу” (_not likely, per DDG_) may or may not collocate in common, idiomatic native usage. For me, though, each of those constituent parts _will_ be mentally wired to its partner, simply because I’ve solely been exposed to each such word in the context of that one single flashcard, containing that one single sentence, in turn containing that one single (_and very possibly dubious or unnatural-sounding_) collocation.

On my bus rides, I attempt to compensate: I may silently use a constituent noun as the subject of a new, unrelated sentence, or practice the different declensions of a constituent verb. But such exercises are woefully insufficient: they only work when I remember to do them, and none of the ad-hoc language generated is stored in any medium. None of it's even checked for correctness!

## What Could We Do About It

Duolingo offers one feature to prevent this wiring-together of unhelpfully-large linguistic chunks: across different encounters, it applies minor linguistic permutations to a sentence. I consider this necessary, but not sufficient.

Given how messily natural languages map to the rules that (_purport to_) describe them, there's a very narrow band of conditions under which an application can both [1] programmatically shift a single variable in a sentence and [2] maintain any certainty that the _only_ semantic-value altered is predictable by the shifted variable.

As far as I can tell, that narrowness confines the use of such algorithmically-directed permutations to theme-sequenced vocab acquisition at the A0-A2 levels. (_Which, to be fair, is exactly what Duolingo does rather well._)

To reassess the problem, then, more broadly: while spaced-repetition systems (SRS) master the timing of _when_ and _what content_ to elicit, the question of _what interaction_ to elicit is, as yet, largely unaddressed.

One commendable quality of Anki is that this is partially left to the learner, given the variety of multimedia and plugins that can be added to the basic, two-sided flashcard architecture.

Making effective use of those various content- and exercise-extensions, though, requires both an acknowledgment of their necessity and some familiarity with instructional design. How widespread are either?

## Next steps

As an alternative to an excessively-convoluted process of Anki extension, I envision an inventory of generic language exercises beyond "_given an L1 sentence, construct an L2 equivalent_."

For simplicity's sake, assume the associated SRS follows a ~Leitner system of "_Box #1, daily; #2, 3 days; #3, weekly; #4, biweekly; #5, monthly._" On completing the fifth box, a card returns to the first one: crucially, though, it will now feature a more-complex exercise-prompt attached to its content.

But how to compile and order that list of exercises?

My first instinct was to fall back on that trusty standby, [the DOK table](https://www.lake.k12.fl.us/Page/27614). That model, however, emerges from research across a broad spectrum of academic disciplines: for practical reasons, I plan to restrict this project to (_adult_) second/foreign-language learning.

The chart below (_admittedly, taken from_ [_a dated reassessment of task-based language teaching_](https://doi.org/10.1093/elt/58.4.319)) offers a more domain-oriented mental model for how to position (_and thus sequence_) exercises:

![Continuum of Tasks' Focus](/media/continuum_focus_on_forms_to_focus_on_meaning_Littlewood_2004.png)

The language practices falling in the `Structured communication` and `Authentic communication` fields are almost certainly beyond the (_current!_) capacity of mobile software to generate and monitor. Moreover, those fields' example tasks are significantly more time-consuming than an individual flashcard might be expected to proffer.

The `Enabling tasks` enumerated in those three `Focus on forms` fields, however, provide a suitable progression for that modified-Leitner system described above; other e.g. textbooks' activities can easily be checked and sorted against the associated criteria. Taken together, they make that "_inventory of exercises_" eminently composable.

The next step would be to ensure that the software can, for the consitutent language of each flashcard, individualize those successive generic exercises such that they generate both [1] a relevant prompt or challenge, and [2] an accurate example against which to compare the learner's output.

That seems just at the limits of what (_I understand_) current natural-language processing to be capable of: but not necessarily beyond them.

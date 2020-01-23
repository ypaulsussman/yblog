---
title: Revisiting 'Improving Adult Literacy Instruction'
date: "2019-03-17"
template: "post"
draft: false
slug: "/posts/improving-literacy-instruction-revisitation/"
category: "What I Read"
tags:
  - "ABE"
  - "Teaching"
  - "Learning"
  - "Language Learning"
  - "Literacy"
  - "Ed Tech"
description: "These are my thoughts on rereading the notes I'd taken while reading Improving Adult Literacy Instruction."
---

## What Are We Doing Here?

This document is a weird one: it’s notes from a review-of-the-literature white paper that... apparently I had elected to read? For... fun? Sometime in the middle of my first salaried programming job?

Whatever my reasons -- and I’m not being coy when I say, a year and a half on, they remain wholly obscure to me -- over the intervening 18 months, I've done nothing with the material therein. No application to toy apps, no usage in the classroom... it's been completely unreferenced.

As a result, my first (_somewhat shamefaced_) instinct was to skip revisiting this file entirely, and just surreptitiously delete it: but in recent months I'dspent so little time reviewing any education-related notes that I decided to undertake the (_pretty massive_) pruning, editing, and restructuring that was necessary to allow for meaningful engagement with the actual content. 

And I’m glad I did!

## Revisitation

First: a note on process. I felt that in this revisitation I engaged with the content in greater depth and granularity than I have in several revisitations prior. I believe this stemmed from these notes' need for an expansive, detailed reorganization. (_Bluntly: they were a dispersed, digressive, repetitive mess._) 

Ultimately, I suspect this made the revisitation more protracted, less superficial... and mentally more rewarding. One takeaway for the future, then (_facilitated, already, by the clipping feature of the Kindle I now largely use!_) is, when in doubt, to be liberal in selecting what to highlight. At the least, it'll force one's future self, on revisitation, to interact at a level deeper on the [DoK tables.](https://www.lake.k12.fl.us/Page/27614) 

---

Less positively: this set of notes finally drove home the annoyance and superfluousness of my earlier attempts to maintain (_at least a facsimile of_) APA-style citations. So many unnecessary periphrastic brackets... an unpleasant but forceful reminder to write for the genre, even if the genre in question is "_loose notes, solely for you and your busy self a couple months from now._"

---

Ironically, perhaps, the thickest section (_and one I got the most out of_) was the content-neutral, skills-neutral overview on What Works® universally for instructional design. Completely removed from the world of adult literacy education, there's plenty in this chapter that, now reminded, I can apply to my own neurotic attempts to perpetually measure and hone my personal autodidactic process. 

---

On a slightly less selfish level, one mental tool this revisitation prompted was a framework for envisioning `${adult literacy development}` as a proxy or analogue for `${the process of learning to code.}` They share a similar reliance on several individual subskills (_each integrated, and/or sequenced, to varying degrees_); in both cases, there exist several (_preexisting, still-in-use_) mental processes that may interfere with skill acquisition; and both deal in several levels of functional proficiency (_rather than a binary, so-unhelpful-as-to-be-meaningless "able to code"/"able to read."_) 

I'm not sure to what level of detail it's useful to explore the analogy, or even whether to focus instead on areas in which the equivalence breaks down: but it's definitely a comparison to further contemplate. I suspect successful practices in one field could be reenvisioned and applied, beneficially, for the other. '_Literacy bootcamp?_' Well, why not?<sup>1</sup>

---

Finally, coming on the heels of my navel-gazing about the tension and tradeoffs between `${perfecting pedagogical efficacy}` [vs] `${buttressing and expanding the basic social affordances which make even passable pedagogy realistic at a given institution}` (_see "Revisiting How the Brain Learns"_), this report was refreshingly clear about what it considers the most important target of future efforts. (_Spoilers: the latter._) 

## Next Steps

Unfortunately, it's that first, biggest research priority ("_engage learners for longer periods of time, encourage students to participate and persevere_") that I can affect the least: I'm not crazy about emulating big-tobacco-style advertising, even for education.<sup>2</sup> Likewise, you (_alas!_) won't see me in a position to tweak state/federal stipends for learners anytime soon. For the other priorities, though, there's more to think about: and, reassuringly for my ego, several options approachable via experimentation with toy apps!

---

A second research direction, to "_develop more valid ways of measuring adults’ literacy gains with assessments designed to show progress in specific component skills,_" resonates with my experience in classroom ELL literacy instruction. The [CASAS test's items](https://www.casas.org/product-overviews/curriculum-management-instruction/sample-test-items/life-and-work-reading) are fairly straightforward in their structure (_they're all selected-response, multiple-choice._) 

This makes them rather amenable to [1] easy human generation (_or more-difficult computer generation_) of similarly-formatted questions on a variety of desired content topics, and [2] inclusion in a modified SRS system that, for literacy development, could also track (_and respond with changes to_) feedback format (_e.g. from input of picture, to word, to eventually audio clip; and from output of selected word, to typed words, to possibly even speech-to-text._)

---

The paper also points toward technology's potential to "_free literacy practice from being dependent on a specific learning location,_" and (_while I'm loath to speak positively of... well, digital anything_) I’ve been surprised on multiple occasions by students' facility with their mobile devices, at no correlation to their English- or native-language literacy skills.

One such example is students (_importantly, across proficiency levels_) using YouTube's native-mobile application to gain exposure to English conversational language, especially set expressions and functional exponents. So how to deepen the quality of these interactions?

I see two paths to leveraging this. The first involves more initial human labor: a school would need to submit their own videos. However, by adding a link in the video description to a website containing `${comprehension, language-focus, even text-response}` questions, you remove the common blocker of needing to first navigate to the OS' default browser application, then browse to the correct URL (_a process I've observed stymie learners on numerous occasions: and one indifferent to the complexity of the URL itself._)

The second (_significantly more ambitious_) project would embed a video, and generate questions automatically. It looks like both YouTube's submitted and automatic captions are wrapped in the `class="captions-text"` selector: so, presumably, you can agnostically scrape text from English-language video captions, regardless of whether those captions were initially provided by the uploader. (_A quick StackOverflowing tentatively confirms this._) The NLP needed to generate `${even the simplest of questions that would still be meaningfully derived from a video's captions}` make this well outside my bounds of competence: but in principle it at least seems doable with today’s technology.

---

A final priority listed is to explore technology's capacity to "_overcome the high cost of intelligent human labor, in this case literacy instructors._" I feel my dozen-odd years in the classroom give me some standing to make the comparison, here, of full-time teachers to pre-industrial/subsistence farmers. (_Bear with me._)

The hours of the day are so insufficient, the baseline required tasks so demanding, and the price of failure so high, that... well, there’s just not a ton of incentive to expend even moderate amounts of extra energy on even reasonably-substantiated innovations. Those facts breed an entirely logical (exhausted) conservativism. And accepting that reality means acknowledging that, _a priori_, any teacher-support application is unhelpful (_and thus dead on arrival_) unless it decreases, initially and substantially, the amount of work the teacher needs to do. 

When I think through the list of common activities a classroom instructor frequently engages in, the first point of assistance that comes to mind is that of surfacing relevant materials during lesson preparation. I'm not sure whether the best model forward is:
1. via "push," that is, a search engine for that institution's library of teaching materials, customizable by (_e.g. proficiency level of students, theme guiding the lesson, standards composing the curriculum and informing later assessments, etc._) or 
2. via "pull" ...that is, the lesson-planner equivalent of Clippy: _"it looks like next Thursday you're teaching a course for the NRS 0-1 Class on Transporation. Would you like to see some relevant vocab sheets, and associated exercises?"_

I suspect the latter would see greater use, but perhaps would need the former accessible from within it?

The second point of assistance builds on that aforementioned unctuous nightmare, “_lesson-planner Clippy._” The amount of _post facto_ time teachers resentfully spend aligning 
1. what they intuit (based on their experience, and often correctly) to be the best structure of a lesson
[with]
1. whatever two-dozen bullets of inaccessible standards were attached by the `${institutional, regional, federal, international}` accrediting body

...is so acknowledged and intractable as to essentially be a meme at this point. 

(To be clear: by "_aligning_" I here mean "_contorting so as to be justified by: because, yet again, I'm on hour 10 of this work day, I still have to make copies for the students and finish grading my other course, and as such will be **damned** if I'm going to rewrite the entire controlled-practice section of this class to fit what some administrator in Bethesda pulled out of their Master's thesis._") 

And yet... those standards often do have real value to add to the lesson's creation! If nothing else, they inject a second voice and paradigm, even if detached: and thereby provoke that lesson-builder into questioning those default assumptions and rote formulas that creep into even the best teacher's practice over the semesters. 

I propose that standards are often damned by their implementation, not their contents: no one wants a scolding, unaccountable, disembodied schoolmarm (_even a checklist one_) casting a critical eye over the work they've just managed, barely yet painstakingly, to complete on schedule. What they might like is a dialogue with a peer (_even a silicon one_), and that dialog occuring \*during\* the lesson-writing process.

I'd envision, then, the second role of (_eugh, shudder_) “lesson-planner Clippy” to be almost that of a tax-preparation app's chatbot, providing input prompts to speed up e.g. task creation while simultaneously guiding the teacher to integrate best practices (_such as those listed in, well, the `Principles of Learning for Instructional Design` section of this paper..._)

Admittedly, this envisions the lesson-plan creation process as something akin to (_albeit very complex_) form-filling, which is simply impractical for the structure/content of some courses. For the majority of classroom-instruction sessions that I've been part of, however, I see such a tool fulfilling that highest, most praiseworthy goal: that is, to return at least _some_ time back to our teachers.

Though... woof. "_Lesson-planner Clippy._" Побоійся богу, синку...

---

<sup>1</sup>Well, sure, ignoring the whole "_complete lack of market demand/funding model_" and "_whole-cloth unsuitability to the realities of most non-literate ELL's family adn work lives._" ...beyond those, it seems promising?

<sup>2</sup> In this sentence I've irrevocably dated myself as hopelessly aged: it occurs that I can't plausibly expect that reference to resonate, anymore... I should've instead, perhaps, referenced Facebook.
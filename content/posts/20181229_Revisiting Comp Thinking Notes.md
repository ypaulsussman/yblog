---
title: Revisiting Notes On Computational Thinking
date: "2018-12-29"
template: "post"
draft: false
slug: "/posts/comp-thinking-revisitation/"
category: "What I Read"
tags:
  - "Teaching"
  - "Learning"
  - "Computational Thinking"
description: "I read several computational-thinking frameworks and curricula, then reread my notes a year later and wrote these reactions."
---

## What Are We Doing Here?

Back in the summer of 2017, I participated in the [Twin Cities Startup Weekend Education](http://communities.techstars.com/usa/twincities/startup-weekend/10569); I worked with a team called [Code Kitty.](http://codekitty.org/)

I moved on after a few months: I was more interested in the original pitch (_in-service teacher-training sessions_), rather than the direct-to-K-6 workshops that the team -- reasonably! -- settled on. (_I still get a smile every time I dip by their site._)

One project I undertook, while there, was a review of extant computational-thinking -- henceforth "CT" -- standards and curricula.

## Assessment Standards and Institutional Overlap

From ISTE to CSTA, from NSF to NAP... there are a _lot_ of agencies with opinions on how to measure CT skills.

My first thought was of [XKCD’s take on standards](https://xkcd.com/927/). My second was an uneasy memory, at OKpanda, of aligning [ACTFL tables](https://www.actfl.org/publications/guidelines-and-manuals/actfl-performance-descriptors-language-learners) to [CEFR descriptors](https://rm.coe.int/CoERMPublicCommonSearchServices/DisplayDCTMContent?documentId=090000168045bb52) to [ALTE's implementation thereof](https://www.cambridgeenglish.org/Images/28906-alte-can-do-document.pdf) to [ILR lists](http://www.govtilr.org/Skills/ILRscale1.htm) _et cetera_.

It's not impossible for the various CT frameworks to improve off -- or even merge with -- each other. My worry is that they’ll follow both USB's and TESOL's example, thereby siloing the impact of different initiatives' research.

As such, I found heartening [Google’s initial work](https://docs.google.com/spreadsheets/d/1SE7hGK5CkOlAf6oEnqk0DPr8OOSdyGZmRnROhr0XHys/edit#gid=218360034) to "[crosswalk](https://sites.ed.gov/ous/2012/05/crosswalks/)" (_shudder_) computer-science standards across countries. Less heartening:

- no work's been done on the document in the intervening ~three years;
- it's now only publicly linkable through a default-hidden 'microsite' `div`;
- its only public record is a presentationally-amateurish Google Sheets file. (_Though I suppose that **is** one of their products: drink your own champagne, and all that._)

## Lesson Plans and New Media

Contrasted with the various white papers and conference proceedings, reading through the two [teacher- and learner-focused PDFs from ScratchEd](http://scratched.gse.harvard.edu/guide/download.html) was _joyful_ -- and useful.

Each time I reviewed those documents, I encountered pedagogical features to use in future projects:

- `Debug It!` activities, wherein (_rather than building features_ ab initio) the students fix preexisting code: thereby developing a skill which

  - utilizes distinct -- but related -- patterns of analysis and reflection, and
  - is called for daily in workplace programming.

- The decision to use bordered, titled lists to present any information that's likely to be either performed in sequence, or referenced during frenetic classtime.

  - One particularly good example are exercises' hints under the header `Feeling Stuck?` - notably, in both the learner's workbook and the teacher's guide.
  - Some units, too, include similar suggestions under the more generic `Things to Try` heading.

- In the teacher's guide, `Possible Path` diagrams at the start of each unit. Humans deduce visual patterns faster than they decode text (_and recall them better._) The chart's visual organization of exercises' sequence, pairs, and (_implicit_) estimated length appear designed for use by an overworked, under-pressure teacher:

![Possible Path](/media/scratch_possible_path.png)

Each of these decisions shows a respect for the time, and the effort, of both teacher and student: that can't be overrated.

## Next Steps

Throughout my review of these instructions, questions, activities, and lesson plans, however... I felt an underlying unease that the entire Scratch curriculum was constricted by its medium, constrained to static sheaves of paper.

I see a few opportunities that digitization could provide, i.e. one interactive application each for the Creative Computing Learner Workbook (_for students_) and Curriculum (_for teachers._)

As an example, transferring each unit's `Reflections` questions to HTML forms would provide students typing practice: a critical skill, and one often taught in a context void. (_As most Scratch student-input is via mouse-manipulation, rather than typing, this doesn't necessarily result in excessive drilling._) 

For teachers, such forms would render a more structured, portable, analyzable repository of the students' reflections. (_Such a repo could, just as easily, help students assess and appreciate their own progress._)

Another case: scaffolding the `Start Here`, `Things to Try`, and `Finished?` sections (_henceforth bundled as "Instructions"_) with multimedia would make those Instructions accessible to a wider range of students. I'm envisioning Instructions that:

- begin (_as they now do, in the workbook_) with unaugmented text, then (_at a learner's request, perhaps, or on a timer_)
- are supplemented by an attention-drawing [_icon, arrow, highlight_] around where to [_click, keypress, drag, enter, etc_], then finally
- are temporarily replaced by an animation of the desired onscreen human-computer interaction that the earner must later replicate, while a voiceover (_and/or descriptive text_) simultaneously describes each ongoing action.

This arises because I found myself noting, several times, that while an activity's _technical complexity_ seemed accessible to multiple ages or language-proficiency levels, it was the _linguistic complexity_ of the Instructions' English that seemed most forbidding (_e.g._ "envision," "aspect," _and_ "incorporate" _all appear in the student-facing workbook._)

(_And, at the very least, such a web app could automatically grade Instructions' linguistic complexity to the individual learner, if e.g. the classroom contains ELL's and peer-instruction is off the table._)

The third opportunity provided by digitization also opens a research question that I'd like to explore. An app could display each step of a sequence alone, separate from the preceding and following instructions: I'm curious how this delivery would impact learners' interactions with the Scratch exercises.

Does presenting each instruction individually make task-comprehension and -completion smoother? Is that a welcome removal of distraction? Or a confusing removal of context?

The screen allows two presentational states, then: seeing only the current instruction, and seeing the entire sequence of instructions. How helpful is it for a learner to be able to transition between them, via e.g. keystroke or mouseclick? 

And do these transitions already occur, semi-consciously, via the learner's ocular focus? Can they be measured by eye-tracking, with e.g. heat-maps or gaze-plots?

When I can afford grad school (_...again!_), I hope to find out.
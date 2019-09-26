# Stuff You Could Do Right Now 

## Read a thing; build a thing

### First: RoR Toy App

1. RoR PWA to shoot you a daily quote from _Other People's Lines._
    * Major goal: familiarize w/ webpacker-in-rails, and PWA's / lighthouse audits.
    * _In the below, write notes for each action you take, focusing especially on..._ 
        1. _your decision-making process,_ 
        1. _articles/books that you reference, and_ 
        1. _unexpected issues you encounter._
    * upgrade brew
    * upgrade postgres
    * upgrade rvm
    * upgrade ruby
    * upgrade nvm
    * upgrade node
    * upgrade yarn
    * https://edgeguides.rubyonrails.org/active_record_postgresql.html#uuid-primary-keys (except make the `enable_extension` its own, first, migration)
    * rails g migration CreateAuthors name:string
    * rails g migration CreateQuote passage:string author:references
    * rails g scaffold Authors
    * rails g scaffold Quotes
        * dependent destroy for relationship
    * https://gist.github.com/arjunvenkat/1115bc41bf395a162084
        * pull in both csv's
        * for author csv, just add each name to new record;
        * for quote csv, lookup author by name, then grab id and write to author_id 
    * add a counter-cache for quotes, on the authors model (see notes in GoRails basics); 
        * when you delete a quote, 
        * check if the author's counter cache is 0; 
        * if so, delete the author
    * PWA research
        * https://johnbeatty.co/2019/01/08/easy-pwas-the-rails-way/
        * https://www.youtube.com/watch?v=JOcs__ofsps
        * https://rossta.net/blog/make-your-rails-app-a-progressive-web-app.html 
        * https://keithpblog.org/post/rails-5-progressive-web-app/
    * Pre-fetch/pre-load for links at the bottom of the page (i.e. admin page)?
    * after MVP:
        * devise to require login
        * pundit to create 'admin' and 'user' policies
            * admin can CRUD quotes
            * admin can RUD users
            * users can R quotes
            * (optional) users can suggest quotes (add to 'suggestion' table; if admin approves, add to 'quotes' table)
        * Randomized associated images (parse quote to grab nouns/verbs; use ddg image search; grab associated image; copy it to the ) 

### Next: RN Toy App

1. Read _Learning React Native_ (O'Reilly)

1. Ruby chapter in _Json At Work_ (O'Reilly)

1. Watch React Native series [from GoRails](https://gorails.com/episodes/tagged/React%20Native)

1. RoR JSON API / React Native app to 
    * perform the equivalent of an Anki deck of cognitive biases/logical fallacies (just scrape Wikipedia for content); or
    * serve as a [decision journal](https://fs.blog/2014/02/decision-journal/)

### Next: O'Reilly Cookbook Reprocessing

1. [The Linux Command Line](http://linuxcommand.org/tlcl.php) (No Starch)

1. _Explore how to turn (the process of reading a_ '`* Cookbook`' _O'Reilly text, after having engaged in a basic primer in the technology) into more of an interactive, problem-solving activity_
    * Possibly, for each, build a https://lab.github.com/ course?
    * Possibly using principle of "progressive disclosure" of hints, as requested by user (e.g. first click on card gives you desc of line of code in EN, next lists obj, next lists method, next lists argument?)

1. Bash Cookbook (O'Reilly)

1. SQL Cookbook (O'Reilly)

1. Javascript Cookbook (O'Reilly)

1. CSS Cookbook (O'Reilly)

1. Regex Cookbook (O'Reilly)

1. `${Add projects from "Next Steps" section of 'Revisiting' and 'Ideas' files}`

### Next: hashtag #gitgud at [Ruby, or anything else you've got O'Reilly books for]

1. [Well-Grounded Rubyist](https://www.manning.com/books/the-well-grounded-rubyist-third-edition)

1. [Crafting Rails 4 Applications](https://pragprog.com/book/jvrails2/crafting-rails-4-applications)

1. [Rails 5 Test Prescriptions](https://pragprog.com/book/nrtest3/rails-5-test-prescriptions)

1. [Ruby Performance Optimization](https://pragprog.com/book/adrpo/ruby-performance-optimization)

---

## Reread the notes; respond or reflect 

### Non-technical revisitations

1. Crash Course Computer Science [ ] `**<===Current===**`
1. How Language Began [ ]
1. Crash Course Study Skills [ ]
1. Through the Language Glass [ ]
1. Words and Rules [ ]
1. How We Learn [ ]
1. Write comparison of different sources of OER: (_yes, you'll need to build a rubric/taxonomy of some sort_)
    - [OpenStax](https://openstax.org/about&sa=D&ust=1543096216913000) at Rice University
    - [Open Textbook Library](http://open.umn.edu/opentextbooks/About.aspx&sa=D&ust=1543096216913000) (and network) at University of Minnesota
    - [OpenEd](https://open.bccampus.ca/find-open-textbooks/&sa=D&ust=1543096216914000) at BCcampus (a support org for British Columbia schools)
    - [Lumen Learning](https://lumenlearning.com/courses?&sa=D&ust=1543096216914000) (a for-profit company that uses OER to sell integrated learning analytics software)
    - The [Open Ed Consortium](https://www.oeconsortium.org/about-oec/&sa=D&ust=1543096216915000) (global nonprofit) and [MERLOT](http://info.merlot.org/merlothelp/topic.htm%23t%3DWho_We_Are.htm&sa=D&ust=1543096216915000) (originally CSU, but now partnered with OEC?) also provide search tools (do they host/support any objects of their own, though?)
    - [Open Washington](http://www.openwa.org/&sa=D&ust=1543096216916000) has an short, introductory course on OER use and licenses.
    - [Creative Commons](https://creativecommons.org/about/program-areas/education-oer/education-oer-resources/&sa=D&ust=1543096216917000) has a list of search tools.
1. E-Learning Rubrics
    - comparing and searching for different rubrics by which to measure an e-learning product:
    - concluding with that you can’t actually write about the product, because they are clients of the company that employs you
    - Rate the learning experience of the badge course you’re currently taking
        - Suitably anonymize it, first, per blogpost above
        - Better done when you can compare two programs (perhaps the Linux/Docker course?)
        - Which taxonomy to use?
            - “E-learning in the science of instruction”?
            - “Really Useful E-Learning Manual“ from O'Reilly (perhaps there’s an EPub version?)

### FEM revisitations

1. Full-Stack for Frontends 01 [ ]
1. Full-Stack for Frontends 02 [ ]

1. (_non-FEM_) Beautiful JavaScript [ ]
1. (_non-FEM_) Learning Javascript [ ]

1. JavaScript: The Hard (and New Hard) Parts [ ]
1. Deep JavaScript Fundamentals [ ]
1. JavaScript: The Recent Parts [ ]
1. Digging into Node [ ]
1. Service Workers [ ]

1. Introduction to Gatsby [ ]

1. Design for Developers [ ]
1. Advanced CSS Layouts [ ]

### Other Revisitations

1. Business and Management Book Summaries [ ]
1. Prototype to Product [ ]
1. Hello, Startup [ ]
1. Ed Meetup and Event Notes [ ]
1. Tech Meetup and Event Notes [ ]

## Ideas

1. **Idea:** GUI for content professors (_i.e. experts in research, but not pedagogy_) to build lessons, guided by sound teaching principles and pleasing design.
   - (_Note you have two reaaaaaal ugly back-of-the-napkin wireframe illustrations for this in Dropbox._)
   - Sold to universities: align with institution-unique accreditation requirements.
     - Software that takes an instructor from subject matter expert tune near-professional educator, by scaffolding their building of lesson plans, assessments, and syllabi.
     - “Valuable subjects change so quickly in this field (tech); this software works with an expert in that field to create a replicable, distributable, project/portfolio-based curriculum,  so you can offer courses that will get your graduates jobs.”
   - How to make lesson planning easier, faster, more certain?
   - Help teachers defend decisions with research (i.e. engage with and protect against parents & admin)
   - UI for [content and activity] selection (for touchscreen access)
   - Track [content and activity]-types across lessons (by week, unit, semester etc)

1. **Idea:** SMS-based daily speaking prompts (_for APAC white-collar EFL learners_).
   - Delivered by voice recording + optional supplementary text,
   - using push notifications/email.
   - Prompt contains topic;
   - user records impromptu speech;
   - human listener (cheap \$ in EastEur) uses SR-form to
     - write/send targeted feedback, and
     - select links for user to engage in controlled practice.
   - Variations:
     - every other day is VoIP role-play;
     - two chances to record: once w/o prep, at beginning of day, and once after receiving 5-10 potentially-useful vocabulary words.

1. **Idea:** Use noun project API to create "conversation starters" for video sessions (_e.g. speakers tell a story based on randomly-generated pics._) Options:
   - timed/untimed
   - number of images (either choose one from three, or must integrate entire set into story?)
   - Image categories
   - Bring in various Faker-generated sentences as prompts (use e.g. quotes Classes, rather than single-word entries) https://github.com/stympy/faker
   - [plenty](https://thenounproject.com/browse/) [such](https://gallery.manypixels.co/) [sources](https://www.ikonate.com/) for grabbing image-prompts, too

1. **Idea:** "Corona"
    - tool for retros && retro commentary/weigh-in (plus one's, comments, concerns, qualifications, etc)
    - web form, with support from slackbot
    - like, "Corona" refers to part of the eye -- but it also sounds like "Coroner," who performs... post-mortems. Heh.

1. **Idea:** "ThousandWord"
    - Repository for collected PF01 images
    - On top of a PG database?
    - Use as practice w/ Redis/ElasticSearch/any search-or-filter-heavy stack 

---

## Done

1. _Apps and Ideas Heap #2_ [ x ]
1. _Computational Thinking Research (for Code Kitty)_ [ x ]
1. _Apps and Ideas Heap #20_ [ x ]
1. _`daily_ua` notes_ [ x ]
1. _Ruby Developer Questions_ [ x ]
1. _Learn Ruby_ [ x ]
1. ~~Apps and Ideas Heap #6 [ covered in other SRS notes eg #8 ]~~
1. ~~Apps and Ideas Heap #16 [ impractical ]~~
1. _How The Brain Learns_ [ x ]
1. _Apps and Ideas Heap #19_ [ x ]
1. _Learning React_ [ x ]
1. _React Quickly_ [ x ]
1. _Advanced React Patterns_ [ x ]
1. ~~Apps and Ideas Heap #17 [ meh idea ]~~
1. _Apps and Ideas Heap #5_ [ x ]
1. ~~Data Structures and Algorithms [ see OOJ revisit ]~~
1. ~~JS Data Structures and Algorithms [ see OOJ revisit ]~~
1. _Object-Oriented JavaScript_ [ x ]
1. ~~Apps and Ideas Heap #9 [ meh idea ]~~
1. ~~Go Figure The Economist Explains [ fun read; no need for revisit ]~~
1. ~~The Horologicon [ fun read; no need for revisit ]~~
1. _Improving Adult Literacy Instruction_ [ x ]
1. ~~Apps and Ideas Heap #13 [ see #19 ]~~
1. ~~Apps and Ideas Heap #7 [ meh idea ]~~
1. NYT's Book of Language and Linguistics [ x ]
1. Apps and Ideas Heap #18 [ x ]
1. Apps and Ideas Heap #8 [ x ]
1. Apps and Ideas Heap #15 [ identical to #17 ]
1. ~~Educause's 7 Things You Should Know [ not a ton of content; kept OER-links list]~~
1. Zero to One [ x ]
1. ~~ABE phonics app reimplementation: what would you do differently? [ begun; not very insight-provoking; discarded]~~

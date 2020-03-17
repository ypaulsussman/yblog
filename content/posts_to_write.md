## 1. Read a thing; build a thing

### Whatever Is The Next Step

#### Set up API-mode Rails
  - Begin with Ruby chapter in _Json At Work_ (O'Reilly) to provide data.
  <!-- You are here! -->
  - Ankify the [official guide](https://guides.rubyonrails.org/api_app.html) on Rails API usage
  - [Get Up and Running with Rails API](https://chriskottom.com/blog/2017/02/get-up-and-running-with-rails-api/)
  - Either [APIs on Rails](http://apionrails.icalialabs.com/book/chapter_one) or [its newer, less-formatted version](https://github.com/madeindjs/api_on_rails), though not as cleanly-formatted
  - Use the [Netflix gem](https://github.com/Netflix/fast_jsonapi) for serialization
  - Confirm which of below (or third option?) is necessary:
  ```bash
  rails new latticene --api --database postgresql
  # or
  rails new latticene --api --database postgresql --skip-action-mailbox --skip-action-text --skip-active-storage --skip-action-cable --skip-sprockets --skip-javascript --skip-turbolinks --skip-system-test --skip-webpack-install
  ```

#### Set up React SPA frontend
- Research `create-react-app` -- current best-practices? common flags?
- `react-router` -- start with v6?

- Use this for the graph-view: https://github.com/vasturiano/react-force-graph

- Reference these for learning hooks, context, and suspense:
  - Maybe start with [this video](https://www.youtube.com/watch?v=Fuz8GTctT5o)?
  - [This article](https://www.robinwieruch.de/react-state) for creating global state with hooks and context, instead of redux.
  - If you like the above article, use this [two-part](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext) [series](https://www.robinwieruch.de/redux-with-react-hooks) to ~replicate Redux (_same author_)
  - [This article](https://wattenberger.com/blog/react-hooks) for more on using hooks naturally
  - [And this](https://www.telerik.com/kendo-react-ui/react-hooks-guide/)
  - [This article](https://www.smashingmagazine.com/2020/0-introduction-react-context-api/) for more on context
  - [This article](https://css-tricks.com/the-hooks-of-react-router/) for how hooks interact with React Router
  - Follow the FEM Pure React State Management workshop/notes, as well
  - https://kentcdodds.com/blog/useeffect-vs-uselayouteffect and https://kentcdodds.com/blog/should-i-usestate-or-usereducer
  - https://alligator.io/react/keep-react-fast/

- Also include TypeScript? Or is that too much?
  - Use Credly's Egghead.io subscription for intros?
  - [Follow the config setup here](https://www.sitepoint.com/react-with-typescript-best-practices/)
  - [Explore some of the (non-redux?) boilerplate here](https://typeofnan.dev/setup-a-typescript-react-redux-project/)
- Here's [a good list](https://www.robinwieruch.de/react-libraries) of other convenience libraries to use
- Use your notes from the FEM course to apply responsive HTML styles

#### Side Quests
- Intersperse with ankifying these:
  - Digging Deeper
    - Testing Rails Applications
    - Debugging Rails Applications
    - Securing Rails Applications
    - Configuring Rails Applications
    - Caching with Rails: An Overview
    - Working with JavaScript in Rails
  - WIPs
    - Action View Overview
    - Active Model Basics
    - Active Record and PostgreSQL
    - The Rails Initialization Process
    - Active Support Instrumentation
- Intersperse with watching these:
  - DevOps:
    - [Packaging and Shipping Rails Applications in Docker](https://www.youtube.com/watch?v=lpHgNC5bCbo)
    - [Real World Docker for the Rubyist](https://www.youtube.com/watch?v=DyBvMrNX1ZY)
    - [Deep Dive into Docker Containers](https://www.youtube.com/watch?v=2c4fvXKec7Q)
    - [Containerizing Rails: Techniques, Pitfalls, & Best Practices](https://www.youtube.com/watch?v=kG2vxYn547E)
    - [Containerizing Local Development... Is It Worth it?](https://www.youtube.com/watch?v=NZ02hy6QOOk)
  - Security:
    - [Warden: the building block behind Devise](https://www.youtube.com/watch?v=QBJ3G40fxHg)
    - [The Evolution of Rails Security](https://www.youtube.com/watch?v=Btrmc1wO3pc)
    - [Access Denied: the missing guide to authorization in Rails](https://www.youtube.com/watch?v=NVwx0DARDis)
    - [Encrypted Credentials in Rails 5.2](https://www.youtube.com/watch?v=fS92ZDfLhng)
    - [Rails Security at Scale](https://www.youtube.com/watch?v=MpsrQKieytY)
    - [Modern Cryptography for the Absolute Beginner](https://www.youtube.com/watch?v=-cqD_SVXyEo)
  - DB and Other:
    - [Database Design for Beginners](https://www.youtube.com/watch?v=1VsSXRPEBo0)
    - [Optimizing Your App by Understanding PostgreSQL](https://www.youtube.com/watch?v=vfiz1J8mWEs)
    - [Minitest 6: test feistier!](https://www.youtube.com/watch?v=l-ZNxvFo4lw)
    - [Unraveling the Cable: How ActionCable works](https://www.youtube.com/watch?v=XeqLONJsHkY)
    - [NLP for Rubyists](https://www.youtube.com/watch?v=Mmn20irnaS8)
    - [Zeitwerk: A New Code Loader](https://www.youtube.com/watch?v=ulCBLpCU6aY)

### Next: (Maybe?) RN App

- Watch React Native series [from GoRails](https://gorails.com/episodes/tagged/React%20Native)
- Watch RailsConf talk on [React Native & Rails](https://www.youtube.com/watch?v=Q66tYU6ni48)
- Read _Learning React Native_ (O'Reilly)
- Create RoR JSON API / React Native app to either...
  - perform the equivalent of an Anki deck of cognitive biases/logical fallacies, via e.g. 
    - https://en.wikipedia.org/wiki/List_of_cognitive_biases
    - https://en.wikipedia.org/wiki/List_of_memory_biases
    - https://en.wikipedia.org/wiki/List_of_fallacies
  - Alternatively, serve as a [decision journal](https://fs.blog/20-/02/decision-journal/)

### Next: O'Reilly Cookbook Reprocessing

- Explore how to turn (_the process of reading a_ '`* Cookbook`' _O'Reilly text, after having engaged in a basic primer in the technology_) into more of an interactive, problem-solving activity
  - Possibly, for each, build a https://lab.github.com/ course?
  - Possibly using principle of "progressive disclosure" of hints, as requested by user (e.g. first click on card gives you desc of line of code in EN, next lists obj, next lists method, next lists argument?)
  - Explore these:
    - Bash Cookbook (O'Reilly)
    - SQL Cookbook (O'Reilly)
    - Javascript Cookbook (O'Reilly)
    - CSS Cookbook (O'Reilly)
    - Regex Cookbook (O'Reilly)

### Next: hashtag #gitgud at [Ruby, or anything else you've got O'Reilly books for]

- [High Performance Browser Networking](https://hpbn.co/)

- [The Rails 5 Way](https://www.oreilly.com/library/view/the-rails-5/9780-465769-)

- [The Ruby Way](https://www.oreilly.com/library/view/the-ruby-way/9780-2480352/)

- [Effective Ruby](https://www.oreilly.com/library/view/effective-ruby-48/9780-3847086/)

- [Well-Grounded Rubyist](https://www.manning.com/books/the-well-grounded-rubyist-third-edition)

- [Rails 5 Test Prescriptions](https://pragprog.com/book/nrtest3/rails-5-test-prescriptions)

- [Ruby Performance Optimization](https://pragprog.com/book/adrpo/ruby-performance-optimization)

- [Crafting Rails 4 Applications](https://pragprog.com/book/jvrails2/crafting-rails-4-applications)

## 2. Reread the notes; respond or reflect

### Non-technical revisitations

- Crash Course Computer Science [ ] `**<===Current===**`
- How Language Began [ ]
- Crash Course Study Skills [ ]
- Through the Language Glass [ ]
- Words and Rules [ ]
- How We Learn [ ]
- Write comparison of different sources of OER: (_yes, you'll need to build a rubric/taxonomy of some sort_)
  - [OpenStax](https://openstax.org/about&sa=D&ust=-430962-9-000) at Rice University
  - [Open Textbook Library](http://open.umn.edu/opentextbooks/About.aspx&sa=D&ust=-430962-9-000) (and network) at University of Minnesota
  - [OpenEd](https://open.bccampus.ca/find-open-textbooks/&sa=D&ust=-430962-9-000) at BCcampus (a support org for British Columbia schools)
  - [Lumen Learning](https://lumenlearning.com/courses?&sa=D&ust=-430962-9-000) (a for-profit company that uses OER to sell integrated learning analytics software)
  - The [Open Ed Consortium](https://www.oeconsortium.org/about-oec/&sa=D&ust=-430962-9-000) (global nonprofit) and [MERLOT](http://info.merlot.org/merlothelp/topic.htm%23t%3DWho_We_Are.htm&sa=D&ust=-430962-9-000) (originally CSU, but now partnered with OEC?) also provide search tools (do they host/support any objects of their own, though?)
  - [Open Washington](http://www.openwa.org/&sa=D&ust=-430962-9-000) has an short, introductory course on OER use and licenses.
  - [Creative Commons](https://creativecommons.org/about/program-areas/education-oer/education-oer-resources/&sa=D&ust=-430962-9-000) has a list of search tools.
- E-Learning Rubrics
  - comparing and searching for different rubrics by which to measure an e-learning product:
  - concluding with that you can’t actually write about the product, because they are clients of the company that employs you
  - Rate the learning experience of the badge course you’re currently taking
    - Suitably anonymize it, first, per blogpost above
    - Better done when you can compare two programs (perhaps the Linux/Docker course?)
    - Which taxonomy to use?
      - “E-learning in the science of instruction”?
      - “Really Useful E-Learning Manual“ from O'Reilly (perhaps there’s an EPub version?)
- Expanding _what_ we know [vs] _applying_ what we (already) know
  - [how to do one of those better] is what to research, for PhD?
  - Peruse these journals:
    - International Journal of Instructional Technology and Distance Learning
    - Journal of Training, Design, and Technology
    - Journal of Multimedia Processing and Technologies
    - Educational Technology Research and Development
    - Journal of Computing in Higher Education
    - Trends in Cognitive Sciences

### FEM revisitations

- Full-Stack for Frontends 01[ ]
- Full-Stack for Frontends 02 [ ]

- (_non-FEM_) Beautiful JavaScript [ ]
- (_non-FEM_) Learning Javascript [ ]
- JavaScript: The Hard (and New Hard) Parts [ ]
- Deep JavaScript Fundamentals [ ]
- JavaScript: The Recent Parts [ ]
- Digging into Node [ ]
- Service Workers [ ]

- Pure React State Management [ ]
- Introduction to Gatsby [ ]

- Design for Developers [ ]
- Advanced CSS Layouts [ ]
- HTML Emails [ ]

### Other Revisitations

- Business and Management Book Summaries [ ]
- Prototype to Product [ ]
- Hello, Startup [ ]
- Ed Meetup and Event Notes [ ]
- Tech Meetup and Event Notes [ ]
- GoRails Notes [ ]
- Foundations of PostgreSQL Admin Notes [ ]
- (_First take notes on_) ["The Missing CS Course"](https://missing.csail.mit.edu/)

## 3. More-serious software ideas

### Lectio 

- GUI for content professors (_i.e. experts in research, but not pedagogy_) to build lessons, guided by sound teaching principles and pleasing design.
- Sold to universities: align with institution-unique accreditation requirements.
  - Software that takes an instructor from subject matter expert tune near-professional educator, by scaffolding their building of lesson plans, assessments, and syllabi.
  - “Valuable subjects change so quickly in this field (tech); this software works with an expert in that field to create a replicable, distributable, project/portfolio-based curriculum, so you can offer courses that will get your graduates jobs.”
- How to make lesson planning easier, faster, more certain?
- Help teachers defend decisions with research (i.e. engage with and protect against parents & admin)
- UI for [content and activity] selection (for touchscreen access)
- Track [content and activity]-types across lessons (by week, unit, semester etc)
- (_Note you have two reaaaaaal ugly back-of-the-napkin wireframe illustrations for this in Dropbox._)

### Corona

- tool for retros && retro commentary/weigh-in (plus one's, comments, concerns, qualifications, etc)
- web form, with support from slackbot
- like, "Corona" refers to part of the eye -- but it also sounds like "Coroner," who performs... post-mortems. Heh.

### CardBuilder

- The grammarly for SRS cardbuilding
- Declarative/content knowledge: SRS
- Explicit procedural knowledge: checklist
- Implicit procedural knowledge: practice
- As concurrent proof-of-concept: use it to Ankify grad school notes

### MeatLess

- Track [for "get to 0" / for saving up, via $ or C02 offset, to splurge on a _noice_ meaty meal e.g. -/wk]
- Track [for low-carb / for low-cost]

### B2E

- Designed for post-DuoLingo language learners
  - Name is a silly pun: "We want to get to B2," but also "not B2B or B2C; rather, B2-my-people/B-2-we"
- Combine 'SRS lexis-extractor' with daily-generated cards
- Pairs of learners receive a quote daily, in alternating language
  - Monday...
    - U/US translates from EN to UA;
    - U/UA translates from EN to UA; then
    - (_discuss, or U/UA merely highlights reasons for?_) differences between the two translations.
  - Tuesday, it switches: learners receive UA quote; now, U/US explains their translation decisions
- Can this resolve the (_disparity/overpopularity of EN-learners_), via e.g. aggregator for daily translations?
  - In -to-many groups, provide translation leaderboard, visible only after submission-of-your-translation?
  - Will require translation-flagging, as well as perhaps e.g. Lobte.rs-style invite-tree

### DMWare

- Scenario Builder
  - See OG blogpost
- Party Party Builder
  - D&D character(s) generator
  - Stream the randomly-generated characters w/ e.g. `ActionController::Live`
  - Include `ActionCable` so everyone can chat about the characters being generated
- ThousandWord
  - Repository for collected PF0-images
  - Use as practice w/ ElasticSearch

### YPHRIT

- "_Y's Post-Hartl Rails-Investigation Tutorial_"
- For any one of the above ideas, build it alongside a book about _how_ to build it.

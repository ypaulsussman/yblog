# Stuff To Do

## Project: Daily gratitude recorder 
  - RN app; push notification (banner, then sound) in evening w/ popup <textarea>
  - nodejs backend
    - encryption at rest
    - 12 emails (weekly) re: usage of app; after, 90 days prior's message to (ProtonMail) inbox 

## Project: DMWare
- `thousandWord`
  - Docker Compose: follow DO's Nginx/Certbot/Node setup
  - Use PostgreSQL:
    - https://jessitron.com/2020/05/25/develop-in-docker-node-js-express-postgresql-on-heroku/
    - https://medium.com/better-programming/containerize-node-react-postgres-with-docker-on-aws-ca548595f01e
    - Other PostgreSQL `docker-compose.yml` integrations:
      ```yaml
      <!-- Rails -->
      version: '3'
      services:
        db:
          image: postgres
          volumes:
            - ./tmp/db:/var/lib/postgresql/data
          environment:
            POSTGRES_PASSWORD: password
        web:
          build: .
          command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
          volumes:
            - .:/myapp
          ports:
            - "3000:3000"
          depends_on:
            - db
      <!-- Django -->
      version: "3.8"   
      services:
        db:
          image: postgres
          environment:
            - POSTGRES_DB=postgres
            - POSTGRES_USER=postgres
            - POSTGRES_PASSWORD=postgres
        web:
          build: .
          command: python manage.py runserver 0.0.0.0:8000
          volumes:
            - .:/code
          ports:
            - "8000:8000"
          depends_on:
            - db
      ```
  - Adopt auth (JWT or Local):
    - https://reallifeprogramming.com/node-authentication-with-passport-postgres-ef93e2d520e7
    - https://github.com/kisha/authentication-passport-jwt-strategy-postgresql
    - https://medium.com/queers-in-tech/server-side-json-web-token-implementation-with-postgresql-and-node-7278eb9dc1b2
  - Use array of pg text for tags
    - https://tapoueh.org/blog/2013/10/denormalizing-tags/
    - https://tapoueh.org/blog/2018/04/postgresql-data-types-arrays/
    - http://www.databasesoup.com/2015/01/tag-all-things.html
    - https://stackoverflow.com/questions/39643454/postgres-check-if-array-field-contains-value/54069718#54069718
      - Alts/Backups: http://howto.philippkeller.com/2005/04/24/Tags-Database-schemas/
  - Use HCLib books (and the docs) for Express best practices  
  - Add React support:
    - https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
    - https://scotch.io/tutorials/build-a-blog-using-expressjs-and-react-in-30-minutes#toc-add-authentication-in-express
    - https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
    - If necessary, decouple: 
      - https://www.digitalocean.com/docs/app-platform/languages-frameworks/react/
    - Image handling:
      - https://github.com/fengyuanchen/cropperjs
      - https://www.thepolyglotdeveloper.com/2020/02/scale-crop-zoom-images-react-web-application/
      - https://github.com/react-cropper/react-cropper
      - https://codesandbox.io/s/wonderful-pine-i7fs3?file=/src/Demo.tsx
- `embarcator`
  - node
    - setup
      - https://www.digitalocean.com/community/tutorial_series/how-to-code-in-node-js
      - https://www.robinwieruch.de/javascript-project-setup-tutorial/
      - https://www.robinwieruch.de/minimal-node-js-babel-setup
      - https://www.taniarascia.com/how-to-use-webpack/
    - express
      - https://www.robinwieruch.de/node-js-express-tutorial
      - https://www.robinwieruch.de/node-express-server-rest-api
      - https://www.robinwieruch.de/postgresql-express-node-rest-api
      - https://www.robinwieruch.de/node-express-error-handling
    - testing
      - https://www.robinwieruch.de/node-js-jest
      - https://www.robinwieruch.de/javascript-continuous-integration
    - with docker
      - https://www.robinwieruch.de/docker-node-js-development
      - https://www.robinwieruch.de/docker-compose
      - https://www.robinwieruch.de/docker-cheatsheet
  - react
    - setup:
      - https://www.robinwieruch.de/javascript-project-setup-tutorial/
      - https://www.robinwieruch.de/webpack-setup-tutorial/
      - https://www.robinwieruch.de/webpack-babel-setup-tutorial/
      - https://www.robinwieruch.de/react-css-modules
      - https://www.robinwieruch.de/webpack-font
      - https://www.robinwieruch.de/webpack-images
      - https://www.robinwieruch.de/webpack-eslint
      - https://www.robinwieruch.de/react-eslint-webpack-babel
      - https://www.robinwieruch.de/prettier-eslint
      - https://www.robinwieruch.de/webpack-advanced-setup-tutorial
      - https://www.robinwieruch.de/react-folder-structure
      - https://www.robinwieruch.de/react-libraries
    - hooks:
      - https://reactjs.org/docs/hooks-intro.html
      - https://www.robinwieruch.de/react-hooks
      - https://www.robinwieruch.de/react-hooks-fetch-data
      - https://www.robinwieruch.de/react-ref
      - https://www.robinwieruch.de/react-state
      - https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext
      - https://www.robinwieruch.de/react-usestate-hook
      - https://www.robinwieruch.de/react-usestate-callback
      - https://www.robinwieruch.de/react-usecontext-hook
      - https://www.robinwieruch.de/redux-vs-usereducer
    - testing:
      - https://www.robinwieruch.de/react-testing-library
      - https://www.robinwieruch.de/react-testing-cypress
      - https://www.robinwieruch.de/axios-jest
    - other notes:
      - mouseover <area> tags -- add gray overlay; also: button to display all tags
      - add city map & quiz

## Project: Zō
- The grammarly for SRS cardbuilding
- Declarative/content knowledge: SRS
- Explicit procedural knowledge: checklist
- Implicit procedural knowledge: practice
- As concurrent proof-of-concept: use it to Ankify grad school notes
- For coding projects: add a git commit-hook to send [the diff, and-or the commit message?] to a text-dump that the user will later be notified to reference for content to be mined/added to the SRS.

## Project: B2E
- Designed for post-DuoLingo language learners
  - Name is a silly pun: "We want to get to B2," but also "not B2B or B2C; rather, B2-everyone/B-2-we"
- Combine 'SRS lexis-extractor' with daily-generated cards
  - PocketBrain -- friendly/external name for SRS component
- Pairs of learners receive a quote daily, in alternating language
  - Monday...
    - U/US translates from EN to UA;
    - U/UA translates from EN to UA; then
    - (_discuss, or U/UA merely highlights reasons for?_) differences between the two translations.
  - Tuesday, it switches: learners receive UA quote; now, U/US explains their translation decisions
- Can this resolve the (_disparity/overpopularity of EN-learners_), via e.g. aggregator for daily translations?
  - In -to-many groups, provide translation leaderboard, visible only after submission-of-your-translation?
  - Will require translation-flagging, as well as perhaps e.g. Lobte.rs-style invite-tree

## Archive/Soft-Deletes

<!-- ## Project: O'Reilly Cookbook Reprocessing
- Explore how to turn "reading a '`* Cookbook`' O'Reilly text" into more of an interactive, problem-solving activity.
- Possibly using principle of "progressive disclosure" of hints, as requested by user (e.g. first click on card gives you desc of line of code in EN, next lists obj, next lists method, next lists argument?)
- combination of two apps:
  - `cookbook_kata`
    - emails two recipes, daily (first FE: CSS and JS, then Server: Bash and SQL)
    - If a recipe seems useful, allows you to forward it to `brick_collector`
  - `brick_collector`
    - a [https://notes.zander.wtf/, https://github.com/jbranchaud/til]-esque clippings site
    - each TIL/snippet page has a button, which onClick... 
      - increments count of times you've used the snippet
      - allows you to also add which repo/code you used the snippet in
      - automatically collects the date
    - link to 'usages', a mini-dashboard of that snippet's usages (the data saved from the clicker) -->

<!-- ## Project: evictual
- Track [for "get to 0" / for saving up, via $ or C02 offset, to splurge on a _noice_ meaty meal e.g. -/wk]
- Track [for low-carb / for low-cost / for low-C02s] -->
  
<!-- ## Project: ProductiveHN
- Consume HN API
- Desktop-only
- Tree views of top-level comments, with the ability to filter top-level comments having fewer responses
- Ability to click a given comment to have its responses also splinter into different nodes
- Ability to click a keyword to search hn.algolia.com for similar posts -->
  
<!-- ## Research: Ruby Sidequests
- Lectures
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
- Books
  - Rails
    - [The Rails 5 Way](https://www.oreilly.com/library/view/the-rails-5/9780-465769-)
    - [Rails 5 Test Prescriptions](https://pragprog.com/book/nrtest3/rails-5-test-prescriptions)
    - [AWS: The Good Parts](https://gumroad.com/l/aws-good-parts)
  - Ruby
    - [Well-Grounded Rubyist](https://www.manning.com/books/the-well-grounded-rubyist-third-edition)
    - [Confident Ruby](http://www.confidentruby.com/)
    - [Practical Object Oriented Design in Ruby](https://www.informit.com/store/practical-object-oriented-design-an-agile-primer-using-9780134456478)
  - Possibly
    - [Ruby Performance Optimization](https://pragprog.com/book/adrpo/ruby-performance-optimization)
    - [Crafting Rails 4 Applications](https://pragprog.com/book/jvrails2/crafting-rails-4-applications)
    - [The Ruby Way](https://www.oreilly.com/library/view/the-ruby-way/9780-2480352/)
    - [Effective Ruby](https://www.oreilly.com/library/view/effective-ruby-48/9780-3847086/)
  
<!-- ## Research: Expanding _what_ we know [vs] _applying_ what we (already) know
  - [how to do one of those better] is what to research, for PhD?
  - Peruse these journals:
    - International Journal of Instructional Technology and Distance Learning
    - Journal of Training, Design, and Technology
    - Journal of Multimedia Processing and Technologies
    - Educational Technology Research and Development
    - Journal of Computing in Higher Education
    - Trends in Cognitive Sciences -->

<!-- ## Project: Eno 
- GUI for content professors (_i.e. experts in research, but not pedagogy_) to build lessons, guided by sound teaching principles and pleasing design.
- Sold to universities: align with institution-unique accreditation requirements.
  - Software that takes an instructor from subject matter expert tune near-professional educator, by scaffolding their building of lesson plans, assessments, and syllabi.
  - “Valuable subjects change so quickly in this field (tech); this software works with an expert in that field to create a replicable, distributable, project/portfolio-based curriculum, so you can offer courses that will get your graduates jobs.”
- How to make lesson planning easier, faster, more certain?
- Help teachers defend decisions with research (i.e. engage with and protect against parents & admin)
- UI for [content and activity] selection (for touchscreen access)
- Track [content and activity]-types across lessons (by week, unit, semester etc)
- (_Note you have two reaaaaaal ugly back-of-the-napkin wireframe illustrations for this in Dropbox._) -->

<!-- ## Project: YPHRIT
- "_Y's Post-Hartl Rails-Investigation Tutorial_"
- For any one neighboring idea, build it alongside a book about _how_ to build it. -->

<!-- ## Project: Compare E-Learning Rubrics
- comparing and searching for different rubrics by which to measure an e-learning product:
- concluding with that you can’t actually write about the product, because they are clients of the company that employs you
- Rate the learning experience of the badge course you’re currently taking
  - Suitably anonymize it, first, per blogpost above
  - Better done when you can compare two programs (perhaps the Linux/Docker course?)
  - Which taxonomy to use?
    - “E-learning in the science of instruction”?
    - “Really Useful E-Learning Manual“ from O'Reilly (perhaps there’s an EPub version?) -->

<!-- ## Project: "yarra" (new `enumerable`-based methods && gem-building practice)
  - Use
    - https://bundler.io/v1.16/guides/creating_gem.html
    - https://guides.rubygems.org/
    - https://piotrmurach.com/articles/writing-a-ruby-gem-specification/
    - https://github.com/flajann2/juwelier
  - Preexisting
    - find => detect
    - filter => select
    - N/A => reject
    - map => collect
    - reduce => inject
  - Yours to implement
    - ? => affect
    - ? => bisect
    - ? => connect
    - ? => correct
    - ? => defect
    - ? => deflect
    - ? => eject
    - ? => elect
    - ? => infect
    - ? => neglect
    - ? => perfect (apply changes, then freeze)
    - ? => project
    - ? => prospect (try/catch; return first item that gens the error)
    - ? => protect
    - ? => suspect
    - ? => subject
    - ? => trisect -->

<!-- ## Project: MiaExplorer
### Set up Elasticsearch
- [Elasticsearch: The Definitive Guide](http://shop.oreilly.com/product/0636920028505.do)
- [Elasticsearch in Action](https://www.manning.com/books/elasticsearch-in-action)
- [Getting Started with Elasticsearch and Ruby](https://dev.to/molly_struve/getting-started-with-elasticsearch-and-ruby-30hh)
### Set up API-mode Rails
- Ankify the [official guide](https://guides.rubyonrails.org/api_app.html) on Rails API usage
- [Get Up and Running with Rails API](https://chriskottom.com/blog/2017/02/get-up-and-running-with-rails-api/)
- Either [APIs on Rails](http://apionrails.icalialabs.com/book/chapter_one) or [its newer, less-formatted version](https://github.com/madeindjs/api_on_rails), though not as cleanly-formatted
- Use the [Netflix gem](https://github.com/Netflix/fast_jsonapi) for serialization -->

<!-- ## Project: DMWare
- Scenario Builder
  - See OG blogpost
- Party Party Builder
  - D&D character(s) generator
  - Stream the randomly-generated characters w/ e.g. `ActionController::Live`
  - Include `ActionCable` so everyone can chat about the characters being generated
- ThousandWord
  - Repository for collected PF0-images
  - Use as practice w/ ElasticSearch?
- React SPA Frontend
  - Learn Hooks, Context, and Suspense API's:
    - Follow the FEM Pure React State Management workshop/notes
    - [This article](https://www.robinwieruch.de/react-state) for creating global state with hooks and context, instead of redux.
    - If you like the above article, use this [two-part](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext) [series](https://www.robinwieruch.de/redux-with-react-hooks) to ~replicate Redux (_same author_)
    - [This article](https://wattenberger.com/blog/react-hooks) for more on using hooks naturally
    - [And this](https://www.telerik.com/kendo-react-ui/react-hooks-guide/)
    - [This article](https://www.smashingmagazine.com/2020/0-introduction-react-context-api/) for more on context
    - [This article](https://css-tricks.com/the-hooks-of-react-router/) for how hooks interact with React Router
    - <https://kentcdodds.com/blog/useeffect-vs-uselayouteffect> and <https://kentcdodds.com/blog/should-i-usestate-or-usereducer>
    - <https://alligator.io/react/keep-react-fast/>
    - <https://alligator.io/react/react-router-v6/>
    - <https://alligator.io/react/crud-context-hooks/>
  - Include TypeScript? Or is that too much?
    - Use Credly's Egghead.io subscription for intros?
    - [Follow the config setup here](https://www.sitepoint.com/react-with-typescript-best-practices/)
    - [Explore some of the (non-redux?) boilerplate here](https://typeofnan.dev/setup-a-typescript-react-redux-project/)
  - Here's [a good list](https://www.robinwieruch.de/react-libraries) of other convenience libraries to use
  - Use your notes from the FEM course to apply responsive HTML styles -->

<!-- ## Project: OER Library Search Engine
- Use Elasticsearch?
- Libraries:
  - [OpenStax](https://openstax.org/about&sa=D&ust=-430962-9-000) at Rice University
  - [Open Textbook Library](http://open.umn.edu/opentextbooks/About.aspx&sa=D&ust=-430962-9-000) (and network) at University of Minnesota
  - [OpenEd](https://open.bccampus.ca/find-open-textbooks/&sa=D&ust=-430962-9-000) at BCcampus (a support org for British Columbia schools)
  - [Lumen Learning](https://lumenlearning.com/courses?&sa=D&ust=-430962-9-000) (a for-profit company that uses OER to sell integrated learning analytics software)
  - The [Open Ed Consortium](https://www.oeconsortium.org/about-oec/&sa=D&ust=-430962-9-000) (global nonprofit) and [MERLOT](http://info.merlot.org/merlothelp/topic.htm%23t%3DWho_We_Are.htm&sa=D&ust=-430962-9-000) (originally CSU, but now partnered with OEC?) also provide search tools (do they host/support any objects of their own, though?)
  - [Open Washington](http://www.openwa.org/&sa=D&ust=-430962-9-000) has an short, introductory course on OER use and licenses.
  - [Creative Commons](https://creativecommons.org/about/program-areas/education-oer/education-oer-resources/&sa=D&ust=-430962-9-000) has a list of search tools. -->

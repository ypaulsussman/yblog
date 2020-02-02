---
title: OPL Development History
date: "2020-02-01"
template: "post"
draft: true
slug: "/posts/opl-dev-history-notes/"
category: "What I Do"
tags:
  - "Rails"
description: "These are just the rough, rough, unedited records I made while building OPL over the winter of 2019-2020."
---

# RoR PWA to shoot you a daily quote from _Other People's Lines._

- Major goals: familiarize self with...
  - infrastructure of Rails-y auth,
  - autocompletes/`pg_search`/fuzzy-matching
  <!-- - PWA's / lighthouse audits, -->
  - webpacker-in-rails

---

## Set up the models (10.02)

- `$ rails new opl --database=postgres` (which again didn't work... update: you don't _actually_ want the `=` in between)
- `$ rails db:create`
- curse at (_then remove_) innocent, unwanted `sqlite3` files
- update `database.yml` and `Gemfile`
- `$ bundle install && yarn install` for good measure (though there's nothing yet in the latter, so it's pointless)
- Next steps from:
  - https://blog.arkency.com/2014/10/how-to-start-using-uuid-in-activerecord-with-postgresql/
  - https://edgeguides.rubyonrails.org/active_record_postgresql.html#uuid-primary-keys (except make the `enable_extension` its own, first, migration)
- `$ psql`
- `opl_development=# select - from pg_available_extensions;`
- `opl_development=# CREATE EXTENSION pgcrypto;`
- Follow [this post](http://fidalgo.pt/2017/10/11/uuids_in_rails_with_postgresql.html) to update the `Application` and `ApplicationRecord` classes
- `$ rails g model author name:string`
- `$ rails g model quote passage:string author:references`, then add `type: :uuid` to the latter so it doesn't default to assuming the foreign_key id is a `bigint`
- https://gist.github.com/arjunvenkat/1115bc41bf395a162084

  - pull in both csv's
  - for author csv, just add each name to new record;
  - for quote csv, lookup author by name, then grab id and write to author_id

- `dependent: :destroy` for author:quotes relationship
- `validates presence` for quotes' passages.

- Add `.rubocop.yml` config

- add a counter-cache for quotes, on the `Author` model (_reference notes in_ `GoRails - Rails Concepts` _MarkDown file_)
  - `opl $ rails g migration AddQuotesCountColumnToAuthors`
  - `(Fill it out)`
  - `$ rails db:migrate`
  - add `after_destroy` callback check if the author's counter cache is 0 when you delete a quote (and, if so, delete the author)
  - _note this was also 10.03_

---

## Set up the REST (10.03 - 10.06)

- `$ rails g scaffold_controller Quote`
- add `resources :quotes` to `routes.rb
- Whoops forgot to `$ bundle exec rails webpacker:install`
- `$ rails s` and immediately add a line of HTML to `index.html.erb` to see your work!
- ...and 900+ other quotes.
- Add `kaminari`; follow instructions on `QuotesController#index` and `index.html.erb`

- finish reading VScode articles:

  - (finally) successfully set up debugging with [this article](https://dev.to/dnamsons/ruby-debugging-in-vscode-3bkj) and [the VSCode guide](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)
  - Consider adding this [test runner plugin](https://marketplace.visualstudio.com/items?itemName=davidpallinder.rails-test-runner) once you, y'know, actually start writing tests.
  - You're possibly duplicating RuboCop (_it may come w/ Rebornix Ruby_), but... that's OK..?

- Finish CRUD (views) on quotes

  - clean up a truly embarrassing number of errors in the seed-files
  - wrangle with `Author` sorting (first apply multi-`.map` approach, which stripped out most of the obj/array/rails-provided helpers you later needed)
  - fix sorting-pagination (Kaminari's `.page` is called as a class-method, so you need to run `Kaminari.paginate_array` on a non-AR-Rel beforehand)

- Add scaffold for authors

  - `$ rails g scaffold_controller Author`
  - Add, via:
    ```erb
    <% @author.quotes.each do |quote| %>
      <%= render partial: 'quotes/form', locals: {quote: quote} %>
    <% end %>
    ```
  - The ability to update quotes w/in the author-edit page; after the below, remove it.
  - Long, unpleasant digression: spend _way_ too much time trying to get "delete-at-zero-quotes" behavior to function for Author models, on Quote update -- first w/ [callbacks](https://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html) then w/ [monkeypatching the CC methods themselves](https://api.rubyonrails.org/classes/ActiveRecord/CounterCache/ClassMethods.html)... turns out that counter caches [only listen on record create/delete](https://blog.appsignal.com/2018/06/19/activerecords-counter-cache.html), so changes updates won't work w/o further gem installation... `-_-`
  - Instead, ensure 'show author' page lists all their quotes, as well
  - Ensure author name, w/in [quotes' index/show/update pages], links to author-show-page
  - Already, starting to get sick of Rails' enforcement of CRUD data structures/vertical-alignment across the stack... push this b-word (that is, the ERB/webpacker/-side) out, but don't spend too much time on it. Let's get to exploring Auth / Search / PWA-ification

- Speed up pre-pagination quotes-sorting (_push it into db; give up on using Author scope to order Quote by association. Which still feels *wrong* not to be able to do, easily... but here we are._)

## Set up Authn/Authz (10.17 - 11.24)

- add `root` to `routes.rb`

- As a learning experiment, skip Devise: use [Hartl's auth example](https://www.learnenough.com/ruby-on-rails-4th-edition-tutorial/filling_in_the_layout#sec-user_signup) instead

  - `$ rails generate scaffold User name:string email:string`
  - `$ rake db:migrate`
  - add `get '/signup', to: 'users#new'` to `routes.rb`
  - add `<%= link_to "Sign up now!", signup_path%>` to `application.html.erb`
  - `rails generate migration add_password_digest_to_users password_digest:string`
  - `rails generate integration_test users_signup`
  - `rails generate controller Sessions new`
  - `rails generate integration_test users_login`

- admin can:
  - [CRUD] quotes
  - [CRUD] users
- users can:

  - [R] quotes

- Replace controller tests with [system tests](https://guides.rubyonrails.org/testing.html#system-testing)

- Follow Hartl Ch 11-12 for adding `ActionMailer`-based account activation and password-reset

## Add "Mail Me Daily Quote" feature (11.26 - 12.10)
- Set rails config to true and overwrite to false in production
- Hide signup link (in views) when `false`
- Reroute `new` and `create` `UsersController` actions to `root_path` (w "_sorry no new users; keeping SendGrid subscription at free tier_" flash) when `false`
- [Read this](https://thoughtbot.com/blog/testing-and-environment-variables) re: how to set environmental variables inside rails tests
- Push to heroku

- Set up migration to add 'receive_qotd' field in db on User model
  - `rails g migration add_receive_qotd_to_users receive_qotd:boolean`
  - add `, default: false` to migration file
  - `rails db:migrate`
- Set up UI to toggle 'receives_qotd' attr
  - Checkbox in `app/views/users/_form.html.erb` 
  - `user_params` in `app/controllers/users_controller.rb`
- Set up (migration to add?) quote_of_the_day method in UserMailer
  - Nope -- just add `erb` view-files and `.rb` methods/tests manually
- Set up rake task to send UserMailer qotd email to all users w/ `receives_qotd: true`

- Add migration to give each quote a `next_send_at` and  `most_recently_sent_at` field
  - `rails g migration add_next_send_at_and_most_recently_sent_at_to_quotes next_send_at:datetime most_recently_sent_at:datetime`
- `rails db:migrate`
- Add a `populate_send_at_date_for_quotes` rake task to randomize quotes (order by pk string?), then assign an incrementing date to `next_send_at`
- Update UserMailer qotd method/views to pass in quote in && template w/in email
- Update UserMailerPreview && UserMailerTest
- Update `send_qotd_email` task to...
  - inside task: lookup quote w/ `next_send_at` date of today
  - upon task completion: first set `most_recently_sent_at` to `next_send_at`, then set `next_send_at` to `nil` 

- push to heroku
- `heroku run rails db:migrate`
- `heroku run rake populate_send_at_date_for_quotes`
- use `heroku run rails c` to confirm every quote has a send-at date
- Test by running `heroku run rake send_qotd_email` -- did you get tomorrow's quote at gmail?
- use `heroku run rails c` to reset tomorrow's `most_recently_sent_at` and `next_send_at`
- Set up Heroku Scheduler to run rake task
	- https://devcenter.heroku.com/articles/scheduler
	- https://stackoverflow.com/questions/8619754/whenever-gem-running-cron-jobs-on-heroku
	- https://stackoverflow.com/questions/24915904/whenever-scheduled-task-in-heroku-with-rails

- Confirm in the morning that the next email was actually sent (_it was!_)
- Set calendar reminder to run `populate_send_at_date_for_quotes` every three months

- Extract current `rake` tasks into actual `.rb` files: make them `ActiveJob` classes
  - bring in `delayed_job` for prod && dev
  - set both `populate_send_at_date_for_quotes` and `send_qotd_email` to `perform_later` 
  - For latter, use `deliver_now` for UserMailer? (_yes; appears safe/most-common_)
  - Update `Procfile` to use worker

- Confirm in the morning that the next email was _again_ actually sent 
- Add `times_sent` field to `Quote` 
  - create `AddTimesSentToQuotes` migration
  - add `times_sent` incrementation to `send_qotd_email` job
- Update `default from:` to provide a name (beside '_noreply_' e.g. '_Other People's Lines_')
  - Explore whether [this](https://guides.rubyonrails.org/action_mailer_basics.html#sending-email-with-name) works on `from:`
  - Check [this](https://stackoverflow.com/questions/957422/rails-actionmailer-format-sender-and-recipient-name-email-address) as well
- Add behavior to find furthest date, increment it, then set it as `send_at` for new quotes, on creation
- Write tests for `populate_send_at_date_for_quotes` and `send_qotd_email` jobs-files
- Replace `populate_send_at_date_for_quotes` job with on-create-callback `Quote` model-method to add send-at date
- After a couple days, replace model method with `populate_send_at_date_for_quotes` (whose logic you also fix, and to whom you add a backlog-size-checker)

---

## Nest Form Views, Or Expand Conditional Redirects
- Allow sb to create a new author from the 'new quote' page
  - reference [these suggestions](https://stackoverflow.com/questions/16848748/rails-multiple-forms-in-one-view)
  - update the quotes-form's author-select such that it prepopulates with the newly-created author
  - experiment with hiding author-form partial with CSS, using [these](https://stackoverflow.com/questions/17042279/show-hide-div-with-css-only) or [these](https://stackoverflow.com/questions/19170781/show-hide-divs-on-click-in-html-and-css-without-jquery) or [these](https://stackoverflow.com/questions/17731457/hide-show-content-list-with-only-css-no-javascript-used) suggestions
  - decide they're all a little hacky, and just leave both forms present for now

## Update your README.md for local-dev/Heroku-deploy setup

## After that, ankify these: 
- Controllers
  - Rails Routing from the Outside In 
  - Action Controller Overview


## Update routes.rb
- Add pretty-routing to [authors@name, users@name, ] resources
  - for authors, `rename_column` && `add_index` for `sortable_name`=>`slug`
  - add column/index for slug @ users (based on name)
  - add column/index for slug @ quotes (based on first 25 chars, truncating at next space)
  - add callbacks to `build_slug` (unfortunately, different for each model)

## Write (one? or two?) blog post(s): Process of resource-setup (and/ore) authorization-setup (via hartl tutorial)
- First post: Author and Quotes models // 'To Gem or Not to Gem'
- Second (possible) post: User model && authorization
  - Basically ch. 6 - 12 in Hartl tutorial
  - Takeaway: use devise. 
    - 4 times wherein "problem pointed out" is in further exercises; 
    - "to many eyes, all bugs are shallow" is nice and all, but still suspect more eyes on Devise than tutorial
  - Personal expansion of this process: using system tests. 
    - V. nice compared to (unnamed stacks at previous and possibly current jobs), b/c feels very cleanly integrated with Capybara and Selenium. 
    - One downside of using latter is that you do in fact need to install Chrome binaries, even if using Firefox as browser; I managed to make it work w/ Chromium, but still surprising. Worth it, though, I think for a small first-pass app -- speed tradeoff is nothing compared to benefit of visually grokking exact state of app when test fails.
    - Reference your hack for getting at email strings... surely there's a better, more-idiomatic way? Didn't find one in API docs/SO, though.
- Third (possible) post: async jobs && mailers
  - Copy system you've seen at companies && other codebases of keeping rake task dead simple (for ease of testing && no need to prepend `:environment` task-dependency)
  - Testing it -- takeaways?
  - Mailer-specific versions of jobs -- takeaways?

---

## Frontend assets
- Reference the GoRails Webpacker/Tailwind CSS intro
  - But use [USWDS](https://github.com/uswds/uswds#install-using-npm) as the style library, instead
  - Reference these:
    - https://rossta.net/blog/webpacker-with-bootstrap.html
    - https://rossta.net/blog/from-sprockets-to-webpack.html
    - Careful not to hit [this gotcha with Webpack](https://rossta.net/blog/overpacking-a-common-webpacker-mistake.html)
    - Or [these ones](https://rossta.net/blog/three-ways-webpack-surprises-rails-developers.html)
    - Also these GoRails courses:
      - https://gorails.com/episodes/rails-ujs-primer
      - https://gorails.com/episodes/tailwindcss-1-0-with-rails-6
      - https://gorails.com/episodes/webpacker-javascript-in-rails-6
      - https://gorails.com/episodes/how-to-use-bootstrap-with-webpack-and-rails
      - https://gorails.com/episodes/purgecss
- Add sort toggle (via query-string) to [authors#index] _with tests_
- Can you remove sprockets? (_well, you can try..._)

---

## FTS
- index-view (a la Algolia HN site), with ability to filter by quote-content or author-name

- https://github.com/Casecommons/pg_search
  - `:prefix` to avoid whole-word matching
  - `:dictionary` for stemming, [or maybe not?](https://stackoverflow.com/questions/16129946/adding-prefix-match-to-pg-search#16160033)
  - `:highlight`, possibly?
  - More pg_search articles:
    - https://www.viget.com/articles/implementing-full-text-search-in-rails-with-postgres/
    - https://thoughtbot.com/blog/optimizing-full-text-search-with-postgres-tsvector-columns-and-triggers
    - https://chodounsky.net/2015/05/06/full-text-search-in-rails-with-pg-search/
    - https://robusttechhouse.com/tutorial-full-text-search-rails-application-pg_search/

- Articles combining FTS and Rails w/o gem:
  - https://edgeguides.rubyonrails.org/active_record_postgresql.html#full-text-search
  - https://coderwall.com/p/vngr0a/simple-full-text-search-using-postgres-on-rails

- Supplemental, raw-PostgreSQL-FTS articles
  - https://dev.to/sheshbabu/minimal-viable-search-using-postgres-jlg
  - https://jetrockets.pro/blog/two-edge-cases-in-postgresql-full-text-search
  - https://rob.conery.io/2019/10/29/fine-tuning-full-text-search-with-postgresql-12
  - http://rachbelaid.com/postgres-full-text-search-is-good-enough/
  - https://www.digitalocean.com/community/tutorials/how-to-use-full-text-search-in-postgresql-on-ubuntu-16-04
  - https://compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/
  - https://blog.lateral.io/2015/05/full-text-search-in-milliseconds-with-postgresql/

---

## Write a blog post: To Gem or Not to Gem, Part Deux: The Big Three

## After that, ankify these:
- Views
  - Layouts and Rendering in Rails
  - Action View Form Helpers

## Then read Hartl Ch. 13 & 14 on the Kindle, and extract notes to yblog .md file.

## Then ankify the entirety of the collected Hartl notes.

<!-- ## Write a blog post: Process of interleaving SRS card-creation w/ coding  
  - Process:
    - work through chapter/feature, referencing pdf,
    - extract notes as .mobi files // extract relevant RoR-guide pages
    - adapt details as Anki flashcards
  - Supposition: it helps to build mental models, which in turn undergirds performance of the task  
  - Dependent Supposition: declarative knowledge is (sometimes) composed into and constituent of performative/strategic knowledge -->

---

## Watch these:
- [Getting Unstuck: Strategies For Solving Difficult Problems](https://www.youtube.com/watch?v=3XscuivvUzI)
- [Tricks and treats for new developers](https://www.youtube.com/watch?v=BZbW8FAvf00)
- [A survey of surprisingly difficult things](https://www.youtube.com/watch?v=aUk9981C-fQ)
- [Perusing the Rails Source Code - A Beginners Guide](https://www.youtube.com/watch?v=Q_MpGRfnY5s) ([also bloggified here](https://alexkitchens.net/2017/05/06/rails-source-code.html))
- [Code Spelunking: teach yourself how Rails works](https://www.youtube.com/watch?v=LiyLXklIQHc)
- [Inside Rails...](https://www.youtube.com/watch?v=eK_JVdWOssI)
- [Your first contribution (and beyond)](https://www.youtube.com/watch?v=SUD9rj0rRxg)

## Check How, If At All, You Can Give Back
- First, set up [the dev-environment on your machine](https://guides.rubyonrails.org/contributing_to_ruby_on_rails.html#setting-up-a-development-environment) 
- In the `layouts_and_rendering` article, shouldn't e.g. "_called in HomeController#index_" pluralize the controller? (Eh, it's ambiguous: similarly-named controller in ActionPack tests.)
- EdgeGuides say "_The above three ways of rendering (rendering another template within the controller, rendering a template within another controller, and rendering an arbitrary file on the file system) are actually variants of the same action._"; in fact, the third (arbitrary file) method is provided below it, right? (Eh, it's ambiguous: similarly-named controller in ActionPack tests.)
- If nothing else, look at [helping with existing issues](https://guides.rubyonrails.org/contributing_to_ruby_on_rails.html#helping-to-resolve-existing-issues)

## Finally, start the next project

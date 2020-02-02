# RailsConf Presentations That Might Help You Contribute to Rails Documentation

## Getting Unstuck: Strategies For Solving Difficult Problems (RailsConf 2019, Steven Hicks)

1. Embrace the act of being stuck
   - Getting stuck isn't a reflection of your skill level (_only the_ type _of problems change with seniority, not the ease of resolving them_)
   - Getting stuck isn't an impediment do you doing your job (_getting stuck_ is _the job - it's what we're getting paid to do, and to work through, as engineers._)
2. Explain the problem to someone else
   - First, write about the problem
   - Nifty idea: write the message as a slack to Slackbot (then you get to keep it, in searchable format!)
   - "The Protege Effect" - learning is more effective when it is done in order to teach that same content/skill to someone else
   - Challenge your assumptions: experience the thing for what it is, not what do you think it is (the symbol versus the reality)
3. Isolate the problem
   - Risk analysis
     - What is the thing I've introduced that I know the least about?
     - What is the thing most likely for me to improperly use?
     - What is the thing I'm making the most assumptions about?
   - Remove code
     - Delete code iteratively (stub half the code to "work"/return true, to locate where the unexpected behavior is)
     - Back out changes iteratively (same as above, but with your sequence of commits w/ e.g. `git bisect`)
   - Build a POC: demonstrate the problem with _just_ the pieces you think might be broken
4. Escape the problem (relax, exercise, other hobby, other/smaller work problem)
5. Harden yourself (exercise, meditate, collect reminders that you're not horrible useless garbage)

## Tricks and treats for new developers (RailsConf 2017, David Padilla)

- If you have `config/payments.yml`, with the `stripe_key` key nested under each of `development:`/`test:`/`production:`, you can access them in the codebase with e.g. `Rails.application.config_for(:payments)['stripe_key']`
- In migrations, prefer SQL over Ruby for changing db data (_a little more verbose, but much faster - and thus safer_)
- Alternatively, consider `gem 'rails-data-migrations'`, which will split e.g. 'add a column, then populate it' into both the typical migration rake-task _and_ a separate 'data migration' rake-task.
- Don't pass objects to background jobs: they might have changed by the time the job is dequeued. Pass the id's instead. (Also, the objects often get converted to `yml` and may, with unexpected errors from broken character-parsing.)
- Always pass email with `perform_later`, in case of e.g. SMTP authentication errors causing other related, dependent tasks to blow up
- if you add `#!/bin/bash \n rubocop` to `.git/hooks/pre-push`, it'll run rubocop _and_ cancel the push on rubo-fail
- `bullet` detects n+1 queries
- `oink` detects memory leaks

## A Survey of Surprisingly Difficult Things (RailsConf 2017, Alex Boster)

- Dates and timestamps

| time-type     | Migration                  | Ruby class                   | PostgreSQL                        |
| ------------- | -------------------------- | ---------------------------- | --------------------------------- |
| time only     | `:time`                    | `Time`                       | `TIME`                            |
| date only     | `:date`                    | `Date`                       | `DATE`                            |
| date and time | `:datetime`                | `DateTime`                   | `TIMESTAMP`                       |
| duration      | n/a or `:range` (w/ PgSQL) | `Float` (seconds) or `Range` | `INTERVAL` or `TIME` or `TSRANGE` |

- Check out ActiveSupport Duration; otherwise there's no consistent handler across server and db
- Only store information as `Date` if the time of day will never matter
  - If it is a holiday or the like, store as a `Date`, not a `DateTime`
  - Became very careful when converting between the two; there are lots of catches
- Careful with `Date.today`; it implicitly takes into account timezone. Prefer `Date.current` / `Date.current.in_time_zone`.
- Timezones
  - `tzdata` is a database of time zones
    - Used in many systems, including UNIX
    - Ccontains all time zones since 1970
    - Tracks DST changes
    - Updated several times a year
  - UTC
    - Used for standardizing a single instant of time, regardless of which time zone you're referring to
    - Not a timezone itself; however, every time the zone has an offset from it
    - As a rule, store time values in UTC
    - Not actually +12/-12 -- can go up to +14 because of Kiribati
  - Keep your [system, database, application] all on UTC
  - Store a given user's timezone on the e.g. `User`, model and use that in your views
  - Always do `Time.zone.parse(string_w_timestamp)`; don't do `Time.parse` (or `Time.now`)
  - If you use "_string-parse time,_" always follow w/ zone, e.g. `Time.strptime("time_string","formatter_string").in_time_zone`
  - Actually, follow any time, really, with `.in_time_zone`
- Human names
  - Just validate as little as possible: it's not your place
  - If you can avoid 'fname lname,' do so; if not, maybe 'Given Name, Family Name' instead
  - Don't assume "real names" are used
- Physical addresses
  - Even in the US, you have [standard, rural-route, military addresses, PR and territories, etc]
  - Special characters are allowed (apostrophes, slashes, etc)
  - Try to use Postal Code (int'l version) rather than ZIP
  - Don't make it only 5 chars long
- Money
  - _Never_ as a float
  - Not terrible as decimal:
    ```Ruby
    create_table :products do  |t|
      t.decimal :price, :decimal,
                precision: 12, scale: 2
    end
    ```
  - Careful, though: `decimal` will be converted to a `float` in JavaScript (_if passed via JSON._) Must explicitly cast to decimal object on JavaScript side.
  - Even better: just store cents.
    - Stored as `INTEGER`; used as `Integer` everywhere; only converted to dollar-view on display
    - Hey, no rounding errors!
    - Be careful to name the field descriptively, e.g. `price_in_cents`
- Email addresses
  - You can validate that there's an `@` and a `.`
  - Beyond that, though...
  - Easiest? Just send a verification-email.
- Internationalization: even if you have no particular plans to go international...
  - Put all your strings in `config/locales` from the beginning
  - Add a locale to your `User` model and always use it even if it's just 'default to `US-en`' at the start
- Payments and Credit Cards
  - Have client browser send data to third-party, not to you
  - Have third-party send web hooks to you (_don't rely on e.g. tokens_)
  - Have plan for timeouts on client's request to third-party

## Perusing the Rails Source Code - A Beginners Guide (RailsConf 2017, Alex Kitchens)

- `ActionPack` contains both the `ActionDispatch` (_routes_) and `ActionController` (_...controller_) modules.
- Inside each module...
  - `lib` contains the actual code;
  - `README.rdoc` is a good place to start for an overview;
  - `gemspec` is another place to look into early, to see the module's dependencies.
- Ruby introspection methods:
  - `MyClass.method(:my_method).source_location` shows what is providing a given method
  - it can be helpful to... 
    - see what file this method points to, 
    - compare it to what file the API documentation points to, and then 
    - track the `super` path between them (_to discern the 'Ruby magic'_)
  - For more complex situations, use `byebug`
    - Rails team provides [bug-report templates](https://github.com/rails/rails/tree/master/guides/bug_report_templates)
      - These are minimal versions of each Rails module 
      - Good place to begin to explore/play around with the Rails internals
    -  if you `require "byebug"` then call `byebug` at any given point in the script, you can...
      - type `s` to "step into" (_that is, move to the first line inside)_ the next-listed method;
      - type `n` to skip over the next-listed line of code ;
      - type `var local` to print all local variables that are available
    - Alternatively/in addition, you can `require "pry"` then call `binding.pry` to get an interactive console at any given point in the script execution
  - Helpful practice while exploring: 
    - Create a T-chart of `classes I know about`/`classes I don't know about`
    - Draw lines between how the classes in each chart depend on each other 
    - List the most commonly used methods in each class
  - Another helpful practice: if you don't understand a line of code, just delete it and re-run the tests to see what blows up
- Use `git` to uncover the story of Rails
  - `git blame -w` will ignore whitespace-change commits
  - `git log -S "foo bar baz"` will return all commits that contain "_foo bar baz_" in commit-changes
  - `git log --patch` (or `git log -p`) will also return the actual changes from the commits (_rather than just the commit-message_) 
  - `git log --pickaxe-all` pairs with `--patch` to ensure that all changed files are returned (_not merely those matching the_ `-S` _string_)
  - `git \` allows you to multiline commands (_yeah, this works with anything in Bash, I think..._) 
  - `git log --reverse` returns matching commits from oldest to newest (_rather than vice-versa_)
  - Using the above in combination, you can usually find the commit-hash that first implemented a feature (_and then check it out, to see the context/reasoning for it_)
  - To go further backwards, you can repeatedly $(_use_ `git blame`_, then check out commit, then use_ `git blame`_, then..._)
- To get more familiar with ongoing efforts:
  - Find a bug/issue with [a reproduction script _and_ a submitted PR];
  - Pull down the script, run it on your machine to see which tests fail;
  - Think/code through how _you_ could resolve the failing tests;
  - Open up the attached PR and compare your version to how the contributor did it.

## Code Spelunking: teach yourself how Rails works (RailsConf 2019, Jordan Raine)
- Method introspection: ask objects what methods they respond to
  - `MyClass.new.methods` is often unhelpful, because (_ _) there are so many methods provided alongside that it is difficult to find the salient ones
    - A cleaner alternative is: `MyClass.new.methods - Object.new.methods`, to show only those methods from the class itself
    - Another useful searcher is: `MyClass.new.methods.grep /string/`
  - `my_instance.method(:my_method).source_location` is standard Ruby; it will return the file name and line number where is the method is defined
  - `my_instance.method(:my_method).source.display` is provided by the `method_source` gem (_which comes standard in Rails!_); it will return the actual method definition (_pretty-printed, if you use_ `.display`).
  - The sections of Ruby that are written in C, however, will return `MethodSource::SourceNotFoundError` if you call e.g. `.source` on them
  - `bundle open my_gem` will open the `my_gem` gem in your editor; you may first need to e.g. `export EDITOR="code -w"` first

## Inside Rails: The Lifecycle of a Request (RailsConf 2019, Yehuda Katz, Vaidehi Joshi, Godfrey Chan, & Krystan HuffMenne)
- (Web servers) use (the Rack protocol) to communicate with (Ruby web frameworks)
- The `config.ru` rackup file... 
  - needs e.g. `require_relative "path/to/my_app_file` to load an `.rb` file containing e.g. `class MyApplication`;
  - needs the `run` DSL-method called with `MyApplication.new` as the arg;
  - will (_when_ `rackup` _is called from the same directory as_ `config.ru`) wrap whatever Ruby webserver (_Thin, WEBrick, Puma, Unicorn, etc_) you're using, and begin to listen for requests.
  - If you find yourself using multiple middlewares, rather than passing them each to each other as arguments you can call the `use` DSL-method on each middleware class, prior to calling `run`. 
- Inside `application.rb`, you can use `config.middleware.use BazClass::QuuzModule` and `config.middleware.delete FooClass::BarModule` to add/remove Rack middlewares.
- In `routes.rb`, something like `get '/articles/ => 'articles#index'` is parsed into `ArticlesController.action(:index).call(env)`
  - `class ActionController::Base` defines a `self.action(name)` method that returns a lambda (_which, among other things, calls_ `self.send(:name)`)
  - That lambda, when `.call`'ed, takes an `env` hash, and itself returns a `[status, headers, body]` array... it's just a Rack app.
- Side note that the Sidekiq UI is written in Sinatra: so you can e.g. add `mount Sidekiq::Web, at '/sidekiq'` to get a Sinatra app _in_ your Rails app 

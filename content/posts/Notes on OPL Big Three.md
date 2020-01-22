---
title: "To Gem Or Not To Gem, Part Deux: Three Whales"
date: "2020-01-21"
template: "post"
draft: true
slug: "/posts/opl-big-three-notes/"
category: "What I Do"
tags:
  - "Rails"
  - "PostgreSQL"
description: "Reflections on how the tool-selection unfolded for three big chunks of a Rails toy app: the auth, frontend, and search."
---

## Overview

Despite the [torrent of navel-gazing](../../posts/opl-resource-notes/) unleashed by working through the convenience/flourish-features of the CRUD app I've been building... Well, [it says it right there in the repo.](https://github.com/ypaulsussman/opl) The main point of the project's been to get more familiar with the Rails Ways® of doing three things -- auth, frontend, and search (_convention over configuration, and all that._)

And I'm happy to say I'm feature-complete! (`git diff feature-pleased`_, which doesn't exist yet and -- given fatigue and distractor-novelty -- likely will not._) I want to collect my experiences, below, for each of these three major features (_two of which ended up being, between us, significantly smaller than the 'ancillary' feature of daily emails._)


## Project the First: Auth(entication, mostly)

Fortunately, [whether](https://stackoverflow.com/questions/27166128/when-to-use-devise-vs-creating-my-own-authentication) [to use](https://stackoverflow.com/questions/57779220/customizing-devise-vs-creating-own-authentication-for-multi-page-registration) [Devise](https://old.reddit.com/r/rails/comments/bw13j4/rails_authentication_from_scratch_vs_devise/) [is a wholly](https://old.reddit.com/r/rails/comments/33wu1z/roll_your_own_authentication_or_devise_michael/) [uncontentious](https://old.reddit.com/r/rails/comments/4jw6ku/do_you_roll_your_own_authentication_or_use_gems/) [topic](https://blog.codeship.com/why-you-shouldnt-roll-your-own-authentication/) -- nothing to worry about, here!

I've lost track of the contexts in which I've been told "_yeah, you should learn how to implement it yourself... but then, afterward, just use a preexisting, battle-tested gem_" -- and it would make sense that the "_to many eyes, all bugs are shallow_" pitch holds even more crucial for authentication. 

Indeed, my most cursory review Hartl's chapters on authentication return five instances in which the footnotes include an entry to the effect of "_thanks to_ `#{reader_name}` _for pointing out the following security edge-case._"

Buuuut... I've been told equally-often of how Devise exemplifies the criticism often levelled at Rails: that it "_makes 90% of your features trivial, and 10% impossible._" (_I've seen it, too, alas, both on professional and personal projects._) 

So what the hell. I played the odds on security through obscurity, and the Evil Internet not caring (_very reasonably!_) enough to learn about `dry-thicket-30439`, let alone scan it for exploits. I did it: I put on my sunglasses, cracked a Key Lime La Croix, and _I rolled my own application auth_, following the session-based system laid out in the Hartl tutorial.

And it was an absolute learning delight.

I'm honestly not certain that (_the hacking and patching around Devise, in order to get exactly the authentication-workflows that a given app requires_) opens, on average, fewer exploits than (_simply building those workflows from the ground up around e.g._ `has_secure_password` _and_ `authenticate`) -- and yet the velocity and convenience Devise initially offers is undeniable, and there's a certain sad truth to the count of people who got "_fired for buying IBM._"

But, regardless of which I default to in the future, Devise or DIY? It's felt invaluably reassuring to build an authentication system based solely on Rails' out-of-the-box offerings, if for no other reason than to concurrently build a mental model of what Devise is doing internally.

## Project the Second: Frontend Assets

I wasn't originally planning to decorate this app's `.erb` templates with lots of JavaScript (_and handclap, handclap... mission complete._) Rather, I'd expected mostly to explore how obnoxious the dual frontend-setups would be to work with: that is, to what degree the `sprockets` "asset pipeline" and `webpacker` would contradict/intersect/overwrite each other.

Happily, they divided their respective filetype-processing responsibilities with no drama that I could find: I `require`'d the component library I'd chosen in `application.js`, and followed with a sprinkling of `import`'ed `.js`; I then let `app/assets/stylesheets/application.scss` pull in my individual `.scss` files. 

Finally, I then... promptly ripped it all up by removing the `.js` that I'd added (_thanks, built-in_ `rails/ujs` _event handlers!_), transferring my individual `.scss` to Webpacker, and removing the `app/assets` dir entirely. And, by and large? It worked!

(_Frontend side-note 01: amusingly, what_ did _prove unexpectedly difficult was removing_ `sprockets` _in any meaningful sense: even removing it from the railties-loading in_ `config/application.rb` _couldn't convince Bundler to extricate it from the_ `Gemfile.lock`. 

_Which would be fine, except... as of_ `sprockets 4.0` _the gem now requires the presence of an_ `app/assets/config/manifest.js`_, even if both the_ `config/initializers/assets.rb` _file and every_ `config.assets.*` _setting are removed._ 

_I'm almost certainly overlooking something deeper in the guts of Rails' app-initialization, but... well, setting an unused gem back to_ `~> 3.7` _worked just as well, and in a fraction of the time._)

Modulo that digression, however, working with `webpacker` was surprisingly straightforward. I had to some trivial digging outside of the official Rails guides and API documentation to discover the proper [binstub invocation](https://github.com/rails/webpacker/blob/master/docs/webpack-dev-server.md) when developing locally, and  proper [buildpack management](https://github.com/rails/webpacker/blob/master/docs/deployment.md#heroku) when deploying to Heroku -- but really, these feel more like Rails being a community/volunteer-run project. I'm just grateful they were present at all -- if anything, I should do my part to contribute.

(_Frontend side-note 02: I came away with fewer reflections than I'd expected, here, but I wanted to also record the hour or two I spent combing through comparison lists of "component libraries, circa late 2019."_ 

_Less had changed and than I might've expected, though I couldn't guess that's to whether that was the ongoing domination of bootstrap, a larger move to functional frameworks, or browser-support for CSS features having advanced to the degree that many firms can simply start new projects with BEM notation and mixins._

_I was initially interested in Bulma's CSS-only approach; however, the subdued aesthetics of the USWDS library appealed to me (as did the conceit of it being a software package that I had, after a fashion, in fact already paid for!_)

The only other reflection I had while building out the UI is almost tangential to the actual asset-processing I'd expected to demand so much energy. Having spent most of my (_old-school Rails-frontend_) professional hours on maintaining/expanding giant, aging jungle-thickets of `.haml` views and partials, it was nice to get the experience of working with server-rendered HTML templates on the ground-floor, at the outset of a new application. 

And, while somewhat sad, it was also reassuring to come away with the same sentiment: I don't really _want_ to work with `.erb` or its cousins again, if I can avoid it. 

It may be that you fall in love with the first person you meet, and I certainly did cut my teeth on SPA-managed, JavaScript-rendered component UI's... but the process of (_extracting repeatable, modularizable UI from preexisting views into new partials_) feels unpleasantly implicit, verbose, and difficult to reason about, vis-a-vis (_composing repeateable, modularizable UI from preexisting components into new views._) 

These concerns are, I think, best enumerated at [the GitHub page](https://github.com/github/actionview-component) for `ActionView::Component`, one of the features slated for release in Rails 6.1 -- which, you might imagine, I'm _quite_ excited to start playing with.

## Project the Third: Full Text Search

- Inspired from [this article](https://dev.to/heroku/postgres-is-underrated-it-handles-more-than-you-think-4ff3), decided to keep it raw-PostgreSQL. 

The two major advantages to Elasticsearch (_at least as I understand them -- no doubt there are others!_) won't feature in this app. First, I find it unlikely I'll be getting into the at-scale situation of six-seven figure of records (_and even so, the GIN index would at least mitigate this help._) And second, the type of the search the app uses has no need for faceting/aggregations: I'm not planning to introduce e.g. "_show me quotations containing the word 'fever,' but only from authors who are French, and only if they -- the author, in sum -- have been viewed by more than 100 individual users._" 

(_And if I did, I'd probably just settle for the middle-road of tearing my own eyes out and living in a hut down by the sea, which seems both more pleasant and straightforward/sustainable._)
- I'd been little worried about the ability for the index to be picked up automatically from within the ActiveRecord query, but sure enough, `rails c` provides...
```ruby
Quote.where("to_tsvector('english', passage) @@ to_tsquery('english', ?)", 'foobar').to_sql
# => "SELECT \"quotes\".* FROM \"quotes\" WHERE (to_tsvector('english', passage) @@ to_tsquery('english', 'foobar'))"
```
...which `psql` then confirms as using:
```sql
EXPLAIN SELECT "quotes".* FROM "quotes" WHERE (to_tsvector('english', passage) @@ to_tsquery('english', 'foobar'))
/*
                                            QUERY PLAN                                            
--------------------------------------------------------------------------------------------------
Bitmap Heap Scan on quotes  (cost=12.04..29.16 rows=5 width=248)
  Recheck Cond: (to_tsvector('english'::regconfig, (passage)::text) @@ '''foobar'''::tsquery)
  ->  Bitmap Index Scan on index_quotes_on_passage  (cost=0.00..12.04 rows=5 width=0)
        Index Cond: (to_tsvector('english'::regconfig, (passage)::text) @@ '''foobar'''::tsquery)
(4 rows)
*/
```
...the `gin`-index I'd generated at the outset! Never let me doubt you again, sweet PostgreSQL.


## Takeaways

Part of the reason I under took this project was to gain familiarity with the above three facets aspects of web development; part of it was to see how far I could get with a "_you might_ only _need rails - in 2019_" ethos. (_...well, yeah: and part of it was that I just wanted to receive a quote from that personal text-cumulus, daily, and be able to easily query it by morphological stem._)

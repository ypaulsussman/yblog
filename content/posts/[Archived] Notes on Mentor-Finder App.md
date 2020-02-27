---
title: Auth And Search For A Weekend Hackathon
date: "2019-06-19"
template: "post"
draft: true
slug: "/posts/mentor-finder-notes/"
category: "What I Do"
tags:
  - "Rails"
description: "These are the notes I kept while building a toy app, 'Mentor-Finder,' for an acquaintance; the primary focus is best-practices when integrating the Devise and Ransack gems."
---

## What Are We Doing Here?

A couple weeks ago, an acquaintance asked me to hack out a quick proof-of-concept app for a local nonprofit.

The goal was for established professionals within a specific field (_here, edtech_) to bidirectionally connect with mentees via shared [_interests, skills_] within that field.

More specifically, the specs were as follows:

```
[1] A user can log in with their email. (Later, they can use LinkedIn.)

[2] When a user logs in, they can:
  * update their profile
  * search for users by profile items
  * change notification settings (ie no emails, not searchable)

[3] When a user with admin privileges logs in, they can:
  * CRUD user
  * send email re: event w/ Eventbrite link
  * CRUD business list
```

Below are my notes from implementing the first two features, before (_spoilers!_) further discussion revealed that this sort of full web-app wasn't the cleanest solution for what they were trying to do. (_And, thankfully, before I had to start on the CSS._)

## Step 01: Initial App Setup

Little to note, here:

```
Desktop $ rails new ednorth -d postgresql
# in `config/database.yml`, set `development: username: ypaulsussman`
Desktop $ cd ednorth/
ednorth $ rake db:create
ednorth $ psql -l
                                        List of databases
        Name         |    Owner     | Encoding | Collate | Ctype |       Access privileges
---------------------+--------------+----------+---------+-------+-------------------------------
 ednorth_development | ypaulsussman | UTF8     | C       | C     |
 ednorth_test        | ypaulsussman | UTF8     | C       | C     |

ednorth $ psql ednorth_development
ednorth_development=# \du
                                     List of roles
  Role name   |                         Attributes                         | Member of
--------------+------------------------------------------------------------+-----------
 ypaulsussman | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

# Add `gem 'devise'` to `Gemfile`; run `bundle`
ednorth $ rails g devise:views
# Add `config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }`
#     to `config/environments/development.rb`
ednorth $ rails g controller StaticPages lander
# Add `root to: 'static_pages#lander'` in `config/routes.rb`
# Add (hilariously unrefactored) 'Sign Up'/'Sign In'/'Sign Out' links
#     to `app/views/layouts/application.html.erb`
```

The TL;DR being "_create the app; ensure it's using PostgreSQL; add the_ `devise` _gem; set up the login routes_" -- pretty straightforward stuff.

## Step 02: Expanding `User` Attributes

Next, though, things got interesting.

In an app where authentication flows through the `devise` gem, there are several ways to allow users to create/update new attributes on the `User` model. Of them, no architecture that immediately appeared superior.

### Option A: Separate API

For example, I’d seen one Rails app use the standard `devise` endpoints for login, then maintain an entirely separate set of API endpoints to manage CRUD functionality on the `devise`-protected resource (_here,_ `User`.)

Those endpoints' controller-actions would first check against `current_user` in a `before_action`, then manages any changes to those `User` attributes which are unrelated to the `Devise::RegistrationsController` (_e.g. personal information, preferences, etc... anything beside the authentication key(s) and_ `password` / `password_confirmation`_._)

Flexible, but... a second set of routes and controllers? For a proof-of-concept app? Bit overkill.

### Option B: Separate Model

Another option I considered would be to add a separate `User has_one` association to a new -- let's call it `UserProfile` -- model.

On the upside, this would provide strong extensibility for `User` details, beyond the MVP of '_five_ `<input type=text>` _fields sending data back to be stored as raw strings._' And even at maximum realistic scale, the app's too small for table-joins to affect performance.

In my experience, though, it's not the database speed you have to worry about: between

- the `.joins` and
- "_wait is that_ `.joins(:foos).eager_load(:foos)`_?_" and
- "_wait actually can it just be_ `.preload(:foos)`_?_" and
- the `.includes` and
- "_nope, gotta be_ `includes(:foos).where('foos.bar = ?', 'baz')` `.references(:foos)`_, right?_" and
- "_wait actually can it just be hash-syntax?_" and
- "_agh, forgot the scope; where_ do _I chain that in again?_" and...

ActiveRecord query-syntax complexity compounds exponentially from the number of tables you need to reference. Better, then, to add new ones only when necessary.

### Option C: Padded Views
Eventually, I settled on my initially-least-favorite option: adding more form-fields to hitch a ride along the preexisting `devise` routes, as `params`:

By [adding the `configure_permitted_parameters` method](https://github.com/ypaulsussman/ednorth_mentorfinder/blob/7a42c85b5b962be0083e505bb5651c53b11e1196/app/controllers/application_controller.rb#L16) to `ApplicationController`, you get decently fine-grained control of what other `User` attributes the user can controto allow the `account_update` and `sign_up` methods to listen for.

<!-- @Y: YOu gave up somewhere around here -->

# Create `db/migrate/20190608202058_add_details_to_users.rb` migration
# to add fields below to `users` table

# Add 'first_name last_name bio can_help need_help interested_in' <input /> fields
# to `app/views/devise/registrations/edit.html.erb`

# Add `first_name last_name` form fields
# to `app/views/devise/registrations/new.html.erb`

- You can do this because `Devise::RegistrationsController`'s `update` action [will apply any (permitted) params](https://github.com/plataformatec/devise/blob/master/app/controllers/devise/registrations_controller.rb#L46) that were sent over the wire.
- The one crucial drawback, here, is that this prevents any substantive future expansions to the controller action: it isn't accessible unless you either...
  - monkeypatch the action entirely (_and I suspect there's a reason why it's not called responsible-developer-whose-name-is-not-cursed-by-all-colleagues-to-followpatch_), or
  - decorate the Devise action using [the latter option in Section 04 of 'configuring controllers'](https://github.com/plataformatec/devise#configuring-controllers) -- but even then, you need to go into the source code to locate the `yield resource if block_given?` line for that particular Devise method... and you're thus stuck calling your code only at that specific point within the original method's execution.
- Beyond that (_future, albeit likely_) constraint around the controller-action logic, however? The form is trivial to tweak, or to remove when there is that need for greater business logic (_it's ~two dozen lines of boilerplate ERB, or less once you've extracted the form-field creation into an_ `.each` _block._)

And then, finally, came...

## Add 'Search Colleagues' Capability

<!-- https://towardsdatascience.com/deep-dive-into-querying-elasticsearch-filter-vs-query-full-text-search-b861b06bd4c0 -->
<!-- https://news.ycombinator.com/item?id=21227479 -->

I knew I didn't want to [1] write several ActiveRecord `scope` methods (_possibly with interpolation?_), plus the logic to conditionally chain them together, on a project wherein both variables would change rapidly, frequently, and significantly: or to... [2] learn and set up ElasticSearch. (_Extra servers? Extra spooky!_)

The middle ground, here, appeared to be the [Ransack gem](https://github.com/activerecord-hackery/ransack/blob/master/README.md). How to implement it, though, raised similar questions around how to deviate from Platonic RESTfulness as elegantly as possible.

Eventually, I settled on the following:

```
# Add `gem 'ransack'` to `Gemfile`
ednorth $ bundle install

# Add `get "/colleagues", to: 'application#search_colleagues'`
# to `config/routes.rb`

# Add `def search_colleagues
        @people = User.ransack(params[:q]).result(distinct: true)
      end`
#     to `app/controllers/application_controller.rb`

# Add `before_action :authenticate_user!, only: [:search_colleagues]`
# to `app/controllers/application_controller.rb`

# Create `app/views/application/search_colleagues.html.erb`

# Add `search_form_for`
# to `search_colleagues` view

# Create seeds.rb file for ipsum-generated colleagues
```

This process was a little less clear-cut.

One (_discarded_) option was to add Ransack search via a custom method in the `Devise::RegistrationsController` controller (_that is, the one accessed by_ `users/registrations`.)

- As mentioned above (_and, again, demonstrated [here](http://devise.plataformatec.com.br/#configuring-controllers)_), this is eminently feasible.
- However, it seems like it would result in an unsemantic overlap: searching for _other_ users, via their profile information, really has nothing to do with a given `User`-model's "registrations" (_as defined within the Devise gem._)
- Moreover, I'd already elected against modifying the actions on the `Devise::RegistrationsController`, when considering how to quickly include other `User`-model forms: no reason to undermine that decision here.

I'd also considered adding a method to a new, Devise-unrelated e.g. `UsersController`.

- This solution, however, feels unintuitive to future developers: we'd then have a `UsersController`, and a `Devise::RegistrationsController`... but they would both interact with the `User` model, and in fact the only controller that would act _on_ that model would be... the `Devise::RegistrationsController`.
- As in the prior option, there's the problem of the decision not to modify the preexisting controller for new fields: it seems pretty confusing to create a `UsersController`... but then not actually use it for any CRUD actions on the `User` model.

For a while, I'd considered adding a method to a new, Devise-unrelated e.g. `SearchesController`.

- This, at least, would be definitively less confusing for future developers.
- However, it still felt excessive, unless I was to include multiple actions on the controller... and whole point of including `Ransack` gem was to get a lightweight abstraction around that sort of functionality.

Ultimately, and somewhat ambivalently, I simply added a new method to `ApplicationController`.

- It feels less semantic than the `SearchesController`, and I'm not crazy about that.
- I was tipped toward this solution, though, by how minimal the code change is: it's easy to refactor in response to future requirements (_remove one method and one ERB file!_)
- And, ultimately... that functionality is (_both currently and when complete_) the centerpiece of what the application's meant to do. So there's at least _some_ descriptive accuracy to including the method here.

## Takeaway

In both cases, then, my solution was to go with "_not the rightest, but the lightest_" code. Catchy. Probably not wise: but... catchy?

I'm curious to see how I look back on these two choices, six months down the road.

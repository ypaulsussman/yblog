---
title: Revisiting Notes on 'Mentor-Finder'
date: "2019-06-19"
template: "post"
draft: true
slug: "/posts/mentor-finder-revisitation/"
category: "What I Read"
tags:
  - "Rails"
description: "These are my thoughts on rereading -- admittedly, a week later -- the notes I'd kept on building a toy app by which mentors and mentees in the MPLS startup space could connect."
---

## Overview

One of the lesser-known benefits of being a junior developer is that any extension of functionality beyond your basic CRUD service on a toy app becomes an opportunity for architectural reflection: largely because you have no idea how to predict what might bite you in the future. 

I'm writing this post because I'd like good-ol’-2021-Y-Paul to get a look at what his benighted ancestor did, and at least expose some of the thought processes behind it. (_So quit judging, 2021-Y-Paul._)

It began when I was asked by a friend to hack out a quick proof-of-concept of an app that a local nonprofit was looking to build. The goal was for entrepreneurs within a particular field to be connected (_or simply be able to find? That hadn't yet been entirely hashed out_) via their shared interests/skills in that field's subdisciplines.

(_What I heard was_ "hey you love playing with Ruby gems; go to town and feel good about yourself while doing so." _So I did!_)

More specifically, the specs were as follows:
```
A user can log in with their email. (Later, they can use LinkedIn.)

When a user logs in, they can:
* update their profile
* search for users by profile items
* change notification settings (ie no emails, not searchable)

When a user with admin privileges logs in, they can:
* CRUD user
* send email re: event w/ Eventbrite link
* CRUD business list

YQ: if user is owner of a business, can they modify data?
```

## Setup

This process will be absolutely shocking to anyone who's built a rails app, but:
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

ednorth $ rails s
```

## User Auth

Again, not a ton surprising here:

```
// Add `gem 'devise'` to `Gemfile`; run `bundle`

ednorth $ rails g devise:views

// add `config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }` to `config/environments/development.rb`

ednorth $ rails g controller StaticPages lander

// Add `root to: 'static_pages#lander'` in `config/routes.rb`
// Add (hilariously unrefactored) 'Sign Up'/'Sign In'/'Sign Out' links to `app/views/layouts/application.html.erb`
```


## Expand User Model and View

And here, things get interesting.

```
// Add `configure_permitted_parameters` methods 
// to `app/controllers/application_controller.rb`
// for `account_update` and `sign_up` methods

// Create `db/migrate/20190608202058_add_details_to_users.rb` migration 
// to add fields below to `users` table

// Add 'first_name last_name bio can_help need_help interested_in' form-fields
// to `app/views/devise/registrations/edit.html.erb`

// Add `first_name last_name` form fields 
// to `app/views/devise/registrations/new.html.erb`
```
I settled on the above after much agonizing: how best to expand create/update forms for new fields on the `User` model?

I’ve seen another in-production Rails codebase using Devise which got around this by having a separate set of API endpoints for CRUD functionality on the fields of the `User` model which shouldn’t require re-entering your password, or which were otherwise unrelated to the `devise/registrations` controller. That seemed like a lot for a proof-of-concept app, though...

One option I though about would be to add a separate `has_one` association to a new, let's call it `UserProfile`, model. 
* This would allows lots of future expansion on profile details, especially if (_...when_) the descriptions of users becomes more complex than the '_five_ `<input type=text>` _fields sending data back to be stored as raw strings_' MVP.
* Both the current and, realistically, maximum scale make the standard "_joins are bad for perf_" argument somewhat trivial; however, at any table-size they make ActiveRecord lookup syntax ever-more slightly complex.
* Ultimately, my decision boiled down to the question of whether there was any immediate scenario where I'd want to look up latter model (`UserProfile`) without some reference to the former (`User`.) As nothing came to mind, the extra AR association felt like premature complexity.

As another possibility, I could have added a new e.g. `/profile/` uri that routes (via `routes.rb`) to actions on a new `UsersController`.
* At the very least, it'd be RESTful.
* That said, it feels pretty unppealing to have a system where (different subsets of a Rails resource's CRUD requests) use both a different URI _and_ a different controller.
* Finally, I couldn't find a clear way to get at the password-protection provided by `update_with_password`, the method on `lib/devise/models/database_authenticatable.rb#L83`. The containing module is provided to the `User` model via `devise_for`, but it still feels dangerous to call it from outside the Devise system entirely (_while it's admittedly an unlikely event that you later rip out devise **and** forget to refactor the_ `#update` _action... well, I've done dumber in the past._)

Eventually, I settled on my initially-least-favorite option: adding more form-fields to hitch a ride as params via the preexisting Devise routes.
* You can do this b/c the update action on the `Devise::RegistrationsController` [will apply any (permitted) params](https://github.com/plataformatec/devise/blob/master/app/controllers/devise/registrations_controller.rb#L46) that were sent over the wire.
* The one crucial drawback, here, is that this prevents any substantive future expansions to the controller action: it isn't accessible unless you either...
  * first extract, then monkeypatch the method (_and I suspect there's a reason why it's not called responsibleDeveloperWhoIsNotHatedByAllTheirColleaguesToFollowpatch_), or 
  * decorate the Devise action using [the latter option in Section 04 of 'configuring controllers'](https://github.com/plataformatec/devise#configuring-controllers) -- but even then, you need to go into the source code to locate the `yield resource if block_given?` line for that particular method -- and you're thus stuck calling your code at that specific point within the execution of the original controller action.
* Now, within that constraint around the controller action, the form is trivial to tweak, or to remove when there's a need for greater business logic (_it's ~two dozen lines of boilerplate ERB, or less once you've extracted the form-field creation into an_ `.each` _block._)

And then, finally, came...

## Add 'Search Colleagues' Capability

I knew I didn't want to [1] write AR scopes, plus the logic to conditionally chain them together, on a project wherein both vectors would change rapidly, frequently, and significantly, or to [2] learn ElasticSearch. (_Extra servers? Extra spooky!_)

The middle ground, here, appeared to be the [Ransack gem;](https://github.com/activerecord-hackery/ransack/blob/master/README.md) how to implement it, though, raised similar questions around how to deviate from Platonic RESTfulness as elegantly as possible.

Eventually, I settled on the following:

```
// Add `get "/colleagues", to: 'application#search_colleagues'` 
// to `config/routes.rb`

// Add `def search_colleagues end` 
// to `app/controllers/application_controller.rb`

// Add `before_action :authenticate_user!, only: [:search_colleagues]` 
// to `app/controllers/application_controller.rb`

// Create `app/views/application/search_colleagues.html.erb`

// Add `gem 'ransack'` 
// to `Gemfile`

ednorth $ bundle install

// Add `@people = User.ransack(params[:q]).result(distinct: true)` 
// to `search_colleagues` controller action

// Add `search_form_for` 
// to `search_colleagues` view

// Create seeds.rb file for 10 colleagues via a potpourri of ipsum-generators
```
One (_discarded_) option was to add Ransack search via a custom method in the `users/registrations` controller
* As mentioned above (_and, again, demonstrated [here](http://devise.plataformatec.com.br/#configuring-controllers)_), this is emininently feasible.
* However, it seems like it would result in an unsemantic overlapping: searching for _other_ users, via their profile information, really has nothing to do with a given user's "_registrations,_ as defined within the Devise gem.
* Moreover, I'd already elected against modifying the actions on the `users/registrations` controller, when considering how to quickly tag-along other `User`-model forms: no reason to undermine that decision here.

I'd also considered adding a method to a new, Devise-unrelated e.g. `UsersController`.
* There are terminological problems with this solution: we'd then have a `UsersController`, and a `Devise::RegistrationsController`... but they would both interact with the `User` model, and in fact the only controller that would act *on* that model would be... the `Devise::RegistrationsController`.
* As in the prior option, there's the problem of overlap with the earlier selection of how to expand CRUD options on new `User` fields: it seems pretty confusing to create a `UsersController`, but then not actually use it for any CRUD actions on the `User` model (!)

For a while, I'd considered a method on a new, Devise-unrelated e.g. `SearchesController`.
* This, at least, would be definitively less confusing for future developers.
* However, it still felt excessive, unless I was to include multiple actions on the controller... and whole point of including `Ransack` gem was to get a lightweight abstraction around that sort of functionality.

Ultimately, and somewhat ambivalently, I simply added a new method to `ApplicationController`.
* It feels less semantic than the `SearchesController`, and I'm not crazy about that.
* I was tipped toward this solution, though, by how minimal the code change is: it's easy to refactor in response to future requirements (_remove one method and one ERB file!_)

In both cases, then, my solution was to go with "_not the rightest, but the lightest_" code. Catchy. Probably not wise: but catchy.
---
title: Revisiting Notes on 'Mentor-Finder'
date: "2019-06-19"
template: "post"
draft: false
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
// Add `configure_permitted_parameters` methods to `app/controllers/application_controller.rb` for `account_update` and `sign_up` methods

// Create `db/migrate/20190608202058_add_details_to_users.rb` migration to add fields below to `users` table

// Add 'first_name last_name bio can_help need_help interested_in' form-fields to `app/views/devise/registrations/edit.html.erb`

// Add `first_name last_name` form fields to `app/views/devise/registrations/new.html.erb`
```

* how to expand create/update fields for User model...
1. Add separate has_one association on new UserProfile model
* allows lots of future expansion on profile details, especially if modeling of users becomes more complex than 'five <input type=text> sending data back to be stored as raw strings'
* more joins... bad for perf (though admittedly trivial in this context)
* Any scenario where you'd want latter to exist w/o former? (for former to exist w/o latter, can just leave fields
empty) If not, feels like unnecessary complexity...

2. add new /profile/ uri that routes (via `routes.rb`) to a new action on a new UsersController?
* Restful, at least
* Not terribly appealing that (different members of the resource's set of CRUD requests) use different URI _and_ controller
* how to get at the password protection provided by `lib/devise/models/database_authenticatable.rb#L83`, `update_with_password`? The containing module is provided to the `User` model via `devise_for`, but it still feels dangerous to call it from outside the Devise system entirely (admittedly it's an unlikely even that you rip out devise _and_ forget to also refactor the #update action, but... eh, I've done stupider.)

3. add more form fields to hitch a ride as params via the preexisting devise routes?
* You can do this b/c the update action on the Devise::RegistrationsController will apply any (permitted) params that
were sent over --
https://github.com/plataformatec/devise/blob/master/app/controllers/devise/registrations_controller.rb#L46
* big drawback: prevents any future changes -- the controller action isn't accessible unless you first extract (per link below), then either monkeypatch the method (suspect good reason why it's not called responsibledeveloperwhoisn'thatedbyalldeveloperstocomepatch), or decorate it using (find the line that begins "_Or you can simply add new behaviour to it:_" -- but even then, you need to go into the source code to find the `yield resource if block_given?` line -- and you're thus stuck calling your code at that particular point within the execution of the original controller action.
* now, that said... super easy to tweak minorly, within those constraints, or remove when there's a need for greater business logic (it's ~two dozen lines of boilerplate ERB, or less once you've extracted the form-field creation into a .each block)

Rather than “at work,” just describe how “I’ve seen another in production rails code base using device which got around this by having a separate set of API end points for CRUD functionality on the user profile for Fields which shouldn’t require re-entering your password or otherwise unrelated to the “registrations resource.”

## Add 'Search Colleagues' Capability

```
// Add `get "/colleagues", to: 'application#search_colleagues'` to `config/routes.rb`

// Add `def search_colleagues end` to `app/controllers/application_controller.rb`

// Add `before_action :authenticate_user!, only: [:search_colleagues]` to `app/controllers/application_controller.rb`

// Create `app/views/application/search_colleagues.html.erb`

// Add `gem 'ransack'` to `Gemfile`

ednorth $ bundle install

// Add `@people = User.ransack(params[:q]).result(distinct: true)` to `search_colleagues` controller action

// Add `search_form_for` to `search_colleagues` view

// Create seeds.rb file for 10 colleagues via a potpourri of ipsum-generators
```

 * how to add Ransack search...
1. via custom method in 'users/registrations' controller
* extracted as suggested here: http://devise.plataformatec.com.br/#configuring-controllers
* seems like unsemantic overlapping: searching for _other_ users, via their profile information, really has nothing to
do with their 'registrations'

2. via new method in new, devise-unrelated e.g. 'UsersController'
* Confusing: we have a 'UsersController', and a 'Devise::RegistrationsController'... but they both interact with the
'User' model, and in fact the only controller that acts *on* that model is... the RegistrationsController (same problem
as in first one, only exacerbated.)
* problem of overlap w/ above decision: you created a 'UsersController', but don't actually use it for any CRUD actions
on the User model?!

3. via new method in new, devise-unrelated e.g. 'SearchesController'
* less confusing for future readers
* still doesn't feel great, unless we were going to have multiple actions (whole point of including Ransack gem is to
get lightweight abstraction of that)

4. as you did it (on application controller)
* last point - want this to be minimal - is what prompted this decision
* easy to refactor (remove one method and one ERB file) in response to future requirements


In both cases, then, my solution was to go with "not the rightest, but the lightest" code. Catchy. 
---
title: How to Interview Your Ruby on Rails Developer (Ruby Garage)
date: "2018-06-05"
template: "post"
draft: false
slug: "/posts/ruby-dev-interview-notes/"
category: "What I Read"
tags:
  - "Ruby"
  - "Rails"
  - "Server"
description: "Notes I took while on the job hunt, prepping for interviews. Mostly this took the form of copying a question, finding the answer in the main Rails guides, and excerpting it below. (Tagline: \"This article will come in handy for you when you need to test a Ruby on Rails programmer but aren’t sure what questions to ask the Rails interviewee. You can consider this article as a guide for how to interview a Ruby on Rails programmer.\")"
---

## The First Series of Ruby Questions: OOP
**What is a class?**
    * A class in Ruby is a first-class object — each is an instance of class `Class`.
    * When a new class is created, an object of type `Class` is initialized and assigned to a global constant (`Name`, in this example).
    * When `Name.new` is called (to create a new instance of the class), the new method in `Class` is run.

**What is the difference between a class and a module?**
   * Modules are very much like classes, only modules can't create instances and can't have subclasses. 
   * They're just used to store things.
   * It doesn't make sense to include variables in modules, since variables (by definition) change; instead, use a constant.

**What is an object?**
   * Everything in Ruby is an object, in the sense that everything inherits from the Object class (which itself extends the `Kernel` module.)
   * What you think of as an object (from e.g. JS) is called a hash in Ruby.

**Explain how (almost) everything is an object in Ruby.**
   * Argument lists are part of the syntax of the language: they’re not objects.
   * Keywords like `if`, `class`, `alias`, `begin`, `end`, and `rescue` also aren’t objects.
   * Every Ruby statement or expression, however, evaluates to an object. 
   * This is true not only of variables, object literals, and method calls, but also of control-flow structures, keyword-based statements, class and method definitions, and everything else. 
   * Now, many (most?) times, the object a statement evaluates to will be `nil`... but it’s still an object!

**How would you declare and use a constructor in Ruby?**
   * Whenever Ruby creates a new object, it looks for a method named `initialize` and, if it’s present (say b/c you’re instancing from a class), executes it. 
   * You can thus use an `initialize` method to put default values into the instance variables of each instance.

**How would you create getter and setter methods in Ruby?**
   * Use e.g. `attr_reader(:bar)` to create a getter for the @bar instance variable;
   * Use e.g. `attr_writer(:bar)` to create a setter; 
   * Use e.g. `attr_accessor(:bar)` to create both. This final one would be the same as writing: 

```ruby
def bar
  @bar
end

def bar(value)
  @bar = value
end
```

**Describe the difference between class variables and instance variables.**
   * A variable prefixed with two at-signs is a class variable, accessible within both instance and class methods.
   * An instance variable has a name beginning with one at-sign, and its scope is confined to whatever object self refers to.
   * Two different objects, even if they belong to the same class, are allowed to have different values for their instance variables.
   * You’ll generally want to use instance variables.

**What are the three levels of method access control for classes and what do they signify?**
   * Methods are **public** by default in Ruby: and anyone can call them.
   **Protected** methods can be invoked only by objects of the defining class and its subclasses (i.e. access is kept within the family.)
   **Private** methods can only be called from other code inside the object.
      * Another way to say this is that the method cannot be called with an explicit receiver:
      * e.g. whenever you call `sample_instance.method`, the `sample_instance` object is the “receiver” of method. 
      * With private methods, the receiver is always `self`.

**What does `self `mean?**
   * The "current object" and the default receiver of messages (method calls) for which no explicit receiver is specified.
   * In a method, the object on which the method was called is `self`;
   * In a class or module definition (but outside of any method definition therein), `self` is the class or module object being defined.

**Explain what singleton methods are.**
   * The behavior of an instance is determined by its class, but there may be times we know that a particular instance should have special behavior. 
   * In most languages, we must go to the trouble of defining another class, which would then only be instantiated once (this is called the “singleton pattern.”) 
   * A singleton method is method attached only to a single object: this is more common in Ruby. [Example syntax here.](https://ruby-doc.org/docs/ruby-doc-bundle/UsersGuide/rg/singletonmethods.html)

**What is Eigenclass in Ruby?**
   * Singleton methods of an object are instance methods of the anonymous eigenclass associated with that object.
   * It can also be called the singleton class or metaclass for that object.
   * Ruby defines a syntax for opening the eigenclass of an object and adding methods to it (to define any number of singleton methods at once.) 
   * To open the eigenclass of the object `foo`, use `class << o`.

**Describe Ruby method lookup path.**
   * It’s basically the route or sequence by which Ruby checks whether an object has access to the method that it’s calling.
   * [The hierarchy is described here.](https://stackoverflow.com/questions/23848667/ruby-method-lookup-path-for-an-object/23848960#23848960)

**Describe available Ruby callbacks. How can we use them in practice?**
   * The short answer is to use a block (or Proc, or lambda).
   * [This SO post](https://stackoverflow.com/questions/1677861/how-to-implement-a-callback-in-ruby/1678280#1678280) gives a very nice comparison between C-style (and, somewhat, JS-style) callback syntax vs that of Ruby’s blocks.

**What is the difference between Proc and lambda?**
   * A lambda checks the number of arguments passed to it (and throws an error if you pass it the wrong number of arguments), whereas a proc will 1) ignore unexpected arguments and 2) assign nil to any that are missing.
   * When a lambda returns, it passes control back to the calling method; when a proc returns, it does so immediately, without returning to the calling method.

## The Second Series of Ruby Questions: Business Applications
**What is Rack?**
  * a web server interface (a standardized way for Ruby applications to talk to web servers); 
  * a protocol for building and composing web applications, that is:
      * a Ruby object with a `call` method. 
      * That method should accept an environment hash describing the incoming request and then
      * return a three-element array in the form of [HTTP status code, hash of HTTP headers, response body]); and 
  * a collection of middleware utilities (that is, Rack applications that get initialized with another Rack application, then stacked together).
  * TL;DR - Ruby:Rack::Python:WSGI !
  
## The Third Series of Ruby Questions: Ruby Gems
**What is RubyGems?**
   * Ruby npm

**What is bundler?**
   * Ruby `package.json` / `package-lock.json` generator (also lets you easily create your own gems)

**Can you give me some examples of your favorite gems besides rails?**
   * `devise` (for auth)
   * `delayed_job` (for background tasks)
   * `nokogiri` (for web scraping)

---

## Top Ruby on Rails Interview Questions
**What is ActiveJob? When should we use it?**
   * `ActiveJob` serves as a proxy between Rails and job-queuing gems (Sidekiq and delayed_job.) 
   * These gems are designed to perform tasks outside of the request cycle, like sending hundreds of emails. 
   * If you wanted to queue up your email to send through one of these systems, you’d use the `deliver_later` method. This method would queue up the job in whatever system you had configured with ActiveJob, and then the email would be delivered when the workers for that system got around to it.

**What is the Asset Pipeline?**
   * Sprockets gem: the Rails way of managing [CSS, JavaScript, and images].
   * It combines w/ assets from other gems, preprocesses, minifies, and concats.
   * In production: `bundle exec rake assets:precompile`
   * In previous versions of Rails, all assets were located in subdirectories of `public`; in Rails 4+, the preferred location is the `app/assets` directory.

**Explain the difference between [Page, Action, Fragment, Low-Level, and SQL] caching types.**
   * Page && action caching removed from Rails 4+.
   * Fragment caching is provided by default in Rails: when different parts of the page need to be expired separately, this stores a piece of view logic to be stored in the cache and served from there when the next request comes in.
   * Low-level caching is for caching a particular value or query result, rather than view fragments. You do so using the `Rails.cache.fetch` method.
   * If Rails encounters the same SQL request multiple times inside a single action, it’ll serve from a cache each time after the first: however, the cache only persists for the duration of that action.

**What is a Rails engine?**
   * Any Rails application is actually just a “supercharged” engine: the `Rails::Application` class inherits from `Rails::Engine`.
   * Engines are also closely related to plugins: they share a common `lib` directory structure and are generated by `rails plugin new`.
   * Engines can also be isolated from their host applications, providing  namespaced routing helpers, controllers, models, table names, etc. 
   * Devise is an engine (so are Thredded, Spree, and Refinery?)

---

## Routing, Controllers, and Views
**Provide an example of RESTful routing and controller.**
   * Instead of relying exclusively on the URL to indicate what webpage you want (and just using the one method), it's a combination of “verb” and “URL”.
   * The HTTP request forms the “verb” and the path forms the “URL”; together, they’re interpreted into a Controller action.
   * This composes a ‘resource’: a collection of objects that all belong in a common location (e.g. projects, users, or tickets.)

**Describe CRUD verbs and actions.**
   * Create - POST // New - GET
   * Index - GET // Show - GET
   * Update - PUT or PATCH (PATCH preferred) // Edit - GET
      * PATCH is a method that is not safe, nor idempotent, and allows full and partial updates and side-effects on other resources.
      * From the RFC: “The existing HTTP PUT method only allows a complete replacement of a document. This proposal adds a new HTTP method, PATCH, to modify an existing HTTP resource.”
      * That is: one is for when you know all the answers, and the other is for updating little bits at a time.
   * Destroy - DELETE

**How should you test routes?**
   * As part of controller tests (per official docs)
   * Within integration tests (as part of full workflow)
   * For MiniTest (?), use `assert_routing`
   * [We followed this example](http://geekhmer.github.io/blog/2014/07/30/test-routes-with-rspec-in-ruby-on-rails/) on WhichWay, I suspect.

**How should you use filters in controllers?**
   * Filters are methods that run "before", "after" or "around" a controller action.
   * Most common use case: demand authentication before running an action.
   * Inherited: so careful which controller you add them to.
   * Use skip_before_action on actions you want not to run the filter on.

**What are Strong Parameters?**
   * Added in Rails 4+; replaced `attr_accessible` (now lists at controller, not model, level -- for greater flexibility.)
   * Often discovered via `ActiveModel::ForbiddenAttributesError` response.
   * Prevents users from submitting any parameters beyond those you explicitly allow; and allows you to require certain parameters as well.

**What do we need to test in controllers?**
   * Soft-deprecated in Rails 5: now use functional, not unit/integration, tests
   * Detailed examples of how to upgrade w/in rspec [here](https://everydayrails.com/2016/08/29/replace-rspec-controller-tests.html) and [here](https://everydayrails.com/2016/09/05/replace-rspec-controller-tests.html)

**How should you use `content_for` and `yield`?**
   * Rails_4_in_Action has a good example on p. 76-77.
   * content_for?(:foo) checks whether the code block :foo is defined somewhere; if so, yield goes to that :foo and enacts whatever it returns.

**How should you use nested layouts?**
   * Nested layouts are sub-templates.
   * They’re used to prevent (duplicating the main layout, then editing it) when one page would vary slightly from your regular application’s HTML/CSS.

## Active Record
**Explain the Active Record pattern.**
   * Objects carry both persistent data, and behavior which operates on that data.
   * Ensuring [data access logic as part of the object] will educate [users of that object] on how to write to and read from the database.

**What is Object-Relational Mapping?**
   * It connects (maps) application objects to tables in an RDBMS. 
   * This lets you avoid writing SQL statements directly, with less overall database access code.

**Describe Active Record Naming Conventions.**
   * Database Table: plural, lowercase, underscores (e.g., `book_clubs`)
   * Model Class: singular, camelcase (e.g., `BookClub`)

**Describe Active Record Schema Conventions.**
  * By default, an integer column named id is the table's primary key.
  * Foreign keys should be named following the pattern `singularized_table_name_id `(e.g., `item_id`, `order_id`).
  * There are also several reserved column names (e.g. `created_at`, `updated_at`, `lock_version`, `type`, etc.)

**Explain the Migrations mechanism.**
   * DSL for managing a database schema
   * Convenient, consistent way to alter your database schema over time
   * Doesn’t use SQL, so it’s database-independent
   * Each migration describes a new 'version' of the database

**Describe types of associations in Active Record.**
   * `belongs_to` and `has_one` associations are similar. The foreign key goes on the table for the class declaring the `belongs_to` association. If a model `has_one` or `has_many`, then its primary key becomes the foreign key in the other model.)  
   * `has_many` association: indicates a one-to-many connection; otherwise, same as `has_one`
   * `has_many :through` association: sets up a many-to-many connection with another model. This association indicates that the declaring model can be matched with zero or more instances of another model by proceeding through a third model. 
   * `has_one :through` association: what you’d expect, based on above.
   * `has_and_belongs_to_many` association: creates a direct many-to-many connection with another model, with no intervening model.

**What are Scopes? How should you use them?**
   * They’re methods inside a given Model class.
   * When called as a method on the class, they perform the described ActiveRecord queries (e.g. where, joins, includes, etc.), then returns an ActiveRecord object on which you can call further methods.

**Explain the difference between optimistic and pessimistic locking.**
   * Optimistic locking: multiple users can access the same object to read its value: but if two users perform a conflicting update, only one user will succeed (the latter will get an ActiveRecord::StaleObjectError exception.)
   * Pessimistic Locking: only the first user accessing the record will be able to update it; other users will be excluded from even reading the object until the update is complete.
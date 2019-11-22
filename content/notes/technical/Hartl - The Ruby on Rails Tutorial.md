---
date: "2019-11-21"
template: "post"
draft: true
slug: "/posts/hartl-ruby-rails-tutorial-notes/"
category: "What I Read"
tags:
  - "Rails"
  - "Hartl"
description: "Notes extracted from a codealong to the Hartl tutorial."
---

The e.g. `<title>Welcome to the <%= yield(:title) %> Page</title>` line pairs with adding e.g. the <% provide(:title, "Home") %> method in the relevant page or partial (e.g. `landing_page.html.erb`)
Experienced Rails developers might have expected the use of `content_for` at this point, but it doesn’t work well with the asset pipeline. The `provide` function is its replacement. ([See here](https://stackoverflow.com/a/32766186) for more on the difference between them.)

The Rails method `csp_meta_tag` implements Content Security Policy (CSP) to mitigate cross-site scripting (XSS) attacks

The Rails method `csrf_meta_tags` mitigates cross-site request forgery (CSRF) attacks.

For a list of common minitest assertions, see [the table of available assertions](https://guides.rubyonrails.org/testing.html#available-assertions) in the Rails Guides testing article.

By default, the console starts in a `development` environment, which is one of three separate environments defined by Rails (the others are `test` and `production`)

- It’s easier to describe what objects do, which is respond to messages.
  - Typically, the messages that get passed to objects are methods, which are functions defined on those objects.
  - Modules give us a way to package together related methods, which can then be mixed in to Ruby classes using `include`.
  - In addition to coming equipped with a large number of built-in functions for use in views and controllers, Rails also allows the creation of new ones.
    - Such functions are called helpers.
    - In the case of a `*_helper` module Rails handles the inclusion for us.

The block inside `map` involves calling a particular method on the block's variable; in some cases in this case there’s a commonly used shorthand called “symbol-to-proc”: `%w[A B C].map { |char| char.downcase } => ["a", "b", "c"] >> %w[A B C].map(&:downcase)`

Using `inspect` to `print` an object is common enough that there’s a shortcut for it, the `p` function

- One subtle difference, which is that `p` returns the object being printed while puts always returns `nil`.

When hashes are the last argument in a function call, the curly braces are optional.

- The line `stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload'` calls the `stylesheet_link_tag` function with two arguments: a string, indicating the path to the stylesheet, and a hash with two elements, indicating the media type and telling Rails to use the turbolinks feature.

Every class in Ruby ultimately inherits from `BasicObject`, which has no superclass itself.

- When learning about classes, it’s useful to find out the class hierarchy using the `superclass` method:

```
>> s = String.new("foobar") => "foobar"
>> s.class
# Find the class of s. => String
>> s.class.superclass
# Find the superclass of String. => Object
>> s.class.superclass.superclass
# Ruby has a BasicObject base class as of 1.9 => BasicObject
>> s.class.superclass.superclass.superclass => nil
```

- Ruby classes can be opened and modified, allowing ordinary mortals such as ourselves to add methods to them.

In Rails, the principal importance of instance variables is that they are automatically available in the views, but in general they are used for variables that need to be available throughout a Ruby class.

`initialize` is special in Ruby: it’s the method called when we execute `User.new`

- initializing objects using a hash argument, a technique known as mass assignment, is common in Rails applications.

Blocks are closures, which are one-shot anonymous functions with data attached.

In the Rails helper `link_to`, the first argument to link_to is the link text, while the second is the URL; the third argument is an options hash.

- `<%= link_to image_tag("rails.svg", alt: "Rails logo", width: "200px"), "https://rubyonrails.org/" %>`
- This example shows off the `image_tag` helper, which takes as arguments the path to an image and an optional options hash, in this case setting the alt and width attributes of the image tag using symbols.
- Because we used the `image_tag` helper , Rails will automatically find any images in the app/assets/images/ directory using the asset pipeline
- In the produced HTML, the `src` attribute doesn’t reference the `images` dir, instead using an `assets` directory common to all assets (images, JavaScript, CSS, etc.)
- On the server, Rails associates images in the `assets` directory with the proper `app/assets/images` directory, but as far as the browser is concerned all the assets look like they are in the same directory, which allows them to be served faster.

From the perspective of a typical Rails developer, there are three main features to understand about the asset pipeline:

- asset directories
  - The Rails asset pipeline uses three standard directories for static assets, each with its own purpose:
    - app/assets: assets specific to the present application
    - lib/assets: assets for libraries written by your dev team
    - vendor/assets: assets from third-party vendors (not present by default)
  - Each of these directories has a subdirectory for each of two asset classes: images and Cascading Style Sheets.
- manifest files
  - Once you’ve placed your assets in their logical locations, you can use manifest files to tell Rails (via the Sprockets gem) how to combine them to form single files. (This applies to CSS and JavaScript but not to images.)
  - Inside a given `application.css` manifest...
    - The line `*= require_tree` ensures that all CSS files in the `app/assets/stylesheets` directory (including the tree subdirectories) are included into the application CSS.
    - The line `*= require_self` specifies where in the loading sequence the CSS in `application.css` itself gets included.
- preprocessor engines

  - After you’ve assembled your assets, Rails prepares them for the site template by running them through several preprocessing engines and using the manifest files to combine them for delivery to the browser.
  - The three most common cases are .scss for Sass, .coffee for CoffeeScript, and .erb for embedded Ruby (ERb).
    - Sass supports a format called SCSS (indicated with a .scss filename extension), which is a strict superset of CSS itself; that is, SCSS only adds features to CSS, rather than defining an entirely new syntax.
    - Sass also supports an alternate syntax that does define a new language, which is less verbose (and has fewer curly braces) but is less convenient for existing projects

- Difference between `*_path` and `*_url`
  - The latter includes the full URL:
    ```
    root_path
    # => '/'
    root_url
    # => 'http://www.example.com/'
    ```
  - Convention is to use the `_path` format except when doing redirects, where we’ll use the `_url` form. (This is because the HTTP standard technically requires a full URL after redirects, though in most browsers it will work either way.)

Transform routes like `get 'static_pages/help'` to `get '/help', to: 'static_pages#help'`

- This new pattern routes a GET request for the URL /help to the help action in the Static Pages controller.

Many Rails developers use a shared directory for partials shared across different views. I prefer to...

- use the shared folder for utility partials that are useful on multiple views, while
- putting partials that are literally on every page (as part of the site layout) in the layouts directory.

`find_by` will be inefficient if there are a large number of users (because the relevant column isn’t indexed.)

If Active Record can’t find sth in the database `find` raises an exception.

The `update` method accepts a hash of attributes

- On success it performs both the update and the save in one step (returning true to indicate that the save went through).
- If any of the validations fail, the call to update will fail.
- This can be checked using the `errors` object generated on failure: `>> user.errors.full_messages => ["Name can't be blank"]`
- If we need to update only a single attribute, using the singular `update_attribute` bypasses this restriction by skipping the validations.

You can often pass an optional second argument to an assertion, in order to render a custom error message: `assert @user.valid?, "#{valid_address.inspect} should be valid"`

We need to enforce uniqueness at the database level as well as at the model level.

When included in a model, the `has_secure_password` method adds the following functionality:

- The ability to save a securely hashed `password_digest` attribute to the database
  - To make the password digest, `has_secure_password` uses a state-of-the-art hash function called `bcrypt`.
  - By hashing the password with bcrypt, we ensure that an attacker won’t be able to log in to the site even if they manage to obtain a copy of the database.
- A pair of virtual attributes (`password` and `password_confirmation`), including`presence` validations upon object creation and a validation requiring that they match
  - In this context, virtual means that the attributes exist on the model object but do not correspond to columns in the database.
- An `authenticate` method that returns the user when the password is correct (and false otherwise)
  - This method determines if a given password is valid for a particular user by computing its digest and comparing the result to `password_digest` in the database.
- The only requirement for `has_secure_password` to work its magic is for the corresponding model to have an attribute called `password_digest`.
- In this context, hashed password and password digest are synonyms.)

We can choose any migration name we want, but it’s convenient to end the name with `to_users`, since in this case Rails automatically constructs a migration to add columns to the `users` table. The result appears as follows: `$ rails generate migration add_password_digest_to_users password_digest:string`

It's confusing that the idiomatic commands to run the `console`, `server`, and `migrate` commands in non-default environments use different syntax.

- `rails console test`
- `rails server --environment production`
- `rails db:migrate RAILS_ENV=production`
- It’s worth noting, though, that preceding any of them with RAILS_ENV=<env> will also work, as in `RAILS_ENV=production rails server`.

A more direct way to get debugging information is to use the `byebug` gem

- add a line consisting of `debugger` to our application, a la

```
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    debugger
  end
end
```

- Now, when we visit `/users/1`, the Rails server shows a `byebug` prompt
- We can treat byebug like a Rails console, issuing commands to figure out the state of the application
- To release the prompt and continue execution of the application, press Ctrl-D

By default, methods defined in any helper file are automatically available in any view.

In Ruby, the MD5 hashing algorithm is implemented using the hexdigest method, which is part of the Digest library.

The options hash used in the previous exercise is still commonly used, but as of Ruby 2.0 we can use keyword arguments instead:

```
# Returns the Gravatar for the given user.
def gravatar_for(user, options = { size: 80 })

# same as
def gravatar_for(user, size: 80)
```

The presence of the `do` keyword indicates that `form_with` takes a block with one variable, which we’ve called `f` (for “form”).

- Note the presence of the hash argument `local: true` -- by default, form_with sends a “remote” XHR request, whereas we want a regular “local” form request, mostly so that our error messages will render properly
- When called with a method corresponding to an HTML form element -— such as a text field, radio button, or password field —- `f` returns code for that element specifically designed to set an attribute of the `@user` object.
- The key to creating a user is the special `name` attribute in each input: <input id="user_name" name="user[name]" - - - /> .
- These `name` values allow Rails to construct an initialization hash (via the `params` variable) for creating users using the values entered by the user.
- The second important element is the `form` tag itself: `<form action="/users" class="new_user" id="new_user" method="post">`
  - Because every Ruby object knows its own class, Rails figures out that `@user` is of class `User`.
  - Moreover, since `@user` is a new user, Rails knows to construct a form with the `post` method.
  - `action="/users"` and `method="post"` together constitute instructions to issue an HTTP POST request to the /users URL
- Just inside the form tag:

  - `<input name="authenticity_token" type="hidden" value="NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo=" />`
  - It includes an authenticity token, which Rails uses to thwart an attack called a cross-site request forgery (CSRF).

- The params hash contains information about each request.
  - Although the hash keys appear as strings in the debug output, we can access them in the Users controller as symbols, so that params[:user] is the hash of user attributes—
  - By passing in the entire params hash to User.new, we would allow any user of the site to gain administrative access by including `admin='1'` in the web request.
    - Previous versions of Rails used a method called `attr_accessible` in the model layer to solve this problem
    - As of Rails 4.0 the preferred technique is to use so-called strong parameters in the controller layer.
    - To facilitate the use of these parameters, it’s conventional to introduce an auxiliary method called `user_params` (which returns an appropriate initialization hash) and use it in place of `params[:user]`
    - Since user_params will only be used internally by the `Users` controller and need not be exposed to external users via the web, we’ll make it private using Ruby’s `private` keyword.

We render a partial called 'shared/error_messages'; this reflects the common Rails convention of using a dedicated `shared/` directory for partials expected to be used in views across multiple controllers.

The `errors.full_messages` object contains an array of error messages.

`any?`, together with `empty?`, is one of a pair of complementary methods.

The `pluralize` text helper, which is available in the console via the `helper` object. Underlying this method is a powerful inflector that knows how to pluralize a large number of words.

Although it’s possible to render a template for the `create` action, the usual practice is to redirect to a different page instead when the creation is successful.

Note that we’ve written `redirect_to @user` where we could have used the equivalent `redirect_to user_url(@user)` This is because Rails automatically infers from `redirect_to @user` that we want to redirect to `user_url(@user)`.

The Rails way to display a temporary message is to use a special method called the `flash`, which we can treat like a `hash`. Rails adopts the convention of a `:success` key for a message indicating a successful result.

We use the `follow_redirect!` method after posting to the users path. This simply arranges to follow the redirect after submission, resulting in a rendering of the 'users/show' template.

Use Secure Sockets Layer (SSL) to encrypt all relevant information before it leaves the local browser.

- Although we could use SSL on just the signup page, it’s actually easier to implement it site-wide.
- This has the additional benefit of securing user login and making our application immune to the critical session hijacking vulnerability.
- Although Heroku uses SSL by default, it doesn’t force browsers to use it, so any users hitting our application using regular http will be interacting insecurely with the site.
- Forcing browsers to use SSL is as easy as uncommenting a single line in production.rb: all we need to do is set `config.force_ssl` to `true`.
- Setting up a production site to use SSL involves purchasing and configuring an SSL certificate for your domain.
  - For an application running on a Heroku domain, we can piggyback on Heroku’s SSL certificate.
  - If you want to run SSL on a custom domain, such as www.example.com, refer to Heroku’s documentation on SSL.

HTTP is a stateless protocol, treating each request as an independent transaction that is unable to use information from any previous requests.

- This means there is no way within the Hypertext Transfer Protocol to remember a user’s identity from page to page;
- instead, web applications requiring user login must use a session, which is a semi-permanent connection between two computers.
- The most common techniques for implementing sessions in Rails involve using cookies, which are small pieces of text placed on the user’s browser.
- Because cookies persist from one page to the next, they can store information (such as a user id) that can be used by the application to retrieve the logged-in user from the database.

Use the Rails method called `session` to make temporary sessions that expire automatically on browser close.

- It’s convenient to model sessions as a RESTful resource: visiting the login page will render a form for new sessions, logging in will create a session, and logging out will destroy it.
- Unlike the Users resource, which uses a database back-end (via the User model) to persist data, the Sessions resource will use cookies.
- Session-creation errors won't be provided automatically by Active Record, because the session isn’t an Active Record object: render such errors as a flash message instead.
- We have no Session model, and hence no analogue for the `@user` variable. This means that, in constructing the new session form, we have to give `form_with` slightly different information:
  - whereas `form_with(model: @user, local: true)` allows Rails to infer that the action of the form should be to POST to the URL /users,
  - in the case of sessions we need to indicate the corresponding URL, along with the scope (in this case, the session): `form_with(url: login_path, scope: :session, local: true)`

The contents of a `flash` persist for one request, but —- unlike a redirect -— re-rendering a template with `render` doesn’t count as a request.

- The result is that the flash message persists one request longer than we want.
- Instead, replace `flash` with the special variant `flash.now`, which disappears as soon as there is an additional request,

Ruby provides a `module` facility for packaging (related functions for use across multiple controllers and views) in one place.

- A `Sessions` helper module will be generated automatically when generating a `Sessions` controller
- Moreover, such helpers are automatically included in Rails views;
- By including the module into the base class of all controllers (the Application controller), we make them available in our controllers as well
- Helper methods are not, however, available in tests.
- I like this technique because it connects to the pure Ruby way of including modules, but Rails 4 introduced a technique called `concerns` that can also be used for this purpose.

Treat the `session` method (defined by Rails) as if it were a hash.

- `session[:user_id] = user.id` places a temporary cookie on the user’s browser; his allows us to retrieve the id on subsequent pages using session[:user_id].
- The temporary cookie created by the session method expires immediately when the browser is closed.
- Temporary cookies created using the session method are automatically encrypted.
  - This applies only to temporary sessions initiated with the session method, though, and is not the case for persistent sessions created using the `cookies` method.
- Permanent cookies are vulnerable to a session hijacking attack, in which an attacker uses a stolen remember token to log in as a particular user.
- There are four main ways to steal cookies:
  - using a packet sniffer to detect cookies being passed over insecure networks (prevented by using Secure Sockets Layer (SSL) site-wide),
  - compromising a database containing remember tokens (prevented by storing a hash digest of the remember tokens instead of the token itself),
  - using cross-site scripting, or XSS (automatically prevented the third problem by Rails escaping any content inserted into view templates), and
  - gaining physical access to a machine with a logged-in user (minimized by changing tokens every time a user logs out and by taking care to cryptographically sign any potentially sensitive information we place on the browser).

We create persistent sessions as follows:

- Create a random string of digits for use as a remember token.
- Place the token in the browser cookies with an expiration date far in the future.
- Save the hash digest of the token to the database.
- Place an encrypted version of the user’s id in the browser cookies.
- When presented with a cookie containing a persistent user id, find the user in the database using the given id, and verify that the remember token cookie matches the associated hash digest from the database.
- Note how similar the final step is to logging a user in, where we retrieve the user by email address and then verify (using the `authenticate` method) that the submitted password matches the password digest.

We need a way to make a token available via user.remember_token (for storage in the cookies) without storing it in the database.

- The way to do this is to use `attr_accessor` to create an accessible attribute:

```
class User < ApplicationRecord
  attr_accessor :remember_token
  def remember
    self.remember_token = ...
    update_attribute(:remember_digest, ...)
  end
end
```

- Because of the way Ruby handles assignments inside objects, without `self` the assignment would create a local variable called `remember_token`.
- the second line of `remember` uses the `update_attribute` method to update the remember digest.
- This method bypasses the validations, which is necessary in this case because we don’t have access to the user’s password or confirmation.

As with `session`, we can treat the `cookies` method as a hash.

- A cookie consists of two pieces of information, a value and an optional expires date.
- We can set this like so: `cookies[:remember_token] = { value: remember_token, expires: 20.years.from_now.utc }`
- However, this pattern of setting a cookie that expires 20 years in the future is so common that Rails has a special permanent method to implement it, so that we can simply write `cookies.permanent[:remember_token] = remember_token`
- Because `cookies[:user_id] = user.id` places the id as plain text, this method exposes the form of the application’s cookies and makes it easier for an attacker to compromise user accounts.
- To avoid this problem, we’ll use a signed cookie, which securely encrypts the cookie before placing it on the browser: `cookies.signed[:user_id] = user.id`
- Signing and encrypting are different operations in general, but as of Rails 4 the signed method does both by default.
- On subsequent page views, we can retrieve the user with code like `User.find_by(id: cookies.signed[:user_id])` -- `cookies.signed[:user_id]` automatically decrypts the user id cookie.

Inside integration tests, we can’t manipulate session directly, but we can post to the sessions path, which leads to the `IntegrationTest` module's `log_in_as` method.

Inside a test, you can access instance variables defined in the controller by using `assigns` with the corresponding symbol.

- For example, if the create action defines an @user variable, we can access it in the test using assigns(:user). Right now,

The conventional order for the arguments to `assert_equal` is `assert_equal <expected>, <actual>`.

As a general rule, if a method doesn’t need an instance of an object, it should be a class method.

The use of `target="_blank"` in the link is a neat trick to get the browser to open the page in a new window or tab, which is sometimes convenient behavior when linking to third-party sites.

- There’s a minor security issue associated with using `target="_blank"` to open URLs, which is that the target site gains control of what’s known as the “window object” associated with the HTML document.
- The result is that the target site could potentially introduce malicious content, such as a phishing page.
- This is extremely unlikely to happen when linking to a reputable site, but we can eliminate the risk entirely by setting the rel attribute (“relationship”) to "noopener" in the origin link. Add this attribute

Note the hidden input field: `<input name="_method" type="hidden" value="patch" />`

- Since web browsers can’t natively send PATCH requests, Rails fakes it with a POST request and a hidden input field.
- How does Rails know to use a POST request for new users and a PATCH for editing users? When constructing a form using form_with(@user), Rails uses POST if @user.new_record? is true and PATCH if it is false.

You can use the `session` hash for many things, e.g. storing a URL the user's initially trying to be accessed (to redirect them there later):

```
def store_location
  session[:forwarding_url] = request.original_url if request.get?
end
```

redirects don’t happen until an explicit return or the end of the method, so any code appearing after a `redirect` is still executed.

In `<ul class="users"> <% @users.each do |user| %> <%= render user %> <% end %> </ul>` we call `render` not on a string with the name of a partial, but rather on a `user` variable (of class `User`).

- In this context, Rails automatically looks for a partial called `_user.html.erb`.
- The name user is immaterial: we could have written `@users.each do |foobar|` and then used `render foobar`. The key is the class of the object: in this case, `User`.

We can even call `render` directly on the `@users` variable: `<ul class="users"> <%= render @users %> </ul>`

- Here Rails infers that `@users` is a list of `User`-class objects;
- Moreover, when called with a collection of users, Rails automatically iterates through them and renders each one with the `_user.html.erb` partial (again inferring the name of the partial from the name of the class).

The command for before filters used to be called `before_filter`, but the Rails core team decided to rename it to emphasize that the filter takes place before particular controller actions.

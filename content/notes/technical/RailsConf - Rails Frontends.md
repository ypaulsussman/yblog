## Old-school Javascript in Rails (RailsConf 2018, Graham Conzett)

- Remember: `form_with` gives you `remote: true` by default, as of Rails 5.
- In e.g. `create.js.erb`:
  - For `const content = '<%= j render @playlist_item%>'`, the `j` is shorthand for `escape_javascript()`
  - For `document.getElementByID('playlist_items').insertAdjacentHTML('beforeend', content)`, the position of `insertAdjacentHTML` can be either `beforebegin`, `afterbegin`, `beforeend`, or `afterend`, where `begin` and `end` refer to the "adjacent" anchor's tags.
  - For `document.querySelector('[action$="/playlist_items"]').reset()`, the selector here refers to the form (which is then cleared.)
- An example of the '_rjs-style_' of old, but using helpers:
  - In `application_helper.rb`
    ```ruby
    def hide(model)
      raw "document.getElementById('#{dom_id(model)}').style.display = 'none'"
    end
    ```
  - Then, in `playlist_items/destroy.js.erb`
    ```ruby
    <%= hide @playlist_item %>
    ```
  - Note in helper that `dom_id` is a [Rails-provided helper (https://api.rubyonrails.org/classes/ActionView/RecordIdentifier.html) that constructs an ID based on the model-name and the PK
- One repeated behavior: sharing a _partial_ between an HTML view and a JS view
  - In `helpers/application_helper.rb`...
    ```ruby
    def render_flash(partial: 'application/flash_notice', **locals)
      html = j render partial: partial, locals: locals
      raw "document.getElementById('flash').innerHTML = '#{html}'"
    end
    ```
  - Then, in e.g. `playlist_items/update.js.erb`, use as `<%= render_flash message: 'Updated' %>`
  - Good if e.g. someone has JS disabled, or there's a page you don't _want_ to use JS
- Common method for dealing with soft deletes is to create a second controller, and just treat the "deleted" items as a second resource:

  - `DestroyedPlaylistItemsController` will only look for non-destroyed-items, and the only change it allows is to set the `destroyed_at` field (_or, in practice, more likely a virtual attribute_):

    ```ruby
    class DestroyedPlaylistItemsController < ApplicationController
      before_action :set_playlist_item, only: :update

      def update
        @playlist_item.update playlist_item_params
      end

      private

      def set_playlist_item
        @playlist_item = PlaylistItem.unscoped
          .where.not(destroyed_at: nil).find params[:id]
      end

      def playlist_item_params
        params.require(:playlist_item).permit :destroyed_at
      end
    end
    ```

  - Then `PlaylistItemsController` will then have a simple `before_action` such as:
    ```ruby
      def set_playlist_item
        @playlist_item = PlaylistItem.unscoped
          .where.not(destroyed_at: nil).find params[:id]
      end
    ```
  - This respects returning a `404` on searching for a now-'deleted' route, but also
  - Allows for the creation of e.g. an `Undo` button that will send a remote/XHR `PIC#update` request to revert `destroyed_at` to `nil`
  - Both the 'soft delete' and 'undo/restore' requests can then use a `respond_to ... format.js` in their controller actions to return a script that _hides_, rather than removing, the 'deleted' item from the DOM.

- Interesting idea: inside `ApplicationRecord` Model, create an e.g. `copy_attrs` method that just strips out `created_at`, `updated_at`, `id`, and any fields that end in `*_id` (_i.e all timestamps and primary/foreign keys_)
- Important side note: under the hood, `url_for`, `redirect_to`, and `form_for` are all using the [PolymorphicRoutes](https://api.rubyonrails.org/classes/ActionDispatch/Routing/PolymorphicRoutes.html) module.
- Rails' `ujs` library's primary system is to provide additional functionality by adding information onto HTML elements via `data-*` attributes.
- Ah, great: sorting and filtering are cases where using raw JavaScript and the request-response cycle _doesn't_ work out that well. Hey, good to know for the `Author`-filter on OPL...

## 6 degrees of JavaScript on Rails (RailsConf 2018, Michael Crismali)

- One way to keep non-idempotent behaviors safe: `f.submit data: { "disable-with": "Saving now..." }`
- Common uses for jQuery/widgets in 'traditional' Rails: typeaheads, custom dropdowns, draggables, fadeouts.
- Stimulus follows the `ujs` model of "lots and lots of `data-*` attrs"
- Good to use for JavaScript-heavy rendering: if you have (_long, convoluted, multistage_) forms and you don't want [1] people who "fall out" while completing them to need to start over, or [2] to have dozens of routes/controllers/`fields_for`/etc.
- If you don't want to go full SPA, you can have each controller-action's e.g. `app/views/my_resource/new.html.erb` just render:
  ```html
  <div id="my-resource-builder-wizard"></div>
  <%= stylesheet_pack_tag "my-resource-builder-wizard"%> <%= javascript_pack_tag
  "my-resource-builder-wizard"%>
  ```
  - You'd then have `my-resource-builder-wizard.jsx`
    - define the `<MyBuilderWizard/>` React component, and
    - run `ReactDOM.render(<MyBuilderWizard/>, document.getElementById("my-resource-builder-wizard"))`
  - Webpack will take care of the asset-scoping and processing for both CSS/JS
  - This philosophy can even be expanded to where you e.g. have
    ```ruby
    get "admin/*path", to: "pages#admin"
    get "/*path", to: "pages#app"
    ```
  - wherein each of the two views just calls different `*_pack_tag`s, each of which manages its own client-side routing

## Look Before You Import: A Webpack Survival Guide (RailsConf2018, Ross Kaffenberger)

- Sprockets and Webpack have the same goal: packaging assets (_JavaScripts, stylesheets, fonts, images_) before sending them to the browser
  - When Sprockets combines your JavaScripts, it does so via file concatenation
  - When Webpack combines your JavaScripts, it converts each script to a separate, static module (_with its own separate scope inside the browser_)
- Three common scenarios when using Webpack:
  - Organizing code
    - In Sprockets, `app/assets/javascripts` files get compiled into `public/assets/javascripts` files
    - In Webpack, `app/javascript` files get through to the `app/javascript/packs` files (which are "_entries,_" and correspond 1:1 to "_output_" files inside `public/packs`)
      - As a result, be very sparing with which `.js` files you add to the `app/javascript/packs` dir: each one will be "_emitted_" as a separate bundle
      - Note too that in Sprockets you can add e.g. `//= require_tree ./../some_dir` to get all that dir's files; in Webpack, you'll need to use the `require.context` API, then iterate through the dir's files
  - Managing dependencies
    - For code-splitting, let Webpack do the work: use the [`SplitChunksPlugin`](https://webpack.js.org/plugins/split-chunks-plugin/) (_'chunk' is another synonym for 'bundle'_)
    - For module-shimming (_i.e. applying filetype transformations_), Sprockets has 'preprocessors'; Webpack has 'loaders'
    - Webpack allows you to inject dependencies _into_ legacy modules, via options on the `imports-loader` loader: then you don't have to e.g. toss `jQuery` on the global scope
  - Predictable caching
    - Webpack just recursively reads the `import` statements of every file that a given entry itself `import`s
    - As such, if you are code-splitting dependencies that are `import`ed across multiple bundles, those bundles may have their fingerprint digest change at times you don't expect (because even though no code inside of _them_ changed, some code which they `import` did change its location within the _other_ bundle).
- Asynchronous bundling: a nifty Webpack feature
  - If you `import` at the top of a file, it'll automatically get added to the given bundle
  - You can instead put very large-size dependencies _inside_ a function:
    - in this case, Webpack will separate out the dependency into a separate bundle, then
    - only request that bundle onto the user's machine at the time that the function is evaluated in the browser.
  - This really is one of the key features of Webpack: prioritize this 'on-demand' bundling

## Webpacking for the journey ahead (RailsConf 2018, Taylor Jones)
- On its own, Webpack can only understand/bundle JavaScript; 
  - to compile other filetypes, it needs to use one of the various Loaders (_which run at the individual file level, before/while the bundle is generated_)
  - to compress/minify/customize compiled code, needs to use on the various Plugins (_which run at the bundle level, after-or-rarely-while the bundle is generated_)

## Webpacker vs Asset Pipeline (RailsConf 2019, Danielle Gordon)
- When configuring Webpack, start with an "entry": this is simply the file(s) you want to compile down. 
- An entry can be any filetype: `.js`, but also `.jsx` or `.vue` or even e.g. `.png`
- Note that loaders work in reverse order (of their listing in the `use:`-key's array)
- The `public/packs` dir will not only contain the processed files, but also their `.map` files
- Webpack will only add unique dependencies, whereas Sprockets naïvely concatenates (_and thus will frequently end up with a duplicated code_)

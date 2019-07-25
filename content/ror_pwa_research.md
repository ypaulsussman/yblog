
1. RoR PWA to shoot you a daily quote from _Other People's Lines._
    * Major goal: familiarize w/ webpacker-in-rails, and PWA's / lighthouse audits.
        * _In the below, write notes for each action you take, focusing especially on..._ 
        1. _your decision-making process,_ 
        1. _articles/books that you reference, and_ 
        1. _unexpected issues you encounter._
    * PWA research:
        * https://johnbeatty.co/2019/01/08/easy-pwas-the-rails-way/
        * https://www.youtube.com/watch?v=JOcs__ofsps
        * https://rossta.net/blog/make-your-rails-app-a-progressive-web-app.html 
        * https://keithpblog.org/post/rails-5-progressive-web-app/
    * Hygiene:
        * upgrade brew
        * upgrade postgres
        * upgrade rvm
        * upgrade ruby
        * upgrade nvm
        * upgrade node
        * upgrade yarn
    * Set up db and routes:
        * https://edgeguides.rubyonrails.org/active_record_postgresql.html#uuid-primary-keys (except make the `enable_extension` its own, first, migration)
        * rails g migration CreateAuthors name:string
        * rails g migration CreateQuote passage:string author:references
        * rails g scaffold Authors
        * rails g scaffold Quotes
    * Seed db
        * https://gist.github.com/arjunvenkat/1115bc41bf395a162084
        * pull in both csv's
        * for author csv, just add each name to new record;
        * for quote csv, lookup author by name, then grab id and write to author_id 
    * add a counter-cache for quotes, on the authors model (see notes in GoRails basics); 
        * when you delete a quote, 
        * check if the author's counter cache is 0; 
        * if so, delete the author
    * after MVP:
        * devise to require login
        * pundit to create 'admin' and 'user' policies
            * admin can CRUD quotes
            * admin can RUD users
            * users can R quotes
            * (optional) users can suggest quotes (add to 'suggestion' table; if admin approves, add to 'quotes' table)
        * Randomized associated images (parse quote to grab nouns/verbs; use ddg image search; grab associated image; copy it to the ) 

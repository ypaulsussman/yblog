---
title: Daily UA (The Somewhat-Successful Web App)
date: "2019-01-19"
template: "post"
draft: false
slug: "/posts/daily-ua-app-notes/"
category: "What I Do"
tags:
  - "Ed Tech"
  - "Teaching"
  - "Learning"
  - "Language Learning"
  - "Ukrainian"
  - "Google Cloud Platform"
  - "Rails"
  - "React"
description: "These are my thoughts on rereading a daily log I'd kept on my attempt to build a toy app that would deliver me Ukrainian news headlines."
---

### Overview and Takeaways

I started building the following two codebases ([one in React](https://github.com/ypaulsussman/daily_ua_frontend), and [one in Rails](https://github.com/ypaulsussman/daily_ua_api)) in the late spring of 2018: partially to force myself to code more after work, and partially to eventually provide a cheap, low-intensity, curiosity-engaging way to practice Ukrainian.

As it turned out, about two weeks into the project my then-employer shut down my division, giving me both extra time and extra impetus to work on it. Happy coincidence!

Alas, shortly thereafter events conspired to obviate both original purposes. I started a new job, thereby providing me _plenty_ of subjects to research in my extra-office time; almost simultaneously, I began practicing Ukrainian with a video tutor on a weekly to biweekly basis. (More that experience experience [in this post.](/posts/daily-ua-study-revisitation/))

Those changes combined with a general frustration and disappointment I’d felt while working through different hosting solutions; as a result... well, you can see the dates of the most-recent commits in the repos yourself. While I don’t think I’ll return to either codebase, or even the project's vision in general, I’m happy with experiences they provided. For me, the main takeaways were:

1. I'd heard/read the tactic of '_connect the stack, end to end, and only **then** add full features_' several times, and partially encountered it before: but it had been so long since I'd seriously worked on a toy app of my own that it was refreshing to have this precept reinforced, and (_this time, I think_) sealed in memory.
1. For you, at least, learning hosting is _very_ different from learning coding. 
  * You typically prefer learning by doing (_read: "hack around without a definite endgame and little but Stack Overflow as your Obi-Wan"_) in the programming space.
  * This was not in the least a successful strategy when it came to deploying the app, even for your rudimentary requirements.
  * Perhaps it was the relative paucity of documentation (_or simply the heterogeneity of problems that might manifest making that documentation_ seem _relatively sparser_); perhaps it was the unfamiliarity of the terrain (_who knew package versions and_ `.yml` _files were so punctilious_); perhaps it was the relative duration of the feedback loop (_10 minutes to build vs instantaneous, keypress-free refresh from a dev server_)... or, likely, a combination of all three, and others.
  * Regardless: for your next app, RTFM first. Get an O'Reilly book, or take the online AWS digital training. Ad hoc consultation didn't suffice: learning the basic vocabulary, prior to setting out, with which to conduct those consultations? That's what to try next.
1. Regardless of the rest of the experiment, one aspect paid off richly. The notes below were a great exercise, and one to repeat on my next project.
  * The notes below were originally written in plaintext; they transferred to markdown imperfectly. Next time, start with markdown.
  * Subdivision by date was useful; keep it.
  * Next time: beneath the date, include a statement of what you plan to achieve for a given day, and the expected substeps.
  * Next time: at the end of a given date, explicitly list what you'd learned in that day's coding.

So: above are the learnings I gathered from a couple weeks' work. Below, the notes that allowed me to gather them, several months on...

---

### Monday, 04/30

[Samuel Mullen Article](http://samuelmullen.com/articles/embracing-change-rails51-adopts-yarn-webpack-and-the-js-ecosystem/)
* This is a detailed but readable overview of what’s new in Rails 5.1, and how it allows for integration with js-based SPA’s.
* It also has a very clear intro to Webpack
* @Y: use this as reference when you get bogged down in Rails or Webpacker issues.

**React with Rails in API Mode**
* [Sitepoint Article](https://www.sitepoint.com/react-rails-5-1/)
  * @Y: this is the tutorial you want to use, I think.
* [SuperHighFives Article](https://medium.com/superhighfives/a-top-shelf-web-stack-rails-5-api-activeadmin-create-react-app-de5481b7ec0b)
  * `create-react-app` supports proxying API requests in development, so you can be running two servers locally without having to do `if NODE_ENV === ‘development’`
  * This also covers Rails 5 in API mode
  * Some unnecessary (but cute) commentary
  * Demonstrates ActiveAdmin integration, which may be useful?
  * @Y: good for double-checking against the sitepoint article
* [Bruno Boehm Article](https://medium.com/@bruno_boehm/reactjs-ruby-on-rails-api-heroku-app-2645c93f0814)
  * This article is at least partially based off the superhighfives article, above
  * It also has a slightly different method of deploying to Heroku
  * @Y: reference it if the two above don’t provide what you’re looking for
* [FullStack React Article](https://www.fullstackreact.com/articles/how-to-get-create-react-app-to-work-with-your-rails-api/)
  * Like the @bruno_boehm article, this seems to mostly cover the same elements as the first two
  * It has a nicely-illustrated description of the relationship between the two servers
  * @Y: reference it if the others above don’t provide what you’re looking for

**React within the Asset Pipeline**
* https://medium.com/@hpux/rails-5-1-loves-javascript-a1d84d5318b
  * `webpacker` gem coexists with asset pipeline: use it for app-like Javascript, not images/css/js snippets
  * continue to serve these from `app/assets` directory, via sprockets
  * `rails new myapp --webpack=react` to create app
  * replace everything in your view template w/ `<%= javascript_pack_tag 'hello_react' %>` to run the `hello_react.js` file when hitting that endpoint
  * run the rails server in one terminal and run the `webpack-dev-server` in another
  * @Y: I prefer other methods; I’m not interested in using the Sprockets asset pipeline.

* https://x-team.com/blog/get-in-full-stack-shape-with-rails-5-1-webpacker-and-reactjs/
  * Similar to the @hpux article (uses webpacker, no api mode)
  * Uses `jbuilder` gem to display JSON retrieved from endpoint
  * Uses `react-router` to create SPA
  * @Y: This is far more detailed than the @hpux article; however, it still mixes some Rails logic in the view (see e.g. `PagesController`) — which I’m not interested in at all.

---

### Tuesday, 05/01

Remember, with ActiveAdmin:
* Get your controllers to inherit from `ApiController`, not `ApplicationController`
* Read the comments _below_ the superhighfives article in order to integrate `react-router`

You've Learned:
* [Couple unexpected steps to changing Rails entirely over to Postgres](https://medium.com/@helenflam/how-to-change-your-rails-app-database-from-sqlite-to-postgresql-before-deploying-to-heroku-ae2acc25c7ac)
* [To use ActiveAdmin, you need to allow Sprockets, which by default is commented out in API mode](https://github.com/fgrehm/letter_opener_web/issues/46)
* Running `bin/rails g active_admin:install` multiple times (in case of e.g. an error) will ruin everything; run `rails destroy active_admin:install` (and possibly `db:drop`) before trying again. 

---

### Wednesday, 05/02

Research digression! These two articles describe how to set up something similar to the WW configuration:
* [Direct to S3,](https://www.fullstackreact.com/articles/deploying-a-react-app-to-s3/) and
* [In parallel with an API server.](https://www.fullstackreact.com/articles/deploying-a-react-app-with-a-server/)

The second finally explains, clearly, the difference between how the articles above deploy their two codebases: *and* how we did it in a former work project.

Takeaways: 
1) Redo the rails backend. Nuke and start over.
2) When starting over: use the `—-database=postgresql -T` flags, and perhaps others. research all available flags first.
3) When starting over: skip ActiveAdmin - YAGNI.

Also: you figured out how the WW apps are interacting!

* `package.json` includes `config.api.host.$whatever`;
* those variables gets set as the `REACT_APP_API_HOST` environmental variable in the `build:$whatever` script;
* `index.js` uses that variable to set `axios.defaults.baseURL`, which is used everywhere else for HTTP requests.

On the api side, we’re routing 
* `root to: 'homepage#index’`, which 
* is picked up in `homepage_controller.rb`, so 
* anyone hitting the API base URL will just get 4 lines of JSON detailing the app.

---

### Thursday, 05/03

Use [this article](https://medium.com/@jameshamann/deploying-rails-5-app-using-elastic-beanstalk-and-postgresql-8ca19bc7648a) to deploy the API on AWS.

After, use the first fullstackreact article above to deploy to s3.

If the first API/AWS link doesn’t cover everything, you can also use [this one.](https://hackernoon.com/how-to-setup-and-deploy-a-rails-5-app-on-aws-beanstalk-with-postgresql-redis-and-more-88a38355f1ea)

`$ rails new daily_ua_api --database=postgresql -T --api`

(_You’ll use rspec instead of minitest, and you don’t want the cognitive overhead of different db types between dev & prod_)

`$ rails g model headline text_ua:string text_en_google:string text_en_user:string`

`$ rails db:migrate`

(Populate seed file from gSheet)

`$ rails db:seed`

`$ rails g controller headlines`

Populate `headlines_controller.rb` and `routes.rb`; add to GitHub.

`$ brew install awsebcli`
* question: ...is this supposed to take 15+ minutes?!
* answer: yes... if you need to install OpenSSL, sqlite, *and* python2 first lol

`$ eb init`
* Params: region 1; May ’17 credentials; name daily_ua_api; using Ruby 2.5/Puma; no CodeCommit; yes SSH

`$ eb create daily-ua-api-env`
* ...gets you: `<ERROR: The instance profile aws-elasticbeanstalk-ec2-role associated with the environment does not exist.>`
* *search for 10 min; possible solutions [here](https://forums.aws.amazon.com/thread.jspa?messageID=637705) and [here](https://forums.aws.amazon.com/thread.jspa?messageID=789985)>

Attempt same process through AWS EB browser interface; output: 

```
INFO	Waiting for EC2 instances to terminate. This may take a few minutes.
INFO	terminateEnvironment is starting.
ERROR	Create environment operation is complete, but with errors. For more information, see troubleshooting documentation.
WARN	Environment health has transitioned from Pending to Degraded. Command failed on all instances. Initialization completed 4 seconds ago and took 14 minutes.
INFO	Command execution completed on all instances. Summary: [Successful: 0, Failed: 1].
ERROR	[Instance: ...] Command failed on instance. Return code: 18 Output: (TRUNCATED)...g: the running version of Bundler (1.16.0) is older than the version that created the lockfile (1.16.1). We suggest you upgrade to the latest version of Bundler by running `gem install bundler`. Your Ruby version is 2.5.0, but your Gemfile specified 2.5.1. Hook /opt/elasticbeanstalk/hooks/appdeploy/pre/10_bundle_install.sh failed. For more detail, check /var/log/eb-activity.log using console or EB CLI.
INFO	Added instance... to your environment.
INFO	Waiting for EC2 instances to launch. This may take a few minutes.
INFO	Created EIP: ...
INFO	Created security group named: ...
INFO	Environment health has transitioned to Pending. Initialization in progress (running for 46 seconds). There are no instances.
INFO	Using elasticbeanstalk-us-west-2-960678614226 as Amazon S3 storage bucket for environment data.
INFO	createEnvironment is starting.
```

Takeaway: using AWS EB is a opaque, unfriendly newcomer experience. It doesn't feel great to wait a quarter of an hour, only to learn that all is for naught because your versioning is off.

Say heck with it for tonight; begin deploy to Heroku; `sqlite` gem blowup occurs.

Realize that you missed a hyphen in the `--database=postgresql` flag... with no exception raised (?!), the app’s running on sqlite.

Port app over to postgres (update `database.yml` and `gemfile`); deploy to Heroku.

---

### Friday, 05/04

`$ create-react-app daily_ua_frontend`  

---

### Saturday, 05/05

Add and configure `.eslintrc` file

Rabbit-hole on how WW is using a `.babelrc` file (and various babel dependencies) without having ejected from CRA; dead-end; parking lot until Monday.

Update `App.js` to display headlines (as a `.map`) from a static array.

Follow [these instructions](https://til.hashrocket.com/posts/4d7f12b213-rails-5-api-and-cors) to update CORS on the api codebase.

Several warnings during Heroku deploy:

```
You set your `config.active_storage.service` to :local in production. If you are uploading files to this app, they will not persist after the app is restarted, on one-off dynos, or if the app has multiple dynos. Heroku applications have an ephemeral files system. To persist uploaded files, please use a service such as S3 and update your Rails configuration.
https://devcenter.heroku.com/articles/active-storage-on-heroku


We detected that some binary dependencies required to use all the preview features of Active Storage are not present on this system.
https://devcenter.heroku.com/articles/active-storage-on-heroku


No Procfile detected, using the default web server. We recommend explicitly declaring how to boot your server process via a Procfile.
https://devcenter.heroku.com/articles/ruby-default-web-server
```

(Status in `heroku log -t` is now 200, not 304, when React is hitting it)

Update `fetch` code in React app... the call to the api is returning, and React is rendering the JSON!

Next, on AWS:
1. Console > S3 > create bucket
1. Bucket name && region > create
1. Right side > Static Website Hosting > Enable website hosting > index.html as index document
1. permissions > add bucket policy 
```
{
  "Version": "2012-10-17",     <——careful not to change this; it’s fixed (?)
  "Statement":[
    {
      "Sid":"AddPerm",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::<BUCKET-NAME>/*"]     <——careful to use actual name
    }
  ]
}
``` 
5. `$ npm run build`
6. Console > S3 > bucket > click “upload”
7. Upload `build/`'s *contents*, not `build` directory
8. `$ brew install s3cmd`
9. `$ s3cmd --configure`
10. `$ s3cmd ls` <— to check your buckets are connected
11. `$ npm run build`
12. `$ s3cmd sync build/* s3://bezos`   <— former param is local dir; latter param is bucket

Set up command in `package.json`, e.g. `"build-and-deploy": "npm run build && s3cmd sync build/* s3://bezos"`

Back to EB:
1. Update api `gemfile` to `rails “~> 2.5”`
2. Create new `.zip` of api codebase
3. Return to Elastic Beanstalk console > click ‘create environment’ for `daily_ua_api`
4. Errors out on `nokogiri` install (rails 5.2.0 dependency)
5. Attempt to resolve dependencies through setting rails to `~> 5.2`; this doesn’t work either
6. Since each of these attempts (as best you can tell) take 9-14 minutes? Forget it. Get more familiar with AWS’ other features, then return to EB.

In fact, maybe explore EC2 first...

---

### Monday, 05/07

Write Ruby script to grab && print text of specific BBC Ukrainian headlines, using `nokogiri` && `open-uri`

---

### Tuesday, 05/08

Add script’s code (as class method) to `Headline` model

Update logic to save headlines’ Ukrainian text to db (w/ `null` for English fields)

Create account on GCP, following [Quickstart](https://cloud.google.com/translate/docs/quickstart)

Set up project; enable Cloud Translation API; create a service account; download private key; install and initialize Cloud SDK.

Wrestle with setting the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to a json file for an hour; turns out [the name that Google provides the json file containing the RSA keys, etc] is unrecognizable by Google’s own API.

Update the `Headline` model’s `self.scrape` method to first hit the GCP Translate API, then save the results to the first English field

---

### Friday, 05/11

Follow [GCP's instructions](https://cloud.google.com/ruby/rails/using-cloudsql-postgres) to connect Rails to Postgres.
*If it gets funky, try this instead: 
1. Follow GCP's instructions to [set up Cloud SQL.](https://cloud.google.com/sql/docs/postgres/quickstart)
1. Follow GCP's instructions to [set up an RoR codebase]((https://cloud.google.com/ruby/getting-started/hello-world)) on App Engine.
1. Follow GCP's instructions to [connect App Engine to Cloud SQL.]((https://cloud.google.com/sql/docs/postgres/connect-app-engine))

* Run into problems with `cloud app create`, b/c account isn’t configured properly. 
* Run `gcloud auth list`; switch from `"$hash_vomit_goes_here"-compute@developer.gserviceaccount.com` (???) to `"$actual_email_goes_here"@gmail.com`.

`bundle exec bin/rails assets:precompile` blows up because, hey, you have no asset pipeline.

Establish access to project: 
```
gcloud projects add-iam-policy-binding "$project_name_goes_here" \
  --member=serviceAccount:"$decimal_string_goes_here"@cloudbuild.gserviceaccount.com \
  --role=roles/editor
```

* To stream logs: `gcloud app logs tail -s default`
* To read logs: `gcloud app logs read`

Hosted page is returning the seeded JSON!

Make sure that `config/database.yml` is removed from staged files, then `.gitignore` it (and `app.yaml` and `service-account-file.json`) before committing

Now, to add environmental variables to allow the translate API to run...
1. Add the `GOOGLE_APPLICATION_CREDENTIALS` and `GCP_PROJECT_ID` variables from the local `.bash_profile` to the `app.yaml` file, 
1. Change the `headlines_controller#index` so that it calls `Headline.scrape` before displaying everything, and 
3. redeploy.

...holy WHAT. It works. It actually WHATing works. !?!?!? 

Together, the following: 
1. `bundle exec rake appengine:exec -- bundle exec rake db:migrate && rake db:purge DISABLE_DATABASE_ENVIRONMENT_CHECK=1`
1. `bundle exec rake appengine:exec -- bundle exec rake db:seed`
...will reset the db. Not sure why they don’t work when all three are chained, though.

---

### Monday, 05/14

Move the frontend to Google Cloud Storage, following [this guide.](https://cloud.google.com/storage/docs/hosting-static-website)

Note: you’ll get errors within the `data` field while setting `Custom resource records` unless you do so from incognito mode. Oh, Google...

Note: you’ll have to hit `${fullUrl}/index.html` unless you set up forwarding, so set the `default` && `404` page to `index.html` with `$ gsutil web set -m index.html -e index.html gs://www.dailyua.net`

It’s a pain to manually set each static file to ‘public link’ from the dash, so ensure all future uploads will be public by default with `$ gsutil acl ch -u AllUsers:R gs://www.dailyua.net`

Add the `whenever` gem; set it to run `Headline.scrape` locally at [something ridiculous, like every 30 seconds]

The above won’t work, because it’s aiming at the cloudSQL db, and the local server isn’t connected. The whenever gem, however, appears to be working. Test it on App Engine:
* `gcloud app deploy`
* `bundle exec rake appengine:exec -- bundle exec rake db:migrate && rake db:purge DISABLE_DATABASE_ENVIRONMENT_CHECK=1`
* `bundle exec rake appengine:exec -- bundle exec rake db:seed`

Returns:
```
rake db: purge won’t run b/c 
`PG::ObjectInUse: ERROR:  database "daily_ua_db" is being accessed by other users
DETAIL:  There are 2 other sessions using the database.`
```

---

### Wednesday, 05/16

Use the Cloud SQL Instances page to stop the `daily-ua` instance

`bundle exec rake appengine:exec -- bundle exec rake db:reset DISABLE_DATABASE_ENVIRONMENT_CHECK=1`

Doesn’t work, b/c no connection — as somewhat expected.

---

### Friday, 05/18 

* Access the Cloud SQL [db with the sql client.](https://cloud.google.com/sql/docs/postgres/connect-admin-ip) 

In CloudSQL Instances, Authorization > Authorized networks > Add network

`$ psql "sslmode=disable dbname=daily_ua_db user=suss_admin hostaddr=$cloudSQL_IPV4_goes_here"`

daily_ua_db=> SELECT * from "headlines"
daily_ua_db-> \g
daily_ua_db=> DELETE from "headlines"
daily_ua_db-> \g
DELETE 53
daily_ua_db=> SELECT * from "headlines"
daily_ua_db-> \g
—>empty!

`$ bundle exec rake appengine:exec -- bundle exec rake db:seed`

It works!

---

### Saturday, 05/19

Try this, first: https://cloud.google.com/appengine/docs/flexible/ruby/scheduling-jobs-with-cron-yaml

Update `routes.rb` and `headlines_controller.rb` to have a `/scrape` URL that calls the Model class method

Create `cron.yaml` (should hit scrape every 2 min)

`$ gcloud app deploy`

Wait 3 minutes

Hit `/headlines`; it’s not returning newly-scraped records

Hit `/scrape`, then `/headlines`; it’s not returning newly-scraped records

Remove `/` from string in routes.db; set `Headline.scrape` to variable inside controller

Still nothing: try it on the localhost, with several versions — you’re currently not able to call the `Headline.scrape` method via a controller action at all.

---

### Sunday, 05/20

Realize that all yesterday you were testing routes in the browser against `localhost:3000`, and not `localhost:3001`. Sigh... at least you’re pretty.

Hit the `/scrape` route on GCP a few times; the server logs are unclear, but logging in from psql shows that the method is saving the new records to the db. To purge the non-seed records, run:

```
daily_ua_db=> SELECT * from "headlines";
daily_ua_db=> DELETE from "headlines" where "id" > 61`;
```

Realize that at the bottom of the documentation (after lots of discussion of optional parameters, etc...) it specifies that you need to run `$ gcloud app deploy cron.yaml` to actually set up the cron... 

Add `puts request.headers` inside the scrape method to check that the cronjob sends `X-Appengine-Cron: true`

Deploy; start tailing the server log.

Wait 3 min to check that the cronjob is hitting `scrape`. (It is!)

[Use this documentation](https://console.cloud.google.com/logs/viewer) to see your actual logs, with the Ruby app log included.

Lose your cool and jump a little too hard into hacking w/o documenting: right now, you’ve got the cronjob up and running successfully; you’re just trying to figure out how to access the request headers such that you can (per the scheduling-jobs-with-cron-yaml doc above) prevent anyone except the cron from hitting the `/scrape` route.

1. Add initial cron-job header validation in the controller; deploy.
2. Run `cron` from console (does it work? check logs in GCP console); 
3. Hit `scrape` from base url (does it *not* work? check logs in GCP console)
4. WHAT yeah! Only scraping on calls with the `“X-Appengine-Cron”` request header!

Realize via the billing console that your current setup will cost ~$50/month, so start looking at [documentation for `app.yaml` updates.](https://cloud.google.com/appengine/docs/flexible/ruby/configuring-your-app-with-app-yaml)

---

### Monday, 05/21 

Before heading into work, select all in db via psql. Should be (14+6=20) headlines. It is! 

Some duplicates: delete them; set cronjob to every 24 hrs.

---

### Thursday, 05/31

Whew! Good to be back.

Access `psql` to confirm continued functioning of headline-scraper: woohoo! Still working.

Refactor `App.js` and `Headline.js` into new directories.

Spend way too much time trying to resolve [`node`, `nvm`, then `npm`] version and dependency issues.

Finishing that, integrate `node-sass` so you can use SCSS.

Add toggle to show/hide google translation.

Refactor several pieces of `Headline.js` to cleaner syntax.

Fiddle with `node-sass`, `eslint`, and `npm` some more; throw hands in air and elect to return to it in a few weeks when `node-sass` v5 is out.

Use [this documentation](https://ewanvalentine.io/using-async-await-in-your-react-apps/) (and this [gist/discussion](https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808)) to update the ‘index’ fetch call to `async/await` syntax.

---

### Saturday, 06/02

Dump db from GCP Cloud SQL.

Fail to find way to `pg_restore` from dump...

Use Rails Console to test ActiveModel query for all headlines from a given date:
* `daily_headlines = Headline.where("DATE(created_at) = ?", query_date.to_date)`
* `query_date` must be a string, possibly only in “yyyy-mm-dd” format

Begin thinking about how to define the routes (i.e. as `index/show`, or with uniquely-named paths) and how to handle the view updates.

Maybe: have `‘/‘` show all the dates, then have `‘/headlines?date=2018-05-23’` show all the headlines.

---

### Monday, 06/04

Following _React Quickly_ Chapter 13.1, create a naive, url-fragment-based `MiniRouter` for the client code

Realize you’ve misnamed `DatesPage` and `HeadlinesPage`; fix that

Restructure component hierarchy such that `MiniRouter` can pass props (i.e. date to filter headlines) into page components

Update API `/` to only return unique dates: 
* `@dates = Headline.distinct.pluck(Arel.sql('DATE(created_at)'))`
* `Arel.sql` b/c you don’t want to pass raw SQL as an argument
* `pluck` for speed

Restructure `updateHash`/routing such that `DatesPage` can pass props up the hierarchy, then down into `HeadlinesPage`

Update API `/headlines` to only return headlines following the query string
* `@daily_headlines = Headline.where("DATE(created_at) = ?", @query_date.to_date)`
* note query_date must be a “yyyy-mm-dd” string

`$ gcloud app deploy`  ...then several minutes of sweating

`$ npm run build`

Use GCP Console to update frontend code on Cloud Storage

---

### Sunday, 06/10

Check GCP spending console: even with suggested updates from the `app.yaml` configurations above, spending will still be  ~$150/month.

It’s possibly related to [this (node server, but same issue) SO discussion](https://stackoverflow.com/questions/47125661/pricing-of-google-app-engine-flexible-env-a-500-lesson) ...either way, it's time to say goodbye to GCP.

Mess around with [Cloud SQL's export documentation](https://cloud.google.com/sql/docs/postgres/import-export/exporting) with little success; eventually use: 

`daily_ua_db=> \copy (SELECT * from "headlines") TO '~/Downloads/export.csv' CSV HEADER`

to just dump a CSV. Hey, it works.

[Follow the documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects#shutting_down_deleting_projects) to shut down the App Engine instance.

You thought you would need to delete [the instance](https://cloud.google.com/sql/docs/postgres/delete-instance) or [the buckets](https://cloud.google.com/storage/docs/deleting-buckets), but both are covered by the process documented above.

Nice: `http://www.dailyua.net/` is now hitting the standard ‘_project not found_’ XML.

Delete the `google-cloud-sdk` file.

Remove the various gCloud `PATH` etc variables from `.bash_profile`. 

That should complete the removal of all things Google Cloud Platform. 

Now, let’s set up the translate API key and add it to an external server and blah blah blah...`

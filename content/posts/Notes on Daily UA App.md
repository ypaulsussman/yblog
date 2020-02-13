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
description: "I kept notes while building an app to deliver me Ukrainian headlines; here they are, and what I thought when I returned six months later."
---

## What Are We Doing Here?

I started building two codebases ([one in React](https://github.com/ypaulsussman/daily_ua_frontend), and [one in Rails](https://github.com/ypaulsussman/daily_ua_api)) in spring 2018: partially to make myself code more after work, and partially to gain a cheap, engaging, low-intensity tool to practice Ukrainian.

Two weeks into the project, my then-employer shut down my division, giving me extra time _and_ impetus to expand my GitHub. Happy coincidence!

Alas, shortly thereafter I started a new job (_goodbye, free time_); almost simultaneously, I began to practice Ukrainian with a video tutor. (_More on that experience [here.](/posts/daily-ua-study-revisitation/)_)

Combined with the frustration I’d felt flailing through different hosting attempts... well, you can see the repos' most-recent commits. While I don’t plan to return to either codebase, or even the project's broader vision, I’m happy with the experience.

Below are my notes, and finally some takeaways.

## (Revisited) Coding Log: Daily UA

1. **Monday, 04/30:** Read [several](http://samuelmullen.com/articles/embracing-change-rails51-adopts-yarn-webpack-and-the-js-ecosystem/) [articles](https://www.sitepoint.com/react-rails-5-1/) [about](https://medium.com/superhighfives/a-top-shelf-web-stack-rails-5-api-activeadmin-create-react-app-de5481b7ec0b) [React](https://www.fullstackreact.com/articles/how-to-get-create-react-app-to-work-with-your-rails-api/) [inside](https://medium.com/@hpux/rails-5-1-loves-javascript-a1d84d5318b) [Rails](https://x-team.com/blog/get-in-full-stack-shape-with-rails-5-1-webpacker-and-reactjs/)
    - None of these seem _much_ cleaner than the ol' "_sprinkle jQuery and test it in E2E,_" in terms of concern-separation
    - Some server-side routing: but no server-side rendering. SEO impact? (_Because that's so important on a toy app for Ukrainian-language learners..._)

1. **Tuesday, 05/01:** Experiment with `ActiveAdmin` gem:
    - Its controllers inherit from `ApiController` (not `ApplicationController`)
    - It requires the `sprockets` gem, which by default is absent in API mode (_and relevant the following day._)

1. **Wednesday, 05/02:** Discover two articles describing how to deploy [React-as-SPA on S3](https://www.fullstackreact.com/articles/deploying-a-react-app-to-s3/), communicating with [server-framework-API on Heroku](https://www.fullstackreact.com/articles/deploying-a-react-app-with-a-server/). 
    - This parallels one workplace app you're working on, wherein:
        - On the client,
            - `package.json` includes the `config.api.host.#{my_env_name}` keys;
            - Each value is set as the `REACT_APP_API_HOST` environmental variable in the `build:#{my_env_name}` scripts;
            - `index.js` uses that variable to set `axios.defaults.baseURL`, which is used everywhere else for HTTP requests.
        - On the server,  
            - `root to: 'homepage#index’`, which 
            - is picked up in `homepage_controller.rb`, so 
            - anyone hitting the API base URL will just get 4 lines of JSON detailing the app.
    - Decision: discard `ActiveAdmin` and preexisting app; follow decoupled model described above.

1. **Thursday, 05/03:** Use these [two](https://hackernoon.com/how-to-setup-and-deploy-a-rails-5-app-on-aws-beanstalk-with-postgresql-redis-and-more-88a38355f1ea) [articles](https://medium.com/@jameshamann/deploying-rails-5-app-using-elastic-beanstalk-and-postgresql-8ca19bc7648a) to try deploying the API to Elastic Beanstalk.
    - Begin with `$ rails new daily_ua_api -d postgresql -T --api`(_use rspec instead of minitest_)
    - Create the model: `$ rails g model headline text_ua:string text_en_google:string text_en_user:string`
    - `$ rails db:migrate`; populate seed file from csv; `$ rails db:seed`
    - `$ rails g controller headlines`; populate `headlines_controller.rb` and `routes.rb`; add to GitHub
    - `$ brew install awsebcli`
        - Question: ...is this supposed to take 15+ minutes?!
        - Answer: yes... if you need to install OpenSSL, sqlite, *and* python2 first =_=
    - `$ eb init`; `$ eb create daily-ua-api-env`
        - `<ERROR: The instance profile aws-elasticbeanstalk-ec2-role associated with the environment does not exist.>`
        - Neither of [these](https://forums.aws.amazon.com/thread.jspa?messageID=637705) [solutions](https://forums.aws.amazon.com/thread.jspa?messageID=789985) resolves the issue
    - Attempt same process through EB browser interface; receive: 
      ```
      ERROR	[Instance: ...] Command failed on instance. 
      Return code: 18 
      Output: (TRUNCATED)...g: the running version of Bundler (1.16.0) is older than the version that created the lockfile (1.16.1). 
      We suggest you upgrade to the latest version of Bundler by running `gem install bundler`. 
      Your Ruby version is 2.5.0, but your Gemfile specified 2.5.1. 
      Hook /opt/elasticbeanstalk/hooks/appdeploy/pre/10_bundle_install.sh failed. 
      For more detail, check /var/log/eb-activity.log using console or EB CLI.
      ```
    - Mess with `Gemfile` for a few more deploy-attempts, unsuccessfully
    - Takeaway: deploying to EB is an opaque, frustrating experience. Use Heroku instead.

1. **Saturday, 05/05:** Kick off React SPA: `$ create-react-app daily_ua_frontend`, and start coding
    - Add and configure `.eslintrc` file
    - Update `App.js` to display headlines (as a `.map`) from a static array.
    - Follow [these instructions](https://til.hashrocket.com/posts/4d7f12b213-rails-5-api-and-cors) to update CORS on the api codebase.
    - Update `fetch` to hit the API: React is rendering your JSON!

1. **Saturday, 05/05:** Upload app to S3:
    - `AWS Console` > `S3` > `Create Bucket`
    - `Bucket Name && Region` > `Create`
    - `Static Website Hosting` > `Enable Website Hosting` > Choose `index.html` as index document
    - `Permissions` > `Add Bucket Policy` > Apply following incantation:
      ```
      {
        <!-- Careful not to change date; it’s fixed (??) -->
        "Version": "2012-10-17",     
        "Statement":[
          {
            "Sid":"AddPerm",
            "Effect":"Allow",
            "Principal": "*",
            "Action":["s3:GetObject"],
            <!-- Careful to use actual name below -->
            "Resource":["arn:aws:s3:::<BUCKET-NAME>/*"]     
          }
        ]
      }
      ``` 
    - `$ npm run build`
    - `AWS Console` > `S3` > `Bucket` > `Upload`
    - Upload `build/`'s *contents*, not `build` directory
    - `$ brew install s3cmd`
    - `$ s3cmd --configure`; `$ s3cmd ls` (_to confirm buckets are connected_)
    - `$ s3cmd sync build/* s3://bezos` (_Note: former param is local dir; latter param is bucket_)
    - Set up command in `package.json`, e.g. `"build-and-deploy": "npm run build && s3cmd sync build/* s3://bezos"`

1. **Monday, 05/07:** add scraping to app
    - Write script to grab BBC Ukrainian's headlines, using `nokogiri` && `open-uri`
    - Add script (_as class method_) to [`Headline` model](https://github.com/ypaulsussman/daily_ua_api/blob/master/app/models/headline.rb)
    - Create account on GCP, following [Quickstart](https://cloud.google.com/translate/docs/quickstart):
        - Set up project; enable Cloud Translation API; create a service account; download private key; install and initialize Cloud SDK.
        - Wrestle with setting the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to a json file for an hour; turns out [_the name that Google provides the json file containing the RSA keys, etc_] is unrecognizable by Google’s own API.
    - Update the `Headline` model’s `self.scrape` method to first hit the GCP Translate API, then save the results to the first English field

1. **Friday, 05/11:** Follow [GCP's instructions](https://cloud.google.com/ruby/rails/using-cloudsql-postgres) to connect Rails to Postgres.
    - Run into problems with `cloud app create`, b/c account isn’t configured properly. 
    - Run `gcloud auth list`; switch from `${hash_vom}-compute@developer.gserviceaccount.com` to `${my_email}@gmail.com`.
    - Establish access to project: 
    ```
    gcloud projects add-iam-policy-binding ${project_name} \
      --member=serviceAccount:${decimal_string}@cloudbuild.gserviceaccount.com \
      --role=roles/editor
    ```
    - Add environmental variables:
        - `.gitignore` your (`config/database.yml`, `app.yaml`, `service-account-file.json`) files
        - Add the `GOOGLE_APPLICATION_CREDENTIALS` and `GCP_PROJECT_ID` variables from the local `.bash_profile` to the `app.yaml` file, 
        - Change the `headlines_controller#index` so that it calls `Headline.scrape` before displaying everything, and 
        - redeploy.

    - Reset DB via the following (_which won’t work when all three are chained_)
      - `bundle exec rake appengine:exec -- bundle exec rake db:migrate && rake db:purge DISABLE_DATABASE_ENVIRONMENT_CHECK=1`
      - `bundle exec rake appengine:exec -- bundle exec rake db:seed`

    - Hosted page is returning seeded and/or scraped JSON!

1. **Monday, 05/14:** Move the React frontend to Google Cloud Storage, with [this guide.](https://cloud.google.com/storage/docs/hosting-static-website)
    - You’ll get errors within the `data` field while setting `Custom resource records` unless you do so from incognito mode. Oh, Google...
    - You’ll have to hit `${fullUrl}/index.html` unless you set up forwarding: set the `default` && `404` page to `index.html` with `$ gsutil web set -m index.html -e index.html gs://www.dailyua.net`
    - It’s a pain to manually set each static file to ‘public link’ from the dash, so ensure all future uploads will be public by default with `$ gsutil acl ch -u AllUsers:R gs://www.dailyua.net`

1. **Monday, 05/21:** Set up a scraping "job" with [AppEngine cron service](https://cloud.google.com/appengine/docs/flexible/ruby/scheduling-jobs-with-cron-yaml)
    - Update `routes.rb` and `headlines_controller.rb` to have a `/scrape` URL that calls the Model class method
    - Create `cron.yaml` (should hit scrape every 2 min)
    - `$ gcloud app deploy cron.yaml`
        - Add `puts request.headers` inside the scrape method to check that the cronjob sends `X-Appengine-Cron: true`
        - [Use this documentation](https://console.cloud.google.com/logs/viewer) to see your actual logs, with the Ruby app log included.
    -  Add initial cron-job header validation in the controller; redeploy.
      -  Run `cron` from console (does it work? check logs in GCP console); 
      -  Hit `scrape` from base url (does it *not* work? check logs in GCP console)
      -  Success: only scraping on calls with the `“X-Appengine-Cron”` request header!

1. **Monday, 05/21:** Realize (_via the billing console_) that your current setup will cost ~$50/month: start weighing [`app.yaml` tweaks.](https://cloud.google.com/appengine/docs/flexible/ruby/configuring-your-app-with-app-yaml)

1. **Thursday, 05/31:** Refactor frontend; wrestle unsuccessfully with `.eslint` and `npm`
    - Access `psql` to confirm continued functioning of headline-scraper: still working!
    - Refactor `App.js` and `Headline.js` into new directories.
    - Finishing that, integrate `node-sass` so you can use SCSS.
    - Add toggle-UI to show/hide translation.
    - Refactor several pieces of `Headline.js` to cleaner syntax.
    - Use [this documentation](https://ewanvalentine.io/using-async-await-in-your-react-apps/) (and this [gist/discussion](https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808)) to update the ‘index’ fetch call to `async/await` syntax.

1. **Saturday, 06/02:** Expand routes and pages
    - Use Rails Console to test ActiveModel query for all headlines from a given date:
        - `daily_headlines = Headline.where("DATE(created_at) = ?", query_date.to_date)`
        - `query_date` must be a string, possibly only in “_yyyy-mm-dd_” format
    - Maybe have `‘/‘` show all the dates, then have `‘/headlines?date=2018-05-23’` show all the headlines?
    - Following _React Quickly_ Chapter 13.1, create a URL-path `MiniRouter` for the client code
    - Restructure component hierarchy such that `MiniRouter` can pass props (_i.e. a date for filtering headlines_) into page components
    - Update API `/` to only return unique dates: 
        - `@dates = Headline.distinct.pluck(Arel.sql('DATE(created_at)'))`
        - `Arel.sql` b/c you don’t want to pass raw SQL as an argument
        - `pluck` for speed
    - Restructure `updateHash` routing such that `DatesPage` can pass props up the hierarchy, then down into `HeadlinesPage`
    - Update API `/headlines` to only return headlines following the query string
        - `@daily_headlines = Headline.where("DATE(created_at) = ?", @query_date.to_date)`
        - note `query_date` must be a “_yyyy-mm-dd_” string
    - `$ gcloud app deploy`; `$ npm run build`; Use GCP Console to update frontend code on Cloud Storage

1. **Sunday, 06/10:** Check GCP spending console; horrified, kill your project
    - Even with suggested updates from the `app.yaml` configurations above, spending will still be ~$150/month.
    - It’s possibly related to [this (_node server, but same issue_) SO discussion](https://stackoverflow.com/questions/47125661/pricing-of-google-app-engine-flexible-env-a-500-lesson): either way, it's time to say goodbye to GCP.
        - Mess around with [Cloud SQL's export documentation](https://cloud.google.com/sql/docs/postgres/import-export/exporting) with little success; eventually use: `daily_ua_db=> \copy (SELECT * from "headlines") TO '~/Downloads/export.csv' CSV HEADER` to just dump a CSV. Hey, it works.
        - [Follow the documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects#shutting_down_deleting_projects) to shut down the App Engine instance. 
        - Note: both [instance-](https://cloud.google.com/sql/docs/postgres/delete-instance) and [bucket-](https://cloud.google.com/storage/docs/deleting-buckets)deletion are covered by the process above.
    - `http://www.dailyua.net/` is now hitting the standard ‘_project not found_’ XML.
    - Delete the `google-cloud-sdk` file.
    - Remove the various gCloud `PATH` etc variables from `.bash_profile`. 
    - Feel kind of sad, and empty.

## Next Steps

And that was that: I haven't revisited the codebase since, nor the underlying project. Two thoughts follow.

First: I'd been encouraged to "_connect the stack, end to end, and only **after** begin building features_" several times, but it was valuable to encounter it in practice, now (_albeit painfully_) sealed in memory.

I typically prefer to learn-by-doing when exploring new scripts or applications. The feedback loops on those technologies are tight enough that experimentation isn't very painful. This is not the case for hosting infrastructure.

For your next app, RTFM first. Get a book, or take an AWS training. _Ad hoc_ article-lookup and docs-consultation didn't suffice: learn at least the basic vocabulary of web-infrastructure, prior to setting out.

Second: regardless of the DevOps-disappointment, one part of the project richly rewarded your effort. The notes above were a great tool for both concurrent learning and later reference. Repeat that practice in future projects, with the following adaptations: 

- They were originally written in plaintext; next time, start with markdown.
- Categorization by date was useful; keep it.
- Directly beneath each date, include what you plan to achieve in that session, and its predicted (_pseudocode_) substeps.
- At the end of each session, list what you'd learned from that day's coding.

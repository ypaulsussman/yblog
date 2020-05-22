# Building Ruby Web Apps with Rack

## Getting started
- It's a Rubygem
- It connects web servers (Puma, Unicorn, Thin, WEBrick) to applications (Rails, Sinatra, Grape)
- A server parses incoming HTTP data, passes it to Rack; Rack processes that data, then hands it off to app code
- Despite non-standard extension, `config.ru` just contains Ruby code.
  - Inside, declare a class `MyRackApp`
  - Only one method required for class therein:
    - `call` is invoked anytime the server receives a web request
    - its one argument (commonly named `env`) contains the request itself
    - its expected to only ever return a three-element array
      - first element is a status code `int`;
      - second element is a headers `hash`;
      - third element is a response `array`.
  - As final line, call `run MyRackApp.new`
- To begin, call `bundle exec rackup` in same dir as `config.ru`
  - `rackup` is an executable from teh `rack` gem
  - it boots up `WEBrick` (Ruby's default web server)
  - it then loads the `config.ru` code
- The [Spec doc](https://www.rubydoc.info/github/rack/rack/file/SPEC) contains the list of available `env` keys (_and other protocols_)

## Routing, Requests, and Responses
- It's standard for `config.ru` to only contain initialization, setup, and routing code -- leaving db writes and logic to other, imported files.
- If you want to create regex w/o needing to escape every slash, Ruby allows you to write `%r{my_regex}`, instead of the traditional `/my_regex/`.
- In `config.ru`, you can call `map` with the leading portion of a URL, then pass a block to handle it: 
    ```ruby
    map('/users') do
      run UsersApplication.new
    end
    ``` 
  - This tells Rack that, when it receives a request that starts with `/users`, we want a `UsersApplication` instance to handle it. 
  - Inside `UsersApplication`, `env['REQUEST_URI']` still shows the full URL that the client called, but
  - the `env['PATH_INFO']` now drops the `/users` prefix that `map` matched.
  - One nice side effect of using `map` is that any URL that _doesn't_ match any `map` calls will automatically return a `404`. 
- You can get the body of a `POST`/`PUT` request fom `env['rack.input']` -- this doesn't return a string, but rather a hash-like Ruby `IO` object
- To abstract away working with `env`, you can instead instance `Rack::Request.new(env)`
  - This allows you to call e.g. `my_request.path_info`, `my_request.body`, 
  - For the entire OG `env` hash, you can call `request.env`
- To abstract away working with the "three-item array" response, Rack also provides the `Rack::Response.new` helper class
  - On it, you can set `my_response.status`, `my_response.headers`, `my_response.body`, and even (_if it's a browser request_) `my_response.set_cookie('key', 'value')`
  - There's also `my_response.write('some content')`, for appending data to the `body` (_instead of setting it directly._) 
  - You can then call `my_response.finish` to return a properly-formatted three-item array 
  
## Middleware
- Simple Ruby objects with two relevant methods, `initialize` and `call`
- `initialize(application, opts = {})`
  - holds the incoming application in an e.g. `@app` ivar, so later it can fwd requests to _that_ application's `call` method
- `call(env)`
  - returns a valid Rack response
- Rack provides the `use MyMiddleware` method to pull in a `Middleware` class as part of handling a web request
  - Like `run`, it's typically invoked from `config.ru` during initial-application setup.
  - Unlike `run`, we only pass the class, not an instance: Rack itself will invoke `new`, later, passing in the correct Rack object that's next in line (_depending on the configuration sequence in_ `config.ru`)
- The only way to communicate between middleware classes is by modifying the `env` hash.
  - Any non-standard values need to be prefixed with a unique key, separated by a dot from the value name (e.g. `env["my_rad.namespaced_key"] = "foobar"`)
  - The `rack` scope is reserved for rack-core code; but all else is open.
- 

---

# AWS Developer: The Big Picture

## Intro
- Nearly all services interact with each other over typical TCP connections
- If you create all of your service instances in the same virtual private cloud, then they will have local IP addresses, and you can make super‑fast connections to them.
- Most of the bugs I've encountered with services interacting in AWS have been from misconfigured security groups.

## Core Services

### EC2
- What can you do with EC2 instances? In many ways, an instance is basically a computer.
  - You can use it to run an application, be it a web application or local.
  - You can log into the instance and use it like a remote virtual desktop/machine.
  - EC2 instances can have very specific types of software installed on them to do all sorts of tasks.
- The basic building block in EC2 is an _instance_ - a virtual server which is operating-system agnostic.
- General purpose (e.g. `t3.large`) instances tend to be 1:4 CPU:RAM; Mem-Optimized (`r5.large`), 1:8; Compute-Optimized (`c5.large`), 1:2.
- Use EC2 AutoScaling Groups for adding/removing actual EC2 instances; use Elastic Beanstalk for scaling application instances _on_ that EC2 instance
- Elastic Block Storage volumes are for EC2 filesystems: but they live independently from your EC2 instances, and so can outlast them if one's destroyed/replaced.
- An AWS Security Group is an IP-based [set of communication rules] for a [set of service-instances]. Example usages include...
  - Control who can SSH into an EC2 instance;
  - Allow access between EC2 instances;
  - Allow access databases/S3;
  - Allow HTTP requests (i.e. on port 80), etc.
- `t2.micro` comes with 1 CPU, 1 GB/RAM, and costs ~$10/month.

### S3
- Actually used by e.g. CloudWatch and Beanstalk under-the-hood
- Max file size is 5tb (!)
- Buckets are the foundational structure in S3, a root resource to which you can add, delete or modify objects.
- Buckets can be configured to
  - (dis)allow access/permissions,
  - trigger events when changes happen,
  - preserve old versions of any objects, and
  - automatically replicate objects to different regions.
- Each bucket is assigned a URL, with which you can access the objects contained within them.
- When the permissions for objects are modified to allow anonymous access, S3 can be used to host static files for websites.
- Instead of replicating files to other regions directly through S3, it's usually better to use CloudFront to cache your content around the world.

### RDS
- "Managed" b/c AWS takes care of...
  - scheduled automated backups,
  - software updates,
  - infrastructure for the database, and
  - easy read-replica creation / web-UI for config tweaks
- If you were to stand up the db on an EC2 instance, you'd be responsible for the above. (And for security.)
- Because RDS instances themselves run on an EC2 instance, you select that instance-type at creation, as well.

### Route53
- DNS resolution
- EC2 instances can be configured with public IP's, but certain Amazon resources (S3 buckets, load balancers) don't have static, visible IP addresses.
- Route 53 allows you to set up URL resolution to AWS resources directly, bypassing any need for you to see an IP.
- It's the best way to let others interact with your application or other AWS services.
- Route 53 works by first setting up a hosted zone - basically a root domain name, like `example.com`.
- You can use Route 53 to set up subdomains, like `www.example.com` or `mail.example.com` and configure them to route to AWS resources.
- You can create record sets like A records, CNAME records, and MX records for those subdomains.
- Route 53 also provides a health check service, which allows you to set up regular checks for a given URL path.
  - Health checks will send you alerts based on different rules, e.g. if the URL request gets a response of 503 or 404.
  - This is an essential tool if you have a customer-facing web application, and only costs $.50 a month.

## AWS Databases and Application Services

### Elastic Beanstalk
- Under the covers, it's simply running your code on EC2 instances; however, it abstracts away...
  - manual configuration,
  - manual code deployment,
  - manual monitoring,
  - SSH'd command-line navigation,
  - AMI scaling.
- EB can be accessed by SDK, CLI, or web console.
- The main abstract structure in Elastic Beanstalk is an **application.**
  - This is the root level organization.
  - It needs a unique name to differentiate it from other applications.
  - Inside each application are many **application versions**.
    - This is the actual code that will run your application, with many different revisions.
    - These different versions of your code are stored in an S3 bucket.
  - You can deploy an application version to an **environment.**
    - An environment is the rules and configurations that manage actual EC2 instances.
    - Each environment can run with a different platform (_e.g. Java, Node_), and a different EC2 instance (_e.g. t2.micro, m4.xlarge._)
    - You manage the [deployment, load balancing, and scaling] rules here.
    - Configuring each environment in Elastic Beanstalk is where you'll spend most of your time.
- EB also provides monitoring and a web UI for logs

### Lambda
- Function as a Service, or serverless
- You can give some code to Lambda; it will execute it on as many servers as required, scaling up and down as needed
- You only pay when your code is running (_Lambda bills you by the number of requests and per 100 ms that your code was executing._)
- Lambda could provide your application significant cost savings if you have infrequent activity.
- Each Lambda function is configured with:
  - a platform (_e.g. Node, Python, Go_)
  - invocation targets (_API Gateway, CloudWatch, CloudFront_)
  - execution timeout,
  - memory requirements, and
  - the IAM role the Lambda should execute with.
- Useful for simple, irregular tasks (e.g. nightly ETL jobs, email/push notification jobs)

### Virtual Private Cloud
- secures your resources into groups that follow access rules and share a logical space
- Security groups secure single instances; VPCs secure groups of instances
- commonly used when launching EC2 instances (_via Elastic Beanstalk, RDS, or manually_)
- Security groups still manage IP-based communication rules for instances in a VPC
- Virtual Private Cloud also lets you
  - configure routing tables,
  - configure NAT (Network address translation) Gateways for outbound traffic,
  - allocate internal IP addresses (for the VPC's different instances)
- Inside each AWS Virtual Private Cloud are one or more **subnets.**
  - These subnets are a further way to group your instances and assign different rules to each.
  - It's common to set up private and public subnets.
    - The private subnet has no access to the internet at all, keeping it quite secure.
    - The private subnet houses your databases and application instances.
    - The public subnet, on the other hand, has access to the internet, utilizing security groups to make it secure.
    - The private subnet uses a NAT gateway in the public subnet to securely access the internet, perhaps with e.g. a load balancer.
    - You could also launch an EC2 instance in the public subnet to act as a tunnel to SSH into your private EC2 instances (_a jump server._)
- VPC's control routing with **Route Tables** and **Network Access Control Lists.**
  - Route tables 'control what goes where'
    - They allow you to override certain IP ranges and redirect the traffic.
    - A perfect use case is if you want to direct all _outgoing_ traffic to a NAT gateway that will filter traffic and mask the instance's IP address.
  - Network ACLs (Access Control Lists) 'control who can enter and exit'
    - They act as subnet‑level firewalls, allowing or disallowing IP ranges for both incoming and outgoing connections.

### CloudWatch
- monitoring service for other AWS services
- CloudWatch can monitor resources (_different per service_)
- CloudWatch can perform actions you when some predefined criteria (_different per service_) has occurred
  - ranges from notifying you via email or SMS to
  - triggering some autoscaling action within an EC2 autoscaling group.
- CloudWatch can also consume, aggregate, and monitor logs

### CloudFront
- content delivery network
- allows you to serve files quickly and globally
- works seamlessly with S3, EC2, AWS load balancers, and Route 53
- You first create a CloudFront distribution, which defines a set of content to be served from CloudFront.
  - For each distribution, you specify an original location for the content, such as an S3 bucket.
  - A unique CloudFront URL is assigned to the distribution; you use that to access the content.
  - On the distribution, you configure which HTTP methods are allowed, which edge locations to use, even your own SSL certificate.

## AWS from the Command Line to Code

### Web Console
- Common Service Categories:
  - `Compute` includes `EC2` and `Elastic Beanstalk` - services for running your application on a virtual machine.
  - `Storage` includes `S3` -- services for storing files
  - `Database` includes `RDS`, `DynamoDB`, and `DocumentDB`
  - `Networking and Content Delivery` includes with `VPC`, `CloudFront`, and `Route53`.
  - `Developer Tools` includes services that relate to code development such as `CodeCommit` (_a cloud‑based source repository._).
  - `Management and Governance` includes `CloudWatch`, but also other tools for automatically creating resources, like `CloudFormation` and `OpsWorks`.
  - `Security, Identity, and Compliance` includes `IAM` for AWS user management and `Certificate Manager` for SSL certificates.
- `Services` dropdown on top navbar includes fuzzy-finder for all these services
- `Resource Groups` dropdown on top navbar lets you organize related instances of different services
- Regions dropdown in top right also lets you determine region (_careful: by default services don't talk to each other across regions?_)
- Name dropdown in top right opens `My Billing Dashboard`, which shows you current && projected charges for the month

### Software Development Kits
- An AWS SDK usually just wraps a web request to an AWS service and makes it more convenient to use.
- Essentially, anything you can do through the console you can do with an AWS SDK.

### Command Line Interface
- great for doing things quickly with little overhead, or for automation tasks and shell scripts
- level of interaction roughly matches the SDKs and web console
- When executing a command...
  - you type `aws` to run the CLI;
  - the next argument is the service you want to use, and
  - finally a specific command with any flags or params.
- With Mac or Linux you'll use the Python package manager, `pip`, to install the CLI.
  - Once installed, you'll need to add an access key, secret key, and default region.
  - You can also add or remove access keys from the Security Credentials menu in the console.

---

https://app.pluralsight.com/library/courses/aws-developer-getting-started/table-of-contents
